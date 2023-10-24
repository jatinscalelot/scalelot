app.controller("careerController", ($scope, $http) => {
    $scope.email = '';
    $scope.selectedPosition = '';
    $scope.resumefile = null;
    $scope.portfoliofile = null;
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
    $scope.resumefileUploader = () => {
        if ($scope.resumefile != null) {
			let formData = new FormData();
			formData.append("resumefile", $scope.resumefile);
			$http({
                url: BASE_URL + "upload/resumefile",
				method: "POST",
				data: formData,
				transformRequest: angular.identity,
				headers: { "Content-Type": undefined, "Process-Data": false },
			}).then(
				function (response) {
					if (response.data.IsSuccess == true) {
						if(response.data.Data){
                            $scope.career.cv = response.data.Data;
                            swal("Your portfolio file uploaded successfully...", { icon: "success" });
                        }else{
                            swal("", 'Some-thing went wrong while uploading the file! Please try again', "error");
                        }
					}
				}, function (error) {
					console.error(error);
                    if (error.status == 401) {
                        window.location.href = AUTO_LOGOUT;
                    }
				}
			);
		}
    };
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
    $scope.portfoliofileUploader = () => {
        if ($scope.portfoliofile != null) {
			let formData = new FormData();
			formData.append("portfoliofile", $scope.portfoliofile);
			$http({
                url: BASE_URL + "upload/portfoliofile",
				method: "POST",
				data: formData,
				transformRequest: angular.identity,
				headers: { "Content-Type": undefined, "Process-Data": false },
			}).then(
				function (response) {
					if (response.data.IsSuccess == true) {
						if(response.data.Data){
                            $scope.career.portfolio = response.data.Data;
                            swal("Your portfolio file uploaded successfully...", { icon: "success" });
                        }else{
                            swal("", 'Some-thing went wrong while uploading the file! Please try again', "error");
                        }
					}
				}, function (error) {
					console.error(error);
                    if (error.status == 401) {
                        window.location.href = AUTO_LOGOUT;
                    }
				}
			);
		}
    };
    $scope.fileSelectedforWorkflow = (input) => {
        $scope.portfoliofile = null;
        if (input.files && input.files[0]) {
            var filename = input.files[0].name;
            var valid_extensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.JPG|\.JPEG|\.PNG|\.PDF)$/i;
            if (valid_extensions.test(filename)) {
                $(input.files).each(function () {
				    $scope.portfoliofile = input.files[0];
					$scope.portfoliofileUploader();
				});
            } else {
				swal("", 'Invalid File Format, Valid Format is .jpg .jpeg .png .pdf !', "error");
			}
        }
    };
});