//
//  GameScene.swift
//  CrowControls
//
//  Created by James Dunwoody on 7/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import SpriteKit

class GameScene: SKScene {
    var debugControls = DebugControls()
    var flock = Flock()
    var maxYTranslation = 0.0 as CGFloat
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    func configure(origin : CGPoint, maxYTranslation : CGFloat)
    {
        self.flock.origin = origin
        self.maxYTranslation = maxYTranslation
    }
    
    func pannedLeft(percentage : CGFloat)
    {
        flock.turningLeft(percentage)
    }
    
    func pannedRight(percentage : CGFloat)
    {
        flock.turningRight(percentage)
    }
    
    func stoppedHorizontalPanning()
    {
        flock.straighten()
    }
    
    func stoppedVerticalPanning()
    {
        flock.cruise()
    }
    
    func pannedForward(percentage : CGFloat)
    {
        flock.accelerate(min(1.0, percentage))
    }
    
    func pannedBackward(percentage : CGFloat)
    {
        flock.decelerate(min(1.0, percentage))
    }
    
    override func didMoveToView(view: SKView) {
        flock.configure(view.center, maxYTranslation : maxYTranslation)
        
        for sprite in flock.sprites {
            addChild(sprite)
        }
        
        if Settings.flyingEnabled {
            flock.cruise()
        }
        
        debugControls.position = CGPoint(x: view.center.x, y: 0.0)
        addChild(debugControls)
    }
    
    override func touchesBegan(touches: NSSet, withEvent event: UIEvent) {
        /* Called when a touch begins */
        
        for touch: AnyObject in touches {
            let location = touch.locationInNode(self)
            NSLog("Touched at %@", NSStringFromCGPoint(location))
            
            //            let sprite = SKSpriteNode(imageNamed:"Spaceship")
            //
            //            sprite.xScale = 0.5
            //            sprite.yScale = 0.5
            //            sprite.position = location
            //
            //            let action = SKAction.rotateByAngle(CGFloat(M_PI), duration:1)
            //
            //            sprite.runAction(SKAction.repeatActionForever(action))
            //
            //            self.addChild(sprite)
        }
    }
    
    override func update(currentTime: CFTimeInterval) {
        flock.steeringForce()
    }
}
