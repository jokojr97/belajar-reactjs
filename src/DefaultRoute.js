import { getAuth } from "@firebase/auth";
import React from "react";
import {
    Route, Redirect
} from "react-router-dom";

const DefaultRoute = props => {
    const login = getAuth().currentUser != null;
    if (!login) {
        return <Redirect to="/login" />
    }
    return <Route exact path={props.path} component={props.component} />
}

export default DefaultRoute;