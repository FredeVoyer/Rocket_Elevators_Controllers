using System;
using System.Linq; // for array min, max, sum...
using System.Collections;
using System.Collections.Generic; 

namespace Rocket_Elevators_Controllers
{
    class Commercial_Controller //Program
    {
        // Define class Elevator
        class Elevator 
        {
            public int minFloor;
            public int maxFloor;
            public int id;
            public string status;
            public string direction;
            public int floor;
            public int origin;
            public int maxWeight;
            public int? destination;
            public int? distance;
            public string moving;
            public int priority;
          //object[] floorButtonList; 

            // Create a class constructor with multiple parameters 
            public Elevator(int _id, int _minFloor, int _maxFloor)
            {
                minFloor = _minFloor;
                maxFloor= _maxFloor;
                id = _id;
                status = "online"; // online or offline
                direction = "idle"; // null (idle not moving if destination is null else moving), up, down (moving for both)
                floor= 1; // floor domain (1, minFloor,...,maxFloor)
                origin= 1; // floor domain (1, minFloor,...,maxFloor)
                maxWeight= 2500; // pounds
                destination = null; // floor domain (1, minFloor,...,maxFloor) and null if Direction to null (idle, not moving; else moving)
                distance = null;
                moving = "no";
                priority = 99;

               //floorButtonList = [];

                // Create floorButton objects
                /*for (int i = _minFloor; i <= _maxFloor; i++)
                {
                    FloorButton newFloorButton = new FloorButton();
                    floorButtonList.Add(newFloorButton);                
                }*/ 
            }  
            public void requestFloor(int elevator, int requestedFloor) {
                this.moving = "no";
                // Determine the elevator direction and move it accordingly
                if (this.floor < requestedFloor) {
                    this.direction = "up";
                    Console.WriteLine("elevator" + elevator + " direction is: " + this.direction);
                    // Move the elevator to the requested floor
                    this.destination = requestedFloor;
                    this.moving = "yes";
                    while (this.floor <= requestedFloor) {
                        Console.WriteLine("elevator" + elevator + " floor is: " + this.floor);
                        this.floor++;
                        // floor 0 doesnt exist, transition from -1 to 1
                        if (this.floor == 0) {
                            this.floor = 1;
                        }
                    }
                    this.floor--;
                    this.moving = "no";
                }
                else if (this.floor > requestedFloor) {
                    this.direction = "down";
                    Console.WriteLine("elevator" + elevator + " direction is: " + this.direction);
                    // Move the elevator to the requested floor
                    this.moving = "yes";
                    this.destination = requestedFloor;
                    while (this.floor >= requestedFloor) {
                        Console.WriteLine("elevator" + elevator + " floor is: " + this.floor);
                        this.floor--;
                        // floor 0 doesnt exist, transition from 1 to -1
                        if (this.floor == 0) {
                            this.floor = -1;
                        }
                    }
                    this.floor++;
                    // adjust bug display 0 end of reuqest floor
                    if (this.floor == 0) {
                        this.floor = 1;
                    }
                    this.moving = "no";
                }
                Console.WriteLine("elevator" + elevator + " is stopped at floor: " + this.floor);
                Console.WriteLine("Floor button light turns off");
                Console.WriteLine("elevator" + elevator + " opens doors" );
                //openDoor() call there 
                //floorButtonNotPressed() call there  
                //closeDoor() call there  
                Console.WriteLine("elevator" + elevator + " closes doors" );
            }
        }

        // Define class Column
        class Column 
        {
            public int id;
            public int elevatorPerColAmount;
            public int minFloor;
            public int maxFloor;
            public List<Elevator> elevatorList;
            public List<int> priorityList;

            public List<Elevator> potentialElevatorsList;
            public List<Elevator> nonPotentialElevatorsList;

            //object[] UpButtonList;
            //object[] DownButtonList;

            // Create a class constructor with multiple parameters 
            public Column(int _id, int _elevatorPerColAmount, int _minFloor, int _maxFloor)
            {
                id = _id;
                elevatorPerColAmount = _elevatorPerColAmount;
                minFloor = _minFloor;
                maxFloor= _maxFloor;
                elevatorList = new List<Elevator>();
                priorityList = new List<int>();
                potentialElevatorsList = new List<Elevator>();
                nonPotentialElevatorsList = new List<Elevator>();

                //UpButtonList = [];
                //DownButtonList = [];

                // Create elevator objects potentialElevatorsList
                for (int i = 0; i < _elevatorPerColAmount; i++)
                {
                    Elevator newElevator = new Elevator(i+1, _minFloor, _maxFloor);
                    elevatorList.Add(newElevator);                
                }
            }
            // Choose an elevator depending on its movement (destination), direction and distance to the floor requested (and the direction requested)
            public int findElevator(int requestedFloor, string direction)
            {
                // Identify real min and max floor by including the main floor (1) of the elevator (and column)
                int realMaxFloor = this.maxFloor;
                int realMinFloor = 1;
                if (this.id == 1) {
                    realMaxFloor = 1;
                }
                if (this.id == 1) {
                    realMinFloor = this.minFloor;
                } 
                // Set the priority for each elevator depending on the request floor and put it in a list
                for (int  i = 0; i < this.elevatorPerColAmount; i++) {
                    // Set priority 2 to elevator not moving and without destination (idle)
                    if (this.elevatorList[i].direction=="idle") {
                        this.elevatorList[i].priority=2;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                    // Set priority 1 to elevator moving in the same direction as requested and floor reuqested is in the way of his run
                    else if (this.elevatorList[i].direction=="up" && requestedFloor >= this.elevatorList[i].floor && direction =="up") {
                        this.elevatorList[i].priority=1;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                    else if (this.elevatorList[i].direction=="down" && requestedFloor <= this.elevatorList[i].floor && direction =="down") {
                        this.elevatorList[i].priority=1;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                    // Set priority 3 to elevator moving to the min or max floor so it can change direction then
                    else if (this.elevatorList[i].direction=="up" && requestedFloor >= this.elevatorList[i].floor && direction =="down" && this.elevatorList[i].destination==realMaxFloor) {
                        this.elevatorList[i].priority=3;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                    else if (this.elevatorList[i].direction=="down" && requestedFloor <= this.elevatorList[i].floor && direction =="up" && this.elevatorList[i].destination==realMinFloor) {
                        this.elevatorList[i].priority=3;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                    // Default priority 99, remaining cases elevator going in different direction than requested
                    else  {
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                }

                // Identify the highest priority to identify the potential elevators
                this.priorityList.Sort();
                int minPriority = this.priorityList[0];

                // Identify potential elevators depending on their priority request and create list
                for (int  i = 0; i < this.elevatorPerColAmount; i++) {
                    if (this.elevatorList[i].priority==minPriority) {
                        this.potentialElevatorsList.Add(this.elevatorList[i]);
                    }
                    else  {
                        this.nonPotentialElevatorsList.Add(this.elevatorList[i]);
                    }
                }

                // Compute distance between each potential elevator floor and floor requested 
                List<int> elevatorDistanceList = new List<int>();
                for (int i = 0; i < this.potentialElevatorsList.Count; i++) {
                    elevatorDistanceList.Add(Math.Abs(this.potentialElevatorsList[i].floor - requestedFloor));
                    this.potentialElevatorsList[i].distance = Math.Abs(this.potentialElevatorsList[i].floor - requestedFloor);
                }
                // Identify the smallest distance
                elevatorDistanceList.Sort();
                int minDistance = elevatorDistanceList[0];
                // Identify closest elevator (only one)
                int idElevatorSelected=0;
                for (int i = 0; i < this.potentialElevatorsList.Count; i++) {
                    if (this.potentialElevatorsList[i].distance == minDistance) {
                        // ElevatorSelected = this.elevatorList[i];
                        idElevatorSelected = this.potentialElevatorsList[i].id;
                        return this.potentialElevatorsList[i].id;//idElevatorSelected;
                        //break; // select only one elevator
                    }
                }
                return idElevatorSelected;
            } 

            public void updateFloorDirectionDestinationMoving(Elevator elevator, int floor, string direction, int destination, string moving) {
                elevator.floor= floor;
                elevator.direction = direction;
                elevator.destination = destination;
                elevator.moving = moving;
            }
            public int requestElevator(int requestedFloor, string direction) {
                //upButtonPressed() call there or in scenarios (if direction)
                //downButtonPressed() call there or in scenarios (if direction)

                int idElevatorSelected = this.findElevator(requestedFloor, direction);
                Console.WriteLine("Elevator selected is: elevator" + this.elevatorList[idElevatorSelected-1].id );
                // Determine the elevator direction and move it accordingly
                    // move up
                if (this.elevatorList[idElevatorSelected-1].floor < requestedFloor) {
                    this.elevatorList[idElevatorSelected-1].direction = "up";
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " direction is: " + this.elevatorList[idElevatorSelected-1].direction);
                    // Move the elevator to the requested floor (up)
                    while (this.elevatorList[idElevatorSelected-1].floor <= requestedFloor) {
                        Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " floor is: " + this.elevatorList[idElevatorSelected-1].floor);
                        this.elevatorList[idElevatorSelected-1].moving = "yes";
                        this.elevatorList[idElevatorSelected-1].floor++;
                        // floor 0 doesnt exist, transition from -1 to 1
                        if (this.elevatorList[idElevatorSelected-1].floor == 0) {
                            this.elevatorList[idElevatorSelected-1].floor = 1;
                        }
                    }
                    this.elevatorList[idElevatorSelected-1].floor--;
                    this.elevatorList[idElevatorSelected-1].moving = "no";
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " is stopped at floor: " + this.elevatorList[idElevatorSelected-1].floor);
                    //upButtonNotPressed() call there or in requestElevator (if direction)
                    //downButtonNotPressed() call there or in requestElevator (if direction)
                    Console.WriteLine("Call button light turns off");

                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " opens doors" );
                    //openDoor() call there 
                    //floorButtonPressed() call there or in scenario 
                    //closeDoor() call there  
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " closes doors" );              
                }
                    // move down
                else if (this.elevatorList[idElevatorSelected-1].floor > requestedFloor) {
                    this.elevatorList[idElevatorSelected-1].direction = "down";
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " direction is: " + this.elevatorList[idElevatorSelected-1].direction);
                    // Move the elevator to the requested floor (down)
                    //this.elevatorList[idElevatorSelected-1].destination = requestedFloor;
                    while (this.elevatorList[idElevatorSelected-1].floor >= requestedFloor) {
                        Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " floor is: " + this.elevatorList[idElevatorSelected-1].floor);
                        this.elevatorList[idElevatorSelected-1].moving = "yes";
                        this.elevatorList[idElevatorSelected-1].floor--;
                        // floor 0 doesnt exist, transition from 1 to -1
                        if (this.elevatorList[idElevatorSelected-1].floor == 0) {
                            this.elevatorList[idElevatorSelected-1].floor = -1;
                        }
                    }
                    this.elevatorList[idElevatorSelected-1].floor++;
                    // adjust bug display 0 end of reuqest floor
                    if (this.elevatorList[idElevatorSelected-1].floor == 0) {
                        this.elevatorList[idElevatorSelected-1].floor = 1;
                    }

                    this.elevatorList[idElevatorSelected-1].moving = "no";
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " is stopped at floor: " + this.elevatorList[idElevatorSelected-1].floor);
                    //upButtonNotPressed() call there or in requestElevator (if direction)
                    //downButtonNotPressed() call there or in requestElevator (if direction)
                    Console.WriteLine("Call button light turns off");

                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " opens doors" );
                    //openDoor() call there 
                    //floorButtonPressed() call there or in scenario 
                    //closeDoor() call there  
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " closes doors" );
                }
                    // elevator is on floor requested 
                else {
                    Console.WriteLine("Call button light turns off");

                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " opens doors" );
                    //openDoor() call there 
                    //floorButtonPressed() call there or in scenario 
                    //closeDoor() call there  
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " closes doors" );
                }
                return this.elevatorList[idElevatorSelected-1].id; //elevator
            }
        }  
        
        // Define class Battery
        class Battery 
        {
            public int columnAmount;
            public int elevatorPerColAmount;
            public int [] minFloorColumnList;
            public int [] maxFloorColumnList;
            public List<Column> columnList;

            // Create a class constructor Battery with multiple parameters
            public Battery(int _columnAmount, int _elevatorPerColAmount, int [] _minFloorColumnList, int [] _maxFloorColumnList)
            {
                columnAmount = _columnAmount;
                elevatorPerColAmount = _elevatorPerColAmount;
                minFloorColumnList = _minFloorColumnList;
                maxFloorColumnList= _maxFloorColumnList;
                columnList = new List<Column>();

                // Create column objects
                for (int i = 0; i < _columnAmount; i++)
                {
                    Column newColumn = new Column(i+1, _elevatorPerColAmount, _minFloorColumnList[i], _maxFloorColumnList[i]);
                    columnList.Add(newColumn);                
                } 
            }  
        }

        static void Scenario1() 
        {
            /*Scenario 1: 
                Elevator B1 at 20th floor going to the 5th floor
                Elevator B2 at 3rd floor going to the 15th floor
                Elevator B3 at 13th floor going to RC
                Elevator B4 at 15th floor going to the 2nd floor
                Elevator B5 at 6th floor going to RC
                */

	        // Create instance of battery
                // Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            // Set the elevator parameters: floor, direction, destination and moving)
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[0], 20, "down", 5, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[1], 3, "up", 15, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[2], 13, "down", 1, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[3], 15, "down", 2, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[4], 6, "down", 1, "yes");

            // Display the beginning of the sceanrio
	        Console.WriteLine("column id is: " + battery1.columnList[1].id);

            Console.WriteLine("elevator1.floor is " + battery1.columnList[1].elevatorList[0].floor + ", direction is " + battery1.columnList[1].elevatorList[0].direction + " and destination is " + battery1.columnList[1].elevatorList[0].destination);
            Console.WriteLine("elevator2.floor is " + battery1.columnList[1].elevatorList[1].floor + ", direction is " + battery1.columnList[1].elevatorList[1].direction + " and destination is " + battery1.columnList[1].elevatorList[1].destination);
            Console.WriteLine("elevator3.floor is " + battery1.columnList[1].elevatorList[2].floor + ", direction is " + battery1.columnList[1].elevatorList[2].direction + " and destination is " + battery1.columnList[1].elevatorList[2].destination);
            Console.WriteLine("elevator4.floor is " + battery1.columnList[1].elevatorList[3].floor + ", direction is " + battery1.columnList[1].elevatorList[3].direction + " and destination is " + battery1.columnList[1].elevatorList[3].destination);
            Console.WriteLine("elevator5.floor is " + battery1.columnList[1].elevatorList[4].floor + ", direction is " + battery1.columnList[1].elevatorList[4].direction + " and destination is " + battery1.columnList[1].elevatorList[4].destination);
              
            /* Someone at RC wants to go to the 20th floor. */
	        Console.WriteLine("Up button on floor 1 of column 2 is pressed and button light turns on");
            int idElevatorSelected =  battery1.columnList[1].requestElevator(1, "up");
            //upButtonPressed() call there or in requestElevator (if direction)

	        Console.WriteLine("Floor 20 button light turns on");
            battery1.columnList[1].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 20);  
           //floorButtonPressed() call there or in requestFloor (if direction)
            
            /* Elevator B5 is expected to be sent.*/
        }

        static void Scenario2() 
        {
            /*Scenario 2: 
                Elevator C1 at RC going to the 21st floor (not yet departed)
                Elevator C2 at 23rd floor going to the 28th floor
                Elevator C3 at 33rd floor going to RC
                Elevator C4 at 40th floor going to the 24th floor
                Elevator C5 at 39th floor going to RC
                */

	        // Create instance of battery
                // Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            // Set the elevator parameters: floor, direction, destination and moving)
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[0], 1, "up", 21, "no");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[1], 23, "up", 28, "yes");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[2], 33, "down", 1, "yes");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[3], 40, "down", 24, "yes");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[4], 39, "down", 1, "yes");

            // Display the beginning of the sceanrio
	        Console.WriteLine("column id is: " + battery1.columnList[2].id);

            Console.WriteLine("elevator1.floor is " + battery1.columnList[2].elevatorList[0].floor + ", direction is " + battery1.columnList[2].elevatorList[0].direction + " and destination is " + battery1.columnList[2].elevatorList[0].destination);
            Console.WriteLine("elevator2.floor is " + battery1.columnList[2].elevatorList[1].floor + ", direction is " + battery1.columnList[2].elevatorList[1].direction + " and destination is " + battery1.columnList[2].elevatorList[1].destination);
            Console.WriteLine("elevator3.floor is " + battery1.columnList[2].elevatorList[2].floor + ", direction is " + battery1.columnList[2].elevatorList[2].direction + " and destination is " + battery1.columnList[2].elevatorList[2].destination);
            Console.WriteLine("elevator4.floor is " + battery1.columnList[2].elevatorList[3].floor + ", direction is " + battery1.columnList[2].elevatorList[3].direction + " and destination is " + battery1.columnList[2].elevatorList[3].destination);
            Console.WriteLine("elevator5.floor is " + battery1.columnList[2].elevatorList[4].floor + ", direction is " + battery1.columnList[2].elevatorList[4].direction + " and destination is " + battery1.columnList[2].elevatorList[4].destination);
              
            /* Someone at RC wants to go to the 36th floor. */
	        Console.WriteLine("Up button on floor 1 of column 3 is pressed and button light turns on");
            int idElevatorSelected =  battery1.columnList[2].requestElevator(1, "up");
            //upButtonPressed() call there or in requestElevator (if direction)

	        Console.WriteLine("Floor 36 button light turns on");
            battery1.columnList[2].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 21);  
            battery1.columnList[2].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 36);  
           //floorButtonPressed() call there or in requestFloor (if direction)
            
            /* Elevator C1 is expected to be sent.*/
        }

        static void Scenario3() 
        {
            /*Scenario 3: 
            Elevator D1 at 58th going to RC
            Elevator D2 at 50th floor going to the 60th floor
            Elevator D3 at 46th floor going to the 58th floor
            Elevator D4 at RC going to the 54th floor
            Elevator D5 at 60th floor going to RC
                */

	        // Create instance of battery
                // Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            // Set the elevator parameters: floor, direction, destination and moving)
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[0], 58, "down", 1, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[1], 50, "up", 60, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[2], 46, "up", 58, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[3], 1, "up", 54, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[4], 60, "down", 1, "yes");

            // Display the beginning of the sceanrio
	        Console.WriteLine("column id is: " + battery1.columnList[3].id);

            Console.WriteLine("elevator1.floor is " + battery1.columnList[3].elevatorList[0].floor + ", direction is " + battery1.columnList[3].elevatorList[0].direction + " and destination is " + battery1.columnList[3].elevatorList[0].destination);
            Console.WriteLine("elevator2.floor is " + battery1.columnList[3].elevatorList[1].floor + ", direction is " + battery1.columnList[3].elevatorList[1].direction + " and destination is " + battery1.columnList[3].elevatorList[1].destination);
            Console.WriteLine("elevator3.floor is " + battery1.columnList[3].elevatorList[2].floor + ", direction is " + battery1.columnList[3].elevatorList[2].direction + " and destination is " + battery1.columnList[3].elevatorList[2].destination);
            Console.WriteLine("elevator4.floor is " + battery1.columnList[3].elevatorList[3].floor + ", direction is " + battery1.columnList[3].elevatorList[3].direction + " and destination is " + battery1.columnList[3].elevatorList[3].destination);
            Console.WriteLine("elevator5.floor is " + battery1.columnList[3].elevatorList[4].floor + ", direction is " + battery1.columnList[3].elevatorList[4].direction + " and destination is " + battery1.columnList[3].elevatorList[4].destination);
              
            /* Someone at 54th floor wants to go to RC. */
	        Console.WriteLine("Down button on floor 54 of column 4 is pressed and button light turns on");
            int idElevatorSelected =  battery1.columnList[3].requestElevator(54, "down");
            //downButtonPressed() call there or in requestElevator (if direction)

	        Console.WriteLine("Floor 1 (L) button light turns on");
            battery1.columnList[3].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1);  
           //floorButtonPressed() call there or in requestFloor (if direction)
            
            /* Elevator D1 is expected to be sent.*/
        }

        static void Scenario4() 
        {
            /*Scenario 4: 
                Elevator A1 “Idle” at SS4
                Elevator A2 “Idle” at RC
                Elevator A3 at SS3 going to SS5
                Elevator A4 at SS6 going to RC
                Elevator A5 at SS1 going to SS6
                */

	        // Create instance of battery
                // Set the parameters: number of columns, number of elevators per columns, min and max loor of each column (excluding L)
            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            // Set the elevator parameters: floor, direction, destination and moving)
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[0], -4, "idle", -4, "no");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[1], 1, "idle", 1, "no");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[2], -3, "down", -5, "yes");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[3], -6, "up", 1, "yes");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[4], -1, "down", -6, "yes");

             // Display the beginning of the sceanrio
	        Console.WriteLine("column id is: " + battery1.columnList[0].id);

            Console.WriteLine("elevator1.floor is " + battery1.columnList[0].elevatorList[0].floor + ", direction is " + battery1.columnList[0].elevatorList[0].direction + " and destination is " + battery1.columnList[0].elevatorList[0].destination);
            Console.WriteLine("elevator2.floor is " + battery1.columnList[0].elevatorList[1].floor + ", direction is " + battery1.columnList[0].elevatorList[1].direction + " and destination is " + battery1.columnList[0].elevatorList[1].destination);
            Console.WriteLine("elevator3.floor is " + battery1.columnList[0].elevatorList[2].floor + ", direction is " + battery1.columnList[0].elevatorList[2].direction + " and destination is " + battery1.columnList[0].elevatorList[2].destination);
            Console.WriteLine("elevator4.floor is " + battery1.columnList[0].elevatorList[3].floor + ", direction is " + battery1.columnList[0].elevatorList[3].direction + " and destination is " + battery1.columnList[0].elevatorList[3].destination);
            Console.WriteLine("elevator5.floor is " + battery1.columnList[0].elevatorList[4].floor + ", direction is " + battery1.columnList[0].elevatorList[4].direction + " and destination is " + battery1.columnList[0].elevatorList[4].destination);
              
            /* Someone at SS3 wants to go to RC. */
	        Console.WriteLine("Up button on floor -3 (SS3) of column 1 is pressed and button light turns on");
            int idElevatorSelected =  battery1.columnList[0].requestElevator(-3, "up");
            //upButtonPressed() call there or in requestElevator (if direction)

	        Console.WriteLine("Floor 1 (L) button light turns on");
            battery1.columnList[0].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1);  
            //floorButtonPressed() call there or in requestFloor (if direction)
            
            /* Elevator A4 is expected to be sent.*/
        }

        static void Main(string[] args)
        {
            Scenario1();
            //Scenario2();
            //Scenario3();
            //Scenario4();
        }
    }
}


