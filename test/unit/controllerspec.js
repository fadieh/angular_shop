'use strict';

describe('ShopController', function(){

  beforeEach(module('theShop'));

  describe('ShopController', function(){

    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('items/items.json').respond([{
        name: 'Almond Shoes', id: '0', description: "Women's Footwear", price: 50.00, "amountRequested": 1, quantity: 1
      }]);

      scope = $rootScope.$new()
      ctrl = $controller('ShopController', {$scope: scope});

    }));

    it('creates the "products" model data', function(){
      expect(scope.products).toBeUndefined();
      $httpBackend.flush();
      expect(scope.products).toEqual([{ name: 'Almond Shoes', id: '0', description: "Women's Footwear", price: 50.00, "amountRequested": 1, quantity: 1}]);
    });

    it('initially, the basket is empty', function() {
      expect(scope.currentBasket.length).toBe(0);
    });

    it('a product may be added to the empty basket', function() {
      scope.addProduct({name: 'Toe Shoes', quantity: 1})
      expect(scope.currentBasket.length).toBe(1)
    });

    it('a product may be removed from the basket', function() {
      scope.addProduct({name: 'Toe Shoes', quantity: '1'})
      expect(scope.currentBasket.length).toBe(1)
      scope.removeProduct(0, {name: 'Toe Shoes', quantity: '1'})
      expect(scope.currentBasket.length).toBe(0)
    });

    it('calculates the total', function() {
      scope.addProduct({name: 'Shoes', quantity: 1, price: 50, amountRequested: 0, category: 'Casualwear'})
      expect(scope.calculateTotal()).toBe(50)
    });

    it('voucher application updates the total', function() {
      scope.addProduct({name: 'Shoes', quantity: 1, price: 50, amountRequested: 0, category: 'Casualwear'})
      scope.useVoucher({amount: 5, spendRequired: 1, id: 0, valid: true})
      expect(scope.calculateTotal()).toBe(45)
    });

  })

})
