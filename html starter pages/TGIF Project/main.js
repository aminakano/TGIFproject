var tableData = document.getElementById('table-data');
var republican = document.getElementById('republican');
var democrat = document.getElementById('democrat');
var independent = document.getElementById('independent');
var state50 = document.getElementById('state50');
var loader = document.getElementById('loader');
var senateApi = "https://api.propublica.org/congress/v1/113/senate/members.json";
var houseApi = "https://api.propublica.org/congress/v1/113/house/members.json"


if(location.pathname == "/TGIF%20Project/house-data.html"){
  getData(houseApi);
}else if(location.pathname == "/TGIF%20Project/senate-data.html"){
  getData(senateApi);
}

function getData(url) {

    fetch(url, {
            method: "GET",
            headers: new Headers({
            "X-API-KEY": 'w69WFSEZGEBl6zHKSHGWwq99yI1LZW7G59lX2Z35'
            })
        })

        .then(function (response) {
        //first promise
            return response.json();
        }).then(function (json) {
        //second promise
        //the data exists here
        var members = json.results[0].members;
        republican.addEventListener('click', function() {filterData(members)})
        democrat.addEventListener('click', function() {filterData(members)})
        independent.addEventListener('click', function() {filterData(members)})
        state50.addEventListener('change',function() {filterData(members)})
        stateFilter(members);
        filterData(members);
        return loader.style.display = "none";

        }).catch(function (error) {
            console.log(error)
        })
}

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

function filterData(members) {
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

function stateFilter(members) {
  var stateList = [];
  for (let i = 0; i < members.length; i++) {
    if (!stateList.includes(members[i].state))
      stateList.push(members[i].state);
  }
  stateList.sort();
  for (let i = 0; i < stateList.length; i++) {
    var option = document.createElement('option'); //<option>
    option.innerHTML = stateList[i];
    option.value = stateList[i];
    state50.appendChild(option);
  }
}
