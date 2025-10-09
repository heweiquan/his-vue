<template>
    <div>
        index
        <h3>{{ msg }}</h3>
        <p>
            <el-button type="primary" @click="changeMsg">Primary</el-button>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
let msg: Ref<string> = ref('HelloWorld');

const changeMsg = () => {
    msg.value = '你好世界';
};
</script>

<style></style>
