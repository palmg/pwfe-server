/**
 * Created by chkui on 2017/6/21.
 */
const server = require('../server'),
    config = require('./config');
//运行服务器，实质上也是一个webpack打包的入口
server(config);