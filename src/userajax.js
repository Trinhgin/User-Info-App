const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public/css'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  fs.readFile('../public/json/users.json', (err, data) => {
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
  fs.readFile('../public/json/users.json', (err, data) => {
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
  fs.readFile('../public/json/users.json', (err, data) => {
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

      fs.writeFile('../public/json/users.json', textToWriteToFile, (err) => {
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
