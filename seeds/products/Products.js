const path = require('path')
const fs = require('fs')

const fileData = fs.readFileSync(path.resolve(__dirname, 'test.sql'))
const stringData = fileData.toString().split(',\r\n').map(el => {
  return el.replace(/[\)\(]/g, '')
})

const formatedData = stringData.map(el => {
  const arrayData = el.split(',')
  console.log(arrayData);
  console.log({
    id:  Number(arrayData[0]),
    category: Number(arrayData[1].replace(/[\s']/g, '')),
    brand:  arrayData[2].replace(/[\s']/g, ''),
    name: arrayData[3].replace(/^[\s']$[']/g, ''),
    gender: Number(arrayData[4]),
    priceIn: Number(arrayData[5]),
    priceOut: Number(arrayData[6]),
    priceSold: Number(arrayData[7]),
    discount: Number(arrayData[7]),
    size: arrayData[8].replace(/[\s']/g, ''),
    codeBox: arrayData[9].replace(/[\s']/g, ''),
    codeProduct: arrayData[10].replace(/[\s']/g, ''),
    articul: arrayData[11].replace(/[\s']/g, ''),
    pare: arrayData[12].replace(/[\s']/g, ''),
    dateIn: arrayData[13].replace(/[\s']/g, ''),
    dateOut: arrayData[14].replace(/[\s']/g, ''),
    createAt: arrayData[15].replace(/[\s']/g, ''),
    back: Number(arrayData[16]),
    notPare: Number(arrayData[17]),
    status: arrayData[18].replace(/[\s']/g, ''),
    sellerId: Number(arrayData[19]),
    soldCard: Number(arrayData[20]),
    comment: arrayData[21].replace(/[\s']/g, ''),
    visibility: !!Number(arrayData[23])

  });
  // return {
  //   id:  Number(arrayData[0]),
  //   name: arrayData[2].replace(/[\s']/g, ''),
  //   parent: Number(arrayData[1]),
  // }
})

module.exports = formatedData