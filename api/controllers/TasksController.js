/**
 * TasksController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function (req, res) {
        Users.find(function foundUser (err, users) {
            if(err) return res.send('no Funciona :(');
            res.view({
                users: users
            });
        });
    },
    index: function (req, res) {
        Tasks.find().populate('owner').exec(function (err, tasks) {
            if(err) return res.send(err, 500);
            Users.find(function foundUser (err, users) {
                if(err) return res.send('no Funciona :(');
                return res.json('200', tasks);
                // res.view('Tasks/main', {
                //     users: users,
                //     tasks: tasks
                // });
            });
        });
    },
    create: function(req, res) {
        Tasks.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                return res.send(err.status.toString(), err)
            } else {
                return res.redirect('/tasks');
            }
        });
    },
    find: function(req, res){
        Tasks.find({id:req.params.id}).exec(function (err, records) {
            if(err) {
                return res.send('no Funciona :(');
            } else {
                Users.find(function foundUser (err, users) {
                    if(err) return res.send('no Funciona :(');
                    res.view('Tasks/edit', {
                        tasks: records,
                        users: users
                    });
                });
            }                
        });
    },
    update: function(req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        var id = params.id;
    
        Tasks.update(id, params, function userUpdated(err, result) {
          if (err) {
            return res.send("Error.",500);
          }
          res.redirect('/tasks');
        });
    },
    destroy: function(req, res) {
        var id = req.params.id;
		if (!id) return res.send("No se ha encontrado ID valido.",500);

		Tasks.find(id, function foundUser(err, result) {
			if (err) return res.send(err,500);
			if (!result) return res.send("No existe el usuario indicado.",404);

			Tasks.destroy(id, function userDestroyed(err) {
				if (err) return res.send(err,500);
				return res.redirect('/tasks');
			});
			
		})
    }
};

