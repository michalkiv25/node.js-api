const multer = require('multer'); //External library for uploading photos

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // key of data img
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {// key of data img
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    cb(null, false)
}

const upload = multer({ //get object
    // dest: 'uploads/',
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
});

module.exports = upload;