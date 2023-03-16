const { Router } = require("express")
const passport = require("passport")


const loginRouter = Router();

loginRouter.get (
    "/github",
    passport.authenticate('auth-github', {
        scope: ['user:email'],
        session: false
    })
);

loginRouter.get (
    "/github/callback",
    passport.authenticate('auth-github', {
        scope: ['user:email'],
        session: false
    }),
    (req, res) => {
        res.status(200).json(req)
    }
)

module.exports = { loginRouter }