const path = require('path')
const fs = require('fs')

const fileData = fs.readFileSync(path.resolve(__dirname, 'costs.sql'))
const stringData = fileData.toString().split(',\r\n').map(el => {
  return el.replace(/[\)\(]/g, '')
})

const formatedData = stringData.map(el => {
  const arrayData = el.split(',')
  if (arrayData.length === 1) return
  return {
    id: arrayData[0].replace(/[\s']/g, ''),
    name:  arrayData[1].replace(/[\s']/g, ''),
    sum: Number(arrayData[2].replace(/[\s']/g, '')),
    date: arrayData[3].replace(/[\s']/g, '') == 'NULL' ? new Date() : new Date(arrayData[3].replace(/[\s']/g, '').slice(0, 10)),
    comment:  arrayData[4].replace(/[\s']/g, '')
  }
})

module.exports = formatedData