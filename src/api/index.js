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
    if (/pdf/.test(data.type)) type = 4;
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
    if (!currentUser) return cb([]);

    currentUser.getRoles().then(function (resultRoles) {
      let roles = [];
      for (let i = 0; i < resultRoles.length; i++) {
        if (resultRoles[i].toJSON().objectId === '5ab6001dac502e57c949a142') {
          roles.push('editor');
        }
        if (resultRoles[i].toJSON().objectId === '5ab6000d17d0096887783cd6') {
          roles.push('manager');
        }
        if (resultRoles[i].toJSON().objectId === '5a76ad890b61601d10938457') {
          roles.push('admin');
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

  Api.prototype.changeMaterialIsRepeatShow = function (material, sucFuc, errFuc) {
    let materialWithdata = AV.Object.createWithoutData('Material', material.objectId);
    materialWithdata.set('isRepeatShow', material.isRepeatShow);
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

        errFuc()
      })
    }).catch(function (error) {
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
      material.set('index', i+1);
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

    this.getLessonTopic(lessonId, function(topics){
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
            console.log(lessonMaterialInfo.material)
            let material = {
              name: lessonMaterialInfo.material.name,
              type: lessonMaterialInfo.material.type,
              index: lessonMaterialInfo.index,
              objectId: lessonMaterialInfo.material.objectId,
              lessonMaterialId: lessonMaterialInfo.objectId,
              isRepeatShow:lessonMaterialInfo.material.isRepeatShow
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
            newLessonInfo.topics = topics;
            console.log(newLessonInfo)
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
    })



  };


  // 更新课程

  Api.prototype.publishLesson = function (lessonId, draft_version_code, sucFuc, errFuc) {

    let lessonInfo = {
      lesson_id: lessonId,
      draft_version_code: draft_version_code
    };
    AV.Cloud.run('publish', lessonInfo).then(
      function (publishResult) {
        if(publishResult.result ===  200){
          sucFuc(publishResult.data)
        }else{
          errFuc()
        }

      }, function (error) {
        errFuc(error);
      }
    );
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
    var self = this;
    let plan = AV.Object.createWithoutData('LessonPlan', lessonInfo.plan.objectId);
    plan.set('content', lessonInfo.plan.content);
    plan.set('author', lessonInfo.plan.author);
    let subject = AV.Object.createWithoutData('Subject', lessonInfo.subject.objectId);
    let lesson = AV.Object.createWithoutData('Lesson', lessonInfo.objectId);
    if(lessonInfo.coverImageUpdateInfo){
      console.log(lessonInfo.coverImageUpdateInfo.filename)
      console.log(lessonInfo.coverImageUpdateInfo.image)
      let file = new AV.File(lessonInfo.coverImageUpdateInfo.filename, {base64: lessonInfo.coverImageUpdateInfo.image})
      lesson.set('coverImage',file)
    }
    lesson.set('name', lessonInfo.name);
    lesson.set('tags', lessonInfo.tags);
    lesson.set('subject', subject);
    this.updateLessonTopic(lessonInfo.objectId, lessonInfo.topics, function(){
      AV.Object.saveAll([plan, lesson]).then(function (result) {
        AV.Cloud.run('draftSave', {lesson_id: lessonInfo.objectId}).then(
          function (draftSaveResult) {
            if(draftSaveResult.result === 200){
              sucFuc()
            }else{
              errFuc()
            }
          }, function (error) {
            errFuc(error)
          }
        )
      },function (error) {
        errFuc()
      })
    },errFuc)


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
      let lessonSpecialQuery = new AV.Query('LessonSpecial')
      lessonSpecialQuery.equalTo('lesson', AV.Object.createWithoutData('Lesson',id))
        lessonSpecialQuery.destroyAll().then(function(){
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
        })

    }, function (error) {
      errFuc(error.code)
    });
  };

  Api.prototype.callbackLesson = function (lessonId, sucFuc, errFuc) {
    AV.Cloud.run('cancelRelease', {lesson_id: lessonId}).then(
      function (value) {
        sucFuc(value)
      }, function (error) {
        errFuc(error);
      }
    );
  };
  Api.prototype.getNeedExamineList = function (id, sucFuc, errFuc) {
    var query = new AV.Query('LessonSnapshot');
    query.equalTo('lessonId', id);
    query.greaterThan('isChecked', 0);
    query.descending('draft_version_code');
    query.find().then(function (lessonSnapshotList) {
      sucFuc(handleArrayData(lessonSnapshotList))
    }, function () {
      errFuc()
    })

  };



  Api.prototype.getNeedExamineLessonInfo = function (id, sucFuc, errFuc) {
    // sucFuc(handleData())
    let query = new AV.Query('LessonSnapshot');
    query.get(id).then(function (lessonSnapshot) {
      var lessonSnapshotInfo = lessonSnapshot.toJSON();
      // lessonSnapshotInfo.isChecked = 1;
      // lessonSnapshotInfo.isPublished =  false;
      $.ajax({
        url: lessonSnapshotInfo.manifest_json.url,
        method: 'get',
        success: function (result) {
          let examineLessonInfo = handleData(result);
          lessonSnapshotInfo.lessonInfo = examineLessonInfo;
          sucFuc(lessonSnapshotInfo)
        }
      })


    }, function () {
      errFuc()
    })
  };

  Api.prototype.examineLesson =  function(id, sucFuc, errFuc){
   let lessonInfo = {
      'lesson_id': id
  };
    AV.Cloud.run('submitAudit', lessonInfo).then(
      function (submitAuditResult) {
        if(submitAuditResult.result === 200){
          sucFuc(submitAuditResult.data)
        }else{
          errFuc();
        }
      }, function (error) {
        errFuc(error);
      }
    )

  };


  Api.prototype.sendExamineResult =  function(id, examineResult, sucFuc, errFuc){
    let obj = {
      'snapshot_id': id
    };
    let actionName = examineResult ? 'isApproved' : 'notThrough';
    AV.Cloud.run(actionName, obj).then(
      function (examineResult) {
        if(examineResult.result === 200){
          sucFuc(examineResult.data)
        }else{
          errFuc()
        }

      }, function (error) {
        errFuc(error)
      }
    )
  };
  Api.prototype.getTodayExamineCount = function(id , userName, sucFuc , errFuc){
    let today = new Date();
    today.setHours(0,0,0);

    let query = new AV.Query('LessonSnapshot');
    query.equalTo('lessonId', id);
    query.equalTo('compiler', userName);
    query.greaterThan('isChecked', 0);
    query.greaterThan('createdAt', today);
    query.count().then(function (count) {

      sucFuc(count)
    }, function () {
      errFuc()
    })
  };
  Api.prototype.logout =  function(){
    AV.User.logOut();
  };
  Api.prototype.uploadUserInfoFile = function(name, data, sucFuc, errFuc){
    let file = new AV.File(name, data);
    file.save().then(function(result){
      let file_id = {
        'excelFileId': result.id
      };
      AV.Cloud.run('registration', file_id).then(
        function (value) {
          sucFuc()
        },
        function (error) {
          errFuc()
        }
      );
    },
    function(){
      errFuc()
    });
  };

  Api.prototype.getWeChatGroups = function(sucFuc,errFuc){
    let groupQuery = new AV.Query('Group');
    groupQuery.find().then(function(groupList){
        typeof sucFuc ==='function' ? sucFuc(handleArrayData(groupList)) : ''
      },
      function(){
        typeof errFuc ==='function' ? errFuc() : ''
      })
  };

  Api.prototype.getChatListHistory =  function(group, page, limit ,sucFuc, errFuc){

    let chatQuery = new AV.Query('Chat');
    chatQuery.equalTo('group',group);
    chatQuery.notContainedIn('type', ['APP']);
    chatQuery.skip((page-1)*limit);
    chatQuery.limit(limit);
    chatQuery.descending('createdAt')
    chatQuery.find().then(function(chatList){
        let chatCountQuery = new AV.Query('Chat');
        chatCountQuery.equalTo('group',group);
        chatCountQuery.notEqualTo('content', null);
        chatCountQuery.count().then(function(count){
          typeof sucFuc ==='function' ? sucFuc({result:handleArrayData(chatList),  count: count}) : ''
        },function(){
          typeof errFuc ==='function' ? errFuc() : ''
        });

      },
      function(){
        typeof errFuc ==='function' ? errFuc() : ''
      })
  };

  //标签接口

  Api.prototype.getLabelList = function(sucFuc, errFuc){
    let labelQuery = new  AV.Query('Label');
    labelQuery.descending('createdAt');
    labelQuery.find().then(function(labelList){
      sucFuc(handleArrayData(labelList))
    }, function () {
      errFuc()
    })
  };

  Api.prototype.updateLabel  = function(label, sucFuc, errFuc){
    let labelObject =  AV.Object.createWithoutData('Label', label.objectId);
    labelObject.set('name', label.name);
    labelObject.set('type', label.type);
    labelObject.save().then(function(){
      sucFuc()
    },function(){
      errFuc()
    })
  };
  Api.prototype.deleteLabel = function(objectId, sucFuc, errFuc){
    let labelObject = AV.Object.createWithoutData('Label', objectId);
    labelObject.destroy().then(function(){
      sucFuc()
    },function(){
      errFuc()
    })
  };

  Api.prototype.createLabel = function(label, sucFuc, errFuc){
    let labelObject = new AV.Object('Label');
    labelObject.set('name', label.name);
    labelObject.set('type', label.type);
    labelObject.save().then(function(){
      sucFuc();
    }, function(){
      errFuc()
    })
  };
  // 专题管理
  Api.prototype.getTopicList =  function(page, size, sucFuc ,errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    var  topicQuery = new AV.Query('SpecialSubject');

    topicQuery.skip((page-1)* size);
    topicQuery.limit(size);
    topicQuery.find().then(function(topicList){
      console.log(topicList)
      let countQuery =  new AV.Query('SpecialSubject');
      countQuery.count().then(function(count){
        sucFuc({result:handleArrayData(topicList), count: count})
      })

    },function(){
      errFuc()
    });

    // sucFuc([{title:'hah',createdAt:'121',isOnline: false, isRecommend:false}])


  };

  Api.prototype.getRecommendCount =  function(sucFuc ,errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    let  topicQuery = new AV.Query('SpecialSubject');
    topicQuery.equalTo('recommendStatus', true);
    topicQuery.count().then(function(count){
      sucFuc({count: count})
    },function(){
      errFuc()
    });
  };

  Api.prototype.uploadTopicImage = function(name, file, sucFuc, errFuc){
    let image = new AV.File(name, file);
    image.save().then(function(file){
      console.log(file);
      sucFuc(file)
    },function(){
      errFuc()
    })
  };


  Api.prototype.createTopicInfo = function(topic, sucFuc, errFuc){
    let newTopic =  new AV.Object('SpecialSubject');

    let picture = new AV.File(topic.updateImage.filename, {base64: topic.updateImage.image});
    newTopic.set('title', topic.title);
    newTopic.set('describe', topic.describe);
    newTopic.set('picture',picture);

    newTopic.save().then(() => {
      sucFuc()
    }, function(err){
      console.log(err)
    })
  };


  Api.prototype.updateTopic = function(topic, sucFuc, errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    let newTopic =   AV.Object.createWithoutData('SpecialSubject', topic.objectId);
    newTopic.set('title', topic.title);
    newTopic.set('describe', topic.describe);
    if(topic.updateImage){
      let picture = new AV.File(topic.updateImage.filename, {base64: topic.updateImage.image});
      newTopic.set('picture',picture)
    }

    newTopic.save().then(() => {
      sucFuc()
    }, errFuc)
  };

  Api.prototype.getTopicInfo = function(id, sucFuc, errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    let topicQ = new AV.Query('SpecialSubject');
    topicQ.get(id).then(function(topicInfo){
      sucFuc(topicInfo.toJSON())
    },errFuc)
  };

  Api.prototype.updateTopicStatus = function(topic, sucFuc, errFuc){
    sucFuc  =  (typeof sucFuc ===  'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    let newTopic =   AV.Object.createWithoutData('SpecialSubject', topic.objectId);
    if(topic.hasOwnProperty('onLine')){
      newTopic.set('onLine', topic.onLine)
    }
    if(topic.hasOwnProperty('recommendStatus')){
      newTopic.set('recommendStatus', topic.recommendStatus)
    }
    newTopic.save().then(function(topicInfo){

      sucFuc(topicInfo.toJSON())
    }, errFuc)

  };
  Api.prototype.deleteTopic = function(id, sucFuc, errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    let newTopic =   AV.Object.createWithoutData('SpecialSubject', id);

    let lessonSpecialQuery = new AV.Query('LessonSpecial');
    lessonSpecialQuery.equalTo('special', newTopic);
    lessonSpecialQuery.destroyAll().then(function(){
      newTopic.destroy().then(function(topicInfo){
        sucFuc()
      }, errFuc)

    },()=>{
      errFuc()
    })
  };


  Api.prototype.getLessonTopic = function(lessonId,  sucFuc, errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};
    let lessonSpecialQuery = new AV.Query('LessonSpecial');
    let lesson =  AV.Object.createWithoutData('lesson',lessonId);
    lessonSpecialQuery.equalTo('lesson', lesson);
    lessonSpecialQuery.find().then(function(lessonSpecialList){
      let topicList = [];
      let info = handleArrayData(lessonSpecialList);
      info.forEach(function(item){
        topicList.push(item.special.objectId)
      });
      sucFuc(topicList)
    }, errFuc)

  };

  Api.prototype.updateLessonTopic = function(lessonId, topicList, sucFuc, errFuc){
    sucFuc  =  (typeof sucFuc === 'function') ?  sucFuc : function(){};
    errFuc  =  (typeof errFuc === 'function') ?  errFuc : function(){};

    let lessonSpecialQuery = new AV.Query('LessonSpecial');
    let lesson =  AV.Object.createWithoutData('Lesson',lessonId);
    lessonSpecialQuery.equalTo('lesson', lesson);
    lessonSpecialQuery.destroyAll().then(function(lessonSpecialList){
        let newTopicList =  [];
        topicList.forEach(function(topicId){
          let newTopic = new AV.Object('LessonSpecial');
          let lesson =  AV.Object.createWithoutData('Lesson',lessonId);
          let SpecialSubject =  AV.Object.createWithoutData('SpecialSubject',topicId);
          newTopic.set('lesson', lesson);
          newTopic.set('special', SpecialSubject);
          newTopicList.push(newTopic)
        });

      AV.Object.saveAll(newTopicList).then(function(){
        sucFuc(topicList)
      },errFuc)
    }, errFuc)


  }

  Api.prototype.updataTeacherEXL = function(name, data, sucFuc, errFuc){
    let file = new AV.File(name, data);
    file.save().then(function(result){
        let file_id = {
          'excelFileId': result.id
        };
        // AV.Cloud.run('registration', file_id).then(
        //   function (value) {
        //     sucFuc()
        //   },
        //   function (error) {
        //     errFuc()
        //   }
        // );
      },
      function(){
        errFuc()
      });
  }


  function sortByIndex(a, b) {
    return a.index > b.index
  }

  Api.prototype.init = function () {

    window.AV.init({
      appId: this.appId,
      appKey: this.appKey
    });


  };

  function handleData(data) {
    let newData = {};
    newData.plan = {};
    newData.tags = data.tags;
    newData.name = data.name;
    newData.plan.content = data.content;
    newData.plan.author = data.author;
    newData.plan.objectId = data.planId;
    newData.objectId = data.id;
    newData.subject = {};
    newData.subject.objectId = data.subjectId;
    newData.coverImage = data.coverImage;
    let materials = [];
    let allMaterials = data.materials || [];

    for (let i = 0; i < allMaterials.length; i++) {
      if (!allMaterials[i].hasOwnProperty('parent')) {
        let materailInfo = {};
        materailInfo.objectId = allMaterials[i].id;
        materailInfo.type = allMaterials[i].type;
        if (materailInfo.type !== 0) {
          materailInfo.file = {};
          materailInfo.file.url = allMaterials[i].url;
          materailInfo.file.mime_type = allMaterials[i].mime_type
        } else {
          materailInfo.files = [];
        }

        materailInfo.name = allMaterials[i].name;
        materailInfo.index = allMaterials[i].file_index;
        materailInfo.isRepeatShow = allMaterials[i].isRepeatShow;
        materials.push(materailInfo);
      }
    }

    materials.sort(sortByIndex);

    for (let i = 0; i < allMaterials.length; i++) {

      if (allMaterials[i].hasOwnProperty('parent')) {
        console.log( allMaterials[i])
        let material = {};
        material.objectId = allMaterials[i].id;
        material.type = allMaterials[i].type;
        material.file = {};
        material.file.url = allMaterials[i].url;
        material.name = allMaterials[i].album_name;
        material.index = allMaterials[i].album_index;
        material.parent = allMaterials[i].parent;
        material.isRepeatShow = allMaterials[i].isRepeatShow;
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


