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
  function printCategories(categories) {
    const selectCategories = document.getElementById('select-categories')
  
    let html = ''
    categories.forEach(category => {
        html += `<option value="${category.id}"> ${category.name}</option>`
    });
    selectCategories.innerHTML = html
  }
  
  getCategories()
  
  
  function selectCategory() {
    const categoryID = document.getElementById('select-categories').value
    console.log(categoryID)
    return categoryID
  }
  
  function selectNumber() {
    const numberAmount = document.getElementById('selectNumberQuestions').value
    console.log(numberAmount)
    return numberAmount
  }
  
  function selectType() {
    const Typequestion = document.getElementById('selectTypeQuest').value
    console.log(Typequestion)
    return Typequestion
  }
  
  function selectDifficult() {
    const difficultQuestion = document.getElementById('selectDifficult').value
    console.log(difficultQuestion)
    return difficultQuestion
  }
  
  function ReceiveData() {
    const endpoint = `https://opentdb.com/api.php?amount=${selectNumber()}&category=${selectCategory()}&difficulty=${selectDifficult()}&type=${selectType()}`
    console.log(endpoint)
    return endpoint
  }
  
  
  function getDataTrivia() {
    fetch(ReceiveData())
        .then(response => response.json())
        .then(dataJsonT => {
            console.log(dataJsonT)
            if(dataJsonT.response_code == 0) {
              PrintQuestions(dataJsonT.results)
            } else {
              alert('No hay datos')
            }
        })
        .catch(error => {
            console.error(error)
        })
  }
  function PrintQuestions(Questions) {
    const PrintQuestions = document.getElementById(`Questions`)
  
  
  if (selectType() =='multiple'){
  
     const CorrectQuest = Questions.map(function(CorrectAns) {
        return CorrectAns.correct_answer
    })
  
     const IncorrectQuest1 = Questions.map(function(incorrectAnswer) {
         return incorrectAnswer.incorrect_answers[0]
     })
     const IncorrectQuest2 = Questions.map(function(incorrectAnswer) {
        return incorrectAnswer.incorrect_answers[1]
    })
    const IncorrectQuest3 = Questions.map(function(incorrectAnswer) {
        return incorrectAnswer.incorrect_answers[2]
    })
  
  
     let html = ``
     Questions.forEach((question, index)=>{
         html += `<div class="card m-2 card-boddy">
                    <div class="card-body">
                      ${question.question}
                      <div class="input-group">
                        <div class="input-group-prepend m-2">
                          <div class="input-group-text">
                            <input type="radio" name="${index}"aria-label="Radio button for following text input">
                            ${IncorrectQuest1[index]}
                          </div>
                        </div>
                        <div class="input-group-prepend m-2">
                          <div class="input-group-text">
                            <input type="radio" name="${index}"aria-label="Radio button for following text input">
                            ${IncorrectQuest2[index]}
                          </div>
                        </div>
                        <div class="input-group-prepend m-2">
                          <div class="input-group-text">
                            <input type="radio" name="${index}"aria-label="Radio button for following text input">
                            ${IncorrectQuest3[index]}
                          </div>
                        </div>
                        <div class="input-group-prepend m-2">
                          <div class="input-group-text">
                             <input type="radio" name="${index}"aria-label="Radio button for following text input">
                             ${CorrectQuest[index]}
                          </div>
                        </div>
                      </div>
                     </div>
                  </div>`
     })
     PrintQuestions.innerHTML = html
  }
  else if(selectType() == 'boolean'){
    const CorrectQuest = Questions.map(function(CorrectAns) {
       return CorrectAns.correct_answer
   })
  
    const IncorrectQuest1 = Questions.map(function(incorrectAnswer) {
        return incorrectAnswer.incorrect_answers[0]
    })
  
  
    let html = ``
    Questions.forEach((question, index)=>{
        html +=`<div class="card m-2 card-boddy">
                  <div class="card-body">
                    ${question.question}
                    <div class="input-group">
                      <div class="input-group-prepend m-2">
                        <div class="input-group-text">
                          <input type="radio" name="${index}"aria-label="Radio button for following text input">
                          ${IncorrectQuest1[index]}
                        </div>
                      </div>
                      <div class="input-group-prepend m-2">
                        <div class="input-group-text">
                          <input type="radio" name="${index}"aria-label="Radio button for following text input">
                          ${CorrectQuest[index]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`
    })
    PrintQuestions.innerHTML = html
  } 
  
  }