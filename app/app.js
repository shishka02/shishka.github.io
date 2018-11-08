"use strict";

// Define the `App` module
var phonecatApp = angular.module("myApp", []);

// Define the `Controller` controller on the `phonecatApp` module
phonecatApp.controller("Controller", function Controller($scope) {
  $scope.name = "";
  $scope.description = "";
  $scope.days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];
  $scope.buff = "";
  $scope.descriptionNew = "";

  if (localStorage.getItem("sample_data") != null) {
    $scope.tasksArray = JSON.parse(localStorage.getItem("sample_data"));
    $scope.env = localStorage.getItem("env");
  } else {
    $scope.tasksArray = [];
  }

  $scope.addNew = function(id) {
    let check = $scope.tasksArray.filter(item => id === item.id)[0];
    if (check) {
      $scope.open("myRedactionModal", id, $scope.rendernoftaskDescription(id));
    } else {
      $scope.buff = id;
      $scope.open("myModal", id);
    }
  };
  $scope.open = function(a, b, c) {
    document.getElementById(a).style.display = "block";
    document.getElementById(a).style.opacity = "1";
    $scope.buff = b;
    $scope.descriptionNew = c;
  };
  $scope.close = function(a) {
    document.getElementById(a).style.display = "none";
    document.getElementById(a).style.opacity = "0";

    $scope.buff = "";
  };

  $scope.Redact = function(a, id) {
    $scope.tasksArray.forEach(element => {
      if (element.id === id) {
        element.task.description = a;
      }
    });
    $scope.close("myRedactionModal");
    $scope.saveToStore();
  };
  $scope.save = function() {
    let buff = {
      id: $scope.buff,
      task: {
        name: $scope.name,
        description: $scope.description,
        id: $scope.buff
      }
    };

    $scope.tasksArray.push(buff);
    $scope.name = "";
    $scope.description = "";

    $scope.saveToStore();

    $scope.close("myModal");
  };
  $scope.rendernoftask = function(i) {
    if ($scope.tasksArray[0] && $scope.tasksArray[0].id) {
      let buff = $scope.tasksArray.filter(item => i === item.id)[0];
      // let buff2=$scope.tasksArray.filter(item=> ( i===item.id) )
      if (buff && buff.id && i === buff.id) {
        // let buff3=buff2.map(item=>(  item.task.name ))

        return buff.task.name;
      }
    }
  };

  $scope.rendernoftaskDescription = function(i) {
    if ($scope.tasksArray[0] && $scope.tasksArray[0].id) {
      //let buff=$scope.tasksArray.filter(item=> ( i===item.id) )[0]
      let buff = $scope.tasksArray.find(item => item.id === i);

      if (buff && buff.id && i === buff.id) {
        return buff.task.description;
      }
    }
  };

  $scope.delete = function(id) {
    $scope.tasksArray.forEach((element, index) => {
      if (element.id === id) {
        $scope.tasksArray.splice(index, 1);
      }
    });
    $scope.close("myRedactionModal");
    $scope.saveToStore();
  };
  $scope.saveToStore = function() {
    localStorage.setItem("sample_data", JSON.stringify($scope.tasksArray));
    localStorage.setItem("env", "dev");
  };
});
