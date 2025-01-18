import React from 'react';

/**
 * Overview component:
 *  - Shows question numbers
 *  - Highlights visited and attempted
 *  - Calls goToQuestion(index) on click
 */
function Overview({ questions, userAnswers, currentQuestionIndex, goToQuestion }) {
  return (
    <div className="overview-container">
      {questions.map((_, index) => {
        const isActive = currentQuestionIndex === index;
        const isVisited = userAnswers[index] !== null; // visited if userAnswers is not null
        const isAttempted = userAnswers[index] !== null && userAnswers[index] !== undefined;

        let classNames = 'question-box';
        if (isActive) classNames += ' active';
        if (isVisited) classNames += ' visited';
        if (isAttempted) classNames += ' attempted';

        return (
          <div
            key={index}
            className={classNames}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

export default Overview;
