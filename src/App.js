import React , {useState} from 'react';
import Navbar from './components/Navbar';
import MainMint from './components/MainMint';
import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  
    return (
     <div className='overlay'>
       <div className="App">
        <Navbar accounts={accounts} setAccounts={setAccounts}/>
        <MainMint accounts={accounts} setAccounts={setAccounts}/>
      
      </div>
      <div className='moving-bg'></div>
     </div>
    );
  
}

export default App;
