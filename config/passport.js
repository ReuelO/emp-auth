var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var connection = require("./database");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // Register
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        var sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], function (err, rows) {
          if (err) return done(err);

          // if username exists
          if (rows.length) {
            console.log(`Username ${username} is already taken!`);

            return done(
              null,
              false,
              req.flash("error", `Username ${username} is already taken!`)
            );
          } else {
            // register user
            var User = {
              username: username,
              password: password,
            };

            // hash password
            bcrypt.hash(password, 10, function (err, hash) {
              if (err) return done(err);

              User.password = hash;
              var sql = "INSERT INTO users SET ?";
              connection.query(sql, [User], function (err, rows) {
                if (err) return done(err);

                User.id = rows.insertId;
                console.log(`User ${User.id} (${username}) registered!`);

                return done(
                  null,
                  User,
                  req.flash(
                    "success",
                    `User ${User.id} (${username}) successfully registered!`
                  )
                );
              });
            });
          }
        });
      }
    )
  );

  // Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        var sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], (err, rows) => {
          if (err) return done(err);

          var user = rows[0];

          // if user does not exist
          if (rows.length == 0) {
            console.log(`User ${username} does not exist`);
            return done(
              null,
              false,
              req.flash("error", `User ${username} does not exist`)
            );
          } else {
            // if username is valid
            var hash = user.password;
            bcrypt.compare(password, hash, function (err, result) {
              if (err) return done(err);
              console.log(result);

              if (!result) {
                console.log(`Invalid password`);
                return done(
                  null,
                  false,
                  req.flash("error", `Invalid password`)
                );
              } else {
                return done(
                  null,
                  user,
                  req.flash("success", `Welcome, ${username}!`)
                );
              }
            });
          }
        });
      }
    )
  );
};
