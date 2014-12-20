module.exports = {
    isCurrentPage: function (req, controller, action) {
//        console.log("controller", req.options.controller);
//        console.log("action", req.options.action);
        return (req.options.controller === controller && req.options.action === action)
    }
};