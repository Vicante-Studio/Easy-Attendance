import db from '../config/database.js'

export const getSectionIdByName = async (sectionName: string) => {
  const stmt = db.prepare(`
        SELECT id
        FROM sections
        WHERE name = ?
    `)
  const section = stmt.get(sectionName) as { id: string } | undefined

  if(!section || section === undefined){
    throw new Error('Cannot get section ID')
  }

  return section.id
}