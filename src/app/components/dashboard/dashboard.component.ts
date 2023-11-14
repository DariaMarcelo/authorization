import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IAssessment } from "../../interfaces/dashboard.interface";
import { DashboardActions } from '../../store/actions';
import { GlobalState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { selectActiveUserData, selectAssessmentsData } from 'src/app/store/selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  dataSourcePerPage!: IAssessment[];
  allDataSource = new MatTableDataSource<IAssessment>();
  showData = false;
  stateData$ = this.store.select(selectActiveUserData);
  destroy$: Subject<boolean> = new Subject<boolean>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<GlobalState>,
    private router: Router,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.stateData$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.showData = !value.loading;
    });

    this.store.dispatch(DashboardActions.getAssessments());

    this.stateData$.pipe(takeUntil(this.unsubscribe$)).subscribe((assessment) => {
      if (this.valueIsAssessments(assessment)) {
        this.allDataSource.data = assessment;

        if (this.paginator) {
          this.paginator.pageIndex = this.paginator.pageIndex || 0;
          this.paginator.pageSize = this.paginator.pageSize || 3;
        }
      }
    });
  }

  private valueIsAssessments(value: any): value is IAssessment[] {
    return value && Array.isArray(value) && !value.some((item) => !('users_resolved' in item));
  }

  updateRoute(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageIndex: event.pageIndex,
        pageSize: event.pageSize
      },
      queryParamsHandling: 'merge',
    });
  }
}
