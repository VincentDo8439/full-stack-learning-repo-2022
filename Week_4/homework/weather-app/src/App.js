import './App.css';
import { useState } from 'react';
import MainContainer from './MainContainer';
import SideContainer from './SideContainer'

function App() {

  const myApiKey = "6dc87f0d902ad7e89bffc74e3ba537ef";

  const [data, setData] = useState('');

  const childToParent = (childData) => {
   setData(childData)
  }

  return (
    <div className="App">
      <MainContainer data={data} apiKey={myApiKey}></MainContainer>
      <SideContainer childToParent={childToParent} apiKey={myApiKey}/>
    </div>
  );
}

export default App;
