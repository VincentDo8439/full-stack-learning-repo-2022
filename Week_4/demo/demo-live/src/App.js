import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import CustomButton, { CustomButtonTwo } from './CustomButton';

function App() {



  return (
    <div style={{textAlign: 'center'}}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <CustomButton/>
        <CustomButtonTwo style={{height: 50}}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
