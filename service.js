import { Service } from 'node-windows'

const svc = new Service({
  name: 'Invoices Manager Service',
  description: 'Application for better managing of your invoices.',
  script: './app.js'
})

if (process.argv[2] === 'install') {
  svc.on('install', () => {
    svc.start()
  })

  svc.install()
}

if (process.argv[2] === 'uninstall') {
  svc.on('uninstall', () => {
    console.log('Service uninstalled')
  })

  svc.uninstall()
}
