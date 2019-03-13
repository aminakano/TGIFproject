var members = data.results[0].members;
var glance = document.getElementById('glance');
var tableRepublican = document.getElementById('tableRepublican');

var repVote = caliculateTotalVoteWithParty('R')/totalMembers('R');
var demVote = caliculateTotalVoteWithParty('D')/totalMembers('D');
var indVote = caliculateTotalVoteWithParty('I')/totalMembers('I');

var statistics = {
  "number_of_Democrats": totalMembers('D'),
  "number_of_Republicans": totalMembers('R'),
  "number_of_Independent": totalMembers('I'),
  "percent_voted_party_democrat":Number(demVote.toFixed(2)), //toFixed(2) is to throwaway small numbers after 2 degits from the dot
  "percent_voted_party_republican":Number(repVote.toFixed(2)),
  "percent_voted_party_independent":Number(indVote.toFixed(2)),
}
console.log(statistics);

// caliculation votes
function caliculateTotalVoteWithParty(party){
  var sum = 0;
  for(var i = 0; i < members.length; i++){
    if (members[i].party == party){
      sum += members[i].votes_with_party_pct;
    }
  }
    return sum;
}

// results are the sum of each party's votes
console.log(caliculateTotalVoteWithParty('R')); //4008.9499999999985
caliculateTotalVoteWithParty('D');
caliculateTotalVoteWithParty('I');


//to find out the number of people in each party

function totalMembers(party){
  var partyMembers = [];
  for(var i =0; i < members.length; i++){
    if(members[i].party == party){
      partyMembers.push(members[i]);
    }
  }return partyMembers.length;
}
console.log(totalMembers('R')); //46

// caliculation votes devided by the numbers of members = percentage
console.log(caliculateTotalVoteWithParty('R')/totalMembers('R'));//87.15108695652171
console.log(caliculateTotalVoteWithParty('D')/totalMembers('D'));//96.97052631578948
console.log(caliculateTotalVoteWithParty('I')/totalMembers('I'));//95.17500000000001





//
// function createTable(members){
//   glance.innerHTML = '';
//   for(var i =0; i < members.length; i++){
//     var tableData = document.createElement('td');
//     glance.appendChild(tableRepublican);
//     tableRepublican.appendChild(tableData);
//     tableData.textContent = members[i].party;
//
//   }
//
// }
// createTable(members);
