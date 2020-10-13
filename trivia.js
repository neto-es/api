// const response = {
//     response_code: 0,
//     results: [
//         {},
//         {}
//     ]
// }

// let datos = {};

function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const questionsCategory = document.getElementById('question-category').value
    const questionsDifficulty = document.getElementById('questions-difficulty').value
    const questionsType = document.getElementById('questions-type').value
    console.log(questionsQuantity)
    console.log(questionsCategory)
    console.log(questionsDifficulty)
    console.log(questionsType)
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${questionsCategory}&difficulty=${questionsDifficulty}&type=${questionsType}`)
    //fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&difficulty=${questionsDifficulty}`)
    //https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple
    .then(response => response.json())
        .then(data => printCards(data.results))
}

// console.log(datos);


// esta función obtiene las categorías
function getCategories() {
    const endpointCategories = 'https://opentdb.com/api_category.php'
    fetch(endpointCategories)
        .then(response => response.json())
        .then(dataJson => {
            console.log(dataJson)
            printCategories(dataJson.trivia_categories)
        })
        .catch(error => {
          
            console.error(error)
        })
}
// Aquí se muestran las categorías
function printCategories(categories) {
    const selectCategories = document.getElementById('question-category')
    let html = ''
    categories.forEach(category => {
        html += `<option value="${category.id}"> ${category.name}</option>`
    });

    selectCategories.innerHTML = html
}

getCategories()

function selectCategory() {
    const categoryID = document.getElementById('question-category').value
    console.log(categoryID)
    return categoryID
}

function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach(question => {
        const card = returnCardHTML(question);
        container.innerHTML += card;
    });
    // poner las preguntas en mi página web
}

function returnCardHTML(q) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers)}           
                    </div>
                </div>`
    return card;
}


function returnAnswersHTML(correct, incorrects) {
    const correctHTML = `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${correct}
                            </label>
                        </div>`;


    let incorrectHTML = '';
    incorrects.forEach((incorrect) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${incorrect}
                            </label>
                        </div>`;
    })


    return correctHTML + incorrectHTML;
}