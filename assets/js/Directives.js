/**
* @author p.baboo@huulke.com
* created on 05.09.2017
*/
(function () {
  'use strict';
  angular.module('WebApp').directive('navBar', navBar);
  function navBar() {
    return {
      restrict: 'E',
      templateUrl: '/views/nav/menus.html'
    };
  }
})();