# Dev Tinder

- Create a Vite + React application using => npm create vite@latest devtinder-web -- --template react
- Remove unecassary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configuration : origin , credentials : true
- Whenever you are making API call so pass axios =>{withCredentials : true }
- Install react-redux @redux/Toolkit - https://redux-toolkit.js.org/tutorials/quick-start 
=> configureStore => Provider => userSlice => add reducer to store
- Add redux devtool in chrome
- Login and see if your data is comming properly in the store
- Navbar should update as soon as user login in
- Refactor our code to add constants fire + create a component folder
- You should not be access other routes without login
- if token is not present, redirect user to login page
- Logout Feature
- Get the feed add the feed in the store
- build the user card on feed
- build profile view and profile update feature



Body 
    NavBar
    Route=/  => Feed
    Route=/login  => Login
    Route=/connections  => Connections
    Route=/profile  => Profile