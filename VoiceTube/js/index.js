
// Api Url
var $ApiURL = 'https://merik.voicetube.com/demo/data';

// 將 axios 指定給 $http 屬性
Vue.prototype.$http = axios;

var vue = new Vue ({
  el: '#app',
  data: {
    sortAct:'publish',
    filterAct:0,
    imgAct:0,
    noResult:'false',
    title: "GGSS",
    ogLists: {},
    lists: {},
    sortTitleList: [
      {key:'publish',title:'發布時間'},
      {key:'views',title:'觀看次數'},
      {key:'collectCount',title:'收藏次數'}
    ],
    filterTitleList: [
      {key:'1',title:'不限'},
      {key:'2',title:'4分鐘以下'},
      {key:'3',title:'5-10分鐘'},
      {key:'4',title:'超過10分鐘'}
    ],
    languageMap:{
      cht:'中文',
      ja:'日文',
      vi:'越南文',
      en:'英文'
    },
    levelMap:{
      1:'初級',
      2:'中級',
      3:'中高級',
      4:'高級'
    }
  },
  created: function () {
    // 先執行預設 function (下行打開就可以看到內容嘍)
    this.get_store_info();
    this.sortBy({key:'publish', title: '發布時間'});
    this.filterBy({key: '1', title: '不限'});
  },
  methods: {
    get_store_info: function () {
      var self = this;
      this.$http.get($ApiURL)
      .then(function (response) {
        self.ogLists = response.data.data
        self.lists = response.data.data
        // console.log(self.lists)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    hover(value){
      // console.log(value)
      this.imgAct= value.id;
    },
    sortBy(value){
      this.lists = _.orderBy(this.lists, value.key);
      this.ogLists = this.lists;
      this.sortAct= value.title;
    },
    filterBy(value){
      let filterStart;
      let filterEnd;
      if(value.key != '1'){
        if(value.key == 2){
          filterStart = 0;
          filterEnd = 299;
        }else if(value.key == 3){
          filterStart = 300;
          filterEnd = 600;
        }else{
          filterStart = 601;
          filterEnd = 999999999;
        }
        this.lists = this.ogLists.filter(function (val) {
          return filterStart <= val.duration && filterEnd >= val.duration;
        });
        if(this.lists.length == 0){
          this.noResult = 'true';
        }else{
          this.noResult = 'false';
        }
      }else{
        this.lists = this.ogLists;
        this.noResult = 'false';
      }
      
      this.filterAct= value.title;
    }
  },
  computed: {
  }
});