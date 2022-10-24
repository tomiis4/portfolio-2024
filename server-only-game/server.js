const http = require('http')



// Create server
const server = http.createServer((req, res) => {
  // Get URL which was rquested
  const url = req.url

  // Function which will get you query string
  const getQueryString = (queryStringArg) => {
    const queryString = url.replace('/join?', '')
    const vars = queryString.split('&')
    
    for (let i=0; i < vars.length; i++) {
      const pair = vars[i].split('=')
    
      if (decodeURIComponent(pair[0]) == queryStringArg && decodeURIComponent(pair[1]) != '') {
        return decodeURIComponent(pair[1])
      }
    }
  
    console.log(`Query ${queryStringArg} was not found.`)
    return null
  }

  // Routing
  if (url.startsWith('/join')) {
    const name = getQueryString('name')
    const skinID = getQueryString('skinID')
    const serverID = getQueryString('serverID')

    const itemsArray = [name, skinID, serverID]

    itemsArray.forEach((_, index) => {
      if (itemsArray[index] == null) {
        console.log(`Make sure you gave correct information.`)
      }
    })

    
    res.write('Join server')
    res.end()
  } else {  
    res.write('Else')
    res.end()
  }
})

// Run server
server.listen(4200, () => {
  console.log("[SERVER] Server is ready.")
})
