/**
 * ShopController
 *
 * @description :: Server-side logic for managing Shops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
    index: function (req, res) {
        res.view();
    },
    purchase: function (req, res) {
        var plan = req.param("plan");
        if (plan) {
            User.query("BEGIN", function (error, result) {
                var userid = req.session.User.id;
                console.log("BEGIN ERROR", error);
                console.log("BEGIN RESULT", result);
                console.log("userid", userid);
                User.findOne(req.session.User.id, function foundUser(err, user) {
                    if (err || !user) {
                        rollback(err);
                    }
                    var numCoins = getCoinsByPlan(parseInt(plan));
                    var totalCoins = user.coins - numCoins;
                    console.log("current coins", user.coins);
                    console.log("coins to deduct", numCoins);
                    console.log("total coins", totalCoins);
                    if (totalCoins > 0 && user.coins > totalCoins) {
                        User.update(userid, {coins: totalCoins}, function userUpdated(err) {
                            if (!err) {
                                req.session.User.coins = totalCoins;
                                commit();
                            } else {
                                rollback(err);
                            }
                        });
                    } else {
                        rollback("Insuficient funds");
                    }
                });
            });
        } else {
            req.session.flash = {"err": ["Please select a plan"], kind: "danger"};
            return res.redirect("shop");
        }
        function getCoinsByPlan(idCurrentPlan) {
            console.log("currentPlan", idCurrentPlan);
            var coins = 0;
            switch (idCurrentPlan) {
                case 1:
                    coins = 5;
                    break;
                case 2:
                    coins = 10;
                    break;
                case 3:
                    coins = 50;
                    break;
                case 4:
                    coins = 100;
                    break;
            }
            return coins;
        }
        function rollback(err) {
            User.query("ROLLBACK", function (error, result) {
                console.log("ROLLBACK ERROR", error);
                console.log("ROLLBACK RESULT", result);
                req.session.flash = {"err": ["There was an error processing the purchase", JSON.stringify(err)], kind: "danger"};
                return res.redirect("shop");
            });
        }

        function commit() {
            User.query("COMMIT", function (error, result) {
                console.log("COMMIT ERROR", error);
                console.log("COMMIT RESULT", result);
                req.session.flash = {"err": ["Purchase Succesful!"], kind: "success"};
                return res.redirect("user/show/" + req.session.User.id);
            });
        }
    }
};

