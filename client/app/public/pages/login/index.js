import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Accounts } from "meteor/accounts-base";
import { error } from "jquery";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Template.pagesLogin.helpers({
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

Template.pagesLogin.events({
  "submit form": function (event, template) {
    event.preventDefault();
    Loading.dots();

    const emailAddress = event.target.loginMail.value;
    const password = event.target.loginPassword.value;

    Meteor.loginWithPassword(emailAddress, password, function (error) {
      Loading.remove();
      if (error) {
        Notify.failure("Failed Login");

        return;
      }
      const redirect = FlowRouter.getQueryParam("redirect");

      if (redirect) {
        FlowRouter.go(redirect);
      } else {
        FlowRouter.go("public.quizHeader");
        Notify.success("Login Success");
      }
    });
  },
});
