/**
 * Component扩展
 */
class C {
   // 全局Behaviors
   behaviors = []

   //组件指定了behavior则合并全局behavior与组件的behavior
   // 合并顺序为全局的在前，组件的在后，以遵循小程序Behavior属性和数据及方法合并规则
   // 
   // 组件未指定behavior时则加上全局behavior
   create(option) {
      option.behaviors = option.behaviors ? [...this.behaviors, ...option.behaviors] : [...this.behaviors]

      return Component(option)
   }
}

module.exports = C