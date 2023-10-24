app.controller("careerController", ($scope, $http) => {
    $scope.email = '';
    $scope.selectedPosition = '';
    $scope.career = {
        selectedPosition : '',
        first_name : '',
        middle_name : '',
        last_name : '',
        email : '',
        phone : '',
        contrycode : '+91',
        city : '',
        experience : '',
        position : '',
        joining : '',
        message : '',
        cv : '',
        portfolio : ''
    }
    $scope.onCreereClick = (position) => {
        $scope.career.selectedPosition = position;
        console.log('$scope.career.selectedPosition',$scope.career.selectedPosition);
        $('#applyFor').text(position);
        $('#careerModal').modal('show');
    }
    $scope.onSubmitCareer = () => {
        var dialcode = $('.iti__selected-dial-code').text();
        $scope.career.contrycode = dialcode;
        console.log('clicked');
        console.log('$scope.career',  $scope.career);
    }
});