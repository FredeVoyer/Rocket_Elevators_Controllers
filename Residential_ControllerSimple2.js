//JS code for residential building elevators controller 
class Column {
    constructor(elevatorAmount, floorAmount) {
        let i;
        this.elevatorList = [];
        for (i = 1; i <= elevatorAmount; i++) {
            this.elevatorList.push(new Elevator(i, floorAmount));
        }
    }
    findElevator(requestedFloor, direction) {
        // Compute distance between each elevator floor and floor requested
        //elevatorA.distance = Math.abs(elevatorA.floor-requestedFloor);
        //elevatorB.distance = Math.abs(elevatorB.floor-requestedFloor);
        var elevatorDistanceList=[];
        for (i = 0; i < elevatorAmount; i++) {
            elevatorList[i].distance =  Math.abs(elevatorList[i].floor-requestedFloor);
            //elevatorDistanceList.push(elevatorList[i].distance);
            elevatorDistanceList[i]=elevatorList[i].distance;
        }
        var elev;
       /* i=0;
        for (elev of elevatorList) {
            elevatorList[i].distance =  Math.abs(elevatorList[i].floor-requestedFloor);
            i++;
        }*/
        // Identify the smallest distance
        //SORT ascending order distance
        elevatorDistanceList.sort(function(a,b){return a-b});
        var minDistance = elevatorDistanceList[0];
        // Identify closest elevator (only one))
        //FOR (elev of elevatorList) {
        for (i = 0; i < elevatorAmount; i++) {
            if (elevatorList[i].distance === minDistance) {
                ElevatorSelected = elevatorList[i];
                break; // select only one elevator
            }
        }
        return ElevatorSelected;

                /* Determine the closest elevator for scenario 1 and 2 and move it to the requested floor
                if (elevatorA.direction === 'idle' && elevatorB.direction === 'idle') {
                    if (elevatorA.distance <= elevatorB.distance) {*/
        

    }

    updateFloorDirection(elevator, floor, direction) {
        elevator.floor= floor;
        elevator.direction = direction;
    }

    requestElevator(requestedFloor, direction) {
        var elevator = findElevator(requestedFloor, direction);
        console.log('Elevator selected is: ' + elevator.id );
        // Determine the elevator direction and move it accordingly
        if (elevator.floor < requestedFloor) {
            elevator.direction = "up";
            console.log('elevator direction is: ' + elevator.direction);
            // Move the elevator to the requested floor
            //elevatorA.destination = requestedFloor;
            for (var i =elevator.floor; i <= requestedFloor; i++) {
                console.log('elevatorAfloor is: ' + elevator.floor);
                elevator.floor=i;
            }
        }
        else if (elevator.floor > requestedFloor) {
            elevator.direction = "down";
            console.log('elevator direction is: ' + elevator.direction);
            // Move the elevator to the requested floor
            //elevatorA.destination = requestedFloor;
            for (var i =elevator.floor; i >= requestedFloor; i--) {
                console.log('elevatorAfloor is: ' + elevator.floor);
                elevator.floor=i;
            }
        }
        return elevator.id;//elevator";
    }
          

}

// definition of the class Elevator
class Elevator {
    constructor(_id, _floorAmount) {
        this.id = _id;
        this.floorAmount = _floorAmount;
        this.direction = "idle"; // null (idle not moving if destination is null else moving), up, down (moving for both)
        this.floor= 1; // floor domain (1,...,10)
        this.destination = null; // floor domain (1,...,10) and null if Direction to null (idle, not moving; else moving)
        this.floorRequestList= [];
    }
    requestFloor(elevator, requestedFloor) {
        console.log('requestFloor method, elevator is: ' + elevator);
        console.log(elevator + ' is stopped at floor: ' + this.floor);
        // Determine the elevator direction and move it accordingly
        if (this.floor < requestedFloor) {
            this.direction = "up";
            console.log(elevator + ' direction is: ' + this.direction);
            // Move the elevator to the requested floor
            //this.destination = requestedFloor;
            while (this.floor <= requestedFloor) {
                console.log(elevator + ' floor is: ' + this.floor);
                this.floor++;
            }
        }
        else if (this.floor > requestedFloor) {
            this.direction = "down";
            console.log(elevator + ' direction is: ' + this.direction);
            // Move the elevator to the requested floor
            //this.destination = requestedFloor;
            while (this.floor >= requestedFloor) {
                console.log(elevator + ' floor is: ' + this.floor);
                this.floor--;
            }
        }
        console.log(elevator + ' final floor is: ' + this.floor);
        // if final value not good ->  change condition (remove=)
    }
    updateFloorDirection(floor, direction) {
        this.floor= floor;
        this.direction = direction;
    }
    updateDestinationFloorRequestList(destination, direction) {
        // destination or floorRequestList[0]
        this.destination = destination;
        // push and sort floorRequestList
    }
}


/*-------------------------------------------------------Testing Section------------------------------------------------------------*/
// Initiate the scenario in the documentation
/*var column_amount = 1;
var elevator_amount = 2;
var floor_amount = 10;*/

var columnA = new Column(2,10);  

/*var ElevatorA = new Elevator();     
var ElevatorB = new Elevator();     */
// Scenario 1
columnA.updateFloorDirection(columnA.elevatorList[0], 2, "idle");
columnA.updateFloorDirection(columnA.elevatorList[1], 6, "idle");
//var elevatorA = new Elevator(1, "idle", 2, null);     
//var elevatorB = new Elevator(2, "idle", 6, null);
// Scenario 2
//var elevatorA = new Elevator(1, "idle", 10, null);     
//var elevatorB = new Elevator(2, "idle", 3, null);
// Scenario 3
//var elevatorA = new Elevator(1, "idle", 10, null);     
//var elevatorB = new Elevator(2, "idle", 3, null);

/*- Scenario 1:
    Elevator A 
        ElevatorDirection is Idle 
        ElevatorFloor is 2 
    Elevator B is Idle at floor 6
        ElevatorDirection is Idle 
        ElevatorFloor is 6 */
function scenario1() {
    /* Initiate the scenario in the documentation
    var column_amount = 1;
    var elevator_amount = 2;
    var floor_amount = 10;

    var columnA = new Column();  

    var elevatorA = new Elevator(1, "idle", 2, null);     
    var elevatorB = new Elevator(2, "idle", 6, null);*/
    columnA.updateFloorDirection(columnA.elevatorList[0], 2, "idle");
    columnA.updateFloorDirection(columnA.elevatorList[1], 6, "idle");

    console.log('elevatorA.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevatorA.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevatorA.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevatorA.id is: ' + columnA.elevatorList[0].id);
    console.log('elevatorB.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevatorB.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevatorB.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevatorB.id is: ' + columnA.elevatorList[1].id);
    
    // Initiate columnA.elevatorList    
    //columnA.elevatorList.push("elevatorA");      
    //columnA.elevatorList.push("elevatorB");   
    
    /* Someone is on floor 3 and wants to go to the 7th floor. */
    //var elevator = columnA.requestElevator(3, "up");
    var elevatorSelected = columnA.requestElevator(3, "up");
    //Elevator.requestFloor(elevatorSelected, 7);  
    elevatorSelected.requestFloor(elevatorSelected, 7);  
    console.log('columnA.elevatorList is: ' + columnA.elevatorList);
    console.log('elevatorA.floor is: ' + columnA.elevatorList[0].floor);
    console.log('elevatorA.direction is: ' + columnA.elevatorList[0].direction);
    console.log('elevatorA.destination is: ' + columnA.elevatorList[0].destination);
    console.log('elevatorA.id is: ' + columnA.elevatorList[0].id);
    console.log('elevatorB.floor is: ' + columnA.elevatorList[1].floor);
    console.log('elevatorB.direction is: ' + columnA.elevatorList[1].direction);
    console.log('elevatorB.destination is: ' + columnA.elevatorList[1].destination);
    console.log('elevatorB.id is: ' + columnA.elevatorList[1].id);
    
    
       /* Elevator A is expected to be sent.*/
    
}
scenario1()
/*- Scenario 2:
    Elevator A is Idle at floor 10 
        ElevatorDirection is Idle 
        ElevatorFloor is 10 
    Elevator B is idle at floor 3
        ElevatorDirection is Idle 
        ElevatorFloor is 3 */
/*function scenario2() {
    // Initiate the scenario in the documentation
    var column_amount = 1;
    var elevator_amount = 2;
    var floor_amount = 10;

    var columnA = new Column();  

    for (var iterator=1; iterator<elevator_amount; iterator++) {
        var newElevator = new Elevator(iterator, "idle", 10, null);     
    }

    var elevatorA = new Elevator(1, "idle", 10, null);     
    var elevatorB = new Elevator(2, "idle", 3, null);
    console.log('elevatorA.floor is: ' + elevatorA.floor);
    console.log('elevatorA.direction is: ' + elevatorA.direction);
    console.log('elevatorA.destination is: ' + elevatorA.destination);
    console.log('elevatorA.id is: ' + elevatorA.id);
    console.log('elevatorB.floor is: ' + elevatorB.floor);
    console.log('elevatorB.direction is: ' + elevatorB.direction);
    console.log('elevatorB.destination is: ' + elevatorB.destination);
    console.log('elevatorB.id is: ' + elevatorB.id);
    
    // Initiate columnA.elevatorList    
    columnA.elevatorList.push("elevatorA");      
    columnA.elevatorList.push("elevatorB");   
    
    /* Someone is on the 1st floor and requests the 6th floor. */
    //var elevator = columnA.requestElevator(1, "up"); 
    /* var elevatorSelected = columnA.requestElevator(1, "up");
    if (elevatorSelected="elevatorA") {
        elevatorA.requestFloor(elevatorSelected, 6);  
    }
    else {
        elevatorB.requestFloor(elevatorSelected, 6);  
    }
    console.log('columnA.elevatorList is: ' + columnA.elevatorList);
    console.log('elevatorA.floor is: ' + elevatorA.floor);
    console.log('elevatorA.direction is: ' + elevatorA.direction);
    console.log('elevatorA.destination is: ' + elevatorA.destination);
    console.log('elevatorA.id is: ' + elevatorA.id);
    console.log('elevatorB.floor is: ' + elevatorB.floor);
    console.log('elevatorB.direction is: ' + elevatorB.direction);
    console.log('elevatorB.destination is: ' + elevatorB.destination);
    console.log('elevatorB.id is: ' + elevatorB.id);
    
    /* Elevator B is expected to be sent.*/

    /*2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator B should be sent.
    CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, up AND 3 */
    /*elevatorSelected = Column.requestElevator(3, "up");
    Elevator.requestFloor(elevatorSelected, 5);  
    console.log('columnA.elevatorList is: ' + columnA.elevatorList);
    console.log('elevatorA.floor is: ' + elevatorA.floor);
    console.log('elevatorA.direction is: ' + elevatorA.direction);
    console.log('elevatorA.destination is: ' + elevatorA.destination);
    console.log('elevatorA.id is: ' + elevatorA.id);
    console.log('elevatorB.floor is: ' + elevatorB.floor);
    console.log('elevatorB.direction is: ' + elevatorB.direction);
    console.log('elevatorB.destination is: ' + elevatorB.destination);
    console.log('elevatorB.id is: ' + elevatorB.id);

    /*Finally, a third person is at floor 9 and wants to go down to the 2nd floor. 
    CALL columnAddFloorRequestList with FloorUpRequestList, FloorDownRequestList, down AND 9*/
    /*elevatorSelected = Column.requestElevator(9, "down");
    Elevator.requestFloor(elevatorSelected, 2);  
    console.log('columnA.elevatorList is: ' + columnA.elevatorList);
    console.log('elevatorA.floor is: ' + elevatorA.floor);
    console.log('elevatorA.direction is: ' + elevatorA.direction);
    console.log('elevatorA.destination is: ' + elevatorA.destination);
    console.log('elevatorA.id is: ' + elevatorA.id);
    console.log('elevatorB.floor is: ' + elevatorB.floor);
    console.log('elevatorB.direction is: ' + elevatorB.direction);
    console.log('elevatorB.destination is: ' + elevatorB.destination);
    console.log('elevatorB.id is: ' + elevatorB.id);

   // Elevator A should be sent.
}
//scenario2()


/*
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

'-------------------------------------------------------Testing Section------------------------------------------------------------*/