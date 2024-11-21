# Project Overview

The project is using a simplified MVC pattern. I decided not to add a service layer to avoid adding unnecessary complexity, given the scope of the project.
To run the project:
`> npm i`
`> npm start`
The logic is handled inside the models and goes as follows:

## `Stack`

Simple last-in first-out stack with three methods:

- `push(element)`: adds an element to the top of the stack.
- `pop()`: removes the element on top of the stack.
- `isEmpty()`: checks if the stack if empty.

## `KeyValueTTL`

Key value storage with an optional TTL parameter in milliseconds that makes the value for a given key expire after the specified amount of time.
If TTL was provided, it is added alongside its key to an expiration queue. This queue is a tool for invalidating the values more seamlessly.
A lazy removal method was implemented and called before `set()`, `get()`, and `has()` in order to invalidate every value that has already expired from the expiration queue.

The class public methods goes as follows:

- `set(key, value, ttl?)`: sets the given key-value pair with the optional expiration time.
- `get(key)`: retrieves the value for the specified key. If expired or deleted, returns null.
- `delete(key)`: sets the value of the given key to null and removes it from the expiration queue.
- `has(key)`: checks if a given key exists.

# API Documentation

There is a Postman collection inside the project root for easier testing.

## KeyValue API

### `POST /keyvalue/add`

- **Description**: Adds a key-value pair to the store with an optional TTL.
- **Request Body**:
  ```json
  {
  	"key": "string", // The key for the value
  	"value": "string", // The value associated with the key
  	"ttl": "number" // Optional TTL in seconds for the key (if not provided, the key will not expire)
  }
  ```
- **Responses**:
  - **201 Created**: Key successfully added.
  - **400 Bad Request**: If `key` or `value` are missing.
  - **Example Response**:
  ```json
  {
  	"message": "Key \"name\" added successfully"
  }
  ```

### `GET /keyvalue/:key`

- **Description**: Retrieves the value for the specified key. Returns `null` if the key is expired or deleted.
- **Parameters**:
  - `key`: The key for which the value needs to be fetched.
- **Responses**:
  - **200 OK**: The key exists, and its value is returned.
  - **404 Not Found**: If the key does not exist.
  - **Example Response**:
  ```json
  {
  	"value": "John"
  }
  ```
  - **Example Response (Key not found)**:
  ```json
  {
  	"error": "Key \"name\" not found"
  }
  ```

### 3. `DELETE /keyvalue/:key`

- **Description**: Deletes the value for the specified key from the store.
- **Parameters**:
  - `key`: The key to be deleted.
- **Responses**:
  - **200 OK**: The key has been successfully deleted.
  - **Example Response**:
  ```json
  {
  	"message": "Value from \"name\" deleted successfully"
  }
  ```

---

## Stack API

### `POST /stack/add`

- **Description**: Adds an item to the stack.
- **Request Body**:
  ```json
  {
  	"item": "string" // The item to be pushed onto the stack
  }
  ```
- **Responses**:
  - **200 OK**: Item successfully added to the stack.
  - **Example Response**:
  ```json
  {
  	"message": "Item pushed to stack",
  	"item": "value"
  }
  ```

### `GET /stack/`

- **Description**: Retrieves the top item from the stack and removes it.
- **Responses**:
  - **200 OK**: Returns the top item of the stack.
  - **404 Not Found**: If the stack is empty.
  - **Example Response**:
  ```json
  {
  	"item": "value"
  }
  ```
  - **Example Response (Stack empty)**:
  ```json
  {
  	"message": "Stack is empty"
  }
  ```
