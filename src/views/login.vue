<template>
    <div>登录</div>
    {{ data.title }}
    <br />
    {{ newTitle }}
    <br />
    {{ num }} <el-button type="primary" @click="num = 20">修改num</el-button>
    <div>
        <el-button type="primary" @click="titleChange">修改title</el-button>
    </div>
</template>
<script lang="ts" >
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

interface dataFormat {
    title: string;
}

export default defineComponent({
    setup() {
        const data = reactive<dataFormat>({
            title: "登录页",
        });
        const titleChange = () => {
            data.title = "修改title";
            // data.title = 1;
            console.log(data.title);
        };

        let newTitle = computed(() => {
            return data.title + "-----";
        });

        onMounted(() => {
            //
        });

        return {
            data,
            newTitle,
            titleChange,
        };
        //
    },
});
</script>
