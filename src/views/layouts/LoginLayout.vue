<template>
    <div class="login-layout">
        <div class="meta">
            <img src="@/assets/logo.svg" alt="logo" class="logo">
            <h1>钱脉</h1>
            <div>人脉就是钱脉</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.login-layout {
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.meta {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.meta h1 {
    font-size: 1rem;
    margin: 0;
    letter-spacing: 3px;
}
.meta > div {
    font-size: 0.8rem;
    color: var(--van-text-color-2)
}
.logo {
    width: 100px;
    height: 100px;
}

:deep(.van-field__button:nth-child(2)) {
    height: 24px;
    line-height: 0;
}
.login-layout :deep(form) {
    width: 100%;
}
.login-layout :deep(form > div) {
    margin-top: var(--van-padding-md);
}
.login-layout :deep(.submit) {
    padding: 0 var(--van-padding-md);
}
.login-layout :deep(.actions) {
    display: flex;
    padding: 0 var(--van-padding-md);
    justify-content: space-between;
}
/* .login-layout :deep(.actions.right) {
} */

.login-layout :deep(.actions > a) {
    color: var(--van-text-color-2);
    font-size: var(--van-font-size-sm);
}
</style>