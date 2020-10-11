// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;

Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/** 
 * 天气的数据我使用的是 彩云天气 的api, https://dashboard.caiyunapp.com/user/account/upgrade/
 * 挺好用的,你也可以去申请一个免费用户. 个人应该够用
 * 建议在 user_config 中配置手输入 经纬度. 系统api获取还是挺慢的
 * name : 用户名, 问候语后面拼接的文字, 可以自己修改
 * caiyunToken : 访问天气数据接口的令牌, 你也可以自己申请; 如果不能访问, 请替换自己申请的令牌
 * userLocation: 用户地理信息,是经纬度(用来请求天气信息的)
 * isShowLife: 是否展示人生小格. TODO
 * isShowWeather: 电池信息下方那一行是否展示天气信息(数据温度, 还有天气现象,eg: 大风大雨大雪等等), 默认不展示,
 *   如果不展示会随机展示一条 诗词; true: 天气信息; false: 显示一条随机诗词;
 * weatherEmoji: 天气现象是否使用 emoji表情展示, 为true 表示使用 emoji; 如果不想使用emoji, 可改为false
 * memorialDays: 常见节假日, 以及纪念日
 * 
*/
const user_config = {
	name: '两好三坏',
	caiyunToken:'udoS1Xsnt3Cy6pk3',
	userLocation: '121.6544,25.1552',
	isShowLife:true,
	isShowWeather: true,//是否展示天气状态/
	weatherEmoji: true,// 天气状态是否使用emoji
	memorialDays:{
		"01-01": "🎉新年快乐🎉'",
		"02-14": "💍情人节快乐💍",
		"03-08": "👗妇女节快乐哦~",
		"03-12": "🌲🌲🌲植树节",
		"04-01": "🤔🤡👻愚人节",
		"05-01": "🛠劳动节🛠",
		"05-12": "👩‍⚕️💉护士节💉",
		"06-01": "🧒🎁🍭儿童节啦",
		"07-01": "💪💪💪建党节",
		"08-01": "💪💪💪建军节",
		"09-10": "👨‍🏫👩‍🏫🎊",
		"10-01": "🎉🎉🎉国庆啦🎉🎉🎉",
		"11-11": "呵、单身狗节🐶",
		"12-24": "🎅平安夜啦🎅",
		"12-25": "🎄🎄圣诞啦🎄🎄",
		"08-01": "🎂生日快乐🎂",// eg 纪念日
		"09-18": "🕯🕯🕯🕯缅怀🕯🕯🕯🕯",
	}
}

// Get Location  建议在 user_config 中配置手输入 经纬度. 系统api获取还是挺慢的
// Location.setAccuracyToBest();
// let curLocation = await Location.current();
// console.log(curLocation.latitude);
// console.log(curLocation.longitude);

const filename = "50.jpg"//
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
let widgetHello = new ListWidget();

var currentDate = new Date();

/// 如果你不想使用彩云天气的接口 可以在这里修改天气的设置
let wetherurl = "https://api.caiyunapp.com/v2.5/"+user_config.caiyunToken+"/"+user_config.userLocation+"/realtime.json";
const weatherJSON = await fetchWeatherData(wetherurl);
const temperature = weatherJSON['temperature']; //温度
const apparent_temperature = weatherJSON['apparent_temperature']; //体感温度
const skycon = returnSkyCon(weatherJSON['skycon']);//天气现象
async function fetchWeatherData(url) {
	const request = new Request(url);
	const res = await request.loadJSON();
	return res['result']['realtime'];
}
/// 如果你不想使用彩云天气的接口 可以在这里修改天气的设置





/// 返回表示天气现象的文字或者emoji
function returnSkyCon(skycon) {
	let weatherEmojiJson = {
		'CLEAR_DAY': '🌝 ',
		'PARTLY_CLOUDY_DAY': '🌤',
		'PARTLY_CLOUDY_NIGHT': '🌥',
		'CLOUDY': '☁️',
		'LIGHT_HAZE': '🌫️',
		'MODERATE_HAZE': '🌫️🌫️',
		'HEAVY_HAZE': '🌫️🌫️🌫️',
		'LIGHT_RAIN': '🌧️',
		'MODERATE_RAIN': '🌧️🌧️',
		'HEAVY_RAIN': '🌧️🌧️🌧️',
		'STORM_RAIN': '🌧️🌧️🌧️🌧️',
		'FOG': '雾',
		'LIGHT_SNOW': '❄️',
		'MODERATE_SNOW': '❄️❄️',
		'HEAVY_SNOW': '❄️',
		'STORM_SNOW': '❄️❄️❄️❄️',
		'DUST': '🌬🌬',
		'SAND': '🌬',
		'WIND': '💨',
	};
	let weatherTitleJson = {
		'CLEAR_DAY': '晴（白天） ',
		'PARTLY_CLOUDY_DAY': '多云（白天）',
		'PARTLY_CLOUDY_NIGHT': '多云（夜间）',
		'CLOUDY': '阴',
		'LIGHT_HAZE': '轻度雾霾',
		'MODERATE_HAZE': '中度雾霾',
		'HEAVY_HAZE': '重度雾霾',
		'LIGHT_RAIN': '小雨',
		'MODERATE_RAIN': '中雨',
		'HEAVY_RAIN': '大雨',
		'STORM_RAIN': '暴雨',
		'FOG': '雾',
		'LIGHT_SNOW': '小雪',
		'MODERATE_SNOW': '中雪',
		'HEAVY_SNOW': '大雪',
		'STORM_SNOW': '暴雪',
		'DUST': '浮尘',
		'SAND': '沙尘',
		'WIND': '大风',
	}
	return user_config.weatherEmoji ? weatherEmojiJson[skycon] : weatherTitleJson[skycon]
}



// 问候语 
var hour = currentDate.getHours();
var greeting = "🎁🎁🎁."
if (hour < 5 && hour >= 1) { // 1am - 5am
	greeting = '赶紧睡觉!!!' + user_config.name;
} else if (hour >= 23 || hour < 1) { // 11pm - 1am
	greeting = '睡觉时间.' + user_config.name;
} else if (hour < 11) { // Before noon (5am - 12pm)
	greeting = '早上好.' + user_config.name;
} else if (hour >= 11 && hour <= 13) { // 11am - 1pm
	greeting = '中午好.' + user_config.name;
} else if (hour > 13 && hour <= 17) { // 1pm - 5pm
	greeting = '下午好.' + user_config.name;
} else if (hour > 17 && hour < 23) { // 5pm - 11pm
	greeting = '晚上好.' + user_config.name
}

// 节假日 & 纪念日, 你珍惜的日子, 如果有节假日/纪念日, 问候语会显示为节假日/纪念日信息
if (user_config.memorialDays[currentDate.Format('MM-dd')]) {
	greeting = user_config.memorialDays[currentDate.Format('MM-dd')];

}

//  if (user_config.memorialDays["11-11"]) {
// 	greeting = user_config.memorialDays["11-11"];
// }
//Battery Render 电池进度条
function getBatteryLevel() {
	const batteryLevel = Device.batteryLevel()
	const batteryAscii = Math.round(batteryLevel * 100);
	return batteryAscii + "%";
}
//Year Render  年历进度条
function renderYearProgress() {
	const now = new Date()
	const start = new Date(now.getFullYear(), 0, 1) // Start of this year
	const end = new Date(now.getFullYear() + 1, 0, 1) // End of this year
	const progress = (now - start) / (end - start)
	return renderProgress(progress)
}
function renderProgress(progress) {
	const used = '▓'.repeat(Math.floor(progress * 10))
	const left = '░'.repeat(10 - used.length)
	return `${used}${left} ${Math.floor(progress * 100)}%`
}




if (config.runsInWidget) {
	let widget = new ListWidget()
	widget.backgroundImage = files.readImage(path)

	//Top spacing,顶部间距
	widgetHello.addSpacer(15);

	// Greeting label,问候语
	let hello = widgetHello.addText(greeting);
	createTextWidget(hello, 'e8ffc1', Font.boldSystemFont(35), 1);

	//Spacing between greeting and yearprogress,问候标签与年进度行间距
	widgetHello.addSpacer(5);

	//define horizontal stack,创建一个stack，使下面组件都在同一个stack中，布局为横向布局（hStack0）
	let hStack0 = widgetHello.addStack();
	hStack0.layoutHorizontally();

	// Centers line
	hStack0.addSpacer(0)//Left spacing,向左对齐间距

	// Year icon in stack,年进度图标
	const YearProgressicon = hStack0.addText("🗓 ")
	createTextWidget(YearProgressicon, 'e8ffc1', new Font('Menlo', 12), 1); //opacity,不透明度

	// Year label in stack,年进度标签
	const YearProgress = hStack0.addText("全年 " + renderYearProgress() + " 谦谦君子,温润如玉")
	createTextWidget(YearProgress, '8675a9', new Font('Menlo', 12), 1);


	//Spacing between yearprogress and battery,年进度与电量行间距
	widgetHello.addSpacer(5);

	//define horizontal stack,创建一个stack，使下面组件都在同一个stack中，布局为横向布局（hStack1）
	let hStack1 = widgetHello.addStack();
	hStack1.layoutHorizontally();

	// Centers line
	hStack1.addSpacer(0) //Left spacing,向左对齐间距

	// Battery icon in stack,电量图标、标签
	const batteryicon = hStack1.addText("⚡️ 电能");
	createTextWidget(batteryicon, returnBatteryConfig(3), new Font('Menlo', 12), 1);


	// Battery Progress in stack,电量进度条
	const batteryLine = hStack1.addText(renderBattery());
	createTextWidget(batteryLine, returnBatteryConfig(3), new Font('Menlo', 12), 1);

	function renderBattery() {
		const batteryLevel = Device.batteryLevel();
		const juice = "▓".repeat(Math.floor(batteryLevel * 10));
		const used  = "░".repeat(10 - juice.length)
		const batteryAscii = " " + juice + used + " ";
		return batteryAscii;
	}

	// Battery Status in stack,电量状态
	var battery = getBatteryLevel();
	battery = battery + returnBatteryConfig(2);
	let batterytext = hStack1.addText(battery);
	createTextWidget(batterytext, returnBatteryConfig(1), new Font('Menlo', 12), 1);

	//Spacing between battery and summary,电量与天气行间距
	widgetHello.addSpacer(5);


	var feel = '';
	if (user_config.isShowWeather) {
		feel = '今日温度' + temperature + '\u2103 \xa0\xa0\xa0\xa0' + skycon;
	} else {
		let req = new Request("https://v2.jinrishici.com/one.json");
		let json = await req.loadJSON();
		let poem = json.data.origin.content[0]
		feel = '♥️ ' + poem;
	}

	var hltemptext = widgetHello.addText(feel);
	createTextWidget(hltemptext, '#51adcf', Font.regularSystemFont(12), 0.7);



	//define horizontal stack,创建一个stack，使下面组件都在同一个stack中，布局为横向布局（hStack2）
	let hStack2 = widgetHello.addStack();
	hStack2.layoutHorizontally();

	// Centers line
	hStack2.addSpacer(0)//Left spacing,向左对齐间距

	// Date label,日期
	let time = new Date().Format('MM月dd日');
	const datetext = hStack2.addText(time + "  ");
	createTextWidget(datetext, '#ffffff', Font.regularSystemFont(30), 0.8);


	//tempeture label in stack
	let temptext = hStack2.addText('\xa0\xa0' + Math.round(apparent_temperature).toString() + "\u2103");
	createTextWidget(temptext, '#0278ae', Font.regularSystemFont(30), 1);


	widgetHello.addSpacer();
	widgetHello.setPadding(0, 0, 0, 0)
	widgetHello.backgroundImage = widget.backgroundImage
	Script.setWidget(widgetHello)

	// Script.complete()

} else {
	// 这个地方是截图, 然后根据截图和选择的区域生成一张背景图. 来作为widget的背景图, 看起来就像透明一样的效果
	// Determine if user has taken the screenshot.
	var message
	message = "开始之前，请返回主屏幕并长按进入编辑模式。滑动到最右边的空白页并截图。"
	let exitOptions = ["继续", "退出以截图"]
	let shouldExit = await generateAlert(message, exitOptions)
	if (shouldExit) return

	// Get screenshot and determine phone size.
	let img = await Photos.fromLibrary()
	let height = img.size.height
	let phone = phoneSizes()[height]
	if (!phone) {
		message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次。"
		await generateAlert(message, ["OK"])
		return
	}

	// Prompt for widget size and position.
	message = "您想要创建什么尺寸的小部件？"
	let sizes = ["Small", "Medium", "Large"]
	let size = await generateAlert(message, sizes)
	let widgetSize = sizes[size]

	message = "您想它在什么位置？"
	message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")

	// Determine image crop based on phone size.
	let crop = { w: "", h: "", x: "", y: "" }
	if (widgetSize == "Small") {
		crop.w = phone.small
		crop.h = phone.small
		let positions = ["Top left", "Top right", "Middle left", "Middle right", "Bottom left", "Bottom right"]
		let position = await generateAlert(message, positions)

		// Convert the two words into two keys for the phone size dictionary.
		let keys = positions[position].toLowerCase().split(' ')
		crop.y = phone[keys[0]]
		crop.x = phone[keys[1]]

	} else if (widgetSize == "Medium") {
		crop.w = phone.medium
		crop.h = phone.small

		// Medium and large widgets have a fixed x-value.
		crop.x = phone.left
		let positions = ["Top", "Middle", "Bottom"]
		let position = await generateAlert(message, positions)
		let key = positions[position].toLowerCase()
		crop.y = phone[key]

	} else if (widgetSize == "Large") {
		crop.w = phone.medium
		crop.h = phone.large
		crop.x = phone.left
		let positions = ["Top", "Bottom"]
		let position = await generateAlert(message, positions)

		// Large widgets at the bottom have the "middle" y-value.
		crop.y = position ? phone.middle : phone.top
	}

	// Crop image and finalize the widget.
	let imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))

	message = "您的小部件背景已准备就绪。您想在Scriptable的小部件中使用它还是导出图像？"
	// const exportPhotoOptions = ["在Scriptable中使用",'导出']
	const exportPhotoOptions = ["在Scriptable中使用"]
	const exportPhoto = await generateAlert(message, exportPhotoOptions)

	if (exportPhoto) {
		Photos.save(imgCrop)
	} else {
		files.writeImage(path, imgCrop)
	}
	Script.complete()
}

/// 根据传进来的属性 设置文字显示样式
function createTextWidget(titleWidget, titleColor, font, textOpacity) {
	titleWidget.font = font;
	titleWidget.textColor = new Color(titleColor);
	titleWidget.textOpacity = (textOpacity);
	titleWidget.leftAlignText();
}

/// tag 标记值
//  3 返回电池状态文字
/// 2 返回电池状态的颜色
/// 1 电能的文字颜色
function returnBatteryConfig(tag) {
	let textColor = '008891';
	let battery = " ⚡ 已充满电!请拔下电源!"
	let batteryLinetextColor = '008891';

	let isCharging = Device.isCharging();
	let batteryValue = Device.batteryLevel();

	if (isCharging && batteryValue < 1) {
		textColor = '008891';
		batteryLinetextColor = '008891'; //fon
		battery = " ⚡";
	}
	if (isCharging && batteryValue == 1) {
		textColor = '008891'; //font color,充电状态字体颜色
		batteryLinetextColor = '008891';
		battery = " ⚡ 已充满电!请拔下电源!";
	} else if (batteryValue >= 0.8 && batteryValue <= 1) {
		textColor = 'c4fb6d';
		batteryLinetextColor = 'c4fb6d';
		battery = " 电量充足,很有安全感!";
	} else if (batteryValue >= 0.7 && batteryValue <= 0.8) {
		batteryLinetextColor = 'd3de32';
		textColor = 'd3de32';
		battery = " 电量充足,不出远门没有问题!";
	} else if (batteryValue >= 0.6 && batteryValue <= 0.7) {
		batteryLinetextColor = 'd3de32';
		textColor = 'd3de32';
		battery = " 电量还有大半呢,不用着急充电!";
	} else if (batteryValue >= 0.5 && batteryValue <= 0.6) {
		textColor = 'd3de32';
		batteryLinetextColor = 'e5df88'; //font color,电量偏低字体颜色
		battery = " 电量用了不到一半,不着急充电!";
	} else if (batteryValue >= 0.4 && batteryValue <= 0.5 && !isCharging) {
		batteryLinetextColor = 'e5df88'; //font color,电量偏低字体颜色
		textColor = 'e5df88'; //fon
		battery = " 电量用了一半,有时间就充电啦!";
	} else if (batteryValue >= 0.3 && batteryValue <= 0.4 && !isCharging) {
		batteryLinetextColor = 'e5df88'; //font color,电量偏低字体颜色
		textColor = 'e5df88'; //fon
		battery = " 电量用了大半了,尽快充电啦!";
	} else if (batteryValue >= 0.2 && batteryValue <= 0.3 && !isCharging) {
		batteryLinetextColor = 'ffd571'; //font color,电量偏低字体颜色
		textColor = 'ffd571'; //fon
		battery = " 电量很快用完,赶紧充电啦!";
	} else if (batteryValue >= 0.1 && batteryValue <= 0.2 && !isCharging) {
		textColor = 'ec0101';
		batteryLinetextColor = 'ec0101';
		battery = " 电量就剩不到20%了,尽快充电!";
	} else if (batteryValue <= 0.1 && !isCharging) {
		textColor = 'ec0101';
		batteryLinetextColor = 'ec0101';
		battery = " 电量快耗尽,再不充电我就关机了!";
	}


	switch (tag) {
		case 1:
			return textColor;
			break;
		case 2:
			return battery;
			break;
		case 3:
			return batteryLinetextColor;
			break;
		default:
			return textColor;
			break;
	}
}



// Generate an alert with the provided array of options.
// 生成弹框提示信息
async function generateAlert(message, options) {
	let alert = new Alert()
	alert.message = message
	for (const option of options) {
		alert.addAction(option)
	}
	let response = await alert.presentAlert()
	return response
}

// Crop an image into the specified rect.
// 重新绘制图片
function cropImage(img, rect) {
	let draw = new DrawContext()
	draw.size = new Size(rect.width, rect.height)
	draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y))
	return draw.getImage()
}

// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
	let phones = {
		"2688": {
			"small": 507,
			"medium": 1080,
			"large": 1137,
			"left": 81,
			"right": 654,
			"top": 228,
			"middle": 858,
			"bottom": 1488
		},

		"1792": {
			"small": 338,
			"medium": 720,
			"large": 758,
			"left": 54,
			"right": 436,
			"top": 160,
			"middle": 580,
			"bottom": 1000
		},

		"2436": {
			"small": 465,
			"medium": 987,
			"large": 1035,
			"left": 69,
			"right": 591,
			"top": 213,
			"middle": 783,
			"bottom": 1353
		},

		"2208": {
			"small": 471,
			"medium": 1044,
			"large": 1071,
			"left": 99,
			"right": 672,
			"top": 114,
			"middle": 696,
			"bottom": 1278
		},

		"1334": {
			"small": 296,
			"medium": 642,
			"large": 648,
			"left": 54,
			"right": 400,
			"top": 60,
			"middle": 412,
			"bottom": 764
		},

		"1136": {
			"small": 282,
			"medium": 584,
			"large": 622,
			"left": 30,
			"right": 332,
			"top": 59,
			"middle": 399,
			"bottom": 399
		},
		"1624": {
			"small": 310,
			"medium": 658,
			"large": 690,
			"left": 46,
			"right": 394,
			"top": 142,
			"middle": 522,
			"bottom": 902
		}
	}
	return phones


}