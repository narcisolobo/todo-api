# Todo API
This is a simple Todo application built with Node.js and Express.js. It provides an API for managing todo items, including creating, retrieving, updating, and deleting todos. Additionally, it offers endpoints for marking todos as complete, filtering todos by completion status, and searching todos by a query parameter. The application uses MongoDB as the database for storing todos.

## Features
- Create a new todo item
- Retrieve all todo items
- Retrieve a single todo item by ID
- Update a todo item
- Delete a todo item
- Mark a todo as complete
- Filter todos by completion status
- Search todos based on keywords

## Installation
1. Clone the repository:
   
    ```shell
    git clone https://github.com/narcisolobo/todo-api.git
    ```
2. Install the dependencies:
   
    ```shell
    cd todo-api
    npm install
    ```
3. Set up the environment variables:
   
   1. Rename the `.env.example` file to `.env`.
   2. Update the `.env` file with your MongoDB connection string.
   <br />
   <br />
   
4. Start the application::
   
    ```shell
    npm start
    ```

    The server will start running on http://localhost:8000.

## API Endpoints
### Create a new todo item
- URL: /api/todos
- Method: POST
- Request Body:
  - title (string): The title of the todo item.
  - description (string): The description of the todo item.
  
### Retrieve all todo items
- URL: /api/todos
- Method: GET
  
### Retrieve a single todo item
- URL: /api/todos/:id
- Method: GET
- URL Parameters:
  - id (string): The ID of the todo item.

### Update a todo item
- URL: /api/todos/:id
- Method: PUT or PATCH
- URL Parameters:
  - id (string): The ID of the todo item.
  - Request Body:
    - title (string): The updated title of the todo item.
    - description (string): The updated description of the todo item.

### Delete a todo item
- URL: /api/todos/:id
- Method: DELETE
- URL Parameters:
  - id (string): The ID of the todo item.

### Mark a todo as complete
- URL: /api/todos/:id/complete
- Method: PUT or PATCH
- URL Parameters:
  - id (string): The ID of the todo item.

### Filter todos by completion status
- URL: /api/todos/completed/:status
- Method: GET
- URL Parameters:
  - status (string): The completion status (complete or incomplete).

### Search todos
- URL: /api/todos/search
- Method: GET
- Query Parameters:
  - query (string): The keyword or search query.
