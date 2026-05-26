import type { Section } from './sectionTypes'

export interface Attendance {
  id: string
  section_id: string
  section_name: string
  men: number
  women: number
  children: number
  counter_name?: string
  section: Section
}

export interface AttendanceDashboardProps {
  service_id?: string
  view: "single" | "active" | "all" // Choose whether you want a single attendance, the active service attendance or all attendance submissions
}