<template>
	<u-rate :count="count" v-model="value"></u-rate>
</template>

<script>
	export default {
		data() {
			return {
				title: '饿了么项目',
				count: 4,
				value: 2
			}
		},
		mounted() {
		},
		methods: {

		}
	}
</script>

<style>

</style>
