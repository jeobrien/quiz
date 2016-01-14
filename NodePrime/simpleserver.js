var express = require('express');
var app = express();
var request = require('request');
var trie = require('./trie');

var isCompound = function (word, trie) {
  var n = word.length;
  for (var i = 1; i < n-1; i++) {
    var sub1 = word.substring(0, i);
    var sub2 = word.substring(i+1, n-1);
    if (trie.hasWord(sub1) && trie.hasWord(sub2)) {
      return true;
    }
  }
  return false;
};

app.get('/', function (req, res) {
  var url = Object.keys(req.query)[0];
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var content = body.slice().split("\n");
      var userInput = Object.keys(req.query)[0];

      // 1. Store the dictionary words in a trie for easy lookup
      var wordTrie = new trie();
      for (var i = 0; i < content.length; i++) {
        wordTrie.add(content[i]);
      }
      var wordArray = content;
      // 2.For each input word, check if it is present in the trie, and then if its a compound word
      var compoundWords = [];
      for (var j = 0; j < wordArray.length; j++) {
        if (wordTrie.hasWord(wordArray[j])) {
          if (isCompound(wordArray[j], wordTrie)) {
            compoundWords.push(wordArray[j]);
          }
        }
      }
      // 4. Return the longest word in the array of compound words
      var longest = compoundWords.reduce(function (a, b) { return a.length > b.length ? a : b; });
      res.send(longest);
    }
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

