import C from '../Extend/Component.js'

const baseCom = new C()
baseCom.behaviors = [
   require('../Behaviors/CommonBehavior.js')
]

module.exports = baseCom.create.bind(baseCom)