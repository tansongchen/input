import { darkTheme, lightTheme } from "naive-ui";
import { useBreakpoint } from "vooks";
import { computed, ref } from "vue";

export interface 候选 {
  text: string;
  comment: string;
}

export interface 候选框状态 {
  buffer: string;
  prompt: string;
  unused: string;
  candidates: 候选[];
  selectedIndex: number;
}

export const theme = ref(darkTheme);

export const sync = () => {
	theme.value = document.documentElement.className.split(" ").includes("dark")
		? darkTheme
		: lightTheme;
	setTimeout(sync, 100);
};

const breakpoint = useBreakpoint();
export const isMobile = computed(() => breakpoint.value === "xs");
