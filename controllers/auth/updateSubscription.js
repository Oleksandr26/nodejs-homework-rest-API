const { User } = require("../../models/user");

const { ReqErr } = require("../../helpers/ReqErr");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw ReqErr(404, "Not found");
  }
  res.json({ subscription: result.subscription });
};

module.exports = updateSubscription;
