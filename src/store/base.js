const state = {
    //用户名称
    userName:'',
    userId:"",
    graphId:"",
    schemaId:"",
    crumb1: '',
    crumb2: '',
    crumb3: '',
}
const mutations = {
    setCrumb1(state, text){
        state.crumb1 = text;
    },
    setCrumb2(state, text){
        state.crumb2 = text;
        sessionStorage.setItem("crumb2", text);
    },
    setCrumb3(state, text){
        state.crumb3 = text;
    },
    setUserInfo(state,userInfo){

        state.userName = userInfo.userName;
        state.userId = userInfo.userId;
        window.kgConfig.userId = userInfo.userId;

        sessionStorage.setItem("userName",JSON.stringify(userInfo.userName));
        sessionStorage.setItem("userId",JSON.stringify(userInfo.userId));
    },

    setGraphId(state,graphId){

        state.graphId = graphId;
        sessionStorage.setItem("graphId",JSON.stringify(graphId));
    },

    setSchemaId(state,schemaId){

        state.schemaId = schemaId;
        sessionStorage.setItem("schemaId",JSON.stringify(schemaId));
    }
}
const getters = {
    queryUserName:state=>{
        if(state.userName == '' && sessionStorage.userName) {
            state.userName = JSON.parse(sessionStorage.userName);
        }
        return state.userName;
    },
    queryUserId:state=>{
        if(state.userId == '' && sessionStorage.userId) {
            state.userId = JSON.parse(sessionStorage.userId);
        }
        return state.userId;
    },
    queryGraphId:state=>{

        if(state.graphId == '' && sessionStorage.graphId) {
            state.graphId = JSON.parse(sessionStorage.graphId);
        }

        return state.graphId;
    },
    querySchemaId:state=>{

        if(state.schemaId == '' && sessionStorage.schemaId) {
            
            state.schemaId = JSON.parse(sessionStorage.schemaId);
        }

        return state.schemaId;
    },
    queryCrumb2:state=>{
        if(state.crumb2 == '' && sessionStorage.crumb2) {
            state.crumb2 = sessionStorage.crumb2;
        }
        return state.crumb2;
    },
}
const actions = {
    setUserInfo:function(context,userInfo){
        context.commit('setUserInfo',userInfo);
    },
    setGraphId:function(context,graphId){
        context.commit('setGraphId',graphId);
    },
    setSchemaId:function(context,schemaId){
        context.commit('setSchemaId',schemaId);
    }
}

export default{
    state,
    mutations,
    getters,
    actions,
}