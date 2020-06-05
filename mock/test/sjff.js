/**
 * 返回JSON对象或方法
 * @returns {{code: string, time: number, data: *[], success: boolean}}
 */
module.exports = function () {
  return {
    'code': '999999',
    'time': 1523329299763,
    'data': [
      {name: '省厅下发交办', value: 865},
      {name: '技网侦获取数据', value: 404},
      {name: '政府提供数', value: 320},
      {name: '运营商数据', value: 55},
      {name: '地区自排数据', value: 19},
      {name: '互联网数据', value: 18},
      {name: '自主摸排-旅馆', value: 2},
    ],
    'success': true,
  };
};