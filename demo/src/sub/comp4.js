import React from 'react'
import {connect} from 'react-redux'
import {requestComp4} from '../action'

const Comp4 = connect(
    (state, props) => ({
        data: state.reducerDemo,
        comp4: state.policy.comp4
    }),
    (dispatch, props) => {
        return {
            requestComp4: (type) => dispatch(requestComp4(type))
        }
    })(class extends React.Component { //渲染榫卯详情页面
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        this.props.requestComp4("paramTest")
    }

    render() {
        //tenon data
        const {data, comp4} = this.props
        console.log(comp4)

        return (
            <div>
                <p>
                    comp3生成的页面，当前store数据：{comp4}
                </p>
            </div>
        )
    }
})

module.exports = Comp4