import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

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
    Loading.dots();

    const Question = event.target.addQue.value;
    const QuestionHeader = event.target.addQueHeader.value;

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
      QuestionHeader,
      function (error) {
        if (error) {
          Notify.failure("An error occurred while adding the question:");
        } else {
          Notify.success("Question Added Succesfully");
          // Soru eklendikten sonra yapılacak işlemleri buraya ekleyebilirsiniz
        }
      }
    );
    Loading.remove();
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
