/**
 * Component扩展
 */
class C {
   // 全局Behaviors
   behaviors = []

   create(options) {
      // 指定组件的纯数据字段的正则表达式
      options.options.pureDataPattern = options.options.pureDataPattern ? options.options.pureDataPattern : /^_/ // 指定所有 _ 开头的数据字段为纯数据字段

      // 组件指定了behavior则合并全局behavior与组件的behavior
      // 合并顺序为全局的在前，组件的在后，以遵循小程序Behavior属性和数据及方法合并规则
      // 组件未指定behavior时则加上全局behavior
      options.behaviors = options.behaviors ? [...this.behaviors, ...options.behaviors] : [...this.behaviors]

      return Component(options)
   }
}

module.exports = C