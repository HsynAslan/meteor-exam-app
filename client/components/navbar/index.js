Template.componentNavbar.onRendered(function () {
  Accounts.onLogin(function () {
    const loggedInProfile = document.getElementById("loggedProfile");
    const loggedInQuiz = document.getElementById("loggedQuiz");
    const loggedInAdd = document.getElementById("loggedAdd");
    const loggedInResults = document.getElementById("loggedResults");
    const unloggedInSignIn = document.getElementById("unloggedSignIn");
    const unloggedChat = document.getElementById("loggedChat");
    const unloggedCalendar = document.getElementById("loggedCalendar");
    if (
      loggedInProfile &&
      loggedInQuiz &&
      loggedInAdd &&
      loggedInResults &&
      unloggedInSignIn &&
      unloggedChat &&
      unloggedCalendar
    ) {
      loggedInProfile.style.display = "flex";
      loggedInQuiz.style.display = "flex";
      loggedInAdd.style.display = "flex";
      loggedInResults.style.display = "flex";
      unloggedInSignIn.style.display = "none";
      unloggedChat.style.display = "flex";
      unloggedCalendar.style.display = "flex";
      const user = Meteor.user();
      if (user) {
        $("#loggedProfile a").text(user.profile.firstName);
        //
        //
        //
      }

      const position = user.profile && user.profile.position;
      if (position !== "teacher") {
        // öğretmen değilse
        loggedInAdd.style.display = "none";
      } else {
        loggedInAdd.style.display = "flex";
      }
    }
  });
});
