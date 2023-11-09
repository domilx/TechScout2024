

// All boolean data is false by default
// Stability and other subjective variables are defined on a scale of 0 to X


const GameModel = {
    // Global
        CompName: "",
        MatchNumber: "",
        TeamNumber: "",
        ScoutName: "",
        

    // Autonomous:
        PreloadPiece: 0,
        // Game piece points from position on a grid STATIC NOT DYNAMIC - e.i. CHANGES PER YEAR
        AutoPointsGamePiece1a: 0,
        AutoPointsGamePiece2a: 0,
        AutoPointsGamePiece1b: 0, 
        AutoPointsGamePiece2b: 0, 
        AutoPointsGamePiece1c: 0,
        AutoPointsGamePiece2c: 0, 
        AutoPointsGamePiece1d: 0, 
        AutoPointsGamePiece2d: 0, 
        AutoPointsGamePiece3a: 0,
        AutoPointsGamePiece3b: 0, 
        AutoPointsGamePiece3c: 0, 
        AutoPointsGamePiece3d: 0,
        // Number of scored pieces
        AutoCount1a: 0,
        AutoCount1b: 0, 
        AutoCount1c: 0,  
        AutoCount2a: 0, 
        AutoCount2b: 0, 
        AutoCount2c: 0,  
        AutoCount3a: 0, 
        AutoCount3b: 0, 
        AutoCount3c: 0, 
        // objectives
        Mobility: false,
        MobilityPoints: 0,
        AutoObjective1: false,
        AutoObjective2: false,

    // teleop 
        // Game piece points from position on a grid STATIC NOT DYNAMIC - e.i. CHANGES PER YEAR
        PointsGamePiece1a: 0, 
        PointsGamePiece2a: 0,
        PointsGamePiece1b: 0, 
        PointsGamePiece2b: 0,
        PointsGamePiece1c: 0, 
        PointsGamePiece2c: 0,    
        PointsGamePiece1d: 0, 
        PointsGamePiece2d: 0,       
        PointsGamePiece3a: 0,     
        PointsGamePiece3b: 0, 
        PointsGamePiece3c: 0,
        // Number of scored pieces
        Count1a: 0, 
        Count1b: 0, 
        Count1c: 0, 
        Count2a: 0, 
        Count2b: 0, 
        Count2c: 0, 
        Count3a: 0, 
        Count3b: 0, 
        Count3c: 0,
        // timer
        CycleTime: 0,
        // objectives
        EndGameObjective1: false,
        EndGameObjective1: false,



    //SUBJECTIVE END OF GAME SCOUTING
        RobotFalls: false,
        PlaysDefence: false,
        RobotIncapacitated: 0,
        RobotTippy: false,
        RobotQuickness: 0,
        FieldAwarness: 0,


  }






export default GameModel;