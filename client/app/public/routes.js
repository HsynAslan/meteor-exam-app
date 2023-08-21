import { FlowRouter } from "meteor/ostrio:flow-router-extra";

// Kullanıcı oturum açmış mı kontrolü işlevi
const checkLoggedIn = (context, redirect) => {
  if (!Meteor.userId()) {
    redirect("/login");
  }
};

const checkLoggedTeacher = (context, redirect) => {
  if (!Meteor.userId()) {
    redirect("/login");
    return; // Eğer giriş yapmamışsa devam etme
  }

  const user = Meteor.user();
  if (!user) {
    // Kullanıcı verileri alınamazsa
    return;
  }

  const position = user.profile && user.profile.position;
  if (position !== "teacher") {
    // Kullanıcı öğretmen değilse yönlendirme yapabilirsiniz
    redirect("/unauthorized"); // Öğretmen olmayanlar için yetkisiz sayfasına yönlendirme
  }
};

// Oturum açmış kullanıcılar için grup tanımı
const authenticatedRoutes = FlowRouter.group({
  triggersEnter: [checkLoggedIn],
});

const authenticatedRoutesTeacher = FlowRouter.group({
  triggersEnter: [checkLoggedTeacher],
});

authenticatedRoutesTeacher.route("/add", {
  name: "public.add",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesAdd" });
  },
});

authenticatedRoutes.route("/quiz", {
  name: "public.quiz",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "unauthorized" });
  },
});
authenticatedRoutes.route("/quiz/:header", {
  name: "quizPage",
  action(params) {
    this.render("publicLayoutDefault", { page: "pagesQuiz" });
  },
});

authenticatedRoutes.route("/quizHeader", {
  name: "public.quizHeader",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesQuizHeader" });
  },
});

authenticatedRoutes.route("/resetPass", {
  name: "public.resetPass",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "PagesResetPass" });
  },
});
authenticatedRoutes.route("/pro", {
  name: "public.pro",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesProfile" });
  },
});
authenticatedRoutes.route("/res", {
  name: "public.res",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesResult" });
  },
});

FlowRouter.route("/", {
  name: "public.home",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesHome" });
  },
});

FlowRouter.route("/login", {
  name: "public.login",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesLogin" });
  },
});
FlowRouter.route("/loginTeacher", {
  name: "public.loginTeacher",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesHomeTeacher" });
  },
});
