const Jimp = require('jimp')

exports.run = async (URL) => {
  return new Promise(async (resolve, reject) => {
    const avatarPromise = Jimp.read(URL)
    const bannerPromise = Jimp.read('./resources/rip/rip.png')

    Promise.all([avatarPromise, bannerPromise]).then((promises) => {
      const [avatar, banner] = promises
      avatar.resize(300, 300)
      banner.resize(642, 806)
      banner.composite(avatar, 175, 385)
      banner.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
        if (err) {
          return console.error(err.stack)
        }
        resolve(buffer)
      })
    }).catch(reject)
  })
}