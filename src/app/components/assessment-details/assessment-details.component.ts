import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAssessmentReport, selectAssessmentReportLoading } from 'src/app/store/selectors';
import Chart from 'chart.js/auto';
import * as UserActions from '../../store/actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.scss'],
})

export class AssessmentDetailsComponent implements OnInit, OnDestroy {
  assessmentId!: string | null;
  chart: Chart | null = null;
  reportData$ = this.store.select(selectAssessmentReport);
  reportLoading$ = this.store.select(selectAssessmentReportLoading);
  showData = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.assessmentId = params.get('id');
    });
    this.store.dispatch(
      UserActions.getAssessmentReport({ assessmentId: this.assessmentId }),
    );

    this.reportLoading$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.showData = !value;
    });

    this.reportData$.pipe(takeUntil(this.destroy$)).subscribe((report) => {
      if (!report || !report.data) {
        return;
      }

      this.destroyChart();
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: Object.keys(report.data),
          datasets: [
            {
              label: 'Rate',
              data: Object.values(report.data),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyChart();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private destroyChart(): void {
    if (this.chart instanceof Chart && typeof this.chart.destroy === 'function') {
      this.chart.destroy();
    }
  }

  returnBack(): void {
    this.router.navigate(['dashboard']);
  }
}
