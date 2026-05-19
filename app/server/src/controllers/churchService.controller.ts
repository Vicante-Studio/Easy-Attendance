import { Request, Response } from 'express';
import { createService, getAllServices, getOneService, updateService, deleteService, activateService, getActiveService } from '../services/churchService.service.js';
import { getIO } from '../sockets/socket.js';

// Handle Create Service
export const handleCreateService = async (req: Request, res: Response) => {
  try {

        const serviceData = req.body;

        const data = await createService(serviceData)

        getIO().emit('services:updated')

        return res.status(201).json(data)

  } catch (error) {

        if(error instanceof Error){

            return res.status(500).json({error: error.message})
            
        }

  }
}

// Handle getAllServices
export const handleGetAllServices = async (req: Request, res: Response) => {
  try {

        const data = await getAllServices()

        return res.status(200).json(data)

  } catch (error) {

        if(error instanceof Error){

            return res.status(500).json({error: error.message})

        }

  }

}

// Handle getOneService
export const handleGetOneService = async (req: Request, res: Response) => {
  try {

        const { service_id } = req.params

        const data = await getOneService(service_id as string)

        return res.status(200).json(data)

  } catch (error) {

        if(error instanceof Error){

            return res.status(500).json({error: error.message})

        }

  }
}

// Handle updateService
export const handleUpdateService = async (req: Request, res: Response) => {
  try {

        const { service_id } = req.params
        const updatedServiceData = req.body

        const data = await updateService(service_id as string, updatedServiceData)

        getIO().emit('services:updated')

        return res.status(200).json(data)

  } catch (error) {

        if(error instanceof Error){

            return res.status(500).json({error: error.message})

        }
  }
  
}

// Handle deleteService
export const handleDeleteService = async (req: Request, res: Response) => {
  try {

        const { service_id } = req.params

        await deleteService(service_id as string)

        getIO().emit('services:updated')

        return res.status(200).json({ message: "Service deleted successfully" }); 

  } catch (error) {

        if(error instanceof Error){

            return res.status(500).json({error: error.message})

        }
  }
  
}

export const handleActivateService = async (req: Request, res: Response) => {
  try {
    const { service_id } = req.params

    const data = await activateService(service_id as string)

    getIO().emit('services:updated')

    return res.status(200).json(data)

  } catch (error) {

    if(error instanceof Error){

       return res.status(500).json({error: error.message})

      }
  }
}

export const handleGetActiveService = async (req: Request, res: Response) => {
      try {

            const activeService =  await getActiveService()

            res.status(200).json(activeService)

      } catch (error) {
            if(error instanceof Error){

                  return res.status(500).json({error: error.message})

            }
      }
}