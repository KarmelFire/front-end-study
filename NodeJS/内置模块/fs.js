const fs = require('fs')
// 异步读取文件
fs.readFile('D:\\Study\\front-end-study\\NodeJS\\内置模块\\test.txt',
    'utf-8',
    (err, data) => {
        console.log('文件内容是:', data)
    }
)

// 同步写入文件
// try {
//     let content = '新的文件内容'
//     fs.writeFileSync {
//         'D:/Study/front-end-study/NodeJS/内置模块/test.txt',
//         content
//     }
// } catch (err) {
//     console.error(err)
// }

// 检查文件状态
// try {
//     let status = fs.statSync{
//         'D:\Study\front-end-study\NodeJS\内置模块\test.txt'
//     }
//     console.log(status.isFile())
//     console.log(status.isDirector())
//     console.log(status.size())
// } catch (err) {
//     console.error(err)
// }