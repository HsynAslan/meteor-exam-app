import { FlowRouter } from "meteor/ostrio:flow-router-extra";
Template.pagesResult.helpers({
  result() {
    console.log("sayfa yüklendi sa");
    const user = Meteor.user();
    if (user) {
      console.log("User _id:", user._id); // Kullanıcının _id değerini konsola yazdırın
    }
    specificId = user._id;
    const results = Res.find({ userID: specificId }).fetch();
    console.log("results: " + results);
    console.log("id: ");
    return results; // Sadece koleksiyon verilerini döndür
  },
});