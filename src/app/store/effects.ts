import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as UserActions from './actions';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UserAssessmentEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          tap((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
          }),
          map((response) =>
            UserActions.loginSuccess({ userResponse: response })
          ),
          tap(() => this.router.navigate(['dashboard'])),
          catchError(() =>
            of(
              UserActions.loginError({
                error: 'Your email or password is incorrect, try again',
              })
            )
          )
        );
      })
    )
  );


  public getAssessments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAssessments),
      mergeMap(() => {
        return this.apiService.getAssessments().pipe(
          map((response) =>
            UserActions.assessmentsLoaded({ assessmentResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.assessmentsLoadError({
                error: 'Assessments loading failed',
              })
            )
          )
        );
      })
    )
  );

  public getAssessmentReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAssessmentReport),
      mergeMap((action) => {
        return this.apiService.getAssessmentReport(action.assessmentId).pipe(
          map((response) =>
            UserActions.assessmentReportLoaded({ reportResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.assessmentReportLoadError({
                error: 'Assessment reports loading failed',
              })
            )
          )
        );
      })
    )
  );

  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap((action) => {
        return this.apiService.getAllUsers().pipe(
          map((response) =>
            UserActions.usersLoaded({ userResponse: response })
          ),
          catchError(() =>
            of(
              UserActions.usersLoadError({
                error: 'Users loading failed',
              })
            )
          )
        );
      })
    )
  );
}
