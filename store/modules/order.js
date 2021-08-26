import request from '../../utils/request.js'
import index from "vuex";
export default {
    namespaced:true,
    state:{
        orderList:[], // 订单列表
    },
    getters:{

    },
    mutations:{
        getOrderList(state,orderList) {
            state.orderList = orderList
        }
    },
    actions: {
        async getOrderList(store) {
            const {data} = await request('/bos/orders')
            store.commit('getOrderList', data)
            return data
        },
    }
}
