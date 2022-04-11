// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DSocietyChat is AccessControl {

    event NewMessage(string name, address sender, uint256 timestamp, string msg);

    uint public messageCost = 0.01 * 10 ** 18;
    
    // stores the default name of an user
    struct user {
        string name;
    }

    // message construct stores the single chat message and its metadata
    struct message {
        string name;
        address sender;
        uint256 timestamp;
        string msg;
    }

    // Collection of users registered on the application
    mapping(address => user) userList;
    // Collection of messages communicated between users
    message[] allMessages;

    // Token Contract
    IERC20 public DSocial;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setDSocialContract(address _address) public onlyRole(DEFAULT_ADMIN_ROLE) {
        DSocial = IERC20(_address);
    }
    
    // It checks whether a user(identified by its public key)
    // has created an account on this application or not
    function checkUserExists(address pubkey) public view returns(bool) {
        return bytes(userList[pubkey].name).length > 0;
    }
    
    // Registers the caller(msg.sender) to our app with a non-empty username
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender)==false, "User already exists!");
        require(bytes(name).length>0, "Username cannot be empty!"); 
        userList[msg.sender].name = name;
    }
    
    // Returns the default name provided by an user
    function getUsername(address pubkey) public view returns(string memory) {
        require(checkUserExists(pubkey), "User is not registered!");
        return userList[pubkey].name;
    }

    function getContractTokenBalance() public view onlyRole(DEFAULT_ADMIN_ROLE) returns(uint256){
        return DSocial.balanceOf(address(this));
    }

    function getAllowance() public view returns(uint256){
        return DSocial.allowance(msg.sender, address(this));
    }
    
    // Sends a new message to the room
    function sendMessage(string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first!");
        require(bytes(_msg).length>0, "Message cannot be empty!");
        require(getAllowance() >= messageCost, "Please deposit more tokens before transferring");
        DSocial.transferFrom(msg.sender, address(this), messageCost);
        string memory name = getUsername(msg.sender);
        message memory newMsg = message(name, msg.sender, block.timestamp, _msg);
        allMessages.push(newMsg);
        emit NewMessage(name, msg.sender, block.timestamp, _msg);
    }
    
    // Returns all the chat messages communicated in a channel
    function readMessage() external view returns(message[] memory) {
        return allMessages;
    }

}