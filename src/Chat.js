import React, {useState,useEffect} from 'react';
import "./Chat.css";
import { IconButton,Avatar } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios'
import {useParams } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import Pusher from 'pusher-js'

function Chat(props) {

    const { roomId } = useParams();
    const [input, setInput] = useState("");
    const [user2, setUser2] = useState("Loading...");
    const [messages,setMessages] = useState([]);
    const [isGroup,setIsGroup] = useState(false);
  

//   useEffect( () => {
//     console.log(roomId)
//         if(roomId)
//         {
             
//         }
//   },[roomId])    


    useEffect(() =>{
        console.log(roomId.substr(0,5))
        if(roomId.substr(0,5)==='group')
        {
            setIsGroup(true);
            axios.post('/group/getname',{username:props.auth.user.username,groupId:roomId})
            .then(response => {
            console.log(response.data.group)
            setUser2(response.data.group)
            console.log("Done1")
            })
            console.log("Done2")
            axios.post('/group/sync',{roomId:roomId})
            .then(resposnse => {
            setMessages(resposnse.data)
            })
        }
        else
        {
            setIsGroup(false);
            axios.post('/chat/getUser',{username:props.auth.user.username,chatId:roomId})
            .then(response => {
            console.log(response.data,response.data.friend)
            setUser2(response.data.friend)
            console.log("Done1")
            })
            console.log("Done2")
            axios.post('/chat/sync',{roomId:roomId})
            .then(resposnse => {
            setMessages(resposnse.data)
            })
        }
    },[roomId])

    useEffect(() => {
        const pusher = new Pusher('8a303e31b3106d3f9a47', {
          cluster: 'ap2'
        });
    
        const channel = pusher.subscribe(roomId.toLowerCase());
        channel.bind('inserted', (newMessage) => {
          // alert(JSON.stringify(newMessage));
          setMessages([...messages, newMessage])
        });
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
    
      }, [messages])

    // var d = new Date();
    // d.setUTCHours(15);
    // console.log(d)
    {console.log(roomId,user2)}
    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(roomId)
        if(isGroup)
        {
            await axios.post('/group/messages/new',{
                roomId: roomId,
                message: input,
                from: props.auth.user.username,
                to: user2,
                timestamp: new Date().toUTCString(),
            });
        }
        else{
            await axios.post('/messages/new',{
                roomId: roomId,
                message: input,
                from: props.auth.user.username,
                to: user2,
                timestamp: new Date().toUTCString(),
            });
        }
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h4>{user2}</h4>
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
                    <p key={message.id} className={`chat_message ${message.from===props.auth.user.username && "chat_reciever"}`}>
                    <span className="chat_name">{message.from}</span>
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