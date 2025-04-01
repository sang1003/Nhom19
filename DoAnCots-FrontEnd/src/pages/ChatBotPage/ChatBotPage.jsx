import React from "react"
import ChatBot from "../../components/ChatBotComponent/ChatBotComponent"
import HeaderComponent from '../../components/HeaderCompoent/HeaderComponent';
// import 'bootstrap/dist/css/bootstrap.min.css'

const ChatBotPage = () => {
    return(
        <div>
            <HeaderComponent isHiddenSearch/>
            <ChatBot/>
        </div>
    )
}

export default ChatBotPage

