const { User } = require("../../models/user");
const { ReqErr } = require("../../helpers/ReqErr");
const { sendMail } = require("../../helpers/sendMail");

const resendMail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ReqErr(404, "Email not found");
  }
  if (user.verify) {
    throw ReqErr(400, "Email already verified");
  }
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_balnk" href="http://localhost:3000/auth/verify/${user.verificationToken}">Click to verify email</a> `,
  };
  await sendMail(mail);
  res.json({
    message: "Email resend",
  });
};

module.exports = resendMail;
