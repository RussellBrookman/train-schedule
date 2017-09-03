// 1. get Firebase working
var firebaseConfig = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://time-sheet-55009.firebaseio.com",
  storageBucket: "time-sheet-55009.appspot.com"
};

var bartConfig = {
  "?xml":{
    "@version":"1.0",
    "@encoding":"utf-8"
  },
  "root":{
    "uri":{
      "#cdata-section":"http://api.bart.gov/api/route.aspx?cmd=routes&json=y"},
      "sched_num":"43","routes":{
        "route":[{
          "name":"Pittsburg/Bay Point - SFIA/Millbrae",
          "abbr":"PITT-SFIA",
          "routeID":"ROUTE 1",
          "number":"1",
          "hexcolor":"#ffff33",
          "color":"#ffff33"
        },
        {
          "name":"Daly City - Dublin/Pleasanton",
          "abbr":"DALY-DUBL",
          "routeID":"ROUTE 12",
          "number":"12",
          "hexcolor":"#0099cc",
          "color":"#0099cc"
        },
        {
          "name":"Daly City - Warm Springs/South Fremont",
          "abbr":"DALY-WARM",
          "routeID":"ROUTE 6",
          "number":"6",
          "hexcolor":"#339933",
          "color":"#339933"
        },
        {
          "name":"Dublin/Pleasanton - Daly City",
          "abbr":"DUBL-DALY",
          "routeID":"ROUTE 11",
          "number":"11",
          "hexcolor":"#0099cc",
          "color":"#0099cc"
        },
        {
          "name":"Warm Springs/South Fremont - Daly City",
          "abbr":"WARM-DALY",
          "routeID":"ROUTE 5",
          "number":"5",
          "hexcolor":"#339933",
          "color":"#339933"
        },
        {
          "name":"Warm Springs/South Fremont - Richmond",
          "abbr":"WARM-RICH",
          "routeID":"ROUTE 3",
          "number":"3",
          "hexcolor":"#ff9933",
          "color":"#ff9933"
        },
        {
          "name":"Millbrae/Daly City - Richmond",
          "abbr":"MLBR-RICH",
          "routeID":"ROUTE 8",
          "number":"8",
          "hexcolor":"#ff0000",
          "color":"#ff0000"
        },
        {
          "name":"Richmond - Warm Springs/South Fremont",
          "abbr":"RICH-WARM",
          "routeID":"ROUTE 4",
          "number":"4",
          "hexcolor":"#ff9933","color":"#ff9933"
        },
        {
          "name":"Richmond - Daly City/Millbrae",
          "abbr":"RICH-MLBR",
          "routeID":"ROUTE 7",
          "number":"7",
          "hexcolor":"",
          "color":"#ff0000"
        },
        {
          "name":"Millbrae/SFIA - Pittsburg/Bay Point",
          "abbr":"SFIA-PITT",
          "routeID":"ROUTE 2",
          "number":"2",
          "hexcolor":"#ffff33",
          "color":"#ffff33"
        },
        {
          "name":"Coliseum - Oakland Int'l Airport",
          "abbr":"COLS-OAKL",
          "routeID":"ROUTE 19",
          "number":"19",
          "hexcolor":"#d5cfa3",
          "color":"#d5cfa3"
        },
        {
          "name":"Oakland Int'l Airport - Coliseum",
          "abbr":"OAKL-COLS",
          "routeID":"ROUTE 20",
          "number":"20",
          "hexcolor":"#d5cfa3",
          "color":"#d5cfa3"
        }]},
        "message":""
      }}
firebase.initializeApp(firebaseConfig);
/*bart.initializeApp(bartConfig);*/

var database = firebase.database();
// var dataBart = bart.database();

// 2. Button for adding train parameters
$("#submitButton").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainTime = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = $("#firstTrainTimeInput").val().trim();
  var timeTill = moment($("#nextTrainReletiveToNowInput").val().trim(), "DD/MM/YY").format("X");
  // Creates local "temporary" object for holding this info
  var trainTable = {
    train: trainTime,
    dest: destination,
    time: timeTill,
    first: firstTrain
  };

  // Uploads the data from var trainTable
  database.ref().push(trainTable);

  // Logs everything to console
  console.log(trainTable.train);
  console.log(trainTable.dest);
  console.log(trainTable.time);
  console.log(trainTable.first);

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#nextTrainReletiveToNowInput").val("");
});

// 3. Create Firebase event for adding train info to database and a row in the html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainTime = childSnapshot.val().train;
  var destination = childSnapshot.val().dest;
  var timeTill = childSnapshot.val().time;
  var firstTrain = childSnapshot.val().first;

  // console log all the input
  console.log(trainTime);
  console.log(destination);
  console.log(timeTill);
  console.log(firstTrain);

  // Prettify the employee start
/* var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
*/
  // Calculate the months worked to calculate time
/*  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);*/

  // Calculate the total billed rate
/*  var empBilled = empMonths * empRate;
  console.log(empBilled);*/

  // Add each train's data into the table
  $("#tableB > tbody").append("<tr><td>" + trainTime + "</td><td>" + destination + "</td><td>" +
  firstTrain + "</td><td>" + timeTill + "</td></tr>");
});
