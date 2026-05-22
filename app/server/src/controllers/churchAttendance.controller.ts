import { Request, Response } from 'express';
import { createChurchAttendance, getAllChurchAttendance, getOneChurchAttendance, updateChurchAttendance, deleteChurchAttendance, getAttendanceByService, getTotalsByService } from '../services/churchAttendance.service.js';
import { getIO } from '../sockets/socket.js';
import { getSectionIdByName } from '../services/churchSection.service.js';
import { getActiveService } from '../services/churchService.service.js';

// Handle Create Church Attendance
export const handleCreateChurchAttendance = async (req: Request, res: Response) => {
  try {
    const { service_id, section_name, men, women, children, counter_name } = req.body

    // Find Section ID first
    const section_id = await getSectionIdByName(section_name)

    if (!section_id) {
      return res.status(404).json({
        error: 'Section not found',
      })
    }

    const churchAttendanceData = {
      section_id, 
      service_id,
      men,
      women,
      children,
      counter_name
    }
    
    const data = await createChurchAttendance(churchAttendanceData)

    getIO().emit('attendance:updated')

    return res.status(201).json(data)

  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({ error: error.message })
    }
  }
}

// Handle Get All Attendance
export const handleGetAllChurchAttendance = async (req: Request, res: Response) => {
  try {

      const data = await getAllChurchAttendance()

      return res.status(200).json(data)

  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({ error: error.message })
      }
    }
}

// Handle Get Attendance by Service
export const handleGetAttendanceByService = async (req: Request, res: Response) => {
  try {

      const { service_id } = req.params
      
      const data = await getAttendanceByService(service_id as string)

      return res.status(200).json(data)

  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({ error: error.message })
      }
  }
}

// Handle Get One Attendance
export const handleGetOneChurchAttendance = async (req: Request, res: Response) => {
  try {

      const { attendance_id } = req.params
      
      const data = await getOneChurchAttendance(attendance_id as string)

      return res.status(200).json(data)

  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({ error: error.message })
      }
  }
}

// Handle Update Church Attendance
export const handleUpdateChurchAttendance = async (req: Request, res: Response) => {
  try {

        const { attendance_id } = req.params
        const updatedChurchAttendanceData = req.body
        
        const data = await updateChurchAttendance(attendance_id as string, updatedChurchAttendanceData)

        getIO().emit('attendance:updated')

        return res.status(200).json(data)

  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({ error: error.message })
      }
  }
}

// Handle Delete Church Attendance
export const handleDeleteChurchAttendance = async (req: Request, res: Response) => {
  try {

      const { attendance_id } = req.params

      await deleteChurchAttendance(attendance_id as string)

      getIO().emit('attendance:updated')

      return res.status(200).json({ message: 'Church Attendance deleted successfully' })

  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({ error: error.message })
      }
  }
}

// Handle Get Total By Service
export const handleGetTotalsByService = async (req: Request, res: Response) => {
  try {

      const { service_id } = req.params
      
      const data = await getTotalsByService(service_id as string)

      return res.status(200).json(data)

  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({ error: error.message })
      }
  }
}