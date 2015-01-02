//
//  DebugControls.swift
//  CrowControls
//
//  Created by James Dunwoody on 12/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import SpriteKit

class DebugControls : SKShapeNode
{
    let bezierPath = UIBezierPath()
    var controlPoint1 :Vector2D
    var controlPoint2 :Vector2D
    var point1 :Vector2D
    var point2 :Vector2D
    
    override init()
    {
        controlPoint1 = Vector2D(x: 0.0, y: 100.0)
        controlPoint2 = Vector2D(x: 0.0, y: 200.0)
        point1 = Vector2D()
        point2 = Vector2D(x: 0.0, y: 200.0)
        
        super.init()
        
        updatePoint2(Vector2D())
        
        self.updatePath()
    }
    
    func updateControls(velocity : Vector2D)
    {
        updatePoint2(velocity)
        self.updatePath()
    }
    
    required init?(coder: NSCoder) {
        fatalError("NSCoding not supported")
    }
    
    private
    
    func updatePoint2(change :Vector2D)
    {
        self.point2 = Vector2D(x: point1.x + change.x, y: point1.y + 200.0 + change.y)
    }
    
    func updatePath()
    {
        bezierPath.moveToPoint(point1.point)
        bezierPath.addCurveToPoint(point2.point, controlPoint1: controlPoint1.point, controlPoint2: controlPoint2.point)
        self.path = bezierPath.CGPath
        bezierPath.removeAllPoints()
    }
}