import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";

// Kullanıcı oturum açmış mı kontrolü işlevi
const checkLoggedIn = (context, redirect) => {
  if (!Meteor.userId()) {
    redirect("/login");
  }
};

// Oturum açmış kullanıcılar için grup tanımı
const authenticatedRoutes = FlowRouter.group({
  triggersEnter: [checkLoggedIn],
});

authenticatedRoutes.route("/quiz", {
  name: "public.quiz",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "unauthorized" });
    Loading.remove();
  },
});

authenticatedRoutes.route("/quiz/:header", {
  name: "quizPage",
  action(params) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesQuiz" });
    Loading.remove();
  },
});

authenticatedRoutes.route("/quizHeader", {
  name: "public.quizHeader",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesQuizHeader" });
    Loading.remove();
  },
});

authenticatedRoutes.route("/add", {
  name: "public.add",
  action: function (params, queryParams) {
    Loading.dots();

    this.render("publicLayoutDefault", { page: "pagesAdd" });
    Loading.remove();
  },
});

authenticatedRoutes.route("/classInfo", {
  name: "public.classInfo",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "publicPagesClassInfo" });

    Loading.remove();
  },
});

authenticatedRoutes.route("/delete", {
  name: "public.delete",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesDelete" });

    Loading.remove();
  },
});

authenticatedRoutes.route("/resetPass", {
  name: "public.resetPass",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "PagesResetPass" });
    Loading.remove();
  },
});
authenticatedRoutes.route("/pro", {
  name: "public.pro",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesProfile" });
    Loading.remove();
  },
});
authenticatedRoutes.route("/Pchat", {
  name: "public.Pchat",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesPrivateChat" });
    Loading.remove();
  },
});
authenticatedRoutes.route("/chat", {
  name: "public.chat",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "publicPageChat" });
    Loading.remove();
  },
});
authenticatedRoutes.route("/res", {
  name: "public.res",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesResult" });
    Loading.remove();
  },
});

FlowRouter.route("/", {
  name: "public.home",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesHome" });
    Loading.remove();
  },
});

FlowRouter.route("/login", {
  name: "public.login",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesLogin" });
    Loading.remove();
  },
});
FlowRouter.route("/loginTeacher", {
  name: "public.loginTeacher",
  action: function (params, queryParams) {
    Loading.dots();
    this.render("publicLayoutDefault", { page: "pagesHomeTeacher" });
    Loading.remove();
  },
});

// const checkLoggedTeacherOrStudentForClassInfo = (context, redirect) => {
//   if (!Meteor.userId()) {
//     Flowrouter.go("/login");
//     return;
//   }
//   const user = Meteor.users.find({ _id: Meteor.userId() }).fetch();
//   console.log("user: " + user);
//   const position = user.profile && user.profile.position;
//   console.log("position: " + position);
//   if (position !== "teacher") {
//     //position degeri gelmiyor
//     console.log("ife girdik");
//     Flowrouter.go("/unauthorized");
//     return;
//   }
// };

// const authenticatedRoutesTeacherOrStudentForClassInfo = FlowRouter.group({
//   triggersEnter: [checkLoggedTeacherOrStudentForClassInfo],
// });

// authenticatedRoutesTeacherOrStudentForClassInfo.route("/add", {
//   name: "public.add",
//   action: function (params, queryParams) {
//     const user = Meteor.user();

//     if (user.profile.position === "teacher") {
//       this.render("publicLayoutDefault", { page: "pagesAdd" });
//     } else if (user.profile.position === "student") {
//       this.render("publicLayoutDefault", { page: "/unauthorized" });
//     }
//   },
// });
