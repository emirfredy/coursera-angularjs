(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var narrowItCtrl = this;
  narrowItCtrl.found = [];
  narrowItCtrl.choice = "";
  narrowItCtrl.clicked = false;
  narrowItCtrl.getMatchedMenuItems = function() {
    narrowItCtrl.clicked = true;
    if (!narrowItCtrl.choice || narrowItCtrl.choice.length === 0) {
      narrowItCtrl.found = [];
    } else {
      var promise = MenuSearchService.getMatchedMenuItems(narrowItCtrl.choice);
      promise
        .then(function (result) {
            narrowItCtrl.found = result;
        })
        .catch(function () { });
    }
  }

  narrowItCtrl.removeItem = function functionName(index) {
    narrowItCtrl.found.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var allItems = result.data.menu_items;
      var foundItems = [];
      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].description.indexOf(searchTerm) != -1) {
          foundItems.push(allItems[i]);
        }
      }
      return foundItems;
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      items: '<',
      onRemove: '&',
      clicked: '<'
    }
  };
  return ddo;
}

})();
