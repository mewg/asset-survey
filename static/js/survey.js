/**
 * @file survey.js
 * @author Brett Lempereur
 *
 * Client-side application that controls the asset inventory survey.
 */

// Create the survey application.
app = angular.module("surveyApp", ["ui.select"]);

// Get the HTTP variable reference.
var $http = angular.injector(['ng']).get('$http');

// Create the survey controller that will manage data binding and result
// submission for the majority of the application.
app.controller("surveyController", ["$scope", "$http", function($scope, $http) {

    // User identification. 
    $scope.name = "";
    $scope.email = "";
    $scope.faculty = "";

    // Asset inventory.
    $scope.inventory = [];

    // Survey status.
    $scope.submitted = false;
    $scope.error = false;

    // Upload the survey response to the data collection server.
    $scope.upload = function() {
        $http.post("/submit", {
            name: $scope.name,
            email: $scope.email,
            faculty: $scope.faculty,
            inventory: $scope.inventory
        }).success(function(data, status, headers, config) {
            $scope.error = false;
            $scope.submitted = true;
        }).error(function(data, status, headers, config) {
            $scope.error = true;
        });
    }

}]);

// Create the asset controller that manages asset data entry and updates and
// maintains an inventory list.
app.controller("assetController", ["$scope", "$http", function($scope, $http) {

    // Asset object populated with default parameters.
    $scope.asset = {
        "item": null,
        "quantity": 1,
        "location": null,
        "staff": "Unsupervised in location",
        "student": "Unsupervised in location"
    };

    // Populate the list of pre-defined assets.
    $scope.equipment = [
        {"category": "Electronics", "item": "Arduino"},
        {"category": "Electronics", "item": "LilyPad"},
        {"category": "Electronics", "item": "Soldering Iron"},
        {"category": "Electronics", "item": "Soldering Tips"},
        {"category": "Electronics", "item": "Crimper Tool"},
        {"category": "Electronics", "item": "Wire Cutter"},
        {"category": "Electronics", "item": "Wire Stripper"},
        {"category": "Electronics", "item": "Diagonal Cutter"},
        {"category": "Electronics", "item": "Solder Sucker"},
        {"category": "Electronics", "item": "Digital Multimeter"},
        {"category": "Electronics", "item": "Solder Tip Tinner"},
        {"category": "Electronics", "item": "Breadboard"},
        {"category": "Electronics", "item": "Third Hand"},
        {"category": "Electronics", "item": "Tweezers"},
        {"category": "Electronics", "item": "Solder"},
        {"category": "Electronics", "item": "Heat Gun"},
        {"category": "Mechanical", "item": "PVC Pipe Cutter"},
        {"category": "Mechanical", "item": "Allen (SAE + Metric)"},
        {"category": "Mechanical", "item": "Claw Hammer"},
        {"category": "Mechanical", "item": "Combination Wrench"},
        {"category": "Mechanical", "item": "Combination Wrench Ratchet Set"},
        {"category": "Mechanical", "item": "Driver Bits"},
        {"category": "Mechanical", "item": "Hollow-Shaft Nut Drivers"},
        {"category": "Mechanical", "item": "Joint Pliers (Channel Locks)"},
        {"category": "Mechanical", "item": "Mallet"},
        {"category": "Mechanical", "item": "Miter Box"},
        {"category": "Mechanical", "item": "Ratchet Set"},
        {"category": "Mechanical", "item": "Screwdriver Set (Big)"},
        {"category": "Mechanical", "item": "Screwdriver Set (Precision)"},
        {"category": "Mechanical", "item": "Socket Set"},
        {"category": "Mechanical", "item": "Tap And Die (SAE + Metric)"},    
        {"category": "Batteries and Power", "item": "AA NiMH And Charger"},
        {"category": "Batteries and Power", "item": "AA NiMH"},
        {"category": "Batteries and Power", "item": "9V Battery Clip"},
        {"category": "Batteries and Power", "item": "4 AA Battery Holder"},
        {"category": "Batteries and Power", "item": "3 AA Battery Holder"},
        {"category": "Batteries and Power", "item": "2 AA Battery Holder"},
        {"category": "Batteries and Power", "item": "Alligator Clips"},
        {"category": "Extension", "item": "3D Printer"},
        {"category": "Extension", "item": "CNC Mill"},
        {"category": "Extension", "item": "Laser Cutter"},
        {"category": "Extension", "item": "Circular Saw"},
        {"category": "Extension", "item": "Orbital Sander"},
        {"category": "Extension", "item": "Table Saw"},
        {"category": "Extension", "item": "Hot Wire Foam Cutter"},
        {"category": "Extension", "item": "Plastic Bender"}
    ];

    // Populate the list of pre-defined locations.
    $scope.locations = [
        {"site": "City", "building": "Avril Robarts Library"},
        {"site": "City", "building": "Cherie Booth Building"},
        {"site": "City", "building": "Henry Cotton Building"},
        {"site": "City", "building": "James Parsons Building"},
        {"site": "City", "building": "Kingsway House"},
        {"site": "City", "building": "Liverpool Cathedral"},
        {"site": "City", "building": "LJMU Tower"},
        {"site": "City", "building": "Max Perutz Building"},
        {"site": "City", "building": "No 62 Great Crosshall Street"},
        {"site": "City", "building": "No 70 Great Crosshall St"},
        {"site": "City", "building": "Peter Jost Enterprise Centre"},
        {"site": "City", "building": "Tithebarn Building"},
        {"site": "City", "building": "Tom Reilly Building"},
        {"site": "Mount Pleasant", "building": "Aldham Robarts Library"},
        {"site": "Mount Pleasant", "building": "Aquinas Building"},
        {"site": "Mount Pleasant", "building": "Dean Walters Building"},
        {"site": "Mount Pleasant", "building": "Haigh Building"},
        {"site": "Mount Pleasant", "building": "IC1 Liverpool Science Park"},
        {"site": "Mount Pleasant", "building": "IC2 Liverpool Science Park"},
        {"site": "Mount Pleasant", "building": "Joe H Makin Drama Centre"},
        {"site": "Mount Pleasant", "building": "John Foster Building"},
        {"site": "Mount Pleasant", "building": "Occupational Health Unit"},
        {"site": "Mount Pleasant", "building": "Redmonds Building"},
        {"site": "Mount Pleasant", "building": "The John Lennon Art and Design Building"},
        {"site": "IM Marsh", "building": "IM Marsh"},
        {"site": "IM Marsh", "building": "IM Marsh, CETL"},
        {"site": "IM Marsh", "building": "IM Marsh, Holmefield House"},
        {"site": "IM Marsh", "building": "IM Marsh, Library & Science Block"},
        {"site": "IM Marsh", "building": "IM Marsh, North Building"},
        {"site": "IM Marsh", "building": "IM Marsh, Sports Centre"},
        {"site": "IM Marsh", "building": "IM Marsh, Sudley Building"},
        {"site": "Lairdside", "building": "Lairdside Maritime Centre"},
        {"site": "Other", "building": "Liverpool Innovation Park"}
    ];

    // Add the asset being edited to an inventory.
    $scope.addAsset = function(inventory) {
        var building = $scope.asset.location;
        var staff = $scope.asset.staff;
        var student = $scope.asset.student;

        inventory.push($scope.asset);
        $scope.asset = {
            "item": null,
            "quantity": 1,
            "location": building,
            "staff": staff,
            "student": student
        };
    }

    // Remove an asset from an inventory.
    $scope.removeAsset = function(inventory, asset) {
        inventory.splice(inventory.indexOf(asset), 1);
    }

}]);

// Create the standard property-based filter for the auto-completing selection
// inputs.
app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

