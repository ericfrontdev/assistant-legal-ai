<template>
  <div class="chat-container flex flex-col gap-4">
    <!-- Header -->
    <div class="card-header text-center">Assistant Legal AI 🤖</div>

    <!-- Messages -->
    <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto px-1">
      <div v-for="(msg, index) in messages" :key="index" class="chat-message" :class="msg.sender">
        <template v-if="msg.sender === 'choice'">
          <button class="btn-outline" @click="selectChoice(msg.text)">
            {{ msg.text }}
          </button>
        </template>
        <template v-else>
          {{ msg.text }}
        </template>
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

  // Message utilisateur
  messages.value.push({
    sender: 'user',
    text: userMessage.value,
  })

  const userInput = userMessage.value
  userMessage.value = ''

  // Message d'attente
  messages.value.push({
    sender: 'bot',
    text: '⏳ AssistantLegal réfléchit...',
  })

  try {
    const res = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userInput,
        prompt: props.prompt,
        cabinetName: props.cabinetName,
      }),
    })

    const data = await res.json()
    console.log('Response:', data)
    messages.value.pop() // retire "réfléchit..."

    if (data.reply) {
      messages.value.push({
        sender: 'bot',
        text: data.reply,
      })
    }

    if (Array.isArray(data.choices)) {
      data.choices.forEach((choice) => {
        const date = new Date(choice)
        const isValidDate = !isNaN(date.getTime())

        const label = isValidDate
          ? (() => {
              const datePart = date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })

              const hours = String(date.getHours()).padStart(2, '0')
              const minutes = String(date.getMinutes()).padStart(2, '0')

              return minutes === '00'
                ? `${datePart} à ${hours}h`
                : `${datePart} à ${hours}h${minutes}`
            })()
          : choice

        messages.value.push({
          sender: 'choice',
          text: label,
          value: choice,
        })
      })
    }
  } catch (error) {
    messages.value.pop()
    messages.value.push({
      sender: 'bot',
      text: '❌ Une erreur est survenue. Veuillez réessayer plus tard.',
    })
    console.error(error)
  }
}

function selectChoice(choice) {
  userMessage.value = choice
  const selected = messages.value.find((m) => m.text === choice && m.sender === 'choice')
  userMessage.value = selected?.value || choice
  sendMessage()
}
</script>
