import AxiosUtil from 'AxiosUtil';

export default {
    getCommonList: params => AxiosUtil.get('common/list', params),
    
};