## Installation

Make sure you have npm installed and use the following command to install node modules 
```bash
npm i
```

## Usage
The following command starts the server
```bash
npm run dev
```
in .env file
```bash
MONGO_URI=###enter mongfb uri
PORT=##Enter port
```

## Decription
An expressJs application which performs CRUD operations on Author and Books collection in a MongoDB Database.  
When the server starts, it deletes the previous Authors and Books collection and recreates them, and fills them with dummy data (faker.js)  
Sessions are used for user authentication and additional sessions collection is created in database to store the sessions.  
The following API can be used
```bash
POST:http://localhost:3000/auth/login
POST:http://localhost:3000/auth/registor
GET:http://localhost:3000/auth/logout
GET:http://localhost:3000/authors
GET:http://localhost:3000/authors/:id
GET(Auth):http://localhost:3000/authors/me
GET(Auth):http://localhost:3000/books/?page=page&limit=limit&order=1
### gives paginated data, with page=no page, limit:no of books in each page,
### order: 1 for increasing order of likes, -1 for decreasing order
PUT(Auth):http://localhost:3000/books/like/:id
PUT(Auth):http://localhost:3000/books/unlike/:id

### for (Auth) endpoints, user has to be logged in
```
On starting the server, a table will be shown in the console consisting of id,email and password of all authors and id and title of all books.   
This is because the password is stored in the database in an encrypted format, thus password cannot be fetched from database for account login.
In order to login, user must copy the author email and password from console table and send {"email"=table_email,"password"=table_pass} as request json body to login endpoint


![alt text](https://github.com/renovX/PetPerfect/blob/main/tableformat.png?raw=true)
   
Backend Architecture Diagram:
![alt text](https://github.com/renovX/PetPerfect/blob/main/BackendArchitecture.png?raw=true)
