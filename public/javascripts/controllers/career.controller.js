app.controller("careerController", ($scope, $http) => {
    $scope.email = '';
    $scope.selectedPosition = '';
    $scope.resumefile = null;
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
    $scope.fileSelectedforresume = (input) => {
        $scope.resumefile = null;
        if (input.files && input.files[0]) {
            var filename = input.files[0].name;
            var valid_extensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.JPG|\.JPEG|\.PNG|\.PDF)$/i;
            if (valid_extensions.test(filename)) {
                $(input.files).each(function () {
				    $scope.resumefile = input.files[0];
					$scope.resumefileUploader();
				});
            } else {
				swal("", 'Invalid File Format, Valid Format is .jpg .jpeg .png .pdf !', "error");
			}
        }
    };
});