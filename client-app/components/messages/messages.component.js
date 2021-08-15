(function(angular) {
  'use strict';
  
  function MessagesController($scope) {
    $scope.$root.$on('message', function(obj){
      $scope.message = $scope.$root.message;
      $scope.green = $scope.message == "Sended" || $scope.message == "Ok";
      $scope.$applyAsync();

      setTimeout(function(){
        $scope.message = ''; 
        $scope.$apply();
      }, 3000)
    })
  }

  angular.module('SENDTEXT').component('messages', {
    templateUrl: './client-app/components/messages/messages.html',
    controller: MessagesController
  });
  
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/