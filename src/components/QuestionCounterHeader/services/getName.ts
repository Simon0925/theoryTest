const names = {
    alertness:"Alertness",
    attitude:"Attitude",
    essentialDocuments:"Essential documents",
    hazardAwareness:"Hazard awareness",
    incidents:"Incidents",
    motorwayRules:"Motorway rules",
    otherTypesOfVehicle:"Other types of vehicle",
    roadAndTrafficSigns:"Road and traffic signs",
    rulesOfTheRoad:"Rules of the road",
    safetyMargins:"Safety margins",
    safetyVehicle:"Safety and your vehicle",
    vehicleHandling:"Vehicle handling",
    vehicleLoading:"Vehicle loading",
    vulnerableRoadUsers:"Vulnerable road users",
  }

  const getName = (topic: string) =>
  topic in names ? names[topic as keyof typeof names] : undefined;

export default getName ;