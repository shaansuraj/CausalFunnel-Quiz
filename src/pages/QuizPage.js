import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import Overview from '../components/Overview';

/**
 * QuizPage:
 *  - Fetch 15 questions from https://opentdb.com/api.php?amount=15
 *  - Display one question at a time
 *  - Provide navigation to any specific question
 *  - Has a Timer that auto-submits when it hits 0
 *  - Calls onQuizEnd when user manually submits or timer ends
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

  // Fetch questions on mount if not already fetched
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=15'
        );
        const data = await response.json();
        if (data.results) {
          // Prepare quiz data
          const processedQuestions = data.results.map((item) => {
            // Merge correct and incorrect answers
            const allOptions = [item.correct_answer, ...item.incorrect_answers];
            // Shuffle the options
            const shuffledOptions = shuffleArray(allOptions);

            return {
              question: item.question,
              correctAnswer: item.correct_answer,
              options: shuffledOptions,
            };
          });

          setQuestions(processedQuestions);
          // Initialize userAnswers with null
          setUserAnswers(Array(processedQuestions.length).fill(null));
        }
      } catch (error) {
        console.error('Error fetching quiz data: ', error);
      }
    };

    if (!questions || questions.length === 0) {
      fetchQuestions();
    }
    // eslint-disable-next-line
  }, []);

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Handle user selecting an option
  const handleAnswerSelect = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

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

  // Submit quiz manually
  const handleSubmitQuiz = () => {
    // Confirm before submitting
    if (window.confirm('Are you sure you want to submit the quiz?')) {
      onQuizEnd();
    }
  };

  // Auto-submit triggered by Timer
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

  const { question, options } = questions[currentQuestionIndex];

  return (
    <div className="container fade-in">
      {/* Timer */}
      <Timer initialTime={30 * 60} onTimeUp={handleAutoSubmit} />

      {/* Overview Navigation */}
      <Overview
        questions={questions}
        userAnswers={userAnswers}
        currentQuestionIndex={currentQuestionIndex}
        goToQuestion={goToQuestion}
      />

      <h3>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
      <div style={{ marginBottom: '12px' }}>
        {/* Display question text (handle HTML entities safely) */}
        <div
          dangerouslySetInnerHTML={{ __html: question }}
          style={{ fontWeight: 'bold', marginBottom: '10px' }}
        />
        <div className="options-container">
          {options.map((opt, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                checked={userAnswers[currentQuestionIndex] === opt}
                onChange={() => handleAnswerSelect(opt)}
              />
              <span dangerouslySetInnerHTML={{ __html: opt }} />
            </label>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div>
        <button className="btn" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button
          className="btn"
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
        </button>
        <button className="btn" onClick={handleSubmitQuiz}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
