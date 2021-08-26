import Vue from 'vue'
import Vuex from 'vuex'
import searchModule from './modules/search.js'
import loginModule from './modules/login.js'
import homeModule from './modules/home.js'
import shoppingModule from './modules/shopping.js'
import locationModule from './modules/location.js'
import orderModule from './modules/order'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		searchModule,
		loginModule,
		homeModule,
		shoppingModule,
		locationModule,
		orderModule
	}
})
