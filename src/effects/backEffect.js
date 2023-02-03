// 点击回退逻辑
import {useRouter} from "vue-router";

export const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return {handleBackClick}
}
