import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, DashboardState } from './reducers';
import { state } from "@angular/animations";

export const userFeature = createFeatureSelector<UserState>('userData');
export const dashboardFeature = createFeatureSelector<DashboardState>('dashboard');

export const selectActiveUserData = createSelector(
  userFeature,
  (state) => state,
);

export const selectAllUsers = createSelector(
  userFeature,
  (state) => state.usersTotal,
);

export const selectAssessmentsData = createSelector(
  dashboardFeature,
  (state) => state.assessments,
);

export const selectAssessmentsSize = createSelector(
  dashboardFeature,
  (state) => state.assessmentSize,
);

export const selectAssessmentReport = createSelector(
  dashboardFeature,
  (state) => state.assessmentReport,
);

export const selectAssessmentReportLoading = createSelector(
  dashboardFeature,
  (state) => state.loading,
);
