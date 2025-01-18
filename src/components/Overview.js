import React from 'react';

/**
 * Overview component:
 *  - Shows question numbers
 *  - Highlights visited and attempted
 *  - Calls goToQuestion(index) on click
 */
function Overview({
  questions,
  userAnswers,
  currentQuestionIndex,
  goToQuestion
}) {
  return (
    <div className="overview-container">
      {questions.map((_, index) => {
        const isActive = currentQuestionIndex === index;
        const hasAnswer = userAnswers[index] !== null && userAnswers[index] !== undefined;

        // visited is basically if the user has clicked on the question
        // but let's treat "visited" as "not null" for demonstration
        const isVisited = userAnswers[index] !== null;

        let classNames = 'question-box';
        if (isActive) classNames += ' active';
        if (isVisited) classNames += ' visited';
        if (hasAnswer) classNames += ' attempted';

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
