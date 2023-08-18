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
  "questions.insert": function (question, choices, answer) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Oturum açmış kullanıcı gerekli"
      );
    }

    Que.insert({
      question: question,
      choices: choices,
      answer: answer,
      createdAt: new Date(),
      createdBy: this.userId,
    });
  },
});
Meteor.methods({
  "result.insert": function (scor, userID) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Oturum açmış kullanıcı gerekli"
      );
    }

    Res.insert({
      scor: scor,
      userID: userID,
      createdAt: new Date(),
      createdBy: this.userId,
    });
  },
});
