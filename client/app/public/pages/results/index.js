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
});
