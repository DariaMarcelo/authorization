export interface IAssessment {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface IAssessmentReport {
  data: IReportData;
  type: string;
}

export interface IReportData {
  agreeableness: number;
  drive: number;
  luck: number;
  openess: number;
}
