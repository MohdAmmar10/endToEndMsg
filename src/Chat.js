import React, {useState} from 'react';
import "./Chat.css";
import { IconButton,Avatar } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios'
import {useParams } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";


function Chat({messages}) {

    const { roomId } = useParams();
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new',{
            message: input,
            name: 'Ammar',
            timestamp: new Date().toUTCString(),
            received: true,
        });
        setInput("");
    };



    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>    
                </p>
                ))}
{/*                 
                <p className="chat_message chat_reciever">
                    <span className="chat_name">Ammar</span>
                    This is a message
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}    
                    </span>    
                </p>
                <p className="chat_message">
                    <span className="chat_name">Ammar</span>
                    This is a message
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}    
                    </span>    
                </p> */}
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button 
                    onClick={sendMessage}
                     type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

Chat.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Chat);