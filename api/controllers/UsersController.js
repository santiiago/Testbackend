/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @ejemplo de redireccion  return res.redirect('http://www.sayonara.com');
 */

module.exports = {
    'new': function (req, res) {
        res.view();
    },
    index: function (req, res) {
        Users.find(function foundUser (err, users) {
            if(err) return res.send('no Funciona :(');
            return res.json('200', users);
            // res.view('Users/main', {
            //     users: users
            // });
        });
    },
    create: function(req, res) {
        Users.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                return res.send(err.status.toString(), err)
            } else {
                return res.redirect('/users');
            }
        });
    },
    find: function(req, res){
        Users.find({id:req.params.id}).exec(function (err, records) {
            if(err) {
                return res.send('no Funciona :(');
            } else {
                res.view('Users/edit', {
                    users: records
                });
            }                
        });
    },
    update: function(req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        var id = params.id;
    
        Users.update(id, params, function userUpdated(err, result) {
          if (err) {
            return res.send("Error.",500);
          }
          res.redirect('/users');
        });
    },
    destroy: function(req, res) {
        var id = req.params.id;
		if (!id) return res.send("No se ha encontrado ID valido.",500);

		Users.find(id, function foundUser(err, result) {
			if (err) return res.send(err,500);
			if (!result) return res.send("No existe el usuario indicado.",404);

			Users.destroy(id, function userDestroyed(err) {
				if (err) return res.send(err,500);
				return res.redirect('/users');
			});
			
		})
    }
};