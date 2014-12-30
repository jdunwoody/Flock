//
//  Steering.swift
//  CrowControls
//
//  Created by James Dunwoody on 30/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class Steering
{
    var separationOn = false
    var alignmentOn = false
    var cohesionOn = false
    var obstacleAvoidanceOn = false
    var wanderOn = false
    
    func separation(bird: Bird, neighbours : [Bird]) {
        if !separationOn {
            return
        }
        
        var steeringForce = CGPointZero
        
        for neighbour in neighbours {
            // this neighbour is not itself
            // this neighbour it tagged (near enough to this)
            let toAgent = bird.position - neighbour.position
            
            //scale the force inversely proportional to the agent's distance from its neighbor.
            steeringForce += bird.heading.normalized / toAgent.length
            
        }
        
    }
    
    func alignment(bird: Bird, neighbours: [Bird]) {
        if !alignmentOn {
            return
        }
        
        //used to record the average heading of the neighbors
        
        var averageHeading = CGPointZero
        
        //used to count the number of vehicles in the neighborhood
        var neighborCount = 0
        
        for neighbour in neighbours {
            //iterate through all the tagged vehicles and sum their heading vectors
            //make sure *this* agent isn't included in the calculations and that
            //the agent being examined is close enough
            var neightbourCount = 0
            if(neighbour != bird) {
                averageHeading += neighbour.heading
                neighborCount++
            }
            var averageHeading = CGPointZero
            //if the neighborhood contained one or more vehicles, average their //heading vectors.
            if (neighborCount > 0) {
                averageHeading /= neighborCount
                averageHeading -= bird.heading
            }
        }
    }
    
    func cohesion(neighbours: [Bird]) {
                    
    }
    
}