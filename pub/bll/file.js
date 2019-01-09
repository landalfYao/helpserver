let multer = require('multer');
const uploadPath = process.cwd() + '/public/uploads/files/';

let storage = multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
        var file_name = guid() + file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, file_name)
    }
})
multer = multer({
    storage: storage,
}).single('file');

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
// Generate a pseudo-GUID by concatenating random hexadecimal. 
function guid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
let app = {
    async add(ctx) {
        let form = ctx.request.body
        multer(ctx.request, ctx.response, function (err) {
            if (err) throw err;
            console.log(ctx.request.file)
            // db.queryArgs(model.sql.insert,
            //     [com.getTimeUploadPath(com.uploadPath, 'origin/') + req.file.filename, req.file.filename, req.file.size, req.file.mimetype, req.body.admin_id, req.body.group_id, com.getTimeUploadPath(com.uploadPath, 'thumb/') + req.file.filename],
            //     function (err, body) {
            //         //fileTmub(uploadPath, req.file.filename)
            //         if (err) {
            //             db.repReturn(res, false, '添加失败', 'fail');
            //         } else {
            //             db.repReturn(res, true, '添加成功', 'ok');
            //         }
            //     }
            // );
        })

    }
}
module.exports = app