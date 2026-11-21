<script setup lang="ts">
const props = defineProps<{ product: { stem?: string; path: string; status: 'in_stock' | 'out_of_stock'; checkoutUrl: string; price: number } ; size?: 'md' | 'lg' }>()
const slug = computed(() => props.product.path.split('/').pop()!)
const cta = computed(() => productCta({ slug: slug.value, status: props.product.status, checkoutUrl: props.product.checkoutUrl }))
</script>

<template>
  <UiButton v-if="cta.kind === 'buy'" :to="cta.href" :size="size ?? 'lg'">
    <Icon name="lucide:shopping-cart" class="size-5" aria-hidden="true" />
    Satın Al · ${{ product.price }}
  </UiButton>
  <UiButton v-else :to="cta.href" :size="size ?? 'lg'" variant="secondary">
    <Icon name="lucide:bell" class="size-5" aria-hidden="true" />
    Stokta yok – iletişime geç
  </UiButton>
</template>
