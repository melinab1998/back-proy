import {getByIdService} from "../services/user.services.js";
import userDTO from "../persistence/dto/user.dto.js";
import {logger} from '../utils/logger.js'
import UserDao from "../persistence/dao/mongodb/user.dao.js";
const userDao = new UserDao();


export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session    
        })
    } catch (error) {
        logger.error(error.message)
        next(error);
    }
};

/* export const loginResponse = async(req, res, next)=>{
    try { */
       /*  const user = await userDao.getById(req.session.passport.user);
        const { first_name, last_name, email, age, role } = user; */
        /*  res.json({
            msg: 'Login OK', */
            /* session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                age,
                role
            } */
   /*      }) 
    } catch (error) {
        logger.error(error.message)
        next(error);
    }
} */

export const loginResponse = async (req, res, next) => {
    try {
        const user = req.user; 

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json({
            msg: 'Login OK'
        });
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};

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
        logger.error(error.message)
        next(error);
    }
}

export const currentResponse = async(req, res, next)=>{
    try {
        const user = await getByIdService(req.session.passport.user)
        const userDto = new userDTO(user);
        res.send({'Usuario Actual': userDto});
    } catch (error) {
        logger.error(error.message)
        next(error);
    }
}

export const toggleUserRole = async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await userDao.getById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.role === 'user' && !userHasRequiredDocuments(user)) {
            return res.status(400).json({ message: 'El usuario debe cargar los documentos requeridos para ser premium' });
        }

        user.role = user.role === 'user' ? 'premium' : 'user';
        await user.save();

        return res.json({ message: `Rol de usuario actualizado a: ${user.role}` });
    } catch (error) {
        return res.status(500).json({ message: 'Error al cambiar el rol del usuario' });
    }
};

function userHasRequiredDocuments(user) {
    const requiredDocuments = ["Identificacion", "Comprobante de domicilio", "Comprobante de estado de cuenta"];

    for (const requiredDocument of requiredDocuments) {
        const matchingDocument = user.documents.find(doc => {
            const docNameWithoutExtension = doc.name.split('.').slice(0, -1).join('.');
            return docNameWithoutExtension === requiredDocument;
        });

        if (!matchingDocument) {
            return false;
        }
    }
    return true;
}

export const uploadDocuments = async (req, res) => {
    try {
        const userId = req.params.uid;
        const userDB = await getByIdService(userId);

        if (!userDB) {
            return res.status(404).send({ status: "error", error: "Usuario inexistente" });
        }

        const newDocuments = req.files.map(file => ({
            name: file.filename,
            reference: file.destination
        }));

        userDB.documents.push(...newDocuments);
        userDB.uploadedDocuments = true;

        await userDao.updateUser(userId, {
            documents: userDB.documents,
            uploadedDocuments: userDB.uploadedDocuments
        });

        res.status(200).send({
            status: "success",
            message: "Se subió correctamente",
            user: userDB 
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
};
  

  
  
  