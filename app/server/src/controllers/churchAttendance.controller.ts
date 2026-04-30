import { Request, Response } from 'express';
import { createChurchAttendance, getAllChurchAttendance, getOneChurchAttendance, updateChurchAttendance, deleteChurchAttendance } from '../services/churchAttendance.service.js';

// Handle Create Church Attendance
export const handleCreateChurchAttendance = async (req: Request, res: Response) => {
  try {

    const churchAttendanceData = req.body
    
    const data = await createChurchAttendance(churchAttendanceData)

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

      return res.status(201).json(data)

  } catch (error) {

      if(error instanceof Error){

        return res.status(500).json({ error: error.message })

      }

    }

}

// Handle Get One Attendance
export const handleGetOneChurchAttendance = async (req: Request, res: Response) => {
  try {

      const { attendanceID } = req.params
      
      const data = await getOneChurchAttendance(attendanceID as string)

      return res.status(201).json(data)

  } catch (error) {

      if(error instanceof Error){

        return res.status(500).json({ error: error.message })

      }

  }

}

// Handle Update Church Attendance
export const handleUpdateChurchAttendance = async (req: Request, res: Response) => {
  try {

        const { attendanceID } = req.params
        const updatedChurchAttendanceData = req.body
        
        const data = await updateChurchAttendance(attendanceID as string, updatedChurchAttendanceData)

        return res.status(201).json(data)

  } catch (error) {

      if(error instanceof Error){

        return res.status(500).json({ error: error.message })

      }

  }

}

// Handle Delete Church Attendance
export const handleDeleteChurchAttendance = async (req: Request, res: Response) => {
  try {

      const { attendanceID } = req.params

      await deleteChurchAttendance(attendanceID as string)

      return res.status(201).json({ message: 'Church Attendance deleted successfully' })

  } catch (error) {

      if(error instanceof Error){

        return res.status(500).json({ error: error.message })

      }

  }

}