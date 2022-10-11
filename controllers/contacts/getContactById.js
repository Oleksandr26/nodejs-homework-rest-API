const { Contact } = require("../../models/contact");

const ReqErr = require("../../helpers/ReqErr.js");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw ReqErr(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
