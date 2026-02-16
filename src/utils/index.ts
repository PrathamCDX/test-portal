
// import ejs from 'ejs';
import MarkdownIt from 'markdown-it'; 

import { CandidateResult } from '@/types';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true, });

export const intermediateEjs = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Card</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "Poppins", sans-serif;
        }

        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .header {
            width: 100vw;
            background-color: #191e25;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 24px;
            color: white;
        }

        .headerLeft {
            display: flex;
            align-items: center;
            gap: 28px;
        }

        .headerTitle {
            font-weight: 600;
            font-size: 1.125rem;
        }

        .headerName {
            font-weight: 600;
            font-size: 1.25rem;
            text-transform: uppercase;
        }

        .container {
            width: 95%;
            margin: 0 auto;
            padding-top: 48px;
        }

        .topRow {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .wrapper {
            position: relative;
            width: 6rem;
            height: 6rem;
        }

        .svg {
            width: 100%;
            height: 100%;
            transform: rotate(135deg);
        }

        .bgCircle {
            stroke: #e5e7eb;
        }

        .progressCircle {
            transition: all 0.5s ease-in-out;
        }

        .pass {
            stroke: #22c55e;
            color: #22c55e;
        }
        
        .fail {
            stroke: #fb2c36;
            color: #fb2c36;
        }

        .centerText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        .scoreText {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .status {
            display: block;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
        }

        .passBg {
            background-color: #dcfce7;
            color: #22c55e;
        }
        
        .failBg {
            background-color: #ffe2e2;
            color: #fb2c36;
        }

        .candidateName {
            color: #000000;
            font-size: 2.25rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .sectionStack {
            display: flex;
            flex-direction: column;
            gap: 64px;
            margin-top: 28px;
        }

        .card {
            width: 100%;
            border: 1.5px solid #e5e7eb;
            padding: 32px;
            color: #000000;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .cardTitle {
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .scoreRow {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .scorePercentage,
        .scoreBreakdown {
            font-size: 1.125rem;
        }
        
        .dot {
            font-size: 1.25rem;
        }
        
        .scoreInfo {
            color: #a1a1a1;
            font-size: 1.125rem;
        }

        .container {
            color: #1e2939;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .row {
            display: flex;
            align-items: flex-start;
            gap: 2.5rem;
            font-size: 16px;
            padding-left: 1.25rem;
        }
        
        .label {
            width: 9rem;
            color: #6a7282;
            font-weight: 500;
        }

        .resultContainer {
            color: #1e2939;
            font-size: 14px;
            width: 92%;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .topicTitle {
            font-weight: 600;
            font-size: 18px;
        }

        .tableWrapper {
            width: 100%;
            overflow-x: auto;
            border-radius: 0.375rem;
            border: 1px solid #d1d5dc;
        }

        .table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }
        
        .thead {
            background-color: #d1d5dc;
            color: #000000;
            border-bottom: 1px solid #d1d5dc;
        }
        
        .th,
        .td {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        .th:nth-child(1) {
            width: 60px;
        }
        
        .th:nth-child(2) {
            width: 40px;
        }
        
        .th:nth-child(3) {
            width: 160px;
        }
        
        .th:nth-child(4),
        .th:nth-child(5) {
            width: 100px;
        }
        
        .th:nth-child(6) {
            width: 60px;
        }

        .tbodyRow {
            border-bottom: 1px solid #d1d5dc;
        }

        .statusCell {
            display: flex;
            justify-content: center;
        }
        
        .questionId {
            font-weight: 500;
            font-size: 14px;
        }
        
        .questionType {
            font-size: 12px;
            color: #6a7282;
        }
        
        .correctAnswer {
            color: #6a7282;
        }
        
        .score {
            font-weight: 500;
        }

        .icon {
            width: 16px;
            height: 16px;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .icon-cross {
            stroke: #fb2c36;
        }

        .icon-check {
            stroke: #28a745;
        }

        .question {
            font-weight: 600;
            font-size: 16px;
        }

        .question-option {
            width: 100%;
            border: 1px solid #c1c2c3;
            border-radius: 8px;
            padding: 5px 10px;
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
        }

        .question-option-wrong {
            border-color: #fb2c36;
        }

        .question-option-correct {
            border-color: #28a745;
        }

        .question-option-unattempted {
            border-color: #6f6fdde0;
        }

        .options-container {
            padding-left: 10px;
            margin-bottom: 20px;
        }

        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
            font-weight: 400;
        }

        .markdown-body strong {
            font-weight: 500; 
        }

    </style>
</head>
<body>
    <div class="main-container">
        <div id="report">

            <% 
                const safeCandidateName = candidateName || '';
                const safePercentage = typeof percentage === 'number' ? percentage : 0;
                const safeObtainedMarks = typeof obtainedMarks === 'number' ? obtainedMarks : 0;
                const safeTotalMarks = typeof totalMarks === 'number' ? totalMarks : 0;
                const safeSections = Array.isArray(sections) ? sections : [];
            %>

            <!-- Header -->
            <div class="header">
                <div class="headerLeft">
                    <img src="https://res.cloudinary.com/dntlt89bt/image/upload/v1745225415/logo_t4e55f.png"
                        width="40px" height="45px" />
                    <span class="headerTitle">
                        InterviewCall Entrance Test
                    </span>
                </div>
                <p class="headerName"><%= safeCandidateName %></p>
            </div>

            <div class="container">
                <div class="topRow">

                    <!-- Gauge -->
                    <div class="wrapper">
                        <svg id="scoreGauge" class="svg" viewBox="0 0 36 36"
                            aria-label='Score: <%= safePercentage %> percent. <%= safePercentage >= 50 ? "Pass" : "Fail" %>'>

                            <circle cx="18" cy="18" r="16"
                                fill="none"
                                class="bgCircle"
                                stroke-width="3"
                                stroke-dasharray="75 100"
                                stroke-linecap="round" />

                            <circle cx="18" cy="18" r="16"
                                fill="none"
                                class="progressCircle <%= safePercentage >= 50 ? 'pass' : 'fail' %>"
                                stroke-width="3"
                                stroke-dasharray="<%= (safePercentage * 75) / 100 %> 100"
                                stroke-linecap="round" />
                        </svg>

                        <div class="centerText">
                            <span class="scoreText <%= safePercentage >= 50 ? 'pass' : 'fail' %>">
                                <%= safePercentage %>%
                            </span>
                            <span class="status <%= safePercentage >= 50 ? 'passBg' : 'failBg' %>">
                                <%= safePercentage >= 50 ? 'Pass' : 'Fail' %>
                            </span>
                        </div>
                    </div>

                    <p class="candidateName"><%= safeCandidateName %></p>
                </div>

                <div class="sectionStack">

                    <!-- Score Card -->
                    <div class="card">
                        <p class="cardTitle">Score</p>
                        <div>
                            <div class="scoreRow">
                                <p class="scorePercentage"><%= safePercentage %>%</p>
                                <p class="dot">•</p>
                                <p class="scoreBreakdown">
                                    <%= safeObtainedMarks %> / <%= safeTotalMarks %>
                                </p>
                            </div>
                            <p class="scoreInfo">
                                scored in InterviewCall Entrance Test
                            </p>
                        </div>
                    </div>

                    <!-- Candidate Info -->
                    <div class="card">
                        <p class="cardTitle">Candidate Information</p>
                        <div class="container">

                            <div class="row">
                                <div class="label">Email</div>
                                <div><%= candidateEmail || 'NA' %></div>
                            </div>

                            <div class="row">
                                <div class="label">Test</div>
                                <div>InterviewCall Entrance Test</div>
                            </div>

                            <div class="row">
                                <div class="label">Taken On</div>
                                <div><%= takenOn || 'NA' %></div>
                            </div>

                            <div class="row">
                                <div class="label">Time Taken</div>
                                <div><%= timeTaken || 'NA' %></div>
                            </div>

                            <div class="row">
                                <div class="label">Work Experience</div>
                                <div><%= workExperience != null ? workExperience + ' years' : 'NA' %></div>
                            </div>

                            <div class="row">
                                <div class="label">Invited By</div>
                                <div><%= invitedBy || 'NA' %></div>
                            </div>

                            <div class="row">
                                <div class="label">Invited On</div>
                                <div><%= invitedOn || 'NA' %></div>
                            </div>

                        </div>
                    </div>

                    <!-- Result Section -->
                    <div class="card">

                        <% safeSections.forEach(function(section, sectionIndex) { 
                            const safeQuestions = Array.isArray(section?.questions) ? section.questions : [];
                        %>

                        <div class="resultContainer">

                            <div class="topicTitle">
                                <%= section?.section || 'Section' %> •
                                <%= section?.obtainedMarks || 0 %> /
                                <%= section?.totalMarks || 0 %>
                            </div>

                            <% safeQuestions.forEach(function(question) { 
                                const safeOptions = Array.isArray(question?.options) ? question.options : [];
                            %>

                            <div class="question-container">
                                <div class="question markdown-body">
                                    <%- question?.problemStatement || '' %>
                                </div>

                                <div class="options-container">

                                    <% safeOptions.forEach(function(option) { 
                                        let optionClass = '';
                                        const correct = question?.correctOption;
                                        const userAnswer = question?.userAnswer;

                                        if (correct === option) {
                                            if (userAnswer == null) {
                                                optionClass = 'question-option-unattempted';
                                            } else if (userAnswer === option) {
                                                optionClass = 'question-option-correct';
                                            } else {
                                                optionClass = 'question-option-wrong';
                                            }
                                        }
                                    %>

                                    <div class="question-option <%= optionClass %>">
                                        <%= option || '' %>
                                    </div>

                                    <% }); %>
                                </div>
                            </div>

                            <% }); %>

                            <!-- Summary Table -->
                            <div class="tableWrapper">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Question No.</th>
                                            <th>Question</th>
                                            <th>Chosen Answer</th>
                                            <th>Correct Answer</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <% safeQuestions.forEach(function(question) { %>

                                        <tr>
                                            <td>
                                                <%= question?.isCorrect ? '✔' : (question?.userAnswer == null ? '–' : '✖') %>
                                            </td>
                                            <td><%= question?.questionNumber || '' %></td>
                                            <td>
                                                <div><%= question?.questionTitle || '' %></div>
                                                <div>Multiple Choice</div>
                                            </td>
                                            <td><%= question?.userAnswer || 'NA' %></td>
                                            <td><%= question?.correctOption || '' %></td>
                                            <td>
                                                <%= question?.marksAwarded || 0 %> /
                                                <%= question?.marksTotal || 0 %>
                                            </td>
                                        </tr>

                                        <% }); %>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <% }); %>

                    </div>

                </div>
            </div>
        </div>
    </div>
</body>

</html>

`;


// export async function renderIntermediateReportCard(candidateResult: CandidateResult): Promise<string> {
//   const path = eval('require')('path');
//   const fs = eval('require')('fs');
//   const templatePath = path.join(process.cwd(), 'src/utils/intermediateReportCardTemplate.ejs');
//   const template = fs.readFileSync(templatePath, 'utf-8');
//   return ejs.render(template, {
//     candidateName: candidateResult.candidateName,
//     candidateEmail: candidateResult.candidateEmail,
//     percentage: candidateResult.percentage,
//     totalMarks: candidateResult.totalMarks,
//     obtainedMarks: candidateResult.obtainedMarks,
//     invitedBy: candidateResult.invitedBy,
//     invitedOn: candidateResult.invitedOn,
//     takenOn: candidateResult.takenOn,
//     timeTaken: candidateResult.timeTaken,
//     workExperience: candidateResult.workExperience,
//     sections: candidateResult.sections
//   });
// }

// export async function renderAdvancedReportCard(candidateResult: CandidateResult): Promise<string> {
//   const path = eval('require')('path');
//   const fs = eval('require')('fs');
//   const templatePath = path.join(process.cwd(), 'src/templates/advancedReportCardTemplate.ejs');
//   const template = fs.readFileSync(templatePath, 'utf-8');
//   return ejs.render(template, {
//     candidateName: candidateResult.candidateName,
//     candidateEmail: candidateResult.candidateEmail,
//     percentage: candidateResult.percentage,
//     totalMarks: candidateResult.totalMarks,
//     obtainedMarks: candidateResult.obtainedMarks,
//     invitedBy: candidateResult.invitedBy,
//     invitedOn: candidateResult.invitedOn,
//     takenOn: candidateResult.takenOn,
//     timeTaken: candidateResult.timeTaken,
//     workExperience: candidateResult.workExperience,
//     sections: candidateResult.sections
//   });
// }


export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(new Date(date));
};

export const formatOnlyDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(date));
};

export const formatTime = (time: Date) => {
  return Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(new Date(time));
};

export const formatDuration = (durationInMs: number) => {
  const minutes = Math.floor(durationInMs / 60000);
  const seconds = Math.floor((durationInMs % 60000) / 1000);
  return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
};


export function intermediateTestPdfContent(candidateResult: CandidateResult) {
    const { candidateName, candidateEmail, percentage, totalMarks, obtainedMarks, invitedBy, invitedOn, takenOn, timeTaken, workExperience, sections } = candidateResult;
    const result = sections;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Card</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "Poppins", sans-serif;
        }

        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .header {
            width: 100vw;
            background-color: #191e25;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 24px;
            color: white;
        }

        .headerLeft {
            display: flex;
            align-items: center;
            gap: 28px;
        }

        .headerTitle {
            font-weight: 600;
            font-size: 1.125rem;
        }

        .headerName {
            font-weight: 600;
            font-size: 1.25rem;
            text-transform: uppercase;
        }

        .container {
            width: 95%;
            margin: 0 auto;
            padding-top: 48px;
        }

        .topRow {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .wrapper {
            position: relative;
            width: 6rem;
            height: 6rem;
        }

        .svg {
            width: 100%;
            height: 100%;
            transform: rotate(135deg);
        }

        .bgCircle {
            stroke: #e5e7eb;
        }

        .progressCircle {
            transition: all 0.5s ease-in-out;
        }

        .pass {
            stroke: #22c55e;
            color: #22c55e;
        }
        
        .fail {
            stroke: #fb2c36;
            color: #fb2c36;
        }

        .centerText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        .scoreText {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .status {
            display: block;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
        }

        .passBg {
            background-color: #dcfce7;
            color: #22c55e;
        }
        
        .failBg {
            background-color: #ffe2e2;
            color: #fb2c36;
        }

        .candidateName {
            color: #000000;
            font-size: 2.25rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .sectionStack {
            display: flex;
            flex-direction: column;
            gap: 64px;
            margin-top: 28px;
        }

        .card {
            width: 100%;
            border: 1.5px solid #e5e7eb;
            padding: 32px;
            color: #000000;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .cardTitle {
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .scoreRow {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .scorePercentage,
        .scoreBreakdown {
            font-size: 1.125rem;
        }
        
        .dot {
            font-size: 1.25rem;
        }
        
        .scoreInfo {
            color: #a1a1a1;
            font-size: 1.125rem;
        }

        .container {
            color: #1e2939;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .row {
            display: flex;
            align-items: flex-start;
            gap: 2.5rem;
            font-size: 16px;
            padding-left: 1.25rem;
        }
        
        .label {
            width: 9rem;
            color: #6a7282;
            font-weight: 500;
        }

        .resultContainer {
            color: #1e2939;
            font-size: 14px;
            width: 92%;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .topicTitle {
            font-weight: 600;
            font-size: 18px;
        }

        .tableWrapper {
            width: 100%;
            overflow-x: auto;
            border-radius: 0.375rem;
            border: 1px solid #d1d5dc;
        }

        .table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }
        
        .thead {
            background-color: #d1d5dc;
            color: #000000;
            border-bottom: 1px solid #d1d5dc;
        }
        
        .th,
        .td {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        .th:nth-child(1) {
            width: 60px;
        }
        
        .th:nth-child(2) {
            width: 40px;
        }
        
        .th:nth-child(3) {
            width: 160px;
        }
        
        .th:nth-child(4),
        .th:nth-child(5) {
            width: 100px;
        }
        
        .th:nth-child(6) {
            width: 60px;
        }

        .tbodyRow {
            border-bottom: 1px solid #d1d5dc;
        }

        .statusCell {
            display: flex;
            justify-content: center;
        }
        
        .questionId {
            font-weight: 500;
            font-size: 14px;
        }
        
        .questionType {
            font-size: 12px;
            color: #6a7282;
        }
        
        .correctAnswer {
            color: #6a7282;
        }
        
        .score {
            font-weight: 500;
        }

        .icon {
            width: 16px;
            height: 16px;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .icon-cross {
            stroke: #fb2c36; /* red */
        }

        .icon-check {
            stroke: #28a745; /* green */
        }

        .question {
            font-weight: 600;
            font-size: 16px;
        }

        .question-option {
            width: 100%;
            border: 1px solid #c1c2c3;
            border-radius: 8px;
            padding: 5px 10px;
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
        }

        .question-option-wrong {
            border-color: #fb2c36;
        }

        .question-option-correct {
            border-color: #28a745;
        }

        .question-option-unattempted {
            border-color: #6f6fdde0;
        }

        .options-container {
            padding-left: 10px;
            margin-bottom: 15px;
        }

        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
            font-weight: 400;
        }

        .markdown-body strong {
            font-weight: 500; 
        }

    </style>
</head>
<body>
    <div class="main-container">
        <div id="report">

            <!-- Header content -->
            <div class="header">
                <div class="headerLeft">
                    <img src="https://res.cloudinary.com/dntlt89bt/image/upload/v1745225415/logo_t4e55f.png" width="40px" height="45px" />
                    <span class="headerTitle">
                        InterviewCall Entrance Test
                    </span>
                </div>
                <p class="headerName">${candidateName}</p>
            </div>
            <!-- Header content -->

            <!-- Page content -->
            <div class="container">
                <div class="topRow">
                    <!-- Progressbar -->
                    <div class="wrapper">
                        <svg id="scoreGauge" class="svg" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-label='Score: ${percentage} percent. ${percentage >= 50 ? 'Pass' : 'Fail'}'>
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="bgCircle"
                                stroke-width="3"
                                stroke-dasharray="75 100"
                                stroke-linecap="round"
                            />
                            <circle
                                id="progressCircle"
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="progressCircle ${percentage >= 50 ? 'pass' : 'fail'}"
                                stroke-width="3"
                                stroke-dasharray='${(percentage * 75) / 100} 100'
                                stroke-linecap="round"
                            />
                        </svg>

                        <div class="centerText">
                            <span id="scoreText" class="scoreText ${percentage >= 50 ? 'pass' : 'fail'}">${percentage}%</span>
                            <span id="status" class="status ${percentage >= 50 ? 'passBg' : 'failBg'}">${percentage >= 50 ? 'Pass' : 'Fail'}</span>
                        </div>
                    </div>
                    <!-- Progressbar -->

                    <p id="candidateName" class="candidateName">${candidateName}</p>
                </div>

                <div class="sectionStack">
                    <!-- Score Box -->
                    <div class="card">
                        <p class="cardTitle">Score</p>
                        <div>
                            <div class="scoreRow">
                                <p id="scorePercentage" class="scorePercentage">${percentage}%</p>
                                <p class="dot">•</p>
                                <p id="scoreBreakdown" class="scoreBreakdown">${obtainedMarks} / ${totalMarks}</p>
                            </div>
                            <p class="scoreInfo">
                                scored in InterviewCall Entrance Test
                            </p>
                        </div>
                    </div>
                    <!-- Score Box -->

                    <!-- Candidate Info -->
                    <div class="card">
                        <p class="cardTitle">Candidate Information</p>
                        <div class="container">
                            <div class="row">
                                <div class="label">Email</div>
                                <div id="email">${candidateEmail}</div>
                            </div>

                            <div class="row">
                                <div class="label">Test</div>
                                <div>InterviewCall Entrance Test</div>
                            </div>

                            <div class="row">
                                <div class="label">Taken On</div>
                                <div id="takenOn">${takenOn}</div>
                            </div>

                            <div class="row">
                                <div class="label">Time Taken</div>
                                <div id="timeTaken">${timeTaken}</div>
                            </div>

                            <div class="row">
                                <div class="label">Work Experience</div>
                                <div id="workExperience">${workExperience} years</div>
                            </div>
                            
                            <div class="row">
                                <div class="label">Invited By</div>
                                <div id="invitedBy">${invitedBy}</div>
                            </div>

                            <div class="row">
                                <div class="label">Invited On</div>
                                <div id="invitedOn">${invitedOn}</div>
                            </div>
                        </div>
                    </div>
                    <!-- Candidate Info -->

                    <!-- Result Section -->
                    <div id="resultSection" class="card">
                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[0].section} • ${result[0].obtainedMarks} / ${result[0].totalMarks}
                            </div>
                            
                            <!-- Section 1 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[0].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[0]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[0]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[1]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[1]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[2]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[2]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[3]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[3]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[0].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[0]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[0]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[1]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[1]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[2]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[2]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[3]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[3]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[0].userAnswer ? result[0].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[0].correctOption}</td>
                                            <td class="td score">${result[0].questions[0].marksAwarded} / ${result[0].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[1].userAnswer ? result[0].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[1].correctOption}</td>
                                            <td class="td score">${result[0].questions[1].marksAwarded} / ${result[0].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[1].section} • ${result[1].obtainedMarks} / ${result[1].totalMarks}
                            </div>

                            <!-- Section 2 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[1].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[0]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[0]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[1]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[1]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[2]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[2]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[3]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[3]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[1].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[0]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[0]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[1]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[1]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[2]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[2]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[3]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[3]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- Question 3 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[1].questions[2].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[0]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[0]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[1]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[1]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[2]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[2]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[3]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[3]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[0].userAnswer ? result[1].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[0].correctOption}</td>
                                            <td class="td score">${result[1].questions[0].marksAwarded} / ${result[1].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[1].userAnswer ? result[1].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[1].correctOption}</td>
                                            <td class="td score">${result[1].questions[1].marksAwarded} / ${result[1].questions[1].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[2].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[2].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[2].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[2].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[2].userAnswer ? result[1].questions[2].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[2].correctOption}</td>
                                            <td class="td score">${result[1].questions[2].marksAwarded} / ${result[1].questions[2].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[2].section} • ${result[2].obtainedMarks} / ${result[2].totalMarks}
                            </div>

                            <!-- Section 3 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[1].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[0]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[0]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[1]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[1]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[2]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[2]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[3]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[3]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[2].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[0]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[0]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[1]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[1]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[2]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[2]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[3]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[3]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[2].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[2].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[2].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[2].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[2].questions[0].userAnswer ? result[2].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[2].questions[0].correctOption}</td>
                                            <td class="td score">${result[2].questions[0].marksAwarded} / ${result[2].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[2].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[2].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[2].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[2].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[2].questions[1].userAnswer ? result[2].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[2].questions[1].correctOption}</td>
                                            <td class="td score">${result[2].questions[1].marksAwarded} / ${result[2].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[3].section} • ${result[3].obtainedMarks} / ${result[3].totalMarks}
                            </div>

                            <!-- Section 1 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[3].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[0]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[0]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[1]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[1]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[2]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[2]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[3]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[3]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[3].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[0]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[0]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[1]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[1]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[2]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[2]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[3]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[3]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 3 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[3].questions[2].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[0]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[0]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[2].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[1]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[1]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[2].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[2]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[2]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[2].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[3]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[2].correctOption === result[3].questions[2].options[3]
                                                ? result[3].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[2].userAnswer === result[3].questions[2].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[2].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[0].userAnswer ? result[3].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[0].correctOption}</td>
                                            <td class="td score">${result[3].questions[0].marksAwarded} / ${result[3].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[1].userAnswer ? result[3].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[1].correctOption}</td>
                                            <td class="td score">${result[3].questions[1].marksAwarded} / ${result[3].questions[1].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[2].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[2].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[2].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[2].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[2].userAnswer ? result[3].questions[2].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[2].correctOption}</td>
                                            <td class="td score">${result[3].questions[1].marksAwarded} / ${result[3].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[4].section} • ${result[4].obtainedMarks} / ${result[4].totalMarks}
                            </div>

                            <!-- Section 5 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[4].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[0]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[0]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[1]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[1]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[2]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[2]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[3]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[3]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[4].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[0]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[0]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[1]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[1]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[2]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[2]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[3]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[1].correctOption === result[4].questions[1].options[3]
                                                ? result[4].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[1].userAnswer === result[4].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[4].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[4].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[4].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[4].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[4].questions[0].userAnswer ? result[4].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[4].questions[0].correctOption}</td>
                                            <td class="td score">${result[4].questions[0].marksAwarded} / ${result[4].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[4].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[4].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[4].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[4].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[4].questions[1].userAnswer ? result[4].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[4].questions[1].correctOption}</td>
                                            <td class="td score">${result[4].questions[1].marksAwarded} / ${result[4].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[5].section} • ${result[5].obtainedMarks} / ${result[5].totalMarks}
                            </div>

                            <!-- Section 6 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[5].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[0]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[0]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[1]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[1]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[2]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[2]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[3]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[3]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[5].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[0]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[0]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[1]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[1]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[2]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[2]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[3]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[1].correctOption === result[5].questions[1].options[3]
                                                ? result[5].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[1].userAnswer === result[5].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[5].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[5].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[5].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[5].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[5].questions[0].userAnswer ? result[5].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[5].questions[0].correctOption}</td>
                                            <td class="td score">${result[5].questions[0].marksAwarded} / ${result[5].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[5].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[5].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[5].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[5].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[5].questions[1].userAnswer ? result[5].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[5].questions[1].correctOption}</td>
                                            <td class="td score">${result[5].questions[1].marksAwarded} / ${result[5].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[6].section} • ${result[6].obtainedMarks} / ${result[6].totalMarks}
                            </div>

                            <!-- Section 7 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[6].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[0]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[0]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[6].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[1]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[1]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[6].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[2]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[2]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[6].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[3]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[6].questions[0].correctOption === result[6].questions[0].options[3]
                                                ? result[6].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[6].questions[0].userAnswer === result[6].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[6].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[6].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[6].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[6].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[6].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[6].questions[0].userAnswer ? result[6].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[6].questions[0].correctOption}</td>
                                            <td class="td score">${result[6].questions[0].marksAwarded} / ${result[6].questions[0].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[7].section} • ${result[7].obtainedMarks} / ${result[7].totalMarks}
                            </div>

                            <!-- Section 8 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[7].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[0]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[0]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[1]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[1]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[2]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[2]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[3]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[0].correctOption === result[7].questions[0].options[3]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[0].userAnswer === result[7].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[7].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[0]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[0]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[1]
                                                ? result[7].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[1]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[2]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[2]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[3]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[7].questions[1].correctOption === result[7].questions[1].options[3]
                                                ? result[7].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[7].questions[1].userAnswer === result[7].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[7].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[7].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[7].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[7].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[7].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[7].questions[0].userAnswer ? result[7].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[7].questions[0].correctOption}</td>
                                            <td class="td score">${result[7].questions[0].marksAwarded} / ${result[7].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[7].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[7].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[7].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[7].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[7].questions[1].userAnswer ? result[7].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[7].questions[1].correctOption}</td>
                                            <td class="td score">${result[7].questions[1].marksAwarded} / ${result[7].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[8].section} • ${result[8].obtainedMarks} / ${result[8].totalMarks}
                            </div>

                            <!-- Section 1 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[8].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[0]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[0]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[8].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[1]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[1]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[8].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[2]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[2]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[8].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[3]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[8].questions[0].correctOption === result[8].questions[0].options[3]
                                                ? result[8].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[8].questions[0].userAnswer === result[8].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[8].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[8].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[8].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[8].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[8].questions[0].userAnswer ? result[8].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[8].questions[0].correctOption}</td>
                                            <td class="td score">${result[8].questions[0].marksAwarded} / ${result[8].questions[0].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[9].section} • ${result[9].obtainedMarks} / ${result[9].totalMarks}
                            </div>

                            <!-- Section 1 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[9].questions[0].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[0]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[0]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[1]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[1]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[2]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[2]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[3]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[0].correctOption === result[9].questions[0].options[3]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[0].userAnswer === result[9].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${result[9].questions[1].problemStatement}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[0]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[0]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[1]
                                                ? result[9].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[1]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[2]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[2]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[3]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[9].questions[1].correctOption === result[9].questions[1].options[3]
                                                ? result[9].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[9].questions[1].userAnswer === result[9].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[9].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[9].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[9].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[9].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[9].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[9].questions[0].userAnswer ? result[9].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[9].questions[0].correctOption}</td>
                                            <td class="td score">${result[9].questions[0].marksAwarded} / ${result[9].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[9].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[9].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[9].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[9].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[9].questions[1].userAnswer ? result[9].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[9].questions[1].correctOption}</td>
                                            <td class="td score">${result[9].questions[1].marksAwarded} / ${result[9].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function advancedTestPdfContent(candidateResult: CandidateResult) {
    const { candidateName, candidateEmail, percentage, totalMarks, obtainedMarks, invitedBy, invitedOn, takenOn, timeTaken, workExperience, sections } = candidateResult;
    const result = sections;

    const s1q1 = md.render(result[0].questions[0].problemStatement);
    const s1q2 = md.render(result[0].questions[1].problemStatement);
    const s1q3 = md.render(result[0].questions[2].problemStatement);

    const s2q1 = md.render(result[1].questions[0].problemStatement);
    const s2q2 = md.render(result[1].questions[1].problemStatement);
    const s2q3 = md.render(result[1].questions[2].problemStatement);

    const s3q1 = md.render(result[2].questions[0].problemStatement);
    const s3q2 = md.render(result[2].questions[1].problemStatement);

    const s4q1 = md.render(result[3].questions[0].problemStatement);
    const s4q2 = md.render(result[3].questions[1].problemStatement);

    const s5q1 = md.render(result[4].questions[0].problemStatement);

    const s6q1 = md.render(result[5].questions[0].problemStatement);


    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Card</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "Poppins", sans-serif;
        }

        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .header {
            width: 100vw;
            background-color: #191e25;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 24px;
            color: white;
        }

        .headerLeft {
            display: flex;
            align-items: center;
            gap: 28px;
        }

        .headerTitle {
            font-weight: 600;
            font-size: 1.125rem;
        }

        .headerName {
            font-weight: 600;
            font-size: 1.25rem;
            text-transform: uppercase;
        }

        .container {
            width: 95%;
            margin: 0 auto;
            padding-top: 48px;
        }

        .topRow {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .wrapper {
            position: relative;
            width: 6rem;
            height: 6rem;
        }

        .svg {
            width: 100%;
            height: 100%;
            transform: rotate(135deg);
        }

        .bgCircle {
            stroke: #e5e7eb;
        }

        .progressCircle {
            transition: all 0.5s ease-in-out;
        }

        .pass {
            stroke: #22c55e;
            color: #22c55e;
        }
        
        .fail {
            stroke: #fb2c36;
            color: #fb2c36;
        }

        .centerText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

        .scoreText {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .status {
            display: block;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
        }

        .passBg {
            background-color: #dcfce7;
            color: #22c55e;
        }
        
        .failBg {
            background-color: #ffe2e2;
            color: #fb2c36;
        }

        .candidateName {
            color: #000000;
            font-size: 2.25rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .sectionStack {
            display: flex;
            flex-direction: column;
            gap: 64px;
            margin-top: 28px;
        }

        .card {
            width: 100%;
            border: 1.5px solid #e5e7eb;
            padding: 32px;
            color: #000000;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .cardTitle {
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .scoreRow {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .scorePercentage,
        .scoreBreakdown {
            font-size: 1.125rem;
        }
        
        .dot {
            font-size: 1.25rem;
        }
        
        .scoreInfo {
            color: #a1a1a1;
            font-size: 1.125rem;
        }

        .container {
            color: #1e2939;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .row {
            display: flex;
            align-items: flex-start;
            gap: 2.5rem;
            font-size: 16px;
            padding-left: 1.25rem;
        }
        
        .label {
            width: 9rem;
            color: #6a7282;
            font-weight: 500;
        }

        .resultContainer {
            color: #1e2939;
            font-size: 14px;
            width: 92%;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .topicTitle {
            font-weight: 600;
            font-size: 18px;
        }

        .tableWrapper {
            width: 100%;
            overflow-x: auto;
            border-radius: 0.375rem;
            border: 1px solid #d1d5dc;
        }

        .table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }
        
        .thead {
            background-color: #d1d5dc;
            color: #000000;
            border-bottom: 1px solid #d1d5dc;
        }
        
        .th,
        .td {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        .th:nth-child(1) {
            width: 60px;
        }
        
        .th:nth-child(2) {
            width: 40px;
        }
        
        .th:nth-child(3) {
            width: 160px;
        }
        
        .th:nth-child(4),
        .th:nth-child(5) {
            width: 100px;
        }
        
        .th:nth-child(6) {
            width: 60px;
        }

        .tbodyRow {
            border-bottom: 1px solid #d1d5dc;
        }

        .statusCell {
            display: flex;
            justify-content: center;
        }
        
        .questionId {
            font-weight: 500;
            font-size: 14px;
        }
        
        .questionType {
            font-size: 12px;
            color: #6a7282;
        }
        
        .correctAnswer {
            color: #6a7282;
        }
        
        .score {
            font-weight: 500;
        }

        .icon {
            width: 16px;
            height: 16px;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .icon-cross {
            stroke: #fb2c36; /* red */
        }

        .icon-check {
            stroke: #28a745; /* green */
        }

        .question {
            font-weight: 600;
            font-size: 16px;
        }

        .question-option {
            width: 100%;
            border: 1px solid #c1c2c3;
            border-radius: 8px;
            padding: 5px 10px;
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
        }

        .question-option-wrong {
            border-color: #fb2c36;
        }

        .question-option-correct {
            border-color: #28a745;
        }

        .question-option-unattempted {
            border-color: #6f6fdde0;
        }

        .options-container {
            padding-left: 10px;
            margin-bottom: 20px;
        }

        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
            font-weight: 400;
        }

        .markdown-body strong {
            font-weight: 500; 
        }


    </style>
</head>
<body>
    <div class="main-container">
        <div id="report">

            <!-- Header content -->
            <div class="header">
                <div class="headerLeft">
                    <img src="https://res.cloudinary.com/dntlt89bt/image/upload/v1745225415/logo_t4e55f.png" width="40px" height="45px" />
                    <span class="headerTitle">
                        InterviewCall Entrance Test
                    </span>
                </div>
                <p class="headerName">${candidateName}</p>
            </div>
            <!-- Header content -->

            <!-- Page content -->
            <div class="container">
                <div class="topRow">
                    <!-- Progressbar -->
                    <div class="wrapper">
                        <svg id="scoreGauge" class="svg" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-label='Score: ${percentage} percent. ${percentage >= 50 ? 'Pass' : 'Fail'}'>
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="bgCircle"
                                stroke-width="3"
                                stroke-dasharray="75 100"
                                stroke-linecap="round"
                            />
                            <circle
                                id="progressCircle"
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="progressCircle ${percentage >= 50 ? 'pass' : 'fail'}"
                                stroke-width="3"
                                stroke-dasharray='${(percentage * 75) / 100} 100'
                                stroke-linecap="round"
                            />
                        </svg>

                        <div class="centerText">
                            <span id="scoreText" class="scoreText ${percentage >= 50 ? 'pass' : 'fail'}">${percentage}%</span>
                            <span id="status" class="status ${percentage >= 50 ? 'passBg' : 'failBg'}">${percentage >= 50 ? 'Pass' : 'Fail'}</span>
                        </div>
                    </div>
                    <!-- Progressbar -->

                    <p id="candidateName" class="candidateName">${candidateName}</p>
                </div>

                <div class="sectionStack">
                    <!-- Score Box -->
                    <div class="card">
                        <p class="cardTitle">Score</p>
                        <div>
                            <div class="scoreRow">
                                <p id="scorePercentage" class="scorePercentage">${percentage}%</p>
                                <p class="dot">•</p>
                                <p id="scoreBreakdown" class="scoreBreakdown">${obtainedMarks} / ${totalMarks}</p>
                            </div>
                            <p class="scoreInfo">
                                scored in InterviewCall Entrance Test
                            </p>
                        </div>
                    </div>
                    <!-- Score Box -->

                    <!-- Candidate Info -->
                    <div class="card">
                        <p class="cardTitle">Candidate Information</p>
                        <div class="container">
                            <div class="row">
                                <div class="label">Email</div>
                                <div id="email">${candidateEmail}</div>
                            </div>

                            <div class="row">
                                <div class="label">Test</div>
                                <div>InterviewCall Entrance Test</div>
                            </div>

                            <div class="row">
                                <div class="label">Taken On</div>
                                <div id="takenOn">${takenOn}</div>
                            </div>

                            <div class="row">
                                <div class="label">Time Taken</div>
                                <div id="timeTaken">${timeTaken}</div>
                            </div>

                            <div class="row">
                                <div class="label">Work Experience</div>
                                <div id="workExperience">${workExperience} years</div>
                            </div>
                            
                            <div class="row">
                                <div class="label">Invited By</div>
                                <div id="invitedBy">${invitedBy}</div>
                            </div>

                            <div class="row">
                                <div class="label">Invited On</div>
                                <div id="invitedOn">${invitedOn}</div>
                            </div>
                        </div>
                    </div>
                    <!-- Candidate Info -->

                    <!-- Result Section -->
                    <div id="resultSection" class="card">
                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[0].section} • ${result[0].obtainedMarks} / ${result[0].totalMarks}
                            </div>

                            <!-- Section 1 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s1q1}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[0]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[0]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[1]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[1]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[2]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[2]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[3]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[0].correctOption === result[0].questions[0].options[3]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[0].userAnswer === result[0].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s1q2}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[0]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[0]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[1]
                                                ? result[0].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[1]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[2]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[2]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[3]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[1].correctOption === result[0].questions[1].options[3]
                                                ? result[0].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[1].userAnswer === result[0].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 3 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s1q3}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[0]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[0]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[2].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[1]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[1]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[2].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[2]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[2]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[2].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[3]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[0].questions[2].correctOption === result[0].questions[2].options[3]
                                                ? result[0].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[0].questions[2].userAnswer === result[0].questions[2].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[0].questions[2].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[0].userAnswer ? result[0].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[0].correctOption}</td>
                                            <td class="td score">${result[0].questions[0].marksAwarded} / ${result[0].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[1].userAnswer ? result[0].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[1].correctOption}</td>
                                            <td class="td score">${result[0].questions[1].marksAwarded} / ${result[0].questions[1].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[0].questions[2].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[0].questions[2].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[0].questions[2].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[0].questions[2].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[0].questions[2].userAnswer ? result[0].questions[2].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[0].questions[2].correctOption}</td>
                                            <td class="td score">${result[0].questions[2].marksAwarded} / ${result[0].questions[2].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[1].section} • ${result[1].obtainedMarks} / ${result[1].totalMarks}
                            </div>

                            <!-- Section 2 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s2q1}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[0]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[0]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[1]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[1]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[2]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[2]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[3]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[0].correctOption === result[1].questions[0].options[3]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[0].userAnswer === result[1].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s2q2}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[0]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[0]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[1]
                                                ? result[1].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[1]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[2]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[2]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[3]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[1].correctOption === result[1].questions[1].options[3]
                                                ? result[1].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[1].userAnswer === result[1].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 3 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s2q3}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[0]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[0]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[1]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[1]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[2]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[2]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[3]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[1].questions[2].correctOption === result[1].questions[2].options[3]
                                                ? result[1].questions[2].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[1].questions[2].userAnswer === result[1].questions[2].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[1].questions[2].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[0].userAnswer ? result[1].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[0].correctOption}</td>
                                            <td class="td score">${result[1].questions[0].marksAwarded} / ${result[1].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[1].userAnswer ? result[1].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[1].correctOption}</td>
                                            <td class="td score">${result[1].questions[1].marksAwarded} / ${result[1].questions[1].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[1].questions[2].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[1].questions[2].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[1].questions[2].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[1].questions[2].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[1].questions[2].userAnswer ? result[1].questions[2].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[1].questions[2].correctOption}</td>
                                            <td class="td score">${result[1].questions[2].marksAwarded} / ${result[1].questions[2].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[2].section} • ${result[2].obtainedMarks} / ${result[2].totalMarks}
                            </div>

                            <!-- Section 3 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s3q1}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[0]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[0]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[1]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[1]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[2]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[2]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[3]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[0].correctOption === result[2].questions[0].options[3]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[0].userAnswer === result[2].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s3q2}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[0]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[0]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[1]
                                                ? result[2].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[1]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[2]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[2]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[3]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[2].questions[1].correctOption === result[2].questions[1].options[3]
                                                ? result[2].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[2].questions[1].userAnswer === result[2].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[2].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[2].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[2].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[2].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[2].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[2].questions[0].userAnswer ? result[2].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[2].questions[0].correctOption}</td>
                                            <td class="td score">${result[2].questions[0].marksAwarded} / ${result[2].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[2].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[2].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[2].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[2].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[2].questions[1].userAnswer ? result[2].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[2].questions[1].correctOption}</td>
                                            <td class="td score">${result[2].questions[1].marksAwarded} / ${result[2].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[3].section} • ${result[3].obtainedMarks} / ${result[3].totalMarks}
                            </div>

                            <!-- Section 4 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question-markdown-body">
                                        ${s4q1}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[0]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[0]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[1]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[1]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[2]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[2]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[3]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[0].correctOption === result[3].questions[0].options[3]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[0].userAnswer === result[3].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>

                                <!-- question 2 -->
                                <div class="question-container">
                                    <div class="question-markdown-body">
                                        ${s4q2}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[0]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[0]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[1]
                                                ? result[3].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[1]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[2]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[2]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[3]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[3].questions[1].correctOption === result[3].questions[1].options[3]
                                                ? result[3].questions[1].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[3].questions[1].userAnswer === result[3].questions[1].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[3].questions[1].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[0].userAnswer ? result[3].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[0].correctOption}</td>
                                            <td class="td score">${result[3].questions[0].marksAwarded} / ${result[3].questions[0].marksTotal}</td>
                                        </tr>

                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[3].questions[1].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[3].questions[1].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[3].questions[1].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[3].questions[1].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[3].questions[1].userAnswer ? result[3].questions[1].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[3].questions[1].correctOption}</td>
                                            <td class="td score">${result[3].questions[1].marksAwarded} / ${result[3].questions[1].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[4].section} • ${result[4].obtainedMarks} / ${result[4].totalMarks}
                            </div>

                            <!-- Section 5 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s5q1}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[0]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[0]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[1]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[1]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[2]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[2]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[3]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[4].questions[0].correctOption === result[4].questions[0].options[3]
                                                ? result[4].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[4].questions[0].userAnswer === result[4].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[4].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[4].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[4].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[4].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[4].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[4].questions[0].userAnswer ? result[4].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[4].questions[0].correctOption}</td>
                                            <td class="td score">${result[4].questions[0].marksAwarded} / ${result[4].questions[0].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="resultContainer">
                            <div class="topicTitle">
                                ${result[5].section} • ${result[5].obtainedMarks} / ${result[5].totalMarks}
                            </div>

                            <!-- Section 6 -->
                            <div>
                                <!-- Question 1 -->
                                <div class="question-container">
                                    <div class="question markdown-body">
                                        ${s6q1}
                                    </div>


                                    <!-- option 1 -->
                                    <div class="options-container">
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[0]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[0]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[0]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[0]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[0]}
                                        </div>

                                        <!-- option 2 -->
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[1]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[1]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[1]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[1]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[1]}
                                        </div>

                                        <!-- option 3 -->
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[2]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[2]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[2]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[2]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[2]}
                                        </div>

                                        <!-- option 4 -->
                                        <div class="question-option ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[3]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? 'question-option-unattempted'
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[3]
                                                        ? 'question-option-correct'
                                                        : 'question-option-wrong'
                                                : ''
                                        }">
                                            ${
                                            result[5].questions[0].correctOption === result[5].questions[0].options[3]
                                                ? result[5].questions[0].userAnswer == null
                                                    ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                        </svg>`
                                                    : result[5].questions[0].userAnswer === result[5].questions[0].options[3]
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="9 12 11.5 14.5 15 10" />
                                                            </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>`
                                                : ''
                                            }
                                            ${result[5].questions[0].options[3]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tableWrapper">
                                <table class="table">
                                    <thead class="thead">
                                        <tr>
                                            <th class="th">Status</th>
                                            <th class="th">Question No.</th>
                                            <th class="th">Question</th>
                                            <th class="th">Chosen Answer</th>
                                            <th class="th">Correct Answer</th>
                                            <th class="th">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="tbodyRow">
                                            <td class="td">
                                                <div class="statusCell">
                                                ${
                                                    result[5].questions[0].isCorrect
                                                      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                                           <circle cx="12" cy="12" r="10" />
                                                           <polyline points="9 12 11.5 14.5 15 10" />
                                                         </svg>`
                                                      : result[5].questions[0].userAnswer === null
                                                        ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-unanswered" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <path d="M12 7a2 2 0 1 1 2 2c-.667.333-1.333.667-2 1v2" stroke-linecap="round" stroke-linejoin="round" />
                                                             <circle cx="12" cy="16.5" r="1" fill="gray" />
                                                           </svg>`
                                                        : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-cross" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                                             <circle cx="12" cy="12" r="10" />
                                                             <line x1="15" y1="9" x2="9" y2="15" />
                                                             <line x1="9" y1="9" x2="15" y2="15" />
                                                           </svg>`
                                                  }
                                                </div>
                                            </td>

                                            <td class="td">${result[5].questions[0].questionNumber}</td>
                                            <td class="td">
                                                <div class="questionId">${result[5].questions[0].questionTitle}</div>
                                                <div class="questionType">Multiple Choice</div>
                                            </td>
                                            <td class="td">${result[5].questions[0].userAnswer ? result[5].questions[0].userAnswer : 'NA'}</td>
                                            <td class="td correctAnswer">${result[5].questions[0].correctOption}</td>
                                            <td class="td score">${result[5].questions[0].marksAwarded} / ${result[5].questions[0].marksTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}