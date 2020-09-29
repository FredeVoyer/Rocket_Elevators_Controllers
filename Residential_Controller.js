//JS code for residential building elevators controller (controller algorithm)

// Initiate the scenario in the documentation
/*var column_amount = 1;
var elevator_amount = 2;
var floor_amount = 10;*/

// definition of the class Column
var Column = function(id, status) {   
    this.ID= id;
    this.Status= status;
    this.ElevatorList = [];
    this.UpButtonList= [];
    this.DownButtonList= [];

    this.UpButtonFloorList= [];
    this.DownButtonFloorList= [];
   
    this.FloorUpRequestList= [];
    this.FloorDownRequestList= [];
    // send back a reference to this newly created column object to the loop
    return this;
};
     
Column.prototype.AddFloorRequestList = function(FloorUpRequestList, FloorDownRequestList, buttonDirection, floorRequested) {
    if (buttonDirection === "up") {
        // verify if floor requested already in the FloorUpRequestList before adding to the list
        var addToList = true;
        var FloorUpRequest;
        FOR (FloorUpRequest IN FloorUpRequestList) {
            if (floorRequested === FloorUpRequest) {
                addToList = false;
                BREAK;
            }
        }
        if (addToList === true) { //or floorRequested is not in FloorUpRequestList THEN
            // ADD floorRequested TO FloorUpRequestList
            FloorUpRequestList.push(floorRequested);
            //SORT ascending order FloorUpRequestList
            FloorUpRequestList.sort(function(a,b){return a-b});
        }
    }    
    else if (buttonDirection === "down") {
        // verify if floor requested already in the FloorDownRequestList before adding to the list
        addToList = true;
        var FloorDownRequest;
        FOR (FloorDownRequest IN FloorDownRequestList) {
            if (floorRequested === FloorDownRequest) {
                SET addToList to false;
                //EXIT FOR 
                BREAK;
            } 
        }
        if (addToList === true) { //or floorRequested is not in FloorDownRequestList THEN
            //ADD floorRequested TO FloorDownRequestList
            FloorDownRequestList.push(floorRequested);
            //SORT descending order FloorDownRequestList
            FloorDownRequestList.sort(function(a,b){return b-a});
        } 
    }
}

Column.prototype.RemoveFloorRequestList = function(FloorUpRequestList, FloorDownRequestList, buttonDirection, floorRequested) {
    if (buttonDirection === "up") {
        var FloorUpRequest;
        //REMOVE FloorUpRequest FROM FloorUpRequestList if it's in the list
        FOR (FloorUpRequest IN FloorUpRequestList) {
            if (floorRequested === FloorUpRequest) {
                FloorUpRequestList.shift();
                /*SORT descending order FloorUpRequestList
                FloorUpRequestList.sort(function(a,b){return b-a});
                FloorUpRequestList.pop();
                //SORT ascending order FloorUpRequestList
                FloorUpRequestList.sort(function(a,b){return a-b});*/
            }
        }
    }
    else if (buttonDirection === "down") {
        var FloorDownRequest;
        //REMOVE FloorDownRequest FROM FloorDownRequestList if it'S in the list
        FOR (FloorDownRequest IN FloorDownRequestList) {
            if (floorRequested === FloorDownRequest) {
                FloorDownRequestList.shift();
                /*SORT ascending order FloorUpRequestList
                FloorDownRequestList.sort(function(a,b){return a-b});
                FloorDownRequestList.pop();
                //SORT descending order FloorUpRequestList
                FloorDownRequestList.sort(function(a,b){return b-a});*/
            }
        }
    }

}

Column.prototype.FindElevator  = function(ElevatorList, ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, FloorUpRequestList, FloorDownRequestList, buttonDirection, FloorDownRequest) {
    var ElevatorSelected = null;
    // case FloorUpRequestList
    var ElevatorUpSelected = null;
        // minFloorUpRequested to first item of FloorUpRequestList
    var minFloorUpRequested = FloorUpRequestList[0];
        // maxFloorUpRequested to last item of FloorUpRequestList
    var maxFloorUpRequested = FloorUpRequestList[FloorUpRequestList.length - 1];
        // select first elevator moving, refine with closest one or one that can do all the list
    var Elevator;
            // Identify potential elevators moving up and create list
    var potentialElevatorsList=[]; 
    FOR (Elevator IN ElevatorList) {
        if (ElevatorDirection === "up" && ElevatorFloor <= maxFloorUpRequested) {
            potentialElevators.push(Elevator);
        }
    }
            // COMPUTE distance between the Elevator and maxFloorUpRequested to select the closest
    var potentialElevator;
    var distance=[];
    var i=0;
    FOR (potentialElevator IN potentialElevatorsList) {
        distance[i] = Math.abs(ElevatorFloor - maxFloorUpRequested);
        i++;
    }
            // Identify the smallest distance
    //SORT ascending order distance
    distance.sort(function(a,b){return a-b});
    var minDistance = distance[0];
            // Identify closest elevator moving up
    FOR (potentialElevator IN potentialElevatorsList) {
        if (Math.abs(ElevatorFloor - maxFloorUpRequested) === minDistance) {
            ElevatorUpSelected = potentialElevator;
            break; // select only one elevator
        }
    }
    /* add floor reuqest(s) to selected elevator and remove it from columnList
    var FloorUpRequest;
    FOR (Elevator IN ElevatorList) {
        if (Elevator === ElevatorUpSelected) {
            FOR (FloorUpRequest IN FloorUpRequestList) {
                if (FloorUpRequest >= ElevatorFloor) {
                    CALL elevatorAddFloorRequestList with ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
                    CALL columnRemoveFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND FloorUpRequest
                    BREAK;  // EXIT FOR to avoid picking more than one elevator at the same distance from floor requested
                }
            }
        }  
    }*/

        // select lastly elevator not moving (idle and with no destination) and the closest to clear (empty) FloorUpRequestList
    if (ElevatorUpSelected === null) {
        // Identify potential elevators idle to moving up and create list
        potentialElevatorsList=[]; 
        FOR (Elevator IN ElevatorList) {
            if (ElevatorDirection === "idle" && ElevatorDestination === null) {
                potentialElevators.push(Elevator);
            }
        }
                // COMPUTE distance between the Elevator and maxFloorUpRequested to select the closest
        //potentialElevator;
        distance=[];
        i=0;
        FOR (potentialElevator IN potentialElevatorsList) {
            distance[i] = Math.abs(ElevatorFloor - minFloorUpRequested);
            i++;
        }
                // Identify the smallest distance
        //SORT ascending order distance
        distance.sort(function(a,b){return a-b});
        minDistance = distance[0];
                // Identify closest elevator idle
        FOR (potentialElevator IN potentialElevatorsList) {
            if (Math.abs(ElevatorFloor - minFloorUpRequested) === minDistance) {
                ElevatorUpSelected = potentialElevator;
                buttonDirection = "up";
                break; // select only one elevator
            }
        }
    }

    // case FloorDownRequestList
    var ElevatorDownpSelected = null;
    // minFloorUpRequested to first item of FloorUpRequestList
    var minFloorDownRequested = FloorDownRequestList[0];
    // maxFloorUpRequested to last item of FloorUpRequestList
    var maxFloorDownRequested = FloorDownRequestList[FloorDownRequestList.length - 1];
    // select first elevator moving, refine with closest one or one that can do all the list
    //var Elevator;
        // Identify potential elevators moving up and create list
    potentialElevatorsList=[]; 
    FOR (Elevator IN ElevatorList) {
        if (ElevatorDirection === "down" && ElevatorFloor >= minFloorDownRequested) {
            potentialElevators.push(Elevator);
        }
    }
        // COMPUTE distance between the Elevator and maxFloorUpRequested to select the closest
    potentialElevator=[];
    distance=[];
    i=0;
    FOR (potentialElevator IN potentialElevatorsList) {
        distance[i] = Math.abs(ElevatorFloor - minFloorDownRequested);
        i++;
    }
        // Identify the smallest distance
    //SORT ascending order distance
    distance.sort(function(a,b){return a-b});
    minDistance = distance[0];
        // Identify closest elevator moving up
    FOR (potentialElevator IN potentialElevatorsList) {
        if (Math.abs(ElevatorFloor - minFloorDownRequested) === minDistance) {
            ElevatorDownSelected = potentialElevator;
            break; // select only one elevator
        }
    }
  
    // select lastly elevator not moving (idle and with no destination) and the closest to clear (empty) FloorDownRequestList
    if (ElevatorDownSelected === null) {
        // Identify potential elevators idle to moving up and create list
        potentialElevatorsList=[]; 
        FOR (Elevator IN ElevatorList) {
            if (ElevatorDirection === "idle" && ElevatorDestination === null) {
                potentialElevators.push(Elevator);
            }
        }
                // COMPUTE distance between the Elevator and maxFloorUpRequested to select the closest
        //potentialElevator;
        distance=[];
        i=0;
        FOR (potentialElevator IN potentialElevatorsList) {
            distance[i] = Math.abs(ElevatorFloor - minFloorDownRequested);
            i++;
        }
                // Identify the smallest distance
        //SORT ascending order distance
        distance.sort(function(a,b){return a-b});
        minDistance = distance[0];
                // Identify closest elevator idle
        FOR (potentialElevator IN potentialElevatorsList) {
            if (Math.abs(ElevatorFloor - minFloorDownRequested) === minDistance) {
                ElevatorDownSelected = potentialElevator;
                buttonDirection = "down";
                break; // select only one elevator
            }
        }
    }

    // Return selected elevator (if there is one)
    if (ElevatorUpSelected !== null) {
        ElevatorSelected = ElevatorUpSelected;
    }
    else if (ElevatorDownSelected !== null) {
        ElevatorSelected = ElevatorDownSelected;
    }
    return ElevatorSelected;
}

// definition of the class Elevator
var Elevator = function(origin, floor, destination, doorOpen, doorClosed, direction, id, status) {
    this.ID = id;
    this.Status= status; // online, offline
    this.Direction = direction; // null (idle not moving if destination is null else moving), up, down (moving for both)
    this.DoorOpen = doorOpen; // bool true false
    this.DoorClosed = doorClosed; // bool true false
    this.Floor= floor; // floor domain (1,...,10)
    this.Destination = destination; // floor domain (1,...,10) and null if Direction to null (idle, not moving; else moving)
    this.Origin = origin; // floor domain (1,...,10)
    this.MaxWeight = 2500; // pounds'
    this.FloorButtonList= [];
    this.FloorButtonFloorList= [];
    this.ButtonFloorRequestedList= [];
    this.FloorRequestList= [];
    this.FloorUpRequestList= [];
    this.FloorDownRequestList= [];
    // send back a reference to this newly created column object to the loop
    return this;
};

Elevator.prototype.AddFloorRequestList = function(ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection, floorRequested) {
    var addToList = true;
    // case NOT MOVING:ElevatorFloorUpRequestList, ElevatorFloorDownRequestList are empty before the call
    if (ElevatorDirection === "idle" && ElevatorDestination === null) THEN
        if (buttonDirection === "up") {
            // verify if floor requested already in the ElevatorFloorUpRequestList before adding to the list
            var ElevatorFloorUpRequest;
            FOR (ElevatorFloorUpRequest IN ElevatorFloorUpRequestList) {
                if floorRequested === ElevatorFloorUpRequest {
                    addToList = false;
                    BREAK;                   
                }
            }
            if (addToList === true) { //or floorRequested is not in ElevatorFloorUpRequestList THEN
                //ADD floorRequested TO ElevatorFloorUpRequestList
                ElevatorFloorUpRequestList.push(floorRequested);
                //SORT ascending order ElevatorFloorUpRequestList
                ElevatorFloorUpRequestList.sort(function(a,b){return a-b});
            } 
        }
        else if buttonDirection === "down" {
            // verify if floor requested already in the ElevatorFloorDownRequestList before adding to the list
            var ElevatorFloorDownRequest;
            FOR (ElevatorFloorDownRequest IN ElevatorFloorDownRequestList) {
                if floorRequested === ElevatorFloorDownRequest {
                    addToList = false;
                    BREAK;                   
                }
            }
            if (addToList === true) { //or floorRequested is not in ElevatorFloorDownRequestList 
                //ADD floorRequested TO ElevatorFloorDownRequestList
                ElevatorFloorDownRequestList.push(floorRequested);
                //SORT descending order ElevatorFloorDownRequestList
                ElevatorFloorDownRequestList.sort(function(a,b){return b-a});
            } 
        }
    //case moving '
    else {
        if (floorRequested > ElevatorFloor) {
            // verify if floor requested already in the ElevatorFloorUpRequestList before adding to the list
            var ElevatorFloorUpRequest;
            FOR (ElevatorFloorUpRequest IN ElevatorFloorUpRequestList) {
                if (floorRequested === ElevatorFloorUpRequest) {
                    addToList = false;
                    BREAK;
                } 
            }
            if (addToList === true) {
                //or floorRequested is not in ElevatorFloorUpRequestList 
                //ADD floorRequested TO ElevatorFloorUpRequestList
                ElevatorFloorUpRequestList.push(floorRequested);
                //SORT ascending order ElevatorFloorUpRequestList
                ElevatorFloorUpRequestList.sort(function(a,b){return a-b});

            } 
        }
        else if (floorRequested < ElevatorFloor) {
            // verify if floor requested already in the ElevatorFloorDownRequestList before adding to the list
            FOR EACH ElevatorFloorDownRequest IN ElevatorFloorDownRequestList
            FOR (ElevatorFloorDownRequest IN ElevatorFloorDownRequestList) {
                if (floorRequested === ElevatorFloorDownRequest) {
                    addToList = false;
                    BREAK;
                } 
            }
            if (addToList === true) { //or floorRequested is not in ElevatorFloorDownRequestList 
                //ADD floorRequested TO ElevatorFloorDownRequestList
                ElevatorFloorDownRequestList.push(floorRequested);
                //SORT descending order ElevatorFloorDownRequestList
                ElevatorFloorDownRequestList.sort(function(a,b){return b-a});
            }
        } 
        // not sure necessary case to treat (do something) or treated below
        //else if floorRequested is equal to ElevatorFloor THEN
        //endif
    }
}

Elevator.prototype.RemoveFloorRequestList = function(ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection, floorRequested) {
    if (buttonDirection === "up") {
        var ElevatorFloorUpRequest;
        FOR (ElevatorFloorUpRequest IN ElevatorFloorUpRequestList) {
            if (floorRequested === ElevatorFloorUpRequest) {
                //REMOVE ElevatorFloorUpRequest FROM ElevatorFloorUpRequestList
                ElevatorFloorUpRequestList.shift();
            }
        }
    }
    else if (buttonDirection === "down") {
        var ElevatorFloorDownRequest;
        FOR (ElevatorFloorDownRequest IN ElevatorFloorDownRequestList) {
            if (floorRequested === ElevatorFloorDownRequest) {
                //REMOVE ElevatorFloorDownRequest FROM ElevatorFloorDownRequestList
                ElevatorFloorDownRequestList.shift();
            }
        }
    }
}

/*   'verify done lower'
    SEQUENCE updateElevatorDirection USING ElevatorFloor ElevatorDestination
        IF ElevatorFloor is higher than ElevatorDestination THEN
            SET ElevatorDirection TO down
        else IF ElevatorFloor is lower than ElevatorDestination THEN
            SET ElevatorDirection TO up 
        endif 
    ENDSEQUENCE

    SEQUENCE updateElevatorFloor USING ElevatorFloor ElevatorDestination
        IF ElevatorFloor is higher than ElevatorDestination THEN
            DECREMENT ElevatorFloor
        else IF ElevatorFloor is lower than ElevatorDestination THEN
            INCREMENT ElevatorFloor
        endif 
    ENDSEQUENCE

    SEQUENCE updateElevatorDestination USING ElevatorDirection, ElevatorFloorDownRequestList AND ElevatorFloorUpRequestList
        IF ElevatorDirection is up AND ElevatorFloorUpRequestList is not empty THEN
            SET ElevatorDestination TO first item of ElevatorFloorUpRequestList
        else IF ElevatorDirection is down AND ElevatorFloorDownRequestList is not empty THEN
            SET ElevatorDestination TO first item of ElevatorFloorDownRequestList
        endif 
    ENDSEQUENCE

    SEQUENCE updateDoor USING 
    ENDSEQUENCE

    SEQUENCE updateOrigin USING 
    ENDSEQUENCE

ENDDEFINE */

// definition of the class Button (related to floor and column, light on if pressed, light off if command resolved or default)
var Button = function(floor, direction, id, status) {
    this.ID = id;
    this.Status = status; // pressed, notPressed
    this.Floor = floor; 
    this.Light = "off";
    this.Direction = direction; // up, down
};

var UpButton = function(floor, direction, id, status) {
    this.ID = id;
    this.Status = status; // pressed, notPressed
    this.Floor = floor; 
    this.Light = "off";
    this.Direction = "up"; // up, down
    // send back a reference to this newly created column object to the loop
    return this;
};

var DownButton = function(floor, direction, id, status) {
    this.ID = id;
    this.Status = status; // pressed, notPressed
    this.Floor = floor; 
    this.Light = "off";
    this.Direction = "down"; // up, down
    // send back a reference to this newly created column object to the loop
    return this;
};

var FloorButton = function(floorRequested, id, status) {
    this.ID= id;
    this.Status= status; // pressed, notPressed
    this.FloorRequested= floorRequested;
    this.Light = "off";
    this.Direction = direction; // up, down
    // send back a reference to this newly created column object to the loop
    return this;
};
/*
DEFINE OpenDoorButton USING id AND status
    ID: id,
    Status: status, '// pressed, notPressed
ENDDEFINE
DEFINE CloseDoorButton USING id AND status
    ID: id,
    Status: status, '//' pressed, notPressed
ENDDEFINE 
*/
var Door = function(floorRequested, id, status) {
    this.ID= id;
    this.Status= "closed"; //' open, closed
    // send back a reference to this newly created column object to the loop
    return this;
};

 var Door.prototype.openDoor = function() {
    //OPEN the door
    this.Status = "open";
}
var Door.prototype.closeDoor = function() {
    //Close the door
    this.Status = "closed";
}
   

//SEQUENCE initialize *******************************************************************************************************************

// Initiate the scenario in the documentation
var column_amount = 1;
var elevator_amount = 2;
var floor_amount = 10;

// Create column objects
/*FOR (i= 1 TO column_amount);
    SET columni TO INSTANTIATE Column WITH i, online
ENDFOR */

// create an array of column object references
var columnObjectReferences = [];
for (var i=1; i<=column_amount; i++){
    // building 1 (column_amount) column objects here, with ids of: column-1, yt-column-2, etc.
    // build a selector to reference them via id, not by class with a dot as you have in your question
    var sel = String("#column-" + i);
    // create the object and store a reference to the column object so you can do something with it later
    var newColumn = new ColumnObject($(sel), i);
    // build list of references
    columnObjectReferences.push(newColumn);
}

var Column;
FOR (Column IN columnObjectReferences) {
    // Create elevator objects
    /*FOR i= 1 TO elevator_amount
        SET elevatori TO INSTANTIATE Elevator WITH 1, 1, null, false, true, idle, i AND online
    ENDFOR*/
    // create an array of elevator object references
    var elevatorObjectReferences = [];
    for (i=1; i<=elevator_amount; i++){
        // building elevator_amount (2) elevator objects here, with ids of: elevator-1, elevator-2, etc.
        // build a selector to reference them via id, not by class with a dot as you have in your question
        sel = String("#elevator-" + i);
        // create the object and store a reference to the elevator object so you can do something with it later
        var newElevator = new ElevatorObject($(sel), i);
        // build list of references
        elevatorObjectReferences.push(newElevator);
    }
    // Create UpButton objects
    /*FOR i= 1 TO floor_amount - 1
        SET UpButtoni TO INSTANTIATE UpButton WITH i, up, i AND notPressed
        //SET UpButtonFloori TO i
    ENDFOR*/
    // create an array of UpButton object references
    var upButtonObjectReferences = [];
    for (i=1; i<=floor_amount - 1; i++){
        // building floor_amount - 1 (9) UpButton objects here, with ids of: upButton-1, upButton-2, etc.
        // build a selector to reference them via id, not by class with a dot as you have in your question
        sel = String("#upButton-" + i);
        // create the object and store a reference to the upButton object so you can do something with it later
        var newUpButton = new UpButtonObject($(sel), i);
        // build list of references
        upButtonObjectReferences.push(newUpButton);
    }

     // Create DownButton objects
    /*FOR i= 1 TO floor_amount - 1
        SET DownButtoni TO INSTANTIATE DownButton WITH i+1, down, i AND notPressed
        //SET DownButtonFloori TO i+1
    ENDFOR*/
    // create an array of DownButton object references
    var downButtonObjectReferences = [];
    for (i=1; i<=floor_amount - 1; i++){
        // building floor_amount - 1 (9) DownButton objects here, with ids of: downButton-1, downButton-2, etc.
        // build a selector to reference them via id, not by class with a dot as you have in your question
        sel = String("#downButton-" + i);
        // create the object and store a reference to the DownButton object so you can do something with it later
        var newDownButton = new DownButtonObject($(sel), i);
        // build list of references
        downButtonObjectReferences.push(newDownButton);
    }

    var Elevator;
    FOR (Elevator IN ElevatorList) {
        // create an array of FloorButton object references
        var floorButtonObjectReferences = [];
        FOR (i= 1; i<=floor_amount; i++) {
            // Create FloorButton objects
            //SET floorButtoni TO INSTANTIATE FloorButton WITH i, i AND notPressed
            //SET floorButtonFloori TO i
                // building floor_amount (10) FloorButton objects here, with ids of: floorButton-1, floorButton-2, etc.
                // build a selector to reference them via id, not by class with a dot as you have in your question
                sel = String("#floorButton-" + i);
                // create the object and store a reference to the FloorButton object so you can do something with it later
                var newFloorButton = new FloorButtonObject($(sel), i);
                // build list of references
                floorButtonObjectReferences.push(newFloorButton);
            }
        }
        //SET ElevatorOpenDoorButton TO INSTANTIATE OpenDoorButton WITH open AND notPressed
        //SET ElevatorCloseDoorButton TO INSTANTIATE CloseDoorButton WITH close AND notPressed
        //SET ElevatorDoor TO INSTANTIATE Door 
        var ElevatorDoor = new Door();
   }
}

//ENDSEQUENCE
//CALL initialize *******************************************************************************************************************

FOR (Column IN ColumnList) {
    WHILE (columnStatus === "online") {
        var UpButton;
        FOR (UpButton IN UpButtonList) {
            /*WHEN user press UpButton
                SET buttonStatus to pressed
                SET buttonDirection to up
                SET floorRequested to UpButtonFloor
                CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND floorRequested
                */ columnAddFloorRequestList(FloorUpRequestList, FloorDownRequestList, buttonDirection, floorRequested);
                //turn UpButtonLight on
        }
        var DownButton;
        FOR (DownButton IN DownButtonList) {
            /*WHEN user press DownButton
                SET buttonStatus to pressed
                SET buttonDirection to down
                SET floorRequested to DownButtonFloor
                CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND floorRequested
                */ columnAddFloorRequestList(FloorUpRequestList, FloorDownRequestList, buttonDirection, floorRequested);
               //turn DownButtonLight on
        }

        WHILE (elevatorStatusOnlineAmount > 0) {
            if (FloorUpRequestList !== [] || FloorDownRequestList !== []) {
                //CALL columnFindElevator with ElevatorList, ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, FloorUpRequestList, FloorDownRequestList, buttonDirection AND FloorDownRequest
                columnFindElevator(ElevatorList, ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, FloorUpRequestList, FloorDownRequestList, buttonDirection, FloorDownRequest);
                // add floor reuqest(s) to selected elevator and remove it from columnList
                if (ElevatorDirection === "up") {
                    var FloorUpRequest;
                    FOR (Elevator IN ElevatorList) {
                        if (Elevator === ElevatorSelected) {
                            FOR (FloorUpRequest IN FloorUpRequestList) {
                                if (FloorUpRequest >= ElevatorFloor) {
                                    elevatorAddFloorRequestList(ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection, floorRequested);
                                    columnRemoveFloorRequestList(FloorUpRequestList, FloorDownRequestList, buttonDirection, FloorUpRequest);
                                    //BREAK;  // EXIT FOR to avoid picking more than one elevator at the same distance from floor requested
                                }
                            }
                        }  
                    }
                }
                else if (ElevatorDirection === "down") {
                    var FloorDownRequest;
                    FOR (Elevator IN ElevatorList) {
                        if (Elevator === ElevatorSelected) {
                            FOR (FloorDownRequest IN FloorDownRequestList) {
                                if (FloorDownRequest <= ElevatorFloor) {
                                    elevatorAddFloorRequestList(ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection, floorRequested);
                                    columnRemoveFloorRequestList(FloorUpRequestList, FloorDownRequestList, buttonDirection, FloorUpRequest);
                                   // BREAK;  // EXIT FOR to avoid picking more than one elevator at the same distance from floor requested
                                }
                            }
                        }  
                    }
                }
            } 

            var elevatorStatusOnlineAmount = 0;

            FOR (Elevator IN ElevatorList) {
                if (elevatorStatus === "Online") {
                    elevatorStatusOnlineAmount++;
                } 
                /*WHEN Elevator is outOfOrder or not safe THEN
                    SET elevatorStatus TO Offline
                    //'remove Elevator from ElevatorList'

                WHEN Elevator is operational and safe
                    SET elevatorStatus TO Online
                    //'add Elevator from ElevatorList'*/

                if (ElevatorDirection === "idle") {
                    if (ElevatorDestination !== null) {
                        //move elevator to ElevatorDestination without stops and without updating ElevatorFloorUpRequestList and ElevatorFloorDownRequestList
                        if (ElevatorFloor === ElevatorDestination) {
                            //SET ElevatorDirection TO buttonDirection
                            ElevatorDirection = buttonDirection;
                            //'continue using ElevatorFloorRequestList linked to buttonDirection for ElevatorDestination
                        }
                    }
                    //'else         
                }

                else if (ElevatorDirection !== "idle") {
                    //'switch ElevatorDirection, buttonDirection and ElevatorFloorRequestList used'
                    //'update ElevatorDestination'
                    if (ElevatorDestination === null && ElevatorFloorUpRequestList === [] && ElevatorFloorDownRequestList === []) {
                        ElevatorDirection = "idle";
                        buttonDirection = "idle";
                    } 
                    else if (ElevatorDestination === null && ElevatorFloorUpRequestList === [] && ElevatorFloorDownRequestList !== []) {
                        ElevatorDirection = "down";
                        buttonDirection = "down";
                        ElevatorDestination = ElevatorFloorDownRequestList[0];
                    }
                    else if (ElevatorDestination === null && ElevatorFloorUpRequestList !== [] && ElevatorFloorDownRequestList === []) {
                        ElevatorDirection = "up";
                        buttonDirection = "up";
                        ElevatorDestination = ElevatorFloorUpRequestList[0];
                    }
                }            
                
                var FloorButton;
                FOR (FloorButton IN FloorButtonList) {
                    /*WHEN user press FloorButton
                        turn FloorButtonLight on
                        set status of FloorButton to Pressed */
                        if (ElevatorFloor < FloorButtonFloor) {
                            buttonDirection = "up";
                        } 
                        else if (ElevatorFloor > FloorButtonFloor) {
                            buttonDirection = "down";
                        }
                        else {
                            buttonDirection = "idle"; //null
                            /*open doors
                            turn FloorButtonLight off
                            close doors after a delay of 7 seconds*/
                        }
                        floorRequested = FloorButtonFloor;
                        /*CALL elevatorAddFloorRequestList with ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
                    */ }

                if (ElevatorFloor === ElevatorDestination) {
                    /*CALL elevatorRemoveFloorRequestList with ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND ElevatorDestination
                    */if (ElevatorDirection === "up") {
                        ElevatorDestination = ElevatorFloorUpRequestList[0];
                        /*turn the light off of UpButton of this floor
                        set status of UpButton of this floor to notPressed*/
                    } 
                    else if (ElevatorDirection === "down") {
                        ElevatorDestination = ElevatorFloorDownRequestList[0];
                        /*turn the light off of DownButton of this floor
                        set status of DownButton of this floor to notPressed*/
                    } 
                    /*turn the light off of FloorButton of this floor
                    set status of FloorButton of this floor to notPressed
                    stop elevator
                    open doors
                    close doors after a delay of 7 seconds
                    allow users to use OpenDoorButton AND CloseDoorButton before or when door is closing only*/
                    /*WHEN door is closed
                        move elevator to the next floor if list is not empty (ElevatorDestination not null)
                        if ElevatorDirection is up THEN 
                            INCREMENT ElevatorFloor
                        else if ElevatorDirection is down THEN 
                            DECREMENT ElevatorFloor
                        endif*/
                }

                if (ElevatorFloor < ElevatorDestination && ElevatorDirection === "up") {
                    //move elevator to the next floor
                    ElevatorFloor++;
                }

                else if (ElevatorFloor > ElevatorDestination && ElevatorDirection === "down") {
                    //move elevator to the next floor               
                    ElevatorFloor--;
                }
            }
        }

        
        //verify or update loop condition
        if (elevatorStatusOnlineAmount === 0) {
            //SET columnStatus TO offline
            columnStatus = "offline";
        }
    
    }
}




'-------------------------------------------------------Testing Section------------------------------------------------------------'
- Scenario 1:
    Elevator A 
        ElevatorDirection is Idle 
        ElevatorFloor is 2 
    Elevator B is Idle at floor 6
        ElevatorDirection is Idle 
        ElevatorFloor is 6 

    Someone is on floor 3 and wants to go to the 7th floor. 
        CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, up AND 3
    
    Elevator A is expected to be sent.

- Scenario 2:
    Elevator A is Idle at floor 10 
        ElevatorDirection is Idle 
        ElevatorFloor is 10 
    Elevator B is idle at floor 3
        ElevatorDirection is Idle 
        ElevatorFloor is 3 

    Someone is on the 1st floor and requests the 6th floor.
        CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, up AND 1

    Elevator B should be sent. 

    2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator B should be sent.
        CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, up AND 3

    Finally, a third person is at floor 9 and wants to go down to the 2nd floor. 
        CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, down AND 9

    Elevator A should be sent.

- Scenario 3:
    Elevator A is Idle at floor 10 
        ElevatorDirection is Idle 
        ElevatorFloor is 10 

    Elevator B is Moving from floor 3 to floor 6
        ElevatorDirection is up 
        ElevatorFloor is 3 
        ElevatorDestination is 6 

    Someone is on floor 3 and requests the 2nd floor. 
        CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, down AND 3

    Elevator A should be sent. 

    5 minutes later, someone else is on the 10th floor and wants to go to the 3rd. Elevator B should be sent.
        CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, down AND 10

'-------------------------------------------------------Testing Section------------------------------------------------------------'