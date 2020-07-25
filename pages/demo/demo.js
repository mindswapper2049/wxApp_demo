// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer_id: undefined,
    ms_counter: 0,
    message: undefined,
    equation: undefined,
    input_value: undefined,
    right_answer: undefined,
    best_record: undefined
  },
  onLoad:function(){
    this.setData({
      message: "Do the Math!"
    })
    this.Refresh();
  },
  getNum:function(e){
    console.log(e.detail.value);
    console.log(this.data.right_answer);
    var flag = parseInt(e.detail.value) == this.data.right_answer ? "Correct" : "Wrong";
    console.log(flag);
    if(e.detail.value == "")
      flag = "Do the Math!"
    this.setData({
      message: flag,
      input_value: ""
    })
    if(flag == "Correct"){
      var record_this_time = this.data.ms_counter / 1000;
      this.StopAndResetTimer();
      console.log(record_this_time);
      var storaged_best_record = wx.getStorageSync("best_record");
      if(record_this_time < storaged_best_record || storaged_best_record == 0)
        wx.setStorageSync("best_record", record_this_time);
      this.Refresh();
    }
  },
  Refresh:function(){
    var storaged_best_record = wx.getStorageSync("best_record");
    if(storaged_best_record){
      this.setData({
        best_record: storaged_best_record
      })
    }
    else{
      this.setData({
        best_record: 0
      })
    }
    var a = Math.floor(Math.random() * 1000);
    var b = Math.floor(Math.random() * 1000);
    var equa = a.toString() + " + " + b.toString() + " = ";
    var right_answer = a + b;
    this.setData({
      equation: equa,
      right_answer: right_answer
    })
    this.StartTimer();
  },
  StartTimer:function(){
    var that = this;
    that.data.timer_id = setInterval(function(){
      var ms_tmp = that.data.ms_counter + 1;
      that.setData({
        ms_counter: ms_tmp
      })
    }, 1)
  },
  StopAndResetTimer:function(){
    var that = this;
    that.setData({
      ms_counter: 0
    })
    clearInterval(that.data.timer_id);
  }
})
