<style lang="less">
.webapp-toggle-box{
    .webapp-toggle-box-content{
        overflow: hidden;
        margin: 0px 0px 10px 0px;
    }
}
</style>

<template>
    <div class="webapp-toggle-box">
        <div class="webapp-toggle-box-content" :style="styleObj" ref="box" v-show="$slots.default">
            <slot></slot>
        </div>
        <p class="clearfix">
            <slot name="left"></slot>
            <el-link type="primary" @click="toggleExpand" v-show="showExpandRange" style="float:right;">{{expandRange?'收起':'展开全部'}}</el-link>
        </p>
    </div>
</template>

<script>

export default {
    name: "am-toggle-box",
    data () {
        return {
            styleObj: {},
            box: null,
            expandRange: false,
            showExpandRange: false
        }
    },
    props:{
        mh: {
            type: Number,
            default: 156
        },
    },
    mounted(){
        let self = this;
        self.styleObj = { maxHeight: self.mh+'px' };
        self.box = self.$refs.box;
        setTimeout(self.trigger, 300);//以备组件外没有手动调用trigger（需要等待异步接口返回的情况）
    },
    methods:{
        trigger(){
            this.styleObj = {};
            this.$nextTick(()=>{
                this.showExpandRange = this.box.clientHeight > this.mh;
                this.styleObj = !this.expandRange?{ maxHeight: this.mh+'px' }:{};
            });
        },
        toggleExpand(){
            this.styleObj = this.expandRange?{ maxHeight: this.mh+'px' }:{};
            this.expandRange = !this.expandRange;
        }
    }
}
</script>