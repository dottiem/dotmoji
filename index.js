const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var emoji = require('emoji.json')


var secretDictionary = new Object();
secretDictionary["i"] = emoji[404].char;
secretDictionary["you"] = emoji[884].char;
secretDictionary["am"] = emoji[577].char;
secretDictionary["are"] = emoji[396].char;
secretDictionary["hello"] = emoji[386].char;
secretDictionary["yes"] = emoji[413].char;
secretDictionary["no"] = emoji[415].char;
secretDictionary["agree"] = emoji[24].char;
secretDictionary["disagree"] = emoji[410].char;


secretDictionary["cora"] = "👑";
secretDictionary["dottie"] = "⚽";
secretDictionary["veda"] = "📘"
secretDictionary["esther"] = "🐻"; 
secretDictionary["scarlett"] = "💀"; 
secretDictionary["fergus"] = "🐶"; 
secretDictionary["tired"] = "😴";
secretDictionary["sleepy"] = "😴";
secretDictionary["awake"] = "😊";
secretDictionary["adorable"] = "😍";
secretDictionary["awesome"] = "👍";
secretDictionary["asleep"] = "💤";
secretDictionary["happy"] = "😄";
secretDictionary["bathroom"] = "💩";
secretDictionary["sad"] = "😦";
secretDictionary["angry"] = "😠";
secretDictionary["hungry"] = "🎂";
secretDictionary["cukoo"] = "👉";
secretDictionary["crazy"] = "👉";
secretDictionary["gross"] = "😰";
secretDictionary["shush"] = "😈";
secretDictionary["stinky"] = "👃";
secretDictionary["funny"] = "😂";




var app = express().use(express.static(path.join(__dirname, 'public'))).set('views', path.join(__dirname, 'views')).set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index', {}))

app.get('/wallpaper', (req, res) => res.render('pages/wallpaper', { emojis: emoji } ))
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
