angular.module('translator', [
  'translator.services',
  'translator.new_translation',
  'translator.translations_list',
  // 'translator.navbar',
  'ngRoute'
]).run(run)

  .config(function($routeProvider) {
    $routeProvider
      .when('/translations_list', {
        templateUrl: '/static/app/translations_list/translations_list.html',
        controller: 'TranslationsListController'
      })
      .when('/new_translation', {
        templateUrl: '/static/app/new_translation/new_translation.html',
        controller: 'NewTranslationController'
      })
      .otherwise({
        redirectTo: '/new_translation'
      });
  });

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}