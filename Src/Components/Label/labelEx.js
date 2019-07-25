// Component/labelEx.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    labelCheckedBackgroundType: {
      type: String,
      value: 'contour'
    },
    backgroundColor: { //组件背景色
      type: String,
      value: 'gray'
    },
    selectedValue: {
      type: String,
      value: ''
    },
    selectedText: {
      type: String,
      value: ''
    },
    labelCheckedColor: {
      type: String,
      value: 'blue'
    },
    labelCheckedFontColor: {
      type: String,
      value: '#fff'
    },
    labelUncheckedColor: {
      type: String,
      value: 'gray'
    },
    componentWidth: {
      type: String,
      value: '500rpx'
    },
    labelWidth: {
      type: String,
      value: '140rpx'
    },
    labelHeight: {
      type: String,
      value: '60rpx'
    },
    fontSize: {
      type: String,
      value: '30rpx'
    },
    labelMarginBottom: {
      type: String,
      value: '0'
    },
    multiSelect: {
      type: Boolean,
      value: false
    },
    borderRadius: {
      type: String,
      value: '8rpx'
    },
    borderWidth: {
      type: String,
      value: '3rpx'
    },
    borderStyle: {
      type: String,
      value: 'solid'
    },
    borderColor: {
      type: String,
      value: '#ccc'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    labelList: [{ //标签列表
      id: '',
      text: '',
      labelColor: '',
      labelCheckedFontColor: ''
    }],
    selectedItemList: [], //当前选中的项列表
    defaultData: {
      labelColor: 'gray',
      incompatibleItemList: [], //互斥的项
    },
    constData: {
      labelCheckedBackgroundTypes: { //项的背景展示方式
        fill: 'fill',
        contour: 'contour'
      }
    },
    variable: {
      isLabelCheckedBackgroundFill: false, // 背景颜色是否填充方式
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化组件
     * data格式:[{},{},……],{id:'',text:''}
     */
    labelInit(data) {
      var len = data.length;
      for (var i = 0; i < len; i++) {
        if (this.data.labelUncheckedColor) {
          data[i].labelColor = this.data.labelUncheckedColor;
          data[i].labelCheckedFontColor = '';
        } else {
          data[i].labelColor = this.data.defaultData.labelColor;
          data[i].labelCheckedFontColor = this.properties.labelCheckedFontColor;
        }
      }
      this.setData({
        'labelList': data
      });

      /**
       * 选中项背景颜色填充方式控制
       */
      this.setData({
        'variable.isLabelCheckedBackgroundFill': this.properties.labelCheckedBackgroundType == this.data.constData.labelCheckedBackgroundTypes.contour ? false : true
      });
    },
    /**
     * 设置互斥的项
     * objs:[{id:'',text''},{},……]
     */
    setIncompatibleItemList(objs) {
      var list = this.data.defaultData.incompatibleItemList;
      var len = objs.length;
      for (var i = 0; i < len; i++) {
        if (this.data.labelUncheckedColor) {
          objs[i].labelColor = this.data.labelUncheckedColor;
          objs[i].labelCheckedFontColor = '';
        } else {
          objs[i].labelColor = this.data.defaultData.labelColor;
          objs[i].labelCheckedFontColor = this.properties.labelCheckedFontColor;
        }
      }
      list.push(objs);
      this.setData({
        'defaultData.incompatibleItemList': list
      });
    },
    /**
     * 设置选中的项
     * obj为项的对象：{id:'',text''}
     */
    setSelectedItem(obj) {
      for (var i = 0; i < this.data.labelList.length; i++) {
        if (this.data.labelList[i].id == obj.id) {
          this.data.labelList[i].labelColor = this.data.labelCheckedColor;
          this.data.labelList[i].isSelected = true;
          this.data.labelList[i].labelCheckedFontColor = this.properties.labelCheckedFontColor;
          this.properties.selectedValue = obj.id;
          this.properties.selectedText = obj.text;
        }
      }

      this.setData({
        labelList: this.data.labelList
      });
    },
    /**
     * 设置选中的项
     * objs为项的对象：[{id:'',text''},{},……]
     */
    setSelectedItems(objs) {
      var selectedItemList = [];
      if (objs.length > 0) {
        for (var j = 0; j < objs.length; j++) {
          for (var i = 0; i < this.data.labelList.length; i++) {
            if (this.data.labelList[i].id == objs[j].id) {
              this.data.labelList[i].labelColor = this.data.labelCheckedColor;
              this.data.labelList[i].isSelected = true;
              this.data.labelList[i].labelCheckedFontColor = this.properties.labelCheckedFontColor;

              selectedItemList.push({
                selectedValue: this.data.labelList[i].id,
                selectedText: this.data.labelList[i].text
              });
            }
          }

          for (var k = 0; k < this.data.defaultData.incompatibleItemList.length; k++) {
            for (var m = 0; m < this.data.defaultData.incompatibleItemList[k].length; m++) {
              if (objs[j].id == this.data.defaultData.incompatibleItemList[k][m].id) {
                this.data.defaultData.incompatibleItemList[k][m].isSelected = true;
              }
            }
          }
        }
      } else {
        this.data.labelList.forEach(label=>{
          label.labelColor = this.data.labelUncheckedColor;
          label.isSelected = false;
          label.labelCheckedFontColor = '';
        });
      }

      this.data.selectedItemList = selectedItemList;

      this.setData({
        labelList: this.data.labelList
      });
    },
    /**
     * 组件的点击事件
     */
    clickEvent(e) {
      this._clickEvent(e);
      this.myEventListener();
    },
    /**
     * 获取当前选择的项列表
     */
    getSelectedItemList() {
      return this.data.selectedItemList;
    },
    /**
     * 获取当前选择的项
     */
    getSelectedItem() {
      return {
        selectedValue: this.properties.selectedValue,
        selectedText: this.properties.selectedText
      }
    },
    _clickEvent(e) {
      if (this.properties.multiSelect) { //多选
        var len = this.data.labelList.length;
        for (var i = 0; i < len; i++) {
          if (e.currentTarget.id === this.data.labelList[i].id) { //判断是否在标签列表中

            if (this.data.labelList[i].isSelected) { //判断当前标签是否已选中，选中->未选中
              this.data.labelList[i].labelColor = this.data.labelUncheckedColor;
              this.data.labelList[i].labelCheckedFontColor = '';
              //遍历已选择的项列表
              for (var j = 0; j < this.data.selectedItemList.length; j++) {
                if (this.data.selectedItemList[j].selectedValue == this.data.labelList[i].id) {
                  this.data.selectedItemList.splice(j, 1);
                  this.data.labelList[i].isSelected = !this.data.labelList[i].isSelected;
                }
              }
              //遍历互斥的项列表
              for (var k = 0; k < this.data.defaultData.incompatibleItemList.length; k++) {
                for (var m = 0; m < this.data.defaultData.incompatibleItemList[k].length; m++) {
                  if (this.data.defaultData.incompatibleItemList[k][m].id == this.data.labelList[i].id) {
                    this.data.defaultData.incompatibleItemList[k][m].isSelected = !this.data.defaultData.incompatibleItemList[k][m].isSelected;
                  }
                }
              }
            } else { //未选中->选中
              for (var r = 0; r < this.data.defaultData.incompatibleItemList.length; r++) {
                for (var y = 0; y < this.data.defaultData.incompatibleItemList[r].length; y++) {
                  //遍历互斥项，判断是否在互斥项中
                  if (this.data.labelList[i].id == this.data.defaultData.incompatibleItemList[r][y].id) {
                    //遍历互斥项，判断是否存在已选互斥项
                    for (var n = 0; n < this.data.defaultData.incompatibleItemList[r].length; n++) {
                      if (this.data.defaultData.incompatibleItemList[r][n].isSelected) {
                        if (this.data.defaultData.incompatibleItemList[r][n].id != this.data.labelList[i].id) {
                          wx.showToast({
                            title: this.data.labelList[i].text + '与' + this.data.defaultData.incompatibleItemList[r][n].text + '不能同时选择',
                            icon: 'none'
                          });
                          this.data.defaultData.incompatibleItemList.forEach(item => {
                            item.forEach(subItem => {
                              if (subItem.id == this.data.labelList[i].id) {
                                subItem.isSelected = false;
                              }
                            });
                          });
                          return;
                        }
                      }
                    }

                    this.data.defaultData.incompatibleItemList.forEach(item => {
                      item.forEach(subItem => {
                        if (subItem.id == this.data.labelList[i].id) {
                          subItem.isSelected = true;
                        }
                      });
                    });
                  }
                }
              }

              this.data.labelList[i].labelColor = this.data.labelCheckedColor;
              this.data.labelList[i].labelCheckedFontColor = this.properties.labelCheckedFontColor;
              this.data.labelList[i].isSelected = !this.data.labelList[i].isSelected;
              this.data.selectedItemList.push({
                selectedValue: this.data.labelList[i].id,
                selectedText: this.data.labelList[i].text
              });
            }
          }
        }

        this.setData({
          labelList: this.data.labelList
        });
      } else {
        var length = this.data.labelList.length;
        for (var i = 0; i < length; i++) {
          if (e.currentTarget.id === this.data.labelList[i].id) { //选中其中一个项
            this.data.labelList[i].labelColor = this.data.labelCheckedColor;
            this.data.labelList[i].labelCheckedFontColor = this.properties.labelCheckedFontColor;
            this.properties.selectedValue = e.currentTarget.id;
            this.properties.selectedText = this.data.labelList[i].text;
            this.data.labelList[i].isSelected = true;
          } else {
            if (this.data.labelUncheckedColor) {
              this.data.labelList[i].labelColor = this.data.labelUncheckedColor;
              this.data.labelList[i].labelCheckedFontColor = '';
              this.data.labelList[i].isSelected = false;
            } else {
              this.data.labelList[i].labelColor = this.data.defaultData.labelColor;
              this.data.labelList[i].labelCheckedFontColor = '';
              this.data.labelList[i].isSelected = false;
            }
          }
        }
        this.setData({
          labelList: this.data.labelList
        });
      }
    },
    myEventListener: function() { //自定义事件监听器
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})