# Technologies Used

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-%23716932.svg?style=for-the-badge&logo=Mongoose&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-%233D3631.svg?style=for-the-badge&logo=Stripe&logoColor=white)

# Features

-   [x] **Mongoose Schema Validation**
        Mongoose schema validation has been implemented for all the models. So when a user signs up, the data is validated before being stored in the database. Similarly, when an operation is performed, the data is validated before being stored in the database.
-   [x] **JWT Token Verifation**
        JWT token verification has been implemented for all the routes that require authentication. So when a user logs in, a JWT token is generated and stored in the local storage of the client. When the user logs out, the token is removed. This token is used to authenticate users and protect routes where token is validated before returning data.
-   [x] **Admin Verification**
        Admin verification has been implemented for all the routes that require admin authentication. User roles are stored in the database and when a user logs in, the role is checked and if the user is an admin, they are allowed to access the admin routes.
-   [x] **Pagination**
        Pagination has been implemented for required routes that return multiple documents. So when a user requests for a list of documents, the documents are paginated and only a certain number of documents are returned at a time.
-   [x] **Stripe Payment Intent**
        Stripe payment intent has been implemented for the payment gateway. When a user pays for a test, a payment intent is created and the client secret is returned to the client. The client secret is then used to confirm the payment.
-   [x] **Project Structure**
        The project structure has been designed in a way that it is easy to understand and maintain. All the routes are stored in the routes folder and all the controllers are stored in the API folder. All the models are stored in the models folder and all the middlewares are stored in the middlewares folder.
