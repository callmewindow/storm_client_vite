// @ts-check

import { useAppStore } from '@/store/app'
import { siteTitle } from '@/config/strings'

const appStore = useAppStore()

function displaySnackbarWith(content: string, color: string) {
  appStore.updateSnackbar({content, color});
}

const Snackbar = {
  emitsError: (content: string) => {
    displaySnackbarWith(content, 'error')
  },
  emitsWarning: (content: string) => {
    displaySnackbarWith(content, 'warning')
  },
  emitsSuccess: (content: string) => {
    displaySnackbarWith(content, 'success')
  },
  emitsInfo: (content: string) => {
    displaySnackbarWith(content, 'info')
  },
  collapse: () => {
    appStore.updateSnackbar(null)
  },
  showInfoAboutUnderDevelopment: () => {
    Snackbar.emitsInfo(
      `客官，小的帮您问了，${siteTitle}的开发小哥们说他们正在很努力地开发此功能。您再等等吧。`,
    )
  },
}

export default Snackbar
