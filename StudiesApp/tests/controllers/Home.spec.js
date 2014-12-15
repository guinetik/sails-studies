var HomeController = require('../../api/controllers/Home'),
  sinon = require('sinon'),
  assert = require('assert');

describe('The HomeController', function () {
  describe('when we load the about page', function () {
    it ('should render the view', function () {
      var view = sinon.spy();
      HomeController.index(null, {
        view: view
      });
      assert.ok(view.called);
    });
  });
});
