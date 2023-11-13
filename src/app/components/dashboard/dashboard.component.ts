import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IAssessment } from "../../interfaces/dashboard.interface";
import { DashboardActions } from '../../store/actions';
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
      this.showData = !value.loading;
    });

    this.store.dispatch(DashboardActions.getAssessments());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource = this.valueIsAssessments(value) ? value : [];
      this.getDataForPagination({
        pageIndex: this.page,
        pageSize: this.pageSize,
      });
    });
  }

  private valueIsAssessments(value: any): value is IAssessment[] {
    return value && Array.isArray(value) && !value.some((item) => !('users_resolved' in item));
  }

  getDataForPagination(pagination: { pageIndex: number; pageSize: number }) {
    let index = 0,
      startingIndex = pagination.pageIndex * pagination.pageSize,
      endingIndex = startingIndex + pagination.pageSize;
    this.dataSourcePerPage = this.allDataSource.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex);
    });
  }
}
