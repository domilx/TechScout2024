export async function encodePitData(pitData){
    return {
      pt01: pitData.teamNumber || "",
      pt02: pitData.teamName || "",
      pt03: pitData.RobotLength || "",
      pt04: pitData.RobotWidth || "",
      pt05: pitData.RobotWeight || 0,
      pt06: pitData.DriveType || 0,
      pt07: pitData.DriveMotors || 0,
      pt08: pitData.DriverExperience || 0,
      pt09: pitData.Stability || 0,
      pt10: pitData.GamePiece1 || false,
      pt11: pitData.GamePiece2 || false,
      pt12: pitData.AutoObj1 || false,
      pt13: pitData.AutoObj2 || false,
      pt14: pitData.EndGameObj1 || false,
      pt15: pitData.EndGameObj2 || false,
      pt25: pitData.ScoutNotes || "",
    };
  };
  