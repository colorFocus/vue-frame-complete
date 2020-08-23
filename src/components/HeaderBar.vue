<style lang="less" scoped>
.webapp-title{
    height: 29px;
    line-height: 29px;
}
.webapp-title-mobile{
    display: inline-block;
    max-width: 76vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<template>
    <div class="am-header-bar">
        <div v-if="ismobile" class="webapp-box title-box">
            <div class="webapp-title clearfix">
                <span class="webapp-title-mobile">{{title}}</span>
                <slot></slot>
                <el-button v-if="hasBack || isDetail" @click="doCancel" size="mini" style="float:right;">返回</el-button>
                <div style="float:right;"><slot name="right"></slot></div>
            </div>
        </div>
        <div v-if="!ismobile&&(hasBack || isDetail)">
            <el-row>
                <el-col :xs="24" :sm="pos" style="position:relative">
                    <div class="webapp-title">
                        <slot></slot>
                        <el-button @click="doCancel" size="mini" style="position:absolute;top:10px;right:0;z-index:2000">返回</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import AppUtil from "AppUtil";

export default {
    name: "am-header-bar",
    data () {
        return {
            isDetail: false
        }
    },
    computed:{
        ismobile:function(){
            return AppUtil.isMobile();
        }
    },
    props:{
        title: {
            type: String,
            default: ""
        },
        hasBack: {
            type: Boolean,
            default: false
        },
        doCancelFunc: {
            type: Function
        },
        pos: {
            type: Number,
            default: 15
        }
    },
    mounted(){
        var currentRoute = this.$router.currentRoute.path;
        if(currentRoute.indexOf('/detail') != -1){
            this.isDetail = true;
        }
    },
    methods:{
        doCancel(){
            if(this.doCancelFunc){
                this.doCancelFunc();
                return;
            }
            if(window.webapp_lastLocation){
                this.$router.replace(window.webapp_lastLocation);
                window.webapp_lastLocation = "";
            }else if(window.history.length>2){
                this.$router.go(-1);
            }else{
                window.close();
            }
        }
    }
}
</script>