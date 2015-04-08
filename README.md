#Angular Shop

## Features
- Add a product to the shopping basket.
- Remove a product from the shopping basket.
- Viewing the total price of products in the shopping basket.
- Various vouchers can be applied to the shopping basket depending on the conditions of the voucher.
- Total price updates after a voucher is applied.
- Vouchers can only be used if the conditions of the voucher are met.
- Once a product is out of stock, it cannot be added to the basket.

## How to use
```
> git clone https://github.com/fadieh/angular_shop.git
> cd angular_shop
> npm install
> bower install
> npm start
> visit http://localhost:8000/app/
```
Tests:

```
Unit: karma start test/karma.conf.js
E2E: webdriver-manager and then protractor test/protractor.conf.js
```
## Structure

- app/js/app.js: Module and Routing
- app/js/controller.js: The controller
- app/index.html: HTML5 with ng-view
- app/partials/shop.html: HTML5 with Angular directives for the view of the shop.
- e2e/scenarios.js: contains end to end tests
- unit/controllerspec.js: contains unit tests

## Technologies used

- Angular.js
- HTML5 & CSS3
- Bootstrap
- Karma
- Protractor

## Things to improve

- [ ] Hide and show basket using JQuery.
- [ ] Can remove products incrementally.
- [ ] Voucher can be removed.
- [ ] View products by category.
- [ ] JQuery animation in basket to reflect when product is added to the basket.
- [ ] Alluring logo and text in nav bar.
