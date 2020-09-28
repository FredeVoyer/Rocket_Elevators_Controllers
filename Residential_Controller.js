//JS code for residential building elevators controller (controller algorithm)

// Initiate the scenario in the documentation
var column_amount = 1;
var elevator_amount = 2;
var floor_amount = 10;

// definition of the class Column
var Column = function(id, status) {   
    this.ID: id;
    this.Status: status;
    this.ElevatorList = [];
    this.UpButtonList= [];
    this.DownButtonList= [];

    this.UpButtonFloorList= [];
    this.DownButtonFloorList= [];
   
    this.FloorUpRequestList= [];
    this.FloorDownRequestList= [];
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
        distance[i] = Math.abs(ElevatorFloor - ElevatorDestination);
        i++;
    }
            // Identify the smallest distance
    //SORT ascending order distance
    distance.sort(function(a,b){return a-b});
    var minDistance = distance[0];
            // Identify closest elevator moving up
    FOR (potentialElevator IN potentialElevatorsList) {
        if (Math.abs(ElevatorFloor - ElevatorDestination) === minDistance) {
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
    if ElevatorUpSelected = null THEN
        FOR EACH Elevator IN ElevatorList
            COMPUTE distance between the Elevator and maxFloorUpRequested

            if ElevatorDirection is idle AND ElevatorDestination is null AND Elevator has lowest distance from maxFloorUpRequested THEN
                SET buttonDirection TO up
                SET ElevatorUpSelected TO Elevator
                FOR ElevatorUpSelected IN ElevatorList
                    '//SET ElevatorFloorUpRequestList TO FloorUpRequestList
                    '//SET ElevatorFloorDownRequestList TO FloorDownRequestList
                    FOR EACH FloorUpRequest IN FloorUpRequestList
                            CALL elevatorAddFloorRequestList with ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
                            CALL columnRemoveFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND FloorUpRequest
                    ENDFOR
                ENDFOR
            EXIT FOR '// BREAK to avoid picking more than one elevator at the same distance from floor requested
            endif
        ENDFOR
    endif

    '// case FloorDownRequestList
    SET ElevatorDownSelected to null
    SET minFloorDownRequested to first item of FloorDownRequestList
    SET maxFloorDownRequested to last item of FloorDownRequestList
        '// select first elevator moving, refine with closest one  or one that can do all the list
    FOR EACH Elevator IN ElevatorList
        COMPUTE distance between the Elevator and minFloorDownRequested

        if ElevatorDirection is down AND ElevatorFloor >= minFloorDownRequested AND Elevator has lowest distance from minFloorDownRequested THEN
            SET ElevatorDownSelected TO Elevator
            FOR ElevatorDownSelected IN ElevatorList
                '//SET ElevatorFloorUpRequestList TO FloorUpRequestList
                '//SET ElevatorFloorDownRequestList TO FloorDownRequestList
                FOR EACH FloorDownRequest IN FloorDownRequestList
                    if FloorDownRequest is lower or equal to ElevatorFloor
                        CALL elevatorAddFloorRequestList with ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
                        CALL columnRemoveFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND FloorDownRequest
                    endif
                ENDFOR
            ENDFOR
            EXIT FOR '// BREAK to avoid picking more than one elevator at the same distance from floor requested
        endif
    ENDFOR
        '// select lastly elevator not moving (idle and with no destination) to clear (empty) FloorDownRequestList
    if ElevatorDownSelected = null THEN
        FOR EACH Elevator IN ElevatorList
            'case not moving'
            COMPUTE distance between the Elevator and minFloorDownRequested
            
            if ElevatorDirection is idle AND ElevatorDestination is null AND Elevator has lowest distance from minFloorDownRequested THEN
                SET buttonDirection TO down
                SET ElevatorDownSelected TO Elevator
                FOR ElevatorDownSelected IN ElevatorList
                    '//SET ElevatorFloorUpRequestList TO FloorUpRequestList
                    '//SET ElevatorFloorDownRequestList TO FloorDownRequestList
                    FOR EACH FloorDownRequest IN FloorDownRequestList
                        if FloorDownRequest is lower or equal to ElevatorFloor
                            CALL elevatorAddFloorRequestList with ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
                            CALL columnRemoveFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND FloorDownRequest
                        endif
                    ENDFOR
                ENDFOR
                EXIT FOR '// BREAK to avoid picking more than one elevator at the same distance from floor requested
            endif
        ENDFOR
    endif

}
    'remove done below initiate'
    SEQUENCE createElevatorList USING elevator_amount
        SET elevId to 1
        FOR elevator= 0 TO elevator_amount - 1
            SET ElevatorList[elevator] TO "Elevator elevId"
            INCREMENT elevId
        ENDFOR
    ENDSEQUENCE
    'remove done below initiate'
    SEQUENCE createUpButtonList USING floor_amount
        SET buttonId to 1
        FOR button= 0 TO floor_amount - 2
            SET UpButtonList[button] TO "UpButton buttonId"
            INCREMENT buttonId
        ENDFOR
    ENDSEQUENCE
    'remove done below initiate'
    SEQUENCE createDownButtonList USING floor_amount
        SET buttonId to 1
        FOR button= 0 TO floor_amount - 2
            SET DownButtonList[button] TO "DownButton buttonId"
            INCREMENT buttonId
        ENDFOR
    ENDSEQUENCE
    'remove done below initiate'
    SEQUENCE createUpButtonFloorList USING floor_amount
        SET floorId to 1
        FOR floor= 0 TO floor_amount - 2
            SET UpButtonFloorList[floor] TO floorId
            INCREMENT floorId
        ENDFOR
    ENDSEQUENCE
    'remove done below initiate'
    SEQUENCE createDownButtonFloorList USING floor_amount
        SET floorId to 2
        FOR floor= 0 TO floor_amount - 2
            SET DownButtonFloorList[floor] TO floorId
            INCREMENT floorId
        ENDFOR
    ENDSEQUENCE

ENDDEFINE

'// definition of the class Elevator
DEFINE Elevator USING origin, floor, destination, doorOpen, doorClosed, direction, id AND status
    ID: id,
    Status: status, '// online, offline
    Direction : direction, '// null (idle not moving if destination is null else moving), up, down (moving for both)
    DoorOpen: doorOpen, '// bool true false
    DoorClosed: doorClosed, '// bool true false
    Floor: floor, '// floor domain (1,...,10)
    Destination: destination, '// floor domain (1,...,10) and null if Direction to null (idle, not moving; else moving)
    Origin: origin, '// floor domain (1,...,10)
    MaxWeight: 2500, '// pounds'
    FloorButtonList: SET to empty List,
    FloorButtonFloorList: SET to empty List,
    ButtonFloorRequestedList: SET to empty List,
    FloorRequestList: SET to empty List,
    FloorUpRequestList: SET to empty List,
    FloorDownRequestList: SET to empty List

     
    SEQUENCE elevatorAddFloorRequestList USING ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
        '// case NOT MOVING:ElevatorFloorUpRequestList, ElevatorFloorDownRequestList are empty before the call
        if ElevatorDirection is idle AND ElevatorDestination is null THEN
            if buttonDirection is up THEN
                '// verify if floor requested already in the ElevatorFloorUpRequestList before adding to the list
                SET addToList TO true;
                FOR EACH ElevatorFloorUpRequest IN ElevatorFloorUpRequestList
                    if floorRequested is equal to ElevatorFloorUpRequest THEN
                        SET addToList TO false;
                        EXIT FOR '// BREAK
                    endif

                ENDFOR
                if addToList is true or floorRequested is not in ElevatorFloorUpRequestList THEN
                    ADD floorRequested TO ElevatorFloorUpRequestList
                    SORT ascending order ElevatorFloorUpRequestList
                endif
            else if buttonDirection is down THEN
                '// verify if floor requested already in the ElevatorFloorDownRequestList before adding to the list
                SET addToList TOtrue;
                FOR EACH ElevatorFloorDownRequest IN ElevatorFloorDownRequestList
                    if floorRequested is equal to ElevatorFloorDownRequest THEN
                        SET addToList TO false;
                        EXIT FOR '// BREAK
                    endif

                ENDFOR
                if addToList is equal to true or floorRequested is not in ElevatorFloorDownRequestList THEN
                    ADD floorRequested TO ElevatorFloorDownRequestList
                    SORT descending order ElevatorFloorDownRequestList
                endif

            endif
        'case moving '
        else
            if floorRequested is higher than ElevatorFloor THEN
                '// verify if floor requested already in the ElevatorFloorUpRequestList before adding to the list
                SET addToList TO true;
                FOR EACH ElevatorFloorUpRequest IN ElevatorFloorUpRequestList
                    if floorRequested is equal to ElevatorFloorUpRequest THEN
                        SET addToList TO false;
                        EXIT FOR '// BREAK
                    endif

                ENDFOR
                if addToList is equal to true or floorRequested is not in ElevatorFloorUpRequestList THEN
                    ADD floorRequested TO ElevatorFloorUpRequestList
                    SORT ascending order ElevatorFloorUpRequestList
                endif
            endif
            else if floorRequested is lower than ElevatorFloor THEN
                '// verify if floor requested already in the ElevatorFloorDownRequestList before adding to the list
                SET addToList TO true;
                FOR EACH ElevatorFloorDownRequest IN ElevatorFloorDownRequestList
                    if floorRequested is equal to ElevatorFloorDownRequest THEN
                        SET addToList=false;
                        EXIT FOR '// BREAK
                    endif

                ENDFOR
                if addToList is equal to true or floorRequested is not in ElevatorFloorDownRequestList THEN
                    ADD floorRequested TO ElevatorFloorDownRequestList
                    SORT descending order ElevatorFloorDownRequestList
                endif
            endif
            '// not sure necessary case to treat (do something) or treated below
            else if floorRequested is equal to ElevatorFloor THEN
            endif
        endif


        /******************* */
    if (ElevatorUpSelected !== null) {
        ElevatorSelected = ElevatorUpSelected;
    }
    else if (ElevatorDownSelected !== null) {
        ElevatorSelected = ElevatorDownSelected;
    }
    return ElevatorSelected;

    ENDSEQUENCE
    
    SEQUENCE elevatorRemoveFloorRequestList USING  ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
        if buttonDirection is up THEN
            FOR EACH ElevatorFloorUpRequest IN ElevatorFloorUpRequestList
                if floorRequested is equal to ElevatorFloorUpRequest THEN
                    REMOVE ElevatorFloorUpRequest FROM ElevatorFloorUpRequestList
                endif
            ENDFOR
        endif
        else if buttonDirection is down THEN
            FOR EACH ElevatorFloorDownRequest IN ElevatorFloorDownRequestList
                if floorRequested is equal to ElevatorFloorDownRequest THEN
                    REMOVE ElevatorFloorDownRequest FROM ElevatorFloorDownRequestList
                endif
            ENDFOR
        endif
    ENDSEQUENCE
    'verify done lower'
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

ENDDEFINE

'// definition of the class Button (related to floor and column, light on if pressed, light off if command resolved or default)
DEFINE Button USING floor, direction, id AND status
    ID: id,
    Status: status, '// pressed, notPressed
    Floor: floor, 
    Light: off,
    Direction: direction '// up, down

ENDDEFINE
DEFINE UpButton USING floor, direction, id AND status
    ID: id,
    Status: status, '// pressed, notPressed
    Floor: floor, 
    Light: off,
    Direction: up

ENDDEFINE
DEFINE DownButton USING floor, direction, id AND status
    ID: id,
    Status: status, '// pressed, notPressed
    Floor: floor, 
    Light: off,
    Direction: down

ENDDEFINE
DEFINE FloorButton USING floorRequested, id AND status
    ID: id,
    Status: status, '// pressed, notPressed
    FloorRequested: floorRequested, 
    Light: off,
    Direction: direction '// up, down

ENDDEFINE
DEFINE OpenDoorButton USING id AND status
    ID: id,
    Status: status, '// pressed, notPressed
ENDDEFINE
DEFINE CloseDoorButton USING id AND status
    ID: id,
    Status: status, '//' pressed, notPressed
ENDDEFINE
DEFINE Door 
    ID: id,
    Status: closed, '//' open, closed

    SEQUENCE openDoor
        OPEN the door
        SET Status TO open
    ENDSEQUENCE

    SEQUENCE closeDoor
        CLOSE the door
        SET Status TO closed
    ENDSEQUENCE

ENDDEFINE


'//SEQUENCE initialize *******************************************************************************************************************
    SET column_amount to 1
    SET elevator_amount to 2
    SET floor_amount to 10

    FOR i= 1 TO column_amount
        SET columni TO INSTANTIATE Column WITH i, online
    ENDFOR

    FOR EACH Column IN ColumnList
        FOR i= 1 TO elevator_amount
            SET elevatori TO INSTANTIATE Elevator WITH 1, 1, null, false, true, idle, i AND online
        ENDFOR

        FOR i= 1 TO floor_amount - 1
            SET UpButtoni TO INSTANTIATE UpButton WITH i, up, i AND notPressed
            SET UpButtonFloori TO i
        ENDFOR

        FOR i= 1 TO floor_amount - 1
            SET DownButtoni TO INSTANTIATE DownButton WITH i+1, down, i AND notPressed
            SET DownButtonFloori TO i+1
       ENDFOR

    ENDFOR

    FOR EACH Elevator IN ElevatorList
        FOR i= 1 TO floor_amount
            SET floorButtoni TO INSTANTIATE FloorButton WITH i, i AND notPressed
            SET floorButtonFloori TO i
        ENDFOR

        SET ElevatorOpenDoorButton TO INSTANTIATE OpenDoorButton WITH open AND notPressed
        SET ElevatorCloseDoorButton TO INSTANTIATE CloseDoorButton WITH close AND notPressed
        SET ElevatorDoor TO INSTANTIATE Door 

    ENDFOR

'//ENDSEQUENCE
'//CALL initialize *******************************************************************************************************************

FOR EACH Column IN ColumnList

    WHILE columnStatus IS online

        FOR EACH UpButton IN UpButtonList
            WHEN user press UpButton
                SET buttonStatus to pressed
                SET buttonDirection to up
                SET floorRequested to UpButtonFloor
                CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND floorRequested
                turn UpButtonLight on
        ENDFOR
        FOR EACH DownButton IN DownButtonList
            WHEN user press DownButton
                SET buttonStatus to pressed
                SET buttonDirection to down
                SET floorRequested to DownButtonFloor
                CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, buttonDirection AND floorRequested
                turn DownButtonLight on
        ENDFOR


        WHILE  elevatorStatusOnlineAmount is greater than 0

            WHEN FloorUpRequestList is NOT empty OR FloorDownRequestList is NOT empty
                CALL columnFindElevator with ElevatorList, ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, FloorUpRequestList, FloorDownRequestList, buttonDirection AND FloorDownRequest

            SET elevatorStatusOnlineAmount TO 0

            FOR EACH Elevator IN ElevatorList

                if elevatorStatus is Online THEN
                    INCREMENT elevatorStatusOnlineAmount
                endif
                WHEN Elevator is outOfOrder or not safe THEN
                    SET elevatorStatus TO Offline
                    'remove Elevator from ElevatorList'

                WHEN Elevator is operational and safe
                    SET elevatorStatus TO Online
                    'add Elevator from ElevatorList'

                WHEN ElevatorDirection is idle
                    if ElevatorDestination is not null THEN
                        move elevator to ElevatorDestination without stops and without updating ElevatorFloorUpRequestList and ElevatorFloorDownRequestList
                        WHEN ElevatorFloor is equal to ElevatorDestination
                            SET ElevatorDirection TO buttonDirection
                            'continue using ElevatorFloorRequestList linked to buttonDirection for ElevatorDestination
                    endif
                    'else         

                WHEN ElevatorDirection is not idle
                    'switch ElevatorDirection, buttonDirection and ElevatorFloorRequestList used'
                    'update ElevatorDestination'
                    if ElevatorDestination is null AND ElevatorFloorUpRequestList is empty AND ElevatorFloorDownRequestList is empty THEN
                        SET ElevatorDirection TO idle
                        SET buttonDirection TO idle
                   else if ElevatorDestination is null AND ElevatorFloorUpRequestList is empty AND ElevatorFloorDownRequestList is not empty THEN
                        SET ElevatorDirection TO down
                        SET buttonDirection TO down
                        SET ElevatorDestination TO first item of ElevatorFloorDownRequestList
                   else if ElevatorDestination is null AND ElevatorFloorUpRequestList is not empty AND ElevatorFloorDownRequestList is empty THEN
                        SET ElevatorDirection TO up
                        SET buttonDirection TO up
                        SET ElevatorDestination TO first item of ElevatorFloorUpRequestList
                    endif
             

                FOR EACH FloorButton IN FloorButtonList
                    WHEN user press FloorButton
                        turn FloorButtonLight on
                        set status of FloorButton to Pressed
                        if ElevatorFloor is lower than FloorButtonFloor THEN
                            SET buttonDirection to up
                        else if ElevatorFloor is higher than FloorButtonFloor THEN
                            SET buttonDirection to down
                        else
                            SET buttonDirection to idle '//null
                            open doors
                            turn FloorButtonLight off
                            close doors after a delay of 7 seconds
                        endif
                        SET floorRequested to FloorButtonFloor
                        CALL elevatorAddFloorRequestList with ElevatorDestination, ElevatorFloor, ElevatorDirection, ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND floorRequested
                ENDFOR


                WHEN ElevatorFloor is equal to ElevatorDestination
                    CALL elevatorRemoveFloorRequestList with ElevatorFloorUpRequestList, ElevatorFloorDownRequestList, buttonDirection AND ElevatorDestination
                    if ElevatorDirection is up THEN 
                        SET ElevatorDestination TO first item of ElevatorFloorUpRequestList
                        turn the light off of UpButton of this floor
                        set status of UpButton of this floor to notPressed
                    else if ElevatorDirection is down THEN 
                        SET ElevatorDestination TO first item of ElevatorFloorDownRequestList
                        turn the light off of DownButton of this floor
                        set status of DownButton of this floor to notPressed
                    endif
                    turn the light off of FloorButton of this floor
                    set status of FloorButton of this floor to notPressed
                    stop elevator
                    open doors
                    close doors after a delay of 7 seconds
                    allow users to use OpenDoorButton AND CloseDoorButton before or when door is closing only
                    WHEN door is closed
                        move elevator to the next floor if list is not empty (ElevatorDestination not null)
                        if ElevatorDirection is up THEN 
                            INCREMENT ElevatorFloor
                        else if ElevatorDirection is down THEN 
                            DECREMENT ElevatorFloor
                        endif

                WHEN ElevatorFloor is lower than ElevatorDestination and ElevatorDirection is up
                    move elevator to the next floor
                    INCREMENT ElevatorFloor

                WHEN ElevatorFloor is higher than ElevatorDestination and ElevatorDirection is down
                    move elevator to the next floor               
                    DECREMENT ElevatorFloor



            ENDFOR

        ENDWHILE

        'verify or update loop condition
        if elevatorStatusOnlineAmount is equal to 0
            SET columnStatus TO offline
        endif
    
    ENDWHILE
ENDFOR


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