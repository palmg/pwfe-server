/**
 * Created by chkui on 2017/6/21.
 */
const builder = require('../builder'), //如果后续的代码中实用到es6或者react，请先加载builder。
    config = require('./config');
//打包文件服务器，打包成功后会在指定的dist文件生成指定的内容
builder(config);