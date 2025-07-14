- Create a repository
- Initialize the ropository
- node_modules, package.jsom, package-lock.json
- Install express
- Listen to port 7777
- Write request handelers for /test , /hello
- Install nodemon and update script  inside  package.json


- initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with route and extensition ex . /hello, /xyz
- Order of route is matter a lot
- Install Postman app and make a workspace/collection > test API Call
- Write logic to handle GET, POST, PATCH DELETE API Calls and test them on postman
- Use of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Route Handlers - Play with the code
- next()
- next Function and errors along with res.send()
<!-- - app.use('/routes', rH1,rH2, [rH3, rH3], rH4, rH5); -->
- what is a Middleware? Why do we need it?
- How express JS Basically handles requests bihand the scence
- Difference between app.use and app.all
- Error Handling Using app.use('/', (err, req, res, next) => {});

- Create a free cluster on MongoDB official website (Mongo atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the  connectDB() function and connect to database before starting application  on 7777
 - Create a UserSchema & user Model
 - Create  a post signup API to add data to database
 - push some documents using API calls from postman
 - Error handling using try, catch

 - JS Object vs JSON  (difference)
 - Add the express.json middleware to your app
 - Make your signup API dynamic to receive data from the end  user
 - API - Get user by email'
 - API - Feed API - GET /feed - get all the users from the database
- API - find the user by ID
- Create a delete user API
- Create a update user data API
- Explore Mongoose Documentation for model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID             
- add rewuried, unique, lowercase, min/max length, trim
- add default
- create a custume validation functiom for gender
- Improve the DB schema - PUT all  appropiate validation on each field i schema
- Add timestamps to the userSchema
- Add API level validation on patch request and signup post api
- Data Sanitizing - add api validation for each field
- Install validator
- Explore validator library function and Use validator function for password, email, photoUrl
- NEVER TRUST req.body

- Validate data in Signup API
- Install bcrypt-package
- Create  PasswordHash  using bcrypt.hash and save the user is excrupted password
- Create login API
- Compare password and throw errors if email or password is 



- install cookie-parse
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation,  create a JWT token and send it to user in cookies
- read cookies inside your profile API and find the logged in user
