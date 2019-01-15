const com = require('../utils/common')
const config = require('./config')
const app = {
    async getToken() {
        if (global.wxtoken) {
            return {
                code: 0,
                token: global.wxtoken
            }
        } else {
            let http = await com.http.request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
                config.APP_ID + '&secret=' + config.APP_SECRET, 'GET', {})
            if (http.access_token) {
                global.wxtoken = http.access_token
                setTimeout(function () {
                    delete global.wxtoken
                }, 1000 * 60 * 60 * 2)
                return {
                    code: 0,
                    token: http.access_token
                }
            } else {
                return {
                    code: http.errcode,
                    token: http.access_token
                }
            }
        }
    },
    async msgModel(touser, template_id, form_id, page, data, emphasis_keyword) {
        let tkn = await this.getToken()
        let token = ''
        if (tkn.code == 0) {
            token = tkn.token
            let http = await com.http.request('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token, 'POST', {
                touser: touser,
                template_id: template_id,
                form_id: form_id,
                page: page,
                data: data,
                emphasis_keyword: emphasis_keyword
            })
            console.log(http)
        } else {
            console.log(tkn)
        }
    }
}
module.exports = app