const express = require('express');
const hbs = require('hbs');
var app = express();
var fs = require('fs');





const port = process.env.PORT || 3000;
// defines the directory for the handelbars partials.
hbs.registerPartials(__dirname +'/views/partials');
// sts the view engine 
app.set('view engine', 'hbs');



// a middleware that gives us the date and the http method and the path 
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log= `${now}:${req.method}:${req.url}`
    console.log(log);
    
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log("Unable to append to server.log");
        }
        next();
    });
    
    
});

// a middleware to render the maintenance page
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
    
// });


app.use(express.static(__dirname + '/public'));

// Creates a helper a function that gets called from the handelbars file.
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
    
});

// creaters a helper function that capitalise the text 

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();

})


// setting up the routes, when the user calls '/' the root directory, they will get back the string in the console.log as the body data.


app.get('/',(req, res)=>{

    // res.send('Hello hello, ca can you hear me I can be your china doll if you wanna see me fall.')
    res.render('home.hbs',{
        pageTitle: 'home page',
        welcome: 'Welcome to our website.',
        
    });

});


app.get('/about',(req,res)=>{
    // this renders the template.
    res.render('about.hbs',{
        pageTitle: 'About Page',
        
    });
});

app.get('/projects',(req,res)=>{
    // this renders the template.
    res.render('projects.hbs',{
        pageTitle: 'Projects page',
        
    });
});


app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : "Unable to fulfill request."
    });
});


// app.listen is gonna bind our app to a port on our machine.

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)

});
