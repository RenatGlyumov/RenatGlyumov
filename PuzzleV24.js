let xi, yi, xn, yn
let xi1, xi2, yi1, yi2
let width, height
let aVertical, aHorizontal
let oVertical, oHorizontal
let vertical
let offset
let a, b, c, d, e
let t, j
let oImg, oSvg
let min = 40
let mm = 3.793627
let scl = 1
let flip

function randomBool() { return Math.random() > 0.5 }
function uniform(min, max) { return min + Math.random() * (max - min) }

function first()  { 
    e = uniform(-j, j)
    next() 
}

function next() {
    let flipold = flip 
    flip = randomBool() 
    a = (flip == flipold ? -e: e)
    b = uniform(-j, j) 
    c = uniform(-j, j) 
    d = uniform(-j, j) 
    e = uniform(-j, j)
}

function sw() { return vertical ? width/xn : height/yn }
function sl() { return vertical ? height/yn : width/xn }

function ow() { return offset + sw() * (vertical ? xi : yi) }
function ol() { return offset + sl() * (vertical ? yi : xi) }

function  w(val) { return Math.round((ow() + sw() * val * (flip ? -1 : 1)) * 100) / 100 }
function  l(val) { return Math.round((ol() + sl() * val) * 100) / 100 }

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

function index(i) { return i * 9 }

function getVertical() {

    let i = index(yi1-1)
    let N = index(yi2+1) + 1

    let vertical = []

    while (i < N) {
        let point = aVertical[xi-1][i]
        vertical[vertical.length] = {x: point.x * scl, y: point.y * scl}
        i = i + 1
    }

    return vertical
}

function getHorizontal() {

    let i = index(xi1-1)
    let N = index(xi2+1) + 1

    let horizontal = []

    while (i < N) {
        let point = aHorizontal[yi-1][i]
        horizontal[horizontal.length] = {x: point.x * scl, y: point.y * scl}
        i = i + 1
    }

    return horizontal
}

genPuzzleButton.onclick = function () {

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
}

function genPuzzle() {
    oSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    oSvg.id = "field"
    oSvg.style.width = width
    oSvg.style.height = height
    oSvg.style.position = "absolute"

    if (document.getElementById("field") == null)
        view.appendChild(oSvg)
    else
        view.replaceChild(oSvg, field)

    t = 20/200
    j = 8/100

    offset = 0

    aVertical = []
    aHorizontal = []
    
    vertical = 1
    for (xi = 1; xi < xn; xi += 1) {
        aVertical[xi-1] = []
        yi = 0
        aVertical[xi-1][0] = point(p0w, p0l)    
        first()
        for (; yi < yn; yi += 1) {
            aVertical[xi-1][yi * 9 + 1] = point(p1w, p1l)
            aVertical[xi-1][yi * 9 + 2] = point(p2w, p2l)
            aVertical[xi-1][yi * 9 + 3] = point(p3w, p3l)
            aVertical[xi-1][yi * 9 + 4] = point(p4w, p4l)
            aVertical[xi-1][yi * 9 + 5] = point(p5w, p5l)
            aVertical[xi-1][yi * 9 + 6] = point(p6w, p6l)
            aVertical[xi-1][yi * 9 + 7] = point(p7w, p7l)
            aVertical[xi-1][yi * 9 + 8] = point(p8w, p8l)
            aVertical[xi-1][yi * 9 + 9] = point(p9w, p9l)
            next()
        }
    }

    vertical = 0
    for (yi = 1; yi < yn; yi += 1) {
        aHorizontal[yi-1] = []
        xi = 0
        aHorizontal[yi-1][0] = point(p0l, p0w)
        first()
        for (; xi < xn; xi += 1) {
            aHorizontal[yi-1][xi * 9 + 1] = point(p1l, p1w)
            aHorizontal[yi-1][xi * 9 + 2] = point(p2l, p2w)
            aHorizontal[yi-1][xi * 9 + 3] = point(p3l, p3w)
            aHorizontal[yi-1][xi * 9 + 4] = point(p4l, p4w)
            aHorizontal[yi-1][xi * 9 + 5] = point(p5l, p5w)
            aHorizontal[yi-1][xi * 9 + 6] = point(p6l, p6w)
            aHorizontal[yi-1][xi * 9 + 7] = point(p7l, p7w)
            aHorizontal[yi-1][xi * 9 + 8] = point(p8l, p8w)
            aHorizontal[yi-1][xi * 9 + 9] = point(p9l, p9w)
            next()
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

function xxl(x) { return x / (field.clientWidth / xn) }
function yyl(y) { return y / (field.clientHeight / yn) }

function fx1(x) { let xi = Math.floor(xxl(x)); return xi > 0 ? xi : 1 }
function fx2(x) { let xi = Math.ceil(xxl(x)); return xi < xn ? xi : xn-1 }

function fy1(y) { let yi = Math.floor(yyl(y)); return yi > 0 ? yi : 1 }
function fy2(y) { let yi = Math.ceil(yyl(y)); return yi < yn ? yi : yn-1 }

function dataToSvg(data) {
    let j = 0
    let string = `M ${data[j].x} ${data[j].y}`
    for (; j+3 < data.length; j += 3) 
        string += ` C ${data[j+1].x} ${data[j+1].y} ${data[j+2].x} ${data[j+2].y} ${data[j+3].x} ${data[j+3].y}`
    return string
}

function getPath(data) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", dataToSvg(data))
    return path
}

function fillView(x1, x2, y1, y2) {

    oVertical = []
    oHorizontal = []
    
    xi1 = fx1(x1)
    xi2 = fx2(x2)
    yi1 = fy1(y1)
    yi2 = fy2(y2)

    xi = xi1
    while (xi <= xi2) {
        oVertical[xi-xi1] = field.appendChild(getPath(getVertical()))
        xi += 1
    }
    
    yi = yi1
    while (yi <= yi2) {
        oHorizontal[yi-yi1] = field.appendChild(getPath(getHorizontal()))
        yi += 1
    }
}

function scale(dln) {

    if (scl > 1 || dln > 0) {
        
        while (field.childNodes.length != 0)
            field.removeChild(field.childNodes[field.childNodes.length-1])
        
        scl = dln ? scl * 1.2 : scl / 1.2

        let cx = view.scrollLeft + view.clientWidth / 2
        let cy = view.scrollTop + view.clientHeight / 2

        field.style.width = dln ? field.clientWidth * 1.2 : field.clientWidth / 1.2
        field.style.height = dln ? field.clientHeight * 1.2 : field.clientHeight / 1.2

        cx = dln ? cx * 1.2 : cx / 1.2
        cy = dln ? cy * 1.2 : cy / 1.2

        let x1 = cx - view.clientWidth / 2
        let x2 = cx + view.clientWidth / 2

        if (x1 < 0) {
            x1 = 0
            x2 = x1 + view.clientWidth
        }
        else if (x2 > field.clientWidth) {
            x2 = field.clientWidth
            x1 = x2 - view.clientWidth
        }

        let y1 = cy - view.clientHeight / 2
        let y2 = cy + view.clientHeight / 2

        if (y1 < 0) {
            y1 = 0
            y2 = y1 + view.clientHeight
        }
        else if (y2 > field.clientHeight) {
            y2 = field.clientHeight
            y1 = y2 - view.clientHeight
        }

        fillView(x1, x2, y1, y2)
        view.scroll(x1, y1)
    }
}

function scroll() {

    let _xi1 = fx1(view.scrollLeft)
    let _xi2 = fx2(view.scrollLeft + view.clientWidth)
    let _yi1 = fy1(view.scrollTop)
    let _yi2 = fy2(view.scrollTop + view.clientHeight)

    let i

    if (_xi1 < xi2 || _xi2 > xi2) {
        if (_xi1 < xi1) {
            xi = xi1
            while (xi > _xi1) {
                xi -= 1
                field.removeChild(oVertical[i=oVertical.length-1])
                while (i > 0) { oVertical[i] = oVertical[i-1]; i -= 1 }
                oVertical[i] = field.appendChild(getPath(getVertical()))
            }
            xi1 = xi
            xi2 = xi1 + oVertical.length - 1
        }
        else if (_xi2 > xi2) {
            xi = xi2
            while (xi < _xi2) {
                xi += 1
                field.removeChild(oVertical[i=0])
                while (i+1 < oVertical.length) { oVertical[i] = oVertical[i+1]; i += 1 }
                oVertical[i] = field.appendChild(getPath(getVertical()))
            }
            xi2 = xi
            xi1 = xi2 - oVertical.length + 1
        }
        yi = yi1
        while (yi <= yi2) {
            let obj = getPath(getHorizontal())
            field.replaceChild(obj, oHorizontal[yi-yi1])
            oHorizontal[yi-yi1] = obj
            yi += 1
        }
    }

    if (_yi1 < yi1 || _yi2 > yi2) {
        if (_yi1 < yi1) {
            yi = yi1
            while (yi > _yi1) {
                yi -= 1
                field.removeChild(oHorizontal[i=oHorizontal.length-1])
                while (i > 0) { oHorizontal[i] = oHorizontal[i-1]; i -= 1 }
                oHorizontal[i] = field.appendChild(getPath(getHorizontal()))
            }
            yi1 = yi
            yi2 = yi1 + oHorizontal.length - 1
        }
        else if (_yi2 > yi2) {
            yi = yi2
            while (yi < _yi2) {
                yi += 1
                field.removeChild(oHorizontal[i=0])
                while (i+1 < oHorizontal.length) { oHorizontal[i] = oHorizontal[i+1]; i += 1 }
                oHorizontal[i] = field.appendChild(getPath(getHorizontal()))
            }
            yi2 = yi
            yi1 = yi2 - oHorizontal.length + 1
        }
        xi = xi1
        while (xi <= xi2) {
            let obj = getPath(getVertical())
            field.replaceChild(obj, oVertical[xi-xi1])
            oVertical[xi-xi1] = obj
            xi += 1
        }
    }
}

plus.onclick = function () { scale(1) }
minus.onclick = function () { scale(0) }

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

function isSide(si) {
    switch (si) {
        case 1: return cell.yi1 >  0 ? 1 : 0
        break
        case 2: return cell.xi2 < xn ? 2 : 0
        break
        case 3: return cell.yi2 < yn ? 3 : 0
        break
        case 4: return cell.xi1 >  0 ? 4 : 0
        break
    }
}

let detail
let cell

function writeSmallBig() {

    let i = index(vertical ? cell.yi1 : cell.xi1)
    let N = index(vertical ? cell.yi2 : cell.xi2) + 1

    while (i < N) {
        
        let a = vertical ? aVertical[xi-1][i] : aHorizontal[yi-1][i]
        if (detail.length == 0)
            detail[detail.length] = a
        else {
            let la = detail[detail.length-1]
            if (a.x != la.x || a.y != la.y) detail[detail.length] = a
        }
        i += 1
    }
}
function writeBigSmall() {
    
    let i = index(vertical ? cell.yi2 : cell.xi2)
    let N = index(vertical ? cell.yi1 : cell.xi1) - 1
    
    while (i > N) {

        let a = vertical ? aVertical[xi-1][i] : aHorizontal[yi-1][i]
        if (detail.length == 0)
            detail[detail.length] = a
        else {
            let la = detail[detail.length-1]
            if (a.x != la.x || a.y != la.y) detail[detail.length] = a
        }
        i -= 1
    }
}
function setSide(si) {
    switch (si) {
        case 1: {
            vertical = 0
            yi = cell.yi1
            writeSmallBig()
        }
        break
        case 2: {
            vertical = 1
            xi = cell.xi2
            writeSmallBig()
        }
        break
        case 3: {
            vertical = 0
            yi = cell.yi2
            writeBigSmall()
        }
        break
        case 4: {
            vertical = 1
            xi = cell.xi1
            writeBigSmall()
        }
        break
    }
}
getFile.onclick = function () {
    
    let i = 0
    let N = xn * yn
    let sequence
    let j
    let sl

    let svg = new String

    while (i < N) {
        
        let xi1 = i % xn
        let yi1 = (i - xi1) / xn

        if (Boolean(xi1 % 2) == Boolean(yi1 % 2)) {
            
            detail = []

            let xi2 = xi1 + 1
            let yi2 = yi1 + 1

            cell = {xi1: xi1, xi2: xi2, yi1: yi1, yi2: yi2}
            
            sequence = []

            sequence[0] = isSide(1)
            sequence[1] = isSide(2)
            sequence[2] = isSide(3)
            sequence[3] = isSide(4)

            if ((sequence[0] * sequence[1] * sequence[2] * sequence[3]) == 0) {
                while (sequence[0] == 0 || sequence[sequence.length-1] != 0) {
                    j = sequence.length-1
                    sl = sequence[j]
                    while (j > 0) {
                        sequence[j] = sequence[j-1]
                        j -= 1
                    }
                    sequence[j] = sl
                }
            }

            j = 0
            while (sequence[j] != 0 && j < 4) {
                setSide(sequence[j])
                j += 1
            }
            svg += `<path d="${dataToSvg(detail)}"></path>`
        }
        i += 1
    }
    
    svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2px" width="${width}" height="${height}">${svg}</svg>`
    fileDownload.setAttribute('href', 'data:text/plain; charset=utf-8,' + encodeURIComponent(svg))
    fileDownload.setAttribute('download', "puzzle.svg")
}

tiltTail.onchange = function () {
    console.log()
}

sizeTail.onchange = function () {

}

