import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  // const user = { name: "asdsa", surname: "asdsad" };
  // Exams.insert(user);
});

Meteor.methods({
  "users.login": function (email, password) {
    const user = Meteor.users.findOne({ "emails.address": email });

    if (!user) {
      throw new Meteor.Error("user-not-found", "Kullanıcı bulunamadı.");
    }

    const isValidPassword = Accounts._checkPassword(user, password);

    if (!isValidPassword) {
      throw new Meteor.Error("invalid-password", "Geçersiz şifre.");
    }

    return user._id;
  },
});

// Sunucu tarafında (server/main.js gibi bir dosyada)
Meteor.methods({
  "questions.insert": function (
    question,
    choices,
    answer,
    header,
    startDate,
    endDate
  ) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Oturum açmış kullanıcı gerekli"
      );
    }

    // JavaScript tarih nesneleri oluşturun
    const createdAt = new Date();
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    Que.insert({
      question: question,
      choices: choices,
      answer: answer,
      header: header,
      createdAt: createdAt,
      createdBy: this.userId,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    });
  },
});

Meteor.methods({
  "result.insert": function (scor, userID, catagory, firstName, lastName) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Oturum açmış kullanıcı gerekli"
      );
    }

    Res.insert({
      scor: scor,
      userID: userID,
      catagory: catagory,
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date(),
      createdBy: this.userId,
    });
  },
});

Meteor.methods({
  "create.message": function (messageData) {
    // Yeni mesajı oluşturmak için verileri alıyoruz
    const { sender, timestamp, content, messageType } = messageData;

    // Mesajı koleksiyona ekleme
    Mess.insert({
      sender: sender,
      timestamp: timestamp,
      content: content,
      messageType: messageType,
    });
  },
});
Meteor.methods({
  "create.PrivateMessages": function (messageData) {
    // Yeni mesajı oluşturmak için verileri alıyoruz
    const { sender, senderId, receiverId, timestamp, content, messageType } =
      messageData;

    // Mesajı koleksiyona ekleme
    PMess.insert({
      sender: sender,
      senderId: senderId,
      receiverId: receiverId,
      timestamp: timestamp,
      content: content,
      messageType: messageType,
    });
  },
});
