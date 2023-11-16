

// All boolean data is false by default
// Stability is defined on a scale of 0 to X


const PitModel = {
      teamNumber: "",
      teamName: "",
      DriveType: "",
      DriveMotors: "",
      DriverExperience: 0,
      RobotWeight: 0,
      RobotWidth: 0,
      RobotLength: 0,
      Stability: 0,
      GamePiece1: false,
      GamePiece2: false,
      AutoObj1: false,
      AutoObj2: false,
      EndGameObj1: false,
      EndGameObj2: false,
      ScoutNotes: ""
    }



/*interface PitModel {
  RobScout: string;
  TeamNb: number;
  RobTeamNm: string;
  RobDrive: DriveBaseType;
  RobMotor: DriveBaseMotor;
  RobDriveExp: DriverExperience;
  RobWtlbs: number;
  RobWidth: number;
  RobLength: number;
  RobStble: Stability;
  RobQuest1: boolean;
  RobQuest2: boolean;
  RobQuest3: boolean;
  RobQuest4: boolean;
  RobQuest5: boolean;
  RobQuest6: boolean;
  RobQuest7: boolean;
  RobQuest8: boolean;
  RobQuest9: boolean;
  RobQuest10: boolean;
  RobQuest11: boolean;
  RobQuest12: boolean;
  RobQuest13: boolean;
  RobQuest14: boolean;
  RobQuest15: boolean;
  RobComm1: string;
}

// Enums for dropdowns
enum DriveBaseType {
  Swerve = 'Swerve',
  Tank = 'Tank',
  Other = 'Other',
}

enum DriveBaseMotor {
  CIM = 0,
  NEO = 1,
  FALCON = 2,
  KRAKEN = 3,
}

enum DriverExperience {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Unknown = 'Unknown',
}

enum Stability {
  NO = 0,
  YES = 1,
  VERY_STABLE = 2,
}*/
export default PitModel;