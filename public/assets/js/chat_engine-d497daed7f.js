class ChatEngine{constructor(e,s){this.chatBoxId=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:3000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;e.socket.on("connect",(function(){console.log("io connection established"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined!",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codeial"})})),e.socket.on("recieve_message",(function(s){console.log("message recieved",s.message);let o=$("<li>"),t="other-message";s.user_email==e.userEmail&&(t="self-message"),o.append($("<span>",{html:s.message})),o.addClass(t),$("#chat-messages-list").append(o),$("#chat-message-input").val("")}))}}