//
//  Bird.swift
//  CrowControls
//
//  Created by James Dunwoody on 16/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import Foundation
import UIKit
import SpriteKit

class Bird
{
    var maxYTranslation = 0.0 as CGFloat
    
    let actions : BirdActions
    let sprite : BirdSprite
    let textures : Textures
    var origin : CGPoint
    
    var position : CGPoint {
        get {
            return sprite.position
        }
        set {
            sprite.position = newValue
        }
    }
    
    //    var origin : CGPoint {
    ////        get {
    ////            return sprite.position
    ////        }
    //        set {
    //            sprite.position = origin
    //        }
    //    }
    
    init()
    {
        self.textures = Textures()
        self.actions = BirdActions(textures: textures)
        self.sprite = BirdSprite(actions : self.actions, textures : self.textures)
        self.origin = CGPointZero
        self.heading = CGPointZero
    }
    
    func configure(origin : CGPoint, maxYTranslation : CGFloat)
    {
        self.origin = origin
        sprite.position = origin
        self.maxYTranslation = maxYTranslation
    }
    
    //    func fly()
    //    {
    //        self.sprite.runAction(actions.flappingBird(textures), withKey: "flapping")
    //    }
    
    func cruise()
    {
        sprite.removeActionForKey("flying")
        sprite.runAction(actions.fly(0.5), withKey: "flying")
        sprite.runAction(SKAction.moveTo(origin, duration: 0.2))
        //        sprite.removeActionForKey("advancing")
        //        sprite.removeActionForKey("decelerating")
    }
    
    func accelerate(percentage : CGFloat)
    {
        sprite.removeActionForKey("flying")
        let amount = origin.y - percentage * maxYTranslation
        
        sprite.runAction(actions.fly(percentage), withKey: "flying")
        sprite.position.y = amount
        
        
        //        normalSpeed()
        //
        //        let advancing = actions.advancing()
        //
        //        sprite.runAction(advancing, withKey: "advancing")
    }
    
    func deccelerate(percentage : CGFloat)
    {
        sprite.removeActionForKey("flying")
        let amount = origin.y + percentage * maxYTranslation
        
        sprite.runAction(actions.fly(percentage), withKey: "flying")
        
        sprite.position.y = amount
        
        //          sprite.position.y = min_y_transation
        //        normalSpeed()
        //
        //        let decelerating = actions.decelerating()
        //
        //        sprite.runAction(decelerating, withKey: "decelerating")
    }
    
    func straighten()
    {
        //        self.sprite.zRotation = 0.0
        
        //        sprite.removeActionForKey("turningLeft")
        //        sprite.removeActionForKey("turningRight")
        sprite.runAction(SKAction.rotateToAngle(0.0, duration: 0.2))
    }
    
    func turningRight(percentage : CGFloat)
    {
        self.sprite.zRotation = -percentage * CGFloat(M_PI)
        
        //        straighten()
        //        let turningRight = self.actions.turningRight(amount)
        
        //        self.sprite.runAction(turningRight, withKey: "turningRight")
    }
    
    func turningLeft(percentage : CGFloat)
    {
        self.sprite.zRotation = CGFloat(percentage * CGFloat(M_PI))
        
        //        straighten()
        //        let turningLeft = actions.turningLeft(percentage)
        //
        //        sprite.runAction(turningLeft, withKey: "turningLeft")
    }
    
    func update() {
        steering.separationOn = true
        steering.alignmentOn = true
        steering.cohesionOn = true
        steering.obstacleAvoidanceOn = true
        steering.wanderOn = true
        //        steering.evadeOn(Dog)
    }
    
    //    func normalFlappingAnimation() -> SKAction {
    //        return flappingAnimation(0.5)
    //    }
    //
    //    func fastFlappingAnimation() -> SKAction {
    //        return flappingAnimation(0.1)
    //    }
    //
    //    func slowFlappingAnimation() -> SKAction {
    //        return flappingAnimation(1.0)
    //    }
    
    //    private
    //
    //    func flappingAnimation(timePerFrame: NSTimeInterval) -> SKAction {
    //        return SKAction.animateWithTextures(self.textures, timePerFrame: 0.1, resize: false, restore: true)
    //    }
    
    var heading: CGPoint
    
    private
    
    let steering = Steering()
}

func += (inout left: CGPoint, right: CGFloat) {
    left.x = left.x + right
    left.y = left.y + right
}

func /(left: CGPoint, right: CGFloat) -> CGPoint {
    return CGPoint(x: left.x / right, y: left.y / right)
}

func +=(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x + right.x, y: left.y + right.y)
}

func + (left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x + right.x, y: left.y + right.y)
}

func -(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x - right.x, y: left.y - right.y)
}

func -=(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x - right.x, y: left.y - right.y)
}

func *(point: CGPoint, factor: CGFloat) -> CGPoint {
    return CGPoint(x: point.x * factor, y:point.y * factor)
}

func != (left: Bird, right: Bird) -> Bool {
    return left.sprite != right.sprite
}

func /=(left: CGPoint, right: Int) -> CGPoint {
    return CGPoint(x: left.x / CGFloat(right), y: left.y / CGFloat(right))
}

//
//func +(left: [Int], right: [Int]) -> [Int] { // 1
//    var sum = [Int]() // 2
//    assert(left.count == right.count, "vector of same length only")  // 3
//    for (key, v) in enumerate(left) {
//        sum.append(left[key] + right[key]) // 4
//    }
//    return sum
//}

extension CGPoint {
    // Get the length (a.k.a. magnitude) of the vector
    var length: CGFloat { return sqrt(self.x * self.x + self.y * self.y) }
    
    var normalized: CGPoint {
        return CGPoint(x: self.x / self.length, y: self.y / self.length)
    }
    
    //    func minus(other: CGPoint) -> CGPoint {
    //        return CGPoint(x: self.x - other.x, y: self.y - other.y)
    //    }
    
    
    //    var minus: CGPoint { (other: CGPoint): CGPoint {
    //
    //    }
    //    CGPoint NDCGPointMinusPoint(CGPoint p1, CGPoint p2)
    //    {
    //    return (CGPoint){p1.x-p2.x, p1.y-p2.y};
    //    }
    
    
    //    func normalise(vector : CGPoint) -> CGPoint {
    //
    //        // Get the length (a.k.a. magnitude) of the vector
    //        var length: CGFloat { return sqrt(self.x * self.x + self.y * self.y) }
    //
    //        // Normalize the vector (preserve its direction, but change its magnitude to 1)
    //        var normalized: CGPoint { return CGPoint(x: self.x / self.length, y: self.y / self.length) }
    //
    //        return vector
    //    }
}