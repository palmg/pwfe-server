/**
 * Created by chkui on 2017/6/2.
 */

import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import compress from 'koa-compress'
import React from 'react'

const app = new Koa()
app.keys = ['welcome to palmg'] //TODO 暂未提供配置
app.use(compress())
app.use(bodyParser())
app.use(json())
app.use(logger())

export default app