import { PartialOptional, ReturnElementType } from './utils'

// 练习一下类型体操
export type categoryType = ReturnElementType<typeof alphaTypes> &
  PartialOptional<ReturnElementType<typeof categoryTypes>, 'type' | 'area'>
// 等价于
// export type categoryType = {
//   name: string
//   key: string
//   type?: string
//   area?: string
// }

// 歌手种类
export const categoryTypes = [
  {
    name: '华语男',
    key: '1001',
    type: '1',
    area: '7',
  },
  {
    name: '华语女',
    key: '1002',
    type: '2',
    area: '7',
  },
  {
    name: '华语组合',
    key: '1003',
    type: '3',
    area: '7',
  },
  {
    name: '欧美男',
    key: '2001',
    type: '1',
    area: '96',
  },
  {
    name: '欧美女',
    key: '2002',
    type: '2',
    area: '96',
  },
  {
    name: '欧美组合',
    key: '2003',
    type: '3',
    area: '96',
  },
  {
    name: '日本男',
    key: '6001',
    type: '1',
    area: '8',
  },
  {
    name: '日本女',
    key: '6002',
    type: '2',
    area: '8',
  },
  {
    name: '日本组合',
    key: '6003',
    type: '3',
    area: '8',
  },
  {
    name: '韩国男',
    key: '7001',
    type: '1',
    area: '16',
  },
  {
    name: '韩国女',
    key: '7002',
    type: '2',
    area: '16',
  },
  {
    name: '韩国组合',
    key: '7003',
    type: '3',
    area: '16',
  },
  {
    name: '其他男歌手',
    key: '4001',
    type: '1',
    area: '0',
  },
  {
    name: '其他女歌手',
    key: '4002',
    type: '2',
    area: '0',
  },
  {
    name: '其他组合',
    key: '4003',
    type: '3',
    area: '0',
  },
]

// 歌手首字母
export const alphaTypes = [
  {
    key: 'A',
    name: 'A',
  },
  {
    key: 'B',
    name: 'B',
  },
  {
    key: 'C',
    name: 'C',
  },
  {
    key: 'D',
    name: 'D',
  },
  {
    key: 'E',
    name: 'E',
  },
  {
    key: 'F',
    name: 'F',
  },
  {
    key: 'G',
    name: 'G',
  },
  {
    key: 'H',
    name: 'H',
  },
  {
    key: 'I',
    name: 'I',
  },
  {
    key: 'J',
    name: 'J',
  },
  {
    key: 'K',
    name: 'K',
  },
  {
    key: 'L',
    name: 'L',
  },
  {
    key: 'M',
    name: 'M',
  },
  {
    key: 'N',
    name: 'N',
  },
  {
    key: 'O',
    name: 'O',
  },
  {
    key: 'P',
    name: 'P',
  },
  {
    key: 'Q',
    name: 'Q',
  },
  {
    key: 'R',
    name: 'R',
  },
  {
    key: 'S',
    name: 'S',
  },
  {
    key: 'T',
    name: 'T',
  },
  {
    key: 'U',
    name: 'U',
  },
  {
    key: 'V',
    name: 'V',
  },
  {
    key: 'W',
    name: 'W',
  },
  {
    key: 'X',
    name: 'X',
  },
  {
    key: 'Y',
    name: 'Y',
  },
  {
    key: 'Z',
    name: 'Z',
  },
]

export const RankTypes: Record<string, string> = {
  '0': '飙升榜',
  '1': '新歌榜',
  '2': '原创榜',
  '3': '热歌榜',
  '4': '黑胶VIP爱听榜',
  '5': '云音乐说唱榜',
  '6': '云音乐古典榜',
  '7': '云音乐电音榜',
  '8': '云音乐ACG榜',
  '9': '云音乐韩语榜',
  '10': '云音乐国电榜',
  '11': 'UK排行榜周榜',
  '12': '美国Billboard榜',
  '13': 'Beatport全球电子舞曲榜',
  '14': 'KTV唛榜',
  '15': '日本Oricon榜',
  '16': '云音乐欧美热歌榜',
  '17': '云音乐欧美新歌榜',
  '18': '法国 NRJ Vos Hits 周榜',
  '19': '云音乐ACG动画榜',
  '20': '云音乐ACG游戏榜',
  '21': '云音乐ACG VOCALOID榜',
  '22': '中国新乡村音乐排行榜',
  '23': '云音乐日语榜',
  '24': '云音乐摇滚榜',
  '25': '云音乐古风榜',
  '26': '潜力爆款榜',
  '27': '云音乐民谣榜',
  '28': '听歌识曲榜',
  '29': '网络热歌榜',
  '30': '俄语榜',
  '31': '越南语榜',
  '32': '中文DJ榜',
  '33': '俄罗斯top hit流行音乐榜',
}
