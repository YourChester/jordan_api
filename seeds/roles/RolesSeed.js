const RoleModel = require('../../model/RoleModel')
const formatedData = require('./Roles')

async function createRoles() {
  try {
    for (const el in formatedData) {
      const newElement = new RoleModel({
        name: formatedData[el].name,
        key: formatedData[el].key
      })
      await newElement.save()
    }
    console.log('Заполнение RolesModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createRoles