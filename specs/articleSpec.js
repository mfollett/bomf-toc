describe('bomfTableOfContents', function() {
  var controller;

  beforeEach(function() {
    module('bomf.table-of-contents');

    var article = angular.element( '<article></article>');

    inject(function($rootScope, $compile) {
      var scope = $rootScope.$new();
      $compile(article)(scope);
    });

    controller = article.controller('article');
  });

  describe('controller methods', function() {
    it('adds a registerHeader method', function() {
      expect(_(controller.registerHeader).isFunction()).toBeTruthy;
    });

    it('adds a listHeaders method', function() {
      expect(_(controller.listHeaders).isFunction()).toBeTruthy;
    });
  });
  describe('header register', function() {
    it('returns a thing that has been registered', function() {
      controller.registerHeader('a');
      expect(controller.listHeaders()).toEqual(['a']);
    });

    it('returns multiple things that have been registered', function() {
      controller.registerHeader('a');
      controller.registerHeader('b');
      expect(controller.listHeaders()).toEqual(['a', 'b']);
    });

    it('returns nothing when nothing has been registered', function() {
      expect(controller.listHeaders()).toEqual([]);
    });
  });
});
