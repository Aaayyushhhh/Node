const { check, validationResult } = require("express-validator");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
  });
};
exports.postSignup = [
  //first name validation
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be atleast 2 characters long.")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contain only alphabets."),

  //last name validation
  check("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("last name should contain only alphabets."),

  //email validation

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  //password validation
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long.")
    .matches(/[ a-z]/)
    .withMessage("Password should contain at least one uppercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password should contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should contain at least one special character.")
    .trim(),
  //Confirm password validation
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  //User Type Validation
  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
      });
    }
    const user = new User({ firstName, lastName, email, password, userType });
    user
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("Error while saving user:", err);
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, password, userType },
        });
      });
  },
];
