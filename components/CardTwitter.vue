<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();
const announcement = computed(() => firstMessage.value?.content);

const { chat, state, firstMessage } = useChatAi({ agent: "twitter" });

const generate = () => nextTick(() => chat(props));
defineExpose({
  generate,
});

const postURL = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      announcement.value || ""
    )}`
);
</script>
<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="announcement"
    class="mb-10"
  >
    <div class="w-full text-left text-xs pt-2">
      Character Count:
      <strong>{{ announcement?.length }}</strong>
    </div>
    <div class="flex w-full justify-end items-center ">
      <div>
        <button class="btn btn-neutral mr-2" @click="generate()">
          Regenerate
        </button>
        <a class="btn btn-primary" target="_blank" :href="postURL">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
