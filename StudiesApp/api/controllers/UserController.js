/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'new': function (req, res) {
        res.view();
    },
    "add_coin": function (req, res) {
        User.query("BEGIN", function (error, result) {
            var userid = req.session.User.id;
            console.log("BEGIN ERROR", error);
            console.log("BEGIN RESULT", result);
            console.log("userid", userid);
            User.findOne(req.session.User.id, function foundUser(err, user) {
                if (err || !user) {
                    rollback();
                }
                var numCoins = parseInt(req.body.coins);
                var totalCoins = user.coins + numCoins;
                console.log("current coins", user.coins);
                console.log("coins to purchase", numCoins);
                console.log("total coins", totalCoins);
                User.update(userid, {coins: totalCoins}, function userUpdated(err) {
                    if(!err) {
                        req.session.User.coins = totalCoins;
                        commit();
                    } else {
                        rollback();
                    }
                });
            });
        });
        function rollback() {
            User.query("ROLLBACK", function(error, result){
                console.log("ROLLBACK ERROR", error);
                console.log("ROLLBACK RESULT", result);
                req.session.flash = {"err": ["There was an error processing the purchase", error], kind: "danger"};
                return res.redirect("coin/add/");
            });
        }
        function commit() {
            User.query("COMMIT", function(error, result){
                console.log("COMMIT ERROR", error);
                console.log("COMMIT RESULT", result);
                req.session.flash = {"err": ["Purchase Succesful!"], kind: "success"};
                return res.redirect("user/show/" + req.session.User.id);
            });
        }
    },
    login: function (req, res) {
        res.view();
    },
    create: function (req, res, next) {
        var params = req.params.all();
        delete params.id;
        User.create(params, function userCreated(err, user) {
            if (err) {
                req.session.flash = {err: err, kind: "danger" };
                return res.redirect("user/new");
            }
            User.publishCreate(user, req.socket);
            //
            req.session.authenticated = true;
            req.session.User = user;
            //
            user.online = true;
            user.save(function (err, user) {
                if (err) return next(err);

                res.redirect("user/show/" + user.id);
            });
        });
    },
    me: function (req, res, next) {
        res.view("user/show", {user: req.session.User});
    },
    show: function (req, res, next) {
        User.findOne(req.param("id"), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },
    index: function (req, res, next) {
        var paging = false;
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            res.view({
                users: users,
                paging: paging
            });
        });
    },
    edit: function (req, res, next) {
        User.findOne(req.param("id"), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            User.publishUpdate(user.id, {updated: true, user: user}, req.socket);
            res.view({
                user: user
            });
        });
    },
    update: function (req, res, next) {
        User.update(req.param("id"), req.params.all(), function userUpdated(err) {
            if (err) {
                return res.redirect('user/edit/' + req.param("id"));
            }
            res.redirect("/user/show/" + req.param("id"));
        });
    },
    destroy: function (req, res, next) {
        User.findOne(req.param("id"), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next("User doesn't exist");

            User.destroy(req.param("id"), function userDestroyed(err) {
                if (err) return next(err);
                User.publishDestroy(user.id, req.socket);
            });
            res.redirect("/user");
        });
    },
    subscribe: function (req, res, next) {
//        console.log("User.subscribe");
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            User.subscribe(req.socket, users, ["create", "update", "destroy"]);
            res.send(200);
        });
    }
};
