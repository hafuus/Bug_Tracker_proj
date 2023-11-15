Before you start, ensure you have Node.js and MongoDB installed on your system.
Installation

    Clone the repository:

git clone https://github.com/hafuus/Bug-Tracker.git

Navigate to the project directory:

cd bug-tracker

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory and add the following:

env

DB_CONNECTION=your-mongodb-connection-string
SECRET_KEY=your-secret-key

Start the application:
npm start

    The app will be accessible at http://localhost:3300.

Main Functions

1. User Authentication

   Sign Up: Create an account to access the bug tracking features.
   Login: Log in with your credentials.

2. Project Management

   Create Project: Easily set up projects to organize and categorize issues.
   Project Dashboard: View a dashboard displaying essential project information.

3. Issue Tracking

   Add Issue: Create new issues with details such as title, description, priority, and status.
   Update Issue: Modify issue details, change status, or update priority.
   Commenting: Collaborate by adding comments to provide additional information or updates.

4. User Dashboard

   Personalized Dashboard: Each user has a personalized dashboard displaying assigned issues and project information.
   Notification: Receive updates on issue changes and comments.
