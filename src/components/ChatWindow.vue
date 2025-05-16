<template>
  <div class="chat-container flex flex-col gap-4">
    <!-- Header -->
    <div class="card-header text-center">Assistant Legal AI 🤖</div>

    <!-- Messages -->
    <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto px-1">
      <div v-for="(msg, index) in messages" :key="index" class="chat-message" :class="msg.sender">
        {{ msg.text }}
      </div>
    </div>

    <!-- Input -->
    <form @submit.prevent="sendMessage" class="flex gap-2 mt-2">
      <input v-model="userMessage" class="input flex-1" placeholder="Posez votre question..." />
      <button type="submit" class="btn-primary whitespace-nowrap">Envoyer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  prompt: String,
  cabinetName: String,
  styleJson: Object,
})

const messages = ref([
  { sender: 'bot', text: 'Bonjour ! Comment puis-je vous aider aujourd’hui ?' },
])

const userMessage = ref('')

async function sendMessage() {
  if (!userMessage.value.trim()) return

  // Ajoute le message de l'utilisateur
  messages.value.push({
    sender: 'user',
    text: userMessage.value,
  })

  const userInput = userMessage.value
  userMessage.value = ''

  // Message de chargement
  messages.value.push({
    sender: 'bot',
    text: '⏳ AssistantLegal réfléchit...',
  })

  try {
    const res = await fetch(import.meta.env.VITE_MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userInput,
        prompt: props.prompt,
        cabinetName: props.cabinetName,
      }),
    })

    const data = await res.json()

    // Supprimer le message temporaire
    messages.value.pop()

    messages.value.push({
      sender: 'bot',
      text: data.reply || '🤖 Une réponse a été générée.',
    })
  } catch (error) {
    messages.value.pop()
    messages.value.push({
      sender: 'bot',
      text: '❌ Une erreur est survenue. Veuillez réessayer plus tard.',
    })
    console.error(error)
  }
}
</script>
