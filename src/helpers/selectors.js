export function getAppointmentsForDay(state, day) {
  // find object in state.days array
  const findDay = state.days.find(stateDay => stateDay.name === day);
  
  // Array of Appt Ids 
  // console.log("findDay", findDay.appointments); 
  // console.log("FindDay obj", findDay);

  // Object of Appt Objects (id, time, interview keys)
  // console.log("StateAppt", state.appointments);

  // iterate through the array
  let result = [];

  if (!state.days.length) {
    return result;
  }

  if (findDay === undefined) {
    return result;
  }

  for (const appointment of findDay.appointments) {
    // console.log("appointment", appointment);
    result.push(state.appointments[appointment])
  }
  return result;
}