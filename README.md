##Project Structure##

mern/: Contains the frontend React application.
backend/: Contains the backend Node.js application.

##Getting Started##
-------Prerequisites----------
Ensure you have the following installed:

Node.js and npm
MySQL database

##Setup##

1. Clone the Repository
First, clone the repository and navigate to the project directory

-git clone <your-repo-url>
-cd <your-repo-name>


2. Backend Setup
Navigate to the backend folder to set up the server:

-cd backend

-----Install the necessary dependencies------

npm install
Create a .env file in the backend folder and add your database credentials and JWT secret

--------------
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
JWT_SECRET=your_jwt_secret
------------
----Start the backend server------

-node server.js


4. Frontend Setup
Navigate to the mern folder to set up the frontend:

-cd ../frontend

----Install the frontend dependencies-----

-npm install

------Start the frontend application-------

-npm start
