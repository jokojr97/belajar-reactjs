import { getAuth, signOut } from "@firebase/auth";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";


const Home = props => {
    const history = useHistory();
    const onClicked = async () => {
        try {
            signOut(getAuth());
            history.push("/login");
            console.log("logout berhasil")
        } catch (e) {
            console.log("Logout Gagal")
        }

        // signOut(getAuth()).then(() => {
        // history.push("/login");
        // console.log("logout berhasil")
        // }).catch((error) => {
        // console.log("Logout Gagal")
        // });
    }

    const testCreate = async () => {
        try {
            const docRef = await addDoc(collection(getFirestore(), "users"), {
                first: "Leon",
                last: "Kenedy",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const testgetData = async () => {
        const querySnapshot = await getDocs(collection(getFirestore(), "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.data());
        });

    }

    return <div>
        {
            <div>
                Home Page: {getAuth().currentUser.email} <br />
                <div>
                    <Link to="/login">Login</Link> <br />
                    <Link to="/detail">Detail</Link>  <br />
                </div>
                <Button onClick={onClicked}>Logout</Button>
                <br /><br />
                <Button type="default" onClick={testCreate}>Add Data</Button>
                <br /><br />
                <Button type="default" onClick={testgetData}>Get Data</Button>
            </div>
        }
    </div>
}
export default Home;