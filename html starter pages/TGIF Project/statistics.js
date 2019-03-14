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
  "percent_voted_party_democrat":Number(demVote.toFixed(2)),
  "percent_voted_party_republican":Number(repVote.toFixed(2)),
  "percent_voted_party_independent":Number(indVote.toFixed(2)),
  'least_engaged_percent_missed':"",
  'missed_votes_asc': tenPercent(sortArrayAscending("missed_votes"),"missed_votes"),
    'missed_votes_desc': tenPercent(sortArrayDescending("missed_votes"),"missed_votes"),
  'pct_votes_asc': tenPercent(sortArrayAscending("votes_with_party_pct"),"votes_with_party_pct") , 'pct_votes_desc': tenPercent(sortArrayDescending("votes_with_party_pct"),"votes_with_party_pct")
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
// console.log(caliculateTotalVoteWithParty('R')); //4008.9499999999985
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
sortArrayAscending("missed_votes");



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
