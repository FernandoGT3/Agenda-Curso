const Contacts = require('../models/ContactModels');
const ContactModel = require('../models/ContactModels');

exports.index = (req, res) => {
    res.render('contacts', {
        contact : {}
    });
}

exports.register = async (req, res) => {
    try {
        const contact = new ContactModel(req.body);
        await contact.register();

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                return res.redirect('/contacts/index');
            });
            return;
        }

        req.flash('success', 'Contato adicionado com Sucesso !');
        req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`)); //indo para a página de edição do contato
        return;
        
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};

exports.editIndex =  async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contact = await Contacts.searchID(req.params.id);

    if(!contact) return res.render('404');

    res.render('contacts', {
        contact
    });
}

exports.edit = async (req, res) => {

    try {
        if(!req.params.id) return res.render('404');

        const contact = new ContactModel(req.body);
    
        await contact.edit(req.params.id);
    
        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`/contacts/index/${req.params.id}`)); 
            return;
        }
    
        req.flash('success', 'Contato editado com Sucesso !');
        req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`)); //indo para a página de edição do contato
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contact = await Contacts.delete(req.params.id);

    if(!contact) return res.render('404');

    req.flash('success', 'Contato apagado com Sucesso !');
    req.session.save(() => res.redirect(req.get('referer'))) //indo para a página de edição do contato
    return;
};