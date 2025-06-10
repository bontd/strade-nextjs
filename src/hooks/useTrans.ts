import { useRouter } from 'next/router'
import en from '../app/[lang]/dictionaries/en.json'
import vi from '../app/[lang]/dictionaries/vi.json'

const useTrans = () => {
  const { locale } = useRouter()

  const trans = locale === 'vi' ? vi : en

  return trans
}

export default useTrans
