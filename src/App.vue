<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans">
    <router-view />
  </div>
</template>

<script setup>
// Rien à ajouter ici pour l’instant
</script>

<style>
/* Valeurs par défaut si les variables CSS ne sont pas encore injectées */
:root {
  --primary: #1d1d1d;
  --secondary: #c72626;
  --bg: #ffffff;
  --text: #222222;
  --font: sans-serif;
}
</style>
