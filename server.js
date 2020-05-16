// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded( { extend : true }));

// =======================================
//              DATABASE
// =======================================
const bakedGoods = require('./models/bakedgoods.js');

// =======================================
//              ROUTES
// =======================================
// index route
app.get('/bakedgoods', (req, res) => {
    res.render('index.ejs', { bakedGoods });
});

// new route
app.get('/bakedgoods/create', (req, res) => {
    res.render('new-item.ejs');
});

app.post('/bakedgoods/create', (req, res) => {
    console.log(req.body);
    bakedGoods.push(req.body);
    res.render('added.ejs');
});

// show route
app.get('/bakedgoods/:id', (req, res) => {
    const index = bakedGoods.findIndex((item) => item.name === req.params.id);
    res.render('show.ejs', { yum: bakedGoods[index] });
});



// =======================================
//              LISTENER
// =======================================
app.listen(port, () => {
    console.log(`Biscoff Bakery app listening on port: ${port}`);
});
