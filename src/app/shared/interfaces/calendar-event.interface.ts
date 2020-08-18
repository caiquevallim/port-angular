import {CalendarEvent} from 'calendar-utils';

export interface ICalendarEvent {
  date: Date;
  events: CalendarEvent[];
}
