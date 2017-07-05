/**
 * Created by chkui on 2017/6/21.
 */

import React from 'react'
const cn = require('classnames/bind').bind(require('./comp1.scss'))

const Comp1 = props =>
    <div className={cn('comp1')}>comp1生成的页面</div>

module.exports = Comp1