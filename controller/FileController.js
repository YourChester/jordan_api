const path = require('path')
const fs = require('fs')

const getCurrentIndex = (articul, index, curentImages) => {
  if (!curentImages.find(el => el.includes(`${articul}_${index}`))) {
    return index
  } else {
    return getCurrentIndex(articul, index + 1, curentImages)
  }
}

class FileController {
  async adminCreate(req, res) {
    try {
      const articul = req.params.id

      const { images } = req.files || {}

      if (images) {
        const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(articul))
        const curentIndex = getCurrentIndex(articul, 0, curentImages)
        const imageName = `${articul}_${curentIndex}.jpg`
        images.mv(path.resolve(__dirname, '..', 'static', imageName))
        return res.status(200).json(`${articul}_${curentIndex}.jpg`)
      }else {
        return res.status(500).json({ message: 'Не удалось сохранить фото' })
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const fileName = req.params.id

      const existFile = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(fileName))
      if (fileName && existFile.includes(fileName)) {
        fs.unlinkSync(path.resolve(__dirname, '..', 'static', fileName))
        return res.status(200).json({ message: 'Картинка успешно удалена'})
      } else {
        return res.status(500).json({ message: 'Не удалось удалить картинку'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new FileController()