const { expect } = require("chai");
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

const User = require("../models/user");
const usersRouter = require("../routes/users");

// initialise app with express
const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use("/users", usersRouter);

const mongoose = require("mongoose");

const url = `${process.env.URL}`;

describe("MongoDB tests", () => {
  let db;

  before(async () => {
    // initialise mongodb test database
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    db = mongoose.connection;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("Tests without users in the database", () => {
    after(async () => {
      await User.deleteMany({});
    });

    it("Saves new user to the database", () => {
      request(app)
        .post("/users")
        .send({
          email: "jo.smith@email.com",
          password: "password",
          firstName: "Jo",
          lastName: "Smith",
          about: "hello world",
          profileImg: "default",
          location: "Manchester",
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.email).to.equal("jo.smith@email.com");
          expect(res.body.firstName).to.equal("Jo");
          expect(res.body.lastName).to.equal("Smith");
          expect(res.body.profileImg).to.equal("default");
        });
    });
  });

  describe("tests with users in the database", () => {
    let users;
    beforeEach((done) => {
      Promise.all([
        User.create({
          email: "jo.smith@email.com",
          password: "password",
          firstName: "Jo",
          lastName: "Smith",
          about: "hello world",
          profileImg: "default",
          location: "Manchester",
        }),
        User.create({
          email: "zoe.smith@email.com",
          password: "password2",
          firstName: "Zoe",
          lastName: "Smith",
          about: "hello world again beautiful world :)",
          profileImg: "default",
          location: "Liverpool",
        }),
        User.create({
          email: "george.jones@email.com",
          password: "password3",
          firstName: "George",
          lastName: "Jones",
          about: "hello there",
          profileImg: "default",
          location: "Manchester",
        }),
      ]).then((documents) => {
        users = documents;
        done();
      });
    });

    it("GETs all users", (done) => {
      request(app)
        .get("/users")
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          done();
        });
    });

    it("GETs user with specific id", (done) => {
      const expected = users[0];

      request(app)
        .get(`/users/${expected._id}`)
        .then(async (res) => {
          expect(res.status).to.equal(200);
          expect(res.body.email).to.equal(expected.email);
          expect(res.body.about).to.equal(expected.about);
          expect;

          done();
        });
    });

    it("PATCHes user with specific id", (done) => {
      const user = users[0];

      request(app)
        .patch(`/users/${user._id}`)
        .send({ firstName: "Updated", lastName: "World" })
        .then((res) => {
          expect(res.status).to.equal(200);

          User.findById(user._id).then((updatedUser) => {
            expect(updatedUser.firstName).to.equal("Updated");
            expect(updatedUser.lastName).to.equal("World");

            done();
          });
        });
    });
  });
});
