import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
Template.pagesAdd.helpers({
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

Template.pagesAdd.events({
  "submit form": function (event, template) {
    event.preventDefault();
    console.log("Soru gönderme tuşuna bastınız");

    const Question = event.target.addQue.value;

    const OptionA = event.target.addQueOptionA.value;
    const OptionB = event.target.addQueOptionB.value;
    const OptionC = event.target.addQueOptionC.value;
    const OptionD = event.target.addQueOptionD.value;
    const OptionE = event.target.addQueOptionE.value;

    const answer = event.target.addQueAnswer.value;

    Meteor.call(
      "questions.insert",
      Question,
      [OptionA, OptionB, OptionC, OptionD, OptionE],
      answer,
      function (error) {
        if (error) {
          console.log("Soru eklenirken bir hata oluştu:", error.reason);
        } else {
          console.log("Soru başarıyla eklendi");
          // Soru eklendikten sonra yapılacak işlemleri buraya ekleyebilirsiniz
        }
      }
    );
    // Input alanlarını temizle
    event.target.addQue.value = "";
    event.target.addQueOptionA.value = "";
    event.target.addQueOptionB.value = "";
    event.target.addQueOptionC.value = "";
    event.target.addQueOptionD.value = "";
    event.target.addQueOptionE.value = "";
    event.target.addQueAnswer.value = "";
  },
});
