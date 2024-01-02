<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface LearningStats {
  hoursStudied: number
  subjectsCovered: SubjectCovered[]
}

interface SubjectCovered {
  subject: string
  hours: number
}

interface UserData {
  name: string
  email: string
  learning_stats: LearningStats
}

const router = useRouter()
const routeParams = router.currentRoute.value.params
const userName = Array.isArray(routeParams.name) ? routeParams.name[0] : routeParams.name
const password = ref('')
const userData = ref<UserData | null>(null)
const fetchError = ref('')

async function login() {
  if (!userName || typeof userName !== 'string') {
    fetchError.value = 'Username must be a string and cannot be empty.'
    return
  }

  try {
    const response = await fetch(`http://localhost:8000/login/${encodeURIComponent(userName)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: password.value,
      }),
    })

    if (!response.ok)
      throw new Error('Failed to login or fetch user data')

    const responseData = await response.json()
    // Store the authentication token or handle the login data as needed
    // Assuming responseData is the user data; adjust to match your API response structure
    userData.value = responseData as UserData
    fetchError.value = ''
  }
  catch (error) {
    console.error('Failed to login or fetch user data:', error)
    fetchError.value = 'Login failed. Please check your username and password.'
    userData.value = null
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">
        Login
      </button>
    </form>

    <div v-if="userData">
      <h3>{{ userData.name }}'s Learning Stats</h3>
      <p>Email: {{ userData.email }}</p>
      <p>Hours Studied: {{ userData.learning_stats?.hoursStudied }}</p>
      <h4>Subjects Covered:</h4>
      <ul>
        <li v-for="subject in userData.learning_stats?.subjectsCovered" :key="subject.subject">
          {{ subject.subject }}: {{ subject.hours }} hours
        </li>
      </ul>
    </div>
    <div v-else-if="fetchError">
      <p>{{ fetchError }}</p>
    </div>
    <div v-else>
      <p>Enter your password to load data.</p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
