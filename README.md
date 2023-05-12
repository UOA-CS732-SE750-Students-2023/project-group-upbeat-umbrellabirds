# Promptaloo

Promptaloo is a multiplayer image-guessing web game where players are presented with AI-generated images and their goal is to guess the prompt used to generate that image. The game aims to be entertaining, engaging, and challenging, while also showcasing the capabilities of AI-generated art.

## Technologies Used

## Frontend:

React - As a part of the MERN stack, react allows us to create components that are reusable. This will allow us to create a more modular and consistent UI.

Axios - Axios is used to call our API endpoints.

## Backend:

Express/Node - As a part of the MERN stack, we will use express and node to build our rest API.

MongoDB - As a part of the MERN stack, we will use MongoDB to store our metadata such as user’s information and game information.

## Additional Libraries/Frameworks/Technologies:

DALL-E - One of the best AI image generator available, we will use it to generate images for our game.

GPT-3 - we will use GPT-3 to generate our prompts to generate images, it has multiple models we could use, we may opt to use the Davinci model since it is smarter and has more capabilities but use the fast-text model if we prefer speed. 

Sentence Similarity Checker - A model can be used from a website such as Hugging Face, this will allow us to compare user inputs with the answer accurately. 

Socket.IO -  This will enable us to have a multiplayer feature where we can create rooms and invite friends to play with.

ESLint - There are multiple developers working on one code base, so we need a way to ensure our coding standard is consistent, ESLint will allow us to do so.

Prettier - This will allow us to have consistent coding styles such as indentation.


## Features

 - **Home Page**:

Upon successful login, users are directed to the home page. Each logged-in user is assigned a specific profile picture. On this page, users can choose to either join an existing room or create a new room to start the game.


- **Prompt Window**:

When creating a room, users simply need to enter a room name to generate a new room. The room number can be copied and shared with friends who can then join the game by searching for the room number in the room list.


- **Lobby Page**:

The RoomList page allows users to browse and select any available room to join the game. Users can join a room with their friends and start playing together.


- **Game Page**:

Once inside the game, players can enter their guesses in the designated area and interact with other players. Background music indicates the start of the game. After players enter their guesses, a countdown phase begins (5 seconds). At the end of the countdown, the results of all players are displayed, and medals are awarded to the top three players. Players can choose to continue playing or exit the game.

These are the main features and functionalities of Promptaloo. Have fun playing the game and enjoy the gaming experience!

## Installation

### Deployed Version
The game is  deployed in two seperate cloud services, Alicloud and AWS. We initially deployed the game on Alicloud's free server, but we realised that due to the speed limit of the free server. There was no way for the game's auto-inherit AI image feature to work on the cloud-based servers. We then moved to AWS free servers. We present two versions online here to prevent free server instability from causing problems.

Alicloud's Deployed Version: http://123.56.143.225:5173/
AWS Deployed Version: 

### Frontend

To run the frontend of Promptaloo locally, follow these steps:

1. Clone the repository:
    >git clone https://github.com/UOA-CS732-SE750-Students-2023/project-group-upbeat-umbrellabirds

2. Navigate to the frontend directory:

    >cd promptaloo/frontend

3. Install dependencies:

    >npm install

4. Start the development server:

    >npm run dev

5. Open your browser and visit http://localhost:5173 to access the frontend of the application.
Make sure you have Node.js and npm (Node Package Manager) installed on your system before proceeding with the installation.

### Backend
To run the backend of Promptaloo locally, follow these steps:

1. Navigate to the backend directory:

    >cd promptaloo/backend

2. Install dependencies:

    >npm install

3. Start the server:

    >npm run start

4. The backend server will start running on http://localhost:5174.

Make sure you have Node.js and npm (Node Package Manager) installed on your system before proceeding with the installation.
