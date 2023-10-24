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
        $('#applyFor').text(position);
        $('#careerModal').modal('show');
    }
    $scope.onSubmitCareer = () => {
        var dialcode = $('.iti__selected-dial-code').text();
        $scope.career.selectedPosition = $('#applyFor').text();
        $scope.career.contrycode = dialcode;
        console.log('$scope.career',  $scope.career);
    }
    $('#careerModal').on('hidden.bs.modal', function () {
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
    });
});