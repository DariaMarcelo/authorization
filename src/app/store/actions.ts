import { createAction, props } from '@ngrx/store';
import { IAssessment, IAssessmentReport, IUser } from 'src/app/interfaces/user.interface';

export const login = createAction(
  '[Assessment App] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Assessment App] Login Success',
  props<{ userResponse: IUser }>()
);

export const loginError = createAction(
  '[Assessment App] Login Error',
  props<{ error: string }>()
);

export const getAssessments = createAction('[Assessment App] Get Assessments');

export const assessmentsLoaded = createAction(
  '[Assessment App] Assessments Loaded',
  props<{ assessmentResponse: IAssessment[] }>()
);

export const assessmentsLoadError = createAction(
  '[Assessment App] Assessments Not Loaded',
  props<{ error: string }>()
);

export const getAssessmentReport = createAction(
  '[Assessment App] Get Assessment Report',
  props<{ assessmentId: string | null }>()
);

export const assessmentReportLoaded = createAction(
  '[Assessment App] Assessment Report Loaded',
  props<{ reportResponse: IAssessmentReport }>()
);

export const assessmentReportLoadError = createAction(
  '[Assessment App] Assessment Report Not Loaded',
  props<{ error: string }>()
);

export const getUsers = createAction('[Assessment App] Get All Users');

export const usersLoaded = createAction(
  '[Assessment App] Users Loaded',
  props<{ userResponse: IUser[] }>()
);

export const usersLoadError = createAction(
  '[Assessment App] Users Not Loaded',
  props<{ error: string }>()
);
