const UserModel = require("../models/user");

exports.create = (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json(err));
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.id).then((user) => {
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "User not found." });
  });
};

exports.query = (req, res) => {
  const query = req.body.query;

  UserModel.find(query)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
};

exports.update = (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => res.status(200).json(updated))
    .catch((err) => res.status(400).json({ err }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndRemove(id)
    .then((removed) => res.status(200).json(removed))
    .catch((err) => res.status(400).json(err));
};

exports.login = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      !user
        ? res.status(401).json({ message: "Incorrect email address!" })
        : user.validatePassword(req.body.password)
        ? res.status(200).json(user)
        : res.status(401).json({ message: "Incorrect email or password!" });
    })
    .catch((err) => console.log(err));
};
