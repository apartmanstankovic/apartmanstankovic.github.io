<script setup>
import DatePicker from './DatePicker.vue'
</script>

<template>
  <div id="reservation">
    <h1>Reservation</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur eius
      placeat magnam nulla velit voluptatem possimus alias, delectus ducimus
      distinctio asperiores voluptas atque quidem vitae beatae! Reiciendis
      dicta eos nesciunt eum iure excepturi mollitia adipisci! Nemo modi, id
      similique natus eum soluta facilis consequatur quo iure tempora sunt
      voluptate hic ut, delectus corporis laudantium officia? Eum ipsum
      voluptatum mollitia enim distinctio autem! Praesentium blanditiis
      necessitatibus assumenda iure est unde accusamus libero voluptatum
      obcaecati temporibus veritatis facere, quibusdam iste ea quia ad autem
      non eveniet incidunt dolorum aut! Perspiciatis adipisci recusandae fuga
      amet temporibus numquam, expedita obcaecati mollitia velit esse natus.
    </p>
    <DatePicker />
  </div>
</template>

<style scoped>
#reservation {
  width: 100%;
  min-height: 100vh;
  padding: 30px 50px;
  text-align: center;
}

#reservation h1 {
  font-size: 60px;
}

#reservation p {
  margin-bottom: 2em;
}
</style>
