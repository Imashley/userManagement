# userManagement
This service is to manage account creation and login functionality 

## Requirements
* NodeJS
* MongoDB
* Express


## Setup
* Run `npm install` to install the needed node js packages.
* Setup Environment variables (check the .env.sample to see the environment variables needed).

## How to run
Run this command to run the application `NODE_ENV=development npm start` and you can also use [pm2](https://github.com/Unitech/pm2) or other production process manager for Node.js such as [Forever](https://github.com/foreverjs/forever) and [Strong PM](https://github.com/strongloop/strong-pm) (check their documentation for usage).


## Documentation


## Sample Environment Variables
* PORT = 3600
* DBURL='mongodb://localhost/development'

### Note: the values of the environment variables are dummy values.

# Expected JSON inputs
## register (to route /register)
## Handled by the login
- `{
     "username": "sample",
     "password": "sample123"
   } `
   
   This will create a user object, usernames are unique.


