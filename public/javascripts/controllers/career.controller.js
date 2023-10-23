app.controller("careersController", ($scope, $http) => {
    $scope.email = '';
    $scope.selectedPosition = '';
    $scope.onCreereClick = (position) => {
        $scope.selectedPosition = position;
        $('#careerModal').model('show');
    }
});