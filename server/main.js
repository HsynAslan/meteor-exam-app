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
