
angular.module('translator.translations_list', [])

  .controller('TranslationsListController', function ($scope, Translations) {
    $scope.translations = [];
    $scope.getTranslations = function () {
      Translations.getAll()
        .then(function(translations) {
          $scope.translations = translations;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
    $scope.getTranslations();
  });