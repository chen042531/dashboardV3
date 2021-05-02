<template>
  <div>
    <h1>before</h1>
  </div> 
</template>

<script>
export default {
  props:['charityId','username'],
  data () {
    return {
      active_list:  [],
      expired_list: [],
    }
  },
  created : function () {
    let t = this;
    $.post(
      "http://140.113.216.53:8000/getStatisticAndApplicantsTime/",
      { charityID: this.charityId },
      function (getStatisticAndApplicantsTime_data) {
        console.log(getStatisticAndApplicantsTime_data);
         t.active_list = getStatisticAndApplicantsTime_data.active_list;
         t.expired_list = ggetStatisticAndApplicantsTime_data.expired_list;
      }
    );
       
  },
  methods: {
    login(){}
  }
}
</script>

<style>


</style>