  // Initialize Firebase
var config = {
  apiKey: "AIzaSyAxiC-DBBVFFA42us5fpwuirauxfS6j56Q",
  authDomain: "train-schedule-6f788.firebaseapp.com",
  databaseURL: "https://train-schedule-6f788.firebaseio.com",
  projectId: "train-schedule-6f788",
  storageBucket: "",
  messagingSenderId: "542044159375"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var nextTrain = 0;

// 2. Button for adding train parameters
$("#submitButton").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#first-train-time").val().trim();
  nextTrain = $("#next-train").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(nextTrain);

  // Upload data from var trainTable
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    nextTrain: nextTrain
  });

  // Clear text-boxes after submit
  // $("#train-name").val("");
  // $("#destination").val("");
  // $("#first-train-time").val("");
  // $("#next-train").val("");
});

// 3. Create Firebase event for adding train info to database and a row in the html
database.ref().on("child_added", function(childSnapshot) {

  var childSnapshot = childSnapshot.val();
  var firstTrainTimeMoment = moment(childSnapshot.firstTrainTime, "hh:mm");
  var currentTime = moment();
  var timeDifference = moment().diff(moment(firstTrainTimeMoment), "minutes");
  var inMinutes;
  var subtractionValue;
  var firstTrainArrivalTime;
  var nextTrainArrivalTime;

  console.log(firstTrainTimeMoment);
  console.log(currentTime);
  console.log(timeDifference);

  if (timeDifference < 0) {
    // if returns undefined
    inMinutes = timeDifference * -1;
    nextTrainArrivalTime = moment(firstTrainTimeMoment).format("hh:mm a");
  } else {
    subtractionValue = timeDifference % childSnapshot.nextTrain;
    inMinutes = childSnapshot.nextTrain - subtractionValue;
    nextTrainArrivalTime = moment().add(inMinutes, "minutes");
    firstTrainArrivalTime = moment(nextTrainArrivalTime).format("hh:mm a");
  }
  // Add trains data
  $("#thBody").append("<tr><td>" + childSnapshot.trainName + "</td><td>" + childSnapshot.destination + "</td><td>" +
  childSnapshot.firstTrainTime + "</td><td>" + childSnapshot.nextTrain + "</td><td>" + firstTrainArrivalTime + "</td><td>" + inMinutes + "</td></tr>");
});
