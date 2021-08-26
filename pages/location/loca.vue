<template>
	<div style="background-color: #f5f5f5;">
		<div class="header">
			<u-icon class="ui" name="arrow-left" color="#fff" size="40"></u-icon>
			<div class="currloca">{{city}}</div>
			<div @click="changecity" style="color: #fff;">切换城市</div>
		</div>
		<div class="gray"></div>
		<div class="content">
			<input type="text" placeholder="输入学校,商务楼,地址">
			<button>提交</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "loca",
		data() {
			return {
				city: String
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			this.city = JSON.parse(JSON.stringify(option.id))
			// console.log(option.name); //打印出上个页面传递的参数。
		},
		methods: {
			changecity() {
				uni.navigateTo({
					url: '/pages/location/index'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		height: 100rpx;
		width: 100%;
		padding: 14rpx;
		background-color: #3190e8;
		// background-color: #ff0000;

		.currloca {
			padding-left: 60rpx;
			margin: 10rpx;
			font-size: 40rpx;
			font-weight: bolder;
			color: #fff;
		}

	}

	.gray {
		width: 100%;
		height: 24rpx;
		background-color: #f5f5f5;
		border-top: 1rpx #e4e4e4 solid;
		border-bottom: 5rpx #e4e4e4 solid;
		margin-top: 100rpx;
	}

	.content {
		height: 220rpx;
		width: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;

		input {
			margin: 24rpx;
			padding-left: 12rpx;
			height: 70rpx;
			border-radius: 8rpx;
			border: 3rpx #e4e4e4 solid;
		}

		button {
			margin: 24rpx;
			margin-top: 0;
			height: 70rpx;
			border-radius: 8rpx;
			background-color: #3190e8;
			color: #fff;
			font-size: 36rpx;
			line-height: 70rpx;
		}
	}
</style>
