var o=Object.defineProperty;var c=(e,l,t)=>l in e?o(e,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[l]=t;var s=(e,l,t)=>c(e,typeof l!="symbol"?l+"":l,t);class h{constructor(l){s(this,"target");s(this,"handlers",[]);s(this,"scrollHandler");s(this,"bottomLock",!1);s(this,"topLock",!1);s(this,"leftLock",!1);s(this,"rightLock",!1);s(this,"lastScrollX",0);s(this,"lastScrollY",0);s(this,"bottomOffset",20);s(this,"topOffset",20);s(this,"leftOffset",0);s(this,"rightOffset",0);this.target=l}on(l,t){this.handlers.push([l,t]),this.updateScrollHandler()}updateScrollHandler(){this.scrollHandler&&this.target.removeEventListener("scroll",this.scrollHandler),this.scrollHandler=l=>{const t=this.getScrollInfo();this.handlers.forEach(([r,i])=>{switch(r){case"bottom":if(this.bottomLock||t.scrollY==this.lastScrollY)return;t.height-(t.scrollY+t.clientHeight)<=this.bottomOffset&&i(l);break;case"top":if(this.topLock||t.scrollY==this.lastScrollY)return;t.scrollY<=this.topOffset&&i(l);break;case"left":if(this.leftLock||t.clientWidth==t.width||t.scrollX==this.lastScrollX)return;t.scrollX<=this.leftOffset&&i(l);break;case"right":if(this.rightLock||t.clientWidth==t.width||t.scrollX==this.lastScrollX)return;t.width-(t.scrollX+t.clientWidth)<=this.rightOffset&&i(l);break}}),this.lastScrollX=t.scrollX,this.lastScrollY=t.scrollY},this.target.addEventListener("scroll",this.scrollHandler)}getScrollInfo(){return this.target instanceof Window?{scrollX:this.target.scrollX,scrollY:this.target.scrollY,width:document.body.offsetWidth,height:document.body.offsetHeight,clientWidth:window.innerWidth,clientHeight:window.innerHeight}:{scrollX:this.target.scrollLeft,scrollY:this.target.scrollTop,width:this.target.scrollWidth,height:this.target.scrollHeight,clientWidth:this.target.clientWidth,clientHeight:this.target.clientHeight}}off(l){this.handlers=this.handlers.filter(t=>t[1]!=l),this.updateScrollHandler()}}Object.defineProperty(window,"ScrollEventMaster",{value:h});
