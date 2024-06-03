// Function to access the active list
function getActiveList() {
    return Phaser.Display.Canvas.CanvasPool.pool[0].parent.game.scene.keys.battle.sys.make.updateList._active;
}

// Function to categorize active list objects into specific lists by class names
function categorizeActiveList(activeList) {
    const enemyBattleInfoList = [];
    const enemyPokemonList = [];

    for (let i = activeList.length - 1; i >= 0; i--) {
        const obj = activeList[i];
        if (
            obj &&
            obj.parentContainer &&
            obj.parentContainer.constructor
        ) {
            const className = obj.parentContainer.constructor.name;
            if (className === "EnemyBattleInfo") {
                enemyBattleInfoList.push(obj.parentContainer);
            } else if (className === "EnemyPokemon") {
                enemyPokemonList.push(obj.parentContainer);
            }
        }
    }

    return { enemyBattleInfoList, enemyPokemonList };
}

// Function to build a map of objects by key-value pair
function buildObjectMap(objects, key) {
    const map = new Map();
    objects.forEach(obj => {
        if (obj[key] !== undefined) {
            map.set(obj[key], obj);
        }
    });
    return map;
}

const Moves = {0: "None", 1: "Pound", 2: "Karate Chop", 3: "Double Slap", 4: "Comet Punch", 5: "Mega Punch", 6: "Pay Day", 7: "Fire Punch", 8: "Ice Punch", 9: "Thunder Punch", 10: "Scratch", 11: "Vise Grip", 12: "Guillotine", 13: "Razor Wind", 14: "Swords Dance", 15: "Cut", 16: "Gust", 17: "Wing Attack", 18: "Whirlwind", 19: "Fly", 20: "Bind", 21: "Slam", 22: "Vine Whip", 23: "Stomp", 24: "Double Kick", 25: "Mega Kick", 26: "Jump Kick", 27: "Rolling Kick", 28: "Sand Attack", 29: "Headbutt", 30: "Horn Attack", 31: "Fury Attack", 32: "Horn Drill", 33: "Tackle", 34: "Body Slam", 35: "Wrap", 36: "Take Down", 37: "Thrash", 38: "Double Edge", 39: "Tail Whip", 40: "Poison Sting", 41: "Twineedle", 42: "Pin Missile", 43: "Leer", 44: "Bite", 45: "Growl", 46: "Roar", 47: "Sing", 48: "Supersonic", 49: "Sonic Boom", 50: "Disable", 51: "Acid", 52: "Ember", 53: "Flamethrower", 54: "Mist", 55: "Water Gun", 56: "Hydro Pump", 57: "Surf", 58: "Ice Beam", 59: "Blizzard", 60: "Psybeam", 61: "Bubble Beam", 62: "Aurora Beam", 63: "Hyper Beam", 64: "Peck", 65: "Drill Peck", 66: "Submission", 67: "Low Kick", 68: "Counter", 69: "Seismic Toss", 70: "Strength", 71: "Absorb", 72: "Mega Drain", 73: "Leech Seed", 74: "Growth", 75: "Razor Leaf", 76: "Solar Beam", 77: "Poison Powder", 78: "Stun Spore", 79: "Sleep Powder", 80: "Petal Dance", 81: "String Shot", 82: "Dragon Rage", 83: "Fire Spin", 84: "Thunder Shock", 85: "Thunderbolt", 86: "Thunder Wave", 87: "Thunder", 88: "Rock Throw", 89: "Earthquake", 90: "Fissure", 91: "Dig", 92: "Toxic", 93: "Confusion", 94: "Psychic", 95: "Hypnosis", 96: "Meditate", 97: "Agility", 98: "Quick Attack", 99: "Rage", 100: "Teleport", 101: "Night Shade", 102: "Mimic", 103: "Screech", 104: "Double Team", 105: "Recover", 106: "Harden", 107: "Minimize", 108: "Smokescreen", 109: "Confuse Ray", 110: "Withdraw", 111: "Defense Curl", 112: "Barrier", 113: "Light Screen", 114: "Haze", 115: "Reflect", 116: "Focus Energy", 117: "Bide", 118: "Metronome", 119: "Mirror Move", 120: "Self Destruct", 121: "Egg Bomb", 122: "Lick", 123: "Smog", 124: "Sludge", 125: "Bone Club", 126: "Fire Blast", 127: "Waterfall", 128: "Clamp", 129: "Swift", 130: "Skull Bash", 131: "Spike Cannon", 132: "Constrict", 133: "Amnesia", 134: "Kinesis", 135: "Soft Boiled", 136: "High Jump Kick", 137: "Glare", 138: "Dream Eater", 139: "Poison Gas", 140: "Barrage", 141: "Leech Life", 142: "Lovely Kiss", 143: "Sky Attack", 144: "Transform", 145: "Bubble", 146: "Dizzy Punch", 147: "Spore", 148: "Flash", 149: "Psywave", 150: "Splash", 151: "Acid Armor", 152: "Crabhammer", 153: "Explosion", 154: "Fury Swipes", 155: "Bonemerang", 156: "Rest", 157: "Rock Slide", 158: "Hyper Fang", 159: "Sharpen", 160: "Conversion", 161: "Tri Attack", 162: "Super Fang", 163: "Slash", 164: "Substitute", 165: "Struggle", 166: "Sketch", 167: "Triple Kick", 168: "Thief", 169: "Spider Web", 170: "Mind Reader", 171: "Nightmare", 172: "Flame Wheel", 173: "Snore", 174: "Curse", 175: "Flail", 176: "Conversion 2", 177: "Aeroblast", 178: "Cotton Spore", 179: "Reversal", 180: "Spite", 181: "Powder Snow", 182: "Protect", 183: "Mach Punch", 184: "Scary Face", 185: "Feint Attack", 186: "Sweet Kiss", 187: "Belly Drum", 188: "Sludge Bomb", 189: "Mud Slap", 190: "Octazooka", 191: "Spikes", 192: "Zap Cannon", 193: "Foresight", 194: "Destiny Bond", 195: "Perish Song", 196: "Icy Wind", 197: "Detect", 198: "Bone Rush", 199: "Lock On", 200: "Outrage", 201: "Sandstorm", 202: "Giga Drain", 203: "Endure", 204: "Charm", 205: "Rollout", 206: "False Swipe", 207: "Swagger", 208: "Milk Drink", 209: "Spark", 210: "Fury Cutter", 211: "Steel Wing", 212: "Mean Look", 213: "Attract", 214: "Sleep Talk", 215: "Heal Bell", 216: "Return", 217: "Present", 218: "Frustration", 219: "Safeguard", 220: "Pain Split", 221: "Sacred Fire", 222: "Magnitude", 223: "Dynamic Punch", 224: "Megahorn", 225: "Dragon Breath", 226: "Baton Pass", 227: "Encore", 228: "Pursuit", 229: "Rapid Spin", 230: "Sweet Scent", 231: "Iron Tail", 232: "Metal Claw", 233: "Vital Throw", 234: "Morning Sun", 235: "Synthesis", 236: "Moonlight", 237: "Hidden Power", 238: "Cross Chop", 239: "Twister", 240: "Rain Dance", 241: "Sunny Day", 242: "Crunch", 243: "Mirror Coat", 244: "Psych Up", 245: "Extreme Speed", 246: "Ancient Power", 247: "Shadow Ball", 248: "Future Sight", 249: "Rock Smash", 250: "Whirlpool", 251: "Beat Up", 252: "Fake Out", 253: "Uproar", 254: "Stockpile", 255: "Spit Up", 256: "Swallow", 257: "Heat Wave", 258: "Hail", 259: "Torment", 260: "Flatter", 261: "Will O Wisp", 262: "Memento", 263: "Facade", 264: "Focus Punch", 265: "Smelling Salts", 266: "Follow Me", 267: "Nature Power", 268: "Charge", 269: "Taunt", 270: "Helping Hand", 271: "Trick", 272: "Role Play", 273: "Wish", 274: "Assist", 275: "Ingrain", 276: "Superpower", 277: "Magic Coat", 278: "Recycle", 279: "Revenge", 280: "Brick Break", 281: "Yawn", 282: "Knock Off", 283: "Endeavor", 284: "Eruption", 285: "Skill Swap", 286: "Imprison", 287: "Refresh", 288: "Grudge", 289: "Snatch", 290: "Secret Power", 291: "Dive", 292: "Arm Thrust", 293: "Camouflage", 294: "Tail Glow", 295: "Luster Purge", 296: "Mist Ball", 297: "Feather Dance", 298: "Teeter Dance", 299: "Blaze Kick", 300: "Mud Sport", 301: "Ice Ball", 302: "Needle Arm", 303: "Slack Off", 304: "Hyper Voice", 305: "Poison Fang", 306: "Crush Claw", 307: "Blast Burn", 308: "Hydro Cannon", 309: "Meteor Mash", 310: "Astonish", 311: "Weather Ball", 312: "Aromatherapy", 313: "Fake Tears", 314: "Air Cutter", 315: "Overheat", 316: "Odor Sleuth", 317: "Rock Tomb", 318: "Silver Wind", 319: "Metal Sound", 320: "Grass Whistle", 321: "Tickle", 322: "Cosmic Power", 323: "Water Spout", 324: "Signal Beam", 325: "Shadow Punch", 326: "Extrasensory", 327: "Sky Uppercut", 328: "Sand Tomb", 329: "Sheer Cold", 330: "Muddy Water", 331: "Bullet Seed", 332: "Aerial Ace", 333: "Icicle Spear", 334: "Iron Defense", 335: "Block", 336: "Howl", 337: "Dragon Claw", 338: "Frenzy Plant", 339: "Bulk Up", 340: "Bounce", 341: "Mud Shot", 342: "Poison Tail", 343: "Covet", 344: "Volt Tackle", 345: "Magical Leaf", 346: "Water Sport", 347: "Calm Mind", 348: "Leaf Blade", 349: "Dragon Dance", 350: "Rock Blast", 351: "Shock Wave", 352: "Water Pulse", 353: "Doom Desire", 354: "Psycho Boost", 355: "Roost", 356: "Gravity", 357: "Miracle Eye", 358: "Wake Up Slap", 359: "Hammer Arm", 360: "Gyro Ball", 361: "Healing Wish", 362: "Brine", 363: "Natural Gift", 364: "Feint", 365: "Pluck", 366: "Tailwind", 367: "Acupressure", 368: "Metal Burst", 369: "U Turn", 370: "Close Combat", 371: "Payback", 372: "Assurance", 373: "Embargo", 374: "Fling", 375: "Psycho Shift", 376: "Trump Card", 377: "Heal Block", 378: "Wring Out", 379: "Power Trick", 380: "Gastro Acid", 381: "Lucky Chant", 382: "Me First", 383: "Copycat", 384: "Power Swap", 385: "Guard Swap", 386: "Punishment", 387: "Last Resort", 388: "Worry Seed", 389: "Sucker Punch", 390: "Toxic Spikes", 391: "Heart Swap", 392: "Aqua Ring", 393: "Magnet Rise", 394: "Flare Blitz", 395: "Force Palm", 396: "Aura Sphere", 397: "Rock Polish", 398: "Poison Jab", 399: "Dark Pulse", 400: "Night Slash", 401: "Aqua Tail", 402: "Seed Bomb", 403: "Air Slash", 404: "X Scissor", 405: "Bug Buzz", 406: "Dragon Pulse", 407: "Dragon Rush", 408: "Power Gem", 409: "Drain Punch", 410: "Vacuum Wave", 411: "Focus Blast", 412: "Energy Ball", 413: "Brave Bird", 414: "Earth Power", 415: "Switcheroo", 416: "Giga Impact", 417: "Nasty Plot", 418: "Bullet Punch", 419: "Avalanche", 420: "Ice Shard", 421: "Shadow Claw", 422: "Thunder Fang", 423: "Ice Fang", 424: "Fire Fang", 425: "Shadow Sneak", 426: "Mud Bomb", 427: "Psycho Cut", 428: "Zen Headbutt", 429: "Mirror Shot", 430: "Flash Cannon", 431: "Rock Climb", 432: "Defog", 433: "Trick Room", 434: "Draco Meteor", 435: "Discharge", 436: "Lava Plume", 437: "Leaf Storm", 438: "Power Whip", 439: "Rock Wrecker", 440: "Cross Poison", 441: "Gunk Shot", 442: "Iron Head", 443: "Magnet Bomb", 444: "Stone Edge", 445: "Captivate", 446: "Stealth Rock", 447: "Grass Knot", 448: "Chatter", 449: "Judgment", 450: "Bug Bite", 451: "Charge Beam", 452: "Wood Hammer", 453: "Aqua Jet", 454: "Attack Order", 455: "Defend Order", 456: "Heal Order", 457: "Head Smash", 458: "Double Hit", 459: "Roar Of Time", 460: "Spacial Rend", 461: "Lunar Dance", 462: "Crush Grip", 463: "Magma Storm", 464: "Dark Void", 465: "Seed Flare", 466: "Ominous Wind", 467: "Shadow Force", 468: "Hone Claws", 469: "Wide Guard", 470: "Guard Split", 471: "Power Split", 472: "Wonder Room", 473: "Psyshock", 474: "Venoshock", 475: "Autotomize", 476: "Rage Powder", 477: "Telekinesis", 478: "Magic Room", 479: "Smack Down", 480: "Storm Throw", 481: "Flame Burst", 482: "Sludge Wave", 483: "Quiver Dance", 484: "Heavy Slam", 485: "Synchronoise", 486: "Electro Ball", 487: "Soak", 488: "Flame Charge", 489: "Coil", 490: "Low Sweep", 491: "Acid Spray", 492: "Foul Play", 493: "Simple Beam", 494: "Entrainment", 495: "After You", 496: "Round", 497: "Echoed Voice", 498: "Chip Away", 499: "Clear Smog", 500: "Stored Power", 501: "Quick Guard", 502: "Ally Switch", 503: "Scald", 504: "Shell Smash", 505: "Heal Pulse", 506: "Hex", 507: "Sky Drop", 508: "Shift Gear", 509: "Circle Throw", 510: "Incinerate", 511: "Quash", 512: "Acrobatics", 513: "Reflect Type", 514: "Retaliate", 515: "Final Gambit", 516: "Bestow", 517: "Inferno", 518: "Water Pledge", 519: "Fire Pledge", 520: "Grass Pledge", 521: "Volt Switch", 522: "Struggle Bug", 523: "Bulldoze", 524: "Frost Breath", 525: "Dragon Tail", 526: "Work Up", 527: "Electroweb", 528: "Wild Charge", 529: "Drill Run", 530: "Dual Chop", 531: "Heart Stamp", 532: "Horn Leech", 533: "Sacred Sword", 534: "Razor Shell", 535: "Heat Crash", 536: "Leaf Tornado", 537: "Steamroller", 538: "Cotton Guard", 539: "Night Daze", 540: "Psystrike", 541: "Tail Slap", 542: "Hurricane", 543: "Head Charge", 544: "Gear Grind", 545: "Searing Shot", 546: "Techno Blast", 547: "Relic Song", 548: "Secret Sword", 549: "Glaciate", 550: "Bolt Strike", 551: "Blue Flare", 552: "Fiery Dance", 553: "Freeze Shock", 554: "Ice Burn", 555: "Snarl", 556: "Icicle Crash", 557: "V Create", 558: "Fusion Flare", 559: "Fusion Bolt", 560: "Flying Press", 561: "Mat Block", 562: "Belch", 563: "Rototiller", 564: "Sticky Web", 565: "Fell Stinger", 566: "Phantom Force", 567: "Trick Or Treat", 568: "Noble Roar", 569: "Ion Deluge", 570: "Parabolic Charge", 571: "Forests Curse", 572: "Petal Blizzard", 573: "Freeze Dry", 574: "Disarming Voice", 575: "Parting Shot", 576: "Topsy Turvy", 577: "Draining Kiss", 578: "Crafty Shield", 579: "Flower Shield", 580: "Grassy Terrain", 581: "Misty Terrain", 582: "Electrify", 583: "Play Rough", 584: "Fairy Wind", 585: "Moonblast", 586: "Boomburst", 587: "Fairy Lock", 588: "Kings Shield", 589: "Play Nice", 590: "Confide", 591: "Diamond Storm", 592: "Steam Eruption", 593: "Hyperspace Hole", 594: "Water Shuriken", 595: "Mystical Fire", 596: "Spiky Shield", 597: "Aromatic Mist", 598: "Eerie Impulse", 599: "Venom Drench", 600: "Powder", 601: "Geomancy", 602: "Magnetic Flux", 603: "Happy Hour", 604: "Electric Terrain", 605: "Dazzling Gleam", 606: "Celebrate", 607: "Hold Hands", 608: "Baby Doll Eyes", 609: "Nuzzle", 610: "Hold Back", 611: "Infestation", 612: "Power Up Punch", 613: "Oblivion Wing", 614: "Thousand Arrows", 615: "Thousand Waves", 616: "Lands Wrath", 617: "Light Of Ruin", 618: "Origin Pulse", 619: "Precipice Blades", 620: "Dragon Ascent", 621: "Hyperspace Fury", 622: "Breakneck Blitz  Physical", 623: "Breakneck Blitz  Special", 624: "All Out Pummeling  Physical", 625: "All Out Pummeling  Special", 626: "Supersonic Skystrike  Physical", 627: "Supersonic Skystrike  Special", 628: "Acid Downpour  Physical", 629: "Acid Downpour  Special", 630: "Tectonic Rage  Physical", 631: "Tectonic Rage  Special", 632: "Continental Crush  Physical", 633: "Continental Crush  Special", 634: "Savage Spin Out  Physical", 635: "Savage Spin Out  Special", 636: "Never Ending Nightmare  Physical", 637: "Never Ending Nightmare  Special", 638: "Corkscrew Crash  Physical", 639: "Corkscrew Crash  Special", 640: "Inferno Overdrive  Physical", 641: "Inferno Overdrive  Special", 642: "Hydro Vortex  Physical", 643: "Hydro Vortex  Special", 644: "Bloom Doom  Physical", 645: "Bloom Doom  Special", 646: "Gigavolt Havoc  Physical", 647: "Gigavolt Havoc  Special", 648: "Shattered Psyche  Physical", 649: "Shattered Psyche  Special", 650: "Subzero Slammer  Physical", 651: "Subzero Slammer  Special", 652: "Devastating Drake  Physical", 653: "Devastating Drake  Special", 654: "Black Hole Eclipse  Physical", 655: "Black Hole Eclipse  Special", 656: "Twinkle Tackle  Physical", 657: "Twinkle Tackle  Special", 658: "Catastropika", 659: "Shore Up", 660: "First Impression", 661: "Baneful Bunker", 662: "Spirit Shackle", 663: "Darkest Lariat", 664: "Sparkling Aria", 665: "Ice Hammer", 666: "Floral Healing", 667: "High Horsepower", 668: "Strength Sap", 669: "Solar Blade", 670: "Leafage", 671: "Spotlight", 672: "Toxic Thread", 673: "Laser Focus", 674: "Gear Up", 675: "Throat Chop", 676: "Pollen Puff", 677: "Anchor Shot", 678: "Psychic Terrain", 679: "Lunge", 680: "Fire Lash", 681: "Power Trip", 682: "Burn Up", 683: "Speed Swap", 684: "Smart Strike", 685: "Purify", 686: "Revelation Dance", 687: "Core Enforcer", 688: "Trop Kick", 689: "Instruct", 690: "Beak Blast", 691: "Clanging Scales", 692: "Dragon Hammer", 693: "Brutal Swing", 694: "Aurora Veil", 695: "Sinister Arrow Raid", 696: "Malicious Moonsault", 697: "Oceanic Operetta", 698: "Guardian Of Alola", 699: "Soul Stealing 7 Star Strike", 700: "Stoked Sparksurfer", 701: "Pulverizing Pancake", 702: "Extreme Evoboost", 703: "Genesis Supernova", 704: "Shell Trap", 705: "Fleur Cannon", 706: "Psychic Fangs", 707: "Stomping Tantrum", 708: "Shadow Bone", 709: "Accelerock", 710: "Liquidation", 711: "Prismatic Laser", 712: "Spectral Thief", 713: "Sunsteel Strike", 714: "Moongeist Beam", 715: "Tearful Look", 716: "Zing Zap", 717: "Natures Madness", 718: "Multi Attack", 719: "Ten Million Volt Thunderbolt", 720: "Mind Blown", 721: "Plasma Fists", 722: "Photon Geyser", 723: "Light That Burns The Sky", 724: "Searing Sunraze Smash", 725: "Menacing Moonraze Maelstrom", 726: "Lets Snuggle Forever", 727: "Splintered Stormshards", 728: "Clangorous Soulblaze", 729: "Zippy Zap", 730: "Splishy Splash", 731: "Floaty Fall", 732: "Pika Papow", 733: "Bouncy Bubble", 734: "Buzzy Buzz", 735: "Sizzly Slide", 736: "Glitzy Glow", 737: "Baddy Bad", 738: "Sappy Seed", 739: "Freezy Frost", 740: "Sparkly Swirl", 741: "Veevee Volley", 742: "Double Iron Bash", 743: "Max Guard", 744: "Dynamax Cannon", 745: "Snipe Shot", 746: "Jaw Lock", 747: "Stuff Cheeks", 748: "No Retreat", 749: "Tar Shot", 750: "Magic Powder", 751: "Dragon Darts", 752: "Teatime", 753: "Octolock", 754: "Bolt Beak", 755: "Fishious Rend", 756: "Court Change", 757: "Max Flare", 758: "Max Flutterby", 759: "Max Lightning", 760: "Max Strike", 761: "Max Knuckle", 762: "Max Phantasm", 763: "Max Hailstorm", 764: "Max Ooze", 765: "Max Geyser", 766: "Max Airstream", 767: "Max Starfall", 768: "Max Wyrmwind", 769: "Max Mindstorm", 770: "Max Rockfall", 771: "Max Quake", 772: "Max Darkness", 773: "Max Overgrowth", 774: "Max Steelspike", 775: "Clangorous Soul", 776: "Body Press", 777: "Decorate", 778: "Drum Beating", 779: "Snap Trap", 780: "Pyro Ball", 781: "Behemoth Blade", 782: "Behemoth Bash", 783: "Aura Wheel", 784: "Breaking Swipe", 785: "Branch Poke", 786: "Overdrive", 787: "Apple Acid", 788: "Grav Apple", 789: "Spirit Break", 790: "Strange Steam", 791: "Life Dew", 792: "Obstruct", 793: "False Surrender", 794: "Meteor Assault", 795: "Eternabeam", 796: "Steel Beam", 797: "Expanding Force", 798: "Steel Roller", 799: "Scale Shot", 800: "Meteor Beam", 801: "Shell Side Arm", 802: "Misty Explosion", 803: "Grassy Glide", 804: "Rising Voltage", 805: "Terrain Pulse", 806: "Skitter Smack", 807: "Burning Jealousy", 808: "Lash Out", 809: "Poltergeist", 810: "Corrosive Gas", 811: "Coaching", 812: "Flip Turn", 813: "Triple Axel", 814: "Dual Wingbeat", 815: "Scorching Sands", 816: "Jungle Healing", 817: "Wicked Blow", 818: "Surging Strikes", 819: "Thunder Cage", 820: "Dragon Energy", 821: "Freezing Glare", 822: "Fiery Wrath", 823: "Thunderous Kick", 824: "Glacial Lance", 825: "Astral Barrage", 826: "Eerie Spell", 827: "Dire Claw", 828: "Psyshield Bash", 829: "Power Shift", 830: "Stone Axe", 831: "Springtide Storm", 832: "Mystical Power", 833: "Raging Fury", 834: "Wave Crash", 835: "Chloroblast", 836: "Mountain Gale", 837: "Victory Dance", 838: "Headlong Rush", 839: "Barb Barrage", 840: "Esper Wing", 841: "Bitter Malice", 842: "Shelter", 843: "Triple Arrows", 844: "Infernal Parade", 845: "Ceaseless Edge", 846: "Bleakwind Storm", 847: "Wildbolt Storm", 848: "Sandsear Storm", 849: "Lunar Blessing", 850: "Take Heart", 851: "Tera Blast", 852: "Silk Trap", 853: "Axe Kick", 854: "Last Respects", 855: "Lumina Crash", 856: "Order Up", 857: "Jet Punch", 858: "Spicy Extract", 859: "Spin Out", 860: "Population Bomb", 861: "Ice Spinner", 862: "Glaive Rush", 863: "Revival Blessing", 864: "Salt Cure", 865: "Triple Dive", 866: "Mortal Spin", 867: "Doodle", 868: "Fillet Away", 869: "Kowtow Cleave", 870: "Flower Trick", 871: "Torch Song", 872: "Aqua Step", 873: "Raging Bull", 874: "Make It Rain", 875: "Psyblade", 876: "Hydro Steam", 877: "Ruination", 878: "Collision Course", 879: "Electro Drift", 880: "Shed Tail", 881: "Chilly Reception", 882: "Tidy Up", 883: "Snowscape", 884: "Pounce", 885: "Trailblaze", 886: "Chilling Water", 887: "Hyper Drill", 888: "Twin Beam", 889: "Rage Fist", 890: "Armor Cannon", 891: "Bitter Blade", 892: "Double Shock", 893: "Gigaton Hammer", 894: "Comeuppance", 895: "Aqua Cutter", 896: "Blazing Torque", 897: "Wicked Torque", 898: "Noxious Torque", 899: "Combat Torque", 900: "Magical Torque", 901: "Blood Moon", 902: "Matcha Gotcha", 903: "Syrup Bomb", 904: "Ivy Cudgel", 905: "Electro Shot", 906: "Tera Starstorm", 907: "Fickle Beam", 908: "Burning Bulwark", 909: "Thunderclap", 910: "Mighty Cleave", 911: "Tachyon Cutter", 912: "Hard Press", 913: "Dragon Cheer", 914: "Alluring Voice", 915: "Temper Flare", 916: "Supercell Slam", 917: "Psychic Noise", 918: "Upper Hand", 919: "Malignant Chain"};

// Main function to find the enemy team
function findEnemyTeam() {
    const activeList = getActiveList();
    const { enemyBattleInfoList, enemyPokemonList } = categorizeActiveList(activeList);

    if (enemyBattleInfoList.length === 0) return [];

    const enemyBattleInfo = enemyBattleInfoList[0];
    const foundEnemyTeam = enemyBattleInfo.scene.currentBattle.enemyParty;
    const resultEnemyTeam = [];

    const idMap = buildObjectMap(enemyPokemonList, "id");

    foundEnemyTeam.forEach(ref => {
        const foundObj = idMap.get(ref.id);
        if (foundObj) {
            // Parse Moves
            const updatedMoveset = foundObj['moveset'].map(move => {
                const moveCopy = { ...move };
                moveCopy.name = Moves[move.moveId] || 'UNKNOWN';
                return moveCopy;
            });

            // Create a copy of the foundObj and update its moveset
            const updatedFoundObj = { ...foundObj, moveset: updatedMoveset };

            resultEnemyTeam.push(updatedFoundObj);
        }
    });

    return resultEnemyTeam;
}


/////////////////////////////////////////////////////////////////////////////
(function () {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '10px';
    overlay.style.left = '10px';
    overlay.style.padding = '10px';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.borderRadius = '5px';
    overlay.style.zIndex = '1000';
    overlay.style.cursor = 'move';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.maxHeight = '80vh';
    overlay.style.overflowY = 'auto';

    // Create refresh button
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh';
    refreshButton.style.marginBottom = '10px';
    refreshButton.onclick = () => updateOverlay(findEnemyTeam());
    overlay.appendChild(refreshButton);

    // Function to update overlay content
    function updateOverlay(stats) {
        console.debug(stats)
        const content = stats.map(stat => `
            <div>
                <strong>${stat.name} | Lvl: ${stat.level} | Exp: ${stat.exp}</strong>
                <p>Moves: ${stat.moveset.map(move => move.name).join(', ')}</p>
                <p>Moves: ${stat.ivs.join(', ')}</p>
                <p>Moves: ${stat.stats.join(', ')}</p>
            </div>
        `).join('');
        overlay.innerHTML = `<h3>Enemy Team Stats</h3>${content}`;
        overlay.insertBefore(refreshButton, overlay.firstChild);
    }

    // Make the overlay draggable
    overlay.onmousedown = function(event) {
        let shiftX = event.clientX - overlay.getBoundingClientRect().left;
        let shiftY = event.clientY - overlay.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            let newLeft = pageX - shiftX;
            let newTop = pageY - shiftY;

            // Ensure the overlay stays within the visible space
            const rightEdge = document.documentElement.clientWidth - overlay.offsetWidth;
            const bottomEdge = document.documentElement.clientHeight - overlay.offsetHeight;

            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft > rightEdge) newLeft = rightEdge;
            if (newTop > bottomEdge) newTop = bottomEdge;

            overlay.style.left = newLeft + 'px';
            overlay.style.top = newTop + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        overlay.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            overlay.onmouseup = null;
        };
    };

    overlay.ondragstart = function() {
        return false;
    };

    document.body.appendChild(overlay);

    // Initial call to update overlay with current enemy team stats
    updateOverlay(findEnemyTeam());
})();
