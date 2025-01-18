import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ReportPage from './pages/ReportPage';
import Header from './components/Header';
import './App.css';

/**
 * App component controls which "page" (stage) to show:
 *  1. Start (collect email)
 *  2. Quiz (show questions)
 *  3. Report (after submission or timer ends)
 */
function App() {
  const [stage, setStage] = useState('start'); // "start" | "quiz" | "report"
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [timeUp, setTimeUp] = useState(false);

  const handleStartQuiz = (enteredEmail) => {
    setEmail(enteredEmail);
    setStage('quiz');
  };

  const handleQuizEnd = () => {
    setStage('report');
  };

  return (
    <div className="app-container">
      {/* Shared Header with a brand name */}
      <Header />

      {stage === 'start' && (
        <StartPage onStartQuiz={handleStartQuiz} />
      )}

      {stage === 'quiz' && (
        <QuizPage
          email={email}
          questions={questions}
          setQuestions={setQuestions}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          onQuizEnd={handleQuizEnd}
          setTimeUp={setTimeUp}
        />
      )}

      {stage === 'report' && (
        <ReportPage
          questions={questions}
          userAnswers={userAnswers}
          timeUp={timeUp}
          email={email}
        />
      )}
    </div>
  );
}

export default App;
