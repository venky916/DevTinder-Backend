'''
# day 1
-Create a repository
-Initialize the repository
-node_modules, package.json, package-lock.json
-Install express
-Create a server
-Listen to port 7777
-Write request handlers for /test , /hello
-Install nodemon and update scripts inside package.json
-What are dependencies
-What is the use of "-g" while npm install
-Difference between caret and tilde ( ^ vs ~ )

# day 2
-initialize git
-gitignore add
-don't put package.json and package-lock.json on git
-push all code to github Push all code to remote origin
-Play with routes and route extensions ex. /hello, / , hello/2, /xyz
-Order of the routes matter a lot
-Install Postman app and make a workspace/collection > test API call
-Explore routing and use of ?, + , (), * in the routes
-Use of regex in routes /a/ , /.*fly$/
-Reading the query params in the routes req.query
-Reading the dynamic routes req.params

# day 3
-Multiple Route Handlers - Play with the code
-next()
-next function and errors along with res.send()
-app.use("/route", rH, [rH2, rH3], rH4, rh5);
-What is a Middleware? Why do we need it?
-How express JS basically handles requests behind the scenes
-Difference app.use and app.all
-Write a dummy auth middleware for admin
-Write a dummy auth middleware for all user routes, except /user/login
-Error Handling using app.use("/", (err, req, res, next) = {});

# day4
- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder (NamasteNode)
- Call the connectDB function and connect to database before starting application on 3000
- Create a userSchema & user Model
- Create POST /sigup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try , catch

# day5
- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplucate email ids, which object returned\ 
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID

- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

# day6
 - Explore schematype options from the documention
 - add required, unique, lowercase, min, minLength, trim
 - Add default
 - Create a custom validate function for gender
 - Improve the DB schema - PUT all appropiate validations on each field in Schema
 - Add timestamps to the userSchema


'''