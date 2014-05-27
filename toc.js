/*
 *
 **/


(function() {
  'use strict';

  angular.module('bomf.table-of-contents', []).
    directive('article', function() {
      return {
        restrict:   'E',
        scope:      false,
        controller: function() {
          var headers = [];
          this.registerHeader = function(header) { headers.push(header); };
          this.listHeaders    = function() { return angular.copy(headers); };
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
})();
