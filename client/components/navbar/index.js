Template.componentNavbar.onRendered(function () {
  Accounts.onLogin(function () {
    const loggedInProfile = document.getElementById("loggedProfile");
    const loggedInQuiz = document.getElementById("loggedQuiz");
    const loggedInAdd = document.getElementById("loggedAdd");
    const loggedInResults = document.getElementById("loggedResults");
    const unloggedInSignIn = document.getElementById("unloggedSignIn");
    if (
      loggedInProfile &&
      loggedInQuiz &&
      loggedInAdd &&
      loggedInResults &&
      unloggedInSignIn
    ) {
      console.log("sa");
      loggedInProfile.style.display = "flex";
      loggedInQuiz.style.display = "flex";
      loggedInAdd.style.display = "flex";
      loggedInResults.style.display = "flex";
      unloggedInSignIn.style.display = "none";

      const user = Meteor.user();
      if (user) {
        $("#loggedProfile a").text(user.profile.firstName);
        // console.log("user name: ", user.profile.firstName);
        // console.log("user lastname: ", user.profile.lastName);
        //   console.log("user password: ", user.profile.Accounts.setPassword(userId, newPassword););
      }
    }
  });
});
