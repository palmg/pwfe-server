import React from 'react'
import {connect} from 'react-redux'
import {requestTest} from '../action'

const Comp3 = connect(
    (state, props) => ({
        data: state.reducerDemo,
        policy: state.policy.data
    }),
    (dispatch, props) => {
        return {
            requestComp4: () => dispatch(requestTest())
        }
    })(class extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        //this.props.requestComp4()
    }

    render() {
        //tenon data
        const {data, policy} = this.props
        console.log(policy)

        return (
            <div>
                <p>
                    comp3生成的页面，当前store数据：{policy}
                </p>
            </div>
        )
    }
})

module.exports = Comp3