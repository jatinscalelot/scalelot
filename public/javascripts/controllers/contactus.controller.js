app.controller("contactUsController", ($scope, $http) => {
    $scope.code = "+91";
    $scope.form.subject = "Subject";
    $scope.onContact = () => {
        var dialcode = $('.iti__selected-dial-code').text();
        $scope.form.contrycode = dialcode;
        console.log('form data', $scope.form);
    }
});