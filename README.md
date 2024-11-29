RBAC  - Node.js and MongoDB
This is an example project demonstrating how to implement a Role-Based Access Control (RBAC) system using Node.js, Express, and MongoDB. This project uses Mongoose for MongoDB integration, and JWT for token-based authentication.

Features:

Node.js and Express for server-side logic.
Mongoose for MongoDB ORM.
JWT for secure token-based authentication.
Environment variables for storing sensitive information such as MongoDB connection strings.
RBAC system for managing roles and permissions.

Clone the repository:

git clone https://github.com/your-username/rbac-example.git
cd rbac-example
Install the required dependencies:


npm install
Install MongoDB locally or use MongoDB Atlas 

Create a .env file in the root of your project and add the following:


MONGODB_URI=mongodb://localhost:27017/rbacdb  
JWT_SECRET=your_jwt_secret_key
PORT=3000
Replace your_jwt_secret_key with a secret key of your choice.

Setting Up MongoDB
To run MongoDB locally, follow these steps:

Install MongoDB Locally
Download and install MongoDB from the official MongoDB website.

After installation, you can start MongoDB using the following command:


mongod --auth --port 27017 --dbpath /path/to/your/db
Make sure to replace /path/to/your/db with the actual path to your MongoDB data directory.

Create an Admin User for Authentication
To create an admin user in MongoDB, follow these steps:

Open the MongoDB shell by running mongosh in the terminal.

Switch to the admin database:


use admin
Create the admin user:


db.createUser({
  user: "admin",
  pwd: "your_password",   // Replace with a strong password
  roles: [ "userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase" ]
})
Exit the MongoDB shell:


exit
Enable Authentication
Once you've created the admin user, restart MongoDB with authentication enabled:


mongod --auth --port 27017 --dbpath /path/to/your/db
