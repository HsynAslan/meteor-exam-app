import { event } from "jquery";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Template.pagesHomeTeacher.helpers({
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

Template.pagesHomeTeacher.events({
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
          position: "teacher",
        },
      };

      Accounts.createUser(obj, function (error, result) {
        Loading.remove();
        if (error) {
          Notify.failure("Invalid Login İnformation");
        } else {
          FlowRouter.go("/quiz");
          Notify.success("User Created");
        }
      });
    } else {
      Notify.failure("Passwords do not match.");
    }
  },
});
