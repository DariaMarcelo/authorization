import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './reducers';

export const userFeature = createFeatureSelector<UserState>('userData');

export const selectActiveUserData = createSelector(
  userFeature,
  (state) => state
);

export const selectAllUsers = createSelector(
  userFeature,
  (state) => state.usersTotal
);

export const selectAssessmentsData = createSelector(
  userFeature,
  (state) => state.assessments
);

export const selectAssessmentReport = createSelector(
  userFeature,
  (state) => state.assessmentReport
);
