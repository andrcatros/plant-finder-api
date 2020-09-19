const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  about: { type: String, required: true },
  profileImg: { type: String, required: true },
  location: { type: String, required: true },
  password: {
    type: String,
    required: true,
    set: (password) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      return hashedPassword;
    },
  },
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
