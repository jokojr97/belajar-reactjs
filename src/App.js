import logo from './logo.svg';
import './App.css';
import myFunction, {myFunction2, myFunction3} from './My';
import MyButton from './widget/myButton';

function App() {
  const onClicked = () => {
    myFunction();
  }
  return (
    <div className="App">
      <MyButton title="Load data" text="ini adalah isi dari text props yang akan ditampilkan sebagai tag paragraph" />
    </div>
  );
}

export default App;
