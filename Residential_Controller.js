//JS code for residential building elevators controller 

// definition of the class Column or controller
class Column {
    constructor(elevatorAmount, floorAmount) {
        let i;      
        this.status = "online"; // online or offline
        this.elevatorList = [];
        this.potentialElevatorsList= [];
        this.nonPotentialElevatorsList= [];       
        this.elevatorAmount = elevatorAmount;
        this.floorAmount = floorAmount;
        this.upButtonList = [];
        this.downButtonList = [];
        this.doorList = [];

        for (i = 1; i <= elevatorAmount; i++) {
            this.elevatorList.push(new Elevator(i, floorAmount));
        }
        for (i = 1; i <= floorAmount - 1; i++) {
            this.upButtonList.push(new UpButton(i, i));
        }
        for (i = 1; i <= floorAmount - 1; i++) {
            this.downButtonList.push(new DownButton(i, i+1));
        }
        for (i = 1; i <= elevatorAmount; i++) {
            this.doorList.push(new Door());
        }

   }
    findElevator(requestedFloor, direction) {
        // Identify potential elevators depending on the request and create list
        //var potentialElevatorsList=[]; 

        //var priority; (tie it to elevator this.priority aka property) no time to test it and implement
        //var priorityList=[]; 
        for (var i = 0; i < this.elevatorAmount; i++) {
            if (this.elevatorList[i].direction==="idle") {
                this.potentialElevatorsList.push(this.elevatorList[i]);
                //priority=2;
                //priorityList.push(priority);
            }
            else if (this.elevatorList[i].direction==="up" && requestedFloor >= this.elevatorList[i].floor && direction ==="up") {
                this.potentialElevatorsList.push(this.elevatorList[i]);
                //priority=1;
                //priorityList.push(priority);
                }
            else if (this.elevatorList[i].direction==="down" && requestedFloor <= this.elevatorList[i].floor && direction ==="down") {
                this.potentialElevatorsList.push(this.elevatorList[i]);
                //priority=1;
                //priorityList.push(priority);
            }
            else  {
                this.nonPotentialElevatorsList.push(this.elevatorList[i]);
                // adjustment for scenario3 (little trick)
                this.elevatorList[i].direction = "idle";
            }
        }

        // Determine the highest priority available (tie it to elevator this.priority aka property)
        //SORT ascending order priorityList (copy to keep original order to remove???)
        //priorityList.sort(function(a,b){return a-b});
        //var highestPriority = priorityList[0];
        // remove cases not equal to highestPriority
        /*if (priorityList[i] !== highestPriority) {
            //REMOVE it
            potentialElevatorsList.shift();
        } might not work but something like that like only pushing highest priority cases at the beginning in the potentialElevatorsList*/


        // Compute distance between each potential elevator floor and floor requested toto
        var elevatorDistanceList=[];
        for (var i = 0; i < this.potentialElevatorsList.length; i++) {
            elevatorDistanceList.push(Math.abs(this.potentialElevatorsList[i].floor - requestedFloor));
            this.potentialElevatorsList[i].distance = Math.abs(this.potentialElevatorsList[i].floor - requestedFloor);
        }
        // Identify the smallest distance
        //SORT ascending order distance
        elevatorDistanceList.sort(function(a,b){return a-b});
        var minDistance = elevatorDistanceList[0];

        // Identify closest elevator (only one))
        //FOR (elev of elevatorList) {
        var idElevatorSelected;
        for (i = 0; i < this.potentialElevatorsList.length; i++) {
            if (this.potentialElevatorsList[i].distance === minDistance) {
               // ElevatorSelected = this.elevatorList[i];
               var idElevatorSelected = i+1;
                return idElevatorSelected;
                break; // select only one elevator
            }
        }

        /* Determine the closest elevator for scenario 1 and 2 and move it to the requested floor
        if (elevator1.direction === 'idle' && elevator2.direction === 'idle') {
            if (elevator1.distance <= elevator2.distance) {*/
        

    }
    updateFloorDirection(elevator, floor, direction) {
        elevator.floor= floor;
        elevator.direction = direction;
    }
    updateDirection(elevator, direction) {
        elevator.direction = direction;
    }
    requestElevator(requestedFloor, direction) {
        //upButtonPressed() call there or in scenarios (if direction)
        //downButtonPressed() call there or in scenarios (if direction)

        var idElevatorSelected = this.findElevator(requestedFloor, direction); // this.elevatorList[0];
        console.log('idElevatorSelected: ' + idElevatorSelected)
        console.log('Elevator selected is: elevator' + this.elevatorList[idElevatorSelected-1].id );
        // Determine the elevator direction and move it accordingly
        if (this.elevatorList[idElevatorSelected-1].floor < requestedFloor) {
            this.elevatorList[idElevatorSelected-1].direction = "up";
            console.log('elevator' + this.elevatorList[idElevatorSelected-1].id + ' direction is: ' + this.elevatorList[idElevatorSelected-1].direction);
            // Move the elevator to the requested floor
            //this.elevatorList[idElevatorSelected-1].destination = requestedFloor;
            /*for (var i =this.elevatorList[idElevatorSelected-1].floor; i <= requestedFloor; i++) {
                console.log('elevator' + this.elevatorList[idElevatorSelected-1].id + ' floor is: ' + this.elevatorList[idElevatorSelected-1].floor);
                this.elevatorList[idElevatorSelected-1].floor=i;
            }*/
            while (this.elevatorList[idElevatorSelected-1].floor <= requestedFloor) {
                console.log('elevator' + this.elevatorList[idElevatorSelected-1].id + ' floor is: ' + this.elevatorList[idElevatorSelected-1].floor);
                this.elevatorList[idElevatorSelected-1].floor++;
            }
            this.elevatorList[idElevatorSelected-1].floor--;
           
        }
        else if (this.elevatorList[idElevatorSelected-1].floor > requestedFloor) {
            this.elevatorList[idElevatorSelected-1].direction = "down";
            console.log('elevator' + this.elevatorList[idElevatorSelected-1].id + ' direction is: ' + this.elevatorList[idElevatorSelected-1].direction);
            // Move the elevator to the requested floor
            //this.elevatorList[idElevatorSelected-1].destination = requestedFloor;
            //for (var i =this.elevatorList[idElevatorSelected-1].floor; i >= requestedFloor; i--) {
            while (this.elevatorList[idElevatorSelected-1].floor >= requestedFloor) {
                console.log('elevator' + this.elevatorList[idElevatorSelected-1].id + ' floor is: ' + this.elevatorList[idElevatorSelected-1].floor);
                this.elevatorList[idElevatorSelected-1].floor--;
            }
            this.elevatorList[idElevatorSelected-1].floor++;
        }
        return this.elevatorList[idElevatorSelected-1].id;//elevator";
    }
    colOnline() {
        this.status = "online"; 
    }
    colOffline() {
        this.status = "offline"; 
    }

}

// definition of the class Elevator
class Elevator {
    constructor(_id, _floorAmount) {
        this.id = _id;
        this.status = "online"; // online or offline
        this.floorAmount = _floorAmount;
        this.direction = "idle"; // null (idle not moving if destination is null else moving), up, down (moving for both)
        this.floor= 1; // floor domain (1,...,floorAmount)
        this.origin= 1; // floor domain (1,...,floorAmount)
        this.maxWeight= 2500; // pounds
        this.destination = null; // floor domain (1,...,floorAmount) and null if Direction to null (idle, not moving; else moving)
        this.floorRequestList= [];
        this.floorButtonList = [];

        for (var i = 1; i <= _floorAmount; i++) {
            this.floorButtonList.push(new FloorButton(i, i));
        }
    }
    requestFloor(elevator, requestedFloor) {
        console.log('requestFloor method, elevator is: elevator' + elevator);
        console.log('elevator' + elevator + ' is stopped at floor: ' + this.floor);
        //upButtonNotPressed() call there or in requestElevator (if direction)
        //downButtonNotPressed() call there or in requestElevator (if direction)

        console.log('elevator' + elevator + ' opens doors' );
        //openDoor() call there 
        //floorButtonPressed() call there or in scenario 
        //closeDoor() call there  
        console.log('elevator' + elevator + ' closes doors' );
        // Determine the elevator direction and move it accordingly
        if (this.floor < requestedFloor) {
            this.direction = "up";
            console.log('elevator' + elevator + ' direction is: ' + this.direction);
            // Move the elevator to the requested floor
            //this.destination = requestedFloor;
            while (this.floor <= requestedFloor) {
                console.log('elevator' + elevator + ' floor is: ' + this.floor);
                this.floor++;
            }
            this.floor--;
        }
        else if (this.floor > requestedFloor) {
            this.direction = "down";
            console.log('elevator' + elevator + ' direction is: ' + this.direction);
            // Move the elevator to the requested floor
            //this.destination = requestedFloor;
            while (this.floor >= requestedFloor) {
                console.log('elevator' + elevator + ' floor is: ' + this.floor);
                this.floor--;
            }
            this.floor++;
        }
        console.log('elevator' + elevator + ' is stopped at floor: ' + this.floor);
        console.log('elevator' + elevator + ' opens doors' );
        //openDoor() call there 
        //floorButtonNotPressed() call there  
        //closeDoor() call there  
        console.log('elevator' + elevator + ' closes doors' );

    }
    updateFloorDirection(floor, direction) {
        this.floor= floor;
        this.direction = direction;
    }
    update(direction) {
        this.direction = direction;
    }

    updateDestinationFloorRequestList(destination, direction) {
        // destination or floorRequestList[0]
        this.destination = destination;
        // push and sort floorRequestList
    }
    elevOnline() {
        this.status = "online"; 
    }
    elevOffline() {
        this.status = "offline"; 
    }
}

// definition of the class UpButton
class UpButton {
    constructor(_id, _floor) {
        this.id = _id;
        this.direction = "up"; // (idle not moving if destination is null else moving), up, down (moving for both);
        this.floor= _floor; // floor domain (1,...,floorAmount)       
        this.status = "notPressed"; // notPressed or pressed
        this.Light = "off"; // on or off
    }
    upButtonPressed() {
        this.status = "pressed"; 
        this.Light = "on";
    }
    upButtonNotPressed() {
        this.status = "notPressed"; 
        this.Light = "off";
    }
}

// definition of the class DownButton
class DownButton {
    constructor(_id, _floor) {
        this.id = _id;
        this.direction = "down"; // (idle not moving if destination is null else moving), up, down (moving for both);
        this.floor= _floor; // floor domain (1,...,floorAmount)       
        this.status = "notPressed"; // notPressed or pressed
        this.Light = "off"; // on or off
    }
    downButtonPressed() {
        this.status = "pressed"; 
        this.Light = "on";
    }
    downButtonNotPressed() {
        this.status = "notPressed"; 
        this.Light = "off";
    }
}

// definition of the class Door
class Door {
    constructor() {
        this.status = "closed"; // open or closed
    }
    openDoor() {
        this.status = "open";
    }
    closeDoor() {
        this.status = "closed";
    }
}

// definition of the class FloorButton
class FloorButton {
    constructor(_id, _floor) {
        this.id = _id;
        this.floor= _floor; // floor domain (1,...,floorAmount)       
        this.status = "notPressed"; // notPressed or pressed
        this.Light = "off"; // on or off
    }
    floorButtonPressed() {
        this.status = "pressed"; 
        this.Light = "on";
    }
    floorButtonNotPressed() {
        this.status = "notPressed"; 
        this.Light = "off";
    }
}


/*-------------------------------------------------------Testing Section------------------------------------------------------------*/

function scenario1() {
    /*- Scenario 1:
    Elevator A 
        ElevatorDirection is Idle 
        ElevatorFloor is 2 
    Elevator B is Idle at floor 6
        ElevatorDirection is Idle 
        ElevatorFloor is 6 */

    var columnA = new Column(2,10);  
    columnA.updateFloorDirection(columnA.elevatorList[0], 2, "idle");
    columnA.updateFloorDirection(columnA.elevatorList[1], 6, "idle");

    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);
        
    /* Someone is on floor 3 and wants to go to the 7th floor. */
    var idElevatorSelected = columnA.requestElevator(3, "up");
    //upButtonPressed() call there or in requestElevator (if direction)
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 7);  
    //floorButtonPressed() call there or in requestFloor (if direction)

    console.log('columnA.elevatorList is: ' + columnA.elevatorList[0] + columnA.elevatorList[0]);
    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);
    
       /* Elevator A is expected to be sent.*/
    
}
scenario1()

function scenario2() {
    /*- Scenario 2:
    Elevator A is Idle at floor 10 
        ElevatorDirection is Idle 
        ElevatorFloor is 10 
    Elevator B is idle at floor 3
        ElevatorDirection is Idle 
        ElevatorFloor is 3 */
    var columnA = new Column(2,10);  
    columnA.updateFloorDirection(columnA.elevatorList[0], 10, "idle");
    columnA.updateFloorDirection(columnA.elevatorList[1], 3, "idle");

    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);
    
    /* Someone is on the 1st floor and requests the 6th floor. */
    var idElevatorSelected = columnA.requestElevator(1, "up");
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 6);  

    console.log('columnA.elevatorList is: ' + columnA.elevatorList[0] + columnA.elevatorList[0]);
    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);
    
    /* Elevator B is expected to be sent.*/

    /*2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator B should be sent. */
    idElevatorSelected = columnA.requestElevator(3, "up");
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 5);  

    console.log('columnA.elevatorList is: ' + columnA.elevatorList[0] + columnA.elevatorList[0]);
    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);

    /*Finally, a third person is at floor 9 and wants to go down to the 2nd floor. 
    CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, down AND 9*/
    idElevatorSelected = columnA.requestElevator(9, "down");
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 2);  

    console.log('columnA.elevatorList is: ' + columnA.elevatorList[0] + columnA.elevatorList[0]);
    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);

   // Elevator A should be sent.
}
//scenario2()

function scenario3() { 
    /*
- Scenario 3:
    Elevator A is Idle at floor 10 
        ElevatorDirection is Idle 
        ElevatorFloor is 10 

    Elevator B is Moving from floor 3 to floor 6
        ElevatorDirection is up 
        ElevatorFloor is 4 (more than 3) 
        ElevatorDestination is 6 */
    var columnA = new Column(2,10);  
    columnA.updateFloorDirection(columnA.elevatorList[0], 10, "idle");
    columnA.updateFloorDirection(columnA.elevatorList[1], 6, "up");
    //var idElevatorSelected = columnA.requestElevator(1, "up");
    //columnA.elevatorList[1].requestFloor(2, 6);  

    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);

    //Someone is on floor 3 and requests the 2nd floor. 
    var idElevatorSelected = columnA.requestElevator(3, "down");
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 2);  

    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);

    //Elevator A should be sent. 

    //5 minutes later, someone else is on the 10th floor and wants to go to the 3rd. Elevator B should be sent.
    //columnA.updateDirection(columnA.elevatorList[0], "idle");
    //columnA.updateDirection(columnA.elevatorList[1], "idle");
    idElevatorSelected = columnA.requestElevator(10, "down");
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 3);  

    console.log('elevator1.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevator1.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevator1.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevator1.id is: ' + columnA.elevatorList[0].id);
    console.log('elevator2.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevator2.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevator2.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevator2.id is: ' + columnA.elevatorList[1].id);


}       
//scenario3()
// done sequentiel (as seen in the channel) instead of real time (algo) no requestFloorList for the elevators
//'-------------------------------------------------------Testing Section------------------------------------------------------------*/