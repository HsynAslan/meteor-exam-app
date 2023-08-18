import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.componentNavbar.onRendered(function () {
  console.log("sa");
});

Template.PagesResetPass.events({
  "click #changePassButton": function (event, template) {
    const oldPassC = template.find('[name="oldPass"]').value;
    const newPassC = template.find('[name="newPass"]').value;
    const newAgainPassC = template.find('[name="newAgainPass"]').value;

    if (newPassC !== newAgainPassC) {
      console.log("Yeni şifreler uyuşmuyor.");
      return;
    }

    const user = Meteor.user();
    if (user) {
      const userId = user._id;
      const username = user.username; // veya email veya başka bir kimlik bilgisi

      // Eski şifrenin doğruluğunu kontrol et
      try {
        Accounts.changePassword(oldPassC, newPassC);
        console.log("Şifre değiştirildi.");
        FlowRouter.go("login");
      } catch (error) {
        console.log("Eski şifre yanlış.");
      }
    }
  },
});
