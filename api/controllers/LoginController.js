/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function(req, res) {
        
        return res.login({
            email: req.param('email'),
            password: req.param('password'),
            successRedirect: '/',
            invalidRedirect: '/users'
        });
    }
};

