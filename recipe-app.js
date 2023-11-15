// import the Node.js built-in fs (file system) module, which is used for reading from and writing to files.
const fs = require("fs");

// process.argv is an array that contains the command-line arguments passed to the script. process.argv[2] is used to capture the third argument, 
// process.argv[0] is the path to the Node.js executable, and process.argv[1] is the path to the script being run.
const action = process.argv[2];
const dataFilePath = "./recipea-data.json";

if (action === "read") {
  const id = process.argv[3];

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    const recipes = JSON.parse(data);

    if (id === undefined) {
      console.log("Here are all your recipes:\n");
      recipes.forEach((recipe, index) => {
        console.log(`Recipe ${index}:`);
        console.log(`Name: ${recipe.name}`);
        console.log(`Cooking Method: ${recipe.cookingMethod}`);
        console.log(`Ingredients: ${recipe.ingredients.join(", ")}\n`);
      });
    } else {
      const recipe = recipes[id];
      if (recipe) {
        console.log(`Here is recipe ${id}:\n`);
        console.log(`Name: ${recipe.name}`);
        console.log(`Cooking Method: ${recipe.cookingMethod}`);
        console.log(`Ingredients: ${recipe.ingredients.join(", ")}\n`);
      } else {
        console.log(`Recipe with index ${id} not found.`);
      }
    }
  });
} else if (action === "create") {
  const recipeName = process.argv[3];
  const cookingMethod = process.argv[4];
  const ingredients = process.argv.slice(5);

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    const recipes = JSON.parse(data);
    const newRecipe = {
      name: recipeName,
      cookingMethod: cookingMethod,
      ingredients: ingredients,
    };

    recipes.push(newRecipe);

    const jsonVersion = JSON.stringify(recipes, null, 2);

    fs.writeFile(dataFilePath, jsonVersion, "utf8", (err) => {
      if (err) throw err;
      console.log("Recipe successfully added to the cookbook!");
    });
  });
} else if (action === "update") {
  const id = process.argv[3];
  const recipeName = process.argv[4];
  const cookingMethod = process.argv[5];
  const ingredients = process.argv.slice(6);

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    const recipes = JSON.parse(data);

    if (id >= 0 && id < recipes.length) {
      recipes[id] = {
        name: recipeName,
        cookingMethod: cookingMethod,
        ingredients: ingredients,
      };

      const jsonVersion = JSON.stringify(recipes, null, 2);

      fs.writeFile(dataFilePath, jsonVersion, "utf8", (err) => {
        if (err) throw err;
        console.log(`Recipe at index ${id} successfully updated.`);
      });
    } else {
      console.log(`Recipe with index ${id} not found.`);
    }
  });
} else if (action === "delete") {
  const id = process.argv[3];

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    const recipes = JSON.parse(data);

    if (id >= 0 && id < recipes.length) {
      recipes.splice(id, 1);

      const jsonVersion = JSON.stringify(recipes, null, 2);

      fs.writeFile(dataFilePath, jsonVersion, "utf8", (err) => {
        if (err) throw err;
        console.log(`Recipe at index ${id} successfully deleted.`);
      });
    } else {
      console.log(`Recipe with index ${id} not found.`);
    }
  });
} else {
  console.log('Valid actions are "read", "create", "update", and "delete".');
}


// node recipe-app.js read
// node recipe-app.js read 0
// node recipe-app.js create "Spaghetti with White Sauce" "stove-top boil" "spaghetti" "butter" "flour" "milk" "salt" "pepper" "garlic" "parmesan cheese"
// node recipe-app.js delete 2

