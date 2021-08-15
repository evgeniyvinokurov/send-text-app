(function(angular) {
  'use strict';
  
  function AuthController($scope) {
    $scope.name = '';
    $scope.password = '';
    $scope.authed = false;

    $scope.$root.$on('logout', function(obj) {      
      $scope.authed = false;
      $scope.$apply();
    })

    $scope.$root.$on('authed', function(obj){
      $scope.authed = true;
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
              let data = JSON.parse(this.response);
              if (!data.status) {
                $scope.$root.user = data;
                $scope.$root.$broadcast('authed');
              }
            }
        };
        xhttp.open("GET", "/api/user/auth?name=" + $scope.name  + "&pass=" + $scope.password, true);
        xhttp.send();
    }
  }

  angular.module('SENDTEXT').component('auth', {
    templateUrl: './client-app/components/auth/auth.html',
    controller: AuthController
  });
  
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/