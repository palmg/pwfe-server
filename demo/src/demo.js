/**
 * Created by chkui on 2017/6/21.
 */


import React from 'react'
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import cnTool from 'classnames/bind'
import {Router, history} from 'pwfe-dom/router'
import routes from './routes'
import {buildStore} from 'pwfe-dom/flux'
import App from './app'
import {reducerDemo} from './reducer'

import '../../dev/src/app.scss'
import './demo.scss'

const store = buildStore({reducerDemo}, window.REDUX_STATE);
render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)