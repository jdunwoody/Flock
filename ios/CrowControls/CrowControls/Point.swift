
//
//  Point.swift
//  CrowControls
//
//  Created by James Dunwoody on 2/01/2015.
//  Copyright (c) 2015 James Dunwoody. All rights reserved.
//

import Foundation
import SpriteKit

class Point
{
    var x: CGFloat
    var y: CGFloat
    
    init(x: CGFloat, y: CGFloat) {
        self.x = x
        self.y = y
    }
    
    convenience init() {
        self.init(x: 0, y: 0)
    }
    
    convenience init(point: CGPoint) {
        self.init(x: point.x, y: point.y)
    }
    
    var point:CGPoint {
        return CGPoint(x: x, y: y)
    }
}

func +(left: Point, right: Point) -> Point {
    left.x = left.x + right.x
    left.y =  left.y + right.y
    
    return left
}

func += (left: Point, right: Point) -> Point {
    return left + right
}
//
//func /(left: Vector2D, right: CGFloat) -> Vector2D {
//    return Vector2D(x: left.x / right, y: left.y / right)
//}
//
//func +=(left: Vector2D, right: Vector2D) -> Vector2D {
//    return left + right
//}
//
//func -(left: Vector2D, right: Vector2D) -> Vector2D {
//    return Vector2D(x: left.x - right.x, y: left.y - right.y)
//}
//
//func -=(left: Vector2D, right: Vector2D) -> Vector2D {
//    return Vector2D(x: left.x - right.x, y: left.y - right.y)
//}
//
////func *(point: Vector2D, float: CGFloat) -> Vector2D {
////    return Vector2D(x: point.x * float, y: point.y * float)
////}
//
//func *=(point: Vector2D, factor: CGFloat) -> Vector2D {
//    return point * factor
//}
//
//func *(point: Vector2D, factor: CGFloat) -> Vector2D {
//    return Vector2D(x: point.x * factor, y:point.y * factor)
//}
//
//func !=(left: Bird, right: Bird) -> Bool {
//    return left.sprite != right.sprite
//}
//
//func /=(left: Vector2D, right: Int) -> Vector2D {
//    return Vector2D(x: left.x / CGFloat(right), y: left.y / CGFloat(right))
//}