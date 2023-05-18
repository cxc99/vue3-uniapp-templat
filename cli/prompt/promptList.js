module.exports = [
  {
    type: 'list',
    message: '请选择环境:',
    name: 'nodeEnv',
    choices: ['Development', 'Production'],
    filter(val) {
      return val.toLowerCase()
    }
  }
]
