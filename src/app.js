const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require('./config/dbConnect');
const messages = require('./models/message.js');


db.on("error", console.log.bind(console, 'Erro de conexão ao db'))
db.on("open", () => {
    console.log("conexão com sucesso")
})

app.use(cors());

app.use(express.json())

app.use(bodyParser.json());

const mensagens = [];
const mensagensBen = [];
const mensagensSoso = [];

app.get('/mensagens', (req, res) => {
    
    res.status(200).json(messages)
})

app.get('/mensagensBen', (req, res) => {
    res.send(mensagensBen)
})

app.get('/mensagensSoso', (req, res) => {
    res.send(mensagensSoso)
})

app.post('/sendMessageToBen', async (req, res) => {
    const textValue = req.body.textValue;
  
    const currentMessage = new messages({
      text: textValue,
    });
  
    try {
      const savedMessage = await currentMessage.save();
      mensagensBen.push(savedMessage); 
      mensagens.push(savedMessage); 
      res.status(201).json(savedMessage);
    } catch (err) {
      res.status(500).json({ message: `${err}, falha ao enviar mensagem` });
    }
  });
  
  app.post('/sendMessageToSoso', async (req, res) => {
    const textValue = req.body.textValue;
  
    const currentMessage = new messages({
      text: textValue,
    });
  
    try {
      const savedMessage = await currentMessage.save();
      mensagensSoso.push(savedMessage); 
      mensagens.push(savedMessage); 
      res.status(201).json(savedMessage);
    } catch (err) {
      res.status(500).json({ message: `${err}, falha ao enviar mensagem` });
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
  });