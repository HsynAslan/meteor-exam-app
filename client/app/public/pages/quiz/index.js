import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

let scor = 0;
let questionIndex = 0;

function hasUserTakenQuiz(specificId, header) {
  const results = Res.find({ userID: specificId, lastName: header }).fetch();
  return results.length > 0;
}

Template.pagesQuiz.onRendered(function () {
  console.log("*********");
  this.autorun(() => {
    const user = Meteor.user();
    if (user) {
      specificId = user._id; // Kullanıcının kimliğini al
      const header = FlowRouter.getParam("header");
      console.log("header: " + header);
      if (hasUserTakenQuiz(specificId, header)) {
        console.log("Bu sınava zaten girdiniz");
        FlowRouter.go("/res");
      }
    }

    const headerHData = Que.find({
      header: FlowRouter.getParam("header"),
    }).fetch();
    // questions[questionIndex].question

    $(".question p").text(headerHData[0].question);

    $("#optionA p").text(headerHData[0].choices[0]);
    $("#optionB p").text(headerHData[0].choices[1]);
    $("#optionC p").text(headerHData[0].choices[2]);
    $("#optionD p").text(headerHData[0].choices[3]);
    $("#optionE p").text(headerHData[0].choices[4]);

    Loading.remove();
    // return questions[questionIndex]; // Soruyu göster
  });
});

Template.pagesQuiz.helpers({
  headerData() {
    const header = FlowRouter.getParam("header");
    // header bilgisini ve diğer gerekli verileri döndürün
    // Örneğin, header bilgisini ve soruları buradan döndürebilirsiniz
    return {
      header: header,
      questions: Que.find({ header: header }).fetch(),
      questionIndex: 0,
    };
  },
  question() {
    Loading.dots();

    const headerHData = Que.find({
      header: FlowRouter.getParam("header"),
    }).fetch();
    // questions[questionIndex].question

    $(".question p").text(headerHData[0].question);

    $("#optionA p").text(headerHData[0].choices[0]);
    $("#optionB p").text(headerHData[0].choices[1]);
    $("#optionC p").text(headerHData[0].choices[2]);
    $("#optionD p").text(headerHData[0].choices[3]);
    $("#optionE p").text(headerHData[0].choices[4]);

    Loading.remove();
    // return questions[questionIndex]; // Soruyu göster
  },
});

Template.pagesQuiz.events({
  "submit form[name=questionForm]": function (event, template) {
    Loading.dots();
    event.preventDefault();

    const selectedChoice = event.target.option.value;

    const choices = ["a", "b", "c", "d", "e"];
    const selectedChoiceIndex = parseInt(selectedChoice);
    // ankara yerine 0 dönmelisin
    //
    const selectedChoiceLetter = choices[selectedChoiceIndex];
    //
    const question = Que.find({
      header: FlowRouter.getParam("header"),
    }).fetch()[questionIndex];
    const correctAnswer = question.answer;

    // seçtiğim cevabı bulma yeri

    let boolA = document.getElementById("idA").checked;
    let boolB = document.getElementById("idB").checked;
    let boolC = document.getElementById("idC").checked;
    let boolD = document.getElementById("idD").checked;
    let boolE = document.getElementById("idE").checked;

    let selectedAnswer = "";
    if (boolA == true) {
      //
      selectedAnswer = "a";
      document.getElementById("idA").checked = false;
    } else if (boolB == true) {
      selectedAnswer = "b";
    } else if (boolC == true) {
      selectedAnswer = "c";
    } else if (boolD == true) {
      selectedAnswer = "d";
    } else if (boolE == true) {
      selectedAnswer = "e";
    }

    if (selectedAnswer === correctAnswer) {
      scor +=
        100 /
        Que.find({
          header: FlowRouter.getParam("header"),
        }).count();
    } else {
    }

    questionIndex++;
    document.getElementById("idA").checked = false;
    document.getElementById("idB").checked = false;
    document.getElementById("idC").checked = false;
    document.getElementById("idD").checked = false;
    document.getElementById("idE").checked = false;
    Loading.remove();
    console.log("questionIndex: " + questionIndex);
    console.log(
      "que: " +
        Que.find({
          header: FlowRouter.getParam("header"),
        }).count()
    );

    if (
      Que.find({
        header: FlowRouter.getParam("header"),
      }).count() ==
      questionIndex + 1
    ) {
      // "Next Question" butonunu seçin
      const nextQuestionButton = document.getElementById("nextQuesitonButton");

      // Butonun metnini "sınavı bitir" olarak değiştirin
      nextQuestionButton.textContent = "Finish the Exam";
    }
    if (
      questionIndex >=
      Que.find({
        header: FlowRouter.getParam("header"),
      }).count()
    ) {
      // dbe kullanıcı sına vsonucunu yazmalıyız

      const user = Meteor.user();
      if (user) {
        //
        //
        //
        //
      }

      Meteor.call(
        "result.insert",
        scor,
        user._id,
        user.profile.firstName,
        user.profile.lastName,
        // ***
        FlowRouter.getParam("header"),
        function (error) {
          if (error) {
          } else {
            // Soru eklendikten sonra yapılacak işlemleri buraya ekleyebilirsiniz
          }
        }
      );
      nextQuestionButton.textContent = "Next Question";
      //flowrouter ile sınav sonucuna bakmalı
      FlowRouter.go("public.res");
    } else {
      // //

      const headerHData = Que.find({
        header: FlowRouter.getParam("header"),
      }).fetch();

      // headerHData[0].choices[0]
      // const oldAOption = headerHData[questionIndex--].choices[0];
      // const oldBOption = headerHData[questionIndex--].choices[1];
      // const oldCOption = headerHData[questionIndex--].choices[2];
      // const oldDOption = headerHData[questionIndex--].choices[3];
      // const oldEOption = headerHData[questionIndex--].choices[4];
      template.$("#questionNumber").text(questionIndex + 1);

      // const newQuestion = Que.find({
      //   header: FlowRouter.getParam("header"),
      // }).fetch()[questionIndex];

      // //
      // //
      // question.choices[0] = newQuestion.choices[0];

      template.$(".question p").text(headerHData[questionIndex].question);
      // Güncellenmiş cevap seçeneklerini değiştirme işlemi
      // const newChoices = newQuestion.choices;
      $("#optionA p").text(headerHData[questionIndex].choices[0]);
      $("#optionB p").text(headerHData[questionIndex].choices[1]);
      $("#optionC p").text(headerHData[questionIndex].choices[2]);
      $("#optionD p").text(headerHData[questionIndex].choices[3]);
      $("#optionE p").text(headerHData[questionIndex].choices[4]);
      //
      //

      for (let i = 0; i < choices.length; i++) {
        // //

        // template.$(`#choices${i + 1}`).text(newChoices[i]);
        template.$(`#choices${i + 1}`).val(i);
      }
    }
  },
});
