var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})


/* Gestion des routes en-dessous
   ....                         */

.get('/', function(req, res) {
    res.render('home.ejs', {
        maVar: req.session.todolist
    });
})

.post('/addAToDo', urlencodedParser, function(req, res) {
    // req.session.myTodo = req.body.myTodo;
    req.session.todolist.push(req.body.myTodo);
    // res.render('home.ejs', {
    //     maVar: req.session.todolist 
    // });
    res.redirect('/');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/');
})

.listen(2000);