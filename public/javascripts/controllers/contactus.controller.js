app.controller("contactUsController", ($scope, $http) => {
    $scope.code = "+91";
    $scope.onContact = () => {
        console.log('form data', $scope.form);
        console.log('tel', $scope.tel);
    }
});