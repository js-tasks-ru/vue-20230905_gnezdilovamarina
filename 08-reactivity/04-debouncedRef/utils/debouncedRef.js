import { ref, watch, watchEffect } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  const debounced = ref(undefined);
  debounced.value = source.value;
  const Deb = debounce((valueSource, debounceValue) => {
    debounceValue.value = valueSource.value;
  }, wait);
  watch(
    source,
    () => {
      Deb(source, debounced);
    },
    {
      immediate: true,
    },
  );

  return debounced;
}
