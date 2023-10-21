app.controller("contactUsController", ($scope, $http) => {
    $scope.code = "+91";
    $scope.form = {
        name : '',
        email : '',
        phone : '',
        contrycode : '+91',
        subject : 'Subject',
        message : ''
    };
    $scope.onContact = () => {
        var dialcode = $('.iti__selected-dial-code').text();
        $scope.form.contrycode = dialcode;
        console.log('form data', $scope.form);
    }
});