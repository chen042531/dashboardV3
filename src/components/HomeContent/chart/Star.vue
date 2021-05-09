<template>
    <div id="star_container"></div>
</template>

<script>
export default {
    props:['star'],
    mounted : function () {
       
            
            // var t = this;
            // var n_star = Math.floor(t.star);
            // console.log("pppppppppppppppppppp",t.star);
            // for (var star_n = 1; star_n <= n_star; star_n++) {
            // // $("#star" + star_n).addClass("checked");
            // // console.log('start');
            // // console.log("ssss",$("#star_container"));
            // $("#star_container").append('<span class="star fa fa-star  fa-4x checked"  ></span>');
            // }
            // if (n_star != t.avg_score) {
            // $("#star_container").append('<span class="star fa fa-star-half-o  fa-4x checked"  ></span>');
            // }
            // for (var j = 0; j <= (t.avg_score - n_star); j++) {
            // // $("#star" + star_n).addClass("checked");
            // $("#star_container").append('<span class="star fa fa-star-o  fa-4x checked" ></span>');
            // }
    },
    watch: { 
        star_score: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            
            var t = this;
            console.log("pppppppppppppppppppp",t.star);
            var n_star = Math.floor(t.star);
            for (var star_n = 1; star_n <= n_star; star_n++) {
            // $("#star" + star_n).addClass("checked");
            console.log('start');
            console.log("ssss",$("#star_container"));
            $("#star_container").append('<span class="star fa fa-star  fa-4x checked"  ></span>');
            }
            if (n_star != t.avg_score) {
            $("#star_container").append('<span class="star fa fa-star-half-o  fa-4x checked"  ></span>');
            }
            for (var j = 0; j <= (t.avg_score - n_star); j++) {
            // $("#star" + star_n).addClass("checked");
            $("#star_container").append('<span class="star fa fa-star-o  fa-4x checked" ></span>');
            }
        }

       
    }
}
</script>

