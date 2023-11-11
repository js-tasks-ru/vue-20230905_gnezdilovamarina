import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  
  const history = ref();
  let i = 0;
  let array = [];

  watch(
    source,
    (newValue, oldValue) => {
      array[i] = newValue;
      i++;
      history.value = array;
    },
    {
      immediate:true,
      flush: 'sync'
    }
  )
  // ...
  return { history };
}
