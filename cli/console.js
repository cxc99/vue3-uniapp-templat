const chalk = require('chalk')

const log = console.log
const warnningLog = val => log(chalk.yellow(val))
const successLog = val => log(chalk.green(val))
const errorLog = val => log(chalk.red(val))
const infoLog = val => log(chalk.blue(val))

module.exports = {log, warnningLog, infoLog, successLog, errorLog}
