/**
 * Created by chkui on 2017/6/21.
 */

import React from 'react'
import {render} from 'react-dom';
import routes from './routes'
import reducerDemo from './reducer'
import entry from 'pwfe-dom/entry'
import Contain from './contain'

/*const store = buildStore({reducerDemo}, window.REDUX_STATE),  //获取服务器传递过来的store
    serverParams = window.SERVER_PARAMS || {},  //服务器传递过来的参数集
    initId = serverParams.initId || routes[0].id; //直接打开的url*/

/*for (let i of routes) { //遍历routes，找到初始化url对应的组件加载方法
    if (i.id === initId) {
        i.component(comp=> {
            //渲染
            render(
                <Provider store={store}>
                    <Router history={history}>
                        <App init={{comp, id: initId}} routes={routes}/>
                    </Router>
                </Provider>,
                document.getElementById('root')
            );
        })
        break
    }
}*/
entry({
    reducer:{reducerDemo},
    routes: routes,
    children: (<Contain />),
    renderCb: ()=>{console.log('render success!')}
})