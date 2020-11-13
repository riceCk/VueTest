export class tools {
  /**
   * 创建唯一的字符串
   * @return {string} ojgdvbvaua40
   */
  static createUniqueString () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }

  // elementui日期时间范围 快捷选项
  static pickerOptionsRange = {
    shortcuts: [
      {
        text: '今天',
        onClick (picker) {
          const end = new Date()
          const start = new Date(new Date().toDateString())
          start.setTime(start.getTime())
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  }

  // elementui月份范围 快捷选项
  static pickerOptionsRangeMonth = {
    shortcuts: [
      {
        text: '今年至今',
        onClick (picker) {
          const end = new Date()
          const start = new Date(new Date().getFullYear(), 0)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近半年',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setMonth(start.getMonth() - 6)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一年',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setMonth(start.getMonth() - 12)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  }

  // {a: 123, b:{c:222｝}
  // b.c
  static getVal (val, name) {
    let array = name.split(".");
    let newVal = {...val};
    array.forEach((item) => {
      newVal = newVal[item];
    });
    return newVal;
  }

  /**
   * 对象的反扁平化
   * @param data
   * @return {*}
   */
  static unFlatten (data) {
    if (Object(data) !== data || Array.isArray(data))
      return data;
    let result = {}, cur, prop, idx, last, temp;
    for (let p in data) {
      cur = result, prop = "", last = 0;
      do {
        idx = p.indexOf(".", last);
        temp = p.substring(last, idx !== -1 ? idx : undefined);
        cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
        prop = temp;
        last = idx + 1;
      } while (idx >= 0);
      cur[prop] = data[p].content;
    }
    return result[""];
  }
}
