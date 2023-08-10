import { ref, computed } from "vue";
import { format } from "date-fns";

export default function useDateFormat(initialDate) {
  const date = ref(initialDate);

  const formattedDate = computed(() => {
    if (date.value) {
      return format(date.value, "dd-MM-yyyy");
    }
    return "";
  });

  return {
    date,
    formattedDate,
  };
}
