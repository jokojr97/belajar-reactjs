import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import { Button, message } from "antd";

const Detail = props => {
    const history = useHistory();
    const onClicked = async () => {
        try {
            signOut(getAuth());
            history.push("/login");
            message.success("Logut Berhasil");
        } catch (e) {
            message.success("Logut Berhasil");
        }
    }
    const auth = getAuth();
    return <div> {
        // auth.currentUser === null ? <Redirect to="/login" /> :
        <div>
            Halaman Detail  <br />
            <Link to="/login">Login</Link>  <br />
            <Link to="/">Home</Link>  <br />
            <Button onClick={onClicked}>Logout</Button>
        </div>
    }
    </div>
}

export default Detail;