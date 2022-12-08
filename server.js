const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const {getDbConnection, getAllRecipes, getRecipeDetail, getComments, addComment} = require("C:/Users/acer/Desktop/VS_Code_Lib/node playground/models/recipe_mode.js");
const port = 8080;
const path = require("path");
const bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: false }))
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());

 
nunjucks.configure(["views/"], {
    autoscape: false,
    express: app
});    
     
app.get("/", (req, res)=>{
    getAllRecipes().then((recipes)=>{
        res.render(path.join(__dirname, "views/index.html"), {
            recipes: recipes
        });
    })
});
              
app.get("/recipes/:recipe_id", (req, res)=>{
    getRecipeDetail(req.params.recipe_id).then((recipe)=>{
        getComments(req.params.recipe_id).then(comments=>{
             
            res.render(path.join(__dirname, "views/recipe.html"), {
                recipeDetails: recipe,
                recipeComments: comments, 
                plusImg: "/PlusSign.jpg"
            })
        })
    })
});  
    
app.post("/recipes/:recipe_id/comments", (req, res)=>{
    let formContent = {
                        author: req.body.author, 
                        comment: req.body.comment
                      };
    addComment(req.params.recipe_id, formContent).then(metadata=>{
        res.send(metadata);
    })
})

app.get("/recipes/:recipe_id/comments", (req, res)=>{
    getComments(req.params.recipe_id).then(list=>{
        res.send(list);
    })
})
   
app.listen(port, function(){  
    console.log("Server listening on port ", port);
})

  



