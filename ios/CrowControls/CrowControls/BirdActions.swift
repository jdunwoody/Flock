//
//  Animations.swift
//  CrowControls
//
//  Created by James Dunwoody on 12/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import SpriteKit

class BirdActions: NSObject {
    
    let textures : Textures
    
    init(textures: Textures) {
        self.textures = textures
    }

    func flap() -> SKAction {
        return SKAction.animateWithTextures(textures.flap, timePerFrame: 0.1, resize: false, restore: true)
    }
    
    func cruise() -> SKAction {
        return SKAction.animateWithTextures(textures.cruise, timePerFrame: 0.1, resize: false, restore: true)
    }
    
    func fly(ratePercentage : CGFloat) -> SKAction {
        let flapCycle = SKAction.repeatAction(flap(), count: Int(10 * ratePercentage))
        let cruiseCycle = SKAction.repeatAction(cruise(), count: Int(10 * (1 - ratePercentage)))
        
        let cruiseAndRock = SKAction.group([cruiseCycle, rock()])
        
        let fly = SKAction.sequence([flapCycle, cruiseAndRock])
        
        return SKAction.repeatActionForever(fly)
    }
    
    func rock() -> SKAction {
        let move1 = SKAction.moveByX(10, y: 5, duration: 2.0)
        move1.timingMode = SKActionTimingMode.EaseInEaseOut
       
        let move2 = SKAction.moveByX(-10, y: -5, duration: 2.0)
        move2.timingMode = SKActionTimingMode.EaseInEaseOut
        
        return SKAction.sequence([move1, move2])
    }
    
    func advancing() -> SKAction {
        return SKAction.moveToX(0, duration: 1.0)
    }
    
    func decelerating() -> SKAction {
        return SKAction.moveByX(0, y: -100, duration: 1.0)
    }
    
    //    func turningRight(percentage : Double) -> SKAction
    //    {
    //        NSLog("Turning right by %f", percentage)
    //
    //        //        return SKAction.rotateToAngle(-CGFloat(100), duration: 0.2)
    //        return SKAction.rotateToAngle(-CGFloat(percentage * M_PI), duration: 0.0)
    //    }
    //
    //    func turningLeft(percentage : Double) -> SKAction
    //    {
    //        NSLog("Turning left by %f", percentage)
    //
    //        return SKAction.rotateToAngle(CGFloat(percentage * M_PI), duration: 0.2)
    //    }
    //
}
