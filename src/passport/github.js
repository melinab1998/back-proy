import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../persistence/dao/mongodb/user.dao.js';
import {logger} from '../utils/logger.js'
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.6317c77eb48c913d',
    clientSecret: 'b2d827a10541b4d1fdad61f4d5660bb8ce9d03d4',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    logger.info('profile:::', profile)
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);

    const nameParts = profile._json.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const newUser = await userDao.createUser({
        first_name: firstName,
        last_name:  lastName,
        email,
        password: '',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));