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
                Console.WriteLine("requestFloor method, elevator is: elevator" + elevator);
                this.moving = "no";
                Console.WriteLine("elevator" + elevator + " is stopped at floor: " + this.floor);
                //upButtonNotPressed() call there or in requestElevator (if direction)
                //downButtonNotPressed() call there or in requestElevator (if direction)

                Console.WriteLine("elevator" + elevator + " opens doors" );
                //openDoor() call there 
                //floorButtonPressed() call there or in scenario 
                //closeDoor() call there  
                Console.WriteLine("elevator" + elevator + " closes doors" );
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
                    this.moving = "no";
                }
                Console.WriteLine("elevator" + elevator + " is stopped at floor: " + this.floor);
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

            //object[] elevatorList; 
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

                //elevatorList = [];
                //UpButtonList = [];
                //DownButtonList = [];

                // Create elevator objects potentialElevatorsList
                for (int i = 0; i < _elevatorPerColAmount; i++)
                {
                    Elevator newElevator = new Elevator(i+1, _minFloor, _maxFloor);
                    elevatorList.Add(newElevator);                
                }
            }
            public int findElevator(int requestedFloor, string direction)
            {
                // Set the priority for each elevator depending on the request floor and create list
                //var potentialElevatorsList=[]; 

                //var priority; (tie it to elevator this.priority aka property) no time to test it and implement
                //var priorityList=[]; 
                for (int  i = 0; i < this.elevatorPerColAmount; i++) {
                    if (this.elevatorList[i].direction=="idle") {
                        this.elevatorList[i].priority=2;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                    else if (this.elevatorList[i].direction=="up" && requestedFloor >= this.elevatorList[i].floor && direction =="up") {
                        this.elevatorList[i].priority=1;
                        this.priorityList.Add(this.elevatorList[i].priority);
                        }
                    else if (this.elevatorList[i].direction=="down" && requestedFloor <= this.elevatorList[i].floor && direction =="down") {
                        this.elevatorList[i].priority=1;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                     else if (this.elevatorList[i].direction=="up" && requestedFloor >= this.elevatorList[i].floor && direction =="down" && this.elevatorList[i].destination==this.elevatorList[i].maxFloor) {
                        this.elevatorList[i].priority=3;
                        this.priorityList.Add(this.elevatorList[i].priority);
                        }
                    else if (this.elevatorList[i].direction=="down" && requestedFloor <= this.elevatorList[i].floor && direction =="up" && this.elevatorList[i].destination==1) {
                        this.elevatorList[i].priority=3;
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                   else  {
                        this.priorityList.Add(this.elevatorList[i].priority);
                    }
                }

                Console.WriteLine("this.priorityList0 is: " + this.priorityList[0]);
                Console.WriteLine("this.priorityList1 is: " + this.priorityList[1]);
                Console.WriteLine("this.priorityList2 is: " + this.priorityList[2]);
                Console.WriteLine("this.priorityList3 is: " + this.priorityList[3]);
                Console.WriteLine("this.priorityList4 is: " + this.priorityList[4]);

                // Identify the highest priority to identify the potential elevators
                //List<int> priorityListSorted = 
                this.priorityList.Sort();
                //int minPriority = Math.Min(this.priorityList);
                int minPriority = this.priorityList[0];
                Console.WriteLine("minPriority is: " + minPriority);


                // Identify potential elevators depending on their priority request and create list
                //var potentialElevatorsList=[]; 

                for (int  i = 0; i < this.elevatorPerColAmount; i++) {
                    if (this.elevatorList[i].priority==minPriority) {
                        this.potentialElevatorsList.Add(this.elevatorList[i]);
                        //priority=2;
                        //priorityList.Add(priority);
                    }
                   /* else if (this.elevatorList[i].direction=="up" && requestedFloor >= this.elevatorList[i].floor && direction =="up") {
                        this.potentialElevatorsList.Add(this.elevatorList[i]);
                        //priority=1;
                        //priorityList.Add(priority);
                        }
                    else if (this.elevatorList[i].direction=="down" && requestedFloor <= this.elevatorList[i].floor && direction =="down") {
                        this.potentialElevatorsList.Add(this.elevatorList[i]);
                        //priority=1;
                        //priorityList.Add(priority);
                    }*/
                    else  {
                        this.nonPotentialElevatorsList.Add(this.elevatorList[i]);
                        // adjustment for scenario3 (little trick)
                        //this.elevatorList[i].direction = "idle";
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
                } might not work but something like that like only Adding highest priority cases at the beginning in the potentialElevatorsList*/


                // Compute distance between each potential elevator floor and floor requested toto
                List<int> elevatorDistanceList = new List<int>();
                
                //int[] elevatorDistanceList;
                for (int i = 0; i < this.potentialElevatorsList.Count; i++) {
                    elevatorDistanceList.Add(Math.Abs(this.potentialElevatorsList[i].floor - requestedFloor));
                    this.potentialElevatorsList[i].distance = Math.Abs(this.potentialElevatorsList[i].floor - requestedFloor);
                }
                //Console.WriteLine("elevator1.floor is: " + battery1.columnList[1].elevatorList[0].floor);
                /*Console.WriteLine("elevatorDistanceList is: " + elevatorDistanceList);
                Console.WriteLine("elevatorDistanceList0 is: " + elevatorDistanceList[0]);*/
                /*Console.WriteLine("elevatorDistanceList1 is: " + elevatorDistanceList[1]);
                Console.WriteLine("elevatorDistanceList2 is: " + elevatorDistanceList[2]);
                Console.WriteLine("elevatorDistanceList3 is: " + elevatorDistanceList[3]);
                Console.WriteLine("elevatorDistanceList4 is: " + elevatorDistanceList[4]);*/

                // Identify the smallest distance
                //SORT ascending order distance
                elevatorDistanceList.Sort();
                // List<int> sortedNumbers = numbers.OrderBy(number => number).ToList();
                int minDistance = elevatorDistanceList[0];
                Console.WriteLine("minDistance is: " + minDistance);

                // Identify closest elevator (only one))
                int idElevatorSelected=0;
                for (int i = 0; i < this.potentialElevatorsList.Count; i++) {
                    if (this.potentialElevatorsList[i].distance == minDistance) {
                        // ElevatorSelected = this.elevatorList[i];
                        idElevatorSelected = this.potentialElevatorsList[i].id;
                        return this.potentialElevatorsList[i].id;//idElevatorSelected;
                        //break; // select only one elevator
                    }
                }
                /*if (idElevatorSelected==0) {
                    return 0;
                }
                else {*/
                     return idElevatorSelected;
                //}
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

                int idElevatorSelected = this.findElevator(requestedFloor, direction); // this.elevatorList[0];
                Console.WriteLine("idElevatorSelected: " + idElevatorSelected);
                Console.WriteLine("Elevator selected is: elevator" + this.elevatorList[idElevatorSelected-1].id );
                // Determine the elevator direction and move it accordingly
                if (this.elevatorList[idElevatorSelected-1].floor < requestedFloor) {
                    this.elevatorList[idElevatorSelected-1].direction = "up";
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " direction is: " + this.elevatorList[idElevatorSelected-1].direction);
                    // Move the elevator to the requested floor
                    //this.elevatorList[idElevatorSelected-1].destination = requestedFloor;
                    /*for (var i =this.elevatorList[idElevatorSelected-1].floor; i <= requestedFloor; i++) {
                        Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " floor is: " + this.elevatorList[idElevatorSelected-1].floor);
                        this.elevatorList[idElevatorSelected-1].floor=i;
                    }*/
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
                
                }
                else if (this.elevatorList[idElevatorSelected-1].floor > requestedFloor) {
                    this.elevatorList[idElevatorSelected-1].direction = "down";
                    Console.WriteLine("elevator" + this.elevatorList[idElevatorSelected-1].id + " direction is: " + this.elevatorList[idElevatorSelected-1].direction);
                    // Move the elevator to the requested floor
                    //this.elevatorList[idElevatorSelected-1].destination = requestedFloor;
                    //for (var i =this.elevatorList[idElevatorSelected-1].floor; i >= requestedFloor; i--) {
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
                    this.elevatorList[idElevatorSelected-1].moving = "no";
                }
                return this.elevatorList[idElevatorSelected-1].id;//elevator";
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
            //Column [] columnList;
            //List<Column> columnList = new List<Column>();


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
            public void fullThrottle()
            {
                Console.WriteLine("The car is going as fast as it can!"); 
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

            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[0], 20, "down", 5, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[1], 3, "up", 15, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[2], 13, "down", 1, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[3], 15, "down", 2, "yes");
            battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[4], 6, "down", 1, "yes");

            /*Console.WriteLine("battery1.columnList[0].elevatorList[0].id " + battery1.columnList[0].elevatorList[0].id);
            Console.WriteLine("battery1.columnList[0].elevatorList[0].minFloor " + battery1.columnList[0].elevatorList[0].minFloor);
            Console.WriteLine("battery1.columnList[0].elevatorList[0].maxFloor " + battery1.columnList[0].elevatorList[0].maxFloor);
            */

            Console.WriteLine("elevator1.floor is: " + battery1.columnList[1].elevatorList[0].floor);
            Console.WriteLine("elevator1.direction is: " + battery1.columnList[1].elevatorList[0].direction);
            Console.WriteLine("elevator1.destination is: " + battery1.columnList[1].elevatorList[0].destination);
            Console.WriteLine("elevator1.id is: " + battery1.columnList[1].elevatorList[0].id);
            Console.WriteLine("elevator2.floor is: " + battery1.columnList[1].elevatorList[1].floor);
            Console.WriteLine("elevator2.direction is: " + battery1.columnList[1].elevatorList[1].direction);
            Console.WriteLine("elevator2.destination is: " + battery1.columnList[1].elevatorList[1].destination);
            Console.WriteLine("elevator2.id is: " + battery1.columnList[1].elevatorList[1].id);
            Console.WriteLine("elevator3.floor is: " + battery1.columnList[1].elevatorList[2].floor);
            Console.WriteLine("elevator3.direction is: " + battery1.columnList[1].elevatorList[2].direction);
            Console.WriteLine("elevator3.destination is: " + battery1.columnList[1].elevatorList[2].destination);
            Console.WriteLine("elevator3.id is: " + battery1.columnList[1].elevatorList[2].id);
            Console.WriteLine("elevator4.floor is: " + battery1.columnList[1].elevatorList[3].floor);
            Console.WriteLine("elevator4.direction is: " + battery1.columnList[1].elevatorList[3].direction);
            Console.WriteLine("elevator4.destination is: " + battery1.columnList[1].elevatorList[3].destination);
            Console.WriteLine("elevator4.id is: " + battery1.columnList[1].elevatorList[3].id);
            Console.WriteLine("elevator5.floor is: " + battery1.columnList[1].elevatorList[4].floor);
            Console.WriteLine("elevator5.direction is: " + battery1.columnList[1].elevatorList[4].direction);
            Console.WriteLine("elevator5.destination is: " + battery1.columnList[1].elevatorList[4].destination);
            Console.WriteLine("elevator5.id is: " + battery1.columnList[1].elevatorList[4].id);
              
            /* Someone at RC wants to go to the 20th floor. */
            /*battery1.columnList[1].updateFloorDirectionDestinationMoving(battery1.columnList[1].elevatorList[4], 1, "idle", 1, "no");
            Console.WriteLine("elevator5.floor is: " + battery1.columnList[1].elevatorList[4].floor);
            Console.WriteLine("elevator5.direction is: " + battery1.columnList[1].elevatorList[4].direction);
            Console.WriteLine("elevator5.destination is: " + battery1.columnList[1].elevatorList[4].destination);
            Console.WriteLine("elevator5.id is: " + battery1.columnList[1].elevatorList[4].id);*/

            int idElevatorSelected =  battery1.columnList[1].requestElevator(1, "up");
            //idElevatorSelected=5;
            //upButtonPressed() call there or in requestElevator (if direction)
            battery1.columnList[1].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 20);  
            // battery1.columnList[1].elevatorList[5-1].requestFloor(5, 20);  
           //floorButtonPressed() call there or in requestFloor (if direction)

            Console.WriteLine("elevator5.floor is: " + battery1.columnList[1].elevatorList[4].floor);
            Console.WriteLine("elevator5.direction is: " + battery1.columnList[1].elevatorList[4].direction);
            Console.WriteLine("elevator5.destination is: " + battery1.columnList[1].elevatorList[4].destination);
            Console.WriteLine("elevator5.id is: " + battery1.columnList[1].elevatorList[4].id); /**/
            
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

            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[0], 1, "up", 21, "no");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[1], 23, "up", 28, "yes");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[2], 33, "down", 1, "yes");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[3], 40, "down", 24, "yes");
            battery1.columnList[2].updateFloorDirectionDestinationMoving(battery1.columnList[2].elevatorList[4], 39, "down", 1, "yes");

            Console.WriteLine("elevator1.floor is: " + battery1.columnList[2].elevatorList[0].floor);
            Console.WriteLine("elevator1.direction is: " + battery1.columnList[2].elevatorList[0].direction);
            Console.WriteLine("elevator1.destination is: " + battery1.columnList[2].elevatorList[0].destination);
            Console.WriteLine("elevator1.id is: " + battery1.columnList[2].elevatorList[0].id);
            Console.WriteLine("elevator2.floor is: " + battery1.columnList[2].elevatorList[1].floor);
            Console.WriteLine("elevator2.direction is: " + battery1.columnList[2].elevatorList[1].direction);
            Console.WriteLine("elevator2.destination is: " + battery1.columnList[2].elevatorList[1].destination);
            Console.WriteLine("elevator2.id is: " + battery1.columnList[2].elevatorList[1].id);
            Console.WriteLine("elevator3.floor is: " + battery1.columnList[2].elevatorList[2].floor);
            Console.WriteLine("elevator3.direction is: " + battery1.columnList[2].elevatorList[2].direction);
            Console.WriteLine("elevator3.destination is: " + battery1.columnList[2].elevatorList[2].destination);
            Console.WriteLine("elevator3.id is: " + battery1.columnList[2].elevatorList[2].id);
            Console.WriteLine("elevator4.floor is: " + battery1.columnList[2].elevatorList[3].floor);
            Console.WriteLine("elevator4.direction is: " + battery1.columnList[2].elevatorList[3].direction);
            Console.WriteLine("elevator4.destination is: " + battery1.columnList[2].elevatorList[3].destination);
            Console.WriteLine("elevator4.id is: " + battery1.columnList[2].elevatorList[3].id);
            Console.WriteLine("elevator5.floor is: " + battery1.columnList[2].elevatorList[4].floor);
            Console.WriteLine("elevator5.direction is: " + battery1.columnList[2].elevatorList[4].direction);
            Console.WriteLine("elevator5.destination is: " + battery1.columnList[2].elevatorList[4].destination);
            Console.WriteLine("elevator5.id is: " + battery1.columnList[2].elevatorList[4].id);
              
            /* Someone at RC wants to go to the 36th floor. */
            int idElevatorSelected =  battery1.columnList[2].requestElevator(1, "up");
            //upButtonPressed() call there or in requestElevator (if direction)
            battery1.columnList[2].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 36);  
           //floorButtonPressed() call there or in requestFloor (if direction)

            Console.WriteLine("elevator1.floor is: " + battery1.columnList[2].elevatorList[0].floor);
            Console.WriteLine("elevator1.direction is: " + battery1.columnList[2].elevatorList[0].direction);
            Console.WriteLine("elevator1.destination is: " + battery1.columnList[2].elevatorList[0].destination);
            Console.WriteLine("elevator1.id is: " + battery1.columnList[2].elevatorList[0].id); /**/
            
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

            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[0], 58, "down", 1, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[1], 50, "up", 60, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[2], 46, "up", 58, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[3], 1, "up", 54, "yes");
            battery1.columnList[3].updateFloorDirectionDestinationMoving(battery1.columnList[3].elevatorList[4], 60, "down", 1, "yes");

            Console.WriteLine("elevator1.floor is: " + battery1.columnList[3].elevatorList[0].floor);
            Console.WriteLine("elevator1.direction is: " + battery1.columnList[3].elevatorList[0].direction);
            Console.WriteLine("elevator1.destination is: " + battery1.columnList[3].elevatorList[0].destination);
            Console.WriteLine("elevator1.id is: " + battery1.columnList[3].elevatorList[0].id);
            Console.WriteLine("elevator2.floor is: " + battery1.columnList[3].elevatorList[1].floor);
            Console.WriteLine("elevator2.direction is: " + battery1.columnList[3].elevatorList[1].direction);
            Console.WriteLine("elevator2.destination is: " + battery1.columnList[3].elevatorList[1].destination);
            Console.WriteLine("elevator2.id is: " + battery1.columnList[3].elevatorList[1].id);
            Console.WriteLine("elevator3.floor is: " + battery1.columnList[3].elevatorList[2].floor);
            Console.WriteLine("elevator3.direction is: " + battery1.columnList[3].elevatorList[2].direction);
            Console.WriteLine("elevator3.destination is: " + battery1.columnList[3].elevatorList[2].destination);
            Console.WriteLine("elevator3.id is: " + battery1.columnList[3].elevatorList[2].id);
            Console.WriteLine("elevator4.floor is: " + battery1.columnList[3].elevatorList[3].floor);
            Console.WriteLine("elevator4.direction is: " + battery1.columnList[3].elevatorList[3].direction);
            Console.WriteLine("elevator4.destination is: " + battery1.columnList[3].elevatorList[3].destination);
            Console.WriteLine("elevator4.id is: " + battery1.columnList[3].elevatorList[3].id);
            Console.WriteLine("elevator5.floor is: " + battery1.columnList[3].elevatorList[4].floor);
            Console.WriteLine("elevator5.direction is: " + battery1.columnList[3].elevatorList[4].direction);
            Console.WriteLine("elevator5.destination is: " + battery1.columnList[3].elevatorList[4].destination);
            Console.WriteLine("elevator5.id is: " + battery1.columnList[3].elevatorList[4].id);
              
            /* Someone at 54th floor wants to go to RC. */
            int idElevatorSelected =  battery1.columnList[3].requestElevator(54, "down");
            //upButtonPressed() call there or in requestElevator (if direction)
            battery1.columnList[3].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1);  
           //floorButtonPressed() call there or in requestFloor (if direction)

            Console.WriteLine("elevator1.floor is: " + battery1.columnList[3].elevatorList[0].floor);
            Console.WriteLine("elevator1.direction is: " + battery1.columnList[3].elevatorList[0].direction);
            Console.WriteLine("elevator1.destination is: " + battery1.columnList[3].elevatorList[0].destination);
            Console.WriteLine("elevator1.id is: " + battery1.columnList[3].elevatorList[0].id); /**/
            
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

            Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[0], -4, "idle", -4, "no");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[1], 1, "idle", 1, "no");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[2], -3, "down", -5, "yes");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[3], -6, "up", 1, "yes");
            battery1.columnList[0].updateFloorDirectionDestinationMoving(battery1.columnList[0].elevatorList[4], -1, "down", -6, "yes");

            Console.WriteLine("elevator1.floor is: " + battery1.columnList[0].elevatorList[0].floor);
            Console.WriteLine("elevator1.direction is: " + battery1.columnList[0].elevatorList[0].direction);
            Console.WriteLine("elevator1.destination is: " + battery1.columnList[0].elevatorList[0].destination);
            Console.WriteLine("elevator1.id is: " + battery1.columnList[0].elevatorList[0].id);
            Console.WriteLine("elevator2.floor is: " + battery1.columnList[0].elevatorList[1].floor);
            Console.WriteLine("elevator2.direction is: " + battery1.columnList[0].elevatorList[1].direction);
            Console.WriteLine("elevator2.destination is: " + battery1.columnList[0].elevatorList[1].destination);
            Console.WriteLine("elevator2.id is: " + battery1.columnList[0].elevatorList[1].id);
            Console.WriteLine("elevator3.floor is: " + battery1.columnList[0].elevatorList[2].floor);
            Console.WriteLine("elevator3.direction is: " + battery1.columnList[0].elevatorList[2].direction);
            Console.WriteLine("elevator3.destination is: " + battery1.columnList[0].elevatorList[2].destination);
            Console.WriteLine("elevator3.id is: " + battery1.columnList[0].elevatorList[2].id);
            Console.WriteLine("elevator4.floor is: " + battery1.columnList[0].elevatorList[3].floor);
            Console.WriteLine("elevator4.direction is: " + battery1.columnList[0].elevatorList[3].direction);
            Console.WriteLine("elevator4.destination is: " + battery1.columnList[0].elevatorList[3].destination);
            Console.WriteLine("elevator4.id is: " + battery1.columnList[0].elevatorList[3].id);
            Console.WriteLine("elevator5.floor is: " + battery1.columnList[0].elevatorList[4].floor);
            Console.WriteLine("elevator5.direction is: " + battery1.columnList[0].elevatorList[4].direction);
            Console.WriteLine("elevator5.destination is: " + battery1.columnList[0].elevatorList[4].destination);
            Console.WriteLine("elevator5.id is: " + battery1.columnList[0].elevatorList[4].id);
              
            /* Someone at SS3 wants to go to RC. */
            int idElevatorSelected =  battery1.columnList[0].requestElevator(-3, "up");
            //upButtonPressed() call there or in requestElevator (if direction)
            battery1.columnList[0].elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 1);  
            //floorButtonPressed() call there or in requestFloor (if direction)

            Console.WriteLine("elevator4.floor is: " + battery1.columnList[0].elevatorList[3].floor);
            Console.WriteLine("elevator4.direction is: " + battery1.columnList[0].elevatorList[3].direction);
            Console.WriteLine("elevator4.destination is: " + battery1.columnList[0].elevatorList[3].destination);
            Console.WriteLine("elevator4.id is: " + battery1.columnList[0].elevatorList[3].id); /**/
            
            /* Elevator A4 is expected to be sent.*/
        }

        static void Main(string[] args)
        {
            //Scenario1();
            //Scenario2();
            //Scenario3();
            Scenario4();

            /*Battery battery1 = new Battery(4, 5, new int[] {-6, 2, 21, 41}, new int[] {-1, 20, 40, 60});
            Console.WriteLine("battery1.columnAmount " + battery1.columnAmount);
            Console.WriteLine("battery1.elevatorPerColAmount " + battery1.elevatorPerColAmount);

            Console.WriteLine("battery1.minFloorColumnList0 " + battery1.minFloorColumnList[0]);
            Console.WriteLine("battery1.minFloorColumnList1 " + battery1.minFloorColumnList[1]);
            Console.WriteLine("battery1.minFloorColumnList2 " + battery1.minFloorColumnList[2]);
            Console.WriteLine("battery1.minFloorColumnList3 " + battery1.minFloorColumnList[3]);

            Console.WriteLine("battery1.maxFloorColumnList0 " + battery1.maxFloorColumnList[0]);
            Console.WriteLine("battery1.maxFloorColumnList1 " + battery1.maxFloorColumnList[1]);
            Console.WriteLine("battery1.maxFloorColumnList2 " + battery1.maxFloorColumnList[2]);
            Console.WriteLine("battery1.maxFloorColumnList3 " + battery1.maxFloorColumnList[3]);

            Console.WriteLine("battery1.columnList[0].elevatorPerColAmount " + battery1.columnList[0].elevatorPerColAmount);
            Console.WriteLine("battery1.columnList[0].minFloor " + battery1.columnList[0].minFloor);
            Console.WriteLine("battery1.columnList[0].maxFloor " + battery1.columnList[0].maxFloor);
            Console.WriteLine("battery1.columnList[0].id " + battery1.columnList[0].id);

            Console.WriteLine("battery1.columnList[0].elevatorList[0].id " + battery1.columnList[0].elevatorList[0].id);
            Console.WriteLine("battery1.columnList[0].elevatorList[0].minFloor " + battery1.columnList[0].elevatorList[0].minFloor);
            Console.WriteLine("battery1.columnList[0].elevatorList[0].maxFloor " + battery1.columnList[0].elevatorList[0].maxFloor);

            Console.WriteLine("battery1.columnList[0].elevatorList[1].id " + battery1.columnList[0].elevatorList[1].id);
            Console.WriteLine("battery1.columnList[0].elevatorList[1].minFloor " + battery1.columnList[0].elevatorList[1].minFloor);
            Console.WriteLine("battery1.columnList[0].elevatorList[1].maxFloor " + battery1.columnList[0].elevatorList[1].maxFloor);

            Console.WriteLine("battery1.columnList[0].elevatorList[2].id " + battery1.columnList[0].elevatorList[2].id);
            Console.WriteLine("battery1.columnList[0].elevatorList[2].minFloor " + battery1.columnList[0].elevatorList[2].minFloor);
            Console.WriteLine("battery1.columnList[0].elevatorList[2].maxFloor " + battery1.columnList[0].elevatorList[2].maxFloor);

            Console.WriteLine("battery1.columnList[0].elevatorList[3].id " + battery1.columnList[0].elevatorList[3].id);
            Console.WriteLine("battery1.columnList[0].elevatorList[3].minFloor " + battery1.columnList[0].elevatorList[3].minFloor);
            Console.WriteLine("battery1.columnList[0].elevatorList[3].maxFloor " + battery1.columnList[0].elevatorList[3].maxFloor);

            Console.WriteLine("battery1.columnList[0].elevatorList[4].id " + battery1.columnList[0].elevatorList[4].id);
            Console.WriteLine("battery1.columnList[0].elevatorList[4].minFloor " + battery1.columnList[0].elevatorList[4].minFloor);
            Console.WriteLine("battery1.columnList[0].elevatorList[4].maxFloor " + battery1.columnList[0].elevatorList[4].maxFloor);


            Console.WriteLine("battery1.columnList[1].elevatorPerColAmount " + battery1.columnList[1].elevatorPerColAmount);
            Console.WriteLine("battery1.columnList[1].minFloor " + battery1.columnList[1].minFloor);
            Console.WriteLine("battery1.columnList[1].maxFloor " + battery1.columnList[1].maxFloor);
            Console.WriteLine("battery1.columnList[1].id " + battery1.columnList[1].id);

            Console.WriteLine("battery1.columnList[1].elevatorList[0].id " + battery1.columnList[1].elevatorList[0].id);
            Console.WriteLine("battery1.columnList[1].elevatorList[0].minFloor " + battery1.columnList[1].elevatorList[0].minFloor);
            Console.WriteLine("battery1.columnList[1].elevatorList[0].maxFloor " + battery1.columnList[1].elevatorList[0].maxFloor);

            Console.WriteLine("battery1.columnList[1].elevatorList[1].id " + battery1.columnList[1].elevatorList[1].id);
            Console.WriteLine("battery1.columnList[1].elevatorList[1].minFloor " + battery1.columnList[1].elevatorList[1].minFloor);
            Console.WriteLine("battery1.columnList[1].elevatorList[1].maxFloor " + battery1.columnList[1].elevatorList[1].maxFloor);

            Console.WriteLine("battery1.columnList[1].elevatorList[2].id " + battery1.columnList[1].elevatorList[2].id);
            Console.WriteLine("battery1.columnList[1].elevatorList[2].minFloor " + battery1.columnList[1].elevatorList[2].minFloor);
            Console.WriteLine("battery1.columnList[1].elevatorList[2].maxFloor " + battery1.columnList[1].elevatorList[2].maxFloor);

            Console.WriteLine("battery1.columnList[1].elevatorList[3].id " + battery1.columnList[1].elevatorList[3].id);
            Console.WriteLine("battery1.columnList[1].elevatorList[3].minFloor " + battery1.columnList[1].elevatorList[3].minFloor);
            Console.WriteLine("battery1.columnList[1].elevatorList[3].maxFloor " + battery1.columnList[1].elevatorList[3].maxFloor);

            Console.WriteLine("battery1.columnList[1].elevatorList[4].id " + battery1.columnList[1].elevatorList[4].id);
            Console.WriteLine("battery1.columnList[1].elevatorList[4].minFloor " + battery1.columnList[1].elevatorList[4].minFloor);
            Console.WriteLine("battery1.columnList[1].elevatorList[4].maxFloor " + battery1.columnList[1].elevatorList[4].maxFloor);


            Console.WriteLine("battery1.columnList[2].elevatorPerColAmount " + battery1.columnList[2].elevatorPerColAmount);
            Console.WriteLine("battery1.columnList[2].minFloor " + battery1.columnList[2].minFloor);
            Console.WriteLine("battery1.columnList[2].maxFloor " + battery1.columnList[2].maxFloor);
            Console.WriteLine("battery1.columnList[2].id " + battery1.columnList[2].id);

            Console.WriteLine("battery1.columnList[2].elevatorList[0].id " + battery1.columnList[2].elevatorList[0].id);
            Console.WriteLine("battery1.columnList[2].elevatorList[0].minFloor " + battery1.columnList[2].elevatorList[0].minFloor);
            Console.WriteLine("battery1.columnList[2].elevatorList[0].maxFloor " + battery1.columnList[2].elevatorList[0].maxFloor);

            Console.WriteLine("battery1.columnList[2].elevatorList[1].id " + battery1.columnList[2].elevatorList[1].id);
            Console.WriteLine("battery1.columnList[2].elevatorList[1].minFloor " + battery1.columnList[2].elevatorList[1].minFloor);
            Console.WriteLine("battery1.columnList[2].elevatorList[1].maxFloor " + battery1.columnList[2].elevatorList[1].maxFloor);

            Console.WriteLine("battery1.columnList[2].elevatorList[2].id " + battery1.columnList[2].elevatorList[2].id);
            Console.WriteLine("battery1.columnList[2].elevatorList[2].minFloor " + battery1.columnList[2].elevatorList[2].minFloor);
            Console.WriteLine("battery1.columnList[2].elevatorList[2].maxFloor " + battery1.columnList[2].elevatorList[2].maxFloor);

            Console.WriteLine("battery1.columnList[2].elevatorList[3].id " + battery1.columnList[2].elevatorList[3].id);
            Console.WriteLine("battery1.columnList[2].elevatorList[3].minFloor " + battery1.columnList[2].elevatorList[3].minFloor);
            Console.WriteLine("battery1.columnList[2].elevatorList[3].maxFloor " + battery1.columnList[2].elevatorList[3].maxFloor);

            Console.WriteLine("battery1.columnList[2].elevatorList[4].id " + battery1.columnList[2].elevatorList[4].id);
            Console.WriteLine("battery1.columnList[2].elevatorList[4].minFloor " + battery1.columnList[2].elevatorList[4].minFloor);
            Console.WriteLine("battery1.columnList[2].elevatorList[4].maxFloor " + battery1.columnList[2].elevatorList[4].maxFloor);


            Console.WriteLine("battery1.columnList[3].elevatorPerColAmount " + battery1.columnList[3].elevatorPerColAmount);
            Console.WriteLine("battery1.columnList[3].minFloor " + battery1.columnList[3].minFloor);
            Console.WriteLine("battery1.columnList[3].maxFloor " + battery1.columnList[3].maxFloor);
            Console.WriteLine("battery1.columnList[3].id " + battery1.columnList[3].id);

            Console.WriteLine("battery1.columnList[3].elevatorList[0].id " + battery1.columnList[3].elevatorList[0].id);
            Console.WriteLine("battery1.columnList[3].elevatorList[0].minFloor " + battery1.columnList[3].elevatorList[0].minFloor);
            Console.WriteLine("battery1.columnList[3].elevatorList[0].maxFloor " + battery1.columnList[3].elevatorList[0].maxFloor);

            Console.WriteLine("battery1.columnList[3].elevatorList[1].id " + battery1.columnList[3].elevatorList[1].id);
            Console.WriteLine("battery1.columnList[3].elevatorList[1].minFloor " + battery1.columnList[3].elevatorList[1].minFloor);
            Console.WriteLine("battery1.columnList[3].elevatorList[1].maxFloor " + battery1.columnList[3].elevatorList[1].maxFloor);

            Console.WriteLine("battery1.columnList[3].elevatorList[2].id " + battery1.columnList[3].elevatorList[2].id);
            Console.WriteLine("battery1.columnList[3].elevatorList[2].minFloor " + battery1.columnList[3].elevatorList[2].minFloor);
            Console.WriteLine("battery1.columnList[3].elevatorList[2].maxFloor " + battery1.columnList[3].elevatorList[2].maxFloor);

            Console.WriteLine("battery1.columnList[3].elevatorList[3].id " + battery1.columnList[3].elevatorList[3].id);
            Console.WriteLine("battery1.columnList[3].elevatorList[3].minFloor " + battery1.columnList[3].elevatorList[3].minFloor);
            Console.WriteLine("battery1.columnList[3].elevatorList[3].maxFloor " + battery1.columnList[3].elevatorList[3].maxFloor);

            Console.WriteLine("battery1.columnList[3].elevatorList[4].id " + battery1.columnList[3].elevatorList[4].id);
            Console.WriteLine("battery1.columnList[3].elevatorList[4].minFloor " + battery1.columnList[3].elevatorList[4].minFloor);
            Console.WriteLine("battery1.columnList[3].elevatorList[4].maxFloor " + battery1.columnList[3].elevatorList[4].maxFloor);*/


        }
    }
}


