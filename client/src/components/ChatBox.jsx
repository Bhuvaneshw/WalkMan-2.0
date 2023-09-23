import Title from "./Title.jsx";
import Icons from "./Icons.js";
import {useEffect, useRef, useState} from "react";
import Text from "./Text.jsx";
import {getSocket} from "./util.js";

export default function ChatBox() {
    const [msg, setMsg] = useState("");
    const [showChat, setShowChat] = useState(false)
    const [data, setData] = useState([
        // {email: 'admin@gmail.com', name: 'Bhuvanesh', msg: 'Hi', time: '11:31 PM'},
    ])
    const scroll = useRef();
    useEffect(() => {
        scroll.current.children[scroll.current.children.length - 1]?.scrollIntoView({behavior: "smooth"})
    }, [data]);
    let socket = getSocket();

    socket.onHandleMsg = item => {
        setData([...data, item]);
    }

    audio.isChatBoxOpened = () => {
        return showChat;
    }

    function sendMessage() {
        let date = new Date();
        let data = {
            email: localStorage.getItem('email'),
            name: localStorage.getItem('name'),
            msg: msg,
            time: date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
        };
        socket.emit("sendMsg", data);
        setMsg("");
    }

    return <>
        <div style={{
            width: '60px',
            height: '60px',
            position: 'fixed',
            top: "calc(100vh - 90px)",
            right: '30px',
            cursor: 'pointer',
            background: 'white',
            boxShadow: '0 0 30px 10px #b7b7b7',
            padding: '10px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} onClick={() => {
            setShowChat(true);
        }}>
            <Icons.CHAT size={'75%'}/>
        </div>
        <div style={{
            background: 'white',
            boxShadow: '0 0 50px 16px #b7b7b7',
            position: 'fixed',
            top: 'calc(100vh - 520px)',
            right: '10px',
            maxWidth: '400px',
            minWidth: '280px',
            width: 'calc(100% - 20px)',
            height: '500px',
            borderRadius: '30px',
            display: showChat ? 'block' : 'none',
        }}>
            <div style={{
                width: '100%',
                background: '#f0f0f0',
                padding: "15px",
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
            }}>
                <Title variant={'primary'}>Group Chat</Title>
                <Icons.CLOSE size={'30px'} style={{
                    padding: '8px',
                    cursor: 'pointer'
                }} onClick={() => {
                    setShowChat(false)
                }}/>
            </div>
            <div style={{
                height: 'calc(100% - 60px)',
                display: 'flex',
                flexDirection: 'column',
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '30px',
            }}>
                <div ref={scroll} style={{width: '100%', padding: '0 15px', flex: '1', overflowY: "auto"}}>
                    {data.map(item => {
                        if (item.email === localStorage.getItem('email')) {
                            return <div style={{
                                background: '#ECEDEF',
                                padding: '10px 15px',
                                borderRadius: '8px',
                                width: '60%',
                                margin: '20px 0 20px auto'
                            }}>
                                <Title variant={'primary'}>{item.name}</Title>
                                <Text style={{margin: '0 10px'}}>{item.msg}</Text>
                                <Text style={{
                                    margin: '0 10px',
                                    textAlign: 'right',
                                    fontSize: '12px',
                                    color: '#0008'
                                }}>{item.time}</Text>
                            </div>
                        } else {
                            return <div style={{
                                background: '#ECEDEF',
                                padding: '10px 15px',
                                borderRadius: '8px',
                                width: '60%',
                                margin: '20px 0'
                            }}>
                                <Title style={{color: '#f65200'}}>{item.name}</Title>
                                <Text style={{margin: '0 10px'}}>{item.msg}</Text>
                                <Text style={{
                                    margin: '0 10px',
                                    textAlign: 'right',
                                    fontSize: '12px',
                                    color: '#0008'
                                }}>{item.time}</Text>
                            </div>
                        }
                    })}
                </div>
                <div style={{
                    background: '#E9E0F4', width: 'calc(100% - 20px)', margin: '10px', display: 'flex',
                    borderRadius: '20px',
                    overflow: 'hidden'
                }}>
                    <input value={msg} onChange={e => setMsg(e.target.value)} style={{
                        background: 'transparent',
                        padding: '10px',
                        border: "none",
                        outline: 'none',
                        flex: '1'
                    }}/>
                    <button onClick={sendMessage} style={{
                        background: '#5F04A7',
                        padding: '0 15px',
                        color: 'white'
                    }}>Send
                    </button>
                </div>
            </div>
        </div>
    </>
}