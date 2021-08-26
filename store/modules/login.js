import request from '../../utils/request.js';

export default {
	namespaced:true,
	state:{
		checkSrc:'',
		user_id:''		//用户id
	},
	mutations:{
		setCheckSrc(state,data){
			state.checkSrc = data.code
		},
		// 登录获取用户信息
		login(state,user_id){
			state.user_id = user_id;
		}
	},
	actions:{
		// 获取验证码
		async getCheckSrc(store){
			const {data} = await request('/v1/captchas',{},'POST')
			store.commit('setCheckSrc',data)
		},
		// 登录
		async login(store,loginObj){
			const {statusCode,data} = await request('/v2/login',loginObj,'POST')
			if(statusCode === 200){
				store.commit('login',data.user_id)
				uni.setStorageSync('user_id', data.user_id);
			}
		},
		// 根据user_id获取用户信息
		async getUserInfo(store,id){
			const {data} = await request('/v1/user',{user_id:id})
			return data
		}
	}
}
