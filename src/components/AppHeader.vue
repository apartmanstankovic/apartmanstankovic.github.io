<script setup>
const navItems = [
  { href: '#apartment', label: 'Apartment' },
  { href: '#resort', label: 'Resort' },
  { href: '#kopaonik', label: 'Kopaonik' },
  { href: '#reservation', label: 'Reservation' },
  { href: '#contact', label: 'Contact' }
]
</script>

<template>
  <header>
    <div class="top-header">
      <div class="logo">
        <h3 class="logo-image">Apartment Stankovic</h3>
      </div>
      <div class="top-right-header">
        <nav class="header-navbar">
          <ul>
            <li v-for="item in navItems" :key="item.href">
              <a :href="item.href" class="underlined">{{ item.label }}</a>
            </li>
          </ul>
        </nav>
        <div class="language-section">
          <img src="/images/serbia_icon.png" alt="Serbian language" />
          <img src="/images/uk_icon.png" alt="English language" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  align-items: center;
  background-image: url("/images/2.jpeg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.top-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  color: var(--primaryColor);
  font-size: 24px;
}

.top-right-header {
  display: flex;
  align-items: center;
}

.header-navbar {
  width: 100%;
  height: 30px;
}

.header-navbar ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.header-navbar ul li {
  width: 160px;
  text-align: center;
}

.language-section {
  display: flex;
  margin-left: 1em;
}

.language-section img {
  width: 32px;
  height: 24px;
  margin: 0 0.5em;
  transition: 0.5s ease;
}

.language-section img:hover {
  cursor: pointer;
  transform: scale(1.5);
}
</style>
