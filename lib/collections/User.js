import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Mongo } from "meteor/mongo";
// Exams = new Mongo.Collection("exam");

// ExamsShema = new SimpleSchema({
//   mail: String,
//   password: String,
// });

// Exams.attachSchema(ExamsShema);

// import { SimpleSchema } from "meteor/aldeed:simple-schema";
// import { Mongo } from "meteor/mongo";

// Exams = new Mongo.Collection("exams");

UsersSchema = new SimpleSchema({
  username: {
    type: String,
  },
  // email e cevirmem lazım
  // emails: {
  //   type: Array,
  //   required: false,
  //   regEx: SimpleSchema.RegEx.Email,
  //   label: "E-Mail Address",
  // },
  services: {
    type: Object,
    blackbox: true,
  },

  profile: {
    type: Object,
    blackbox: true,
  },
  "profile.firstName": {
    type: String,
    label: "First Name",
  },
  "profile.lastName": {
    type: String,
    label: "Last Name",
  },
  "profile.position": {
    type: String,
    label: "position Name",
  },
});

// Exams koleksiyonunu oluşturduktan sonra attachSchema işlemi yapın
// Meteor.users.attachSchema(UsersSchema);
