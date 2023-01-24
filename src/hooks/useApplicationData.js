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

  const updatedDays = (appointments, appointmentId) => {
    const foundDay = state.days.find(day => day.appointments.includes(appointmentId))
    const spots = foundDay.appointments.filter(id => appointments[id].interview === null).length

    return state.days.map(day => day.appointments.includes(appointmentId) ? { ...day, spots } : day)
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
    
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: updatedDays(appointments, id)
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

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: updatedDays(appointments, id)
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



