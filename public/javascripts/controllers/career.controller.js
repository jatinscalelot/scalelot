app.controller("careerController", ($scope, $http) => {
    $scope.email = '';
    $scope.selectedPosition = '';
    $scope.onCreereClick = (position) => {
        $scope.selectedPosition = position;
        console.log('$scope.selectedPosition',  $scope.selectedPosition);
        $('#applyFor').text(position);
        $('#careerModal').modal('show');
    }
});