/**
 * @name    vue-sfc-Handler
 * @author  ReAlign
 * @date    2019-08-07
 */
const fs = require('fs');
const _ = require('./lib/_');
const u = require('./lib/util');

const compiler = require('vue-template-compiler');
const Stringify = require('vue-sfc-descriptor-stringify');
const prettier = require('prettier');
const logger = require('n-s-logs');

const Handler = {};

/**
 * @name    handle      操作函数
 * @param   options     配置
 */
Handler.handle = async (options = {}) => {
    const {
        filePath = '', // 需要操作的文件路径【绝对路径】
        newFilePath = '', // 需要新生成的文件路径【绝对路径】，不传不生成文件
        handleEvt = null, // 自定义操作函数，入参：，需要返回：
        pretty = false, // 是否需要 pretty
        prettierConf = {}, // 配置
        stringifyOptions = {}, // Stringify options
    } = options;
    let fileContent = null;

    // 前置文件检验
    const checkFlag = u.checkBeforeReadFile(options);
    if(!checkFlag) {
        return {
            fileContent,
        };
    }

    // 读文件
    const source = fs.readFileSync(filePath, 'utf8');
    // sfc 对象
    const descriptor = compiler.parseComponent(source) || {};
    // 深拷原始 sfc
    const oriDescriptor = _.cloneDeep(descriptor);
    // 新 sfc 变量
    let newDescriptor = null;

    // 有处理句柄
    if(handleEvt) {
        newDescriptor = await handleEvt(descriptor);
    } else {
        newDescriptor = _.cloneDeep(descriptor);
    }

    // 由 sfc 生成的 string
    fileContent = Stringify(newDescriptor, oriDescriptor, stringifyOptions);

    // 需要格式化
    if(pretty) {
        const _prettierConf = Object.assign({ parser: 'vue' }, prettierConf);
        fileContent = prettier.format(fileContent, _prettierConf);
    }
    // 需要新生成文件
    if(newFilePath) {
        fs.writeFileSync(newFilePath, fileContent, (err) => {
            if(err) {
                logger.error(err);
            }
        });
    }

    // 返回新文件内容
    return {
        fileContent,
    };
};

module.exports = Handler.handle;