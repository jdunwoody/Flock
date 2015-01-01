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
        let pathToDraw = CGPathCreateMutable()
        CGPathMoveToPoint(pathToDraw, nil, 100.0, 100.0)
        CGPathAddLineToPoint(pathToDraw, nil, 50.0, 50.0)
        //        pathToDraw.addLineToPoint(50.0, 50.0)
        sprite = SKShapeNode(path: pathToDraw)
        //        sprite.path = pathToDraw
        sprite.strokeColor = SKColor.redColor()
        
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
    
    func update(force: CGPoint) {
        
    }
}