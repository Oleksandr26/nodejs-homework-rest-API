const { Contact } = require("../../models/contact");

const ReqErr = require("../../helpers/ReqErr");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw ReqErr(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContactById;
