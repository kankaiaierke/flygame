var $vm = new Vue({
	el: '#main',
	data: {
		phonePlear: {
			width: 60,
			height: 40,
			left: 0,
			top: 0,
			radius: 0,
			speed: 10,
			pushSpeed: 1000,//子弹发射频率，每1000毫秒发射一次
			pushNow: 1000,//子弹发射频率
			type: 1,
		},//自己飞机
		laserArr: [],//子弹数组
		targetArr: [],//敌机数组
		boomArr:[],//爆炸数组
		frequency: 2000,//敌机生成频率
		frequencyNow: 2000,//敌机生成频率
		targetSpeed: 0.5,//难度系数，越大越难
		hitNum: 0,//击落数
		loseNum: 0,//逃逸数
		flags:false,//拖拽用
	    position: {
	      x: 0,
	      y: 0
	    },
	    nx: '',
	    ny: '',
	    dx: '',
	    dy: '',
	    xPum: '',
	    yPum: '',
	},
	created: function() {
		var self = this;
	},
	mounted: function() {
		//FastClick.attach(document.body);
		var self = this;
		self.creatGame();
	},
	methods: {
		//绑定键盘操作
		keyBoardMove: function() {
			var self = this;
			document.onkeydown = function(e) {
				e = e || window.event;
				e.preventDefault();
				switch(e.keyCode) {
					case 38:
						//console.log('上键');
						self.phoneUp();
						break;
					case 40:
						//console.log('下键');
						self.phoneDown();
						break;
					case 39:
						//console.log('右键');
						self.phoneRight();
						break;
					case 37:
						//console.log('左键');
						self.phoneLeft();
						break;
				}
			}
		},
		//创建新游戏
		creatGame: function() {
			var self = this;
			self.phonePlear.left = (document.getElementById("main").offsetWidth - self.phonePlear.width) * 0.5;
			self.phonePlear.top = (document.getElementById("main").offsetHeight - self.phonePlear.height) * 0.8;
			self.keyBoardMove();
			self.phonePlear.pushSpeed = document.getElementById("main").offsetHeight;//改变发射频率
			self.phonePlear.pushNow = self.phonePlear.pushSpeed;
			var autoFly = setInterval(function() {
				self.autoRun();
			}, 10);
		},
		//深拷贝
		deepClone: function(obj) { 
			let _obj = JSON.stringify(obj),
				objClone = JSON.parse(_obj);
			return objClone
		},
		//飞机往上
		phoneUp: function() {
			var self = this;
			if(self.phonePlear.top - self.phonePlear.speed > 0) {
				self.phonePlear.top -= self.phonePlear.speed;
			} else {
				self.phonePlear.top = 0;
			}
		},
		//飞机往右
		phoneRight: function() {
			var self = this;
			var maxLeft = document.getElementById("main").offsetWidth - self.phonePlear.width;
			if(self.phonePlear.left + self.phonePlear.speed < maxLeft) {
				self.phonePlear.left += self.phonePlear.speed;
			} else {
				self.phonePlear.left = maxLeft;
			}
		},
		//飞机往下
		phoneDown: function() {
			var self = this;
			var maxTop = document.getElementById("main").offsetHeight - self.phonePlear.height;
			if(self.phonePlear.top + self.phonePlear.speed < maxTop) {
				self.phonePlear.top += self.phonePlear.speed;
			} else {
				self.phonePlear.top = maxTop;
			}
		},
		//飞机往左
		phoneLeft: function() {
			var self = this;
			if(self.phonePlear.left - self.phonePlear.speed > 0) {
				self.phonePlear.left -= self.phonePlear.speed;
			} else {
				self.phonePlear.left = 0;
			}
		},
		//某敌机与子弹判断是否接触
		checkoutTouch: function(rect) {
			var self = this;
			if(self.laserArr.length > 0) {
				var laserArr = self.deepClone(self.laserArr);
				var rect1 = {
					x: laserArr[0].left,
					y: laserArr[0].top,
					width: laserArr[0].width,
					height: laserArr[0].height,
				}
				var rect2 = self.deepClone(rect);
				if(collide(rect1, rect2)) {
					if(self.laserArr.length > 0) {
						var len = self.laserArr.length - 1;
						self.laserArr.splice(len, 1);
					}
					return true;
				} else {
					return false;
				}
			}
			return false;
		},
		//飞机鼠标移动
		movePhone: function(e) {
			var self = this;
			let odiv = e.target; //获取目标元素
			let maxLeft = document.getElementById("main").offsetWidth - self.phonePlear.width;
			let maxTop = document.getElementById("main").offsetHeight - self.phonePlear.height;
			//算出鼠标相对元素的位置
			let disX = e.clientX - self.phonePlear.left;
			let disY = e.clientY - self.phonePlear.top;
			document.onmousemove = (e) => { //鼠标按下并移动的事件
				//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
				let left = e.clientX - disX;
				let top = e.clientY - disY;

				//绑定元素位置到positionX和positionY上面
				this.positionX = top;
				this.positionY = left;

				if(left < 0) {
					left = 0;
				}

				if(left > maxLeft) {
					left = maxLeft;
				}

				if(top < 0) {
					top = 0;
				}

				if(top > maxTop) {
					top = maxTop;
				}

				//移动当前元素
				self.phonePlear.left = left;
				self.phonePlear.top = top;
			};
			document.onmouseup = (e) => {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		//动画
		autoRun: function() {
			var self = this;
			let maxLeft = document.getElementById("main").offsetWidth;//最大top
			let maxTop = document.getElementById("main").offsetHeight;//最大left
			
			//发射子弹
			if(self.phonePlear.pushNow - 10 > 0) {
				self.phonePlear.pushNow -= 10;
			} else {
				var laser = {
					width: 4,
					height: 30,
					left: self.phonePlear.left + self.phonePlear.width * 0.5,
					top: self.phonePlear.top,
					radius: 2,
					speed: 10,
					speedNow: 10,
				};
				self.laserArr.push(laser);
				self.phonePlear.pushNow = self.phonePlear.pushSpeed;
			}
			
			
			//生成敌机
			if(self.frequencyNow - 10 > 0) {
				self.frequencyNow -= 10;
			} else {
				var randomNum = Math.ceil(Math.random() * (maxLeft - 60));
				var type = Math.ceil(Math.random() * 2) + 1;
				if(type == 1) {
					type++;
				}
				var target = {
					width: 60,
					height: 40,
					left: randomNum,
					top: 0,
					radius: 0,
					speed: type * self.targetSpeed,
					speedNow: type * self.targetSpeed,
					type: type,
				};
				self.targetArr.push(target);
				self.frequencyNow = self.frequency;
			}
			
			
			//子弹运动
			for(var i = 0; i < self.laserArr.length;) {
				self.laserArr[i].top -= self.laserArr[i].speed;
				if(self.laserArr[i].top < -self.laserArr[i].height) {
					self.laserArr.splice(i, 1);
				} else {
					i++;
				}
			}
			
			
			//爆炸消失
			for(var i = 0; i < self.boomArr.length;) {
				if(self.boomArr[i].op > 0) {
					self.boomArr[i].op -= 10;
					i++;
				} else {
					self.boomArr.splice(i, 1);
				}
			}
			
			//敌机运动
			for(var i = 0; i < self.targetArr.length;) {
				self.targetArr[i].top += self.targetArr[i].speed;
				var rect = {
					x: self.targetArr[i].left,
					y: self.targetArr[i].top,
					width: self.targetArr[i].width,
					height: self.targetArr[i].height,
				}
				if(self.targetArr[i].top > (maxTop - self.targetArr[i].height) || self.checkoutTouch(rect)) {
					if(self.targetArr[i].top > (maxTop - self.targetArr[i].height)) {
						self.loseNum++;
					} else {
						var boom = {
							width: 90,
							height: 60,
							left: self.targetArr[i].left + self.targetArr[i].height/2 - 45,
							top: self.targetArr[i].top + self.targetArr[i].width/2 - 30,
							radius: 0,
							speed: 200,
							type: 0,
							op:200,
						};
						self.boomArr.push(boom);
						self.hitNum++;
					}
					self.targetArr.splice(i, 1);
				} else {
					i++;
				}
			}
		},
		// 实现移动端拖拽
		down: function() {
			this.flags = true;
			var touch;
			if(event.touches) {
				touch = event.touches[0];
			} else {
				touch = event;
			}
			
			this.position.x = touch.clientX;
			this.position.y = touch.clientY;
			this.dx = this.phonePlear.left;
			this.dy = this.phonePlear.top;
		},
		//移动
		move: function() {
			if(this.flags) {
				var touch;
				if(event.touches) {
					touch = event.touches[0];
				} else {
					touch = event;
				}
				this.nx = touch.clientX - this.position.x;
				this.ny = touch.clientY - this.position.y;
				this.xPum = this.dx + this.nx;
				this.yPum = this.dy + this.ny;
				this.phonePlear.left = this.xPum;
				this.phonePlear.top = this.yPum;
			}
		},
		//鼠标释放时候的函数
		end: function() {
			this.flags = false;
		},
	},
})

// 播放声音
var playVoice = (function() {
	var voice;
	return function(url) {
		if(voice) {
			voice.pause();
			voice.currentTime = 0;
			voice = null;
			_inputQueue.unLock();
		}
		if(url) {
			console.log(url);
			voice = new Audio(url);
			voice.volume = 1;
			voice.play();
			_inputQueue.unLock();
		};
	};
})();

//创建声音队列
var _inputQueue = new inputQueue();
_inputQueue.sendNewMessage(function(message) {
	playVoice(message);
});


//声音队列
function inputQueue() {
	this.queue = [];
	this.isLocked = false;
	this.sendMessageFun = {};
	this.pushMessage = function(msg) {
		if(msg === undefined || msg === '') return;
		if(this.isLocked) {
			this.queue.unshift(msg); // 入栈
			console.log('消息队列' + this.queue.length);
		} else {
			this.isLocked = true;
			this.send(msg);
		}
	}
	this.unLock = function() {
		var item = this.queue.pop(); //出栈
		if(item === undefined) {
			this.isLocked = false;
			return;
		}
		this.isLocked = true;
		this.send(item);
	}
	this.send = function(msg) {
		if(typeof this.sendMessageFun === 'undefined') return;
		this.sendMessageFun(msg);
	}
	this.reset = function() {
		this.queue.length = 0;
		this.isLocked = false;
	}
	this.sendNewMessage = function(func) {
		this.sendMessageFun = func;
	}
}


//判断两个矩形是否重叠
var collide = function(rect1, rect2) {
	var maxX, maxY, minX, minY;
	maxX = rect1.x + rect1.width >= rect2.x + rect2.width ? rect1.x + rect1.width : rect2.x + rect2.width
	maxY = rect1.y + rect1.height >= rect2.y + rect2.height ? rect1.y + rect1.height : rect2.y + rect2.height
	minX = rect1.x <= rect2.x ? rect1.x : rect2.x
	minY = rect1.y <= rect2.y ? rect1.y : rect2.y

	if(maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height) {
		return true
	} else {
		return false
	}
}