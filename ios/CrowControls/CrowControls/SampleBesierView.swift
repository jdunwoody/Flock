//
//  CustomView.swift
//  SwiftBezierPath
//
//  Created by Debasis Das on 6/2/14.
//  Copyright (c) 2014 KnowStack. All rights reserved.
//
//import Cocoa
//import Foundation
//
//class CustomView: NSView{
//    override func drawRect(dirtyRect: NSRect)
//    {
//        println(dirtyRect)
//        var bPath:NSBezierPath = NSBezierPath(rect: dirtyRect)
//        println(bPath)
//        let fillColor = NSColor(red: 0.5, green: 0.0, blue: 0.5, alpha: 1.0)
//        fillColor.set()
//        bPath.fill()
//        
//        let borderColor = NSColor(red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0)
//        borderColor.set()
//        bPath.lineWidth = 12.0
//        bPath.stroke()
//        
//        let circleFillColor = NSColor(red: 0.0, green: 1.0, blue: 0.0, alpha: 1.0)
//        var circleRect = NSMakeRect(dirtyRect.size.width/4, dirtyRect.size.height/4, dirtyRect.size.width/2, dirtyRect.size.height/2)
//        var cPath: NSBezierPath = NSBezierPath(ovalInRect: circleRect)
//        circleFillColor.set()
//        cPath.fill()
//    }
//}