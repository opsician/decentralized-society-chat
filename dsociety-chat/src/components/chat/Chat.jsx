import { Fragment, useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import { MenuList, MenuItem, Container, Paper, Typography, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, FormControl, TextField, IconButton } from "@mui/material";
import './Chat.css';
import SendIcon from '@mui/icons-material/Send'
import TokenIcon from '@mui/icons-material/Token';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { ethers } from "ethers";

export default function Chat({
    user, 
    setUser, 
    myContract, 
    setMyContract, 
    myPublicKey, 
    setMyPublicKey,
    contractABI,
    CONTRACT_ADDRESS,
    FAUCET_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    tokenABI,
    faucetContract,
    setFaucetContract,
    tokenContract,
    setTokenContract,
    faucetABI,
    signer,
    setSigner,
    myBalance,
    setMyBalance,
    roomId,
    setRoomId,
    roomIdRef,
    chatMessages,
    setChatMessages,
    chatMessagesRef
}){
    const scrollBottomRef = useRef(null);
    const [message, setMessage] = useState("");
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        chatMessagesRef.current = chatMessages;
        if(scrollBottomRef.current){
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    useEffect(() => {
        getMessage();
        getRoomName(roomId);
        roomIdRef.current = roomId;
        if(scrollBottomRef.current){
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [roomId]);

    const listChatMessages = chatMessages.map((chatMessage, index) =>
        <ListItem key={index}>
            <ListItemText primary={`${chatMessage.msg}`} secondary={`${chatMessage.name}: ${chatMessage.timeStamp}`}/>
        </ListItem>
    );

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const isFloat = (n) => {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>=0;
    }

    function isPositiveInteger(str) {
        if (typeof str !== 'string') {
          return false;
        }
      
        const num = Number(str);
      
        if (Number.isInteger(num) && num >= 0) {
          return true;
        }
      
        return false;
    }

    // Sends messsage to a user 
    const sendMessage = async () => {
        if(user && myPublicKey) {
            await myContract.sendMessage( message );
            setMessage("");
        }else{
            alert("You must sign in with Metamask!");
        }
    }

    // Fetch chat messages
    const getMessage = async () => {
        console.log("Getting messages");
        let messages = [];
        // Get messages
        const data = await myContract.readMessage(1000);
        data.forEach( ( item ) => {
            const timestamp = new Date( 1000*item[2].toNumber() ).toUTCString();
            messages.push({ "name": item[0], "publicKey": item[1], "timeStamp": timestamp, "msg": item[3] });
        });
        setChatMessages(messages);
        if(scrollBottomRef.current){
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const getRoomName = async (roomId) => {
        const _roomName = await myContract.rooms(roomId);
        setRoomName(`${_roomName[0]} #${roomId}`);
    }

    const getTokens = async () => {
        if( myPublicKey && signer && FAUCET_CONTRACT_ADDRESS){
            const contract = new ethers.Contract( FAUCET_CONTRACT_ADDRESS, faucetABI, signer );
            setFaucetContract( contract );
            contract.request()
                .then(console.log)
                .catch((res) => alert(res.data.message));
        }else{
            alert("You must sign in with Metamask.");
        }
    }

    const makeDeposit = async () => {
        if( myPublicKey && signer && TOKEN_CONTRACT_ADDRESS && CONTRACT_ADDRESS){
            const _tokenContract = new ethers.Contract( TOKEN_CONTRACT_ADDRESS, tokenABI, signer );
            const _myContract = new ethers.Contract( CONTRACT_ADDRESS, contractABI, signer );
            let amount = prompt('Enter number of tokens to allow', '0.01');
            if ( !isFloat( amount ) ){
                alert("Input must be a float greater than 0 e.g. 0.01");
                return false;
            }
            let allowance = await _myContract.getAllowance();
            allowance = ethers.utils.formatEther( allowance );
            if (parseFloat(allowance) === parseFloat(amount)){
                alert("Your allowance has already been set to this value");
                return false;
            }
            amount = ethers.utils.parseUnits(amount, 18);
            await _tokenContract.approve(CONTRACT_ADDRESS, amount);
        }else{
            alert("You must sign in with Metamask.");
        }
    }

    const createRoom = async () => {
        if( user && myPublicKey ){
            const _roomName = prompt('Enter a room name', 'New Room'); 
            const _roomId = await myContract.createRoom(_roomName);
        }else{
            alert("You must sign in with Metamask.");
        }
    }

    const joinRoom = async () => {
        if( user && myPublicKey ){
            let _roomId = prompt('Enter a room ID', '0');
            if ( !isPositiveInteger(_roomId) ){
                alert("Input must be an integer greater than or equal to 0");
                return false;
            }
            const joinedRoom = await myContract.joinRoom(parseInt(_roomId));
        }else{
            alert("You must sign in with Metamask.");
        }
    }

    return (
        <Fragment>
            <Container disableGutters>
                <Grid container spacing={1} alignItems="center" alignItems="stretch">
                    <Grid id="chat" sm={9} xs={12} item>
                        <Paper elevation={5}>
                            <Box p={3}>
                                <Typography variant="subscript2" gutterBottom>
                                    {roomName}
                                </Typography>
                                <Divider />
                                <Grid container spacing={1} alignItems="center">
                                    <Grid id="chat-window" xs={12} item>
                                        <List id="chat-window-messages">
                                            {listChatMessages}
                                            <ListItem ref={scrollBottomRef}></ListItem>
                                        </List>

                                    </Grid>
                                    <Grid xs={11} item>
                                        <FormControl fullWidth>
                                            <TextField 
                                                onChange={handleMessageChange}
                                                multiline={true}
                                                rows="2"
                                                value={message}
                                                label="Type your message..."
                                                variant="outlined"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={1}item>
                                        <IconButton
                                            onClick={sendMessage}
                                            aria-label="send"
                                            color="primary">
                                                <SendIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid id="faucet" sm={3} xs={12} item>
                        <Paper elevation={5}>
                            <Box p={3}>
                                {user !== null
                                    ? <Typography variant="subtitle2" gutterBottom>Name: {user}</Typography>
                                    : <Typography variant="subtitle2" gutterBottom>Please Log In...</Typography>
                                }
                                {user !== null
                                    ? <Typography variant="subtitle2" gutterBottom>Allowance: {myBalance} DST</Typography>
                                    : <Typography variant="subtitle2" gutterBottom></Typography>
                                }
                                <Divider /> 
                                <Grid container spacing={1} alignItems="center">
                                    <MenuList>
                                        <MenuItem onClick={getTokens}>
                                            <ListItemIcon>
                                                <TokenIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Request DST</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={makeDeposit}>
                                            <ListItemIcon>
                                                <AccountBalanceWalletIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Set Allowance</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={createRoom}>
                                            <ListItemIcon>
                                                <MeetingRoomIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Create Room</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={joinRoom}>
                                            <ListItemIcon>
                                                <ArrowForwardIosIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Join Room</ListItemText>
                                        </MenuItem>
                                    </MenuList>   
                                </Grid>
                                <Divider />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}