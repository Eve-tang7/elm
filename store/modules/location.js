import request from '../../utils/request.js'

 const state = {
 	initData: '初始数据',
 	hotData: [],
	allData:[],
	currentData:{}
 }

 const mutations = {
 	changegetHotCityMutation(state, payload) {
 		state.hotData = payload
 	},
	changegetAllCityMutation(state, payload) {
		state.allData = payload
	},
	changegetCurrentCityMutation(state, payload) {
		state.currentData = payload
	}
 }


 const actions = {
 	async getHotCity(context) {
 		const {data} = await request("/v1/cities?type=hot")
 		context.commit("changegetHotCityMutation", data);
 		//此处的return 是为了让外部组件转发当前action后可以的到请求回来的数据
 		return data;
 	},
	async getAllCity(context) {
		const {data} = await request("/v1/cities?type=group")
		context.commit("changegetAllCityMutation", data);
		
		return data;
	},
	async getCurrentCity(context,[longitude,latitude]) {
		const {data} = await request("/v2/pois/longitude,latitude")
		context.commit("changegetCurrentCityMutation", data);
		return data;
	},
	

 }
 const getters = {}
 export default {
 	namespaced: true,
 	state,
 	mutations,
 	actions,
 	getters
 }
