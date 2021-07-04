const { hasYarn } = require('./env');
const { request } = require('./request');
const { execSync } = require('child_process');

/**
 * 异步任务捕获异常
 */
function tryCatch(promise) {
  return promise
    .then(res => {
      return [null, res];
    })
    .catch(err => [err]);
}

async function getRegistry (pkg) {
  let bin = pkg || 'npm';
  if (!pkg && hasYarn()) {
    bin = 'yarn';
  }
  const registry = execSync(`${bin} config get registry`, {
      stdio: ['pipe', 'pipe', 'ignore']
  }).toString().replace(/\s/g, '');
  return registry;
}

async function getMetadata(packageName) {
  let registry = await getRegistry();
  let url = `${registry.replace(/\/$/g, '')}/${packageName}`;
  const headers = {
    Accept: 'application/vnd.npm.install-v1+json;q=1.0, application/json;q=0.9, */*;q=0.8'
  }
  let [err, metadata] = await tryCatch(request.get(url, { headers }));
  // 再次获取
  if (err || metadata.error === 'Not found') {
    registry = await getRegistry('npm');
    url = `${registry.replace(/\/$/g, '')}/${packageName}`;
    [err, metadata] = await tryCatch(request.get(url, { headers }));
  }
  if (metadata) {
    return metadata;
  } else {
    console.log('🗃  Error:', err);
  }
  return null;
}



async function getRemoteVersion (packageName, versionRange = 'latest', defalutVersion = '') {
  const metadata = await getMetadata(packageName);
  // 找不到使用默认的
  if (!metadata) return defalutVersion;
  // 查找 dist-tags 字段中是否存在 versionRange
  if (Object.keys(metadata['dist-tags']).includes(versionRange)) {
    return metadata['dist-tags'][versionRange];
  }
  // 获取版本列表
  let versions = Array.isArray(metadata.versions) ? metadata.versions : Object.keys(metadata.versions)
  versions = versions.filter(version => !version.includes('alpha') || !version.includes('beta'));
  // 返回列表中满足范围的最高版本
  return versions[versions.length - 1];
}

module.exports = {
  getRemoteVersion,
  getMetadata,
  getRegistry,
}