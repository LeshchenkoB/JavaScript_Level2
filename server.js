const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/api/goods', (req, res) => {
    fs.readFile('./data/catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const goodItem = req.body;

        cart.push(goodItem);
        fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                res.status(500).send();
                return
            }
            res.send(cart);
        })
    });
});

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});
