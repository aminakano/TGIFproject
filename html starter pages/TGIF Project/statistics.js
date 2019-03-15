var members = data.results[0].members;
var glance = document.getElementById('glance');
var tableRepublican = document.getElementById('tableRepublican');
var tableDemocrat = document.getElementById('tableDemocrat');
var tableIndependent = document.getElementById('tableIndependent');

var repVote = calculateTotalVoteWithParty('R')/totalMembers('R');
var demVote = calculateTotalVoteWithParty('D')/totalMembers('D');
var indVote = calculateTotalVoteWithParty('I')/totalMembers('I');

var statistics = {
  "number_of_Democrats": totalMembers('D'),
  "number_of_Republicans": totalMembers('R'),
  "number_of_Independent": totalMembers('I'),
  "percent_voted_party_democrat":Number(demVote.toFixed(2)),
  "percent_voted_party_republican":Number(repVote.toFixed(2)),
  "percent_voted_party_independent":Number(indVote.toFixed(2)),
  'mostEngaged_missed_votes_asc': tenPercent(sortArrayAscending("missed_votes_pct"),"missed_votes_pct"),
  'leastEngaged_missed_votes_desc': tenPercent(sortArrayDescending("missed_votes_pct"),"missed_votes_pct"),
  'leastLoyal_pct_votes_asc': tenPercent(sortArrayAscending("votes_with_party_pct"),"votes_with_party_pct") , 'mostLoyal_pct_votes_desc': tenPercent(sortArrayDescending("votes_with_party_pct"),"votes_with_party_pct")
}
console.log(statistics);

// calculation votes
function calculateTotalVoteWithParty(party){
  var sum = 0;
  for(var i = 0; i < members.length; i++){
    if (members[i].party == party){
      sum += members[i].votes_with_party_pct;
    }
  }
    return sum;
}

// results are the sum of each party's votes
// console.log(calculateTotalVoteWithParty('R')); //4008.9499999999985
calculateTotalVoteWithParty('D');
calculateTotalVoteWithParty('I');


//to find out the number of people in each party

function totalMembers(party){
  var partyMembers = [];
  for(var i =0; i < members.length; i++){
    if(members[i].party == party){
      partyMembers.push(members[i]);
    }
  }return partyMembers.length;
}

// sort function - ascending
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
sortArrayAscending("missed_votes_pct");



// sort function - descending
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
sortArrayDescending();

// get 10 percent
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


// var members = data.results[0].members;

{
var tableData = document.createElement('td');
var votesDemocrat = document.createElement('td');
glance.appendChild(tableDemocrat);
tableDemocrat.appendChild(tableData);
tableDemocrat.appendChild(votesDemocrat);
tableData.textContent = statistics['number_of_Democrats'];
votesDemocrat.textContent=statistics['percent_voted_party_democrat'];

var tableData2 = document.createElement('td');
var votesRepublican = document.createElement('td');
glance.appendChild(tableRepublican);
tableRepublican.appendChild(tableData2);
tableRepublican.appendChild(votesRepublican);
tableData2.textContent = statistics['number_of_Republicans'];
votesRepublican.textContent = statistics['percent_voted_party_republican'];

var tableData3 = document.createElement('td');
var votesIndependent = document.createElement('td');
glance.appendChild(tableIndependent);
tableIndependent.appendChild(tableData3);
tableIndependent.appendChild(votesIndependent);
tableData3.textContent=statistics['number_of_Independent'];
votesIndependent.textContent=statistics['percent_voted_party_independent'];
}


console.log(Object.keys(statistics)[6]);
console.log(Object.keys(statistics)[9]);

console.log(statistics['mostEngaged_missed_votes_asc'][0].last_name);
console.log(statistics['mostEngaged_missed_votes_asc'][0].first_name);
console.log(statistics['mostEngaged_missed_votes_asc'][0].missed_votes);
console.log(statistics['mostEngaged_missed_votes_asc'][0].missed_votes_pct);

var best10 = document.getElementById('best10');
var least10 = document.getElementById('least10');
// var loyal = document.getElementById('loyal');
// var notLoyal = document.getElementById('notLoyal');


var mostEngaged = statistics['mostEngaged_missed_votes_asc'];
var leastEngaged = statistics['leastEngaged_missed_votes_desc'];
var mostLoyal = statistics['mostLoyal_pct_votes_desc'];
var leastLoyal = statistics['leastLoyal_pct_votes_asc'];

console.log(mostLoyal);
console.log(leastLoyal);

console.log(mostEngaged);
function createTable10pct(object, tbody){
  for(var i = 0; i < object.length; i++){
    var dataTop10 = document.createElement('tr');
    var dataTop10Name = document.createElement('td');
    var dataTop10missedVotes = document.createElement('td');
    var dataTop10missedVotesPct = document.createElement('td');
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
    dataTop10Name.textContent = object[i].first_name + " " + middleNames + " " + object[i].last_name;
    dataTop10missedVotes.textContent = object[i].missed_votes;
    dataTop10missedVotesPct.textContent = object[i].missed_votes_pct;
  }
}
createTable10pct(mostEngaged, best10);
createTable10pct(leastEngaged, least10);
// createTable10pct(mostLoyal,best10);
// createTable10pct(leastLoyal,least10);

// function createTable10pct(){
//   for(var i = 0; i < mostLoyal.length; i++){
//     var dataTop10 = document.createElement('tr');
//     var dataTop10Name = document.createElement('td');
//     var dataTop10missedVotes = document.createElement('td');
//     var dataTop10missedVotesPct = document.createElement('td');
//     loyal.appendChild(dataTop10);
//     dataTop10.appendChild(dataTop10Name);
//     dataTop10.appendChild(dataTop10missedVotes);
//     dataTop10.appendChild(dataTop10missedVotesPct);
//
//     var middleNames = mostLoyal[i].middle_name;
//     if (middleNames != null) {
//       middleNames = mostLoyal[i].middle_name;
//     } else {
//       middleNames = "";
//     }
//     dataTop10Name.textContent = mostLoyal[i].first_name + " " + middleNames + " " + mostLoyal[i].last_name;
//     dataTop10missedVotes.textContent = mostLoyal[i].missed_votes;
//     dataTop10missedVotesPct.textContent = mostLoyal[i].missed_votes_pct;
//   }
// }
// // mostLoyal,loyal
// createTable10pct();
// // createTable10pct(leastLoyal,notLoyal);
