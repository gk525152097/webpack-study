// 创建vue根实例 
import Vue from 'vue'

// 导入vue组件
import App from './App.vue'

import '../assets/styles/global.styl'

// 创建vue根实例
new Vue({
    el: '#app',
    components: {
        // 组件名称 组件对象
        App: App
    },
    template: '<App/>'
})

// 挂载vue组件

