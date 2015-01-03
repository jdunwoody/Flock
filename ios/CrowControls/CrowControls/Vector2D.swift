//
//  Vector2D.swift
//  CrowControls
//
//  Created by James Dunwoody on 1/01/2015.
//  Copyright (c) 2015 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit
//import vBasicOps
import UIKit

class Vector2D { //: DebugPrintable, Printable {
    var x:CGFloat = 0.0
    var y:CGFloat = 0.0
    
    convenience init(point: CGPoint) {
        self.init(x: point.x, y: point.y)
    }
    
    init() {
        self.x = 0
        self.y = 0
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
    
    func rotate(degrees: CGFloat) -> Vector2D {
        return self
    }
    
    var lengthSquared: CGFloat {
        return self.x * self.x + self.y * self.y
    }
    
    var length: CGFloat {
        return sqrt(lengthSquared)
    }
    
    var normalized: Vector2D {
        let x = self.x / self.length
        let y = self.y / self.length
        
        return Vector2D(x: x, y: y)
    }
    
    var perpendicular: Vector2D {
        x = -y
        y = x
        return self
    }
    
    func truncate(max: CGFloat) -> Vector2D {
        let len = length
        
        if len > max {
            let angle = atan2(y, x)
            x = cos(angle) * max
            y = sin(angle) * max
        }
        
        return self
    }
    
    func update(newValue: Vector2D) -> Vector2D {
        x = newValue.x
        y = newValue.y
        return self
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
    
    //    func debugQuickLookObject() -> NSString {
    //        return "hi"
    //    }
    //
    
    
    //    - (NSString*)description {
    //    return [NSString stringWithFormat:@"%@; x=%f, y=%f", [super description], _x, _y];
    //    }
    //    override var description: String {
    //        get {
    //            return "(\(x),\(y))"
    //        }
    //    }
    
    func customDescription() -> String {
        return "(\(x),\(y))"
    }
    
    var description: String {
        return customDescription()
    }
    
    //    override var description : String {
    //        return "**** PageContentViewController\npageIndex equals \(x) ****\n"
    //    }
    
    //    override var debugDescription : String {
    //        return "---- PageContentViewController\npageIndex equals \(x) ----\n"
    //    }
    
    //    class func description() -> String {
    //        return "(\(x),\(y))"
    //    }
    
    //    func debugDescripton() -> NSString {
    //        return "Debug Description"
    //    }
    //    override func description() -> NSString {
    //        return "Description"
    //    }
    //
    //    func debugQuickLookObject() -> AnyObject? {
    //        let ctx = UIGraphicsGetCurrentContext()
    //        let path = CGPathCreateMutable()
    //        CGPathMoveToPoint(path, nil, 0, 0)
    //        CGPathAddLineToPoint(path, nil, x, y)
    //        CGPathCloseSubpath(path)
    //        CGContextAddPath(ctx, path)
    //        CGContextSetStrokeColorWithColor(ctx,UIColor.redColor().CGColor)
    //        CGContextStrokePath(ctx)
    //
    //
    //
    //        let image = CGImage(   [NSImage imageWithSize:QUICK_LOOK_IMAGE_SIZE flipped:NO drawingHandler:^BOOL(NSRect dstRect) {
    //
    //            CGFloat midX = NSMidX(dstRect);
    //            CGFloat midY = NSMidY(dstRect);
    //            NSUInteger numCircles = 5;
    //            CGFloat circleSpacing = -10.0;
    //            CGFloat circleRadius = 20.0;
    //            CGFloat circleDiameter = circleRadius * 2;
    //            CGFloat stride = circleDiameter + circleSpacing;
    //            CGFloat currentCircleX = midX - (stride * numCircles)/2.0;
    //
    //            NSColor *strokeColor = [NSColor colorWithCalibratedRed:0.10 green:0.41 blue:1.0 alpha:1.0];
    //            NSColor *fillColor = [strokeColor colorWithAlphaComponent:0.15];
    //
    //            for (NSUInteger i=0; i < numCircles; i++) {
    //            NSRect circleRect = NSMakeRect(currentCircleX, midY - circleRadius, circleDiameter, circleDiameter);
    //            NSBezierPath *circlePath = [NSBezierPath bezierPathWithOvalInRect:circleRect];
    //            [fillColor set];
    //            [circlePath fill];
    //            [strokeColor set];
    //            [circlePath stroke];
    //            currentCircleX += stride;
    //            }
    //            return YES;
    //            }];
    //        return image;
    //    }
}

func +(left: Vector2D, right: Vector2D) -> Vector2D {
    left.x = left.x + right.x
    
    left.y =  left.y + right.y
    
    return left
}

func += (left: Vector2D, right: CGFloat) -> Vector2D {
    left.x = left.x + right
    left.y = left.y + right
    return left
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

func *=(point: Vector2D, factor: CGFloat) -> Vector2D {
    return point * factor
}

func *(point: Vector2D, factor: CGFloat) -> Vector2D {
    return Vector2D(x: point.x * factor, y:point.y * factor)
}

func !=(left: Bird, right: Bird) -> Bool {
    return left.sprite != right.sprite
}

func /(left: Vector2D, right: Int) -> Vector2D {
    left.x = left.x / CGFloat(right)
    left.y = left.y / CGFloat(right)
    return left
}

func /=(left: Vector2D, right: Int) -> Vector2D {
    return left / right
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

