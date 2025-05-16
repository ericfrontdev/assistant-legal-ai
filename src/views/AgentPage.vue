<template>
  <div :style="cssVars">
    <ChatWindow
      v-if="cabinet"
      :prompt="cabinet.prompt"
      :cabinet-name="cabinet.nom"
      :style-json="cabinet.style_json"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCabinetData } from '@/composables/useCabinetData'
import ChatWindow from '@/components/ChatWindow.vue'
import { computed } from 'vue'

const route = useRoute()
const { cabinet } = useCabinetData(route.params.slug)

const cssVars = computed(() => {
  const s = cabinet.value?.style_json || {}
  return {
    '--primary': s.primaryColor || '#1d1d1d',
    '--secondary': s.secondaryColor || '#c72626',
    '--bg': s.backgroundColor || '#ffffff',
    '--text': s.textColor || '#222222',
    '--font': s.fontFamily || 'sans-serif',
    '--radius': s.borderRadius || '8px',
    '--btn-bg': s.buttonStyle?.background || s.primaryColor || '#1d1d1d',
    '--btn-text': s.buttonStyle?.textColor || '#ffffff',
    '--btn-hover': s.buttonStyle?.hoverBackground || '#000000',
    '--btn-radius': s.buttonStyle?.borderRadius || '8px',
    fontFamily: s.fontFamily || 'sans-serif',
    backgroundColor: s.backgroundColor || '#ffffff',
    color: s.textColor || '#222222',
  }
})
</script>
