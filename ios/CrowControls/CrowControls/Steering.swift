//
//  Steering.swift
//  CrowControls
//
//  Created by James Dunwoody on 30/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit
import Accelerate

class Steering
{
    var separationOn = true
    var cohesionOn = true
    var seekOn = false
    
    var alignmentOn = false
    var obstacleAvoidanceOn = false
    var wanderOn = false
    var wallAvoidanceOn = false
    
    var wallAvoidanceMultiplier:CGFloat = 1.0
    var obstacleAvoidanceMultiplier:CGFloat = 1.0
    var separationMultiplier:CGFloat = 10.0
    var world: World
    
    init(world: World) {
        self.world = world
    }
    
    func calculate(subject: Bird, neighbours: [Bird], flock: Flock) -> Vector2D {
        var force = Vector2D()
        var steeringForce = Vector2D()
        
        if wallAvoidanceOn {
            //            force = calculateWallAvoidance(world.walls) * wallAvoidanceMultiplier
            //            if (!accumulateForce(, force))
            //            return m_vSteeringForce;
        }
        
        if obstacleAvoidanceOn {
            //                force = calculateObstaceAvoidance(world.obstacles) * wallAvoidanceMultiplier
            //                if !accumulateForce(m_vSteeringForce, force) {
            //                return m_vSteeringForce;
        }
        
        if separationOn {
            force = separation(subject, neighbours: neighbours) * separationMultiplier
            if !accumulateForce(&steeringForce, forceToAdd: force) {
                return steeringForce
            }
        }
        
        if seekOn {
            force = seek(subject, target: flock.lead.position)
            if !accumulateForce(&steeringForce, forceToAdd: force) {
                return steeringForce
            }
        }
        
        if cohesionOn {
            force = cohesion(subject, neighbours: neighbours) * separationMultiplier
            if !accumulateForce(&steeringForce, forceToAdd: force) {
                return steeringForce
            }
        }
        
        return steeringForce
    }
    
    func calculateWallAvoidance(bird: Bird, neighbours : [Bird]) -> Vector2D {
        return Vector2D()
    }
    
    func accumulateForce(inout runningTotal: Vector2D, forceToAdd: Vector2D) -> Bool {
        let maxForce:CGFloat = 10.0
        
        var magnitudeSoFar = runningTotal.length
        //calculate how much steering force remains to be used by this vehicle
        var magnitudeRemaining = maxForce - magnitudeSoFar
        //return false if there is no more force left to use
        if magnitudeRemaining <= 0.0 {
            return false
        }
        //calculate the magnitude of the force we want to add
        var magnitudeToAdd = forceToAdd.length
        
        if magnitudeToAdd < magnitudeRemaining {
            runningTotal += forceToAdd;
        } else {
            //add it to the steering force
            runningTotal += forceToAdd.normalized * magnitudeRemaining
        }
        
        return true
    }
    
    func separation(bird: Bird, neighbours: [Bird]) -> Vector2D {
        if !separationOn {
            return Vector2D()
        }
        
        var steeringForce = Vector2D()
        
        for neighbour in neighbours {
            if neighbour == bird {
                continue
            }
            
            // this neighbour is not itself
            // this neighbour it tagged (near enough to this)
            let toAgent = bird.position - neighbour.position
            
            //scale the force inversely proportional to the agent's distance from its neighbor.
            let newForce = toAgent.normalized / toAgent.length
            var newSteeringForce = steeringForce + newForce
            //            newSteeringForce += steeringForce + newForce
            steeringForce = steeringForce + newSteeringForce //bird.heading.normalized / toAgent.length
        }
        return steeringForce
    }
    
    func cohesion(bird: Bird, neighbours: [Bird]) -> Vector2D {
        if !cohesionOn {
            return Vector2D()
        }
        
        return seek(bird, target: world.centreOfMass())
    }
    
    func seek(bird: Bird, target: Vector2D) -> Vector2D {
        let desiredVelocity = target - bird.position
        
        return desiredVelocity - bird.velocity
    }
    
    func alignment(bird: Bird, neighbours: [Bird]) {
        if !alignmentOn {
            return
        }
        
        //used to record the average heading of the neighbors
        var averageHeading = Vector2D()
        
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
            var averageHeading = Vector2D()
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
