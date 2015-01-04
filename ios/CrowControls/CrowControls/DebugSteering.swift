//
//  DebugSteering.swift
//  CrowControls
//
//  Created by James Dunwoody on 2/01/2015.
//  Copyright (c) 2015 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class DebugSteering {
//    class var sharedInstance:DebugSteering {
//        struct Singleton {
//            static let instance = DebugSteering()
//        }
//        return Singleton.instance
//    }
    
    var centreOfMass: Vector2D = Vector2D() {
        didSet {
            sprite.position = centreOfMass.point
        }
    }
    let sprite: SKShapeNode
    
    init() {
        sprite = SKShapeNode(circleOfRadius: 10.0)
        
        sprite.lineWidth = 1.0
        sprite.fillColor = SKColor.blueColor()
        sprite.strokeColor = SKColor.whiteColor()
        sprite.glowWidth = 0.5
        sprite.alpha = 0.3
    }
}