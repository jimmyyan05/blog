import { parseISO, format } from "date-fns";
// fns意思是functions

export function formatDate(dateString) {
  // dateString 是符合 ISO 8601 的字串，例如 "2025-03-25"
  // 所以我用 parseISO() 把它轉成 JavaScript 的 Date 物件
  // ISO 8601 是一種國際標準的日期格式，例如：YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss.sssZ
  const date = parseISO(dateString);

  // format 的第一個參數必須是 Date 物件，這樣才能正確格式化
  return format(date, "LLLL d, yyyy");
}
