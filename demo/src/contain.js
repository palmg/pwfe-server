/**
 * Created by Administrator on 2017/6/27.
 */

import React from 'react'
import {Link} from 'pwfe-dom/router'

const Contain = props =>
    <div>
        <Link to="/"><p>Index</p></Link>
        <Link to="/comp1"><p>Comp1</p></Link>
        <Link to="/comp2/123/sdf"><p>comp2</p></Link>
        <Link to="/comp3/param"><p>Comp3</p></Link>
    </div>

module.exports = Contain