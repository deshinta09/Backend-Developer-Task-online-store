# Backend-Developer-Task-online-store

Online Store API Dokumentation

## Endpoint :
List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /phones`
- `POST /phones`
- `PUT /phones`
- `DELETE /phone`


## POST /login
Description:
- Post login from database

Request:
- body: 

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200-OK)_
```json
{
    "access_token": "string"
}
```
_Response (400-Bad Request)_
```json
{
    "message": "Email is require"
}
```
OR
```json
{
    "message": "password is require"
}
```
OR 
```json
{
    "message": "Email must be type email"
}
```
&nbsp;

## POST /register
Description:
- Post user to database

Request:
- body: 
```json
{
    "email": "string",
    "username": "string",
    "password": "string",
    "role": "string"
}
```
_Respnse (201-OK)_
```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string"
}
```
_Response (400-Bad Request)_
```json
{
    "message": "Email is require"
}
```
OR 
```json
{
    "message": "Email must be type email"
}
```
OR
```json
{
    "message": "Password is require"
}
```
OR
```json
{
    "message": "Role is require"
}
```
&nbsp;

## GET /phones
Description :
- Get phone from database

Request:
- headers: 
```json
{
  "access_token": "string"
}
```

_Response (200-OK)_
```json
[
    {
        "id": 1,
        "name": "iPhone 13",
        "stock": 50,
        "type": "Smartphone",
        "description": "The latest iPhone model with advanced features.",
        "AuthorId": 1,
        "createdAt": "2024-04-29T12:14:15.457Z",
        "updatedAt": "2024-04-29T12:14:15.457Z"
    }
    ,...
]
```
&nbsp;

## POST /phones
Description :
- Post phone from database

Request:
- headers: 
```json
{
  "access_token": "string"
}
```
- body: 
```json
{
    "name": "string",
    "type": "string",
    "stock": "string",
    "description": "string"
}
```

_Resphonse (201-OK)_
```json
{
    "id": 4,
    "name": "Vivo Y53",
    "type": "Smartphone",
    "stock": 20,
    "description": "Smartphone Vivo with advance feature",
    "AuthorId": 1,
    "updatedAt": "2024-04-30T01:37:02.483Z",
    "createdAt": "2024-04-30T01:37:02.483Z"
}
```

_Response (400-Bad Request)_
```json
{
    "message": "Name is require"
}
```
OR
```json
{
    "message": "Stock is require"
}
```
OR
```json
{
    "message": "Type is require"
}
```
OR
```json
{
    "message": "Description is require"
}
```
&nbsp;

## PUT /phones/:id
Description :
- Put phone from database by id

Request:
- params:
```json
{
    "id": "integer"
}
```
- body: 
```json
{
    "name": "string",
    "type": "string",
    "stock": "string",
    "description": "string"
}
```
- headers: 
```json
{
  "access_token": "string"
}
```

_Response (200-OK)_
```json
{
    "message": "Phone {name phone} success to update"
}
```
_Response (404-Not Found)_
```json
{
    "message": "Phone not found"
}
```
&nbsp;

## DELETE /phone/:id
Description :
- Delete phone from database by id

Request:
- params:
```json
{
    "id": "integer"
}
```
- headers: 
```json
{
  "access_token": "string"
}
```

_Response (200-OK)_
```json
{
    "message": "Phone Vivo Y51 success to delete"
}
```
_Response (404-Not Found)_
```json
{
    "message": "Phone not found"
}
```
&nbsp;


## Global Error
_Response (401-Unauthorized)_
```json
{
    "message": "Invalid Token"
}
```
_Response (403-Forbidden)_
```json
{
    "message": "You are not authorize"
}
```
_Response (500-Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

