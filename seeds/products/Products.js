const path = require('path')
const fs = require('fs')

const fileData = fs.readFileSync(path.resolve(__dirname, 'products.sql'))
const stringData = fileData.toString().split(',\r\n').map(el => {
  return el.replace(/[\)\(]/g, '')
})

const formatedData = stringData.map(el => {
  const arrayData = el.split(',')
  return {
    id:  Number(arrayData[0]),
    category: Number(arrayData[1].replace(/[\s']/g, '')),
    brand:  arrayData[2].replace(/[\s']/g, ''),
    name: arrayData[3].trim().replace(/[']/g, ''),
    gender: Number(arrayData[4]),
    priceIn: Number(arrayData[5]),
    priceOut: Number(arrayData[6]),
    priceSold: Number(arrayData[7]),
    discount: Number(arrayData[8]),
    size: arrayData[9].replace(/[\s']/g, ''),
    codeBox: arrayData[10].replace(/[\s']/g, ''),
    codeProduct: arrayData[11].replace(/[\s']/g, ''),
    articul: arrayData[12].replace(/[\s']/g, ''),
    pare: arrayData[13].replace(/[\s']/g, ''),
    dateIn: arrayData[14].replace(/[\s']/g, ''),
    dateOut: arrayData[15].replace(/[\s']/g, ''),
    createAt: arrayData[16].replace(/[\s']/g, ''),
    back: Number(arrayData[17]),
    notPare: Number(arrayData[18]),
    status: arrayData[19].replace(/[\s']/g, ''),
    sellerId: Number(arrayData[20].replace(/[\s']/g, '')),
    soldCard: Number(arrayData[21].replace(/[\s']/g, '')),
    comment: arrayData[22].replace(/[\s']/g, ''),
    visibility: !!Number(arrayData[24].replace(/[\s']/g, ''))
  }
})

module.exports = formatedData