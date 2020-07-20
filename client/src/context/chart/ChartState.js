import React, { useReducer } from 'react';
import axios from 'axios';
import chartContext from './chartContext';
import chartReducer from './chartReducer';
import {
  SET_CHART,
  ADD_GOAL,
  SET_LOADING,
  GOAL_ERROR,
  GET_GOALS,
  UPDATE_GOALS,
  DELETE_GOALS,
} from '../types';

const ChartState = (props) => {
  const initialState = {
    value: 'cycling',
    goals: null,
    error: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(chartReducer, initialState);
  // set isLoading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const setChartValue = (type) => {
    dispatch({ type: SET_CHART, payload: type });
  };

  const addGoal = async (goal) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      setLoading();
      const res = await axios.post('/api/goals', goal, config);
      dispatch({
        type: ADD_GOAL,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GOAL_ERROR,
        payload: error.msg,
      });
    }
  };

  const getGoals = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/goals');
      dispatch({
        type: GET_GOALS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GOAL_ERROR,
        payload: error.msg,
      });
    }
  };

  const updateGoals = async (goal) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading();
      const res = await axios.put(`/api/goals/${goal._id}`, goal, config);
      dispatch({
        type: UPDATE_GOALS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GOAL_ERROR,
        payload: error.msg,
      });
    }
  };

  const deleteGoals = async (id) => {
    try {
      await axios.delete(`/api/goals/${id}`);
      dispatch({
        type: DELETE_GOALS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: GOAL_ERROR,
        payload: error.msg,
      });
    }
  };

  return (
    <chartContext.Provider
      value={{
        goals: state.goals,
        value: state.value,
        error: state.error,
        isLoading: state.isLoading,
        setChartValue,
        addGoal,
        getGoals,
        updateGoals,
        deleteGoals,
      }}
    >
      {props.children}
    </chartContext.Provider>
  );
};

export default ChartState;
