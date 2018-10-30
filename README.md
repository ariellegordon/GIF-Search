## Intro

This repo is a GIF search tool that allows users to query the GIPHY API based on keywords and sorting parameters.

### Stack

This app is built with React and Node.js, with Express for routing, Bootstrap and CSS for styling, Redux for state management, and Mocha, Chai, and Enzyme for testing. It is deployed on Heroku at https://secure-sierra-84991.herokuapp.com/

### Starting up the app

To start up the server and build the client, run `npm install` and then `npm start`. The webpage will be served from **localhost:5000**.

### Testing the app

Run `npm test`. Tests will appear in the terminal.

### Navigation

- Search using the search bar at the top of the page.
- Filter results by pixel size, upload date, and content (using GIF "rating" metadata)
