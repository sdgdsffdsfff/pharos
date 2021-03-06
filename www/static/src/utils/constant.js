export default {
  // 合作状态
  PERFORMANCE_ITEMS: [
    {value: 'loadPage', label: 'loadPage', key: '1'},
    {value: 'domReady', label: 'domReady', key: '2'},
    {value: 'redirect', label: 'redirect', key: '3'},
    {value: 'lookupDomain', label: 'lookupDomain', key: '4'},
    {value: 'ttfb', label: 'ttfb', key: '5'},
    {value: 'request', label: 'request', key: '6'},
    {value: 'loadEvent', label: 'loadEvent', key: '7'},
    {value: 'appcache', label: 'appcache', key: '8'},
    {value: 'unloadEvent', label: 'unloadEvent', key: '9'},
    {value: 'connect', label: 'connect', key: '10'},
  ],

  // 获取label
  getLabel: (conf, value)=> {
    return conf.find(item=>item.value == value).label;
  }
}
