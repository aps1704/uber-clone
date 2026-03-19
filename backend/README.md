# Uber Clone Backend

## User Registration API

This backend exposes a user registration endpoint using Express and MongoDB/Mongoose.

### Endpoint

- `POST /users/register`

### Request JSON Body

Send a JSON object with the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "mypassword"
}
```

### Validation Rules

- `email` must be a valid email address.
- `password` must be at least 6 characters long.
- `fullname.firstname` must be at least 3 characters long.

### How User Creation Works

1. The route in `backend/routes/user.routes.js` validates the request using `express-validator`.
2. The controller in `backend/controllers/user.controllers.js` checks validation results.
3. Password is hashed by `userModel.hashPassword(...)` before saving.
4. The create logic uses `userService.createUser(...)` to insert into the database.
5. After creation the user token is created with `user.generateAuthToken()` and returned with status `201`.

### Success Response

- HTTP `201 Created`
- JSON body includes the created `user` and `token`.

### Error Responses

- HTTP `400 Bad Request` when validation fails (returns `errors` array).
- Other server errors are forwarded via `next(err)`.

### Notes

- Ensure your app is running with `node server.js` (or your start command).
- Ensure your MongoDB connection is configured in `backend/db/db.js`.

## Quick Start

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start server:
   ```bash
   npm run dev
   ```
3. Register user via HTTP client (Postman/cURL) to `http://localhost:3000/users/register`.
