const referer = window.location.href
const id = referer.split('/')[4]
const title = document.getElementsByClassName("hidden-xs big-title-truncate m-t-0")[0].innerText
const [sep] = document.getElementsByClassName("separator m-t-15 p-0")

const [srcSD, srcHD] = Array.from(document.getElementsByTagName("video")[0].childNodes)
	.filter(node => node.nodeName.toLowerCase() === "source")
	.map(source => source.src)

const src = srcHD ?? srcSD
const curl = `curl -e ${referer} ${src} -L -o ${title}.mp4`
const aria = `aria2c --referer ${referer} ${src} `

function run() {
	const box = document.createElement("div");
	const downloadBtn = document.createElement("a");
	const curlPre = document.createElement("pre");
	const curlText = document.createTextNode(`${curl}\n\n${aria}`);
	const downloadBtnText = document.createTextNode("Download");

	curlPre.appendChild(curlText)
	curlPre.style = "white-space:pre-wrap; border: 0px; background-color: #f2f2f2;"

	box.style = "background-color: #f2f2f2; color: #000; border-radius: 0.5rem; border: 1px solid #9c9c9c; padding: 2px;"
	box.appendChild(curlPre);

	downloadBtn.appendChild(downloadBtnText)
	downloadBtn.href = `${src}/${id}.mp4`
	downloadBtn.download = `${id}.mp4`
	downloadBtn.target = "_blank"
	downloadBtn.referrerPolicy = "origin"
	downloadBtn.onclick = () => {
		window.open(`${src}/${id}.mp4`, 'download_window')
		return false
	}

	downloadBtn.type = "video/mp4"
	downloadBtn.className = "btn btn-primary navbar-btn"

	sep.appendChild(box)
	sep.appendChild(downloadBtn)
}

document.body.onload = run