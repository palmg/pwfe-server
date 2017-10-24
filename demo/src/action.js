/**
 * Created by chkui on 2017/6/30.
 */

const get = require('pwfe-dom/net').get
var fetch = require('node-fetch');

// if you are on node v0.10, set a Promise library first, eg.
// fetch.Promise = require('bluebird');


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

/*const requestPolicy = ()=> {
    return (dispath) => {
        // dispath(getPolicy())
        /!*var fetch = require('node-fetch');
        fetch('https://file.mahoooo.com/res/policy/get')
            .then(function (res) {
                return res.json();
            }).then(function (body) {
            dispath(setPolicy(JSON.stringify(body)))
        });*!/
        //2
       return fetch('https://api.github.com/users/github')
           .then(function(res) {
               return res.json();
           }).then(function(json) {
               dispath(setPolicy(JSON.stringify(json)))
           });
    }
}*/

const requestPolicy = ()=> {
    return (dispath) => {
        dispath(getPolicy())
        get('http://fordevtest.mlhang.com/recommend/target/user/5/op/recommend/0').suc((res)=> {
            dispath(setPolicy(JSON.stringify(res)))
        })
    }
}

const requestTest = ()=> {
    return (dispath) => {
        dispath(getPolicy())
        return get('http://fordevtest.mlhang.com/recommend/target/user/5/op/recommend/0').suc((res)=> {
            dispath(setPolicy(JSON.stringify(res)))
        })
    }
}

//测试url中提取的参数
const requestComp4 = (type, type2)=> (dispath) =>{
    console.log(type2)
    dispath(setComp4(type))
}


const getPolicy = ()=> {
    return {
        type: 'policy',
        data: 'loading1'
    }
}

const setPolicy = (policy)=> {
    return {
        type: 'policy',
        data: policy.toString()
    }
}

const setComp4 = (policy)=> {
    return {
        type: 'comp4',
        comp4: policy
    }
}

const action = {
    action1,
    action2,
    requestPolicy,
    requestTest,
    requestComp4
}

module.exports = action