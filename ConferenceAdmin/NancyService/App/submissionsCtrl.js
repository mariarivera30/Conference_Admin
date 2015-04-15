﻿(function () {
    'use strict';

    var controllerId = 'submissionsCtrl';

    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', '$window', submissionsCtrl]);

    function submissionsCtrl($scope, $http, restApi, $window) {
        var vm = this;
        var userID = $window.sessionStorage.getItem('userID');
        vm.submissionsList = [];
        vm.acceptanceStatusList = ['Pending', 'Accepted', 'Rejected'];
        vm.evaluationsList = [];
        vm.prevEvaluationsList = [];
        vm.evaluatorsList = [];
        vm.submissionTypeList = [];
        vm.topicsList = [];
        vm.documentsList = [];
        vm.templatesList = [];
        vm.usersList = [];
        vm.deletedSubmissionsList = [];
        // custom Submission class fields
        vm.submissionID;
        vm.evaluatorID;
        vm.topic;
        vm.userType;
        vm.submissionTypeID;
        vm.submissionTypeName;
        vm.submissionTitle;
        vm.topiccategoryID;
        vm.status;
        vm.isEvaluated;
        vm.isFinalSubmission;
        vm.finalSubmissionAllowed;
        vm.acceptanceStatus;
        vm.avgScore;
        // submission fields
        vm.submissionID;
        vm.topicID;
        vm.topiccategoryID;
        vm.submissionTypeID;
        vm.submissionAbstract;
        vm.title;
        vm.status;
        vm.byAdmin;
        // evaluation-submission fields
        vm.evaluatiorSubmissionID;
        vm.evaluatorID;
        vm.statusEvaluation;
        // evaluation fields
        vm.evaluationsubmittedID;
        vm.evaluationName;
        vm.evaluationFile;
        vm.score;
        vm.avgScore;
        vm.publicFeedback;
        vm.privateFeedback;

        //functions
        vm.clear = _clear;
        vm.getAllSubmissions = _getAllSubmissions;
        vm.downloadPDFFile = _downloadPDFFile;
        vm.getSubmissionView = _getSubmissionView;
        vm.getEvaluationsForSubmission = _getEvaluationsForSubmission;
        vm.getEvaluationDetails = _getEvaluationDetails;
        vm.getAllEvaluators = _getAllEvaluators;
        vm.assignEvaluator = _assignEvaluator;
        vm.removeEvaluator = _removeEvaluator;
        vm.getSubmissionTypes = _getSubmissionTypes;
        vm.getTopics = _getTopics;
        vm.addAdminSubmission = _addAdminSubmission;
        vm.addDocument = _addDocument;
        vm.deleteDocument = _deleteDocument;
        vm.getTemplates = _getTemplates;
        vm.assignTemplate = _assignTemplate;
        vm.changeSubmissionStatus = _changeSubmissionStatus;
        vm.selectUser = _selectUser;
        vm.getListOfUsers = _getListOfUsers;
        vm.getDeletedSubmissions = _getDeletedSubmissions;
        vm.getDeletedSubmissionView = _getDeletedSubmissionView;

        // function calls
        _getAllSubmissions();
        _getSubmissionTypes();
        _getTopics();
        _getTemplates();
        _getDeletedSubmissions();


        // functions implementations

        /* Sets every field to a default value */
        function _clear() {
            // custom Submission class fields
            vm.submissionID = 0;
            vm.evaluatorID = 0;
            vm.topic = null;
            vm.userType = null;
            vm.submissionTypeID = 0;
            vm.submissionTypeName = "";
            vm.submissionTitle = "";
            vm.topiccategoryID = 0;
            vm.status = "";
            vm.isEvaluated = false;
            vm.isFinalSubmission = false;
            vm.finalSubmissionAllowed = false;
            vm.acceptanceStatus = "";
            vm.avgScore = 0;
            // submission fields
            vm.submissionID = 0;
            vm.topicID = 0;
            vm.topiccategoryID = 0;
            vm.submissionTypeID = 0;
            vm.submissionAbstract = "";
            vm.title = "";
            vm.status = "";
            vm.byAdmin = false;
            // evaluation-submission fields
            vm.evaluatiorSubmissionID = 0;
            vm.evaluatorID = 0;
            vm.statusEvaluation = "";
            // evaluation fields
            vm.evaluationsubmittedID = 0;
            vm.evaluationName = "";
            vm.evaluationFile = "";
            vm.score = 0;
            vm.avgScore = 0;
            vm.publicFeedback = "";
            vm.privateFeedback = "";
            vm.evaluatorFirstName = "";
            vm.evaluatorLastName = "";
            vm.evaluationsList = [];
            vm.prevEvaluationsList = [];
            vm.evaluatorsList = [];
            vm.documentsList = [];
            vm.selectedUser = '';
            vm.TEMP = null;
            // modal
            vm.modalsubmissionID = 0;
            vm.modaluserType = "";
            vm.modalsubmissionTitle = "";
            vm.modaltopic = "";
            vm.modaltopiccategoryID = 0;
            vm.modalsubmissionAbstract = "";
            vm.modalsubmissionFileList = [];
            vm.modalsubmissionTypeName = "";
            vm.modalsubmissionTypeID = 0;
            vm.modalpanelistNames = [];
            vm.modalplan = "";
            vm.modalguideQuestions = "";
            vm.modalformat = "";
            vm.modalequipment = "";
            vm.modalduration = "";
            vm.modaldelivery = "";
            vm.modalsubIsEvaluated = false;
            vm.modalpublicFeedback = "";
            vm.modalprivateFeedback = "";
            vm.CTYPE = vm.topicsList[0];
            vm.searchUser = null;
            vm.selectedUser = null;
            vm.selected = false;
            vm.documentsList = [];
            if (vm.myFile != undefined) {
                vm.myFile = undefined;
            }
        }

        /* Retrieves every submission in the system */
        function _getAllSubmissions() {
            restApi.getAllSubmissions().
                   success(function (data, status, headers, config) {
                       vm.submissionsList = data;
                       vm.submissionsList.forEach(function (sub, index) {
                           sub.acceptanceStatus = sub.status;
                       });
                   }).
                   error(function (data, status, headers, config) {
                       vm.submissionsList = data;
                   });
        }

        /* Download a file through the browser */
        function _downloadPDFFile(document) {
            window.open(document);
        }

        /* Set all fields with the submission information */
        function _getSubmissionView(submissionID) {
            restApi.getUserSubmission(submissionID).
                    success(function (data, status, headers, config) {
                        vm.submitterFirstName = data.submitterFirstName;
                        vm.submitterLastName = data.submitterLastName;
                        vm.submitterEmail = data.submitterEmail;
                        vm.submissionID = data.submissionID;
                        vm.userType = data.userType;
                        vm.submissionTitle = data.submissionTitle;
                        vm.topic = data.topic;
                        vm.topiccategoryID = data.topiccategoryID;
                        vm.submissionAbstract = data.submissionAbstract;
                        vm.submissionFileList = data.submissionFileList;
                        vm.submissionTypeName = data.submissionType;
                        vm.submissionTypeID = data.submissionTypeID;
                        vm.panelistNames = data.panelistNames;
                        vm.plan = data.plan;
                        vm.guideQuestions = data.guideQuestions;
                        vm.format = data.format;
                        vm.equipment = data.equipment;
                        vm.duration = data.duration;
                        vm.delivery = data.delivery;
                        vm.subIsEvaluated = data.subIsEvaluated;
                        vm.publicFeedback = data.publicFeedback;
                        vm.privateFeedback = data.privateFeedback;
                        //for previous submissions
                        vm.hasPrevVersion = data.hasPrevVersion;
                        vm.prevSubmissionID = data.prevSubmissionID;
                        vm.prevSubmissionTitle = data.prevSubmissionTitle;
                        vm.prevTopic = data.prevTopic;
                        vm.prevSubmissionAbstract = data.prevSubmissionAbstract;
                        vm.prevSubmissionFileList = data.prevSubmissionFileList;
                        vm.prevSubmissionType = data.prevSubmissionType;
                        vm.prevPanelistNames = data.prevPanelistNames;
                        vm.prevPlan = data.prevPlan;
                        vm.prevGuideQuestions = data.prevGuideQuestions;
                        vm.prevFormat = data.prevFormat;
                        vm.prevEquipment = data.prevEquipment;
                        vm.prevDuration = data.prevDuration;
                        vm.prevDelivery = data.prevDelivery;
                        vm.prevSubIsEvaluated = data.prevSubIsEvaluated;
                        vm.prevPublicFeedback = data.prevPublicFeedback;
                        vm.prevPrivateFeedback = data.prevPrivateFeedback;
                        //for modal
                        vm.modalsubmissionID = data.submissionID;
                        vm.modaluserType = data.userType;
                        vm.modalsubmissionTitle = data.submissionTitle;
                        vm.modaltopic = data.topic;
                        vm.modaltopiccategoryID = data.topiccategoryID;
                        vm.modalsubmissionAbstract = data.submissionAbstract;
                        vm.modalsubmissionFileList = data.submissionFileList;
                        vm.modalsubmissionTypeName = data.submissionType;
                        vm.modalsubmissionTypeID = data.submissionTypeID;
                        vm.modalpanelistNames = data.panelistNames;
                        vm.modalplan = data.plan;
                        vm.modalguideQuestions = data.guideQuestions;
                        vm.modalformat = data.format;
                        vm.modalequipment = data.equipment;
                        vm.modalduration = data.duration;
                        vm.modaldelivery = data.delivery;
                        vm.modalsubIsEvaluated = data.subIsEvaluated;
                        vm.modalpublicFeedback = data.publicFeedback;
                        vm.modalprivateFeedback = data.privateFeedback;
                        vm.documentsList = data.submissionFileList;
                        vm.deleted = false;

                        vm.topicsList.forEach(function (t, index) {
                            if (t.topiccategoryID == data.topiccategoryID)
                                vm.CTYPE = vm.topicsList[index];
                        });

                        vm.templatesList.forEach(function (tem, index) {
                            if (tem.templateID == data.templateID)
                                vm.TEMP = vm.templatesList[index];
                        });

                        _getEvaluationsForSubmission(submissionID);
                    }).
                   error(function (data, status, headers, config) {
                       vm.submissionsList = data;
                   });
        }

        /* Set all fields with the deleted submission information */
        function _getDeletedSubmissionView(submissionID) {
            restApi.getADeletedSubmission(submissionID).
                    success(function (data, status, headers, config) {
                        vm.submitterFirstName = data.submitterFirstName;
                        vm.submitterLastName = data.submitterLastName;
                        vm.submitterEmail = data.submitterEmail;
                        vm.submissionID = data.submissionID;
                        vm.userType = data.userType;
                        vm.submissionTitle = data.submissionTitle;
                        vm.topic = data.topic;
                        vm.topiccategoryID = data.topiccategoryID;
                        vm.submissionAbstract = data.submissionAbstract;
                        vm.submissionFileList = data.submissionFileList;
                        vm.submissionTypeName = data.submissionType;
                        vm.submissionTypeID = data.submissionTypeID;
                        vm.panelistNames = data.panelistNames;
                        vm.plan = data.plan;
                        vm.guideQuestions = data.guideQuestions;
                        vm.format = data.format;
                        vm.equipment = data.equipment;
                        vm.duration = data.duration;
                        vm.delivery = data.delivery;
                        vm.subIsEvaluated = data.subIsEvaluated;
                        vm.publicFeedback = data.publicFeedback;
                        vm.privateFeedback = data.privateFeedback;
                        //for previous submissions
                        vm.hasPrevVersion = data.hasPrevVersion;
                        vm.prevSubmissionID = data.prevSubmissionID;
                        vm.prevSubmissionTitle = data.prevSubmissionTitle;
                        vm.prevTopic = data.prevTopic;
                        vm.prevSubmissionAbstract = data.prevSubmissionAbstract;
                        vm.prevSubmissionFileList = data.prevSubmissionFileList;
                        vm.prevSubmissionType = data.prevSubmissionType;
                        vm.prevPanelistNames = data.prevPanelistNames;
                        vm.prevPlan = data.prevPlan;
                        vm.prevGuideQuestions = data.prevGuideQuestions;
                        vm.prevFormat = data.prevFormat;
                        vm.prevEquipment = data.prevEquipment;
                        vm.prevDuration = data.prevDuration;
                        vm.prevDelivery = data.prevDelivery;
                        vm.prevSubIsEvaluated = data.prevSubIsEvaluated;
                        vm.prevPublicFeedback = data.prevPublicFeedback;
                        vm.prevPrivateFeedback = data.prevPrivateFeedback;
                        //for modal
                        vm.modalsubmissionID = data.submissionID;
                        vm.modaluserType = data.userType;
                        vm.modalsubmissionTitle = data.submissionTitle;
                        vm.modaltopic = data.topic;
                        vm.modaltopiccategoryID = data.topiccategoryID;
                        vm.modalsubmissionAbstract = data.submissionAbstract;
                        vm.modalsubmissionFileList = data.submissionFileList;
                        vm.modalsubmissionTypeName = data.submissionType;
                        vm.modalsubmissionTypeID = data.submissionTypeID;
                        vm.modalpanelistNames = data.panelistNames;
                        vm.modalplan = data.plan;
                        vm.modalguideQuestions = data.guideQuestions;
                        vm.modalformat = data.format;
                        vm.modalequipment = data.equipment;
                        vm.modalduration = data.duration;
                        vm.modaldelivery = data.delivery;
                        vm.modalsubIsEvaluated = data.subIsEvaluated;
                        vm.modalpublicFeedback = data.publicFeedback;
                        vm.modalprivateFeedback = data.privateFeedback;
                        vm.documentsList = data.submissionFileList;
                        vm.deleted = true;

                        vm.TEMP = { templateID: data.templateID, templateName: data.templateName };

                        _getEvaluationsForSubmission(submissionID);
                    }).
                   error(function (data, status, headers, config) {
                       vm.submissionsList = data;
                   });
        }

        /* Get all evaluations of a single submission */
        function _getEvaluationsForSubmission(submissionID) {
            vm.evaluationsList = [];
            vm.prevEvaluationsList = [];
            restApi.getEvaluationsForSubmission(submissionID).
                  success(function (data, status, headers, config) {
                      data.forEach(function (eva, index) {
                          if (!eva.isPrevSub)
                              vm.evaluationsList.push(eva);
                          else
                              vm.prevEvaluationsList.push(eva);
                      });

                  }).
                  error(function (data, status, headers, config) {
                      vm.evaluationsList = data;
                  });
        }

        /* Get details of an evaluation */
        function _getEvaluationDetails(submissionID, evaluatorID) {
            var eva = { submissionID: submissionID, evaluatorID: evaluatorID };
            restApi.getEvaluationDetails(eva).
                  success(function (data, status, headers, config) {
                      vm.evaluationsubmittedID = data.evaluationsubmittedID;
                      vm.evaluationName = data.evaluationFileName;
                      vm.evaluationFile = data.evaluationFile;
                      vm.score = data.score;
                      vm.avgScore = data.avgScore;
                      vm.publicFeedback = data.publicFeedback;
                      vm.privateFeedback = data.privateFeedback;
                      vm.evaluatorFirstName = data.evaluatorFirstName;
                      vm.evaluatorLastName = data.evaluatorLastName;
                      vm.score = data.score;
                      vm.deleted = data.deleted;
                  }).
                  error(function (data, status, headers, config) {

                  });
        }

        /* Get list of evaluators */
        function _getAllEvaluators() {
            restApi.getAllEvaluators().
                  success(function (data, status, headers, config) {
                      vm.evaluatorsList = data;
                  }).
                  error(function (data, status, headers, config) {
                      vm.evaluatorsList = data;
                  });
        }

        /* Assign an evaluator to a submission */
        function _assignEvaluator(submissionID, evaluatorID) {
            var IDs = { submissionID: submissionID, evaluatorID: evaluatorID }

            vm.exists = false;
            vm.evaluationsList.forEach(function (eva, index) {
                if (eva.evaluatorID == evaluatorID) {
                    vm.exists = true;
                }
            });

            if (!vm.exists) {
                restApi.assignEvaluator(IDs).
                  success(function (data, status, headers, config) {
                      vm.evaluationsList.push(data);
                      vm.evaluatorID = "";
                  }).
                  error(function (data, status, headers, config) {

                  });                
            }


            
        }

        /* Remove an assigned evaluator from a submission */
        function _removeEvaluator(evaluatorSubmissionID) {
            restApi.removeEvaluator(evaluatorSubmissionID).
                  success(function (data, status, headers, config) {
                      vm.evaluationsList.forEach(function (eva, index) {
                          if (eva.evaluatorSubmissionID == data) {
                              vm.evaluationsList.splice(index, 1);
                          }
                      });
                  }).
                  error(function (data, status, headers, config) {

                  });
        }

        /* Assign a template to a submission */
        function _assignTemplate(submissionID, templateID) {
            var IDs = { submissionID: submissionID, templateID: templateID }
            restApi.assignTemplate(IDs).
                  success(function (data, status, headers, config) {
                      vm.saved = true;
                  }).
                  error(function (data, status, headers, config) {

                  });
        }

        /* Get Submission Types for Dropdown menu */
        function _getSubmissionTypes() {
            restApi.getSubmissionTypes().
                   success(function (data, status, headers, config) {
                       vm.submissionTypeList = data;
                       if (data != null)
                           vm.TYPE = vm.submissionTypeList[0];
                   }).
                   error(function (data, status, headers, config) {
                   });
        }

        /* Get Topics for Dropdown menu */
        function _getTopics() {
            restApi.getTopics()
            .success(function (data, status, headers, config) {
                vm.topicsList = data;
                if (data != null)
                    vm.CTYPE = vm.topicsList[0];
            })
           .error(function (data, status, headers, config) {

           });
        }

        /* Add a new Submission */
        function _addAdminSubmission(file) {
            if(vm.viewModal == 'add') {
                if (vm.TYPE.submissionTypeID == 1 || vm.TYPE.submissionTypeID == 2 || vm.TYPE.submissionTypeID == 4) {//if paper, poster o bof
                    var submission = {
                        submissionID: vm.modalsubmissionID,
                        userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.TYPE.submissionTypeID,
                        submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle
                    }
                }
                else if (vm.TYPE.submissionTypeID == 3) {//if pannel
                    var submission = {
                        submissionID: vm.modalsubmissionID,
                        userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.TYPE.submissionTypeID,
                        submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle, panelistNames: vm.modalpanelistNames,
                        plan: vm.modalplan, guideQuestion: vm.modalguideQuestions, formatDescription: vm.modalformat, necessaryEquipment: vm.modalequipment
                    }
                }
                else if (vm.TYPE.submissionTypeID == 5) {//if workshops
                    var submission = {
                        submissionID: vm.modalsubmissionID,
                        userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.TYPE.submissionTypeID,
                        submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle, plan: vm.modalplan, duration: vm.modalduration,
                        delivery: vm.modaldelivery, necessary_equipment: vm.modalequipment
                    }
                }
                if (vm.myFile != undefined) {
                    submission.document = vm.content;
                    submission.documentName = vm.myFile.name;
                    vm.myFile.name = "";
                }
                submission.documentssubmitteds = vm.documentsList;
                restApi.postAdminSubmission(submission)
                        .success(function (data, status, headers, config) {
                            vm.submissionsList.push(data);
                        })
                        .error(function (error) {

                        });
            }
            else if (vm.viewModal == 'edit') { //if updating submission
                if (vm.modalsubmissionTypeID == 1 || vm.modalsubmissionTypeID == 2 || vm.modalsubmissionTypeID == 4) {//if paper, poster o bof
                    var submission = {
                        submissionID: vm.modalsubmissionID,
                        userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.modalsubmissionTypeID,
                        submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle
                    }
                }
                else if (vm.modalsubmissionTypeID == 3) {//if pannel
                    var submission = {
                        submissionID: vm.modalsubmissionID,
                        userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.modalsubmissionTypeID,
                        submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle, panelistNames: vm.modalpanelistNames,
                        plan: vm.modalplan, guideQuestion: vm.modalguideQuestions, formatDescription: vm.modalformat, necessaryEquipment: vm.modalequipment
                    }
                }
                else if (vm.modalsubmissionTypeID == 5) {//if workshops
                    var submission = {
                        submissionID: vm.modalsubmissionID,
                        userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.modalsubmissionTypeID,
                        submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle, plan: vm.modalplan, duration: vm.modalduration,
                        delivery: vm.modaldelivery, necessary_equipment: vm.modalequipment
                    }
                }
                if (vm.myFile != undefined) {
                    submission.document = vm.content;
                    submission.documentName = vm.myFile.name;
                    vm.myFile.name = "";
                }
                submission.documentssubmitteds = vm.documentsList;
                restApi.editSubmission(submission)
                       .success(function (data, status, headers, config) {

                           vm.submissionID = vm.modalsubmissionID;
                           vm.userType = vm.modaluserType;
                           vm.submissionTitle = vm.modalsubmissionTitle;
                           vm.topic = vm.CTYPE.name;
                           vm.topiccategoryID = vm.modaltopiccategoryID;
                           vm.topicsList.forEach(function (t, index) {
                               if (t.topiccategoryID == vm.topiccategoryID)
                                   vm.CTYPE = vm.topicsList[index];
                           });
                           vm.submissionAbstract = vm.modalsubmissionAbstract;
                           vm.submissionFileList = vm.modalsubmissionFileList;
                           vm.submissionTypeName = vm.modalsubmissionType;
                           vm.submissionTypeID = vm.modalsubmissionTypeID;
                           vm.panelistNames = vm.modalpanelistNames;
                           vm.plan = vm.modalplan;
                           vm.guideQuestions = vm.modalguideQuestions;
                           vm.format = vm.modalformat;
                           vm.equipment = vm.modalequipment;
                           vm.duration = vm.modalduration;
                           vm.delivery = vm.modaldelivery;
                           vm.subIsEvaluated = vm.modalsubIsEvaluated;
                           vm.publicFeedback = vm.modalpublicFeedback;
                           vm.privateFeedback = vm.modalprivateFeedback;
                           vm.documentsList = data.submissionFileList;


                           vm.submissionsList.forEach(function (submission, index) {
                               if (submission.submissionID == vm.modalsubmissionID) {
                                   submission.submissionTitle = data.submissionTitle;
                               }                               
                           }
                       )
                       })
                       .error(function (error) {
                           
                       });                
            }
            else if (vm.viewModal == "final") {
                    if (vm.TYPE.submissionTypeID == 1 || vm.TYPE.submissionTypeID == 2 || vm.TYPE.submissionTypeID == 4) {//if paper, poster o bof
                        var submission = {
                            initialSubmissionID: vm.modalsubmissionID,
                            userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.TYPE.submissionTypeID,
                            submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle
                        }
                    }
                    else if (vm.TYPE.submissionTypeID == 3) {//if pannel
                        var submission = {
                            initialSubmissionID: vm.modalsubmissionID,
                            userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.TYPE.submissionTypeID,
                            submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle, panelistNames: vm.modalpanelistNames,
                            plan: vm.modalplan, guideQuestion: vm.modalguideQuestions, formatDescription: vm.modalformat, necessaryEquipment: vm.modalequipment
                        }
                    }
                    else if (vm.TYPE.submissionTypeID == 5) {//if workshops
                        var submission = {
                            initialSubmissionID: vm.modalsubmissionID,
                            userID: vm.selectedUser, topicID: vm.CTYPE.topiccategoryID, submissionTypeID: vm.TYPE.submissionTypeID,
                            submissionAbstract: vm.modalsubmissionAbstract, title: vm.modalsubmissionTitle, plan: vm.modalplan, duration: vm.modalduration,
                            delivery: vm.modaldelivery, necessary_equipment: vm.modalequipment
                        }
                    }
                    if (vm.myFile != undefined) {
                        submission.document = vm.content;
                        submission.documentName = vm.myFile.name;
                        vm.myFile.name = "";
                    }
                    submission.documentssubmitteds = vm.documentsList;
                    submission.byAdmin = true;
                    restApi.postAdminFinalSubmission(submission)
                            .success(function (data, status, headers, config) {
                                vm.submissionsList.push(data);
                                vm.submissionsList.forEach(function(submission, index){
                                    if(submission.submissionID == vm.modalsubmissionID){
                                        vm.submissionsList.splice(index, 1);
                                    }
                                })
                            })
                            .error(function (error) {
                                
                            });
            }
            $('#addSubmissionModal').modal('hide');
            
        }

        /**/
        function _addDocument() {
            vm.document = vm.content;
            vm.documentName = vm.myFile.name;
            vm.myFile = { document: vm.document, documentName: vm.documentName };

            vm.documentsList.push(vm.myFile);
        }

        /**/
        function _deleteDocument(document) {
            vm.documentsList.forEach(function (doc, index) {
                if (doc.documentName == document.documentName) {
                    vm.documentsList.splice(index, 1);
                }
            });
        }

        /**/
        function _getTemplates() {
            restApi.getTemplatesAdmin().
                   success(function (data, status, headers, config) {
                       vm.templatesList = data;
                   }).
                   error(function (data, status, headers, config) {
                       vm.templatesList = data;
                       _clear();
                   });
        }

        /**/
        function _changeSubmissionStatus(submissionID, status) {
            var obj = { status: status, submissionID: submissionID };
            restApi.changeSubmissionStatus(obj).
                   success(function (data, status, headers, config) {
                       vm.alert;
                       (data.changedAcceptanceStatus) ?
                        vm.alert = "Submission Accepted. This person has been accepted to attend the conference." :
                        vm.alert = "Submission " + data.status + ".";

                       $('#statusChanged').modal('show');
                   }).
                   error(function (data, status, headers, config) {
                   });
        }

        /**/
        function _selectUser(user){
            vm.searchUser = user.firstName + ' ' + user.lastName;
            vm.selectedUser = user.userID;
        }

        function _getListOfUsers() {
            restApi.getListOfUsers().
                   success(function (data, status, headers, config) {
                       vm.usersList = data;
                   }).
                   error(function (data, status, headers, config) {
                       vm.usersList = data;
                   });
        }

        function _getDeletedSubmissions() {
            restApi.getDeletedSubmissions().
                   success(function (data, status, headers, config) {
                       vm.deletedSubmissionsList = data;
                   }).
                   error(function (data, status, headers, config) {
                       vm.deletedSubmissionsList = data;
                   });
        }

    }
})();
