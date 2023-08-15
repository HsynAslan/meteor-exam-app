import { Meteor } from "meteor/meteor";
Template.pagesHome.helpers({
  create: function () {
    const self = this;
  },
  rendered: function () {
    const self = this;
  },
  destroyed: function () {
    const self = this;
  },
  upperCase: function (name) {
    return name?.toUpperCase();
  },
});

Template.pagesHome.events({
  "submit form": function (event, template) {
    console.log("Buttona bastınız");
    event.preventDefault();
    // LoadingSection.show(template, '.authPageSignUp') animasyon için

    const emailAddress = event.target.createMail.value; // burada "cretateMail" değil, "createMail" olmalı
    const password = event.target.createPassword.value; // burada "cretatePassword" değil, "createPassword" olmalı

    const obj = {
      email: emailAddress,
      password: password,
    };

    Accounts.createUser(obj, function (error, result) {
      if (error) {
        // LoadingSection.hide(template, '.authPageSignUp')
        // ErrorHandler.show(error)
        console.log("error : ", error);
        // FlowRouter.go('/signin') // hatalıysa
      } else {
        console.log("user created : ", result);
        FlowRouter.go("/home");
        // Meteor.call('user_insert', obj,  function (error, result) {
        //   if (error) {
        //     console.log("error : ", error);
        //   } else {
        //     console.log("result : ", result);
        //     FlowRouter.go('/home');
        //   }
        // });
      }
    });
  },
});

// 'submit form': function (event, template) {
//   event.preventDefault()
//   // LoadingSection.show(template, '.authPageSignUp') animasyon için

//   const firstName = event.target.firstName.value
//   const lastName = event.target.lastName.value
//   const emailAddress = event.target.emailAddress.value
//   const password = event.target.password.value
//   // const passwordAgain = event.target.passwordAgain.value
//   const profilePhoto = event.target.profilePhotoUrl.value

//   const obj = {
//     firstName: firstName,
//     lastName: lastName,
//     email: emailAddress,
//     password: password,
//     profilePhoto : profilePhoto,
//   }

//   Accounts.createUser(obj, function (error, result) {
//     if (error) {
//       // LoadingSection.hide(template, '.authPageSignUp')
//       // ErrorHandler.show(error)
//       console.log("error : ", error);
//       FlowRouter.go('/signin') // hatalıysa
//     }else{

//   console.log("user created : ", result);
//         FlowRouter.go('/home')
//       //   Meteor.call('user_insert', obj,  function (error, result) {
//       //     if (error) {
//       //       console.log("error : ", error);
//       //     }else{
//       //       console.log("result : ", result);
//       //       FlowRouter.go('/home')
//       //     }
//       //   })
//       // }
//       }
//     })
//   },
// })
