var myApp = new Vue({
  el:'#app',
  data: {
    isBusy: false,
    languagePicker: 'ko',
    message: '',
    // message: '{"a": "b"}',
    editViewField: ['key', 'ko', 'en', 'jp'],
    editViewData: []
  },
  watch: {
    languagePicker: function(newData) {
      this.message = '';
    },
    message: function(newData) {
      if (this.message == null || this.message == '') {
        return;
      }
      var revisedMessage = this.message.replaceAll('\'', '"');
      var obj = JSON.parse(revisedMessage);
      var temp = this.editViewData;
      for (x in obj) {
        // console.log(x);
        var index = _.findIndex(temp, (t) => t.key == x)
        
        if (index == -1) {
          var editDataObj = {
            'key': x
          };
          var language = this.languagePicker;
          editDataObj[this.languagePicker] = obj[x];
          temp.push(editDataObj)
        } else {
          temp[index][this.languagePicker] = obj[x]
        }
      }
      return;
    }
  },
  methods: {
    refresh() {
      this.isBusy = !this.isBusy
      t = setTimeout(() => {
        this.refresh();
        clearTimeout(t);
      }, 500);
    }
  }
});

