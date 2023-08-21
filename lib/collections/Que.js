import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Mongo } from "meteor/mongo";

Que = new Mongo.Collection("que");

QueSchema = new SimpleSchema({
  header: {
    type: String,
    label: "Question Header",
  },
  question: {
    type: String,
    label: "Soru Metni",
  },
  choices: {
    type: Array,
    label: "Şıklar",
    minCount: 5,
    maxCount: 5,
  },
  "choices.$": {
    type: String,
    label: "Şık Metni",
  },
  answer: {
    type: String,
    label: "Cevap",
    max: 1,
  },
});

Que.attachSchema(QueSchema);
