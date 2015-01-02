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
    var userControlEnabled = true
    var flyingAnimationEnabled = true
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    func configure(origin : CGPoint, maxYTranslation : CGFloat)
    {
        self.flock.origin = Vector2D(point: origin)
        self.maxYTranslation = maxYTranslation
    }
    
    func pannedLeft(percentage : CGFloat)
    {
        if userControlEnabled {
            flock.turningLeft(percentage)
        }
    }
    
    func pannedRight(percentage : CGFloat)
    {
        if userControlEnabled {
            flock.turningRight(percentage)
        }
    }
    
    func stoppedHorizontalPanning()
    {
        if userControlEnabled {
            flock.straighten()
        }
    }
    
    func stoppedVerticalPanning()
    {
        if userControlEnabled {
            flock.cruise()
        }
    }
    
    func pannedForward(percentage : CGFloat)
    {
        if userControlEnabled {
            flock.accelerate(min(1.0, percentage))
        }
    }
    
    func pannedBackward(percentage : CGFloat)
    {
        if userControlEnabled {
            flock.decelerate(min(1.0, percentage))
        }
    }
    
    override func didMoveToView(view: SKView) {
        flock.configure(Vector2D(point: view.center), maxYTranslation : maxYTranslation)
        
        for sprite in flock.sprites {
            addChild(sprite)
        }
        
        if Settings.flyingEnabled {
            if flyingAnimationEnabled {
                flock.cruise()
            }
        }
        debugControls.position = CGPoint(x: view.center.x, y: 0.0)
        addChild(debugControls)
    }
    
    //    override func touchesBegan(touches: NSSet, withEvent event: UIEvent) {
    //        /* Called when a touch begins */
    //
    //        for touch: AnyObject in touches {
    //            let location = touch.locationInNode(self)
    //            NSLog("Touched at %@", NSStringFromVector2D(location))
    //
    //            //            let sprite = SKSpriteNode(imageNamed:"Spaceship")
    //            //
    //            //            sprite.xScale = 0.5
    //            //            sprite.yScale = 0.5
    //            //            sprite.position = location
    //            //
    //            //            let action = SKAction.rotateByAngle(CGFloat(M_PI), duration:1)
    //            //
    //            //            sprite.runAction(SKAction.repeatActionForever(action))
    //            //
    //            //            self.addChild(sprite)
    //        }
    //    }
    
    override func update(currentTime: CFTimeInterval) {
        flock.update()
    }
}
