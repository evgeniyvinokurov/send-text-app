(function(angular) {
  'use strict';
  
  function LogoutController($scope) {
    $scope.$root.$on('authed', function(obj){
      $scope.user = $scope.$root.user;
      $scope.$apply();
    })    

    $scope.$root.$on('logout', function(obj){
      $scope.$root.user = null;
      $scope.user = null;
      $scope.$apply();
    })    

    $scope.logout = function(){
        if (!$scope.user) {
          return false;
        }
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              $scope.$root.user = JSON.parse(this.response);
              $scope.$root.$broadcast('logout');
            }
        };
        xhttp.open("GET", "/api/user/logout?sessionId=" + $scope.$root.user.sessionId, true);
        xhttp.send();
    }
  }

  angular.module('SENDTEXT').component('logout', {
    templateUrl: './client-app/components/logout/logout.html',
    controller: LogoutController
  });
  
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/