const net = require('net')

function run (cb) {
  const handler = commandHandler.bind(this)
  process.on('message', handler)

  const mockRecyclerService = net.createServer(socket => {
    socket.on('data', data => handler(JSON.parse(data)))
  }).on('error', console.error)

  mockRecyclerService.listen({ port: 8081 }, (err, res) => {
    if (err) throw err
    console.log('Cash recycler service running in port 8081')
  })

  cb()
}

module.exports = { run }
