require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./Routes/authRouter");
const workspace = require("./Routes/workspaceRouter");
const editor = require("./Routes/editorRouter");
const session = require("express-session");
const passport = require("passport");
const UserModel = require("./models/tempModel");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const google_client_id =
  "757799082640-u9plre6ms011ncm0g20bjpn0h0bfg7f7.apps.googleusercontent.com";
const google_client_secret = "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";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://simplefront-iota.vercel.app",
      "http://localhost:9000",
      "https://simple-jet-eta.vercel.app",
    ],
  })
);
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://teja29204:jgdwfvejgwfv@simplequotes.wx6ss.mongodb.net"
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch(() => {
    console.log("Database is not Connected");
  });

app.use(
  session({
    secret: "mykey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: "https://simple-jet-eta.vercel.app/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const fullName = profile.displayName;

        if (!email) {
          return done(new Error("No email found in profile"), null);
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
          const new_user = new UserModel({
            fullName: fullName,
            email: email,
            subscription: "trial",
            subscriptionDate: new Date(),
          });
          await new_user.save();
          return done(null, new_user);
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://simplefront-iota.vercel.app/login",
  }),
  (req, res) => {
    const userId = req.user._id;
    res.redirect(
      `https://simplefront-iota.vercel.app/#/redirect?userId=${userId}`
    );
  }
);

app.use("/api/auth", authRouter);
app.use("/api/workspace", workspace);
app.use("/api/editor", editor);

app.listen(9000, () => console.log("Server is started"));
