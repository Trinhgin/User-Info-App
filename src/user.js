/*Create a Node.js application that is the beginning of a user management system.
Your users are all saved in a "users.json" file, and you can currently do the following:
- search for users
- add new users to your users file.
- get your starter file here: users.json
Part 0
Create one route:
- route 1: renders a page that displays all your users.
Part 1
Create two more routes:
- route 2: renders a page that displays a form which is your search bar.
- route 3: takes in the post request from your form, then displays matching users
on a new page. Users should be matched based on whether either their first or last
name contains the input string.
Part 2
Create two more routes:
- route 4: renders a page with three forms on it (first name, last name, and email)
that allows you to add new users to the users.json file.
- route 5: takes in the post request from the 'create user' form, then adds the user
 to the users.json file. Once that is complete, redirects to the route that displays
 all your users (from part 0).*/

const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req,res) => {
  fs.readFile('../users.json', (err,data) => {
    if(err) {
      throw err;
    }
    let myUser = JSON.parse(data);
    console.log("Below is the user list" + data);
    res.render('home', {myUser: myUser});

  })

})

app.get('/search', (req,res) => {
 res.render('search');
 })

//with for loop
app.post('/matched', (req, res)=> {
  fs.readFile('../users.json', (err,data) => {
    if(err) {
      throw err;
    }
    let myUsers = JSON.parse(data);

    //finding the user
    let matchedUser = null;
    for(let i=0; i<myUsers.length;i++){
      if(req.body.firstname === myUsers[i].firstname || req.body.lastname === myUsers[i].lastname) {
        matchedUser = myUsers[i];//to remember the variable
      }
    }

    if (matchedUser !== null){
        res.render('matched', {match: matchedUser});// to access an object you need to refer to the property name NOT the value name in ejs file.
        //you can insert as many properties in the object
    }else {
        res.render('empty')
    }

  })

})

app.get('/edit', (req, res) => {
    res.render('editedUser');
})

app.post('/edit', (req,res) => {
    fs.readFile('../users.json', (err, data) => {
        if(err){
            throw err;
        }else {
            // transform the text in our file to JSON
            let users = JSON.parse(data);
            // read the information from the form
            // let newUser = req.body; or below

            let newUser = {};
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.email = req.body.email;

            // add the information from the form of app.get to the list of users
            users.push(newUser); // now the array contains 5 usres

            // transform the list of all users from JSON to regular text
            // (including the new user from the form)
            let textToWriteToFile = JSON.stringify(users);

            // save the text to users.json file
            fs.writeFile('../users.json', textToWriteToFile, (err)=>{
                if(err){
                    throw err;
                }
                // res.render('newuser', {allUsers: users});
                res.redirect('/');
            });

        }

    })

})

 app.listen(3000, () => {
   console.log('App is running on port 3000');
 })
