<script lang="ts" setup>
import { nextTick, useTemplateRef } from 'vue';

export type DialogSkeletonProps = {
  disabled?: boolean;
  disableInlineBlock?: boolean;
  pointerdownEvent?: boolean;
  closeOnClickOutside?: boolean;
  mustHideInBigScreen?: boolean;
};

const isActive = defineModel<boolean>({ default: false });

const {
  disableInlineBlock = false,
  pointerdownEvent = false,
  disabled = false,
  closeOnClickOutside = true,
} = defineProps<DialogSkeletonProps>();

const modal = useTemplateRef('modal');

const onOpen = async () => {
  isActive.value = true;

  await nextTick();

  if (modal.value) modal.value.focus();
};

const onClose = () => (isActive.value = false);
</script>

<template>
  <nav
    :class="!disableInlineBlock && 'ui-dialog-skeleton__activator--inline'"
    v-bind="$attrs"
    @pointerdown="!disabled && pointerdownEvent && onOpen()"
    @click="!disabled && !pointerdownEvent && onOpen()"
  >
    <slot name="activator" />
  </nav>

  <Transition name="ui-dialog-skeleton">
    <Teleport to="body">
      <section
        v-if="isActive"
        :class="
          mustHideInBigScreen
            ? 'ui-dialog-skeleton__overlay--hide-big-screen'
            : 'ui-dialog-skeleton__overlay'
        "
      >
        <div
          class="ui-dialog-skeleton__backdrop"
          @click="() => closeOnClickOutside && onClose()"
        />

        <div
          ref="modal"
          class="ui-dialog-skeleton__modal"
          tabindex="0"
          @keyup.esc="onClose"
        >
          <slot />
        </div>
      </section>
    </Teleport>
  </Transition>
</template>
