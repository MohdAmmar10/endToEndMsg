import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat"
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { SearchOutlined } from "@material-ui/icons";
import axios from './axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import SendIcon from '@material-ui/icons/Send';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
  

function Sidebar(props) {


    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }
      
      function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 600,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));


    const [chats,setChats] = useState([]);
    const [friend, setFriend] = useState("");
    const [check, setCheck] = useState("");
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [group,setGroup] = useState("");
    const [allgroups,setAllGroups] = useState([]);
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState("");
    const [error,setError] = useState("");
    
    const classes = useStyles();

    
    {console.log(props)}

    useEffect(() => {
        axios.post('/chat/all',{username:props.auth.user.username})
        .then(resposnse => {
          console.log(resposnse.data)
          setChats(resposnse.data)
        })
        axios.post('/group/all',{username:props.auth.user.username})
        .then(resposnse => {
          console.log(resposnse.data)
          setAllGroups(resposnse.data)
        })
      },[check])

      useEffect(() => {
        axios.post('/chat/realtime',{username:props.auth.user.username})
        .then(resposnse => {
          console.log(resposnse.data)
        })
      },[check])
    
      for(let i of chats){
        console.log(Object.keys(i),i[Object.keys(i)])
    }

    const createGroup = async (e) => {
        e.preventDefault();
        console.log(users,group,props.auth.user.username)
        if(users.length===0)
        {
            setError("Please add users");
        }
        else if(group!="")
        {
            await axios.post('/group/create',{
                admin: props.auth.user.username,
                users: users,
                groupname:group
            })
            .then(resposnse => {
                console.log(resposnse.data)
                setCheck("Fd")
                setGroup("")
                setOpen(false)
            })
        }
        else
        {
            setError("Please enter groupname");
        }


    }

    const sendFriend = async (e) => {
        e.preventDefault();

        // console.log(roomId)
        // var rstr = JSON.stringify(roomId)
        // console.log(rstr)
        // var usernames = rstr.substr(5)
        // console.log(usernames)
        // var user2 = usernames.replace(props.auth.user.username,"")
        // console.log(user2)
        await axios.post('/chat/find',{
            username: props.auth.user.username,
            username2: friend
        })
        .then(resposnse => {
            console.log(resposnse.data)
            let check= resposnse.data.friend
            console.log("check",check)
            // new chat me empty
            // realtime no refresh
            if(check === 'absent')
            {
                console.log("in",check)
                axios.post('/chat/check',{
        
                    username2: friend
                })
                .then(res => {
                    console.log(res.data)
                    // setCheck(resposnse.data.friend)
                    if(res.data === 'Found')
                    {
                        console.log("Starting create")
                        axios.post('/chat/create',{
                            username: props.auth.user.username,
                            username2: friend
                        })
                        .then(resposnse => {
                            console.log(resposnse.data)
                            setCheck("Fd")
                            // setCheck(resposnse.data.friend)
                            
                        });
                    }
                    else{
                        console.log("User not exist")
                    }
        
                });
            }
            else{
                console.log("User is already friend")
            }

        });
        
        setFriend("");
    };

    const addUser = async (e) => {
        e.preventDefault();
        setError("");
        if(users.includes(user))
        {
            setError("User already added");
            setUser("");
        }
        else if(user === props.auth.user.username)
        {
            setError("You are already added");
            setUser("");
        }
        else
        {
            await axios.post('/chat/check',{
                username2: user
            })
            .then(res => {
                console.log(res.data)
                // setCheck(resposnse.data.friend)
                if(res.data === 'Found')
                {
                    setUsers(users => [...users, user]);
                    console.log("Added")
                    setUser("");
                                                        
                }
                else
                {
                    setError("User does not exist");
                    console.log("User not exist")
                }
            });
        }
        setFriend("");
    };

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                {console.log(chats)}
                <Avatar /> <h6>{props.auth.user.username}</h6>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <GroupAddIcon onClick={handleOpen}/>
                    </IconButton>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div  style={modalStyle} className={classes.paper} >
            <form>
                    <input placeholder="Enter Group Name"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    type="text" />
                    <div className="sidebar_searchContainer">
                        {error}
                    <SearchOutlined />
                    <input placeholder="Enter username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    type="text" />
                    <button 
                    onClick={addUser}
                     type="submit">
                    <SendIcon/>
                    </button>

                    <button 
                    onClick={createGroup}
                     type="submit">
                         Create Group
                    </button>
                </div>
            </form>
            </div>
            </Modal>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Start new chat"
                    value={friend}
                    onChange={(e) => setFriend(e.target.value)}
                    type="text" />
                    <button 
                    onClick={sendFriend}
                     type="submit">
                    <SendIcon/>
                    </button>
                </div>
            </div>
            <div className="sidebar_chats">
                {chats.map((chat)=>(
                    <SidebarChat key={chat.id} name={Object.keys(chat)}  chatID={chat[Object.keys(chat)]} />
                ))}
                {allgroups.map((group)=>(
                    <SidebarChat key={group.id} chatID={Object.keys(group)}  name={group[Object.keys(group)]} />
                ))}
            </div>
        </div>
    )
}
Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Sidebar);