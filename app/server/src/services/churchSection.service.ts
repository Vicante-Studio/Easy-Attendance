import supabase from '../config/supabase.js';


// Create Section
export const createChurchSection = async (sectionName: string) => {
  const { data, error } = await supabase.from("sections").insert(sectionName).select()

  if(error) throw new Error(error.message)

  return data
}

// Get all sections
export const getAllChurchSections = async () => {
  const { data, error } = await supabase.from("sections").select('*')

  if(error) throw new Error(error.message)

  return data
}

// Get one section
export const getOneChurchSection = async (section_id: string) => {
  const { data, error } = await supabase.from("sections").select('*').eq('id', section_id).single()
  
  if(error) throw new Error(error.message)

  return data
}

// Update Section
export const updateChurchSection = async (section_id: string, updatedSection: Object) => {
  const { data, error } = await supabase.from("sections").update(updatedSection).eq("id", section_id).select().single()

  if(error) throw new Error(error.message)

  return data
}

// Delete Section
export const deleteChurchSection = async (section_id: string) => {
  const { data, error } = await supabase.from("sections").delete().eq("id", section_id).select()

  if(error) throw new Error(error.message)

  if(!data || data.length === 0){
        throw new Error('Service not found')
    }

  return true
}