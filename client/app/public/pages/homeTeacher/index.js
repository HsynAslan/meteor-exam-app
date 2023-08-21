import { event } from "jquery";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

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
    console.log("Buttona bastınız");
    event.preventDefault();

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
        if (error) {
          console.log("error : ", error);
        } else {
          console.log("user created : ", result);
          FlowRouter.go("/quiz");
        }
      });
    } else {
      console.log("Passwords do not match.");
    }
  },
});
