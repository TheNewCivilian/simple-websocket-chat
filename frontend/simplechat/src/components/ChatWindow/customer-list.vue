<template>
  <div class="customers">
    <span class="customers__title">
      Customers:
    </span>
    <div class="customers__empty" v-if="customers.length == 0">
      <span>No Customers online!</span>
    </div>
    <div v-else class="customer__list">
      <div
        class="customer__card"
        v-for="(customer, index) in customers"
        :key="`customer-${index}`"
        @click="selectCustomer(customer.userId)"
        :class="customer.selected_by.find(
          (adminId) => adminId != userId) ? 'customer__card--selected' : ''
        "
      >
        <div class="customer__profile">
          <div
            class="customer__profile__circle"
            :class="customer.userId == selectedUser
              ? 'customer__profile__circle--active'
              : ''"
          />
        </div>
        <span class="customer__name">{{customer.userName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import WS from '@/ws';

export default {
  computed: {
    customers() {
      return this.$store.getters.users.filter((user) => user.userId !== this.userId);
    },
    userId() {
      return this.$store.getters.userId;
    },
    selectedUser() {
      return this.$store.getters.selectedUser;
    },
  },
  methods: {
    selectCustomer(customerId) {
      WS.sendSelect(this.$socket, customerId);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/defaults.scss";
  .customers {
    &__title {
      font-size: 20px;
      color: $c_grey;
    }
  }

  .customer {
    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      width: 100%;
    }

    &__card {
      @extend.row;
      justify-content: left;
      width: fit-content;
      padding: $sp_sm;
      box-shadow: $bs_md;
      border-radius: $br_md;

      &--selected {
        box-shadow: $bs_lt;

        .customer__name {
          color: $c_grey;
        }
      }
    }

    &__name {
      padding-left: 20px;
    }

     &__profile {
      box-shadow: $bs_md;
      border-radius: 50%;
      padding: $sp_sm;

      &__circle {
        height: $sp_md;
        width: $sp_md;
        border-radius: 50%;
        background-color: $c_green;

        &--active {
          background-color: $c_red;
        }
      }
    }
  }
</style>
