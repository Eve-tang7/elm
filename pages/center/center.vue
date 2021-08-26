<template>
	<view class="center">
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 loginTop" @click="LoginOrUserInfo">
			<view class="u-m-r-10 txPic">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20" style="color: #fff;">{{userName}}</view>
				<view class="u-font-14 u-tips-color" style="color: #fff;">
					<u-icon name="error-circle" style="margin-right: 10rpx;"></u-icon>
					<span>暂无绑定手机号</span>
				</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#fff" size="28"></u-icon>
			</view>
		</view>
		
		<u-grid :col="3">
				<u-grid-item>
					<view class="grid-text">
						<span class="price">0.00</span>元
					</view>
					<view class="grid-text">我的余额</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-text">
						<span class="prefer">{{gift_amount}}</span>个
					</view>
					<view class="grid-text">我的优惠</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-text">
						<span class="integral">0</span>分
					</view>
					<view class="grid-text">我的积分</view>
				</u-grid-item>
			</u-grid>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="order" title="我的订单"></u-cell-item>
				<u-cell-item icon="bag-fill" title="积分商城"></u-cell-item>
				<u-cell-item icon="integral-fill" title="饿了么会员卡"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="grid-fill" title="服务中心"></u-cell-item>
				<u-cell-item icon="IE-circle-fill" title="下载饿了么APP"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				pic:this.getImgUrl('default.jpg'),
				show:true,
				userName:'登录/注册',
				user_id:'',
				gift_amount:0
			}
		},
		async onShow () {
			// 获取本地的user_id 如果有则渲染 没有则显示未登录
			this.user_id = uni.getStorageSync('user_id')
			// 已登录，有user_id则获取用户信息
			if(this.user_id){
				const userInfo = await this.getUserInfo(this.user_id);
				console.log(userInfo)
				this.userName = userInfo.username;
				this.pic = this.getImgUrl(userInfo.avatar)
				this.gift_amount = userInfo.gift_amount
			}else{
				this.userName = '登录/注册';
				this.pic = this.getImgUrl('default.jpg');
				this.gift_amount = 0
			}
		},
		methods: {
			...mapActions('loginModule',['getUserInfo']),
			// 跳转到登录/登出页面
			LoginOrUserInfo(){
				// 有user_id则跳转到用户信息，没有则跳转到登录页
				if(this.user_id){
					uni.navigateTo({
					  url: '../userInfo/userInfo',
					})
				}else{
					uni.navigateTo({
					  url: '../login/login',
					})
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
	/* 顶部头像栏 */
	.center .loginTop{
		padding-top: 30rpx;
		background-color: #3190e8;
	}
	.txPic{
		padding-right: 30rpx;
	}
	/* 价格 */
	.price{
		font-size: 60rpx;
		font-weight: bold;
		color: #f90;
	}
	/* 优惠 */
	.prefer{
		font-size: 60rpx;
		font-weight: bold;
		color: #ff5f3e;
	}
	/* 积分 */
	.integral{
		font-size: 60rpx;
		font-weight: bold;
		color: #6ac20b;
	}
	.user-box{
		background-color: #fff;
	}
	/* 宫格布局 */
	.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}
</style>
