
angular.module('translator.new_translation', [])

  .controller('NewTranslationController', function ($scope, Translations) {
    $scope.phrase = '';
    $scope.translation = '';
    $scope.detectedSourceLang = '';
    $scope.errorMessage = '';
    $scope.addTranslation = function () {
      Translations.addTranslation($scope.phrase)
        .then(function(translation) {
          console.log(translation);
          $scope.errorMessage = '';
          $scope.translation = translation.data.eng_translation;
          $scope.detectedSourceLang = translation.data.original_lang;
        })
        .catch(function(response) {
          console.log(response.data.error);
          $scope.translation = '';
          if (response.data.error === "Empty String") {
            $scope.errorMessage = "Text field was left empty";
          }
        });
    };
  });