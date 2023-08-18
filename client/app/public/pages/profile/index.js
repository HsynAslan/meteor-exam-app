import { FlowRouter } from "meteor/ostrio:flow-router-extra";
Template.pagesProfile.helpers({});
let index = 0;
Template.pagesProfile.events({
  "click #seeProfile": function (event, template) {
    const user = Meteor.user();
    if (user) {
      console.log("User _id:", user._id); // Kullanıcının _id değerini konsola yazdırın
      console.log("user mail: ", user.emails[0].address); // e posta veriyor
      console.log("user name: ", user.profile.firstName);
      console.log("user lastname: ", user.profile.lastName);
      //   console.log("user password: ", user.profile.Accounts.setPassword(userId, newPassword););
    }

    if (index % 2 == 0) {
      $("#profileName").text(user.profile.firstName);
      $("#profileLastName").text(user.profile.lastName);
      $("#profileMail").text(user.emails[0].address);
    } else {
      $("#profileName").text("***Name***");
      $("#profileLastName").text("***Surname***");
      $("#profileMail").text("***E-Mail***");
    }
    index++;
  },
  "click #resetPassButton": function (event, template) {
    FlowRouter.go("resetPass");
  },
  "click #logoutButton": function (event, template) {
    Meteor.logout(function (error) {
      if (error) {
        console.log("Logout error:", error);
      } else {
        console.log("User logged out");
        FlowRouter.go("public.login");
      }
    });
  },
});
