var router = require("express").Router();
const connection = require("../config/database");
var bcrypt = require("bcrypt");

// Dashboard
router.get("/:userId", function (req, res) {
  var uId = req.params.userId;
  var sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, [uId], function (err, rows) {
    if (err) throw err;

    res.render("./users/index", {
      title: "App",
      heading: "Dashboard",
      user: req.user,
      data: rows,
    });
  });
});

// Profile
router.get("/:userId/profile", function (req, res) {
  var uId = req.params.userId;
  var sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, [uId], function (err, rows) {
    if (err) throw err;

    res.render("./users/profile", {
      title: "App",
      heading: "Profile",
      user: req.user,
      data: rows,
    });
  });
});

router.post("/:userId/profile", function (req, res) {
  var uId = req.params.userId;
  var sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, [uId], function (err, rows) {
    if (err) throw err;

    var User = {
      username: req.body.username,
      password: req.body.password,
    };

    var user = rows[0];

    // hash password
    bcrypt.hash(User.password, 10, function (err, hash) {
      if (err) return done(err);

      if (User.password > 0) {
        User.password = hash;
      } else {
        User.password = user.password;
      }
      console.log(User);

      var sql = "UPDATE users SET ? WHERE id = ?";
      connection.query(sql, [User, uId], function (err, rows) {
        if (err) throw err;

        console.log(`Profile for User ${uId} (${User.username}) updated`);
        res.redirect("back");
      });
    });
  });
});

module.exports = router;
