/**
 * Created by chkui on 2017/6/21.
 */

import React from 'react'
import {render} from 'react-dom';
import routes from './routes'
import reducer from './reducer'
import entry from 'pwfe-dom/entry'
import Contain from './contain'

entry({
    reducer: reducer,
    routes: routes,
    children: (<Contain />),
    renderCb: ()=> {
        console.log('render success!')
    }
})