import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Template.componentNavbar.onRendered(function () {});

Template.PagesResetPass.events({
  "click #changePassButton": function (event, template) {
    Loading.dots();
    const oldPassC = template.find('[name="oldPass"]').value;
    const newPassC = template.find('[name="newPass"]').value;
    const newAgainPassC = template.find('[name="newAgainPass"]').value;
    Loading.remove();
    if (newPassC !== newAgainPassC) {
      Notify.failure('"The new passwords do not match ');

      return;
    }

    const user = Meteor.user();
    if (user) {
      const userId = user._id;
      const username = user.username; // veya email veya başka bir kimlik bilgisi

      // Eski şifrenin doğruluğunu kontrol et
      try {
        Accounts.changePassword(oldPassC, newPassC);

        FlowRouter.go("login");
        Notify.success("Change Password Success");
        Meteor.logout(function (error) {
          if (error) {
            Notify.success("Logout unsuccess");
          } else {
            Notify.success("Logout Success");
          }
        });
      } catch (error) {
        Notify.failure("Change Password Fail");
      }
    }
  },
});
