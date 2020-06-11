# sampleapp

Sample Node.js / Express Web Application with User Authentication using passport.

Setup
----------
Install dependencies by using: **npm install**  
Install nodemon: **npm install -g nodemon**  
Install mocha: **npm install --g mocha**

Ignore - "test": "npm run test-unit && npm run test-integration"

Configuration
----------
Directory **config** contains global and sample configuration file. You should create
**config.development.js** and **config.prod.js** files respectively using values for your environments.
By default the application is using Postgres as the database

Running
----------
+ Run app in dev: **npm run start-dev**
+ + Run app in prod: **npm run start**
+ Run app with debug by using: **DEBUG=sampleapp:\* npm start**
+ Run app with debug and nodemon using: **DEBUG=sampleapp:\* nodemon ./bin/www**
+ Nodemon should also work this way: **nodemon**

Testing
----------
+ in the command line enter: **mocha**

Browser
----------
+ in the browser open the url: **http://localhost:8080/** or whatever your localhost is if cloud IDE

