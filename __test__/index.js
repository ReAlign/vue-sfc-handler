const path = require('path');

const Handler = require('./../src/index');
const ROOT = `${__dirname}`;

Handler({
    filePath: path.join(ROOT, 'tpl', 'multiple-styles.vue'),
    newFilePath: path.join(ROOT, 'tpl', 'multiple-styles_new.vue'),
    handleEvt: (descriptor = {}) => {
        descriptor.styles.forEach(item => {
            if (!item.attrs) {
                item.attrs = {};
            }

            item.attrs.lang = 'scss';
        });

        return descriptor;
    }
})
// .then(res => {
//     console.log(res);
// })
;
