const { Contact } = require("../../models/contact");

const listContatcs = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find(
      { owner, favorite: favorite },
      "-createdAt -updatedAt"
    );
    return res.json(result);
  }
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

module.exports = listContatcs;
