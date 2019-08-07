const fs = require('fs');
const path = require('path');
const logger = require('n-s-logs');

const u = {
    isFileType(file = '', type = '') {
        const ext = (path.extname(file) || '').substr(1);

        return ext === type;
    },
    checkBeforeReadFile(options = {}) {
        const {
            filePath = '',
            newFilePath = '',
        } = options;

        let flag = true;

        if(!fs.existsSync(filePath)) {
            logger.error(`filePath does not exist: ${filePath}`);
            flag = false;
        }
        if(!path.isAbsolute(filePath)) {
            logger.error(`filePath is not absolute: ${filePath}`);
            flag = false;
        }
        if(!path.isAbsolute(newFilePath)) {
            logger.error(`newFilePath is not absolute: ${newFilePath}`);
            flag = false;
        }
        if(!u.isFileType(filePath, 'vue')) {
            logger.error(`file is not vue sfc: ${filePath}`);
            flag = false;
        }

        return flag;
    }
};

module.exports = u;