import { ref, computed } from 'vue'
import { translations } from './translations'

// Available languages
const languages = ['sr', 'en']

// Get stored language and validate it exists
const getInitialLanguage = () => {
  const stored = localStorage.getItem('language')
  if (stored && languages.includes(stored)) {
    return stored
  }
  // Reset to Serbian if stored language is invalid
  localStorage.setItem('language', 'sr')
  return 'sr'
}

// Reactive language state - shared across all components
const currentLanguage = ref(getInitialLanguage())

export function useI18n() {
  // Get current translations object
  const t = computed(() => translations[currentLanguage.value])
  
  // Get specific translation by key path (e.g., 'nav.apartment')
  const translate = (keyPath) => {
    const keys = keyPath.split('.')
    let result = translations[currentLanguage.value]
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key]
      } else {
        console.warn(`Translation key not found: ${keyPath}`)
        return keyPath
      }
    }
    
    return result
  }
  
  // Switch language
  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
      document.documentElement.lang = lang
    }
  }
  
  // Toggle between languages: sr <-> en
  const toggleLanguage = () => {
    const newLang = currentLanguage.value === 'sr' ? 'en' : 'sr'
    setLanguage(newLang)
  }
  
  // Check if current language is Serbian
  const isSr = computed(() => currentLanguage.value === 'sr')
  
  // Check if current language is English
  const isEn = computed(() => currentLanguage.value === 'en')
  
  return {
    currentLanguage,
    languages,
    t,
    translate,
    setLanguage,
    toggleLanguage,
    isSr,
    isEn
  }
}
