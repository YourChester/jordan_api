const path = require('path')
const fs = require('fs')
const SoldModel = require('./model/SoldModel')

async function getBlackFridaySolds() {
  try {
    console.log('start');
    const solds = await SoldModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date("2021-11-25T00:00:00.000+00:00"),
            $lt: new Date("2021-11-29T00:00:00.000+00:00")
          },
          card: {
            $ne: null
          }
        }
      },
      {
        $lookup:
          {
            from: "discountcardmodels",
            localField: "card",
            foreignField: "_id",
            as: "card_info"
          }
      },
      {
        $lookup:
          {
            from: "productmodels",
            localField: "products",
            foreignField: "_id",
            as: "products_info"
          }
      },
      { $sort: { date: -1 } },
      {
        $unwind: "$card_info"
      },
      { 
        $group: {
          _id: "$card",
          name: { $first: "$card_info.name"},
          phone: { $first: "$card_info.phone"},
          sold: { $push: "$$ROOT"}
        } 
      }
    ])
  
    fs.writeFileSync(path.resolve(__dirname, 'blackFriday.json'), JSON.stringify(solds, null, 2))
    console.log('end');
  } catch (e) {
    console.log(e);
  }
}

module.exports = getBlackFridaySolds