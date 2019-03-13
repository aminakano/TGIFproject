var members = data.results[0].members;
var tableData = document.getElementById('table-data');
var republican = document.getElementById('republican');
var democrat = document.getElementById('democrat');
var independent = document.getElementById('independent');
var state50 = document.getElementById('state50');


republican.addEventListener('click', filterData)
democrat.addEventListener('click', filterData)
independent.addEventListener('click', filterData)
state50.addEventListener('change', filterData)

filterData()

// Table

function createTable(members) {
  tableData.innerHTML = "";
  for (var i = 0; i < members.length; i++) {

    var tableRow = document.createElement('tr');
    var fullNameData = document.createElement('td');
    var nameLink = document.createElement('a');
    tableData.appendChild(tableRow);
    tableRow.appendChild(fullNameData);
    fullNameData.appendChild(nameLink);
    nameLink.setAttribute('href', members[i].url);


    var middleNames = members[i].middle_name;
    if (middleNames != null) {
      middleNames = members[i].middle_name;
    } else {
      middleNames = "";
    }

    nameLink.textContent = members[i].first_name + " " + middleNames + " " + members[i].last_name;

    var partyData = document.createElement('td');
    partyData.textContent = members[i].party;
    tableRow.appendChild(partyData);
    var stateData = document.createElement('td');
    stateData.textContent = members[i].state;
    tableRow.appendChild(stateData);
    var seniorityData = document.createElement('td');
    seniorityData.textContent = members[i].seniority;
    tableRow.appendChild(seniorityData);
    var percentData = document.createElement('td');
    percentData.textContent = members[i].votes_with_party_pct + "%";
    tableRow.appendChild(percentData);

  }

}
// checkbox filter

function filterData() {
  let filteredData = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].state == state50.value || state50.value == 'none') {
      if (members[i].party == 'R' && republican.checked == true) {
        filteredData.push(members[i]);
      }
      if (members[i].party == 'D' && democrat.checked == true) {
        filteredData.push(members[i]);
      }
      if (members[i].party == 'I' && independent.checked == true) {
        filteredData.push(members[i]);
      }
    }
  }
  return createTable(filteredData);
}

// dropdown filter

stateFilter();

function stateFilter() {
  var stateList = [];
  for (let i = 0; i < members.length; i++) {
    if (!stateList.includes(members[i].state))
      stateList.push(members[i].state);
  }
  stateList.sort();
  console.log(stateList);
  for (let i = 0; i < stateList.length; i++) {
    var option = document.createElement('option'); //<option>
    option.innerHTML = stateList[i];
    option.value = stateList[i];
    state50.appendChild(option);
  }
}
