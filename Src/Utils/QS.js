import { stringify as sf } from 'qs';

const defaults = {
   addQueryPrefix: true // path前缀
}

const stringify = (object, options) => {
   return sf(object,{
      ...defaults,
      ...options
   })
}

module.exports = {
   stringify
}
