const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var emoji = require('emoji.json')


var secretDictionary = new Object();
secretDictionary["hello"] = emoji[386].char;
secretDictionary["i"] = "👁";
secretDictionary["you"] = "⭐";
secretDictionary["am"] = "🕸";
secretDictionary["are"] = "👂";
secretDictionary["yes"] = "❤";
secretDictionary["no"] = "💔";
secretDictionary["agree"] = "😐";
secretDictionary["disagree"] = "👄";
secretDictionary["okay"] = "👌";
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
secretDictionary["poop"] = "💩";
secretDictionary["sad"] = "😦";
secretDictionary["angry"] = "😠";
secretDictionary["hungry"] = "🎂";
secretDictionary["cukoo"] = "👉";
secretDictionary["crazy"] = "👉";
secretDictionary["gross"] = "😰";
secretDictionary["shush"] = "😈";
secretDictionary["stinky"] = "👃";
secretDictionary["funny"] = "😂";
secretDictionary["hatchimal"] = "🥚";
secretDictionary["santa"] = "🎅";
secretDictionary["santa claus"] = "🎅";
secretDictionary["stuffy"] = "🐖";
secretDictionary["christmas"] = "🎄";
secretDictionary["present"] = "🎁";
secretDictionary["presents"] = "🎁";
secretDictionary["pencil"] = "✏";
secretDictionary["idea"] = "💥";
secretDictionary["morning"] = "🌅";
secretDictionary["Day"] = "🌞";
secretDictionary["sun"] = "🌞";
secretDictionary["night"] = "🌜";
secretDictionary["nighttime"] = "🌜";
secretDictionary["moon"] = "🌜";
secretDictionary["parent"] = "👤";
secretDictionary["parents"] = "👥";
secretDictionary["new years"] = "🎉";
secretDictionary["new years eve"] = "🎉";
secretDictionary["tv"] = "📺";
secretDictionary["television"] = "📺";
secretDictionary["video game"] = "🎮";
secretDictionary["pen"] = "🖊";
secretDictionary["sled"] = "🐧";
secretDictionary["sledding"] = "🐧";
secretDictionary["snow"] = "❄";
secretDictionary["snowboard"] = "🏂";
secretDictionary["snowboarding"] = "🏂";
secretDictionary["fart"] = "💣";
secretDictionary["farted"] = "💣";
secretDictionary["stink bomb"] = "💣";
secretDictionary["time"] = "⏲";
secretDictionary["iPhone"] = "📱";
secretDictionary["want"] = "✌";
secretDictionary["watch"] = "👀";
secretDictionary["play"] = "👅";
secretDictionary["snowing "] = "🌨";
secretDictionary["sharpen"] = "🗡";
secretDictionary["love"] = "😎";
secretDictionary["hate"] = "😖";
secretDictionary["get dressed"] = "👖";
secretDictionary["dressed"] = "👖";
secretDictionary["getting dressed"] = "👖";




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
