var tableData = document.getElementById('table-data');
var state50;
var loader = document.getElementById('loader');
var senateApi = "https://api.propublica.org/congress/v1/113/senate/members.json";
var houseApi = "https://api.propublica.org/congress/v1/113/house/members.json"




const app = new Vue({
  el:"#app",
  data: {
    members: [],
    filteredData: [],
    stateList:[],
    show: true,

  },
  created: function(){
    if(location.pathname == "/TGIF%20Project/house-data.html"){
      this.getData(houseApi);


    }else if(location.pathname == "/TGIF%20Project/senate-data.html"){
      this.getData(senateApi);

  }},
  methods: {
    getData: function(url){

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
            app.members = json.results[0].members;
            app.filteredData = app.members;
            app.show = false;
             console.log(app.members)
            var republican = document.getElementById('republican');
            var democrat = document.getElementById('democrat');
            var independent = document.getElementById('independent');
            state50 = document.getElementById('state50');
            app.stateFilter();

            }).catch(function (error) {
                console.log(error)
            })
    },
      filterData: function() {

          app.filteredData = [];

      for (var i = 0; i < app.members.length; i++) {

        if (app.members[i].state == state50.value || state50.value == 'none') {

          if (app.members[i].party == 'R' && republican.checked == true) {

            app.filteredData.push(app.members[i]);
          }
          if (app.members[i].party == 'D' && democrat.checked == true) {
            app.filteredData.push(app.members[i]);
          }
          if (app.members[i].party == 'I' && independent.checked == true) {
            app.filteredData.push(app.members[i]);

          }
      }
    }
    },
      stateFilter: function() {
      app.stateList = [];

      for (let i = 0; i < app.members.length; i++) {
        if (!app.stateList.includes(app.members[i].state)){
          app.stateList.push(app.members[i].state);}
      }
      app.stateList.sort();
    }

  }
})
