import { api } from '@/lib/api'
import axios from 'axios'

export const exportAsCsv = async (service_id: string) => {
  try {
    const res = await api.get(`/api/exportCSV/${service_id}`, {
      responseType: 'blob'
    })

    console.log(res.headers)

    // Get filename from headers
    const contentDisposition = res.headers['content-disposition']

    let filename = `attendance-${service_id}.csv`

    if (contentDisposition) {
      const filenamePart = contentDisposition.split('filename=')[1]

      if (filenamePart) {
        filename = filenamePart
          .replace(/["']/g, '')
          .trim()
      }
    }

    // Create downloadable blob URL
    const url = window.URL.createObjectURL(new Blob([res.data]))

    const a = document.createElement('a')
    a.href = url

    // USE THE BACKEND FILENAME
    a.download = filename

    document.body.appendChild(a)
    a.click()

    a.remove()
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(
        `Error: ${error.response?.status}\n${JSON.stringify(error.response?.data, null, 2)}`
      )
    } else {
      alert((error as Error)?.message)
    }

    return false
  }
}