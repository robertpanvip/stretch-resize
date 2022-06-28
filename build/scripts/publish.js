const gulp = require('gulp');
const logger = require('gulp-logger');
/**需要package的version 版本号、description 版本描述 **/
const pkg = require('../../package.json');
const chalk = require('chalk'); // 改变屏幕文字颜色
const fs = require('fs')
const {fetchUrl: fetch} = require("fetch");
const log = content => console.log(chalk.green(content));

const {deleteFolder, runTask, runCmd} = require("./util");

const config = {
    baseDir: `../../../${pkg.name}-npm`
};

const autoUpgrade = (str) => {
    let arr = str.split('.').map(it => Number(it));
    const autoUpgradeVersion = (arr, index) => {
        if (index === 0) {
            arr[0] = arr[0] + 1;
        } else {
            let value = arr[index] + 1;
            if (value < 30) {
                arr[index] = value;
            } else {
                arr[index] = 0;
                autoUpgradeVersion(arr, index - 1);
            }
        }
    }
    autoUpgradeVersion(arr, arr.length - 1);
    return arr.map(it => Number(it)).join('.');
}

//cwd
module.exports = async function () {
    gulp.task('clean', async (cb) => {
        log(`清除${config.baseDir}开始`)
        await deleteFolder(config.baseDir);
        setTimeout(() => {
            log(`清除${config.baseDir}完成`)
            cb();
        }, 2000)
    });
    gulp.task('del-dist', async (cb) => {
        log(`删除 ${config.baseDir}/dist 开始`)
        await deleteFolder(`${config.baseDir}/dist`);
        log(`删除 ${config.baseDir}/dist 结束`)

        log(`删除 ${config.baseDir}/lib 开始`)
        await deleteFolder(`${config.baseDir}/lib`);
        log(`删除 ${config.baseDir}/lib 结束`)

        log(`删除 ${config.baseDir}/es 开始`)
        await deleteFolder(`${config.baseDir}/es`);
        log(`删除 ${config.baseDir}/es 结束`)
        cb();
    });
    gulp.task('copy-info', async () => {
        log(`生成 package 开始`)
        const json = require('../../package.json');
        const res = await new Promise((resolve, reject) => {
            fetch('https://www.unpkg.com/stretch-resize@latest',(error, meta)=>{
                if(!error){
                    resolve({url:meta.finalUrl})
                }else{
                    log(`获取版本号失败`)
                    reject(error)
                }
            })
        })
        const matches = res.url.match(/@([0-9]*\.[0-9]*\.[0-9])*/)
        res.version = matches[1]
        json.version = autoUpgrade(json.version)
        delete json.devDependencies;
        delete json.scripts;
        let jsonStr = JSON.stringify(json, "", "\t")
        const ex = fs.existsSync(`${config.baseDir}/`)
        if (!ex) {
            fs.mkdirSync(`${config.baseDir}/`)
        }
        fs.writeFileSync(`${config.baseDir}/package.json`, jsonStr)
        log(`生成 package完成`)
        log(`拷贝 README 开始`)
        return gulp.src(['../../README.md'])
            .pipe(logger({
                before: 'copy package.json...',
                after: 'copy package.json complete!',
                showChange: false
            }))
            .pipe(gulp.dest(`${config.baseDir}/`));
    });

    gulp.task('copy-dist', () => {
        log(`拷贝 '../../dist/**' 开始`)
        return gulp.src(['../../dist/**'])
            .pipe(logger({
                before: 'copy dist...',
                after: 'copy dist complete!',
                showChange: false
            }))
            .pipe(gulp.dest(`${config.baseDir}/dist`));
    });
    gulp.task('copy-lib', () => {
        return gulp.src('../../lib/**')
            .pipe(logger({
                before: 'copy lib...',
                after: 'copy lib complete!',
                showChange: false
            }))
            .pipe(gulp.dest(`${config.baseDir}/lib`));
    });
    gulp.task('copy-es', () => {
        return gulp.src('../../es/**')
            .pipe(logger({
                before: 'copy es...',
                after: 'copy es complete!',
                showChange: false
            }))
            .pipe(gulp.dest(`${config.baseDir}/es`));
    });

    gulp.task('npm-publish', function (cb) {
        log('npm publish--');
        runCmd(`cd ${config.baseDir} & npm publish`, cb);
    });

    gulp.task(
        'publish',
        gulp.series('clean', 'del-dist', 'copy-info', 'copy-dist', 'copy-es', 'copy-lib', 'npm-publish')
    );

    runTask('publish')
};
