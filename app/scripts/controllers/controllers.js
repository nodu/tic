'use strict';

angular.module('TicketyApp')
  .controller('WaitingCtrl', function ($scope, $timeout, $location) {
    $scope.wait = angular.element(document.getElementById('wait'));
    for (var i = 0; i < 4; i++) {
      $timeout(function(){
      $scope.wait.append('.');
      }, i + "000");
    };
    
    $timeout(function(){ $scope.wait.append("Found! It's you!  Or ... that dashing individual next to you!");}, 4000);
    $timeout(function(){ $location.path("/play");}, 6000);

  })
.controller('HowToCtrl', function($scope, $location) {
    $scope.homepage = function() {  // depricate?
    $location.path("/");
    };
  })
 .controller('SplashCtrl', function ($scope, $location) {
    $scope.randomMatch = function() { // depricated?
      $location.path("/waiting");
    };
  }).controller('MainCtrl', function($scope, $location, $timeout) {
    var X_WIN_PATTERNS = [
          'xxx......',
          '...xxx...',
          '......xxx',
          'x..x..x..',
          '.x..x..x.',
          '..x..x..x',
          'x...x...x',
          '..x.x.x..'
        ];
    var O_WIN_PATTERNS = X_WIN_PATTERNS.map(function(str){ return str.replace(/x/g, 'o');});

    var turnNum = 0;
    $scope.turn = function () {
      turnNum += 1;
    };
    
    $scope.squares = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    
    $scope.makeMove = function(square) {
      if (!$scope.endGame){
        $scope.mark = (turnNum % 2 === 0) ? 'x' : 'o';
        $scope.addMark(square, $scope.mark);
              
        if ($scope.testForWin()) {
          $timeout(function() {window.alert($scope.mark.toUpperCase() + ' won!');}, 50);
        } 
        // else if ($scope.testForScrewed()) {
          // window.alert(mark.toUpperCase() + ' has you now!');}
      } else {
        window.alert("Game's over Loser!");
      };
  };
    $scope.addMark = function(square, mark){
      if ($scope.squares[square] === 'x' || $scope.squares[square] === 'o') {
        turnNum --;
      } else {
        $scope.squares[square] = mark;
      };
    };
  
    $scope.testForWin = function() {
      $scope.squaresStr = $scope.squares.join("");
      var patt1=/\s/g;
      var properStr = $scope.squaresStr.replace(patt1, '.');
      
      if (turnNum % 2 === 0) {
        var patterns = X_WIN_PATTERNS;
      } else {
        var patterns = O_WIN_PATTERNS;
      };

      for (var i = 0; i < patterns.length; i++) {
        var re = new RegExp(patterns[i], "i");
        if (properStr.match(re)){
          $scope.endGame = true;
          return true;
        };
      };

      if (turnNum+1 === 9) { 
        $scope.endGame = true;
        $scope.mark = 'Cat';
      }

      return false;
  }});