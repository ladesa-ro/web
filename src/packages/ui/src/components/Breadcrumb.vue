<script setup lang="ts">
import IconArrowArrowAlt from '../icons/Arrow/ArrowAlt.vue';
import Title from './Title.vue';

export type BreadcrumbEntry = { title: string; to?: string };

export type BreadcrumbProps = {
  segments: BreadcrumbEntry[];
  showGoBack?: boolean;
  as?: string | object;
};

const { showGoBack = false, as = 'a' } = defineProps<BreadcrumbProps>();

defineEmits<{
  'go-back': [];
}>();
</script>

<template>
  <div v-if="segments.length > 0" class="ui-breadcrumb">
    <button
      v-if="showGoBack"
      type="button"
      class="ui-breadcrumb__go-back"
      @click="$emit('go-back')"
    >
      <IconArrowArrowAlt class="ui-breadcrumb__go-back-icon" />
    </button>

    <Title class="ui-breadcrumb__title">
      <nav class="ui-breadcrumb__nav">
        <template v-for="(entry, index) in segments" :key="index">
          <span v-if="index > 0" class="ui-breadcrumb__separator">/</span>
          <component
            :is="as"
            v-if="entry.to && index < segments.length - 1"
            :to="entry.to"
            class="ui-breadcrumb__entry ui-breadcrumb__entry--parent"
          >
            {{ entry.title }}
          </component>
          <span
            v-else
            class="ui-breadcrumb__entry"
            :class="{
              'ui-breadcrumb__entry--parent': index < segments.length - 1,
            }"
          >
            {{ entry.title }}
          </span>
        </template>
      </nav>
    </Title>

    <slot />
  </div>
</template>
