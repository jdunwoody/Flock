//
//  GameViewController.swift
//  CrowControls
//
//  Created by James Dunwoody on 7/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import UIKit
import SpriteKit

extension SKNode {
    class func unarchiveFromFile(file : NSString) -> SKNode? {
        if let path = NSBundle.mainBundle().pathForResource(file, ofType: "sks") {
            var sceneData = NSData(contentsOfFile: path, options: .DataReadingMappedIfSafe, error: nil)!
            var archiver = NSKeyedUnarchiver(forReadingWithData: sceneData)
            
            archiver.setClass(self.classForKeyedUnarchiver(), forClassName: "SKScene")
            let scene = archiver.decodeObjectForKey(NSKeyedArchiveRootObjectKey) as GameScene
            archiver.finishDecoding()
            return scene
        } else {
            return nil
        }
    }
}

class GameViewController: UIViewController {
    
    @IBOutlet var controlsPanGestureRegogniser: UIPanGestureRecognizer!
    //    @IBOutlet var verticalPanGestureRecogniser: UIPanGestureRecognizer!
    
    var sceneRef : GameScene?
    var debugControls : DebugControls? = nil
    var bezierPath = UIBezierPath()
    var controlPoint2 = Vector2D()
    //    var bird : Bird
    @IBOutlet weak var controlsView: UIView!
    
    required init(coder: NSCoder) {
        //        self.bird = Bird()
        self.debugControls = DebugControls()
        super.init(coder: coder)
        
        debugControls?.updateControls(Vector2D(x: 0.0, y: 200.0 ))
    }
    
    @IBAction func configPressed(sender: AnyObject) {
        performSegueWithIdentifier("showSettings", sender: self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        
        self.sceneRef = GameScene.unarchiveFromFile("GameScene") as GameScene!
        
        self.debugControls?.updateControls(Vector2D(x: 0.0, y: 200.0 ))
        
        if let scene = sceneRef {
            scene.configure(view.center, maxYTranslation : self.controlsView.frame.height)
            
            let skView = self.view as SKView
            skView.showsFPS = true
            skView.showsNodeCount = true
            
            /* Sprite Kit applies additional optimizations to improve rendering performance */
            skView.ignoresSiblingOrder = true
            
            /* Set the scale mode to scale to fit the window */
            scene.scaleMode = .AspectFill
            
            scene.size = skView.bounds.size;
            
            skView.presentScene(scene)
        }
    }
    
    @IBAction func panned(sender: AnyObject) {
        let velocity = controlsPanGestureRegogniser.velocityInView(self.controlsView);
        let translation = controlsPanGestureRegogniser.translationInView(self.controlsView)
        
        if let scene = sceneRef {
            //            NSLog("Velocity %@", NSStringFromVector2D(velocity))
            //            NSLog("Translation %@", NSStringFromCGPoint(translation))
            //            NSLog("Total / 2 %@", view.frame.size.width / 2.0)
            
            if controlsPanGestureRegogniser.state == UIGestureRecognizerState.Ended {
                debugControls?.updateControls(Vector2D(x: 0.0, y: 200.0 ))
                if translation.x != 0 {
                    scene.stoppedHorizontalPanning()
                }
                if translation.y != 0 {
                    scene.stoppedVerticalPanning()
                }
                
            } else {
                debugControls?.updateControls(Vector2D(x: translation.x, y: translation.y))
                
                if translation.x > 0 {
                    scene.pannedRight(CGFloat(abs(translation.x)) / (CGFloat(controlsView.frame.size.width / 2.0)))
                    
                } else if translation.x < 0 {
                    scene.pannedLeft(CGFloat(abs(translation.x)) / (CGFloat(controlsView.frame.size.width / 2.0)))
                } else {
                    
                }
                
                if translation.y > 0 {
                    let percentMoved = CGFloat(abs(translation.y)) / (CGFloat(controlsView.frame.size.height))
                    
                    scene.pannedForward(percentMoved)
                } else if translation.y < 0 {
                    let percentMoved = CGFloat(abs(translation.y)) / (CGFloat(controlsView.frame.size.height))
                    
                    scene.pannedBackward(percentMoved)
                } else {
                    
                }
            }
        }
    }
    
    override func shouldAutorotate() -> Bool {
        return true
    }
    
    override func supportedInterfaceOrientations() -> Int {
        if UIDevice.currentDevice().userInterfaceIdiom == .Phone {
            return Int(UIInterfaceOrientationMask.AllButUpsideDown.rawValue)
        } else {
            return Int(UIInterfaceOrientationMask.All.rawValue)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Release any cached data, images, etc that aren't in use.
    }
    
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
    
    //    private
    //
    //    func drawCurve()
    //    {
    //        let cgPath = CGPathCreateMutable();
    //
    //
    //        self.controlPoint2 = Vector2D(x: 100.0, y: 100.0)
    //        self.bezierPath.moveToPoint(Vector2D(x: 0.0, y: 0.0))
    //        self.bezierPath.addCurveToPoint(Vector2D(x: 100.0,y: 220.0), controlPoint1: Vector2D(x: 0.0, y: 220.0), controlPoint2: self.controlPoint2)
    //        self.path = bezierPath.CGPath
    //
    //    }
}

