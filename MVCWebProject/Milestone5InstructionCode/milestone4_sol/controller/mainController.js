const createError = require("http-errors");
const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  if (req.session.userProfile) {
    res.render("index", {
      title: "Home",
      theUser: req.session.theUser,
    });
  } else {
    res.render("index", { title: "Home" });
  }
});

/* GET about page. */
router.get("/about", function (req, res) {
  if (req.session.userProfile) {
    res.render("about", {
      title: "About",
      theUser: req.session.theUser,
    });
  } else {
    res.render("about", { title: "Home" });
  }
});

/* GET contact page. */
router.get("/contact", function (req, res) {
  if (req.session.userProfile) {
    res.render("contact", {
      title: "Contact",
      theUser: req.session.theUser,
    });
  } else {
    res.render("contact", { title: "Home" });
  }
});

module.exports = router;
