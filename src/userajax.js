 // route 1: renders a page that displays all your users.
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

// route 2: renders a page that displays a form which is your search bar.
app.get('/search', (req,res) => {
 res.render('search');
 })

//with for loop
//route 3: takes in the post request from your form, then displays matching users
//on a new page. Users should be matched based on whether either their first or last
//name contains the input string.
app.post('/search', (req, res)=> {
  // console.log(req.body.name)
  let input = req.body.name.toLowerCase();
  fs.readFile('../users.json', (err,data) => {//data is the content of the json file
    if(err) {
      throw err;
    }
    let myUsers = JSON.parse(data);
    //finding the user
    let matchedUsers = [];
    for(let i=0; i<myUsers.length;i++){
      // if(input.toLowerCase() === myUsers[i].firstname.toLowerCase() || input.toLowerCase() === myUsers[i].lastname.toLowerCase()) {
      //   matchedUsers = myUsers[i];//to remember the variable
      // }
      let newMatchedUser = myUsers[i];
      if(newMatchedUser.firstname.toLowerCase().includes(input)=== true || newMatchedUser.lastname.toLowerCase().includes(input) === true){
        matchedUsers.push(newMatchedUser)
        console.log(`Found a user with firstname is ${newMatchedUser.firstname} and lastname is ${newMatchedUser.lastname}`)
      } 
    }
    res.send(matchedUsers);
    // if (matchedUsers !== null){
    //     res.render('matched', {match: matchedUsers});// to access an object you need to refer to the property name NOT the value name in ejs file.
    //     //you can insert as many properties in the object
    // }else {
    //     res.render('empty')
    // }

  })

})

//route 4: renders a page with three forms on it (first name, last name, and email)
//that allows you to add new users to the users.json file.
// route 5: takes in the post request from the 'create user' form, then adds the user
// to the users.json file. Once that is complete, redirects to the route that displays
//all your users (from part 0)
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

//  Starting with your previous website, create a new branch to preserve the old site.
// Your site has a form on it that acts like a search bar. When someone types into the search bar, it should retrieve a list of matching users and list them by name on the same page, similar to how the search bars on airbnb.com or hipmunk.com function.

// Once the user submits the search bar, it should exhibit the same behavior as the previous assignment, i.e. display a new page with the search results.

// Hints:

// use https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf (Links to an external site.)Links to an external site.
// you cannot send or render a response more than once per request.
// you must find a way to capture whenever the user's input changes in the search bar. This will trigger your Ajax request to your server.
// Part 0: If you're having trouble finding matching users, solve this puzzle first:

// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// var fruits = ['apple','orange','pineapple']
// function findIndex(input, inputToFind){
//   var findFruit ={};
//   for(i=0;i<input.length;i++){
//     if(inputToFind === input[i]){
//       return i;;
//     }
//   }
//   if(findFruit.length ===0){
//     return i;
//   }else{
//     return -1;

//   }
// }
// findIndex(fruits,'apple')
// findIndex(fruits,'orange')
// findIndex(fruits,'pineapple')
// findIndex(fruits,'melon')

//another solution with indexOf
// var fruits = ['apple','orange','pineapple'];
// console.log(fruits.indexOf('apple'));
// console.log(fruits.indexOf('orange'));
// console.log(fruits.indexOf('melon'))

// now, write a function that finds all the indexes of where the value is located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

// var cars = ['Ferrari',"BMW",'BMW','Mercedes','Audi']
// function findMyIndex(input, inputToFind){
//    var myIndex = [];
//    for(let i=0; i<input.length; i++){
//    if(inputToFind === input[i]){
//        myIndex.push(i);
//    }

//    }
//    if (myIndex.length == 0) {
//           return -1;
//        }else{
//            return myIndex;
//        }
// }

// findMyIndex(cars,'Ferrari');
// findMyIndex(cars,'BMW');
// findMyIndex(cars,'Audi');
// findMyIndex(cars, 4);

// Remember you are only allowed to call  "response.send" once per request!

// Part 1: Autocomplete
// Modify your form so that every time the user enters a key, it makes an AJAX call that populates the search results.
// Do this work in a git branch called "autocomplete". Then, merge this branch into master with a pull request.


//.keydown()js - front end

//.val() js - front end

//.includes() -> js - back end 

//.append() -> ejs - front end

//jquery request for insert letter in search bar -> .keydown()


//for loop iterates through the user list


//if statement -> if the input letters match with user's name then shows the user(s)



// Part 2: Bandwidth optimization
// Modify your form again so that AJAX requests happen at most once every 300 milliseconds.
// Do this work in a git branch called "bandwidth-optimization". Then, merge this branch into master with a pull request.

// Hints:

// Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now (Links to an external site.)Links to an external site. (Links to an external site.)Links to an external site.
// Test it by opening the Network tab in Chrome's Developer Tools by checking that fewer requests are going off.
// Additional Grading Criteria

// - The app must be able to be run by simply doing "npm install". That means your dependencies must be properly listed in package.json. Otherwise Lindsey will have a difficult time grading everyone's applications. For example: "npm install --save express" will update your dependencies to include the express module.

// example package.json file:

// {
//   "name": "user-information-app",
//   "version": "1.0.0",
//   "dependencies": {
//     "body-parser": "^1.14.2",
//     "express": "^4.13.4",
//     "pug":"2.0.0"
//   }
// }