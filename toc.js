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
    directive('bomfTableOfContents', function(articleFinder, headerFinder) {
      return {
        restrict: 'E',
        scope:    false,
        require:  '^article',
        compile: function(element, attrs) {
          var list = angular.element('<ol class="toc-table"></ol>');
          angular.forEach(
            headerFinder(
              articleFinder(element)),
              function(header) {
                var content = angular.element(header).text();
                list.append('<li class="toc-entry">'+ content +'</li>');
              }
          );
          element.append(list);
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
