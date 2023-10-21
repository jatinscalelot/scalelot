app.controller("contactUsController", ($scope, $http) => {
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
        if($scope.form && $scope.form != null && $scope.form != undefined){
            if($scope.form.name && $scope.form.name != '' && $scope.form.name.trim() != '' && $scope.form.name != undefined){
                if($scope.form.email && $scope.form.email != '' && $scope.form.email.trim() != '' && $scope.form.email != undefined && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.form.email))){
                    if($scope.form.phone && $scope.form.phone != '' && $scope.form.phone.trim() != '' && $scope.form.phone.trim().length == 10 && (/^[0-9]+$/.test($scope.form.phone))){
                        if($scope.form.subject && $scope.form.subject != '' && $scope.form.subject != 'Subject'){
                            if($scope.form.message && $scope.form.message != '' && $scope.form.message.trim() != ''){
                                $http({
                                    url: BASE_URL + "contactus",
                                    method: "POST",
                                    cache: false,
                                    data: $scope.form,
                                    headers: {
                                        "Content-Type": "application/json; charset=UTF-8",
                                    },
                                }).then(
                                    function(response) {
                                        swal("Your request saved successfully. One of our executive will contact you shortly...", { icon: "success" });
                                    },
                                    function(error) {
                                        $('#loadingdiv').hide();
                                        console.log(error);
                                        HelperService.errorDetector(error);
                                        if (error.status == 401) {
                                            window.location.href = AUTO_LOGOUT;
                                        }
                                    }
                                );
                            }else{
                                swal('Message content can not be empty, please try again...', { icon: "error" });
                            }
                        }else{
                            swal('Please select subject, and try again...', { icon: "error" });
                        }
                    }else{
                        swal('Invalid contact number, Please enter valid contact number and try again...', { icon: "error" });
                    }
                }else{
                    swal('Invalid email-id, Please enter valid email-id and try again...', { icon: "error" });
                }
            }else{
                swal('Name can not be empty, Please eneter your good name and try again...', { icon: "error" });
            }
        }else{
            swal('Invalid data to contact with us, please try again...', { icon: "error" });
        }
    }
});