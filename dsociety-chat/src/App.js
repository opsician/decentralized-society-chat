import { Fragment, useState } from 'react';
import './App.css';
import Bar from './components/bar/Bar';
import Chat from './components/chat/Chat';
import { abi } from "./abi";

function App() {

  const CONTRACT_ADDRESS = "0x04ae423787350B29A3BA715e260fdDF8CFB26d62";
  const [user, setUser] = useState(null);
  const [myContract, setMyContract] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);

  return (
    <Fragment>
      <Bar 
        user={user} 
        setUser={setUser} 
        myContract={myContract}
        setMyContract={setMyContract}
        myPublicKey={myPublicKey}
        setMyPublicKey={setMyPublicKey}
        contractABI={abi}
        CONTRACT_ADDRESS={CONTRACT_ADDRESS}
      />
      <Chat 
        user={user} 
        setUser={setUser} 
        myContract={myContract}
        setMyContract={setMyContract}
        myPublicKey={myPublicKey}
        setMyPublicKey={setMyPublicKey}
        contractABI={abi}
        CONTRACT_ADDRESS={CONTRACT_ADDRESS}      
      />
    </Fragment>
  );
}

export default App;
