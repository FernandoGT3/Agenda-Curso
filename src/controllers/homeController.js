const Contacts = require('../models/ContactModels')

exports.index = async(req, res) => {
    const contacts = await Contacts.searchContacts();
    res.render('index', {contacts});
};
