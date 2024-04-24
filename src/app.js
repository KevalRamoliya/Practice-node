const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const registerdata = require('./models/regis');
//bcrypt
const bcrypt = require('bcrypt');

require("./db/connect")

const static_path = path.join(__dirname, "public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//json and web format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login");
})


//register Post data 
app.post("/register", async(req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new registerdata({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })

            const jwt = require('jsonwebtoken');

            // const createTOekn = async() => {
            //     const token = await jwt.sign({id:"66224c8b0d2771ca64c95e87"},"myfullnameiskevalramoliyavipulbhaiiamamernstackdeveloper")
            //     console.log(token);
            
            //     const userver = await jwt.verify(token,"myfullnameiskevalramoliyavipulbhaiiamamernstackdeveloper")
            //     console.log(userver);
            // }
            // createTOekn();

                    // Save the registered user to the database
                    const registerdata = await registerEmployee.save();

                    const token = jwt.sign({ id: registerdata._id }, "mynameiskevalramoliyaandiamamernstackdeveloper");
                    console.log("This is crated token: " + token);

            const registerd = await registerEmployee.save(); 
            res.status(201).render("index")
        }else{
            res.status(400).send("Password are not matching")
        }

    }catch(err){
        res.status(400).send();
    }
})

//Log in post data
// app.post("/login", async(req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         const user = await registerdata.findOne({email: email, password: password});
//         if (user) {
//             res.status(200).render('index');
//             console.log(user);
//         } else {
//             res.status(400).send("Invalid email or password");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

//json web token



app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});