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
if(b5.$isaT)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.eq"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.eq"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.eq(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ba=function(){}
var dart=[["","",,H,{"^":"",wz:{"^":"d;a"}}],["","",,J,{"^":"",
q:function(a){return void 0},
aT:{"^":"d;",
t:function(a,b){return a===b},
gw:function(a){return H.aE(a)},
k:function(a){return H.cO(a)},
gbu:function(a){return new H.av(H.il(a),null)}},
fa:{"^":"aT;",
k:function(a){return String(a)},
gw:function(a){return a?519018:218159},
gbu:function(a){return C.a8},
$isa4:1},
fd:{"^":"aT;",
t:function(a,b){return null==b},
k:function(a){return"null"},
gw:function(a){return 0},
gbu:function(a){return C.a6},
$isat:1},
fg:{"^":"aT;",
gw:function(a){return 0},
gbu:function(a){return C.a5},
k:function(a){return String(a)},
$isfe:1},
wF:{"^":"fg;"},
bo:{"^":"fg;"},
c4:{"^":"aT;$ti",
fM:function(a,b){if(!!a.immutable$list)throw H.c(new P.V(b))},
cJ:function(a,b){if(!!a.fixed$length)throw H.c(new P.V(b))},
q:function(a,b){this.cJ(a,"add")
a.push(b)},
ky:function(a){this.cJ(a,"removeLast")
if(a.length===0)throw H.c(H.aI(a,-1))
return a.pop()},
ab:function(a,b){var z
this.cJ(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
iN:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.C(a))}v=z.length
if(v===y)return
this.sm(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c2:function(a,b){return new H.N(a,b,[H.m(a,0)])},
at:function(a,b){var z
this.cJ(a,"addAll")
for(z=J.an(b);z.u();)a.push(z.gG())},
V:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aP:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dT:function(a,b){return H.h7(a,b,null,H.m(a,0))},
bl:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
bd:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.af())},
dv:function(a,b){return this.bd(a,b,null)},
au:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geA:function(a){if(a.length>0)return a[0]
throw H.c(H.af())},
gv:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.af())},
gc5:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.af())
throw H.c(H.dt())},
aX:function(a,b,c,d,e){var z,y,x
this.fM(a,"setRange")
P.ca(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a7(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f9())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bS:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.C(a))}return!1},
cp:function(a,b){var z
this.fM(a,"sort")
z=b==null?P.u3():b
H.ce(a,0,a.length-1,z)},
f0:function(a){return this.cp(a,null)},
bM:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aV:function(a,b){return this.bM(a,b,0)},
a4:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gU:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
k:function(a){return P.c3(a,"[","]")},
bF:function(a){return P.b1(a,H.m(a,0))},
gZ:function(a){return new J.bc(a,a.length,0,null,[H.m(a,0)])},
gw:function(a){return H.aE(a)},
gm:function(a){return a.length},
sm:function(a,b){this.cJ(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cu(b,"newLength",null))
if(b<0)throw H.c(P.a7(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
return a[b]},
p:function(a,b,c){if(!!a.immutable$list)H.i(new P.V("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
a[b]=c},
$iscK:1,
$ascK:I.ba,
$isP:1,
$isa1:1,
$isw:1},
wy:{"^":"c4;$ti"},
bc:{"^":"d;a,b,c,d,$ti",
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
c5:{"^":"aT;",
bB:function(a,b){var z
if(typeof b!=="number")throw H.c(H.W(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdz(b)
if(this.gdz(a)===z)return 0
if(this.gdz(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdz:function(a){return a===0?1/a<0:a<0},
hj:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.V(""+a+".round()"))},
kN:function(a){return a},
b7:function(a,b){var z
if(b>20)throw H.c(P.a7(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdz(a))return"-"+z
return z},
kQ:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a7(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cK(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.V("Unexpected toString result: "+z))
x=J.J(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c3("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
eX:function(a){return-a},
a6:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a+b},
as:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a-b},
d4:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a/b},
c3:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a*b},
bJ:function(a,b){return(a|0)===a?a/b|0:this.iW(a,b)},
iW:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.V("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dm:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aS:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a<b},
b8:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a>b},
d5:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a<=b},
bN:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a>=b},
gbu:function(a){return C.ab},
$isO:1},
fc:{"^":"c5;",
gbu:function(a){return C.aa},
$isaS:1,
$isO:1,
$isu:1},
fb:{"^":"c5;",
gbu:function(a){return C.a9},
$isaS:1,
$isO:1},
c6:{"^":"aT;",
cK:function(a,b){if(b<0)throw H.c(H.aI(a,b))
if(b>=a.length)H.i(H.aI(a,b))
return a.charCodeAt(b)},
cs:function(a,b){if(b>=a.length)throw H.c(H.aI(a,b))
return a.charCodeAt(b)},
dq:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return new H.r9(b,a,c)},
eu:function(a,b){return this.dq(a,b,0)},
h2:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cK(b,c+y)!==this.cs(a,y))return
return new H.h6(c,b,a)},
a6:function(a,b){if(typeof b!=="string")throw H.c(P.cu(b,null,null))
return a+b},
ey:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bH(a,y-z)},
kA:function(a,b,c){H.bu(c)
return H.p(a,b,c)},
kB:function(a,b,c,d){H.bu(c)
P.ni(d,0,a.length,"startIndex",null)
return H.iK(a,b,c,d)},
cU:function(a,b,c){return this.kB(a,b,c,0)},
hP:function(a,b,c){var z
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.j0(b,a,c)!=null},
dc:function(a,b){return this.hP(a,b,0)},
aG:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.W(c))
if(b<0)throw H.c(P.c9(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.c9(b,null,null))
if(c>a.length)throw H.c(P.c9(c,null,null))
return a.substring(b,c)},
bH:function(a,b){return this.aG(a,b,null)},
eT:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cs(z,0)===133){x=J.du(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cK(z,w)===133?J.lU(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kR:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cs(z,0)===133?J.du(z,1):0}else{y=J.du(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c3:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.I)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bM:function(a,b,c){var z
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aV:function(a,b){return this.bM(a,b,0)},
kg:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kf:function(a,b){return this.kg(a,b,null)},
jn:function(a,b,c){if(b==null)H.i(H.W(b))
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
return H.w8(a,b,c)},
a4:function(a,b){return this.jn(a,b,0)},
gU:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
bB:function(a,b){var z
if(typeof b!=="string")throw H.c(H.W(b))
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
gbu:function(a){return C.a7},
gm:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
return a[b]},
$iscK:1,
$ascK:I.ba,
$ist:1,
$isdP:1,
A:{
ff:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
du:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cs(a,b)
if(y!==32&&y!==13&&!J.ff(y))break;++b}return b},
lU:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cK(a,z)
if(y!==32&&y!==13&&!J.ff(y))break}return b}}}}],["","",,H,{"^":"",
hN:function(a){return a},
af:function(){return new P.y("No element")},
dt:function(){return new P.y("Too many elements")},
f9:function(){return new P.y("Too few elements")},
ce:function(a,b,c,d){if(c-b<=32)H.h_(a,b,c,d)
else H.fZ(a,b,c,d)},
h_:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a8(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.p(a,w,y.j(a,v))
w=v}y.p(a,w,x)}},
fZ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bJ(c-b+1,6)
y=b+z
x=c-z
w=C.e.bJ(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.a8(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a8(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a8(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a8(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a8(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a8(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a8(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a8(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a8(d.$2(p,o),0)){n=o
o=p
p=n}t.p(a,y,s)
t.p(a,w,q)
t.p(a,x,o)
t.p(a,v,t.j(a,b))
t.p(a,u,t.j(a,c))
m=b+1
l=c-1
if(J.e(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.j(a,k)
i=d.$2(j,r)
h=J.q(i)
if(h.t(i,0))continue
if(h.aS(i,0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.ak(i)
if(h.b8(i,0)){--l
continue}else{g=l-1
if(h.aS(i,0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
l=g
m=f
break}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.bU(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else if(J.a8(d.$2(j,p),0))for(;!0;)if(J.a8(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bU(d.$2(t.j(a,l),r),0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)}l=g
break}}e=!1}h=m-1
t.p(a,b,t.j(a,h))
t.p(a,h,r)
h=l+1
t.p(a,c,t.j(a,h))
t.p(a,h,p)
H.ce(a,b,m-2,d)
H.ce(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bU(d.$2(t.j(a,l),r),0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)}l=g
break}}H.ce(a,m,l,d)}else H.ce(a,m,l,d)},
a1:{"^":"w;$ti"},
aV:{"^":"a1;$ti",
gZ:function(a){return new H.dD(this,this.gm(this),0,null,[H.z(this,"aV",0)])},
V:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.au(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gU:function(a){return this.gm(this)===0},
gv:function(a){if(this.gm(this)===0)throw H.c(H.af())
return this.au(0,this.gm(this)-1)},
a4:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(J.e(this.au(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bd:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.au(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
cb:function(a,b){var z,y,x,w
z=this.gm(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.au(0,0))
if(z!==this.gm(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.au(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.au(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c2:function(a,b){return this.dW(0,b)},
aP:function(a,b){return new H.ap(this,b,[H.z(this,"aV",0),null])},
bl:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.au(0,x))
if(z!==this.gm(this))throw H.c(new P.C(this))}return y},
bE:function(a,b){var z,y,x,w
z=[H.z(this,"aV",0)]
if(b){y=H.o([],z)
C.a.sm(y,this.gm(this))}else{x=new Array(this.gm(this))
x.fixed$length=Array
y=H.o(x,z)}for(w=0;w<this.gm(this);++w){z=this.au(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cm:function(a){return this.bE(a,!0)},
bF:function(a){var z,y
z=P.a2(null,null,null,H.z(this,"aV",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.au(0,y))
return z}},
p0:{"^":"aV;a,b,c,$ti",
gio:function(){var z=J.aL(this.a)
return z},
giU:function(){var z,y
z=J.aL(this.a)
y=this.b
if(y>z)return z
return y},
gm:function(a){var z,y
z=J.aL(this.a)
y=this.b
if(y>=z)return 0
return z-y},
au:function(a,b){var z,y
z=this.giU()+b
if(!(b<0)){y=this.gio()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cH(b,this,"index",null,null))
return J.eJ(this.a,z)},
bE:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gm(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.o([],u)
C.a.sm(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.o(s,u)}for(r=0;r<v;++r){u=x.au(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gm(y)<w)throw H.c(new P.C(this))}return t},
i_:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a7(z,0,null,"start",null))},
A:{
h7:function(a,b,c,d){var z=new H.p0(a,b,c,[d])
z.i_(a,b,c,d)
return z}}},
dD:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gm(z)
if(this.b!==y)throw H.c(new P.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.au(0,x);++this.c
return!0}},
dG:{"^":"w;a,b,$ti",
gZ:function(a){return new H.mo(null,J.an(this.a),this.b,this.$ti)},
gm:function(a){return J.aL(this.a)},
gU:function(a){return J.eK(this.a)},
gv:function(a){return this.b.$1(J.iY(this.a))},
$asw:function(a,b){return[b]},
A:{
bB:function(a,b,c,d){if(!!J.q(a).$isa1)return new H.bz(a,b,[c,d])
return new H.dG(a,b,[c,d])}}},
bz:{"^":"dG;a,b,$ti",$isa1:1,
$asa1:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
mo:{"^":"cJ;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascJ:function(a,b){return[b]}},
ap:{"^":"aV;a,b,$ti",
gm:function(a){return J.aL(this.a)},
au:function(a,b){return this.b.$1(J.eJ(this.a,b))},
$asaV:function(a,b){return[b]},
$asa1:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
N:{"^":"w;a,b,$ti",
gZ:function(a){return new H.cf(J.an(this.a),this.b,this.$ti)},
aP:function(a,b){return new H.dG(this,b,[H.m(this,0),null])}},
cf:{"^":"cJ;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fR:{"^":"w;a,b,$ti",
gZ:function(a){return new H.o6(J.an(this.a),this.b,this.$ti)},
A:{
o5:function(a,b,c){if(!!J.q(a).$isa1)return new H.kZ(a,H.hN(b),[c])
return new H.fR(a,H.hN(b),[c])}}},
kZ:{"^":"fR;a,b,$ti",
gm:function(a){var z=J.aL(this.a)-this.b
if(z>=0)return z
return 0},
$isa1:1},
o6:{"^":"cJ;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gG:function(){return this.a.gG()}},
l_:{"^":"d;$ti",
u:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
ck:function(a,b){var z=a.cM(b)
if(!init.globalState.d.cy)init.globalState.f.bt()
return z},
iH:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.q(y).$isP)throw H.c(P.D("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qW(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$f7()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qv(P.b3(null,H.ci),0)
x=P.u
y.z=new H.T(0,null,null,null,null,null,0,[x,H.ee])
y.ch=new H.T(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qV()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lM,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qX)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a2(null,null,null,x)
v=new H.cb(0,null,!1)
u=new H.ee(y,new H.T(0,null,null,null,null,null,0,[x,H.cb]),w,init.createNewIsolate(),v,new H.bd(H.da()),new H.bd(H.da()),!1,!1,[],P.a2(null,null,null,null),null,null,!1,!0,P.a2(null,null,null,null))
w.q(0,0)
u.dY(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cM(new H.vx(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cM(new H.vy(z,a))
else u.cM(a)
init.globalState.f.bt()},
lQ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lR()
return},
lR:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.V("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.V('Cannot extract URI from "'+z+'"'))},
lM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d_(!0,[]).bU(b.data)
y=J.J(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d_(!0,[]).bU(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d_(!0,[]).bU(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.a2(null,null,null,q)
o=new H.cb(0,null,!1)
n=new H.ee(y,new H.T(0,null,null,null,null,null,0,[q,H.cb]),p,init.createNewIsolate(),o,new H.bd(H.da()),new H.bd(H.da()),!1,!1,[],P.a2(null,null,null,null),null,null,!1,!0,P.a2(null,null,null,null))
p.q(0,0)
n.dY(0,o)
init.globalState.f.a.aC(new H.ci(n,new H.lN(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bt()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").E(y.j(z,"msg"))
init.globalState.f.bt()
break
case"close":init.globalState.ch.ab(0,$.$get$f8().j(0,a))
a.terminate()
init.globalState.f.bt()
break
case"log":H.lL(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.bq(!0,P.bN(null,P.u)).bg(q)
y.toString
self.postMessage(q)}else P.eA(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lL:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.bq(!0,P.bN(null,P.u)).bg(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.B(w)
y=P.cD(z)
throw H.c(y)}},
lO:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fC=$.fC+("_"+y)
$.fD=$.fD+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.cj(y,x),w,z.r])
x=new H.lP(a,b,c,d,z)
if(e===!0){z.fI(w,w)
init.globalState.f.a.aC(new H.ci(z,x,"start isolate"))}else x.$0()},
rq:function(a){return new H.d_(!0,[]).bU(new H.bq(!1,P.bN(null,P.u)).bg(a))},
vx:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vy:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qW:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
qX:function(a){var z=P.ab(["command","print","msg",a])
return new H.bq(!0,P.bN(null,P.u)).bg(z)}}},
ee:{"^":"d;i:a<,b,c,kd:d<,jp:e<,f,r,x,cP:y<,z,Q,ch,cx,cy,db,dx",
fI:function(a,b){if(!this.f.t(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cF()},
kz:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.ab(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fH(x)}this.y=!1}this.cF()},
jc:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kw:function(a){var z,y,x
if(this.ch==null)return
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.V("removeRange"))
P.ca(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hI:function(a,b){if(!this.r.t(0,a))return
this.db=b},
jN:function(a,b,c){var z=J.q(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b3(null,null)
this.cx=z}z.aC(new H.qM(a,c))},
jM:function(a,b){var z
if(!this.r.t(0,a))return
z=J.q(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.eH()
return}z=this.cx
if(z==null){z=P.b3(null,null)
this.cx=z}z.aC(this.gke())},
jO:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eA(a)
if(b!=null)P.eA(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.aj(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.E(y)},
cM:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.A(u)
v=H.B(u)
this.jO(w,v)
if(this.db===!0){this.eH()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gkd()
if(this.cx!=null)for(;t=this.cx,!t.gU(t);)this.cx.dE().$0()}return y},
ce:function(a){return this.b.j(0,a)},
dY:function(a,b){var z=this.b
if(z.a9(a))throw H.c(P.cD("Registry: ports must be registered only once."))
z.p(0,a,b)},
cF:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.eH()},
eH:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b5(0)
for(z=this.b,y=z.gcn(),y=y.gZ(y);y.u();)y.gG().ih()
z.b5(0)
this.c.b5(0)
init.globalState.z.ab(0,this.a)
this.dx.b5(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.E(z[v])}this.ch=null}},"$0","gke",0,0,6]},
qM:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
qv:{"^":"d;a,b",
ju:function(){var z=this.a
if(z.b===z.c)return
return z.dE()},
hm:function(){var z,y,x
z=this.ju()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a9(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gU(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cD("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gU(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ab(["command","close"])
x=new H.bq(!0,new P.hI(0,null,null,null,null,null,0,[null,P.u])).bg(x)
y.toString
self.postMessage(x)}return!1}z.ku()
return!0},
fz:function(){if(self.window!=null)new H.qw(this).$0()
else for(;this.hm(););},
bt:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fz()
else try{this.fz()}catch(x){z=H.A(x)
y=H.B(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bq(!0,P.bN(null,P.u)).bg(v)
w.toString
self.postMessage(v)}}},
qw:{"^":"a:6;a",
$0:function(){if(!this.a.hm())return
P.px(C.x,this)}},
ci:{"^":"d;a,b,c",
ku:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cM(this.b)}},
qV:{"^":"d;"},
lN:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lO(this.a,this.b,this.c,this.d,this.e,this.f)}},
lP:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cF()}},
hC:{"^":"d;"},
cj:{"^":"hC;b,a",
E:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfm())return
x=H.rq(a)
if(z.gjp()===y){y=J.J(x)
switch(y.j(x,0)){case"pause":z.fI(y.j(x,1),y.j(x,2))
break
case"resume":z.kz(y.j(x,1))
break
case"add-ondone":z.jc(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kw(y.j(x,1))
break
case"set-errors-fatal":z.hI(y.j(x,1),y.j(x,2))
break
case"ping":z.jN(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.jM(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.ab(0,y)
break}return}init.globalState.f.a.aC(new H.ci(z,new H.qZ(this,x),"receive"))},
t:function(a,b){if(b==null)return!1
return b instanceof H.cj&&J.e(this.b,b.b)},
gw:function(a){return this.b.gea()}},
qZ:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfm())z.i5(this.b)}},
eh:{"^":"hC;b,c,a",
E:function(a){var z,y,x
z=P.ab(["command","message","port",this,"msg",a])
y=new H.bq(!0,P.bN(null,P.u)).bg(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.eh&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eY()
y=this.a
if(typeof y!=="number")return y.eY()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cb:{"^":"d;ea:a<,b,fm:c<",
ih:function(){this.c=!0
this.b=null},
bj:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.ab(0,y)
z.c.ab(0,y)
z.cF()},
i5:function(a){if(this.c)return
this.b.$1(a)},
$isnj:1},
nk:{"^":"ai;a,b",
aF:function(a,b,c,d){var z=this.b
z.toString
return new P.cZ(z,[H.m(z,0)]).aF(a,b,c,d)},
eK:function(a,b,c){return this.aF(a,null,b,c)},
bj:[function(){this.a.bj()
this.b.bj()},"$0","gjl",0,0,6],
hY:function(a){var z=new P.rd(null,0,null,null,null,null,this.gjl(),[null])
this.b=z
this.a.b=z.gj2(z)},
$asai:I.ba},
pt:{"^":"d;a,b,c",
gca:function(){return this.c!=null},
i0:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aC(new H.ci(y,new H.pv(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d7(new H.pw(this,b),0),a)}else throw H.c(new P.V("Timer greater than 0."))},
A:{
pu:function(a,b){var z=new H.pt(!0,!1,null)
z.i0(a,b)
return z}}},
pv:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pw:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bd:{"^":"d;ea:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.kZ()
z=C.j.dm(z,0)^C.j.bJ(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bd){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bq:{"^":"d;a,b",
bg:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gm(z))
z=J.q(a)
if(!!z.$iscK)return this.hE(a)
if(!!z.$islJ){x=this.ghB()
z=a.gcc()
z=H.bB(z,x,H.z(z,"w",0),null)
z=P.U(z,!0,H.z(z,"w",0))
w=a.gcn()
w=H.bB(w,x,H.z(w,"w",0),null)
return["map",z,P.U(w,!0,H.z(w,"w",0))]}if(!!z.$isfe)return this.hF(a)
if(!!z.$isaT)this.hp(a)
if(!!z.$isnj)this.d0(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscj)return this.hG(a)
if(!!z.$iseh)return this.hH(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d0(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbd)return["capability",a.a]
if(!(a instanceof P.d))this.hp(a)
return["dart",init.classIdExtractor(a),this.hD(init.classFieldsExtractor(a))]},"$1","ghB",2,0,0],
d0:function(a,b){throw H.c(new P.V((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hp:function(a){return this.d0(a,null)},
hE:function(a){var z=this.hC(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d0(a,"Can't serialize indexable: ")},
hC:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.bg(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hD:function(a){var z
for(z=0;z<a.length;++z)C.a.p(a,z,this.bg(a[z]))
return a},
hF:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d0(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.bg(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hH:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hG:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gea()]
return["raw sendport",a]}},
d_:{"^":"d;a,b",
bU:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.D("Bad serialized message: "+H.b(a)))
switch(C.a.geA(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.o(this.cL(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.o(this.cL(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cL(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.o(this.cL(x),[null])
y.fixed$length=Array
return y
case"map":return this.jx(a)
case"sendport":return this.jy(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jw(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.bd(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cL(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjv",2,0,0],
cL:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.p(a,y,this.bU(z.j(a,y)));++y}return a},
jx:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aD()
this.b.push(w)
y=J.eL(y,this.gjv()).cm(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.f(y,u)
w.p(0,y[u],this.bU(v.j(x,u)))}return w},
jy:function(a){var z,y,x,w,v,u,t
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
t=new H.cj(u,x)}else t=new H.eh(y,w,x)
this.b.push(t)
return t},
jw:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.j(y,u)]=this.bU(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
k4:function(){throw H.c(new P.V("Cannot modify unmodifiable Map"))},
uF:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.W(a))
return z},
aE:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bE:function(a){var z,y,x,w,v,u,t,s
z=J.q(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.K||!!J.q(a).$isbo){v=C.N(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cs(w,0)===36)w=C.b.bH(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d9(H.cn(a),0,null),init.mangledGlobalNames)},
cO:function(a){return"Instance of '"+H.bE(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dm(z,10))>>>0,56320|z&1023)}throw H.c(P.a7(a,0,1114111,null,null))},
bj:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nb:function(a){var z=H.bj(a).getFullYear()+0
return z},
n9:function(a){var z=H.bj(a).getMonth()+1
return z},
n5:function(a){var z=H.bj(a).getDate()+0
return z},
n6:function(a){var z=H.bj(a).getHours()+0
return z},
n8:function(a){var z=H.bj(a).getMinutes()+0
return z},
na:function(a){var z=H.bj(a).getSeconds()+0
return z},
n7:function(a){var z=H.bj(a).getMilliseconds()+0
return z},
dS:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.W(a))
return a[b]},
fE:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.W(a))
a[b]=c},
x:function(a){throw H.c(H.W(a))},
f:function(a,b){if(a==null)J.aL(a)
throw H.c(H.aI(a,b))},
aI:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b_(!0,b,"index",null)
z=J.aL(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cH(b,a,"index",null,z)
return P.c9(b,"index",null)},
W:function(a){return new P.b_(!0,a,null,null)},
d5:function(a){if(typeof a!=="number")throw H.c(H.W(a))
return a},
rL:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.W(a))
return a},
bu:function(a){if(typeof a!=="string")throw H.c(H.W(a))
return a},
c:function(a){var z
if(a==null)a=new P.cM()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iO})
z.name=""}else z.toString=H.iO
return z},
iO:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.C(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wf(a)
if(a==null)return
if(a instanceof H.dp)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dm(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dx(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.ft(v,null))}}if(a instanceof TypeError){u=$.$get$hk()
t=$.$get$hl()
s=$.$get$hm()
r=$.$get$hn()
q=$.$get$hr()
p=$.$get$hs()
o=$.$get$hp()
$.$get$ho()
n=$.$get$hu()
m=$.$get$ht()
l=u.bn(y)
if(l!=null)return z.$1(H.dx(y,l))
else{l=t.bn(y)
if(l!=null){l.method="call"
return z.$1(H.dx(y,l))}else{l=s.bn(y)
if(l==null){l=r.bn(y)
if(l==null){l=q.bn(y)
if(l==null){l=p.bn(y)
if(l==null){l=o.bn(y)
if(l==null){l=r.bn(y)
if(l==null){l=n.bn(y)
if(l==null){l=m.bn(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.ft(y,l==null?null:l.method))}}return z.$1(new H.pB(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h0()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b_(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h0()
return a},
B:function(a){var z
if(a instanceof H.dp)return a.b
if(a==null)return new H.hK(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hK(a,null)},
uW:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aE(a)},
uo:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
uK:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ck(b,new H.uL(a))
case 1:return H.ck(b,new H.uM(a,d))
case 2:return H.ck(b,new H.uN(a,d,e))
case 3:return H.ck(b,new H.uO(a,d,e,f))
case 4:return H.ck(b,new H.uP(a,d,e,f,g))}throw H.c(P.cD("Unsupported number of arguments for wrapped closure"))},
d7:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uK)
a.$identity=z
return z},
k0:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.q(c).$isP){z.$reflectionInfo=c
x=H.nm(z).r}else x=c
w=d?Object.create(new H.ox().constructor.prototype):Object.create(new H.de(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aM
$.aM=J.am(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eX(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.uF,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eS:H.df
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eX(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jY:function(a,b,c,d){var z=H.df
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eX:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.k_(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jY(y,!w,z,b)
if(y===0){w=$.aM
$.aM=J.am(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.by
if(v==null){v=H.cx("self")
$.by=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aM
$.aM=J.am(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.by
if(v==null){v=H.cx("self")
$.by=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jZ:function(a,b,c,d){var z,y
z=H.df
y=H.eS
switch(b?-1:a){case 0:throw H.c(new H.nx("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
k_:function(a,b){var z,y,x,w,v,u,t,s
z=H.jP()
y=$.eR
if(y==null){y=H.cx("receiver")
$.eR=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jZ(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aM
$.aM=J.am(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aM
$.aM=J.am(u,1)
return new Function(y+H.b(u)+"}")()},
eq:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.q(c).$isP){c.fixed$length=Array
z=c}else z=c
return H.k0(a,b,z,!!d,e,f)},
iC:function(a,b){var z=J.J(b)
throw H.c(H.cz(H.bE(a),z.aG(b,3,z.gm(b))))},
K:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.q(a)[b]
else z=!0
if(z)return a
H.iC(a,b)},
uT:function(a,b){if(!!J.q(a).$isP||a==null)return a
if(J.q(a)[b])return a
H.iC(a,b)},
et:function(a){var z=J.q(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.et(a)
return z==null?!1:H.ex(z,b)},
ie:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.a0(b,null)
y=H.et(a)
throw H.c(H.cz(y!=null?H.a0(y,null):H.bE(a),z))},
wd:function(a){throw H.c(new P.kh(a))},
da:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b9:function(a){return new H.av(a,null)},
o:function(a,b){a.$ti=b
return a},
cn:function(a){if(a==null)return
return a.$ti},
ik:function(a,b){return H.eH(a["$as"+H.b(b)],H.cn(a))},
z:function(a,b,c){var z=H.ik(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cn(a)
return z==null?null:z[b]},
a0:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d9(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a0(z,b)
return H.rv(a,b)}return"unknown-reified-type"},
rv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a0(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a0(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a0(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.un(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a0(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d9:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bK("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.B=v+", "
u=a[y]
if(u!=null)w=!1
v=z.B+=H.a0(u,c)}return w?"":"<"+z.k(0)+">"},
il:function(a){var z,y
if(a instanceof H.a){z=H.et(a)
if(z!=null)return H.a0(z,null)}y=J.q(a).constructor.builtin$cls
if(a==null)return y
return y+H.d9(a.$ti,0,null)},
eH:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cn(a)
y=J.q(a)
if(y[b]==null)return!1
return H.i1(H.eH(y[d],z),c)},
aK:function(a,b,c,d){if(a==null)return a
if(H.aR(a,b,c,d))return a
throw H.c(H.cz(H.bE(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d9(c,0,null),init.mangledGlobalNames)))},
i1:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.al(a[y],b[y]))return!1
return!0},
b8:function(a,b,c){return a.apply(b,H.ik(b,c))},
d6:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cn(a)
a=J.q(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ex(x.apply(a,null),b)}return H.al(y,b)},
iL:function(a,b){if(a!=null&&!H.d6(a,b))throw H.c(H.cz(H.bE(a),H.a0(b,null)))
return a},
al:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.ex(a,b)
if('func' in a)return b.builtin$cls==="bA"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.a0(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.i1(H.eH(u,z),x)},
i0:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.al(z,v)||H.al(v,z)))return!1}return!0},
rF:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.al(v,u)||H.al(u,v)))return!1}return!0},
ex:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.al(z,y)||H.al(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.i0(x,w,!1))return!1
if(!H.i0(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}}return H.rF(a.named,b.named)},
w8:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.q(b)
if(!!z.$isdv){z=C.b.bH(a,c)
return b.b.test(z)}else{z=z.eu(b,C.b.bH(a,c))
return!z.gU(z)}}},
wa:function(a,b,c,d){var z,y,x
z=b.fg(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eG(a,x,x+y[0].length,c)},
p:function(a,b,c){var z,y,x
H.bu(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
wU:[function(a){return a},"$1","hO",2,0,23],
w9:function(a,b,c,d){var z,y,x,w,v,u
z=J.q(b)
if(!z.$isdP)throw H.c(P.cu(b,"pattern","is not a Pattern"))
for(z=z.eu(b,a),z=new H.hA(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hO().$1(C.b.aG(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hO().$1(C.b.bH(a,y)))
return z.charCodeAt(0)==0?z:z},
iK:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eG(a,z,z+b.length,c)}y=J.q(b)
if(!!y.$isdv)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wa(a,b,c,d)
if(b==null)H.i(H.W(b))
y=y.dq(b,a,d)
x=y.gZ(y)
if(!x.u())return a
w=x.gG()
y=w.gf1()
v=w.gfS()
H.bu(c)
u=P.ca(y,v,a.length,null,null,null)
H.rL(u)
return H.eG(a,y,u,c)},
eG:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k3:{"^":"d;$ti",
gU:function(a){return this.gm(this)===0},
gaq:function(a){return this.gm(this)!==0},
k:function(a){return P.dH(this)},
p:function(a,b,c){return H.k4()},
$isG:1},
k5:{"^":"k3;a,b,c,$ti",
gm:function(a){return this.a},
a9:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.a9(b))return
return this.fh(b)},
fh:function(a){return this.b[a]},
V:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fh(w))}}},
nl:{"^":"d;a,b,c,d,e,f,r,x",A:{
nm:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nl(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
py:{"^":"d;a,b,c,d,e,f",
bn:function(a){var z,y,x
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
aN:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.py(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cY:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hq:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
ft:{"^":"a6;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lW:{"^":"a6;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
dx:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lW(a,y,z?null:b.receiver)}}},
pB:{"^":"a6;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dp:{"^":"d;a,bh:b<"},
wf:{"^":"a:0;a",
$1:function(a){if(!!J.q(a).$isa6)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hK:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uL:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uM:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uN:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uO:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uP:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bE(this).trim()+"'"},
ghx:function(){return this},
$isbA:1,
ghx:function(){return this}},
hg:{"^":"a;"},
ox:{"^":"hg;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
de:{"^":"hg;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.de))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.aE(this.a)
else y=typeof z!=="object"?J.j(z):H.aE(z)
z=H.aE(this.b)
if(typeof y!=="number")return y.l_()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cO(z)},
A:{
df:function(a){return a.a},
eS:function(a){return a.c},
jP:function(){var z=$.by
if(z==null){z=H.cx("self")
$.by=z}return z},
cx:function(a){var z,y,x,w,v
z=new H.de("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jU:{"^":"a6;a",
k:function(a){return this.a},
A:{
cz:function(a,b){return new H.jU("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nx:{"^":"a6;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
av:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gw:function(a){return J.j(this.a)},
t:function(a,b){if(b==null)return!1
return b instanceof H.av&&J.e(this.a,b.a)}},
T:{"^":"d;a,b,c,d,e,f,r,$ti",
gm:function(a){return this.a},
gU:function(a){return this.a===0},
gaq:function(a){return!this.gU(this)},
gcc:function(){return new H.mc(this,[H.m(this,0)])},
gcn:function(){return H.bB(this.gcc(),new H.lV(this),H.m(this,0),H.m(this,1))},
a9:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fc(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fc(y,a)}else return this.jZ(a)},
jZ:function(a){var z=this.d
if(z==null)return!1
return this.cO(this.di(z,this.cN(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cv(z,b)
return y==null?null:y.gbW()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cv(x,b)
return y==null?null:y.gbW()}else return this.k_(b)},
k_:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.di(z,this.cN(a))
x=this.cO(y,a)
if(x<0)return
return y[x].gbW()},
p:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ec()
this.b=z}this.f6(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ec()
this.c=y}this.f6(y,b,c)}else this.k5(b,c)},
k5:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ec()
this.d=z}y=this.cN(a)
x=this.di(z,y)
if(x==null)this.en(z,y,[this.ed(a,b)])
else{w=this.cO(x,a)
if(w>=0)x[w].sbW(b)
else x.push(this.ed(a,b))}},
kv:function(a,b){var z
if(this.a9(a))return this.j(0,a)
z=b.$0()
this.p(0,a,z)
return z},
ab:function(a,b){if(typeof b==="string")return this.fw(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fw(this.c,b)
else return this.k0(b)},
k0:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.di(z,this.cN(a))
x=this.cO(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fB(w)
return w.gbW()},
b5:function(a){if(this.a>0){this.f=null
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
f6:function(a,b,c){var z=this.cv(a,b)
if(z==null)this.en(a,b,this.ed(b,c))
else z.sbW(c)},
fw:function(a,b){var z
if(a==null)return
z=this.cv(a,b)
if(z==null)return
this.fB(z)
this.fd(a,b)
return z.gbW()},
ed:function(a,b){var z,y
z=new H.mb(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fB:function(a){var z,y
z=a.giJ()
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
for(y=0;y<z;++y)if(J.e(a[y].gfZ(),b))return y
return-1},
k:function(a){return P.dH(this)},
cv:function(a,b){return a[b]},
di:function(a,b){return a[b]},
en:function(a,b,c){a[b]=c},
fd:function(a,b){delete a[b]},
fc:function(a,b){return this.cv(a,b)!=null},
ec:function(){var z=Object.create(null)
this.en(z,"<non-identifier-key>",z)
this.fd(z,"<non-identifier-key>")
return z},
$islJ:1,
$isG:1,
A:{
fh:function(a,b){return new H.T(0,null,null,null,null,null,0,[a,b])}}},
lV:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
mb:{"^":"d;fZ:a<,bW:b@,c,iJ:d<,$ti"},
mc:{"^":"a1;a,$ti",
gm:function(a){return this.a.a},
gU:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.md(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a4:function(a,b){return this.a.a9(b)},
V:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.C(z))
y=y.c}}},
md:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dv:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giF:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dw(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giE:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dw(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dq:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return new H.qb(this,b,c)},
eu:function(a,b){return this.dq(a,b,0)},
fg:function(a,b){var z,y
z=this.giF()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hJ(this,y)},
ip:function(a,b){var z,y
z=this.giE()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hJ(this,y)},
h2:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return this.ip(b,c)},
$isdP:1,
A:{
dw:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f4("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hJ:{"^":"d;a,b",
gf1:function(){return this.b.index},
gfS:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbi:1},
qb:{"^":"c2;a,b,c",
gZ:function(a){return new H.hA(this.a,this.b,this.c,null)},
$asc2:function(){return[P.bi]},
$asw:function(){return[P.bi]}},
hA:{"^":"d;a,b,c,d",
gG:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fg(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
h6:{"^":"d;f1:a<,b,c",
gfS:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.c9(b,null,null))
return this.c},
$isbi:1},
r9:{"^":"w;a,b,c",
gZ:function(a){return new H.ra(this.a,this.b,this.c,null)},
$asw:function(){return[P.bi]}},
ra:{"^":"d;a,b,c,d",
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
this.d=new H.h6(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
un:function(a){var z=H.o(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
v2:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
qc:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rG()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d7(new P.qe(z),1)).observe(y,{childList:true})
return new P.qd(z,y,x)}else if(self.setImmediate!=null)return P.rH()
return P.rI()},
wO:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d7(new P.qf(a),0))},"$1","rG",2,0,14],
wP:[function(a){++init.globalState.f.b
self.setImmediate(H.d7(new P.qg(a),0))},"$1","rH",2,0,14],
wQ:[function(a){P.e4(C.x,a)},"$1","rI",2,0,14],
aH:function(a,b){P.ei(null,a)
return b.gfW()},
aw:function(a,b){P.ei(a,b)},
aG:function(a,b){b.bT(a)},
aF:function(a,b){b.ex(H.A(a),H.B(a))},
ei:function(a,b){var z,y,x,w
z=new P.rk(b)
y=new P.rl(b)
x=J.q(a)
if(!!x.$isF)a.eo(z,y)
else if(!!x.$isS)a.eR(z,y)
else{w=new P.F(0,$.r,null,[null])
w.a=4
w.c=a
w.eo(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rE(z)},
d2:function(a,b,c){var z,y,x
if(b===0){if(c.geD())c.c.ew()
else c.a.bj()
return}else if(b===1){if(c.geD())c.c.ex(H.A(a),H.B(a))
else{z=H.A(a)
y=H.B(a)
c.a.er(z,y)
c.a.bj()}return}if(a instanceof P.bL){if(c.geD()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aB(c.a,z)
P.cp(new P.ri(b,c))
return}else if(z===1){x=a.a
c.a.jg(x,!1).c_(new P.rj(b,c))
return}}P.ei(a,b)},
rD:function(a){return a.gdU()},
en:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aC:function(a){return new P.rb(new P.F(0,$.r,null,[a]),[a])},
rt:function(a,b,c){$.r.toString
a.ba(b,c)},
rx:function(){var z,y
for(;z=$.br,z!=null;){$.bP=null
y=z.gcf()
$.br=y
if(y==null)$.bO=null
z.gji().$0()}},
wT:[function(){$.ej=!0
try{P.rx()}finally{$.bP=null
$.ej=!1
if($.br!=null)$.$get$e8().$1(P.i2())}},"$0","i2",0,0,6],
hX:function(a){var z=new P.hB(a,null)
if($.br==null){$.bO=z
$.br=z
if(!$.ej)$.$get$e8().$1(P.i2())}else{$.bO.b=z
$.bO=z}},
rC:function(a){var z,y,x
z=$.br
if(z==null){P.hX(a)
$.bP=$.bO
return}y=new P.hB(a,null)
x=$.bP
if(x==null){y.b=z
$.bP=y
$.br=y}else{y.b=x.b
x.b=y
$.bP=y
if(y.b==null)$.bO=y}},
cp:function(a){var z=$.r
if(C.h===z){P.bt(null,null,C.h,a)
return}z.toString
P.bt(null,null,z,z.ev(a,!0))},
wL:function(a,b){return new P.r8(null,a,!1,[b])},
eo:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.A(x)
y=H.B(x)
w=$.r
w.toString
P.bs(null,null,w,z,y)}},
ry:[function(a,b){var z=$.r
z.toString
P.bs(null,null,z,a,b)},function(a){return P.ry(a,null)},"$2","$1","rK",2,2,15,0],
wS:[function(){},"$0","rJ",0,0,6],
hW:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.A(u)
y=H.B(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbk()
w=t
v=x.gbh()
c.$2(w,v)}}},
rm:function(a,b,c,d){var z=a.c9()
if(!!J.q(z).$isS&&z!==$.$get$bf())z.c1(new P.ro(b,c,d))
else b.ba(c,d)},
hL:function(a,b){return new P.rn(a,b)},
hM:function(a,b,c){var z=a.c9()
if(!!J.q(z).$isS&&z!==$.$get$bf())z.c1(new P.rp(b,c))
else b.b9(c)},
rh:function(a,b,c){$.r.toString
a.c6(b,c)},
px:function(a,b){var z=$.r
if(z===C.h){z.toString
return P.e4(a,b)}return P.e4(a,z.ev(b,!0))},
e4:function(a,b){var z=C.e.bJ(a.a,1000)
return H.pu(z<0?0:z,b)},
pM:function(){return $.r},
bs:function(a,b,c,d,e){var z={}
z.a=d
P.rC(new P.rA(z,e))},
hT:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
hV:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
hU:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bt:function(a,b,c,d){var z=C.h!==c
if(z)d=c.ev(d,!(!z||!1))
P.hX(d)},
qe:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
qd:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qf:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qg:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rk:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
rl:{"^":"a:20;a",
$2:function(a,b){this.a.$2(1,new H.dp(a,b))}},
rE:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
ri:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcP()){z.b=!0
return}this.a.$2(null,0)}},
rj:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qh:{"^":"d;a,b,c",
gdU:function(){return this.a.gdU()},
gcP:function(){return this.a.gcP()},
geD:function(){return this.c!=null},
q:function(a,b){return J.aB(this.a,b)},
er:function(a,b){return this.a.er(a,b)},
bj:function(){return this.a.bj()},
i2:function(a){var z=new P.qk(a)
this.a=new P.qp(null,0,null,new P.qm(z),null,new P.qn(this,z),new P.qo(this,a),[null])},
A:{
qi:function(a){var z=new P.qh(null,!1,null)
z.i2(a)
return z}}},
qk:{"^":"a:2;a",
$0:function(){P.cp(new P.ql(this.a))}},
ql:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qm:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qn:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qo:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gka()){z.c=new P.cg(new P.F(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cp(new P.qj(this.b))}return z.c.gfW()}}},
qj:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bL:{"^":"d;ac:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bM:function(a){return new P.bL(a,1)},
aO:function(){return C.ac},
hG:function(a){return new P.bL(a,0)},
aP:function(a){return new P.bL(a,3)}}},
b7:{"^":"d;a,b,c,d",
gG:function(){var z=this.c
return z==null?this.b:z.gG()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bL){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.an(z)
if(!!w.$isb7){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
rc:{"^":"c2;a",
gZ:function(a){return new P.b7(this.a(),null,null,null)},
$asc2:I.ba,
$asw:I.ba,
A:{
aQ:function(a){return new P.rc(a)}}},
S:{"^":"d;$ti"},
hD:{"^":"d;fW:a<,$ti",
ex:function(a,b){if(a==null)a=new P.cM()
if(this.a.a!==0)throw H.c(new P.y("Future already completed"))
$.r.toString
this.ba(a,b)},
dt:function(a){return this.ex(a,null)}},
cg:{"^":"hD;a,$ti",
bT:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.y("Future already completed"))
z.by(a)},
ew:function(){return this.bT(null)},
ba:function(a,b){this.a.f8(a,b)}},
rb:{"^":"hD;a,$ti",
bT:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.y("Future already completed"))
z.b9(a)},
ew:function(){return this.bT(null)},
ba:function(a,b){this.a.ba(a,b)}},
ed:{"^":"d;ef:a<,b,c,d,e,$ti",
gj_:function(){return this.b.b},
gfY:function(){return(this.c&1)!==0},
gjR:function(){return(this.c&2)!==0},
gfX:function(){return this.c===8},
jP:function(a){return this.b.b.eQ(this.d,a)},
kk:function(a){if(this.c!==6)return!0
return this.b.b.eQ(this.d,a.gbk())},
jL:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.kI(z,a.gbk(),a.gbh())
else return y.eQ(z,a.gbk())},
jQ:function(){return this.b.b.hk(this.d)}},
F:{"^":"d;cD:a<,b,iO:c<,$ti",
giz:function(){return this.a===2},
geb:function(){return this.a>=4},
eR:function(a,b){var z=$.r
if(z!==C.h){z.toString
if(b!=null)b=P.en(b,z)}return this.eo(a,b)},
c_:function(a){return this.eR(a,null)},
eo:function(a,b){var z,y
z=new P.F(0,$.r,null,[null])
y=b==null?1:3
this.dd(new P.ed(null,z,y,a,b,[H.m(this,0),null]))
return z},
c1:function(a){var z,y
z=$.r
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.dd(new P.ed(null,y,8,a,null,[z,z]))
return y},
dd:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.geb()){y.dd(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bt(null,null,z,new P.qz(this,a))}},
fs:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gef()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.geb()){v.fs(a)
return}this.a=v.a
this.c=v.c}z.a=this.dk(a)
y=this.b
y.toString
P.bt(null,null,y,new P.qG(z,this))}},
dj:function(){var z=this.c
this.c=null
return this.dk(z)},
dk:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gef()
z.a=y}return y},
b9:function(a){var z,y
z=this.$ti
if(H.aR(a,"$isS",z,"$asS"))if(H.aR(a,"$isF",z,null))P.d0(a,this)
else P.hF(a,this)
else{y=this.dj()
this.a=4
this.c=a
P.bp(this,y)}},
ba:[function(a,b){var z=this.dj()
this.a=8
this.c=new P.cv(a,b)
P.bp(this,z)},function(a){return this.ba(a,null)},"l0","$2","$1","gbP",2,2,15,0],
by:function(a){var z
if(H.aR(a,"$isS",this.$ti,"$asS")){this.ic(a)
return}this.a=1
z=this.b
z.toString
P.bt(null,null,z,new P.qB(this,a))},
ic:function(a){var z
if(H.aR(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bt(null,null,z,new P.qF(this,a))}else P.d0(a,this)
return}P.hF(a,this)},
f8:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bt(null,null,z,new P.qA(this,a,b))},
i4:function(a,b){this.a=4
this.c=a},
$isS:1,
A:{
hF:function(a,b){var z,y,x
b.a=1
try{a.eR(new P.qC(b),new P.qD(b))}catch(x){z=H.A(x)
y=H.B(x)
P.cp(new P.qE(b,z,y))}},
d0:function(a,b){var z,y,x
for(;a.giz();)a=a.c
z=a.geb()
y=b.c
if(z){b.c=null
x=b.dk(y)
b.a=a.a
b.c=a.c
P.bp(b,x)}else{b.a=2
b.c=a
a.fs(y)}},
bp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbk()
t=v.gbh()
y.toString
P.bs(null,null,y,u,t)}return}for(;b.gef()!=null;b=s){s=b.a
b.a=null
P.bp(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfY()||b.gfX()){q=b.gj_()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbk()
t=v.gbh()
y.toString
P.bs(null,null,y,u,t)
return}p=$.r
if(p==null?q!=null:p!==q)$.r=q
else p=null
if(b.gfX())new P.qJ(z,x,w,b).$0()
else if(y){if(b.gfY())new P.qI(x,b,r).$0()}else if(b.gjR())new P.qH(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.q(y).$isS){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dk(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d0(y,o)
return}}o=b.b
b=o.dj()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qz:{"^":"a:2;a,b",
$0:function(){P.bp(this.a,this.b)}},
qG:{"^":"a:2;a,b",
$0:function(){P.bp(this.b,this.a.a)}},
qC:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b9(a)}},
qD:{"^":"a:50;a",
$2:function(a,b){this.a.ba(a,b)},
$1:function(a){return this.$2(a,null)}},
qE:{"^":"a:2;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
qB:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dj()
z.a=4
z.c=this.b
P.bp(z,y)}},
qF:{"^":"a:2;a,b",
$0:function(){P.d0(this.b,this.a)}},
qA:{"^":"a:2;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
qJ:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jQ()}catch(w){y=H.A(w)
x=H.B(w)
if(this.c){v=this.a.a.c.gbk()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cv(y,x)
u.a=!0
return}if(!!J.q(z).$isS){if(z instanceof P.F&&z.gcD()>=4){if(z.gcD()===8){v=this.b
v.b=z.giO()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c_(new P.qK(t))
v.a=!1}}},
qK:{"^":"a:0;a",
$1:function(a){return this.a}},
qI:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jP(this.c)}catch(x){z=H.A(x)
y=H.B(x)
w=this.a
w.b=new P.cv(z,y)
w.a=!0}}},
qH:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kk(z)===!0&&w.e!=null){v=this.b
v.b=w.jL(z)
v.a=!1}}catch(u){y=H.A(u)
x=H.B(u)
w=this.a
v=w.a.c.gbk()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cv(y,x)
s.a=!0}}},
hB:{"^":"d;ji:a<,cf:b@"},
ai:{"^":"d;$ti",
aP:function(a,b){return new P.qY(b,this,[H.z(this,"ai",0),null])},
a4:function(a,b){var z,y
z={}
y=new P.F(0,$.r,null,[P.a4])
z.a=null
z.a=this.aF(new P.oI(z,this,b,y),!0,new P.oJ(y),y.gbP())
return y},
V:function(a,b){var z,y
z={}
y=new P.F(0,$.r,null,[null])
z.a=null
z.a=this.aF(new P.oM(z,this,b,y),!0,new P.oN(y),y.gbP())
return y},
gm:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[P.u])
z.a=0
this.aF(new P.oS(z),!0,new P.oT(z,y),y.gbP())
return y},
gU:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[P.a4])
z.a=null
z.a=this.aF(new P.oO(z,y),!0,new P.oP(y),y.gbP())
return y},
cm:function(a){var z,y,x
z=H.z(this,"ai",0)
y=H.o([],[z])
x=new P.F(0,$.r,null,[[P.P,z]])
this.aF(new P.oU(this,y),!0,new P.oV(y,x),x.gbP())
return x},
bF:function(a){var z,y,x
z=H.z(this,"ai",0)
y=P.a2(null,null,null,z)
x=new P.F(0,$.r,null,[[P.bG,z]])
this.aF(new P.oW(this,y),!0,new P.oX(y,x),x.gbP())
return x},
gv:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[H.z(this,"ai",0)])
z.a=null
z.b=!1
this.aF(new P.oQ(z,this),!0,new P.oR(z,y),y.gbP())
return y}},
oI:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hW(new P.oG(this.c,a),new P.oH(z,y),P.hL(z.a,y))},
$S:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oG:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oH:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hM(this.a.a,this.b,!0)}},
oJ:{"^":"a:2;a",
$0:function(){this.a.b9(!1)}},
oM:{"^":"a;a,b,c,d",
$1:function(a){P.hW(new P.oK(this.c,a),new P.oL(),P.hL(this.a.a,this.d))},
$S:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oK:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oL:{"^":"a:0;",
$1:function(a){}},
oN:{"^":"a:2;a",
$0:function(){this.a.b9(null)}},
oS:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oT:{"^":"a:2;a,b",
$0:function(){this.b.b9(this.a.a)}},
oO:{"^":"a:0;a,b",
$1:function(a){P.hM(this.a.a,this.b,!1)}},
oP:{"^":"a:2;a",
$0:function(){this.a.b9(!0)}},
oU:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b8(function(a){return{func:1,args:[a]}},this.a,"ai")}},
oV:{"^":"a:2;a,b",
$0:function(){this.b.b9(this.a)}},
oW:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b8(function(a){return{func:1,args:[a]}},this.a,"ai")}},
oX:{"^":"a:2;a,b",
$0:function(){this.b.b9(this.a)}},
oQ:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oR:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b9(x.a)
return}try{x=H.af()
throw H.c(x)}catch(w){z=H.A(w)
y=H.B(w)
P.rt(this.b,z,y)}}},
d1:{"^":"d;cD:b<,$ti",
gdU:function(){return new P.cZ(this,this.$ti)},
gka:function(){return(this.b&4)!==0},
gcP:function(){var z=this.b
return(z&1)!==0?this.gbI().gfn():(z&2)===0},
giH:function(){if((this.b&8)===0)return this.a
return this.a.gd2()},
e4:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eg(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd2()==null)y.c=new P.eg(null,null,0,this.$ti)
return y.c},
gbI:function(){if((this.b&8)!==0)return this.a.gd2()
return this.a},
cr:function(){if((this.b&4)!==0)return new P.y("Cannot add event after closing")
return new P.y("Cannot add event while adding a stream")},
jg:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cr())
if((z&2)!==0){z=new P.F(0,$.r,null,[null])
z.by(null)
return z}z=this.a
y=new P.F(0,$.r,null,[null])
x=a.aF(this.gia(),!1,this.gib(),this.gi7())
w=this.b
if((w&1)!==0?this.gbI().gfn():(w&2)===0)x.cS()
this.a=new P.r4(z,y,x,this.$ti)
this.b|=8
return y},
ff:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bf():new P.F(0,$.r,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cr())
this.bO(b)},"$1","gj2",2,0,function(){return H.b8(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d1")}],
er:function(a,b){if(this.b>=4)throw H.c(this.cr())
if(a==null)a=new P.cM()
$.r.toString
this.c6(a,b)},
bj:function(){var z=this.b
if((z&4)!==0)return this.ff()
if(z>=4)throw H.c(this.cr())
z|=4
this.b=z
if((z&1)!==0)this.cB()
else if((z&3)===0)this.e4().q(0,C.u)
return this.ff()},
bO:[function(a){var z=this.b
if((z&1)!==0)this.cA(a)
else if((z&3)===0)this.e4().q(0,new P.e9(a,null,this.$ti))},"$1","gia",2,0,function(){return H.b8(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d1")}],
c6:[function(a,b){var z=this.b
if((z&1)!==0)this.cC(a,b)
else if((z&3)===0)this.e4().q(0,new P.ea(a,b,null))},"$2","gi7",4,0,49],
dZ:[function(){var z=this.a
this.a=z.gd2()
this.b&=4294967287
z.a.by(null)},"$0","gib",0,0,6],
iV:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.y("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.qt(this,null,null,null,z,y,null,null,this.$ti)
x.f5(a,b,c,d,H.m(this,0))
w=this.giH()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd2(x)
v.b.cX()}else this.a=x
x.iT(w)
x.e9(new P.r6(this))
return x},
iL:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c9()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.A(v)
x=H.B(v)
u=new P.F(0,$.r,null,[null])
u.f8(y,x)
z=u}else z=z.c1(w)
w=new P.r5(this)
if(z!=null)z=z.c1(w)
else w.$0()
return z}},
r6:{"^":"a:2;a",
$0:function(){P.eo(this.a.d)}},
r5:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.by(null)}},
re:{"^":"d;$ti",
cA:function(a){this.gbI().bO(a)},
cC:function(a,b){this.gbI().c6(a,b)},
cB:function(){this.gbI().dZ()}},
qq:{"^":"d;$ti",
cA:function(a){this.gbI().c7(new P.e9(a,null,[H.m(this,0)]))},
cC:function(a,b){this.gbI().c7(new P.ea(a,b,null))},
cB:function(){this.gbI().c7(C.u)}},
qp:{"^":"d1+qq;a,b,c,d,e,f,r,$ti"},
rd:{"^":"d1+re;a,b,c,d,e,f,r,$ti"},
cZ:{"^":"r7;a,$ti",
gw:function(a){return(H.aE(this.a)^892482866)>>>0},
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cZ))return!1
return b.a===this.a}},
qt:{"^":"ch;x,a,b,c,d,e,f,r,$ti",
eg:function(){return this.x.iL(this)},
ei:[function(){var z=this.x
if((z.b&8)!==0)z.a.cS()
P.eo(z.e)},"$0","geh",0,0,6],
ek:[function(){var z=this.x
if((z.b&8)!==0)z.a.cX()
P.eo(z.f)},"$0","gej",0,0,6]},
q9:{"^":"d;$ti",
cS:function(){this.b.cS()},
cX:function(){this.b.cX()},
c9:function(){var z=this.b.c9()
if(z==null){this.a.by(null)
return}return z.c1(new P.qa(this))},
ew:function(){this.a.by(null)}},
qa:{"^":"a:2;a",
$0:function(){this.a.a.by(null)}},
r4:{"^":"q9;d2:c@,a,b,$ti"},
ch:{"^":"d;cD:e<,$ti",
iT:function(a){if(a==null)return
this.r=a
if(!a.gU(a)){this.e=(this.e|64)>>>0
this.r.d6(this)}},
kq:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fK()
if((z&4)===0&&(this.e&32)===0)this.e9(this.geh())},
cS:function(){return this.kq(null)},
cX:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gU(z)}else z=!1
if(z)this.r.d6(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e9(this.gej())}}}},
c9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e_()
z=this.f
return z==null?$.$get$bf():z},
gfn:function(){return(this.e&4)!==0},
gcP:function(){return this.e>=128},
e_:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fK()
if((this.e&32)===0)this.r=null
this.f=this.eg()},
bO:["hR",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cA(a)
else this.c7(new P.e9(a,null,[H.z(this,"ch",0)]))}],
c6:["hS",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cC(a,b)
else this.c7(new P.ea(a,b,null))}],
dZ:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cB()
else this.c7(C.u)},
ei:[function(){},"$0","geh",0,0,6],
ek:[function(){},"$0","gej",0,0,6],
eg:function(){return},
c7:function(a){var z,y
z=this.r
if(z==null){z=new P.eg(null,null,0,[H.z(this,"ch",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d6(this)}},
cA:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hn(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
cC:function(a,b){var z,y
z=this.e
y=new P.qs(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e_()
z=this.f
if(!!J.q(z).$isS&&z!==$.$get$bf())z.c1(y)
else y.$0()}else{y.$0()
this.e1((z&4)!==0)}},
cB:function(){var z,y
z=new P.qr(this)
this.e_()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.q(y).$isS&&y!==$.$get$bf())y.c1(z)
else z.$0()},
e9:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
e1:function(a){var z,y
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
if(y)this.ei()
else this.ek()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d6(this)},
f5:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.en(b==null?P.rK():b,z)
this.c=c==null?P.rJ():c}},
qs:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ay(y,{func:1,args:[P.d,P.aW]})
w=z.d
v=this.b
u=z.b
if(x)w.kJ(u,v,this.c)
else w.hn(u,v)
z.e=(z.e&4294967263)>>>0}},
qr:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hl(z.c)
z.e=(z.e&4294967263)>>>0}},
r7:{"^":"ai;$ti",
aF:function(a,b,c,d){return this.a.iV(a,d,c,!0===b)},
eK:function(a,b,c){return this.aF(a,null,b,c)}},
eb:{"^":"d;cf:a@,$ti"},
e9:{"^":"eb;ac:b<,a,$ti",
eM:function(a){a.cA(this.b)}},
ea:{"^":"eb;bk:b<,bh:c<,a",
eM:function(a){a.cC(this.b,this.c)},
$aseb:I.ba},
qu:{"^":"d;",
eM:function(a){a.cB()},
gcf:function(){return},
scf:function(a){throw H.c(new P.y("No events after a done."))}},
r_:{"^":"d;cD:a<,$ti",
d6:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cp(new P.r0(this,a))
this.a=1},
fK:function(){if(this.a===1)this.a=3}},
r0:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcf()
z.b=w
if(w==null)z.c=null
x.eM(this.b)}},
eg:{"^":"r_;b,c,a,$ti",
gU:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scf(b)
this.c=b}}},
r8:{"^":"d;a,b,c,$ti"},
ro:{"^":"a:2;a,b,c",
$0:function(){return this.a.ba(this.b,this.c)}},
rn:{"^":"a:20;a,b",
$2:function(a,b){P.rm(this.a,this.b,a,b)}},
rp:{"^":"a:2;a,b",
$0:function(){return this.a.b9(this.b)}},
ec:{"^":"ai;$ti",
aF:function(a,b,c,d){return this.il(a,d,c,!0===b)},
eK:function(a,b,c){return this.aF(a,null,b,c)},
il:function(a,b,c,d){return P.qy(this,a,b,c,d,H.z(this,"ec",0),H.z(this,"ec",1))},
fk:function(a,b){b.bO(a)},
ix:function(a,b,c){c.c6(a,b)},
$asai:function(a,b){return[b]}},
hE:{"^":"ch;x,y,a,b,c,d,e,f,r,$ti",
bO:function(a){if((this.e&2)!==0)return
this.hR(a)},
c6:function(a,b){if((this.e&2)!==0)return
this.hS(a,b)},
ei:[function(){var z=this.y
if(z==null)return
z.cS()},"$0","geh",0,0,6],
ek:[function(){var z=this.y
if(z==null)return
z.cX()},"$0","gej",0,0,6],
eg:function(){var z=this.y
if(z!=null){this.y=null
return z.c9()}return},
l2:[function(a){this.x.fk(a,this)},"$1","giu",2,0,function(){return H.b8(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hE")}],
l4:[function(a,b){this.x.ix(a,b,this)},"$2","giw",4,0,46],
l3:[function(){this.dZ()},"$0","giv",0,0,6],
i3:function(a,b,c,d,e,f,g){this.y=this.x.a.eK(this.giu(),this.giv(),this.giw())},
$asch:function(a,b){return[b]},
A:{
qy:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hE(a,null,null,null,null,z,y,null,null,[f,g])
y.f5(b,c,d,e,g)
y.i3(a,b,c,d,e,f,g)
return y}}},
qY:{"^":"ec;b,a,$ti",
fk:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.A(w)
x=H.B(w)
P.rh(b,y,x)
return}b.bO(z)}},
cv:{"^":"d;bk:a<,bh:b<",
k:function(a){return H.b(this.a)},
$isa6:1},
rg:{"^":"d;"},
rA:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cM()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
r1:{"^":"rg;",
hl:function(a){var z,y,x,w
try{if(C.h===$.r){x=a.$0()
return x}x=P.hT(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.bs(null,null,this,z,y)
return x}},
hn:function(a,b){var z,y,x,w
try{if(C.h===$.r){x=a.$1(b)
return x}x=P.hV(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.bs(null,null,this,z,y)
return x}},
kJ:function(a,b,c){var z,y,x,w
try{if(C.h===$.r){x=a.$2(b,c)
return x}x=P.hU(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.bs(null,null,this,z,y)
return x}},
ev:function(a,b){if(b)return new P.r2(this,a)
else return new P.r3(this,a)},
j:function(a,b){return},
hk:function(a){if($.r===C.h)return a.$0()
return P.hT(null,null,this,a)},
eQ:function(a,b){if($.r===C.h)return a.$1(b)
return P.hV(null,null,this,a,b)},
kI:function(a,b,c){if($.r===C.h)return a.$2(b,c)
return P.hU(null,null,this,a,b,c)}},
r2:{"^":"a:2;a,b",
$0:function(){return this.a.hl(this.b)}},
r3:{"^":"a:2;a,b",
$0:function(){return this.a.hk(this.b)}}}],["","",,P,{"^":"",
dC:function(a,b){return new H.T(0,null,null,null,null,null,0,[a,b])},
aD:function(){return new H.T(0,null,null,null,null,null,0,[null,null])},
ab:function(a){return H.uo(a,new H.T(0,null,null,null,null,null,0,[null,null]))},
lT:function(a,b,c){var z,y
if(P.ek(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bQ()
y.push(a)
try{P.rw(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h5(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c3:function(a,b,c){var z,y,x
if(P.ek(a))return b+"..."+c
z=new P.bK(b)
y=$.$get$bQ()
y.push(a)
try{x=z
x.B=P.h5(x.gB(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.B=y.gB()+c
y=z.gB()
return y.charCodeAt(0)==0?y:y},
ek:function(a){var z,y
for(z=0;y=$.$get$bQ(),z<y.length;++z)if(a===y[z])return!0
return!1},
rw:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gZ(a)
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
me:function(a,b,c,d,e){return new H.T(0,null,null,null,null,null,0,[d,e])},
c7:function(a,b,c){var z=P.me(null,null,null,b,c)
a.V(0,new P.rM(z))
return z},
a2:function(a,b,c,d){return new P.hH(0,null,null,null,null,null,0,[d])},
b1:function(a,b){var z,y
z=P.a2(null,null,null,b)
for(y=J.an(a);y.u();)z.q(0,y.gG())
return z},
dH:function(a){var z,y,x
z={}
if(P.ek(a))return"{...}"
y=new P.bK("")
try{$.$get$bQ().push(a)
x=y
x.B=x.gB()+"{"
z.a=!0
a.V(0,new P.mp(z,y))
z=y
z.B=z.gB()+"}"}finally{z=$.$get$bQ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gB()
return z.charCodeAt(0)==0?z:z},
hI:{"^":"T;a,b,c,d,e,f,r,$ti",
cN:function(a){return H.uW(a)&0x3ffffff},
cO:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfZ()
if(x==null?b==null:x===b)return y}return-1},
A:{
bN:function(a,b){return new P.hI(0,null,null,null,null,null,0,[a,b])}}},
hH:{"^":"qL;a,b,c,d,e,f,r,$ti",
ee:function(){return new P.hH(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.aj(this,this.r,null,null,[null])
z.c=this.e
return z},
gm:function(a){return this.a},
gU:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
a4:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ij(b)},
ij:function(a){var z=this.d
if(z==null)return!1
return this.dg(z[this.df(a)],a)>=0},
ce:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a4(0,a)?a:null
else return this.iB(a)},
iB:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.df(a)]
x=this.dg(y,a)
if(x<0)return
return J.aA(y,x).gfe()},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.C(this))
z=z.b}},
gv:function(a){var z=this.f
if(z==null)throw H.c(new P.y("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.f9(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.f9(x,b)}else return this.aC(b)},
aC:function(a){var z,y,x
z=this.d
if(z==null){z=P.qU()
this.d=z}y=this.df(a)
x=z[y]
if(x==null)z[y]=[this.e2(a)]
else{if(this.dg(x,a)>=0)return!1
x.push(this.e2(a))}return!0},
ab:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fa(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fa(this.c,b)
else return this.iM(b)},
iM:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.df(a)]
x=this.dg(y,a)
if(x<0)return!1
this.fb(y.splice(x,1)[0])
return!0},
ir:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.C(this))
if(b===v)this.ab(0,y)}},
b5:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
f9:function(a,b){if(a[b]!=null)return!1
a[b]=this.e2(b)
return!0},
fa:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fb(z)
delete a[b]
return!0},
e2:function(a){var z,y
z=new P.qT(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fb:function(a){var z,y
z=a.gii()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
df:function(a){return J.j(a)&0x3ffffff},
dg:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfe(),b))return y
return-1},
$isbG:1,
$isa1:1,
$isw:1,
A:{
qU:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qT:{"^":"d;fe:a<,b,ii:c<"},
aj:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qL:{"^":"o2;$ti",
bF:function(a){var z=this.ee()
z.at(0,this)
return z}},
c2:{"^":"w;$ti"},
rM:{"^":"a:7;a",
$2:function(a,b){this.a.p(0,a,b)}},
fl:{"^":"fu;$ti"},
fu:{"^":"d+b2;$ti",$asP:null,$asa1:null,$asw:null,$isP:1,$isa1:1,$isw:1},
b2:{"^":"d;$ti",
gZ:function(a){return new H.dD(this,this.gm(this),0,null,[H.z(this,"b2",0)])},
au:function(a,b){return this.j(0,b)},
V:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gU:function(a){return this.gm(this)===0},
gaq:function(a){return!this.gU(this)},
gv:function(a){if(this.gm(this)===0)throw H.c(H.af())
return this.j(0,this.gm(this)-1)},
a4:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<this.gm(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bS:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bd:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
aP:function(a,b){return new H.ap(this,b,[H.z(this,"b2",0),null])},
dT:function(a,b){return H.h7(this,b,null,H.z(this,"b2",0))},
bF:function(a){var z,y
z=P.a2(null,null,null,H.z(this,"b2",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gm(this)
this.sm(0,z+1)
this.p(0,z,b)},
ab:function(a,b){var z
for(z=0;z<this.gm(this);++z)if(J.e(this.j(0,z),b)){this.aX(0,z,this.gm(this)-1,this,z+1)
this.sm(0,this.gm(this)-1)
return!0}return!1},
iq:function(a,b){var z,y,x,w
z=H.o([],[H.z(this,"b2",0)])
y=this.gm(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gm(this))throw H.c(new P.C(this))}if(z.length!==this.gm(this)){this.hJ(0,0,z.length,z)
this.sm(0,z.length)}},
aX:function(a,b,c,d,e){var z,y,x,w,v
P.ca(b,c,this.gm(this),null,null,null)
z=c-b
if(z===0)return
if(H.aR(d,"$isP",[H.z(this,"b2",0)],"$asP")){y=e
x=d}else{x=J.j2(d,e).bE(0,!1)
y=0}w=J.J(x)
if(y+z>w.gm(x))throw H.c(H.f9())
if(y<b)for(v=z-1;v>=0;--v)this.p(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.p(0,b+v,w.j(x,y+v))},
hJ:function(a,b,c,d){return this.aX(a,b,c,d,0)},
bM:function(a,b,c){var z
if(c>=this.gm(this))return-1
for(z=c;z<this.gm(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aV:function(a,b){return this.bM(a,b,0)},
k:function(a){return P.c3(this,"[","]")},
$isP:1,
$isa1:1,
$isw:1},
rf:{"^":"d;$ti",
p:function(a,b,c){throw H.c(new P.V("Cannot modify unmodifiable map"))},
$isG:1},
mn:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
p:function(a,b,c){this.a.p(0,b,c)},
a9:function(a){return this.a.a9(a)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hy:{"^":"mn+rf;a,$ti",$asG:null,$isG:1},
mp:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.B+=", "
z.a=!1
z=this.b
y=z.B+=H.b(a)
z.B=y+": "
z.B+=H.b(b)}},
mf:{"^":"aV;a,b,c,d,$ti",
gZ:function(a){return new P.ef(this,this.c,this.d,this.b,null,this.$ti)},
V:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.C(this))}},
gU:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gv:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.af())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
au:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cH(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.aC(b)},
at:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aR(b,"$isP",z,"$asP")){y=b.gm(b)
x=this.gm(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.mg(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.o(v,z)
this.c=this.iZ(s)
this.a=s
this.b=0
C.a.aX(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aX(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aX(v,z,z+r,b,0)
C.a.aX(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.ef(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.aC(z.e)},
b5:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c3(this,"{","}")},
fH:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fj();++this.d},
dE:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.af());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aC:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fj();++this.d},
fj:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.o(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aX(y,0,w,z,x)
C.a.aX(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iZ:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aX(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aX(a,0,v,x,z)
C.a.aX(a,v,v+this.c,this.a,0)
return this.c+v}},
hV:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.o(z,[b])},
A:{
b3:function(a,b){var z=new P.mf(null,0,0,0,[b])
z.hV(a,b)
return z},
mg:function(a){var z
a=C.v.eY(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
ef:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.C(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
o3:{"^":"d;$ti",
gU:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
at:function(a,b){var z
for(z=J.an(b);z.u();)this.q(0,z.gG())},
jo:function(a){var z,y
for(z=a.a,y=new P.aj(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a4(0,y.d))return!1
return!0},
bE:function(a,b){var z,y,x,w,v
z=H.o([],this.$ti)
C.a.sm(z,this.a)
for(y=new P.aj(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cm:function(a){return this.bE(a,!0)},
aP:function(a,b){return new H.bz(this,b,[H.m(this,0),null])},
k:function(a){return P.c3(this,"{","}")},
V:function(a,b){var z
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bl:function(a,b,c){var z,y
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gv:function(a){var z,y
z=new P.aj(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.af())
do y=z.d
while(z.u())
return y},
bd:function(a,b,c){var z,y
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.af())},
dv:function(a,b){return this.bd(a,b,null)},
aB:function(a,b){var z,y,x,w
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dt())
y=w
x=!0}}if(x)return y
throw H.c(H.af())},
$isbG:1,
$isa1:1,
$isw:1},
o2:{"^":"o3;$ti"}}],["","",,P,{"^":"",
d3:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qO(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d3(a[z])
return a},
rz:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.W(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.A(x)
w=String(y)
throw H.c(new P.f4(w,null,null))}w=P.d3(z)
return w},
wR:[function(a){return a.dH()},"$1","u2",2,0,0],
qO:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iK(b):y}},
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
p:function(a,b,c){var z,y
if(this.b==null)this.c.p(0,b,c)
else if(this.a9(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iX().p(0,b,c)},
a9:function(a){if(this.b==null)return this.c.a9(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
V:function(a,b){var z,y,x,w
if(this.b==null)return this.c.V(0,b)
z=this.ct()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d3(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dH(this)},
ct:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iX:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dC(P.t,null)
y=this.ct()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.p(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sm(y,0)
this.b=null
this.a=null
this.c=z
return z},
iK:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d3(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.t,null]}},
eY:{"^":"d;$ti"},
cB:{"^":"d;$ti"},
dy:{"^":"a6;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lY:{"^":"dy;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lX:{"^":"eY;a,b",
js:function(a,b){var z=P.rz(a,this.gjt().a)
return z},
jr:function(a){return this.js(a,null)},
jB:function(a,b){var z=this.gjC()
z=P.qQ(a,z.b,z.a)
return z},
fR:function(a){return this.jB(a,null)},
gjC:function(){return C.P},
gjt:function(){return C.O},
$aseY:function(){return[P.d,P.t]}},
m_:{"^":"cB;a,b",
$ascB:function(){return[P.d,P.t]}},
lZ:{"^":"cB;a",
$ascB:function(){return[P.t,P.d]}},
qR:{"^":"d;",
hw:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gm(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cK(a,v)
if(u>92)continue
if(u<32){if(v>w)x.B+=C.b.aG(a,w,v)
w=v+1
x.B+=H.aq(92)
switch(u){case 8:x.B+=H.aq(98)
break
case 9:x.B+=H.aq(116)
break
case 10:x.B+=H.aq(110)
break
case 12:x.B+=H.aq(102)
break
case 13:x.B+=H.aq(114)
break
default:x.B+=H.aq(117)
x.B+=H.aq(48)
x.B+=H.aq(48)
t=u>>>4&15
x.B+=H.aq(t<10?48+t:87+t)
t=u&15
x.B+=H.aq(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.B+=C.b.aG(a,w,v)
w=v+1
x.B+=H.aq(92)
x.B+=H.aq(u)}}if(w===0)x.B+=H.b(a)
else if(w<y)x.B+=z.aG(a,w,y)},
e0:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lY(a,null))}z.push(a)},
dK:function(a){var z,y,x,w
if(this.hv(a))return
this.e0(a)
try{z=this.b.$1(a)
if(!this.hv(z))throw H.c(new P.dy(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.A(w)
throw H.c(new P.dy(a,y))}},
hv:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.B+=C.j.k(a)
return!0}else if(a===!0){this.c.B+="true"
return!0}else if(a===!1){this.c.B+="false"
return!0}else if(a==null){this.c.B+="null"
return!0}else if(typeof a==="string"){z=this.c
z.B+='"'
this.hw(a)
z.B+='"'
return!0}else{z=J.q(a)
if(!!z.$isP){this.e0(a)
this.kW(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.e0(a)
y=this.kX(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
kW:function(a){var z,y,x
z=this.c
z.B+="["
y=J.J(a)
if(y.gm(a)>0){this.dK(y.j(a,0))
for(x=1;x<y.gm(a);++x){z.B+=","
this.dK(y.j(a,x))}}z.B+="]"},
kX:function(a){var z,y,x,w,v,u,t
z={}
if(a.gU(a)){this.c.B+="{}"
return!0}y=a.gm(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.V(0,new P.qS(z,x))
if(!z.b)return!1
w=this.c
w.B+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.B+=v
this.hw(x[u])
w.B+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dK(x[t])}w.B+="}"
return!0}},
qS:{"^":"a:7;a,b",
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
qP:{"^":"qR;c,a,b",A:{
qQ:function(a,b,c){var z,y,x
z=new P.bK("")
y=new P.qP(z,[],P.u2())
y.dK(a)
x=z.B
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wj:[function(a,b){return J.bW(a,b)},"$2","u3",4,0,40],
f1:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l0(a)},
l0:function(a){var z=J.q(a)
if(!!z.$isa)return z.k(a)
return H.cO(a)},
cD:function(a){return new P.qx(a)},
U:function(a,b,c){var z,y
z=H.o([],[c])
for(y=J.an(a);y.u();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
mh:function(a,b,c,d){var z,y,x
z=H.o(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bg:function(a,b){var z=P.U(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eA:function(a){H.v2(H.b(a))},
bk:function(a,b,c){return new H.dv(a,H.dw(a,!1,b,!1),null,null)},
a4:{"^":"d;"},
"+bool":0,
X:{"^":"d;$ti"},
cC:{"^":"d;iY:a<,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cC))return!1
return this.a===b.a&&!0},
bB:function(a,b){return C.e.bB(this.a,b.giY())},
gw:function(a){var z=this.a
return(z^C.e.dm(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.ki(H.nb(this))
y=P.bZ(H.n9(this))
x=P.bZ(H.n5(this))
w=P.bZ(H.n6(this))
v=P.bZ(H.n8(this))
u=P.bZ(H.na(this))
t=P.kj(H.n7(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjV()
y=new P.cC(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.D(y.gkl()))
return y},
gkl:function(){return this.a},
$isX:1,
$asX:function(){return[P.cC]},
A:{
ki:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
kj:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bZ:function(a){if(a>=10)return""+a
return"0"+a}}},
aS:{"^":"O;",$isX:1,
$asX:function(){return[P.O]}},
"+double":0,
b0:{"^":"d;bQ:a<",
a6:function(a,b){return new P.b0(this.a+b.gbQ())},
as:function(a,b){return new P.b0(this.a-b.gbQ())},
c3:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b0(C.j.hj(this.a*b))},
aS:function(a,b){return C.e.aS(this.a,b.gbQ())},
b8:function(a,b){return this.a>b.gbQ()},
d5:function(a,b){return this.a<=b.gbQ()},
bN:function(a,b){return C.e.bN(this.a,b.gbQ())},
gjV:function(){return C.e.bJ(this.a,1000)},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.b0))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
bB:function(a,b){return C.e.bB(this.a,b.gbQ())},
k:function(a){var z,y,x,w,v
z=new P.kI()
y=this.a
if(y<0)return"-"+new P.b0(0-y).k(0)
x=z.$1(C.e.bJ(y,6e7)%60)
w=z.$1(C.e.bJ(y,1e6)%60)
v=new P.kH().$1(y%1e6)
return""+C.e.bJ(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eX:function(a){return new P.b0(0-this.a)},
$isX:1,
$asX:function(){return[P.b0]}},
kH:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kI:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a6:{"^":"d;",
gbh:function(){return H.B(this.$thrownJsError)}},
cM:{"^":"a6;",
k:function(a){return"Throw of null."}},
b_:{"^":"a6;a,b,h:c<,d",
ge6:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge5:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ge6()+y+x
if(!this.a)return w
v=this.ge5()
u=P.f1(this.b)
return w+v+": "+H.b(u)},
A:{
D:function(a){return new P.b_(!1,null,null,a)},
cu:function(a,b,c){return new P.b_(!0,a,b,c)},
l:function(a){return new P.b_(!1,null,a,"Must not be null")}}},
dW:{"^":"b_;e,f,a,b,c,d",
ge6:function(){return"RangeError"},
ge5:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
nh:function(a){return new P.dW(null,null,!1,null,null,a)},
c9:function(a,b,c){return new P.dW(null,null,!0,a,b,"Value not in range")},
a7:function(a,b,c,d,e){return new P.dW(b,c,!0,a,d,"Invalid value")},
ni:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a7(a,b,c,d,e))},
ca:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a7(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a7(b,a,c,"end",f))
return b}}},
lI:{"^":"b_;e,m:f>,a,b,c,d",
ge6:function(){return"RangeError"},
ge5:function(){if(J.bU(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
A:{
cH:function(a,b,c,d,e){var z=e!=null?e:J.aL(b)
return new P.lI(b,z,!0,a,c,"Index out of range")}}},
V:{"^":"a6;a",
k:function(a){return"Unsupported operation: "+this.a}},
ad:{"^":"a6;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
y:{"^":"a6;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a6;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f1(z))+"."}},
mH:{"^":"d;",
k:function(a){return"Out of Memory"},
gbh:function(){return},
$isa6:1},
h0:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbh:function(){return},
$isa6:1},
kh:{"^":"a6;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qx:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f4:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aG(x,0,75)+"..."
return y+"\n"+x}},
l5:{"^":"d;h:a<,fo,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fo
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cu(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dS(b,"expando$values")
return y==null?null:H.dS(y,z)},
p:function(a,b,c){var z,y
z=this.fo
if(typeof z!=="string")z.set(b,c)
else{y=H.dS(b,"expando$values")
if(y==null){y=new P.d()
H.fE(b,"expando$values",y)}H.fE(y,z,c)}}},
bA:{"^":"d;"},
u:{"^":"O;",$isX:1,
$asX:function(){return[P.O]}},
"+int":0,
w:{"^":"d;$ti",
aP:function(a,b){return H.bB(this,b,H.z(this,"w",0),null)},
c2:["dW",function(a,b){return new H.N(this,b,[H.z(this,"w",0)])}],
a4:function(a,b){var z
for(z=this.gZ(this);z.u();)if(J.e(z.gG(),b))return!0
return!1},
V:function(a,b){var z
for(z=this.gZ(this);z.u();)b.$1(z.gG())},
bl:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.u();)y=c.$2(y,z.gG())
return y},
bE:function(a,b){return P.U(this,b,H.z(this,"w",0))},
cm:function(a){return this.bE(a,!0)},
bF:function(a){return P.b1(this,H.z(this,"w",0))},
gm:function(a){var z,y
z=this.gZ(this)
for(y=0;z.u();)++y
return y},
gU:function(a){return!this.gZ(this).u()},
gaq:function(a){return!this.gU(this)},
dT:function(a,b){return H.o5(this,b,H.z(this,"w",0))},
gv:function(a){var z,y
z=this.gZ(this)
if(!z.u())throw H.c(H.af())
do y=z.gG()
while(z.u())
return y},
gc5:function(a){var z,y
z=this.gZ(this)
if(!z.u())throw H.c(H.af())
y=z.gG()
if(z.u())throw H.c(H.dt())
return y},
au:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a7(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.u();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cH(b,this,"index",null,y))},
k:function(a){return P.lT(this,"(",")")}},
cJ:{"^":"d;$ti"},
P:{"^":"d;$ti",$isw:1,$isa1:1},
"+List":0,
G:{"^":"d;$ti"},
at:{"^":"d;",
gw:function(a){return P.d.prototype.gw.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
O:{"^":"d;",$isX:1,
$asX:function(){return[P.O]}},
"+num":0,
d:{"^":";",
t:function(a,b){return this===b},
gw:function(a){return H.aE(this)},
k:function(a){return H.cO(this)},
gbu:function(a){return new H.av(H.il(this),null)},
toString:function(){return this.k(this)}},
bi:{"^":"d;"},
bG:{"^":"a1;$ti"},
aW:{"^":"d;"},
t:{"^":"d;",$isX:1,
$asX:function(){return[P.t]},
$isdP:1},
"+String":0,
bK:{"^":"d;B<",
gm:function(a){return this.B.length},
gU:function(a){return this.B.length===0},
gaq:function(a){return this.B.length!==0},
k:function(a){var z=this.B
return z.charCodeAt(0)==0?z:z},
A:{
h5:function(a,b,c){var z=J.an(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.u())}else{a+=H.b(z.gG())
for(;z.u();)a=a+c+H.b(z.gG())}return a},
p_:function(a){return new P.bK(a)}}}}],["","",,P,{"^":"",fQ:{"^":"d;"}}],["","",,P,{"^":"",
cP:function(a){return C.J},
qN:{"^":"d;",
ad:function(a){if(a<=0||a>4294967296)throw H.c(P.nh("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kn:function(){return Math.random()}}}],["","",,S,{"^":"",k6:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
a9:function(a){return this.b.a9(a)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){var z=this.b
return z.gU(z)},
gaq:function(a){var z=this.b
return z.gaq(z)},
gm:function(a){var z=this.b
return z.gm(z)},
p:function(a,b,c){this.iD()
this.b.p(0,b,c)},
k:function(a){return J.h(this.b)},
iD:function(){if(!this.a)return
this.a=!1
this.b=P.c7(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",k7:{"^":"d;a,b,$ti",
gm:function(a){return this.b.a},
ce:function(a){return this.b.ce(a)},
a4:function(a,b){return this.b.a4(0,b)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){return this.b.a===0},
gaq:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.aj(z,z.r,null,null,[null])
y.c=z.e
return y},
gv:function(a){var z=this.b
return z.gv(z)},
aP:function(a,b){var z=this.b
z.toString
return new H.bz(z,b,[H.m(z,0),null])},
bF:function(a){var z,y
z=this.b
y=z.ee()
y.at(0,z)
return y},
q:function(a,b){this.ik()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
ik:function(){if(!this.a)return
this.a=!1
this.b=P.b1(this.b,H.m(this,0))},
$isbG:1,
$isa1:1,
$isw:1}}],["","",,S,{"^":"",dh:{"^":"d;fq:a<,b,$ti",
X:function(a){var z=new S.R(null,null,this.$ti)
z.ag()
z.l(this)
a.$1(z)
return z.n()},
gw:function(a){var z=this.b
if(z==null){z=X.bv(this.a)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.q(b)
if(!z.$isdh)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.f(y,v)
w=y[v]
if(v>=z)return H.f(x,v)
if(!J.e(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
gm:function(a){return this.a.length},
bM:function(a,b,c){var z=this.a
return(z&&C.a).bM(z,b,c)},
aV:function(a,b){return this.bM(a,b,0)},
gZ:function(a){var z=this.a
return new J.bc(z,z.length,0,null,[H.m(z,0)])},
aP:function(a,b){var z=this.a
z.toString
return new H.ap(z,b,[H.m(z,0),null])},
a4:function(a,b){var z=this.a
return(z&&C.a).a4(z,b)},
V:function(a,b){var z=this.a
return(z&&C.a).V(z,b)},
bF:function(a){var z=this.a
z.toString
return P.b1(z,H.m(z,0))},
gU:function(a){return this.a.length===0},
gaq:function(a){return this.a.length!==0},
gv:function(a){var z=this.a
return(z&&C.a).gv(z)},
ag:function(){if(new H.av(H.a0(H.m(this,0)),null).t(0,C.n))throw H.c(new P.V('explicit element type required, for example "new BuiltList<int>"'))},
$isw:1},R:{"^":"d;fq:a<,b,$ti",
n:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dh(z,null,this.$ti)
y.ag()
this.a=z
this.b=y
z=y}return z},
l:function(a){if(H.aR(a,"$isdh",this.$ti,null)){this.a=a.gfq()
this.b=a}else{this.a=P.U(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z
if(c==null)H.i(P.D("null element"))
z=this.gem()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.D("null element"))
z=this.gem();(z&&C.a).q(z,b)},
ab:function(a,b){var z=this.gem();(z&&C.a).ab(z,b)},
aP:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bE(0,!0)
this.a=z
this.b=null
this.ie(z)},
gem:function(){if(this.b!=null){this.a=P.U(this.a,!0,H.m(this,0))
this.b=null}return this.a},
ag:function(){if(new H.av(H.a0(H.m(this,0)),null).t(0,C.n))throw H.c(new P.V('explicit element type required, for example "new ListBuilder<int>"'))},
ie:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.d6(w,y))throw H.c(P.D("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cy:{"^":"d;iC:a<,b,c,d,$ti",
X:function(a){var z=new A.cL(null,null,this.$ti)
z.c8()
z.l(this)
a.$1(z)
return z.n()},
D:function(){return new S.k6(!0,this.a,this.$ti)},
gw:function(a){var z=this.b
if(z==null){z=this.a.gcc()
z=H.bB(z,new A.jS(this),H.z(z,"w",0),null)
z=P.U(z,!1,H.z(z,"w",0))
C.a.f0(z)
z=X.bv(z)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.q(b)
if(!z.$iscy)return!1
y=b.a
x=this.a
if(y.gm(y)!==x.gm(x))return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcc()
this.c=z}z=z.gZ(z)
for(;z.u();){v=z.gG()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
c8:function(){if(new H.av(H.a0(H.m(this,0)),null).t(0,C.n))throw H.c(new P.V('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.a0(H.m(this,1)),null).t(0,C.n))throw H.c(new P.V('explicit value type required, for example "new BuiltMap<int, int>"'))}},jS:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d4(X.aX(X.aX(0,J.j(z)),J.j(y)))}},cL:{"^":"d;a,b,$ti",
n:function(){var z=this.b
if(z==null){z=new A.cy(this.a,null,null,null,this.$ti)
z.c8()
this.b=z}return z},
l:function(a){var z
if(H.aR(a,"$iscy",this.$ti,null)){this.b=a
this.a=a.giC()}else if(!!a.$iscy){z=P.c7(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.c7(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.D("expected Map or BuiltMap, got "+H.b(a.gbu(a))))},
j:function(a,b){return this.a.j(0,b)},
p:function(a,b,c){if(c==null)H.i(P.D("null value"))
this.giP().p(0,b,c)},
giP:function(){if(this.b!=null){this.a=P.c7(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
c8:function(){if(new H.av(H.a0(H.m(this,0)),null).t(0,C.n))throw H.c(new P.V('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.a0(H.m(this,1)),null).t(0,C.n))throw H.c(new P.V('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",di:{"^":"d;iR:a<,b,$ti",
X:function(a){var z=new L.bl(null,null,this.$ti)
z.bz()
z.l(this)
a.$1(z)
return z.n()},
gw:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.U(new H.bz(z,new L.jT(),[H.m(z,0),null]),!1,null)
C.a.f0(z)
z=X.bv(z)
this.b=z}return z},
t:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.q(b)
if(!z.$isdi)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gw(b)
x=this.gw(this)
if(z==null?x!=null:z!==x)return!1
return y.jo(b)},
k:function(a){return J.h(this.a)},
gm:function(a){return this.a.a},
ce:function(a){return this.a.ce(a)},
gZ:function(a){var z,y
z=this.a
y=new P.aj(z,z.r,null,null,[null])
y.c=z.e
return y},
aP:function(a,b){var z=this.a
z.toString
return new H.bz(z,b,[H.m(z,0),null])},
a4:function(a,b){return this.a.a4(0,b)},
V:function(a,b){return this.a.V(0,b)},
bF:function(a){return new A.k7(!0,this.a,this.$ti)},
gU:function(a){return this.a.a===0},
gaq:function(a){return this.a.a!==0},
gv:function(a){var z=this.a
return z.gv(z)},
bz:function(){if(new H.av(H.a0(H.m(this,0)),null).t(0,C.n))throw H.c(new P.V('explicit element type required, for example "new BuiltSet<int>"'))},
$isw:1},jT:{"^":"a:0;",
$1:function(a){return J.j(a)}},bl:{"^":"d;a,b,$ti",
n:function(){var z=this.b
if(z==null){z=new L.di(this.a,null,this.$ti)
z.bz()
this.b=z}return z},
l:function(a){var z,y,x,w
if(H.aR(a,"$isdi",this.$ti,null)){this.a=a.giR()
this.b=a}else{z=H.m(this,0)
y=P.a2(null,null,null,z)
for(x=J.an(a);x.u();){w=x.gG()
if(H.d6(w,z))y.q(0,w)
else throw H.c(P.D("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.D("null element"))
this.gfA().q(0,b)},
aP:function(a,b){var z=this.a
z.toString
z=P.b1(new H.bz(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iS(z)},
gfA:function(){if(this.b!=null){this.a=P.b1(this.a,H.m(this,0))
this.b=null}return this.a},
bz:function(){if(new H.av(H.a0(H.m(this,0)),null).t(0,C.n))throw H.c(new P.V('explicit element type required, for example "new SetBuilder<int>"'))},
iS:function(a){var z,y,x
for(z=new P.aj(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.d6(x,y))throw H.c(P.D("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
Q:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nF:{"^":"nD;ch,cx,ai:cy@,aT:db@,bw:dx@,b,c,d,e,f,r,x,y,z,Q,a",
hb:function(){var z=$.$get$cq()
z.p(0,"game",this.cx)
z.p(0,"hitpoints",this.cy)
z.p(0,"stamina",this.db)
z.p(0,"gold",this.dx)},
jX:function(){var z,y,x,w
this.cx=null
this.cy=Z.bI("Health",new N.nI(),"#CCCCCC","Your physical state",100,0,!0,P.aS)
z=P.u
this.db=Z.bI("Stamina",new N.nJ(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bI("Gold",new N.nK(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bR()
x=this.cy
w=this.db
y=new O.f0(N.bh("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a3(H.o([],[Y.ac]),0,P.aD()),x,w,z,O.v7(),O.v6(),O.v5(),y,this.ghM(),new P.bK(""),!1,null)
y.hK()
this.cx=y
y.x="endGame"
$.$get$cm().q(0,0)},
hZ:function(){var z,y
z=new O.cU([[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.p(0,"start",z)
z.a="start"
z=new O.cU([new N.nH(this),[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y.p(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cU(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.p(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
A:{
nG:function(){var z,y,x,w
z=Z.bI("Health",new N.tD(),"#CCCCCC","Your physical state",100,0,!0,P.aS)
y=P.u
x=Z.bI("Stamina",new N.tE(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bI("Gold",new N.tF(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.t
z=new N.nF("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nL(new H.T(0,null,null,null,null,null,0,[w,O.cU])),null,null,null,P.a2(null,null,null,w),!1,null,-9999,null,null,null)
z.hZ()
return z}}},tD:{"^":"a:17;",
$1:function(a){var z=J.q(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.d5(a,0.5))return"\ud83d\ude23"
if(z.aS(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tE:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tF:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nH:{"^":"a:18;a",
$0:function(){var z=0,y=P.aC(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.bt(),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},nI:{"^":"a:17;",
$1:function(a){var z=J.q(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.d5(a,0.5))return"\ud83d\ude23"
if(z.aS(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nJ:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nK:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",dl:{"^":"d;"},kY:{"^":"d;"},pR:{"^":"dl;a,b",
X:function(a){var z=new M.e6(null,!1,0)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.dl))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return Y.Q(Y.k(Y.k(0,C.M.gw(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},e6:{"^":"kY;c,a,b",
gdX:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
l:function(a){this.c=a},
n:function(){var z,y
z=this.c
if(z==null){this.gdX()
y=this.a
this.gdX()
z=new M.pR(y,this.b)}this.l(z)
return z}}}],["","",,O,{"^":"",
wV:[function(a){var z,y
z=a.gc4()
y=a.gbV()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","d8",2,0,19],
x6:[function(a){var z,y,x
z=a.gc4()
y=a.gcY()
x=a.gbV()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","i9",2,0,19],
f0:{"^":"mj;y,z,Q,ch,cx,cy,db,dx,dy,bG:fr<,fx,f2:fy<,ai:go<,aT:id<,bw:k1<,a,b,c,d,e,f,r,x",
hK:function(){var z,y,x,w,v,u
z=P.bg(C.o,null)
y=$.$get$bS()
this.cy=R.aZ(1000,"orc",O.d8(),null,new G.b5("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.q,0,y)
this.db=R.aZ(1001,"goblin",O.d8(),null,new G.b5("scimitar",1,1,!1,!0,!1,P.bg(C.o,null)),null,0,1,0,!1,1,!1,C.q,0,y)
y=new S.R(null,null,[Q.n])
y.ag()
y.l([new Q.n("start_adventure","","",null)])
this.dx=new K.cc(y.n(),"preStartBook",new O.kP(),new O.kQ(),null,null,"ground")
y=R.aZ(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.C,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.d4()
if(typeof y!=="number")return H.x(y)
this.go.sac(z/y)
this.id.sac(this.ch.fx)
this.k1.sac(this.ch.f)
this.cx=R.aZ(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.a0,0,null)
this.dy=F.fL(this.dx,!1)
y=K.cc
x=P.U($.$get$hZ(),!0,y)
C.a.at(x,[this.dx,$.$get$es()])
w=new M.e6(null,!1,0).n()
z=this.ch
v=this.cx
u=this.dy
v=P.b1([z,v],R.H)
z=P.b3(null,O.cs)
u=new A.a9(v,P.a2(null,null,null,U.as),w,z,P.b1(x,y),P.U([u],!0,S.a_),0,null)
this.fr=u
y=new Y.a3(H.o([],[Y.ac]),0,P.aD())
y.b=u.r
this.fx=new B.bC(u,null,y,1,1,!0,!1,!1,0)},
d1:function(){var z=0,y=P.aC(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d1=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjA()
if(v.h8(u)){z=1
break}t=w.fr.a1(w.ch.x)
s=t.gai()
r=t.gh3()
if(typeof s!=="number"){x=s.d4()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sac(s/r)
w.id.sac(t.gaT())
w.k1.sac(t.gbw())
r=w.y
r.h0("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.W(0,"\n\n",!0)
if(w.fr.jS(w.ch.x))v.W(0,"TO BE CONTINUED.",!0)
else v.W(0,"You died.",!0)
w.f.B+=v.ci()
z=1
break}q=C.a.gv(s)
p=q.dN(w.fr)
o=G.j8(p,w.fr)
z=3
return P.aw(o.ks(),$async$d1)
case 3:s=o.f
if(s.gU(s)){n=o.a
m=o.b
n.eU("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.q(k)
k="PlanConsequence<"+j.gw(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bL(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mO(s)
i=new Z.mN(new P.hy(s,[null,null]),n)
if(s.gU(s))$.$get$bD().eU("Created with no recommendations.")
if(n.length===0){r.dR("No recommendation for "+H.b(p.gh()))
r.dR(new O.kS(w))
w.fr.fQ(q.gi());++w.fr.r
z=1
break}z=p.gF()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;s=n.length,h<s;s===u||(0,H.ar)(n),++h);r.bL("planner.generateTable for "+H.b(p.gh()))
o.eV().V(0,new O.kT(w))
u=i.ha(q.geL(),O.i9())
u.toString
g=P.U(u,!1,H.z(u,"w",0))
if(g.length!==0&&C.a.bS(g,new O.kU())){w.f.B+=v.ci()
C.a.sm(v.a,0)}v=new O.kV(new O.kX())
u=g.length-1
if(u-0<=32)H.h_(g,0,u,v)
else H.fZ(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gT(),f.gJ(),new O.kW(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfP()
z=7
return P.aw(w.cq(i.kr(s==null?O.i9():s),p,v),$async$d1)
case 7:case 5:v.h8(u)
case 1:return P.aG(x,y)}})
return P.aH($async$d1,y)},
cq:function(a,b,c){var z=0,y=P.aC(),x,w=this,v,u,t
var $async$cq=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:v=a.dr(b,w.fx,w.fr)
u=P.U(v,!0,H.z(v,"w",0))
z=b.gF()===!0?3:5
break
case 3:z=6
return P.aw(w.de(a,b,u),$async$cq)
case 6:z=4
break
case 5:t=S.nf(new H.ap(u,new O.kM(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.at(c.a,w.fx.gf2().a)
w.fr=w.fx.gbG()
v=w.y
v.bL(new O.kN(a,b))
v.ah(new O.kO(w,b))
case 1:return P.aG(x,y)}})
return P.aH($async$cq,y)},
de:function(a,b,c){var z=0,y=P.aC(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$de=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=a.I(b,x.fr)
v=J.q(w)
z=v.t(w,1)?2:4
break
case 2:x.fx=C.a.gc5(c)
z=3
break
case 4:z=v.t(w,0)?5:7
break
case 5:x.fx=C.a.gc5(c)
z=6
break
case 7:u=C.a.gv(J.h(a.gL()).split("."))
v=v.kN(w)
t=a.a7(b,x.fr)
s=a.gP()&&b.jT(a.gL())
r="use "+H.b(u)
x.fu()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$de)
case 8:q=e
s=new H.N(c,new O.kJ(q),[H.m(c,0)])
x.fx=s.gc5(s)
if(q.gkV()===!0){p=A.e5(x.fx.gbG())
p.Y(b.gi(),new O.kK())
v=x.fx
t=v.gfC()
s=H.o([],[Y.ac])
r=new Y.a3(s,0,P.aD())
C.a.at(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bC(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aG(null,y)}})
return P.aH($async$de,y)}},
kP:{"^":"a:3;",
$3:function(a,b,c){return c.W(0,"UNUSED because this is the first choice",!0)}},
kQ:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.y("Room isn't to be revisited"))}},
kS:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kR(),[H.m(z,0),null]).cb(0," <- ")}},
kR:{"^":"a:0;",
$1:function(a){return a.gaN()}},
kT:{"^":"a:0;a",
$1:function(a){return this.a.y.bL(a)}},
kX:{"^":"a:41;",
$1:function(a){if(a instanceof Q.E)return H.b(a.b.gh())+" "+a.gT()
return"ZZZZZZ "+a.gT()}},
kU:{"^":"a:0;",
$1:function(a){return a.gT()!==""}},
kV:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bW(z.$1(a),z.$1(b))}},
kW:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.aC(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cq(x.c,x.b,w.fy),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},
kM:{"^":"a:0;",
$1:function(a){return a.gkt()}},
kN:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kO:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ap(z,new O.kL(),[H.m(z,0),null]).cb(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kL:{"^":"a:0;",
$1:function(a){return a.gaN()}},
kJ:{"^":"a:0;a",
$1:function(a){return a.geF()===this.a.geF()}},
kK:{"^":"a:0;",
$1:function(a){var z=a.gaT()
if(typeof z!=="number")return z.as()
a.saT(z-1)
return a}}}],["","",,Q,{"^":"",
ig:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ig(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gv(t):null
s=J.j5(t.aA(y.a,y),new Q.uA(z))
t=J.an(s.a),r=new H.cf(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gK()&&!z.eC(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
ih:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ih(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dP((t.length!==0?C.a.gv(t):null).gbC()).gjE().a,t=new J.bc(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
ii:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ii(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gv(t):null).gbK(),t=t.gZ(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
uA:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaW()}},
aa:{"^":"d;",
dr:function(a,b,c){var z=this
return P.aQ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dr(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.I(y,x.gbG())
r=J.ak(s)
v=r.b8(s,0)?2:3
break
case 2:q=A.e5(w)
v=4
return B.fz(q,x,z,z.i9(q,y,w,z.gO(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aS(s,1)?5:6
break
case 5:q=A.e5(w)
p=z.i8(q,y,w,z.gN(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fz(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aO()
case 1:return P.aP(t)}}})},
f7:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aB(0,new Q.j6(b))
y=new O.eN(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga8().c=x
x=b.gi()
y.ga8().f=x
y.ga8().e=C.Q
y.ga8().ch=f
y.ga8().Q=e
x=this.gK()
y.ga8().y=x
x=this.ga2()
y.ga8().z=x
if(!!this.$isE){x=y.ga8()
w=x.r
if(w==null){w=new L.bl(null,null,[P.u])
w.bz()
w.l(C.d)
x.r=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.D("null element"))
x.gfA().q(0,w)}v=new Y.a3(H.o([],[Y.ac]),0,P.aD())
x=a.f
u=(x.length!==0?C.a.gv(x):null).gi()
a.gw(a);(x.length!==0?C.a.gv(x):null).ko(a,v)
this.a=d.$3(z,a,v)
if(a.dh(u)!=null)a.fQ(u);++a.r
w=a.eW(u)
if(!(w==null))w.h6(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gv(x):null
if((w==null?w:w.dN(a))!=null){w=x.length!==0?C.a.gv(x):null
w=!J.e(w==null?w:w.d9(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gv(x):null)==null)break
t=C.a.gv(x)
t.dA(a)
C.a.ab(x,t)}x=x.length!==0?C.a.gv(x):null
if(!(x==null))x.h7(a,v)
if(this.a==null)H.i(new P.y("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga8().d=x
x=a.r
y.ga8().x=x
a.d.fH(y.n())
return v},
i9:function(a,b,c,d,e){return this.f7(a,b,c,d,!1,e)},
i8:function(a,b,c,d,e){return this.f7(a,b,c,d,e,!1)}},
j6:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
E:{"^":"aa;bV:b<",
gT:function(){var z=new Y.a3(H.o([],[Y.ac]),0,P.aD())
z.fE(0,this.gam(),this.b)
return z.ci()},
a7:function(a,b){var z=new Y.a3(H.o([],[Y.ac]),0,P.aD())
z.j8(0,this.gan(),this.b,a,!0)
return z.ci()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gam()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
cE:{"^":"aa;",
gT:function(){return this.b.gT()},
k:function(a){return"ExitAction<"+this.b.gT()+">"}},
cI:{"^":"aa;",
gT:function(){var z=new Y.a3(H.o([],[Y.ac]),0,P.aD())
z.fE(0,"pick up <object>",this.b)
return z.ci()},
k:function(a){return"ItemAction<"+this.gT()+">"}},
np:{"^":"d;a,b",
k:function(a){return this.b},
A:{"^":"wJ<"}}}],["","",,O,{"^":"",cs:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},m7:{"^":"d;a,b",
k:function(a){return this.b}},pN:{"^":"cs;a,ep:b<,aN:c<,d,cT:e<,f4:f<,M:r<,hs:x<,ht:y<,z,hu:Q<",
X:function(a){var z=new O.eN(null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},eN:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gep:function(){return this.ga8().c},
gaN:function(){return this.ga8().d},
gcT:function(){return this.ga8().f},
gf4:function(){var z,y
z=this.ga8()
y=z.r
if(y==null){y=new L.bl(null,null,[P.u])
y.bz()
y.l(C.d)
z.r=y
z=y}else z=y
return z},
gM:function(){return this.ga8().x},
ghs:function(){return this.ga8().y},
ght:function(){return this.ga8().z},
ghu:function(){return this.ga8().ch},
ga8:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bl(null,null,[H.m(z,0)])
y.bz()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bl(null,null,[H.m(z,0)])
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
n:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
if(z==null){y=this.ga8()
x=y.b
if(x==null){x=new L.bl(null,null,[P.u])
x.bz()
x.l(C.d)
y.b=x
y=x}else y=x
y=y.n()
x=this.ga8().c
w=this.ga8().d
v=this.ga8().e
u=this.ga8().f
t=this.ga8()
s=t.r
if(s==null){s=new L.bl(null,null,[P.u])
s.bz()
s.l(C.d)
t.r=s
t=s}else t=s
t=t.n()
s=this.ga8().x
r=this.ga8().y
q=this.ga8().z
p=this.ga8().Q
o=this.ga8().ch
z=new O.pN(y,x,w,v,u,t,s,r,q,p,o)
if(y==null)H.i(P.l("accomplices"))
if(x==null)H.i(P.l("actionName"))
if(w==null)H.i(P.l("description"))
if(v==null)H.i(P.l("knownTo"))
if(u==null)H.i(P.l("protagonist"))
if(t==null)H.i(P.l("sufferers"))
if(s==null)H.i(P.l("time"))
if(r==null)H.i(P.l("wasAggressive"))
if(q==null)H.i(P.l("wasProactive"))
if(p==null)H.i(P.l("wasFailure"))
if(o==null)H.i(P.l("wasSuccess"))}this.l(z)
return z}}}],["","",,R,{"^":"",
ij:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$ij(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bM(new H.N(u,new R.uD(z),[H.m(u,0)]))
case 3:return P.aO()
case 1:return P.aP(v)}}})},
aZ:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eO(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.tz(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.n()},
uD:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfU()
y=this.a.gi()
return z==null?y==null:z===y}},
H:{"^":"mt;",
gjj:function(){return!0},
gbm:function(){var z=this.r
if(typeof z!=="number")return z.b8()
return z>0},
gb6:function(){return this.d instanceof K.c1},
gaO:function(){return this.dx===C.i},
ga5:function(){return this.dx===C.f},
gaa:function(){return this.dx===C.k},
jT:function(a){var z=this.fx
if(typeof z!=="number")return z.bN()
return z>=1},
eC:function(a,b){return this.h_(a,b)>0},
h_:function(a,b){var z,y
if(this.eE(b)){z=a.gbf()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iy(a,b,10))return 1
z=a.gbf()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eE:function(a){var z,y
z=a.c0("Confuse",this,!0)
if(z==null)return!1
y=a.kK("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d8:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a1(this.x)
y=z.gai()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gbm())x-=10
y=z.d
if(!(y instanceof K.c1))x+=4
y=J.aY(y.gac(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.ch,w=[null],v=new P.aj(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.aY(v.d.gac(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.gZ(y),u=new H.cf(v,new R.jC(this),[H.m(y,0)]),t=0;u.u();){s=v.gG()
r=s.gaW()?2:0
q=s.gai()
if(typeof q!=="number")return H.x(q)
p=J.aY(s.d.gac(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.aj(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.aY(q.d.gac(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.ct(x,t,y.bl(0,0,new R.jD(this,a)))},
iy:function(a,b,c){var z=b.kL(a,this,!0)
if(z==null)return!1
return z<=c},
$isbe:1},
mt:{"^":"d+dn;"},
tz:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$er()
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
z=P.a2(null,null,null,null)
a.gC().cx=z
z=this.cy
if(z!=null){y=new L.bn(null,null)
y.l(z)
z=y}else{z=$.$get$ez()
z.toString
y=new L.bn(null,null)
y.l(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
jC:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gbf(),z.fy)){y=a.gi()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
jD:{"^":"a:27;a,b",
$2:function(a,b){var z,y
z=b.gaW()?1:0
y=b.gai()
if(typeof y!=="number")return H.x(y)
return J.am(a,(z+y)*this.a.h_(b,this.b))}},
dQ:{"^":"d;a,b",
k:function(a){return this.b}},
pO:{"^":"H;a,fP:b<,bC:c<,a0:d<,fU:e<,bw:f<,ai:r<,i:x<,y,ca:z<,F:Q<,bX:ch<,h3:cx<,h:cy<,bD:db<,aj:dx<,a3:dy<,fr,aT:fx<,bf:fy<",
X:function(a){var z=new R.eO(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.v.gw(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.v.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eO:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfP:function(){return this.gC().c},
gbC:function(){return this.gC().d},
sbC:function(a){this.gC().d=a
return a},
ga0:function(){return this.gC().e},
sa0:function(a){this.gC().e=a
return a},
gfU:function(){return this.gC().f},
gbw:function(){return this.gC().r},
sbw:function(a){this.gC().r=a
return a},
gai:function(){return this.gC().x},
sai:function(a){this.gC().x=a
return a},
gi:function(){return this.gC().y},
gca:function(){return this.gC().Q},
gF:function(){return this.gC().ch},
gbX:function(){return this.gC().cx},
gh3:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gbD:function(){return this.gC().dx},
gaj:function(){return this.gC().dy},
saj:function(a){this.gC().dy=a
return a},
ga3:function(){return this.gC().fr},
gaT:function(){return this.gC().fy},
saT:function(a){this.gC().fy=a
return a},
gbf:function(){var z,y
z=this.gC()
y=z.go
if(y==null){y=new L.bn(null,null)
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
if(!(z==null)){y=new L.bn(null,null)
y.l(z)
z=y}this.go=z
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(e==null){e=new L.bn(null,null)
f.go=e
f=e}else f=e
z=new R.pO(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.n())
if(y==null)H.i(P.l("categories"))
if(v==null)H.i(P.l("currentWeapon"))
if(t==null)H.i(P.l("gold"))
if(s==null)H.i(P.l("hitpoints"))
if(r==null)H.i(P.l("id"))
if(q==null)H.i(P.l("initiative"))
if(p==null)H.i(P.l("isActive"))
if(o==null)H.i(P.l("isPlayer"))
if(n==null)H.i(P.l("items"))
if(m==null)H.i(P.l("maxHitpoints"))
if(l==null)H.i(P.l("name"))
if(k==null)H.i(P.l("nameIsProperNoun"))
if(j==null)H.i(P.l("pose"))
if(i==null)H.i(P.l("pronoun"))
if(g==null)H.i(P.l("stamina"))}this.l(z)
return z}}}],["","",,A,{"^":"",ct:{"^":"d;c4:a<,cY:b<,bV:c<",
as:function(a,b){return new A.ao(this.a-b.gc4(),this.b-b.gcY(),J.bx(this.c,b.gbV()))},
k:function(a){return"ActorScore<self="+C.j.b7(this.a,2)+",team="+C.j.b7(this.b,2)+",enemy="+J.bX(this.c,2)+">"}},ao:{"^":"d;c4:a<,cY:b<,bV:c<",
gkc:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c3:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ao(this.a*b,this.b*b,J.bV(this.c,b))},
a6:function(a,b){return new A.ao(this.a+b.gc4(),this.b+b.gcY(),J.am(this.c,b.gbV()))},
d4:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ao(this.a/b,this.b/b,J.aY(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.b7(this.a,2)+",team="+C.j.b7(this.b,2)+",enemy="+J.bX(this.c,2)+">"},
A:{
jB:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.D("Cannot average empty iterable"))
return new A.ao(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
we:function(a){switch(a){case C.L:return"spear"
case C.y:return"sword"
case C.z:return"fist"
default:throw H.c(P.D(a))}},
as:{"^":"mu;",
gaN:function(){return U.we(C.a.geA(this.a))},
gi:function(){return H.aE(this)},
gca:function(){return!0},
gbm:function(){return!1},
gF:function(){return!1},
gbD:function(){return!1},
ga3:function(){return C.r},
gbf:function(){return $.$get$bT()},
$isbe:1},
mu:{"^":"d+dn;"},
ds:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c1:{"^":"b6;h:b<,a"}}],["","",,G,{"^":"",b5:{"^":"b6;h:b<,co:c<,cZ:d<,bD:e<,cI:f<,fJ:r<,a"}}],["","",,L,{"^":"",b6:{"^":"as;",
gfJ:function(){return!1},
gcI:function(){return!1},
gk9:function(){return!1},
gbe:function(){return this.gco()>0},
geG:function(){return this.gcZ()>0},
gm:function(a){return 2},
gco:function(){return 0},
gcZ:function(){return 0},
gac:function(){var z,y,x
z=this.gco()
y=this.gcZ()
x=this.gbD()?1:0
return 2+z+y+x},
$isbe:1}}],["","",,G,{"^":"",mj:{"^":"d;",
fu:function(){var z,y
z=this.f
y=z.B
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.B=""}},
l6:[function(a){this.f.B+=a},"$1","gjA",2,0,21],
bt:function(){var z=0,y=P.aC(),x,w=this,v,u
var $async$bt=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.y("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sm(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gm(v)===0&&u.B.length===0)){z=4
break}z=5
return P.aw(w.d1(),$async$bt)
case 5:z=3
break
case 4:w.fu()
case 1:return P.aG(x,y)}})
return P.aH($async$bt,y)}}}],["","",,B,{"^":"",eZ:{"^":"d;d7:a<,du:b<,cR:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.bX(this.b,3)+", score="+this.a.k(0)+">"}},bC:{"^":"d;bG:a<,fC:b<,f2:c<,kt:d<,du:e<,f,r,eF:x<,cR:y<",
gw:function(a){return X.bv(H.o([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
t:function(a,b){var z
if(b==null)return!1
z=J.q(b)
return!!z.$isbC&&this.gw(this)===z.gw(b)},
k:function(a){var z,y
z=this.a
y=J.q(z)
z="PlanConsequence<"+y.gw(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
A:{
fz:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bV(e,b.gdu())
z=z?0:b.gcR()+1
d.b=a.r
return new B.bC(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j7:{"^":"d;a,b,c,d,e,f",
jm:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ah("...")
z.ah("combining scores")
y=H.o([],[A.ao])
x=new G.ju()
for(w=J.an(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gG()
z.ah(new G.js(r))
if(J.a8(r.gdu(),0.15))if(s==null){z.ah("    - first _bestCase")
s=r}else if(J.a8(x.$1(r.gd7()),x.$1(s.gd7()))){z.ah("    - new _bestCase")
s=r}q=r.gd7()
p=J.bx(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.ao((q.a-v)*o,(q.b-u)*o,J.bV(p,o))
z.ah(new G.jt(n))
y.push(n)}m=A.jB(y)
w=s==null
if(w)l=C.E
else{q=s.gd7()
l=new A.ao(q.a-v,q.b-u,J.bx(q.c,t))}w=w?s:s.gcR()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.aY(l.c,w)
t=m.a
q=m.b
p=m.c
z.ah("- uplifts average = "+("ActorScoreChange<self="+C.j.b7(t,2)+",team="+C.j.b7(q,2)+",enemy="+J.bX(p,2)+">"))
z.ah("- best = "+("ActorScoreChange<self="+C.t.b7(v,2)+",team="+C.t.b7(u,2)+",enemy="+J.bX(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ah("- result = "+("ActorScoreChange<self="+C.t.b7(t,2)+",team="+C.t.b7(q,2)+",enemy="+C.j.b7(p,2)+">"))
return new A.ao(t,q,p)},
eV:function(){var z=this
return P.aQ(function(){var y=0,x=1,w,v,u,t,s
return function $async$eV(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcc(),u=u.gZ(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gT()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aO()
case 1:return P.aP(w)}}})},
dB:function(a,b,c){var z=0,y=P.aC(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dB=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=x.f
w.b5(0)
v=x.c
u=v.a
t=u.a.aB(0,new G.jv(x))
s=t.d8(u)
r=x.a
r.bL("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b7(x.e8(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.bc(new G.jw(t,o))
if(o.H(t,u)!==!0){r.bc(new G.jx(o))
z=2
break}z=4
return P.aw(x.cu(v,o,b,a,c).cm(0),$async$dB)
case 4:n=e
if(J.eK(n)===!0){r.bc(new G.jy(o))
w.p(0,o,C.F)
z=2
break}r.bc(new G.jz(s,o,n))
m=x.jm(n,s,b)
w.p(0,o,m)
r.bc(new G.jA(o,m))
z=2
break
case 3:x.e=!0
return P.aG(null,y)}})
return P.aH($async$dB,y)},
ks:function(){return this.dB(50,10,null)},
e8:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$e8(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bM((u.length!==0?C.a.gv(u):null).gbb())
case 2:u=(u.length!==0?C.a.gv(u):null).gaE()
t=u.length
s={func:1,ret:Q.cI,args:[U.as]}
r={func:1,ret:Q.cE,args:[Q.n]}
q={func:1,ret:Q.E,args:[R.H]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ay(o,q)?6:8
break
case 6:x=9
return P.bM(Q.ig(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bM(Q.ih(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bM(Q.ii(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.y(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aO()
case 1:return P.aP(v)}}})},
cu:function(a5,a6,a7,a8,a9){var $async$cu=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aB(0,new G.jb(t))
p=t.a
p.bc("=====")
p.bc(new G.jc(a6,q))
p.bc(new G.jd(a6))
if(a6.H(q,r)!==!0){p.bc("- firstAction not applicable")
z=1
break}o=q.d8(r)
p.bc(new G.jj(a5,o))
p.bc(new G.jk(a5))
n=P.b3(null,B.bC)
m=P.a2(null,null,null,A.a9)
l=J.q(r)
k=l.gw(r)
for(j=new P.b7(a6.dr(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gG()
if(l.gw(r)!==k)throw H.c(new P.y("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aC(h)}s.a=0
r=t.b
case 3:if(!!n.gU(n)){z=4
break}++s.a
g=n.dE()
p.ah("----")
p.ah(new G.jl(g))
p.ah(new G.jm(g))
if(g.gcR()>a7||s.a>a8){p.ah(new G.jn(s,a7,g))
p.ah(new G.jo(g))
z=4
break}z=g.gbG().f.length===0?5:6
break
case 5:p.ah("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bd(0,new G.jp(t),new G.jq())
if(q==null){p.ah("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eZ(q.d8(l),g.e,g.y)
p.ah(new G.je(f))
z=7
x=[1]
return P.d2(P.hG(f),$async$cu,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gv(j):null).dN(l)
j=l.a
i=new H.N(j,new G.jf(t),[H.m(j,0)])
d=i.gm(i)
if(d>1)throw H.c(new P.y("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.h0("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aB(0,new G.jg(t))
c=J.e(e,q)
p.ah("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ah("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d8(l)
if(b==null)b=C.G
f=new B.eZ(b,g.e,g.y)
p.ah(new G.jh(o,f))
p.ah(new G.ji(g))
z=8
x=[1]
return P.d2(P.hG(f),$async$cu,y)
case 8:p.ah("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b7(t.e8(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.H(e,l)!==!0)continue
for(a1=new P.b7(a2.dr(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bU(a4.gdu(),0.05))continue
if(m.a4(0,a4.gbG()))continue
n.aC(a4)}}p.ah("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d2(null,0,y)
case 2:return P.d2(v,1,y)}})
var z=0,y=P.qi($async$cu),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rD(y)},
hT:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.D("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gv(z).gaN())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjq())+". Action Records: "+z.aP(0,new G.jr()).cb(0,"<-")))}},
A:{
j8:function(a,b){var z,y,x
z=N.bh("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a3(H.o([],[Y.ac]),0,P.aD())
x.b=b.r
z=new G.j7(z,y,new B.bC(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.T(0,null,null,null,null,null,0,[null,null]))
z.hT(a,b)
return z}}},jr:{"^":"a:0;",
$1:function(a){return a.gaN()}},ju:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},js:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jt:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jv:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jw:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gT()+"' for "+H.b(this.a.cy)}},jx:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gT()+"' isn't applicable"}},jy:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gT()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jz:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gT()+"' leads to "+H.b(J.aL(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jA:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gT()+"' was scored "+this.b.k(0)}},jb:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jc:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gT()+"' of "+H.b(this.b.gh())}},jd:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jj:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jk:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c3(" ",z.y)+"- "+J.h(z.b)}},jl:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfC().gT()+"'"}},jm:{"^":"a:2;a",
$0:function(){var z=this.a.gbG().f
return"- situation: "+H.b(J.iZ(z.length!==0?C.a.gv(z):null))}},jn:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcR()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jo:{"^":"a:2;a",
$0:function(){var z=this.a.gbG().d
return"- how we got here: "+new H.ap(z,new G.ja(),[H.m(z,0),null]).cb(0," <- ")}},ja:{"^":"a:0;",
$1:function(a){return a.gaN()}},jp:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jq:{"^":"a:2;",
$0:function(){return}},je:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},jf:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jg:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jh:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},ji:{"^":"a:2;a",
$0:function(){var z=this.a.gbG().d
return"- how we got here: "+new H.ap(z,new G.j9(),[H.m(z,0),null]).cb(0," <- ")}},j9:{"^":"a:0;",
$1:function(a){return a.gaN()}}}],["","",,Z,{"^":"",mN:{"^":"d;a,b",
gbb:function(){return this.b},
gU:function(a){return this.b.length===0},
ha:function(a,b){var z=this
return P.aQ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$ha(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bM(t)
case 5:w=1
break
case 4:s=z.is(new Z.mQ())
r=z.e7(new Z.mR(),[s])
q=z.e7(new Z.mS(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bD().bL("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bD().bL("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bD().bL("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cp(t,new Z.mT(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.q(m)
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
case 18:case 1:return P.aO()
case 2:return P.aP(u)}}})},
kr:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc5(y)
C.a.cp(y,new Z.mU(this,a))
x=this.a.a
w=x.gcn().bl(0,1/0,new Z.mV(a))
v=x.gcn().bl(0,-1/0,new Z.mW(a))
x=J.ak(v)
u=J.ak(w)
t=u.as(w,J.bV(x.as(v,w),0.1))
z.a=t
if(u.t(w,v)){t=J.bx(t,1)
z.a=t
u=t}else u=t
s=x.as(v,u)
r=P.mh(y.length,new Z.mX(z,this,a,s),!1,P.O)
q=new H.ap(r,new Z.mY(C.a.bl(r,0,Z.v_())),[H.m(r,0),null]).bE(0,!1)
z=C.a.bl(q,0,Z.v0())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.am(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.ng(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
e7:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a4(b,t))continue
if(w==null||J.a8(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
is:function(a){return this.e7(a,C.d)},
A:{
mO:function(a){var z,y,x
z=a.gcc()
y=H.z(z,"w",0)
x=P.U(new H.N(z,new Z.mP(a),[y]),!1,y)
if(x.length===0)$.$get$bD().eU("After removing actions scored by undefined, there are no recommendations.")
return x},
wG:[function(a,b){return J.am(a,b)},"$2","v_",4,0,42],
wH:[function(a,b){return J.am(a,b)},"$2","v0",4,0,43]}},mQ:{"^":"a:0;",
$1:function(a){return a.gc4()}},mR:{"^":"a:0;",
$1:function(a){return J.iV(a.gbV())}},mS:{"^":"a:0;",
$1:function(a){return a.gcY()}},mT:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bW(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mU:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bW(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mV:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d5(a),H.d5(z))}},mW:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d5(a),H.d5(z))}},mX:{"^":"a:10;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.aY(J.bx(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mY:{"^":"a:0;a",
$1:function(a){return J.j1(J.bV(J.aY(a,this.a),1000))}},mP:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkc()}}}],["","",,K,{"^":"",rN:{"^":"a:3;",
$3:function(a,b,c){}},cc:{"^":"d;a,h:b<,c,d,jG:e<,f,bx:r<",
gjE:function(){return this.a},
gw:function(a){return C.b.gw(this.b)},
t:function(a,b){if(b==null)return!1
return b instanceof K.cc&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jH:function(a,b,c){return this.e.$3(a,b,c)},
A:{
I:function(a,b,c,d,e,f,g){var z=new S.R(null,null,[Q.n])
z.ag()
z.l(f)
return new K.cc(z.n(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",n:{"^":"d;jz:a<,T:b<,aN:c<,k6:d<"}}],["","",,S,{"^":"",a_:{"^":"d;",
gaE:function(){return C.d},
gbb:function(){return C.d},
geL:function(){return 3},
dN:function(a){return this.ax(this.gM(),a)},
h6:function(a,b){},
h7:function(a,b){},
ko:function(a,b){},
dA:function(a){},
d9:function(a){return!0}}}],["","",,S,{"^":"",
fI:function(a){var z=$.$get$bF().ad(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nf:function(a,b){var z,y,x,w,v
z=$.$get$bF().kn()*b
for(y=new H.dD(a,a.gm(a),0,null,[H.z(a,"aV",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
ng:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bF().ad(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
cQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.J(a)
y=z.aV(a,"{")
if(y!==-1){x=z.gm(a)
if(typeof x!=="number")return x.as()
x=y<x-1}else x=!1
if(x){w=H.o([],[P.u])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.x(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.q(r)
if(x.t(r,"{"))++s
else if(x.t(r,"|")&&s===1)w.push(u)
else if(x.t(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bF().ad(p)
z=z.aG(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.cQ(C.b.aG(a,n+1,w[m])))
if(typeof v!=="number")return v.a6()
n=a.length
m+=C.b.aG(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cQ(z)}else{x=z.gm(a)
if(typeof x!=="number")return x.as()
if(t===x-1)return a
else{if(typeof t!=="number")return t.a6()
x=t+1
return z.aG(a,0,x)+H.b(S.cQ(C.b.bH(a,x)))}}}else return a},
ag:function(a,b,c,d){switch($.$get$bF().ad(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ac:{"^":"d;aY:a<,aU:b<,aQ:c<,h9:d<,e,ds:f@,hc:r<,h4:x<,f3:y<,jD:z<,hO:Q<,d3:ch<,j1:cx<,kb:cy<,M:db<",
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
z="Report<"+C.b.aG(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a3:{"^":"d;a,M:b<,c",
geB:function(){return C.a.bS(this.a,new Y.oA())},
aM:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bb(b).ey(b,".")||C.b.ey(b,"!")||C.b.ey(b,"?"))&&C.b.dc(b,P.bk("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ac(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
W:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
j3:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return this.aM(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,m)},
fE:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
ja:function(a,b,c,d,e,f){return this.aM(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
dn:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
j7:function(a,b,c,d,e){return this.aM(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dn:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fF:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fG:function(a,b,c,d,e,f){return this.aM(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
j9:function(a,b,c,d,e,f){return this.aM(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
j5:function(a,b,c){return this.aM(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
j6:function(a,b,c,d){return this.aM(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
j8:function(a,b,c,d,e){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
je:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oy().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gv(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bR(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gv(b))){z+="."
this.ja(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.p(a,"<also>","also")+" "
w=0}}},
jd:function(a,b,c,d){return this.je(a,b,c,"and",3,null,null,d)},
es:function(){return this.W(0,"\n\n",!0)},
bR:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.J(a)
z=z.aV(a,"<owner's> "+H.b(b))!==-1||z.aV(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aV(a,"<object-owner's> "+H.b(b))!==-1||z.aV(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.J(a)
if(z.aV(a,"<subject's> "+H.b(b))!==-1||z.aV(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gbD()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.cU(a,b,"the "+H.b(b))
else{w=J.eM(c.gh(),P.bk("[aeiouy]",!1,!1))?z.cU(a,b,"an "+H.b(b)):z.cU(a,b,"a "+H.b(b))
y.p(0,c.gi(),e)}}else w=null
return w==null?a:w},
ez:function(a,b){var z,y
if(!this.aR(a)||!this.aR(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaU()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaU()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaQ()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaQ()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaU().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaQ().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaQ().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaU().gi())}else z=!1
return z},
dM:function(a){var z=this
return P.aQ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dM(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aR(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaU()!=null?3:4
break
case 3:x=5
return t.gaU()
case 5:case 4:x=t.gaQ()!=null?6:7
break
case 6:x=8
return t.gaQ()
case 8:case 7:x=t.gh9()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aO()
case 2:return P.aP(v)}}})},
cQ:[function(a){var z=J.ak(a)
if(z.aS(a,0)||z.bN(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaQ()}},"$1","gaQ",2,0,22],
kp:function(a,b){var z
if(!this.aR(a)||!this.aR(b))return!1
if(this.ez(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf3()}return!1},
h8:function(a){var z
for(z=!1;this.geB();z=!0){a.$1(this.hd(!0))
this.kx()}return z},
hd:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bl(z,[],new Y.oB())
C.a.iN(z,new Y.oC(y),!1)
x=a&&this.geB()?C.a.aV(z,C.a.dv(z,new Y.oD()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ez(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gds())n=this.kp(s,p)&&this.hN(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gds()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sds(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].ghO()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjD()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd3())if(this.dl(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gds()}else n=!1
n=n||this.kM(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd3()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd3()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fI([" but "," but ",", but "])
u=!this.hA(s,s+1)&&!0}else{r+=S.fI([" and "," and ",", and "])
u=!0}}m=this.dV(s)
l=S.cQ(m)
p=J.J(l)
if(p.a4(l,"{")===!0||p.a4(l,"}")===!0)$.$get$is().dR('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dl(s,k)&&J.eM(this.dV(k),"<subject> ")&&p.dc(l,"<subject> ")}else k=!1
if(k)l=p.cU(l,"<subject> ","")
j=J.dd(l,"<action>",this.dV(s))
p=s-1
k=this.iQ(s,p)
if(k)k=!(this.cQ(s).ga3()===C.r&&this.bi(s).ga3()===C.r)
else k=!1
if(k){j=H.p(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.p(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.p(j,"<object>","<objectPronounAccusative>")
j=H.p(j,"<object's>","<objectPronoun's>")}k=this.dl(s,p)
if(k){j=H.p(j,"<owner's> <subject>","<subjectPronoun>")
j=H.p(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.p(j,"<subject>","<subjectPronoun>")
j=H.p(j,"<subject's>","<subjectPronoun's>")}if(this.cQ(p)!=null)if(this.bi(s)!=null)if(this.bi(p)!=null){k=this.cQ(p)
k=k==null?k:k.gi()
i=this.bi(s)
if(J.e(k,i==null?i:i.gi())){k=this.bi(p)
k=k==null?k:k.ga3()
i=this.bi(s)
k=!J.e(k,i==null?i:i.ga3())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.p(j,"<owner's> <subject>","<subjectPronoun>")
j=H.p(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.p(j,"<subject>","<subjectPronoun>")
j=H.p(j,"<subject's>","<subjectPronoun's>")}if(this.bi(p)!=null)if(this.cQ(s)!=null){k=this.bi(p)
k=k==null?k:k.gi()
i=this.cQ(s)
if(J.e(k,i==null?i:i.gi())){p=this.bi(p)
p=p==null?p:p.ga3()
k=this.bi(s)
p=!J.e(p,k==null?k:k.ga3())}else p=!1}else p=!1
else p=!1
if(p){j=H.p(j,"<object-owner's> <object>","<objectPronoun>")
j=H.p(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.p(j,"<object>","<objectPronounAccusative>")
j=H.p(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gaU()
g=p.gaQ()
f=p.gh9()
e=p.e
k=h!=null
if(k){if(h.gF()===!0){d=H.p(j,"<subject>","<subjectPronoun>")
d=H.p(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga3()===C.C||h.ga3()===C.a1){d=H.p(d,"<s>","")
d=H.p(d,"<es>","")
d=H.p(d,"<sses>","ss")
d=H.p(d,"<ies>","y")
d=H.p(d,"<does>","do")
d=H.p(d,"<is>","are")
d=H.p(d,"<has>","have")}else{d=H.p(d,"<s>","s")
d=H.p(d,"<es>","es")
d=H.p(d,"<sses>","sses")
d=H.p(d,"<ies>","ies")
d=H.p(d,"<does>","does")
d=H.p(d,"<is>","is")
d=H.p(d,"<has>","has")}d=H.iK(d,"<subject>","<subjectNoun>",0)
i=h.ga3().a
d=H.p(d,"<subject>",i)
i=p.db
d=J.cr(this.bR(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga3().a
d=H.p(d,"<subjectPronoun>",c)
if(C.b.a4(j,P.bk("<subject>.+<subject's>",!0,!1))){c=h.ga3().c
d=H.p(d,"<subject's>",c)}d=J.cr(this.bR(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga3().c
d=H.p(d,"<subject's>",i)
i=h.ga3().b
d=H.p(d,"<subjectPronounAccusative>",i)
i=h.ga3().d
d=H.p(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gbD()===!0){d=H.p(d,"<subject's> <object>","<object>")
d=H.p(d,"<subjectPronoun's> <object>","<object>")}if(g.gF()===!0){d=H.p(d,"<object>","<objectPronoun>")
d=H.p(d,"<object's>","<objectPronoun's>")}else d=J.dd(this.bR(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga3().b
d=H.p(d,"<objectPronoun>",i)
if(C.b.a4(j,P.bk("<object>.+<object's>",!0,!1))){i=g.ga3().c
d=H.p(d,"<object's>",i)}d=J.cr(this.bR(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga3().c
d=H.p(d,"<object's>",i)
i=g.ga3().c
d=H.p(d,"<objectPronoun's>",i)
i=g.ga3().b
d=H.p(d,"<objectPronounAccusative>",i)
i=g.ga3().a
d=H.p(d,"<objectPronounNominative>",i)}if(k){k=h.ga3().c
d=H.p(d,"<subjectPronoun's>",k)}p=p.db
j=this.fv(e,this.fv(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oz(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd3())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd3()?r+".":r
return H.w9(z.charCodeAt(0)==0?z:z,$.$get$h2(),new Y.oE(),null)},
ci:function(){return this.hd(!1)},
kx:function(){var z,y
if(!this.geB()){C.a.sm(this.a,0)
return}z=this.a
y=C.a.aV(z,C.a.dv(z,new Y.oF()))+1
P.ca(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hA:function(a,b){var z,y
if(!this.aR(a)||!this.aR(b))return!1
if(this.ez(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf3()}if(!this.dl(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghc()){if(b>=z.length)return H.f(z,b)
y=z[b].ghc()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].gh4()){if(b>=z.length)return H.f(z,b)
z=z[b].gh4()}else z=!1
if(z)return!0
else return!1},
hN:function(a,b){var z,y,x,w,v
if(!this.aR(a)||!this.aR(b))return!1
for(z=new P.b7(this.dM(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b7(this.dM(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gG()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
dV:[function(a){var z=J.ak(a)
if(z.aS(a,0)||z.bN(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaY()}},"$1","gaY",2,0,13],
bi:[function(a){var z=J.ak(a)
if(z.aS(a,0)||z.bN(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaU()}},"$1","gaU",2,0,22],
kM:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gM()!=null){y=a-1
if(this.aR(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gM()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gM()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gM()
if(typeof y!=="number")return y.as()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.ci()},
aR:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fv:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gF()===!0?H.p(H.p(b,d,"you"),e,"your"):J.dd(this.bR(b,d,a,null,h),d,a.gh())
z=H.p(z,f,a.ga3().a)
z=H.p(H.p(J.cr(this.bR(C.b.a4(c,P.bk(d+".+"+e,!0,!1))?H.p(z,e,a.ga3().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga3().c),g,a.ga3().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
iQ:function(a,b){var z,y
if(!this.aR(a)||!this.aR(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaQ()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaQ()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaQ().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaQ().gi())},
dl:function(a,b){var z,y
if(!this.aR(a)||!this.aR(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaU()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaU()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaU().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaU().gi())},
A:{
oz:function(a){var z,y,x
z=!C.b.a4(a,"\n\n")?C.b.kR(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bH(z,1)}}},oA:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),"\n\n")}},oy:{"^":"a:23;",
$1:function(a){return C.b.eT(H.p(H.p(a,"<also> ",""),"  "," "))}},oB:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.J(a)
y=z.gaq(a)?z.gv(a):null
if(y!=null&&y.gkb()&&J.e(b.gj1(),y.cx)){x=z.gm(a)
if(typeof x!=="number")return x.as()
z.p(a,x-1,b)}else z.q(a,b)
return a}},oC:{"^":"a:31;a",
$1:function(a){return J.eI(this.a,a)}},oD:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),"\n\n")}},oE:{"^":"a:28;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oF:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),"\n\n")}},be:{"^":"mv;bD:a<,h:b<,c,bf:d<,F:e<,a3:f<",
gi:function(){return H.aE(this)},
gca:function(){return!0},
gbm:function(){return!0},
A:{
dm:function(a,b,c,d,e){var z=H.o([],[P.t])
return new Y.be(c,b,z,e==null?$.$get$bT():e,!1,d)}}},mv:{"^":"d+dn;"},dn:{"^":"d;",
gaW:function(){return this.gbm()&&this.gca()===!0},
ae:function(a,b,c,d,e,f,g,h,i,j,k,l){J.iW(a,b,c,d,e,f,g,h,i,j,H.K(this,"$isbe"),!1,l)},
ak:function(a,b){return this.ae(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
aw:function(a,b,c){return this.ae(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
dF:function(a,b,c){return this.ae(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
ao:function(a,b,c){return this.ae(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
hi:function(a,b,c,d){return this.ae(a,b,null,!1,!1,!1,!1,c,null,!1,!1,d)},
bY:function(a,b,c){return this.ae(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cW:function(a,b,c,d){return this.ae(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
ck:function(a,b,c,d,e){return this.ae(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
az:function(a,b,c){return this.ae(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
cj:function(a,b,c,d){return this.ae(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eN:function(a,b,c,d){return this.ae(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bs:function(a,b,c,d){return this.ae(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
cj:function(a,b,c,d){return this.ae(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
hg:function(a,b,c,d){return this.ae(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
eO:function(a,b,c,d,e){return this.ae(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
kD:function(a,b,c,d){return this.ae(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
hf:function(a,b,c,d){return this.ae(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kG:function(a,b,c,d,e,f){return this.ae(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
bZ:function(a,b,c,d,e){return this.ae(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
he:function(a,b,c){return this.ae(a,b,c,!1,!1,!1,!1,null,null,!1,!1,!1)},
kC:function(a,b,c,d){return this.ae(a,b,c,!1,!1,!1,!1,d,null,!1,!1,!1)},
hh:function(a,b,c,d){return this.ae(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kF:function(a,b,c,d,e){return this.ae(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kH:function(a,b,c,d,e,f){return this.ae(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eN:function(a,b,c,d){return this.ae(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kE:function(a,b,c,d){return this.ae(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c8:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tB:{"^":"a:0;",
$1:function(a){a.gcE().b=2
return 2}},tH:{"^":"a:0;",
$1:function(a){a.gcE().b=0
return 0}},tA:{"^":"a:0;",
$1:function(a){a.gcE().b=1
return 1}},hf:{"^":"d;"},q7:{"^":"hf;i:a<",
X:function(a){var z=new L.bn(null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hf))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gw:function(a){return Y.Q(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
A:{
e7:function(a){var z=new L.bn(null,null)
a.$1(z)
return z.n()}}},bn:{"^":"d;a,b",
gi:function(){return this.gcE().b},
gcE:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y
z=this.a
if(z==null){y=this.gcE().b
z=new L.q7(y)
if(y==null)H.i(P.l("id"))}this.l(z)
return z}}}],["","",,X,{"^":"",
i_:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i_(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bc(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bc(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aO()
case 1:return P.aP(v)}}})}}],["","",,A,{"^":"",a9:{"^":"d;eq:a<,bX:b<,c,d,e,f,M:r<,x",
gjq:function(){var z=this.f
return z.length!==0?C.a.gv(z):null},
gw:function(a){var z,y,x,w,v
z=X.bv(this.a)
y=X.bv(this.d)
x=X.bv(this.f)
w=this.r
v=this.c
v=X.d4(X.aX(X.aX(0,C.e.gw(w)),J.j(v)))
return X.d4(X.aX(X.aX(X.aX(X.aX(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
t:function(a,b){var z
if(b==null)return!1
z=J.q(b)
return!!z.$isa9&&this.gw(this)===z.gw(b)},
fD:function(a){var z,y
z=this.hz(a,!0)
y=z.gZ(z)
if(y.u()){y.gG()
return!0}return!1},
bA:function(a){var z,y
z=this.hy(a)
y=z.gZ(z)
if(y.u()){y.gG()
return!0}return!1},
j0:function(a){var z=this.x
if(z==null)return!1
return C.b.a4(z.gh(),a)},
fQ:function(a){var z,y,x
z=this.dh(a)
if(z==null)throw H.c(new P.y("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ap()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ap:function(){++this.r},
dL:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dW(0,new A.pD(a))
if(b!=null)z=z.c2(0,new A.pE(b))
if(c!=null)z=z.c2(0,new A.pF(c))
if(e!=null)z=z.c2(0,new A.pG(e))
return d!=null?z.c2(0,new A.pH(d)):z},
hz:function(a,b){return this.dL(a,null,null,null,b)},
hy:function(a){return this.dL(a,null,null,null,null)},
a1:function(a){return this.a.aB(0,new A.pI(a))},
dP:function(a){return this.e.aB(0,new A.pJ(a))},
eW:function(a){var z,y
z=this.dh(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
af:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.D("No situation with name="+a+" found."))},
jS:function(a){var z=this.a.bd(0,new A.pK(a),new A.pL())
if(z==null)return!1
return z.gbm()},
ar:function(){var z,y
z=this.f
y=C.a.gv(z)
y.dA(this)
C.a.ab(z,y)},
bq:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gv(z).gh(),a)))break
y=C.a.gv(z)
y.dA(this)
C.a.ab(z,y)}if(z.length===0)throw H.c(P.D("Tried to pop situations until "+a+" but none was found in stack."))},
cV:function(a,b){var z,y
z=this.dh(a)
if(z==null)throw H.c(P.D("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dG:function(a,b,c,d,e){var z,y,x,w
z=this.dL(a,b,c,d,e)
y=z.gZ(z)
if(y.u()){x=y.gG()
y=this.r
w=x.gM()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kL:function(a,b,c){return this.dG(null,a,b,c,null)},
c0:function(a,b,c){return this.dG(a,null,b,null,c)},
kK:function(a,b,c){return this.dG(a,b,null,null,c)},
d_:function(a){return this.dG(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ee()
y.at(0,z)
return"World<"+P.c3(y,"{","}")+">"},
Y:function(a,b){var z,y,x
z=this.a1(a)
y=z.X(b)
x=this.a
x.ab(0,z)
x.q(0,y)},
dh:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
i1:function(a){this.a.at(0,a.a)
this.d.at(0,a.d)
this.b.at(0,a.b)
this.e.at(0,a.e)
C.a.at(this.f,a.f)
this.r=a.r},
A:{
e5:function(a){var z,y,x,w
z=P.a2(null,null,null,R.H)
y=P.b3(null,O.cs)
x=P.a2(null,null,null,U.as)
w=P.a2(null,null,null,null)
w=new A.a9(z,x,a.c,y,w,[],null,null)
w.i1(a)
return w}}},pD:{"^":"a:0;a",
$1:function(a){return a.gep()===this.a}},pE:{"^":"a:0;a",
$1:function(a){return J.e(a.gcT(),this.a.gi())}},pF:{"^":"a:0;a",
$1:function(a){return a.gf4().a4(0,this.a.gi())}},pG:{"^":"a:0;a",
$1:function(a){return a.ghu()===this.a}},pH:{"^":"a:0;a",
$1:function(a){return a.ghs()===this.a}},pI:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pJ:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pK:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pL:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",Y:{"^":"aa;a2:b<"},b4:{"^":"Y;c,T:d<,J:e<,h:f<,b,a",
R:[function(a,b,c){throw H.c(new P.y("SimpleAction always succeeds"))},"$3","gN",6,0,1],
S:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gO",6,0,1],
a7:function(a,b){throw H.c(new P.y("SimpleAction shouldn't have to provide roll reason"))},
I:function(a,b){return 1},
gK:function(){return!1},
H:function(a,b){return!0},
gL:function(){return H.i(new P.y("Not rerollable"))},
gP:function(){return!1}}}],["","",,N,{"^":"",k1:{"^":"E;K:c<,a2:d<,J:e<,P:f<,L:r<,b,a",
gam:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gan:function(){return"will <subject> confuse <object>?"},
R:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ao(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eN(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bs(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.az(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){return 0.6},
H:function(a,b){var z
if(a.gF()===!0)if(a.gaa()){z=b.a
z=new H.N(z,new N.k2(this),[H.m(z,0)])
z=z.gm(z)>=2&&!this.b.eE(b)}else z=!1
else z=!1
return z},
A:{
wk:[function(a){return new N.k1(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","u1",2,0,5]}},k2:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbm()){z=a.gbf()
y=this.a.b.gbf()
z=z.a
y=y.gi()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",kp:{"^":"E;P:c<,L:d<,K:e<,a2:f<,J:r<,b,a",
gam:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gan:function(){return"will <subject> kick the weapon off?"},
R:[function(a,b,c){S.ag(new V.kq(this,a,c),new V.kr(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y
S.ag(new V.ks(this,a,c),new V.kt(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gv(z):null
b.cV(y.gi(),y.X(new V.ku(this)))
z=this.b
b.Y(z.gi(),new V.kv())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gO",6,0,1],
I:function(a,b){var z=a.gaa()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
H:function(a,b){var z
if(a.gaa()||a.dx===C.i){z=this.b
z=z.ga5()&&!z.gb6()}else z=!1
return z},
A:{
wn:[function(a){return new V.kp(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","ui",2,0,5]}},kq:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aw(y,"<subject> mi<sses>",!0)}},kr:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> weapon",y)
y.aw(z,"<subject> hold<s> onto it",!0)}},ks:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.kH(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga0(),z,!0)}},kt:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.dn(0,"<owner's> <subject> fl<ies> away",y,y.ga0())}},ku:{"^":"a:26;a",
$1:function(a){a.gbK().q(0,this.a.b.ga0())
return a}},kv:{"^":"a:0;",
$1:function(a){a.sa0($.$get$er())
return a}}}],["","",,R,{"^":"",m1:{"^":"E;P:c<,L:d<,K:e<,a2:f<,J:r<,b,a",
gh:function(){return"KickToGround"},
gam:function(){return"kick <object> to the ground"},
gan:function(){return"will <subject> kick <object> prone?"},
R:[function(a,b,c){S.ag(new R.m2(this,a,c),new R.m3(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gN",6,0,1],
S:[function(a,b,c){var z
S.ag(new R.m4(this,a,c),new R.m5(this,a,c,b.af("FightSituation").gbx()),null,null)
z=this.b
b.Y(z.gi(),new R.m6())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gO",6,0,1],
I:function(a,b){var z=a.gaa()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
H:function(a,b){return(a.gaa()||a.dx===C.i)&&!this.b.ga5()},
A:{
wB:[function(a){return new R.m1(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uR",2,0,5]}},m2:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aw(y,"<subject> mi<sses>",!0)}},m3:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> shin",y)
y.aw(z,"<subject> <does>n't budge",!0)}},m4:{"^":"a:2;a,b,c",
$0:function(){this.b.kF(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},m5:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ak(z,"<subject> {grunt|shriek}<s>")
y.az(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},m6:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,F,{"^":"",mM:{"^":"aa;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gT:function(){return"Stand off."},
gh:function(){return"Pass"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){if(a.gF()===!0)a.ak(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gO",6,0,1],
a7:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){return!0}}}],["","",,Y,{"^":"",n_:{"^":"E;P:c<,L:d<,K:e<,a2:f<,J:r<,b,a",
gam:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gan:function(){return"will <subject> force <object> off balance?"},
R:[function(a,b,c){var z=this.b
a.hh(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga0(),z)
z.bY(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
a.hh(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga0(),z)
if(z.gaa()){z.hg(c,"<subject> lose<s> <object>",!0,$.$get$ep())
b.Y(z.x,new Y.n0())
C.a.q(b.f,U.mw(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gaO()){z.ak(c,"<subject> <is> already off balance")
c.fF(0,"<subject> make<s> <object> fall to the "+H.b(b.af("FightSituation").gbx()),z,$.$get$iB())
b.Y(z.x,new Y.n1())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.y("enemy pose must be either standing or off-balance"))},"$3","gO",6,0,1],
I:function(a,b){var z=a.gaa()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
H:function(a,b){var z,y
if(!a.ga5()){z=a.d
if(z.gbe()||z.gk9()){z=this.b
if(!z.ga0().gcI()){z.ga0().gfJ()
y=!1}else y=!0
z=y&&!z.ga5()}else z=!1}else z=!1
return z},
A:{
wI:[function(a){return new Y.n_(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","v1",2,0,5]}},n0:{"^":"a:0;",
$1:function(a){a.saj(C.i)
return a}},n1:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,B,{"^":"",nn:{"^":"aa;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gT:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){if(a.gF()===!0)a.bs(c,"<subject> regain<s> <object>",$.$get$ep(),!0)
b.Y(a.gi(),new B.no())
return H.b(a.gh())+" regains balance"},"$3","gO",6,0,1],
a7:function(a,b){return"Will "+a.ga3().a+" regain balance?"},
I:function(a,b){return 1},
H:function(a,b){return a.gaO()}},no:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,O,{"^":"",nC:{"^":"aa;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gT:function(){return"Scramble."},
gh:function(){return"Scramble"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gO",6,0,1],
a7:function(a,b){return"Will "+a.ga3().a+" crawl out of harm's way?"},
I:function(a,b){return 1},
H:function(a,b){if(!a.ga5())return!1
if(A.db(a,b))return!0
return!1}}}],["","",,Q,{"^":"",on:{"^":"aa;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gT:function(){return"Stand up."},
gh:function(){return"StandUp"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){a.ak(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.ag(new Q.oo(a,c),new Q.op(a,c),null,null)
b.Y(a.gi(),new Q.oq())
return H.b(a.gh())+" stands up"},"$3","gO",6,0,1],
a7:function(a,b){return"Will "+a.ga3().a+" stand up?"},
I:function(a,b){return 1},
H:function(a,b){if(!a.ga5())return!1
if(A.db(a,b))return!1
return!0}},oo:{"^":"a:2;a,b",
$0:function(){return this.a.ak(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},op:{"^":"a:2;a,b",
$0:function(){return this.a.ak(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oq:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,T,{"^":"",
x7:[function(a){return new A.ah(T.eB(),null,null,new T.v8(),new T.v9(),new T.va(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vX",2,0,5],
x8:[function(a){return new A.ah(T.eB(),new T.vb(),T.eB(),new T.vc(),new T.vd(),new T.ve(),new T.vf(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vY",2,0,5],
x9:[function(a,b,c,d,e){a.ao(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Y(a.gi(),new T.vg())},"$5","eB",10,0,9],
v8:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga5()&&a.gb6()&&c.gb6()}},
v9:{"^":"a:3;",
$3:function(a,b,c){return Y.eU(a,c)}},
va:{"^":"a:3;",
$3:function(a,b,c){return S.dM(a,c,C.l)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga5()&&a.gb6()&&c.gb6()}},
vd:{"^":"a:3;",
$3:function(a,b,c){return Y.eU(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return S.dM(a,c,C.m)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vf:{"^":"a:3;",
$3:function(a,b,c){return S.dM(a,c,C.p)}},
vg:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,A,{"^":"",ah:{"^":"E;c,d,e,f,r,x,y,z,J:Q<,K:ch<,a2:cx<,h:cy<,P:db<,L:dx<,am:dy<,an:fr<,b,a",
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
H:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xa:[function(a){return new A.ah(M.eC(),null,null,new M.vh(),new M.vi(),new M.vj(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vZ",2,0,5],
xb:[function(a){return new A.ah(M.eC(),new M.vk(),M.eC(),new M.vl(),new M.vm(),new M.vn(),new M.vo(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","w_",2,0,5],
xc:[function(a,b,c,d,e){if(a.ga5()){a.he(c,"<subject> roll<s>",e.gi())
a.he(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kC(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eC",10,0,9],
vh:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&!c.ga5()&&!A.db(a,b)}},
vi:{"^":"a:3;",
$3:function(a,b,c){return F.fk(a,c)}},
vj:{"^":"a:3;",
$3:function(a,b,c){return V.dA(a,c,C.l)}},
vl:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&!c.ga5()&&!A.db(a,b)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return F.fk(a,c)}},
vn:{"^":"a:3;",
$3:function(a,b,c){return V.dA(a,c,C.m)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return a.gaa()?0.4:0.2}},
vo:{"^":"a:3;",
$3:function(a,b,c){return V.dA(a,c,C.p)}}}],["","",,U,{"^":"",
xd:[function(a){return new A.ah(U.eD(),null,null,new U.vp(),new U.vq(),new U.vr(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","w0",2,0,5],
xe:[function(a){return new A.ah(U.eD(),new U.vs(),U.eD(),new U.vt(),new U.vu(),new U.vv(),new U.vw(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w1",2,0,5],
xf:[function(a,b,c,d,e){c.j9(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eD",10,0,9],
vp:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()!==!0)z=(a.gaa()||a.dx===C.i)&&!c.ga5()&&a.gb6()
else z=!1
return z}},
vq:{"^":"a:3;",
$3:function(a,b,c){return Q.fH(a,c)}},
vr:{"^":"a:3;",
$3:function(a,b,c){return Z.dU(a,c,C.l)}},
vt:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()===!0)z=(a.gaa()||a.dx===C.i)&&!c.ga5()&&a.gb6()
else z=!1
return z}},
vu:{"^":"a:3;",
$3:function(a,b,c){return Q.fH(a,c)}},
vv:{"^":"a:3;",
$3:function(a,b,c){return Z.dU(a,c,C.m)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vw:{"^":"a:3;",
$3:function(a,b,c){return Z.dU(a,c,C.p)}}}],["","",,G,{"^":"",
xg:[function(a){return new A.ah(G.eE(),null,null,new G.vz(),new G.vA(),new G.vB(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","w2",2,0,5],
xl:[function(a){return new A.ah(G.eE(),new G.vK(),G.eE(),new G.vL(),new G.vM(),new G.vN(),new G.vO(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w3",2,0,5],
xm:[function(a,b,c,d,e){return a.eO(c,"<subject> swing<s> {"+H.b(U.ae(a))+" |}at <object>",e.gi(),!0,d)},"$5","eE",10,0,9],
vz:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gaa()&&!c.ga5()&&a.d.gbe()}},
vA:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.l)}},
vL:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gaa()&&!c.ga5()&&a.d.gbe()}},
vM:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vN:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.m)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vO:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.p)}}}],["","",,R,{"^":"",
xh:[function(a,b,c,d,e){return a.hg(c,"<subject> completely miss<es> <object> with "+H.b(U.ae(a)),!0,d)},"$5","iI",10,0,12],
xi:[function(a){return new A.ah(R.iJ(),new R.vC(),R.iI(),new R.vD(),new R.vE(),new R.vF(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","w4",2,0,5],
xj:[function(a){return new A.ah(R.iJ(),new R.vG(),R.iI(),new R.vH(),new R.vI(),new R.vJ(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","w5",2,0,5],
xk:[function(a,b,c,d,e){return a.eO(c,"<subject> swing<s> {"+H.b(U.ae(a))+" |}at <object>",e.gi(),!0,d)},"$5","iJ",10,0,9],
vD:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gaO()&&!c.ga5()&&a.d.gbe()}},
vE:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vF:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.l)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vH:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gaO()&&!c.ga5()&&a.d.gbe()}},
vI:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.m)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
xn:[function(a){return new A.ah(D.eF(),null,null,new D.vP(),new D.vQ(),new D.vR(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","w6",2,0,5],
xo:[function(a){return new A.ah(D.eF(),new D.vS(),D.eF(),new D.vT(),new D.vU(),new D.vV(),new D.vW(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","w7",2,0,5],
xp:[function(a,b,c,d,e){return a.ao(c,"<subject> strike<s> down {with "+H.b(U.ae(a))+" |}at <object>",d)},"$5","eF",10,0,12],
vP:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga5()&&!a.ga5()&&a.d.gbe()}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return D.h4(a,c)}},
vR:{"^":"a:3;",
$3:function(a,b,c){return V.dK(a,c,C.l)}},
vT:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga5()&&!a.ga5()&&a.d.gbe()}},
vU:{"^":"a:3;",
$3:function(a,b,c){return D.h4(a,c)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return V.dK(a,c,C.m)}},
vS:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vW:{"^":"a:3;",
$3:function(a,b,c){return V.dK(a,c,C.p)}}}],["","",,M,{"^":"",p1:{"^":"cI;a2:c<,b,a",
gJ:function(){return"A different weapon might change the battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gP:function(){return!1},
gL:function(){return},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gv(z):null
b.cV(y.gi(),y.X(new M.p2(this)))
b.Y(a.gi(),new M.p3(this,a))
z=this.b
a.ao(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,1],
a7:function(a,b){return H.i(new P.ad(null))},
I:function(a,b){return 1},
H:function(a,b){var z,y,x
z=this.b
if(!(z instanceof L.b6))return!1
a.gjj()
z=z.gac()
y=a.d.gac()
if(typeof y!=="number")return H.x(y)
if(z<=y)return!1
x=b.c0("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
A:{
wM:[function(a){return new M.p1(!0,a,null)},"$1","wb",2,0,47]}},p2:{"^":"a:26;a",
$1:function(a){a.gbK().ab(0,this.a.b)
return a}},p3:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb6())a.gbX().q(0,a.ga0())
a.sa0(H.K(this.a.b,"$isb6"))}}}],["","",,M,{"^":"",pA:{"^":"aa;J:b<,P:c<,L:d<,K:e<,a2:f<,a",
gT:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){a.ak(c,"<subject> shake<s> <subject's> head violently")
if(a.gF()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kE(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gO",6,0,1],
a7:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z
if(a.eE(b)){z=b.c0("Confuse",a,!0)
if(typeof z!=="number")return z.b8()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",lj:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
b.Y(z.gi(),new R.lk())
if(J.e(z.gi(),100))a.bs(c,"<subject> smash<es> <object's> head to the ground",z,!0)
else a.bs(c,"<subject> break<s> <object's> neck",z,!0)
X.co(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gO",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
A:{
ws:[function(a){return new R.lj(null,!0,!0,!0,C.c,a,null)},"$1","up",2,0,5]}},lk:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}}}],["","",,Y,{"^":"",
eU:function(a,b){var z=new Y.dg(null,null,null,null,null)
new Y.tU(a,b).$1(z)
return z.n()},
eT:{"^":"a_;",
gaE:function(){return[R.up()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ap:function(){var z=new Y.dg(null,null,null,null,null)
z.l(this)
new Y.jQ().$1(z)
return z.n()},
ax:function(a,b){if(a===0)return b.a1(this.a)
return},
aA:function(a,b){return new H.N(a,new Y.jR(this),[H.m(a,0)])}},
tU:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaZ().c=z
a.gaZ().e=0
z=this.a.gi()
a.gaZ().b=z
z=this.b.gi()
a.gaZ().d=z
return a}},
jQ:{"^":"a:0;",
$1:function(a){var z=a.gaZ().e
if(typeof z!=="number")return z.a6()
a.gaZ().e=z+1
return a}},
jR:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pP:{"^":"eT;a,i:b<,c,M:d<",
X:function(a){var z=new Y.dg(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eT))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dg:{"^":"d;a,b,c,d,e",
gi:function(){return this.gaZ().c},
gM:function(){return this.gaZ().e},
gaZ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaZ().b
x=this.gaZ().c
w=this.gaZ().d
v=this.gaZ().e
z=new Y.pP(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",l1:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gan:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {dodge it|break free}")
S.ag(new Z.l2(a,c),new Z.l3(this,a,c),null,null)
b.ar()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.bq("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gv(z):null).gbr().bp(0.5)},
H:function(a,b){return!0},
A:{
wr:[function(a){return new Z.l1("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","um",2,0,5]}},l2:{"^":"a:2;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {can't|fail<s>}",!0)}},l3:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dM:function(a,b,c){var z=new S.dL(null,null,null,null,null,null)
new S.tT(a,b,c).$1(z)
return z.n()},
fx:{"^":"c_;",
gaE:function(){return[Z.um()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ap:function(){var z=new S.dL(null,null,null,null,null,null)
z.l(this)
new S.mG().$1(z)
return z.n()}},
tT:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaL().c=z
a.gaL().f=0
z=this.a.gi()
a.gaL().b=z
z=this.b.gi()
a.gaL().e=z
a.gaL().d=this.c
return a}},
mG:{"^":"a:0;",
$1:function(a){var z=a.gaL().f
if(typeof z!=="number")return z.a6()
a.gaL().f=z+1
return a}},
pZ:{"^":"fx;cG:a<,i:b<,cg:c<,cl:d<,M:e<",
X:function(a){var z=new S.dL(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fx))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dL:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaL().c},
gM:function(){return this.gaL().f},
gaL:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaL().b
x=this.gaL().c
w=this.gaL().d
v=this.gaL().e
u=this.gaL().f
z=new S.pZ(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",
db:function(a,b){var z,y,x,w
z=b.c0("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c0("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c0("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c0("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
ae:function(a){return a.ga0().gbD()===!0?a.ga0().gh():"<subject's> "+H.b(a.ga0().gh())}}],["","",,G,{"^":"",
wW:[function(a,b,c,d,e){a.ak(c,"<subject> tr<ies> to swing back")
a.eN(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gaa()){b.Y(a.x,new G.u4())
a.cj(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.Y(a.x,new G.u5())
a.az(c,"<subject> lose<s> balance because of that",!0)
a.cj(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","i6",10,0,12],
wX:[function(a){return new A.ah(G.i7(),new G.u6(),G.i6(),new G.u7(),new G.u8(),new G.u9(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","ue",2,0,5],
wZ:[function(a,b,c,d,e){return a.ao(c,"<subject> swing<s> back",d)},"$5","i7",10,0,9],
wY:[function(a){return new A.ah(G.i7(),new G.ua(),G.i6(),new G.ub(),new G.uc(),new G.ud(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","uf",2,0,5],
u4:{"^":"a:0;",
$1:function(a){a.saj(C.i)
return a}},
u5:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},
u7:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga0().gbe()&&!a.ga5()}},
u8:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
u9:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.l)}},
u6:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}},
ub:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga0().gbe()&&!a.ga5()}},
uc:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
ud:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.m)}},
ua:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}}}],["","",,V,{"^":"",ka:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gan:function(){return"will <subject> tackle <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to tackle <object>",z)
S.ag(new V.kb(a,c),new V.kc(this,c),null,null)
a.ao(c,"<subject> land<s> on the "+H.b(U.eu(b))+" next to <object>",z)
b.Y(a.gi(),new V.kd())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tackle<s> <object> to the ground",z)
b.Y(z.gi(),new V.ke())
b.Y(a.gi(),new V.kf())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){var z=this.b.gaO()?0.2:0
if(a.gF()===!0)return 0.7+z
return 0.5+z},
H:function(a,b){return!a.ga5()&&a.d instanceof K.c1},
A:{
wl:[function(a){return new V.ka("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","ug",2,0,5]}},kb:{"^":"a:2;a,b",
$0:function(){return this.a.aw(this.b,"<subject> go<es> wide",!0)}},kc:{"^":"a:2;a,b",
$0:function(){return this.a.b.aw(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kd:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},ke:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},kf:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,S,{"^":"",
dk:function(a,b){var z=new S.dj(null,null,null,null,null)
new S.tK(a,b).$1(z)
return z.n()},
f_:{"^":"a_;",
gaE:function(){return[G.ue(),G.uf(),V.ug()]},
gbb:function(){return[$.$get$dO()]},
gh:function(){return"CounterAttackSituation"},
ap:function(){var z=new S.dj(null,null,null,null,null)
z.l(this)
new S.k8().$1(z)
return z.n()},
ax:function(a,b){if(a===0)return b.a1(this.a)
return},
aA:function(a,b){return new H.N(a,new S.k9(this),[H.m(a,0)])}},
tK:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gb_().c=z
a.gb_().e=0
z=this.a.gi()
a.gb_().b=z
z=this.b.gi()
a.gb_().d=z
return a}},
k8:{"^":"a:0;",
$1:function(a){var z=a.gb_().e
if(typeof z!=="number")return z.a6()
a.gb_().e=z+1
return a}},
k9:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pQ:{"^":"f_;a,i:b<,c,M:d<",
X:function(a){var z=new S.dj(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f_))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dj:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb_().c},
gM:function(){return this.gb_().e},
gb_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb_().b
x=this.gb_().c
w=this.gb_().d
v=this.gb_().e
z=new S.pQ(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,X,{"^":"",
co:function(a,b,c){var z,y,x
z=b.af("FightSituation")
y=z.gbx()
x=!J.e(c.gi(),100)
b.cV(z.gi(),z.X(new X.uS(c,x)))
if(c.gaj()===C.f){c.az(a,"<subject> stop<s> moving",!0)
a.W(0,"\n\n",!0)
return}switch($.$get$hR().ad(3)){case 0:c.cj(a,"<subject> collapse<s>"+(x?", dead":""),!0,!0)
break
case 1:c.az(a,"<subject> fall<s> backward",!0)
c.az(a,"<subject> twist<s>",!0)
c.cj(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.az(a,"<subject> drop<s> to <subject's> knees",!0)
c.az(a,"<subject> keel<s> over",!0)
break}a.W(0,"\n\n",!0)},
uS:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!z.gb6()&&this.b)a.gbK().q(0,z.d)
return a}}}],["","",,O,{"^":"",c_:{"^":"o4;",
ax:function(a,b){if(a===0)return b.a1(this.gcl())
return},
aA:function(a,b){return new H.N(a,new O.kk(this),[H.m(a,0)])}},o4:{"^":"a_+n2;"},kk:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcG())||J.e(a.gi(),z.gcl())}}}],["","",,U,{"^":"",
eu:function(a){return a.af("FightSituation").gbx()},
cG:function(a,b,c,d,e){var z=new U.c0(null,null,null,null,null,null,null,null,null)
new U.rQ(a,b,c,d,e).$1(z)
return z.n()},
cF:{"^":"a_;",
gaE:function(){return[N.u1(),V.ui(),R.uR(),Y.v1(),T.vX(),T.vY(),M.vZ(),M.w_(),U.w0(),U.w1(),G.w2(),G.w3(),D.w6(),D.w7(),R.w4(),R.w5(),M.wb()]},
gbb:function(){return H.o([$.$get$fK(),$.$get$h1(),$.$get$fO(),$.$get$hx()],[Q.aa])},
geL:function(){return 1000},
gh:function(){return"FightSituation"},
cH:function(a,b){var z=b.a
return(z&&C.a).bS(z,new U.l6(a))},
ap:function(){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.l(this)
new U.l7().$1(z)
return z.n()},
ax:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i_(this.f,this.b)
y=H.bB(z,new U.l8(b),H.z(z,"w",0),null)
x=H.z(y,"w",0)
w=P.U(new H.N(y,new U.l9(),[x]),!1,x)
x=H.m(w,0)
v=P.U(new H.N(w,new U.la(),[x]),!1,x)
u=v.length===1?C.a.gc5(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.bd(0,new U.lb(q),new U.lc())
o=p==null?p:p.gM()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.bd(0,new U.ld(q),new U.le())
k=l==null?l:l.gM()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gF()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aA:function(a,b){return new H.N(a,new U.lf(this),[H.m(a,0)])},
h7:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a9(z))y.j(0,z).$2(a,b)},
dA:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cH(a,this.b)&&this.cH(a,this.f)){y=a.eW(z)
a.cV(y.gi(),y.X(new U.lg()))
for(z=this.f,x=z.a,x=new J.bc(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.u();){v=x.d
if(a.a1(v).gaW()){u=a.a1(v)
t=u.X(new U.lh())
w.ab(0,u)
w.q(0,t)}}C.a.q(a.f,X.mk(z,this.d,this.a,null))}else this.cH(a,this.f)},
d9:function(a){var z=this.f
if(this.cH(a,z))if(this.cH(a,this.b)){z=z.a
z=(z&&C.a).bS(z,new U.li(a))}else z=!1
else z=!1
return z}},
rQ:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$Z().ad(1073741823)
a.gal().f=z
a.gal().y=0
z=a.gal()
y=z.r
if(y==null){y=new S.R(null,null,[P.u])
y.ag()
y.l(C.d)
z.r=y
z=y}else z=y
z.l(J.eL(this.a,new U.rr()))
z=a.gal()
y=z.c
if(y==null){y=new S.R(null,null,[P.u])
y.ag()
y.l(C.d)
z.c=y
z=y}else z=y
y=this.b
z.l(new H.ap(y,new U.rs(),[H.m(y,0),null]))
a.gal().e=this.c
y=new S.R(null,null,[U.as])
y.ag()
y.l(C.d)
a.gal().b=y
y=this.d.gi()
a.gal().x=y
y=new A.cL(null,null,[P.u,{func:1,v:true,args:[A.a9,Y.a3]}])
y.c8()
y.l(this.e)
a.gal().d=y
return a}},
rr:{"^":"a:0;",
$1:function(a){return a.gi()}},
rs:{"^":"a:0;",
$1:function(a){return a.gi()}},
l6:{"^":"a:0;a",
$1:function(a){return this.a.a1(a).gaW()}},
l7:{"^":"a:0;",
$1:function(a){var z=a.gal().y
if(typeof z!=="number")return z.a6()
a.gal().y=z+1
return a}},
l8:{"^":"a:0;a",
$1:function(a){return this.a.a1(a)}},
l9:{"^":"a:0;",
$1:function(a){return a.gaW()}},
la:{"^":"a:0;",
$1:function(a){return a.gF()}},
lb:{"^":"a:0;a",
$1:function(a){return J.e(a.gcT(),this.a.gi())&&a.ght()===!0}},
lc:{"^":"a:2;",
$0:function(){return}},
ld:{"^":"a:0;a",
$1:function(a){return J.e(a.gcT(),this.a.gi())}},
le:{"^":"a:2;",
$0:function(){return}},
lf:{"^":"a:25;a",
$1:function(a){var z,y,x
if(a.gaW()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a4(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a4(z,y)
z=y}else z=!0}else z=!1
return z}},
lg:{"^":"a:0;",
$1:function(a){a.skm(!1)
return a}},
lh:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}},
li:{"^":"a:29;a",
$1:function(a){var z=this.a.a1(a)
return z.gF()===!0&&z.gaW()}},
pS:{"^":"cF;bK:a<,b,c,bx:d<,i:e<,dC:f<,r,M:x<",
X:function(a){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
c0:{"^":"d;a,b,c,d,e,f,r,x,y",
gbK:function(){var z,y
z=this.gal()
y=z.b
if(y==null){y=new S.R(null,null,[U.as])
y.ag()
y.l(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gal().e},
gi:function(){return this.gal().f},
gdC:function(){var z,y
z=this.gal()
y=z.r
if(y==null){y=new S.R(null,null,[P.u])
y.ag()
y.l(C.d)
z.r=y
z=y}else z=y
return z},
gM:function(){return this.gal().y},
gal:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.R(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.R(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cL(null,null,[H.m(z,0),H.m(z,1)])
y.c8()
y.l(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.R(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gal()
x=y.b
if(x==null){x=new S.R(null,null,[U.as])
x.ag()
x.l(C.d)
y.b=x
y=x}else y=x
y=y.n()
x=this.gal()
w=x.c
if(w==null){w=new S.R(null,null,[P.u])
w.ag()
w.l(C.d)
x.c=w
x=w}else x=w
x=x.n()
w=this.gal()
v=w.d
if(v==null){v=new A.cL(null,null,[P.u,{func:1,v:true,args:[A.a9,Y.a3]}])
v.c8()
v.l(C.Z)
w.d=v
w=v}else w=v
w=w.n()
v=this.gal().e
u=this.gal().f
t=this.gal()
s=t.r
if(s==null){s=new S.R(null,null,[P.u])
s.ag()
s.l(C.d)
t.r=s
t=s}else t=s
t=t.n()
s=this.gal().x
r=this.gal().y
z=new U.pS(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,R,{"^":"",ll:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishLeap"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.Y(z.gi(),new R.lm())
b.Y(a.gi(),new R.ln())
y=b.af("LeapSituation").gi()
x=U.eu(b)
a.ck(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.j5(0,"both "+(a.gF()===!0||z.gF()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gai()
if(typeof w!=="number")return w.b8()
if(w>1){c.j6(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.az(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.Y(z.x,new R.lo())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
A:{
wt:[function(a){return new R.ll(null,!0,!0,!0,C.c,a,null)},"$1","uq",2,0,5]}},lm:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},ln:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},lo:{"^":"a:0;",
$1:function(a){var z=a.gai()
if(typeof z!=="number")return z.as()
a.sai(z-1)
return a}}}],["","",,S,{"^":"",kw:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gan:function(){return"will <subject> dodge?"},
R:[function(a,b,c){var z=b.af("LeapSituation").gi()
a.hf(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaO())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.ag(new S.kx(a,c,z),new S.ky(a,c,z),null,null)
b.ar()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x
z=b.af("LeapSituation").gi()
y=U.eu(b)
x=this.b
a.ck(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.az(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Y(x.gi(),new S.kz())
b.bq("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gO",6,0,1],
I:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga5()?0.2:0
if(a.Q===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbr().bp(0.5-z+y)},
H:function(a,b){return!a.ga5()},
A:{
wo:[function(a){return new S.kw("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","uj",2,0,5]}},kx:{"^":"a:2;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},ky:{"^":"a:2;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kz:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,D,{"^":"",lD:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gan:function(){return"will <subject> impale <objectPronoun>?"},
R:[function(a,b,c){var z,y
z=b.af("LeapSituation").gi()
y=this.b
a.eO(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ae(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaO())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.ag(new D.lE(a,c,z),new D.lF(a,c,z),null,null)
b.ar()
return H.b(a.cy)+" fails to impale "+H.b(y.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x
z=b.af("LeapSituation").gi()
y=this.b
a.ck(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ae(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.az(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gai()
if(typeof x!=="number")return x.b8()
if(x>1){a.ga0().ao(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.az(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
y.ak(c,"<subject> fall<s> to the ground")
b.Y(y.x,new D.lG())}else{a.ga0().ao(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.az(c,"<subject> go<es> down",!0)
X.co(c,b,y)
b.Y(y.x,new D.lH())}b.bq("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.cy)},"$3","gO",6,0,1],
I:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga5()?0.2:0
if(a.Q===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbr().bp(0.4-z+y)},
H:function(a,b){return!a.ga5()&&a.d.geG()},
A:{
wx:[function(a){return new D.lD("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","uJ",2,0,5]}},lE:{"^":"a:2;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lF:{"^":"a:2;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lG:{"^":"a:0;",
$1:function(a){var z=a.gai()
if(typeof z!=="number")return z.as()
a.sai(z-1)
a.saj(C.f)
return a}},lH:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}}}],["","",,V,{"^":"",
dA:function(a,b,c){var z=new V.dz(null,null,null,null,null,null)
new V.tQ(a,b,c).$1(z)
return z.n()},
fi:{"^":"c_;",
gaE:function(){return[S.uj(),D.uJ()]},
gh:function(){return"LeapDefenseSituation"},
ap:function(){var z=new V.dz(null,null,null,null,null,null)
z.l(this)
new V.m8().$1(z)
return z.n()}},
tQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gi()
a.gaH().b=z
z=this.b.gi()
a.gaH().e=z
a.gaH().d=this.c
return a}},
m8:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.a6()
a.gaH().f=z+1
return a}},
pU:{"^":"fi;cG:a<,i:b<,cg:c<,cl:d<,M:e<",
X:function(a){var z=new V.dz(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fi))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dz:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaH().c},
gM:function(){return this.gaH().f},
gaH:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaH().b
x=this.gaH().c
w=this.gaH().d
v=this.gaH().e
u=this.gaH().f
z=new V.pU(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,F,{"^":"",
fk:function(a,b){var z=new F.dB(null,null,null,null,null)
new F.tS(a,b).$1(z)
return z.n()},
fj:{"^":"a_;",
gaE:function(){return[R.uq()]},
gh:function(){return"LeapSituation"},
ap:function(){var z=new F.dB(null,null,null,null,null)
z.l(this)
new F.m9().$1(z)
return z.n()},
ax:function(a,b){if(a===0)return b.a1(this.a)
return},
aA:function(a,b){return new H.N(a,new F.ma(this),[H.m(a,0)])}},
tS:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gb0().c=z
a.gb0().e=0
z=this.a.gi()
a.gb0().b=z
z=this.b.gi()
a.gb0().d=z
return a}},
m9:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.a6()
a.gb0().e=z+1
return a}},
ma:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pV:{"^":"fj;a,i:b<,c,M:d<",
X:function(a){var z=new F.dB(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fj))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dB:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb0().c},
gM:function(){return this.gb0().e},
gb0:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb0().b
x=this.gb0().c
w=this.gb0().d
v=this.gb0().e
z=new F.pV(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",jE:{"^":"aa;K:b<,a2:c<,P:d<,L:e<,a",
gT:function(){return""},
gJ:function(){return},
gh:function(){return"AutoLoot"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b.af("LootSituation")
y=b.a1(100)
if(y.gca()===!0&&!y.gbm()){a.ao(c,"<subject> kneel<s> next to <object>",y)
a.ao(c,"<subject> help<s> <object> to <object's> feet",y)
y.dF(c,'"I\'ll live," <subject> say<s>.',!0)
b.Y(100,new Z.jM())}x=[]
for(w=z.gbK(),w=w.gZ(w),v=b.a,u=null;w.u();){t=w.d
if(t instanceof L.b6){s=t.gco()
r=t.gcZ()
q=t.gbD()?1:0
p=a.ga0().gac()
if(typeof p!=="number")return H.x(p)
p=2+s+r+q>p
s=p}else s=!1
if(s){o=b.a1(a.gi())
n=o.X(new Z.jN(a,t))
v.ab(0,o)
v.q(0,n)
u=t}else{o=b.a1(a.gi())
n=o.X(new Z.jO(t))
v.ab(0,o)
v.q(0,n)
x.push(t)}}if(u!=null){a.ao(c,"<subject> pick<s> up <object>",u)
a.ao(c,"<subject> wield<s> <object>",u)}this.im(x,a,z,b,c)
if(x.length!==0)c.jd("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gO",6,0,1],
a7:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){return a.gF()},
im:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=L.b6
y=P.U(new H.N(a,new Z.jF(),[H.m(a,0)]),!0,z)
x=b.gbX()
x.toString
C.a.at(y,H.uT(new H.N(x,new Z.jG(),[H.m(x,0)]),"$isw"))
if(y.length===0)return
C.a.cp(y,new Z.jH())
w=c.gdC().aP(0,new Z.jI(d)).dW(0,new Z.jJ())
for(z=J.an(w.a),x=new H.cf(z,w.b,[H.m(w,0)]),v=d.a;x.u();){u=z.gG()
if(y.length===0)break
t=C.a.ky(y)
s=d.a1(u.gi())
r=s.X(new Z.jK(t))
v.ab(0,s)
v.q(0,r)
C.a.ab(a,t)
s=d.a1(b.gi())
r=s.X(new Z.jL(t))
v.ab(0,s)
v.q(0,r)
b.ao(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jM:{"^":"a:0;",
$1:function(a){a.saj(C.i)
a.sai(1)
return a}},jN:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.ga0() instanceof K.c1))a.gbX().q(0,z.ga0())
a.sa0(this.b)}},jO:{"^":"a:0;a",
$1:function(a){a.gbX().q(0,this.a)
return a}},jF:{"^":"a:0;",
$1:function(a){return a instanceof L.b6}},jG:{"^":"a:0;",
$1:function(a){return a instanceof L.b6}},jH:{"^":"a:7;",
$2:function(a,b){return J.bW(a.gac(),b.gac())}},jI:{"^":"a:0;a",
$1:function(a){return this.a.a1(a)}},jJ:{"^":"a:0;",
$1:function(a){return a.gaW()&&a.gb6()}},jK:{"^":"a:0;a",
$1:function(a){a.sa0(this.a)
return a}},jL:{"^":"a:0;a",
$1:function(a){a.gbX().ab(0,this.a)
return a}}}],["","",,X,{"^":"",
mk:function(a,b,c,d){var z=new X.dF(null,null,null,null,null,null)
new X.tI(a,b,c).$1(z)
return z.n()},
fp:{"^":"a_;",
gbb:function(){return H.o([$.$get$eQ()],[Q.aa])},
gh:function(){return"LootSituation"},
ap:function(){var z=new X.dF(null,null,null,null,null,null)
z.l(this)
new X.mm().$1(z)
return z.n()},
ax:function(a,b){if(typeof a!=="number")return a.b8()
if(a>0)return
return this.fi(b.a)},
aA:function(a,b){return[this.fi(a)]},
d9:function(a){return!0},
fi:function(a){return a.dv(0,new X.ml())}},
tI:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gav().e=z
a.gav().f=0
a.gav().c=this.b
z=new S.R(null,null,[P.u])
z.ag()
z.l(this.a)
a.gav().d=z
z=new S.R(null,null,[U.as])
z.ag()
z.l(this.c)
a.gav().b=z
return a}},
mm:{"^":"a:0;",
$1:function(a){var z=a.gav().f
if(typeof z!=="number")return z.a6()
a.gav().f=z+1
return a}},
ml:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaW()}},
pW:{"^":"fp;bK:a<,bx:b<,dC:c<,i:d<,M:e<",
X:function(a){var z=new X.dF(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fp))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dF:{"^":"d;a,b,c,d,e,f",
gbK:function(){var z,y
z=this.gav()
y=z.b
if(y==null){y=new S.R(null,null,[U.as])
y.ag()
y.l(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gav().c},
gdC:function(){var z,y
z=this.gav()
y=z.d
if(y==null){y=new S.R(null,null,[P.u])
y.ag()
y.l(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gav().e},
gM:function(){return this.gav().f},
gav:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.R(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.R(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gav()
x=y.b
if(x==null){x=new S.R(null,null,[U.as])
x.ag()
x.l(C.d)
y.b=x
y=x}else y=x
y=y.n()
x=this.gav().c
w=this.gav()
v=w.d
if(v==null){v=new S.R(null,null,[P.u])
v.ag()
v.l(C.d)
w.d=v
w=v}else w=v
w=w.n()
v=this.gav().e
u=this.gav().f
z=new X.pW(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",mA:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gan:function(){return"will <subject> hit <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to stab <object>",z)
a.aw(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
b.Y(z.gi(),new A.mB(a))
if(b.a1(z.gi()).gbm()){a.bs(c,"<subject> thrust<s> {|"+H.b(U.ae(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.az(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bs(c,"<subject> {stab<s>|run<s> "+H.b(U.ae(a))+" through} <object>",z,!0)
X.co(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){if(a.gF()===!0)return 0.6
return 0.5},
H:function(a,b){return a.gaa()&&this.b.gaO()&&a.d.geG()},
A:{
wC:[function(a){return new A.mA("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uX",2,0,5]}},mB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gai()
y=this.a.ga0().gcZ()
if(typeof z!=="number")return z.as()
a.sai(z-y)
return a}}}],["","",,U,{"^":"",
mw:function(a,b){var z=new U.dI(null,null,null,null,null)
new U.tV(a,b).$1(z)
return z.n()},
fv:{"^":"a_;",
gaE:function(){return H.o([A.uX()],[{func:1,ret:Q.E,args:[R.H]}])},
gbb:function(){return[$.$get$dO()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ap:function(){var z=new U.dI(null,null,null,null,null)
z.l(this)
new U.mx().$1(z)
return z.n()},
ax:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b8()
if(a>0)return
z=b.a1(this.a)
y=b.a
x=H.m(y,0)
w=P.U(new H.N(y,new U.my(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geA(w)
if(v.gaa()&&z.gaO()&&v.d.geG())return v
return},
aA:function(a,b){return new H.N(a,new U.mz(b,b.a1(this.a)),[H.m(a,0)])}},
tV:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gb1().d=z
a.gb1().e=0
z=this.a.gi()
a.gb1().b=z
z=this.b
z=z==null?z:z.gi()
a.gb1().c=z
return a}},
mx:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.a6()
a.gb1().e=z+1
return a}},
my:{"^":"a:25;a,b,c",
$1:function(a){var z,y
if(a.gaW())if(a.eC(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mz:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eC(z,this.a)}},
pX:{"^":"fv;a,b,i:c<,M:d<",
X:function(a){var z=new U.dI(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fv))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dI:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb1().d},
gM:function(){return this.gb1().e},
gb1:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb1().b
x=this.gb1().c
w=this.gb1().d
v=this.gb1().e
z=new U.pX(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",lp:{"^":"E;J:c<,K:d<,a2:e<,P:f<,b,a",
gam:function(){return""},
gh:function(){return"FinishPunch"},
gL:function(){return},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gaa()?C.i:C.f
x=b.af("PunchSituation").gi()
w=b.af("FightSituation").gbx()
b.Y(z.x,new O.lq(y))
switch(y){case C.k:throw H.c(new P.y("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fG(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.az(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fG(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gO",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
A:{
wu:[function(a){return new O.lp(null,!0,!0,!1,a,null)},"$1","ur",2,0,5]}},lq:{"^":"a:0;a",
$1:function(a){a.saj(this.a)
return a}}}],["","",,E,{"^":"",kA:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gan:function(){return"will <subject> dodge the fist?"},
R:[function(a,b,c){var z=b.af("PunchSituation").gi()
a.hf(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.ag(new E.kB(a,c,z),new E.kC(this,a,c,z),null,null)
b.ar()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
a.ck(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.af("PunchSituation").gi(),z,!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gbr().bp(0.4-z)},
H:function(a,b){return!0},
A:{
wp:[function(a){return new E.kA("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","uk",2,0,5]}},kB:{"^":"a:2;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kC:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kG(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dU:function(a,b,c){var z=new Z.dT(null,null,null,null,null,null)
new Z.tO(a,b,c).$1(z)
return z.n()},
fF:{"^":"c_;",
gaE:function(){return[E.uk()]},
gh:function(){return"PunchDefenseSituation"},
ap:function(){var z=new Z.dT(null,null,null,null,null,null)
z.l(this)
new Z.nc().$1(z)
return z.n()}},
tO:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
nc:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.a6()
a.gaJ().f=z+1
return a}},
q_:{"^":"fF;cG:a<,i:b<,cg:c<,cl:d<,M:e<",
X:function(a){var z=new Z.dT(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fF))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dT:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaJ().c},
gM:function(){return this.gaJ().f},
gaJ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaJ().b
x=this.gaJ().c
w=this.gaJ().d
v=this.gaJ().e
u=this.gaJ().f
z=new Z.q_(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",
fH:function(a,b){var z=new Q.dV(null,null,null,null,null)
new Q.tP(a,b).$1(z)
return z.n()},
fG:{"^":"a_;",
gaE:function(){return[O.ur()]},
gh:function(){return"PunchSituation"},
ap:function(){var z=new Q.dV(null,null,null,null,null)
z.l(this)
new Q.nd().$1(z)
return z.n()},
ax:function(a,b){if(a===0)return b.a1(this.a)
return},
aA:function(a,b){return new H.N(a,new Q.ne(this),[H.m(a,0)])}},
tP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
nd:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.a6()
a.gb2().e=z+1
return a}},
ne:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q0:{"^":"fG;a,i:b<,c,M:d<",
X:function(a){var z=new Q.dV(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fG))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dV:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb2().c},
gM:function(){return this.gb2().e},
gb2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb2().b
x=this.gb2().c
w=this.gb2().d
v=this.gb2().e
z=new Q.q0(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",lr:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishSlash"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.Y(z.gi(),new O.lu(a))
y=b.af("SlashSituation").gi()
x=!b.a1(z.gi()).gbm()&&!J.e(z.gi(),100)
if(!x){a.ck(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.az(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ck(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.co(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gO",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return a.ga0().gbe()},
A:{
ww:[function(a){return new O.lr(null,!0,!0,!0,C.c,a,null)},"$1","us",2,0,5]}},lu:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gai()
y=this.a.ga0().gco()
if(typeof z!=="number")return z.as()
a.sai(z-y)
return a}}}],["","",,X,{"^":"",kl:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gan:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ae(a))+"|fend it off}")
if(a.gaO())a.aw(c,"<subject> <is> out of balance",!0)
else S.ag(new X.km(a,c),new X.kn(this,a,c),null,null)
b.ar()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){if(a.gF()===!0)a.ak(c,"<subject> {step<s>|take<s> a step} back")
a.bY(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off}",!0)
if(!a.gaa()){b.Y(a.x,new X.ko())
if(a.Q===!0)a.ak(c,"<subject> regain<s> balance")}b.bq("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gO",6,0,1],
I:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gv(z):null
x=a.gaa()?0:0.2
return y.gbr().bp(0.5-x)},
H:function(a,b){return a.ga0().gcI()},
A:{
wm:[function(a){return new X.kl("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","uh",2,0,5]}},km:{"^":"a:2;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kn:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ko:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,F,{"^":"",kD:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"DodgeSlash"},
gam:function(){return"dodge and counter"},
gan:function(){return"will <subject> dodge?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaO())a.aw(c,"<subject> <is> out of balance",!0)
else S.ag(new F.kE(a,c),new F.kF(this,a,c),null,null)
b.ar()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gaa()){z.cj(c,"<subject> lose<s> balance because of that",!0,!0)
b.Y(z.x,new F.kG())}b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gO",6,0,1],
I:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gbr().bp(0.4-z)},
H:function(a,b){return!a.ga5()},
A:{
wq:[function(a){return new F.kD("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","ul",2,0,5]}},kE:{"^":"a:2;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kF:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kG:{"^":"a:0;",
$1:function(a){a.saj(C.i)
return C.i}}}],["","",,O,{"^":"",m0:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gam:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gan:function(){return"will <subject> avoid the slash?"},
R:[function(a,b,c){a.dF(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.ar()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z
a.bY(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.dn(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.ga0())
b.bq("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gO",6,0,1],
I:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gv(z):null
x=a.gaa()?0:0.2
return y.gbr().bp(0.5-x)},
H:function(a,b){return a.gb6()},
A:{
wA:[function(a){return new O.m0("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uQ",2,0,5]}}}],["","",,G,{"^":"",mJ:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"ParrySlash"},
gam:function(){return"parry and counter"},
gan:function(){return"will <subject> parry?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ae(a))+"|fend it off}")
if(a.gaO())a.aw(c,"<subject> <is> out of balance",!0)
else S.ag(new G.mK(a,c),new G.mL(this,a,c),null,null)
b.ar()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
if(z.gaO()){c.j7(0,"<subject> <is> out of balance",!0,!0,z)
c.dn(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iM())
a.bY(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off easily}",!0)}else a.bY(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off}",!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gO",6,0,1],
I:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gaO()?0.3:0
if(a.Q===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbr().bp(0.3-z+y)},
H:function(a,b){return a.ga0().gcI()},
A:{
wE:[function(a){return new G.mJ("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uZ",2,0,5]}},mK:{"^":"a:2;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mL:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bm:function(a,b,c){var z=new L.dZ(null,null,null,null,null,null)
new L.tJ(a,b,c).$1(z)
return z.n()},
fS:{"^":"c_;",
gaE:function(){return[F.ul(),G.uZ(),X.uh(),O.uQ()]},
gh:function(){return"SlashDefenseSituation"},
ap:function(){var z=new L.dZ(null,null,null,null,null,null)
z.l(this)
new L.o7().$1(z)
return z.n()}},
tJ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
o7:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.a6()
a.gaK().f=z+1
return a}},
q2:{"^":"fS;cG:a<,i:b<,cg:c<,cl:d<,M:e<",
X:function(a){var z=new L.dZ(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fS))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dZ:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaK().c},
gM:function(){return this.gaK().f},
gaK:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaK().b
x=this.gaK().c
w=this.gaK().d
v=this.gaK().e
u=this.gaK().f
z=new L.q2(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,M,{"^":"",
bH:function(a,b){var z=new M.e_(null,null,null,null,null)
new M.tL(a,b).$1(z)
return z.n()},
fT:{"^":"a_;",
gaE:function(){return[O.us()]},
gh:function(){return"SlashSituation"},
ap:function(){var z=new M.e_(null,null,null,null,null)
z.l(this)
new M.o8().$1(z)
return z.n()},
ax:function(a,b){if(a===0)return b.a1(this.a)
return},
aA:function(a,b){return new H.N(a,new M.o9(this),[H.m(a,0)])}},
tL:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gb3().c=z
a.gb3().e=0
z=this.a.gi()
a.gb3().b=z
z=this.b.gi()
a.gb3().d=z
return a}},
o8:{"^":"a:0;",
$1:function(a){var z=a.gb3().e
if(typeof z!=="number")return z.a6()
a.gb3().e=z+1
return a}},
o9:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q3:{"^":"fT;a,i:b<,c,M:d<",
X:function(a){var z=new M.e_(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fT))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e_:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb3().c},
gM:function(){return this.gb3().e},
gb3:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb3().b
x=this.gb3().c
w=this.gb3().d
v=this.gb3().e
z=new M.q3(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",ls:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z=this.b
b.Y(z.gi(),new Q.lt())
c.fF(0,"<subject> {cuts|slashes|slits} <object's> "+(J.e(z.gi(),100)?"side":"{throat|neck|side}"),z,a.ga0())
X.co(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gO",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return this.b.ga5()&&a.ga0().gbe()},
A:{
wv:[function(a){return new Q.ls(null,!0,!0,!0,C.c,a,null)},"$1","ut",2,0,5]}},lt:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}}}],["","",,K,{"^":"",mD:{"^":"E;K:c<,a2:d<,P:e<,L:f<,J:r<,b,a",
gh:function(){return"OnGroundParry"},
gam:function(){return"parry it"},
gan:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ae(a))+"}}")
S.ag(new K.mE(a,c),new K.mF(this,a,c),null,null)
b.ar()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,1],
S:[function(a,b,c){a.bY(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ae(a))+"}",!0)
b.bq("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gO",6,0,1],
I:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gv(z):null).gbr().bp(0.3)},
H:function(a,b){return a.ga0().gcI()},
A:{
wD:[function(a){return new K.mD(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","uY",2,0,5]}},mE:{"^":"a:2;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mF:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nq:{"^":"E;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"RollOutOfWay"},
gam:function(){return"roll out of way"},
gan:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to roll out of the way")
a.aw(c,"<subject> can't",!0)
b.ar()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gN",6,0,1],
S:[function(a,b,c){a.kD(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gF()===!0){b.Y(a.gi(),new Y.nr())
a.bY(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bq("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gO",6,0,1],
I:function(a,b){var z
if(a.gF()===!0)return 1
z=b.f
return(z.length!==0?C.a.gv(z):null).gbr().bp(0.5)},
H:function(a,b){return!0},
A:{
wK:[function(a){return new Y.nq(null,!1,!1,!0,C.c,a,null)},"$1","v4",2,0,5]}},nr:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,V,{"^":"",
dK:function(a,b,c){var z=new V.dJ(null,null,null,null,null,null)
new V.tM(a,b,c).$1(z)
return z.n()},
fw:{"^":"c_;",
gaE:function(){return[K.uY(),Y.v4()]},
gh:function(){return"OnGroundDefenseSituation"},
ap:function(){var z=new V.dJ(null,null,null,null,null,null)
z.l(this)
new V.mC().$1(z)
return z.n()}},
tM:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
mC:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.a6()
a.gaI().f=z+1
return a}},
pY:{"^":"fw;cG:a<,i:b<,cg:c<,cl:d<,M:e<",
X:function(a){var z=new V.dJ(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fw))return!1
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
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dJ:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaI().c},
gM:function(){return this.gaI().f},
gaI:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaI().b
x=this.gaI().c
w=this.gaI().d
v=this.gaI().e
u=this.gaI().f
z=new V.pY(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,D,{"^":"",
h4:function(a,b){var z=new D.e1(null,null,null,null,null)
new D.tN(a,b).$1(z)
return z.n()},
h3:{"^":"a_;",
gaE:function(){return[Q.ut()]},
gh:function(){return"StrikeDownSituation"},
ap:function(){var z=new D.e1(null,null,null,null,null)
z.l(this)
new D.oY().$1(z)
return z.n()},
ax:function(a,b){if(a===0)return b.a1(this.a)
return},
aA:function(a,b){return new H.N(a,new D.oZ(this),[H.m(a,0)])}},
tN:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gb4().c=z
a.gb4().e=0
z=this.a.gi()
a.gb4().b=z
z=this.b.gi()
a.gb4().d=z
return a}},
oY:{"^":"a:0;",
$1:function(a){var z=a.gb4().e
if(typeof z!=="number")return z.a6()
a.gb4().e=z+1
return a}},
oZ:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q5:{"^":"h3;a,i:b<,c,M:d<",
X:function(a){var z=new D.e1(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.h3))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e1:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb4().c},
gM:function(){return this.gb4().e},
gb4:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb4().b
x=this.gb4().c
w=this.gb4().d
v=this.gb4().e
z=new D.q5(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",n2:{"^":"d;",
gbr:function(){switch(this.gcg()){case C.l:return C.a_
case C.m:return $.$get$fA()
case C.p:return $.$get$fB()
default:throw H.c(P.D(this.gcg()))}},
$isa_:1}}],["","",,K,{"^":"",dR:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",ob:{"^":"aa;K:b<,P:c<,a2:d<,L:e<,a",
gT:function(){return""},
gJ:function(){return},
gh:function(){return"SlayMonstersAction"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gv(z):null
x=b.dP(y.gbC())
w=b.a
C.a.q(z,x.jH(b,y,new H.N(w,new D.oc(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gO",6,0,1],
a7:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z=b.f
return H.K(z.length!==0?C.a.gv(z):null,"$isM").c}},oc:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaW()){z=a.gbf()
y=this.a.gbf()
z=z.a
y=y.gi()
if(z==null?y==null:z===y){z=a.gbC()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",p4:{"^":"cE;K:c<,a2:d<,P:e<,L:f<,b,a",
gJ:function(){return},
gh:function(){return"TakeExitAction"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,1],
S:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaN())
y=b.f
H.K(y.length!==0?C.a.gv(y):null,"$isM").bo(b,a,z.gjz(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gO",6,0,1],
a7:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z=b.f
if(H.K(z.length!==0?C.a.gv(z):null,"$isM").c===!0)return!1
this.b.gk6()
return!0},
A:{
wN:[function(a){return new Y.p4(!1,!0,!1,null,a,null)},"$1","wc",2,0,48]}}}],["","",,F,{"^":"",
fL:function(a,b){var z=new F.dX(null,null,null,null,null)
new F.ty(a,b).$1(z)
return z.n()},
M:{"^":"a_;",
gaE:function(){return[Y.wc()]},
gbb:function(){var z=[]
C.a.at(z,$.$get$hY())
z.push($.$get$fV())
return z},
geL:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ap:function(){var z=new F.dX(null,null,null,null,null)
z.l(this)
new F.ns().$1(z)
return z.n()},
ax:function(a,b){return b.a.bd(0,new F.nt(),new F.nu())},
aA:function(a,b){var z=this.ax(null,b)
if(z==null)return[]
return[z]},
bo:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dP(c)
a.cV(this.b,F.fL(z,z.gjG()!=null))
if(this.i6(a,b,z))z.d.$3(b,a,d)
else{d.es()
z.c.$3(b,a,d)
d.W(0,"\n\n",!0)}for(y=R.ij(b,a),y=P.U(y,!0,H.z(y,"w",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.a1(y[v].gi())
t=u.X(new F.nv(z))
w.ab(0,u)
w.q(0,t)}},
h6:function(a,b){a.a.ir(new F.nw(),!0)},
d9:function(a){if(J.e(this.a,$.$get$es().b))return!1
return!0},
i6:function(a,b,c){var z,y,x
for(z=a.d,z=new P.ef(z,z.c,z.d,z.b,null,[H.m(z,0)]),y=c.b;z.u();){x=z.e
if(!J.e(x.gcT(),b.gi()))continue
if(x.gep()!=="TakeExitAction")continue
if(J.eI(x.gaN(),y)===!0)return!0}return!1}},
ty:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.gaD().c=z
a.gaD().e=0
z=this.a.gh()
a.gaD().b=z
a.gaD().d=this.b
return a}},
ns:{"^":"a:0;",
$1:function(a){var z=a.gaD().e
if(typeof z!=="number")return z.a6()
a.gaD().e=z+1
return a}},
nt:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaW()}},
nu:{"^":"a:2;",
$0:function(){return}},
nv:{"^":"a:0;a",
$1:function(a){a.sbC(this.a.b)
return a}},
nw:{"^":"a:0;",
$1:function(a){return!a.gbm()}},
q1:{"^":"M;bC:a<,i:b<,c,M:d<",
X:function(a){var z=new F.dX(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.M))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dX:{"^":"d;a,b,c,d,e",
gbC:function(){return this.gaD().b},
sbC:function(a){this.gaD().b=a
return a},
gi:function(){return this.gaD().c},
skm:function(a){this.gaD().d=a
return a},
gM:function(){return this.gaD().e},
gaD:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaD().b
x=this.gaD().c
w=this.gaD().d
v=this.gaD().e
z=new F.q1(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",
x0:[function(a,b,c){var z,y
z=R.aZ(6666,"Agruth",null,null,null,null,0,2,100,!1,2,!0,C.q,0,$.$get$bS())
y=z.x
a.geq().q(0,z)
return U.cG(c,[z],"{rock|cavern} floor",b,P.ab([1,new O.uv(y),5,new O.uw(y),9,new O.ux(y),12,new O.uy(y),17,new O.uz(y)]))},"$3","wg",6,0,11],
x1:[function(a,b,c){var z=[O.el(),O.hP()]
a.geq().at(0,z)
return U.cG(c,z,"{rock|cavern} floor",b,P.aD())},"$3","iU",6,0,11],
x2:[function(a,b,c){var z,y,x
z=a.bA("talk_to_briana_3")?"guardian":"orc"
y=R.aZ(6667,z,null,null,new G.b5("rusty sword",1,1,!1,!0,!1,P.bg(C.o,null)),null,0,3,100,!1,3,!1,C.q,0,$.$get$bS())
x=y.x
a.a.q(0,y)
return U.cG(c,[y],"{rock|cavern} floor",b,P.ab([1,new O.uB(x),9,new O.uC(x)]))},"$3","wh",6,0,11],
x3:[function(a,b,c){var z=a.fD("take_out_gate_guards")||a.fD("take_out_gate_guards_rescue")?[O.el()]:[O.el(),O.hP()]
a.a.at(0,z)
return U.cG(c,z,"ground",b,P.aD())},"$3","wi",6,0,11],
az:function(a){return a.geq().aB(0,new O.uE())},
uG:function(a,b){a.Y(O.az(a).gi(),new O.uH(b))},
ey:function(a){var z=a.f
if(H.K(z.length!==0?C.a.gv(z):null,"$isM").c===!0)return!1
return C.a.a4(C.Y,H.K(z.length!==0?C.a.gv(z):null,"$isM").a)},
iy:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gZ(z),x=new H.cf(y,new O.uU(),[H.m(z,0)]);x.u();){w=y.gG()
if(!w.gb6()){v=H.K(w.d,"$isb5")
y=b
x=v.c
u=v.d
v.r
t=P.U(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.a1(w.x)
r=s.X(new O.uV(new G.b5(y,x,u,!0,!0,!1,t)))
z.ab(0,s)
z.q(0,r)
break}}},
hP:function(){return R.aZ(1000+$.$get$em().ad(999999),"goblin",O.d8(),null,new G.b5("scimitar",1,1,!1,!0,!1,P.bg(C.o,null)),null,0,1,0,!1,1,!1,C.q,0,$.$get$bS())},
el:function(){return R.aZ(1000+$.$get$em().ad(999999),"orc",O.d8(),null,new G.b5("sword",1,1,!1,!0,!1,P.bg(C.o,null)),null,0,2,0,!1,2,!1,C.q,0,$.$get$bS())},
uv:{"^":"a:7;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.a1(z)
x=new G.b5("scimitar",1,1,!1,!0,!1,P.bg(C.o,null))
y.ak(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ao(b,"<subject> draw<s> <subject's> <object>",x)
a.Y(z,new O.uu(x))
y.hi(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.az(a),!0)}},
uu:{"^":"a:0;a",
$1:function(a){a.sa0(this.a)
return a}},
uw:{"^":"a:7;a",
$2:function(a,b){a.a1(this.a).ak(b,"<subject> spit<s> on the cavern floor")}},
ux:{"^":"a:7;a",
$2:function(a,b){var z=a.a1(this.a)
b.es()
z.dF(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.W(0,"\n\n",!0)}},
uy:{"^":"a:7;a",
$2:function(a,b){var z=a.a1(this.a)
z.ak(b,"<subject> grit<s> <subject's> teeth")
z.aw(b,"<subject> do<es>n't talk any more",!0)}},
uz:{"^":"a:7;a",
$2:function(a,b){a.a1(this.a).ak(b,"<subject> scowl<s> with pure hatred")}},
uB:{"^":"a:7;a",
$2:function(a,b){a.a1(this.a).hi(b,'"Good good good," <subject> whispers<s>, eyeing <object>.',O.az(a),!0)}},
uC:{"^":"a:7;a",
$2:function(a,b){var z=a.a1(this.a)
b.es()
z.dF(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.W(0,"\n\n",!0)}},
uE:{"^":"a:0;",
$1:function(a){return a.gF()}},
uH:{"^":"a:0;a",
$1:function(a){var z=a.gaT()
if(typeof z!=="number")return z.a6()
a.saT(z+this.a)
return a}},
uU:{"^":"a:0;",
$1:function(a){return J.e(a.gbf(),$.$get$ez())}},
uV:{"^":"a:0;a",
$1:function(a){a.sa0(this.a)
return a}}}],["","",,V,{"^":"",
lw:function(){var z=new V.dq(null,null,null)
new V.tZ().$1(z)
return z.n()},
p7:function(){var z=new V.e2(null,null,null)
new V.tY().$1(z)
return z.n()},
pm:function(){var z=new V.e3(null,null,null)
new V.tX().$1(z)
return z.n()},
og:function(){var z=new V.e0(null,null,null)
new V.tW().$1(z)
return z.n()},
tw:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"",!0)}},
tx:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
tt:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
tu:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The corpse lies still, getting cold.\n",!0)}},
o1:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"cave_with_agruth"))return!1
if(b.bA(this.d))return!1
return!0},
S:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
O.uG(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gK:function(){return!1}},
tr:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n"We must stop this." \n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection."\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. You know  I survived 3 years even though  none other made it for more than a few months. I think he wants me for something."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not giving it to him. Giving him the exact opposite of what he wants."\n\n\nWith that, you sheathe (weapon) and start down the road towards the black fort in the distance.\n',!0)}},
ts:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
tp:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The crevice is small.\n",!0)}},
tq:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
tn:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
to:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"TODO: either sleeping goblin or not\n",!0)}},
lv:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"guardpost_above_church"))return!1
if(b.d_(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.q(0,"TODO - take without waking the guard")
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gO",6,0,1],
R:[function(a,b,c){c.q(0,"TODO - start taking, guard is beginning to wake. You have to stay in an uncomfortable position for a minute before continuing")
C.a.q(b.f,V.lw())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gN",6,0,1],
I:function(a,b){return 0.8},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"TODO"},
gK:function(){return!1}},
f5:{"^":"a_;",
gbb:function(){return[new A.b4(new V.ly(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat.","guardpost_above_church_take_shield_rescue",!0,null),new A.b4(new V.lz(),"Snag the shield","TODO","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ap:function(){var z=new V.dq(null,null,null)
z.l(this)
new V.lA().$1(z)
return z.n()},
ax:function(a,b){if(a!==0)return
return b.a.aB(0,new V.lB())},
aA:function(a,b){return[a.aB(0,new V.lC())]}},
tZ:{"^":"a:0;",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.ga_().b=z
a.ga_().c=0
return a}},
ly:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"TODO - staying still, drops of sweat dripping on the guard, but ultimately the guard goes back to sleep and you take the shield")
b.Y(a.gi(),new V.lx())
b.ar()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lx:{"^":"a:0;",
$1:function(a){var z=a.gaT()
if(typeof z!=="number")return z.as()
a.saT(z-1)
return a}},
lz:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"TODO")
b.ar()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snag the shield)"}},
lA:{"^":"a:0;",
$1:function(a){var z=a.ga_().c
if(typeof z!=="number")return z.a6()
a.ga_().c=z+1
return a}},
lB:{"^":"a:0;",
$1:function(a){return a.gF()}},
lC:{"^":"a:0;",
$1:function(a){return a.gF()}},
tl:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\n\n\n"We should name that sword," Briana says, motioning to Agruth\'s scimitar. "It\'s the only thing we have going for us."\n',!0)}},
tm:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
mr:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"You're right. We'll call it Luck Bringer. It's our only chance to get out of this hell.\"\n\n\n\n\nBriana nods.")
O.iy(b,"Luck Bringer")
b.af("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ms:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"You're right. We'll call it Savior. It is our first step to freedom.\"\n\n\n\n\nBriana nods.")
O.iy(b,"Savior")
b.af("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mq:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"That's foolish. It's just a sword, after all.\"")
b.af("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ti:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
tj:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"There's a small door on the side here.\n",!0)}},
tg:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
th:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
p5:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"orcthorn_room"))return!1
if(b.bA("talk_to_briana_3"))if(!b.bA(this.d))z=H.K(z.length!==0?C.a.gv(z):null,"$isM").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
S:[function(a,b,c){c.q(0,'TODO - this must be it. the sword is held at the statue\'s back, uncharacteristic for an orc.\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."')
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
te:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"TODO\n",!0)}},
tf:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"TODO\n",!0)}},
oa:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"slave_quarters"))return!1
return!0},
S:[function(a,b,c){c.q(0,"TODO FIGHT")
b.ar()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
tc:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"It doesn't take long before you start hearing voices. Orcs shouting commands, mostly. \n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, two orcs turn a corner and start towards you.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the little door's embossed frame will provide enough cover before the two orcs turn again. \n\n\nBut at that time, something or someone smashes on the door from the inside. Then come angry growls and something akin to barking.\n\n\nThe door stays shut but the patrol is now looking directly at you, closing in with their swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
td:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The small door is TODO open/close.\n",!0)}},
ta:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These is the smelter.\n\n\nOrc teams tilt huge kettles of molten steel into troughs that lead the white-hot liquid across the room, into a large pool. From that pool, a single orc is distributing the forge-ready steel into troughs that lead to the war forges below. He's no more than a spear's throw away from you, but doesn't notice. In fact, he may well be blind. The other orcs are two far away and too busy to look around.\n\n\nA small crevice appears to be sucking the hot air. TODO describe  other exits\n",!0)}},
tb:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The reds and whites of the molten steel reflect in the heaps of coal.\n",!0)}},
t7:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
t8:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
ph:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){if(!(b.d_(this.d)==null&&O.ey(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."')
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pi:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){if(!(b.bA("talk_to_briana_1")&&b.d_(this.d)==null&&O.ey(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."')
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pj:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){if(!(b.bA("talk_to_briana_2")&&b.d_(this.d)==null&&O.ey(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it."\n\n\n"But they did."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and that sword is still with him. Hidden in some kind of a statue."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."')
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t5:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
t6:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
t3:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
t4:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
t1:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\nAfter a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
t2:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The Underground Church stands silent, as if holding breath.\n",!0)}},
l4:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church"))return!1
if(b.bA(this.d))return!1
return!0},
S:[function(a,b,c){c.q(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\nBriana: "So this is it? This is where the Dead Prince resides?"\n\n\n"Don\'t be a fool. This is one of many of these temples inside the mountain."\n\n\n"So where is he? Everyone knows he\'s from Mt. Bloodrock."\n\n\n"The Dead Prince is _somewhere_ here, that\'s correct. But where exactly? The orcs say the whole mountain is his vessel. Whatever that means."\n\n\nThe glow coming from the altar dims for a moment, then lights up again.')
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t_:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"TODO - altar, eight black eyes, spear that some orc must have forgotten here, there is motion behind the altar (wait)\n",!0)}},
t0:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The altar glows with a dim red light that reflect in the eight black eyes above it.\n",!0)}},
pC:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church_altar"))return!1
if(b.bA(this.d))return!1
return!0},
S:[function(a,b,c){c.q(0,'TODO - build up with sounds\n\n\nA lich orc enters from a steel door on the right of the altar and the whole temple sounds a tone that is powerful and sickening at the same time. With the lich, two huge creatures enter as well. It\'s unclear what they are, but perhaps some large breed of ogres. Their swords are as long as you are tall, but they don\'t wield them. Between the ogres, a living orc walks. Despite being a large one, probably captain or even chieftain, he visibly shakes in horror, and he is dwarfed by the two creatures leading him. \n\n\nTODO: the lich will take him on the altar. Aren says \'maggots\', somehow he knows. From underneath the altar, a large horde of maggots appears. The orc tries to escape, horrified, but the skeletons pin him. The maggots crawl all over the orc, and as he screams, the church reacts with tones. The lich raises his hands as if in offering. Once the orc is dead, rychl\xfd process. Skeletons drag the body. Leave. Briana : "how did you know it will be maggots?". Aren : "I\'ll explain when we get out of here." Briana : "And if it was meant to be an offering, why did they not leave the body?" Aren : "that I don\'t know"')
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pg:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church_altar"))return!1
if(b.bA(this.d))return!1
return!0},
S:[function(a,b,c){c.q(0,"TODO - a forgotten, orcish spear")
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rX:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"TODO: first impression, clangs, shouts, heaving carts of steel\n\n\nFrom above, troughs of molten steel descend into all parts of the room like huge fiery tentacles. At the end of each, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. \n\n\nYou and Briana duck behind some carts. You can guess which corridor leads to the smelter. Hot air is flowing into the forge through it, stirring the smoke. It's up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n",!0)}},
rY:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The air in the war forges is heavy and the noise overwhelming.\n",!0)}},
rV:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
rW:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
rT:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.j0("sneak_onto_cart"))c.W(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.W(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.W(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
rU:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
rR:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
rS:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
u0:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
rP:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The stone gate looms before you.\n",!0)}},
od:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"mountain_pass_gate"))return!1
return!0},
S:[function(a,b,c){var z,y
c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
z=H.K(b.c,"$isdl")
z.toString
y=new M.e6(null,!1,0)
y.l(z)
b.c=new V.oe().$1(y).n()
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gK:function(){return!1}},
oe:{"^":"a:0;",
$1:function(a){a.gdX()
a.a=!0
return a}},
p6:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"mountain_pass_gate"))return!1
if(b.d_(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.Y(a.gi(),new V.pf())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gO",6,0,1],
R:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.p7())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gN",6,0,1],
I:function(a,b){return 0.5},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gK:function(){return!1}},
pf:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a6()
a.sbw(z+10)
return a}},
h9:{"^":"a_;",
gbb:function(){return[new A.b4(new V.pa(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.b4(new V.pb(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ap:function(){var z=new V.e2(null,null,null)
z.l(this)
new V.pc().$1(z)
return z.n()},
ax:function(a,b){if(a!==0)return
return b.a.aB(0,new V.pd())},
aA:function(a,b){return[a.aB(0,new V.pe())]}},
tY:{"^":"a:0;",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.ga_().b=z
a.ga_().c=0
return a}},
pa:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.Y(a.gi(),new V.p8())
b.Y(a.gi(),new V.p9())
b.ar()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
p8:{"^":"a:0;",
$1:function(a){var z=a.gaT()
if(typeof z!=="number")return z.as()
a.saT(z-1)
return a}},
p9:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a6()
a.sbw(z+10)
return a}},
pb:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.ar()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
pc:{"^":"a:0;",
$1:function(a){var z=a.ga_().c
if(typeof z!=="number")return z.a6()
a.ga_().c=z+1
return a}},
pd:{"^":"a:0;",
$1:function(a){return a.gF()}},
pe:{"^":"a:0;",
$1:function(a){return a.gF()}},
tR:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
u_:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
tv:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
tG:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"",!0)}},
pk:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gO",6,0,1],
R:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.pm())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gN",6,0,1],
I:function(a,b){return 0.3},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gK:function(){return!1}},
hi:{"^":"a_;",
gbb:function(){return[new A.b4(new V.po(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.b4(new V.pp(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ap:function(){var z=new V.e3(null,null,null)
z.l(this)
new V.pq().$1(z)
return z.n()},
ax:function(a,b){if(a!==0)return
return b.a.aB(0,new V.pr())},
aA:function(a,b){return[a.aB(0,new V.ps())]}},
tX:{"^":"a:0;",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.ga_().b=z
a.ga_().c=0
return a}},
po:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
b.ar()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
pp:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Y(a.gi(),new V.pn())
b.ar()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
pn:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}},
pq:{"^":"a:0;",
$1:function(a){var z=a.ga_().c
if(typeof z!=="number")return z.a6()
a.ga_().c=z+1
return a}},
pr:{"^":"a:0;",
$1:function(a){return a.gF()}},
ps:{"^":"a:0;",
$1:function(a){return a.gF()}},
of:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gO",6,0,1],
R:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.og())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gN",6,0,1],
I:function(a,b){return 0.8},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gK:function(){return!1}},
fX:{"^":"a_;",
gbb:function(){return[new A.b4(new V.oi(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.b4(new V.oj(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ap:function(){var z=new V.e0(null,null,null)
z.l(this)
new V.ok().$1(z)
return z.n()},
ax:function(a,b){if(a!==0)return
return b.a.aB(0,new V.ol())},
aA:function(a,b){return[a.aB(0,new V.om())]}},
tW:{"^":"a:0;",
$1:function(a){var z=$.$get$Z().ad(1073741823)
a.ga_().b=z
a.ga_().c=0
return a}},
oi:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
b.ar()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
oj:{"^":"a:8;",
$4:function(a,b,c,d){J.aB(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Y(a.gi(),new V.oh())
b.ar()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oh:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}},
ok:{"^":"a:0;",
$1:function(a){var z=a.ga_().c
if(typeof z!=="number")return z.a6()
a.ga_().c=z+1
return a}},
ol:{"^":"a:0;",
$1:function(a){return a.gF()}},
om:{"^":"a:0;",
$1:function(a){return a.gF()}},
pl:{"^":"Y;T:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.K(z.length!==0?C.a.gv(z):null,"$isM").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gO",6,0,1],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,1],
I:function(a,b){return 1},
gP:function(){return!1},
a7:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"Perhaps you can divert its attention."},
gK:function(){return!1}},
t9:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
tk:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
rO:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
rZ:{"^":"a:4;",
$3:function(a,b,c){J.L(c,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
pT:{"^":"f5;i:a<,M:b<",
X:function(a){var z=new V.dq(null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f5))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dq:{"^":"d;a,b,c",
gi:function(){return this.ga_().b},
gM:function(){return this.ga_().c},
ga_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x
z=this.a
if(z==null){y=this.ga_().b
x=this.ga_().c
z=new V.pT(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
q6:{"^":"h9;i:a<,M:b<",
X:function(a){var z=new V.e2(null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.h9))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
e2:{"^":"d;a,b,c",
gi:function(){return this.ga_().b},
gM:function(){return this.ga_().c},
ga_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x
z=this.a
if(z==null){y=this.ga_().b
x=this.ga_().c
z=new V.q6(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
q8:{"^":"hi;i:a<,M:b<",
X:function(a){var z=new V.e3(null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.hi))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
e3:{"^":"d;a,b,c",
gi:function(){return this.ga_().b},
gM:function(){return this.ga_().c},
ga_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x
z=this.a
if(z==null){y=this.ga_().b
x=this.ga_().c
z=new V.q8(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
q4:{"^":"fX;i:a<,M:b<",
X:function(a){var z=new V.e0(null,null,null)
z.l(this)
a.$1(z)
return z.n()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fX))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.Q(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
e0:{"^":"d;a,b,c",
gi:function(){return this.ga_().b},
gM:function(){return this.ga_().c},
ga_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
n:function(){var z,y,x
z=this.a
if(z==null){y=this.ga_().b
x=this.ga_().c
z=new V.q4(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",
x_:[function(a){var z,y
z=$.$get$dc()
y=z.B
if(y.length>0){y+=" "
z.B=y}z.B=y+a},"$1","v6",2,0,16],
x4:[function(a){$.ew=a},"$1","v7",2,0,16],
i5:[function(a,b,c,d,e,f,g){var z=L.eV(a,!1,!1,d,e,f,g)
$.$get$bR().q(0,z)
return z},function(a){return O.i5(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i5(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","v5",2,13,51,0,0,0,1,1,0],
nD:{"^":"nP;",
bv:function(){var z=0,y=P.aC(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bv=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cX){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.D())
m=t.Q
n=Z.ou()
m.toString
l=new A.v(100,null,null,null,null)
l.e=n.D()
m.a.E(l.D())
new P.F(0,$.r,null,[null]).by(!0)}if(t.r){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.D())
t.r=!1
m=t.Q
m.toString
n=new A.v(60,null,null,null,null)
n.b=t.f.cm(0)
m.a.E(n.D())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
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
l=new A.v(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.E(l.D())
z=1
break}else{p=n
o=H.B(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.v(666,null,null,null,null)
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
m=new A.v(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.D())
case 1:return P.aG(x,y)
case 2:return P.aF(v,y)}})
return P.aH($async$bv,y)},
eP:function(){var z,y
this.fl()
this.f.b5(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hw(Z.bJ())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bJ()
z.a.E(y.D())
this.bv()},
l1:[function(a){var z,y
z={}
z.a=null
y=$.$get$bR()
y.V(0,new O.o_(z,this,a))
z=z.a
if(z==null)throw H.c(P.D("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iI(z)
this.bv()},"$1","git",2,0,32],
iI:function(a){var z
if(a.gfT()!=null){z=a.r
$.$get$cl().aC(z)}z=a.x
if(z!=null)this.el(z)},
cw:function(){var z=0,y=P.aC(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cw=P.ax(function(a,a0){if(a===1)return P.aF(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cm()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.v(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.D())
p=r.b.dE()
r=v.Q
q=p.gjh()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.D())
r=new P.F(0,$.r,null,[null])
r.by(null)
r.c_(new O.nQ(v))
x=!0
z=1
break}m=v.x===v.e.gay().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gay().length){r=v.e.gay()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.f(r,o)
z=1
break}o=!!J.q(r[o]).$isP
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.v(667,null,null,null,null)
k.c=r
o.a.E(k.D())
k=$.$get$bR()
k.iq(new O.nR(v),!1)
if(k.gm(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.D())
o=H.z(k,"b2",0)
o=P.U(new H.N(k,new O.nS(u,l),[o]),!0,o)
r=k.a
H.o([],[L.a5])
j=new L.eW(r,o)
if(!j.gU(j)){u=v.Q
r=u.e
if(r!=null){r.dt(new D.bY("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.cg(new P.F(0,$.r,null,[r]),[r])
r=j.dI()
u.a.E(r.D())
u=u.e.a.c_(v.git())
i=new O.nT(v)
r=H.m(u,0)
q=$.r
if(q!==C.h){i=P.en(i,q)
q.toString}u.dd(new P.ed(null,new P.F(0,q,null,[r]),6,new O.nU(),i,[r,r]))
x=!0
z=1
break}else{h=k.bd(0,new O.nV(),new O.nW())
if(h!=null){if(h.gfT()!=null){r=h.r
$.$get$cl().aC(r)}r=h.x
if(r!=null)v.el(r)
k.ab(0,h)}}}r=$.$get$cl()
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
case 4:r=$.ew
if(r!=null){v.el(r)
$.ew=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gay().length-1
v.x=r}else if($.hS)$.hS=!1
else{++r
v.x=r}u.a=r===v.e.gay().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.E(o.D())
if(v.x===v.e.gay().length){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="End of book."
u.a.E(r.D())
r=v.Q
u=v.e3()
r.toString
u=u.eS(50)
r.a.E(u.D())
v.Q.a.E(new A.v(80,null,null,null,null).D())
x=!0
z=1
break}r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.a4
u.f=new P.cg(new P.F(0,$.r,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.E(r.D())
u.f.a.c_(new O.nX(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.q(r[q]).$isP?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.D())
try{r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jf(r[q])}catch(b){u=H.A(b)
if(u instanceof M.cw){t=u
s=H.B(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.v(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.E(q.D())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="- choices added"
r.a.E(q.D())
if(k.bS(0,new O.nY(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.D())
r=v.Q
u=v.e3()
r.toString
u=u.eS(50)
r.a.E(u.D())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.S,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gay().length-1?v.e3():null
q=v.e.gay()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.aw(v.cz(H.ie(q[o],r)),$async$cw)
case 15:c=a0
if(k.bS(0,new O.nZ(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=d.eS(50)
u.a.E(r.D())}x=c
z=1
break
z=13
break
case 14:u=v.e.gay()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.y("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aG(x,y)}})
return P.aH($async$cw,y)},
el:function(a){var z,y,x,w,v
z=$.$get$cA()
if(z.b.test(H.bu(a))){y=this.d
if(y==null)throw H.c(new P.y("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.as()
w=z-1}else{x=this.b.dO(a,this.e.gdQ())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a4(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghr()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghr()
else z=!1}else z=!1
$.hQ=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.E(v.D())
v=this.e
this.d=new O.nE(v,this.x)
this.e=x
this.x=w
v.e=J.am(v.gdJ(),1)},
fl:function(){var z,y,x,w,v,u
this.x=null
$.$get$cl().b5(0)
$.$get$bR().sm(0,0)
$.ru=null
x=$.$get$cq()
x.b5(0)
w=$.$get$cm()
x.p(0,"points",w)
w.a=0
w.b.b5(0)
this.b.jk()
$.iq=!0
try{this.jX()}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.D())
throw H.c(z)}this.hb()
$.iq=!1},
cz:function(a){var z=0,y=P.aC(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cz=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dc()
q.B=""
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
q.B+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cw(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.B.length!==0){t.Q.eZ(J.h(q)).c_(new O.o0(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aG(x,y)
case 2:return P.aF(v,y)}})
return P.aH($async$cz,y)},
iA:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cA().b.test(H.bu(z)))return!1
y=this.b.dO(z,this.e.gdQ())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.E(w.D())
return!0}y.gkT()
return!1},"$1","gfp",2,0,33],
e3:function(){var z,y,x,w,v,u
this.hb()
try{x=this.e.gh()
w=$.$get$cq()
x=new Z.fM(x,this.b.jF(),null,null,null,null)
x.c=H.aK(Z.cT(w),"$isG",[P.t,P.d],"$asG")
x.f=Date.now()
x.e=C.e.kQ(H.aE(x),16)
return x}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.D())
throw H.c(z)}},
h1:function(a,b){var z,y,x
this.fl()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dr("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.D())
z.jU(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.D())
this.f.at(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.D())
y=$.$get$cq()
Z.nA(a,y,P.dC(P.t,P.bA))
this.cx=H.K(y.j(0,"game"),"$isf0")
this.cy=H.aK(y.j(0,"hitpoints"),"$isau",[P.aS],"$asau")
z=[P.u]
this.db=H.aK(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aK(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hw(Z.bJ())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bJ()
z.a.E(y.D())
y=this.Q
y.toString
z=new A.v(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.E(z.D())
this.bv()},
kh:function(a){return this.h1(a,null)},
dS:[function(a,b,c,d){var z=0,y=P.aC(),x,w=this,v,u,t
var $async$dS=P.ax(function(e,f){if(e===1)return P.aF(f,y)
while(true)switch(z){case 0:v=$.$get$dc()
if(v.B.length!==0){w.Q.eZ(J.h(v))
v.B=""}v=w.Q
v.toString
u=new A.v(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.D())
u=U.cd
t=new P.F(0,$.r,null,[u])
v.x=new P.cg(t,[u])
x=t
z=1
break
case 1:return P.aG(x,y)}})
return P.aH($async$dS,y)},function(a,b){return this.dS(a,b,null,!1)},"kY","$4$rerollEffectDescription$rerollable","$2","ghM",4,5,44,1,0]},
o_:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf_(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.E(x.D())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cA().b.test(H.bu(z))?y.d.a:y.b.dO(z,y.e.gdQ())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
nQ:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nR:{"^":"a:0;a",
$1:function(a){return a.gf_()||this.a.iA(a)}},
nS:{"^":"a:35;a,b",
$1:function(a){return a.k7(this.b,this.a.a)}},
nT:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.E(x.D())
return}},
nU:{"^":"a:0;",
$1:function(a){return a instanceof D.bY}},
nV:{"^":"a:0;",
$1:function(a){return a.gk8()}},
nW:{"^":"a:2;",
$0:function(){return}},
nX:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nY:{"^":"a:0;a,b",
$1:function(a){return a.dw(!0,this.a.a,this.b.gfp())}},
nZ:{"^":"a:0;a,b",
$1:function(a){return a.dw(!0,this.a.a,this.b.gfp())}},
o0:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
mZ:{"^":"d;a,b,fN:c<",
j4:function(a,b,c){var z
if(!$.hQ){z=J.am(this.a,b)
this.a=z
this.b.aC(new A.cN(b,z,c))}},
q:function(a,b){return this.j4(a,b,null)},
a6:function(a,b){this.q(0,b)
return this},
D:function(){return P.ab(["points",this.a])},
hq:function(a){this.a=a.j(0,"points")
this.b.b5(0)},
hX:function(){this.b=P.b3(null,A.cN)},
$isdY:1},
cU:{"^":"mI;ay:d<,dJ:e@,a,b,c",
ghr:function(){return J.a8(this.e,0)}},
nE:{"^":"d;a,b"},
nL:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dO:function(a,b){var z
if(b!=null&&this.a.a9(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a9(a))return z.j(0,a)
else return}},
p:function(a,b,c){this.a.p(0,b,c)
c.sh(b)},
jF:function(){var z=new H.T(0,null,null,null,null,null,0,[P.t,null])
this.a.V(0,new O.nN(z))
return z},
jU:function(a){a.V(0,new O.nO(this))},
jk:function(){this.a.V(0,new O.nM())}},
nN:{"^":"a:7;a",
$2:function(a,b){this.a.p(0,a,P.ab(["visitCount",b.gdJ()]))}},
nO:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a9(a))z.j(0,a).sdJ(J.aA(b,"visitCount"))}},
nM:{"^":"a:7;",
$2:function(a,b){b.sdJ(0)}}}],["","",,M,{"^":"",cw:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eP:function(a){return new M.cw(a,null,null)}}}}],["","",,M,{"^":"",nP:{"^":"d;"}}],["","",,Z,{"^":"",fM:{"^":"d;a,b,c,d,e,f",
eS:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dH()
return z},
dH:function(){var z,y
z=new H.T(0,null,null,null,null,null,0,[P.t,null])
z.p(0,"uid",this.e)
z.p(0,"currentPageName",this.a)
z.p(0,"pageMapState",this.b)
z.p(0,"vars",this.c)
z.p(0,"timestamp",this.f)
y=this.d
if(y!=null)z.p(0,"previousText",y)
return C.w.fR(z)},
k:function(a){return this.dH()},
A:{
fN:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.q(a)
z=!!z.$isP||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.q(a).$isdY},
cT:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.q(a)
if(!!z.$isP){y=[]
for(x=0;x<z.gm(a);++x)if(Z.fN(z.j(a,x)))y.push(Z.cT(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.T(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.nz(a,w))
return w}else if(!!z.$isdY){v=a.D()
v.p(0,"_class",a.gfN())
return Z.cT(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cS:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.q(a)
if(!!z.$isP){y=[]
for(x=0;x<z.gm(a);++x)y.push(Z.cS(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a9("_class")){v=new H.T(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.ny(b,v))
return v}else if(w&&a.a9("_class"))if(c!=null){c.hq(a)
return c}else{u=z.j(a,"_class")
if(!b.a9(u))throw H.c(new Z.dr("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nA:function(a,b,c){a.c.V(0,new Z.nB(b,c))}}},nz:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fN(this.a.j(0,a)))this.b.p(0,a,Z.cT(b))}},ny:{"^":"a:7;a,b",
$2:function(a,b){this.b.p(0,a,Z.cS(b,this.a,null))}},nB:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.p(0,a,Z.cS(b,x,null))
else z.p(0,a,Z.cS(b,x,y))}},dr:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lK:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",n4:{"^":"d;"},n3:{"^":"n4;"},lS:{"^":"n3;a,b,c,d,e,f,r,x",
l5:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.t
n=[o,P.d]
H.aK(a,"$isG",n,"$asG")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.a9("strContent"))m.c=a.j(0,"strContent")
if(a.a9("listContent"))m.b=a.j(0,"listContent")
if(a.a9("intContent"))m.d=a.j(0,"intContent")
if(a.a9("mapContent"))m.e=H.aK(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.gho()){case 1070:o=this.e
if(o!=null){o.dt(new D.bY("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bj()
o.b.bj()
return
case 1000:o=new A.v(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.E(o.D())
n.E(new A.v(10,null,this.c.ch,null,null).D())
return
case 1050:l=z.gjY()
this.e.bT(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.D())
o=z.gkj()
if(!o.a9("__submitted__"))o.p(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cr())
n.bO(new G.kg(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.D())
k=J.aA(z.geJ(),0)
j=J.aA(z.geJ(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.B,k)
o.bT(new U.cd(C.B[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.D())
o=this.e
if(o!=null){o.dt(new D.bY("Book Restart before choice was selected."))
this.e=null}try{this.c.eP()}catch(i){y=H.A(i)
x=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.D())
throw H.c(y)}o=new A.v(90,null,null,null,null)
o.b=Z.bJ()
n.E(o.D())
n.E(new A.cN(0,0,null).dI().D())
return
case 1020:h=new A.v(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.D())
h=this.e
if(h!=null){h.dt(new D.bY("Book Load before choice was selected."))
this.e=null}try{h=z.ghQ()
f=new Z.fM(null,null,null,null,null,null)
e=H.aK(C.w.jr(h),"$isG",n,"$asG")
if(!e.a9("currentPageName")||!e.a9("vars"))H.i(new Z.lK("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aK(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aK(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a9("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aK(J.j4(z.geJ()),"$isbG",[o],"$asbG")
o=this.c
if(v!=null)o.h1(w,v)
else o.kh(w)}catch(i){o=H.A(i)
if(o instanceof Z.dr){u=o
t=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.D())
this.c.eP()}else{s=o
r=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.D())
this.c.eP()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bJ()
g.E(o.D())}catch(i){q=H.A(i)
p=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.D())
throw H.c(q)}this.c.toString
g.E(new A.cN(0,$.$get$cm().a,null).dI().D())
return
case 1090:this.f.bT(!0)
this.f=null
return
case 1040:this.c.bv()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gho())+"."
this.a.E(o.D())}},"$1","giG",2,0,21],
eZ:function(a){var z=P.a4
this.f=new P.cg(new P.F(0,$.r,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.E(z.D())
return this.f.a}},bY:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kg:{"^":"d;a",
D:function(){return P.c7(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;ho:a<,eJ:b<,hQ:c<,jY:d<,kj:e<",
gkS:function(){var z=this.a
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
dH:function(){return C.w.fR(this.D())},
D:function(){var z,y
z=new H.T(0,null,null,null,null,null,0,[P.t,P.d])
z.p(0,"type",this.a)
y=this.c
if(y!=null)z.p(0,"strContent",y)
y=this.b
if(y!=null)z.p(0,"listContent",y)
y=this.d
if(y!=null)z.p(0,"intContent",y)
y=this.e
if(y!=null)z.p(0,"mapContent",y)
return z},
k:function(a){var z,y,x
z="Message "+this.gkS()
y=this.a
x=J.q(y)
return z+(x.t(y,50)||x.t(y,60)||x.t(y,90)||x.t(y,100)||x.t(y,666)||x.t(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mI:{"^":"d;h:a@,kT:b<",
k:function(a){return this.a},
gdQ:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.j_(z,": ")
if(y>0)return J.j3(this.a,0,y)
else return}}}],["","",,A,{"^":"",cN:{"^":"d;jh:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dI:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a5:{"^":"d;f_:a@,b,c,d,aY:e<,J:f<,fT:r<,x,y",
gk8:function(){return this.e.length===0},
dw:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
k7:function(a,b){return this.dw(a,b,null)},
kO:function(){return P.ab(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c_:function(a){this.r=a
return this},
bB:function(a,b){return C.b.bB(this.e,b.gaY())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hU:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.D("String given to choice cannot be null."))
this.e=J.bb(a).eT(a)
this.d=C.b.gw(a)
this.r=f
this.b=!1
this.c=!1},
$isX:1,
$asX:function(){return[L.a5]},
A:{
eV:function(a,b,c,d,e,f,g){var z=new L.a5(!1,null,null,null,null,e,null,d,g)
z.hU(a,!1,!1,d,e,f,g)
return z}}},eW:{"^":"fl;a,b",
gm:function(a){return this.b.length},
sm:function(a,b){C.a.sm(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
jf:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aA(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.q(a[0]).$isbA}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.A(u)
v=M.eP(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.S,P.at]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aA(y,"string")!=null&&!!J.q(J.aA(y,"string")).$isbA)try{x=J.aA(y,"string").$0()}catch(u){w=H.A(u)
v=M.eP(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.aA(y,"goto")
p=H.ie(J.aA(y,"script"),t)
o=new L.a5(!1,null,null,null,null,null,null,q,J.aA(y,"submenu"))
if(r==null)H.i(P.D("String given to choice cannot be null."))
o.e=J.bb(r).eT(r)
o.d=C.b.gw(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
jb:function(a,b,c,d,e,f,g){if(b instanceof L.a5)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eV(b,!1,!1,e,null,f,g))
else throw H.c(P.D("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.jb(a,b,!1,!1,null,null,null)},
kP:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.U(new H.N(z,new L.jV(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.V(x,new L.jW(w))
return w},
dI:function(){return this.kP(null,null,null,null)},
k:function(a){var z=this.b
return new H.ap(z,new L.jX(),[H.m(z,0),null]).cb(0,", ")},
$asfl:function(){return[L.a5]},
$asfu:function(){return[L.a5]},
$asP:function(){return[L.a5]},
$asa1:function(){return[L.a5]},
$asw:function(){return[L.a5]}},jV:{"^":"a:0;a,b,c",
$1:function(a){return a.dw(this.b,this.a,this.c)}},jW:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aB(this.a.b,a.kO())
a.a=!0}},jX:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cV:{"^":"d;da:a<,aY:b<",
D:function(){return P.ab(["show",this.a,"string",this.b])}},or:{"^":"d;a",
D:function(){var z=new H.T(0,null,null,null,null,null,0,[P.t,P.d])
this.a.V(0,new Z.os(z))
return z},
V:function(a,b){this.a.V(0,b)}},os:{"^":"a:37;a",
$2:function(a,b){this.a.p(0,a,b.D())}},hv:{"^":"d;h:a@,aN:b<,fO:c<,dD:d<,da:e<,h5:f<,aY:r<",A:{
hw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.o(new Array(a.length),[Z.hv])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ar)(a),++v){u=a[v]
t=J.J(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.f(z,w)
z[w]=new Z.hv(s,r,q,p,o,n,t);++w}C.a.cp(z,new Z.pz())
return z}}},pz:{"^":"a:7;",
$2:function(a,b){return J.bx(b.gdD(),a.gdD())}},au:{"^":"d;h:a<,aN:b<,c,fO:d<,dD:e<,f,r,h5:x<,fL:y@,fN:z<,$ti",
gac:function(){return this.f},
sac:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cX=!0}},
gda:function(){return this.r},
gaY:function(){return this.c.$1(this.f)},
D:function(){return P.ab(["name",this.a,"value",this.f,"show",this.r])},
hq:function(a){var z
this.sac(H.iL(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cX=!0}},
$isdY:1,
A:{
bI:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cW()
y=z.a9(a)?H.aK(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iL(e,h)
y.r=!0
z.p(0,a,y)
return y},
ou:function(){var z,y
z=new Z.or(new H.T(0,null,null,null,null,null,0,[P.t,Z.cV]))
y=$.$get$cW().gcn()
new H.N(y,new Z.ov(),[H.z(y,"w",0)]).V(0,new Z.ow(z))
$.cX=!1
return z},
bJ:function(){var z=H.o([],[[P.G,P.t,P.d]])
$.$get$cW().gcn().V(0,new Z.ot(z))
return z}}},ov:{"^":"a:0;",
$1:function(a){return a.gfL()}},ow:{"^":"a:24;a",
$1:function(a){var z,y
z=a.gda()
y=a.gaY()
a.sfL(!1)
this.a.a.p(0,a.a,new Z.cV(z,y))}},ot:{"^":"a:24;a",
$1:function(a){var z=new H.T(0,null,null,null,null,null,0,[P.t,P.d])
z.p(0,"name",a.gh())
z.p(0,"description",a.gaN())
z.p(0,"color",a.gfO())
z.p(0,"priority",a.gdD())
z.p(0,"show",a.gda())
z.p(0,"notifyOnChange",a.gh5())
z.p(0,"string",a.gaY())
this.a.push(z)}}}],["","",,N,{"^":"",dE:{"^":"d;h:a<,b,c,ig:d<,e,f",
gfV:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gfV()+"."+x},
geI:function(){if($.io){var z=this.b
if(z!=null)return z.geI()}return $.rB},
ki:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geI().b){if(!!J.q(b).$isbA)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.v3.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.A(u)
y=H.B(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gfV()
t=c
s=d
r=Date.now()
q=$.fm
$.fm=q+1
p=new N.mi(a,x,v,w,new P.cC(r,!1),q,t,s,e)
if($.io)for(o=this;o!=null;){o.ft(p)
o=o.b}else $.$get$fo().ft(p)}},
cd:function(a,b,c,d){return this.ki(a,b,c,d,null)},
jK:function(a,b,c){return this.cd(C.S,a,b,c)},
ah:function(a){return this.jK(a,null,null)},
jJ:function(a,b,c){return this.cd(C.R,a,b,c)},
bc:function(a){return this.jJ(a,null,null)},
jI:function(a,b,c){return this.cd(C.T,a,b,c)},
bL:function(a){return this.jI(a,null,null)},
jW:function(a,b,c){return this.cd(C.A,a,b,c)},
h0:function(a){return this.jW(a,null,null)},
kU:function(a,b,c){return this.cd(C.W,a,b,c)},
eU:function(a){return this.kU(a,null,null)},
hL:function(a,b,c){return this.cd(C.V,a,b,c)},
dR:function(a){return this.hL(a,null,null)},
ft:function(a){},
A:{
bh:function(a){return $.$get$fn().kv(a,new N.tC(a))}}},tC:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dc(z,"."))H.i(P.D("name shouldn't start with a '.'"))
y=C.b.kf(z,".")
if(y===-1)x=z!==""?N.bh(""):null
else{x=N.bh(C.b.aG(z,0,y))
z=C.b.bH(z,y+1)}w=new H.T(0,null,null,null,null,null,0,[P.t,N.dE])
w=new N.dE(z,x,null,w,new P.hy(w,[null,null]),null)
if(x!=null)x.gig().p(0,z,w)
return w}},aU:{"^":"d;h:a<,ac:b<",
t:function(a,b){if(b==null)return!1
return b instanceof N.aU&&this.b===b.b},
aS:function(a,b){return C.e.aS(this.b,b.gac())},
d5:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
b8:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bN:function(a,b){return this.b>=b.gac()},
bB:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gw:function(a){return this.b},
k:function(a){return this.a},
$isX:1,
$asX:function(){return[N.aU]}},mi:{"^":"d;eI:a<,b,aQ:c<,d,M:e<,f,bk:r<,bh:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bv:function(a){return X.d4(J.iX(a,0,new X.uI()))},
aX:function(a,b){var z=J.am(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d4:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uI:{"^":"a:7;",
$2:function(a,b){return X.aX(a,J.j(b))}},
dN:{"^":"c2;a,$ti",
gac:function(){var z=this.a
if(z==null)throw H.c(new P.y("value called on absent Optional."))
return z},
bp:function(a){var z=this.a
return z==null?a:z},
gZ:function(a){var z=this.a
if(z!=null){z=H.o([z],this.$ti)
z=new J.bc(z,1,0,null,[H.m(z,0)])}else z=C.H
return z},
gw:function(a){return J.j(this.a)},
t:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dN){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
hW:function(a,b){if(this.a==null)throw H.c(P.D("Must not be null."))},
A:{
fy:function(a,b){var z=new X.dN(a,[b])
z.hW(a,b)
return z}}}}],["","",,U,{"^":"",cR:{"^":"d;a,b",
k:function(a){return this.b}},cd:{"^":"d;a,kV:b<",
geF:function(){return this.a===C.D},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
t:function(a,b){if(b==null)return!1
return b instanceof U.cd&&b.a===this.a&&J.e(b.b,this.b)},
gw:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
x5:[function(a,b){var z,y,x,w,v
z=new D.lS(b,null,null,null,null,null,null,null)
y=$.fJ
$.fJ=y+1
x=new H.cb(y,null,!1)
w=init.globalState.d
w.dY(y,x)
w.cF()
w=new H.nk(x,null)
w.hY(x)
z.b=w
w=w.b
w.toString
new P.cZ(w,[H.m(w,0)]).aF(z.giG(),null,null,null)
b.E(new H.cj(z.b.a,init.globalState.d.a))
v=N.nG()
z.c=v
v.Q=z},"$2","i8",4,0,34]},1]]
setupProgram(dart,0)
J.q=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fc.prototype
return J.fb.prototype}if(typeof a=="string")return J.c6.prototype
if(a==null)return J.fd.prototype
if(typeof a=="boolean")return J.fa.prototype
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.aJ=function(a){if(a==null)return a
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.ak=function(a){if(typeof a=="number")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.ev=function(a){if(typeof a=="number")return J.c5.prototype
if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.bb=function(a){if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.am=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ev(a).a6(a,b)}
J.aY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ak(a).d4(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.q(a).t(a,b)}
J.a8=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ak(a).b8(a,b)}
J.bU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ak(a).aS(a,b)}
J.bV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ev(a).c3(a,b)}
J.iV=function(a){if(typeof a=="number")return-a
return J.ak(a).eX(a)}
J.bx=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ak(a).as(a,b)}
J.aA=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).j(a,b)}
J.aB=function(a,b){return J.aJ(a).q(a,b)}
J.iW=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aJ(a).j3(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.L=function(a,b,c){return J.aJ(a).W(a,b,c)}
J.bW=function(a,b){return J.ev(a).bB(a,b)}
J.eI=function(a,b){return J.J(a).a4(a,b)}
J.eJ=function(a,b){return J.aJ(a).au(a,b)}
J.iX=function(a,b,c){return J.aJ(a).bl(a,b,c)}
J.j=function(a){return J.q(a).gw(a)}
J.eK=function(a){return J.J(a).gU(a)}
J.an=function(a){return J.aJ(a).gZ(a)}
J.iY=function(a){return J.aJ(a).gv(a)}
J.aL=function(a){return J.J(a).gm(a)}
J.iZ=function(a){return J.q(a).gbu(a)}
J.j_=function(a,b){return J.J(a).aV(a,b)}
J.eL=function(a,b){return J.aJ(a).aP(a,b)}
J.j0=function(a,b,c){return J.bb(a).h2(a,b,c)}
J.dd=function(a,b,c){return J.bb(a).kA(a,b,c)}
J.cr=function(a,b,c){return J.bb(a).cU(a,b,c)}
J.j1=function(a){return J.ak(a).hj(a)}
J.j2=function(a,b){return J.aJ(a).dT(a,b)}
J.eM=function(a,b){return J.bb(a).dc(a,b)}
J.j3=function(a,b,c){return J.bb(a).aG(a,b,c)}
J.j4=function(a){return J.aJ(a).bF(a)}
J.h=function(a){return J.q(a).k(a)}
J.bX=function(a,b){return J.ak(a).b7(a,b)}
J.j5=function(a,b){return J.aJ(a).c2(a,b)}
I.bw=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.K=J.aT.prototype
C.a=J.c4.prototype
C.M=J.fa.prototype
C.t=J.fb.prototype
C.e=J.fc.prototype
C.v=J.fd.prototype
C.j=J.c5.prototype
C.b=J.c6.prototype
C.E=new A.ao(0,0,0)
C.F=new A.ao(-1/0,-1/0,-1/0)
C.G=new A.ct(-10,0,100)
C.H=new H.l_([null])
C.I=new P.mH()
C.u=new P.qu()
C.J=new P.qN()
C.h=new P.r1()
C.x=new P.b0(0)
C.L=new U.ds(0,"ItemType.spear")
C.y=new U.ds(1,"ItemType.sword")
C.z=new U.ds(2,"ItemType.fist")
C.N=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.lX(null,null)
C.O=new P.lZ(null)
C.P=new P.m_(null,null)
C.Q=new O.m7(0,"KnownToMode.all")
C.R=new N.aU("FINER",400)
C.S=new N.aU("FINEST",300)
C.T=new N.aU("FINE",500)
C.A=new N.aU("INFO",800)
C.U=new N.aU("OFF",2000)
C.V=new N.aU("SEVERE",1000)
C.W=new N.aU("WARNING",900)
C.D=new U.cR(0,"Result.success")
C.a2=new U.cR(1,"Result.failure")
C.a3=new U.cR(2,"Result.criticalSuccess")
C.a4=new U.cR(3,"Result.criticalFailure")
C.B=I.bw([C.D,C.a2,C.a3,C.a4])
C.o=I.bw([C.y])
C.X=I.bw([C.z])
C.d=I.bw([])
C.Y=I.bw(["cave_with_agruth","guardpost_above_church","orcthorn_door","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.Z=new H.k5(0,{},C.d,[null,null])
C.a_=new X.dN(null,[P.O])
C.k=new R.dQ(0,"Pose.standing")
C.i=new R.dQ(1,"Pose.offBalance")
C.f=new R.dQ(2,"Pose.onGround")
C.l=new K.dR(0,"Predetermination.none")
C.p=new K.dR(1,"Predetermination.successGuaranteed")
C.m=new K.dR(2,"Predetermination.failureGuaranteed")
C.q=new Y.c8("he","him","his","himself")
C.r=new Y.c8("it","it","its","itself")
C.a0=new Y.c8("she","her","her","herself")
C.a1=new Y.c8("they","them","their","themselves")
C.C=new Y.c8("you","you","your","yourself")
C.c=new Q.np(0,"Resource.stamina")
C.a5=H.b9("fe")
C.a6=H.b9("at")
C.a7=H.b9("t")
C.a8=H.b9("a4")
C.a9=H.b9("aS")
C.n=H.b9("dynamic")
C.aa=H.b9("u")
C.ab=H.b9("O")
C.ac=new P.bL(null,2)
$.fJ=1
$.fC="$cachedFunction"
$.fD="$cachedInvocation"
$.aM=0
$.by=null
$.eR=null
$.br=null
$.bO=null
$.bP=null
$.ej=!1
$.r=C.h
$.f3=0
$.ew=null
$.hQ=!1
$.ru=null
$.hS=!1
$.iq=!0
$.cX=!1
$.io=!1
$.v3=C.U
$.rB=C.A
$.fm=0
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
I.$lazy(y,x,w)}})(["f7","$get$f7",function(){return H.lQ()},"f8","$get$f8",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f3
$.f3=z+1
z="expando$key$"+z}return new P.l5(null,z,[P.u])},"hk","$get$hk",function(){return H.aN(H.cY({
toString:function(){return"$receiver$"}}))},"hl","$get$hl",function(){return H.aN(H.cY({$method$:null,
toString:function(){return"$receiver$"}}))},"hm","$get$hm",function(){return H.aN(H.cY(null))},"hn","$get$hn",function(){return H.aN(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hr","$get$hr",function(){return H.aN(H.cY(void 0))},"hs","$get$hs",function(){return H.aN(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hp","$get$hp",function(){return H.aN(H.hq(null))},"ho","$get$ho",function(){return H.aN(function(){try{null.$method$}catch(z){return z.message}}())},"hu","$get$hu",function(){return H.aN(H.hq(void 0))},"ht","$get$ht",function(){return H.aN(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e8","$get$e8",function(){return P.qc()},"bf","$get$bf",function(){var z,y
z=P.at
y=new P.F(0,P.pM(),null,[z])
y.i4(null,z)
return y},"bQ","$get$bQ",function(){return[]},"er","$get$er",function(){return new K.c1("fist",P.bg(C.X,null))},"bD","$get$bD",function(){return N.bh("PlannerRecommendation")},"ia","$get$ia",function(){return new K.rN()},"es","$get$es",function(){var z=$.$get$ia()
return K.I("__END_OF_ROAM__",z,z,null,null,[],"ground")},"Z","$get$Z",function(){return P.cP(null)},"bF","$get$bF",function(){return P.cP(null)},"is","$get$is",function(){return N.bh("Storyline")},"h2","$get$h2",function(){return P.bk("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bS","$get$bS",function(){return L.e7(new L.tB())},"bT","$get$bT",function(){return L.e7(new L.tH())},"ez","$get$ez",function(){return L.e7(new L.tA())},"dO","$get$dO",function(){return new F.mM("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ep","$get$ep",function(){return Y.dm(!1,"balance",!0,C.r,$.$get$bT())},"iB","$get$iB",function(){return Y.dm(!1,"pounding",!1,C.r,$.$get$bT())},"fK","$get$fK",function(){return new B.nn("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fO","$get$fO",function(){return new O.nC(null,!1,!0,!1,null,null)},"h1","$get$h1",function(){return new Q.on(null,!1,!0,!0,C.c,null)},"hx","$get$hx",function(){return new M.pA("",!0,C.c,!1,!0,null)},"hR","$get$hR",function(){return P.cP(null)},"eQ","$get$eQ",function(){return new Z.jE(!1,!0,!1,null,null)},"iM","$get$iM",function(){return Y.dm(!1,"swing",!0,C.r,$.$get$bT())},"fA","$get$fA",function(){return X.fy(0,P.O)},"fB","$get$fB",function(){return X.fy(1,P.O)},"fV","$get$fV",function(){return new D.ob(!1,!1,!0,null,null)},"em","$get$em",function(){return P.cP(null)},"i4","$get$i4",function(){return K.I("cave_with_agruth_pre",new V.tw(),new V.tx(),null,null,H.o([new Q.n("cave_with_agruth","","You look around.",null)],[Q.n]),"ground")},"i3","$get$i3",function(){return K.I("cave_with_agruth",new V.tt(),new V.tu(),null,null,H.o([new Q.n("underground_church","Go to the Unholy Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.n("war_forge","Go to the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null),new Q.n("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.n]),"ground")},"fP","$get$fP",function(){return new V.o1("Search Agruth","search_agruth",!0,null)},"ic","$get$ic",function(){return K.I("exit_from_bloodrock",new V.tr(),new V.ts(),null,null,H.o([new Q.n("__END_OF_ROAM__","Go forth (UNIMPLEMENTED)","You head down.",null)],[Q.n]),"ground")},"id","$get$id",function(){return K.I("forge_church_crevice",new V.tp(),new V.tq(),null,null,H.o([new Q.n("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.n]),"ground")},"im","$get$im",function(){return K.I("guardpost_above_church",new V.tn(),new V.to(),null,null,H.o([new Q.n("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.n("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.n("smelter","Go to the smelter","Something something.",null)],[Q.n]),"ground")},"f6","$get$f6",function(){return new V.lv("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"ir","$get$ir",function(){return K.I("just_after_agruth_fight",new V.tl(),new V.tm(),null,null,H.o([],[Q.n]),"ground")},"fr","$get$fr",function(){return new V.mr('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fs","$get$fs",function(){return new V.ms('"Savior"',"name_agruth_sword_redemption",!0,null)},"fq","$get$fq",function(){return new V.mq("No name","name_agruth_sword_nothing",!0,null)},"iz","$get$iz",function(){return K.I("orcthorn_door",new V.ti(),new V.tj(),null,null,H.o([new Q.n("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.n("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.n("orcthorn_room","Open the door","You open the door.",null)],[Q.n]),"ground")},"iA","$get$iA",function(){return K.I("orcthorn_room",new V.tg(),new V.th(),O.wh(),null,H.o([new Q.n("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.n]),"ground")},"h8","$get$h8",function(){return new V.p5("Take the statue's sword","take_orcthorn",!0,null)},"iD","$get$iD",function(){return K.I("slave_quarters",new V.te(),new V.tf(),null,null,H.o([],[Q.n]),"ground")},"fU","$get$fU",function(){return new V.oa("Continue","slave_quarters_continue",!0,null)},"iE","$get$iE",function(){return K.I("slave_quarters_passage",new V.tc(),new V.td(),O.iU(),null,H.o([new Q.n("cave_with_agruth","Go to the working area","TODO",null),new Q.n("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.n("orcthorn_door","Approach the little door","Something something.",null)],[Q.n]),"ground")},"iF","$get$iF",function(){return K.I("smelter",new V.ta(),new V.tb(),null,null,H.o([new Q.n("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.n("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.n("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.n]),"ground")},"iG","$get$iG",function(){return K.I("start_adventure",new V.t7(),new V.t8(),O.wg(),null,H.o([new Q.n("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.n]),"ground")},"hc","$get$hc",function(){return new V.ph("Talk to Briana","talk_to_briana_1",!0,null)},"hd","$get$hd",function(){return new V.pi("Talk to Briana","talk_to_briana_2",!0,null)},"he","$get$he",function(){return new V.pj("Talk to Briana","talk_to_briana_3",!0,null)},"iN","$get$iN",function(){return K.I("the_shafts",new V.t5(),new V.t6(),null,null,H.o([new Q.n("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.n]),"ground")},"iP","$get$iP",function(){return K.I("tunnel",new V.t3(),new V.t4(),O.iU(),null,H.o([new Q.n("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.n]),"ground")},"iQ","$get$iQ",function(){return K.I("underground_church",new V.t1(),new V.t2(),null,null,H.o([new Q.n("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.n("underground_church_altar","Go towards the altar","You sneak your way among the columns, trying to stay in the shadows.",null)],[Q.n]),"ground")},"f2","$get$f2",function(){return new V.l4("Look around","examine_underground_church",!0,null)},"iR","$get$iR",function(){return K.I("underground_church_altar",new V.t_(),new V.t0(),null,null,H.o([new Q.n("underground_church","Sneak back","You keep low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.n]),"ground")},"hz","$get$hz",function(){return new V.pC("Wait","wait_for_ritual",!0,null)},"hb","$get$hb",function(){return new V.pg("Take spear","take_spear_in_underground_church",!0,null)},"iS","$get$iS",function(){return K.I("war_forge",new V.rX(),new V.rY(),null,null,H.o([new Q.n("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.n]),"ground")},"ib","$get$ib",function(){return K.I("entrance_to_bloodrock",new V.rV(),new V.rW(),null,null,H.o([new Q.n("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.n("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.n]),"ground")},"it","$get$it",function(){return K.I("mountain_pass",new V.rT(),new V.rU(),null,null,H.o([new Q.n("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.n]),"ground")},"iu","$get$iu",function(){return K.I("mountain_pass_gate",new V.rR(),new V.rS(),null,null,H.o([new Q.n("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.n]),"ground")},"iv","$get$iv",function(){return K.I("mountain_pass_guard_post",new V.u0(),new V.rP(),O.wi(),null,H.o([new Q.n("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.n]),"ground")},"fW","$get$fW",function(){return new V.od("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"ha","$get$ha",function(){return new V.p6("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"iw","$get$iw",function(){return K.I("mountainside_base",new V.tR(),new V.u_(),null,null,H.o([new Q.n("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.n]),"ground")},"ix","$get$ix",function(){return K.I("mountainside_path",new V.tv(),new V.tG(),null,null,H.o([new Q.n("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.n]),"ground")},"hj","$get$hj",function(){return new V.pk("Scare off the serpent","threaten_winged_serpent",!0,null)},"fY","$get$fY",function(){return new V.of("Soothe the serpent","soothe_winged_serpent",!0,null)},"hh","$get$hh",function(){return new V.pl("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"iT","$get$iT",function(){return K.I("winged_serpent_nest",new V.t9(),new V.tk(),null,null,H.o([new Q.n("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.n]),"ground")},"ip","$get$ip",function(){return K.I("ironcast_road",new V.rO(),new V.rZ(),null,null,H.o([new Q.n("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.n]),"ground")},"hZ","$get$hZ",function(){return H.o([$.$get$i4(),$.$get$i3(),$.$get$ic(),$.$get$id(),$.$get$im(),$.$get$ir(),$.$get$iz(),$.$get$iA(),$.$get$iD(),$.$get$iE(),$.$get$iF(),$.$get$iG(),$.$get$iN(),$.$get$iP(),$.$get$iQ(),$.$get$iR(),$.$get$iS(),$.$get$ib(),$.$get$it(),$.$get$iu(),$.$get$iv(),$.$get$iw(),$.$get$ix(),$.$get$iT(),$.$get$ip()],[K.cc])},"hY","$get$hY",function(){return H.o([$.$get$fP(),$.$get$f6(),$.$get$fr(),$.$get$fs(),$.$get$fq(),$.$get$h8(),$.$get$fU(),$.$get$hc(),$.$get$hd(),$.$get$he(),$.$get$f2(),$.$get$hz(),$.$get$hb(),$.$get$fW(),$.$get$ha(),$.$get$hj(),$.$get$fY(),$.$get$hh()],[A.Y])},"dc","$get$dc",function(){return P.p_("")},"cm","$get$cm",function(){var z=new O.mZ(0,null,"PointsCounter")
z.hX()
return z},"bR","$get$bR",function(){return new L.eW(null,H.o([],[L.a5]))},"cq","$get$cq",function(){return H.fh(P.t,P.d)},"cl","$get$cl",function(){return P.b3(null,{func:1,ret:[P.S,P.at]})},"cA","$get$cA",function(){return P.bk("^\\s*<<<\\s*$",!0,!1)},"cW","$get$cW",function(){return H.fh(P.t,Z.au)},"fo","$get$fo",function(){return N.bh("")},"fn","$get$fn",function(){return P.dC(P.t,N.dE)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.t,args:[R.H,A.a9,Y.a3]},{func:1},{func:1,args:[,,,]},{func:1,args:[R.H,A.a9,Y.a3]},{func:1,ret:Q.E,args:[R.H]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,v:true,args:[R.H,A.a9,Y.a3,R.H,S.a_]},{func:1,args:[P.u]},{func:1,ret:U.cF,args:[A.a9,F.M,[P.w,R.H]]},{func:1,v:true,args:[R.H,A.a9,Y.a3,R.H,,]},{func:1,ret:P.t,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.aW]},{func:1,v:true,args:[P.t]},{func:1,args:[P.aS]},{func:1,ret:P.S},{func:1,ret:P.O,args:[A.ao]},{func:1,args:[,P.aW]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.be,args:[P.u]},{func:1,ret:P.t,args:[P.t]},{func:1,args:[Z.au]},{func:1,args:[R.H]},{func:1,args:[U.c0]},{func:1,args:[P.O,R.H]},{func:1,args:[P.bi]},{func:1,ret:P.a4,args:[P.u]},{func:1,args:[P.u,,]},{func:1,args:[Y.ac]},{func:1,v:true,args:[P.u]},{func:1,ret:P.a4,args:[L.a5]},{func:1,v:true,args:[[P.P,P.t],P.fQ]},{func:1,args:[L.a5]},{func:1,args:[P.t,,]},{func:1,args:[P.t,Z.cV]},{func:1,args:[[P.P,Y.ac],Y.ac]},{func:1,ret:P.O,args:[A.ct]},{func:1,ret:P.u,args:[P.X,P.X]},{func:1,ret:P.t,args:[Q.aa]},{func:1,ret:P.O,args:[P.O,P.O]},{func:1,ret:P.u,args:[P.u,P.u]},{func:1,ret:[P.S,U.cd],args:[P.aS,P.t],named:{rerollEffectDescription:P.t,rerollable:P.a4}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aW]},{func:1,ret:Q.cI,args:[U.as]},{func:1,ret:Q.cE,args:[Q.n]},{func:1,v:true,args:[P.d,P.aW]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a5,args:[P.t],named:{deferToChoiceList:P.a4,deferToEndOfPage:P.a4,goto:P.t,helpMessage:P.t,script:{func:1,ret:[P.S,P.at]},submenu:P.t}},{func:1,args:[P.a4]}]
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
if(x==y)H.wd(d||a)
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
Isolate.bw=a.bw
Isolate.ba=a.ba
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iH(X.i8(),b)},[])
else (function(b){H.iH(X.i8(),b)})([])})})()