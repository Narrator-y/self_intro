window.onload = function() {
	writeData();
}

function onPublish() {
	check().then(() => {
		saveData();
		writeData();
	})
}

function onClear() {
	document.getElementById("input-name").value = ""
	document.getElementById("comment").value = ""
}

function onDelete(id) {
	// 确认对话框
	if (window.confirm("是否确认删除此条留言?")) {
		localStorage.removeItem(id)
		writeData();
	}
}

function deleteAll() {
	if (localStorage.length > 0) {
		if (window.confirm("删除后无法恢复,是否确认删除?")) {
			localStorage.clear()
			writeData()
		}
	}
}

function check() {
	return new Promise((resolve) => {
		if (document.getElementById("input-name").value != "" &&
			document.getElementById("comment").value != "")
			resolve()
		else {
			alert("请输入昵称及留言内容")
		}
	})
}

function saveData() {
	var name = document.getElementById("input-name").value
	var comment = document.getElementById("comment").value
	if (comment != "") {
		var time = new Date().getTime() + Math.random() * 5
		localStorage.setItem(time, comment + "|" + name + "|" + this.getDateTime())
		document.getElementById("input-name").value = ""
		document.getElementById("comment").value = ""
	}
}

function writeData() {
	var dataHtml = "",
		data = ""
	if (localStorage.length == 0) {
		dataHtml = "<p>暂无留言,快来抢沙发吧~</p>"
	} else {
		dataHtml = ""
		for (var i = localStorage.length - 1; i >= 0; i--) //效率更高的循环方法
		{
			data = localStorage.getItem(localStorage.key(i)).split("|")
			dataHtml += "<p><span class=\"black\">" + data[1] + "</span><span class=\"black\" style=\"float:right\">" + data[2] +
				"</span></p><p class=\"horizontal\" style=\"align-items: flex-start;\"><span style=\"width: 90%;display:block; white-space:pre-wrap;word-wrap: break-word;\">" +
				data[0] +
				"</span><button class=\"btn-del\" style=\"width: 10%;\" onclick=\"onDelete(" +
				localStorage.key(i) + ");\">删除</button></p>";
		}
	}
	document.getElementById("comment-list").innerHTML = dataHtml;
}

function getDateTime() {
	var isZero = function(num) //私有方法，自动补零
	{
		if (num < 10) {
			num = "0" + num;
		}
		return num;
	}

	var d = new Date();
	return d.getFullYear() + "-" + isZero(d.getMonth() + 1) + "-" + isZero(d.getDate()) + " " + isZero(d.getHours()) + ":" +
		isZero(d.getMinutes()) + ":" + isZero(d.getSeconds());
}
