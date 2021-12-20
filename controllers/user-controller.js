const { User, Thought } = require("../models");

const userController = {
  // get all users
  getUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user with this id." });
        }

        // bonus: return Thought.deleteMany({ _id: { $in: userData.thoughts } })
      })
      .then(() => {
        res.json({ message: "user has been deleted." });
      })
      .catch((err) => res.status(400).json(err));
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
