<template>
    <div class="min-h-screen h-dvh flex items-center justify-center bg-background">
   
    <SignIn 
    signUpUrl="/register"
    />
     </div>
</template>

<script setup>
import { SignIn } from '@clerk/vue'

</script>