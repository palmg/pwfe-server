/**
 * Created by Administrator on 2017/6/21.
 */

/**
 * 用于示例的reducer
 * reducer的命名规范为模块名称+1级业务名称+2级业务名称。以驼峰规则书写。
 * 例如课程模块下记录活动列表的reducer命名为：courseOutingList,
 * reducer中对应的type以这个作为前缀来命名后续业务内容，例如：courseOutingListOnLoad
 */
const reducerDemo = (state = 'Demo1', action) => {
    switch (action.type) {
        case '1':
            return 'Demo1';
        case '2':
            return 'Demo1';
        default :
            return state;
    }
};

export {reducerDemo}