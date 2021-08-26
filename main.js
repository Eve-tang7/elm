import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import 'weapp-cookie'	// 引入weapp-cookie
Vue.config.productionTip = false


// 引入uView
import uView from "uview-ui";
Vue.use(uView);


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
