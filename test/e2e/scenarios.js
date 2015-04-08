describe('shopping app', function() {

  beforeEach(function() {
    browser.get('index.html');
    products = element.all(by.repeater('product in products'));
    basket = element.all(by.repeater('product in currentBasket'));
    add = element.all(by.className('add-to')).get(0);
    remove = element.all(by.className('basket-remove')).get(0);
    discount1 = element.all(by.className('voucher')).get(0);
  });

  it('has a list of products', function() {
    expect(products.get(0).isPresent()).toBe(true);
    expect(products.get(1).isPresent()).toBe(true);
  });

  it('has a name for products', function() {
    expect(products.get(0).getText()).toContain('Almond Toe Court Shoes')
  })

  it('has a category for products', function() {
    expect(products.get(0).getText()).toContain("Women's Footwear")
  })

  it('has a description for products', function() {
    expect(products.get(0).getText()).toContain("Patent Black")
  })

  it('has a price for products', function() {
    expect(products.get(0).getText()).toContain('£99.00')
  });

  it('tells you the quantity for products', function() {
    expect(products.get(0).getText()).toContain('5 left')
  })

  it('each product can an add button', function() {
    expect(element(by.css('.add-to')).isPresent()).toBe(true)
  });

  it('a product can be added to the basket', function() {
    add.click()
    expect(basket.count()).toEqual(1)
  });

  it('quantity increments down when product is added', function() {
    expect(products.get(0).getText()).toContain('5')
    add.click()
    expect(products.get(0).getText()).toContain('4')
  });

  it('a product can be removed from the basket', function() {
    add.click()
    expect(basket.count()).toEqual(1)
    remove.click()
    expect(basket.count()).toEqual(0)
  });

  it('a user can apply a voucher to my basket', function() {
    add.click()
    discount1.click()
    expect(element(by.css('.basket-total')).getText()).toContain('Total: £94.00');
  });

  it('no add-to button when an item is out of stock', function() {
    expect(products.get(4).getText()).toContain('Out of Stock')
  });



});
