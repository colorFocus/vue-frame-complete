(function (root, factory) {
    var temp = root;
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        define(factory);
    }else{
        root.deepc_Config = factory(temp);
        root.document.title = window.deepc_Config.AppName;
    }
}(this, function (temp) {
    //加载配置（各种需要全局配置的参数）
    var config = {
        account: {//一些需要写死的账号
            staff: {
                username: 'ptyg',
                password: 'demo2019'
            },
        },
        apiServer:{//接口服务ip地址
            co:{
                protocol:"http",
                host:"59.44.43.198",
                post:"80",
                path:"/snap-main-new"
            },
            fileEngine:{
                protocol:"http",
                host:"59.44.43.198",
                post:"80",
                path:"/snap-engine-file"
            },
        },
        AppName: "电子病历结构化",
    };
    return config;
}));
