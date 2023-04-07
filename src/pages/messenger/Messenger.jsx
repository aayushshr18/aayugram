import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Msg from "../../components/msg/Msg";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
    const [conversations, setconversations] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentchat, setcurrentchat] = useState({})
    const [messages, setmessages] = useState([]);
    const [arrivalmessages, setarrivalmessages] = useState(null);
    const [newmsg, setnewmsg] = useState("");
    const scrollref = useRef();
    const socket = useRef();

    useEffect(() => {
      socket.current=io("ws://localhost:8900");
      socket.current.on("getMessage",data=>{
        setarrivalmessages({
            sender:data.senderId,
            text:data.text,
            createdAt:Date.now()
        })
      })
    }, [])
    
    useEffect(()=>{
        arrivalmessages&&
        currentchat.members.includes(arrivalmessages.sender)&&
        setmessages((prev)=>[...prev,arrivalmessages]);
    },[arrivalmessages,currentchat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            console.log(users);
        })
    }, [user])


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setconversations(res.data);
            } catch (error) {
                console.log(error)
            }

        };
        getConversations();


    }, [user._id]);

    useEffect(() => {
        const getMsgs = async () => {
            try {
                const res = await axios.get("/messages/" + currentchat._id);
                setmessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMsgs();
    }, [currentchat]);



    const handleChatSend = async (e) => {
        e.preventDefault();
        const msg = {
            sender: user._id,
            text: newmsg,
            conversationId: currentchat._id
        };
        const recieverId=currentchat.members.find(m=>m!==user._id);
        socket.current.emit("sendMessage",{
            senderId:user._id,
            recieverId,
            text:newmsg
        })
        try {
            const res = await axios.post("/messages", msg);
            setmessages([...messages], res.data);
            setnewmsg("");


        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        scrollref.current?.scrollIntoView({ behavior: "smooth" })
    }, [newmsg,messages])



    return (
        <>
            <Topbar />

            <div className="messenger">
                <div className="chatmenu">
                    <div className="chatmenuwrapper">
                        <input type="text" placeholder="Search For Friends..." className="cminput" />
                        <div className="converwrapper">
                            {conversations.map((c) => (

                                <div key={c._id} className="" onClick={() => { setcurrentchat(c) }}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="chatbox">
                    <div className="chatboxwrapper">
                        {currentchat ?
                            <div>
                                <div className="cboxtop">
                                    {
                                        messages.map((m) => (
                                            <div ref={scrollref} key={m._id}>
                                                <Msg  message={m} currentUser={user} currentchat={currentchat} />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="cboxbottom">
                                    <textarea onChange={(e) => { setnewmsg(e.target.value) }} value={newmsg} placeholder="What's Up?" className="chatmsginput"></textarea>
                                    <button onClick={handleChatSend} className="chatsbtbtn">Send</button>
                                </div></div> : <span className="nochat">Click on Chat to start Messaging</span>}
                    </div>
                </div>

            </div>

        </>

    )
}
