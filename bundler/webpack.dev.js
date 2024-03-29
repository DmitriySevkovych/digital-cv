/* eslint-disable no-console */
const commonConfiguration = require('./webpack.common.js')

const { merge } = require('webpack-merge')
const ip = require('internal-ip')
const portFinderSync = require('portfinder-sync')


const infoColor = (_message) => {
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            port: portFinderSync.getPort(7777),
            contentBase: './dist',
            watchContentBase: true,
            open: true,
            https: false,
            useLocalIp: true,
            disableHostCheck: true,
            overlay: true,
            noInfo: true,
            // key: fs.readFileSync('/path/to/server.key'),
            // cert: fs.readFileSync('/path/to/server.crt'),
            // ca: fs.readFileSync('/path/to/ca.pem'),
            after: function (app, server) {
                const port = server.options.port
                const https = server.options.https ? 's' : ''
                const localIp = ip.v4.sync()
                const domain1 = `http${https}://${localIp}:${port}`
                const domain2 = `http${https}://localhost:${port}`

                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)
            }
        }
    }
)
