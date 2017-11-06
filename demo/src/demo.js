/**
 * Created by chkui on 2017/6/21.
 */
import React from 'react'
import routes from './routes'
import reducer from './reducer'
import entry from 'pwfe-dom/entry'
import Header from './header'
import Footer from './footer'
import Contain from './contain'
import './demo.scss'

entry({
    reducer: reducer,
    routes: routes,
    header: Header,
    footer: Footer,
    children: Contain,
    renderCb: ()=> {
        console.log('render success!')
    }
})