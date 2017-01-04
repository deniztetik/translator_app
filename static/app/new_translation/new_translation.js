
angular.module('translator.new_translation', [])

  .controller('NewTranslationController', function ($scope, Translations) {
    $scope.phrase = '';
    $scope.translation = '';
    $scope.detectedSourceLang = '';
    $scope.addTranslation = function () {
      Translations.addTranslation($scope.phrase)
        .then(function(translation) {
          console.log(translation);
          $scope.translation = translation.data.eng_translation;
          $scope.detectedSourceLang = translation.data.original_lang;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
  });