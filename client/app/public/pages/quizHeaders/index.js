import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

Template.pagesQuizHeader.onRendered(function () {
  this.autorun(() => {});
});

Template.pagesQuizHeader.helpers({
  quizStatus(quiz) {
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

      return `Sınav Süresi: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye `;
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

      return `Sınav Süresi:  ${duration.days} gün, ${duration.hours} saat, ${duration.minutes} dakika`;
    } else if (currentDate <= endDate) {
      // Sınav süresi içinde, sınavı yapabilir
    } else {
      // Sınav süresi dolmuş
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
    const uniqueHeaders = {};

    quizzes.forEach((item) => {
      // Kalan zamanı hesapla
      const remainingTime = calculateRemainingTime(item.startDate);

      // Eğer bu başlık daha önce eklenmemişse, ekleyin
      if (!uniqueHeaders[item.header]) {
        uniqueHeaders[item.header] = {
          ...item,
          remainingTime,
        };
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
