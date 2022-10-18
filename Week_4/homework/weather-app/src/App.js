import './App.css';
import { useState } from 'react';
import MainContainer from './MainContainer';
import SideContainer from './SideContainer'

function App() {

  const myApiKey = "6dc87f0d902ad7e89bffc74e3ba537ef";

  const [data, setData] = useState('');

  const handleDataChange = (childData) => {
   setData(childData)
   console.log("data was transferred")
  }

  return (
    <div className="App">
      <MainContainer data={data} apiKey={myApiKey}></MainContainer>
      <SideContainer handleChange={handleDataChange} apiKey={myApiKey}/>
    </div>
  );
}

export default App;
