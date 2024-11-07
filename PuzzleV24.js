let xi, yi, xn, yn, xi1, xi2, yi1, yi2
let x1, y1
let width, height
let aVertical, aHorizontal
let oVertical = []
let oHorizontal = []
let vertical, offset, i
let a, b, c, d, e
let t, j
let oImg, oSvg
let oxi, oyi
let min = 40
let mm = 3.793627
let scl = 1
function uniform(min, max) { return min + Math.random() * (max - min) }
function sw() { return vertical ? width/xn : height/yn }
function sl() { return vertical ? height/yn : width/xn }
function ow() { return offset + sw() * (vertical ? xi : yi) }
function ol() { return offset + sl() * (vertical ? yi : xi) }
function  w(val) { return Math.round((ow() + sw() * val) * 100) / 100 }
function  l(val) { return Math.round((ol() + sl() * val) * 100) / 100 }
//function  w(val) { return ow() + sw() * val }
//function  l(val) { return ol() + sl() * val }
function p0l() { return l(0.0) }
function p0w() { return w(0.0) }
function p1l() { return l(0.2) }
function p1w() { return w(a) }
function p2l() { return l(0.5 + b + d) }
function p2w() { return w(-t + c) }
function p3l() { return l(0.5 - t + b) }
function p3w() { return w(t + c) }
function p4l() { return l(0.5 - 2.0 * t + b - d) }
function p4w() { return w(3.0 * t + c) }
function p5l() { return l(0.5 + 2.0 * t + b - d) }
function p5w() { return w(3.0 * t + c) }
function p6l() { return l(0.5 + t + b) }
function p6w() { return w(t + c) }
function p7l() { return l(0.5 + b + d) }
function p7w() { return w(-t + c) }
function p8l() { return l(0.8) }
function p8w() { return w(e) }
function p9l() { return l(1.0) }
function p9w() { return w(0.0) }
function point(callBack1, callBack2) { return {x: callBack1(), y: callBack2()} }

function update() {
    a = uniform(-j, j) 
    b = uniform(-j, j) 
    c = uniform(-j, j) 
    d = uniform(-j, j) 
    e = uniform(-j, j)
}

function index(i) { return i * 9 }

function getVertical() {

    let i = index(yi1)
    let N = index(yi2) + 1
    let a

    let vertical = []

    while (i < N) {
        a = aVertical[xi-1][i]
        a.x = a.x * scl
        a.y = a.y * scl
        vertical[vertical.length] = a
        i = i + 1
    }

    return vertical
}

function getHorizontal() {

    let i = index(xi1)
    let N = index(xi2) + 1

    let horizontal = []

    while (i < N) {
        a = aHorizontal[yi-1][i]
        a.x = a.x * scl
        a.y = a.y * scl
        horizontal[horizontal.length] = a
        i = i + 1
    }

    return horizontal
}

genPuzzleButton.onclick = function () {
    
    //width = 10 * 1000 * mm
    //height = 10 * 1000 * mm
    //XN = 1000
    //yn = 1000

    width = inputWidth.value
    height = inputHeight.value
    xn = inputXn.value
    yn = inputYn.value
    
    genPuzzle()
    setStylePosition(field)
    if (document.getElementById("fillImg")) {
        fillImg.style.width = width
        fillImg.style.height = height
        setStylePosition(fillImg)
    }
    //view.onscroll = scroll2
}

function genPuzzle() {
    view.onscroll = scroll
    oSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    oSvg.id = "field"
    oSvg.style.width = width
    oSvg.style.height = height
    oSvg.style.position = "absolute"

    if (document.getElementById("field") == null)
        view.appendChild(oSvg)
    else
        view.replaceChild(oSvg, field)

    t = 18 / 200
    j =  8 / 100

    offset = 0

    aVertical = []
    aHorizontal = []
    
    vertical = 1
    for (xi = 1; xi < xn; xi += 1) {
        aVertical[xi-1] = []
        yi = 0
        aVertical[xi-1][0] = point(p0w, p0l)    
        for (; yi < yn; yi += 1) {
            update()
            aVertical[xi-1][yi * 9 + 1] = point(p1w, p1l)
            aVertical[xi-1][yi * 9 + 2] = point(p2w, p2l)
            aVertical[xi-1][yi * 9 + 3] = point(p3w, p3l)
            aVertical[xi-1][yi * 9 + 4] = point(p4w, p4l)
            aVertical[xi-1][yi * 9 + 5] = point(p5w, p5l)
            aVertical[xi-1][yi * 9 + 6] = point(p6w, p6l)
            aVertical[xi-1][yi * 9 + 7] = point(p7w, p7l)
            aVertical[xi-1][yi * 9 + 8] = point(p8w, p8l)
            aVertical[xi-1][yi * 9 + 9] = point(p9w, p9l)
        }
    }

    vertical = 0
    for (yi = 1; yi < yn; yi += 1) {
        aHorizontal[yi-1] = []
        xi = 0
        aHorizontal[yi-1][0] = point(p0l, p0w)
        for (; xi < xn; xi += 1) {
            update()
            aHorizontal[yi-1][xi * 9 + 1] = point(p1l, p1w)
            aHorizontal[yi-1][xi * 9 + 2] = point(p2l, p2w)
            aHorizontal[yi-1][xi * 9 + 3] = point(p3l, p3w)
            aHorizontal[yi-1][xi * 9 + 4] = point(p4l, p4w)
            aHorizontal[yi-1][xi * 9 + 5] = point(p5l, p5w)
            aHorizontal[yi-1][xi * 9 + 6] = point(p6l, p6w)
            aHorizontal[yi-1][xi * 9 + 7] = point(p7l, p7w)
            aHorizontal[yi-1][xi * 9 + 8] = point(p8l, p8w)
            aHorizontal[yi-1][xi * 9 + 9] = point(p9l, p9w)
        }
    }

    let x1, x2, y1, y2

    if (view.scrollWidth > view.clientWidth) {
        x1 = (view.scrollWidth - view.clientWidth) / 2
        x2 = (view.scrollWidth + view.clientWidth) / 2
    }
    else {
        x1 = 0
        x2 = view.clientWidth
    }

    if (view.scrollHeight > view.clientHeight) {
        y1 = (view.scrollHeight - view.clientHeight) / 2
        y2 = (view.scrollHeight + view.clientHeight) / 2
    }
    else {
        y1 = 0
        y2 = view.clientHeight
    }

    view.scroll(x1, y1)
    fillView(x1, x2, y1, y2)
    view.onscroll = scroll
}

function dxl(x) { return x / (field.clientWidth / xn) }
function dyl(y) { return y / (field.clientHeight / yn) }

function clxi(x) { return Math.ceil(dxl(x)) }
function flxi(x) { return Math.floor(dxl(x)) }

function clyi(y) { return Math.ceil(dyl(y)) }
function flyi(y) { return Math.floor(dyl(y)) }

function fillView(x1, x2, y1, y2) {

    let i
    let length = view.clientWidth

    oxi = x1 > 0 ? clxi(x1) : 1
    length = flxi(x2) - oxi + 1

    yi1 = flyi(y1)
    yi2 = clyi(y2)

    for (i = 0; i < length; i += 1) {
        xi = oxi + i
        oVertical[i] = field.appendChild(getPath(getVertical()))
    }
    
    oyi = y1 > 0 ? clyi(y1) : 1
    length = flyi(y2) - oyi + 1

    xi1 = flxi(x1)
    xi2 = clxi(x2)

    for (i = 0; i < length; i += 1) {
        yi = oyi + i
        oHorizontal[i] = field.appendChild(getPath(getHorizontal()))
    }
}

function string(data) {
    let j = 0
    let string = `M ${data[j].x} ${data[j].y}`
    for (; j+3 < data.length; j += 3) 
        string += ` C ${data[j+1].x} ${data[j+1].y} ${data[j+2].x} ${data[j+2].y} ${data[j+3].x} ${data[j+3].y}`
    return string
}

function getPath(data) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", string(data))
    return path
}

async function scroll() {
    
    let j
    let si
    let i
    let obj

    si = view.scrollLeft > 0 ? clxi(view.scrollLeft) : 1


    if (si != oxi && si+oVertical.length-1 < xn) {
        console.log(si, si+oVertical.length-1)
        if (si < oxi) {
            xi = oxi
            while (xi > si) {
                xi -= 1
                j = oVertical.length - 1
                field.removeChild(oVertical[j])
                for(; j > 0; j -= 1)
                    oVertical[j] = oVertical[j-1]
                oVertical[j] = field.appendChild(getPath(getVertical()))
            }
        }
        else if (si > oxi) {
            xi = oxi + oVertical.length - 1
            while (xi < si + oVertical.length - 1) {
                xi += 1
                j = 0
                field.removeChild(oVertical[j])
                for(; j+1 < oVertical.length; j += 1) 
                    oVertical[j] = oVertical[j+1]
                oVertical[j] = field.appendChild(getPath(getVertical()))
            }
        }
        oxi = si

        xi1 = oxi-1
        xi2 = oxi+oVertical.length

        i = 0
        while (i < oHorizontal.length) {
            yi = oyi + i
            obj = getPath(getHorizontal())
            field.replaceChild(obj, oHorizontal[i])
            oHorizontal[i] = obj
            i += 1
        }
    }
    
    si = view.scrollTop > 0 ? clyi(view.scrollTop) : 1
    
    if (si != oyi && si+oHorizontal.length-1 < yn) {
        console.log(si, si+oHorizontal.length-1)
        if (si < oyi) {
            yi = oyi
            while (yi > si) {
                yi -= 1
                field.removeChild(oHorizontal[j=oHorizontal.length-1])
                for (; j > 0; j -= 1)
                    oHorizontal[j] = oHorizontal[j-1]
                oHorizontal[j] = field.appendChild(getPath(getHorizontal()))
            }
        }
        else if (si > oyi) {
            yi = oyi+oHorizontal.length-1
            while (yi < si+oHorizontal.length-1) {
                yi += 1
                field.removeChild(oHorizontal[j=0])
                for (; j+1 < oHorizontal.length; j += 1)
                    oHorizontal[j] = oHorizontal[j+1]
                oHorizontal[j] = field.appendChild(getPath(getHorizontal()))
            }
        }
        oyi = si
        
        yi1 = oyi-1
        yi2 = oyi+oHorizontal.length
        
        i = 0
        while (i < oVertical.length) {
            xi = oxi + i
            obj = getPath(getVertical())
            field.replaceChild(obj, oVertical[i])
            oVertical[i] = obj
            i += 1
        }
    }
}

function loaded () {
    
    oImg.style.position = "absolute"

    if (document.getElementById("fillImg") == null)
        view.appendChild(oImg)
    else
        view.replaceChild(oImg, fillImg)

    // Здесь мы записываем в поля ввода
    width = inputWidth.value = fillImg.width
    height = inputHeight.value = fillImg.height
    
    if ((s1(width) >= 2 && s1(height) >= 1) || 
        (s1(width) >= 1 && s1(height) >= 2)) 
    {    
        inputXn.value = xn = s2(width)
        inputYn.value = yn = s2(height)
    }
    else {
        // Размер пазла слишком маленький
    }

    genPuzzle()
    setStylePosition(fillImg)
    setStylePosition(field)
}

loading.onchange = function () {
    oImg = document.createElement("img")
    oImg.id = "fillImg"
    oImg.onload = loaded
    oImg.src = URL.createObjectURL(loading.files[0])
}

let down
view.onmousemove = null

view.onmousedown = function (push) {
    down = push
    view.onmousemove = mouseMoveReaction
}

function mouseMoveReaction(push) {
    let left = view.scrollLeft + (down.pageX - push.pageX)
    let top  =  view.scrollTop + (down.pageY - push.pageY)
    down = push
    view.scroll(left, top)
    //view.onmousemove = null
}

view.onmouseup = function () {
    view.onmousemove = null
}

plus.onclick = function () { scale(0.2) }
minus.onclick = function () { scale(-0.2) }

function scale(val) {

    scl = scl + val

    if (document.getElementById("field")) {
        
    }    
}

function setStylePosition(elem) {
    
    if (view.clientWidth > elem.clientWidth)
        elem.style.left = (view.clientWidth - elem.clientWidth) / 2.0
    else
        elem.style.left = 0

    if (view.clientHeight > elem.clientHeight)
        elem.style.top = (view.clientHeight - elem.clientHeight) / 2.0
    else 
        elem.style.top = 0
}

function setScrollPosition(ml) {
    if (view.scrollWidth > view.clientWidth)
        view.scrollLeft = view.scrollLeft * ml + view.clientWidth * (ml-1)/2
    if (view.scrollHeight > view.clientHeight)
        view.scrollTop = view.scrollTop * ml + view.clientHeight * (ml-1)/2
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

let detail = []
let dwi

function in(a) {

}

function addSide(si) {
    let i
    let N

    if (si == 1) {
        if (xi1 > 0) {
            i = index(xi1)
            N = index(xi2)
        }
    }

    while (i < N) {

        i += 1
    }
}

function xicell(cell) { return cell % xn }
function yicell(cell) { return (cell - (cell % xn)) / xn }
function isEvenNum(num) { return !Boolean(num % 2) }

getFile.onclick = function () {
    
    dwi = 0    
    let cell = 0
    let N = xn * yn
    
    while (cell < N) {
        
        yi1 = yicell(cell)
        xi1 = xicell(cell)
        yi2 = yi1 + 1
        xi2 = xi1 + 1
        
        addSide(1)
        addSide(2)
        addSide(3)
        addSide(4)

        cell += 1
    }
}





