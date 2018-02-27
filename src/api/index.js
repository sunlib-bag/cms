let Api = {};

Api.install = function (Vue, options) {
  
  function handleArrayData(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i].toJSON())
    }
    return newArray;
  }
  
  function getFileType(data) {
    let type;
    if (/image/.test(data.type)) type = 3;
    if (/audio/.test(data.type)) type = 1;
    if (/video/.test(data.type)) type = 2;
    return type;
  }
  
  
  function Api() {
    this.appId = Vue.prototype.$config.APP_ID;
    this.appKey = Vue.prototype.$config.APP_KEY;
  }
  
  //登录
  Api.prototype.login = function (data, sucFuc, errFuc) {
    let self = this;
    AV.User.logInWithMobilePhoneSmsCode(data.mobilePhoneNumber, data.smsCode).then(function (success) {
      self.checkUser(function(isAdmin){
        if(isAdmin){
          return sucFuc(success)
        }
        errFuc()
      })
      
    }, function (error) {
      errFuc(error)
    });
  };
  Api.prototype.sendSMSCode = function (phone, sucFuc, errFuc) {
    
    AV.User.requestLoginSmsCode(phone).then(function (success) {
      sucFuc(success)
    }, function (error) {
      errFuc()
    });
  };
  Api.prototype.checkUser = function (cb) {
    let currentUser = AV.User.current();
    if (!currentUser) return cb(false);
    currentUser.getRoles().then(function(roles){
      
      let isAdmin  = false;
      for(let i = 0; i< roles.length; i++){
        if(roles[i].toJSON().name === 'admin'){
          isAdmin = true;
          break
        }
      }
      
      if(!isAdmin) return cb(false);
      currentUser.isAuthenticated().then(function (authenticated) {
        cb(authenticated)
      });
    }).catch(function(){
      cb(false)
    })
    
  };
  
  
  
  //素材
  
  
  Api.prototype.changeMaterialName = function (material, newName, sucFuc, errFuc) {
    let nameInfo = material.name.split('.'); //todo
    let name;
    let fileType = nameInfo.pop();
    if (material.type === 0) {
      name = newName
    } else {
      name = newName + '.' + fileType;
    }
    
    let materialWithdata = AV.Object.createWithoutData('Material', material.objectId);
    materialWithdata.set('name', name);
    materialWithdata.save().then(function (material) {
      sucFuc(material.toJSON())
    }).catch(function () {
      errFuc();
    })
  };
  
  Api.prototype.createMaterial = function (lessonId, index, name, data, sucFuc, errFuc) {
    let type = getFileType(data);
    
    let file = new AV.File(name, data);
    let material = new AV.Object('Material');
    material.set('name', name);
    material.set('type', type);
    material.set('file', file);
    
    let lesson = AV.Object.createWithoutData('Lesson', lessonId);
    
    let newLessonMaterial = new AV.Object('LessonMaterial');
    
    newLessonMaterial.set('material', material);
    
    newLessonMaterial.set('lesson', lesson);
    
    newLessonMaterial.set('index', index);
    
    newLessonMaterial.save().then(function (lessonMaterial) {
      lessonMaterial = lessonMaterial.toJSON();
      sucFuc(lessonMaterial);
    }).catch(function (error) {
      errFuc()
    });
    
  };
  
  Api.prototype.addAtlas = function (lessonId, index, sucFuc, errFuc) {
    let newMaterial = new AV.Object('Material');
    newMaterial.set('name', '图集');
    newMaterial.set('type', 0);
    let lesson = AV.Object.createWithoutData('Lesson', lessonId);
    let newLessonMaterial = new AV.Object('LessonMaterial');
    newLessonMaterial.set('material', newMaterial);
    newLessonMaterial.set('lesson', lesson);
    newLessonMaterial.set('index', index);
    newLessonMaterial.save().then(function (lessonMaterial) {
      sucFuc(lessonMaterial.toJSON())
    }).catch(function (error) {
      errFuc()
    });
  };
  
  Api.prototype.deleteMaterial = function (materials, index, sucFuc, errFuc) {
    let deleteMaterial = materials.splice(index, 1)[0];
    let updateMaterialList = [];
    
    for (let i = 0; i < materials.length; i++) {
      let lessonMaterial = AV.Object.createWithoutData('LessonMaterial', materials[i].lessonMaterialId);
      lessonMaterial.set('index', i + 1);
      updateMaterialList.push(lessonMaterial)
    }
    AV.Object.saveAll(updateMaterialList).then(function () {
      let materialLesson = AV.Object.createWithoutData("LessonMaterial", deleteMaterial.lessonMaterialId);
      materialLesson.destroy().then(function () {
        sucFuc()
      }).catch(function (error) {
        console.log(error)
        errFuc()
      })
    }).catch(function (error) {
      console.log(error)
      errFuc()
    });
    
  };
  
  Api.prototype.deleteAtlasMaterial = function (materials, index, sucFuc, errFuc) {
    let deleteMaterial = materials.splice(index, 1)[0];
    deleteMaterial = AV.Object.createWithoutData('Material', deleteMaterial.objectId);
    deleteMaterial.set('parent', null);
    deleteMaterial.set('index', null);
    let updateMaterialList = [deleteMaterial];
    for (let i = 0; i < materials.length; i++) {
      let material = AV.Object.createWithoutData('Material', materials[i].objectId);
      material.set('index', i + 1);
      updateMaterialList.push(material)
    }
    AV.Object.saveAll(updateMaterialList).then(function () {
      sucFuc()
    }).catch(function () {
      errFuc()
    })
    
    // let material = AV.Object.createWithoutData('Material', materialId);
    // material.set('parent', null);
    // material.save().then(function () {
    //   sucFuc()
    // }).catch(function () {
    //   errFuc()
    // })
    
  };
  
  Api.prototype.createAtlasMaterial = function (atlasId, index, name, data, sucFuc, errFuc) {
    let type = getFileType(data);
    let atlas = AV.Object.createWithoutData('Material', atlasId);
    let file = new AV.File(name, data);
    let material = new AV.Object('Material');
    material.set('name', name);
    material.set('type', type);
    material.set('file', file);
    material.set('parent', atlas);
    material.set('index', index);
    material.save().then(function (material) {
      sucFuc(material.toJSON())
    }).catch(function () {
      errFuc()
    })
  };
  
  
  //获取信息
  Api.prototype.getLesson = function (cb, errFuc) {
    let query = new AV.Query('Lesson');
    query.include('subject');
    query.descending('createdAt');
    query.find().then(function (products) {
      cb(handleArrayData(products))
    }).catch(function (error) {
      errFuc(error)
    });
  };
  
  Api.prototype.getSubjectList = function (sucFuc, errFuc) {
    let query = new AV.Query('Subject');
    query.find().then(function (products) {
      sucFuc(handleArrayData(products));
    }).catch(function (error) {
      errFuc()
    });
  };
  
  Api.prototype.getLessonInfo = function (lessonId, sucFuc, errFuc) {
    let self = this;
    let query = new AV.Query('Lesson');
    query.include('subject');
    query.include('plan');
    query.get(lessonId).then(function (lessonInfo) {
      let newLessonInfo = lessonInfo.toJSON();
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
            objectId: lessonMaterialInfo.material.objectId,
            lessonMaterialId: lessonMaterialInfo.objectId
          };
          
          if (material.type !== 0) {
            let type = lessonMaterialInfo.material.file.name.split(".")[1];
            material.file = lessonMaterialInfo.material.file
          }
          materials.push(material)
          
        }
        
        let atlas = [];
        for (let i = 0; i < materials.length; i++) {
          let material = AV.Object.createWithoutData('Material', materials[i].objectId);
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
              materials[i].files = atlasFiles[materials[i].objectId] ? atlasFiles[materials[i].objectId] : [];
            }
          }
          newLessonInfo.materials = materials;
          sucFuc(newLessonInfo)
        }).catch(function (error) {
          errFuc()
        });
        
      }).catch(function (error) {
        errFuc()
      });
      
      
    }).catch(function (error) {
      errFuc()
    });
    
    
  };
  
  
  // 更新课程
  
  Api.prototype.publishLesson = function (lessonId, sucFuc, errFuc) {
    let paramsJson = {
      lesson_id: lessonId
    };
    AV.Cloud.run('pack', paramsJson).then(function (data) {
      sucFuc(data)
    }, function (err) {
      errFuc(data)
    });
  };
  
  Api.prototype.initLesson = function (sucFuc, errFuc) {
    let query = new AV.Query('Subject');
    let self = this;
    query.find().then(function (products) {
      if (products.length <= 0) return errFuc();
      
      let subject = AV.Object.createWithoutData('Subject', products[0].toJSON().objectId);
      let LessonPlan = new AV.Object('LessonPlan');
      let newLesson = new AV.Object('Lesson');
      newLesson.set('isPublished', false);
      newLesson.set('name', '草稿');
      newLesson.set('subject', subject);
      newLesson.set('plan', LessonPlan);
      newLesson.save().then(function (lesson) {
        sucFuc(lesson.toJSON())
      }).catch(function (error) {
        
        errFuc()
      })
    }).catch(function (error) {
      errFuc()
    });
    
    
  };
  
  Api.prototype.updateLesson = function (lessonInfo, sucFuc, errFuc) {
    let plan = AV.Object.createWithoutData('LessonPlan', lessonInfo.plan.objectId);
    plan.set('content', lessonInfo.plan.content);
    plan.set('author', lessonInfo.plan.author);
    let subject = AV.Object.createWithoutData('Subject', lessonInfo.subject.objectId);
    let lesson = AV.Object.createWithoutData('Lesson', lessonInfo.objectId);
    lesson.set('name', lessonInfo.name);
    lesson.set('tags', lessonInfo.tags);
    lesson.set('subject', subject);
    lesson.set('draft_version_code', lessonInfo.draft_version_code + 1);
    
    AV.Object.saveAll([plan, lesson]).then(function (result) {
      sucFuc()
      
    }).catch(function (error) {
      errFuc()
    })
    
  };
  
  Api.prototype.deleteLesson = function (id, sucFuc, errFuc) {
    
    let lessonQuery = new AV.Query('Lesson');
    lessonQuery.get(id).then(function (result) {
      let lessonInfo = result.toJSON();
      let deleteList = [];
      let lesson = AV.Object.createWithoutData('Lesson', lessonInfo.objectId);
      deleteList.push(lesson);
      if (lessonInfo.plan) {
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
  
  
  Api.prototype.init = function () {
    window.AV.init({
      appId: this.appId,
      appKey: this.appKey
    });
  };
  
  
  let api = new Api();
  api.init();
  
  
  Vue.prototype.$API = api
};

module.exports = Api;


