import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
      
    });
  }, []);


  // function updates day with new number of available spots

  const spotUpdate = (weekDay, day, action) => {

    let spot = day.spots;
    if (weekDay === day.name && action === "REMOVE_SPOT") {
      return spot - 1;
    } else if (weekDay === day.name && action === "ADD_SPOT") {
      return spot + 1;
    } else {
      return spot;
    }
  }

  const updateSpots = (weekDay, days, action) => {
    if (action === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekDay, day, action)
        }
      })
      return updatedStateDayArray;
    }
    if (action === "ADD_SPOT") {
      const updatedStateDayArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekDay, day, action)
        }
      })
      return updatedStateDayArray;
    }

  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const updatedSpots = updateSpots(state.day, state.days, "REMOVE_SPOT");
      setState({
        ...state,
        appointments,
        days: updatedSpots
      });
      
    })
  }

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const updatedSpots = updateSpots(state.day, state.days, "ADD_SPOT");
      setState({
        ...state,
        appointments,
        days: updatedSpots
      });
    });
  };
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
  
  
};

export default useApplicationData;



