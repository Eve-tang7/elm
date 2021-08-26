<template>
	<view>
		<view>
			<input class="u-border-bottom" type="number" v-model="tel" placeholder="账号" />
		</view>
		<view>
			<input class="u-border-bottom" type="password" v-model="password" placeholder="密码" />
		</view>
		<view class="checkMsg">
			<input class="u-border-bottom" type="number" v-model="check" placeholder="验证码" />
			<view class="checkPart">
				<image :src="checkSrc" mode="" class="checkImg" style="width: 200rpx;height:80rpx;margin-top: 20rpx;"></image>
				<view class="changeCheck">
					<text>看不清</text>
					<text class="nextCheck" @click="changeCheck">换一张</text>
				</view>
			</view>
		</view>
		<view class="loginTip">
			<text>温馨提示：未注册过的账号，登录时将自动注册</text>
			<text>注册过的用户可凭账号密码登录</text>
		</view>
		<view class="loginBtn">
			<u-button type="success" @click="userLogin">登录</u-button>
		</view>
		<view class="resetPassword">
			<text>重置密码？</text>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		data(){
			return {
				tel:'',
				password:'',
				check:'',
			}
		},
		computed:{
			...mapState('loginModule',['checkSrc','user_id'])
		},
		methods:{
			...mapActions('loginModule',['getCheckSrc','login']),
			// 获取验证码
			changeCheck(){
				this.getCheckSrc()
			},
			// 用户登录
			async userLogin(){
				await this.login({
					username:this.tel,
					password:this.password,
					captcha_code:this.check
				});
				if(this.user_id){
					// 显示登录成功并跳转
					this.showToast()
					uni.switchTab({
					    url: '../center/center'
					});
				}
			},
			showToast() {
				// 登录成功
				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success',
					isTab: true
				})
			}
		},
		mounted() {
			this.getCheckSrc()
		}
	}
</script>

<style scoped lang="less">
	.u-border-bottom{
		height: 100rpx;
		padding-left: 30rpx;
	}
	.checkMsg{
		display: flex;
		justify-content: space-between;
		.checkPart{
			display: flex;
			justify-content: space-between;
			.checkImg{
				margin-right: 10rpx;
			}
		}
	}
	.u-border-bottom{
		flex: 1;
	}
	.changeCheck{
		display: flex;
		flex-direction: column;
		margin-right: 20rpx;
		.nextCheck{
			color: #3190e8;
			margin-top: 20rpx;
		}
	}
	
	.loginTip{
		color: red;
		text{
			display: block;
			padding: 20rpx 30rpx;
		}
	}
	.loginBtn{
		padding: 0 30rpx;
	}
	.resetPassword{
		color: #3190e8;
		position: relative;
		text{
			position: absolute;
			top:40rpx;
			right: 30rpx;
		}
	}
</style>
