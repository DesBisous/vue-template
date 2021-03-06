exports.request = {
  get (url, opts) {
    // lazy require
    const fetch = require('./fetch')
    const reqOpts = {
      method: 'GET',
      timeout: 30000,
      ...opts
    }

    return fetch(url, reqOpts).then(result => result.json())
  }
}
