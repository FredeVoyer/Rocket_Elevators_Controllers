//JS code for residential building elevators controller 

class Column {
    constructor() {
    this.ElevatorList = [];
    }
    static RequestElevator(RequestedFloor, Direction) {
        // Compute distance between elevator floor and floor requested
        ElevatorA.Distance = Math.abs(ElevatorA.Floor-RequestedFloor);
        ElevatorB.Distance = Math.abs(ElevatorB.Floor-RequestedFloor);
        // Determine the closest elevator for scenario 1 and move it to the requested floor
        if (ElevatorA.Direction === 'idle' && ElevatorB.Direction === 'idle') {
            if (ElevatorA.Distance <= ElevatorB.Distance) {
                console.log('Elevator selected is : ElevatorA' );
                // Determine the elevator direction and move it accordingly
                if (ElevatorA.Floor < RequestedFloor) {
                    ElevatorA.Direction = "up";
                    console.log('ElevatorA direction is: ' + ElevatorA.Direction);
                    // Move the elevator to the requested floor
                    //ElevatorA.Destination = RequestedFloor;
                    for (var i =ElevatorA.Floor; i <= RequestedFloor; i++) {
                        console.log('ElevatorA floor is: ' + ElevatorA.Floor);
                        ElevatorA.Floor=i;
                    }
                }
                else if (ElevatorA.Floor > RequestedFloor) {
                    ElevatorA.Direction = "down";
                    console.log('ElevatorA direction is: ' + ElevatorA.Direction);
                    // Move the elevator to the requested floor
                    //ElevatorA.Destination = RequestedFloor;
                    for (var i =ElevatorA.Floor; i >= RequestedFloor; i--) {
                        console.log('ElevatorA floor is: ' + ElevatorA.Floor);
                        ElevatorA.Floor=i;
                    }
                }
                return "ElevatorA";
            }
            else {
                console.log('Elevator selected is : ElevatorB');
                // Determine the elevator direction and move it accordingly
                if(ElevatorB.Floor < RequestedFloor) {
                    ElevatorB.Direction = "up";
                    console.log('ElevatorB direction is: ' + ElevatorB.Direction);
                    // Move the elevator to the requested floor
                    //ElevatorB.Destination = RequestedFloor;
                    for (var i =ElevatorB.Floor; i <= RequestedFloor; i++) {
                        console.log('ElevatorB floor is: ' + ElevatorB.Floor);
                        ElevatorB.Floor=i;
                    }
                }
                else if(ElevatorB.Floor > RequestedFloor) {
                    ElevatorB.Direction = "down";
                    console.log('ElevatorB direction is: ' + ElevatorB.Direction);
                    // Move the elevator to the requested floor
                    //ElevatorB.Destination = RequestedFloor;
                    for (var i =ElevatorB.Floor; i >= RequestedFloor; i--) {
                        console.log('ElevatorB floor is: ' + ElevatorB.Floor);
                        ElevatorB.Floor=i;
                    }
                }
                return "ElevatorB";
            }
        }    
    
    }
}

// definition of the class Elevator
class Elevator {
    constructor(_id, _direction, _floor, _destination) {
    this.id = _id;
    this.Direction = _direction; // null (idle not moving if destination is null else moving), up, down (moving for both)
    this.Floor= _floor; // floor domain (1,...,10)
    this.Destination = _destination; // floor domain (1,...,10) and null if Direction to null (idle, not moving; else moving)
    this.FloorRequestList= [];
    }
    static RequestFloor(Elevator, RequestedFloor) {
        console.log('RequestFloor method, Elevator is: ' + Elevator);
        console.log(Elevator + ' is stopped at floor: ' + this.Floor);
        // Determine the elevator direction and move it accordingly
        if (this.Floor < RequestedFloor) {
            this.Direction = "up";
            console.log(Elevator + ' direction is: ' + this.Direction);
            // Move the elevator to the requested floor
            //this.Destination = RequestedFloor;
            while (this.Floor <= RequestedFloor) {
                console.log(Elevator + ' floor is: ' + this.Floor);
                this.Floor++;
            }
        }
        else if (this.Floor > RequestedFloor) {
            this.Direction = "down";
            console.log(Elevator + ' direction is: ' + this.Direction);
            // Move the elevator to the requested floor
            //this.Destination = RequestedFloor;
            while (this.Floor >= RequestedFloor) {
                console.log(Elevator + ' floor is: ' + this.Floor);
                this.Floor--;
            }
        }
        console.log(Elevator + ' final floor is: ' + this.Floor);
        // if final value not good ->  change condition (remove=)
    }
}

// Initiate the scenario in the documentation
var column_amount = 1;
var elevator_amount = 2;
var floor_amount = 10;

var ColumnA = new Column();  

/*var ElevatorA = new Elevator();     
var ElevatorB = new Elevator();     */

/*-------------------------------------------------------Testing Section------------------------------------------------------------'
- Scenario 1:
    Elevator A 
        ElevatorDirection is Idle 
        ElevatorFloor is 2 
    Elevator B is Idle at floor 6
        ElevatorDirection is Idle 
        ElevatorFloor is 6 */
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


   /* Elevator A is expected to be sent.

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

'-------------------------------------------------------Testing Section------------------------------------------------------------*/