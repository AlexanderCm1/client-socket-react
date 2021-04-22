import React, { Component,Fragment } from 'react';
import './css/chat.css';

import io from 'socket.io-client';


let socket;
const CONNECTION_PORT = 'localhost:3001/';

class Chat extends Component {
    constructor(props){
        super(props);
        console.log('1.-constructor');
        this.state = {
            //Antes del logeo
            loggedIn : false,
            room : '',
            userName: '',
            //despues del logeo
            message : '',
            time : '',
            messageList : [],
            listUsers: [],
            //acciones del bot

        }

    }


    componentDidMount(){
       console.log("3.- component did mount");
       socket = io(CONNECTION_PORT);


       //aqui recibimos el mensaje
        socket.on('receive_message', (data) =>{
            this.setState({ messageList : [...this.state.messageList, data]});

        });

    //    socket.on('time', (data) =>{
    //        this.setState( { time: data.time });
    //    })


        socket.on('message', (data) =>{
            this.setState({ messageList : [...this.state.messageList, data] })
        })

        socket.on('room_users', (data) =>{
           this.setState({ listUsers: data.users });
        })



    }
    componentDidUpdate(){

        console.log('actualizando');



    }
    // componentWillUnmount(){
    //     console.log('murio');
    // }
    connectToRom = () =>{
        this.setState({ loggedIn: true });
        socket.emit('join_room', {username: this.state.userName, room : this.state.room});
        //cuando queremos enviar data usamos emit 
        //como parametros  pasamos el nombre del socket y la data
    }
    sendMessage = async (e) =>{
        e.preventDefault();

        let messageContent = {
            //solo necesitamos saber el room en el backend
            room: this.state.room,
            content : {
                author: this.state.userName,
                message: this.state.message,
                time : this.state.time
            }
        }
        //enviamos los datos
        await socket.emit('send_message', messageContent);


        // lista de todos los mensajes
        // this.setState({ messageList : [...this.state.messageList,messageContent.content ], message: "" });
        this.setState({ message : "" });

    }




    render() {
        console.log("2.-render");
        return (
            <Fragment>
            {!this.state.loggedIn ? 
                (
                    <section className="container px-5 sm:w-96 m-auto flex flex-col">
                        <i className="fas || 
                        fa-dragon || 
                        self-center ||
                        text-white || 
                        m-3 ||
                        text-5xl"></i>
                        <input 
                        className="border ||
                        rounded-md ||
                        mx-10 ||
                        my-2 ||
                        md:h-10
                        text-center"
                        type="text" 
                        name="username" 
                        placeholder="Username..." 
                        autoComplete="off"
                        onChange={(e) =>{ this.setState({ userName : e.target.value }) } }/>
                        <input 
                        className="border || 
                        rounded-md ||
                        mx-10 ||
                        my-2 ||
                        md:h-10
                        text-center"
                        type="text" 
                        name="room" 
                        placeholder="Room..."
                        autoComplete="off"
                        onChange={(e) => {this.setState({ room : e.target.value })}}/>
                        <button
                        className="w-max
                        self-center
                        border
                        border-red-100
                        rounded-2xl
                        mt-2
                        text-white
                        p-2" 
                        type="button" 
                        onClick={this.connectToRom}>Enter chat</button>
                    </section>
                ) : (
                    <> 
                    <section className="container flex flex-col sm:mx-auto w-screen px-5 sm:p-0 my-auto sm:w-2/4 h-96 content-between">



                        <div className="bg-red-50 basis h-5/6 border rounded-xl overflow-y-scroll border-black">
                            <p className="text-center bg-black text-white"><i class="fab fa-intercom"></i> {this.state.room} <i class="fab fa-intercom"></i> </p>
                            {this.state.messageList.map( (value,key) =>{
                                return (
                                    <div className={`flex ||
                                    h-auto
                                    ${value.author === this.state.userName ? "justify-start" : "justify-end"} ||
                                   
                                    `}
                                    key= {key}>
                                        <div className={` 
                                        w-36
                                        sm:w-40
                                        md:w-48 ||
                                        lg:w-60 
                                        ${value.author === this.state.userName ? "bg-you" : "bg-other text-white"} ||
                                        m-2
                                        rounded-lg
                                        flex
                                        flex-wrap
                                        flex-col
                                        font-san
                                        h-auto || 
                                        `}>
                                        <span className="text-sm || 
                                        border-b || 
                                        border-pink-800"> {`${value.author} ${value.time}` } </span>
                                        <span className=" flex 
                                        flex-wrap
                                        justify-center ||
                                        content-center ||
                                        h-auto
                                        break-all
                                        p-2

                                        ">{value.message} </span>
                                        
                                        </div>
                                    </div>

                                )
                            })}

                        </div>


                        <form className="w-full mt-auto flex" onSubmit={this.sendMessage}>
                            <input type="text" name="message" className="flex-auto h-10 border focus:border-yellow-900 rounded-xl focus:outline-none" value={this.state.message}
                            onChange={(e) => { this.setState({ message: e.target.value }) }}/>
                            <button type="submit" className="cursor-pointer text-center w-12"><i className="fas fa-dragon"></i> </button>
                        </form>



                    </section>
                    <ul className="container w-80 mx-5 mb-16 sm:w-3/6 sm:mx-auto border grid grid-cols-4 auto-rows-fr border-yellow-300 break-all ">
                                {this.state.listUsers.map( (value,key) =>{
                                    return (
                                        <li key={key} className="p-3 text-white">
                                            {value.username + '\u00A0'} <i className="fas fa-circle text-point text-xs"></i>
                                        </li>
                                    )


                                })
                                    
                                }

                    </ul>    
        
                    </>

                ) 

            }



            </Fragment>
        )
    }
}


export default Chat; 