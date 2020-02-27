/* eslint-disable */
// alert('弹出此提示说明：nativecall.js 加载成功');
(function () {
	/*
     * 调用客户端插件 jsBridge.callHandler(pluginName, methodName, data,
     * responseCallback); 注册js插件
     * jsBridge.registerHandler(pluginName, methodName, data,
     * responseCallback);
     */
    var callnative = {
        history: [],
        pages: [],
        isHideBackButton: false,
        viewPort: 'content'
    };

    /** CPAlert 信息提示框插件 */
    // 以dialog的形式弹出提示信息，一个按键。
    callnative.Alert = function (data, responseCallback) {
        // 比较ShowHintMsgCustomAlert/ShowHintMsgDefaultAlert
        if (window.CLIENTMODE) {
            jsBridge.callHandler('CPAlert', 'ShowHintMsgCustomAlert', data, responseCallback);
        } else {
            alert(data);
            if (responseCallback) {
                responseCallback();
            }
        }
    };

    // 以dialog的形式弹出提示信息，两个按键。
    callnative.Confirm = function (data, responseCallback) {
        alert(85858585)
        // 比较ShowHintMsgCustomConfirm/ShowHintMsgDefaultConfirm
        jsBridge.callHandler('CPAlert', 'ShowHintMsgCustomConfirm', data, responseCallback);
    };
    // 以Toast的形式弹出提示信息
    callnative.Toast = function (data, responseCallback) {
        jsBridge.callHandler('CPAlert', 'ShowHintMsgToast', data, responseCallback);
    };
    /** CPDevice 设备信息插件 */
    // 获取设备信息(包括：应用版本名/设备平台/设备唯一标示/设备型号/设备系统版本)
    callnative.DeviceInfo = function (responseCallback) {
        jsBridge.callHandler('CPDevice', 'DeviceInfo', '', responseCallback);
    };
    // 设备网络信息2g/3g/4g/wifi
    callnative.NetworkMsg = function (responseCallback) {
        jsBridge.callHandler('CPDevice', 'NetworkMsg', '', responseCallback);
    };
    // 设备网络状态
    callnative.NetworkStatus = function (responseCallback) {
        jsBridge.callHandler('CPDevice', 'NetworkStatus', '', responseCallback);
    };
    // NFC扫描银行卡
    callnative.NFCScanBankCard = function (data, responseCallback) {
        jsBridge.callHandler('CPNFC', 'ScanBankCard', data, responseCallback);
    };
    /** CPMask 遮罩层插件 */
    // 隐藏遮罩层
    callnative.HideMask = function (responseCallback) {
        jsBridge.callHandler('CPMask', 'HideMask', '', responseCallback);
    };
    // 显示遮罩层
    callnative.ShowMask = function (responseCallback) {
        jsBridge.callHandler('CPMask', 'ShowMask', '', responseCallback);
    };
    /** CPContacts 通讯录插件 */
    // 调用系统通讯录页面，选择联系人信息并返回
    callnative.SearchBySystem = function (responseCallback) {
        jsBridge.callHandler('CPContacts', 'SearchBySystem', '', responseCallback);
    };

    /** CPApp 应用插件 */
    // 回退
    callnative.GoBack = function (responseCallback) {
        if (window.CLIENTMODE) {
            jsBridge.callHandler('CPApp', 'GoBack', '', responseCallback);
        } else {
            if (callnative.history.length <= 1) {
                if (callnative.pages.length > 0) {
                    var targets = callnative.pages.pop();
                    $rootScope.$apply(function () {
                        $targets("content", targets);
                    });


                } else {

                }
            } else if (typeof callnative.history[callnative.history.length - 1] !== 'function') {
                var vLength = callnative.history.length;
                var vLast = callnative.history[vLength - 1];
                var vPenult = callnative.history[vLength - 2];
                $targets(callnative.viewPort, "#" + ((vPenult - vLast) > 0 ? "+" + (vPenult - vLast) : (vPenult - vLast)));

            } else if (typeof callnative.history[callnative.history.length - 1] === 'function') {// 回调函数
                var callback = callnative.history.pop();
                callback();

            } else {

            }
        }

    };
    // 关闭当前页面
    callnative.Exit = function (responseCallback) {
        jsBridge.callHandler('CPApp', 'Exit', '', responseCallback);
    };
    // 加载新的html页面
    callnative.LoadUrl = function (url, responseCallback) {
        jsBridge.callHandler('CPApp', 'LoadUrl', url, responseCallback);
    };
    /** CPWidget 控件插件 */
    // datepicker 日期选择器
    callnative.DatePicker = function (date, responseCallback) {
        jsBridge.callHandler('CPWidget', 'DatePicker', date, responseCallback);
    };
    /** CPAction action插件 */
    // 调用action插件 调用原生页面
    callnative.StartNativeAction = function (className, params, responseCallback) {
        var data = {
            'ClassName': className,
            'Data': params
        };
        jsBridge.callHandler('CPAction', 'StartNativeAction', data, responseCallback);
    };
    // 利用原生页面显示html webActivity
    callnative.StartWebAction = function (className, params, title, url, productId, responseCallback) {
        var data = {
            'ClassName': className,
            'Data': params,
            'Url': url,
            'Title': title,
            'Id': productId
        };
        jsBridge.callHandler('CPAction', 'StartNativeAction', data, responseCallback);
    };
    /** CPLog客户端打印日志 */
    callnative.Debug = function (message, responseCallback) {
        jsBridge.callHandler('CPLog', 'Debug', message, responseCallback);
    };
    /** CPImage图片插件 */
    // 获取图片 1 仅拍照 2 仅相册上传  3 都弹出来 供用户选择
    callnative.CapturePhoto = function (data, responseCallback) {
        jsBridge.callHandler('CPImage', 'CapturePhoto', data, responseCallback);
    };
    // 获取圆形图片
    callnative.CaptureRoundImage = function (responseCallback) {
        jsBridge.callHandler('CPImage', 'CaptureRoundImage', '', responseCallback);
    };
    /** CPVxHelper插件 */
    // 功能：获取actionId

    callnative.GetActionId = function (responseCallback) {
        jsBridge.callHandler('CPVxHelper', 'GetActionId', '', function (actionId) {
            if (!callnative.ActionLoaded) {
                if (actionId) {
                    callnative.ActionId = (function (actionId) {
                        if (actionId.charAt(0) != '/') {
                            return "#/" + actionId;
                        } else {
                            return "#" + actionId;
                        }
                    })(actionId);
                    callnative.ActionLoaded = true;
                }
            }
            responseCallback(actionId);
        });
    };
    callnative.GetParams = function (responseCallback) {
        jsBridge.callHandler('CPVxHelper', 'GetParams', '', responseCallback);
    };
    /** CPNetwork 通讯插件 */
    // 功能：post请求,勿擅自修改
    callnative.sendRequest = function (url, params, requestCallback) {
        if (url.match(/\w*(.json)$/)) {
            url = url.match(/\w*(.json)$/)[0].replace(".json", ".do");
        }
        var data = {
            'Url': url,
            'Params': params
        };
        jsBridge.callHandler('CPNetwork', 'RequestPostForString', data, function (response) {
            requestCallback(response);
        });
    };
    // 功能：get请求,勿擅自修改
    callnative.sendRequestGet = function (url, params, responseCallback) {
        var data = {
            'Url': url,
            'Params': params
        };
        jsBridge.callHandler('CPNetwork', 'RequestGetForString', data, responseCallback);
    };
    // 功能：图片下载 返回值base64
    callnative.RequestImageForDownload = function (url, params, responseCallback) {
        var data = {
            'Url': url,
            'Params': params
        };
        jsBridge.callHandler('CPNetwork', 'RequestImageForDownload', data, responseCallback);
    };
    /** CPUIRefresh ui刷新插件 */
    // 功能：隐藏标题栏返回键
    callnative.HideBackButton = function (responseCallback) {
        jsBridge.callHandler('CPUIRefresh', 'HideBackButton', '', responseCallback);
    };
    // 功能：显示标题栏返回键
    callnative.ShowBackButton = function (responseCallback) {
        jsBridge.callHandler('CPUIRefresh', 'ShowBackButton', '', responseCallback);
    };
    // 功能：设置title
    callnative.SetTitle = function (title, responseCallback) {
        jsBridge.callHandler('CPUIRefresh', 'SetTitle', title, responseCallback);
    };

    // 功能：显示右上角按钮
    callnative.ShowRightBtn = function (data, responseCallback) {
        jsBridge.callHandler('RigthBtnPlugin', 'ShowRightBtn', data, responseCallback);
    };

    // 功能：跳转手势密码  0 设置 -  1重置
    callnative.StartGestureAction = function (data, responseCallback) {
        jsBridge.callHandler('CPGesture', 'StartGestureAction', data, responseCallback);
    };

    //功能：结果页点击返回app首页
    callnative.GoToNativeHome = function (responseCallback) {
        jsBridge.callHandler('CPHomePage', 'GoToNativeHome', '', responseCallback);
    }

    // 调用插件 统一方式
    callnative.CallHandler = function (pluginName, methodName, data, responseCallback) {
        jsBridge.callHandler(pluginName, methodName, data, responseCallback);
    };

    /*
     * 注册js插件 统一方式 举例：CALLNATIVE.RegisterHandler('TabMain',
     * function(data, responseCallback) { responseCallback('回调信息！');
     * });
     */
    callnative.RegisterHandler = function (HandlerName, Callback) {
        jsBridge.registerHandler(HandlerName, Callback);
    };

    // set the native app back of button show or hide
    callnative.SetBackButtonVisibility = function (flag) {
        // flag为true,隐藏按钮
        if (flag) {
            if (!this.isHideBackButton) {
                this.isHideBackButton = true;
                this.HideBackButton();
            }
        } else if (this.isHideBackButton) {
            this.ShowBackButton();
            this.isHideBackButton = false;
        } else if (flag === undefined) {
            if (this.history.length <= 1 && this.pages.length <= 0) {
                this.HideBackButton();
            } else {
                this.ShowBackButton();
            }
        }
    };

    var onBackPressed = function (cb) {
        if (callnative.history.length <= 0) {
            setTimeout(function () {
                var hash = location.hash.replace(/\?.*$/, "");
                if (hash == callnative.ActionId) {
                    cb("true");
                } else {
                    history.back();
                    cb("false");
                }
            }, 200);
        } else {
            var his = callnative.history[callnative.history.length - 1];
            if (!his) {
                callnative.history.length = 0;
                cb("true");
            } else {
                try {
                    if (vx.isFunction(his)) {
                        his = callnative.history.pop();
                        his.call();
                        cb("false");
                    } else if (vx.isString(his)) {
                        $rootScope.goto(his);
                        cb("false");
                    } else {
                        throw new Error("invalid type: " + his);
                    }
                } catch (ex) {
                    console.log(ex.message);
                    cb("true");
                }
            }
        }
    };

    callnative.onBackPress = function (cb) {
        callnative.history.push(cb);
    };

    // native app call html app goback fn
    callnative.RegisterHandler('VXBack', function (data, responseCallback) {
        onBackPressed(responseCallback);
    });


    //调用插件  统一方式
    callnative.CallHandler = function (pluginName, methodName, data, responseCallback) {
        jsBridge.callHandler(pluginName, methodName, data, responseCallback);
    };

	/*
	 * 注册js插件   统一方式
	 * 举例：CALLNATIVE.RegisterHandler('TabMain', function(data, responseCallback) {
	 * 		responseCallback('回调信息！');
		});
	 * */
    callnative.RegisterHandler = function (HandlerName, Callback) {
        jsBridge.registerHandler(HandlerName, Callback);
    }

    //跳转原生交易密码
    callnative.goSetPasswordVC = function (data, responseCallback) {
        jsBridge.callHandler('CPKeyboard', 'goSetPasswordVC', data, responseCallback);
    };
    // 调用密码键盘
    callnative.SecureKeyboard = function (responseCallback) {
        jsBridge.callHandler('CPKeyboard', 'SecureKeyboard', '', responseCallback);
    };
    // 调用人脸识别
    callnative.FaceRecognition = function (responseCallback) {
        jsBridge.callHandler('CPFace', 'FaceRecognition', '', responseCallback);
    };
    // 调用ocr扫描电子账户身份证
    callnative.ScanOcrIDCard = function (data, responseCallback) {
        jsBridge.callHandler('CPOcrIDCard', 'ScanOcrIDCard', data, responseCallback);
    };
    // 调用ocr扫描银行卡
    callnative.ScanOcrBankCard = function (responseCallback) {
        jsBridge.callHandler('CPOcrBankCard', 'ScanOcrBankCard', '', responseCallback);
    };
    //调用可输入弹窗
    callnative.showTF = function (data, responseCallback) {
        jsBridge.callHandler('CPTextfield', 'showTF', data, responseCallback);
    };


    //接收登录返回的数据
    callnative.getUserInfo = function (responseCallback) {
        jsBridge.callHandler('CPGetUserInfo', 'getUserInfo', '', responseCallback)
    }
    //账号保护 接受数据类型string 1保护状态 0不保护
    callnative.hideCardNum = function (responseCallback) {
        jsBridge.callHandler('CPHideCardNum', 'hideCardNum', '', responseCallback)
    }
    //免登录查询 接受数据类型string 1免登录 0登录查询
    callnative.logFreequery = function (responseCallback) {
        jsBridge.callHandler('CPLogFreequery', 'logFreequery', '', responseCallback)
    }
    //获取刚开通的电子账户账号 返回数据String
    callnative.getEleNumber = function (responseCallback) {
        jsBridge.callHandler('CPGetEleNumber', 'getEleNumber', '', responseCallback)
    },
        //扫描二维码获取数据
        callnative.scanQRCode = function (responseCallback) {
            jsBridge.callHandler('CPScanQRCode', 'scanQRCode', '', responseCallback)
        },

        /**
        * 调用原生方法请求银行公告类型
        */
        callnative.getBankNoticeType = function (responseCallback) {
            jsBridge.callHandler('CPBankNotice', 'getBankNoticeType', '', responseCallback)
        },

        //返回
        callnative.goBack = function () {
            jsBridge.callHandler('CPGoback', 'goBack');
        };
    //跳转到别的模块
    /**@param {package} string 跳转到对应包的包名
    /**@param {router} string 跳转到对应包的路由
    /**@param {routerDic} string 跳转到对应包要带的参数
    */
    callnative.goToPackage = function (data, responseCallback) {
        jsBridge.callHandler('CPGoToPackage', 'goToPackage', data, responseCallback)
    }
    //跳转到原生某个页面
    /**@param {name} string 要跳转的页面的名字
     * name = limitMoney 跳转至原生限额设置页面
     */
    callnative.goToNativePage = function (data, responseCallback) {
        jsBridge.callHandler('CPGoToNativePage', 'goToNativePage', data, responseCallback)
    }
    //跳转到模块对应的路由
    callnative.goToRouter = function (responseCallback) {
        jsBridge.callHandler('CPGoToRouter', 'goToRouter', '', responseCallback)
    }
    //返回进入上次原生界面
    callnative.BackNative = function () {
        jsBridge.callHandler('CPBackNative', 'BackNative');
    }

    // 获取当前定位城市
    callnative.getLocationCityName = function (responseCallback) {
        jsBridge.callHandler('CPCityList', 'getLocationCityName', '', responseCallback);
    }
    // 返回选择城市
    callnative.setLocationCityName = function (data) {
        jsBridge.callHandler('CPCityList', 'setLocationCityName', data);
    }
    //分享到微信
    callnative.CPShare = function (data) {
        jsBridge.callHandler('ShareWeiXin', 'CPShare', data)
    }
    //拨打电话
    callnative.callPhone = function (data) {
        jsBridge.callHandler('CPCallPhone', 'callPhone', data)
    }
    //调用原生方法的对象
    window.NativeCall = callnative;
    console.log("我原生加载")
    //获取手机当前真实位置地点信息(如客户未授权获取位置信息，原生返回焦作位置)
    callnative.GetUserLocation = function (responseCallback) {
      jsBridge.callHandler('CPApp', 'GetUserLocation', '',responseCallback);
  }
}())
