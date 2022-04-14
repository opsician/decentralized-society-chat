import { Fragment, useState, useRef } from 'react';
import './App.css';
import Bar from './components/bar/Bar';
import Chat from './components/chat/Chat';
import { abi } from "./abi/abi";
import { faucetAbi } from "./abi/faucetAbi";
import { tokenAbi } from "./abi/tokenAbi";

function App() {

  const CONTRACT_ADDRESS = "0x5F6E13F14aA3A54B0D9a8010f71AbF72b13D8996";
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
  const roomIdRef = useRef();
  roomIdRef.current = roomId;
  const [chatMessages, setChatMessages] = useState([]);
  const chatMessagesRef = useRef();
  chatMessagesRef.current = chatMessages;

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
        roomIdRef={roomIdRef}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        chatMessagesRef={chatMessagesRef}
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
        roomIdRef={roomIdRef}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        chatMessagesRef={chatMessagesRef}
      />
    </Fragment>
  );
}

export default App;
