// import { Button } from "bootstrap";
import React, { useState } from "react";
import { ChatBody, ChatHead, ChatMessage } from "./style";
import { analyze } from "../ReplyComponent/Reply";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as ProductService from '../../services/ProductService'

import ChatMessageComponent from "../ChatMessageComponent/ChatMessageComponent";
import ChatMessageComponentAi from "../ChatMessageComponent Ai/ChatMessageComponent";
var checkAi = false;
var aiResponse = []

export default function ChatBot() {
    const genAI = new GoogleGenerativeAI('AIzaSyBroKbVBW9I2iEBsw5OV4yKJx6K0jMEUd4');  
    const [messages,setMessages] = useState([
        {
            message : "Tôi Là Chatbot ! Bạn Muốn Build Bộ PC Như Thế Nào ?",
        },
    ])

    const [text,setText] = useState("")

    async function aiRun(textApi) {
        const res = await ProductService.getAllAiProduct()
        console.log("res : ",res.data)
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        var prompt;
        var check = textApi.includes("PC")
        console.log("Check : ",check)
        if(textApi.includes("PC")){
            aiResponse = res.data
            checkAi = true
            console.log("ai respone : ",aiResponse)
            prompt = `Build bộ PC với các dữ liệu Sau : ${res.data.map((product) => product.name + ' với giá ' + product.price)}`
            console.log("prompt : ",prompt)
        }else{
            prompt = `${textApi}`
            checkAi = false
        }
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text
    }
 
    const onSend = async () => {
        const textAi = await aiRun(text)
        let list = [...messages,{message:text,user : true}]
        //const reply = analyze(aiResponse)
        list = [...list,{message : textAi}]
        console.log("List : ",list)
        await setMessages(list)
        // if(list.length > 2){
        //     const reply = analyze(aiResponse)
        //     list = [...list,{message : reply}]
        // }else{
        //     list = [
        //         ...list,
        //         {
        //             message : `Hi ${text}`
        //         },
        //         {
        //             message : 'How can i help you ?'
        //         }
        //     ]
        // }
        await setText("")
        setTimeout(() => {
            document.querySelector("#copyright").scrollIntoView();
        },1000)
    }

    return(
        <div>
            <ChatHead className="d-flex align-items-center justify-content-center">
                <img src="https://ecpvn.com/wp-content/uploads/2021/08/bi-quyet-trien-khai-chatbot-hieu-qua-cho-doanh-nghiep-2-1280x720.jpg" alt="logo" width={200} height={200} style={{borderRadius: '990px'}} />
                <h2 className="text-primary">ChatBot</h2>
            </ChatHead>
            <ChatMessage>
                {
                    checkAi ? <ChatMessageComponentAi arr={aiResponse}/>  : ( messages.length > 0 && messages.map((data) => <div style={{fontSize:'12px' , fontWeight:'bold'}} className="text-center">{<ChatMessageComponent {...data} />}</div>) )
                }
                <ChatBody>
                    <input type="text" style={{width : "100%" , borderRadius:'20px'}} value={text} onChange={(e) => setText(e.target.value) }/>
                    {/* <Button type="button" className="ms-3">Gửi</Button> */}
                    <button style={{ width:'45px' ,borderRadius: '7px' , marginLeft:'8px' , backgroundColor:'#0866ff' , color:"#fff" , cursor:'pointer'}} className="btn-send" onClick={onSend}>Gửi</button>
                </ChatBody>
                <div id="copyright" style={{fontSize:'12px' , fontWeight:'bold' , marginTop:'15px' , textAlign:'center'}}>ChatBot from ComputerShop</div>
            </ChatMessage>
        </div>
    )
} 