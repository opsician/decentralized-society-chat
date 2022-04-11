import { Fragment, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import ChatIcon from "@mui/icons-material/Chat";
import { ethers } from "ethers";

export default function Bar({ 
    user, 
    setUser, 
    myContract, 
    setMyContract, 
    myPublicKey, 
    setMyPublicKey,
    contractABI,
    CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    tokenABI,
    setTokenContract,
    signer,
    setSigner,
    myBalance,
    setMyBalance
}){

    const [showConnectButton, setShowConnectButton] = useState("block");

    // Login to Metamask and check the if the user exists else creates one
    async function login() {
        let res = await connectToMetamask();
        if( res === true ) {
            let provider = new ethers.providers.Web3Provider( window.ethereum );
            let signer = provider.getSigner();
            try {
                setSigner( signer );
                const contract = new ethers.Contract( CONTRACT_ADDRESS, contractABI, signer );
                setMyContract( contract );
                const _tokenContract = new ethers.Contract( TOKEN_CONTRACT_ADDRESS, tokenABI, signer );
                setTokenContract( _tokenContract );
                const address = await signer.getAddress();         
                let present = await contract.checkUserExists( address );
                let username;
                if( present )
                    username = await contract.getUsername( address );
                else {
                    username = prompt('Enter a username', 'Guest'); 
                    if( username === '' ) username = 'Guest';
                    await contract.createAccount( username );
                }
                setUser( username );
                setMyPublicKey( address );
                let _balance = await contract.getAllowance();
                setMyBalance(ethers.utils.formatEther(_balance).toString());
                setShowConnectButton( "none" );
                alert("Connected!");
            } catch(err) {
                alert("CONTRACT_ADDRESS not set properly!");
            }
        } else {
            alert("Couldn't connect to Metamask");
        }    
    }

    // Check if the Metamask connects 
    async function connectToMetamask() {
        try {
            await window.ethereum.enable();
            return true;
        } catch(err) {
            return false;
        }
    }

    return(
        <Fragment>
            <Box mb={2}>
                <AppBar position="static">
                    <Toolbar>
                        <Box mr={2}>
                            <ChatIcon fontSize={'large'} />
                        </Box>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            DSociety Chat
                        </Typography>
                        <Button onClick={login} variant="outlined" color="inherit">
                            Connect
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    )
}