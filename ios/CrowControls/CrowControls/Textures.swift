//
//  Textures.swift
//  CrowControls
//
//  Created by James Dunwoody on 12/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import SpriteKit

class Textures {
    let initial : SKTexture
    let flap : [SKTexture]
    let cruise : [SKTexture]
    
    init() {
        self.flap = []
        self.cruise = []
        
        if let atlas = SKTextureAtlas(named: "Birds.atlas") {
            for i in 1...3 {
                if let texture = SKTexture(imageNamed: "bird-\(i).png") {
                    self.flap.append(texture)
                }
            }
            self.cruise.append(self.flap[0])
        }
        
        self.initial = self.cruise[0]
    }
    
//    func flapping(flapCount : Int, glideCount : Int) -> [SKTexture] {
//        
//        return flap + cruise + cruise + cruise  + cruise + cruise + cruise  + cruise + cruise + cruise  + cruise + cruise + cruise  + cruise + cruise + cruise
//    }
}
