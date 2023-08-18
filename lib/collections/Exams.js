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

Exams = new Mongo.Collection("exams");

ExamsSchema = new SimpleSchema({
  mail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "E-Mail Address",
  },
  password: {
    type: String,
    label: "Password",
  },
  firstName: {
    type: String,
    label: "First Name",
  },
  lastName: {
    type: String,
    label: "Last Name",
  },
});

// Exams koleksiyonunu oluşturduktan sonra attachSchema işlemi yapın
Exams.attachSchema(ExamsSchema);
