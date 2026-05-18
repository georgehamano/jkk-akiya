export const TOKYO_23_WARDS = [
  '千代田区', '中央区', '港区', '新宿区', '文京区', '台東区',
  '墨田区', '江東区', '品川区', '目黒区', '大田区', '世田谷区',
  '渋谷区', '中野区', '杉並区', '豊島区', '北区', '荒川区',
  '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区',
] as const

export const TAMA_CITIES = [
  '八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市',
  '昭島市', '調布市', '町田市', '小金井市', '小平市', '日野市',
  '東村山市', '国分寺市', '国立市', '福生市', '狛江市', '東大和市',
  '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市',
  'あきる野市', '西東京市',
] as const

export const ALL_AREAS = [...TOKYO_23_WARDS, ...TAMA_CITIES] as const

export type Area = (typeof ALL_AREAS)[number]

export function isValidArea(s: string): s is Area {
  return (ALL_AREAS as readonly string[]).includes(s)
}
