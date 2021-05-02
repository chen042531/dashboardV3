<template>
  <div>
    <h1>sd</h1>
    <p>{{userID}}</p>
  </div>
</template>
<script>
export default {
  props:['userID'],
  data () {
    return {
      phoneNumber: '',
      passWord: '',
    }
  },
  methods: {
    login(){}
  }
}
</script>