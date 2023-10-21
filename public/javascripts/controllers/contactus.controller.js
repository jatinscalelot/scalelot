app.controller("contactUsController", ($scope, $http) => {
    $scope.code = "+91";
    $scope.onContact = () => {
        var dialcode = $('.iti__selected-dial-code').text();
        console.log('dialcode', dialcode);
        console.log('form data', $scope.form);
        console.log('tel', $scope.tel);
    }
});