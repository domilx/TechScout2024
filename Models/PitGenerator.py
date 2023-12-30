import json
import random
import qrcode
import os


class DriveBaseType:
    Swerve = 'Swerve'
    Tank = 'Tank'
    Other = 'Other'


class DriveBaseMotor:
    CIM = 'CIM'
    NEO = 'NEO'
    FALCON = 'FALCON'
    KRAKEN = 'KRAKEN'


class DriverExperience:
    Zero = 'Zero'
    One = 'One'
    Two = 'Two'
    Three = 'Three'
    Four = 'Four'
    Unknown = 'Unknown'


class Stability:
    NO = 'Not Stable'
    YES = 'Stable'
    VERY_STABLE = 'Very Stable'

# Function to generate a random pit data


def generate_random_pit_data():
    TeamNb = random.randint(0, 9999)
    return {
        "RobScout": f"Scout{random.randint(1, 10)}",
        "TeamNb": TeamNb,
        "RobTeamNm": f"Team{TeamNb}",
        "RobDrive": random.choice([DriveBaseType.Swerve, DriveBaseType.Tank, DriveBaseType.Other]),
        "RobMotor": random.choice([DriveBaseMotor.CIM, DriveBaseMotor.NEO, DriveBaseMotor.FALCON, DriveBaseMotor.KRAKEN]),
        "RobDriveExp": random.choice([DriverExperience.Zero, DriverExperience.One, DriverExperience.Two, DriverExperience.Three, DriverExperience.Four, DriverExperience.Unknown]),
        "RobWtlbs": random.randint(0, 100),
        "RobWidth": random.randint(0, 100),
        "RobLength": random.randint(0, 100),
        "RobStble": random.choice([Stability.NO, Stability.YES, Stability.VERY_STABLE]),
        "RobQuest1": random.choice([True, False]),
        "RobQuest2": random.choice([True, False]),
        "RobQuest3": random.choice([True, False]),
        "RobQuest4": random.choice([True, False]),
        "RobQuest5": random.choice([True, False]),
        "RobQuest6": random.choice([True, False]),
        "RobQuest7": random.choice([True, False]),
        "RobQuest8": random.choice([True, False]),
        "RobQuest9": random.choice([True, False]),
        "RobQuest10": random.choice([True, False]),
        "RobQuest11": random.choice([True, False]),
        "RobQuest12": random.choice([True, False]),
        "RobQuest13": random.choice([True, False]),
        "RobQuest14": random.choice([True, False]),
        "RobQuest15": random.choice([True, False]),
        "RobComm1": f"Comment {random.randint(1, 100)}",
        "matches": []  # Assuming an empty list for simplicity
    }


# Generate random pit data JSONs
random_pit_data = [generate_random_pit_data() for _ in range(5)]

# Directory to save QR codes
current_directory = os.getcwd()
qr_code_dir = os.path.join(current_directory, "qr_codes")
os.makedirs(qr_code_dir, exist_ok=True)

# Function to generate QR code


def generate_qr_code(data, file_path):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(file_path)


# Generate and save QR codes
for i, pit_data in enumerate(random_pit_data):
    json_data = json.dumps(pit_data, indent=4)
    file_path = os.path.join(qr_code_dir, f"pit_data_{i+1}.png")
    generate_qr_code(json_data, file_path)

# Return the JSON
print(json.dumps(random_pit_data, indent=4))
