import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import Overview from '../components/Overview';

/**
 * QuizPage:
 *  - Fetch 15 questions from https://opentdb.com/api.php?amount=15
 *  - Base64-encode correct & incorrect answers to obscure them
 *  - Display one question at a time
 *  - Timer auto-submit at 30 min
 *  - calls onQuizEnd when user manually submits or time ends
 */
function QuizPage({
  email,
  questions,
  setQuestions,
  userAnswers,
  setUserAnswers,
  onQuizEnd,
  setTimeUp,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const totalQuestions = 15;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await response.json();

        if (data.results) {
          // Transform the data: encode correct & incorrect answers with btoa
          const processedQuestions = data.results.map((item) => {
            // base64-encode the correct answer
            const correctEncoded = btoa(item.correct_answer);

            // base64-encode each incorrect
            const encodedIncorrects = item.incorrect_answers.map((ans) =>
              btoa(ans)
            );

            // Combine and shuffle
            const allOptionsEncoded = [correctEncoded, ...encodedIncorrects];
            const shuffledOptions = shuffleArray(allOptionsEncoded);

            return {
              question: item.question, // question text (not as sensitive)
              correctAnswer: correctEncoded, // store base64
              options: shuffledOptions, // base64 array
            };
          });

          setQuestions(processedQuestions);
          setUserAnswers(Array(processedQuestions.length).fill(null));
        }
      } catch (error) {
        console.error('Error fetching quiz data: ', error);
      }
    };

    // only fetch if no questions
    if (!questions || questions.length === 0) {
      fetchQuestions();
    }
    // eslint-disable-next-line
  }, []);

  // Utility: shuffle array in place
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // record user selection (the base64 string)
  const handleAnswerSelect = (base64Answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = base64Answer; 
    setUserAnswers(newAnswers);
  };

  // navigate to question index
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // next/prev
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // manual submit
  const handleSubmitQuiz = () => {
    if (window.confirm('Are you sure you want to submit the quiz?')) {
      onQuizEnd();
    }
  };

  // auto-submit from Timer
  const handleAutoSubmit = () => {
    setTimeUp(true);
    onQuizEnd();
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="container fade-in">
        <h2>Loading questions, please wait...</h2>
      </div>
    );
  }

  // for convenience
  const { question, options } = questions[currentQuestionIndex];

  return (
    <div className="container fade-in">
      {/* Timer */}
      <Timer initialTime={30 * 60} onTimeUp={handleAutoSubmit} />

      {/* Overview */}
      <Overview
        questions={questions}
        userAnswers={userAnswers}
        currentQuestionIndex={currentQuestionIndex}
        goToQuestion={goToQuestion}
      />

      {/* Question display */}
      <div className="question-wrapper">
        <h3>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
        
        {/* question text, not base64, so we can show directly */}
        <div
          className="question-text"
          dangerouslySetInnerHTML={{ __html: question }}
        />

        {/* show options by decoding them */}
        <div className="options-container">
          {options.map((opt, idx) => {
            const decodedOpt = atob(opt); // decode for display
            return (
              <label key={idx}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  checked={userAnswers[currentQuestionIndex] === opt}
                  onChange={() => handleAnswerSelect(opt)}
                />
                <span dangerouslySetInnerHTML={{ __html: decodedOpt }} />
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="nav-buttons">
        <button
          className="btn btn-blue"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {currentQuestionIndex < totalQuestions - 1 && (
          <button className="btn btn-green" onClick={handleNext}>
            Next
          </button>
        )}

        <button className="btn btn-red" onClick={handleSubmitQuiz}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
