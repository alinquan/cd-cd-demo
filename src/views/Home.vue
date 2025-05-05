<template>
    <div class="home">
        <div ref="nameDom">
            姓名111<input type="text" v-model="data.name" />
            {{ data.name }}
        </div>
        <div>
            年龄<input type="text" v-model="data.obj.age" />
            {{ data.obj.age }}
        </div>
        <img alt="Vue logo" src="../assets/logo.png" />
        <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

/* 
new Promise((resolve, reject) => {

})
new Promise((a,b) => {
    console.log(1);
}); */

function logClass(params: string) {
    return function (target: any) {
        target.prototype.apiUrl = "xxx";
    };
    // params.prototype.apiUrl = "XXX";
}
/*  function logClass(params: any) {
            // console.log(params, 11);
            // params.prototype.apiUrl = "XXX";
        } */

@logClass("hello")
class httpClient {
    constructor() {
        // console.log(2);
    }
    getData() {
        // console.log(1);
    }
}

const son = new httpClient();

export default defineComponent({
    name: "Home",
    components: {
        // HelloWorld,
    },
    setup() {
        let nameDom = ref(null);
        const data = reactive({
            name: "名称",
            obj: {
                age: 20,
            },
        });

        onMounted(() => {
            // if (nameDom.value) {
            //     console.log(nameDom.value);
            //     // return
            //     // nameDom.value.style.height = '50px'
            // }
        });

        // const name = ref('名称')
        return {
            data,
            nameDom,
        };
    },
});
</script>
