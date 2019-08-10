STORE = {
    currentVIEW: 'Welcome'
}

const VIEWS = {
    'Welcome': renderWelcomePage,
    'Results': renderResultsPage,
    'Directions': renderDirectionsPage,
}

function renderNextPage(userDrinkSelect) {
    $(".search-results").empty()
    $(".drink-page").empty()
    VIEWS[STORE.currentVIEW](userDrinkSelect)
}

function renderWelcomePage() {
    console.log("rendering welcome page")
}

function renderResultsPage() {
    console.log("rendering search results page")

}

function renderDirectionsPage(userDrinkSelect) {
    console.log("rendering Directions page")
    fetchDrinkAPI(userDrinkSelect)
}

function fetchDrinkAPI(userDrinkSelect) {
    return fetch(`https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=${userDrinkSelect}`)
        .then(res => res.json())
        .then(data => {
            data.drinks.map(function (item) {
                const itemPic = item.strDrinkThumb
                const itemName = item.strDrink
                const itemGlass = item.strGlass
                const itemIng = [item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4, item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8, item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12, item.strIngredient13, item.strIngredient14, item.strIngredient15].filter(Boolean).join(", ")
                const itemInst = item.strInstructions
                renderSelectedItem(itemPic, itemName, itemGlass, itemIng, itemInst)
            })
        })
        .catch(err => console.log(err))
}

function renderSelectedItem(itemPic, itemName, itemGlass, itemIng, itemInst) {
    $(".drink-page").append(
        `
        <span class="item-page">
        <img class="drink-pic" src=${itemPic}>
        <span class="text-background">
        <p class="drink-name">${itemName}</p>
        <p class="drink-glass">Glass type: ${itemGlass}</p>
        <p class="drink-ing">Ingredients: ${itemIng}</p>
        <p class="drink-inst">Instructions: ${itemInst}</p>
        </span>
        </span>
        `
    )
}


//JQuery for Search Submit
$("form").on("submit", function (event) {
    event.preventDefault()
    const userInput = $(event.currentTarget).find("#user-input").val().split(", ").join(",")
    let userHighLight = []
    $(event.currentTarget).find("input[name='spirits']:checked").each(function () {
        userHighLight.push(this.value)
    })
    userHighLight = userHighLight.join(",")
    console.log(userHighLight + "," + userInput)
    STORE.currentVIEW = 'Results'
    fetchAPI(userHighLight + "," + userInput)
    renderNextPage()
})


//JQuery for Search List Item Select
$(".search-results").on("click", ".drink-span", function (event) {
    event.preventDefault()
    const userDrinkSelect = $(event.currentTarget).attr("data-id")
    STORE.currentVIEW = 'Directions'
    renderNextPage(userDrinkSelect)
})

//Filter Toggle
$("img").on("click", function(event){
    $(event.currentTarget).closest("img").toggleClass("grey")
}
)

function fetchAPI(userInput) {
    console.log("fetching API" + ' ' + userInput)
    return fetch(`https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=${userInput}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks)
            if (data.drinks === "None Found") {
                renderError()
            }
            else {
                data.drinks.map(function (item) {
                    const itemPic = item.strDrinkThumb
                    const itemName = item.strDrink
                    const itemId = item.idDrink
                    renderResultItems(itemPic, itemName, itemId)
                })
            }
        })
        .catch(err => console.log(err))
}

function renderError() {
    $(".search-results").append(
        `
        <p class="error">No drinks were found!</p>
        `
    )
}

function renderResultItems(itemPic, itemName, itemId) {
    $(".search-results").append(
        `
        <span class="drink-span" data-id="${itemId}">
        <p class="results-drink-name">${itemName}</p>
        <img alt="${itemName}" class="results-drink-pic" src=${itemPic}>
        </span>
        `
    )
}


$(VIEWS[STORE.currentVIEW])