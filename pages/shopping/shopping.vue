<template>
	<view class="u-wrap">
		<u-tabs :list="list" :is-scroll="false" :current="tabCurrent" @change="change"></u-tabs>
		<view class="u-menu-wrap" v-show="tabCurrent==0">
			<!-- 侧边栏滚动 -->
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" 
			:scroll-top="scrollTop" :scroll-into-view="itemId">
				<view v-for="(item,index) in foodList" :key="index" class="u-tab-item" 
				:class="[current == index ? 'u-tab-item-active' : '']"
				 @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<!-- 主页的菜单 -->
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item,index) in foodList" :key="index">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
								<view style="width: 120rpx;">
									<image class="item-menu-image" :src="getImgUrl(item1.image_path)" mode=""></image>
								</view>
								<view style="margin: 20rpx;">
									<view class="item-menu-name" style="font-size: 30rpx;">{{item1.name}}</view>
									<text>{{item1.tips}}</text>
								</view>
							
								<view>
									<view v-if="item1.specfoods.length>1">
										<u-button type="primary" size="mini" @click="chooseType(index1)">选规格</u-button>
									</view>
									<view v-else> 
										<u-icon name="plus-circle-fill" :size="50" color="#3190e8" @click="addGoods"></u-icon>
									</view>
								</view>
								
								<template>
									<u-popup v-model="show" mode="center" :mask="false">
										<view>
											<view v-for="(item2,index2) in item.foods[typeIndex].specfoods" :key="index2">
												<text>{{item2.specs_name}}</text>
											</view>
										</view>
									</u-popup>
								</template>
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 评论列表 -->
		<view v-show="tabCurrent===1">
			<!-- <view>
				<view v-for="(score,index) in shopScore" :key="index">
					{{score.compare_rating}}
				</view>
			</view> -->
			<view>
				<view class="comment" v-for="(res, index) in commentList" :key="res._id">
					<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
					<view class="right">
						<view class="top">
							<view class="name">{{ res.username }}</view>
							<view style="font-size: 20rpx;">{{res.rated_at}}</view>
						</view>
						<view v-for="(res2,index2) in res.item_ratings" :key="index2">
							<view class="content">{{ res.rating_text }}</view>
							<text style="margin: 10rpx;font-size: 10rpx;">{{res2.food_name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="navigation" v-show="tabCurrent==0">
			<view class="left">
				<view class="item car">
					<view>
						<u-icon name="shopping-cart" :size="80" :color="$u.color['contentColor']"></u-icon>
					</view>
					<view style="margin-left: 40rpx;">
						<view>
							¥ 999
						</view>
						<view>
							配送费  ¥5
						</view>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="buy btn u-line-1" style="margin-right: 20rpx;">结算</view>
			</view>
		</view>
	
		
	</view>
</template>
<script>
	import classifyData from '@/common/classify.data.js';
	import {mapState,mapActions} from 'vuex';
	export default {
		data() {
			return {
				show:false,
				list: [{name: '商品'},{name: '评价'}],
				tabCurrent:0,
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器
				
				typeIndex:0,
			}
		},
		async onLoad() {
			await this.getCustomAction(this.shopId)
			await this.getFoodListAction(this.shopId)
			await this.getCommenListAction(this.shopId)
			await this.getShopScoreAction(this.shopId)
			// 更改头部标题为当前商家名
			wx.setNavigationBarTitle({
				title:this.customData.name
			})
		},
		onReady() {
			this.getMenuItemTop()
		},
		computed:{
			...mapState('shoppingModule',['customData','foodList','commentList','shopScore']),
			...mapState('homeModule',['shopId'])
		},
		methods: {
			...mapActions('shoppingModule',['getCustomAction','getFoodListAction','getCommenListAction','getShopScoreAction']),
			// 获取图片的网络地址
			getImgUrl(image){
				if(image.indexOf('elm') != -1){
					return image
				}
			   return "//elm.cangdu.org/img/"+image;
			},
			change(index){
				this.tabCurrent=index
			},
			chooseType(index){
				this.show = true
				this.typeindex = index
			},
			addGoods(){
				console.log('good+1')
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function(){
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if(!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return ;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if(this.timer) return ;
				if(!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return ;
						}
					}
				}, 10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fixed{
		width: 100%;
		background-color: #3190e8;
		text-align: center;
	}
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item:last-child {
		min-height: 100vh;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
	}

	.thumb-box {
		display: flex;
		align-items: center;
		width: 100%;
		height: 200rpx;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #F1F1F1;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
	
	.navigation {
		display: flex;
		justify-content: space-between;
		border: solid 2rpx #f2f2f2;
		background-color: #F1F1F1;
		padding: 16rpx 0;
		.left {
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 30rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.car{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
			.cart {
				background-color: #3190e8;
				margin-right: 30rpx;
			}
			.buy {
				background-color: #3190e8;
			}
		}
	}
	
	.comment {
		display: flex;
		padding: 30rpx;
		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.name {
					color: #5677fc;
				}
				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;
					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}
				.highlight {
					color: #5677fc;
					.num {
						color: #5677fc;
					}
				}
			}
			.content {
				margin-bottom: 10rpx;
			}
			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;
				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;
					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;
					.more {
						margin-left: 6rpx;
					}
				}
			}
			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
