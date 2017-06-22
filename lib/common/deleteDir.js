"use strict";

/**
 * Created by chkui on 2017/6/22.
 */
var fs = require('fs');
/**
 * 删除指定的目录
 * @param path 要删除的目录
 * @param delRoot 是定是否删除输入的根目录
 */
var deleteDir = function deleteDir(path, delRoot) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                // recurse
                deleteDir(curPath, true);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        delRoot && fs.rmdirSync(path);
    }
};

module.exports = deleteDir;