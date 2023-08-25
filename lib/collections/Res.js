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

Res = new Mongo.Collection("res");

ResSchema = new SimpleSchema({
  scor: {
    type: Number,
    decimal: true,
    label: "Soru Metni",
  },
  userID: {
    type: String,
  },
  catagory: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    },
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
Res.attachSchema(ResSchema);
