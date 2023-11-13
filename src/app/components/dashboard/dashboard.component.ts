import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IAssessment } from 'src/app/interfaces/dashboard.interface';
import * as UserActions from '../../store/actions';
import { GlobalState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { selectActiveUserData, selectAssessmentsData } from 'src/app/store/selectors';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'image_url',
    'users_resolved',
    'active',
  ];

  dataSource$ = this.store.select(selectAssessmentsData);

  allDataSource!: IAssessment[];
  dataSourcePerPage!: IAssessment[];
  page = 0;
  pageSize = 3;
  showData = false;
  stateData$ = this.store.select(selectActiveUserData);
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<GlobalState>) {}

  ngOnInit(): void {
    this.stateData$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value.loading) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    });

    this.store.dispatch(UserActions.getAssessments());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource = value!;
      this.getDataForPagination({
        pageIndex: this.page,
        pageSize: this.pageSize,
      });
    });
  }

  getDataForPagination(pagination: { pageIndex: number; pageSize: number }) {
    let index = 0,
      startingIndex = pagination.pageIndex * pagination.pageSize,
      endingIndex = startingIndex + pagination.pageSize;
    this.dataSourcePerPage = this.allDataSource.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
