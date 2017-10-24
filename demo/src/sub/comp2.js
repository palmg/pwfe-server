/**
 * Created by chkui on 2017/6/21.
 */

import React from 'react'
import {connect} from 'react-redux'

const Comp2 = connect((state)=> {
    return {
        data: state.reducerDemo,
        policy: state.policy
    }
})(props =>
    <div>
        <p>
            comp2生成的页面，当前store数据：{props.data}
        </p>
        <p>
            policy:{props.policy.toString()}
        </p>
    </div>)

module.exports = Comp2