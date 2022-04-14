// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         this.socket = io.connect('http://localhost:3000');

//         if (this.userEmail){
//             this.connectionHandler();
//         }

//     }


//     connectionHandler(){
//         this.socket.on('connect', function(){
//             console.log('connection established using sockets...!');
//         });
//     }
// }

class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:3000');

        if(this.userEmail){
            this.connectionHandler()
        }
    }

    connectionHandler(){
        let self = this;

        self.socket.on('connect',function () {
            console.log('io connection established');
            
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial',
            })

            self.socket.on('user_joined',function (data) {
                console.log('a user joined!',data);
            })
        })
        
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val()

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                })
            }
        })

        self.socket.on('recieve_message',function (data) {
            console.log('message recieved',data.message);

            let newMessage = $('<li>');

            let msgType = 'other-message';

            if(data.user_email==self.userEmail){
                msgType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html':data.message
            }))

            // newMessage.append($('<sub>',{
            //     'html':data.user_email
            // }))
            
            newMessage.addClass(msgType)

            $('#chat-messages-list').append(newMessage)
            $('#chat-message-input').val('')
            
        })
    }
} 