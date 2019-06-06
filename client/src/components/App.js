import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";

import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

import Header from "./header";
import history from "../history";
class App extends Component {
    state = {};
    render() {
        return (
            <div className="ui container">
                {/* // BrowserRouter only have one child */}
                <Router history={history}>
                    <React.Fragment>
                        <Header />
                        {/* exact: only show component if path is EXACTLY "/" */}
                        <Route path="/" exact component={StreamList} />
                        <Switch>
                            <Route
                                path="/streams/new"
                                exact
                                component={StreamCreate}
                            />
                            <Route
                                path="/streams/edit/:id"
                                exact
                                component={StreamEdit}
                            />
                            <Route
                                path="/streams/delete/:id"
                                exact
                                component={StreamDelete}
                            />
                            <Route
                                path="/streams/:id"
                                exact
                                component={StreamShow}
                            />
                        </Switch>
                    </React.Fragment>
                </Router>
            </div>
        );
    }
}

export default App;
