import qs from 'qs';

const defaults = {
   addQueryPrefix: true // path前缀
}

const stringify = (object, options) => {
   return qs.stringify(object,{
      ...defaults,
      ...options
   })
}

module.exports = {
   stringify,
   parse: qs.parse
}
