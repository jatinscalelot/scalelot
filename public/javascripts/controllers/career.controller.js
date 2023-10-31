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
    };
    $scope.onCreereClick = (position) => {
        $('#applyFor').text(position);
        $('#careerModal').modal('show');
    };
    $scope.onSubmitCareer = () => {
        var dialcode = $('.iti__selected-dial-code').text();
        $scope.career.selectedPosition = $('#applyFor').text();
        $scope.career.contrycode = dialcode;
        if($scope.career){
            if($scope.career.selectedPosition && $scope.career.selectedPosition != ''){
                if($scope.career.first_name && $scope.career.first_name != ''){
                    if($scope.career.middle_name && $scope.career.middle_name != ''){
                        if($scope.career.last_name && $scope.career.last_name != ''){
                            if($scope.career.email && $scope.career.email != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.career.email))){
                                if($scope.career.phone && $scope.career.phone != '' && $scope.career.phone.length >= 9){
                                    if($scope.career.contrycode && $scope.career.contrycode != ''){
                                        if($scope.career.city && $scope.career.city != ''){
                                            if($scope.career.experience && $scope.career.experience != ''){
                                                if($scope.career.position && $scope.career.position != ''){
                                                    if($scope.career.joining && $scope.career.joining != ''){
                                                        if($scope.career.message && $scope.career.message != ''){
                                                            if($scope.career.cv && $scope.career.cv != ''){
                                                                $http({
                                                                    url: BASE_URL + "career",
                                                                    method: "POST",
                                                                    cache: false,
                                                                    data: $scope.career,
                                                                    headers: {
                                                                        "Content-Type": "application/json; charset=UTF-8",
                                                                    },
                                                                }).then(
                                                                    function(response) {
                                                                        if (response.data.IsSuccess == true && response.data.Data == 1) {
                                                                            swal("Your Application has been saved successfully. You will get call & email from our executive for the interview, Stay tune...", { icon: "success" });
                                                                        }else{
                                                                            swal(response.data.Message, { icon: "error" });
                                                                        }
                                                                    },
                                                                    function(error) {
                                                                        console.log(error);
                                                                        HelperService.errorDetector(error);
                                                                        if (error.status == 401) {
                                                                            window.location.href = AUTO_LOGOUT;
                                                                        }
                                                                    }
                                                                );
                                                            }else{
                                                                swal('CV is mandatory, Please upload valid file and try again... ', { icon: "error" });
                                                            }
                                                        }else{
                                                            swal('Message field is mandatory, Please write something about you and try again...', { icon: "error" });
                                                        }
                                                    }else{
                                                        swal('Joining time is mandatory, Please select valid option and try again...', { icon: "error" });
                                                    }
                                                }else{
                                                    swal('Experties level is mandatory, Please select valid option and try again... ', { icon: "error" });
                                                }
                                            }else{
                                                swal('Experience level is mandatory, Please select valid option and try again...', { icon: "error" });
                                            }
                                        }else{
                                            swal('City is mandatory, Please write city name where you leave and try again...', { icon: "error" });
                                        }
                                    }else{
                                        swal('Contry-code is mandatory, Please select your contry of origin and try again...', { icon: "error" });
                                    }
                                }else{
                                    swal('Contact Number is mandatory and must be valid, Please write your contact number and try again...', { icon: "error" });
                                }
                            }else{
                                swal('Email is mandatory and must be valid, Please write your valid email-id and try again...', { icon: "error" });
                            }
                        }else{
                            swal('Last name is mandatory, Please write your last name and try again...', { icon: "error" });
                        }
                    }else{
                        swal('Middle name is mandatory, Please write your middle name and try again...', { icon: "error" });
                    }
                }else{
                    swal('First name is mandatory, Please write your first name and try again...', { icon: "error" });
                }
            }else{
                swal('Invalid career position data to request, Please try again with valid career position and try again...', { icon: "error" });
            }
        }else{
            swal('Invalid data to request for the selected position, Please try again with valid data...', { icon: "error" });
        }
    };
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
                            swal("Your resume file uploaded successfully...", { icon: "success" });
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