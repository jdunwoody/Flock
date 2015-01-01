//
//  Flock.swift
//  CrowControls
//
//  Created by James Dunwoody on 24/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class Flock {
    
    let birds: [Bird]
    let lead: Bird
    var origin: CGPoint {
        get {
            return birds[0].origin
        }
        
        set {
            birds[0].origin = newValue
        }
    }
    
    var sprites : [SKSpriteNode] {
        get {
            return birds.map {
                $0.sprite
            }
        }
    }
    
    init() {
        birds = []
        
        for var i = 0; i < Settings.initialNumberOfBirds; i++ {
            birds.append(Bird())
        }
        lead = birds[0]
    }
    
    func update() {
        for bird in birds {
            bird.update(self)
        }
    }
    
    func configure(centre : CGPoint, maxYTranslation : CGFloat) {
        lead.configure(origin, maxYTranslation: maxYTranslation)
        
        for bird in birds {
            if bird == lead {
                continue
            }
            let birdOrigin = CGPoint(
                x: CGFloat(arc4random_uniform(200)),
                y: CGFloat(arc4random_uniform(200)))
            bird.configure(birdOrigin, maxYTranslation: maxYTranslation)
        }
    }
    
    func turningRight(percentage : CGFloat) {
        for bird in birds {
            bird.turningRight(percentage)
        }
    }
    
    func turningLeft(percentage : CGFloat) {
        for bird in birds {
            bird.turningLeft(percentage)
        }
    }
    
    func straighten() {
        for bird in birds {
            bird.straighten()
        }
    }
    
    func cruise() {
        for bird in birds {
            bird.cruise()
        }
    }
    
    func accelerate(percentage : CGFloat) {
        for bird in birds {
            bird.accelerate(percentage)
        }
    }
    
    func decelerate(percentage : CGFloat) {
        for bird in birds {
            bird.deccelerate(percentage)
        }
    }
    
    func steeringForce() {
        for bird in birds {
            let a = bird as Bird
            let b = birds[0] as Bird
            if a == b {
                continue
            }
            if bird == birds[0] {
                continue
            }
        }
    }
}

func ==(left: Bird, right: Bird) -> Bool {
    return left.sprite == right.sprite
}
