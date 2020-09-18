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
  let connection;

  before(async () => {
    // initialise mongodb test database
    connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
  });

  it("Saves new user to the database", async () => {
    const res = await request(app).post("/users").type("json").send({
      email: "jo.smith@email.com",
      password: "password",
      firstName: "Jo",
      lastName: "Smith",
      about: "hello world",
      profileImg: "default",
      location: "Manchester",
    });

    await expect(res.status).to.equal(201);

    await expect(res.body.email).to.equal("jo.smith@email.com");
    await expect(res.body.firstName).to.equal("Jo");
    await expect(res.body.lastName).to.equal("Smith");
    await expect(res.body.profileImg).to.equal("default");
  });
});
