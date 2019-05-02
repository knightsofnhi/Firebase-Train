$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyDTstbcJP-_Cgzk7hEOctXFdy9I8caB630",
    authDomain: "train-homework-3d562.firebaseapp.com",
    databaseURL: "https://train-homework-3d562.firebaseio.com",
    projectId: "train-homework-3d562",
    storageBucket: "train-homework-3d562.appspot.com",
    messagingSenderId: "534784127466"
  };
  firebase.initializeApp(config);

    // access firebase
    var database = firebase.database();

    $("#save").on("click", function (e) {
      e.preventDefault();

      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("#firstTime").val().trim();
      var frequency = $("#frequency").val().trim();

      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
      });

      // ES6 Version
      //database.ref().push({
      // trainName, destination, firstTime, frequency
      //})
    });

    database.ref().on("child_added", function (snapshot) {
      var data = snapshot.val();
      if (!data) {
        return;
      }

      var tFrequency = data.frequency;

      // Time is 3:30 AM
      var firstTime = data.firstTime;
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var html = `<tr>
                                
                                <td>${data.trainName}</td>
                                <td>${data.destination}</td>
                                <td>${data.frequency}</td>
                                <td>${nextTrain}</td>
                                <td>${tMinutesTillTrain}</td>
                              </tr>`;

      $("#trainSection").append(html);
    });

  });