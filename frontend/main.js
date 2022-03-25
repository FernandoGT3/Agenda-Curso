import "core-js/stable";
import "regenerator-runtime";

import './assets/css/styles.css';

import Login from "./modules/Login";
import Register from "./modules/Register";
import Contact from "./modules/Contact";

const login = new Login();
login.init();

const register = new Register();
register.init();

const contact = new Contact();
contact.init();



