(function () {
'use strict';

angular.module('LunchCheckerApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.menu = "";
  $scope.message = "";

  $scope.checkIfTooMuch = function () {
    if ($scope.menu) {
      var items = $scope.menu.split(',');
      if (items.length > 3) {
          $scope.message="Too much!";
      } else {
        $scope.message="Enjoy!";
      }
    } else {
      $scope.message="Please enter data first";
    }
  };
}

})();
