"use strict";

var headerRect = myHeader.getBoundingClientRect (),
    headerRectTop = null,
    headerHeight = myHeader.offsetHeight,
    breakPointTransparent = 100,
    breakPointHide = 450,
    curScrollPos = null,
    prevScrollPos = null,
    alreadyHide = false;  

function getHeaderDistFromTop () {
    return headerRect.top + document.body.scrollTop;
}

function scrollDirection () {
    curScrollPos = getHeaderDistFromTop ();
    if (curScrollPos < breakPointHide) {
        if (curScrollPos > prevScrollPos) {
            headerTransparent ("down");
        } else {
            headerTransparent ("up");
        }
    } else {
        if (curScrollPos > prevScrollPos) {
            headerAutoHide ("down");
        } else {
            headerAutoHide ("up");
        }
    }
    prevScrollPos = curScrollPos;
}

function headerTransparent (dir) {
    headerRectTop = getHeaderDistFromTop ();

    if (dir === "down") {
        if (headerRectTop >= breakPointTransparent && myHeader.classList.contains ("header-nav_transparent")) {
            myHeader.classList.remove ("header-nav_transparent");
        }
    } else if (dir === "up") {
        if (headerRectTop < breakPointTransparent && !myHeader.classList.contains ("header-nav_transparent")) {
            myHeader.classList.add ("header-nav_transparent");
        }
    }
}

function headerAutoHide (dir) {
    headerRectTop = getHeaderDistFromTop ();

    if (dir === "down") {
        if (headerRectTop >= breakPointHide && !alreadyHide) {
            myHeader.style.transition = "top 0.25s";
            myHeader.style.top = "-60px";
            setTimeout(function() {
                myHeader.style.visibility = "hidden";  
            }, 500);
            alreadyHide = true;
        }
    } else if (dir === "up") {
        myHeader.style.visibility = "visible";  
        myHeader.style.transition = "top 0.25s";
        myHeader.style.top = "0px";
        alreadyHide = false;
    }
}

window.addEventListener ("scroll", scrollDirection);