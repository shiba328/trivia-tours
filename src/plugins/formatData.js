import { format, differenceInDays, subDays } from 'date-fns'
import ja from 'date-fns/locale/ja'

export default ({ app }, inject) => {
  inject('formatDate', (date = new Date(), formatStr) => {
    return format(date, formatStr, { locale: ja })
  })
  inject('subDays', (date = new Date(), amount) => {
    return subDays(date, amount, { locale: ja })
  })
  inject('diffDate', (startDate = new Date(), endDate = new Date()) => {
    return differenceInDays(startDate, endDate, { locale: ja })
  })
}
