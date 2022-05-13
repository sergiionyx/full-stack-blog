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
    }
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/edit/:id", withAuth, (req, res) => {
//   Post.findByPk(req.params.id, {
//     attributes: [
//       "id",
//       "post_url",
//       "title",
//       "created_at",
//       [
//         sequelize.literal(
//           "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
//         ),
//         "vote_count",
//       ],
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (dbPostData) {
//         const post = dbPostData.get({ plain: true });

//         res.render("edit-profile", {
//           post,
//           loggedIn: true,
//         });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
