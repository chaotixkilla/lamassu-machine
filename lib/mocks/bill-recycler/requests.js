const dateformat = require('dateformat')
const uuid = require('uuid')

function getFirmwareVersion (deviceName = "HCM2_01") {
  return {
    "jsonrpc": "2.0",
    "method": "getFirmwareVersion",
    "description": "Returns the names of the loaded firmwares.",
    "params": {
      "LDN": deviceName,
      "initial": "true"
    },
    "id": uuid.v4()
  }
}

function getInfo (deviceName = "HCM2_01") {
  return {
    "jsonrpc": "2.0",
    "method": "getInfo",
    "description": "Get the hardware configuration and operational setting of HCM2.",
    "params": {
      "LDN": deviceName
    },
    "id": uuid.v4()
  }
}

function getBanknoteInfo (deviceName = "HCM2_01") {
  return {
    "jsonrpc": "2.0",
    "method": "getBanknoteInfo",
    "description": "Get the list of all Note IDs supported by the loaded BV firmware.",
    "params": {
      "LDN": deviceName
    },
    "id": uuid.v4()
  }
}

function setDenomination (deviceName = "HCM2_01", notes, denominationCodes) {
  return {
    "jsonrpc": "2.0",
    "method": "setDenomination",
    "description": "Assign Denomination code to each of Note IDs.",
    "params": {
      "LDN": deviceName,
      "noteIDs": [
        {
           "noteId": notes,
           "denomCode": denominationCodes
        }
      ]
    },
    "id": uuid.v4()
  }
}

function setInfo (deviceName = "HCM2_01", cassettes) {
  // Assuming the cassettes obj is of the format:
  // {
  //   cassette2A: [denom_1, denom_2, denom_3, ...],
  //   cassette3A: [denom_1, denom_2, denom_3, ...],
  //   cassette4A: [denom_1, denom_2, denom_3, ...],
  //   cassette5A: [denom_1, denom_2, denom_3, ...]
  // }

  return {
    "jsonrpc": "2.0",
    "method": "setInfo",
    "description": "Specify the hardware configuration and operational setting of HCM2.",
    "params": {
      "LDN": deviceName,
      "IsMAB": "false",
      "DateTime": dateFormat(new Date(), 'YYMMDDhhmmss'),
      "TotalStackedNotesURJB": "0",
      "TotalStackedNotesONE_A": "0",
      "TotalStackedNotesONE_B": "0",
      "LaneExists1": "true",
      "LaneExists2": "true",
      "LaneExists3": "true",
      "LaneExists4": "true",
      "LaneExists5": "true",
      "DenomCassette1A": "Unknown",
      "DenomCassette2A": cassettes.cassette2A.join(),
      "DenomCassette3A": cassettes.cassette3A.join(),
      "DenomCassette4A": cassettes.cassette4A.join(),
      "DenomCassette5A": cassettes.cassette5A.join(),
      "DenomCassette1B": "Unknown",
      "DenomCassette1C": "Unknown",
      "HardwareType1A": "AB",
      "HardwareType2A": "RB",
      "HardwareType3A": "RB",
      "HardwareType4A": "RB",
      "HardwareType5A": "RB",
      "RoomOperation1A": "Deposit",
      "RoomOperation1B": "Unloaded",
      "RoomOperation1C": "Unloaded",
      "RoomOperation2A": "Recycle",
      "RoomOperation3A": "Recycle",
      "RoomOperation4A": "Recycle",
      "RoomOperation5A": "Recycle",
      "RepudiatedDenoms": "0",
      "CashCountMissingCornerUnfitLevel": "Default",
      "CashCountSoiledUnfitLevel": "Default",
      "CashCountMisshapenUnfitLevel": "Default",
      "CashCountTapedUnfitLevel": "Default",
      "CashCountVerificationLevel": "Default",
      "DepositVerificationLevel": "Default",
      "DispenseMissingCornerUnfitLevel": "Default",
      "DispenseSoiledUnfitLevel": "Default",
      "DispenseMisshapenUnfitLevel": "Default",
      "DispenseTapedUnfitLevel": "Default",
      "DispenseVerificationLevel": "Default"
    },
    "id": uuid.v4()
  }
  
}

function reset (deviceName = "HCM2_01", mode = "full") {
  return {
    "jsonrpc": "2.0",
    "method": "reset",
    "description": "Issues the mechanical reset.",
    "params": {
      "LDN": deviceName,
      "mode": mode
    },
    "id": uuid.v4()
  }
}

function openCloseShutter (deviceName = "HCM2_01", action, retry) {
  return {
    "jsonrpc": "2.0",
    "method": "openCloseShutter",
    "description": "Open or Close the CS shutter.",
    "params": {
      "LDN": deviceName,
      "open": action === "open" ? "true" : "false",
      "retry": Boolean(retry).toString
    },
    "id": uuid.v4()
  }
}

function cashCount (deviceName = "HCM2_01") {
  return {
    "jsonrpc": "2.0",
    "method": "cashCount",
    "description": "Counts and validates the banknotes set in CS.",
    "params": {
      "LDN": deviceName,
      "testNotes": "false"
    },
    "id": uuid.v4()
  }
}

function deposit (deviceName = "HCM2_01") {
  return {
    "jsonrpc": "2.0",
    "method": "deposit",
    "description": "Counts and identifies the banknotes in ESC.",
    "params": {
      "LDN": deviceName,
      "testNotes": "false",
      "excludeRoom1A": "false",
      "excludeRoom2A": "false",
      "excludeRoom3A": "false",
      "excludeRoom4A": "false",
      "excludeRoom5A": "false",
      "excludeRoom1B": "true",
      "excludeRoom1C": "true",
      "excludeRoomURJB": "false"
    },
    "id": uuid.v4()
  }
}

function cashRollback (deviceName = "HCM2_01") {
  return {
    "jsonrpc": "2.0",
    "method": "cashRollback",
    "description": "Return the banknotes stacked in ESC to CS.",
    "params": {
      "LDN": deviceName,
      "testNotes": "false"
    },
    "id": uuid.v4()
  }
}

function dispenseByRoom (deviceName = "HCM2_01", billsToDispense) {
  // Assuming the billsToDispense obj is of the format:
  // {
  //   room2A: <amount_of_bills>,
  //   room3A: <amount_of_bills>,
  //   room4A: <amount_of_bills>,
  //   room5A: <amount_of_bills>
  // }

  return {
    "jsonrpc": "2.0",
    "method": "dispenseByRoom",
    "description": "Feed the specified banknotes from specified room and transport them into CS.",
    "params": {
      "LDN": deviceName,
      "testNotes": "false",
      "NotesRoom2A": billsToDispense.room2A.toString(),
      "NotesRoom3A": billsToDispense.room3A.toString(),
      "NotesRoom4A": billsToDispense.room4A.toString(),
      "NotesRoom5A": billsToDispense.room5A.toString()
    },
    "id": uuid.v4()
  }
}

module.exports = {
  getFirmwareVersion,
  getInfo,
  getBanknoteInfo,
  setDenomination,
  setInfo,
  reset,
  openCloseShutter,
  cashCount,
  deposit,
  cashRollback,
  dispenseByRoom
}
