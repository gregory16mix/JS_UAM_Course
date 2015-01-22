UAM.Messages = {
    newMessage : function(content,time) {
        document.getElementById("messages").textContent = content;
    },

    clear : function() {
        document.getElementById("messages").textContent = "";
    }
};