<template>
	<view class="content" :style="{ height: screenHeight }">
		<view class="connect" @click="connect">
			<image class="metamask" :src="metamask"></image>
			<view class="connectStatus">{{connectStatus}}</view>
		</view>
		<view class="text">距离下次暗能量还有: {{countdown}}</view>
		<view class="image-area">
			<image class="roated" :src="rotatedUrl"></image>
			<view class="text">光能量蓄满30%</view>
			<image class="clircle" :src="circleUrl"></image>
		</view>
		<view class="btn-area">
			<button class="btn" @click="toLastBattle">上一次战斗</button>
			<button class="btn" @click="toTransport">输送能量</button>
		</view>

	</view>
</template>

<script>
	import {
		web3j
	} from '../../static/js/web3.min.js';

	export default {
		data() {
			return {
				h: 23, //时
				m: 59, //分
				s: 59, //秒
				countdown: '24:00:00', //倒计时
				timer: null, //重复执行
				connectStatus: "未连接",
				animationData: {},
				screenHeight: 0,
				rotatedUrl: "../../static/rotated.png",
				circleUrl: "../../static/circle.png",
				metamask: "../../static/avatar.png"
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.timer = setInterval(() => {
				this.timeCount()
			}, 1000)

		},
		onShow() {

		},
		methods: {
			toLastBattle() {
				uni.navigateTo({
					url: "/pages/battle/battle"
				})
			},
			toTransport() {
				uni.navigateTo({
					url: "/pages/transport/transport"
				})
			},

			timeCount() {
				--this.s;
				if (this.s < 0) {
					--this.m;
					this.s = 59;
				}
				if (this.m < 0) {
					--this.h;
					this.m = 59
				}
				if (this.h < 0) {
					this.s = 0;
					this.m = 0;
				}
				this.countdown = this.h + ":" + this.m + ":" + this.s
			},

			connect() {
				const _this = this;
				//判断用户是否安装MetaMask钱包插件
				if (typeof window.ethereum === "undefined") {
					//没安装MetaMask钱包进行弹框提示
					alert("Looks like you need a Dapp browser to get started.");
					alert("Consider installing MetaMask!");
				} else {
					//如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
					ethereum.enable()
						.catch(function(reason) {
							//如果用户拒绝了登录请求
							if (reason === "User rejected provider access") {
								// 用户拒绝登录后执行语句；
							} else {
								// 本不该执行到这里，但是真到这里了，说明发生了意外
								alert("There was an issue signing you in.");
							}
						}).then(function(accounts) {
							//这里返回用户钱包地址
							console.log(accounts[0]);
							_this.connectStatus = "已连接"
						});
				}
			}

		}
	}
</script>

<style>
	page {
		height: 100%;
		background-color: #000000;
	}

	.content {
		height: 100%;
		background: url('../../static/bg.png') no-repeat;
		background-size: cover;
	}

	.connect {
		width: 100%;
		text-align: right;
	}

	.metamask {
		width: 30px;
		height: 30px;
		padding-top: 20px;
		margin-right: 20px;
	}

	.image-area {
		justify-content: center;
		text-align: center;
	}

	.roated {
		width: 300px;
		height: 300px;
		display: inline-block;
		overflow: hidden;
		animation: rotate 10s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(360deg)
		}

		to {
			transform: rotate(0deg)
		}
	}

	.clircle {
		margin-top: 10px;
		width: 250px;
		height: 250px;
	}

	.btn-area {
		display: flex;
		padding-top: 5%;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.btn {
		margin: 10px;
	}

	.text {
		font-size: 15px;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}

	.connectStatus {
		color: #FFFFFF;
		padding-right: 20px;
		font-size: 10px;
	}
</style>
