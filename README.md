# [Fruit Hub 🍉](https://freshfruithub.vercel.app/)

## **Explanation Video : Coming Soon...**

<p align="center">
  <img src="https://github.com/user-attachments/assets/07654c36-be7d-4e39-a431-0b9836dc8941" width="45%"/>
  <img src="https://github.com/user-attachments/assets/37c70a10-e8d6-45d9-9ddc-c467883026d9" width="45%"/>
</p>

## INSPIRATION 🌟

**Delivering Freshness: Empowering Healthy Choices**

"Imagine a platform where fresh, high-quality fruits are just a click away, delivered directly to your doorstep. In a world where convenience often compromises quality, we envisioned a solution that ensures the freshest produce reaches consumers without any hassle. This project is driven by the desire to promote healthy living by making it easier for people to access and enjoy nutritious fruits. Join us as we revolutionize the way you buy fruits, combining technology with a commitment to health and well-being."

## What it Does !! 👷

Fruit-Hub is a web application designed to provide users with an effortless way to purchase fresh fruits online. Users can browse through a wide variety of fruits, selecting their preferred items based on their needs and preferences. The platform integrates multiple payment options, allowing users to choose the method that best suits them. Additionally, we have implemented secure payment gateways to ensure a seamless and safe transaction process.

## How I Build 🔧

- **Frontend Development:** Developed the frontend using React, ensuring a responsive and user-friendly interface.
- **Authentication:** For user authentication, we integrated Clerk, providing a secure and streamlined login and registration process.
- **Backend Development:** The backend was built using Node.js, with MongoDB as the database to store and manage user data, orders, and inventory.
- **CI/CD Pipeline:** Implemented GitHub Actions for continuous integration and continuous deployment (CI/CD), automating the testing and deployment process.
- **Dynamic Data Handling:** Data is dynamically fetched from the backend and displayed on the frontend, providing users with up-to-date information on available fruits.

## Challenges Encountered 💀

- **Order Tracking:** Developing an optimal scheme to keep track of the orders purchased by users was challenging. We had to ensure that the system accurately recorded each transaction while managing inventory levels in real-time.
- **Payment Integration:** Integrating multiple payment gateways and ensuring they worked seamlessly across different devices required thorough testing and debugging.
- **User Authentication:** Implementing a secure yet user-friendly authentication system with Clerk, while ensuring compatibility with other components, presented some initial difficulties.

## CI/CD Pipeline Architecture Explanation 🔗 : 

- **Code Repository and Trigger:**
  - The process begins with the code hosted on GitHub. Any changes or new commits trigger GitHub Actions.
- **Building Docker Image:**
  - GitHub Actions are configured to build a Docker image from the codebase. This ensures a consistent and isolated environment for the application.
  - Once the Docker image is built, it is pushed to Docker Hub for centralized storage and easy access.
- **Self-Hosted Runner on AWS EC2:**
  - A self-hosted runner is configured on an AWS EC2 instance. This runner pulls the Docker image from Docker Hub.
  - The EC2 instance provides the necessary computational resources to run the Docker container.
- **Running Docker Image:**
  - The pulled Docker image is executed on the AWS EC2 instance as a container.
  - This setup allows for scalable and efficient deployment, as multiple containers can be run in parallel, each isolated from the others.
