describe('bomfTableOfContents', function() {
  describe('original specs', function() {
    var article, element,
      HEADERS = [
        'This is the first header',
        'Second Header',
        'Last Header'
      ];

    beforeEach(function() {
      module('bomf.table-of-contents');

      var contents = HEADERS.map(function(header) {
        return '<section>' +
          '<h1>' + header + '</h1>' +
          '</section>';
      }).join('');

      article = angular.element(
        '<article>' +
        '<bomf-table-of-contents></bomf-table-of-contents>' +
        contents +
        '</article>'
      );

      inject(function($rootScope, $compile) {
        var scope = $rootScope.$new();
        $compile(article)(scope);
      });

      element = angular.element(article.children()[0]);
    });

    describe('results of compilation', function() {
      it('appends one element to the directive element', function() {
        expect(element.children().length).toEqual(1);
      });

      describe('the child of the directive element', function() {

        function subject() {
          return angular.element(element.children()[0]);
        };

        it('the child of the directive element is an ordered list', function() {
          expect(subject().prop('nodeName')).toEqual('OL');
        });

        it('has ' + HEADERS.length + ' list items', function() {
          expect(subject().find('li').length).toEqual(HEADERS.length);
        });

        it('has the proper contents', function() {
          expect(subject().text()).toEqual(HEADERS.join(''));
        });
      });
    });
  });

  describe('new specs', function() {
    beforeEach(function() {
      module('bomf.table-of-contents');
    });

    describe('when presented hs 1-6', function() {
      var article, element;

      beforeEach(function() {
        var headers = [1,2,3,4,5,6].map(function(i) {
          return '<h' + i + '>Header ' + i + '</h' + i + '>';
        }).join();
        article = angular.element('<article>' +
          '<bomf-table-of-contents></bomf-table-of-contents>' +
          headers +
          '</article>'
        );

        inject(function($rootScope, $compile) {
          var scope = $rootScope.$new();
          $compile(article)(scope);
        });

        element = angular.element(article.children()[0]);
      });

      it('includes each one in the TOC', function() {
        // This approach implies order also. It would have been better as a
        // separate test but I'll take it.
        var expectedText = [1,2,3,4,5,6].map(function(i) {
          return 'Header ' + i;
        }).join('');
        expect(element.text()).toEqual(expectedText);
      });

      // more tests would be good here.
    });
  });
});
