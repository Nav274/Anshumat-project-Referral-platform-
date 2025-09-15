Anshumat-project-Referral-platform-
RefConnect - Job Referral Platform A web-based platform that bridges job seekers with professionals willing to provide referrals.

Tech Stack Frontend: TypeScriptXML + Tailwindcss Backend: Spring Boot + Spring Data JPA Database: MySQL

Setup Instructions Prerequisites Node.js & npm (for frontend) Java 17+ (for Spring Boot backend) MySQL server running locally or remotely

Clone the repository git clone https://github.com/your-username/refconnect.git cd refconnect

Database Setup CREATE DATABASE refconnect;

Update database credentials in application.properties: spring.datasource.url=jdbc:mysql://localhost:3306/refconnect spring.datasource.username=your-username spring.datasource.password=your-password

Backend Setup Navigate to backend folder: cd backend

Build & run: ./mvnw spring-boot:run

Frontend Setup Navigate to frontend folder: cd frontend

Install dependencies: npm install

Start development server: npm run dev

Approach Modular Architecture

Frontend (TypeScriptXML + tailwindcss) handles UI and communicates with backend through REST APIs. Backend (Spring Boot) manages business logic and data flow. Database (MySQL) stores user data, job postings, and referral history.

Data Access Layer Spring Data JPA is used for cleaner, boilerplate-free database operations. Scalability

The platform is built with a layered architecture (Controller → Service → Repository) to keep code maintainable and extensible.

Why This Tech Stack?

TypeScript + XML: TypeScript adds type safety and better developer experience for frontend logic. XML helps in UI structure and component rendering. Spring Boot: Provides rapid development, built-in dependency injection, and production-ready features. Spring Data JPA: Simplifies database access with minimal boilerplate code. MySQL: Reliable relational database with wide community support and easy integration with Spring Boot.

Future Enhancements

Authentication & Role-based Access Control (User vs Professional) Profile recommendations using matching algorithms Email notifications for referral requests and updates Cloud deployment with CI/CD pipeline