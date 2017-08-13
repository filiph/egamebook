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
if(b5.$isaS)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="w"){processStatics(init.statics[b1]=b2.w,b3)
delete b2.w}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.en"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.en"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.en(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b6=function(){}
var dart=[["","",,H,{"^":"",vG:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aS:{"^":"d;",
t:function(a,b){return a===b},
gv:function(a){return H.aC(a)},
k:function(a){return H.cN(a)},
gbu:function(a){return new H.av(H.i6(a),null)}},
f5:{"^":"aS;",
k:function(a){return String(a)},
gv:function(a){return a?519018:218159},
gbu:function(a){return C.a7},
$isa1:1},
f8:{"^":"aS;",
t:function(a,b){return null==b},
k:function(a){return"null"},
gv:function(a){return 0},
gbu:function(a){return C.a5},
$isat:1},
fb:{"^":"aS;",
gv:function(a){return 0},
gbu:function(a){return C.a4},
k:function(a){return String(a)},
$isf9:1},
vM:{"^":"fb;"},
bl:{"^":"fb;"},
c3:{"^":"aS;$ti",
fJ:function(a,b){if(!!a.immutable$list)throw H.c(new P.R(b))},
cJ:function(a,b){if(!!a.fixed$length)throw H.c(new P.R(b))},
q:function(a,b){this.cJ(a,"add")
a.push(b)},
ku:function(a){this.cJ(a,"removeLast")
if(a.length===0)throw H.c(H.aG(a,-1))
return a.pop()},
aa:function(a,b){var z
this.cJ(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
iI:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.C(a))}v=z.length
if(v===y)return
this.sm(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c2:function(a,b){return new H.J(a,b,[H.m(a,0)])},
ar:function(a,b){var z
this.cJ(a,"addAll")
for(z=J.am(b);z.u();)a.push(z.gG())},
V:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aV:function(a,b){return new H.ao(a,b,[H.m(a,0),null])},
dR:function(a,b){return H.h1(a,b,null,H.m(a,0))},
bm:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
bd:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.ad())},
dt:function(a,b){return this.bd(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
gev:function(a){if(a.length>0)return a[0]
throw H.c(H.ad())},
gB:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ad())},
gc6:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ad())
throw H.c(H.dr())},
aW:function(a,b,c,d,e){var z,y,x
this.fJ(a,"setRange")
P.c9(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.a4(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f4())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bR:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.C(a))}return!1},
cp:function(a,b){var z
this.fJ(a,"sort")
z=b==null?P.tc():b
H.cd(a,0,a.length-1,z)},
eW:function(a){return this.cp(a,null)},
bK:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aT:function(a,b){return this.bK(a,b,0)},
a5:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gU:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
k:function(a){return P.c2(a,"[","]")},
bD:function(a){return P.b_(a,H.m(a,0))},
gX:function(a){return new J.b9(a,a.length,0,null,[H.m(a,0)])},
gv:function(a){return H.aC(a)},
gm:function(a){return a.length},
sm:function(a,b){this.cJ(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cu(b,"newLength",null))
if(b<0)throw H.c(P.a4(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aG(a,b))
if(b>=a.length||b<0)throw H.c(H.aG(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.h(new P.R("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aG(a,b))
if(b>=a.length||b<0)throw H.c(H.aG(a,b))
a[b]=c},
$iscJ:1,
$ascJ:I.b6,
$isL:1,
$isX:1,
$isv:1},
vF:{"^":"c3;$ti"},
b9:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c4:{"^":"aS;",
bA:function(a,b){var z
if(typeof b!=="number")throw H.c(H.S(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdv(b)
if(this.gdv(a)===z)return 0
if(this.gdv(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdv:function(a){return a===0?1/a<0:a<0},
hg:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.R(""+a+".round()"))},
kL:function(a){return a},
b6:function(a,b){var z
if(b>20)throw H.c(P.a4(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdv(a))return"-"+z
return z},
kO:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a4(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cK(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.R("Unexpected toString result: "+z))
x=J.I(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c4("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
eS:function(a){return-a},
a7:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a-b},
d3:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a/b},
c4:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a*b},
bH:function(a,b){return(a|0)===a?a/b|0:this.iR(a,b)},
iR:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.R("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dk:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aQ:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<b},
b7:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a>b},
c3:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<=b},
bL:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a>=b},
gbu:function(a){return C.aa},
$isK:1},
f7:{"^":"c4;",
gbu:function(a){return C.a9},
$isaP:1,
$isK:1,
$ist:1},
f6:{"^":"c4;",
gbu:function(a){return C.a8},
$isaP:1,
$isK:1},
c5:{"^":"aS;",
cK:function(a,b){if(b<0)throw H.c(H.aG(a,b))
if(b>=a.length)H.h(H.aG(a,b))
return a.charCodeAt(b)},
cs:function(a,b){if(b>=a.length)throw H.c(H.aG(a,b))
return a.charCodeAt(b)},
dm:function(a,b,c){if(c>b.length)throw H.c(P.a4(c,0,b.length,null,null))
return new H.qB(b,a,c)},
eo:function(a,b){return this.dm(a,b,0)},
h_:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a4(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cK(b,c+y)!==this.cs(a,y))return
return new H.h0(c,b,a)},
a7:function(a,b){if(typeof b!=="string")throw H.c(P.cu(b,null,null))
return a+b},
es:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bF(a,y-z)},
kw:function(a,b,c){H.br(c)
return H.n(a,b,c)},
kx:function(a,b,c,d){H.br(c)
P.mS(d,0,a.length,"startIndex",null)
return H.ir(a,b,c,d)},
cU:function(a,b,c){return this.kx(a,b,c,0)},
hM:function(a,b,c){var z
if(c>a.length)throw H.c(P.a4(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iH(b,a,c)!=null},
d9:function(a,b){return this.hM(a,b,0)},
aE:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.S(c))
if(b<0)throw H.c(P.c8(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.c(P.c8(b,null,null))
if(c>a.length)throw H.c(P.c8(c,null,null))
return a.substring(b,c)},
bF:function(a,b){return this.aE(a,b,null)},
eO:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cs(z,0)===133){x=J.ds(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cK(z,w)===133?J.lt(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kP:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cs(z,0)===133?J.ds(z,1):0}else{y=J.ds(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c4:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.I)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bK:function(a,b,c){var z
if(c>a.length)throw H.c(P.a4(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aT:function(a,b){return this.bK(a,b,0)},
kc:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kb:function(a,b){return this.kc(a,b,null)},
jj:function(a,b,c){if(b==null)H.h(H.S(b))
if(c>a.length)throw H.c(P.a4(c,0,a.length,null,null))
return H.vf(a,b,c)},
a5:function(a,b){return this.jj(a,b,0)},
gU:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
bA:function(a,b){var z
if(typeof b!=="string")throw H.c(H.S(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbu:function(a){return C.a6},
gm:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aG(a,b))
if(b>=a.length||b<0)throw H.c(H.aG(a,b))
return a[b]},
$iscJ:1,
$ascJ:I.b6,
$isq:1,
$isdN:1,
w:{
fa:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
ds:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cs(a,b)
if(y!==32&&y!==13&&!J.fa(y))break;++b}return b},
lt:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cK(a,z)
if(y!==32&&y!==13&&!J.fa(y))break}return b}}}}],["","",,H,{"^":"",
hC:function(a){return a},
ad:function(){return new P.z("No element")},
dr:function(){return new P.z("Too many elements")},
f4:function(){return new P.z("Too few elements")},
cd:function(a,b,c,d){if(c-b<=32)H.fU(a,b,c,d)
else H.fT(a,b,c,d)},
fU:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.I(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a6(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
fT:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bH(c-b+1,6)
y=b+z
x=c-z
w=C.d.bH(b+c,2)
v=w-z
u=w+z
t=J.I(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.a6(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a6(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a6(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a6(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a6(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a6(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a6(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a6(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a6(d.$2(p,o),0)){n=o
o=p
p=n}t.n(a,y,s)
t.n(a,w,q)
t.n(a,x,o)
t.n(a,v,t.j(a,b))
t.n(a,u,t.j(a,c))
m=b+1
l=c-1
if(J.e(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.j(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.t(i,0))continue
if(h.aQ(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.aj(i)
if(h.b7(i,0)){--l
continue}else{g=l-1
if(h.aQ(i,0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.bS(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.a6(d.$2(j,p),0))for(;!0;)if(J.a6(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bS(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}e=!1}h=m-1
t.n(a,b,t.j(a,h))
t.n(a,h,r)
h=l+1
t.n(a,c,t.j(a,h))
t.n(a,h,p)
H.cd(a,b,m-2,d)
H.cd(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bS(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.cd(a,m,l,d)}else H.cd(a,m,l,d)},
X:{"^":"v;$ti"},
aU:{"^":"X;$ti",
gX:function(a){return new H.dB(this,this.gm(this),0,null,[H.y(this,"aU",0)])},
V:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gU:function(a){return this.gm(this)===0},
gB:function(a){if(this.gm(this)===0)throw H.c(H.ad())
return this.as(0,this.gm(this)-1)},
a5:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(J.e(this.as(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bd:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
cQ:function(a,b){var z,y,x,w
z=this.gm(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gm(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c2:function(a,b){return this.dU(0,b)},
aV:function(a,b){return new H.ao(this,b,[H.y(this,"aU",0),null])},
bm:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gm(this))throw H.c(new P.C(this))}return y},
bC:function(a,b){var z,y,x,w
z=[H.y(this,"aU",0)]
if(b){y=H.r([],z)
C.a.sm(y,this.gm(this))}else{x=new Array(this.gm(this))
x.fixed$length=Array
y=H.r(x,z)}for(w=0;w<this.gm(this);++w){z=this.as(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cm:function(a){return this.bC(a,!0)},
bD:function(a){var z,y
z=P.Y(null,null,null,H.y(this,"aU",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.as(0,y))
return z}},
oz:{"^":"aU;a,b,c,$ti",
gii:function(){var z=J.aI(this.a)
return z},
giP:function(){var z,y
z=J.aI(this.a)
y=this.b
if(y>z)return z
return y},
gm:function(a){var z,y
z=J.aI(this.a)
y=this.b
if(y>=z)return 0
return z-y},
as:function(a,b){var z,y
z=this.giP()+b
if(!(b<0)){y=this.gii()
if(typeof y!=="number")return H.w(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cG(b,this,"index",null,null))
return J.eF(this.a,z)},
bC:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.I(y)
w=x.gm(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.r([],u)
C.a.sm(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.r(s,u)}for(r=0;r<v;++r){u=x.as(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gm(y)<w)throw H.c(new P.C(this))}return t},
hW:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.a4(z,0,null,"start",null))},
w:{
h1:function(a,b,c,d){var z=new H.oz(a,b,c,[d])
z.hW(a,b,c,d)
return z}}},
dB:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gm(z)
if(this.b!==y)throw H.c(new P.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.as(0,x);++this.c
return!0}},
dE:{"^":"v;a,b,$ti",
gX:function(a){return new H.lY(null,J.am(this.a),this.b,this.$ti)},
gm:function(a){return J.aI(this.a)},
gU:function(a){return J.eG(this.a)},
gB:function(a){return this.b.$1(J.iE(this.a))},
$asv:function(a,b){return[b]},
w:{
by:function(a,b,c,d){if(!!J.o(a).$isX)return new H.bv(a,b,[c,d])
return new H.dE(a,b,[c,d])}}},
bv:{"^":"dE;a,b,$ti",$isX:1,
$asX:function(a,b){return[b]},
$asv:function(a,b){return[b]}},
lY:{"^":"cI;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascI:function(a,b){return[b]}},
ao:{"^":"aU;a,b,$ti",
gm:function(a){return J.aI(this.a)},
as:function(a,b){return this.b.$1(J.eF(this.a,b))},
$asaU:function(a,b){return[b]},
$asX:function(a,b){return[b]},
$asv:function(a,b){return[b]}},
J:{"^":"v;a,b,$ti",
gX:function(a){return new H.ce(J.am(this.a),this.b,this.$ti)},
aV:function(a,b){return new H.dE(this,b,[H.m(this,0),null])}},
ce:{"^":"cI;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fM:{"^":"v;a,b,$ti",
gX:function(a){return new H.nG(J.am(this.a),this.b,this.$ti)},
w:{
nF:function(a,b,c){if(!!J.o(a).$isX)return new H.kD(a,H.hC(b),[c])
return new H.fM(a,H.hC(b),[c])}}},
kD:{"^":"fM;a,b,$ti",
gm:function(a){var z=J.aI(this.a)-this.b
if(z>=0)return z
return 0},
$isX:1},
nG:{"^":"cI;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gG:function(){return this.a.gG()}},
kE:{"^":"d;$ti",
u:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
cj:function(a,b){var z=a.cM(b)
if(!init.globalState.d.cy)init.globalState.f.bt()
return z},
io:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isL)throw H.c(P.D("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qn(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$f2()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.pX(P.b1(null,H.ch),0)
x=P.t
y.z=new H.P(0,null,null,null,null,null,0,[x,H.ec])
y.ch=new H.P(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qm()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.ll,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qo)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.Y(null,null,null,x)
v=new H.ca(0,null,!1)
u=new H.ec(y,new H.P(0,null,null,null,null,null,0,[x,H.ca]),w,init.createNewIsolate(),v,new H.ba(H.d9()),new H.ba(H.d9()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
w.q(0,0)
u.dV(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cM(new H.uE(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cM(new H.uF(z,a))
else u.cM(a)
init.globalState.f.bt()},
lp:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lq()
return},
lq:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.R("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.R('Cannot extract URI from "'+z+'"'))},
ll:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cZ(!0,[]).bT(b.data)
y=J.I(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.cZ(!0,[]).bT(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.cZ(!0,[]).bT(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.Y(null,null,null,q)
o=new H.ca(0,null,!1)
n=new H.ec(y,new H.P(0,null,null,null,null,null,0,[q,H.ca]),p,init.createNewIsolate(),o,new H.ba(H.d9()),new H.ba(H.d9()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
p.q(0,0)
n.dV(0,o)
init.globalState.f.a.az(new H.ch(n,new H.lm(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bt()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").E(y.j(z,"msg"))
init.globalState.f.bt()
break
case"close":init.globalState.ch.aa(0,$.$get$f3().j(0,a))
a.terminate()
init.globalState.f.bt()
break
case"log":H.lk(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.bn(!0,P.bL(null,P.t)).bg(q)
y.toString
self.postMessage(q)}else P.ew(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lk:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.bn(!0,P.bL(null,P.t)).bg(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.B(w)
y=P.cD(z)
throw H.c(y)}},
ln:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fx=$.fx+("_"+y)
$.fy=$.fy+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.ci(y,x),w,z.r])
x=new H.lo(a,b,c,d,z)
if(e===!0){z.fF(w,w)
init.globalState.f.a.az(new H.ch(z,x,"start isolate"))}else x.$0()},
qS:function(a){return new H.cZ(!0,[]).bT(new H.bn(!1,P.bL(null,P.t)).bg(a))},
uE:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
uF:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qn:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",w:{
qo:function(a){var z=P.ae(["command","print","msg",a])
return new H.bn(!0,P.bL(null,P.t)).bg(z)}}},
ec:{"^":"d;i:a<,b,c,k9:d<,jl:e<,f,r,x,cP:y<,z,Q,ch,cx,cy,db,dx",
fF:function(a,b){if(!this.f.t(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cF()},
kv:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aa(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fD(x)}this.y=!1}this.cF()},
j8:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ks:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.R("removeRange"))
P.c9(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hF:function(a,b){if(!this.r.t(0,a))return
this.db=b},
jJ:function(a,b,c){var z=J.o(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.az(new H.qd(a,c))},
jI:function(a,b){var z
if(!this.r.t(0,a))return
z=J.o(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.eC()
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.az(this.gka())},
jK:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ew(a)
if(b!=null)P.ew(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.ai(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.E(y)},
cM:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.A(u)
v=H.B(u)
this.jK(w,v)
if(this.db===!0){this.eC()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gk9()
if(this.cx!=null)for(;t=this.cx,!t.gU(t);)this.cx.dD().$0()}return y},
ce:function(a){return this.b.j(0,a)},
dV:function(a,b){var z=this.b
if(z.a6(a))throw H.c(P.cD("Registry: ports must be registered only once."))
z.n(0,a,b)},
cF:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eC()},
eC:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b4(0)
for(z=this.b,y=z.gcn(),y=y.gX(y);y.u();)y.gG().ia()
z.b4(0)
this.c.b4(0)
init.globalState.z.aa(0,this.a)
this.dx.b4(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.E(z[v])}this.ch=null}},"$0","gka",0,0,6]},
qd:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
pX:{"^":"d;a,b",
jq:function(){var z=this.a
if(z.b===z.c)return
return z.dD()},
hj:function(){var z,y,x
z=this.jq()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a6(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gU(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cD("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gU(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.bn(!0,new P.hw(0,null,null,null,null,null,0,[null,P.t])).bg(x)
y.toString
self.postMessage(x)}return!1}z.kq()
return!0},
fs:function(){if(self.window!=null)new H.pY(this).$0()
else for(;this.hj(););},
bt:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fs()
else try{this.fs()}catch(x){z=H.A(x)
y=H.B(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bn(!0,P.bL(null,P.t)).bg(v)
w.toString
self.postMessage(v)}}},
pY:{"^":"a:6;a",
$0:function(){if(!this.a.hj())return
P.p0(C.x,this)}},
ch:{"^":"d;a,b,c",
kq:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cM(this.b)}},
qm:{"^":"d;"},
lm:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.ln(this.a,this.b,this.c,this.d,this.e,this.f)}},
lo:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cF()}},
hq:{"^":"d;"},
ci:{"^":"hq;b,a",
E:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfh())return
x=H.qS(a)
if(z.gjl()===y){y=J.I(x)
switch(y.j(x,0)){case"pause":z.fF(y.j(x,1),y.j(x,2))
break
case"resume":z.kv(y.j(x,1))
break
case"add-ondone":z.j8(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.ks(y.j(x,1))
break
case"set-errors-fatal":z.hF(y.j(x,1),y.j(x,2))
break
case"ping":z.jJ(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.jI(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.aa(0,y)
break}return}init.globalState.f.a.az(new H.ch(z,new H.qq(this,x),"receive"))},
t:function(a,b){if(b==null)return!1
return b instanceof H.ci&&J.e(this.b,b.b)},
gv:function(a){return this.b.ge7()}},
qq:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfh())z.i1(this.b)}},
ee:{"^":"hq;b,c,a",
E:function(a){var z,y,x
z=P.ae(["command","message","port",this,"msg",a])
y=new H.bn(!0,P.bL(null,P.t)).bg(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.ee&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eT()
y=this.a
if(typeof y!=="number")return y.eT()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
ca:{"^":"d;e7:a<,b,fh:c<",
ia:function(){this.c=!0
this.b=null},
bk:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aa(0,y)
z.c.aa(0,y)
z.cF()},
i1:function(a){if(this.c)return
this.b.$1(a)},
$ismT:1},
mU:{"^":"ah;a,b",
aC:function(a,b,c,d){var z=this.b
z.toString
return new P.cY(z,[H.m(z,0)]).aC(a,b,c,d)},
eF:function(a,b,c){return this.aC(a,null,b,c)},
bk:[function(){this.a.bk()
this.b.bk()},"$0","gjh",0,0,6],
hU:function(a){var z=new P.qF(null,0,null,null,null,null,this.gjh(),[null])
this.b=z
this.a.b=z.giZ(z)},
$asah:I.b6},
oX:{"^":"d;a,b,c",
gcb:function(){return this.c!=null},
hX:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.az(new H.ch(y,new H.oZ(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d6(new H.p_(this,b),0),a)}else throw H.c(new P.R("Timer greater than 0."))},
w:{
oY:function(a,b){var z=new H.oX(!0,!1,null)
z.hX(a,b)
return z}}},
oZ:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
p_:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ba:{"^":"d;e7:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.kX()
z=C.j.dk(z,0)^C.j.bH(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ba){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bn:{"^":"d;a,b",
bg:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gm(z))
z=J.o(a)
if(!!z.$iscJ)return this.hB(a)
if(!!z.$isli){x=this.ghy()
z=a.gcc()
z=H.by(z,x,H.y(z,"v",0),null)
z=P.Q(z,!0,H.y(z,"v",0))
w=a.gcn()
w=H.by(w,x,H.y(w,"v",0),null)
return["map",z,P.Q(w,!0,H.y(w,"v",0))]}if(!!z.$isf9)return this.hC(a)
if(!!z.$isaS)this.hm(a)
if(!!z.$ismT)this.d_(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isci)return this.hD(a)
if(!!z.$isee)return this.hE(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d_(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isba)return["capability",a.a]
if(!(a instanceof P.d))this.hm(a)
return["dart",init.classIdExtractor(a),this.hA(init.classFieldsExtractor(a))]},"$1","ghy",2,0,0],
d_:function(a,b){throw H.c(new P.R((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hm:function(a){return this.d_(a,null)},
hB:function(a){var z=this.hz(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d_(a,"Can't serialize indexable: ")},
hz:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.bg(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hA:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bg(a[z]))
return a},
hC:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d_(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.bg(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hE:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hD:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ge7()]
return["raw sendport",a]}},
cZ:{"^":"d;a,b",
bT:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.D("Bad serialized message: "+H.b(a)))
switch(C.a.gev(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cL(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.r(this.cL(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cL(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cL(x),[null])
y.fixed$length=Array
return y
case"map":return this.jt(a)
case"sendport":return this.ju(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.js(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.ba(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cL(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjr",2,0,0],
cL:function(a){var z,y,x
z=J.I(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.n(a,y,this.bT(z.j(a,y)));++y}return a},
jt:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aB()
this.b.push(w)
y=J.eH(y,this.gjr()).cm(0)
for(z=J.I(y),v=J.I(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.bT(v.j(x,u)))}return w},
ju:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.e(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.ce(w)
if(u==null)return
t=new H.ci(u,x)}else t=new H.ee(y,w,x)
this.b.push(t)
return t},
js:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.I(y)
v=J.I(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.j(y,u)]=this.bT(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
jJ:function(){throw H.c(new P.R("Cannot modify unmodifiable Map"))},
tM:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.i(a)
if(typeof z!=="string")throw H.c(H.S(a))
return z},
aC:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bB:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.K||!!J.o(a).$isbl){v=C.N(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cs(w,0)===36)w=C.b.bF(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d8(H.cn(a),0,null),init.mangledGlobalNames)},
cN:function(a){return"Instance of '"+H.bB(a)+"'"},
ap:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.dk(z,10))>>>0,56320|z&1023)}throw H.c(P.a4(a,0,1114111,null,null))},
bf:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mL:function(a){var z=H.bf(a).getFullYear()+0
return z},
mJ:function(a){var z=H.bf(a).getMonth()+1
return z},
mF:function(a){var z=H.bf(a).getDate()+0
return z},
mG:function(a){var z=H.bf(a).getHours()+0
return z},
mI:function(a){var z=H.bf(a).getMinutes()+0
return z},
mK:function(a){var z=H.bf(a).getSeconds()+0
return z},
mH:function(a){var z=H.bf(a).getMilliseconds()+0
return z},
dQ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
return a[b]},
fz:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
a[b]=c},
w:function(a){throw H.c(H.S(a))},
f:function(a,b){if(a==null)J.aI(a)
throw H.c(H.aG(a,b))},
aG:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aY(!0,b,"index",null)
z=J.aI(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.cG(b,a,"index",null,z)
return P.c8(b,"index",null)},
S:function(a){return new P.aY(!0,a,null,null)},
d4:function(a){if(typeof a!=="number")throw H.c(H.S(a))
return a},
rc:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.S(a))
return a},
br:function(a){if(typeof a!=="string")throw H.c(H.S(a))
return a},
c:function(a){var z
if(a==null)a=new P.cL()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iv})
z.name=""}else z.toString=H.iv
return z},
iv:function(){return J.i(this.dartException)},
h:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.C(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.vm(a)
if(a==null)return
if(a instanceof H.dm)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.dk(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dv(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fo(v,null))}}if(a instanceof TypeError){u=$.$get$h9()
t=$.$get$ha()
s=$.$get$hb()
r=$.$get$hc()
q=$.$get$hg()
p=$.$get$hh()
o=$.$get$he()
$.$get$hd()
n=$.$get$hj()
m=$.$get$hi()
l=u.bo(y)
if(l!=null)return z.$1(H.dv(y,l))
else{l=t.bo(y)
if(l!=null){l.method="call"
return z.$1(H.dv(y,l))}else{l=s.bo(y)
if(l==null){l=r.bo(y)
if(l==null){l=q.bo(y)
if(l==null){l=p.bo(y)
if(l==null){l=o.bo(y)
if(l==null){l=r.bo(y)
if(l==null){l=n.bo(y)
if(l==null){l=m.bo(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fo(y,l==null?null:l.method))}}return z.$1(new H.p4(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fV()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aY(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fV()
return a},
B:function(a){var z
if(a instanceof H.dm)return a.b
if(a==null)return new H.hz(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hz(a,null)},
u2:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aC(a)},
tx:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
tR:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cj(b,new H.tS(a))
case 1:return H.cj(b,new H.tT(a,d))
case 2:return H.cj(b,new H.tU(a,d,e))
case 3:return H.cj(b,new H.tV(a,d,e,f))
case 4:return H.cj(b,new H.tW(a,d,e,f,g))}throw H.c(P.cD("Unsupported number of arguments for wrapped closure"))},
d6:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.tR)
a.$identity=z
return z},
jF:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isL){z.$reflectionInfo=c
x=H.mW(z).r}else x=c
w=d?Object.create(new H.o5().constructor.prototype):Object.create(new H.dd(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aJ
$.aJ=J.al(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eT(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.tM,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eO:H.de
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eT(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jC:function(a,b,c,d){var z=H.de
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eT:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jE(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jC(y,!w,z,b)
if(y===0){w=$.aJ
$.aJ=J.al(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bu
if(v==null){v=H.cx("self")
$.bu=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aJ
$.aJ=J.al(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bu
if(v==null){v=H.cx("self")
$.bu=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jD:function(a,b,c,d){var z,y
z=H.de
y=H.eO
switch(b?-1:a){case 0:throw H.c(new H.n6("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jE:function(a,b){var z,y,x,w,v,u,t,s
z=H.jt()
y=$.eN
if(y==null){y=H.cx("receiver")
$.eN=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jD(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aJ
$.aJ=J.al(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aJ
$.aJ=J.al(u,1)
return new Function(y+H.b(u)+"}")()},
en:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jF(a,b,z,!!d,e,f)},
il:function(a,b){var z=J.I(b)
throw H.c(H.cz(H.bB(a),z.aE(b,3,z.gm(b))))},
T:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.il(a,b)},
u_:function(a,b){if(!!J.o(a).$isL||a==null)return a
if(J.o(a)[b])return a
H.il(a,b)},
eq:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.eq(a)
return z==null?!1:H.eu(z,b)},
i0:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.W(b,null)
y=H.eq(a)
throw H.c(H.cz(y!=null?H.W(y,null):H.bB(a),z))},
vk:function(a){throw H.c(new P.jW(a))},
d9:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b5:function(a){return new H.av(a,null)},
r:function(a,b){a.$ti=b
return a},
cn:function(a){if(a==null)return
return a.$ti},
i5:function(a,b){return H.eD(a["$as"+H.b(b)],H.cn(a))},
y:function(a,b,c){var z=H.i5(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cn(a)
return z==null?null:z[b]},
W:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d8(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.W(z,b)
return H.qX(a,b)}return"unknown-reified-type"},
qX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.W(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.W(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.W(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tw(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.W(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d8:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bI("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.A=v+", "
u=a[y]
if(u!=null)w=!1
v=z.A+=H.W(u,c)}return w?"":"<"+z.k(0)+">"},
i6:function(a){var z,y
if(a instanceof H.a){z=H.eq(a)
if(z!=null)return H.W(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.d8(a.$ti,0,null)},
eD:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aO:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cn(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hR(H.eD(y[d],z),c)},
aH:function(a,b,c,d){if(a==null)return a
if(H.aO(a,b,c,d))return a
throw H.c(H.cz(H.bB(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d8(c,0,null),init.mangledGlobalNames)))},
hR:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ak(a[y],b[y]))return!1
return!0},
b4:function(a,b,c){return a.apply(b,H.i5(b,c))},
d5:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cn(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eu(x.apply(a,null),b)}return H.ak(y,b)},
is:function(a,b){if(a!=null&&!H.d5(a,b))throw H.c(H.cz(H.bB(a),H.W(b,null)))
return a},
ak:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.eu(a,b)
if('func' in a)return b.builtin$cls==="bw"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.W(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hR(H.eD(u,z),x)},
hQ:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.ak(z,v)||H.ak(v,z)))return!1}return!0},
r6:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.ak(v,u)||H.ak(u,v)))return!1}return!0},
eu:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.ak(z,y)||H.ak(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hQ(x,w,!1))return!1
if(!H.hQ(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ak(o,n)||H.ak(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ak(o,n)||H.ak(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ak(o,n)||H.ak(n,o)))return!1}}return H.r6(a.named,b.named)},
vf:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdt){z=C.b.bF(a,c)
return b.b.test(z)}else{z=z.eo(b,C.b.bF(a,c))
return!z.gU(z)}}},
vh:function(a,b,c,d){var z,y,x
z=b.fb(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eC(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.br(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
w0:[function(a){return a},"$1","hD",2,0,24],
vg:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdN)throw H.c(P.cu(b,"pattern","is not a Pattern"))
for(z=z.eo(b,a),z=new H.ho(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hD().$1(C.b.aE(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hD().$1(C.b.bF(a,y)))
return z.charCodeAt(0)==0?z:z},
ir:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eC(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdt)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.vh(a,b,c,d)
if(b==null)H.h(H.S(b))
y=y.dm(b,a,d)
x=y.gX(y)
if(!x.u())return a
w=x.gG()
y=w.geX()
v=w.gfP()
H.br(c)
u=P.c9(y,v,a.length,null,null,null)
H.rc(u)
return H.eC(a,y,u,c)},
eC:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jI:{"^":"d;$ti",
gU:function(a){return this.gm(this)===0},
gaq:function(a){return this.gm(this)!==0},
k:function(a){return P.dF(this)},
n:function(a,b,c){return H.jJ()},
$isG:1},
jK:{"^":"jI;a,b,c,$ti",
gm:function(a){return this.a},
a6:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.a6(b))return
return this.fc(b)},
fc:function(a){return this.b[a]},
V:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fc(w))}}},
mV:{"^":"d;a,b,c,d,e,f,r,x",w:{
mW:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.mV(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
p1:{"^":"d;a,b,c,d,e,f",
bo:function(a){var z,y,x
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
w:{
aK:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.p1(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cX:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hf:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fo:{"^":"a3;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lv:{"^":"a3;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
w:{
dv:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lv(a,y,z?null:b.receiver)}}},
p4:{"^":"a3;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dm:{"^":"d;a,bh:b<"},
vm:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa3)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hz:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
tS:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
tT:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
tU:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
tV:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
tW:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bB(this).trim()+"'"},
ghu:function(){return this},
$isbw:1,
ghu:function(){return this}},
h5:{"^":"a;"},
o5:{"^":"h5;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dd:{"^":"h5;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dd))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.aC(this.a)
else y=typeof z!=="object"?J.j(z):H.aC(z)
z=H.aC(this.b)
if(typeof y!=="number")return y.kY()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cN(z)},
w:{
de:function(a){return a.a},
eO:function(a){return a.c},
jt:function(){var z=$.bu
if(z==null){z=H.cx("self")
$.bu=z}return z},
cx:function(a){var z,y,x,w,v
z=new H.dd("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jy:{"^":"a3;a",
k:function(a){return this.a},
w:{
cz:function(a,b){return new H.jy("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
n6:{"^":"a3;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
av:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gv:function(a){return J.j(this.a)},
t:function(a,b){if(b==null)return!1
return b instanceof H.av&&J.e(this.a,b.a)}},
P:{"^":"d;a,b,c,d,e,f,r,$ti",
gm:function(a){return this.a},
gU:function(a){return this.a===0},
gaq:function(a){return!this.gU(this)},
gcc:function(){return new H.lM(this,[H.m(this,0)])},
gcn:function(){return H.by(this.gcc(),new H.lu(this),H.m(this,0),H.m(this,1))},
a6:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.f7(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.f7(y,a)}else return this.jV(a)},
jV:function(a){var z=this.d
if(z==null)return!1
return this.cO(this.dg(z,this.cN(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cv(z,b)
return y==null?null:y.gbV()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cv(x,b)
return y==null?null:y.gbV()}else return this.jW(b)},
jW:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dg(z,this.cN(a))
x=this.cO(y,a)
if(x<0)return
return y[x].gbV()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.e9()
this.b=z}this.f1(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.e9()
this.c=y}this.f1(y,b,c)}else this.jY(b,c)},
jY:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.e9()
this.d=z}y=this.cN(a)
x=this.dg(z,y)
if(x==null)this.ek(z,y,[this.ea(a,b)])
else{w=this.cO(x,a)
if(w>=0)x[w].sbV(b)
else x.push(this.ea(a,b))}},
kr:function(a,b){var z
if(this.a6(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
aa:function(a,b){if(typeof b==="string")return this.fq(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fq(this.c,b)
else return this.jX(b)},
jX:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dg(z,this.cN(a))
x=this.cO(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fu(w)
return w.gbV()},
b4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.C(this))
z=z.c}},
f1:function(a,b,c){var z=this.cv(a,b)
if(z==null)this.ek(a,b,this.ea(b,c))
else z.sbV(c)},
fq:function(a,b){var z
if(a==null)return
z=this.cv(a,b)
if(z==null)return
this.fu(z)
this.f8(a,b)
return z.gbV()},
ea:function(a,b){var z,y
z=new H.lL(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fu:function(a){var z,y
z=a.giE()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cN:function(a){return J.j(a)&0x3ffffff},
cO:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfW(),b))return y
return-1},
k:function(a){return P.dF(this)},
cv:function(a,b){return a[b]},
dg:function(a,b){return a[b]},
ek:function(a,b,c){a[b]=c},
f8:function(a,b){delete a[b]},
f7:function(a,b){return this.cv(a,b)!=null},
e9:function(){var z=Object.create(null)
this.ek(z,"<non-identifier-key>",z)
this.f8(z,"<non-identifier-key>")
return z},
$isli:1,
$isG:1,
w:{
fc:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])}}},
lu:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
lL:{"^":"d;fW:a<,bV:b@,c,iE:d<,$ti"},
lM:{"^":"X;a,$ti",
gm:function(a){return this.a.a},
gU:function(a){return this.a.a===0},
gX:function(a){var z,y
z=this.a
y=new H.lN(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a5:function(a,b){return this.a.a6(b)},
V:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.C(z))
y=y.c}}},
lN:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dt:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giA:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.du(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giz:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.du(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dm:function(a,b,c){if(c>b.length)throw H.c(P.a4(c,0,b.length,null,null))
return new H.pD(this,b,c)},
eo:function(a,b){return this.dm(a,b,0)},
fb:function(a,b){var z,y
z=this.giA()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hy(this,y)},
ij:function(a,b){var z,y
z=this.giz()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hy(this,y)},
h_:function(a,b,c){if(c>b.length)throw H.c(P.a4(c,0,b.length,null,null))
return this.ij(b,c)},
$isdN:1,
w:{
du:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f1("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hy:{"^":"d;a,b",
geX:function(){return this.b.index},
gfP:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbe:1},
pD:{"^":"c1;a,b,c",
gX:function(a){return new H.ho(this.a,this.b,this.c,null)},
$asc1:function(){return[P.be]},
$asv:function(){return[P.be]}},
ho:{"^":"d;a,b,c,d",
gG:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fb(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
h0:{"^":"d;eX:a<,b,c",
gfP:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.h(P.c8(b,null,null))
return this.c},
$isbe:1},
qB:{"^":"v;a,b,c",
gX:function(a){return new H.qC(this.a,this.b,this.c,null)},
$asv:function(){return[P.be]}},
qC:{"^":"d;a,b,c,d",
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
this.d=new H.h0(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
tw:function(a){var z=H.r(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
u9:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pE:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.r7()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d6(new P.pG(z),1)).observe(y,{childList:true})
return new P.pF(z,y,x)}else if(self.setImmediate!=null)return P.r8()
return P.r9()},
vV:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d6(new P.pH(a),0))},"$1","r7",2,0,14],
vW:[function(a){++init.globalState.f.b
self.setImmediate(H.d6(new P.pI(a),0))},"$1","r8",2,0,14],
vX:[function(a){P.e2(C.x,a)},"$1","r9",2,0,14],
aF:function(a,b){P.ef(null,a)
return b.gfT()},
aw:function(a,b){P.ef(a,b)},
aE:function(a,b){b.bS(a)},
aD:function(a,b){b.er(H.A(a),H.B(a))},
ef:function(a,b){var z,y,x,w
z=new P.qM(b)
y=new P.qN(b)
x=J.o(a)
if(!!x.$isF)a.el(z,y)
else if(!!x.$isO)a.eM(z,y)
else{w=new P.F(0,$.p,null,[null])
w.a=4
w.c=a
w.el(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.r5(z)},
d1:function(a,b,c){var z,y,x
if(b===0){if(c.gey())c.c.eq()
else c.a.bk()
return}else if(b===1){if(c.gey())c.c.er(H.A(a),H.B(a))
else{z=H.A(a)
y=H.B(a)
c.a.en(z,y)
c.a.bk()}return}if(a instanceof P.bJ){if(c.gey()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aR(c.a,z)
P.cp(new P.qK(b,c))
return}else if(z===1){x=a.a
c.a.jc(x,!1).c_(new P.qL(b,c))
return}}P.ef(a,b)},
r4:function(a){return a.gdS()},
ek:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aA:function(a){return new P.qD(new P.F(0,$.p,null,[a]),[a])},
qV:function(a,b,c){$.p.toString
a.ba(b,c)},
qZ:function(){var z,y
for(;z=$.bo,z!=null;){$.bN=null
y=z.gcf()
$.bo=y
if(y==null)$.bM=null
z.gje().$0()}},
w_:[function(){$.eg=!0
try{P.qZ()}finally{$.bN=null
$.eg=!1
if($.bo!=null)$.$get$e6().$1(P.hS())}},"$0","hS",0,0,6],
hM:function(a){var z=new P.hp(a,null)
if($.bo==null){$.bM=z
$.bo=z
if(!$.eg)$.$get$e6().$1(P.hS())}else{$.bM.b=z
$.bM=z}},
r3:function(a){var z,y,x
z=$.bo
if(z==null){P.hM(a)
$.bN=$.bM
return}y=new P.hp(a,null)
x=$.bN
if(x==null){y.b=z
$.bN=y
$.bo=y}else{y.b=x.b
x.b=y
$.bN=y
if(y.b==null)$.bM=y}},
cp:function(a){var z=$.p
if(C.h===z){P.bq(null,null,C.h,a)
return}z.toString
P.bq(null,null,z,z.ep(a,!0))},
vS:function(a,b){return new P.qA(null,a,!1,[b])},
el:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.A(x)
y=H.B(x)
w=$.p
w.toString
P.bp(null,null,w,z,y)}},
r_:[function(a,b){var z=$.p
z.toString
P.bp(null,null,z,a,b)},function(a){return P.r_(a,null)},"$2","$1","rb",2,2,16,0],
vZ:[function(){},"$0","ra",0,0,6],
hL:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.A(u)
y=H.B(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbl()
w=t
v=x.gbh()
c.$2(w,v)}}},
qO:function(a,b,c,d){var z=a.ca()
if(!!J.o(z).$isO&&z!==$.$get$bc())z.c1(new P.qQ(b,c,d))
else b.ba(c,d)},
hA:function(a,b){return new P.qP(a,b)},
hB:function(a,b,c){var z=a.ca()
if(!!J.o(z).$isO&&z!==$.$get$bc())z.c1(new P.qR(b,c))
else b.b9(c)},
qJ:function(a,b,c){$.p.toString
a.c7(b,c)},
p0:function(a,b){var z=$.p
if(z===C.h){z.toString
return P.e2(a,b)}return P.e2(a,z.ep(b,!0))},
e2:function(a,b){var z=C.d.bH(a.a,1000)
return H.oY(z<0?0:z,b)},
pe:function(){return $.p},
bp:function(a,b,c,d,e){var z={}
z.a=d
P.r3(new P.r1(z,e))},
hI:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hK:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hJ:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bq:function(a,b,c,d){var z=C.h!==c
if(z)d=c.ep(d,!(!z||!1))
P.hM(d)},
pG:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pF:{"^":"a:41;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pH:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pI:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qM:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qN:{"^":"a:20;a",
$2:function(a,b){this.a.$2(1,new H.dm(a,b))}},
r5:{"^":"a:50;a",
$2:function(a,b){this.a(a,b)}},
qK:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcP()){z.b=!0
return}this.a.$2(null,0)}},
qL:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pJ:{"^":"d;a,b,c",
gdS:function(){return this.a.gdS()},
gcP:function(){return this.a.gcP()},
gey:function(){return this.c!=null},
q:function(a,b){return J.aR(this.a,b)},
en:function(a,b){return this.a.en(a,b)},
bk:function(){return this.a.bk()},
hZ:function(a){var z=new P.pM(a)
this.a=new P.pR(null,0,null,new P.pO(z),null,new P.pP(this,z),new P.pQ(this,a),[null])},
w:{
pK:function(a){var z=new P.pJ(null,!1,null)
z.hZ(a)
return z}}},
pM:{"^":"a:1;a",
$0:function(){P.cp(new P.pN(this.a))}},
pN:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pO:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pP:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
pQ:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gk6()){z.c=new P.cf(new P.F(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cp(new P.pL(this.b))}return z.c.gfT()}}},
pL:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bJ:{"^":"d;ae:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
w:{
bK:function(a){return new P.bJ(a,1)},
aL:function(){return C.ab},
hu:function(a){return new P.bJ(a,0)},
aM:function(a){return new P.bJ(a,3)}}},
b3:{"^":"d;a,b,c,d",
gG:function(){var z=this.c
return z==null?this.b:z.gG()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bJ){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.am(z)
if(!!w.$isb3){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qE:{"^":"c1;a",
gX:function(a){return new P.b3(this.a(),null,null,null)},
$asc1:I.b6,
$asv:I.b6,
w:{
aN:function(a){return new P.qE(a)}}},
O:{"^":"d;$ti"},
hr:{"^":"d;fT:a<,$ti",
er:function(a,b){if(a==null)a=new P.cL()
if(this.a.a!==0)throw H.c(new P.z("Future already completed"))
$.p.toString
this.ba(a,b)},
dr:function(a){return this.er(a,null)}},
cf:{"^":"hr;a,$ti",
bS:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.z("Future already completed"))
z.by(a)},
eq:function(){return this.bS(null)},
ba:function(a,b){this.a.f3(a,b)}},
qD:{"^":"hr;a,$ti",
bS:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.z("Future already completed"))
z.b9(a)},
eq:function(){return this.bS(null)},
ba:function(a,b){this.a.ba(a,b)}},
eb:{"^":"d;ec:a<,b,c,d,e,$ti",
giV:function(){return this.b.b},
gfV:function(){return(this.c&1)!==0},
gjN:function(){return(this.c&2)!==0},
gfU:function(){return this.c===8},
jL:function(a){return this.b.b.eL(this.d,a)},
kg:function(a){if(this.c!==6)return!0
return this.b.b.eL(this.d,a.gbl())},
jH:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.kF(z,a.gbl(),a.gbh())
else return y.eL(z,a.gbl())},
jM:function(){return this.b.b.hh(this.d)}},
F:{"^":"d;cD:a<,b,iJ:c<,$ti",
giu:function(){return this.a===2},
ge8:function(){return this.a>=4},
eM:function(a,b){var z=$.p
if(z!==C.h){z.toString
if(b!=null)b=P.ek(b,z)}return this.el(a,b)},
c_:function(a){return this.eM(a,null)},
el:function(a,b){var z,y
z=new P.F(0,$.p,null,[null])
y=b==null?1:3
this.da(new P.eb(null,z,y,a,b,[H.m(this,0),null]))
return z},
c1:function(a){var z,y
z=$.p
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.da(new P.eb(null,y,8,a,null,[z,z]))
return y},
da:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ge8()){y.da(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bq(null,null,z,new P.q0(this,a))}},
fm:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gec()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ge8()){v.fm(a)
return}this.a=v.a
this.c=v.c}z.a=this.di(a)
y=this.b
y.toString
P.bq(null,null,y,new P.q7(z,this))}},
dh:function(){var z=this.c
this.c=null
return this.di(z)},
di:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gec()
z.a=y}return y},
b9:function(a){var z,y
z=this.$ti
if(H.aO(a,"$isO",z,"$asO"))if(H.aO(a,"$isF",z,null))P.d_(a,this)
else P.ht(a,this)
else{y=this.dh()
this.a=4
this.c=a
P.bm(this,y)}},
ba:[function(a,b){var z=this.dh()
this.a=8
this.c=new P.cv(a,b)
P.bm(this,z)},function(a){return this.ba(a,null)},"kZ","$2","$1","gbO",2,2,16,0],
by:function(a){var z
if(H.aO(a,"$isO",this.$ti,"$asO")){this.i7(a)
return}this.a=1
z=this.b
z.toString
P.bq(null,null,z,new P.q2(this,a))},
i7:function(a){var z
if(H.aO(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bq(null,null,z,new P.q6(this,a))}else P.d_(a,this)
return}P.ht(a,this)},
f3:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bq(null,null,z,new P.q1(this,a,b))},
i0:function(a,b){this.a=4
this.c=a},
$isO:1,
w:{
ht:function(a,b){var z,y,x
b.a=1
try{a.eM(new P.q3(b),new P.q4(b))}catch(x){z=H.A(x)
y=H.B(x)
P.cp(new P.q5(b,z,y))}},
d_:function(a,b){var z,y,x
for(;a.giu();)a=a.c
z=a.ge8()
y=b.c
if(z){b.c=null
x=b.di(y)
b.a=a.a
b.c=a.c
P.bm(b,x)}else{b.a=2
b.c=a
a.fm(y)}},
bm:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbl()
t=v.gbh()
y.toString
P.bp(null,null,y,u,t)}return}for(;b.gec()!=null;b=s){s=b.a
b.a=null
P.bm(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfV()||b.gfU()){q=b.giV()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbl()
t=v.gbh()
y.toString
P.bp(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfU())new P.qa(z,x,w,b).$0()
else if(y){if(b.gfV())new P.q9(x,b,r).$0()}else if(b.gjN())new P.q8(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.o(y).$isO){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.di(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d_(y,o)
return}}o=b.b
b=o.dh()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
q0:{"^":"a:1;a,b",
$0:function(){P.bm(this.a,this.b)}},
q7:{"^":"a:1;a,b",
$0:function(){P.bm(this.b,this.a.a)}},
q3:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b9(a)}},
q4:{"^":"a:49;a",
$2:function(a,b){this.a.ba(a,b)},
$1:function(a){return this.$2(a,null)}},
q5:{"^":"a:1;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
q2:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.dh()
z.a=4
z.c=this.b
P.bm(z,y)}},
q6:{"^":"a:1;a,b",
$0:function(){P.d_(this.b,this.a)}},
q1:{"^":"a:1;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
qa:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jM()}catch(w){y=H.A(w)
x=H.B(w)
if(this.c){v=this.a.a.c.gbl()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cv(y,x)
u.a=!0
return}if(!!J.o(z).$isO){if(z instanceof P.F&&z.gcD()>=4){if(z.gcD()===8){v=this.b
v.b=z.giJ()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c_(new P.qb(t))
v.a=!1}}},
qb:{"^":"a:0;a",
$1:function(a){return this.a}},
q9:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jL(this.c)}catch(x){z=H.A(x)
y=H.B(x)
w=this.a
w.b=new P.cv(z,y)
w.a=!0}}},
q8:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kg(z)===!0&&w.e!=null){v=this.b
v.b=w.jH(z)
v.a=!1}}catch(u){y=H.A(u)
x=H.B(u)
w=this.a
v=w.a.c.gbl()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cv(y,x)
s.a=!0}}},
hp:{"^":"d;je:a<,cf:b@"},
ah:{"^":"d;$ti",
aV:function(a,b){return new P.qp(b,this,[H.y(this,"ah",0),null])},
a5:function(a,b){var z,y
z={}
y=new P.F(0,$.p,null,[P.a1])
z.a=null
z.a=this.aC(new P.og(z,this,b,y),!0,new P.oh(y),y.gbO())
return y},
V:function(a,b){var z,y
z={}
y=new P.F(0,$.p,null,[null])
z.a=null
z.a=this.aC(new P.ok(z,this,b,y),!0,new P.ol(y),y.gbO())
return y},
gm:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[P.t])
z.a=0
this.aC(new P.oq(z),!0,new P.or(z,y),y.gbO())
return y},
gU:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[P.a1])
z.a=null
z.a=this.aC(new P.om(z,y),!0,new P.on(y),y.gbO())
return y},
cm:function(a){var z,y,x
z=H.y(this,"ah",0)
y=H.r([],[z])
x=new P.F(0,$.p,null,[[P.L,z]])
this.aC(new P.os(this,y),!0,new P.ot(y,x),x.gbO())
return x},
bD:function(a){var z,y,x
z=H.y(this,"ah",0)
y=P.Y(null,null,null,z)
x=new P.F(0,$.p,null,[[P.bD,z]])
this.aC(new P.ou(this,y),!0,new P.ov(y,x),x.gbO())
return x},
gB:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[H.y(this,"ah",0)])
z.a=null
z.b=!1
this.aC(new P.oo(z,this),!0,new P.op(z,y),y.gbO())
return y}},
og:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hL(new P.oe(this.c,a),new P.of(z,y),P.hA(z.a,y))},
$S:function(){return H.b4(function(a){return{func:1,args:[a]}},this.b,"ah")}},
oe:{"^":"a:1;a,b",
$0:function(){return J.e(this.b,this.a)}},
of:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hB(this.a.a,this.b,!0)}},
oh:{"^":"a:1;a",
$0:function(){this.a.b9(!1)}},
ok:{"^":"a;a,b,c,d",
$1:function(a){P.hL(new P.oi(this.c,a),new P.oj(),P.hA(this.a.a,this.d))},
$S:function(){return H.b4(function(a){return{func:1,args:[a]}},this.b,"ah")}},
oi:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
oj:{"^":"a:0;",
$1:function(a){}},
ol:{"^":"a:1;a",
$0:function(){this.a.b9(null)}},
oq:{"^":"a:0;a",
$1:function(a){++this.a.a}},
or:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a.a)}},
om:{"^":"a:0;a,b",
$1:function(a){P.hB(this.a.a,this.b,!1)}},
on:{"^":"a:1;a",
$0:function(){this.a.b9(!0)}},
os:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b4(function(a){return{func:1,args:[a]}},this.a,"ah")}},
ot:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a)}},
ou:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b4(function(a){return{func:1,args:[a]}},this.a,"ah")}},
ov:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a)}},
oo:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b4(function(a){return{func:1,args:[a]}},this.b,"ah")}},
op:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b9(x.a)
return}try{x=H.ad()
throw H.c(x)}catch(w){z=H.A(w)
y=H.B(w)
P.qV(this.b,z,y)}}},
d0:{"^":"d;cD:b<,$ti",
gdS:function(){return new P.cY(this,this.$ti)},
gk6:function(){return(this.b&4)!==0},
gcP:function(){var z=this.b
return(z&1)!==0?this.gbG().gfi():(z&2)===0},
giC:function(){if((this.b&8)===0)return this.a
return this.a.gd1()},
e1:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ed(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd1()==null)y.c=new P.ed(null,null,0,this.$ti)
return y.c},
gbG:function(){if((this.b&8)!==0)return this.a.gd1()
return this.a},
cr:function(){if((this.b&4)!==0)return new P.z("Cannot add event after closing")
return new P.z("Cannot add event while adding a stream")},
jc:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cr())
if((z&2)!==0){z=new P.F(0,$.p,null,[null])
z.by(null)
return z}z=this.a
y=new P.F(0,$.p,null,[null])
x=a.aC(this.gi5(),!1,this.gi6(),this.gi2())
w=this.b
if((w&1)!==0?this.gbG().gfi():(w&2)===0)x.cT()
this.a=new P.qw(z,y,x,this.$ti)
this.b|=8
return y},
fa:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bc():new P.F(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cr())
this.bN(b)},"$1","giZ",2,0,function(){return H.b4(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d0")}],
en:function(a,b){if(this.b>=4)throw H.c(this.cr())
if(a==null)a=new P.cL()
$.p.toString
this.c7(a,b)},
bk:function(){var z=this.b
if((z&4)!==0)return this.fa()
if(z>=4)throw H.c(this.cr())
z|=4
this.b=z
if((z&1)!==0)this.cB()
else if((z&3)===0)this.e1().q(0,C.v)
return this.fa()},
bN:[function(a){var z=this.b
if((z&1)!==0)this.cA(a)
else if((z&3)===0)this.e1().q(0,new P.e7(a,null,this.$ti))},"$1","gi5",2,0,function(){return H.b4(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d0")}],
c7:[function(a,b){var z=this.b
if((z&1)!==0)this.cC(a,b)
else if((z&3)===0)this.e1().q(0,new P.e8(a,b,null))},"$2","gi2",4,0,46],
dW:[function(){var z=this.a
this.a=z.gd1()
this.b&=4294967287
z.a.by(null)},"$0","gi6",0,0,6],
iQ:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.z("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.pV(this,null,null,null,z,y,null,null,this.$ti)
x.f0(a,b,c,d,H.m(this,0))
w=this.giC()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd1(x)
v.b.cX()}else this.a=x
x.iO(w)
x.e6(new P.qy(this))
return x},
iG:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ca()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.A(v)
x=H.B(v)
u=new P.F(0,$.p,null,[null])
u.f3(y,x)
z=u}else z=z.c1(w)
w=new P.qx(this)
if(z!=null)z=z.c1(w)
else w.$0()
return z}},
qy:{"^":"a:1;a",
$0:function(){P.el(this.a.d)}},
qx:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.by(null)}},
qG:{"^":"d;$ti",
cA:function(a){this.gbG().bN(a)},
cC:function(a,b){this.gbG().c7(a,b)},
cB:function(){this.gbG().dW()}},
pS:{"^":"d;$ti",
cA:function(a){this.gbG().c8(new P.e7(a,null,[H.m(this,0)]))},
cC:function(a,b){this.gbG().c8(new P.e8(a,b,null))},
cB:function(){this.gbG().c8(C.v)}},
pR:{"^":"d0+pS;a,b,c,d,e,f,r,$ti"},
qF:{"^":"d0+qG;a,b,c,d,e,f,r,$ti"},
cY:{"^":"qz;a,$ti",
gv:function(a){return(H.aC(this.a)^892482866)>>>0},
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cY))return!1
return b.a===this.a}},
pV:{"^":"cg;x,a,b,c,d,e,f,r,$ti",
ed:function(){return this.x.iG(this)},
ef:[function(){var z=this.x
if((z.b&8)!==0)z.a.cT()
P.el(z.e)},"$0","gee",0,0,6],
eh:[function(){var z=this.x
if((z.b&8)!==0)z.a.cX()
P.el(z.f)},"$0","geg",0,0,6]},
pB:{"^":"d;$ti",
cT:function(){this.b.cT()},
cX:function(){this.b.cX()},
ca:function(){var z=this.b.ca()
if(z==null){this.a.by(null)
return}return z.c1(new P.pC(this))},
eq:function(){this.a.by(null)}},
pC:{"^":"a:1;a",
$0:function(){this.a.a.by(null)}},
qw:{"^":"pB;d1:c@,a,b,$ti"},
cg:{"^":"d;cD:e<,$ti",
iO:function(a){if(a==null)return
this.r=a
if(!a.gU(a)){this.e=(this.e|64)>>>0
this.r.d4(this)}},
km:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fH()
if((z&4)===0&&(this.e&32)===0)this.e6(this.gee())},
cT:function(){return this.km(null)},
cX:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gU(z)}else z=!1
if(z)this.r.d4(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e6(this.geg())}}}},
ca:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dX()
z=this.f
return z==null?$.$get$bc():z},
gfi:function(){return(this.e&4)!==0},
gcP:function(){return this.e>=128},
dX:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fH()
if((this.e&32)===0)this.r=null
this.f=this.ed()},
bN:["hO",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cA(a)
else this.c8(new P.e7(a,null,[H.y(this,"cg",0)]))}],
c7:["hP",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cC(a,b)
else this.c8(new P.e8(a,b,null))}],
dW:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cB()
else this.c8(C.v)},
ef:[function(){},"$0","gee",0,0,6],
eh:[function(){},"$0","geg",0,0,6],
ed:function(){return},
c8:function(a){var z,y
z=this.r
if(z==null){z=new P.ed(null,null,0,[H.y(this,"cg",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d4(this)}},
cA:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hk(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dZ((z&4)!==0)},
cC:function(a,b){var z,y
z=this.e
y=new P.pU(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dX()
z=this.f
if(!!J.o(z).$isO&&z!==$.$get$bc())z.c1(y)
else y.$0()}else{y.$0()
this.dZ((z&4)!==0)}},
cB:function(){var z,y
z=new P.pT(this)
this.dX()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isO&&y!==$.$get$bc())y.c1(z)
else z.$0()},
e6:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dZ((z&4)!==0)},
dZ:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gU(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gU(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ef()
else this.eh()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d4(this)},
f0:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ek(b==null?P.rb():b,z)
this.c=c==null?P.ra():c}},
pU:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ay(y,{func:1,args:[P.d,P.aV]})
w=z.d
v=this.b
u=z.b
if(x)w.kG(u,v,this.c)
else w.hk(u,v)
z.e=(z.e&4294967263)>>>0}},
pT:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hi(z.c)
z.e=(z.e&4294967263)>>>0}},
qz:{"^":"ah;$ti",
aC:function(a,b,c,d){return this.a.iQ(a,d,c,!0===b)},
eF:function(a,b,c){return this.aC(a,null,b,c)}},
e9:{"^":"d;cf:a@,$ti"},
e7:{"^":"e9;ae:b<,a,$ti",
eG:function(a){a.cA(this.b)}},
e8:{"^":"e9;bl:b<,bh:c<,a",
eG:function(a){a.cC(this.b,this.c)},
$ase9:I.b6},
pW:{"^":"d;",
eG:function(a){a.cB()},
gcf:function(){return},
scf:function(a){throw H.c(new P.z("No events after a done."))}},
qr:{"^":"d;cD:a<,$ti",
d4:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cp(new P.qs(this,a))
this.a=1},
fH:function(){if(this.a===1)this.a=3}},
qs:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcf()
z.b=w
if(w==null)z.c=null
x.eG(this.b)}},
ed:{"^":"qr;b,c,a,$ti",
gU:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scf(b)
this.c=b}}},
qA:{"^":"d;a,b,c,$ti"},
qQ:{"^":"a:1;a,b,c",
$0:function(){return this.a.ba(this.b,this.c)}},
qP:{"^":"a:20;a,b",
$2:function(a,b){P.qO(this.a,this.b,a,b)}},
qR:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b)}},
ea:{"^":"ah;$ti",
aC:function(a,b,c,d){return this.ig(a,d,c,!0===b)},
eF:function(a,b,c){return this.aC(a,null,b,c)},
ig:function(a,b,c,d){return P.q_(this,a,b,c,d,H.y(this,"ea",0),H.y(this,"ea",1))},
ff:function(a,b){b.bN(a)},
is:function(a,b,c){c.c7(a,b)},
$asah:function(a,b){return[b]}},
hs:{"^":"cg;x,y,a,b,c,d,e,f,r,$ti",
bN:function(a){if((this.e&2)!==0)return
this.hO(a)},
c7:function(a,b){if((this.e&2)!==0)return
this.hP(a,b)},
ef:[function(){var z=this.y
if(z==null)return
z.cT()},"$0","gee",0,0,6],
eh:[function(){var z=this.y
if(z==null)return
z.cX()},"$0","geg",0,0,6],
ed:function(){var z=this.y
if(z!=null){this.y=null
return z.ca()}return},
l0:[function(a){this.x.ff(a,this)},"$1","gip",2,0,function(){return H.b4(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hs")}],
l2:[function(a,b){this.x.is(a,b,this)},"$2","gir",4,0,45],
l1:[function(){this.dW()},"$0","giq",0,0,6],
i_:function(a,b,c,d,e,f,g){this.y=this.x.a.eF(this.gip(),this.giq(),this.gir())},
$ascg:function(a,b){return[b]},
w:{
q_:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.hs(a,null,null,null,null,z,y,null,null,[f,g])
y.f0(b,c,d,e,g)
y.i_(a,b,c,d,e,f,g)
return y}}},
qp:{"^":"ea;b,a,$ti",
ff:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.A(w)
x=H.B(w)
P.qJ(b,y,x)
return}b.bN(z)}},
cv:{"^":"d;bl:a<,bh:b<",
k:function(a){return H.b(this.a)},
$isa3:1},
qI:{"^":"d;"},
r1:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cL()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
qt:{"^":"qI;",
hi:function(a){var z,y,x,w
try{if(C.h===$.p){x=a.$0()
return x}x=P.hI(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.bp(null,null,this,z,y)
return x}},
hk:function(a,b){var z,y,x,w
try{if(C.h===$.p){x=a.$1(b)
return x}x=P.hK(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.bp(null,null,this,z,y)
return x}},
kG:function(a,b,c){var z,y,x,w
try{if(C.h===$.p){x=a.$2(b,c)
return x}x=P.hJ(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.bp(null,null,this,z,y)
return x}},
ep:function(a,b){if(b)return new P.qu(this,a)
else return new P.qv(this,a)},
j:function(a,b){return},
hh:function(a){if($.p===C.h)return a.$0()
return P.hI(null,null,this,a)},
eL:function(a,b){if($.p===C.h)return a.$1(b)
return P.hK(null,null,this,a,b)},
kF:function(a,b,c){if($.p===C.h)return a.$2(b,c)
return P.hJ(null,null,this,a,b,c)}},
qu:{"^":"a:1;a,b",
$0:function(){return this.a.hi(this.b)}},
qv:{"^":"a:1;a,b",
$0:function(){return this.a.hh(this.b)}}}],["","",,P,{"^":"",
dA:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])},
aB:function(){return new H.P(0,null,null,null,null,null,0,[null,null])},
ae:function(a){return H.tx(a,new H.P(0,null,null,null,null,null,0,[null,null]))},
ls:function(a,b,c){var z,y
if(P.eh(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bO()
y.push(a)
try{P.qY(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h_(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c2:function(a,b,c){var z,y,x
if(P.eh(a))return b+"..."+c
z=new P.bI(b)
y=$.$get$bO()
y.push(a)
try{x=z
x.A=P.h_(x.gA(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.A=y.gA()+c
y=z.gA()
return y.charCodeAt(0)==0?y:y},
eh:function(a){var z,y
for(z=0;y=$.$get$bO(),z<y.length;++z)if(a===y[z])return!0
return!1},
qY:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gX(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gG();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.u();t=s,s=r){r=z.gG();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
lO:function(a,b,c,d,e){return new H.P(0,null,null,null,null,null,0,[d,e])},
c6:function(a,b,c){var z=P.lO(null,null,null,b,c)
a.V(0,new P.rd(z))
return z},
Y:function(a,b,c,d){return new P.hv(0,null,null,null,null,null,0,[d])},
b_:function(a,b){var z,y
z=P.Y(null,null,null,b)
for(y=J.am(a);y.u();)z.q(0,y.gG())
return z},
dF:function(a){var z,y,x
z={}
if(P.eh(a))return"{...}"
y=new P.bI("")
try{$.$get$bO().push(a)
x=y
x.A=x.gA()+"{"
z.a=!0
a.V(0,new P.lZ(z,y))
z=y
z.A=z.gA()+"}"}finally{z=$.$get$bO()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gA()
return z.charCodeAt(0)==0?z:z},
hw:{"^":"P;a,b,c,d,e,f,r,$ti",
cN:function(a){return H.u2(a)&0x3ffffff},
cO:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfW()
if(x==null?b==null:x===b)return y}return-1},
w:{
bL:function(a,b){return new P.hw(0,null,null,null,null,null,0,[a,b])}}},
hv:{"^":"qc;a,b,c,d,e,f,r,$ti",
eb:function(){return new P.hv(0,null,null,null,null,null,0,this.$ti)},
gX:function(a){var z=new P.ai(this,this.r,null,null,[null])
z.c=this.e
return z},
gm:function(a){return this.a},
gU:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
a5:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ic(b)},
ic:function(a){var z=this.d
if(z==null)return!1
return this.de(z[this.dd(a)],a)>=0},
ce:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a5(0,a)?a:null
else return this.iw(a)},
iw:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dd(a)]
x=this.de(y,a)
if(x<0)return
return J.az(y,x).gf9()},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.C(this))
z=z.b}},
gB:function(a){var z=this.f
if(z==null)throw H.c(new P.z("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.f4(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.f4(x,b)}else return this.az(b)},
az:function(a){var z,y,x
z=this.d
if(z==null){z=P.ql()
this.d=z}y=this.dd(a)
x=z[y]
if(x==null)z[y]=[this.e_(a)]
else{if(this.de(x,a)>=0)return!1
x.push(this.e_(a))}return!0},
aa:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.f5(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f5(this.c,b)
else return this.iH(b)},
iH:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dd(a)]
x=this.de(y,a)
if(x<0)return!1
this.f6(y.splice(x,1)[0])
return!0},
il:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.C(this))
if(b===v)this.aa(0,y)}},
b4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
f4:function(a,b){if(a[b]!=null)return!1
a[b]=this.e_(b)
return!0},
f5:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.f6(z)
delete a[b]
return!0},
e_:function(a){var z,y
z=new P.qk(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f6:function(a){var z,y
z=a.gib()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dd:function(a){return J.j(a)&0x3ffffff},
de:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gf9(),b))return y
return-1},
$isbD:1,
$isX:1,
$isv:1,
w:{
ql:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qk:{"^":"d;f9:a<,b,ib:c<"},
ai:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qc:{"^":"nC;$ti",
bD:function(a){var z=this.eb()
z.ar(0,this)
return z}},
c1:{"^":"v;$ti"},
rd:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
fg:{"^":"fp;$ti"},
fp:{"^":"d+b0;$ti",$asL:null,$asX:null,$asv:null,$isL:1,$isX:1,$isv:1},
b0:{"^":"d;$ti",
gX:function(a){return new H.dB(this,this.gm(this),0,null,[H.y(this,"b0",0)])},
as:function(a,b){return this.j(0,b)},
V:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gU:function(a){return this.gm(this)===0},
gaq:function(a){return!this.gU(this)},
gB:function(a){if(this.gm(this)===0)throw H.c(H.ad())
return this.j(0,this.gm(this)-1)},
a5:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<this.gm(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bR:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bd:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
aV:function(a,b){return new H.ao(this,b,[H.y(this,"b0",0),null])},
dR:function(a,b){return H.h1(this,b,null,H.y(this,"b0",0))},
bD:function(a){var z,y
z=P.Y(null,null,null,H.y(this,"b0",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gm(this)
this.sm(0,z+1)
this.n(0,z,b)},
aa:function(a,b){var z
for(z=0;z<this.gm(this);++z)if(J.e(this.j(0,z),b)){this.aW(0,z,this.gm(this)-1,this,z+1)
this.sm(0,this.gm(this)-1)
return!0}return!1},
ik:function(a,b){var z,y,x,w
z=H.r([],[H.y(this,"b0",0)])
y=this.gm(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gm(this))throw H.c(new P.C(this))}if(z.length!==this.gm(this)){this.hG(0,0,z.length,z)
this.sm(0,z.length)}},
aW:function(a,b,c,d,e){var z,y,x,w,v
P.c9(b,c,this.gm(this),null,null,null)
z=c-b
if(z===0)return
if(H.aO(d,"$isL",[H.y(this,"b0",0)],"$asL")){y=e
x=d}else{x=J.iJ(d,e).bC(0,!1)
y=0}w=J.I(x)
if(y+z>w.gm(x))throw H.c(H.f4())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hG:function(a,b,c,d){return this.aW(a,b,c,d,0)},
bK:function(a,b,c){var z
if(c>=this.gm(this))return-1
for(z=c;z<this.gm(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aT:function(a,b){return this.bK(a,b,0)},
k:function(a){return P.c2(this,"[","]")},
$isL:1,
$isX:1,
$isv:1},
qH:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.R("Cannot modify unmodifiable map"))},
$isG:1},
lX:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a6:function(a){return this.a.a6(a)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hn:{"^":"lX+qH;a,$ti",$asG:null,$isG:1},
lZ:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.A+=", "
z.a=!1
z=this.b
y=z.A+=H.b(a)
z.A=y+": "
z.A+=H.b(b)}},
lP:{"^":"aU;a,b,c,d,$ti",
gX:function(a){return new P.hx(this,this.c,this.d,this.b,null,this.$ti)},
V:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.C(this))}},
gU:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gB:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ad())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
as:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cG(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.az(b)},
ar:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aO(b,"$isL",z,"$asL")){y=b.gm(b)
x=this.gm(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.lQ(w+(w>>>1))
if(typeof t!=="number")return H.w(t)
v=new Array(t)
v.fixed$length=Array
s=H.r(v,z)
this.c=this.iU(s)
this.a=s
this.b=0
C.a.aW(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aW(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aW(v,z,z+r,b,0)
C.a.aW(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.hx(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.az(z.e)},
b4:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c2(this,"{","}")},
fD:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fe();++this.d},
dD:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ad());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
az:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fe();++this.d},
fe:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.r(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aW(y,0,w,z,x)
C.a.aW(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iU:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aW(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aW(a,0,v,x,z)
C.a.aW(a,v,v+this.c,this.a,0)
return this.c+v}},
hR:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.r(z,[b])},
w:{
b1:function(a,b){var z=new P.lP(null,0,0,0,[b])
z.hR(a,b)
return z},
lQ:function(a){var z
a=C.u.eT(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
hx:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.h(new P.C(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
nD:{"^":"d;$ti",
gU:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
ar:function(a,b){var z
for(z=J.am(b);z.u();)this.q(0,z.gG())},
jk:function(a){var z,y
for(z=a.a,y=new P.ai(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a5(0,y.d))return!1
return!0},
bC:function(a,b){var z,y,x,w,v
z=H.r([],this.$ti)
C.a.sm(z,this.a)
for(y=new P.ai(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cm:function(a){return this.bC(a,!0)},
aV:function(a,b){return new H.bv(this,b,[H.m(this,0),null])},
k:function(a){return P.c2(this,"{","}")},
V:function(a,b){var z
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bm:function(a,b,c){var z,y
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gB:function(a){var z,y
z=new P.ai(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ad())
do y=z.d
while(z.u())
return y},
bd:function(a,b,c){var z,y
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ad())},
dt:function(a,b){return this.bd(a,b,null)},
aR:function(a,b){var z,y,x,w
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dr())
y=w
x=!0}}if(x)return y
throw H.c(H.ad())},
$isbD:1,
$isX:1,
$isv:1},
nC:{"^":"nD;$ti"}}],["","",,P,{"^":"",
d2:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qf(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d2(a[z])
return a},
r0:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.S(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.A(x)
w=String(y)
throw H.c(new P.f1(w,null,null))}w=P.d2(z)
return w},
vY:[function(a){return a.dF()},"$1","tb",2,0,0],
qf:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iF(b):y}},
gm:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.ct().length
return z},
gU:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.ct().length
return z===0},
gaq:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.ct().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a6(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iS().n(0,b,c)},
a6:function(a){if(this.b==null)return this.c.a6(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
V:function(a,b){var z,y,x,w
if(this.b==null)return this.c.V(0,b)
z=this.ct()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d2(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dF(this)},
ct:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iS:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dA(P.q,null)
y=this.ct()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sm(y,0)
this.b=null
this.a=null
this.c=z
return z},
iF:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d2(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.q,null]}},
eU:{"^":"d;$ti"},
cB:{"^":"d;$ti"},
dw:{"^":"a3;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lx:{"^":"dw;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lw:{"^":"eU;a,b",
jo:function(a,b){var z=P.r0(a,this.gjp().a)
return z},
jn:function(a){return this.jo(a,null)},
jx:function(a,b){var z=this.gjy()
z=P.qh(a,z.b,z.a)
return z},
fO:function(a){return this.jx(a,null)},
gjy:function(){return C.P},
gjp:function(){return C.O},
$aseU:function(){return[P.d,P.q]}},
lz:{"^":"cB;a,b",
$ascB:function(){return[P.d,P.q]}},
ly:{"^":"cB;a",
$ascB:function(){return[P.q,P.d]}},
qi:{"^":"d;",
ht:function(a){var z,y,x,w,v,u,t
z=J.I(a)
y=z.gm(a)
if(typeof y!=="number")return H.w(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cK(a,v)
if(u>92)continue
if(u<32){if(v>w)x.A+=C.b.aE(a,w,v)
w=v+1
x.A+=H.ap(92)
switch(u){case 8:x.A+=H.ap(98)
break
case 9:x.A+=H.ap(116)
break
case 10:x.A+=H.ap(110)
break
case 12:x.A+=H.ap(102)
break
case 13:x.A+=H.ap(114)
break
default:x.A+=H.ap(117)
x.A+=H.ap(48)
x.A+=H.ap(48)
t=u>>>4&15
x.A+=H.ap(t<10?48+t:87+t)
t=u&15
x.A+=H.ap(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.A+=C.b.aE(a,w,v)
w=v+1
x.A+=H.ap(92)
x.A+=H.ap(u)}}if(w===0)x.A+=H.b(a)
else if(w<y)x.A+=z.aE(a,w,y)},
dY:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lx(a,null))}z.push(a)},
dI:function(a){var z,y,x,w
if(this.hs(a))return
this.dY(a)
try{z=this.b.$1(a)
if(!this.hs(z))throw H.c(new P.dw(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.A(w)
throw H.c(new P.dw(a,y))}},
hs:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.A+=C.j.k(a)
return!0}else if(a===!0){this.c.A+="true"
return!0}else if(a===!1){this.c.A+="false"
return!0}else if(a==null){this.c.A+="null"
return!0}else if(typeof a==="string"){z=this.c
z.A+='"'
this.ht(a)
z.A+='"'
return!0}else{z=J.o(a)
if(!!z.$isL){this.dY(a)
this.kU(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.dY(a)
y=this.kV(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
kU:function(a){var z,y,x
z=this.c
z.A+="["
y=J.I(a)
if(y.gm(a)>0){this.dI(y.j(a,0))
for(x=1;x<y.gm(a);++x){z.A+=","
this.dI(y.j(a,x))}}z.A+="]"},
kV:function(a){var z,y,x,w,v,u,t
z={}
if(a.gU(a)){this.c.A+="{}"
return!0}y=a.gm(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.V(0,new P.qj(z,x))
if(!z.b)return!1
w=this.c
w.A+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.A+=v
this.ht(x[u])
w.A+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dI(x[t])}w.A+="}"
return!0}},
qj:{"^":"a:7;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.f(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.f(z,w)
z[w]=b}},
qg:{"^":"qi;c,a,b",w:{
qh:function(a,b,c){var z,y,x
z=new P.bI("")
y=new P.qg(z,[],P.tb())
y.dI(a)
x=z.A
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vq:[function(a,b){return J.bU(a,b)},"$2","tc",4,0,40],
eY:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kF(a)},
kF:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cN(a)},
cD:function(a){return new P.pZ(a)},
Q:function(a,b,c){var z,y
z=H.r([],[c])
for(y=J.am(a);y.u();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
lR:function(a,b,c,d){var z,y,x
z=H.r(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bx:function(a,b){var z=P.Q(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ew:function(a){H.u9(H.b(a))},
bg:function(a,b,c){return new H.dt(a,H.du(a,!1,b,!1),null,null)},
a1:{"^":"d;"},
"+bool":0,
U:{"^":"d;$ti"},
cC:{"^":"d;iT:a<,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cC))return!1
return this.a===b.a&&!0},
bA:function(a,b){return C.d.bA(this.a,b.giT())},
gv:function(a){var z=this.a
return(z^C.d.dk(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.jX(H.mL(this))
y=P.bX(H.mJ(this))
x=P.bX(H.mF(this))
w=P.bX(H.mG(this))
v=P.bX(H.mI(this))
u=P.bX(H.mK(this))
t=P.jY(H.mH(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjR()
y=new P.cC(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.h(P.D(y.gkh()))
return y},
gkh:function(){return this.a},
$isU:1,
$asU:function(){return[P.cC]},
w:{
jX:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jY:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bX:function(a){if(a>=10)return""+a
return"0"+a}}},
aP:{"^":"K;",$isU:1,
$asU:function(){return[P.K]}},
"+double":0,
aZ:{"^":"d;bP:a<",
a7:function(a,b){return new P.aZ(this.a+b.gbP())},
at:function(a,b){return new P.aZ(this.a-b.gbP())},
c4:function(a,b){if(typeof b!=="number")return H.w(b)
return new P.aZ(C.j.hg(this.a*b))},
aQ:function(a,b){return C.d.aQ(this.a,b.gbP())},
b7:function(a,b){return this.a>b.gbP()},
c3:function(a,b){return C.d.c3(this.a,b.gbP())},
bL:function(a,b){return C.d.bL(this.a,b.gbP())},
gjR:function(){return C.d.bH(this.a,1000)},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aZ))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
bA:function(a,b){return C.d.bA(this.a,b.gbP())},
k:function(a){var z,y,x,w,v
z=new P.km()
y=this.a
if(y<0)return"-"+new P.aZ(0-y).k(0)
x=z.$1(C.d.bH(y,6e7)%60)
w=z.$1(C.d.bH(y,1e6)%60)
v=new P.kl().$1(y%1e6)
return""+C.d.bH(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eS:function(a){return new P.aZ(0-this.a)},
$isU:1,
$asU:function(){return[P.aZ]}},
kl:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
km:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a3:{"^":"d;",
gbh:function(){return H.B(this.$thrownJsError)}},
cL:{"^":"a3;",
k:function(a){return"Throw of null."}},
aY:{"^":"a3;a,b,h:c<,d",
ge3:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge2:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ge3()+y+x
if(!this.a)return w
v=this.ge2()
u=P.eY(this.b)
return w+v+": "+H.b(u)},
w:{
D:function(a){return new P.aY(!1,null,null,a)},
cu:function(a,b,c){return new P.aY(!0,a,b,c)},
l:function(a){return new P.aY(!1,null,a,"Must not be null")}}},
dU:{"^":"aY;e,f,a,b,c,d",
ge3:function(){return"RangeError"},
ge2:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
w:{
mR:function(a){return new P.dU(null,null,!1,null,null,a)},
c8:function(a,b,c){return new P.dU(null,null,!0,a,b,"Value not in range")},
a4:function(a,b,c,d,e){return new P.dU(b,c,!0,a,d,"Invalid value")},
mS:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a4(a,b,c,d,e))},
c9:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a4(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a4(b,a,c,"end",f))
return b}}},
lh:{"^":"aY;e,m:f>,a,b,c,d",
ge3:function(){return"RangeError"},
ge2:function(){if(J.bS(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
w:{
cG:function(a,b,c,d,e){var z=e!=null?e:J.aI(b)
return new P.lh(b,z,!0,a,c,"Index out of range")}}},
R:{"^":"a3;a",
k:function(a){return"Unsupported operation: "+this.a}},
aa:{"^":"a3;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
z:{"^":"a3;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a3;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eY(z))+"."}},
mg:{"^":"d;",
k:function(a){return"Out of Memory"},
gbh:function(){return},
$isa3:1},
fV:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbh:function(){return},
$isa3:1},
jW:{"^":"a3;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
pZ:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f1:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aE(x,0,75)+"..."
return y+"\n"+x}},
kJ:{"^":"d;h:a<,fj,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fj
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.cu(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dQ(b,"expando$values")
return y==null?null:H.dQ(y,z)},
n:function(a,b,c){var z,y
z=this.fj
if(typeof z!=="string")z.set(b,c)
else{y=H.dQ(b,"expando$values")
if(y==null){y=new P.d()
H.fz(b,"expando$values",y)}H.fz(y,z,c)}}},
bw:{"^":"d;"},
t:{"^":"K;",$isU:1,
$asU:function(){return[P.K]}},
"+int":0,
v:{"^":"d;$ti",
aV:function(a,b){return H.by(this,b,H.y(this,"v",0),null)},
c2:["dU",function(a,b){return new H.J(this,b,[H.y(this,"v",0)])}],
a5:function(a,b){var z
for(z=this.gX(this);z.u();)if(J.e(z.gG(),b))return!0
return!1},
V:function(a,b){var z
for(z=this.gX(this);z.u();)b.$1(z.gG())},
bm:function(a,b,c){var z,y
for(z=this.gX(this),y=b;z.u();)y=c.$2(y,z.gG())
return y},
bC:function(a,b){return P.Q(this,b,H.y(this,"v",0))},
cm:function(a){return this.bC(a,!0)},
bD:function(a){return P.b_(this,H.y(this,"v",0))},
gm:function(a){var z,y
z=this.gX(this)
for(y=0;z.u();)++y
return y},
gU:function(a){return!this.gX(this).u()},
gaq:function(a){return!this.gU(this)},
dR:function(a,b){return H.nF(this,b,H.y(this,"v",0))},
gB:function(a){var z,y
z=this.gX(this)
if(!z.u())throw H.c(H.ad())
do y=z.gG()
while(z.u())
return y},
gc6:function(a){var z,y
z=this.gX(this)
if(!z.u())throw H.c(H.ad())
y=z.gG()
if(z.u())throw H.c(H.dr())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.h(P.a4(b,0,null,"index",null))
for(z=this.gX(this),y=0;z.u();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cG(b,this,"index",null,y))},
k:function(a){return P.ls(this,"(",")")}},
cI:{"^":"d;$ti"},
L:{"^":"d;$ti",$isv:1,$isX:1},
"+List":0,
G:{"^":"d;$ti"},
at:{"^":"d;",
gv:function(a){return P.d.prototype.gv.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isU:1,
$asU:function(){return[P.K]}},
"+num":0,
d:{"^":";",
t:function(a,b){return this===b},
gv:function(a){return H.aC(this)},
k:function(a){return H.cN(this)},
gbu:function(a){return new H.av(H.i6(this),null)},
toString:function(){return this.k(this)}},
be:{"^":"d;"},
bD:{"^":"X;$ti"},
aV:{"^":"d;"},
q:{"^":"d;",$isU:1,
$asU:function(){return[P.q]},
$isdN:1},
"+String":0,
bI:{"^":"d;A<",
gm:function(a){return this.A.length},
gU:function(a){return this.A.length===0},
gaq:function(a){return this.A.length!==0},
k:function(a){var z=this.A
return z.charCodeAt(0)==0?z:z},
w:{
h_:function(a,b,c){var z=J.am(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.u())}else{a+=H.b(z.gG())
for(;z.u();)a=a+c+H.b(z.gG())}return a},
oy:function(a){return new P.bI(a)}}}}],["","",,P,{"^":"",fL:{"^":"d;"}}],["","",,P,{"^":"",
cO:function(a){return C.J},
qe:{"^":"d;",
ad:function(a){if(a<=0||a>4294967296)throw H.c(P.mR("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kj:function(){return Math.random()}}}],["","",,S,{"^":"",jL:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
a6:function(a){return this.b.a6(a)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){var z=this.b
return z.gU(z)},
gaq:function(a){var z=this.b
return z.gaq(z)},
gm:function(a){var z=this.b
return z.gm(z)},
n:function(a,b,c){this.iy()
this.b.n(0,b,c)},
k:function(a){return J.i(this.b)},
iy:function(){if(!this.a)return
this.a=!1
this.b=P.c6(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",jM:{"^":"d;a,b,$ti",
gm:function(a){return this.b.a},
ce:function(a){return this.b.ce(a)},
a5:function(a,b){return this.b.a5(0,b)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){return this.b.a===0},
gaq:function(a){return this.b.a!==0},
gX:function(a){var z,y
z=this.b
y=new P.ai(z,z.r,null,null,[null])
y.c=z.e
return y},
gB:function(a){var z=this.b
return z.gB(z)},
aV:function(a,b){var z=this.b
z.toString
return new H.bv(z,b,[H.m(z,0),null])},
bD:function(a){var z,y
z=this.b
y=z.eb()
y.ar(0,z)
return y},
q:function(a,b){this.ie()
return this.b.q(0,b)},
k:function(a){return J.i(this.b)},
ie:function(){if(!this.a)return
this.a=!1
this.b=P.b_(this.b,H.m(this,0))},
$isbD:1,
$isX:1,
$isv:1}}],["","",,S,{"^":"",dg:{"^":"d;fl:a<,b,$ti",
Y:function(a){var z=new S.N(null,null,this.$ti)
z.af()
z.l(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=X.bs(this.a)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdg)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.f(y,v)
w=y[v]
if(v>=z)return H.f(x,v)
if(!J.e(w,x[v]))return!1}return!0},
k:function(a){return J.i(this.a)},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
gm:function(a){return this.a.length},
bK:function(a,b,c){var z=this.a
return(z&&C.a).bK(z,b,c)},
aT:function(a,b){return this.bK(a,b,0)},
gX:function(a){var z=this.a
return new J.b9(z,z.length,0,null,[H.m(z,0)])},
aV:function(a,b){var z=this.a
z.toString
return new H.ao(z,b,[H.m(z,0),null])},
a5:function(a,b){var z=this.a
return(z&&C.a).a5(z,b)},
V:function(a,b){var z=this.a
return(z&&C.a).V(z,b)},
bD:function(a){var z=this.a
z.toString
return P.b_(z,H.m(z,0))},
gU:function(a){return this.a.length===0},
gaq:function(a){return this.a.length!==0},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
af:function(){if(new H.av(H.W(H.m(this,0)),null).t(0,C.n))throw H.c(new P.R('explicit element type required, for example "new BuiltList<int>"'))},
$isv:1},N:{"^":"d;fl:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dg(z,null,this.$ti)
y.af()
this.a=z
this.b=y
z=y}return z},
l:function(a){if(H.aO(a,"$isdg",this.$ti,null)){this.a=a.gfl()
this.b=a}else{this.a=P.Q(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.h(P.D("null element"))
z=this.gej()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.h(P.D("null element"))
z=this.gej();(z&&C.a).q(z,b)},
aa:function(a,b){var z=this.gej();(z&&C.a).aa(z,b)},
aV:function(a,b){var z=this.a
z.toString
z=new H.ao(z,b,[H.m(z,0),null]).bC(0,!0)
this.a=z
this.b=null
this.i8(z)},
gej:function(){if(this.b!=null){this.a=P.Q(this.a,!0,H.m(this,0))
this.b=null}return this.a},
af:function(){if(new H.av(H.W(H.m(this,0)),null).t(0,C.n))throw H.c(new P.R('explicit element type required, for example "new ListBuilder<int>"'))},
i8:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.d5(w,y))throw H.c(P.D("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cy:{"^":"d;ix:a<,b,c,d,$ti",
Y:function(a){var z=new A.cK(null,null,this.$ti)
z.c9()
z.l(this)
a.$1(z)
return z.p()},
D:function(){return new S.jL(!0,this.a,this.$ti)},
gv:function(a){var z=this.b
if(z==null){z=this.a.gcc()
z=H.by(z,new A.jw(this),H.y(z,"v",0),null)
z=P.Q(z,!1,H.y(z,"v",0))
C.a.eW(z)
z=X.bs(z)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscy)return!1
y=b.a
x=this.a
if(y.gm(y)!==x.gm(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcc()
this.c=z}z=z.gX(z)
for(;z.u();){v=z.gG()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.i(this.a)},
j:function(a,b){return this.a.j(0,b)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
c9:function(){if(new H.av(H.W(H.m(this,0)),null).t(0,C.n))throw H.c(new P.R('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.W(H.m(this,1)),null).t(0,C.n))throw H.c(new P.R('explicit value type required, for example "new BuiltMap<int, int>"'))}},jw:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d3(X.aW(X.aW(0,J.j(z)),J.j(y)))}},cK:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cy(this.a,null,null,null,this.$ti)
z.c9()
this.b=z}return z},
l:function(a){var z
if(H.aO(a,"$iscy",this.$ti,null)){this.b=a
this.a=a.gix()}else if(!!a.$iscy){z=P.c6(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.c6(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.D("expected Map or BuiltMap, got "+H.b(a.gbu(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.h(P.D("null value"))
this.giK().n(0,b,c)},
giK:function(){if(this.b!=null){this.a=P.c6(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
c9:function(){if(new H.av(H.W(H.m(this,0)),null).t(0,C.n))throw H.c(new P.R('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.W(H.m(this,1)),null).t(0,C.n))throw H.c(new P.R('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dh:{"^":"d;iM:a<,b,$ti",
Y:function(a){var z=new L.bh(null,null,this.$ti)
z.bz()
z.l(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.Q(new H.bv(z,new L.jx(),[H.m(z,0),null]),!1,null)
C.a.eW(z)
z=X.bs(z)
this.b=z}return z},
t:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdh)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gv(b)
x=this.gv(this)
if(z==null?x!=null:z!==x)return!1
return y.jk(b)},
k:function(a){return J.i(this.a)},
gm:function(a){return this.a.a},
ce:function(a){return this.a.ce(a)},
gX:function(a){var z,y
z=this.a
y=new P.ai(z,z.r,null,null,[null])
y.c=z.e
return y},
aV:function(a,b){var z=this.a
z.toString
return new H.bv(z,b,[H.m(z,0),null])},
a5:function(a,b){return this.a.a5(0,b)},
V:function(a,b){return this.a.V(0,b)},
bD:function(a){return new A.jM(!0,this.a,this.$ti)},
gU:function(a){return this.a.a===0},
gaq:function(a){return this.a.a!==0},
gB:function(a){var z=this.a
return z.gB(z)},
bz:function(){if(new H.av(H.W(H.m(this,0)),null).t(0,C.n))throw H.c(new P.R('explicit element type required, for example "new BuiltSet<int>"'))},
$isv:1},jx:{"^":"a:0;",
$1:function(a){return J.j(a)}},bh:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dh(this.a,null,this.$ti)
z.bz()
this.b=z}return z},
l:function(a){var z,y,x,w
if(H.aO(a,"$isdh",this.$ti,null)){this.a=a.giM()
this.b=a}else{z=H.m(this,0)
y=P.Y(null,null,null,z)
for(x=J.am(a);x.u();){w=x.gG()
if(H.d5(w,z))y.q(0,w)
else throw H.c(P.D("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.h(P.D("null element"))
this.gft().q(0,b)},
aV:function(a,b){var z=this.a
z.toString
z=P.b_(new H.bv(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iN(z)},
gft:function(){if(this.b!=null){this.a=P.b_(this.a,H.m(this,0))
this.b=null}return this.a},
bz:function(){if(new H.av(H.W(H.m(this,0)),null).t(0,C.n))throw H.c(new P.R('explicit element type required, for example "new SetBuilder<int>"'))},
iN:function(a){var z,y,x
for(z=new P.ai(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.d5(x,y))throw H.c(P.D("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.w(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
M:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",ne:{"^":"nc;ch,cx,ah:cy@,b8:db@,bw:dx@,b,c,d,e,f,r,x,y,z,Q,a",
h9:function(){var z=$.$get$cq()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jT:function(){var z,y,x,w
this.cx=null
this.cy=Z.bG("Health",new N.nh(),"#CCCCCC","Your physical state",100,0,!0,P.aP)
z=P.t
this.db=Z.bG("Stamina",new N.ni(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bG("Gold",new N.nj(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bP()
x=this.cy
w=this.db
y=new O.eX(N.bd("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a0(H.r([],[Y.a9]),0,P.aB()),x,w,z,O.ue(),O.ud(),O.uc(),y,this.ghJ(),new P.bI(""),!1,null)
y.hH()
this.cx=y
y.x="endGame"
$.$get$cl().q(0,0)},
hV:function(){var z,y
z=new O.cT([[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cT([new N.ng(this),[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cT(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
w:{
nf:function(){var z,y,x,w
z=Z.bG("Health",new N.rL(),"#CCCCCC","Your physical state",100,0,!0,P.aP)
y=P.t
x=Z.bG("Stamina",new N.rN(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bG("Gold",new N.rO(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.ne("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nk(new H.P(0,null,null,null,null,null,0,[w,O.cT])),null,null,null,P.Y(null,null,null,w),!1,null,-9999,null,null,null)
z.hV()
return z}}},rL:{"^":"a:17;",
$1:function(a){var z=J.o(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.c3(a,0.5))return"\ud83d\ude23"
if(z.aQ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},rN:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},rO:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},ng:{"^":"a:18;a",
$0:function(){var z=0,y=P.aA(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.bt(),$async$$0)
case 2:return P.aE(null,y)}})
return P.aF($async$$0,y)}},nh:{"^":"a:17;",
$1:function(a){var z=J.o(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.c3(a,0.5))return"\ud83d\ude23"
if(z.aQ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},ni:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nj:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bZ:{"^":"d;"},kC:{"^":"d;"},pj:{"^":"bZ;a,b",
Y:function(a){var z=new M.e4(null,!1,0)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bZ))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){return Y.M(Y.k(Y.k(0,C.M.gv(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.k(this.b)+",\n}"}},e4:{"^":"kC;c,a,b",
gbM:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
l:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbM()
y=this.a
this.gbM()
z=new M.pj(y,this.b)}this.l(z)
return z}}}],["","",,O,{"^":"",
w1:[function(a){var z,y
z=a.gc5()
y=a.gbU()
if(typeof y!=="number")return H.w(y)
return z-2*y},"$1","d7",2,0,19],
wc:[function(a){var z,y,x
z=a.gc5()
y=a.gcY()
x=a.gbU()
if(typeof x!=="number")return H.w(x)
return z+y-x},"$1","hX",2,0,19],
eX:{"^":"lT;y,z,Q,ch,cx,cy,db,dx,dy,bE:fr<,fx,eY:fy<,ah:go<,b8:id<,bw:k1<,a,b,c,d,e,f,r,x",
hH:function(){var z,y,x,w,v,u
z=P.bx(C.o,null)
y=$.$get$cm()
this.cy=R.b8(1000,"orc",O.d7(),null,new G.bj("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b8(1001,"goblin",O.d7(),null,new G.bj("scimitar",1,1,!1,!0,!1,P.bx(C.o,null)),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.N(null,null,[Q.x])
y.af()
y.l([new Q.x("kill_agruth","","",null)])
this.dx=new K.cb(y.p(),"preStartBook",new O.kt(),new O.ku(),null,null,"ground")
y=R.b8(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.C,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.d3()
if(typeof y!=="number")return H.w(y)
this.go.sae(z/y)
this.id.sae(this.ch.fx)
this.k1.sae(this.ch.f)
this.cx=R.b8(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.a_,0,null)
this.dy=F.fG(this.dx,!1)
y=K.cb
x=P.Q($.$get$hO(),!0,y)
C.a.ar(x,[this.dx,$.$get$ep()])
w=new M.e4(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b_([z,v],R.H)
z=P.b1(null,O.cs)
u=new A.a7(v,P.Y(null,null,null,U.as),w,z,P.b_(x,y),P.Q([u],!0,S.a_),0,null)
this.fr=u
y=new Y.a0(H.r([],[Y.a9]),0,P.aB())
y.b=u.r
this.fx=new B.bz(u,null,y,1,1,!0,!1,!1,0)},
d0:function(){var z=0,y=P.aA(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d0=P.ax(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjw()
if(v.h6(u)){z=1
break}t=w.fr.a0(w.ch.x)
s=t.gah()
r=t.gh1()
if(typeof s!=="number"){x=s.d3()
z=1
break}if(typeof r!=="number"){x=H.w(r)
z=1
break}w.go.sae(s/r)
w.id.sae(t.gb8())
w.k1.sae(t.gbw())
r=w.y
r.fY("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.I(0,"\n\n",!0)
if(w.fr.jO(w.ch.x))v.I(0,"TO BE CONTINUED.",!0)
else v.I(0,"You died.",!0)
w.f.A+=v.ci()
z=1
break}q=C.a.gB(s)
p=q.dL(w.fr)
s=w.fr
o=N.bd("ActorPlanner")
n=new H.P(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gi()
k=new Y.a0(H.r([],[Y.a9]),0,P.aB())
k.b=s.r
j=new G.iO(o,l,new B.bz(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.h(P.D("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(s)+". Situation: "+H.b(s.gjm())))
z=3
return P.aw(j.ko(),$async$d0)
case 3:if(n.gU(n)){o.eP("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.o(s)
s="PlanConsequence<"+l.gv(s)+", "+l.k(s)+", "+C.u.k(null)
o.bJ(m+(s+", 1, 0, >")+".")}s=Z.mn(n)
i=new Z.mm(new P.hn(n,[null,null]),s)
if(n.gU(n))$.$get$bA().eP("Created with no recommendations.")
if(s.length===0){r.dP("No recommendation for "+H.b(p.gh()))
r.dP(new O.kw(w))
w.fr.fN(q.gi());++w.fr.r
z=1
break}z=p.gF()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.ar)(s),++h);r.bJ("planner.generateTable for "+H.b(p.gh()))
j.eQ().V(0,new O.kx(w))
u=i.h8(q.gh0(),O.hX())
u.toString
g=P.Q(u,!1,H.y(u,"v",0))
if(g.length!==0&&C.a.bR(g,new O.ky())){w.f.A+=v.ci()
C.a.sm(v.a,0)}v=new O.kz(new O.kB())
u=g.length-1
if(u-0<=32)H.fU(g,0,u,v)
else H.fT(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gW(),f.gL(),new O.kA(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfM()
z=7
return P.aw(w.cq(i.kn(s==null?O.hX():s),p,v),$async$d0)
case 7:case 5:v.h6(u)
case 1:return P.aE(x,y)}})
return P.aF($async$d0,y)},
cq:function(a,b,c){var z=0,y=P.aA(),x,w=this,v,u,t
var $async$cq=P.ax(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:v=a.dn(b,w.fx,w.fr)
u=P.Q(v,!0,H.y(v,"v",0))
z=b.gF()===!0?3:5
break
case 3:z=6
return P.aw(w.dc(a,b,u),$async$cq)
case 6:z=4
break
case 5:t=S.mP(new H.ao(u,new O.kq(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ar(c.a,w.fx.geY().a)
w.fr=w.fx.gbE()
v=w.y
v.bJ(new O.kr(a,b))
v.ag(new O.ks(w,b))
case 1:return P.aE(x,y)}})
return P.aF($async$cq,y)},
dc:function(a,b,c){var z=0,y=P.aA(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dc=P.ax(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=a.K(b,x.fr)
v=J.o(w)
z=v.t(w,1)?2:4
break
case 2:x.fx=C.a.gc6(c)
z=3
break
case 4:z=v.t(w,0)?5:7
break
case 5:x.fx=C.a.gc6(c)
z=6
break
case 7:u=C.a.gB(J.i(a.gN()).split("."))
v=v.kL(w)
t=a.am(b,x.fr)
s=a.gR()&&b.jP(a.gN())
r="use "+H.b(u)
x.fo()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dc)
case 8:q=e
s=new H.J(c,new O.kn(q),[H.m(c,0)])
x.fx=s.gc6(s)
if(q.gkT()===!0){p=A.e3(x.fx.gbE())
p.Z(b.gi(),new O.ko())
v=x.fx
t=v.gfv()
s=H.r([],[Y.a9])
r=new Y.a0(s,0,P.aB())
C.a.ar(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bz(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aE(null,y)}})
return P.aF($async$dc,y)}},
kt:{"^":"a:3;",
$3:function(a,b,c){return c.I(0,"UNUSED because this is the first choice",!0)}},
ku:{"^":"a:3;",
$3:function(a,b,c){return H.h(new P.z("Room isn't to be revisited"))}},
kw:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ao(z,new O.kv(),[H.m(z,0),null]).cQ(0," <- ")}},
kv:{"^":"a:0;",
$1:function(a){return a.gbb()}},
kx:{"^":"a:0;a",
$1:function(a){return this.a.y.bJ(a)}},
kB:{"^":"a:39;",
$1:function(a){if(a instanceof Q.E)return H.b(a.b.gh())+" "+a.gW()
return"ZZZZZZ "+a.gW()}},
ky:{"^":"a:0;",
$1:function(a){return a.gW()!==""}},
kz:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bU(z.$1(a),z.$1(b))}},
kA:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.aA(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cq(x.c,x.b,w.fy),$async$$0)
case 2:return P.aE(null,y)}})
return P.aF($async$$0,y)}},
kq:{"^":"a:0;",
$1:function(a){return a.gkp()}},
kr:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
ks:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ao(z,new O.kp(),[H.m(z,0),null]).cQ(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kp:{"^":"a:0;",
$1:function(a){return a.gbb()}},
kn:{"^":"a:0;a",
$1:function(a){return a.geA()===this.a.geA()}},
ko:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}}}],["","",,Q,{"^":"",
i1:function(a,b,c){return P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i1(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gB(t):null
s=J.iM(t.aD(y.a,y),new Q.tJ(z))
t=J.am(s.a),r=new H.ce(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gM()&&!z.ex(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
i2:function(a,b,c){return P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i2(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dN((t.length!==0?C.a.gB(t):null).gbB()).gjA().a,t=new J.b9(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
i3:function(a,b,c){return P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i3(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gB(t):null).gbI(),t=t.gX(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
tJ:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaU()}},
a8:{"^":"d;",
dn:function(a,b,c){var z=this
return P.aN(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dn(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.K(y,x.gbE())
r=J.aj(s)
v=r.b7(s,0)?2:3
break
case 2:q=A.e3(w)
v=4
return B.fu(q,x,z,z.i4(q,y,w,z.gP(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aQ(s,1)?5:6
break
case 5:q=A.e3(w)
p=z.i3(q,y,w,z.gO(),!0)
if(typeof s!=="number")H.w(s)
v=7
return B.fu(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aL()
case 1:return P.aM(t)}}})},
f2:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aR(0,new Q.iN(b))
y=new O.eJ(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga4().c=x
x=b.gi()
y.ga4().f=x
y.ga4().e=C.Q
y.ga4().ch=f
y.ga4().Q=e
x=this.gM()
y.ga4().y=x
x=this.ga1()
y.ga4().z=x
if(!!this.$isE){x=y.ga4()
w=x.r
if(w==null){w=new L.bh(null,null,[P.t])
w.bz()
w.l(C.e)
x.r=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.h(P.D("null element"))
x.gft().q(0,w)}v=new Y.a0(H.r([],[Y.a9]),0,P.aB())
x=a.f
u=(x.length!==0?C.a.gB(x):null).gi()
a.gv(a);(x.length!==0?C.a.gB(x):null).kk(a,v)
this.a=d.$3(z,a,v)
if(a.df(u)!=null)a.fN(u);++a.r
w=a.eR(u)
if(!(w==null))w.h4(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gB(x):null
if((w==null?w:w.dL(a))!=null){w=x.length!==0?C.a.gB(x):null
w=!J.e(w==null?w:w.d7(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gB(x):null)==null)break
t=C.a.gB(x)
t.dw(a)
C.a.aa(x,t)}x=x.length!==0?C.a.gB(x):null
if(!(x==null))x.h5(a,v)
if(this.a==null)H.h(new P.z("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga4().d=x
x=a.r
y.ga4().x=x
a.d.fD(y.p())
return v},
i4:function(a,b,c,d,e){return this.f2(a,b,c,d,!1,e)},
i3:function(a,b,c,d,e){return this.f2(a,b,c,d,e,!1)}},
iN:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
E:{"^":"a8;bU:b<",
gW:function(){var z=new Y.a0(H.r([],[Y.a9]),0,P.aB())
z.fA(0,this.gal(),this.b)
return z.ci()},
am:function(a,b){var z=new Y.a0(H.r([],[Y.a9]),0,P.aB())
z.j4(0,this.gan(),this.b,a,!0)
return z.ci()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gal()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
cE:{"^":"a8;",
gW:function(){return this.b.gW()},
k:function(a){return"ExitAction<"+this.b.gW()+">"}},
cH:{"^":"a8;",
gW:function(){var z=new Y.a0(H.r([],[Y.a9]),0,P.aB())
z.fA(0,"pick up <object>",this.b)
return z.ci()},
k:function(a){return"ItemAction<"+this.gW()+">"}},
mZ:{"^":"d;a,b",
k:function(a){return this.b},
w:{"^":"vQ<"}}}],["","",,O,{"^":"",cs:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},lH:{"^":"d;a,b",
k:function(a){return this.b}},pf:{"^":"cs;a,fz:b<,bb:c<,d,dC:e<,f_:f<,H:r<,hp:x<,hq:y<,z,hr:Q<",
Y:function(a){var z=new O.eJ(null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cs))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.e(this.e,b.e))if(J.e(this.f,b.f)){z=this.r
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
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.i(this.a)+",\nactionName="+J.i(this.b)+",\ndescription="+H.b(J.i(this.c))+",\nknownTo="+J.i(this.d)+",\nprotagonist="+H.b(J.i(this.e))+",\nsufferers="+J.i(this.f)+",\ntime="+J.i(this.r)+",\nwasAggressive="+J.i(this.x)+",\nwasProactive="+J.i(this.y)+",\nwasFailure="+J.i(this.z)+",\nwasSuccess="+J.i(this.Q)+",\n}"}},eJ:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfz:function(){return this.ga4().c},
gbb:function(){return this.ga4().d},
gdC:function(){return this.ga4().f},
gf_:function(){var z,y
z=this.ga4()
y=z.r
if(y==null){y=new L.bh(null,null,[P.t])
y.bz()
y.l(C.e)
z.r=y
z=y}else z=y
return z},
gH:function(){return this.ga4().x},
ghp:function(){return this.ga4().y},
ghq:function(){return this.ga4().z},
ghr:function(){return this.ga4().ch},
ga4:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bh(null,null,[H.m(z,0)])
y.bz()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bh(null,null,[H.m(z,0)])
y.bz()
y.l(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
if(z==null){y=this.ga4()
x=y.b
if(x==null){x=new L.bh(null,null,[P.t])
x.bz()
x.l(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga4().c
w=this.ga4().d
v=this.ga4().e
u=this.ga4().f
t=this.ga4()
s=t.r
if(s==null){s=new L.bh(null,null,[P.t])
s.bz()
s.l(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga4().x
r=this.ga4().y
q=this.ga4().z
p=this.ga4().Q
o=this.ga4().ch
z=new O.pf(y,x,w,v,u,t,s,r,q,p,o)
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
if(o==null)H.h(P.l("wasSuccess"))}this.l(z)
return z}}}],["","",,R,{"^":"",
i4:function(a,b){return P.aN(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i4(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bK(new H.J(u,new R.tK(z),[H.m(u,0)]))
case 3:return P.aL()
case 1:return P.aM(v)}}})},
b8:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eK(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rH(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
tK:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfR()
y=this.a.gi()
return z==null?y==null:z===y}},
H:{"^":"m2;",
gjf:function(){return!0},
gbn:function(){var z=this.r
if(typeof z!=="number")return z.b7()
return z>0},
gb5:function(){return this.d instanceof K.c0},
gaL:function(){return this.dx===C.i},
ga3:function(){return this.dx===C.f},
ga9:function(){return this.dx===C.k},
jP:function(a){var z=this.fx
if(typeof z!=="number")return z.bL()
return z>=1},
ex:function(a,b){return this.fX(a,b)>0},
fX:function(a,b){var z,y
if(this.ez(b)){z=a.gbf()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.it(a,b,10))return 1
z=a.gbf()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
ez:function(a){var z,y
z=a.c0("Confuse",this,!0)
if(z==null)return!1
y=a.kI("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d6:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a0(this.x)
y=z.gah()
if(typeof y!=="number")return H.w(y)
x=2*y
if(!z.gbn())x-=10
y=z.d
if(!(y instanceof K.c0))x+=4
y=J.aX(y.gae(),2)
if(typeof y!=="number")return H.w(y)
x+=y
for(y=z.ch,w=[null],v=new P.ai(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.aX(v.d.gae(),10)
if(typeof y!=="number")return H.w(y)
x+=y}y=a.a
for(v=y.gX(y),u=new H.ce(v,new R.jg(this),[H.m(y,0)]),t=0;u.u();){s=v.gG()
r=s.gaU()?2:0
q=s.gah()
if(typeof q!=="number")return H.w(q)
p=J.aX(s.d.gae(),2)
if(typeof p!=="number")return H.w(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.ai(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.aX(q.d.gae(),10)
if(typeof r!=="number")return H.w(r)
t+=r}}return new A.ct(x,t,y.bm(0,0,new R.jh(this,a)))},
it:function(a,b,c){var z=b.kJ(a,this,!0)
if(z==null)return!1
return z<=c},
$isbb:1},
m2:{"^":"d+dl;"},
rH:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$eo()
a.gC().e=z
a.gC().b=[]
a.gC().dy=C.k
a.gC().x=this.r
a.gC().cy=this.x
a.gC().r=this.Q
a.gC().fy=this.y
a.gC().z=this.z
a.gC().Q=!0
a.gC().ch=this.c
z=P.Y(null,null,null,null)
a.gC().cx=z
z=this.cy
if(z!=null){y=new L.bk(null,null)
y.l(z)
z=y}else{z=$.$get$ev()
z.toString
y=new L.bk(null,null)
y.l(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
jg:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gbf(),z.fy)){y=a.gi()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
jh:{"^":"a:27;a,b",
$2:function(a,b){var z,y
z=b.gaU()?1:0
y=b.gah()
if(typeof y!=="number")return H.w(y)
return J.al(a,(z+y)*this.a.fX(b,this.b))}},
dO:{"^":"d;a,b",
k:function(a){return this.b}},
pg:{"^":"H;a,fM:b<,bB:c<,a_:d<,fR:e<,bw:f<,ah:r<,i:x<,y,cb:z<,F:Q<,bW:ch<,h1:cx<,h:cy<,bX:db<,ai:dx<,a2:dy<,fr,b8:fx<,bf:fy<",
Y:function(a){var z=new R.eK(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.H))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.e(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
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
z=(z==null?y==null:z===y)&&J.e(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.u.gv(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.i(this.a)+",\ncombineFunction="+J.i(this.b)+",\ncurrentRoomName="+J.i(this.c)+",\ncurrentWeapon="+H.b(J.i(this.d))+",\nfollowingActorId="+J.i(this.e)+",\ngold="+J.i(this.f)+",\nhitpoints="+J.i(this.r)+",\nid="+J.i(this.x)+",\ninitiative="+J.i(this.y)+",\nisActive="+J.i(this.z)+",\nisPlayer="+J.i(this.Q)+",\nitems="+J.i(this.ch)+",\nmaxHitpoints="+J.i(this.cx)+",\nname="+J.i(this.cy)+",\nnameIsProperNoun="+J.i(this.db)+",\npose="+J.i(this.dx)+",\npronoun="+J.i(this.dy)+",\nshield="+C.u.k(this.fr)+",\nstamina="+J.i(this.fx)+",\nteam="+J.i(this.fy)+",\n}"}},
eK:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfM:function(){return this.gC().c},
gbB:function(){return this.gC().d},
sbB:function(a){this.gC().d=a
return a},
ga_:function(){return this.gC().e},
sa_:function(a){this.gC().e=a
return a},
gfR:function(){return this.gC().f},
gbw:function(){return this.gC().r},
sbw:function(a){this.gC().r=a
return a},
gah:function(){return this.gC().x},
sah:function(a){this.gC().x=a
return a},
gi:function(){return this.gC().y},
gcb:function(){return this.gC().Q},
gF:function(){return this.gC().ch},
gbW:function(){return this.gC().cx},
gh1:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gbX:function(){return this.gC().dx},
gai:function(){return this.gC().dy},
sai:function(a){this.gC().dy=a
return a},
ga2:function(){return this.gC().fr},
gb8:function(){return this.gC().fy},
sb8:function(a){this.gC().fy=a
return a},
gbf:function(){var z,y
z=this.gC()
y=z.go
if(y==null){y=new L.bk(null,null)
z.go=y
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
z=z.fy
if(!(z==null)){y=new L.bk(null,null)
y.l(z)
z=y}this.go=z
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
f=this.gC()
e=f.go
if(e==null){e=new L.bk(null,null)
f.go=e
f=e}else f=e
z=new R.pg(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
if(y==null)H.h(P.l("categories"))
if(v==null)H.h(P.l("currentWeapon"))
if(t==null)H.h(P.l("gold"))
if(s==null)H.h(P.l("hitpoints"))
if(r==null)H.h(P.l("id"))
if(q==null)H.h(P.l("initiative"))
if(p==null)H.h(P.l("isActive"))
if(o==null)H.h(P.l("isPlayer"))
if(n==null)H.h(P.l("items"))
if(m==null)H.h(P.l("maxHitpoints"))
if(l==null)H.h(P.l("name"))
if(k==null)H.h(P.l("nameIsProperNoun"))
if(j==null)H.h(P.l("pose"))
if(i==null)H.h(P.l("pronoun"))
if(g==null)H.h(P.l("stamina"))}this.l(z)
return z}}}],["","",,A,{"^":"",ct:{"^":"d;c5:a<,cY:b<,bU:c<",
at:function(a,b){return new A.an(this.a-b.gc5(),this.b-b.gcY(),J.bt(this.c,b.gbU()))},
k:function(a){return"ActorScore<self="+C.j.b6(this.a,2)+",team="+C.j.b6(this.b,2)+",enemy="+J.bV(this.c,2)+">"}},an:{"^":"d;c5:a<,cY:b<,bU:c<",
gk8:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c4:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.an(this.a*b,this.b*b,J.bT(this.c,b))},
a7:function(a,b){return new A.an(this.a+b.gc5(),this.b+b.gcY(),J.al(this.c,b.gbU()))},
d3:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.an(this.a/b,this.b/b,J.aX(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.b6(this.a,2)+",team="+C.j.b6(this.b,2)+",enemy="+J.bV(this.c,2)+">"},
w:{
jf:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.w(r)
v+=r}if(y===0)throw H.c(P.D("Cannot average empty iterable"))
return new A.an(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
vl:function(a){switch(a){case C.L:return"spear"
case C.y:return"sword"
case C.z:return"fist"
default:throw H.c(P.D(a))}},
as:{"^":"m3;",
gbb:function(){return U.vl(C.a.gev(this.a))},
gi:function(){return H.aC(this)},
gcb:function(){return!0},
gbn:function(){return!1},
gF:function(){return!1},
gbX:function(){return!1},
ga2:function(){return C.q},
gbf:function(){return $.$get$bR()},
$isbb:1},
m3:{"^":"d+dl;"},
dq:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c0:{"^":"b2;h:b<,a"}}],["","",,G,{"^":"",bj:{"^":"b2;h:b<,co:c<,cZ:d<,bX:e<,cI:f<,fG:r<,a"}}],["","",,L,{"^":"",b2:{"^":"as;",
gfG:function(){return!1},
gcI:function(){return!1},
gk5:function(){return!1},
gbe:function(){return this.gco()>0},
geB:function(){return this.gcZ()>0},
gm:function(a){return 2},
gco:function(){return 0},
gcZ:function(){return 0},
gae:function(){return this.gco()+this.gcZ()},
$isbb:1}}],["","",,G,{"^":"",lT:{"^":"d;",
fo:function(){var z,y
z=this.f
y=z.A
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.A=""}},
l4:[function(a){this.f.A+=a},"$1","gjw",2,0,21],
bt:function(){var z=0,y=P.aA(),x,w=this,v,u
var $async$bt=P.ax(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.z("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sm(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gm(v)===0&&u.A.length===0)){z=4
break}z=5
return P.aw(w.d0(),$async$bt)
case 5:z=3
break
case 4:w.fo()
case 1:return P.aE(x,y)}})
return P.aF($async$bt,y)}}}],["","",,B,{"^":"",eV:{"^":"d;d5:a<,ds:b<,cS:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.bV(this.b,3)+", score="+this.a.k(0)+">"}},bz:{"^":"d;bE:a<,fv:b<,eY:c<,kp:d<,ds:e<,f,r,eA:x<,cS:y<",
gv:function(a){return X.bs(H.r([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
t:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbz&&this.gv(this)===z.gv(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gv(z)+", "+y.k(z)+", "+J.i(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
w:{
fu:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bT(e,b.gds())
z=z?0:b.gcS()+1
d.b=a.r
return new B.bz(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iO:{"^":"d;a,b,c,d,e,f",
ji:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ag("...")
z.ag("combining scores")
y=H.r([],[A.an])
x=new G.j8()
for(w=J.am(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gG()
z.ag(new G.j6(r))
if(J.a6(r.gds(),0.15))if(s==null){z.ag("    - first _bestCase")
s=r}else if(J.a6(x.$1(r.gd5()),x.$1(s.gd5()))){z.ag("    - new _bestCase")
s=r}q=r.gd5()
p=J.bt(q.c,t)
o=r.b
if(typeof o!=="number")return H.w(o)
n=new A.an((q.a-v)*o,(q.b-u)*o,J.bT(p,o))
z.ag(new G.j7(n))
y.push(n)}m=A.jf(y)
w=s==null
if(w)l=C.E
else{q=s.gd5()
l=new A.an(q.a-v,q.b-u,J.bt(q.c,t))}w=w?s:s.gcS()
if(w==null)w=1
if(typeof w!=="number")return H.w(w)
v=l.a/w
u=l.b/w
w=J.aX(l.c,w)
t=m.a
q=m.b
p=m.c
z.ag("- uplifts average = "+("ActorScoreChange<self="+C.j.b6(t,2)+",team="+C.j.b6(q,2)+",enemy="+J.bV(p,2)+">"))
z.ag("- best = "+("ActorScoreChange<self="+C.t.b6(v,2)+",team="+C.t.b6(u,2)+",enemy="+J.bV(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ag("- result = "+("ActorScoreChange<self="+C.t.b6(t,2)+",team="+C.t.b6(q,2)+",enemy="+C.j.b6(p,2)+">"))
return new A.an(t,q,p)},
eQ:function(){var z=this
return P.aN(function(){var y=0,x=1,w,v,u,t,s
return function $async$eQ(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcc(),u=u.gX(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gW()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aL()
case 1:return P.aM(w)}}})},
dz:function(a,b,c){var z=0,y=P.aA(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dz=P.ax(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=x.f
w.b4(0)
v=x.c
u=v.a
t=u.a.aR(0,new G.j9(x))
s=t.d6(u)
r=x.a
r.bJ("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b3(x.e5(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.bc(new G.ja(t,o))
if(o.J(t,u)!==!0){r.bc(new G.jb(o))
z=2
break}z=4
return P.aw(x.cu(v,o,b,a,c).cm(0),$async$dz)
case 4:n=e
if(J.eG(n)===!0){r.bc(new G.jc(o))
w.n(0,o,C.F)
z=2
break}r.bc(new G.jd(s,o,n))
m=x.ji(n,s,b)
w.n(0,o,m)
r.bc(new G.je(o,m))
z=2
break
case 3:x.e=!0
return P.aE(null,y)}})
return P.aF($async$dz,y)},
ko:function(){return this.dz(50,10,null)},
e5:function(a,b){return P.aN(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$e5(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bK((u.length!==0?C.a.gB(u):null).gbj())
case 2:u=(u.length!==0?C.a.gB(u):null).gaB()
t=u.length
s={func:1,ret:Q.cH,args:[U.as]}
r={func:1,ret:Q.cE,args:[Q.x]}
q={func:1,ret:Q.E,args:[R.H]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ay(o,q)?6:8
break
case 6:x=9
return P.bK(Q.i1(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bK(Q.i2(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bK(Q.i3(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.z(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aL()
case 1:return P.aM(v)}}})},
cu:function(a5,a6,a7,a8,a9){var $async$cu=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aR(0,new G.iR(t))
p=t.a
p.bc("=====")
p.bc(new G.iS(a6,q))
p.bc(new G.iT(a6))
if(a6.J(q,r)!==!0){p.bc("- firstAction not applicable")
z=1
break}o=q.d6(r)
p.bc(new G.iZ(a5,o))
p.bc(new G.j_(a5))
n=P.b1(null,B.bz)
m=P.Y(null,null,null,A.a7)
l=J.o(r)
k=l.gv(r)
for(j=new P.b3(a6.dn(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gG()
if(l.gv(r)!==k)throw H.c(new P.z("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.az(h)}s.a=0
r=t.b
case 3:if(!!n.gU(n)){z=4
break}++s.a
g=n.dD()
p.ag("----")
p.ag(new G.j0(g))
p.ag(new G.j1(g))
if(g.gcS()>a7||s.a>a8){p.ag(new G.j2(s,a7,g))
p.ag(new G.j3(g))
z=4
break}z=g.gbE().f.length===0?5:6
break
case 5:p.ag("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bd(0,new G.j4(t),new G.j5())
if(q==null){p.ag("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eV(q.d6(l),g.e,g.y)
p.ag(new G.iU(f))
z=7
x=[1]
return P.d1(P.hu(f),$async$cu,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gB(j):null).dL(l)
j=l.a
i=new H.J(j,new G.iV(t),[H.m(j,0)])
d=i.gm(i)
if(d>1)throw H.c(new P.z("World has several duplicates of mainActor: "+J.i(l)))
else if(d===0){p.fY("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aR(0,new G.iW(t))
c=J.e(e,q)
p.ag("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ag("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d6(l)
if(b==null)b=C.G
f=new B.eV(b,g.e,g.y)
p.ag(new G.iX(o,f))
p.ag(new G.iY(g))
z=8
x=[1]
return P.d1(P.hu(f),$async$cu,y)
case 8:p.ag("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b3(t.e5(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.J(e,l)!==!0)continue
for(a1=new P.b3(a2.dn(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bS(a4.gds(),0.05))continue
if(m.a5(0,a4.gbE()))continue
n.az(a4)}}p.ag("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d1(null,0,y)
case 2:return P.d1(v,1,y)}})
var z=0,y=P.pK($async$cu),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.r4(y)}},j8:{"^":"a:38;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.w(z)
return a.b-z}},j6:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},j7:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},j9:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},ja:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gW()+"' for "+H.b(this.a.cy)}},jb:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gW()+"' isn't applicable"}},jc:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gW()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jd:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gW()+"' leads to "+H.b(J.aI(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},je:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gW()+"' was scored "+this.b.k(0)}},iR:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},iS:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gW()+"' of "+H.b(this.b.gh())}},iT:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iZ:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j_:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c4(" ",z.y)+"- "+J.i(z.b)}},j0:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfv().gW()+"'"}},j1:{"^":"a:1;a",
$0:function(){var z=this.a.gbE().f
return"- situation: "+H.b(J.iF(z.length!==0?C.a.gB(z):null))}},j2:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcS()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},j3:{"^":"a:1;a",
$0:function(){var z=this.a.gbE().d
return"- how we got here: "+new H.ao(z,new G.iQ(),[H.m(z,0),null]).cQ(0," <- ")}},iQ:{"^":"a:0;",
$1:function(a){return a.gbb()}},j4:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j5:{"^":"a:1;",
$0:function(){return}},iU:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},iV:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},iW:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},iX:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iY:{"^":"a:1;a",
$0:function(){var z=this.a.gbE().d
return"- how we got here: "+new H.ao(z,new G.iP(),[H.m(z,0),null]).cQ(0," <- ")}},iP:{"^":"a:0;",
$1:function(a){return a.gbb()}}}],["","",,Z,{"^":"",mm:{"^":"d;a,b",
gbj:function(){return this.b},
gU:function(a){return this.b.length===0},
h8:function(a,b){var z=this
return P.aN(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$h8(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bK(t)
case 5:w=1
break
case 4:s=z.im(new Z.mp())
r=z.e4(new Z.mq(),[s])
q=z.e4(new Z.mr(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bA().bJ("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bA().bJ("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bA().bJ("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cp(t,new Z.ms(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.t(m,s)){w=17
break}if(l.t(m,r)){w=17
break}if(l.t(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ar)(t),++n
w=16
break
case 18:case 1:return P.aL()
case 2:return P.aM(u)}}})},
kn:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc6(y)
C.a.cp(y,new Z.mt(this,a))
x=this.a.a
w=x.gcn().bm(0,1/0,new Z.mu(a))
v=x.gcn().bm(0,-1/0,new Z.mv(a))
x=J.aj(v)
u=J.aj(w)
t=u.at(w,J.bT(x.at(v,w),0.1))
z.a=t
if(u.t(w,v)){t=J.bt(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.lR(y.length,new Z.mw(z,this,a,s),!1,P.K)
q=new H.ao(r,new Z.mx(C.a.bm(r,0,Z.u6())),[H.m(r,0),null]).bC(0,!1)
z=C.a.bm(q,0,Z.u7())
if(typeof z!=="number")return H.w(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.al(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.mQ(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
e4:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a5(b,t))continue
if(w==null||J.a6(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
im:function(a){return this.e4(a,C.e)},
w:{
mn:function(a){var z,y,x
z=a.gcc()
y=H.y(z,"v",0)
x=P.Q(new H.J(z,new Z.mo(a),[y]),!1,y)
if(x.length===0)$.$get$bA().eP("After removing actions scored by undefined, there are no recommendations.")
return x},
vN:[function(a,b){return J.al(a,b)},"$2","u6",4,0,42],
vO:[function(a,b){return J.al(a,b)},"$2","u7",4,0,43]}},mp:{"^":"a:0;",
$1:function(a){return a.gc5()}},mq:{"^":"a:0;",
$1:function(a){return J.iA(a.gbU())}},mr:{"^":"a:0;",
$1:function(a){return a.gcY()}},ms:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bU(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mt:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bU(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mu:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d4(a),H.d4(z))}},mv:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d4(a),H.d4(z))}},mw:{"^":"a:10;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.aX(J.bt(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mx:{"^":"a:0;a",
$1:function(a){return J.iI(J.bT(J.aX(a,this.a),1000))}},mo:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gk8()}}}],["","",,K,{"^":"",re:{"^":"a:3;",
$3:function(a,b,c){}},cb:{"^":"d;a,h:b<,c,d,jC:e<,f,bx:r<",
gjA:function(){return this.a},
gv:function(a){return C.b.gv(this.b)},
t:function(a,b){if(b==null)return!1
return b instanceof K.cb&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jD:function(a,b,c){return this.e.$3(a,b,c)},
w:{
a5:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.x])
z.af()
z.l(f)
return new K.cb(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",x:{"^":"d;jv:a<,W:b<,bb:c<,jZ:d<"}}],["","",,S,{"^":"",a_:{"^":"d;",
gaB:function(){return C.e},
gbj:function(){return C.e},
gh0:function(){return 3},
dL:function(a){return this.ay(this.gH(),a)},
h4:function(a,b){},
h5:function(a,b){},
kk:function(a,b){},
dw:function(a){},
d7:function(a){return!0}}}],["","",,S,{"^":"",
fD:function(a){var z=$.$get$bC().ad(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
mP:function(a,b){var z,y,x,w,v
z=$.$get$bC().kj()*b
for(y=new H.dB(a,a.gm(a),0,null,[H.y(a,"aU",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.w(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
mQ:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bC().ad(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.w(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
cP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.I(a)
y=z.aT(a,"{")
if(y!==-1){x=z.gm(a)
if(typeof x!=="number")return x.at()
x=y<x-1}else x=!1
if(x){w=H.r([],[P.t])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.w(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.o(r)
if(x.t(r,"{"))++s
else if(x.t(r,"|")&&s===1)w.push(u)
else if(x.t(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bC().ad(p)
z=z.aE(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.cP(C.b.aE(a,n+1,w[m])))
if(typeof v!=="number")return v.a7()
n=a.length
m+=C.b.aE(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cP(z)}else{x=z.gm(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.a7()
x=t+1
return z.aE(a,0,x)+H.b(S.cP(C.b.bF(a,x)))}}}else return a},
af:function(a,b,c,d){switch($.$get$bC().ad(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",a9:{"^":"d;aX:a<,aS:b<,aN:c<,h7:d<,e,dq:f@,ha:r<,h2:x<,eZ:y<,jz:z<,hL:Q<,d2:ch<,iY:cx<,k7:cy<,H:db<",
j:function(a,b){switch(b){case"string":return this.a
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
default:throw H.c(P.D("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aE(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a0:{"^":"d;a,H:b<,c",
gew:function(){return C.a.bR(this.a,new Y.o8())},
aK:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.b7(b).es(b,".")||C.b.es(b,"!")||C.b.es(b,"?"))&&C.b.d9(b,P.bg("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a9(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aK(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
I:function(a,b,c){return this.aK(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
j_:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return this.aK(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,m)},
fA:function(a,b,c){return this.aK(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
j6:function(a,b,c,d,e,f){return this.aK(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
dl:function(a,b,c,d){return this.aK(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
j3:function(a,b,c,d,e){return this.aK(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dl:function(a,b,c,d){return this.aK(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fB:function(a,b,c,d){return this.aK(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fC:function(a,b,c,d,e,f){return this.aK(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
j5:function(a,b,c,d,e,f){return this.aK(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
j1:function(a,b,c){return this.aK(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
j2:function(a,b,c,d){return this.aK(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
j4:function(a,b,c,d,e){return this.aK(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
ja:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.o6().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gB(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bQ(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gB(b))){z+="."
this.j6(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
j9:function(a,b,c,d){return this.ja(a,b,c,"and",3,null,null,d)},
fE:function(){return this.I(0,"\n\n",!0)},
bQ:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.I(a)
z=z.aT(a,"<owner's> "+H.b(b))!==-1||z.aT(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aT(a,"<object-owner's> "+H.b(b))!==-1||z.aT(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.I(a)
if(z.aT(a,"<subject's> "+H.b(b))!==-1||z.aT(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gbX()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.cU(a,b,"the "+H.b(b))
else{w=J.eI(c.gh(),P.bg("[aeiouy]",!1,!1))?z.cU(a,b,"an "+H.b(b)):z.cU(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eu:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaN()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaN()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaN().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaN().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaS().gi())}else z=!1
return z},
dK:function(a){var z=this
return P.aN(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dK(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aP(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaS()!=null?3:4
break
case 3:x=5
return t.gaS()
case 5:case 4:x=t.gaN()!=null?6:7
break
case 6:x=8
return t.gaN()
case 8:case 7:x=t.gh7()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aL()
case 2:return P.aM(v)}}})},
cR:[function(a){var z=J.aj(a)
if(z.aQ(a,0)||z.bL(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaN()}},"$1","gaN",2,0,23],
kl:function(a,b){var z
if(!this.aP(a)||!this.aP(b))return!1
if(this.eu(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].geZ()}return!1},
h6:function(a){var z
for(z=!1;this.gew();z=!0){a.$1(this.hb(!0))
this.kt()}return z},
hb:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bm(z,[],new Y.o9())
C.a.iI(z,new Y.oa(y),!1)
x=a&&this.gew()?C.a.aT(z,C.a.dt(z,new Y.ob()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eu(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdq())n=this.kl(s,p)&&this.hK(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdq()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdq(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].ghL()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjz()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd2())if(this.dj(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdq()}else n=!1
n=n||this.kK(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd2()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd2()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fD([" but "," but ",", but "])
u=!this.hx(s,s+1)&&!0}else{r+=S.fD([" and "," and ",", and "])
u=!0}}m=this.dT(s)
l=S.cP(m)
p=J.I(l)
if(p.a5(l,"{")===!0||p.a5(l,"}")===!0)$.$get$ic().dP('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dj(s,k)&&J.eI(this.dT(k),"<subject> ")&&p.d9(l,"<subject> ")}else k=!1
if(k)l=p.cU(l,"<subject> ","")
j=J.dc(l,"<action>",this.dT(s))
p=s-1
k=this.iL(s,p)
if(k)k=!(this.cR(s).ga2()===C.q&&this.bi(s).ga2()===C.q)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dj(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cR(p)!=null)if(this.bi(s)!=null)if(this.bi(p)!=null){k=this.cR(p)
k=k==null?k:k.gi()
i=this.bi(s)
if(J.e(k,i==null?i:i.gi())){k=this.bi(p)
k=k==null?k:k.ga2()
i=this.bi(s)
k=!J.e(k,i==null?i:i.ga2())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bi(p)!=null)if(this.cR(s)!=null){k=this.bi(p)
k=k==null?k:k.gi()
i=this.cR(s)
if(J.e(k,i==null?i:i.gi())){p=this.bi(p)
p=p==null?p:p.ga2()
k=this.bi(s)
p=!J.e(p,k==null?k:k.ga2())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gaS()
g=p.gaN()
f=p.gh7()
e=p.e
k=h!=null
if(k){if(h.gF()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga2()===C.C||h.ga2()===C.a0){d=H.n(d,"<s>","")
d=H.n(d,"<es>","")
d=H.n(d,"<sses>","ss")
d=H.n(d,"<ies>","y")
d=H.n(d,"<does>","do")
d=H.n(d,"<is>","are")
d=H.n(d,"<has>","have")}else{d=H.n(d,"<s>","s")
d=H.n(d,"<es>","es")
d=H.n(d,"<sses>","sses")
d=H.n(d,"<ies>","ies")
d=H.n(d,"<does>","does")
d=H.n(d,"<is>","is")
d=H.n(d,"<has>","has")}d=H.ir(d,"<subject>","<subjectNoun>",0)
i=h.ga2().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cr(this.bQ(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga2().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a5(j,P.bg("<subject>.+<subject's>",!0,!1))){c=h.ga2().c
d=H.n(d,"<subject's>",c)}d=J.cr(this.bQ(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga2().c
d=H.n(d,"<subject's>",i)
i=h.ga2().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga2().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gbX()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gF()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dc(this.bQ(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga2().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a5(j,P.bg("<object>.+<object's>",!0,!1))){i=g.ga2().c
d=H.n(d,"<object's>",i)}d=J.cr(this.bQ(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga2().c
d=H.n(d,"<object's>",i)
i=g.ga2().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga2().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga2().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga2().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fp(e,this.fp(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.o7(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd2())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd2()?r+".":r
return H.vg(z.charCodeAt(0)==0?z:z,$.$get$fX(),new Y.oc(),null)},
ci:function(){return this.hb(!1)},
kt:function(){var z,y
if(!this.gew()){C.a.sm(this.a,0)
return}z=this.a
y=C.a.aT(z,C.a.dt(z,new Y.od()))+1
P.c9(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hx:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
if(this.eu(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].geZ()}if(!this.dj(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gha()){if(b>=z.length)return H.f(z,b)
y=z[b].gha()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].gh2()){if(b>=z.length)return H.f(z,b)
z=z[b].gh2()}else z=!1
if(z)return!0
else return!1},
hK:function(a,b){var z,y,x,w,v
if(!this.aP(a)||!this.aP(b))return!1
for(z=new P.b3(this.dK(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b3(this.dK(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gG()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
dT:[function(a){var z=J.aj(a)
if(z.aQ(a,0)||z.bL(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaX()}},"$1","gaX",2,0,13],
bi:[function(a){var z=J.aj(a)
if(z.aQ(a,0)||z.bL(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaS()}},"$1","gaS",2,0,23],
kK:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gH()!=null){y=a-1
if(this.aP(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gH()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gH()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gH()
if(typeof y!=="number")return y.at()
if(typeof x!=="number")return H.w(x)
return y-x}},
k:function(a){return this.ci()},
aP:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fp:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gF()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dc(this.bQ(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga2().a)
z=H.n(H.n(J.cr(this.bQ(C.b.a5(c,P.bg(d+".+"+e,!0,!1))?H.n(z,e,a.ga2().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga2().c),g,a.ga2().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
iL:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaN()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaN()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaN().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaN().gi())},
dj:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaS().gi())},
w:{
o7:function(a){var z,y,x
z=!C.b.a5(a,"\n\n")?C.b.kP(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bF(z,1)}}},o8:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),"\n\n")}},o6:{"^":"a:24;",
$1:function(a){return C.b.eO(H.n(H.n(a,"<also> ",""),"  "," "))}},o9:{"^":"a:31;",
$2:function(a,b){var z,y,x
z=J.I(a)
y=z.gaq(a)?z.gB(a):null
if(y!=null&&y.gk7()&&J.e(b.giY(),y.cx)){x=z.gm(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.q(a,b)
return a}},oa:{"^":"a:30;a",
$1:function(a){return J.iC(this.a,a)}},ob:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),"\n\n")}},oc:{"^":"a:28;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},od:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),"\n\n")}},bb:{"^":"m4;bX:a<,h:b<,c,bf:d<,F:e<,a2:f<",
gi:function(){return H.aC(this)},
gcb:function(){return!0},
gbn:function(){return!0},
w:{
dk:function(a,b,c,d,e){var z=H.r([],[P.q])
return new Y.bb(c,b,z,e==null?$.$get$bR():e,!1,d)}}},m4:{"^":"d+dl;"},dl:{"^":"d;",
gaU:function(){return this.gbn()&&this.gcb()===!0},
ac:function(a,b,c,d,e,f,g,h,i,j,k,l){J.iB(a,b,c,d,e,f,g,h,i,j,H.T(this,"$isbb"),!1,l)},
aj:function(a,b){return this.ac(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
av:function(a,b,c){return this.ac(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
eH:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
ao:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
kB:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,null,!1,!1,d)},
bY:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cW:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
ck:function(a,b,c,d,e){return this.ac(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
ax:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
cj:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eI:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bs:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
cj:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
he:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
eJ:function(a,b,c,d,e){return this.ac(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
kz:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
hd:function(a,b,c,d){return this.ac(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kD:function(a,b,c,d,e,f){return this.ac(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
bZ:function(a,b,c,d,e){return this.ac(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
hc:function(a,b,c){return this.ac(a,b,c,!1,!1,!1,!1,null,null,!1,!1,!1)},
ky:function(a,b,c,d){return this.ac(a,b,c,!1,!1,!1,!1,d,null,!1,!1,!1)},
hf:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kC:function(a,b,c,d,e){return this.ac(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kE:function(a,b,c,d,e,f){return this.ac(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eI:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kA:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c7:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",rJ:{"^":"a:0;",
$1:function(a){a.gcE().b=2
return 2}},rP:{"^":"a:0;",
$1:function(a){a.gcE().b=0
return 0}},rI:{"^":"a:0;",
$1:function(a){a.gcE().b=1
return 1}},h4:{"^":"d;"},pz:{"^":"h4;i:a<",
Y:function(a){var z=new L.bk(null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h4))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.M(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.i(this.a)+",\n}"},
w:{
e5:function(a){var z=new L.bk(null,null)
a.$1(z)
return z.p()}}},bk:{"^":"d;a,b",
gi:function(){return this.gcE().b},
gcE:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcE().b
z=new L.pz(y)
if(y==null)H.h(P.l("id"))}this.l(z)
return z}}}],["","",,X,{"^":"",
hP:function(a,b){return P.aN(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hP(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.b9(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.b9(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aL()
case 1:return P.aM(v)}}})}}],["","",,A,{"^":"",a7:{"^":"d;em:a<,bW:b<,c,d,e,f,H:r<,x",
gjm:function(){var z=this.f
return z.length!==0?C.a.gB(z):null},
gv:function(a){var z,y,x,w,v
z=X.bs(this.a)
y=X.bs(this.d)
x=X.bs(this.f)
w=this.r
v=this.c
v=X.d3(X.aW(X.aW(0,C.d.gv(w)),J.j(v)))
return X.d3(X.aW(X.aW(X.aW(X.aW(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
t:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa7&&this.gv(this)===z.gv(b)},
fw:function(a){var z,y
z=this.hw(a,!0)
y=z.gX(z)
if(y.u()){y.gG()
return!0}return!1},
iW:function(a){var z,y
z=this.hv(a)
y=z.gX(z)
if(y.u()){y.gG()
return!0}return!1},
iX:function(a){var z=this.x
if(z==null)return!1
return C.b.a5(z.gh(),a)},
fN:function(a){var z,y,x
z=this.df(a)
if(z==null)throw H.c(new P.z("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ap()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ap:function(){++this.r},
dJ:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dU(0,new A.p5(a))
if(b!=null)z=z.c2(0,new A.p6(b))
if(c!=null)z=z.c2(0,new A.p7(c))
if(e!=null)z=z.c2(0,new A.p8(e))
return d!=null?z.c2(0,new A.p9(d)):z},
hw:function(a,b){return this.dJ(a,null,null,null,b)},
hv:function(a){return this.dJ(a,null,null,null,null)},
a0:function(a){return this.a.aR(0,new A.pa(a))},
dN:function(a){return this.e.aR(0,new A.pb(a))},
eR:function(a){var z,y
z=this.df(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
a8:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.D("No situation with name="+a+" found."))},
jO:function(a){var z=this.a.bd(0,new A.pc(a),new A.pd())
if(z==null)return!1
return z.gbn()},
aO:function(){var z,y
z=this.f
y=C.a.gB(z)
y.dw(this)
C.a.aa(z,y)},
bq:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gB(z).gh(),a)))break
y=C.a.gB(z)
y.dw(this)
C.a.aa(z,y)}if(z.length===0)throw H.c(P.D("Tried to pop situations until "+a+" but none was found in stack."))},
cV:function(a,b){var z,y
z=this.df(a)
if(z==null)throw H.c(P.D("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dE:function(a,b,c,d,e){var z,y,x,w
z=this.dJ(a,b,c,d,e)
y=z.gX(z)
if(y.u()){x=y.gG()
y=this.r
w=x.gH()
if(typeof w!=="number")return H.w(w)
return y-w}return},
kJ:function(a,b,c){return this.dE(null,a,b,c,null)},
c0:function(a,b,c){return this.dE(a,null,b,null,c)},
kI:function(a,b,c){return this.dE(a,b,null,null,c)},
kH:function(a){return this.dE(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.eb()
y.ar(0,z)
return"World<"+P.c2(y,"{","}")+">"},
Z:function(a,b){var z,y,x
z=this.a0(a)
y=z.Y(b)
x=this.a
x.aa(0,z)
x.q(0,y)},
df:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
hY:function(a){this.a.ar(0,a.a)
this.d.ar(0,a.d)
this.b.ar(0,a.b)
this.e.ar(0,a.e)
C.a.ar(this.f,a.f)
this.r=a.r},
w:{
e3:function(a){var z,y,x,w
z=P.Y(null,null,null,R.H)
y=P.b1(null,O.cs)
x=P.Y(null,null,null,U.as)
w=P.Y(null,null,null,null)
w=new A.a7(z,x,a.c,y,w,[],null,null)
w.hY(a)
return w}}},p5:{"^":"a:0;a",
$1:function(a){return a.gfz()===this.a}},p6:{"^":"a:0;a",
$1:function(a){return J.e(a.gdC(),this.a.gi())}},p7:{"^":"a:0;a",
$1:function(a){return a.gf_().a5(0,this.a.gi())}},p8:{"^":"a:0;a",
$1:function(a){return a.ghr()===this.a}},p9:{"^":"a:0;a",
$1:function(a){return a.ghp()===this.a}},pa:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pb:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pc:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pd:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aq:{"^":"a8;a1:b<"},bE:{"^":"aq;c,W:d<,L:e<,h:f<,b,a",
S:[function(a,b,c){throw H.c(new P.z("SimpleAction always succeeds"))},"$3","gO",6,0,2],
T:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gP",6,0,2],
am:function(a,b){throw H.c(new P.z("SimpleAction shouldn't have to provide roll reason"))},
K:function(a,b){return 1},
gM:function(){return!1},
J:function(a,b){return!0},
gN:function(){return H.h(new P.z("Not rerollable"))},
gR:function(){return!1}}}],["","",,N,{"^":"",jG:{"^":"E;M:c<,a1:d<,L:e<,R:f<,N:r<,b,a",
gal:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gan:function(){return"will <subject> confuse <object>?"},
S:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ao(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eI(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bs(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ax(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){return 0.6},
J:function(a,b){var z
if(a.gF()===!0)if(a.ga9()){z=b.a
z=new H.J(z,new N.jH(this),[H.m(z,0)])
z=z.gm(z)>=2&&!this.b.ez(b)}else z=!1
else z=!1
return z},
w:{
vr:[function(a){return new N.jG(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","ta",2,0,4]}},jH:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbn()){z=a.gbf()
y=this.a.b.gbf()
z=z.a
y=y.gi()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",k3:{"^":"E;R:c<,N:d<,M:e<,a1:f<,L:r<,b,a",
gal:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gan:function(){return"will <subject> kick the weapon off?"},
S:[function(a,b,c){S.af(new V.k4(this,a,c),new V.k5(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y
S.af(new V.k6(this,a,c),new V.k7(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cV(y.gi(),y.Y(new V.k8(this)))
z=this.b
b.Z(z.gi(),new V.k9())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gP",6,0,2],
K:function(a,b){var z=a.ga9()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
J:function(a,b){var z
if(a.ga9()||a.dx===C.i){z=this.b
z=z.ga3()&&!z.gb5()}else z=!1
return z},
w:{
vu:[function(a){return new V.k3(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tr",2,0,4]}},k4:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},k5:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> weapon",y)
y.av(z,"<subject> hold<s> onto it",!0)}},k6:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kE(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga_(),z,!0)}},k7:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.dl(0,"<owner's> <subject> fl<ies> away",y,y.ga_())}},k8:{"^":"a:26;a",
$1:function(a){a.gbI().q(0,this.a.b.ga_())
return a}},k9:{"^":"a:0;",
$1:function(a){a.sa_($.$get$eo())
return a}}}],["","",,R,{"^":"",lB:{"^":"E;R:c<,N:d<,M:e<,a1:f<,L:r<,b,a",
gh:function(){return"KickToGround"},
gal:function(){return"kick <object> to the ground"},
gan:function(){return"will <subject> kick <object> prone?"},
S:[function(a,b,c){S.af(new R.lC(this,a,c),new R.lD(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gO",6,0,2],
T:[function(a,b,c){var z
S.af(new R.lE(this,a,c),new R.lF(this,a,c,b.a8("FightSituation").gbx()),null,null)
z=this.b
b.Z(z.gi(),new R.lG())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gP",6,0,2],
K:function(a,b){var z=a.ga9()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
J:function(a,b){return(a.ga9()||a.dx===C.i)&&!this.b.ga3()},
w:{
vI:[function(a){return new R.lB(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","tY",2,0,4]}},lC:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},lD:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> shin",y)
y.av(z,"<subject> <does>n't budge",!0)}},lE:{"^":"a:1;a,b,c",
$0:function(){this.b.kC(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},lF:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.aj(z,"<subject> {grunt|shriek}<s>")
y.ax(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lG:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,F,{"^":"",ml:{"^":"a8;L:b<,M:c<,a1:d<,R:e<,N:f<,a",
gW:function(){return"Stand off."},
gh:function(){return"Pass"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){if(a.gF()===!0)a.aj(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gP",6,0,2],
am:function(a,b){return"WARNING this shouldn't be user-visible"},
K:function(a,b){return 1},
J:function(a,b){return!0}}}],["","",,Y,{"^":"",mz:{"^":"E;R:c<,N:d<,M:e<,a1:f<,L:r<,b,a",
gal:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gan:function(){return"will <subject> force <object> off balance?"},
S:[function(a,b,c){var z=this.b
a.hf(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
z.bY(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
a.hf(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
if(z.ga9()){z.he(c,"<subject> lose<s> <object>",!0,$.$get$em())
b.Z(z.x,new Y.mA())
C.a.q(b.f,U.m5(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gaL()){z.aj(c,"<subject> <is> already off balance")
c.fB(0,"<subject> make<s> <object> fall to the "+H.b(b.a8("FightSituation").gbx()),z,$.$get$ik())
b.Z(z.x,new Y.mB())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.z("enemy pose must be either standing or off-balance"))},"$3","gP",6,0,2],
K:function(a,b){var z=a.ga9()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
J:function(a,b){var z,y
if(!a.ga3()){z=a.d
if(z.gbe()||z.gk5()){z=this.b
if(!z.ga_().gcI()){z.ga_().gfG()
y=!1}else y=!0
z=y&&!z.ga3()}else z=!1}else z=!1
return z},
w:{
vP:[function(a){return new Y.mz(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","u8",2,0,4]}},mA:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return a}},mB:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,B,{"^":"",mX:{"^":"a8;L:b<,M:c<,a1:d<,R:e<,N:f<,a",
gW:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){if(a.gF()===!0)a.bs(c,"<subject> regain<s> <object>",$.$get$em(),!0)
b.Z(a.gi(),new B.mY())
return H.b(a.gh())+" regains balance"},"$3","gP",6,0,2],
am:function(a,b){return"Will "+a.ga2().a+" regain balance?"},
K:function(a,b){return 1},
J:function(a,b){return a.gaL()}},mY:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,O,{"^":"",nb:{"^":"a8;L:b<,M:c<,a1:d<,R:e<,N:f<,a",
gW:function(){return"Scramble."},
gh:function(){return"Scramble"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gP",6,0,2],
am:function(a,b){return"Will "+a.ga2().a+" crawl out of harm's way?"},
K:function(a,b){return 1},
J:function(a,b){if(!a.ga3())return!1
if(A.da(a,b))return!0
return!1}}}],["","",,Q,{"^":"",nW:{"^":"a8;L:b<,M:c<,a1:d<,R:e<,N:f<,a",
gW:function(){return"Stand up."},
gh:function(){return"StandUp"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){a.aj(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.af(new Q.nX(a,c),new Q.nY(a,c),null,null)
b.Z(a.gi(),new Q.nZ())
return H.b(a.gh())+" stands up"},"$3","gP",6,0,2],
am:function(a,b){return"Will "+a.ga2().a+" stand up?"},
K:function(a,b){return 1},
J:function(a,b){if(!a.ga3())return!1
if(A.da(a,b))return!1
return!0}},nX:{"^":"a:1;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},nY:{"^":"a:1;a,b",
$0:function(){return this.a.aj(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},nZ:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,T,{"^":"",
wd:[function(a){return new A.ag(T.ex(),null,null,new T.uf(),new T.ug(),new T.uh(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","v3",2,0,4],
we:[function(a){return new A.ag(T.ex(),new T.ui(),T.ex(),new T.uj(),new T.uk(),new T.ul(),new T.um(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","v4",2,0,4],
wf:[function(a,b,c,d,e){a.ao(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Z(a.gi(),new T.un())},"$5","ex",10,0,8],
uf:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga3()&&a.gb5()&&c.gb5()}},
ug:{"^":"a:3;",
$3:function(a,b,c){return Y.eQ(a,c)}},
uh:{"^":"a:3;",
$3:function(a,b,c){return S.dK(a,c,C.l)}},
uj:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga3()&&a.gb5()&&c.gb5()}},
uk:{"^":"a:3;",
$3:function(a,b,c){return Y.eQ(a,c)}},
ul:{"^":"a:3;",
$3:function(a,b,c){return S.dK(a,c,C.m)}},
ui:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
um:{"^":"a:3;",
$3:function(a,b,c){return S.dK(a,c,C.p)}},
un:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,A,{"^":"",ag:{"^":"E;c,d,e,f,r,x,y,z,L:Q<,M:ch<,a1:cx<,h:cy<,R:db<,N:dx<,al:dy<,an:fr<,b,a",
S:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
J:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
wg:[function(a){return new A.ag(M.ey(),null,null,new M.uo(),new M.up(),new M.uq(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","v5",2,0,4],
wh:[function(a){return new A.ag(M.ey(),new M.ur(),M.ey(),new M.us(),new M.ut(),new M.uu(),new M.uv(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","v6",2,0,4],
wi:[function(a,b,c,d,e){if(a.ga3()){a.hc(c,"<subject> roll<s>",e.gi())
a.hc(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.ky(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","ey",10,0,8],
uo:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&!c.ga3()&&!A.da(a,b)}},
up:{"^":"a:3;",
$3:function(a,b,c){return F.ff(a,c)}},
uq:{"^":"a:3;",
$3:function(a,b,c){return V.dy(a,c,C.l)}},
us:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&!c.ga3()&&!A.da(a,b)}},
ut:{"^":"a:3;",
$3:function(a,b,c){return F.ff(a,c)}},
uu:{"^":"a:3;",
$3:function(a,b,c){return V.dy(a,c,C.m)}},
ur:{"^":"a:3;",
$3:function(a,b,c){return a.ga9()?0.4:0.2}},
uv:{"^":"a:3;",
$3:function(a,b,c){return V.dy(a,c,C.p)}}}],["","",,U,{"^":"",
wj:[function(a){return new A.ag(U.ez(),null,null,new U.uw(),new U.ux(),new U.uy(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","v7",2,0,4],
wk:[function(a){return new A.ag(U.ez(),new U.uz(),U.ez(),new U.uA(),new U.uB(),new U.uC(),new U.uD(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","v8",2,0,4],
wl:[function(a,b,c,d,e){c.j5(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","ez",10,0,8],
uw:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()!==!0)z=(a.ga9()||a.dx===C.i)&&!c.ga3()&&a.gb5()
else z=!1
return z}},
ux:{"^":"a:3;",
$3:function(a,b,c){return Q.fC(a,c)}},
uy:{"^":"a:3;",
$3:function(a,b,c){return Z.dS(a,c,C.l)}},
uA:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()===!0)z=(a.ga9()||a.dx===C.i)&&!c.ga3()&&a.gb5()
else z=!1
return z}},
uB:{"^":"a:3;",
$3:function(a,b,c){return Q.fC(a,c)}},
uC:{"^":"a:3;",
$3:function(a,b,c){return Z.dS(a,c,C.m)}},
uz:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uD:{"^":"a:3;",
$3:function(a,b,c){return Z.dS(a,c,C.p)}}}],["","",,G,{"^":"",
wm:[function(a){return new A.ag(G.eA(),null,null,new G.uG(),new G.uH(),new G.uI(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","v9",2,0,4],
wr:[function(a){return new A.ag(G.eA(),new G.uR(),G.eA(),new G.uS(),new G.uT(),new G.uU(),new G.uV(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","va",2,0,4],
ws:[function(a,b,c,d,e){return a.eJ(c,"<subject> swing<s> {"+H.b(U.ac(a))+" |}at <object>",e.gi(),!0,d)},"$5","eA",10,0,8],
uG:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga9()&&!c.ga3()&&a.d.gbe()}},
uH:{"^":"a:3;",
$3:function(a,b,c){return M.bF(a,c)}},
uI:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.l)}},
uS:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga9()&&!c.ga3()&&a.d.gbe()}},
uT:{"^":"a:3;",
$3:function(a,b,c){return M.bF(a,c)}},
uU:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.m)}},
uR:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uV:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.p)}}}],["","",,R,{"^":"",
wn:[function(a,b,c,d,e){return a.he(c,"<subject> completely miss<es> <object> with "+H.b(U.ac(a)),!0,d)},"$5","ip",10,0,12],
wo:[function(a){return new A.ag(R.iq(),new R.uJ(),R.ip(),new R.uK(),new R.uL(),new R.uM(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vb",2,0,4],
wp:[function(a){return new A.ag(R.iq(),new R.uN(),R.ip(),new R.uO(),new R.uP(),new R.uQ(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vc",2,0,4],
wq:[function(a,b,c,d,e){return a.eJ(c,"<subject> swing<s> {"+H.b(U.ac(a))+" |}at <object>",e.gi(),!0,d)},"$5","iq",10,0,8],
uK:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gaL()&&!c.ga3()&&a.d.gbe()}},
uL:{"^":"a:3;",
$3:function(a,b,c){return M.bF(a,c)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.l)}},
uJ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uO:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gaL()&&!c.ga3()&&a.d.gbe()}},
uP:{"^":"a:3;",
$3:function(a,b,c){return M.bF(a,c)}},
uQ:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.m)}},
uN:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
wt:[function(a){return new A.ag(D.eB(),null,null,new D.uW(),new D.uX(),new D.uY(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vd",2,0,4],
wu:[function(a){return new A.ag(D.eB(),new D.uZ(),D.eB(),new D.v_(),new D.v0(),new D.v1(),new D.v2(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","ve",2,0,4],
wv:[function(a,b,c,d,e){return a.ao(c,"<subject> strike<s> down {with "+H.b(U.ac(a))+" |}at <object>",d)},"$5","eB",10,0,12],
uW:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga3()&&!a.ga3()&&a.d.gbe()}},
uX:{"^":"a:3;",
$3:function(a,b,c){return D.fZ(a,c)}},
uY:{"^":"a:3;",
$3:function(a,b,c){return V.dI(a,c,C.l)}},
v_:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga3()&&!a.ga3()&&a.d.gbe()}},
v0:{"^":"a:3;",
$3:function(a,b,c){return D.fZ(a,c)}},
v1:{"^":"a:3;",
$3:function(a,b,c){return V.dI(a,c,C.m)}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v2:{"^":"a:3;",
$3:function(a,b,c){return V.dI(a,c,C.p)}}}],["","",,M,{"^":"",oA:{"^":"cH;a1:c<,b,a",
gL:function(){return"A different weapon might change the battle."},
gM:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gR:function(){return!1},
gN:function(){return},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cV(y.gi(),y.Y(new M.oB(this)))
b.Z(a.gi(),new M.oC(this,a))
z=this.b
a.ao(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gP",6,0,2],
am:function(a,b){return H.h(new P.aa(null))},
K:function(a,b){return 1},
J:function(a,b){var z
if(!(this.b instanceof L.b2))return!1
a.gjf()
z=b.c0("DisarmKick",a,!0)
if(z!=null&&z<=2)return!1
return!0},
w:{
vT:[function(a){return new M.oA(!0,a,null)},"$1","vi",2,0,47]}},oB:{"^":"a:26;a",
$1:function(a){a.gbI().aa(0,this.a.b)
return a}},oC:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb5())a.gbW().q(0,a.ga_())
a.sa_(H.T(this.a.b,"$isb2"))}}}],["","",,M,{"^":"",p3:{"^":"a8;L:b<,R:c<,N:d<,M:e<,a1:f<,a",
gW:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){a.aj(c,"<subject> shake<s> <subject's> head violently")
if(a.gF()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kA(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gP",6,0,2],
am:function(a,b){return"WARNING this shouldn't be user-visible"},
K:function(a,b){return 1},
J:function(a,b){var z
if(a.ez(b)){z=b.c0("Confuse",a,!0)
if(typeof z!=="number")return z.b7()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",kX:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
b.Z(z.gi(),new R.kY())
if(J.e(z.gi(),100))a.bs(c,"<subject> smash<es> <object's> head to the ground",z,!0)
else a.bs(c,"<subject> break<s> <object's> neck",z,!0)
X.co(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gP",6,0,2],
K:function(a,b){return 1},
J:function(a,b){return!0},
w:{
vz:[function(a){return new R.kX(null,!0,!0,!0,C.c,a,null)},"$1","ty",2,0,4]}},kY:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}}}],["","",,Y,{"^":"",
eQ:function(a,b){var z=new Y.df(null,null,null,null,null)
new Y.t1(a,b).$1(z)
return z.p()},
eP:{"^":"a_;",
gaB:function(){return[R.ty()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ap:function(){var z=new Y.df(null,null,null,null,null)
z.l(this)
new Y.ju().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a0(this.a)
return},
aD:function(a,b){return new H.J(a,new Y.jv(this),[H.m(a,0)])}},
t1:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gi()
a.gaY().b=z
z=this.b.gi()
a.gaY().d=z
return a}},
ju:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.a7()
a.gaY().e=z+1
return a}},
jv:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
ph:{"^":"eP;a,i:b<,c,H:d<",
Y:function(a){var z=new Y.df(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eP))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
df:{"^":"d;a,b,c,d,e",
gi:function(){return this.gaY().c},
gH:function(){return this.gaY().e},
gaY:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaY().b
x=this.gaY().c
w=this.gaY().d
v=this.gaY().e
z=new Y.ph(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",kG:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gan:function(){return"will <subject> evade?"},
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {dodge it|break free}")
S.af(new Z.kH(a,c),new Z.kI(this,a,c),null,null)
b.aO()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.bq("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gB(z):null).gbr().bp(0.5)},
J:function(a,b){return!0},
w:{
vy:[function(a){return new Z.kG("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tv",2,0,4]}},kH:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>}",!0)}},kI:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dK:function(a,b,c){var z=new S.dJ(null,null,null,null,null,null)
new S.t0(a,b,c).$1(z)
return z.p()},
fs:{"^":"bY;",
gaB:function(){return[Z.tv()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ap:function(){var z=new S.dJ(null,null,null,null,null,null)
z.l(this)
new S.mf().$1(z)
return z.p()}},
t0:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
mf:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.a7()
a.gaJ().f=z+1
return a}},
pq:{"^":"fs;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new S.dJ(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fs))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dJ:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaJ().c},
gH:function(){return this.gaJ().f},
gaJ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaJ().b
x=this.gaJ().c
w=this.gaJ().d
v=this.gaJ().e
u=this.gaJ().f
z=new S.pq(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",
da:function(a,b){var z,y,x,w
z=b.c0("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c0("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c0("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c0("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
ac:function(a){return a.ga_().gbX()===!0?a.ga_().gh():"<subject's> "+H.b(a.ga_().gh())}}],["","",,G,{"^":"",
w2:[function(a,b,c,d,e){a.aj(c,"<subject> tr<ies> to swing back")
a.eI(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga9()){b.Z(a.x,new G.td())
a.cj(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.Z(a.x,new G.te())
a.ax(c,"<subject> lose<s> balance because of that",!0)
a.cj(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hU",10,0,12],
w3:[function(a){return new A.ag(G.hV(),new G.tf(),G.hU(),new G.tg(),new G.th(),new G.ti(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tn",2,0,4],
w5:[function(a,b,c,d,e){return a.ao(c,"<subject> swing<s> back",d)},"$5","hV",10,0,8],
w4:[function(a){return new A.ag(G.hV(),new G.tj(),G.hU(),new G.tk(),new G.tl(),new G.tm(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","to",2,0,4],
td:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return a}},
te:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},
tg:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga_().gbe()&&!a.ga3()}},
th:{"^":"a:3;",
$3:function(a,b,c){return M.bF(a,c)}},
ti:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.l)}},
tf:{"^":"a:3;",
$3:function(a,b,c){return c.ga9()?0.7:0.9}},
tk:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga_().gbe()&&!a.ga3()}},
tl:{"^":"a:3;",
$3:function(a,b,c){return M.bF(a,c)}},
tm:{"^":"a:3;",
$3:function(a,b,c){return L.bi(a,c,C.m)}},
tj:{"^":"a:3;",
$3:function(a,b,c){return c.ga9()?0.7:0.9}}}],["","",,V,{"^":"",jP:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gan:function(){return"will <subject> tackle <objectPronoun>?"},
S:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to tackle <object>",z)
S.af(new V.jQ(a,c),new V.jR(this,c),null,null)
a.ao(c,"<subject> land<s> on the "+H.b(U.er(b))+" next to <object>",z)
b.Z(a.gi(),new V.jS())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tackle<s> <object> to the ground",z)
b.Z(z.gi(),new V.jT())
b.Z(a.gi(),new V.jU())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){var z=this.b.gaL()?0.2:0
if(a.gF()===!0)return 0.7+z
return 0.5+z},
J:function(a,b){return!a.ga3()&&a.d instanceof K.c0},
w:{
vs:[function(a){return new V.jP("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tp",2,0,4]}},jQ:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> go<es> wide",!0)}},jR:{"^":"a:1;a,b",
$0:function(){return this.a.b.av(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},jS:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},jT:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},jU:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,S,{"^":"",
dj:function(a,b){var z=new S.di(null,null,null,null,null)
new S.rS(a,b).$1(z)
return z.p()},
eW:{"^":"a_;",
gaB:function(){return[G.tn(),G.to(),V.tp()]},
gbj:function(){return[$.$get$dM()]},
gh:function(){return"CounterAttackSituation"},
ap:function(){var z=new S.di(null,null,null,null,null)
z.l(this)
new S.jN().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a0(this.a)
return},
aD:function(a,b){return new H.J(a,new S.jO(this),[H.m(a,0)])}},
rS:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaZ().c=z
a.gaZ().e=0
z=this.a.gi()
a.gaZ().b=z
z=this.b.gi()
a.gaZ().d=z
return a}},
jN:{"^":"a:0;",
$1:function(a){var z=a.gaZ().e
if(typeof z!=="number")return z.a7()
a.gaZ().e=z+1
return a}},
jO:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pi:{"^":"eW;a,i:b<,c,H:d<",
Y:function(a){var z=new S.di(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eW))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
di:{"^":"d;a,b,c,d,e",
gi:function(){return this.gaZ().c},
gH:function(){return this.gaZ().e},
gaZ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaZ().b
x=this.gaZ().c
w=this.gaZ().d
v=this.gaZ().e
z=new S.pi(y,x,w,v)
if(y==null)H.h(P.l("counterAttacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,X,{"^":"",
co:function(a,b,c){var z,y,x
z=b.a8("FightSituation")
y=z.gbx()
x=!J.e(c.gi(),100)
b.cV(z.gi(),z.Y(new X.tZ(c,x)))
if(c.gai()===C.f){c.ax(a,"<subject> stop<s> moving",!0)
a.I(0,"\n\n",!0)
return}switch($.$get$hG().ad(3)){case 0:c.cj(a,"<subject> collapse<s>"+(x?", dead":""),!0,!0)
break
case 1:c.ax(a,"<subject> fall<s> backward",!0)
c.ax(a,"<subject> twist<s>",!0)
c.cj(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ax(a,"<subject> drop<s> to <subject's> knees",!0)
c.ax(a,"<subject> keel<s> over",!0)
break}a.I(0,"\n\n",!0)},
tZ:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!z.gb5()&&this.b)a.gbI().q(0,z.d)
return a}}}],["","",,O,{"^":"",bY:{"^":"nE;",
ay:function(a,b){if(a===0)return b.a0(this.gcl())
return},
aD:function(a,b){return new H.J(a,new O.jZ(this),[H.m(a,0)])}},nE:{"^":"a_+mC;"},jZ:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcG())||J.e(a.gi(),z.gcl())}}}],["","",,U,{"^":"",
er:function(a){return a.a8("FightSituation").gbx()},
dn:function(a,b,c,d,e){var z=new U.c_(null,null,null,null,null,null,null,null,null)
new U.rh(a,b,c,d,e).$1(z)
return z.p()},
cF:{"^":"a_;",
gaB:function(){return[N.ta(),V.tr(),R.tY(),Y.u8(),T.v3(),T.v4(),M.v5(),M.v6(),U.v7(),U.v8(),G.v9(),G.va(),D.vd(),D.ve(),R.vb(),R.vc(),M.vi()]},
gbj:function(){return H.r([$.$get$fF(),$.$get$fW(),$.$get$fJ(),$.$get$hm()],[Q.a8])},
gh0:function(){return 1000},
gh:function(){return"FightSituation"},
cH:function(a,b){var z=b.a
return(z&&C.a).bR(z,new U.kK(a))},
ap:function(){var z=new U.c_(null,null,null,null,null,null,null,null,null)
z.l(this)
new U.kL().$1(z)
return z.p()},
ay:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hP(this.f,this.b)
y=H.by(z,new U.kM(b),H.y(z,"v",0),null)
x=H.y(y,"v",0)
w=P.Q(new H.J(y,new U.kN(),[x]),!1,x)
x=H.m(w,0)
v=P.Q(new H.J(w,new U.kO(),[x]),!1,x)
u=v.length===1?C.a.gc6(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.bd(0,new U.kP(q),new U.kQ())
o=p==null?p:p.gH()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.w(o)
m=n-o
if(m<=0)continue
l=x.bd(0,new U.kR(q),new U.kS())
k=l==null?l:l.gH()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.w(k)
j=(x-k+m)/2
if(q.gF()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aD:function(a,b){return new H.J(a,new U.kT(this),[H.m(a,0)])},
h5:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a6(z))y.j(0,z).$2(a,b)},
dw:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cH(a,this.b)&&this.cH(a,this.f)){y=a.eR(z)
a.cV(y.gi(),y.Y(new U.kU()))
for(z=this.f,x=z.a,x=new J.b9(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.u();){v=x.d
if(a.a0(v).gaU()){u=a.a0(v)
t=u.Y(new U.kV())
w.aa(0,u)
w.q(0,t)}}C.a.q(a.f,X.lU(z,this.d,this.a,null))}else this.cH(a,this.f)},
d7:function(a){var z=this.f
if(this.cH(a,z))if(this.cH(a,this.b)){z=z.a
z=(z&&C.a).bR(z,new U.kW(a))}else z=!1
else z=!1
return z}},
rh:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$V().ad(1073741823)
a.gak().f=z
a.gak().y=0
z=a.gak()
y=z.r
if(y==null){y=new S.N(null,null,[P.t])
y.af()
y.l(C.e)
z.r=y
z=y}else z=y
z.l(J.eH(this.a,new U.qT()))
z=a.gak()
y=z.c
if(y==null){y=new S.N(null,null,[P.t])
y.af()
y.l(C.e)
z.c=y
z=y}else z=y
y=this.b
z.l(new H.ao(y,new U.qU(),[H.m(y,0),null]))
a.gak().e=this.c
y=new S.N(null,null,[U.as])
y.af()
y.l(C.e)
a.gak().b=y
y=this.d.gi()
a.gak().x=y
y=new A.cK(null,null,[P.t,{func:1,v:true,args:[A.a7,Y.a0]}])
y.c9()
y.l(this.e)
a.gak().d=y
return a}},
qT:{"^":"a:0;",
$1:function(a){return a.gi()}},
qU:{"^":"a:0;",
$1:function(a){return a.gi()}},
kK:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gaU()}},
kL:{"^":"a:0;",
$1:function(a){var z=a.gak().y
if(typeof z!=="number")return z.a7()
a.gak().y=z+1
return a}},
kM:{"^":"a:0;a",
$1:function(a){return this.a.a0(a)}},
kN:{"^":"a:0;",
$1:function(a){return a.gaU()}},
kO:{"^":"a:0;",
$1:function(a){return a.gF()}},
kP:{"^":"a:0;a",
$1:function(a){return J.e(a.gdC(),this.a.gi())&&a.ghq()===!0}},
kQ:{"^":"a:1;",
$0:function(){return}},
kR:{"^":"a:0;a",
$1:function(a){return J.e(a.gdC(),this.a.gi())}},
kS:{"^":"a:1;",
$0:function(){return}},
kT:{"^":"a:25;a",
$1:function(a){var z,y,x
if(a.gaU()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a5(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a5(z,y)
z=y}else z=!0}else z=!1
return z}},
kU:{"^":"a:0;",
$1:function(a){a.ski(!1)
return a}},
kV:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}},
kW:{"^":"a:29;a",
$1:function(a){var z=this.a.a0(a)
return z.gF()===!0&&z.gaU()}},
pk:{"^":"cF;bI:a<,b,c,bx:d<,i:e<,dA:f<,r,H:x<",
Y:function(a){var z=new U.c_(null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cF))return!1
if(J.e(this.a,b.a))if(J.e(this.b,b.b))if(J.e(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.e(this.f,b.f))if(J.e(this.r,b.r)){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.i(this.a)+",\nenemyTeamIds="+J.i(this.b)+",\nevents="+J.i(this.c)+",\ngroundMaterial="+J.i(this.d)+",\nid="+J.i(this.e)+",\nplayerTeamIds="+J.i(this.f)+",\nroomRoamingSituationId="+H.b(J.i(this.r))+",\ntime="+J.i(this.x)+",\n}"}},
c_:{"^":"d;a,b,c,d,e,f,r,x,y",
gbI:function(){var z,y
z=this.gak()
y=z.b
if(y==null){y=new S.N(null,null,[U.as])
y.af()
y.l(C.e)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gak().e},
gi:function(){return this.gak().f},
gdA:function(){var z,y
z=this.gak()
y=z.r
if(y==null){y=new S.N(null,null,[P.t])
y.af()
y.l(C.e)
z.r=y
z=y}else z=y
return z},
gH:function(){return this.gak().y},
gak:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.af()
y.l(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.af()
y.l(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cK(null,null,[H.m(z,0),H.m(z,1)])
y.c9()
y.l(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.af()
y.l(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gak()
x=y.b
if(x==null){x=new S.N(null,null,[U.as])
x.af()
x.l(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gak()
w=x.c
if(w==null){w=new S.N(null,null,[P.t])
w.af()
w.l(C.e)
x.c=w
x=w}else x=w
x=x.p()
w=this.gak()
v=w.d
if(v==null){v=new A.cK(null,null,[P.t,{func:1,v:true,args:[A.a7,Y.a0]}])
v.c9()
v.l(C.Y)
w.d=v
w=v}else w=v
w=w.p()
v=this.gak().e
u=this.gak().f
t=this.gak()
s=t.r
if(s==null){s=new S.N(null,null,[P.t])
s.af()
s.l(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.gak().x
r=this.gak().y
z=new U.pk(y,x,w,v,u,t,s,r)
if(y==null)H.h(P.l("droppedItems"))
if(x==null)H.h(P.l("enemyTeamIds"))
if(w==null)H.h(P.l("events"))
if(v==null)H.h(P.l("groundMaterial"))
if(u==null)H.h(P.l("id"))
if(t==null)H.h(P.l("playerTeamIds"))
if(s==null)H.h(P.l("roomRoamingSituationId"))
if(r==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,R,{"^":"",kZ:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"FinishLeap"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x,w
z=this.b
b.Z(z.gi(),new R.l_())
b.Z(a.gi(),new R.l0())
y=b.a8("LeapSituation").gi()
x=U.er(b)
a.ck(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.j1(0,"both "+(a.gF()===!0||z.gF()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gah()
if(typeof w!=="number")return w.b7()
if(w>1){c.j2(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.ax(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.Z(z.x,new R.l1())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){return 1},
J:function(a,b){return!0},
w:{
vA:[function(a){return new R.kZ(null,!0,!0,!0,C.c,a,null)},"$1","tz",2,0,4]}},l_:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},l0:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},l1:{"^":"a:0;",
$1:function(a){var z=a.gah()
if(typeof z!=="number")return z.at()
a.sah(z-1)
return a}}}],["","",,S,{"^":"",ka:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gan:function(){return"will <subject> dodge?"},
S:[function(a,b,c){var z=b.a8("LeapSituation").gi()
a.hd(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaL())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.af(new S.kb(a,c,z),new S.kc(a,c,z),null,null)
b.aO()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x
z=b.a8("LeapSituation").gi()
y=U.er(b)
x=this.b
a.ck(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.ax(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Z(x.gi(),new S.kd())
b.bq("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gP",6,0,2],
K:function(a,b){var z,y,x
z=a.ga9()?0:0.2
y=this.b.ga3()?0.2:0
if(a.Q===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gB(x):null).gbr().bp(0.5-z+y)},
J:function(a,b){return!a.ga3()},
w:{
vv:[function(a){return new S.ka("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","ts",2,0,4]}},kb:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kc:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kd:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,D,{"^":"",lc:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gan:function(){return"will <subject> impale <objectPronoun>?"},
S:[function(a,b,c){var z,y
z=b.a8("LeapSituation").gi()
y=this.b
a.eJ(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ac(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaL())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.af(new D.ld(a,c,z),new D.le(a,c,z),null,null)
b.aO()
return H.b(a.cy)+" fails to impale "+H.b(y.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x
z=b.a8("LeapSituation").gi()
y=this.b
a.ck(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ac(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.ax(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gah()
if(typeof x!=="number")return x.b7()
if(x>1){a.ga_().ao(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ax(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
y.aj(c,"<subject> fall<s> to the ground")
b.Z(y.x,new D.lf())}else{a.ga_().ao(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.ax(c,"<subject> go<es> down",!0)
X.co(c,b,y)
b.Z(y.x,new D.lg())}b.bq("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.cy)},"$3","gP",6,0,2],
K:function(a,b){var z,y,x
z=a.ga9()?0:0.2
y=this.b.ga3()?0.2:0
if(a.Q===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gB(x):null).gbr().bp(0.4-z+y)},
J:function(a,b){return!a.ga3()&&a.d.geB()},
w:{
vE:[function(a){return new D.lc("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","tQ",2,0,4]}},ld:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},le:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lf:{"^":"a:0;",
$1:function(a){var z=a.gah()
if(typeof z!=="number")return z.at()
a.sah(z-1)
a.sai(C.f)
return a}},lg:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}}}],["","",,V,{"^":"",
dy:function(a,b,c){var z=new V.dx(null,null,null,null,null,null)
new V.rZ(a,b,c).$1(z)
return z.p()},
fd:{"^":"bY;",
gaB:function(){return[S.ts(),D.tQ()]},
gh:function(){return"LeapDefenseSituation"},
ap:function(){var z=new V.dx(null,null,null,null,null,null)
z.l(this)
new V.lI().$1(z)
return z.p()}},
rZ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaF().c=z
a.gaF().f=0
z=this.a.gi()
a.gaF().b=z
z=this.b.gi()
a.gaF().e=z
a.gaF().d=this.c
return a}},
lI:{"^":"a:0;",
$1:function(a){var z=a.gaF().f
if(typeof z!=="number")return z.a7()
a.gaF().f=z+1
return a}},
pl:{"^":"fd;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new V.dx(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fd))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dx:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaF().c},
gH:function(){return this.gaF().f},
gaF:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaF().b
x=this.gaF().c
w=this.gaF().d
v=this.gaF().e
u=this.gaF().f
z=new V.pl(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,F,{"^":"",
ff:function(a,b){var z=new F.dz(null,null,null,null,null)
new F.t_(a,b).$1(z)
return z.p()},
fe:{"^":"a_;",
gaB:function(){return[R.tz()]},
gh:function(){return"LeapSituation"},
ap:function(){var z=new F.dz(null,null,null,null,null)
z.l(this)
new F.lJ().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a0(this.a)
return},
aD:function(a,b){return new H.J(a,new F.lK(this),[H.m(a,0)])}},
t_:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gb_().c=z
a.gb_().e=0
z=this.a.gi()
a.gb_().b=z
z=this.b.gi()
a.gb_().d=z
return a}},
lJ:{"^":"a:0;",
$1:function(a){var z=a.gb_().e
if(typeof z!=="number")return z.a7()
a.gb_().e=z+1
return a}},
lK:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pm:{"^":"fe;a,i:b<,c,H:d<",
Y:function(a){var z=new F.dz(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fe))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dz:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb_().c},
gH:function(){return this.gb_().e},
gb_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb_().b
x=this.gb_().c
w=this.gb_().d
v=this.gb_().e
z=new F.pm(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",ji:{"^":"a8;M:b<,a1:c<,R:d<,N:e<,a",
gW:function(){return""},
gL:function(){return},
gh:function(){return"AutoLoot"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.a8("LootSituation")
y=b.a0(100)
if(y.gcb()===!0&&!y.gbn()){a.ao(c,"<subject> kneel<s> next to <object>",y)
a.ao(c,"<subject> help<s> <object> to <object's> feet",y)
y.eH(c,'"I\'ll live," <subject> say<s>.',!0)
b.Z(100,new Z.jq())}x=[]
for(w=z.gbI(),w=w.gX(w),v=b.a,u=null;w.u();){t=w.d
if(t instanceof L.b2){s=t.gco()
r=t.gcZ()
q=a.ga_().gae()
if(typeof q!=="number")return H.w(q)
q=s+r>q
s=q}else s=!1
if(s){p=b.a0(a.gi())
o=p.Y(new Z.jr(a,t))
v.aa(0,p)
v.q(0,o)
u=t}else{p=b.a0(a.gi())
o=p.Y(new Z.js(t))
v.aa(0,p)
v.q(0,o)
x.push(t)}}if(u!=null){a.ao(c,"<subject> pick<s> up <object>",u)
a.ao(c,"<subject> wield<s> <object>",u)}this.ih(x,a,z,b,c)
if(x.length!==0)c.j9("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gP",6,0,2],
am:function(a,b){return"WARNING this shouldn't be user-visible"},
K:function(a,b){return 1},
J:function(a,b){return a.gF()},
ih:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=L.b2
y=P.Q(new H.J(a,new Z.jj(),[H.m(a,0)]),!0,z)
x=b.gbW()
x.toString
C.a.ar(y,H.u_(new H.J(x,new Z.jk(),[H.m(x,0)]),"$isv"))
if(y.length===0)return
C.a.cp(y,new Z.jl())
w=c.gdA().aV(0,new Z.jm(d)).dU(0,new Z.jn())
for(z=J.am(w.a),x=new H.ce(z,w.b,[H.m(w,0)]),v=d.a;x.u();){u=z.gG()
if(y.length===0)break
t=C.a.ku(y)
s=d.a0(u.gi())
r=s.Y(new Z.jo(t))
v.aa(0,s)
v.q(0,r)
C.a.aa(a,t)
s=d.a0(b.gi())
r=s.Y(new Z.jp(t))
v.aa(0,s)
v.q(0,r)
b.ao(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jq:{"^":"a:0;",
$1:function(a){a.sai(C.i)
a.sah(1)
return a}},jr:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.ga_() instanceof K.c0))a.gbW().q(0,z.ga_())
a.sa_(this.b)}},js:{"^":"a:0;a",
$1:function(a){a.gbW().q(0,this.a)
return a}},jj:{"^":"a:0;",
$1:function(a){return a instanceof L.b2}},jk:{"^":"a:0;",
$1:function(a){return a instanceof L.b2}},jl:{"^":"a:7;",
$2:function(a,b){return J.bU(a.gae(),b.gae())}},jm:{"^":"a:0;a",
$1:function(a){return this.a.a0(a)}},jn:{"^":"a:0;",
$1:function(a){return a.gaU()&&a.gb5()}},jo:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},jp:{"^":"a:0;a",
$1:function(a){a.gbW().aa(0,this.a)
return a}}}],["","",,X,{"^":"",
lU:function(a,b,c,d){var z=new X.dD(null,null,null,null,null,null)
new X.rQ(a,b,c).$1(z)
return z.p()},
fk:{"^":"a_;",
gbj:function(){return H.r([$.$get$eM()],[Q.a8])},
gh:function(){return"LootSituation"},
ap:function(){var z=new X.dD(null,null,null,null,null,null)
z.l(this)
new X.lW().$1(z)
return z.p()},
ay:function(a,b){if(typeof a!=="number")return a.b7()
if(a>0)return
return this.fd(b.a)},
aD:function(a,b){return[this.fd(a)]},
d7:function(a){return!0},
fd:function(a){return a.dt(0,new X.lV())}},
rQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.N(null,null,[P.t])
z.af()
z.l(this.a)
a.gau().d=z
z=new S.N(null,null,[U.as])
z.af()
z.l(this.c)
a.gau().b=z
return a}},
lW:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.a7()
a.gau().f=z+1
return a}},
lV:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaU()}},
pn:{"^":"fk;bI:a<,bx:b<,dA:c<,i:d<,H:e<",
Y:function(a){var z=new X.dD(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fk))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.i(this.a)+",\ngroundMaterial="+J.i(this.b)+",\nplayerTeamIds="+J.i(this.c)+",\nid="+J.i(this.d)+",\ntime="+J.i(this.e)+",\n}"}},
dD:{"^":"d;a,b,c,d,e,f",
gbI:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.N(null,null,[U.as])
y.af()
y.l(C.e)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gau().c},
gdA:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.N(null,null,[P.t])
y.af()
y.l(C.e)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gau().e},
gH:function(){return this.gau().f},
gau:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.af()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.af()
y.l(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gau()
x=y.b
if(x==null){x=new S.N(null,null,[U.as])
x.af()
x.l(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.N(null,null,[P.t])
v.af()
v.l(C.e)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pn(y,x,w,v,u)
if(y==null)H.h(P.l("droppedItems"))
if(x==null)H.h(P.l("groundMaterial"))
if(w==null)H.h(P.l("playerTeamIds"))
if(v==null)H.h(P.l("id"))
if(u==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",m9:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gan:function(){return"will <subject> hit <objectPronoun>?"},
S:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to stab <object>",z)
a.av(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
b.Z(z.gi(),new A.ma(a))
if(b.a0(z.gi()).gbn()){a.bs(c,"<subject> thrust<s> {|"+H.b(U.ac(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.ax(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bs(c,"<subject> {stab<s>|run<s> "+H.b(U.ac(a))+" through} <object>",z,!0)
X.co(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){if(a.gF()===!0)return 0.6
return 0.5},
J:function(a,b){return a.ga9()&&this.b.gaL()&&a.d.geB()},
w:{
vJ:[function(a){return new A.m9("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","u3",2,0,4]}},ma:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gah()
y=this.a.ga_().gcZ()
if(typeof z!=="number")return z.at()
a.sah(z-y)
return a}}}],["","",,U,{"^":"",
m5:function(a,b){var z=new U.dG(null,null,null,null,null)
new U.t2(a,b).$1(z)
return z.p()},
fq:{"^":"a_;",
gaB:function(){return H.r([A.u3()],[{func:1,ret:Q.E,args:[R.H]}])},
gbj:function(){return[$.$get$dM()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ap:function(){var z=new U.dG(null,null,null,null,null)
z.l(this)
new U.m6().$1(z)
return z.p()},
ay:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b7()
if(a>0)return
z=b.a0(this.a)
y=b.a
x=H.m(y,0)
w=P.Q(new H.J(y,new U.m7(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gev(w)
if(v.ga9()&&z.gaL()&&v.d.geB())return v
return},
aD:function(a,b){return new H.J(a,new U.m8(b,b.a0(this.a)),[H.m(a,0)])}},
t2:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gb0().d=z
a.gb0().e=0
z=this.a.gi()
a.gb0().b=z
z=this.b
z=z==null?z:z.gi()
a.gb0().c=z
return a}},
m6:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.a7()
a.gb0().e=z+1
return a}},
m7:{"^":"a:25;a,b,c",
$1:function(a){var z,y
if(a.gaU())if(a.ex(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
m8:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.ex(z,this.a)}},
po:{"^":"fq;a,b,i:c<,H:d<",
Y:function(a){var z=new U.dG(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fq))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.i(this.a))+",\nculpritId="+J.i(this.b)+",\nid="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dG:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb0().d},
gH:function(){return this.gb0().e},
gb0:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb0().b
x=this.gb0().c
w=this.gb0().d
v=this.gb0().e
z=new U.po(y,x,w,v)
if(y==null)H.h(P.l("actorId"))
if(w==null)H.h(P.l("id"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",l2:{"^":"E;L:c<,M:d<,a1:e<,R:f<,b,a",
gal:function(){return""},
gh:function(){return"FinishPunch"},
gN:function(){return},
gan:function(){return"(WARNING should not be user-visible)"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga9()?C.i:C.f
x=b.a8("PunchSituation").gi()
w=b.a8("FightSituation").gbx()
b.Z(z.x,new O.l3(y))
switch(y){case C.k:throw H.c(new P.z("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fC(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ax(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fC(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gP",6,0,2],
K:function(a,b){return 1},
J:function(a,b){return!0},
w:{
vB:[function(a){return new O.l2(null,!0,!0,!1,a,null)},"$1","tA",2,0,4]}},l3:{"^":"a:0;a",
$1:function(a){a.sai(this.a)
return a}}}],["","",,E,{"^":"",ke:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gan:function(){return"will <subject> dodge the fist?"},
S:[function(a,b,c){var z=b.a8("PunchSituation").gi()
a.hd(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.af(new E.kf(a,c,z),new E.kg(this,a,c,z),null,null)
b.aO()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
a.ck(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.a8("PunchSituation").gi(),z,!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dj(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){var z,y
z=a.ga9()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gB(y):null).gbr().bp(0.4-z)},
J:function(a,b){return!0},
w:{
vw:[function(a){return new E.ke("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tt",2,0,4]}},kf:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kg:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kD(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dS:function(a,b,c){var z=new Z.dR(null,null,null,null,null,null)
new Z.rW(a,b,c).$1(z)
return z.p()},
fA:{"^":"bY;",
gaB:function(){return[E.tt()]},
gh:function(){return"PunchDefenseSituation"},
ap:function(){var z=new Z.dR(null,null,null,null,null,null)
z.l(this)
new Z.mM().$1(z)
return z.p()}},
rW:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gi()
a.gaH().b=z
z=this.b.gi()
a.gaH().e=z
a.gaH().d=this.c
return a}},
mM:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.a7()
a.gaH().f=z+1
return a}},
pr:{"^":"fA;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new Z.dR(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fA))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dR:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaH().c},
gH:function(){return this.gaH().f},
gaH:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaH().b
x=this.gaH().c
w=this.gaH().d
v=this.gaH().e
u=this.gaH().f
z=new Z.pr(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",
fC:function(a,b){var z=new Q.dT(null,null,null,null,null)
new Q.rY(a,b).$1(z)
return z.p()},
fB:{"^":"a_;",
gaB:function(){return[O.tA()]},
gh:function(){return"PunchSituation"},
ap:function(){var z=new Q.dT(null,null,null,null,null)
z.l(this)
new Q.mN().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a0(this.a)
return},
aD:function(a,b){return new H.J(a,new Q.mO(this),[H.m(a,0)])}},
rY:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gb1().c=z
a.gb1().e=0
z=this.a.gi()
a.gb1().b=z
z=this.b.gi()
a.gb1().d=z
return a}},
mN:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.a7()
a.gb1().e=z+1
return a}},
mO:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
ps:{"^":"fB;a,i:b<,c,H:d<",
Y:function(a){var z=new Q.dT(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fB))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dT:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb1().c},
gH:function(){return this.gb1().e},
gb1:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb1().b
x=this.gb1().c
w=this.gb1().d
v=this.gb1().e
z=new Q.ps(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",l4:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"FinishSlash"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x,w
z=this.b
b.Z(z.gi(),new O.l7(a))
y=b.a8("SlashSituation").gi()
x=!b.a0(z.gi()).gbn()&&!J.e(z.gi(),100)
if(!x){a.ck(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.ax(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ck(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.co(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gP",6,0,2],
K:function(a,b){return 1},
J:function(a,b){return a.ga_().gbe()},
w:{
vD:[function(a){return new O.l4(null,!0,!0,!0,C.c,a,null)},"$1","tB",2,0,4]}},l7:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gah()
y=this.a.ga_().gco()
if(typeof z!=="number")return z.at()
a.sah(z-y)
return a}}}],["","",,X,{"^":"",k_:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gan:function(){return"will <subject> parry it?"},
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ac(a))+"|fend it off}")
if(a.gaL())a.av(c,"<subject> <is> out of balance",!0)
else S.af(new X.k0(a,c),new X.k1(this,a,c),null,null)
b.aO()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){if(a.gF()===!0)a.aj(c,"<subject> {step<s>|take<s> a step} back")
a.bY(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ac(a))+"|fend<s> it off}",!0)
if(!a.ga9()){b.Z(a.x,new X.k2())
if(a.Q===!0)a.aj(c,"<subject> regain<s> balance")}b.bq("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gP",6,0,2],
K:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gB(z):null
x=a.ga9()?0:0.2
return y.gbr().bp(0.5-x)},
J:function(a,b){return a.ga_().gcI()},
w:{
vt:[function(a){return new X.k_("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tq",2,0,4]}},k0:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},k1:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},k2:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,F,{"^":"",kh:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"DodgeSlash"},
gal:function(){return"dodge and counter"},
gan:function(){return"will <subject> dodge?"},
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaL())a.av(c,"<subject> <is> out of balance",!0)
else S.af(new F.ki(a,c),new F.kj(this,a,c),null,null)
b.aO()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga9()){z.cj(c,"<subject> lose<s> balance because of that",!0,!0)
b.Z(z.x,new F.kk())}b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dj(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gP",6,0,2],
K:function(a,b){var z,y
z=a.ga9()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gB(y):null).gbr().bp(0.4-z)},
J:function(a,b){return!a.ga3()},
w:{
vx:[function(a){return new F.kh("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tu",2,0,4]}},ki:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kj:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kk:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return C.i}}}],["","",,O,{"^":"",lA:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gal:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gan:function(){return"will <subject> avoid the slash?"},
S:[function(a,b,c){a.eH(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aO()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z
a.bY(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.dl(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.ga_())
b.bq("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gP",6,0,2],
K:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gB(z):null
x=a.ga9()?0:0.2
return y.gbr().bp(0.5-x)},
J:function(a,b){return a.gb5()},
w:{
vH:[function(a){return new O.lA("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","tX",2,0,4]}}}],["","",,G,{"^":"",mi:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"ParrySlash"},
gal:function(){return"parry and counter"},
gan:function(){return"will <subject> parry?"},
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ac(a))+"|fend it off}")
if(a.gaL())a.av(c,"<subject> <is> out of balance",!0)
else S.af(new G.mj(a,c),new G.mk(this,a,c),null,null)
b.aO()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
if(z.gaL()){c.j3(0,"<subject> <is> out of balance",!0,!0,z)
c.dl(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$it())
a.bY(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ac(a))+"|fend<s> it off easily}",!0)}else a.bY(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ac(a))+"|fend<s> it off}",!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dj(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gP",6,0,2],
K:function(a,b){var z,y,x
z=a.ga9()?0:0.2
y=this.b.gaL()?0.3:0
if(a.Q===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gB(x):null).gbr().bp(0.3-z+y)},
J:function(a,b){return a.ga_().gcI()},
w:{
vL:[function(a){return new G.mi("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","u5",2,0,4]}},mj:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mk:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bi:function(a,b,c){var z=new L.dX(null,null,null,null,null,null)
new L.rR(a,b,c).$1(z)
return z.p()},
fN:{"^":"bY;",
gaB:function(){return[F.tu(),G.u5(),X.tq(),O.tX()]},
gh:function(){return"SlashDefenseSituation"},
ap:function(){var z=new L.dX(null,null,null,null,null,null)
z.l(this)
new L.nH().$1(z)
return z.p()}},
rR:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
nH:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.a7()
a.gaI().f=z+1
return a}},
pu:{"^":"fN;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new L.dX(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fN))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dX:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaI().c},
gH:function(){return this.gaI().f},
gaI:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaI().b
x=this.gaI().c
w=this.gaI().d
v=this.gaI().e
u=this.gaI().f
z=new L.pu(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,M,{"^":"",
bF:function(a,b){var z=new M.dY(null,null,null,null,null)
new M.rT(a,b).$1(z)
return z.p()},
fO:{"^":"a_;",
gaB:function(){return[O.tB()]},
gh:function(){return"SlashSituation"},
ap:function(){var z=new M.dY(null,null,null,null,null)
z.l(this)
new M.nI().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a0(this.a)
return},
aD:function(a,b){return new H.J(a,new M.nJ(this),[H.m(a,0)])}},
rT:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
nI:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.a7()
a.gb2().e=z+1
return a}},
nJ:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pv:{"^":"fO;a,i:b<,c,H:d<",
Y:function(a){var z=new M.dY(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fO))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dY:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb2().c},
gH:function(){return this.gb2().e},
gb2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb2().b
x=this.gb2().c
w=this.gb2().d
v=this.gb2().e
z=new M.pv(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("target"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",l5:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z=this.b
b.Z(z.gi(),new Q.l6())
c.fB(0,"<subject> {cuts|slashes|slits} <object's> "+(J.e(z.gi(),100)?"side":"{throat|neck|side}"),z,a.ga_())
X.co(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gP",6,0,2],
K:function(a,b){return 1},
J:function(a,b){return this.b.ga3()&&a.ga_().gbe()},
w:{
vC:[function(a){return new Q.l5(null,!0,!0,!0,C.c,a,null)},"$1","tC",2,0,4]}},l6:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}}}],["","",,K,{"^":"",mc:{"^":"E;M:c<,a1:d<,R:e<,N:f<,L:r<,b,a",
gh:function(){return"OnGroundParry"},
gal:function(){return"parry it"},
gan:function(){return"will <subject> parry it?"},
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ac(a))+"}}")
S.af(new K.md(a,c),new K.me(this,a,c),null,null)
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gO",6,0,2],
T:[function(a,b,c){a.bY(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ac(a))+"}",!0)
b.bq("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gP",6,0,2],
K:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gB(z):null).gbr().bp(0.3)},
J:function(a,b){return a.ga_().gcI()},
w:{
vK:[function(a){return new K.mc(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","u4",2,0,4]}},md:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},me:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",n_:{"^":"E;L:c<,M:d<,a1:e<,R:f<,N:r<,b,a",
gh:function(){return"RollOutOfWay"},
gal:function(){return"roll out of way"},
gan:function(){return"will <subject> evade?"},
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to roll out of the way")
a.av(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gO",6,0,2],
T:[function(a,b,c){a.kz(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gF()===!0){b.Z(a.gi(),new Y.n0())
a.bY(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bq("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gP",6,0,2],
K:function(a,b){var z
if(a.gF()===!0)return 1
z=b.f
return(z.length!==0?C.a.gB(z):null).gbr().bp(0.5)},
J:function(a,b){return!0},
w:{
vR:[function(a){return new Y.n_(null,!1,!1,!0,C.c,a,null)},"$1","ub",2,0,4]}},n0:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,V,{"^":"",
dI:function(a,b,c){var z=new V.dH(null,null,null,null,null,null)
new V.rU(a,b,c).$1(z)
return z.p()},
fr:{"^":"bY;",
gaB:function(){return[K.u4(),Y.ub()]},
gh:function(){return"OnGroundDefenseSituation"},
ap:function(){var z=new V.dH(null,null,null,null,null,null)
z.l(this)
new V.mb().$1(z)
return z.p()}},
rU:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaG().c=z
a.gaG().f=0
z=this.a.gi()
a.gaG().b=z
z=this.b.gi()
a.gaG().e=z
a.gaG().d=this.c
return a}},
mb:{"^":"a:0;",
$1:function(a){var z=a.gaG().f
if(typeof z!=="number")return z.a7()
a.gaG().f=z+1
return a}},
pp:{"^":"fr;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new V.dH(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fr))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dH:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaG().c},
gH:function(){return this.gaG().f},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
u=this.gaG().f
z=new V.pp(y,x,w,v,u)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("predeterminedResult"))
if(v==null)H.h(P.l("target"))
if(u==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,D,{"^":"",
fZ:function(a,b){var z=new D.e_(null,null,null,null,null)
new D.rV(a,b).$1(z)
return z.p()},
fY:{"^":"a_;",
gaB:function(){return[Q.tC()]},
gh:function(){return"StrikeDownSituation"},
ap:function(){var z=new D.e_(null,null,null,null,null)
z.l(this)
new D.ow().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a0(this.a)
return},
aD:function(a,b){return new H.J(a,new D.ox(this),[H.m(a,0)])}},
rV:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gb3().c=z
a.gb3().e=0
z=this.a.gi()
a.gb3().b=z
z=this.b.gi()
a.gb3().d=z
return a}},
ow:{"^":"a:0;",
$1:function(a){var z=a.gb3().e
if(typeof z!=="number")return z.a7()
a.gb3().e=z+1
return a}},
ox:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
px:{"^":"fY;a,i:b<,c,H:d<",
Y:function(a){var z=new D.e_(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fY))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntargetOnGround="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
e_:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb3().c},
gH:function(){return this.gb3().e},
gb3:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb3().b
x=this.gb3().c
w=this.gb3().d
v=this.gb3().e
z=new D.px(y,x,w,v)
if(y==null)H.h(P.l("attacker"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("targetOnGround"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",mC:{"^":"d;",
gbr:function(){switch(this.gcg()){case C.l:return C.Z
case C.m:return $.$get$fv()
case C.p:return $.$get$fw()
default:throw H.c(P.D(this.gcg()))}},
$isa_:1}}],["","",,K,{"^":"",dP:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",nK:{"^":"a8;M:b<,R:c<,a1:d<,N:e<,a",
gW:function(){return""},
gL:function(){return},
gh:function(){return"SlayMonstersAction"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gB(z):null
x=b.dN(y.gbB())
w=b.a
C.a.q(z,x.jD(b,y,new H.J(w,new D.nL(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gP",6,0,2],
am:function(a,b){return"WARNING should not be user-visible"},
K:function(a,b){return 1},
J:function(a,b){var z=b.f
return H.T(z.length!==0?C.a.gB(z):null,"$isZ").c}},nL:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaU()){z=a.gbf()
y=this.a.gbf()
z=z.a
y=y.gi()
if(z==null?y==null:z===y){z=a.gbB()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",oD:{"^":"cE;M:c<,a1:d<,R:e<,N:f<,b,a",
gL:function(){return},
gh:function(){return"TakeExitAction"},
S:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gO",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gbb())
y=b.f
H.T(y.length!==0?C.a.gB(y):null,"$isZ").aM(b,a,z.gjv(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gP",6,0,2],
am:function(a,b){return"WARNING should not be user-visible"},
K:function(a,b){return 1},
J:function(a,b){var z=b.f
if(H.T(z.length!==0?C.a.gB(z):null,"$isZ").c===!0)return!1
this.b.gjZ()
return!0},
w:{
vU:[function(a){return new Y.oD(!1,!0,!1,null,a,null)},"$1","vj",2,0,48]}}}],["","",,F,{"^":"",
fG:function(a,b){var z=new F.dV(null,null,null,null,null)
new F.rG(a,b).$1(z)
return z.p()},
Z:{"^":"a_;",
gaB:function(){return[Y.vj()]},
gbj:function(){var z=[]
C.a.ar(z,$.$get$hN())
z.push($.$get$fP())
return z},
gh:function(){return"RoomRoamingSituation"},
ap:function(){var z=new F.dV(null,null,null,null,null)
z.l(this)
new F.n1().$1(z)
return z.p()},
ay:function(a,b){return b.a.bd(0,new F.n2(),new F.n3())},
aD:function(a,b){var z=this.ay(null,b)
if(z==null)return[]
return[z]},
h4:function(a,b){a.a.il(new F.n5(),!0)},
aM:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dN(c)
a.cV(this.b,F.fG(z,z.gjC()!=null))
d.fE()
z.c.$3(b,a,d)
d.I(0,"\n\n",!0)
for(y=R.i4(b,a),y=P.Q(y,!0,H.y(y,"v",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.a0(y[v].gi())
t=u.Y(new F.n4(z))
w.aa(0,u)
w.q(0,t)}},
d7:function(a){if(J.e(this.a,$.$get$ep().b))return!1
return!0}},
rG:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gaA().c=z
a.gaA().e=0
z=this.a.gh()
a.gaA().b=z
a.gaA().d=this.b
return a}},
n1:{"^":"a:0;",
$1:function(a){var z=a.gaA().e
if(typeof z!=="number")return z.a7()
a.gaA().e=z+1
return a}},
n2:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaU()}},
n3:{"^":"a:1;",
$0:function(){return}},
n5:{"^":"a:0;",
$1:function(a){return!a.gbn()}},
n4:{"^":"a:0;a",
$1:function(a){a.sbB(this.a.b)
return a}},
pt:{"^":"Z;bB:a<,i:b<,c,H:d<",
Y:function(a){var z=new F.dV(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.Z))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\nmonstersAlive="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dV:{"^":"d;a,b,c,d,e",
gbB:function(){return this.gaA().b},
sbB:function(a){this.gaA().b=a
return a},
gi:function(){return this.gaA().c},
ski:function(a){this.gaA().d=a
return a},
gH:function(){return this.gaA().e},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
z=new F.pt(y,x,w,v)
if(y==null)H.h(P.l("currentRoomName"))
if(x==null)H.h(P.l("id"))
if(w==null)H.h(P.l("monstersAlive"))
if(v==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,V,{"^":"",
oF:function(){var z=new V.e0(null,null,null)
new V.t5().$1(z)
return z.p()},
oQ:function(){var z=new V.e1(null,null,null)
new V.t4().$1(z)
return z.p()},
nP:function(){var z=new V.dZ(null,null,null)
new V.t3().$1(z)
return z.p()},
rE:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The crevice is small.\n",!0)}},
rF:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rC:{"^":"a:5;",
$3:function(a,b,c){c.I(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\n"We should name that sword," Briana says, motioning to Agruth\'s scimitar. "It\'s the only thing we have going for us."\n',!0)}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
m0:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"just_after_agruth_fight"))return!1
return!0},
T:[function(a,b,c){c.q(0,"\"You're right. We'll call it Luck Bringer. It's our only chance to get out of this hell.\"\n\n\nBriana nods.")
N.ij(b,"Luck Bringer")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"start_of_book",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gP",6,0,2],
S:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gO",6,0,2],
K:function(a,b){return 1},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return""},
gM:function(){return!1}},
m1:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"just_after_agruth_fight"))return!1
return!0},
T:[function(a,b,c){c.q(0,"\"You're right. We'll call it Savior. It is our first step to freedom.\"\n\n\nBriana nods.")
N.ij(b,"Savior")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"start_of_book",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gP",6,0,2],
S:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gO",6,0,2],
K:function(a,b){return 1},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return""},
gM:function(){return!1}},
m_:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"just_after_agruth_fight"))return!1
return!0},
T:[function(a,b,c){c.q(0,"\"That's foolish. It's just a sword, after all.\"")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"start_of_book",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gP",6,0,2],
S:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gO",6,0,2],
K:function(a,b){return 1},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return""},
gM:function(){return!1}},
rz:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rA:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rx:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"You look around. The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
ry:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
l8:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"start_of_book"))return!1
return!0},
T:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
S:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.eE(b,new V.l9())
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gO",6,0,2],
K:function(a,b){return 0.9},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gM:function(){return!1}},
l9:{"^":"a:0;",
$1:function(a){var z
a.gbM()
z=a.b
a.gbM()
a.b=z+1
return a}},
la:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"start_of_book"))return!1
return!0},
T:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gP",6,0,2],
S:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.eE(b,new V.lb())
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gO",6,0,2],
K:function(a,b){return 0.7},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gM:function(){return!1}},
lb:{"^":"a:0;",
$1:function(a){var z
a.gbM()
z=a.b
a.gbM()
a.b=z+1
return a}},
nB:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"start_of_book"))return!1
if(b.iW(this.d))return!1
return!0},
T:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.tN(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gP",6,0,2],
S:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gO",6,0,2],
K:function(a,b){return 0.9},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gM:function(){return!1}},
rv:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rw:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rt:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
ru:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rr:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.T(b.c,"$isbZ").b>=1)c.I(0,"You hear orders being yelled somewhere behind you.",!0)
c.I(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
rs:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
ro:{"^":"a:5;",
$3:function(a,b,c){c.I(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.T(b.c,"$isbZ").b>=1)c.I(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.I(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
rp:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rm:{"^":"a:5;",
$3:function(a,b,c){c.I(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
rn:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
rk:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iX("sneak_onto_cart"))c.I(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.I(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.I(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
rl:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
ri:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
rj:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
rg:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The stone gate looms before you.\n",!0)}},
nM:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"mountain_pass_gate"))return!1
return!0},
T:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.eE(b,new V.nN())
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gP",6,0,2],
S:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gO",6,0,2],
K:function(a,b){return 1},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gM:function(){return!1}},
nN:{"^":"a:0;",
$1:function(a){a.gbM()
a.a=!0
return a}},
oE:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"mountain_pass_gate"))return!1
if(b.kH(this.d)!=null)return!1
return!0},
T:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.Z(a.gi(),new V.oN())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gP",6,0,2],
S:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.oF())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gO",6,0,2],
K:function(a,b){return 0.5},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gM:function(){return!1}},
oN:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a7()
a.sbw(z+10)
return a}},
h2:{"^":"a_;",
gbj:function(){return[new A.bE(new V.oI(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bE(new V.oJ(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ap:function(){var z=new V.e0(null,null,null)
z.l(this)
new V.oK().$1(z)
return z.p()},
ay:function(a,b){if(a!==0)return
return b.a.aR(0,new V.oL())},
aD:function(a,b){return[a.aR(0,new V.oM())]}},
t5:{"^":"a:0;",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
oI:{"^":"a:9;",
$4:function(a,b,c,d){J.aR(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.Z(a.gi(),new V.oG())
b.Z(a.gi(),new V.oH())
b.aO()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
oG:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}},
oH:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a7()
a.sbw(z+10)
return a}},
oJ:{"^":"a:9;",
$4:function(a,b,c,d){J.aR(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.aO()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
oK:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
oL:{"^":"a:0;",
$1:function(a){return a.gF()}},
oM:{"^":"a:0;",
$1:function(a){return a.gF()}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
oO:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"winged_serpent_nest"))return!1
return!0},
T:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gP",6,0,2],
S:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.oQ())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gO",6,0,2],
K:function(a,b){return 0.3},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gM:function(){return!1}},
h7:{"^":"a_;",
gbj:function(){return[new A.bE(new V.oS(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bE(new V.oT(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ap:function(){var z=new V.e1(null,null,null)
z.l(this)
new V.oU().$1(z)
return z.p()},
ay:function(a,b){if(a!==0)return
return b.a.aR(0,new V.oV())},
aD:function(a,b){return[a.aR(0,new V.oW())]}},
t4:{"^":"a:0;",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
oS:{"^":"a:9;",
$4:function(a,b,c,d){J.aR(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"mountainside_base",c)
b.aO()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
oT:{"^":"a:9;",
$4:function(a,b,c,d){J.aR(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Z(a.gi(),new V.oR())
b.aO()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oR:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}},
oU:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
oV:{"^":"a:0;",
$1:function(a){return a.gF()}},
oW:{"^":"a:0;",
$1:function(a){return a.gF()}},
nO:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"winged_serpent_nest"))return!1
return!0},
T:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gP",6,0,2],
S:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.nP())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gO",6,0,2],
K:function(a,b){return 0.8},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gM:function(){return!1}},
fR:{"^":"a_;",
gbj:function(){return[new A.bE(new V.nR(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bE(new V.nS(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ap:function(){var z=new V.dZ(null,null,null)
z.l(this)
new V.nT().$1(z)
return z.p()},
ay:function(a,b){if(a!==0)return
return b.a.aR(0,new V.nU())},
aD:function(a,b){return[a.aR(0,new V.nV())]}},
t3:{"^":"a:0;",
$1:function(a){var z=$.$get$V().ad(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
nR:{"^":"a:9;",
$4:function(a,b,c,d){J.aR(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"mountainside_base",c)
b.aO()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nS:{"^":"a:9;",
$4:function(a,b,c,d){J.aR(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Z(a.gi(),new V.nQ())
b.aO()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nQ:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}},
nT:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
nU:{"^":"a:0;",
$1:function(a){return a.gF()}},
nV:{"^":"a:0;",
$1:function(a){return a.gF()}},
oP:{"^":"aq;W:c<,h:d<,b,a",
J:function(a,b){var z=b.f
if(!J.e(H.T(z.length!==0?C.a.gB(z):null,"$isZ").a,"winged_serpent_nest"))return!1
return!0},
T:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.a8("RoomRoamingSituation").aM(b,N.ab(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gP",6,0,2],
S:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gO",6,0,2],
K:function(a,b){return 1},
gR:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gN:function(){return},
gL:function(){return"Perhaps you can divert its attention."},
gM:function(){return!1}},
rB:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
rf:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
rq:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
py:{"^":"h2;i:a<,H:b<",
Y:function(a){var z=new V.e0(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.h2))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
e0:{"^":"d;a,b,c",
gi:function(){return this.gab().b},
gH:function(){return this.gab().c},
gab:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gab().b
x=this.gab().c
z=new V.py(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.l(z)
return z}},
pA:{"^":"h7;i:a<,H:b<",
Y:function(a){var z=new V.e1(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.h7))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
e1:{"^":"d;a,b,c",
gi:function(){return this.gab().b},
gH:function(){return this.gab().c},
gab:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gab().b
x=this.gab().c
z=new V.pA(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.l(z)
return z}},
pw:{"^":"fR;i:a<,H:b<",
Y:function(a){var z=new V.dZ(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fR))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dZ:{"^":"d;a,b,c",
gi:function(){return this.gab().b},
gH:function(){return this.gab().c},
gab:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gab().b
x=this.gab().c
z=new V.pw(y,x)
if(y==null)H.h(P.l("id"))
if(x==null)H.h(P.l("time"))}this.l(z)
return z}}}],["","",,N,{"^":"",
w7:[function(a,b,c){var z,y
z=R.b8(6666,"Agruth",null,null,null,null,0,2,100,!1,2,!0,C.r,0,$.$get$cm())
y=z.x
a.gem().q(0,z)
return U.dn(c,[z],"{rock|cavern} floor",b,P.ae([1,new N.tE(y),5,new N.tF(y),9,new N.tG(y),12,new N.tH(y),17,new N.tI(y)]))},"$3","vn",6,0,11],
w8:[function(a,b,c){var z=[N.ei(),N.hE()]
a.gem().ar(0,z)
return U.dn(c,z,"{rock|cavern} floor",b,P.aB())},"$3","vo",6,0,11],
w9:[function(a,b,c){var z=a.fw("take_out_gate_guards")||a.fw("take_out_gate_guards_rescue")?[N.ei()]:[N.ei(),N.hE()]
a.a.ar(0,z)
return U.dn(c,z,"ground",b,P.aB())},"$3","vp",6,0,11],
ab:function(a){return a.gem().aR(0,new N.tL())},
tN:function(a,b){a.Z(N.ab(a).gi(),new N.tO(b))},
ij:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gX(z),x=new H.ce(y,new N.u0(),[H.m(z,0)]);x.u();){w=y.gG()
if(!w.gb5()){v=H.T(w.d,"$isbj")
y=b
x=v.c
u=v.d
v.r
t=P.Q(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.a0(w.x)
r=s.Y(new N.u1(new G.bj(y,x,u,!0,!0,!1,t)))
z.aa(0,s)
z.q(0,r)
break}}},
eE:function(a,b){var z,y
z=H.T(a.c,"$isbZ")
z.toString
y=new M.e4(null,!1,0)
y.l(z)
a.c=b.$1(y).p()},
hE:function(){return R.b8(1000+$.$get$ej().ad(999999),"goblin",O.d7(),null,new G.bj("scimitar",1,1,!1,!0,!1,P.bx(C.o,null)),null,0,1,0,!1,1,!1,C.r,0,$.$get$cm())},
ei:function(){return R.b8(1000+$.$get$ej().ad(999999),"orc",O.d7(),null,new G.bj("sword",1,1,!1,!0,!1,P.bx(C.o,null)),null,0,2,0,!1,2,!1,C.r,0,$.$get$cm())},
tE:{"^":"a:7;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.a0(z)
x=new G.bj("scimitar",1,1,!1,!0,!1,P.bx(C.o,null))
y.aj(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ao(b,"<subject> draw<s> <subject's> <object>",x)
a.Z(z,new N.tD(x))
y.kB(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',N.ab(a),!0)}},
tD:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},
tF:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).aj(b,"<subject> spit<s> on the cavern floor")}},
tG:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
b.fE()
z.eH(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.I(0,"\n\n",!0)}},
tH:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
z.aj(b,"<subject> grit<s> <subject's> teeth")
z.av(b,"<subject> do<es>n't talk any more",!0)}},
tI:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).aj(b,"<subject> scowl<s> with pure hatred")}},
tL:{"^":"a:0;",
$1:function(a){return a.gF()}},
tO:{"^":"a:0;a",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.a7()
a.sb8(z+this.a)
return a}},
u0:{"^":"a:0;",
$1:function(a){return J.e(a.gbf(),$.$get$ev())}},
u1:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}}}],["","",,O,{"^":"",
w6:[function(a){var z,y
z=$.$get$db()
y=z.A
if(y.length>0){y+=" "
z.A=y}z.A=y+a},"$1","ud",2,0,15],
wa:[function(a){$.et=a},"$1","ue",2,0,15],
hT:[function(a,b,c,d,e,f,g){var z=L.eR(a,!1,!1,d,e,f,g)
$.$get$bP().q(0,z)
return z},function(a){return O.hT(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hT(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uc",2,13,51,0,0,0,1,1,0],
nc:{"^":"no;",
bv:function(){var z=0,y=P.aA(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bv=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cW){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.D())
m=t.Q
n=Z.o2()
m.toString
l=new A.u(100,null,null,null,null)
l.e=n.D()
m.a.E(l.D())
new P.F(0,$.p,null,[null]).by(!0)}if(t.r){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.D())
t.r=!1
m=t.Q
m.toString
n=new A.u(60,null,null,null,null)
n.b=t.f.cm(0)
m.a.E(n.D())}s=null
case 3:n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.D())
w=7
z=10
return P.aw(t.cw(),$async$bv)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.A(j)
if(n instanceof M.cw){r=n
q=H.B(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.u(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.E(l.D())
z=1
break}else{p=n
o=H.B(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.u(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.E(l.D())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.e(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.D())
case 1:return P.aE(x,y)
case 2:return P.aD(v,y)}})
return P.aF($async$bv,y)},
eK:function(){var z,y
this.fg()
this.f.b4(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hl(Z.bH())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bH()
z.a.E(y.D())
this.bv()},
l_:[function(a){var z,y
z={}
z.a=null
y=$.$get$bP()
y.V(0,new O.nz(z,this,a))
z=z.a
if(z==null)throw H.c(P.D("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.i(y)+")"))
this.iD(z)
this.bv()},"$1","gio",2,0,32],
iD:function(a){var z
if(a.gfQ()!=null){z=a.r
$.$get$ck().az(z)}z=a.x
if(z!=null)this.ei(z)},
cw:function(){var z=0,y=P.aA(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cw=P.ax(function(a,a0){if(a===1)return P.aD(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cl()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.u(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.D())
p=r.b.dD()
r=v.Q
q=p.gjd()
u=p.b
o=p.c
r.toString
n=new A.u(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.D())
r=new P.F(0,$.p,null,[null])
r.by(null)
r.c_(new O.np(v))
x=!0
z=1
break}m=v.x===v.e.gaw().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gaw().length){r=v.e.gaw()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.f(r,o)
z=1
break}o=!!J.o(r[o]).$isL
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.u(667,null,null,null,null)
k.c=r
o.a.E(k.D())
k=$.$get$bP()
k.ik(new O.nq(v),!1)
if(k.gm(k)!==0){r=v.Q
r.toString
o=new A.u(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.D())
o=H.y(k,"b0",0)
o=P.Q(new H.J(k,new O.nr(u,l),[o]),!0,o)
r=k.a
H.r([],[L.a2])
j=new L.eS(r,o)
if(!j.gU(j)){u=v.Q
r=u.e
if(r!=null){r.dr(new D.bW("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cf(new P.F(0,$.p,null,[r]),[r])
r=j.dG()
u.a.E(r.D())
u=u.e.a.c_(v.gio())
i=new O.ns(v)
r=H.m(u,0)
q=$.p
if(q!==C.h){i=P.ek(i,q)
q.toString}u.da(new P.eb(null,new P.F(0,q,null,[r]),6,new O.nt(),i,[r,r]))
x=!0
z=1
break}else{h=k.bd(0,new O.nu(),new O.nv())
if(h!=null){if(h.gfQ()!=null){r=h.r
$.$get$ck().az(r)}r=h.x
if(r!=null)v.ei(r)
k.aa(0,h)}}}r=$.$get$ck()
o=r.b
g=r.c
z=o!==g?3:4
break
case 3:++r.d
u=r.a
q=u.length
g=(g-1&q-1)>>>0
r.c=g
if(g<0||g>=q){x=H.f(u,g)
z=1
break}f=u[g]
u[g]=null
z=5
return P.aw(v.cz(f),$async$cw)
case 5:x=a0
z=1
break
case 4:r=$.et
if(r!=null){v.ei(r)
$.et=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaw().length-1
v.x=r}else if($.hH)$.hH=!1
else{++r
v.x=r}u.a=r===v.e.gaw().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.u(667,null,null,null,null)
o.c=r
q.a.E(o.D())
if(v.x===v.e.gaw().length){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="End of book."
u.a.E(r.D())
r=v.Q
u=v.e0()
r.toString
u=u.eN(50)
r.a.E(u.D())
v.Q.a.E(new A.u(80,null,null,null,null).D())
x=!0
z=1
break}r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.a1
u.f=new P.cf(new P.F(0,$.p,null,[r]),[r])
r=new A.u(30,null,null,null,null)
r.c=q
u.a.E(r.D())
u.f.a.c_(new O.nw(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.o(r[q]).$isL?9:11
break
case 9:r=v.Q
r.toString
q=new A.u(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.D())
try{r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jb(r[q])}catch(b){u=H.A(b)
if(u instanceof M.cw){t=u
s=H.B(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.u(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.E(q.D())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.u(667,null,null,null,null)
q.c="- choices added"
r.a.E(q.D())
if(k.bR(0,new O.nx(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.D())
r=v.Q
u=v.e0()
r.toString
u=u.eN(50)
r.a.E(u.D())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.O,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gaw().length-1?v.e0():null
q=v.e.gaw()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.aw(v.cz(H.i0(q[o],r)),$async$cw)
case 15:c=a0
if(k.bR(0,new O.ny(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=d.eN(50)
u.a.E(r.D())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaw()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.z("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aE(x,y)}})
return P.aF($async$cw,y)},
ei:function(a){var z,y,x,w,v
z=$.$get$cA()
if(z.b.test(H.br(a))){y=this.d
if(y==null)throw H.c(new P.z("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.at()
w=z-1}else{x=this.b.dM(a,this.e.gdO())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a5(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.gho()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gho()
else z=!1}else z=!1
$.hF=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.u(667,null,null,null,null)
v.c=z
y.a.E(v.D())
v=this.e
this.d=new O.nd(v,this.x)
this.e=x
this.x=w
v.e=J.al(v.gdH(),1)},
fg:function(){var z,y,x,w,v,u
this.x=null
$.$get$ck().b4(0)
$.$get$bP().sm(0,0)
$.qW=null
x=$.$get$cq()
x.b4(0)
w=$.$get$cl()
x.n(0,"points",w)
w.a=0
w.b.b4(0)
this.b.jg()
$.i9=!0
try{this.jT()}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.D())
throw H.c(z)}this.h9()
$.i9=!1},
cz:function(a){var z=0,y=P.aA(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cz=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$db()
q.A=""
w=4
z=7
return P.aw(a.$0(),$async$cz)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.A(m)
r=H.B(m)
q.A+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.i(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cw(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.A.length!==0){t.Q.eU(J.i(q)).c_(new O.nA(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aE(x,y)
case 2:return P.aD(v,y)}})
return P.aF($async$cz,y)},
iv:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cA().b.test(H.br(z)))return!1
y=this.b.dM(z,this.e.gdO())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.u(667,null,null,null,null)
w.c=z
x.a.E(w.D())
return!0}y.gkR()
return!1},"$1","gfk",2,0,33],
e0:function(){var z,y,x,w,v,u
this.h9()
try{x=this.e.gh()
w=$.$get$cq()
x=new Z.fH(x,this.b.jB(),null,null,null,null)
x.c=H.aH(Z.cS(w),"$isG",[P.q,P.d],"$asG")
x.f=Date.now()
x.e=C.d.kO(H.aC(x),16)
return x}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.D())
throw H.c(z)}},
fZ:function(a,b){var z,y,x
this.fg()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dp("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.D())
z.jQ(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.D())
this.f.ar(0,b)}z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.D())
y=$.$get$cq()
Z.n9(a,y,P.dA(P.q,P.bw))
this.cx=H.T(y.j(0,"game"),"$iseX")
this.cy=H.aH(y.j(0,"hitpoints"),"$isau",[P.aP],"$asau")
z=[P.t]
this.db=H.aH(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aH(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hl(Z.bH())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bH()
z.a.E(y.D())
y=this.Q
y.toString
z=new A.u(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.E(z.D())
this.bv()},
kd:function(a){return this.fZ(a,null)},
dQ:[function(a,b,c,d){var z=0,y=P.aA(),x,w=this,v,u,t
var $async$dQ=P.ax(function(e,f){if(e===1)return P.aD(f,y)
while(true)switch(z){case 0:v=$.$get$db()
if(v.A.length!==0){w.Q.eU(J.i(v))
v.A=""}v=w.Q
v.toString
u=new A.u(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.D())
u=U.cc
t=new P.F(0,$.p,null,[u])
v.x=new P.cf(t,[u])
x=t
z=1
break
case 1:return P.aE(x,y)}})
return P.aF($async$dQ,y)},function(a,b){return this.dQ(a,b,null,!1)},"kW","$4$rerollEffectDescription$rerollable","$2","ghJ",4,5,44,1,0]},
nz:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seV(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.E(x.D())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cA().b.test(H.br(z))?y.d.a:y.b.dM(z,y.e.gdO())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
np:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nq:{"^":"a:0;a",
$1:function(a){return a.geV()||this.a.iv(a)}},
nr:{"^":"a:35;a,b",
$1:function(a){return a.k_(this.b,this.a.a)}},
ns:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.E(x.D())
return}},
nt:{"^":"a:0;",
$1:function(a){return a instanceof D.bW}},
nu:{"^":"a:0;",
$1:function(a){return a.gk0()}},
nv:{"^":"a:1;",
$0:function(){return}},
nw:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nx:{"^":"a:0;a,b",
$1:function(a){return a.du(!0,this.a.a,this.b.gfk())}},
ny:{"^":"a:0;a,b",
$1:function(a){return a.du(!0,this.a.a,this.b.gfk())}},
nA:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
my:{"^":"d;a,b,fK:c<",
j0:function(a,b,c){var z
if(!$.hF){z=J.al(this.a,b)
this.a=z
this.b.az(new A.cM(b,z,c))}},
q:function(a,b){return this.j0(a,b,null)},
a7:function(a,b){this.q(0,b)
return this},
D:function(){return P.ae(["points",this.a])},
hn:function(a){this.a=a.j(0,"points")
this.b.b4(0)},
hT:function(){this.b=P.b1(null,A.cM)},
$isdW:1},
cT:{"^":"mh;aw:d<,dH:e@,a,b,c",
gho:function(){return J.a6(this.e,0)}},
nd:{"^":"d;a,b"},
nk:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dM:function(a,b){var z
if(b!=null&&this.a.a6(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a6(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jB:function(){var z=new H.P(0,null,null,null,null,null,0,[P.q,null])
this.a.V(0,new O.nm(z))
return z},
jQ:function(a){a.V(0,new O.nn(this))},
jg:function(){this.a.V(0,new O.nl())}},
nm:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.ae(["visitCount",b.gdH()]))}},
nn:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a6(a))z.j(0,a).sdH(J.az(b,"visitCount"))}},
nl:{"^":"a:7;",
$2:function(a,b){b.sdH(0)}}}],["","",,M,{"^":"",cw:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
w:{
eL:function(a){return new M.cw(a,null,null)}}}}],["","",,M,{"^":"",no:{"^":"d;"}}],["","",,Z,{"^":"",fH:{"^":"d;a,b,c,d,e,f",
eN:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.u(a,null,null,null,null)
z.c=this.dF()
return z},
dF:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.q,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.fO(z)},
k:function(a){return this.dF()},
w:{
fI:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isL||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdW},
cS:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)if(Z.fI(z.j(a,x)))y.push(Z.cS(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.P(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.n8(a,w))
return w}else if(!!z.$isdW){v=a.D()
v.n(0,"_class",a.gfK())
return Z.cS(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cR:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)y.push(Z.cR(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a6("_class")){v=new H.P(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.n7(b,v))
return v}else if(w&&a.a6("_class"))if(c!=null){c.hn(a)
return c}else{u=z.j(a,"_class")
if(!b.a6(u))throw H.c(new Z.dp("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
n9:function(a,b,c){a.c.V(0,new Z.na(b,c))}}},n8:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fI(this.a.j(0,a)))this.b.n(0,a,Z.cS(b))}},n7:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cR(b,this.a,null))}},na:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cR(b,x,null))
else z.n(0,a,Z.cR(b,x,y))}},dp:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lj:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",mE:{"^":"d;"},mD:{"^":"mE;"},lr:{"^":"mD;a,b,c,d,e,f,r,x",
l3:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aH(a,"$isG",n,"$asG")
m=new A.u(a.j(0,"type"),null,null,null,null)
if(a.a6("strContent"))m.c=a.j(0,"strContent")
if(a.a6("listContent"))m.b=a.j(0,"listContent")
if(a.a6("intContent"))m.d=a.j(0,"intContent")
if(a.a6("mapContent"))m.e=H.aH(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghl()){case 1070:o=this.e
if(o!=null){o.dr(new D.bW("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bk()
o.b.bk()
return
case 1000:o=new A.u(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.E(o.D())
n.E(new A.u(10,null,this.c.ch,null,null).D())
return
case 1050:l=z.gjU()
this.e.bS(l)
this.e=null
return
case 1060:o=new A.u(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.D())
o=z.gkf()
if(!o.a6("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.cr())
n.bN(new G.jV(o))
return
case 1080:o=new A.u(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.D())
k=J.az(z.geE(),0)
j=J.az(z.geE(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.B,k)
o.bS(new U.cc(C.B[k],j))
this.x=null
return
case 1010:o=new A.u(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.D())
o=this.e
if(o!=null){o.dr(new D.bW("Book Restart before choice was selected."))
this.e=null}try{this.c.eK()}catch(i){y=H.A(i)
x=H.B(i)
o=new A.u(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.D())
throw H.c(y)}o=new A.u(90,null,null,null,null)
o.b=Z.bH()
n.E(o.D())
n.E(new A.cM(0,0,null).dG().D())
return
case 1020:h=new A.u(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.D())
h=this.e
if(h!=null){h.dr(new D.bW("Book Load before choice was selected."))
this.e=null}try{h=z.ghN()
f=new Z.fH(null,null,null,null,null,null)
e=H.aH(C.w.jn(h),"$isG",n,"$asG")
if(!e.a6("currentPageName")||!e.a6("vars"))H.h(new Z.lj("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aH(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aH(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a6("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aH(J.iL(z.geE()),"$isbD",[o],"$asbD")
o=this.c
if(v!=null)o.fZ(w,v)
else o.kd(w)}catch(i){o=H.A(i)
if(o instanceof Z.dp){u=o
t=H.B(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.D())
this.c.eK()}else{s=o
r=H.B(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.D())
this.c.eK()}}try{o=new A.u(90,null,null,null,null)
o.b=Z.bH()
g.E(o.D())}catch(i){q=H.A(i)
p=H.B(i)
o=new A.u(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.D())
throw H.c(q)}this.c.toString
g.E(new A.cM(0,$.$get$cl().a,null).dG().D())
return
case 1090:this.f.bS(!0)
this.f=null
return
case 1040:this.c.bv()
return
default:o=new A.u(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghl())+"."
this.a.E(o.D())}},"$1","giB",2,0,21],
eU:function(a){var z=P.a1
this.f=new P.cf(new P.F(0,$.p,null,[z]),[z])
z=new A.u(30,null,null,null,null)
z.c=a
this.a.E(z.D())
return this.f.a}},bW:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jV:{"^":"d;a",
D:function(){return P.c6(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",u:{"^":"d;hl:a<,eE:b<,hN:c<,jU:d<,kf:e<",
gkQ:function(){var z=this.a
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
dF:function(){return C.w.fO(this.D())},
D:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"type",this.a)
y=this.c
if(y!=null)z.n(0,"strContent",y)
y=this.b
if(y!=null)z.n(0,"listContent",y)
y=this.d
if(y!=null)z.n(0,"intContent",y)
y=this.e
if(y!=null)z.n(0,"mapContent",y)
return z},
k:function(a){var z,y,x
z="Message "+this.gkQ()
y=this.a
x=J.o(y)
return z+(x.t(y,50)||x.t(y,60)||x.t(y,90)||x.t(y,100)||x.t(y,666)||x.t(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mh:{"^":"d;h:a@,kR:b<",
k:function(a){return this.a},
gdO:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iG(z,": ")
if(y>0)return J.iK(this.a,0,y)
else return}}}],["","",,A,{"^":"",cM:{"^":"d;jd:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dG:function(){var z=new A.u(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a2:{"^":"d;eV:a@,b,c,d,aX:e<,L:f<,fQ:r<,x,y",
gk0:function(){return this.e.length===0},
du:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
k_:function(a,b){return this.du(a,b,null)},
kM:function(){return P.ae(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c_:function(a){this.r=a
return this},
bA:function(a,b){return C.b.bA(this.e,b.gaX())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hQ:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.D("String given to choice cannot be null."))
this.e=J.b7(a).eO(a)
this.d=C.b.gv(a)
this.r=f
this.b=!1
this.c=!1},
$isU:1,
$asU:function(){return[L.a2]},
w:{
eR:function(a,b,c,d,e,f,g){var z=new L.a2(!1,null,null,null,null,e,null,d,g)
z.hQ(a,!1,!1,d,e,f,g)
return z}}},eS:{"^":"fg;a,b",
gm:function(a){return this.b.length},
sm:function(a,b){C.a.sm(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
jb:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.az(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbw}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.A(u)
v=M.eL(J.i(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.O,P.at]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.az(y,"string")!=null&&!!J.o(J.az(y,"string")).$isbw)try{x=J.az(y,"string").$0()}catch(u){w=H.A(u)
v=M.eL(J.i(w))
throw H.c(v)}else x=""
r=x
q=J.az(y,"goto")
p=H.i0(J.az(y,"script"),t)
o=new L.a2(!1,null,null,null,null,null,null,q,J.az(y,"submenu"))
if(r==null)H.h(P.D("String given to choice cannot be null."))
o.e=J.b7(r).eO(r)
o.d=C.b.gv(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
j7:function(a,b,c,d,e,f,g){if(b instanceof L.a2)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eR(b,!1,!1,e,null,f,g))
else throw H.c(P.D("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.j7(a,b,!1,!1,null,null,null)},
kN:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.Q(new H.J(z,new L.jz(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.u(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.V(x,new L.jA(w))
return w},
dG:function(){return this.kN(null,null,null,null)},
k:function(a){var z=this.b
return new H.ao(z,new L.jB(),[H.m(z,0),null]).cQ(0,", ")},
$asfg:function(){return[L.a2]},
$asfp:function(){return[L.a2]},
$asL:function(){return[L.a2]},
$asX:function(){return[L.a2]},
$asv:function(){return[L.a2]}},jz:{"^":"a:0;a,b,c",
$1:function(a){return a.du(this.b,this.a,this.c)}},jA:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aR(this.a.b,a.kM())
a.a=!0}},jB:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cU:{"^":"d;d8:a<,aX:b<",
D:function(){return P.ae(["show",this.a,"string",this.b])}},o_:{"^":"d;a",
D:function(){var z=new H.P(0,null,null,null,null,null,0,[P.q,P.d])
this.a.V(0,new Z.o0(z))
return z},
V:function(a,b){this.a.V(0,b)}},o0:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.D())}},hk:{"^":"d;h:a@,bb:b<,fL:c<,dB:d<,d8:e<,h3:f<,aX:r<",w:{
hl:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.r(new Array(a.length),[Z.hk])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ar)(a),++v){u=a[v]
t=J.I(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.f(z,w)
z[w]=new Z.hk(s,r,q,p,o,n,t);++w}C.a.cp(z,new Z.p2())
return z}}},p2:{"^":"a:7;",
$2:function(a,b){return J.bt(b.gdB(),a.gdB())}},au:{"^":"d;h:a<,bb:b<,c,fL:d<,dB:e<,f,r,h3:x<,fI:y@,fK:z<,$ti",
gae:function(){return this.f},
sae:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cW=!0}},
gd8:function(){return this.r},
gaX:function(){return this.c.$1(this.f)},
D:function(){return P.ae(["name",this.a,"value",this.f,"show",this.r])},
hn:function(a){var z
this.sae(H.is(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cW=!0}},
$isdW:1,
w:{
bG:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cV()
y=z.a6(a)?H.aH(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.is(e,h)
y.r=!0
z.n(0,a,y)
return y},
o2:function(){var z,y
z=new Z.o_(new H.P(0,null,null,null,null,null,0,[P.q,Z.cU]))
y=$.$get$cV().gcn()
new H.J(y,new Z.o3(),[H.y(y,"v",0)]).V(0,new Z.o4(z))
$.cW=!1
return z},
bH:function(){var z=H.r([],[[P.G,P.q,P.d]])
$.$get$cV().gcn().V(0,new Z.o1(z))
return z}}},o3:{"^":"a:0;",
$1:function(a){return a.gfI()}},o4:{"^":"a:22;a",
$1:function(a){var z,y
z=a.gd8()
y=a.gaX()
a.sfI(!1)
this.a.a.n(0,a.a,new Z.cU(z,y))}},o1:{"^":"a:22;a",
$1:function(a){var z=new H.P(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gbb())
z.n(0,"color",a.gfL())
z.n(0,"priority",a.gdB())
z.n(0,"show",a.gd8())
z.n(0,"notifyOnChange",a.gh3())
z.n(0,"string",a.gaX())
this.a.push(z)}}}],["","",,N,{"^":"",dC:{"^":"d;h:a<,b,c,i9:d<,e,f",
gfS:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gfS()+"."+x},
geD:function(){if($.i7){var z=this.b
if(z!=null)return z.geD()}return $.r2},
ke:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geD().b){if(!!J.o(b).$isbw)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.ua.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.A(u)
y=H.B(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfS()
t=c
s=d
r=Date.now()
q=$.fh
$.fh=q+1
p=new N.lS(a,x,v,w,new P.cC(r,!1),q,t,s,e)
if($.i7)for(o=this;o!=null;){o.fn(p)
o=o.b}else $.$get$fj().fn(p)}},
cd:function(a,b,c,d){return this.ke(a,b,c,d,null)},
jG:function(a,b,c){return this.cd(C.S,a,b,c)},
ag:function(a){return this.jG(a,null,null)},
jF:function(a,b,c){return this.cd(C.R,a,b,c)},
bc:function(a){return this.jF(a,null,null)},
jE:function(a,b,c){return this.cd(C.T,a,b,c)},
bJ:function(a){return this.jE(a,null,null)},
jS:function(a,b,c){return this.cd(C.A,a,b,c)},
fY:function(a){return this.jS(a,null,null)},
kS:function(a,b,c){return this.cd(C.W,a,b,c)},
eP:function(a){return this.kS(a,null,null)},
hI:function(a,b,c){return this.cd(C.V,a,b,c)},
dP:function(a){return this.hI(a,null,null)},
fn:function(a){},
w:{
bd:function(a){return $.$get$fi().kr(a,new N.rK(a))}}},rK:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d9(z,"."))H.h(P.D("name shouldn't start with a '.'"))
y=C.b.kb(z,".")
if(y===-1)x=z!==""?N.bd(""):null
else{x=N.bd(C.b.aE(z,0,y))
z=C.b.bF(z,y+1)}w=new H.P(0,null,null,null,null,null,0,[P.q,N.dC])
w=new N.dC(z,x,null,w,new P.hn(w,[null,null]),null)
if(x!=null)x.gi9().n(0,z,w)
return w}},aT:{"^":"d;h:a<,ae:b<",
t:function(a,b){if(b==null)return!1
return b instanceof N.aT&&this.b===b.b},
aQ:function(a,b){return C.d.aQ(this.b,b.gae())},
c3:function(a,b){return C.d.c3(this.b,b.gae())},
b7:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.w(z)
return this.b>z},
bL:function(a,b){return this.b>=b.gae()},
bA:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.w(z)
return this.b-z},
gv:function(a){return this.b},
k:function(a){return this.a},
$isU:1,
$asU:function(){return[N.aT]}},lS:{"^":"d;eD:a<,b,aN:c<,d,H:e<,f,bl:r<,bh:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bs:function(a){return X.d3(J.iD(a,0,new X.tP()))},
aW:function(a,b){var z=J.al(a,b)
if(typeof z!=="number")return H.w(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d3:function(a){if(typeof a!=="number")return H.w(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
tP:{"^":"a:7;",
$2:function(a,b){return X.aW(a,J.j(b))}},
dL:{"^":"c1;a,$ti",
gae:function(){var z=this.a
if(z==null)throw H.c(new P.z("value called on absent Optional."))
return z},
bp:function(a){var z=this.a
return z==null?a:z},
gX:function(a){var z=this.a
if(z!=null){z=H.r([z],this.$ti)
z=new J.b9(z,1,0,null,[H.m(z,0)])}else z=C.H
return z},
gv:function(a){return J.j(this.a)},
t:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dL){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
hS:function(a,b){if(this.a==null)throw H.c(P.D("Must not be null."))},
w:{
ft:function(a,b){var z=new X.dL(a,[b])
z.hS(a,b)
return z}}}}],["","",,U,{"^":"",cQ:{"^":"d;a,b",
k:function(a){return this.b}},cc:{"^":"d;a,kT:b<",
geA:function(){return this.a===C.D},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
t:function(a,b){if(b==null)return!1
return b instanceof U.cc&&b.a===this.a&&J.e(b.b,this.b)},
gv:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
wb:[function(a,b){var z,y,x,w,v
z=new D.lr(b,null,null,null,null,null,null,null)
y=$.fE
$.fE=y+1
x=new H.ca(y,null,!1)
w=init.globalState.d
w.dV(y,x)
w.cF()
w=new H.mU(x,null)
w.hU(x)
z.b=w
w=w.b
w.toString
new P.cY(w,[H.m(w,0)]).aC(z.giB(),null,null,null)
b.E(new H.ci(z.b.a,init.globalState.d.a))
v=N.nf()
z.c=v
v.Q=z},"$2","hW",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f7.prototype
return J.f6.prototype}if(typeof a=="string")return J.c5.prototype
if(a==null)return J.f8.prototype
if(typeof a=="boolean")return J.f5.prototype
if(a.constructor==Array)return J.c3.prototype
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.aQ=function(a){if(a==null)return a
if(a.constructor==Array)return J.c3.prototype
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.I=function(a){if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(a.constructor==Array)return J.c3.prototype
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.aj=function(a){if(typeof a=="number")return J.c4.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.es=function(a){if(typeof a=="number")return J.c4.prototype
if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.b7=function(a){if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.al=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.es(a).a7(a,b)}
J.aX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aj(a).d3(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).t(a,b)}
J.a6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aj(a).b7(a,b)}
J.bS=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aj(a).aQ(a,b)}
J.bT=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.es(a).c4(a,b)}
J.iA=function(a){if(typeof a=="number")return-a
return J.aj(a).eS(a)}
J.bt=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aj(a).at(a,b)}
J.az=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).j(a,b)}
J.aR=function(a,b){return J.aQ(a).q(a,b)}
J.iB=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aQ(a).j_(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.bU=function(a,b){return J.es(a).bA(a,b)}
J.iC=function(a,b){return J.I(a).a5(a,b)}
J.eF=function(a,b){return J.aQ(a).as(a,b)}
J.iD=function(a,b,c){return J.aQ(a).bm(a,b,c)}
J.j=function(a){return J.o(a).gv(a)}
J.eG=function(a){return J.I(a).gU(a)}
J.am=function(a){return J.aQ(a).gX(a)}
J.iE=function(a){return J.aQ(a).gB(a)}
J.aI=function(a){return J.I(a).gm(a)}
J.iF=function(a){return J.o(a).gbu(a)}
J.iG=function(a,b){return J.I(a).aT(a,b)}
J.eH=function(a,b){return J.aQ(a).aV(a,b)}
J.iH=function(a,b,c){return J.b7(a).h_(a,b,c)}
J.dc=function(a,b,c){return J.b7(a).kw(a,b,c)}
J.cr=function(a,b,c){return J.b7(a).cU(a,b,c)}
J.iI=function(a){return J.aj(a).hg(a)}
J.iJ=function(a,b){return J.aQ(a).dR(a,b)}
J.eI=function(a,b){return J.b7(a).d9(a,b)}
J.iK=function(a,b,c){return J.b7(a).aE(a,b,c)}
J.iL=function(a){return J.aQ(a).bD(a)}
J.i=function(a){return J.o(a).k(a)}
J.bV=function(a,b){return J.aj(a).b6(a,b)}
J.iM=function(a,b){return J.aQ(a).c2(a,b)}
I.bQ=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.K=J.aS.prototype
C.a=J.c3.prototype
C.M=J.f5.prototype
C.t=J.f6.prototype
C.d=J.f7.prototype
C.u=J.f8.prototype
C.j=J.c4.prototype
C.b=J.c5.prototype
C.E=new A.an(0,0,0)
C.F=new A.an(-1/0,-1/0,-1/0)
C.G=new A.ct(-10,0,100)
C.H=new H.kE([null])
C.I=new P.mg()
C.v=new P.pW()
C.J=new P.qe()
C.h=new P.qt()
C.x=new P.aZ(0)
C.L=new U.dq(0,"ItemType.spear")
C.y=new U.dq(1,"ItemType.sword")
C.z=new U.dq(2,"ItemType.fist")
C.N=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.lw(null,null)
C.O=new P.ly(null)
C.P=new P.lz(null,null)
C.Q=new O.lH(0,"KnownToMode.all")
C.R=new N.aT("FINER",400)
C.S=new N.aT("FINEST",300)
C.T=new N.aT("FINE",500)
C.A=new N.aT("INFO",800)
C.U=new N.aT("OFF",2000)
C.V=new N.aT("SEVERE",1000)
C.W=new N.aT("WARNING",900)
C.D=new U.cQ(0,"Result.success")
C.a1=new U.cQ(1,"Result.failure")
C.a2=new U.cQ(2,"Result.criticalSuccess")
C.a3=new U.cQ(3,"Result.criticalFailure")
C.B=I.bQ([C.D,C.a1,C.a2,C.a3])
C.o=I.bQ([C.y])
C.X=I.bQ([C.z])
C.e=I.bQ([])
C.Y=new H.jK(0,{},C.e,[null,null])
C.Z=new X.dL(null,[P.K])
C.k=new R.dO(0,"Pose.standing")
C.i=new R.dO(1,"Pose.offBalance")
C.f=new R.dO(2,"Pose.onGround")
C.l=new K.dP(0,"Predetermination.none")
C.p=new K.dP(1,"Predetermination.successGuaranteed")
C.m=new K.dP(2,"Predetermination.failureGuaranteed")
C.r=new Y.c7("he","him","his","himself")
C.q=new Y.c7("it","it","its","itself")
C.a_=new Y.c7("she","her","her","herself")
C.a0=new Y.c7("they","them","their","themselves")
C.C=new Y.c7("you","you","your","yourself")
C.c=new Q.mZ(0,"Resource.stamina")
C.a4=H.b5("f9")
C.a5=H.b5("at")
C.a6=H.b5("q")
C.a7=H.b5("a1")
C.a8=H.b5("aP")
C.n=H.b5("dynamic")
C.a9=H.b5("t")
C.aa=H.b5("K")
C.ab=new P.bJ(null,2)
$.fE=1
$.fx="$cachedFunction"
$.fy="$cachedInvocation"
$.aJ=0
$.bu=null
$.eN=null
$.bo=null
$.bM=null
$.bN=null
$.eg=!1
$.p=C.h
$.eZ=0
$.et=null
$.hF=!1
$.qW=null
$.hH=!1
$.i9=!0
$.cW=!1
$.i7=!1
$.ua=C.U
$.r2=C.A
$.fh=0
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
I.$lazy(y,x,w)}})(["f2","$get$f2",function(){return H.lp()},"f3","$get$f3",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eZ
$.eZ=z+1
z="expando$key$"+z}return new P.kJ(null,z,[P.t])},"h9","$get$h9",function(){return H.aK(H.cX({
toString:function(){return"$receiver$"}}))},"ha","$get$ha",function(){return H.aK(H.cX({$method$:null,
toString:function(){return"$receiver$"}}))},"hb","$get$hb",function(){return H.aK(H.cX(null))},"hc","$get$hc",function(){return H.aK(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hg","$get$hg",function(){return H.aK(H.cX(void 0))},"hh","$get$hh",function(){return H.aK(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"he","$get$he",function(){return H.aK(H.hf(null))},"hd","$get$hd",function(){return H.aK(function(){try{null.$method$}catch(z){return z.message}}())},"hj","$get$hj",function(){return H.aK(H.hf(void 0))},"hi","$get$hi",function(){return H.aK(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e6","$get$e6",function(){return P.pE()},"bc","$get$bc",function(){var z,y
z=P.at
y=new P.F(0,P.pe(),null,[z])
y.i0(null,z)
return y},"bO","$get$bO",function(){return[]},"eo","$get$eo",function(){return new K.c0("fist",P.bx(C.X,null))},"bA","$get$bA",function(){return N.bd("PlannerRecommendation")},"hY","$get$hY",function(){return new K.re()},"ep","$get$ep",function(){var z=$.$get$hY()
return K.a5("__END_OF_ROAM__",z,z,null,null,[],"ground")},"V","$get$V",function(){return P.cO(null)},"bC","$get$bC",function(){return P.cO(null)},"ic","$get$ic",function(){return N.bd("Storyline")},"fX","$get$fX",function(){return P.bg("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cm","$get$cm",function(){return L.e5(new L.rJ())},"bR","$get$bR",function(){return L.e5(new L.rP())},"ev","$get$ev",function(){return L.e5(new L.rI())},"dM","$get$dM",function(){return new F.ml("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"em","$get$em",function(){return Y.dk(!1,"balance",!0,C.q,$.$get$bR())},"ik","$get$ik",function(){return Y.dk(!1,"pounding",!1,C.q,$.$get$bR())},"fF","$get$fF",function(){return new B.mX("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fJ","$get$fJ",function(){return new O.nb(null,!1,!0,!1,null,null)},"fW","$get$fW",function(){return new Q.nW(null,!1,!0,!0,C.c,null)},"hm","$get$hm",function(){return new M.p3("",!0,C.c,!1,!0,null)},"hG","$get$hG",function(){return P.cO(null)},"eM","$get$eM",function(){return new Z.ji(!1,!0,!1,null,null)},"it","$get$it",function(){return Y.dk(!1,"swing",!0,C.q,$.$get$bR())},"fv","$get$fv",function(){return X.ft(0,P.K)},"fw","$get$fw",function(){return X.ft(1,P.K)},"fP","$get$fP",function(){return new D.nK(!1,!1,!0,null,null)},"i_","$get$i_",function(){return K.a5("forge_church_crevice",new V.rE(),new V.rF(),null,null,H.r([new Q.x("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.x]),"ground")},"ia","$get$ia",function(){return K.a5("just_after_agruth_fight",new V.rC(),new V.rD(),null,null,H.r([],[Q.x]),"ground")},"fm","$get$fm",function(){return new V.m0('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fn","$get$fn",function(){return new V.m1('"Savior"',"name_agruth_sword_redemption",!0,null)},"fl","$get$fl",function(){return new V.m_("No name","name_agruth_sword_nothing",!0,null)},"ib","$get$ib",function(){return K.a5("kill_agruth",new V.rz(),new V.rA(),N.vn(),null,H.r([new Q.x("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.x]),"ground")},"im","$get$im",function(){return K.a5("start_of_book",new V.rx(),new V.ry(),null,null,H.r([],[Q.x]),"ground")},"f_","$get$f_",function(){return new V.l8("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"f0","$get$f0",function(){return new V.la("Flee through the War Forges","flee_through_war_forge",!0,null)},"fK","$get$fK",function(){return new V.nB("Search Agruth","search_agruth",!0,null)},"iu","$get$iu",function(){return K.a5("the_shafts",new V.rv(),new V.rw(),null,null,H.r([new Q.x("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.x]),"ground")},"iw","$get$iw",function(){return K.a5("tunnel",new V.rt(),new V.ru(),N.vo(),null,H.r([new Q.x("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.x]),"ground")},"ix","$get$ix",function(){return K.a5("underground_church",new V.rr(),new V.rs(),null,null,H.r([new Q.x("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.x]),"ground")},"iy","$get$iy",function(){return K.a5("war_forge",new V.ro(),new V.rp(),null,null,H.r([new Q.x("tunnel","Enter the corridor","You enter the corridor.",null),new Q.x("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.x]),"ground")},"hZ","$get$hZ",function(){return K.a5("entrance_to_bloodrock",new V.rm(),new V.rn(),null,null,H.r([new Q.x("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.x("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.x]),"ground")},"id","$get$id",function(){return K.a5("mountain_pass",new V.rk(),new V.rl(),null,null,H.r([new Q.x("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.x]),"ground")},"ie","$get$ie",function(){return K.a5("mountain_pass_gate",new V.ri(),new V.rj(),null,null,H.r([new Q.x("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.x]),"ground")},"ig","$get$ig",function(){return K.a5("mountain_pass_guard_post",new V.t9(),new V.rg(),N.vp(),null,H.r([new Q.x("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.x]),"ground")},"fQ","$get$fQ",function(){return new V.nM("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"h3","$get$h3",function(){return new V.oE("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"ih","$get$ih",function(){return K.a5("mountainside_base",new V.t7(),new V.t8(),null,null,H.r([new Q.x("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.x]),"ground")},"ii","$get$ii",function(){return K.a5("mountainside_path",new V.rX(),new V.t6(),null,null,H.r([new Q.x("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.x]),"ground")},"h8","$get$h8",function(){return new V.oO("Scare off the serpent","threaten_winged_serpent",!0,null)},"fS","$get$fS",function(){return new V.nO("Soothe the serpent","soothe_winged_serpent",!0,null)},"h6","$get$h6",function(){return new V.oP("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"iz","$get$iz",function(){return K.a5("winged_serpent_nest",new V.rB(),new V.rM(),null,null,H.r([new Q.x("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.x]),"ground")},"i8","$get$i8",function(){return K.a5("ironcast_road",new V.rf(),new V.rq(),null,null,H.r([new Q.x("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.x]),"ground")},"hO","$get$hO",function(){return H.r([$.$get$i_(),$.$get$ia(),$.$get$ib(),$.$get$im(),$.$get$iu(),$.$get$iw(),$.$get$ix(),$.$get$iy(),$.$get$hZ(),$.$get$id(),$.$get$ie(),$.$get$ig(),$.$get$ih(),$.$get$ii(),$.$get$iz(),$.$get$i8()],[K.cb])},"hN","$get$hN",function(){return H.r([$.$get$fm(),$.$get$fn(),$.$get$fl(),$.$get$f_(),$.$get$f0(),$.$get$fK(),$.$get$fQ(),$.$get$h3(),$.$get$h8(),$.$get$fS(),$.$get$h6()],[A.aq])},"ej","$get$ej",function(){return P.cO(null)},"db","$get$db",function(){return P.oy("")},"cl","$get$cl",function(){var z=new O.my(0,null,"PointsCounter")
z.hT()
return z},"bP","$get$bP",function(){return new L.eS(null,H.r([],[L.a2]))},"cq","$get$cq",function(){return H.fc(P.q,P.d)},"ck","$get$ck",function(){return P.b1(null,{func:1,ret:[P.O,P.at]})},"cA","$get$cA",function(){return P.bg("^\\s*<<<\\s*$",!0,!1)},"cV","$get$cV",function(){return H.fc(P.q,Z.au)},"fj","$get$fj",function(){return N.bd("")},"fi","$get$fi",function(){return P.dA(P.q,N.dC)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.H,A.a7,Y.a0]},{func:1,args:[,,,]},{func:1,ret:Q.E,args:[R.H]},{func:1,args:[R.H,A.a7,Y.a0]},{func:1,v:true},{func:1,args:[,,]},{func:1,v:true,args:[R.H,A.a7,Y.a0,R.H,S.a_]},{func:1,args:[,,,,]},{func:1,args:[P.t]},{func:1,ret:U.cF,args:[A.a7,F.Z,[P.v,R.H]]},{func:1,v:true,args:[R.H,A.a7,Y.a0,R.H,,]},{func:1,ret:P.q,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,v:true,args:[P.d],opt:[P.aV]},{func:1,args:[P.aP]},{func:1,ret:P.O},{func:1,ret:P.K,args:[A.an]},{func:1,args:[,P.aV]},{func:1,v:true,args:[P.d]},{func:1,args:[Z.au]},{func:1,ret:Y.bb,args:[P.t]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[R.H]},{func:1,args:[U.c_]},{func:1,args:[P.K,R.H]},{func:1,args:[P.be]},{func:1,ret:P.a1,args:[P.t]},{func:1,args:[Y.a9]},{func:1,args:[[P.L,Y.a9],Y.a9]},{func:1,v:true,args:[P.t]},{func:1,ret:P.a1,args:[L.a2]},{func:1,v:true,args:[[P.L,P.q],P.fL]},{func:1,args:[L.a2]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cU]},{func:1,ret:P.K,args:[A.ct]},{func:1,ret:P.q,args:[Q.a8]},{func:1,ret:P.t,args:[P.U,P.U]},{func:1,args:[{func:1,v:true}]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,ret:[P.O,U.cc],args:[P.aP,P.q],named:{rerollEffectDescription:P.q,rerollable:P.a1}},{func:1,v:true,args:[,P.aV]},{func:1,v:true,args:[P.d,P.aV]},{func:1,ret:Q.cH,args:[U.as]},{func:1,ret:Q.cE,args:[Q.x]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:L.a2,args:[P.q],named:{deferToChoiceList:P.a1,deferToEndOfPage:P.a1,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.O,P.at]},submenu:P.q}},{func:1,args:[P.a1]}]
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
if(x==y)H.vk(d||a)
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
Isolate.bQ=a.bQ
Isolate.b6=a.b6
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.io(X.hW(),b)},[])
else (function(b){H.io(X.hW(),b)})([])})})()