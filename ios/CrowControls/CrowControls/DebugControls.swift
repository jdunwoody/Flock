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
    var controlPoint1 :CGPoint
    var controlPoint2 :CGPoint
    var point1 :CGPoint
    var point2 :CGPoint
    
    override init()
    {
        controlPoint1 = CGPoint(x: 0.0, y: 100.0)
        controlPoint2 = CGPoint(x: 0.0, y: 200.0)
        point1 = CGPointZero
        point2 = CGPoint(x: 0.0, y: 200.0)
        
        super.init()
        
        updatePoint2(CGPointZero)
        
        self.updatePath()
    }
    
    func updateControls(velocity : CGPoint)
    {
        updatePoint2(velocity)
        self.updatePath()
    }
    
    required init?(coder: NSCoder) {
        fatalError("NSCoding not supported")
    }
    
    private
    
    func updatePoint2(change :CGPoint)
    {
        self.point2 = CGPoint(x: point1.x + change.x, y: point1.y + 200.0 + change.y)
    }
    
    func updatePath()
    {
        bezierPath.moveToPoint(point1)
        bezierPath.addCurveToPoint(point2, controlPoint1: controlPoint1, controlPoint2: controlPoint2)
        self.path = bezierPath.CGPath
        bezierPath.removeAllPoints()
    }
}