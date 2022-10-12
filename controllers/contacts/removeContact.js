const { Contact } = require("../../models/contact");

const ReqErr = require("../../helpers/ReqErr.js");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw ReqErr(404, "Not found");
  }
  res.json(result);
};

module.exports = removeContact;
