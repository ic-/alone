/**
 * auther: ke_xx
 * https://eslint.org/
 */
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    // "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "arrowFunctions": true,
            "classes": true,
            "modules": true,
            "defaultParams": true
        },
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": 'off',
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-floating-decimal": "off", //禁止数字字面量中使用前导和末尾小数点
        "no-param-reassign": "off",  //禁止对 function 的参数进行重新赋值
        "no-return-assign": "off",  //禁止在 return 语句中使用赋值语句
        "radix": "off",  //强制在parseInt()使用基数参数
        "comma-dangle": "off", //当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
        "no-debugger": "warn",  //禁用 debugger
        "no-unexpected-multiline": "off", //禁止出现令人困惑的多行表达式
        "valid-typeof": "off", //强制 typeof 表达式与有效的字符串进行比较
        "no-tabs": "off",
    }
};

// https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
// http://eslint.cn/docs/rules/

