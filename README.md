# CausalFunnel Quiz: Software Engineer Intern Assignment

A **ReactJS** application for a 15-question quiz fetched from the [Open Trivia Database](https://opentdb.com/api.php?amount=15) API. It includes user authentication via email, a 30-minute countdown timer, dynamic question navigation, and a final report displaying both the user's answers and the correct answers. 

This project also **obfuscates** correct and incorrect answers using **base64** encoding on the front end, reducing the likelihood that casual users can inspect the correct answers via DevTools.

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Architecture & Components](#architecture--components)  
4. [Setup & Installation](#setup--installation)  
5. [Assumptions](#assumptions)  
6. [Challenges & Solutions](#challenges--solutions)  
7. [License](#license)

---

## Overview

**CausalFunnel Quiz** is a responsive, single-page React application that demonstrates how to:

- **Fetch** quiz questions from an external API.  
- **Obfuscate** correct/incorrect answers in **base64** so that answers are not stored in plain text in the front-end.  
- Display a **timer** (30 minutes) that auto-submits the quiz when time runs out.  
- Provide **navigation** between questions and a summary **report** once the quiz is complete or time is up.  

I used React best practices and separated functionality into distinct, maintainable components. The UI is styled for clarity, and the code is structured to allow future modifications and scaling.

---

## Features

1. **Email Authentication**: Users enter an email to start the quiz.  
2. **15 Random Questions**: Fetched from Open Trivia DB.  
3. **Base64 Obfuscation**: Both correct and incorrect answers are encoded to discourage casual DevTools inspection.  
4. **30-Minute Timer**: Automatically submits upon reaching zero.  
5. **Question Navigation**: Jump to any question; see which questions are visited or attempted.  
6. **Responsive Layout**: Suitable for mobile, tablet, and desktop screen sizes.  
7. **Final Report**: Displays each question, user’s answer, and correct answer side by side, along with a final score.

---

## Architecture & Components

The application is built with **React 18.2.0**, using the following components:

- **`App.js`**: Main entry point controlling which page (Start, Quiz, Report) is displayed.  
- **`StartPage.js`**: Collects user’s email.  
- **`QuizPage.js`**: 
  - Fetches questions from the API, encodes answers, and stores them in local state.  
  - Displays questions and handles user responses.  
  - Includes a timer (via `Timer.js`) and a navigation overview (via `Overview.js`).  
- **`ReportPage.js`**:  
  - Decodes user answers and correct answers.  
  - Shows final score, user’s selections, and correct responses.  
- **`Timer.js`**: Manages countdown. Triggers auto-submit when time hits zero.  
- **`Overview.js`**: Renders a set of clickable boxes for question navigation (visited/attempted states).  
- **`Header.js`**: Renders a shared brand title at the top of the application.  
- **`App.css`**: Global styling with classes for containers, buttons, transitions, and responsive layouts.

---

## Setup & Installation

1. **Clone** or download the repository:
   ```bash
   git clone https://github.com/shaansuraj/causalfunnel-quiz.git
   ```
2. **Navigate** into the project directory:
   ```bash
   cd causalfunnel-quiz
   ```
3. **Install dependencies** (must have Node.js 14+ and npm 6+ or Yarn):
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
4. **Start** the development server:
   ```bash
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the running app.

---

## Assumptions

1. **User Input**: Assuming the user enters a valid email address. There is no backend validation or server-side user authentication(I was unsure if I should add as the mail did not mention it)  
2. **API Availability**: The [Open Trivia Database](https://opentdb.com/api.php?amount=15) API is reachable and responds with a valid set of results.  
3. **Pure Client-Side**: All logic runs in the browser. Correct answers are only **obfuscated** with base64, not fully secured by a backend.  
4. **One Quiz Attempt**: The application is intended for a single quiz session at a time.  

---

## Challenges & Solutions

1. **Preventing Users from Seeing Correct Answers via DevTools**  
   **Challenge**: Front-end apps must store correct answers to compare them for scoring. Without a secure backend, advanced users can still see these in DevTools.  
   **Solution**: We used **base64 encoding** (`btoa`/`atob`) to **obfuscate** both correct and incorrect answers. This **deters** casual users from simply reading the correct answers in plain text. For fully secure approaches, we would implement server-side scoring to avoid sending correct answers to the client altogether.  

2. **Maintaining a Responsive UI**  
   **Challenge**: Ensuring a consistent layout across devices of varying sizes.  
   **Solution**: Used CSS flexbox, media queries, and adaptive styles to handle smaller screens (e.g., scaling font sizes, rearranging elements).

3. **Time Management**  
   **Challenge**: Keeping an accurate 30-minute countdown that auto-submits.  
   **Solution**: Created a reusable `Timer` component that uses `setInterval` and a local `timeLeft` state. Calls a callback (`onTimeUp`) when it reaches zero.

4. **Question Navigation**  
   **Challenge**: Allowing the user to jump to any question while also showing visited/attempted states.  
   **Solution**: Created an `Overview` component that displays clickable boxes for each question. The state (`visited`, `attempted`) is inferred from the user’s stored answers.

---

## License

This project is distributed under the **MIT License**. Feel free to use and modify it for personal or commercial purposes. For more details, see the [LICENSE](LICENSE) file (if included) or consult the [MIT license text](https://opensource.org/licenses/MIT).

---

**Thank you** CausalFunnel for giving me this opportunity to create this application. 
**Thank You** to everyone for reviewing this README. We hope the **CausalFunnel Quiz** application demonstrates my client-side approach to quizzing with basic security measures (base64 obfuscation), while acknowledging the inherent limitations of storing answers purely in the front end. For a fully secure approach, a backend service must handle the correct answers and scoring logic.

