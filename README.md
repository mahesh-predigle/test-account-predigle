# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used for registering a new user into the system. It validates the incoming data, saves the user details into the database, and returns the created user or relevant error messages.

---

### HTTP Method
**GET**

---

### Request Body
The following data fields are required to register a new user:

| Field            | Type     | Required | Validation                                                                 |
|------------------|----------|----------|---------------------------------------------------------------------------|
| `email`          | String   | Yes      | Must be a valid email address.                                           |
| `fullname.firstname` | String   | Yes      | Must have at least 3 characters.                                         |
| `fullname.lastname`  | String   | No       | If provided, must have at least 3 characters.                            |
| `password`       | String   | Yes      | Must be at least 6 characters long.                                      |

---

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
