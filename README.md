# Smart Tax System - Automating Property, Gift, and Inheritance Taxes Calculations and Management

The aim of the project, Smart Tax System, is to modernise and simplify Sri Lanka's tax administration by automating computations for estate duty, gift, and inheritance taxes, increasing transparency, and raising overall tax compliance. 

## Features

- **User Management**: Admin, Business Customers, Taxpayers with different privileges.
- **Authentication & Authorization**: Secure user authentication and role-based access control.
- **Property Transfer Tax a.k.a. Estate Duty**: Handle property tax calculations.
- **Gift Tax**: Handle gift tax calculations.
- **Inheritance Tax**: Handle inheritance tax calculations.
- **Electronic Filing and Payment**: Manage electronic filing and payment facilities.

## Project Structure

The project follows a structured organization:
- **Backend (Node.js)**
  - `src/controllers`: handles HTTP requests, interacts with services, and returns responses.
  - `src/models`: represents database models using Mongoose or any ORM.
  - `src/routes`: defines API routes using Express.js.
  - `src/middleware`: custom middleware functions like authentication and authorization.
  - `src/utils`: utility functions like validation, formatting, etc.
  - `src/app.js`: this is where the application starts and sets up the Express server and middleware.
  - `src/config.js`: all the configuration variables like environment variables, database connections, etc.

- **Frontend (React.js)**
  - Frontend Implementation.

- **Database (PostgreSQL)**
  - Database schema and scripts.

- **Tests**
  - Unit and integration tests.

## How to Setup the Project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ammaar-nizam/smart-tax-system.git
   cd smart-tax-system

2. **Install Dependencies**
   ```bash
   cd node-backend
   npm install
   cd ../react-frontend
   npm install

3. **Database Setup**
- Set up PostgreSQL and create the necessary database and tables based on the provided schema.

4. **Environment Configuration**
- Configure environment variables for the backend like database connection.

5. **Start Backend Server**
   ```bash
   cd node-backend
   npm start

6. **Start Frontend Development Server**
   ```bash
   cd react-frontend
   npm run dev

## Contributors

1. Ammaar Nizam

## How to Contribute to the Project

- Fork the repository.
- Create a new branch (`git checkout -b feature/yourFeatureName`).
- Commit your changes (`git commit -am 'Add some yourFeatureName'`).
- Push to the branch (`git push origin feature/yourFeatureName`).
- Create a new Pull Request.

## License

This project is for educational purposes only. 

## Acknowledgements

- Mention any libraries, tutorials, or resources used here.
- Acknowledge contributors or inspiration sources if any.
