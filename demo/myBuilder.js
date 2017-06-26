/**
 * Created by chkui on 2017/6/21.
 */
const builder = require('../builder'), //如果后续的代码中实用到es6或者react，请先加载builder。
    config = require('./config');
/**
 * 打包服务器，打包成功后会在指定的dist文件生成指定的内容
 * 然后允许服务器中的[server.js]文件即可运行服务器，用于生产环境。
 */
builder(config);