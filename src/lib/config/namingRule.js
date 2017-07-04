/**
 * Created by chkui on 2017/7/4.
 */
/**
 * 命名规则相关配置
 */

const init = ()=>{
    return {
        /**
         * 文件打包时生成的文件以及样式全局哈希编码长度
         */
        hashLength: 8,
        /**
         * 输出文件名称文件附加前缀
         * @type {string}
         */
        prefix: '',
        /**
         * 输出文件名称文件附加后缀
         * @type {string}
         */
        suffix: '',
        /**
         * 打包文件中[name]的标记，当webpack打包时[name]表示当前文件的名称
         * 用于chunkFileName、chunkFileName，cssFileName
         * @type {string}
         */
        nameTag: '[name]',
        /**
         * 打包文件中[id]的标记，当webpack打包时[name]表示当前模块打包之后的webpack生成的对应id。
         * @type {string}
         */
        idTag: '',
        /**
         * 主文件的打包规则，vendor，manifest都是在这里定义
         */
    }
}

const nameSpace = {
    init
}

module.exports = nameSpace
