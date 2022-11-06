const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'BozonApp.app', 'Contents', 'MacOS', 'BozonApp')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'BozonApp')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'BozonApp.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
