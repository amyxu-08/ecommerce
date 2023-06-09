# Eco-commerce

Welcome to the central repository for Eco-commerce, the Week 3 Project created for Forge's Launch Program in the Software Engineering Track in 2023. 

## About

This project is a web application that allows users to view, list and buy items online. It is also integrated with Stripe API to allow intuitive payment and checkout and EmailJS to send confirmation emails upon purchase. We were specifically tasked with using an [ExpressJS](https://expressjs.com/) backend, a [ReactJS](https://reactjs.org/) frontend, and a [Firebase](https://firebase.google.com/) database.

## Table of Contents

- [About](#about)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Major Components and Features](#major-components-and-features)
- [Feature Statuses](#feature-statuses)
- [Credits](#credits)

### Installation

To use our project, begin by cloning our repository. Then, navigate to the `frontend` directory and run `npm install` to install all of the necessary dependencies. Open a new terminal, navigate to the `backend` folder and run `npm install` again to install the backend dependencies.

### How to Use

To run this application, first `cd` into the `frontend` folder and run `npm start`. Then, in a new terminal session, `cd` into the `backend` folder and run `npm start`. This will start the backend on Port 9000 and the frontend on Port 3000.

Since we are using both an express backend and a React frontend, ensure that you are running your backend on Port 9000, as all calls to the backend in the frontend are made to Port 9000. 

### Major Components and Features

* Buy From Us
    * This application uses RESTFul API along with Express to scrape information from a dummyJSON api to display clothing that is available for purchase. This is paired with matierial UI's grid system to ensure seamless transition between mobile and desktop view.
* Buy From You
    * Users can upload and sell their own items on this website as well as explore items being sold by others.
* Cart
    * This application uses FireBase as the DB to store prevelant cart information between sessions so users can efficiently and effectivley shop and proceed to checkout when ready.
* Payment & Checkout
    * This application uses Stripe API to integrate payment forms and allow for flexible modes of payment. 
* Email Service
    * The free EmailJS service is used to handle all automated outward communcation with users about their orders.

### Feature Statuses

All features are complete. However, if you would like to run this application yourself, you must create your own Firebase project and add your own Firebase configuration to the `firebase.js` file in the `app` folder. You must also create your own Stripe and EmailJS accounts and save its corresponding information.

With this configuration, all of the features will work as intended.

### Credits

* [Amy Xu](https://www.linkedin.com/in/amyxu08/) - Backend, Payment
* [Zaid Fada](https://www.linkedin.com/in/zaid-fada/) - Backend, BuyFromYou, Cart
* [William Kieffer](https://www.linkedin.com/in/williamkieffer24/) - Email Service
