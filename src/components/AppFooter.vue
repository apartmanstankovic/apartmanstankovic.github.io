<script setup>
import { ref } from 'vue'

const navItems = [
  { href: '#apartment', label: 'Apartment' },
  { href: '#resort', label: 'Resort' },
  { href: '#kopaonik', label: 'Kopaonik' },
  { href: '#reservation', label: 'Reservation' },
  { href: '#contact', label: 'Contact' }
]

const newsletterEmail = ref('')
</script>

<template>
  <footer>
    <div id="contact">
      <nav class="footer-navbar">
        <h2>Navigation menu</h2>
        <ul>
          <li v-for="item in navItems" :key="item.href">
            <a :href="item.href" class="underlined">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
      <div class="contact">
        <h2>Contact informations</h2>
        <div class="phone">
          <p>Call at:</p>
          <a href="tel:+381642848080" class="underlined">+381642848080</a>
        </div>
        <div class="email">
          <p>Mail to:</p>
          <a href="mailto:zarko.stankovic@gmail.com" class="underlined">zarko.stankovic@gmail.com</a>
        </div>
      </div>
      <div class="right-footer-section">
        <div class="newsletter">
          <h2>Newsletter</h2>
          <form @submit.prevent>
            <input
              type="email"
              id="newsletter-email"
              v-model="newsletterEmail"
              class="newsletter-email"
              placeholder="Enter your email"
            />
            <label for="newsletter-email" class="newsletter-label">email</label>
          </form>
        </div>
        <div class="social-media">
          <h2>Social networks</h2>
          <a href="#"><img src="/images/serbia_icon.png" alt="Social media" /></a>
          <a href="#"><img src="/images/serbia_icon.png" alt="Social media" /></a>
        </div>
      </div>
    </div>
    <p class="copyright">Copyright by шашави озбиљнџија &copy; 2023</p>
  </footer>
</template>

<style scoped>
#contact {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 3em 5em;
}

#contact h2 {
  margin-bottom: 0.8em;
  border-bottom: 2px solid black;
  padding: 0 1em;
  text-align: center;
}

.footer-navbar ul li {
  text-align: center;
  padding: 0.1em;
}

.phone,
.email {
  display: flex;
  justify-content: start;
  align-items: center;
}

.phone p,
.email p {
  font-weight: 600;
}

.newsletter {
  margin-bottom: 2em;
}

.newsletter form {
  text-align: center;
  width: 120%;
  height: 100%;
  position: relative;
  display: flex;
}

.newsletter input[type="email"] {
  width: 100%;
  background: transparent;
  border: 2px solid black;
  border-radius: 10px;
  outline: none;
  padding: 0.5em 0.8em;
  font-size: 18px;
}

.newsletter label {
  display: none;
  position: absolute;
  top: -0.8em;
  left: 1em;
  background: transparent;
  text-transform: capitalize;
  font-size: 18px;
  padding: 0 0.3em;
}

.newsletter input[type="email"]:is(:focus) ~ label {
  display: block;
  background: white;
  animation-name: upAndDown;
  animation-duration: 0.5s;
}

@keyframes upAndDown {
  0% {
    left: 1em;
  }
  50% {
    left: 3.5em;
  }
  100% {
    left: 1em;
  }
}

.newsletter input[type="email"]:focus::placeholder {
  color: transparent;
}

.newsletter button {
  border: none;
  background: transparent;
}

.social-media {
  text-align: center;
}

.social-media img {
  width: 32px;
  height: 24px;
  margin: 0 0.5em;
}

.copyright {
  background: black;
  text-align: center;
  color: white;
}
</style>
