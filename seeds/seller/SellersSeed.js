const bcrypt = require('bcryptjs');

const SellerModel = require('../../model/SellerModel')
const RoleModel = require('../../model/RoleModel')
const formatedData = require('./Sellers')

const getCurrentRole = (roleName, roles) => {
  const role = roles.find(el => el.name === roleName)
  if (role) {
    return role._id
  } else {
    const defaultRole = roles.find(el => el.name === 'Менеджер')
    return defaultRole._id
  }
}

async function createSeller() {
  try {
    const roles = await RoleModel.find()

    for (const el in formatedData) {
      const hashPassword = bcrypt.hashSync(formatedData[el].password, Number(process.env.SALT_HASH))

      const newElement = new SellerModel({
        name: formatedData[el].name,
        login: formatedData[el].login,
        password: hashPassword,
        role: getCurrentRole(formatedData[el].role, roles),
        visibility: true
      })
      await newElement.save()
    }
    console.log('Заполнение SellersModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createSeller