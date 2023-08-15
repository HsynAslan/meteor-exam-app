import { FlowRouter } from "meteor/ostrio:flow-router-extra";
Template.pagesQuiz.helpers({
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

Template.pagesQuiz.events({
  "submit form": function (event, template) {
    event.preventDefault();

    Meteor.logout(function (error) {
      if (error) {
        console.log("Çıkış yaparken hata oluştu:", error);
      } else {
        FlowRouter.go("public.home");
        // href="{{pathFor 'public.home'}}"
        console.log("Kullanıcı başarıyla çıkış yaptı.");

        // İstenirse başka işlemler yapılabilir veya yönlendirme yapılabilir.
      }
    });
  },
});
