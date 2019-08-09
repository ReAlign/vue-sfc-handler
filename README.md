# vue-sfc-handler

> Handle vue-sfc, add/edit/delete attrs, prettier, etc.<br>
> 操作 vue-sfc 文件，添加/编辑/删除 属性，格式化文件，等。

## Scene

需要操作 `vue` 文件，进行 `属性` 或者 `内容` 的更改，类似 `babel`。

## Usage

### Install

```bash
# install
$ npm i vue-sfc-handler -D
```

### Call

```js
const Handler = require('vue-sfc-handler');

Handler({
    filePath = '', // 需要操作的文件路径【绝对路径】
    newFilePath = '', // 需要新生成的文件路径【绝对路径】，不传此值，不生成文件
    handleEvt, // 自定义操作函数，入参：，需要返回：
    pretty = false, // 是否需要 pretty
    prettierConf = {}, // 配置
    stringifyOptions = {}, // Stringify options，具体参见：https://github.com/ReAlign/vue-sfc-descriptor-stringify#call options
})
    .then(res => {
        /**
         * res
         *  fileContent: String | null, // 处理后的文件内容
         */
        console.log(res);
    });

const handleEvt = (descriptor = {}) => {
    // todo descriptor

    return descriptor;
};
```
