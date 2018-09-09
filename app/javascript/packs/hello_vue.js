/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.
//
// import Vue from 'vue'
// import App from '../app.vue'
//
// document.addEventListener('turbolinks:load', () => {
//   const el = document.body.appendChild(document.createElement('hello'))
//   const app = new Vue({
//     el,
//     render: h => h(App)
//   })
//
//   console.log(app)
// })


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


import Vue from 'vue/dist/vue.esm'
// 表示引用了单文件组件app.vue
import App from '../app.vue'

function destroyVue() {
  this.$destroy()
  // 销魂后，把监听事件去掉，防止冲突。
  document.removeEventListener('turbolinks:before-cache', destroyVue)
}

document.addEventListener('turbolinks:load', () => {
  var element = document.getElementById('hello')
  // 加上判断语法，防止不相关的页面创建Vue app实例不成功后报错。
  if (element != null) {
    var app = new Vue({
      el: '#hello',
      // 代表使用了组件中的模版。
      template: '<App/>',
      // 使用了单文件组件app.vue
      components: { App },
      // 在新的$el创建前，把之前$el的html存在一个临时全局变量中。
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
    })

    console.log(app)
  }
})
//
//
//
// If the using turbolinks, install 'vue-turbolinks':
//
// yarn add 'vue-turbolinks'
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
