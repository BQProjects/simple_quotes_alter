const express = require("express");
const cors = require("cors");
const {
  signUp,
  login,
  logout,
  getUser,
  setSubscription,
  getSharedUsers,
  addMemeber,
  removeSharedUser,
  getUserBGmail,
  chnagePassword,
} = require("../Components/authComponents");

const authRouter = express.Router();

authRouter.use(cors());

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/getUser", getUser);
authRouter.post("/changeSubscription", setSubscription);
authRouter.get("/getshared", getSharedUsers);
authRouter.post("/addmem", addMemeber);
authRouter.post("/removemem", removeSharedUser);
authRouter.get("/getuseremail", getUserBGmail);
authRouter.post("/changepass", chnagePassword);

module.exports = authRouter;
