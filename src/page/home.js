import { getAuth, signOut } from "@firebase/auth";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";


const Home = props => {
    const onClicked = () => {
        signOut(getAuth());
    }
    const auth = getAuth();

    return <div>
        {
            <div>
                Home Page <br />
                <div>
                    <Link to="/login">Login</Link> <br />
                    <Link to="/detail">Detail</Link>  <br />
                </div>
                <Button onClicked={onClicked}>Logout</Button>
            </div>
        }
    </div>
}
export default Home;