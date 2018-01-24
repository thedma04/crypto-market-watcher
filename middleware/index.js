    module.exports = {
        requireAuth: function(req, res, next){
            if(req.user) return next()
            return res.render('login')
        }
    }