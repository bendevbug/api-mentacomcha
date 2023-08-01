const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require('./config/dbConnect');
const messages = require('./models/message.js');
const messagesBenDb = require('./models/messageBen')
const messagesSosoDb = require('./models/messageSofia')



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

app.get('/mensagensBen', async (req, res) => {

  try {

    const messagesFromSoso = await messagesBenDb.find().sort({_id: -1}).limit(4);
    res.status(200).json(messagesFromSoso)

  }  catch(error) {
    res.status(500).json({message: `${error}, falha ao buscar as mensagens`})
  }
})

app.get('/mensagensSoso', async (req, res) => {

  try {

    const messagesFromBen = await messagesSosoDb.find().sort({_id: -1}).limit(4);
    res.status(200).json(messagesFromBen)

  }  catch(error) {
    res.status(500).json({message: `${error}, falha ao buscar as mensagens`})
  }
})

app.post('/sendMessageToBen', async (req, res) => {
    const textValue = req.body.textValue;
  
    const currentMessage = new messages({
      text: textValue,
    });

    const currentMessageToBen = new messagesBenDb({
      text: textValue,
    });
  
    try {
      const savedMessage = await currentMessage.save();
      const savedMessageToBen = await currentMessageToBen.save();

      mensagensBen.push(savedMessageToBen); 
      mensagens.push(savedMessage); 
      res.status(201).json({savedMessage, savedMessageToBen});
    } catch (err) {
      res.status(500).json({ message: `${err}, falha ao enviar mensagem` });
    }
  });
  
  app.post('/sendMessageToSoso', async (req, res) => {
    const textValue = req.body.textValue;
  
    const currentMessage = new messages({
      text: textValue,
    });

    
    const currentMessageToSoso = new messagesSosoDb({
      text: textValue,
    });
  
    try {
      const savedMessage = await currentMessage.save();
      const savedMessageToSoso = await currentMessageToSoso.save();

      mensagensSoso.push(savedMessageToSoso); 
      mensagens.push(savedMessage); 
      res.status(201).json({savedMessage});
    } catch (err) {
      res.status(500).json({ message: `${err}, falha ao enviar mensagem` });
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
  });