import { Fragment, useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import { MenuList, MenuItem, Container, Paper, Typography, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, FormControl, TextField, IconButton } from "@mui/material";
import './Chat.css';
import SendIcon from '@mui/icons-material/Send'
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import TokenIcon from '@mui/icons-material/Token';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Chat({
    user, 
    setUser, 
    myContract, 
    setMyContract, 
    myPublicKey, 
    setMyPublicKey,
    contractABI,
    CONTRACT_ADDRESS
}){

    const ENTER_KEY_CODE = 13;
    const scrollBottomRef = useRef(null);
    
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    const [roomId, setRoomId] = useState("");


    useEffect(() => {
        if(myPublicKey){
            getMessage();
            myContract.on("NewMessage", (name, sender, timestamp, msg) => {
                const _timestamp = new Date( 1000*timestamp.toNumber() ).toUTCString();
                const messageAdd = [...chatMessages, {
                        name: name,
                        publicKey: sender,
                        timeStamp: _timestamp,
                        msg: msg
                    }
                ]
                setChatMessages(messageAdd);
                if(scrollBottomRef.current){
                    scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' })
                }
            });
        }
    }, [myPublicKey]);

    const listChatMessages = chatMessages.map((chatMessage, index) =>
        <ListItem key={index}>
            <ListItemText primary={`${chatMessage.msg}`} secondary={`${chatMessage.name}: ${chatMessage.timeStamp}`}/>
        </ListItem>
    );

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    // Sends messsage to an user 
    const sendMessage = async () => {
        if(user && message) {
            await myContract.sendMessage( message );
            setMessage("");
        }else{
            alert("You must connect with Metamask to the AVAX test network!");
        }
    }

    // Fetch chat messages
    const getMessage = async () => {
        let messages = [];
        // Get messages
        const data = await myContract.readMessage();
        data.forEach( ( item ) => {
            const timestamp = new Date( 1000*item[2].toNumber() ).toUTCString();
            messages.push({ "name": item[0], "publicKey": item[1], "timeStamp": timestamp, "msg": item[3] });
        });
        setChatMessages(messages);
        if(scrollBottomRef.current){
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleEnterKey = (event) => {
        if (event.keyCode === ENTER_KEY_CODE){
            sendMessage();
        }
    }

    return (
        <Fragment>
            <Container disableGutters>
                <Grid container spacing={1} alignItems="center" alignItems="stretch">
                    <Grid id="chat" sm={9} xs={12} item>
                        <Paper elevation={5}>
                            <Box p={3}>
                                <Typography variant="h6" gutterBottom>
                                    General
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
                                <Typography variant="h6" gutterBottom>
                                    Control Panel
                                </Typography>
                                <Divider /> 
                                <Grid container spacing={1} alignItems="center">
                                    <MenuList>
                                        <MenuItem onClick={()=>alert('hello')}>
                                            <ListItemIcon>
                                                <TokenIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Request DST</ListItemText>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <MeetingRoomIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Create Room</ListItemText>
                                        </MenuItem>
                                        <MenuItem>
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