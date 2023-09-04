import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

Template.pagesQuizHeader.onRendered(function () {
  this.autorun(() => {});
});

Template.pagesQuizHeader.helpers({
  quizStatus(quiz) {
    const startDate = new Date(quiz.startDate); // Sınavın başlama tarihini alın
    const endDate = new Date(quiz.endDate); // Sınavın bitiş tarihini alın
    const currentDate = new Date(); // Şu anki tarihi alın

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

      return `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye kaldı`;
    } else if (currentDate <= endDate) {
      // Sınav süresi içinde, sınavı yapabilir
      return "Sınava giriş yapabilirsiniz.";
    } else {
      // Sınav süresi dolmuş

      return "Sınav süresi doldu.";
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
    const uniqueHeaders = Que.find()
      .fetch()
      .map((item) => {
        // Kalan zamanı hesapla
        const remainingTime = calculateRemainingTime(item.startDate);

        // Item verisini genişlet
        return {
          ...item,
          remainingTime,
        };
      });

    Loading.remove();
    return uniqueHeaders;
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
