let Api = {};
var md5 = require('js-md5')

Api.install = function (Vue, options) {
  
  function Api() {
    // this.base_url = "https://cqbvih8f.api.lncld.net/1.1";
    this.appId = Vue.prototype.$config.APP_ID;
    this.appKey = Vue.prototype.$config.APP_KEY;
  }
  
  
  Api.prototype.login = function (data, sucFuc, errFuc) {
  
    AV.User.logInWithMobilePhoneSmsCode(data.mobilePhoneNumber, data.smsCode).then(function (success) {
       sucFuc(success)
    }, function (error) {
      errFuc(error)
    });
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/usersByMobilePhone',
    //   headers: headers,
    //   data: data,
    //   method: 'post',
    //   success: function (data) {
    //     localStorage.setItem('sessionToken', data.sessionToken);
    //     sucFuc(data)
    //
    //   }, error: function (data) {
    //     errFuc(data)
    //
    //   }
    // })
  };
  
  
  Api.prototype.sendSMSCode = function (phone, sucFuc, errFuc) {
  
    this.AV.User.requestLoginSmsCode(phone).then(function (success) {
      sucFuc(success)
    }, function (error) {
      errFuc()
      
    });
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/requestSmsCode',
    //   method: 'POST',
    //   headers: headers,
    //   data: data,
    //   success: function (data) {
    //     sucFuc(data)
    //   }, error: function () {
    //     errFuc()
    //   }
    // })
  };
  
  Api.prototype.getLesson = function (cb) {
  
    let query = new this.AV.Query('Lesson');
    query.include('subject');
    query.descending('createdAt');
    query.find().then(function (products) {
      cb(products)
    }).catch(function(error) {
      console.log(error)
    });
    
    // var headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson?include=subject',
    //   method: 'GET',
    //   headers: headers,
    //   success: function (data) {
    //     cb(data)
    //   }, error: function () {
    //
    //   }
    // })
  };
  
  Api.prototype.deleteLesson = function (id, cb) {
  
  
    var todo = this.AV.Object.createWithoutData('Lesson', id);
    todo.destroy().then(function (success) {
      // 删除成功
      cb(success)
    }, function (error) {
      // 删除失败
    });
    
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: 'https://cqbvih8f.api.lncld.net/1.1/classes/Lesson/' + id,
    //   method: 'delete',
    //   headers: headers,
    //   success: function (data) {
    //
    //   }, error: function () {
    //
    //   }
    // })
  };

  
  Api.prototype.getHeaders = function (type) {
    let time = new Date().getTime();
    let headers = {
      "X-LC-Id": this.appId,
      "X-LC-Sign": md5(time + this.appKey) + "," + time,
      "Content-Type": "application/json"
    };
    if (localStorage.getItem('sessionToken')) {
      headers['X-LC-Session'] = localStorage.getItem('sessionToken')
    }
    return headers
  };
  
  Api.prototype.getSubjectList = function (sucFuc, errFuc) {
  
    let query = new this.AV.Query('Subject');
    query.find().then(function (products) {
      sucFuc(products)
    }).catch(function(error) {
      console.log(error)
    });
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: this.base_url + '/classes/Subject',
    //   method: 'GET',
    //   headers: headers,
    //   success: function (data) {
    //     sucFuc(data)
    //   }, error: function () {
    //     errFuc()
    //   }
    // })
  };
  Api.prototype.getLessonInfo = function (lessonId, sucFuc, errFuc) {
    
    // window.AV.init({
    //   appId: this.appId,
    //   appKey: this.appId
    // });
    //
    let query = new AV.Query('Lesson');
    query.include('subject');
    query.include('plan');
    query.descending('createdAt');
    query.get(lessonId).then(function (products) {
          sucFuc(products)
    }).catch(function(error) {

    });
  
    
    // let headers = this.getHeaders();
    // $.ajax({
    //   url: this.base_url + '/classes/Lesson/' + lessonId + "?include=subject%2Cplan",
    //   method: 'GET',
    //   headers: headers,
    //   success: function (data) {
    //     sucFuc(data)
    //   }, error: function () {
    //     errFuc()
    //   }
    // })
  };
  
  Api.prototype.getLessonImage = function(lessonId,sucFuc, errFuc){
  
    let images =[];
    let atlasId = [];
    let self = this;
    let lesson = this.AV.Object.createWithoutData('Lesson', lessonId);
    let LessonMaterialQuery = new this.AV.Query('LessonMaterial');
    LessonMaterialQuery.equalTo('lesson', lesson);
    LessonMaterialQuery.include('material');
    LessonMaterialQuery.find().then(function(lessonMaterial){
      for(let i =0 ;i <lessonMaterial.length; i++){
        if(lessonMaterial[i].attributes.material.attributes.type === 3){
          images.push(lessonMaterial[i].attributes.material)
        }
        if(lessonMaterial[i].attributes.material.attributes.type === 0){
          let material = self.AV.Object.createWithoutData('Material', lessonMaterial[i].attributes.material.id);
          atlasId.push(material)
        }
      }
  
      let MaterialQuery = new self.AV.Query('Material');
      MaterialQuery.containedIn("parent", atlasId);
      LessonMaterialQuery.equalTo('type', 3);
      MaterialQuery.find().then(function(atlasImage){
       for(let i =0; i<atlasImage.length;i++){
         images.push(atlasImage[i])
       }
        sucFuc(images)
      }).catch(function(err){
        console.log(err)
      })
      
    }).catch(function(err){
      console.log(err)
    });
    
    
    
    // let images =[];
    // let fileId = [];
    // let self = this;
    // let lessonQuery = new this.AV.Query('Lesson');
    // lessonQuery.get(lessonId).then(function(products){
    //   let materialQuery =  new self.AV.Query('Material');
    //   let materialsFilter = products.attributes.materials;
    //   materialQuery.containedIn('objectId', materialsFilter);
    //   materialQuery.containedIn('type', [3,0]);
    //   materialQuery.find().then(function(materials){
    //     for(let i =0 ;i<materials.length;i++){
    //       if(materials[i].attributes.type === 3){
    //         images.push(materials)
    //       }
    //       if(materials[i].type === 0){
    //         fileId.concat(materials[i].attributes.files)
    //       }
    //     }
    //     let fileQuery =  self.AV.File.containedIn(fileId);
    //     fileQuery.find().then(function(files){
    //       images.concat(files)
    //     })
    //
    //   })
    // })
    
    
    
    // console.log(a)
    
    
  };
  
  Api.prototype.test =  function(){
  
    // var todoFolder = new this.AV.Object('TEST');
    // todoFolder.set('name', '工作');
    // todoFolder.set('priority', 1);
    //
    // var todo1 = new this.AV.Object('TEST2');
    // todo1.set('title', '工程师周会');
    // todo1.set('content', '每周工程师会议，周一下午2点');
    // todo1.set('location', '会议室');
    //
    // var todo2 = new this.AV.Object('TEST2');
    // todo2.set('title', '维护文档');
    // todo2.set('content', '每天 16：00 到 18：00 定期维护文档');
    // todo2.set('location', '当前工位');
    //
    // var todo3 = new this.AV.Object('TEST2');
    // todo3.set('title', '发布 SDK');
    // todo3.set('content', '每周一下午 15：00');
    // todo3.set('location', 'SA 工位');
    //
    // var todos = [todo1, todo2, todo3];
    // this.AV.Object.saveAll(todos).then(function () {
    //   var relation = todoFolder.relation('containedTodos'); // 创建 AV.Relation
    //   todos.map(relation.add.bind(relation));
    //   return todoFolder.save();// 保存到云端
    // }).then(function(todoFolder) {
    //   // 保存成功
    // }, function (error) {
    //   // 异常处理
    // });

    
    // var a =  this.AV.Object.createWithoutData('TEST2','5a7bf8cba22b9d00449e661a');
    // var b =  this.AV.Object.createWithoutData('TEST2','5a7bf8cba22b9d00449e661b');
    // var c =  this.AV.Object.createWithoutData('TEST2','5a7bf8cba22b9d00449e6619');
    // var d = this.AV.Object.createWithoutData('TEST','5a7bf85f17d0090035fdc65c');
    // var todos = [c];
    // var relation = d.relation('containedTodos')
    //
    //     todos.map(relation.add.bind(relation));
    //      d.save();// 保存到云端
    //
    
    
    
    
    // var studentCourseMapTom = new AV.Object('StudentCourseMap');
    //
    // // 设置关联
    // studentCourseMapTom.set('test', d);
    // studentCourseMapTom.set('test1', a);
    // studentCourseMapTom.save();
    //
    // var studentCourseMapTom2 = new AV.Object('StudentCourseMap');
    //
    // studentCourseMapTom2.set('test', d);
    // studentCourseMapTom2.set('test1', b);
    // studentCourseMapTom2.save();
    // var studentCourseMapTom3 = new AV.Object('StudentCourseMap');
    //
    // studentCourseMapTom3.set('test', d);
    // studentCourseMapTom3.set('test1', c);
    // studentCourseMapTom3.save();
  
  
  
    // var studentTom = AV.Object.createWithoutData('TEST', '5a7bf85f17d0090035fdc65c');
    // var query = new AV.Query('StudentCourseMap');
    // query.equalTo('test', studentTom);
    // // query.include('test1')
    // query.find().then(function(data){
    //   console.log(data)
    // })
    
    
    
    
    // var todos = [a, b, c];
    //
    //
    // var relation = d.relation('containedTodos')
    // todos.map(relation.add.bind(relation))
    // // d.save()
    
    
    
    //
    // let a = this.AV.Object.createWithoutData('TEST', '5a7bf85f17d0090035fdc65c');
    // var relation = a.relation('containedTodos');
    // var relation = a.relation('containedTodos');
    // var query = relation.query();
    // query.find().then(function(data){
    //   console.log(data)
    // })
    
    
    
    
    
    
  }
  
  Api.prototype.init = function(){
    window.AV.init({
      appId: this.appId,
      appKey: this.appKey
    });
    this.AV =  window.AV
  };
  
  
  
  let api = new Api();
  api.init();
  
  
  Vue.prototype.$API = api
};

module.exports = Api;


