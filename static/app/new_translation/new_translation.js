
angular.module('translator.new_translation', [])

  .controller('NewTranslationController', function ($scope, Translations) {
    $scope.phrase = '';
    $scope.translation = '';
    $scope.detectedSourceLang = '';
    $scope.errorMessage = '';
    $scope.addTranslation = function () {
      if ($scope.phrase) {
        Translations.addTranslation($scope.phrase)
        .then(function(translation) {
          $scope.errorMessage = '';
          $scope.translation = translation.data.eng_translation;
          $scope.detectedSourceLang = translation.data.original_lang;
        })
        .catch(function(response) {
          $scope.translation = '';
          $scope.errorMessage = response.data.error;
        })
      } else {
        $scope.translation = '';
        $scope.errorMessage = 'Text field was left empty';
      }
    };
  });