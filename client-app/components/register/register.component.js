(function(angular) {
  'use strict';
  
  function RegisterController($scope) {
    $scope.name = '';
    $scope.email = '';
    $scope.password = '';        
    $scope.authed = false;

    $scope.$root.$on('authed', function(obj){
      $scope.authed = true;
      $scope.$apply();
    })

    $scope.$root.$on('logout', function(obj) {      
      $scope.authed = false;
      $scope.$apply();
    })

    $scope.send = function() {
        if (!$scope.name || $scope.name.length <= 3) {
          $scope.$root.message = "No name specified!"
          $scope.$root.$broadcast('message');
          return false;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              $scope.$root.user = JSON.parse(this.response);
              $scope.$root.$broadcast('authed');
            }
        };
        xhttp.open("GET", "/api/user/register?name=" + $scope.name + "&email=" + $scope.email + "&pass=" + $scope.password, true);
        xhttp.send();
    };
  }

  angular.module('SENDTEXT').component('register', {
    templateUrl: './client-app/components/register/register.html',
    controller: RegisterController
  });
  
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/