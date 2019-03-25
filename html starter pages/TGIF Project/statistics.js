
var members;
var statistics;
var glance = document.getElementById('glance');
var tableRepublican = document.getElementById('tableRepublican');
var tableDemocrat = document.getElementById('tableDemocrat');
var tableIndependent = document.getElementById('tableIndependent');
var tableTotal = document.getElementById('tableTotal');

var most10 = document.getElementById('most10');
var least10 = document.getElementById('least10');
var loyal = document.getElementById('loyal');
var notLoyal = document.getElementById('notLoyal');

var senateApi = "https://api.propublica.org/congress/v1/113/senate/members.json";
var houseApi = "https://api.propublica.org/congress/v1/113/house/members.json";

if(location.pathname == "/TGIF%20Project/attendance-house.html" || location.pathname == "/TGIF%20Project/loyalty-house.html" || location == 'https://aminakano.github.io/TGIFproject/html%20starter%20pages/TGIF%20Project/attendance-house.html' location == 'https://aminakano.github.io/TGIFproject/html%20starter%20pages/TGIF%20Project/loyalty-house.html' ){
  getData(houseApi);
}else if(location.pathname == "/TGIF%20Project/loyalty-senate.html" || location.pathname == "/TGIF%20Project/attendance-senate.html" || location == 'https://aminakano.github.io/TGIFproject/html%20starter%20pages/TGIF%20Project/attendance-senate.html' || location == 'https://aminakano.github.io/TGIFproject/html%20starter%20pages/TGIF%20Project/loyalty-senate.html'){
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
            return response.json();
        }).then(function (json) {
        members = json.results[0].members;

        var repVote = calculateTotalVoteWithParty('R')/totalMembers('R');
        var demVote = calculateTotalVoteWithParty('D')/totalMembers('D');
        var indVote = calculateTotalVoteWithParty('I')/totalMembers('I');

        statistics = {
          "number_of_Democrats": totalMembers('D'),
          "number_of_Republicans": totalMembers('R'),
          "number_of_Independent": totalMembers('I'),
          "percent_voted_party_democrat":Number(demVote.toFixed(2)),
          "percent_voted_party_republican":Number(repVote.toFixed(2)),
          "percent_voted_party_independent":Number(indVote.toFixed(2)),
          'mostEngaged_missed_votes_asc': tenPercent(sortArrayAscending( "missed_votes_pct"),"missed_votes_pct"),
          'leastEngaged_missed_votes_desc': tenPercent(sortArrayDescending("missed_votes_pct"),"missed_votes_pct"),
          'leastLoyal_pct_votes_asc': tenPercent(sortArrayAscending("votes_with_party_pct"),"votes_with_party_pct") , 'mostLoyal_pct_votes_desc': tenPercent(sortArrayDescending("votes_with_party_pct"),"votes_with_party_pct")
        }

        senateAtAGlanceTable();
        if(location.pathname == "/TGIF%20Project/loyalty-senate.html" || location.pathname == "/TGIF%20Project/loyalty-house.html") {
          var mostLoyal = statistics['mostLoyal_pct_votes_desc'];
          var leastLoyal = statistics['leastLoyal_pct_votes_asc'];
          createLoyal10pct(leastLoyal,notLoyal);
          createLoyal10pct(mostLoyal,loyal);
        }
        else {
          var mostEngaged = statistics['mostEngaged_missed_votes_asc'];
          var leastEngaged = statistics['leastEngaged_missed_votes_desc'];
          createAttendance10pct(mostEngaged, most10);
          createAttendance10pct(leastEngaged, least10);
        }
        return loader.style.display = "none";

        }).catch(function (error) {
            console.log(error)
        })
}


function calculateTotalVoteWithParty(party){
  var sum = 0;
  for(var i = 0; i < members.length; i++){
    if (members[i].party == party){
      sum += members[i].votes_with_party_pct;
    }
  }
    return sum;
}


function totalMembers(party){
  var partyMembers = [];
  for(var i =0; i < members.length; i++){
    if(members[i].party == party){
      partyMembers.push(members[i]);
    }
  }return partyMembers.length;
}

function sortArrayAscending(key){
  var attendanceArray = [];
  for (var i =0; i < members.length; i++){
    attendanceArray.push(members[i]);
  }
  attendanceArray.sort(function(a,b){
    return a[key]-b[key];
  });
  return attendanceArray;
}

function sortArrayDescending(key){
  var attendanceArray = [];
  for (var i =0; i < members.length; i++){
    attendanceArray.push(members[i]);
  }
  attendanceArray.sort(function(a,b){
    return b[key]-a[key];
  });
  return attendanceArray;
}

function tenPercent(array, key){
  var tenPercentArray = [];
  for(var i = 0; i < array.length; i++){
    if(i < (array.length*0.1)){
      tenPercentArray.push(array[i]);
    }else if(array[i][key]==array[i-1][key]){
      tenPercentArray.push(array[i]);
    }else{
      break;
    }
  }
  return tenPercentArray;
}


function senateAtAGlanceTable () {
  var tableDem = document.createElement('td');
  var votesDemocrat = document.createElement('td');
  glance.appendChild(tableDemocrat);
  tableDemocrat.appendChild(tableDem);
  tableDemocrat.appendChild(votesDemocrat);
  tableDem.textContent = statistics['number_of_Democrats'];
  votesDemocrat.textContent=statistics['percent_voted_party_democrat']+"%";

  var tableRep = document.createElement('td');
  var votesRepublican = document.createElement('td');
  glance.appendChild(tableRepublican);
  tableRepublican.appendChild(tableRep);
  tableRepublican.appendChild(votesRepublican);
  tableRep.textContent = statistics['number_of_Republicans'];
  votesRepublican.textContent = statistics['percent_voted_party_republican']+"%";

  var tableInd = document.createElement('td');
  var votesIndependent = document.createElement('td');
  glance.appendChild(tableIndependent);
  tableIndependent.appendChild(tableInd);
  tableIndependent.appendChild(votesIndependent);
  tableInd.textContent=statistics['number_of_Independent'];

  if(isNaN(statistics['percent_voted_party_independent'])) {
    votesIndependent.textContent= 0;
  }else{
    votesIndependent.textContent=statistics['percent_voted_party_independent']+"%";
  }

  var tableSum = document.createElement('td');
  var votesTotal = document.createElement('td');
  glance.appendChild(tableTotal);
  tableTotal.appendChild(tableSum);
  tableTotal.appendChild(votesTotal);
  tableSum.textContent = statistics['number_of_Democrats'] + statistics['number_of_Republicans'] + statistics['number_of_Independent'];
}

function createAttendance10pct(object, tbody){
  for(var i = 0; i < object.length; i++){
    var dataTop10 = document.createElement('tr');
    var dataTop10Name = document.createElement('td');
    var dataTop10missedVotes = document.createElement('td');
    var dataTop10missedVotesPct = document.createElement('td');
    var nameLink = document.createElement('a');
    dataTop10Name.appendChild(nameLink);
    nameLink.setAttribute('href', object[i].url);
    tbody.appendChild(dataTop10);
    dataTop10.appendChild(dataTop10Name);
    dataTop10.appendChild(dataTop10missedVotes);
    dataTop10.appendChild(dataTop10missedVotesPct);

    var middleNames = object[i].middle_name;
    if (middleNames != null) {
      middleNames = object[i].middle_name;
    } else {
      middleNames = "";
    }
    nameLink.textContent = object[i].first_name + " " + middleNames + " " + object[i].last_name;
    dataTop10missedVotes.textContent = object[i].missed_votes;
    dataTop10missedVotesPct.textContent = object[i].missed_votes_pct +"%";
  }
}

function createLoyal10pct(object, tbody){
  for(var i = 0; i < object.length; i++){
    var dataTop10 = document.createElement('tr');
    var dataTop10Name = document.createElement('td');
    var dataTop10partyVotes = document.createElement('td');
    var dataTop10partyVotesPct = document.createElement('td');
    var nameLink = document.createElement('a');
    dataTop10Name.appendChild(nameLink);
    nameLink.setAttribute('href', object[i].url);
    tbody.appendChild(dataTop10);
    dataTop10.appendChild(dataTop10Name);
    dataTop10.appendChild(dataTop10partyVotes);
    dataTop10.appendChild(dataTop10partyVotesPct);

    var middleNames = object[i].middle_name;
    if (middleNames != null) {
      middleNames = object[i].middle_name;
    } else {
      middleNames = "";
    }
    nameLink.textContent = object[i].first_name + " " + middleNames + " " + object[i].last_name;
    dataTop10partyVotes.textContent = object[i].total_votes;
    dataTop10partyVotesPct.textContent = object[i].votes_with_party_pct  +"%";
  }
}
