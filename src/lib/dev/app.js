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
app.keys = ['this is a fucking secret']
app.use(compress())
app.use(bodyParser())
app.use(json())
app.use(logger())

export default app