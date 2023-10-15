document.addEventListener("DOMContentLoaded", function() {
    var css = `
        #chatbot-messages {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .chatbot-message {
            margin: 5px 0;
            padding: 10px;
            border-radius: 5px;
            width: fit-content;
            font-family: 'Arial', sans-serif;
        }
        .user-message {
            background-color: #8a2be2;
            color: white;
            align-self: flex-end;
        }
        .bot-message {
            background-color: #333;
            color: #8a2be2;
            align-self: flex-start;
        }
    `;

    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);

    document.body.innerHTML += `
        <div id="chatbot-widget" style="display: none; position: fixed; bottom: 0; right: 0; width: 300px; border: 1px solid #8a2be2; background-color: #000; z-index: 1000;">
            <div id="chatbot-header" style="background-color: #8a2be2; color: white; padding: 10px; text-align: center; font-family: 'Arial', sans-serif; font-size: 16px;">
                TechBot
                <span id="chatbot-close" style="cursor: pointer; float: right;">&times;</span>
            </div>
            <div id="chatbot-body" style="padding: 10px;">
                <div id="chatbot-messages" style="height: 200px; overflow-y: auto;"></div>
                <input type="text" id="chatbot-input" style="width: calc(100% - 20px); padding: 10px; margin: 10px 0; border: 1px solid #8a2be2; border-radius: 4px; color: #8a2be2;" placeholder="Type a message...">
            </div>
        </div>
        <div id="chatbot-toggle" style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: url('your_gif.gif') center/cover no-repeat; border-radius: 25px; cursor: pointer; z-index: 1000;"></div>
    `;

    document.getElementById('chatbot-toggle').addEventListener('click', function(){
        document.getElementById('chatbot-widget').style.display = 'block';
        this.style.display = 'none';
    });

    document.getElementById('chatbot-close').addEventListener('click', function(){
        document.getElementById('chatbot-widget').style.display = 'none';
        document.getElementById('chatbot-toggle').style.display = 'block';
    });

    document.getElementById('chatbot-input').addEventListener('keypress', function(e){
        if(e.key === 'Enter' && this.value.trim() !== ''){
            let messageDiv = document.createElement('div');
            messageDiv.classList.add('chatbot-message', 'user-message');
            messageDiv.textContent = this.value.trim();
            document.getElementById('chatbot-messages').appendChild(messageDiv);
            this.value = '';
            this.placeholder = 'Loading...';
            this.disabled = true;
            getBotReply(messageDiv.textContent.toLowerCase());
        }
    });

    function getBotReply(message) {
        const basicResponses = {
            "hello": "Hi! How can I help you today?",
            "hi": "Hello! Need some assistance?",
            "asalam o alikum": "Wa Alaikum Assalam! How may I assist you?",
            "bye": "Goodbye! Have a great day!"
        };
        let reply = basicResponses[message] || "Sorry, I don't understand.";
        
        setTimeout(() => {
            let botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('chatbot-message', 'bot-message');
            botMessageDiv.textContent = reply;
            document.getElementById('chatbot-messages').appendChild(botMessageDiv);
            document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
            document.getElementById('chatbot-input').placeholder = 'Type a message...';
            document.getElementById('chatbot-input').disabled = false;
        }, 1000);
    }
});
