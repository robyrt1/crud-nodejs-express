const http = require("http");

http.createServer((req, res) => {
  res.writeHead(200,{"content-Type":"application/json"});

    if(req.url === '/produto'){
        res.end(
          JSON.stringify({
            message:"Rota de produto"
        }))
    }

    if(req.url === '/usuario'){
      res.end(
        JSON.stringify({
          message:"Rota de usuario"
      }))
  }

})
.listen(4001, () => {
  console.log("Servidor está funcionando na porta 4001");
});