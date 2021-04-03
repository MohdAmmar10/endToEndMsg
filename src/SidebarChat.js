import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core'

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar src=""/>
            <div className="sidebarChat_info">
                <h2>ROOM NAME</h2>
                <p>last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
