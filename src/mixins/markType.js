//对原第三步实体和关系标注抽取出mixin

export default {
	data() {
		return {
			moduleType: 'home',


		}
	},
	computed: {
		canHandleTag() {
			return (this.activeName == 'three' || this.moduleType == 'type');
		}
	},
	mounted() {
		
	},
	methods: {
		//添加上命名空间，避免冲突，也明确知道方法来自哪个混入模块
		$_markType_update(){

		}
	}
}