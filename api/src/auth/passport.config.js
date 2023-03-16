const passport = require ('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use( new GitHubStrategy ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
},
(accessToken, refreshToken, porfile, done ) => {
    return done(null, porfile);
    }
  )
);