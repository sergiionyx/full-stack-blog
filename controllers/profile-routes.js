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
      //   console.log(profileData);
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
  console.log("MADE REQUEST SUCESSFULLY");
  console.log("session is below");
  console.log(req.session.user_id);
  console.log(req.body.avatarUrl);

  // if (req.session.loggedIn) {
  const currentUserId = req.session.user_id;
  const avatarUrl = req.body.avatarUrl;
  if (!avatarUrl) {
    res.status(400).json({ message: "no avatar url found" });
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
  // } else {
  //   res.status(401).json({ message: "Must be logged in to upload!" });
  // }

    // res.render("edit-profile", { profileData, loggedIn: true });
    // res.status(200).json({message: "avatar url saved"});
});

router.post("/edit", (req, res) => {
  const currentUserId = req.session.user_id;
  const userNewAbout = req.body.aboutMe;
  console.log(currentUserId);
  console.log(userNewAbout);
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
    .then((dbUserData) => {
      console.log(dbUserData);
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
