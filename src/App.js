import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import myFunction, { myFunction2, myFunction3 } from './My';
import MyButton from './widget/myButton';
import Home from './page/home';
import Detail from './page/detail';
import Login from './page/login';
import List from './page/list.js';
import { initializeApp } from "firebase/app";
import DefaultRoute from './DefaultRoute';
import React from 'react';
import { browserLocalPersistence, getAuth, setPersistence } from '@firebase/auth';
import { Spin } from 'antd';
import InsertPark from './park/insert';
import OutPark from './park/out';

const firebaseConfig = {
  apiKey: "AIzaSyAeF6c_LE4jH5ElRTB4bBso-oSVbC-XYlo",
  authDomain: "belajar-react-joko.firebaseapp.com",
  projectId: "belajar-react-joko",
  storageBucket: "belajar-react-joko.appspot.com",
  messagingSenderId: "297727501486",
  appId: "1:297727501486:web:b6c1385f082f63de07b93f",
  measurementId: "G-ZBZEQV665C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence).then(() => {
      console.log("Set Presistance Success")
      setReady(true);
    }).catch((error) => {
      console.log("Set Presistance failed")
      console.log(error);
    });
  }, [])

  const onClicked = () => {
    myFunction();
  }
  return (
    <React.Fragment>

      {/* <MyButton title="Load data" text="ini adalah isi dari text props yang akan ditampilkan sebagai tag paragraph" />   */}

      {!ready ? <center style={{ marginTop: "30%" }}><Spin size="large" /></center> :
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <DefaultRoute path="/detail" component={Detail} />
            <DefaultRoute path="/list" component={List} />
            <DefaultRoute path="/out" component={OutPark} />
            <DefaultRoute path="/" component={InsertPark} />
            {/* <DefaultRoute path="/" component={Home} /> */}
          </Switch>
        </Router>
      }
    </React.Fragment>


  );
}

export default App;
