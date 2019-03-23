<template>
  <div>
    <div v-if="reservationStatus">
      <div class="subtitle has-text-danger" v-if="errorMessage">{{ errorMessage }}</div>
      <button class="button is-danger" v-on:click="stopReservation">Stop reservation</button>
      <p>
        fuel_level - {{ reservationStatus.fuel_level }}
        <br>
        id - {{ reservationStatus.id }}
        <br>
        asset_id - {{ reservationStatus.asset_id }}
        <br>
        trip_start_countdown - {{ reservationStatus.trip_start_countdown }}
        <br>
        trip_active_timer - {{ reservationStatus.trip_active_timer }}
        <br>
        reservation_status - {{ reservationStatus.reservation_status }}
        <br>
        make - {{ reservationStatus.make }}
        <br>
        model - {{ reservationStatus.model }}
        <br>
        number_plate - {{ reservationStatus.number_plate }}
        <br>
        picture - {{ reservationStatus.picture }}
        <br>
        price_time - {{ reservationStatus.price_time }}
        <br>
        price_distance - {{ reservationStatus.price_distance }}
        <br>
        price_total - {{ reservationStatus.price_total }}
        <br>
        lat - {{ reservationStatus.lat }}
        <br>
        long - {{ reservationStatus.long }}
        <br>
        is_electric - {{ reservationStatus.is_electric }}
        <br>
        is_cargo - {{ reservationStatus.is_cargo }}
        <br>
        asset_type - {{ reservationStatus.asset_type }}
        <br>
        start_address - {{ reservationStatus.start_address }}
      </p>
    </div>
    <div v-else>
      <p>No reservation is active.</p>
    </div>
  </div>
</template>

<script lang="ts">
import MyReservation from './MyReservation';
export default MyReservation;
</script>
