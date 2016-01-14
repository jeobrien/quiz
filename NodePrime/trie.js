var trie = function() {
  this.head = {};
};

trie.prototype.validate = function(word) {
  if((word === undefined) || (word === null)) { throw new Error('The given word is invalid.'); }
  if (typeof word !== 'string') { throw new Error('The given word is not a string'); }
};

trie.prototype.add = function(word) {
  this.validate(word);

  var current = this.head;

  for (var i = 0; i < word.length; i++) {
    if(!(word[i] in current)) {
      current[word[i]] = {};
    }

    current = current[word[i]];
  }

  current.$ = 1;  //word end marker
};

trie.prototype.hasWord = function(word) {
  this.validate(word);

  var current = this.head;

  for (var i = 0; i < word.length; i++) {
    if(!(word[i] in current)) {
      return false;
    }

    current = current[word[i]];
  }

  return current.$ === 1; //word end marker
};

module.exports = trie;