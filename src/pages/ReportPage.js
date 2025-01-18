import React from 'react';

/**
 * ReportPage:
 *  - Shows each question
 *  - Decodes user answer & correct answer from base64
 *  - If timeUp == true, note the quiz ended due to time
 */
function ReportPage({ questions, userAnswers, timeUp, email }) {
  // compute final score
  const score = questions.reduce((acc, q, idx) => {
    const correctEncoded = q.correctAnswer;      // base64 encoded
    const userEncoded = userAnswers[idx];        // base64 encoded or null
    if (userEncoded && userEncoded === correctEncoded) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="container fade-in report-container">
      <div className="report-summary">
        <h2>Quiz Report</h2>
        <p><strong>Email:</strong> {email}</p>

        {timeUp && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Time is up! The quiz was auto-submitted.
          </p>
        )}

        <p>Your Score: {score} out of {questions.length}</p>
      </div>

      {/* Detailed Q&A */}
      {questions.map((q, idx) => {
        const userAnsEncoded = userAnswers[idx];
        const correctAnsEncoded = q.correctAnswer;

        const userAnsDecoded = userAnsEncoded ? atob(userAnsEncoded) : 'Not Answered';
        const correctAnsDecoded = atob(correctAnsEncoded);

        return (
          <div key={idx} className="report-question">
            <p>
              <strong>Q{idx + 1}.</strong>{' '}
              <span dangerouslySetInnerHTML={{ __html: q.question }} />
            </p>
            <p className="user-answer">
              <strong>Your Answer: </strong>
              <span
                dangerouslySetInnerHTML={{ __html: userAnsDecoded }}
              />
            </p>
            <p className="correct-answer">
              <strong>Correct Answer: </strong>
              <span dangerouslySetInnerHTML={{ __html: correctAnsDecoded }} />
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ReportPage;
