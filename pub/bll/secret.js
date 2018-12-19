const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')

secret={
    /**
* @api {post} /api/secret/encrypt 加密
* @apiDescription 加密
* @apiName Encrypt
* @apiGroup Secret
* @apiParam {string} str 输入文本
* @apiVersion 1.0.0  
* @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/secret/encrypt
 * @apiVersion 1.0.0
*/
    async setSecret ( ctx ){
        let form = ctx.request.body
        form.str = com.secrets.encrypt(form.str,'utf8', com.ivkey, 'hex', true)
        let result = retCode.Success
        result.data = form.str
        return result
    }
}

module.exports = secret