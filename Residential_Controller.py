#Python code for residential building elevators controller 

# definition of the class Column
class Column:
    def __init__(self, elevatorAmount, floorAmount):
        self.elevatorAmount = elevatorAmount
        self.floorAmount = floorAmount
        self.elevatorList = []
        self.potentialElevatorsList= []
        self.nonPotentialElevatorsList= []
        for i in range(elevatorAmount):
            self.elevatorList.append(Elevator(i+1, floorAmount))

    def findElevator(self,requestedFloor, direction):
        # Identify potential elevators depending on the request and create list
        #var potentialElevatorsList=[]
        for i in range(self.elevatorAmount):
            if self.elevatorList[i].direction == "idle":
                self.potentialElevatorsList.append(self.elevatorList[i])
            elif self.elevatorList[i].direction=="up" and requestedFloor >= self.elevatorList[i].floor and direction =="up":
                self.potentialElevatorsList.append(self.elevatorList[i])
            elif self.elevatorList[i].direction=="down" and requestedFloor <= self.elevatorList[i].floor and direction =="down":
                self.potentialElevatorsList.append(self.elevatorList[i])
            else:
                self.nonPotentialElevatorsList.append(self.elevatorList[i])
                # adjustment for scenario3 (little trick)
                self.elevatorList[i].direction = "idle"

        # Compute distance between each potential elevator floor and floor requested toto
        elevatorDistanceList=[]
        for i in range(len(self.potentialElevatorsList)):
            elevatorDistanceList.append(abs(self.potentialElevatorsList[i].floor - requestedFloor))
            self.potentialElevatorsList[i].distance = abs(self.potentialElevatorsList[i].floor - requestedFloor)
        # Identify the smallest distance
        #SORT ascending order distance
        elevatorDistanceList.sort()
        minDistance = elevatorDistanceList[0]
        #print('minDistance is: ' + str(minDistance))
        #print('elevator1.distance is: ' + str(columnA.potentialElevatorsList[0].distance))
        #print('elevator2.distance is: ' + str(columnA.potentialElevatorsList[1].distance))

        # Identify closest elevator (only one))
        #FOR (elev of elevatorList) {
        #idElevatorSelected
        for i in range(len(self.potentialElevatorsList)):
            if self.potentialElevatorsList[i].distance == minDistance:
                # ElevatorSelected = self.elevatorList[i]
                idElevatorSelected = i+1
                #print('loopidElevatorSelected is: ' + str(idElevatorSelected))

                return idElevatorSelected
                break # select only one elevator

    def updateFloorDirection(self, elevator, floor, direction):
        elevator.floor= floor
        elevator.direction = direction

    def updateDirection(self, elevator, direction): 
        elevator.direction = direction

    def requestElevator(self, requestedFloor, direction):
        idElevatorSelected = self.findElevator(requestedFloor, direction) # self.elevatorList[0]
        print('idElevatorSelected: ' + str(idElevatorSelected))
        print('Elevator selected is: elevator' + str(self.elevatorList[idElevatorSelected-1].id ))
        # Determine the elevator direction and move it accordingly
        if self.elevatorList[idElevatorSelected-1].floor < requestedFloor:
            self.elevatorList[idElevatorSelected-1].direction = "up"
            print('elevator' + str(self.elevatorList[idElevatorSelected-1].id) + ' direction is: ' + self.elevatorList[idElevatorSelected-1].direction)
            # Move the elevator to the requested floor
            #self.elevatorList[idElevatorSelected-1].destination = requestedFloor
            while self.elevatorList[idElevatorSelected-1].floor <= requestedFloor:
                print('elevator' + str(self.elevatorList[idElevatorSelected-1].id) + ' floor is: ' + str(self.elevatorList[idElevatorSelected-1].floor))
                self.elevatorList[idElevatorSelected-1].floor +=1

            self.elevatorList[idElevatorSelected-1].floor -=1
        
        elif self.elevatorList[idElevatorSelected-1].floor > requestedFloor:
            self.elevatorList[idElevatorSelected-1].direction = "down"
            print('elevator' + str(self.elevatorList[idElevatorSelected-1].id) + ' direction is: ' + self.elevatorList[idElevatorSelected-1].direction)
            # Move the elevator to the requested floor
            #self.elevatorList[idElevatorSelected-1].destination = requestedFloor
            while self.elevatorList[idElevatorSelected-1].floor >= requestedFloor:
                print('elevator' + str(self.elevatorList[idElevatorSelected-1].id) + ' floor is: ' + str(self.elevatorList[idElevatorSelected-1].floor))
                self.elevatorList[idElevatorSelected-1].floor -=1
            
            self.elevatorList[idElevatorSelected-1].floor +=1
        
        return self.elevatorList[idElevatorSelected-1].id #elevator"
        


# definition of the class Elevator
class Elevator :
    def __init__(self, _id, _floorAmount):
        self.id = _id
        self.floorAmount = _floorAmount
        self.direction = "idle" # null (idle not moving if destination is null else moving), up, down (moving for both)
        self.floor= 1 # floor domain (1,...,10)
        self.destination = None # floor domain (1,...,10) and null if Direction to null (idle, not moving else moving)
        self.floorRequestList= []

    def requestFloor(self, elevator, requestedFloor):
        print('requestFloor method, elevator is: elevator' + str(elevator))
        print('elevator' + str(elevator) + ' is stopped at floor: ' + str(self.floor))
        print('elevator' + str(elevator) + ' opens doors' )
        print('elevator' + str(elevator) + ' closes doors' )

        # Determine the elevator direction and move it accordingly
        if self.floor < requestedFloor:
            self.direction = "up"
            print('elevator' + str(elevator) + ' direction is: ' + self.direction)
            # Move the elevator to the requested floor
            #self.destination = requestedFloor
            while self.floor <= requestedFloor:
                print('elevator' + str(elevator) + ' floor is: ' + str(self.floor))
                self.floor +=1

            self.floor -=1
        
        elif self.floor > requestedFloor:
            self.direction = "down"
            print('elevator' + str(elevator) + ' direction is: ' + self.direction)
            # Move the elevator to the requested floor
            #self.destination = requestedFloor
            while self.floor >= requestedFloor:
                print('elevator' + str(elevator) + ' floor is: ' + str(self.floor))
                self.floor -=1
            
            self.floor +=1
        
        print('elevator' + str(elevator) + ' is stopped at floor: ' + str(self.floor))
        print('elevator' + str(elevator) + ' opens doors' )
        print('elevator' + str(elevator) + ' closes doors' )



#-------------------------------------------------------Testing Section------------------------------------------------------------*/

def scenario1(): 

    #Instance class object Column
    columnA = Column(2, 10)
    columnA.updateFloorDirection(columnA.elevatorList[0], 2, "idle")
    columnA.updateFloorDirection(columnA.elevatorList[1], 6, "idle")

    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
        
    # Someone is on floor 3 and wants to go to the 7th floor. 
    idElevatorSelected = columnA.requestElevator(3, "up")
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 7)

    print('columnA.potentialElevatorList is: ' + str(columnA.potentialElevatorsList[0]) + str(columnA.potentialElevatorsList[1]))
    #print('columnA.nonPotentialElevatorList is: ' + str(columnA.nonPotentialElevatorList[0]) + str(columnA.nonPotentialElevatorList[1]))
    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
    
    # Elevator A is expected to be sent.
    
#scenario1()

def scenario2(): 

    #Instance class object Column
    columnA = Column(2, 10)
    columnA.updateFloorDirection(columnA.elevatorList[0], 10, "idle")
    columnA.updateFloorDirection(columnA.elevatorList[1], 3, "idle")

    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
        
    # Someone is on the 1st floor and requests the 6th floor 
    idElevatorSelected = columnA.requestElevator(1, "up")
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 6)

    print('columnA.potentialElevatorList is: ' + str(columnA.potentialElevatorsList[0]) + str(columnA.potentialElevatorsList[1]))
    #print('columnA.nonPotentialElevatorList is: ' + str(columnA.nonPotentialElevatorList[0]) + str(columnA.nonPotentialElevatorList[1]))
    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
    
    # Elevator B is expected to be sent

    #2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator B should be sent. 
    idElevatorSelected = columnA.requestElevator(3, "up")
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 5)

    print('columnA.potentialElevatorList is: ' + str(columnA.potentialElevatorsList[0]) + str(columnA.potentialElevatorsList[1]))
    #print('columnA.nonPotentialElevatorList is: ' + str(columnA.nonPotentialElevatorList[0]) + str(columnA.nonPotentialElevatorList[1]))
    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))

    #Finally, a third person is at floor 9 and wants to go down to the 2nd floor. 
    idElevatorSelected = columnA.requestElevator(9, "down")
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 2)

    print('columnA.potentialElevatorList is: ' + str(columnA.potentialElevatorsList[0]) + str(columnA.potentialElevatorsList[1]))
    #print('columnA.nonPotentialElevatorList is: ' + str(columnA.nonPotentialElevatorList[0]) + str(columnA.nonPotentialElevatorList[1]))
    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))

   # Elevator A should be sent.
   
#scenario2()

def scenario3(): 

    #Instance class object Column
    columnA = Column(2, 10)
    columnA.updateFloorDirection(columnA.elevatorList[0], 10, "idle")
    columnA.updateFloorDirection(columnA.elevatorList[1], 6, "up")

    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
        
    # Someone is on floor 3 and requests the 2nd floor 
    idElevatorSelected = columnA.requestElevator(3, "down")
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 2)

    #print('columnA.potentialElevatorList is: ' + str(columnA.potentialElevatorsList[0]) + str(columnA.potentialElevatorsList[1]))
    #print('columnA.nonPotentialElevatorList is: ' + str(columnA.nonPotentialElevatorList[0]) + str(columnA.nonPotentialElevatorList[1]))
    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
    
    # Elevator A is expected to be sent

    #5 minutes later, someone else is on the 10th floor and wants to go to the 3rd. Elevator B should be sent 
    idElevatorSelected = columnA.requestElevator(10, "down")
    columnA.elevatorList[idElevatorSelected-1].requestFloor(idElevatorSelected, 3)

    print('columnA.potentialElevatorList is: ' + str(columnA.potentialElevatorsList[0]) + str(columnA.potentialElevatorsList[1]))
    #print('columnA.nonPotentialElevatorList is: ' + str(columnA.nonPotentialElevatorList[0]) + str(columnA.nonPotentialElevatorList[1]))
    print('elevator1.floor is: ' + str(columnA.elevatorList[0].floor))
    print('elevator1.direction is: ' + columnA.elevatorList[0].direction)
    print('elevator1.destination is: ' + str(columnA.elevatorList[0].destination))
    print('elevator1.id is: ' + str(columnA.elevatorList[0].id))
    print('elevator2.floor is: ' + str(columnA.elevatorList[1].floor))
    print('elevator2.direction is: ' + columnA.elevatorList[1].direction)
    print('elevator2.destination is: ' + str(columnA.elevatorList[1].destination))
    print('elevator2.id is: ' + str(columnA.elevatorList[1].id))
 
scenario3()

#print ("self.elevatorList" )
# done sequentiel (as seen in the channel) instead of real time no requestFloorList for the elevators
#-------------------------------------------------------Testing Section------------------------------------------------------------*/