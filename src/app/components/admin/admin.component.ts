import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { GlobalState } from 'src/app/store/reducers';
import { selectActiveUserData, selectAllUsers } from 'src/app/store/selectors';
import * as UserActions from '../../store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'lastName',
    'dateOfBirth',
    'role',
    'education',
    'position',
  ];
  dataSource$ = this.store.select(selectAllUsers);
  dataSourcePerPage: IUser[] = [];
  allDataSource: IUser[] = [];
  page = 0;
  pageSize = 5;
  stateData$ = this.store.select(selectActiveUserData);
  showData = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<GlobalState>, private router: Router) {}

  ngOnInit(): void {
    this.stateData$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.showData = !value.loading;
    });

    this.store.dispatch(UserActions.getUsers());
    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (!this.valueIsUsers(value)) {
        return
      }

      this.allDataSource = value;
      this.getDataForPagination({
        pageIndex: this.page,
        pageSize: this.pageSize,
      });
    });
  }

  private valueIsUsers(value: any): value is IUser[] {
    return value && Array.isArray(value) && !value.some((item) => !('role' in item));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getDataForPagination(pagination: { pageIndex: number; pageSize: number }): void {
    const startIndex: number = pagination.pageIndex * pagination.pageSize;
    const endIndex: number = startIndex + pagination.pageSize;
    if (startIndex < 0 || endIndex > this.allDataSource.length) {
      throw new Error('Invalid pagination parameters');
    }
    this.dataSourcePerPage = this.allDataSource.slice(startIndex, endIndex);
  }

  returnBack(): void {
    this.router.navigate(['dashboard']);
  }
}
