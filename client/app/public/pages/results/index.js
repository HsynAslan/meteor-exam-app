import { index } from "d3";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.pagesResult.onRendered(function () {
  console.log("*********");
  this.autorun(() => {
    const user = Meteor.user();
    if (!user) return;
    console.log("user: ", user);
    const position = user.profile.position;

    if (position !== "teacher") {
      var div = document.getElementById("classInfoButton");
      div.style.display = "none";
      return;
    }

    // NodeList'i bir diziye dönüştürün
    const resultItems = document.querySelectorAll(".result-item");
    const resultItemsArray = Array.from(resultItems);

    // Dizi üzerinde forEach döngüsünü kullanın
    console.log("resultItemsArray[index]: " + resultItemsArray[index]);
    resultItemsArray.forEach((item) => {
      console.log("girdi");
      const scorValue = parseInt(
        item.querySelector(".scor").textContent.replace("Score: ", ""),
        10
      );
      const scorInside = item.querySelector(".scorInside");
      scorInside.style.width = scorValue + "%";
    });
  });
});

Template.pagesResult.helpers({
  result() {
    const user = Meteor.user();
    if (user) {
      specificId = user._id;
      const results = Res.find({ userID: specificId }).fetch();

      if (results.length === 0) {
        return [{ message: "Sonuç yok" }]; // Eğer sonuç yoksa "Sonuç yok" mesajını içeren bir nesne döndürün
      }

      return results;
    }
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Özel bir saat biçimlendirmesi yapabilirsiniz
  },

  // rendered: function () {
  //   // NodeList'i bir diziye dönüştürün
  //   const resultItems = document.querySelectorAll(".result-item");
  //   const resultItemsArray = Array.from(resultItems);

  //   // Dizi üzerinde forEach döngüsünü kullanın
  //   console.log("resultItemsArray[index]: " + resultItemsArray[index]);
  //   resultItemsArray.forEach((item) => {
  //     console.log("girdi");
  //     const scorValue = parseFloat(
  //       item.querySelector(".scor").textContent.replace("Score: ", "")
  //     );
  //     const scorInside = item.querySelector(".scorInside");
  //     scorInside.style.width = scorValue + "%";
  //   });
  // },
});
