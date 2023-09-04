import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
Template.pagesAdd.onRendered(function () {
  console.log("*********");
  this.autorun(() => {
    const user = Meteor.user();
    if (!user) return;
    console.log("user: ", user);
    const position = user.profile.position;

    if (position !== "teacher") {
      FlowRouter.go("/unauthorized");
      return;
    }

    // Template.pagesAdd.onRendered(function () {
    //   console.log("*********");
    //   this.autorun(() => {
    //     const user = Meteor.user();
    //     if (!user) return;
    //     console.log("user: ", user);
    //     const position = user.profile.position;

    //     if (position !== "teacher") {
    //       FlowRouter.go("/unauthorized");
    //       return;
    //     }
    //   });
    // });

    console
      .log
      // "meteor: " + Meteor.users.find({ _id: Meteor.userId() }).fetch()[0]
      ();
    const customSelect = document.getElementById("customSelect");
    const selectOption = document.getElementById("cevap"); // Seçilen cevap option'ı
    const questionHeaderInput = document.getElementById(
      "publicPagesAddCreateQuestionHeader"
    ); // Soru başlığı input'u

    const uniqueHeaders = Array.from(
      new Set(
        Que.find()
          .fetch()
          .map((item) => item.header)
      )
    );

    // Önce select öğesine seçenekleri ekleyelim
    customSelect.innerHTML = ""; // Önceki seçenekleri temizle
    uniqueHeaders.forEach((header) => {
      const optionElement = document.createElement("option");
      optionElement.value = header;
      optionElement.text = header;
      customSelect.appendChild(optionElement);
    });

    // Seçenek değiştikçe başlık input'unun içine yaz
    customSelect.addEventListener("change", () => {
      questionHeaderInput.value = customSelect.value;
      const tarih1Input = document.getElementById("tarih1");
      const tarih2Input = document.getElementById("tarih2");
      // Yeni bir tarih oluştur
      const yeniTarih = new Date(); // Şu anki tarih ve saat

      // Tarihi istediğiniz bir tarih ve saatle değiştirin
    });

    // Sayfa yüklendiğinde seçilen seçeneği başlık input'unun içine yaz
    questionHeaderInput.value = customSelect.value;

    // Diğer input alanlarına da benzer şekilde seçenek değerini ekleyebilirsiniz
  });
});

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
    var startDate = event.target.tarih1.value;
    var endDate = event.target.tarih2.value;

    console.log("write quiz header: " + QuestionHeader);
    console.log("değişim öncesi");
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    const queWithQuestionHeader = Que.findOne({ header: QuestionHeader });

    if (queWithQuestionHeader) {
      startDateText = queWithQuestionHeader.startDate;
      startDateText2 = queWithQuestionHeader.endDate;

      // Örnek tarih metnini bir JavaScript Date nesnesine dönüştürün
      const startDate1 = new Date(startDateText);

      // Tarih ve saat bilgisini alın
      const year = startDate1.getFullYear();
      const month = String(startDate1.getMonth() + 1).padStart(2, "0");
      const day = String(startDate1.getDate()).padStart(2, "0");
      const hours = String(startDate1.getHours()).padStart(2, "0");
      const minutes = String(startDate1.getMinutes()).padStart(2, "0");

      // ISO 8601 formatında tarih ve saat oluşturun
      const iso8601Date = `${year}-${month}-${day}T${hours}:${minutes}`;

      console.log(iso8601Date); // Çıktı: 2023-09-07T12:17

      // Örnek tarih metnini bir JavaScript Date nesnesine dönüştürün
      const startDate2 = new Date(startDateText2);

      // Tarih ve saat bilgisini alın
      const year2 = startDate2.getFullYear();
      const month2 = String(startDate2.getMonth() + 1).padStart(2, "0");
      const day2 = String(startDate2.getDate()).padStart(2, "0");
      const hours2 = String(startDate2.getHours()).padStart(2, "0");
      const minutes2 = String(startDate2.getMinutes()).padStart(2, "0");

      // ISO 8601 formatında tarih ve saat oluşturun
      const iso8601Date2 = `${year2}-${month2}-${day2}T${hours2}:${minutes2}`;

      console.log("iso2: " + iso8601Date2); // Çıktı: 2023-09-07T12:17

      startDate = iso8601Date;
      endDate = iso8601Date2;
      Notify.warning("Start and end times adapted to previous questions !");
    } else {
      console.log("QuestionHeader değerine sahip belge bulunamadı.");
    }

    console.log("değişim sonrası");
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    Meteor.call(
      "questions.insert",
      Question,
      [OptionA, OptionB, OptionC, OptionD, OptionE],
      answer,
      QuestionHeader,
      startDate, // Bu bir tarih/datetime string'i olmalı
      endDate, // Bu bir tarih/datetime string'i olmalı
      function (error) {
        if (error) {
          console.log("error: " + error);
          Notify.failure("An error occurred while adding the question:");
        } else {
          Notify.success("Question Added Successfully");
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
