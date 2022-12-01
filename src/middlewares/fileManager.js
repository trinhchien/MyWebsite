import multer from 'multer';

const uploadAvatar = multer({
    limits: {
        fieldSize: 5,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpe?g|tiff?|png|webp|bmp)$/)) {
            return cb(new Error('file extension do not allow'));
        }
        cb(null, true);
    },
});

export { uploadAvatar };
