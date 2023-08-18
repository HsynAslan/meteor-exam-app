import { FlowRouter } from "meteor/ostrio:flow-router-extra";

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
    this.render("publicLayoutDefault", { page: "pagesQuiz" });
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
authenticatedRoutes.route("/add", {
  name: "public.add",
  action: function (params, queryParams) {
    this.render("publicLayoutDefault", { page: "pagesAdd" });
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
