import React from 'react';

/**
 * ReportPage:
 *  - Shows each question
 *  - Shows user answer vs correct answer
 *  - If timeUp is true, indicate that quiz ended due to time
 */
function ReportPage({ questions, userAnswers, timeUp, email }) {
  const score = questions.reduce((acc, q, index) => {
    if (userAnswers[index] === q.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="container fade-in report-container">
      <h2>Quiz Report</h2>
      <p><strong>Email: </strong>{email}</p>
      {timeUp && <p style={{ color: 'red', fontWeight: 'bold' }}>Time is up! Quiz auto-submitted.</p>}

      <p>Your Score: {score} out of {questions.length}</p>

      {questions.map((q, idx) => (
        <div key={idx} className="report-question">
          <p>
            <strong>Q{idx + 1}.</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: q.question }} />
          </p>
          <p className="user-answer">
            <strong>Your Answer: </strong>
            <span
              dangerouslySetInnerHTML={{
                __html: userAnswers[idx] || 'Not Answered'
              }}
            />
          </p>
          <p className="correct-answer">
            <strong>Correct Answer: </strong>
            <span dangerouslySetInnerHTML={{ __html: q.correctAnswer }} />
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportPage;
