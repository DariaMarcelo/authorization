import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user.interface';
import { IAssessment, IAssessmentReport } from "../../interfaces/dashboard.interface";

// User Actions

export const getUsers = createAction('[Assessment App] Get All Users');

export const usersLoaded = createAction(
  '[Assessment App] Users Loaded',
  props<{ userResponse: IUser[] }>(),
);

export const usersLoadError = createAction(
  '[Assessment App] Users Not Loaded',
  props<{ error: string }>(),
);

export const UserActions = {
  getUsers,
  usersLoaded,
  usersLoadError,
};

// Dashboard Actions

export const getAssessments = createAction('[Assessment App] Get Assessments');

export const assessmentsLoaded = createAction(
  '[Assessment App] Assessments Loaded',
  props<{ assessmentResponse: IAssessment[] }>(),
);

export const assessmentsLoadError = createAction(
  '[Assessment App] Assessments Not Loaded',
  props<{ error: string }>(),
);

export const getAssessmentReport = createAction(
  '[Assessment App] Get Assessment Report',
  props<{ assessmentId: string | null }>(),
);

export const assessmentReportLoaded = createAction(
  '[Assessment App] Assessment Report Loaded',
  props<{ reportResponse: IAssessmentReport }>(),
);

export const assessmentReportLoadError = createAction(
  '[Assessment App] Assessment Report Not Loaded',
  props<{ error: string }>(),
);


export const DashboardActions = {
  getAssessments,
  assessmentsLoaded,
  assessmentsLoadError,
  getAssessmentReport,
  assessmentReportLoaded,
  assessmentReportLoadError,
}
