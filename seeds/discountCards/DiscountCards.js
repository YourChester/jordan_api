const path = require('path')
const fs = require('fs')

const fileData = fs.readFileSync(path.resolve(__dirname, 'discountCards.sql'))
const stringData = fileData.toString().split(',\r\n').map(el => {
  return el.replace(/[\)\(]/g, '')
})

const formatedData = stringData.map(el => {
  const arrayData = el.split(',')
  return {
    id:  Number(arrayData[0]),
    code: Number(arrayData[1].trim().replace(/[']/g, '')),
    name: arrayData[2].trim().replace(/[']/g, ''),
    phone: arrayData[3].trim().replace(/[']/g, ''),
    email: arrayData[4].trim().replace(/[']/g, ''),
    address: arrayData[6].trim().replace(/[']/g, ''),
    birthday: arrayData[7].trim().replace(/[']/g, ''),
    createAt: arrayData[8].trim().replace(/[']/g, ''),
    discount: Number(arrayData[10].trim().replace(/[']/g, '')),
    comment: arrayData[11].trim().replace(/[']/g, ''),
    visibility: Number(arrayData[12].trim().replace(/[']/g, '')),
  }
})

module.exports = formatedData