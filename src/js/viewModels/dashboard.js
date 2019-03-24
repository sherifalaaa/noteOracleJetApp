/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojarraytabledatasource'
       , 'ojs/ojinputtext', 'ojs/ojcheckboxset', 'ojs/ojlabelvalue', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojmodel', 'ojs/ojcollectiontabledatasource'
       ],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      
      
      
      self.id = ko.observable();
      self.title = ko.observable();
      self.max = ko.observable();
      self.min = ko.observable();
      self.somethingChecked = ko.observable(false);
      self.workingId = ko.observable('');
      self.currentEmpDept = ko.observable();
      self.currentMinSal = ko.observable();
      self.currentMaxSal = ko.observable();
      self.selectedIndex = ko.observable();
      self.data=ko.observableArray();
      self.selectedRowKey = ko.observable();
      self.currentEmpDept = ko.observable();
      self.currentMinSal = ko.observable();
      self.currentMaxSal = ko.observable();
      self.current = ko.observable();
      self.selectedItems = ko.observable([]);
      
      self.columnArray = [{"headerText": "ID","field": "id"},
                          {"headerText": "Job Title","field": "jobtitle"},
                          {"headerText": "Max Salary","field": "maxsalary"},
                          {"headerText": "Min Salary","field": "minsalary"}]; 
      
                function getdata() {
                    $.getJSON("http://localhost:8081/webservice/webapi/hremployees/").
                            then(function (data) {

                                $.each(data, function (index) {

                                    self.data.push({

                                        id: data[index].id,
                                        jobtitle: data[index].jobtitle,
                                        maxsalary: data[index].maxSalary,
                                        minsalary: data[index].minSalary

                                    });

                                });
                            });
                }

                getdata();

                self.datasource = new oj.ArrayTableDataSource(self.data);

                self.buttonClick = function () {
                    var payload = {
                        "id": self.id(),
                        "jobtitle": self.title(),
                        "maxSalary": self.max(),
                        "minSalary": self.min()
                    };
                    $.ajax({
                        type: "POST",
                        headers: "",
                        url: "http://localhost:8081/webservice/webapi/hremployees",
                        contentType: "application/json",
                        data: JSON.stringify(payload),

                        success: function (data) {
                            self.data([]);
                            getdata();
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log("failed");

                        }
                    });
                };
                
                self.updateDeptName = function () {

                    if (self.currentEmpDept() != self.current()[1])
                    {
                        var serviceUrl = 'http://localhost:8081/webservice/webapi/hremployees/' + self.current()[0];
                        var payload = {
                            "id": self.current()[0],
                            "jobtitle": self.currentEmpDept(),
                            "maxSalary": self.currentMinSal(),
                            "minSalary": self.currentMaxSal()
                        };
                        $.ajax({
                            type: "PUT",
                            headers: "",
                            url: serviceUrl,
                            contentType: "application/json",
                            data: JSON.stringify(payload),

                            success: function (data) {
                                document.getElementById("modalDialog1").close();
                                self.data([]);
                                getdata();
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log("failed");

                            }
                        });
                    } else
                    {
                        alert('Department Name is not different or the new name is not valid');
                        document.getElementById("modalDialog1").close();
                    }

                };

                self.cancelDialog = function () {
                    document.getElementById("modalDialog1").close();
                    console.log(self.current()[0]);
                    return true;
                };

                self.tableSelectionListener = function (event) {
                    var data = event.detail;
                    var currentRow = data.currentRow;

                    self.selectedRowKey(currentRow['rowKey']);
                    self.selectedIndex(currentRow['rowIndex']);

                    self.current(currentRow['rowKey']);


                    console.log(currentRow[0]);
                    console.log(self.selectedIndex());
                    console.log(self.selectedRowKey()[1]);

                    self.currentEmpDept(self.selectedRowKey()[1]);
                    self.currentMinSal(self.selectedRowKey()[2]);
                    self.currentMaxSal(self.selectedRowKey()[3]);


                       
                    document.getElementById("modalDialog1").open();
                };

                self.checkboxListener = function (){

                };
                
                self.handleCheckbox = function (id){
                    
                      
                };
                
                self.getIndexInSelectedItems = function(id){
                 };
                 
                
                self.deleteDeptName = function ()
                {
                    var serviceUrl = 'http://localhost:8081/webservice/webapi/hremployees/del';
                      
                      var payload = {
                            "id": self.current()[0]
                            
                        };
                      
                        $.ajax({
                            type: "DELETE",
                            headers: '',
                            async :false,
                            url: serviceUrl,
                            data: payload,
                       

                            success: function () {
                                
                                
                                
                                document.getElementById("modalDialog1").close();
                                alert("message removed");
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log("failed");
                             

                            }
                        });
                };

                self.enableDelete = function (event) {
                    self.somethingChecked(event && event.target && event.target.value && event.target.value.length);
                };
                
             
              
              
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
