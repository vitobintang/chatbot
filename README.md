# MEME AI

Our AI chat companion boosts your productivity by understanding images and engaging in voice conversations, providing a seamless and interactive experience to help you achieve your goals. The application is built using Node.js and Express on the backend, and React and Vite on the client side.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)

## Getting Started

### Setup

1. Clone the repository: `git clone `
2. Navigate to the project directory: `` or 
3. Install dependencies: `npm install`

To set up this workspace, you will need to install Node.js and npm. You can then clone this repository and install the dependencies using the following commands:
`git clone https://github.com/vitobintang/chatbot.git`
`cd backend` and `cd client`
`npm install`

### Usage
To use this workspace, you will need to create a Clerk account and obtain your API key. You will also need to set up your MongoDB database and obtain your connection string. Once you have completed these steps, you can start the server using the following command:
`npm start` and `npm run dev`

## Features

- User authentication using Clerk
- Chatbot interaction using Gemini-1.5-flash model
- File uploads using ImageKit
- Voice chat using Google Generative AI
- Data storage and retrieval using MongoDB

## Technology Stack
- Node.js
- Express
- React
- Vite
- Clerk
- Gemini-1.5-flash
- ImageKit
- Google Generative AI
- MongoDB

## Project Structure

The project is organized into two main directories: `backend` and `client`.

### Backend

The `backend` directory contains the server-side logic and configuration files for the project. It includes the following files:

- `index.js`: The main entry point for the backend server.
- `models`: A directory containing Mongoose models for the project.
  - `chat.js`: A model for chat history.
  - `userChats.js`: A model for user-specific chat history.
- `package.json`: A file containing the project's dependencies and scripts.
- `vercel.json`: A configuration file for Vercel deployment.

### Client

The `client` directory contains the frontend code and configuration files for the project. It includes the following files:

- `.eslintrc.cjs`: A configuration file for ESLint.
- `package.json`: A file containing the project's dependencies and scripts.
- `public`: A directory containing static files for the project.
- `README.md`: The project's README file.
- `src`: A directory containing the source code for the project.
  - `components`: A directory containing React components.
    - `chatList`: A component for displaying a list of chats.
    - `newPrompt`: A component for creating a new chat prompt.
    - `upload`: A component for uploading files.
    - `voiceChat`: A component for voice chat functionality.
  - `layouts`: A directory containing React layouts.
    - `dashboardLayout`: A layout component for the dashboard page.
    - `rootLayout`: A layout component for the root page.
  - `lib`: A directory containing JavaScript libraries.
    - `gemini.js`: A library for Gemini API integration.
  - `routes`: A directory containing React routes.
    - `chatPage`: A route for the chat page.
    - `dashboardPage`: A route for the dashboard page.
    - `homepage`: A route for the home page.
    - `signInPage`: A route for the sign-in page.
    - `signUpPage`: A route for the sign-up page.
- `vercel.json`: A configuration file for Vercel deployment.
- `vite.config.js`: A configuration file for Vite, the build tool used for the frontend.

This structure allows for a clear separation of concerns between the frontend and backend, making it easier to manage and maintain the project.
