import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IAssessment } from "../../interfaces/dashboard.interface";
import { DashboardActions } from '../../store/user/actions';
import { GlobalState } from 'src/app/store/user/reducers';
import { Store } from '@ngrx/store';
import { selectActiveUserData, selectAssessmentsData } from 'src/app/store/user/selectors';
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
  allDataSource: IAssessment[] = [];
  showData = false;
  stateData$ = this.store.select(selectActiveUserData);

  paginationPageIdx = 0;
  paginationPageSize = 3;

  destroy$: Subject<boolean> = new Subject<boolean>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<GlobalState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  get paginatedData(): IAssessment[] {
    const startIdx = this.paginationPageSize * this.paginationPageIdx;
    let endIdx = startIdx + this.paginationPageSize;
    if (endIdx > this.allDataSource.length) {
      endIdx = this.allDataSource.length;
    }

    return this.allDataSource.slice(startIdx, endIdx);
  }

  ngOnInit(): void {
    this.stateData$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.showData = !value.loading;
    });

    this.store.dispatch(DashboardActions.getAssessments());

    this.dataSource$.pipe(takeUntil(this.unsubscribe$)).subscribe((assessment) => {
      if (this.valueIsAssessments(assessment)) {
        this.allDataSource = assessment;
      }
    });


    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const { pageIndex, pageSize } = params;
      this.paginationPageIdx = +pageIndex || 0;
      this.paginationPageSize = +pageSize || 3;
    });
  }

  private valueIsAssessments(value: any): value is IAssessment[] {
    return value && Array.isArray(value) && !value.some((item) => !('users_resolved' in item));
  }

  onUpdateRoute(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageIndex: event.pageIndex,
        pageSize: event.pageSize,
      },
      queryParamsHandling: 'merge',
    });
  }
}
