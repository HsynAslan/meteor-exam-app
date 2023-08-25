import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

Template.pagesQuizHeader.helpers({
  distinctHeaders() {
    Loading.dots();
    const uniqueHeaders = Array.from(
      new Set(
        Que.find()
          .fetch()
          .map((item) => item.header)
      )
    );
    Loading.remove();
    return uniqueHeaders;
  },
});
