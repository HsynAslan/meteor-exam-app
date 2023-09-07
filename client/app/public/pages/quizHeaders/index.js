import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

Template.pagesQuizHeader.onRendered(function () {
  this.autorun(() => {});
});

function hasUserTakenQuiz(specificId, header) {
  const results = Res.find({ userID: specificId, lastName: header }).fetch();
  return results.length > 0;
}

Template.pagesQuizHeader.helpers({
  quizStatus(quiz) {
    if (quiz.header === "Soru yok") {
      // Eğer başlık "Soru yok" ise hiçbir şey göstermeyin
      return "";
    }

    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);
    const currentDate = new Date();

    const user = Meteor.user();
    let specificId;
    if (user) {
      specificId = user._id; // Kullanıcının kimliğini al
    }

    if (hasUserTakenQuiz(specificId, quiz.header)) {
      console.log("Bu sınava zaten girdiniz");
      return "Bu sınava zaten girdiniz";
    }

    if (currentDate < startDate) {
      // Sınav başlamamış, kalan zamanı hesapla
      const timeDifference = startDate - currentDate;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Sınav süresini hesapla
      const duration = calculateDuration(startDate, endDate);

      return `Sınava Kalan Zaman: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye `;
    } else if (currentDate <= endDate) {
      // Sınav süresi içinde, sınavı yapabilir
      return "Sınava giriş yapabilirsiniz.";
    } else {
      // Sınav süresi dolmuş
      return "";
    }
  },

  quizStatus2(quiz) {
    if (quiz.header === "Soru yok") {
      // Eğer başlık "Soru yok" ise hiçbir şey göstermeyin
      return "";
    }

    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);
    const currentDate = new Date();

    if (currentDate < startDate) {
      // Sınav başlamamış, kalan zamanı hesapla
      const timeDifference = startDate - currentDate;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Sınav süresini hesapla
      const duration = calculateDuration(startDate, endDate);
      const duration2 = duration;
      return `Sınav Süresi:  ${duration.days} gün, ${duration.hours} saat, ${duration.minutes} dakika`;
    } else if (currentDate <= endDate) {
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir
      // Sınav süresi içinde, sınavı yapabilir

      return "";
    } else {
      // Sınav süresi dolmuş, ve kullanıcı daha önce sınavı tamamlamamış
      if (!hasUserTakenQuiz(Meteor.userId(), quiz.header)) {
        // document.getElementById("quizHeaderEx2").style.borderBottom =
        //   "1px solid black";
        // document.getElementById("quizHeaderEx2").style.borderTop =
        //   "0px solid black";
        return "Sınav Süresi Doldu !";
      }
      // Eğer kullanıcı sınava zaten girmişse, başka bir mesaj göstermeyin
      return "";
    }
  },

  isQuizAvailable(quiz) {
    const startDate = new Date(quiz.startDate); // Sınavın başlama tarihini alın
    const endDate = new Date(quiz.endDate); // Sınavın başlama tarihini alın
    const currentDate = new Date(); // Şu anki tarihi alın

    if (startDate < currentDate && endDate > currentDate) {
      // Sınavın başlama tarihi şu andan daha ileri bir tarihtedir, bu nedenle link gitmemeli
      return true;
    } else {
      // Sınav başlamıştır, link normal şekilde çalışmalıdır
      return false;
    }
  },

  distinctHeaders() {
    Loading.dots();
    const quizzes = Que.find().fetch();
    const uniqueHeaders = [];

    quizzes.forEach((item) => {
      // Kalan zamanı hesapla
      const remainingTime = calculateRemainingTime(item.startDate);

      if (
        !uniqueHeaders.some((headerItem) => headerItem.header === item.header)
      ) {
        const user = Meteor.user();
        let specificId;
        if (user) {
          specificId = user._id; // Kullanıcının kimliğini al
        }
        const userHasTakenQuiz = hasUserTakenQuiz(specificId, item.header);
        if (userHasTakenQuiz) {
          console.log("Bu sınava zaten girdiniz");
          // Kullanıcı sınava katılmışsa, uyarı verin
          uniqueHeaders.push({
            header: item.header,
            message: "Bu sınava zaten girdiniz",
          });
        } else {
          // Kullanıcı sınava daha önce katılmamışsa, sınav bilgilerini ekleyin
          uniqueHeaders.push({
            ...item,
            remainingTime,
          });
        }
      } else {
      }
    });

    Loading.remove();

    const uniqueHeadersArray = Object.values(uniqueHeaders);

    if (uniqueHeadersArray.length === 0) {
      // Eğer hiç başlık yoksa "Soru yok" mesajını ekleyin
      uniqueHeadersArray.push({ header: "Soru yok" });
    }

    return uniqueHeadersArray;
  },
});

function calculateRemainingTime(startDate) {
  const now = new Date();
  startDate = new Date(startDate);

  // İki tarih arasındaki milisaniye farkını hesapla
  const timeDifference = startDate - now;

  // Kalan gün, saat, dakika ve saniyeyi hesapla
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Kalan zamanı bir nesne olarak döndür
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
function calculateDuration(startDate, endDate) {
  const timeDifference = endDate - startDate;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
