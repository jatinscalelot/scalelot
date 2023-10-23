app.controller("aboutUsController", ($scope, $http) => {
    $scope.email = '';
    $scope.onSubscribe = () => {
        if($scope.email && $scope.email != null && $scope.email != undefined && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email))){
            $http({
                url: BASE_URL + "aboutus",
                method: "POST",
                cache: false,
                data: {email : $scope.email},
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }).then(
                function(response) {
                    if (response.data.IsSuccess == true && response.data.Data == 1) {
                        swal("Your subscription request has been saved successfully. Now you will get latest updates from Scalelot Technologies, stay happy stay tuned...", { icon: "success" });
                    }else{
                        swal(response.data.Message, { icon: "error" });
                    }
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
            swal('Invalid email-id, Please enter valid email-id and try again...', { icon: "error" });
        }
    }
});
