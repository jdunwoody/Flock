//
//  Vector2D.swift
//  CrowControls
//
//  Created by James Dunwoody on 1/01/2015.
//  Copyright (c) 2015 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class Vector2D {
    var x:CGFloat = 0.0
    var y:CGFloat = 0.0

    convenience init(point: CGPoint) {
        self.init(x: point.x, y: point.y)
    }
    
    convenience init() {
        self.init(x: 0, y: 0)
    }
    
    init(x: CGFloat, y: CGFloat) {
        self.x = x
        self.y = y
    }
    
    var point:CGPoint {
        return CGPoint(x: x, y: y)
    }
    
    var string:NSString {
        return "(\(x), \(y))"
    }
}

func +(left: Vector2D, right: Vector2D) -> Vector2D {
    left.x = left.x + right.x
    
    left.y =  left.y + right.y
    
    return left
}