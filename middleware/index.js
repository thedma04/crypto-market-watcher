module.exports = {
    requireAuth: (req, res, next) => {
       if(!req.user) return res.render('login')
    }
}