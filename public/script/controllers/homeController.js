'use strict';

var module = angular.module('pammSkeleton.controllers');

module.controller('HomeCtrl', [ '$http', '$log', '$scope', '$location', '$timeout', '$window', 'Upload',
    function($http, $log, $scope, $location, $timeout, $window, Upload) {

            var vm = this;

            vm.areas = [
              {id: 1, text: 'East'},
              {id: 2, text: 'West'},
              {id: 3, text: 'North'},
              {id: 4, text: 'NSUP'},
              {id: 5, text: 'RSUP'}
            ];

            vm.areaIdent = {
                _id: []
            };

            vm.jobs = [
              {id: 1, text: 'Standard'},
              {id: 2, text: 'Non-Standard'}
            ];

            vm.jobIdent = {
                _id: []
            };

            vm.siteholder = [
              {id: 1, text: 'Owner'},
              {id: 2, text: 'Occupier'},
              {id: 3, text: 'Acting on behalf of owner or occupier'}
            ];

            vm.siteholderIdent = {
                _id: []
            };


            vm.init = function () {

                vm.picFile = "";
                vm.navigation = 1;
                vm.boolean = true;
                vm.refNo = "ABC-001-XYZ";

            }

            vm.init();

            vm.uploadFile = function(picFile) {
			    $log.debug("Submit selected ");

			    picFile.upload = Upload.upload({
				    url : 'ws/submit',

				    data : {
					    metadata : uploadCtl.metadata,
					    imageFile : picFile
				    }
			    });

			    picFile.upload.then(function(response) {

				    $log.debug("Response received");
				    picFile.result = response.data;
				    $location.path("/");

			    }, function (response) {
				    if (response.status > 0) {
					    $scope.errorMsg = {
						    code : response.status,
						    responseBody: response
					    };

					    $log.error($scope.errorMsg);
				    }
			       }, function (evt) {
				        // Math.min is to fix IE which reports 200% sometimes
				        picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				    });
		    };

            vm.addApplicant = function  () {

                //if (value === undefined) value = "";

                var divRef = document.getElementById("reftag");
                divRef.style.display = "block";

                var data = {
                            applicantAreaGroup: vm.areaIdent._id,
                            applicantJobGroup: vm.jobIdent._id,

                            applicantName: vm.applicantName,
                            applicantFAO: vm.applicantFAO,

                            applicantAddressLine1: vm.applicantAddressLine1,
                            applicantAddressLine2: vm.applicantAddressLine2,
                            applicantAddressLine3: vm.applicantAddressLine3,
                            applicantAddressLine4: vm.applicantAddressLine4,
                            applicantAddressPostcode: vm.applicantAddressPostcode,
                            applicantAddressLandline: vm.applicantAddressLandline,

                            applicantMobile: vm.applicantMobile,
                            applicantEmail: vm.applicantEmail,

                            applicantSiteHolderGroup: vm.siteholderIdent._id,

                            occupierName: vm.occupierName,
                            occupierAddressLine1: vm.occupierAddressLine1,
                            occupierLandlineTelephoneNumber: vm.occupierLandlineTelephoneNumber,
                            occupierMobileTelephoneNumber: vm.occupierMobileTelephoneNumber,
                            occupierDARTAccountNumber: vm.occupierDARTAccountNumber

                        };

                console.log("Official Use Only: ");
                console.log("applicantArea: " + data.applicantAreaGroup);
                console.log("applicantJob: " + data.applicantJobGroup);

                console.log("Applicant Name: ");
                console.log("applicantName: " + data.applicantName);
                console.log("applicantFAO: " + data.applicantFAO);

                console.log("Applicant Address: ");
                console.log("applicantAddressLine1: " + data.applicantAddressLine1);
                console.log("applicantAddressLine2: " + data.applicantAddressLine2);
                console.log("applicantAddressLine3: " + data.applicantAddressLine3);
                console.log("applicantAddressLine4: " + data.applicantAddressLine4);
                console.log("applicantAddressPostcode: " + data.applicantAddressPostcode);
                console.log("applicantAddressLandline: " + data.applicantAddressLandline);

                console.log("Occupier Details: ");
                console.log("applicantSiteHolderGroup: " + data.applicantSiteHolderGroup);
                console.log("occupierName: " + data.occupierName);
                console.log("occupierAddressLine1: " + data.occupierAddressLine1);
                console.log("occupierLandlineTelephoneNumber: " + data.occupierLandlineTelephoneNumber);
                console.log("occupierMobileTelephoneNumber: " + data.occupierMobileTelephoneNumber);
                console.log("occupierDARTAccountNumber: " + data.occupierDARTAccountNumber);
            }

            vm.uploadData = function () {

                var str = document.getElementById("files").value;
                var indexOf = str.lastIndexOf("\\") + 1;
                var displayName = str.substring(indexOf, str.length);

                document.getElementById("uploadFile").value = displayName;
            }

            vm.imageUpload = function  () {
                //Get the photo from the input form
                var input = document.getElementById('files');
                var files = input.files;
                if (files.length != 1) { exit; }

                var file = files[0];
                var reader = new FileReader; // use HTML5 file reader to get the file

                //upload code
                var uploadUrl = "/upload";
                var fd = new FormData();
                //Take the first selected file
                fd.append("file", files[0]);

                //$http.post(uploadUrl, fd, {
                //    withCredentials: true,
                //    headers: {'Content-Type': undefined },
                //    transformRequest: angular.identity
                //});

                vm.getUserLocation();

                // end upload code

                var img = document.createElement("IMG");
                reader.onload = function(e){
                    img.setAttribute("src",reader.result);

                    EXIF.getData(img, function() {
                        console.log(EXIF.pretty(img));

                        var lat = EXIF.getTag(this,"GPSLatitude") || [0,0,0];
                        var lon = EXIF.getTag(this,"GPSLongitude")|| [0,0,0];

                        //Convert coordinates to WGS84 decimal
                        var latRef = EXIF.getTag(this,"GPSLatitudeRef") || "N";
                        var lonRef = EXIF.getTag(this,"GPSLongitudeRef") || "W";
                        var imgLatitude = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
                        var imgLongitude = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);

                        //Send the coordinates to your map
                        if (imgLatitude == 0 && imgLongitude == 0) {
                            var locationElement = document.getElementById("errorData");
                            locationElement.style.color = "red";
                            locationElement.style.fontWeight = "bold";
                            locationElement.style.width = "20px";
                            locationElement.innerHTML = "This image does not appear to have a geographical location attributed to it";

                        }


                        var location = vm.getGeoLocation(imgLatitude,imgLongitude);
                        var imageMap = 'imageMap';
                        vm.initMap(imageMap, location);

                        // display map co-ordinates
                        document.getElementById("imgLatitude").value = imgLatitude;
                        document.getElementById("imgLongitude").value = imgLongitude;

                        //vm.imgLatitude = imgLatitude;
                        //vm.imgLongitude = imgLongitude;

                    });
                };
                reader.readAsDataURL(file);

            }

            vm.getGeoLocation = function  (lat, lon) {

                var location = {lat: lat, lng: lon};

                return location;

            }

            vm.initMap = function (eleId, location) {

                //var eleId = 'imageMap';

                $window.map = new google.maps.Map(document.getElementById(eleId), { zoom: 8, center: location });
                var marker = new google.maps.Marker({ position: location, map: map });
            }

             vm.getUserLocation = function () {
                console.log("getting location");
                //check if the geolocation object is supported, if so get position
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(vm.displayLocation, vm.displayError);
                } else {

                    locationElement.style.color = "red";
                    locationElement.style.fontWeight = "bold";
                    locationElement.style.width = "20px";
                    document.getElementById("locationData").innerHTML = "Sorry - your browser doesn't support geolocation!";
                    //console.log("Sorry - your browser doesn't support geolocation!");
                }
            };


            vm.displayLocation = function (position) {

                var usrLatitude = position.coords.latitude;
                var usrLongitude = position.coords.longitude;

                //Send the coordinates to your map
                var location = vm.getGeoLocation(usrLatitude,usrLongitude);
                var userMap = 'userMap';
                vm.initMap(userMap, location);
                // display map co-ordinates
                document.getElementById("usrLatitude").value = usrLatitude;
                document.getElementById("usrLongitude").value = usrLongitude;

                //vm.usrLatitude = usrLatitude;
                //vm.usrLongitude = usrLongitude;

            };


            vm.displayError = function (error) {

                //get a reference to the HTML element for writing result
                var locationElement = document.getElementById("locationData");
                    locationElement.style.color = "red";
                    locationElement.style.fontWeight = "bold";
                    locationElement.style.width = "20px";
                //locationElement.style.display = 'none';

                //find out which error we have, output message accordingly
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationElement.innerHTML = "Permission to obtain location was denied";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationElement.innerHTML = "Location data not available";
                        break;
                    case error.TIMEOUT:
                        locationElement.innerHTML = "Location request timeout";
                        break;
                    case error.UNKNOWN_ERROR:
                        locationElement.innerHTML = "An unspecified error occurred";
                        break;
                    default:
                        locationElement.innerHTML = "Who knows what happened...";
                        break;
                }
            };
        }]);