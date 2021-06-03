import ReactDOM from 'react-dom'
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import App from './app/app.js'
import Login from './login/app.js'


export default function Index() {
    return(
        <Router>
            <Switch>
                <Route path="/app"><App /></Route>
                <Route path="/"><Login /></Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))