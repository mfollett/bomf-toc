/*
 *
 **/


(function() {
  'use strict';

  var module = angular.module('bomf.table-of-contents', []);
  module.directive('article', function() {
      return {
        restrict:   'E',
        scope:      true,
        controller: function($scope) {
          var headers = [];
          this.registerHeader = function(header) {
            headers.push(header);
            $scope.$broadcast('headerRegistered');
          };
          this.listHeaders    = function() { return headers; };
        }
      };
    }).
    directive('bomfTableOfContents', function() {
      return {
        restrict: 'E',
        scope:    true,
        require:  '^article',
        link:     function(scope, element, attrs, article) {
          var generateTOC = function() {
            var list = angular.element('<ol class="toc-table"></ol>');
            element.empty();
            angular.forEach( article.listHeaders(),
              function(header) {
                var content = angular.element(header).text();
                var c = 'toc-header-' + header.prop('nodeName').match(/\d/)[0];
                list.append('<li class="toc-entry '+c+'">'+content+'</li>');
              }
            );
            element.append(list);
            console.log(list.html());
          };
          generateTOC();
          scope.$on('headerRegistered', generateTOC);
        }
      };
    });

    var headerLinker = function(scope, element, attrs, article) {
      article.registerHeader(element);
    };

    [1,2,3,4,5,6].forEach(function(number) {
      var header = 'h' + number;
      module.directive(header, function() {
        return {
          require:  '^article',
          restrict: 'E',
          scope:    false,
          link:     headerLinker
        };
      });
    });
})();
