const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");
const withAuth = require("../utils/auth");

// get user info
router.get("/", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No profile page found" });
        return;
      }
      const profileData = dbUserData.dataValues;
      res.render("profile-page", { profileData, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No profile found" });
        return;
      }
      const profileData = dbUserData.dataValues;
      res.render("edit-profile", { profileData, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/edit", (req, res) => {
  const currentUserId = req.session.user_id;
  const avatarUrl = req.body.avatarUrl;
  if (!avatarUrl) {
    res.status(400).json({ message: "No avatar url found" });
  }
  User.update(
    { avatar_url: avatarUrl },
    {
      where: {
        id: currentUserId,
      },
    }
  )
    .then((data) => res.status(200).json({ message: "record updated!", data }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Unexpecting error updating user!" });
    });
});

router.post("/edit", (req, res) => {
  const currentUserId = req.session.user_id;
  const userNewAbout = req.body.aboutMe;
  User.update(
    {
      about_me: userNewAbout,
    },
    {
      where: {
        id: currentUserId,
      },
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No profile page found" });
        return;
      }
      const profileData = dbUserData.dataValues;
      // check if use go to own page
      if (req.session.user_id == req.params.id) {
        let myPage = true;
        res.render("profile-page", { profileData, myPage, loggedIn: true });
      } else {
        let myPage = false;
        res.render("profile-page", { profileData, myPage, loggedIn: true });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
