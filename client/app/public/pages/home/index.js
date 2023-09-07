import { event } from "jquery";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Template.pagesHome.helpers({
  create: function () {
    const self = this;
  },
  rendered: function () {
    const self = this;
  },
  destroyed: function () {
    const self = this;
  },
  upperCase: function (name) {
    return name?.toUpperCase();
  },
});

Template.pagesHome.onRendered(function () {
  console.log("*********");
  this.autorun(() => {
    const user = Meteor.user();
    if (!user) return;
    console.log("user: ", user);
    const position = user.profile.position;
    if (user) {
      FlowRouter.go("/quizHeader");
    }
  });
});

Template.pagesHome.events({
  "submit form": function (event, template) {
    event.preventDefault();
    Loading.dots();
    const emailAddress = event.target.createMail.value;
    const password = event.target.createPassword.value;
    const nameU = event.target.createName.value;
    const surnameU = event.target.createSurname.value;
    const passwordA = event.target.createPasswordAgain.value;

    if (password === passwordA) {
      const obj = {
        email: emailAddress,
        password: password,
        profile: {
          firstName: nameU,
          lastName: surnameU,
          position: "student",
        },
      };

      Accounts.createUser(obj, function (error, result) {
        Loading.remove();
        if (error) {
          console.log();
          Notify.failure("Invalid Login İnformation");
        } else {
          FlowRouter.go("/quizHeader");
          Notify.success("User Created");
        }
      });
    } else {
      Notify.failure("Passwords do not match.");
    }
  },
});
