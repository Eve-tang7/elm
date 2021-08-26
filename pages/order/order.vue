<template>
    <view>
        <swiper-item class="swiper-item">
            <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
                <view class="page-box">
                    <view class="order" v-for="(res, index) in  orderList" :key="res.id">
                        <view class="top">
                            <view class="left">
                                <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                                <view class="store">{{ res.restaurant_name }}</view>
                                <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                            </view>
                            <view class="right">{{ res.formatted_created_at }}</view>
                        </view>
                        <view class="item" v-for="(item, index) in res.basket.group[0]" :key="item.id">
                            <view class="left">
                                <image :src="getImgUrl(res.restaurant_image_url)" mode="aspectFill"></image>
                            </view>
                            <view class="content">
                                <view class="title u-line-2"></view>
                                <view class="type"></view>

                            </view>
                            <view class="right">
                                <view class="title u-line-2">{{ item.name }}</view>
                                <view class="price">
                                    ￥{{ item.price }}
                                </view>

                            </view>
                        </view>
                        <view class="bottom">
                            <view class="more">
                                <u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
                            </view>

                            <view class="evaluate btn">评价</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </swiper-item>

    </view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
				
			};
        },
        computed: {
            ...mapState('orderModule', ['orderList'])
        },
        methods: {
            ...mapActions('orderModule', ['getOrderList']),
			// 获取图片的网络地址
			getImgUrl(image){
			   return "//elm.cangdu.org/img/"+image;
			},
        },
        mounted() {
            this.getOrderList()
        }
    };
</script>

<style>
    /* #ifndef H5 */
    page {
        height: 100%;
        background-color: #f2f2f2;
    }

    /* #endif */
</style>


<style lang="scss" scoped>
    .order {
        width: 710rpx;
        background-color: #ffffff;
        margin: 20rpx auto;
        border-radius: 20rpx;
        box-sizing: border-box;
        padding: 20rpx;
        font-size: 28rpx;

        .top {
            display: flex;
            justify-content: space-between;

            .left {
                display: flex;
                align-items: center;

                .store {
                    margin: 0 10rpx;
                    font-size: 32rpx;
                    font-weight: bold;
                }
            }

            .right {
                color: $u-type-warning-dark;
            }
        }

        .item {
            display: flex;
            justify-content: space-between;
            margin: 20rpx 0 0;

            .left {
                margin-right: 20rpx;

                image {
                    width: 200rpx;
                    height: 200rpx;
                    border-radius: 10rpx;
                }
            }

            .content {
                .title {
                    font-size: 28rpx;
                    line-height: 50rpx;
                }

                .type {
                    margin: 10rpx 0;
                    font-size: 24rpx;
                    color: $u-tips-color;
                }

                .delivery-time {
                    color: #e5d001;
                    font-size: 24rpx;
                }
            }

            .right {
                margin-left: 10rpx;
                padding-top: 20rpx;
                text-align: right;

                .decimal {
                    font-size: 24rpx;
                    margin-top: 4rpx;
                }

                .number {
                    color: $u-tips-color;
                    font-size: 24rpx;
                }
            }
        }

        .total {
            margin-top: 20rpx;
            text-align: right;
            font-size: 24rpx;

            .total-price {
                font-size: 32rpx;
            }
        }

        .bottom {
            display: flex;
            margin-top: 40rpx;
            padding: 0 10rpx;
            justify-content: space-between;
            align-items: center;

            .btn {
                line-height: 52rpx;
                width: 160rpx;
                border-radius: 26rpx;
                border: 2rpx solid $u-border-color;
                font-size: 26rpx;
                text-align: center;
                color: $u-type-info-dark;
            }

            .evaluate {
                color: $u-type-warning-dark;
                border-color: $u-type-warning-dark;
            }
        }
    }

    .centre {
        text-align: center;
        margin: 200rpx auto;
        font-size: 32rpx;

        image {
            width: 164rpx;
            height: 164rpx;
            border-radius: 50%;
            margin-bottom: 20rpx;
        }

        .tips {
            font-size: 24rpx;
            color: #999999;
            margin-top: 20rpx;
        }

        .btn {
            margin: 80rpx auto;
            width: 200rpx;
            border-radius: 32rpx;
            line-height: 64rpx;
            color: #ffffff;
            font-size: 26rpx;
            background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
        }
    }

    .wrap {
        display: flex;
        flex-direction: column;
        height: calc(100vh - var(--window-top));
        width: 100%;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        height: 100%;
    }
</style>
