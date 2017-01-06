
angular.module('translator.new_translation', [])

  .controller('NewTranslationController', function ($scope, Translations) {
    $scope.phrase = '';
    $scope.translation = '';
    $scope.detectedSourceLang = '';
    $scope.errorMessage = '';
    $scope.addTranslation = function () {
      $scope.errorMessage = '';
      if ($scope.phrase) {
        Translations.addTranslation($scope.phrase)
        .then(function(translation) {
          $scope.translation = translation.data.eng_translation;
          $scope.detectedSourceLang = translation.data.original_lang;
        })
        .catch(function(response) {
          $scope.translation = '';
          if (response.data.error === 'Empty String') {
            $scope.errorMessage = 'Text field was left empty';
          }
        });
      } else {
        $scope.errorMessage = 'Text field was left empty';
      }
    };
  });