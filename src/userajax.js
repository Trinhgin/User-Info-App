// Part 0: If you're having trouble finding matching users, solve this puzzle first:

// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

var fruits = ['apple','orange','pineapple']
function findIndex(input, inputToFind){
  var findFruit ={};
  for(i=0;i<input.length;i++){
    if(inputToFind === input[i]){
      return i;;
    }
  }
  if(findFruit.length ===0){
    return i;
  }else{
    return -1;

  }
}
findIndex(fruits,'apple')
findIndex(fruits,'orange')
findIndex(fruits,'pineapple')
findIndex(fruits,'melon')

// now, write a function that finds all the indexes of where the value is located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

var cars = ['Ferrari',"BMW",'BMW','Mercedes','Audi']
function findMyIndex(input, inputToFind){
   var myIndex = [];
   for(let i=0; i<input.length; i++){
   if(inputToFind === input[i]){
       myIndex.push(i);
   }

   }
   if (myIndex.length == 0) {
          return -1;
       }else{
           return myIndex;
       }
}

findMyIndex(cars,'Ferrari');
findMyIndex(cars,'BMW');
findMyIndex(cars,'Audi');
findMyIndex(cars, 4);



const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  fs.readFile('../users.json', (err, data) => {
    if (err) {
      throw err;
    }
    let myUser = JSON.parse(data);
    console.log("Below is the user list" + data);
    res.render('home', { myUser: myUser });

  })

})

app.get('/search', (req, res) => {
  res.render('search');
})


app.post('/matched', (req, res) => {
  // console.log(req.body.name)
  let input = req.body.name.toLowerCase();
  fs.readFile('../users.json', (err, data) => {
    if (err) {
      throw err;
    }
    let myUsers = JSON.parse(data);
    let matchedUsers = [];
    for (let i = 0; i < myUsers.length; i++) {
      let newMatchedUser = myUsers[i];
      if (newMatchedUser.firstname.toLowerCase().includes(input) === true || newMatchedUser.lastname.toLowerCase().includes(input) === true) {
        matchedUsers.push(newMatchedUser)
        console.log(`Found a user with firstname is ${newMatchedUser.firstname} and lastname is ${newMatchedUser.lastname}`)
      }
    }
    res.send(matchedUsers);
  })
})

app.get('/edit', (req, res) => {
  res.render('editedUser');
})

app.post('/edit', (req, res) => {
  fs.readFile('../users.json', (err, data) => {
    if (err) {
      throw err;
    } else {
    
      let users = JSON.parse(data);
      
      let newUser = {};
      newUser.firstname = req.body.firstname;
      newUser.lastname = req.body.lastname;
      newUser.email = req.body.email;
      users.push(newUser); 
      let textToWriteToFile = JSON.stringify(users);

      fs.writeFile('../users.json', textToWriteToFile, (err) => {
        if (err) {
          throw err;
        }
        
        res.redirect('/');
      });

    }

  })

})

app.listen(3000, () => {
  console.log('App is running on port 3000');
})
