# quiz

## Overview
This implementation is in Javascript using a basic Node/Express server.
The user should input the url of where the input is stored as a query string. The server makes a GET request to obtain the file contents and builds up a trie of the words. 

## Run
Open the directory in the terminal, and from the NodePrime root folder, run
```
npm install
```
to get install dependencies and then
```
node simpleserver.js
```

The server will then be listening on port 3000, so go to your local host at that port.
You can then add in whichever input you like in the query string so long as it is valid
for example:
http://localhost:3000/?https://raw.githubusercontent.com/NodePrime/quiz/master/word.list

The response will be the longest compound word in the query string, so for example in the provided input the output is 'electroencephalographically'.

The steps are commented within the simplerserver.js file!
