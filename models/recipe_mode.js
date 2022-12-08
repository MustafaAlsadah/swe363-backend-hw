const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
let sql;


async function getDbConnection(){
    return await sqlite.open({
        filename: "./recipes_store.db3",
        driver: sqlite3.Database
    });
} 

async function getAllRecipes(){
    const db = await getDbConnection();
    sql = "SELECT * FROM recipes";

    const recipes = await db.all(sql);
    await db.close();

    return recipes;
}
 
async function getRecipeDetail(recipe_id){    
    const db = await getDbConnection();
    sql = await `SELECT * FROM recipes`;
    
    const recipes = await db.all(sql);

    recipes.forEach(async(recipe)=>{
        recipe.ingredients = [];
        recipe.method = [];

        sql = `SELECT * FROM ingredients`;
        const ingredients = await db.all(sql);
        ingredients.forEach((ingredient)=>{
            if(ingredient.recipe_id==recipe.id){
                recipe.ingredients.push(ingredient.item);
            }
        })

        sql = `SELECT * FROM method`;
        const method = await db.all(sql);
        method.forEach((method)=>{
            if(method.recipe_id==recipe.id){
                recipe.method.push(method.step);
            }
        })
    });

    await db.close();
    let selectedRecipe = recipes.filter((recipe)=>{return recipe.id==recipe_id;});

    return selectedRecipe[0]; 
}

async function getComments(recipe_id){
    const db = await getDbConnection();
    let sql = await `SELECT comment, recipe_id, author FROM comments`;

    let comments = await db.all(sql);
    await db.close();

    comments = comments.filter((comment)=>{return comment.recipe_id==recipe_id;});
    return comments;
}

async function addComment(recipe_id, comment){
    const db = await getDbConnection();
    let sql = `INSERT INTO comments(author, comment, recipe_id)
               VALUES(?, ?, ?)`;
    
    db.run(
        sql, [comment.author, comment.comment, recipe_id]
    );

    return `author: ${comment.author}     comment: ${comment.comment}     corresponding_recipe: ${recipe_id}`;
}

module.exports = /* Exporting the functions from the module. */
{getDbConnection, getAllRecipes, getRecipeDetail, getComments, addComment};