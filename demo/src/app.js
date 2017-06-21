/**
 * Created by chkui on 2017/6/21.
 */

import React from 'react'
import {Route, Link} from 'pwfe-dom/router'
import bundle from 'pwfe-dom/bundle'

const App = props => {
    const {init, routes} = props;
    return (
        <div>
            <Link to="/"><p>Index</p></Link>
            <Link to="/comp1"><p>Comp1</p></Link>
            <Link to="/comp2"><p>comp2</p></Link>
            {routes.map(i=><Route key={i.id} exact path={i.url}
                                  component={bundle(init.id === i.id && init.comp, i.component)}/>)}
        </div>
    )
}

export default App