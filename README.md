# Critter Watch

## Overview
Critter Watch is a project with a responsive front-end integrated to a secure backend. It's purpose is for users to create an account, with
an email and password, which then after they would have access to other Critter Watch features such as posts, friends, chat, etc.

## Implementation
### Frontend:
- **Bootstrap**
    Used for its library of built-in styles and tools for creating custom styles. It streamlined the process of building the website's frontend, ensuring a unified and responsive design.
- **Vite**
    A modern build tool using Node.js, utilized to accelerate the development process by skipping the early skeleton-building stage of the website. Vite also provides useful tools like a development server for live hosting.
- **Languages:**
    - **TypeScript**
        Used for implementing the majority of the application’s functionality, ensuring type safety and a structured codebase.
    - **CSS**
         Applied for occasional custom styling of TypeScript components.
    - **HTML**
        Used for structuring the website’s content.

### Backend:  
- **Firebase**
    Utilized for backend implementation, handling data storage and retrieval. Firebase stored all user-related information, such as message IDs and user IDs, which could be accessed by the frontend.

## Core Features
1. **Posts, Likes, and Comments**
    - Users can create posts with images and descriptions.
    - Users can like posts that they can access later.
    - Users can comments on posts they enjoy or would like to question.

2. **Profile Customization**
    - Profiles can be customized with a profile picture, description, and username.
    - Users can see their history of liked posts

3. **Friends and Chat**
    - Users can send and recieve friend requests that can be accepted or denied.
    - Two Users who have friended each other are able to chat between each other.

4. **Post Geolocation**
    - Users can select the location of the post where the animal was found, down to the city/town
    - Users on their post page will be able to sort posts by distance

## How to access Critter Watch
### Running on Firebase
- Website is hosted on firebase and can be accessed by this link

### Running Locally on your machine
1. Install node.js if haven't already
3. Install VScode on your computer
4. Type "npm install" on the command line
5. Type "npm install vite" on the command line
6. Type "npm run dev" on the command line

## Video Demonstration
link to video demonstation