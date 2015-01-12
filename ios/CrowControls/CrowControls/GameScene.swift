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
    var flock: Flock
    var world: World
    var maxYTranslation = 200.0 as CGFloat
    var userControlEnabled = true
    var flyingAnimationEnabled = true
    var oldTime: CFTimeInterval
    
    required init?(coder: NSCoder) {
        world = World()
        flock = Flock(world: world)
        world.flock = flock
        oldTime = CFTimeInterval()
        
        super.init(coder: coder)
        
        addChildren()
    }
    
    override init(size: CGSize) {
        world = World()
        flock = Flock(world: world)
        world.flock = flock
        oldTime = CFTimeInterval()
        
        super.init(size: size)
     
        world.size = CGRect(origin: CGPointZero, size: size)
        
        addChildren()
        
        flock.configure(Vector2D(point: CGPoint(x: world.size.width / 2.0, y: world.size.height / 2.0)), maxYTranslation : maxYTranslation)
        debugControls.position = CGPoint(x: world.size.width / 2.0, y: 0.0)
    }
    
    func addChildren() {
        for sprite in flock.sprites {
            addChild(sprite)
        }
        
        if Settings.flyingEnabled {
            if flyingAnimationEnabled {
                flock.cruise()
            }
        }
        addChild(debugControls)
        
        addChild(world.debugSteering.sprite)
    }
    
    func configure(origin : CGPoint, maxYTranslation : CGFloat) {
//        self.flock.origin = Vector2D(point: origin)
        self.maxYTranslation = maxYTranslation
    }
    
    override func update(newTime: CFTimeInterval) {
        let elapsedTime:CGFloat = 100.0 //CGFloat(newTime - oldTime)
        
        world.update(elapsedTime)
        
        oldTime = newTime
    }
    
    func pannedLeft(percentage : CGFloat) {
        if userControlEnabled {
            flock.turningLeft(percentage)
        }
    }
    
    func pannedRight(percentage : CGFloat) {
        if userControlEnabled {
            flock.turningRight(percentage)
        }
    }
    
    func stoppedHorizontalPanning() {
        if userControlEnabled {
            flock.straighten()
        }
    }
    
    func stoppedVerticalPanning() {
        if userControlEnabled {
            flock.cruise()
        }
    }
    
    func pannedForward(percentage : CGFloat) {
        if userControlEnabled {
            flock.accelerate(min(1.0, percentage))
        }
    }
    
    func pannedBackward(percentage : CGFloat) {
        if userControlEnabled {
            flock.decelerate(min(1.0, percentage))
        }
    }
    
    override func didMoveToView(view: SKView) {
//        self.world.size =CGRect(origin: CGPointZero, size: <#CGSize#>) view.frame
//        
//        flock.configure(Vector2D(point: view.center), maxYTranslation : maxYTranslation)
//        debugControls.position = CGPoint(x: view.center.x, y: 0.0)
//        
        //
        //        for sprite in flock.sprites {
        //            addChild(sprite)
        //        }
        //
        //        if Settings.flyingEnabled {
        //            if flyingAnimationEnabled {
        //                flock.cruise()
        //            }
        //        }
        //        debugControls.position = CGPoint(x: view.center.x, y: 0.0)
        //        addChild(debugControls)
        //
        //        addChild(debugSteering.sprite)
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
}
