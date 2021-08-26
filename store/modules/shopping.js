import request from '../../utils/request.js'
const state = {
		customData:{},
		foodList:[],
		commentList:[],
		shopScore:[]
}
const mutations = {
		getCustom(state,data){
			state.customData = data
		},
		getFoodList(state,data){
			state.foodList = data
		},
		getCommenList(state,data){
			state.commentList = data
		},
		getShopScore(state,data){
			state.shopScore = data
		}
}
const actions = {
	async getCustomAction({commit},shopid){
		let {data} = await request(`/shopping/restaurant/${shopid}`)
		commit('getCustom',data)
	},
	async getFoodListAction({commit},shopid){
		let {data} = await request(`/shopping/v2/menu?restaurant_id=${shopid}`)
		commit('getFoodList',data)
	},
	async getCommenListAction({commit},shopid){
		//https://elm.cangdu.org/ugc/v2/restaurants/undefined/ratings?0&10
		//https://elm.cangdu.org/ugc/v2/restaurants/1/ratings?offset=0&limit=10
		let {data} = await request(`/ugc/v2/restaurants/${shopid}/ratings?offset=0&limit=10`)
		commit('getCommenList',data)
	},
	//https://elm.cangdu.org/ugc/v2/restaurants/:restaurant_id/ratings/scores
	async getShopScoreAction({commit},shopid){
		let {data} = await request(`/ugc/v2/restaurants/${shopid}/ratings/scores`)
		commit('getShopScore',data)
	}
}
const getters = {
	
}
export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}