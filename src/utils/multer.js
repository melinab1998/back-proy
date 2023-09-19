import multer from "multer";
import {logger} from './logger.js'
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    
    destination: async function(req, file, cb) {
        let uploadFolder = ""
        const uploadType = req.body.uploadType
        const userId = req.params.uid

        if (uploadType === "profile") {
            uploadFolder = "profiles"
        } else if (uploadType === "product") {
            uploadFolder = "products"
        } else if (uploadType === "document") {
            uploadFolder = "documents"
        }

        const userFolder = path.join(__dirname, '..', 'files', uploadFolder, userId);
        
      
    if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
    }

        cb(null, userFolder)
    },
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

const fileFilter = function(req, file, cb) {
    const validDocumentNames = [
        "Identificacion",
        "Comprobante de domicilio",
        "Comprobante de estado de cuenta"
    ]
    const validExtensions = [".jpg", ".jpeg", ".png", ".pdf"]

    const uploadType = req.body.uploadType
    if (uploadType === "document") {
        const fileName = file.originalname.split(".")
        const fileBaseName = fileName.slice(0, -1).join(".")
        const fileExtension = `.${fileName.pop()}`

        if (
            validDocumentNames.includes(fileBaseName) &&
            validExtensions.includes(fileExtension)
        ) {
            cb(null, true)
        } else {
            cb(new Error("Nombre de archivo o extensión no válidos para la carga de documentos"), false);
        }
    } else {
        cb(null, true)
    }
}

export const uploader = multer({
    storage,
    fileFilter,
    onError: function(error, next){
        logger.error(error.message)
        next()
    }
})

