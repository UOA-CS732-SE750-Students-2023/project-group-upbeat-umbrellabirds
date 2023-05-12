# Promptaloo

Promptaloo is a multiplayer image-guessing web game where players are presented with AI-generated images and their goal is to guess the prompt used to generate that image. The game aims to be entertaining, engaging, and challenging, while also showcasing the capabilities of AI-generated art.

## Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Ant Design: A UI framework for React that provides a set of high-quality components and themes.

## Features

- **Login Page**: Users can log into the game by entering their registered username and password. The login fields are mandatory and cannot be left empty. The option to remember the username and password is provided for convenience.

- **Home Page**: After successful login, users are directed to the home page where they can join an existing room or create a new room to start the game. Each logged-in user is assigned a specific profile picture.

- **Prompt Window**: Users can create a new room by entering a room name, and a unique room number is generated automatically. This room number can be shared with friends who can then join the game by searching for the room number in the room list.

- **RoomList Page**: The RoomList page displays all available rooms that users can browse and select to join the game. Users can join a room with their friends and start playing together.

- **Game Page**: Once inside the game, players can enter their guesses in the designated area and interact with other players. The game starts with background music, and after players enter their guesses, a countdown phase begins for 5 seconds. At the end of the countdown, the results of all players are displayed, and medals are awarded to the top three players. Players can choose to continue playing or exit the game.

## Installation

### Frontend

To run the frontend of Promptaloo locally, follow these steps:

1. Clone the repository:
    >git clone https://github.com/your-username/promptaloo.git

2. Navigate to the frontend directory:

    >cd promptaloo/frontend

3. Install dependencies:

    >npm install

4. Start the development server:

    >npm run dev

5. Open your browser and visit http://localhost:5173 to access the frontend of the application.
Make sure you have Node.js and npm (Node Package Manager) installed on your system before proceeding with the installation.

Backend
To run the backend of Promptaloo locally, follow these steps:

1. Navigate to the backend directory:

    >cd promptaloo/backend

2. Install dependencies:

    >npm install

3. Start the server:

    >npm run start

4. The backend server will start running on http://localhost:5174.

Make sure you have Node.js and npm (Node Package Manager) installed on your system before proceeding with the installation.
