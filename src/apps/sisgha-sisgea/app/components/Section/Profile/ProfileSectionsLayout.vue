<script lang="ts" setup>
import {
  ProfileSectionsLayout,
  type ProfileSectionsLayoutProps,
} from '@ladesa-ro/web.ui';

defineProps<ProfileSectionsLayoutProps>();
</script>

<template>
  <ProfileSectionsLayout v-bind="$props">
    <slot />
  </ProfileSectionsLayout>
</template>
