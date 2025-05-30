export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';
export type TAcademicSemesterNameMapper = {
  [key:string]: string
}
export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
export type TUpdateAcademicSemester = {
  id: string,
  name: TAcademicSemesterName | undefined;
  code: TAcademicSemesterCode | undefined;
  year: string | undefined;
  startMonth: TMonths | undefined;
  endMonth: TMonths | undefined;
};