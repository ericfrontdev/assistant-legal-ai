import { ref, onMounted } from 'vue'
import { supabase } from '../../supabaseClient.js'

export function useCabinetData(slug) {
  const cabinet = ref(null)
  const loading = ref(true)

  onMounted(async () => {
    const { data, error } = await supabase
      .from('cabinets')
      .select('*')
      .eq('slug', slug)
      .single()
    cabinet.value = data
    loading.value = false
  })

  return { cabinet, loading }
}
