const { expect } = require("jest");
const request = require("supertest");
const User = require("../models/user");

const mongoose = require("mongoose");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await mongoose.connection;
  });

  afterAll(async () => {
    await User.deleteMany();
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    const mockUser = {
      email: "jo.smith@email.com",
      password: "password",
      firstName: "Jo",
      lastName: "Smith",
      about: "hello world",
      profileImg: "default",
      location: "Manchester",
    };

    await User.create(mockUser);

    const insertedUser = await User.find({ firstName: "Jo" });
    console.log(insertedUser[0]);
    console.log(mockUser);

    expect(insertedUser[0]).equal(mockUser);
  });
});
