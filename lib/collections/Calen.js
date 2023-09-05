import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Mongo } from "meteor/mongo";

// MongoDB koleksiyonunu oluşturuyoruz
Calen = new Mongo.Collection("calen");

// Not Alma Şema Tanımı
CalenSchema = new SimpleSchema({
  senderId: {
    type: String,
    label: "Notu ekleyen kişinin ID'si",
  },
  day: {
    type: Number, // Burada tamsayı olarak güncelledik
  },
  month: {
    type: Number, // Burada tamsayı olarak güncelledik
  },
  year: {
    type: Number, // Burada tamsayı olarak güncelledik
  },
  notText: {
    type: String,
    label: "Not",
    max: 1000,
  },
  zaman: {
    type: Date,
    label: "Notun Eklenme Zamanı",
    autoValue: function () {
      return new Date();
    },
  },

  // İsteğe bağlı olarak eklemek istediğiniz diğer özel alanları burada tanımlayabilirsiniz
  // örneğin: ekAlan: { type: String, label: "Ek Alan" }
});

// Mesaj şemasını koleksiyona ekliyoruz
Calen.attachSchema(CalenSchema);
