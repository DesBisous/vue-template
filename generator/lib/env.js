const { execSync } = require('child_process'); // 子进程

exports.hasYarn = () => {
  try {
    // 开启子进程检查 yarn 版本，以此判断 yarn 是否存在，ignore 不进行输出，可设置为 inherit 输出
    execSync('yarn --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}