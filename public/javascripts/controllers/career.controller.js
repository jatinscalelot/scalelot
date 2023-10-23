app.controller("careersController", ($scope, $http) => {
    $scope.email = '';
    $scope.selectedPosition = '';
    $scope.onCreereClick = () => {
        // $scope.selectedPosition = position;
        $('#careerModal').model('show');
    }
});