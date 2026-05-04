# ATS Checker API Testing Instructions

This guide provides examples for testing the core API endpoints of the ATS Checker application using tools like Postman, Insomnia, or `curl`.

## 1. Authentication

### Register a User
- **URL**: `POST /api/auth/register`
- **Body (JSON)**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
- **URL**: `POST /api/auth/login`
- **Body (JSON)**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- **Action**: Copy the `token` from the response for subsequent requests.

## 2. Resume Analysis

### Analyze Resume (Full Flow)
- **URL**: `POST /api/checks/analyze`
- **Headers**: 
  - `Authorization: Bearer <YOUR_TOKEN>`
  - `Content-Type: multipart/form-data`
- **Body (Form Data)**:
  - `resume`: [File upload]
  - `jobTitle`: "Frontend Developer"
  - `companyName`: "Google"
  - `jobDescription`: "We are looking for a React developer with CSS experience..."

## 3. History & Reports

### Get All Reports
- **URL**: `GET /api/checks`
- **Headers**: `Authorization: Bearer <YOUR_TOKEN>`

### Get Specific Report
- **URL**: `GET /api/checks/:id`
- **Headers**: `Authorization: Bearer <YOUR_TOKEN>`

### Delete Report
- **URL**: `DELETE /api/checks/:id`
- **Headers**: `Authorization: Bearer <YOUR_TOKEN>`

## 4. Error Case Testing (Stability & Validation)

Testing these scenarios ensures the application handles bad input gracefully and returns consistent error formats.

| Scenario | URL | Payload / Action | Expected Result |
|----------|-----|------------------|-----------------|
| **Invalid Login** | `/api/auth/login` | Wrong email or password | `401 Unauthorized` - "Invalid credentials" |
| **Duplicate Register** | `/api/auth/register` | Existing email | `400 Bad Request` - "User already exists" |
| **Invalid Email** | `/api/auth/register` | `"email": "invalid"` | `400 Bad Request` - "Please include a valid email" |
| **Short Password** | `/api/auth/register` | `"password": "123"` | `400 Bad Request` - "Please enter a password with 6 or more characters" |
| **Empty JD** | `/api/checks/analyze` | Empty `jobDescription` | `400 Bad Request` - "Job description is required" |
| **No File** | `/api/checks/analyze` | Missing `resume` field | `400 Bad Request` - "Please upload a file" |
| **Invalid File Type**| `/api/checks/analyze` | Upload `.txt` or `.png` | `400 Bad Request` - "Only PDF and DOCX files are allowed!" |
| **File Too Large** | `/api/checks/analyze` | Upload file > 5MB | `400 Bad Request` - "File too large. Maximum size allowed is 5MB." |
| **Unauthorized** | Any private route | No token or invalid token | `401 Unauthorized` - "Not authorized" or "Invalid token" |
| **Resource Not Found**| `/api/checks/123` | Invalid Mongo ID | `404 Not Found` - "Resource not found" |
| **Route Not Found** | `/api/invalid-route`| Any request | `404 Not Found` - "Route Not Found - /api/invalid-route" |

## 5. Consistent Error Format

All error responses follow this JSON structure:
```json
{
  "success": false,
  "message": "Clear error message describing what went wrong"
}
```
