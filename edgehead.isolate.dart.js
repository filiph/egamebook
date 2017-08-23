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
if(a0==="v"){processStatics(init.statics[b1]=b2.v,b3)
delete b2.v}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ep"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ep"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ep(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b9=function(){}
var dart=[["","",,H,{"^":"",vZ:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aT:{"^":"d;",
u:function(a,b){return a===b},
gw:function(a){return H.aD(a)},
k:function(a){return H.cO(a)},
gbu:function(a){return new H.av(H.i9(a),null)}},
f5:{"^":"aT;",
k:function(a){return String(a)},
gw:function(a){return a?519018:218159},
gbu:function(a){return C.a8},
$isa1:1},
f8:{"^":"aT;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gw:function(a){return 0},
gbu:function(a){return C.a6},
$isat:1},
fb:{"^":"aT;",
gw:function(a){return 0},
gbu:function(a){return C.a5},
k:function(a){return String(a)},
$isf9:1},
w4:{"^":"fb;"},
bn:{"^":"fb;"},
c4:{"^":"aT;$ti",
fL:function(a,b){if(!!a.immutable$list)throw H.c(new P.T(b))},
cI:function(a,b){if(!!a.fixed$length)throw H.c(new P.T(b))},
q:function(a,b){this.cI(a,"add")
a.push(b)},
kx:function(a){this.cI(a,"removeLast")
if(a.length===0)throw H.c(H.aH(a,-1))
return a.pop()},
a9:function(a,b){var z
this.cI(a,"remove")
for(z=0;z<a.length;++z)if(J.f(a[z],b)){a.splice(z,1)
return!0}return!1},
iM:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.C(a))}v=z.length
if(v===y)return
this.sm(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c1:function(a,b){return new H.J(a,b,[H.m(a,0)])},
ar:function(a,b){var z
this.cI(a,"addAll")
for(z=J.am(b);z.t();)a.push(z.gG())},
U:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aO:function(a,b){return new H.ao(a,b,[H.m(a,0),null])},
dT:function(a,b){return H.h1(a,b,null,H.m(a,0))},
bl:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
bc:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.ae())},
dv:function(a,b){return this.bc(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gez:function(a){if(a.length>0)return a[0]
throw H.c(H.ae())},
gB:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ae())},
gc4:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.ae())
throw H.c(H.ds())},
aW:function(a,b,c,d,e){var z,y,x
this.fL(a,"setRange")
P.ca(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a5(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f4())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bR:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.C(a))}return!1},
co:function(a,b){var z
this.fL(a,"sort")
z=b==null?P.ts():b
H.ce(a,0,a.length-1,z)},
f_:function(a){return this.co(a,null)},
bL:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
aU:function(a,b){return this.bL(a,b,0)},
a3:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gT:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
k:function(a){return P.c3(a,"[","]")},
bE:function(a){return P.b1(a,H.m(a,0))},
gW:function(a){return new J.bb(a,a.length,0,null,[H.m(a,0)])},
gw:function(a){return H.aD(a)},
gm:function(a){return a.length},
sm:function(a,b){this.cI(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cu(b,"newLength",null))
if(b<0)throw H.c(P.a5(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aH(a,b))
if(b>=a.length||b<0)throw H.c(H.aH(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.T("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aH(a,b))
if(b>=a.length||b<0)throw H.c(H.aH(a,b))
a[b]=c},
$iscK:1,
$ascK:I.b9,
$isL:1,
$isY:1,
$isw:1},
vY:{"^":"c4;$ti"},
bb:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c5:{"^":"aT;",
bA:function(a,b){var z
if(typeof b!=="number")throw H.c(H.U(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdz(b)
if(this.gdz(a)===z)return 0
if(this.gdz(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdz:function(a){return a===0?1/a<0:a<0},
hi:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.T(""+a+".round()"))},
kN:function(a){return a},
b6:function(a,b){var z
if(b>20)throw H.c(P.a5(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdz(a))return"-"+z
return z},
kQ:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a5(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cJ(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.T("Unexpected toString result: "+z))
x=J.I(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c2("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
eW:function(a){return-a},
a7:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a-b},
d2:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a/b},
c2:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a*b},
bI:function(a,b){return(a|0)===a?a/b|0:this.iV(a,b)},
iV:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.T("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dk:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aR:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a<b},
b7:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a>b},
d3:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a<=b},
bM:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a>=b},
gbu:function(a){return C.ab},
$isK:1},
f7:{"^":"c5;",
gbu:function(a){return C.aa},
$isaR:1,
$isK:1,
$isu:1},
f6:{"^":"c5;",
gbu:function(a){return C.a9},
$isaR:1,
$isK:1},
c6:{"^":"aT;",
cJ:function(a,b){if(b<0)throw H.c(H.aH(a,b))
if(b>=a.length)H.i(H.aH(a,b))
return a.charCodeAt(b)},
cr:function(a,b){if(b>=a.length)throw H.c(H.aH(a,b))
return a.charCodeAt(b)},
dq:function(a,b,c){if(c>b.length)throw H.c(P.a5(c,0,b.length,null,null))
return new H.qH(b,a,c)},
es:function(a,b){return this.dq(a,b,0)},
h1:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a5(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cJ(b,c+y)!==this.cr(a,y))return
return new H.h0(c,b,a)},
a7:function(a,b){if(typeof b!=="string")throw H.c(P.cu(b,null,null))
return a+b},
ex:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bG(a,y-z)},
kz:function(a,b,c){H.bt(c)
return H.n(a,b,c)},
kA:function(a,b,c,d){H.bt(c)
P.mW(d,0,a.length,"startIndex",null)
return H.iy(a,b,c,d)},
cT:function(a,b,c){return this.kA(a,b,c,0)},
hO:function(a,b,c){var z
if(c>a.length)throw H.c(P.a5(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iN(b,a,c)!=null},
d9:function(a,b){return this.hO(a,b,0)},
aF:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.U(c))
if(b<0)throw H.c(P.c9(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.c9(b,null,null))
if(c>a.length)throw H.c(P.c9(c,null,null))
return a.substring(b,c)},
bG:function(a,b){return this.aF(a,b,null)},
eS:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cr(z,0)===133){x=J.dt(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cJ(z,w)===133?J.lx(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kR:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cr(z,0)===133?J.dt(z,1):0}else{y=J.dt(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c2:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.I)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bL:function(a,b,c){var z
if(c>a.length)throw H.c(P.a5(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aU:function(a,b){return this.bL(a,b,0)},
kf:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ke:function(a,b){return this.kf(a,b,null)},
jm:function(a,b,c){if(b==null)H.i(H.U(b))
if(c>a.length)throw H.c(P.a5(c,0,a.length,null,null))
return H.vx(a,b,c)},
a3:function(a,b){return this.jm(a,b,0)},
gT:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
bA:function(a,b){var z
if(typeof b!=="string")throw H.c(H.U(b))
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
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aH(a,b))
if(b>=a.length||b<0)throw H.c(H.aH(a,b))
return a[b]},
$iscK:1,
$ascK:I.b9,
$ist:1,
$isdO:1,
v:{
fa:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dt:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cr(a,b)
if(y!==32&&y!==13&&!J.fa(y))break;++b}return b},
lx:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cJ(a,z)
if(y!==32&&y!==13&&!J.fa(y))break}return b}}}}],["","",,H,{"^":"",
hD:function(a){return a},
ae:function(){return new P.z("No element")},
ds:function(){return new P.z("Too many elements")},
f4:function(){return new P.z("Too few elements")},
ce:function(a,b,c,d){if(c-b<=32)H.fU(a,b,c,d)
else H.fT(a,b,c,d)},
fU:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.I(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a7(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
fT:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bI(c-b+1,6)
y=b+z
x=c-z
w=C.e.bI(b+c,2)
v=w-z
u=w+z
t=J.I(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.a7(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a7(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a7(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a7(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a7(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a7(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a7(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a7(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a7(d.$2(p,o),0)){n=o
o=p
p=n}t.n(a,y,s)
t.n(a,w,q)
t.n(a,x,o)
t.n(a,v,t.j(a,b))
t.n(a,u,t.j(a,c))
m=b+1
l=c-1
if(J.f(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.j(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.u(i,0))continue
if(h.aR(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.aj(i)
if(h.b7(i,0)){--l
continue}else{g=l-1
if(h.aR(i,0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.bU(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.a7(d.$2(j,p),0))for(;!0;)if(J.a7(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bU(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
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
H.ce(a,b,m-2,d)
H.ce(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.f(d.$2(t.j(a,m),r),0);)++m
for(;J.f(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.f(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.f(d.$2(j,p),0))for(;!0;)if(J.f(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bU(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.ce(a,m,l,d)}else H.ce(a,m,l,d)},
Y:{"^":"w;$ti"},
aV:{"^":"Y;$ti",
gW:function(a){return new H.dC(this,this.gm(this),0,null,[H.y(this,"aV",0)])},
U:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gT:function(a){return this.gm(this)===0},
gB:function(a){if(this.gm(this)===0)throw H.c(H.ae())
return this.as(0,this.gm(this)-1)},
a3:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(J.f(this.as(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bc:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
ca:function(a,b){var z,y,x,w
z=this.gm(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gm(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c1:function(a,b){return this.dW(0,b)},
aO:function(a,b){return new H.ao(this,b,[H.y(this,"aV",0),null])},
bl:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gm(this))throw H.c(new P.C(this))}return y},
bD:function(a,b){var z,y,x,w
z=[H.y(this,"aV",0)]
if(b){y=H.p([],z)
C.a.sm(y,this.gm(this))}else{x=new Array(this.gm(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gm(this);++w){z=this.as(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
cl:function(a){return this.bD(a,!0)},
bE:function(a){var z,y
z=P.Z(null,null,null,H.y(this,"aV",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.as(0,y))
return z}},
oD:{"^":"aV;a,b,c,$ti",
gim:function(){var z=J.aK(this.a)
return z},
giT:function(){var z,y
z=J.aK(this.a)
y=this.b
if(y>z)return z
return y},
gm:function(a){var z,y
z=J.aK(this.a)
y=this.b
if(y>=z)return 0
return z-y},
as:function(a,b){var z,y
z=this.giT()+b
if(!(b<0)){y=this.gim()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cH(b,this,"index",null,null))
return J.eH(this.a,z)},
bD:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.I(y)
w=x.gm(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.p([],u)
C.a.sm(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.p(s,u)}for(r=0;r<v;++r){u=x.as(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gm(y)<w)throw H.c(new P.C(this))}return t},
hZ:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a5(z,0,null,"start",null))},
v:{
h1:function(a,b,c,d){var z=new H.oD(a,b,c,[d])
z.hZ(a,b,c,d)
return z}}},
dC:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gm(z)
if(this.b!==y)throw H.c(new P.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.as(0,x);++this.c
return!0}},
dF:{"^":"w;a,b,$ti",
gW:function(a){return new H.m1(null,J.am(this.a),this.b,this.$ti)},
gm:function(a){return J.aK(this.a)},
gT:function(a){return J.eI(this.a)},
gB:function(a){return this.b.$1(J.iK(this.a))},
$asw:function(a,b){return[b]},
v:{
bA:function(a,b,c,d){if(!!J.o(a).$isY)return new H.by(a,b,[c,d])
return new H.dF(a,b,[c,d])}}},
by:{"^":"dF;a,b,$ti",$isY:1,
$asY:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
m1:{"^":"cJ;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascJ:function(a,b){return[b]}},
ao:{"^":"aV;a,b,$ti",
gm:function(a){return J.aK(this.a)},
as:function(a,b){return this.b.$1(J.eH(this.a,b))},
$asaV:function(a,b){return[b]},
$asY:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
J:{"^":"w;a,b,$ti",
gW:function(a){return new H.cf(J.am(this.a),this.b,this.$ti)},
aO:function(a,b){return new H.dF(this,b,[H.m(this,0),null])}},
cf:{"^":"cJ;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fM:{"^":"w;a,b,$ti",
gW:function(a){return new H.nK(J.am(this.a),this.b,this.$ti)},
v:{
nJ:function(a,b,c){if(!!J.o(a).$isY)return new H.kL(a,H.hD(b),[c])
return new H.fM(a,H.hD(b),[c])}}},
kL:{"^":"fM;a,b,$ti",
gm:function(a){var z=J.aK(this.a)-this.b
if(z>=0)return z
return 0},
$isY:1},
nK:{"^":"cJ;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gG:function(){return this.a.gG()}},
kM:{"^":"d;$ti",
t:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
ck:function(a,b){var z=a.cL(b)
if(!init.globalState.d.cy)init.globalState.f.bt()
return z},
iv:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isL)throw H.c(P.D("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qt(0,0,1,null,null,null,null,null,null,null,null,null,a)
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
y.f=new H.q2(P.b3(null,H.ci),0)
x=P.u
y.z=new H.R(0,null,null,null,null,null,0,[x,H.ed])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qs()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lp,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qu)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.Z(null,null,null,x)
v=new H.cb(0,null,!1)
u=new H.ed(y,new H.R(0,null,null,null,null,null,0,[x,H.cb]),w,init.createNewIsolate(),v,new H.bc(H.da()),new H.bc(H.da()),!1,!1,[],P.Z(null,null,null,null),null,null,!1,!0,P.Z(null,null,null,null))
w.q(0,0)
u.dY(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cL(new H.uW(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cL(new H.uX(z,a))
else u.cL(a)
init.globalState.f.bt()},
lt:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lu()
return},
lu:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.T("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.T('Cannot extract URI from "'+z+'"'))},
lp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d_(!0,[]).bT(b.data)
y=J.I(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d_(!0,[]).bT(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d_(!0,[]).bT(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.Z(null,null,null,q)
o=new H.cb(0,null,!1)
n=new H.ed(y,new H.R(0,null,null,null,null,null,0,[q,H.cb]),p,init.createNewIsolate(),o,new H.bc(H.da()),new H.bc(H.da()),!1,!1,[],P.Z(null,null,null,null),null,null,!1,!0,P.Z(null,null,null,null))
p.q(0,0)
n.dY(0,o)
init.globalState.f.a.aA(new H.ci(n,new H.lq(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bt()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").E(y.j(z,"msg"))
init.globalState.f.bt()
break
case"close":init.globalState.ch.a9(0,$.$get$f3().j(0,a))
a.terminate()
init.globalState.f.bt()
break
case"log":H.lo(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aa(["command","print","msg",z])
q=new H.bp(!0,P.bN(null,P.u)).bf(q)
y.toString
self.postMessage(q)}else P.ey(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lo:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aa(["command","log","msg",a])
x=new H.bp(!0,P.bN(null,P.u)).bf(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.B(w)
y=P.cD(z)
throw H.c(y)}},
lr:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fx=$.fx+("_"+y)
$.fy=$.fy+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.cj(y,x),w,z.r])
x=new H.ls(a,b,c,d,z)
if(e===!0){z.fH(w,w)
init.globalState.f.a.aA(new H.ci(z,x,"start isolate"))}else x.$0()},
qY:function(a){return new H.d_(!0,[]).bT(new H.bp(!1,P.bN(null,P.u)).bf(a))},
uW:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
uX:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qt:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
qu:function(a){var z=P.aa(["command","print","msg",a])
return new H.bp(!0,P.bN(null,P.u)).bf(z)}}},
ed:{"^":"d;i:a<,b,c,kc:d<,jo:e<,f,r,x,cO:y<,z,Q,ch,cx,cy,db,dx",
fH:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cE()},
ky:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a9(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fG(x)}this.y=!1}this.cE()},
jb:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kv:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.T("removeRange"))
P.ca(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hH:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jM:function(a,b,c){var z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b3(null,null)
this.cx=z}z.aA(new H.qj(a,c))},
jL:function(a,b){var z
if(!this.r.u(0,a))return
z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.eG()
return}z=this.cx
if(z==null){z=P.b3(null,null)
this.cx=z}z.aA(this.gkd())},
jN:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ey(a)
if(b!=null)P.ey(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ai(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.E(y)},
cL:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.A(u)
v=H.B(u)
this.jN(w,v)
if(this.db===!0){this.eG()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gkc()
if(this.cx!=null)for(;t=this.cx,!t.gT(t);)this.cx.dE().$0()}return y},
cd:function(a){return this.b.j(0,a)},
dY:function(a,b){var z=this.b
if(z.a6(a))throw H.c(P.cD("Registry: ports must be registered only once."))
z.n(0,a,b)},
cE:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eG()},
eG:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b4(0)
for(z=this.b,y=z.gcm(),y=y.gW(y);y.t();)y.gG().ig()
z.b4(0)
this.c.b4(0)
init.globalState.z.a9(0,this.a)
this.dx.b4(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.E(z[v])}this.ch=null}},"$0","gkd",0,0,6]},
qj:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
q2:{"^":"d;a,b",
jt:function(){var z=this.a
if(z.b===z.c)return
return z.dE()},
hl:function(){var z,y,x
z=this.jt()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a6(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gT(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cD("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gT(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aa(["command","close"])
x=new H.bp(!0,new P.hy(0,null,null,null,null,null,0,[null,P.u])).bf(x)
y.toString
self.postMessage(x)}return!1}z.kt()
return!0},
fw:function(){if(self.window!=null)new H.q3(this).$0()
else for(;this.hl(););},
bt:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fw()
else try{this.fw()}catch(x){z=H.A(x)
y=H.B(x)
w=init.globalState.Q
v=P.aa(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bp(!0,P.bN(null,P.u)).bf(v)
w.toString
self.postMessage(v)}}},
q3:{"^":"a:6;a",
$0:function(){if(!this.a.hl())return
P.p6(C.x,this)}},
ci:{"^":"d;a,b,c",
kt:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cL(this.b)}},
qs:{"^":"d;"},
lq:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.lr(this.a,this.b,this.c,this.d,this.e,this.f)}},
ls:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cE()}},
hs:{"^":"d;"},
cj:{"^":"hs;b,a",
E:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfl())return
x=H.qY(a)
if(z.gjo()===y){y=J.I(x)
switch(y.j(x,0)){case"pause":z.fH(y.j(x,1),y.j(x,2))
break
case"resume":z.ky(y.j(x,1))
break
case"add-ondone":z.jb(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kv(y.j(x,1))
break
case"set-errors-fatal":z.hH(y.j(x,1),y.j(x,2))
break
case"ping":z.jM(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.jL(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a9(0,y)
break}return}init.globalState.f.a.aA(new H.ci(z,new H.qw(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.cj&&J.f(this.b,b.b)},
gw:function(a){return this.b.gea()}},
qw:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfl())z.i4(this.b)}},
eg:{"^":"hs;b,c,a",
E:function(a){var z,y,x
z=P.aa(["command","message","port",this,"msg",a])
y=new H.bp(!0,P.bN(null,P.u)).bf(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.eg&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eX()
y=this.a
if(typeof y!=="number")return y.eX()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cb:{"^":"d;ea:a<,b,fl:c<",
ig:function(){this.c=!0
this.b=null},
bj:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a9(0,y)
z.c.a9(0,y)
z.cE()},
i4:function(a){if(this.c)return
this.b.$1(a)},
$ismX:1},
mY:{"^":"ah;a,b",
aD:function(a,b,c,d){var z=this.b
z.toString
return new P.cZ(z,[H.m(z,0)]).aD(a,b,c,d)},
eJ:function(a,b,c){return this.aD(a,null,b,c)},
bj:[function(){this.a.bj()
this.b.bj()},"$0","gjk",0,0,6],
hX:function(a){var z=new P.qL(null,0,null,null,null,null,this.gjk(),[null])
this.b=z
this.a.b=z.gj1(z)},
$asah:I.b9},
p2:{"^":"d;a,b,c",
gc9:function(){return this.c!=null},
i_:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aA(new H.ci(y,new H.p4(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d7(new H.p5(this,b),0),a)}else throw H.c(new P.T("Timer greater than 0."))},
v:{
p3:function(a,b){var z=new H.p2(!0,!1,null)
z.i_(a,b)
return z}}},
p4:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
p5:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bc:{"^":"d;ea:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.kZ()
z=C.j.dk(z,0)^C.j.bI(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bc){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bp:{"^":"d;a,b",
bf:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gm(z))
z=J.o(a)
if(!!z.$iscK)return this.hD(a)
if(!!z.$islm){x=this.ghA()
z=a.gcb()
z=H.bA(z,x,H.y(z,"w",0),null)
z=P.S(z,!0,H.y(z,"w",0))
w=a.gcm()
w=H.bA(w,x,H.y(w,"w",0),null)
return["map",z,P.S(w,!0,H.y(w,"w",0))]}if(!!z.$isf9)return this.hE(a)
if(!!z.$isaT)this.ho(a)
if(!!z.$ismX)this.cZ(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscj)return this.hF(a)
if(!!z.$iseg)return this.hG(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cZ(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbc)return["capability",a.a]
if(!(a instanceof P.d))this.ho(a)
return["dart",init.classIdExtractor(a),this.hC(init.classFieldsExtractor(a))]},"$1","ghA",2,0,0],
cZ:function(a,b){throw H.c(new P.T((b==null?"Can't transmit:":b)+" "+H.b(a)))},
ho:function(a){return this.cZ(a,null)},
hD:function(a){var z=this.hB(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cZ(a,"Can't serialize indexable: ")},
hB:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.bf(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hC:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bf(a[z]))
return a},
hE:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cZ(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.bf(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hG:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hF:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gea()]
return["raw sendport",a]}},
d_:{"^":"d;a,b",
bT:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.D("Bad serialized message: "+H.b(a)))
switch(C.a.gez(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.p(this.cK(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cK(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cK(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cK(x),[null])
y.fixed$length=Array
return y
case"map":return this.jw(a)
case"sendport":return this.jx(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jv(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.bc(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cK(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gju",2,0,0],
cK:function(a){var z,y,x
z=J.I(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.n(a,y,this.bT(z.j(a,y)));++y}return a},
jw:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aC()
this.b.push(w)
y=J.eJ(y,this.gju()).cl(0)
for(z=J.I(y),v=J.I(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.e(y,u)
w.n(0,y[u],this.bT(v.j(x,u)))}return w},
jx:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.cd(w)
if(u==null)return
t=new H.cj(u,x)}else t=new H.eg(y,w,x)
this.b.push(t)
return t},
jv:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.I(y)
v=J.I(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.j(y,u)]=this.bT(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
jR:function(){throw H.c(new P.T("Cannot modify unmodifiable Map"))},
u3:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.U(a))
return z},
aD:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bD:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.K||!!J.o(a).$isbn){v=C.N(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cr(w,0)===36)w=C.b.bG(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d9(H.cn(a),0,null),init.mangledGlobalNames)},
cO:function(a){return"Instance of '"+H.bD(a)+"'"},
ap:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dk(z,10))>>>0,56320|z&1023)}throw H.c(P.a5(a,0,1114111,null,null))},
bi:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mP:function(a){var z=H.bi(a).getFullYear()+0
return z},
mN:function(a){var z=H.bi(a).getMonth()+1
return z},
mJ:function(a){var z=H.bi(a).getDate()+0
return z},
mK:function(a){var z=H.bi(a).getHours()+0
return z},
mM:function(a){var z=H.bi(a).getMinutes()+0
return z},
mO:function(a){var z=H.bi(a).getSeconds()+0
return z},
mL:function(a){var z=H.bi(a).getMilliseconds()+0
return z},
dR:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.U(a))
return a[b]},
fz:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.U(a))
a[b]=c},
x:function(a){throw H.c(H.U(a))},
e:function(a,b){if(a==null)J.aK(a)
throw H.c(H.aH(a,b))},
aH:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b_(!0,b,"index",null)
z=J.aK(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cH(b,a,"index",null,z)
return P.c9(b,"index",null)},
U:function(a){return new P.b_(!0,a,null,null)},
d5:function(a){if(typeof a!=="number")throw H.c(H.U(a))
return a},
ri:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.U(a))
return a},
bt:function(a){if(typeof a!=="string")throw H.c(H.U(a))
return a},
c:function(a){var z
if(a==null)a=new P.cM()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iC})
z.name=""}else z.toString=H.iC
return z},
iC:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.C(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.vE(a)
if(a==null)return
if(a instanceof H.dp)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dk(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dw(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fo(v,null))}}if(a instanceof TypeError){u=$.$get$hb()
t=$.$get$hc()
s=$.$get$hd()
r=$.$get$he()
q=$.$get$hi()
p=$.$get$hj()
o=$.$get$hg()
$.$get$hf()
n=$.$get$hl()
m=$.$get$hk()
l=u.bn(y)
if(l!=null)return z.$1(H.dw(y,l))
else{l=t.bn(y)
if(l!=null){l.method="call"
return z.$1(H.dw(y,l))}else{l=s.bn(y)
if(l==null){l=r.bn(y)
if(l==null){l=q.bn(y)
if(l==null){l=p.bn(y)
if(l==null){l=o.bn(y)
if(l==null){l=r.bn(y)
if(l==null){l=n.bn(y)
if(l==null){l=m.bn(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fo(y,l==null?null:l.method))}}return z.$1(new H.pa(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fV()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b_(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fV()
return a},
B:function(a){var z
if(a instanceof H.dp)return a.b
if(a==null)return new H.hA(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hA(a,null)},
uk:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aD(a)},
tN:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
u8:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ck(b,new H.u9(a))
case 1:return H.ck(b,new H.ua(a,d))
case 2:return H.ck(b,new H.ub(a,d,e))
case 3:return H.ck(b,new H.uc(a,d,e,f))
case 4:return H.ck(b,new H.ud(a,d,e,f,g))}throw H.c(P.cD("Unsupported number of arguments for wrapped closure"))},
d7:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.u8)
a.$identity=z
return z},
jN:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isL){z.$reflectionInfo=c
x=H.n_(z).r}else x=c
w=d?Object.create(new H.o9().constructor.prototype):Object.create(new H.de(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aL
$.aL=J.al(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eV(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.u3,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eQ:H.df
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eV(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jK:function(a,b,c,d){var z=H.df
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eV:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jM(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jK(y,!w,z,b)
if(y===0){w=$.aL
$.aL=J.al(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bx
if(v==null){v=H.cx("self")
$.bx=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aL
$.aL=J.al(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bx
if(v==null){v=H.cx("self")
$.bx=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jL:function(a,b,c,d){var z,y
z=H.df
y=H.eQ
switch(b?-1:a){case 0:throw H.c(new H.na("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jM:function(a,b){var z,y,x,w,v,u,t,s
z=H.jB()
y=$.eP
if(y==null){y=H.cx("receiver")
$.eP=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jL(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aL
$.aL=J.al(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aL
$.aL=J.al(u,1)
return new Function(y+H.b(u)+"}")()},
ep:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jN(a,b,z,!!d,e,f)},
is:function(a,b){var z=J.I(b)
throw H.c(H.cz(H.bD(a),z.aF(b,3,z.gm(b))))},
a2:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.is(a,b)},
uh:function(a,b){if(!!J.o(a).$isL||a==null)return a
if(J.o(a)[b])return a
H.is(a,b)},
es:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.es(a)
return z==null?!1:H.ew(z,b)},
i3:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.X(b,null)
y=H.es(a)
throw H.c(H.cz(y!=null?H.X(y,null):H.bD(a),z))},
vC:function(a){throw H.c(new P.k3(a))},
da:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b8:function(a){return new H.av(a,null)},
p:function(a,b){a.$ti=b
return a},
cn:function(a){if(a==null)return
return a.$ti},
i8:function(a,b){return H.eF(a["$as"+H.b(b)],H.cn(a))},
y:function(a,b,c){var z=H.i8(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cn(a)
return z==null?null:z[b]},
X:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d9(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.X(z,b)
return H.r2(a,b)}return"unknown-reified-type"},
r2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.X(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.X(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.X(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tM(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.X(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d9:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bK("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.A=v+", "
u=a[y]
if(u!=null)w=!1
v=z.A+=H.X(u,c)}return w?"":"<"+z.k(0)+">"},
i9:function(a){var z,y
if(a instanceof H.a){z=H.es(a)
if(z!=null)return H.X(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.d9(a.$ti,0,null)},
eF:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aQ:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cn(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hS(H.eF(y[d],z),c)},
aJ:function(a,b,c,d){if(a==null)return a
if(H.aQ(a,b,c,d))return a
throw H.c(H.cz(H.bD(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d9(c,0,null),init.mangledGlobalNames)))},
hS:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ak(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return a.apply(b,H.i8(b,c))},
d6:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cn(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ew(x.apply(a,null),b)}return H.ak(y,b)},
iz:function(a,b){if(a!=null&&!H.d6(a,b))throw H.c(H.cz(H.bD(a),H.X(b,null)))
return a},
ak:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.ew(a,b)
if('func' in a)return b.builtin$cls==="bz"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.X(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hS(H.eF(u,z),x)},
hR:function(a,b,c){var z,y,x,w,v
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
rc:function(a,b){var z,y,x,w,v,u
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
ew:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hR(x,w,!1))return!1
if(!H.hR(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ak(o,n)||H.ak(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ak(o,n)||H.ak(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ak(o,n)||H.ak(n,o)))return!1}}return H.rc(a.named,b.named)},
vx:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdu){z=C.b.bG(a,c)
return b.b.test(z)}else{z=z.es(b,C.b.bG(a,c))
return!z.gT(z)}}},
vz:function(a,b,c,d){var z,y,x
z=b.ff(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eE(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bt(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
wj:[function(a){return a},"$1","hE",2,0,23],
vy:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdO)throw H.c(P.cu(b,"pattern","is not a Pattern"))
for(z=z.es(b,a),z=new H.hq(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hE().$1(C.b.aF(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hE().$1(C.b.bG(a,y)))
return z.charCodeAt(0)==0?z:z},
iy:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eE(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdu)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.vz(a,b,c,d)
if(b==null)H.i(H.U(b))
y=y.dq(b,a,d)
x=y.gW(y)
if(!x.t())return a
w=x.gG()
y=w.gf0()
v=w.gfR()
H.bt(c)
u=P.ca(y,v,a.length,null,null,null)
H.ri(u)
return H.eE(a,y,u,c)},
eE:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jQ:{"^":"d;$ti",
gT:function(a){return this.gm(this)===0},
gaq:function(a){return this.gm(this)!==0},
k:function(a){return P.dG(this)},
n:function(a,b,c){return H.jR()},
$isG:1},
jS:{"^":"jQ;a,b,c,$ti",
gm:function(a){return this.a},
a6:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.a6(b))return
return this.fg(b)},
fg:function(a){return this.b[a]},
U:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fg(w))}}},
mZ:{"^":"d;a,b,c,d,e,f,r,x",v:{
n_:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.mZ(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
p7:{"^":"d;a,b,c,d,e,f",
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
v:{
aM:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.p7(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cY:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hh:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fo:{"^":"a4;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lz:{"^":"a4;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
dw:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lz(a,y,z?null:b.receiver)}}},
pa:{"^":"a4;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dp:{"^":"d;a,bg:b<"},
vE:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa4)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hA:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
u9:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
ua:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ub:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uc:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ud:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bD(this).trim()+"'"},
ghw:function(){return this},
$isbz:1,
ghw:function(){return this}},
h7:{"^":"a;"},
o9:{"^":"h7;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
de:{"^":"h7;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.de))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.aD(this.a)
else y=typeof z!=="object"?J.j(z):H.aD(z)
z=H.aD(this.b)
if(typeof y!=="number")return y.l_()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cO(z)},
v:{
df:function(a){return a.a},
eQ:function(a){return a.c},
jB:function(){var z=$.bx
if(z==null){z=H.cx("self")
$.bx=z}return z},
cx:function(a){var z,y,x,w,v
z=new H.de("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jG:{"^":"a4;a",
k:function(a){return this.a},
v:{
cz:function(a,b){return new H.jG("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
na:{"^":"a4;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
av:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gw:function(a){return J.j(this.a)},
u:function(a,b){if(b==null)return!1
return b instanceof H.av&&J.f(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gm:function(a){return this.a},
gT:function(a){return this.a===0},
gaq:function(a){return!this.gT(this)},
gcb:function(){return new H.lQ(this,[H.m(this,0)])},
gcm:function(){return H.bA(this.gcb(),new H.ly(this),H.m(this,0),H.m(this,1))},
a6:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fb(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fb(y,a)}else return this.jY(a)},
jY:function(a){var z=this.d
if(z==null)return!1
return this.cN(this.dg(z,this.cM(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cu(z,b)
return y==null?null:y.gbV()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cu(x,b)
return y==null?null:y.gbV()}else return this.jZ(b)},
jZ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dg(z,this.cM(a))
x=this.cN(y,a)
if(x<0)return
return y[x].gbV()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ec()
this.b=z}this.f5(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ec()
this.c=y}this.f5(y,b,c)}else this.k0(b,c)},
k0:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ec()
this.d=z}y=this.cM(a)
x=this.dg(z,y)
if(x==null)this.en(z,y,[this.ed(a,b)])
else{w=this.cN(x,a)
if(w>=0)x[w].sbV(b)
else x.push(this.ed(a,b))}},
ku:function(a,b){var z
if(this.a6(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a9:function(a,b){if(typeof b==="string")return this.fv(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fv(this.c,b)
else return this.k_(b)},
k_:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dg(z,this.cM(a))
x=this.cN(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fA(w)
return w.gbV()},
b4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
U:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.C(this))
z=z.c}},
f5:function(a,b,c){var z=this.cu(a,b)
if(z==null)this.en(a,b,this.ed(b,c))
else z.sbV(c)},
fv:function(a,b){var z
if(a==null)return
z=this.cu(a,b)
if(z==null)return
this.fA(z)
this.fc(a,b)
return z.gbV()},
ed:function(a,b){var z,y
z=new H.lP(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fA:function(a){var z,y
z=a.giI()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cM:function(a){return J.j(a)&0x3ffffff},
cN:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gfY(),b))return y
return-1},
k:function(a){return P.dG(this)},
cu:function(a,b){return a[b]},
dg:function(a,b){return a[b]},
en:function(a,b,c){a[b]=c},
fc:function(a,b){delete a[b]},
fb:function(a,b){return this.cu(a,b)!=null},
ec:function(){var z=Object.create(null)
this.en(z,"<non-identifier-key>",z)
this.fc(z,"<non-identifier-key>")
return z},
$islm:1,
$isG:1,
v:{
fc:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
ly:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
lP:{"^":"d;fY:a<,bV:b@,c,iI:d<,$ti"},
lQ:{"^":"Y;a,$ti",
gm:function(a){return this.a.a},
gT:function(a){return this.a.a===0},
gW:function(a){var z,y
z=this.a
y=new H.lR(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a3:function(a,b){return this.a.a6(b)},
U:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.C(z))
y=y.c}}},
lR:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
du:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giE:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dv(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giD:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dv(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dq:function(a,b,c){if(c>b.length)throw H.c(P.a5(c,0,b.length,null,null))
return new H.pJ(this,b,c)},
es:function(a,b){return this.dq(a,b,0)},
ff:function(a,b){var z,y
z=this.giE()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hz(this,y)},
io:function(a,b){var z,y
z=this.giD()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.hz(this,y)},
h1:function(a,b,c){if(c>b.length)throw H.c(P.a5(c,0,b.length,null,null))
return this.io(b,c)},
$isdO:1,
v:{
dv:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f1("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hz:{"^":"d;a,b",
gf0:function(){return this.b.index},
gfR:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isbh:1},
pJ:{"^":"c2;a,b,c",
gW:function(a){return new H.hq(this.a,this.b,this.c,null)},
$asc2:function(){return[P.bh]},
$asw:function(){return[P.bh]}},
hq:{"^":"d;a,b,c,d",
gG:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.ff(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
h0:{"^":"d;f0:a<,b,c",
gfR:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.c9(b,null,null))
return this.c},
$isbh:1},
qH:{"^":"w;a,b,c",
gW:function(a){return new H.qI(this.a,this.b,this.c,null)},
$asw:function(){return[P.bh]}},
qI:{"^":"d;a,b,c,d",
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
this.d=new H.h0(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
tM:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
ur:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pK:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rd()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d7(new P.pM(z),1)).observe(y,{childList:true})
return new P.pL(z,y,x)}else if(self.setImmediate!=null)return P.re()
return P.rf()},
wd:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d7(new P.pN(a),0))},"$1","rd",2,0,14],
we:[function(a){++init.globalState.f.b
self.setImmediate(H.d7(new P.pO(a),0))},"$1","re",2,0,14],
wf:[function(a){P.e3(C.x,a)},"$1","rf",2,0,14],
aG:function(a,b){P.eh(null,a)
return b.gfV()},
aw:function(a,b){P.eh(a,b)},
aF:function(a,b){b.bS(a)},
aE:function(a,b){b.ew(H.A(a),H.B(a))},
eh:function(a,b){var z,y,x,w
z=new P.qS(b)
y=new P.qT(b)
x=J.o(a)
if(!!x.$isF)a.eo(z,y)
else if(!!x.$isQ)a.eQ(z,y)
else{w=new P.F(0,$.r,null,[null])
w.a=4
w.c=a
w.eo(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rb(z)},
d2:function(a,b,c){var z,y,x
if(b===0){if(c.geC())c.c.ev()
else c.a.bj()
return}else if(b===1){if(c.geC())c.c.ew(H.A(a),H.B(a))
else{z=H.A(a)
y=H.B(a)
c.a.eq(z,y)
c.a.bj()}return}if(a instanceof P.bL){if(c.geC()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aS(c.a,z)
P.cp(new P.qQ(b,c))
return}else if(z===1){x=a.a
c.a.jf(x,!1).bZ(new P.qR(b,c))
return}}P.eh(a,b)},
ra:function(a){return a.gdU()},
em:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aB:function(a){return new P.qJ(new P.F(0,$.r,null,[a]),[a])},
r0:function(a,b,c){$.r.toString
a.ba(b,c)},
r4:function(){var z,y
for(;z=$.bq,z!=null;){$.bP=null
y=z.gce()
$.bq=y
if(y==null)$.bO=null
z.gjh().$0()}},
wi:[function(){$.ei=!0
try{P.r4()}finally{$.bP=null
$.ei=!1
if($.bq!=null)$.$get$e7().$1(P.hT())}},"$0","hT",0,0,6],
hN:function(a){var z=new P.hr(a,null)
if($.bq==null){$.bO=z
$.bq=z
if(!$.ei)$.$get$e7().$1(P.hT())}else{$.bO.b=z
$.bO=z}},
r9:function(a){var z,y,x
z=$.bq
if(z==null){P.hN(a)
$.bP=$.bO
return}y=new P.hr(a,null)
x=$.bP
if(x==null){y.b=z
$.bP=y
$.bq=y}else{y.b=x.b
x.b=y
$.bP=y
if(y.b==null)$.bO=y}},
cp:function(a){var z=$.r
if(C.h===z){P.bs(null,null,C.h,a)
return}z.toString
P.bs(null,null,z,z.eu(a,!0))},
wa:function(a,b){return new P.qG(null,a,!1,[b])},
en:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.A(x)
y=H.B(x)
w=$.r
w.toString
P.br(null,null,w,z,y)}},
r5:[function(a,b){var z=$.r
z.toString
P.br(null,null,z,a,b)},function(a){return P.r5(a,null)},"$2","$1","rh",2,2,15,0],
wh:[function(){},"$0","rg",0,0,6],
hM:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.A(u)
y=H.B(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbk()
w=t
v=x.gbg()
c.$2(w,v)}}},
qU:function(a,b,c,d){var z=a.c8()
if(!!J.o(z).$isQ&&z!==$.$get$be())z.c0(new P.qW(b,c,d))
else b.ba(c,d)},
hB:function(a,b){return new P.qV(a,b)},
hC:function(a,b,c){var z=a.c8()
if(!!J.o(z).$isQ&&z!==$.$get$be())z.c0(new P.qX(b,c))
else b.b9(c)},
qP:function(a,b,c){$.r.toString
a.c5(b,c)},
p6:function(a,b){var z=$.r
if(z===C.h){z.toString
return P.e3(a,b)}return P.e3(a,z.eu(b,!0))},
e3:function(a,b){var z=C.e.bI(a.a,1000)
return H.p3(z<0?0:z,b)},
pk:function(){return $.r},
br:function(a,b,c,d,e){var z={}
z.a=d
P.r9(new P.r7(z,e))},
hJ:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
hL:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
hK:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bs:function(a,b,c,d){var z=C.h!==c
if(z)d=c.eu(d,!(!z||!1))
P.hN(d)},
pM:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pL:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pN:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pO:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qS:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qT:{"^":"a:20;a",
$2:function(a,b){this.a.$2(1,new H.dp(a,b))}},
rb:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
qQ:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcO()){z.b=!0
return}this.a.$2(null,0)}},
qR:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pP:{"^":"d;a,b,c",
gdU:function(){return this.a.gdU()},
gcO:function(){return this.a.gcO()},
geC:function(){return this.c!=null},
q:function(a,b){return J.aS(this.a,b)},
eq:function(a,b){return this.a.eq(a,b)},
bj:function(){return this.a.bj()},
i1:function(a){var z=new P.pS(a)
this.a=new P.pX(null,0,null,new P.pU(z),null,new P.pV(this,z),new P.pW(this,a),[null])},
v:{
pQ:function(a){var z=new P.pP(null,!1,null)
z.i1(a)
return z}}},
pS:{"^":"a:1;a",
$0:function(){P.cp(new P.pT(this.a))}},
pT:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pU:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pV:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
pW:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gk9()){z.c=new P.cg(new P.F(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cp(new P.pR(this.b))}return z.c.gfV()}}},
pR:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bL:{"^":"d;aa:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bM:function(a){return new P.bL(a,1)},
aN:function(){return C.ac},
hw:function(a){return new P.bL(a,0)},
aO:function(a){return new P.bL(a,3)}}},
b6:{"^":"d;a,b,c,d",
gG:function(){var z=this.c
return z==null?this.b:z.gG()},
t:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.t())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bL){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.am(z)
if(!!w.$isb6){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qK:{"^":"c2;a",
gW:function(a){return new P.b6(this.a(),null,null,null)},
$asc2:I.b9,
$asw:I.b9,
v:{
aP:function(a){return new P.qK(a)}}},
Q:{"^":"d;$ti"},
ht:{"^":"d;fV:a<,$ti",
ew:function(a,b){if(a==null)a=new P.cM()
if(this.a.a!==0)throw H.c(new P.z("Future already completed"))
$.r.toString
this.ba(a,b)},
dt:function(a){return this.ew(a,null)}},
cg:{"^":"ht;a,$ti",
bS:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.z("Future already completed"))
z.by(a)},
ev:function(){return this.bS(null)},
ba:function(a,b){this.a.f7(a,b)}},
qJ:{"^":"ht;a,$ti",
bS:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.z("Future already completed"))
z.b9(a)},
ev:function(){return this.bS(null)},
ba:function(a,b){this.a.ba(a,b)}},
ec:{"^":"d;ef:a<,b,c,d,e,$ti",
giZ:function(){return this.b.b},
gfX:function(){return(this.c&1)!==0},
gjQ:function(){return(this.c&2)!==0},
gfW:function(){return this.c===8},
jO:function(a){return this.b.b.eP(this.d,a)},
kj:function(a){if(this.c!==6)return!0
return this.b.b.eP(this.d,a.gbk())},
jK:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.kH(z,a.gbk(),a.gbg())
else return y.eP(z,a.gbk())},
jP:function(){return this.b.b.hj(this.d)}},
F:{"^":"d;cC:a<,b,iN:c<,$ti",
giy:function(){return this.a===2},
geb:function(){return this.a>=4},
eQ:function(a,b){var z=$.r
if(z!==C.h){z.toString
if(b!=null)b=P.em(b,z)}return this.eo(a,b)},
bZ:function(a){return this.eQ(a,null)},
eo:function(a,b){var z,y
z=new P.F(0,$.r,null,[null])
y=b==null?1:3
this.da(new P.ec(null,z,y,a,b,[H.m(this,0),null]))
return z},
c0:function(a){var z,y
z=$.r
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.da(new P.ec(null,y,8,a,null,[z,z]))
return y},
da:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.geb()){y.da(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bs(null,null,z,new P.q6(this,a))}},
fq:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gef()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.geb()){v.fq(a)
return}this.a=v.a
this.c=v.c}z.a=this.di(a)
y=this.b
y.toString
P.bs(null,null,y,new P.qd(z,this))}},
dh:function(){var z=this.c
this.c=null
return this.di(z)},
di:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gef()
z.a=y}return y},
b9:function(a){var z,y
z=this.$ti
if(H.aQ(a,"$isQ",z,"$asQ"))if(H.aQ(a,"$isF",z,null))P.d0(a,this)
else P.hv(a,this)
else{y=this.dh()
this.a=4
this.c=a
P.bo(this,y)}},
ba:[function(a,b){var z=this.dh()
this.a=8
this.c=new P.cv(a,b)
P.bo(this,z)},function(a){return this.ba(a,null)},"l0","$2","$1","gbO",2,2,15,0],
by:function(a){var z
if(H.aQ(a,"$isQ",this.$ti,"$asQ")){this.ib(a)
return}this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.q8(this,a))},
ib:function(a){var z
if(H.aQ(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qc(this,a))}else P.d0(a,this)
return}P.hv(a,this)},
f7:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.q7(this,a,b))},
i3:function(a,b){this.a=4
this.c=a},
$isQ:1,
v:{
hv:function(a,b){var z,y,x
b.a=1
try{a.eQ(new P.q9(b),new P.qa(b))}catch(x){z=H.A(x)
y=H.B(x)
P.cp(new P.qb(b,z,y))}},
d0:function(a,b){var z,y,x
for(;a.giy();)a=a.c
z=a.geb()
y=b.c
if(z){b.c=null
x=b.di(y)
b.a=a.a
b.c=a.c
P.bo(b,x)}else{b.a=2
b.c=a
a.fq(y)}},
bo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbk()
t=v.gbg()
y.toString
P.br(null,null,y,u,t)}return}for(;b.gef()!=null;b=s){s=b.a
b.a=null
P.bo(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfX()||b.gfW()){q=b.giZ()
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
t=v.gbg()
y.toString
P.br(null,null,y,u,t)
return}p=$.r
if(p==null?q!=null:p!==q)$.r=q
else p=null
if(b.gfW())new P.qg(z,x,w,b).$0()
else if(y){if(b.gfX())new P.qf(x,b,r).$0()}else if(b.gjQ())new P.qe(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.di(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d0(y,o)
return}}o=b.b
b=o.dh()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
q6:{"^":"a:1;a,b",
$0:function(){P.bo(this.a,this.b)}},
qd:{"^":"a:1;a,b",
$0:function(){P.bo(this.b,this.a.a)}},
q9:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b9(a)}},
qa:{"^":"a:50;a",
$2:function(a,b){this.a.ba(a,b)},
$1:function(a){return this.$2(a,null)}},
qb:{"^":"a:1;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
q8:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.dh()
z.a=4
z.c=this.b
P.bo(z,y)}},
qc:{"^":"a:1;a,b",
$0:function(){P.d0(this.b,this.a)}},
q7:{"^":"a:1;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
qg:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jP()}catch(w){y=H.A(w)
x=H.B(w)
if(this.c){v=this.a.a.c.gbk()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cv(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.F&&z.gcC()>=4){if(z.gcC()===8){v=this.b
v.b=z.giN()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bZ(new P.qh(t))
v.a=!1}}},
qh:{"^":"a:0;a",
$1:function(a){return this.a}},
qf:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jO(this.c)}catch(x){z=H.A(x)
y=H.B(x)
w=this.a
w.b=new P.cv(z,y)
w.a=!0}}},
qe:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kj(z)===!0&&w.e!=null){v=this.b
v.b=w.jK(z)
v.a=!1}}catch(u){y=H.A(u)
x=H.B(u)
w=this.a
v=w.a.c.gbk()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cv(y,x)
s.a=!0}}},
hr:{"^":"d;jh:a<,ce:b@"},
ah:{"^":"d;$ti",
aO:function(a,b){return new P.qv(b,this,[H.y(this,"ah",0),null])},
a3:function(a,b){var z,y
z={}
y=new P.F(0,$.r,null,[P.a1])
z.a=null
z.a=this.aD(new P.ok(z,this,b,y),!0,new P.ol(y),y.gbO())
return y},
U:function(a,b){var z,y
z={}
y=new P.F(0,$.r,null,[null])
z.a=null
z.a=this.aD(new P.oo(z,this,b,y),!0,new P.op(y),y.gbO())
return y},
gm:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[P.u])
z.a=0
this.aD(new P.ou(z),!0,new P.ov(z,y),y.gbO())
return y},
gT:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[P.a1])
z.a=null
z.a=this.aD(new P.oq(z,y),!0,new P.or(y),y.gbO())
return y},
cl:function(a){var z,y,x
z=H.y(this,"ah",0)
y=H.p([],[z])
x=new P.F(0,$.r,null,[[P.L,z]])
this.aD(new P.ow(this,y),!0,new P.ox(y,x),x.gbO())
return x},
bE:function(a){var z,y,x
z=H.y(this,"ah",0)
y=P.Z(null,null,null,z)
x=new P.F(0,$.r,null,[[P.bF,z]])
this.aD(new P.oy(this,y),!0,new P.oz(y,x),x.gbO())
return x},
gB:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[H.y(this,"ah",0)])
z.a=null
z.b=!1
this.aD(new P.os(z,this),!0,new P.ot(z,y),y.gbO())
return y}},
ok:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hM(new P.oi(this.c,a),new P.oj(z,y),P.hB(z.a,y))},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ah")}},
oi:{"^":"a:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
oj:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hC(this.a.a,this.b,!0)}},
ol:{"^":"a:1;a",
$0:function(){this.a.b9(!1)}},
oo:{"^":"a;a,b,c,d",
$1:function(a){P.hM(new P.om(this.c,a),new P.on(),P.hB(this.a.a,this.d))},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ah")}},
om:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
on:{"^":"a:0;",
$1:function(a){}},
op:{"^":"a:1;a",
$0:function(){this.a.b9(null)}},
ou:{"^":"a:0;a",
$1:function(a){++this.a.a}},
ov:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a.a)}},
oq:{"^":"a:0;a,b",
$1:function(a){P.hC(this.a.a,this.b,!1)}},
or:{"^":"a:1;a",
$0:function(){this.a.b9(!0)}},
ow:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"ah")}},
ox:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a)}},
oy:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"ah")}},
oz:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a)}},
os:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ah")}},
ot:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b9(x.a)
return}try{x=H.ae()
throw H.c(x)}catch(w){z=H.A(w)
y=H.B(w)
P.r0(this.b,z,y)}}},
d1:{"^":"d;cC:b<,$ti",
gdU:function(){return new P.cZ(this,this.$ti)},
gk9:function(){return(this.b&4)!==0},
gcO:function(){var z=this.b
return(z&1)!==0?this.gbH().gfm():(z&2)===0},
giG:function(){if((this.b&8)===0)return this.a
return this.a.gd0()},
e4:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ef(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd0()==null)y.c=new P.ef(null,null,0,this.$ti)
return y.c},
gbH:function(){if((this.b&8)!==0)return this.a.gd0()
return this.a},
cq:function(){if((this.b&4)!==0)return new P.z("Cannot add event after closing")
return new P.z("Cannot add event while adding a stream")},
jf:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cq())
if((z&2)!==0){z=new P.F(0,$.r,null,[null])
z.by(null)
return z}z=this.a
y=new P.F(0,$.r,null,[null])
x=a.aD(this.gi9(),!1,this.gia(),this.gi6())
w=this.b
if((w&1)!==0?this.gbH().gfm():(w&2)===0)x.cR()
this.a=new P.qC(z,y,x,this.$ti)
this.b|=8
return y},
fe:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$be():new P.F(0,$.r,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cq())
this.bN(b)},"$1","gj1",2,0,function(){return H.b7(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d1")}],
eq:function(a,b){if(this.b>=4)throw H.c(this.cq())
if(a==null)a=new P.cM()
$.r.toString
this.c5(a,b)},
bj:function(){var z=this.b
if((z&4)!==0)return this.fe()
if(z>=4)throw H.c(this.cq())
z|=4
this.b=z
if((z&1)!==0)this.cA()
else if((z&3)===0)this.e4().q(0,C.u)
return this.fe()},
bN:[function(a){var z=this.b
if((z&1)!==0)this.cz(a)
else if((z&3)===0)this.e4().q(0,new P.e8(a,null,this.$ti))},"$1","gi9",2,0,function(){return H.b7(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d1")}],
c5:[function(a,b){var z=this.b
if((z&1)!==0)this.cB(a,b)
else if((z&3)===0)this.e4().q(0,new P.e9(a,b,null))},"$2","gi6",4,0,49],
dZ:[function(){var z=this.a
this.a=z.gd0()
this.b&=4294967287
z.a.by(null)},"$0","gia",0,0,6],
iU:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.z("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.q0(this,null,null,null,z,y,null,null,this.$ti)
x.f4(a,b,c,d,H.m(this,0))
w=this.giG()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd0(x)
v.b.cW()}else this.a=x
x.iS(w)
x.e9(new P.qE(this))
return x},
iK:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c8()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.A(v)
x=H.B(v)
u=new P.F(0,$.r,null,[null])
u.f7(y,x)
z=u}else z=z.c0(w)
w=new P.qD(this)
if(z!=null)z=z.c0(w)
else w.$0()
return z}},
qE:{"^":"a:1;a",
$0:function(){P.en(this.a.d)}},
qD:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.by(null)}},
qM:{"^":"d;$ti",
cz:function(a){this.gbH().bN(a)},
cB:function(a,b){this.gbH().c5(a,b)},
cA:function(){this.gbH().dZ()}},
pY:{"^":"d;$ti",
cz:function(a){this.gbH().c6(new P.e8(a,null,[H.m(this,0)]))},
cB:function(a,b){this.gbH().c6(new P.e9(a,b,null))},
cA:function(){this.gbH().c6(C.u)}},
pX:{"^":"d1+pY;a,b,c,d,e,f,r,$ti"},
qL:{"^":"d1+qM;a,b,c,d,e,f,r,$ti"},
cZ:{"^":"qF;a,$ti",
gw:function(a){return(H.aD(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cZ))return!1
return b.a===this.a}},
q0:{"^":"ch;x,a,b,c,d,e,f,r,$ti",
eg:function(){return this.x.iK(this)},
ei:[function(){var z=this.x
if((z.b&8)!==0)z.a.cR()
P.en(z.e)},"$0","geh",0,0,6],
ek:[function(){var z=this.x
if((z.b&8)!==0)z.a.cW()
P.en(z.f)},"$0","gej",0,0,6]},
pH:{"^":"d;$ti",
cR:function(){this.b.cR()},
cW:function(){this.b.cW()},
c8:function(){var z=this.b.c8()
if(z==null){this.a.by(null)
return}return z.c0(new P.pI(this))},
ev:function(){this.a.by(null)}},
pI:{"^":"a:1;a",
$0:function(){this.a.a.by(null)}},
qC:{"^":"pH;d0:c@,a,b,$ti"},
ch:{"^":"d;cC:e<,$ti",
iS:function(a){if(a==null)return
this.r=a
if(!a.gT(a)){this.e=(this.e|64)>>>0
this.r.d4(this)}},
kp:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fJ()
if((z&4)===0&&(this.e&32)===0)this.e9(this.geh())},
cR:function(){return this.kp(null)},
cW:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gT(z)}else z=!1
if(z)this.r.d4(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e9(this.gej())}}}},
c8:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e_()
z=this.f
return z==null?$.$get$be():z},
gfm:function(){return(this.e&4)!==0},
gcO:function(){return this.e>=128},
e_:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fJ()
if((this.e&32)===0)this.r=null
this.f=this.eg()},
bN:["hQ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cz(a)
else this.c6(new P.e8(a,null,[H.y(this,"ch",0)]))}],
c5:["hR",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cB(a,b)
else this.c6(new P.e9(a,b,null))}],
dZ:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cA()
else this.c6(C.u)},
ei:[function(){},"$0","geh",0,0,6],
ek:[function(){},"$0","gej",0,0,6],
eg:function(){return},
c6:function(a){var z,y
z=this.r
if(z==null){z=new P.ef(null,null,0,[H.y(this,"ch",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d4(this)}},
cz:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hm(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
cB:function(a,b){var z,y
z=this.e
y=new P.q_(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e_()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$be())z.c0(y)
else y.$0()}else{y.$0()
this.e1((z&4)!==0)}},
cA:function(){var z,y
z=new P.pZ(this)
this.e_()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$be())y.c0(z)
else z.$0()},
e9:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
e1:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gT(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gT(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ei()
else this.ek()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d4(this)},
f4:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.em(b==null?P.rh():b,z)
this.c=c==null?P.rg():c}},
q_:{"^":"a:6;a,b,c",
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
if(x)w.kI(u,v,this.c)
else w.hm(u,v)
z.e=(z.e&4294967263)>>>0}},
pZ:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hk(z.c)
z.e=(z.e&4294967263)>>>0}},
qF:{"^":"ah;$ti",
aD:function(a,b,c,d){return this.a.iU(a,d,c,!0===b)},
eJ:function(a,b,c){return this.aD(a,null,b,c)}},
ea:{"^":"d;ce:a@,$ti"},
e8:{"^":"ea;aa:b<,a,$ti",
eL:function(a){a.cz(this.b)}},
e9:{"^":"ea;bk:b<,bg:c<,a",
eL:function(a){a.cB(this.b,this.c)},
$asea:I.b9},
q1:{"^":"d;",
eL:function(a){a.cA()},
gce:function(){return},
sce:function(a){throw H.c(new P.z("No events after a done."))}},
qx:{"^":"d;cC:a<,$ti",
d4:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cp(new P.qy(this,a))
this.a=1},
fJ:function(){if(this.a===1)this.a=3}},
qy:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gce()
z.b=w
if(w==null)z.c=null
x.eL(this.b)}},
ef:{"^":"qx;b,c,a,$ti",
gT:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sce(b)
this.c=b}}},
qG:{"^":"d;a,b,c,$ti"},
qW:{"^":"a:1;a,b,c",
$0:function(){return this.a.ba(this.b,this.c)}},
qV:{"^":"a:20;a,b",
$2:function(a,b){P.qU(this.a,this.b,a,b)}},
qX:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b)}},
eb:{"^":"ah;$ti",
aD:function(a,b,c,d){return this.ik(a,d,c,!0===b)},
eJ:function(a,b,c){return this.aD(a,null,b,c)},
ik:function(a,b,c,d){return P.q5(this,a,b,c,d,H.y(this,"eb",0),H.y(this,"eb",1))},
fj:function(a,b){b.bN(a)},
iw:function(a,b,c){c.c5(a,b)},
$asah:function(a,b){return[b]}},
hu:{"^":"ch;x,y,a,b,c,d,e,f,r,$ti",
bN:function(a){if((this.e&2)!==0)return
this.hQ(a)},
c5:function(a,b){if((this.e&2)!==0)return
this.hR(a,b)},
ei:[function(){var z=this.y
if(z==null)return
z.cR()},"$0","geh",0,0,6],
ek:[function(){var z=this.y
if(z==null)return
z.cW()},"$0","gej",0,0,6],
eg:function(){var z=this.y
if(z!=null){this.y=null
return z.c8()}return},
l2:[function(a){this.x.fj(a,this)},"$1","git",2,0,function(){return H.b7(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hu")}],
l4:[function(a,b){this.x.iw(a,b,this)},"$2","giv",4,0,46],
l3:[function(){this.dZ()},"$0","giu",0,0,6],
i2:function(a,b,c,d,e,f,g){this.y=this.x.a.eJ(this.git(),this.giu(),this.giv())},
$asch:function(a,b){return[b]},
v:{
q5:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hu(a,null,null,null,null,z,y,null,null,[f,g])
y.f4(b,c,d,e,g)
y.i2(a,b,c,d,e,f,g)
return y}}},
qv:{"^":"eb;b,a,$ti",
fj:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.A(w)
x=H.B(w)
P.qP(b,y,x)
return}b.bN(z)}},
cv:{"^":"d;bk:a<,bg:b<",
k:function(a){return H.b(this.a)},
$isa4:1},
qO:{"^":"d;"},
r7:{"^":"a:1;a,b",
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
qz:{"^":"qO;",
hk:function(a){var z,y,x,w
try{if(C.h===$.r){x=a.$0()
return x}x=P.hJ(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.br(null,null,this,z,y)
return x}},
hm:function(a,b){var z,y,x,w
try{if(C.h===$.r){x=a.$1(b)
return x}x=P.hL(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.br(null,null,this,z,y)
return x}},
kI:function(a,b,c){var z,y,x,w
try{if(C.h===$.r){x=a.$2(b,c)
return x}x=P.hK(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.br(null,null,this,z,y)
return x}},
eu:function(a,b){if(b)return new P.qA(this,a)
else return new P.qB(this,a)},
j:function(a,b){return},
hj:function(a){if($.r===C.h)return a.$0()
return P.hJ(null,null,this,a)},
eP:function(a,b){if($.r===C.h)return a.$1(b)
return P.hL(null,null,this,a,b)},
kH:function(a,b,c){if($.r===C.h)return a.$2(b,c)
return P.hK(null,null,this,a,b,c)}},
qA:{"^":"a:1;a,b",
$0:function(){return this.a.hk(this.b)}},
qB:{"^":"a:1;a,b",
$0:function(){return this.a.hj(this.b)}}}],["","",,P,{"^":"",
dB:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
aC:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
aa:function(a){return H.tN(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
lw:function(a,b,c){var z,y
if(P.ej(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bQ()
y.push(a)
try{P.r3(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.h_(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c3:function(a,b,c){var z,y,x
if(P.ej(a))return b+"..."+c
z=new P.bK(b)
y=$.$get$bQ()
y.push(a)
try{x=z
x.A=P.h_(x.gA(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.A=y.gA()+c
y=z.gA()
return y.charCodeAt(0)==0?y:y},
ej:function(a){var z,y
for(z=0;y=$.$get$bQ(),z<y.length;++z)if(a===y[z])return!0
return!1},
r3:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gW(a)
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
lS:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
c7:function(a,b,c){var z=P.lS(null,null,null,b,c)
a.U(0,new P.rj(z))
return z},
Z:function(a,b,c,d){return new P.hx(0,null,null,null,null,null,0,[d])},
b1:function(a,b){var z,y
z=P.Z(null,null,null,b)
for(y=J.am(a);y.t();)z.q(0,y.gG())
return z},
dG:function(a){var z,y,x
z={}
if(P.ej(a))return"{...}"
y=new P.bK("")
try{$.$get$bQ().push(a)
x=y
x.A=x.gA()+"{"
z.a=!0
a.U(0,new P.m2(z,y))
z=y
z.A=z.gA()+"}"}finally{z=$.$get$bQ()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gA()
return z.charCodeAt(0)==0?z:z},
hy:{"^":"R;a,b,c,d,e,f,r,$ti",
cM:function(a){return H.uk(a)&0x3ffffff},
cN:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfY()
if(x==null?b==null:x===b)return y}return-1},
v:{
bN:function(a,b){return new P.hy(0,null,null,null,null,null,0,[a,b])}}},
hx:{"^":"qi;a,b,c,d,e,f,r,$ti",
ee:function(){return new P.hx(0,null,null,null,null,null,0,this.$ti)},
gW:function(a){var z=new P.ai(this,this.r,null,null,[null])
z.c=this.e
return z},
gm:function(a){return this.a},
gT:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
a3:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ii(b)},
ii:function(a){var z=this.d
if(z==null)return!1
return this.de(z[this.dd(a)],a)>=0},
cd:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a3(0,a)?a:null
else return this.iA(a)},
iA:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dd(a)]
x=this.de(y,a)
if(x<0)return
return J.aA(y,x).gfd()},
U:function(a,b){var z,y
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
z=y}return this.f8(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.f8(x,b)}else return this.aA(b)},
aA:function(a){var z,y,x
z=this.d
if(z==null){z=P.qr()
this.d=z}y=this.dd(a)
x=z[y]
if(x==null)z[y]=[this.e2(a)]
else{if(this.de(x,a)>=0)return!1
x.push(this.e2(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.f9(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f9(this.c,b)
else return this.iL(b)},
iL:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dd(a)]
x=this.de(y,a)
if(x<0)return!1
this.fa(y.splice(x,1)[0])
return!0},
iq:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.C(this))
if(b===v)this.a9(0,y)}},
b4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
f8:function(a,b){if(a[b]!=null)return!1
a[b]=this.e2(b)
return!0},
f9:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fa(z)
delete a[b]
return!0},
e2:function(a){var z,y
z=new P.qq(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fa:function(a){var z,y
z=a.gih()
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
for(y=0;y<z;++y)if(J.f(a[y].gfd(),b))return y
return-1},
$isbF:1,
$isY:1,
$isw:1,
v:{
qr:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qq:{"^":"d;fd:a<,b,ih:c<"},
ai:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qi:{"^":"nG;$ti",
bE:function(a){var z=this.ee()
z.ar(0,this)
return z}},
c2:{"^":"w;$ti"},
rj:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
fg:{"^":"fp;$ti"},
fp:{"^":"d+b2;$ti",$asL:null,$asY:null,$asw:null,$isL:1,$isY:1,$isw:1},
b2:{"^":"d;$ti",
gW:function(a){return new H.dC(this,this.gm(this),0,null,[H.y(this,"b2",0)])},
as:function(a,b){return this.j(0,b)},
U:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gT:function(a){return this.gm(this)===0},
gaq:function(a){return!this.gT(this)},
gB:function(a){if(this.gm(this)===0)throw H.c(H.ae())
return this.j(0,this.gm(this)-1)},
a3:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<this.gm(this);++y){if(J.f(this.j(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bR:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bc:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
aO:function(a,b){return new H.ao(this,b,[H.y(this,"b2",0),null])},
dT:function(a,b){return H.h1(this,b,null,H.y(this,"b2",0))},
bE:function(a){var z,y
z=P.Z(null,null,null,H.y(this,"b2",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gm(this)
this.sm(0,z+1)
this.n(0,z,b)},
a9:function(a,b){var z
for(z=0;z<this.gm(this);++z)if(J.f(this.j(0,z),b)){this.aW(0,z,this.gm(this)-1,this,z+1)
this.sm(0,this.gm(this)-1)
return!0}return!1},
ip:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"b2",0)])
y=this.gm(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.f(a.$1(w),b))z.push(w)
if(y!==this.gm(this))throw H.c(new P.C(this))}if(z.length!==this.gm(this)){this.hI(0,0,z.length,z)
this.sm(0,z.length)}},
aW:function(a,b,c,d,e){var z,y,x,w,v
P.ca(b,c,this.gm(this),null,null,null)
z=c-b
if(z===0)return
if(H.aQ(d,"$isL",[H.y(this,"b2",0)],"$asL")){y=e
x=d}else{x=J.iP(d,e).bD(0,!1)
y=0}w=J.I(x)
if(y+z>w.gm(x))throw H.c(H.f4())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hI:function(a,b,c,d){return this.aW(a,b,c,d,0)},
bL:function(a,b,c){var z
if(c>=this.gm(this))return-1
for(z=c;z<this.gm(this);++z)if(J.f(this.j(0,z),b))return z
return-1},
aU:function(a,b){return this.bL(a,b,0)},
k:function(a){return P.c3(this,"[","]")},
$isL:1,
$isY:1,
$isw:1},
qN:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.T("Cannot modify unmodifiable map"))},
$isG:1},
m0:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a6:function(a){return this.a.a6(a)},
U:function(a,b){this.a.U(0,b)},
gT:function(a){var z=this.a
return z.gT(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hp:{"^":"m0+qN;a,$ti",$asG:null,$isG:1},
m2:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.A+=", "
z.a=!1
z=this.b
y=z.A+=H.b(a)
z.A=y+": "
z.A+=H.b(b)}},
lT:{"^":"aV;a,b,c,d,$ti",
gW:function(a){return new P.ee(this,this.c,this.d,this.b,null,this.$ti)},
U:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.C(this))}},
gT:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gB:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ae())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
as:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cH(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.aA(b)},
ar:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aQ(b,"$isL",z,"$asL")){y=b.gm(b)
x=this.gm(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.lU(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.iY(s)
this.a=s
this.b=0
C.a.aW(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aW(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aW(v,z,z+r,b,0)
C.a.aW(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.ee(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.aA(z.e)},
b4:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c3(this,"{","}")},
fG:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.fi();++this.d},
dE:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ae());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aA:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fi();++this.d},
fi:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aW(y,0,w,z,x)
C.a.aW(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iY:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aW(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aW(a,0,v,x,z)
C.a.aW(a,v,v+this.c,this.a,0)
return this.c+v}},
hU:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
v:{
b3:function(a,b){var z=new P.lT(null,0,0,0,[b])
z.hU(a,b)
return z},
lU:function(a){var z
a=C.v.eX(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
ee:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.C(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
nH:{"^":"d;$ti",
gT:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
ar:function(a,b){var z
for(z=J.am(b);z.t();)this.q(0,z.gG())},
jn:function(a){var z,y
for(z=a.a,y=new P.ai(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a3(0,y.d))return!1
return!0},
bD:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sm(z,this.a)
for(y=new P.ai(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
cl:function(a){return this.bD(a,!0)},
aO:function(a,b){return new H.by(this,b,[H.m(this,0),null])},
k:function(a){return P.c3(this,"{","}")},
U:function(a,b){var z
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bl:function(a,b,c){var z,y
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gB:function(a){var z,y
z=new P.ai(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.ae())
do y=z.d
while(z.t())
return y},
bc:function(a,b,c){var z,y
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ae())},
dv:function(a,b){return this.bc(a,b,null)},
aS:function(a,b){var z,y,x,w
for(z=new P.ai(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.ds())
y=w
x=!0}}if(x)return y
throw H.c(H.ae())},
$isbF:1,
$isY:1,
$isw:1},
nG:{"^":"nH;$ti"}}],["","",,P,{"^":"",
d3:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.ql(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d3(a[z])
return a},
r6:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.U(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.A(x)
w=String(y)
throw H.c(new P.f1(w,null,null))}w=P.d3(z)
return w},
wg:[function(a){return a.dH()},"$1","tr",2,0,0],
ql:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iJ(b):y}},
gm:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.cs().length
return z},
gT:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.cs().length
return z===0},
gaq:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.cs().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a6(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iW().n(0,b,c)},
a6:function(a){if(this.b==null)return this.c.a6(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
U:function(a,b){var z,y,x,w
if(this.b==null)return this.c.U(0,b)
z=this.cs()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d3(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dG(this)},
cs:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iW:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dB(P.t,null)
y=this.cs()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sm(y,0)
this.b=null
this.a=null
this.c=z
return z},
iJ:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d3(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.t,null]}},
eW:{"^":"d;$ti"},
cB:{"^":"d;$ti"},
dx:{"^":"a4;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lB:{"^":"dx;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lA:{"^":"eW;a,b",
jr:function(a,b){var z=P.r6(a,this.gjs().a)
return z},
jq:function(a){return this.jr(a,null)},
jA:function(a,b){var z=this.gjB()
z=P.qn(a,z.b,z.a)
return z},
fQ:function(a){return this.jA(a,null)},
gjB:function(){return C.P},
gjs:function(){return C.O},
$aseW:function(){return[P.d,P.t]}},
lD:{"^":"cB;a,b",
$ascB:function(){return[P.d,P.t]}},
lC:{"^":"cB;a",
$ascB:function(){return[P.t,P.d]}},
qo:{"^":"d;",
hv:function(a){var z,y,x,w,v,u,t
z=J.I(a)
y=z.gm(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cJ(a,v)
if(u>92)continue
if(u<32){if(v>w)x.A+=C.b.aF(a,w,v)
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
break}}else if(u===34||u===92){if(v>w)x.A+=C.b.aF(a,w,v)
w=v+1
x.A+=H.ap(92)
x.A+=H.ap(u)}}if(w===0)x.A+=H.b(a)
else if(w<y)x.A+=z.aF(a,w,y)},
e0:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lB(a,null))}z.push(a)},
dK:function(a){var z,y,x,w
if(this.hu(a))return
this.e0(a)
try{z=this.b.$1(a)
if(!this.hu(z))throw H.c(new P.dx(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.A(w)
throw H.c(new P.dx(a,y))}},
hu:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.A+=C.j.k(a)
return!0}else if(a===!0){this.c.A+="true"
return!0}else if(a===!1){this.c.A+="false"
return!0}else if(a==null){this.c.A+="null"
return!0}else if(typeof a==="string"){z=this.c
z.A+='"'
this.hv(a)
z.A+='"'
return!0}else{z=J.o(a)
if(!!z.$isL){this.e0(a)
this.kW(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.e0(a)
y=this.kX(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kW:function(a){var z,y,x
z=this.c
z.A+="["
y=J.I(a)
if(y.gm(a)>0){this.dK(y.j(a,0))
for(x=1;x<y.gm(a);++x){z.A+=","
this.dK(y.j(a,x))}}z.A+="]"},
kX:function(a){var z,y,x,w,v,u,t
z={}
if(a.gT(a)){this.c.A+="{}"
return!0}y=a.gm(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.U(0,new P.qp(z,x))
if(!z.b)return!1
w=this.c
w.A+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.A+=v
this.hv(x[u])
w.A+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dK(x[t])}w.A+="}"
return!0}},
qp:{"^":"a:7;a,b",
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
qm:{"^":"qo;c,a,b",v:{
qn:function(a,b,c){var z,y,x
z=new P.bK("")
y=new P.qm(z,[],P.tr())
y.dK(a)
x=z.A
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vJ:[function(a,b){return J.bW(a,b)},"$2","ts",4,0,40],
f_:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kN(a)},
kN:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cO(a)},
cD:function(a){return new P.q4(a)},
S:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.am(a);y.t();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
lV:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bf:function(a,b){var z=P.S(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ey:function(a){H.ur(H.b(a))},
bj:function(a,b,c){return new H.du(a,H.dv(a,!1,b,!1),null,null)},
a1:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cC:{"^":"d;iX:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cC))return!1
return this.a===b.a&&!0},
bA:function(a,b){return C.e.bA(this.a,b.giX())},
gw:function(a){var z=this.a
return(z^C.e.dk(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.k4(H.mP(this))
y=P.bZ(H.mN(this))
x=P.bZ(H.mJ(this))
w=P.bZ(H.mK(this))
v=P.bZ(H.mM(this))
u=P.bZ(H.mO(this))
t=P.k5(H.mL(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjU()
y=new P.cC(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.D(y.gkk()))
return y},
gkk:function(){return this.a},
$isV:1,
$asV:function(){return[P.cC]},
v:{
k4:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
k5:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bZ:function(a){if(a>=10)return""+a
return"0"+a}}},
aR:{"^":"K;",$isV:1,
$asV:function(){return[P.K]}},
"+double":0,
b0:{"^":"d;bP:a<",
a7:function(a,b){return new P.b0(this.a+b.gbP())},
at:function(a,b){return new P.b0(this.a-b.gbP())},
c2:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b0(C.j.hi(this.a*b))},
aR:function(a,b){return C.e.aR(this.a,b.gbP())},
b7:function(a,b){return this.a>b.gbP()},
d3:function(a,b){return this.a<=b.gbP()},
bM:function(a,b){return C.e.bM(this.a,b.gbP())},
gjU:function(){return C.e.bI(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.b0))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
bA:function(a,b){return C.e.bA(this.a,b.gbP())},
k:function(a){var z,y,x,w,v
z=new P.ku()
y=this.a
if(y<0)return"-"+new P.b0(0-y).k(0)
x=z.$1(C.e.bI(y,6e7)%60)
w=z.$1(C.e.bI(y,1e6)%60)
v=new P.kt().$1(y%1e6)
return""+C.e.bI(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eW:function(a){return new P.b0(0-this.a)},
$isV:1,
$asV:function(){return[P.b0]}},
kt:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ku:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a4:{"^":"d;",
gbg:function(){return H.B(this.$thrownJsError)}},
cM:{"^":"a4;",
k:function(a){return"Throw of null."}},
b_:{"^":"a4;a,b,h:c<,d",
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
u=P.f_(this.b)
return w+v+": "+H.b(u)},
v:{
D:function(a){return new P.b_(!1,null,null,a)},
cu:function(a,b,c){return new P.b_(!0,a,b,c)},
l:function(a){return new P.b_(!1,null,a,"Must not be null")}}},
dV:{"^":"b_;e,f,a,b,c,d",
ge6:function(){return"RangeError"},
ge5:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
mV:function(a){return new P.dV(null,null,!1,null,null,a)},
c9:function(a,b,c){return new P.dV(null,null,!0,a,b,"Value not in range")},
a5:function(a,b,c,d,e){return new P.dV(b,c,!0,a,d,"Invalid value")},
mW:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a5(a,b,c,d,e))},
ca:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a5(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a5(b,a,c,"end",f))
return b}}},
ll:{"^":"b_;e,m:f>,a,b,c,d",
ge6:function(){return"RangeError"},
ge5:function(){if(J.bU(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cH:function(a,b,c,d,e){var z=e!=null?e:J.aK(b)
return new P.ll(b,z,!0,a,c,"Index out of range")}}},
T:{"^":"a4;a",
k:function(a){return"Unsupported operation: "+this.a}},
ac:{"^":"a4;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
z:{"^":"a4;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a4;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f_(z))+"."}},
mk:{"^":"d;",
k:function(a){return"Out of Memory"},
gbg:function(){return},
$isa4:1},
fV:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbg:function(){return},
$isa4:1},
k3:{"^":"a4;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
q4:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f1:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aF(x,0,75)+"..."
return y+"\n"+x}},
kR:{"^":"d;h:a<,fn,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fn
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cu(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dR(b,"expando$values")
return y==null?null:H.dR(y,z)},
n:function(a,b,c){var z,y
z=this.fn
if(typeof z!=="string")z.set(b,c)
else{y=H.dR(b,"expando$values")
if(y==null){y=new P.d()
H.fz(b,"expando$values",y)}H.fz(y,z,c)}}},
bz:{"^":"d;"},
u:{"^":"K;",$isV:1,
$asV:function(){return[P.K]}},
"+int":0,
w:{"^":"d;$ti",
aO:function(a,b){return H.bA(this,b,H.y(this,"w",0),null)},
c1:["dW",function(a,b){return new H.J(this,b,[H.y(this,"w",0)])}],
a3:function(a,b){var z
for(z=this.gW(this);z.t();)if(J.f(z.gG(),b))return!0
return!1},
U:function(a,b){var z
for(z=this.gW(this);z.t();)b.$1(z.gG())},
bl:function(a,b,c){var z,y
for(z=this.gW(this),y=b;z.t();)y=c.$2(y,z.gG())
return y},
bD:function(a,b){return P.S(this,b,H.y(this,"w",0))},
cl:function(a){return this.bD(a,!0)},
bE:function(a){return P.b1(this,H.y(this,"w",0))},
gm:function(a){var z,y
z=this.gW(this)
for(y=0;z.t();)++y
return y},
gT:function(a){return!this.gW(this).t()},
gaq:function(a){return!this.gT(this)},
dT:function(a,b){return H.nJ(this,b,H.y(this,"w",0))},
gB:function(a){var z,y
z=this.gW(this)
if(!z.t())throw H.c(H.ae())
do y=z.gG()
while(z.t())
return y},
gc4:function(a){var z,y
z=this.gW(this)
if(!z.t())throw H.c(H.ae())
y=z.gG()
if(z.t())throw H.c(H.ds())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a5(b,0,null,"index",null))
for(z=this.gW(this),y=0;z.t();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cH(b,this,"index",null,y))},
k:function(a){return P.lw(this,"(",")")}},
cJ:{"^":"d;$ti"},
L:{"^":"d;$ti",$isw:1,$isY:1},
"+List":0,
G:{"^":"d;$ti"},
at:{"^":"d;",
gw:function(a){return P.d.prototype.gw.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isV:1,
$asV:function(){return[P.K]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gw:function(a){return H.aD(this)},
k:function(a){return H.cO(this)},
gbu:function(a){return new H.av(H.i9(this),null)},
toString:function(){return this.k(this)}},
bh:{"^":"d;"},
bF:{"^":"Y;$ti"},
aW:{"^":"d;"},
t:{"^":"d;",$isV:1,
$asV:function(){return[P.t]},
$isdO:1},
"+String":0,
bK:{"^":"d;A<",
gm:function(a){return this.A.length},
gT:function(a){return this.A.length===0},
gaq:function(a){return this.A.length!==0},
k:function(a){var z=this.A
return z.charCodeAt(0)==0?z:z},
v:{
h_:function(a,b,c){var z=J.am(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.t())}else{a+=H.b(z.gG())
for(;z.t();)a=a+c+H.b(z.gG())}return a},
oC:function(a){return new P.bK(a)}}}}],["","",,P,{"^":"",fL:{"^":"d;"}}],["","",,P,{"^":"",
cP:function(a){return C.J},
qk:{"^":"d;",
ad:function(a){if(a<=0||a>4294967296)throw H.c(P.mV("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
km:function(){return Math.random()}}}],["","",,S,{"^":"",jT:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
a6:function(a){return this.b.a6(a)},
U:function(a,b){return this.b.U(0,b)},
gT:function(a){var z=this.b
return z.gT(z)},
gaq:function(a){var z=this.b
return z.gaq(z)},
gm:function(a){var z=this.b
return z.gm(z)},
n:function(a,b,c){this.iC()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iC:function(){if(!this.a)return
this.a=!1
this.b=P.c7(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",jU:{"^":"d;a,b,$ti",
gm:function(a){return this.b.a},
cd:function(a){return this.b.cd(a)},
a3:function(a,b){return this.b.a3(0,b)},
U:function(a,b){return this.b.U(0,b)},
gT:function(a){return this.b.a===0},
gaq:function(a){return this.b.a!==0},
gW:function(a){var z,y
z=this.b
y=new P.ai(z,z.r,null,null,[null])
y.c=z.e
return y},
gB:function(a){var z=this.b
return z.gB(z)},
aO:function(a,b){var z=this.b
z.toString
return new H.by(z,b,[H.m(z,0),null])},
bE:function(a){var z,y
z=this.b
y=z.ee()
y.ar(0,z)
return y},
q:function(a,b){this.ij()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
ij:function(){if(!this.a)return
this.a=!1
this.b=P.b1(this.b,H.m(this,0))},
$isbF:1,
$isY:1,
$isw:1}}],["","",,S,{"^":"",dh:{"^":"d;fp:a<,b,$ti",
X:function(a){var z=new S.N(null,null,this.$ti)
z.af()
z.l(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=X.bu(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdh)return!1
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
k:function(a){return J.h(this.a)},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gm:function(a){return this.a.length},
bL:function(a,b,c){var z=this.a
return(z&&C.a).bL(z,b,c)},
aU:function(a,b){return this.bL(a,b,0)},
gW:function(a){var z=this.a
return new J.bb(z,z.length,0,null,[H.m(z,0)])},
aO:function(a,b){var z=this.a
z.toString
return new H.ao(z,b,[H.m(z,0),null])},
a3:function(a,b){var z=this.a
return(z&&C.a).a3(z,b)},
U:function(a,b){var z=this.a
return(z&&C.a).U(z,b)},
bE:function(a){var z=this.a
z.toString
return P.b1(z,H.m(z,0))},
gT:function(a){return this.a.length===0},
gaq:function(a){return this.a.length!==0},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
af:function(){if(new H.av(H.X(H.m(this,0)),null).u(0,C.n))throw H.c(new P.T('explicit element type required, for example "new BuiltList<int>"'))},
$isw:1},N:{"^":"d;fp:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dh(z,null,this.$ti)
y.af()
this.a=z
this.b=y
z=y}return z},
l:function(a){if(H.aQ(a,"$isdh",this.$ti,null)){this.a=a.gfp()
this.b=a}else{this.a=P.S(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.D("null element"))
z=this.gem()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.D("null element"))
z=this.gem();(z&&C.a).q(z,b)},
a9:function(a,b){var z=this.gem();(z&&C.a).a9(z,b)},
aO:function(a,b){var z=this.a
z.toString
z=new H.ao(z,b,[H.m(z,0),null]).bD(0,!0)
this.a=z
this.b=null
this.ic(z)},
gem:function(){if(this.b!=null){this.a=P.S(this.a,!0,H.m(this,0))
this.b=null}return this.a},
af:function(){if(new H.av(H.X(H.m(this,0)),null).u(0,C.n))throw H.c(new P.T('explicit element type required, for example "new ListBuilder<int>"'))},
ic:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.d6(w,y))throw H.c(P.D("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cy:{"^":"d;iB:a<,b,c,d,$ti",
X:function(a){var z=new A.cL(null,null,this.$ti)
z.c7()
z.l(this)
a.$1(z)
return z.p()},
D:function(){return new S.jT(!0,this.a,this.$ti)},
gw:function(a){var z=this.b
if(z==null){z=this.a.gcb()
z=H.bA(z,new A.jE(this),H.y(z,"w",0),null)
z=P.S(z,!1,H.y(z,"w",0))
C.a.f_(z)
z=X.bu(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscy)return!1
y=b.a
x=this.a
if(y.gm(y)!==x.gm(x))return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcb()
this.c=z}z=z.gW(z)
for(;z.t();){v=z.gG()
if(!J.f(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
U:function(a,b){this.a.U(0,b)},
gT:function(a){var z=this.a
return z.gT(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
c7:function(){if(new H.av(H.X(H.m(this,0)),null).u(0,C.n))throw H.c(new P.T('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.X(H.m(this,1)),null).u(0,C.n))throw H.c(new P.T('explicit value type required, for example "new BuiltMap<int, int>"'))}},jE:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d4(X.aX(X.aX(0,J.j(z)),J.j(y)))}},cL:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cy(this.a,null,null,null,this.$ti)
z.c7()
this.b=z}return z},
l:function(a){var z
if(H.aQ(a,"$iscy",this.$ti,null)){this.b=a
this.a=a.giB()}else if(!!a.$iscy){z=P.c7(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.c7(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.D("expected Map or BuiltMap, got "+H.b(a.gbu(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.D("null value"))
this.giO().n(0,b,c)},
giO:function(){if(this.b!=null){this.a=P.c7(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
c7:function(){if(new H.av(H.X(H.m(this,0)),null).u(0,C.n))throw H.c(new P.T('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.X(H.m(this,1)),null).u(0,C.n))throw H.c(new P.T('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",di:{"^":"d;iQ:a<,b,$ti",
X:function(a){var z=new L.bk(null,null,this.$ti)
z.bz()
z.l(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.S(new H.by(z,new L.jF(),[H.m(z,0),null]),!1,null)
C.a.f_(z)
z=X.bu(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdi)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gw(b)
x=this.gw(this)
if(z==null?x!=null:z!==x)return!1
return y.jn(b)},
k:function(a){return J.h(this.a)},
gm:function(a){return this.a.a},
cd:function(a){return this.a.cd(a)},
gW:function(a){var z,y
z=this.a
y=new P.ai(z,z.r,null,null,[null])
y.c=z.e
return y},
aO:function(a,b){var z=this.a
z.toString
return new H.by(z,b,[H.m(z,0),null])},
a3:function(a,b){return this.a.a3(0,b)},
U:function(a,b){return this.a.U(0,b)},
bE:function(a){return new A.jU(!0,this.a,this.$ti)},
gT:function(a){return this.a.a===0},
gaq:function(a){return this.a.a!==0},
gB:function(a){var z=this.a
return z.gB(z)},
bz:function(){if(new H.av(H.X(H.m(this,0)),null).u(0,C.n))throw H.c(new P.T('explicit element type required, for example "new BuiltSet<int>"'))},
$isw:1},jF:{"^":"a:0;",
$1:function(a){return J.j(a)}},bk:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.di(this.a,null,this.$ti)
z.bz()
this.b=z}return z},
l:function(a){var z,y,x,w
if(H.aQ(a,"$isdi",this.$ti,null)){this.a=a.giQ()
this.b=a}else{z=H.m(this,0)
y=P.Z(null,null,null,z)
for(x=J.am(a);x.t();){w=x.gG()
if(H.d6(w,z))y.q(0,w)
else throw H.c(P.D("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.D("null element"))
this.gfz().q(0,b)},
aO:function(a,b){var z=this.a
z.toString
z=P.b1(new H.by(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iR(z)},
gfz:function(){if(this.b!=null){this.a=P.b1(this.a,H.m(this,0))
this.b=null}return this.a},
bz:function(){if(new H.av(H.X(H.m(this,0)),null).u(0,C.n))throw H.c(new P.T('explicit element type required, for example "new SetBuilder<int>"'))},
iR:function(a){var z,y,x
for(z=new P.ai(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d6(x,y))throw H.c(P.D("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
M:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",ni:{"^":"ng;ch,cx,ah:cy@,b8:db@,bw:dx@,b,c,d,e,f,r,x,y,z,Q,a",
ha:function(){var z=$.$get$cq()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jW:function(){var z,y,x,w
this.cx=null
this.cy=Z.bI("Health",new N.nl(),"#CCCCCC","Your physical state",100,0,!0,P.aR)
z=P.u
this.db=Z.bI("Stamina",new N.nm(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bI("Gold",new N.nn(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bR()
x=this.cy
w=this.db
y=new O.eZ(N.bg("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a0(H.p([],[Y.ab]),0,P.aC()),x,w,z,O.uw(),O.uv(),O.uu(),y,this.ghL(),new P.bK(""),!1,null)
y.hJ()
this.cx=y
y.x="endGame"
$.$get$cm().q(0,0)},
hY:function(){var z,y
z=new O.cU([[null,P.aa(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cU([new N.nk(this),[null,P.aa(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cU(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nj:function(){var z,y,x,w
z=Z.bI("Health",new N.t1(),"#CCCCCC","Your physical state",100,0,!0,P.aR)
y=P.u
x=Z.bI("Stamina",new N.t3(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bI("Gold",new N.t4(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.t
z=new N.ni("net.filiph.edgehead.0.0.1",null,z,x,y,new O.no(new H.R(0,null,null,null,null,null,0,[w,O.cU])),null,null,null,P.Z(null,null,null,w),!1,null,-9999,null,null,null)
z.hY()
return z}}},t1:{"^":"a:17;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d3(a,0.5))return"\ud83d\ude23"
if(z.aR(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},t3:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},t4:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nk:{"^":"a:18;a",
$0:function(){var z=0,y=P.aB(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.bt(),$async$$0)
case 2:return P.aF(null,y)}})
return P.aG($async$$0,y)}},nl:{"^":"a:17;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d3(a,0.5))return"\ud83d\ude23"
if(z.aR(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nm:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nn:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",dl:{"^":"d;"},kK:{"^":"d;"},pp:{"^":"dl;a,b",
X:function(a){var z=new M.e5(null,!1,0)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.dl))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return Y.M(Y.k(Y.k(0,C.M.gw(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},e5:{"^":"kK;c,a,b",
gdX:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
l:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gdX()
y=this.a
this.gdX()
z=new M.pp(y,this.b)}this.l(z)
return z}}}],["","",,O,{"^":"",
wk:[function(a){var z,y
z=a.gc3()
y=a.gbU()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","d8",2,0,19],
ww:[function(a){var z,y,x
z=a.gc3()
y=a.gcX()
x=a.gbU()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","i_",2,0,19],
eZ:{"^":"lX;y,z,Q,ch,cx,cy,db,dx,dy,bF:fr<,fx,f1:fy<,ah:go<,b8:id<,bw:k1<,a,b,c,d,e,f,r,x",
hJ:function(){var z,y,x,w,v,u
z=P.bf(C.o,null)
y=$.$get$bS()
this.cy=R.aZ(1000,"orc",O.d8(),null,new G.b4("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.q,0,y)
this.db=R.aZ(1001,"goblin",O.d8(),null,new G.b4("scimitar",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,1,0,!1,1,!1,C.q,0,y)
y=new S.N(null,null,[Q.q])
y.af()
y.l([new Q.q("start_adventure","","",null)])
this.dx=new K.cc(y.p(),"preStartBook",new O.kB(),new O.kC(),null,null,"ground")
y=R.aZ(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.C,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.d2()
if(typeof y!=="number")return H.x(y)
this.go.saa(z/y)
this.id.saa(this.ch.fx)
this.k1.saa(this.ch.f)
this.cx=R.aZ(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.a0,0,null)
this.dy=F.fG(this.dx,!1)
y=K.cc
x=P.S($.$get$hP(),!0,y)
C.a.ar(x,[this.dx,$.$get$er()])
w=new M.e5(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b1([z,v],R.H)
z=P.b3(null,O.cs)
u=new A.a8(v,P.Z(null,null,null,U.as),w,z,P.b1(x,y),P.S([u],!0,S.a_),0,null)
this.fr=u
y=new Y.a0(H.p([],[Y.ab]),0,P.aC())
y.b=u.r
this.fx=new B.bB(u,null,y,1,1,!0,!1,!1,0)},
d_:function(){var z=0,y=P.aB(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d_=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjz()
if(v.h7(u)){z=1
break}t=w.fr.a0(w.ch.x)
s=t.gah()
r=t.gh2()
if(typeof s!=="number"){x=s.d2()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.saa(s/r)
w.id.saa(t.gb8())
w.k1.saa(t.gbw())
r=w.y
r.h_("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.Z(0,"\n\n",!0)
if(w.fr.jR(w.ch.x))v.Z(0,"TO BE CONTINUED.",!0)
else v.Z(0,"You died.",!0)
w.f.A+=v.cg()
z=1
break}q=C.a.gB(s)
p=q.dN(w.fr)
o=G.iV(p,w.fr)
z=3
return P.aw(o.kr(),$async$d_)
case 3:s=o.f
if(s.gT(s)){n=o.a
m=o.b
n.eT("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gw(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bK(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mr(s)
i=new Z.mq(new P.hp(s,[null,null]),n)
if(s.gT(s))$.$get$bC().eT("Created with no recommendations.")
if(n.length===0){r.dR("No recommendation for "+H.b(p.gh()))
r.dR(new O.kE(w))
w.fr.fP(q.gi());++w.fr.r
z=1
break}z=p.gF()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;s=n.length,h<s;s===u||(0,H.ar)(n),++h);r.bK("planner.generateTable for "+H.b(p.gh()))
o.eU().U(0,new O.kF(w))
u=i.h9(q.geK(),O.i_())
u.toString
g=P.S(u,!1,H.y(u,"w",0))
if(g.length!==0&&C.a.bR(g,new O.kG())){w.f.A+=v.cg()
C.a.sm(v.a,0)}v=new O.kH(new O.kJ())
u=g.length-1
if(u-0<=32)H.fU(g,0,u,v)
else H.fT(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gV(),f.gK(),new O.kI(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfO()
z=7
return P.aw(w.cp(i.kq(s==null?O.i_():s),p,v),$async$d_)
case 7:case 5:v.h7(u)
case 1:return P.aF(x,y)}})
return P.aG($async$d_,y)},
cp:function(a,b,c){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$cp=P.ax(function(d,e){if(d===1)return P.aE(e,y)
while(true)switch(z){case 0:v=a.dr(b,w.fx,w.fr)
u=P.S(v,!0,H.y(v,"w",0))
z=b.gF()===!0?3:5
break
case 3:z=6
return P.aw(w.dc(a,b,u),$async$cp)
case 6:z=4
break
case 5:t=S.mT(new H.ao(u,new O.ky(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ar(c.a,w.fx.gf1().a)
w.fr=w.fx.gbF()
v=w.y
v.bK(new O.kz(a,b))
v.ag(new O.kA(w,b))
case 1:return P.aF(x,y)}})
return P.aG($async$cp,y)},
dc:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dc=P.ax(function(d,e){if(d===1)return P.aE(e,y)
while(true)switch(z){case 0:w=a.J(b,x.fr)
v=J.o(w)
z=v.u(w,1)?2:4
break
case 2:x.fx=C.a.gc4(c)
z=3
break
case 4:z=v.u(w,0)?5:7
break
case 5:x.fx=C.a.gc4(c)
z=6
break
case 7:u=C.a.gB(J.h(a.gM()).split("."))
v=v.kN(w)
t=a.am(b,x.fr)
s=a.gP()&&b.jS(a.gM())
r="use "+H.b(u)
x.ft()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dc)
case 8:q=e
s=new H.J(c,new O.kv(q),[H.m(c,0)])
x.fx=s.gc4(s)
if(q.gkV()===!0){p=A.e4(x.fx.gbF())
p.Y(b.gi(),new O.kw())
v=x.fx
t=v.gfB()
s=H.p([],[Y.ab])
r=new Y.a0(s,0,P.aC())
C.a.ar(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bB(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aF(null,y)}})
return P.aG($async$dc,y)}},
kB:{"^":"a:3;",
$3:function(a,b,c){return c.Z(0,"UNUSED because this is the first choice",!0)}},
kC:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.z("Room isn't to be revisited"))}},
kE:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ao(z,new O.kD(),[H.m(z,0),null]).ca(0," <- ")}},
kD:{"^":"a:0;",
$1:function(a){return a.gaM()}},
kF:{"^":"a:0;a",
$1:function(a){return this.a.y.bK(a)}},
kJ:{"^":"a:41;",
$1:function(a){if(a instanceof Q.E)return H.b(a.b.gh())+" "+a.gV()
return"ZZZZZZ "+a.gV()}},
kG:{"^":"a:0;",
$1:function(a){return a.gV()!==""}},
kH:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bW(z.$1(a),z.$1(b))}},
kI:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.aB(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cp(x.c,x.b,w.fy),$async$$0)
case 2:return P.aF(null,y)}})
return P.aG($async$$0,y)}},
ky:{"^":"a:0;",
$1:function(a){return a.gks()}},
kz:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kA:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ao(z,new O.kx(),[H.m(z,0),null]).ca(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kx:{"^":"a:0;",
$1:function(a){return a.gaM()}},
kv:{"^":"a:0;a",
$1:function(a){return a.geE()===this.a.geE()}},
kw:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}}}],["","",,Q,{"^":"",
i4:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i4(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gB(t):null
s=J.iS(t.aE(y.a,y),new Q.tZ(z))
t=J.am(s.a),r=new H.cf(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gL()&&!z.eB(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
i5:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i5(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dP((t.length!==0?C.a.gB(t):null).gbB()).gjD().a,t=new J.bb(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
i6:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i6(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gB(t):null).gbJ(),t=t.gW(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
tZ:{"^":"a:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gaV()}},
a9:{"^":"d;",
dr:function(a,b,c){var z=this
return P.aP(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dr(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.J(y,x.gbF())
r=J.aj(s)
v=r.b7(s,0)?2:3
break
case 2:q=A.e4(w)
v=4
return B.fu(q,x,z,z.i8(q,y,w,z.gO(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aR(s,1)?5:6
break
case 5:q=A.e4(w)
p=z.i7(q,y,w,z.gN(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fu(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aN()
case 1:return P.aO(t)}}})},
f6:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aS(0,new Q.iT(b))
y=new O.eL(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().f=x
y.ga5().e=C.Q
y.ga5().ch=f
y.ga5().Q=e
x=this.gL()
y.ga5().y=x
x=this.ga1()
y.ga5().z=x
if(!!this.$isE){x=y.ga5()
w=x.r
if(w==null){w=new L.bk(null,null,[P.u])
w.bz()
w.l(C.d)
x.r=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.D("null element"))
x.gfz().q(0,w)}v=new Y.a0(H.p([],[Y.ab]),0,P.aC())
x=a.f
u=(x.length!==0?C.a.gB(x):null).gi()
a.gw(a);(x.length!==0?C.a.gB(x):null).kn(a,v)
this.a=d.$3(z,a,v)
if(a.df(u)!=null)a.fP(u);++a.r
w=a.eV(u)
if(!(w==null))w.h5(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gB(x):null
if((w==null?w:w.dN(a))!=null){w=x.length!==0?C.a.gB(x):null
w=!J.f(w==null?w:w.d7(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gB(x):null)==null)break
t=C.a.gB(x)
t.dA(a)
C.a.a9(x,t)}x=x.length!==0?C.a.gB(x):null
if(!(x==null))x.h6(a,v)
if(this.a==null)H.i(new P.z("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().d=x
x=a.r
y.ga5().x=x
a.d.fG(y.p())
return v},
i8:function(a,b,c,d,e){return this.f6(a,b,c,d,!1,e)},
i7:function(a,b,c,d,e){return this.f6(a,b,c,d,e,!1)}},
iT:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a.gi())}},
E:{"^":"a9;bU:b<",
gV:function(){var z=new Y.a0(H.p([],[Y.ab]),0,P.aC())
z.fD(0,this.gal(),this.b)
return z.cg()},
am:function(a,b){var z=new Y.a0(H.p([],[Y.ab]),0,P.aC())
z.j7(0,this.gan(),this.b,a,!0)
return z.cg()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gal()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
cE:{"^":"a9;",
gV:function(){return this.b.gV()},
k:function(a){return"ExitAction<"+this.b.gV()+">"}},
cI:{"^":"a9;",
gV:function(){var z=new Y.a0(H.p([],[Y.ab]),0,P.aC())
z.fD(0,"pick up <object>",this.b)
return z.cg()},
k:function(a){return"ItemAction<"+this.gV()+">"}},
n2:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"w8<"}}}],["","",,O,{"^":"",cs:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},lL:{"^":"d;a,b",
k:function(a){return this.b}},pl:{"^":"cs;a,ep:b<,aM:c<,d,cS:e<,f3:f<,H:r<,hr:x<,hs:y<,z,ht:Q<",
X:function(a){var z=new O.eL(null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cs))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},eL:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gep:function(){return this.ga5().c},
gaM:function(){return this.ga5().d},
gcS:function(){return this.ga5().f},
gf3:function(){var z,y
z=this.ga5()
y=z.r
if(y==null){y=new L.bk(null,null,[P.u])
y.bz()
y.l(C.d)
z.r=y
z=y}else z=y
return z},
gH:function(){return this.ga5().x},
ghr:function(){return this.ga5().y},
ghs:function(){return this.ga5().z},
ght:function(){return this.ga5().ch},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bk(null,null,[H.m(z,0)])
y.bz()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bk(null,null,[H.m(z,0)])
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
if(z==null){y=this.ga5()
x=y.b
if(x==null){x=new L.bk(null,null,[P.u])
x.bz()
x.l(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga5().c
w=this.ga5().d
v=this.ga5().e
u=this.ga5().f
t=this.ga5()
s=t.r
if(s==null){s=new L.bk(null,null,[P.u])
s.bz()
s.l(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga5().x
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
z=new O.pl(y,x,w,v,u,t,s,r,q,p,o)
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
i7:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i7(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bM(new H.J(u,new R.u1(z),[H.m(u,0)]))
case 3:return P.aN()
case 1:return P.aO(v)}}})},
aZ:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eM(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rY(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
u1:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfT()
y=this.a.gi()
return z==null?y==null:z===y}},
H:{"^":"m6;",
gji:function(){return!0},
gbm:function(){var z=this.r
if(typeof z!=="number")return z.b7()
return z>0},
gb5:function(){return this.d instanceof K.c1},
gaN:function(){return this.dx===C.i},
ga4:function(){return this.dx===C.f},
ga8:function(){return this.dx===C.k},
jS:function(a){var z=this.fx
if(typeof z!=="number")return z.bM()
return z>=1},
eB:function(a,b){return this.fZ(a,b)>0},
fZ:function(a,b){var z,y
if(this.eD(b)){z=a.gbe()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.ix(a,b,10))return 1
z=a.gbe()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eD:function(a){var z,y
z=a.c_("Confuse",this,!0)
if(z==null)return!1
y=a.kK("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d6:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a0(this.x)
y=z.gah()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gbm())x-=10
y=z.d
if(!(y instanceof K.c1))x+=4
y=J.aY(y.gaa(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.ch,w=[null],v=new P.ai(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aY(v.d.gaa(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.gW(y),u=new H.cf(v,new R.jo(this),[H.m(y,0)]),t=0;u.t();){s=v.gG()
r=s.gaV()?2:0
q=s.gah()
if(typeof q!=="number")return H.x(q)
p=J.aY(s.d.gaa(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.ai(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aY(q.d.gaa(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.ct(x,t,y.bl(0,0,new R.jp(this,a)))},
ix:function(a,b,c){var z=b.kL(a,this,!0)
if(z==null)return!1
return z<=c},
$isbd:1},
m6:{"^":"d+dn;"},
rY:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$eq()
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
z=P.Z(null,null,null,null)
a.gC().cx=z
z=this.cy
if(z!=null){y=new L.bm(null,null)
y.l(z)
z=y}else{z=$.$get$ex()
z.toString
y=new L.bm(null,null)
y.l(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
jo:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.f(a.gbe(),z.fy)){y=a.gi()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
jp:{"^":"a:27;a,b",
$2:function(a,b){var z,y
z=b.gaV()?1:0
y=b.gah()
if(typeof y!=="number")return H.x(y)
return J.al(a,(z+y)*this.a.fZ(b,this.b))}},
dP:{"^":"d;a,b",
k:function(a){return this.b}},
pm:{"^":"H;a,fO:b<,bB:c<,a_:d<,fT:e<,bw:f<,ah:r<,i:x<,y,c9:z<,F:Q<,bW:ch<,h2:cx<,h:cy<,bC:db<,ai:dx<,a2:dy<,fr,b8:fx<,be:fy<",
X:function(a){var z=new R.eM(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.H))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.f(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
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
z=(z==null?y==null:z===y)&&J.f(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.v.gw(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.v.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eM:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfO:function(){return this.gC().c},
gbB:function(){return this.gC().d},
sbB:function(a){this.gC().d=a
return a},
ga_:function(){return this.gC().e},
sa_:function(a){this.gC().e=a
return a},
gfT:function(){return this.gC().f},
gbw:function(){return this.gC().r},
sbw:function(a){this.gC().r=a
return a},
gah:function(){return this.gC().x},
sah:function(a){this.gC().x=a
return a},
gi:function(){return this.gC().y},
gc9:function(){return this.gC().Q},
gF:function(){return this.gC().ch},
gbW:function(){return this.gC().cx},
gh2:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gbC:function(){return this.gC().dx},
gai:function(){return this.gC().dy},
sai:function(a){this.gC().dy=a
return a},
ga2:function(){return this.gC().fr},
gb8:function(){return this.gC().fy},
sb8:function(a){this.gC().fy=a
return a},
gbe:function(){var z,y
z=this.gC()
y=z.go
if(y==null){y=new L.bm(null,null)
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
if(!(z==null)){y=new L.bm(null,null)
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
if(e==null){e=new L.bm(null,null)
f.go=e
f=e}else f=e
z=new R.pm(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",ct:{"^":"d;c3:a<,cX:b<,bU:c<",
at:function(a,b){return new A.an(this.a-b.gc3(),this.b-b.gcX(),J.bw(this.c,b.gbU()))},
k:function(a){return"ActorScore<self="+C.j.b6(this.a,2)+",team="+C.j.b6(this.b,2)+",enemy="+J.bX(this.c,2)+">"}},an:{"^":"d;c3:a<,cX:b<,bU:c<",
gkb:function(){return this.a===-1/0&&this.b===-1/0&&J.f(this.c,-1/0)},
c2:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.an(this.a*b,this.b*b,J.bV(this.c,b))},
a7:function(a,b){return new A.an(this.a+b.gc3(),this.b+b.gcX(),J.al(this.c,b.gbU()))},
d2:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.an(this.a/b,this.b/b,J.aY(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.b6(this.a,2)+",team="+C.j.b6(this.b,2)+",enemy="+J.bX(this.c,2)+">"},
v:{
jn:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.D("Cannot average empty iterable"))
return new A.an(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
vD:function(a){switch(a){case C.L:return"spear"
case C.y:return"sword"
case C.z:return"fist"
default:throw H.c(P.D(a))}},
as:{"^":"m7;",
gaM:function(){return U.vD(C.a.gez(this.a))},
gi:function(){return H.aD(this)},
gc9:function(){return!0},
gbm:function(){return!1},
gF:function(){return!1},
gbC:function(){return!1},
ga2:function(){return C.r},
gbe:function(){return $.$get$bT()},
$isbd:1},
m7:{"^":"d+dn;"},
dr:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c1:{"^":"b5;h:b<,a"}}],["","",,G,{"^":"",b4:{"^":"b5;h:b<,cn:c<,cY:d<,bC:e<,cH:f<,fI:r<,a"}}],["","",,L,{"^":"",b5:{"^":"as;",
gfI:function(){return!1},
gcH:function(){return!1},
gk8:function(){return!1},
gbd:function(){return this.gcn()>0},
geF:function(){return this.gcY()>0},
gm:function(a){return 2},
gcn:function(){return 0},
gcY:function(){return 0},
gaa:function(){var z,y,x
z=this.gcn()
y=this.gcY()
x=this.gbC()?1:0
return 2+z+y+x},
$isbd:1}}],["","",,G,{"^":"",lX:{"^":"d;",
ft:function(){var z,y
z=this.f
y=z.A
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.A=""}},
l6:[function(a){this.f.A+=a},"$1","gjz",2,0,21],
bt:function(){var z=0,y=P.aB(),x,w=this,v,u
var $async$bt=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.z("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sm(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gm(v)===0&&u.A.length===0)){z=4
break}z=5
return P.aw(w.d_(),$async$bt)
case 5:z=3
break
case 4:w.ft()
case 1:return P.aF(x,y)}})
return P.aG($async$bt,y)}}}],["","",,B,{"^":"",eX:{"^":"d;d5:a<,du:b<,cQ:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.bX(this.b,3)+", score="+this.a.k(0)+">"}},bB:{"^":"d;bF:a<,fB:b<,f1:c<,ks:d<,du:e<,f,r,eE:x<,cQ:y<",
gw:function(a){return X.bu(H.p([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbB&&this.gw(this)===z.gw(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gw(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
fu:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bV(e,b.gdu())
z=z?0:b.gcQ()+1
d.b=a.r
return new B.bB(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iU:{"^":"d;a,b,c,d,e,f",
jl:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ag("...")
z.ag("combining scores")
y=H.p([],[A.an])
x=new G.jg()
for(w=J.am(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gG()
z.ag(new G.je(r))
if(J.a7(r.gdu(),0.15))if(s==null){z.ag("    - first _bestCase")
s=r}else if(J.a7(x.$1(r.gd5()),x.$1(s.gd5()))){z.ag("    - new _bestCase")
s=r}q=r.gd5()
p=J.bw(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.an((q.a-v)*o,(q.b-u)*o,J.bV(p,o))
z.ag(new G.jf(n))
y.push(n)}m=A.jn(y)
w=s==null
if(w)l=C.E
else{q=s.gd5()
l=new A.an(q.a-v,q.b-u,J.bw(q.c,t))}w=w?s:s.gcQ()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.aY(l.c,w)
t=m.a
q=m.b
p=m.c
z.ag("- uplifts average = "+("ActorScoreChange<self="+C.j.b6(t,2)+",team="+C.j.b6(q,2)+",enemy="+J.bX(p,2)+">"))
z.ag("- best = "+("ActorScoreChange<self="+C.t.b6(v,2)+",team="+C.t.b6(u,2)+",enemy="+J.bX(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ag("- result = "+("ActorScoreChange<self="+C.t.b6(t,2)+",team="+C.t.b6(q,2)+",enemy="+C.j.b6(p,2)+">"))
return new A.an(t,q,p)},
eU:function(){var z=this
return P.aP(function(){var y=0,x=1,w,v,u,t,s
return function $async$eU(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcb(),u=u.gW(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gV()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aN()
case 1:return P.aO(w)}}})},
dB:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dB=P.ax(function(d,e){if(d===1)return P.aE(e,y)
while(true)switch(z){case 0:w=x.f
w.b4(0)
v=x.c
u=v.a
t=u.a.aS(0,new G.jh(x))
s=t.d6(u)
r=x.a
r.bK("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b6(x.e8(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.bb(new G.ji(t,o))
if(o.I(t,u)!==!0){r.bb(new G.jj(o))
z=2
break}z=4
return P.aw(x.ct(v,o,b,a,c).cl(0),$async$dB)
case 4:n=e
if(J.eI(n)===!0){r.bb(new G.jk(o))
w.n(0,o,C.F)
z=2
break}r.bb(new G.jl(s,o,n))
m=x.jl(n,s,b)
w.n(0,o,m)
r.bb(new G.jm(o,m))
z=2
break
case 3:x.e=!0
return P.aF(null,y)}})
return P.aG($async$dB,y)},
kr:function(){return this.dB(50,10,null)},
e8:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$e8(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bM((u.length!==0?C.a.gB(u):null).gbi())
case 2:u=(u.length!==0?C.a.gB(u):null).gaC()
t=u.length
s={func:1,ret:Q.cI,args:[U.as]}
r={func:1,ret:Q.cE,args:[Q.q]}
q={func:1,ret:Q.E,args:[R.H]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ay(o,q)?6:8
break
case 6:x=9
return P.bM(Q.i4(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bM(Q.i5(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bM(Q.i6(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.z(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aN()
case 1:return P.aO(v)}}})},
ct:function(a5,a6,a7,a8,a9){var $async$ct=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aS(0,new G.iY(t))
p=t.a
p.bb("=====")
p.bb(new G.iZ(a6,q))
p.bb(new G.j_(a6))
if(a6.I(q,r)!==!0){p.bb("- firstAction not applicable")
z=1
break}o=q.d6(r)
p.bb(new G.j5(a5,o))
p.bb(new G.j6(a5))
n=P.b3(null,B.bB)
m=P.Z(null,null,null,A.a8)
l=J.o(r)
k=l.gw(r)
for(j=new P.b6(a6.dr(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gG()
if(l.gw(r)!==k)throw H.c(new P.z("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aA(h)}s.a=0
r=t.b
case 3:if(!!n.gT(n)){z=4
break}++s.a
g=n.dE()
p.ag("----")
p.ag(new G.j7(g))
p.ag(new G.j8(g))
if(g.gcQ()>a7||s.a>a8){p.ag(new G.j9(s,a7,g))
p.ag(new G.ja(g))
z=4
break}z=g.gbF().f.length===0?5:6
break
case 5:p.ag("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bc(0,new G.jb(t),new G.jc())
if(q==null){p.ag("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eX(q.d6(l),g.e,g.y)
p.ag(new G.j0(f))
z=7
x=[1]
return P.d2(P.hw(f),$async$ct,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gB(j):null).dN(l)
j=l.a
i=new H.J(j,new G.j1(t),[H.m(j,0)])
d=i.gm(i)
if(d>1)throw H.c(new P.z("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.h_("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aS(0,new G.j2(t))
c=J.f(e,q)
p.ag("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ag("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d6(l)
if(b==null)b=C.G
f=new B.eX(b,g.e,g.y)
p.ag(new G.j3(o,f))
p.ag(new G.j4(g))
z=8
x=[1]
return P.d2(P.hw(f),$async$ct,y)
case 8:p.ag("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b6(t.e8(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.I(e,l)!==!0)continue
for(a1=new P.b6(a2.dr(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bU(a4.gdu(),0.05))continue
if(m.a3(0,a4.gbF()))continue
n.aA(a4)}}p.ag("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d2(null,0,y)
case 2:return P.d2(v,1,y)}})
var z=0,y=P.pQ($async$ct),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.ra(y)},
hS:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.D("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gB(z).gaM())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjp())+". Action Records: "+z.aO(0,new G.jd()).ca(0,"<-")))}},
v:{
iV:function(a,b){var z,y,x
z=N.bg("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a0(H.p([],[Y.ab]),0,P.aC())
x.b=b.r
z=new G.iU(z,y,new B.bB(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.hS(a,b)
return z}}},jd:{"^":"a:0;",
$1:function(a){return a.gaM()}},jg:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},je:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jf:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jh:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a.b)}},ji:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gV()+"' for "+H.b(this.a.cy)}},jj:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gV()+"' isn't applicable"}},jk:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gV()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jl:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gV()+"' leads to "+H.b(J.aK(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jm:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gV()+"' was scored "+this.b.k(0)}},iY:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a.b)}},iZ:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gV()+"' of "+H.b(this.b.gh())}},j_:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},j5:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j6:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c2(" ",z.y)+"- "+J.h(z.b)}},j7:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfB().gV()+"'"}},j8:{"^":"a:1;a",
$0:function(){var z=this.a.gbF().f
return"- situation: "+H.b(J.iL(z.length!==0?C.a.gB(z):null))}},j9:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcQ()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},ja:{"^":"a:1;a",
$0:function(){var z=this.a.gbF().d
return"- how we got here: "+new H.ao(z,new G.iX(),[H.m(z,0),null]).ca(0," <- ")}},iX:{"^":"a:0;",
$1:function(a){return a.gaM()}},jb:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a.b)}},jc:{"^":"a:1;",
$0:function(){return}},j0:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},j1:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a.b)}},j2:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a.b)}},j3:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},j4:{"^":"a:1;a",
$0:function(){var z=this.a.gbF().d
return"- how we got here: "+new H.ao(z,new G.iW(),[H.m(z,0),null]).ca(0," <- ")}},iW:{"^":"a:0;",
$1:function(a){return a.gaM()}}}],["","",,Z,{"^":"",mq:{"^":"d;a,b",
gbi:function(){return this.b},
gT:function(a){return this.b.length===0},
h9:function(a,b){var z=this
return P.aP(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$h9(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bM(t)
case 5:w=1
break
case 4:s=z.ir(new Z.mt())
r=z.e7(new Z.mu(),[s])
q=z.e7(new Z.mv(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bC().bK("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bC().bK("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bC().bK("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.co(t,new Z.mw(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.u(m,s)){w=17
break}if(l.u(m,r)){w=17
break}if(l.u(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ar)(t),++n
w=16
break
case 18:case 1:return P.aN()
case 2:return P.aO(u)}}})},
kq:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc4(y)
C.a.co(y,new Z.mx(this,a))
x=this.a.a
w=x.gcm().bl(0,1/0,new Z.my(a))
v=x.gcm().bl(0,-1/0,new Z.mz(a))
x=J.aj(v)
u=J.aj(w)
t=u.at(w,J.bV(x.at(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bw(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.lV(y.length,new Z.mA(z,this,a,s),!1,P.K)
q=new H.ao(r,new Z.mB(C.a.bl(r,0,Z.uo())),[H.m(r,0),null]).bD(0,!1)
z=C.a.bl(q,0,Z.up())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.al(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.mU(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
e7:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a3(b,t))continue
if(w==null||J.a7(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
ir:function(a){return this.e7(a,C.d)},
v:{
mr:function(a){var z,y,x
z=a.gcb()
y=H.y(z,"w",0)
x=P.S(new H.J(z,new Z.ms(a),[y]),!1,y)
if(x.length===0)$.$get$bC().eT("After removing actions scored by undefined, there are no recommendations.")
return x},
w5:[function(a,b){return J.al(a,b)},"$2","uo",4,0,42],
w6:[function(a,b){return J.al(a,b)},"$2","up",4,0,43]}},mt:{"^":"a:0;",
$1:function(a){return a.gc3()}},mu:{"^":"a:0;",
$1:function(a){return J.iH(a.gbU())}},mv:{"^":"a:0;",
$1:function(a){return a.gcX()}},mw:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bW(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mx:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bW(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},my:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d5(a),H.d5(z))}},mz:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d5(a),H.d5(z))}},mA:{"^":"a:10;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.aY(J.bw(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mB:{"^":"a:0;a",
$1:function(a){return J.iO(J.bV(J.aY(a,this.a),1000))}},ms:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkb()}}}],["","",,K,{"^":"",rk:{"^":"a:3;",
$3:function(a,b,c){}},cc:{"^":"d;a,h:b<,c,d,jF:e<,f,bx:r<",
gjD:function(){return this.a},
gw:function(a){return C.b.gw(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.cc&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jG:function(a,b,c){return this.e.$3(a,b,c)},
v:{
O:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.q])
z.af()
z.l(f)
return new K.cc(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",q:{"^":"d;jy:a<,V:b<,aM:c<,k5:d<"}}],["","",,S,{"^":"",a_:{"^":"d;",
gaC:function(){return C.d},
gbi:function(){return C.d},
geK:function(){return 3},
dN:function(a){return this.az(this.gH(),a)},
h5:function(a,b){},
h6:function(a,b){},
kn:function(a,b){},
dA:function(a){},
d7:function(a){return!0}}}],["","",,S,{"^":"",
fD:function(a){var z=$.$get$bE().ad(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
mT:function(a,b){var z,y,x,w,v
z=$.$get$bE().km()*b
for(y=new H.dC(a,a.gm(a),0,null,[H.y(a,"aV",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
mU:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bE().ad(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
cQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.I(a)
y=z.aU(a,"{")
if(y!==-1){x=z.gm(a)
if(typeof x!=="number")return x.at()
x=y<x-1}else x=!1
if(x){w=H.p([],[P.u])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.x(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.o(r)
if(x.u(r,"{"))++s
else if(x.u(r,"|")&&s===1)w.push(u)
else if(x.u(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bE().ad(p)
z=z.aF(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.b(S.cQ(C.b.aF(a,n+1,w[m])))
if(typeof v!=="number")return v.a7()
n=a.length
m+=C.b.aF(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cQ(z)}else{x=z.gm(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.a7()
x=t+1
return z.aF(a,0,x)+H.b(S.cQ(C.b.bG(a,x)))}}}else return a},
af:function(a,b,c,d){switch($.$get$bE().ad(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ab:{"^":"d;aX:a<,aT:b<,aP:c<,h8:d<,e,ds:f@,hb:r<,h3:x<,f2:y<,jC:z<,hN:Q<,d1:ch<,j0:cx<,ka:cy<,H:db<",
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
z="Report<"+C.b.aF(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a0:{"^":"d;a,H:b<,c",
geA:function(){return C.a.bR(this.a,new Y.oc())},
aL:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.ba(b).ex(b,".")||C.b.ex(b,"!")||C.b.ex(b,"?"))&&C.b.d9(b,P.bj("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ab(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aL(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
Z:function(a,b,c){return this.aL(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
j2:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return this.aL(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,m)},
fD:function(a,b,c){return this.aL(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
j9:function(a,b,c,d,e,f){return this.aL(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
dn:function(a,b,c,d){return this.aL(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
j6:function(a,b,c,d,e){return this.aL(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dn:function(a,b,c,d){return this.aL(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fE:function(a,b,c,d){return this.aL(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fF:function(a,b,c,d,e,f){return this.aL(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
j8:function(a,b,c,d,e,f){return this.aL(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
j4:function(a,b,c){return this.aL(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
j5:function(a,b,c,d){return this.aL(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
j7:function(a,b,c,d,e){return this.aL(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
jd:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oa().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.f(t,C.a.gB(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bQ(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.f(t,C.a.gB(b))){z+="."
this.j9(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jc:function(a,b,c,d){return this.jd(a,b,c,"and",3,null,null,d)},
er:function(){return this.Z(0,"\n\n",!0)},
bQ:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.I(a)
z=z.aU(a,"<owner's> "+H.b(b))!==-1||z.aU(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aU(a,"<object-owner's> "+H.b(b))!==-1||z.aU(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.I(a)
if(z.aU(a,"<subject's> "+H.b(b))!==-1||z.aU(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gbC()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.cT(a,b,"the "+H.b(b))
else{w=J.eK(c.gh(),P.bj("[aeiouy]",!1,!1))?z.cT(a,b,"an "+H.b(b)):z.cT(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
ey:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaT()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaT()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaP()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaP()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaT().gi()
if(b<0||b>=z.length)return H.e(z,b)
if(J.f(y,z[b].gaP().gi())){if(a>=z.length)return H.e(z,a)
y=z[a].gaP().gi()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gaT().gi())}else z=!1
return z},
dM:function(a){var z=this
return P.aP(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dM(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aQ(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaT()!=null?3:4
break
case 3:x=5
return t.gaT()
case 5:case 4:x=t.gaP()!=null?6:7
break
case 6:x=8
return t.gaP()
case 8:case 7:x=t.gh8()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aN()
case 2:return P.aO(v)}}})},
cP:[function(a){var z=J.aj(a)
if(z.aR(a,0)||z.bM(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaP()}},"$1","gaP",2,0,22],
ko:function(a,b){var z
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.ey(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gf2()}return!1},
h7:function(a){var z
for(z=!1;this.geA();z=!0){a.$1(this.hc(!0))
this.kw()}return z},
hc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bl(z,[],new Y.od())
C.a.iM(z,new Y.oe(y),!1)
x=a&&this.geA()?C.a.aU(z,C.a.dv(z,new Y.of()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ey(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gds())n=this.ko(s,p)&&this.hM(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gds()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sds(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghN()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjC()){if(s>=z.length)return H.e(z,s)
if(!z[s].gd1())if(this.dj(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gds()}else n=!1
n=n||this.kM(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gd1()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gd1()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fD([" but "," but ",", but "])
u=!this.hz(s,s+1)&&!0}else{r+=S.fD([" and "," and ",", and "])
u=!0}}m=this.dV(s)
l=S.cQ(m)
p=J.I(l)
if(p.a3(l,"{")===!0||p.a3(l,"}")===!0)$.$get$ih().dR('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dj(s,k)&&J.eK(this.dV(k),"<subject> ")&&p.d9(l,"<subject> ")}else k=!1
if(k)l=p.cT(l,"<subject> ","")
j=J.dd(l,"<action>",this.dV(s))
p=s-1
k=this.iP(s,p)
if(k)k=!(this.cP(s).ga2()===C.r&&this.bh(s).ga2()===C.r)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dj(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cP(p)!=null)if(this.bh(s)!=null)if(this.bh(p)!=null){k=this.cP(p)
k=k==null?k:k.gi()
i=this.bh(s)
if(J.f(k,i==null?i:i.gi())){k=this.bh(p)
k=k==null?k:k.ga2()
i=this.bh(s)
k=!J.f(k,i==null?i:i.ga2())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bh(p)!=null)if(this.cP(s)!=null){k=this.bh(p)
k=k==null?k:k.gi()
i=this.cP(s)
if(J.f(k,i==null?i:i.gi())){p=this.bh(p)
p=p==null?p:p.ga2()
k=this.bh(s)
p=!J.f(p,k==null?k:k.ga2())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.e(z,s)
p=z[s]
h=p.gaT()
g=p.gaP()
f=p.gh8()
e=p.e
k=h!=null
if(k){if(h.gF()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga2()===C.C||h.ga2()===C.a1){d=H.n(d,"<s>","")
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
d=H.n(d,"<has>","has")}d=H.iy(d,"<subject>","<subjectNoun>",0)
i=h.ga2().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cr(this.bQ(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga2().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a3(j,P.bj("<subject>.+<subject's>",!0,!1))){c=h.ga2().c
d=H.n(d,"<subject's>",c)}d=J.cr(this.bQ(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga2().c
d=H.n(d,"<subject's>",i)
i=h.ga2().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga2().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gbC()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gF()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dd(this.bQ(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga2().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a3(j,P.bj("<object>.+<object's>",!0,!1))){i=g.ga2().c
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
j=this.fu(e,this.fu(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.ob(j):j
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gd1())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gd1()?r+".":r
return H.vy(z.charCodeAt(0)==0?z:z,$.$get$fX(),new Y.og(),null)},
cg:function(){return this.hc(!1)},
kw:function(){var z,y
if(!this.geA()){C.a.sm(this.a,0)
return}z=this.a
y=C.a.aU(z,C.a.dv(z,new Y.oh()))+1
P.ca(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hz:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.ey(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gf2()}if(!this.dj(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].ghb()){if(b>=z.length)return H.e(z,b)
y=z[b].ghb()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gh3()){if(b>=z.length)return H.e(z,b)
z=z[b].gh3()}else z=!1
if(z)return!0
else return!1},
hM:function(a,b){var z,y,x,w,v
if(!this.aQ(a)||!this.aQ(b))return!1
for(z=new P.b6(this.dM(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b6(this.dM(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gG()
if(J.f(x.gi(),v.gi()))return!0}}return!1},
dV:[function(a){var z=J.aj(a)
if(z.aR(a,0)||z.bM(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaX()}},"$1","gaX",2,0,13],
bh:[function(a){var z=J.aj(a)
if(z.aR(a,0)||z.bM(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaT()}},"$1","gaT",2,0,22],
kM:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gH()!=null){y=a-1
if(this.aQ(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gH()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gH()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gH()
if(typeof y!=="number")return y.at()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.cg()},
aQ:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fu:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gF()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dd(this.bQ(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga2().a)
z=H.n(H.n(J.cr(this.bQ(C.b.a3(c,P.bj(d+".+"+e,!0,!1))?H.n(z,e,a.ga2().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga2().c),g,a.ga2().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
iP:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaP()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaP()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaP().gi()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaP().gi())},
dj:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaT()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaT()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaT().gi()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaT().gi())},
v:{
ob:function(a){var z,y,x
z=!C.b.a3(a,"\n\n")?C.b.kR(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bG(z,1)}}},oc:{"^":"a:0;",
$1:function(a){return J.f(a.gaX(),"\n\n")}},oa:{"^":"a:23;",
$1:function(a){return C.b.eS(H.n(H.n(a,"<also> ",""),"  "," "))}},od:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.I(a)
y=z.gaq(a)?z.gB(a):null
if(y!=null&&y.gka()&&J.f(b.gj0(),y.cx)){x=z.gm(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.q(a,b)
return a}},oe:{"^":"a:31;a",
$1:function(a){return J.eG(this.a,a)}},of:{"^":"a:0;",
$1:function(a){return J.f(a.gaX(),"\n\n")}},og:{"^":"a:28;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oh:{"^":"a:0;",
$1:function(a){return J.f(a.gaX(),"\n\n")}},bd:{"^":"m8;bC:a<,h:b<,c,be:d<,F:e<,a2:f<",
gi:function(){return H.aD(this)},
gc9:function(){return!0},
gbm:function(){return!0},
v:{
dm:function(a,b,c,d,e){var z=H.p([],[P.t])
return new Y.bd(c,b,z,e==null?$.$get$bT():e,!1,d)}}},m8:{"^":"d+dn;"},dn:{"^":"d;",
gaV:function(){return this.gbm()&&this.gc9()===!0},
ac:function(a,b,c,d,e,f,g,h,i,j,k,l){J.iI(a,b,c,d,e,f,g,h,i,j,H.a2(this,"$isbd"),!1,l)},
aj:function(a,b){return this.ac(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
av:function(a,b,c){return this.ac(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
dF:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
ao:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
hh:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,null,!1,!1,d)},
bX:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cV:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
cj:function(a,b,c,d,e){return this.ac(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
ay:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
ci:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eM:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bs:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
ci:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
hf:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
eN:function(a,b,c,d,e){return this.ac(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
kC:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
he:function(a,b,c,d){return this.ac(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kF:function(a,b,c,d,e,f){return this.ac(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
bY:function(a,b,c,d,e){return this.ac(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
hd:function(a,b,c){return this.ac(a,b,c,!1,!1,!1,!1,null,null,!1,!1,!1)},
kB:function(a,b,c,d){return this.ac(a,b,c,!1,!1,!1,!1,d,null,!1,!1,!1)},
hg:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kE:function(a,b,c,d,e){return this.ac(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kG:function(a,b,c,d,e,f){return this.ac(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eM:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kD:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c8:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",t_:{"^":"a:0;",
$1:function(a){a.gcD().b=2
return 2}},t5:{"^":"a:0;",
$1:function(a){a.gcD().b=0
return 0}},rZ:{"^":"a:0;",
$1:function(a){a.gcD().b=1
return 1}},h6:{"^":"d;"},pF:{"^":"h6;i:a<",
X:function(a){var z=new L.bm(null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h6))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gw:function(a){return Y.M(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
e6:function(a){var z=new L.bm(null,null)
a.$1(z)
return z.p()}}},bm:{"^":"d;a,b",
gi:function(){return this.gcD().b},
gcD:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcD().b
z=new L.pF(y)
if(y==null)H.i(P.l("id"))}this.l(z)
return z}}}],["","",,X,{"^":"",
hQ:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hQ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bb(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bb(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aN()
case 1:return P.aO(v)}}})}}],["","",,A,{"^":"",a8:{"^":"d;dm:a<,bW:b<,c,d,e,f,H:r<,x",
gjp:function(){var z=this.f
return z.length!==0?C.a.gB(z):null},
gw:function(a){var z,y,x,w,v
z=X.bu(this.a)
y=X.bu(this.d)
x=X.bu(this.f)
w=this.r
v=this.c
v=X.d4(X.aX(X.aX(0,C.e.gw(w)),J.j(v)))
return X.d4(X.aX(X.aX(X.aX(X.aX(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa8&&this.gw(this)===z.gw(b)},
fC:function(a){var z,y
z=this.hy(a,!0)
y=z.gW(z)
if(y.t()){y.gG()
return!0}return!1},
dl:function(a){var z,y
z=this.hx(a)
y=z.gW(z)
if(y.t()){y.gG()
return!0}return!1},
j_:function(a){var z=this.x
if(z==null)return!1
return C.b.a3(z.gh(),a)},
fP:function(a){var z,y,x
z=this.df(a)
if(z==null)throw H.c(new P.z("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ap()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ap:function(){++this.r},
dL:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dW(0,new A.pb(a))
if(b!=null)z=z.c1(0,new A.pc(b))
if(c!=null)z=z.c1(0,new A.pd(c))
if(e!=null)z=z.c1(0,new A.pe(e))
return d!=null?z.c1(0,new A.pf(d)):z},
hy:function(a,b){return this.dL(a,null,null,null,b)},
hx:function(a){return this.dL(a,null,null,null,null)},
a0:function(a){return this.a.aS(0,new A.pg(a))},
dP:function(a){return this.e.aS(0,new A.ph(a))},
eV:function(a){var z,y
z=this.df(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ae:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.D("No situation with name="+a+" found."))},
jR:function(a){var z=this.a.bc(0,new A.pi(a),new A.pj())
if(z==null)return!1
return z.gbm()},
ax:function(){var z,y
z=this.f
y=C.a.gB(z)
y.dA(this)
C.a.a9(z,y)},
bq:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.f(C.a.gB(z).gh(),a)))break
y=C.a.gB(z)
y.dA(this)
C.a.a9(z,y)}if(z.length===0)throw H.c(P.D("Tried to pop situations until "+a+" but none was found in stack."))},
cU:function(a,b){var z,y
z=this.df(a)
if(z==null)throw H.c(P.D("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
dG:function(a,b,c,d,e){var z,y,x,w
z=this.dL(a,b,c,d,e)
y=z.gW(z)
if(y.t()){x=y.gG()
y=this.r
w=x.gH()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kL:function(a,b,c){return this.dG(null,a,b,c,null)},
c_:function(a,b,c){return this.dG(a,null,b,null,c)},
kK:function(a,b,c){return this.dG(a,b,null,null,c)},
kJ:function(a){return this.dG(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ee()
y.ar(0,z)
return"World<"+P.c3(y,"{","}")+">"},
Y:function(a,b){var z,y,x
z=this.a0(a)
y=z.X(b)
x=this.a
x.a9(0,z)
x.q(0,y)},
df:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gi(),a)){z=x
break}++x}return z},
i0:function(a){this.a.ar(0,a.a)
this.d.ar(0,a.d)
this.b.ar(0,a.b)
this.e.ar(0,a.e)
C.a.ar(this.f,a.f)
this.r=a.r},
v:{
e4:function(a){var z,y,x,w
z=P.Z(null,null,null,R.H)
y=P.b3(null,O.cs)
x=P.Z(null,null,null,U.as)
w=P.Z(null,null,null,null)
w=new A.a8(z,x,a.c,y,w,[],null,null)
w.i0(a)
return w}}},pb:{"^":"a:0;a",
$1:function(a){return a.gep()===this.a}},pc:{"^":"a:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gi())}},pd:{"^":"a:0;a",
$1:function(a){return a.gf3().a3(0,this.a.gi())}},pe:{"^":"a:0;a",
$1:function(a){return a.ght()===this.a}},pf:{"^":"a:0;a",
$1:function(a){return a.ghr()===this.a}},pg:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a)}},ph:{"^":"a:0;a",
$1:function(a){return J.f(a.gh(),this.a)}},pi:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a)}},pj:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aq:{"^":"a9;a1:b<"},bG:{"^":"aq;c,V:d<,K:e<,h:f<,b,a",
R:[function(a,b,c){throw H.c(new P.z("SimpleAction always succeeds"))},"$3","gN",6,0,2],
S:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gO",6,0,2],
am:function(a,b){throw H.c(new P.z("SimpleAction shouldn't have to provide roll reason"))},
J:function(a,b){return 1},
gL:function(){return!1},
I:function(a,b){return!0},
gM:function(){return H.i(new P.z("Not rerollable"))},
gP:function(){return!1}}}],["","",,N,{"^":"",jO:{"^":"E;L:c<,a1:d<,K:e<,P:f<,M:r<,b,a",
gal:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gan:function(){return"will <subject> confuse <object>?"},
R:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ao(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eM(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bs(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ay(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 0.6},
I:function(a,b){var z
if(a.gF()===!0)if(a.ga8()){z=b.a
z=new H.J(z,new N.jP(this),[H.m(z,0)])
z=z.gm(z)>=2&&!this.b.eD(b)}else z=!1
else z=!1
return z},
v:{
vK:[function(a){return new N.jO(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tq",2,0,5]}},jP:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbm()){z=a.gbe()
y=this.a.b.gbe()
z=z.a
y=y.gi()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",kb:{"^":"E;P:c<,M:d<,L:e<,a1:f<,K:r<,b,a",
gal:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gan:function(){return"will <subject> kick the weapon off?"},
R:[function(a,b,c){S.af(new V.kc(this,a,c),new V.kd(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
S.af(new V.ke(this,a,c),new V.kf(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cU(y.gi(),y.X(new V.kg(this)))
z=this.b
b.Y(z.gi(),new V.kh())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gO",6,0,2],
J:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z
if(a.ga8()||a.dx===C.i){z=this.b
z=z.ga4()&&!z.gb5()}else z=!1
return z},
v:{
vN:[function(a){return new V.kb(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tH",2,0,5]}},kc:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},kd:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> weapon",y)
y.av(z,"<subject> hold<s> onto it",!0)}},ke:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kG(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga_(),z,!0)}},kf:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.dn(0,"<owner's> <subject> fl<ies> away",y,y.ga_())}},kg:{"^":"a:26;a",
$1:function(a){a.gbJ().q(0,this.a.b.ga_())
return a}},kh:{"^":"a:0;",
$1:function(a){a.sa_($.$get$eq())
return a}}}],["","",,R,{"^":"",lF:{"^":"E;P:c<,M:d<,L:e<,a1:f<,K:r<,b,a",
gh:function(){return"KickToGround"},
gal:function(){return"kick <object> to the ground"},
gan:function(){return"will <subject> kick <object> prone?"},
R:[function(a,b,c){S.af(new R.lG(this,a,c),new R.lH(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gN",6,0,2],
S:[function(a,b,c){var z
S.af(new R.lI(this,a,c),new R.lJ(this,a,c,b.ae("FightSituation").gbx()),null,null)
z=this.b
b.Y(z.gi(),new R.lK())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gO",6,0,2],
J:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
I:function(a,b){return(a.ga8()||a.dx===C.i)&&!this.b.ga4()},
v:{
w0:[function(a){return new R.lF(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uf",2,0,5]}},lG:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},lH:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> shin",y)
y.av(z,"<subject> <does>n't budge",!0)}},lI:{"^":"a:1;a,b,c",
$0:function(){this.b.kE(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},lJ:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.aj(z,"<subject> {grunt|shriek}<s>")
y.ay(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lK:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,F,{"^":"",mp:{"^":"a9;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Stand off."},
gh:function(){return"Pass"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gF()===!0)a.aj(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gO",6,0,2],
am:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return!0}}}],["","",,Y,{"^":"",mD:{"^":"E;P:c<,M:d<,L:e<,a1:f<,K:r<,b,a",
gal:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gan:function(){return"will <subject> force <object> off balance?"},
R:[function(a,b,c){var z=this.b
a.hg(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
z.bX(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.hg(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
if(z.ga8()){z.hf(c,"<subject> lose<s> <object>",!0,$.$get$eo())
b.Y(z.x,new Y.mE())
C.a.q(b.f,U.m9(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gaN()){z.aj(c,"<subject> <is> already off balance")
c.fE(0,"<subject> make<s> <object> fall to the "+H.b(b.ae("FightSituation").gbx()),z,$.$get$ir())
b.Y(z.x,new Y.mF())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.z("enemy pose must be either standing or off-balance"))},"$3","gO",6,0,2],
J:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z,y
if(!a.ga4()){z=a.d
if(z.gbd()||z.gk8()){z=this.b
if(!z.ga_().gcH()){z.ga_().gfI()
y=!1}else y=!0
z=y&&!z.ga4()}else z=!1}else z=!1
return z},
v:{
w7:[function(a){return new Y.mD(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uq",2,0,5]}},mE:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return a}},mF:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,B,{"^":"",n0:{"^":"a9;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gF()===!0)a.bs(c,"<subject> regain<s> <object>",$.$get$eo(),!0)
b.Y(a.gi(),new B.n1())
return H.b(a.gh())+" regains balance"},"$3","gO",6,0,2],
am:function(a,b){return"Will "+a.ga2().a+" regain balance?"},
J:function(a,b){return 1},
I:function(a,b){return a.gaN()}},n1:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,O,{"^":"",nf:{"^":"a9;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Scramble."},
gh:function(){return"Scramble"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gO",6,0,2],
am:function(a,b){return"Will "+a.ga2().a+" crawl out of harm's way?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga4())return!1
if(A.db(a,b))return!0
return!1}}}],["","",,Q,{"^":"",o_:{"^":"a9;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Stand up."},
gh:function(){return"StandUp"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.aj(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.af(new Q.o0(a,c),new Q.o1(a,c),null,null)
b.Y(a.gi(),new Q.o2())
return H.b(a.gh())+" stands up"},"$3","gO",6,0,2],
am:function(a,b){return"Will "+a.ga2().a+" stand up?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga4())return!1
if(A.db(a,b))return!1
return!0}},o0:{"^":"a:1;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},o1:{"^":"a:1;a,b",
$0:function(){return this.a.aj(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},o2:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,T,{"^":"",
wx:[function(a){return new A.ag(T.ez(),null,null,new T.ux(),new T.uy(),new T.uz(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vl",2,0,5],
wy:[function(a){return new A.ag(T.ez(),new T.uA(),T.ez(),new T.uB(),new T.uC(),new T.uD(),new T.uE(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vm",2,0,5],
wz:[function(a,b,c,d,e){a.ao(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Y(a.gi(),new T.uF())},"$5","ez",10,0,8],
ux:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga4()&&a.gb5()&&c.gb5()}},
uy:{"^":"a:3;",
$3:function(a,b,c){return Y.eS(a,c)}},
uz:{"^":"a:3;",
$3:function(a,b,c){return S.dL(a,c,C.l)}},
uB:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga4()&&a.gb5()&&c.gb5()}},
uC:{"^":"a:3;",
$3:function(a,b,c){return Y.eS(a,c)}},
uD:{"^":"a:3;",
$3:function(a,b,c){return S.dL(a,c,C.m)}},
uA:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uE:{"^":"a:3;",
$3:function(a,b,c){return S.dL(a,c,C.p)}},
uF:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,A,{"^":"",ag:{"^":"E;c,d,e,f,r,x,y,z,K:Q<,L:ch<,a1:cx<,h:cy<,P:db<,M:dx<,al:dy<,an:fr<,b,a",
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
I:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
wA:[function(a){return new A.ag(M.eA(),null,null,new M.uG(),new M.uH(),new M.uI(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vn",2,0,5],
wB:[function(a){return new A.ag(M.eA(),new M.uJ(),M.eA(),new M.uK(),new M.uL(),new M.uM(),new M.uN(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","vo",2,0,5],
wC:[function(a,b,c,d,e){if(a.ga4()){a.hd(c,"<subject> roll<s>",e.gi())
a.hd(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kB(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eA",10,0,8],
uG:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&!c.ga4()&&!A.db(a,b)}},
uH:{"^":"a:3;",
$3:function(a,b,c){return F.ff(a,c)}},
uI:{"^":"a:3;",
$3:function(a,b,c){return V.dz(a,c,C.l)}},
uK:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&!c.ga4()&&!A.db(a,b)}},
uL:{"^":"a:3;",
$3:function(a,b,c){return F.ff(a,c)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return V.dz(a,c,C.m)}},
uJ:{"^":"a:3;",
$3:function(a,b,c){return a.ga8()?0.4:0.2}},
uN:{"^":"a:3;",
$3:function(a,b,c){return V.dz(a,c,C.p)}}}],["","",,U,{"^":"",
wD:[function(a){return new A.ag(U.eB(),null,null,new U.uO(),new U.uP(),new U.uQ(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","vp",2,0,5],
wE:[function(a){return new A.ag(U.eB(),new U.uR(),U.eB(),new U.uS(),new U.uT(),new U.uU(),new U.uV(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vq",2,0,5],
wF:[function(a,b,c,d,e){c.j8(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eB",10,0,8],
uO:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()!==!0)z=(a.ga8()||a.dx===C.i)&&!c.ga4()&&a.gb5()
else z=!1
return z}},
uP:{"^":"a:3;",
$3:function(a,b,c){return Q.fC(a,c)}},
uQ:{"^":"a:3;",
$3:function(a,b,c){return Z.dT(a,c,C.l)}},
uS:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()===!0)z=(a.ga8()||a.dx===C.i)&&!c.ga4()&&a.gb5()
else z=!1
return z}},
uT:{"^":"a:3;",
$3:function(a,b,c){return Q.fC(a,c)}},
uU:{"^":"a:3;",
$3:function(a,b,c){return Z.dT(a,c,C.m)}},
uR:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uV:{"^":"a:3;",
$3:function(a,b,c){return Z.dT(a,c,C.p)}}}],["","",,G,{"^":"",
wG:[function(a){return new A.ag(G.eC(),null,null,new G.uY(),new G.uZ(),new G.v_(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","vr",2,0,5],
wL:[function(a){return new A.ag(G.eC(),new G.v8(),G.eC(),new G.v9(),new G.va(),new G.vb(),new G.vc(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vs",2,0,5],
wM:[function(a,b,c,d,e){return a.eN(c,"<subject> swing<s> {"+H.b(U.ad(a))+" |}at <object>",e.gi(),!0,d)},"$5","eC",10,0,8],
uY:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga8()&&!c.ga4()&&a.d.gbd()}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
v_:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
v9:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga8()&&!c.ga4()&&a.d.gbd()}},
va:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
v8:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vc:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.p)}}}],["","",,R,{"^":"",
wH:[function(a,b,c,d,e){return a.hf(c,"<subject> completely miss<es> <object> with "+H.b(U.ad(a)),!0,d)},"$5","iw",10,0,12],
wI:[function(a){return new A.ag(R.ix(),new R.v0(),R.iw(),new R.v1(),new R.v2(),new R.v3(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vt",2,0,5],
wJ:[function(a){return new A.ag(R.ix(),new R.v4(),R.iw(),new R.v5(),new R.v6(),new R.v7(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vu",2,0,5],
wK:[function(a,b,c,d,e){return a.eN(c,"<subject> swing<s> {"+H.b(U.ad(a))+" |}at <object>",e.gi(),!0,d)},"$5","ix",10,0,8],
v1:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gaN()&&!c.ga4()&&a.d.gbd()}},
v2:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
v3:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
v0:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v5:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gaN()&&!c.ga4()&&a.d.gbd()}},
v6:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
v7:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
v4:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
wN:[function(a){return new A.ag(D.eD(),null,null,new D.vd(),new D.ve(),new D.vf(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vv",2,0,5],
wO:[function(a){return new A.ag(D.eD(),new D.vg(),D.eD(),new D.vh(),new D.vi(),new D.vj(),new D.vk(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","vw",2,0,5],
wP:[function(a,b,c,d,e){return a.ao(c,"<subject> strike<s> down {with "+H.b(U.ad(a))+" |}at <object>",d)},"$5","eD",10,0,12],
vd:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga4()&&!a.ga4()&&a.d.gbd()}},
ve:{"^":"a:3;",
$3:function(a,b,c){return D.fZ(a,c)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.l)}},
vh:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga4()&&!a.ga4()&&a.d.gbd()}},
vi:{"^":"a:3;",
$3:function(a,b,c){return D.fZ(a,c)}},
vj:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.m)}},
vg:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vk:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.p)}}}],["","",,M,{"^":"",oE:{"^":"cI;a1:c<,b,a",
gK:function(){return"A different weapon might change the battle."},
gL:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gP:function(){return!1},
gM:function(){return},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gB(z):null
b.cU(y.gi(),y.X(new M.oF(this)))
b.Y(a.gi(),new M.oG(this,a))
z=this.b
a.ao(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,2],
am:function(a,b){return H.i(new P.ac(null))},
J:function(a,b){return 1},
I:function(a,b){var z,y,x
z=this.b
if(!(z instanceof L.b5))return!1
a.gji()
z=z.gaa()
y=a.d.gaa()
if(typeof y!=="number")return H.x(y)
if(z<=y)return!1
x=b.c_("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
v:{
wb:[function(a){return new M.oE(!0,a,null)},"$1","vA",2,0,47]}},oF:{"^":"a:26;a",
$1:function(a){a.gbJ().a9(0,this.a.b)
return a}},oG:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb5())a.gbW().q(0,a.ga_())
a.sa_(H.a2(this.a.b,"$isb5"))}}}],["","",,M,{"^":"",p9:{"^":"a9;K:b<,P:c<,M:d<,L:e<,a1:f<,a",
gV:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.aj(c,"<subject> shake<s> <subject's> head violently")
if(a.gF()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kD(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gO",6,0,2],
am:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z
if(a.eD(b)){z=b.c_("Confuse",a,!0)
if(typeof z!=="number")return z.b7()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",l4:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.Y(z.gi(),new R.l5())
if(J.f(z.gi(),100))a.bs(c,"<subject> smash<es> <object's> head to the ground",z,!0)
else a.bs(c,"<subject> break<s> <object's> neck",z,!0)
X.co(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vS:[function(a){return new R.l4(null,!0,!0,!0,C.c,a,null)},"$1","tO",2,0,5]}},l5:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}}}],["","",,Y,{"^":"",
eS:function(a,b){var z=new Y.dg(null,null,null,null,null)
new Y.ti(a,b).$1(z)
return z.p()},
eR:{"^":"a_;",
gaC:function(){return[R.tO()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ap:function(){var z=new Y.dg(null,null,null,null,null)
z.l(this)
new Y.jC().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new Y.jD(this),[H.m(a,0)])}},
ti:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gi()
a.gaY().b=z
z=this.b.gi()
a.gaY().d=z
return a}},
jC:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.a7()
a.gaY().e=z+1
return a}},
jD:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.a)||J.f(a.gi(),z.c)}},
pn:{"^":"eR;a,i:b<,c,H:d<",
X:function(a){var z=new Y.dg(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eR))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dg:{"^":"d;a,b,c,d,e",
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
z=new Y.pn(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",kO:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gan:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {dodge it|break free}")
S.af(new Z.kP(a,c),new Z.kQ(this,a,c),null,null)
b.ax()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.bq("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gB(z):null).gbr().bp(0.5)},
I:function(a,b){return!0},
v:{
vR:[function(a){return new Z.kO("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tL",2,0,5]}},kP:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>}",!0)}},kQ:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dL:function(a,b,c){var z=new S.dK(null,null,null,null,null,null)
new S.th(a,b,c).$1(z)
return z.p()},
fs:{"^":"c_;",
gaC:function(){return[Z.tL()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ap:function(){var z=new S.dK(null,null,null,null,null,null)
z.l(this)
new S.mj().$1(z)
return z.p()}},
th:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
mj:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.a7()
a.gaK().f=z+1
return a}},
pw:{"^":"fs;cF:a<,i:b<,cf:c<,ck:d<,H:e<",
X:function(a){var z=new S.dK(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fs))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dK:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaK().c},
gH:function(){return this.gaK().f},
gaK:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaK().b
x=this.gaK().c
w=this.gaK().d
v=this.gaK().e
u=this.gaK().f
z=new S.pw(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",
db:function(a,b){var z,y,x,w
z=b.c_("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c_("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c_("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c_("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
ad:function(a){return a.ga_().gbC()===!0?a.ga_().gh():"<subject's> "+H.b(a.ga_().gh())}}],["","",,G,{"^":"",
wl:[function(a,b,c,d,e){a.aj(c,"<subject> tr<ies> to swing back")
a.eM(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.Y(a.x,new G.tt())
a.ci(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.Y(a.x,new G.tu())
a.ay(c,"<subject> lose<s> balance because of that",!0)
a.ci(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hX",10,0,12],
wm:[function(a){return new A.ag(G.hY(),new G.tv(),G.hX(),new G.tw(),new G.tx(),new G.ty(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tD",2,0,5],
wo:[function(a,b,c,d,e){return a.ao(c,"<subject> swing<s> back",d)},"$5","hY",10,0,8],
wn:[function(a){return new A.ag(G.hY(),new G.tz(),G.hX(),new G.tA(),new G.tB(),new G.tC(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tE",2,0,5],
tt:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return a}},
tu:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},
tw:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga_().gbd()&&!a.ga4()}},
tx:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
ty:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
tv:{"^":"a:3;",
$3:function(a,b,c){return c.ga8()?0.7:0.9}},
tA:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga_().gbd()&&!a.ga4()}},
tB:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
tC:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
tz:{"^":"a:3;",
$3:function(a,b,c){return c.ga8()?0.7:0.9}}}],["","",,V,{"^":"",jX:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gan:function(){return"will <subject> tackle <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to tackle <object>",z)
S.af(new V.jY(a,c),new V.jZ(this,c),null,null)
a.ao(c,"<subject> land<s> on the "+H.b(U.et(b))+" next to <object>",z)
b.Y(a.gi(),new V.k_())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tackle<s> <object> to the ground",z)
b.Y(z.gi(),new V.k0())
b.Y(a.gi(),new V.k1())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z=this.b.gaN()?0.2:0
if(a.gF()===!0)return 0.7+z
return 0.5+z},
I:function(a,b){return!a.ga4()&&a.d instanceof K.c1},
v:{
vL:[function(a){return new V.jX("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tF",2,0,5]}},jY:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> go<es> wide",!0)}},jZ:{"^":"a:1;a,b",
$0:function(){return this.a.b.av(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k_:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},k0:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},k1:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,S,{"^":"",
dk:function(a,b){var z=new S.dj(null,null,null,null,null)
new S.t8(a,b).$1(z)
return z.p()},
eY:{"^":"a_;",
gaC:function(){return[G.tD(),G.tE(),V.tF()]},
gbi:function(){return[$.$get$dN()]},
gh:function(){return"CounterAttackSituation"},
ap:function(){var z=new S.dj(null,null,null,null,null)
z.l(this)
new S.jV().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new S.jW(this),[H.m(a,0)])}},
t8:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaZ().c=z
a.gaZ().e=0
z=this.a.gi()
a.gaZ().b=z
z=this.b.gi()
a.gaZ().d=z
return a}},
jV:{"^":"a:0;",
$1:function(a){var z=a.gaZ().e
if(typeof z!=="number")return z.a7()
a.gaZ().e=z+1
return a}},
jW:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.a)||J.f(a.gi(),z.c)}},
po:{"^":"eY;a,i:b<,c,H:d<",
X:function(a){var z=new S.dj(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eY))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dj:{"^":"d;a,b,c,d,e",
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
z=new S.po(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,X,{"^":"",
co:function(a,b,c){var z,y,x
z=b.ae("FightSituation")
y=z.gbx()
x=!J.f(c.gi(),100)
b.cU(z.gi(),z.X(new X.ug(c,x)))
if(c.gai()===C.f){c.ay(a,"<subject> stop<s> moving",!0)
a.Z(0,"\n\n",!0)
return}switch($.$get$hH().ad(3)){case 0:c.ci(a,"<subject> collapse<s>"+(x?", dead":""),!0,!0)
break
case 1:c.ay(a,"<subject> fall<s> backward",!0)
c.ay(a,"<subject> twist<s>",!0)
c.ci(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ay(a,"<subject> drop<s> to <subject's> knees",!0)
c.ay(a,"<subject> keel<s> over",!0)
break}a.Z(0,"\n\n",!0)},
ug:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!z.gb5()&&this.b)a.gbJ().q(0,z.d)
return a}}}],["","",,O,{"^":"",c_:{"^":"nI;",
az:function(a,b){if(a===0)return b.a0(this.gck())
return},
aE:function(a,b){return new H.J(a,new O.k6(this),[H.m(a,0)])}},nI:{"^":"a_+mG;"},k6:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.gcF())||J.f(a.gi(),z.gck())}}}],["","",,U,{"^":"",
et:function(a){return a.ae("FightSituation").gbx()},
cG:function(a,b,c,d,e){var z=new U.c0(null,null,null,null,null,null,null,null,null)
new U.rn(a,b,c,d,e).$1(z)
return z.p()},
cF:{"^":"a_;",
gaC:function(){return[N.tq(),V.tH(),R.uf(),Y.uq(),T.vl(),T.vm(),M.vn(),M.vo(),U.vp(),U.vq(),G.vr(),G.vs(),D.vv(),D.vw(),R.vt(),R.vu(),M.vA()]},
gbi:function(){return H.p([$.$get$fF(),$.$get$fW(),$.$get$fJ(),$.$get$ho()],[Q.a9])},
geK:function(){return 1000},
gh:function(){return"FightSituation"},
cG:function(a,b){var z=b.a
return(z&&C.a).bR(z,new U.kS(a))},
ap:function(){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.l(this)
new U.kT().$1(z)
return z.p()},
az:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hQ(this.f,this.b)
y=H.bA(z,new U.kU(b),H.y(z,"w",0),null)
x=H.y(y,"w",0)
w=P.S(new H.J(y,new U.kV(),[x]),!1,x)
x=H.m(w,0)
v=P.S(new H.J(w,new U.kW(),[x]),!1,x)
u=v.length===1?C.a.gc4(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.bc(0,new U.kX(q),new U.kY())
o=p==null?p:p.gH()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.bc(0,new U.kZ(q),new U.l_())
k=l==null?l:l.gH()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gF()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aE:function(a,b){return new H.J(a,new U.l0(this),[H.m(a,0)])},
h6:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a6(z))y.j(0,z).$2(a,b)},
dA:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cG(a,this.b)&&this.cG(a,this.f)){y=a.eV(z)
a.cU(y.gi(),y.X(new U.l1()))
for(z=this.f,x=z.a,x=new J.bb(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.a0(v).gaV()){u=a.a0(v)
t=u.X(new U.l2())
w.a9(0,u)
w.q(0,t)}}C.a.q(a.f,X.lY(z,this.d,this.a,null))}else this.cG(a,this.f)},
d7:function(a){var z=this.f
if(this.cG(a,z))if(this.cG(a,this.b)){z=z.a
z=(z&&C.a).bR(z,new U.l3(a))}else z=!1
else z=!1
return z}},
rn:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$W().ad(1073741823)
a.gak().f=z
a.gak().y=0
z=a.gak()
y=z.r
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.d)
z.r=y
z=y}else z=y
z.l(J.eJ(this.a,new U.qZ()))
z=a.gak()
y=z.c
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.d)
z.c=y
z=y}else z=y
y=this.b
z.l(new H.ao(y,new U.r_(),[H.m(y,0),null]))
a.gak().e=this.c
y=new S.N(null,null,[U.as])
y.af()
y.l(C.d)
a.gak().b=y
y=this.d.gi()
a.gak().x=y
y=new A.cL(null,null,[P.u,{func:1,v:true,args:[A.a8,Y.a0]}])
y.c7()
y.l(this.e)
a.gak().d=y
return a}},
qZ:{"^":"a:0;",
$1:function(a){return a.gi()}},
r_:{"^":"a:0;",
$1:function(a){return a.gi()}},
kS:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gaV()}},
kT:{"^":"a:0;",
$1:function(a){var z=a.gak().y
if(typeof z!=="number")return z.a7()
a.gak().y=z+1
return a}},
kU:{"^":"a:0;a",
$1:function(a){return this.a.a0(a)}},
kV:{"^":"a:0;",
$1:function(a){return a.gaV()}},
kW:{"^":"a:0;",
$1:function(a){return a.gF()}},
kX:{"^":"a:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gi())&&a.ghs()===!0}},
kY:{"^":"a:1;",
$0:function(){return}},
kZ:{"^":"a:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gi())}},
l_:{"^":"a:1;",
$0:function(){return}},
l0:{"^":"a:25;a",
$1:function(a){var z,y,x
if(a.gaV()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a3(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a3(z,y)
z=y}else z=!0}else z=!1
return z}},
l1:{"^":"a:0;",
$1:function(a){a.skl(!1)
return a}},
l2:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}},
l3:{"^":"a:29;a",
$1:function(a){var z=this.a.a0(a)
return z.gF()===!0&&z.gaV()}},
pq:{"^":"cF;bJ:a<,b,c,bx:d<,i:e<,dC:f<,r,H:x<",
X:function(a){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cF))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b))if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.f(this.f,b.f))if(J.f(this.r,b.r)){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
c0:{"^":"d;a,b,c,d,e,f,r,x,y",
gbJ:function(){var z,y
z=this.gak()
y=z.b
if(y==null){y=new S.N(null,null,[U.as])
y.af()
y.l(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gak().e},
gi:function(){return this.gak().f},
gdC:function(){var z,y
z=this.gak()
y=z.r
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.d)
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
if(!(z==null)){y=new A.cL(null,null,[H.m(z,0),H.m(z,1)])
y.c7()
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
x.l(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gak()
w=x.c
if(w==null){w=new S.N(null,null,[P.u])
w.af()
w.l(C.d)
x.c=w
x=w}else x=w
x=x.p()
w=this.gak()
v=w.d
if(v==null){v=new A.cL(null,null,[P.u,{func:1,v:true,args:[A.a8,Y.a0]}])
v.c7()
v.l(C.Z)
w.d=v
w=v}else w=v
w=w.p()
v=this.gak().e
u=this.gak().f
t=this.gak()
s=t.r
if(s==null){s=new S.N(null,null,[P.u])
s.af()
s.l(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.gak().x
r=this.gak().y
z=new U.pq(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,R,{"^":"",l6:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishLeap"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.Y(z.gi(),new R.l7())
b.Y(a.gi(),new R.l8())
y=b.ae("LeapSituation").gi()
x=U.et(b)
a.cj(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.j4(0,"both "+(a.gF()===!0||z.gF()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gah()
if(typeof w!=="number")return w.b7()
if(w>1){c.j5(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.Y(z.x,new R.l9())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vT:[function(a){return new R.l6(null,!0,!0,!0,C.c,a,null)},"$1","tP",2,0,5]}},l7:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},l8:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},l9:{"^":"a:0;",
$1:function(a){var z=a.gah()
if(typeof z!=="number")return z.at()
a.sah(z-1)
return a}}}],["","",,S,{"^":"",ki:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gan:function(){return"will <subject> dodge?"},
R:[function(a,b,c){var z=b.ae("LeapSituation").gi()
a.he(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaN())a.bY(c,"<subject> <is> out of balance",z,!0,!0)
else S.af(new S.kj(a,c,z),new S.kk(a,c,z),null,null)
b.ax()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.ae("LeapSituation").gi()
y=U.et(b)
x=this.b
a.cj(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.ay(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Y(x.gi(),new S.kl())
b.bq("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.ga4()?0.2:0
if(a.Q===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gB(x):null).gbr().bp(0.5-z+y)},
I:function(a,b){return!a.ga4()},
v:{
vO:[function(a){return new S.ki("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tI",2,0,5]}},kj:{"^":"a:1;a,b,c",
$0:function(){return this.a.bY(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kk:{"^":"a:1;a,b,c",
$0:function(){return this.a.bY(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kl:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,D,{"^":"",lg:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gan:function(){return"will <subject> impale <objectPronoun>?"},
R:[function(a,b,c){var z,y
z=b.ae("LeapSituation").gi()
y=this.b
a.eN(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ad(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaN())a.bY(c,"<subject> <is> out of balance",z,!0,!0)
else S.af(new D.lh(a,c,z),new D.li(a,c,z),null,null)
b.ax()
return H.b(a.cy)+" fails to impale "+H.b(y.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.ae("LeapSituation").gi()
y=this.b
a.cj(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ad(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.ay(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gah()
if(typeof x!=="number")return x.b7()
if(x>1){a.ga_().ao(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
y.aj(c,"<subject> fall<s> to the ground")
b.Y(y.x,new D.lj())}else{a.ga_().ao(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.ay(c,"<subject> go<es> down",!0)
X.co(c,b,y)
b.Y(y.x,new D.lk())}b.bq("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.cy)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.ga4()?0.2:0
if(a.Q===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gB(x):null).gbr().bp(0.4-z+y)},
I:function(a,b){return!a.ga4()&&a.d.geF()},
v:{
vX:[function(a){return new D.lg("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","u7",2,0,5]}},lh:{"^":"a:1;a,b,c",
$0:function(){return this.a.bY(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},li:{"^":"a:1;a,b,c",
$0:function(){return this.a.bY(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lj:{"^":"a:0;",
$1:function(a){var z=a.gah()
if(typeof z!=="number")return z.at()
a.sah(z-1)
a.sai(C.f)
return a}},lk:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}}}],["","",,V,{"^":"",
dz:function(a,b,c){var z=new V.dy(null,null,null,null,null,null)
new V.tf(a,b,c).$1(z)
return z.p()},
fd:{"^":"c_;",
gaC:function(){return[S.tI(),D.u7()]},
gh:function(){return"LeapDefenseSituation"},
ap:function(){var z=new V.dy(null,null,null,null,null,null)
z.l(this)
new V.lM().$1(z)
return z.p()}},
tf:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaG().c=z
a.gaG().f=0
z=this.a.gi()
a.gaG().b=z
z=this.b.gi()
a.gaG().e=z
a.gaG().d=this.c
return a}},
lM:{"^":"a:0;",
$1:function(a){var z=a.gaG().f
if(typeof z!=="number")return z.a7()
a.gaG().f=z+1
return a}},
pr:{"^":"fd;cF:a<,i:b<,cf:c<,ck:d<,H:e<",
X:function(a){var z=new V.dy(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fd))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dy:{"^":"d;a,b,c,d,e,f",
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
z=new V.pr(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,F,{"^":"",
ff:function(a,b){var z=new F.dA(null,null,null,null,null)
new F.tg(a,b).$1(z)
return z.p()},
fe:{"^":"a_;",
gaC:function(){return[R.tP()]},
gh:function(){return"LeapSituation"},
ap:function(){var z=new F.dA(null,null,null,null,null)
z.l(this)
new F.lN().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new F.lO(this),[H.m(a,0)])}},
tg:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gb_().c=z
a.gb_().e=0
z=this.a.gi()
a.gb_().b=z
z=this.b.gi()
a.gb_().d=z
return a}},
lN:{"^":"a:0;",
$1:function(a){var z=a.gb_().e
if(typeof z!=="number")return z.a7()
a.gb_().e=z+1
return a}},
lO:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.a)||J.f(a.gi(),z.c)}},
ps:{"^":"fe;a,i:b<,c,H:d<",
X:function(a){var z=new F.dA(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fe))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dA:{"^":"d;a,b,c,d,e",
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
z=new F.ps(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",jq:{"^":"a9;L:b<,a1:c<,P:d<,M:e<,a",
gV:function(){return""},
gK:function(){return},
gh:function(){return"AutoLoot"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b.ae("LootSituation")
y=b.a0(100)
if(y.gc9()===!0&&!y.gbm()){a.ao(c,"<subject> kneel<s> next to <object>",y)
a.ao(c,"<subject> help<s> <object> to <object's> feet",y)
y.dF(c,'"I\'ll live," <subject> say<s>.',!0)
b.Y(100,new Z.jy())}x=[]
for(w=z.gbJ(),w=w.gW(w),v=b.a,u=null;w.t();){t=w.d
if(t instanceof L.b5){s=t.gcn()
r=t.gcY()
q=t.gbC()?1:0
p=a.ga_().gaa()
if(typeof p!=="number")return H.x(p)
p=2+s+r+q>p
s=p}else s=!1
if(s){o=b.a0(a.gi())
n=o.X(new Z.jz(a,t))
v.a9(0,o)
v.q(0,n)
u=t}else{o=b.a0(a.gi())
n=o.X(new Z.jA(t))
v.a9(0,o)
v.q(0,n)
x.push(t)}}if(u!=null){a.ao(c,"<subject> pick<s> up <object>",u)
a.ao(c,"<subject> wield<s> <object>",u)}this.il(x,a,z,b,c)
if(x.length!==0)c.jc("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gO",6,0,2],
am:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return a.gF()},
il:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=L.b5
y=P.S(new H.J(a,new Z.jr(),[H.m(a,0)]),!0,z)
x=b.gbW()
x.toString
C.a.ar(y,H.uh(new H.J(x,new Z.js(),[H.m(x,0)]),"$isw"))
if(y.length===0)return
C.a.co(y,new Z.jt())
w=c.gdC().aO(0,new Z.ju(d)).dW(0,new Z.jv())
for(z=J.am(w.a),x=new H.cf(z,w.b,[H.m(w,0)]),v=d.a;x.t();){u=z.gG()
if(y.length===0)break
t=C.a.kx(y)
s=d.a0(u.gi())
r=s.X(new Z.jw(t))
v.a9(0,s)
v.q(0,r)
C.a.a9(a,t)
s=d.a0(b.gi())
r=s.X(new Z.jx(t))
v.a9(0,s)
v.q(0,r)
b.ao(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jy:{"^":"a:0;",
$1:function(a){a.sai(C.i)
a.sah(1)
return a}},jz:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.ga_() instanceof K.c1))a.gbW().q(0,z.ga_())
a.sa_(this.b)}},jA:{"^":"a:0;a",
$1:function(a){a.gbW().q(0,this.a)
return a}},jr:{"^":"a:0;",
$1:function(a){return a instanceof L.b5}},js:{"^":"a:0;",
$1:function(a){return a instanceof L.b5}},jt:{"^":"a:7;",
$2:function(a,b){return J.bW(a.gaa(),b.gaa())}},ju:{"^":"a:0;a",
$1:function(a){return this.a.a0(a)}},jv:{"^":"a:0;",
$1:function(a){return a.gaV()&&a.gb5()}},jw:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},jx:{"^":"a:0;a",
$1:function(a){a.gbW().a9(0,this.a)
return a}}}],["","",,X,{"^":"",
lY:function(a,b,c,d){var z=new X.dE(null,null,null,null,null,null)
new X.t6(a,b,c).$1(z)
return z.p()},
fk:{"^":"a_;",
gbi:function(){return H.p([$.$get$eO()],[Q.a9])},
gh:function(){return"LootSituation"},
ap:function(){var z=new X.dE(null,null,null,null,null,null)
z.l(this)
new X.m_().$1(z)
return z.p()},
az:function(a,b){if(typeof a!=="number")return a.b7()
if(a>0)return
return this.fh(b.a)},
aE:function(a,b){return[this.fh(a)]},
d7:function(a){return!0},
fh:function(a){return a.dv(0,new X.lZ())}},
t6:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.N(null,null,[P.u])
z.af()
z.l(this.a)
a.gau().d=z
z=new S.N(null,null,[U.as])
z.af()
z.l(this.c)
a.gau().b=z
return a}},
m_:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.a7()
a.gau().f=z+1
return a}},
lZ:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaV()}},
pt:{"^":"fk;bJ:a<,bx:b<,dC:c<,i:d<,H:e<",
X:function(a){var z=new X.dE(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fk))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dE:{"^":"d;a,b,c,d,e,f",
gbJ:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.N(null,null,[U.as])
y.af()
y.l(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gau().c},
gdC:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.d)
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
x.l(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.N(null,null,[P.u])
v.af()
v.l(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pt(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",md:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gan:function(){return"will <subject> hit <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to stab <object>",z)
a.av(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.Y(z.gi(),new A.me(a))
if(b.a0(z.gi()).gbm()){a.bs(c,"<subject> thrust<s> {|"+H.b(U.ad(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bs(c,"<subject> {stab<s>|run<s> "+H.b(U.ad(a))+" through} <object>",z,!0)
X.co(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){if(a.gF()===!0)return 0.6
return 0.5},
I:function(a,b){return a.ga8()&&this.b.gaN()&&a.d.geF()},
v:{
w1:[function(a){return new A.md("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","ul",2,0,5]}},me:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gah()
y=this.a.ga_().gcY()
if(typeof z!=="number")return z.at()
a.sah(z-y)
return a}}}],["","",,U,{"^":"",
m9:function(a,b){var z=new U.dH(null,null,null,null,null)
new U.tj(a,b).$1(z)
return z.p()},
fq:{"^":"a_;",
gaC:function(){return H.p([A.ul()],[{func:1,ret:Q.E,args:[R.H]}])},
gbi:function(){return[$.$get$dN()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ap:function(){var z=new U.dH(null,null,null,null,null)
z.l(this)
new U.ma().$1(z)
return z.p()},
az:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b7()
if(a>0)return
z=b.a0(this.a)
y=b.a
x=H.m(y,0)
w=P.S(new H.J(y,new U.mb(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gez(w)
if(v.ga8()&&z.gaN()&&v.d.geF())return v
return},
aE:function(a,b){return new H.J(a,new U.mc(b,b.a0(this.a)),[H.m(a,0)])}},
tj:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gb0().d=z
a.gb0().e=0
z=this.a.gi()
a.gb0().b=z
z=this.b
z=z==null?z:z.gi()
a.gb0().c=z
return a}},
ma:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.a7()
a.gb0().e=z+1
return a}},
mb:{"^":"a:25;a,b,c",
$1:function(a){var z,y
if(a.gaV())if(a.eB(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mc:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.eB(z,this.a)}},
pu:{"^":"fq;a,b,i:c<,H:d<",
X:function(a){var z=new U.dH(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fq))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dH:{"^":"d;a,b,c,d,e",
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
z=new U.pu(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",la:{"^":"E;K:c<,L:d<,a1:e<,P:f<,b,a",
gal:function(){return""},
gh:function(){return"FinishPunch"},
gM:function(){return},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga8()?C.i:C.f
x=b.ae("PunchSituation").gi()
w=b.ae("FightSituation").gbx()
b.Y(z.x,new O.lb(y))
switch(y){case C.k:throw H.c(new P.z("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fF(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ay(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fF(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vU:[function(a){return new O.la(null,!0,!0,!1,a,null)},"$1","tQ",2,0,5]}},lb:{"^":"a:0;a",
$1:function(a){a.sai(this.a)
return a}}}],["","",,E,{"^":"",km:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gan:function(){return"will <subject> dodge the fist?"},
R:[function(a,b,c){var z=b.ae("PunchSituation").gi()
a.he(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.af(new E.kn(a,c,z),new E.ko(this,a,c,z),null,null)
b.ax()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.cj(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ae("PunchSituation").gi(),z,!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gB(y):null).gbr().bp(0.4-z)},
I:function(a,b){return!0},
v:{
vP:[function(a){return new E.km("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tJ",2,0,5]}},kn:{"^":"a:1;a,b,c",
$0:function(){return this.a.bY(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},ko:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kF(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dT:function(a,b,c){var z=new Z.dS(null,null,null,null,null,null)
new Z.tc(a,b,c).$1(z)
return z.p()},
fA:{"^":"c_;",
gaC:function(){return[E.tJ()]},
gh:function(){return"PunchDefenseSituation"},
ap:function(){var z=new Z.dS(null,null,null,null,null,null)
z.l(this)
new Z.mQ().$1(z)
return z.p()}},
tc:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
mQ:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.a7()
a.gaI().f=z+1
return a}},
px:{"^":"fA;cF:a<,i:b<,cf:c<,ck:d<,H:e<",
X:function(a){var z=new Z.dS(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fA))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dS:{"^":"d;a,b,c,d,e,f",
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
z=new Z.px(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",
fC:function(a,b){var z=new Q.dU(null,null,null,null,null)
new Q.te(a,b).$1(z)
return z.p()},
fB:{"^":"a_;",
gaC:function(){return[O.tQ()]},
gh:function(){return"PunchSituation"},
ap:function(){var z=new Q.dU(null,null,null,null,null)
z.l(this)
new Q.mR().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new Q.mS(this),[H.m(a,0)])}},
te:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gb1().c=z
a.gb1().e=0
z=this.a.gi()
a.gb1().b=z
z=this.b.gi()
a.gb1().d=z
return a}},
mR:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.a7()
a.gb1().e=z+1
return a}},
mS:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.a)||J.f(a.gi(),z.c)}},
py:{"^":"fB;a,i:b<,c,H:d<",
X:function(a){var z=new Q.dU(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fB))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dU:{"^":"d;a,b,c,d,e",
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
z=new Q.py(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",lc:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlash"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.Y(z.gi(),new O.lf(a))
y=b.ae("SlashSituation").gi()
x=!b.a0(z.gi()).gbm()&&!J.f(z.gi(),100)
if(!x){a.cj(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.cj(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.co(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return a.ga_().gbd()},
v:{
vW:[function(a){return new O.lc(null,!0,!0,!0,C.c,a,null)},"$1","tR",2,0,5]}},lf:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gah()
y=this.a.ga_().gcn()
if(typeof z!=="number")return z.at()
a.sah(z-y)
return a}}}],["","",,X,{"^":"",k7:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gan:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ad(a))+"|fend it off}")
if(a.gaN())a.av(c,"<subject> <is> out of balance",!0)
else S.af(new X.k8(a,c),new X.k9(this,a,c),null,null)
b.ax()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gF()===!0)a.aj(c,"<subject> {step<s>|take<s> a step} back")
a.bX(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ad(a))+"|fend<s> it off}",!0)
if(!a.ga8()){b.Y(a.x,new X.ka())
if(a.Q===!0)a.aj(c,"<subject> regain<s> balance")}b.bq("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gB(z):null
x=a.ga8()?0:0.2
return y.gbr().bp(0.5-x)},
I:function(a,b){return a.ga_().gcH()},
v:{
vM:[function(a){return new X.k7("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tG",2,0,5]}},k8:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},k9:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ka:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,F,{"^":"",kp:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"DodgeSlash"},
gal:function(){return"dodge and counter"},
gan:function(){return"will <subject> dodge?"},
R:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaN())a.av(c,"<subject> <is> out of balance",!0)
else S.af(new F.kq(a,c),new F.kr(this,a,c),null,null)
b.ax()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga8()){z.ci(c,"<subject> lose<s> balance because of that",!0,!0)
b.Y(z.x,new F.ks())}b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gB(y):null).gbr().bp(0.4-z)},
I:function(a,b){return!a.ga4()},
v:{
vQ:[function(a){return new F.kp("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tK",2,0,5]}},kq:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kr:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ks:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return C.i}}}],["","",,O,{"^":"",lE:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gal:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gan:function(){return"will <subject> avoid the slash?"},
R:[function(a,b,c){a.dF(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.ax()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.bX(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.dn(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.ga_())
b.bq("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gB(z):null
x=a.ga8()?0:0.2
return y.gbr().bp(0.5-x)},
I:function(a,b){return a.gb5()},
v:{
w_:[function(a){return new O.lE("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","ue",2,0,5]}}}],["","",,G,{"^":"",mm:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"ParrySlash"},
gal:function(){return"parry and counter"},
gan:function(){return"will <subject> parry?"},
R:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ad(a))+"|fend it off}")
if(a.gaN())a.av(c,"<subject> <is> out of balance",!0)
else S.af(new G.mn(a,c),new G.mo(this,a,c),null,null)
b.ax()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gaN()){c.j6(0,"<subject> <is> out of balance",!0,!0,z)
c.dn(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iA())
a.bX(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ad(a))+"|fend<s> it off easily}",!0)}else a.bX(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ad(a))+"|fend<s> it off}",!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.gaN()?0.3:0
if(a.Q===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gB(x):null).gbr().bp(0.3-z+y)},
I:function(a,b){return a.ga_().gcH()},
v:{
w3:[function(a){return new G.mm("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","un",2,0,5]}},mn:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mo:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bl:function(a,b,c){var z=new L.dY(null,null,null,null,null,null)
new L.t7(a,b,c).$1(z)
return z.p()},
fN:{"^":"c_;",
gaC:function(){return[F.tK(),G.un(),X.tG(),O.ue()]},
gh:function(){return"SlashDefenseSituation"},
ap:function(){var z=new L.dY(null,null,null,null,null,null)
z.l(this)
new L.nL().$1(z)
return z.p()}},
t7:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
nL:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.a7()
a.gaJ().f=z+1
return a}},
pA:{"^":"fN;cF:a<,i:b<,cf:c<,ck:d<,H:e<",
X:function(a){var z=new L.dY(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fN))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dY:{"^":"d;a,b,c,d,e,f",
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
z=new L.pA(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,M,{"^":"",
bH:function(a,b){var z=new M.dZ(null,null,null,null,null)
new M.t9(a,b).$1(z)
return z.p()},
fO:{"^":"a_;",
gaC:function(){return[O.tR()]},
gh:function(){return"SlashSituation"},
ap:function(){var z=new M.dZ(null,null,null,null,null)
z.l(this)
new M.nM().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new M.nN(this),[H.m(a,0)])}},
t9:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
nM:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.a7()
a.gb2().e=z+1
return a}},
nN:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.a)||J.f(a.gi(),z.c)}},
pB:{"^":"fO;a,i:b<,c,H:d<",
X:function(a){var z=new M.dZ(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fO))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dZ:{"^":"d;a,b,c,d,e",
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
z=new M.pB(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",ld:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gal:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.Y(z.gi(),new Q.le())
c.fE(0,"<subject> {cuts|slashes|slits} <object's> "+(J.f(z.gi(),100)?"side":"{throat|neck|side}"),z,a.ga_())
X.co(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return this.b.ga4()&&a.ga_().gbd()},
v:{
vV:[function(a){return new Q.ld(null,!0,!0,!0,C.c,a,null)},"$1","tS",2,0,5]}},le:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}}}],["","",,K,{"^":"",mg:{"^":"E;L:c<,a1:d<,P:e<,M:f<,K:r<,b,a",
gh:function(){return"OnGroundParry"},
gal:function(){return"parry it"},
gan:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ad(a))+"}}")
S.af(new K.mh(a,c),new K.mi(this,a,c),null,null)
b.ax()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){a.bX(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ad(a))+"}",!0)
b.bq("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gB(z):null).gbr().bp(0.3)},
I:function(a,b){return a.ga_().gcH()},
v:{
w2:[function(a){return new K.mg(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","um",2,0,5]}},mh:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mi:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",n3:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"RollOutOfWay"},
gal:function(){return"roll out of way"},
gan:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.aj(c,"<subject> tr<ies> to roll out of the way")
a.av(c,"<subject> can't",!0)
b.ax()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gN",6,0,2],
S:[function(a,b,c){a.kC(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gF()===!0){b.Y(a.gi(),new Y.n4())
a.bX(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bq("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gF()===!0)return 1
z=b.f
return(z.length!==0?C.a.gB(z):null).gbr().bp(0.5)},
I:function(a,b){return!0},
v:{
w9:[function(a){return new Y.n3(null,!1,!1,!0,C.c,a,null)},"$1","ut",2,0,5]}},n4:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,V,{"^":"",
dJ:function(a,b,c){var z=new V.dI(null,null,null,null,null,null)
new V.ta(a,b,c).$1(z)
return z.p()},
fr:{"^":"c_;",
gaC:function(){return[K.um(),Y.ut()]},
gh:function(){return"OnGroundDefenseSituation"},
ap:function(){var z=new V.dI(null,null,null,null,null,null)
z.l(this)
new V.mf().$1(z)
return z.p()}},
ta:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gi()
a.gaH().b=z
z=this.b.gi()
a.gaH().e=z
a.gaH().d=this.c
return a}},
mf:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.a7()
a.gaH().f=z+1
return a}},
pv:{"^":"fr;cF:a<,i:b<,cf:c<,ck:d<,H:e<",
X:function(a){var z=new V.dI(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fr))return!1
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
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dI:{"^":"d;a,b,c,d,e,f",
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
z=new V.pv(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,D,{"^":"",
fZ:function(a,b){var z=new D.e0(null,null,null,null,null)
new D.tb(a,b).$1(z)
return z.p()},
fY:{"^":"a_;",
gaC:function(){return[Q.tS()]},
gh:function(){return"StrikeDownSituation"},
ap:function(){var z=new D.e0(null,null,null,null,null)
z.l(this)
new D.oA().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new D.oB(this),[H.m(a,0)])}},
tb:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gb3().c=z
a.gb3().e=0
z=this.a.gi()
a.gb3().b=z
z=this.b.gi()
a.gb3().d=z
return a}},
oA:{"^":"a:0;",
$1:function(a){var z=a.gb3().e
if(typeof z!=="number")return z.a7()
a.gb3().e=z+1
return a}},
oB:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gi(),z.a)||J.f(a.gi(),z.c)}},
pD:{"^":"fY;a,i:b<,c,H:d<",
X:function(a){var z=new D.e0(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fY))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e0:{"^":"d;a,b,c,d,e",
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
z=new D.pD(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",mG:{"^":"d;",
gbr:function(){switch(this.gcf()){case C.l:return C.a_
case C.m:return $.$get$fv()
case C.p:return $.$get$fw()
default:throw H.c(P.D(this.gcf()))}},
$isa_:1}}],["","",,K,{"^":"",dQ:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",nO:{"^":"a9;L:b<,P:c<,a1:d<,M:e<,a",
gV:function(){return""},
gK:function(){return},
gh:function(){return"SlayMonstersAction"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gB(z):null
x=b.dP(y.gbB())
w=b.a
C.a.q(z,x.jG(b,y,new H.J(w,new D.nP(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gO",6,0,2],
am:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
return H.a2(z.length!==0?C.a.gB(z):null,"$isa6").c}},nP:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaV()){z=a.gbe()
y=this.a.gbe()
z=z.a
y=y.gi()
if(z==null?y==null:z===y){z=a.gbB()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",oH:{"^":"cE;L:c<,a1:d<,P:e<,M:f<,b,a",
gK:function(){return},
gh:function(){return"TakeExitAction"},
R:[function(a,b,c){throw H.c(new P.ac(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaM())
y=b.f
H.a2(y.length!==0?C.a.gB(y):null,"$isa6").bo(b,a,z.gjy(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gO",6,0,2],
am:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
if(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").c===!0)return!1
this.b.gk5()
return!0},
v:{
wc:[function(a){return new Y.oH(!1,!0,!1,null,a,null)},"$1","vB",2,0,48]}}}],["","",,F,{"^":"",
fG:function(a,b){var z=new F.dW(null,null,null,null,null)
new F.rX(a,b).$1(z)
return z.p()},
a6:{"^":"a_;",
gaC:function(){return[Y.vB()]},
gbi:function(){var z=[]
C.a.ar(z,$.$get$hO())
z.push($.$get$fP())
return z},
geK:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ap:function(){var z=new F.dW(null,null,null,null,null)
z.l(this)
new F.n5().$1(z)
return z.p()},
az:function(a,b){return b.a.bc(0,new F.n6(),new F.n7())},
aE:function(a,b){var z=this.az(null,b)
if(z==null)return[]
return[z]},
bo:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dP(c)
a.cU(this.b,F.fG(z,z.gjF()!=null))
if(this.i5(a,b,z))z.d.$3(b,a,d)
else{d.er()
z.c.$3(b,a,d)
d.Z(0,"\n\n",!0)}for(y=R.i7(b,a),y=P.S(y,!0,H.y(y,"w",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.a0(y[v].gi())
t=u.X(new F.n8(z))
w.a9(0,u)
w.q(0,t)}},
h5:function(a,b){a.a.iq(new F.n9(),!0)},
d7:function(a){if(J.f(this.a,$.$get$er().b))return!1
return!0},
i5:function(a,b,c){var z,y,x
for(z=a.d,z=new P.ee(z,z.c,z.d,z.b,null,[H.m(z,0)]),y=c.b;z.t();){x=z.e
if(!J.f(x.gcS(),b.gi()))continue
if(x.gep()!=="TakeExitAction")continue
if(J.eG(x.gaM(),y)===!0)return!0}return!1}},
rX:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gaB().c=z
a.gaB().e=0
z=this.a.gh()
a.gaB().b=z
a.gaB().d=this.b
return a}},
n5:{"^":"a:0;",
$1:function(a){var z=a.gaB().e
if(typeof z!=="number")return z.a7()
a.gaB().e=z+1
return a}},
n6:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaV()}},
n7:{"^":"a:1;",
$0:function(){return}},
n8:{"^":"a:0;a",
$1:function(a){a.sbB(this.a.b)
return a}},
n9:{"^":"a:0;",
$1:function(a){return!a.gbm()}},
pz:{"^":"a6;bB:a<,i:b<,c,H:d<",
X:function(a){var z=new F.dW(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.a6))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dW:{"^":"d;a,b,c,d,e",
gbB:function(){return this.gaB().b},
sbB:function(a){this.gaB().b=a
return a},
gi:function(){return this.gaB().c},
skl:function(a){this.gaB().d=a
return a},
gH:function(){return this.gaB().e},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
z=new F.pz(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",
wq:[function(a,b,c){var z,y
z=R.aZ(6666,"Agruth",null,null,null,null,0,2,100,!1,2,!0,C.q,0,$.$get$bS())
y=z.x
a.gdm().q(0,z)
return U.cG(c,[z],"{rock|cavern} floor",b,P.aa([1,new O.tU(y),5,new O.tV(y),9,new O.tW(y),12,new O.tX(y),17,new O.tY(y)]))},"$3","vF",6,0,11],
wr:[function(a,b,c){var z=[O.ek(),O.hF()]
a.gdm().ar(0,z)
return U.cG(c,z,"{rock|cavern} floor",b,P.aC())},"$3","vG",6,0,11],
ws:[function(a,b,c){var z,y
z=R.aZ(6667,"mad guardian",null,null,new G.b4("rusty sword",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,3,100,!1,3,!1,C.q,0,$.$get$bS())
y=z.x
a.gdm().q(0,z)
return U.cG(c,[z],"{rock|cavern} floor",b,P.aa([1,new O.u_(y),9,new O.u0(y)]))},"$3","vH",6,0,11],
wt:[function(a,b,c){var z=a.fC("take_out_gate_guards")||a.fC("take_out_gate_guards_rescue")?[O.ek()]:[O.ek(),O.hF()]
a.a.ar(0,z)
return U.cG(c,z,"ground",b,P.aC())},"$3","vI",6,0,11],
az:function(a){return a.gdm().aS(0,new O.u2())},
u4:function(a,b){a.Y(O.az(a).gi(),new O.u5(b))},
ie:function(a){var z=a.f
return C.a.a3(C.Y,H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a)},
io:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gW(z),x=new H.cf(y,new O.ui(),[H.m(z,0)]);x.t();){w=y.gG()
if(!w.gb5()){v=H.a2(w.d,"$isb4")
y=b
x=v.c
u=v.d
v.r
t=P.S(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.a0(w.x)
r=s.X(new O.uj(new G.b4(y,x,u,!0,!0,!1,t)))
z.a9(0,s)
z.q(0,r)
break}}},
hF:function(){return R.aZ(1000+$.$get$el().ad(999999),"goblin",O.d8(),null,new G.b4("scimitar",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,1,0,!1,1,!1,C.q,0,$.$get$bS())},
ek:function(){return R.aZ(1000+$.$get$el().ad(999999),"orc",O.d8(),null,new G.b4("sword",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,2,0,!1,2,!1,C.q,0,$.$get$bS())},
tU:{"^":"a:7;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.a0(z)
x=new G.b4("scimitar",1,1,!1,!0,!1,P.bf(C.o,null))
y.aj(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ao(b,"<subject> draw<s> <subject's> <object>",x)
a.Y(z,new O.tT(x))
y.hh(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.az(a),!0)}},
tT:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},
tV:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).aj(b,"<subject> spit<s> on the cavern floor")}},
tW:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
b.er()
z.dF(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.Z(0,"\n\n",!0)}},
tX:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
z.aj(b,"<subject> grit<s> <subject's> teeth")
z.av(b,"<subject> do<es>n't talk any more",!0)}},
tY:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).aj(b,"<subject> scowl<s> with pure hatred")}},
u_:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).hh(b,'"Good good good," <subject> whispers<s>, eyeing <object>.',O.az(a),!0)}},
u0:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
b.er()
z.dF(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.Z(0,"\n\n",!0)}},
u2:{"^":"a:0;",
$1:function(a){return a.gF()}},
u5:{"^":"a:0;a",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.a7()
a.sb8(z+this.a)
return a}},
ui:{"^":"a:0;",
$1:function(a){return J.f(a.gbe(),$.$get$ex())}},
uj:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}}}],["","",,V,{"^":"",
oJ:function(){var z=new V.e1(null,null,null)
new V.tm().$1(z)
return z.p()},
oW:function(){var z=new V.e2(null,null,null)
new V.tl().$1(z)
return z.p()},
nT:function(){var z=new V.e_(null,null,null)
new V.tk().$1(z)
return z.p()},
rV:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"",!0)}},
rW:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
rT:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
rU:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The corpse lies still, getting cold.\n",!0)}},
nF:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"cave_with_agruth"))return!1
if(b.dl(this.d))return!1
return!0},
S:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
O.u4(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gN",6,0,2],
J:function(a,b){return 0.9},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gL:function(){return!1}},
rQ:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The crevice is small.\n",!0)}},
rR:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
rO:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
rP:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
rM:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\n"We should name that sword," Briana says, motioning to Agruth\'s scimitar. "It\'s the only thing we have going for us."\n',!0)}},
rN:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
m4:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"You're right. We'll call it Luck Bringer. It's our only chance to get out of this hell.\"\n\n\nBriana nods.")
O.io(b,"Luck Bringer")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
m5:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"You're right. We'll call it Savior. It is our first step to freedom.\"\n\n\nBriana nods.")
O.io(b,"Savior")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
m3:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"That's foolish. It's just a sword, after all.\"")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rK:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rL:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The small door is still closed. TODO!!!!\n",!0)}},
rI:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The room is dark and wet. As you enter, the noises end. \n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
rJ:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
rF:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"Smelter description TODO\n\n\nA small crevice appears to be sucking the hot air.\n",!0)}},
rG:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"Smelter short description TODO\n",!0)}},
rD:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rE:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
oS:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){if(!(!b.dl(this.d)&&O.ie(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\nBriana: "How long have you been here?"\n\n\n"Three years."\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n"Correct. The closest safe place is the fort."')
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
oT:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){if(!(b.dl("talk_to_briana_1")&&!b.dl(this.d)&&O.ie(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"Where did they catch you?"\n\n\nBriana: "At the Screaming Gate. I was trying to sneak in."\n\n\n"You what?"\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal the Orcthorn, get out, help the fight."')
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rB:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rC:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
rz:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rA:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
rx:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural, angry noises coming from a little door to your left.\n\n\n\n\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
ry:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The Underground Church stands silent, as if holding breath.\n",!0)}},
ru:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\nYou can guess which corridor leads to the smelter. Hot air is flowing into the forge through it, stirring the smoke. It\'s up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n',!0)}},
rv:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The air in the war forges is heavy and the noise overwhelming.\n",!0)}},
rs:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
rt:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
rq:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.j_("sneak_onto_cart"))c.Z(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.Z(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.Z(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
rr:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
ro:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
rp:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
tp:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
rm:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The stone gate looms before you.\n",!0)}},
nQ:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"mountain_pass_gate"))return!1
return!0},
S:[function(a,b,c){var z,y
c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
z=H.a2(b.c,"$isdl")
z.toString
y=new M.e5(null,!1,0)
y.l(z)
b.c=new V.nR().$1(y).p()
b.ae("RoomRoamingSituation").bo(b,O.az(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gL:function(){return!1}},
nR:{"^":"a:0;",
$1:function(a){a.gdX()
a.a=!0
return a}},
oI:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"mountain_pass_gate"))return!1
if(b.kJ(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.Y(a.gi(),new V.oR())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.oJ())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gN",6,0,2],
J:function(a,b){return 0.5},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gL:function(){return!1}},
oR:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a7()
a.sbw(z+10)
return a}},
h2:{"^":"a_;",
gbi:function(){return[new A.bG(new V.oM(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bG(new V.oN(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ap:function(){var z=new V.e1(null,null,null)
z.l(this)
new V.oO().$1(z)
return z.p()},
az:function(a,b){if(a!==0)return
return b.a.aS(0,new V.oP())},
aE:function(a,b){return[a.aS(0,new V.oQ())]}},
tm:{"^":"a:0;",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
oM:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.Y(a.gi(),new V.oK())
b.Y(a.gi(),new V.oL())
b.ax()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
oK:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}},
oL:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a7()
a.sbw(z+10)
return a}},
oN:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.ax()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
oO:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
oP:{"^":"a:0;",
$1:function(a){return a.gF()}},
oQ:{"^":"a:0;",
$1:function(a){return a.gF()}},
tn:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
to:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
t2:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
td:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"",!0)}},
oU:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.oW())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gN",6,0,2],
J:function(a,b){return 0.3},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gL:function(){return!1}},
h9:{"^":"a_;",
gbi:function(){return[new A.bG(new V.oY(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bG(new V.oZ(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ap:function(){var z=new V.e2(null,null,null)
z.l(this)
new V.p_().$1(z)
return z.p()},
az:function(a,b){if(a!==0)return
return b.a.aS(0,new V.p0())},
aE:function(a,b){return[a.aS(0,new V.p1())]}},
tl:{"^":"a:0;",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
oY:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
b.ax()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
oZ:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Y(a.gi(),new V.oX())
b.ax()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oX:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}},
p_:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
p0:{"^":"a:0;",
$1:function(a){return a.gF()}},
p1:{"^":"a:0;",
$1:function(a){return a.gF()}},
nS:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.nT())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gN",6,0,2],
J:function(a,b){return 0.8},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gL:function(){return!1}},
fR:{"^":"a_;",
gbi:function(){return[new A.bG(new V.nV(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bG(new V.nW(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ap:function(){var z=new V.e_(null,null,null)
z.l(this)
new V.nX().$1(z)
return z.p()},
az:function(a,b){if(a!==0)return
return b.a.aS(0,new V.nY())},
aE:function(a,b){return[a.aS(0,new V.nZ())]}},
tk:{"^":"a:0;",
$1:function(a){var z=$.$get$W().ad(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
nV:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
b.ax()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nW:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Y(a.gi(),new V.nU())
b.ax()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nU:{"^":"a:0;",
$1:function(a){a.sah(0)
return a}},
nX:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
nY:{"^":"a:0;",
$1:function(a){return a.gF()}},
nZ:{"^":"a:0;",
$1:function(a){return a.gF()}},
oV:{"^":"aq;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.f(H.a2(z.length!==0?C.a.gB(z):null,"$isa6").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ae("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
am:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"Perhaps you can divert its attention."},
gL:function(){return!1}},
rH:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
rS:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
rl:{"^":"a:4;",
$3:function(a,b,c){c.Z(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
rw:{"^":"a:4;",
$3:function(a,b,c){J.P(c,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
pE:{"^":"h2;i:a<,H:b<",
X:function(a){var z=new V.e1(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gw:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
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
z=new V.pE(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
pG:{"^":"h9;i:a<,H:b<",
X:function(a){var z=new V.e2(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gw:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
e2:{"^":"d;a,b,c",
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
z=new V.pG(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
pC:{"^":"fR;i:a<,H:b<",
X:function(a){var z=new V.e_(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gw:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
e_:{"^":"d;a,b,c",
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
z=new V.pC(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",
wp:[function(a){var z,y
z=$.$get$dc()
y=z.A
if(y.length>0){y+=" "
z.A=y}z.A=y+a},"$1","uv",2,0,16],
wu:[function(a){$.ev=a},"$1","uw",2,0,16],
hW:[function(a,b,c,d,e,f,g){var z=L.eT(a,!1,!1,d,e,f,g)
$.$get$bR().q(0,z)
return z},function(a){return O.hW(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hW(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uu",2,13,51,0,0,0,1,1,0],
ng:{"^":"ns;",
bv:function(){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bv=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cX){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.D())
m=t.Q
n=Z.o6()
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
n.b=t.f.cl(0)
m.a.E(n.D())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.D())
w=7
z=10
return P.aw(t.cv(),$async$bv)
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
case 9:case 4:if(J.f(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.D())
case 1:return P.aF(x,y)
case 2:return P.aE(v,y)}})
return P.aG($async$bv,y)},
eO:function(){var z,y
this.fk()
this.f.b4(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hn(Z.bJ())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bJ()
z.a.E(y.D())
this.bv()},
l1:[function(a){var z,y
z={}
z.a=null
y=$.$get$bR()
y.U(0,new O.nD(z,this,a))
z=z.a
if(z==null)throw H.c(P.D("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iH(z)
this.bv()},"$1","gis",2,0,32],
iH:function(a){var z
if(a.gfS()!=null){z=a.r
$.$get$cl().aA(z)}z=a.x
if(z!=null)this.el(z)},
cv:function(){var z=0,y=P.aB(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cv=P.ax(function(a,a0){if(a===1)return P.aE(a0,y)
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
q=p.gjg()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.D())
r=new P.F(0,$.r,null,[null])
r.by(null)
r.bZ(new O.nt(v))
x=!0
z=1
break}m=v.x===v.e.gaw().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gaw().length){r=v.e.gaw()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.e(r,o)
z=1
break}o=!!J.o(r[o]).$isL
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
k.ip(new O.nu(v),!1)
if(k.gm(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.D())
o=H.y(k,"b2",0)
o=P.S(new H.J(k,new O.nv(u,l),[o]),!0,o)
r=k.a
H.p([],[L.a3])
j=new L.eU(r,o)
if(!j.gT(j)){u=v.Q
r=u.e
if(r!=null){r.dt(new D.bY("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.cg(new P.F(0,$.r,null,[r]),[r])
r=j.dI()
u.a.E(r.D())
u=u.e.a.bZ(v.gis())
i=new O.nw(v)
r=H.m(u,0)
q=$.r
if(q!==C.h){i=P.em(i,q)
q.toString}u.da(new P.ec(null,new P.F(0,q,null,[r]),6,new O.nx(),i,[r,r]))
x=!0
z=1
break}else{h=k.bc(0,new O.ny(),new O.nz())
if(h!=null){if(h.gfS()!=null){r=h.r
$.$get$cl().aA(r)}r=h.x
if(r!=null)v.el(r)
k.a9(0,h)}}}r=$.$get$cl()
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
return P.aw(v.cw(f),$async$cv)
case 5:x=a0
z=1
break
case 4:r=$.ev
if(r!=null){v.el(r)
$.ev=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaw().length-1
v.x=r}else if($.hI)$.hI=!1
else{++r
v.x=r}u.a=r===v.e.gaw().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.E(o.D())
if(v.x===v.e.gaw().length){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="End of book."
u.a.E(r.D())
r=v.Q
u=v.e3()
r.toString
u=u.eR(50)
r.a.E(u.D())
v.Q.a.E(new A.v(80,null,null,null,null).D())
x=!0
z=1
break}r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.a1
u.f=new P.cg(new P.F(0,$.r,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.E(r.D())
u.f.a.bZ(new O.nA(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.o(r[q]).$isL?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.D())
try{r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.je(r[q])}catch(b){u=H.A(b)
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
if(k.bR(0,new O.nB(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.D())
r=v.Q
u=v.e3()
r.toString
u=u.eR(50)
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
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gaw().length-1?v.e3():null
q=v.e.gaw()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.aw(v.cw(H.i3(q[o],r)),$async$cv)
case 15:c=a0
if(k.bR(0,new O.nC(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=d.eR(50)
u.a.E(r.D())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaw()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.z("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aF(x,y)}})
return P.aG($async$cv,y)},
el:function(a){var z,y,x,w,v
z=$.$get$cA()
if(z.b.test(H.bt(a))){y=this.d
if(y==null)throw H.c(new P.z("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.at()
w=z-1}else{x=this.b.dO(a,this.e.gdQ())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a3(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghq()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghq()
else z=!1}else z=!1
$.hG=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.E(v.D())
v=this.e
this.d=new O.nh(v,this.x)
this.e=x
this.x=w
v.e=J.al(v.gdJ(),1)},
fk:function(){var z,y,x,w,v,u
this.x=null
$.$get$cl().b4(0)
$.$get$bR().sm(0,0)
$.r1=null
x=$.$get$cq()
x.b4(0)
w=$.$get$cm()
x.n(0,"points",w)
w.a=0
w.b.b4(0)
this.b.jj()
$.id=!0
try{this.jW()}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.D())
throw H.c(z)}this.ha()
$.id=!1},
cw:function(a){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cw=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dc()
q.A=""
w=4
z=7
return P.aw(a.$0(),$async$cw)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.A(m)
r=H.B(m)
q.A+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cw(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.A.length!==0){t.Q.eY(J.h(q)).bZ(new O.nE(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aF(x,y)
case 2:return P.aE(v,y)}})
return P.aG($async$cw,y)},
iz:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cA().b.test(H.bt(z)))return!1
y=this.b.dO(z,this.e.gdQ())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.E(w.D())
return!0}y.gkT()
return!1},"$1","gfo",2,0,33],
e3:function(){var z,y,x,w,v,u
this.ha()
try{x=this.e.gh()
w=$.$get$cq()
x=new Z.fH(x,this.b.jE(),null,null,null,null)
x.c=H.aJ(Z.cT(w),"$isG",[P.t,P.d],"$asG")
x.f=Date.now()
x.e=C.e.kQ(H.aD(x),16)
return x}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.D())
throw H.c(z)}},
h0:function(a,b){var z,y,x
this.fk()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dq("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.D())
z.jT(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.D())
this.f.ar(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.D())
y=$.$get$cq()
Z.nd(a,y,P.dB(P.t,P.bz))
this.cx=H.a2(y.j(0,"game"),"$iseZ")
this.cy=H.aJ(y.j(0,"hitpoints"),"$isau",[P.aR],"$asau")
z=[P.u]
this.db=H.aJ(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aJ(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hn(Z.bJ())
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
kg:function(a){return this.h0(a,null)},
dS:[function(a,b,c,d){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$dS=P.ax(function(e,f){if(e===1)return P.aE(f,y)
while(true)switch(z){case 0:v=$.$get$dc()
if(v.A.length!==0){w.Q.eY(J.h(v))
v.A=""}v=w.Q
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
case 1:return P.aF(x,y)}})
return P.aG($async$dS,y)},function(a,b){return this.dS(a,b,null,!1)},"kY","$4$rerollEffectDescription$rerollable","$2","ghL",4,5,44,1,0]},
nD:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seZ(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.E(x.D())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cA().b.test(H.bt(z))?y.d.a:y.b.dO(z,y.e.gdQ())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
nt:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nu:{"^":"a:0;a",
$1:function(a){return a.geZ()||this.a.iz(a)}},
nv:{"^":"a:35;a,b",
$1:function(a){return a.k6(this.b,this.a.a)}},
nw:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.E(x.D())
return}},
nx:{"^":"a:0;",
$1:function(a){return a instanceof D.bY}},
ny:{"^":"a:0;",
$1:function(a){return a.gk7()}},
nz:{"^":"a:1;",
$0:function(){return}},
nA:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nB:{"^":"a:0;a,b",
$1:function(a){return a.dw(!0,this.a.a,this.b.gfo())}},
nC:{"^":"a:0;a,b",
$1:function(a){return a.dw(!0,this.a.a,this.b.gfo())}},
nE:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
mC:{"^":"d;a,b,fM:c<",
j3:function(a,b,c){var z
if(!$.hG){z=J.al(this.a,b)
this.a=z
this.b.aA(new A.cN(b,z,c))}},
q:function(a,b){return this.j3(a,b,null)},
a7:function(a,b){this.q(0,b)
return this},
D:function(){return P.aa(["points",this.a])},
hp:function(a){this.a=a.j(0,"points")
this.b.b4(0)},
hW:function(){this.b=P.b3(null,A.cN)},
$isdX:1},
cU:{"^":"ml;aw:d<,dJ:e@,a,b,c",
ghq:function(){return J.a7(this.e,0)}},
nh:{"^":"d;a,b"},
no:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dO:function(a,b){var z
if(b!=null&&this.a.a6(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a6(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jE:function(){var z=new H.R(0,null,null,null,null,null,0,[P.t,null])
this.a.U(0,new O.nq(z))
return z},
jT:function(a){a.U(0,new O.nr(this))},
jj:function(){this.a.U(0,new O.np())}},
nq:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.aa(["visitCount",b.gdJ()]))}},
nr:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a6(a))z.j(0,a).sdJ(J.aA(b,"visitCount"))}},
np:{"^":"a:7;",
$2:function(a,b){b.sdJ(0)}}}],["","",,M,{"^":"",cw:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eN:function(a){return new M.cw(a,null,null)}}}}],["","",,M,{"^":"",ns:{"^":"d;"}}],["","",,Z,{"^":"",fH:{"^":"d;a,b,c,d,e,f",
eR:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dH()
return z},
dH:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.t,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.fQ(z)},
k:function(a){return this.dH()},
v:{
fI:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isL||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdX},
cT:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)if(Z.fI(z.j(a,x)))y.push(Z.cT(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.U(a,new Z.nc(a,w))
return w}else if(!!z.$isdX){v=a.D()
v.n(0,"_class",a.gfM())
return Z.cT(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cS:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)y.push(Z.cS(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a6("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.U(a,new Z.nb(b,v))
return v}else if(w&&a.a6("_class"))if(c!=null){c.hp(a)
return c}else{u=z.j(a,"_class")
if(!b.a6(u))throw H.c(new Z.dq("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nd:function(a,b,c){a.c.U(0,new Z.ne(b,c))}}},nc:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fI(this.a.j(0,a)))this.b.n(0,a,Z.cT(b))}},nb:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cS(b,this.a,null))}},ne:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cS(b,x,null))
else z.n(0,a,Z.cS(b,x,y))}},dq:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},ln:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",mI:{"^":"d;"},mH:{"^":"mI;"},lv:{"^":"mH;a,b,c,d,e,f,r,x",
l5:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.t
n=[o,P.d]
H.aJ(a,"$isG",n,"$asG")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.a6("strContent"))m.c=a.j(0,"strContent")
if(a.a6("listContent"))m.b=a.j(0,"listContent")
if(a.a6("intContent"))m.d=a.j(0,"intContent")
if(a.a6("mapContent"))m.e=H.aJ(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghn()){case 1070:o=this.e
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
case 1050:l=z.gjX()
this.e.bS(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.D())
o=z.gki()
if(!o.a6("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cq())
n.bN(new G.k2(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.D())
k=J.aA(z.geI(),0)
j=J.aA(z.geI(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.B,k)
o.bS(new U.cd(C.B[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.D())
o=this.e
if(o!=null){o.dt(new D.bY("Book Restart before choice was selected."))
this.e=null}try{this.c.eO()}catch(i){y=H.A(i)
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
this.e=null}try{h=z.ghP()
f=new Z.fH(null,null,null,null,null,null)
e=H.aJ(C.w.jq(h),"$isG",n,"$asG")
if(!e.a6("currentPageName")||!e.a6("vars"))H.i(new Z.ln("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aJ(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aJ(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a6("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aJ(J.iR(z.geI()),"$isbF",[o],"$asbF")
o=this.c
if(v!=null)o.h0(w,v)
else o.kg(w)}catch(i){o=H.A(i)
if(o instanceof Z.dq){u=o
t=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.D())
this.c.eO()}else{s=o
r=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.D())
this.c.eO()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bJ()
g.E(o.D())}catch(i){q=H.A(i)
p=H.B(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.D())
throw H.c(q)}this.c.toString
g.E(new A.cN(0,$.$get$cm().a,null).dI().D())
return
case 1090:this.f.bS(!0)
this.f=null
return
case 1040:this.c.bv()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghn())+"."
this.a.E(o.D())}},"$1","giF",2,0,21],
eY:function(a){var z=P.a1
this.f=new P.cg(new P.F(0,$.r,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.E(z.D())
return this.f.a}},bY:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",k2:{"^":"d;a",
D:function(){return P.c7(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;hn:a<,eI:b<,hP:c<,jX:d<,ki:e<",
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
dH:function(){return C.w.fQ(this.D())},
D:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.t,P.d])
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
z="Message "+this.gkS()
y=this.a
x=J.o(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",ml:{"^":"d;h:a@,kT:b<",
k:function(a){return this.a},
gdQ:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iM(z,": ")
if(y>0)return J.iQ(this.a,0,y)
else return}}}],["","",,A,{"^":"",cN:{"^":"d;jg:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dI:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a3:{"^":"d;eZ:a@,b,c,d,aX:e<,K:f<,fS:r<,x,y",
gk7:function(){return this.e.length===0},
dw:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
k6:function(a,b){return this.dw(a,b,null)},
kO:function(){return P.aa(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bZ:function(a){this.r=a
return this},
bA:function(a,b){return C.b.bA(this.e,b.gaX())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hT:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.D("String given to choice cannot be null."))
this.e=J.ba(a).eS(a)
this.d=C.b.gw(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.a3]},
v:{
eT:function(a,b,c,d,e,f,g){var z=new L.a3(!1,null,null,null,null,e,null,d,g)
z.hT(a,!1,!1,d,e,f,g)
return z}}},eU:{"^":"fg;a,b",
gm:function(a){return this.b.length},
sm:function(a,b){C.a.sm(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
je:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aA(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.o(a[0]).$isbz}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.A(u)
v=M.eN(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.at]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aA(y,"string")!=null&&!!J.o(J.aA(y,"string")).$isbz)try{x=J.aA(y,"string").$0()}catch(u){w=H.A(u)
v=M.eN(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.aA(y,"goto")
p=H.i3(J.aA(y,"script"),t)
o=new L.a3(!1,null,null,null,null,null,null,q,J.aA(y,"submenu"))
if(r==null)H.i(P.D("String given to choice cannot be null."))
o.e=J.ba(r).eS(r)
o.d=C.b.gw(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
ja:function(a,b,c,d,e,f,g){if(b instanceof L.a3)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eT(b,!1,!1,e,null,f,g))
else throw H.c(P.D("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.ja(a,b,!1,!1,null,null,null)},
kP:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.S(new H.J(z,new L.jH(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.U(x,new L.jI(w))
return w},
dI:function(){return this.kP(null,null,null,null)},
k:function(a){var z=this.b
return new H.ao(z,new L.jJ(),[H.m(z,0),null]).ca(0,", ")},
$asfg:function(){return[L.a3]},
$asfp:function(){return[L.a3]},
$asL:function(){return[L.a3]},
$asY:function(){return[L.a3]},
$asw:function(){return[L.a3]}},jH:{"^":"a:0;a,b,c",
$1:function(a){return a.dw(this.b,this.a,this.c)}},jI:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aS(this.a.b,a.kO())
a.a=!0}},jJ:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cV:{"^":"d;d8:a<,aX:b<",
D:function(){return P.aa(["show",this.a,"string",this.b])}},o3:{"^":"d;a",
D:function(){var z=new H.R(0,null,null,null,null,null,0,[P.t,P.d])
this.a.U(0,new Z.o4(z))
return z},
U:function(a,b){this.a.U(0,b)}},o4:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.D())}},hm:{"^":"d;h:a@,aM:b<,fN:c<,dD:d<,d8:e<,h4:f<,aX:r<",v:{
hn:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hm])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ar)(a),++v){u=a[v]
t=J.I(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.hm(s,r,q,p,o,n,t);++w}C.a.co(z,new Z.p8())
return z}}},p8:{"^":"a:7;",
$2:function(a,b){return J.bw(b.gdD(),a.gdD())}},au:{"^":"d;h:a<,aM:b<,c,fN:d<,dD:e<,f,r,h4:x<,fK:y@,fM:z<,$ti",
gaa:function(){return this.f},
saa:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cX=!0}},
gd8:function(){return this.r},
gaX:function(){return this.c.$1(this.f)},
D:function(){return P.aa(["name",this.a,"value",this.f,"show",this.r])},
hp:function(a){var z
this.saa(H.iz(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cX=!0}},
$isdX:1,
v:{
bI:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cW()
y=z.a6(a)?H.aJ(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iz(e,h)
y.r=!0
z.n(0,a,y)
return y},
o6:function(){var z,y
z=new Z.o3(new H.R(0,null,null,null,null,null,0,[P.t,Z.cV]))
y=$.$get$cW().gcm()
new H.J(y,new Z.o7(),[H.y(y,"w",0)]).U(0,new Z.o8(z))
$.cX=!1
return z},
bJ:function(){var z=H.p([],[[P.G,P.t,P.d]])
$.$get$cW().gcm().U(0,new Z.o5(z))
return z}}},o7:{"^":"a:0;",
$1:function(a){return a.gfK()}},o8:{"^":"a:24;a",
$1:function(a){var z,y
z=a.gd8()
y=a.gaX()
a.sfK(!1)
this.a.a.n(0,a.a,new Z.cV(z,y))}},o5:{"^":"a:24;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.t,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaM())
z.n(0,"color",a.gfN())
z.n(0,"priority",a.gdD())
z.n(0,"show",a.gd8())
z.n(0,"notifyOnChange",a.gh4())
z.n(0,"string",a.gaX())
this.a.push(z)}}}],["","",,N,{"^":"",dD:{"^":"d;h:a<,b,c,ie:d<,e,f",
gfU:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gh(),"")
x=this.a
return y?x:z.gfU()+"."+x},
geH:function(){if($.ib){var z=this.b
if(z!=null)return z.geH()}return $.r8},
kh:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geH().b){if(!!J.o(b).$isbz)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.us.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.A(u)
y=H.B(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gfU()
t=c
s=d
r=Date.now()
q=$.fh
$.fh=q+1
p=new N.lW(a,x,v,w,new P.cC(r,!1),q,t,s,e)
if($.ib)for(o=this;o!=null;){o.fs(p)
o=o.b}else $.$get$fj().fs(p)}},
cc:function(a,b,c,d){return this.kh(a,b,c,d,null)},
jJ:function(a,b,c){return this.cc(C.S,a,b,c)},
ag:function(a){return this.jJ(a,null,null)},
jI:function(a,b,c){return this.cc(C.R,a,b,c)},
bb:function(a){return this.jI(a,null,null)},
jH:function(a,b,c){return this.cc(C.T,a,b,c)},
bK:function(a){return this.jH(a,null,null)},
jV:function(a,b,c){return this.cc(C.A,a,b,c)},
h_:function(a){return this.jV(a,null,null)},
kU:function(a,b,c){return this.cc(C.W,a,b,c)},
eT:function(a){return this.kU(a,null,null)},
hK:function(a,b,c){return this.cc(C.V,a,b,c)},
dR:function(a){return this.hK(a,null,null)},
fs:function(a){},
v:{
bg:function(a){return $.$get$fi().ku(a,new N.t0(a))}}},t0:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d9(z,"."))H.i(P.D("name shouldn't start with a '.'"))
y=C.b.ke(z,".")
if(y===-1)x=z!==""?N.bg(""):null
else{x=N.bg(C.b.aF(z,0,y))
z=C.b.bG(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.t,N.dD])
w=new N.dD(z,x,null,w,new P.hp(w,[null,null]),null)
if(x!=null)x.gie().n(0,z,w)
return w}},aU:{"^":"d;h:a<,aa:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aU&&this.b===b.b},
aR:function(a,b){return C.e.aR(this.b,b.gaa())},
d3:function(a,b){var z=b.gaa()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
b7:function(a,b){var z=b.gaa()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bM:function(a,b){return this.b>=b.gaa()},
bA:function(a,b){var z=b.gaa()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gw:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.aU]}},lW:{"^":"d;eH:a<,b,aP:c<,d,H:e<,f,bk:r<,bg:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bu:function(a){return X.d4(J.iJ(a,0,new X.u6()))},
aX:function(a,b){var z=J.al(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d4:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
u6:{"^":"a:7;",
$2:function(a,b){return X.aX(a,J.j(b))}},
dM:{"^":"c2;a,$ti",
gaa:function(){var z=this.a
if(z==null)throw H.c(new P.z("value called on absent Optional."))
return z},
bp:function(a){var z=this.a
return z==null?a:z},
gW:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bb(z,1,0,null,[H.m(z,0)])}else z=C.H
return z},
gw:function(a){return J.j(this.a)},
u:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dM){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
hV:function(a,b){if(this.a==null)throw H.c(P.D("Must not be null."))},
v:{
ft:function(a,b){var z=new X.dM(a,[b])
z.hV(a,b)
return z}}}}],["","",,U,{"^":"",cR:{"^":"d;a,b",
k:function(a){return this.b}},cd:{"^":"d;a,kV:b<",
geE:function(){return this.a===C.D},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.cd&&b.a===this.a&&J.f(b.b,this.b)},
gw:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
wv:[function(a,b){var z,y,x,w,v
z=new D.lv(b,null,null,null,null,null,null,null)
y=$.fE
$.fE=y+1
x=new H.cb(y,null,!1)
w=init.globalState.d
w.dY(y,x)
w.cE()
w=new H.mY(x,null)
w.hX(x)
z.b=w
w=w.b
w.toString
new P.cZ(w,[H.m(w,0)]).aD(z.giF(),null,null,null)
b.E(new H.cj(z.b.a,init.globalState.d.a))
v=N.nj()
z.c=v
v.Q=z},"$2","hZ",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f7.prototype
return J.f6.prototype}if(typeof a=="string")return J.c6.prototype
if(a==null)return J.f8.prototype
if(typeof a=="boolean")return J.f5.prototype
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.aI=function(a){if(a==null)return a
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.I=function(a){if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.aj=function(a){if(typeof a=="number")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.eu=function(a){if(typeof a=="number")return J.c5.prototype
if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.ba=function(a){if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.al=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eu(a).a7(a,b)}
J.aY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aj(a).d2(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).u(a,b)}
J.a7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aj(a).b7(a,b)}
J.bU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aj(a).aR(a,b)}
J.bV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eu(a).c2(a,b)}
J.iH=function(a){if(typeof a=="number")return-a
return J.aj(a).eW(a)}
J.bw=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aj(a).at(a,b)}
J.aA=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).j(a,b)}
J.aS=function(a,b){return J.aI(a).q(a,b)}
J.iI=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aI(a).j2(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.P=function(a,b,c){return J.aI(a).Z(a,b,c)}
J.bW=function(a,b){return J.eu(a).bA(a,b)}
J.eG=function(a,b){return J.I(a).a3(a,b)}
J.eH=function(a,b){return J.aI(a).as(a,b)}
J.iJ=function(a,b,c){return J.aI(a).bl(a,b,c)}
J.j=function(a){return J.o(a).gw(a)}
J.eI=function(a){return J.I(a).gT(a)}
J.am=function(a){return J.aI(a).gW(a)}
J.iK=function(a){return J.aI(a).gB(a)}
J.aK=function(a){return J.I(a).gm(a)}
J.iL=function(a){return J.o(a).gbu(a)}
J.iM=function(a,b){return J.I(a).aU(a,b)}
J.eJ=function(a,b){return J.aI(a).aO(a,b)}
J.iN=function(a,b,c){return J.ba(a).h1(a,b,c)}
J.dd=function(a,b,c){return J.ba(a).kz(a,b,c)}
J.cr=function(a,b,c){return J.ba(a).cT(a,b,c)}
J.iO=function(a){return J.aj(a).hi(a)}
J.iP=function(a,b){return J.aI(a).dT(a,b)}
J.eK=function(a,b){return J.ba(a).d9(a,b)}
J.iQ=function(a,b,c){return J.ba(a).aF(a,b,c)}
J.iR=function(a){return J.aI(a).bE(a)}
J.h=function(a){return J.o(a).k(a)}
J.bX=function(a,b){return J.aj(a).b6(a,b)}
J.iS=function(a,b){return J.aI(a).c1(a,b)}
I.bv=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.K=J.aT.prototype
C.a=J.c4.prototype
C.M=J.f5.prototype
C.t=J.f6.prototype
C.e=J.f7.prototype
C.v=J.f8.prototype
C.j=J.c5.prototype
C.b=J.c6.prototype
C.E=new A.an(0,0,0)
C.F=new A.an(-1/0,-1/0,-1/0)
C.G=new A.ct(-10,0,100)
C.H=new H.kM([null])
C.I=new P.mk()
C.u=new P.q1()
C.J=new P.qk()
C.h=new P.qz()
C.x=new P.b0(0)
C.L=new U.dr(0,"ItemType.spear")
C.y=new U.dr(1,"ItemType.sword")
C.z=new U.dr(2,"ItemType.fist")
C.N=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.lA(null,null)
C.O=new P.lC(null)
C.P=new P.lD(null,null)
C.Q=new O.lL(0,"KnownToMode.all")
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
C.B=I.bv([C.D,C.a2,C.a3,C.a4])
C.o=I.bv([C.y])
C.X=I.bv([C.z])
C.Y=I.bv(["cave_with_agruth","guardpost_above_church","orcthorn_door","smelter","underground_church","war_forge"])
C.d=I.bv([])
C.Z=new H.jS(0,{},C.d,[null,null])
C.a_=new X.dM(null,[P.K])
C.k=new R.dP(0,"Pose.standing")
C.i=new R.dP(1,"Pose.offBalance")
C.f=new R.dP(2,"Pose.onGround")
C.l=new K.dQ(0,"Predetermination.none")
C.p=new K.dQ(1,"Predetermination.successGuaranteed")
C.m=new K.dQ(2,"Predetermination.failureGuaranteed")
C.q=new Y.c8("he","him","his","himself")
C.r=new Y.c8("it","it","its","itself")
C.a0=new Y.c8("she","her","her","herself")
C.a1=new Y.c8("they","them","their","themselves")
C.C=new Y.c8("you","you","your","yourself")
C.c=new Q.n2(0,"Resource.stamina")
C.a5=H.b8("f9")
C.a6=H.b8("at")
C.a7=H.b8("t")
C.a8=H.b8("a1")
C.a9=H.b8("aR")
C.n=H.b8("dynamic")
C.aa=H.b8("u")
C.ab=H.b8("K")
C.ac=new P.bL(null,2)
$.fE=1
$.fx="$cachedFunction"
$.fy="$cachedInvocation"
$.aL=0
$.bx=null
$.eP=null
$.bq=null
$.bO=null
$.bP=null
$.ei=!1
$.r=C.h
$.f0=0
$.ev=null
$.hG=!1
$.r1=null
$.hI=!1
$.id=!0
$.cX=!1
$.ib=!1
$.us=C.U
$.r8=C.A
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
I.$lazy(y,x,w)}})(["f2","$get$f2",function(){return H.lt()},"f3","$get$f3",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f0
$.f0=z+1
z="expando$key$"+z}return new P.kR(null,z,[P.u])},"hb","$get$hb",function(){return H.aM(H.cY({
toString:function(){return"$receiver$"}}))},"hc","$get$hc",function(){return H.aM(H.cY({$method$:null,
toString:function(){return"$receiver$"}}))},"hd","$get$hd",function(){return H.aM(H.cY(null))},"he","$get$he",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hi","$get$hi",function(){return H.aM(H.cY(void 0))},"hj","$get$hj",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hg","$get$hg",function(){return H.aM(H.hh(null))},"hf","$get$hf",function(){return H.aM(function(){try{null.$method$}catch(z){return z.message}}())},"hl","$get$hl",function(){return H.aM(H.hh(void 0))},"hk","$get$hk",function(){return H.aM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e7","$get$e7",function(){return P.pK()},"be","$get$be",function(){var z,y
z=P.at
y=new P.F(0,P.pk(),null,[z])
y.i3(null,z)
return y},"bQ","$get$bQ",function(){return[]},"eq","$get$eq",function(){return new K.c1("fist",P.bf(C.X,null))},"bC","$get$bC",function(){return N.bg("PlannerRecommendation")},"i0","$get$i0",function(){return new K.rk()},"er","$get$er",function(){var z=$.$get$i0()
return K.O("__END_OF_ROAM__",z,z,null,null,[],"ground")},"W","$get$W",function(){return P.cP(null)},"bE","$get$bE",function(){return P.cP(null)},"ih","$get$ih",function(){return N.bg("Storyline")},"fX","$get$fX",function(){return P.bj("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bS","$get$bS",function(){return L.e6(new L.t_())},"bT","$get$bT",function(){return L.e6(new L.t5())},"ex","$get$ex",function(){return L.e6(new L.rZ())},"dN","$get$dN",function(){return new F.mp("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eo","$get$eo",function(){return Y.dm(!1,"balance",!0,C.r,$.$get$bT())},"ir","$get$ir",function(){return Y.dm(!1,"pounding",!1,C.r,$.$get$bT())},"fF","$get$fF",function(){return new B.n0("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fJ","$get$fJ",function(){return new O.nf(null,!1,!0,!1,null,null)},"fW","$get$fW",function(){return new Q.o_(null,!1,!0,!0,C.c,null)},"ho","$get$ho",function(){return new M.p9("",!0,C.c,!1,!0,null)},"hH","$get$hH",function(){return P.cP(null)},"eO","$get$eO",function(){return new Z.jq(!1,!0,!1,null,null)},"iA","$get$iA",function(){return Y.dm(!1,"swing",!0,C.r,$.$get$bT())},"fv","$get$fv",function(){return X.ft(0,P.K)},"fw","$get$fw",function(){return X.ft(1,P.K)},"fP","$get$fP",function(){return new D.nO(!1,!1,!0,null,null)},"el","$get$el",function(){return P.cP(null)},"hV","$get$hV",function(){return K.O("cave_with_agruth_pre",new V.rV(),new V.rW(),null,null,H.p([new Q.q("cave_with_agruth","","You look around.",null)],[Q.q]),"ground")},"hU","$get$hU",function(){return K.O("cave_with_agruth",new V.rT(),new V.rU(),null,null,H.p([new Q.q("underground_church","Flee through the Underground Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.q("war_forge","Flee through the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null)],[Q.q]),"ground")},"fK","$get$fK",function(){return new V.nF("Search Agruth","search_agruth",!0,null)},"i2","$get$i2",function(){return K.O("forge_church_crevice",new V.rQ(),new V.rR(),null,null,H.p([new Q.q("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.q]),"ground")},"ia","$get$ia",function(){return K.O("guardpost_above_church",new V.rO(),new V.rP(),null,null,H.p([new Q.q("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.q("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.q("smelter","Go to the smelter","Something something.",null)],[Q.q]),"ground")},"ig","$get$ig",function(){return K.O("just_after_agruth_fight",new V.rM(),new V.rN(),null,null,H.p([],[Q.q]),"ground")},"fm","$get$fm",function(){return new V.m4('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fn","$get$fn",function(){return new V.m5('"Savior"',"name_agruth_sword_redemption",!0,null)},"fl","$get$fl",function(){return new V.m3("No name","name_agruth_sword_nothing",!0,null)},"ip","$get$ip",function(){return K.O("orcthorn_door",new V.rK(),new V.rL(),null,null,H.p([new Q.q("guardpost_above_church","Enter the small passage","You enter the passage and go a long, slightly rising way.",null),new Q.q("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, sneak out of the church, and go where you left Agruth's body.",null),new Q.q("orcthorn_room","Open the door","You open the door.",null)],[Q.q]),"ground")},"iq","$get$iq",function(){return K.O("orcthorn_room",new V.rI(),new V.rJ(),O.vH(),null,H.p([new Q.q("orcthorn_door","Exit the room","You go through the door and into the main cave of the Underground Church.",null)],[Q.q]),"ground")},"it","$get$it",function(){return K.O("smelter",new V.rF(),new V.rG(),null,null,H.p([new Q.q("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.q("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.q("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.q]),"ground")},"iu","$get$iu",function(){return K.O("start_adventure",new V.rD(),new V.rE(),O.vF(),null,H.p([new Q.q("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.q]),"ground")},"h4","$get$h4",function(){return new V.oS("Talk to Briana","talk_to_briana_1",!0,null)},"h5","$get$h5",function(){return new V.oT("Talk to Briana","talk_to_briana_2",!0,null)},"iB","$get$iB",function(){return K.O("the_shafts",new V.rB(),new V.rC(),null,null,H.p([new Q.q("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.q]),"ground")},"iD","$get$iD",function(){return K.O("tunnel",new V.rz(),new V.rA(),O.vG(),null,H.p([new Q.q("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.q]),"ground")},"iE","$get$iE",function(){return K.O("underground_church",new V.rx(),new V.ry(),null,null,H.p([new Q.q("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.q("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.q("orcthorn_door","Approach the little door","Something something.",null)],[Q.q]),"ground")},"iF","$get$iF",function(){return K.O("war_forge",new V.ru(),new V.rv(),null,null,H.p([new Q.q("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.q("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.q]),"ground")},"i1","$get$i1",function(){return K.O("entrance_to_bloodrock",new V.rs(),new V.rt(),null,null,H.p([new Q.q("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.q("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.q]),"ground")},"ii","$get$ii",function(){return K.O("mountain_pass",new V.rq(),new V.rr(),null,null,H.p([new Q.q("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.q]),"ground")},"ij","$get$ij",function(){return K.O("mountain_pass_gate",new V.ro(),new V.rp(),null,null,H.p([new Q.q("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.q]),"ground")},"ik","$get$ik",function(){return K.O("mountain_pass_guard_post",new V.tp(),new V.rm(),O.vI(),null,H.p([new Q.q("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.q]),"ground")},"fQ","$get$fQ",function(){return new V.nQ("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"h3","$get$h3",function(){return new V.oI("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"il","$get$il",function(){return K.O("mountainside_base",new V.tn(),new V.to(),null,null,H.p([new Q.q("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.q]),"ground")},"im","$get$im",function(){return K.O("mountainside_path",new V.t2(),new V.td(),null,null,H.p([new Q.q("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.q]),"ground")},"ha","$get$ha",function(){return new V.oU("Scare off the serpent","threaten_winged_serpent",!0,null)},"fS","$get$fS",function(){return new V.nS("Soothe the serpent","soothe_winged_serpent",!0,null)},"h8","$get$h8",function(){return new V.oV("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"iG","$get$iG",function(){return K.O("winged_serpent_nest",new V.rH(),new V.rS(),null,null,H.p([new Q.q("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.q]),"ground")},"ic","$get$ic",function(){return K.O("ironcast_road",new V.rl(),new V.rw(),null,null,H.p([new Q.q("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.q]),"ground")},"hP","$get$hP",function(){return H.p([$.$get$hV(),$.$get$hU(),$.$get$i2(),$.$get$ia(),$.$get$ig(),$.$get$ip(),$.$get$iq(),$.$get$it(),$.$get$iu(),$.$get$iB(),$.$get$iD(),$.$get$iE(),$.$get$iF(),$.$get$i1(),$.$get$ii(),$.$get$ij(),$.$get$ik(),$.$get$il(),$.$get$im(),$.$get$iG(),$.$get$ic()],[K.cc])},"hO","$get$hO",function(){return H.p([$.$get$fK(),$.$get$fm(),$.$get$fn(),$.$get$fl(),$.$get$h4(),$.$get$h5(),$.$get$fQ(),$.$get$h3(),$.$get$ha(),$.$get$fS(),$.$get$h8()],[A.aq])},"dc","$get$dc",function(){return P.oC("")},"cm","$get$cm",function(){var z=new O.mC(0,null,"PointsCounter")
z.hW()
return z},"bR","$get$bR",function(){return new L.eU(null,H.p([],[L.a3]))},"cq","$get$cq",function(){return H.fc(P.t,P.d)},"cl","$get$cl",function(){return P.b3(null,{func:1,ret:[P.Q,P.at]})},"cA","$get$cA",function(){return P.bj("^\\s*<<<\\s*$",!0,!1)},"cW","$get$cW",function(){return H.fc(P.t,Z.au)},"fj","$get$fj",function(){return N.bg("")},"fi","$get$fi",function(){return P.dB(P.t,N.dD)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.t,args:[R.H,A.a8,Y.a0]},{func:1,args:[,,,]},{func:1,args:[R.H,A.a8,Y.a0]},{func:1,ret:Q.E,args:[R.H]},{func:1,v:true},{func:1,args:[,,]},{func:1,v:true,args:[R.H,A.a8,Y.a0,R.H,S.a_]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,ret:U.cF,args:[A.a8,F.a6,[P.w,R.H]]},{func:1,v:true,args:[R.H,A.a8,Y.a0,R.H,,]},{func:1,ret:P.t,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.aW]},{func:1,v:true,args:[P.t]},{func:1,args:[P.aR]},{func:1,ret:P.Q},{func:1,ret:P.K,args:[A.an]},{func:1,args:[,P.aW]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bd,args:[P.u]},{func:1,ret:P.t,args:[P.t]},{func:1,args:[Z.au]},{func:1,args:[R.H]},{func:1,args:[U.c0]},{func:1,args:[P.K,R.H]},{func:1,args:[P.bh]},{func:1,ret:P.a1,args:[P.u]},{func:1,args:[P.u,,]},{func:1,args:[Y.ab]},{func:1,v:true,args:[P.u]},{func:1,ret:P.a1,args:[L.a3]},{func:1,v:true,args:[[P.L,P.t],P.fL]},{func:1,args:[L.a3]},{func:1,args:[P.t,,]},{func:1,args:[P.t,Z.cV]},{func:1,args:[[P.L,Y.ab],Y.ab]},{func:1,ret:P.K,args:[A.ct]},{func:1,ret:P.u,args:[P.V,P.V]},{func:1,ret:P.t,args:[Q.a9]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.u,args:[P.u,P.u]},{func:1,ret:[P.Q,U.cd],args:[P.aR,P.t],named:{rerollEffectDescription:P.t,rerollable:P.a1}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aW]},{func:1,ret:Q.cI,args:[U.as]},{func:1,ret:Q.cE,args:[Q.q]},{func:1,v:true,args:[P.d,P.aW]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a3,args:[P.t],named:{deferToChoiceList:P.a1,deferToEndOfPage:P.a1,goto:P.t,helpMessage:P.t,script:{func:1,ret:[P.Q,P.at]},submenu:P.t}},{func:1,args:[P.a1]}]
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
if(x==y)H.vC(d||a)
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
Isolate.bv=a.bv
Isolate.b9=a.b9
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iv(X.hZ(),b)},[])
else (function(b){H.iv(X.hZ(),b)})([])})})()