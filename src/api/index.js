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
      self.checkUserRole(function (roles) {
        if (roles.length > 0) {
          return sucFuc(success)
        }
        errFuc(323)
      })
    }, function (error) {
      errFuc(error.code || -1)
    });
  };
  Api.prototype.sendSMSCode = function (phone, sucFuc, errFuc) {
    
    AV.User.requestLoginSmsCode(phone).then(function (success) {
      sucFuc(success)
    }, function (error) {
      errFuc(error.code || -1)
    });
  };
  Api.prototype.checkUserRole = function (cb) {
    let currentUser = AV.User.current();
    if (!currentUser) return cb(false);
    currentUser.getRoles().then(function (resultRoles) {
      
      let roles = [];
      for (let i = 0; i < resultRoles.length; i++) {
        
        if (resultRoles[i].toJSON().objectId === '5a76ad890b61601d10938457') {
          roles.push('manager');
          
        }
        if (resultRoles[i].toJSON().objectId === '5ab6001dac502e57c949a142') {
          roles.push('editor');
        }
        if (resultRoles[i].toJSON().objectId = '5ab6000d17d0096887783cd6') {
        
        }
      }
      
      if (!roles.length) return cb([]);
      currentUser.isAuthenticated().then(function (authenticated) {
        cb((authenticated ? roles : []))
      });
    }).catch(function () {
      cb([])
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
      errFuc(error.code)
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
    }).catch(function (err) {
      errFuc(err.code)
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
  Api.prototype.getLesson = function (limit, page, cb, errFuc) {
    let skipNumber = (page - 1) * limit;
    let limitNumber = limit;
    let query = new AV.Query('Lesson');
    query.include('subject');
    query.descending('createdAt');
    query.limit(limitNumber);// 最多返回 10 条结果
    query.skip(skipNumber);// 跳过 20 条结果
    query.find().then(function (products) {
      let countLesson = new AV.Query('Lesson');
      countLesson.count().then(function (count) {
        cb({result: handleArrayData(products), count: count})
      })
      
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
          errFuc(error.code)
        });
        
      }).catch(function (error) {
        errFuc(error.code)
      });
      
      
    }).catch(function (error) {
      errFuc(error.code)
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
      errFuc(err)
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
          errFuc(error.code)
        })
      }).catch(function (error) {
        errFuc(error.code)
      });
    }, function (error) {
      errFuc(error.code)
    });
  };
  
  Api.prototype.callbackLesson = function (lessonId, sucFuc, errFuc) {
    let lesson = AV.Object.createWithoutData('Lesson', lessonId);
    lesson.set('isPublished', false);
    lesson.save().then(function (data) {
      sucFuc()
    }).catch(function () {
      errFuc()
    })
  };
  Api.prototype.getNeedExamineList = function (cb) {
    cb()
  };
  
  
  Api.prototype.getNeedExamineLessonInfo = function (id, sucFuc, errFuc) {
    sucFuc(this.handleData())
  };
  function sortByIndex(a,b){
    return a.index > b.index
  }
  
  Api.prototype.init = function () {
    
    window.AV.init({
      appId: this.appId,
      appKey: this.appKey
    });
  };
  Api.prototype.handleData = function () {
    var data = {
      "id": "5ab8a09144d90418a236d282",
      "name": "历史版本重现测试",
      "version_code": 2,
      "tags": [
        "domain.语言",
        "source.千千树",
        "misc.暗示法"
      ],
      "source": "千千树",
      "planId": "5ab8a0919f545419e4ecdf64",
      "subjectId": "5a701c82d50eee00444134b2",
      "content": "# 历史版本重新测试",
      "author": "w",
      "materials": [
        {
          "url": "http://lc-CQBviH8f.cn-n1.lcfile.com/0851e7b0c8d6fac65a80.jpg",
          "id": "5ab8a0e62f301e1c2c48ab45",
          "filename": "5ab8a0e62f301e1c2c48ab45",
          "parent": "5ab8a0c7a22b9d0045fa83ee",
          "album_index": 1,
          "album_name": "测试图片1.jpg",
          "mime_type": "image/jpeg",
          "type": 3
        },
        {
          "url": "http://lc-CQBviH8f.cn-n1.lcfile.com/6edb25ae4fe7574429ca.jpg",
          "id": "5ab8a0ed9f54541cd847c54a",
          "filename": "5ab8a0ed9f54541cd847c54a",
          "parent": "5ab8a0c7a22b9d0045fa83ee",
          "album_index": 2,
          "album_name": "测试图片2.jpg",
          "mime_type": "image/jpeg",
          "type": 3
        },
        {
          "id": "5ab8a0bf17d009688786ee75",
          "file_index": 1,
          "url": "http://lc-CQBviH8f.cn-n1.lcfile.com/82c62c4258f459760328.mp3",
          "filename": "5ab8a0bf17d009688786ee75",
          "name": "历史版本测试.mp3",
          "mime_type": "audio/mpeg3",
          "type": 1
        },
        {
          "id": "5ab8a0c7a22b9d0045fa83ee",
          "file_index": 3,
          "name": "测试",
          "type": 0,
          "mime_type": "album"
        },
        {
          "id": "5ab8a0c617d009688786ee9b",
          "file_index": 2,
          "url": "http://lc-CQBviH8f.cn-n1.lcfile.com/c9bec0efc32e006688c4.mp4",
          "filename": "5ab8a0c617d009688786ee9b",
          "name": "历史版本测试.mp4",
          "mime_type": "application/octet-stream",
          "type": 2
        }
      ]
    }
    
    
    var newData = {};
    
    newData.plan = {};
    newData.tags = data.tags;
    newData.name = data.name;
    newData.plan.content = data.content;
    newData.plan.author = data.author;
    newData.plan.objectId = data.planId;
    newData.objectId = data.id;
    newData.subject = {};
    newData.subject.objectId = data.subjectId;
    let materials = [];
    let allMaterials = data.materials;
    for (let i = 0; i < allMaterials.length; i++) {
      if (!allMaterials[i].hasOwnProperty('parent')) {
        let materailInfo = {};
        materailInfo.objectId = allMaterials[i].id;
        materailInfo.type =  allMaterials[i].type;
        if (materailInfo.type !== 0) {
          materailInfo.file = {};
          materailInfo.file.url = allMaterials[i].url;
          materailInfo.file.mime_type = allMaterials[i].mime_type
        } else {
          materailInfo.files = [];
        }
        
        materailInfo.name = allMaterials[i].name;
        materailInfo.index = allMaterials[i].file_index;
        materials.push(materailInfo);
      }
    }
    
    materials.sort(sortByIndex);
    
    for (let i = 0; i < allMaterials.length; i++) {
      if (allMaterials[i].hasOwnProperty('parent')) {
        let material = {};
        material.objectId = allMaterials[i].id;
        material.type = allMaterials[i].type;
        material.file = {};
        material.file.url = allMaterials[i].url;
        material.name = allMaterials[i].name;
        material.index = allMaterials[i].album_index;
        material.parent = allMaterials[i].parent;
        for (let j = 0; j < materials.length; j++) {
          if (materials[j].objectId === material.parent) {
            materials[j].files.push(material);
            materials[j].files.sort(sortByIndex)
          }
        }
       
  
      }
    }
    
    newData.materials = materials;
    
    return newData
    
  }
  
  
  
  
  let api = new Api();
  api.init();
  
  
  Vue.prototype.$API = api
};


module.exports = Api;


