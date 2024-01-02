<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import { useUserStore } from '../stores/user'

// Adjust with the actual path

defineOptions({
  name: 'IndexPage',
})

const user = useUserStore()
const name = ref(user.savedName)
const router = useRouter()

function go() {
  if (name.value)
    router.push(`/user/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div class="bg-black-800 h-screen flex flex-col items-center justify-center">
    <div class="text-4xl">
      <!-- Replace with your army-related icon -->
      <i class="carbon-campsite inline-block" />
    </div>

    <p class="my-2">
      <a
        href="https://github.com/antfu/vitesse"
        target="_blank"
        rel="noreferrer"
        class="text-blue-600 transition duration-300 ease-in-out hover:text-blue-800"
      >Vitesse</a>
    </p>

    <p class="text-sm text-gray-600 italic">
      {{ t('intro.desc') }}
    </p>

    <div class="py-4" />

    <TheInput
      v-model="name"
      class="border-2 border-gray-800 rounded-lg p-2 transition duration-200 focus:border-blue-500"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="off"
      @keydown.enter="go"
    />
    <label class="sr-only" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        class="mt-3 rounded-lg bg-blue-500 px-5 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-700 disabled:opacity-50 focus:outline-none"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped>
/* Add custom CSS or scoped styles here */
</style>
