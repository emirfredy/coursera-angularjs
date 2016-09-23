(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyList();
  toBuyCtrl.markAsAlreadyBought = function (itemIndex) {
    ShoppingListCheckOffService.markAsAlreadyBought(itemIndex);
  };

}

AlreadyBoughtShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
  var boughtCtrl = this;
  boughtCtrl.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
}

function  ShoppingListCheckOffService() {
  var service = this;
  var toBuyList = [{ name: "Salad", quantity: 2 },
    { name: "Fish", quantity: 3 }, { name: "Tomato", quantity: 11 },
    { name: "Coffee", quantity: 2 }, { name: "Cheese", quantity: 5 }];
  var alreadyBoughtList = [];

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.getAlreadyBoughtList = function () {
    return alreadyBoughtList;
  };

  service.markAsAlreadyBought = function (itemIndex) {
    alreadyBoughtList.push(toBuyList[itemIndex])
    toBuyList.splice(itemIndex, 1);
  };
}

})();
