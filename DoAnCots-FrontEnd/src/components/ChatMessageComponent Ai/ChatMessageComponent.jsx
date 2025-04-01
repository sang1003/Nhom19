import React from "react";
//import {ChatDots , Person} from "react-bootstrap-icons"
import {MessageOutlined, UserOutlined} from '@ant-design/icons';
import {ChatMessage2, Message_Left, Message_Right, Message_Text } from "./style";
import ProductDetailsComponent from "../ProductDetailsAiComponent/ProductDetailsComponent";

const ChatMessageComponentAi = ({props , arr}) => {
    return(
        <ChatMessage2>
            {
                
                <Message_Left>
                    <MessageOutlined />
                    <Message_Text>Cửa Hàng Chúng Tôi Hiện Tại Có Các Sản Phẩm :</Message_Text>
                    <Message_Text style={{marginLeft:'5px'}}>{arr.map((product) => <ProductDetailsComponent idProduct={product._id} />)}</Message_Text>
                </Message_Left>
                
            }
        </ChatMessage2>
    )
}

export default ChatMessageComponentAi