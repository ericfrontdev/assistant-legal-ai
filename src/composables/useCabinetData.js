import { ref, onMounted } from 'vue'
import { supabase } from '../../supabaseClient.js'

export function useCabinetData(slug) {
  const cabinet = ref(null)
  const loading = ref(true)
  const errorMessage = ref(null)

  onMounted(async () => {
    const { data, error } = await supabase.from('cabinets').select('*').eq('slug', slug).single()

    if (error) {
      console.error('Erreur Supabase :', error.message)
      errorMessage.value = error.message
    } else {
      cabinet.value = data
    }

    loading.value = false
  })

  return { cabinet, loading, errorMessage }
}
