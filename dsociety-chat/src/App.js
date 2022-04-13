import { Fragment, useState } from 'react';
import './App.css';
import Bar from './components/bar/Bar';
import Chat from './components/chat/Chat';
import { abi } from "./abi/abi";
import { faucetAbi } from "./abi/faucetAbi";
import { tokenAbi } from "./abi/tokenAbi";

function App() {

  const CONTRACT_ADDRESS = "0xA6cA410d94636189b06C496727D32C5F984B4b0a";
  const FAUCET_CONTRACT_ADDRESS = "0x16894cE57d08c4e75d20AdaF1AfD4F88b2f827aC";
  const TOKEN_CONTRACT_ADDRESS = "0x3e6bfDb3ec7aA5dd0F0C10d57C7b24E27C00a632";

  const [user, setUser] = useState(null);
  const [myContract, setMyContract] = useState(null);
  const [faucetContract, setFaucetContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [signer, setSigner] = useState(null);
  const [myBalance, setMyBalance] = useState("");
  const [roomId, setRoomId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

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
        roomId={roomId}
        setRoomId={setRoomId}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
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
        roomId={roomId}
        setRoomId={setRoomId}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </Fragment>
  );
}

export default App;
