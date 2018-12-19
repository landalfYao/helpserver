const RetCode = {
    SessionExpired          : { code:  -1, codeMsg: 'FAILED OVERDUE'                      },   //登录过期
    Fail                    : { code:   0, codeMsg: 'FAILED'                              },   //失败
    Success                 : { code:   1, codeMsg: 'SUCCESS OK'                          },   //成功
    ArgsError               : { code:   2, codeMsg: 'ERROR ARGUMENTS'                     },   //参数错误
    ServerError             : { code:   3, codeMsg: 'ERROR SERVER'                        },   //服务端错误
    UserExisted             : { code:  10, codeMsg: 'USER ALREADY EXISTE'                 },   //用户已经存在
    UsernameOrPasswordError : { code:  11, codeMsg: 'ERROR INCORRECT USERNAME OR PASSWORD'},   //用户名或者密码错误      
    UserNotExist            : { code:  12, codeMsg: 'USER DOES NOT EXISTE'                },   //用户不存在
    NoAuthority             : { code:  13, codeMsg: 'No AUTHORITY'                        },   //无权限
    IncorrectFormat         : { code:  14, codeMsg: 'INCORRECT FORMAT'                    },   //格式不正确
    NotNullValue            : { code:  15, codeMsg: 'NOT NULL VALUE'                      },   //空值
    UnknownError            : { code: 100, codeMsg: 'UNKNOWN ERROR'                       },   //未知错误
    LoginOverdue            : { code: 101, codeMsg: 'LOGIN OVERDUE'                       },   //登录态已过期

};

module.exports = RetCode