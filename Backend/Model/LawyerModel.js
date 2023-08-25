const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  lawyerId: String,
  name: String,
  address: String,
  bio: String,
  skills: [String],
  profession: String,
  gender: String,
  phone: Number,
  image: String,
  price: String,
  verify: Boolean,
  languages: [String],
  rating: Number,
  experience: String,
  Rank: Number,
  availability: { type: Boolean, default: true },
    item_left: { type: Number },

    desc: { type: String },
    arrival: { type: Date},
  messages: [
    {
      userEmail: String,
      chats: [
        {
          textMsg: String,
          sendBy: String,
        },
      ],
    },
  ],
});

const LawyerModel = mongoose.model("Laeyer", schema);

module.exports = { LawyerModel };