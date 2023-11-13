import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';
import { IUser } from 'src/app/interfaces/user.interface';
import { IAssessment, IAssessmentReport } from "../interfaces/dashboard.interface";

export interface UserState {
  user: IUser | null;
  assessments: IAssessment[] | null;
  assessmentReport: IAssessmentReport | null;
  usersTotal: IUser[] | null;
  loading: boolean;
  error: string | null;
}

export interface GlobalState {
  userData: UserState;
}

const initialState: UserState = {
  user: null,
  assessments: null,
  assessmentReport: null,
  usersTotal: null,
  loading: false,
  error: null,
};

export const initialGlobalState: GlobalState = {
  userData: initialState,
};

export const userReducers = createReducer(
  initialState,
  on(UserActions.login, (state, { email, password }) => {
    const result = {
      ...state,
      loading: true,
    };
    return result;
  }),
  on(UserActions.loginSuccess, (state, { userResponse }) => {
    const result = {
      ...state,
      loading: false,
      user: userResponse,
      error: null,
    };
    return result;
  }),
  on(UserActions.loginError, (state, { error }) => {
    const result = {
      ...state,
      loading: false,
      user: null,
      error: error,
    };
    return result;
  }),
  on(UserActions.getAssessments, (state) => {
    const result = {
      ...state,
      loading: true,
    };
    return result;
  }),
  on(UserActions.assessmentsLoaded, (state, { assessmentResponse }) => {
    const result = {
      ...state,
      loading: false,
      assessments: assessmentResponse,
      error: null,
    };
    return result;
  }),
  on(UserActions.assessmentsLoadError, (state, { error }) => {
    const result = {
      ...state,
      loading: false,
      assessments: null,
      error: error,
    };
    return result;
  }),
  on(UserActions.getAssessmentReport, (state) => {
    const result = {
      ...state,
      loading: true,
    };
    return result;
  }),
  on(UserActions.assessmentReportLoaded, (state, { reportResponse }) => {
    const result = {
      ...state,
      loading: false,
      assessmentReport: reportResponse,
      error: null,
    };
    return result;
  }),
  on(UserActions.assessmentReportLoadError, (state, { error }) => {
    const result = {
      ...state,
      loading: false,
      assessmentReport: null,
      error: error,
    };
    return result;
  }),
  on(UserActions.getUsers, (state) => {
    const result = {
      ...state,
      loading: true,
    };
    return result;
  }),
  on(UserActions.usersLoaded, (state, { userResponse }) => {
    const result = {
      ...state,
      loading: false,
      usersTotal: userResponse,
      error: null,
    };
    return result;
  }),
  on(UserActions.usersLoadError, (state, { error }) => {
    const result = {
      ...state,
      loading: false,
      usersTotal: null,
      error: error,
    };
    return result;
  })
);
