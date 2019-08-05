STORE = {
    currentVIEW: 'Welcome'
}

const VIEWS = {
    'Welcome' : renderWelcomePage,
    'Results' : renderResultsPage,
    'Directions' : renderDirectionsPage,
}

function renderWelcomePage() {
    console.log("rendering welcome page")
}

function renderResultsPage() {

}

function renderDirectionsPage() {

}



$(VIEWS[STORE.currentVIEW])