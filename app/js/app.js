'use strict';

var theShop = angular.module('theShop', ['ngResource', 'ngRoute', 'theShop']);

theShop.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
  when('/', {
    templateUrl: 'partials/shop.html',
    controller: 'ShopController'
  })

}]);
