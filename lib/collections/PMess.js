import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Mongo } from "meteor/mongo";

// MongoDB koleksiyonunu oluşturuyoruz
PMess = new Mongo.Collection("pmess"); // PMess koleksiyonunu oluşturduk

// Mesaj şema tanımı
PMessSchema = new SimpleSchema({
  sender: {
    type: String,
    label: "Mesajı Gönderen",
  },
  senderId: {
    type: String,
    label: "Mesajı Gönderen Kullanıcı ID",
  },
  receiverId: {
    type: String,
    label: "Mesajın Alıcı Kullanıcı ID",
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
PMess.attachSchema(PMessSchema); // Koleksiyona PMessSchema'yı ekledik
