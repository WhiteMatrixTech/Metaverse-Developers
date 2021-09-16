<template>
	<view class="content">
		<image class="battle" :src="battle"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				battle: "../../static/battle.png",
			}
		},
		methods: {
			
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
	
	.battle {
		width: 100%;
		padding-top: 10%;
		height: 80%;
	}
</style>
