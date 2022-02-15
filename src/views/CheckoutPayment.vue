<template>
  <form type="submit" >
    姓名:<input type="text" v-model="buyerProfile.name" />
    手機電話:<input type="text" v-model="buyerProfile.cellphone" />
    家用電話:<input type="text" v-model="buyerProfile.housephone" />
    住址:<input type="text" v-model="buyerProfile.address" />
    備註:<textarea type="text" v-model="buyerProfile.memo" >
    </textarea>
    <button type="button" @submit.prevent="ensureCheckout()" value="送出"></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      buyerProfile: {
        name: '',
        cellPhone: '',
        housePhone: '',
        address: '',
        memo: '',
      },
    };
    // ensureCheckout(){

    // }
  },
  methods: {},
};
</script>
