export const chapterData = {
  "G6PChapter1": {
    chapterTitle: "Physics: Mechanics & Motion",
    learningTopics: [
      { title: 'Kinematics', icon: '🚀', progress: 85, color: ['#3b82f6', '#06b6d4'], screen: 'KinematicsScreen' },
      { title: 'Newton\'s Laws', icon: '⚖️', progress: 60, color: ['#a855f7', '#ec4899'], screen: 'NewtonsLawsScreen' },
      { title: 'Work & Energy', icon: '⚡', progress: 40, color: ['#f97316', '#ef4444'], screen: 'WorkEnergyScreen' },
      { title: 'Momentum', icon: '💫', progress: 20, color: ['#22c55e', '#10b981'], screen: 'MomentumScreen' }
    ],
    pdfDocuments: [
      { title: 'Introduction to Mechanics', pages: 24, icon: '📄', color: ['#ef4444', '#f97316'], pdfPath: 'assets/pdfs/G6PChapter1_IntroductionToMechanics.pdf' },
      { title: 'Newton\'s Laws Explained', pages: 18, icon: '📋', color: ['#3b82f6', '#06b6d4'], pdfPath: 'assets/pdfs/G6PChapter1_NewtonsLaws.pdf' },
      { title: 'Energy & Work Principles', pages: 32, icon: '📖', color: ['#a855f7', '#ec4899'], pdfPath: 'assets/pdfs/G6PChapter1_EnergyWork.pdf' },
      { title: 'Momentum Theory', pages: 15, icon: '📑', color: ['#22c55e', '#10b981'], pdfPath: 'assets/pdfs/G6PChapter1_MomentumTheory.pdf' }
    ],
    videos: [
      { title: 'Understanding Motion', duration: '12:45', views: '2.5K', icon: '🎬', thumbnail: ['#2563eb', '#7c3aed'], screen: 'VideoPlayerScreen' },
      { title: 'Force and Acceleration', duration: '15:30', views: '3.2K', icon: '🎥', thumbnail: ['#db2777', '#f43f5e'], screen: 'VideoPlayerScreen' },
      { title: 'Energy Conservation', duration: '18:20', views: '4.1K', icon: '📹', thumbnail: ['#ea580c', '#dc2626'], screen: 'VideoPlayerScreen' },
      { title: 'Collision Physics', duration: '10:15', views: '1.8K', icon: '🎞️', thumbnail: ['#059669', '#0d9488'], screen: 'VideoPlayerScreen' }
    ],
    experiments: [
      { 
        title: 'Newton\'s Law Lab', 
        difficulty: 'Easy', 
        time: '20 min', 
        icon: '⚗️', 
        color: ['#06b6d4', '#3b82f6'],
        materials: ['String', 'Weight', 'Ruler'],
        screen: 'NewtonsLaws'
      },
      { 
        title: 'Friction Force Test', 
        difficulty: 'Medium', 
        time: '30 min', 
        icon: '🧪', 
        color: ['#a855f7', '#ec4899'],
        materials: ['Blocks', 'Ramp', 'Scale'],
        screen: 'NewtonsLaws'
      },
      { 
        title: 'Energy Transfer', 
        difficulty: 'Medium', 
        time: '25 min', 
        icon: '🔬', 
        color: ['#f97316', '#ef4444'],
        materials: ['Springs', 'Masses', 'Meter'],
        screen: 'EnergyTransferLabScreen'
      },
      { 
        title: 'Momentum Conservation', 
        difficulty: 'Hard', 
        time: '40 min', 
        icon: '🧬', 
        color: ['#22c55e', '#10b981'],
        materials: ['Cart', 'Track', 'Sensors'],
        screen: 'MomentumConservationLabScreen'
      }
    ],
    achievements: [
      { icon: '🏆', count: '12', label: 'Trophies' },
      { icon: '🔥', count: '85', label: 'Day Streak' },
      { icon: '⭐', count: '1240', label: 'XP Points' },
      { icon: '💎', count: '5', label: 'Gems' }
    ]
  },
  "G6PChapter2": {
  chapterTitle: "Physics: Light, Shadows & Reflections",
  learningTopics: [
    { title: "Sources of Light", icon: "💡", progress: 0, color: ["#a855f7", "#c084fc"], screen: "LightSourcesScreen" },
    { title: "Transparent, Translucent & Opaque", icon: "🔍", progress: 0, color: ["#a855f7", "#c084fc"], screen: "MaterialTypesScreen" },
    { title: "Formation of Shadows", icon: "🌑", progress: 0, color: ["#a855f7", "#c084fc"], screen: "ShadowsScreen" },
    { title: "Reflection & Mirrors", icon: "🪞", progress: 0, color: ["#a855f7", "#c084fc"], screen: "ReflectionScreen" }
  ],
  pdfDocuments: [
    { title: "Understanding Light", pages: 20, icon: "📄", color: ["#3b82f6", "#06b6d4"], pdfPath: "assets/pdfs/G6PChapter2_UnderstandingLight.pdf" },
    { title: "Shadows & Their Formation", pages: 15, icon: "📘", color: ["#a855f7", "#ec4899"], pdfPath: "assets/pdfs/G6PChapter2_Shadows.pdf" },
    { title: "Reflection & Mirrors Guide", pages: 25, icon: "📖", color: ["#f97316", "#ef4444"], pdfPath: "assets/pdfs/G6PChapter2_ReflectionMirrors.pdf" },
    { title: "Light Experiments Notes", pages: 18, icon: "📑", color: ["#22c55e", "#10b981"], pdfPath: "assets/pdfs/G6PChapter2_LightExperiments.pdf" }
  ],
  videos: [
    { title: "Sources of Light Explained", duration: "10:30", views: "2.2K", icon: "🎬", thumbnail: ["#2563eb", "#7c3aed"], screen: "VideoPlayerScreen" },
    { title: "How Shadows Form", duration: "12:15", views: "3.0K", icon: "🎥", thumbnail: ["#db2777", "#f43f5e"], screen: "VideoPlayerScreen" },
    { title: "Reflection & Mirror Tricks", duration: "14:00", views: "4.1K", icon: "📹", thumbnail: ["#ea580c", "#dc2626"], screen: "VideoPlayerScreen" },
    { title: "Light Experiments Demo", duration: "11:45", views: "1.9K", icon: "🎞️", thumbnail: ["#059669", "#0d9488"], screen: "VideoPlayerScreen" }
  ],
  experiments: [
    { 
      title: "Shadow Measurement Lab", 
      difficulty: "Easy", 
      time: "20 min", 
      icon: "⚗️", 
      color: ["#06b6d4", "#3b82f6"],
      materials: ["Torch", "Objects", "Screen"],
      screen: "ShadowLabScreen"
    },
    { 
      title: "Mirror Reflection Test", 
      difficulty: "Medium", 
      time: "25 min", 
      icon: "🧪", 
      color: ["#a855f7", "#ec4899"],
      materials: ["Mirror", "Laser Pointer", "Screen"],
      screen: "ReflectionLabScreen"
    },
    { 
      title: "Refraction Demonstration", 
      difficulty: "Medium", 
      time: "30 min", 
      icon: "🔬", 
      color: ["#f97316", "#ef4444"],
      materials: ["Glass Prism", "Light Source", "Paper"],
      screen: "RefractionLabScreen"
    },
    { 
      title: "Light Intensity Experiment", 
      difficulty: "Hard", 
      time: "35 min", 
      icon: "🧬", 
      color: ["#22c55e", "#10b981"],
      materials: ["Bulbs", "Meter", "Lenses"],
      screen: "LightIntensityLabScreen"
    }
  ],
  achievements: [
    { icon: '🏆', count: '8', label: 'Trophies' },
    { icon: '🔥', count: '50', label: 'Day Streak' },
    { icon: '⭐', count: '950', label: 'XP Points' },
    { icon: '💎', count: '3', label: 'Gems' }
  ]
},


  "G6PChapter3": {
    chapterTitle: "Physics: Electricity & Circuit",
    learningTopics: [
      { title: 'Electric Current', icon: '⚡', progress: 70, color: ['#3b82f6', '#06b6d4'], screen: 'ElectricCurrentScreen' },
      { title: 'Series & Parallel Circuits', icon: '🔌', progress: 45, color: ['#a855f7', '#ec4899'], screen: 'CircuitsScreen' },
      { title: 'Ohm\'s Law', icon: '📐', progress: 55, color: ['#f97316', '#ef4444'], screen: 'OhmsLawScreen' },
      { title: 'Electromagnetism', icon: '🧲', progress: 25, color: ['#22c55e', '#10b981'], screen: 'ElectromagnetismScreen' }
    ],
    pdfDocuments: [
      { title: 'Basics of Electricity', pages: 20, icon: '📄', color: ['#ef4444', '#f97316'], pdfPath: 'assets/pdfs/G6PChapter3_BasicsOfElectricity.pdf' },
      { title: 'Ohm\'s Law Guide', pages: 15, icon: '📘', color: ['#3b82f6', '#06b6d4'], pdfPath: 'assets/pdfs/G6PChapter3_OhmsLawGuide.pdf' },
      { title: 'Series & Parallel Circuits', pages: 28, icon: '📖', color: ['#a855f7', '#ec4899'], pdfPath: 'assets/pdfs/G6PChapter3_SeriesParallelCircuits.pdf' },
      { title: 'Electromagnetism Notes', pages: 18, icon: '📑', color: ['#22c55e', '#10b981'], pdfPath: 'assets/pdfs/G6PChapter3_ElectromagnetismNotes.pdf' }
    ],
    videos: [
      { title: 'What is Electric Current?', duration: '11:20', views: '2.1K', icon: '🎬', thumbnail: ['#2563eb', '#7c3aed'], screen: 'VideoPlayerScreen' },
      { title: 'Series vs Parallel Circuit', duration: '14:40', views: '3.8K', icon: '🎥', thumbnail: ['#db2777', '#f43f5e'], screen: 'VideoPlayerScreen' },
      { title: 'Understanding Ohm\'s Law', duration: '16:05', views: '4.4K', icon: '📹', thumbnail: ['#ea580c', '#dc2626'], screen: 'VideoPlayerScreen' },
      { title: 'Electromagnetism Explained', duration: '09:50', views: '1.9K', icon: '🎞️', thumbnail: ['#059669', '#0d9488'], screen: 'VideoPlayerScreen' }
    ],
    experiments: [
      { 
        title: 'Simple Circuit Builder', 
        difficulty: 'Easy', 
        time: '15 min', 
        icon: '🔌', 
        color: ['#3b82f6', '#06b6d4'],
        materials: ['Battery', 'Wire', 'Bulb'],
        screen: 'CircuitBuilder'
      },
      { 
        title: 'Series vs Parallel Demo', 
        difficulty: 'Medium', 
        time: '20 min', 
        icon: '💡', 
        color: ['#f97316', '#ef4444'],
        materials: ['2 Bulbs', 'Battery', 'Switch'],
        screen: 'CircuitBuilder'
      },
      { 
        title: 'Ohm\'s Law Quick Test', 
        difficulty: 'Medium', 
        time: '25 min', 
        icon: '📊', 
        color: ['#8b5cf6', '#ec4899'],
        materials: ['Resistor', 'Voltmeter', 'Battery'],
        screen: 'OhmCalculator'
      },
      { 
        title: 'Breadboard LED Circuit', 
        difficulty: 'Easy', 
        time: '15 min', 
        icon: '🔋', 
        color: ['#22c55e', '#10b981'],
        materials: ['LED', 'Resistor', 'Breadboard', 'Battery'],
        screen: 'CircuitBuilder'
      }
    ],
    achievements: [
      { icon: '🏆', count: '12', label: 'Trophies' },
      { icon: '🔥', count: '85', label: 'Day Streak' },
      { icon: '⭐', count: '1240', label: 'XP Points' },
      { icon: '💎', count: '5', label: 'Gems' }
    ]
  },
  "G7PChapter1": {
    chapterTitle: "Physics: Mechanics & Motion",
    learningTopics: [
      { title: 'Kinematics', icon: '🚀', progress: 85, color: ['#3b82f6', '#06b6d4'], screen: 'KinematicsScreen' },
      { title: 'Newton\'s Laws', icon: '⚖️', progress: 60, color: ['#a855f7', '#ec4899'], screen: 'NewtonsLawsScreen' },
      { title: 'Work & Energy', icon: '⚡', progress: 40, color: ['#f97316', '#ef4444'], screen: 'WorkEnergyScreen' },
      { title: 'Momentum', icon: '💫', progress: 20, color: ['#22c55e', '#10b981'], screen: 'MomentumScreen' }
    ],
    pdfDocuments: [
      { title: 'Introduction to Mechanics', pages: 24, icon: '📄', color: ['#ef4444', '#f97316'], pdfPath: 'assets/pdfs/G7PChapter1_IntroductionToMechanics.pdf' },
      { title: 'Newton\'s Laws Explained', pages: 18, icon: '📋', color: ['#3b82f6', '#06b6d4'], pdfPath: 'assets/pdfs/G7PChapter1_NewtonsLaws.pdf' },
      { title: 'Energy & Work Principles', pages: 32, icon: '📖', color: ['#a855f7', '#ec4899'], pdfPath: 'assets/pdfs/G7PChapter1_EnergyWork.pdf' },
      { title: 'Momentum Theory', pages: 15, icon: '📑', color: ['#22c55e', '#10b981'], pdfPath: 'assets/pdfs/G7PChapter1_MomentumTheory.pdf' }
    ],
    videos: [
      { title: 'Understanding Motion', duration: '12:45', views: '2.5K', icon: '🎬', thumbnail: ['#2563eb', '#7c3aed'], screen: 'VideoPlayerScreen' },
      { title: 'Force and Acceleration', duration: '15:30', views: '3.2K', icon: '🎥', thumbnail: ['#db2777', '#f43f5e'], screen: 'VideoPlayerScreen' },
      { title: 'Energy Conservation', duration: '18:20', views: '4.1K', icon: '📹', thumbnail: ['#ea580c', '#dc2626'], screen: 'VideoPlayerScreen' },
      { title: 'Collision Physics', duration: '10:15', views: '1.8K', icon: '🎞️', thumbnail: ['#059669', '#0d9488'], screen: 'VideoPlayerScreen' }
    ],
    experiments: [
      { 
        title: 'Pendulum Motion Lab', 
        difficulty: 'Easy', 
        time: '20 min', 
        icon: '⚗️', 
        color: ['#06b6d4', '#3b82f6'],
        materials: ['String', 'Weight', 'Ruler'],
        screen: 'PendulumLabScreen'
      },
      { 
        title: 'Friction Force Test', 
        difficulty: 'Medium', 
        time: '30 min', 
        icon: '🧪', 
        color: ['#a855f7', '#ec4899'],
        materials: ['Blocks', 'Ramp', 'Scale'],
        screen: 'FrictionLabScreen'
      },
      { 
        title: 'Energy Transfer', 
        difficulty: 'Medium', 
        time: '25 min', 
        icon: '🔬', 
        color: ['#f97316', '#ef4444'],
        materials: ['Springs', 'Masses', 'Meter'],
        screen: 'EnergyTransferLabScreen'
      },
      { 
        title: 'Momentum Conservation', 
        difficulty: 'Hard', 
        time: '40 min', 
        icon: '🧬', 
        color: ['#22c55e', '#10b981'],
        materials: ['Cart', 'Track', 'Sensors'],
        screen: 'MomentumConservationLabScreen'
      }
    ],
    achievements: [
      { icon: '🏆', count: '12', label: 'Trophies' },
      { icon: '🔥', count: '85', label: 'Day Streak' },
      { icon: '⭐', count: '1240', label: 'XP Points' },
      { icon: '💎', count: '5', label: 'Gems' }
    ]
  },
  "G7PChapter1": {
  chapterTitle: "Physics: Heat & Temperature",
  learningTopics: [
    { title: "Temperature & Thermometers", icon: "🌡️", progress: 75, color: ["#3b82f6", "#06b6d4"], screen: "TemperatureScreen" },
    { title: "Heat Transfer", icon: "🔥", progress: 50, color: ["#a855f7", "#ec4899"], screen: "HeatTransferScreen" },
    { title: "Conduction, Convection & Radiation", icon: "📡", progress: 30, color: ["#f97316", "#ef4444"], screen: "CCRScreen" },
    { title: "Expansion of Solids, Liquids & Gases", icon: "📈", progress: 10, color: ["#22c55e", "#10b981"], screen: "ThermalExpansionScreen" }
  ],

  pdfDocuments: [
    { title: "Introduction to Heat", pages: 22, icon: "📄", color: ["#ef4444", "#f97316"], pdfPath: "assets/pdfs/G7PChapter2_IntroductionToHeat.pdf" },
    { title: "Heat Transfer Methods", pages: 18, icon: "📋", color: ["#3b82f6", "#06b6d4"], pdfPath: "assets/pdfs/G7PChapter2_HeatTransfer.pdf" },
    { title: "Thermal Expansion Explained", pages: 26, icon: "📖", color: ["#a855f7", "#ec4899"], pdfPath: "assets/pdfs/G7PChapter2_ThermalExpansion.pdf" },
    { title: "Temperature Measurement", pages: 17, icon: "📑", color: ["#22c55e", "#10b981"], pdfPath: "assets/pdfs/G7PChapter2_TemperatureMeasurement.pdf" }
  ],

  videos: [
    { title: "Understanding Heat & Temperature", duration: "11:20", views: "3.1K", icon: "🎬", thumbnail: ["#2563eb", "#7c3aed"], screen: "VideoPlayerScreen" },
    { title: "Heat Transfer in Real Life", duration: "13:40", views: "2.2K", icon: "🎥", thumbnail: ["#db2777", "#f43f5e"], screen: "VideoPlayerScreen" },
    { title: "Conduction Convection Radiation", duration: "16:10", views: "4.6K", icon: "📹", thumbnail: ["#ea580c", "#dc2626"], screen: "VideoPlayerScreen" },
    { title: "Thermal Expansion", duration: "09:35", views: "1.4K", icon: "🎞️", thumbnail: ["#059669", "#0d9488"], screen: "VideoPlayerScreen" }
  ],

  experiments: [
    {
      title: "Heat Conductivity Test",
      difficulty: "Medium",
      time: "22 min",
      icon: "🔬",
      color: ["#f97316", "#ef4444"],
      materials: ["Metal Rod", "Wax", "Candle"],
      screen: "Conductivity"
    },
    {
      title: "Ball & Ring Thermal Expansion Test",
      difficulty: "Easy",
      time: "18 min",
      icon: "⚗️",
      color: ["#06b6d4", "#3b82f6"],
      materials: ["Metal Ball", "Ring", "Bunsen Burner"],
      screen: "BallRingExperimentScreen"
    },
    {
      title: "Hot Air Balloon Convection Demo",
      difficulty: "Medium",
      time: "28 min",
      icon: "🧪",
      color: ["#a855f7", "#ec4899"],
      materials: ["Paper", "Heat Source", "Thread"],
      screen: "ConvectionBalloonScreen"
    },
    
    {
      title: "Radiation Heat Absorption",
      difficulty: "Hard",
      time: "35 min",
      icon: "🧬",
      color: ["#22c55e", "#10b981"],
      materials: ["Black/White Sheets", "Lamp", "Thermometer"],
      screen: "RadiationExperimentScreen"
    }
  ],

  achievements: [
    { icon: "🏆", count: "8", label: "Trophies" },
    { icon: "🔥", count: "62", label: "Day Streak" },
    { icon: "⭐", count: "940", label: "XP Points" },
    { icon: "💎", count: "3", label: "Gems" }
  ]
},
"G7PChapter2": {
  "chapterTitle": "Physics: Motion & Time",
  "learningTopics": [
    { "title": "Types of Motion", "icon": "🚶‍♂️", "progress": 70, "color": ["#3b82f6", "#06b6d4"], "screen": "TypesOfMotionScreen" },
    { "title": "Speed & Calculation", "icon": "⏱️", "progress": 55, "color": ["#a855f7", "#ec4899"], "screen": "SpeedCalculationScreen" },
    { "title": "Time Measurement", "icon": "🕰️", "progress": 40, "color": ["#f97316", "#ef4444"], "screen": "TimeMeasurementScreen" },
    { "title": "Graphical Motion", "icon": "📈", "progress": 25, "color": ["#22c55e", "#10b981"], "screen": "MotionGraphScreen" }
  ],

  "pdfDocuments": [
    { "title": "Introduction to Motion", "pages": 20, "icon": "📄", "color": ["#ef4444", "#f97316"], "pdfPath": "assets/pdfs/G7PChapter2_IntroductionToMotion.pdf" },
    { "title": "Understanding Speed & Distance", "pages": 18, "icon": "📋", "color": ["#3b82f6", "#06b6d4"], "pdfPath": "assets/pdfs/G7PChapter2_SpeedDistance.pdf" },
    { "title": "Time Measurement History", "pages": 22, "icon": "📖", "color": ["#a855f7", "#ec4899"], "pdfPath": "assets/pdfs/G7PChapter2_TimeMeasurement.pdf" },
    { "title": "Distance–Time Graphs", "pages": 16, "icon": "📑", "color": ["#22c55e", "#10b981"], "pdfPath": "assets/pdfs/G7PChapter2_MotionGraphs.pdf" }
  ],

  "videos": [
    { "title": "What is Motion?", "duration": "11:20", "views": "1.9K", "icon": "🎬", "thumbnail": ["#2563eb", "#7c3aed"], "screen": "VideoPlayerScreen" },
    { "title": "Speed, Distance & Time Formula", "duration": "13:45", "views": "3.0K", "icon": "🎥", "thumbnail": ["#db2777", "#f43f5e"], "screen": "VideoPlayerScreen" },
    { "title": "How We Measure Time?", "duration": "14:10", "views": "2.7K", "icon": "📹", "thumbnail": ["#ea580c", "#dc2626"], "screen": "VideoPlayerScreen" },
    { "title": "Distance-Time Graphs Explained", "duration": "9:50", "views": "1.6K", "icon": "🎞️", "thumbnail": ["#059669", "#0d9488"], "screen": "VideoPlayerScreen" }
  ],

  "experiments": [
    {
      "title": "Measuring Speed of a Toy Car",
      "difficulty": "Easy",
      "time": "15 min",
      "icon": "⚗️",
      "color": ["#06b6d4", "#3b82f6"],
      "materials": ["Toy Car", "Meter Scale", "Timer"],
      "screen": "ToyCarSpeedLabScreen"
    },
    {
      "title": "Types of Motion Observation",
      "difficulty": "Easy",
      "time": "20 min",
      "icon": "🧪",
      "color": ["#a855f7", "#ec4899"],
      "materials": ["Ball", "Pendulum", "Rolling Object"],
      "screen": "MotionObservationLabScreen"
    },
    {
      "title": "Simple Pendulum Time Period",
      "difficulty": "Medium",
      "time": "25 min",
      "icon": "🔬",
      "color": ["#f97316", "#ef4444"],
      "materials": ["String", "Bob", "Stopwatch"],
      "screen": "PendulumTimeLabScreen"
    },
    {
      "title": "Drawing Distance-Time Graph",
      "difficulty": "Medium",
      "time": "30 min",
      "icon": "🧬",
      "color": ["#22c55e", "#10b981"],
      "materials": ["Graph Paper", "Scale", "Recorded Data"],
      "screen": "GraphPlottingLabScreen"
    }
  ],

  "achievements": [
    { "icon": "🏆", "count": "10", "label": "Trophies" },
    { "icon": "🔥", "count": "65", "label": "Day Streak" },
    { "icon": "⭐", "count": "980", "label": "XP Points" },
    { "icon": "💎", "count": "4", "label": "Gems" }
  ]
},
"G7PChapter3": {
  "chapterTitle": "Physics: Electric Current & Its Effects",
  "learningTopics": [
    { "title": "Electric Charges & Flow", "icon": "⚡", "progress": 70, "color": ["#3b82f6", "#06b6d4"], "screen": "ElectricChargesScreen" },
    { "title": "Circuits & Components", "icon": "🔌", "progress": 55, "color": ["#a855f7", "#ec4899"], "screen": "CircuitComponentsScreen" },
    { "title": "Heating Effect of Current", "icon": "🔥", "progress": 40, "color": ["#f97316", "#ef4444"], "screen": "HeatingEffectScreen" },
    { "title": "Magnetic Effect of Current", "icon": "🧲", "progress": 25, "color": ["#22c55e", "#10b981"], "screen": "MagneticEffectScreen" }
  ],

  "pdfDocuments": [
    { "title": "Basics of Electric Current", "pages": 20, "icon": "📄", "color": ["#ef4444", "#f97316"], "pdfPath": "assets/pdfs/G7P_ElectricCurrentBasics.pdf" },
    { "title": "Circuit Diagrams Explained", "pages": 15, "icon": "📘", "color": ["#3b82f6", "#06b6d4"], "pdfPath": "assets/pdfs/G7P_CircuitDiagrams.pdf" },
    { "title": "Heating & Magnetic Effects", "pages": 28, "icon": "📖", "color": ["#a855f7", "#ec4899"], "pdfPath": "assets/pdfs/G7P_HeatingMagneticEffects.pdf" },
    { "title": "Electric Safety & Applications", "pages": 12, "icon": "📑", "color": ["#22c55e", "#10b981"], "pdfPath": "assets/pdfs/G7P_ElectricSafety.pdf" }
  ],

  "videos": [
    { "title": "How Electric Current Works", "duration": "11:10", "views": "3.4K", "icon": "🎬", "thumbnail": ["#2563eb", "#7c3aed"], "screen": "VideoPlayerScreen" },
    { "title": "Understanding Circuits", "duration": "14:20", "views": "2.9K", "icon": "🎥", "thumbnail": ["#db2777", "#f43f5e"], "screen": "VideoPlayerScreen" },
    { "title": "Heating Effect in Appliances", "duration": "16:40", "views": "4.5K", "icon": "📹", "thumbnail": ["#ea580c", "#dc2626"], "screen": "VideoPlayerScreen" },
    { "title": "Magnetic Effect & Electromagnets", "duration": "09:50", "views": "1.6K", "icon": "🎞️", "thumbnail": ["#059669", "#0d9488"], "screen": "VideoPlayerScreen" }
  ],

  "experiments": [
    { 
      "title": "Make a Simple Circuit", 
      "difficulty": "Easy", 
      "time": "15 min", 
      "icon": "🔋", 
      "color": ["#06b6d4", "#3b82f6"],
      "materials": ["Battery", "Bulb", "Switch", "Wires"],
      "screen": "SimpleCircuitLabScreen"
    },
    { 
      "title": "Test Heating Effect", 
      "difficulty": "Medium", 
      "time": "25 min", 
      "icon": "🔥", 
      "color": ["#a855f7", "#ec4899"],
      "materials": ["Battery", "Thin wire", "Stand"],
      "screen": "HeatingEffectLabScreen"
    },
    { 
      "title": "Make an Electromagnet", 
      "difficulty": "Medium", 
      "time": "30 min", 
      "icon": "🧲", 
      "color": ["#f97316", "#ef4444"],
      "materials": ["Iron nail", "Copper wire", "Battery"],
      "screen": "ElectromagnetLabScreen"
    },
    { 
      "title": "Series vs Parallel Circuits", 
      "difficulty": "Hard", 
      "time": "35 min", 
      "icon": "🔬", 
      "color": ["#22c55e", "#10b981"],
      "materials": ["Bulbs", "Switches", "Wires", "Battery"],
      "screen": "SeriesParallelLabScreen"
    }
  ],

  "achievements": [
    { "icon": "🏆", "count": "10", "label": "Trophies" },
    { "icon": "🔥", "count": "60", "label": "Day Streak" },
    { "icon": "⭐", "count": "980", "label": "XP Points" },
    { "icon": "💎", "count": "4", "label": "Gems" }
  ]
},
  "G8PChapter1": {
    chapterTitle: "Physics: Mechanics & Motion",
    learningTopics: [
      { title: 'Kinematics', icon: '🚀', progress: 85, color: ['#3b82f6', '#06b6d4'], screen: 'KinematicsScreen' },
      { title: 'Newton\'s Laws', icon: '⚖️', progress: 60, color: ['#a855f7', '#ec4899'], screen: 'NewtonsLawsScreen' },
      { title: 'Work & Energy', icon: '⚡', progress: 40, color: ['#f97316', '#ef4444'], screen: 'WorkEnergyScreen' },
      { title: 'Momentum', icon: '💫', progress: 20, color: ['#22c55e', '#10b981'], screen: 'MomentumScreen' }
    ],
    pdfDocuments: [
      { title: 'Introduction to Mechanics', pages: 24, icon: '📄', color: ['#ef4444', '#f97316'], pdfPath: 'assets/pdfs/G8PChapter1_IntroductionToMechanics.pdf' },
      { title: 'Newton\'s Laws Explained', pages: 18, icon: '📋', color: ['#3b82f6', '#06b6d4'], pdfPath: 'assets/pdfs/G8PChapter1_NewtonsLaws.pdf' },
      { title: 'Energy & Work Principles', pages: 32, icon: '📖', color: ['#a855f7', '#ec4899'], pdfPath: 'assets/pdfs/G8PChapter1_EnergyWork.pdf' },
      { title: 'Momentum Theory', pages: 15, icon: '📑', color: ['#22c55e', '#10b981'], pdfPath: 'assets/pdfs/G8PChapter1_MomentumTheory.pdf' }
    ],
    videos: [
      { title: 'Understanding Motion', duration: '12:45', views: '2.5K', icon: '🎬', thumbnail: ['#2563eb', '#7c3aed'], screen: 'VideoPlayerScreen' },
      { title: 'Force and Acceleration', duration: '15:30', views: '3.2K', icon: '🎥', thumbnail: ['#db2777', '#f43f5e'], screen: 'VideoPlayerScreen' },
      { title: 'Energy Conservation', duration: '18:20', views: '4.1K', icon: '📹', thumbnail: ['#ea580c', '#dc2626'], screen: 'VideoPlayerScreen' },
      { title: 'Collision Physics', duration: '10:15', views: '1.8K', icon: '🎞️', thumbnail: ['#059669', '#0d9488'], screen: 'VideoPlayerScreen' }
    ],
    experiments: [
      { 
        title: 'Pendulum Motion Lab', 
        difficulty: 'Easy', 
        time: '20 min', 
        icon: '⚗️', 
        color: ['#06b6d4', '#3b82f6'],
        materials: ['String', 'Weight', 'Ruler'],
        screen: 'PendulumLabScreen'
      },
      { 
        title: 'Friction Force Test', 
        difficulty: 'Medium', 
        time: '30 min', 
        icon: '🧪', 
        color: ['#a855f7', '#ec4899'],
        materials: ['Blocks', 'Ramp', 'Scale'],
        screen: 'FrictionLabScreen'
      },
      { 
        title: 'Energy Transfer', 
        difficulty: 'Medium', 
        time: '25 min', 
        icon: '🔬', 
        color: ['#f97316', '#ef4444'],
        materials: ['Springs', 'Masses', 'Meter'],
        screen: 'EnergyTransferLabScreen'
      },
      { 
        title: 'Momentum Conservation', 
        difficulty: 'Hard', 
        time: '40 min', 
        icon: '🧬', 
        color: ['#22c55e', '#10b981'],
        materials: ['Cart', 'Track', 'Sensors'],
        screen: 'MomentumConservationLabScreen'
      }
    ],
    achievements: [
      { icon: '🏆', count: '12', label: 'Trophies' },
      { icon: '🔥', count: '85', label: 'Day Streak' },
      { icon: '⭐', count: '1240', label: 'XP Points' },
      { icon: '💎', count: '5', label: 'Gems' }
    ]
  },
  "G8PChapter2": {
chapterTitle: "Sound: Waves & Vibrations",
learningTopics: [
{ title: 'What is Sound?', icon: '🎵', progress: 90, color: ['#3b82f6', '#06b6d4'], screen: 'SoundBasicsScreen' },
{ title: 'Propagation of Sound', icon: '🌊', progress: 75, color: ['#a855f7', '#ec4899'], screen: 'SoundPropagationScreen' },
{ title: 'Characteristics of Sound', icon: '🔊', progress: 60, color: ['#f97316', '#ef4444'], screen: 'SoundCharacteristicsScreen' },
{ title: 'Noise & Music', icon: '🎼', progress: 40, color: ['#22c55e', '#10b981'], screen: 'NoiseMusicScreen' }
],

pdfDocuments: [
{ title: 'Introduction to Sound Waves', pages: 20, icon: '📄', color: ['#ef4444', '#f97316'], pdfPath: 'assets/pdfs/G8PChapter2_SoundWaves.pdf' },
{ title: 'Propagation of Sound Notes', pages: 18, icon: '📘', color: ['#3b82f6', '#06b6d4'], pdfPath: 'assets/pdfs/G8PChapter2_Propagation.pdf' },
{ title: 'Pitch, Loudness & Quality', pages: 26, icon: '📖', color: ['#a855f7', '#ec4899'], pdfPath: 'assets/pdfs/G8PChapter2_Characteristics.pdf' },
{ title: 'Noise vs Music Guide', pages: 15, icon: '📑', color: ['#22c55e', '#10b981'], pdfPath: 'assets/pdfs/G8PChapter2_NoiseMusic.pdf' }
],

videos: [
{ title: 'How Sound Waves Work', duration: '10:12', views: '3.8K', icon: '🎬', thumbnail: ['#2563eb', '#7c3aed'], screen: 'VideoPlayerScreen' },
{ title: 'Pitch & Loudness Explained', duration: '13:45', views: '2.1K', icon: '🎥', thumbnail: ['#db2777', '#f43f5e'], screen: 'VideoPlayerScreen' },
{ title: 'Propagation of Sound in Air', duration: '11:20', views: '4.4K', icon: '📹', thumbnail: ['#ea580c', '#dc2626'], screen: 'VideoPlayerScreen' },
{ title: 'Noise Pollution Awareness', duration: '09:30', views: '1.9K', icon: '🎞️', thumbnail: ['#059669', '#0d9488'], screen: 'VideoPlayerScreen' }
],

experiments: [
{ title: 'Sound Vibration Lab', difficulty: 'Easy', time: '15 min', icon: '🎤', color: ['#06b6d4', '#3b82f6'], materials: ['Tuning Fork', 'Bowl of Water'], screen: 'Sound' },
{ title: 'Sound Travels Through Air', difficulty: 'Medium', time: '25 min', icon: '🌬️', color: ['#a855f7', '#ec4899'], materials: ['Paper Cup', 'String'], screen: 'Sound' },
{ title: 'Pitch & Frequency Test', difficulty: 'Medium', time: '30 min', icon: '🎶', color: ['#f97316', '#ef4444'], materials: ['Rubber Bands', 'Box'], screen: 'PitchLabScreen' },
{ title: 'Noise Level Measurement', difficulty: 'Hard', time: '35 min', icon: '📢', color: ['#22c55e', '#10b981'], materials: ['Mobile Decibel Meter'], screen: 'NoiseMeasurementLabScreen' }
],

achievements: [
{ icon: '🏆', count: '10', label: 'Sound Mastery' },
{ icon: '🔥', count: '72', label: 'Day Streak' },
{ icon: '⭐', count: '980', label: 'XP Points' },
{ icon: '💎', count: '3', label: 'Gems' }
]
},
  "G10PChapter1": {
    chapterTitle: "Physics: Mechanics & Motion",
    learningTopics: [
      { title: 'Kinematics', icon: '🚀', progress: 85, color: ['#3b82f6', '#06b6d4'], screen: 'KinematicsScreen' },
      { title: 'Newton\'s Laws', icon: '⚖️', progress: 60, color: ['#a855f7', '#ec4899'], screen: 'NewtonsLawsScreen' },
      { title: 'Work & Energy', icon: '⚡', progress: 40, color: ['#f97316', '#ef4444'], screen: 'WorkEnergyScreen' },
      { title: 'Momentum', icon: '💫', progress: 20, color: ['#22c55e', '#10b981'], screen: 'MomentumScreen' }
    ],
    pdfDocuments: [
      { title: 'Introduction to Mechanics', pages: 24, icon: '📄', color: ['#ef4444', '#f97316'], pdfPath: 'assets/pdfs/G10PChapter1_IntroductionToMechanics.pdf' },
      { title: 'Newton\'s Laws Explained', pages: 18, icon: '📋', color: ['#3b82f6', '#06b6d4'], pdfPath: 'assets/pdfs/G10PChapter1_NewtonsLaws.pdf' },
      { title: 'Energy & Work Principles', pages: 32, icon: '📖', color: ['#a855f7', '#ec4899'], pdfPath: 'assets/pdfs/G10PChapter1_EnergyWork.pdf' },
      { title: 'Momentum Theory', pages: 15, icon: '📑', color: ['#22c55e', '#10b981'], pdfPath: 'assets/pdfs/G10PChapter1_MomentumTheory.pdf' }
    ],
    videos: [
      { title: 'Understanding Motion', duration: '12:45', views: '2.5K', icon: '🎬', thumbnail: ['#2563eb', '#7c3aed'], screen: 'VideoPlayerScreen' },
      { title: 'Force and Acceleration', duration: '15:30', views: '3.2K', icon: '🎥', thumbnail: ['#db2777', '#f43f5e'], screen: 'VideoPlayerScreen' },
      { title: 'Energy Conservation', duration: '18:20', views: '4.1K', icon: '📹', thumbnail: ['#ea580c', '#dc2626'], screen: 'VideoPlayerScreen' },
      { title: 'Collision Physics', duration: '10:15', views: '1.8K', icon: '🎞️', thumbnail: ['#059669', '#0d9488'], screen: 'VideoPlayerScreen' }
    ],
    experiments: [
      { 
        title: 'Pendulum Motion Lab', 
        difficulty: 'Easy', 
        time: '20 min', 
        icon: '⚗️', 
        color: ['#06b6d4', '#3b82f6'],
        materials: ['String', 'Weight', 'Ruler'],
        screen: 'PendulumLabScreen'
      },
      { 
        title: 'Friction Force Test', 
        difficulty: 'Medium', 
        time: '30 min', 
        icon: '🧪', 
        color: ['#a855f7', '#ec4899'],
        materials: ['Blocks', 'Ramp', 'Scale'],
        screen: 'FrictionLabScreen'
      },
      { 
        title: 'Energy Transfer', 
        difficulty: 'Medium', 
        time: '25 min', 
        icon: '🔬', 
        color: ['#f97316', '#ef4444'],
        materials: ['Springs', 'Masses', 'Meter'],
        screen: 'EnergyTransferLabScreen'
      },
      { 
        title: 'Momentum Conservation', 
        difficulty: 'Hard', 
        time: '40 min', 
        icon: '🧬', 
        color: ['#22c55e', '#10b981'],
        materials: ['Cart', 'Track', 'Sensors'],
        screen: 'MomentumConservationLabScreen'
      }
    ],
    achievements: [
      { icon: '🏆', count: '12', label: 'Trophies' },
      { icon: '🔥', count: '85', label: 'Day Streak' },
      { icon: '⭐', count: '1240', label: 'XP Points' },
      { icon: '💎', count: '5', label: 'Gems' }
    ]
  }
};

