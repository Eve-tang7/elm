import request from '../../utils/request.js'
export default {
	namespaced:true,
	state:{
		shopList:[]
	},
	mutations:{
		searchShop(state,data){
			state.shopList = data
		}
	},
	actions:{
		// 搜索商家
		async searchShop({commit},{latitude,longitude,search}){
			const {statusCode, data} = await request(`/v4/restaurants?geohash=${latitude},${longitude}&keyword=${search}`)
			if(statusCode === 200){
				commit('searchShop',data)
			}
			
		}
	}
}