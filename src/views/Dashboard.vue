<template>
  <div>
    <h1>Dashboard de {{ cabinet?.nom }}</h1>
    <!-- Afficher les rendez-vous, clients, etc. -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCabinetData } from '@/composables/useCabinetData'

const route = useRoute()
const { cabinet } = useCabinetData(route.params.slug)
</script>
