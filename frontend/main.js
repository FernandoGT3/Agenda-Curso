import "core-js/stable";
import "regenerator-runtime";

import './assets/css/styles.css';

import Login from "./modules/Login";
import Register from "./modules/Register";

const login = new Login();
const register = new Register();

login.init();
register.init();