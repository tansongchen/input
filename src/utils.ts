import { computed, ref } from "vue";
import { useBreakpoint } from "vooks";
import { darkTheme, lightTheme } from "naive-ui";

export const theme = ref(darkTheme);

export const sync = () => {
  theme.value = document.documentElement.className.split(" ").includes("dark")
    ? darkTheme
    : lightTheme;
  setTimeout(sync, 100);
}

const breakpoint = useBreakpoint();
export const isMobile = computed(() => breakpoint.value === "xs");
