import { Router } from 'express'
import passport from 'passport';
import {isAuthenticated, roleMiddleware} from '../path.js'
import { registerResponse, loginResponse, githubResponse, currentResponse, toggleUserRole, uploadDocuments, getAllUsers, deleteUsers} from '../controllers/users.controllers.js';
import { uploader } from '../utils/multer.js'
const router = Router()

router.get('/', getAllUsers)
router.delete('/', roleMiddleware(['admin']), deleteUsers)
router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login'), loginResponse)
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);
router.get('/current', isAuthenticated, currentResponse);
router.put('/premium/:uid', toggleUserRole)
router.post("/:uid/documents", uploader.array("uploads"), uploadDocuments)


export default router