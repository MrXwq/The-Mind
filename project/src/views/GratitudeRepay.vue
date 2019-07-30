<template>
    <div id="gratitude">
        报恩
    </div>
</template>
<style lang="scss">
    #gratitude {
        width: 300px;
        height: 300px;
        background: red;
    }
    #gratitude::after {
        content: '';
        position: absolute;
        width: 300px;
        height: 300px;
        background: blue;
    }
</style>
