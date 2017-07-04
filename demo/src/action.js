/**
 * Created by chkui on 2017/6/30.
 */

const get = require('pwfe-dom/net').get

const action1 = () => {
    return {
        type: '1',
        data: 'Action Date1'
    }
}
const action2 = (param)=> {
    return {
        type: '2',
        data: `Action Date2.Current Params: ${param.param1},${param.param2}`
    }
}

const requestPolicy = ()=> {
    return (dispath) => {
        dispath(getPolicy())
        /*var fetch = require('node-fetch');
        fetch('https://file.mahoooo.com/res/policy/get')
            .then(function (res) {
                return res.json();
            }).then(function (body) {
            dispath(setPolicy(JSON.stringify(body)))
        });*/
        get('https://file.mahoooo.com/res/policy/get').suc((res)=> {
            dispath(setPolicy(JSON.stringify(res)))
        })
    }
}

const getPolicy = ()=> {
    return {
        type: 'policy',
        data: 'loading'
    }
}

const setPolicy = (policy)=> {
    return {
        type: 'policy',
        data: policy.toString()
    }
}

const action = {
    action1,
    action2,
    requestPolicy
}

module.exports = action