const getName = (group: string) => {
    switch (group) {
      case "alertness":
        return "Alertness";
      case "attitude":
        return "Attitude";
      case "essentialDocuments":
        return "Essential documents";
      case "hazardAwareness":
        return "Hazard awareness";
      case "incidents":
        return "Incidents";
      case "motorwayRules":
        return "Motorway rules";
      case "otherTypesOfVehicle":
        return "Other types of vehicle";
      case "roadAndTrafficSigns":
        return "Road and traffic signs";
      case "rulesOfTheRoad":
        return "Rules of the road";
      case "safetyMargins":
        return "Safety margins";
      case "safetyVehicle":
        return "Safety and your vehicle";
      case "vehicleHanding":
        return "Vehicle handling";
      case "vehicleHandling":
        return "Vehicle handling";
      case "vehicleLoading":
        return "Vehicle loading";
      case "vulnerableRoadUsers":
        return "Vulnerable road users";
      default:
        console.error(`Test group "${group}" does not exist.`);
        return "";  
    }
  };
  
  export default getName;
  