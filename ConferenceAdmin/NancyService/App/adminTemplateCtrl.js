﻿
(function () {
    'use strict';

    var controllerId = 'templateCtrl';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', templateCtrl]);

    function templateCtrl($scope, $http, restApi) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'templateCtrl';
        vm.headerModal;
        vm.add;
        vm.edit;
        vm.view;
        vm.loading = true;
        vm.template;
        vm.topicObj = null;


        // Functions
        vm.addTemplate = _addTemplate;
        vm.getTemplates = _getTemplates;
        vm.selectedTemplate = _selectedTemplate;
        vm.clear = _clear;
        vm.updateTemplate = _updateTemplate;
        vm.deleteTemplate = _deleteTemplate;
        vm.addValues = _addValues;
        vm.editValues = _editValues;
        vm.viewValues = _viewValues;
        vm.download = _download;
        vm.getTopics = _getTopics;

        activate();

        $scope.showContent = function ($fileContent, File) {
            $scope.content = $fileContent;
            vm.newTempName = File.name;
        };


        // Functions
        function activate() {
            _getTemplates();
            _getTopics();

        }

        function _selectedTemplate(template, action) {

            vm.template = JSON.parse(JSON.stringify(template));
        }

        function _clear() {
            vm.template = null;
            $scope.content = "";
            $scope.$fileContent = "";
            document.getElementById("addTemplateForm").reset();


        }

        function _addValues() {
            document.getElementById("addTemplateForm").reset();
            vm.add = true;
            vm.edit = false;
            vm.view = false;
            vm.newTempName = "";
            vm.template = {};
            $scope.content = undefined;
            vm.headerModal = "Add New Evaluation Template";


        }
        function _viewValues() {
            vm.view = true;
            vm.add = false;
            vm.edit = false;
            vm.headerModal = "View Evaluation Template";
            $scope.content = vm.template.document;

        }
        function _editValues() {
            document.getElementById("addTemplateForm").reset();
            vm.edit = true;
            vm.add = false;
            vm.view = false;
            vm.headerModal = "Edit Evaluation Template";
            $scope.content = vm.template.document;
          
            vm.newTempName = "Empty";
            vm.topicsList.forEach(function (topic) {
                if (topic.name == vm.template.topic) {
                    vm.topicObj = JSON.parse(JSON.stringify(topic));

                }


            });

        }

        //Download Document
        function _download() {
            window.open($scope.content);
        }


        function _addTemplate(File) {
            vm.template.document = $scope.content;
            if ($scope.content !="" && $scope.content != undefined) {
                vm.template.name = File.name;
                vm.template.topic = vm.topicObj.name;
                vm.loadingUpload = true;



                restApi.addTemplate(vm.template)
                         .success(function (data, status, headers, config) {
                             if (data != null) {
                                 vm.template.templateID = data.templateID;
                                 vm.templatesList.push(vm.template);
                                 vm.loadingUpload = false;
                                 _clear();
                                 $('#addTemplate').modal('hide');
                                

                             }
                             else {
                                 vm.loadingUpload = false;
                                 alert("add un alert sexy");

                             }

                         })

                         .error(function (error) {
                             vm.loadingUpload = false;
                             $('#addTemplate').modal('hide');
                             _clear();
                             alert("add un aler sexy");

                         });

            }

            else {
                alert("Añade un template");
            }

        }

        function _getTemplates() {
            restApi.getTemplatesAdmin().
                   success(function (data, status, headers, config) {
                       vm.templatesList = data;
                       load();
                   }).
                   error(function (data, status, headers, config) {
                       vm.templatesList = data;
                       alert("add un aler sexy");
                       _clear();
                   });
        }

        function _updateTemplate(File) {
            vm.loadingUpload = true;

            if (File != undefined) {
                vm.template.document = $scope.content;
                vm.template.name = File.name;
            }
            vm.template.topic = vm.topicObj.name;
            restApi.updateTemplate(vm.template)
            .success(function (data, status, headers, config) {
                vm.templatesList.forEach(function (template, index) {
                    if (template.templateID == vm.template.templateID) {
                        vm.templatesList[index] = JSON.parse(JSON.stringify(vm.template));
                        vm.loadingUpload = false;
                        $('#addTemplate').modal('hide');


                    }


                });
                _clear();

            }
            )
            .error(function (data, status, headers, config) {
                alert("add un aler sexy");
                _clear();
                vm.edit = false;
            });
        }
        function _deleteTemplate() {
            vm.loadingRemoving = true;
            restApi.deleteTemplate(vm.template.templateID)
            .success(function (data, status, headers, config) {
                vm.templatesList.forEach(function (template, index) {
                    if (template.templateID == vm.template.templateID) {
                        vm.templatesList.splice(index, 1);
                        vm.loadingRemoving = false;
                        $('#delete').modal('hide');
                        return;
                    }

                });
                vm.template = {};
            })

            .error(function (data, status, headers, config) {
                alert("add un aler sexy");
                vm.loadingRemoving = false;
                $('#delete').modal('hide');
            });
        }

        function _getTopics() {
            restApi.getTopics()
            .success(function (data, status, headers, config) {
                vm.topicsList = data;
                if (data != null)
                    vm.topicObj = data[0];
            })
           .error(function (data, status, headers, config) {
               vm.topicsList = data;
           });
        }

        //Avoid flashing when page loads
        var load = function () {
            vm.loading = false;
        };



    }
})();