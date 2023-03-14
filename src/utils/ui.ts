// import { ref } from 'vue';
// import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { siteTitleInFull } from '@/config/strings'


const store = useAppStore();

export function updateTitle(value: string) {
  // let { title } = storeToRefs(store);
  // title = ref(value); // 直接更新值
  // 或者直接update方法
  store.updateTitle(value)
  // 拼接两部分标题
  document.title = `${value} | ${siteTitleInFull}`
}
