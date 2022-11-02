const { User } = require("../../models/user");
const { ReqErr } = require("../../helpers/ReqErr");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ReqErr(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw ReqErr(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw ReqErr(401, "Email not verified");
  }
  const payload = {
    id: user._id,
  };
  const { subscription } = user;
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
