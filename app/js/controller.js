'use strict';

theShop.controller('ShopController', ['$scope', '$http', function($scope, $http) {

  $http.get('items/items.json').success(function(data) {
    $scope.products = data
  });

  $scope.totalAmount = 0
  $scope.totalItems = 0

  $scope.currentBasket = []

  $scope.vouchers = [
    {amount: 5, condition: "when you order", spendRequired: 1, id: 0, valid: false},
    {amount: 10, condition: "when you spend over £50", spendRequired: 50, id: 1, valid: false},
    {amount: 15, condition: "when you have bought at least one footwear item and spent over £75.00", spendRequired: 75, id: 2, valid: false}
  ]

  $scope.vouchersUsed = []
  $scope.discounted = 0

  $scope.alerts = [
    {type: 'used', message: "You have already used this voucher."},
    {type: 'invalid', message: "You must spend more to be able to use this voucher."}
  ]

  $scope.currentAlerts = []

  $scope.addProduct = function(product) {

    if (product.quantity > 0) {
      if ($scope.inBasket(product.name)) {
        product.quantity -= 1
        product.amountRequested += 1;
        $scope.totalItems += 1;
      } else {
        if ($scope.currentBasket.push(product)) {
          product.quantity -= 1
          product.amountRequested += 1;
          $scope.totalItems += 1
        }
      }
    }

    console.log($scope.currentBasket)

  };

  $scope.inBasket = function(product) {

    for(var i = 0; i < $scope.currentBasket.length; i++) {
      if ($scope.currentBasket[i].name === product) {
        return true
      }
    }

    return false

  }

  $scope.removeProduct = function(index, product) {

    if ($scope.currentBasket.splice(index, 1)) {
      product.quantity += product.amountRequested
      $scope.totalItems -= product.amountRequested;
      product.amountRequested = 0
    }

  }

  $scope.calculateTotal = function() {

    var total = 0, vouchers = $scope.vouchers

    angular.forEach($scope.currentBasket, function(product) {
      total += product.price * product.amountRequested - $scope.discounted
    });

    for(var i = 0; i < 2; i++) {
      if (total > vouchers[i].spendRequired) {
        vouchers[i].valid = true
      } else {
        vouchers[i].valid = false
      }
    }

    if (total > vouchers[2].spendRequired && $scope.checkFootwear()) {
      vouchers[2].valid = true
    } else {
      vouchers[2].valid = false
    }

    console.log($scope.vouchers[0].valid)
    console.log($scope.vouchers[1].valid)
    console.log($scope.vouchers[2].valid)

    return total

  }

  $scope.checkFootwear = function() {

    var verify = false

    for(var i = 0; i < $scope.currentBasket.length; i++) {
      if ($scope.currentBasket[i].category.indexOf("Footwear") > -1) {
        verify = true
      }
    }

    return verify

  }

  $scope.useVoucher = function(voucher) {

    if (voucher.valid === true) {
      if ($scope.checkIfDiscountUsed(voucher)) {
        $scope.vouchersUsed.push(voucher)
        $scope.discounted += voucher.amount
      } else {
        $scope.currentAlerts.push($scope.alerts[0])
      }
    } else {
      $scope.currentAlerts.push($scope.alerts[1])
    }

  }

  $scope.checkIfDiscountUsed = function(voucher) {

    var voucherAmount = voucher.amount, verify = true

    for(var i = 0; i< $scope.vouchersUsed.length; i++) {
      if ($scope.vouchersUsed[i].amount === voucher.amount) {
        verify = false
      }
    }

    return verify

  }



}]);
