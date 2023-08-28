import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
// Yardımcı fonksiyon: Yeni mesajı oluşturup veritabanına ekler ve ardından mesajları günceller
function sendMessage(senderId, receiverId, content) {
  const currentUser = Meteor.user();
  if (!currentUser) {
    console.error("Kullanıcı oturumu açmamış.");
    return;
  }

  const messageData = {
    sender: currentUser.profile.firstName + " " + currentUser.profile.lastName,
    senderId: senderId,
    receiverId: receiverId,
    timestamp: new Date(),
    content: content,
    messageType: "text",
  };

  Meteor.call("create.PrivateMessages", messageData, (error, result) => {
    if (error) {
      console.error("Hata oluştu:", error);
    } else {
      console.log("Mesaj başarıyla oluşturuldu:", result);
      // Mesaj gönderildikten sonra mesajları güncelle
      updateMessages(senderId, receiverId);

      // İletiyi gönderdikten sonra aşağı kaydır
      scrollToBottom();
    }
  });
}

// Yardımcı fonksiyon: Mesajları günceller
function updateMessages(senderId, receiverId) {
  const currentUser = Meteor.user();
  const chatBox = document.querySelector(".chatBoxMesaages");

  chatBox.innerHTML = ""; // Mevcut mesajları temizle

  const messages = PMess.find(
    {
      $or: [
        { senderId: currentUser._id, receiverId: receiverId },
        { senderId: receiverId, receiverId: currentUser._id },
      ],
    },
    { sort: { timestamp: 1 } }
  ).fetch();

  messages.forEach((message) => {
    const messageDiv = document.createElement("div");

    if (message.senderId === currentUser._id) {
      messageDiv.className = "chatBoxMessaageSend";
    } else {
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
}

// Yardımcı fonksiyon: Sayfayı aşağı kaydırır
function scrollToBottom() {
  const chatBox = document.querySelector(".chatBoxMesaages");
  chatBox.scrollTop = chatBox.scrollHeight;
}

Template.pagesPrivateChat.events({
  "click #chatSend": function (event, template) {
    event.preventDefault();
    const user = Meteor.user();
    if (user) {
      const senderId = user._id;
      const receiverId = customSelect.value;
      const inputElement = document.querySelector(".chatBoxFooterInput");
      const inputValue = inputElement.value;

      console.log("Girilen değer: " + inputValue);

      sendMessage(senderId, receiverId, inputValue);

      // İçeriği temizle
      inputElement.value = "";
    }
  },
  "click #buttonChat": function (event, template) {
    event.preventDefault();
    FlowRouter.go("/chat");
  },
});

Template.pagesPrivateChat.onRendered(function () {
  this.autorun(() => {
    const currentUser = Meteor.user(); // Anlık oturum açmış kullanıcı
    const selectElement = document.getElementById("customSelect");
    selectElement.innerHTML = ""; // Önceki içeriği temizle

    if (currentUser) {
      const usersExceptCurrent = Meteor.users
        .find({ _id: { $ne: currentUser._id } })
        .fetch();

      usersExceptCurrent.forEach((user) => {
        const option = document.createElement("option");
        option.value = user._id;
        option.text = user.profile.firstName + " " + user.profile.lastName;
        selectElement.appendChild(option);
      });

      // Sayfa yüklendiğinde varsayılan alıcıya ait mesajları yükle
      const defaultReceiverId = usersExceptCurrent[0]._id;
      updateMessages(currentUser._id, defaultReceiverId);

      // Sayfayı aşağı kaydır
      scrollToBottom();
    }

    const customSelect = document.getElementById("customSelect");

    customSelect.addEventListener("change", () => {
      const selectedReceiverId = customSelect.value;
      const currentUser = Meteor.user();
      const chatBox = this.find(".chatBoxMesaages");

      chatBox.innerHTML = "";

      const messages = PMess.find(
        {
          $or: [
            { senderId: currentUser._id, receiverId: selectedReceiverId },
            { senderId: selectedReceiverId, receiverId: currentUser._id },
          ],
        },
        { sort: { timestamp: 1 } }
      ).fetch();

      messages.forEach((message) => {
        const messageDiv = document.createElement("div");

        if (message.senderId === currentUser._id) {
          messageDiv.className = "chatBoxMessaageSend";
        } else {
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
});
