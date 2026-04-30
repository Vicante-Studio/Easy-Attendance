import supabase from '../config/supabase.js';
import { AttendanceType } from '../types/churchAttendance.type.js';

// Create ChurchAttendance
export const createChurchAttendance = async (attendanceData: AttendanceType) => {
  const { data, error } = await supabase.from("attendance").insert(attendanceData).select()

  if(error) throw new Error(error.message)

  return data
}

// Get all sections
export const getAllChurchAttendance = async () => {
  const { data, error } = await supabase.from("attendance").select('*')

  if(error) throw new Error(error.message)

  return data
}

// Get one section
export const getOneChurchAttendance = async (attendance_id: string) => {
  const { data, error } = await supabase.from("attendance").select('*').eq('id', attendance_id).single()
  
  if(error) throw new Error(error.message)

  return data
}

// Update Section
export const updateChurchAttendance = async (attendance_id: string, updatedAttendance: Object) => {
  const { data, error } = await supabase.from("attendance").update(updatedAttendance).eq("id", attendance_id).select().single()

  if(error) throw new Error(error.message)

  return data
}

// Delete Section
export const deleteChurchAttendance = async (attendance_id: string) => {
  const { data, error } = await supabase.from("attendance").delete().eq("id", attendance_id).select()

  if(error) throw new Error(error.message)

  if(!data || data.length === 0){
        throw new Error('Service not found')
    }

  return true
}