ko.ob = ko.observable;//启用简写方式
ko.oba = ko.observableArray;//启用简写方式


//实现查找函数
Array.prototype._find = function(fn){
	if(this === null) throw new TypeError('this is null or not defined'); 
	
	let that = Object(this),len = that.length>>>0;
	
	if(typeof fn !== 'function') throw new TypeError('fn is not function');
	
	for(let i = 0;i < len;i++){
		 if(fn(that[i]))return that[i] ;
	}
	return undefined;
}
//根据条件删除数组内容
function deleteByCondition(arr,fun){
    let counter = arr.length - 1;
    while (true) {
        let result = fun(arr[counter]);
        if (result) {
            arr.splice(counter, 1);
            counter = arr.length - 1;
        } else {
            counter--;
        }
        if (counter < 0) {
            break;
        }
    }
}

function UploadMuisc() {
    this.uploadedList = [];
    this.$wrap = $("#upload");
    this.viewModel = undefined;
    this.init();
}
(function () {
    //试图模型
    var ViewModel = function(ins){
        var self = this;
        self.uploadBtnDisable = ko.ob(false);
        self.audioList = ko.oba([]);
        self.infoText = ko.ob("");
        self.percentages = ko.ob({});
        self.topError = ko.ob("");
        self.status = ko.ob("ready") // uploading  paused ready confirm finish
        self.topErrorAble = ko.computed(function () {
            var flag = false;
            if(self.topError().length > 0){
                flag = true;
            }
            return flag;
        });
        
        self.uploadChooseBtnText = ko.ob(lang.uploadAddFile);
        self.uploadBtnText = ko.computed(function () {
            var text = "";
            if(self.status()==="ready"){
                text = lang.uploadStart;
            }else if(self.status()==="uploading"){
                text = lang.uploadPause;
            }else if(self.status()==="paused"){
                text = lang.uploadContinue;
            }else if(self.status()==="confirm"){
                text = lang.uploadStart;
            }else if(self.status()==="finish"){
                text = lang.uploadStart;
            }
            return text;
        });

        //文件总大小
        self.fileSize = ko.computed(function () {
            var flag = 0;
            if(self.audioList().length > 0){
                flag = 200;
            }
            return WebUploader.formatSize(flag);
        });
        //文件总个数
        self.fileCount = ko.computed(function () {
            return self.audioList().length;
        });
        //是否为初始状态
        self.initAble = ko.computed(function () {
            var flag = true;
            if(self.audioList().length > 0){
                flag = false;
            }
            return flag;
        });

        self.deleteFileItem = function(file){
            ins.uploader.removeFile(file);
        };
        //开始上传的方法
        self.doUpload = function(){
            self.infoText("");
            if (self.status() === 'ready') {
                ins.uploader.upload();
            } else if (self.status() === 'paused') {
                ins.uploader.upload();
            } else if (self.status() === 'uploading') {
                ins.uploader.stop();
            }
        }
    }

    UploadMuisc.prototype = {

        init:function () {
            var self = this,
                $wrap = self.$wrap;
            self.viewModel = new ViewModel(self);
            //将模型和ui绑定在一起
            ko.applyBindings(self.viewModel,$wrap.get(0));
            //创建上传组件
            self.initUploader();
        },

        
        initUploader:function(){
            var self = this,
                viewModel = self.viewModel,
                $wrap = self.$wrap,
                uploader = undefined,
                actionUrl = editor.getOpt('audioAction'),
                isNeedRewriteAudioUri = editor.getOpt('isNeedRewriteAudioUri'),//是否需要更换地址
                reWriteAudioUriTemplate = editor.getOpt('reWriteAudioUriTemplate'),//得到重写模板
                reWriteAudioIdx = editor.getOpt('reWriteAudioIdx'),//替换字符串
                acceptExtensions = (editor.getOpt('audioAllowFiles') || []).join(','),
                audioMaxSize = editor.getOpt('audioMaxSize'),
                audioResId = editor.getOpt('audioResId');

            if (!WebUploader.Uploader.support()) {
                viewModel.topError(lang.errorNotSupport);
                return;
            } else if (!actionUrl) {
                viewModel.topError(lang.errorLoadConfig);
                return;
            }
            //初始化上传
            uploader = self.uploader = WebUploader.create({
                pick: {
                    id: '#filePickerReady',
                    label: lang.uploadSelectFile
                },
                accept: {
                    title: 'audios',
                    extensions: acceptExtensions
                },
                swf: '../../third-party/webuploader/Uploader.swf',
                server: actionUrl,
                fileVal: editor.getOpt('audioFieldName'),
                duplicate: true,
                fileSingleSizeLimit: audioMaxSize
            });
            uploader.addButton({
                id: '#filePickerBlock'
            });
            uploader.addButton({
                id: '#filePickerBtn',
                label: lang.uploadAddFile
            });
            //添加文件
            function addFile(file) {
                
                file.uploadAble = ko.ob(true);
                file.errorAble = ko.ob(false);
                file.errorText = ko.ob("");
                file.percent = ko.ob(0);
                file.success = ko.ob(false);
                //获取错误内容
                var getError = function (code) {
                    var text = "";
                    switch (code) {
                        case 'exceed_size':
                            text = lang.errorExceedSize;
                            break;
                        case 'interrupt':
                            text = lang.errorInterrupt;
                            break;
                        case 'http':
                            text = lang.errorHttp;
                            break;
                        case 'not_allow_type':
                            text = lang.errorFileType;
                            break;
                        default:
                            text = lang.errorUploadRetry;
                            break;
                    }
                    return text;
                };
                if (file.getStatus() === 'invalid') {
                    file.uploadAble(false);
                    file.errorAble(true);
                    file.errorText(getError(file.statusText));
                }else {
                    
                    // viewModel.percentages()[ file.id ] =  file.size, 0 ][;
                    /* 检查文件格式 */
                    if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1) {
                        file.uploadAble(false);
                        file.errorAble(true);
                        file.errorText(getError('not_allow_type'));
                    }
                }

                file.on('statuschange', function (cur, prev) {
                    if (prev === 'progress') {
                        // file.percent(0);
                    } else if (prev === 'queued') {
                        // $li.off('mouseenter mouseleave');
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid') {
                        file.uploadAble(false);
                        file.errorAble(true);
                        file.errorText(getError(file.statusText));
                    } else if (cur === 'interrupt') {
                        file.uploadAble(false);
                        file.errorAble(true);
                        file.errorText(getError('interrupt'));
                    } else if (cur === 'queued') {
                        // percentages[ file.id ][ 1 ] = 0;
                    } else if (cur === 'progress') {
                        file.uploadAble(true);
                        file.errorAble(false);
                    } else if (cur === 'complete') {
                    }
                });
                //添加到序列中
                viewModel.audioList.push(file);

            }
            
            uploader.on('fileQueued', function (file) {
                addFile(file);
            });

            uploader.on('error', function (code, file) {
                if (code == 'Q_TYPE_DENIED' || code == 'F_EXCEED_SIZE') {
                    addFile(file);
                }
            });
            uploader.on('uploadBeforeSend', function (file, data, header) {
                //这里可以通过data对象添加POST参数
                header['X_Requested_With'] = 'XMLHttpRequest';
            });
            //文件队列
            uploader.on('filesQueued', function (file) {
                viewModel.status('ready');
            });
            //文件移出 队列的函数
            uploader.on('fileDequeued', function (file) {
                //删除数据
                self.removeFile(file);
            });
            uploader.on('uploadProgress', function (file, percentage) {
                var $file = viewModel.audioList()._find(function(item){
                    return item.id === file.id;
                })
                $file.percent(percentage * 100);
            });
            uploader.on('uploadSuccess', function (file, ret) {
                var $file = viewModel.audioList()._find(function(item){
                    return item.id === file.id;
                });
                try {
                    var responseText = (ret._raw || ret);
                    var json = utils.str2json(responseText);
                    if (json.code == '0') {
                        if(isNeedRewriteAudioUri===true){
                            let id = (json.data)[audioResId];
                            if(id && id.length > 0){
                                let uri = reWriteAudioUriTemplate.replace(reWriteAudioIdx,id);
                                json.data.newUrl = uri;
                            }
                        }
                        json.data.fileId = file.id;
                        self.uploadedList.push(json.data);
                        $file.success(true);
                    } else {
                        $file.errorAble(true);
                        $file.errorText(json.msg);
                    }
                } catch (e) {
                    $file.errorAble(true);
                    $file.errorText(lang.errorServerUpload);
                }
            });
            uploader.on('uploadComplete', function (file, ret) {
            });
            uploader.on('uploadError', function (file, code) {
            });

            uploader.on('all', function (type, files) {
                switch (type) {
                    case 'uploadFinished':
                        viewModel.status('confirm');
                        break;
                    case 'startUpload':
                        /* 添加额外的GET参数 */
                        var params = utils.serializeParam(editor.queryCommandValue('serverparam')) || '';
                        var url = utils.formatUrl(actionUrl + (actionUrl.indexOf('?') == -1 ? '?':'&') + 'encode=utf-8&' + params);
                        uploader.option('server', url);
                        uploader.option('withCredentials', true);
                        viewModel.status('uploading', files);
                        break;
                    case 'stopUpload':
                        viewModel.status('paused', files);
                        break;
                }
            });
            
        },
        getQueueCount: function () {
            var file, i, status, readyFile = 0, files = this.uploader.getFiles();
            for (i = 0; file = files[i++]; ) {
                status = file.getStatus();
                if (status == 'queued' || status == 'uploading' || status == 'progress') readyFile++;
            }
            return readyFile;
        },
        removeFile(file){
            var self = this;
            self.viewModel.audioList.remove(function (item) { 
                return item.id === file.id;
            });
            if(self.uploadedList && self.uploadedList.length > 0){
                deleteByCondition(self.uploadedList,function(item){
                    return item.fileId === file.id;
                });
            }
            self.viewModel.infoText("");
        },
        getInsertList: function () {
            var i, data, list = [];
            for (i = 0; i < this.uploadedList.length; i++) {
                data = this.uploadedList[i];
                list.push({
                    id: data.fileId,
                    src: data.url,
                    _src: data.url,
                    title: data.attachmentName,
                    alt: data.attachmentName
                });
            }
            return list;
        },
        exec:function () {
            var self = this;
            var dlist = self.getInsertList();
            var unCount = self.getQueueCount();
            if (unCount) {
                self.viewModel.infoText((lang.infosError).replace("____", unCount));
                return false;
            }
            if(dlist && dlist.length > 0){
                for(var i=0,len=dlist.length;i<len;i++){
                    var bean = dlist[i];
                    editor.execCommand('music', {
                        type:"local",
                        url:bean.src
                    });
                }
            }
            return true;
        }
    };
})();



