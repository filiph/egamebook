(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(b7){if(a2[b7])return
a2[b7]=true
var a5=a4.pending[b7]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[b7].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[b7]
var b5=b4.prototype
b5.constructor=b4
b5.$isd=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[b7]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(b5.$isaO)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="A"){processStatics(init.statics[b1]=b2.A,b3)
delete b2.A}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.e7"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.e7"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.e7(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b5=function(){}
var dart=[["","",,H,{"^":"",tM:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aO:{"^":"d;",
t:function(a,b){return a===b},
gw:function(a){return H.av(a)},
k:function(a){return H.cG(a)},
gbj:function(a){return new H.an(H.hD(a),null)}},
eN:{"^":"aO;",
k:function(a){return String(a)},
gw:function(a){return a?519018:218159},
gbj:function(a){return C.a3},
$isW:1},
eP:{"^":"aO;",
t:function(a,b){return null==b},
k:function(a){return"null"},
gw:function(a){return 0},
gbj:function(a){return C.a1},
$isal:1},
eT:{"^":"aO;",
gw:function(a){return 0},
gbj:function(a){return C.a0},
k:function(a){return String(a)},
$iseQ:1},
tQ:{"^":"eT;"},
bi:{"^":"eT;"},
bW:{"^":"aO;$ti",
fl:function(a,b){if(!!a.immutable$list)throw H.c(new P.O(b))},
cq:function(a,b){if(!!a.fixed$length)throw H.c(new P.O(b))},
q:function(a,b){this.cq(a,"add")
a.push(b)},
b8:function(a){this.cq(a,"removeLast")
if(a.length===0)throw H.c(H.az(a,-1))
return a.pop()},
ar:function(a,b){var z
this.cq(a,"remove")
for(z=0;z<a.length;++z)if(J.f(a[z],b)){a.splice(z,1)
return!0}return!1},
il:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bU:function(a,b){return new H.J(a,b,[H.m(a,0)])},
an:function(a,b){var z
this.cq(a,"addAll")
for(z=J.aj(b);z.u();)a.push(z.d)},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aX:function(a,b){return new H.ak(a,b,[H.m(a,0),null])},
dB:function(a,b){return H.fz(a,b,null,H.m(a,0))},
b4:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bf:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.ad())},
fu:function(a,b){return this.bf(a,b,null)},
ai:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gft:function(a){if(a.length>0)return a[0]
throw H.c(H.ad())},
gC:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ad())},
gbY:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.ad())
throw H.c(H.dh())},
aO:function(a,b,c,d,e){var z,y,x
this.fl(a,"setRange")
P.cJ(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.Y(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eM())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bK:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cQ:function(a,b){var z
this.fl(a,"sort")
z=b==null?P.qV():b
H.c4(a,0,a.length-1,z)},
eF:function(a){return this.cQ(a,null)},
eh:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
bs:function(a,b){return this.eh(a,b,0)},
a_:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gK:function(a){return a.length===0},
gaf:function(a){return a.length!==0},
k:function(a){return P.bV(a,"[","]")},
bv:function(a){return P.aZ(a,H.m(a,0))},
gY:function(a){return new J.bQ(a,a.length,0,null,[H.m(a,0)])},
gw:function(a){return H.av(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cq(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cl(b,"newLength",null))
if(b<0)throw H.c(P.Y(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
m:function(a,b,c){if(!!a.immutable$list)H.h(new P.O("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
a[b]=c},
$iscC:1,
$ascC:I.b5,
$isI:1,
$isT:1},
tL:{"^":"bW;$ti"},
bQ:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.as(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bX:{"^":"aO;",
bq:function(a,b){var z
if(typeof b!=="number")throw H.c(H.P(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd8(b)
if(this.gd8(a)===z)return 0
if(this.gd8(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd8:function(a){return a===0?1/a<0:a<0},
fW:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.O(""+a+".round()"))},
dl:function(a,b){var z
if(b>20)throw H.c(P.Y(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd8(a))return"-"+z
return z},
kk:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.Y(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cr(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.O("Unexpected toString result: "+z))
x=J.K(y)
z=x.i(y,1)
w=+x.i(y,3)
if(x.i(y,2)!=null){z+=x.i(y,2)
w-=x.i(y,2).length}return z+C.b.bW("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
eB:function(a){return-a},
a1:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a+b},
aI:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a-b},
cL:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a/b},
bW:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a*b},
bB:function(a,b){return(a|0)===a?a/b|0:this.iv(a,b)},
iv:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.O("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
d_:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aG:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<b},
by:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>b},
bV:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<=b},
bE:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>=b},
gbj:function(a){return C.a6},
$isL:1},
eO:{"^":"bX;",
gbj:function(a){return C.a5},
$isaM:1,
$isL:1,
$isu:1},
ku:{"^":"bX;",
gbj:function(a){return C.a4},
$isaM:1,
$isL:1},
bY:{"^":"aO;",
cr:function(a,b){if(b<0)throw H.c(H.az(a,b))
if(b>=a.length)H.h(H.az(a,b))
return a.charCodeAt(b)},
cc:function(a,b){if(b>=a.length)throw H.c(H.az(a,b))
return a.charCodeAt(b)},
e8:function(a,b,c){if(c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
return new H.pn(b,a,c)},
e7:function(a,b){return this.e8(a,b,0)},
fG:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cr(b,c+y)!==this.cc(a,y))return
return new H.fy(c,b,a)},
a1:function(a,b){if(typeof b!=="string")throw H.c(P.cl(b,null,null))
return a+b},
ed:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bz(a,y-z)},
k5:function(a,b,c){H.bo(c)
return H.p(a,b,c)},
k6:function(a,b,c,d){H.bo(c)
P.lE(d,0,a.length,"startIndex",null)
return H.bO(a,b,c,d)},
df:function(a,b,c){return this.k6(a,b,c,0)},
hr:function(a,b,c){var z
if(c>a.length)throw H.c(P.Y(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.ia(b,a,c)!=null},
dC:function(a,b){return this.hr(a,b,0)},
ax:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.P(c))
if(b<0)throw H.c(P.c0(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.c0(b,null,null))
if(c>a.length)throw H.c(P.c0(c,null,null))
return a.substring(b,c)},
bz:function(a,b){return this.ax(a,b,null)},
h0:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cc(z,0)===133){x=J.di(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cr(z,w)===133?J.kv(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kl:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cc(z,0)===133?J.di(z,1):0}else{y=J.di(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bW:function(a,b){var z,y
if(typeof b!=="number")return H.x(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.E)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eh:function(a,b,c){var z
if(c>a.length)throw H.c(P.Y(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bs:function(a,b){return this.eh(a,b,0)},
jI:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jH:function(a,b){return this.jI(a,b,null)},
iW:function(a,b,c){if(b==null)H.h(H.P(b))
if(c>a.length)throw H.c(P.Y(c,0,a.length,null,null))
return H.tn(a,b,c)},
a_:function(a,b){return this.iW(a,b,0)},
gK:function(a){return a.length===0},
gaf:function(a){return a.length!==0},
bq:function(a,b){var z
if(typeof b!=="string")throw H.c(H.P(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gw:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbj:function(a){return C.a2},
gl:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
$iscC:1,
$ascC:I.b5,
$isq:1,
$isdy:1,
A:{
eR:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
di:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cc(a,b)
if(y!==32&&y!==13&&!J.eR(y))break;++b}return b},
kv:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cr(a,z)
if(y!==32&&y!==13&&!J.eR(y))break}return b}}}}],["","",,H,{"^":"",
ha:function(a){return a},
ad:function(){return new P.F("No element")},
dh:function(){return new P.F("Too many elements")},
eM:function(){return new P.F("Too few elements")},
c4:function(a,b,c,d){if(c-b<=32)H.fr(a,b,c,d)
else H.fq(a,b,c,d)},
fr:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.K(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a0(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.i(a,v))
w=v}y.m(a,w,x)}},
fq:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bB(c-b+1,6)
y=b+z
x=c-z
w=C.e.bB(b+c,2)
v=w-z
u=w+z
t=J.K(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.a0(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a0(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a0(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a0(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}t.m(a,y,s)
t.m(a,w,q)
t.m(a,x,o)
t.m(a,v,t.i(a,b))
t.m(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.f(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.n(i)
if(h.t(i,0))continue
if(h.aG(i,0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.a9(i)
if(h.by(i,0)){--l
continue}else{g=l-1
if(h.aG(i,0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
l=g
m=f
break}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(J.bP(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else if(J.a0(d.$2(j,p),0))for(;!0;)if(J.a0(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bP(d.$2(t.i(a,l),r),0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)}l=g
break}}e=!1}h=m-1
t.m(a,b,t.i(a,h))
t.m(a,h,r)
h=l+1
t.m(a,c,t.i(a,h))
t.m(a,h,p)
H.c4(a,b,m-2,d)
H.c4(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.f(d.$2(t.i(a,m),r),0);)++m
for(;J.f(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.f(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else if(J.f(d.$2(j,p),0))for(;!0;)if(J.f(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bP(d.$2(t.i(a,l),r),0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)}l=g
break}}H.c4(a,m,l,d)}else H.c4(a,m,l,d)},
T:{"^":"y;$ti"},
aS:{"^":"T;$ti",
gY:function(a){return new H.dn(this,this.gl(this),0,null,[H.w(this,"aS",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.ai(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gC:function(a){if(this.gl(this)===0)throw H.c(H.ad())
return this.ai(0,this.gl(this)-1)},
a_:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.f(this.ai(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.ai(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cz:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ai(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ai(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ai(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bU:function(a,b){return this.eJ(0,b)},
aX:function(a,b){return new H.ak(this,b,[H.w(this,"aS",0),null])},
b4:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ai(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
bu:function(a,b){var z,y,x,w
z=[H.w(this,"aS",0)]
if(b){y=H.t([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gl(this);++w){z=this.ai(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
c8:function(a){return this.bu(a,!0)},
bv:function(a){var z,y
z=P.U(null,null,null,H.w(this,"aS",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.ai(0,y))
return z}},
ni:{"^":"aS;a,b,c,$ti",
ghU:function(){var z=J.aD(this.a)
return z},
git:function(){var z,y
z=J.aD(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aD(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ai:function(a,b){var z,y
z=this.git()+b
if(!(b<0)){y=this.ghU()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cx(b,this,"index",null,null))
return J.el(this.a,z)},
bu:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.K(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.t([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.t(s,u)}for(r=0;r<v;++r){u=x.ai(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hA:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.Y(z,0,null,"start",null))},
A:{
fz:function(a,b,c,d){var z=new H.ni(a,b,c,[d])
z.hA(a,b,c,d)
return z}}},
dn:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ai(0,x);++this.c
return!0}},
cD:{"^":"y;a,b,$ti",
gY:function(a){return new H.kN(null,J.aj(this.a),this.b,this.$ti)},
gl:function(a){return J.aD(this.a)},
gK:function(a){return J.em(this.a)},
gC:function(a){return this.b.$1(J.i7(this.a))},
$asy:function(a,b){return[b]},
A:{
bw:function(a,b,c,d){if(!!J.n(a).$isT)return new H.bt(a,b,[c,d])
return new H.cD(a,b,[c,d])}}},
bt:{"^":"cD;a,b,$ti",$isT:1,
$asT:function(a,b){return[b]}},
kN:{"^":"cB;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascB:function(a,b){return[b]}},
ak:{"^":"aS;a,b,$ti",
gl:function(a){return J.aD(this.a)},
ai:function(a,b){return this.b.$1(J.el(this.a,b))},
$asaS:function(a,b){return[b]},
$asT:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
J:{"^":"y;a,b,$ti",
gY:function(a){return new H.fW(J.aj(this.a),this.b,this.$ti)},
aX:function(a,b){return new H.cD(this,b,[H.m(this,0),null])}},
fW:{"^":"cB;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fj:{"^":"y;a,b,$ti",
gY:function(a){return new H.ms(J.aj(this.a),this.b,this.$ti)},
A:{
mr:function(a,b,c){if(!!J.n(a).$isT)return new H.jO(a,H.ha(b),[c])
return new H.fj(a,H.ha(b),[c])}}},
jO:{"^":"fj;a,b,$ti",
gl:function(a){var z=J.aD(this.a)-this.b
if(z>=0)return z
return 0},
$isT:1},
ms:{"^":"cB;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gG:function(){return this.a.gG()}}}],["","",,H,{"^":"",
ca:function(a,b){var z=a.ct(b)
if(!init.globalState.d.cy)init.globalState.f.bi()
return z},
hT:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isI)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.p9(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eK()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.oJ(P.b0(null,H.c8),0)
x=P.u
y.z=new H.N(0,null,null,null,null,null,0,[x,H.dY])
y.ch=new H.N(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.p8()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.km,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.pa)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.U(null,null,null,x)
v=new H.c1(0,null,!1)
u=new H.dY(y,new H.N(0,null,null,null,null,null,0,[x,H.c1]),w,init.createNewIsolate(),v,new H.b9(H.d4()),new H.b9(H.d4()),!1,!1,[],P.U(null,null,null,null),null,null,!1,!0,P.U(null,null,null,null))
w.q(0,0)
u.dF(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ar(a,{func:1,args:[,]}))u.ct(new H.rO(z,a))
else if(H.ar(a,{func:1,args:[,,]}))u.ct(new H.rP(z,a))
else u.ct(a)
init.globalState.f.bi()},
kq:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.kr()
return},
kr:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.O("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.O('Cannot extract URI from "'+z+'"'))},
km:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cT(!0,[]).bM(b.data)
y=J.K(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cT(!0,[]).bM(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cT(!0,[]).bM(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.U(null,null,null,q)
o=new H.c1(0,null,!1)
n=new H.dY(y,new H.N(0,null,null,null,null,null,0,[q,H.c1]),p,init.createNewIsolate(),o,new H.b9(H.d4()),new H.b9(H.d4()),!1,!1,[],P.U(null,null,null,null),null,null,!1,!0,P.U(null,null,null,null))
p.q(0,0)
n.dF(0,o)
init.globalState.f.a.at(new H.c8(n,new H.kn(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bi()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").E(y.i(z,"msg"))
init.globalState.f.bi()
break
case"close":init.globalState.ch.ar(0,$.$get$eL().i(0,a))
a.terminate()
init.globalState.f.bi()
break
case"log":H.kl(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.bk(!0,P.bJ(null,P.u)).bb(q)
y.toString
self.postMessage(q)}else P.ee(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
kl:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.bk(!0,P.bJ(null,P.u)).bb(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cv(z)
throw H.c(y)}},
ko:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.f4=$.f4+("_"+y)
$.f5=$.f5+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.c9(y,x),w,z.r])
x=new H.kp(a,b,c,d,z)
if(e===!0){z.fi(w,w)
init.globalState.f.a.at(new H.c8(z,x,"start isolate"))}else x.$0()},
pE:function(a){return new H.cT(!0,[]).bM(new H.bk(!1,P.bJ(null,P.u)).bb(a))},
rO:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
rP:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
p9:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
pa:function(a){var z=P.ae(["command","print","msg",a])
return new H.bk(!0,P.bJ(null,P.u)).bb(z)}}},
dY:{"^":"d;j:a<,b,c,jF:d<,iY:e<,f,r,x,cw:y<,z,Q,ch,cx,cy,db,dx",
fi:function(a,b){if(!this.f.t(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cp()},
k0:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.ar(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fh(x)}this.y=!1}this.cp()},
iN:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jZ:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.O("removeRange"))
P.cJ(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hk:function(a,b){if(!this.r.t(0,a))return
this.db=b},
jj:function(a,b,c){var z=J.n(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.at(new H.p_(a,c))},
ji:function(a,b){var z
if(!this.r.t(0,a))return
z=J.n(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.em()
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.at(this.gjG())},
jk:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ee(a)
if(b!=null)P.ee(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.ao(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.E(y)},
ct:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jk(w,v)
if(this.db===!0){this.em()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjF()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.de().$0()}return y},
c4:function(a){return this.b.i(0,a)},
dF:function(a,b){var z=this.b
if(z.a0(a))throw H.c(P.cv("Registry: ports must be registered only once."))
z.m(0,a,b)},
cp:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.em()},
em:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aW(0)
for(z=this.b,y=z.gc9(),y=y.gY(y);y.u();)y.gG().hP()
z.aW(0)
this.c.aW(0)
init.globalState.z.ar(0,this.a)
this.dx.aW(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.E(z[v])}this.ch=null}},"$0","gjG",0,0,6]},
p_:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
oJ:{"^":"d;a,b",
j2:function(){var z=this.a
if(z.b===z.c)return
return z.de()},
fZ:function(){var z,y,x
z=this.j2()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a0(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cv("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.bk(!0,new P.h4(0,null,null,null,null,null,0,[null,P.u])).bb(x)
y.toString
self.postMessage(x)}return!1}z.jX()
return!0},
f8:function(){if(self.window!=null)new H.oK(this).$0()
else for(;this.fZ(););},
bi:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.f8()
else try{this.f8()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bk(!0,P.bJ(null,P.u)).bb(v)
w.toString
self.postMessage(v)}}},
oK:{"^":"a:6;a",
$0:function(){if(!this.a.fZ())return
P.nQ(C.w,this)}},
c8:{"^":"d;a,b,c",
jX:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ct(this.b)}},
p8:{"^":"d;"},
kn:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.ko(this.a,this.b,this.c,this.d,this.e,this.f)}},
kp:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ar(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ar(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cp()}},
fZ:{"^":"d;"},
c9:{"^":"fZ;b,a",
E:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.geZ())return
x=H.pE(a)
if(z.giY()===y){y=J.K(x)
switch(y.i(x,0)){case"pause":z.fi(y.i(x,1),y.i(x,2))
break
case"resume":z.k0(y.i(x,1))
break
case"add-ondone":z.iN(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.jZ(y.i(x,1))
break
case"set-errors-fatal":z.hk(y.i(x,1),y.i(x,2))
break
case"ping":z.jj(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.ji(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.ar(0,y)
break}return}init.globalState.f.a.at(new H.c8(z,new H.pc(this,x),"receive"))},
t:function(a,b){if(b==null)return!1
return b instanceof H.c9&&J.f(this.b,b.b)},
gw:function(a){return this.b.gdS()}},
pc:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.geZ())z.hG(this.b)}},
e_:{"^":"fZ;b,c,a",
E:function(a){var z,y,x
z=P.ae(["command","message","port",this,"msg",a])
y=new H.bk(!0,P.bJ(null,P.u)).bb(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.e_&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eC()
y=this.a
if(typeof y!=="number")return y.eC()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
c1:{"^":"d;dS:a<,b,eZ:c<",
hP:function(){this.c=!0
this.b=null},
bd:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.ar(0,y)
z.c.ar(0,y)
z.cp()},
hG:function(a){if(this.c)return
this.b.$1(a)},
$islF:1},
lG:{"^":"a8;a,b",
aw:function(a,b,c,d){var z=this.b
z.toString
return new P.cS(z,[H.m(z,0)]).aw(a,b,c,d)},
ep:function(a,b,c){return this.aw(a,null,b,c)},
bd:[function(){this.a.bd()
this.b.bd()},"$0","giU",0,0,6],
hy:function(a){var z=new P.pr(null,0,null,null,null,null,this.giU(),[null])
this.b=z
this.a.b=z.giE(z)},
$asa8:I.b5},
nM:{"^":"d;a,b,c",
hB:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.at(new H.c8(y,new H.nO(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d1(new H.nP(this,b),0),a)}else throw H.c(new P.O("Timer greater than 0."))},
A:{
nN:function(a,b){var z=new H.nM(!0,!1,null)
z.hB(a,b)
return z}}},
nO:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
nP:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b9:{"^":"d;dS:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.kt()
z=C.n.d_(z,0)^C.n.bB(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b9){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bk:{"^":"d;a,b",
bb:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gl(z))
z=J.n(a)
if(!!z.$iscC)return this.hg(a)
if(!!z.$iskj){x=this.ghd()
z=a.gc2()
z=H.bw(z,x,H.w(z,"y",0),null)
z=P.V(z,!0,H.w(z,"y",0))
w=a.gc9()
w=H.bw(w,x,H.w(w,"y",0),null)
return["map",z,P.V(w,!0,H.w(w,"y",0))]}if(!!z.$iseQ)return this.hh(a)
if(!!z.$isaO)this.h1(a)
if(!!z.$islF)this.cH(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isc9)return this.hi(a)
if(!!z.$ise_)return this.hj(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cH(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb9)return["capability",a.a]
if(!(a instanceof P.d))this.h1(a)
return["dart",init.classIdExtractor(a),this.hf(init.classFieldsExtractor(a))]},"$1","ghd",2,0,0],
cH:function(a,b){throw H.c(new P.O((b==null?"Can't transmit:":b)+" "+H.b(a)))},
h1:function(a){return this.cH(a,null)},
hg:function(a){var z=this.he(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cH(a,"Can't serialize indexable: ")},
he:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bb(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hf:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.bb(a[z]))
return a},
hh:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cH(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bb(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hj:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hi:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdS()]
return["raw sendport",a]}},
cT:{"^":"d;a,b",
bM:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.gft(a)){case"ref":if(1>=a.length)return H.e(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.e(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.cs(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.cs(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cs(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.cs(x),[null])
y.fixed$length=Array
return y
case"map":return this.j5(a)
case"sendport":return this.j6(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.j4(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b9(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cs(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gj3",2,0,0],
cs:function(a){var z,y,x
z=J.K(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.m(a,y,this.bM(z.i(a,y)));++y}return a},
j5:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aR()
this.b.push(w)
y=J.en(y,this.gj3()).c8(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.m(0,y[u],this.bM(v.i(x,u)))}return w},
j6:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c4(w)
if(u==null)return
t=new H.c9(u,x)}else t=new H.e_(y,w,x)
this.b.push(t)
return t},
j4:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.K(y)
v=J.K(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.i(y,u)]=this.bM(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
j5:function(){throw H.c(new P.O("Cannot modify unmodifiable Map"))},
ra:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.i(a)
if(typeof z!=="string")throw H.c(H.P(a))
return z},
av:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bz:function(a){var z,y,x,w,v,u,t,s
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.G||!!J.n(a).$isbi){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cc(w,0)===36)w=C.b.bz(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d2(H.cf(a),0,null),init.mangledGlobalNames)},
cG:function(a){return"Instance of '"+H.bz(a)+"'"},
ag:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.d_(z,10))>>>0,56320|z&1023)}throw H.c(P.Y(a,0,1114111,null,null))},
bd:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
lx:function(a){var z=H.bd(a).getFullYear()+0
return z},
lv:function(a){var z=H.bd(a).getMonth()+1
return z},
lr:function(a){var z=H.bd(a).getDate()+0
return z},
ls:function(a){var z=H.bd(a).getHours()+0
return z},
lu:function(a){var z=H.bd(a).getMinutes()+0
return z},
lw:function(a){var z=H.bd(a).getSeconds()+0
return z},
lt:function(a){var z=H.bd(a).getMilliseconds()+0
return z},
dB:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
return a[b]},
f6:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
a[b]=c},
x:function(a){throw H.c(H.P(a))},
e:function(a,b){if(a==null)J.aD(a)
throw H.c(H.az(a,b))},
az:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aX(!0,b,"index",null)
z=J.aD(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cx(b,a,"index",null,z)
return P.c0(b,"index",null)},
P:function(a){return new P.aX(!0,a,null,null)},
d_:function(a){if(typeof a!=="number")throw H.c(H.P(a))
return a},
bo:function(a){if(typeof a!=="string")throw H.c(H.P(a))
return a},
c:function(a){var z
if(a==null)a=new P.cE()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hZ})
z.name=""}else z.toString=H.hZ
return z},
hZ:function(){return J.i(this.dartException)},
h:function(a){throw H.c(a)},
as:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.tv(a)
if(a==null)return
if(a instanceof H.df)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.d_(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dk(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.eZ(v,null))}}if(a instanceof TypeError){u=$.$get$fH()
t=$.$get$fI()
s=$.$get$fJ()
r=$.$get$fK()
q=$.$get$fO()
p=$.$get$fP()
o=$.$get$fM()
$.$get$fL()
n=$.$get$fR()
m=$.$get$fQ()
l=u.bh(y)
if(l!=null)return z.$1(H.dk(y,l))
else{l=t.bh(y)
if(l!=null){l.method="call"
return z.$1(H.dk(y,l))}else{l=s.bh(y)
if(l==null){l=r.bh(y)
if(l==null){l=q.bh(y)
if(l==null){l=p.bh(y)
if(l==null){l=o.bh(y)
if(l==null){l=r.bh(y)
if(l==null){l=n.bh(y)
if(l==null){l=m.bh(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eZ(y,l==null?null:l.method))}}return z.$1(new H.nU(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fs()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aX(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fs()
return a},
A:function(a){var z
if(a instanceof H.df)return a.b
if(a==null)return new H.h7(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.h7(a,null)},
rl:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.av(a)},
r2:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
re:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ca(b,new H.rf(a))
case 1:return H.ca(b,new H.rg(a,d))
case 2:return H.ca(b,new H.rh(a,d,e))
case 3:return H.ca(b,new H.ri(a,d,e,f))
case 4:return H.ca(b,new H.rj(a,d,e,f,g))}throw H.c(P.cv("Unsupported number of arguments for wrapped closure"))},
d1:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.re)
a.$identity=z
return z},
j1:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isI){z.$reflectionInfo=c
x=H.lI(z).r}else x=c
w=d?Object.create(new H.mQ().constructor.prototype):Object.create(new H.d7(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aE
$.aE=J.a5(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.ex(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ra,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.es:H.d8
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ex(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
iZ:function(a,b,c,d){var z=H.d8
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ex:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.j0(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.iZ(y,!w,z,b)
if(y===0){w=$.aE
$.aE=J.a5(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bs
if(v==null){v=H.co("self")
$.bs=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aE
$.aE=J.a5(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bs
if(v==null){v=H.co("self")
$.bs=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
j_:function(a,b,c,d){var z,y
z=H.d8
y=H.es
switch(b?-1:a){case 0:throw H.c(new H.lT("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
j0:function(a,b){var z,y,x,w,v,u,t,s
z=H.iQ()
y=$.er
if(y==null){y=H.co("receiver")
$.er=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.j_(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aE
$.aE=J.a5(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aE
$.aE=J.a5(u,1)
return new Function(y+H.b(u)+"}")()},
e7:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isI){c.fixed$length=Array
z=c}else z=c
return H.j1(a,b,z,!!d,e,f)},
rr:function(a,b){var z=J.K(b)
throw H.c(H.cq(H.bz(a),z.ax(b,3,z.gl(b))))},
a4:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.rr(a,b)},
e9:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
ar:function(a,b){var z
if(a==null)return!1
z=H.e9(a)
return z==null?!1:H.ec(z,b)},
hx:function(a,b){var z,y
if(a==null)return a
if(H.ar(a,b))return a
z=H.S(b,null)
y=H.e9(a)
throw H.c(H.cq(y!=null?H.S(y,null):H.bz(a),z))},
tt:function(a){throw H.c(new P.jh(a))},
d4:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b4:function(a){return new H.an(a,null)},
t:function(a,b){a.$ti=b
return a},
cf:function(a){if(a==null)return
return a.$ti},
hC:function(a,b){return H.ej(a["$as"+H.b(b)],H.cf(a))},
w:function(a,b,c){var z=H.hC(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cf(a)
return z==null?null:z[b]},
S:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d2(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.S(z,b)
return H.pJ(a,b)}return"unknown-reified-type"},
pJ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.S(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.S(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.S(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.r1(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.S(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d2:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bG("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.v=v+", "
u=a[y]
if(u!=null)w=!1
v=z.v+=H.S(u,c)}return w?"":"<"+z.k(0)+">"},
hD:function(a){var z,y
if(a instanceof H.a){z=H.e9(a)
if(z!=null)return H.S(z,null)}y=J.n(a).constructor.builtin$cls
if(a==null)return y
return y+H.d2(a.$ti,0,null)},
ej:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aL:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cf(a)
y=J.n(a)
if(y[b]==null)return!1
return H.hp(H.ej(y[d],z),c)},
aB:function(a,b,c,d){if(a==null)return a
if(H.aL(a,b,c,d))return a
throw H.c(H.cq(H.bz(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d2(c,0,null),init.mangledGlobalNames)))},
hp:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aa(a[y],b[y]))return!1
return!0},
b3:function(a,b,c){return a.apply(b,H.hC(b,c))},
d0:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="al"
if(b==null)return!0
z=H.cf(a)
a=J.n(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ec(x.apply(a,null),b)}return H.aa(y,b)},
hW:function(a,b){if(a!=null&&!H.d0(a,b))throw H.c(H.cq(H.bz(a),H.S(b,null)))
return a},
aa:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="al")return!0
if('func' in b)return H.ec(a,b)
if('func' in a)return b.builtin$cls==="bv"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.S(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hp(H.ej(u,z),x)},
ho:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.aa(z,v)||H.aa(v,z)))return!1}return!0},
pT:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.aa(v,u)||H.aa(u,v)))return!1}return!0},
ec:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.aa(z,y)||H.aa(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.ho(x,w,!1))return!1
if(!H.ho(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}}return H.pT(a.named,b.named)},
tn:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$iseS){z=C.b.bz(a,c)
return b.b.test(z)}else{z=z.e7(b,C.b.bz(a,c))
return!z.gK(z)}}},
p:function(a,b,c){var z,y,x
H.bo(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
u4:[function(a){return a},"$1","hb",2,0,39],
to:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdy)throw H.c(P.cl(b,"pattern","is not a Pattern"))
for(z=z.e7(b,a),z=new H.fX(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hb().$1(C.b.ax(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hb().$1(C.b.bz(a,y)))
return z.charCodeAt(0)==0?z:z},
bO:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.tp(a,z,z+b.length,c)},
tp:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
j4:{"^":"d;$ti",
gK:function(a){return this.gl(this)===0},
gaf:function(a){return this.gl(this)!==0},
k:function(a){return P.dr(this)},
m:function(a,b,c){return H.j5()},
$isE:1},
j6:{"^":"j4;a,b,c,$ti",
gl:function(a){return this.a},
a0:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a0(b))return
return this.eV(b)},
eV:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eV(w))}}},
lH:{"^":"d;a,b,c,d,e,f,r,x",A:{
lI:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.lH(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
nR:{"^":"d;a,b,c,d,e,f",
bh:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
A:{
aH:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.nR(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cR:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fN:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eZ:{"^":"X;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
kx:{"^":"X;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
dk:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.kx(a,y,z?null:b.receiver)}}},
nU:{"^":"X;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
df:{"^":"d;a,bc:b<"},
tv:{"^":"a:0;a",
$1:function(a){if(!!J.n(a).$isX)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
h7:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
rf:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
rg:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
rh:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ri:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
rj:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bz(this).trim()+"'"},
gh9:function(){return this},
$isbv:1,
gh9:function(){return this}},
fD:{"^":"a;"},
mQ:{"^":"fD;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d7:{"^":"fD;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d7))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.av(this.a)
else y=typeof z!=="object"?J.j(z):H.av(z)
z=H.av(this.b)
if(typeof y!=="number")return y.ku()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cG(z)},
A:{
d8:function(a){return a.a},
es:function(a){return a.c},
iQ:function(){var z=$.bs
if(z==null){z=H.co("self")
$.bs=z}return z},
co:function(a){var z,y,x,w,v
z=new H.d7("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iV:{"^":"X;a",
k:function(a){return this.a},
A:{
cq:function(a,b){return new H.iV("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
lT:{"^":"X;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
an:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gw:function(a){return J.j(this.a)},
t:function(a,b){if(b==null)return!1
return b instanceof H.an&&J.f(this.a,b.a)}},
N:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gaf:function(a){return!this.gK(this)},
gc2:function(){return new H.kE(this,[H.m(this,0)])},
gc9:function(){return H.bw(this.gc2(),new H.kw(this),H.m(this,0),H.m(this,1))},
a0:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eR(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eR(y,a)}else return this.jv(a)},
jv:function(a){var z=this.d
if(z==null)return!1
return this.cv(this.cW(z,this.cu(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cf(z,b)
return y==null?null:y.gbO()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cf(x,b)
return y==null?null:y.gbO()}else return this.jw(b)},
jw:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cW(z,this.cu(a))
x=this.cv(y,a)
if(x<0)return
return y[x].gbO()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dU()
this.b=z}this.eL(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dU()
this.c=y}this.eL(y,b,c)}else this.jy(b,c)},
jy:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dU()
this.d=z}y=this.cu(a)
x=this.cW(z,y)
if(x==null)this.e4(z,y,[this.dV(a,b)])
else{w=this.cv(x,a)
if(w>=0)x[w].sbO(b)
else x.push(this.dV(a,b))}},
jY:function(a,b){var z
if(this.a0(a))return this.i(0,a)
z=b.$0()
this.m(0,a,z)
return z},
ar:function(a,b){if(typeof b==="string")return this.f7(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f7(this.c,b)
else return this.jx(b)},
jx:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cW(z,this.cu(a))
x=this.cv(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fa(w)
return w.gbO()},
aW:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
eL:function(a,b,c){var z=this.cf(a,b)
if(z==null)this.e4(a,b,this.dV(b,c))
else z.sbO(c)},
f7:function(a,b){var z
if(a==null)return
z=this.cf(a,b)
if(z==null)return
this.fa(z)
this.eS(a,b)
return z.gbO()},
dV:function(a,b){var z,y
z=new H.kD(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fa:function(a){var z,y
z=a.gih()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cu:function(a){return J.j(a)&0x3ffffff},
cv:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gfC(),b))return y
return-1},
k:function(a){return P.dr(this)},
cf:function(a,b){return a[b]},
cW:function(a,b){return a[b]},
e4:function(a,b,c){a[b]=c},
eS:function(a,b){delete a[b]},
eR:function(a,b){return this.cf(a,b)!=null},
dU:function(){var z=Object.create(null)
this.e4(z,"<non-identifier-key>",z)
this.eS(z,"<non-identifier-key>")
return z},
$iskj:1,
$isE:1,
A:{
eU:function(a,b){return new H.N(0,null,null,null,null,null,0,[a,b])}}},
kw:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
kD:{"^":"d;fC:a<,bO:b@,c,ih:d<,$ti"},
kE:{"^":"T;a,$ti",
gl:function(a){return this.a.a},
gK:function(a){return this.a.a===0},
gY:function(a){var z,y
z=this.a
y=new H.kF(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a_:function(a,b){return this.a.a0(b)},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
kF:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
eS:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
gib:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dj(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gia:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dj(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
e8:function(a,b,c){if(c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
return new H.op(this,b,c)},
e7:function(a,b){return this.e8(a,b,0)},
hW:function(a,b){var z,y
z=this.gib()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.h6(this,y)},
hV:function(a,b){var z,y
z=this.gia()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.h6(this,y)},
fG:function(a,b,c){if(c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
return this.hV(b,c)},
$isdy:1,
A:{
dj:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eJ("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
h6:{"^":"d;a,b",
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isbc:1},
op:{"^":"cA;a,b,c",
gY:function(a){return new H.fX(this.a,this.b,this.c,null)},
$ascA:function(){return[P.bc]},
$asy:function(){return[P.bc]}},
fX:{"^":"d;a,b,c,d",
gG:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hW(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fy:{"^":"d;a,b,c",
i:function(a,b){if(b!==0)H.h(P.c0(b,null,null))
return this.c},
$isbc:1},
pn:{"^":"y;a,b,c",
gY:function(a){return new H.po(this.a,this.b,this.c,null)},
$asy:function(){return[P.bc]}},
po:{"^":"d;a,b,c,d",
u:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.fy(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
r1:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
rq:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
oq:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.pU()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d1(new P.os(z),1)).observe(y,{childList:true})
return new P.or(z,y,x)}else if(self.setImmediate!=null)return P.pV()
return P.pW()},
tZ:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d1(new P.ot(a),0))},"$1","pU",2,0,13],
u_:[function(a){++init.globalState.f.b
self.setImmediate(H.d1(new P.ou(a),0))},"$1","pV",2,0,13],
u0:[function(a){P.dO(C.w,a)},"$1","pW",2,0,13],
ay:function(a,b){P.e0(null,a)
return b.gfz()},
ap:function(a,b){P.e0(a,b)},
ax:function(a,b){b.bL(a)},
aw:function(a,b){b.ec(H.z(a),H.A(a))},
e0:function(a,b){var z,y,x,w
z=new P.py(b)
y=new P.pz(b)
x=J.n(a)
if(!!x.$isD)a.e5(z,y)
else if(!!x.$isM)a.ew(z,y)
else{w=new P.D(0,$.o,null,[null])
w.a=4
w.c=a
w.e5(z,null)}},
aq:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.o.toString
return new P.pS(z)},
cW:function(a,b,c){var z,y,x
if(b===0){if(c.gej())c.c.eb()
else c.a.bd()
return}else if(b===1){if(c.gej())c.c.ec(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.e6(z,y)
c.a.bd()}return}if(a instanceof P.bH){if(c.gej()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aN(c.a,z)
P.cg(new P.pw(b,c))
return}else if(z===1){x=a.a
c.a.iQ(x,!1).bR(new P.px(b,c))
return}}P.e0(a,b)},
pR:function(a){return a.gdD()},
e4:function(a,b){if(H.ar(a,{func:1,args:[P.al,P.al]})){b.toString
return a}else{b.toString
return a}},
au:function(a){return new P.pp(new P.D(0,$.o,null,[a]),[a])},
pH:function(a,b,c){$.o.toString
a.b0(b,c)},
pL:function(){var z,y
for(;z=$.bl,z!=null;){$.bL=null
y=z.gc5()
$.bl=y
if(y==null)$.bK=null
z.giS().$0()}},
u3:[function(){$.e1=!0
try{P.pL()}finally{$.bL=null
$.e1=!1
if($.bl!=null)$.$get$dS().$1(P.hq())}},"$0","hq",0,0,6],
hk:function(a){var z=new P.fY(a,null)
if($.bl==null){$.bK=z
$.bl=z
if(!$.e1)$.$get$dS().$1(P.hq())}else{$.bK.b=z
$.bK=z}},
pQ:function(a){var z,y,x
z=$.bl
if(z==null){P.hk(a)
$.bL=$.bK
return}y=new P.fY(a,null)
x=$.bL
if(x==null){y.b=z
$.bL=y
$.bl=y}else{y.b=x.b
x.b=y
$.bL=y
if(y.b==null)$.bK=y}},
cg:function(a){var z=$.o
if(C.h===z){P.bn(null,null,C.h,a)
return}z.toString
P.bn(null,null,z,z.e9(a,!0))},
tV:function(a,b){return new P.pm(null,a,!1,[b])},
e5:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.o
w.toString
P.bm(null,null,w,z,y)}},
pM:[function(a,b){var z=$.o
z.toString
P.bm(null,null,z,a,b)},function(a){return P.pM(a,null)},"$2","$1","pY",2,2,14,0],
u2:[function(){},"$0","pX",0,0,6],
hj:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.o.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbe()
w=t
v=x.gbc()
c.$2(w,v)}}},
pA:function(a,b,c,d){var z=a.c1()
if(!!J.n(z).$isM&&z!==$.$get$ba())z.bT(new P.pC(b,c,d))
else b.b0(c,d)},
h8:function(a,b){return new P.pB(a,b)},
h9:function(a,b,c){var z=a.c1()
if(!!J.n(z).$isM&&z!==$.$get$ba())z.bT(new P.pD(b,c))
else b.b_(c)},
pv:function(a,b,c){$.o.toString
a.bZ(b,c)},
nQ:function(a,b){var z=$.o
if(z===C.h){z.toString
return P.dO(a,b)}return P.dO(a,z.e9(b,!0))},
dO:function(a,b){var z=C.e.bB(a.a,1000)
return H.nN(z<0?0:z,b)},
o3:function(){return $.o},
bm:function(a,b,c,d,e){var z={}
z.a=d
P.pQ(new P.pO(z,e))},
hg:function(a,b,c,d){var z,y
y=$.o
if(y===c)return d.$0()
$.o=c
z=y
try{y=d.$0()
return y}finally{$.o=z}},
hi:function(a,b,c,d,e){var z,y
y=$.o
if(y===c)return d.$1(e)
$.o=c
z=y
try{y=d.$1(e)
return y}finally{$.o=z}},
hh:function(a,b,c,d,e,f){var z,y
y=$.o
if(y===c)return d.$2(e,f)
$.o=c
z=y
try{y=d.$2(e,f)
return y}finally{$.o=z}},
bn:function(a,b,c,d){var z=C.h!==c
if(z)d=c.e9(d,!(!z||!1))
P.hk(d)},
os:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
or:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ot:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ou:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
py:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
pz:{"^":"a:20;a",
$2:function(a,b){this.a.$2(1,new H.df(a,b))}},
pS:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
pw:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcw()){z.b=!0
return}this.a.$2(null,0)}},
px:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
ov:{"^":"d;a,b,c",
gdD:function(){return this.a.gdD()},
gcw:function(){return this.a.gcw()},
gej:function(){return this.c!=null},
q:function(a,b){return J.aN(this.a,b)},
e6:function(a,b){return this.a.e6(a,b)},
bd:function(){return this.a.bd()},
hD:function(a){var z=new P.oy(a)
this.a=new P.oD(null,0,null,new P.oA(z),null,new P.oB(this,z),new P.oC(this,a),[null])},
A:{
ow:function(a){var z=new P.ov(null,!1,null)
z.hD(a)
return z}}},
oy:{"^":"a:1;a",
$0:function(){P.cg(new P.oz(this.a))}},
oz:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
oA:{"^":"a:1;a",
$0:function(){this.a.$0()}},
oB:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
oC:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjC()){z.c=new P.c6(new P.D(0,$.o,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cg(new P.ox(this.b))}return z.c.gfz()}}},
ox:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bH:{"^":"d;as:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bI:function(a){return new P.bH(a,1)},
aI:function(){return C.a7},
h2:function(a){return new P.bH(a,0)},
aJ:function(a){return new P.bH(a,3)}}},
b2:{"^":"d;a,b,c,d",
gG:function(){var z=this.c
return z==null?this.b:z.gG()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bH){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aj(z)
if(!!w.$isb2){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
pq:{"^":"cA;a",
gY:function(a){return new P.b2(this.a(),null,null,null)},
$ascA:I.b5,
$asy:I.b5,
A:{
aK:function(a){return new P.pq(a)}}},
M:{"^":"d;$ti"},
h_:{"^":"d;fz:a<,$ti",
ec:function(a,b){if(a==null)a=new P.cE()
if(this.a.a!==0)throw H.c(new P.F("Future already completed"))
$.o.toString
this.b0(a,b)},
d3:function(a){return this.ec(a,null)}},
c6:{"^":"h_;a,$ti",
bL:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.bn(a)},
eb:function(){return this.bL(null)},
b0:function(a,b){this.a.eN(a,b)}},
pp:{"^":"h_;a,$ti",
bL:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.b_(a)},
eb:function(){return this.bL(null)},
b0:function(a,b){this.a.b0(a,b)}},
dX:{"^":"d;dX:a<,b,c,d,e,$ti",
giz:function(){return this.b.b},
gfB:function(){return(this.c&1)!==0},
gjn:function(){return(this.c&2)!==0},
gfA:function(){return this.c===8},
jl:function(a){return this.b.b.ev(this.d,a)},
jM:function(a){if(this.c!==6)return!0
return this.b.b.ev(this.d,a.gbe())},
jh:function(a){var z,y
z=this.e
y=this.b.b
if(H.ar(z,{func:1,args:[,,]}))return y.kc(z,a.gbe(),a.gbc())
else return y.ev(z,a.gbe())},
jm:function(){return this.b.b.fX(this.d)}},
D:{"^":"d;cn:a<,b,im:c<,$ti",
gi5:function(){return this.a===2},
gdT:function(){return this.a>=4},
ew:function(a,b){var z=$.o
if(z!==C.h){z.toString
if(b!=null)b=P.e4(b,z)}return this.e5(a,b)},
bR:function(a){return this.ew(a,null)},
e5:function(a,b){var z,y
z=new P.D(0,$.o,null,[null])
y=b==null?1:3
this.cR(new P.dX(null,z,y,a,b,[H.m(this,0),null]))
return z},
bT:function(a){var z,y
z=$.o
y=new P.D(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.cR(new P.dX(null,y,8,a,null,[z,z]))
return y},
cR:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdT()){y.cR(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bn(null,null,z,new P.oN(this,a))}},
f3:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdX()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdT()){v.f3(a)
return}this.a=v.a
this.c=v.c}z.a=this.cY(a)
y=this.b
y.toString
P.bn(null,null,y,new P.oU(z,this))}},
cX:function(){var z=this.c
this.c=null
return this.cY(z)},
cY:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdX()
z.a=y}return y},
b_:function(a){var z,y
z=this.$ti
if(H.aL(a,"$isM",z,"$asM"))if(H.aL(a,"$isD",z,null))P.cU(a,this)
else P.h1(a,this)
else{y=this.cX()
this.a=4
this.c=a
P.bj(this,y)}},
b0:[function(a,b){var z=this.cX()
this.a=8
this.c=new P.cm(a,b)
P.bj(this,z)},function(a){return this.b0(a,null)},"kv","$2","$1","gbH",2,2,14,0],
bn:function(a){var z
if(H.aL(a,"$isM",this.$ti,"$asM")){this.hM(a)
return}this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.oP(this,a))},
hM:function(a){var z
if(H.aL(a,"$isD",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.oT(this,a))}else P.cU(a,this)
return}P.h1(a,this)},
eN:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.oO(this,a,b))},
hF:function(a,b){this.a=4
this.c=a},
$isM:1,
A:{
h1:function(a,b){var z,y,x
b.a=1
try{a.ew(new P.oQ(b),new P.oR(b))}catch(x){z=H.z(x)
y=H.A(x)
P.cg(new P.oS(b,z,y))}},
cU:function(a,b){var z,y,x
for(;a.gi5();)a=a.c
z=a.gdT()
y=b.c
if(z){b.c=null
x=b.cY(y)
b.a=a.a
b.c=a.c
P.bj(b,x)}else{b.a=2
b.c=a
a.f3(y)}},
bj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbe()
t=v.gbc()
y.toString
P.bm(null,null,y,u,t)}return}for(;b.gdX()!=null;b=s){s=b.a
b.a=null
P.bj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfB()||b.gfA()){q=b.giz()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbe()
t=v.gbc()
y.toString
P.bm(null,null,y,u,t)
return}p=$.o
if(p==null?q!=null:p!==q)$.o=q
else p=null
if(b.gfA())new P.oX(z,x,w,b).$0()
else if(y){if(b.gfB())new P.oW(x,b,r).$0()}else if(b.gjn())new P.oV(z,x,b).$0()
if(p!=null)$.o=p
y=x.b
if(!!J.n(y).$isM){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.cY(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cU(y,o)
return}}o=b.b
b=o.cX()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
oN:{"^":"a:1;a,b",
$0:function(){P.bj(this.a,this.b)}},
oU:{"^":"a:1;a,b",
$0:function(){P.bj(this.b,this.a.a)}},
oQ:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b_(a)}},
oR:{"^":"a:50;a",
$2:function(a,b){this.a.b0(a,b)},
$1:function(a){return this.$2(a,null)}},
oS:{"^":"a:1;a,b,c",
$0:function(){this.a.b0(this.b,this.c)}},
oP:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cX()
z.a=4
z.c=this.b
P.bj(z,y)}},
oT:{"^":"a:1;a,b",
$0:function(){P.cU(this.b,this.a)}},
oO:{"^":"a:1;a,b,c",
$0:function(){this.a.b0(this.b,this.c)}},
oX:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jm()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbe()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cm(y,x)
u.a=!0
return}if(!!J.n(z).$isM){if(z instanceof P.D&&z.gcn()>=4){if(z.gcn()===8){v=this.b
v.b=z.gim()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bR(new P.oY(t))
v.a=!1}}},
oY:{"^":"a:0;a",
$1:function(a){return this.a}},
oW:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jl(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cm(z,y)
w.a=!0}}},
oV:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jM(z)===!0&&w.e!=null){v=this.b
v.b=w.jh(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbe()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cm(y,x)
s.a=!0}}},
fY:{"^":"d;iS:a<,c5:b@"},
a8:{"^":"d;$ti",
aX:function(a,b){return new P.pb(b,this,[H.w(this,"a8",0),null])},
a_:function(a,b){var z,y
z={}
y=new P.D(0,$.o,null,[P.W])
z.a=null
z.a=this.aw(new P.n_(z,this,b,y),!0,new P.n0(y),y.gbH())
return y},
L:function(a,b){var z,y
z={}
y=new P.D(0,$.o,null,[null])
z.a=null
z.a=this.aw(new P.n3(z,this,b,y),!0,new P.n4(y),y.gbH())
return y},
gl:function(a){var z,y
z={}
y=new P.D(0,$.o,null,[P.u])
z.a=0
this.aw(new P.n9(z),!0,new P.na(z,y),y.gbH())
return y},
gK:function(a){var z,y
z={}
y=new P.D(0,$.o,null,[P.W])
z.a=null
z.a=this.aw(new P.n5(z,y),!0,new P.n6(y),y.gbH())
return y},
c8:function(a){var z,y,x
z=H.w(this,"a8",0)
y=H.t([],[z])
x=new P.D(0,$.o,null,[[P.I,z]])
this.aw(new P.nb(this,y),!0,new P.nc(y,x),x.gbH())
return x},
bv:function(a){var z,y,x
z=H.w(this,"a8",0)
y=P.U(null,null,null,z)
x=new P.D(0,$.o,null,[[P.bB,z]])
this.aw(new P.nd(this,y),!0,new P.ne(y,x),x.gbH())
return x},
gC:function(a){var z,y
z={}
y=new P.D(0,$.o,null,[H.w(this,"a8",0)])
z.a=null
z.b=!1
this.aw(new P.n7(z,this),!0,new P.n8(z,y),y.gbH())
return y}},
n_:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hj(new P.mY(this.c,a),new P.mZ(z,y),P.h8(z.a,y))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a8")}},
mY:{"^":"a:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
mZ:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.h9(this.a.a,this.b,!0)}},
n0:{"^":"a:1;a",
$0:function(){this.a.b_(!1)}},
n3:{"^":"a;a,b,c,d",
$1:function(a){P.hj(new P.n1(this.c,a),new P.n2(),P.h8(this.a.a,this.d))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a8")}},
n1:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
n2:{"^":"a:0;",
$1:function(a){}},
n4:{"^":"a:1;a",
$0:function(){this.a.b_(null)}},
n9:{"^":"a:0;a",
$1:function(a){++this.a.a}},
na:{"^":"a:1;a,b",
$0:function(){this.b.b_(this.a.a)}},
n5:{"^":"a:0;a,b",
$1:function(a){P.h9(this.a.a,this.b,!1)}},
n6:{"^":"a:1;a",
$0:function(){this.a.b_(!0)}},
nb:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"a8")}},
nc:{"^":"a:1;a,b",
$0:function(){this.b.b_(this.a)}},
nd:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"a8")}},
ne:{"^":"a:1;a,b",
$0:function(){this.b.b_(this.a)}},
n7:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a8")}},
n8:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b_(x.a)
return}try{x=H.ad()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.pH(this.b,z,y)}}},
cV:{"^":"d;cn:b<,$ti",
gdD:function(){return new P.cS(this,this.$ti)},
gjC:function(){return(this.b&4)!==0},
gcw:function(){var z=this.b
return(z&1)!==0?this.gbA().gf_():(z&2)===0},
gie:function(){if((this.b&8)===0)return this.a
return this.a.gcJ()},
dM:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dZ(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcJ()==null)y.c=new P.dZ(null,null,0,this.$ti)
return y.c},
gbA:function(){if((this.b&8)!==0)return this.a.gcJ()
return this.a},
cb:function(){if((this.b&4)!==0)return new P.F("Cannot add event after closing")
return new P.F("Cannot add event while adding a stream")},
iQ:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cb())
if((z&2)!==0){z=new P.D(0,$.o,null,[null])
z.bn(null)
return z}z=this.a
y=new P.D(0,$.o,null,[null])
x=a.aw(this.ghK(),!1,this.ghL(),this.ghH())
w=this.b
if((w&1)!==0?this.gbA().gf_():(w&2)===0)x.cB()
this.a=new P.pi(z,y,x,this.$ti)
this.b|=8
return y},
eU:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$ba():new P.D(0,$.o,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cb())
this.bG(b)},"$1","giE",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cV")}],
e6:function(a,b){if(this.b>=4)throw H.c(this.cb())
if(a==null)a=new P.cE()
$.o.toString
this.bZ(a,b)},
bd:function(){var z=this.b
if((z&4)!==0)return this.eU()
if(z>=4)throw H.c(this.cb())
z|=4
this.b=z
if((z&1)!==0)this.cl()
else if((z&3)===0)this.dM().q(0,C.u)
return this.eU()},
bG:[function(a){var z=this.b
if((z&1)!==0)this.ck(a)
else if((z&3)===0)this.dM().q(0,new P.dT(a,null,this.$ti))},"$1","ghK",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cV")}],
bZ:[function(a,b){var z=this.b
if((z&1)!==0)this.cm(a,b)
else if((z&3)===0)this.dM().q(0,new P.dU(a,b,null))},"$2","ghH",4,0,49],
dG:[function(){var z=this.a
this.a=z.gcJ()
this.b&=4294967287
z.a.bn(null)},"$0","ghL",0,0,6],
iu:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.F("Stream has already been listened to."))
z=$.o
y=d?1:0
x=new P.oH(this,null,null,null,z,y,null,null,this.$ti)
x.eK(a,b,c,d,H.m(this,0))
w=this.gie()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scJ(x)
v.b.cD()}else this.a=x
x.is(w)
x.dR(new P.pk(this))
return x},
ij:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c1()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.D(0,$.o,null,[null])
u.eN(y,x)
z=u}else z=z.bT(w)
w=new P.pj(this)
if(z!=null)z=z.bT(w)
else w.$0()
return z}},
pk:{"^":"a:1;a",
$0:function(){P.e5(this.a.d)}},
pj:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bn(null)}},
ps:{"^":"d;$ti",
ck:function(a){this.gbA().bG(a)},
cm:function(a,b){this.gbA().bZ(a,b)},
cl:function(){this.gbA().dG()}},
oE:{"^":"d;$ti",
ck:function(a){this.gbA().c_(new P.dT(a,null,[H.m(this,0)]))},
cm:function(a,b){this.gbA().c_(new P.dU(a,b,null))},
cl:function(){this.gbA().c_(C.u)}},
oD:{"^":"cV+oE;a,b,c,d,e,f,r,$ti"},
pr:{"^":"cV+ps;a,b,c,d,e,f,r,$ti"},
cS:{"^":"pl;a,$ti",
gw:function(a){return(H.av(this.a)^892482866)>>>0},
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cS))return!1
return b.a===this.a}},
oH:{"^":"c7;x,a,b,c,d,e,f,r,$ti",
dY:function(){return this.x.ij(this)},
e_:[function(){var z=this.x
if((z.b&8)!==0)z.a.cB()
P.e5(z.e)},"$0","gdZ",0,0,6],
e1:[function(){var z=this.x
if((z.b&8)!==0)z.a.cD()
P.e5(z.f)},"$0","ge0",0,0,6]},
on:{"^":"d;$ti",
cB:function(){this.b.cB()},
cD:function(){this.b.cD()},
c1:function(){var z=this.b.c1()
if(z==null){this.a.bn(null)
return}return z.bT(new P.oo(this))},
eb:function(){this.a.bn(null)}},
oo:{"^":"a:1;a",
$0:function(){this.a.a.bn(null)}},
pi:{"^":"on;cJ:c@,a,b,$ti"},
c7:{"^":"d;cn:e<,$ti",
is:function(a){if(a==null)return
this.r=a
if(!a.gK(a)){this.e=(this.e|64)>>>0
this.r.cM(this)}},
jT:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fj()
if((z&4)===0&&(this.e&32)===0)this.dR(this.gdZ())},
cB:function(){return this.jT(null)},
cD:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.cM(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dR(this.ge0())}}}},
c1:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dH()
z=this.f
return z==null?$.$get$ba():z},
gf_:function(){return(this.e&4)!==0},
gcw:function(){return this.e>=128},
dH:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fj()
if((this.e&32)===0)this.r=null
this.f=this.dY()},
bG:["ht",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.ck(a)
else this.c_(new P.dT(a,null,[H.w(this,"c7",0)]))}],
bZ:["hu",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cm(a,b)
else this.c_(new P.dU(a,b,null))}],
dG:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cl()
else this.c_(C.u)},
e_:[function(){},"$0","gdZ",0,0,6],
e1:[function(){},"$0","ge0",0,0,6],
dY:function(){return},
c_:function(a){var z,y
z=this.r
if(z==null){z=new P.dZ(null,null,0,[H.w(this,"c7",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cM(this)}},
ck:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.h_(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dJ((z&4)!==0)},
cm:function(a,b){var z,y
z=this.e
y=new P.oG(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dH()
z=this.f
if(!!J.n(z).$isM&&z!==$.$get$ba())z.bT(y)
else y.$0()}else{y.$0()
this.dJ((z&4)!==0)}},
cl:function(){var z,y
z=new P.oF(this)
this.dH()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isM&&y!==$.$get$ba())y.bT(z)
else z.$0()},
dR:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dJ((z&4)!==0)},
dJ:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gK(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gK(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.e_()
else this.e1()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cM(this)},
eK:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.e4(b==null?P.pY():b,z)
this.c=c==null?P.pX():c}},
oG:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ar(y,{func:1,args:[P.d,P.aT]})
w=z.d
v=this.b
u=z.b
if(x)w.kd(u,v,this.c)
else w.h_(u,v)
z.e=(z.e&4294967263)>>>0}},
oF:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fY(z.c)
z.e=(z.e&4294967263)>>>0}},
pl:{"^":"a8;$ti",
aw:function(a,b,c,d){return this.a.iu(a,d,c,!0===b)},
ep:function(a,b,c){return this.aw(a,null,b,c)}},
dV:{"^":"d;c5:a@,$ti"},
dT:{"^":"dV;as:b<,a,$ti",
eq:function(a){a.ck(this.b)}},
dU:{"^":"dV;be:b<,bc:c<,a",
eq:function(a){a.cm(this.b,this.c)},
$asdV:I.b5},
oI:{"^":"d;",
eq:function(a){a.cl()},
gc5:function(){return},
sc5:function(a){throw H.c(new P.F("No events after a done."))}},
pd:{"^":"d;cn:a<,$ti",
cM:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cg(new P.pe(this,a))
this.a=1},
fj:function(){if(this.a===1)this.a=3}},
pe:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc5()
z.b=w
if(w==null)z.c=null
x.eq(this.b)}},
dZ:{"^":"pd;b,c,a,$ti",
gK:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc5(b)
this.c=b}}},
pm:{"^":"d;a,b,c,$ti"},
pC:{"^":"a:1;a,b,c",
$0:function(){return this.a.b0(this.b,this.c)}},
pB:{"^":"a:20;a,b",
$2:function(a,b){P.pA(this.a,this.b,a,b)}},
pD:{"^":"a:1;a,b",
$0:function(){return this.a.b_(this.b)}},
dW:{"^":"a8;$ti",
aw:function(a,b,c,d){return this.hT(a,d,c,!0===b)},
ep:function(a,b,c){return this.aw(a,null,b,c)},
hT:function(a,b,c,d){return P.oM(this,a,b,c,d,H.w(this,"dW",0),H.w(this,"dW",1))},
eX:function(a,b){b.bG(a)},
i3:function(a,b,c){c.bZ(a,b)},
$asa8:function(a,b){return[b]}},
h0:{"^":"c7;x,y,a,b,c,d,e,f,r,$ti",
bG:function(a){if((this.e&2)!==0)return
this.ht(a)},
bZ:function(a,b){if((this.e&2)!==0)return
this.hu(a,b)},
e_:[function(){var z=this.y
if(z==null)return
z.cB()},"$0","gdZ",0,0,6],
e1:[function(){var z=this.y
if(z==null)return
z.cD()},"$0","ge0",0,0,6],
dY:function(){var z=this.y
if(z!=null){this.y=null
return z.c1()}return},
kx:[function(a){this.x.eX(a,this)},"$1","gi0",2,0,function(){return H.b3(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"h0")}],
kz:[function(a,b){this.x.i3(a,b,this)},"$2","gi2",4,0,46],
ky:[function(){this.dG()},"$0","gi1",0,0,6],
hE:function(a,b,c,d,e,f,g){this.y=this.x.a.ep(this.gi0(),this.gi1(),this.gi2())},
$asc7:function(a,b){return[b]},
A:{
oM:function(a,b,c,d,e,f,g){var z,y
z=$.o
y=e?1:0
y=new P.h0(a,null,null,null,null,z,y,null,null,[f,g])
y.eK(b,c,d,e,g)
y.hE(a,b,c,d,e,f,g)
return y}}},
pb:{"^":"dW;b,a,$ti",
eX:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.pv(b,y,x)
return}b.bG(z)}},
cm:{"^":"d;be:a<,bc:b<",
k:function(a){return H.b(this.a)},
$isX:1},
pu:{"^":"d;"},
pO:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cE()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
pf:{"^":"pu;",
fY:function(a){var z,y,x,w
try{if(C.h===$.o){x=a.$0()
return x}x=P.hg(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
h_:function(a,b){var z,y,x,w
try{if(C.h===$.o){x=a.$1(b)
return x}x=P.hi(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
kd:function(a,b,c){var z,y,x,w
try{if(C.h===$.o){x=a.$2(b,c)
return x}x=P.hh(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
e9:function(a,b){if(b)return new P.pg(this,a)
else return new P.ph(this,a)},
i:function(a,b){return},
fX:function(a){if($.o===C.h)return a.$0()
return P.hg(null,null,this,a)},
ev:function(a,b){if($.o===C.h)return a.$1(b)
return P.hi(null,null,this,a,b)},
kc:function(a,b,c){if($.o===C.h)return a.$2(b,c)
return P.hh(null,null,this,a,b,c)}},
pg:{"^":"a:1;a,b",
$0:function(){return this.a.fY(this.b)}},
ph:{"^":"a:1;a,b",
$0:function(){return this.a.fX(this.b)}}}],["","",,P,{"^":"",
dm:function(a,b){return new H.N(0,null,null,null,null,null,0,[a,b])},
aR:function(){return new H.N(0,null,null,null,null,null,0,[null,null])},
ae:function(a){return H.r2(a,new H.N(0,null,null,null,null,null,0,[null,null]))},
kt:function(a,b,c){var z,y
if(P.e2(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bM()
y.push(a)
try{P.pK(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fx(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bV:function(a,b,c){var z,y,x
if(P.e2(a))return b+"..."+c
z=new P.bG(b)
y=$.$get$bM()
y.push(a)
try{x=z
x.v=P.fx(x.gv(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.v=y.gv()+c
y=z.gv()
return y.charCodeAt(0)==0?y:y},
e2:function(a){var z,y
for(z=0;y=$.$get$bM(),z<y.length;++z)if(a===y[z])return!0
return!1},
pK:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gY(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gG();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.u();t=s,s=r){r=z.gG();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
kG:function(a,b,c,d,e){return new H.N(0,null,null,null,null,null,0,[d,e])},
bZ:function(a,b,c){var z=P.kG(null,null,null,b,c)
a.L(0,new P.pZ(z))
return z},
U:function(a,b,c,d){return new P.h3(0,null,null,null,null,null,0,[d])},
aZ:function(a,b){var z,y
z=P.U(null,null,null,b)
for(y=J.aj(a);y.u();)z.q(0,y.gG())
return z},
dr:function(a){var z,y,x
z={}
if(P.e2(a))return"{...}"
y=new P.bG("")
try{$.$get$bM().push(a)
x=y
x.v=x.gv()+"{"
z.a=!0
a.L(0,new P.kO(z,y))
z=y
z.v=z.gv()+"}"}finally{z=$.$get$bM()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gv()
return z.charCodeAt(0)==0?z:z},
h4:{"^":"N;a,b,c,d,e,f,r,$ti",
cu:function(a){return H.rl(a)&0x3ffffff},
cv:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfC()
if(x==null?b==null:x===b)return y}return-1},
A:{
bJ:function(a,b){return new P.h4(0,null,null,null,null,null,0,[a,b])}}},
h3:{"^":"oZ;a,b,c,d,e,f,r,$ti",
dW:function(){return new P.h3(0,null,null,null,null,null,0,this.$ti)},
gY:function(a){var z=new P.ao(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gaf:function(a){return this.a!==0},
a_:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hR(b)},
hR:function(a){var z=this.d
if(z==null)return!1
return this.cU(z[this.cT(a)],a)>=0},
c4:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a_(0,a)?a:null
else return this.i7(a)},
i7:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cT(a)]
x=this.cU(y,a)
if(x<0)return
return J.at(y,x).geT()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gC:function(a){var z=this.f
if(z==null)throw H.c(new P.F("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eO(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eO(x,b)}else return this.at(b)},
at:function(a){var z,y,x
z=this.d
if(z==null){z=P.p7()
this.d=z}y=this.cT(a)
x=z[y]
if(x==null)z[y]=[this.dK(a)]
else{if(this.cU(x,a)>=0)return!1
x.push(this.dK(a))}return!0},
ar:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eP(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eP(this.c,b)
else return this.ik(b)},
ik:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cT(a)]
x=this.cU(y,a)
if(x<0)return!1
this.eQ(y.splice(x,1)[0])
return!0},
hY:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.ar(0,y)}},
aW:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eO:function(a,b){if(a[b]!=null)return!1
a[b]=this.dK(b)
return!0},
eP:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eQ(z)
delete a[b]
return!0},
dK:function(a){var z,y
z=new P.p6(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eQ:function(a){var z,y
z=a.ghQ()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cT:function(a){return J.j(a)&0x3ffffff},
cU:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].geT(),b))return y
return-1},
$isbB:1,
$isT:1,
A:{
p7:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
p6:{"^":"d;eT:a<,b,hQ:c<"},
ao:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
oZ:{"^":"mo;$ti",
bv:function(a){var z=this.dW()
z.an(0,this)
return z}},
cA:{"^":"y;$ti"},
pZ:{"^":"a:7;a",
$2:function(a,b){this.a.m(0,a,b)}},
eV:{"^":"f_;$ti"},
f_:{"^":"d+b_;$ti",$asI:null,$asT:null,$isI:1,$isT:1},
b_:{"^":"d;$ti",
gY:function(a){return new H.dn(this,this.gl(this),0,null,[H.w(this,"b_",0)])},
ai:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gaf:function(a){return!this.gK(this)},
gC:function(a){if(this.gl(this)===0)throw H.c(H.ad())
return this.i(0,this.gl(this)-1)},
a_:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.f(this.i(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bK:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aX:function(a,b){return new H.ak(this,b,[H.w(this,"b_",0),null])},
dB:function(a,b){return H.fz(this,b,null,H.w(this,"b_",0))},
bv:function(a){var z,y
z=P.U(null,null,null,H.w(this,"b_",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.i(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.m(0,z,b)},
ar:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.f(this.i(0,z),b)){this.aO(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
hX:function(a,b){var z,y,x,w
z=H.t([],[H.w(this,"b_",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.f(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hl(0,0,z.length,z)
this.sl(0,z.length)}},
aO:function(a,b,c,d,e){var z,y,x,w,v
P.cJ(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aL(d,"$isI",[H.w(this,"b_",0)],"$asI")){y=e
x=d}else{x=J.id(d,e).bu(0,!1)
y=0}w=J.K(x)
if(y+z>w.gl(x))throw H.c(H.eM())
if(y<b)for(v=z-1;v>=0;--v)this.m(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.m(0,b+v,w.i(x,y+v))},
hl:function(a,b,c,d){return this.aO(a,b,c,d,0)},
k:function(a){return P.bV(this,"[","]")},
$isI:1,
$isT:1},
pt:{"^":"d;$ti",
m:function(a,b,c){throw H.c(new P.O("Cannot modify unmodifiable map"))},
$isE:1},
kM:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){this.a.m(0,b,c)},
a0:function(a){return this.a.a0(a)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gaf:function(a){var z=this.a
return z.gaf(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isE:1},
fV:{"^":"kM+pt;a,$ti",$asE:null,$isE:1},
kO:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.v+=", "
z.a=!1
z=this.b
y=z.v+=H.b(a)
z.v=y+": "
z.v+=H.b(b)}},
kH:{"^":"aS;a,b,c,d,$ti",
gY:function(a){return new P.h5(this,this.c,this.d,this.b,null,this.$ti)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
gK:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gC:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ad())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
ai:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cx(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.at(b)},
an:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aL(b,"$isI",z,"$asI")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.kI(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.iy(s)
this.a=s
this.b=0
C.a.aO(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aO(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aO(v,z,z+r,b,0)
C.a.aO(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.h5(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.at(z.e)},
aW:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bV(this,"{","}")},
fh:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eW();++this.d},
de:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ad());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
at:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.eW();++this.d},
eW:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aO(y,0,w,z,x)
C.a.aO(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iy:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aO(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aO(a,0,v,x,z)
C.a.aO(a,v,v+this.c,this.a,0)
return this.c+v}},
hw:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
A:{
b0:function(a,b){var z=new P.kH(null,0,0,0,[b])
z.hw(a,b)
return z},
kI:function(a){var z
a=C.t.eC(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
h5:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.h(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
mp:{"^":"d;$ti",
gK:function(a){return this.a===0},
gaf:function(a){return this.a!==0},
an:function(a,b){var z
for(z=J.aj(b);z.u();)this.q(0,z.gG())},
iX:function(a){var z,y
for(z=a.a,y=new P.ao(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a_(0,y.d))return!1
return!0},
bu:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ao(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
c8:function(a){return this.bu(a,!0)},
aX:function(a,b){return new H.bt(this,b,[H.m(this,0),null])},
k:function(a){return P.bV(this,"{","}")},
L:function(a,b){var z
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
b4:function(a,b,c){var z,y
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gC:function(a){var z,y
z=new P.ao(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ad())
do y=z.d
while(z.u())
return y},
bf:function(a,b,c){var z,y
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
aH:function(a,b){var z,y,x,w
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dh())
y=w
x=!0}}if(x)return y
throw H.c(H.ad())},
$isbB:1,
$isT:1},
mo:{"^":"mp;$ti"}}],["","",,P,{"^":"",
cX:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.p1(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cX(a[z])
return a},
pN:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.P(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eJ(w,null,null))}w=P.cX(z)
return w},
u1:[function(a){return a.dj()},"$1","qU",2,0,0],
p1:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.ii(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cd().length
return z},
gK:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cd().length
return z===0},
gaf:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cd().length
return z>0},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a0(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iw().m(0,b,c)},
a0:function(a){if(this.b==null)return this.c.a0(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.cd()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cX(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dr(this)},
cd:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iw:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dm(P.q,null)
y=this.cd()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
ii:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cX(this.a[a])
return this.b[a]=z},
$isE:1,
$asE:function(){return[P.q,null]}},
ey:{"^":"d;$ti"},
cs:{"^":"d;$ti"},
dl:{"^":"X;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
kz:{"^":"dl;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
ky:{"^":"ey;a,b",
j0:function(a,b){var z=P.pN(a,this.gj1().a)
return z},
j_:function(a){return this.j0(a,null)},
j9:function(a,b){var z=this.gja()
z=P.p3(a,z.b,z.a)
return z},
fq:function(a){return this.j9(a,null)},
gja:function(){return C.N},
gj1:function(){return C.M},
$asey:function(){return[P.d,P.q]}},
kB:{"^":"cs;a,b",
$ascs:function(){return[P.d,P.q]}},
kA:{"^":"cs;a",
$ascs:function(){return[P.q,P.d]}},
p4:{"^":"d;",
h8:function(a){var z,y,x,w,v,u,t
z=J.K(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cr(a,v)
if(u>92)continue
if(u<32){if(v>w)x.v+=C.b.ax(a,w,v)
w=v+1
x.v+=H.ag(92)
switch(u){case 8:x.v+=H.ag(98)
break
case 9:x.v+=H.ag(116)
break
case 10:x.v+=H.ag(110)
break
case 12:x.v+=H.ag(102)
break
case 13:x.v+=H.ag(114)
break
default:x.v+=H.ag(117)
x.v+=H.ag(48)
x.v+=H.ag(48)
t=u>>>4&15
x.v+=H.ag(t<10?48+t:87+t)
t=u&15
x.v+=H.ag(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.v+=C.b.ax(a,w,v)
w=v+1
x.v+=H.ag(92)
x.v+=H.ag(u)}}if(w===0)x.v+=H.b(a)
else if(w<y)x.v+=z.ax(a,w,y)},
dI:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.kz(a,null))}z.push(a)},
dn:function(a){var z,y,x,w
if(this.h7(a))return
this.dI(a)
try{z=this.b.$1(a)
if(!this.h7(z))throw H.c(new P.dl(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dl(a,y))}},
h7:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.v+=C.n.k(a)
return!0}else if(a===!0){this.c.v+="true"
return!0}else if(a===!1){this.c.v+="false"
return!0}else if(a==null){this.c.v+="null"
return!0}else if(typeof a==="string"){z=this.c
z.v+='"'
this.h8(a)
z.v+='"'
return!0}else{z=J.n(a)
if(!!z.$isI){this.dI(a)
this.kq(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isE){this.dI(a)
y=this.kr(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kq:function(a){var z,y,x
z=this.c
z.v+="["
y=J.K(a)
if(y.gl(a)>0){this.dn(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.v+=","
this.dn(y.i(a,x))}}z.v+="]"},
kr:function(a){var z,y,x,w,v,u,t
z={}
if(a.gK(a)){this.c.v+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.p5(z,x))
if(!z.b)return!1
w=this.c
w.v+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.v+=v
this.h8(x[u])
w.v+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dn(x[t])}w.v+="}"
return!0}},
p5:{"^":"a:7;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.e(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.e(z,w)
z[w]=b}},
p2:{"^":"p4;c,a,b",A:{
p3:function(a,b,c){var z,y,x
z=new P.bG("")
y=new P.p2(z,[],P.qU())
y.dn(a)
x=z.v
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
tz:[function(a,b){return J.ci(a,b)},"$2","qV",4,0,41],
eE:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.jP(a)},
jP:function(a){var z=J.n(a)
if(!!z.$isa)return z.k(a)
return H.cG(a)},
cv:function(a){return new P.oL(a)},
V:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.aj(a);y.u();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
kJ:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
ee:function(a){H.rq(H.b(a))},
be:function(a,b,c){return new H.eS(a,H.dj(a,!1,b,!1),null,null)},
W:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
ct:{"^":"d;ix:a<,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.ct))return!1
return this.a===b.a&&!0},
bq:function(a,b){return C.e.bq(this.a,b.gix())},
gw:function(a){var z=this.a
return(z^C.e.d_(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.ji(H.lx(this))
y=P.bS(H.lv(this))
x=P.bS(H.lr(this))
w=P.bS(H.ls(this))
v=P.bS(H.lu(this))
u=P.bS(H.lw(this))
t=P.jj(H.lt(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjr()
y=new P.ct(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.h(P.G(y.gjN()))
return y},
gjN:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.ct]},
A:{
ji:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jj:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bS:function(a){if(a>=10)return""+a
return"0"+a}}},
aM:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+double":0,
aY:{"^":"d;bI:a<",
a1:function(a,b){return new P.aY(this.a+b.gbI())},
aI:function(a,b){return new P.aY(this.a-b.gbI())},
bW:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.aY(C.n.fW(this.a*b))},
aG:function(a,b){return C.e.aG(this.a,b.gbI())},
by:function(a,b){return this.a>b.gbI()},
bV:function(a,b){return C.e.bV(this.a,b.gbI())},
bE:function(a,b){return C.e.bE(this.a,b.gbI())},
gjr:function(){return C.e.bB(this.a,1000)},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aY))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
bq:function(a,b){return C.e.bq(this.a,b.gbI())},
k:function(a){var z,y,x,w,v
z=new P.jx()
y=this.a
if(y<0)return"-"+new P.aY(0-y).k(0)
x=z.$1(C.e.bB(y,6e7)%60)
w=z.$1(C.e.bB(y,1e6)%60)
v=new P.jw().$1(y%1e6)
return""+C.e.bB(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eB:function(a){return new P.aY(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aY]}},
jw:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
jx:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
X:{"^":"d;",
gbc:function(){return H.A(this.$thrownJsError)}},
cE:{"^":"X;",
k:function(a){return"Throw of null."}},
aX:{"^":"X;a,b,h:c<,d",
gdO:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdN:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdO()+y+x
if(!this.a)return w
v=this.gdN()
u=P.eE(this.b)
return w+v+": "+H.b(u)},
A:{
G:function(a){return new P.aX(!1,null,null,a)},
cl:function(a,b,c){return new P.aX(!0,a,b,c)},
l:function(a){return new P.aX(!1,null,a,"Must not be null")}}},
dF:{"^":"aX;e,f,a,b,c,d",
gdO:function(){return"RangeError"},
gdN:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
lD:function(a){return new P.dF(null,null,!1,null,null,a)},
c0:function(a,b,c){return new P.dF(null,null,!0,a,b,"Value not in range")},
Y:function(a,b,c,d,e){return new P.dF(b,c,!0,a,d,"Invalid value")},
lE:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.Y(a,b,c,d,e))},
cJ:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.Y(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.Y(b,a,c,"end",f))
return b}}},
ki:{"^":"aX;e,l:f>,a,b,c,d",
gdO:function(){return"RangeError"},
gdN:function(){if(J.bP(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
A:{
cx:function(a,b,c,d,e){var z=e!=null?e:J.aD(b)
return new P.ki(b,z,!0,a,c,"Index out of range")}}},
O:{"^":"X;a",
k:function(a){return"Unsupported operation: "+this.a}},
ai:{"^":"X;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
F:{"^":"X;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"X;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eE(z))+"."}},
l2:{"^":"d;",
k:function(a){return"Out of Memory"},
gbc:function(){return},
$isX:1},
fs:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbc:function(){return},
$isX:1},
jh:{"^":"X;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
oL:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eJ:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.ax(x,0,75)+"..."
return y+"\n"+x}},
jT:{"^":"d;h:a<,f0,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.f0
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.cl(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dB(b,"expando$values")
return y==null?null:H.dB(y,z)},
m:function(a,b,c){var z,y
z=this.f0
if(typeof z!=="string")z.set(b,c)
else{y=H.dB(b,"expando$values")
if(y==null){y=new P.d()
H.f6(b,"expando$values",y)}H.f6(y,z,c)}}},
bv:{"^":"d;"},
u:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+int":0,
y:{"^":"d;$ti",
aX:function(a,b){return H.bw(this,b,H.w(this,"y",0),null)},
bU:["eJ",function(a,b){return new H.J(this,b,[H.w(this,"y",0)])}],
a_:function(a,b){var z
for(z=this.gY(this);z.u();)if(J.f(z.gG(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gY(this);z.u();)b.$1(z.gG())},
b4:function(a,b,c){var z,y
for(z=this.gY(this),y=b;z.u();)y=c.$2(y,z.gG())
return y},
bu:function(a,b){return P.V(this,b,H.w(this,"y",0))},
c8:function(a){return this.bu(a,!0)},
bv:function(a){return P.aZ(this,H.w(this,"y",0))},
gl:function(a){var z,y
z=this.gY(this)
for(y=0;z.u();)++y
return y},
gK:function(a){return!this.gY(this).u()},
gaf:function(a){return!this.gK(this)},
dB:function(a,b){return H.mr(this,b,H.w(this,"y",0))},
gC:function(a){var z,y
z=this.gY(this)
if(!z.u())throw H.c(H.ad())
do y=z.gG()
while(z.u())
return y},
gbY:function(a){var z,y
z=this.gY(this)
if(!z.u())throw H.c(H.ad())
y=z.gG()
if(z.u())throw H.c(H.dh())
return y},
ai:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.h(P.Y(b,0,null,"index",null))
for(z=this.gY(this),y=0;z.u();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cx(b,this,"index",null,y))},
k:function(a){return P.kt(this,"(",")")}},
cB:{"^":"d;$ti"},
I:{"^":"d;$ti",$isy:1,$isT:1},
"+List":0,
E:{"^":"d;$ti"},
al:{"^":"d;",
gw:function(a){return P.d.prototype.gw.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isQ:1,
$asQ:function(){return[P.L]}},
"+num":0,
d:{"^":";",
t:function(a,b){return this===b},
gw:function(a){return H.av(this)},
k:function(a){return H.cG(this)},
gbj:function(a){return new H.an(H.hD(this),null)},
toString:function(){return this.k(this)}},
bc:{"^":"d;"},
bB:{"^":"T;$ti"},
aT:{"^":"d;"},
q:{"^":"d;",$isQ:1,
$asQ:function(){return[P.q]},
$isdy:1},
"+String":0,
bG:{"^":"d;v<",
gl:function(a){return this.v.length},
gK:function(a){return this.v.length===0},
gaf:function(a){return this.v.length!==0},
k:function(a){var z=this.v
return z.charCodeAt(0)==0?z:z},
A:{
fx:function(a,b,c){var z=J.aj(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.u())}else{a+=H.b(z.gG())
for(;z.u();)a=a+c+H.b(z.gG())}return a},
nh:function(a){return new P.bG(a)}}}}],["","",,P,{"^":"",fi:{"^":"d;"}}],["","",,P,{"^":"",
cH:function(a){return C.F},
p0:{"^":"d;",
a7:function(a){if(a<=0||a>4294967296)throw H.c(P.lD("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
jR:function(){return Math.random()}}}],["","",,S,{"^":"",j7:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a0:function(a){return this.b.a0(a)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){var z=this.b
return z.gK(z)},
gaf:function(a){var z=this.b
return z.gaf(z)},
gl:function(a){var z=this.b
return z.gl(z)},
m:function(a,b,c){this.hS()
this.b.m(0,b,c)},
k:function(a){return J.i(this.b)},
hS:function(){if(!this.a)return
this.a=!1
this.b=P.bZ(this.b,H.m(this,0),H.m(this,1))},
$isE:1}}],["","",,A,{"^":"",j8:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c4:function(a){return this.b.c4(a)},
a_:function(a,b){return this.b.a_(0,b)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){return this.b.a===0},
gaf:function(a){return this.b.a!==0},
gY:function(a){var z,y
z=this.b
y=new P.ao(z,z.r,null,null,[null])
y.c=z.e
return y},
gC:function(a){var z=this.b
return z.gC(z)},
aX:function(a,b){var z=this.b
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
bv:function(a){var z,y
z=this.b
y=z.dW()
y.an(0,z)
return y},
q:function(a,b){this.i9()
return this.b.q(0,b)},
k:function(a){return J.i(this.b)},
i9:function(){if(!this.a)return
this.a=!1
this.b=P.aZ(this.b,H.m(this,0))},
$isbB:1,
$isT:1}}],["","",,S,{"^":"",da:{"^":"d;f2:a<,b,$ti",
a4:function(a){var z=new S.af(null,null,this.$ti)
z.au()
z.n(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=X.bq(this.a)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isda)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
k:function(a){return J.i(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
gY:function(a){var z=this.a
return new J.bQ(z,z.length,0,null,[H.m(z,0)])},
aX:function(a,b){var z=this.a
z.toString
return new H.ak(z,b,[H.m(z,0),null])},
a_:function(a,b){var z=this.a
return(z&&C.a).a_(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
bv:function(a){var z=this.a
z.toString
return P.aZ(z,H.m(z,0))},
gK:function(a){return this.a.length===0},
gaf:function(a){return this.a.length!==0},
gC:function(a){var z=this.a
return(z&&C.a).gC(z)},
au:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new BuiltList<int>"'))}},af:{"^":"d;f2:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.da(z,null,this.$ti)
y.au()
this.a=z
this.b=y
z=y}return z},
n:function(a){if(H.aL(a,"$isda",this.$ti,null)){this.a=a.gf2()
this.b=a}else{this.a=P.V(a,!0,H.m(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z
if(c==null)H.h(P.G("null element"))
z=this.ge3()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.h(P.G("null element"))
z=this.ge3();(z&&C.a).q(z,b)},
ar:function(a,b){var z=this.ge3();(z&&C.a).ar(z,b)},
aX:function(a,b){var z=this.a
z.toString
z=new H.ak(z,b,[H.m(z,0),null]).bu(0,!0)
this.a=z
this.b=null
this.hN(z)},
ge3:function(){if(this.b!=null){this.a=P.V(this.a,!0,H.m(this,0))
this.b=null}return this.a},
au:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new ListBuilder<int>"'))},
hN:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.as)(a),++x){w=a[x]
if(!H.d0(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cp:{"^":"d;i8:a<,b,c,d,$ti",
a4:function(a){var z=new A.dq(null,null,this.$ti)
z.ci()
z.n(this)
a.$1(z)
return z.p()},
D:function(){return new S.j7(!0,this.a,this.$ti)},
gw:function(a){var z=this.b
if(z==null){z=this.a.gc2()
z=H.bw(z,new A.iT(this),H.w(z,"y",0),null)
z=P.V(z,!1,H.w(z,"y",0))
C.a.eF(z)
z=X.bq(z)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$iscp)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc2()
this.c=z}z=z.gY(z)
for(;z.u();){v=z.gG()
if(!J.f(y.i(0,v),x.i(0,v)))return!1}return!0},
k:function(a){return J.i(this.a)},
i:function(a,b){return this.a.i(0,b)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gaf:function(a){var z=this.a
return z.gaf(z)},
gl:function(a){var z=this.a
return z.gl(z)},
ci:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.an(H.S(H.m(this,1)),null).t(0,C.m))throw H.c(new P.O('explicit value type required, for example "new BuiltMap<int, int>"'))}},iT:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.cY(X.aU(X.aU(0,J.j(z)),J.j(y)))}},dq:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cp(this.a,null,null,null,this.$ti)
z.ci()
this.b=z}return z},
n:function(a){var z
if(H.aL(a,"$iscp",this.$ti,null)){this.b=a
this.a=a.gi8()}else if(!!a.$iscp){z=P.bZ(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isE){z=P.bZ(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbj(a))))},
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){if(c==null)H.h(P.G("null value"))
this.gio().m(0,b,c)},
gio:function(){if(this.b!=null){this.a=P.bZ(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
ci:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.an(H.S(H.m(this,1)),null).t(0,C.m))throw H.c(new P.O('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",db:{"^":"d;iq:a<,b,$ti",
a4:function(a){var z=new L.bf(null,null,this.$ti)
z.bo()
z.n(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.V(new H.bt(z,new L.iU(),[H.m(z,0),null]),!1,null)
C.a.eF(z)
z=X.bq(z)
this.b=z}return z},
t:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isdb)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gw(b)
x=this.gw(this)
if(z==null?x!=null:z!==x)return!1
return y.iX(b)},
k:function(a){return J.i(this.a)},
gl:function(a){return this.a.a},
c4:function(a){return this.a.c4(a)},
gY:function(a){var z,y
z=this.a
y=new P.ao(z,z.r,null,null,[null])
y.c=z.e
return y},
aX:function(a,b){var z=this.a
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
a_:function(a,b){return this.a.a_(0,b)},
L:function(a,b){return this.a.L(0,b)},
bv:function(a){return new A.j8(!0,this.a,this.$ti)},
gK:function(a){return this.a.a===0},
gaf:function(a){return this.a.a!==0},
gC:function(a){var z=this.a
return z.gC(z)},
bo:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new BuiltSet<int>"'))}},iU:{"^":"a:0;",
$1:function(a){return J.j(a)}},bf:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.db(this.a,null,this.$ti)
z.bo()
this.b=z}return z},
n:function(a){var z,y,x,w
if(H.aL(a,"$isdb",this.$ti,null)){this.a=a.giq()
this.b=a}else{z=H.m(this,0)
y=P.U(null,null,null,z)
for(x=J.aj(a);x.u();){w=x.gG()
if(H.d0(w,z))y.q(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.h(P.G("null element"))
this.gf9().q(0,b)},
aX:function(a,b){var z=this.a
z.toString
z=P.aZ(new H.bt(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.ir(z)},
gf9:function(){if(this.b!=null){this.a=P.aZ(this.a,H.m(this,0))
this.b=null}return this.a},
bo:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new SetBuilder<int>"'))},
ir:function(a){var z,y,x
for(z=new P.ao(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.d0(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
R:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",m0:{"^":"lZ;ch,cx,aq:cy@,aZ:db@,bm:dx@,b,c,d,e,f,r,x,y,z,Q,a",
fQ:function(){var z=$.$get$ch()
z.m(0,"game",this.cx)
z.m(0,"hitpoints",this.cy)
z.m(0,"stamina",this.db)
z.m(0,"gold",this.dx)},
jt:function(){var z,y,x,w
this.cx=null
this.cy=Z.bE("Health",new N.m3(),"#CCCCCC","Your physical state",100,0,!0,P.aM)
z=P.u
this.db=Z.bE("Stamina",new N.m4(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bE("Gold",new N.m5(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bN()
x=this.cy
w=this.db
y=new O.eD(N.bb("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a_(H.t([],[Y.a6]),0,P.aR()),x,w,z,O.rw(),O.rv(),O.ru(),y,this.gho(),new P.bG(""),!1,null)
y.hm()
this.cx=y
y.x="endGame"
$.$get$cc().q(0,0)},
hz:function(){var z,y
z=new O.cN([[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.m(0,"start",z)
z.a="start"
z=new O.cN([new N.m2(this),[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y.m(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cN(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.m(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
A:{
m1:function(){var z,y,x,w
z=Z.bE("Health",new N.qw(),"#CCCCCC","Your physical state",100,0,!0,P.aM)
y=P.u
x=Z.bE("Stamina",new N.qy(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bE("Gold",new N.qz(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.m0("net.filiph.edgehead.0.0.1",null,z,x,y,new O.m6(new H.N(0,null,null,null,null,null,0,[w,O.cN])),null,null,null,P.U(null,null,null,w),!1,null,-9999,null,null,null)
z.hz()
return z}}},qw:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.bV(a,0.5))return"\ud83d\ude23"
if(z.aG(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},qy:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},qz:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},m2:{"^":"a:18;a",
$0:function(){var z=0,y=P.au(),x=this
var $async$$0=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:z=2
return P.ap(x.a.cx.bi(),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},m3:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.bV(a,0.5))return"\ud83d\ude23"
if(z.aG(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},m4:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},m5:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bT:{"^":"d;"},jN:{"^":"d;"},o8:{"^":"bT;a,b",
a4:function(a){var z=new M.dQ(null,!1,0)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bT))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return Y.R(Y.k(Y.k(0,C.K.gw(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},dQ:{"^":"jN;c,a,b",
gbF:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
n:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbF()
y=this.a
this.gbF()
z=new M.o8(y,this.b)}this.n(z)
return z}}}],["","",,O,{"^":"",
u5:[function(a){var z,y
z=a.gbX()
y=a.gbN()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","ce",2,0,19],
uc:[function(a){var z,y,x
z=a.gbX()
y=a.gcF()
if(typeof y!=="number")return H.x(y)
x=a.gbN()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ht",2,0,19],
eD:{"^":"kL;y,z,Q,ch,cx,cy,db,dx,dy,bw:fr<,fx,eG:fy<,aq:go<,aZ:id<,bm:k1<,a,b,c,d,e,f,r,x",
hm:function(){var z,y,x,w,v,u
z=$.$get$aW()
y=$.$get$cd()
this.cy=R.b8(1000,"orc",O.ce(),null,new U.c5(!1,10,!0,z,"sword",C.c),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b8(1001,"goblin",O.ce(),null,new U.c5(!1,10,!0,z,"scimitar",C.c),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.af(null,null,[Q.v])
y.au()
y.n([new Q.v("kill_arguth","","",null)])
this.dx=new K.c2(y.p(),"preStartBook",new O.jE(),new O.jF(),null,null,"ground")
y=R.b8(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.z,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.cL()
if(typeof y!=="number")return H.x(y)
this.go.sas(z/y)
this.id.sas(this.ch.fy)
this.k1.sas(this.ch.r)
this.cx=R.b8(100,"Briana",null,this.dx.b,null,this.ch.y,0,2,0,!1,2,!0,C.W,0,null)
this.dy=F.fd(this.dx,!1)
y=K.c2
x=P.V($.$get$hm(),!0,y)
C.a.an(x,[this.dx,$.$get$e8()])
w=new M.dQ(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.aZ([z,v],R.C)
z=P.b0(null,O.cj)
u=new A.a7(v,P.U(null,null,null,U.aP),w,z,P.aZ(x,y),P.V([u],!0,S.a2),0,null)
this.fr=u
y=new Y.a_(H.t([],[Y.a6]),0,P.aR())
y.b=u.r
this.fx=new B.bx(u,null,y,1,1,!0,!1,!1,0)},
cI:function(){var z=0,y=P.au(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cI=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gj8()
if(v.fN(u)){z=1
break}t=w.fr.al(w.ch.y)
s=t.gaq()
r=t.gfI()
if(typeof s!=="number"){x=s.cL()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sas(s/r)
w.id.sas(t.gaZ())
w.k1.sas(t.gbm())
r=w.y
r.fE("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.F(0,"\n\n",!0)
if(w.fr.jo(w.ch.y))v.F(0,"TO BE CONTINUED.",!0)
else v.F(0,"You died.",!0)
w.f.v+=v.c6()
z=1
break}q=C.a.gC(s)
p=q.ds(w.fr)
s=w.fr
o=N.bb("ActorPlanner")
n=new H.N(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.a_(H.t([],[Y.a6]),0,P.aR())
k.b=s.r
j=new G.ij(o,l,new B.bx(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.h(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(s)+". Situation: "+H.b(s.giZ())))
z=3
return P.ap(j.jV(),$async$cI)
case 3:if(n.gK(n)){o.ey("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.n(s)
s="PlanConsequence<"+l.gw(s)+", "+l.k(s)+", "+C.t.k(null)
o.bC(m+(s+", 1, 0, >")+".")}s=Z.l9(n)
i=new Z.l8(new P.fV(n,[null,null]),s)
if(n.gK(n))$.$get$by().ey("Created with no recommendations.")
if(s.length===0){r.dw("No recommendation for "+H.b(p.gh()))
r.dw(new O.jH(w))
w.fr.fp(q.gj());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.as)(s),++h);r.bC("planner.generateTable for "+H.b(p.gh()))
j.ez().L(0,new O.jI(w))
u=i.fP(q.gfH(),O.ht())
u.toString
g=P.V(u,!1,H.w(u,"y",0))
if(g.length!==0&&C.a.bK(g,new O.jJ())){w.f.v+=v.c6()
C.a.sl(v.a,0)}v=new O.jK(new O.jM())
u=g.length-1
if(u-0<=32)H.fr(g,0,u,v)
else H.fq(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.as)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gS(),new O.jL(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfo()
z=7
return P.ap(w.ca(i.jU(s==null?O.ht():s),p,v),$async$cI)
case 7:case 5:v.fN(u)
case 1:return P.ax(x,y)}})
return P.ay($async$cI,y)},
ca:function(a,b,c){var z=0,y=P.au(),x,w=this,v,u,t
var $async$ca=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:v=a.d0(b,w.fx,w.fr)
u=P.V(v,!0,H.w(v,"y",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.ap(w.cS(a,b,u),$async$ca)
case 6:z=4
break
case 5:t=S.lB(new H.ak(u,new O.jB(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.an(c.a,w.fx.geG().a)
w.fr=w.fx.gbw()
v=w.y
v.bC(new O.jC(a,b))
v.a6(new O.jD(w,b))
case 1:return P.ax(x,y)}})
return P.ay($async$ca,y)},
cS:function(a,b,c){var z=0,y=P.au(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cS=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=a.N(b,x.fr)
v=J.n(w)
z=v.t(w,1)?2:4
break
case 2:x.fx=C.a.gbY(c)
z=3
break
case 4:z=v.t(w,0)?5:7
break
case 5:x.fx=C.a.gbY(c)
z=6
break
case 7:u=C.a.gC(J.i(a.gO()).split("."))
v=a.ag(b,x.fr)
t=a.gU()&&b.jp(a.gO())
s="use "+H.b(u)
x.f5()
z=8
return P.ap(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$cS)
case 8:r=e
t=new H.J(c,new O.jy(r),[H.m(c,0)])
x.fx=t.gbY(t)
if(r.gkp()===!0){q=A.dP(x.fx.gbw())
q.a5(b.gj(),new O.jz())
v=x.fx
t=v.gfb()
s=H.t([],[Y.a6])
p=new Y.a_(s,0,P.aR())
C.a.an(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bx(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.ax(null,y)}})
return P.ay($async$cS,y)}},
jE:{"^":"a:3;",
$3:function(a,b,c){return c.F(0,"UNUSED because this is the first choice",!0)}},
jF:{"^":"a:3;",
$3:function(a,b,c){return H.h(new P.F("Room isn't to be revisited"))}},
jH:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ak(z,new O.jG(),[H.m(z,0),null]).cz(0," <- ")}},
jG:{"^":"a:0;",
$1:function(a){return a.gb2()}},
jI:{"^":"a:0;a",
$1:function(a){return this.a.y.bC(a)}},
jM:{"^":"a:42;",
$1:function(a){if(a instanceof Q.H)return H.b(a.b.gh())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
jJ:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
jK:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.ci(z.$1(a),z.$1(b))}},
jL:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.au(),x=this,w
var $async$$0=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ap(w.ca(x.c,x.b,w.fy),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},
jB:{"^":"a:0;",
$1:function(a){return a.gjW()}},
jC:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
jD:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ak(z,new O.jA(),[H.m(z,0),null]).cz(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
jA:{"^":"a:0;",
$1:function(a){return a.gb2()}},
jy:{"^":"a:0;a",
$1:function(a){return a.gel()===this.a.gel()}},
jz:{"^":"a:0;",
$1:function(a){var z=a.gaZ()
if(typeof z!=="number")return z.aI()
a.saZ(z-1)
return a}}}],["","",,Q,{"^":"",
hy:function(a,b,c){return P.aK(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hy(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gC(t):null
s=J.ih(t.aN(y.a,y),new Q.r7(z))
t=J.aj(s.a),r=new H.fW(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gT()&&!z.eg(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aI()
case 1:return P.aJ(u)}}})},
hz:function(a,b,c){return P.aK(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hz(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.du((t.length!==0?C.a.gC(t):null).gbr()).gjc().a,t=new J.bQ(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aI()
case 1:return P.aJ(u)}}})},
hA:function(a,b,c){return P.aK(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hA(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gC(t):null).gd5(),t=t.gY(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aI()
case 1:return P.aJ(u)}}})},
r7:{"^":"a:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gbg()}},
ab:{"^":"d;",
d0:function(a,b,c){var z=this
return P.aK(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$d0(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.N(y,x.gbw())
r=J.a9(s)
v=r.by(s,0)?2:3
break
case 2:q=A.dP(w)
v=4
return B.f3(q,x,z,z.hJ(q,y,w,z.gR(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aG(s,1)?5:6
break
case 5:q=A.dP(w)
p=z.hI(q,y,w,z.gP(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.f3(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aI()
case 1:return P.aJ(t)}}})},
eM:function(a,b,c,d,e,f){var z,y,x,w,v,u
a.x=this
z=a.a.aH(0,new Q.ii(b))
y=new O.eo(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.gZ().c=x
x=b.gj()
y.gZ().f=x
y.gZ().e=C.O
y.gZ().ch=f
y.gZ().Q=e
x=this.gT()
y.gZ().y=x
x=this.ga3()
y.gZ().z=x
if(!!this.$isH){x=y.gZ()
w=x.r
if(w==null){w=new L.bf(null,null,[P.u])
w.bo()
w.n(C.f)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.h(P.G("null element"))
x.gf9().q(0,w)}v=new Y.a_(H.t([],[Y.a6]),0,P.aR())
x=a.f
u=(x.length!==0?C.a.gC(x):null).gj()
a.gw(a);(x.length!==0?C.a.gC(x):null).fM(a,v)
this.a=d.$3(z,a,v)
if(a.cV(u)!=null)a.fp(u);++a.r
w=a.eA(u)
if(!(w==null))w.fL(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gC(x):null
if((w==null?w:w.ds(a))!=null){w=x.length!==0?C.a.gC(x):null
w=!J.f(w==null?w:w.dz(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gC(x):null)==null)break
C.a.gC(x).aY(a)
C.a.b8(x)}if(this.a==null)H.h(new P.F("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.gZ().d=x
x=a.r
y.gZ().x=x
a.d.fh(y.p())
return v},
hJ:function(a,b,c,d,e){return this.eM(a,b,c,d,!1,e)},
hI:function(a,b,c,d,e){return this.eM(a,b,c,d,e,!1)}},
ii:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.gj())}},
H:{"^":"ab;bN:b<",
gX:function(){var z=new Y.a_(H.t([],[Y.a6]),0,P.aR())
z.fe(0,this.gae(),this.b)
return z.c6()},
ag:function(a,b){var z=new Y.a_(H.t([],[Y.a6]),0,P.aR())
z.iK(0,this.gak(),this.b,a,!0)
return z.c6()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gae()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cw:{"^":"ab;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
cy:{"^":"ab;",
gX:function(){var z=new Y.a_(H.t([],[Y.a6]),0,P.aR())
z.fe(0,"pick up <object>",this.b)
return z.c6()},
k:function(a){return"ItemAction<"+this.gX()+">"}},
lL:{"^":"d;a,b",
k:function(a){return this.b},
A:{"^":"tT<"}}}],["","",,O,{"^":"",cj:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},kC:{"^":"d;a,b",
k:function(a){return this.b}},o4:{"^":"cj;a,fd:b<,b2:c<,d,dd:e<,eI:f<,J:r<,h4:x<,h5:y<,z,h6:Q<",
a4:function(a){var z=new O.eo(null,null,null,null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cj))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.f(this.e,b.e))if(J.f(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.i(this.a)+",\nactionName="+J.i(this.b)+",\ndescription="+H.b(J.i(this.c))+",\nknownTo="+J.i(this.d)+",\nprotagonist="+H.b(J.i(this.e))+",\nsufferers="+J.i(this.f)+",\ntime="+J.i(this.r)+",\nwasAggressive="+J.i(this.x)+",\nwasProactive="+J.i(this.y)+",\nwasFailure="+J.i(this.z)+",\nwasSuccess="+J.i(this.Q)+",\n}"}},eo:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfd:function(){return this.gZ().c},
gb2:function(){return this.gZ().d},
gdd:function(){return this.gZ().f},
geI:function(){var z,y
z=this.gZ()
y=z.r
if(y==null){y=new L.bf(null,null,[P.u])
y.bo()
y.n(C.f)
z.r=y
z=y}else z=y
return z},
gJ:function(){return this.gZ().x},
gh4:function(){return this.gZ().y},
gh5:function(){return this.gZ().z},
gh6:function(){return this.gZ().ch},
gZ:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.bo()
y.n(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.bo()
y.n(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
if(z==null){y=this.gZ()
x=y.b
if(x==null){x=new L.bf(null,null,[P.u])
x.bo()
x.n(C.f)
y.b=x
y=x}else y=x
y=y.p()
x=this.gZ().c
w=this.gZ().d
v=this.gZ().e
u=this.gZ().f
t=this.gZ()
s=t.r
if(s==null){s=new L.bf(null,null,[P.u])
s.bo()
s.n(C.f)
t.r=s
t=s}else t=s
t=t.p()
s=this.gZ().x
r=this.gZ().y
q=this.gZ().z
p=this.gZ().Q
o=this.gZ().ch
z=new O.o4(y,x,w,v,u,t,s,r,q,p,o)
if(y==null)H.h(P.l("accomplices"))
if(x==null)H.h(P.l("actionName"))
if(w==null)H.h(P.l("description"))
if(v==null)H.h(P.l("knownTo"))
if(u==null)H.h(P.l("protagonist"))
if(t==null)H.h(P.l("sufferers"))
if(s==null)H.h(P.l("time"))
if(r==null)H.h(P.l("wasAggressive"))
if(q==null)H.h(P.l("wasProactive"))
if(p==null)H.h(P.l("wasFailure"))
if(o==null)H.h(P.l("wasSuccess"))}this.n(z)
return z}}}],["","",,R,{"^":"",
hB:function(a,b){return P.aK(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hB(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bI(new H.J(u,new R.r8(z),[H.m(u,0)]))
case 3:return P.aI()
case 1:return P.aJ(v)}}})},
b8:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.ep(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.qr(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
r8:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfv()
y=this.a.gj()
return z==null?y==null:z===y}},
C:{"^":"kP;",
gbt:function(){var z=this.x
if(typeof z!=="number")return z.by()
return z>0},
gd7:function(){return this.e==null},
gb5:function(){return this.dy===C.i},
gac:function(){return this.dy===C.l},
ga8:function(){return this.dy===C.k},
jp:function(a){var z=this.fy
if(typeof z!=="number")return z.bE()
return z>=1},
eg:function(a,b){return this.fD(a,b)>0},
fD:function(a,b){var z,y
if(this.ek(b)){z=a.gbk()
y=this.go.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.i4(a,b,10))return 1
z=a.gbk()
y=this.go.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
ek:function(a){var z,y
z=a.cG("Confuse",this,!0)
if(z==null)return!1
y=a.kf("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cO:function(a){var z,y,x
z=a.al(this.y)
y=z.gaq()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gbt())x-=10
if(z.e!=null)x+=4
y=a.a
return new A.ck(x,new H.J(y,new R.iN(this),[H.m(y,0)]).b4(0,0,new R.iO()),y.b4(0,0,new R.iP(this,a)))},
aE:function(a){var z=this.e
return z!=null&&J.f(z.gbS(),a)},
i4:function(a,b,c){var z=b.kg(a,this,!0)
if(z==null)return!1
return z<=c},
$isbu:1},
kP:{"^":"d+de;"},
qr:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gB().z=this.a
a.gB().dx=this.b
a.gB().dy=this.d
a.gB().fx=this.e
a.gB().f=this.f
a.gB().b=!0
a.gB().c=[]
a.gB().fr=C.k
a.gB().y=this.r
a.gB().db=this.x
a.gB().x=this.Q
a.gB().go=this.y
a.gB().Q=this.z
a.gB().ch=!0
a.gB().cx=this.c
z=P.U(null,null,null,null)
a.gB().cy=z
z=this.cy
if(z!=null){y=new L.bh(null,null)
y.n(z)
z=y}else{z=$.$get$hP()
z.toString
y=new L.bh(null,null)
y.n(z)
z=y}a.gB().id=z
a.gB().e=this.ch
a.gB().r=this.cx
a.gB().d=this.db
return a}},
iN:{"^":"a:0;a",
$1:function(a){return J.f(a.gbk(),this.a.go)}},
iO:{"^":"a:26;",
$2:function(a,b){var z,y
z=J.a5(a,b.gbg()?2:0)
y=b.gaq()
if(typeof y!=="number")return H.x(y)
return J.a5(z,2*y)}},
iP:{"^":"a:40;a,b",
$2:function(a,b){var z,y
z=b.gbg()?1:0
y=b.gaq()
if(typeof y!=="number")return H.x(y)
return J.a5(a,(z+y)*this.a.fD(b,this.b))}},
dz:{"^":"d;a,b",
k:function(a){return this.b}},
o5:{"^":"C;a,b,fo:c<,br:d<,ab:e<,fv:f<,bm:r<,aq:x<,j:y<,z,ei:Q<,H:ch<,cx,fI:cy<,h:db<,d9:dx<,am:dy<,I:fr<,fx,aZ:fy<,bk:go<",
a4:function(a){var z=new R.ep(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.C))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.f(this.e,b.e)){z=this.f
y=b.f
if(z==null?y==null:z===y){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
if(z==null?y==null:z===y){z=this.cx
y=b.cx
if(z==null?y==null:z===y){z=this.cy
y=b.cy
if(z==null?y==null:z===y){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fy
y=b.fy
z=(z==null?y==null:z===y)&&J.f(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),C.t.gw(this.fx)),J.j(this.fy)),J.j(this.go)))},
k:function(a){return"Actor {alreadyMentioned="+J.i(this.a)+",\ncategories="+J.i(this.b)+",\ncombineFunction="+J.i(this.c)+",\ncurrentRoomName="+J.i(this.d)+",\ncurrentWeapon="+H.b(J.i(this.e))+",\nfollowingActorId="+J.i(this.f)+",\ngold="+J.i(this.r)+",\nhitpoints="+J.i(this.x)+",\nid="+J.i(this.y)+",\ninitiative="+J.i(this.z)+",\nisActive="+J.i(this.Q)+",\nisPlayer="+J.i(this.ch)+",\nitems="+J.i(this.cx)+",\nmaxHitpoints="+J.i(this.cy)+",\nname="+J.i(this.db)+",\nnameIsProperNoun="+J.i(this.dx)+",\npose="+J.i(this.dy)+",\npronoun="+J.i(this.fr)+",\nshield="+C.t.k(this.fx)+",\nstamina="+J.i(this.fy)+",\nteam="+J.i(this.go)+",\n}"}},
ep:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gfo:function(){return this.gB().d},
gbr:function(){return this.gB().e},
sbr:function(a){this.gB().e=a
return a},
gab:function(){return this.gB().f},
sab:function(a){this.gB().f=a
return a},
gfv:function(){return this.gB().r},
gbm:function(){return this.gB().x},
sbm:function(a){this.gB().x=a
return a},
gaq:function(){return this.gB().y},
saq:function(a){this.gB().y=a
return a},
gj:function(){return this.gB().z},
gH:function(){return this.gB().cx},
gfI:function(){return this.gB().db},
gh:function(){return this.gB().dx},
sh:function(a){this.gB().dx=a
return a},
gd9:function(){return this.gB().dy},
gam:function(){return this.gB().fr},
sam:function(a){this.gB().fr=a
return a},
gI:function(){return this.gB().fx},
gaZ:function(){return this.gB().go},
saZ:function(a){this.gB().go=a
return a},
gbk:function(){var z,y
z=this.gB()
y=z.id
if(y==null){y=new L.bh(null,null)
z.id=y
z=y}else z=y
return z},
gB:function(){var z,y
z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.cy=z.cx
this.db=z.cy
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
this.go=z.fy
z=z.go
if(!(z==null)){y=new L.bh(null,null)
y.n(z)
z=y}this.id=z
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gB().b
x=this.gB().c
w=this.gB().d
v=this.gB().e
u=this.gB().f
t=this.gB().r
s=this.gB().x
r=this.gB().y
q=this.gB().z
p=this.gB().Q
o=this.gB().ch
n=this.gB().cx
m=this.gB().cy
l=this.gB().db
k=this.gB().dx
j=this.gB().dy
i=this.gB().fr
h=this.gB().fx
g=this.gB().fy
f=this.gB().go
e=this.gB()
d=e.id
if(d==null){d=new L.bh(null,null)
e.id=d
e=d}else e=d
z=new R.o5(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.p())
if(y==null)H.h(P.l("alreadyMentioned"))
if(x==null)H.h(P.l("categories"))
if(s==null)H.h(P.l("gold"))
if(r==null)H.h(P.l("hitpoints"))
if(q==null)H.h(P.l("id"))
if(p==null)H.h(P.l("initiative"))
if(o==null)H.h(P.l("isActive"))
if(n==null)H.h(P.l("isPlayer"))
if(m==null)H.h(P.l("items"))
if(l==null)H.h(P.l("maxHitpoints"))
if(k==null)H.h(P.l("name"))
if(j==null)H.h(P.l("nameIsProperNoun"))
if(i==null)H.h(P.l("pose"))
if(h==null)H.h(P.l("pronoun"))
if(f==null)H.h(P.l("stamina"))}this.n(z)
return z}}}],["","",,A,{"^":"",ck:{"^":"d;bX:a<,cF:b<,bN:c<",
aI:function(a,b){return new A.ac(this.a-b.gbX(),J.aC(this.b,b.gcF()),J.aC(this.c,b.gbN()))},
k:function(a){return"ActorScore<self="+C.n.dl(this.a,2)+",team="+J.b7(this.b,2)+",enemy="+J.b7(this.c,2)+">"}},ac:{"^":"d;bX:a<,cF:b<,bN:c<",
gjE:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
bW:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ac(this.a*b,J.b6(this.b,b),J.b6(this.c,b))},
a1:function(a,b){return new A.ac(this.a+b.gbX(),J.a5(this.b,b.gcF()),J.a5(this.c,b.gbN()))},
cL:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ac(this.a/b,J.br(this.b,b),J.br(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.n.dl(this.a,2)+",team="+J.b7(this.b,2)+",enemy="+J.b7(this.c,2)+">"},
A:{
iM:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.as)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.x(r)
w+=r
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ac(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
tu:function(a){switch(a){case C.H:return"spear"
case C.I:return"branch"
case C.J:return"tent"
case C.c:return"sword"
default:throw H.c(P.G(a))}},
aP:{"^":"kQ;bS:a<",
gb2:function(){return U.tu(this.a)},
$isbu:1},
kQ:{"^":"d+de;"},
cz:{"^":"d;a,b",
k:function(a){return this.b}},
c5:{"^":"aP;b,c,ei:d<,bk:e<,h:f<,a",
gj:function(){return H.av(this)},
gbt:function(){return!1},
gH:function(){return!1},
gd9:function(){return!1},
gI:function(){return C.q}}}],["","",,G,{"^":"",kL:{"^":"d;",
f5:function(){var z,y
z=this.f
y=z.v
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.v=""}},
kB:[function(a){this.f.v+=a},"$1","gj8",2,0,21],
bi:function(){var z=0,y=P.au(),x,w=this,v,u
var $async$bi=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.F("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.v.length===0)){z=4
break}z=5
return P.ap(w.cI(),$async$bi)
case 5:z=3
break
case 4:w.f5()
case 1:return P.ax(x,y)}})
return P.ay($async$bi,y)}}}],["","",,B,{"^":"",ez:{"^":"d;cN:a<,d4:b<,cA:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.b7(this.b,3)+", score="+this.a.k(0)+">"}},bx:{"^":"d;bw:a<,fb:b<,eG:c<,jW:d<,d4:e<,f,r,el:x<,cA:y<",
gw:function(a){return X.bq([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
t:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isbx&&this.gw(this)===z.gw(b)},
k:function(a){var z,y
z=this.a
y=J.n(z)
z="PlanConsequence<"+y.gw(z)+", "+y.k(z)+", "+J.i(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
A:{
f3:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.b6(e,b.gd4())
z=z?0:b.gcA()+1
d.b=a.r
return new B.bx(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",ij:{"^":"d;a,b,c,d,e,f",
iV:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.a
z.a6("...")
z.a6("combining scores")
y=H.t([],[A.ac])
x=new G.iF()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gG()
z.a6(new G.iD(r))
if(J.a0(r.gd4(),0.15))if(s==null){z.a6("    - first _bestCase")
s=r}else if(J.a0(x.$1(r.gcN()),x.$1(s.gcN()))){z.a6("    - new _bestCase")
s=r}q=r.gcN()
p=J.aC(q.b,u)
o=J.aC(q.c,t)
n=r.b
if(typeof n!=="number")return H.x(n)
m=new A.ac((q.a-v)*n,J.b6(p,n),J.b6(o,n))
z.a6(new G.iE(m))
y.push(m)}l=A.iM(y)
w=s==null
if(w)k=C.B
else{q=s.gcN()
k=new A.ac(q.a-v,J.aC(q.b,u),J.aC(q.c,t))}w=w?s:s.gcA()
if(typeof w!=="number")return H.x(w)
j=new A.ac(k.a/w,J.br(k.b,w),J.br(k.c,w))
z.a6("- uplifts average = "+("ActorScoreChange<self="+C.n.dl(l.a,2)+",team="+J.b7(l.b,2)+",enemy="+J.b7(l.c,2)+">"))
z.a6("- best = "+j.k(0))
i=j.a1(0,l)
z.a6("- result = "+i.k(0))
return i},
ez:function(){var z=this
return P.aK(function(){var y=0,x=1,w,v,u,t,s
return function $async$ez(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc2(),u=u.gY(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aI()
case 1:return P.aJ(w)}}})},
da:function(a,b,c){var z=0,y=P.au(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$da=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=x.f
w.aW(0)
v=x.c
u=v.a
t=u.a.aH(0,new G.iG(x))
s=t.cO(u)
r=x.a
r.bC("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.b2(x.dQ(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.b3(new G.iH(t,o))
if(o.M(t,u)!==!0){r.b3(new G.iI(o))
z=2
break}z=4
return P.ap(x.ce(v,o,b,a,c).c8(0),$async$da)
case 4:n=e
if(J.em(n)===!0){r.b3(new G.iJ(o))
w.m(0,o,C.C)
z=2
break}r.b3(new G.iK(s,o,n))
m=x.iV(n,s,b)
w.m(0,o,m)
r.b3(new G.iL(o,m))
z=2
break
case 3:x.e=!0
return P.ax(null,y)}})
return P.ay($async$da,y)},
jV:function(){return this.da(50,10,null)},
dQ:function(a,b){return P.aK(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dQ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bI((u.length!==0?C.a.gC(u):null).gbp())
case 2:u=(u.length!==0?C.a.gC(u):null).gaK()
t=u.length
s={func:1,ret:Q.cy,args:[U.aP]}
r={func:1,ret:Q.cw,args:[Q.v]}
q={func:1,ret:Q.H,args:[R.C]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ar(o,q)?6:8
break
case 6:x=9
return P.bI(Q.hy(z,y,o))
case 9:x=7
break
case 8:x=H.ar(o,r)?10:12
break
case 10:x=13
return P.bI(Q.hz(z,y,o))
case 13:x=11
break
case 12:x=H.ar(o,s)?14:16
break
case 14:x=17
return P.bI(Q.hA(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.F(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.as)(u),++p
x=3
break
case 5:return P.aI()
case 1:return P.aJ(v)}}})},
ce:function(a5,a6,a7,a8,a9){var $async$ce=P.aq(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aH(0,new G.im(t))
p=t.a
p.b3("=====")
p.b3(new G.io(a6,q))
p.b3(new G.ip(a6))
if(a6.M(q,r)!==!0){p.b3("- firstAction not applicable")
z=1
break}o=q.cO(r)
p.b3(new G.iv(a5,o))
p.b3(new G.iw(a5))
n=P.b0(null,B.bx)
m=P.U(null,null,null,A.a7)
l=J.n(r)
k=l.gw(r)
for(j=new P.b2(a6.d0(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gG()
if(l.gw(r)!==k)throw H.c(new P.F("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.at(h)}s.a=0
r=t.b
case 3:if(!!n.gK(n)){z=4
break}++s.a
g=n.de()
p.a6("----")
p.a6(new G.ix(g))
p.a6(new G.iy(g))
if(g.gcA()>a7||s.a>a8){p.a6(new G.iz(s,a7,g))
p.a6(new G.iA(g))
z=4
break}z=g.gbw().f.length===0?5:6
break
case 5:p.a6("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bf(0,new G.iB(t),new G.iC())
if(q==null){p.a6("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.ez(q.cO(l),g.e,g.y)
p.a6(new G.iq(f))
z=7
x=[1]
return P.cW(P.h2(f),$async$ce,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gC(j):null).ds(l)
j=l.a
i=new H.J(j,new G.ir(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.F("World has several duplicates of mainActor: "+J.i(l)))
else if(d===0){p.fE("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aH(0,new G.is(t))
c=J.f(e,q)
p.a6("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.a6("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.cO(l)
if(b==null)b=C.D
f=new B.ez(b,g.e,g.y)
p.a6(new G.it(o,f))
p.a6(new G.iu(g))
z=8
x=[1]
return P.cW(P.h2(f),$async$ce,y)
case 8:p.a6("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b2(t.dQ(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.M(e,l)!==!0)continue
for(a1=new P.b2(a2.d0(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bP(a4.gd4(),0.05))continue
if(m.a_(0,a4.gbw()))continue
n.at(a4)}}p.a6("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.cW(null,0,y)
case 2:return P.cW(v,1,y)}})
var z=0,y=P.ow($async$ce),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.pR(y)}},iF:{"^":"a:38;",
$1:function(a){return J.aC(a.b,a.c)}},iD:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},iE:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},iG:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},iH:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.db)}},iI:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},iJ:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},iK:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aD(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},iL:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},im:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},io:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gh())}},ip:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iv:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},iw:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bW(" ",z.y)+"- "+J.i(z.b)}},ix:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfb().gX()+"'"}},iy:{"^":"a:1;a",
$0:function(){var z=this.a.gbw().f
return"- situation: "+H.b(J.i8(z.length!==0?C.a.gC(z):null))}},iz:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcA()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iA:{"^":"a:1;a",
$0:function(){var z=this.a.gbw().d
return"- how we got here: "+new H.ak(z,new G.il(),[H.m(z,0),null]).cz(0," <- ")}},il:{"^":"a:0;",
$1:function(a){return a.gb2()}},iB:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},iC:{"^":"a:1;",
$0:function(){return}},iq:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},ir:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},is:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},it:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iu:{"^":"a:1;a",
$0:function(){var z=this.a.gbw().d
return"- how we got here: "+new H.ak(z,new G.ik(),[H.m(z,0),null]).cz(0," <- ")}},ik:{"^":"a:0;",
$1:function(a){return a.gb2()}}}],["","",,Z,{"^":"",l8:{"^":"d;a,b",
gbp:function(){return this.b},
gK:function(a){return this.b.length===0},
fP:function(a,b){var z=this
return P.aK(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fP(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bI(t)
case 5:w=1
break
case 4:s=z.hZ(new Z.lb())
r=z.dP(new Z.lc(),[s])
q=z.dP(new Z.ld(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$by().bC("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$by().bC("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$by().bC("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cQ(t,new Z.le(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.n(m)
if(l.t(m,s)){w=17
break}if(l.t(m,r)){w=17
break}if(l.t(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.as)(t),++n
w=16
break
case 18:case 1:return P.aI()
case 2:return P.aJ(u)}}})},
jU:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbY(y)
C.a.cQ(y,new Z.lf(this,a))
x=this.a.a
w=x.gc9().b4(0,1/0,new Z.lg(a))
v=x.gc9().b4(0,-1/0,new Z.lh(a))
x=J.a9(v)
u=J.a9(w)
t=u.aI(w,J.b6(x.aI(v,w),0.1))
z.a=t
if(u.t(w,v)){t=J.aC(t,1)
z.a=t
u=t}else u=t
s=x.aI(v,u)
r=P.kJ(y.length,new Z.li(z,this,a,s),!1,P.L)
q=new H.ak(r,new Z.lj(C.a.b4(r,0,Z.hO())),[H.m(r,0),null]).bu(0,!1)
z=C.a.b4(q,0,Z.hO())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.a5(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.lC(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dP:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.as)(z),++u){t=z[u]
if(C.a.a_(b,t))continue
if(w==null||J.a0(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
hZ:function(a){return this.dP(a,C.f)},
A:{
l9:function(a){var z,y,x
z=a.gc2()
y=H.w(z,"y",0)
x=P.V(new H.J(z,new Z.la(a),[y]),!1,y)
if(x.length===0)$.$get$by().ey("After removing actions scored by undefined, there are no recommendations.")
return x},
tR:[function(a,b){return J.a5(a,b)},"$2","hO",4,0,43]}},lb:{"^":"a:0;",
$1:function(a){return a.gbX()}},lc:{"^":"a:0;",
$1:function(a){return J.i4(a.gbN())}},ld:{"^":"a:0;",
$1:function(a){return a.gcF()}},le:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.ci(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lf:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.ci(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lg:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d_(a),H.d_(z))}},lh:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d_(a),H.d_(z))}},li:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.br(J.aC(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},lj:{"^":"a:0;a",
$1:function(a){return J.ic(J.b6(J.br(a,this.a),1000))}},la:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjE()}}}],["","",,K,{"^":"",q_:{"^":"a:3;",
$3:function(a,b,c){}},c2:{"^":"d;a,h:b<,c,d,jO:e<,f,bx:r<",
gjc:function(){return this.a},
gw:function(a){return C.b.gw(this.b)},
t:function(a,b){if(b==null)return!1
return b instanceof K.c2&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jP:function(a){return this.e.$1(a)},
A:{
Z:function(a,b,c,d,e,f,g){var z=new S.af(null,null,[Q.v])
z.au()
z.n(f)
return new K.c2(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;j7:a<,X:b<,b2:c<,jz:d<"}}],["","",,S,{"^":"",a2:{"^":"d;",
gaK:function(){return C.f},
gbp:function(){return C.f},
gfH:function(){return 3},
ds:function(a){return this.aF(this.gJ(),a)},
fL:function(a,b){},
fM:function(a,b){},
aY:function(a){},
dz:function(a){return!0}}}],["","",,S,{"^":"",
fa:function(a){var z=$.$get$bA().a7(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
lB:function(a,b){var z,y,x,w,v
z=$.$get$bA().jR()*b
for(y=new H.dn(a,a.gl(a),0,null,[H.w(a,"aS",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
lC:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bA().a7(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.as)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
cI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bs(a,"{")
if(z!==-1&&z<a.length-1){y=H.t([],[P.u])
y.push(z)
w=z+1
v=a.length
u=null
t=1
while(!0){if(!(w<v)){x=null
break}if(w<0)return H.e(a,w)
s=a[w]
if(s==="{")++t
else if(s==="|"&&t===1)y.push(w)
else if(s==="}"){--t
if(t===0){y.push(w)
x=w
u=x
break}}r=w+1
u=w
w=r}q=y.length-1
if(q>1){p=$.$get$bA().a7(q)
o=C.b.ax(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cI(C.b.ax(a,m+1,y[l]))
if(typeof x!=="number")return x.a1()
l+=C.b.ax(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cI(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a1()
v=u+1
return C.b.ax(a,0,v)+S.cI(C.b.bz(a,v))}}else return a},
b1:function(a,b,c,d){switch($.$get$bA().a7(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",a6:{"^":"d;aP:a<,aJ:b<,aC:c<,fO:d<,e,d2:f@,fR:r<,fJ:x<,eH:y<,jb:z<,hq:Q<,cK:ch<,iC:cx<,jD:cy<,J:db<",
i:function(a,b){switch(b){case"string":return this.a
case"subject":return this.b
case"object":return this.c
case"owner":return this.d
case"but":return this.f
case"positive":return this.r
case"negative":return this.x
case"endSentence":return this.z
case"startSentence":return this.Q
case"wholeSentence":return this.ch
case"time":return this.db
default:throw H.c(P.G("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.ax(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a_:{"^":"d;a,J:b<,c",
gef:function(){return C.a.bK(this.a,new Y.mS())},
b1:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.bp(b).ed(b,".")||C.b.ed(b,"!")||C.b.ed(b,"?"))&&C.b.dC(b,P.be("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a6(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.b1(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
F:function(a,b,c){return this.b1(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
fe:function(a,b,c){return this.b1(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
iF:function(a,b,c,d,e,f,g,h,i,j,k,l){return this.b1(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,!1)},
iJ:function(a,b,c,d,e){return this.b1(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
iI:function(a,b,c,d){return this.b1(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ff:function(a,b,c,d){return this.b1(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fg:function(a,b,c,d,e,f){return this.b1(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
iL:function(a,b,c,d,e,f){return this.b1(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
iH:function(a,b,c,d){return this.b1(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
iK:function(a,b,c,d,e){return this.b1(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iP:function(){return this.F(0,"\n\n",!0)},
c0:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bs(a,"<owner's> "+b)!==-1||C.b.bs(a,"<ownerPronoun's> "+b)!==-1||C.b.bs(a,"<object-owner's> "+b)!==-1||C.b.bs(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(c.gd9()!==!0){z=this.c
y=z.i(0,c.gj())
if((y==null?-1:y)<e)x=C.b.df(a,b,"the "+b)
else{x=J.d6(c.gh(),P.be("[aeiouy]",!1,!1))?C.b.df(a,b,"an "+b):C.b.df(a,b,"a "+b)
z.m(0,c.gj(),e)}}else x=null
return x==null?a:x},
ee:function(a,b){var z,y
if(!this.aD(a)||!this.aD(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaJ()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaJ()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaJ().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.f(y,z[b].gaC().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaC().gj()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gaJ().gj())}else z=!1
return z},
dr:function(a){var z=this
return P.aK(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dr(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aD(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaJ()!=null?3:4
break
case 3:x=5
return t.gaJ()
case 5:case 4:x=t.gaC()!=null?6:7
break
case 6:x=8
return t.gaC()
case 8:case 7:x=t.gfO()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aI()
case 2:return P.aJ(v)}}})},
aL:[function(a){var z=J.a9(a)
if(z.aG(a,0)||z.bE(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaC()}},"$1","gaC",2,0,23],
jS:function(a,b){var z
if(!this.aD(a)||!this.aD(b))return!1
if(this.ee(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geH()}return!1},
fN:function(a){var z
for(z=!1;this.gef();z=!0){a.$1(this.fS(!0))
this.k_()}return z},
fS:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.b4(z,[],new Y.mT())
C.a.il(z,new Y.mU(y),!1)
x=a&&this.gef()?C.a.bs(z,C.a.fu(z,new Y.mV()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ee(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gd2())n=this.jS(s,p)&&this.hp(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gd2()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sd2(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghq()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjb()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcK())if(this.cZ(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gd2()}else n=!1
n=n||this.kh(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcK()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcK()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fa([" but "," but ",", but "])
u=!this.hc(s,s+1)&&!0}else{r+=S.fa([" and "," and ",", and "])
u=!0}}m=this.dE(s)
p=!v
if(p){n=s-1
if(this.cZ(s,n))if(J.d6(this.dE(n),"<subject> "))if(J.d6(m,"<subject> "))m=H.bO(m,"<subject> ","",0)}l=J.ib(m,"<action>",this.dE(s))
n=s-1
k=this.ip(s,n)
if(k)k=!(this.aL(s).gI()===C.q&&this.ah(s).gI()===C.q)
else k=!1
if(k){k=this.aL(s).gI().b
l=H.p(l,"<object-owner's> <object>",k)
k=this.aL(s).gI().b
l=H.p(l,"<object-ownerPronoun's> <object>",k)
k=this.aL(s).gI().b
l=H.p(l,"<object>",k)
k=this.aL(s).gI().c
l=H.p(l,"<object's>",k)}k=this.cZ(s,n)
if(k){k=this.ah(s).gI().a
l=H.p(l,"<owner's> <subject>",k)
k=this.ah(s).gI().a
l=H.p(l,"<ownerPronoun's> <subject>",k)
k=this.ah(s).gI().a
l=H.p(l,"<subject>",k)
k=this.ah(s).gI().c
l=H.p(l,"<subject's>",k)}if(this.aL(n)!=null)if(this.ah(s)!=null)if(this.ah(n)!=null){k=this.aL(n)
k=k==null?k:k.gj()
j=this.ah(s)
if(J.f(k,j==null?j:j.gj())){k=this.ah(n)
k=k==null?k:k.gI()
j=this.ah(s)
k=!J.f(k,j==null?j:j.gI())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.ah(s).gI().a
l=H.p(l,"<owner's> <subject>",k)
k=this.ah(s).gI().a
l=H.p(l,"<ownerPronoun's> <subject>",k)
k=this.ah(s).gI().a
l=H.p(l,"<subject>",k)
k=this.ah(s).gI().c
l=H.p(l,"<subject's>",k)}if(this.ah(n)!=null)if(this.aL(s)!=null){k=this.ah(n)
k=k==null?k:k.gj()
j=this.aL(s)
if(J.f(k,j==null?j:j.gj())){n=this.ah(n)
n=n==null?n:n.gI()
k=this.ah(s)
n=!J.f(n,k==null?k:k.gI())}else n=!1}else n=!1
else n=!1
if(n){n=this.aL(s).gI().a
l=H.p(l,"<object-owner's> <object>",n)
n=this.aL(s).gI().a
l=H.p(l,"<object-ownerPronoun's> <object>",n)
n=this.aL(s).gI().b
l=H.p(l,"<object>",n)
n=this.aL(s).gI().c
l=H.p(l,"<object's>",n)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaJ()
h=n.gaC()
g=n.gfO()
f=n.e
e=S.cI(l)
if(C.b.a_(e,"{")||C.b.a_(e,"}"))$.$get$hI().dw('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gH()===!0){e=H.p(e,"<subject>","you")
e=H.p(e,"<subject's>","your")}if(i.gI()===C.z||i.gI()===C.X){e=H.p(e,"<s>","")
e=H.p(e,"<es>","")
e=H.p(e,"<ies>","y")
e=H.p(e,"<does>","do")
e=H.p(e,"<is>","are")
e=H.p(e,"<has>","have")}else{e=H.p(e,"<s>","s")
e=H.p(e,"<es>","es")
e=H.p(e,"<ies>","ies")
e=H.p(e,"<does>","does")
e=H.p(e,"<is>","is")
e=H.p(e,"<has>","has")}e=H.bO(e,"<subject>","<subjectNoun>",0)
k=i.gI().a
e=H.p(e,"<subject>",k)
k=n.db
e=this.c0(e,"<subjectNoun>",i,g,k)
j=i.gh()
if(typeof j!=="string")H.h(H.P(j))
e=H.bO(e,"<subjectNoun>",j,0)
j=i.gI().a
e=H.p(e,"<subjectPronoun>",j)
if(C.b.a_(l,P.be("<subject>.+<subject's>",!0,!1))){j=i.gI().c
e=H.p(e,"<subject's>",j)}e=this.c0(e,"<subject's>",i,g,k)
k=H.b(i.gh())+"'s"
e=H.bO(e,"<subject's>",k,0)
k=i.gI().c
e=H.p(e,"<subject's>",k)
k=i.gI().c
e=H.p(e,"<subjectPronoun's>",k)
k=i.gI().d
e=H.p(e,"<subjectPronounSelf>",k)}if(h!=null){if(h.gH()===!0){e=H.p(e,"<object>","you")
e=H.p(e,"<object's>","your")}else{e=this.c0(e,"<object>",h,f,n.db)
k=h.gh()
if(typeof k!=="string")H.h(H.P(k))
e=H.p(e,"<object>",k)}k=h.gI().b
e=H.p(e,"<objectPronoun>",k)
if(C.b.a_(l,P.be("<object>.+<object's>",!0,!1))){k=h.gI().c
e=H.p(e,"<object's>",k)}e=this.c0(e,"<object's>",h,f,n.db)
k=H.b(h.gh())+"'s"
e=H.bO(e,"<object's>",k,0)
k=h.gI().c
e=H.p(e,"<object's>",k)
k=h.gI().c
e=H.p(e,"<objectPronoun's>",k)}n=n.db
l=this.f6(f,this.f6(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.mR(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcK())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcK()?r+".":r
return H.to(z.charCodeAt(0)==0?z:z,$.$get$fu(),new Y.mW(),null)},
c6:function(){return this.fS(!1)},
k_:function(){var z,y
if(!this.gef()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.bs(z,C.a.fu(z,new Y.mX()))+1
P.cJ(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hc:function(a,b){var z,y
if(!this.aD(a)||!this.aD(b))return!1
if(this.ee(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geH()}if(!this.cZ(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfR()){if(b>=z.length)return H.e(z,b)
y=z[b].gfR()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfJ()){if(b>=z.length)return H.e(z,b)
z=z[b].gfJ()}else z=!1
if(z)return!0
else return!1},
hp:function(a,b){var z,y,x,w,v
if(!this.aD(a)||!this.aD(b))return!1
for(z=new P.b2(this.dr(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b2(this.dr(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gG()
if(J.f(x.gj(),v.gj()))return!0}}return!1},
dE:[function(a){var z=J.a9(a)
if(z.aG(a,0)||z.bE(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaP()}},"$1","gaP",2,0,12],
ah:[function(a){var z=J.a9(a)
if(z.aG(a,0)||z.bE(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaJ()}},"$1","gaJ",2,0,23],
kh:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gJ()!=null){y=a-1
if(this.aD(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gJ()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gJ()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gJ()
if(typeof y!=="number")return y.aI()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.c6()},
aD:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
f6:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gH()===!0)z=H.p(H.p(b,d,"you"),e,"your")
else{z=this.c0(b,d,a,null,h)
y=a.gh()
H.bo(y)
z=H.p(z,d,y)}z=H.p(z,f,a.gI().a)
z=H.p(H.p(C.b.df(this.c0(C.b.a_(c,P.be(d+".+"+e,!0,!1))?H.p(z,e,a.gI().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gI().c),g,a.gI().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
ip:function(a,b){var z,y
if(!this.aD(a)||!this.aD(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaC().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaC().gj())},
cZ:function(a,b){var z,y
if(!this.aD(a)||!this.aD(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaJ()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaJ()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaJ().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaJ().gj())},
A:{
mR:function(a){var z,y,x
z=!C.b.a_(a,"\n\n")?C.b.kl(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bz(z,1)}}},mS:{"^":"a:0;",
$1:function(a){return J.f(a.gaP(),"\n\n")}},mT:{"^":"a:31;",
$2:function(a,b){var z,y,x
z=J.K(a)
y=z.gaf(a)?z.gC(a):null
if(y!=null&&y.gjD()&&J.f(b.giC(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aI()
z.m(a,x-1,b)}else z.q(a,b)
return a}},mU:{"^":"a:28;a",
$1:function(a){return J.i5(this.a,a)}},mV:{"^":"a:0;",
$1:function(a){return J.f(a.gaP(),"\n\n")}},mW:{"^":"a:25;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},mX:{"^":"a:0;",
$1:function(a){return J.f(a.gaP(),"\n\n")}},bu:{"^":"kR;d9:a<,h:b<,c,bk:d<,H:e<,I:f<",
gj:function(){return H.av(this)},
gei:function(){return!0},
gbt:function(){return!0},
A:{
dd:function(a,b,c,d,e){var z=H.t([],[P.q])
return new Y.bu(c,b,z,e==null?$.$get$aW():e,!1,d)}}},kR:{"^":"d+de;"},de:{"^":"d;",
gbg:function(){return this.gbt()&&this.gei()===!0},
ad:function(a,b,c,d,e,f,g,h,i,j,k){a.iF(0,b,c,d,e,f,g,h,i,j,H.a4(this,"$isbu"),!1)},
aj:function(a,b){return this.ad(a,b,null,!1,!1,!1,!1,null,null,!1,!1)},
k9:function(a,b,c,d){return this.ad(a,b,null,!1,c,!1,!1,null,null,d,!1)},
ba:function(a,b,c,d){return this.ad(a,b,null,!1,!1,!1,!1,c,null,d,!1)},
bQ:function(a,b,c){return this.ad(a,b,null,!1,!1,!1,!1,c,null,!1,!1)},
c7:function(a,b,c){return this.ad(a,b,null,!1,!1,!1,!1,null,null,c,!1)},
b9:function(a,b,c){return this.ad(a,b,null,c,!1,!1,!1,null,null,!1,!1)},
cC:function(a,b,c,d){return this.ad(a,b,null,c,!1,!1,!1,d,null,!1,!1)},
es:function(a,b,c,d,e){return this.ad(a,b,c,!1,!1,!1,!1,d,null,e,!1)},
aM:function(a,b,c){return this.ad(a,b,null,!1,!1,!1,c,null,null,!1,!1)},
bD:function(a,b,c,d){return this.ad(a,b,null,!1,c,!1,d,null,null,!1,!1)},
dh:function(a,b,c,d){return this.ad(a,b,null,c,!1,!1,d,null,null,!1,!1)},
bD:function(a,b,c,d){return this.ad(a,b,null,!1,c,!1,d,null,null,!1,!1)},
fT:function(a,b,c,d){return this.ad(a,b,null,!1,!1,!1,c,d,null,!1,!1)},
fV:function(a,b,c,d,e){return this.ad(a,b,c,!1,!1,d,!1,e,null,!1,!1)},
k8:function(a,b,c,d){return this.ad(a,b,null,c,!1,!1,!1,null,null,d,!1)},
k7:function(a,b,c,d){return this.ad(a,b,c,!1,!1,d,!1,null,null,!1,!1)},
kb:function(a,b,c,d,e,f){return this.ad(a,b,c,d,!1,e,!1,f,null,!1,!1)},
ka:function(a,b,c,d,e){return this.ad(a,b,c,d,!1,e,!1,null,null,!1,!1)},
fU:function(a,b,c,d){return this.ad(a,b,null,!1,!1,!1,!1,c,d,!1,!1)},
dh:function(a,b,c,d){return this.ad(a,b,null,c,!1,!1,d,null,null,!1,!1)}},c_:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",qt:{"^":"a:0;",
$1:function(a){a.gco().b=2
return 2}},qu:{"^":"a:0;",
$1:function(a){a.gco().b=0
return 0}},qs:{"^":"a:0;",
$1:function(a){a.gco().b=1
return 1}},fC:{"^":"d;"},ol:{"^":"fC;j:a<",
a4:function(a){var z=new L.bh(null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fC))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gw:function(a){return Y.R(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.i(this.a)+",\n}"},
A:{
dR:function(a){var z=new L.bh(null,null)
a.$1(z)
return z.p()}}},bh:{"^":"d;a,b",
gj:function(){return this.gco().b},
gco:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gco().b
z=new L.ol(y)
if(y==null)H.h(P.l("id"))}this.n(z)
return z}}}],["","",,X,{"^":"",
hn:function(a,b){return P.aK(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hn(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bQ(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bQ(u,u.length,0,null,[H.m(u,0)])
case 2:r=t.u()
q=s.u()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aI()
case 1:return P.aJ(v)}}})}}],["","",,A,{"^":"",a7:{"^":"d;iD:a<,b,c,d,e,f,J:r<,x",
giZ:function(){var z=this.f
return z.length!==0?C.a.gC(z):null},
gw:function(a){var z,y,x,w,v
z=X.bq(this.a)
y=X.bq(this.d)
x=X.bq(this.f)
w=this.r
v=this.c
v=X.cY(X.aU(X.aU(0,C.e.gw(w)),J.j(v)))
return X.cY(X.aU(X.aU(X.aU(X.aU(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
t:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isa7&&this.gw(this)===z.gw(b)},
fc:function(a){var z,y
z=this.hb(a,!0)
y=z.gY(z)
if(y.u()){y.gG()
return!0}return!1},
iA:function(a){var z,y
z=this.ha(a)
y=z.gY(z)
if(y.u()){y.gG()
return!0}return!1},
iB:function(a){var z=this.x
if(z==null)return!1
return C.b.a_(z.gh(),a)},
fp:function(a){var z,y,x
z=this.cV(a)
if(z==null)throw H.c(new P.F("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ap()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ap:function(){++this.r},
dq:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.eJ(0,new A.nV(a))
if(b!=null)z=z.bU(0,new A.nW(b))
if(c!=null)z=z.bU(0,new A.nX(c))
if(e!=null)z=z.bU(0,new A.nY(e))
return d!=null?z.bU(0,new A.nZ(d)):z},
hb:function(a,b){return this.dq(a,null,null,null,b)},
ha:function(a){return this.dq(a,null,null,null,null)},
al:function(a){return this.a.aH(0,new A.o_(a))},
du:function(a){return this.e.aH(0,new A.o0(a))},
eA:function(a){var z,y
z=this.cV(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
a9:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
jo:function(a){var z=this.a.bf(0,new A.o1(a),new A.o2())
if(z==null)return!1
return z.gbt()},
er:function(){var z=this.f
C.a.gC(z).aY(this)
C.a.b8(z)},
bP:function(a){var z=this.f
while(!0){if(!(z.length!==0&&!J.f(C.a.gC(z).gh(),a)))break
C.a.gC(z).aY(this)
C.a.b8(z)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
dg:function(a,b){var z,y
z=this.cV(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
di:function(a,b,c,d,e){var z,y,x,w
z=this.dq(a,b,c,d,e)
y=z.gY(z)
if(y.u()){x=y.gG()
y=this.r
w=x.gJ()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kg:function(a,b,c){return this.di(null,a,b,c,null)},
cG:function(a,b,c){return this.di(a,null,b,null,c)},
kf:function(a,b,c){return this.di(a,b,null,null,c)},
ke:function(a){return this.di(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.dW()
y.an(0,z)
return"World<"+P.bV(y,"{","}")+">"},
a5:function(a,b){var z,y,x
z=this.al(a)
y=z.a4(b)
x=this.a
x.ar(0,z)
x.q(0,y)},
cV:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gj(),a)){z=x
break}++x}return z},
hC:function(a){this.a.an(0,a.a)
this.d.an(0,a.d)
this.b.an(0,a.b)
this.e.an(0,a.e)
C.a.an(this.f,a.f)
this.r=a.r},
A:{
dP:function(a){var z,y,x,w
z=P.U(null,null,null,R.C)
y=P.b0(null,O.cj)
x=P.U(null,null,null,U.aP)
w=P.U(null,null,null,null)
w=new A.a7(z,x,a.c,y,w,[],null,null)
w.hC(a)
return w}}},nV:{"^":"a:0;a",
$1:function(a){return a.gfd()===this.a}},nW:{"^":"a:0;a",
$1:function(a){return J.f(a.gdd(),this.a.gj())}},nX:{"^":"a:0;a",
$1:function(a){return a.geI().a_(0,this.a.y)}},nY:{"^":"a:0;a",
$1:function(a){return a.gh6()===this.a}},nZ:{"^":"a:0;a",
$1:function(a){return a.gh4()===this.a}},o_:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},o0:{"^":"a:0;a",
$1:function(a){return J.f(a.gh(),this.a)}},o1:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},o2:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aF:{"^":"ab;a3:b<"},bC:{"^":"aF;c,X:d<,S:e<,h:f<,b,a",
V:[function(a,b,c){throw H.c(new P.F("SimpleAction always succeeds"))},"$3","gP",6,0,2],
W:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gR",6,0,2],
ag:function(a,b){throw H.c(new P.F("SimpleAction shouldn't have to provide roll reason"))},
N:function(a,b){return 1},
gT:function(){return!1},
M:function(a,b){return!0},
gO:function(){return H.h(new P.F("Not rerollable"))},
gU:function(){return!1}}}],["","",,N,{"^":"",j2:{"^":"H;T:c<,a3:d<,S:e<,U:f<,O:r<,b,a",
gae:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gak:function(){return"will <subject> confuse <object>?"},
V:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bQ(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.dh(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ba(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aM(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 0.6},
M:function(a,b){var z
if(a.gH()===!0)if(a.ga8()){z=b.a
z=new H.J(z,new N.j3(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.ek(b)}else z=!1
else z=!1
return z},
A:{
tA:[function(a){return new N.j2(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.d,a,null)},"$1","qT",2,0,5]}},j3:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbt()){z=a.gbk()
y=this.a.b.gbk()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,F,{"^":"",l7:{"^":"ab;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Stand off."},
gh:function(){return"Pass"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.aj(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gR",6,0,2],
ag:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return!0}}}],["","",,Y,{"^":"",ll:{"^":"H;U:c<,O:d<,T:e<,a3:f<,S:r<,b,a",
gae:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gak:function(){return"will <subject> force <object> off balance?"},
V:[function(a,b,c){var z=this.b
a.fU(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gab(),z)
z.c7(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.fU(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gab(),z)
if(z.ga8()){z.fT(c,"<subject> lose<s> <object>",!0,$.$get$e6())
b.a5(z.y,new Y.lm())
C.a.q(b.f,U.kS(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gb5()){z.aj(c,"<subject> <is> already off balance")
c.ff(0,"<subject> make<s> <object> fall to the "+H.b(b.a9("FightSituation").gbx()),z,$.$get$hQ())
b.a5(z.y,new Y.ln())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.F("enemy pose must be either standing or off-balance"))},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(!a.gac()){z=a.e
if(z!=null&&J.f(z.gbS(),C.c)){z=this.b
z=z.aE(C.c)&&!z.gac()}else z=!1}else z=!1
return z},
A:{
tS:[function(a){return new Y.ll(!0,C.d,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","rp",2,0,5]}},lm:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},ln:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,B,{"^":"",lJ:{"^":"ab;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ba(c,"<subject> regain<s> <object>",$.$get$e6(),!0)
b.a5(a.gj(),new B.lK())
return H.b(a.gh())+" regains balance"},"$3","gR",6,0,2],
ag:function(a,b){return"Will "+a.gI().a+" regain balance?"},
N:function(a,b){return 1},
M:function(a,b){return a.gb5()}},lK:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return C.k}}}],["","",,O,{"^":"",lY:{"^":"ab;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Scramble."},
gh:function(){return"Scramble"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gR",6,0,2],
ag:function(a,b){return"Will "+a.gI().a+" crawl out of harm's way?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gac())return!1
if(Q.hR(a,b))return!0
return!1}}}],["","",,Q,{"^":"",
hR:function(a,b){var z,y,x
z=b.cG("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
y=b.cG("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cG("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
return!1},
mI:{"^":"ab;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Stand up."},
gh:function(){return"StandUp"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.aj(c,"<subject> stand<s> up")
b.a5(a.gj(),new Q.mJ())
return H.b(a.gh())+" stands up"},"$3","gR",6,0,2],
ag:function(a,b){return"Will "+a.gI().a+" stand up?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gac())return!1
if(Q.hR(a,b))return!1
return!0}},
mJ:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return C.k}}}],["","",,T,{"^":"",
ud:[function(a){return new A.aG(T.ef(),null,null,new T.rx(),new T.ry(),new T.rz(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","td",2,0,5],
ue:[function(a){return new A.aG(T.ef(),new T.rA(),T.ef(),new T.rB(),new T.rC(),new T.rD(),new T.rE(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.d,"break <object's> neck","will <subject> succeed?",a,null)},"$1","te",2,0,5],
uf:[function(a,b,c,d,e){a.bQ(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a5(a.gj(),new T.rF())},"$5","ef",10,0,10],
rx:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gac()&&a.gd7()}},
ry:{"^":"a:3;",
$3:function(a,b,c){return Y.eu(a,c)}},
rz:{"^":"a:3;",
$3:function(a,b,c){return S.dw(a,c,C.p)}},
rB:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gac()&&a.gd7()}},
rC:{"^":"a:3;",
$3:function(a,b,c){return Y.eu(a,c)}},
rD:{"^":"a:3;",
$3:function(a,b,c){return S.dw(a,c,C.o)}},
rA:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
rE:{"^":"a:3;",
$3:function(a,b,c){return S.dw(a,c,C.j)}},
rF:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,A,{"^":"",aG:{"^":"H;c,d,e,f,r,x,y,z,S:Q<,T:ch<,a3:cx<,h:cy<,U:db<,O:dx<,ae:dy<,ak:fr<,b,a",
V:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
M:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,U,{"^":"",
ug:[function(a){return new A.aG(U.eg(),null,null,new U.rG(),new U.rH(),new U.rI(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","tf",2,0,5],
uh:[function(a){return new A.aG(U.eg(),new U.rJ(),U.eg(),new U.rK(),new U.rL(),new U.rM(),new U.rN(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.d,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tg",2,0,5],
ui:[function(a,b,c,d,e){c.iL(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","eg",10,0,10],
rG:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.ga8()||a.dy===C.i)&&!c.gac()&&a.gd7()
else z=!1
return z}},
rH:{"^":"a:3;",
$3:function(a,b,c){return M.f9(a,c)}},
rI:{"^":"a:3;",
$3:function(a,b,c){return Z.dD(a,c,C.p)}},
rK:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.ga8()||a.dy===C.i)&&!c.gac()&&a.gd7()
else z=!1
return z}},
rL:{"^":"a:3;",
$3:function(a,b,c){return M.f9(a,c)}},
rM:{"^":"a:3;",
$3:function(a,b,c){return Z.dD(a,c,C.o)}},
rJ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
rN:{"^":"a:3;",
$3:function(a,b,c){return Z.dD(a,c,C.j)}}}],["","",,G,{"^":"",
uj:[function(a){return new A.aG(G.eh(),null,null,new G.rQ(),new G.rR(),new G.rS(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","th",2,0,5],
uo:[function(a){return new A.aG(G.eh(),new G.t0(),G.eh(),new G.t1(),new G.t2(),new G.t3(),new G.t4(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.d,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","ti",2,0,5],
up:[function(a,b,c,d,e){return a.fV(c,"<subject> swing<s> {<subject's> "+H.b(a.gab().gh())+" |}at <object>",e.gj(),!0,d)},"$5","eh",10,0,10],
rQ:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.ga8()&&!c.gac()&&a.aE(C.c)}},
rR:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
rS:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.p)}},
t1:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.ga8()&&!c.gac()&&a.aE(C.c)}},
t2:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
t3:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
t0:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
t4:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.j)}}}],["","",,R,{"^":"",
uk:[function(a,b,c,d,e){return a.fT(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.gab().gh()),!0,d)},"$5","hU",10,0,16],
ul:[function(a){return new A.aG(R.hV(),new R.rT(),R.hU(),new R.rU(),new R.rV(),new R.rW(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","tj",2,0,5],
um:[function(a){return new A.aG(R.hV(),new R.rX(),R.hU(),new R.rY(),new R.rZ(),new R.t_(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","tk",2,0,5],
un:[function(a,b,c,d,e){return a.fV(c,"<subject> swing<s> {<subject's> "+H.b(a.gab().gh())+" |}at <object>",e.gj(),!0,d)},"$5","hV",10,0,10],
rU:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gb5()&&!c.gac()&&a.aE(C.c)}},
rV:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
rW:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.p)}},
rT:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
rY:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gb5()&&!c.gac()&&a.aE(C.c)}},
rZ:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
t_:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
rX:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
uq:[function(a){return new A.aG(D.ei(),null,null,new D.t5(),new D.t6(),new D.t7(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","tl",2,0,5],
ur:[function(a){return new A.aG(D.ei(),new D.t8(),D.ei(),new D.t9(),new D.ta(),new D.tb(),new D.tc(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.d,"strike down at <object>","will <subject> hit?",a,null)},"$1","tm",2,0,5],
us:[function(a,b,c,d,e){return a.bQ(c,"<subject> strike<s> down {with <subject's> "+H.b(a.gab().gh())+" |}at <object>",d)},"$5","ei",10,0,16],
t5:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gac()&&!a.gac()&&a.aE(C.c)}},
t6:{"^":"a:3;",
$3:function(a,b,c){return D.fw(a,c)}},
t7:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.p)}},
t9:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gac()&&!a.gac()&&a.aE(C.c)}},
ta:{"^":"a:3;",
$3:function(a,b,c){return D.fw(a,c)}},
tb:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.o)}},
t8:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tc:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.j)}}}],["","",,B,{"^":"",nj:{"^":"H;U:c<,O:d<,T:e<,a3:f<,S:r<,b,a",
gh:function(){return"SweepOffFeet"},
gae:function(){return"sweep <object> off <objectPronoun's> feet"},
gak:function(){return"will <subject> knock <object> down?"},
V:[function(a,b,c){S.b1(new B.nk(this,a,c),new B.nl(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gP",6,0,2],
W:[function(a,b,c){var z
S.b1(new B.nm(this,a,c),new B.nn(this,a,c,b.a9("FightSituation").gbx()),null,null)
z=this.b
b.a5(z.gj(),new B.no())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
M:function(a,b){return(a.ga8()||a.dy===C.i)&&!this.b.gac()},
A:{
tW:[function(a){return new B.nj(!0,C.d,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","tq",2,0,5]}},nk:{"^":"a:1;a,b,c",
$0:function(){var z=this.c
this.b.bQ(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.iH(0,"they don't connect",!0,!0)}},nl:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bQ(z,"<subject> kick<s> <object's> shin",y)
y.b9(z,"<subject> <does>n't budge",!0)}},nm:{"^":"a:1;a,b,c",
$0:function(){this.b.ba(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},nn:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ba(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.aj(z,"<subject> {grunt|shriek}<s>")
y.aM(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},no:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,Y,{"^":"",np:{"^":"cy;a3:c<,b,a",
gS:function(){return"A different weapon might change the battle."},
gT:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gU:function(){return!1},
gO:function(){return},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gC(z):null
b.dg(y.gj(),y.a4(new Y.nq(this)))
b.a5(a.gj(),new Y.nr(this))
z=this.b
a.bQ(c,"<subject> pick<s> up <object>",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gR",6,0,2],
ag:function(a,b){return H.h(new P.ai(null))},
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tX:[function(a){return new Y.np(!0,a,null)},"$1","tr",2,0,47]}},nq:{"^":"a:27;a",
$1:function(a){a.gd5().ar(0,this.a.b)
return a}},nr:{"^":"a:0;a",
$1:function(a){a.sab(this.a.b)
return a}}}],["","",,M,{"^":"",nT:{"^":"ab;S:b<,U:c<,O:d<,T:e<,a3:f<,a",
gX:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.aj(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.k9(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gR",6,0,2],
ag:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z
if(a.ek(b)){z=b.cG("Confuse",a,!0)
if(typeof z!=="number")return z.by()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",k6:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gae:function(){return""},
gak:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new R.k7())
a.ba(c,"<subject> break<s> <object's> neck",z,!0)
X.ed(c,b,z,b.a9("FightSituation").gbx())
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tH:[function(a){return new R.k6(null,!0,!0,!0,C.d,a,null)},"$1","r3",2,0,5]}},k7:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}}}],["","",,Y,{"^":"",
eu:function(a,b){var z=new Y.d9(null,null,null,null,null)
new Y.qK(a,b).$1(z)
return z.p()},
et:{"^":"a2;",
gaK:function(){return[R.r3()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ap:function(){var z=new Y.d9(null,null,null,null,null)
z.n(this)
new Y.iR().$1(z)
return z.p()},
aF:function(a,b){if(a===0)return b.al(this.a)
return},
aN:function(a,b){return new H.J(a,new Y.iS(this),[H.m(a,0)])}},
qK:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaQ().c=z
a.gaQ().e=0
z=this.a.gj()
a.gaQ().b=z
z=this.b.gj()
a.gaQ().d=z
return a}},
iR:{"^":"a:0;",
$1:function(a){var z=a.gaQ().e
if(typeof z!=="number")return z.a1()
a.gaQ().e=z+1
return a}},
iS:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
o6:{"^":"et;a,j:b<,c,J:d<",
a4:function(a){var z=new Y.d9(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.et))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
d9:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaQ().c},
gJ:function(){return this.gaQ().e},
gaQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
z=new Y.o6(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,Z,{"^":"",jQ:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gae:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gak:function(){return"will <subject> evade?"},
V:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to evade")
S.b1(new Z.jR(a,c),new Z.jS(this,a,c),null,null)
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ba(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.bP("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return!0},
A:{
tG:[function(a){return new Z.jQ("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.d,a,null)},"$1","r0",2,0,5]}},jR:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b,"<subject> {can't|fail<s>}",!0)}},jS:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cC(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dw:function(a,b,c){var z=new S.dv(null,null,null,null,null,null)
new S.qJ(a,b,c).$1(z)
return z.p()},
f2:{"^":"cu;",
gaK:function(){return[Z.r0()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ap:function(){var z=new S.dv(null,null,null,null,null,null)
z.n(this)
new S.l1().$1(z)
return z.p()}},
qJ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.gj()
a.gaB().b=z
z=this.b.gj()
a.gaB().e=z
a.gaB().d=this.c
return a}},
l1:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
if(typeof z!=="number")return z.a1()
a.gaB().f=z+1
return a}},
oc:{"^":"f2;d1:a<,j:b<,b7:c<,cE:d<,J:e<",
a4:function(a){var z=new S.dv(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f2))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dv:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaB().c},
gJ:function(){return this.gaB().f},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
u=this.gaB().f
z=new S.oc(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,G,{"^":"",eC:{"^":"H;S:c<,T:d<,a3:e<,b,a",
gh:function(){return"CounterSlash"},
gU:function(){return!1},
gO:function(){return},
gae:function(){return"swing back at <object>"},
gak:function(){return"will <subject> keep <subject's> balance?"},
V:[function(a,b,c){a.aj(c,"<subject> tr<ies> to swing back")
a.dh(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.a5(a.y,new G.je())
a.bD(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a5(a.y,new G.jf())
a.aM(c,"<subject> lose<s> balance because of that",!0)
a.bD(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.ba(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bD(a,z))
C.a.q(y,L.bg(a,z,C.p))
return H.b(a.gh())+" swings back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.ga8()?0.7:0.9},
M:function(a,b){return a.gH()!==!0&&a.aE(C.c)&&!a.gac()},
A:{
tC:[function(a){return new G.eC("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","qW",2,0,5]}},je:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jf:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,D,{"^":"",jb:{"^":"eC;c,d,e,b,a",
gU:function(){return!0},
gO:function(){return C.d},
gae:function(){return"swing back at <object>"},
gak:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){a.aj(c,"<subject> tr<ies> to swing back")
a.dh(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.a5(a.y,new D.jc())
a.bD(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a5(a.y,new D.jd())
a.aM(c,"<subject> lose<s> balance because of that",!0)
a.bD(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.ba(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bD(a,z))
C.a.q(y,L.bg(a,z,C.o))
return H.b(a.gh())+" swings successfully back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.ga8()?0.7:0.9},
M:function(a,b){return a.gH()===!0&&a.aE(C.c)&&!a.gac()},
A:{
tB:[function(a){return new D.jb("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","qX",2,0,5]}},jc:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jd:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,S,{"^":"",
eB:function(a,b){var z=new S.dc(null,null,null,null,null)
new S.qC(a,b).$1(z)
return z.p()},
eA:{"^":"a2;",
gaK:function(){return[G.qW(),D.qX()]},
gbp:function(){return[$.$get$dx()]},
gh:function(){return"CounterAttackSituation"},
ap:function(){var z=new S.dc(null,null,null,null,null)
z.n(this)
new S.j9().$1(z)
return z.p()},
aF:function(a,b){if(a===0)return b.al(this.a)
return},
aN:function(a,b){return new H.J(a,new S.ja(this),[H.m(a,0)])}},
qC:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaR().c=z
a.gaR().e=0
z=this.a.gj()
a.gaR().b=z
z=this.b.gj()
a.gaR().d=z
return a}},
j9:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
if(typeof z!=="number")return z.a1()
a.gaR().e=z+1
return a}},
ja:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
o7:{"^":"eA;a,j:b<,c,J:d<",
a4:function(a){var z=new S.dc(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eA))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dc:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaR().c},
gJ:function(){return this.gaR().e},
gaR:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaR().b
x=this.gaR().c
w=this.gaR().d
v=this.gaR().e
z=new S.o7(y,x,w,v)
if(y==null)H.h(P.l("counterAttacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,X,{"^":"",
ed:function(a,b,c,d){var z=b.a9("FightSituation")
b.dg(z.gj(),z.a4(new X.rk(c)))
if(c.gam()===C.l){c.aM(a,"<subject> stop<s> moving",!0)
a.F(0,"\n\n",!0)
return}switch($.$get$he().a7(3)){case 0:c.bD(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aM(a,"<subject> fall<s> backward",!0)
c.aM(a,"<subject> twist<s>",!0)
c.bD(a,"<subject> hit<s> the "+H.b(d)+" face down",!0,!0)
break
case 2:c.aM(a,"<subject> drop<s> to <subject's> knees",!0)
c.aM(a,"<subject> keel<s> over",!0)
break}a.F(0,"\n\n",!0)},
rk:{"^":"a:0;a",
$1:function(a){var z=this.a
if(z.gab()!=null)a.gd5().q(0,z.gab())
return a}}}],["","",,O,{"^":"",cu:{"^":"mq;",
aF:function(a,b){if(a===0)return b.al(this.gcE())
return},
aN:function(a,b){return new H.J(a,new O.jk(this),[H.m(a,0)])}},mq:{"^":"a2+lo;"},jk:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.gd1())||J.f(a.gj(),z.gcE())}}}],["","",,U,{"^":"",
jU:function(a,b,c,d){var z=new U.bU(null,null,null,null,null,null,null,null,null)
new U.qA(a,b,c,d).$1(z)
return z.p()},
eG:{"^":"a2;",
gaK:function(){return[N.qT(),Y.rp(),B.tq(),T.td(),T.te(),U.tf(),U.tg(),G.th(),G.ti(),D.tl(),D.tm(),R.tj(),R.tk(),Y.tr()]},
gbp:function(){return H.t([$.$get$fc(),$.$get$ft(),$.$get$fg(),$.$get$fU()],[Q.ab])},
gfH:function(){return 1000},
gh:function(){return"FightSituation"},
ea:function(a,b){var z=a.a
return(z&&C.a).bK(z,new U.jV(b))},
ap:function(){var z=new U.bU(null,null,null,null,null,null,null,null,null)
z.n(this)
new U.jW().$1(z)
return z.p()},
aF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hn(this.f,this.b)
y=H.bw(z,new U.jX(b),H.w(z,"y",0),null)
x=H.w(y,"y",0)
w=P.V(new H.J(y,new U.jY(),[x]),!1,x)
x=H.m(w,0)
v=P.V(new H.J(w,new U.jZ(),[x]),!1,x)
u=v.length===1?C.a.gbY(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.as)(w),++r){q=w[r]
x=b.d
p=x.bf(0,new U.k_(q),new U.k0())
o=p==null?p:p.gJ()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.bf(0,new U.k1(q),new U.k2())
k=l==null?l:l.gJ()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aN:function(a,b){return new H.J(a,new U.k3(this),[H.m(a,0)])},
fM:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a0(z))y.i(0,z).$2(a,b)},
aY:function(a){var z,y
z=this.r
if(z!=null&&!this.ea(this.b,a)){y=a.eA(z)
a.dg(y.gj(),y.a4(new U.k4()))}},
dz:function(a){var z=this.f
if(this.ea(z,a))if(this.ea(this.b,a)){z=z.a
z=(z&&C.a).bK(z,new U.k5(a))}else z=!1
else z=!1
return z}},
qA:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$a3().a7(1073741823)
a.gaa().f=z
a.gaa().y=0
z=a.gaa()
y=z.r
if(y==null){y=new S.af(null,null,[P.u])
y.au()
y.n(C.f)
z.r=y
z=y}else z=y
y=this.a
z.n(new H.cD(y,new U.pF(),[H.m(y,0),null]))
y=a.gaa()
z=y.c
if(z==null){z=new S.af(null,null,[P.u])
z.au()
z.n(C.f)
y.c=z}z.n(J.en(this.b,new U.pG()))
a.gaa().e=this.c
z=new S.af(null,null,[U.aP])
z.au()
z.n(C.f)
a.gaa().b=z
z=this.d.gj()
a.gaa().x=z
return a}},
pF:{"^":"a:0;",
$1:function(a){return a.gj()}},
pG:{"^":"a:0;",
$1:function(a){return a.gj()}},
jV:{"^":"a:0;a",
$1:function(a){return this.a.al(a).gbg()}},
jW:{"^":"a:0;",
$1:function(a){var z=a.gaa().y
if(typeof z!=="number")return z.a1()
a.gaa().y=z+1
return a}},
jX:{"^":"a:0;a",
$1:function(a){return this.a.al(a)}},
jY:{"^":"a:0;",
$1:function(a){return a.gbg()}},
jZ:{"^":"a:0;",
$1:function(a){return a.gH()}},
k_:{"^":"a:0;a",
$1:function(a){return J.f(a.gdd(),this.a.gj())&&a.gh5()===!0}},
k0:{"^":"a:1;",
$0:function(){return}},
k1:{"^":"a:0;a",
$1:function(a){return J.f(a.gdd(),this.a.gj())}},
k2:{"^":"a:1;",
$0:function(){return}},
k3:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gbg()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).a_(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).a_(z,y)
z=y}else z=!0}else z=!1
return z}},
k4:{"^":"a:0;",
$1:function(a){a.sjQ(!1)
return a}},
k5:{"^":"a:29;a",
$1:function(a){var z=this.a.al(a)
return z.gH()===!0&&z.gbg()}},
o9:{"^":"eG;d5:a<,b,c,bx:d<,j:e<,f,r,J:x<",
a4:function(a){var z=new U.bU(null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eG))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b))if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.f(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.i(this.a)+",\nenemyTeamIds="+J.i(this.b)+",\nevents="+J.i(this.c)+",\ngroundMaterial="+J.i(this.d)+",\nid="+J.i(this.e)+",\nplayerTeamIds="+J.i(this.f)+",\nroomRoamingSituationId="+J.i(this.r)+",\ntime="+J.i(this.x)+",\n}"}},
bU:{"^":"d;a,b,c,d,e,f,r,x,y",
gd5:function(){var z,y
z=this.gaa()
y=z.b
if(y==null){y=new S.af(null,null,[U.aP])
y.au()
y.n(C.f)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gaa().e},
gj:function(){return this.gaa().f},
gJ:function(){return this.gaa().y},
gaa:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.af(null,null,[H.m(z,0)])
y.au()
y.n(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.af(null,null,[H.m(z,0)])
y.au()
y.n(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.dq(null,null,[H.m(z,0),H.m(z,1)])
y.ci()
y.n(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.af(null,null,[H.m(z,0)])
y.au()
y.n(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gaa()
x=y.b
if(x==null){x=new S.af(null,null,[U.aP])
x.au()
x.n(C.f)
y.b=x
y=x}else y=x
y=y.p()
x=this.gaa()
w=x.c
if(w==null){w=new S.af(null,null,[P.u])
w.au()
w.n(C.f)
x.c=w
x=w}else x=w
x=x.p()
w=this.gaa()
v=w.d
if(v==null){v=new A.dq(null,null,[P.u,{func:1,v:true,args:[A.a7,Y.a_]}])
v.ci()
v.n(C.V)
w.d=v
w=v}else w=v
w=w.p()
v=this.gaa().e
u=this.gaa().f
t=this.gaa()
s=t.r
if(s==null){s=new S.af(null,null,[P.u])
s.au()
s.n(C.f)
t.r=s
t=s}else t=s
t=t.p()
s=this.gaa().x
r=this.gaa().y
z=new U.o9(y,x,w,v,u,t,s,r)
if(y==null)H.h(P.l("droppedItems"))
if(x==null)H.h(P.l("enemyTeamIds"))
if(w==null)H.h(P.l("events"))
if(v==null)H.h(P.l("groundMaterial"))
if(u==null)H.h(P.l("id"))
if(t==null)H.h(P.l("playerTeamIds"))
if(r==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,A,{"^":"",kW:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gae:function(){return"stab <object>"},
gak:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.bQ(c,"<subject> tr<ies> to stab <object>",z)
a.b9(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new A.kX())
if(b.al(z.gj()).gbt()){a.ba(c,"<subject> thrust<s> {|<subject's> "+H.b(a.gab().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.aM(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ba(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.gab().gh())+" through} <object>",z,!0)
X.ed(c,b,z,b.a9("FightSituation").gbx())}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){var z
if(a.ga8())if(this.b.gb5()){z=a.e
z=z!=null&&J.f(z.gbS(),C.c)}else z=!1
else z=!1
return z},
A:{
tN:[function(a){return new A.kW("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.d,a,null)},"$1","rm",2,0,5]}},kX:{"^":"a:0;",
$1:function(a){var z=a.gaq()
if(typeof z!=="number")return z.aI()
a.saq(z-1)
return a}}}],["","",,U,{"^":"",
kS:function(a,b){var z=new U.ds(null,null,null,null,null)
new U.qL(a,b).$1(z)
return z.p()},
f0:{"^":"a2;",
gaK:function(){return H.t([A.rm()],[{func:1,ret:Q.H,args:[R.C]}])},
gbp:function(){return[$.$get$dx()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ap:function(){var z=new U.ds(null,null,null,null,null)
z.n(this)
new U.kT().$1(z)
return z.p()},
aF:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.by()
if(a>0)return
z=b.al(this.a)
y=b.a
x=H.m(y,0)
w=P.V(new H.J(y,new U.kU(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gft(w)
if(v.ga8())if(z.gb5()){y=v.e
y=y!=null&&J.f(y.gbS(),C.c)}else y=!1
else y=!1
if(y)return v
return},
aN:function(a,b){return new H.J(a,new U.kV(b,b.al(this.a)),[H.m(a,0)])}},
qL:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaS().d=z
a.gaS().e=0
z=this.a.gj()
a.gaS().b=z
z=this.b
z=z==null?z:z.gj()
a.gaS().c=z
return a}},
kT:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
if(typeof z!=="number")return z.a1()
a.gaS().e=z+1
return a}},
kU:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gbg())if(a.eg(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
kV:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.eg(z,this.a)}},
oa:{"^":"f0;a,b,j:c<,J:d<",
a4:function(a){var z=new U.ds(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.f0))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.i(this.a))+",\nculpritId="+J.i(this.b)+",\nid="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
ds:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaS().d},
gJ:function(){return this.gaS().e},
gaS:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaS().b
x=this.gaS().c
w=this.gaS().d
v=this.gaS().e
z=new U.oa(y,x,w,v)
if(y==null)H.h(P.l("actorId"))
if(w==null)H.h(P.l("id"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",k8:{"^":"H;S:c<,T:d<,a3:e<,U:f<,b,a",
gae:function(){return""},
gh:function(){return"FinishPunch"},
gO:function(){return},
gak:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga8()?C.i:C.l
x=b.a9("PunchSituation").gj()
w=b.a9("FightSituation").gbx()
b.a5(z.y,new O.k9(y))
switch(y){case C.k:throw H.c(new P.F("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fg(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aM(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.l:c.fg(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tI:[function(a){return new O.k8(null,!0,!0,!1,a,null)},"$1","r4",2,0,5]}},k9:{"^":"a:0;a",
$1:function(a){a.sam(this.a)
return a}}}],["","",,E,{"^":"",jp:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gae:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gak:function(){return"will <subject> dodge the fist?"},
V:[function(a,b,c){var z,y
z=b.a9("PunchSituation").gj()
a.k7(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.b1(new E.jq(a,c,z),new E.jr(this,a,c,z),null,null)
y=b.f
C.a.gC(y).aY(b)
C.a.b8(y)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.es(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.a9("PunchSituation").gj(),z,!0)
b.bP("FightSituation")
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
x=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!0},
A:{
tE:[function(a){return new E.jp("Dodging means moving your body out of harm's way.",!1,!1,!0,C.d,a,null)},"$1","qZ",2,0,5]}},jq:{"^":"a:1;a,b,c",
$0:function(){return this.a.ka(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},jr:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kb(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dD:function(a,b,c){var z=new Z.dC(null,null,null,null,null,null)
new Z.qG(a,b,c).$1(z)
return z.p()},
f7:{"^":"cu;",
gaK:function(){return[E.qZ()]},
gh:function(){return"PunchDefenseSituation"},
ap:function(){var z=new Z.dC(null,null,null,null,null,null)
z.n(this)
new Z.ly().$1(z)
return z.p()}},
qG:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaz().c=z
a.gaz().f=0
z=this.a.gj()
a.gaz().b=z
z=this.b.gj()
a.gaz().e=z
a.gaz().d=this.c
return a}},
ly:{"^":"a:0;",
$1:function(a){var z=a.gaz().f
if(typeof z!=="number")return z.a1()
a.gaz().f=z+1
return a}},
od:{"^":"f7;d1:a<,j:b<,b7:c<,cE:d<,J:e<",
a4:function(a){var z=new Z.dC(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.f7))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dC:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaz().c},
gJ:function(){return this.gaz().f},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
u=this.gaz().f
z=new Z.od(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,M,{"^":"",
f9:function(a,b){var z=new M.dE(null,null,null,null,null)
new M.qH(a,b).$1(z)
return z.p()},
f8:{"^":"a2;",
gaK:function(){return[O.r4()]},
gh:function(){return"PunchSituation"},
ap:function(){var z=new M.dE(null,null,null,null,null)
z.n(this)
new M.lz().$1(z)
return z.p()},
aF:function(a,b){if(a===0)return b.al(this.a)
return},
aN:function(a,b){return new H.J(a,new M.lA(this),[H.m(a,0)])}},
qH:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.gj()
a.gaT().b=z
z=this.b.gj()
a.gaT().d=z
return a}},
lz:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
if(typeof z!=="number")return z.a1()
a.gaT().e=z+1
return a}},
lA:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
oe:{"^":"f8;a,j:b<,c,J:d<",
a4:function(a){var z=new M.dE(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.f8))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dE:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaT().c},
gJ:function(){return this.gaT().e},
gaT:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaT().b
x=this.gaT().c
w=this.gaT().d
v=this.gaT().e
z=new M.oe(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",ka:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlash"},
gae:function(){return""},
gak:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.a5(z.gj(),new O.kd())
y=b.a9("SlashSituation").gj()
x=b.al(z.gj()).gbt()
if(x){a.es(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.aM(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.es(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.ed(c,b,z,b.a9("FightSituation").gbx())}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return a.aE(C.c)},
A:{
tK:[function(a){return new O.ka(null,!0,!0,!0,C.d,a,null)},"$1","r5",2,0,5]}},kd:{"^":"a:0;",
$1:function(a){var z=a.gaq()
if(typeof z!=="number")return z.aI()
a.saq(z-1)
return a}}}],["","",,X,{"^":"",jl:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gae:function(){return"step back and parry"},
gak:function(){return"will <subject> parry it?"},
V:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gab().gh())+"|fend it off}")
if(a.gb5())a.b9(c,"<subject> <is> out of balance",!0)
else S.b1(new X.jm(a,c),new X.jn(this,a,c),null,null)
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.aj(c,"<subject> {step<s>|take<s> a step} back")
a.c7(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.gab().gh())+"|fend<s> it off}",!0)
if(!a.ga8()){b.a5(a.y,new X.jo())
if(a.ch===!0)a.aj(c,"<subject> regain<s> balance")}b.bP("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
return 0.5-(a.ga8()?0:0.2)},
M:function(a,b){return a.aE(C.c)},
A:{
tD:[function(a){return new X.jl("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.d,a,null)},"$1","qY",2,0,5]}},jm:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jn:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cC(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jo:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}}}],["","",,F,{"^":"",js:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"DodgeSlash"},
gae:function(){return"dodge and counter"},
gak:function(){return"will <subject> dodge?"},
V:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb5())a.b9(c,"<subject> <is> out of balance",!0)
else S.b1(new F.jt(a,c),new F.ju(this,a,c),null,null)
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ba(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga8()){z.bD(c,"<subject> lose<s> balance because of that",!0,!0)
b.a5(z.y,new F.jv())}b.bP("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eB(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
x=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!a.gac()},
A:{
tF:[function(a){return new F.js("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.d,a,null)},"$1","r_",2,0,5]}},jt:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},ju:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cC(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jv:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return C.i}}}],["","",,G,{"^":"",l4:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"ParrySlash"},
gae:function(){return"parry and counter"},
gak:function(){return"will <subject> parry?"},
V:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gab().gh())+"|fend it off}")
if(a.gb5())a.b9(c,"<subject> <is> out of balance",!0)
else S.b1(new G.l5(a,c),new G.l6(this,a,c),null,null)
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
if(z.gb5()){c.iJ(0,"<subject> <is> out of balance",!0,!0,z)
c.iI(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$hX())
a.c7(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.gab().gh())+"|fend<s> it off easily}",!0)}else a.c7(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.gab().gh())+"|fend<s> it off}",!0)
b.bP("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eB(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
x=a.ga8()?0:0.2
w=this.b.gb5()?0.3:0
if(a.ch===!0)return 0.6-x+w
return 0.3-x+w},
M:function(a,b){return a.aE(C.c)},
A:{
tP:[function(a){return new G.l4("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.d,a,null)},"$1","ro",2,0,5]}},l5:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},l6:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cC(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bg:function(a,b,c){var z=new L.dI(null,null,null,null,null,null)
new L.qB(a,b,c).$1(z)
return z.p()},
fk:{"^":"cu;",
gaK:function(){return[F.r_(),G.ro(),X.qY()]},
gh:function(){return"SlashDefenseSituation"},
ap:function(){var z=new L.dI(null,null,null,null,null,null)
z.n(this)
new L.mt().$1(z)
return z.p()}},
qB:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.gj()
a.gaA().b=z
z=this.b.gj()
a.gaA().e=z
a.gaA().d=this.c
return a}},
mt:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
if(typeof z!=="number")return z.a1()
a.gaA().f=z+1
return a}},
og:{"^":"fk;d1:a<,j:b<,b7:c<,cE:d<,J:e<",
a4:function(a){var z=new L.dI(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fk))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dI:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaA().c},
gJ:function(){return this.gaA().f},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
u=this.gaA().f
z=new L.og(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,M,{"^":"",
bD:function(a,b){var z=new M.dJ(null,null,null,null,null)
new M.qD(a,b).$1(z)
return z.p()},
fl:{"^":"a2;",
gaK:function(){return[O.r5()]},
gh:function(){return"SlashSituation"},
ap:function(){var z=new M.dJ(null,null,null,null,null)
z.n(this)
new M.mu().$1(z)
return z.p()},
aF:function(a,b){if(a===0)return b.al(this.a)
return},
aN:function(a,b){return new H.J(a,new M.mv(this),[H.m(a,0)])}},
qD:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.gj()
a.gaU().b=z
z=this.b.gj()
a.gaU().d=z
return a}},
mu:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
if(typeof z!=="number")return z.a1()
a.gaU().e=z+1
return a}},
mv:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
oh:{"^":"fl;a,j:b<,c,J:d<",
a4:function(a){var z=new M.dJ(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fl))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dJ:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaU().c},
gJ:function(){return this.gaU().e},
gaU:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaU().b
x=this.gaU().c
w=this.gaU().d
v=this.gaU().e
z=new M.oh(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,Q,{"^":"",kb:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gae:function(){return""},
gak:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new Q.kc())
c.ff(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gab())
z.aM(c,"<subject> die<s>",!0)
c.F(0,"\n\n",!0)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return this.b.gac()&&a.aE(C.c)},
A:{
tJ:[function(a){return new Q.kb(null,!0,!0,!0,C.d,a,null)},"$1","r6",2,0,5]}},kc:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}}}],["","",,K,{"^":"",kZ:{"^":"H;T:c<,a3:d<,U:e<,O:f<,S:r<,b,a",
gh:function(){return"OnGroundParry"},
gae:function(){return"parry it"},
gak:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.gab().gh())+"}}")
S.b1(new K.l_(a,c),new K.l0(this,a,c),null,null)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){a.c7(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.gab().gh())+"}",!0)
b.bP("FightSituation")
return H.b(a.db)+" parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.3},
M:function(a,b){return a.aE(C.c)},
A:{
tO:[function(a){return new K.kZ(!1,!1,!0,C.d,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","rn",2,0,5]}},l_:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},l0:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cC(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",lM:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"RollOutOfWay"},
gae:function(){return"roll out of way"},
gak:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.aj(c,"<subject> tr<ies> to roll out of the way")
a.b9(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gP",6,0,2],
W:[function(a,b,c){a.k8(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a5(a.gj(),new Y.lN())
a.c7(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bP("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gC(z):null
if(y.gbJ())return 0
if(y.gb7()===C.j)return 1
if(a.gH()===!0)return 1
return 0.5},
M:function(a,b){return!0},
A:{
tU:[function(a){return new Y.lM(null,!1,!1,!0,C.d,a,null)},"$1","rt",2,0,5]}},lN:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}}}],["","",,V,{"^":"",
du:function(a,b,c){var z=new V.dt(null,null,null,null,null,null)
new V.qE(a,b,c).$1(z)
return z.p()},
f1:{"^":"cu;",
gaK:function(){return[K.rn(),Y.rt()]},
gh:function(){return"OnGroundDefenseSituation"},
ap:function(){var z=new V.dt(null,null,null,null,null,null)
z.n(this)
new V.kY().$1(z)
return z.p()}},
qE:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.gj()
a.gay().b=z
z=this.b.gj()
a.gay().e=z
a.gay().d=this.c
return a}},
kY:{"^":"a:0;",
$1:function(a){var z=a.gay().f
if(typeof z!=="number")return z.a1()
a.gay().f=z+1
return a}},
ob:{"^":"f1;d1:a<,j:b<,b7:c<,cE:d<,J:e<",
a4:function(a){var z=new V.dt(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f1))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dt:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gay().c},
gJ:function(){return this.gay().f},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
u=this.gay().f
z=new V.ob(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,D,{"^":"",
fw:function(a,b){var z=new D.dL(null,null,null,null,null)
new D.qF(a,b).$1(z)
return z.p()},
fv:{"^":"a2;",
gaK:function(){return[Q.r6()]},
gh:function(){return"StrikeDownSituation"},
ap:function(){var z=new D.dL(null,null,null,null,null)
z.n(this)
new D.nf().$1(z)
return z.p()},
aF:function(a,b){if(a===0)return b.al(this.a)
return},
aN:function(a,b){return new H.J(a,new D.ng(this),[H.m(a,0)])}},
qF:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gaV().c=z
a.gaV().e=0
z=this.a.gj()
a.gaV().b=z
z=this.b.gj()
a.gaV().d=z
return a}},
nf:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
if(typeof z!=="number")return z.a1()
a.gaV().e=z+1
return a}},
ng:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
oj:{"^":"fv;a,j:b<,c,J:d<",
a4:function(a){var z=new D.dL(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fv))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntargetOnGround="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dL:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaV().c},
gJ:function(){return this.gaV().e},
gaV:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaV().b
x=this.gaV().c
w=this.gaV().d
v=this.gaV().e
z=new D.oj(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("targetOnGround"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",lo:{"^":"d;",
gbJ:function(){return this.gb7()===C.o},
$isa2:1}}],["","",,K,{"^":"",dA:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",mw:{"^":"ab;T:b<,U:c<,a3:d<,O:e<,a",
gX:function(){return""},
gS:function(){return},
gh:function(){return"SlayMonstersAction"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gC(z):null
x=b.du(y.gbr())
w=b.a
v=x.jP(b)
w.an(0,v)
C.a.q(z,U.jU(new H.J(w,new D.mx(a,x),[H.m(w,0)]),v,x.r,y))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gR",6,0,2],
ag:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
return H.a4(z.length!==0?C.a.gC(z):null,"$isah").c}},mx:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gbg()){z=a.gbk()
y=this.a.gbk()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbr()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",ns:{"^":"cw;T:c<,a3:d<,U:e<,O:f<,b,a",
gS:function(){return},
gh:function(){return"TakeExitAction"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb2())
y=b.f
H.a4(y.length!==0?C.a.gC(y):null,"$isah").b6(b,a,z.gj7(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gR",6,0,2],
ag:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
if(H.a4(z.length!==0?C.a.gC(z):null,"$isah").c===!0)return!1
this.b.gjz()
return!0},
A:{
tY:[function(a){return new Y.ns(!1,!0,!1,null,a,null)},"$1","ts",2,0,48]}}}],["","",,F,{"^":"",
fd:function(a,b){var z=new F.dG(null,null,null,null,null)
new F.qq(a,b).$1(z)
return z.p()},
ah:{"^":"a2;",
gaK:function(){return[Y.ts()]},
gbp:function(){var z=[]
C.a.an(z,$.$get$hl())
z.push($.$get$fm())
return z},
gh:function(){return"RoomRoamingSituation"},
ap:function(){var z=new F.dG(null,null,null,null,null)
z.n(this)
new F.lO().$1(z)
return z.p()},
aF:function(a,b){return b.a.bf(0,new F.lP(),new F.lQ())},
aN:function(a,b){var z=this.aF(null,b)
if(z==null)return[]
return[z]},
fL:function(a,b){a.a.hY(new F.lS(),!0)},
b6:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.du(c)
a.dg(this.b,F.fd(z,z.gjO()!=null))
d.iP()
z.c.$3(b,a,d)
d.F(0,"\n\n",!0)
for(y=R.hB(b,a),y=P.V(y,!0,H.w(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.as)(y),++v){u=a.al(y[v].gj())
t=u.a4(new F.lR(z))
w.ar(0,u)
w.q(0,t)}},
dz:function(a){if(J.f(this.a,$.$get$e8().b))return!1
return!0}},
qq:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.gav().c=z
a.gav().e=0
z=this.a.gh()
a.gav().b=z
a.gav().d=this.b
return a}},
lO:{"^":"a:0;",
$1:function(a){var z=a.gav().e
if(typeof z!=="number")return z.a1()
a.gav().e=z+1
return a}},
lP:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gbg()}},
lQ:{"^":"a:1;",
$0:function(){return}},
lS:{"^":"a:0;",
$1:function(a){return!a.gbt()}},
lR:{"^":"a:0;a",
$1:function(a){a.sbr(this.a.b)
return a}},
of:{"^":"ah;br:a<,j:b<,c,J:d<",
a4:function(a){var z=new F.dG(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.ah))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\nmonstersAlive="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dG:{"^":"d;a,b,c,d,e",
gbr:function(){return this.gav().b},
sbr:function(a){this.gav().b=a
return a},
gj:function(){return this.gav().c},
sjQ:function(a){this.gav().d=a
return a},
gJ:function(){return this.gav().e},
gav:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gav().b
x=this.gav().c
w=this.gav().d
v=this.gav().e
z=new F.of(y,x,w,v)
if(y==null)H.h(P.l("currentRoomName"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("monstersAlive"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,V,{"^":"",
nu:function(){var z=new V.dM(null,null,null)
new V.qO().$1(z)
return z.p()},
nF:function(){var z=new V.dN(null,null,null)
new V.qN().$1(z)
return z.p()},
mB:function(){var z=new V.dK(null,null,null)
new V.qM().$1(z)
return z.p()},
qo:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The crevice is small.\n",!0)}},
qp:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
ql:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The journey from slavery to power begins with a single crack of a skull. Oddmund falls to the rock floor and his blond hair is quickly filled with blood. Above him, Arguth is grinning. He finds Oddmund's death funny. He always finds dying slaves funny.\n\n\nOddmund. He was the leader among the slaves. He was the only one brave enough to steal fungus mush from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n\n\nArguth is checking Oddmund's teeth in case there's gold in them. He stops when he notices you looking at him.\n\n\n\"What the matter, human?\" he says, smirking. He finds your expression amusing.\n",!0)}},
qn:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qj:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The journey from slavery to power begins with a single crack of a skull. Agruth, the orc-slaver, falls to the rock floor. You take his shortsword and with help from another slave, Briana, you move Agruth's body to a shady crevice in the tunnel's wall.\n\n\nYou are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten. [a][b][c][d][e]\n\n\n<p class=\"meta\">You can use the question mark (?) icons below to learn more about each option.</p>\n",!0)}},
qk:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
ke:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.ek(b,new V.kf())
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gT:function(){return!1}},
kf:{"^":"a:0;",
$1:function(a){var z
a.gbF()
z=a.b
a.gbF()
a.b=z+1
return a}},
kg:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.ek(b,new V.kh())
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
N:function(a,b){return 0.7},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gT:function(){return!1}},
kh:{"^":"a:0;",
$1:function(a){var z
a.gbF()
z=a.b
a.gbF()
a.b=z+1
return a}},
mn:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"start_of_book"))return!1
if(b.iA(this.d))return!1
return!0},
W:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.rb(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gT:function(){return!1}},
qh:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
qi:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qf:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
qg:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qd:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a4(b.c,"$isbT").b>=1)c.F(0,"You hear orders being yelled somewhere behind you.",!0)
c.F(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
qe:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qa:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a4(b.c,"$isbT").b>=1)c.F(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.F(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
qc:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
q8:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The crevice is small.\n",!0)}},
q9:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
q6:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
q7:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
q4:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iB("sneak_onto_cart"))c.F(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.F(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.F(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
q5:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
q2:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
q3:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
qS:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
q1:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The stone gate looms before you.\n",!0)}},
my:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"mountain_pass_gate"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.ek(b,new V.mz())
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gT:function(){return!1}},
mz:{"^":"a:0;",
$1:function(a){a.gbF()
a.a=!0
return a}},
nt:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"mountain_pass_gate"))return!1
if(b.ke(this.d)!=null)return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a5(a.gj(),new V.nC())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.nu())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
N:function(a,b){return 0.5},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gT:function(){return!1}},
nC:{"^":"a:0;",
$1:function(a){var z=a.gbm()
if(typeof z!=="number")return z.a1()
a.sbm(z+10)
return a}},
fA:{"^":"a2;",
gbp:function(){return[new A.bC(new V.nx(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bC(new V.ny(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ap:function(){var z=new V.dM(null,null,null)
z.n(this)
new V.nz().$1(z)
return z.p()},
aF:function(a,b){if(a!==0)return
return b.a.aH(0,new V.nA())},
aN:function(a,b){return[a.aH(0,new V.nB())]}},
qO:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
nx:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aN(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a5(a.gj(),new V.nv())
b.a5(a.gj(),new V.nw())
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
nv:{"^":"a:0;",
$1:function(a){var z=a.gaZ()
if(typeof z!=="number")return z.aI()
a.saZ(z-1)
return a}},
nw:{"^":"a:0;",
$1:function(a){var z=a.gbm()
if(typeof z!=="number")return z.a1()
a.sbm(z+10)
return a}},
ny:{"^":"a:8;",
$4:function(a,b,c,d){J.aN(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.er()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
nz:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a1()
a.ga2().c=z+1
return a}},
nA:{"^":"a:0;",
$1:function(a){return a.gH()}},
nB:{"^":"a:0;",
$1:function(a){return a.gH()}},
qQ:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
qR:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
qI:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
qP:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
nD:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.nF())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.3},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gT:function(){return!1}},
fF:{"^":"a2;",
gbp:function(){return[new A.bC(new V.nH(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bC(new V.nI(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ap:function(){var z=new V.dN(null,null,null)
z.n(this)
new V.nJ().$1(z)
return z.p()},
aF:function(a,b){if(a!==0)return
return b.a.aH(0,new V.nK())},
aN:function(a,b){return[a.aH(0,new V.nL())]}},
qN:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
nH:{"^":"a:8;",
$4:function(a,b,c,d){J.aN(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"mountainside_base",c)
b.er()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nI:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aN(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a5(a.gj(),new V.nG())
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nG:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}},
nJ:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a1()
a.ga2().c=z+1
return a}},
nK:{"^":"a:0;",
$1:function(a){return a.gH()}},
nL:{"^":"a:0;",
$1:function(a){return a.gH()}},
mA:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.mB())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.8},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gT:function(){return!1}},
fo:{"^":"a2;",
gbp:function(){return[new A.bC(new V.mD(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bC(new V.mE(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ap:function(){var z=new V.dK(null,null,null)
z.n(this)
new V.mF().$1(z)
return z.p()},
aF:function(a,b){if(a!==0)return
return b.a.aH(0,new V.mG())},
aN:function(a,b){return[a.aH(0,new V.mH())]}},
qM:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a7(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
mD:{"^":"a:8;",
$4:function(a,b,c,d){J.aN(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"mountainside_base",c)
b.er()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
mE:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aN(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a5(a.gj(),new V.mC())
z=b.f
C.a.gC(z).aY(b)
C.a.b8(z)
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
mC:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}},
mF:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a1()
a.ga2().c=z+1
return a}},
mG:{"^":"a:0;",
$1:function(a){return a.gH()}},
mH:{"^":"a:0;",
$1:function(a){return a.gH()}},
nE:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gC(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.a9("RoomRoamingSituation").b6(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ag:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Perhaps you can divert its attention."},
gT:function(){return!1}},
qm:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
qx:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
q0:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
qb:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
ok:{"^":"fA;j:a<,J:b<",
a4:function(a){var z=new V.dM(null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fA))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dM:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gJ:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.ok(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.n(z)
return z}},
om:{"^":"fF;j:a<,J:b<",
a4:function(a){var z=new V.dN(null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fF))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dN:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gJ:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.om(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.n(z)
return z}},
oi:{"^":"fo;j:a<,J:b<",
a4:function(a){var z=new V.dK(null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fo))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dK:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gJ:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.oi(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,N,{"^":"",
u7:[function(a){return[N.e3(),N.hc()]},"$1","tw",2,0,11],
u8:[function(a){return[R.b8(1000+$.$get$cZ().a7(99999),"Arguth",O.ce(),null,new U.c5(!1,10,!0,$.$get$aW(),"scimitar",C.c),null,0,2,100,!1,2,!0,C.r,0,$.$get$cd())]},"$1","tx",2,0,11],
aA:function(a){return a.giD().aH(0,new N.r9())},
rb:function(a,b){a.a5(N.aA(a).gj(),new N.rc(b))},
ub:[function(a){if(a.fc("take_out_gate_guards")||a.fc("take_out_gate_guards_rescue"))return[N.e3()]
else return[N.e3(),N.hc()]},"$1","ty",2,0,11],
ek:function(a,b){var z,y
z=H.a4(a.c,"$isbT")
z.toString
y=new M.dQ(null,!1,0)
y.n(z)
a.c=b.$1(y).p()},
hc:function(){return R.b8(1000+$.$get$cZ().a7(99999),"goblin",O.ce(),null,new U.c5(!1,10,!0,$.$get$aW(),"scimitar",C.c),null,0,1,0,!1,1,!1,C.r,0,$.$get$cd())},
e3:function(){return R.b8(1000+$.$get$cZ().a7(99999),"orc",O.ce(),null,new U.c5(!1,10,!0,$.$get$aW(),"sword",C.c),null,0,2,0,!1,2,!1,C.r,0,$.$get$cd())},
r9:{"^":"a:0;",
$1:function(a){return a.gH()}},
rc:{"^":"a:0;a",
$1:function(a){var z=a.gaZ()
if(typeof z!=="number")return z.a1()
a.saZ(z+this.a)
return a}}}],["","",,O,{"^":"",
u6:[function(a){var z,y
z=$.$get$d5()
y=z.v
if(y.length>0){y+=" "
z.v=y}z.v=y+a},"$1","rv",2,0,15],
u9:[function(a){$.eb=a},"$1","rw",2,0,15],
hr:[function(a,b,c,d,e,f,g){var z=L.ev(a,!1,!1,d,e,f,g)
$.$get$bN().q(0,z)
return z},function(a){return O.hr(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hr(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","ru",2,13,51,0,0,0,1,1,0],
lZ:{"^":"ma;",
bl:function(){var z=0,y=P.au(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bl=P.aq(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cQ){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.D())
m=t.Q
n=Z.mN()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.D()
m.a.E(l.D())
new P.D(0,$.o,null,[null]).bn(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.D())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.c8(0)
m.a.E(n.D())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.D())
w=7
z=10
return P.ap(t.cg(),$async$bl)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.cn){r=n
q=H.A(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.r(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.E(l.D())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.r(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.E(l.D())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.f(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.D())
case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$bl,y)},
eu:function(){var z,y
this.eY()
this.f.aW(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fT(Z.bF())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bF()
z.a.E(y.D())
this.bl()},
kw:[function(a){var z,y
z={}
z.a=null
y=$.$get$bN()
y.L(0,new O.ml(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.i(y)+")"))
this.ig(z)
this.bl()},"$1","gi_",2,0,32],
ig:function(a){var z
if(a.gfs()!=null){z=a.r
$.$get$cb().at(z)}z=a.x
if(z!=null)this.e2(z)},
cg:function(){var z=0,y=P.au(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cg=P.aq(function(a,a0){if(a===1)return P.aw(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cc()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.r(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.D())
p=r.b.de()
r=v.Q
q=p.giR()
u=p.b
o=p.c
r.toString
n=new A.r(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.D())
r=new P.D(0,$.o,null,[null])
r.bn(null)
r.bR(new O.mb(v))
x=!0
z=1
break}m=v.x===v.e.gao().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gao().length){r=v.e.gao()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.e(r,o)
z=1
break}o=!!J.n(r[o]).$isI
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.r(667,null,null,null,null)
k.c=r
o.a.E(k.D())
k=$.$get$bN()
k.hX(new O.mc(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.r(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.D())
o=H.w(k,"b_",0)
o=P.V(new H.J(k,new O.md(u,l),[o]),!0,o)
r=k.a
H.t([],[L.a1])
j=new L.ew(r,o)
if(!j.gK(j)){u=v.Q
r=u.e
if(r!=null){r.d3(new D.bR("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.c6(new P.D(0,$.o,null,[r]),[r])
r=j.dk()
u.a.E(r.D())
u=u.e.a.bR(v.gi_())
i=new O.me(v)
r=H.m(u,0)
q=$.o
if(q!==C.h){i=P.e4(i,q)
q.toString}u.cR(new P.dX(null,new P.D(0,q,null,[r]),6,new O.mf(),i,[r,r]))
x=!0
z=1
break}else{h=k.bf(0,new O.mg(),new O.mh())
if(h!=null){if(h.gfs()!=null){r=h.r
$.$get$cb().at(r)}r=h.x
if(r!=null)v.e2(r)
k.ar(0,h)}}}r=$.$get$cb()
o=r.b
g=r.c
z=o!==g?3:4
break
case 3:++r.d
u=r.a
q=u.length
g=(g-1&q-1)>>>0
r.c=g
if(g<0||g>=q){x=H.e(u,g)
z=1
break}f=u[g]
u[g]=null
z=5
return P.ap(v.cj(f),$async$cg)
case 5:x=a0
z=1
break
case 4:r=$.eb
if(r!=null){v.e2(r)
$.eb=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gao().length-1
v.x=r}else if($.hf)$.hf=!1
else{++r
v.x=r}u.a=r===v.e.gao().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.r(667,null,null,null,null)
o.c=r
q.a.E(o.D())
if(v.x===v.e.gao().length){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="End of book."
u.a.E(r.D())
r=v.Q
u=v.dL()
r.toString
u=u.ex(50)
r.a.E(u.D())
v.Q.a.E(new A.r(80,null,null,null,null).D())
x=!0
z=1
break}r=v.e.gao()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gao()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.W
u.f=new P.c6(new P.D(0,$.o,null,[r]),[r])
r=new A.r(30,null,null,null,null)
r.c=q
u.a.E(r.D())
u.f.a.bR(new O.mi(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gao()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.n(r[q]).$isI?9:11
break
case 9:r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.D())
try{r=v.e.gao()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.iO(r[q])}catch(b){u=H.z(b)
if(u instanceof M.cn){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.r(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.E(q.D())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="- choices added"
r.a.E(q.D())
if(k.bK(0,new O.mj(u,v))&&v.x===v.e.gao().length-1){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.D())
r=v.Q
u=v.dL()
r.toString
u=u.ex(50)
r.a.E(u.D())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gao()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.M,P.al]}
z=H.ar(q,r)?12:14
break
case 12:d=v.x===v.e.gao().length-1?v.dL():null
q=v.e.gao()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.ap(v.cj(H.hx(q[o],r)),$async$cg)
case 15:c=a0
if(k.bK(0,new O.mk(u,v))&&v.x===v.e.gao().length-1){u=v.Q
u.toString
r=d.ex(50)
u.a.E(r.D())}x=c
z=1
break
z=13
break
case 14:u=v.e.gao()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.F("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.ax(x,y)}})
return P.ay($async$cg,y)},
e2:function(a){var z,y,x,w,v
z=$.$get$cr()
if(z.b.test(H.bo(a))){y=this.d
if(y==null)throw H.c(new P.F("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aI()
w=z-1}else{x=this.b.dt(a,this.e.gdv())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a_(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.gh3()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gh3()
else z=!1}else z=!1
$.hd=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.E(v.D())
v=this.e
this.d=new O.m_(v,this.x)
this.e=x
this.x=w
v.e=J.a5(v.gdm(),1)},
eY:function(){var z,y,x,w,v,u
this.x=null
$.$get$cb().aW(0)
$.$get$bN().sl(0,0)
$.pI=null
x=$.$get$ch()
x.aW(0)
w=$.$get$cc()
x.m(0,"points",w)
w.a=0
w.b.aW(0)
this.b.iT()
$.hG=!0
try{this.jt()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.D())
throw H.c(z)}this.fQ()
$.hG=!1},
cj:function(a){var z=0,y=P.au(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cj=P.aq(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d5()
q.v=""
w=4
z=7
return P.ap(a.$0(),$async$cj)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.v+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.i(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cn(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.v.length!==0){t.Q.eD(J.i(q)).bR(new O.mm(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$cj,y)},
i6:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cr().b.test(H.bo(z)))return!1
y=this.b.dt(z,this.e.gdv())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.E(w.D())
return!0}y.gkn()
return!1},"$1","gf1",2,0,33],
dL:function(){var z,y,x,w,v,u
this.fQ()
try{x=this.e.gh()
w=$.$get$ch()
x=new Z.fe(x,this.b.jd(),null,null,null,null)
x.c=H.aB(Z.cM(w),"$isE",[P.q,P.d],"$asE")
x.f=Date.now()
x.e=C.e.kk(H.av(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.D())
throw H.c(z)}},
fF:function(a,b){var z,y,x
this.eY()
z=this.b
y=z.a
if(y.i(0,a.a)==null)throw H.c(new Z.dg("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.i(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.D())
z.jq(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.D())
this.f.an(0,b)}z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.D())
y=$.$get$ch()
Z.lW(a,y,P.dm(P.q,P.bv))
this.cx=H.a4(y.i(0,"game"),"$iseD")
this.cy=H.aB(y.i(0,"hitpoints"),"$isam",[P.aM],"$asam")
z=[P.u]
this.db=H.aB(y.i(0,"stamina"),"$isam",z,"$asam")
this.dx=H.aB(y.i(0,"gold"),"$isam",z,"$asam")
z=this.Q
Z.fT(Z.bF())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bF()
z.a.E(y.D())
y=this.Q
y.toString
z=new A.r(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.E(z.D())
this.bl()},
jJ:function(a){return this.fF(a,null)},
dA:[function(a,b,c,d){var z=0,y=P.au(),x,w=this,v,u,t
var $async$dA=P.aq(function(e,f){if(e===1)return P.aw(f,y)
while(true)switch(z){case 0:v=$.$get$d5()
if(v.v.length!==0){w.Q.eD(J.i(v))
v.v=""}v=w.Q
v.toString
u=new A.r(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.D())
u=U.c3
t=new P.D(0,$.o,null,[u])
v.x=new P.c6(t,[u])
x=t
z=1
break
case 1:return P.ax(x,y)}})
return P.ay($async$dA,y)},function(a,b){return this.dA(a,b,null,!1)},"ks","$4$rerollEffectDescription$rerollable","$2","gho",4,5,44,1,0]},
ml:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seE(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.E(x.D())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cr().b.test(H.bo(z))?y.d.a:y.b.dt(z,y.e.gdv())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
mb:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
mc:{"^":"a:0;a",
$1:function(a){return a.geE()||this.a.i6(a)}},
md:{"^":"a:35;a,b",
$1:function(a){return a.jA(this.b,this.a.a)}},
me:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.E(x.D())
return}},
mf:{"^":"a:0;",
$1:function(a){return a instanceof D.bR}},
mg:{"^":"a:0;",
$1:function(a){return a.gjB()}},
mh:{"^":"a:1;",
$0:function(){return}},
mi:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
mj:{"^":"a:0;a,b",
$1:function(a){return a.d6(!0,this.a.a,this.b.gf1())}},
mk:{"^":"a:0;a,b",
$1:function(a){return a.d6(!0,this.a.a,this.b.gf1())}},
mm:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
lk:{"^":"d;a,b,fm:c<",
iG:function(a,b,c){var z
if(!$.hd){z=J.a5(this.a,b)
this.a=z
this.b.at(new A.cF(b,z,c))}},
q:function(a,b){return this.iG(a,b,null)},
a1:function(a,b){this.q(0,b)
return this},
D:function(){return P.ae(["points",this.a])},
h2:function(a){this.a=a.i(0,"points")
this.b.aW(0)},
hx:function(){this.b=P.b0(null,A.cF)},
$isdH:1},
cN:{"^":"l3;ao:d<,dm:e@,a,b,c",
gh3:function(){return J.a0(this.e,0)}},
m_:{"^":"d;a,b"},
m6:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dt:function(a,b){var z
if(b!=null&&this.a.a0(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a0(a))return z.i(0,a)
else return}},
m:function(a,b,c){this.a.m(0,b,c)
c.sh(b)},
jd:function(){var z=new H.N(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.m8(z))
return z},
jq:function(a){a.L(0,new O.m9(this))},
iT:function(){this.a.L(0,new O.m7())}},
m8:{"^":"a:7;a",
$2:function(a,b){this.a.m(0,a,P.ae(["visitCount",b.gdm()]))}},
m9:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a0(a))z.i(0,a).sdm(J.at(b,"visitCount"))}},
m7:{"^":"a:7;",
$2:function(a,b){b.sdm(0)}}}],["","",,M,{"^":"",cn:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eq:function(a){return new M.cn(a,null,null)}}}}],["","",,M,{"^":"",ma:{"^":"d;"}}],["","",,Z,{"^":"",fe:{"^":"d;a,b,c,d,e,f",
ex:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.r(a,null,null,null,null)
z.c=this.dj()
return z},
dj:function(){var z,y
z=new H.N(0,null,null,null,null,null,0,[P.q,null])
z.m(0,"uid",this.e)
z.m(0,"currentPageName",this.a)
z.m(0,"pageMapState",this.b)
z.m(0,"vars",this.c)
z.m(0,"timestamp",this.f)
y=this.d
if(y!=null)z.m(0,"previousText",y)
return C.v.fq(z)},
k:function(a){return this.dj()},
A:{
ff:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.n(a)
z=!!z.$isI||!!z.$isE}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.n(a).$isdH},
cM:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)if(Z.ff(z.i(a,x)))y.push(Z.cM(z.i(a,x)))
return y}else if(!!z.$isE){w=new H.N(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.lV(a,w))
return w}else if(!!z.$isdH){v=a.D()
v.m(0,"_class",a.gfm())
return Z.cM(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cL:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cL(z.i(a,x),b,null))
return y}else{w=!!z.$isE
if(w&&!a.a0("_class")){v=new H.N(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.lU(b,v))
return v}else if(w&&a.a0("_class"))if(c!=null){c.h2(a)
return c}else{u=z.i(a,"_class")
if(!b.a0(u))throw H.c(new Z.dg("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
lW:function(a,b,c){a.c.L(0,new Z.lX(b,c))}}},lV:{"^":"a:7;a,b",
$2:function(a,b){if(Z.ff(this.a.i(0,a)))this.b.m(0,a,Z.cM(b))}},lU:{"^":"a:7;a,b",
$2:function(a,b){this.b.m(0,a,Z.cL(b,this.a,null))}},lX:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.m(0,a,Z.cL(b,x,null))
else z.m(0,a,Z.cL(b,x,y))}},dg:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},kk:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",lq:{"^":"d;"},lp:{"^":"lq;"},ks:{"^":"lp;a,b,c,d,e,f,r,x",
kA:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aB(a,"$isE",n,"$asE")
m=new A.r(a.i(0,"type"),null,null,null,null)
if(a.a0("strContent"))m.c=a.i(0,"strContent")
if(a.a0("listContent"))m.b=a.i(0,"listContent")
if(a.a0("intContent"))m.d=a.i(0,"intContent")
if(a.a0("mapContent"))m.e=H.aB(a.i(0,"mapContent"),"$isE",n,"$asE")
z=m
switch(z.gbS()){case 1070:o=this.e
if(o!=null){o.d3(new D.bR("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bd()
o.b.bd()
return
case 1000:o=new A.r(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.E(o.D())
n.E(new A.r(10,null,this.c.ch,null,null).D())
return
case 1050:l=z.gju()
this.e.bL(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.D())
o=z.gjL()
if(!o.a0("__submitted__"))o.m(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.cb())
n.bG(new G.jg(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.D())
k=J.at(z.geo(),0)
j=J.at(z.geo(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.bL(new U.c3(C.y[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.D())
o=this.e
if(o!=null){o.d3(new D.bR("Book Restart before choice was selected."))
this.e=null}try{this.c.eu()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.D())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bF()
n.E(o.D())
n.E(new A.cF(0,0,null).dk().D())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.D())
h=this.e
if(h!=null){h.d3(new D.bR("Book Load before choice was selected."))
this.e=null}try{h=z.ghs()
f=new Z.fe(null,null,null,null,null,null)
e=H.aB(C.v.j_(h),"$isE",n,"$asE")
if(!e.a0("currentPageName")||!e.a0("vars"))H.h(new Z.kk("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aB(e.i(0,"pageMapState"),"$isE",n,"$asE")
f.c=H.aB(e.i(0,"vars"),"$isE",n,"$asE")
if(e.a0("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aB(J.ig(z.geo()),"$isbB",[o],"$asbB")
o=this.c
if(v!=null)o.fF(w,v)
else o.jJ(w)}catch(i){o=H.z(i)
if(o instanceof Z.dg){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.D())
this.c.eu()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.D())
this.c.eu()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bF()
g.E(o.D())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.D())
throw H.c(q)}this.c.toString
g.E(new A.cF(0,$.$get$cc().a,null).dk().D())
return
case 1090:this.f.bL(!0)
this.f=null
return
case 1040:this.c.bl()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gbS())+"."
this.a.E(o.D())}},"$1","gic",2,0,21],
eD:function(a){var z=P.W
this.f=new P.c6(new P.D(0,$.o,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.E(z.D())
return this.f.a}},bR:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jg:{"^":"d;a",
D:function(){return P.bZ(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;bS:a<,eo:b<,hs:c<,ju:d<,jL:e<",
gkm:function(){var z=this.a
switch(z){case 10:return"SEND_BOOK_UID"
case 20:return"NO_RESULT"
case 30:return"TEXT_RESULT"
case 40:return"SHOW_CHOICES"
case 50:return"SAVE_GAME"
case 60:return"SAVE_PLAYER_CHRONOLOGY"
case 70:return"POINTS_AWARD"
case 80:return"END_OF_BOOK"
case 90:return"SET_STATS"
case 100:return"UPDATE_STATS"
case 110:return"SHOW_FORM"
case 120:return"UPDATE_FORM"
case 666:return"SCRIPTER_ERROR"
case 667:return"SCRIPTER_LOG"
case 1000:return"REQUEST_BOOK_UID"
case 1010:return"START"
case 1020:return"LOAD_GAME"
case 1040:return"PROCEED"
case 1050:return"CHOICE_SELECTED"
case 1060:return"FORM_INPUT"
case 130:return"SHOW_SLOT_MACHINE"
case 1090:return"TEXT_SHOWN"
case 1070:return"QUIT"
default:return"Unknown type="+H.b(z)}},
dj:function(){return C.v.fq(this.D())},
D:function(){var z,y
z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"type",this.a)
y=this.c
if(y!=null)z.m(0,"strContent",y)
y=this.b
if(y!=null)z.m(0,"listContent",y)
y=this.d
if(y!=null)z.m(0,"intContent",y)
y=this.e
if(y!=null)z.m(0,"mapContent",y)
return z},
k:function(a){var z,y,x
z="Message "+this.gkm()
y=this.a
x=J.n(y)
return z+(x.t(y,50)||x.t(y,60)||x.t(y,90)||x.t(y,100)||x.t(y,666)||x.t(y,667)?" (async)":"")}}}],["","",,E,{"^":"",l3:{"^":"d;h:a@,kn:b<",
k:function(a){return this.a},
gdv:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.i9(z,": ")
if(y>0)return J.ie(this.a,0,y)
else return}}}],["","",,A,{"^":"",cF:{"^":"d;iR:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dk:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a1:{"^":"d;eE:a@,b,c,d,aP:e<,S:f<,fs:r<,x,y",
gjB:function(){return this.e.length===0},
d6:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jA:function(a,b){return this.d6(a,b,null)},
ki:function(){return P.ae(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bR:function(a){this.r=a
return this},
bq:function(a,b){return C.b.bq(this.e,b.gaP())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hv:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bp(a).h0(a)
this.d=C.b.gw(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.a1]},
A:{
ev:function(a,b,c,d,e,f,g){var z=new L.a1(!1,null,null,null,null,e,null,d,g)
z.hv(a,!1,!1,d,e,f,g)
return z}}},ew:{"^":"eV;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
iO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.at(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.n(a[0]).$isbv}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eq(J.i(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.M,P.al]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.at(y,"string")!=null&&!!J.n(J.at(y,"string")).$isbv)try{x=J.at(y,"string").$0()}catch(u){w=H.z(u)
v=M.eq(J.i(w))
throw H.c(v)}else x=""
r=x
q=J.at(y,"goto")
p=H.hx(J.at(y,"script"),t)
o=new L.a1(!1,null,null,null,null,null,null,q,J.at(y,"submenu"))
if(r==null)H.h(P.G("String given to choice cannot be null."))
o.e=J.bp(r).h0(r)
o.d=C.b.gw(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
iM:function(a,b,c,d,e,f,g){if(b instanceof L.a1)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.ev(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.iM(a,b,!1,!1,null,null,null)},
kj:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.V(new H.J(z,new L.iW(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.r(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.L(x,new L.iX(w))
return w},
dk:function(){return this.kj(null,null,null,null)},
k:function(a){var z=this.b
return new H.ak(z,new L.iY(),[H.m(z,0),null]).cz(0,", ")},
$aseV:function(){return[L.a1]},
$asf_:function(){return[L.a1]},
$asI:function(){return[L.a1]},
$asT:function(){return[L.a1]}},iW:{"^":"a:0;a,b,c",
$1:function(a){return a.d6(this.b,this.a,this.c)}},iX:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aN(this.a.b,a.ki())
a.a=!0}},iY:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cO:{"^":"d;cP:a<,aP:b<",
D:function(){return P.ae(["show",this.a,"string",this.b])}},mK:{"^":"d;a",
D:function(){var z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.mL(z))
return z},
L:function(a,b){this.a.L(0,b)}},mL:{"^":"a:37;a",
$2:function(a,b){this.a.m(0,a,b.D())}},fS:{"^":"d;h:a@,b2:b<,fn:c<,dc:d<,cP:e<,fK:f<,aP:r<",A:{
fT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t(new Array(a.length),[Z.fS])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.as)(a),++v){u=a[v]
t=J.K(u)
s=t.i(u,"name")
r=t.i(u,"description")
q=t.i(u,"color")
p=t.i(u,"priority")
o=t.i(u,"show")
n=t.i(u,"notifyOnChange")
t=t.i(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fS(s,r,q,p,o,n,t);++w}C.a.cQ(z,new Z.nS())
return z}}},nS:{"^":"a:7;",
$2:function(a,b){return J.aC(b.gdc(),a.gdc())}},am:{"^":"d;h:a<,b2:b<,c,fn:d<,dc:e<,f,r,fK:x<,fk:y@,fm:z<,$ti",
gas:function(){return this.f},
sas:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cQ=!0}},
gcP:function(){return this.r},
gaP:function(){return this.c.$1(this.f)},
D:function(){return P.ae(["name",this.a,"value",this.f,"show",this.r])},
h2:function(a){var z
this.sas(H.hW(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cQ=!0}},
$isdH:1,
A:{
bE:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cP()
y=z.a0(a)?H.aB(z.i(0,a),"$isam",[h],"$asam"):new Z.am(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.hW(e,h)
y.r=!0
z.m(0,a,y)
return y},
mN:function(){var z,y
z=new Z.mK(new H.N(0,null,null,null,null,null,0,[P.q,Z.cO]))
y=$.$get$cP().gc9()
new H.J(y,new Z.mO(),[H.w(y,"y",0)]).L(0,new Z.mP(z))
$.cQ=!1
return z},
bF:function(){var z=H.t([],[[P.E,P.q,P.d]])
$.$get$cP().gc9().L(0,new Z.mM(z))
return z}}},mO:{"^":"a:0;",
$1:function(a){return a.gfk()}},mP:{"^":"a:22;a",
$1:function(a){var z,y
z=a.gcP()
y=a.gaP()
a.sfk(!1)
this.a.a.m(0,a.a,new Z.cO(z,y))}},mM:{"^":"a:22;a",
$1:function(a){var z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"name",a.gh())
z.m(0,"description",a.gb2())
z.m(0,"color",a.gfn())
z.m(0,"priority",a.gdc())
z.m(0,"show",a.gcP())
z.m(0,"notifyOnChange",a.gfK())
z.m(0,"string",a.gaP())
this.a.push(z)}}}],["","",,N,{"^":"",dp:{"^":"d;h:a<,b,c,hO:d<,e,f",
gfw:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gh(),"")
x=this.a
return y?x:z.gfw()+"."+x},
gen:function(){if($.hE){var z=this.b
if(z!=null)return z.gen()}return $.pP},
jK:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gen().b){if(!!J.n(b).$isbv)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.rs.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.o
x=b
w=this.gfw()
t=c
s=d
r=Date.now()
q=$.eW
$.eW=q+1
p=new N.kK(a,x,v,w,new P.ct(r,!1),q,t,s,e)
if($.hE)for(o=this;o!=null;){o.f4(p)
o=o.b}else $.$get$eY().f4(p)}},
c3:function(a,b,c,d){return this.jK(a,b,c,d,null)},
jg:function(a,b,c){return this.c3(C.Q,a,b,c)},
a6:function(a){return this.jg(a,null,null)},
jf:function(a,b,c){return this.c3(C.P,a,b,c)},
b3:function(a){return this.jf(a,null,null)},
je:function(a,b,c){return this.c3(C.R,a,b,c)},
bC:function(a){return this.je(a,null,null)},
js:function(a,b,c){return this.c3(C.x,a,b,c)},
fE:function(a){return this.js(a,null,null)},
ko:function(a,b,c){return this.c3(C.U,a,b,c)},
ey:function(a){return this.ko(a,null,null)},
hn:function(a,b,c){return this.c3(C.T,a,b,c)},
dw:function(a){return this.hn(a,null,null)},
f4:function(a){},
A:{
bb:function(a){return $.$get$eX().jY(a,new N.qv(a))}}},qv:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dC(z,"."))H.h(P.G("name shouldn't start with a '.'"))
y=C.b.jH(z,".")
if(y===-1)x=z!==""?N.bb(""):null
else{x=N.bb(C.b.ax(z,0,y))
z=C.b.bz(z,y+1)}w=new H.N(0,null,null,null,null,null,0,[P.q,N.dp])
w=new N.dp(z,x,null,w,new P.fV(w,[null,null]),null)
if(x!=null)x.ghO().m(0,z,w)
return w}},aQ:{"^":"d;h:a<,as:b<",
t:function(a,b){if(b==null)return!1
return b instanceof N.aQ&&this.b===b.b},
aG:function(a,b){return C.e.aG(this.b,b.gas())},
bV:function(a,b){return C.e.bV(this.b,b.gas())},
by:function(a,b){var z=b.gas()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bE:function(a,b){return this.b>=b.gas()},
bq:function(a,b){var z=b.gas()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gw:function(a){return this.b},
k:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aQ]}},kK:{"^":"d;en:a<,b,aC:c<,d,J:e<,f,be:r<,bc:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bq:function(a){return X.cY(J.i6(a,0,new X.rd()))},
aU:function(a,b){var z=J.a5(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cY:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rd:{"^":"a:7;",
$2:function(a,b){return X.aU(a,J.j(b))}}}],["","",,U,{"^":"",cK:{"^":"d;a,b",
k:function(a){return this.b}},c3:{"^":"d;a,kp:b<",
gel:function(){return this.a===C.A},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
t:function(a,b){if(b==null)return!1
return b instanceof U.c3&&b.a===this.a&&J.f(b.b,this.b)},
gw:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
ua:[function(a,b){var z,y,x,w,v
z=new D.ks(b,null,null,null,null,null,null,null)
y=$.fb
$.fb=y+1
x=new H.c1(y,null,!1)
w=init.globalState.d
w.dF(y,x)
w.cp()
w=new H.lG(x,null)
w.hy(x)
z.b=w
w=w.b
w.toString
new P.cS(w,[H.m(w,0)]).aw(z.gic(),null,null,null)
b.E(new H.c9(z.b.a,init.globalState.d.a))
v=N.m1()
z.c=v
v.Q=z},"$2","hs",4,0,34]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eO.prototype
return J.ku.prototype}if(typeof a=="string")return J.bY.prototype
if(a==null)return J.eP.prototype
if(typeof a=="boolean")return J.eN.prototype
if(a.constructor==Array)return J.bW.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aV=function(a){if(a==null)return a
if(a.constructor==Array)return J.bW.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.K=function(a){if(typeof a=="string")return J.bY.prototype
if(a==null)return a
if(a.constructor==Array)return J.bW.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.a9=function(a){if(typeof a=="number")return J.bX.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ea=function(a){if(typeof a=="number")return J.bX.prototype
if(typeof a=="string")return J.bY.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.bp=function(a){if(typeof a=="string")return J.bY.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.a5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ea(a).a1(a,b)}
J.br=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.a9(a).cL(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).t(a,b)}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a9(a).by(a,b)}
J.bP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a9(a).aG(a,b)}
J.b6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ea(a).bW(a,b)}
J.i4=function(a){if(typeof a=="number")return-a
return J.a9(a).eB(a)}
J.aC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a9(a).aI(a,b)}
J.at=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).i(a,b)}
J.aN=function(a,b){return J.aV(a).q(a,b)}
J.ci=function(a,b){return J.ea(a).bq(a,b)}
J.i5=function(a,b){return J.K(a).a_(a,b)}
J.el=function(a,b){return J.aV(a).ai(a,b)}
J.i6=function(a,b,c){return J.aV(a).b4(a,b,c)}
J.j=function(a){return J.n(a).gw(a)}
J.em=function(a){return J.K(a).gK(a)}
J.aj=function(a){return J.aV(a).gY(a)}
J.i7=function(a){return J.aV(a).gC(a)}
J.aD=function(a){return J.K(a).gl(a)}
J.i8=function(a){return J.n(a).gbj(a)}
J.i9=function(a,b){return J.K(a).bs(a,b)}
J.en=function(a,b){return J.aV(a).aX(a,b)}
J.ia=function(a,b,c){return J.bp(a).fG(a,b,c)}
J.ib=function(a,b,c){return J.bp(a).k5(a,b,c)}
J.ic=function(a){return J.a9(a).fW(a)}
J.id=function(a,b){return J.aV(a).dB(a,b)}
J.d6=function(a,b){return J.bp(a).dC(a,b)}
J.ie=function(a,b,c){return J.bp(a).ax(a,b,c)}
J.ig=function(a){return J.aV(a).bv(a)}
J.i=function(a){return J.n(a).k(a)}
J.b7=function(a,b){return J.a9(a).dl(a,b)}
J.ih=function(a,b){return J.aV(a).bU(a,b)}
I.d3=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.G=J.aO.prototype
C.a=J.bW.prototype
C.K=J.eN.prototype
C.e=J.eO.prototype
C.t=J.eP.prototype
C.n=J.bX.prototype
C.b=J.bY.prototype
C.B=new A.ac(0,0,0)
C.C=new A.ac(-1/0,-1/0,-1/0)
C.D=new A.ck(-10,0,100)
C.E=new P.l2()
C.u=new P.oI()
C.F=new P.p0()
C.h=new P.pf()
C.w=new P.aY(0)
C.H=new U.cz(0,"ItemType.spear")
C.I=new U.cz(1,"ItemType.branch")
C.J=new U.cz(2,"ItemType.tent")
C.c=new U.cz(3,"ItemType.sword")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.ky(null,null)
C.M=new P.kA(null)
C.N=new P.kB(null,null)
C.O=new O.kC(0,"KnownToMode.all")
C.P=new N.aQ("FINER",400)
C.Q=new N.aQ("FINEST",300)
C.R=new N.aQ("FINE",500)
C.x=new N.aQ("INFO",800)
C.S=new N.aQ("OFF",2000)
C.T=new N.aQ("SEVERE",1000)
C.U=new N.aQ("WARNING",900)
C.A=new U.cK(0,"Result.success")
C.Y=new U.cK(1,"Result.failure")
C.Z=new U.cK(2,"Result.criticalSuccess")
C.a_=new U.cK(3,"Result.criticalFailure")
C.y=I.d3([C.A,C.Y,C.Z,C.a_])
C.f=I.d3([])
C.V=new H.j6(0,{},C.f,[null,null])
C.k=new R.dz(0,"Pose.standing")
C.i=new R.dz(1,"Pose.offBalance")
C.l=new R.dz(2,"Pose.onGround")
C.p=new K.dA(0,"Predetermination.none")
C.j=new K.dA(1,"Predetermination.successGuaranteed")
C.o=new K.dA(2,"Predetermination.failureGuaranteed")
C.r=new Y.c_("he","him","his","himself")
C.q=new Y.c_("it","it","its","itself")
C.W=new Y.c_("she","her","her","herself")
C.X=new Y.c_("they","them","their","themselves")
C.z=new Y.c_("you","you","your","yourself")
C.d=new Q.lL(0,"Resource.stamina")
C.a0=H.b4("eQ")
C.a1=H.b4("al")
C.a2=H.b4("q")
C.a3=H.b4("W")
C.a4=H.b4("aM")
C.m=H.b4("dynamic")
C.a5=H.b4("u")
C.a6=H.b4("L")
C.a7=new P.bH(null,2)
$.fb=1
$.f4="$cachedFunction"
$.f5="$cachedInvocation"
$.aE=0
$.bs=null
$.er=null
$.bl=null
$.bK=null
$.bL=null
$.e1=!1
$.o=C.h
$.eF=0
$.eb=null
$.hd=!1
$.pI=null
$.hf=!1
$.hG=!0
$.cQ=!1
$.hE=!1
$.rs=C.S
$.pP=C.x
$.eW=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["eK","$get$eK",function(){return H.kq()},"eL","$get$eL",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eF
$.eF=z+1
z="expando$key$"+z}return new P.jT(null,z,[P.u])},"fH","$get$fH",function(){return H.aH(H.cR({
toString:function(){return"$receiver$"}}))},"fI","$get$fI",function(){return H.aH(H.cR({$method$:null,
toString:function(){return"$receiver$"}}))},"fJ","$get$fJ",function(){return H.aH(H.cR(null))},"fK","$get$fK",function(){return H.aH(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fO","$get$fO",function(){return H.aH(H.cR(void 0))},"fP","$get$fP",function(){return H.aH(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fM","$get$fM",function(){return H.aH(H.fN(null))},"fL","$get$fL",function(){return H.aH(function(){try{null.$method$}catch(z){return z.message}}())},"fR","$get$fR",function(){return H.aH(H.fN(void 0))},"fQ","$get$fQ",function(){return H.aH(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dS","$get$dS",function(){return P.oq()},"ba","$get$ba",function(){var z,y
z=P.al
y=new P.D(0,P.o3(),null,[z])
y.hF(null,z)
return y},"bM","$get$bM",function(){return[]},"by","$get$by",function(){return N.bb("PlannerRecommendation")},"hu","$get$hu",function(){return new K.q_()},"e8","$get$e8",function(){var z=$.$get$hu()
return K.Z("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a3","$get$a3",function(){return P.cH(null)},"bA","$get$bA",function(){return P.cH(null)},"hI","$get$hI",function(){return N.bb("Storyline")},"fu","$get$fu",function(){return P.be("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cd","$get$cd",function(){return L.dR(new L.qt())},"aW","$get$aW",function(){return L.dR(new L.qu())},"hP","$get$hP",function(){return L.dR(new L.qs())},"dx","$get$dx",function(){return new F.l7("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"e6","$get$e6",function(){return Y.dd(!1,"balance",!0,C.q,$.$get$aW())},"hQ","$get$hQ",function(){return Y.dd(!1,"pounding",!1,C.q,$.$get$aW())},"fc","$get$fc",function(){return new B.lJ("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fg","$get$fg",function(){return new O.lY(null,!1,!0,!1,null,null)},"ft","$get$ft",function(){return new Q.mI(null,!1,!0,!0,C.d,null)},"fU","$get$fU",function(){return new M.nT("",!0,C.d,!1,!0,null)},"he","$get$he",function(){return P.cH(null)},"hX","$get$hX",function(){return Y.dd(!1,"swing",!0,C.q,$.$get$aW())},"fm","$get$fm",function(){return new D.mw(!1,!1,!0,null,null)},"hw","$get$hw",function(){return K.Z("forge_church_crevice",new V.qo(),new V.qp(),null,null,H.t([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"hH","$get$hH",function(){return K.Z("kill_arguth",new V.ql(),new V.qn(),N.tx(),null,H.t([new Q.v("start_of_book","","You watch Arguth's corpse with hatred.",null)],[Q.v]),"ground")},"hS","$get$hS",function(){return K.Z("start_of_book",new V.qj(),new V.qk(),null,null,H.t([],[Q.v]),"ground")},"eH","$get$eH",function(){return new V.ke("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eI","$get$eI",function(){return new V.kg("Flee through the War Forges","flee_through_war_forge",!0,null)},"fh","$get$fh",function(){return new V.mn("Search Agruth","search_agruth",!0,null)},"hY","$get$hY",function(){return K.Z("the_shafts",new V.qh(),new V.qi(),null,null,H.t([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"i_","$get$i_",function(){return K.Z("tunnel",new V.qf(),new V.qg(),N.tw(),null,H.t([new Q.v("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.v]),"ground")},"i0","$get$i0",function(){return K.Z("underground_church",new V.qd(),new V.qe(),null,null,H.t([new Q.v("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.v]),"ground")},"i1","$get$i1",function(){return K.Z("war_forge",new V.qa(),new V.qc(),null,null,H.t([new Q.v("tunnel","Enter the corridor","You enter the corridor.",null),new Q.v("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.v]),"ground")},"i2","$get$i2",function(){return K.Z("war_forge_crevice",new V.q8(),new V.q9(),null,null,H.t([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"hv","$get$hv",function(){return K.Z("entrance_to_bloodrock",new V.q6(),new V.q7(),null,null,H.t([new Q.v("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.v("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.v]),"ground")},"hJ","$get$hJ",function(){return K.Z("mountain_pass",new V.q4(),new V.q5(),null,null,H.t([new Q.v("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.v]),"ground")},"hK","$get$hK",function(){return K.Z("mountain_pass_gate",new V.q2(),new V.q3(),null,null,H.t([new Q.v("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.v]),"ground")},"hL","$get$hL",function(){return K.Z("mountain_pass_guard_post",new V.qS(),new V.q1(),N.ty(),null,H.t([new Q.v("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.v]),"ground")},"fn","$get$fn",function(){return new V.my("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fB","$get$fB",function(){return new V.nt("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"hM","$get$hM",function(){return K.Z("mountainside_base",new V.qQ(),new V.qR(),null,null,H.t([new Q.v("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.v]),"ground")},"hN","$get$hN",function(){return K.Z("mountainside_path",new V.qI(),new V.qP(),null,null,H.t([new Q.v("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.v]),"ground")},"fG","$get$fG",function(){return new V.nD("Scare off the serpent","threaten_winged_serpent",!0,null)},"fp","$get$fp",function(){return new V.mA("Soothe the serpent","soothe_winged_serpent",!0,null)},"fE","$get$fE",function(){return new V.nE("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"i3","$get$i3",function(){return K.Z("winged_serpent_nest",new V.qm(),new V.qx(),null,null,H.t([new Q.v("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.v]),"ground")},"hF","$get$hF",function(){return K.Z("ironcast_road",new V.q0(),new V.qb(),null,null,H.t([new Q.v("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.v]),"ground")},"hm","$get$hm",function(){return H.t([$.$get$hw(),$.$get$hH(),$.$get$hS(),$.$get$hY(),$.$get$i_(),$.$get$i0(),$.$get$i1(),$.$get$i2(),$.$get$hv(),$.$get$hJ(),$.$get$hK(),$.$get$hL(),$.$get$hM(),$.$get$hN(),$.$get$i3(),$.$get$hF()],[K.c2])},"hl","$get$hl",function(){return H.t([$.$get$eH(),$.$get$eI(),$.$get$fh(),$.$get$fn(),$.$get$fB(),$.$get$fG(),$.$get$fp(),$.$get$fE()],[A.aF])},"cZ","$get$cZ",function(){return P.cH(null)},"d5","$get$d5",function(){return P.nh("")},"cc","$get$cc",function(){var z=new O.lk(0,null,"PointsCounter")
z.hx()
return z},"bN","$get$bN",function(){return new L.ew(null,H.t([],[L.a1]))},"ch","$get$ch",function(){return H.eU(P.q,P.d)},"cb","$get$cb",function(){return P.b0(null,{func:1,ret:[P.M,P.al]})},"cr","$get$cr",function(){return P.be("^\\s*<<<\\s*$",!0,!1)},"cP","$get$cP",function(){return H.eU(P.q,Z.am)},"eY","$get$eY",function(){return N.bb("")},"eX","$get$eX",function(){return P.dm(P.q,N.dp)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.C,A.a7,Y.a_]},{func:1,args:[,,,]},{func:1,args:[R.C,A.a7,Y.a_]},{func:1,ret:Q.H,args:[R.C]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,v:true,args:[R.C,A.a7,Y.a_,R.C,S.a2]},{func:1,ret:[P.y,R.C],args:[A.a7]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.aT]},{func:1,v:true,args:[P.q]},{func:1,v:true,args:[R.C,A.a7,Y.a_,R.C,,]},{func:1,args:[P.aM]},{func:1,ret:P.M},{func:1,ret:P.L,args:[A.ac]},{func:1,args:[,P.aT]},{func:1,v:true,args:[P.d]},{func:1,args:[Z.am]},{func:1,ret:Y.bu,args:[P.u]},{func:1,args:[R.C]},{func:1,args:[P.bc]},{func:1,args:[P.u,R.C]},{func:1,args:[U.bU]},{func:1,args:[Y.a6]},{func:1,ret:P.W,args:[P.u]},{func:1,args:[P.u,,]},{func:1,args:[[P.I,Y.a6],Y.a6]},{func:1,v:true,args:[P.u]},{func:1,ret:P.W,args:[L.a1]},{func:1,v:true,args:[[P.I,P.q],P.fi]},{func:1,args:[L.a1]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cO]},{func:1,ret:P.L,args:[A.ck]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[P.L,R.C]},{func:1,ret:P.u,args:[P.Q,P.Q]},{func:1,ret:P.q,args:[Q.ab]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:[P.M,U.c3],args:[P.aM,P.q],named:{rerollEffectDescription:P.q,rerollable:P.W}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aT]},{func:1,ret:Q.cy,args:[U.aP]},{func:1,ret:Q.cw,args:[Q.v]},{func:1,v:true,args:[P.d,P.aT]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a1,args:[P.q],named:{deferToChoiceList:P.W,deferToEndOfPage:P.W,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.M,P.al]},submenu:P.q}},{func:1,args:[P.W]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.tt(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.d3=a.d3
Isolate.b5=a.b5
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hT(X.hs(),b)},[])
else (function(b){H.hT(X.hs(),b)})([])})})()