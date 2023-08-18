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
    type: Number, // Use Number type for floating-point values
    decimal: true, // Specify that it's a decimal value
    label: "Soru Metni",
  },
  userID: {
    type: String,
  },
});

// Exams koleksiyonunu oluşturduktan sonra attachSchema işlemi yapın
Res.attachSchema(ResSchema);
