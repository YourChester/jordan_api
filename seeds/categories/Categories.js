const path = require('path')
const fs = require('fs')

const fileData = fs.readFileSync(path.resolve(__dirname, 'category.sql'))
const stringData = fileData.toString().split(',\r\n').map(el => {
  return el.replace(/[\)\(]/g, '')
})

const formatedData = stringData.map(el => {
  const arrayData = el.split(',')
  return {
    id:  Number(arrayData[0]),
    name: arrayData[2].trim().replace(/[']/g, ''),
    parent: Number(arrayData[1]),
  }
})

module.exports = formatedData