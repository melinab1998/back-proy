import UserDao from "../dao/mongodb/user.dao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session    
        })
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async(req, res, next)=>{
    try {
       /*  const user = await userDao.getById(req.session.passport.user);
        const { first_name, last_name, email, age, role } = user; */
         res.json({
            msg: 'Login OK',
            /* session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                age,
                role
            } */
        }) 
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async(req, res, next)=>{
    try {
        /* const { first_name, last_name, email, role, isGithub } = req.user; */
        res.json({
            msg: 'Register/Login Github OK',
          /*   session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                role,
                isGithub
            } */
        })
    } catch (error) {
        next(error);
    }
}


export const currentResponse = async(req, res, next)=>{
    try {
        const user = await userDao.getById(req.session.passport.user);
        const { first_name, last_name, email, age, role, cart } = user;
         res.json({
            msg: 'Usuario Actual',
            userData: {
                first_name,
                last_name,
                email,
                age,
                role,
                cart
            }
        }) 
    } catch (error) {
        next(error);
    }
}
