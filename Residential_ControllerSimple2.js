//JS code for residential building elevators controller 

class Column {
    constructor() {
    this.elevatorList = [];
    }
    static requestElevator(requestedFloor, direction) {
        // Compute distance between elevator floor and floor requested
        elevatorA.distance = Math.abs(elevatorA.floor-requestedFloor);
        elevatorB.distance = Math.abs(elevatorB.floor-requestedFloor);
        // Determine the closest elevator for scenario 1 and move it to the requested floor
        if (elevatorA.direction === 'idle' && elevatorB.direction === 'idle') {
            if (elevatorA.distance <= elevatorB.distance) {
                console.log('Elevator selected is : elevatorA' );
                // Determine the elevator direction and move it accordingly
                if (elevatorA.floor < requestedFloor) {
                    elevatorA.direction = "up";
                    console.log('elevatorA direction is: ' + elevatorA.direction);
                    // Move the elevator to the requested floor
                    //elevatorA.destination = requestedFloor;
                    for (var i =elevatorA.floor; i <= requestedFloor; i++) {
                        console.log('elevatorA floor is: ' + elevatorA.floor);
                        elevatorA.floor=i;
                    }
                }
                else if (elevatorA.floor > requestedFloor) {
                    elevatorA.direction = "down";
                    console.log('elevatorA direction is: ' + elevatorA.direction);
                    // Move the elevator to the requested floor
                    //elevatorA.destination = requestedFloor;
                    for (var i =elevatorA.floor; i >= requestedFloor; i--) {
                        console.log('elevatorA floor is: ' + elevatorA.floor);
                        elevatorA.floor=i;
                    }
                }
                return "elevatorA";//"elevatorA" "ElevatorA";
            }
            else {
                console.log('Elevator selected is : elevatorB');
                // Determine the elevator direction and move it accordingly
                if(elevatorB.floor < requestedFloor) {
                    elevatorB.direction = "up";
                    console.log('elevatorB direction is: ' + elevatorB.direction);
                    // Move the elevator to the requested floor
                    //elevatorB.destination = requestedFloor;
                    for (var i =elevatorB.floor; i <= requestedFloor; i++) {
                        console.log('elevatorB floor is: ' + elevatorB.floor);
                        elevatorB.floor=i;
                    }
                }
                else if(elevatorB.floor > requestedFloor) {
                    elevatorB.direction = "down";
                    console.log('elevatorB direction is: ' + elevatorB.direction);
                    // Move the elevator to the requested floor
                    //elevatorB.destination = requestedFloor;
                    for (var i =elevatorB.floor; i >= requestedFloor; i--) {
                        console.log('elevatorB floor is: ' + elevatorB.floor);
                        elevatorB.floor=i;
                    }
                }
                return "elevatorB";//"elevatorB" "ElevatorB";
            }
        }    
    
    }
}

// definition of the class Elevator
class Elevator {
    constructor(_id, _direction, _floor, _destination) {
    this.id = _id;
    this.direction = _direction; // null (idle not moving if destination is null else moving), up, down (moving for both)
    this.floor= _floor; // floor domain (1,...,10)
    this.destination = _destination; // floor domain (1,...,10) and null if Direction to null (idle, not moving; else moving)
    this.floorRequestList= [];
    }
    static requestFloor(elevator, requestedFloor) {
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
}

// Initiate the scenario in the documentation
var column_amount = 1;
var elevator_amount = 2;
var floor_amount = 10;

var columnA = new Column();  

/*var ElevatorA = new Elevator();     
var ElevatorB = new Elevator();     */
var elevatorA = new Elevator(1, "idle", 2, null);     
var elevatorB = new Elevator(2, "idle", 6, null);

/*-------------------------------------------------------Testing Section------------------------------------------------------------'
- Scenario 1:
    Elevator A 
        ElevatorDirection is Idle 
        ElevatorFloor is 2 
    Elevator B is Idle at floor 6
        ElevatorDirection is Idle 
        ElevatorFloor is 6 */
function scenario1() {
    // Initiate the scenario in the documentation
    var column_amount = 1;
    var elevator_amount = 2;
    var floor_amount = 10;

    var columnA = new Column();  

    var elevatorA = new Elevator(1, "idle", 2, null);     
    var elevatorB = new Elevator(2, "idle", 6, null);
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
    
    /* Someone is on floor 3 and wants to go to the 7th floor. */
    //var elevator = columnA.requestElevator(3, "up");
    var elevatorSelected = Column.requestElevator(3, "up");
    Elevator.requestFloor(elevatorSelected, 7);  
    console.log('columnA.elevatorList is: ' + columnA.elevatorList);
    console.log('elevatorA.floor is: ' + elevatorA.floor);
    console.log('elevatorA.direction is: ' + elevatorA.direction);
    console.log('elevatorA.destination is: ' + elevatorA.destination);
    console.log('elevatorA.id is: ' + elevatorA.id);
    console.log('elevatorB.floor is: ' + elevatorB.floor);
    console.log('elevatorB.direction is: ' + elevatorB.direction);
    console.log('elevatorB.destination is: ' + elevatorB.destination);
    console.log('elevatorB.id is: ' + elevatorB.id);
    
    
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
function scenario2() {
    // Initiate the scenario in the documentation
    var column_amount = 1;
    var elevator_amount = 2;
    var floor_amount = 10;

    var ColumnA = new Column();  

    var ElevatorA = new Elevator(1, "idle", 2, null);     
    var ElevatorB = new Elevator(2, "idle", 6, null);
    console.log('ElevatorA.Floor is: ' + ElevatorA.Floor);
    console.log('ElevatorA.Direction is: ' + ElevatorA.Direction);
    console.log('ElevatorA.Destination is: ' + ElevatorA.Destination);
    console.log('ElevatorA.id is: ' + ElevatorA.id);
    console.log('ElevatorB.Floor is: ' + ElevatorB.Floor);
    console.log('ElevatorB.Direction is: ' + ElevatorB.Direction);
    console.log('ElevatorB.Destination is: ' + ElevatorB.Destination);
    console.log('ElevatorB.id is: ' + ElevatorB.id);
    
    // Initiate ColumnA.ElevatorList    
    ColumnA.ElevatorList.push("ElevatorA");      
    ColumnA.ElevatorList.push("ElevatorB");   
    
    /* Someone is on floor 3 and wants to go to the 7th floor. */
    //var Elevator = ColumnA.RequestElevator(3, "up");
    var ElevatorSelected = Column.RequestElevator(3, "up");
    Elevator.RequestFloor(ElevatorSelected, 7);  
    console.log('ColumnA.ElevatorList is: ' + ColumnA.ElevatorList);
    console.log('ElevatorA.Floor is: ' + ElevatorA.Floor);
    console.log('ElevatorA.Direction is: ' + ElevatorA.Direction);
    console.log('ElevatorA.Destination is: ' + ElevatorA.Destination);
    console.log('ElevatorA.id is: ' + ElevatorA.id);
    console.log('ElevatorB.Floor is: ' + ElevatorB.Floor);
    console.log('ElevatorB.Direction is: ' + ElevatorB.Direction);
    console.log('ElevatorB.Destination is: ' + ElevatorB.Destination);
    console.log('ElevatorB.id is: ' + ElevatorB.id);
    
    
       /* Elevator A is expected to be sent.*/
    
}
//scenario2()
/*
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

'-------------------------------------------------------Testing Section------------------------------------------------------------*/