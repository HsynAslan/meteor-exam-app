import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.pagesResult.helpers({
  result() {
    console.log("sayfa yüklendi sa");
    const user = Meteor.user();
    if (user) {
      console.log("User _id:", user._id);
    }
    specificId = user._id;
    const results = Res.find({ userID: specificId }).fetch();

    console.log("results: " + results);
    console.log("id: ");

    return results;
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Özel bir saat biçimlendirmesi yapabilirsiniz
  },
});
