import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    savedName: ref(''),
    previousNames: ref(new Set<string>()),
  }),
  getters: {
    usedNames: state => Array.from(state.previousNames.value),
    otherNames: state => state.usedNames.filter(name => name !== state.savedName.value),
  },
  actions: {
    setNewName(name: string) {
      if (this.savedName.value && name !== this.savedName.value)
        this.previousNames.value.add(this.savedName.value)

      this.savedName.value = name
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
