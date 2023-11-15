import { createReducer, on } from '@ngrx/store';
import { UserActions, DashboardActions } from './actions';
import { AuthActions } from "../auth/actions";
import { IUser } from 'src/app/interfaces/user.interface';
import { IAssessment, IAssessmentReport } from "../../interfaces/dashboard.interface";

export interface UserState {
  user: IUser | null;
  usersTotal: IUser[] | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardState {
  assessments: IAssessment[] | null;
  assessmentSize: number;
  assessmentReport: IAssessmentReport | null;
  loading: boolean;
  error: string | null;
}

export interface GlobalState {
  userData: UserState;
  dashboard: DashboardState;
}

const initialUserState: UserState = {
  user: null,
  usersTotal: null,
  loading: false,
  error: null,
};

const initialDashboardState: DashboardState = {
  assessments: null,
  assessmentSize: 0,
  assessmentReport: null,
  loading: false,
  error: null,
}

export const initialGlobalState: GlobalState = {
  userData: initialUserState,
  dashboard: initialDashboardState,
};

export const userReducers = createReducer(
  initialUserState,
  on(UserActions.login, (state, { email, password }) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UserActions.loginSuccess, (state, { userResponse }) => {
    return {
      ...state,
      loading: false,
      user: userResponse,
      error: null,
    };
  }),
  on(UserActions.loginError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      user: null,
      error: error,
    };
  }),
  on(UserActions.getUsers, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UserActions.usersLoaded, (state, { userResponse }) => {
    return {
      ...state,
      loading: false,
      usersTotal: userResponse,
      error: null,
    };
  }),
  on(UserActions.usersLoadError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      usersTotal: null,
      error: error,
    };
  }),
);

export const dashboardReducers = createReducer(
  initialDashboardState,
  on(DashboardActions.getAssessments, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(DashboardActions.assessmentsLoaded, (state, { assessmentResponse }) => {
    return {
      ...state,
      loading: false,
      assessments: assessmentResponse,
      assessmentSize: assessmentResponse.length,
      error: null,
    };
  }),
  on(DashboardActions.assessmentsLoadError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      assessments: null,
      error: error,
    };
  }),
  on(DashboardActions.getAssessmentReport, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(DashboardActions.assessmentReportLoaded, (state, { reportResponse }) => {
    return {
      ...state,
      loading: false,
      assessmentReport: reportResponse,
      error: null,
    };
  }),
  on(DashboardActions.assessmentReportLoadError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      assessmentReport: null,
      error: error,
    };
  }),
)
