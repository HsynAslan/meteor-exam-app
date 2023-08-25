import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.pagesResult.helpers({
  result() {
    const user = Meteor.user();
    if (user) {
    }
    specificId = user._id;
    const results = Res.find({ userID: specificId }).fetch();

    return results;
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Özel bir saat biçimlendirmesi yapabilirsiniz
  },
});
