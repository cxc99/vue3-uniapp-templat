const path = require('path')

const { Command } = require('commander')
const program = new Command()
const commandServe = require('./commandServe')


const { version } = require('../package.json')


program.version(version, '-v, --version', 'display current version')


program
  .command('serve <moduleName>')
  .description('Start the service')
  .action(moduleName => {
    commandServe(moduleName)
  })



program.parse(process.argv)
