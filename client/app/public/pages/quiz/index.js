import { FlowRouter } from "meteor/ostrio:flow-router-extra";

let scor = 0;
let questionIndex = 0;

Template.pagesQuiz.helpers({
  question() {
    // console.log("sayfa yüklendi sa");
    const questions = Que.find().fetch();

    $(".question p").text(questions[questionIndex].question);

    $("#optionA p").text(questions[questionIndex].choices[0]);
    $("#optionB p").text(questions[questionIndex].choices[1]);
    $("#optionC p").text(questions[questionIndex].choices[2]);
    $("#optionD p").text(questions[questionIndex].choices[3]);
    $("#optionE p").text(questions[questionIndex].choices[4]);
    // return questions[questionIndex]; // Soruyu göster
  },
});

Template.pagesQuiz.events({
  "submit form[name=questionForm]": function (event, template) {
    event.preventDefault();

    const selectedChoice = event.target.option.value;
    const choices = ["a", "b", "c", "d", "e"];
    const selectedChoiceIndex = parseInt(selectedChoice);
    // ankara yerine 0 dönmelisin
    // console.log("selectedChoice: " + selectedChoice);
    const selectedChoiceLetter = choices[selectedChoiceIndex];
    // console.log("selectedChoiceIndex: " + selectedChoiceIndex);
    const question = Que.find().fetch()[questionIndex];
    const correctAnswer = question.answer;

    // seçtiğim cevabı bulma yeri

    let boolA = document.getElementById("idA").checked;
    let boolB = document.getElementById("idB").checked;
    let boolC = document.getElementById("idC").checked;
    let boolD = document.getElementById("idD").checked;
    let boolE = document.getElementById("idE").checked;

    let selectedAnswer = "";
    if (boolA == true) {
      // console.log("a işaretlediniz");
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

    // console.log("seçtiğiniz cevap: " + selectedChoiceLetter);
    // console.log("doğru cevap: " + correctAnswer);
    if (selectedAnswer === correctAnswer) {
      // console.log("Doğru cevap!");
      scor += 100 / Que.find().count();
      console.log("new scor: " + scor);
    } else {
      // console.log("Yanlış cevap!");
    }

    questionIndex++;
    document.getElementById("idA").checked = false;
    document.getElementById("idB").checked = false;
    document.getElementById("idC").checked = false;
    document.getElementById("idD").checked = false;
    document.getElementById("idE").checked = false;
    if (questionIndex >= Que.find().count()) {
      // console.log("Quiz tamamlandı!");
      // console.log("Your Scor: " + scor);

      // dbe kullanıcı sına vsonucunu yazmalıyız

      const user = Meteor.user();
      if (user) {
        console.log("User _id: calldan önce", user._id); // Kullanıcının _id değerini konsola yazdırın
      }

      Meteor.call("result.insert", scor, user._id, function (error) {
        if (error) {
          console.log("Soru eklenirken bir hata oluştu:", error.reason);
        } else {
          console.log("Soru başarıyla eklendi");
          // Soru eklendikten sonra yapılacak işlemleri buraya ekleyebilirsiniz
        }
      });
      //flowrouter ile sınav sonucuna bakmalı
      FlowRouter.go("public.res");
    } else {
      // // console.log("soru arttırmadan önce a şıkkı: " + question.choices[0]);
      const oldAOption = question.choices[0];
      const oldBOption = question.choices[1];
      const oldCOption = question.choices[2];
      const oldDOption = question.choices[3];
      const oldEOption = question.choices[4];
      template.$("#questionNumber").text(questionIndex + 1);
      const newQuestion = Que.find().fetch()[questionIndex];

      // // console.log("question.choices[0]: " + question.choices[0]);
      // // console.log("newQuestion.choices[0]: " + newQuestion.choices[0]);
      question.choices[0] = newQuestion.choices[0];

      template.$(".question p").text(newQuestion.question);
      // Güncellenmiş cevap seçeneklerini değiştirme işlemi
      const newChoices = newQuestion.choices;
      $("#optionA p").text(newChoices[0]);
      $("#optionB p").text(newChoices[1]);
      $("#optionC p").text(newChoices[2]);
      $("#optionD p").text(newChoices[3]);
      $("#optionE p").text(newChoices[4]);
      // console.log("------>" + choices[0]);
      // console.log("======>" + newQuestion.choices[0]);
      for (let i = 0; i < choices.length; i++) {
        // // console.log(`#choices${i}`);

        template.$(`#choices${i + 1}`).text(newChoices[i]);
        template.$(`#choices${i + 1}`).val(i);
      }
    }
  },
});
