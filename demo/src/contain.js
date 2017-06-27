/**
 * Created by Administrator on 2017/6/27.
 */

import React from 'react'
import {Link} from 'pwfe-dom/router';

const Contain = props =>
    <div>
        <Link to="/"><p>Index</p></Link>
        <Link to="/comp1"><p>Comp1</p></Link>
        <Link to="/comp2"><p>comp2</p></Link>
    </div>

module.exports = Contain