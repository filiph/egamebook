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
if(b5.$isaP)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
var dart=[["","",,H,{"^":"",tV:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aP:{"^":"d;",
t:function(a,b){return a===b},
gw:function(a){return H.av(a)},
k:function(a){return H.cF(a)},
gbj:function(a){return new H.an(H.hD(a),null)}},
eN:{"^":"aP;",
k:function(a){return String(a)},
gw:function(a){return a?519018:218159},
gbj:function(a){return C.a3},
$isW:1},
eP:{"^":"aP;",
t:function(a,b){return null==b},
k:function(a){return"null"},
gw:function(a){return 0},
gbj:function(a){return C.a1},
$isal:1},
eT:{"^":"aP;",
gw:function(a){return 0},
gbj:function(a){return C.a0},
k:function(a){return String(a)},
$iseQ:1},
u_:{"^":"eT;"},
bi:{"^":"eT;"},
bW:{"^":"aP;$ti",
fm:function(a,b){if(!!a.immutable$list)throw H.c(new P.O(b))},
cr:function(a,b){if(!!a.fixed$length)throw H.c(new P.O(b))},
q:function(a,b){this.cr(a,"add")
a.push(b)},
b9:function(a){this.cr(a,"removeLast")
if(a.length===0)throw H.c(H.az(a,-1))
return a.pop()},
ar:function(a,b){var z
this.cr(a,"remove")
for(z=0;z<a.length;++z)if(J.f(a[z],b)){a.splice(z,1)
return!0}return!1},
im:function(a,b,c){var z,y,x,w,v
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
this.cr(a,"addAll")
for(z=J.aj(b);z.u();)a.push(z.d)},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aY:function(a,b){return new H.ak(a,b,[H.m(a,0),null])},
dB:function(a,b){return H.fz(a,b,null,H.m(a,0))},
b5:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bf:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.ad())},
fv:function(a,b){return this.bf(a,b,null)},
aj:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gfu:function(a){if(a.length>0)return a[0]
throw H.c(H.ad())},
gB:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ad())},
gbY:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.ad())
throw H.c(H.dh())},
aP:function(a,b,c,d,e){var z,y,x
this.fm(a,"setRange")
P.cI(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.Y(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eM())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bL:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cT:function(a,b){var z
this.fm(a,"sort")
z=b==null?P.r1():b
H.c4(a,0,a.length-1,z)},
eG:function(a){return this.cT(a,null)},
ei:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
bs:function(a,b){return this.ei(a,b,0)},
a_:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gK:function(a){return a.length===0},
gaf:function(a){return a.length!==0},
k:function(a){return P.bV(a,"[","]")},
bw:function(a){return P.b_(a,H.m(a,0))},
gY:function(a){return new J.bQ(a,a.length,0,null,[H.m(a,0)])},
gw:function(a){return H.av(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cr(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.ck(b,"newLength",null))
if(b<0)throw H.c(P.Y(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
m:function(a,b,c){if(!!a.immutable$list)H.h(new P.O("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
a[b]=c},
$iscB:1,
$ascB:I.b5,
$isI:1,
$isT:1},
tU:{"^":"bW;$ti"},
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
bX:{"^":"aP;",
bq:function(a,b){var z
if(typeof b!=="number")throw H.c(H.P(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd9(b)
if(this.gd9(a)===z)return 0
if(this.gd9(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd9:function(a){return a===0?1/a<0:a<0},
fX:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.O(""+a+".round()"))},
dl:function(a,b){var z
if(b>20)throw H.c(P.Y(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd9(a))return"-"+z
return z},
kl:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.Y(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cs(z,z.length-1)!==41)return z
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
eC:function(a){return-a},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a+b},
aJ:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a-b},
cO:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a/b},
bW:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a*b},
bC:function(a,b){return(a|0)===a?a/b|0:this.iw(a,b)},
iw:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.O("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
d2:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aH:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<b},
bz:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>b},
bV:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<=b},
bF:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>=b},
gbj:function(a){return C.a6},
$isL:1},
eO:{"^":"bX;",
gbj:function(a){return C.a5},
$isaN:1,
$isL:1,
$isu:1},
kB:{"^":"bX;",
gbj:function(a){return C.a4},
$isaN:1,
$isL:1},
bY:{"^":"aP;",
cs:function(a,b){if(b<0)throw H.c(H.az(a,b))
if(b>=a.length)H.h(H.az(a,b))
return a.charCodeAt(b)},
cd:function(a,b){if(b>=a.length)throw H.c(H.az(a,b))
return a.charCodeAt(b)},
e9:function(a,b,c){if(c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
return new H.pu(b,a,c)},
e8:function(a,b){return this.e9(a,b,0)},
fH:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cs(b,c+y)!==this.cd(a,y))return
return new H.fy(c,b,a)},
a4:function(a,b){if(typeof b!=="string")throw H.c(P.ck(b,null,null))
return a+b},
ee:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bA(a,y-z)},
k0:function(a,b,c){H.bo(c)
return H.o(a,b,c)},
k5:function(a,b,c,d){H.bo(c)
P.lR(d,0,a.length,"startIndex",null)
return H.bO(a,b,c,d)},
dg:function(a,b,c){return this.k5(a,b,c,0)},
hs:function(a,b,c){var z
if(c>a.length)throw H.c(P.Y(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.ia(b,a,c)!=null},
dC:function(a,b){return this.hs(a,b,0)},
ax:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.P(c))
if(b<0)throw H.c(P.c0(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.c0(b,null,null))
if(c>a.length)throw H.c(P.c0(c,null,null))
return a.substring(b,c)},
bA:function(a,b){return this.ax(a,b,null)},
h1:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cd(z,0)===133){x=J.di(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cs(z,w)===133?J.kC(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
km:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cd(z,0)===133?J.di(z,1):0}else{y=J.di(a,0)
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
ei:function(a,b,c){var z
if(c>a.length)throw H.c(P.Y(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bs:function(a,b){return this.ei(a,b,0)},
jH:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jG:function(a,b){return this.jH(a,b,null)},
iV:function(a,b,c){if(b==null)H.h(H.P(b))
if(c>a.length)throw H.c(P.Y(c,0,a.length,null,null))
return H.tw(a,b,c)},
a_:function(a,b){return this.iV(a,b,0)},
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
$iscB:1,
$ascB:I.b5,
$isq:1,
$isdy:1,
A:{
eR:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
di:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cd(a,b)
if(y!==32&&y!==13&&!J.eR(y))break;++b}return b},
kC:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cs(a,z)
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
z=C.e.bC(c-b+1,6)
y=b+z
x=c-z
w=C.e.bC(b+c,2)
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
if(h.aH(i,0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.a9(i)
if(h.bz(i,0)){--l
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
aT:{"^":"T;$ti",
gY:function(a){return new H.dn(this,this.gl(this),0,null,[H.w(this,"aT",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.aj(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gB:function(a){if(this.gl(this)===0)throw H.c(H.ad())
return this.aj(0,this.gl(this)-1)},
a_:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.f(this.aj(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.aj(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cB:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.aj(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.aj(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.aj(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bU:function(a,b){return this.eK(0,b)},
aY:function(a,b){return new H.ak(this,b,[H.w(this,"aT",0),null])},
b5:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.aj(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
bv:function(a,b){var z,y,x,w
z=[H.w(this,"aT",0)]
if(b){y=H.t([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gl(this);++w){z=this.aj(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
c9:function(a){return this.bv(a,!0)},
bw:function(a){var z,y
z=P.U(null,null,null,H.w(this,"aT",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.aj(0,y))
return z}},
nv:{"^":"aT;a,b,c,$ti",
ghV:function(){var z=J.aD(this.a)
return z},
giu:function(){var z,y
z=J.aD(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aD(this.a)
y=this.b
if(y>=z)return 0
return z-y},
aj:function(a,b){var z,y
z=this.giu()+b
if(!(b<0)){y=this.ghV()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cw(b,this,"index",null,null))
return J.el(this.a,z)},
bv:function(a,b){var z,y,x,w,v,u,t,s,r
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
t=H.t(s,u)}for(r=0;r<v;++r){u=x.aj(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hB:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.Y(z,0,null,"start",null))},
A:{
fz:function(a,b,c,d){var z=new H.nv(a,b,c,[d])
z.hB(a,b,c,d)
return z}}},
dn:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.aj(0,x);++this.c
return!0}},
cC:{"^":"y;a,b,$ti",
gY:function(a){return new H.l_(null,J.aj(this.a),this.b,this.$ti)},
gl:function(a){return J.aD(this.a)},
gK:function(a){return J.em(this.a)},
gB:function(a){return this.b.$1(J.i7(this.a))},
$asy:function(a,b){return[b]},
A:{
bw:function(a,b,c,d){if(!!J.n(a).$isT)return new H.bt(a,b,[c,d])
return new H.cC(a,b,[c,d])}}},
bt:{"^":"cC;a,b,$ti",$isT:1,
$asT:function(a,b){return[b]}},
l_:{"^":"cA;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascA:function(a,b){return[b]}},
ak:{"^":"aT;a,b,$ti",
gl:function(a){return J.aD(this.a)},
aj:function(a,b){return this.b.$1(J.el(this.a,b))},
$asaT:function(a,b){return[b]},
$asT:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
J:{"^":"y;a,b,$ti",
gY:function(a){return new H.fW(J.aj(this.a),this.b,this.$ti)},
aY:function(a,b){return new H.cC(this,b,[H.m(this,0),null])}},
fW:{"^":"cA;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fj:{"^":"y;a,b,$ti",
gY:function(a){return new H.mF(J.aj(this.a),this.b,this.$ti)},
A:{
mE:function(a,b,c){if(!!J.n(a).$isT)return new H.jV(a,H.ha(b),[c])
return new H.fj(a,H.ha(b),[c])}}},
jV:{"^":"fj;a,b,$ti",
gl:function(a){var z=J.aD(this.a)-this.b
if(z>=0)return z
return 0},
$isT:1},
mF:{"^":"cA;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gG:function(){return this.a.gG()}}}],["","",,H,{"^":"",
ca:function(a,b){var z=a.cv(b)
if(!init.globalState.d.cy)init.globalState.f.bi()
return z},
hT:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isI)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.pg(0,0,1,null,null,null,null,null,null,null,null,null,a)
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
y.f=new H.oQ(P.b1(null,H.c8),0)
x=P.u
y.z=new H.N(0,null,null,null,null,null,0,[x,H.dY])
y.ch=new H.N(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.pf()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.kt,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ph)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.U(null,null,null,x)
v=new H.c1(0,null,!1)
u=new H.dY(y,new H.N(0,null,null,null,null,null,0,[x,H.c1]),w,init.createNewIsolate(),v,new H.b9(H.d4()),new H.b9(H.d4()),!1,!1,[],P.U(null,null,null,null),null,null,!1,!0,P.U(null,null,null,null))
w.q(0,0)
u.dF(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ar(a,{func:1,args:[,]}))u.cv(new H.rX(z,a))
else if(H.ar(a,{func:1,args:[,,]}))u.cv(new H.rY(z,a))
else u.cv(a)
init.globalState.f.bi()},
kx:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.ky()
return},
ky:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.O("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.O('Cannot extract URI from "'+z+'"'))},
kt:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cS(!0,[]).bN(b.data)
y=J.K(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cS(!0,[]).bN(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cS(!0,[]).bN(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.U(null,null,null,q)
o=new H.c1(0,null,!1)
n=new H.dY(y,new H.N(0,null,null,null,null,null,0,[q,H.c1]),p,init.createNewIsolate(),o,new H.b9(H.d4()),new H.b9(H.d4()),!1,!1,[],P.U(null,null,null,null),null,null,!1,!0,P.U(null,null,null,null))
p.q(0,0)
n.dF(0,o)
init.globalState.f.a.at(new H.c8(n,new H.ku(w,v,u,t,s,r),"worker-start"))
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
case"log":H.ks(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.bk(!0,P.bJ(null,P.u)).bb(q)
y.toString
self.postMessage(q)}else P.ee(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
ks:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.bk(!0,P.bJ(null,P.u)).bb(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cu(z)
throw H.c(y)}},
kv:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.f4=$.f4+("_"+y)
$.f5=$.f5+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.c9(y,x),w,z.r])
x=new H.kw(a,b,c,d,z)
if(e===!0){z.fj(w,w)
init.globalState.f.a.at(new H.c8(z,x,"start isolate"))}else x.$0()},
pL:function(a){return new H.cS(!0,[]).bN(new H.bk(!1,P.bJ(null,P.u)).bb(a))},
rX:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
rY:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
pg:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
ph:function(a){var z=P.ae(["command","print","msg",a])
return new H.bk(!0,P.bJ(null,P.u)).bb(z)}}},
dY:{"^":"d;j:a<,b,c,jE:d<,iX:e<,f,r,x,cA:y<,z,Q,ch,cx,cy,db,dx",
fj:function(a,b){if(!this.f.t(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cq()},
k_:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.ar(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fi(x)}this.y=!1}this.cq()},
iM:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jY:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.O("removeRange"))
P.cI(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hl:function(a,b){if(!this.r.t(0,a))return
this.db=b},
ji:function(a,b,c){var z=J.n(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.at(new H.p6(a,c))},
jh:function(a,b){var z
if(!this.r.t(0,a))return
z=J.n(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.en()
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.at(this.gjF())},
jj:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ee(a)
if(b!=null)P.ee(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.ao(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.E(y)},
cv:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jj(w,v)
if(this.db===!0){this.en()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjE()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.df().$0()}return y},
c5:function(a){return this.b.i(0,a)},
dF:function(a,b){var z=this.b
if(z.a0(a))throw H.c(P.cu("Registry: ports must be registered only once."))
z.m(0,a,b)},
cq:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.en()},
en:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aX(0)
for(z=this.b,y=z.gca(),y=y.gY(y);y.u();)y.gG().hQ()
z.aX(0)
this.c.aX(0)
init.globalState.z.ar(0,this.a)
this.dx.aX(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.E(z[v])}this.ch=null}},"$0","gjF",0,0,6]},
p6:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
oQ:{"^":"d;a,b",
j1:function(){var z=this.a
if(z.b===z.c)return
return z.df()},
h_:function(){var z,y,x
z=this.j1()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a0(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cu("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.bk(!0,new P.h4(0,null,null,null,null,null,0,[null,P.u])).bb(x)
y.toString
self.postMessage(x)}return!1}z.jW()
return!0},
f9:function(){if(self.window!=null)new H.oR(this).$0()
else for(;this.h_(););},
bi:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.f9()
else try{this.f9()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bk(!0,P.bJ(null,P.u)).bb(v)
w.toString
self.postMessage(v)}}},
oR:{"^":"a:6;a",
$0:function(){if(!this.a.h_())return
P.nX(C.w,this)}},
c8:{"^":"d;a,b,c",
jW:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cv(this.b)}},
pf:{"^":"d;"},
ku:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.kv(this.a,this.b,this.c,this.d,this.e,this.f)}},
kw:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ar(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ar(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cq()}},
fZ:{"^":"d;"},
c9:{"^":"fZ;b,a",
E:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gf_())return
x=H.pL(a)
if(z.giX()===y){y=J.K(x)
switch(y.i(x,0)){case"pause":z.fj(y.i(x,1),y.i(x,2))
break
case"resume":z.k_(y.i(x,1))
break
case"add-ondone":z.iM(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.jY(y.i(x,1))
break
case"set-errors-fatal":z.hl(y.i(x,1),y.i(x,2))
break
case"ping":z.ji(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.jh(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.ar(0,y)
break}return}init.globalState.f.a.at(new H.c8(z,new H.pj(this,x),"receive"))},
t:function(a,b){if(b==null)return!1
return b instanceof H.c9&&J.f(this.b,b.b)},
gw:function(a){return this.b.gdS()}},
pj:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gf_())z.hH(this.b)}},
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
if(typeof z!=="number")return z.eD()
y=this.a
if(typeof y!=="number")return y.eD()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
c1:{"^":"d;dS:a<,b,f_:c<",
hQ:function(){this.c=!0
this.b=null},
bd:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.ar(0,y)
z.c.ar(0,y)
z.cq()},
hH:function(a){if(this.c)return
this.b.$1(a)},
$islS:1},
lT:{"^":"a8;a,b",
aw:function(a,b,c,d){var z=this.b
z.toString
return new P.cR(z,[H.m(z,0)]).aw(a,b,c,d)},
eq:function(a,b,c){return this.aw(a,null,b,c)},
bd:[function(){this.a.bd()
this.b.bd()},"$0","giT",0,0,6],
hz:function(a){var z=new P.py(null,0,null,null,null,null,this.giT(),[null])
this.b=z
this.a.b=z.giF(z)},
$asa8:I.b5},
nT:{"^":"d;a,b,c",
hC:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.at(new H.c8(y,new H.nV(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d0(new H.nW(this,b),0),a)}else throw H.c(new P.O("Timer greater than 0."))},
A:{
nU:function(a,b){var z=new H.nT(!0,!1,null)
z.hC(a,b)
return z}}},
nV:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
nW:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b9:{"^":"d;dS:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.ku()
z=C.n.d2(z,0)^C.n.bC(z,4294967296)
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
if(!!z.$iscB)return this.hh(a)
if(!!z.$iskq){x=this.ghe()
z=a.gc3()
z=H.bw(z,x,H.w(z,"y",0),null)
z=P.V(z,!0,H.w(z,"y",0))
w=a.gca()
w=H.bw(w,x,H.w(w,"y",0),null)
return["map",z,P.V(w,!0,H.w(w,"y",0))]}if(!!z.$iseQ)return this.hi(a)
if(!!z.$isaP)this.h2(a)
if(!!z.$islS)this.cK(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isc9)return this.hj(a)
if(!!z.$ise_)return this.hk(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cK(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb9)return["capability",a.a]
if(!(a instanceof P.d))this.h2(a)
return["dart",init.classIdExtractor(a),this.hg(init.classFieldsExtractor(a))]},"$1","ghe",2,0,0],
cK:function(a,b){throw H.c(new P.O((b==null?"Can't transmit:":b)+" "+H.b(a)))},
h2:function(a){return this.cK(a,null)},
hh:function(a){var z=this.hf(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cK(a,"Can't serialize indexable: ")},
hf:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bb(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hg:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.bb(a[z]))
return a},
hi:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cK(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bb(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hk:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hj:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdS()]
return["raw sendport",a]}},
cS:{"^":"d;a,b",
bN:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.gfu(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.t(this.ct(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.ct(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.ct(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.ct(x),[null])
y.fixed$length=Array
return y
case"map":return this.j4(a)
case"sendport":return this.j5(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.j3(a)
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
this.ct(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gj2",2,0,0],
ct:function(a){var z,y,x
z=J.K(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.m(a,y,this.bN(z.i(a,y)));++y}return a},
j4:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aS()
this.b.push(w)
y=J.en(y,this.gj2()).c9(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.m(0,y[u],this.bN(v.i(x,u)))}return w},
j5:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c5(w)
if(u==null)return
t=new H.c9(u,x)}else t=new H.e_(y,w,x)
this.b.push(t)
return t},
j3:function(a){var z,y,x,w,v,u,t
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
w[z.i(y,u)]=this.bN(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
j5:function(){throw H.c(new P.O("Cannot modify unmodifiable Map"))},
ri:function(a){return init.types[a]},
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
if(w.length>1&&C.b.cd(w,0)===36)w=C.b.bA(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d2(H.ce(a),0,null),init.mangledGlobalNames)},
cF:function(a){return"Instance of '"+H.bz(a)+"'"},
ag:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.d2(z,10))>>>0,56320|z&1023)}throw H.c(P.Y(a,0,1114111,null,null))},
bd:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
lK:function(a){var z=H.bd(a).getFullYear()+0
return z},
lI:function(a){var z=H.bd(a).getMonth()+1
return z},
lE:function(a){var z=H.bd(a).getDate()+0
return z},
lF:function(a){var z=H.bd(a).getHours()+0
return z},
lH:function(a){var z=H.bd(a).getMinutes()+0
return z},
lJ:function(a){var z=H.bd(a).getSeconds()+0
return z},
lG:function(a){var z=H.bd(a).getMilliseconds()+0
return z},
dB:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
return a[b]},
f6:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
a[b]=c},
x:function(a){throw H.c(H.P(a))},
e:function(a,b){if(a==null)J.aD(a)
throw H.c(H.az(a,b))},
az:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aY(!0,b,"index",null)
z=J.aD(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cw(b,a,"index",null,z)
return P.c0(b,"index",null)},
P:function(a){return new P.aY(!0,a,null,null)},
cZ:function(a){if(typeof a!=="number")throw H.c(H.P(a))
return a},
bo:function(a){if(typeof a!=="string")throw H.c(H.P(a))
return a},
c:function(a){var z
if(a==null)a=new P.cD()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hZ})
z.name=""}else z.toString=H.hZ
return z},
hZ:function(){return J.i(this.dartException)},
h:function(a){throw H.c(a)},
as:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.tD(a)
if(a==null)return
if(a instanceof H.df)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.d2(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dk(H.b(y)+" (Error "+w+")",null))
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
if(v)return z.$1(new H.eZ(y,l==null?null:l.method))}}return z.$1(new H.o0(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fs()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aY(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fs()
return a},
A:function(a){var z
if(a instanceof H.df)return a.b
if(a==null)return new H.h7(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.h7(a,null)},
ru:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.av(a)},
ra:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
rm:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ca(b,new H.rn(a))
case 1:return H.ca(b,new H.ro(a,d))
case 2:return H.ca(b,new H.rp(a,d,e))
case 3:return H.ca(b,new H.rq(a,d,e,f))
case 4:return H.ca(b,new H.rr(a,d,e,f,g))}throw H.c(P.cu("Unsupported number of arguments for wrapped closure"))},
d0:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.rm)
a.$identity=z
return z},
j1:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isI){z.$reflectionInfo=c
x=H.lV(z).r}else x=c
w=d?Object.create(new H.n2().constructor.prototype):Object.create(new H.d7(null,null,null,null).constructor.prototype)
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
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ri,x)
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
if(v==null){v=H.cn("self")
$.bs=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aE
$.aE=J.a5(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bs
if(v==null){v=H.cn("self")
$.bs=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
j_:function(a,b,c,d){var z,y
z=H.d8
y=H.es
switch(b?-1:a){case 0:throw H.c(new H.m5("Intercepted function with no arguments."))
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
if(y==null){y=H.cn("receiver")
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
rA:function(a,b){var z=J.K(b)
throw H.c(H.cp(H.bz(a),z.ax(b,3,z.gl(b))))},
a4:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.rA(a,b)},
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
throw H.c(H.cp(y!=null?H.S(y,null):H.bz(a),z))},
tB:function(a){throw H.c(new P.jh(a))},
d4:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b4:function(a){return new H.an(a,null)},
t:function(a,b){a.$ti=b
return a},
ce:function(a){if(a==null)return
return a.$ti},
hC:function(a,b){return H.ej(a["$as"+H.b(b)],H.ce(a))},
w:function(a,b,c){var z=H.hC(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.ce(a)
return z==null?null:z[b]},
S:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d2(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.S(z,b)
return H.pQ(a,b)}return"unknown-reified-type"},
pQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.S(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.S(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.S(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.r9(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
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
aM:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ce(a)
y=J.n(a)
if(y[b]==null)return!1
return H.hp(H.ej(y[d],z),c)},
aB:function(a,b,c,d){if(a==null)return a
if(H.aM(a,b,c,d))return a
throw H.c(H.cp(H.bz(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d2(c,0,null),init.mangledGlobalNames)))},
hp:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aa(a[y],b[y]))return!1
return!0},
b3:function(a,b,c){return a.apply(b,H.hC(b,c))},
d_:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="al"
if(b==null)return!0
z=H.ce(a)
a=J.n(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ec(x.apply(a,null),b)}return H.aa(y,b)},
hW:function(a,b){if(a!=null&&!H.d_(a,b))throw H.c(H.cp(H.bz(a),H.S(b,null)))
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
q_:function(a,b){var z,y,x,w,v,u
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
if(!(H.aa(o,n)||H.aa(n,o)))return!1}}return H.q_(a.named,b.named)},
tw:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$iseS){z=C.b.bA(a,c)
return b.b.test(z)}else{z=z.e8(b,C.b.bA(a,c))
return!z.gK(z)}}},
o:function(a,b,c){var z,y,x
H.bo(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
ud:[function(a){return a},"$1","hb",2,0,39],
tx:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdy)throw H.c(P.ck(b,"pattern","is not a Pattern"))
for(z=z.e8(b,a),z=new H.fX(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hb().$1(C.b.ax(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hb().$1(C.b.bA(a,y)))
return z.charCodeAt(0)==0?z:z},
bO:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.ty(a,z,z+b.length,c)},
ty:function(a,b,c,d){var z,y
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
return this.eW(b)},
eW:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eW(w))}}},
lU:{"^":"d;a,b,c,d,e,f,r,x",A:{
lV:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.lU(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
nY:{"^":"d;a,b,c,d,e,f",
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
aI:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.nY(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cQ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fN:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eZ:{"^":"X;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
kE:{"^":"X;a,b,c",
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
return new H.kE(a,y,z?null:b.receiver)}}},
o0:{"^":"X;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
df:{"^":"d;a,bc:b<"},
tD:{"^":"a:0;a",
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
rn:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
ro:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
rp:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
rq:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
rr:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bz(this).trim()+"'"},
gha:function(){return this},
$isbv:1,
gha:function(){return this}},
fD:{"^":"a;"},
n2:{"^":"fD;",
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
if(typeof y!=="number")return y.kv()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cF(z)},
A:{
d8:function(a){return a.a},
es:function(a){return a.c},
iQ:function(){var z=$.bs
if(z==null){z=H.cn("self")
$.bs=z}return z},
cn:function(a){var z,y,x,w,v
z=new H.d7("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iV:{"^":"X;a",
k:function(a){return this.a},
A:{
cp:function(a,b){return new H.iV("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
m5:{"^":"X;a",
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
gc3:function(){return new H.kR(this,[H.m(this,0)])},
gca:function(){return H.bw(this.gc3(),new H.kD(this),H.m(this,0),H.m(this,1))},
a0:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eS(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eS(y,a)}else return this.ju(a)},
ju:function(a){var z=this.d
if(z==null)return!1
return this.cz(this.cZ(z,this.cw(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cg(z,b)
return y==null?null:y.gbP()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cg(x,b)
return y==null?null:y.gbP()}else return this.jv(b)},
jv:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cZ(z,this.cw(a))
x=this.cz(y,a)
if(x<0)return
return y[x].gbP()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dU()
this.b=z}this.eM(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dU()
this.c=y}this.eM(y,b,c)}else this.jx(b,c)},
jx:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dU()
this.d=z}y=this.cw(a)
x=this.cZ(z,y)
if(x==null)this.e4(z,y,[this.dV(a,b)])
else{w=this.cz(x,a)
if(w>=0)x[w].sbP(b)
else x.push(this.dV(a,b))}},
jX:function(a,b){var z
if(this.a0(a))return this.i(0,a)
z=b.$0()
this.m(0,a,z)
return z},
ar:function(a,b){if(typeof b==="string")return this.f8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f8(this.c,b)
else return this.jw(b)},
jw:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cZ(z,this.cw(a))
x=this.cz(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fb(w)
return w.gbP()},
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
eM:function(a,b,c){var z=this.cg(a,b)
if(z==null)this.e4(a,b,this.dV(b,c))
else z.sbP(c)},
f8:function(a,b){var z
if(a==null)return
z=this.cg(a,b)
if(z==null)return
this.fb(z)
this.eT(a,b)
return z.gbP()},
dV:function(a,b){var z,y
z=new H.kQ(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fb:function(a){var z,y
z=a.gii()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cw:function(a){return J.j(a)&0x3ffffff},
cz:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gfD(),b))return y
return-1},
k:function(a){return P.dr(this)},
cg:function(a,b){return a[b]},
cZ:function(a,b){return a[b]},
e4:function(a,b,c){a[b]=c},
eT:function(a,b){delete a[b]},
eS:function(a,b){return this.cg(a,b)!=null},
dU:function(){var z=Object.create(null)
this.e4(z,"<non-identifier-key>",z)
this.eT(z,"<non-identifier-key>")
return z},
$iskq:1,
$isE:1,
A:{
eU:function(a,b){return new H.N(0,null,null,null,null,null,0,[a,b])}}},
kD:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
kQ:{"^":"d;fD:a<,bP:b@,c,ii:d<,$ti"},
kR:{"^":"T;a,$ti",
gl:function(a){return this.a.a},
gK:function(a){return this.a.a===0},
gY:function(a){var z,y
z=this.a
y=new H.kS(z,z.r,null,null,this.$ti)
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
kS:{"^":"d;a,b,c,d,$ti",
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
gic:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dj(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gib:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dj(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
e9:function(a,b,c){if(c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
return new H.ow(this,b,c)},
e8:function(a,b){return this.e9(a,b,0)},
hX:function(a,b){var z,y
z=this.gic()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.h6(this,y)},
hW:function(a,b){var z,y
z=this.gib()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.h6(this,y)},
fH:function(a,b,c){if(c>b.length)throw H.c(P.Y(c,0,b.length,null,null))
return this.hW(b,c)},
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
ow:{"^":"cz;a,b,c",
gY:function(a){return new H.fX(this.a,this.b,this.c,null)},
$ascz:function(){return[P.bc]},
$asy:function(){return[P.bc]}},
fX:{"^":"d;a,b,c,d",
gG:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hX(z,y)
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
pu:{"^":"y;a,b,c",
gY:function(a){return new H.pv(this.a,this.b,this.c,null)},
$asy:function(){return[P.bc]}},
pv:{"^":"d;a,b,c,d",
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
r9:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
rz:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
ox:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.q0()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d0(new P.oz(z),1)).observe(y,{childList:true})
return new P.oy(z,y,x)}else if(self.setImmediate!=null)return P.q1()
return P.q2()},
u7:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d0(new P.oA(a),0))},"$1","q0",2,0,13],
u8:[function(a){++init.globalState.f.b
self.setImmediate(H.d0(new P.oB(a),0))},"$1","q1",2,0,13],
u9:[function(a){P.dO(C.w,a)},"$1","q2",2,0,13],
ay:function(a,b){P.e0(null,a)
return b.gfA()},
ap:function(a,b){P.e0(a,b)},
ax:function(a,b){b.bM(a)},
aw:function(a,b){b.ed(H.z(a),H.A(a))},
e0:function(a,b){var z,y,x,w
z=new P.pF(b)
y=new P.pG(b)
x=J.n(a)
if(!!x.$isD)a.e5(z,y)
else if(!!x.$isM)a.ex(z,y)
else{w=new P.D(0,$.p,null,[null])
w.a=4
w.c=a
w.e5(z,null)}},
aq:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.pZ(z)},
cV:function(a,b,c){var z,y,x
if(b===0){if(c.gek())c.c.ec()
else c.a.bd()
return}else if(b===1){if(c.gek())c.c.ed(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.e7(z,y)
c.a.bd()}return}if(a instanceof P.bH){if(c.gek()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aO(c.a,z)
P.cf(new P.pD(b,c))
return}else if(z===1){x=a.a
c.a.iP(x,!1).bR(new P.pE(b,c))
return}}P.e0(a,b)},
pY:function(a){return a.gdD()},
e4:function(a,b){if(H.ar(a,{func:1,args:[P.al,P.al]})){b.toString
return a}else{b.toString
return a}},
au:function(a){return new P.pw(new P.D(0,$.p,null,[a]),[a])},
pO:function(a,b,c){$.p.toString
a.b1(b,c)},
pS:function(){var z,y
for(;z=$.bl,z!=null;){$.bL=null
y=z.gc6()
$.bl=y
if(y==null)$.bK=null
z.giR().$0()}},
uc:[function(){$.e1=!0
try{P.pS()}finally{$.bL=null
$.e1=!1
if($.bl!=null)$.$get$dS().$1(P.hq())}},"$0","hq",0,0,6],
hk:function(a){var z=new P.fY(a,null)
if($.bl==null){$.bK=z
$.bl=z
if(!$.e1)$.$get$dS().$1(P.hq())}else{$.bK.b=z
$.bK=z}},
pX:function(a){var z,y,x
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
cf:function(a){var z=$.p
if(C.h===z){P.bn(null,null,C.h,a)
return}z.toString
P.bn(null,null,z,z.ea(a,!0))},
u4:function(a,b){return new P.pt(null,a,!1,[b])},
e5:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.p
w.toString
P.bm(null,null,w,z,y)}},
pT:[function(a,b){var z=$.p
z.toString
P.bm(null,null,z,a,b)},function(a){return P.pT(a,null)},"$2","$1","q4",2,2,14,0],
ub:[function(){},"$0","q3",0,0,6],
hj:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbe()
w=t
v=x.gbc()
c.$2(w,v)}}},
pH:function(a,b,c,d){var z=a.c1()
if(!!J.n(z).$isM&&z!==$.$get$ba())z.bT(new P.pJ(b,c,d))
else b.b1(c,d)},
h8:function(a,b){return new P.pI(a,b)},
h9:function(a,b,c){var z=a.c1()
if(!!J.n(z).$isM&&z!==$.$get$ba())z.bT(new P.pK(b,c))
else b.b0(c)},
pC:function(a,b,c){$.p.toString
a.bZ(b,c)},
nX:function(a,b){var z=$.p
if(z===C.h){z.toString
return P.dO(a,b)}return P.dO(a,z.ea(b,!0))},
dO:function(a,b){var z=C.e.bC(a.a,1000)
return H.nU(z<0?0:z,b)},
oa:function(){return $.p},
bm:function(a,b,c,d,e){var z={}
z.a=d
P.pX(new P.pV(z,e))},
hg:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hi:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hh:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bn:function(a,b,c,d){var z=C.h!==c
if(z)d=c.ea(d,!(!z||!1))
P.hk(d)},
oz:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
oy:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
oA:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
oB:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pF:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
pG:{"^":"a:20;a",
$2:function(a,b){this.a.$2(1,new H.df(a,b))}},
pZ:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
pD:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcA()){z.b=!0
return}this.a.$2(null,0)}},
pE:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
oC:{"^":"d;a,b,c",
gdD:function(){return this.a.gdD()},
gcA:function(){return this.a.gcA()},
gek:function(){return this.c!=null},
q:function(a,b){return J.aO(this.a,b)},
e7:function(a,b){return this.a.e7(a,b)},
bd:function(){return this.a.bd()},
hE:function(a){var z=new P.oF(a)
this.a=new P.oK(null,0,null,new P.oH(z),null,new P.oI(this,z),new P.oJ(this,a),[null])},
A:{
oD:function(a){var z=new P.oC(null,!1,null)
z.hE(a)
return z}}},
oF:{"^":"a:1;a",
$0:function(){P.cf(new P.oG(this.a))}},
oG:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
oH:{"^":"a:1;a",
$0:function(){this.a.$0()}},
oI:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
oJ:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjB()){z.c=new P.c6(new P.D(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cf(new P.oE(this.b))}return z.c.gfA()}}},
oE:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bH:{"^":"d;as:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bI:function(a){return new P.bH(a,1)},
aJ:function(){return C.a7},
h2:function(a){return new P.bH(a,0)},
aK:function(a){return new P.bH(a,3)}}},
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
px:{"^":"cz;a",
gY:function(a){return new P.b2(this.a(),null,null,null)},
$ascz:I.b5,
$asy:I.b5,
A:{
aL:function(a){return new P.px(a)}}},
M:{"^":"d;$ti"},
h_:{"^":"d;fA:a<,$ti",
ed:function(a,b){if(a==null)a=new P.cD()
if(this.a.a!==0)throw H.c(new P.F("Future already completed"))
$.p.toString
this.b1(a,b)},
d6:function(a){return this.ed(a,null)}},
c6:{"^":"h_;a,$ti",
bM:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.bn(a)},
ec:function(){return this.bM(null)},
b1:function(a,b){this.a.eO(a,b)}},
pw:{"^":"h_;a,$ti",
bM:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.b0(a)},
ec:function(){return this.bM(null)},
b1:function(a,b){this.a.b1(a,b)}},
dX:{"^":"d;dX:a<,b,c,d,e,$ti",
giA:function(){return this.b.b},
gfC:function(){return(this.c&1)!==0},
gjm:function(){return(this.c&2)!==0},
gfB:function(){return this.c===8},
jk:function(a){return this.b.b.ew(this.d,a)},
jL:function(a){if(this.c!==6)return!0
return this.b.b.ew(this.d,a.gbe())},
jg:function(a){var z,y
z=this.e
y=this.b.b
if(H.ar(z,{func:1,args:[,,]}))return y.kd(z,a.gbe(),a.gbc())
else return y.ew(z,a.gbe())},
jl:function(){return this.b.b.fY(this.d)}},
D:{"^":"d;co:a<,b,io:c<,$ti",
gi6:function(){return this.a===2},
gdT:function(){return this.a>=4},
ex:function(a,b){var z=$.p
if(z!==C.h){z.toString
if(b!=null)b=P.e4(b,z)}return this.e5(a,b)},
bR:function(a){return this.ex(a,null)},
e5:function(a,b){var z,y
z=new P.D(0,$.p,null,[null])
y=b==null?1:3
this.cU(new P.dX(null,z,y,a,b,[H.m(this,0),null]))
return z},
bT:function(a){var z,y
z=$.p
y=new P.D(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.cU(new P.dX(null,y,8,a,null,[z,z]))
return y},
cU:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdT()){y.cU(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bn(null,null,z,new P.oU(this,a))}},
f4:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdX()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdT()){v.f4(a)
return}this.a=v.a
this.c=v.c}z.a=this.d0(a)
y=this.b
y.toString
P.bn(null,null,y,new P.p0(z,this))}},
d_:function(){var z=this.c
this.c=null
return this.d0(z)},
d0:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdX()
z.a=y}return y},
b0:function(a){var z,y
z=this.$ti
if(H.aM(a,"$isM",z,"$asM"))if(H.aM(a,"$isD",z,null))P.cT(a,this)
else P.h1(a,this)
else{y=this.d_()
this.a=4
this.c=a
P.bj(this,y)}},
b1:[function(a,b){var z=this.d_()
this.a=8
this.c=new P.cl(a,b)
P.bj(this,z)},function(a){return this.b1(a,null)},"kw","$2","$1","gbI",2,2,14,0],
bn:function(a){var z
if(H.aM(a,"$isM",this.$ti,"$asM")){this.hN(a)
return}this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.oW(this,a))},
hN:function(a){var z
if(H.aM(a,"$isD",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.p_(this,a))}else P.cT(a,this)
return}P.h1(a,this)},
eO:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.oV(this,a,b))},
hG:function(a,b){this.a=4
this.c=a},
$isM:1,
A:{
h1:function(a,b){var z,y,x
b.a=1
try{a.ex(new P.oX(b),new P.oY(b))}catch(x){z=H.z(x)
y=H.A(x)
P.cf(new P.oZ(b,z,y))}},
cT:function(a,b){var z,y,x
for(;a.gi6();)a=a.c
z=a.gdT()
y=b.c
if(z){b.c=null
x=b.d0(y)
b.a=a.a
b.c=a.c
P.bj(b,x)}else{b.a=2
b.c=a
a.f4(y)}},
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
if(!y||b.gfC()||b.gfB()){q=b.giA()
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
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfB())new P.p3(z,x,w,b).$0()
else if(y){if(b.gfC())new P.p2(x,b,r).$0()}else if(b.gjm())new P.p1(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.n(y).$isM){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.d0(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cT(y,o)
return}}o=b.b
b=o.d_()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
oU:{"^":"a:1;a,b",
$0:function(){P.bj(this.a,this.b)}},
p0:{"^":"a:1;a,b",
$0:function(){P.bj(this.b,this.a.a)}},
oX:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b0(a)}},
oY:{"^":"a:50;a",
$2:function(a,b){this.a.b1(a,b)},
$1:function(a){return this.$2(a,null)}},
oZ:{"^":"a:1;a,b,c",
$0:function(){this.a.b1(this.b,this.c)}},
oW:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.d_()
z.a=4
z.c=this.b
P.bj(z,y)}},
p_:{"^":"a:1;a,b",
$0:function(){P.cT(this.b,this.a)}},
oV:{"^":"a:1;a,b,c",
$0:function(){this.a.b1(this.b,this.c)}},
p3:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jl()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbe()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cl(y,x)
u.a=!0
return}if(!!J.n(z).$isM){if(z instanceof P.D&&z.gco()>=4){if(z.gco()===8){v=this.b
v.b=z.gio()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bR(new P.p4(t))
v.a=!1}}},
p4:{"^":"a:0;a",
$1:function(a){return this.a}},
p2:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jk(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cl(z,y)
w.a=!0}}},
p1:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jL(z)===!0&&w.e!=null){v=this.b
v.b=w.jg(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbe()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cl(y,x)
s.a=!0}}},
fY:{"^":"d;iR:a<,c6:b@"},
a8:{"^":"d;$ti",
aY:function(a,b){return new P.pi(b,this,[H.w(this,"a8",0),null])},
a_:function(a,b){var z,y
z={}
y=new P.D(0,$.p,null,[P.W])
z.a=null
z.a=this.aw(new P.nc(z,this,b,y),!0,new P.nd(y),y.gbI())
return y},
L:function(a,b){var z,y
z={}
y=new P.D(0,$.p,null,[null])
z.a=null
z.a=this.aw(new P.ng(z,this,b,y),!0,new P.nh(y),y.gbI())
return y},
gl:function(a){var z,y
z={}
y=new P.D(0,$.p,null,[P.u])
z.a=0
this.aw(new P.nm(z),!0,new P.nn(z,y),y.gbI())
return y},
gK:function(a){var z,y
z={}
y=new P.D(0,$.p,null,[P.W])
z.a=null
z.a=this.aw(new P.ni(z,y),!0,new P.nj(y),y.gbI())
return y},
c9:function(a){var z,y,x
z=H.w(this,"a8",0)
y=H.t([],[z])
x=new P.D(0,$.p,null,[[P.I,z]])
this.aw(new P.no(this,y),!0,new P.np(y,x),x.gbI())
return x},
bw:function(a){var z,y,x
z=H.w(this,"a8",0)
y=P.U(null,null,null,z)
x=new P.D(0,$.p,null,[[P.bB,z]])
this.aw(new P.nq(this,y),!0,new P.nr(y,x),x.gbI())
return x},
gB:function(a){var z,y
z={}
y=new P.D(0,$.p,null,[H.w(this,"a8",0)])
z.a=null
z.b=!1
this.aw(new P.nk(z,this),!0,new P.nl(z,y),y.gbI())
return y}},
nc:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hj(new P.na(this.c,a),new P.nb(z,y),P.h8(z.a,y))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a8")}},
na:{"^":"a:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
nb:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.h9(this.a.a,this.b,!0)}},
nd:{"^":"a:1;a",
$0:function(){this.a.b0(!1)}},
ng:{"^":"a;a,b,c,d",
$1:function(a){P.hj(new P.ne(this.c,a),new P.nf(),P.h8(this.a.a,this.d))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a8")}},
ne:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
nf:{"^":"a:0;",
$1:function(a){}},
nh:{"^":"a:1;a",
$0:function(){this.a.b0(null)}},
nm:{"^":"a:0;a",
$1:function(a){++this.a.a}},
nn:{"^":"a:1;a,b",
$0:function(){this.b.b0(this.a.a)}},
ni:{"^":"a:0;a,b",
$1:function(a){P.h9(this.a.a,this.b,!1)}},
nj:{"^":"a:1;a",
$0:function(){this.a.b0(!0)}},
no:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"a8")}},
np:{"^":"a:1;a,b",
$0:function(){this.b.b0(this.a)}},
nq:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"a8")}},
nr:{"^":"a:1;a,b",
$0:function(){this.b.b0(this.a)}},
nk:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a8")}},
nl:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b0(x.a)
return}try{x=H.ad()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.pO(this.b,z,y)}}},
cU:{"^":"d;co:b<,$ti",
gdD:function(){return new P.cR(this,this.$ti)},
gjB:function(){return(this.b&4)!==0},
gcA:function(){var z=this.b
return(z&1)!==0?this.gbB().gf0():(z&2)===0},
gig:function(){if((this.b&8)===0)return this.a
return this.a.gcM()},
dM:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dZ(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcM()==null)y.c=new P.dZ(null,null,0,this.$ti)
return y.c},
gbB:function(){if((this.b&8)!==0)return this.a.gcM()
return this.a},
cc:function(){if((this.b&4)!==0)return new P.F("Cannot add event after closing")
return new P.F("Cannot add event while adding a stream")},
iP:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cc())
if((z&2)!==0){z=new P.D(0,$.p,null,[null])
z.bn(null)
return z}z=this.a
y=new P.D(0,$.p,null,[null])
x=a.aw(this.ghL(),!1,this.ghM(),this.ghI())
w=this.b
if((w&1)!==0?this.gbB().gf0():(w&2)===0)x.cD()
this.a=new P.pp(z,y,x,this.$ti)
this.b|=8
return y},
eV:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$ba():new P.D(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cc())
this.bH(b)},"$1","giF",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cU")}],
e7:function(a,b){if(this.b>=4)throw H.c(this.cc())
if(a==null)a=new P.cD()
$.p.toString
this.bZ(a,b)},
bd:function(){var z=this.b
if((z&4)!==0)return this.eV()
if(z>=4)throw H.c(this.cc())
z|=4
this.b=z
if((z&1)!==0)this.cm()
else if((z&3)===0)this.dM().q(0,C.u)
return this.eV()},
bH:[function(a){var z=this.b
if((z&1)!==0)this.cl(a)
else if((z&3)===0)this.dM().q(0,new P.dT(a,null,this.$ti))},"$1","ghL",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cU")}],
bZ:[function(a,b){var z=this.b
if((z&1)!==0)this.cn(a,b)
else if((z&3)===0)this.dM().q(0,new P.dU(a,b,null))},"$2","ghI",4,0,49],
dG:[function(){var z=this.a
this.a=z.gcM()
this.b&=4294967287
z.a.bn(null)},"$0","ghM",0,0,6],
iv:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.F("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.oO(this,null,null,null,z,y,null,null,this.$ti)
x.eL(a,b,c,d,H.m(this,0))
w=this.gig()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scM(x)
v.b.cG()}else this.a=x
x.it(w)
x.dR(new P.pr(this))
return x},
ik:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c1()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.D(0,$.p,null,[null])
u.eO(y,x)
z=u}else z=z.bT(w)
w=new P.pq(this)
if(z!=null)z=z.bT(w)
else w.$0()
return z}},
pr:{"^":"a:1;a",
$0:function(){P.e5(this.a.d)}},
pq:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bn(null)}},
pz:{"^":"d;$ti",
cl:function(a){this.gbB().bH(a)},
cn:function(a,b){this.gbB().bZ(a,b)},
cm:function(){this.gbB().dG()}},
oL:{"^":"d;$ti",
cl:function(a){this.gbB().c_(new P.dT(a,null,[H.m(this,0)]))},
cn:function(a,b){this.gbB().c_(new P.dU(a,b,null))},
cm:function(){this.gbB().c_(C.u)}},
oK:{"^":"cU+oL;a,b,c,d,e,f,r,$ti"},
py:{"^":"cU+pz;a,b,c,d,e,f,r,$ti"},
cR:{"^":"ps;a,$ti",
gw:function(a){return(H.av(this.a)^892482866)>>>0},
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cR))return!1
return b.a===this.a}},
oO:{"^":"c7;x,a,b,c,d,e,f,r,$ti",
dY:function(){return this.x.ik(this)},
e_:[function(){var z=this.x
if((z.b&8)!==0)z.a.cD()
P.e5(z.e)},"$0","gdZ",0,0,6],
e1:[function(){var z=this.x
if((z.b&8)!==0)z.a.cG()
P.e5(z.f)},"$0","ge0",0,0,6]},
ou:{"^":"d;$ti",
cD:function(){this.b.cD()},
cG:function(){this.b.cG()},
c1:function(){var z=this.b.c1()
if(z==null){this.a.bn(null)
return}return z.bT(new P.ov(this))},
ec:function(){this.a.bn(null)}},
ov:{"^":"a:1;a",
$0:function(){this.a.a.bn(null)}},
pp:{"^":"ou;cM:c@,a,b,$ti"},
c7:{"^":"d;co:e<,$ti",
it:function(a){if(a==null)return
this.r=a
if(!a.gK(a)){this.e=(this.e|64)>>>0
this.r.cP(this)}},
jS:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fk()
if((z&4)===0&&(this.e&32)===0)this.dR(this.gdZ())},
cD:function(){return this.jS(null)},
cG:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.cP(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dR(this.ge0())}}}},
c1:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dH()
z=this.f
return z==null?$.$get$ba():z},
gf0:function(){return(this.e&4)!==0},
gcA:function(){return this.e>=128},
dH:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fk()
if((this.e&32)===0)this.r=null
this.f=this.dY()},
bH:["hu",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cl(a)
else this.c_(new P.dT(a,null,[H.w(this,"c7",0)]))}],
bZ:["hv",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cn(a,b)
else this.c_(new P.dU(a,b,null))}],
dG:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cm()
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
if(y<128)this.r.cP(this)}},
cl:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.h0(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dJ((z&4)!==0)},
cn:function(a,b){var z,y
z=this.e
y=new P.oN(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dH()
z=this.f
if(!!J.n(z).$isM&&z!==$.$get$ba())z.bT(y)
else y.$0()}else{y.$0()
this.dJ((z&4)!==0)}},
cm:function(){var z,y
z=new P.oM(this)
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
if((z&64)!==0&&z<128)this.r.cP(this)},
eL:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.e4(b==null?P.q4():b,z)
this.c=c==null?P.q3():c}},
oN:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ar(y,{func:1,args:[P.d,P.aU]})
w=z.d
v=this.b
u=z.b
if(x)w.ke(u,v,this.c)
else w.h0(u,v)
z.e=(z.e&4294967263)>>>0}},
oM:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fZ(z.c)
z.e=(z.e&4294967263)>>>0}},
ps:{"^":"a8;$ti",
aw:function(a,b,c,d){return this.a.iv(a,d,c,!0===b)},
eq:function(a,b,c){return this.aw(a,null,b,c)}},
dV:{"^":"d;c6:a@,$ti"},
dT:{"^":"dV;as:b<,a,$ti",
er:function(a){a.cl(this.b)}},
dU:{"^":"dV;be:b<,bc:c<,a",
er:function(a){a.cn(this.b,this.c)},
$asdV:I.b5},
oP:{"^":"d;",
er:function(a){a.cm()},
gc6:function(){return},
sc6:function(a){throw H.c(new P.F("No events after a done."))}},
pk:{"^":"d;co:a<,$ti",
cP:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cf(new P.pl(this,a))
this.a=1},
fk:function(){if(this.a===1)this.a=3}},
pl:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc6()
z.b=w
if(w==null)z.c=null
x.er(this.b)}},
dZ:{"^":"pk;b,c,a,$ti",
gK:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc6(b)
this.c=b}}},
pt:{"^":"d;a,b,c,$ti"},
pJ:{"^":"a:1;a,b,c",
$0:function(){return this.a.b1(this.b,this.c)}},
pI:{"^":"a:20;a,b",
$2:function(a,b){P.pH(this.a,this.b,a,b)}},
pK:{"^":"a:1;a,b",
$0:function(){return this.a.b0(this.b)}},
dW:{"^":"a8;$ti",
aw:function(a,b,c,d){return this.hU(a,d,c,!0===b)},
eq:function(a,b,c){return this.aw(a,null,b,c)},
hU:function(a,b,c,d){return P.oT(this,a,b,c,d,H.w(this,"dW",0),H.w(this,"dW",1))},
eY:function(a,b){b.bH(a)},
i4:function(a,b,c){c.bZ(a,b)},
$asa8:function(a,b){return[b]}},
h0:{"^":"c7;x,y,a,b,c,d,e,f,r,$ti",
bH:function(a){if((this.e&2)!==0)return
this.hu(a)},
bZ:function(a,b){if((this.e&2)!==0)return
this.hv(a,b)},
e_:[function(){var z=this.y
if(z==null)return
z.cD()},"$0","gdZ",0,0,6],
e1:[function(){var z=this.y
if(z==null)return
z.cG()},"$0","ge0",0,0,6],
dY:function(){var z=this.y
if(z!=null){this.y=null
return z.c1()}return},
ky:[function(a){this.x.eY(a,this)},"$1","gi1",2,0,function(){return H.b3(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"h0")}],
kA:[function(a,b){this.x.i4(a,b,this)},"$2","gi3",4,0,46],
kz:[function(){this.dG()},"$0","gi2",0,0,6],
hF:function(a,b,c,d,e,f,g){this.y=this.x.a.eq(this.gi1(),this.gi2(),this.gi3())},
$asc7:function(a,b){return[b]},
A:{
oT:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.h0(a,null,null,null,null,z,y,null,null,[f,g])
y.eL(b,c,d,e,g)
y.hF(a,b,c,d,e,f,g)
return y}}},
pi:{"^":"dW;b,a,$ti",
eY:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.pC(b,y,x)
return}b.bH(z)}},
cl:{"^":"d;be:a<,bc:b<",
k:function(a){return H.b(this.a)},
$isX:1},
pB:{"^":"d;"},
pV:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cD()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
pm:{"^":"pB;",
fZ:function(a){var z,y,x,w
try{if(C.h===$.p){x=a.$0()
return x}x=P.hg(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
h0:function(a,b){var z,y,x,w
try{if(C.h===$.p){x=a.$1(b)
return x}x=P.hi(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
ke:function(a,b,c){var z,y,x,w
try{if(C.h===$.p){x=a.$2(b,c)
return x}x=P.hh(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
ea:function(a,b){if(b)return new P.pn(this,a)
else return new P.po(this,a)},
i:function(a,b){return},
fY:function(a){if($.p===C.h)return a.$0()
return P.hg(null,null,this,a)},
ew:function(a,b){if($.p===C.h)return a.$1(b)
return P.hi(null,null,this,a,b)},
kd:function(a,b,c){if($.p===C.h)return a.$2(b,c)
return P.hh(null,null,this,a,b,c)}},
pn:{"^":"a:1;a,b",
$0:function(){return this.a.fZ(this.b)}},
po:{"^":"a:1;a,b",
$0:function(){return this.a.fY(this.b)}}}],["","",,P,{"^":"",
dm:function(a,b){return new H.N(0,null,null,null,null,null,0,[a,b])},
aS:function(){return new H.N(0,null,null,null,null,null,0,[null,null])},
ae:function(a){return H.ra(a,new H.N(0,null,null,null,null,null,0,[null,null]))},
kA:function(a,b,c){var z,y
if(P.e2(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bM()
y.push(a)
try{P.pR(a,z)}finally{if(0>=y.length)return H.e(y,-1)
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
pR:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
kT:function(a,b,c,d,e){return new H.N(0,null,null,null,null,null,0,[d,e])},
bZ:function(a,b,c){var z=P.kT(null,null,null,b,c)
a.L(0,new P.q5(z))
return z},
U:function(a,b,c,d){return new P.h3(0,null,null,null,null,null,0,[d])},
b_:function(a,b){var z,y
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
a.L(0,new P.l0(z,y))
z=y
z.v=z.gv()+"}"}finally{z=$.$get$bM()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gv()
return z.charCodeAt(0)==0?z:z},
h4:{"^":"N;a,b,c,d,e,f,r,$ti",
cw:function(a){return H.ru(a)&0x3ffffff},
cz:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfD()
if(x==null?b==null:x===b)return y}return-1},
A:{
bJ:function(a,b){return new P.h4(0,null,null,null,null,null,0,[a,b])}}},
h3:{"^":"p5;a,b,c,d,e,f,r,$ti",
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
return y[b]!=null}else return this.hS(b)},
hS:function(a){var z=this.d
if(z==null)return!1
return this.cX(z[this.cW(a)],a)>=0},
c5:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a_(0,a)?a:null
else return this.i8(a)},
i8:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cW(a)]
x=this.cX(y,a)
if(x<0)return
return J.at(y,x).geU()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gB:function(a){var z=this.f
if(z==null)throw H.c(new P.F("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eP(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eP(x,b)}else return this.at(b)},
at:function(a){var z,y,x
z=this.d
if(z==null){z=P.pe()
this.d=z}y=this.cW(a)
x=z[y]
if(x==null)z[y]=[this.dK(a)]
else{if(this.cX(x,a)>=0)return!1
x.push(this.dK(a))}return!0},
ar:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eQ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eQ(this.c,b)
else return this.il(b)},
il:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cW(a)]
x=this.cX(y,a)
if(x<0)return!1
this.eR(y.splice(x,1)[0])
return!0},
hZ:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.ar(0,y)}},
aX:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eP:function(a,b){if(a[b]!=null)return!1
a[b]=this.dK(b)
return!0},
eQ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eR(z)
delete a[b]
return!0},
dK:function(a){var z,y
z=new P.pd(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eR:function(a){var z,y
z=a.ghR()
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
for(y=0;y<z;++y)if(J.f(a[y].geU(),b))return y
return-1},
$isbB:1,
$isT:1,
A:{
pe:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
pd:{"^":"d;eU:a<,b,hR:c<"},
ao:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
p5:{"^":"mB;$ti",
bw:function(a){var z=this.dW()
z.an(0,this)
return z}},
cz:{"^":"y;$ti"},
q5:{"^":"a:7;a",
$2:function(a,b){this.a.m(0,a,b)}},
eV:{"^":"f_;$ti"},
f_:{"^":"d+b0;$ti",$asI:null,$asT:null,$isI:1,$isT:1},
b0:{"^":"d;$ti",
gY:function(a){return new H.dn(this,this.gl(this),0,null,[H.w(this,"b0",0)])},
aj:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gaf:function(a){return!this.gK(this)},
gB:function(a){if(this.gl(this)===0)throw H.c(H.ad())
return this.i(0,this.gl(this)-1)},
a_:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.f(this.i(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bL:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aY:function(a,b){return new H.ak(this,b,[H.w(this,"b0",0),null])},
dB:function(a,b){return H.fz(this,b,null,H.w(this,"b0",0))},
bw:function(a){var z,y
z=P.U(null,null,null,H.w(this,"b0",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.i(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.m(0,z,b)},
ar:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.f(this.i(0,z),b)){this.aP(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
hY:function(a,b){var z,y,x,w
z=H.t([],[H.w(this,"b0",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.f(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hm(0,0,z.length,z)
this.sl(0,z.length)}},
aP:function(a,b,c,d,e){var z,y,x,w,v
P.cI(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aM(d,"$isI",[H.w(this,"b0",0)],"$asI")){y=e
x=d}else{x=J.id(d,e).bv(0,!1)
y=0}w=J.K(x)
if(y+z>w.gl(x))throw H.c(H.eM())
if(y<b)for(v=z-1;v>=0;--v)this.m(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.m(0,b+v,w.i(x,y+v))},
hm:function(a,b,c,d){return this.aP(a,b,c,d,0)},
k:function(a){return P.bV(this,"[","]")},
$isI:1,
$isT:1},
pA:{"^":"d;$ti",
m:function(a,b,c){throw H.c(new P.O("Cannot modify unmodifiable map"))},
$isE:1},
kZ:{"^":"d;$ti",
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
fV:{"^":"kZ+pA;a,$ti",$asE:null,$isE:1},
l0:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.v+=", "
z.a=!1
z=this.b
y=z.v+=H.b(a)
z.v=y+": "
z.v+=H.b(b)}},
kU:{"^":"aT;a,b,c,d,$ti",
gY:function(a){return new P.h5(this,this.c,this.d,this.b,null,this.$ti)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
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
aj:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cw(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.at(b)},
an:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aM(b,"$isI",z,"$asI")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.kV(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.iz(s)
this.a=s
this.b=0
C.a.aP(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aP(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aP(v,z,z+r,b,0)
C.a.aP(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.h5(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.at(z.e)},
aX:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bV(this,"{","}")},
fi:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eX();++this.d},
df:function(){var z,y,x,w
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
if(this.b===x)this.eX();++this.d},
eX:function(){var z,y,x,w
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
iz:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aP(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aP(a,0,v,x,z)
C.a.aP(a,v,v+this.c,this.a,0)
return this.c+v}},
hx:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
A:{
b1:function(a,b){var z=new P.kU(null,0,0,0,[b])
z.hx(a,b)
return z},
kV:function(a){var z
a=C.t.eD(a,1)-1
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
mC:{"^":"d;$ti",
gK:function(a){return this.a===0},
gaf:function(a){return this.a!==0},
an:function(a,b){var z
for(z=J.aj(b);z.u();)this.q(0,z.gG())},
iW:function(a){var z,y
for(z=a.a,y=new P.ao(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a_(0,y.d))return!1
return!0},
bv:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ao(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
c9:function(a){return this.bv(a,!0)},
aY:function(a,b){return new H.bt(this,b,[H.m(this,0),null])},
k:function(a){return P.bV(this,"{","}")},
L:function(a,b){var z
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
b5:function(a,b,c){var z,y
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gB:function(a){var z,y
z=new P.ao(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ad())
do y=z.d
while(z.u())
return y},
bf:function(a,b,c){var z,y
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
aI:function(a,b){var z,y,x,w
for(z=new P.ao(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dh())
y=w
x=!0}}if(x)return y
throw H.c(H.ad())},
$isbB:1,
$isT:1},
mB:{"^":"mC;$ti"}}],["","",,P,{"^":"",
cW:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.p8(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cW(a[z])
return a},
pU:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.P(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eJ(w,null,null))}w=P.cW(z)
return w},
ua:[function(a){return a.dj()},"$1","r0",2,0,0],
p8:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.ij(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.ce().length
return z},
gK:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.ce().length
return z===0},
gaf:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.ce().length
return z>0},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a0(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.ix().m(0,b,c)},
a0:function(a){if(this.b==null)return this.c.a0(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.ce()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cW(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dr(this)},
ce:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
ix:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dm(P.q,null)
y=this.ce()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
ij:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cW(this.a[a])
return this.b[a]=z},
$isE:1,
$asE:function(){return[P.q,null]}},
ey:{"^":"d;$ti"},
cr:{"^":"d;$ti"},
dl:{"^":"X;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
kG:{"^":"dl;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
kF:{"^":"ey;a,b",
j_:function(a,b){var z=P.pU(a,this.gj0().a)
return z},
iZ:function(a){return this.j_(a,null)},
j8:function(a,b){var z=this.gj9()
z=P.pa(a,z.b,z.a)
return z},
fs:function(a){return this.j8(a,null)},
gj9:function(){return C.N},
gj0:function(){return C.M},
$asey:function(){return[P.d,P.q]}},
kI:{"^":"cr;a,b",
$ascr:function(){return[P.d,P.q]}},
kH:{"^":"cr;a",
$ascr:function(){return[P.q,P.d]}},
pb:{"^":"d;",
h9:function(a){var z,y,x,w,v,u,t
z=J.K(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cs(a,v)
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
if(a==null?w==null:a===w)throw H.c(new P.kG(a,null))}z.push(a)},
dn:function(a){var z,y,x,w
if(this.h8(a))return
this.dI(a)
try{z=this.b.$1(a)
if(!this.h8(z))throw H.c(new P.dl(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dl(a,y))}},
h8:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.v+=C.n.k(a)
return!0}else if(a===!0){this.c.v+="true"
return!0}else if(a===!1){this.c.v+="false"
return!0}else if(a==null){this.c.v+="null"
return!0}else if(typeof a==="string"){z=this.c
z.v+='"'
this.h9(a)
z.v+='"'
return!0}else{z=J.n(a)
if(!!z.$isI){this.dI(a)
this.kr(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isE){this.dI(a)
y=this.ks(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kr:function(a){var z,y,x
z=this.c
z.v+="["
y=J.K(a)
if(y.gl(a)>0){this.dn(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.v+=","
this.dn(y.i(a,x))}}z.v+="]"},
ks:function(a){var z,y,x,w,v,u,t
z={}
if(a.gK(a)){this.c.v+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.pc(z,x))
if(!z.b)return!1
w=this.c
w.v+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.v+=v
this.h9(x[u])
w.v+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dn(x[t])}w.v+="}"
return!0}},
pc:{"^":"a:7;a,b",
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
p9:{"^":"pb;c,a,b",A:{
pa:function(a,b,c){var z,y,x
z=new P.bG("")
y=new P.p9(z,[],P.r0())
y.dn(a)
x=z.v
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
tH:[function(a,b){return J.ch(a,b)},"$2","r1",4,0,41],
eE:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.jW(a)},
jW:function(a){var z=J.n(a)
if(!!z.$isa)return z.k(a)
return H.cF(a)},
cu:function(a){return new P.oS(a)},
V:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.aj(a);y.u();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
kW:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
ee:function(a){H.rz(H.b(a))},
be:function(a,b,c){return new H.eS(a,H.dj(a,!1,b,!1),null,null)},
W:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
cs:{"^":"d;iy:a<,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cs))return!1
return this.a===b.a&&!0},
bq:function(a,b){return C.e.bq(this.a,b.giy())},
gw:function(a){var z=this.a
return(z^C.e.d2(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.ji(H.lK(this))
y=P.bS(H.lI(this))
x=P.bS(H.lE(this))
w=P.bS(H.lF(this))
v=P.bS(H.lH(this))
u=P.bS(H.lJ(this))
t=P.jj(H.lG(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjq()
y=new P.cs(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.h(P.G(y.gjM()))
return y},
gjM:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.cs]},
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
aN:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+double":0,
aZ:{"^":"d;bJ:a<",
a4:function(a,b){return new P.aZ(this.a+b.gbJ())},
aJ:function(a,b){return new P.aZ(this.a-b.gbJ())},
bW:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.aZ(C.n.fX(this.a*b))},
aH:function(a,b){return C.e.aH(this.a,b.gbJ())},
bz:function(a,b){return this.a>b.gbJ()},
bV:function(a,b){return C.e.bV(this.a,b.gbJ())},
bF:function(a,b){return C.e.bF(this.a,b.gbJ())},
gjq:function(){return C.e.bC(this.a,1000)},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aZ))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
bq:function(a,b){return C.e.bq(this.a,b.gbJ())},
k:function(a){var z,y,x,w,v
z=new P.jE()
y=this.a
if(y<0)return"-"+new P.aZ(0-y).k(0)
x=z.$1(C.e.bC(y,6e7)%60)
w=z.$1(C.e.bC(y,1e6)%60)
v=new P.jD().$1(y%1e6)
return""+C.e.bC(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eC:function(a){return new P.aZ(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aZ]}},
jD:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
jE:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
X:{"^":"d;",
gbc:function(){return H.A(this.$thrownJsError)}},
cD:{"^":"X;",
k:function(a){return"Throw of null."}},
aY:{"^":"X;a,b,h:c<,d",
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
G:function(a){return new P.aY(!1,null,null,a)},
ck:function(a,b,c){return new P.aY(!0,a,b,c)},
l:function(a){return new P.aY(!1,null,a,"Must not be null")}}},
dF:{"^":"aY;e,f,a,b,c,d",
gdO:function(){return"RangeError"},
gdN:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
lQ:function(a){return new P.dF(null,null,!1,null,null,a)},
c0:function(a,b,c){return new P.dF(null,null,!0,a,b,"Value not in range")},
Y:function(a,b,c,d,e){return new P.dF(b,c,!0,a,d,"Invalid value")},
lR:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.Y(a,b,c,d,e))},
cI:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.Y(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.Y(b,a,c,"end",f))
return b}}},
kp:{"^":"aY;e,l:f>,a,b,c,d",
gdO:function(){return"RangeError"},
gdN:function(){if(J.bP(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
A:{
cw:function(a,b,c,d,e){var z=e!=null?e:J.aD(b)
return new P.kp(b,z,!0,a,c,"Index out of range")}}},
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
lf:{"^":"d;",
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
oS:{"^":"d;a",
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
k_:{"^":"d;h:a<,f1,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.f1
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.ck(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dB(b,"expando$values")
return y==null?null:H.dB(y,z)},
m:function(a,b,c){var z,y
z=this.f1
if(typeof z!=="string")z.set(b,c)
else{y=H.dB(b,"expando$values")
if(y==null){y=new P.d()
H.f6(b,"expando$values",y)}H.f6(y,z,c)}}},
bv:{"^":"d;"},
u:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+int":0,
y:{"^":"d;$ti",
aY:function(a,b){return H.bw(this,b,H.w(this,"y",0),null)},
bU:["eK",function(a,b){return new H.J(this,b,[H.w(this,"y",0)])}],
a_:function(a,b){var z
for(z=this.gY(this);z.u();)if(J.f(z.gG(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gY(this);z.u();)b.$1(z.gG())},
b5:function(a,b,c){var z,y
for(z=this.gY(this),y=b;z.u();)y=c.$2(y,z.gG())
return y},
bv:function(a,b){return P.V(this,b,H.w(this,"y",0))},
c9:function(a){return this.bv(a,!0)},
bw:function(a){return P.b_(this,H.w(this,"y",0))},
gl:function(a){var z,y
z=this.gY(this)
for(y=0;z.u();)++y
return y},
gK:function(a){return!this.gY(this).u()},
gaf:function(a){return!this.gK(this)},
dB:function(a,b){return H.mE(this,b,H.w(this,"y",0))},
gB:function(a){var z,y
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
aj:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.h(P.Y(b,0,null,"index",null))
for(z=this.gY(this),y=0;z.u();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cw(b,this,"index",null,y))},
k:function(a){return P.kA(this,"(",")")}},
cA:{"^":"d;$ti"},
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
k:function(a){return H.cF(this)},
gbj:function(a){return new H.an(H.hD(this),null)},
toString:function(){return this.k(this)}},
bc:{"^":"d;"},
bB:{"^":"T;$ti"},
aU:{"^":"d;"},
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
nu:function(a){return new P.bG(a)}}}}],["","",,P,{"^":"",fi:{"^":"d;"}}],["","",,P,{"^":"",
cG:function(a){return C.F},
p7:{"^":"d;",
a9:function(a){if(a<=0||a>4294967296)throw H.c(P.lQ("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
jQ:function(){return Math.random()}}}],["","",,S,{"^":"",j7:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a0:function(a){return this.b.a0(a)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){var z=this.b
return z.gK(z)},
gaf:function(a){var z=this.b
return z.gaf(z)},
gl:function(a){var z=this.b
return z.gl(z)},
m:function(a,b,c){this.hT()
this.b.m(0,b,c)},
k:function(a){return J.i(this.b)},
hT:function(){if(!this.a)return
this.a=!1
this.b=P.bZ(this.b,H.m(this,0),H.m(this,1))},
$isE:1}}],["","",,A,{"^":"",j8:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c5:function(a){return this.b.c5(a)},
a_:function(a,b){return this.b.a_(0,b)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){return this.b.a===0},
gaf:function(a){return this.b.a!==0},
gY:function(a){var z,y
z=this.b
y=new P.ao(z,z.r,null,null,[null])
y.c=z.e
return y},
gB:function(a){var z=this.b
return z.gB(z)},
aY:function(a,b){var z=this.b
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
bw:function(a){var z,y
z=this.b
y=z.dW()
y.an(0,z)
return y},
q:function(a,b){this.ia()
return this.b.q(0,b)},
k:function(a){return J.i(this.b)},
ia:function(){if(!this.a)return
this.a=!1
this.b=P.b_(this.b,H.m(this,0))},
$isbB:1,
$isT:1}}],["","",,S,{"^":"",da:{"^":"d;f3:a<,b,$ti",
a2:function(a){var z=new S.af(null,null,this.$ti)
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
aY:function(a,b){var z=this.a
z.toString
return new H.ak(z,b,[H.m(z,0),null])},
a_:function(a,b){var z=this.a
return(z&&C.a).a_(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
bw:function(a){var z=this.a
z.toString
return P.b_(z,H.m(z,0))},
gK:function(a){return this.a.length===0},
gaf:function(a){return this.a.length!==0},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
au:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new BuiltList<int>"'))}},af:{"^":"d;f3:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.da(z,null,this.$ti)
y.au()
this.a=z
this.b=y
z=y}return z},
n:function(a){if(H.aM(a,"$isda",this.$ti,null)){this.a=a.gf3()
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
aY:function(a,b){var z=this.a
z.toString
z=new H.ak(z,b,[H.m(z,0),null]).bv(0,!0)
this.a=z
this.b=null
this.hO(z)},
ge3:function(){if(this.b!=null){this.a=P.V(this.a,!0,H.m(this,0))
this.b=null}return this.a},
au:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new ListBuilder<int>"'))},
hO:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.as)(a),++x){w=a[x]
if(!H.d_(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",co:{"^":"d;i9:a<,b,c,d,$ti",
a2:function(a){var z=new A.dq(null,null,this.$ti)
z.cj()
z.n(this)
a.$1(z)
return z.p()},
D:function(){return new S.j7(!0,this.a,this.$ti)},
gw:function(a){var z=this.b
if(z==null){z=this.a.gc3()
z=H.bw(z,new A.iT(this),H.w(z,"y",0),null)
z=P.V(z,!1,H.w(z,"y",0))
C.a.eG(z)
z=X.bq(z)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isco)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc3()
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
cj:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.an(H.S(H.m(this,1)),null).t(0,C.m))throw H.c(new P.O('explicit value type required, for example "new BuiltMap<int, int>"'))}},iT:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.cX(X.aV(X.aV(0,J.j(z)),J.j(y)))}},dq:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.co(this.a,null,null,null,this.$ti)
z.cj()
this.b=z}return z},
n:function(a){var z
if(H.aM(a,"$isco",this.$ti,null)){this.b=a
this.a=a.gi9()}else if(!!a.$isco){z=P.bZ(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isE){z=P.bZ(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbj(a))))},
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){if(c==null)H.h(P.G("null value"))
this.gip().m(0,b,c)},
gip:function(){if(this.b!=null){this.a=P.bZ(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
cj:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.an(H.S(H.m(this,1)),null).t(0,C.m))throw H.c(new P.O('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",db:{"^":"d;ir:a<,b,$ti",
a2:function(a){var z=new L.bf(null,null,this.$ti)
z.bo()
z.n(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.V(new H.bt(z,new L.iU(),[H.m(z,0),null]),!1,null)
C.a.eG(z)
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
return y.iW(b)},
k:function(a){return J.i(this.a)},
gl:function(a){return this.a.a},
c5:function(a){return this.a.c5(a)},
gY:function(a){var z,y
z=this.a
y=new P.ao(z,z.r,null,null,[null])
y.c=z.e
return y},
aY:function(a,b){var z=this.a
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
a_:function(a,b){return this.a.a_(0,b)},
L:function(a,b){return this.a.L(0,b)},
bw:function(a){return new A.j8(!0,this.a,this.$ti)},
gK:function(a){return this.a.a===0},
gaf:function(a){return this.a.a!==0},
gB:function(a){var z=this.a
return z.gB(z)},
bo:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new BuiltSet<int>"'))}},iU:{"^":"a:0;",
$1:function(a){return J.j(a)}},bf:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.db(this.a,null,this.$ti)
z.bo()
this.b=z}return z},
n:function(a){var z,y,x,w
if(H.aM(a,"$isdb",this.$ti,null)){this.a=a.gir()
this.b=a}else{z=H.m(this,0)
y=P.U(null,null,null,z)
for(x=J.aj(a);x.u();){w=x.gG()
if(H.d_(w,z))y.q(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.h(P.G("null element"))
this.gfa().q(0,b)},
aY:function(a,b){var z=this.a
z.toString
z=P.b_(new H.bt(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.is(z)},
gfa:function(){if(this.b!=null){this.a=P.b_(this.a,H.m(this,0))
this.b=null}return this.a},
bo:function(){if(new H.an(H.S(H.m(this,0)),null).t(0,C.m))throw H.c(new P.O('explicit element type required, for example "new SetBuilder<int>"'))},
is:function(a){var z,y,x
for(z=new P.ao(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.d_(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
R:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",md:{"^":"mb;ch,cx,aq:cy@,b_:db@,bm:dx@,b,c,d,e,f,r,x,y,z,Q,a",
fR:function(){var z=$.$get$cg()
z.m(0,"game",this.cx)
z.m(0,"hitpoints",this.cy)
z.m(0,"stamina",this.db)
z.m(0,"gold",this.dx)},
js:function(){var z,y,x,w
this.cx=null
this.cy=Z.bE("Health",new N.mg(),"#CCCCCC","Your physical state",100,0,!0,P.aN)
z=P.u
this.db=Z.bE("Stamina",new N.mh(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bE("Gold",new N.mi(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bN()
x=this.cy
w=this.db
y=new O.eD(N.bb("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a_(H.t([],[Y.a6]),0,P.aS()),x,w,z,O.rF(),O.rE(),O.rD(),y,this.ghp(),new P.bG(""),!1,null)
y.hn()
this.cx=y
y.x="endGame"
$.$get$cc().q(0,0)},
hA:function(){var z,y
z=new O.cM([[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.m(0,"start",z)
z.a="start"
z=new O.cM([new N.mf(this),[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y.m(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cM(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.m(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
A:{
me:function(){var z,y,x,w
z=Z.bE("Health",new N.qD(),"#CCCCCC","Your physical state",100,0,!0,P.aN)
y=P.u
x=Z.bE("Stamina",new N.qF(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bE("Gold",new N.qG(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.md("net.filiph.edgehead.0.0.1",null,z,x,y,new O.mj(new H.N(0,null,null,null,null,null,0,[w,O.cM])),null,null,null,P.U(null,null,null,w),!1,null,-9999,null,null,null)
z.hA()
return z}}},qD:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.bV(a,0.5))return"\ud83d\ude23"
if(z.aH(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},qF:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},qG:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},mf:{"^":"a:18;a",
$0:function(){var z=0,y=P.au(),x=this
var $async$$0=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:z=2
return P.ap(x.a.cx.bi(),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},mg:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.bV(a,0.5))return"\ud83d\ude23"
if(z.aH(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},mh:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},mi:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bT:{"^":"d;"},jU:{"^":"d;"},of:{"^":"bT;a,b",
a2:function(a){var z=new M.dQ(null,!1,0)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bT))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return Y.R(Y.k(Y.k(0,C.K.gw(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},dQ:{"^":"jU;c,a,b",
gbG:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
n:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbG()
y=this.a
this.gbG()
z=new M.of(y,this.b)}this.n(z)
return z}}}],["","",,O,{"^":"",
ue:[function(a){var z,y
z=a.gbX()
y=a.gbO()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","d1",2,0,19],
ul:[function(a){var z,y,x
z=a.gbX()
y=a.gcI()
if(typeof y!=="number")return H.x(y)
x=a.gbO()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ht",2,0,19],
eD:{"^":"kY;y,z,Q,ch,cx,cy,db,dx,dy,bx:fr<,fx,eH:fy<,aq:go<,b_:id<,bm:k1<,a,b,c,d,e,f,r,x",
hn:function(){var z,y,x,w,v,u
z=$.$get$aX()
y=$.$get$cd()
this.cy=R.b8(1000,"orc",O.d1(),null,new U.c5(!1,10,!0,z,"sword",C.c),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b8(1001,"goblin",O.d1(),null,new U.c5(!1,10,!0,z,"scimitar",C.c),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.af(null,null,[Q.v])
y.au()
y.n([new Q.v("kill_agruth","","",null)])
this.dx=new K.c2(y.p(),"preStartBook",new O.jL(),new O.jM(),null,null,"ground")
y=R.b8(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.z,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.cO()
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
v=P.b_([z,v],R.C)
z=P.b1(null,O.ci)
u=new A.a7(v,P.U(null,null,null,U.aQ),w,z,P.b_(x,y),P.V([u],!0,S.a2),0,null)
this.fr=u
y=new Y.a_(H.t([],[Y.a6]),0,P.aS())
y.b=u.r
this.fx=new B.bx(u,null,y,1,1,!0,!1,!1,0)},
cL:function(){var z=0,y=P.au(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cL=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gj7()
if(v.fO(u)){z=1
break}t=w.fr.al(w.ch.y)
s=t.gaq()
r=t.gfJ()
if(typeof s!=="number"){x=s.cO()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sas(s/r)
w.id.sas(t.gb_())
w.k1.sas(t.gbm())
r=w.y
r.fF("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.F(0,"\n\n",!0)
if(w.fr.jn(w.ch.y))v.F(0,"TO BE CONTINUED.",!0)
else v.F(0,"You died.",!0)
w.f.v+=v.c7()
z=1
break}q=C.a.gB(s)
p=q.ds(w.fr)
s=w.fr
o=N.bb("ActorPlanner")
n=new H.N(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.a_(H.t([],[Y.a6]),0,P.aS())
k.b=s.r
j=new G.ij(o,l,new B.bx(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.h(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(s)+". Situation: "+H.b(s.giY())))
z=3
return P.ap(j.jU(),$async$cL)
case 3:if(n.gK(n)){o.ez("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.n(s)
s="PlanConsequence<"+l.gw(s)+", "+l.k(s)+", "+C.t.k(null)
o.bD(m+(s+", 1, 0, >")+".")}s=Z.lm(n)
i=new Z.ll(new P.fV(n,[null,null]),s)
if(n.gK(n))$.$get$by().ez("Created with no recommendations.")
if(s.length===0){r.dw("No recommendation for "+H.b(p.gh()))
r.dw(new O.jO(w))
w.fr.fq(q.gj());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.as)(s),++h);r.bD("planner.generateTable for "+H.b(p.gh()))
j.eA().L(0,new O.jP(w))
u=i.fQ(q.gfI(),O.ht())
u.toString
g=P.V(u,!1,H.w(u,"y",0))
if(g.length!==0&&C.a.bL(g,new O.jQ())){w.f.v+=v.c7()
C.a.sl(v.a,0)}v=new O.jR(new O.jT())
u=g.length-1
if(u-0<=32)H.fr(g,0,u,v)
else H.fq(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.as)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gS(),new O.jS(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfp()
z=7
return P.ap(w.cb(i.jT(s==null?O.ht():s),p,v),$async$cL)
case 7:case 5:v.fO(u)
case 1:return P.ax(x,y)}})
return P.ay($async$cL,y)},
cb:function(a,b,c){var z=0,y=P.au(),x,w=this,v,u,t
var $async$cb=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:v=a.d3(b,w.fx,w.fr)
u=P.V(v,!0,H.w(v,"y",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.ap(w.cV(a,b,u),$async$cb)
case 6:z=4
break
case 5:t=S.lO(new H.ak(u,new O.jI(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.an(c.a,w.fx.geH().a)
w.fr=w.fx.gbx()
v=w.y
v.bD(new O.jJ(a,b))
v.a7(new O.jK(w,b))
case 1:return P.ax(x,y)}})
return P.ay($async$cb,y)},
cV:function(a,b,c){var z=0,y=P.au(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cV=P.aq(function(d,e){if(d===1)return P.aw(e,y)
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
case 7:u=C.a.gB(J.i(a.gO()).split("."))
v=a.ah(b,x.fr)
t=a.gU()&&b.jo(a.gO())
s="use "+H.b(u)
x.f6()
z=8
return P.ap(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$cV)
case 8:r=e
t=new H.J(c,new O.jF(r),[H.m(c,0)])
x.fx=t.gbY(t)
if(r.gkq()===!0){q=A.dP(x.fx.gbx())
q.a3(b.gj(),new O.jG())
v=x.fx
t=v.gfc()
s=H.t([],[Y.a6])
p=new Y.a_(s,0,P.aS())
C.a.an(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bx(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.ax(null,y)}})
return P.ay($async$cV,y)}},
jL:{"^":"a:3;",
$3:function(a,b,c){return c.F(0,"UNUSED because this is the first choice",!0)}},
jM:{"^":"a:3;",
$3:function(a,b,c){return H.h(new P.F("Room isn't to be revisited"))}},
jO:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ak(z,new O.jN(),[H.m(z,0),null]).cB(0," <- ")}},
jN:{"^":"a:0;",
$1:function(a){return a.gb3()}},
jP:{"^":"a:0;a",
$1:function(a){return this.a.y.bD(a)}},
jT:{"^":"a:42;",
$1:function(a){if(a instanceof Q.H)return H.b(a.b.gh())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
jQ:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
jR:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.ch(z.$1(a),z.$1(b))}},
jS:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.au(),x=this,w
var $async$$0=P.aq(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ap(w.cb(x.c,x.b,w.fy),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},
jI:{"^":"a:0;",
$1:function(a){return a.gjV()}},
jJ:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
jK:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ak(z,new O.jH(),[H.m(z,0),null]).cB(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
jH:{"^":"a:0;",
$1:function(a){return a.gb3()}},
jF:{"^":"a:0;a",
$1:function(a){return a.gem()===this.a.gem()}},
jG:{"^":"a:0;",
$1:function(a){var z=a.gb_()
if(typeof z!=="number")return z.aJ()
a.sb_(z-1)
return a}}}],["","",,Q,{"^":"",
hy:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hy(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gB(t):null
s=J.ih(t.aO(y.a,y),new Q.rf(z))
t=J.aj(s.a),r=new H.fW(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gT()&&!z.eh(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
hz:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hz(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.du((t.length!==0?C.a.gB(t):null).gbr()).gjb().a,t=new J.bQ(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
hA:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hA(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gB(t):null).gcu(),t=t.gY(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
rf:{"^":"a:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gbg()}},
ab:{"^":"d;",
d3:function(a,b,c){var z=this
return P.aL(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$d3(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.N(y,x.gbx())
r=J.a9(s)
v=r.bz(s,0)?2:3
break
case 2:q=A.dP(w)
v=4
return B.f3(q,x,z,z.hK(q,y,w,z.gR(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aH(s,1)?5:6
break
case 5:q=A.dP(w)
p=z.hJ(q,y,w,z.gP(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.f3(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aJ()
case 1:return P.aK(t)}}})},
eN:function(a,b,c,d,e,f){var z,y,x,w,v,u
a.x=this
z=a.a.aI(0,new Q.ii(b))
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
x=this.ga1()
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
x.gfa().q(0,w)}v=new Y.a_(H.t([],[Y.a6]),0,P.aS())
x=a.f
u=(x.length!==0?C.a.gB(x):null).gj()
a.gw(a);(x.length!==0?C.a.gB(x):null).fN(a,v)
this.a=d.$3(z,a,v)
if(a.cY(u)!=null)a.fq(u);++a.r
w=a.eB(u)
if(!(w==null))w.fM(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gB(x):null
if((w==null?w:w.ds(a))!=null){w=x.length!==0?C.a.gB(x):null
w=!J.f(w==null?w:w.dz(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gB(x):null)==null)break
C.a.gB(x).aZ(a)
C.a.b9(x)}if(this.a==null)H.h(new P.F("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.gZ().d=x
x=a.r
y.gZ().x=x
a.d.fi(y.p())
return v},
hK:function(a,b,c,d,e){return this.eN(a,b,c,d,!1,e)},
hJ:function(a,b,c,d,e){return this.eN(a,b,c,d,e,!1)}},
ii:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.gj())}},
H:{"^":"ab;bO:b<",
gX:function(){var z=new Y.a_(H.t([],[Y.a6]),0,P.aS())
z.ff(0,this.gae(),this.b)
return z.c7()},
ah:function(a,b){var z=new Y.a_(H.t([],[Y.a6]),0,P.aS())
z.iJ(0,this.gag(),this.b,a,!0)
return z.c7()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gae()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cv:{"^":"ab;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
cx:{"^":"ab;",
gX:function(){var z=new Y.a_(H.t([],[Y.a6]),0,P.aS())
z.ff(0,"pick up <object>",this.b)
return z.c7()},
k:function(a){return"ItemAction<"+this.gX()+">"}},
lY:{"^":"d;a,b",
k:function(a){return this.b},
A:{"^":"u2<"}}}],["","",,O,{"^":"",ci:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},kP:{"^":"d;a,b",
k:function(a){return this.b}},ob:{"^":"ci;a,fe:b<,b3:c<,d,de:e<,eJ:f<,J:r<,h5:x<,h6:y<,z,h7:Q<",
a2:function(a){var z=new O.eo(null,null,null,null,null,null,null,null,null,null,null,null)
z.n(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.ci))return!1
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
gfe:function(){return this.gZ().c},
gb3:function(){return this.gZ().d},
gde:function(){return this.gZ().f},
geJ:function(){var z,y
z=this.gZ()
y=z.r
if(y==null){y=new L.bf(null,null,[P.u])
y.bo()
y.n(C.f)
z.r=y
z=y}else z=y
return z},
gJ:function(){return this.gZ().x},
gh5:function(){return this.gZ().y},
gh6:function(){return this.gZ().z},
gh7:function(){return this.gZ().ch},
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
z=new O.ob(y,x,w,v,u,t,s,r,q,p,o)
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
hB:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hB(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bI(new H.J(u,new R.rg(z),[H.m(u,0)]))
case 3:return P.aJ()
case 1:return P.aK(v)}}})},
b8:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.ep(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.qy(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
rg:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfw()
y=this.a.gj()
return z==null?y==null:z===y}},
C:{"^":"l1;",
gbt:function(){var z=this.x
if(typeof z!=="number")return z.bz()
return z>0},
gc2:function(){return this.e==null},
gb6:function(){return this.dy===C.i},
gaa:function(){return this.dy===C.l},
ga8:function(){return this.dy===C.k},
jo:function(a){var z=this.fy
if(typeof z!=="number")return z.bF()
return z>=1},
eh:function(a,b){return this.fE(a,b)>0},
fE:function(a,b){var z,y
if(this.el(b)){z=a.gbk()
y=this.go.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.i5(a,b,10))return 1
z=a.gbk()
y=this.go.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
el:function(a){var z,y
z=a.cJ("Confuse",this,!0)
if(z==null)return!1
y=a.kg("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cR:function(a){var z,y,x
z=a.al(this.y)
y=z.gaq()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gbt())x-=10
if(z.e!=null)x+=4
y=a.a
return new A.cj(x,new H.J(y,new R.iN(this),[H.m(y,0)]).b5(0,0,new R.iO()),y.b5(0,0,new R.iP(this,a)))},
aF:function(a){var z=this.e
return z!=null&&J.f(z.gbS(),a)},
i5:function(a,b,c){var z=b.kh(a,this,!0)
if(z==null)return!1
return z<=c},
$isbu:1},
l1:{"^":"d+de;"},
qy:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().z=this.a
a.gC().dx=this.b
a.gC().dy=this.d
a.gC().fx=this.e
a.gC().f=this.f
a.gC().b=!0
a.gC().c=[]
a.gC().fr=C.k
a.gC().y=this.r
a.gC().db=this.x
a.gC().x=this.Q
a.gC().go=this.y
a.gC().Q=this.z
a.gC().ch=!0
a.gC().cx=this.c
z=P.U(null,null,null,null)
a.gC().cy=z
z=this.cy
if(z!=null){y=new L.bh(null,null)
y.n(z)
z=y}else{z=$.$get$hP()
z.toString
y=new L.bh(null,null)
y.n(z)
z=y}a.gC().id=z
a.gC().e=this.ch
a.gC().r=this.cx
a.gC().d=this.db
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
return J.a5(a,(z+y)*this.a.fE(b,this.b))}},
dz:{"^":"d;a,b",
k:function(a){return this.b}},
oc:{"^":"C;a,b,fp:c<,br:d<,a6:e<,fw:f<,bm:r<,aq:x<,j:y<,z,ej:Q<,H:ch<,cx,fJ:cy<,h:db<,da:dx<,am:dy<,I:fr<,fx,b_:fy<,bk:go<",
a2:function(a){var z=new R.ep(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
gfp:function(){return this.gC().d},
gbr:function(){return this.gC().e},
sbr:function(a){this.gC().e=a
return a},
ga6:function(){return this.gC().f},
sa6:function(a){this.gC().f=a
return a},
gfw:function(){return this.gC().r},
gbm:function(){return this.gC().x},
sbm:function(a){this.gC().x=a
return a},
gaq:function(){return this.gC().y},
saq:function(a){this.gC().y=a
return a},
gj:function(){return this.gC().z},
gH:function(){return this.gC().cx},
gfJ:function(){return this.gC().db},
gh:function(){return this.gC().dx},
sh:function(a){this.gC().dx=a
return a},
gda:function(){return this.gC().dy},
gam:function(){return this.gC().fr},
sam:function(a){this.gC().fr=a
return a},
gI:function(){return this.gC().fx},
gb_:function(){return this.gC().go},
sb_:function(a){this.gC().go=a
return a},
gbk:function(){var z,y
z=this.gC()
y=z.id
if(y==null){y=new L.bh(null,null)
z.id=y
z=y}else z=y
return z},
gC:function(){var z,y
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
if(z==null){y=this.gC().b
x=this.gC().c
w=this.gC().d
v=this.gC().e
u=this.gC().f
t=this.gC().r
s=this.gC().x
r=this.gC().y
q=this.gC().z
p=this.gC().Q
o=this.gC().ch
n=this.gC().cx
m=this.gC().cy
l=this.gC().db
k=this.gC().dx
j=this.gC().dy
i=this.gC().fr
h=this.gC().fx
g=this.gC().fy
f=this.gC().go
e=this.gC()
d=e.id
if(d==null){d=new L.bh(null,null)
e.id=d
e=d}else e=d
z=new R.oc(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.p())
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
return z}}}],["","",,A,{"^":"",cj:{"^":"d;bX:a<,cI:b<,bO:c<",
aJ:function(a,b){return new A.ac(this.a-b.gbX(),J.aC(this.b,b.gcI()),J.aC(this.c,b.gbO()))},
k:function(a){return"ActorScore<self="+C.n.dl(this.a,2)+",team="+J.b7(this.b,2)+",enemy="+J.b7(this.c,2)+">"}},ac:{"^":"d;bX:a<,cI:b<,bO:c<",
gjD:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
bW:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ac(this.a*b,J.b6(this.b,b),J.b6(this.c,b))},
a4:function(a,b){return new A.ac(this.a+b.gbX(),J.a5(this.b,b.gcI()),J.a5(this.c,b.gbO()))},
cO:function(a,b){if(typeof b!=="number")return H.x(b)
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
tC:function(a){switch(a){case C.H:return"spear"
case C.I:return"branch"
case C.J:return"tent"
case C.c:return"sword"
default:throw H.c(P.G(a))}},
aQ:{"^":"l2;bS:a<",
gb3:function(){return U.tC(this.a)},
$isbu:1},
l2:{"^":"d+de;"},
cy:{"^":"d;a,b",
k:function(a){return this.b}},
c5:{"^":"aQ;b,c,ej:d<,bk:e<,h:f<,a",
gj:function(){return H.av(this)},
gbt:function(){return!1},
gH:function(){return!1},
gda:function(){return!1},
gI:function(){return C.q}}}],["","",,G,{"^":"",kY:{"^":"d;",
f6:function(){var z,y
z=this.f
y=z.v
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.v=""}},
kC:[function(a){this.f.v+=a},"$1","gj7",2,0,21],
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
return P.ap(w.cL(),$async$bi)
case 5:z=3
break
case 4:w.f6()
case 1:return P.ax(x,y)}})
return P.ay($async$bi,y)}}}],["","",,B,{"^":"",ez:{"^":"d;cQ:a<,d7:b<,cC:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.b7(this.b,3)+", score="+this.a.k(0)+">"}},bx:{"^":"d;bx:a<,fc:b<,eH:c<,jV:d<,d7:e<,f,r,em:x<,cC:y<",
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
y=z?e:J.b6(e,b.gd7())
z=z?0:b.gcC()+1
d.b=a.r
return new B.bx(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",ij:{"^":"d;a,b,c,d,e,f",
iU:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.a
z.a7("...")
z.a7("combining scores")
y=H.t([],[A.ac])
x=new G.iF()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gG()
z.a7(new G.iD(r))
if(J.a0(r.gd7(),0.15))if(s==null){z.a7("    - first _bestCase")
s=r}else if(J.a0(x.$1(r.gcQ()),x.$1(s.gcQ()))){z.a7("    - new _bestCase")
s=r}q=r.gcQ()
p=J.aC(q.b,u)
o=J.aC(q.c,t)
n=r.b
if(typeof n!=="number")return H.x(n)
m=new A.ac((q.a-v)*n,J.b6(p,n),J.b6(o,n))
z.a7(new G.iE(m))
y.push(m)}l=A.iM(y)
w=s==null
if(w)k=C.B
else{q=s.gcQ()
k=new A.ac(q.a-v,J.aC(q.b,u),J.aC(q.c,t))}w=w?s:s.gcC()
if(typeof w!=="number")return H.x(w)
j=new A.ac(k.a/w,J.br(k.b,w),J.br(k.c,w))
z.a7("- uplifts average = "+("ActorScoreChange<self="+C.n.dl(l.a,2)+",team="+J.b7(l.b,2)+",enemy="+J.b7(l.c,2)+">"))
z.a7("- best = "+j.k(0))
i=j.a4(0,l)
z.a7("- result = "+i.k(0))
return i},
eA:function(){var z=this
return P.aL(function(){var y=0,x=1,w,v,u,t,s
return function $async$eA(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc3(),u=u.gY(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aJ()
case 1:return P.aK(w)}}})},
dc:function(a,b,c){var z=0,y=P.au(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dc=P.aq(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=x.f
w.aX(0)
v=x.c
u=v.a
t=u.a.aI(0,new G.iG(x))
s=t.cR(u)
r=x.a
r.bD("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.b2(x.dQ(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.b4(new G.iH(t,o))
if(o.M(t,u)!==!0){r.b4(new G.iI(o))
z=2
break}z=4
return P.ap(x.cf(v,o,b,a,c).c9(0),$async$dc)
case 4:n=e
if(J.em(n)===!0){r.b4(new G.iJ(o))
w.m(0,o,C.C)
z=2
break}r.b4(new G.iK(s,o,n))
m=x.iU(n,s,b)
w.m(0,o,m)
r.b4(new G.iL(o,m))
z=2
break
case 3:x.e=!0
return P.ax(null,y)}})
return P.ay($async$dc,y)},
jU:function(){return this.dc(50,10,null)},
dQ:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dQ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bI((u.length!==0?C.a.gB(u):null).gbp())
case 2:u=(u.length!==0?C.a.gB(u):null).gaL()
t=u.length
s={func:1,ret:Q.cx,args:[U.aQ]}
r={func:1,ret:Q.cv,args:[Q.v]}
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
case 5:return P.aJ()
case 1:return P.aK(v)}}})},
cf:function(a5,a6,a7,a8,a9){var $async$cf=P.aq(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aI(0,new G.im(t))
p=t.a
p.b4("=====")
p.b4(new G.io(a6,q))
p.b4(new G.ip(a6))
if(a6.M(q,r)!==!0){p.b4("- firstAction not applicable")
z=1
break}o=q.cR(r)
p.b4(new G.iv(a5,o))
p.b4(new G.iw(a5))
n=P.b1(null,B.bx)
m=P.U(null,null,null,A.a7)
l=J.n(r)
k=l.gw(r)
for(j=new P.b2(a6.d3(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gG()
if(l.gw(r)!==k)throw H.c(new P.F("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.at(h)}s.a=0
r=t.b
case 3:if(!!n.gK(n)){z=4
break}++s.a
g=n.df()
p.a7("----")
p.a7(new G.ix(g))
p.a7(new G.iy(g))
if(g.gcC()>a7||s.a>a8){p.a7(new G.iz(s,a7,g))
p.a7(new G.iA(g))
z=4
break}z=g.gbx().f.length===0?5:6
break
case 5:p.a7("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bf(0,new G.iB(t),new G.iC())
if(q==null){p.a7("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.ez(q.cR(l),g.e,g.y)
p.a7(new G.iq(f))
z=7
x=[1]
return P.cV(P.h2(f),$async$cf,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gB(j):null).ds(l)
j=l.a
i=new H.J(j,new G.ir(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.F("World has several duplicates of mainActor: "+J.i(l)))
else if(d===0){p.fF("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aI(0,new G.is(t))
c=J.f(e,q)
p.a7("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.a7("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.cR(l)
if(b==null)b=C.D
f=new B.ez(b,g.e,g.y)
p.a7(new G.it(o,f))
p.a7(new G.iu(g))
z=8
x=[1]
return P.cV(P.h2(f),$async$cf,y)
case 8:p.a7("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b2(t.dQ(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.M(e,l)!==!0)continue
for(a1=new P.b2(a2.d3(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bP(a4.gd7(),0.05))continue
if(m.a_(0,a4.gbx()))continue
n.at(a4)}}p.a7("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.cV(null,0,y)
case 2:return P.cV(v,1,y)}})
var z=0,y=P.oD($async$cf),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.pY(y)}},iF:{"^":"a:38;",
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
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfc().gX()+"'"}},iy:{"^":"a:1;a",
$0:function(){var z=this.a.gbx().f
return"- situation: "+H.b(J.i8(z.length!==0?C.a.gB(z):null))}},iz:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcC()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iA:{"^":"a:1;a",
$0:function(){var z=this.a.gbx().d
return"- how we got here: "+new H.ak(z,new G.il(),[H.m(z,0),null]).cB(0," <- ")}},il:{"^":"a:0;",
$1:function(a){return a.gb3()}},iB:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},iC:{"^":"a:1;",
$0:function(){return}},iq:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},ir:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},is:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},it:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iu:{"^":"a:1;a",
$0:function(){var z=this.a.gbx().d
return"- how we got here: "+new H.ak(z,new G.ik(),[H.m(z,0),null]).cB(0," <- ")}},ik:{"^":"a:0;",
$1:function(a){return a.gb3()}}}],["","",,Z,{"^":"",ll:{"^":"d;a,b",
gbp:function(){return this.b},
gK:function(a){return this.b.length===0},
fQ:function(a,b){var z=this
return P.aL(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fQ(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bI(t)
case 5:w=1
break
case 4:s=z.i_(new Z.lo())
r=z.dP(new Z.lp(),[s])
q=z.dP(new Z.lq(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$by().bD("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$by().bD("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$by().bD("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cT(t,new Z.lr(z,x))
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
case 18:case 1:return P.aJ()
case 2:return P.aK(u)}}})},
jT:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbY(y)
C.a.cT(y,new Z.ls(this,a))
x=this.a.a
w=x.gca().b5(0,1/0,new Z.lt(a))
v=x.gca().b5(0,-1/0,new Z.lu(a))
x=J.a9(v)
u=J.a9(w)
t=u.aJ(w,J.b6(x.aJ(v,w),0.1))
z.a=t
if(u.t(w,v)){t=J.aC(t,1)
z.a=t
u=t}else u=t
s=x.aJ(v,u)
r=P.kW(y.length,new Z.lv(z,this,a,s),!1,P.L)
q=new H.ak(r,new Z.lw(C.a.b5(r,0,Z.hO())),[H.m(r,0),null]).bv(0,!1)
z=C.a.b5(q,0,Z.hO())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.a5(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.lP(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dP:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.as)(z),++u){t=z[u]
if(C.a.a_(b,t))continue
if(w==null||J.a0(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
i_:function(a){return this.dP(a,C.f)},
A:{
lm:function(a){var z,y,x
z=a.gc3()
y=H.w(z,"y",0)
x=P.V(new H.J(z,new Z.ln(a),[y]),!1,y)
if(x.length===0)$.$get$by().ez("After removing actions scored by undefined, there are no recommendations.")
return x},
u0:[function(a,b){return J.a5(a,b)},"$2","hO",4,0,43]}},lo:{"^":"a:0;",
$1:function(a){return a.gbX()}},lp:{"^":"a:0;",
$1:function(a){return J.i4(a.gbO())}},lq:{"^":"a:0;",
$1:function(a){return a.gcI()}},lr:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.ch(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},ls:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.ch(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lt:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.cZ(a),H.cZ(z))}},lu:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.cZ(a),H.cZ(z))}},lv:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.br(J.aC(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},lw:{"^":"a:0;a",
$1:function(a){return J.ic(J.b6(J.br(a,this.a),1000))}},ln:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjD()}}}],["","",,K,{"^":"",q6:{"^":"a:3;",
$3:function(a,b,c){}},c2:{"^":"d;a,h:b<,c,d,jN:e<,f,by:r<",
gjb:function(){return this.a},
gw:function(a){return C.b.gw(this.b)},
t:function(a,b){if(b==null)return!1
return b instanceof K.c2&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jO:function(a){return this.e.$1(a)},
A:{
Z:function(a,b,c,d,e,f,g){var z=new S.af(null,null,[Q.v])
z.au()
z.n(f)
return new K.c2(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;j6:a<,X:b<,b3:c<,jy:d<"}}],["","",,S,{"^":"",a2:{"^":"d;",
gaL:function(){return C.f},
gbp:function(){return C.f},
gfI:function(){return 3},
ds:function(a){return this.aG(this.gJ(),a)},
fM:function(a,b){},
fN:function(a,b){},
aZ:function(a){},
dz:function(a){return!0}}}],["","",,S,{"^":"",
fa:function(a){var z=$.$get$bA().a9(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
lO:function(a,b){var z,y,x,w,v
z=$.$get$bA().jQ()*b
for(y=new H.dn(a,a.gl(a),0,null,[H.w(a,"aT",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
lP:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bA().a9(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.as)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
cH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(q>1){p=$.$get$bA().a9(q)
o=C.b.ax(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cH(C.b.ax(a,m+1,y[l]))
if(typeof x!=="number")return x.a4()
l+=C.b.ax(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cH(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a4()
v=u+1
return C.b.ax(a,0,v)+S.cH(C.b.bA(a,v))}}else return a},
aF:function(a,b,c,d){switch($.$get$bA().a9(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",a6:{"^":"d;aQ:a<,aK:b<,aC:c<,fP:d<,e,d5:f@,fS:r<,fK:x<,eI:y<,ja:z<,hr:Q<,cN:ch<,iD:cx<,jC:cy<,J:db<",
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
geg:function(){return C.a.bL(this.a,new Y.n4())},
b2:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.bp(b).ee(b,".")||C.b.ee(b,"!")||C.b.ee(b,"?"))&&C.b.dC(b,P.be("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a6(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.b2(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
F:function(a,b,c){return this.b2(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
ff:function(a,b,c){return this.b2(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
iG:function(a,b,c,d,e,f,g,h,i,j,k,l){return this.b2(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,!1)},
iI:function(a,b,c,d,e){return this.b2(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
e6:function(a,b,c,d){return this.b2(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fg:function(a,b,c,d){return this.b2(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fh:function(a,b,c,d,e,f){return this.b2(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
iK:function(a,b,c,d,e,f){return this.b2(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
e6:function(a,b,c,d){return this.b2(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
iJ:function(a,b,c,d,e){return this.b2(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iO:function(){return this.F(0,"\n\n",!0)},
c0:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bs(a,"<owner's> "+b)!==-1||C.b.bs(a,"<ownerPronoun's> "+b)!==-1||C.b.bs(a,"<object-owner's> "+b)!==-1||C.b.bs(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(c.gda()!==!0){z=this.c
y=z.i(0,c.gj())
if((y==null?-1:y)<e)x=C.b.dg(a,b,"the "+b)
else{x=J.d6(c.gh(),P.be("[aeiouy]",!1,!1))?C.b.dg(a,b,"an "+b):C.b.dg(a,b,"a "+b)
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
if(J.f(y,z[b].gaC().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaC().gj()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gaK().gj())}else z=!1
return z},
dr:function(a){var z=this
return P.aL(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dr(b,c){if(b===1){v=c
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
case 8:case 7:x=t.gfP()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aJ()
case 2:return P.aK(v)}}})},
aM:[function(a){var z=J.a9(a)
if(z.aH(a,0)||z.bF(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaC()}},"$1","gaC",2,0,23],
jR:function(a,b){var z
if(!this.aE(a)||!this.aE(b))return!1
if(this.ef(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geI()}return!1},
fO:function(a){var z
for(z=!1;this.geg();z=!0){a.$1(this.fT(!0))
this.jZ()}return z},
fT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.b5(z,[],new Y.n5())
C.a.im(z,new Y.n6(y),!1)
x=a&&this.geg()?C.a.bs(z,C.a.fv(z,new Y.n7()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ef(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gd5())n=this.jR(s,p)&&this.hq(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gd5()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sd5(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghr()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gja()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcN())if(this.d1(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gd5()}else n=!1
n=n||this.ki(s)>4}else n=!0
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
u=!1}else if(t){r+=S.fa([" but "," but ",", but "])
u=!this.hd(s,s+1)&&!0}else{r+=S.fa([" and "," and ",", and "])
u=!0}}m=this.dE(s)
p=!v
if(p){n=s-1
if(this.d1(s,n))if(J.d6(this.dE(n),"<subject> "))if(J.d6(m,"<subject> "))m=H.bO(m,"<subject> ","",0)}l=J.ib(m,"<action>",this.dE(s))
n=s-1
k=this.iq(s,n)
if(k)k=!(this.aM(s).gI()===C.q&&this.ai(s).gI()===C.q)
else k=!1
if(k){k=this.aM(s).gI().b
l=H.o(l,"<object-owner's> <object>",k)
k=this.aM(s).gI().b
l=H.o(l,"<object-ownerPronoun's> <object>",k)
k=this.aM(s).gI().b
l=H.o(l,"<object>",k)
k=this.aM(s).gI().c
l=H.o(l,"<object's>",k)}k=this.d1(s,n)
if(k){k=this.ai(s).gI().a
l=H.o(l,"<owner's> <subject>",k)
k=this.ai(s).gI().a
l=H.o(l,"<ownerPronoun's> <subject>",k)
k=this.ai(s).gI().a
l=H.o(l,"<subject>",k)
k=this.ai(s).gI().c
l=H.o(l,"<subject's>",k)}if(this.aM(n)!=null)if(this.ai(s)!=null)if(this.ai(n)!=null){k=this.aM(n)
k=k==null?k:k.gj()
j=this.ai(s)
if(J.f(k,j==null?j:j.gj())){k=this.ai(n)
k=k==null?k:k.gI()
j=this.ai(s)
k=!J.f(k,j==null?j:j.gI())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.ai(s).gI().a
l=H.o(l,"<owner's> <subject>",k)
k=this.ai(s).gI().a
l=H.o(l,"<ownerPronoun's> <subject>",k)
k=this.ai(s).gI().a
l=H.o(l,"<subject>",k)
k=this.ai(s).gI().c
l=H.o(l,"<subject's>",k)}if(this.ai(n)!=null)if(this.aM(s)!=null){k=this.ai(n)
k=k==null?k:k.gj()
j=this.aM(s)
if(J.f(k,j==null?j:j.gj())){n=this.ai(n)
n=n==null?n:n.gI()
k=this.ai(s)
n=!J.f(n,k==null?k:k.gI())}else n=!1}else n=!1
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
g=n.gfP()
f=n.e
e=S.cH(l)
if(C.b.a_(e,"{")||C.b.a_(e,"}"))$.$get$hI().dw('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gH()===!0){e=H.o(e,"<subject>","you")
e=H.o(e,"<subject's>","your")}if(i.gI()===C.z||i.gI()===C.X){e=H.o(e,"<s>","")
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
e=H.o(e,"<has>","has")}e=H.bO(e,"<subject>","<subjectNoun>",0)
k=i.gI().a
e=H.o(e,"<subject>",k)
k=n.db
e=this.c0(e,"<subjectNoun>",i,g,k)
j=i.gh()
if(typeof j!=="string")H.h(H.P(j))
e=H.bO(e,"<subjectNoun>",j,0)
j=i.gI().a
e=H.o(e,"<subjectPronoun>",j)
if(C.b.a_(l,P.be("<subject>.+<subject's>",!0,!1))){j=i.gI().c
e=H.o(e,"<subject's>",j)}e=this.c0(e,"<subject's>",i,g,k)
k=H.b(i.gh())+"'s"
e=H.bO(e,"<subject's>",k,0)
k=i.gI().c
e=H.o(e,"<subject's>",k)
k=i.gI().c
e=H.o(e,"<subjectPronoun's>",k)
k=i.gI().d
e=H.o(e,"<subjectPronounSelf>",k)}if(h!=null){if(h.gH()===!0){e=H.o(e,"<object>","you")
e=H.o(e,"<object's>","your")}else{e=this.c0(e,"<object>",h,f,n.db)
k=h.gh()
if(typeof k!=="string")H.h(H.P(k))
e=H.o(e,"<object>",k)}k=h.gI().b
e=H.o(e,"<objectPronoun>",k)
if(C.b.a_(l,P.be("<object>.+<object's>",!0,!1))){k=h.gI().c
e=H.o(e,"<object's>",k)}e=this.c0(e,"<object's>",h,f,n.db)
k=H.b(h.gh())+"'s"
e=H.bO(e,"<object's>",k,0)
k=h.gI().c
e=H.o(e,"<object's>",k)
k=h.gI().c
e=H.o(e,"<objectPronoun's>",k)}n=n.db
l=this.f7(f,this.f7(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.n3(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcN())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcN()?r+".":r
return H.tx(z.charCodeAt(0)==0?z:z,$.$get$fu(),new Y.n8(),null)},
c7:function(){return this.fT(!1)},
jZ:function(){var z,y
if(!this.geg()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.bs(z,C.a.fv(z,new Y.n9()))+1
P.cI(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hd:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
if(this.ef(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geI()}if(!this.d1(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfS()){if(b>=z.length)return H.e(z,b)
y=z[b].gfS()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfK()){if(b>=z.length)return H.e(z,b)
z=z[b].gfK()}else z=!1
if(z)return!0
else return!1},
hq:function(a,b){var z,y,x,w,v
if(!this.aE(a)||!this.aE(b))return!1
for(z=new P.b2(this.dr(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b2(this.dr(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gG()
if(J.f(x.gj(),v.gj()))return!0}}return!1},
dE:[function(a){var z=J.a9(a)
if(z.aH(a,0)||z.bF(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaQ()}},"$1","gaQ",2,0,12],
ai:[function(a){var z=J.a9(a)
if(z.aH(a,0)||z.bF(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaK()}},"$1","gaK",2,0,23],
ki:function(a){var z,y,x
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
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.c7()},
aE:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
f7:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gH()===!0)z=H.o(H.o(b,d,"you"),e,"your")
else{z=this.c0(b,d,a,null,h)
y=a.gh()
H.bo(y)
z=H.o(z,d,y)}z=H.o(z,f,a.gI().a)
z=H.o(H.o(C.b.dg(this.c0(C.b.a_(c,P.be(d+".+"+e,!0,!1))?H.o(z,e,a.gI().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gI().c),g,a.gI().c)}else z=H.o(H.o(H.o(H.o(b,d,""),e,""),f,""),g,"")
return z},
iq:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaC().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaC().gj())},
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
return J.f(y,z[b].gaK().gj())},
A:{
n3:function(a){var z,y,x
z=!C.b.a_(a,"\n\n")?C.b.km(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bA(z,1)}}},n4:{"^":"a:0;",
$1:function(a){return J.f(a.gaQ(),"\n\n")}},n5:{"^":"a:31;",
$2:function(a,b){var z,y,x
z=J.K(a)
y=z.gaf(a)?z.gB(a):null
if(y!=null&&y.gjC()&&J.f(b.giD(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aJ()
z.m(a,x-1,b)}else z.q(a,b)
return a}},n6:{"^":"a:28;a",
$1:function(a){return J.i5(this.a,a)}},n7:{"^":"a:0;",
$1:function(a){return J.f(a.gaQ(),"\n\n")}},n8:{"^":"a:27;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},n9:{"^":"a:0;",
$1:function(a){return J.f(a.gaQ(),"\n\n")}},bu:{"^":"l3;da:a<,h:b<,c,bk:d<,H:e<,I:f<",
gj:function(){return H.av(this)},
gej:function(){return!0},
gbt:function(){return!0},
A:{
dd:function(a,b,c,d,e){var z=H.t([],[P.q])
return new Y.bu(c,b,z,e==null?$.$get$aX():e,!1,d)}}},l3:{"^":"d+de;"},de:{"^":"d;",
gbg:function(){return this.gbt()&&this.gej()===!0},
ab:function(a,b,c,d,e,f,g,h,i,j,k){a.iG(0,b,c,d,e,f,g,h,i,j,H.a4(this,"$isbu"),!1)},
ak:function(a,b){return this.ab(a,b,null,!1,!1,!1,!1,null,null,!1,!1)},
k8:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,!1,null,null,d,!1)},
ba:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,null,d,!1)},
bu:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,c,null,!1,!1)},
c8:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,null,null,c,!1)},
aD:function(a,b,c){return this.ab(a,b,null,c,!1,!1,!1,null,null,!1,!1)},
cF:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,d,null,!1,!1)},
eu:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,!1,!1,d,null,e,!1)},
aN:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,c,null,null,!1,!1)},
bE:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1)},
dh:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1)},
bE:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1)},
fU:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,c,d,null,!1,!1)},
fW:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,d,!1,e,null,!1,!1)},
k7:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,null,null,d,!1)},
k6:function(a,b,c,d){return this.ab(a,b,c,!1,!1,d,!1,null,null,!1,!1)},
kb:function(a,b,c,d,e,f){return this.ab(a,b,c,d,!1,e,!1,f,null,!1,!1)},
k9:function(a,b,c,d,e){return this.ab(a,b,c,d,!1,e,!1,null,null,!1,!1)},
fV:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,d,!1,!1)},
ka:function(a,b,c,d,e){return this.ab(a,b,null,!1,c,!1,!1,d,null,e,!1)},
kc:function(a,b,c,d,e,f){return this.ab(a,b,null,!1,c,!1,!1,d,e,f,!1)},
dh:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1)}},c_:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",qA:{"^":"a:0;",
$1:function(a){a.gcp().b=2
return 2}},qB:{"^":"a:0;",
$1:function(a){a.gcp().b=0
return 0}},qz:{"^":"a:0;",
$1:function(a){a.gcp().b=1
return 1}},fC:{"^":"d;"},os:{"^":"fC;j:a<",
a2:function(a){var z=new L.bh(null,null)
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
gj:function(){return this.gcp().b},
gcp:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
n:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcp().b
z=new L.os(y)
if(y==null)H.h(P.l("id"))}this.n(z)
return z}}}],["","",,X,{"^":"",
hn:function(a,b){return P.aL(function(){var z=a,y=b
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
break}case 4:return P.aJ()
case 1:return P.aK(v)}}})}}],["","",,A,{"^":"",a7:{"^":"d;iE:a<,b,c,d,e,f,J:r<,x",
giY:function(){var z=this.f
return z.length!==0?C.a.gB(z):null},
gw:function(a){var z,y,x,w,v
z=X.bq(this.a)
y=X.bq(this.d)
x=X.bq(this.f)
w=this.r
v=this.c
v=X.cX(X.aV(X.aV(0,C.e.gw(w)),J.j(v)))
return X.cX(X.aV(X.aV(X.aV(X.aV(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
t:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isa7&&this.gw(this)===z.gw(b)},
fd:function(a){var z,y
z=this.hc(a,!0)
y=z.gY(z)
if(y.u()){y.gG()
return!0}return!1},
iB:function(a){var z,y
z=this.hb(a)
y=z.gY(z)
if(y.u()){y.gG()
return!0}return!1},
iC:function(a){var z=this.x
if(z==null)return!1
return C.b.a_(z.gh(),a)},
fq:function(a){var z,y,x
z=this.cY(a)
if(z==null)throw H.c(new P.F("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ap()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ap:function(){++this.r},
dq:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.eK(0,new A.o1(a))
if(b!=null)z=z.bU(0,new A.o2(b))
if(c!=null)z=z.bU(0,new A.o3(c))
if(e!=null)z=z.bU(0,new A.o4(e))
return d!=null?z.bU(0,new A.o5(d)):z},
hc:function(a,b){return this.dq(a,null,null,null,b)},
hb:function(a){return this.dq(a,null,null,null,null)},
al:function(a){return this.a.aI(0,new A.o6(a))},
du:function(a){return this.e.aI(0,new A.o7(a))},
eB:function(a){var z,y
z=this.cY(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ac:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
jn:function(a){var z=this.a.bf(0,new A.o8(a),new A.o9())
if(z==null)return!1
return z.gbt()},
es:function(){var z=this.f
C.a.gB(z).aZ(this)
C.a.b9(z)},
bQ:function(a){var z=this.f
while(!0){if(!(z.length!==0&&!J.f(C.a.gB(z).gh(),a)))break
C.a.gB(z).aZ(this)
C.a.b9(z)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
cE:function(a,b){var z,y
z=this.cY(a)
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
kh:function(a,b,c){return this.di(null,a,b,c,null)},
cJ:function(a,b,c){return this.di(a,null,b,null,c)},
kg:function(a,b,c){return this.di(a,b,null,null,c)},
kf:function(a){return this.di(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.dW()
y.an(0,z)
return"World<"+P.bV(y,"{","}")+">"},
a3:function(a,b){var z,y,x
z=this.al(a)
y=z.a2(b)
x=this.a
x.ar(0,z)
x.q(0,y)},
cY:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gj(),a)){z=x
break}++x}return z},
hD:function(a){this.a.an(0,a.a)
this.d.an(0,a.d)
this.b.an(0,a.b)
this.e.an(0,a.e)
C.a.an(this.f,a.f)
this.r=a.r},
A:{
dP:function(a){var z,y,x,w
z=P.U(null,null,null,R.C)
y=P.b1(null,O.ci)
x=P.U(null,null,null,U.aQ)
w=P.U(null,null,null,null)
w=new A.a7(z,x,a.c,y,w,[],null,null)
w.hD(a)
return w}}},o1:{"^":"a:0;a",
$1:function(a){return a.gfe()===this.a}},o2:{"^":"a:0;a",
$1:function(a){return J.f(a.gde(),this.a.gj())}},o3:{"^":"a:0;a",
$1:function(a){return a.geJ().a_(0,this.a.y)}},o4:{"^":"a:0;a",
$1:function(a){return a.gh7()===this.a}},o5:{"^":"a:0;a",
$1:function(a){return a.gh5()===this.a}},o6:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},o7:{"^":"a:0;a",
$1:function(a){return J.f(a.gh(),this.a)}},o8:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},o9:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aG:{"^":"ab;a1:b<"},bC:{"^":"aG;c,X:d<,S:e<,h:f<,b,a",
V:[function(a,b,c){throw H.c(new P.F("SimpleAction always succeeds"))},"$3","gP",6,0,2],
W:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gR",6,0,2],
ah:function(a,b){throw H.c(new P.F("SimpleAction shouldn't have to provide roll reason"))},
N:function(a,b){return 1},
gT:function(){return!1},
M:function(a,b){return!0},
gO:function(){return H.h(new P.F("Not rerollable"))},
gU:function(){return!1}}}],["","",,N,{"^":"",j2:{"^":"H;T:c<,a1:d<,S:e<,U:f<,O:r<,b,a",
gae:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gag:function(){return"will <subject> confuse <object>?"},
V:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bu(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.dh(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ba(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aN(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 0.6},
M:function(a,b){var z
if(a.gH()===!0)if(a.ga8()){z=b.a
z=new H.J(z,new N.j3(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.el(b)}else z=!1
else z=!1
return z},
A:{
tI:[function(a){return new N.j2(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.d,a,null)},"$1","r_",2,0,5]}},j3:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbt()){z=a.gbk()
y=this.a.b.gbk()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",jp:{"^":"H;U:c<,O:d<,T:e<,a1:f<,S:r<,b,a",
gae:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gag:function(){return"will <subject> kick the weapon off?"},
V:[function(a,b,c){S.aF(new V.jq(this,a,c),new V.jr(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
S.aF(new V.js(this,a,c),new V.jt(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cE(y.gj(),y.a2(new V.ju(this)))
z=this.b
b.a3(z.gj(),new V.jv())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(a.ga8()||a.dy===C.i){z=this.b
z=z.gaa()&&z.e!=null}else z=!1
return z},
A:{
tM:[function(a){return new V.jp(!0,C.d,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","r5",2,0,5]}},jq:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.bu(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aD(y,"<subject> mi<sses>",!0)}},jr:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bu(z,"<subject> kick<s> <object's> weapon",y)
y.aD(z,"<subject> hold<s> onto it",!0)}},js:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kc(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga6(),z,!0)}},jt:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ba(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.e6(0,"<owner's> <subject> fl<ies> away",y,y.ga6())}},ju:{"^":"a:25;a",
$1:function(a){a.gcu().q(0,this.a.b.ga6())
return a}},jv:{"^":"a:0;",
$1:function(a){a.sa6(null)
return a}}}],["","",,R,{"^":"",kJ:{"^":"H;U:c<,O:d<,T:e<,a1:f<,S:r<,b,a",
gh:function(){return"KickToGround"},
gae:function(){return"kick <object> to the ground"},
gag:function(){return"will <subject> kick <object> prone?"},
V:[function(a,b,c){S.aF(new R.kK(this,a,c),new R.kL(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gP",6,0,2],
W:[function(a,b,c){var z
S.aF(new R.kM(this,a,c),new R.kN(this,a,c,b.ac("FightSituation").gby()),null,null)
z=this.b
b.a3(z.gj(),new R.kO())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
M:function(a,b){return(a.ga8()||a.dy===C.i)&&!this.b.gaa()},
A:{
tW:[function(a){return new R.kJ(!0,C.d,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","rs",2,0,5]}},kK:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.bu(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aD(y,"<subject> mi<sses>",!0)}},kL:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bu(z,"<subject> kick<s> <object's> shin",y)
y.aD(z,"<subject> <does>n't budge",!0)}},kM:{"^":"a:1;a,b,c",
$0:function(){this.b.ka(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},kN:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ba(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ak(z,"<subject> {grunt|shriek}<s>")
y.aN(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},kO:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,F,{"^":"",lk:{"^":"ab;S:b<,T:c<,a1:d<,U:e<,O:f<,a",
gX:function(){return"Stand off."},
gh:function(){return"Pass"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ak(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gR",6,0,2],
ah:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return!0}}}],["","",,Y,{"^":"",ly:{"^":"H;U:c<,O:d<,T:e<,a1:f<,S:r<,b,a",
gae:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gag:function(){return"will <subject> force <object> off balance?"},
V:[function(a,b,c){var z=this.b
a.fV(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga6(),z)
z.c8(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.fV(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga6(),z)
if(z.ga8()){z.fU(c,"<subject> lose<s> <object>",!0,$.$get$e6())
b.a3(z.y,new Y.lz())
C.a.q(b.f,U.l4(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gb6()){z.ak(c,"<subject> <is> already off balance")
c.fg(0,"<subject> make<s> <object> fall to the "+H.b(b.ac("FightSituation").gby()),z,$.$get$hQ())
b.a3(z.y,new Y.lA())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.F("enemy pose must be either standing or off-balance"))},"$3","gR",6,0,2],
N:function(a,b){var z=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(!a.gaa()){z=a.e
if(z!=null&&J.f(z.gbS(),C.c)){z=this.b
z=z.aF(C.c)&&!z.gaa()}else z=!1}else z=!1
return z},
A:{
u1:[function(a){return new Y.ly(!0,C.d,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","ry",2,0,5]}},lz:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},lA:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,B,{"^":"",lW:{"^":"ab;S:b<,T:c<,a1:d<,U:e<,O:f<,a",
gX:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ba(c,"<subject> regain<s> <object>",$.$get$e6(),!0)
b.a3(a.gj(),new B.lX())
return H.b(a.gh())+" regains balance"},"$3","gR",6,0,2],
ah:function(a,b){return"Will "+a.gI().a+" regain balance?"},
N:function(a,b){return 1},
M:function(a,b){return a.gb6()}},lX:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return C.k}}}],["","",,O,{"^":"",ma:{"^":"ab;S:b<,T:c<,a1:d<,U:e<,O:f<,a",
gX:function(){return"Scramble."},
gh:function(){return"Scramble"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gR",6,0,2],
ah:function(a,b){return"Will "+a.gI().a+" crawl out of harm's way?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gaa())return!1
if(Q.hR(a,b))return!0
return!1}}}],["","",,Q,{"^":"",
hR:function(a,b){var z,y,x
z=b.cJ("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.cJ("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cJ("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
return!1},
mV:{"^":"ab;S:b<,T:c<,a1:d<,U:e<,O:f<,a",
gX:function(){return"Stand up."},
gh:function(){return"StandUp"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.ak(c,"<subject> stand<s> up")
b.a3(a.gj(),new Q.mW())
return H.b(a.gh())+" stands up"},"$3","gR",6,0,2],
ah:function(a,b){return"Will "+a.gI().a+" stand up?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gaa())return!1
if(Q.hR(a,b))return!1
return!0}},
mW:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return C.k}}}],["","",,T,{"^":"",
um:[function(a){return new A.aH(T.ef(),null,null,new T.rG(),new T.rH(),new T.rI(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","tm",2,0,5],
un:[function(a){return new A.aH(T.ef(),new T.rJ(),T.ef(),new T.rK(),new T.rL(),new T.rM(),new T.rN(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.d,"break <object's> neck","will <subject> succeed?",a,null)},"$1","tn",2,0,5],
uo:[function(a,b,c,d,e){a.bu(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a3(a.gj(),new T.rO())},"$5","ef",10,0,10],
rG:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gaa()&&a.gc2()&&c.gc2()}},
rH:{"^":"a:3;",
$3:function(a,b,c){return Y.eu(a,c)}},
rI:{"^":"a:3;",
$3:function(a,b,c){return S.dw(a,c,C.p)}},
rK:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gaa()&&a.gc2()&&c.gc2()}},
rL:{"^":"a:3;",
$3:function(a,b,c){return Y.eu(a,c)}},
rM:{"^":"a:3;",
$3:function(a,b,c){return S.dw(a,c,C.o)}},
rJ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
rN:{"^":"a:3;",
$3:function(a,b,c){return S.dw(a,c,C.j)}},
rO:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,A,{"^":"",aH:{"^":"H;c,d,e,f,r,x,y,z,S:Q<,T:ch<,a1:cx<,h:cy<,U:db<,O:dx<,ae:dy<,ag:fr<,b,a",
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
up:[function(a){return new A.aH(U.eg(),null,null,new U.rP(),new U.rQ(),new U.rR(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","to",2,0,5],
uq:[function(a){return new A.aH(U.eg(),new U.rS(),U.eg(),new U.rT(),new U.rU(),new U.rV(),new U.rW(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.d,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tp",2,0,5],
ur:[function(a,b,c,d,e){c.iK(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","eg",10,0,10],
rP:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.ga8()||a.dy===C.i)&&!c.gaa()&&a.gc2()
else z=!1
return z}},
rQ:{"^":"a:3;",
$3:function(a,b,c){return M.f9(a,c)}},
rR:{"^":"a:3;",
$3:function(a,b,c){return Z.dD(a,c,C.p)}},
rT:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.ga8()||a.dy===C.i)&&!c.gaa()&&a.gc2()
else z=!1
return z}},
rU:{"^":"a:3;",
$3:function(a,b,c){return M.f9(a,c)}},
rV:{"^":"a:3;",
$3:function(a,b,c){return Z.dD(a,c,C.o)}},
rS:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
rW:{"^":"a:3;",
$3:function(a,b,c){return Z.dD(a,c,C.j)}}}],["","",,G,{"^":"",
us:[function(a){return new A.aH(G.eh(),null,null,new G.rZ(),new G.t_(),new G.t0(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","tq",2,0,5],
ux:[function(a){return new A.aH(G.eh(),new G.t9(),G.eh(),new G.ta(),new G.tb(),new G.tc(),new G.td(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.d,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tr",2,0,5],
uy:[function(a,b,c,d,e){return a.fW(c,"<subject> swing<s> {<subject's> "+H.b(a.ga6().gh())+" |}at <object>",e.gj(),!0,d)},"$5","eh",10,0,10],
rZ:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.ga8()&&!c.gaa()&&a.aF(C.c)}},
t_:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
t0:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.p)}},
ta:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.ga8()&&!c.gaa()&&a.aF(C.c)}},
tb:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
tc:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
t9:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
td:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.j)}}}],["","",,R,{"^":"",
ut:[function(a,b,c,d,e){return a.fU(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.ga6().gh()),!0,d)},"$5","hU",10,0,16],
uu:[function(a){return new A.aH(R.hV(),new R.t1(),R.hU(),new R.t2(),new R.t3(),new R.t4(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","ts",2,0,5],
uv:[function(a){return new A.aH(R.hV(),new R.t5(),R.hU(),new R.t6(),new R.t7(),new R.t8(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","tt",2,0,5],
uw:[function(a,b,c,d,e){return a.fW(c,"<subject> swing<s> {<subject's> "+H.b(a.ga6().gh())+" |}at <object>",e.gj(),!0,d)},"$5","hV",10,0,10],
t2:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gb6()&&!c.gaa()&&a.aF(C.c)}},
t3:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
t4:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.p)}},
t1:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
t6:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gb6()&&!c.gaa()&&a.aF(C.c)}},
t7:{"^":"a:3;",
$3:function(a,b,c){return M.bD(a,c)}},
t8:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
t5:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
uz:[function(a){return new A.aH(D.ei(),null,null,new D.te(),new D.tf(),new D.tg(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","tu",2,0,5],
uA:[function(a){return new A.aH(D.ei(),new D.th(),D.ei(),new D.ti(),new D.tj(),new D.tk(),new D.tl(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.d,"strike down at <object>","will <subject> hit?",a,null)},"$1","tv",2,0,5],
uB:[function(a,b,c,d,e){return a.bu(c,"<subject> strike<s> down {with <subject's> "+H.b(a.ga6().gh())+" |}at <object>",d)},"$5","ei",10,0,16],
te:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gaa()&&!a.gaa()&&a.aF(C.c)}},
tf:{"^":"a:3;",
$3:function(a,b,c){return D.fw(a,c)}},
tg:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.p)}},
ti:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gaa()&&!a.gaa()&&a.aF(C.c)}},
tj:{"^":"a:3;",
$3:function(a,b,c){return D.fw(a,c)}},
tk:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.o)}},
th:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tl:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.j)}}}],["","",,Y,{"^":"",nw:{"^":"cx;a1:c<,b,a",
gS:function(){return"A different weapon might change the battle."},
gT:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gU:function(){return!1},
gO:function(){return},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cE(y.gj(),y.a2(new Y.nx(this)))
b.a3(a.gj(),new Y.ny(this))
z=this.b
a.bu(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gR",6,0,2],
ah:function(a,b){return H.h(new P.ai(null))},
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
u5:[function(a){return new Y.nw(!0,a,null)},"$1","tz",2,0,47]}},nx:{"^":"a:25;a",
$1:function(a){a.gcu().ar(0,this.a.b)
return a}},ny:{"^":"a:0;a",
$1:function(a){a.sa6(this.a.b)
return a}}}],["","",,M,{"^":"",o_:{"^":"ab;S:b<,U:c<,O:d<,T:e<,a1:f<,a",
gX:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.ak(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.k8(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gR",6,0,2],
ah:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z
if(a.el(b)){z=b.cJ("Confuse",a,!0)
if(typeof z!=="number")return z.bz()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",kd:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gae:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a3(z.gj(),new R.ke())
a.ba(c,"<subject> break<s> <object's> neck",z,!0)
X.ed(c,b,z,b.ac("FightSituation").gby())
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tQ:[function(a){return new R.kd(null,!0,!0,!0,C.d,a,null)},"$1","rb",2,0,5]}},ke:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}}}],["","",,Y,{"^":"",
eu:function(a,b){var z=new Y.d9(null,null,null,null,null)
new Y.qR(a,b).$1(z)
return z.p()},
et:{"^":"a2;",
gaL:function(){return[R.rb()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ap:function(){var z=new Y.d9(null,null,null,null,null)
z.n(this)
new Y.iR().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.al(this.a)
return},
aO:function(a,b){return new H.J(a,new Y.iS(this),[H.m(a,0)])}},
qR:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaR().c=z
a.gaR().e=0
z=this.a.gj()
a.gaR().b=z
z=this.b.gj()
a.gaR().d=z
return a}},
iR:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
if(typeof z!=="number")return z.a4()
a.gaR().e=z+1
return a}},
iS:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
od:{"^":"et;a,j:b<,c,J:d<",
a2:function(a){var z=new Y.d9(null,null,null,null,null)
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
z=new Y.od(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,Z,{"^":"",jX:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gae:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gag:function(){return"will <subject> evade?"},
V:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to evade")
S.aF(new Z.jY(a,c),new Z.jZ(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ba(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.bQ("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return!0},
A:{
tP:[function(a){return new Z.jX("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.d,a,null)},"$1","r8",2,0,5]}},jY:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {can't|fail<s>}",!0)}},jZ:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cF(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dw:function(a,b,c){var z=new S.dv(null,null,null,null,null,null)
new S.qQ(a,b,c).$1(z)
return z.p()},
f2:{"^":"ct;",
gaL:function(){return[Z.r8()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ap:function(){var z=new S.dv(null,null,null,null,null,null)
z.n(this)
new S.le().$1(z)
return z.p()}},
qQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.gj()
a.gaB().b=z
z=this.b.gj()
a.gaB().e=z
a.gaB().d=this.c
return a}},
le:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
if(typeof z!=="number")return z.a4()
a.gaB().f=z+1
return a}},
oj:{"^":"f2;d4:a<,j:b<,b8:c<,cH:d<,J:e<",
a2:function(a){var z=new S.dv(null,null,null,null,null,null)
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
z=new S.oj(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,G,{"^":"",eC:{"^":"H;S:c<,T:d<,a1:e<,b,a",
gh:function(){return"CounterSlash"},
gU:function(){return!1},
gO:function(){return},
gae:function(){return"swing back at <object>"},
gag:function(){return"will <subject> keep <subject's> balance?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to swing back")
a.dh(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.a3(a.y,new G.je())
a.bE(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a3(a.y,new G.jf())
a.aN(c,"<subject> lose<s> balance because of that",!0)
a.bE(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.ba(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bD(a,z))
C.a.q(y,L.bg(a,z,C.p))
return H.b(a.gh())+" swings back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.ga8()?0.7:0.9},
M:function(a,b){return a.gH()!==!0&&a.aF(C.c)&&!a.gaa()},
A:{
tK:[function(a){return new G.eC("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","r2",2,0,5]}},je:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jf:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,D,{"^":"",jb:{"^":"eC;c,d,e,b,a",
gU:function(){return!0},
gO:function(){return C.d},
gae:function(){return"swing back at <object>"},
gag:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to swing back")
a.dh(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.a3(a.y,new D.jc())
a.bE(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a3(a.y,new D.jd())
a.aN(c,"<subject> lose<s> balance because of that",!0)
a.bE(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.ba(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bD(a,z))
C.a.q(y,L.bg(a,z,C.o))
return H.b(a.gh())+" swings successfully back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.ga8()?0.7:0.9},
M:function(a,b){return a.gH()===!0&&a.aF(C.c)&&!a.gaa()},
A:{
tJ:[function(a){return new D.jb("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","r3",2,0,5]}},jc:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jd:{"^":"a:0;",
$1:function(a){a.sam(C.l)
return a}}}],["","",,S,{"^":"",
eB:function(a,b){var z=new S.dc(null,null,null,null,null)
new S.qJ(a,b).$1(z)
return z.p()},
eA:{"^":"a2;",
gaL:function(){return[G.r2(),D.r3()]},
gbp:function(){return[$.$get$dx()]},
gh:function(){return"CounterAttackSituation"},
ap:function(){var z=new S.dc(null,null,null,null,null)
z.n(this)
new S.j9().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.al(this.a)
return},
aO:function(a,b){return new H.J(a,new S.ja(this),[H.m(a,0)])}},
qJ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaS().c=z
a.gaS().e=0
z=this.a.gj()
a.gaS().b=z
z=this.b.gj()
a.gaS().d=z
return a}},
j9:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
if(typeof z!=="number")return z.a4()
a.gaS().e=z+1
return a}},
ja:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
oe:{"^":"eA;a,j:b<,c,J:d<",
a2:function(a){var z=new S.dc(null,null,null,null,null)
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
z=new S.oe(y,x,w,v)
if(y==null)H.h(P.l("counterAttacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,X,{"^":"",
ed:function(a,b,c,d){var z=b.ac("FightSituation")
b.cE(z.gj(),z.a2(new X.rt(c)))
if(c.gam()===C.l){c.aN(a,"<subject> stop<s> moving",!0)
a.F(0,"\n\n",!0)
return}switch($.$get$he().a9(3)){case 0:c.bE(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aN(a,"<subject> fall<s> backward",!0)
c.aN(a,"<subject> twist<s>",!0)
c.bE(a,"<subject> hit<s> the "+H.b(d)+" face down",!0,!0)
break
case 2:c.aN(a,"<subject> drop<s> to <subject's> knees",!0)
c.aN(a,"<subject> keel<s> over",!0)
break}a.F(0,"\n\n",!0)},
rt:{"^":"a:0;a",
$1:function(a){var z=this.a
if(z.ga6()!=null)a.gcu().q(0,z.ga6())
return a}}}],["","",,O,{"^":"",ct:{"^":"mD;",
aG:function(a,b){if(a===0)return b.al(this.gcH())
return},
aO:function(a,b){return new H.J(a,new O.jk(this),[H.m(a,0)])}},mD:{"^":"a2+lB;"},jk:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.gd4())||J.f(a.gj(),z.gcH())}}}],["","",,U,{"^":"",
k0:function(a,b,c,d){var z=new U.bU(null,null,null,null,null,null,null,null,null)
new U.qH(a,b,c,d).$1(z)
return z.p()},
eG:{"^":"a2;",
gaL:function(){return[N.r_(),V.r5(),R.rs(),Y.ry(),T.tm(),T.tn(),U.to(),U.tp(),G.tq(),G.tr(),D.tu(),D.tv(),R.ts(),R.tt(),Y.tz()]},
gbp:function(){return H.t([$.$get$fc(),$.$get$ft(),$.$get$fg(),$.$get$fU()],[Q.ab])},
gfI:function(){return 1000},
gh:function(){return"FightSituation"},
eb:function(a,b){var z=a.a
return(z&&C.a).bL(z,new U.k1(b))},
ap:function(){var z=new U.bU(null,null,null,null,null,null,null,null,null)
z.n(this)
new U.k2().$1(z)
return z.p()},
aG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hn(this.f,this.b)
y=H.bw(z,new U.k3(b),H.w(z,"y",0),null)
x=H.w(y,"y",0)
w=P.V(new H.J(y,new U.k4(),[x]),!1,x)
x=H.m(w,0)
v=P.V(new H.J(w,new U.k5(),[x]),!1,x)
u=v.length===1?C.a.gbY(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.as)(w),++r){q=w[r]
x=b.d
p=x.bf(0,new U.k6(q),new U.k7())
o=p==null?p:p.gJ()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.bf(0,new U.k8(q),new U.k9())
k=l==null?l:l.gJ()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aO:function(a,b){return new H.J(a,new U.ka(this),[H.m(a,0)])},
fN:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a0(z))y.i(0,z).$2(a,b)},
aZ:function(a){var z,y
z=this.r
if(z!=null&&!this.eb(this.b,a)){y=a.eB(z)
a.cE(y.gj(),y.a2(new U.kb()))}},
dz:function(a){var z=this.f
if(this.eb(z,a))if(this.eb(this.b,a)){z=z.a
z=(z&&C.a).bL(z,new U.kc(a))}else z=!1
else z=!1
return z}},
qH:{"^":"a:0;a,b,c,d",
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
z.n(new H.cC(y,new U.pM(),[H.m(y,0),null]))
y=a.gad()
z=y.c
if(z==null){z=new S.af(null,null,[P.u])
z.au()
z.n(C.f)
y.c=z}z.n(J.en(this.b,new U.pN()))
a.gad().e=this.c
z=new S.af(null,null,[U.aQ])
z.au()
z.n(C.f)
a.gad().b=z
z=this.d.gj()
a.gad().x=z
return a}},
pM:{"^":"a:0;",
$1:function(a){return a.gj()}},
pN:{"^":"a:0;",
$1:function(a){return a.gj()}},
k1:{"^":"a:0;a",
$1:function(a){return this.a.al(a).gbg()}},
k2:{"^":"a:0;",
$1:function(a){var z=a.gad().y
if(typeof z!=="number")return z.a4()
a.gad().y=z+1
return a}},
k3:{"^":"a:0;a",
$1:function(a){return this.a.al(a)}},
k4:{"^":"a:0;",
$1:function(a){return a.gbg()}},
k5:{"^":"a:0;",
$1:function(a){return a.gH()}},
k6:{"^":"a:0;a",
$1:function(a){return J.f(a.gde(),this.a.gj())&&a.gh6()===!0}},
k7:{"^":"a:1;",
$0:function(){return}},
k8:{"^":"a:0;a",
$1:function(a){return J.f(a.gde(),this.a.gj())}},
k9:{"^":"a:1;",
$0:function(){return}},
ka:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gbg()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).a_(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).a_(z,y)
z=y}else z=!0}else z=!1
return z}},
kb:{"^":"a:0;",
$1:function(a){a.sjP(!1)
return a}},
kc:{"^":"a:29;a",
$1:function(a){var z=this.a.al(a)
return z.gH()===!0&&z.gbg()}},
og:{"^":"eG;cu:a<,b,c,by:d<,j:e<,f,r,J:x<",
a2:function(a){var z=new U.bU(null,null,null,null,null,null,null,null,null)
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
gcu:function(){var z,y
z=this.gad()
y=z.b
if(y==null){y=new S.af(null,null,[U.aQ])
y.au()
y.n(C.f)
z.b=y
z=y}else z=y
return z},
gby:function(){return this.gad().e},
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
if(!(z==null)){y=new A.dq(null,null,[H.m(z,0),H.m(z,1)])
y.cj()
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
if(x==null){x=new S.af(null,null,[U.aQ])
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
if(v==null){v=new A.dq(null,null,[P.u,{func:1,v:true,args:[A.a7,Y.a_]}])
v.cj()
v.n(C.V)
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
z=new U.og(y,x,w,v,u,t,s,r)
if(y==null)H.h(P.l("droppedItems"))
if(x==null)H.h(P.l("enemyTeamIds"))
if(w==null)H.h(P.l("events"))
if(v==null)H.h(P.l("groundMaterial"))
if(u==null)H.h(P.l("id"))
if(t==null)H.h(P.l("playerTeamIds"))
if(r==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,A,{"^":"",l8:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gae:function(){return"stab <object>"},
gag:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.bu(c,"<subject> tr<ies> to stab <object>",z)
a.aD(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a3(z.gj(),new A.l9())
if(b.al(z.gj()).gbt()){a.ba(c,"<subject> thrust<s> {|<subject's> "+H.b(a.ga6().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.aN(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ba(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.ga6().gh())+" through} <object>",z,!0)
X.ed(c,b,z,b.ac("FightSituation").gby())}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){var z
if(a.ga8())if(this.b.gb6()){z=a.e
z=z!=null&&J.f(z.gbS(),C.c)}else z=!1
else z=!1
return z},
A:{
tX:[function(a){return new A.l8("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.d,a,null)},"$1","rv",2,0,5]}},l9:{"^":"a:0;",
$1:function(a){var z=a.gaq()
if(typeof z!=="number")return z.aJ()
a.saq(z-1)
return a}}}],["","",,U,{"^":"",
l4:function(a,b){var z=new U.ds(null,null,null,null,null)
new U.qS(a,b).$1(z)
return z.p()},
f0:{"^":"a2;",
gaL:function(){return H.t([A.rv()],[{func:1,ret:Q.H,args:[R.C]}])},
gbp:function(){return[$.$get$dx()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ap:function(){var z=new U.ds(null,null,null,null,null)
z.n(this)
new U.l5().$1(z)
return z.p()},
aG:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bz()
if(a>0)return
z=b.al(this.a)
y=b.a
x=H.m(y,0)
w=P.V(new H.J(y,new U.l6(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gfu(w)
if(v.ga8())if(z.gb6()){y=v.e
y=y!=null&&J.f(y.gbS(),C.c)}else y=!1
else y=!1
if(y)return v
return},
aO:function(a,b){return new H.J(a,new U.l7(b,b.al(this.a)),[H.m(a,0)])}},
qS:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaT().d=z
a.gaT().e=0
z=this.a.gj()
a.gaT().b=z
z=this.b
z=z==null?z:z.gj()
a.gaT().c=z
return a}},
l5:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
if(typeof z!=="number")return z.a4()
a.gaT().e=z+1
return a}},
l6:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gbg())if(a.eh(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
l7:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.eh(z,this.a)}},
oh:{"^":"f0;a,b,j:c<,J:d<",
a2:function(a){var z=new U.ds(null,null,null,null,null)
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
z=new U.oh(y,x,w,v)
if(y==null)H.h(P.l("actorId"))
if(w==null)H.h(P.l("id"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",kf:{"^":"H;S:c<,T:d<,a1:e<,U:f<,b,a",
gae:function(){return""},
gh:function(){return"FinishPunch"},
gO:function(){return},
gag:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga8()?C.i:C.l
x=b.ac("PunchSituation").gj()
w=b.ac("FightSituation").gby()
b.a3(z.y,new O.kg(y))
switch(y){case C.k:throw H.c(new P.F("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fh(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aN(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.l:c.fh(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
tR:[function(a){return new O.kf(null,!0,!0,!1,a,null)},"$1","rc",2,0,5]}},kg:{"^":"a:0;a",
$1:function(a){a.sam(this.a)
return a}}}],["","",,E,{"^":"",jw:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gae:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gag:function(){return"will <subject> dodge the fist?"},
V:[function(a,b,c){var z,y
z=b.ac("PunchSituation").gj()
a.k6(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.aF(new E.jx(a,c,z),new E.jy(this,a,c,z),null,null)
y=b.f
C.a.gB(y).aZ(b)
C.a.b9(y)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.eu(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ac("PunchSituation").gj(),z,!0)
b.bQ("FightSituation")
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
x=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!0},
A:{
tN:[function(a){return new E.jw("Dodging means moving your body out of harm's way.",!1,!1,!0,C.d,a,null)},"$1","r6",2,0,5]}},jx:{"^":"a:1;a,b,c",
$0:function(){return this.a.k9(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},jy:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kb(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dD:function(a,b,c){var z=new Z.dC(null,null,null,null,null,null)
new Z.qN(a,b,c).$1(z)
return z.p()},
f7:{"^":"ct;",
gaL:function(){return[E.r6()]},
gh:function(){return"PunchDefenseSituation"},
ap:function(){var z=new Z.dC(null,null,null,null,null,null)
z.n(this)
new Z.lL().$1(z)
return z.p()}},
qN:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaz().c=z
a.gaz().f=0
z=this.a.gj()
a.gaz().b=z
z=this.b.gj()
a.gaz().e=z
a.gaz().d=this.c
return a}},
lL:{"^":"a:0;",
$1:function(a){var z=a.gaz().f
if(typeof z!=="number")return z.a4()
a.gaz().f=z+1
return a}},
ok:{"^":"f7;d4:a<,j:b<,b8:c<,cH:d<,J:e<",
a2:function(a){var z=new Z.dC(null,null,null,null,null,null)
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
z=new Z.ok(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,M,{"^":"",
f9:function(a,b){var z=new M.dE(null,null,null,null,null)
new M.qO(a,b).$1(z)
return z.p()},
f8:{"^":"a2;",
gaL:function(){return[O.rc()]},
gh:function(){return"PunchSituation"},
ap:function(){var z=new M.dE(null,null,null,null,null)
z.n(this)
new M.lM().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.al(this.a)
return},
aO:function(a,b){return new H.J(a,new M.lN(this),[H.m(a,0)])}},
qO:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.gj()
a.gaU().b=z
z=this.b.gj()
a.gaU().d=z
return a}},
lM:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
if(typeof z!=="number")return z.a4()
a.gaU().e=z+1
return a}},
lN:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
ol:{"^":"f8;a,j:b<,c,J:d<",
a2:function(a){var z=new M.dE(null,null,null,null,null)
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
z=new M.ol(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",kh:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlash"},
gae:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.a3(z.gj(),new O.kk())
y=b.ac("SlashSituation").gj()
x=b.al(z.gj()).gbt()
if(x){a.eu(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.aN(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.eu(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.ed(c,b,z,b.ac("FightSituation").gby())}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return a.aF(C.c)},
A:{
tT:[function(a){return new O.kh(null,!0,!0,!0,C.d,a,null)},"$1","rd",2,0,5]}},kk:{"^":"a:0;",
$1:function(a){var z=a.gaq()
if(typeof z!=="number")return z.aJ()
a.saq(z-1)
return a}}}],["","",,X,{"^":"",jl:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gae:function(){return"step back and parry"},
gag:function(){return"will <subject> parry it?"},
V:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga6().gh())+"|fend it off}")
if(a.gb6())a.aD(c,"<subject> <is> out of balance",!0)
else S.aF(new X.jm(a,c),new X.jn(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ak(c,"<subject> {step<s>|take<s> a step} back")
a.c8(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.ga6().gh())+"|fend<s> it off}",!0)
if(!a.ga8()){b.a3(a.y,new X.jo())
if(a.ch===!0)a.ak(c,"<subject> regain<s> balance")}b.bQ("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
return 0.5-(a.ga8()?0:0.2)},
M:function(a,b){return a.aF(C.c)},
A:{
tL:[function(a){return new X.jl("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.d,a,null)},"$1","r4",2,0,5]}},jm:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jn:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cF(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jo:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}}}],["","",,F,{"^":"",jz:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"DodgeSlash"},
gae:function(){return"dodge and counter"},
gag:function(){return"will <subject> dodge?"},
V:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb6())a.aD(c,"<subject> <is> out of balance",!0)
else S.aF(new F.jA(a,c),new F.jB(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.ba(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga8()){z.bE(c,"<subject> lose<s> balance because of that",!0,!0)
b.a3(z.y,new F.jC())}b.bQ("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eB(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
x=a.ga8()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!a.gaa()},
A:{
tO:[function(a){return new F.jz("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.d,a,null)},"$1","r7",2,0,5]}},jA:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},jB:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cF(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jC:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return C.i}}}],["","",,G,{"^":"",lh:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"ParrySlash"},
gae:function(){return"parry and counter"},
gag:function(){return"will <subject> parry?"},
V:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga6().gh())+"|fend it off}")
if(a.gb6())a.aD(c,"<subject> <is> out of balance",!0)
else S.aF(new G.li(a,c),new G.lj(this,a,c),null,null)
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
if(z.gb6()){c.iI(0,"<subject> <is> out of balance",!0,!0,z)
c.e6(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$hX())
a.c8(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.ga6().gh())+"|fend<s> it off easily}",!0)}else a.c8(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.ga6().gh())+"|fend<s> it off}",!0)
b.bQ("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eB(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
x=a.ga8()?0:0.2
w=this.b.gb6()?0.3:0
if(a.ch===!0)return 0.6-x+w
return 0.3-x+w},
M:function(a,b){return a.aF(C.c)},
A:{
tZ:[function(a){return new G.lh("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.d,a,null)},"$1","rx",2,0,5]}},li:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lj:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cF(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bg:function(a,b,c){var z=new L.dI(null,null,null,null,null,null)
new L.qI(a,b,c).$1(z)
return z.p()},
fk:{"^":"ct;",
gaL:function(){return[F.r7(),G.rx(),X.r4()]},
gh:function(){return"SlashDefenseSituation"},
ap:function(){var z=new L.dI(null,null,null,null,null,null)
z.n(this)
new L.mG().$1(z)
return z.p()}},
qI:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.gj()
a.gaA().b=z
z=this.b.gj()
a.gaA().e=z
a.gaA().d=this.c
return a}},
mG:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
if(typeof z!=="number")return z.a4()
a.gaA().f=z+1
return a}},
on:{"^":"fk;d4:a<,j:b<,b8:c<,cH:d<,J:e<",
a2:function(a){var z=new L.dI(null,null,null,null,null,null)
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
z=new L.on(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,M,{"^":"",
bD:function(a,b){var z=new M.dJ(null,null,null,null,null)
new M.qK(a,b).$1(z)
return z.p()},
fl:{"^":"a2;",
gaL:function(){return[O.rd()]},
gh:function(){return"SlashSituation"},
ap:function(){var z=new M.dJ(null,null,null,null,null)
z.n(this)
new M.mH().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.al(this.a)
return},
aO:function(a,b){return new H.J(a,new M.mI(this),[H.m(a,0)])}},
qK:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaV().c=z
a.gaV().e=0
z=this.a.gj()
a.gaV().b=z
z=this.b.gj()
a.gaV().d=z
return a}},
mH:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
if(typeof z!=="number")return z.a4()
a.gaV().e=z+1
return a}},
mI:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
oo:{"^":"fl;a,j:b<,c,J:d<",
a2:function(a){var z=new M.dJ(null,null,null,null,null)
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
z=new M.oo(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,Q,{"^":"",ki:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gae:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a3(z.gj(),new Q.kj())
c.fg(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga6())
z.aN(c,"<subject> die<s>",!0)
c.F(0,"\n\n",!0)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return this.b.gaa()&&a.aF(C.c)},
A:{
tS:[function(a){return new Q.ki(null,!0,!0,!0,C.d,a,null)},"$1","re",2,0,5]}},kj:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}}}],["","",,K,{"^":"",lb:{"^":"H;T:c<,a1:d<,U:e<,O:f<,S:r<,b,a",
gh:function(){return"OnGroundParry"},
gae:function(){return"parry it"},
gag:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.ga6().gh())+"}}")
S.aF(new K.lc(a,c),new K.ld(this,a,c),null,null)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){a.c8(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.ga6().gh())+"}",!0)
b.bQ("FightSituation")
return H.b(a.db)+" parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.3},
M:function(a,b){return a.aF(C.c)},
A:{
tY:[function(a){return new K.lb(!1,!1,!0,C.d,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","rw",2,0,5]}},lc:{"^":"a:1;a,b",
$0:function(){return this.a.aD(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},ld:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cF(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",lZ:{"^":"H;S:c<,T:d<,a1:e<,U:f<,O:r<,b,a",
gh:function(){return"RollOutOfWay"},
gae:function(){return"roll out of way"},
gag:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to roll out of the way")
a.aD(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gP",6,0,2],
W:[function(a,b,c){a.k7(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a3(a.gj(),new Y.m_())
a.c8(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bQ("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
if(y.gbK())return 0
if(y.gb8()===C.j)return 1
if(a.gH()===!0)return 1
return 0.5},
M:function(a,b){return!0},
A:{
u3:[function(a){return new Y.lZ(null,!1,!1,!0,C.d,a,null)},"$1","rC",2,0,5]}},m_:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}}}],["","",,V,{"^":"",
du:function(a,b,c){var z=new V.dt(null,null,null,null,null,null)
new V.qL(a,b,c).$1(z)
return z.p()},
f1:{"^":"ct;",
gaL:function(){return[K.rw(),Y.rC()]},
gh:function(){return"OnGroundDefenseSituation"},
ap:function(){var z=new V.dt(null,null,null,null,null,null)
z.n(this)
new V.la().$1(z)
return z.p()}},
qL:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.gj()
a.gay().b=z
z=this.b.gj()
a.gay().e=z
a.gay().d=this.c
return a}},
la:{"^":"a:0;",
$1:function(a){var z=a.gay().f
if(typeof z!=="number")return z.a4()
a.gay().f=z+1
return a}},
oi:{"^":"f1;d4:a<,j:b<,b8:c<,cH:d<,J:e<",
a2:function(a){var z=new V.dt(null,null,null,null,null,null)
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
z=new V.oi(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,D,{"^":"",
fw:function(a,b){var z=new D.dL(null,null,null,null,null)
new D.qM(a,b).$1(z)
return z.p()},
fv:{"^":"a2;",
gaL:function(){return[Q.re()]},
gh:function(){return"StrikeDownSituation"},
ap:function(){var z=new D.dL(null,null,null,null,null)
z.n(this)
new D.ns().$1(z)
return z.p()},
aG:function(a,b){if(a===0)return b.al(this.a)
return},
aO:function(a,b){return new H.J(a,new D.nt(this),[H.m(a,0)])}},
qM:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gaW().c=z
a.gaW().e=0
z=this.a.gj()
a.gaW().b=z
z=this.b.gj()
a.gaW().d=z
return a}},
ns:{"^":"a:0;",
$1:function(a){var z=a.gaW().e
if(typeof z!=="number")return z.a4()
a.gaW().e=z+1
return a}},
nt:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
oq:{"^":"fv;a,j:b<,c,J:d<",
a2:function(a){var z=new D.dL(null,null,null,null,null)
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
z=new D.oq(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("targetOnGround"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,O,{"^":"",lB:{"^":"d;",
gbK:function(){return this.gb8()===C.o},
$isa2:1}}],["","",,K,{"^":"",dA:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",mJ:{"^":"ab;T:b<,U:c<,a1:d<,O:e<,a",
gX:function(){return""},
gS:function(){return},
gh:function(){return"SlayMonstersAction"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gB(z):null
x=b.du(y.gbr())
w=b.a
v=x.jO(b)
w.an(0,v)
C.a.q(z,U.k0(new H.J(w,new D.mK(a,x),[H.m(w,0)]),v,x.r,y))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gR",6,0,2],
ah:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
return H.a4(z.length!==0?C.a.gB(z):null,"$isah").c}},mK:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gbg()){z=a.gbk()
y=this.a.gbk()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbr()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",nz:{"^":"cv;T:c<,a1:d<,U:e<,O:f<,b,a",
gS:function(){return},
gh:function(){return"TakeExitAction"},
V:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb3())
y=b.f
H.a4(y.length!==0?C.a.gB(y):null,"$isah").b7(b,a,z.gj6(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gR",6,0,2],
ah:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
if(H.a4(z.length!==0?C.a.gB(z):null,"$isah").c===!0)return!1
this.b.gjy()
return!0},
A:{
u6:[function(a){return new Y.nz(!1,!0,!1,null,a,null)},"$1","tA",2,0,48]}}}],["","",,F,{"^":"",
fd:function(a,b){var z=new F.dG(null,null,null,null,null)
new F.qx(a,b).$1(z)
return z.p()},
ah:{"^":"a2;",
gaL:function(){return[Y.tA()]},
gbp:function(){var z=[]
C.a.an(z,$.$get$hl())
z.push($.$get$fm())
return z},
gh:function(){return"RoomRoamingSituation"},
ap:function(){var z=new F.dG(null,null,null,null,null)
z.n(this)
new F.m0().$1(z)
return z.p()},
aG:function(a,b){return b.a.bf(0,new F.m1(),new F.m2())},
aO:function(a,b){var z=this.aG(null,b)
if(z==null)return[]
return[z]},
fM:function(a,b){a.a.hZ(new F.m4(),!0)},
b7:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.du(c)
a.cE(this.b,F.fd(z,z.gjN()!=null))
d.iO()
z.c.$3(b,a,d)
d.F(0,"\n\n",!0)
for(y=R.hB(b,a),y=P.V(y,!0,H.w(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.as)(y),++v){u=a.al(y[v].gj())
t=u.a2(new F.m3(z))
w.ar(0,u)
w.q(0,t)}},
dz:function(a){if(J.f(this.a,$.$get$e8().b))return!1
return!0}},
qx:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.gav().c=z
a.gav().e=0
z=this.a.gh()
a.gav().b=z
a.gav().d=this.b
return a}},
m0:{"^":"a:0;",
$1:function(a){var z=a.gav().e
if(typeof z!=="number")return z.a4()
a.gav().e=z+1
return a}},
m1:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gbg()}},
m2:{"^":"a:1;",
$0:function(){return}},
m4:{"^":"a:0;",
$1:function(a){return!a.gbt()}},
m3:{"^":"a:0;a",
$1:function(a){a.sbr(this.a.b)
return a}},
om:{"^":"ah;br:a<,j:b<,c,J:d<",
a2:function(a){var z=new F.dG(null,null,null,null,null)
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
sjP:function(a){this.gav().d=a
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
z=new F.om(y,x,w,v)
if(y==null)H.h(P.l("currentRoomName"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("monstersAlive"))
if(v==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,V,{"^":"",
nB:function(){var z=new V.dM(null,null,null)
new V.qV().$1(z)
return z.p()},
nM:function(){var z=new V.dN(null,null,null)
new V.qU().$1(z)
return z.p()},
mO:function(){var z=new V.dK(null,null,null)
new V.qT().$1(z)
return z.p()},
qv:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The crevice is small.\n",!0)}},
qw:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qs:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'The journey from slavery to power begins with a single crack of a skull. Oddmund falls to the rock floor and his blond hair is quickly filled with blood. Above him, Agruth is grinning. He finds Oddmund\'s death funny. He always finds dying slaves funny.\n\n\nYou and Briana watch this in terror, unable to move.\n\n\nWhen the puddle of blood beneath Oddmund\'s head stops spreading, Agruth bends down to check the teeth in case there\'s gold in them. He stops when he notices you looking at him.\n\n\n"What the matter, human?" he says, smirking. "You have no work?"\n',!0)}},
qu:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qq:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten, but it has to be revived. There is no turning back now. [a][b][c][d][e]\n\n\nBriana kneels down to Oddmund. "Dead," she says plainly.\n\n\nOddmund was the leader among the slaves. He was the only one brave enough to steal the disgusting but precious food from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n',!0)}},
qr:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
kl:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.ek(b,new V.km())
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gT:function(){return!1}},
km:{"^":"a:0;",
$1:function(a){var z
a.gbG()
z=a.b
a.gbG()
a.b=z+1
return a}},
kn:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.ek(b,new V.ko())
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
N:function(a,b){return 0.7},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gT:function(){return!1}},
ko:{"^":"a:0;",
$1:function(a){var z
a.gbG()
z=a.b
a.gbG()
a.b=z+1
return a}},
mA:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"start_of_book"))return!1
if(b.iB(this.d))return!1
return!0},
W:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.rj(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gT:function(){return!1}},
qo:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
qp:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qm:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
qn:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qk:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a4(b.c,"$isbT").b>=1)c.F(0,"You hear orders being yelled somewhere behind you.",!0)
c.F(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
ql:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qh:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a4(b.c,"$isbT").b>=1)c.F(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.F(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
qj:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qf:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The crevice is small.\n",!0)}},
qg:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
qd:{"^":"a:4;",
$3:function(a,b,c){c.F(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
qe:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
qb:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iC("sneak_onto_cart"))c.F(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.F(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.F(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
qc:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
q9:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
qa:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
qZ:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
q8:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The stone gate looms before you.\n",!0)}},
mL:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"mountain_pass_gate"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.ek(b,new V.mM())
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gT:function(){return!1}},
mM:{"^":"a:0;",
$1:function(a){a.gbG()
a.a=!0
return a}},
nA:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"mountain_pass_gate"))return!1
if(b.kf(this.d)!=null)return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a3(a.gj(),new V.nJ())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.nB())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
N:function(a,b){return 0.5},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gT:function(){return!1}},
nJ:{"^":"a:0;",
$1:function(a){var z=a.gbm()
if(typeof z!=="number")return z.a4()
a.sbm(z+10)
return a}},
fA:{"^":"a2;",
gbp:function(){return[new A.bC(new V.nE(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bC(new V.nF(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ap:function(){var z=new V.dM(null,null,null)
z.n(this)
new V.nG().$1(z)
return z.p()},
aG:function(a,b){if(a!==0)return
return b.a.aI(0,new V.nH())},
aO:function(a,b){return[a.aI(0,new V.nI())]}},
qV:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.ga5().b=z
a.ga5().c=0
return a}},
nE:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aO(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a3(a.gj(),new V.nC())
b.a3(a.gj(),new V.nD())
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
nC:{"^":"a:0;",
$1:function(a){var z=a.gb_()
if(typeof z!=="number")return z.aJ()
a.sb_(z-1)
return a}},
nD:{"^":"a:0;",
$1:function(a){var z=a.gbm()
if(typeof z!=="number")return z.a4()
a.sbm(z+10)
return a}},
nF:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.es()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
nG:{"^":"a:0;",
$1:function(a){var z=a.ga5().c
if(typeof z!=="number")return z.a4()
a.ga5().c=z+1
return a}},
nH:{"^":"a:0;",
$1:function(a){return a.gH()}},
nI:{"^":"a:0;",
$1:function(a){return a.gH()}},
qX:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
qY:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
qP:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
qW:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"",!0)}},
nK:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.nM())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.3},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gT:function(){return!1}},
fF:{"^":"a2;",
gbp:function(){return[new A.bC(new V.nO(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bC(new V.nP(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ap:function(){var z=new V.dN(null,null,null)
z.n(this)
new V.nQ().$1(z)
return z.p()},
aG:function(a,b){if(a!==0)return
return b.a.aI(0,new V.nR())},
aO:function(a,b){return[a.aI(0,new V.nS())]}},
qU:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.ga5().b=z
a.ga5().c=0
return a}},
nO:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
b.es()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nP:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aO(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.nN())
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nN:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}},
nQ:{"^":"a:0;",
$1:function(a){var z=a.ga5().c
if(typeof z!=="number")return z.a4()
a.ga5().c=z+1
return a}},
nR:{"^":"a:0;",
$1:function(a){return a.gH()}},
nS:{"^":"a:0;",
$1:function(a){return a.gH()}},
mN:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.mO())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.8},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gT:function(){return!1}},
fo:{"^":"a2;",
gbp:function(){return[new A.bC(new V.mQ(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bC(new V.mR(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ap:function(){var z=new V.dK(null,null,null)
z.n(this)
new V.mS().$1(z)
return z.p()},
aG:function(a,b){if(a!==0)return
return b.a.aI(0,new V.mT())},
aO:function(a,b){return[a.aI(0,new V.mU())]}},
qT:{"^":"a:0;",
$1:function(a){var z=$.$get$a3().a9(1073741823)
a.ga5().b=z
a.ga5().c=0
return a}},
mQ:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
b.es()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
mR:{"^":"a:8;",
$4:function(a,b,c,d){var z
J.aO(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.mP())
z=b.f
C.a.gB(z).aZ(b)
C.a.b9(z)
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
mP:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}},
mS:{"^":"a:0;",
$1:function(a){var z=a.ga5().c
if(typeof z!=="number")return z.a4()
a.ga5().c=z+1
return a}},
mT:{"^":"a:0;",
$1:function(a){return a.gH()}},
mU:{"^":"a:0;",
$1:function(a){return a.gH()}},
nL:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.f(H.a4(z.length!==0?C.a.gB(z):null,"$isah").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ac("RoomRoamingSituation").b7(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ah:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Perhaps you can divert its attention."},
gT:function(){return!1}},
qt:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
qE:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
q7:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
qi:{"^":"a:4;",
$3:function(a,b,c){c.F(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
or:{"^":"fA;j:a<,J:b<",
a2:function(a){var z=new V.dM(null,null,null)
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
z=new V.or(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.n(z)
return z}},
ot:{"^":"fF;j:a<,J:b<",
a2:function(a){var z=new V.dN(null,null,null)
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
z=new V.ot(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.n(z)
return z}},
op:{"^":"fo;j:a<,J:b<",
a2:function(a){var z=new V.dK(null,null,null)
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
z=new V.op(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.n(z)
return z}}}],["","",,N,{"^":"",
ug:[function(a){return[N.e3(),N.hc()]},"$1","tE",2,0,11],
uh:[function(a){return[R.b8(1000+$.$get$cY().a9(999999),"Agruth",null,null,new U.c5(!1,10,!0,$.$get$aX(),"scimitar",C.c),null,0,2,100,!1,2,!0,C.r,0,$.$get$cd())]},"$1","tF",2,0,11],
aA:function(a){return a.giE().aI(0,new N.rh())},
rj:function(a,b){a.a3(N.aA(a).gj(),new N.rk(b))},
uk:[function(a){if(a.fd("take_out_gate_guards")||a.fd("take_out_gate_guards_rescue"))return[N.e3()]
else return[N.e3(),N.hc()]},"$1","tG",2,0,11],
ek:function(a,b){var z,y
z=H.a4(a.c,"$isbT")
z.toString
y=new M.dQ(null,!1,0)
y.n(z)
a.c=b.$1(y).p()},
hc:function(){return R.b8(1000+$.$get$cY().a9(999999),"goblin",O.d1(),null,new U.c5(!1,10,!0,$.$get$aX(),"scimitar",C.c),null,0,1,0,!1,1,!1,C.r,0,$.$get$cd())},
e3:function(){return R.b8(1000+$.$get$cY().a9(999999),"orc",O.d1(),null,new U.c5(!1,10,!0,$.$get$aX(),"sword",C.c),null,0,2,0,!1,2,!1,C.r,0,$.$get$cd())},
rh:{"^":"a:0;",
$1:function(a){return a.gH()}},
rk:{"^":"a:0;a",
$1:function(a){var z=a.gb_()
if(typeof z!=="number")return z.a4()
a.sb_(z+this.a)
return a}}}],["","",,O,{"^":"",
uf:[function(a){var z,y
z=$.$get$d5()
y=z.v
if(y.length>0){y+=" "
z.v=y}z.v=y+a},"$1","rE",2,0,15],
ui:[function(a){$.eb=a},"$1","rF",2,0,15],
hr:[function(a,b,c,d,e,f,g){var z=L.ev(a,!1,!1,d,e,f,g)
$.$get$bN().q(0,z)
return z},function(a){return O.hr(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hr(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","rD",2,13,51,0,0,0,1,1,0],
mb:{"^":"mn;",
bl:function(){var z=0,y=P.au(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bl=P.aq(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cP){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.D())
m=t.Q
n=Z.n_()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.D()
m.a.E(l.D())
new P.D(0,$.p,null,[null]).bn(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.D())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.c9(0)
m.a.E(n.D())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.D())
w=7
z=10
return P.ap(t.ci(),$async$bl)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.cm){r=n
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
ev:function(){var z,y
this.eZ()
this.f.aX(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fT(Z.bF())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bF()
z.a.E(y.D())
this.bl()},
kx:[function(a){var z,y
z={}
z.a=null
y=$.$get$bN()
y.L(0,new O.my(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.i(y)+")"))
this.ih(z)
this.bl()},"$1","gi0",2,0,32],
ih:function(a){var z
if(a.gft()!=null){z=a.r
$.$get$cb().at(z)}z=a.x
if(z!=null)this.e2(z)},
ci:function(){var z=0,y=P.au(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$ci=P.aq(function(a,a0){if(a===1)return P.aw(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cc()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.r(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.D())
p=r.b.df()
r=v.Q
q=p.giQ()
u=p.b
o=p.c
r.toString
n=new A.r(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.D())
r=new P.D(0,$.p,null,[null])
r.bn(null)
r.bR(new O.mo(v))
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
k.hY(new O.mp(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.r(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.D())
o=H.w(k,"b0",0)
o=P.V(new H.J(k,new O.mq(u,l),[o]),!0,o)
r=k.a
H.t([],[L.a1])
j=new L.ew(r,o)
if(!j.gK(j)){u=v.Q
r=u.e
if(r!=null){r.d6(new D.bR("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.c6(new P.D(0,$.p,null,[r]),[r])
r=j.dk()
u.a.E(r.D())
u=u.e.a.bR(v.gi0())
i=new O.mr(v)
r=H.m(u,0)
q=$.p
if(q!==C.h){i=P.e4(i,q)
q.toString}u.cU(new P.dX(null,new P.D(0,q,null,[r]),6,new O.ms(),i,[r,r]))
x=!0
z=1
break}else{h=k.bf(0,new O.mt(),new O.mu())
if(h!=null){if(h.gft()!=null){r=h.r
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
return P.ap(v.ck(f),$async$ci)
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
u=u.ey(50)
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
u.f=new P.c6(new P.D(0,$.p,null,[r]),[r])
r=new A.r(30,null,null,null,null)
r.c=q
u.a.E(r.D())
u.f.a.bR(new O.mv(v))
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
break}k.iN(r[q])}catch(b){u=H.z(b)
if(u instanceof M.cm){t=u
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
if(k.bL(0,new O.mw(u,v))&&v.x===v.e.gao().length-1){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.D())
r=v.Q
u=v.dL()
r.toString
u=u.ey(50)
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
return P.ap(v.ck(H.hx(q[o],r)),$async$ci)
case 15:c=a0
if(k.bL(0,new O.mx(u,v))&&v.x===v.e.gao().length-1){u=v.Q
u.toString
r=d.ey(50)
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
return P.ay($async$ci,y)},
e2:function(a){var z,y,x,w,v
z=$.$get$cq()
if(z.b.test(H.bo(a))){y=this.d
if(y==null)throw H.c(new P.F("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aJ()
w=z-1}else{x=this.b.dt(a,this.e.gdv())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a_(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.gh4()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gh4()
else z=!1}else z=!1
$.hd=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.E(v.D())
v=this.e
this.d=new O.mc(v,this.x)
this.e=x
this.x=w
v.e=J.a5(v.gdm(),1)},
eZ:function(){var z,y,x,w,v,u
this.x=null
$.$get$cb().aX(0)
$.$get$bN().sl(0,0)
$.pP=null
x=$.$get$cg()
x.aX(0)
w=$.$get$cc()
x.m(0,"points",w)
w.a=0
w.b.aX(0)
this.b.iS()
$.hG=!0
try{this.js()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.D())
throw H.c(z)}this.fR()
$.hG=!1},
ck:function(a){var z=0,y=P.au(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$ck=P.aq(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d5()
q.v=""
w=4
z=7
return P.ap(a.$0(),$async$ck)
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
throw H.c(new M.cm(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.v.length!==0){t.Q.eE(J.i(q)).bR(new O.mz(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$ck,y)},
i7:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cq().b.test(H.bo(z)))return!1
y=this.b.dt(z,this.e.gdv())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.E(w.D())
return!0}y.gko()
return!1},"$1","gf2",2,0,33],
dL:function(){var z,y,x,w,v,u
this.fR()
try{x=this.e.gh()
w=$.$get$cg()
x=new Z.fe(x,this.b.jc(),null,null,null,null)
x.c=H.aB(Z.cL(w),"$isE",[P.q,P.d],"$asE")
x.f=Date.now()
x.e=C.e.kl(H.av(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.D())
throw H.c(z)}},
fG:function(a,b){var z,y,x
this.eZ()
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
z.jp(a.b)
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
y=$.$get$cg()
Z.m8(a,y,P.dm(P.q,P.bv))
this.cx=H.a4(y.i(0,"game"),"$iseD")
this.cy=H.aB(y.i(0,"hitpoints"),"$isam",[P.aN],"$asam")
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
jI:function(a){return this.fG(a,null)},
dA:[function(a,b,c,d){var z=0,y=P.au(),x,w=this,v,u,t
var $async$dA=P.aq(function(e,f){if(e===1)return P.aw(f,y)
while(true)switch(z){case 0:v=$.$get$d5()
if(v.v.length!==0){w.Q.eE(J.i(v))
v.v=""}v=w.Q
v.toString
u=new A.r(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.D())
u=U.c3
t=new P.D(0,$.p,null,[u])
v.x=new P.c6(t,[u])
x=t
z=1
break
case 1:return P.ax(x,y)}})
return P.ay($async$dA,y)},function(a,b){return this.dA(a,b,null,!1)},"kt","$4$rerollEffectDescription$rerollable","$2","ghp",4,5,44,1,0]},
my:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seF(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.E(x.D())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cq().b.test(H.bo(z))?y.d.a:y.b.dt(z,y.e.gdv())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
mo:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
mp:{"^":"a:0;a",
$1:function(a){return a.geF()||this.a.i7(a)}},
mq:{"^":"a:35;a,b",
$1:function(a){return a.jz(this.b,this.a.a)}},
mr:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.E(x.D())
return}},
ms:{"^":"a:0;",
$1:function(a){return a instanceof D.bR}},
mt:{"^":"a:0;",
$1:function(a){return a.gjA()}},
mu:{"^":"a:1;",
$0:function(){return}},
mv:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
mw:{"^":"a:0;a,b",
$1:function(a){return a.d8(!0,this.a.a,this.b.gf2())}},
mx:{"^":"a:0;a,b",
$1:function(a){return a.d8(!0,this.a.a,this.b.gf2())}},
mz:{"^":"a:0;a",
$1:function(a){return this.a.bl()}},
lx:{"^":"d;a,b,fn:c<",
iH:function(a,b,c){var z
if(!$.hd){z=J.a5(this.a,b)
this.a=z
this.b.at(new A.cE(b,z,c))}},
q:function(a,b){return this.iH(a,b,null)},
a4:function(a,b){this.q(0,b)
return this},
D:function(){return P.ae(["points",this.a])},
h3:function(a){this.a=a.i(0,"points")
this.b.aX(0)},
hy:function(){this.b=P.b1(null,A.cE)},
$isdH:1},
cM:{"^":"lg;ao:d<,dm:e@,a,b,c",
gh4:function(){return J.a0(this.e,0)}},
mc:{"^":"d;a,b"},
mj:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dt:function(a,b){var z
if(b!=null&&this.a.a0(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a0(a))return z.i(0,a)
else return}},
m:function(a,b,c){this.a.m(0,b,c)
c.sh(b)},
jc:function(){var z=new H.N(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.ml(z))
return z},
jp:function(a){a.L(0,new O.mm(this))},
iS:function(){this.a.L(0,new O.mk())}},
ml:{"^":"a:7;a",
$2:function(a,b){this.a.m(0,a,P.ae(["visitCount",b.gdm()]))}},
mm:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a0(a))z.i(0,a).sdm(J.at(b,"visitCount"))}},
mk:{"^":"a:7;",
$2:function(a,b){b.sdm(0)}}}],["","",,M,{"^":"",cm:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eq:function(a){return new M.cm(a,null,null)}}}}],["","",,M,{"^":"",mn:{"^":"d;"}}],["","",,Z,{"^":"",fe:{"^":"d;a,b,c,d,e,f",
ey:function(a){var z
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
return C.v.fs(z)},
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
cL:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)if(Z.ff(z.i(a,x)))y.push(Z.cL(z.i(a,x)))
return y}else if(!!z.$isE){w=new H.N(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.m7(a,w))
return w}else if(!!z.$isdH){v=a.D()
v.m(0,"_class",a.gfn())
return Z.cL(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cK:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cK(z.i(a,x),b,null))
return y}else{w=!!z.$isE
if(w&&!a.a0("_class")){v=new H.N(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.m6(b,v))
return v}else if(w&&a.a0("_class"))if(c!=null){c.h3(a)
return c}else{u=z.i(a,"_class")
if(!b.a0(u))throw H.c(new Z.dg("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
m8:function(a,b,c){a.c.L(0,new Z.m9(b,c))}}},m7:{"^":"a:7;a,b",
$2:function(a,b){if(Z.ff(this.a.i(0,a)))this.b.m(0,a,Z.cL(b))}},m6:{"^":"a:7;a,b",
$2:function(a,b){this.b.m(0,a,Z.cK(b,this.a,null))}},m9:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.m(0,a,Z.cK(b,x,null))
else z.m(0,a,Z.cK(b,x,y))}},dg:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},kr:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",lD:{"^":"d;"},lC:{"^":"lD;"},kz:{"^":"lC;a,b,c,d,e,f,r,x",
kB:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(o!=null){o.d6(new D.bR("Book Quit before choice was selected."))
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
case 1050:l=z.gjt()
this.e.bM(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.D())
o=z.gjK()
if(!o.a0("__submitted__"))o.m(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.cc())
n.bH(new G.jg(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.D())
k=J.at(z.gep(),0)
j=J.at(z.gep(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.bM(new U.c3(C.y[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.D())
o=this.e
if(o!=null){o.d6(new D.bR("Book Restart before choice was selected."))
this.e=null}try{this.c.ev()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.D())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bF()
n.E(o.D())
n.E(new A.cE(0,0,null).dk().D())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.D())
h=this.e
if(h!=null){h.d6(new D.bR("Book Load before choice was selected."))
this.e=null}try{h=z.ght()
f=new Z.fe(null,null,null,null,null,null)
e=H.aB(C.v.iZ(h),"$isE",n,"$asE")
if(!e.a0("currentPageName")||!e.a0("vars"))H.h(new Z.kr("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aB(e.i(0,"pageMapState"),"$isE",n,"$asE")
f.c=H.aB(e.i(0,"vars"),"$isE",n,"$asE")
if(e.a0("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aB(J.ig(z.gep()),"$isbB",[o],"$asbB")
o=this.c
if(v!=null)o.fG(w,v)
else o.jI(w)}catch(i){o=H.z(i)
if(o instanceof Z.dg){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.D())
this.c.ev()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.D())
this.c.ev()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bF()
g.E(o.D())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.D())
throw H.c(q)}this.c.toString
g.E(new A.cE(0,$.$get$cc().a,null).dk().D())
return
case 1090:this.f.bM(!0)
this.f=null
return
case 1040:this.c.bl()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gbS())+"."
this.a.E(o.D())}},"$1","gie",2,0,21],
eE:function(a){var z=P.W
this.f=new P.c6(new P.D(0,$.p,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.E(z.D())
return this.f.a}},bR:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jg:{"^":"d;a",
D:function(){return P.bZ(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;bS:a<,ep:b<,ht:c<,jt:d<,jK:e<",
gkn:function(){var z=this.a
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
dj:function(){return C.v.fs(this.D())},
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
z="Message "+this.gkn()
y=this.a
x=J.n(y)
return z+(x.t(y,50)||x.t(y,60)||x.t(y,90)||x.t(y,100)||x.t(y,666)||x.t(y,667)?" (async)":"")}}}],["","",,E,{"^":"",lg:{"^":"d;h:a@,ko:b<",
k:function(a){return this.a},
gdv:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.i9(z,": ")
if(y>0)return J.ie(this.a,0,y)
else return}}}],["","",,A,{"^":"",cE:{"^":"d;iQ:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dk:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a1:{"^":"d;eF:a@,b,c,d,aQ:e<,S:f<,ft:r<,x,y",
gjA:function(){return this.e.length===0},
d8:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jz:function(a,b){return this.d8(a,b,null)},
kj:function(){return P.ae(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bR:function(a){this.r=a
return this},
bq:function(a,b){return C.b.bq(this.e,b.gaQ())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hw:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bp(a).h1(a)
this.d=C.b.gw(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.a1]},
A:{
ev:function(a,b,c,d,e,f,g){var z=new L.a1(!1,null,null,null,null,e,null,d,g)
z.hw(a,!1,!1,d,e,f,g)
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
iN:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
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
o.e=J.bp(r).h1(r)
o.d=C.b.gw(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
iL:function(a,b,c,d,e,f,g){if(b instanceof L.a1)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.ev(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.iL(a,b,!1,!1,null,null,null)},
kk:function(a,b,c,d){var z,y,x,w
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
dk:function(){return this.kk(null,null,null,null)},
k:function(a){var z=this.b
return new H.ak(z,new L.iY(),[H.m(z,0),null]).cB(0,", ")},
$aseV:function(){return[L.a1]},
$asf_:function(){return[L.a1]},
$asI:function(){return[L.a1]},
$asT:function(){return[L.a1]}},iW:{"^":"a:0;a,b,c",
$1:function(a){return a.d8(this.b,this.a,this.c)}},iX:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aO(this.a.b,a.kj())
a.a=!0}},iY:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cN:{"^":"d;cS:a<,aQ:b<",
D:function(){return P.ae(["show",this.a,"string",this.b])}},mX:{"^":"d;a",
D:function(){var z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.mY(z))
return z},
L:function(a,b){this.a.L(0,b)}},mY:{"^":"a:37;a",
$2:function(a,b){this.a.m(0,a,b.D())}},fS:{"^":"d;h:a@,b3:b<,fo:c<,dd:d<,cS:e<,fL:f<,aQ:r<",A:{
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
z[w]=new Z.fS(s,r,q,p,o,n,t);++w}C.a.cT(z,new Z.nZ())
return z}}},nZ:{"^":"a:7;",
$2:function(a,b){return J.aC(b.gdd(),a.gdd())}},am:{"^":"d;h:a<,b3:b<,c,fo:d<,dd:e<,f,r,fL:x<,fl:y@,fn:z<,$ti",
gas:function(){return this.f},
sas:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cP=!0}},
gcS:function(){return this.r},
gaQ:function(){return this.c.$1(this.f)},
D:function(){return P.ae(["name",this.a,"value",this.f,"show",this.r])},
h3:function(a){var z
this.sas(H.hW(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cP=!0}},
$isdH:1,
A:{
bE:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cO()
y=z.a0(a)?H.aB(z.i(0,a),"$isam",[h],"$asam"):new Z.am(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.hW(e,h)
y.r=!0
z.m(0,a,y)
return y},
n_:function(){var z,y
z=new Z.mX(new H.N(0,null,null,null,null,null,0,[P.q,Z.cN]))
y=$.$get$cO().gca()
new H.J(y,new Z.n0(),[H.w(y,"y",0)]).L(0,new Z.n1(z))
$.cP=!1
return z},
bF:function(){var z=H.t([],[[P.E,P.q,P.d]])
$.$get$cO().gca().L(0,new Z.mZ(z))
return z}}},n0:{"^":"a:0;",
$1:function(a){return a.gfl()}},n1:{"^":"a:22;a",
$1:function(a){var z,y
z=a.gcS()
y=a.gaQ()
a.sfl(!1)
this.a.a.m(0,a.a,new Z.cN(z,y))}},mZ:{"^":"a:22;a",
$1:function(a){var z=new H.N(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"name",a.gh())
z.m(0,"description",a.gb3())
z.m(0,"color",a.gfo())
z.m(0,"priority",a.gdd())
z.m(0,"show",a.gcS())
z.m(0,"notifyOnChange",a.gfL())
z.m(0,"string",a.gaQ())
this.a.push(z)}}}],["","",,N,{"^":"",dp:{"^":"d;h:a<,b,c,hP:d<,e,f",
gfz:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gh(),"")
x=this.a
return y?x:z.gfz()+"."+x},
geo:function(){if($.hE){var z=this.b
if(z!=null)return z.geo()}return $.pW},
jJ:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geo().b){if(!!J.n(b).$isbv)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.rB.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfz()
t=c
s=d
r=Date.now()
q=$.eW
$.eW=q+1
p=new N.kX(a,x,v,w,new P.cs(r,!1),q,t,s,e)
if($.hE)for(o=this;o!=null;){o.f5(p)
o=o.b}else $.$get$eY().f5(p)}},
c4:function(a,b,c,d){return this.jJ(a,b,c,d,null)},
jf:function(a,b,c){return this.c4(C.Q,a,b,c)},
a7:function(a){return this.jf(a,null,null)},
je:function(a,b,c){return this.c4(C.P,a,b,c)},
b4:function(a){return this.je(a,null,null)},
jd:function(a,b,c){return this.c4(C.R,a,b,c)},
bD:function(a){return this.jd(a,null,null)},
jr:function(a,b,c){return this.c4(C.x,a,b,c)},
fF:function(a){return this.jr(a,null,null)},
kp:function(a,b,c){return this.c4(C.U,a,b,c)},
ez:function(a){return this.kp(a,null,null)},
ho:function(a,b,c){return this.c4(C.T,a,b,c)},
dw:function(a){return this.ho(a,null,null)},
f5:function(a){},
A:{
bb:function(a){return $.$get$eX().jX(a,new N.qC(a))}}},qC:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dC(z,"."))H.h(P.G("name shouldn't start with a '.'"))
y=C.b.jG(z,".")
if(y===-1)x=z!==""?N.bb(""):null
else{x=N.bb(C.b.ax(z,0,y))
z=C.b.bA(z,y+1)}w=new H.N(0,null,null,null,null,null,0,[P.q,N.dp])
w=new N.dp(z,x,null,w,new P.fV(w,[null,null]),null)
if(x!=null)x.ghP().m(0,z,w)
return w}},aR:{"^":"d;h:a<,as:b<",
t:function(a,b){if(b==null)return!1
return b instanceof N.aR&&this.b===b.b},
aH:function(a,b){return C.e.aH(this.b,b.gas())},
bV:function(a,b){return C.e.bV(this.b,b.gas())},
bz:function(a,b){var z=b.gas()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bF:function(a,b){return this.b>=b.gas()},
bq:function(a,b){var z=b.gas()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gw:function(a){return this.b},
k:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aR]}},kX:{"^":"d;eo:a<,b,aC:c<,d,J:e<,f,be:r<,bc:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bq:function(a){return X.cX(J.i6(a,0,new X.rl()))},
aV:function(a,b){var z=J.a5(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cX:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rl:{"^":"a:7;",
$2:function(a,b){return X.aV(a,J.j(b))}}}],["","",,U,{"^":"",cJ:{"^":"d;a,b",
k:function(a){return this.b}},c3:{"^":"d;a,kq:b<",
gem:function(){return this.a===C.A},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
t:function(a,b){if(b==null)return!1
return b instanceof U.c3&&b.a===this.a&&J.f(b.b,this.b)},
gw:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
uj:[function(a,b){var z,y,x,w,v
z=new D.kz(b,null,null,null,null,null,null,null)
y=$.fb
$.fb=y+1
x=new H.c1(y,null,!1)
w=init.globalState.d
w.dF(y,x)
w.cq()
w=new H.lT(x,null)
w.hz(x)
z.b=w
w=w.b
w.toString
new P.cR(w,[H.m(w,0)]).aw(z.gie(),null,null,null)
b.E(new H.c9(z.b.a,init.globalState.d.a))
v=N.me()
z.c=v
v.Q=z},"$2","hs",4,0,34]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eO.prototype
return J.kB.prototype}if(typeof a=="string")return J.bY.prototype
if(a==null)return J.eP.prototype
if(typeof a=="boolean")return J.eN.prototype
if(a.constructor==Array)return J.bW.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aW=function(a){if(a==null)return a
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
return J.ea(a).a4(a,b)}
J.br=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.a9(a).cO(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).t(a,b)}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a9(a).bz(a,b)}
J.bP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a9(a).aH(a,b)}
J.b6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ea(a).bW(a,b)}
J.i4=function(a){if(typeof a=="number")return-a
return J.a9(a).eC(a)}
J.aC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a9(a).aJ(a,b)}
J.at=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).i(a,b)}
J.aO=function(a,b){return J.aW(a).q(a,b)}
J.ch=function(a,b){return J.ea(a).bq(a,b)}
J.i5=function(a,b){return J.K(a).a_(a,b)}
J.el=function(a,b){return J.aW(a).aj(a,b)}
J.i6=function(a,b,c){return J.aW(a).b5(a,b,c)}
J.j=function(a){return J.n(a).gw(a)}
J.em=function(a){return J.K(a).gK(a)}
J.aj=function(a){return J.aW(a).gY(a)}
J.i7=function(a){return J.aW(a).gB(a)}
J.aD=function(a){return J.K(a).gl(a)}
J.i8=function(a){return J.n(a).gbj(a)}
J.i9=function(a,b){return J.K(a).bs(a,b)}
J.en=function(a,b){return J.aW(a).aY(a,b)}
J.ia=function(a,b,c){return J.bp(a).fH(a,b,c)}
J.ib=function(a,b,c){return J.bp(a).k0(a,b,c)}
J.ic=function(a){return J.a9(a).fX(a)}
J.id=function(a,b){return J.aW(a).dB(a,b)}
J.d6=function(a,b){return J.bp(a).dC(a,b)}
J.ie=function(a,b,c){return J.bp(a).ax(a,b,c)}
J.ig=function(a){return J.aW(a).bw(a)}
J.i=function(a){return J.n(a).k(a)}
J.b7=function(a,b){return J.a9(a).dl(a,b)}
J.ih=function(a,b){return J.aW(a).bU(a,b)}
I.d3=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.G=J.aP.prototype
C.a=J.bW.prototype
C.K=J.eN.prototype
C.e=J.eO.prototype
C.t=J.eP.prototype
C.n=J.bX.prototype
C.b=J.bY.prototype
C.B=new A.ac(0,0,0)
C.C=new A.ac(-1/0,-1/0,-1/0)
C.D=new A.cj(-10,0,100)
C.E=new P.lf()
C.u=new P.oP()
C.F=new P.p7()
C.h=new P.pm()
C.w=new P.aZ(0)
C.H=new U.cy(0,"ItemType.spear")
C.I=new U.cy(1,"ItemType.branch")
C.J=new U.cy(2,"ItemType.tent")
C.c=new U.cy(3,"ItemType.sword")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.kF(null,null)
C.M=new P.kH(null)
C.N=new P.kI(null,null)
C.O=new O.kP(0,"KnownToMode.all")
C.P=new N.aR("FINER",400)
C.Q=new N.aR("FINEST",300)
C.R=new N.aR("FINE",500)
C.x=new N.aR("INFO",800)
C.S=new N.aR("OFF",2000)
C.T=new N.aR("SEVERE",1000)
C.U=new N.aR("WARNING",900)
C.A=new U.cJ(0,"Result.success")
C.Y=new U.cJ(1,"Result.failure")
C.Z=new U.cJ(2,"Result.criticalSuccess")
C.a_=new U.cJ(3,"Result.criticalFailure")
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
C.d=new Q.lY(0,"Resource.stamina")
C.a0=H.b4("eQ")
C.a1=H.b4("al")
C.a2=H.b4("q")
C.a3=H.b4("W")
C.a4=H.b4("aN")
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
$.p=C.h
$.eF=0
$.eb=null
$.hd=!1
$.pP=null
$.hf=!1
$.hG=!0
$.cP=!1
$.hE=!1
$.rB=C.S
$.pW=C.x
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
I.$lazy(y,x,w)}})(["eK","$get$eK",function(){return H.kx()},"eL","$get$eL",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eF
$.eF=z+1
z="expando$key$"+z}return new P.k_(null,z,[P.u])},"fH","$get$fH",function(){return H.aI(H.cQ({
toString:function(){return"$receiver$"}}))},"fI","$get$fI",function(){return H.aI(H.cQ({$method$:null,
toString:function(){return"$receiver$"}}))},"fJ","$get$fJ",function(){return H.aI(H.cQ(null))},"fK","$get$fK",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fO","$get$fO",function(){return H.aI(H.cQ(void 0))},"fP","$get$fP",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fM","$get$fM",function(){return H.aI(H.fN(null))},"fL","$get$fL",function(){return H.aI(function(){try{null.$method$}catch(z){return z.message}}())},"fR","$get$fR",function(){return H.aI(H.fN(void 0))},"fQ","$get$fQ",function(){return H.aI(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dS","$get$dS",function(){return P.ox()},"ba","$get$ba",function(){var z,y
z=P.al
y=new P.D(0,P.oa(),null,[z])
y.hG(null,z)
return y},"bM","$get$bM",function(){return[]},"by","$get$by",function(){return N.bb("PlannerRecommendation")},"hu","$get$hu",function(){return new K.q6()},"e8","$get$e8",function(){var z=$.$get$hu()
return K.Z("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a3","$get$a3",function(){return P.cG(null)},"bA","$get$bA",function(){return P.cG(null)},"hI","$get$hI",function(){return N.bb("Storyline")},"fu","$get$fu",function(){return P.be("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cd","$get$cd",function(){return L.dR(new L.qA())},"aX","$get$aX",function(){return L.dR(new L.qB())},"hP","$get$hP",function(){return L.dR(new L.qz())},"dx","$get$dx",function(){return new F.lk("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"e6","$get$e6",function(){return Y.dd(!1,"balance",!0,C.q,$.$get$aX())},"hQ","$get$hQ",function(){return Y.dd(!1,"pounding",!1,C.q,$.$get$aX())},"fc","$get$fc",function(){return new B.lW("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fg","$get$fg",function(){return new O.ma(null,!1,!0,!1,null,null)},"ft","$get$ft",function(){return new Q.mV(null,!1,!0,!0,C.d,null)},"fU","$get$fU",function(){return new M.o_("",!0,C.d,!1,!0,null)},"he","$get$he",function(){return P.cG(null)},"hX","$get$hX",function(){return Y.dd(!1,"swing",!0,C.q,$.$get$aX())},"fm","$get$fm",function(){return new D.mJ(!1,!1,!0,null,null)},"hw","$get$hw",function(){return K.Z("forge_church_crevice",new V.qv(),new V.qw(),null,null,H.t([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"hH","$get$hH",function(){return K.Z("kill_agruth",new V.qs(),new V.qu(),N.tF(),null,H.t([new Q.v("start_of_book","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hS","$get$hS",function(){return K.Z("start_of_book",new V.qq(),new V.qr(),null,null,H.t([],[Q.v]),"ground")},"eH","$get$eH",function(){return new V.kl("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eI","$get$eI",function(){return new V.kn("Flee through the War Forges","flee_through_war_forge",!0,null)},"fh","$get$fh",function(){return new V.mA("Search Agruth","search_agruth",!0,null)},"hY","$get$hY",function(){return K.Z("the_shafts",new V.qo(),new V.qp(),null,null,H.t([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"i_","$get$i_",function(){return K.Z("tunnel",new V.qm(),new V.qn(),N.tE(),null,H.t([new Q.v("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.v]),"ground")},"i0","$get$i0",function(){return K.Z("underground_church",new V.qk(),new V.ql(),null,null,H.t([new Q.v("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.v]),"ground")},"i1","$get$i1",function(){return K.Z("war_forge",new V.qh(),new V.qj(),null,null,H.t([new Q.v("tunnel","Enter the corridor","You enter the corridor.",null),new Q.v("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.v]),"ground")},"i2","$get$i2",function(){return K.Z("war_forge_crevice",new V.qf(),new V.qg(),null,null,H.t([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"hv","$get$hv",function(){return K.Z("entrance_to_bloodrock",new V.qd(),new V.qe(),null,null,H.t([new Q.v("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.v("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.v]),"ground")},"hJ","$get$hJ",function(){return K.Z("mountain_pass",new V.qb(),new V.qc(),null,null,H.t([new Q.v("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.v]),"ground")},"hK","$get$hK",function(){return K.Z("mountain_pass_gate",new V.q9(),new V.qa(),null,null,H.t([new Q.v("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.v]),"ground")},"hL","$get$hL",function(){return K.Z("mountain_pass_guard_post",new V.qZ(),new V.q8(),N.tG(),null,H.t([new Q.v("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.v]),"ground")},"fn","$get$fn",function(){return new V.mL("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fB","$get$fB",function(){return new V.nA("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"hM","$get$hM",function(){return K.Z("mountainside_base",new V.qX(),new V.qY(),null,null,H.t([new Q.v("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.v]),"ground")},"hN","$get$hN",function(){return K.Z("mountainside_path",new V.qP(),new V.qW(),null,null,H.t([new Q.v("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.v]),"ground")},"fG","$get$fG",function(){return new V.nK("Scare off the serpent","threaten_winged_serpent",!0,null)},"fp","$get$fp",function(){return new V.mN("Soothe the serpent","soothe_winged_serpent",!0,null)},"fE","$get$fE",function(){return new V.nL("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"i3","$get$i3",function(){return K.Z("winged_serpent_nest",new V.qt(),new V.qE(),null,null,H.t([new Q.v("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.v]),"ground")},"hF","$get$hF",function(){return K.Z("ironcast_road",new V.q7(),new V.qi(),null,null,H.t([new Q.v("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.v]),"ground")},"hm","$get$hm",function(){return H.t([$.$get$hw(),$.$get$hH(),$.$get$hS(),$.$get$hY(),$.$get$i_(),$.$get$i0(),$.$get$i1(),$.$get$i2(),$.$get$hv(),$.$get$hJ(),$.$get$hK(),$.$get$hL(),$.$get$hM(),$.$get$hN(),$.$get$i3(),$.$get$hF()],[K.c2])},"hl","$get$hl",function(){return H.t([$.$get$eH(),$.$get$eI(),$.$get$fh(),$.$get$fn(),$.$get$fB(),$.$get$fG(),$.$get$fp(),$.$get$fE()],[A.aG])},"cY","$get$cY",function(){return P.cG(null)},"d5","$get$d5",function(){return P.nu("")},"cc","$get$cc",function(){var z=new O.lx(0,null,"PointsCounter")
z.hy()
return z},"bN","$get$bN",function(){return new L.ew(null,H.t([],[L.a1]))},"cg","$get$cg",function(){return H.eU(P.q,P.d)},"cb","$get$cb",function(){return P.b1(null,{func:1,ret:[P.M,P.al]})},"cq","$get$cq",function(){return P.be("^\\s*<<<\\s*$",!0,!1)},"cO","$get$cO",function(){return H.eU(P.q,Z.am)},"eY","$get$eY",function(){return N.bb("")},"eX","$get$eX",function(){return P.dm(P.q,N.dp)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.C,A.a7,Y.a_]},{func:1,args:[,,,]},{func:1,args:[R.C,A.a7,Y.a_]},{func:1,ret:Q.H,args:[R.C]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,v:true,args:[R.C,A.a7,Y.a_,R.C,S.a2]},{func:1,ret:[P.y,R.C],args:[A.a7]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.aU]},{func:1,v:true,args:[P.q]},{func:1,v:true,args:[R.C,A.a7,Y.a_,R.C,,]},{func:1,args:[P.aN]},{func:1,ret:P.M},{func:1,ret:P.L,args:[A.ac]},{func:1,args:[,P.aU]},{func:1,v:true,args:[P.d]},{func:1,args:[Z.am]},{func:1,ret:Y.bu,args:[P.u]},{func:1,args:[R.C]},{func:1,args:[U.bU]},{func:1,args:[P.u,R.C]},{func:1,args:[P.bc]},{func:1,args:[Y.a6]},{func:1,ret:P.W,args:[P.u]},{func:1,args:[P.u,,]},{func:1,args:[[P.I,Y.a6],Y.a6]},{func:1,v:true,args:[P.u]},{func:1,ret:P.W,args:[L.a1]},{func:1,v:true,args:[[P.I,P.q],P.fi]},{func:1,args:[L.a1]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cN]},{func:1,ret:P.L,args:[A.cj]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[P.L,R.C]},{func:1,ret:P.u,args:[P.Q,P.Q]},{func:1,ret:P.q,args:[Q.ab]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:[P.M,U.c3],args:[P.aN,P.q],named:{rerollEffectDescription:P.q,rerollable:P.W}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aU]},{func:1,ret:Q.cx,args:[U.aQ]},{func:1,ret:Q.cv,args:[Q.v]},{func:1,v:true,args:[P.d,P.aU]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a1,args:[P.q],named:{deferToChoiceList:P.W,deferToEndOfPage:P.W,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.M,P.al]},submenu:P.q}},{func:1,args:[P.W]}]
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
if(x==y)H.tB(d||a)
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