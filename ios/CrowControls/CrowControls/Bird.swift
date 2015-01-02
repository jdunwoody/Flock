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
    
    let actions: BirdActions
    let sprite: BirdSprite
    let textures: Textures
    var origin: Vector2D
    var debugForceLine: DebugForceLine
    
    var position : Vector2D {
        get {
            return Vector2D(point: sprite.position)
        }
        set {
            sprite.position = newValue.point
        }
    }
    
    //    var origin : Vector2D {
    ////        get {
    ////            return sprite.position
    ////        }
    //        set {
    //            sprite.position = origin
    //        }
    //    }
    
    init() {
        self.textures = Textures()
        self.actions = BirdActions(textures: textures)
        self.sprite = BirdSprite(actions : self.actions, textures : self.textures)
        self.origin = Vector2D()
        self.heading = Vector2D(x: 0, y: 1.0)
        self.debugForceLine = DebugForceLine()
    }
    
    func configure(origin : Vector2D, maxYTranslation : CGFloat) {
        self.origin = origin
        self.maxYTranslation = maxYTranslation
        sprite.position = origin.point
        sprite.addChild(self.debugForceLine.sprite)
    }
    
    //    func fly()
    //    {
    //        self.sprite.runAction(actions.flappingBird(textures), withKey: "flapping")
    //    }
    
    func cruise() {
        sprite.removeActionForKey("flying")
        sprite.runAction(actions.fly(0.5), withKey: "flying")
        sprite.runAction(SKAction.moveTo(origin.point, duration: 0.2))
        //        sprite.removeActionForKey("advancing")
        //        sprite.removeActionForKey("decelerating")
    }
    
    func accelerate(percentage : CGFloat) {
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
    
    func deccelerate(percentage : CGFloat) {
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
    
    func straighten() {
        //        self.sprite.zRotation = 0.0
        
        //        sprite.removeActionForKey("turningLeft")
        //        sprite.removeActionForKey("turningRight")
        sprite.runAction(SKAction.rotateToAngle(0.0, duration: 0.2))
    }
    
    func turningRight(percentage : CGFloat) {
        self.sprite.zRotation = -percentage * CGFloat(M_PI)
        
        //        straighten()
        //        let turningRight = self.actions.turningRight(amount)
        
        //        self.sprite.runAction(turningRight, withKey: "turningRight")
    }
    
    func turningLeft(percentage : CGFloat) {
        self.sprite.zRotation = CGFloat(percentage * CGFloat(M_PI))
        
        //        straighten()
        //        let turningLeft = actions.turningLeft(percentage)
        //
        //        sprite.runAction(turningLeft, withKey: "turningLeft")
    }
    
    func update(flock: Flock) {
        let force = steering.calculate(self, neighbours: flock.birds)
        self.debugForceLine.update(force)
        
        let angle = atan2(force.y, force.x)
        
//        let p:CGPoint = self.sprite.position
//        let f:CGPoint = force.point
//        self.sprite.position = p + f
        self.sprite.position = self.sprite.position + force
        //        self.sprite.zRotation = angle
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
    
    var heading: Vector2D
    
    private
    
    let steering = Steering()
}

func += (inout left: Vector2D, right: CGFloat) {
    left.x = left.x + right
    left.y = left.y + right
}

func +(left: CGPoint, right: Vector2D) -> CGPoint {
    return CGPoint(x: left.x + right.x, y: left.y + right.y)
}

func /(left: Vector2D, right: CGFloat) -> Vector2D {
    return Vector2D(x: left.x / right, y: left.y / right)
}

func +=(left: Vector2D, right: Vector2D) -> Vector2D {
    return left + right
}

func -(left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x - right.x, y: left.y - right.y)
}

func -=(left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x - right.x, y: left.y - right.y)
}

//func *(point: Vector2D, float: CGFloat) -> Vector2D {
//    return Vector2D(x: point.x * float, y: point.y * float)
//}

func *(point: Vector2D, factor: CGFloat) -> Vector2D {
    return Vector2D(x: point.x * factor, y:point.y * factor)
}

func !=(left: Bird, right: Bird) -> Bool {
    return left.sprite != right.sprite
}

func /=(left: Vector2D, right: Int) -> Vector2D {
    return Vector2D(x: left.x / CGFloat(right), y: left.y / CGFloat(right))
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

extension Vector2D {
    // Get the length (a.k.a. magnitude) of the vector
    var length: CGFloat { return sqrt(self.x * self.x + self.y * self.y) }
    
    var normalized: Vector2D {
        let x = self.x / self.length
        let y = self.y / self.length
        
        return Vector2D(x: x, y: y)
    }
    
    //    func minus(other: Vector2D) -> Vector2D {
    //        return Vector2D(x: self.x - other.x, y: self.y - other.y)
    //    }
    
    
    //    var minus: Vector2D { (other: Vector2D): Vector2D {
    //
    //    }
    //    Vector2D NDVector2DMinusPoint(Vector2D p1, Vector2D p2)
    //    {
    //    return (Vector2D){p1.x-p2.x, p1.y-p2.y};
    //    }
    
    
    //    func normalise(vector : Vector2D) -> Vector2D {
    //
    //        // Get the length (a.k.a. magnitude) of the vector
    //        var length: CGFloat { return sqrt(self.x * self.x + self.y * self.y) }
    //
    //        // Normalize the vector (preserve its direction, but change its magnitude to 1)
    //        var normalized: Vector2D { return Vector2D(x: self.x / self.length, y: self.y / self.length) }
    //
    //        return vector
    //    }
}