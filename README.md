# Backend-Developer-Task-online-store

## POST /login
Response (200-OK)
```json
{
    "access_token": "string"
}
```

## GET /phones
Response (200-OK)
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

## POST /phones
Resphonse (201-OK)
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

Response (400-Bad Request)
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

## PUT /phones
Response (200-OK)
```json
{
    "message": "Phone {name phone} success to update"
}
```
Response (404-Not Found)
```json
{
    "message": "Phone not found"
}
```

## DELETE /phone 
Response (200-OK)
```json
{
    "message": "Phone Vivo Y51 success to delete"
}
```
Response (404-Not Found)
```json
{
    "message": "Phone not found"
}
```

## Global Error
Response (401-Unauthorized)
```json
{
    "message": "Invalid Token"
}
```
Response (403-Forbidden)
```json
{
    "message": "You are not authorize"
}
```
Response (500-Internal Server Error)
```json
{
    "message": "Internal Server Error"
}
```

