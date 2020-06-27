document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks')
  const sortBtn = document.getElementById('sorting-btn')
  const tableBody = document.querySelectorAll('tbody')[0]
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    //get new to do from event target
    const newTask = event.target['new-task-description'].value
    //declare constants to store tasks in table data 
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    //set inner text of td to value of given input 
    td.innerText = newTask
    // set color of text based on task priority
    td.style.color = event.target['priority-select'].value
    //set fontawesome icon for deleting to do
    td2.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>'
    td1.innerText = event.target['due-date'].value.slice(-5)
    //append td to tr for task 
    tr.appendChild(td)
    //append date tp tr 
    tr.appendChild(td1)
    //append delete icon to tr 
    tr.appendChild(td2)
    //set data id for filtering based on priority 
    tr.dataset.id = td.style.color
    //append my tow with data to the table body 
    tableBody.appendChild(tr)

    //make to do editable 
    const editable = td.contentEditable
    td.contentEditable = 'true'
    td1.contentEditable = 'true'
    //set delete event listener on trash icon
    td2.addEventListener('click', (event) => {
      tr.remove()
    })
  })

  //this function renders sorted to do list 
  sortBtn.addEventListener('click', (event) => {
    const allTasks = document.querySelectorAll('tr')

    let sortedTasks = sortTasks(allTasks)
    sortedTasks.forEach(ele => {
      tableBody.appendChild(ele)
    })
  })

  //this function sorts the to do list based on priority
  function sortTasks(arr) {
    const sortPriority = document.querySelector('#priority-select').value;
    const red = []
    const yellow = []
    const green = []
    let arrayOfTasks = []
    arr.forEach((ele) => {
      if (ele.dataset.id === 'red') {
        red.push(ele)
      } else if (ele.dataset.id === 'yellow') {
        yellow.push(ele)
      } else if (ele.dataset.id === 'green') {
        green.push(ele)
      }
    })
    if (sortPriority === 'red') {
      arrayOfTasks = red.concat(yellow, green)
    } else if (sortPriority === 'yellow') {
      arrayOfTasks = yellow.concat(red, green)
    } else if (sortPriority === 'green') {
      arrayOfTasks = green.concat(red, yellow)
    }
    return arrayOfTasks
  }

})























