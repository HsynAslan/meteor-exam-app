import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import * as d3 from "d3";

Template.publicPagesClassInfo.onRendered(function () {
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
  });
});

Template.publicPagesClassInfo.helpers({
  result() {
    const user = Meteor.user();
    if (user) {
      specificId = user._id;
      const results = Res.find().fetch();
      return results;
    }
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  },

  average() {
    const results = Res.find().fetch();
    const categories = {};

    results.forEach((item) => {
      if (!categories[item.lastName]) {
        categories[item.lastName] = {
          count: 0,
          totalScore: 0,
        };
      }
      categories[item.lastName].count++;
      categories[item.lastName].totalScore += item.scor;
    });

    return Object.keys(categories).map((category) => {
      const { count, totalScore } = categories[category];
      return {
        category,
        count,
        average: count > 0 ? totalScore / count : 0,
      };
    });
  },
});
