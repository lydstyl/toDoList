let express = require('express');
let session = require('cookie-session'); // Charge le middleware de sessions
let bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
let urlencodedParser = bodyParser.urlencoded({ extended: false });

let app = express();

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    console.log('mi1');
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* Gestion des routes en-dessous
   ....                         */
.get('/', function(req, res) {
    console.log('get1');
    res.render('home.ejs', {
        toDoList: req.session.todolist,
    });
})

.post('/addAToDo', urlencodedParser, function(req, res) {
    console.log('post1');
    req.session.todolist.push(req.body.myTodo);
    res.redirect('/');
})

.get('/delAToDo/:index', function (req, res) {
    console.log('get2');
    req.session.todolist.splice(req.params.index, 1);
    res.redirect('/');
})

// pour la 404
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
})
/* On pourrait aussi rediriger vers la todolist si la page demandée n'est pas trouvée */
// .use(function(req, res, next){
//     console.log('mi2');
//     res.redirect('/');
// })

.listen(2000);