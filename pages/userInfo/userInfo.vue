<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-t-20 u-p-r-20">
			<view class="u-flex-1">
				<text>头像</text>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-avatar :src="pic" size="120"></u-avatar>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view>
			<u-cell-group>
				<u-cell-item title="用户名">{{userName}}</u-cell-item>
			</u-cell-group>
		</view>
		<view>
			<u-cell-group>
				<u-cell-item title="收货地址">{{address}}</u-cell-item>
			</u-cell-group>
		</view>
		<view class=" u-p-t-20">
			<text class="u-p-l-30 countBind">账号绑定</text>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="phone" title="手机"></u-cell-item>
			</u-cell-group>
		</view>
		<view class=" u-p-t-20">
			<text class="u-p-l-30 countBind">安全设置</text>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="登录密码">修改</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-p-l-30 u-p-r-30 u-m-t-40">
			<u-button type="error" @click="logout">退出登录</u-button>
		</view>
		<!-- 退出登录按钮确认项 -->
		<template>
			<u-action-sheet :list="list" @click="confirmLogout" v-model="showComfirm"></u-action-sheet>
		</template>
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				userName:'',
				address:'',
				pic:this.getImgUrl('default.jpg'),
				show:true,
				
				list: [{
						text: '退出登录',
						color: 'red',
						fontSize: 28
					}],
				showComfirm:false	// 退出确认弹窗 默认为false
				
				
			}
		},
		computed:{
			user_id(){
				return uni.getStorageSync('user_id')
			},
		},
		async onShow () {
			// 用user_id获取用户信息
			const userInfo = await this.getUserInfo(this.user_id);
			this.userName = userInfo.username;
			this.pic = this.getImgUrl(userInfo.avatar)
		
		},
		methods: {
			...mapActions('loginModule',['getUserInfo']),
			logout(){
				this.showComfirm = true
			},
			confirmLogout(index){
				if(index === 0){
					// 移除user_id 跳转到未登录的个人中心页
					uni.removeStorage({
					    key: 'user_id',
					    success: function (res) {
					        uni.switchTab({
					        	url: '/pages/center/center'
					        })
					    }
					});
				}
			},
			// 获取图片的网络地址
			getImgUrl(image){
			   return "//elm.cangdu.org/img/"+image;
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.user-box{
	margin-top: 20rpx;
	background-color: #fff;
}
.countBind{
	color: #888;
}
</style>
