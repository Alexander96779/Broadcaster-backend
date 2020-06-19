# Broadcaster-backend

[![Build Status](https://travis-ci.org/Alexander96779/Broadcaster-backend.svg?branch=develop)](https://travis-ci.org/Alexander96779/Broadcaster-backend)
[![Coverage Status](https://coveralls.io/repos/github/Alexander96779/Broadcaster-backend/badge.svg?branch=develop)](https://coveralls.io/github/Alexander96779/Broadcaster-backend?branch=develop)
# General Overview
Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention.

#### Database migration

- To connect to database, modify config.js file in /src/config and include your DB parameters or add DATABASE_URL env.
- Run the command 'node_modules/.bin/sequelize db:migrate' to migrate the dummy user table.

# Github 

## Git Repository

https://github.com/Alexander96779/Broadcaster-backend

## Server side hosted on Heroku

- N/A

## Getting Started

### Prerequisites to use of API

1. Postman
2. Any web browser

### Prerequisites to get this API running on your local system

1. Node js/express/postgres DB
2. Any text editor(Preferrably VS Code)
3. Git

### Installation
1. Clone this repository into your local machine:

```
 git clone https://github.com/Alexander96779/Broadcaster-backend
```
2. Install dependencies 
```
- npm install.
```
3. Start the application by running the start script

```
- npm start.
``` 

4. Install postman to test all endpoints on port 5000.

### Test

run test using 'npm test'.

## Features

### Auth
- Signup
- Signin
- Logout
- Forgot Password
- Reset Password
- Profile update
- User role settings

### Others
- Create incident
- Update incident
- Delete incident
- View all incidents
- View specific incident
- Reject incident
- Approve incident
- View incident by status

### Coding Style

- Airbnb style guide.

### Linting Library
- Eslint 

### Testing Framework
- Mocha     - JavaScript Test Framework for API Tests
- Chai      - TDD Assertion Library for Node
- Chai HTTP - Addon plugin for the Chai Assertion Library

### Compiler
Babel - Compiler for ES6 Javascript
 
## Built With

- NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.


## Author

- Alexandre NIYIGENA

## License

- MIT

