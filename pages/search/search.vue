<template>
	<view>
		<view class="u-p-t-30 u-p-l-30 u-p-b-30 u-p-r-30 searchBox">
			<u-search class="search" shape="square" v-model="search" @change="searchInput"
				placeholder="请输入商家或美食名称" search-icon='' :show-action="false"></u-search>
			<button class="searchBtn" @click="submit">提交</button>
		</view>
		<view class="u-p-t-30 u-p-l-30 u-p-b-30" v-show="searchHistory.length > 0 && !showList">
			<text style="font-weight: 700; color: #777;">搜索历史</text>
		</view>
		<!-- 历史记录 -->
		<view class="searchHistory" v-show="searchHistory.length > 0 && !showList">
			<view class="u-body-item u-flex u-row-between u-p-b-20 u-p-t-20 u-p-l-30 u-p-r-30 historyItem"
				v-for="(history,index) in searchHistory" :key="history.id">
				<view class="u-body-item-title u-line-2 historyName" @click="searchByHistory(history.name)">{{history.name}}</view>
				<u-icon name="close" @click="delHistory(index)"></u-icon>
			</view>
			<view class="clearHistory" @click="clearHistory">
				<text>清除搜索历史</text>
			</view>
		</view>
		<!-- 店家列表 -->
		<view v-show="showList && search === lastSearch">
			<view class="u-p-t-30 u-p-l-30 u-p-b-30">
				<text style="font-weight: 700; color: #777;">商家</text>
			</view>
			<view v-for="shop in shopList" :key="shop.id">
				<view class="listBox" @click="toShopInfo(shop.id)">
					<view>
						<image :src="getImgUrl(shop.image_path)" class="shopImg"></image>
					</view>
					<view class="shopMsg">
						<text>{{shop.name}}</text>
						<text>月售{{shop.recent_order_num}}单</text>
						<text>{{shop.float_minimum_order_amount}}元起送 / 距离{{shop.distance}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				showList:false,		// 显示/隐藏商家列表
				search:'',
				lastSearch:'',   //上次搜索，用来判断与这次搜索是否相同
				searchHistory:[],			// 历史记录列表
				latitude:31.016556,
				longitude:121.236466,			//经纬度
			}
		},
		computed:{
			...mapState('searchModule',['shopList']),
		},
		methods:{
			...mapActions('searchModule',['searchShop']),
			...mapMutations('homeModule',['sendShopId']),
			toShopInfo(id) {
				uni.navigateTo({
				    url:`/pages/shopping/shopping`
				}),
				console.log(id)
				this.sendShopId(id)
			},
			// 控制搜索栏输入内容
			searchInput(){
				if(this.search === ''){
					this.showList = false;
				}
			},
			// 通过历史记录搜索商家
			async searchByHistory(name){
				this.search = name;
				await this.submit()
			},
			// 提交
			async submit(){
				// 如果未输入内容则return
				if(this.search === '') return;
				// 初始时将搜索内容赋值给lastSearch
				this.lastSearch = this.search;
				// 显示商家
				this.showList = true;
				const latitude = this.latitude;
				const longitude = this.longitude;
				const search = this.search;
				await this.searchShop({latitude,longitude,search});
				// 新增历史记录
				this.searchHistory.push({
					name:this.search,
					id:this.searchHistory.length
				})
			},
			// 删除一项历史记录
			delHistory(index){
				this.searchHistory.splice(index,1)
			},
			// 清空历史
			clearHistory(){
				this.searchHistory = []
			},
			// 获取图片的网络地址
			getImgUrl(image){
			   return "//elm.cangdu.org/img/"+image;
			},
		}
		
	}
</script>

<style>
	page{
		background-color: #ededed;
	}
	.searchBox{
		display: flex;
		background-color: #fff;
	}
	.search{
		flex: 6;
		line-height: 70rpx;
		border: 1rpx solid #e4e4e4;
		color: #333;
		border-radius: 0.5rpx;
		background-color: #f2f2f2;
		font-weight: 700;
	}
	.searchBtn{
		flex: 1;
		line-height: 70rpx;
		border: 1rpx solid #3190e8;
		margin-left:20rpx;
		color: #fff;
		border-radius: 5rpx;
		background-color: #3190e8;
		font-weight: 700;
		font-size: 35rpx;
	}
	.searchHistory{
		background-color: #fff;
	}
	.historyName{
		width: 100%;
	}
	.historyItem{
		color: #666;
		border-bottom: 1rpx solid #ededed;
	}
	.historyItem view{
		font-size: 33rpx;
	}
	.clearHistory{
		padding: 30rpx 0;
		text-align: center;
		font-weight: 700;
		color: #3190e8;
	}
	
	
	/* 商家列表 */
	.listBox{
		display: flex;
		line-height: 60rpx;
		padding: 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #ededed;
	}
	.shopImg {
		width: 120rpx;
		height: 120rpx;
	}
	.shopMsg{
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
	}
</style>
