<script setup lang="ts">
import type { Agent } from "~/agents";
import {Ref} from "@vue/reactivity";

const form = ref({
  url: '',
  temperature: 1,
});

const selectedSocials = ref<Agent[]>(['twitter'])

const socialRefs = {
  twitter: ref(),
  facebook: ref(),
}

async function handleImport(e: typeof form.value) {
  form.value = { ...e };
  if (!form.value.url || selectedSocials.value.length === 0) return;

  selectedSocials.value.forEach(social => socialRefs[social].value.generate());
}

</script>
<template>
  <h1 class="text-4xl my-10">Social Media Post Generator</h1>
  <UrlForm v-bind="form" @submit="handleImport"></UrlForm>
  <div class="flex gap-x-4 pb-2">
    <div class="form-control" v-for="(_, name) in socialRefs" :key="name">
      <label class="cursor-pointer label gap-x-2">
        <span class="label-text">{{ name }}</span>
        <input type="checkbox" :value="name" class="checkbox checkbox-success" v-model="selectedSocials" />
      </label>
    </div>
  </div>
  <div v-auto-animate>
    <CardTwitter :ref="socialRefs.twitter" v-bind="form" v-if="selectedSocials.includes('twitter')" key="twitter"/>
    <CardFacebook :ref="socialRefs.facebook" v-bind="form" v-if="selectedSocials.includes('facebook')" key="facebook"/>
  </div>
</template>
