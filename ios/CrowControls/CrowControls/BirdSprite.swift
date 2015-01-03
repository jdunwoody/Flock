//
//  BirdSprite.swift
//  CrowControls
//
//  Created by James Dunwoody on 11/12/2014.
//  Copyright (c) 2014 James Dunwoody. All rights reserved.
//

import SpriteKit

class BirdSprite: SKSpriteNode {
    
    var textures : Textures
    var actions : BirdActions
    
    init(actions : BirdActions, textures : Textures) {
        self.actions = actions
        self.textures = textures
      
        super.init(texture: self.textures.initial, color: UIColor.clearColor(), size: self.textures.initial.size())
    }
    
    //    convenience init(texture: SKTexture!) {
    //        self.init(texture: texture, color: UIColor.clearColor(), size: texture.size())
    //    }
    
    //    override init(texture: SKTexture!, color: UIColor!, size: CGSize) {
    //        textures = Textures().birdTextures()
    //
    //        super.init(texture: texture, color: color, size: size)
    //
    //    }
    
    required init?(coder: NSCoder) {
        fatalError("NSCoding not supported")
    }
}