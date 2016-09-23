(function () {
'use strict';

angular.module('LunchCheckerApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.menu = "";
  $scope.message = "";
  $scope.messageStyle = "";

  $scope.checkIfTooMuch = function () {
    if ($scope.menu) {
      var items = $scope.menu.split(',');
      $scope.messageStyle="has-success";
      if (items.length > 3) {
          $scope.message="Too much!";
      } else {
        $scope.message="Enjoy!";
      }
    } else {
      $scope.message="Please enter data first";
      $scope.messageStyle="has-error";
    }
  };
}

})();
