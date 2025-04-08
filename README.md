# Members Only

This application allows users to register or login to the club where they can:

- Create messages.
- View other members messages.

## How this project works?

- A member will see the login page where member has to give username and password
- If member is not a part of club, they can register to sign up
- For sign up, they need to provide first name, last name, email(username), password.
- After signing up, they can login by providing correct username and password.
- Forgot password functionality is implemented in case member forgets their password.
- After successfully login, A message form is visible where user can put title and message.
- Logged in member can see the messages of the other members.
- Only Admin has the right to delete the messages.

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Node.js** (v14 or higher)
2. **npm** or **yarn**
3. **PostgreSQL** (running locally or a connection string for a remote database)

## Setup and Run Locally

Follow these steps to set up and run the application on your localhost:

### 1. Clone the Repository

```bash
git clone <repository_url>
cd members-only
```

### 2. Install Dependencies

Install all required dependencies by running:

```bash
npm install
```

### 3. Start the Server

Run the server locally using:

```bash
node app.js
```

The application will be available at `http://localhost:3000`.
