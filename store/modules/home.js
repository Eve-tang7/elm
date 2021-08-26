import request from '../../utils/request.js'
import index from "vuex";
export default {
	namespaced:true,
	state:{
		foodList:[], // 食品分类列表
		storeList:[], // 商铺列表
		shopId:''
	},
	mutations:{
		getFoodList(state,FoodList) {
			state.foodList = FoodList
		},
		getStoreList(state,storeList) {
			state.storeList = storeList
		},
		sendShopId(state,data){
			state.shopId = data
		}
	},
	actions:{
		async getFoodList(store) {
			const {data:FoodList} = await request('/v2/index_entry')
			store.commit('getFoodList',FoodList)
			return FoodList
		},
		async getStoreList(store) {
			const {data:storeList} = await request('/shopping/restaurants?latitude=31.22967&longitude=121.4762')
			store.commit('getStoreList',storeList)
			return storeList
		}
	},
}
