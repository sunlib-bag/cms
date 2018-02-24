let Api = {};
var md5 = require('js-md5')

Api.install = function (Vue, options) {
  
  function handleArrayData(array){
    let newArray = [];
    for(let i =0 ;i < array.length; i++){
      newArray.push(array[i].toJSON())
    }
    return newArray;
  }
  
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
  };
  
  
  Api.prototype.sendSMSCode = function (phone, sucFuc, errFuc) {
    
    this.AV.User.requestLoginSmsCode(phone).then(function (success) {
      sucFuc(success)
    }, function (error) {
      errFuc()
    });
  };
  
  Api.prototype.getLesson = function (cb,errFuc) {
    let query = new this.AV.Query('Lesson');
    query.include('subject');
    query.descending('createdAt');
    query.find().then(function (products) {
      cb(handleArrayData(products))
    }).catch(function (error) {
      errFuc(error)
    });
  };
  
  
  Api.prototype.addAtlas = function (lessonId, index, sucFuc, errFuc) {
    
    let self = this;
    let newMaterial = new this.AV.Object('Material');
    newMaterial.set('name', '图集');
    newMaterial.set('type', 0);
    newMaterial.fetchWhenSave(true);
    newMaterial.save().then(function (material) {
      let materialObject = self.AV.Object.createWithoutData('Material', material.id);
      let lesson = self.AV.Object.createWithoutData('Lesson', lessonId);
      let newLessonMaterial = new self.AV.Object('LessonMaterial');
      newLessonMaterial.fetchWhenSave(true);
      newLessonMaterial.set('material', materialObject);
      newLessonMaterial.set('lesson', lesson);
      newLessonMaterial.set('index',index);
      newLessonMaterial.save().then(function (lessonMaterial) {
        material.attributes.index  =  lessonMaterial.attributes.index;
        sucFuc(material)
      }).catch(function (err) {
      
      });
      
    }).catch(function () {
    
    })
    
    
  };
  Api.prototype.addLessonMaterial =  function(materialId, lessonId, index ,sucFuc, errFuc){
    var self = this;
    let materialObject = self.AV.Object.createWithoutData('Material', materialId);
  
    let lesson = self.AV.Object.createWithoutData('Lesson', lessonId);
  
    let newLessonMaterial = new self.AV.Object('LessonMaterial');
  
    newLessonMaterial.set('material', materialObject);
  
    newLessonMaterial.set('lesson', lesson);
  
    newLessonMaterial.set('index',index);
    newLessonMaterial.save().then(function (lessonMaterial) {
      sucFuc()
      
    }).catch(function (err) {
      errFuc()
    });
  }
  
  Api.prototype.deleteLesson = function (id, sucFuc, errFuc) {
    
    let lessonQuery = new  AV.Query('Lesson');
    lessonQuery.get(id).then(function (result) {
      let lessonInfo =  result.toJSON();
      let deleteList = [];
      let lesson = AV.Object.createWithoutData('Lesson', lessonInfo.objectId);
      deleteList.push(lesson);
      if(lessonInfo.plan){
        let plan = AV.Object.createWithoutData('LessonPlan', lessonInfo.plan.objectId);
        deleteList.push(plan);
      }
      
      let materialLessonQuery = new AV.Query('LessonMaterial');
      materialLessonQuery.equalTo('lesson', lesson);
      materialLessonQuery.destroyAll().then(function () {
        AV.Object.destroyAll(deleteList).then(function (data) {
          sucFuc()
        }).catch(function (error) {
          errFuc()
        })
      }).catch(function (error) {
        errFuc()
      });
    }, function (error) {
      errFuc()
    });
  };
  
  
  Api.prototype.getSubjectList = function (sucFuc, errFuc) {
    let query = new this.AV.Query('Subject');
    query.find().then(function (products) {
      sucFuc(handleArrayData(products));
    }).catch(function (error) {
      console.log(error)
    });
  };
  
  Api.prototype.getLessonInfo = function (lessonId, sucFuc, errFuc) {
    let self = this;
    let query = new AV.Query('Lesson');
    query.include('subject');
    query.include('plan');
    query.get(lessonId).then(function (lessonInfo) {
      let newLessonInfo =  lessonInfo.toJSON();
      let materials = [];
      let lesson = AV.Object.createWithoutData('Lesson', lessonId);
      let LessonMaterialQuery = new AV.Query('LessonMaterial');
      LessonMaterialQuery.equalTo('lesson', lesson);
      LessonMaterialQuery.ascending("index");
      LessonMaterialQuery.include('material');
      LessonMaterialQuery.find().then(function (lessonMaterial) {
        for (let i = 0; i < lessonMaterial.length; i++) {
          let lessonMaterialInfo = lessonMaterial[i].toJSON();
          let material = {
            name: lessonMaterialInfo.material.name,
            type: lessonMaterialInfo.material.type,
            index: lessonMaterialInfo.index,
            id: lessonMaterialInfo.material.objectId
          };
          
          if (material.type !== 0) {
            let type = lessonMaterialInfo.material.file.name.split(".")[1];
            material.file = lessonMaterialInfo.material.file
          }
          materials.push(material)
          
        }
        
        let atlas = [];
        for (let i = 0; i < materials.length; i++) {
          let material = AV.Object.createWithoutData('Material', materials[i].id);
          atlas.push(material)
        }
        
        let atlasFiles = {};
        
        let MaterialQuery = new AV.Query('Material');
        MaterialQuery.containedIn("parent", atlas);
        MaterialQuery.find().then(function (atlasImage) {
          for (let i = 0; i < atlasImage.length; i++) {
            let atlasImageInfo = atlasImage[i].toJSON();
            if (atlasFiles.hasOwnProperty(atlasImageInfo.parent.objectId)) {
              atlasFiles[atlasImageInfo.parent.objectId].push(atlasImageInfo)
            } else {
              atlasFiles[atlasImageInfo.parent.objectId] = [atlasImageInfo]
            }
          }
          
          for (let i = 0; i < materials.length; i++) {
            if (materials[i].type === 0) {
              materials[i].files = atlasFiles[materials[i].id] ? atlasFiles[materials[i].id] : [];
            }
          }
          newLessonInfo.materials = materials;
          sucFuc(newLessonInfo)
        }).catch(function (error) {
          console.log(error)
          errFuc()
        });
        
      }).catch(function (error) {
        console.log(error)
        errFuc()
      });
      
      
    }).catch(function (error) {
      errFuc()
    });
    
    
  };
  
  Api.prototype.getMaterials = function (lessonId, sucFuc, errFuc) {
    let self = this;
    let lesson = this.AV.Object.createWithoutData('Lesson', lessonId);
    let LessonMaterialQuery = new this.AV.Query('LessonMaterial');
    LessonMaterialQuery.equalTo('lesson', lesson);
    LessonMaterialQuery.include('material');
    LessonMaterialQuery.find().then(function (lessonMaterial) {
      sucFuc(lessonMaterial)
    }).catch(function (err) {
      console.log(err)
    });
  };
  
  Api.prototype.getAtlasImage = function (mateiralId, sucFuc, errFuc) {
    let MaterialQuery = new this.AV.Query('Material');
    let mateiral = this.AV.Object.createWithoutData('Material', mateiralId);
    MaterialQuery.equalTo("parent", mateiral);
    
    MaterialQuery.find().then(function (materials) {
      sucFuc(materials)
    }).catch(function () {
    
    })
    
  };
  
  Api.prototype.getLessonImage = function (lessonId, sucFuc, errFuc) {
    
    let images = [];
    let atlasId = [];
    let self = this;
    let lesson = this.AV.Object.createWithoutData('Lesson', lessonId);
    let LessonMaterialQuery = new this.AV.Query('LessonMaterial');
    LessonMaterialQuery.equalTo('lesson', lesson);
    LessonMaterialQuery.include('material');
    LessonMaterialQuery.find().then(function (lessonMaterial) {
      for (let i = 0; i < lessonMaterial.length; i++) {
        if (lessonMaterial[i].attributes.material.attributes.type === 3) {
          images.push(lessonMaterial[i].attributes.material)
        }
        if (lessonMaterial[i].attributes.material.attributes.type === 0) {
          let material = self.AV.Object.createWithoutData('Material', lessonMaterial[i].attributes.material.id);
          atlasId.push(material)
        }
      }
      
      let MaterialQuery = new self.AV.Query('Material');
      MaterialQuery.containedIn("parent", atlasId);
      LessonMaterialQuery.equalTo('type', 3);
      MaterialQuery.find().then(function (atlasImage) {
        for (let i = 0; i < atlasImage.length; i++) {
          images.push(atlasImage[i])
        }
        sucFuc(images)
      }).catch(function (err) {
        console.log(err)
      })
      
    }).catch(function (err) {
      console.log(err)
    });
    
  };
  
  Api.prototype.changeMaterialName = function(material, newName, sucFuc, errFuc){
    let nameInfo = material.name.split('.'); //todo
    let name ;
    let fileType = nameInfo.pop();
    if(material.type ===0){
       name = newName
    }else{
      name =  newName + '.'+fileType;
    }
  
    
   let materialWithdata = this.AV.Object.createWithoutData('Material', material.id);
    materialWithdata.set('name', name);
    materialWithdata.fetchWhenSave(true);
    materialWithdata.save().then(function(material){
      sucFuc(material.toJSON())
    }).catch(function(){

    })
  };
  
  Api.prototype.publishLesson =  function(lessonId, sucFuc, errFuc){
    let paramsJson = {
      lesson_id: lessonId
    };
    this.AV.Cloud.run('pack', paramsJson).then(function(data) {
      sucFuc(data)
    }, function(err) {
      errFuc(data)
    });
  };
  
  Api.prototype.deleteMaterial = function(lessonId, materialId, sucFuc, errFuc){
    let material = this.AV.Object.createWithoutData('Material', materialId);
    let lesson = this.AV.Object.createWithoutData('Lesson', lessonId);
    let materialLessonQuery = new this.AV.Query('LessonMaterial')
    materialLessonQuery.equalTo('lesson', lesson);
    materialLessonQuery.equalTo('material', material);
    materialLessonQuery.destroyAll().then(function(result){
            sucFuc()
    }).catch(function(error){
      errFuc()
    })
  };
  Api.prototype.deleteAtlasMaterial = function(materialId, sucFuc, errFuc){
    console.log(materialId)
    let material = this.AV.Object.createWithoutData('Material', materialId);
    material.set('parent',null);
    material.save().then(function(){
      sucFuc()
    }).catch(function(){
      errFuc()
    })
    
  };
  
  Api.prototype.createMaterial = function (lessonId, index ,name, data, sucFuc, errFuc) {
    let type;
    let self = this;
    if (/image/.test(data.type)) type = 3;
    if (/audio/.test(data.type)) type = 1;
    if (/video/.test(data.type)) type = 2;
    
    let file = new this.AV.File(name, data);
    let material = new this.AV.Object('Material');
    material.set('name', name);
    material.set('type', type);
    material.set('file', file);
    material.save().then(function (material) {
      self.addLessonMaterial( material.id, lessonId, index, function(){
        sucFuc(material)
      });
      
    }).catch(function () {
      errFuc()
    })
    
  };
  Api.prototype.createAtlasMaterial = function(atlasId, index ,name, data, sucFuc, errFuc){
    let type;
    let self = this;
    if (/image/.test(data.type)) type = 3;
    if (/audio/.test(data.type)) type = 1;
    if (/video/.test(data.type)) type = 2;
    
    let atlas =  this.AV.Object.createWithoutData('Material',atlasId)
    let file = new this.AV.File(name, data);
    let material = new this.AV.Object('Material');
    material.set('name', name);
    material.set('type', type);
    material.set('file', file);
    material.set('parent',atlas);
    material.set('index',index);
    material.save().then(function (material) {
     sucFuc(material)
    }).catch(function () {
      errFuc()
    })
  
  
  };
  
  Api.prototype.initLesson = function (sucFuc, errFuc) {
    let query = new this.AV.Query('Subject');
    let self = this;
    query.find().then(function (products) {
      let subject = self.AV.Object.createWithoutData('Subject', products[0].id);
      let LessonPlan = new self.AV.Object('LessonPlan');
      let newLesson = new self.AV.Object('Lesson');
      newLesson.set('isPublished', false);
      newLesson.set('name', '草稿');
      newLesson.set('subject', subject);
      newLesson.set('plan', LessonPlan)
      
      newLesson.save().then(function (lesson) {
        sucFuc(lesson)
      }).catch(function () {
      
      })
    }).catch(function (error) {
      errFuc()
    });
    
    
  };
  
  Api.prototype.updateLesson =  function(lessonInfo, sucFuc, errFuc){
    let plan = this.AV.Object.createWithoutData('LessonPlan',lessonInfo.plan.objectId);
    
    plan.set('content',lessonInfo.plan.content);
    plan.set('author',lessonInfo.plan.author);
    let subject = this.AV.Object.createWithoutData('Subject', lessonInfo.subject.objectId);
    let lesson = this.AV.Object.createWithoutData('Lesson',lessonInfo.objectId);
    lesson.set('name',lessonInfo.name);
    lesson.set('tags',lessonInfo.tags);
    lesson.set('subject', subject);
    lesson.set('draft_version_code', lessonInfo.draft_version_code + 1);
    this.AV.Object.saveAll([plan, lesson]).then(function(){
      sucFuc()
      
    }).catch(function(error){
      errFuc()
    })
    
  };
  Api.prototype.checkUser =  function(cb){
    let currentUser = this.AV.User.current();
    if(!currentUser) return cb(false)
    currentUser.isAuthenticated().then(function(authenticated){
      cb(authenticated)
    });
  };
  
  Api.prototype.init = function () {
    window.AV.init({
      appId: this.appId,
      appKey: this.appKey
    });
    this.AV = window.AV
  };
  
  
  let api = new Api();
  api.init();
  
  
  Vue.prototype.$API = api
};

module.exports = Api;


