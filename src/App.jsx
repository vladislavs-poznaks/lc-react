import React from 'react';
import Issues from "./Issues";
import {Link, Route, BrowserRouter, Switch} from "react-router-dom";
import Details from "./Details";

export default function App() {

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Issues/>
                    </Route>
                    <Route path="/issues/:id">
                        <Details/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}