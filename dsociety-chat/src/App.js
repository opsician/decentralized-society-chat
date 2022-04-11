import { Fragment, useState } from 'react';
import './App.css';
import Bar from './components/bar/Bar';
import Chat from './components/chat/Chat';
import { abi } from "./abi";
import { faucetAbi } from "./faucetAbi";
import { tokenAbi } from "./tokenAbi";

function App() {

  const CONTRACT_ADDRESS = "0x8b068f4664A3f7cC8849EF36FD750c878b8a4Ee4";
  const FAUCET_CONTRACT_ADDRESS = "0x16894cE57d08c4e75d20AdaF1AfD4F88b2f827aC";
  const TOKEN_CONTRACT_ADDRESS = "0x3e6bfDb3ec7aA5dd0F0C10d57C7b24E27C00a632";
  const [user, setUser] = useState(null);
  const [myContract, setMyContract] = useState(null);
  const [faucetContract, setFaucetContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [signer, setSigner] = useState(null);
  const [myBalance, setMyBalance] = useState("");

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
        TOKEN_CONTRACT_ADDRESS={TOKEN_CONTRACT_ADDRESS}
        tokenABI={tokenAbi}
        setTokenContract={setTokenContract}  
        signer={signer}
        setSigner={setSigner}
        myBalance={myBalance}
        setMyBalance={setMyBalance}
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
        FAUCET_CONTRACT_ADDRESS={FAUCET_CONTRACT_ADDRESS}
        TOKEN_CONTRACT_ADDRESS={TOKEN_CONTRACT_ADDRESS}
        tokenABI={tokenAbi}
        faucetContract={faucetContract}
        setFaucetContract={setFaucetContract}
        tokenContract={tokenContract}
        setTokenContract={setTokenContract}  
        faucetABI={faucetAbi} 
        signer={signer}
        setSigner={setSigner}
        myBalance={myBalance}
        setMyBalance={setMyBalance}
      />
    </Fragment>
  );
}

export default App;
