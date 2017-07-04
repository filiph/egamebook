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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ea"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ea"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ea(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b4=function(){}
var dart=[["","",,H,{"^":"",u_:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aO:{"^":"d;",
u:function(a,b){return a===b},
gw:function(a){return H.av(a)},
k:function(a){return H.cG(a)},
gbj:function(a){return new H.ao(H.hH(a),null)}},
eR:{"^":"aO;",
k:function(a){return String(a)},
gw:function(a){return a?519018:218159},
gbj:function(a){return C.a4},
$isX:1},
eT:{"^":"aO;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gw:function(a){return 0},
gbj:function(a){return C.a2},
$isam:1},
eX:{"^":"aO;",
gw:function(a){return 0},
gbj:function(a){return C.a1},
k:function(a){return String(a)},
$iseU:1},
u4:{"^":"eX;"},
bg:{"^":"eX;"},
bX:{"^":"aO;$ti",
fp:function(a,b){if(!!a.immutable$list)throw H.c(new P.O(b))},
cs:function(a,b){if(!!a.fixed$length)throw H.c(new P.O(b))},
q:function(a,b){this.cs(a,"add")
a.push(b)},
b9:function(a){this.cs(a,"removeLast")
if(a.length===0)throw H.c(H.az(a,-1))
return a.pop()},
ao:function(a,b){var z
this.cs(a,"remove")
for(z=0;z<a.length;++z)if(J.i(a[z],b)){a.splice(z,1)
return!0}return!1},
is:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bV:function(a,b){return new H.J(a,b,[H.m(a,0)])},
ap:function(a,b){var z
this.cs(a,"addAll")
for(z=J.ak(b);z.t();)a.push(z.d)},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aY:function(a,b){return new H.al(a,b,[H.m(a,0),null])},
dC:function(a,b){return H.fD(a,b,null,H.m(a,0))},
bg:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bf:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.ad())},
fz:function(a,b){return this.bf(a,b,null)},
al:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
geg:function(a){if(a.length>0)return a[0]
throw H.c(H.ad())},
gB:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ad())},
gbZ:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.ad())
throw H.c(H.dj())},
aP:function(a,b,c,d,e){var z,y,x
this.fp(a,"setRange")
P.cJ(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.f(P.W(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eQ())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bM:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cT:function(a,b){var z
this.fp(a,"sort")
z=b==null?P.r6():b
H.c5(a,0,a.length-1,z)},
eJ:function(a){return this.cT(a,null)},
ej:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.i(a[z],b))return z
return-1},
bs:function(a,b){return this.ej(a,b,0)},
Y:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
gK:function(a){return a.length===0},
gah:function(a){return a.length!==0},
k:function(a){return P.bW(a,"[","]")},
bx:function(a){return P.aZ(a,H.m(a,0))},
gZ:function(a){return new J.bq(a,a.length,0,null,[H.m(a,0)])},
gw:function(a){return H.av(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cs(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cm(b,"newLength",null))
if(b<0)throw H.c(P.W(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
m:function(a,b,c){if(!!a.immutable$list)H.f(new P.O("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
a[b]=c},
$iscC:1,
$ascC:I.b4,
$isI:1,
$isU:1},
tZ:{"^":"bX;$ti"},
bq:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.as(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bY:{"^":"aO;",
bq:function(a,b){var z
if(typeof b!=="number")throw H.c(H.P(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gda(b)
if(this.gda(a)===z)return 0
if(this.gda(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gda:function(a){return a===0?1/a<0:a<0},
h0:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.O(""+a+".round()"))},
bT:function(a,b){var z
if(b>20)throw H.c(P.W(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gda(a))return"-"+z
return z},
kp:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.W(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.ct(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.f(new P.O("Unexpected toString result: "+z))
x=J.K(y)
z=x.i(y,1)
w=+x.i(y,3)
if(x.i(y,2)!=null){z+=x.i(y,2)
w-=x.i(y,2).length}return z+C.b.bX("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
eE:function(a){return-a},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a+b},
aJ:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a-b},
cO:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a/b},
bX:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a*b},
bD:function(a,b){return(a|0)===a?a/b|0:this.iB(a,b)},
iB:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.O("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
d2:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aH:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<b},
bA:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>b},
bW:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<=b},
bG:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>=b},
gbj:function(a){return C.a7},
$isL:1},
eS:{"^":"bY;",
gbj:function(a){return C.a6},
$isaM:1,
$isL:1,
$isu:1},
kF:{"^":"bY;",
gbj:function(a){return C.a5},
$isaM:1,
$isL:1},
bZ:{"^":"aO;",
ct:function(a,b){if(b<0)throw H.c(H.az(a,b))
if(b>=a.length)H.f(H.az(a,b))
return a.charCodeAt(b)},
ce:function(a,b){if(b>=a.length)throw H.c(H.az(a,b))
return a.charCodeAt(b)},
ea:function(a,b,c){if(c>b.length)throw H.c(P.W(c,0,b.length,null,null))
return new H.pz(b,a,c)},
e9:function(a,b){return this.ea(a,b,0)},
fK:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.W(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.ct(b,c+y)!==this.ce(a,y))return
return new H.fC(c,b,a)},
a4:function(a,b){if(typeof b!=="string")throw H.c(P.cm(b,null,null))
return a+b},
ee:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bB(a,y-z)},
k8:function(a,b,c){H.bm(c)
return H.o(a,b,c)},
k9:function(a,b,c,d){H.bm(c)
P.lW(d,0,a.length,"startIndex",null)
return H.bP(a,b,c,d)},
dh:function(a,b,c){return this.k9(a,b,c,0)},
hx:function(a,b,c){var z
if(c>a.length)throw H.c(P.W(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.ie(b,a,c)!=null},
dD:function(a,b){return this.hx(a,b,0)},
ax:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.f(H.P(c))
if(b<0)throw H.c(P.c1(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.c(P.c1(b,null,null))
if(c>a.length)throw H.c(P.c1(c,null,null))
return a.substring(b,c)},
bB:function(a,b){return this.ax(a,b,null)},
h5:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.ce(z,0)===133){x=J.dk(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.ct(z,w)===133?J.kG(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kq:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.ce(z,0)===133?J.dk(z,1):0}else{y=J.dk(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bX:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.G)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
ej:function(a,b,c){var z
if(c>a.length)throw H.c(P.W(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bs:function(a,b){return this.ej(a,b,0)},
jM:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jL:function(a,b){return this.jM(a,b,null)},
j0:function(a,b,c){if(b==null)H.f(H.P(b))
if(c>a.length)throw H.c(P.W(c,0,a.length,null,null))
return H.tB(a,b,c)},
Y:function(a,b){return this.j0(a,b,0)},
gK:function(a){return a.length===0},
gah:function(a){return a.length!==0},
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
gbj:function(a){return C.a3},
gl:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
$iscC:1,
$ascC:I.b4,
$isq:1,
$isdA:1,
A:{
eV:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dk:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.ce(a,b)
if(y!==32&&y!==13&&!J.eV(y))break;++b}return b},
kG:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.ct(a,z)
if(y!==32&&y!==13&&!J.eV(y))break}return b}}}}],["","",,H,{"^":"",
he:function(a){return a},
ad:function(){return new P.E("No element")},
dj:function(){return new P.E("Too many elements")},
eQ:function(){return new P.E("Too few elements")},
c5:function(a,b,c,d){if(c-b<=32)H.fv(a,b,c,d)
else H.fu(a,b,c,d)},
fv:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.K(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a0(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.i(a,v))
w=v}y.m(a,w,x)}},
fu:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bD(c-b+1,6)
y=b+z
x=c-z
w=C.d.bD(b+c,2)
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
if(J.i(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.n(i)
if(h.u(i,0))continue
if(h.aH(i,0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.a9(i)
if(h.bA(i,0)){--l
continue}else{g=l-1
if(h.aH(i,0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
l=g
m=f
break}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(J.bQ(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else if(J.a0(d.$2(j,p),0))for(;!0;)if(J.a0(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.m(a,k,t.i(a,m))
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
H.c5(a,b,m-2,d)
H.c5(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.i(d.$2(t.i(a,m),r),0);)++m
for(;J.i(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.i(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else if(J.i(d.$2(j,p),0))for(;!0;)if(J.i(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)}l=g
break}}H.c5(a,m,l,d)}else H.c5(a,m,l,d)},
U:{"^":"y;$ti"},
aS:{"^":"U;$ti",
gZ:function(a){return new H.dq(this,this.gl(this),0,null,[H.x(this,"aS",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.al(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gB:function(a){if(this.gl(this)===0)throw H.c(H.ad())
return this.al(0,this.gl(this)-1)},
Y:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.i(this.al(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.al(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cC:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.al(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.al(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.al(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bV:function(a,b){return this.eN(0,b)},
aY:function(a,b){return new H.al(this,b,[H.x(this,"aS",0),null])},
bg:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.al(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
bw:function(a,b){var z,y,x,w
z=[H.x(this,"aS",0)]
if(b){y=H.t([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gl(this);++w){z=this.al(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
ca:function(a){return this.bw(a,!0)},
bx:function(a){var z,y
z=P.V(null,null,null,H.x(this,"aS",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.al(0,y))
return z}},
nA:{"^":"aS;a,b,c,$ti",
gi_:function(){var z=J.aC(this.a)
return z},
giz:function(){var z,y
z=J.aC(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aC(this.a)
y=this.b
if(y>=z)return 0
return z-y},
al:function(a,b){var z,y
z=this.giz()+b
if(!(b<0)){y=this.gi_()
if(typeof y!=="number")return H.w(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cy(b,this,"index",null,null))
return J.ep(this.a,z)},
bw:function(a,b){var z,y,x,w,v,u,t,s,r
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
t=H.t(s,u)}for(r=0;r<v;++r){u=x.al(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hG:function(a,b,c,d){var z=this.b
if(z<0)H.f(P.W(z,0,null,"start",null))},
A:{
fD:function(a,b,c,d){var z=new H.nA(a,b,c,[d])
z.hG(a,b,c,d)
return z}}},
dq:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.al(0,x);++this.c
return!0}},
cD:{"^":"y;a,b,$ti",
gZ:function(a){return new H.l3(null,J.ak(this.a),this.b,this.$ti)},
gl:function(a){return J.aC(this.a)},
gK:function(a){return J.eq(this.a)},
gB:function(a){return this.b.$1(J.ib(this.a))},
$asy:function(a,b){return[b]},
A:{
bw:function(a,b,c,d){if(!!J.n(a).$isU)return new H.bs(a,b,[c,d])
return new H.cD(a,b,[c,d])}}},
bs:{"^":"cD;a,b,$ti",$isU:1,
$asU:function(a,b){return[b]}},
l3:{"^":"cB;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascB:function(a,b){return[b]}},
al:{"^":"aS;a,b,$ti",
gl:function(a){return J.aC(this.a)},
al:function(a,b){return this.b.$1(J.ep(this.a,b))},
$asaS:function(a,b){return[b]},
$asU:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
J:{"^":"y;a,b,$ti",
gZ:function(a){return new H.dR(J.ak(this.a),this.b,this.$ti)},
aY:function(a,b){return new H.cD(this,b,[H.m(this,0),null])}},
dR:{"^":"cB;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fn:{"^":"y;a,b,$ti",
gZ:function(a){return new H.mK(J.ak(this.a),this.b,this.$ti)},
A:{
mJ:function(a,b,c){if(!!J.n(a).$isU)return new H.jY(a,H.he(b),[c])
return new H.fn(a,H.he(b),[c])}}},
jY:{"^":"fn;a,b,$ti",
gl:function(a){var z=J.aC(this.a)-this.b
if(z>=0)return z
return 0},
$isU:1},
mK:{"^":"cB;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gG:function(){return this.a.gG()}}}],["","",,H,{"^":"",
cb:function(a,b){var z=a.cw(b)
if(!init.globalState.d.cy)init.globalState.f.bi()
return z},
hX:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isI)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.pl(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eO()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.oV(P.b0(null,H.c9),0)
x=P.u
y.z=new H.N(0,null,null,null,null,null,0,[x,H.e0])
y.ch=new H.N(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.pk()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.kx,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.pm)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.V(null,null,null,x)
v=new H.c2(0,null,!1)
u=new H.e0(y,new H.N(0,null,null,null,null,null,0,[x,H.c2]),w,init.createNewIsolate(),v,new H.b6(H.d4()),new H.b6(H.d4()),!1,!1,[],P.V(null,null,null,null),null,null,!1,!0,P.V(null,null,null,null))
w.q(0,0)
u.dG(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ar(a,{func:1,args:[,]}))u.cw(new H.t1(z,a))
else if(H.ar(a,{func:1,args:[,,]}))u.cw(new H.t2(z,a))
else u.cw(a)
init.globalState.f.bi()},
kB:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.kC()
return},
kC:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.O("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.O('Cannot extract URI from "'+z+'"'))},
kx:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cT(!0,[]).bO(b.data)
y=J.K(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cT(!0,[]).bO(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cT(!0,[]).bO(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.V(null,null,null,q)
o=new H.c2(0,null,!1)
n=new H.e0(y,new H.N(0,null,null,null,null,null,0,[q,H.c2]),p,init.createNewIsolate(),o,new H.b6(H.d4()),new H.b6(H.d4()),!1,!1,[],P.V(null,null,null,null),null,null,!1,!0,P.V(null,null,null,null))
p.q(0,0)
n.dG(0,o)
init.globalState.f.a.at(new H.c9(n,new H.ky(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bi()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").E(y.i(z,"msg"))
init.globalState.f.bi()
break
case"close":init.globalState.ch.ao(0,$.$get$eP().i(0,a))
a.terminate()
init.globalState.f.bi()
break
case"log":H.kw(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.bi(!0,P.bI(null,P.u)).bb(q)
y.toString
self.postMessage(q)}else P.ei(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
kw:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.bi(!0,P.bI(null,P.u)).bb(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cw(z)
throw H.c(y)}},
kz:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.f8=$.f8+("_"+y)
$.f9=$.f9+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.ca(y,x),w,z.r])
x=new H.kA(a,b,c,d,z)
if(e===!0){z.fm(w,w)
init.globalState.f.a.at(new H.c9(z,x,"start isolate"))}else x.$0()},
pQ:function(a){return new H.cT(!0,[]).bO(new H.bi(!1,P.bI(null,P.u)).bb(a))},
t1:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
t2:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
pl:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
pm:function(a){var z=P.ae(["command","print","msg",a])
return new H.bi(!0,P.bI(null,P.u)).bb(z)}}},
e0:{"^":"d;j:a<,b,c,jJ:d<,j2:e<,f,r,x,cB:y<,z,Q,ch,cx,cy,db,dx",
fm:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cr()},
k7:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.ao(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fl(x)}this.y=!1}this.cr()},
iR:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
k5:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.f(new P.O("removeRange"))
P.cJ(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hq:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jo:function(a,b,c){var z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.at(new H.pb(a,c))},
jn:function(a,b){var z
if(!this.r.u(0,a))return
z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.ep()
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.at(this.gjK())},
jp:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ei(a)
if(b!=null)P.ei(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.a8(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.E(y)},
cw:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jp(w,v)
if(this.db===!0){this.ep()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjJ()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.dg().$0()}return y},
c5:function(a){return this.b.i(0,a)},
dG:function(a,b){var z=this.b
if(z.a0(a))throw H.c(P.cw("Registry: ports must be registered only once."))
z.m(0,a,b)},
cr:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.ep()},
ep:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aX(0)
for(z=this.b,y=z.gcb(),y=y.gZ(y);y.t();)y.gG().hV()
z.aX(0)
this.c.aX(0)
init.globalState.z.ao(0,this.a)
this.dx.aX(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.E(z[v])}this.ch=null}},"$0","gjK",0,0,6]},
pb:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
oV:{"^":"d;a,b",
j7:function(){var z=this.a
if(z.b===z.c)return
return z.dg()},
h3:function(){var z,y,x
z=this.j7()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a0(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.f(P.cw("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.bi(!0,new P.h8(0,null,null,null,null,null,0,[null,P.u])).bb(x)
y.toString
self.postMessage(x)}return!1}z.k_()
return!0},
fc:function(){if(self.window!=null)new H.oW(this).$0()
else for(;this.h3(););},
bi:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fc()
else try{this.fc()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bi(!0,P.bI(null,P.u)).bb(v)
w.toString
self.postMessage(v)}}},
oW:{"^":"a:6;a",
$0:function(){if(!this.a.h3())return
P.o1(C.x,this)}},
c9:{"^":"d;a,b,c",
k_:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cw(this.b)}},
pk:{"^":"d;"},
ky:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.kz(this.a,this.b,this.c,this.d,this.e,this.f)}},
kA:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ar(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ar(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cr()}},
h2:{"^":"d;"},
ca:{"^":"h2;b,a",
E:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gf2())return
x=H.pQ(a)
if(z.gj2()===y){y=J.K(x)
switch(y.i(x,0)){case"pause":z.fm(y.i(x,1),y.i(x,2))
break
case"resume":z.k7(y.i(x,1))
break
case"add-ondone":z.iR(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.k5(y.i(x,1))
break
case"set-errors-fatal":z.hq(y.i(x,1),y.i(x,2))
break
case"ping":z.jo(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.jn(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.ao(0,y)
break}return}init.globalState.f.a.at(new H.c9(z,new H.po(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.ca&&J.i(this.b,b.b)},
gw:function(a){return this.b.gdT()}},
po:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gf2())z.hM(this.b)}},
e2:{"^":"h2;b,c,a",
E:function(a){var z,y,x
z=P.ae(["command","message","port",this,"msg",a])
y=new H.bi(!0,P.bI(null,P.u)).bb(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.e2&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eF()
y=this.a
if(typeof y!=="number")return y.eF()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
c2:{"^":"d;dT:a<,b,f2:c<",
hV:function(){this.c=!0
this.b=null},
bd:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.ao(0,y)
z.c.ao(0,y)
z.cr()},
hM:function(a){if(this.c)return
this.b.$1(a)},
$islX:1},
lY:{"^":"a7;a,b",
aw:function(a,b,c,d){var z=this.b
z.toString
return new P.cS(z,[H.m(z,0)]).aw(a,b,c,d)},
es:function(a,b,c){return this.aw(a,null,b,c)},
bd:[function(){this.a.bd()
this.b.bd()},"$0","giZ",0,0,6],
hE:function(a){var z=new P.pD(null,0,null,null,null,null,this.giZ(),[null])
this.b=z
this.a.b=z.giK(z)},
$asa7:I.b4},
nY:{"^":"d;a,b,c",
hH:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.at(new H.c9(y,new H.o_(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d1(new H.o0(this,b),0),a)}else throw H.c(new P.O("Timer greater than 0."))},
A:{
nZ:function(a,b){var z=new H.nY(!0,!1,null)
z.hH(a,b)
return z}}},
o_:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
o0:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b6:{"^":"d;dT:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.ky()
z=C.k.d2(z,0)^C.k.bD(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b6){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bi:{"^":"d;a,b",
bb:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gl(z))
z=J.n(a)
if(!!z.$iscC)return this.hm(a)
if(!!z.$isku){x=this.ghj()
z=a.gc3()
z=H.bw(z,x,H.x(z,"y",0),null)
z=P.S(z,!0,H.x(z,"y",0))
w=a.gcb()
w=H.bw(w,x,H.x(w,"y",0),null)
return["map",z,P.S(w,!0,H.x(w,"y",0))]}if(!!z.$iseU)return this.hn(a)
if(!!z.$isaO)this.h7(a)
if(!!z.$islX)this.cK(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isca)return this.ho(a)
if(!!z.$ise2)return this.hp(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cK(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb6)return["capability",a.a]
if(!(a instanceof P.d))this.h7(a)
return["dart",init.classIdExtractor(a),this.hl(init.classFieldsExtractor(a))]},"$1","ghj",2,0,0],
cK:function(a,b){throw H.c(new P.O((b==null?"Can't transmit:":b)+" "+H.b(a)))},
h7:function(a){return this.cK(a,null)},
hm:function(a){var z=this.hk(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cK(a,"Can't serialize indexable: ")},
hk:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bb(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hl:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.bb(a[z]))
return a},
hn:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cK(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bb(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hp:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ho:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdT()]
return["raw sendport",a]}},
cT:{"^":"d;a,b",
bO:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.geg(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.t(this.cu(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.cu(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cu(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.cu(x),[null])
y.fixed$length=Array
return y
case"map":return this.ja(a)
case"sendport":return this.jb(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.j9(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b6(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cu(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gj8",2,0,0],
cu:function(a){var z,y,x
z=J.K(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.m(a,y,this.bO(z.i(a,y)));++y}return a},
ja:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aR()
this.b.push(w)
y=J.er(y,this.gj8()).ca(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.m(0,y[u],this.bO(v.i(x,u)))}return w},
jb:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c5(w)
if(u==null)return
t=new H.ca(u,x)}else t=new H.e2(y,w,x)
this.b.push(t)
return t},
j9:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.i(y,u)]=this.bO(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
j8:function(){throw H.c(new P.O("Cannot modify unmodifiable Map"))},
rn:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
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
if(w==null||z===C.I||!!J.n(a).$isbg){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.ce(w,0)===36)w=C.b.bB(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d3(H.cf(a),0,null),init.mangledGlobalNames)},
cG:function(a){return"Instance of '"+H.bz(a)+"'"},
ag:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.d2(z,10))>>>0,56320|z&1023)}throw H.c(P.W(a,0,1114111,null,null))},
ba:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
lO:function(a){var z=H.ba(a).getFullYear()+0
return z},
lM:function(a){var z=H.ba(a).getMonth()+1
return z},
lI:function(a){var z=H.ba(a).getDate()+0
return z},
lJ:function(a){var z=H.ba(a).getHours()+0
return z},
lL:function(a){var z=H.ba(a).getMinutes()+0
return z},
lN:function(a){var z=H.ba(a).getSeconds()+0
return z},
lK:function(a){var z=H.ba(a).getMilliseconds()+0
return z},
dD:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
return a[b]},
fa:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
a[b]=c},
w:function(a){throw H.c(H.P(a))},
e:function(a,b){if(a==null)J.aC(a)
throw H.c(H.az(a,b))},
az:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aX(!0,b,"index",null)
z=J.aC(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.cy(b,a,"index",null,z)
return P.c1(b,"index",null)},
P:function(a){return new P.aX(!0,a,null,null)},
d_:function(a){if(typeof a!=="number")throw H.c(H.P(a))
return a},
bm:function(a){if(typeof a!=="string")throw H.c(H.P(a))
return a},
c:function(a){var z
if(a==null)a=new P.cE()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.i2})
z.name=""}else z.toString=H.i2
return z},
i2:function(){return J.h(this.dartException)},
f:function(a){throw H.c(a)},
as:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.tI(a)
if(a==null)return
if(a instanceof H.df)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.d2(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dm(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.f2(v,null))}}if(a instanceof TypeError){u=$.$get$fL()
t=$.$get$fM()
s=$.$get$fN()
r=$.$get$fO()
q=$.$get$fS()
p=$.$get$fT()
o=$.$get$fQ()
$.$get$fP()
n=$.$get$fV()
m=$.$get$fU()
l=u.bh(y)
if(l!=null)return z.$1(H.dm(y,l))
else{l=t.bh(y)
if(l!=null){l.method="call"
return z.$1(H.dm(y,l))}else{l=s.bh(y)
if(l==null){l=r.bh(y)
if(l==null){l=q.bh(y)
if(l==null){l=p.bh(y)
if(l==null){l=o.bh(y)
if(l==null){l=r.bh(y)
if(l==null){l=n.bh(y)
if(l==null){l=m.bh(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.f2(y,l==null?null:l.method))}}return z.$1(new H.o5(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fw()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aX(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fw()
return a},
A:function(a){var z
if(a instanceof H.df)return a.b
if(a==null)return new H.hb(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hb(a,null)},
rz:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.av(a)},
rf:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
rr:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cb(b,new H.rs(a))
case 1:return H.cb(b,new H.rt(a,d))
case 2:return H.cb(b,new H.ru(a,d,e))
case 3:return H.cb(b,new H.rv(a,d,e,f))
case 4:return H.cb(b,new H.rw(a,d,e,f,g))}throw H.c(P.cw("Unsupported number of arguments for wrapped closure"))},
d1:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.rr)
a.$identity=z
return z},
j4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isI){z.$reflectionInfo=c
x=H.m_(z).r}else x=c
w=d?Object.create(new H.n7().constructor.prototype):Object.create(new H.d7(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aD
$.aD=J.aj(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eB(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.rn,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.ew:H.d8
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eB(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
j1:function(a,b,c,d){var z=H.d8
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eB:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.j3(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.j1(y,!w,z,b)
if(y===0){w=$.aD
$.aD=J.aj(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.br
if(v==null){v=H.cp("self")
$.br=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aD
$.aD=J.aj(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.br
if(v==null){v=H.cp("self")
$.br=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
j2:function(a,b,c,d){var z,y
z=H.d8
y=H.ew
switch(b?-1:a){case 0:throw H.c(new H.ma("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
j3:function(a,b){var z,y,x,w,v,u,t,s
z=H.iT()
y=$.ev
if(y==null){y=H.cp("receiver")
$.ev=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.j2(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aD
$.aD=J.aj(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aD
$.aD=J.aj(u,1)
return new Function(y+H.b(u)+"}")()},
ea:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isI){c.fixed$length=Array
z=c}else z=c
return H.j4(a,b,z,!!d,e,f)},
rF:function(a,b){var z=J.K(b)
throw H.c(H.cr(H.bz(a),z.ax(b,3,z.gl(b))))},
a4:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.rF(a,b)},
ed:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
ar:function(a,b){var z
if(a==null)return!1
z=H.ed(a)
return z==null?!1:H.eg(z,b)},
hB:function(a,b){var z,y
if(a==null)return a
if(H.ar(a,b))return a
z=H.T(b,null)
y=H.ed(a)
throw H.c(H.cr(y!=null?H.T(y,null):H.bz(a),z))},
tG:function(a){throw H.c(new P.jk(a))},
d4:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b3:function(a){return new H.ao(a,null)},
t:function(a,b){a.$ti=b
return a},
cf:function(a){if(a==null)return
return a.$ti},
hG:function(a,b){return H.en(a["$as"+H.b(b)],H.cf(a))},
x:function(a,b,c){var z=H.hG(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cf(a)
return z==null?null:z[b]},
T:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d3(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.T(z,b)
return H.pV(a,b)}return"unknown-reified-type"},
pV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.T(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.T(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.T(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.re(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.T(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d3:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.v=v+", "
u=a[y]
if(u!=null)w=!1
v=z.v+=H.T(u,c)}return w?"":"<"+z.k(0)+">"},
hH:function(a){var z,y
if(a instanceof H.a){z=H.ed(a)
if(z!=null)return H.T(z,null)}y=J.n(a).constructor.builtin$cls
if(a==null)return y
return y+H.d3(a.$ti,0,null)},
en:function(a,b){if(a==null)return b
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
return H.ht(H.en(y[d],z),c)},
aB:function(a,b,c,d){if(a==null)return a
if(H.aL(a,b,c,d))return a
throw H.c(H.cr(H.bz(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d3(c,0,null),init.mangledGlobalNames)))},
ht:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aa(a[y],b[y]))return!1
return!0},
b2:function(a,b,c){return a.apply(b,H.hG(b,c))},
d0:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="am"
if(b==null)return!0
z=H.cf(a)
a=J.n(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eg(x.apply(a,null),b)}return H.aa(y,b)},
i_:function(a,b){if(a!=null&&!H.d0(a,b))throw H.c(H.cr(H.bz(a),H.T(b,null)))
return a},
aa:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="am")return!0
if('func' in b)return H.eg(a,b)
if('func' in a)return b.builtin$cls==="bu"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.T(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.ht(H.en(u,z),x)},
hs:function(a,b,c){var z,y,x,w,v
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
q4:function(a,b){var z,y,x,w,v,u
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
eg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hs(x,w,!1))return!1
if(!H.hs(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}}return H.q4(a.named,b.named)},
tB:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$iseW){z=C.b.bB(a,c)
return b.b.test(z)}else{z=z.e9(b,C.b.bB(a,c))
return!z.gK(z)}}},
o:function(a,b,c){var z,y,x
H.bm(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
ui:[function(a){return a},"$1","hf",2,0,38],
tC:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdA)throw H.c(P.cm(b,"pattern","is not a Pattern"))
for(z=z.e9(b,a),z=new H.h0(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hf().$1(C.b.ax(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hf().$1(C.b.bB(a,y)))
return z.charCodeAt(0)==0?z:z},
bP:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.tD(a,z,z+b.length,c)},
tD:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
j7:{"^":"d;$ti",
gK:function(a){return this.gl(this)===0},
gah:function(a){return this.gl(this)!==0},
k:function(a){return P.dt(this)},
m:function(a,b,c){return H.j8()},
$isD:1},
j9:{"^":"j7;a,b,c,$ti",
gl:function(a){return this.a},
a0:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a0(b))return
return this.eZ(b)},
eZ:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eZ(w))}}},
lZ:{"^":"d;a,b,c,d,e,f,r,x",A:{
m_:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.lZ(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
o2:{"^":"d;a,b,c,d,e,f",
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
return new H.o2(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cR:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fR:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
f2:{"^":"Y;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
kI:{"^":"Y;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
dm:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.kI(a,y,z?null:b.receiver)}}},
o5:{"^":"Y;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
df:{"^":"d;a,bc:b<"},
tI:{"^":"a:0;a",
$1:function(a){if(!!J.n(a).$isY)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hb:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
rs:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
rt:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ru:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
rv:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
rw:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bz(this).trim()+"'"},
ghf:function(){return this},
$isbu:1,
ghf:function(){return this}},
fH:{"^":"a;"},
n7:{"^":"fH;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d7:{"^":"fH;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d7))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.av(this.a)
else y=typeof z!=="object"?J.j(z):H.av(z)
z=H.av(this.b)
if(typeof y!=="number")return y.kz()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cG(z)},
A:{
d8:function(a){return a.a},
ew:function(a){return a.c},
iT:function(){var z=$.br
if(z==null){z=H.cp("self")
$.br=z}return z},
cp:function(a){var z,y,x,w,v
z=new H.d7("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iY:{"^":"Y;a",
k:function(a){return this.a},
A:{
cr:function(a,b){return new H.iY("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ma:{"^":"Y;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
ao:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gw:function(a){return J.j(this.a)},
u:function(a,b){if(b==null)return!1
return b instanceof H.ao&&J.i(this.a,b.a)}},
N:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gah:function(a){return!this.gK(this)},
gc3:function(){return new H.kV(this,[H.m(this,0)])},
gcb:function(){return H.bw(this.gc3(),new H.kH(this),H.m(this,0),H.m(this,1))},
a0:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eV(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eV(y,a)}else return this.jA(a)},
jA:function(a){var z=this.d
if(z==null)return!1
return this.cA(this.cZ(z,this.cz(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ci(z,b)
return y==null?null:y.gbQ()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ci(x,b)
return y==null?null:y.gbQ()}else return this.jB(b)},
jB:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cZ(z,this.cz(a))
x=this.cA(y,a)
if(x<0)return
return y[x].gbQ()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dV()
this.b=z}this.eP(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dV()
this.c=y}this.eP(y,b,c)}else this.jD(b,c)},
jD:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dV()
this.d=z}y=this.cz(a)
x=this.cZ(z,y)
if(x==null)this.e5(z,y,[this.dW(a,b)])
else{w=this.cA(x,a)
if(w>=0)x[w].sbQ(b)
else x.push(this.dW(a,b))}},
k0:function(a,b){var z
if(this.a0(a))return this.i(0,a)
z=b.$0()
this.m(0,a,z)
return z},
ao:function(a,b){if(typeof b==="string")return this.fb(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fb(this.c,b)
else return this.jC(b)},
jC:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cZ(z,this.cz(a))
x=this.cA(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fe(w)
return w.gbQ()},
aX:function(a){if(this.a>0){this.f=null
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
eP:function(a,b,c){var z=this.ci(a,b)
if(z==null)this.e5(a,b,this.dW(b,c))
else z.sbQ(c)},
fb:function(a,b){var z
if(a==null)return
z=this.ci(a,b)
if(z==null)return
this.fe(z)
this.eW(a,b)
return z.gbQ()},
dW:function(a,b){var z,y
z=new H.kU(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fe:function(a){var z,y
z=a.gio()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cz:function(a){return J.j(a)&0x3ffffff},
cA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gfF(),b))return y
return-1},
k:function(a){return P.dt(this)},
ci:function(a,b){return a[b]},
cZ:function(a,b){return a[b]},
e5:function(a,b,c){a[b]=c},
eW:function(a,b){delete a[b]},
eV:function(a,b){return this.ci(a,b)!=null},
dV:function(){var z=Object.create(null)
this.e5(z,"<non-identifier-key>",z)
this.eW(z,"<non-identifier-key>")
return z},
$isku:1,
$isD:1,
A:{
eY:function(a,b){return new H.N(0,null,null,null,null,null,0,[a,b])}}},
kH:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
kU:{"^":"d;fF:a<,bQ:b@,c,io:d<,$ti"},
kV:{"^":"U;a,$ti",
gl:function(a){return this.a.a},
gK:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.kW(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Y:function(a,b){return this.a.a0(b)},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
kW:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
eW:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
gij:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dl(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gii:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dl(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
ea:function(a,b,c){if(c>b.length)throw H.c(P.W(c,0,b.length,null,null))
return new H.oB(this,b,c)},
e9:function(a,b){return this.ea(a,b,0)},
i1:function(a,b){var z,y
z=this.gij()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.ha(this,y)},
i0:function(a,b){var z,y
z=this.gii()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.ha(this,y)},
fK:function(a,b,c){if(c>b.length)throw H.c(P.W(c,0,b.length,null,null))
return this.i0(b,c)},
$isdA:1,
A:{
dl:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eN("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
ha:{"^":"d;a,b",
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isb9:1},
oB:{"^":"cA;a,b,c",
gZ:function(a){return new H.h0(this.a,this.b,this.c,null)},
$ascA:function(){return[P.b9]},
$asy:function(){return[P.b9]}},
h0:{"^":"d;a,b,c,d",
gG:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.i1(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fC:{"^":"d;a,b,c",
i:function(a,b){if(b!==0)H.f(P.c1(b,null,null))
return this.c},
$isb9:1},
pz:{"^":"y;a,b,c",
gZ:function(a){return new H.pA(this.a,this.b,this.c,null)},
$asy:function(){return[P.b9]}},
pA:{"^":"d;a,b,c,d",
t:function(){var z,y,x,w,v,u,t
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
this.d=new H.fC(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
re:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
rE:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
oC:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.q5()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d1(new P.oE(z),1)).observe(y,{childList:true})
return new P.oD(z,y,x)}else if(self.setImmediate!=null)return P.q6()
return P.q7()},
uc:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d1(new P.oF(a),0))},"$1","q5",2,0,13],
ud:[function(a){++init.globalState.f.b
self.setImmediate(H.d1(new P.oG(a),0))},"$1","q6",2,0,13],
ue:[function(a){P.dQ(C.x,a)},"$1","q7",2,0,13],
ay:function(a,b){P.e3(null,a)
return b.gfC()},
ap:function(a,b){P.e3(a,b)},
ax:function(a,b){b.bN(a)},
aw:function(a,b){b.ed(H.z(a),H.A(a))},
e3:function(a,b){var z,y,x,w
z=new P.pK(b)
y=new P.pL(b)
x=J.n(a)
if(!!x.$isC)a.e6(z,y)
else if(!!x.$isM)a.ez(z,y)
else{w=new P.C(0,$.p,null,[null])
w.a=4
w.c=a
w.e6(z,null)}},
aq:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.q3(z)},
cW:function(a,b,c){var z,y,x
if(b===0){if(c.gel())c.c.ec()
else c.a.bd()
return}else if(b===1){if(c.gel())c.c.ed(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.e8(z,y)
c.a.bd()}return}if(a instanceof P.bG){if(c.gel()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aN(c.a,z)
P.cg(new P.pI(b,c))
return}else if(z===1){x=a.a
c.a.iU(x,!1).bS(new P.pJ(b,c))
return}}P.e3(a,b)},
q2:function(a){return a.gdE()},
e7:function(a,b){if(H.ar(a,{func:1,args:[P.am,P.am]})){b.toString
return a}else{b.toString
return a}},
au:function(a){return new P.pB(new P.C(0,$.p,null,[a]),[a])},
pT:function(a,b,c){$.p.toString
a.b1(b,c)},
pX:function(){var z,y
for(;z=$.bj,z!=null;){$.bK=null
y=z.gc6()
$.bj=y
if(y==null)$.bJ=null
z.giW().$0()}},
uh:[function(){$.e4=!0
try{P.pX()}finally{$.bK=null
$.e4=!1
if($.bj!=null)$.$get$dV().$1(P.hu())}},"$0","hu",0,0,6],
ho:function(a){var z=new P.h1(a,null)
if($.bj==null){$.bJ=z
$.bj=z
if(!$.e4)$.$get$dV().$1(P.hu())}else{$.bJ.b=z
$.bJ=z}},
q1:function(a){var z,y,x
z=$.bj
if(z==null){P.ho(a)
$.bK=$.bJ
return}y=new P.h1(a,null)
x=$.bK
if(x==null){y.b=z
$.bK=y
$.bj=y}else{y.b=x.b
x.b=y
$.bK=y
if(y.b==null)$.bJ=y}},
cg:function(a){var z=$.p
if(C.h===z){P.bl(null,null,C.h,a)
return}z.toString
P.bl(null,null,z,z.eb(a,!0))},
u9:function(a,b){return new P.py(null,a,!1,[b])},
e8:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.p
w.toString
P.bk(null,null,w,z,y)}},
pY:[function(a,b){var z=$.p
z.toString
P.bk(null,null,z,a,b)},function(a){return P.pY(a,null)},"$2","$1","q9",2,2,14,0],
ug:[function(){},"$0","q8",0,0,6],
hn:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbe()
w=t
v=x.gbc()
c.$2(w,v)}}},
pM:function(a,b,c,d){var z=a.c2()
if(!!J.n(z).$isM&&z!==$.$get$b7())z.bU(new P.pO(b,c,d))
else b.b1(c,d)},
hc:function(a,b){return new P.pN(a,b)},
hd:function(a,b,c){var z=a.c2()
if(!!J.n(z).$isM&&z!==$.$get$b7())z.bU(new P.pP(b,c))
else b.b0(c)},
pH:function(a,b,c){$.p.toString
a.c_(b,c)},
o1:function(a,b){var z=$.p
if(z===C.h){z.toString
return P.dQ(a,b)}return P.dQ(a,z.eb(b,!0))},
dQ:function(a,b){var z=C.d.bD(a.a,1000)
return H.nZ(z<0?0:z,b)},
of:function(){return $.p},
bk:function(a,b,c,d,e){var z={}
z.a=d
P.q1(new P.q_(z,e))},
hk:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hm:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hl:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bl:function(a,b,c,d){var z=C.h!==c
if(z)d=c.eb(d,!(!z||!1))
P.ho(d)},
oE:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
oD:{"^":"a:44;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
oF:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
oG:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pK:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
pL:{"^":"a:19;a",
$2:function(a,b){this.a.$2(1,new H.df(a,b))}},
q3:{"^":"a:29;a",
$2:function(a,b){this.a(a,b)}},
pI:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcB()){z.b=!0
return}this.a.$2(null,0)}},
pJ:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
oH:{"^":"d;a,b,c",
gdE:function(){return this.a.gdE()},
gcB:function(){return this.a.gcB()},
gel:function(){return this.c!=null},
q:function(a,b){return J.aN(this.a,b)},
e8:function(a,b){return this.a.e8(a,b)},
bd:function(){return this.a.bd()},
hJ:function(a){var z=new P.oK(a)
this.a=new P.oP(null,0,null,new P.oM(z),null,new P.oN(this,z),new P.oO(this,a),[null])},
A:{
oI:function(a){var z=new P.oH(null,!1,null)
z.hJ(a)
return z}}},
oK:{"^":"a:1;a",
$0:function(){P.cg(new P.oL(this.a))}},
oL:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
oM:{"^":"a:1;a",
$0:function(){this.a.$0()}},
oN:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
oO:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjH()){z.c=new P.c7(new P.C(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cg(new P.oJ(this.b))}return z.c.gfC()}}},
oJ:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bG:{"^":"d;ae:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bH:function(a){return new P.bG(a,1)},
aI:function(){return C.a8},
h6:function(a){return new P.bG(a,0)},
aJ:function(a){return new P.bG(a,3)}}},
b1:{"^":"d;a,b,c,d",
gG:function(){var z=this.c
return z==null?this.b:z.gG()},
t:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.t())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bG){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ak(z)
if(!!w.$isb1){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
pC:{"^":"cA;a",
gZ:function(a){return new P.b1(this.a(),null,null,null)},
$ascA:I.b4,
$asy:I.b4,
A:{
aK:function(a){return new P.pC(a)}}},
M:{"^":"d;$ti"},
h3:{"^":"d;fC:a<,$ti",
ed:function(a,b){if(a==null)a=new P.cE()
if(this.a.a!==0)throw H.c(new P.E("Future already completed"))
$.p.toString
this.b1(a,b)},
d7:function(a){return this.ed(a,null)}},
c7:{"^":"h3;a,$ti",
bN:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.bn(a)},
ec:function(){return this.bN(null)},
b1:function(a,b){this.a.eR(a,b)}},
pB:{"^":"h3;a,$ti",
bN:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.b0(a)},
ec:function(){return this.bN(null)},
b1:function(a,b){this.a.b1(a,b)}},
e_:{"^":"d;dY:a<,b,c,d,e,$ti",
giF:function(){return this.b.b},
gfE:function(){return(this.c&1)!==0},
gjs:function(){return(this.c&2)!==0},
gfD:function(){return this.c===8},
jq:function(a){return this.b.b.ey(this.d,a)},
jQ:function(a){if(this.c!==6)return!0
return this.b.b.ey(this.d,a.gbe())},
jm:function(a){var z,y
z=this.e
y=this.b.b
if(H.ar(z,{func:1,args:[,,]}))return y.kh(z,a.gbe(),a.gbc())
else return y.ey(z,a.gbe())},
jr:function(){return this.b.b.h1(this.d)}},
C:{"^":"d;cp:a<,b,it:c<,$ti",
gib:function(){return this.a===2},
gdU:function(){return this.a>=4},
ez:function(a,b){var z=$.p
if(z!==C.h){z.toString
if(b!=null)b=P.e7(b,z)}return this.e6(a,b)},
bS:function(a){return this.ez(a,null)},
e6:function(a,b){var z,y
z=new P.C(0,$.p,null,[null])
y=b==null?1:3
this.cU(new P.e_(null,z,y,a,b,[H.m(this,0),null]))
return z},
bU:function(a){var z,y
z=$.p
y=new P.C(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.cU(new P.e_(null,y,8,a,null,[z,z]))
return y},
cU:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdU()){y.cU(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bl(null,null,z,new P.oZ(this,a))}},
f7:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdY()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdU()){v.f7(a)
return}this.a=v.a
this.c=v.c}z.a=this.d0(a)
y=this.b
y.toString
P.bl(null,null,y,new P.p5(z,this))}},
d_:function(){var z=this.c
this.c=null
return this.d0(z)},
d0:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdY()
z.a=y}return y},
b0:function(a){var z,y
z=this.$ti
if(H.aL(a,"$isM",z,"$asM"))if(H.aL(a,"$isC",z,null))P.cU(a,this)
else P.h5(a,this)
else{y=this.d_()
this.a=4
this.c=a
P.bh(this,y)}},
b1:[function(a,b){var z=this.d_()
this.a=8
this.c=new P.cn(a,b)
P.bh(this,z)},function(a){return this.b1(a,null)},"kA","$2","$1","gbJ",2,2,14,0],
bn:function(a){var z
if(H.aL(a,"$isM",this.$ti,"$asM")){this.hS(a)
return}this.a=1
z=this.b
z.toString
P.bl(null,null,z,new P.p0(this,a))},
hS:function(a){var z
if(H.aL(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bl(null,null,z,new P.p4(this,a))}else P.cU(a,this)
return}P.h5(a,this)},
eR:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bl(null,null,z,new P.p_(this,a,b))},
hL:function(a,b){this.a=4
this.c=a},
$isM:1,
A:{
h5:function(a,b){var z,y,x
b.a=1
try{a.ez(new P.p1(b),new P.p2(b))}catch(x){z=H.z(x)
y=H.A(x)
P.cg(new P.p3(b,z,y))}},
cU:function(a,b){var z,y,x
for(;a.gib();)a=a.c
z=a.gdU()
y=b.c
if(z){b.c=null
x=b.d0(y)
b.a=a.a
b.c=a.c
P.bh(b,x)}else{b.a=2
b.c=a
a.f7(y)}},
bh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbe()
t=v.gbc()
y.toString
P.bk(null,null,y,u,t)}return}for(;b.gdY()!=null;b=s){s=b.a
b.a=null
P.bh(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfE()||b.gfD()){q=b.giF()
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
P.bk(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfD())new P.p8(z,x,w,b).$0()
else if(y){if(b.gfE())new P.p7(x,b,r).$0()}else if(b.gjs())new P.p6(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.n(y).$isM){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.d0(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cU(y,o)
return}}o=b.b
b=o.d_()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
oZ:{"^":"a:1;a,b",
$0:function(){P.bh(this.a,this.b)}},
p5:{"^":"a:1;a,b",
$0:function(){P.bh(this.b,this.a.a)}},
p1:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b0(a)}},
p2:{"^":"a:49;a",
$2:function(a,b){this.a.b1(a,b)},
$1:function(a){return this.$2(a,null)}},
p3:{"^":"a:1;a,b,c",
$0:function(){this.a.b1(this.b,this.c)}},
p0:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.d_()
z.a=4
z.c=this.b
P.bh(z,y)}},
p4:{"^":"a:1;a,b",
$0:function(){P.cU(this.b,this.a)}},
p_:{"^":"a:1;a,b,c",
$0:function(){this.a.b1(this.b,this.c)}},
p8:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jr()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbe()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cn(y,x)
u.a=!0
return}if(!!J.n(z).$isM){if(z instanceof P.C&&z.gcp()>=4){if(z.gcp()===8){v=this.b
v.b=z.git()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bS(new P.p9(t))
v.a=!1}}},
p9:{"^":"a:0;a",
$1:function(a){return this.a}},
p7:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jq(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cn(z,y)
w.a=!0}}},
p6:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jQ(z)===!0&&w.e!=null){v=this.b
v.b=w.jm(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbe()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cn(y,x)
s.a=!0}}},
h1:{"^":"d;iW:a<,c6:b@"},
a7:{"^":"d;$ti",
aY:function(a,b){return new P.pn(b,this,[H.x(this,"a7",0),null])},
Y:function(a,b){var z,y
z={}
y=new P.C(0,$.p,null,[P.X])
z.a=null
z.a=this.aw(new P.nh(z,this,b,y),!0,new P.ni(y),y.gbJ())
return y},
L:function(a,b){var z,y
z={}
y=new P.C(0,$.p,null,[null])
z.a=null
z.a=this.aw(new P.nl(z,this,b,y),!0,new P.nm(y),y.gbJ())
return y},
gl:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[P.u])
z.a=0
this.aw(new P.nr(z),!0,new P.ns(z,y),y.gbJ())
return y},
gK:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[P.X])
z.a=null
z.a=this.aw(new P.nn(z,y),!0,new P.no(y),y.gbJ())
return y},
ca:function(a){var z,y,x
z=H.x(this,"a7",0)
y=H.t([],[z])
x=new P.C(0,$.p,null,[[P.I,z]])
this.aw(new P.nt(this,y),!0,new P.nu(y,x),x.gbJ())
return x},
bx:function(a){var z,y,x
z=H.x(this,"a7",0)
y=P.V(null,null,null,z)
x=new P.C(0,$.p,null,[[P.bA,z]])
this.aw(new P.nv(this,y),!0,new P.nw(y,x),x.gbJ())
return x},
gB:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[H.x(this,"a7",0)])
z.a=null
z.b=!1
this.aw(new P.np(z,this),!0,new P.nq(z,y),y.gbJ())
return y}},
nh:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hn(new P.nf(this.c,a),new P.ng(z,y),P.hc(z.a,y))},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"a7")}},
nf:{"^":"a:1;a,b",
$0:function(){return J.i(this.b,this.a)}},
ng:{"^":"a:51;a,b",
$1:function(a){if(a===!0)P.hd(this.a.a,this.b,!0)}},
ni:{"^":"a:1;a",
$0:function(){this.a.b0(!1)}},
nl:{"^":"a;a,b,c,d",
$1:function(a){P.hn(new P.nj(this.c,a),new P.nk(),P.hc(this.a.a,this.d))},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"a7")}},
nj:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
nk:{"^":"a:0;",
$1:function(a){}},
nm:{"^":"a:1;a",
$0:function(){this.a.b0(null)}},
nr:{"^":"a:0;a",
$1:function(a){++this.a.a}},
ns:{"^":"a:1;a,b",
$0:function(){this.b.b0(this.a.a)}},
nn:{"^":"a:0;a,b",
$1:function(a){P.hd(this.a.a,this.b,!1)}},
no:{"^":"a:1;a",
$0:function(){this.a.b0(!0)}},
nt:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.a,"a7")}},
nu:{"^":"a:1;a,b",
$0:function(){this.b.b0(this.a)}},
nv:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.a,"a7")}},
nw:{"^":"a:1;a,b",
$0:function(){this.b.b0(this.a)}},
np:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"a7")}},
nq:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b0(x.a)
return}try{x=H.ad()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.pT(this.b,z,y)}}},
cV:{"^":"d;cp:b<,$ti",
gdE:function(){return new P.cS(this,this.$ti)},
gjH:function(){return(this.b&4)!==0},
gcB:function(){var z=this.b
return(z&1)!==0?this.gbC().gf3():(z&2)===0},
gil:function(){if((this.b&8)===0)return this.a
return this.a.gcM()},
dN:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e1(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcM()==null)y.c=new P.e1(null,null,0,this.$ti)
return y.c},
gbC:function(){if((this.b&8)!==0)return this.a.gcM()
return this.a},
cd:function(){if((this.b&4)!==0)return new P.E("Cannot add event after closing")
return new P.E("Cannot add event while adding a stream")},
iU:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cd())
if((z&2)!==0){z=new P.C(0,$.p,null,[null])
z.bn(null)
return z}z=this.a
y=new P.C(0,$.p,null,[null])
x=a.aw(this.ghQ(),!1,this.ghR(),this.ghN())
w=this.b
if((w&1)!==0?this.gbC().gf3():(w&2)===0)x.cE()
this.a=new P.pu(z,y,x,this.$ti)
this.b|=8
return y},
eY:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b7():new P.C(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cd())
this.bI(b)},"$1","giK",2,0,function(){return H.b2(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cV")}],
e8:function(a,b){if(this.b>=4)throw H.c(this.cd())
if(a==null)a=new P.cE()
$.p.toString
this.c_(a,b)},
bd:function(){var z=this.b
if((z&4)!==0)return this.eY()
if(z>=4)throw H.c(this.cd())
z|=4
this.b=z
if((z&1)!==0)this.cn()
else if((z&3)===0)this.dN().q(0,C.v)
return this.eY()},
bI:[function(a){var z=this.b
if((z&1)!==0)this.cm(a)
else if((z&3)===0)this.dN().q(0,new P.dW(a,null,this.$ti))},"$1","ghQ",2,0,function(){return H.b2(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cV")}],
c_:[function(a,b){var z=this.b
if((z&1)!==0)this.co(a,b)
else if((z&3)===0)this.dN().q(0,new P.dX(a,b,null))},"$2","ghN",4,0,48],
dH:[function(){var z=this.a
this.a=z.gcM()
this.b&=4294967287
z.a.bn(null)},"$0","ghR",0,0,6],
iA:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.E("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.oT(this,null,null,null,z,y,null,null,this.$ti)
x.eO(a,b,c,d,H.m(this,0))
w=this.gil()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scM(x)
v.b.cH()}else this.a=x
x.iy(w)
x.dS(new P.pw(this))
return x},
iq:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c2()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.C(0,$.p,null,[null])
u.eR(y,x)
z=u}else z=z.bU(w)
w=new P.pv(this)
if(z!=null)z=z.bU(w)
else w.$0()
return z}},
pw:{"^":"a:1;a",
$0:function(){P.e8(this.a.d)}},
pv:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bn(null)}},
pE:{"^":"d;$ti",
cm:function(a){this.gbC().bI(a)},
co:function(a,b){this.gbC().c_(a,b)},
cn:function(){this.gbC().dH()}},
oQ:{"^":"d;$ti",
cm:function(a){this.gbC().c0(new P.dW(a,null,[H.m(this,0)]))},
co:function(a,b){this.gbC().c0(new P.dX(a,b,null))},
cn:function(){this.gbC().c0(C.v)}},
oP:{"^":"cV+oQ;a,b,c,d,e,f,r,$ti"},
pD:{"^":"cV+pE;a,b,c,d,e,f,r,$ti"},
cS:{"^":"px;a,$ti",
gw:function(a){return(H.av(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cS))return!1
return b.a===this.a}},
oT:{"^":"c8;x,a,b,c,d,e,f,r,$ti",
dZ:function(){return this.x.iq(this)},
e0:[function(){var z=this.x
if((z.b&8)!==0)z.a.cE()
P.e8(z.e)},"$0","ge_",0,0,6],
e2:[function(){var z=this.x
if((z.b&8)!==0)z.a.cH()
P.e8(z.f)},"$0","ge1",0,0,6]},
oz:{"^":"d;$ti",
cE:function(){this.b.cE()},
cH:function(){this.b.cH()},
c2:function(){var z=this.b.c2()
if(z==null){this.a.bn(null)
return}return z.bU(new P.oA(this))},
ec:function(){this.a.bn(null)}},
oA:{"^":"a:1;a",
$0:function(){this.a.a.bn(null)}},
pu:{"^":"oz;cM:c@,a,b,$ti"},
c8:{"^":"d;cp:e<,$ti",
iy:function(a){if(a==null)return
this.r=a
if(!a.gK(a)){this.e=(this.e|64)>>>0
this.r.cP(this)}},
jW:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fn()
if((z&4)===0&&(this.e&32)===0)this.dS(this.ge_())},
cE:function(){return this.jW(null)},
cH:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.cP(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dS(this.ge1())}}}},
c2:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dI()
z=this.f
return z==null?$.$get$b7():z},
gf3:function(){return(this.e&4)!==0},
gcB:function(){return this.e>=128},
dI:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fn()
if((this.e&32)===0)this.r=null
this.f=this.dZ()},
bI:["hz",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cm(a)
else this.c0(new P.dW(a,null,[H.x(this,"c8",0)]))}],
c_:["hA",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.co(a,b)
else this.c0(new P.dX(a,b,null))}],
dH:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cn()
else this.c0(C.v)},
e0:[function(){},"$0","ge_",0,0,6],
e2:[function(){},"$0","ge1",0,0,6],
dZ:function(){return},
c0:function(a){var z,y
z=this.r
if(z==null){z=new P.e1(null,null,0,[H.x(this,"c8",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cP(this)}},
cm:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.h4(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dK((z&4)!==0)},
co:function(a,b){var z,y
z=this.e
y=new P.oS(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dI()
z=this.f
if(!!J.n(z).$isM&&z!==$.$get$b7())z.bU(y)
else y.$0()}else{y.$0()
this.dK((z&4)!==0)}},
cn:function(){var z,y
z=new P.oR(this)
this.dI()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isM&&y!==$.$get$b7())y.bU(z)
else z.$0()},
dS:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dK((z&4)!==0)},
dK:function(a){var z,y
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
if(y)this.e0()
else this.e2()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cP(this)},
eO:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.e7(b==null?P.q9():b,z)
this.c=c==null?P.q8():c}},
oS:{"^":"a:6;a,b,c",
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
if(x)w.ki(u,v,this.c)
else w.h4(u,v)
z.e=(z.e&4294967263)>>>0}},
oR:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.h2(z.c)
z.e=(z.e&4294967263)>>>0}},
px:{"^":"a7;$ti",
aw:function(a,b,c,d){return this.a.iA(a,d,c,!0===b)},
es:function(a,b,c){return this.aw(a,null,b,c)}},
dY:{"^":"d;c6:a@,$ti"},
dW:{"^":"dY;ae:b<,a,$ti",
eu:function(a){a.cm(this.b)}},
dX:{"^":"dY;be:b<,bc:c<,a",
eu:function(a){a.co(this.b,this.c)},
$asdY:I.b4},
oU:{"^":"d;",
eu:function(a){a.cn()},
gc6:function(){return},
sc6:function(a){throw H.c(new P.E("No events after a done."))}},
pp:{"^":"d;cp:a<,$ti",
cP:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cg(new P.pq(this,a))
this.a=1},
fn:function(){if(this.a===1)this.a=3}},
pq:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc6()
z.b=w
if(w==null)z.c=null
x.eu(this.b)}},
e1:{"^":"pp;b,c,a,$ti",
gK:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc6(b)
this.c=b}}},
py:{"^":"d;a,b,c,$ti"},
pO:{"^":"a:1;a,b,c",
$0:function(){return this.a.b1(this.b,this.c)}},
pN:{"^":"a:19;a,b",
$2:function(a,b){P.pM(this.a,this.b,a,b)}},
pP:{"^":"a:1;a,b",
$0:function(){return this.a.b0(this.b)}},
dZ:{"^":"a7;$ti",
aw:function(a,b,c,d){return this.hZ(a,d,c,!0===b)},
es:function(a,b,c){return this.aw(a,null,b,c)},
hZ:function(a,b,c,d){return P.oY(this,a,b,c,d,H.x(this,"dZ",0),H.x(this,"dZ",1))},
f0:function(a,b){b.bI(a)},
i9:function(a,b,c){c.c_(a,b)},
$asa7:function(a,b){return[b]}},
h4:{"^":"c8;x,y,a,b,c,d,e,f,r,$ti",
bI:function(a){if((this.e&2)!==0)return
this.hz(a)},
c_:function(a,b){if((this.e&2)!==0)return
this.hA(a,b)},
e0:[function(){var z=this.y
if(z==null)return
z.cE()},"$0","ge_",0,0,6],
e2:[function(){var z=this.y
if(z==null)return
z.cH()},"$0","ge1",0,0,6],
dZ:function(){var z=this.y
if(z!=null){this.y=null
return z.c2()}return},
kC:[function(a){this.x.f0(a,this)},"$1","gi6",2,0,function(){return H.b2(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"h4")}],
kE:[function(a,b){this.x.i9(a,b,this)},"$2","gi8",4,0,45],
kD:[function(){this.dH()},"$0","gi7",0,0,6],
hK:function(a,b,c,d,e,f,g){this.y=this.x.a.es(this.gi6(),this.gi7(),this.gi8())},
$asc8:function(a,b){return[b]},
A:{
oY:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.h4(a,null,null,null,null,z,y,null,null,[f,g])
y.eO(b,c,d,e,g)
y.hK(a,b,c,d,e,f,g)
return y}}},
pn:{"^":"dZ;b,a,$ti",
f0:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.pH(b,y,x)
return}b.bI(z)}},
cn:{"^":"d;be:a<,bc:b<",
k:function(a){return H.b(this.a)},
$isY:1},
pG:{"^":"d;"},
q_:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cE()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
pr:{"^":"pG;",
h2:function(a){var z,y,x,w
try{if(C.h===$.p){x=a.$0()
return x}x=P.hk(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bk(null,null,this,z,y)
return x}},
h4:function(a,b){var z,y,x,w
try{if(C.h===$.p){x=a.$1(b)
return x}x=P.hm(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bk(null,null,this,z,y)
return x}},
ki:function(a,b,c){var z,y,x,w
try{if(C.h===$.p){x=a.$2(b,c)
return x}x=P.hl(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bk(null,null,this,z,y)
return x}},
eb:function(a,b){if(b)return new P.ps(this,a)
else return new P.pt(this,a)},
i:function(a,b){return},
h1:function(a){if($.p===C.h)return a.$0()
return P.hk(null,null,this,a)},
ey:function(a,b){if($.p===C.h)return a.$1(b)
return P.hm(null,null,this,a,b)},
kh:function(a,b,c){if($.p===C.h)return a.$2(b,c)
return P.hl(null,null,this,a,b,c)}},
ps:{"^":"a:1;a,b",
$0:function(){return this.a.h2(this.b)}},
pt:{"^":"a:1;a,b",
$0:function(){return this.a.h1(this.b)}}}],["","",,P,{"^":"",
dp:function(a,b){return new H.N(0,null,null,null,null,null,0,[a,b])},
aR:function(){return new H.N(0,null,null,null,null,null,0,[null,null])},
ae:function(a){return H.rf(a,new H.N(0,null,null,null,null,null,0,[null,null]))},
kE:function(a,b,c){var z,y
if(P.e5(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bL()
y.push(a)
try{P.pW(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fB(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bW:function(a,b,c){var z,y,x
if(P.e5(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$bL()
y.push(a)
try{x=z
x.v=P.fB(x.gv(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.v=y.gv()+c
y=z.gv()
return y.charCodeAt(0)==0?y:y},
e5:function(a){var z,y
for(z=0;y=$.$get$bL(),z<y.length;++z)if(a===y[z])return!0
return!1},
pW:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gZ(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gG();++x
if(!z.t()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.t();t=s,s=r){r=z.gG();++x
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
kX:function(a,b,c,d,e){return new H.N(0,null,null,null,null,null,0,[d,e])},
c_:function(a,b,c){var z=P.kX(null,null,null,b,c)
a.L(0,new P.qa(z))
return z},
V:function(a,b,c,d){return new P.h7(0,null,null,null,null,null,0,[d])},
aZ:function(a,b){var z,y
z=P.V(null,null,null,b)
for(y=J.ak(a);y.t();)z.q(0,y.gG())
return z},
dt:function(a){var z,y,x
z={}
if(P.e5(a))return"{...}"
y=new P.bF("")
try{$.$get$bL().push(a)
x=y
x.v=x.gv()+"{"
z.a=!0
a.L(0,new P.l4(z,y))
z=y
z.v=z.gv()+"}"}finally{z=$.$get$bL()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gv()
return z.charCodeAt(0)==0?z:z},
h8:{"^":"N;a,b,c,d,e,f,r,$ti",
cz:function(a){return H.rz(a)&0x3ffffff},
cA:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfF()
if(x==null?b==null:x===b)return y}return-1},
A:{
bI:function(a,b){return new P.h8(0,null,null,null,null,null,0,[a,b])}}},
h7:{"^":"pa;a,b,c,d,e,f,r,$ti",
dX:function(){return new P.h7(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.a8(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gah:function(a){return this.a!==0},
Y:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hX(b)},
hX:function(a){var z=this.d
if(z==null)return!1
return this.cX(z[this.cW(a)],a)>=0},
c5:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.Y(0,a)?a:null
else return this.ie(a)},
ie:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cW(a)]
x=this.cX(y,a)
if(x<0)return
return J.at(y,x).geX()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gB:function(a){var z=this.f
if(z==null)throw H.c(new P.E("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eS(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eS(x,b)}else return this.at(b)},
at:function(a){var z,y,x
z=this.d
if(z==null){z=P.pj()
this.d=z}y=this.cW(a)
x=z[y]
if(x==null)z[y]=[this.dL(a)]
else{if(this.cX(x,a)>=0)return!1
x.push(this.dL(a))}return!0},
ao:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eT(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eT(this.c,b)
else return this.ir(b)},
ir:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cW(a)]
x=this.cX(y,a)
if(x<0)return!1
this.eU(y.splice(x,1)[0])
return!0},
i3:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.ao(0,y)}},
aX:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eS:function(a,b){if(a[b]!=null)return!1
a[b]=this.dL(b)
return!0},
eT:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eU(z)
delete a[b]
return!0},
dL:function(a){var z,y
z=new P.pi(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eU:function(a){var z,y
z=a.ghW()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cW:function(a){return J.j(a)&0x3ffffff},
cX:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].geX(),b))return y
return-1},
$isbA:1,
$isU:1,
A:{
pj:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
pi:{"^":"d;eX:a<,b,hW:c<"},
a8:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
pa:{"^":"mG;$ti",
bx:function(a){var z=this.dX()
z.ap(0,this)
return z}},
cA:{"^":"y;$ti"},
qa:{"^":"a:7;a",
$2:function(a,b){this.a.m(0,a,b)}},
eZ:{"^":"f3;$ti"},
f3:{"^":"d+b_;$ti",$asI:null,$asU:null,$isI:1,$isU:1},
b_:{"^":"d;$ti",
gZ:function(a){return new H.dq(this,this.gl(this),0,null,[H.x(this,"b_",0)])},
al:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gah:function(a){return!this.gK(this)},
gB:function(a){if(this.gl(this)===0)throw H.c(H.ad())
return this.i(0,this.gl(this)-1)},
Y:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.i(this.i(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bM:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aY:function(a,b){return new H.al(this,b,[H.x(this,"b_",0),null])},
dC:function(a,b){return H.fD(this,b,null,H.x(this,"b_",0))},
bx:function(a){var z,y
z=P.V(null,null,null,H.x(this,"b_",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.i(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.m(0,z,b)},
ao:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.i(this.i(0,z),b)){this.aP(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
i2:function(a,b){var z,y,x,w
z=H.t([],[H.x(this,"b_",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.i(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hr(0,0,z.length,z)
this.sl(0,z.length)}},
aP:function(a,b,c,d,e){var z,y,x,w,v
P.cJ(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aL(d,"$isI",[H.x(this,"b_",0)],"$asI")){y=e
x=d}else{x=J.ii(d,e).bw(0,!1)
y=0}w=J.K(x)
if(y+z>w.gl(x))throw H.c(H.eQ())
if(y<b)for(v=z-1;v>=0;--v)this.m(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.m(0,b+v,w.i(x,y+v))},
hr:function(a,b,c,d){return this.aP(a,b,c,d,0)},
k:function(a){return P.bW(this,"[","]")},
$isI:1,
$isU:1},
pF:{"^":"d;$ti",
m:function(a,b,c){throw H.c(new P.O("Cannot modify unmodifiable map"))},
$isD:1},
l2:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){this.a.m(0,b,c)},
a0:function(a){return this.a.a0(a)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gah:function(a){var z=this.a
return z.gah(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isD:1},
fZ:{"^":"l2+pF;a,$ti",$asD:null,$isD:1},
l4:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.v+=", "
z.a=!1
z=this.b
y=z.v+=H.b(a)
z.v=y+": "
z.v+=H.b(b)}},
kY:{"^":"aS;a,b,c,d,$ti",
gZ:function(a){return new P.h9(this,this.c,this.d,this.b,null,this.$ti)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.f(new P.B(this))}},
gK:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gB:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ad())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
al:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.f(P.cy(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.at(b)},
ap:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aL(b,"$isI",z,"$asI")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.kZ(w+(w>>>1))
if(typeof t!=="number")return H.w(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.iE(s)
this.a=s
this.b=0
C.a.aP(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aP(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aP(v,z,z+r,b,0)
C.a.aP(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.h9(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.at(z.e)},
aX:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bW(this,"{","}")},
fl:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.f_();++this.d},
dg:function(){var z,y,x,w
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
if(this.b===x)this.f_();++this.d},
f_:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aP(y,0,w,z,x)
C.a.aP(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iE:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aP(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aP(a,0,v,x,z)
C.a.aP(a,v,v+this.c,this.a,0)
return this.c+v}},
hC:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
A:{
b0:function(a,b){var z=new P.kY(null,0,0,0,[b])
z.hC(a,b)
return z},
kZ:function(a){var z
a=C.u.eF(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
h9:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.f(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
mH:{"^":"d;$ti",
gK:function(a){return this.a===0},
gah:function(a){return this.a!==0},
ap:function(a,b){var z
for(z=J.ak(b);z.t();)this.q(0,z.gG())},
j1:function(a){var z,y
for(z=a.a,y=new P.a8(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.Y(0,y.d))return!1
return!0},
bw:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.a8(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
ca:function(a){return this.bw(a,!0)},
aY:function(a,b){return new H.bs(this,b,[H.m(this,0),null])},
k:function(a){return P.bW(this,"{","}")},
L:function(a,b){var z
for(z=new P.a8(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bg:function(a,b,c){var z,y
for(z=new P.a8(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gB:function(a){var z,y
z=new P.a8(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.ad())
do y=z.d
while(z.t())
return y},
bf:function(a,b,c){var z,y
for(z=new P.a8(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
aI:function(a,b){var z,y,x,w
for(z=new P.a8(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dj())
y=w
x=!0}}if(x)return y
throw H.c(H.ad())},
$isbA:1,
$isU:1},
mG:{"^":"mH;$ti"}}],["","",,P,{"^":"",
cX:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.pd(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cX(a[z])
return a},
pZ:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.P(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eN(w,null,null))}w=P.cX(z)
return w},
uf:[function(a){return a.dk()},"$1","r5",2,0,0],
pd:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.ip(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cf().length
return z},
gK:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cf().length
return z===0},
gah:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cf().length
return z>0},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a0(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iC().m(0,b,c)},
a0:function(a){if(this.b==null)return this.c.a0(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.cf()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cX(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dt(this)},
cf:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iC:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dp(P.q,null)
y=this.cf()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
ip:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cX(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:function(){return[P.q,null]}},
eC:{"^":"d;$ti"},
ct:{"^":"d;$ti"},
dn:{"^":"Y;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
kK:{"^":"dn;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
kJ:{"^":"eC;a,b",
j5:function(a,b){var z=P.pZ(a,this.gj6().a)
return z},
j4:function(a){return this.j5(a,null)},
je:function(a,b){var z=this.gjf()
z=P.pf(a,z.b,z.a)
return z},
fv:function(a){return this.je(a,null)},
gjf:function(){return C.N},
gj6:function(){return C.M},
$aseC:function(){return[P.d,P.q]}},
kM:{"^":"ct;a,b",
$asct:function(){return[P.d,P.q]}},
kL:{"^":"ct;a",
$asct:function(){return[P.q,P.d]}},
pg:{"^":"d;",
he:function(a){var z,y,x,w,v,u,t
z=J.K(a)
y=z.gl(a)
if(typeof y!=="number")return H.w(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.ct(a,v)
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
dJ:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.kK(a,null))}z.push(a)},
dq:function(a){var z,y,x,w
if(this.hd(a))return
this.dJ(a)
try{z=this.b.$1(a)
if(!this.hd(z))throw H.c(new P.dn(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dn(a,y))}},
hd:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.v+=C.k.k(a)
return!0}else if(a===!0){this.c.v+="true"
return!0}else if(a===!1){this.c.v+="false"
return!0}else if(a==null){this.c.v+="null"
return!0}else if(typeof a==="string"){z=this.c
z.v+='"'
this.he(a)
z.v+='"'
return!0}else{z=J.n(a)
if(!!z.$isI){this.dJ(a)
this.kv(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.dJ(a)
y=this.kw(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kv:function(a){var z,y,x
z=this.c
z.v+="["
y=J.K(a)
if(y.gl(a)>0){this.dq(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.v+=","
this.dq(y.i(a,x))}}z.v+="]"},
kw:function(a){var z,y,x,w,v,u,t
z={}
if(a.gK(a)){this.c.v+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.ph(z,x))
if(!z.b)return!1
w=this.c
w.v+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.v+=v
this.he(x[u])
w.v+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dq(x[t])}w.v+="}"
return!0}},
ph:{"^":"a:7;a,b",
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
pe:{"^":"pg;c,a,b",A:{
pf:function(a,b,c){var z,y,x
z=new P.bF("")
y=new P.pe(z,[],P.r5())
y.dq(a)
x=z.v
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
tM:[function(a,b){return J.ci(a,b)},"$2","r6",4,0,40],
eI:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.jZ(a)},
jZ:function(a){var z=J.n(a)
if(!!z.$isa)return z.k(a)
return H.cG(a)},
cw:function(a){return new P.oX(a)},
S:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.ak(a);y.t();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
l_:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bv:function(a,b){var z=P.S(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ei:function(a){H.rE(H.b(a))},
bc:function(a,b,c){return new H.eW(a,H.dl(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
cu:{"^":"d;iD:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cu))return!1
return this.a===b.a&&!0},
bq:function(a,b){return C.d.bq(this.a,b.giD())},
gw:function(a){var z=this.a
return(z^C.d.d2(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.jl(H.lO(this))
y=P.bT(H.lM(this))
x=P.bT(H.lI(this))
w=P.bT(H.lJ(this))
v=P.bT(H.lL(this))
u=P.bT(H.lN(this))
t=P.jm(H.lK(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjw()
y=new P.cu(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.f(P.G(y.gjR()))
return y},
gjR:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.cu]},
A:{
jl:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jm:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bT:function(a){if(a>=10)return""+a
return"0"+a}}},
aM:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+double":0,
aY:{"^":"d;bK:a<",
a4:function(a,b){return new P.aY(this.a+b.gbK())},
aJ:function(a,b){return new P.aY(this.a-b.gbK())},
bX:function(a,b){if(typeof b!=="number")return H.w(b)
return new P.aY(C.k.h0(this.a*b))},
aH:function(a,b){return C.d.aH(this.a,b.gbK())},
bA:function(a,b){return this.a>b.gbK()},
bW:function(a,b){return C.d.bW(this.a,b.gbK())},
bG:function(a,b){return C.d.bG(this.a,b.gbK())},
gjw:function(){return C.d.bD(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.aY))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
bq:function(a,b){return C.d.bq(this.a,b.gbK())},
k:function(a){var z,y,x,w,v
z=new P.jH()
y=this.a
if(y<0)return"-"+new P.aY(0-y).k(0)
x=z.$1(C.d.bD(y,6e7)%60)
w=z.$1(C.d.bD(y,1e6)%60)
v=new P.jG().$1(y%1e6)
return""+C.d.bD(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eE:function(a){return new P.aY(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aY]}},
jG:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
jH:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Y:{"^":"d;",
gbc:function(){return H.A(this.$thrownJsError)}},
cE:{"^":"Y;",
k:function(a){return"Throw of null."}},
aX:{"^":"Y;a,b,h:c<,d",
gdP:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdO:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdP()+y+x
if(!this.a)return w
v=this.gdO()
u=P.eI(this.b)
return w+v+": "+H.b(u)},
A:{
G:function(a){return new P.aX(!1,null,null,a)},
cm:function(a,b,c){return new P.aX(!0,a,b,c)},
l:function(a){return new P.aX(!1,null,a,"Must not be null")}}},
dH:{"^":"aX;e,f,a,b,c,d",
gdP:function(){return"RangeError"},
gdO:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
lV:function(a){return new P.dH(null,null,!1,null,null,a)},
c1:function(a,b,c){return new P.dH(null,null,!0,a,b,"Value not in range")},
W:function(a,b,c,d,e){return new P.dH(b,c,!0,a,d,"Invalid value")},
lW:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.W(a,b,c,d,e))},
cJ:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.W(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.W(b,a,c,"end",f))
return b}}},
kt:{"^":"aX;e,l:f>,a,b,c,d",
gdP:function(){return"RangeError"},
gdO:function(){if(J.bQ(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
A:{
cy:function(a,b,c,d,e){var z=e!=null?e:J.aC(b)
return new P.kt(b,z,!0,a,c,"Index out of range")}}},
O:{"^":"Y;a",
k:function(a){return"Unsupported operation: "+this.a}},
ai:{"^":"Y;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
E:{"^":"Y;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"Y;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eI(z))+"."}},
lj:{"^":"d;",
k:function(a){return"Out of Memory"},
gbc:function(){return},
$isY:1},
fw:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbc:function(){return},
$isY:1},
jk:{"^":"Y;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
oX:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eN:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.ax(x,0,75)+"..."
return y+"\n"+x}},
k2:{"^":"d;h:a<,f4,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.f4
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.f(P.cm(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dD(b,"expando$values")
return y==null?null:H.dD(y,z)},
m:function(a,b,c){var z,y
z=this.f4
if(typeof z!=="string")z.set(b,c)
else{y=H.dD(b,"expando$values")
if(y==null){y=new P.d()
H.fa(b,"expando$values",y)}H.fa(y,z,c)}}},
bu:{"^":"d;"},
u:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+int":0,
y:{"^":"d;$ti",
aY:function(a,b){return H.bw(this,b,H.x(this,"y",0),null)},
bV:["eN",function(a,b){return new H.J(this,b,[H.x(this,"y",0)])}],
Y:function(a,b){var z
for(z=this.gZ(this);z.t();)if(J.i(z.gG(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gZ(this);z.t();)b.$1(z.gG())},
bg:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.t();)y=c.$2(y,z.gG())
return y},
bw:function(a,b){return P.S(this,b,H.x(this,"y",0))},
ca:function(a){return this.bw(a,!0)},
bx:function(a){return P.aZ(this,H.x(this,"y",0))},
gl:function(a){var z,y
z=this.gZ(this)
for(y=0;z.t();)++y
return y},
gK:function(a){return!this.gZ(this).t()},
gah:function(a){return!this.gK(this)},
dC:function(a,b){return H.mJ(this,b,H.x(this,"y",0))},
gB:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ad())
do y=z.gG()
while(z.t())
return y},
gbZ:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ad())
y=z.gG()
if(z.t())throw H.c(H.dj())
return y},
al:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.f(P.W(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.t();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cy(b,this,"index",null,y))},
k:function(a){return P.kE(this,"(",")")}},
cB:{"^":"d;$ti"},
I:{"^":"d;$ti",$isy:1,$isU:1},
"+List":0,
D:{"^":"d;$ti"},
am:{"^":"d;",
gw:function(a){return P.d.prototype.gw.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isQ:1,
$asQ:function(){return[P.L]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gw:function(a){return H.av(this)},
k:function(a){return H.cG(this)},
gbj:function(a){return new H.ao(H.hH(this),null)},
toString:function(){return this.k(this)}},
b9:{"^":"d;"},
bA:{"^":"U;$ti"},
aT:{"^":"d;"},
q:{"^":"d;",$isQ:1,
$asQ:function(){return[P.q]},
$isdA:1},
"+String":0,
bF:{"^":"d;v<",
gl:function(a){return this.v.length},
gK:function(a){return this.v.length===0},
gah:function(a){return this.v.length!==0},
k:function(a){var z=this.v
return z.charCodeAt(0)==0?z:z},
A:{
fB:function(a,b,c){var z=J.ak(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.t())}else{a+=H.b(z.gG())
for(;z.t();)a=a+c+H.b(z.gG())}return a},
nz:function(a){return new P.bF(a)}}}}],["","",,P,{"^":"",fm:{"^":"d;"}}],["","",,P,{"^":"",
cH:function(a){return C.H},
pc:{"^":"d;",
a9:function(a){if(a<=0||a>4294967296)throw H.c(P.lV("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fO:function(){return Math.random()}}}],["","",,S,{"^":"",ja:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a0:function(a){return this.b.a0(a)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){var z=this.b
return z.gK(z)},
gah:function(a){var z=this.b
return z.gah(z)},
gl:function(a){var z=this.b
return z.gl(z)},
m:function(a,b,c){this.hY()
this.b.m(0,b,c)},
k:function(a){return J.h(this.b)},
hY:function(){if(!this.a)return
this.a=!1
this.b=P.c_(this.b,H.m(this,0),H.m(this,1))},
$isD:1}}],["","",,A,{"^":"",jb:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c5:function(a){return this.b.c5(a)},
Y:function(a,b){return this.b.Y(0,b)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){return this.b.a===0},
gah:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.a8(z,z.r,null,null,[null])
y.c=z.e
return y},
gB:function(a){var z=this.b
return z.gB(z)},
aY:function(a,b){var z=this.b
z.toString
return new H.bs(z,b,[H.m(z,0),null])},
bx:function(a){var z,y
z=this.b
y=z.dX()
y.ap(0,z)
return y},
q:function(a,b){this.ih()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
ih:function(){if(!this.a)return
this.a=!1
this.b=P.aZ(this.b,H.m(this,0))},
$isbA:1,
$isU:1}}],["","",,S,{"^":"",da:{"^":"d;f6:a<,b,$ti",
a1:function(a){var z=new S.af(null,null,this.$ti)
z.au()
z.n(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=X.bo(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
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
if(!J.i(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
gZ:function(a){var z=this.a
return new J.bq(z,z.length,0,null,[H.m(z,0)])},
aY:function(a,b){var z=this.a
z.toString
return new H.al(z,b,[H.m(z,0),null])},
Y:function(a,b){var z=this.a
return(z&&C.a).Y(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
bx:function(a){var z=this.a
z.toString
return P.aZ(z,H.m(z,0))},
gK:function(a){return this.a.length===0},
gah:function(a){return this.a.length!==0},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
au:function(){if(new H.ao(H.T(H.m(this,0)),null).u(0,C.n))throw H.c(new P.O('explicit element type required, for example "new BuiltList<int>"'))}},af:{"^":"d;f6:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.da(z,null,this.$ti)
y.au()
this.a=z
this.b=y
z=y}return z},
n:function(a){if(H.aL(a,"$isda",this.$ti,null)){this.a=a.gf6()
this.b=a}else{this.a=P.S(a,!0,H.m(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z
if(c==null)H.f(P.G("null element"))
z=this.ge4()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.f(P.G("null element"))
z=this.ge4();(z&&C.a).q(z,b)},
ao:function(a,b){var z=this.ge4();(z&&C.a).ao(z,b)},
aY:function(a,b){var z=this.a
z.toString
z=new H.al(z,b,[H.m(z,0),null]).bw(0,!0)
this.a=z
this.b=null
this.hT(z)},
ge4:function(){if(this.b!=null){this.a=P.S(this.a,!0,H.m(this,0))
this.b=null}return this.a},
au:function(){if(new H.ao(H.T(H.m(this,0)),null).u(0,C.n))throw H.c(new P.O('explicit element type required, for example "new ListBuilder<int>"'))},
hT:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.as)(a),++x){w=a[x]
if(!H.d0(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cq:{"^":"d;ig:a<,b,c,d,$ti",
a1:function(a){var z=new A.ds(null,null,this.$ti)
z.ck()
z.n(this)
a.$1(z)
return z.p()},
C:function(){return new S.ja(!0,this.a,this.$ti)},
gw:function(a){var z=this.b
if(z==null){z=this.a.gc3()
z=H.bw(z,new A.iW(this),H.x(z,"y",0),null)
z=P.S(z,!1,H.x(z,"y",0))
C.a.eJ(z)
z=X.bo(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$iscq)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc3()
this.c=z}z=z.gZ(z)
for(;z.t();){v=z.gG()
if(!J.i(y.i(0,v),x.i(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){return this.a.i(0,b)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gah:function(a){var z=this.a
return z.gah(z)},
gl:function(a){var z=this.a
return z.gl(z)},
ck:function(){if(new H.ao(H.T(H.m(this,0)),null).u(0,C.n))throw H.c(new P.O('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.ao(H.T(H.m(this,1)),null).u(0,C.n))throw H.c(new P.O('explicit value type required, for example "new BuiltMap<int, int>"'))}},iW:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.cY(X.aU(X.aU(0,J.j(z)),J.j(y)))}},ds:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cq(this.a,null,null,null,this.$ti)
z.ck()
this.b=z}return z},
n:function(a){var z
if(H.aL(a,"$iscq",this.$ti,null)){this.b=a
this.a=a.gig()}else if(!!a.$iscq){z=P.c_(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.c_(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbj(a))))},
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){if(c==null)H.f(P.G("null value"))
this.giu().m(0,b,c)},
giu:function(){if(this.b!=null){this.a=P.c_(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
ck:function(){if(new H.ao(H.T(H.m(this,0)),null).u(0,C.n))throw H.c(new P.O('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.ao(H.T(H.m(this,1)),null).u(0,C.n))throw H.c(new P.O('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",db:{"^":"d;iw:a<,b,$ti",
a1:function(a){var z=new L.bd(null,null,this.$ti)
z.bo()
z.n(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.S(new H.bs(z,new L.iX(),[H.m(z,0),null]),!1,null)
C.a.eJ(z)
z=X.bo(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isdb)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gw(b)
x=this.gw(this)
if(z==null?x!=null:z!==x)return!1
return y.j1(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
c5:function(a){return this.a.c5(a)},
gZ:function(a){var z,y
z=this.a
y=new P.a8(z,z.r,null,null,[null])
y.c=z.e
return y},
aY:function(a,b){var z=this.a
z.toString
return new H.bs(z,b,[H.m(z,0),null])},
Y:function(a,b){return this.a.Y(0,b)},
L:function(a,b){return this.a.L(0,b)},
bx:function(a){return new A.jb(!0,this.a,this.$ti)},
gK:function(a){return this.a.a===0},
gah:function(a){return this.a.a!==0},
gB:function(a){var z=this.a
return z.gB(z)},
bo:function(){if(new H.ao(H.T(H.m(this,0)),null).u(0,C.n))throw H.c(new P.O('explicit element type required, for example "new BuiltSet<int>"'))}},iX:{"^":"a:0;",
$1:function(a){return J.j(a)}},bd:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.db(this.a,null,this.$ti)
z.bo()
this.b=z}return z},
n:function(a){var z,y,x,w
if(H.aL(a,"$isdb",this.$ti,null)){this.a=a.giw()
this.b=a}else{z=H.m(this,0)
y=P.V(null,null,null,z)
for(x=J.ak(a);x.t();){w=x.gG()
if(H.d0(w,z))y.q(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.f(P.G("null element"))
this.gfd().q(0,b)},
aY:function(a,b){var z=this.a
z.toString
z=P.aZ(new H.bs(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.ix(z)},
gfd:function(){if(this.b!=null){this.a=P.aZ(this.a,H.m(this,0))
this.b=null}return this.a},
bo:function(){if(new H.ao(H.T(H.m(this,0)),null).u(0,C.n))throw H.c(new P.O('explicit element type required, for example "new SetBuilder<int>"'))},
ix:function(a){var z,y,x
for(z=new P.a8(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d0(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.w(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
R:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",mi:{"^":"mg;ch,cx,as:cy@,b_:db@,bm:dx@,b,c,d,e,f,r,x,y,z,Q,a",
fV:function(){var z=$.$get$ch()
z.m(0,"game",this.cx)
z.m(0,"hitpoints",this.cy)
z.m(0,"stamina",this.db)
z.m(0,"gold",this.dx)},
jy:function(){var z,y,x,w
this.cx=null
this.cy=Z.bD("Health",new N.ml(),"#CCCCCC","Your physical state",100,0,!0,P.aM)
z=P.u
this.db=Z.bD("Stamina",new N.mm(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bD("Gold",new N.mn(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bM()
x=this.cy
w=this.db
y=new O.eH(N.b8("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a_(H.t([],[Y.a5]),0,P.aR()),x,w,z,O.rK(),O.rJ(),O.rI(),y,this.ghu(),new P.bF(""),!1,null)
y.hs()
this.cx=y
y.x="endGame"
$.$get$cd().q(0,0)},
hF:function(){var z,y
z=new O.cN([[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.m(0,"start",z)
z.a="start"
z=new O.cN([new N.mk(this),[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y.m(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cN(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.m(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
A:{
mj:function(){var z,y,x,w
z=Z.bD("Health",new N.qH(),"#CCCCCC","Your physical state",100,0,!0,P.aM)
y=P.u
x=Z.bD("Stamina",new N.qI(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bD("Gold",new N.qK(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.mi("net.filiph.edgehead.0.0.1",null,z,x,y,new O.mo(new H.N(0,null,null,null,null,null,0,[w,O.cN])),null,null,null,P.V(null,null,null,w),!1,null,-9999,null,null,null)
z.hF()
return z}}},qH:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.bW(a,0.5))return"\ud83d\ude23"
if(z.aH(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},qI:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},qK:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},mk:{"^":"a:18;a",
$0:function(){var z=0,y=P.au(),x=this
var $async$$0=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:z=2
return P.ap(x.a.cx.bi(),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},ml:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.bW(a,0.5))return"\ud83d\ude23"
if(z.aH(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},mm:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},mn:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bU:{"^":"d;"},jX:{"^":"d;"},ok:{"^":"bU;a,b",
a1:function(a){var z=new M.dT(null,!1,0)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bU))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return Y.R(Y.k(Y.k(0,C.K.gw(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.k(this.b)+",\n}"}},dT:{"^":"jX;c,a,b",
gbH:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
n:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbH()
y=this.a
this.gbH()
z=new M.ok(y,this.b)}this.n(z)
return z}}}],["","",,O,{"^":"",
uj:[function(a){var z,y
z=a.gbY()
y=a.gbP()
if(typeof y!=="number")return H.w(y)
return z-2*y},"$1","d2",2,0,20],
uq:[function(a){var z,y,x
z=a.gbY()
y=a.gcJ()
x=a.gbP()
if(typeof x!=="number")return H.w(x)
return z+y-x},"$1","hx",2,0,20],
eH:{"^":"l1;y,z,Q,ch,cx,cy,db,dx,dy,by:fr<,fx,eK:fy<,as:go<,b_:id<,bm:k1<,a,b,c,d,e,f,r,x",
hs:function(){var z,y,x,w,v,u
z=P.bv(C.r,null)
y=$.$get$ce()
this.cy=R.b5(1000,"orc",O.d2(),null,new G.c6("sword",1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b5(1001,"goblin",O.d2(),null,new G.c6("scimitar",1,P.bv(C.r,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.af(null,null,[Q.v])
y.au()
y.n([new Q.v("kill_agruth","","",null)])
this.dx=new K.c3(y.p(),"preStartBook",new O.jO(),new O.jP(),null,null,"ground")
y=R.b5(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.B,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.cO()
if(typeof y!=="number")return H.w(y)
this.go.sae(z/y)
this.id.sae(this.ch.fx)
this.k1.sae(this.ch.f)
this.cx=R.b5(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.X,0,null)
this.dy=F.fh(this.dx,!1)
y=K.c3
x=P.S($.$get$hq(),!0,y)
C.a.ap(x,[this.dx,$.$get$ec()])
w=new M.dT(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.aZ([z,v],R.F)
z=P.b0(null,O.ck)
u=new A.a6(v,P.V(null,null,null,U.aP),w,z,P.aZ(x,y),P.S([u],!0,S.a2),0,null)
this.fr=u
y=new Y.a_(H.t([],[Y.a5]),0,P.aR())
y.b=u.r
this.fx=new B.bx(u,null,y,1,1,!0,!1,!1,0)},
cL:function(){var z=0,y=P.au(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cL=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjd()
if(v.fS(u)){z=1
break}t=w.fr.ag(w.ch.x)
s=t.gas()
r=t.gfM()
if(typeof s!=="number"){x=s.cO()
z=1
break}if(typeof r!=="number"){x=H.w(r)
z=1
break}w.go.sae(s/r)
w.id.sae(t.gb_())
w.k1.sae(t.gbm())
r=w.y
r.fH("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.F(0,"\n\n",!0)
if(w.fr.jt(w.ch.x))v.F(0,"TO BE CONTINUED.",!0)
else v.F(0,"You died.",!0)
w.f.v+=v.c7()
z=1
break}q=C.a.gB(s)
p=q.dt(w.fr)
s=w.fr
o=N.b8("ActorPlanner")
n=new H.N(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.a_(H.t([],[Y.a5]),0,P.aR())
k.b=s.r
j=new G.io(o,l,new B.bx(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.f(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.h(s)+". Situation: "+H.b(s.gj3())))
z=3
return P.ap(j.jY(),$async$cL)
case 3:if(n.gK(n)){o.eB("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.n(s)
s="PlanConsequence<"+l.gw(s)+", "+l.k(s)+", "+C.u.k(null)
o.bE(m+(s+", 1, 0, >")+".")}s=Z.lq(n)
i=new Z.lp(new P.fZ(n,[null,null]),s)
if(n.gK(n))$.$get$by().eB("Created with no recommendations.")
if(s.length===0){r.dz("No recommendation for "+H.b(p.gh()))
r.dz(new O.jR(w))
w.fr.fu(q.gj());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.as)(s),++h);r.bE("planner.generateTable for "+H.b(p.gh()))
j.eC().L(0,new O.jS(w))
u=i.fU(q.gfL(),O.hx())
u.toString
g=P.S(u,!1,H.x(u,"y",0))
if(g.length!==0&&C.a.bM(g,new O.jT())){w.f.v+=v.c7()
C.a.sl(v.a,0)}v=new O.jU(new O.jW())
u=g.length-1
if(u-0<=32)H.fv(g,0,u,v)
else H.fu(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.as)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gS(),new O.jV(w,p,f))}z=1
break
z=5
break
case 6:s=p.gft()
z=7
return P.ap(w.cc(i.jX(s==null?O.hx():s),p,v),$async$cL)
case 7:case 5:v.fS(u)
case 1:return P.ax(x,y)}})
return P.ay($async$cL,y)},
cc:function(a,b,c){var z=0,y=P.au(),x,w=this,v,u,t
var $async$cc=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:v=a.d3(b,w.fx,w.fr)
u=P.S(v,!0,H.x(v,"y",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.ap(w.cV(a,b,u),$async$cc)
case 6:z=4
break
case 5:t=S.lS(new H.al(u,new O.jL(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ap(c.a,w.fx.geK().a)
w.fr=w.fx.gby()
v=w.y
v.bE(new O.jM(a,b))
v.a7(new O.jN(w,b))
case 1:return P.ax(x,y)}})
return P.ay($async$cc,y)},
cV:function(a,b,c){var z=0,y=P.au(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cV=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=a.N(b,x.fr)
v=J.n(w)
z=v.u(w,1)?2:4
break
case 2:x.fx=C.a.gbZ(c)
z=3
break
case 4:z=v.u(w,0)?5:7
break
case 5:x.fx=C.a.gbZ(c)
z=6
break
case 7:u=C.a.gB(J.h(a.gO()).split("."))
v=a.aj(b,x.fr)
t=a.gU()&&b.ju(a.gO())
s="use "+H.b(u)
x.f9()
z=8
return P.ap(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$cV)
case 8:r=e
t=new H.J(c,new O.jI(r),[H.m(c,0)])
x.fx=t.gbZ(t)
if(r.gku()===!0){q=A.dS(x.fx.gby())
q.a3(b.gj(),new O.jJ())
v=x.fx
t=v.gff()
s=H.t([],[Y.a5])
p=new Y.a_(s,0,P.aR())
C.a.ap(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bx(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.ax(null,y)}})
return P.ay($async$cV,y)}},
jO:{"^":"a:3;",
$3:function(a,b,c){return c.F(0,"UNUSED because this is the first choice",!0)}},
jP:{"^":"a:3;",
$3:function(a,b,c){return H.f(new P.E("Room isn't to be revisited"))}},
jR:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.al(z,new O.jQ(),[H.m(z,0),null]).cC(0," <- ")}},
jQ:{"^":"a:0;",
$1:function(a){return a.gb3()}},
jS:{"^":"a:0;a",
$1:function(a){return this.a.y.bE(a)}},
jW:{"^":"a:26;",
$1:function(a){if(a instanceof Q.H)return H.b(a.b.gh())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
jT:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
jU:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.ci(z.$1(a),z.$1(b))}},
jV:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.au(),x=this,w
var $async$$0=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ap(w.cc(x.c,x.b,w.fy),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},
jL:{"^":"a:0;",
$1:function(a){return a.gjZ()}},
jM:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
jN:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.al(z,new O.jK(),[H.m(z,0),null]).cC(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
jK:{"^":"a:0;",
$1:function(a){return a.gb3()}},
jI:{"^":"a:0;a",
$1:function(a){return a.gen()===this.a.gen()}},
jJ:{"^":"a:0;",
$1:function(a){var z=a.gb_()
if(typeof z!=="number")return z.aJ()
a.sb_(z-1)
return a}}}],["","",,Q,{"^":"",
hC:function(a,b,c){return P.aK(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hC(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gB(t):null
s=J.il(t.aO(y.a,y),new Q.rk(z))
t=J.ak(s.a),r=new H.dR(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gT()&&!z.ei(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aI()
case 1:return P.aJ(u)}}})},
hD:function(a,b,c){return P.aK(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hD(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dv((t.length!==0?C.a.gB(t):null).gbr()).gjh().a,t=new J.bq(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aI()
case 1:return P.aJ(u)}}})},
hE:function(a,b,c){return P.aK(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hE(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gB(t):null).gcv(),t=t.gZ(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aI()
case 1:return P.aJ(u)}}})},
rk:{"^":"a:0;a",
$1:function(a){return!J.i(a,this.a)&&a.gb5()}},
ab:{"^":"d;",
d3:function(a,b,c){var z=this
return P.aK(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$d3(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.N(y,x.gby())
r=J.a9(s)
v=r.bA(s,0)?2:3
break
case 2:q=A.dS(w)
v=4
return B.f7(q,x,z,z.hP(q,y,w,z.gR(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aH(s,1)?5:6
break
case 5:q=A.dS(w)
p=z.hO(q,y,w,z.gP(),!0)
if(typeof s!=="number")H.w(s)
v=7
return B.f7(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aI()
case 1:return P.aJ(t)}}})},
eQ:function(a,b,c,d,e,f){var z,y,x,w,v,u
a.x=this
z=a.a.aI(0,new Q.im(b))
y=new O.es(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga_().c=x
x=b.gj()
y.ga_().f=x
y.ga_().e=C.O
y.ga_().ch=f
y.ga_().Q=e
x=this.gT()
y.ga_().y=x
x=this.ga2()
y.ga_().z=x
if(!!this.$isH){x=y.ga_()
w=x.r
if(w==null){w=new L.bd(null,null,[P.u])
w.bo()
w.n(C.f)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.f(P.G("null element"))
x.gfd().q(0,w)}v=new Y.a_(H.t([],[Y.a5]),0,P.aR())
x=a.f
u=(x.length!==0?C.a.gB(x):null).gj()
a.gw(a);(x.length!==0?C.a.gB(x):null).fR(a,v)
this.a=d.$3(z,a,v)
if(a.cY(u)!=null)a.fu(u);++a.r
w=a.eD(u)
if(!(w==null))w.fQ(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gB(x):null
if((w==null?w:w.dt(a))!=null){w=x.length!==0?C.a.gB(x):null
w=!J.i(w==null?w:w.dA(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gB(x):null)==null)break
C.a.gB(x).aZ(a)
C.a.b9(x)}if(this.a==null)H.f(new P.E("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga_().d=x
x=a.r
y.ga_().x=x
a.d.fl(y.p())
return v},
hP:function(a,b,c,d,e){return this.eQ(a,b,c,d,!1,e)},
hO:function(a,b,c,d,e){return this.eQ(a,b,c,d,e,!1)}},
im:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.gj())}},
H:{"^":"ab;bP:b<",
gX:function(){var z=new Y.a_(H.t([],[Y.a5]),0,P.aR())
z.fi(0,this.gaf(),this.b)
return z.c7()},
aj:function(a,b){var z=new Y.a_(H.t([],[Y.a5]),0,P.aR())
z.iO(0,this.gai(),this.b,a,!0)
return z.c7()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gaf()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cx:{"^":"ab;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
cz:{"^":"ab;",
gX:function(){var z=new Y.a_(H.t([],[Y.a5]),0,P.aR())
z.fi(0,"pick up <object>",this.b)
return z.c7()},
k:function(a){return"ItemAction<"+this.gX()+">"}},
m2:{"^":"d;a,b",
k:function(a){return this.b},
A:{"^":"u7<"}}}],["","",,O,{"^":"",ck:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},kT:{"^":"d;a,b",
k:function(a){return this.b}},og:{"^":"ck;a,fh:b<,b3:c<,d,df:e<,eM:f<,J:r<,ha:x<,hb:y<,z,hc:Q<",
a1:function(a){var z=new O.es(null,null,null,null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.ck))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.i(this.e,b.e))if(J.i(this.f,b.f)){z=this.r
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},es:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfh:function(){return this.ga_().c},
gb3:function(){return this.ga_().d},
gdf:function(){return this.ga_().f},
geM:function(){var z,y
z=this.ga_()
y=z.r
if(y==null){y=new L.bd(null,null,[P.u])
y.bo()
y.n(C.f)
z.r=y
z=y}else z=y
return z},
gJ:function(){return this.ga_().x},
gha:function(){return this.ga_().y},
ghb:function(){return this.ga_().z},
ghc:function(){return this.ga_().ch},
ga_:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bd(null,null,[H.m(z,0)])
y.bo()
y.n(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bd(null,null,[H.m(z,0)])
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
if(z==null){y=this.ga_()
x=y.b
if(x==null){x=new L.bd(null,null,[P.u])
x.bo()
x.n(C.f)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga_().c
w=this.ga_().d
v=this.ga_().e
u=this.ga_().f
t=this.ga_()
s=t.r
if(s==null){s=new L.bd(null,null,[P.u])
s.bo()
s.n(C.f)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga_().x
r=this.ga_().y
q=this.ga_().z
p=this.ga_().Q
o=this.ga_().ch
z=new O.og(y,x,w,v,u,t,s,r,q,p,o)
if(y==null)H.f(P.l("accomplices"))
if(x==null)H.f(P.l("actionName"))
if(w==null)H.f(P.l("description"))
if(v==null)H.f(P.l("knownTo"))
if(u==null)H.f(P.l("protagonist"))
if(t==null)H.f(P.l("sufferers"))
if(s==null)H.f(P.l("time"))
if(r==null)H.f(P.l("wasAggressive"))
if(q==null)H.f(P.l("wasProactive"))
if(p==null)H.f(P.l("wasFailure"))
if(o==null)H.f(P.l("wasSuccess"))}this.n(z)
return z}}}],["","",,R,{"^":"",
hF:function(a,b){return P.aK(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hF(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bH(new H.J(u,new R.rl(z),[H.m(u,0)]))
case 3:return P.aI()
case 1:return P.aJ(v)}}})},
b5:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.et(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.qD(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
rl:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfA()
y=this.a.gj()
return z==null?y==null:z===y}},
F:{"^":"l5;",
giX:function(){return!0},
gbt:function(){var z=this.r
if(typeof z!=="number")return z.bA()
return z>0},
gbu:function(){return this.d instanceof K.dg},
gb6:function(){return this.dx===C.i},
gaa:function(){return this.dx===C.m},
ga8:function(){return this.dx===C.l},
ju:function(a){var z=this.fx
if(typeof z!=="number")return z.bG()
return z>=1},
ei:function(a,b){return this.fG(a,b)>0},
fG:function(a,b){var z,y
if(this.em(b)){z=a.gbk()
y=this.fy.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.ia(a,b,10))return 1
z=a.gbk()
y=this.fy.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
em:function(a){var z,y
z=a.c9("Confuse",this,!0)
if(z==null)return!1
y=a.kk("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cR:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.ag(this.x)
y=z.gas()
if(typeof y!=="number")return H.w(y)
x=2*y
if(!z.gbt())x-=10
y=z.d
if(!(y instanceof K.dg))x+=4
y=J.aW(y.gae(),2)
if(typeof y!=="number")return H.w(y)
x+=y
for(y=z.ch,w=[null],v=new P.a8(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aW(v.d.gae(),10)
if(typeof y!=="number")return H.w(y)
x+=y}y=a.a
for(v=y.gZ(y),u=new H.dR(v,new R.iR(this),[H.m(y,0)]),t=0;u.t();){s=v.gG()
r=s.gb5()?2:0
q=s.gas()
if(typeof q!=="number")return H.w(q)
p=J.aW(s.d.gae(),2)
if(typeof p!=="number")return H.w(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.a8(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aW(q.d.gae(),10)
if(typeof r!=="number")return H.w(r)
t+=r}}return new A.cl(x,t,y.bg(0,0,new R.iS(this,a)))},
aF:function(a){return C.a.Y(this.d.gdm(),a)},
ia:function(a,b,c){var z=b.kl(a,this,!0)
if(z==null)return!1
return z<=c},
$isbt:1},
l5:{"^":"d+de;"},
qD:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gD().y=this.a
a.gD().db=this.b
a.gD().dx=this.d
a.gD().fr=this.e
z=this.f
if(z==null)z=$.$get$eb()
a.gD().e=z
a.gD().b=[]
a.gD().dy=C.l
a.gD().x=this.r
a.gD().cy=this.x
a.gD().r=this.Q
a.gD().fy=this.y
a.gD().z=this.z
a.gD().Q=!0
a.gD().ch=this.c
z=P.V(null,null,null,null)
a.gD().cx=z
z=this.cy
if(z!=null){y=new L.bf(null,null)
y.n(z)
z=y}else{z=$.$get$hT()
z.toString
y=new L.bf(null,null)
y.n(z)
z=y}a.gD().go=z
a.gD().d=this.ch
a.gD().f=this.cx
a.gD().c=this.db
return a}},
iR:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.i(a.gbk(),z.fy)){y=a.gj()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
iS:{"^":"a:41;a,b",
$2:function(a,b){var z,y
z=b.gb5()?1:0
y=b.gas()
if(typeof y!=="number")return H.w(y)
return J.aj(a,(z+y)*this.a.fG(b,this.b))}},
dB:{"^":"d;a,b",
k:function(a){return this.b}},
oh:{"^":"F;a,ft:b<,br:c<,a6:d<,fA:e<,bm:f<,as:r<,j:x<,y,ek:z<,H:Q<,eo:ch<,fM:cx<,h:cy<,dc:db<,am:dx<,I:dy<,fr,b_:fx<,bk:fy<",
a1:function(a){var z=new R.et(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.F))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.i(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
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
if(z==null?y==null:z===y){z=this.fx
y=b.fx
z=(z==null?y==null:z===y)&&J.i(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.u.gw(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.u.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
et:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gft:function(){return this.gD().c},
gbr:function(){return this.gD().d},
sbr:function(a){this.gD().d=a
return a},
ga6:function(){return this.gD().e},
sa6:function(a){this.gD().e=a
return a},
gfA:function(){return this.gD().f},
gbm:function(){return this.gD().r},
sbm:function(a){this.gD().r=a
return a},
gas:function(){return this.gD().x},
sas:function(a){this.gD().x=a
return a},
gj:function(){return this.gD().y},
gH:function(){return this.gD().ch},
geo:function(){return this.gD().cx},
gfM:function(){return this.gD().cy},
gh:function(){return this.gD().db},
sh:function(a){this.gD().db=a
return a},
gdc:function(){return this.gD().dx},
gam:function(){return this.gD().dy},
sam:function(a){this.gD().dy=a
return a},
gI:function(){return this.gD().fr},
gb_:function(){return this.gD().fy},
sb_:function(a){this.gD().fy=a
return a},
gbk:function(){var z,y
z=this.gD()
y=z.go
if(y==null){y=new L.bf(null,null)
z.go=y
z=y}else z=y
return z},
gD:function(){var z,y
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
z=z.fy
if(!(z==null)){y=new L.bf(null,null)
y.n(z)
z=y}this.go=z
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
if(z==null){y=this.gD().b
x=this.gD().c
w=this.gD().d
v=this.gD().e
u=this.gD().f
t=this.gD().r
s=this.gD().x
r=this.gD().y
q=this.gD().z
p=this.gD().Q
o=this.gD().ch
n=this.gD().cx
m=this.gD().cy
l=this.gD().db
k=this.gD().dx
j=this.gD().dy
i=this.gD().fr
h=this.gD().fx
g=this.gD().fy
f=this.gD()
e=f.go
if(e==null){e=new L.bf(null,null)
f.go=e
f=e}else f=e
z=new R.oh(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
if(y==null)H.f(P.l("categories"))
if(v==null)H.f(P.l("currentWeapon"))
if(t==null)H.f(P.l("gold"))
if(s==null)H.f(P.l("hitpoints"))
if(r==null)H.f(P.l("id"))
if(q==null)H.f(P.l("initiative"))
if(p==null)H.f(P.l("isActive"))
if(o==null)H.f(P.l("isPlayer"))
if(n==null)H.f(P.l("items"))
if(m==null)H.f(P.l("maxHitpoints"))
if(l==null)H.f(P.l("name"))
if(k==null)H.f(P.l("nameIsProperNoun"))
if(j==null)H.f(P.l("pose"))
if(i==null)H.f(P.l("pronoun"))
if(g==null)H.f(P.l("stamina"))}this.n(z)
return z}}}],["","",,A,{"^":"",cl:{"^":"d;bY:a<,cJ:b<,bP:c<",
aJ:function(a,b){return new A.ac(this.a-b.gbY(),this.b-b.gcJ(),J.bp(this.c,b.gbP()))},
k:function(a){return"ActorScore<self="+C.k.bT(this.a,2)+",team="+C.k.bT(this.b,2)+",enemy="+J.cj(this.c,2)+">"}},ac:{"^":"d;bY:a<,cJ:b<,bP:c<",
gjI:function(){return this.a===-1/0&&this.b===-1/0&&J.i(this.c,-1/0)},
bX:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ac(this.a*b,this.b*b,J.bR(this.c,b))},
a4:function(a,b){return new A.ac(this.a+b.gbY(),this.b+b.gcJ(),J.aj(this.c,b.gbP()))},
cO:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ac(this.a/b,this.b/b,J.aW(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.k.bT(this.a,2)+",team="+C.k.bT(this.b,2)+",enemy="+J.cj(this.c,2)+">"},
A:{
iQ:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.as)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.w(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ac(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
tH:function(a){switch(a){case C.J:return"spear"
case C.e:return"sword"
case C.y:return"fist"
default:throw H.c(P.G(a))}},
aP:{"^":"l6;dm:a<",
gb3:function(){return U.tH(C.a.geg(this.a))},
gj:function(){return H.av(this)},
gek:function(){return!0},
gbt:function(){return!1},
gH:function(){return!1},
gdc:function(){return!1},
gI:function(){return C.q},
gbk:function(){return $.$get$bO()},
$isbt:1},
l6:{"^":"d+de;"},
di:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",dg:{"^":"h_;h:b<,a"}}],["","",,G,{"^":"",c6:{"^":"h_;h:b<,eI:c<,a"}}],["","",,L,{"^":"",h_:{"^":"aP;",
gl:function(a){return 2},
geI:function(){return 0},
gae:function(){return this.geI()}}}],["","",,G,{"^":"",l1:{"^":"d;",
f9:function(){var z,y
z=this.f
y=z.v
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.v=""}},
kG:[function(a){this.f.v+=a},"$1","gjd",2,0,21],
bi:function(){var z=0,y=P.au(),x,w=this,v,u
var $async$bi=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.E("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.v.length===0)){z=4
break}z=5
return P.ap(w.cL(),$async$bi)
case 5:z=3
break
case 4:w.f9()
case 1:return P.ax(x,y)}})
return P.ay($async$bi,y)}}}],["","",,B,{"^":"",eD:{"^":"d;cQ:a<,d8:b<,cD:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.cj(this.b,3)+", score="+this.a.k(0)+">"}},bx:{"^":"d;by:a<,ff:b<,eK:c<,jZ:d<,d8:e<,f,r,en:x<,cD:y<",
gw:function(a){return X.bo([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
u:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isbx&&this.gw(this)===z.gw(b)},
k:function(a){var z,y
z=this.a
y=J.n(z)
z="PlanConsequence<"+y.gw(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
A:{
f7:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bR(e,b.gd8())
z=z?0:b.gcD()+1
d.b=a.r
return new B.bx(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",io:{"^":"d;a,b,c,d,e,f",
j_:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.a7("...")
z.a7("combining scores")
y=H.t([],[A.ac])
x=new G.iJ()
for(w=J.ak(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gG()
z.a7(new G.iH(r))
if(J.a0(r.gd8(),0.15))if(s==null){z.a7("    - first _bestCase")
s=r}else if(J.a0(x.$1(r.gcQ()),x.$1(s.gcQ()))){z.a7("    - new _bestCase")
s=r}q=r.gcQ()
p=J.bp(q.c,t)
o=r.b
if(typeof o!=="number")return H.w(o)
n=new A.ac((q.a-v)*o,(q.b-u)*o,J.bR(p,o))
z.a7(new G.iI(n))
y.push(n)}m=A.iQ(y)
w=s==null
if(w)l=C.D
else{q=s.gcQ()
l=new A.ac(q.a-v,q.b-u,J.bp(q.c,t))}w=w?s:s.gcD()
if(typeof w!=="number")return H.w(w)
k=new A.ac(l.a/w,l.b/w,J.aW(l.c,w))
z.a7("- uplifts average = "+("ActorScoreChange<self="+C.k.bT(m.a,2)+",team="+C.k.bT(m.b,2)+",enemy="+J.cj(m.c,2)+">"))
z.a7("- best = "+k.k(0))
j=k.a4(0,m)
z.a7("- result = "+j.k(0))
return j},
eC:function(){var z=this
return P.aK(function(){var y=0,x=1,w,v,u,t,s
return function $async$eC(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc3(),u=u.gZ(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aI()
case 1:return P.aJ(w)}}})},
dd:function(a,b,c){var z=0,y=P.au(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dd=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=x.f
w.aX(0)
v=x.c
u=v.a
t=u.a.aI(0,new G.iK(x))
s=t.cR(u)
r=x.a
r.bE("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b1(x.dR(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.b4(new G.iL(t,o))
if(o.M(t,u)!==!0){r.b4(new G.iM(o))
z=2
break}z=4
return P.ap(x.cg(v,o,b,a,c).ca(0),$async$dd)
case 4:n=e
if(J.eq(n)===!0){r.b4(new G.iN(o))
w.m(0,o,C.E)
z=2
break}r.b4(new G.iO(s,o,n))
m=x.j_(n,s,b)
w.m(0,o,m)
r.b4(new G.iP(o,m))
z=2
break
case 3:x.e=!0
return P.ax(null,y)}})
return P.ay($async$dd,y)},
jY:function(){return this.dd(50,10,null)},
dR:function(a,b){return P.aK(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dR(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bH((u.length!==0?C.a.gB(u):null).gbp())
case 2:u=(u.length!==0?C.a.gB(u):null).gaL()
t=u.length
s={func:1,ret:Q.cz,args:[U.aP]}
r={func:1,ret:Q.cx,args:[Q.v]}
q={func:1,ret:Q.H,args:[R.F]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ar(o,q)?6:8
break
case 6:x=9
return P.bH(Q.hC(z,y,o))
case 9:x=7
break
case 8:x=H.ar(o,r)?10:12
break
case 10:x=13
return P.bH(Q.hD(z,y,o))
case 13:x=11
break
case 12:x=H.ar(o,s)?14:16
break
case 14:x=17
return P.bH(Q.hE(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.E(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.as)(u),++p
x=3
break
case 5:return P.aI()
case 1:return P.aJ(v)}}})},
cg:function(a5,a6,a7,a8,a9){var $async$cg=P.aq(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aI(0,new G.ir(t))
p=t.a
p.b4("=====")
p.b4(new G.is(a6,q))
p.b4(new G.it(a6))
if(a6.M(q,r)!==!0){p.b4("- firstAction not applicable")
z=1
break}o=q.cR(r)
p.b4(new G.iz(a5,o))
p.b4(new G.iA(a5))
n=P.b0(null,B.bx)
m=P.V(null,null,null,A.a6)
l=J.n(r)
k=l.gw(r)
for(j=new P.b1(a6.d3(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gG()
if(l.gw(r)!==k)throw H.c(new P.E("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.at(h)}s.a=0
r=t.b
case 3:if(!!n.gK(n)){z=4
break}++s.a
g=n.dg()
p.a7("----")
p.a7(new G.iB(g))
p.a7(new G.iC(g))
if(g.gcD()>a7||s.a>a8){p.a7(new G.iD(s,a7,g))
p.a7(new G.iE(g))
z=4
break}z=g.gby().f.length===0?5:6
break
case 5:p.a7("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bf(0,new G.iF(t),new G.iG())
if(q==null){p.a7("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eD(q.cR(l),g.e,g.y)
p.a7(new G.iu(f))
z=7
x=[1]
return P.cW(P.h6(f),$async$cg,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gB(j):null).dt(l)
j=l.a
i=new H.J(j,new G.iv(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.E("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.fH("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aI(0,new G.iw(t))
c=J.i(e,q)
p.a7("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.a7("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.cR(l)
if(b==null)b=C.F
f=new B.eD(b,g.e,g.y)
p.a7(new G.ix(o,f))
p.a7(new G.iy(g))
z=8
x=[1]
return P.cW(P.h6(f),$async$cg,y)
case 8:p.a7("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b1(t.dR(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.M(e,l)!==!0)continue
for(a1=new P.b1(a2.d3(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bQ(a4.gd8(),0.05))continue
if(m.Y(0,a4.gby()))continue
n.at(a4)}}p.a7("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.cW(null,0,y)
case 2:return P.cW(v,1,y)}})
var z=0,y=P.oI($async$cg),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.q2(y)}},iJ:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.w(z)
return a.b-z}},iH:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},iI:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},iK:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iL:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.cy)}},iM:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},iN:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},iO:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aC(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},iP:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},ir:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},is:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gh())}},it:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iz:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},iA:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bX(" ",z.y)+"- "+J.h(z.b)}},iB:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gff().gX()+"'"}},iC:{"^":"a:1;a",
$0:function(){var z=this.a.gby().f
return"- situation: "+H.b(J.ic(z.length!==0?C.a.gB(z):null))}},iD:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcD()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iE:{"^":"a:1;a",
$0:function(){var z=this.a.gby().d
return"- how we got here: "+new H.al(z,new G.iq(),[H.m(z,0),null]).cC(0," <- ")}},iq:{"^":"a:0;",
$1:function(a){return a.gb3()}},iF:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iG:{"^":"a:1;",
$0:function(){return}},iu:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},iv:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iw:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},ix:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iy:{"^":"a:1;a",
$0:function(){var z=this.a.gby().d
return"- how we got here: "+new H.al(z,new G.ip(),[H.m(z,0),null]).cC(0," <- ")}},ip:{"^":"a:0;",
$1:function(a){return a.gb3()}}}],["","",,Z,{"^":"",lp:{"^":"d;a,b",
gbp:function(){return this.b},
gK:function(a){return this.b.length===0},
fU:function(a,b){var z=this
return P.aK(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fU(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bH(t)
case 5:w=1
break
case 4:s=z.i4(new Z.ls())
r=z.dQ(new Z.lt(),[s])
q=z.dQ(new Z.lu(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$by().bE("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$by().bE("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$by().bE("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cT(t,new Z.lv(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.n(m)
if(l.u(m,s)){w=17
break}if(l.u(m,r)){w=17
break}if(l.u(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.as)(t),++n
w=16
break
case 18:case 1:return P.aI()
case 2:return P.aJ(u)}}})},
jX:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbZ(y)
C.a.cT(y,new Z.lw(this,a))
x=this.a.a
w=x.gcb().bg(0,1/0,new Z.lx(a))
v=x.gcb().bg(0,-1/0,new Z.ly(a))
x=J.a9(v)
u=J.a9(w)
t=u.aJ(w,J.bR(x.aJ(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bp(t,1)
z.a=t
u=t}else u=t
s=x.aJ(v,u)
r=P.l_(y.length,new Z.lz(z,this,a,s),!1,P.L)
q=new H.al(r,new Z.lA(C.a.bg(r,0,Z.hS())),[H.m(r,0),null]).bw(0,!1)
z=C.a.bg(q,0,Z.hS())
if(typeof z!=="number")return H.w(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.aj(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.lT(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dQ:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.as)(z),++u){t=z[u]
if(C.a.Y(b,t))continue
if(w==null||J.a0(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
i4:function(a){return this.dQ(a,C.f)},
A:{
lq:function(a){var z,y,x
z=a.gc3()
y=H.x(z,"y",0)
x=P.S(new H.J(z,new Z.lr(a),[y]),!1,y)
if(x.length===0)$.$get$by().eB("After removing actions scored by undefined, there are no recommendations.")
return x},
u5:[function(a,b){return J.aj(a,b)},"$2","hS",4,0,42]}},ls:{"^":"a:0;",
$1:function(a){return a.gbY()}},lt:{"^":"a:0;",
$1:function(a){return J.i8(a.gbP())}},lu:{"^":"a:0;",
$1:function(a){return a.gcJ()}},lv:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.ci(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lw:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.ci(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lx:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d_(a),H.d_(z))}},ly:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d_(a),H.d_(z))}},lz:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.aW(J.bp(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},lA:{"^":"a:0;a",
$1:function(a){return J.ih(J.bR(J.aW(a,this.a),1000))}},lr:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjI()}}}],["","",,K,{"^":"",qb:{"^":"a:3;",
$3:function(a,b,c){}},c3:{"^":"d;a,h:b<,c,d,jS:e<,f,bz:r<",
gjh:function(){return this.a},
gw:function(a){return C.b.gw(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.c3&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jT:function(a){return this.e.$1(a)},
A:{
Z:function(a,b,c,d,e,f,g){var z=new S.af(null,null,[Q.v])
z.au()
z.n(f)
return new K.c3(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;jc:a<,X:b<,b3:c<,jE:d<"}}],["","",,S,{"^":"",a2:{"^":"d;",
gaL:function(){return C.f},
gbp:function(){return C.f},
gfL:function(){return 3},
dt:function(a){return this.aG(this.gJ(),a)},
fQ:function(a,b){},
fR:function(a,b){},
aZ:function(a){},
dA:function(a){return!0}}}],["","",,S,{"^":"",
fe:function(a){var z=$.$get$bb().a9(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
lS:function(a,b){var z,y,x,w,v
z=$.$get$bb().fO()*b
for(y=new H.dq(a,a.gl(a),0,null,[H.x(a,"aS",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.w(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
lT:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bb().a9(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.as)(a),++v){t=a[v]
if(typeof t!=="number")return H.w(t)
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
if(q>1){p=$.$get$bb().a9(q)
o=C.b.ax(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cI(C.b.ax(a,m+1,y[l]))
if(typeof x!=="number")return x.a4()
l+=C.b.ax(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cI(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a4()
v=u+1
return C.b.ax(a,0,v)+S.cI(C.b.bB(a,v))}}else return a},
aE:function(a,b,c,d){switch($.$get$bb().a9(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
lU:function(a){if(a<0||a>1)throw H.c(P.W(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$bb().fO()<a}}],["","",,Y,{"^":"",a5:{"^":"d;aQ:a<,aK:b<,aC:c<,fT:d<,e,d5:f@,fW:r<,fN:x<,eL:y<,jg:z<,hw:Q<,cN:ch<,iI:cx<,fI:cy<,J:db<",
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
geh:function(){return C.a.bM(this.a,new Y.n9())},
b2:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.i(b,""))return
z=(J.bn(b).ee(b,".")||C.b.ee(b,"!")||C.b.ee(b,"?"))&&C.b.dD(b,P.bc("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a5(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.b2(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
F:function(a,b,c){return this.b2(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
fi:function(a,b,c){return this.b2(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
iL:function(a,b,c,d,e,f,g,h,i,j,k,l){return this.b2(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,!1)},
iN:function(a,b,c,d,e){return this.b2(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
e7:function(a,b,c,d){return this.b2(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fj:function(a,b,c,d){return this.b2(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fk:function(a,b,c,d,e,f){return this.b2(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
iP:function(a,b,c,d,e,f){return this.b2(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
e7:function(a,b,c,d){return this.b2(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
iO:function(a,b,c,d,e){return this.b2(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iT:function(){return this.F(0,"\n\n",!0)},
c1:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bs(a,"<owner's> "+b)!==-1||C.b.bs(a,"<ownerPronoun's> "+b)!==-1||C.b.bs(a,"<object-owner's> "+b)!==-1||C.b.bs(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(c.gdc()!==!0){z=this.c
y=z.i(0,c.gj())
if((y==null?-1:y)<e)x=C.b.dh(a,b,"the "+b)
else{x=J.d6(c.gh(),P.bc("[aeiouy]",!1,!1))?C.b.dh(a,b,"an "+b):C.b.dh(a,b,"a "+b)
z.m(0,c.gj(),e)}}else x=null
return x==null?a:x},
ef:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaK()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaK()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaK().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.i(y,z[b].gaC().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaC().gj()
if(b>=z.length)return H.e(z,b)
z=J.i(y,z[b].gaK().gj())}else z=!1
return z},
ds:function(a){var z=this
return P.aK(function(){var y=a
var x=0,w=2,v,u,t
return function $async$ds(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aE(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaK()!=null?3:4
break
case 3:x=5
return t.gaK()
case 5:case 4:x=t.gaC()!=null?6:7
break
case 6:x=8
return t.gaC()
case 8:case 7:x=t.gfT()!=null?9:10
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
aM:[function(a){var z=J.a9(a)
if(z.aH(a,0)||z.bG(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaC()}},"$1","gaC",2,0,22],
jV:function(a,b){var z
if(!this.aE(a)||!this.aE(b))return!1
if(this.ef(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geL()}return!1},
fS:function(a){var z
for(z=!1;this.geh();z=!0){a.$1(this.fX(!0))
this.k6()}return z},
fX:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.bg(z,[],new Y.na())
C.a.is(z,new Y.nb(y),!1)
x=a&&this.geh()?C.a.bs(z,C.a.fz(z,new Y.nc()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ef(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gd5())n=this.jV(s,p)&&this.hv(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gd5()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sd5(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghw()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjg()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcN())if(this.d1(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gd5()}else n=!1
n=n||this.km(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcN()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcN()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fe([" but "," but ",", but "])
u=!this.hi(s,s+1)&&!0}else{r+=S.fe([" and "," and ",", and "])
u=!0}}m=this.dF(s)
p=!v
if(p){n=s-1
if(this.d1(s,n))if(J.d6(this.dF(n),"<subject> "))if(J.d6(m,"<subject> "))m=H.bP(m,"<subject> ","",0)}l=J.ig(m,"<action>",this.dF(s))
n=s-1
k=this.iv(s,n)
if(k)k=!(this.aM(s).gI()===C.q&&this.ak(s).gI()===C.q)
else k=!1
if(k){k=this.aM(s).gI().b
l=H.o(l,"<object-owner's> <object>",k)
k=this.aM(s).gI().b
l=H.o(l,"<object-ownerPronoun's> <object>",k)
k=this.aM(s).gI().b
l=H.o(l,"<object>",k)
k=this.aM(s).gI().c
l=H.o(l,"<object's>",k)}k=this.d1(s,n)
if(k){k=this.ak(s).gI().a
l=H.o(l,"<owner's> <subject>",k)
k=this.ak(s).gI().a
l=H.o(l,"<ownerPronoun's> <subject>",k)
k=this.ak(s).gI().a
l=H.o(l,"<subject>",k)
k=this.ak(s).gI().c
l=H.o(l,"<subject's>",k)}if(this.aM(n)!=null)if(this.ak(s)!=null)if(this.ak(n)!=null){k=this.aM(n)
k=k==null?k:k.gj()
j=this.ak(s)
if(J.i(k,j==null?j:j.gj())){k=this.ak(n)
k=k==null?k:k.gI()
j=this.ak(s)
k=!J.i(k,j==null?j:j.gI())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.ak(s).gI().a
l=H.o(l,"<owner's> <subject>",k)
k=this.ak(s).gI().a
l=H.o(l,"<ownerPronoun's> <subject>",k)
k=this.ak(s).gI().a
l=H.o(l,"<subject>",k)
k=this.ak(s).gI().c
l=H.o(l,"<subject's>",k)}if(this.ak(n)!=null)if(this.aM(s)!=null){k=this.ak(n)
k=k==null?k:k.gj()
j=this.aM(s)
if(J.i(k,j==null?j:j.gj())){n=this.ak(n)
n=n==null?n:n.gI()
k=this.ak(s)
n=!J.i(n,k==null?k:k.gI())}else n=!1}else n=!1
else n=!1
if(n){n=this.aM(s).gI().a
l=H.o(l,"<object-owner's> <object>",n)
n=this.aM(s).gI().a
l=H.o(l,"<object-ownerPronoun's> <object>",n)
n=this.aM(s).gI().b
l=H.o(l,"<object>",n)
n=this.aM(s).gI().c
l=H.o(l,"<object's>",n)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaK()
h=n.gaC()
g=n.gfT()
f=n.e
e=S.cI(l)
if(C.b.Y(e,"{")||C.b.Y(e,"}"))$.$get$hM().dz('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gH()===!0){e=H.o(e,"<subject>","you")
e=H.o(e,"<subject's>","your")}if(i.gI()===C.B||i.gI()===C.Y){e=H.o(e,"<s>","")
e=H.o(e,"<es>","")
e=H.o(e,"<sses>","ss")
e=H.o(e,"<ies>","y")
e=H.o(e,"<does>","do")
e=H.o(e,"<is>","are")
e=H.o(e,"<has>","have")}else{e=H.o(e,"<s>","s")
e=H.o(e,"<es>","es")
e=H.o(e,"<sses>","sses")
e=H.o(e,"<ies>","ies")
e=H.o(e,"<does>","does")
e=H.o(e,"<is>","is")
e=H.o(e,"<has>","has")}e=H.bP(e,"<subject>","<subjectNoun>",0)
k=i.gI().a
e=H.o(e,"<subject>",k)
k=n.db
e=this.c1(e,"<subjectNoun>",i,g,k)
j=i.gh()
if(typeof j!=="string")H.f(H.P(j))
e=H.bP(e,"<subjectNoun>",j,0)
j=i.gI().a
e=H.o(e,"<subjectPronoun>",j)
if(C.b.Y(l,P.bc("<subject>.+<subject's>",!0,!1))){j=i.gI().c
e=H.o(e,"<subject's>",j)}e=this.c1(e,"<subject's>",i,g,k)
k=H.b(i.gh())+"'s"
e=H.bP(e,"<subject's>",k,0)
k=i.gI().c
e=H.o(e,"<subject's>",k)
k=i.gI().c
e=H.o(e,"<subjectPronoun's>",k)
k=i.gI().d
e=H.o(e,"<subjectPronounSelf>",k)}if(h!=null){if(h.gH()===!0){e=H.o(e,"<object>","you")
e=H.o(e,"<object's>","your")}else{e=this.c1(e,"<object>",h,f,n.db)
k=h.gh()
if(typeof k!=="string")H.f(H.P(k))
e=H.o(e,"<object>",k)}k=h.gI().b
e=H.o(e,"<objectPronoun>",k)
if(C.b.Y(l,P.bc("<object>.+<object's>",!0,!1))){k=h.gI().c
e=H.o(e,"<object's>",k)}e=this.c1(e,"<object's>",h,f,n.db)
k=H.b(h.gh())+"'s"
e=H.bP(e,"<object's>",k,0)
k=h.gI().c
e=H.o(e,"<object's>",k)
k=h.gI().c
e=H.o(e,"<objectPronoun's>",k)}n=n.db
l=this.fa(f,this.fa(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.n8(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcN())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcN()?r+".":r
return H.tC(z.charCodeAt(0)==0?z:z,$.$get$fy(),new Y.nd(),null)},
c7:function(){return this.fX(!1)},
k6:function(){var z,y
if(!this.geh()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.bs(z,C.a.fz(z,new Y.ne()))+1
P.cJ(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hi:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
if(this.ef(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geL()}if(!this.d1(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfW()){if(b>=z.length)return H.e(z,b)
y=z[b].gfW()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfN()){if(b>=z.length)return H.e(z,b)
z=z[b].gfN()}else z=!1
if(z)return!0
else return!1},
hv:function(a,b){var z,y,x,w,v
if(!this.aE(a)||!this.aE(b))return!1
for(z=new P.b1(this.ds(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b1(this.ds(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gG()
if(J.i(x.gj(),v.gj()))return!0}}return!1},
dF:[function(a){var z=J.a9(a)
if(z.aH(a,0)||z.bG(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaQ()}},"$1","gaQ",2,0,12],
ak:[function(a){var z=J.a9(a)
if(z.aH(a,0)||z.bG(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaK()}},"$1","gaK",2,0,22],
km:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gJ()!=null){y=a-1
if(this.aE(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gJ()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gJ()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gJ()
if(typeof y!=="number")return y.aJ()
if(typeof x!=="number")return H.w(x)
return y-x}},
k:function(a){return this.c7()},
aE:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fa:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gH()===!0)z=H.o(H.o(b,d,"you"),e,"your")
else{z=this.c1(b,d,a,null,h)
y=a.gh()
H.bm(y)
z=H.o(z,d,y)}z=H.o(z,f,a.gI().a)
z=H.o(H.o(C.b.dh(this.c1(C.b.Y(c,P.bc(d+".+"+e,!0,!1))?H.o(z,e,a.gI().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gI().c),g,a.gI().c)}else z=H.o(H.o(H.o(H.o(b,d,""),e,""),f,""),g,"")
return z},
iv:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaC().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaC().gj())},
d1:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaK()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaK()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaK().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaK().gj())},
A:{
n8:function(a){var z,y,x
z=!C.b.Y(a,"\n\n")?C.b.kq(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bB(z,1)}}},n9:{"^":"a:0;",
$1:function(a){return J.i(a.gaQ(),"\n\n")}},na:{"^":"a:37;",
$2:function(a,b){var z,y,x
z=J.K(a)
y=z.gah(a)?z.gB(a):null
if(y!=null&&y.gfI()&&J.i(b.giI(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aJ()
z.m(a,x-1,b)}else z.q(a,b)
return a}},nb:{"^":"a:30;a",
$1:function(a){return J.i9(this.a,a)}},nc:{"^":"a:0;",
$1:function(a){return J.i(a.gaQ(),"\n\n")}},nd:{"^":"a:27;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},ne:{"^":"a:0;",
$1:function(a){return J.i(a.gaQ(),"\n\n")}},bt:{"^":"l7;dc:a<,h:b<,c,bk:d<,H:e<,I:f<",
gj:function(){return H.av(this)},
gek:function(){return!0},
gbt:function(){return!0},
A:{
dd:function(a,b,c,d,e){var z=H.t([],[P.q])
return new Y.bt(c,b,z,e==null?$.$get$bO():e,!1,d)}}},l7:{"^":"d+de;"},de:{"^":"d;",
gb5:function(){return this.gbt()&&this.gek()===!0},
ab:function(a,b,c,d,e,f,g,h,i,j,k){a.iL(0,b,c,d,e,f,g,h,i,j,H.a4(this,"$isbt"),!1)},
an:function(a,b){return this.ab(a,b,null,!1,!1,!1,!1,null,null,!1,!1)},
kc:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,!1,null,null,d,!1)},
ba:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,null,d,!1)},
bv:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,c,null,!1,!1)},
c8:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,null,null,c,!1)},
aD:function(a,b,c){return this.ab(a,b,null,c,!1,!1,!1,null,null,!1,!1)},
cG:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,d,null,!1,!1)},
ew:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,!1,!1,d,null,e,!1)},
aN:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,c,null,null,!1,!1)},
bF:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1)},
di:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1)},
bF:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1)},
fY:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,c,d,null,!1,!1)},
h_:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,d,!1,e,null,!1,!1)},
kb:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,null,null,d,!1)},
ka:function(a,b,c,d){return this.ab(a,b,c,!1,!1,d,!1,null,null,!1,!1)},
kf:function(a,b,c,d,e,f){return this.ab(a,b,c,d,!1,e,!1,f,null,!1,!1)},
kd:function(a,b,c,d,e){return this.ab(a,b,c,d,!1,e,!1,null,null,!1,!1)},
fZ:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,d,!1,!1)},
ke:function(a,b,c,d,e){return this.ab(a,b,null,!1,c,!1,!1,d,null,e,!1)},
kg:function(a,b,c,d,e,f){return this.ab(a,b,null,!1,c,!1,!1,d,e,f,!1)},
di:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1)}},c0:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",qF:{"^":"a:0;",
$1:function(a){a.gcq().b=2
return 2}},qL:{"^":"a:0;",
$1:function(a){a.gcq().b=0
return 0}},qE:{"^":"a:0;",
$1:function(a){a.gcq().b=1
return 1}},fG:{"^":"d;"},ox:{"^":"fG;j:a<",
a1:function(a){var z=new L.bf(null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fG))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gw:function(a){return Y.R(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
A:{
dU:function(a){var z=new L.bf(null,null)
a.$1(z)
return z.p()}}},bf:{"^":"d;a,b",
gj:function(){return this.gcq().b},
gcq:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcq().b
z=new L.ox(y)
if(y==null)H.f(P.l("id"))}this.n(z)
return z}}}],["","",,X,{"^":"",
hr:function(a,b){return P.aK(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hr(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bq(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bq(u,u.length,0,null,[H.m(u,0)])
case 2:r=t.t()
q=s.t()
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
case 1:return P.aJ(v)}}})}}],["","",,A,{"^":"",a6:{"^":"d;iJ:a<,eo:b<,c,d,e,f,J:r<,x",
gj3:function(){var z=this.f
return z.length!==0?C.a.gB(z):null},
gw:function(a){var z,y,x,w,v
z=X.bo(this.a)
y=X.bo(this.d)
x=X.bo(this.f)
w=this.r
v=this.c
v=X.cY(X.aU(X.aU(0,C.d.gw(w)),J.j(v)))
return X.cY(X.aU(X.aU(X.aU(X.aU(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isa6&&this.gw(this)===z.gw(b)},
fg:function(a){var z,y
z=this.hh(a,!0)
y=z.gZ(z)
if(y.t()){y.gG()
return!0}return!1},
iG:function(a){var z,y
z=this.hg(a)
y=z.gZ(z)
if(y.t()){y.gG()
return!0}return!1},
iH:function(a){var z=this.x
if(z==null)return!1
return C.b.Y(z.gh(),a)},
fu:function(a){var z,y,x
z=this.cY(a)
if(z==null)throw H.c(new P.E("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ar()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ar:function(){++this.r},
dr:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.eN(0,new A.o6(a))
if(b!=null)z=z.bV(0,new A.o7(b))
if(c!=null)z=z.bV(0,new A.o8(c))
if(e!=null)z=z.bV(0,new A.o9(e))
return d!=null?z.bV(0,new A.oa(d)):z},
hh:function(a,b){return this.dr(a,null,null,null,b)},
hg:function(a){return this.dr(a,null,null,null,null)},
ag:function(a){return this.a.aI(0,new A.ob(a))},
dv:function(a){return this.e.aI(0,new A.oc(a))},
eD:function(a){var z,y
z=this.cY(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ac:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.i(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
jt:function(a){var z=this.a.bf(0,new A.od(a),new A.oe())
if(z==null)return!1
return z.gbt()},
ev:function(){var z=this.f
C.a.gB(z).aZ(this)
C.a.b9(z)},
bR:function(a){var z=this.f
while(!0){if(!(z.length!==0&&!J.i(C.a.gB(z).gh(),a)))break
C.a.gB(z).aZ(this)
C.a.b9(z)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
cF:function(a,b){var z,y
z=this.cY(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
dj:function(a,b,c,d,e){var z,y,x,w
z=this.dr(a,b,c,d,e)
y=z.gZ(z)
if(y.t()){x=y.gG()
y=this.r
w=x.gJ()
if(typeof w!=="number")return H.w(w)
return y-w}return},
kl:function(a,b,c){return this.dj(null,a,b,c,null)},
c9:function(a,b,c){return this.dj(a,null,b,null,c)},
kk:function(a,b,c){return this.dj(a,b,null,null,c)},
kj:function(a){return this.dj(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.dX()
y.ap(0,z)
return"World<"+P.bW(y,"{","}")+">"},
a3:function(a,b){var z,y,x
z=this.ag(a)
y=z.a1(b)
x=this.a
x.ao(0,z)
x.q(0,y)},
cY:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.i(y[x].gj(),a)){z=x
break}++x}return z},
hI:function(a){this.a.ap(0,a.a)
this.d.ap(0,a.d)
this.b.ap(0,a.b)
this.e.ap(0,a.e)
C.a.ap(this.f,a.f)
this.r=a.r},
A:{
dS:function(a){var z,y,x,w
z=P.V(null,null,null,R.F)
y=P.b0(null,O.ck)
x=P.V(null,null,null,U.aP)
w=P.V(null,null,null,null)
w=new A.a6(z,x,a.c,y,w,[],null,null)
w.hI(a)
return w}}},o6:{"^":"a:0;a",
$1:function(a){return a.gfh()===this.a}},o7:{"^":"a:0;a",
$1:function(a){return J.i(a.gdf(),this.a.gj())}},o8:{"^":"a:0;a",
$1:function(a){return a.geM().Y(0,this.a.x)}},o9:{"^":"a:0;a",
$1:function(a){return a.ghc()===this.a}},oa:{"^":"a:0;a",
$1:function(a){return a.gha()===this.a}},ob:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},oc:{"^":"a:0;a",
$1:function(a){return J.i(a.gh(),this.a)}},od:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},oe:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aF:{"^":"ab;a2:b<"},bB:{"^":"aF;c,X:d<,S:e<,h:f<,b,a",
V:[function(a,b,c){throw H.c(new P.E("SimpleAction always succeeds"))},"$3","gP",6,0,2],
W:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gR",6,0,2],
aj:function(a,b){throw H.c(new P.E("SimpleAction shouldn't have to provide roll reason"))},
N:function(a,b){return 1},
gT:function(){return!1},
M:function(a,b){return!0},
gO:function(){return H.f(new P.E("Not rerollable"))},
gU:function(){return!1}}}],["","",,N,{"^":"",j5:{"^":"H;T:c<,a2:d<,S:e<,U:f<,O:r<,b,a",
gaf:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gai:function(){return"will <subject> confuse <object>?"},
V:[function(a,b,c){var z
a.an(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bv(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.di(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z
a.an(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ba(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aN(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 0.6},
M:function(a,b){var z
if(a.gH()===!0)if(a.ga8()){z=b.a
z=new H.J(z,new N.j6(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.em(b)}else z=!1
else z=!1
return z},
A:{
tN:[function(a){return new N.j5(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","r4",2,0,5]}},j6:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbt()){z=a.gbk()
y=this.a.b.gbk()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",js:{"^":"H;U:c<,O:d<,T:e<,a2:f<,S:r<,b,a",
gaf:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gai:function(){return"will <subject> kick the weapon off?"},
V:[function(a,b,c){S.aE(new V.jt(this,a,c),new V.ju(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
S.aE(new V.jv(this,a,c),new V.jw(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cF(y.gj(),y.a1(new V.jx(this)))
z=this.b
b.a3(z.gj(),new V.jy())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(a.ga8()||a.dx===C.i){z=this.b
z=z.gaa()&&!z.gbu()}else z=!1
return z},
A:{
tR:[function(a){return new V.js(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","ra",2,0,5]}},jt:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.bv(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aD(y,"<subject> mi<sses>",!0)}},ju:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bv(z,"<subject> kick<s> <object's> weapon",y)
y.aD(z,"<subject> hold<s> onto it",!0)}},jv:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kg(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga6(),z,!0)}},jw:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ba(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.e7(0,"<owner's> <subject> fl<ies> away",y,y.ga6())}},jx:{"^":"a:25;a",
$1:function(a){a.gcv().q(0,this.a.b.ga6())
return a}},jy:{"^":"a:0;",
$1:function(a){a.sa6($.$get$eb())
return a}}}],["","",,R,{"^":"",kN:{"^":"H;U:c<,O:d<,T:e<,a2:f<,S:r<,b,a",
gh:function(){return"KickToGround"},
gaf:function(){return"kick <object> to the ground"},
gai:function(){return"will <subject> kick <object> prone?"},
V:[function(a,b,c){S.aE(new R.kO(this,a,c),new R.kP(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gP",6,0,2],
W:[function(a,b,c){var z
S.aE(new R.kQ(this,a,c),new R.kR(this,a,c,b.ac("FightSituation").gbz()),null,null)
z=this.b
b.a3(z.gj(),new R.kS())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){return(a.ga8()||a.dx===C.i)&&!this.b.gaa()},
A:{
u0:[function(a){return new R.kN(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","rx",2,0,5]}},kO:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.bv(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aD(y,"<subject> mi<sses>",!0)}},kP:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bv(z,"<subject> kick<s> <object's> shin",y)
y.aD(z,"<subject> <does>n't budge",!0)}},kQ:{"^":"a:1;a,b,c",
$0:function(){this.b.ke(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},kR:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ba(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.an(z,"<subject> {grunt|shriek}<s>")
y.aN(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},kS:{"^":"a:0;",
$1:function(a){a.sam(C.m)
return a}}}],["","",,F,{"^":"",lo:{"^":"ab;S:b<,T:c<,a2:d<,U:e<,O:f<,a",
gX:function(){return"Stand off."},
gh:function(){return"Pass"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.an(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gR",6,0,2],
aj:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return!0}}}],["","",,Y,{"^":"",lC:{"^":"H;U:c<,O:d<,T:e<,a2:f<,S:r<,b,a",
gaf:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gai:function(){return"will <subject> force <object> off balance?"},
V:[function(a,b,c){var z=this.b
a.fZ(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga6(),z)
z.c8(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.fZ(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga6(),z)
if(z.ga8()){z.fY(c,"<subject> lose<s> <object>",!0,$.$get$e9())
b.a3(z.x,new Y.lD())
C.a.q(b.f,U.l8(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gb6()){z.an(c,"<subject> <is> already off balance")
c.fj(0,"<subject> make<s> <object> fall to the "+H.b(b.ac("FightSituation").gbz()),z,$.$get$hU())
b.a3(z.x,new Y.lE())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.E("enemy pose must be either standing or off-balance"))},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(!a.gaa())if(C.a.Y(a.d.gdm(),C.e)){z=this.b
z=z.aF(C.e)&&!z.gaa()}else z=!1
else z=!1
return z},
A:{
u6:[function(a){return new Y.lC(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","rD",2,0,5]}},lD:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},lE:{"^":"a:0;",
$1:function(a){a.sam(C.m)
return a}}}],["","",,B,{"^":"",m0:{"^":"ab;S:b<,T:c<,a2:d<,U:e<,O:f<,a",
gX:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ba(c,"<subject> regain<s> <object>",$.$get$e9(),!0)
b.a3(a.gj(),new B.m1())
return H.b(a.gh())+" regains balance"},"$3","gR",6,0,2],
aj:function(a,b){return"Will "+a.gI().a+" regain balance?"},
N:function(a,b){return 1},
M:function(a,b){return a.gb6()}},m1:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return C.l}}}],["","",,O,{"^":"",mf:{"^":"ab;S:b<,T:c<,a2:d<,U:e<,O:f<,a",
gX:function(){return"Scramble."},
gh:function(){return"Scramble"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.an(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gR",6,0,2],
aj:function(a,b){return"Will "+a.gI().a+" crawl out of harm's way?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gaa())return!1
if(Q.hV(a,b))return!0
return!1}}}],["","",,Q,{"^":"",
hV:function(a,b){var z,y,x
z=b.c9("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c9("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c9("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
return!1},
n_:{"^":"ab;S:b<,T:c<,a2:d<,U:e<,O:f<,a",
gX:function(){return"Stand up."},
gh:function(){return"StandUp"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.an(c,"<subject> stand<s> up")
b.a3(a.gj(),new Q.n0())
return H.b(a.gh())+" stands up"},"$3","gR",6,0,2],
aj:function(a,b){return"Will "+a.gI().a+" stand up?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gaa())return!1
if(Q.hV(a,b))return!1
return!0}},
n0:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return C.l}}}],["","",,T,{"^":"",
ur:[function(a){return new A.aG(T.ej(),null,null,new T.rL(),new T.rM(),new T.rN(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","tr",2,0,5],
us:[function(a){return new A.aG(T.ej(),new T.rO(),T.ej(),new T.rP(),new T.rQ(),new T.rR(),new T.rS(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","ts",2,0,5],
ut:[function(a,b,c,d,e){a.bv(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a3(a.gj(),new T.rT())},"$5","ej",10,0,10],
rL:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gaa()&&a.gbu()&&c.gbu()}},
rM:{"^":"a:3;",
$3:function(a,b,c){return Y.ey(a,c)}},
rN:{"^":"a:3;",
$3:function(a,b,c){return S.dy(a,c,C.p)}},
rP:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gaa()&&a.gbu()&&c.gbu()}},
rQ:{"^":"a:3;",
$3:function(a,b,c){return Y.ey(a,c)}},
rR:{"^":"a:3;",
$3:function(a,b,c){return S.dy(a,c,C.o)}},
rO:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
rS:{"^":"a:3;",
$3:function(a,b,c){return S.dy(a,c,C.j)}},
rT:{"^":"a:0;",
$1:function(a){a.sam(C.m)
return a}}}],["","",,A,{"^":"",aG:{"^":"H;c,d,e,f,r,x,y,z,S:Q<,T:ch<,a2:cx<,h:cy<,U:db<,O:dx<,af:dy<,ai:fr<,b,a",
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
uu:[function(a){return new A.aG(U.ek(),null,null,new U.rU(),new U.rV(),new U.rW(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","tt",2,0,5],
uv:[function(a){return new A.aG(U.ek(),new U.rX(),U.ek(),new U.rY(),new U.rZ(),new U.t_(),new U.t0(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tu",2,0,5],
uw:[function(a,b,c,d,e){c.iP(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","ek",10,0,10],
rU:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.ga8()||a.dx===C.i)&&!c.gaa()&&a.gbu()
else z=!1
return z}},
rV:{"^":"a:3;",
$3:function(a,b,c){return M.fd(a,c)}},
rW:{"^":"a:3;",
$3:function(a,b,c){return Z.dF(a,c,C.p)}},
rY:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.ga8()||a.dx===C.i)&&!c.gaa()&&a.gbu()
else z=!1
return z}},
rZ:{"^":"a:3;",
$3:function(a,b,c){return M.fd(a,c)}},
t_:{"^":"a:3;",
$3:function(a,b,c){return Z.dF(a,c,C.o)}},
rX:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
t0:{"^":"a:3;",
$3:function(a,b,c){return Z.dF(a,c,C.j)}}}],["","",,G,{"^":"",
ux:[function(a){return new A.aG(G.el(),null,null,new G.t3(),new G.t4(),new G.t5(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","tv",2,0,5],
uC:[function(a){return new A.aG(G.el(),new G.te(),G.el(),new G.tf(),new G.tg(),new G.th(),new G.ti(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tw",2,0,5],
uD:[function(a,b,c,d,e){return a.h_(c,"<subject> swing<s> {<subject's> "+H.b(a.ga6().gh())+" |}at <object>",e.gj(),!0,d)},"$5","el",10,0,10],
t3:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.ga8()&&!c.gaa()&&a.aF(C.e)}},
t4:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
t5:{"^":"a:3;",
$3:function(a,b,c){return L.be(a,c,C.p)}},
tf:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.ga8()&&!c.gaa()&&a.aF(C.e)}},
tg:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
th:{"^":"a:3;",
$3:function(a,b,c){return L.be(a,c,C.o)}},
te:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
ti:{"^":"a:3;",
$3:function(a,b,c){return L.be(a,c,C.j)}}}],["","",,R,{"^":"",
uy:[function(a,b,c,d,e){return a.fY(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.ga6().gh()),!0,d)},"$5","hY",10,0,16],
uz:[function(a){return new A.aG(R.hZ(),new R.t6(),R.hY(),new R.t7(),new R.t8(),new R.t9(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","tx",2,0,5],
uA:[function(a){return new A.aG(R.hZ(),new R.ta(),R.hY(),new R.tb(),new R.tc(),new R.td(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","ty",2,0,5],
uB:[function(a,b,c,d,e){return a.h_(c,"<subject> swing<s> {<subject's> "+H.b(a.ga6().gh())+" |}at <object>",e.gj(),!0,d)},"$5","hZ",10,0,10],
t7:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gb6()&&!c.gaa()&&a.aF(C.e)}},
t8:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
t9:{"^":"a:3;",
$3:function(a,b,c){return L.be(a,c,C.p)}},
t6:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tb:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gb6()&&!c.gaa()&&a.aF(C.e)}},
tc:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
td:{"^":"a:3;",
$3:function(a,b,c){return L.be(a,c,C.o)}},
ta:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
uE:[function(a){return new A.aG(D.em(),null,null,new D.tj(),new D.tk(),new D.tl(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","tz",2,0,5],
uF:[function(a){return new A.aG(D.em(),new D.tm(),D.em(),new D.tn(),new D.to(),new D.tp(),new D.tq(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","tA",2,0,5],
uG:[function(a,b,c,d,e){return a.bv(c,"<subject> strike<s> down {with <subject's> "+H.b(a.ga6().gh())+" |}at <object>",d)},"$5","em",10,0,16],
tj:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gaa()&&!a.gaa()&&a.aF(C.e)}},
tk:{"^":"a:3;",
$3:function(a,b,c){return D.fA(a,c)}},
tl:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.p)}},
tn:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gaa()&&!a.gaa()&&a.aF(C.e)}},
to:{"^":"a:3;",
$3:function(a,b,c){return D.fA(a,c)}},
tp:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.o)}},
tm:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tq:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.j)}}}],["","",,Y,{"^":"",nB:{"^":"cz;a2:c<,b,a",
gS:function(){return"A different weapon might change the battle."},
gT:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gU:function(){return!1},
gO:function(){return},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cF(y.gj(),y.a1(new Y.nC(this)))
b.a3(a.gj(),new Y.nD(this,a))
z=this.b
a.bv(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gR",6,0,2],
aj:function(a,b){return H.f(new P.ai(null))},
N:function(a,b){return 1},
M:function(a,b){var z
a.giX()
z=b.c9("DisarmKick",a,!0)
if(z!=null&&z<=2)return!1
return!0},
A:{
ua:[function(a){return new Y.nB(!0,a,null)},"$1","tE",2,0,46]}},nC:{"^":"a:25;a",
$1:function(a){a.gcv().ao(0,this.a.b)
return a}},nD:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gbu())a.geo().q(0,a.ga6())
a.sa6(this.a.b)
return a}}}],["","",,M,{"^":"",o4:{"^":"ab;S:b<,U:c<,O:d<,T:e<,a2:f<,a",
gX:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.an(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kc(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gR",6,0,2],
aj:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z
if(a.em(b)){z=b.c9("Confuse",a,!0)
if(typeof z!=="number")return z.bA()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",kh:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gaf:function(){return""},
gai:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a3(z.gj(),new R.ki())
a.ba(c,"<subject> break<s> <object's> neck",z,!0)
X.eh(c,b,z,b.ac("FightSituation").gbz())
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tV:[function(a){return new R.kh(null,!0,!0,!0,C.c,a,null)},"$1","rg",2,0,5]}},ki:{"^":"a:0;",
$1:function(a){a.sas(0)
return a}}}],["","",,Y,{"^":"",
ey:function(a,b){var z=new Y.d9(null,null,null,null,null)
new Y.qW(a,b).$1(z)
return z.p()},
ex:{"^":"a2;",
gaL:function(){return[R.rg()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ar:function(){var z=new Y.d9(null,null,null,null,null)
z.n(this)
new Y.iU().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.ag(this.a)
return},
aO:function(a,b){return new H.J(a,new Y.iV(this),[H.m(a,0)])}},
qW:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaR().c=z
a.gaR().e=0
z=this.a.gj()
a.gaR().b=z
z=this.b.gj()
a.gaR().d=z
return a}},
iU:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
if(typeof z!=="number")return z.a4()
a.gaR().e=z+1
return a}},
iV:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oi:{"^":"ex;a,j:b<,c,J:d<",
a1:function(a){var z=new Y.d9(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.ex))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
d9:{"^":"d;a,b,c,d,e",
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
z=new Y.oi(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,Z,{"^":"",k_:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gaf:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gai:function(){return"will <subject> evade?"},
V:[function(a,b,c){var z
a.an(c,"<subject> tr<ies> to evade")
S.aE(new Z.k0(a,c),new Z.k1(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ba(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.bR("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return!0},
A:{
tU:[function(a){return new Z.k_("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","rd",2,0,5]}},k0:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {can't|fail<s>}",!0)}},k1:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cG(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dy:function(a,b,c){var z=new S.dx(null,null,null,null,null,null)
new S.qV(a,b,c).$1(z)
return z.p()},
f6:{"^":"cv;",
gaL:function(){return[Z.rd()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ar:function(){var z=new S.dx(null,null,null,null,null,null)
z.n(this)
new S.li().$1(z)
return z.p()}},
qV:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.gj()
a.gaB().b=z
z=this.b.gj()
a.gaB().e=z
a.gaB().d=this.c
return a}},
li:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
if(typeof z!=="number")return z.a4()
a.gaB().f=z+1
return a}},
oo:{"^":"f6;d4:a<,j:b<,b8:c<,cI:d<,J:e<",
a1:function(a){var z=new S.dx(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f6))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dx:{"^":"d;a,b,c,d,e,f",
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
z=new S.oo(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,G,{"^":"",eG:{"^":"H;S:c<,T:d<,a2:e<,b,a",
gh:function(){return"CounterSlash"},
gU:function(){return!1},
gO:function(){return},
gaf:function(){return"swing back at <object>"},
gai:function(){return"will <subject> keep <subject's> balance?"},
V:[function(a,b,c){a.an(c,"<subject> tr<ies> to swing back")
a.di(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.a3(a.x,new G.jh())
a.bF(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.a3(a.x,new G.ji())
a.aN(c,"<subject> lose<s> balance because of that",!0)
a.bF(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.cy)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.ba(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bC(a,z))
C.a.q(y,L.be(a,z,C.p))
return H.b(a.gh())+" swings back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.ga8()?0.7:0.9},
M:function(a,b){return a.gH()!==!0&&a.aF(C.e)&&!a.gaa()},
A:{
tP:[function(a){return new G.eG("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","r7",2,0,5]}},jh:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},ji:{"^":"a:0;",
$1:function(a){a.sam(C.m)
return a}}}],["","",,D,{"^":"",je:{"^":"eG;c,d,e,b,a",
gU:function(){return!0},
gO:function(){return C.c},
gaf:function(){return"swing back at <object>"},
gai:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){a.an(c,"<subject> tr<ies> to swing back")
a.di(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.a3(a.x,new D.jf())
a.bF(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.a3(a.x,new D.jg())
a.aN(c,"<subject> lose<s> balance because of that",!0)
a.bF(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.cy)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.ba(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bC(a,z))
C.a.q(y,L.be(a,z,C.o))
return H.b(a.gh())+" swings successfully back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.ga8()?0.7:0.9},
M:function(a,b){return a.gH()===!0&&a.aF(C.e)&&!a.gaa()},
A:{
tO:[function(a){return new D.je("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","r8",2,0,5]}},jf:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jg:{"^":"a:0;",
$1:function(a){a.sam(C.m)
return a}}}],["","",,S,{"^":"",
eF:function(a,b){var z=new S.dc(null,null,null,null,null)
new S.qO(a,b).$1(z)
return z.p()},
eE:{"^":"a2;",
gaL:function(){return[G.r7(),D.r8()]},
gbp:function(){return[$.$get$dz()]},
gh:function(){return"CounterAttackSituation"},
ar:function(){var z=new S.dc(null,null,null,null,null)
z.n(this)
new S.jc().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.ag(this.a)
return},
aO:function(a,b){return new H.J(a,new S.jd(this),[H.m(a,0)])}},
qO:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaS().c=z
a.gaS().e=0
z=this.a.gj()
a.gaS().b=z
z=this.b.gj()
a.gaS().d=z
return a}},
jc:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
if(typeof z!=="number")return z.a4()
a.gaS().e=z+1
return a}},
jd:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oj:{"^":"eE;a,j:b<,c,J:d<",
a1:function(a){var z=new S.dc(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eE))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dc:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaS().c},
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
z=new S.oj(y,x,w,v)
if(y==null)H.f(P.l("counterAttacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,X,{"^":"",
eh:function(a,b,c,d){var z=b.ac("FightSituation")
b.cF(z.gj(),z.a1(new X.ry(c)))
if(c.gam()===C.m){c.aN(a,"<subject> stop<s> moving",!0)
a.F(0,"\n\n",!0)
return}switch($.$get$hi().a9(3)){case 0:c.bF(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aN(a,"<subject> fall<s> backward",!0)
c.aN(a,"<subject> twist<s>",!0)
c.bF(a,"<subject> hit<s> the "+H.b(d)+" face down",!0,!0)
break
case 2:c.aN(a,"<subject> drop<s> to <subject's> knees",!0)
c.aN(a,"<subject> keel<s> over",!0)
break}a.F(0,"\n\n",!0)},
ry:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gbu())a.gcv().q(0,z.d)
return a}}}],["","",,O,{"^":"",cv:{"^":"mI;",
aG:function(a,b){if(a===0)return b.ag(this.gcI())
return},
aO:function(a,b){return new H.J(a,new O.jn(this),[H.m(a,0)])}},mI:{"^":"a2+lF;"},jn:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.gd4())||J.i(a.gj(),z.gcI())}}}],["","",,U,{"^":"",
k3:function(a,b,c,d){var z=new U.bV(null,null,null,null,null,null,null,null,null)
new U.qM(a,b,c,d).$1(z)
return z.p()},
eK:{"^":"a2;",
gaL:function(){return[N.r4(),V.ra(),R.rx(),Y.rD(),T.tr(),T.ts(),U.tt(),U.tu(),G.tv(),G.tw(),D.tz(),D.tA(),R.tx(),R.ty(),Y.tE()]},
gbp:function(){return H.t([$.$get$fg(),$.$get$fx(),$.$get$fk(),$.$get$fY()],[Q.ab])},
gfL:function(){return 1000},
gh:function(){return"FightSituation"},
d6:function(a,b){var z=b.a
return(z&&C.a).bM(z,new U.k4(a))},
ar:function(){var z=new U.bV(null,null,null,null,null,null,null,null,null)
z.n(this)
new U.k5().$1(z)
return z.p()},
aG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hr(this.f,this.b)
y=H.bw(z,new U.k6(b),H.x(z,"y",0),null)
x=H.x(y,"y",0)
w=P.S(new H.J(y,new U.k7(),[x]),!1,x)
x=H.m(w,0)
v=P.S(new H.J(w,new U.k8(),[x]),!1,x)
u=v.length===1?C.a.gbZ(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.as)(w),++r){q=w[r]
x=b.d
p=x.bf(0,new U.k9(q),new U.ka())
o=p==null?p:p.gJ()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.w(o)
m=n-o
if(m<=0)continue
l=x.bf(0,new U.kb(q),new U.kc())
k=l==null?l:l.gJ()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.w(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aO:function(a,b){return new H.J(a,new U.kd(this),[H.m(a,0)])},
fR:function(a,b){var z,y
z=b.a
if(!(z.length!==0&&C.a.gB(z).gfI())&&S.lU(0.25))b.F(0,"\n\n",!0)
z=this.x
y=this.c.a
if(y.a0(z))y.i(0,z).$2(a,b)},
aZ:function(a){var z,y,x,w,v,u
z=this.r
if(z!=null&&!this.d6(a,this.b)){y=a.eD(z)
a.cF(y.gj(),y.a1(new U.ke()))
for(z=this.f.a,z=new J.bq(z,z.length,0,null,[H.m(z,0)]),x=a.a;z.t();){w=z.d
if(a.ag(w).gb5()){v=a.ag(w)
u=v.a1(new U.kf())
x.ao(0,v)
x.q(0,u)}}}else this.d6(a,this.f)},
dA:function(a){var z=this.f
if(this.d6(a,z))if(this.d6(a,this.b)){z=z.a
z=(z&&C.a).bM(z,new U.kg(a))}else z=!1
else z=!1
return z}},
qM:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$a3().a9(1073741823)
a.gad().f=z
a.gad().y=0
z=a.gad()
y=z.r
if(y==null){y=new S.af(null,null,[P.u])
y.au()
y.n(C.f)
z.r=y
z=y}else z=y
y=this.a
z.n(new H.cD(y,new U.pR(),[H.m(y,0),null]))
y=a.gad()
z=y.c
if(z==null){z=new S.af(null,null,[P.u])
z.au()
z.n(C.f)
y.c=z}z.n(J.er(this.b,new U.pS()))
a.gad().e=this.c
z=new S.af(null,null,[U.aP])
z.au()
z.n(C.f)
a.gad().b=z
z=this.d.gj()
a.gad().x=z
return a}},
pR:{"^":"a:0;",
$1:function(a){return a.gj()}},
pS:{"^":"a:0;",
$1:function(a){return a.gj()}},
k4:{"^":"a:0;a",
$1:function(a){return this.a.ag(a).gb5()}},
k5:{"^":"a:0;",
$1:function(a){var z=a.gad().y
if(typeof z!=="number")return z.a4()
a.gad().y=z+1
return a}},
k6:{"^":"a:0;a",
$1:function(a){return this.a.ag(a)}},
k7:{"^":"a:0;",
$1:function(a){return a.gb5()}},
k8:{"^":"a:0;",
$1:function(a){return a.gH()}},
k9:{"^":"a:0;a",
$1:function(a){return J.i(a.gdf(),this.a.gj())&&a.ghb()===!0}},
ka:{"^":"a:1;",
$0:function(){return}},
kb:{"^":"a:0;a",
$1:function(a){return J.i(a.gdf(),this.a.gj())}},
kc:{"^":"a:1;",
$0:function(){return}},
kd:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gb5()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).Y(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).Y(z,y)
z=y}else z=!0}else z=!1
return z}},
ke:{"^":"a:0;",
$1:function(a){a.sjU(!1)
return a}},
kf:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}},
kg:{"^":"a:28;a",
$1:function(a){var z=this.a.ag(a)
return z.gH()===!0&&z.gb5()}},
ol:{"^":"eK;cv:a<,b,c,bz:d<,j:e<,f,r,J:x<",
a1:function(a){var z=new U.bV(null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eK))return!1
if(J.i(this.a,b.a))if(J.i(this.b,b.b))if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.i(this.f,b.f)){z=this.r
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
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+J.h(this.r)+",\ntime="+J.h(this.x)+",\n}"}},
bV:{"^":"d;a,b,c,d,e,f,r,x,y",
gcv:function(){var z,y
z=this.gad()
y=z.b
if(y==null){y=new S.af(null,null,[U.aP])
y.au()
y.n(C.f)
z.b=y
z=y}else z=y
return z},
gbz:function(){return this.gad().e},
gj:function(){return this.gad().f},
gJ:function(){return this.gad().y},
gad:function(){var z,y
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
if(!(z==null)){y=new A.ds(null,null,[H.m(z,0),H.m(z,1)])
y.ck()
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
if(z==null){y=this.gad()
x=y.b
if(x==null){x=new S.af(null,null,[U.aP])
x.au()
x.n(C.f)
y.b=x
y=x}else y=x
y=y.p()
x=this.gad()
w=x.c
if(w==null){w=new S.af(null,null,[P.u])
w.au()
w.n(C.f)
x.c=w
x=w}else x=w
x=x.p()
w=this.gad()
v=w.d
if(v==null){v=new A.ds(null,null,[P.u,{func:1,v:true,args:[A.a6,Y.a_]}])
v.ck()
v.n(C.W)
w.d=v
w=v}else w=v
w=w.p()
v=this.gad().e
u=this.gad().f
t=this.gad()
s=t.r
if(s==null){s=new S.af(null,null,[P.u])
s.au()
s.n(C.f)
t.r=s
t=s}else t=s
t=t.p()
s=this.gad().x
r=this.gad().y
z=new U.ol(y,x,w,v,u,t,s,r)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("enemyTeamIds"))
if(w==null)H.f(P.l("events"))
if(v==null)H.f(P.l("groundMaterial"))
if(u==null)H.f(P.l("id"))
if(t==null)H.f(P.l("playerTeamIds"))
if(r==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,A,{"^":"",lc:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"stab <object>"},
gai:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.bv(c,"<subject> tr<ies> to stab <object>",z)
a.aD(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a3(z.gj(),new A.ld())
if(b.ag(z.gj()).gbt()){a.ba(c,"<subject> thrust<s> {|<subject's> "+H.b(a.ga6().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.aN(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ba(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.ga6().gh())+" through} <object>",z,!0)
X.eh(c,b,z,b.ac("FightSituation").gbz())}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return a.ga8()&&this.b.gb6()&&C.a.Y(a.d.gdm(),C.e)},
A:{
u1:[function(a){return new A.lc("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","rA",2,0,5]}},ld:{"^":"a:0;",
$1:function(a){var z=a.gas()
if(typeof z!=="number")return z.aJ()
a.sas(z-1)
return a}}}],["","",,U,{"^":"",
l8:function(a,b){var z=new U.du(null,null,null,null,null)
new U.qX(a,b).$1(z)
return z.p()},
f4:{"^":"a2;",
gaL:function(){return H.t([A.rA()],[{func:1,ret:Q.H,args:[R.F]}])},
gbp:function(){return[$.$get$dz()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ar:function(){var z=new U.du(null,null,null,null,null)
z.n(this)
new U.l9().$1(z)
return z.p()},
aG:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bA()
if(a>0)return
z=b.ag(this.a)
y=b.a
x=H.m(y,0)
w=P.S(new H.J(y,new U.la(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geg(w)
if(v.ga8()&&z.gb6()&&C.a.Y(v.d.gdm(),C.e))return v
return},
aO:function(a,b){return new H.J(a,new U.lb(b,b.ag(this.a)),[H.m(a,0)])}},
qX:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaT().d=z
a.gaT().e=0
z=this.a.gj()
a.gaT().b=z
z=this.b
z=z==null?z:z.gj()
a.gaT().c=z
return a}},
l9:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
if(typeof z!=="number")return z.a4()
a.gaT().e=z+1
return a}},
la:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gb5())if(a.ei(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
lb:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.i(a,z)||a.ei(z,this.a)}},
om:{"^":"f4;a,b,j:c<,J:d<",
a1:function(a){var z=new U.du(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.f4))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
du:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaT().d},
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
z=new U.om(y,x,w,v)
if(y==null)H.f(P.l("actorId"))
if(w==null)H.f(P.l("id"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",kj:{"^":"H;S:c<,T:d<,a2:e<,U:f<,b,a",
gaf:function(){return""},
gh:function(){return"FinishPunch"},
gO:function(){return},
gai:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga8()?C.i:C.m
x=b.ac("PunchSituation").gj()
w=b.ac("FightSituation").gbz()
b.a3(z.x,new O.kk(y))
switch(y){case C.l:throw H.c(new P.E("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fk(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aN(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.m:c.fk(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tW:[function(a){return new O.kj(null,!0,!0,!1,a,null)},"$1","rh",2,0,5]}},kk:{"^":"a:0;a",
$1:function(a){a.sam(this.a)
return a}}}],["","",,E,{"^":"",jz:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gaf:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gai:function(){return"will <subject> dodge the fist?"},
V:[function(a,b,c){var z,y
z=b.ac("PunchSituation").gj()
a.ka(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.aE(new E.jA(a,c,z),new E.jB(this,a,c,z),null,null)
y=b.f
C.a.gB(y).aZ(b)
C.a.b9(y)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ew(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ac("PunchSituation").gj(),z,!0)
b.bR("FightSituation")
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
x=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!0},
A:{
tS:[function(a){return new E.jz("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rb",2,0,5]}},jA:{"^":"a:1;a,b,c",
$0:function(){return this.a.kd(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},jB:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kf(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dF:function(a,b,c){var z=new Z.dE(null,null,null,null,null,null)
new Z.qS(a,b,c).$1(z)
return z.p()},
fb:{"^":"cv;",
gaL:function(){return[E.rb()]},
gh:function(){return"PunchDefenseSituation"},
ar:function(){var z=new Z.dE(null,null,null,null,null,null)
z.n(this)
new Z.lP().$1(z)
return z.p()}},
qS:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaz().c=z
a.gaz().f=0
z=this.a.gj()
a.gaz().b=z
z=this.b.gj()
a.gaz().e=z
a.gaz().d=this.c
return a}},
lP:{"^":"a:0;",
$1:function(a){var z=a.gaz().f
if(typeof z!=="number")return z.a4()
a.gaz().f=z+1
return a}},
op:{"^":"fb;d4:a<,j:b<,b8:c<,cI:d<,J:e<",
a1:function(a){var z=new Z.dE(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fb))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dE:{"^":"d;a,b,c,d,e,f",
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
z=new Z.op(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,M,{"^":"",
fd:function(a,b){var z=new M.dG(null,null,null,null,null)
new M.qT(a,b).$1(z)
return z.p()},
fc:{"^":"a2;",
gaL:function(){return[O.rh()]},
gh:function(){return"PunchSituation"},
ar:function(){var z=new M.dG(null,null,null,null,null)
z.n(this)
new M.lQ().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.ag(this.a)
return},
aO:function(a,b){return new H.J(a,new M.lR(this),[H.m(a,0)])}},
qT:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.gj()
a.gaU().b=z
z=this.b.gj()
a.gaU().d=z
return a}},
lQ:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
if(typeof z!=="number")return z.a4()
a.gaU().e=z+1
return a}},
lR:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oq:{"^":"fc;a,j:b<,c,J:d<",
a1:function(a){var z=new M.dG(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fc))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dG:{"^":"d;a,b,c,d,e",
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
z=new M.oq(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",kl:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlash"},
gaf:function(){return""},
gai:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.a3(z.gj(),new O.ko())
y=b.ac("SlashSituation").gj()
x=b.ag(z.gj()).gbt()
if(x){a.ew(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.aN(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ew(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.eh(c,b,z,b.ac("FightSituation").gbz())}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return a.aF(C.e)},
A:{
tY:[function(a){return new O.kl(null,!0,!0,!0,C.c,a,null)},"$1","ri",2,0,5]}},ko:{"^":"a:0;",
$1:function(a){var z=a.gas()
if(typeof z!=="number")return z.aJ()
a.sas(z-1)
return a}}}],["","",,X,{"^":"",jo:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"step back and parry"},
gai:function(){return"will <subject> parry it?"},
V:[function(a,b,c){var z
a.an(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga6().gh())+"|fend it off}")
if(a.gb6())a.aD(c,"<subject> <is> out of balance",!0)
else S.aE(new X.jp(a,c),new X.jq(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.an(c,"<subject> {step<s>|take<s> a step} back")
a.c8(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.ga6().gh())+"|fend<s> it off}",!0)
if(!a.ga8()){b.a3(a.x,new X.jr())
if(a.Q===!0)a.an(c,"<subject> regain<s> balance")}b.bR("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
return 0.5-(a.ga8()?0:0.2)},
M:function(a,b){return a.aF(C.e)},
A:{
tQ:[function(a){return new X.jo("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","r9",2,0,5]}},jp:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jq:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cG(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jr:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,F,{"^":"",jC:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"DodgeSlash"},
gaf:function(){return"dodge and counter"},
gai:function(){return"will <subject> dodge?"},
V:[function(a,b,c){var z
a.an(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb6())a.aD(c,"<subject> <is> out of balance",!0)
else S.aE(new F.jD(a,c),new F.jE(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ba(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga8()){z.bF(c,"<subject> lose<s> balance because of that",!0,!0)
b.a3(z.x,new F.jF())}b.bR("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eF(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
x=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!a.gaa()},
A:{
tT:[function(a){return new F.jC("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","rc",2,0,5]}},jD:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},jE:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cG(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jF:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return C.i}}}],["","",,G,{"^":"",ll:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"ParrySlash"},
gaf:function(){return"parry and counter"},
gai:function(){return"will <subject> parry?"},
V:[function(a,b,c){var z
a.an(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga6().gh())+"|fend it off}")
if(a.gb6())a.aD(c,"<subject> <is> out of balance",!0)
else S.aE(new G.lm(a,c),new G.ln(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
if(z.gb6()){c.iN(0,"<subject> <is> out of balance",!0,!0,z)
c.e7(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$i0())
a.c8(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.ga6().gh())+"|fend<s> it off easily}",!0)}else a.c8(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.ga6().gh())+"|fend<s> it off}",!0)
b.bR("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eF(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
x=a.ga8()?0:0.2
w=this.b.gb6()?0.3:0
if(a.Q===!0)return 0.6-x+w
return 0.3-x+w},
M:function(a,b){return a.aF(C.e)},
A:{
u3:[function(a){return new G.ll("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","rC",2,0,5]}},lm:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},ln:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cG(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
be:function(a,b,c){var z=new L.dK(null,null,null,null,null,null)
new L.qN(a,b,c).$1(z)
return z.p()},
fo:{"^":"cv;",
gaL:function(){return[F.rc(),G.rC(),X.r9()]},
gh:function(){return"SlashDefenseSituation"},
ar:function(){var z=new L.dK(null,null,null,null,null,null)
z.n(this)
new L.mL().$1(z)
return z.p()}},
qN:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.gj()
a.gaA().b=z
z=this.b.gj()
a.gaA().e=z
a.gaA().d=this.c
return a}},
mL:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
if(typeof z!=="number")return z.a4()
a.gaA().f=z+1
return a}},
os:{"^":"fo;d4:a<,j:b<,b8:c<,cI:d<,J:e<",
a1:function(a){var z=new L.dK(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fo))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dK:{"^":"d;a,b,c,d,e,f",
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
z=new L.os(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,M,{"^":"",
bC:function(a,b){var z=new M.dL(null,null,null,null,null)
new M.qP(a,b).$1(z)
return z.p()},
fp:{"^":"a2;",
gaL:function(){return[O.ri()]},
gh:function(){return"SlashSituation"},
ar:function(){var z=new M.dL(null,null,null,null,null)
z.n(this)
new M.mM().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.ag(this.a)
return},
aO:function(a,b){return new H.J(a,new M.mN(this),[H.m(a,0)])}},
qP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaV().c=z
a.gaV().e=0
z=this.a.gj()
a.gaV().b=z
z=this.b.gj()
a.gaV().d=z
return a}},
mM:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
if(typeof z!=="number")return z.a4()
a.gaV().e=z+1
return a}},
mN:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
ot:{"^":"fp;a,j:b<,c,J:d<",
a1:function(a){var z=new M.dL(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fp))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
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
z=new M.ot(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,Q,{"^":"",km:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gaf:function(){return""},
gai:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a3(z.gj(),new Q.kn())
c.fj(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga6())
z.aN(c,"<subject> die<s>",!0)
c.F(0,"\n\n",!0)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return this.b.gaa()&&a.aF(C.e)},
A:{
tX:[function(a){return new Q.km(null,!0,!0,!0,C.c,a,null)},"$1","rj",2,0,5]}},kn:{"^":"a:0;",
$1:function(a){a.sas(0)
return a}}}],["","",,K,{"^":"",lf:{"^":"H;T:c<,a2:d<,U:e<,O:f<,S:r<,b,a",
gh:function(){return"OnGroundParry"},
gaf:function(){return"parry it"},
gai:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.an(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.ga6().gh())+"}}")
S.aE(new K.lg(a,c),new K.lh(this,a,c),null,null)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){a.c8(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.ga6().gh())+"}",!0)
b.bR("FightSituation")
return H.b(a.cy)+" parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.3},
M:function(a,b){return a.aF(C.e)},
A:{
u2:[function(a){return new K.lf(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","rB",2,0,5]}},lg:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lh:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cG(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",m3:{"^":"H;S:c<,T:d<,a2:e<,U:f<,O:r<,b,a",
gh:function(){return"RollOutOfWay"},
gaf:function(){return"roll out of way"},
gai:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.an(c,"<subject> tr<ies> to roll out of the way")
a.aD(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gP",6,0,2],
W:[function(a,b,c){a.kb(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a3(a.gj(),new Y.m4())
a.c8(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bR("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbL())return 0
if(y.gb8()===C.j)return 1
if(a.gH()===!0)return 1
return 0.5},
M:function(a,b){return!0},
A:{
u8:[function(a){return new Y.m3(null,!1,!1,!0,C.c,a,null)},"$1","rH",2,0,5]}},m4:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,V,{"^":"",
dw:function(a,b,c){var z=new V.dv(null,null,null,null,null,null)
new V.qQ(a,b,c).$1(z)
return z.p()},
f5:{"^":"cv;",
gaL:function(){return[K.rB(),Y.rH()]},
gh:function(){return"OnGroundDefenseSituation"},
ar:function(){var z=new V.dv(null,null,null,null,null,null)
z.n(this)
new V.le().$1(z)
return z.p()}},
qQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.gj()
a.gay().b=z
z=this.b.gj()
a.gay().e=z
a.gay().d=this.c
return a}},
le:{"^":"a:0;",
$1:function(a){var z=a.gay().f
if(typeof z!=="number")return z.a4()
a.gay().f=z+1
return a}},
on:{"^":"f5;d4:a<,j:b<,b8:c<,cI:d<,J:e<",
a1:function(a){var z=new V.dv(null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f5))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dv:{"^":"d;a,b,c,d,e,f",
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
z=new V.on(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,D,{"^":"",
fA:function(a,b){var z=new D.dN(null,null,null,null,null)
new D.qR(a,b).$1(z)
return z.p()},
fz:{"^":"a2;",
gaL:function(){return[Q.rj()]},
gh:function(){return"StrikeDownSituation"},
ar:function(){var z=new D.dN(null,null,null,null,null)
z.n(this)
new D.nx().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.ag(this.a)
return},
aO:function(a,b){return new H.J(a,new D.ny(this),[H.m(a,0)])}},
qR:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaW().c=z
a.gaW().e=0
z=this.a.gj()
a.gaW().b=z
z=this.b.gj()
a.gaW().d=z
return a}},
nx:{"^":"a:0;",
$1:function(a){var z=a.gaW().e
if(typeof z!=="number")return z.a4()
a.gaW().e=z+1
return a}},
ny:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
ov:{"^":"fz;a,j:b<,c,J:d<",
a1:function(a){var z=new D.dN(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fz))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dN:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaW().c},
gJ:function(){return this.gaW().e},
gaW:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaW().b
x=this.gaW().c
w=this.gaW().d
v=this.gaW().e
z=new D.ov(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("targetOnGround"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",lF:{"^":"d;",
gbL:function(){return this.gb8()===C.o},
$isa2:1}}],["","",,K,{"^":"",dC:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",mO:{"^":"ab;T:b<,U:c<,a2:d<,O:e<,a",
gX:function(){return""},
gS:function(){return},
gh:function(){return"SlayMonstersAction"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gB(z):null
x=b.dv(y.gbr())
w=b.a
v=x.jT(b)
w.ap(0,v)
C.a.q(z,U.k3(new H.J(w,new D.mP(a,x),[H.m(w,0)]),v,x.r,y))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gR",6,0,2],
aj:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
return H.a4(z.length!==0?C.a.gB(z):null,"$isah").c}},mP:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gb5()){z=a.gbk()
y=this.a.gbk()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbr()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",nE:{"^":"cx;T:c<,a2:d<,U:e<,O:f<,b,a",
gS:function(){return},
gh:function(){return"TakeExitAction"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb3())
y=b.f
H.a4(y.length!==0?C.a.gB(y):null,"$isah").b7(b,a,z.gjc(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gR",6,0,2],
aj:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
if(H.a4(z.length!==0?C.a.gB(z):null,"$isah").c===!0)return!1
this.b.gjE()
return!0},
A:{
ub:[function(a){return new Y.nE(!1,!0,!1,null,a,null)},"$1","tF",2,0,47]}}}],["","",,F,{"^":"",
fh:function(a,b){var z=new F.dI(null,null,null,null,null)
new F.qC(a,b).$1(z)
return z.p()},
ah:{"^":"a2;",
gaL:function(){return[Y.tF()]},
gbp:function(){var z=[]
C.a.ap(z,$.$get$hp())
z.push($.$get$fq())
return z},
gh:function(){return"RoomRoamingSituation"},
ar:function(){var z=new F.dI(null,null,null,null,null)
z.n(this)
new F.m5().$1(z)
return z.p()},
aG:function(a,b){return b.a.bf(0,new F.m6(),new F.m7())},
aO:function(a,b){var z=this.aG(null,b)
if(z==null)return[]
return[z]},
fQ:function(a,b){a.a.i3(new F.m9(),!0)},
b7:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dv(c)
a.cF(this.b,F.fh(z,z.gjS()!=null))
d.iT()
z.c.$3(b,a,d)
d.F(0,"\n\n",!0)
for(y=R.hF(b,a),y=P.S(y,!0,H.x(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.as)(y),++v){u=a.ag(y[v].gj())
t=u.a1(new F.m8(z))
w.ao(0,u)
w.q(0,t)}},
dA:function(a){if(J.i(this.a,$.$get$ec().b))return!1
return!0}},
qC:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gav().c=z
a.gav().e=0
z=this.a.gh()
a.gav().b=z
a.gav().d=this.b
return a}},
m5:{"^":"a:0;",
$1:function(a){var z=a.gav().e
if(typeof z!=="number")return z.a4()
a.gav().e=z+1
return a}},
m6:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gb5()}},
m7:{"^":"a:1;",
$0:function(){return}},
m9:{"^":"a:0;",
$1:function(a){return!a.gbt()}},
m8:{"^":"a:0;a",
$1:function(a){a.sbr(this.a.b)
return a}},
or:{"^":"ah;br:a<,j:b<,c,J:d<",
a1:function(a){var z=new F.dI(null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.ah))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dI:{"^":"d;a,b,c,d,e",
gbr:function(){return this.gav().b},
sbr:function(a){this.gav().b=a
return a},
gj:function(){return this.gav().c},
sjU:function(a){this.gav().d=a
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
z=new F.or(y,x,w,v)
if(y==null)H.f(P.l("currentRoomName"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("monstersAlive"))
if(v==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,V,{"^":"",
nG:function(){var z=new V.dO(null,null,null)
new V.r_().$1(z)
return z.p()},
nR:function(){var z=new V.dP(null,null,null)
new V.qZ().$1(z)
return z.p()},
mT:function(){var z=new V.dM(null,null,null)
new V.qY().$1(z)
return z.p()},
qA:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The crevice is small.\n",!0)}},
qB:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qx:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'The journey from slavery to power begins with a single crack of a skull. Oddmund falls to the rock floor and his blond hair is quickly filled with blood. Above him, Agruth is grinning. He finds Oddmund\'s death funny. He always finds dying slaves funny.\n\n\nYou and Briana watch this in terror, unable to move.\n\n\nWhen the puddle of blood beneath Oddmund\'s head stops spreading, Agruth bends down to check the teeth in case there\'s gold in them. He stops when he notices you looking at him.\n\n\n"What the matter, human?" he says, smirking. "You have no work?"\n',!0)}},
qz:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qv:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten, but it has to be revived. There is no turning back now. [a][b][c][d][e]\n\n\nBriana kneels down to Oddmund. "Dead," she says plainly.\n\n\nOddmund was the leader among the slaves. He was the only one brave enough to steal the disgusting but precious food from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n',!0)}},
qw:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
kp:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.eo(b,new V.kq())
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gT:function(){return!1}},
kq:{"^":"a:0;",
$1:function(a){var z
a.gbH()
z=a.b
a.gbH()
a.b=z+1
return a}},
kr:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.eo(b,new V.ks())
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
N:function(a,b){return 0.7},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gT:function(){return!1}},
ks:{"^":"a:0;",
$1:function(a){var z
a.gbH()
z=a.b
a.gbH()
a.b=z+1
return a}},
mF:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"start_of_book"))return!1
if(b.iG(this.d))return!1
return!0},
W:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.ro(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gT:function(){return!1}},
qt:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
qu:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qr:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
qs:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qp:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a4(b.c,"$isbU").b>=1)c.F(0,"You hear orders being yelled somewhere behind you.",!0)
c.F(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
qq:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qm:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a4(b.c,"$isbU").b>=1)c.F(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.F(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
qo:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qk:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The crevice is small.\n",!0)}},
ql:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qi:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
qj:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
qg:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iH("sneak_onto_cart"))c.F(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.F(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.F(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
qh:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
qe:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
qf:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
r3:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
qd:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The stone gate looms before you.\n",!0)}},
mQ:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"mountain_pass_gate"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.eo(b,new V.mR())
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gT:function(){return!1}},
mR:{"^":"a:0;",
$1:function(a){a.gbH()
a.a=!0
return a}},
nF:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"mountain_pass_gate"))return!1
if(b.kj(this.d)!=null)return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a3(a.gj(),new V.nO())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.nG())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
N:function(a,b){return 0.5},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gT:function(){return!1}},
nO:{"^":"a:0;",
$1:function(a){var z=a.gbm()
if(typeof z!=="number")return z.a4()
a.sbm(z+10)
return a}},
fE:{"^":"a2;",
gbp:function(){return[new A.bB(new V.nJ(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bB(new V.nK(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ar:function(){var z=new V.dO(null,null,null)
z.n(this)
new V.nL().$1(z)
return z.p()},
aG:function(a,b){if(a!==0)return
return b.a.aI(0,new V.nM())},
aO:function(a,b){return[a.aI(0,new V.nN())]}},
r_:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.ga5().b=z
a.ga5().c=0
return a}},
nJ:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aN(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a3(a.gj(),new V.nH())
b.a3(a.gj(),new V.nI())
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
nH:{"^":"a:0;",
$1:function(a){var z=a.gb_()
if(typeof z!=="number")return z.aJ()
a.sb_(z-1)
return a}},
nI:{"^":"a:0;",
$1:function(a){var z=a.gbm()
if(typeof z!=="number")return z.a4()
a.sbm(z+10)
return a}},
nK:{"^":"a:8;",
$4:function(a,b,c,d){J.aN(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.ev()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
nL:{"^":"a:0;",
$1:function(a){var z=a.ga5().c
if(typeof z!=="number")return z.a4()
a.ga5().c=z+1
return a}},
nM:{"^":"a:0;",
$1:function(a){return a.gH()}},
nN:{"^":"a:0;",
$1:function(a){return a.gH()}},
r1:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
r2:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
qU:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
r0:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
nP:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.nR())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.3},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gT:function(){return!1}},
fJ:{"^":"a2;",
gbp:function(){return[new A.bB(new V.nT(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bB(new V.nU(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ar:function(){var z=new V.dP(null,null,null)
z.n(this)
new V.nV().$1(z)
return z.p()},
aG:function(a,b){if(a!==0)return
return b.a.aI(0,new V.nW())},
aO:function(a,b){return[a.aI(0,new V.nX())]}},
qZ:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.ga5().b=z
a.ga5().c=0
return a}},
nT:{"^":"a:8;",
$4:function(a,b,c,d){J.aN(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
b.ev()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nU:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aN(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.nS())
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nS:{"^":"a:0;",
$1:function(a){a.sas(0)
return a}},
nV:{"^":"a:0;",
$1:function(a){var z=a.ga5().c
if(typeof z!=="number")return z.a4()
a.ga5().c=z+1
return a}},
nW:{"^":"a:0;",
$1:function(a){return a.gH()}},
nX:{"^":"a:0;",
$1:function(a){return a.gH()}},
mS:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.mT())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.8},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gT:function(){return!1}},
fs:{"^":"a2;",
gbp:function(){return[new A.bB(new V.mV(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bB(new V.mW(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ar:function(){var z=new V.dM(null,null,null)
z.n(this)
new V.mX().$1(z)
return z.p()},
aG:function(a,b){if(a!==0)return
return b.a.aI(0,new V.mY())},
aO:function(a,b){return[a.aI(0,new V.mZ())]}},
qY:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.ga5().b=z
a.ga5().c=0
return a}},
mV:{"^":"a:8;",
$4:function(a,b,c,d){J.aN(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
b.ev()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
mW:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aN(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.mU())
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
mU:{"^":"a:0;",
$1:function(a){a.sas(0)
return a}},
mX:{"^":"a:0;",
$1:function(a){var z=a.ga5().c
if(typeof z!=="number")return z.a4()
a.ga5().c=z+1
return a}},
mY:{"^":"a:0;",
$1:function(a){return a.gH()}},
mZ:{"^":"a:0;",
$1:function(a){return a.gH()}},
nQ:{"^":"aF;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
aj:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Perhaps you can divert its attention."},
gT:function(){return!1}},
qy:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
qJ:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
qc:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
qn:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
ow:{"^":"fE;j:a<,J:b<",
a1:function(a){var z=new V.dO(null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fE))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dO:{"^":"d;a,b,c",
gj:function(){return this.ga5().b},
gJ:function(){return this.ga5().c},
ga5:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga5().b
x=this.ga5().c
z=new V.ow(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.n(z)
return z}},
oy:{"^":"fJ;j:a<,J:b<",
a1:function(a){var z=new V.dP(null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fJ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dP:{"^":"d;a,b,c",
gj:function(){return this.ga5().b},
gJ:function(){return this.ga5().c},
ga5:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga5().b
x=this.ga5().c
z=new V.oy(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.n(z)
return z}},
ou:{"^":"fs;j:a<,J:b<",
a1:function(a){var z=new V.dM(null,null,null)
z.n(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fs))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dM:{"^":"d;a,b,c",
gj:function(){return this.ga5().b},
gJ:function(){return this.ga5().c},
ga5:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga5().b
x=this.ga5().c
z=new V.ou(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.n(z)
return z}}}],["","",,N,{"^":"",
ul:[function(a){return[N.e6(),N.hg()]},"$1","tJ",2,0,11],
um:[function(a){return[R.b5(1000+$.$get$cZ().a9(999999),"Agruth",null,null,new G.c6("scimitar",1,P.bv(C.r,null)),null,0,2,100,!1,2,!0,C.t,0,$.$get$ce())]},"$1","tK",2,0,11],
aA:function(a){return a.giJ().aI(0,new N.rm())},
ro:function(a,b){a.a3(N.aA(a).gj(),new N.rp(b))},
up:[function(a){if(a.fg("take_out_gate_guards")||a.fg("take_out_gate_guards_rescue"))return[N.e6()]
else return[N.e6(),N.hg()]},"$1","tL",2,0,11],
eo:function(a,b){var z,y
z=H.a4(a.c,"$isbU")
z.toString
y=new M.dT(null,!1,0)
y.n(z)
a.c=b.$1(y).p()},
hg:function(){return R.b5(1000+$.$get$cZ().a9(999999),"goblin",O.d2(),null,new G.c6("scimitar",1,P.bv(C.r,null)),null,0,1,0,!1,1,!1,C.t,0,$.$get$ce())},
e6:function(){return R.b5(1000+$.$get$cZ().a9(999999),"orc",O.d2(),null,new G.c6("sword",1,P.bv(C.r,null)),null,0,2,0,!1,2,!1,C.t,0,$.$get$ce())},
rm:{"^":"a:0;",
$1:function(a){return a.gH()}},
rp:{"^":"a:0;a",
$1:function(a){var z=a.gb_()
if(typeof z!=="number")return z.a4()
a.sb_(z+this.a)
return a}}}],["","",,O,{"^":"",
uk:[function(a){var z,y
z=$.$get$d5()
y=z.v
if(y.length>0){y+=" "
z.v=y}z.v=y+a},"$1","rJ",2,0,15],
un:[function(a){$.ef=a},"$1","rK",2,0,15],
hv:[function(a,b,c,d,e,f,g){var z=L.ez(a,!1,!1,d,e,f,g)
$.$get$bM().q(0,z)
return z},function(a){return O.hv(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hv(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","rI",2,13,50,0,0,0,1,1,0],
mg:{"^":"ms;",
bl:function(){var z=0,y=P.au(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bl=P.aq(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cQ){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.C())
m=t.Q
n=Z.n4()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.C()
m.a.E(l.C())
new P.C(0,$.p,null,[null]).bn(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.C())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.ca(0)
m.a.E(n.C())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.C())
w=7
z=10
return P.ap(t.cj(),$async$bl)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.co){r=n
q=H.A(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.r(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.E(l.C())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.r(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.E(l.C())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.i(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.C())
case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$bl,y)},
ex:function(){var z,y
this.f1()
this.f.aX(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fX(Z.bE())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bE()
z.a.E(y.C())
this.bl()},
kB:[function(a){var z,y
z={}
z.a=null
y=$.$get$bM()
y.L(0,new O.mD(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.im(z)
this.bl()},"$1","gi5",2,0,31],
im:function(a){var z
if(a.gfw()!=null){z=a.r
$.$get$cc().at(z)}z=a.x
if(z!=null)this.e3(z)},
cj:function(){var z=0,y=P.au(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cj=P.aq(function(a,a0){if(a===1)return P.aw(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cd()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.r(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.C())
p=r.b.dg()
r=v.Q
q=p.giV()
u=p.b
o=p.c
r.toString
n=new A.r(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.C())
r=new P.C(0,$.p,null,[null])
r.bn(null)
r.bS(new O.mt(v))
x=!0
z=1
break}m=v.x===v.e.gaq().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gaq().length){r=v.e.gaq()
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
o.a.E(k.C())
k=$.$get$bM()
k.i2(new O.mu(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.r(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.C())
o=H.x(k,"b_",0)
o=P.S(new H.J(k,new O.mv(u,l),[o]),!0,o)
r=k.a
H.t([],[L.a1])
j=new L.eA(r,o)
if(!j.gK(j)){u=v.Q
r=u.e
if(r!=null){r.d7(new D.bS("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.c7(new P.C(0,$.p,null,[r]),[r])
r=j.dl()
u.a.E(r.C())
u=u.e.a.bS(v.gi5())
i=new O.mw(v)
r=H.m(u,0)
q=$.p
if(q!==C.h){i=P.e7(i,q)
q.toString}u.cU(new P.e_(null,new P.C(0,q,null,[r]),6,new O.mx(),i,[r,r]))
x=!0
z=1
break}else{h=k.bf(0,new O.my(),new O.mz())
if(h!=null){if(h.gfw()!=null){r=h.r
$.$get$cc().at(r)}r=h.x
if(r!=null)v.e3(r)
k.ao(0,h)}}}r=$.$get$cc()
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
return P.ap(v.cl(f),$async$cj)
case 5:x=a0
z=1
break
case 4:r=$.ef
if(r!=null){v.e3(r)
$.ef=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaq().length-1
v.x=r}else if($.hj)$.hj=!1
else{++r
v.x=r}u.a=r===v.e.gaq().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.r(667,null,null,null,null)
o.c=r
q.a.E(o.C())
if(v.x===v.e.gaq().length){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="End of book."
u.a.E(r.C())
r=v.Q
u=v.dM()
r.toString
u=u.eA(50)
r.a.E(u.C())
v.Q.a.E(new A.r(80,null,null,null,null).C())
x=!0
z=1
break}r=v.e.gaq()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gaq()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.X
u.f=new P.c7(new P.C(0,$.p,null,[r]),[r])
r=new A.r(30,null,null,null,null)
r.c=q
u.a.E(r.C())
u.f.a.bS(new O.mA(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gaq()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.n(r[q]).$isI?9:11
break
case 9:r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.C())
try{r=v.e.gaq()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.iS(r[q])}catch(b){u=H.z(b)
if(u instanceof M.co){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.r(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.E(q.C())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="- choices added"
r.a.E(q.C())
if(k.bM(0,new O.mB(u,v))&&v.x===v.e.gaq().length-1){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.C())
r=v.Q
u=v.dM()
r.toString
u=u.eA(50)
r.a.E(u.C())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gaq()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.M,P.am]}
z=H.ar(q,r)?12:14
break
case 12:d=v.x===v.e.gaq().length-1?v.dM():null
q=v.e.gaq()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.ap(v.cl(H.hB(q[o],r)),$async$cj)
case 15:c=a0
if(k.bM(0,new O.mC(u,v))&&v.x===v.e.gaq().length-1){u=v.Q
u.toString
r=d.eA(50)
u.a.E(r.C())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaq()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.E("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.ax(x,y)}})
return P.ay($async$cj,y)},
e3:function(a){var z,y,x,w,v
z=$.$get$cs()
if(z.b.test(H.bm(a))){y=this.d
if(y==null)throw H.c(new P.E("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aJ()
w=z-1}else{x=this.b.du(a,this.e.gdw())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.Y(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.gh9()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gh9()
else z=!1}else z=!1
$.hh=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.E(v.C())
v=this.e
this.d=new O.mh(v,this.x)
this.e=x
this.x=w
v.e=J.aj(v.gdn(),1)},
f1:function(){var z,y,x,w,v,u
this.x=null
$.$get$cc().aX(0)
$.$get$bM().sl(0,0)
$.pU=null
x=$.$get$ch()
x.aX(0)
w=$.$get$cd()
x.m(0,"points",w)
w.a=0
w.b.aX(0)
this.b.iY()
$.hK=!0
try{this.jy()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.C())
throw H.c(z)}this.fV()
$.hK=!1},
cl:function(a){var z=0,y=P.au(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cl=P.aq(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d5()
q.v=""
w=4
z=7
return P.ap(a.$0(),$async$cl)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.v+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.co(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.v.length!==0){t.Q.eG(J.h(q)).bS(new O.mE(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$cl,y)},
ic:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cs().b.test(H.bm(z)))return!1
y=this.b.du(z,this.e.gdw())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.E(w.C())
return!0}y.gks()
return!1},"$1","gf5",2,0,32],
dM:function(){var z,y,x,w,v,u
this.fV()
try{x=this.e.gh()
w=$.$get$ch()
x=new Z.fi(x,this.b.ji(),null,null,null,null)
x.c=H.aB(Z.cM(w),"$isD",[P.q,P.d],"$asD")
x.f=Date.now()
x.e=C.d.kp(H.av(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.C())
throw H.c(z)}},
fJ:function(a,b){var z,y,x
this.f1()
z=this.b
y=z.a
if(y.i(0,a.a)==null)throw H.c(new Z.dh("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.i(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.C())
z.jv(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.C())
this.f.ap(0,b)}z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.C())
y=$.$get$ch()
Z.md(a,y,P.dp(P.q,P.bu))
this.cx=H.a4(y.i(0,"game"),"$iseH")
this.cy=H.aB(y.i(0,"hitpoints"),"$isan",[P.aM],"$asan")
z=[P.u]
this.db=H.aB(y.i(0,"stamina"),"$isan",z,"$asan")
this.dx=H.aB(y.i(0,"gold"),"$isan",z,"$asan")
z=this.Q
Z.fX(Z.bE())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bE()
z.a.E(y.C())
y=this.Q
y.toString
z=new A.r(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.E(z.C())
this.bl()},
jN:function(a){return this.fJ(a,null)},
dB:[function(a,b,c,d){var z=0,y=P.au(),x,w=this,v,u,t
var $async$dB=P.aq(function(e,f){if(e===1)return P.aw(f,y)
while(true)switch(z){case 0:v=$.$get$d5()
if(v.v.length!==0){w.Q.eG(J.h(v))
v.v=""}v=w.Q
v.toString
u=new A.r(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.C())
u=U.c4
t=new P.C(0,$.p,null,[u])
v.x=new P.c7(t,[u])
x=t
z=1
break
case 1:return P.ax(x,y)}})
return P.ay($async$dB,y)},function(a,b){return this.dB(a,b,null,!1)},"kx","$4$rerollEffectDescription$rerollable","$2","ghu",4,5,43,1,0]},
mD:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seH(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.E(x.C())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cs().b.test(H.bm(z))?y.d.a:y.b.du(z,y.e.gdw())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
mt:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
mu:{"^":"a:0;a",
$1:function(a){return a.geH()||this.a.ic(a)}},
mv:{"^":"a:34;a,b",
$1:function(a){return a.jF(this.b,this.a.a)}},
mw:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.E(x.C())
return}},
mx:{"^":"a:0;",
$1:function(a){return a instanceof D.bS}},
my:{"^":"a:0;",
$1:function(a){return a.gjG()}},
mz:{"^":"a:1;",
$0:function(){return}},
mA:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
mB:{"^":"a:0;a,b",
$1:function(a){return a.d9(!0,this.a.a,this.b.gf5())}},
mC:{"^":"a:0;a,b",
$1:function(a){return a.d9(!0,this.a.a,this.b.gf5())}},
mE:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
lB:{"^":"d;a,b,fq:c<",
iM:function(a,b,c){var z
if(!$.hh){z=J.aj(this.a,b)
this.a=z
this.b.at(new A.cF(b,z,c))}},
q:function(a,b){return this.iM(a,b,null)},
a4:function(a,b){this.q(0,b)
return this},
C:function(){return P.ae(["points",this.a])},
h8:function(a){this.a=a.i(0,"points")
this.b.aX(0)},
hD:function(){this.b=P.b0(null,A.cF)},
$isdJ:1},
cN:{"^":"lk;aq:d<,dn:e@,a,b,c",
gh9:function(){return J.a0(this.e,0)}},
mh:{"^":"d;a,b"},
mo:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
du:function(a,b){var z
if(b!=null&&this.a.a0(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a0(a))return z.i(0,a)
else return}},
m:function(a,b,c){this.a.m(0,b,c)
c.sh(b)},
ji:function(){var z=new H.N(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.mq(z))
return z},
jv:function(a){a.L(0,new O.mr(this))},
iY:function(){this.a.L(0,new O.mp())}},
mq:{"^":"a:7;a",
$2:function(a,b){this.a.m(0,a,P.ae(["visitCount",b.gdn()]))}},
mr:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a0(a))z.i(0,a).sdn(J.at(b,"visitCount"))}},
mp:{"^":"a:7;",
$2:function(a,b){b.sdn(0)}}}],["","",,M,{"^":"",co:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eu:function(a){return new M.co(a,null,null)}}}}],["","",,M,{"^":"",ms:{"^":"d;"}}],["","",,Z,{"^":"",fi:{"^":"d;a,b,c,d,e,f",
eA:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.r(a,null,null,null,null)
z.c=this.dk()
return z},
dk:function(){var z,y
z=new H.N(0,null,null,null,null,null,0,[P.q,null])
z.m(0,"uid",this.e)
z.m(0,"currentPageName",this.a)
z.m(0,"pageMapState",this.b)
z.m(0,"vars",this.c)
z.m(0,"timestamp",this.f)
y=this.d
if(y!=null)z.m(0,"previousText",y)
return C.w.fv(z)},
k:function(a){return this.dk()},
A:{
fj:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.n(a)
z=!!z.$isI||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.n(a).$isdJ},
cM:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fj(z.i(a,x)))y.push(Z.cM(z.i(a,x)))
return y}else if(!!z.$isD){w=new H.N(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mc(a,w))
return w}else if(!!z.$isdJ){v=a.C()
v.m(0,"_class",a.gfq())
return Z.cM(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cL:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cL(z.i(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.a0("_class")){v=new H.N(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mb(b,v))
return v}else if(w&&a.a0("_class"))if(c!=null){c.h8(a)
return c}else{u=z.i(a,"_class")
if(!b.a0(u))throw H.c(new Z.dh("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
md:function(a,b,c){a.c.L(0,new Z.me(b,c))}}},mc:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fj(this.a.i(0,a)))this.b.m(0,a,Z.cM(b))}},mb:{"^":"a:7;a,b",
$2:function(a,b){this.b.m(0,a,Z.cL(b,this.a,null))}},me:{"^":"a:35;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.m(0,a,Z.cL(b,x,null))
else z.m(0,a,Z.cL(b,x,y))}},dh:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},kv:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",lH:{"^":"d;"},lG:{"^":"lH;"},kD:{"^":"lG;a,b,c,d,e,f,r,x",
kF:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aB(a,"$isD",n,"$asD")
m=new A.r(a.i(0,"type"),null,null,null,null)
if(a.a0("strContent"))m.c=a.i(0,"strContent")
if(a.a0("listContent"))m.b=a.i(0,"listContent")
if(a.a0("intContent"))m.d=a.i(0,"intContent")
if(a.a0("mapContent"))m.e=H.aB(a.i(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.gh6()){case 1070:o=this.e
if(o!=null){o.d7(new D.bS("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bd()
o.b.bd()
return
case 1000:o=new A.r(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.E(o.C())
n.E(new A.r(10,null,this.c.ch,null,null).C())
return
case 1050:l=z.gjz()
this.e.bN(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.C())
o=z.gjP()
if(!o.a0("__submitted__"))o.m(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.f(n.cd())
n.bI(new G.jj(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.C())
k=J.at(z.ger(),0)
j=J.at(z.ger(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.A,k)
o.bN(new U.c4(C.A[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.C())
o=this.e
if(o!=null){o.d7(new D.bS("Book Restart before choice was selected."))
this.e=null}try{this.c.ex()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.C())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bE()
n.E(o.C())
n.E(new A.cF(0,0,null).dl().C())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.C())
h=this.e
if(h!=null){h.d7(new D.bS("Book Load before choice was selected."))
this.e=null}try{h=z.ghy()
f=new Z.fi(null,null,null,null,null,null)
e=H.aB(C.w.j4(h),"$isD",n,"$asD")
if(!e.a0("currentPageName")||!e.a0("vars"))H.f(new Z.kv("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aB(e.i(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.aB(e.i(0,"vars"),"$isD",n,"$asD")
if(e.a0("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aB(J.ik(z.ger()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.fJ(w,v)
else o.jN(w)}catch(i){o=H.z(i)
if(o instanceof Z.dh){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.C())
this.c.ex()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.C())
this.c.ex()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bE()
g.E(o.C())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.C())
throw H.c(q)}this.c.toString
g.E(new A.cF(0,$.$get$cd().a,null).dl().C())
return
case 1090:this.f.bN(!0)
this.f=null
return
case 1040:this.c.bl()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gh6())+"."
this.a.E(o.C())}},"$1","gik",2,0,21],
eG:function(a){var z=P.X
this.f=new P.c7(new P.C(0,$.p,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.E(z.C())
return this.f.a}},bS:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jj:{"^":"d;a",
C:function(){return P.c_(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;h6:a<,er:b<,hy:c<,jz:d<,jP:e<",
gkr:function(){var z=this.a
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
dk:function(){return C.w.fv(this.C())},
C:function(){var z,y
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
z="Message "+this.gkr()
y=this.a
x=J.n(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",lk:{"^":"d;h:a@,ks:b<",
k:function(a){return this.a},
gdw:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.id(z,": ")
if(y>0)return J.ij(this.a,0,y)
else return}}}],["","",,A,{"^":"",cF:{"^":"d;iV:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dl:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a1:{"^":"d;eH:a@,b,c,d,aQ:e<,S:f<,fw:r<,x,y",
gjG:function(){return this.e.length===0},
d9:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jF:function(a,b){return this.d9(a,b,null)},
kn:function(){return P.ae(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bS:function(a){this.r=a
return this},
bq:function(a,b){return C.b.bq(this.e,b.gaQ())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hB:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bn(a).h5(a)
this.d=C.b.gw(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.a1]},
A:{
ez:function(a,b,c,d,e,f,g){var z=new L.a1(!1,null,null,null,null,e,null,d,g)
z.hB(a,!1,!1,d,e,f,g)
return z}}},eA:{"^":"eZ;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
iS:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.at(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.n(a[0]).$isbu}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eu(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.M,P.am]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.at(y,"string")!=null&&!!J.n(J.at(y,"string")).$isbu)try{x=J.at(y,"string").$0()}catch(u){w=H.z(u)
v=M.eu(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.at(y,"goto")
p=H.hB(J.at(y,"script"),t)
o=new L.a1(!1,null,null,null,null,null,null,q,J.at(y,"submenu"))
if(r==null)H.f(P.G("String given to choice cannot be null."))
o.e=J.bn(r).h5(r)
o.d=C.b.gw(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
iQ:function(a,b,c,d,e,f,g){if(b instanceof L.a1)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.ez(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.iQ(a,b,!1,!1,null,null,null)},
ko:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.S(new H.J(z,new L.iZ(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.r(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.L(x,new L.j_(w))
return w},
dl:function(){return this.ko(null,null,null,null)},
k:function(a){var z=this.b
return new H.al(z,new L.j0(),[H.m(z,0),null]).cC(0,", ")},
$aseZ:function(){return[L.a1]},
$asf3:function(){return[L.a1]},
$asI:function(){return[L.a1]},
$asU:function(){return[L.a1]}},iZ:{"^":"a:0;a,b,c",
$1:function(a){return a.d9(this.b,this.a,this.c)}},j_:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aN(this.a.b,a.kn())
a.a=!0}},j0:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cO:{"^":"d;cS:a<,aQ:b<",
C:function(){return P.ae(["show",this.a,"string",this.b])}},n1:{"^":"d;a",
C:function(){var z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.n2(z))
return z},
L:function(a,b){this.a.L(0,b)}},n2:{"^":"a:36;a",
$2:function(a,b){this.a.m(0,a,b.C())}},fW:{"^":"d;h:a@,b3:b<,fs:c<,de:d<,cS:e<,fP:f<,aQ:r<",A:{
fX:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t(new Array(a.length),[Z.fW])
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
z[w]=new Z.fW(s,r,q,p,o,n,t);++w}C.a.cT(z,new Z.o3())
return z}}},o3:{"^":"a:7;",
$2:function(a,b){return J.bp(b.gde(),a.gde())}},an:{"^":"d;h:a<,b3:b<,c,fs:d<,de:e<,f,r,fP:x<,fo:y@,fq:z<,$ti",
gae:function(){return this.f},
sae:function(a){if(!J.i(this.f,a)){this.f=a
this.y=!0
$.cQ=!0}},
gcS:function(){return this.r},
gaQ:function(){return this.c.$1(this.f)},
C:function(){return P.ae(["name",this.a,"value",this.f,"show",this.r])},
h8:function(a){var z
this.sae(H.i_(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.i(this.r,z)){this.r=z
this.y=!0
$.cQ=!0}},
$isdJ:1,
A:{
bD:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cP()
y=z.a0(a)?H.aB(z.i(0,a),"$isan",[h],"$asan"):new Z.an(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.i_(e,h)
y.r=!0
z.m(0,a,y)
return y},
n4:function(){var z,y
z=new Z.n1(new H.N(0,null,null,null,null,null,0,[P.q,Z.cO]))
y=$.$get$cP().gcb()
new H.J(y,new Z.n5(),[H.x(y,"y",0)]).L(0,new Z.n6(z))
$.cQ=!1
return z},
bE:function(){var z=H.t([],[[P.D,P.q,P.d]])
$.$get$cP().gcb().L(0,new Z.n3(z))
return z}}},n5:{"^":"a:0;",
$1:function(a){return a.gfo()}},n6:{"^":"a:23;a",
$1:function(a){var z,y
z=a.gcS()
y=a.gaQ()
a.sfo(!1)
this.a.a.m(0,a.a,new Z.cO(z,y))}},n3:{"^":"a:23;a",
$1:function(a){var z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"name",a.gh())
z.m(0,"description",a.gb3())
z.m(0,"color",a.gfs())
z.m(0,"priority",a.gde())
z.m(0,"show",a.gcS())
z.m(0,"notifyOnChange",a.gfP())
z.m(0,"string",a.gaQ())
this.a.push(z)}}}],["","",,N,{"^":"",dr:{"^":"d;h:a<,b,c,hU:d<,e,f",
gfB:function(){var z,y,x
z=this.b
y=z==null||J.i(z.gh(),"")
x=this.a
return y?x:z.gfB()+"."+x},
geq:function(){if($.hI){var z=this.b
if(z!=null)return z.geq()}return $.q0},
jO:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geq().b){if(!!J.n(b).$isbu)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.rG.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfB()
t=c
s=d
r=Date.now()
q=$.f_
$.f_=q+1
p=new N.l0(a,x,v,w,new P.cu(r,!1),q,t,s,e)
if($.hI)for(o=this;o!=null;){o.f8(p)
o=o.b}else $.$get$f1().f8(p)}},
c4:function(a,b,c,d){return this.jO(a,b,c,d,null)},
jl:function(a,b,c){return this.c4(C.Q,a,b,c)},
a7:function(a){return this.jl(a,null,null)},
jk:function(a,b,c){return this.c4(C.P,a,b,c)},
b4:function(a){return this.jk(a,null,null)},
jj:function(a,b,c){return this.c4(C.R,a,b,c)},
bE:function(a){return this.jj(a,null,null)},
jx:function(a,b,c){return this.c4(C.z,a,b,c)},
fH:function(a){return this.jx(a,null,null)},
kt:function(a,b,c){return this.c4(C.U,a,b,c)},
eB:function(a){return this.kt(a,null,null)},
ht:function(a,b,c){return this.c4(C.T,a,b,c)},
dz:function(a){return this.ht(a,null,null)},
f8:function(a){},
A:{
b8:function(a){return $.$get$f0().k0(a,new N.qG(a))}}},qG:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dD(z,"."))H.f(P.G("name shouldn't start with a '.'"))
y=C.b.jL(z,".")
if(y===-1)x=z!==""?N.b8(""):null
else{x=N.b8(C.b.ax(z,0,y))
z=C.b.bB(z,y+1)}w=new H.N(0,null,null,null,null,null,0,[P.q,N.dr])
w=new N.dr(z,x,null,w,new P.fZ(w,[null,null]),null)
if(x!=null)x.ghU().m(0,z,w)
return w}},aQ:{"^":"d;h:a<,ae:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aQ&&this.b===b.b},
aH:function(a,b){return C.d.aH(this.b,b.gae())},
bW:function(a,b){return C.d.bW(this.b,b.gae())},
bA:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.w(z)
return this.b>z},
bG:function(a,b){return this.b>=b.gae()},
bq:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.w(z)
return this.b-z},
gw:function(a){return this.b},
k:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aQ]}},l0:{"^":"d;eq:a<,b,aC:c<,d,J:e<,f,be:r<,bc:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bo:function(a){return X.cY(J.ia(a,0,new X.rq()))},
aU:function(a,b){var z=J.aj(a,b)
if(typeof z!=="number")return H.w(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cY:function(a){if(typeof a!=="number")return H.w(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rq:{"^":"a:7;",
$2:function(a,b){return X.aU(a,J.j(b))}}}],["","",,U,{"^":"",cK:{"^":"d;a,b",
k:function(a){return this.b}},c4:{"^":"d;a,ku:b<",
gen:function(){return this.a===C.C},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.c4&&b.a===this.a&&J.i(b.b,this.b)},
gw:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
uo:[function(a,b){var z,y,x,w,v
z=new D.kD(b,null,null,null,null,null,null,null)
y=$.ff
$.ff=y+1
x=new H.c2(y,null,!1)
w=init.globalState.d
w.dG(y,x)
w.cr()
w=new H.lY(x,null)
w.hE(x)
z.b=w
w=w.b
w.toString
new P.cS(w,[H.m(w,0)]).aw(z.gik(),null,null,null)
b.E(new H.ca(z.b.a,init.globalState.d.a))
v=N.mj()
z.c=v
v.Q=z},"$2","hw",4,0,33]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eS.prototype
return J.kF.prototype}if(typeof a=="string")return J.bZ.prototype
if(a==null)return J.eT.prototype
if(typeof a=="boolean")return J.eR.prototype
if(a.constructor==Array)return J.bX.prototype
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.aV=function(a){if(a==null)return a
if(a.constructor==Array)return J.bX.prototype
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.K=function(a){if(typeof a=="string")return J.bZ.prototype
if(a==null)return a
if(a.constructor==Array)return J.bX.prototype
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.a9=function(a){if(typeof a=="number")return J.bY.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.ee=function(a){if(typeof a=="number")return J.bY.prototype
if(typeof a=="string")return J.bZ.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.bn=function(a){if(typeof a=="string")return J.bZ.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.aj=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ee(a).a4(a,b)}
J.aW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.a9(a).cO(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).u(a,b)}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a9(a).bA(a,b)}
J.bQ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a9(a).aH(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ee(a).bX(a,b)}
J.i8=function(a){if(typeof a=="number")return-a
return J.a9(a).eE(a)}
J.bp=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a9(a).aJ(a,b)}
J.at=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).i(a,b)}
J.aN=function(a,b){return J.aV(a).q(a,b)}
J.ci=function(a,b){return J.ee(a).bq(a,b)}
J.i9=function(a,b){return J.K(a).Y(a,b)}
J.ep=function(a,b){return J.aV(a).al(a,b)}
J.ia=function(a,b,c){return J.aV(a).bg(a,b,c)}
J.j=function(a){return J.n(a).gw(a)}
J.eq=function(a){return J.K(a).gK(a)}
J.ak=function(a){return J.aV(a).gZ(a)}
J.ib=function(a){return J.aV(a).gB(a)}
J.aC=function(a){return J.K(a).gl(a)}
J.ic=function(a){return J.n(a).gbj(a)}
J.id=function(a,b){return J.K(a).bs(a,b)}
J.er=function(a,b){return J.aV(a).aY(a,b)}
J.ie=function(a,b,c){return J.bn(a).fK(a,b,c)}
J.ig=function(a,b,c){return J.bn(a).k8(a,b,c)}
J.ih=function(a){return J.a9(a).h0(a)}
J.ii=function(a,b){return J.aV(a).dC(a,b)}
J.d6=function(a,b){return J.bn(a).dD(a,b)}
J.ij=function(a,b,c){return J.bn(a).ax(a,b,c)}
J.ik=function(a){return J.aV(a).bx(a)}
J.h=function(a){return J.n(a).k(a)}
J.cj=function(a,b){return J.a9(a).bT(a,b)}
J.il=function(a,b){return J.aV(a).bV(a,b)}
I.bN=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.I=J.aO.prototype
C.a=J.bX.prototype
C.K=J.eR.prototype
C.d=J.eS.prototype
C.u=J.eT.prototype
C.k=J.bY.prototype
C.b=J.bZ.prototype
C.D=new A.ac(0,0,0)
C.E=new A.ac(-1/0,-1/0,-1/0)
C.F=new A.cl(-10,0,100)
C.G=new P.lj()
C.v=new P.oU()
C.H=new P.pc()
C.h=new P.pr()
C.x=new P.aY(0)
C.J=new U.di(0,"ItemType.spear")
C.e=new U.di(1,"ItemType.sword")
C.y=new U.di(2,"ItemType.fist")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.kJ(null,null)
C.M=new P.kL(null)
C.N=new P.kM(null,null)
C.O=new O.kT(0,"KnownToMode.all")
C.P=new N.aQ("FINER",400)
C.Q=new N.aQ("FINEST",300)
C.R=new N.aQ("FINE",500)
C.z=new N.aQ("INFO",800)
C.S=new N.aQ("OFF",2000)
C.T=new N.aQ("SEVERE",1000)
C.U=new N.aQ("WARNING",900)
C.C=new U.cK(0,"Result.success")
C.Z=new U.cK(1,"Result.failure")
C.a_=new U.cK(2,"Result.criticalSuccess")
C.a0=new U.cK(3,"Result.criticalFailure")
C.A=I.bN([C.C,C.Z,C.a_,C.a0])
C.r=I.bN([C.e])
C.V=I.bN([C.y])
C.f=I.bN([])
C.W=new H.j9(0,{},C.f,[null,null])
C.l=new R.dB(0,"Pose.standing")
C.i=new R.dB(1,"Pose.offBalance")
C.m=new R.dB(2,"Pose.onGround")
C.p=new K.dC(0,"Predetermination.none")
C.j=new K.dC(1,"Predetermination.successGuaranteed")
C.o=new K.dC(2,"Predetermination.failureGuaranteed")
C.t=new Y.c0("he","him","his","himself")
C.q=new Y.c0("it","it","its","itself")
C.X=new Y.c0("she","her","her","herself")
C.Y=new Y.c0("they","them","their","themselves")
C.B=new Y.c0("you","you","your","yourself")
C.c=new Q.m2(0,"Resource.stamina")
C.a1=H.b3("eU")
C.a2=H.b3("am")
C.a3=H.b3("q")
C.a4=H.b3("X")
C.a5=H.b3("aM")
C.n=H.b3("dynamic")
C.a6=H.b3("u")
C.a7=H.b3("L")
C.a8=new P.bG(null,2)
$.ff=1
$.f8="$cachedFunction"
$.f9="$cachedInvocation"
$.aD=0
$.br=null
$.ev=null
$.bj=null
$.bJ=null
$.bK=null
$.e4=!1
$.p=C.h
$.eJ=0
$.ef=null
$.hh=!1
$.pU=null
$.hj=!1
$.hK=!0
$.cQ=!1
$.hI=!1
$.rG=C.S
$.q0=C.z
$.f_=0
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
I.$lazy(y,x,w)}})(["eO","$get$eO",function(){return H.kB()},"eP","$get$eP",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eJ
$.eJ=z+1
z="expando$key$"+z}return new P.k2(null,z,[P.u])},"fL","$get$fL",function(){return H.aH(H.cR({
toString:function(){return"$receiver$"}}))},"fM","$get$fM",function(){return H.aH(H.cR({$method$:null,
toString:function(){return"$receiver$"}}))},"fN","$get$fN",function(){return H.aH(H.cR(null))},"fO","$get$fO",function(){return H.aH(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fS","$get$fS",function(){return H.aH(H.cR(void 0))},"fT","$get$fT",function(){return H.aH(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fQ","$get$fQ",function(){return H.aH(H.fR(null))},"fP","$get$fP",function(){return H.aH(function(){try{null.$method$}catch(z){return z.message}}())},"fV","$get$fV",function(){return H.aH(H.fR(void 0))},"fU","$get$fU",function(){return H.aH(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dV","$get$dV",function(){return P.oC()},"b7","$get$b7",function(){var z,y
z=P.am
y=new P.C(0,P.of(),null,[z])
y.hL(null,z)
return y},"bL","$get$bL",function(){return[]},"eb","$get$eb",function(){return new K.dg("fist",P.bv(C.V,null))},"by","$get$by",function(){return N.b8("PlannerRecommendation")},"hy","$get$hy",function(){return new K.qb()},"ec","$get$ec",function(){var z=$.$get$hy()
return K.Z("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a3","$get$a3",function(){return P.cH(null)},"bb","$get$bb",function(){return P.cH(null)},"hM","$get$hM",function(){return N.b8("Storyline")},"fy","$get$fy",function(){return P.bc("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"ce","$get$ce",function(){return L.dU(new L.qF())},"bO","$get$bO",function(){return L.dU(new L.qL())},"hT","$get$hT",function(){return L.dU(new L.qE())},"dz","$get$dz",function(){return new F.lo("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"e9","$get$e9",function(){return Y.dd(!1,"balance",!0,C.q,$.$get$bO())},"hU","$get$hU",function(){return Y.dd(!1,"pounding",!1,C.q,$.$get$bO())},"fg","$get$fg",function(){return new B.m0("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fk","$get$fk",function(){return new O.mf(null,!1,!0,!1,null,null)},"fx","$get$fx",function(){return new Q.n_(null,!1,!0,!0,C.c,null)},"fY","$get$fY",function(){return new M.o4("",!0,C.c,!1,!0,null)},"hi","$get$hi",function(){return P.cH(null)},"i0","$get$i0",function(){return Y.dd(!1,"swing",!0,C.q,$.$get$bO())},"fq","$get$fq",function(){return new D.mO(!1,!1,!0,null,null)},"hA","$get$hA",function(){return K.Z("forge_church_crevice",new V.qA(),new V.qB(),null,null,H.t([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"hL","$get$hL",function(){return K.Z("kill_agruth",new V.qx(),new V.qz(),N.tK(),null,H.t([new Q.v("start_of_book","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hW","$get$hW",function(){return K.Z("start_of_book",new V.qv(),new V.qw(),null,null,H.t([],[Q.v]),"ground")},"eL","$get$eL",function(){return new V.kp("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eM","$get$eM",function(){return new V.kr("Flee through the War Forges","flee_through_war_forge",!0,null)},"fl","$get$fl",function(){return new V.mF("Search Agruth","search_agruth",!0,null)},"i1","$get$i1",function(){return K.Z("the_shafts",new V.qt(),new V.qu(),null,null,H.t([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"i3","$get$i3",function(){return K.Z("tunnel",new V.qr(),new V.qs(),N.tJ(),null,H.t([new Q.v("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.v]),"ground")},"i4","$get$i4",function(){return K.Z("underground_church",new V.qp(),new V.qq(),null,null,H.t([new Q.v("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.v]),"ground")},"i5","$get$i5",function(){return K.Z("war_forge",new V.qm(),new V.qo(),null,null,H.t([new Q.v("tunnel","Enter the corridor","You enter the corridor.",null),new Q.v("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.v]),"ground")},"i6","$get$i6",function(){return K.Z("war_forge_crevice",new V.qk(),new V.ql(),null,null,H.t([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"hz","$get$hz",function(){return K.Z("entrance_to_bloodrock",new V.qi(),new V.qj(),null,null,H.t([new Q.v("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.v("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.v]),"ground")},"hN","$get$hN",function(){return K.Z("mountain_pass",new V.qg(),new V.qh(),null,null,H.t([new Q.v("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.v]),"ground")},"hO","$get$hO",function(){return K.Z("mountain_pass_gate",new V.qe(),new V.qf(),null,null,H.t([new Q.v("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.v]),"ground")},"hP","$get$hP",function(){return K.Z("mountain_pass_guard_post",new V.r3(),new V.qd(),N.tL(),null,H.t([new Q.v("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.v]),"ground")},"fr","$get$fr",function(){return new V.mQ("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fF","$get$fF",function(){return new V.nF("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"hQ","$get$hQ",function(){return K.Z("mountainside_base",new V.r1(),new V.r2(),null,null,H.t([new Q.v("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.v]),"ground")},"hR","$get$hR",function(){return K.Z("mountainside_path",new V.qU(),new V.r0(),null,null,H.t([new Q.v("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.v]),"ground")},"fK","$get$fK",function(){return new V.nP("Scare off the serpent","threaten_winged_serpent",!0,null)},"ft","$get$ft",function(){return new V.mS("Soothe the serpent","soothe_winged_serpent",!0,null)},"fI","$get$fI",function(){return new V.nQ("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"i7","$get$i7",function(){return K.Z("winged_serpent_nest",new V.qy(),new V.qJ(),null,null,H.t([new Q.v("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.v]),"ground")},"hJ","$get$hJ",function(){return K.Z("ironcast_road",new V.qc(),new V.qn(),null,null,H.t([new Q.v("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.v]),"ground")},"hq","$get$hq",function(){return H.t([$.$get$hA(),$.$get$hL(),$.$get$hW(),$.$get$i1(),$.$get$i3(),$.$get$i4(),$.$get$i5(),$.$get$i6(),$.$get$hz(),$.$get$hN(),$.$get$hO(),$.$get$hP(),$.$get$hQ(),$.$get$hR(),$.$get$i7(),$.$get$hJ()],[K.c3])},"hp","$get$hp",function(){return H.t([$.$get$eL(),$.$get$eM(),$.$get$fl(),$.$get$fr(),$.$get$fF(),$.$get$fK(),$.$get$ft(),$.$get$fI()],[A.aF])},"cZ","$get$cZ",function(){return P.cH(null)},"d5","$get$d5",function(){return P.nz("")},"cd","$get$cd",function(){var z=new O.lB(0,null,"PointsCounter")
z.hD()
return z},"bM","$get$bM",function(){return new L.eA(null,H.t([],[L.a1]))},"ch","$get$ch",function(){return H.eY(P.q,P.d)},"cc","$get$cc",function(){return P.b0(null,{func:1,ret:[P.M,P.am]})},"cs","$get$cs",function(){return P.bc("^\\s*<<<\\s*$",!0,!1)},"cP","$get$cP",function(){return H.eY(P.q,Z.an)},"f1","$get$f1",function(){return N.b8("")},"f0","$get$f0",function(){return P.dp(P.q,N.dr)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.F,A.a6,Y.a_]},{func:1,args:[,,,]},{func:1,args:[R.F,A.a6,Y.a_]},{func:1,ret:Q.H,args:[R.F]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,v:true,args:[R.F,A.a6,Y.a_,R.F,S.a2]},{func:1,ret:[P.y,R.F],args:[A.a6]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.aT]},{func:1,v:true,args:[P.q]},{func:1,v:true,args:[R.F,A.a6,Y.a_,R.F,,]},{func:1,args:[P.aM]},{func:1,ret:P.M},{func:1,args:[,P.aT]},{func:1,ret:P.L,args:[A.ac]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bt,args:[P.u]},{func:1,args:[Z.an]},{func:1,args:[R.F]},{func:1,args:[U.bV]},{func:1,ret:P.q,args:[Q.ab]},{func:1,args:[P.b9]},{func:1,ret:P.X,args:[P.u]},{func:1,args:[P.u,,]},{func:1,args:[Y.a5]},{func:1,v:true,args:[P.u]},{func:1,ret:P.X,args:[L.a1]},{func:1,v:true,args:[[P.I,P.q],P.fm]},{func:1,args:[L.a1]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cO]},{func:1,args:[[P.I,Y.a5],Y.a5]},{func:1,ret:P.q,args:[P.q]},{func:1,ret:P.L,args:[A.cl]},{func:1,ret:P.u,args:[P.Q,P.Q]},{func:1,args:[P.L,R.F]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:[P.M,U.c4],args:[P.aM,P.q],named:{rerollEffectDescription:P.q,rerollable:P.X}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aT]},{func:1,ret:Q.cz,args:[U.aP]},{func:1,ret:Q.cx,args:[Q.v]},{func:1,v:true,args:[P.d,P.aT]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a1,args:[P.q],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.M,P.am]},submenu:P.q}},{func:1,args:[P.X]}]
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
if(x==y)H.tG(d||a)
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
Isolate.bN=a.bN
Isolate.b4=a.b4
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hX(X.hw(),b)},[])
else (function(b){H.hX(X.hw(),b)})([])})})()