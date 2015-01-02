//
//  DebugForceLine.swift
//  CrowControls
//
//  Created by James Dunwoody on 1/01/2015.
//  Copyright (c) 2015 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class DebugForceLine
{
    let sprite: SKShapeNode
    
    init() {
        //        pathToDraw.addLineToPoint(50.0, 50.0)
        sprite = SKShapeNode()
        //        sprite.path = pathToDraw
        sprite.strokeColor = SKColor.redColor()
        linePath(0.0, y: 0.0)
        //        SKShapeNode *yourline = [SKShapeNode node];
        //        CGMutablePathRef pathToDraw = CGPathCreateMutable();
        //        CGPathMoveToPoint(pathToDraw, NULL, 100.0, 100.0);
        //        CGPathAddLineToPoint(pathToDraw, NULL, 50.0, 50.0);
        //        yourline.path = pathToDraw;
        //        [yourline setStrokeColor:[UIColor redColor]];
        //        [self addChild:yourline];
        //
        //        let ctx = UIGraphicsGetCurrentContext()
        //        let path = CGPathCreateMutable()
        //        CGPathMoveToPoint(path, nil, 0, 0)
        //        CGPathAddLineToPoint(path, nil, 0, 100)
        //        CGPathCloseSubpath(path)
        //        CGContextAddPath(ctx, path)
        //        CGContextSetStrokeColorWithColor(ctx,UIColor.redColor().CGColor)
        //        CGContextStrokePath(ctx)
        //
        //        sprite = SKShapeNode(path: path)
    }
    
    func update(force: Vector2D) {
        sprite.path = linePath(force.x * 1000.0, y: force.y * 1000.0)
    }
    
    private
    
    func linePath(x: CGFloat, y: CGFloat) -> CGPathRef {
        let pathToDraw = CGPathCreateMutable()
        CGPathMoveToPoint(pathToDraw, nil, 0.0, 0.0)
        CGPathAddLineToPoint(pathToDraw, nil, x, y)
     
        return pathToDraw
    }
}