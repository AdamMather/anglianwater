'use strict';

var module = angular.module('pammSkeleton.controllers');

module.controller('HomeCtrl', [ '$http', '$log', '$scope', '$window',
    function($http, $log, $scope, $window) {

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

                vm.refNo = "ABC-001-XYZ";

            }

            vm.init();

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

            vm.imageUpload = function  () {
                //Get the photo from the input form
                var input = document.getElementById('files');
                var files = input.files;
                if (files.length != 1) { exit; }

                var file = files[0];
                var reader = new FileReader; // use HTML5 file reader to get the file

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
                        lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
                        lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);

                        //Send the coordinates to your map
                        vm.setGeotagFields(lat,lon,EXIF.pretty(img));
                    });
                };
                reader.readAsDataURL(file);

            }

            vm.setGeotagFields = function  (lat, lon, geodata) {

                vm.latitude = lat;
                vm.longitude = lon;

                var location = {lat: lat, lng: lon};

                vm.initMap(location);
            }

            vm.initMap = function (location) {

                $window.map = new google.maps.Map(document.getElementById('map'), { zoom: 8, center: location });
                var marker = new google.maps.Marker({ position: location, map: map });
            }
        }]);