import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import { ServiceType } from '../types/churchService.type.js';

// Create Service
export function createService(serviceData: ServiceType) {
    const id = uuidv4()

    const stmt = db.prepare(`
            INSERT INTO services (id, name)
            VALUES (?, ?)
        `)

    stmt.run(id, serviceData.name)

    return db.prepare('SELECT * FROM services WHERE id = ?').get(id)
}

// Get All Services
export async function getAllServices() {
    return db.prepare(`
        SELECT * FROM services
        ORDER BY created_at DESC
    `).all()
}

// Get One Service
export async function getOneService(service_id: string) {
    const service = db.prepare(`
        SELECT * FROM services WHERE id = ?
    `).get(service_id)

    if (!service) throw new Error('Service not found')

    return service
}

//Get active Service
export const getActiveService = async () => {

  const activeService = db.prepare(`
        SELECT * FROM services
        WHERE is_active = 1
        LIMIT 1
    `).get()

    if(!activeService) throw new Error('Active Service not found')

    return activeService    

}

// Update Service
export async function updateService(service_id: string, updatedService: {name?: string }) {
    const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(service_id)
    if (!existing) throw new Error('Service not found')

    const stmt = db.prepare(`
        UPDATE services
        SET name = ?
        WHERE id = ?
    `)

    stmt.run(
        updatedService.name ?? (existing as any).name,
        service_id
    )

    return db.prepare('SELECT * FROM services WHERE id = ?').get(service_id)
}

// Delete Service
export async function deleteService(service_id: string) {
    const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(service_id)
    if (!existing) throw new Error('Service not found')

    // Check if any attendance records reference this service
    const linkedAttendance = db.prepare(`
            SELECT COUNT(*) as count FROM attendance WHERE service_id = ?
        `).get(service_id) as { count: number }

    if(linkedAttendance.count > 0){
        throw new Error(`Cannot delete this service - It has ${linkedAttendance.count} attendance record(s) linked to it. Delete the attendance records first or contact your administrator`)
    }

    db.prepare('DELETE FROM services WHERE id = ?').run(service_id)

    return true
}

// Activate one service
export const activateService = async (service_id: string) => {
  const deactivateAllStmt = db.prepare(`
      UPDATE services
      SET is_active = 0
    `)

  const activateOneStmt = db.prepare(`
        UPDATE services
        SET is_active = 1
        WHERE id = ?
    `)

  const transaction = db.transaction((id: string) => {
    deactivateAllStmt.run()
    activateOneStmt.run(id)
  })

  transaction(service_id)

  return db.prepare(`
      SELECT * FROM services
      WHERE id = ?
  `).get(service_id)
}