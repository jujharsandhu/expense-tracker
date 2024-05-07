import { dayjs } from '@/lib/index'

export const parseData = (row, key) => {
  if (key === 'date') {
    return dayjs(row[key]).format('YYYY / MMM / D')
  } else if (key === 'currency' && row[key].length > 3) {
    const str = row[key]
    const strLength = str.length
    const abbreviation = str.slice(strLength - 4, strLength - 1)
    return abbreviation
  } else {
    return row[key]
  }
}
