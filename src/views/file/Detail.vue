<style lang="less">
</style>

<template>

	<div class="file-detail">
    <p>This is Detail page</p>
	</div>

</template>

<script>
import Vue from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import moduleApi from "@/api/file.js";
import markTypeMixin from '@/mixins/markType.js';

export default {
	name: "file-detail",
	components: {
		[HeaderBar.name]: HeaderBar
	},
	mixins: [markTypeMixin],
	data(){
		return {
			loading: false,
		};
	},
	props: {
		id: {
			type: [String, Number]
		}
	},
	computed: {
	},
	watch: {
        //对路由$route对象的监听，当地址的hash变化的时候进行相应的处理
		'$route' (to, from) {

		}
	},
	mounted(){
        window.ts_detail = this;
        console.log('+++++++enter detail:  ', this.id);
	},
	methods: {
		
	},
};
</script>
