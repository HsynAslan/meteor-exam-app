import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.pagesQuizHeader.helpers({
  distinctHeaders() {
    const uniqueHeaders = Array.from(
      new Set(
        Que.find()
          .fetch()
          .map((item) => item.header)
      )
    );
    return uniqueHeaders;
  },
});
