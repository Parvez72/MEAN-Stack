angular.module('contactList',[]).controller('contactListController',function ($scope,$http) {
    $scope.includePage="/static/contactList.html";


    //calling create contact page
    function callPage(choice) {
        if(choice==1){
            $scope.includePage="/static/contactList.html";
            $scope.searchBoxShow=false;
            refresh();
        }
        else {
            $scope.includePage="/static/createContact.html";
            $scope.searchBoxShow=true;
        }
    }

    $scope.callPage=callPage;

   //defining refresh function
    function refresh() {
       $http.get('/getContacts').then(function (value) {
           console.log(value);
           $scope.contacts = value.data;
       });
   }
   //calling refresh
    if($scope.includePage=="/static/contactList.html"){
        refresh();
    }


    //function to delete the contact
   $scope.deleteContact=function (id) {
     console.log(id);
     $http.get('/deleteContact/'+id).then(function (value) {
        console.log("After Deletion of the contact "+value);
        refresh();
     });
   };

    $scope.con={};
    //create new contact
    $scope.createContact=function () {
        console.log($scope.con);
        $http.post('/createContact',$scope.con).then(function (value) {
           console.log(value.data);
           $scope.con={};
           callPage(1);
        });
    }

});