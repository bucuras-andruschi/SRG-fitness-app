import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from "../../firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './srg.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react';

const API_KEY='ENTER_API_KEY_HERE';

const ChatSRG = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            message: "Hi, I'm ChatSRG! Let's talk about fitness!",
            sender: 'ChatSRG',
            direction:'incoming'
        }
    ]);
    const [typing, setTyping] = useState(false);

    const handleSend=async(message)=>{
        const newMessage={
            message:message,
            sender:'user',
        }
        const newMessages=[...messages, newMessage];
        setMessages(newMessages);
        setTyping(true);
        await processMessageToChatGPT(newMessages);
    }

    const handleRecipeClick = () => {
        navigate('/home')
    }

    const handleBMIClick=()=>{
        navigate('/bmi')
    }

    const handleAbsClick=()=>{
        navigate('/abs')
    }

    const handleChestClick=()=>{
        navigate('/chest')
    }

    const handleArmClick=()=>{
        navigate('/arm')
    }

    const handleLegClick=()=>{
        navigate('/leg')
    }

    const handleShoulderBackClick=()=>{
        navigate('/shoulderback')
    }

    async function processMessageToChatGPT(chatMessages){
        let apiMessages=chatMessages.map((messageObject)=>{
            let role='';
            if(messageObject.sender==='ChatSRG'){
                role='assistant'
            } else {
                role='user'
            }
            return { role:role, content:messageObject.message }
        });

        const systemMessage={
            role:'system',
            content:'Explain all concepts, and subtly link them to fitness if possible.'
        }

        const apiRequestBody={
            'model':'gpt-3.5-turbo',
            'messages':[
                systemMessage,
                ...apiMessages],
        }

        await fetch('https://api.openai.com/v1/chat/completions',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${API_KEY}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            console.log(data.choices[0].message.content);
            setMessages(
                [...chatMessages,{
                    message:data.choices[0].message.content,
                    sender:'ChatSRG',
                    direction: 'incoming'
                }]
            );
            setTyping(false);
        });
    }

    return(
        <div className='container'>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                            <MenuItem className='sub-item' onClick={handleAbsClick}> <span className='text'>Abs</span> </MenuItem>
                            <MenuItem className='sub-item' onClick={handleChestClick}> <span className='text'>Chest</span> </MenuItem>
                            <MenuItem className='sub-item' onClick={handleArmClick}> <span className='text'>Arm</span> </MenuItem>
                            <MenuItem className='sub-item' onClick={handleLegClick}> <span className='text'>Leg</span> </MenuItem>
                            <MenuItem className='sub-item' onClick={handleShoulderBackClick}> <span className='text'>Shoulder&Back</span></MenuItem>
                        </SubMenu>
                        <MenuItem className='item'>ChatSRG</MenuItem>
                        <MenuItem className='item' onClick={
                            () => {
                                doSignOut().then(() => {
                                    navigate('/login')
                                })
                            }}
                        > Sign out </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
                <div className='chat' >
                    <MainContainer className='b'>
                        <ChatContainer>
                            <MessageList typingIndicator={typing?<TypingIndicator content='ChatSRG is typing'/>:null}>
                                {messages.map((message, index)=>{
                                    return <Message key={index} model={message}/>
                            })}
                            </MessageList>
                            <MessageInput placeholder='Chat with SRG AI' onSend={(message) => handleSend(message)}/>
                        </ChatContainer>
                    </MainContainer>
                </div>
        </div>
    )
}

export default ChatSRG;