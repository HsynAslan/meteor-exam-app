import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

import { Notify } from "notiflix/build/notiflix-notify-aio";

Template.pagesProfile.helpers({});
let index = 0;
Template.pagesProfile.events({
  "click #seeProfile": function (event, template) {
    const user = Meteor.user();
    if (user) {
      //
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
    Loading.dots();
    FlowRouter.go("resetPass");
    Loading.remove();
  },
  "click #logoutButton": function (event, template) {
    Loading.dots();
    Meteor.logout(function (error) {
      if (error) {
        Notify.success("Logout unsuccess");
      } else {
        FlowRouter.go("public.login");
        Notify.success("Logout Success");
      }
    });
    Loading.remove();
  },
});
