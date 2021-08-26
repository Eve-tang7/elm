<template>
    <view class="content">
        <view class="container">
            <u-sticky>
                <!-- 只能有一个根元素 -->
                <view class="sticky navBar">
                    <u-icon name="search" size="38"></u-icon>
                    <span class="addressBar">纸上得来终觉浅，绝知此事要躬行</span>
                    <u-icon name="account" size="38"></u-icon>
                </view>
            </u-sticky>
        </view>
        <!-- <u-card :foot-border-top="true" :head-border-bottom="false" margin="0 0 20rpx 0" padding="0"> -->
        <swiper :indicator-dots="true" :duration="600" slot="body">
            <swiper-item>
                <view class="swiper-item">
                    <u-grid :col="col">

                            <u-grid-item  v-for="food in firstFoodList"  :key="food.id">
								<view>
									<image :src="getFoodImg(food.image_url)" style="width: 80rpx;height: 80rpx;"></image>
								</view>
                                <view class="grid-text">{{food.title}}</view>
                            </u-grid-item>

                    </u-grid>
                </view>
            </swiper-item>
            <swiper-item>
                <view class="swiper-item">
                    <u-grid :col="col">

                            <u-grid-item  v-for="food in secondFoodList"  :key="food.id">
								<view>
									<image :src="getFoodImg(food.image_url)" style="width: 80rpx;height: 80rpx;"></image>
								</view>
                                <view class="grid-text">{{food.title}}</view>
                            </u-grid-item>

                    </u-grid>
                </view>
            </swiper-item>
        </swiper>
        <!-- </u-card> -->
        <u-gap height="25" bg-color="#F5F5F5"></u-gap>

        <div class="merList">
            <div>
                <u-icon name="car" style="margin-right:12rpx">
                </u-icon>
                <span>附近商家</span>
            </div>
            <div>
                <div v-for="store in storeList" :key="store.id">
                    <u-card :title="title" :margin="0" :border="false" :padding="0" :border-radius="0">
                        <view slot="body">
                            <view>
                                <view class="shopList" @click="toShopInfo(store.id)">
                                    <image class="shopImg" :src="getImgUrl(store.image_path)"></image>
                                    <view class="shopDetail">
                                        <text class="shopName">{{store.name}}</text>
                                        <text class="shopMark">月售666单</text>
                                        <text class="shopPei">{{store.piecewise_agent_fee.tips}}</text>
                                    </view>
                                    <view class="shopYou">
                                        <text class="baoSo">保准时</text>
                                        <text class="bird">{{store.delivery_mode.text}}</text>
                                        <text class="kilometre">{{store.distance}}</text>
                                    </view>
                                </view>
                            </view>
                            <view>
                            </view>
                        </view>

                    </u-card>
                </div>
            </div>
        </div>

    </view>
</template>

<script>
    import {mapState, mapGetters, mapActions,mapMutations} from 'vuex'

    export default {
        data() {
            return {
                col: 4, // 宫格列数
				firstFoodList:[],
				secondFoodList:[]
            }
        },
        computed: {
            ...mapState('homeModule', ['foodList', 'storeList'])
        },
        methods: {
            ...mapActions('homeModule', ['getFoodList', 'getStoreList']),
			...mapMutations('homeModule',['sendShopId']),
			// 获取图片的网络地址
			getImgUrl(image){
			   return "//elm.cangdu.org/img/"+image;
			},
			// 获取食物标题图片的网络地址
			getFoodImg(image){
				return "https://fuss10.elemecdn.com/"+image;
			},
            toShopInfo(id) {
				uni.navigateTo({
				    url:`/pages/shopping/shopping`
				}),
				this.sendShopId(id)
            }
        },
        async mounted() {
            await this.getFoodList()
            await this.getStoreList()
			this.foodList.forEach((item,index)=> {
				if(index < 8 ) {
					this.firstFoodList.push(item)
				}
			})
			this.foodList.forEach((item,index)=> {
				if(index > 7 && index < 17) {
					this.secondFoodList.push(item)
				}
			})
        }

    }
</script>

<style lang="less">
    .content {
        height: 2000rpx;

        .sticky {
            width: 750rpx;
            height: 90rpx;
            background-color: #3190e8;
            color: #fff;
            padding: 24rpx;
        }

        .navBar {
            display: flex;
            line-height: 90rpx;
            justify-content: space-between;

            .addressBar {
                line-height: 100%;
                font-size: 33rpx;
                width: 450rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }
        }


        .badge-icon {
            position: absolute;
            top: 30rpx;
            right: 30rpx;
            width: 40rpx;
            height: 40rpx;
        }

        .badge1-icon {
            position: absolute;
            top: 0rpx;
            right: 0rpx;
            width: 60rpx;
            height: 60rpx;
        }

        .merList {
            padding: 20rpx;

            .merImg {
                width: 140rpx;
                height: 140rpx;
            }

            .swiper-item {
                height: 550rpx;
            }

            .shopList {
                display: flex;
                padding: 20rpx;

            }

            .shopImg {
                width: 130rpx;
                height: 130rpx;
            }

            .shopDetail {
                display: flex;
                flex-direction: column;
                width: 70%;
                margin-left: 20rpx;
            }

            .shopName {
                font-size: 32rpx;
                color: #000;

            }

            .shopMark {
                font-size: 22rpx;
                color: #666;
                margin: 10rpx 0;
            }

            .shopPei {
                font-size: 24rpx;
                color: #666;
            }

            .shopYou {
                display: flex;
                flex-direction: column;

                margin-right: 20rpx;
            }

            .baoSo {
                font-size: 24rpx;
                color: #666;
            }

            .bird {
                font-size: 22rpx;
                color: #666;
                margin: 10rpx 0;
            }

            .kilometre {
                font-size: 24rpx;
                color: #666;
                width: 100rpx;
            }
        }
    }
</style>
