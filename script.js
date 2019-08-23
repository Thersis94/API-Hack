"use strict";

const STORE = {
  currentVIEW: "Welcome"
};

const VIEWS = {
  'Welcome': renderWelcomePage,
  'Directions': renderDirectionsPage,
};

function renderNextPage(userDrinkSelect) {
  $(".drink-page").empty();
  VIEWS[STORE.currentVIEW](userDrinkSelect);
}

function renderWelcomePage() {
  $("#go-back").hide();
  $(".search-results").empty()
  $(".drink-page").empty()
  $(".drink-selectors").show()
  $(".ing-list").hide()
}

function renderDirectionsPage(userDrinkSelect) {
  fetchDrinkAPI(userDrinkSelect);
  $('.drink-selectors').hide();
  $("#go-back").show();
}

function fetchDrinkAPI(userDrinkSelect) {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=${userDrinkSelect}`
  )
    .then(res => res.json())
    .then(data => {
      data.drinks.map(function(item) {
        const itemPic = item.strDrinkThumb;
        const itemName = item.strDrink;
        const itemGlass = item.strGlass;
        const itemIng = [
          item.strIngredient1,
          item.strIngredient2,
          item.strIngredient3,
          item.strIngredient4,
          item.strIngredient5,
          item.strIngredient6,
          item.strIngredient7,
          item.strIngredient8,
          item.strIngredient9,
          item.strIngredient10,
          item.strIngredient11,
          item.strIngredient12,
          item.strIngredient13,
          item.strIngredient14,
          item.strIngredient15
        ]
          .filter(Boolean)
          .join(", ");
        const itemInst = item.strInstructions;
        renderSelectedItem(itemPic, itemName, itemGlass, itemIng, itemInst);
      });
    })
    .catch(err => console.log(err));
}

function renderSelectedItem(itemPic, itemName, itemGlass, itemIng, itemInst) {
  $("#go-back").show();
  $(".drink-page").append(
    `
        <span class="item-page">
        <img class="drink-pic" alt="a picture of ${itemName}"} src=${itemPic}>
        <span class="text-background">
        <p class="drink-name">${itemName}</p>
        <p class="drink-glass">Glass type: ${itemGlass}</p>
        <p class="drink-ing">Ingredients: ${itemIng}</p>
        <p class="drink-inst">Instructions: ${itemInst}</p>
        </span>
        </span>
        `
  );
}

function generateIngList() {
  $("#go-back").hide();
ingArray.map(function(ing) {

  renderIngList(ing)
})
}

function renderIngList(ing) {
  console.log(ing)
$('.ing-list').append(
  `
  <p class="ing-item">${ing}</p>
  `
)
}

//JQuery for Search Submit
$("form").on("submit", function(event) {
  event.preventDefault();
  $('#go-back').show();
  $('.ing-list').empty();
  $(".search-results").empty().show();
  const userInput = $(event.currentTarget)
    .find("#user-input")
    .val()
    .split(", ")
    .join(",");
  let userHighLight = [];
  $(event.currentTarget)
    .find("input[name='spirits']:checked")
    .each(function() {
      userHighLight.push(this.value);
    });
  userHighLight = userHighLight.join(",");
  fetchAPI(userHighLight + "," + userInput);
  renderNextPage();
});

//JQuery for Search List Item Select
$(".search-results").on("click", ".drink-span", function(event) {
  event.preventDefault();
  $(".search-results").hide();
  const userDrinkSelect = $(event.currentTarget).attr("data-id");
  STORE.currentVIEW = "Directions";
  renderNextPage(userDrinkSelect);
});

//Filter Toggle
$("img").on("click", function(event) {
  $(event.currentTarget)
    .closest("img")
    .toggleClass("grey");
});

//Return to welcome
$(".page-name").on("click", function(event) {
  STORE.currentVIEW = "Welcome";
  renderNextPage()
})

//Back to search
$("#go-back").on("click", function(event) {
  $(".drink-page").empty();
  $(".search-results").show();
})

//List Ingredients
$('#ing-list-button').on("click", function(event) {
  $("#go-back").show();
  $('.ing-list').show();
  generateIngList()
})

function fetchAPI(userInput) {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=${userInput}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.drinks === "None Found") {
        renderError();
      } else {
        data.drinks.map(function(item) {
          const itemPic = item.strDrinkThumb;
          const itemName = item.strDrink;
          const itemId = item.idDrink;
          renderResultItems(itemPic, itemName, itemId);
        });
      }
    })
    .catch(err => console.log(err));
}

function renderError() {
  $(".search-results").append(
    `
        <p class="error">No drinks were found!</p>
        `
  );
}

function renderResultItems(itemPic, itemName, itemId) {
  $(".search-results").append(
    `
        <span class="drink-span" data-id="${itemId}">
        <p class="results-drink-name">${itemName}</p>
        <img alt="${itemName}" class="results-drink-pic" src=${itemPic}>
        </span>
        `
  );
}

const ingArray = [
"151 proof rum",
"7-up",
"Absinthe",
"Absolut citron",
"Absolut Kurant",
"Absolut Peppar",
"Absolut Vodka",
"Advocaat",
"Aejo rum",
"Aftershock",
"Agave syrup",
"Ale",
"Allspice",
"Almond Extract",
"Almond flavoring",
"Almond",
"Amaretto",
"Angelica Root",
"Angostura Bitters",
"Anis",
"Anise",
"Anisette",
"Aperol",
"Apfelkorn",
"Apple Brandy",
"Apple Cider",
"Apple Juice",
"Apple schnapps",
"Apple",
"Applejack",
"Apricot Brandy",
"Apricot nectar",
"Apricot",
"Aquavit",
"Asafoetida",
"A?ejo rum",
"Baby Plum Tomatoes",
"Bacardi Limon",
"Bacardi",
"Bacon",
"Bailey's irish cream",
"Baileys irish cream",
"Banana liqueur",
"Banana rum",
"Banana syrup",
"Banana",
"Barenjager",
"Basil",
"Beef bouillon",
"Beef Stock",
"Beer",
"Benedictine",
"Berries",
"Bitter lemon",
"Bitters",
"Black Pepper",
"Black rum",
"Black Sambuca",
"Blackberries",
"Blackberry Brandy",
"Blackberry schnapps",
"Blackcurrant cordial",
"Blackcurrant schnapps",
"Blackcurrant squash",
"Blended Whiskey",
"Blue Curacao",
"Blue Maui",
"Blueberries",
"Blueberry schnapps",
"Bourbon",
"Bow Tie Pasta",
"Bramley Apples",
"Brandy",
"Bread",
"Brown Rice",
"Brown Sugar",
"Butter, softened",
"Butter",
"Butterscotch schnapps",
"Cachaca",
"Calvados",
"Campari",
"Canadian whisky",
"Candy",
"Cantaloupe",
"Caramel coloring",
"Carbonated soft drink",
"Carbonated water",
"Cardamom",
"Carrot",
"Caster Sugar",
"Cayenne pepper",
"Celery salt",
"Celery",
"Chambord raspberry liqueur",
"Champagne",
"Cheese",
"Cherries",
"Cherry Brandy",
"Cherry cola",
"Cherry Grenadine",
"Cherry Heering",
"Cherry juice",
"Cherry liqueur",
"Cherry",
"Chicken Breasts",
"Chicken Stock",
"Chicken",
"Chilled Butter",
"Chinese Broccoli",
"Chocolate ice-cream",
"Chocolate liqueur",
"Chocolate milk",
"Chocolate syrup",
"Chocolate",
"Chopped Garlic",
"Chopped Onion",
"Chopped Tomatoes",
"Cider",
"Cinnamon schnapps",
"Cinnamon",
"Citrus vodka",
"Clamato juice",
"Clove",
"Cloves",
"Club Soda",
"Coca-Cola",
"Cocktail Olive",
"Cocktail onion",
"Cocoa Powder",
"Coconut cream",
"Coconut liqueur",
"Coconut Milk",
"Coconut rum",
"Coconut syrup",
"Coffee brandy",
"Coffee liqueur",
"Coffee",
"Coffeemate",
"Cognac",
"Cointreau",
"Cola",
"Cold Water",
"Condensed milk",
"Coriander Leaves",
"Coriander",
"Corn Starch",
"Corn syrup",
"Corn Tortillas",
"Cornstarch",
"Corona",
"Courgette",
"Cranberries",
"Cranberry Juice",
"Cranberry liqueur",
"Cranberry vodka",
"Cream of Coconut",
"Cream Sherry",
"Cream soda",
"Cream",
"Creme de Almond",
"Creme De Banane",
"Creme de Cacao",
"Creme de Cassis",
"Creme de Noyaux",
"Creme Fraiche",
"Crown Royal",
"Crystal light",
"Cubed Feta Cheese",
"Cucumber",
"Cumin powder",
"Cumin seed",
"Curacao",
"Cynar",
"Daiquiri mix",
"Dark Chocolate",
"Dark Creme de Cacao",
"Dark Rum",
"Dark Soy Sauce",
"demerara sugar",
"Digestive Biscuits",
"Dijon Mustard",
"Doner Meat",
"Dr Pepper",
"Dr. Pepper",
"Drambuie",
"Dried Oregano",
"Dry Vermouth",
"Dubonnet blanc",
"Dubonnet Rouge",
"Egg White",
"Egg Yolk",
"Egg",
"Eggnog",
"Eggs",
"Enchilada Sauce",
"English Mustard-Small .png",
"Erin Cream",
"Espresso",
"Everclear",
"Extra Virgin Olive Oil",
"Fanta",
"Farfalle",
"Fennel Seeds",
"Feta Cheese",
"Firewater",
"Flaked Almonds",
"Flour",
"Food coloring",
"Forbidden Fruit",
"Frangelico",
"Free-range Egg, Beaten",
"Free-range Eggs, Beaten",
"Fresca",
"Fresh Basil",
"Fresh Lemon Juice",
"Freshly Chopped Parsley",
"Fries",
"Fruit juice",
"Fruit punch",
"Fruit",
"Galliano",
"Garlic Sauce",
"Garlic",
"Gatorade",
"Gin",
"Ginger Ale",
"Ginger beer",
"Ginger",
"Glycerine",
"Godiva liqueur",
"Gold rum",
"Gold Tequila",
"Goldschlager",
"Gouda Cheese",
"Grain Alcohol",
"Grand Marnier",
"Granulated Sugar",
"Grape juice",
"Grape soda",
"Grapefruit Juice",
"Grapes",
"Grated Cheese",
"Green Chartreuse",
"Green Creme de Menthe",
"Green Ginger Wine",
"Green Olives",
"Green Red Lentils",
"Grenadine",
"Ground Almonds",
"Ground Ginger",
"Guava juice",
"Guinness stout",
"Guinness",
"Half-and-half",
"Hawaiian punch",
"Hazelnut liqueur",
"Heavy cream",
"Honey",
"Hooch",
"Hoopers Hooch",
"Hot Beef Stock",
"Hot Chocolate",
"Hot Damn",
"Hot Sauce",
"Hotsauce",
"Hpnotiq",
"Ice-Cream",
"Ice",
"Iced tea",
"Irish cream",
"Irish Whiskey",
"Italian Seasoning",
"Jack Daniels",
"Jello",
"Jelly",
"Jgermeister",
"Jim Beam",
"Johnnie Walker",
"J?ermeister",
"Kahlua",
"Key Largo Schnapps",
"Kirschwasser",
"Kiwi liqueur",
"Kiwi",
"Kool-Aid",
"Kummel",
"Lager",
"Lasagne Sheets",
"Lasagne",
"Lean Minced Beef",
"Lemon Juice",
"Lemon Peel",
"Lemon soda",
"Lemon vodka",
"Lemon-lime soda",
"lemon-lime",
"lemon",
"Lemonade",
"Lentils",
"Lettuce",
"Licorice Root",
"Light Cream",
"Light Rum",
"Lillet",
"Lime juice cordial",
"Lime Juice",
"Lime liqueur",
"Lime peel",
"Lime vodka",
"Lime",
"Limeade",
"Madeira",
"Malibu Rum",
"Malt Vinegar",
"Mandarin",
"Mandarine napoleon",
"Mango",
"Maple syrup",
"Maraschino cherry juice",
"Maraschino Cherry",
"Maraschino Liqueur",
"Margarita mix",
"Marjoram leaves",
"Marshmallows",
"Maui",
"Melon liqueur",
"Melon vodka",
"Mezcal",
"Midori melon liqueur",
"Midori-Small .png",
"Milk",
"Minced Beef",
"Minced Garlic",
"Mint syrup",
"Mint",
"Mountain Dew",
"Mozzarella Balls",
"Mozzarella",
"Mushroom",
"Mushrooms",
"Mustard",
"Nutmeg",
"Nuts",
"Olive Oil",
"Olive",
"Onion",
"Onions",
"Orange Bitters",
"Orange Curacao",
"Orange Juice",
"Orange liqueur",
"Orange Peel",
"Orange rum",
"Orange Soda",
"Orange spiral",
"Orange vodka",
"Orange",
"Oregano",
"Oreo cookie",
"Orgeat Syrup",
"Ouzo",
"Oyster Sauce",
"Papaya juice",
"Papaya",
"Parfait d' amour",
"Parmesan Cheese",
"Parmesan",
"Parmigiano-Reggiano",
"Parsley",
"Passion fruit juice",
"Passion fruit syrup",
"Passoa",
"Peach brandy",
"Peach juice",
"Peach liqueur",
"Peach Nectar",
"Peach Schnapps",
"Peach Vodka",
"Peach",
"Peachtree schnapps",
"Peanut Oil",
"Peas",
"Penne Rigate",
"Pepper",
"Peppermint extract",
"Peppermint Schnapps",
"Pepsi Cola",
"Pernod",
"Peychaud bitters",
"Pina colada mix",
"Pineapple Juice",
"Pineapple rum",
"Pineapple vodka",
"Pineapple-orange-banana juice",
"Pineapple",
"Pink lemonade",
"Pisang Ambon",
"Pisco",
"Pi?a colada",
"Plain Chocolate",
"Plain Flour",
"Plum Tomatoes",
"Plums",
"Port",
"Potato",
"Potatoes",
"Powdered Sugar",
"Prawns",
"Purple passion",
"Raisins",
"Raspberry cordial",
"Raspberry Jam",
"Raspberry juice",
"Raspberry liqueur",
"Raspberry schnapps",
"Raspberry syrup",
"Raspberry Vodka",
"Raw King Prawns",
"Red Chile Flakes",
"Red Chili Flakes",
"Red Hot Chili Flakes",
"Red Lentils",
"Red Wine",
"Rhubarb",
"Ricard",
"Rice Stick Noodles",
"Rock Salt",
"Root beer schnapps",
"Root beer",
"Roses sweetened lime juice",
"Rosewater",
"Rum",
"Rumple Minze",
"Rye whiskey",
"Sake",
"Salmon",
"Salt",
"Sambuca",
"Sarsaparilla",
"Schnapps",
"Schweppes Lemon",
"Schweppes Russchian",
"Schweppes Russchiani",
"Scotch",
"Sesame Seed",
"Sherbet",
"Sherry",
"Shredded Cheese",
"Shredded Monterey Jack Cheese",
"Sirup of roses",
"Sloe Gin",
"Small.png",
"Soda Water",
"Sour Apple Pucker",
"Sour Mix",
"Southern Comfort",
"Soy Milk",
"Soy Sauce",
"Soya Milk",
"Soya Sauce",
"Spaghetti",
"Spiced Rum",
"Spinach",
"Sprite",
"Squeezed Orange",
"Squirt",
"Stir-fry Vegetables",
"Strawberries",
"Strawberry juice",
"Strawberry liqueur",
"Strawberry Schnapps",
"Strawberry syrup",
"Sugar Syrup",
"Sugar",
"Sunny delight",
"Surge",
"Swedish punsch",
"Sweet and Sour",
"Sweet Cream",
"Sweet Vermouth",
"Tabasco Sauce",
"Tang",
"Tawny port",
"Tea",
"Tennessee whiskey",
"Tequila rose",
"Tequila",
"Tia Maria",
"Tinned Tuna",
"Tomato Juice",
"Tomato Puree",
"Tomato",
"Tomatoe",
"Tomatoes",
"Tonic Water",
"Triple Sec",
"Tropicana",
"Tuaca",
"Tuna",
"Vanilla extract",
"Vanilla Ice-Cream",
"Vanilla liqueur",
"Vanilla schnapps",
"Vanilla syrup",
"Vanilla vodka",
"Vanilla",
"Vegan Butter",
"Vermouth",
"Vinegar",
"Vodka",
"Water",
"Watermelon schnapps",
"Whipped Cream",
"Whipping Cream",
"Whiskey",
"Whisky",
"White chocolate liqueur",
"White Creme de Menthe",
"White grape juice",
"White port",
"White Rum",
"White Vinegar",
"White Wine",
"Wild Turkey",
"Wildberry schnapps",
"Wine",
"Worcestershire Sauce",
"Wormwood",
"Yeast",
"Yellow Chartreuse",
"Yoghurt",
"Yukon Jack",
"Zima",
"Zucchini"]

$(VIEWS[STORE.currentVIEW]);
