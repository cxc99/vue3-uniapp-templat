const path = require('path')
const fse = require('fs-extra')

function readFileSync(file, options) {
  return fse.readFileSync(file, options)
}

function writeFileSync(file, content) {
  /**
   * 写文件
   */
  try {
    fse.ensureFileSync(file)
    fse.writeFileSync(file, content)
  } catch (e) {
    throw new Error(e)
  }
}

function reWriteFile(readPath, writePath) {
  try {
    const content = readFileSync(readPath)
    writeFileSync(writePath, content)
  } catch (err) {
    throw new Error(err)
  }
}

function reWriteDirectory(path, writePath) {
  try {
    fse.removeSync(writePath) // remove src/static

    // check(entrance/static) - 文件结构🙆统一，不存在会自动创建
    fse.ensureDirSync(path)

    fse.copySync(path, writePath, {
      overwrite: true,
    })
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { readFileSync, writeFileSync, reWriteFile, reWriteDirectory }
