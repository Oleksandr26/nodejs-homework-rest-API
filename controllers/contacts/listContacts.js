const { Contact } = require("../../models/contact");

const listContatcs = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = listContatcs;
