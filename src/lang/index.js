import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import ParamsUtil from "ParamsUtil";

Vue.use(VueI18n);

var defaultLangKey = "zh-CN";
var urlLang = ParamsUtil.getParams()['lang'];
if (Cookies.get("kl_lang")) {
    defaultLangKey = Cookies.get("kl_lang");
}
if (urlLang) {
    Cookies.set("kl_lang", urlLang);
    defaultLangKey = urlLang;
}

var lang = {
    selected: defaultLangKey,
    message: {},
    list: [
        {
            label: "简体中文",
            key: "zh-CN",
            file: require("./zh-CN")
        },
        {
            label: "English(US)",
            key: "en-US",
            file: require("./en-US")
        },
    ]
}

var messages = {};

lang.list.forEach((element) => {
    messages[element.key] = element.file;
})

var i18n = new VueI18n({
    locale: lang.selected, // 语言标识
    messages: messages
});

//设置语言key的方法
function setLangKey(key){
    Cookies.set("kl_lang", key);
    if(key && key.length > 0){
        i18n.locale = key;//切换语言  
        console.log("localization key is saved,value is "+key);
    }
}

export {
    i18n,
    setLangKey
}