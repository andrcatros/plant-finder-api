# plant-finder-api

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
