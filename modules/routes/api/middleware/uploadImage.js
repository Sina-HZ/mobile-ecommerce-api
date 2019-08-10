const multer = require('multer');
const mkdirp = require('mkdirp');

const ImageStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDay();
        let dir = `./uploads/image/${year}/${month}/${day}`

        mkdirp(dir , err => cb(err, dir));
    },
    filename: (req, file , cb) =>{
        cb(null ,Date.now() + '-' + file.originalname)
    }
})

const imageFilter = (req, file, cb) =>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null , true)
    } else{
        cb(null , false)
    }
}

const uploadImage = multer({
     storage : ImageStorage ,
     fileFilter : imageFilter
    })

module.exports = {
    uploadImage
}