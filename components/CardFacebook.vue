<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();
const announcement = computed(() => firstMessage.value?.content);

const { chat, state, firstMessage } = useChatAi({ agent: "facebook" });

const generate = () => nextTick(() => chat(props));
defineExpose({
  generate,
});

const postURL = computed(
  () =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      props.url
    )}`
);

const { copy } = useClipboard();
const post = () => {
  copy(announcement.value || "");
  setTimeout(() => window.open(postURL.value, "_blank"), 500);
};
</script>
<template>
  <CardGeneric title="Facebook" :state="state" :body="announcement">
    <div class="w-full text-left text-xs pt-2">
      Character Count:
      <strong>{{ announcement?.length }}</strong>
    </div>
    <div class="flex w-full justify-end items-center ">
      <button class="btn btn-neutral mr-2" @click="generate()">Regenerate</button>
      <a class="btn btn-primary" :href="postURL" @click.prevent="post">
        Copy and Post
      </a>
    </div>



  </CardGeneric>
</template>
