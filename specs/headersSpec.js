describe('headers', function() {
  var controller, article;

  beforeEach(function() {
    module('bomf.table-of-contents');
  });

  [1,2,3,4,5,6].forEach(function(NUMBER) {
    var NODE_NAME = 'h' + NUMBER;

    beforeEach(function() {
      article  = angular.element('<article></article>');

      inject(function($rootScope, $compile) {
        var scope = $rootScope.$new();
        $compile(article)(scope);
      });

      controller = article.controller('article');
    });

    function testHeaderRegistration(HEADERS) {
      beforeEach(function() {
        article.append(HEADERS[0]);
        article.append(HEADERS[1]);

        inject(function($rootScope, $compile) {
          var scope = $rootScope.$new();
          $compile(HEADERS[0])(scope);
          $compile(HEADERS[1])(scope);
        });
      });

      it('calls registration upon creation', function() {
        expect(controller.listHeaders()).toEqual(HEADERS);
      });
    }

    describe('when adding a header of type '+ NODE_NAME, function() {
      testHeaderRegistration([
        angular.element('<' + NODE_NAME + '></' + NODE_NAME + '>')
      ]);
    });

    describe('when adding multiple headers of type '+ NODE_NAME, function() {
      testHeaderRegistration([
        angular.element('<' + NODE_NAME + '></' + NODE_NAME + '>'),
        angular.element('<' + NODE_NAME + '></' + NODE_NAME + '>')
      ]);
    });

    describe('when adding headers of type '+ NODE_NAME + ' & other type',
      function() {
        var OTHER_NODE_NAME = 'h' + ((NUMBER+1)%6+1);
        testHeaderRegistration([
          angular.element('<' + NODE_NAME + '></' + NODE_NAME + '>'),
          angular.element('<'+ OTHER_NODE_NAME +'></'+ OTHER_NODE_NAME +'>')
        ]);
      }
    );
  });
});
