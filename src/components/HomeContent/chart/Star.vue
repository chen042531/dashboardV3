<template>
    <div>
        <div  v-if="s=='s_0_5'">
            <span class="star fa fa-star-half-o fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_1'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_1_5'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star-half-o fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_2'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_2_5'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star-half-o fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_3'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_3_5'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star-half-o fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_4'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_4_5'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star-half-o fa-4x check_star"  style="color: orange;"></span>
        </div>
        <div v-if="s=='s_5'" >
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
            <span class="star fa fa-star fa-4x check_star"  style="color: orange;"></span>
        </div>
    </div>
    
</template>

<script>
export default {
    props:['star'],
    data () {
    return {
      s:"s_0_5"
    }
  },
    mounted : function () {
       
            
            var t = this;
            var n_star = Math.floor(t.star);
            console.log("pppppppppppppppppppp",t.star);
            switch (t.star) {
            case 0.5:
                t.s="s_0_5"
                break;
            case 1:
                t.s="s_1"
                break;
            case 1.5:
                t.s="s_1_5"
                break;
            case 2:
                t.s="s_2"
                break;
            case 2.5:
                t.s="s_2_5"
                break;
            case 3:
                console.log("gggg", t.star)
                t.s="s_3"
                break; 
            case 3.5:
                t.s="s_3_5"
                break;
            case 4:
                t.s="s_4"
                break;
            case 4.5:
                t.s="s_4_5"
                break;
            case 5:
                t.s="s_5"
                break;                   
            default:
                t.s = ""
            }
            
    },
    watch: { 
        star: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            
            var t = this;
            console.log("pppppppppppppppppppp",t.star);
            var n_star = Math.floor(t.star);
            switch (t.star) {
            case 0.5:
                t.s="s_0_5"
                break;
            case 1:
                t.s="s_1"
                break;
            case 1.5:
                t.s="s_1_5"
                break;
            case 2:
                t.s="s_2"
                break;
            case 2.5:
                t.s="s_2_5"
                break;
            case 3:
                console.log("gggg", t.star)
                t.s="s_3"
                break; 
            case 3.5:
                t.s="s_3_5"
                break;
            case 4:
                t.s="s_4"
                break;
            case 4.5:
                t.s="s_4_5"
                break;
            case 5:
                t.s="s_5"
                break;                   
            default:
                t.s = ""
            }
        }

       
    }
}
</script>

<style>
.checked {
  color: orange;
}

</style>