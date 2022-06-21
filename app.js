const express = require("express");
const { randomUUID } = require("crypto"); // id global
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json","utf-8",(err,data) =>{
    if(err){
        console.log(err);
    }else{
        products = JSON.parse(data);
    }
})

/**
 *  POST => inserrir um dado
 *  GET => buscar um/mais dados
 *  PUT => alterar um dado
 *  DELETE => remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados p/ minha aplicação
 * Params => /products/234782374827348234
 * Query => /products?id35154151454545573
 */

app.post("/products", (req, res) => {
  // Nome e preço => name and price

  const { name, price } = req.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

createProducFile();

  return res.json(product);
});

//buscar produto

app.get("/products", (req, res) => {
  return res.json(products);
});

//buscar produto pelo id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  createProducFile();

  return res.json({ message: "produto alterado com sucesso" });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  createProducFile()

  return res.json({ message: "produto removido com sucesso" });
});


function createProducFile(){
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("produto Inserido");
        }
      });
}
app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
