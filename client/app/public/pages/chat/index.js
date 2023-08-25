Template.publicPageChat.onRendered(function () {
  const messagesContainer = this.find(".chatBoxMesaages");
  // autorun kullanarak mesajları izleme
  this.autorun(() => {
    const messagesCount = Mess.find().count();
    if (messagesCount > 0) {
      Tracker.afterFlush(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    }

    const messages = Mess.find({}, { sort: { timestamp: 1 } }).fetch();
    const user = Meteor.user();
    const chatBox = this.find(".chatBoxMesaages");

    // Mesajları temizleme
    chatBox.innerHTML = "";

    // Mesajları görüntüleme
    messages.forEach((message) => {
      const messageDiv = document.createElement("div");

      // Kullanıcının mesajını sağ tarafta görüntüleme
      if (
        message.sender ===
        user.profile.firstName + " " + user.profile.lastName
      ) {
        console.log(
          "mesage.sender == user====>" +
            message.sender +
            "==" +
            user.profile.firstName +
            " " +
            user.profile.lastName
        );
        messageDiv.className = "chatBoxMessaageSend";
      } else {
        console.log(
          "mesage.sender != user====>" +
            message.sender +
            "!=" +
            user.profile.firstName +
            " " +
            user.profile.lastName
        );
        messageDiv.className = "chatBoxMessaage";
      }

      const messageContent = document.createElement("p");
      messageContent.textContent = message.content;

      const messageSet = document.createElement("div");
      messageSet.className = "chatBoxMessaageSet";

      const sender = document.createElement("p");
      sender.textContent = message.sender;

      const timestamp = document.createElement("p");
      timestamp.textContent = message.timestamp.toLocaleTimeString();

      messageSet.appendChild(sender);
      messageSet.appendChild(timestamp);

      messageDiv.appendChild(messageContent);
      messageDiv.appendChild(messageSet);

      chatBox.appendChild(messageDiv);
    });
  });
});

Template.publicPageChat.helpers({
  create: function () {},
  rendered: function () {},
  destroyed: function () {},
});
Template.publicPageChat.events({
  "submit form": function (event, template) {
    event.preventDefault();
    const user = Meteor.user();
    console.log("sender: " + user.profile.firstName);
    const inputText = event.target.chatText.value;
    console.log("content: " + inputText);

    // Örnek mesaj verileri
    const newMessage = {
      sender: user.profile.firstName + " " + user.profile.lastName,
      timestamp: new Date(),
      content: inputText,
      messageType: "text",
    };

    // Mesajı sunucuya göndermek için Meteor.call kullanımı
    Meteor.call("create.message", newMessage, (error, result) => {
      if (error) {
        console.error("Hata oluştu:", error);
      } else {
        console.log("Mesaj başarıyla oluşturuldu.");
        event.target.chatText.value = "";
      }
    });
  },
});
