const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillBtn = document.getElementById('show-millioniare')
const richBTn = document.getElementById('richest')
const calculateBtn = document.getElementById('calculate-entire')

let data = [];

// getRandomUser();
// getRandomUser();
// getRandomUser();


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
  
    const user = data.results[0];
  
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };
  
    addData(newUser);
  }

function addData(obj) {
    data.push(obj);
    updateDOM();
  }

  //doublemoney
  function doubleMoney(){
      data = data.map((user) =>{
          return {...user, money: user.money * 2};

      });

      updateDOM();
  }
  

  //Millionirare
function showMillioniare(){
    data = data.filter((user)=> user.money > 1000000);

    updateDOM();
  };

  //richest
  function sortRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
  }

  //Wealth calc

  function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h4>Total Wealth: <strong>${formatMoney(wealth)}</strong></h4>`;
    main.appendChild(wealthEl);
  }

//update DOM
  function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2 ><strong>Person</strong>Wealth</h2>';
  
    providedData.forEach((item) => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
      main.appendChild(element);
    });
  }

function formatMoney(number) {
    return '₹' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//creating Event
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillBtn.addEventListener('click', showMillioniare)
richBTn.addEventListener('click', sortRichest)
calculateBtn.addEventListener('click', calculateWealth )