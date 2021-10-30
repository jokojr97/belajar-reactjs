import React from "react";
import { Link, Redirect } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import { Button } from "antd";

const Detail = props => {
    const onClicked = () => {
        signOut(getAuth());
    }
    const auth = getAuth();
    return <div> {
        auth.currentUser === null ? <Redirect to="/login" /> :
            <div>
                Halaman Detail  <br />
                <Link to="/login">Login</Link>  <br />
                <Link to="/">Home</Link>  <br />
                <Button onClicked={onClicked}>Logout</Button>
            </div>
    }
    </div>
}

export default Detail;