const path = require('path')
const fs = require('fs')

const fileData = fs.readFileSync(path.resolve(__dirname, 'product.sql'))
const stringData = fileData.toString().split(',\r\n').map(el => {
  return el.replace(/[\)\(]/g, '')
})

const formatedData = stringData[0].split('\n').map(el => {
  let arrayData = ''
  if (/'\d{1,2},\s\d{1,2}'/g.exec(el)) {
    const buff = /'\d{1,2},\s\d{1,2}'/g.exec(el)
    const newStr = el.replace(/'\d{1,2},\s\d{1,2}'/g, buff[0].replace(',', ';'))
    arrayData = newStr.split(',')
  } else {
    arrayData = el.split(',')
  }

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
    pair: arrayData[13].replace(/[\s']/g, '') == 'NULL' || arrayData[13].replace(/[\s']/g, '') ? arrayData[13].replace(/[\s']/g, '') : '',
    dateIn: arrayData[14].replace(/[\s']/g, '') == 'NULL' ? new Date() : new Date(arrayData[14].replace(/[\s']/g, '').slice(0, 10)),
    dateOut: arrayData[15].replace(/[\s']/g, '') == 'NULL' ? '' : new Date(arrayData[15].replace(/[\s']/g, '').slice(0, 10)),
    createAt: arrayData[16].replace(/[\s']/g, '') == 'NULL' ? new Date() : new Date(arrayData[16].replace(/[\s']/g, '').slice(0, 10)),
    back: Number(arrayData[17]),
    notPair: Number(arrayData[18]),
    status: arrayData[19].replace(/[\s']/g, ''),
    sellerId: Number(arrayData[20].replace(/[\s']/g, '').split(';')[0]) === 0 || arrayData[20].replace(/[\s']/g, '') === 'NULL' ? [] : arrayData[20].replace(/[\s']/g, '').split(';'),
    soldCard: arrayData[21].replace(/[\s']/g, '') === 'NULL' || arrayData[21].replace(/[\s']/g, '') === '' ? null : Number(arrayData[21].replace(/[\s']/g, '')),
    comment: arrayData[22].replace(/[\s']/g, ''),
    visibility: arrayData[19].replace(/[\s']/g, '') === 'shop' && Number(arrayData[24].replace(/[\s']/g, '')) === 0 ? true : false,
  }
})

module.exports = formatedData