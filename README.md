# Plant Finder API

## About Plant Finder
Plant Finder aims to provide an online alternative to in-person plant swap events that have been cancelled due to COVID. Users can create free accounts, post ads for plants, seedlings, seeds and other gardening materials they want to swap (for free) and browse posts by other users. In the first version of the app, users can contact each other through an 'email to' button, but in version 2 (currently under development) users will be able to send in-app messages.

This app was created by [Nicola Beswick](https://github.com/nic-bes), [Andreea Ros](https://github.com/andrcatros) and [Antonia Symeonidou](https://github.com/antoniasymeonidou). 

Technologies used include: React and SASS (for frontend), Express, NodeJS, MongoDB, Mongoose and Multer (for backend).  

Check out the frontend repo [here](https://github.com/andrcatros/plant-finder-react) and try out the deployed web app on Vercel [here](https://plant-finder-react-2pj9xcnqm.vercel.app/). 

### Upcoming features (as of October 2020)
<ul>
  <li>In-app messages</li>
  <li>'Request plant' button on ads that automatically sends a message to the user</li>
  <li>Matching system allowing users to offer a specific item when sending requests</li>
</ul>


## About Plant Finder API

App created with the [Express application generator](https://expressjs.com/en/starter/generator.html).

To install this repo, clone the repo and install the dependencies:

`git clone git@github.com:andrcatros/plant-finder-api.git`
`cd plant-finder-api`
`npm install`

Then create an .env file and save a URL variable with the MongoDB url in it (e.g. `URL=mongodb://username:password@ds117960.mlab.com:17960/surreal-estate`).

Now that everything is set up, run `npm start` from the repo directory and your terminal should display:

`You have connected to the database.`
`Plant Finder API is running on :4000`

Go to `http://localhost:4000/test` and you should see this JSON file:

`{"message":"Plant Finder API is up and running!"}`

You can also set the App to run on a port of your choosing by adding a PORT variable to your .env file.

#### This API is deployed [here](https://plant-finder-api.herokuapp.com/) on Heroku.

### ROUTES

### User routes

- Return all users
  GET request to `/api/v1/users`

- Create new user record
  POST request to `/api/v1/users`

- Returns user with specific id
  GET request to `/api/v1/users/:id`

- Updates user record with specific id
  PATCH request to `/api/v1/users/:id`

- Deletes user record with specific id
  DELETE request to `/api/v1/users/:id`

- Checks login details
  POST request (with email & password in req.body) to `/api/v1/login`

### User and plant routes

- Create new plant record
  POST request to `/api/v1/:userId/plants`

- Return all plants belonging to specific user
  GET request to `/api/v1/:userId/plants`

### Plant routes

- Return all plants in the database
  GET request to `api/v1/plants`

- Return plant record with specific id
  GET request to `/api/v1/plantId`

- Update plant record with specific id
  PATCH request to `api/v1/:plantId`

- Delete plant record with specific id
  DELETE request to `api/v1/:plantId`

**User and Plant schemas are in the models folder.**
