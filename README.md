# Vue.js和Turbolinks一起使用是如何做到的（原理解析）


原理：
加上钩子beforeMount方法：
beforeMount: function() {
  this.$originalElement = this.$el.outerHTML
  // 如果从一个页面导航到另一个页面，销毁原来的Vue实例
  document.addEventListener('turbolinks:before-cache', destroyVue.bind(this))
},
destroyed: function() {
  // 在view app实例销毁后，$el是空的，把之前的临时变量储存的html给它。
  // 然后turbolinks就可以缓存它了。
  this.$el.outerHTML = this.$originalElement
}
