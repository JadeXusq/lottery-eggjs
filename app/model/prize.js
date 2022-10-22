
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PrizeSchema = new Schema({
    phone: { type: String },
    userName: { type: String },
    prizeNo: { type: Number },
    lotteryTime: { type: Number },
  });

  return mongoose.model('Prize', PrizeSchema);
}