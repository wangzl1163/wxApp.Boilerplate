class IndexService extends wx.Service{
   setValue(){
      this.page.setData({
         aa:'a1'
      },()=>{
         console.log(this.page.data.aa)
      })
   }

   printValue(){
      console.log('print value:',this.page.data.aa)
   }
}

export default IndexService