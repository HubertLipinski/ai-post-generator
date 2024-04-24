<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();
defineEmits(["submit"]);
const form = reactive({
  url: props.url,
  temperature: props.temperature,
});
</script>
<template>
  <form @submit.prevent="$emit('submit', form)">
    <div class="flex flex-col md:flex-row gap-y-1 md:gap-y-4">
      <input
        placeholder="Full Article URL"
        v-model="form.url"
        class="input input-bordered w-full max-w-full md:rounded-r-none"
        type="text"
      />
      <button class="btn md:rounded-l-none">Generate</button>
    </div>
    <TemperatureSelector v-model="form.temperature"/>
  </form>
</template>
