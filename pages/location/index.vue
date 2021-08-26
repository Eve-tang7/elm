<template>
	<div>
		<div class="header">
			<div class="btn">
				<a href="javascript:;">ele.me</a>
			</div>
			<div class="btn" @click="login">
				登录丨注册
			</div>
		</div>
		<div class="content">
			<div class="current-city">
				<div class="current-city-so">
					<span style="font-size: 28rpx">当前定位城市:</span>
					<span style="font-weight: 700;color: #9f9f9f;font-size: 24rpx">定位不准时,请在城市列表中选择</span>
				</div>
				<div class="hr"></div>
				<div class="current-city-son" @click="shanghai">
					<div style="font-size: 34rpx;color: #000;">当前城市</div>
					<span>
						<u-icon name="arrow-right" color="#000" size="28"></u-icon>
					</span>
				</div>
			</div>

			<div class="hr-one"></div>

			<div style="margin: 10rpx;">热门城市</div>


			<div class="hot-city">
				<ul class="hotitem" @click="changeCity(hotItem,$event)" v-for="(hotItem,index) in hotData"
					:key="hotItem.id">
					<li>{{hotItem.name}}</li>
				</ul>
			</div>

			<div class="hr-two"></div>


			<div class="all-city">
				<div class="title" style="margin: 10rpx;">所有城市</div>
				<div class="allitem" v-for="(allItem,index) in allData" :key="index">
					<div class="zimu">{{index}}</div>
					<ul class="allit">
						<li class="item" @click="changeCity(allIt,index)" v-for="(allIt,index) in allItem"
							:key="allIt.id">{{allIt.name}} {{allIt.id}}</li>
					</ul>
					<div class="hr-two"></div>
				</div>
			</div>


		</div>
	</div>

</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				longitude: Number,
				latitude: Number
			}
		},
		computed: {
			...mapState({
				initData: state => state.locationModule.initData,
				hotData: state => state.locationModule.hotData,
				allData: state => state.locationModule.allData,
				currentData: state => state.locationModule.currentData
			}),

		},
		methods: {
			...mapActions('locationModule', ["getHotCity", "getAllCity", "getCurrentCity"]),
			changeCity(it, $event) {
				console.log(it)
				uni.navigateTo({
					url: '/pages/location/loca?id=' + JSON.stringify(it.name)
				})
			},
			// 跳转登录页
			login(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}



		},
		mounted() {
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					this.longitude = res.longitude
					this.latitude = res.latitude
					console.log('赋值' + this.longitude)
				}
			})
			this.getHotCity()
			this.getAllCity()
			this.getCurrentCity(longitude, latitude)


		},

	}
</script>

<style lang="less">
	.hotitem:hover {
		background: #ffffdd;
	}

	.hr-one {
		width: 100%;
		height: 24rpx;
		background-color: #f5f5f5;
		border-top: 5rpx #e4e4e4 solid;
		border-bottom: 5rpx #e4e4e4 solid;
	}

	.hr-two {
		width: 100%;
		height: 24rpx;
		background-color: #f5f5f5;
		border-top: 1rpx #e4e4e4 solid;
		border-bottom: 5rpx #e4e4e4 solid;
	}


	.hr {
		width: 100%;
		height: 1px;
		background-color: #e4e4e4;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		height: 100rpx;
		width: 100%;
		background-color: #3190e8;
		font-size: 30rpx;
		color: #ffffff;

		.btn {
			display: flex;
			margin: 10px;
			background-color: #3190e8;
		}
	}

	.content {
		margin-top: 100rpx;

		.current-city {
			.current-city-so {
				display: flex;
				justify-content: space-between;
				padding: 10px;
				height: 72rpx;
			}

			.current-city-son {
				display: flex;
				justify-content: space-between;
				margin: 10rpx;

			}
		}
	}

	.hot-city {
		display: flex;
		flex-flow: row wrap;

		.hotitem {
			box-sizing: border-box;
			border-top: 1px #e4e4e4 solid;
			border-left: 1px #e4e4e4 solid;
			text-align: center;
			width: 25%;
			font-size: 28rpx;
			line-height: 56px;
			color: #3190e8;
		}
	}

	.all-city {

		.allitem {
			box-sizing: border-box;
			/*border-top: 1px #e4e4e4 solid;*/
			/*border-left: 1px #e4e4e4 solid;*/

			.zimu {
				margin-left: 10rpx;
			}

			.allit {
				display: flex;
				flex-flow: row wrap;
				border-top: 1px #e4e4e4 solid;
			}

			.item {
				width: 25%;
				box-sizing: border-box;
				/*border-top: 1px #e4e4e4 solid;*/
				border-left: 1px #e4e4e4 solid;
				border-bottom: 1px #e4e4e4 solid;
				/*border: 1px #e4e4e4 solid;*/
				text-align: center;
				font-size: 28rpx;
				line-height: 56px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.item:nth-last-child(1) {
				border-right: 1px #e4e4e4 solid;
			}
		}
	}
</style>
