//
//  World.swift
//  CrowControls
//
//  Created by James Dunwoody on 2/01/2015.
//  Copyright (c) 2015 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class World
{
    let debugSteering = DebugSteering()
    
    var size = CGRect(x: 0.0, y: 0.0, width: 200.0, height: 200.0)
    var flock: Flock?

    init() {
        
    }
//    init(flock: Flock) {
//        self.flock = flock
//    }
    
    func update(timeElapsed: CGFloat) {
        flock!.update(timeElapsed)
        
        let centre = centreOfMass()
      
        debugSteering.centreOfMass = centre
    }
    
    func centreOfMass() -> Vector2D {
        var centreOfMass = Vector2D()
       
        for bird in flock!.birds {
            centreOfMass = centreOfMass + bird.position
        }
        
        centreOfMass /= flock!.birds.count
        
        return centreOfMass
    }
    
    //    init(x: CGFloat, y: CGFloat) {
    //        self.x = x
    //        self.y = y
    //    }
}