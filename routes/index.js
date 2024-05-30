var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/select_explanation', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'explanation.html'));
});

router.get('/select_question', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'question.html'));
});

router.get('/chat_page', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'chat.html'));
});

require('dotenv').config();
const express = require('express');
const { callChatGPT } = require('./chatgpt');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/ask', async function(req, res) {
    res.send('<form method="POST" action="/ask"><input type="text" name="prompt"/><button type="submit">Ask ChatGPT</button></form>');
});

app.post('/ask', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await callChatGPT(prompt);
        res.json({ 'response': response }); // 이 부분을 http://localhost:8000/ask로 넘어가게 수정
    } catch (error) {
		    console.error
        res.status(500).json({ 'error': 'Failed to get response from ChatGPT API' });
    }
});

module.exports = router;
