import AxiosUtil from 'AxiosUtil';

export default {
    trainSave: params => AxiosUtil.post('train/save', params),
    trainList: params => AxiosUtil.get('train/allList', params),
    
};