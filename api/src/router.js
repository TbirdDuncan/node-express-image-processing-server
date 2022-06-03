const {Router} = require('express')
const multer = require("multer")

const router = Router()
const storage = multer.diskStorage({destination: 'api/uploads/', filename: filename})
const upload = multer({fileFilter: fileFilter(), storage: storage})

const filename = (request, file, callback) =>{
    callback(null, file.originalname)
}

const filefilter = (request, file, callback) => {
    if(file.mimetype !== 'image/png'){
        request.fileValidationError = 'Wrong file type'
        callback(null, false, Error("Wrong file type"))
    } else {
        callback(null, true)
    }
}

router.post("/upload", upload.single('photo'), (request, response)=>{
    if(request.fileValidationError){
        return response.status(400).json({error: request.fileValidationError})
    }
    return response.status(201).json({success: true})
})



module.exports = router