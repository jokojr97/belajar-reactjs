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
import { initializeApp } from "firebase/app";

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
  const onClicked = () => {
    myFunction();
  }
  return (
    <div className="App">
      {/* <MyButton title="Load data" text="ini adalah isi dari text props yang akan ditampilkan sebagai tag paragraph" />   */}
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/detail" exact>
            <Detail />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
