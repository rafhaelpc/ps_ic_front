<template>
  <div class="text-section">
    <component :is="tag" class="text-section-container">
      <span class="text-section-content">
        <slot />
      </span>
    </component>
  </div>
</template>

<script>
export default {
  name: 'TextSection',
  props: {
    tag: {
      type: String,
      default: 'h4'
    }
  }
};
</script>
