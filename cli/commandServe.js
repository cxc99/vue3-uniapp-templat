const path = require('path')
const execa = require('execa')

const inquirer = require('inquirer')
const { config } = require('./read-env')

const { warnningLog, infoLog, errorLog } = require('./console')
const { reWriteFile, reWriteDirectory } = require('./file')
const promptList = require('./prompt/promptList')

function resolve(p) {
  const pathSrc = path.resolve(__dirname, '../src')
  return path.resolve(pathSrc, p)
}

function reWriteIntoFile() {
  /**
   * 编译入口:  ./src [main.ts,manifest.json,pages.json,style.scss,config.ts]
   * 将当前目标模块下相关入口文件进行写入
   */
  const moduleName = process.env.MODULE_NAME

  const fileNameList = ['main.ts', 'manifest.json', 'pages.json', 'config.ts']
  const directoryNameList = ['static']

  // 文件操作
  fileNameList.forEach(name => {
    const origin = resolve(`entrance/${moduleName}/${name}`)
    const target = resolve(name.replace(/\.js$/, '.ts'))
    reWriteFile(origin, target)
  })
  // 文件目录操作
  directoryNameList.forEach(name => {
    reWriteDirectory(resolve(`entrance/${moduleName}/${name}`), resolve(name))
  })
}

async function runScripts(env, isBuild) {
  const execaArg = [
    'uni',
    [isBuild ? 'build' : '', '-p', 'mp-weixin', '--mode', env].filter(Boolean),
    { stdio: 'inherit' },
  ]
  await execa(...execaArg)
}

module.exports = async function (module, isBuild) {
  // set moduelName in process.env
  infoLog(`command option<moduleName> is ${module}`)
  process.env.MODULE_NAME = module

  // replace moduleFile（main.js \ pages.json \ manifest.json）
  reWriteIntoFile()

  // selecting env and platform

  const configMap = await inquirer.prompt(promptList).catch(e => {
    warnningLog(`warnning: ${JSON.stringify(e)}`)
    warnningLog(`warnning: The default setting is production`)
    // set default
    return { nodeEnv: 'production', platform: 'mp-weixin' }
  })

  const { VITE_PROTOCOL, VITE_DOMAIN } = config(
    path.resolve(process.cwd(), `.env.${configMap.nodeEnv}`),
  )
  process.env.VITE_PROTOCOL = VITE_PROTOCOL
  process.env.VITE_DOMAIN = VITE_DOMAIN
  // run serve
  await runScripts(configMap.nodeEnv, isBuild)
}
