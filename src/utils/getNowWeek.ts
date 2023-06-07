import dayjs from 'dayjs'
// 这个函数获取当前一周的日期数组
interface IWeekData {
  week: string
  date: string
}
export default function getWeekList(date: string) {
  const arr: IWeekData[] = [
    {
      week: '一',
      date: ''
    },
    {
      week: '二',
      date: ''
    },
    {
      week: '三',
      date: ''
    },
    {
      week: '四',
      date: ''
    },
    {
      week: '五',
      date: ''
    },
    {
      week: '六',
      date: ''
    },
    {
      week: '日',
      date: '',
    },
  ]
  arr.forEach((item, index) => {
    // 本地化
    if (index === 6) {
      let temp = +dayjs(date).startOf('week').add(index, 'day')
      item.date = dayjs(temp + 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
      return arr
    }
    item.date = dayjs(date).startOf('week').add(index + 1, 'day').format('YYYY-MM-DD')
  })
  return arr
}