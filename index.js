const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var emoji = require('emoji.json')


var secretDictionary = new Object();
secretDictionary["i"] = emoji[404].char;


var app = express().use(express.static(path.join(__dirname, 'public'))).set('views', path.join(__dirname, 'views')).set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index', {}))

app.get('/translator', (req, res) => res.render('pages/translator', {}))

app.get('/emojis', (req, res) => res.render('pages/emojis', { emojis: emoji } ))

app.get('/translate/:id', function(request, response) {
	
	
	
	var number = request.params.id;
	var words = request.params.id.split(' ');
	var translation = [];
	var pos = 0;
	words.forEach(word => {
		if (word != null && word != "") {
			var lowercaseWord = word.toLowerCase();
			if (lowercaseWord in secretDictionary) {
				translation[pos] = secretDictionary[lowercaseWord]; 
			} else {
				translation[pos] = word;
			}
			pos++;
		}
	});
	response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify(translation));
  
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
