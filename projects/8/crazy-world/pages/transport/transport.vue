<template>
	<view class="content">
		<view class="area1">
			<image class="starMotion" :src="starMotion" v-show="show"></image>
		</view>
		<view class="area2">
		<view class="progress">
			<vus-sphere-progress :percent="percent" :color="['#333','#ffffff','#fff']" :anim="true" :sphere="{icon:['vi-bolt','font-szie:18px;color:#fff;']}">
			</vus-sphere-progress>
		</view>
		<view class="btn" @longtap="longtap">
			<image class="fingerprint" :src="fingerprintUrl"></image>
		</view>
		<div class="text" @longpress="transport">长按</div>
		</view>
	</view>
</template>

<script>
	import vusSphereProgress from '../../components/vus-sphere-progress/vus-sphere-progress.vue';
	export default {
		data() {
			return {
				// 当前进度百分比：0-100
				show: false,
				percent: 30,
				fingerprintUrl: "../../static/fingerprint.png",
				starMotion: "../../static/star-motion.gif",
			}
		},
		components: {
			vusSphereProgress
		},
		methods: {
			longtap() {
				this.show = true;	
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
		position: relative;
		text-align: center;
		height: 100%;
		background: url('../../static/bg.png') no-repeat;
		background-size: cover;
	}
	
	.area1 {
		width: 100%;
		height: 100%;
		position: absolute;
	}
	
	.area2 {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.btn {

		display: flex;
		justify-content: center;
	}

	.progress {
		padding-top: 100%;
		display: flex;
		justify-content: center;
	}

	.fingerprint {
		width: 70px;
		height: 70px;
		margin-top: 80px;
	}

	.text {
		width: 100%;
		text-align: center;
		margin-top: 10px;
		color: #FFFFFF;
	}

	.starMotion {
		width: 80%;
		height: 50%;
	}
</style>
