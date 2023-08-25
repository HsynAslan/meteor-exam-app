import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Mongo } from "meteor/mongo";

// MongoDB koleksiyonunu oluşturuyoruz
Mess = new Mongo.Collection("mess");

// Mesaj şema tanımı
MessSchema = new SimpleSchema({
  sender: {
    type: String,
    label: "Mesajı Gönderen",
  },
  timestamp: {
    type: Date,
    label: "Mesaj Saati",
  },
  content: {
    type: String,
    label: "Mesaj İçeriği",
  },
  messageType: {
    type: String,
    allowedValues: ["text", "image", "video"],
    label: "Mesaj Türü",
  },
});

// Mesaj şemasını koleksiyona ekliyoruz
Mess.attachSchema(MessSchema);
