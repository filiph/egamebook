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
if(b5.$isaV)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.eo"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.eo"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.eo(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bb=function(){}
var dart=[["","",,H,{"^":"",vZ:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aV:{"^":"d;",
u:function(a,b){return a===b},
gA:function(a){return H.aA(a)},
k:function(a){return H.cT(a)},
gbx:function(a){return new H.au(H.ib(a),null)}},
f9:{"^":"aV;",
k:function(a){return String(a)},
gA:function(a){return a?519018:218159},
gbx:function(a){return C.ac},
$isa_:1},
fc:{"^":"aV;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gA:function(a){return 0},
gbx:function(a){return C.aa},
$isas:1},
ff:{"^":"aV;",
gA:function(a){return 0},
gbx:function(a){return C.a9},
k:function(a){return String(a)},
$isfd:1},
w5:{"^":"ff;"},
bn:{"^":"ff;"},
c8:{"^":"aV;$ti",
fS:function(a,b){if(!!a.immutable$list)throw H.c(new P.R(b))},
cN:function(a,b){if(!!a.fixed$length)throw H.c(new P.R(b))},
q:function(a,b){this.cN(a,"add")
a.push(b)},
hl:function(a){this.cN(a,"removeLast")
if(a.length===0)throw H.c(H.aF(a,-1))
return a.pop()},
a1:function(a,b){var z
this.cN(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
iX:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.D(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c4:function(a,b){return new H.J(a,b,[H.m(a,0)])},
ax:function(a,b){var z
this.cN(a,"addAll")
for(z=J.ah(b);z.t();)a.push(z.d)},
V:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.D(a))}},
aD:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dX:function(a,b){return H.h4(a,b,null,H.m(a,0))},
bt:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.D(a))}return y},
bj:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.ai())},
dw:function(a,b){return this.bj(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geD:function(a){if(a.length>0)return a[0]
throw H.c(H.ai())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ai())},
gc8:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ai())
throw H.c(H.dw())},
aZ:function(a,b,c,d,e){var z,y,x
this.fS(a,"setRange")
P.ce(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a2(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f8())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bU:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.D(a))}return!1},
c9:function(a,b){var z
this.fS(a,"sort")
z=b==null?P.tm():b
H.ci(a,0,a.length-1,z)},
f4:function(a){return this.c9(a,null)},
bO:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aV:function(a,b){return this.bO(a,b,0)},
a3:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gU:function(a){return a.length===0},
gap:function(a){return a.length!==0},
k:function(a){return P.c7(a,"[","]")},
bF:function(a){return P.b4(a,H.m(a,0))},
gZ:function(a){return new J.bd(a,a.length,0,null,[H.m(a,0)])},
gA:function(a){return H.aA(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cN(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cy(b,"newLength",null))
if(b<0)throw H.c(P.a2(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aF(a,b))
if(b>=a.length||b<0)throw H.c(H.aF(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.R("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aF(a,b))
if(b>=a.length||b<0)throw H.c(H.aF(a,b))
a[b]=c},
$iscP:1,
$ascP:I.bb,
$isL:1,
$isX:1},
vY:{"^":"c8;$ti"},
bd:{"^":"d;a,b,c,d,$ti",
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
c9:{"^":"aV;",
bB:function(a,b){var z
if(typeof b!=="number")throw H.c(H.S(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdA(b)
if(this.gdA(a)===z)return 0
if(this.gdA(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdA:function(a){return a===0?1/a<0:a<0},
hr:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.R(""+a+".round()"))},
kX:function(a){return a},
bc:function(a,b){var z
if(b>20)throw H.c(P.a2(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdA(a))return"-"+z
return z},
l_:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a2(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cO(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.R("Unexpected toString result: "+z))
x=J.I(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c6("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
f0:function(a){return-a},
ag:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a+b},
ar:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a-b},
d5:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a/b},
c6:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a*b},
bK:function(a,b){return(a|0)===a?a/b|0:this.j5(a,b)},
j5:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.R("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dq:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aS:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<b},
bd:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a>b},
d6:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<=b},
bP:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a>=b},
gbx:function(a){return C.af},
$isK:1},
fb:{"^":"c9;",
gbx:function(a){return C.ae},
$isaS:1,
$isK:1,
$ist:1},
fa:{"^":"c9;",
gbx:function(a){return C.ad},
$isaS:1,
$isK:1},
ca:{"^":"aV;",
cO:function(a,b){if(b<0)throw H.c(H.aF(a,b))
if(b>=a.length)H.i(H.aF(a,b))
return a.charCodeAt(b)},
cz:function(a,b){if(b>=a.length)throw H.c(H.aF(a,b))
return a.charCodeAt(b)},
dr:function(a,b,c){if(c>b.length)throw H.c(P.a2(c,0,b.length,null,null))
return new H.qL(b,a,c)},
ew:function(a,b){return this.dr(a,b,0)},
h9:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a2(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cO(b,c+y)!==this.cz(a,y))return
return new H.h3(c,b,a)},
ag:function(a,b){if(typeof b!=="string")throw H.c(P.cy(b,null,null))
return a+b},
eB:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bI(a,y-z)},
kK:function(a,b,c){H.bt(c)
return H.n(a,b,c)},
kL:function(a,b,c,d){H.bt(c)
P.nd(d,0,a.length,"startIndex",null)
return H.iu(a,b,c,d)},
cZ:function(a,b,c){return this.kL(a,b,c,0)},
hY:function(a,b,c){var z
if(c>a.length)throw H.c(P.a2(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iM(b,a,c)!=null},
dd:function(a,b){return this.hY(a,b,0)},
aG:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.S(c))
if(b<0)throw H.c(P.cd(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.c(P.cd(b,null,null))
if(c>a.length)throw H.c(P.cd(c,null,null))
return a.substring(b,c)},
bI:function(a,b){return this.aG(a,b,null)},
eW:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cz(z,0)===133){x=J.dx(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cO(z,w)===133?J.lL(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l0:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cz(z,0)===133?J.dx(z,1):0}else{y=J.dx(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c6:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.J)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bO:function(a,b,c){var z
if(c>a.length)throw H.c(P.a2(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aV:function(a,b){return this.bO(a,b,0)},
kr:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kq:function(a,b){return this.kr(a,b,null)},
jv:function(a,b,c){if(b==null)H.i(H.S(b))
if(c>a.length)throw H.c(P.a2(c,0,a.length,null,null))
return H.vx(a,b,c)},
a3:function(a,b){return this.jv(a,b,0)},
gU:function(a){return a.length===0},
gap:function(a){return a.length!==0},
bB:function(a,b){var z
if(typeof b!=="string")throw H.c(H.S(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbx:function(a){return C.ab},
gl:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aF(a,b))
if(b>=a.length||b<0)throw H.c(H.aF(a,b))
return a[b]},
$iscP:1,
$ascP:I.bb,
$isr:1,
$isdS:1,
v:{
fe:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dx:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cz(a,b)
if(y!==32&&y!==13&&!J.fe(y))break;++b}return b},
lL:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cO(a,z)
if(y!==32&&y!==13&&!J.fe(y))break}return b}}}}],["","",,H,{"^":"",
hF:function(a){return a},
ai:function(){return new P.x("No element")},
dw:function(){return new P.x("Too many elements")},
f8:function(){return new P.x("Too few elements")},
ci:function(a,b,c,d){if(c-b<=32)H.fX(a,b,c,d)
else H.fW(a,b,c,d)},
fX:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.I(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a5(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
fW:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bK(c-b+1,6)
y=b+z
x=c-z
w=C.e.bK(b+c,2)
v=w-z
u=w+z
t=J.I(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.a5(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a5(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a5(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a5(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a5(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a5(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a5(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a5(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a5(d.$2(p,o),0)){n=o
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
if(h.u(i,0))continue
if(h.aS(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.al(i)
if(h.bd(i,0)){--l
continue}else{g=l-1
if(h.aS(i,0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.bX(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.a5(d.$2(j,p),0))for(;!0;)if(J.a5(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bX(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
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
H.ci(a,b,m-2,d)
H.ci(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bX(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.ci(a,m,l,d)}else H.ci(a,m,l,d)},
X:{"^":"z;$ti"},
aX:{"^":"X;$ti",
gZ:function(a){return new H.dG(this,this.gl(this),0,null,[H.y(this,"aX",0)])},
V:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gU:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ai())
return this.as(0,this.gl(this)-1)},
a3:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.as(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bj:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
ci:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gl(this))throw H.c(new P.D(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}},
c4:function(a,b){return this.de(0,b)},
aD:function(a,b){return new H.ap(this,b,[H.y(this,"aX",0),null])},
bt:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gl(this))throw H.c(new P.D(this))}return y},
bE:function(a,b){var z,y,x,w
z=[H.y(this,"aX",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.as(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cs:function(a){return this.bE(a,!0)},
bF:function(a){var z,y
z=P.a1(null,null,null,H.y(this,"aX",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.as(0,y))
return z}},
oQ:{"^":"aX;a,b,c,$ti",
giy:function(){var z=J.aI(this.a)
return z},
gj3:function(){var z,y
z=J.aI(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aI(this.a)
y=this.b
if(y>=z)return 0
return z-y},
as:function(a,b){var z,y
z=this.gj3()+b
if(!(b<0)){y=this.giy()
if(typeof y!=="number")return H.w(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cM(b,this,"index",null,null))
return J.eI(this.a,z)},
bE:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.I(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.p([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.p(s,u)}for(r=0;r<v;++r){u=x.as(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.D(this))}return t},
i8:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a2(z,0,null,"start",null))},
v:{
h4:function(a,b,c,d){var z=new H.oQ(a,b,c,[d])
z.i8(a,b,c,d)
return z}}},
dG:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.as(0,x);++this.c
return!0}},
dJ:{"^":"z;a,b,$ti",
gZ:function(a){return new H.mf(null,J.ah(this.a),this.b,this.$ti)},
gl:function(a){return J.aI(this.a)},
gU:function(a){return J.eJ(this.a)},
gw:function(a){return this.b.$1(J.iJ(this.a))},
$asz:function(a,b){return[b]},
v:{
bC:function(a,b,c,d){if(!!J.o(a).$isX)return new H.bA(a,b,[c,d])
return new H.dJ(a,b,[c,d])}}},
bA:{"^":"dJ;a,b,$ti",$isX:1,
$asX:function(a,b){return[b]}},
mf:{"^":"cO;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascO:function(a,b){return[b]}},
ap:{"^":"aX;a,b,$ti",
gl:function(a){return J.aI(this.a)},
as:function(a,b){return this.b.$1(J.eI(this.a,b))},
$asaX:function(a,b){return[b]},
$asX:function(a,b){return[b]},
$asz:function(a,b){return[b]}},
J:{"^":"z;a,b,$ti",
gZ:function(a){return new H.bN(J.ah(this.a),this.b,this.$ti)},
aD:function(a,b){return new H.dJ(this,b,[H.m(this,0),null])}},
bN:{"^":"cO;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fR:{"^":"z;a,b,$ti",
gZ:function(a){return new H.o5(J.ah(this.a),this.b,this.$ti)},
v:{
o4:function(a,b,c){if(!!J.o(a).$isX)return new H.kQ(a,H.hF(b),[c])
return new H.fR(a,H.hF(b),[c])}}},
kQ:{"^":"fR;a,b,$ti",
gl:function(a){var z=J.aI(this.a)-this.b
if(z>=0)return z
return 0},
$isX:1},
o5:{"^":"cO;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gG:function(){return this.a.gG()}},
kR:{"^":"d;$ti",
t:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
co:function(a,b){var z=a.cQ(b)
if(!init.globalState.d.cy)init.globalState.f.bw()
return z},
ir:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isL)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qx(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$f6()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.q6(P.b6(null,H.cm),0)
x=P.t
y.z=new H.Q(0,null,null,null,null,null,0,[x,H.ee])
y.ch=new H.Q(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qw()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lD,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qy)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a1(null,null,null,x)
v=new H.cf(0,null,!1)
u=new H.ee(y,new H.Q(0,null,null,null,null,null,0,[x,H.cf]),w,init.createNewIsolate(),v,new H.be(H.df()),new H.be(H.df()),!1,!1,[],P.a1(null,null,null,null),null,null,!1,!0,P.a1(null,null,null,null))
w.q(0,0)
u.e_(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ax(a,{func:1,args:[,]}))u.cQ(new H.uW(z,a))
else if(H.ax(a,{func:1,args:[,,]}))u.cQ(new H.uX(z,a))
else u.cQ(a)
init.globalState.f.bw()},
lH:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lI()
return},
lI:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.R("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.R('Cannot extract URI from "'+z+'"'))},
lD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d3(!0,[]).bW(b.data)
y=J.I(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d3(!0,[]).bW(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d3(!0,[]).bW(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.a1(null,null,null,q)
o=new H.cf(0,null,!1)
n=new H.ee(y,new H.Q(0,null,null,null,null,null,0,[q,H.cf]),p,init.createNewIsolate(),o,new H.be(H.df()),new H.be(H.df()),!1,!1,[],P.a1(null,null,null,null),null,null,!1,!0,P.a1(null,null,null,null))
p.q(0,0)
n.e_(0,o)
init.globalState.f.a.az(new H.cm(n,new H.lE(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bw()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.bw()
break
case"close":init.globalState.ch.a1(0,$.$get$f7().j(0,a))
a.terminate()
init.globalState.f.bw()
break
case"log":H.lC(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ad(["command","print","msg",z])
q=new H.bp(!0,P.bQ(null,P.t)).bn(q)
y.toString
self.postMessage(q)}else P.ew(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lC:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ad(["command","log","msg",a])
x=new H.bp(!0,P.bQ(null,P.t)).bn(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.C(w)
y=P.cJ(z)
throw H.c(y)}},
lF:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fB=$.fB+("_"+y)
$.fC=$.fC+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.cn(y,x),w,z.r])
x=new H.lG(a,b,c,d,z)
if(e===!0){z.fO(w,w)
init.globalState.f.a.az(new H.cm(z,x,"start isolate"))}else x.$0()},
r1:function(a){return new H.d3(!0,[]).bW(new H.bp(!1,P.bQ(null,P.t)).bn(a))},
uW:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
uX:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qx:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
qy:function(a){var z=P.ad(["command","print","msg",a])
return new H.bp(!0,P.bQ(null,P.t)).bn(z)}}},
ee:{"^":"d;i:a<,b,c,ko:d<,jx:e<,f,r,x,cT:y<,z,Q,ch,cx,cy,db,dx",
fO:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cK()},
kJ:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a1(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fM(x)}this.y=!1}this.cK()},
jl:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kH:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.R("removeRange"))
P.ce(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hR:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jW:function(a,b,c){var z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.b6(null,null)
this.cx=z}z.az(new H.qn(a,c))},
jV:function(a,b){var z
if(!this.r.u(0,a))return
z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.eK()
return}z=this.cx
if(z==null){z=P.b6(null,null)
this.cx=z}z.az(this.gkp())},
jX:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ew(a)
if(b!=null)P.ew(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ab(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.F(y)},
cQ:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.B(u)
v=H.C(u)
this.jX(w,v)
if(this.db===!0){this.eK()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gko()
if(this.cx!=null)for(;t=this.cx,!t.gU(t);)this.cx.dG().$0()}return y},
cl:function(a){return this.b.j(0,a)},
e_:function(a,b){var z=this.b
if(z.a9(a))throw H.c(P.cJ("Registry: ports must be registered only once."))
z.n(0,a,b)},
cK:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eK()},
eK:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b7(0)
for(z=this.b,y=z.gct(),y=y.gZ(y);y.t();)y.gG().ir()
z.b7(0)
this.c.b7(0)
init.globalState.z.a1(0,this.a)
this.dx.b7(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkp",0,0,7]},
qn:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
q6:{"^":"d;a,b",
jC:function(){var z=this.a
if(z.b===z.c)return
return z.dG()},
hu:function(){var z,y,x
z=this.jC()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a9(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gU(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cJ("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gU(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ad(["command","close"])
x=new H.bp(!0,new P.hA(0,null,null,null,null,null,0,[null,P.t])).bn(x)
y.toString
self.postMessage(x)}return!1}z.kF()
return!0},
fF:function(){if(self.window!=null)new H.q7(this).$0()
else for(;this.hu(););},
bw:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fF()
else try{this.fF()}catch(x){z=H.B(x)
y=H.C(x)
w=init.globalState.Q
v=P.ad(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bp(!0,P.bQ(null,P.t)).bn(v)
w.toString
self.postMessage(v)}}},
q7:{"^":"a:7;a",
$0:function(){if(!this.a.hu())return
P.pb(C.x,this)}},
cm:{"^":"d;a,b,c",
kF:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cQ(this.b)}},
qw:{"^":"d;"},
lE:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.lF(this.a,this.b,this.c,this.d,this.e,this.f)}},
lG:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ax(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ax(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cK()}},
hu:{"^":"d;"},
cn:{"^":"hu;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfs())return
x=H.r1(a)
if(z.gjx()===y){y=J.I(x)
switch(y.j(x,0)){case"pause":z.fO(y.j(x,1),y.j(x,2))
break
case"resume":z.kJ(y.j(x,1))
break
case"add-ondone":z.jl(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kH(y.j(x,1))
break
case"set-errors-fatal":z.hR(y.j(x,1),y.j(x,2))
break
case"ping":z.jW(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.jV(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a1(0,y)
break}return}init.globalState.f.a.az(new H.cm(z,new H.qA(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.cn&&J.e(this.b,b.b)},
gA:function(a){return this.b.gec()}},
qA:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfs())z.ig(this.b)}},
eh:{"^":"hu;b,c,a",
F:function(a){var z,y,x
z=P.ad(["command","message","port",this,"msg",a])
y=new H.bp(!0,P.bQ(null,P.t)).bn(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.eh&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f1()
y=this.a
if(typeof y!=="number")return y.f1()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
cf:{"^":"d;ec:a<,b,fs:c<",
ir:function(){this.c=!0
this.b=null},
br:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a1(0,y)
z.c.a1(0,y)
z.cK()},
ig:function(a){if(this.c)return
this.b.$1(a)},
$isne:1},
nf:{"^":"ak;a,b",
aC:function(a,b,c,d){var z=this.b
z.toString
return new P.d2(z,[H.m(z,0)]).aC(a,b,c,d)},
eN:function(a,b,c){return this.aC(a,null,b,c)},
br:[function(){this.a.br()
this.b.br()},"$0","gjt",0,0,7],
i6:function(a){var z=new P.qP(null,0,null,null,null,null,this.gjt(),[null])
this.b=z
this.a.b=z.gjc(z)},
$asak:I.bb},
p7:{"^":"d;a,b,c",
gcg:function(){return this.c!=null},
i9:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.az(new H.cm(y,new H.p9(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.db(new H.pa(this,b),0),a)}else throw H.c(new P.R("Timer greater than 0."))},
v:{
p8:function(a,b){var z=new H.p7(!0,!1,null)
z.i9(a,b)
return z}}},
p9:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pa:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
be:{"^":"d;ec:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.l8()
z=C.j.dq(z,0)^C.j.bK(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.be){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bp:{"^":"d;a,b",
bn:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscP)return this.hN(a)
if(!!z.$islA){x=this.ghK()
z=a.gcj()
z=H.bC(z,x,H.y(z,"z",0),null)
z=P.O(z,!0,H.y(z,"z",0))
w=a.gct()
w=H.bC(w,x,H.y(w,"z",0),null)
return["map",z,P.O(w,!0,H.y(w,"z",0))]}if(!!z.$isfd)return this.hO(a)
if(!!z.$isaV)this.hy(a)
if(!!z.$isne)this.d1(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscn)return this.hP(a)
if(!!z.$iseh)return this.hQ(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d1(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbe)return["capability",a.a]
if(!(a instanceof P.d))this.hy(a)
return["dart",init.classIdExtractor(a),this.hM(init.classFieldsExtractor(a))]},"$1","ghK",2,0,0],
d1:function(a,b){throw H.c(new P.R((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hy:function(a){return this.d1(a,null)},
hN:function(a){var z=this.hL(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d1(a,"Can't serialize indexable: ")},
hL:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bn(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hM:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bn(a[z]))
return a},
hO:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d1(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bn(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hQ:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hP:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gec()]
return["raw sendport",a]}},
d3:{"^":"d;a,b",
bW:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.b(a)))
switch(C.a.geD(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.p(this.cP(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cP(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cP(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cP(x),[null])
y.fixed$length=Array
return y
case"map":return this.jF(a)
case"sendport":return this.jG(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jE(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.be(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cP(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjD",2,0,0],
cP:function(a){var z,y,x
z=J.I(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.n(a,y,this.bW(z.j(a,y)));++y}return a},
jF:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aL()
this.b.push(w)
y=J.eK(y,this.gjD()).cs(0)
for(z=J.I(y),v=J.I(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.bW(v.j(x,u)))}return w},
jG:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.e(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.cl(w)
if(u==null)return
t=new H.cn(u,x)}else t=new H.eh(y,w,x)
this.b.push(t)
return t},
jE:function(a){var z,y,x,w,v,u,t
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
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.j(y,u)]=this.bW(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
jW:function(){throw H.c(new P.R("Cannot modify unmodifiable Map"))},
tY:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.S(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bF:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.L||!!J.o(a).$isbn){v=C.O(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cz(w,0)===36)w=C.b.bI(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.de(H.cs(a),0,null),init.mangledGlobalNames)},
cT:function(a){return"Instance of '"+H.bF(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dq(z,10))>>>0,56320|z&1023)}throw H.c(P.a2(a,0,1114111,null,null))},
bi:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
n6:function(a){var z=H.bi(a).getFullYear()+0
return z},
n4:function(a){var z=H.bi(a).getMonth()+1
return z},
n0:function(a){var z=H.bi(a).getDate()+0
return z},
n1:function(a){var z=H.bi(a).getHours()+0
return z},
n3:function(a){var z=H.bi(a).getMinutes()+0
return z},
n5:function(a){var z=H.bi(a).getSeconds()+0
return z},
n2:function(a){var z=H.bi(a).getMilliseconds()+0
return z},
dV:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
return a[b]},
fD:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
a[b]=c},
w:function(a){throw H.c(H.S(a))},
f:function(a,b){if(a==null)J.aI(a)
throw H.c(H.aF(a,b))},
aF:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b2(!0,b,"index",null)
z=J.aI(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.cM(b,a,"index",null,z)
return P.cd(b,"index",null)},
S:function(a){return new P.b2(!0,a,null,null)},
d9:function(a){if(typeof a!=="number")throw H.c(H.S(a))
return a},
rm:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.S(a))
return a},
bt:function(a){if(typeof a!=="string")throw H.c(H.S(a))
return a},
c:function(a){var z
if(a==null)a=new P.cR()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iA})
z.name=""}else z.toString=H.iA
return z},
iA:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.D(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.vG(a)
if(a==null)return
if(a instanceof H.ds)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dq(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dA(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fs(v,null))}}if(a instanceof TypeError){u=$.$get$hc()
t=$.$get$hd()
s=$.$get$he()
r=$.$get$hf()
q=$.$get$hj()
p=$.$get$hk()
o=$.$get$hh()
$.$get$hg()
n=$.$get$hm()
m=$.$get$hl()
l=u.bu(y)
if(l!=null)return z.$1(H.dA(y,l))
else{l=t.bu(y)
if(l!=null){l.method="call"
return z.$1(H.dA(y,l))}else{l=s.bu(y)
if(l==null){l=r.bu(y)
if(l==null){l=q.bu(y)
if(l==null){l=p.bu(y)
if(l==null){l=o.bu(y)
if(l==null){l=r.bu(y)
if(l==null){l=n.bu(y)
if(l==null){l=m.bu(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fs(y,l==null?null:l.method))}}return z.$1(new H.pf(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fY()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b2(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fY()
return a},
C:function(a){var z
if(a instanceof H.ds)return a.b
if(a==null)return new H.hC(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hC(a,null)},
uf:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aA(a)},
tH:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
u4:function(a,b,c,d,e,f,g){switch(c){case 0:return H.co(b,new H.u5(a))
case 1:return H.co(b,new H.u6(a,d))
case 2:return H.co(b,new H.u7(a,d,e))
case 3:return H.co(b,new H.u8(a,d,e,f))
case 4:return H.co(b,new H.u9(a,d,e,f,g))}throw H.c(P.cJ("Unsupported number of arguments for wrapped closure"))},
db:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.u4)
a.$identity=z
return z},
jS:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isL){z.$reflectionInfo=c
x=H.nh(z).r}else x=c
w=d?Object.create(new H.om().constructor.prototype):Object.create(new H.dk(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aJ
$.aJ=J.an(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eW(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.tY,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eR:H.dl
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eW(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jP:function(a,b,c,d){var z=H.dl
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eW:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jR(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jP(y,!w,z,b)
if(y===0){w=$.aJ
$.aJ=J.an(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bz
if(v==null){v=H.cB("self")
$.bz=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aJ
$.aJ=J.an(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bz
if(v==null){v=H.cB("self")
$.bz=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jQ:function(a,b,c,d){var z,y
z=H.dl
y=H.eR
switch(b?-1:a){case 0:throw H.c(new H.ns("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jR:function(a,b){var z,y,x,w,v,u,t,s
z=H.jG()
y=$.eQ
if(y==null){y=H.cB("receiver")
$.eQ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jQ(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aJ
$.aJ=J.an(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aJ
$.aJ=J.an(u,1)
return new Function(y+H.b(u)+"}")()},
eo:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jS(a,b,z,!!d,e,f)},
uo:function(a,b){var z=J.I(b)
throw H.c(H.cD(H.bF(a),z.aG(b,3,z.gl(b))))},
M:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.uo(a,b)},
eq:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ax:function(a,b){var z
if(a==null)return!1
z=H.eq(a)
return z==null?!1:H.et(z,b)},
i5:function(a,b){var z,y
if(a==null)return a
if(H.ax(a,b))return a
z=H.W(b,null)
y=H.eq(a)
throw H.c(H.cD(y!=null?H.W(y,null):H.bF(a),z))},
vD:function(a){throw H.c(new P.k8(a))},
df:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
ba:function(a){return new H.au(a,null)},
p:function(a,b){a.$ti=b
return a},
cs:function(a){if(a==null)return
return a.$ti},
ia:function(a,b){return H.eF(a["$as"+H.b(b)],H.cs(a))},
y:function(a,b,c){var z=H.ia(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cs(a)
return z==null?null:z[b]},
W:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.de(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.W(z,b)
return H.r6(a,b)}return"unknown-reified-type"},
r6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.W(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.W(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.W(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tG(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.W(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
de:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bM("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.B=v+", "
u=a[y]
if(u!=null)w=!1
v=z.B+=H.W(u,c)}return w?"":"<"+z.k(0)+">"},
ib:function(a){var z,y
if(a instanceof H.a){z=H.eq(a)
if(z!=null)return H.W(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.de(a.$ti,0,null)},
eF:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cs(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hU(H.eF(y[d],z),c)},
aH:function(a,b,c,d){if(a==null)return a
if(H.aR(a,b,c,d))return a
throw H.c(H.cD(H.bF(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.de(c,0,null),init.mangledGlobalNames)))},
hU:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.am(a[y],b[y]))return!1
return!0},
b9:function(a,b,c){return a.apply(b,H.ia(b,c))},
da:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="as"
if(b==null)return!0
z=H.cs(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.et(x.apply(a,null),b)}return H.am(y,b)},
iv:function(a,b){if(a!=null&&!H.da(a,b))throw H.c(H.cD(H.bF(a),H.W(b,null)))
return a},
am:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="as")return!0
if('func' in b)return H.et(a,b)
if('func' in a)return b.builtin$cls==="bB"||b.builtin$cls==="d"
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
return H.hU(H.eF(u,z),x)},
hT:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.am(z,v)||H.am(v,z)))return!1}return!0},
rg:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.am(v,u)||H.am(u,v)))return!1}return!0},
et:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.am(z,y)||H.am(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hT(x,w,!1))return!1
if(!H.hT(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}}return H.rg(a.named,b.named)},
vx:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdy){z=C.b.bI(a,c)
return b.b.test(z)}else{z=z.ew(b,C.b.bI(a,c))
return!z.gU(z)}}},
vz:function(a,b,c,d){var z,y,x
z=b.fk(a,d)
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
wn:[function(a){return a},"$1","hG",2,0,24],
vy:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdS)throw H.c(P.cy(b,"pattern","is not a Pattern"))
for(z=z.ew(b,a),z=new H.hs(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hG().$1(C.b.aG(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hG().$1(C.b.bI(a,y)))
return z.charCodeAt(0)==0?z:z},
iu:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eE(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdy)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.vz(a,b,c,d)
if(b==null)H.i(H.S(b))
y=y.dr(b,a,d)
x=y.gZ(y)
if(!x.t())return a
w=x.gG()
y=w.gf5()
v=w.gfY()
H.bt(c)
u=P.ce(y,v,a.length,null,null,null)
H.rm(u)
return H.eE(a,y,u,c)},
eE:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jV:{"^":"d;$ti",
gU:function(a){return this.gl(this)===0},
gap:function(a){return this.gl(this)!==0},
k:function(a){return P.dK(this)},
n:function(a,b,c){return H.jW()},
$isG:1},
jX:{"^":"jV;a,b,c,$ti",
gl:function(a){return this.a},
a9:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.a9(b))return
return this.fl(b)},
fl:function(a){return this.b[a]},
V:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fl(w))}}},
ng:{"^":"d;a,b,c,d,e,f,r,x",v:{
nh:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ng(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pc:{"^":"d;a,b,c,d,e,f",
bu:function(a){var z,y,x
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
return new H.pc(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d1:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hi:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fs:{"^":"a0;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lN:{"^":"a0;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
dA:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lN(a,y,z?null:b.receiver)}}},
pf:{"^":"a0;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
ds:{"^":"d;a,bo:b<"},
vG:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa0)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hC:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
u5:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
u6:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
u7:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
u8:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
u9:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bF(this).trim()+"'"},
ghG:function(){return this},
$isbB:1,
ghG:function(){return this}},
hb:{"^":"a;"},
om:{"^":"hb;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dk:{"^":"hb;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dk))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.j(z):H.aA(z)
z=H.aA(this.b)
if(typeof y!=="number")return y.l9()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cT(z)},
v:{
dl:function(a){return a.a},
eR:function(a){return a.c},
jG:function(){var z=$.bz
if(z==null){z=H.cB("self")
$.bz=z}return z},
cB:function(a){var z,y,x,w,v
z=new H.dk("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jL:{"^":"a0;a",
k:function(a){return this.a},
v:{
cD:function(a,b){return new H.jL("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ns:{"^":"a0;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
au:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gA:function(a){return J.j(this.a)},
u:function(a,b){if(b==null)return!1
return b instanceof H.au&&J.e(this.a,b.a)}},
Q:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gU:function(a){return this.a===0},
gap:function(a){return!this.gU(this)},
gcj:function(){return new H.m3(this,[H.m(this,0)])},
gct:function(){return H.bC(this.gcj(),new H.lM(this),H.m(this,0),H.m(this,1))},
a9:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fg(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fg(y,a)}else return this.kd(a)},
kd:function(a){var z=this.d
if(z==null)return!1
return this.cS(this.dk(z,this.cR(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cC(z,b)
return y==null?null:y.gbY()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cC(x,b)
return y==null?null:y.gbY()}else return this.ke(b)},
ke:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dk(z,this.cR(a))
x=this.cS(y,a)
if(x<0)return
return y[x].gbY()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ee()
this.b=z}this.fa(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ee()
this.c=y}this.fa(y,b,c)}else this.kg(b,c)},
kg:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ee()
this.d=z}y=this.cR(a)
x=this.dk(z,y)
if(x==null)this.eq(z,y,[this.ef(a,b)])
else{w=this.cS(x,a)
if(w>=0)x[w].sbY(b)
else x.push(this.ef(a,b))}},
kG:function(a,b){var z
if(this.a9(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a1:function(a,b){if(typeof b==="string")return this.fE(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fE(this.c,b)
else return this.kf(b)},
kf:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dk(z,this.cR(a))
x=this.cS(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fG(w)
return w.gbY()},
b7:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.c(new P.D(this))
z=z.c}},
fa:function(a,b,c){var z=this.cC(a,b)
if(z==null)this.eq(a,b,this.ef(b,c))
else z.sbY(c)},
fE:function(a,b){var z
if(a==null)return
z=this.cC(a,b)
if(z==null)return
this.fG(z)
this.fh(a,b)
return z.gbY()},
ef:function(a,b){var z,y
z=new H.m2(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fG:function(a){var z,y
z=a.giT()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cR:function(a){return J.j(a)&0x3ffffff},
cS:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gh4(),b))return y
return-1},
k:function(a){return P.dK(this)},
cC:function(a,b){return a[b]},
dk:function(a,b){return a[b]},
eq:function(a,b,c){a[b]=c},
fh:function(a,b){delete a[b]},
fg:function(a,b){return this.cC(a,b)!=null},
ee:function(){var z=Object.create(null)
this.eq(z,"<non-identifier-key>",z)
this.fh(z,"<non-identifier-key>")
return z},
$islA:1,
$isG:1,
v:{
fg:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])}}},
lM:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
m2:{"^":"d;h4:a<,bY:b@,c,iT:d<,$ti"},
m3:{"^":"X;a,$ti",
gl:function(a){return this.a.a},
gU:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.m4(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a3:function(a,b){return this.a.a9(b)},
V:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.D(z))
y=y.c}}},
m4:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dy:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giP:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dz(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giO:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dz(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dr:function(a,b,c){if(c>b.length)throw H.c(P.a2(c,0,b.length,null,null))
return new H.pN(this,b,c)},
ew:function(a,b){return this.dr(a,b,0)},
fk:function(a,b){var z,y
z=this.giP()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hB(this,y)},
iz:function(a,b){var z,y
z=this.giO()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hB(this,y)},
h9:function(a,b,c){if(c>b.length)throw H.c(P.a2(c,0,b.length,null,null))
return this.iz(b,c)},
$isdS:1,
v:{
dz:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f3("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hB:{"^":"d;a,b",
gf5:function(){return this.b.index},
gfY:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbh:1},
pN:{"^":"c6;a,b,c",
gZ:function(a){return new H.hs(this.a,this.b,this.c,null)},
$asc6:function(){return[P.bh]},
$asz:function(){return[P.bh]}},
hs:{"^":"d;a,b,c,d",
gG:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fk(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
h3:{"^":"d;f5:a<,b,c",
gfY:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cd(b,null,null))
return this.c},
$isbh:1},
qL:{"^":"z;a,b,c",
gZ:function(a){return new H.qM(this.a,this.b,this.c,null)},
$asz:function(){return[P.bh]}},
qM:{"^":"d;a,b,c,d",
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
this.d=new H.h3(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
tG:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
un:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pO:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rh()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.db(new P.pQ(z),1)).observe(y,{childList:true})
return new P.pP(z,y,x)}else if(self.setImmediate!=null)return P.ri()
return P.rj()},
wh:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.db(new P.pR(a),0))},"$1","rh",2,0,13],
wi:[function(a){++init.globalState.f.b
self.setImmediate(H.db(new P.pS(a),0))},"$1","ri",2,0,13],
wj:[function(a){P.e4(C.x,a)},"$1","rj",2,0,13],
aE:function(a,b){P.ei(null,a)
return b.gh1()},
av:function(a,b){P.ei(a,b)},
aD:function(a,b){b.bV(a)},
aC:function(a,b){b.eA(H.B(a),H.C(a))},
ei:function(a,b){var z,y,x,w
z=new P.qW(b)
y=new P.qX(b)
x=J.o(a)
if(!!x.$isF)a.er(z,y)
else if(!!x.$isP)a.eU(z,y)
else{w=new P.F(0,$.q,null,[null])
w.a=4
w.c=a
w.er(z,null)}},
aw:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.rf(z)},
d6:function(a,b,c){var z,y,x
if(b===0){if(c.geG())c.c.ez()
else c.a.br()
return}else if(b===1){if(c.geG())c.c.eA(H.B(a),H.C(a))
else{z=H.B(a)
y=H.C(a)
c.a.ev(z,y)
c.a.br()}return}if(a instanceof P.bO){if(c.geG()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.di(c.a,z)
P.ct(new P.qU(b,c))
return}else if(z===1){x=a.a
c.a.jp(x,!1).c1(new P.qV(b,c))
return}}P.ei(a,b)},
re:function(a){return a.gdY()},
el:function(a,b){if(H.ax(a,{func:1,args:[P.as,P.as]})){b.toString
return a}else{b.toString
return a}},
az:function(a){return new P.qN(new P.F(0,$.q,null,[a]),[a])},
r4:function(a,b,c){$.q.toString
a.bg(b,c)},
r8:function(){var z,y
for(;z=$.bq,z!=null;){$.bS=null
y=z.gcm()
$.bq=y
if(y==null)$.bR=null
z.gjr().$0()}},
wm:[function(){$.ej=!0
try{P.r8()}finally{$.bS=null
$.ej=!1
if($.bq!=null)$.$get$e8().$1(P.hV())}},"$0","hV",0,0,7],
hP:function(a){var z=new P.ht(a,null)
if($.bq==null){$.bR=z
$.bq=z
if(!$.ej)$.$get$e8().$1(P.hV())}else{$.bR.b=z
$.bR=z}},
rd:function(a){var z,y,x
z=$.bq
if(z==null){P.hP(a)
$.bS=$.bR
return}y=new P.ht(a,null)
x=$.bS
if(x==null){y.b=z
$.bS=y
$.bq=y}else{y.b=x.b
x.b=y
$.bS=y
if(y.b==null)$.bR=y}},
ct:function(a){var z=$.q
if(C.h===z){P.bs(null,null,C.h,a)
return}z.toString
P.bs(null,null,z,z.ex(a,!0))},
wc:function(a,b){return new P.qK(null,a,!1,[b])},
em:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.B(x)
y=H.C(x)
w=$.q
w.toString
P.br(null,null,w,z,y)}},
r9:[function(a,b){var z=$.q
z.toString
P.br(null,null,z,a,b)},function(a){return P.r9(a,null)},"$2","$1","rl",2,2,16,0],
wl:[function(){},"$0","rk",0,0,7],
hO:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.B(u)
y=H.C(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbs()
w=t
v=x.gbo()
c.$2(w,v)}}},
qY:function(a,b,c,d){var z=a.cf()
if(!!J.o(z).$isP&&z!==$.$get$bf())z.c3(new P.r_(b,c,d))
else b.bg(c,d)},
hD:function(a,b){return new P.qZ(a,b)},
hE:function(a,b,c){var z=a.cf()
if(!!J.o(z).$isP&&z!==$.$get$bf())z.c3(new P.r0(b,c))
else b.bf(c)},
qT:function(a,b,c){$.q.toString
a.ca(b,c)},
pb:function(a,b){var z=$.q
if(z===C.h){z.toString
return P.e4(a,b)}return P.e4(a,z.ex(b,!0))},
e4:function(a,b){var z=C.e.bK(a.a,1000)
return H.p8(z<0?0:z,b)},
pq:function(){return $.q},
br:function(a,b,c,d,e){var z={}
z.a=d
P.rd(new P.rb(z,e))},
hL:function(a,b,c,d){var z,y
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
hN:function(a,b,c,d,e){var z,y
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
hM:function(a,b,c,d,e,f){var z,y
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
bs:function(a,b,c,d){var z=C.h!==c
if(z)d=c.ex(d,!(!z||!1))
P.hP(d)},
pQ:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pP:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pR:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pS:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qW:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qX:{"^":"a:21;a",
$2:function(a,b){this.a.$2(1,new H.ds(a,b))}},
rf:{"^":"a:50;a",
$2:function(a,b){this.a(a,b)}},
qU:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcT()){z.b=!0
return}this.a.$2(null,0)}},
qV:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pT:{"^":"d;a,b,c",
gdY:function(){return this.a.gdY()},
gcT:function(){return this.a.gcT()},
geG:function(){return this.c!=null},
q:function(a,b){return J.di(this.a,b)},
ev:function(a,b){return this.a.ev(a,b)},
br:function(){return this.a.br()},
ib:function(a){var z=new P.pW(a)
this.a=new P.q0(null,0,null,new P.pY(z),null,new P.pZ(this,z),new P.q_(this,a),[null])},
v:{
pU:function(a){var z=new P.pT(null,!1,null)
z.ib(a)
return z}}},
pW:{"^":"a:1;a",
$0:function(){P.ct(new P.pX(this.a))}},
pX:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pY:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pZ:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
q_:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gkl()){z.c=new P.ck(new P.F(0,$.q,null,[null]),[null])
if(z.b===!0){z.b=!1
P.ct(new P.pV(this.b))}return z.c.gh1()}}},
pV:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bO:{"^":"d;ab:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bP:function(a){return new P.bO(a,1)},
aO:function(){return C.ag},
hy:function(a){return new P.bO(a,0)},
aP:function(a){return new P.bO(a,3)}}},
b8:{"^":"d;a,b,c,d",
gG:function(){var z=this.c
return z==null?this.b:z.gG()},
t:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.t())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bO){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ah(z)
if(!!w.$isb8){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qO:{"^":"c6;a",
gZ:function(a){return new P.b8(this.a(),null,null,null)},
$asc6:I.bb,
$asz:I.bb,
v:{
aQ:function(a){return new P.qO(a)}}},
P:{"^":"d;$ti"},
hv:{"^":"d;h1:a<,$ti",
eA:function(a,b){if(a==null)a=new P.cR()
if(this.a.a!==0)throw H.c(new P.x("Future already completed"))
$.q.toString
this.bg(a,b)},
du:function(a){return this.eA(a,null)}},
ck:{"^":"hv;a,$ti",
bV:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.x("Future already completed"))
z.bA(a)},
ez:function(){return this.bV(null)},
bg:function(a,b){this.a.fc(a,b)}},
qN:{"^":"hv;a,$ti",
bV:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.x("Future already completed"))
z.bf(a)},
ez:function(){return this.bV(null)},
bg:function(a,b){this.a.bg(a,b)}},
ed:{"^":"d;eh:a<,b,c,d,e,$ti",
gj9:function(){return this.b.b},
gh3:function(){return(this.c&1)!==0},
gk_:function(){return(this.c&2)!==0},
gh2:function(){return this.c===8},
jY:function(a){return this.b.b.eT(this.d,a)},
kv:function(a){if(this.c!==6)return!0
return this.b.b.eT(this.d,a.gbs())},
jU:function(a){var z,y
z=this.e
y=this.b.b
if(H.ax(z,{func:1,args:[,,]}))return y.kS(z,a.gbs(),a.gbo())
else return y.eT(z,a.gbs())},
jZ:function(){return this.b.b.hs(this.d)}},
F:{"^":"d;cI:a<,b,iY:c<,$ti",
giJ:function(){return this.a===2},
ged:function(){return this.a>=4},
eU:function(a,b){var z=$.q
if(z!==C.h){z.toString
if(b!=null)b=P.el(b,z)}return this.er(a,b)},
c1:function(a){return this.eU(a,null)},
er:function(a,b){var z,y
z=new P.F(0,$.q,null,[null])
y=b==null?1:3
this.df(new P.ed(null,z,y,a,b,[H.m(this,0),null]))
return z},
c3:function(a){var z,y
z=$.q
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.df(new P.ed(null,y,8,a,null,[z,z]))
return y},
df:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ged()){y.df(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bs(null,null,z,new P.qa(this,a))}},
fA:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.geh()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ged()){v.fA(a)
return}this.a=v.a
this.c=v.c}z.a=this.dm(a)
y=this.b
y.toString
P.bs(null,null,y,new P.qh(z,this))}},
dl:function(){var z=this.c
this.c=null
return this.dm(z)},
dm:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.geh()
z.a=y}return y},
bf:function(a){var z,y
z=this.$ti
if(H.aR(a,"$isP",z,"$asP"))if(H.aR(a,"$isF",z,null))P.d4(a,this)
else P.hx(a,this)
else{y=this.dl()
this.a=4
this.c=a
P.bo(this,y)}},
bg:[function(a,b){var z=this.dl()
this.a=8
this.c=new P.cz(a,b)
P.bo(this,z)},function(a){return this.bg(a,null)},"la","$2","$1","gbR",2,2,16,0],
bA:function(a){var z
if(H.aR(a,"$isP",this.$ti,"$asP")){this.io(a)
return}this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qc(this,a))},
io:function(a){var z
if(H.aR(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qg(this,a))}else P.d4(a,this)
return}P.hx(a,this)},
fc:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qb(this,a,b))},
ie:function(a,b){this.a=4
this.c=a},
$isP:1,
v:{
hx:function(a,b){var z,y,x
b.a=1
try{a.eU(new P.qd(b),new P.qe(b))}catch(x){z=H.B(x)
y=H.C(x)
P.ct(new P.qf(b,z,y))}},
d4:function(a,b){var z,y,x
for(;a.giJ();)a=a.c
z=a.ged()
y=b.c
if(z){b.c=null
x=b.dm(y)
b.a=a.a
b.c=a.c
P.bo(b,x)}else{b.a=2
b.c=a
a.fA(y)}},
bo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbs()
t=v.gbo()
y.toString
P.br(null,null,y,u,t)}return}for(;b.geh()!=null;b=s){s=b.a
b.a=null
P.bo(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gh3()||b.gh2()){q=b.gj9()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbs()
t=v.gbo()
y.toString
P.br(null,null,y,u,t)
return}p=$.q
if(p==null?q!=null:p!==q)$.q=q
else p=null
if(b.gh2())new P.qk(z,x,w,b).$0()
else if(y){if(b.gh3())new P.qj(x,b,r).$0()}else if(b.gk_())new P.qi(z,x,b).$0()
if(p!=null)$.q=p
y=x.b
if(!!J.o(y).$isP){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dm(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d4(y,o)
return}}o=b.b
b=o.dl()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qa:{"^":"a:1;a,b",
$0:function(){P.bo(this.a,this.b)}},
qh:{"^":"a:1;a,b",
$0:function(){P.bo(this.b,this.a.a)}},
qd:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bf(a)}},
qe:{"^":"a:49;a",
$2:function(a,b){this.a.bg(a,b)},
$1:function(a){return this.$2(a,null)}},
qf:{"^":"a:1;a,b,c",
$0:function(){this.a.bg(this.b,this.c)}},
qc:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.dl()
z.a=4
z.c=this.b
P.bo(z,y)}},
qg:{"^":"a:1;a,b",
$0:function(){P.d4(this.b,this.a)}},
qb:{"^":"a:1;a,b,c",
$0:function(){this.a.bg(this.b,this.c)}},
qk:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jZ()}catch(w){y=H.B(w)
x=H.C(w)
if(this.c){v=this.a.a.c.gbs()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cz(y,x)
u.a=!0
return}if(!!J.o(z).$isP){if(z instanceof P.F&&z.gcI()>=4){if(z.gcI()===8){v=this.b
v.b=z.giY()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c1(new P.ql(t))
v.a=!1}}},
ql:{"^":"a:0;a",
$1:function(a){return this.a}},
qj:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jY(this.c)}catch(x){z=H.B(x)
y=H.C(x)
w=this.a
w.b=new P.cz(z,y)
w.a=!0}}},
qi:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kv(z)===!0&&w.e!=null){v=this.b
v.b=w.jU(z)
v.a=!1}}catch(u){y=H.B(u)
x=H.C(u)
w=this.a
v=w.a.c.gbs()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cz(y,x)
s.a=!0}}},
ht:{"^":"d;jr:a<,cm:b@"},
ak:{"^":"d;$ti",
aD:function(a,b){return new P.qz(b,this,[H.y(this,"ak",0),null])},
a3:function(a,b){var z,y
z={}
y=new P.F(0,$.q,null,[P.a_])
z.a=null
z.a=this.aC(new P.ox(z,this,b,y),!0,new P.oy(y),y.gbR())
return y},
V:function(a,b){var z,y
z={}
y=new P.F(0,$.q,null,[null])
z.a=null
z.a=this.aC(new P.oB(z,this,b,y),!0,new P.oC(y),y.gbR())
return y},
gl:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[P.t])
z.a=0
this.aC(new P.oH(z),!0,new P.oI(z,y),y.gbR())
return y},
gU:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[P.a_])
z.a=null
z.a=this.aC(new P.oD(z,y),!0,new P.oE(y),y.gbR())
return y},
cs:function(a){var z,y,x
z=H.y(this,"ak",0)
y=H.p([],[z])
x=new P.F(0,$.q,null,[[P.L,z]])
this.aC(new P.oJ(this,y),!0,new P.oK(y,x),x.gbR())
return x},
bF:function(a){var z,y,x
z=H.y(this,"ak",0)
y=P.a1(null,null,null,z)
x=new P.F(0,$.q,null,[[P.bI,z]])
this.aC(new P.oL(this,y),!0,new P.oM(y,x),x.gbR())
return x},
gw:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[H.y(this,"ak",0)])
z.a=null
z.b=!1
this.aC(new P.oF(z,this),!0,new P.oG(z,y),y.gbR())
return y}},
ox:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hO(new P.ov(this.c,a),new P.ow(z,y),P.hD(z.a,y))},
$S:function(){return H.b9(function(a){return{func:1,args:[a]}},this.b,"ak")}},
ov:{"^":"a:1;a,b",
$0:function(){return J.e(this.b,this.a)}},
ow:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hE(this.a.a,this.b,!0)}},
oy:{"^":"a:1;a",
$0:function(){this.a.bf(!1)}},
oB:{"^":"a;a,b,c,d",
$1:function(a){P.hO(new P.oz(this.c,a),new P.oA(),P.hD(this.a.a,this.d))},
$S:function(){return H.b9(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oz:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
oA:{"^":"a:0;",
$1:function(a){}},
oC:{"^":"a:1;a",
$0:function(){this.a.bf(null)}},
oH:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oI:{"^":"a:1;a,b",
$0:function(){this.b.bf(this.a.a)}},
oD:{"^":"a:0;a,b",
$1:function(a){P.hE(this.a.a,this.b,!1)}},
oE:{"^":"a:1;a",
$0:function(){this.a.bf(!0)}},
oJ:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b9(function(a){return{func:1,args:[a]}},this.a,"ak")}},
oK:{"^":"a:1;a,b",
$0:function(){this.b.bf(this.a)}},
oL:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b9(function(a){return{func:1,args:[a]}},this.a,"ak")}},
oM:{"^":"a:1;a,b",
$0:function(){this.b.bf(this.a)}},
oF:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b9(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oG:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bf(x.a)
return}try{x=H.ai()
throw H.c(x)}catch(w){z=H.B(w)
y=H.C(w)
P.r4(this.b,z,y)}}},
d5:{"^":"d;cI:b<,$ti",
gdY:function(){return new P.d2(this,this.$ti)},
gkl:function(){return(this.b&4)!==0},
gcT:function(){var z=this.b
return(z&1)!==0?this.gbJ().gft():(z&2)===0},
giR:function(){if((this.b&8)===0)return this.a
return this.a.gd3()},
e6:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eg(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd3()==null)y.c=new P.eg(null,null,0,this.$ti)
return y.c},
gbJ:function(){if((this.b&8)!==0)return this.a.gd3()
return this.a},
cw:function(){if((this.b&4)!==0)return new P.x("Cannot add event after closing")
return new P.x("Cannot add event while adding a stream")},
jp:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cw())
if((z&2)!==0){z=new P.F(0,$.q,null,[null])
z.bA(null)
return z}z=this.a
y=new P.F(0,$.q,null,[null])
x=a.aC(this.gil(),!1,this.gim(),this.gii())
w=this.b
if((w&1)!==0?this.gbJ().gft():(w&2)===0)x.cW()
this.a=new P.qG(z,y,x,this.$ti)
this.b|=8
return y},
fj:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bf():new P.F(0,$.q,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cw())
this.bQ(b)},"$1","gjc",2,0,function(){return H.b9(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d5")}],
ev:function(a,b){if(this.b>=4)throw H.c(this.cw())
if(a==null)a=new P.cR()
$.q.toString
this.ca(a,b)},
br:function(){var z=this.b
if((z&4)!==0)return this.fj()
if(z>=4)throw H.c(this.cw())
z|=4
this.b=z
if((z&1)!==0)this.cG()
else if((z&3)===0)this.e6().q(0,C.v)
return this.fj()},
bQ:[function(a){var z=this.b
if((z&1)!==0)this.cF(a)
else if((z&3)===0)this.e6().q(0,new P.e9(a,null,this.$ti))},"$1","gil",2,0,function(){return H.b9(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d5")}],
ca:[function(a,b){var z=this.b
if((z&1)!==0)this.cH(a,b)
else if((z&3)===0)this.e6().q(0,new P.ea(a,b,null))},"$2","gii",4,0,47],
e0:[function(){var z=this.a
this.a=z.gd3()
this.b&=4294967287
z.a.bA(null)},"$0","gim",0,0,7],
j4:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.x("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.q4(this,null,null,null,z,y,null,null,this.$ti)
x.f9(a,b,c,d,H.m(this,0))
w=this.giR()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd3(x)
v.b.d_()}else this.a=x
x.j2(w)
x.eb(new P.qI(this))
return x},
iV:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.cf()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.B(v)
x=H.C(v)
u=new P.F(0,$.q,null,[null])
u.fc(y,x)
z=u}else z=z.c3(w)
w=new P.qH(this)
if(z!=null)z=z.c3(w)
else w.$0()
return z}},
qI:{"^":"a:1;a",
$0:function(){P.em(this.a.d)}},
qH:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bA(null)}},
qQ:{"^":"d;$ti",
cF:function(a){this.gbJ().bQ(a)},
cH:function(a,b){this.gbJ().ca(a,b)},
cG:function(){this.gbJ().e0()}},
q1:{"^":"d;$ti",
cF:function(a){this.gbJ().cb(new P.e9(a,null,[H.m(this,0)]))},
cH:function(a,b){this.gbJ().cb(new P.ea(a,b,null))},
cG:function(){this.gbJ().cb(C.v)}},
q0:{"^":"d5+q1;a,b,c,d,e,f,r,$ti"},
qP:{"^":"d5+qQ;a,b,c,d,e,f,r,$ti"},
d2:{"^":"qJ;a,$ti",
gA:function(a){return(H.aA(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d2))return!1
return b.a===this.a}},
q4:{"^":"cl;x,a,b,c,d,e,f,r,$ti",
ei:function(){return this.x.iV(this)},
ek:[function(){var z=this.x
if((z.b&8)!==0)z.a.cW()
P.em(z.e)},"$0","gej",0,0,7],
em:[function(){var z=this.x
if((z.b&8)!==0)z.a.d_()
P.em(z.f)},"$0","gel",0,0,7]},
pL:{"^":"d;$ti",
cW:function(){this.b.cW()},
d_:function(){this.b.d_()},
cf:function(){var z=this.b.cf()
if(z==null){this.a.bA(null)
return}return z.c3(new P.pM(this))},
ez:function(){this.a.bA(null)}},
pM:{"^":"a:1;a",
$0:function(){this.a.a.bA(null)}},
qG:{"^":"pL;d3:c@,a,b,$ti"},
cl:{"^":"d;cI:e<,$ti",
j2:function(a){if(a==null)return
this.r=a
if(!a.gU(a)){this.e=(this.e|64)>>>0
this.r.d7(this)}},
kB:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fQ()
if((z&4)===0&&(this.e&32)===0)this.eb(this.gej())},
cW:function(){return this.kB(null)},
d_:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gU(z)}else z=!1
if(z)this.r.d7(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eb(this.gel())}}}},
cf:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e1()
z=this.f
return z==null?$.$get$bf():z},
gft:function(){return(this.e&4)!==0},
gcT:function(){return this.e>=128},
e1:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fQ()
if((this.e&32)===0)this.r=null
this.f=this.ei()},
bQ:["i_",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cF(a)
else this.cb(new P.e9(a,null,[H.y(this,"cl",0)]))}],
ca:["i0",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cH(a,b)
else this.cb(new P.ea(a,b,null))}],
e0:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cG()
else this.cb(C.v)},
ek:[function(){},"$0","gej",0,0,7],
em:[function(){},"$0","gel",0,0,7],
ei:function(){return},
cb:function(a){var z,y
z=this.r
if(z==null){z=new P.eg(null,null,0,[H.y(this,"cl",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d7(this)}},
cF:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hv(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e3((z&4)!==0)},
cH:function(a,b){var z,y
z=this.e
y=new P.q3(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e1()
z=this.f
if(!!J.o(z).$isP&&z!==$.$get$bf())z.c3(y)
else y.$0()}else{y.$0()
this.e3((z&4)!==0)}},
cG:function(){var z,y
z=new P.q2(this)
this.e1()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isP&&y!==$.$get$bf())y.c3(z)
else z.$0()},
eb:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e3((z&4)!==0)},
e3:function(a){var z,y
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
if(y)this.ek()
else this.em()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d7(this)},
f9:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.el(b==null?P.rl():b,z)
this.c=c==null?P.rk():c}},
q3:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ax(y,{func:1,args:[P.d,P.aZ]})
w=z.d
v=this.b
u=z.b
if(x)w.kT(u,v,this.c)
else w.hv(u,v)
z.e=(z.e&4294967263)>>>0}},
q2:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ht(z.c)
z.e=(z.e&4294967263)>>>0}},
qJ:{"^":"ak;$ti",
aC:function(a,b,c,d){return this.a.j4(a,d,c,!0===b)},
eN:function(a,b,c){return this.aC(a,null,b,c)}},
eb:{"^":"d;cm:a@,$ti"},
e9:{"^":"eb;ab:b<,a,$ti",
eO:function(a){a.cF(this.b)}},
ea:{"^":"eb;bs:b<,bo:c<,a",
eO:function(a){a.cH(this.b,this.c)},
$aseb:I.bb},
q5:{"^":"d;",
eO:function(a){a.cG()},
gcm:function(){return},
scm:function(a){throw H.c(new P.x("No events after a done."))}},
qB:{"^":"d;cI:a<,$ti",
d7:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.ct(new P.qC(this,a))
this.a=1},
fQ:function(){if(this.a===1)this.a=3}},
qC:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcm()
z.b=w
if(w==null)z.c=null
x.eO(this.b)}},
eg:{"^":"qB;b,c,a,$ti",
gU:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scm(b)
this.c=b}}},
qK:{"^":"d;a,b,c,$ti"},
r_:{"^":"a:1;a,b,c",
$0:function(){return this.a.bg(this.b,this.c)}},
qZ:{"^":"a:21;a,b",
$2:function(a,b){P.qY(this.a,this.b,a,b)}},
r0:{"^":"a:1;a,b",
$0:function(){return this.a.bf(this.b)}},
ec:{"^":"ak;$ti",
aC:function(a,b,c,d){return this.iv(a,d,c,!0===b)},
eN:function(a,b,c){return this.aC(a,null,b,c)},
iv:function(a,b,c,d){return P.q9(this,a,b,c,d,H.y(this,"ec",0),H.y(this,"ec",1))},
fp:function(a,b){b.bQ(a)},
iH:function(a,b,c){c.ca(a,b)},
$asak:function(a,b){return[b]}},
hw:{"^":"cl;x,y,a,b,c,d,e,f,r,$ti",
bQ:function(a){if((this.e&2)!==0)return
this.i_(a)},
ca:function(a,b){if((this.e&2)!==0)return
this.i0(a,b)},
ek:[function(){var z=this.y
if(z==null)return
z.cW()},"$0","gej",0,0,7],
em:[function(){var z=this.y
if(z==null)return
z.d_()},"$0","gel",0,0,7],
ei:function(){var z=this.y
if(z!=null){this.y=null
return z.cf()}return},
lc:[function(a){this.x.fp(a,this)},"$1","giE",2,0,function(){return H.b9(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hw")}],
le:[function(a,b){this.x.iH(a,b,this)},"$2","giG",4,0,46],
ld:[function(){this.e0()},"$0","giF",0,0,7],
ic:function(a,b,c,d,e,f,g){this.y=this.x.a.eN(this.giE(),this.giF(),this.giG())},
$ascl:function(a,b){return[b]},
v:{
q9:function(a,b,c,d,e,f,g){var z,y
z=$.q
y=e?1:0
y=new P.hw(a,null,null,null,null,z,y,null,null,[f,g])
y.f9(b,c,d,e,g)
y.ic(a,b,c,d,e,f,g)
return y}}},
qz:{"^":"ec;b,a,$ti",
fp:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.B(w)
x=H.C(w)
P.qT(b,y,x)
return}b.bQ(z)}},
cz:{"^":"d;bs:a<,bo:b<",
k:function(a){return H.b(this.a)},
$isa0:1},
qS:{"^":"d;"},
rb:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cR()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
qD:{"^":"qS;",
ht:function(a){var z,y,x,w
try{if(C.h===$.q){x=a.$0()
return x}x=P.hL(null,null,this,a)
return x}catch(w){z=H.B(w)
y=H.C(w)
x=P.br(null,null,this,z,y)
return x}},
hv:function(a,b){var z,y,x,w
try{if(C.h===$.q){x=a.$1(b)
return x}x=P.hN(null,null,this,a,b)
return x}catch(w){z=H.B(w)
y=H.C(w)
x=P.br(null,null,this,z,y)
return x}},
kT:function(a,b,c){var z,y,x,w
try{if(C.h===$.q){x=a.$2(b,c)
return x}x=P.hM(null,null,this,a,b,c)
return x}catch(w){z=H.B(w)
y=H.C(w)
x=P.br(null,null,this,z,y)
return x}},
ex:function(a,b){if(b)return new P.qE(this,a)
else return new P.qF(this,a)},
j:function(a,b){return},
hs:function(a){if($.q===C.h)return a.$0()
return P.hL(null,null,this,a)},
eT:function(a,b){if($.q===C.h)return a.$1(b)
return P.hN(null,null,this,a,b)},
kS:function(a,b,c){if($.q===C.h)return a.$2(b,c)
return P.hM(null,null,this,a,b,c)}},
qE:{"^":"a:1;a,b",
$0:function(){return this.a.ht(this.b)}},
qF:{"^":"a:1;a,b",
$0:function(){return this.a.hs(this.b)}}}],["","",,P,{"^":"",
dF:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])},
aL:function(){return new H.Q(0,null,null,null,null,null,0,[null,null])},
ad:function(a){return H.tH(a,new H.Q(0,null,null,null,null,null,0,[null,null]))},
lK:function(a,b,c){var z,y
if(P.ek(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bT()
y.push(a)
try{P.r7(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h2(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c7:function(a,b,c){var z,y,x
if(P.ek(a))return b+"..."+c
z=new P.bM(b)
y=$.$get$bT()
y.push(a)
try{x=z
x.B=P.h2(x.gB(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.B=y.gB()+c
y=z.gB()
return y.charCodeAt(0)==0?y:y},
ek:function(a){var z,y
for(z=0;y=$.$get$bT(),z<y.length;++z)if(a===y[z])return!0
return!1},
r7:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gZ(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gG();++x
if(!z.t()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.t();t=s,s=r){r=z.gG();++x
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
m5:function(a,b,c,d,e){return new H.Q(0,null,null,null,null,null,0,[d,e])},
cb:function(a,b,c){var z=P.m5(null,null,null,b,c)
a.V(0,new P.rn(z))
return z},
a1:function(a,b,c,d){return new P.hz(0,null,null,null,null,null,0,[d])},
b4:function(a,b){var z,y
z=P.a1(null,null,null,b)
for(y=J.ah(a);y.t();)z.q(0,y.gG())
return z},
dK:function(a){var z,y,x
z={}
if(P.ek(a))return"{...}"
y=new P.bM("")
try{$.$get$bT().push(a)
x=y
x.B=x.gB()+"{"
z.a=!0
a.V(0,new P.mg(z,y))
z=y
z.B=z.gB()+"}"}finally{z=$.$get$bT()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gB()
return z.charCodeAt(0)==0?z:z},
hA:{"^":"Q;a,b,c,d,e,f,r,$ti",
cR:function(a){return H.uf(a)&0x3ffffff},
cS:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gh4()
if(x==null?b==null:x===b)return y}return-1},
v:{
bQ:function(a,b){return new P.hA(0,null,null,null,null,null,0,[a,b])}}},
hz:{"^":"qm;a,b,c,d,e,f,r,$ti",
eg:function(){return new P.hz(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.ab(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gU:function(a){return this.a===0},
gap:function(a){return this.a!==0},
a3:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.it(b)},
it:function(a){var z=this.d
if(z==null)return!1
return this.di(z[this.dh(a)],a)>=0},
cl:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a3(0,a)?a:null
else return this.iL(a)},
iL:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dh(a)]
x=this.di(y,a)
if(x<0)return
return J.ay(y,x).gfi()},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.D(this))
z=z.b}},
gw:function(a){var z=this.f
if(z==null)throw H.c(new P.x("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fd(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fd(x,b)}else return this.az(b)},
az:function(a){var z,y,x
z=this.d
if(z==null){z=P.qv()
this.d=z}y=this.dh(a)
x=z[y]
if(x==null)z[y]=[this.e4(a)]
else{if(this.di(x,a)>=0)return!1
x.push(this.e4(a))}return!0},
a1:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fe(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fe(this.c,b)
else return this.iW(b)},
iW:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dh(a)]
x=this.di(y,a)
if(x<0)return!1
this.ff(y.splice(x,1)[0])
return!0},
iB:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.D(this))
if(b===v)this.a1(0,y)}},
b7:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fd:function(a,b){if(a[b]!=null)return!1
a[b]=this.e4(b)
return!0},
fe:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ff(z)
delete a[b]
return!0},
e4:function(a){var z,y
z=new P.qu(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ff:function(a){var z,y
z=a.gis()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dh:function(a){return J.j(a)&0x3ffffff},
di:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfi(),b))return y
return-1},
$isbI:1,
$isX:1,
v:{
qv:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qu:{"^":"d;fi:a<,b,is:c<"},
ab:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qm:{"^":"nY;$ti",
bF:function(a){var z=this.eg()
z.ax(0,this)
return z}},
c6:{"^":"z;$ti"},
rn:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
fk:{"^":"ft;$ti"},
ft:{"^":"d+b5;$ti",$asL:null,$asX:null,$isL:1,$isX:1},
b5:{"^":"d;$ti",
gZ:function(a){return new H.dG(this,this.gl(this),0,null,[H.y(this,"b5",0)])},
as:function(a,b){return this.j(0,b)},
V:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gU:function(a){return this.gl(this)===0},
gap:function(a){return!this.gU(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ai())
return this.j(0,this.gl(this)-1)},
a3:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bU:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bj:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
aD:function(a,b){return new H.ap(this,b,[H.y(this,"b5",0),null])},
dX:function(a,b){return H.h4(this,b,null,H.y(this,"b5",0))},
bF:function(a){var z,y
z=P.a1(null,null,null,H.y(this,"b5",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a1:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.aZ(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iA:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"b5",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hS(0,0,z.length,z)
this.sl(0,z.length)}},
aZ:function(a,b,c,d,e){var z,y,x,w,v
P.ce(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aR(d,"$isL",[H.y(this,"b5",0)],"$asL")){y=e
x=d}else{x=J.iO(d,e).bE(0,!1)
y=0}w=J.I(x)
if(y+z>w.gl(x))throw H.c(H.f8())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hS:function(a,b,c,d){return this.aZ(a,b,c,d,0)},
bO:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aV:function(a,b){return this.bO(a,b,0)},
k:function(a){return P.c7(this,"[","]")},
$isL:1,
$isX:1},
qR:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.R("Cannot modify unmodifiable map"))},
$isG:1},
me:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a9:function(a){return this.a.a9(a)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gap:function(a){var z=this.a
return z.gap(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hq:{"^":"me+qR;a,$ti",$asG:null,$isG:1},
mg:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.B+=", "
z.a=!1
z=this.b
y=z.B+=H.b(a)
z.B=y+": "
z.B+=H.b(b)}},
m6:{"^":"aX;a,b,c,d,$ti",
gZ:function(a){return new P.ef(this,this.c,this.d,this.b,null,this.$ti)},
V:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.D(this))}},
gU:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gw:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ai())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
as:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cM(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.az(b)},
ax:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aR(b,"$isL",z,"$asL")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.m7(w+(w>>>1))
if(typeof t!=="number")return H.w(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.j8(s)
this.a=s
this.b=0
C.a.aZ(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aZ(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aZ(v,z,z+r,b,0)
C.a.aZ(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.ef(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.az(z.e)},
b7:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c7(this,"{","}")},
fM:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fo();++this.d},
dG:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ai());++this.d
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
if(this.b===x)this.fo();++this.d},
fo:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aZ(y,0,w,z,x)
C.a.aZ(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
j8:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aZ(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aZ(a,0,v,x,z)
C.a.aZ(a,v,v+this.c,this.a,0)
return this.c+v}},
i3:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
v:{
b6:function(a,b){var z=new P.m6(null,0,0,0,[b])
z.i3(a,b)
return z},
m7:function(a){var z
a=C.N.f1(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
ef:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.D(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
nZ:{"^":"d;$ti",
gU:function(a){return this.a===0},
gap:function(a){return this.a!==0},
ax:function(a,b){var z
for(z=J.ah(b);z.t();)this.q(0,z.gG())},
jw:function(a){var z,y
for(z=a.a,y=new P.ab(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a3(0,y.d))return!1
return!0},
bE:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ab(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cs:function(a){return this.bE(a,!0)},
aD:function(a,b){return new H.bA(this,b,[H.m(this,0),null])},
k:function(a){return P.c7(this,"{","}")},
V:function(a,b){var z
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bt:function(a,b,c){var z,y
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gw:function(a){var z,y
z=new P.ab(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.ai())
do y=z.d
while(z.t())
return y},
bj:function(a,b,c){var z,y
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ai())},
dw:function(a,b){return this.bj(a,b,null)},
bz:function(a,b){var z,y,x,w
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dw())
y=w
x=!0}}if(x)return y
throw H.c(H.ai())},
$isbI:1,
$isX:1},
nY:{"^":"nZ;$ti"}}],["","",,P,{"^":"",
d7:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qp(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d7(a[z])
return a},
ra:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.S(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.B(x)
w=String(y)
throw H.c(new P.f3(w,null,null))}w=P.d7(z)
return w},
wk:[function(a){return a.dL()},"$1","tl",2,0,0],
qp:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iU(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cA().length
return z},
gU:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cA().length
return z===0},
gap:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cA().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a9(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.j6().n(0,b,c)},
a9:function(a){if(this.b==null)return this.c.a9(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
V:function(a,b){var z,y,x,w
if(this.b==null)return this.c.V(0,b)
z=this.cA()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d7(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dK(this)},
cA:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
j6:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dF(P.r,null)
y=this.cA()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iU:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d7(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.r,null]}},
eX:{"^":"d;$ti"},
cF:{"^":"d;$ti"},
dB:{"^":"a0;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lP:{"^":"dB;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lO:{"^":"eX;a,b",
jA:function(a,b){var z=P.ra(a,this.gjB().a)
return z},
jz:function(a){return this.jA(a,null)},
jJ:function(a,b){var z=this.gjK()
z=P.qr(a,z.b,z.a)
return z},
fX:function(a){return this.jJ(a,null)},
gjK:function(){return C.Q},
gjB:function(){return C.P},
$aseX:function(){return[P.d,P.r]}},
lR:{"^":"cF;a,b",
$ascF:function(){return[P.d,P.r]}},
lQ:{"^":"cF;a",
$ascF:function(){return[P.r,P.d]}},
qs:{"^":"d;",
hF:function(a){var z,y,x,w,v,u,t
z=J.I(a)
y=z.gl(a)
if(typeof y!=="number")return H.w(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cO(a,v)
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
e2:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lP(a,null))}z.push(a)},
dO:function(a){var z,y,x,w
if(this.hE(a))return
this.e2(a)
try{z=this.b.$1(a)
if(!this.hE(z))throw H.c(new P.dB(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.B(w)
throw H.c(new P.dB(a,y))}},
hE:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.B+=C.j.k(a)
return!0}else if(a===!0){this.c.B+="true"
return!0}else if(a===!1){this.c.B+="false"
return!0}else if(a==null){this.c.B+="null"
return!0}else if(typeof a==="string"){z=this.c
z.B+='"'
this.hF(a)
z.B+='"'
return!0}else{z=J.o(a)
if(!!z.$isL){this.e2(a)
this.l5(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.e2(a)
y=this.l6(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
l5:function(a){var z,y,x
z=this.c
z.B+="["
y=J.I(a)
if(y.gl(a)>0){this.dO(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.B+=","
this.dO(y.j(a,x))}}z.B+="]"},
l6:function(a){var z,y,x,w,v,u,t
z={}
if(a.gU(a)){this.c.B+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.V(0,new P.qt(z,x))
if(!z.b)return!1
w=this.c
w.B+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.B+=v
this.hF(x[u])
w.B+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dO(x[t])}w.B+="}"
return!0}},
qt:{"^":"a:6;a,b",
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
qq:{"^":"qs;c,a,b",v:{
qr:function(a,b,c){var z,y,x
z=new P.bM("")
y=new P.qq(z,[],P.tl())
y.dO(a)
x=z.B
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vJ:[function(a,b){return J.by(a,b)},"$2","tm",4,0,40],
f0:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kS(a)},
kS:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cT(a)},
cJ:function(a){return new P.q8(a)},
O:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.ah(a);y.t();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
m8:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aY:function(a,b){var z=P.O(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ew:function(a){H.un(H.b(a))},
bj:function(a,b,c){return new H.dy(a,H.dz(a,!1,b,!1),null,null)},
a_:{"^":"d;"},
"+bool":0,
U:{"^":"d;$ti"},
cH:{"^":"d;j7:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cH))return!1
return this.a===b.a&&!0},
bB:function(a,b){return C.e.bB(this.a,b.gj7())},
gA:function(a){var z=this.a
return(z^C.e.dq(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.k9(H.n6(this))
y=P.c0(H.n4(this))
x=P.c0(H.n0(this))
w=P.c0(H.n1(this))
v=P.c0(H.n3(this))
u=P.c0(H.n5(this))
t=P.ka(H.n2(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gk9()
y=new P.cH(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.E(y.gkw()))
return y},
gkw:function(){return this.a},
$isU:1,
$asU:function(){return[P.cH]},
v:{
k9:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
ka:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c0:function(a){if(a>=10)return""+a
return"0"+a}}},
aS:{"^":"K;",$isU:1,
$asU:function(){return[P.K]}},
"+double":0,
b3:{"^":"d;bS:a<",
ag:function(a,b){return new P.b3(this.a+b.gbS())},
ar:function(a,b){return new P.b3(this.a-b.gbS())},
c6:function(a,b){if(typeof b!=="number")return H.w(b)
return new P.b3(C.j.hr(this.a*b))},
aS:function(a,b){return C.e.aS(this.a,b.gbS())},
bd:function(a,b){return this.a>b.gbS()},
d6:function(a,b){return this.a<=b.gbS()},
bP:function(a,b){return C.e.bP(this.a,b.gbS())},
gk9:function(){return C.e.bK(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.b3))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
bB:function(a,b){return C.e.bB(this.a,b.gbS())},
k:function(a){var z,y,x,w,v
z=new P.kz()
y=this.a
if(y<0)return"-"+new P.b3(0-y).k(0)
x=z.$1(C.e.bK(y,6e7)%60)
w=z.$1(C.e.bK(y,1e6)%60)
v=new P.ky().$1(y%1e6)
return""+C.e.bK(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f0:function(a){return new P.b3(0-this.a)},
$isU:1,
$asU:function(){return[P.b3]}},
ky:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kz:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a0:{"^":"d;",
gbo:function(){return H.C(this.$thrownJsError)}},
cR:{"^":"a0;",
k:function(a){return"Throw of null."}},
b2:{"^":"a0;a,b,h:c<,d",
ge8:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge7:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ge8()+y+x
if(!this.a)return w
v=this.ge7()
u=P.f0(this.b)
return w+v+": "+H.b(u)},
v:{
E:function(a){return new P.b2(!1,null,null,a)},
cy:function(a,b,c){return new P.b2(!0,a,b,c)},
l:function(a){return new P.b2(!1,null,a,"Must not be null")}}},
dZ:{"^":"b2;e,f,a,b,c,d",
ge8:function(){return"RangeError"},
ge7:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
nc:function(a){return new P.dZ(null,null,!1,null,null,a)},
cd:function(a,b,c){return new P.dZ(null,null,!0,a,b,"Value not in range")},
a2:function(a,b,c,d,e){return new P.dZ(b,c,!0,a,d,"Invalid value")},
nd:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a2(a,b,c,d,e))},
ce:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a2(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a2(b,a,c,"end",f))
return b}}},
lz:{"^":"b2;e,l:f>,a,b,c,d",
ge8:function(){return"RangeError"},
ge7:function(){if(J.bX(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cM:function(a,b,c,d,e){var z=e!=null?e:J.aI(b)
return new P.lz(b,z,!0,a,c,"Index out of range")}}},
R:{"^":"a0;a",
k:function(a){return"Unsupported operation: "+this.a}},
a3:{"^":"a0;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
x:{"^":"a0;a",
k:function(a){return"Bad state: "+this.a}},
D:{"^":"a0;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f0(z))+"."}},
mC:{"^":"d;",
k:function(a){return"Out of Memory"},
gbo:function(){return},
$isa0:1},
fY:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbo:function(){return},
$isa0:1},
k8:{"^":"a0;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
q8:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f3:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aG(x,0,75)+"..."
return y+"\n"+x}},
kX:{"^":"d;h:a<,fu,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fu
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cy(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dV(b,"expando$values")
return y==null?null:H.dV(y,z)},
n:function(a,b,c){var z,y
z=this.fu
if(typeof z!=="string")z.set(b,c)
else{y=H.dV(b,"expando$values")
if(y==null){y=new P.d()
H.fD(b,"expando$values",y)}H.fD(y,z,c)}}},
bB:{"^":"d;"},
t:{"^":"K;",$isU:1,
$asU:function(){return[P.K]}},
"+int":0,
z:{"^":"d;$ti",
aD:function(a,b){return H.bC(this,b,H.y(this,"z",0),null)},
c4:["de",function(a,b){return new H.J(this,b,[H.y(this,"z",0)])}],
a3:function(a,b){var z
for(z=this.gZ(this);z.t();)if(J.e(z.gG(),b))return!0
return!1},
V:function(a,b){var z
for(z=this.gZ(this);z.t();)b.$1(z.gG())},
bt:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.t();)y=c.$2(y,z.gG())
return y},
bE:function(a,b){return P.O(this,b,H.y(this,"z",0))},
cs:function(a){return this.bE(a,!0)},
bF:function(a){return P.b4(this,H.y(this,"z",0))},
gl:function(a){var z,y
z=this.gZ(this)
for(y=0;z.t();)++y
return y},
gU:function(a){return!this.gZ(this).t()},
gap:function(a){return!this.gU(this)},
dX:function(a,b){return H.o4(this,b,H.y(this,"z",0))},
gw:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ai())
do y=z.gG()
while(z.t())
return y},
gc8:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ai())
y=z.gG()
if(z.t())throw H.c(H.dw())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a2(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.t();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cM(b,this,"index",null,y))},
k:function(a){return P.lK(this,"(",")")}},
cO:{"^":"d;$ti"},
L:{"^":"d;$ti",$isz:1,$isX:1},
"+List":0,
G:{"^":"d;$ti"},
as:{"^":"d;",
gA:function(a){return P.d.prototype.gA.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isU:1,
$asU:function(){return[P.K]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gA:function(a){return H.aA(this)},
k:function(a){return H.cT(this)},
gbx:function(a){return new H.au(H.ib(this),null)},
toString:function(){return this.k(this)}},
bh:{"^":"d;"},
bI:{"^":"X;$ti"},
aZ:{"^":"d;"},
r:{"^":"d;",$isU:1,
$asU:function(){return[P.r]},
$isdS:1},
"+String":0,
bM:{"^":"d;B<",
gl:function(a){return this.B.length},
gU:function(a){return this.B.length===0},
gap:function(a){return this.B.length!==0},
k:function(a){var z=this.B
return z.charCodeAt(0)==0?z:z},
v:{
h2:function(a,b,c){var z=J.ah(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.t())}else{a+=H.b(z.gG())
for(;z.t();)a=a+c+H.b(z.gG())}return a},
oP:function(a){return new P.bM(a)}}}}],["","",,P,{"^":"",fP:{"^":"d;"}}],["","",,P,{"^":"",
cU:function(a){return C.K},
qo:{"^":"d;",
am:function(a){if(a<=0||a>4294967296)throw H.c(P.nc("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
ky:function(){return Math.random()}}}],["","",,S,{"^":"",jY:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
a9:function(a){return this.b.a9(a)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){var z=this.b
return z.gU(z)},
gap:function(a){var z=this.b
return z.gap(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iN()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iN:function(){if(!this.a)return
this.a=!1
this.b=P.cb(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",jZ:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cl:function(a){return this.b.cl(a)},
a3:function(a,b){return this.b.a3(0,b)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){return this.b.a===0},
gap:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.ab(z,z.r,null,null,[null])
y.c=z.e
return y},
gw:function(a){var z=this.b
return z.gw(z)},
aD:function(a,b){var z=this.b
z.toString
return new H.bA(z,b,[H.m(z,0),null])},
bF:function(a){var z,y
z=this.b
y=z.eg()
y.ax(0,z)
return y},
q:function(a,b){this.iu()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
iu:function(){if(!this.a)return
this.a=!1
this.b=P.b4(this.b,H.m(this,0))},
$isbI:1,
$isX:1}}],["","",,S,{"^":"",dn:{"^":"d;fw:a<,b,$ti",
a_:function(a){var z=new S.N(null,null,this.$ti)
z.ah()
z.m(this)
a.$1(z)
return z.p()},
gA:function(a){var z=this.b
if(z==null){z=X.bw(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdn)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.f(y,v)
w=y[v]
if(v>=z)return H.f(x,v)
if(!J.e(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
gl:function(a){return this.a.length},
bO:function(a,b,c){var z=this.a
return(z&&C.a).bO(z,b,c)},
aV:function(a,b){return this.bO(a,b,0)},
gZ:function(a){var z=this.a
return new J.bd(z,z.length,0,null,[H.m(z,0)])},
aD:function(a,b){var z=this.a
z.toString
return new H.ap(z,b,[H.m(z,0),null])},
a3:function(a,b){var z=this.a
return(z&&C.a).a3(z,b)},
V:function(a,b){var z=this.a
return(z&&C.a).V(z,b)},
bF:function(a){var z=this.a
z.toString
return P.b4(z,H.m(z,0))},
gU:function(a){return this.a.length===0},
gap:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
ah:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new BuiltList<int>"'))}},N:{"^":"d;fw:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dn(z,null,this.$ti)
y.ah()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aR(a,"$isdn",this.$ti,null)){this.a=a.gfw()
this.b=a}else{this.a=P.O(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.E("null element"))
z=this.geo()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.E("null element"))
z=this.geo();(z&&C.a).q(z,b)},
a1:function(a,b){var z=this.geo();(z&&C.a).a1(z,b)},
aD:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bE(0,!0)
this.a=z
this.b=null
this.ip(z)},
geo:function(){if(this.b!=null){this.a=P.O(this.a,!0,H.m(this,0))
this.b=null}return this.a},
ah:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new ListBuilder<int>"'))},
ip:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.da(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cC:{"^":"d;iM:a<,b,c,d,$ti",
a_:function(a){var z=new A.cQ(null,null,this.$ti)
z.cc()
z.m(this)
a.$1(z)
return z.p()},
E:function(){return new S.jY(!0,this.a,this.$ti)},
gA:function(a){var z=this.b
if(z==null){z=this.a.gcj()
z=H.bC(z,new A.jJ(this),H.y(z,"z",0),null)
z=P.O(z,!1,H.y(z,"z",0))
C.a.f4(z)
z=X.bw(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscC)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcj()
this.c=z}z=z.gZ(z)
for(;z.t();){v=z.gG()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gap:function(a){var z=this.a
return z.gap(z)},
gl:function(a){var z=this.a
return z.gl(z)},
cc:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.au(H.W(H.m(this,1)),null).u(0,C.o))throw H.c(new P.R('explicit value type required, for example "new BuiltMap<int, int>"'))}},jJ:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d8(X.b_(X.b_(0,J.j(z)),J.j(y)))}},cQ:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cC(this.a,null,null,null,this.$ti)
z.cc()
this.b=z}return z},
m:function(a){var z
if(H.aR(a,"$iscC",this.$ti,null)){this.b=a
this.a=a.giM()}else if(!!a.$iscC){z=P.cb(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.cb(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gbx(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.E("null value"))
this.giZ().n(0,b,c)},
giZ:function(){if(this.b!=null){this.a=P.cb(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
cc:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.au(H.W(H.m(this,1)),null).u(0,C.o))throw H.c(new P.R('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dp:{"^":"d;j0:a<,b,$ti",
a_:function(a){var z=new L.aB(null,null,this.$ti)
z.aU()
z.m(this)
a.$1(z)
return z.p()},
gA:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.O(new H.bA(z,new L.jK(),[H.m(z,0),null]),!1,null)
C.a.f4(z)
z=X.bw(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdp)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gA(b)
x=this.gA(this)
if(z==null?x!=null:z!==x)return!1
return y.jw(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
cl:function(a){return this.a.cl(a)},
gZ:function(a){var z,y
z=this.a
y=new P.ab(z,z.r,null,null,[null])
y.c=z.e
return y},
aD:function(a,b){var z=this.a
z.toString
return new H.bA(z,b,[H.m(z,0),null])},
a3:function(a,b){return this.a.a3(0,b)},
V:function(a,b){return this.a.V(0,b)},
bF:function(a){return new A.jZ(!0,this.a,this.$ti)},
gU:function(a){return this.a.a===0},
gap:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
aU:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new BuiltSet<int>"'))}},jK:{"^":"a:0;",
$1:function(a){return J.j(a)}},aB:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dp(this.a,null,this.$ti)
z.aU()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aR(a,"$isdp",this.$ti,null)){this.a=a.gj0()
this.b=a}else{z=H.m(this,0)
y=P.a1(null,null,null,z)
for(x=J.ah(a);x.t();){w=x.gG()
if(H.da(w,z))y.q(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.E("null element"))
this.gep().q(0,b)},
a1:function(a,b){this.gep().a1(0,b)},
aD:function(a,b){var z=this.a
z.toString
z=P.b4(new H.bA(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.j1(z)},
gep:function(){if(this.b!=null){this.a=P.b4(this.a,H.m(this,0))
this.b=null}return this.a},
aU:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new SetBuilder<int>"'))},
j1:function(a){var z,y,x
for(z=new P.ab(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.da(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.w(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
T:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nA:{"^":"ny;ch,cx,aj:cy@,be:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hi:function(){var z=$.$get$cu()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
kb:function(){var z,y,x,w
this.cx=null
this.cy=Z.bK("Health",new N.nD(),"#CCCCCC","Your physical state",100,0,!0,P.aS)
z=P.t
this.db=Z.bK("Stamina",new N.nE(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bK("Gold",new N.nF(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bU()
x=this.cy
w=this.db
y=new O.f_(N.bg("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.Z(H.p([],[Y.ae]),0,P.aL()),x,w,z,O.uu(),O.ut(),O.us(),y,this.ghV(),new P.bM(""),!1,null)
y.hT()
this.cx=y
y.x="endGame"
$.$get$cq().q(0,0)},
i7:function(){var z,y
z=new O.cY(["# Tomorrow We Slay Death",[null,P.ad(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cY([new N.nC(this),[null,P.ad(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cY(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nB:function(){var z,y,x,w
z=Z.bK("Health",new N.rY(),"#CCCCCC","Your physical state",100,0,!0,P.aS)
y=P.t
x=Z.bK("Stamina",new N.rZ(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bK("Gold",new N.t_(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.r
z=new N.nA("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nG(new H.Q(0,null,null,null,null,null,0,[w,O.cY])),null,null,null,P.a1(null,null,null,w),!1,null,-9999,null,null,null)
z.i7()
return z}}},rY:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d6(a,0.5))return"\ud83d\ude23"
if(z.aS(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},rZ:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},t_:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nC:{"^":"a:19;a",
$0:function(){var z=0,y=P.az(),x=this
var $async$$0=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:z=2
return P.av(x.a.cx.bw(),$async$$0)
case 2:return P.aD(null,y)}})
return P.aE($async$$0,y)}},nD:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d6(a,0.5))return"\ud83d\ude23"
if(z.aS(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nE:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nF:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cI:{"^":"d;"},kP:{"^":"d;"},pv:{"^":"cI;a,b,c",
a_:function(a){var z=new M.e6(null,!1,0,0)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cI))return!1
return this.a===b.a&&this.b===b.b&&!0},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.M.gA(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},e6:{"^":"kP;d,a,b,c",
gcu:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gcu()
y=this.b
this.gcu()
x=this.c
this.gcu()
this.a
z=new M.pv(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
wo:[function(a){var z,y
z=a.gc7()
y=a.gbX()
if(typeof y!=="number")return H.w(y)
return z-2*y},"$1","dd",2,0,20],
wz:[function(a){var z,y,x
z=a.gc7()
y=a.gd0()
x=a.gbX()
if(typeof x!=="number")return H.w(x)
return z+y-x},"$1","i1",2,0,20],
f_:{"^":"ma;y,z,Q,ch,cx,cy,db,dx,dy,bG:fr<,fx,f6:fy<,aj:go<,be:id<,k1,a,b,c,d,e,f,r,x",
hT:function(){var z,y,x,w,v,u
z=P.aY(C.p,null)
y=$.$get$cr()
this.cy=R.b1(1000,"orc",O.dd(),null,null,new G.b7("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b1(1001,"goblin",O.dd(),null,null,new G.b7("scimitar",1,1,!1,!0,!1,P.aY(C.p,null)),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.N(null,null,[Q.u])
y.ah()
y.m([new Q.u("start_adventure","","",null)])
this.dx=new K.cg(y.p(),"preStartBook",new O.kG(),new O.kH(),null,null,"ground")
y=R.b1(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.D,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d5()
if(typeof y!=="number")return H.w(y)
this.go.sab(z/y)
this.id.sab(this.ch.fx)
this.k1.sab(this.ch.r)
this.cx=R.b1(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a4,0,null)
this.dy=F.fK(this.dx,!1)
y=K.cg
x=P.O($.$get$hR(),!0,y)
C.a.ax(x,[this.dx,$.$get$ep()])
w=new M.e6(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b4([z,v],R.H)
z=P.b6(null,O.cw)
u=new A.aa(v,P.a1(null,null,null,U.a7),w,z,P.b4(x,y),P.O([u],!0,S.a9),0,null)
this.fr=u
y=new Y.Z(H.p([],[Y.ae]),0,P.aL())
y.b=u.r
this.fx=new B.bD(u,null,y,1,1,!0,!1,!1,0)},
d2:function(){var z=0,y=P.az(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d2=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjI()
if(v.hf(u)){z=1
break}t=w.fr.X(w.ch.y)
s=t.gaj()
r=t.gha()
if(typeof s!=="number"){x=s.d5()
z=1
break}if(typeof r!=="number"){x=H.w(r)
z=1
break}w.go.sab(s/r)
w.id.sab(t.gbe())
r=w.k1
s=t.gf_()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cj=!0}s=w.y
s.h6("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.D(0,"\n\n",!0)
if(w.fr.k0(w.ch.y))v.D(0,"TO BE CONTINUED.",!0)
else v.D(0,"You died.",!0)
w.f.B+=v.co()
z=1
break}q=C.a.gw(r)
p=q.dR(w.fr)
o=G.iU(p,w.fr)
z=3
return P.av(o.kD(),$async$d2)
case 3:r=o.f
if(r.gU(r)){n=o.a
m=o.b
n.eX("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gA(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bN(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mJ(r)
i=new Z.mI(new P.hq(r,[null,null]),n)
if(r.gU(r))$.$get$bE().eX("Created with no recommendations.")
if(n.length===0){s.dV("No recommendation for "+H.b(p.gh()))
s.dV(new O.kJ(w))
w.fr.fW(q.gi());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.ar)(n),++h);s.bN("planner.generateTable for "+H.b(p.gh()))
o.eY().V(0,new O.kK(w))
u=i.hh(q.gdB(),O.i1())
u.toString
g=P.O(u,!1,H.y(u,"z",0))
if(g.length!==0&&C.a.bU(g,new O.kL())){w.f.B+=v.co()
C.a.sl(v.a,0)}v=new O.kM(new O.kO())
u=g.length-1
if(u-0<=32)H.fX(g,0,u,v)
else H.fW(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gY(),f.gK(),new O.kN(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfV()
z=7
return P.av(w.cv(i.kC(s==null?O.i1():s),p,v),$async$d2)
case 7:case 5:v.hf(u)
case 1:return P.aD(x,y)}})
return P.aE($async$d2,y)},
cv:function(a,b,c){var z=0,y=P.az(),x,w=this,v,u,t
var $async$cv=P.aw(function(d,e){if(d===1)return P.aC(e,y)
while(true)switch(z){case 0:v=a.ds(b,w.fx,w.fr)
u=P.O(v,!0,H.y(v,"z",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.av(w.dg(a,b,u),$async$cv)
case 6:z=4
break
case 5:t=S.na(new H.ap(u,new O.kD(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ax(c.a,w.fx.gf6().a)
w.fr=w.fx.gbG()
v=w.y
v.bN(new O.kE(a,b))
v.ai(new O.kF(w,b))
case 1:return P.aD(x,y)}})
return P.aE($async$cv,y)},
dg:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dg=P.aw(function(d,e){if(d===1)return P.aC(e,y)
while(true)switch(z){case 0:w=a.J(b,x.fr)
v=J.o(w)
z=v.u(w,1)?2:4
break
case 2:x.fx=C.a.gc8(c)
z=3
break
case 4:z=v.u(w,0)?5:7
break
case 5:x.fx=C.a.gc8(c)
z=6
break
case 7:u=C.a.gw(J.h(a.gM()).split("."))
v=v.kX(w)
t=a.ae(b,x.fr)
s=a.gP()&&b.k7(a.gM())
r="use "+H.b(u)
x.fC()
z=8
return P.av(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dg)
case 8:q=e
s=new H.J(c,new O.kA(q),[H.m(c,0)])
x.fx=s.gc8(s)
if(q.gl4()===!0){p=A.e5(x.fx.gbG())
p.a0(b.gi(),new O.kB())
v=x.fx
t=v.gfH()
s=H.p([],[Y.ae])
r=new Y.Z(s,0,P.aL())
C.a.ax(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bD(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aD(null,y)}})
return P.aE($async$dg,y)}},
kG:{"^":"a:3;",
$3:function(a,b,c){return c.D(0,"UNUSED because this is the first choice",!0)}},
kH:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.x("Room isn't to be revisited"))}},
kJ:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kI(),[H.m(z,0),null]).ci(0," <- ")}},
kI:{"^":"a:0;",
$1:function(a){return a.gaN()}},
kK:{"^":"a:0;a",
$1:function(a){return this.a.y.bN(a)}},
kO:{"^":"a:41;",
$1:function(a){if(a instanceof Q.A)return H.b(a.b.gh())+" "+a.gY()
return"ZZZZZZ "+a.gY()}},
kL:{"^":"a:0;",
$1:function(a){return a.gY()!==""}},
kM:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.by(z.$1(a),z.$1(b))}},
kN:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.az(),x=this,w
var $async$$0=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.av(w.cv(x.c,x.b,w.fy),$async$$0)
case 2:return P.aD(null,y)}})
return P.aE($async$$0,y)}},
kD:{"^":"a:0;",
$1:function(a){return a.gkE()}},
kE:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kF:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ap(z,new O.kC(),[H.m(z,0),null]).ci(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kC:{"^":"a:0;",
$1:function(a){return a.gaN()}},
kA:{"^":"a:0;a",
$1:function(a){return a.geI()===this.a.geI()}},
kB:{"^":"a:0;",
$1:function(a){var z=a.gbe()
if(typeof z!=="number")return z.ar()
a.sbe(z-1)
return a}}}],["","",,Q,{"^":"",
i6:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i6(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.iR(t.aY(y.a,y),new Q.tT(z))
t=J.ah(s.a),r=new H.bN(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gL()&&!z.eF(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
i7:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i7(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dT((t.length!==0?C.a.gw(t):null).gbC()).gjM().a,t=new J.bd(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
i8:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i8(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gw(t):null).gbh(),t=t.gZ(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
tT:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaO()}},
ac:{"^":"d;",
ds:function(a,b,c){var z=this
return P.aQ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$ds(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.J(y,x.gbG())
r=J.al(s)
v=r.bd(s,0)?2:3
break
case 2:q=A.e5(w)
v=4
return B.fy(q,x,z,z.ik(q,y,w,z.gO(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aS(s,1)?5:6
break
case 5:q=A.e5(w)
p=z.ij(q,y,w,z.gN(),!0)
if(typeof s!=="number")H.w(s)
v=7
return B.fy(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aO()
case 1:return P.aP(t)}}})},
fb:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bz(0,new Q.iS(b))
y=new O.eM(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga7().c=x
x=b.gi()
y.ga7().f=x
y.ga7().e=C.R
y.ga7().ch=f
y.ga7().Q=e
x=this.gL()
y.ga7().y=x
x=this.ga2()
y.ga7().z=x
if(!!this.$isA){x=y.ga7()
w=x.r
if(w==null){w=new L.aB(null,null,[P.t])
w.aU()
w.m(C.d)
x.r=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.E("null element"))
x.gep().q(0,w)}v=new Y.Z(H.p([],[Y.ae]),0,P.aL())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gA(a);(x.length!==0?C.a.gw(x):null).kz(a,v)
this.a=d.$3(z,a,v)
if(a.dj(u)!=null)a.fW(u);++a.r
w=a.eZ(u)
if(!(w==null))w.hd(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dR(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.da(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gw(x):null)==null)break
t=C.a.gw(x)
t.dD(a)
C.a.a1(x,t)}x=x.length!==0?C.a.gw(x):null
if(!(x==null))x.he(a,v)
if(this.a==null)H.i(new P.x("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga7().d=x
x=a.r
y.ga7().x=x
a.d.fM(y.p())
return v},
ik:function(a,b,c,d,e){return this.fb(a,b,c,d,!1,e)},
ij:function(a,b,c,d,e){return this.fb(a,b,c,d,e,!1)}},
iS:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
A:{"^":"ac;bX:b<",
gY:function(){var z=new Y.Z(H.p([],[Y.ae]),0,P.aL())
z.fJ(0,this.ga8(),this.b)
return z.co()},
ae:function(a,b){var z=new Y.Z(H.p([],[Y.ae]),0,P.aL())
z.jh(0,this.gaf(),this.b,a,!0)
return z.co()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga8()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
cK:{"^":"ac;",
gY:function(){return this.b.gY()},
k:function(a){return"ExitAction<"+this.b.gY()+">"}},
c5:{"^":"ac;",
gY:function(){var z=new Y.Z(H.p([],[Y.ae]),0,P.aL())
z.fJ(0,this.ga8(),this.b)
return z.co()},
k:function(a){return"ItemAction<"+this.gY()+">"}},
nk:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"w9<"}}}],["","",,O,{"^":"",cw:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},lZ:{"^":"d;a,b",
k:function(a){return this.b}},pr:{"^":"cw;a,es:b<,aN:c<,d,cY:e<,f8:f<,T:r<,hB:x<,hC:y<,z,hD:Q<",
a_:function(a){var z=new O.eM(null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cw))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},eM:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
ges:function(){return this.ga7().c},
gaN:function(){return this.ga7().d},
gcY:function(){return this.ga7().f},
gf8:function(){var z,y
z=this.ga7()
y=z.r
if(y==null){y=new L.aB(null,null,[P.t])
y.aU()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gT:function(){return this.ga7().x},
ghB:function(){return this.ga7().y},
ghC:function(){return this.ga7().z},
ghD:function(){return this.ga7().ch},
ga7:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.aB(null,null,[H.m(z,0)])
y.aU()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.aB(null,null,[H.m(z,0)])
y.aU()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
if(z==null){y=this.ga7()
x=y.b
if(x==null){x=new L.aB(null,null,[P.t])
x.aU()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga7().c
w=this.ga7().d
v=this.ga7().e
u=this.ga7().f
t=this.ga7()
s=t.r
if(s==null){s=new L.aB(null,null,[P.t])
s.aU()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga7().x
r=this.ga7().y
q=this.ga7().z
p=this.ga7().Q
o=this.ga7().ch
z=new O.pr(y,x,w,v,u,t,s,r,q,p,o)
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
if(o==null)H.i(P.l("wasSuccess"))}this.m(z)
return z}}}],["","",,R,{"^":"",
i9:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i9(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bP(new H.J(u,new R.tW(z),[H.m(u,0)]))
case 3:return P.aO()
case 1:return P.aP(v)}}})},
b1:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eN(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rT(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.p()},
tW:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh_()
y=this.a.gi()
return z==null?y==null:z===y}},
H:{"^":"mk;",
gfP:function(){return!0},
gbk:function(){var z=this.x
if(typeof z!=="number")return z.bd()
return z>0},
gb8:function(){return this.e instanceof K.c4},
gaq:function(){return this.dy===C.i},
ga5:function(){return this.dy===C.f},
gaa:function(){return this.dy===C.k},
k6:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.ab(z,z.r,null,null,[null]),y.c=z.e,x=0;y.t();){if(C.a.a3(y.d.ghx(),a))++x
if(x>=b)return!0}return!1},
k5:function(a){return this.k6(a,1)},
jQ:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.ab(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.t();){v=y.d
if(!(v instanceof L.aN))continue
z=v.gbH()
u=v.gbD()
t=v.gaE()?1:0
if(2+z+u+t>w){z=v.gbH()
u=v.gbD()
t=v.gaE()?1:0
w=2+z+u+t
x=v}}return x},
k7:function(a){var z=this.fx
if(typeof z!=="number")return z.bP()
return z>=1},
eF:function(a,b){return this.h5(a,b)>0},
h5:function(a,b){var z,y
if(this.eH(b)){z=a.gaX()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iI(a,b,10))return 1
z=a.gaX()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eH:function(a){var z,y
z=a.c2("Confuse",this,!0)
if(z==null)return!1
y=a.kU("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d9:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.X(this.y)
y=z.gaj()
if(typeof y!=="number")return H.w(y)
x=2*y
if(!z.gbk())x-=10
y=z.e
if(!(y instanceof K.c4))x+=4
y=J.b0(y.gab(),2)
if(typeof y!=="number")return H.w(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.ab(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.b0(v.d.gab(),10)
if(typeof y!=="number")return H.w(y)
x+=y}y=a.a
for(v=y.gZ(y),u=new H.bN(v,new R.jn(this),[H.m(y,0)]),t=0;u.t();){s=v.gG()
r=s.gaO()?2:0
q=s.gaj()
if(typeof q!=="number")return H.w(q)
p=J.b0(s.e.gab(),2)
if(typeof p!=="number")return H.w(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.ab(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.b0(q.d.gab(),10)
if(typeof r!=="number")return H.w(r)
t+=r}}return new A.cx(x,t,y.bt(0,0,new R.jo(this,a)))},
iI:function(a,b,c){var z=b.kV(a,this,!0)
if(z==null)return!1
return z<=c},
$isaK:1},
mk:{"^":"d+dr;"},
rT:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gC().z=this.a
a.gC().dx=this.b
a.gC().dy=this.d
a.gC().fx=this.e
z=this.f
if(z==null)z=$.$get$dc()
a.gC().f=z
a.gC().e=this.r
a.gC().b=[]
a.gC().fr=C.k
a.gC().y=this.x
a.gC().db=this.y
a.gC().x=this.ch
a.gC().fy=this.z
a.gC().Q=this.Q
a.gC().ch=!0
a.gC().cx=this.c
z=new L.aB(null,null,[U.a7])
z.aU()
z.m(C.d)
a.gC().cy=z
z=this.db
if(z!=null){y=new L.bm(null,null)
y.m(z)
z=y}else{z=$.$get$ev()
z.toString
y=new L.bm(null,null)
y.m(z)
z=y}a.gC().go=z
a.gC().d=this.cx
a.gC().r=this.cy
a.gC().c=this.dx
return a}},
jn:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gaX(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jo:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaO()?1:0
y=b.gaj()
if(typeof y!=="number")return H.w(y)
return J.an(a,(z+y)*this.a.h5(b,this.b))}},
dT:{"^":"d;a,b",
k:function(a){return this.b}},
ps:{"^":"H;a,fV:b<,bC:c<,ao:d<,W:e<,h_:f<,f_:r<,aj:x<,i:y<,z,cg:Q<,H:ch<,aW:cx<,ha:cy<,h:db<,aE:dx<,ak:dy<,a4:fr<,be:fx<,aX:fy<",
a_:function(a){var z=new R.eN(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.H))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.e(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d))if(J.e(this.e,b.e)){z=this.f
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
if(z==null?y==null:z===y)if(J.e(this.cx,b.cx)){z=this.cy
y=b.cy
if(z==null?y==null:z===y){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fx
y=b.fx
z=(z==null?y==null:z===y)&&J.e(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisPlayer="+J.h(this.ch)+",\nitems="+J.h(this.cx)+",\nmaxHitpoints="+J.h(this.cy)+",\nname="+J.h(this.db)+",\nnameIsProperNoun="+J.h(this.dx)+",\npose="+J.h(this.dy)+",\npronoun="+J.h(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eN:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfV:function(){return this.gC().c},
gbC:function(){return this.gC().d},
sbC:function(a){this.gC().d=a
return a},
gao:function(){return this.gC().e},
sao:function(a){this.gC().e=a
return a},
gW:function(){return this.gC().f},
sW:function(a){this.gC().f=a
return a},
gh_:function(){return this.gC().r},
gf_:function(){return this.gC().x},
gaj:function(){return this.gC().y},
saj:function(a){this.gC().y=a
return a},
gi:function(){return this.gC().z},
gcg:function(){return this.gC().ch},
gH:function(){return this.gC().cx},
gaW:function(){var z,y
z=this.gC()
y=z.cy
if(y==null){y=new L.aB(null,null,[U.a7])
y.aU()
y.m(C.d)
z.cy=y
z=y}else z=y
return z},
gha:function(){return this.gC().db},
gh:function(){return this.gC().dx},
sh:function(a){this.gC().dx=a
return a},
gaE:function(){return this.gC().dy},
gak:function(){return this.gC().fr},
sak:function(a){this.gC().fr=a
return a},
ga4:function(){return this.gC().fx},
gbe:function(){return this.gC().fy},
sbe:function(a){this.gC().fy=a
return a},
gaX:function(){var z,y
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
z=z.cx
if(!(z==null)){y=new L.aB(null,null,[H.m(z,0)])
y.aU()
y.m(z)
z=y}this.cy=z
z=this.a
this.db=z.cy
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
z=z.fy
if(!(z==null)){y=new L.bm(null,null)
y.m(z)
z=y}this.go=z
this.a=null}return this},
m:function(a){this.a=a},
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
m=this.gC()
l=m.cy
if(l==null){l=new L.aB(null,null,[U.a7])
l.aU()
l.m(C.d)
m.cy=l
m=l}else m=l
m=m.p()
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
z=new R.ps(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
if(y==null)H.i(P.l("categories"))
if(u==null)H.i(P.l("currentWeapon"))
if(s==null)H.i(P.l("gold"))
if(r==null)H.i(P.l("hitpoints"))
if(q==null)H.i(P.l("id"))
if(p==null)H.i(P.l("initiative"))
if(o==null)H.i(P.l("isActive"))
if(n==null)H.i(P.l("isPlayer"))
if(m==null)H.i(P.l("items"))
if(l==null)H.i(P.l("maxHitpoints"))
if(k==null)H.i(P.l("name"))
if(j==null)H.i(P.l("nameIsProperNoun"))
if(i==null)H.i(P.l("pose"))
if(h==null)H.i(P.l("pronoun"))
if(g==null)H.i(P.l("stamina"))}this.m(z)
return z}}}],["","",,A,{"^":"",cx:{"^":"d;c7:a<,d0:b<,bX:c<",
ar:function(a,b){return new A.ao(this.a-b.gc7(),this.b-b.gd0(),J.bx(this.c,b.gbX()))},
k:function(a){return"ActorScore<self="+C.j.bc(this.a,2)+",team="+C.j.bc(this.b,2)+",enemy="+J.bZ(this.c,2)+">"}},ao:{"^":"d;c7:a<,d0:b<,bX:c<",
gkn:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c6:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ao(this.a*b,this.b*b,J.bY(this.c,b))},
ag:function(a,b){return new A.ao(this.a+b.gc7(),this.b+b.gd0(),J.an(this.c,b.gbX()))},
d5:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ao(this.a/b,this.b/b,J.b0(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bc(this.a,2)+",team="+C.j.bc(this.b,2)+",enemy="+J.bZ(this.c,2)+">"},
v:{
jm:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.w(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.ao(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
vF:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.t:return"spear"
case C.A:return"sword"}throw H.c(P.E(a))},
a7:{"^":"ml;hx:a<",
gaN:function(){return U.vF(C.a.geD(this.a))},
gi:function(){return H.aA(this)},
gcg:function(){return!0},
gbk:function(){return!1},
gH:function(){return!1},
gaE:function(){return!1},
ga4:function(){return C.l},
gaX:function(){return $.$get$aU()},
$isaK:1},
ml:{"^":"d+dr;"},
cN:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c4:{"^":"aN;h:b<,a"}}],["","",,E,{"^":"",bk:{"^":"a7;h:b<,a",
gab:function(){return 1},
$isaK:1}}],["","",,Z,{"^":"",cZ:{"^":"aN;h:b<,bH:c<,bD:d<,aE:e<,ce:f<,ey:r<,a"}}],["","",,G,{"^":"",b7:{"^":"aN;h:b<,bH:c<,bD:d<,aE:e<,ce:f<,ey:r<,a"}}],["","",,L,{"^":"",aN:{"^":"a7;",
gey:function(){return!1},
gce:function(){return!1},
gkk:function(){return!1},
gbl:function(){return this.gbH()>0},
geJ:function(){return this.gbD()>0},
gl:function(a){return 2},
gbH:function(){return 0},
gbD:function(){return 0},
gab:function(){var z,y,x
z=this.gbH()
y=this.gbD()
x=this.gaE()?1:0
return 2+z+y+x},
$isaK:1}}],["","",,G,{"^":"",ma:{"^":"d;",
fC:function(){var z,y
z=this.f
y=z.B
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.B=""}},
lg:[function(a){this.f.B+=a},"$1","gjI",2,0,22],
bw:function(){var z=0,y=P.az(),x,w=this,v,u
var $async$bw=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.x("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.B.length===0)){z=4
break}z=5
return P.av(w.d2(),$async$bw)
case 5:z=3
break
case 4:w.fC()
case 1:return P.aD(x,y)}})
return P.aE($async$bw,y)}}}],["","",,B,{"^":"",eY:{"^":"d;d8:a<,dv:b<,cV:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.bZ(this.b,3)+", score="+this.a.k(0)+">"}},bD:{"^":"d;bG:a<,fH:b<,f6:c<,kE:d<,dv:e<,f,r,eI:x<,cV:y<",
gA:function(a){return X.bw(H.p([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbD&&this.gA(this)===z.gA(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gA(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
fy:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bY(e,b.gdv())
z=z?0:b.gcV()+1
d.b=a.r
return new B.bD(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iT:{"^":"d;a,b,c,d,e,f",
ju:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ai("...")
z.ai("combining scores")
y=H.p([],[A.ao])
x=new G.jf()
for(w=J.ah(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gG()
z.ai(new G.jd(r))
if(J.a5(r.gdv(),0.15))if(s==null){z.ai("    - first _bestCase")
s=r}else if(J.a5(x.$1(r.gd8()),x.$1(s.gd8()))){z.ai("    - new _bestCase")
s=r}q=r.gd8()
p=J.bx(q.c,t)
o=r.b
if(typeof o!=="number")return H.w(o)
n=new A.ao((q.a-v)*o,(q.b-u)*o,J.bY(p,o))
z.ai(new G.je(n))
y.push(n)}m=A.jm(y)
w=s==null
if(w)l=C.F
else{q=s.gd8()
l=new A.ao(q.a-v,q.b-u,J.bx(q.c,t))}w=w?s:s.gcV()
if(w==null)w=1
if(typeof w!=="number")return H.w(w)
v=l.a/w
u=l.b/w
w=J.b0(l.c,w)
t=m.a
q=m.b
p=m.c
z.ai("- uplifts average = "+("ActorScoreChange<self="+C.j.bc(t,2)+",team="+C.j.bc(q,2)+",enemy="+J.bZ(p,2)+">"))
z.ai("- best = "+("ActorScoreChange<self="+C.u.bc(v,2)+",team="+C.u.bc(u,2)+",enemy="+J.bZ(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ai("- result = "+("ActorScoreChange<self="+C.u.bc(t,2)+",team="+C.u.bc(q,2)+",enemy="+C.j.bc(p,2)+">"))
return new A.ao(t,q,p)},
eY:function(){var z=this
return P.aQ(function(){var y=0,x=1,w,v,u,t,s
return function $async$eY(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcj(),u=u.gZ(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gY()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aO()
case 1:return P.aP(w)}}})},
dE:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dE=P.aw(function(d,e){if(d===1)return P.aC(e,y)
while(true)switch(z){case 0:w=x.f
w.b7(0)
v=x.c
u=v.a
t=u.a.bz(0,new G.jg(x))
s=t.d9(u)
r=x.a
r.bN("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.b8(x.ea(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.bi(new G.jh(t,o))
if(o.I(t,u)!==!0){r.bi(new G.ji(o))
z=2
break}z=4
return P.av(x.cB(v,o,b,a,c).cs(0),$async$dE)
case 4:n=e
if(J.eJ(n)===!0){r.bi(new G.jj(o))
w.n(0,o,C.G)
z=2
break}r.bi(new G.jk(s,o,n))
m=x.ju(n,s,b)
w.n(0,o,m)
r.bi(new G.jl(o,m))
z=2
break
case 3:x.e=!0
return P.aD(null,y)}})
return P.aE($async$dE,y)},
kD:function(){return this.dE(50,10,null)},
ea:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ea(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bP((u.length!==0?C.a.gw(u):null).gbM())
case 2:u=(u.length!==0?C.a.gw(u):null).gaB()
t=u.length
s={func:1,ret:Q.c5,args:[U.a7]}
r={func:1,ret:Q.cK,args:[Q.u]}
q={func:1,ret:Q.A,args:[R.H]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ax(o,q)?6:8
break
case 6:x=9
return P.bP(Q.i6(z,y,o))
case 9:x=7
break
case 8:x=H.ax(o,r)?10:12
break
case 10:x=13
return P.bP(Q.i7(z,y,o))
case 13:x=11
break
case 12:x=H.ax(o,s)?14:16
break
case 14:x=17
return P.bP(Q.i8(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.x(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aO()
case 1:return P.aP(v)}}})},
cB:function(a5,a6,a7,a8,a9){var $async$cB=P.aw(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bz(0,new G.iX(t))
p=t.a
p.bi("=====")
p.bi(new G.iY(a6,q))
p.bi(new G.iZ(a6))
if(a6.I(q,r)!==!0){p.bi("- firstAction not applicable")
z=1
break}o=q.d9(r)
p.bi(new G.j4(a5,o))
p.bi(new G.j5(a5))
n=P.b6(null,B.bD)
m=P.a1(null,null,null,A.aa)
l=J.o(r)
k=l.gA(r)
for(j=new P.b8(a6.ds(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gG()
if(l.gA(r)!==k)throw H.c(new P.x("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.az(h)}s.a=0
r=t.b
case 3:if(!!n.gU(n)){z=4
break}++s.a
g=n.dG()
p.ai("----")
p.ai(new G.j6(g))
p.ai(new G.j7(g))
if(g.gcV()>a7||s.a>a8){p.ai(new G.j8(s,a7,g))
p.ai(new G.j9(g))
z=4
break}z=g.gbG().f.length===0?5:6
break
case 5:p.ai("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bj(0,new G.ja(t),new G.jb())
if(q==null){p.ai("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eY(q.d9(l),g.e,g.y)
p.ai(new G.j_(f))
z=7
x=[1]
return P.d6(P.hy(f),$async$cB,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gw(j):null).dR(l)
j=l.a
i=new H.J(j,new G.j0(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.x("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.h6("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bz(0,new G.j1(t))
c=J.e(e,q)
p.ai("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ai("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d9(l)
if(b==null)b=C.H
f=new B.eY(b,g.e,g.y)
p.ai(new G.j2(o,f))
p.ai(new G.j3(g))
z=8
x=[1]
return P.d6(P.hy(f),$async$cB,y)
case 8:p.ai("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b8(t.ea(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.I(e,l)!==!0)continue
for(a1=new P.b8(a2.ds(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bX(a4.gdv(),0.05))continue
if(m.a3(0,a4.gbG()))continue
n.az(a4)}}p.ai("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d6(null,0,y)
case 2:return P.d6(v,1,y)}})
var z=0,y=P.pU($async$cB),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.re(y)},
i1:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gw(z).gaN())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjy())+". Action Records: "+z.aD(0,new G.jc()).ci(0,"<-")))}},
v:{
iU:function(a,b){var z,y,x
z=N.bg("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.Z(H.p([],[Y.ae]),0,P.aL())
x.b=b.r
z=new G.iT(z,y,new B.bD(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.Q(0,null,null,null,null,null,0,[null,null]))
z.i1(a,b)
return z}}},jc:{"^":"a:0;",
$1:function(a){return a.gaN()}},jf:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.w(z)
return a.b-z}},jd:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},je:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jg:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jh:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gY()+"' for "+H.b(this.a.db)}},ji:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gY()+"' isn't applicable"}},jj:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gY()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jk:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gY()+"' leads to "+H.b(J.aI(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jl:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gY()+"' was scored "+this.b.k(0)}},iX:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},iY:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gY()+"' of "+H.b(this.b.gh())}},iZ:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},j4:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j5:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c6(" ",z.y)+"- "+J.h(z.b)}},j6:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfH().gY()+"'"}},j7:{"^":"a:1;a",
$0:function(){var z=this.a.gbG().f
return"- situation: "+H.b(J.iK(z.length!==0?C.a.gw(z):null))}},j8:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcV()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},j9:{"^":"a:1;a",
$0:function(){var z=this.a.gbG().d
return"- how we got here: "+new H.ap(z,new G.iW(),[H.m(z,0),null]).ci(0," <- ")}},iW:{"^":"a:0;",
$1:function(a){return a.gaN()}},ja:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jb:{"^":"a:1;",
$0:function(){return}},j_:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},j0:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j1:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j2:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},j3:{"^":"a:1;a",
$0:function(){var z=this.a.gbG().d
return"- how we got here: "+new H.ap(z,new G.iV(),[H.m(z,0),null]).ci(0," <- ")}},iV:{"^":"a:0;",
$1:function(a){return a.gaN()}}}],["","",,Z,{"^":"",mI:{"^":"d;a,b",
gbM:function(){return this.b},
gU:function(a){return this.b.length===0},
hh:function(a,b){var z=this
return P.aQ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hh(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bP(t)
case 5:w=1
break
case 4:s=z.iC(new Z.mL())
r=z.e9(new Z.mM(),[s])
q=z.e9(new Z.mN(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bE().bN("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bE().bN("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bE().bN("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.c9(t,new Z.mO(z,x))
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
case 18:case 1:return P.aO()
case 2:return P.aP(u)}}})},
kC:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc8(y)
C.a.c9(y,new Z.mP(this,a))
x=this.a.a
w=x.gct().bt(0,1/0,new Z.mQ(a))
v=x.gct().bt(0,-1/0,new Z.mR(a))
x=J.al(v)
u=J.al(w)
t=u.ar(w,J.bY(x.ar(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bx(t,1)
z.a=t
u=t}else u=t
s=x.ar(v,u)
r=P.m8(y.length,new Z.mS(z,this,a,s),!1,P.K)
q=new H.ap(r,new Z.mT(C.a.bt(r,0,Z.uk())),[H.m(r,0),null]).bE(0,!1)
z=C.a.bt(q,0,Z.ul())
if(typeof z!=="number")return H.w(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.an(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nb(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
e9:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a3(b,t))continue
if(w==null||J.a5(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iC:function(a){return this.e9(a,C.d)},
v:{
mJ:function(a){var z,y,x
z=a.gcj()
y=H.y(z,"z",0)
x=P.O(new H.J(z,new Z.mK(a),[y]),!1,y)
if(x.length===0)$.$get$bE().eX("After removing actions scored by undefined, there are no recommendations.")
return x},
w6:[function(a,b){return J.an(a,b)},"$2","uk",4,0,42],
w7:[function(a,b){return J.an(a,b)},"$2","ul",4,0,43]}},mL:{"^":"a:0;",
$1:function(a){return a.gc7()}},mM:{"^":"a:0;",
$1:function(a){return J.iG(a.gbX())}},mN:{"^":"a:0;",
$1:function(a){return a.gd0()}},mO:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.by(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mP:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.by(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mQ:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d9(a),H.d9(z))}},mR:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d9(a),H.d9(z))}},mS:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b0(J.bx(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mT:{"^":"a:0;a",
$1:function(a){return J.iN(J.bY(J.b0(a,this.a),1000))}},mK:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkn()}}}],["","",,K,{"^":"",ro:{"^":"a:3;",
$3:function(a,b,c){}},cg:{"^":"d;a,h:b<,c,d,jO:e<,f,c5:r<",
gjM:function(){return this.a},
gA:function(a){return C.b.gA(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.cg&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jP:function(a,b,c){return this.e.$3(a,b,c)},
v:{
Y:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.u])
z.ah()
z.m(f)
return new K.cg(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",u:{"^":"d;jH:a<,Y:b<,aN:c<,kh:d<"}}],["","",,S,{"^":"",a9:{"^":"d;",
gaB:function(){return C.d},
gbM:function(){return C.d},
gdB:function(){return 3},
dR:function(a){return this.aR(this.gT(),a)},
hd:function(a,b){},
he:function(a,b){},
kz:function(a,b){},
dD:function(a){},
da:function(a){return!0}}}],["","",,S,{"^":"",
fH:function(a){var z=$.$get$bG().am(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
na:function(a,b){var z,y,x,w,v
z=$.$get$bG().ky()*b
for(y=new H.dG(a,a.gl(a),0,null,[H.y(a,"aX",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.w(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
nb:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bG().am(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.w(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
bH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.I(a)
y=z.aV(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.ar()
x=y<x-1}else x=!1
if(x){w=H.p([],[P.t])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
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
if(p>1){o=$.$get$bG().am(p)
z=z.aG(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bH(C.b.aG(a,n+1,w[m])))
if(typeof v!=="number")return v.ag()
n=a.length
m+=C.b.aG(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bH(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.ar()
if(t===x-1)return a
else{if(typeof t!=="number")return t.ag()
x=t+1
return z.aG(a,0,x)+H.b(S.bH(C.b.bI(a,x)))}}}else return a},
a8:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bG().am(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ae:{"^":"d;b_:a<,aT:b<,aP:c<,hg:d<,e,dt:f@,hj:r<,hb:x<,f7:y<,jL:z<,hX:Q<,d4:ch<,jb:cx<,km:cy<,T:db<",
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
default:throw H.c(P.E("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aG(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},Z:{"^":"d;a,T:b<,c",
geE:function(){return C.a.bU(this.a,new Y.op())},
aM:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bc(b).eB(b,".")||C.b.eB(b,"!")||C.b.eB(b,"?"))&&C.b.dd(b,P.bj("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ae(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
D:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
jd:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aM(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fJ:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jj:function(a,b,c,d,e,f){return this.aM(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
eu:function(a,b,c,d,e){return this.aM(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
cd:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
cd:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fK:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fL:function(a,b,c,d,e,f){return this.aM(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
ji:function(a,b,c,d,e,f){return this.aM(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jf:function(a,b,c){return this.aM(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jg:function(a,b,c,d){return this.aM(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jh:function(a,b,c,d,e){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
jn:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.on().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gw(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bT(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gw(b))){z+="."
this.jj(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jm:function(a,b,c,d){return this.jn(a,b,c,"and",3,null,null,d)},
fN:function(){return this.D(0,"\n\n",!0)},
bT:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.I(a)
z=z.aV(a,"<owner's> "+H.b(b))!==-1||z.aV(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aV(a,"<object-owner's> "+H.b(b))!==-1||z.aV(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.I(a)
if(z.aV(a,"<subject's> "+H.b(b))!==-1||z.aV(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaE()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.cZ(a,b,"the "+H.b(b))
else{w=J.eL(c.gh(),P.bj("[aeiouy]",!1,!1))?z.cZ(a,b,"an "+H.b(b)):z.cZ(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eC:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaT()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaT()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaP()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaP()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaT().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaP().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaP().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaT().gi())}else z=!1
return z},
dQ:function(a){var z=this
return P.aQ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dQ(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aQ(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaT()!=null?3:4
break
case 3:x=5
return t.gaT()
case 5:case 4:x=t.gaP()!=null?6:7
break
case 6:x=8
return t.gaP()
case 8:case 7:x=t.ghg()!=null?9:10
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
cU:[function(a){var z=J.al(a)
if(z.aS(a,0)||z.bP(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaP()}},"$1","gaP",2,0,23],
kA:function(a,b){var z
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.eC(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf7()}return!1},
hf:function(a){var z
for(z=!1;this.geE();z=!0){a.$1(this.hk(!0))
this.kI()}return z},
hk:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bt(z,[],new Y.oq())
C.a.iX(z,new Y.or(y),!1)
x=a&&this.geE()?C.a.aV(z,C.a.dw(z,new Y.os()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eC(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdt())n=this.kA(s,p)&&this.hW(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdt()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdt(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].ghX()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjL()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd4())if(this.dn(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdt()}else n=!1
n=n||this.kW(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd4()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd4()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fH([" but "," but ",", but "])
u=!this.hJ(s,s+1)&&!0}else{r+=S.fH([" and "," and ",", and "])
u=!0}}m=this.dZ(s)
l=S.bH(m)
p=J.I(l)
if(p.a3(l,"{")===!0||p.a3(l,"}")===!0)$.$get$ih().dV('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dn(s,k)&&J.eL(this.dZ(k),"<subject> ")&&p.dd(l,"<subject> ")}else k=!1
if(k)l=p.cZ(l,"<subject> ","")
j=J.dj(l,"<action>",this.dZ(s))
p=s-1
k=this.j_(s,p)
if(k)k=!(this.cU(s).ga4()===C.l&&this.bp(s).ga4()===C.l)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dn(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cU(p)!=null)if(this.bp(s)!=null)if(this.bp(p)!=null){k=this.cU(p)
k=k==null?k:k.gi()
i=this.bp(s)
if(J.e(k,i==null?i:i.gi())){k=this.bp(p)
k=k==null?k:k.ga4()
i=this.bp(s)
k=!J.e(k,i==null?i:i.ga4())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bp(p)!=null)if(this.cU(s)!=null){k=this.bp(p)
k=k==null?k:k.gi()
i=this.cU(s)
if(J.e(k,i==null?i:i.gi())){p=this.bp(p)
p=p==null?p:p.ga4()
k=this.bp(s)
p=!J.e(p,k==null?k:k.ga4())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gaT()
g=p.gaP()
f=p.ghg()
e=p.e
k=h!=null
if(k){if(h.gH()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga4()===C.D||h.ga4()===C.a5){d=H.n(d,"<s>","")
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
d=H.n(d,"<has>","has")}d=H.iu(d,"<subject>","<subjectNoun>",0)
i=h.ga4().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cv(this.bT(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga4().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a3(j,P.bj("<subject>.+<subject's>",!0,!1))){c=h.ga4().c
d=H.n(d,"<subject's>",c)}d=J.cv(this.bT(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga4().c
d=H.n(d,"<subject's>",i)
i=h.ga4().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga4().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaE()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gH()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dj(this.bT(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga4().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a3(j,P.bj("<object>.+<object's>",!0,!1))){i=g.ga4().c
d=H.n(d,"<object's>",i)}d=J.cv(this.bT(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga4().c
d=H.n(d,"<object's>",i)
i=g.ga4().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga4().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga4().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga4().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fD(e,this.fD(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oo(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd4())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd4()?r+".":r
return H.vy(z.charCodeAt(0)==0?z:z,$.$get$h_(),new Y.ot(),null)},
co:function(){return this.hk(!1)},
kI:function(){var z,y
if(!this.geE()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.aV(z,C.a.dw(z,new Y.ou()))+1
P.ce(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hJ:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.eC(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf7()}if(!this.dn(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghj()){if(b>=z.length)return H.f(z,b)
y=z[b].ghj()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].ghb()){if(b>=z.length)return H.f(z,b)
z=z[b].ghb()}else z=!1
if(z)return!0
else return!1},
hW:function(a,b){var z,y,x,w,v
if(!this.aQ(a)||!this.aQ(b))return!1
for(z=new P.b8(this.dQ(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b8(this.dQ(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gG()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
dZ:[function(a){var z=J.al(a)
if(z.aS(a,0)||z.bP(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb_()}},"$1","gb_",2,0,12],
bp:[function(a){var z=J.al(a)
if(z.aS(a,0)||z.bP(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaT()}},"$1","gaT",2,0,23],
kW:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gT()!=null){y=a-1
if(this.aQ(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gT()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gT()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gT()
if(typeof y!=="number")return y.ar()
if(typeof x!=="number")return H.w(x)
return y-x}},
k:function(a){return this.co()},
aQ:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fD:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gH()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dj(this.bT(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga4().a)
z=H.n(H.n(J.cv(this.bT(C.b.a3(c,P.bj(d+".+"+e,!0,!1))?H.n(z,e,a.ga4().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga4().c),g,a.ga4().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j_:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaP()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaP()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaP().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaP().gi())},
dn:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaT()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaT()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaT().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaT().gi())},
v:{
oo:function(a){var z,y,x
z=!C.b.a3(a,"\n\n")?C.b.l0(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bI(z,1)}}},op:{"^":"a:0;",
$1:function(a){return J.e(a.gb_(),"\n\n")}},on:{"^":"a:24;",
$1:function(a){return C.b.eW(H.n(H.n(a,"<also> ",""),"  "," "))}},oq:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.I(a)
y=z.gap(a)?z.gw(a):null
if(y!=null&&y.gkm()&&J.e(b.gjb(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.ar()
z.n(a,x-1,b)}else z.q(a,b)
return a}},or:{"^":"a:31;a",
$1:function(a){return J.eH(this.a,a)}},os:{"^":"a:0;",
$1:function(a){return J.e(a.gb_(),"\n\n")}},ot:{"^":"a:30;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},ou:{"^":"a:0;",
$1:function(a){return J.e(a.gb_(),"\n\n")}},aK:{"^":"mm;aE:a<,h:b<,c,aX:d<,H:e<,a4:f<",
gi:function(){return H.aA(this)},
gcg:function(){return!0},
gbk:function(){return!0},
v:{
c2:function(a,b,c,d,e){var z=H.p([],[P.r])
return new Y.aK(c,b,z,e==null?$.$get$aU():e,!1,d)}}},mm:{"^":"d+dr;"},dr:{"^":"d;",
gaO:function(){return this.gbk()&&this.gcg()===!0},
a6:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iH(a,b,c,d,e,f,g,h,i,j,k,H.M(this,"$isaK"),!1,m)},
ac:function(a,b){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
an:function(a,b,c){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dH:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
ad:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
hq:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
dI:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dI:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aw:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
cp:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kO:function(a,b,c,d,e){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eQ:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bm:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
cq:function(a,b,c,d,e){return this.a6(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eP:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
c_:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bv:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
cp:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
ho:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
eR:function(a,b,c,d,e){return this.a6(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
eQ:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
hn:function(a,b,c,d){return this.a6(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kQ:function(a,b,c,d,e,f){return this.a6(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c0:function(a,b,c,d,e){return this.a6(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hm:function(a,b,c){return this.a6(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kM:function(a,b,c,d){return this.a6(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
hp:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kP:function(a,b,c,d,e){return this.a6(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kR:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eP:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kN:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},cc:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",rV:{"^":"a:0;",
$1:function(a){a.gcJ().b=2
return 2}},t0:{"^":"a:0;",
$1:function(a){a.gcJ().b=0
return 0}},rU:{"^":"a:0;",
$1:function(a){a.gcJ().b=1
return 1}},ha:{"^":"d;",
h7:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},pK:{"^":"ha;i:a<",
a_:function(a){var z=new L.bm(null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.ha))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gA:function(a){return Y.T(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
e7:function(a){var z=new L.bm(null,null)
a.$1(z)
return z.p()}}},bm:{"^":"d;a,b",
gi:function(){return this.gcJ().b},
gcJ:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcJ().b
z=new L.pK(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
hS:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hS(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bd(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bd(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aO()
case 1:return P.aP(v)}}})}}],["","",,A,{"^":"",aa:{"^":"d;fI:a<,aW:b<,c,d,e,f,T:r<,x",
gjy:function(){var z=this.f
return z.length!==0?C.a.gw(z):null},
gA:function(a){var z,y,x,w,v
z=X.bw(this.a)
y=X.bw(this.d)
x=X.bw(this.f)
w=this.r
v=this.c
v=X.d8(X.b_(X.b_(0,C.e.gA(w)),J.j(v)))
return X.d8(X.b_(X.b_(X.b_(X.b_(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isaa&&this.gA(this)===z.gA(b)},
ja:function(a){var z,y
z=this.hI(a,!0)
y=z.gZ(z)
if(y.t()){y.gG()
return!0}return!1},
bq:function(a){var z,y
z=this.hH(a)
y=z.gZ(z)
if(y.t()){y.gG()
return!0}return!1},
fW:function(a){var z,y,x
z=this.dj(a)
if(z==null)throw H.c(new P.x("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].av()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
av:function(){++this.r},
dP:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.de(0,new A.ph(a))
if(b!=null)z=z.c4(0,new A.pi(b))
if(c!=null)z=z.c4(0,new A.pj(c))
if(e!=null)z=z.c4(0,new A.pk(e))
return d!=null?z.c4(0,new A.pl(d)):z},
hH:function(a){return this.dP(a,null,null,null,null)},
hI:function(a,b){return this.dP(a,null,null,null,b)},
X:function(a){return this.a.bz(0,new A.pm(a))},
dT:function(a){return this.e.bz(0,new A.pn(a))},
eZ:function(a){var z,y
z=this.dj(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
at:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
k0:function(a){var z=this.a.bj(0,new A.po(a),new A.pp())
if(z==null)return!1
return z.gbk()},
aF:function(){var z,y
z=this.f
y=C.a.gw(z)
y.dD(this)
C.a.a1(z,y)},
ba:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.dD(this)
C.a.a1(z,y)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
bZ:function(a,b){var z,y
z=this.dj(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dK:function(a,b,c,d,e){var z,y,x,w
z=this.dP(a,b,c,d,e)
y=z.gZ(z)
if(y.t()){x=y.gG()
y=this.r
w=x.gT()
if(typeof w!=="number")return H.w(w)
return y-w}return},
kV:function(a,b,c){return this.dK(null,a,b,c,null)},
c2:function(a,b,c){return this.dK(a,null,b,null,c)},
kU:function(a,b,c){return this.dK(a,b,null,null,c)},
dJ:function(a){return this.dK(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.eg()
y.ax(0,z)
return"World<"+P.c7(y,"{","}")+">"},
a0:function(a,b){var z,y,x
z=this.X(a)
y=z.a_(b)
x=this.a
x.a1(0,z)
x.q(0,y)},
dj:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
ia:function(a){this.a.ax(0,a.a)
this.d.ax(0,a.d)
this.b.ax(0,a.b)
this.e.ax(0,a.e)
C.a.ax(this.f,a.f)
this.r=a.r},
v:{
e5:function(a){var z,y,x,w
z=P.a1(null,null,null,R.H)
y=P.b6(null,O.cw)
x=P.a1(null,null,null,U.a7)
w=P.a1(null,null,null,null)
w=new A.aa(z,x,a.c,y,w,[],null,null)
w.ia(a)
return w}}},ph:{"^":"a:0;a",
$1:function(a){return a.ges()===this.a}},pi:{"^":"a:0;a",
$1:function(a){return J.e(a.gcY(),this.a.gi())}},pj:{"^":"a:0;a",
$1:function(a){return a.gf8().a3(0,this.a.gi())}},pk:{"^":"a:0;a",
$1:function(a){return a.ghD()===this.a}},pl:{"^":"a:0;a",
$1:function(a){return a.ghB()===this.a}},pm:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pn:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},po:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pp:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",af:{"^":"ac;a2:b<"},fQ:{"^":"af;c,Y:d<,K:e<,h:f<,b,a",
R:[function(a,b,c){throw H.c(new P.x("SimpleAction always succeeds"))},"$3","gN",6,0,2],
S:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gO",6,0,2],
ae:function(a,b){throw H.c(new P.x("SimpleAction shouldn't have to provide roll reason"))},
J:function(a,b){return 1},
gL:function(){return!1},
I:function(a,b){return!0},
gM:function(){return H.i(new P.x("Not rerollable"))},
gP:function(){return!1}}}],["","",,N,{"^":"",jT:{"^":"A;L:c<,a2:d<,K:e<,P:f<,M:r<,b,a",
ga8:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
R:[function(a,b,c){var z
a.ac(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ad(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eP(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.ac(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bv(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aw(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 0.6},
I:function(a,b){var z
if(a.gH()===!0)if(a.gaa()){z=b.a
z=new H.J(z,new N.jU(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.eH(b)}else z=!1
else z=!1
return z},
v:{
vK:[function(a){return new N.jT(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tk",2,0,4]}},jU:{"^":"a:0;a",
$1:function(a){return a.gbk()&&a.gaX().h7(this.a.b.gaX())}}}],["","",,V,{"^":"",kg:{"^":"A;P:c<,M:d<,L:e<,a2:f<,K:r<,b,a",
ga8:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaf:function(){return"will <subject> kick the weapon off?"},
R:[function(a,b,c){S.a8(new V.kh(this,a,c),new V.ki(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
S.a8(new V.kj(this,a,c),new V.kk(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gw(z):null
b.bZ(y.gi(),y.a_(new V.kl(this)))
z=this.b
b.a0(z.gi(),new V.km())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gO",6,0,2],
J:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z
if(a.gaa()||a.dy===C.i){z=this.b
z=z.ga5()&&!z.gb8()}else z=!1
return z},
v:{
vN:[function(a){return new V.kg(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tB",2,0,4]}},kh:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ad(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.an(y,"<subject> mi<sses>",!0)}},ki:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ad(z,"<subject> kick<s> <object's> weapon",y)
y.an(z,"<subject> hold<s> onto it",!0)}},kj:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kR(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gW(),z,!0)}},kk:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bv(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.cd(0,"<owner's> <subject> fl<ies> away",y,y.gW())}},kl:{"^":"a:14;a",
$1:function(a){a.gbh().q(0,this.a.b.gW())
return a}},km:{"^":"a:0;",
$1:function(a){a.sW($.$get$dc())
return a}}}],["","",,R,{"^":"",lT:{"^":"A;P:c<,M:d<,L:e<,a2:f<,K:r<,b,a",
gh:function(){return"KickToGround"},
ga8:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
R:[function(a,b,c){S.a8(new R.lU(this,a,c),new R.lV(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gN",6,0,2],
S:[function(a,b,c){var z
S.a8(new R.lW(this,a,c),new R.lX(this,a,c,U.bu(b)),null,null)
z=this.b
b.a0(z.gi(),new R.lY())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gO",6,0,2],
J:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){return(a.gaa()||a.dy===C.i)&&!this.b.ga5()},
v:{
w0:[function(a){return new R.lT(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","ub",2,0,4]}},lU:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ad(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.an(y,"<subject> mi<sses>",!0)}},lV:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ad(z,"<subject> kick<s> <object's> shin",y)
y.an(z,"<subject> <does>n't budge",!0)}},lW:{"^":"a:1;a,b,c",
$0:function(){this.b.kP(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},lX:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bv(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ac(z,"<subject> {grunt|shriek}<s>")
y.aw(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lY:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}}}],["","",,F,{"^":"",mH:{"^":"ac;K:b<,L:c<,a2:d<,P:e<,M:f<,a",
gY:function(){return"Stand off."},
gh:function(){return"Pass"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gH()===!0)a.ac(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gO",6,0,2],
ae:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return!0}}}],["","",,Y,{"^":"",mV:{"^":"A;P:c<,M:d<,L:e<,a2:f<,K:r<,b,a",
ga8:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
R:[function(a,b,c){var z=this.b
a.hp(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gW(),z)
z.bm(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.hp(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gW(),z)
if(z.gaa()){z.ho(c,"<subject> lose<s> <object>",!0,$.$get$en())
b.a0(z.y,new Y.mW())
C.a.q(b.f,U.mn(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gaq()){z.ac(c,"<subject> <is> already off balance")
c.fK(0,"<subject> make<s> <object> fall to the "+H.b(U.bu(b)),z,$.$get$il())
b.a0(z.y,new Y.mX())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.x("enemy pose must be either standing or off-balance"))},"$3","gO",6,0,2],
J:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z,y
if(!a.ga5()){z=a.e
if(z.gbl()||z.gkk()){z=this.b
if(!z.gW().gce()){z.gW().gey()
y=!1}else y=!0
z=y&&!z.ga5()}else z=!1}else z=!1
return z},
v:{
w8:[function(a){return new Y.mV(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","um",2,0,4]}},mW:{"^":"a:0;",
$1:function(a){a.sak(C.i)
return a}},mX:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}}}],["","",,B,{"^":"",ni:{"^":"ac;K:b<,L:c<,a2:d<,P:e<,M:f<,a",
gY:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gH()===!0)a.bv(c,"<subject> regain<s> <object>",$.$get$en(),!0)
b.a0(a.gi(),new B.nj())
return H.b(a.gh())+" regains balance"},"$3","gO",6,0,2],
ae:function(a,b){return"Will "+a.ga4().a+" regain balance?"},
J:function(a,b){return 1},
I:function(a,b){return a.gaq()}},nj:{"^":"a:0;",
$1:function(a){a.sak(C.k)
return C.k}}}],["","",,O,{"^":"",nx:{"^":"ac;K:b<,L:c<,a2:d<,P:e<,M:f<,a",
gY:function(){return"Scramble."},
gh:function(){return"Scramble"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gO",6,0,2],
ae:function(a,b){return"Will "+a.ga4().a+" crawl out of harm's way?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga5())return!1
if(A.dg(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oc:{"^":"ac;K:b<,L:c<,a2:d<,P:e<,M:f<,a",
gY:function(){return"Stand up."},
gh:function(){return"StandUp"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ac(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a8(new Q.od(a,c),new Q.oe(a,c),null,null)
b.a0(a.gi(),new Q.of())
return H.b(a.gh())+" stands up"},"$3","gO",6,0,2],
ae:function(a,b){return"Will "+a.ga4().a+" stand up?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga5())return!1
if(A.dg(a,b))return!1
return!0}},od:{"^":"a:1;a,b",
$0:function(){return this.a.ac(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oe:{"^":"a:1;a,b",
$0:function(){return this.a.ac(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},of:{"^":"a:0;",
$1:function(a){a.sak(C.k)
return C.k}}}],["","",,T,{"^":"",
wA:[function(a){return new A.aj(T.ez(),null,null,new T.ux(),new T.uy(),new T.uz(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vl",2,0,4],
wB:[function(a){return new A.aj(T.ez(),new T.uA(),T.ez(),new T.uB(),new T.uC(),new T.uD(),new T.uE(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vm",2,0,4],
wC:[function(a,b,c,d,e){a.ad(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a0(a.gi(),new T.uF())},"$5","ez",10,0,8],
ux:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga5()&&a.gb8()&&c.gb8()}},
uy:{"^":"a:3;",
$3:function(a,b,c){return Y.eT(a,c)}},
uz:{"^":"a:3;",
$3:function(a,b,c){return S.dP(a,c,C.m)}},
uB:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga5()&&a.gb8()&&c.gb8()}},
uC:{"^":"a:3;",
$3:function(a,b,c){return Y.eT(a,c)}},
uD:{"^":"a:3;",
$3:function(a,b,c){return S.dP(a,c,C.n)}},
uA:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uE:{"^":"a:3;",
$3:function(a,b,c){return S.dP(a,c,C.q)}},
uF:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}}}],["","",,A,{"^":"",aj:{"^":"A;c,d,e,f,r,x,y,z,K:Q<,L:ch<,a2:cx<,h:cy<,P:db<,M:dx<,a8:dy<,af:fr<,b,a",
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
wD:[function(a){return new A.aj(M.eA(),null,null,new M.uG(),new M.uH(),new M.uI(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vn",2,0,4],
wE:[function(a){return new A.aj(M.eA(),new M.uJ(),M.eA(),new M.uK(),new M.uL(),new M.uM(),new M.uN(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","vo",2,0,4],
wF:[function(a,b,c,d,e){if(a.ga5()){a.hm(c,"<subject> roll<s>",e.gi())
a.hm(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kM(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eA",10,0,8],
uG:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&!c.ga5()&&!A.dg(a,b)}},
uH:{"^":"a:3;",
$3:function(a,b,c){return F.fj(a,c)}},
uI:{"^":"a:3;",
$3:function(a,b,c){return V.dD(a,c,C.m)}},
uK:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&!c.ga5()&&!A.dg(a,b)}},
uL:{"^":"a:3;",
$3:function(a,b,c){return F.fj(a,c)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return V.dD(a,c,C.n)}},
uJ:{"^":"a:3;",
$3:function(a,b,c){return a.gaa()?0.4:0.2}},
uN:{"^":"a:3;",
$3:function(a,b,c){return V.dD(a,c,C.q)}}}],["","",,U,{"^":"",
wG:[function(a){return new A.aj(U.eB(),null,null,new U.uO(),new U.uP(),new U.uQ(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","vp",2,0,4],
wH:[function(a){return new A.aj(U.eB(),new U.uR(),U.eB(),new U.uS(),new U.uT(),new U.uU(),new U.uV(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vq",2,0,4],
wI:[function(a,b,c,d,e){c.ji(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eB",10,0,8],
uO:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.gaa()||a.dy===C.i)&&!c.ga5()&&a.gb8()
else z=!1
return z}},
uP:{"^":"a:3;",
$3:function(a,b,c){return Q.fG(a,c)}},
uQ:{"^":"a:3;",
$3:function(a,b,c){return Z.dX(a,c,C.m)}},
uS:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.gaa()||a.dy===C.i)&&!c.ga5()&&a.gb8()
else z=!1
return z}},
uT:{"^":"a:3;",
$3:function(a,b,c){return Q.fG(a,c)}},
uU:{"^":"a:3;",
$3:function(a,b,c){return Z.dX(a,c,C.n)}},
uR:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uV:{"^":"a:3;",
$3:function(a,b,c){return Z.dX(a,c,C.q)}}}],["","",,G,{"^":"",
wJ:[function(a){return new A.aj(G.eC(),null,null,new G.uY(),new G.uZ(),new G.v_(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","vr",2,0,4],
wO:[function(a){return new A.aj(G.eC(),new G.v8(),G.eC(),new G.v9(),new G.va(),new G.vb(),new G.vc(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vs",2,0,4],
wP:[function(a,b,c,d,e){return a.eR(c,"<subject> swing<s> {"+H.b(U.ag(a))+" |}at <object>",e.gi(),!0,d)},"$5","eC",10,0,8],
uY:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gaa()&&!c.ga5()&&a.e.gbl()}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return M.bJ(a,c)}},
v_:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
v9:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gaa()&&!c.ga5()&&a.e.gbl()}},
va:{"^":"a:3;",
$3:function(a,b,c){return M.bJ(a,c)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.n)}},
v8:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gao()!=null?0.2:0)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.q)}}}],["","",,R,{"^":"",
wK:[function(a,b,c,d,e){return a.ho(c,"<subject> completely miss<es> <object> with "+H.b(U.ag(a)),!0,d)},"$5","is",10,0,11],
wL:[function(a){return new A.aj(R.it(),new R.v0(),R.is(),new R.v1(),new R.v2(),new R.v3(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vt",2,0,4],
wM:[function(a){return new A.aj(R.it(),new R.v4(),R.is(),new R.v5(),new R.v6(),new R.v7(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vu",2,0,4],
wN:[function(a,b,c,d,e){return a.eR(c,"<subject> swing<s> {"+H.b(U.ag(a))+" |}at <object>",e.gi(),!0,d)},"$5","it",10,0,8],
v1:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gaq()&&!c.ga5()&&a.e.gbl()}},
v2:{"^":"a:3;",
$3:function(a,b,c){return M.bJ(a,c)}},
v3:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
v0:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v5:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gaq()&&!c.ga5()&&a.e.gbl()}},
v6:{"^":"a:3;",
$3:function(a,b,c){return M.bJ(a,c)}},
v7:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.n)}},
v4:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gao()!=null?0.2:0)}}}],["","",,D,{"^":"",
wQ:[function(a){return new A.aj(D.eD(),null,null,new D.vd(),new D.ve(),new D.vf(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vv",2,0,4],
wR:[function(a){return new A.aj(D.eD(),new D.vg(),D.eD(),new D.vh(),new D.vi(),new D.vj(),new D.vk(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","vw",2,0,4],
wS:[function(a,b,c,d,e){return a.ad(c,"<subject> strike<s> down {with "+H.b(U.ag(a))+" |}at <object>",d)},"$5","eD",10,0,11],
vd:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga5()&&!a.ga5()&&a.e.gbl()}},
ve:{"^":"a:3;",
$3:function(a,b,c){return D.h1(a,c)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return V.dN(a,c,C.m)}},
vh:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga5()&&!a.ga5()&&a.e.gbl()}},
vi:{"^":"a:3;",
$3:function(a,b,c){return D.h1(a,c)}},
vj:{"^":"a:3;",
$3:function(a,b,c){return V.dN(a,c,C.n)}},
vg:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gaq()?0.2:0
y=c.gao()!=null?0.2:0
return 0.7-z-y}},
vk:{"^":"a:3;",
$3:function(a,b,c){return V.dN(a,c,C.q)}}}],["","",,E,{"^":"",oR:{"^":"c5;a2:c<,b,a",
ga8:function(){return"pick up <object>"},
gK:function(){return"A shield makes a huge difference in battle."},
gL:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gP:function(){return!1},
gM:function(){return},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.bZ(y.gi(),y.a_(new E.oS(this)))
b.a0(a.gi(),new E.oT(this))
z=this.b
a.ad(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,2],
ae:function(a,b){return H.i(new P.a3(null))},
J:function(a,b){return 1},
I:function(a,b){if(!(this.b instanceof E.bk))return!1
a.gfP()
if(a.d!=null)return!1
return!0},
v:{
wd:[function(a){return new E.oR(!0,a,null)},"$1","vA",2,0,17]}},oS:{"^":"a:14;a",
$1:function(a){a.gbh().a1(0,this.a.b)
return a}},oT:{"^":"a:0;a",
$1:function(a){a.sao(H.M(this.a.b,"$isbk"))}}}],["","",,M,{"^":"",oU:{"^":"c5;a2:c<,b,a",
ga8:function(){return"pick up <object>"},
gK:function(){return"A different weapon might change the battle."},
gL:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gP:function(){return!1},
gM:function(){return},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.bZ(y.gi(),y.a_(new M.oV(this)))
b.a0(a.gi(),new M.oW(this,a))
z=this.b
a.ad(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,2],
ae:function(a,b){return H.i(new P.a3(null))},
J:function(a,b){return 1},
I:function(a,b){var z,y,x
z=this.b
y=J.o(z)
if(!y.$isaN)return!1
if(!!y.$iscZ)return!1
a.gfP()
z=z.gab()
y=a.e.gab()
if(typeof y!=="number")return H.w(y)
if(z<=y)return!1
x=b.c2("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
v:{
we:[function(a){return new M.oU(!0,a,null)},"$1","vB",2,0,17]}},oV:{"^":"a:14;a",
$1:function(a){a.gbh().a1(0,this.a.b)
return a}},oW:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb8())a.gaW().q(0,a.gW())
a.sW(H.M(this.a.b,"$isaN"))}}}],["","",,D,{"^":"",p2:{"^":"A;L:c<,a2:d<,K:e<,P:f<,M:r<,b,a",
ga8:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
R:[function(a,b,c){var z,y
z=this.fm(a)
y=this.b
a.ad(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaE()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gao()!=null)y.kO(c,"<subject> deflects it with <subject's> <object>",!0,y.gao(),!0)
else y.eQ(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.ac(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bu(b))+" {|nearby|not far from here}")
this.fz(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w,v,u
z=this.fm(a)
y=this.b
a.ad(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaE()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gao()!=null)z.dI(c,"<subject> fl<ies> past <object-owner's> <object>",y.gao(),y,a,!0)
b.a0(y.gi(),new D.p6(z))
x=!b.X(y.gi()).gbk()&&y.gi()!==100
w=[P.r]
if(!x){v=S.bH("{shoulder|{left|right} arm|{left|right} thigh}")
u=a.gaX()
w=H.p([],w)
z.dI(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aK(!1,v,w,u==null?$.$get$aU():u,!1,C.l),y,a,!0)
y.aw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{v=S.bH("{chest|eye|neck}")
u=a.gaX()
w=H.p([],w)
z.dI(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aK(!1,v,w,u==null?$.$get$aU():u,!1,C.l),y,a,!0)
N.bV(c,b,y)}this.fz(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gO",6,0,2],
J:function(a,b){return 0.6-(this.b.gao()!=null?0.2:0)},
I:function(a,b){var z
if(a.gH()===!0)if(a.gaa())z=(C.a.a3(a.e.ghx(),C.t)||a.k5(C.t))&&J.e(b.at("FightSituation").gT(),0)
else z=!1
else z=!1
return z},
fm:function(a){var z,y
if(a.gW()!=null&&a.gW() instanceof Z.cZ)return a.gW()
for(z=a.gaW(),z=z.gZ(z);z.t();){y=z.d
if(y instanceof Z.cZ)return y}throw H.c(new P.x("No spear found in "+a.k(0)))},
fz:function(a,b,c){var z,y
z=a.at("FightSituation")
if(J.e(b.gW(),c)){y=b.jQ()
if(y==null)y=$.$get$dc()
a.a0(b.y,new D.p3(y))}else a.a0(b.gi(),new D.p4(c))
a.bZ(z.gi(),z.a_(new D.p5(c)))},
v:{
wg:[function(a){return new D.p2(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","vE",2,0,4]}},p6:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gaj()
y=this.a.gbD()
if(typeof z!=="number")return z.ar()
a.saj(z-y)
return a}},p3:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sW(z)
a.gaW().a1(0,z)
return a}},p4:{"^":"a:0;a",
$1:function(a){a.gaW().a1(0,this.a)
return a}},p5:{"^":"a:0;a",
$1:function(a){a.gbh().q(0,this.a)
return a}}}],["","",,M,{"^":"",pe:{"^":"ac;K:b<,P:c<,M:d<,L:e<,a2:f<,a",
gY:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ac(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kN(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gO",6,0,2],
ae:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z
if(a.eH(b)){z=b.c2("Confuse",a,!0)
if(typeof z!=="number")return z.bd()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",la:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga8:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.a0(z.gi(),new R.lb())
if(J.e(z.gi(),100))a.bv(c,"<subject> smash<es> <object's> head to the ground",z,!0)
else a.bv(c,"<subject> break<s> <object's> neck",z,!0)
N.bV(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vS:[function(a){return new R.la(null,!0,!0,!0,C.c,a,null)},"$1","tI",2,0,4]}},lb:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}}}],["","",,Y,{"^":"",
eT:function(a,b){var z=new Y.dm(null,null,null,null,null)
new Y.td(a,b).$1(z)
return z.p()},
eS:{"^":"a9;",
gaB:function(){return[R.tI()]},
gh:function(){return"BreakNeckOnGroundSituation"},
av:function(){var z=new Y.dm(null,null,null,null,null)
z.m(this)
new Y.jH().$1(z)
return z.p()},
aR:function(a,b){if(a===0)return b.X(this.a)
return},
aY:function(a,b){return new H.J(a,new Y.jI(this),[H.m(a,0)])}},
td:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb0().c=z
a.gb0().e=0
z=this.a.gi()
a.gb0().b=z
z=this.b.gi()
a.gb0().d=z
return a}},
jH:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.ag()
a.gb0().e=z+1
return a}},
jI:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pt:{"^":"eS;a,i:b<,c,T:d<",
a_:function(a){var z=new Y.dm(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eS))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dm:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb0().c},
gT:function(){return this.gb0().e},
gb0:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb0().b
x=this.gb0().c
w=this.gb0().d
v=this.gb0().e
z=new Y.pt(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",kT:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {dodge it|break free}")
S.a8(new Z.kU(a,c),new Z.kV(this,a,c),null,null)
b.aF()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bv(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.ba("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gbb().b9(0.5)},
I:function(a,b){return!0},
v:{
vR:[function(a){return new Z.kT("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tF",2,0,4]}},kU:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {can't|fail<s>}",!0)}},kV:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dP:function(a,b,c){var z=new S.dO(null,null,null,null,null,null)
new S.tc(a,b,c).$1(z)
return z.p()},
fw:{"^":"c1;",
gaB:function(){return[Z.tF()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
av:function(){var z=new S.dO(null,null,null,null,null,null)
z.m(this)
new S.mB().$1(z)
return z.p()}},
tc:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gaL().c=z
a.gaL().f=0
z=this.a.gi()
a.gaL().b=z
z=this.b.gi()
a.gaL().e=z
a.gaL().d=this.c
return a}},
mB:{"^":"a:0;",
$1:function(a){var z=a.gaL().f
if(typeof z!=="number")return z.ag()
a.gaL().f=z+1
return a}},
pD:{"^":"fw;cL:a<,i:b<,cn:c<,cr:d<,T:e<",
a_:function(a){var z=new S.dO(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fw))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dO:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaL().c},
gT:function(){return this.gaL().f},
gaL:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaL().b
x=this.gaL().c
w=this.gaL().d
v=this.gaL().e
u=this.gaL().f
z=new S.pD(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dg:function(a,b){var z,y,x,w
z=b.c2("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c2("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c2("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c2("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
bW:function(a){return a.gao().gaE()===!0?a.gao().gh():"<subject's> "+H.b(a.gao().gh())},
ag:function(a){return a.gW().gaE()===!0?a.gW().gh():"<subject's> "+H.b(a.gW().gh())}}],["","",,G,{"^":"",
wp:[function(a,b,c,d,e){a.ac(c,"<subject> tr<ies> to swing back")
a.eP(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gaa()){b.a0(a.y,new G.tn())
a.cp(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a0(a.y,new G.to())
a.aw(c,"<subject> lose<s> balance because of that",!0)
a.cp(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hZ",10,0,11],
wq:[function(a){return new A.aj(G.i_(),new G.tp(),G.hZ(),new G.tq(),new G.tr(),new G.ts(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tx",2,0,4],
ws:[function(a,b,c,d,e){return a.ad(c,"<subject> swing<s> back",d)},"$5","i_",10,0,8],
wr:[function(a){return new A.aj(G.i_(),new G.tt(),G.hZ(),new G.tu(),new G.tv(),new G.tw(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","ty",2,0,4],
tn:{"^":"a:0;",
$1:function(a){a.sak(C.i)
return a}},
to:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}},
tq:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gW().gbl()&&!a.ga5()}},
tr:{"^":"a:3;",
$3:function(a,b,c){return M.bJ(a,c)}},
ts:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
tp:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}},
tu:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gW().gbl()&&!a.ga5()}},
tv:{"^":"a:3;",
$3:function(a,b,c){return M.bJ(a,c)}},
tw:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.n)}},
tt:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}}}],["","",,V,{"^":"",k1:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaf:function(){return"will <subject> tackle <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ad(c,"<subject> tr<ies> to tackle <object>",z)
S.a8(new V.k2(a,c),new V.k3(this,c),null,null)
a.ad(c,"<subject> land<s> on the "+H.b(U.bu(b))+" next to <object>",z)
b.a0(a.gi(),new V.k4())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.ad(c,"<subject> tackle<s> <object> to the ground",z)
b.a0(z.gi(),new V.k5())
b.a0(a.gi(),new V.k6())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z=this.b.gaq()?0.2:0
if(a.gH()===!0)return 0.7+z
return 0.5+z},
I:function(a,b){return!a.ga5()&&a.e instanceof K.c4},
v:{
vL:[function(a){return new V.k1("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tz",2,0,4]}},k2:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> go<es> wide",!0)}},k3:{"^":"a:1;a,b",
$0:function(){return this.a.b.an(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k4:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}},k5:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}},k6:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}}}],["","",,S,{"^":"",
cG:function(a,b){var z=new S.dq(null,null,null,null,null)
new S.t3(a,b).$1(z)
return z.p()},
eZ:{"^":"a9;",
gaB:function(){return[G.tx(),G.ty(),V.tz()]},
gbM:function(){return[$.$get$dR()]},
gh:function(){return"CounterAttackSituation"},
av:function(){var z=new S.dq(null,null,null,null,null)
z.m(this)
new S.k_().$1(z)
return z.p()},
aR:function(a,b){if(a===0)return b.X(this.a)
return},
aY:function(a,b){return new H.J(a,new S.k0(this),[H.m(a,0)])}},
t3:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb1().c=z
a.gb1().e=0
z=this.a.gi()
a.gb1().b=z
z=this.b.gi()
a.gb1().d=z
return a}},
k_:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.ag()
a.gb1().e=z+1
return a}},
k0:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pu:{"^":"eZ;a,i:b<,c,T:d<",
a_:function(a){var z=new S.dq(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eZ))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dq:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb1().c},
gT:function(){return this.gb1().e},
gb1:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb1().b
x=this.gb1().c
w=this.gb1().d
v=this.gb1().e
z=new S.pu(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c1:{"^":"o3;",
gdB:function(){return 1000},
aR:function(a,b){if(a===0)return b.X(this.gcr())
return},
aY:function(a,b){return new H.J(a,new O.kb(this),[H.m(a,0)])}},o3:{"^":"a9+mY;"},kb:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcL())||J.e(a.gi(),z.gcr())}}}],["","",,U,{"^":"",
bu:function(a){return a.at("FightSituation").gc5()},
dt:function(a,b,c,d,e){var z=new U.c3(null,null,null,null,null,null,null,null,null)
new U.tj(a,b,c,d,e).$1(z)
return z.p()},
cL:{"^":"a9;",
gaB:function(){return[N.tk(),V.tB(),R.ub(),Y.um(),T.vl(),T.vm(),M.vn(),M.vo(),U.vp(),U.vq(),G.vr(),G.vs(),D.vv(),D.vw(),R.vt(),R.vu(),E.vA(),M.vB(),D.vE()]},
gbM:function(){return H.p([$.$get$fJ(),$.$get$fZ(),$.$get$fN(),$.$get$hp()],[Q.ac])},
gdB:function(){return 1000},
gh:function(){return"FightSituation"},
cM:function(a,b){var z=b.a
return(z&&C.a).bU(z,new U.kY(a))},
av:function(){var z=new U.c3(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.kZ().$1(z)
return z.p()},
aR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hS(this.f,this.b)
y=H.bC(z,new U.l_(b),H.y(z,"z",0),null)
x=H.y(y,"z",0)
w=P.O(new H.J(y,new U.l0(),[x]),!1,x)
x=H.m(w,0)
v=P.O(new H.J(w,new U.l1(),[x]),!1,x)
u=v.length===1?C.a.gc8(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.bj(0,new U.l2(q),new U.l3())
o=p==null?p:p.gT()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.w(o)
m=n-o
if(m<=0)continue
l=x.bj(0,new U.l4(q),new U.l5())
k=l==null?l:l.gT()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.w(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aY:function(a,b){return new H.J(a,new U.l6(this),[H.m(a,0)])},
he:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a9(z))y.j(0,z).$2(a,b)},
dD:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cM(a,this.b)&&this.cM(a,this.f)){y=a.eZ(z)
a.bZ(y.gi(),y.a_(new U.l7()))
for(z=this.f,x=z.a,x=new J.bd(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.X(v).gaO()){u=a.X(v)
t=u.a_(new U.l8())
w.a1(0,u)
w.q(0,t)}}C.a.q(a.f,X.mb(z,this.d,this.a,null))}else this.cM(a,this.f)},
da:function(a){var z=this.f
if(this.cM(a,z))if(this.cM(a,this.b)){z=z.a
z=(z&&C.a).bU(z,new U.l9(a))}else z=!1
else z=!1
return z}},
tj:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a4().am(1073741823)
a.gal().f=z
a.gal().y=0
z=a.gal()
y=z.r
if(y==null){y=new S.N(null,null,[P.t])
y.ah()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eK(this.a,new U.r2()))
z=a.gal()
y=z.c
if(y==null){y=new S.N(null,null,[P.t])
y.ah()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.ap(y,new U.r3(),[H.m(y,0),null]))
a.gal().e=this.c
y=new S.N(null,null,[U.a7])
y.ah()
y.m(C.d)
a.gal().b=y
y=this.d.gi()
a.gal().x=y
y=new A.cQ(null,null,[P.t,{func:1,v:true,args:[A.aa,Y.Z]}])
y.cc()
y.m(this.e)
a.gal().d=y
return a}},
r2:{"^":"a:0;",
$1:function(a){return a.gi()}},
r3:{"^":"a:0;",
$1:function(a){return a.gi()}},
kY:{"^":"a:0;a",
$1:function(a){return this.a.X(a).gaO()}},
kZ:{"^":"a:0;",
$1:function(a){var z=a.gal().y
if(typeof z!=="number")return z.ag()
a.gal().y=z+1
return a}},
l_:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},
l0:{"^":"a:0;",
$1:function(a){return a.gaO()}},
l1:{"^":"a:0;",
$1:function(a){return a.gH()}},
l2:{"^":"a:0;a",
$1:function(a){return J.e(a.gcY(),this.a.gi())&&a.ghC()===!0}},
l3:{"^":"a:1;",
$0:function(){return}},
l4:{"^":"a:0;a",
$1:function(a){return J.e(a.gcY(),this.a.gi())}},
l5:{"^":"a:1;",
$0:function(){return}},
l6:{"^":"a:27;a",
$1:function(a){var z,y,x
if(a.gaO()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a3(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a3(z,y)
z=y}else z=!0}else z=!1
return z}},
l7:{"^":"a:0;",
$1:function(a){a.skx(!1)
return a}},
l8:{"^":"a:0;",
$1:function(a){a.sak(C.k)
return a}},
l9:{"^":"a:29;a",
$1:function(a){var z=this.a.X(a)
return z.gH()===!0&&z.gaO()}},
pw:{"^":"cL;bh:a<,b,c,c5:d<,i:e<,cX:f<,r,T:x<",
a_:function(a){var z=new U.c3(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cL))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
c3:{"^":"d;a,b,c,d,e,f,r,x,y",
gbh:function(){var z,y
z=this.gal()
y=z.b
if(y==null){y=new S.N(null,null,[U.a7])
y.ah()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc5:function(){return this.gal().e},
gi:function(){return this.gal().f},
gcX:function(){var z,y
z=this.gal()
y=z.r
if(y==null){y=new S.N(null,null,[P.t])
y.ah()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gT:function(){return this.gal().y},
gal:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ah()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ah()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cQ(null,null,[H.m(z,0),H.m(z,1)])
y.cc()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ah()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gal()
x=y.b
if(x==null){x=new S.N(null,null,[U.a7])
x.ah()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gal()
w=x.c
if(w==null){w=new S.N(null,null,[P.t])
w.ah()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.p()
w=this.gal()
v=w.d
if(v==null){v=new A.cQ(null,null,[P.t,{func:1,v:true,args:[A.aa,Y.Z]}])
v.cc()
v.m(C.a2)
w.d=v
w=v}else w=v
w=w.p()
v=this.gal().e
u=this.gal().f
t=this.gal()
s=t.r
if(s==null){s=new S.N(null,null,[P.t])
s.ah()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.gal().x
r=this.gal().y
z=new U.pw(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
bV:function(a,b,c){var z,y,x
z=b.at("FightSituation")
y=z.gc5()
x=!J.e(c.gi(),100)
b.bZ(z.gi(),z.a_(new N.uc(c,x)))
if(c.gak()===C.f){c.aw(a,"<subject> stop<s> moving",!0)
a.D(0,"\n\n",!0)
return}switch($.$get$hJ().am(3)){case 0:c.cp(a,"<subject> collapse<s>"+(x?", dead":""),!0,!0)
break
case 1:c.aw(a,"<subject> fall<s> backward",!0)
c.aw(a,"<subject> twist<s>",!0)
c.cp(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aw(a,"<subject> drop<s> to <subject's> knees",!0)
c.aw(a,"<subject> keel<s> over",!0)
break}a.D(0,"\n\n",!0)},
uc:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!z.gb8()&&this.b)a.gbh().q(0,z.e)
if(z.d!=null&&this.b)a.gbh().q(0,z.d)
return a}}}],["","",,R,{"^":"",lc:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishLeap"},
ga8:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.a0(z.gi(),new R.ld())
b.a0(a.gi(),new R.le())
y=b.at("LeapSituation").gi()
x=U.bu(b)
a.cq(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.jf(0,"both "+(a.gH()===!0||z.gH()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gaj()
if(typeof w!=="number")return w.bd()
if(w>1){c.jg(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.aw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.a0(z.y,new R.lf())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vT:[function(a){return new R.lc(null,!0,!0,!0,C.c,a,null)},"$1","tJ",2,0,4]}},ld:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}},le:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}},lf:{"^":"a:0;",
$1:function(a){var z=a.gaj()
if(typeof z!=="number")return z.ar()
a.saj(z-1)
return a}}}],["","",,S,{"^":"",kn:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaf:function(){return"will <subject> dodge?"},
R:[function(a,b,c){var z=b.at("LeapSituation").gi()
a.hn(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaq())a.c0(c,"<subject> <is> out of balance",z,!0,!0)
else S.a8(new S.ko(a,c,z),new S.kp(a,c,z),null,null)
b.aF()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.at("LeapSituation").gi()
y=U.bu(b)
x=this.b
a.cq(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aw(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.a0(x.gi(),new S.kq())
b.ba("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga5()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gbb().b9(0.5-z+y)},
I:function(a,b){return!a.ga5()},
v:{
vO:[function(a){return new S.kn("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tC",2,0,4]}},ko:{"^":"a:1;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kp:{"^":"a:1;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kq:{"^":"a:0;",
$1:function(a){a.sak(C.f)
return a}}}],["","",,D,{"^":"",lu:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaf:function(){return"will <subject> impale <objectPronoun>?"},
R:[function(a,b,c){var z,y
z=b.at("LeapSituation").gi()
y=this.b
a.eR(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ag(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaq())a.c0(c,"<subject> <is> out of balance",z,!0,!0)
else S.a8(new D.lv(a,c,z),new D.lw(a,c,z),null,null)
b.aF()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.at("LeapSituation").gi()
y=this.b
a.cq(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ag(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aw(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gaj()
if(typeof x!=="number")return x.bd()
if(x>1){a.gW().ad(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.aw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
y.ac(c,"<subject> fall<s> to the ground")
b.a0(y.y,new D.lx())}else{a.gW().ad(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.aw(c,"<subject> go<es> down",!0)
N.bV(c,b,y)
b.a0(y.y,new D.ly())}b.ba("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.db)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga5()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gbb().b9(0.4-z+y)},
I:function(a,b){return!a.ga5()&&a.e.geJ()},
v:{
vX:[function(a){return new D.lu("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","u3",2,0,4]}},lv:{"^":"a:1;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lw:{"^":"a:1;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lx:{"^":"a:0;",
$1:function(a){var z=a.gaj()
if(typeof z!=="number")return z.ar()
a.saj(z-1)
a.sak(C.f)
return a}},ly:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}}}],["","",,V,{"^":"",
dD:function(a,b,c){var z=new V.dC(null,null,null,null,null,null)
new V.ta(a,b,c).$1(z)
return z.p()},
fh:{"^":"c1;",
gaB:function(){return[S.tC(),D.u3()]},
gh:function(){return"LeapDefenseSituation"},
av:function(){var z=new V.dC(null,null,null,null,null,null)
z.m(this)
new V.m_().$1(z)
return z.p()}},
ta:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gi()
a.gaH().b=z
z=this.b.gi()
a.gaH().e=z
a.gaH().d=this.c
return a}},
m_:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.ag()
a.gaH().f=z+1
return a}},
py:{"^":"fh;cL:a<,i:b<,cn:c<,cr:d<,T:e<",
a_:function(a){var z=new V.dC(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fh))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dC:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaH().c},
gT:function(){return this.gaH().f},
gaH:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaH().b
x=this.gaH().c
w=this.gaH().d
v=this.gaH().e
u=this.gaH().f
z=new V.py(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fj:function(a,b){var z=new F.dE(null,null,null,null,null)
new F.tb(a,b).$1(z)
return z.p()},
fi:{"^":"a9;",
gaB:function(){return[R.tJ()]},
gh:function(){return"LeapSituation"},
av:function(){var z=new F.dE(null,null,null,null,null)
z.m(this)
new F.m0().$1(z)
return z.p()},
aR:function(a,b){if(a===0)return b.X(this.a)
return},
aY:function(a,b){return new H.J(a,new F.m1(this),[H.m(a,0)])}},
tb:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
m0:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.ag()
a.gb2().e=z+1
return a}},
m1:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pz:{"^":"fi;a,i:b<,c,T:d<",
a_:function(a){var z=new F.dE(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fi))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dE:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb2().c},
gT:function(){return this.gb2().e},
gb2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb2().b
x=this.gb2().c
w=this.gb2().d
v=this.gb2().e
z=new F.pz(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jp:{"^":"ac;L:b<,a2:c<,P:d<,M:e<,a",
gY:function(){return""},
gK:function(){return},
gh:function(){return"AutoLoot"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.at("LootSituation")
y=b.X(100)
if(y.gcg()===!0&&!y.gbk()){a.ad(c,"<subject> kneel<s> next to <object>",y)
a.ad(c,"<subject> help<s> <object> to <object's> feet",y)
y.dH(c,'"I\'ll live," <subject> say<s>.',!0)
b.a0(100,new Z.jC())}x=[]
for(w=z.gbh(),w=w.gZ(w),v=b.a,u=null,t=null;w.t();){s=w.d
r=J.o(s)
if(!!r.$isaN){q=s.gbH()
p=s.gbD()
o=s.gaE()?1:0
n=a.gW().gab()
if(typeof n!=="number")return H.w(n)
n=2+q+p+o>n
q=n}else q=!1
if(q){m=b.X(a.gi())
l=m.a_(new Z.jD(a,s))
v.a1(0,m)
v.q(0,l)
u=s}else if(!!r.$isbk&&a.gao()==null){m=b.X(a.gi())
l=m.a_(new Z.jE(s))
v.a1(0,m)
v.q(0,l)
t=s}else{m=b.X(a.gi())
l=m.a_(new Z.jF(s))
v.a1(0,m)
v.q(0,l)
x.push(s)}}if(u!=null){a.ad(c,"<subject> pick<s> up <object>",u)
a.ad(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ad(c,"<subject> pick<s> up <object>",t)
a.ad(c,"<subject> wield<s> <object>",t)}this.ix(x,a,z,b,c)
this.iw(x,a,z,b,c)
if(x.length!==0)c.jm("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gO",6,0,2],
ae:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return a.gH()},
ix:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.O(new H.J(a,new Z.jw(),[H.m(a,0)]),!0,L.aN)
for(y=b.gaW(),y=y.gZ(y);y.t();){x=y.d
if(x instanceof L.aN)C.a.q(z,x)}if(z.length===0)return
C.a.c9(z,new Z.jx())
w=c.gcX().aD(0,new Z.jy(d)).de(0,new Z.jz())
for(y=J.ah(w.a),v=new H.bN(y,w.b,[H.m(w,0)]),u=d.a;v.t();){t=y.gG()
if(z.length===0)break
s=C.a.hl(z)
r=d.X(t.gi())
q=r.a_(new Z.jA(s))
u.a1(0,r)
u.q(0,q)
C.a.a1(a,s)
r=d.X(b.gi())
q=r.a_(new Z.jB(s))
u.a1(0,r)
u.q(0,q)
b.ad(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iw:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.O(new H.J(a,new Z.jq(),[H.m(a,0)]),!0,E.bk)
for(y=b.gaW(),y=y.gZ(y);y.t();){x=y.d
if(x instanceof E.bk)C.a.q(z,x)}if(z.length===0)return
C.a.c9(z,new Z.jr())
w=c.gcX().aD(0,new Z.js(d)).de(0,new Z.jt())
for(y=J.ah(w.a),v=new H.bN(y,w.b,[H.m(w,0)]),u=d.a;v.t();){t=y.gG()
if(z.length===0)break
s=C.a.hl(z)
r=d.X(t.gi())
q=r.a_(new Z.ju(s))
u.a1(0,r)
u.q(0,q)
C.a.a1(a,s)
r=d.X(b.gi())
q=r.a_(new Z.jv(s))
u.a1(0,r)
u.q(0,q)
b.ad(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jC:{"^":"a:0;",
$1:function(a){a.sak(C.i)
a.saj(1)
return a}},jD:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gW() instanceof K.c4))a.gaW().q(0,z.gW())
a.sW(this.b)}},jE:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sao(z)
return z}},jF:{"^":"a:0;a",
$1:function(a){a.gaW().q(0,this.a)
return a}},jw:{"^":"a:0;",
$1:function(a){return a instanceof L.aN}},jx:{"^":"a:6;",
$2:function(a,b){return J.by(a.gab(),b.gab())}},jy:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},jz:{"^":"a:0;",
$1:function(a){return a.gaO()&&a.gb8()}},jA:{"^":"a:0;a",
$1:function(a){a.sW(this.a)
return a}},jB:{"^":"a:0;a",
$1:function(a){a.gaW().a1(0,this.a)
return a}},jq:{"^":"a:0;",
$1:function(a){return a instanceof E.bk}},jr:{"^":"a:6;",
$2:function(a,b){return J.by(a.gab(),b.gab())}},js:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},jt:{"^":"a:0;",
$1:function(a){return a.gaO()&&a.gao()==null}},ju:{"^":"a:0;a",
$1:function(a){a.sao(this.a)
return a}},jv:{"^":"a:0;a",
$1:function(a){a.gaW().a1(0,this.a)
return a}}}],["","",,X,{"^":"",
mb:function(a,b,c,d){var z=new X.dI(null,null,null,null,null,null)
new X.t1(a,b,c).$1(z)
return z.p()},
fo:{"^":"a9;",
gbM:function(){return H.p([$.$get$eP()],[Q.ac])},
gh:function(){return"LootSituation"},
av:function(){var z=new X.dI(null,null,null,null,null,null)
z.m(this)
new X.md().$1(z)
return z.p()},
aR:function(a,b){if(typeof a!=="number")return a.bd()
if(a>0)return
return this.fn(b.a)},
aY:function(a,b){return[this.fn(a)]},
da:function(a){return!0},
fn:function(a){return a.dw(0,new X.mc())}},
t1:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.N(null,null,[P.t])
z.ah()
z.m(this.a)
a.gau().d=z
z=new S.N(null,null,[U.a7])
z.ah()
z.m(this.c)
a.gau().b=z
return a}},
md:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.ag()
a.gau().f=z+1
return a}},
mc:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
pA:{"^":"fo;bh:a<,c5:b<,cX:c<,i:d<,T:e<",
a_:function(a){var z=new X.dI(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fo))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dI:{"^":"d;a,b,c,d,e,f",
gbh:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.N(null,null,[U.a7])
y.ah()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc5:function(){return this.gau().c},
gcX:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.N(null,null,[P.t])
y.ah()
y.m(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gau().e},
gT:function(){return this.gau().f},
gau:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ah()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ah()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gau()
x=y.b
if(x==null){x=new S.N(null,null,[U.a7])
x.ah()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.N(null,null,[P.t])
v.ah()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pA(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mr:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ad(c,"<subject> tr<ies> to stab <object>",z)
a.an(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.a0(z.gi(),new A.ms(a))
if(b.X(z.gi()).gbk()){a.bv(c,"<subject> thrust<s> {|"+H.b(U.ag(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.aw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bv(c,"<subject> {stab<s>|run<s> "+H.b(U.ag(a))+" through} <object>",z,!0)
N.bV(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
I:function(a,b){return a.gaa()&&this.b.gaq()&&a.e.geJ()},
v:{
w1:[function(a){return new A.mr("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","ug",2,0,4]}},ms:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gaj()
y=this.a.gW().gbD()
if(typeof z!=="number")return z.ar()
a.saj(z-y)
return a}}}],["","",,U,{"^":"",
mn:function(a,b){var z=new U.dL(null,null,null,null,null)
new U.te(a,b).$1(z)
return z.p()},
fu:{"^":"a9;",
gaB:function(){return H.p([A.ug()],[{func:1,ret:Q.A,args:[R.H]}])},
gbM:function(){return[$.$get$dR()]},
gh:function(){return"OffBalanceOpportunitySituation"},
av:function(){var z=new U.dL(null,null,null,null,null)
z.m(this)
new U.mo().$1(z)
return z.p()},
aR:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bd()
if(a>0)return
z=b.X(this.a)
y=b.a
x=H.m(y,0)
w=P.O(new H.J(y,new U.mp(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geD(w)
if(v.gaa()&&z.gaq()&&v.e.geJ())return v
return},
aY:function(a,b){return new H.J(a,new U.mq(b,b.X(this.a)),[H.m(a,0)])}},
te:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb3().d=z
a.gb3().e=0
z=this.a.gi()
a.gb3().b=z
z=this.b
z=z==null?z:z.gi()
a.gb3().c=z
return a}},
mo:{"^":"a:0;",
$1:function(a){var z=a.gb3().e
if(typeof z!=="number")return z.ag()
a.gb3().e=z+1
return a}},
mp:{"^":"a:27;a,b,c",
$1:function(a){var z,y
if(a.gaO())if(a.eF(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mq:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eF(z,this.a)}},
pB:{"^":"fu;a,b,i:c<,T:d<",
a_:function(a){var z=new U.dL(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fu))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dL:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb3().d},
gT:function(){return this.gb3().e},
gb3:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb3().b
x=this.gb3().c
w=this.gb3().d
v=this.gb3().e
z=new U.pB(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lg:{"^":"A;K:c<,L:d<,a2:e<,P:f<,b,a",
ga8:function(){return""},
gh:function(){return"FinishPunch"},
gM:function(){return},
gaf:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gaa()?C.i:C.f
x=b.at("PunchSituation").gi()
w=U.bu(b)
b.a0(z.y,new O.lh(y))
switch(y){case C.k:throw H.c(new P.x("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fL(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aw(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fL(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vU:[function(a){return new O.lg(null,!0,!0,!1,a,null)},"$1","tK",2,0,4]}},lh:{"^":"a:0;a",
$1:function(a){a.sak(this.a)
return a}}}],["","",,E,{"^":"",kr:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
R:[function(a,b,c){var z=b.at("PunchSituation").gi()
a.hn(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a8(new E.ks(a,c,z),new E.kt(this,a,c,z),null,null)
b.aF()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.cq(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.at("PunchSituation").gi(),z,!0)
b.ba("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cG(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gbb().b9(0.4-z)},
I:function(a,b){return!0},
v:{
vP:[function(a){return new E.kr("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tD",2,0,4]}},ks:{"^":"a:1;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kt:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kQ(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dX:function(a,b,c){var z=new Z.dW(null,null,null,null,null,null)
new Z.t8(a,b,c).$1(z)
return z.p()},
fE:{"^":"c1;",
gaB:function(){return[E.tD()]},
gh:function(){return"PunchDefenseSituation"},
av:function(){var z=new Z.dW(null,null,null,null,null,null)
z.m(this)
new Z.n7().$1(z)
return z.p()}},
t8:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
n7:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.ag()
a.gaJ().f=z+1
return a}},
pE:{"^":"fE;cL:a<,i:b<,cn:c<,cr:d<,T:e<",
a_:function(a){var z=new Z.dW(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fE))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dW:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaJ().c},
gT:function(){return this.gaJ().f},
gaJ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaJ().b
x=this.gaJ().c
w=this.gaJ().d
v=this.gaJ().e
u=this.gaJ().f
z=new Z.pE(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fG:function(a,b){var z=new Q.dY(null,null,null,null,null)
new Q.t9(a,b).$1(z)
return z.p()},
fF:{"^":"a9;",
gaB:function(){return[O.tK()]},
gh:function(){return"PunchSituation"},
av:function(){var z=new Q.dY(null,null,null,null,null)
z.m(this)
new Q.n8().$1(z)
return z.p()},
aR:function(a,b){if(a===0)return b.X(this.a)
return},
aY:function(a,b){return new H.J(a,new Q.n9(this),[H.m(a,0)])}},
t9:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb4().c=z
a.gb4().e=0
z=this.a.gi()
a.gb4().b=z
z=this.b.gi()
a.gb4().d=z
return a}},
n8:{"^":"a:0;",
$1:function(a){var z=a.gb4().e
if(typeof z!=="number")return z.ag()
a.gb4().e=z+1
return a}},
n9:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pF:{"^":"fF;a,i:b<,c,T:d<",
a_:function(a){var z=new Q.dY(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fF))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dY:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb4().c},
gT:function(){return this.gb4().e},
gb4:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb4().b
x=this.gb4().c
w=this.gb4().d
v=this.gb4().e
z=new Q.pF(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",li:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlash"},
ga8:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.a0(z.gi(),new O.ll(a))
y=b.at("SlashSituation").gi()
x=!b.X(z.gi()).gbk()&&!J.e(z.gi(),100)
if(!x){a.cq(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.aw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.cq(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
N.bV(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return a.gW().gbl()},
v:{
vW:[function(a){return new O.li(null,!0,!0,!0,C.c,a,null)},"$1","tL",2,0,4]}},ll:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gaj()
y=this.a.gW().gbH()
if(typeof z!=="number")return z.ar()
a.saj(z-y)
return a}}}],["","",,X,{"^":"",kc:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ag(a))+"|fend it off}")
if(a.gaq())a.an(c,"<subject> <is> out of balance",!0)
else S.a8(new X.kd(a,c),new X.ke(this,a,c),null,null)
b.aF()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gH()===!0)a.ac(c,"<subject> {step<s>|take<s> a step} back")
a.bm(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ag(a))+"|fend<s> it off}",!0)
if(!a.gaa()){b.a0(a.y,new X.kf())
if(a.ch===!0)a.ac(c,"<subject> regain<s> balance")}b.ba("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.gaa()?0:0.2
return y.gbb().b9(0.5-x)},
I:function(a,b){return a.gW().gce()},
v:{
vM:[function(a){return new X.kc("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tA",2,0,4]}},kd:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},ke:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kf:{"^":"a:0;",
$1:function(a){a.sak(C.k)
return a}}}],["","",,F,{"^":"",ku:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"DodgeSlash"},
ga8:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaq())a.an(c,"<subject> <is> out of balance",!0)
else S.a8(new F.kv(a,c),new F.kw(this,a,c),null,null)
b.aF()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bv(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gaa()){z.cp(c,"<subject> lose<s> balance because of that",!0,!0)
b.a0(z.y,new F.kx())}b.ba("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cG(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gbb().b9(0.4-z)},
I:function(a,b){return!a.ga5()},
v:{
vQ:[function(a){return new F.ku("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tE",2,0,4]}},kv:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kw:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kx:{"^":"a:0;",
$1:function(a){a.sak(C.i)
return C.i}}}],["","",,O,{"^":"",lS:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
R:[function(a,b,c){a.dH(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aF()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.bm(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.cd(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gW())
b.ba("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.gaa()?0:0.2
return y.gbb().b9(0.5-x)},
I:function(a,b){return a.gb8()},
v:{
w_:[function(a){return new O.lS("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","ua",2,0,4]}}}],["","",,G,{"^":"",mE:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"ParrySlash"},
ga8:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ag(a))+"|fend it off}")
if(a.gaq())a.an(c,"<subject> <is> out of balance",!0)
else S.a8(new G.mF(a,c),new G.mG(this,a,c),null,null)
b.aF()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gaq()){c.eu(0,"<subject> <is> out of balance",!0,!0,z)
c.cd(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ix())
a.bm(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ag(a))+"|fend<s> it off easily}",!0)}else a.bm(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ag(a))+"|fend<s> it off}",!0)
b.ba("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cG(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gaq()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gbb().b9(0.3-z+y)},
I:function(a,b){return a.gW().gce()},
v:{
w4:[function(a){return new G.mE("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uj",2,0,4]}},mF:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mG:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",o_:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bW(a)))
if(a.gaq())a.an(c,"<subject> <is> out of balance",!0)
else S.a8(new E.o0(a,c),new E.o1(a,c),new E.o2(this,a,c),null)
b.aF()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gaq()){c.eu(0,"<subject> <is> out of balance",!0,!0,z)
c.cd(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iw())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bW(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bW(a)),!0)
b.ba("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cG(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gaq()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gbb().b9(0.5-z+y)},
I:function(a,b){return a.gao()!=null},
v:{
wb:[function(a){return new E.o_("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","uw",2,0,4]}},o0:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},o1:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> <is> too slow",!0)}},o2:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bl:function(a,b,c){var z=new L.e1(null,null,null,null,null,null)
new L.t2(a,b,c).$1(z)
return z.p()},
fS:{"^":"c1;",
gaB:function(){return[X.tA(),F.tE(),O.ua(),G.uj(),E.uw()]},
gh:function(){return"SlashDefenseSituation"},
av:function(){var z=new L.e1(null,null,null,null,null,null)
z.m(this)
new L.o6().$1(z)
return z.p()}},
t2:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
o6:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.ag()
a.gaK().f=z+1
return a}},
pH:{"^":"fS;cL:a<,i:b<,cn:c<,cr:d<,T:e<",
a_:function(a){var z=new L.e1(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
e1:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaK().c},
gT:function(){return this.gaK().f},
gaK:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaK().b
x=this.gaK().c
w=this.gaK().d
v=this.gaK().e
u=this.gaK().f
z=new L.pH(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bJ:function(a,b){var z=new M.e2(null,null,null,null,null)
new M.t4(a,b).$1(z)
return z.p()},
fT:{"^":"a9;",
gaB:function(){return[O.tL()]},
gh:function(){return"SlashSituation"},
av:function(){var z=new M.e2(null,null,null,null,null)
z.m(this)
new M.o7().$1(z)
return z.p()},
aR:function(a,b){if(a===0)return b.X(this.a)
return},
aY:function(a,b){return new H.J(a,new M.o8(this),[H.m(a,0)])}},
t4:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb5().c=z
a.gb5().e=0
z=this.a.gi()
a.gb5().b=z
z=this.b.gi()
a.gb5().d=z
return a}},
o7:{"^":"a:0;",
$1:function(a){var z=a.gb5().e
if(typeof z!=="number")return z.ag()
a.gb5().e=z+1
return a}},
o8:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pI:{"^":"fT;a,i:b<,c,T:d<",
a_:function(a){var z=new M.e2(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e2:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb5().c},
gT:function(){return this.gb5().e},
gb5:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb5().b
x=this.gb5().c
w=this.gb5().d
v=this.gb5().e
z=new M.pI(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lj:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga8:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.a0(z.gi(),new Q.lk())
c.fK(0,"<subject> {cuts|slashes|slits} <object's> "+(J.e(z.gi(),100)?"side":"{throat|neck|side}"),z,a.gW())
N.bV(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return this.b.ga5()&&a.gW().gbl()},
v:{
vV:[function(a){return new Q.lj(null,!0,!0,!0,C.c,a,null)},"$1","tM",2,0,4]}},lk:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}}}],["","",,K,{"^":"",mu:{"^":"A;L:c<,a2:d<,P:e<,M:f<,K:r<,b,a",
gh:function(){return"OnGroundParry"},
ga8:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ag(a))+"}}")
S.a8(new K.mv(a,c),new K.mw(this,a,c),null,null)
b.aF()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){a.bm(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ag(a))+"}",!0)
b.ba("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gbb().b9(0.3)},
I:function(a,b){return a.gW().gce()},
v:{
w2:[function(a){return new K.mu(!1,!1,!0,C.c,"TODO",a,null)},"$1","uh",2,0,4]}},mv:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mw:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mx:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
ga8:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bW(a)))
S.a8(new L.my(a,c),new L.mz(a,c),new L.mA(this,a,c),null)
b.aF()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gaq()){c.eu(0,"<subject> <is> out of balance",!0,!0,z)
c.cd(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iy())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bW(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bW(a)),!0)
b.ba("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gbb().b9(0.5)},
I:function(a,b){return a.gao()!=null},
v:{
w3:[function(a){return new L.mx("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","ui",2,0,4]}},my:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mz:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> <is> too slow",!0)}},mA:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nl:{"^":"A;K:c<,L:d<,a2:e<,P:f<,M:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga8:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to roll out of the way")
a.an(c,"<subject> can't",!0)
b.aF()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gN",6,0,2],
S:[function(a,b,c){a.eQ(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a0(a.gi(),new Y.nm())
a.bm(c,"<subject> jump<s> up on <subject's> feet",!0)}b.ba("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gbb().b9(0.5)},
I:function(a,b){return!0},
v:{
wa:[function(a){return new Y.nl(null,!1,!1,!0,C.c,a,null)},"$1","ur",2,0,4]}},nm:{"^":"a:0;",
$1:function(a){a.sak(C.k)
return a}}}],["","",,V,{"^":"",
dN:function(a,b,c){var z=new V.dM(null,null,null,null,null,null)
new V.t5(a,b,c).$1(z)
return z.p()},
fv:{"^":"c1;",
gaB:function(){return[K.uh(),L.ui(),Y.ur()]},
gh:function(){return"OnGroundDefenseSituation"},
av:function(){var z=new V.dM(null,null,null,null,null,null)
z.m(this)
new V.mt().$1(z)
return z.p()}},
t5:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
mt:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.ag()
a.gaI().f=z+1
return a}},
pC:{"^":"fv;cL:a<,i:b<,cn:c<,cr:d<,T:e<",
a_:function(a){var z=new V.dM(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fv))return!1
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
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dM:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaI().c},
gT:function(){return this.gaI().f},
gaI:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaI().b
x=this.gaI().c
w=this.gaI().d
v=this.gaI().e
u=this.gaI().f
z=new V.pC(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
h1:function(a,b){var z=new D.e3(null,null,null,null,null)
new D.t7(a,b).$1(z)
return z.p()},
h0:{"^":"a9;",
gaB:function(){return[Q.tM()]},
gh:function(){return"StrikeDownSituation"},
av:function(){var z=new D.e3(null,null,null,null,null)
z.m(this)
new D.oN().$1(z)
return z.p()},
aR:function(a,b){if(a===0)return b.X(this.a)
return},
aY:function(a,b){return new H.J(a,new D.oO(this),[H.m(a,0)])}},
t7:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gb6().c=z
a.gb6().e=0
z=this.a.gi()
a.gb6().b=z
z=this.b.gi()
a.gb6().d=z
return a}},
oN:{"^":"a:0;",
$1:function(a){var z=a.gb6().e
if(typeof z!=="number")return z.ag()
a.gb6().e=z+1
return a}},
oO:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pJ:{"^":"h0;a,i:b<,c,T:d<",
a_:function(a){var z=new D.e3(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.h0))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e3:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb6().c},
gT:function(){return this.gb6().e},
gb6:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb6().b
x=this.gb6().c
w=this.gb6().d
v=this.gb6().e
z=new D.pJ(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",mY:{"^":"d;",
gbb:function(){switch(this.gcn()){case C.m:return C.a3
case C.n:return $.$get$fz()
case C.q:return $.$get$fA()
default:throw H.c(P.E(this.gcn()))}},
$isa9:1}}],["","",,K,{"^":"",dU:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",oa:{"^":"ac;L:b<,P:c<,a2:d<,M:e<,a",
gY:function(){return""},
gK:function(){return},
gh:function(){return"SlayMonstersAction"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gw(z):null
x=b.dT(y.gbC())
w=b.a
C.a.q(z,x.jP(b,y,new H.J(w,new D.ob(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gO",6,0,2],
ae:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
return H.M(z.length!==0?C.a.gw(z):null,"$isV").c}},ob:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaO())if(a.gaX().h7(this.a.gaX())){z=a.gbC()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z}}}],["","",,Y,{"^":"",oX:{"^":"cK;L:c<,a2:d<,P:e<,M:f<,b,a",
gK:function(){return},
gh:function(){return"TakeExitAction"},
R:[function(a,b,c){throw H.c(new P.a3(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaN())
y=b.f
H.M(y.length!==0?C.a.gw(y):null,"$isV").dC(b,a,z.gjH(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gO",6,0,2],
ae:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
if(H.M(z.length!==0?C.a.gw(z):null,"$isV").c===!0)return!1
this.b.gkh()
return!0},
v:{
wf:[function(a){return new Y.oX(!1,!0,!1,null,a,null)},"$1","vC",2,0,48]}}}],["","",,F,{"^":"",
fK:function(a,b){var z=new F.e_(null,null,null,null,null)
new F.rS(a,b).$1(z)
return z.p()},
V:{"^":"a9;",
gaB:function(){return[Y.vC()]},
gbM:function(){var z=[]
C.a.ax(z,$.$get$hQ())
z.push($.$get$fV())
return z},
gdB:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
av:function(){var z=new F.e_(null,null,null,null,null)
z.m(this)
new F.nn().$1(z)
return z.p()},
aR:function(a,b){return b.a.bj(0,new F.no(),new F.np())},
aY:function(a,b){var z=this.aR(null,b)
if(z==null)return[]
return[z]},
dC:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dT(c)
a.bZ(this.b,F.fK(z,z.gjO()!=null))
if(this.ih(a,b,z))z.d.$3(b,a,d)
else{d.D(0,"\n\n",!0)
z.c.$3(b,a,d)
d.D(0,"\n\n",!0)}for(y=R.i9(b,a),y=P.O(y,!0,H.y(y,"z",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.X(y[v].gi())
t=u.a_(new F.nq(z))
w.a1(0,u)
w.q(0,t)}},
hd:function(a,b){a.a.iB(new F.nr(),!0)},
da:function(a){if(J.e(this.a,$.$get$ep().b))return!1
return!0},
ih:function(a,b,c){var z,y,x
for(z=a.d,z=new P.ef(z,z.c,z.d,z.b,null,[H.m(z,0)]),y=c.b;z.t();){x=z.e
if(!J.e(x.gcY(),b.gi()))continue
if(x.ges()!=="TakeExitAction")continue
if(J.eH(x.gaN(),y)===!0)return!0}return!1}},
rS:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gaA().c=z
a.gaA().e=0
z=this.a.gh()
a.gaA().b=z
a.gaA().d=this.b
return a}},
nn:{"^":"a:0;",
$1:function(a){var z=a.gaA().e
if(typeof z!=="number")return z.ag()
a.gaA().e=z+1
return a}},
no:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
np:{"^":"a:1;",
$0:function(){return}},
nq:{"^":"a:0;a",
$1:function(a){a.sbC(this.a.b)
return a}},
nr:{"^":"a:0;",
$1:function(a){return!a.gbk()}},
pG:{"^":"V;bC:a<,i:b<,c,T:d<",
a_:function(a){var z=new F.e_(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.V))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
e_:{"^":"d;a,b,c,d,e",
gbC:function(){return this.gaA().b},
sbC:function(a){this.gaA().b=a
return a},
gi:function(){return this.gaA().c},
skx:function(a){this.gaA().d=a
return a},
gT:function(){return this.gaA().e},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
z=new F.pG(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
wu:[function(a,b,c){var z,y
z=R.b1(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.r,0,$.$get$cr())
y=z.y
a.gfI().q(0,z)
return U.dt(c,[z],"{rock|cavern} floor",b,P.ad([1,new O.tO(y),5,new O.tP(y),9,new O.tQ(y),12,new O.tR(y),17,new O.tS(y)]))},"$3","vH",6,0,10],
wv:[function(a,b,c){var z,y,x,w,v
z=$.$get$hI()
y=z.am(999999)
x=P.aY(C.p,null)
w=$.$get$cr()
v=[R.b1(1000+y,"orc",O.dd(),null,null,new G.b7("sword",1,1,!1,!0,!1,x),null,0,2,0,!1,2,!1,C.r,0,w),R.b1(1000+z.am(999999),"goblin",O.dd(),null,null,new G.b7("scimitar",1,1,!1,!0,!1,P.aY(C.p,null)),null,0,1,0,!1,1,!1,C.r,0,w)]
a.gfI().ax(0,v)
return U.dt(c,v,"{rock|cavern} floor",b,P.aL())},"$3","iF",6,0,10],
ww:[function(a,b,c){var z,y,x
z=a.bq("talk_to_briana_3")?"guardian":"orc"
y=R.b1(6667,z,null,null,null,new G.b7("rusty sword",1,1,!1,!0,!1,P.aY(C.p,null)),null,0,3,100,!1,3,!1,C.r,0,$.$get$cr())
x=y.y
a.a.q(0,y)
return U.dt(c,[y],"{rock|cavern} floor",b,P.ad([1,new O.tU(x),9,new O.tV(x)]))},"$3","vI",6,0,10],
bv:function(a){return a.a.bz(0,new O.tX())},
tZ:function(a){return a.a0(O.bv(a).gi(),new O.u_())},
u0:function(a,b){a.a0(O.bv(a).gi(),new O.u1(b))},
eu:function(a){var z=a.f
if(H.M(z.length!==0?C.a.gw(z):null,"$isV").c===!0)return!1
return C.a.a3(C.a0,H.M(z.length!==0?C.a.gw(z):null,"$isV").a)},
ii:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gZ(z),x=new H.bN(y,new O.ud(),[H.m(z,0)]);x.t();){w=y.gG()
if(!w.gb8()){v=H.M(w.e,"$isb7")
y=b
x=v.c
u=v.d
v.r
t=P.O(C.p,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.X(w.y)
r=s.a_(new O.ue(new G.b7(y,x,u,!0,!0,!1,t)))
z.a1(0,s)
z.q(0,r)
break}}},
ex:function(a,b){var z,y,x
z=H.M(a.c,"$iscI").b
if(z>=5)return
b.D(0,C.a1[z],!0)
y=H.M(a.c,"$iscI")
y.toString
x=new M.e6(null,!1,0,0)
x.m(y)
a.c=new O.uq().$1(x).p()},
ey:function(a,b,c,d){b.a0(a.gi(),new O.uv())
if(!d)c.q(0,"TODO: create fight")},
tO:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.X(z)
x=new G.b7("scimitar",1,1,!1,!0,!1,P.aY(C.p,null))
y.ac(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ad(b,"<subject> draw<s> <subject's> <object>",x)
a.a0(z,new O.tN(x))
y.hq(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.bv(a),!0)}},
tN:{"^":"a:0;a",
$1:function(a){a.sW(this.a)
return a}},
tP:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).ac(b,"<subject> spit<s> on the cavern floor")}},
tQ:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
b.fN()
z.dH(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.D(0,"\n\n",!0)}},
tR:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
z.ac(b,"<subject> grit<s> <subject's> teeth")
z.an(b,"<subject> do<es>n't talk any more",!0)}},
tS:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).ac(b,"<subject> scowl<s> with pure hatred")}},
tU:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).hq(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.bv(a),!0)}},
tV:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
b.fN()
z.dH(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.D(0,"\n\n",!0)}},
tX:{"^":"a:0;",
$1:function(a){return a.gH()}},
u_:{"^":"a:0;",
$1:function(a){a.gaW().q(0,new Z.cZ("spear",0,1,!1,!1,!1,P.aY(C.a_,null)))
return a}},
u1:{"^":"a:0;a",
$1:function(a){var z=a.gbe()
if(typeof z!=="number")return z.ag()
a.sbe(z+this.a)
return a}},
ud:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),$.$get$ev())}},
ue:{"^":"a:0;a",
$1:function(a){a.sW(this.a)
return a}},
uq:{"^":"a:0;",
$1:function(a){var z
a.gcu()
z=a.c
a.gcu()
a.c=z+1
return a}},
uv:{"^":"a:0;",
$1:function(a){a.sao(new E.bk("shield",P.aY(C.Z,null)))
return a}}}],["","",,V,{"^":"",
ln:function(){var z=new V.du(null,null,null)
new V.tf().$1(z)
return z.p()},
rQ:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rR:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rO:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
rP:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The corpse lies still, getting cold.\n",!0)
O.ex(b,c)
c.D(0,"",!0)}},
nX:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"cave_with_agruth"))return!1
if(b.bq(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)",!0)
O.u0(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gL:function(){return!1}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n"We must stop this." \n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection."\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. You know  I survived 3 years even though  none other made it for more than a few months. I think he wants me for something."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not giving it to him. Giving him the exact opposite of what he wants."\n\n\nWith that, you sheathe (weapon) and start down the road towards the black fort in the distance.\n',!0)}},
rN:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rJ:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The crevice is small.\n",!0)}},
rK:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rH:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
rI:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)
if(b.bq("guardpost_above_church_take_shield")&&!b.ja("guardpost_above_church_take_shield"))c.q(0,"The goblin's corpse is sprawled on the ground.")
else c.q(0,"The goblin is sleeping soundly.")
c.D(0,"",!0)}},
lm:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"guardpost_above_church"))return!1
if(b.dJ(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.D(0,"TODO - take without waking the guard",!0)
O.ey(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gO",6,0,2],
R:[function(a,b,c){c.D(0,"TODO - start taking, guard is beginning to wake. You have to stay in an uncomfortable position for a minute before continuing",!0)
C.a.q(b.f,V.ln())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gN",6,0,2],
J:function(a,b){return 0.8},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"TODO"},
gL:function(){return!1}},
f4:{"^":"a9;",
gbM:function(){return[new A.fQ(new V.lp(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat.","guardpost_above_church_take_shield_rescue",!0,null),new A.fQ(new V.lq(),"Snag the shield","TODO","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
av:function(){var z=new V.du(null,null,null)
z.m(this)
new V.lr().$1(z)
return z.p()},
aR:function(a,b){if(a!==0)return
return b.a.bz(0,new V.ls())},
aY:function(a,b){return[a.bz(0,new V.lt())]}},
tf:{"^":"a:0;",
$1:function(a){var z=$.$get$a4().am(1073741823)
a.gbL().b=z
a.gbL().c=0
return a}},
lp:{"^":"a:26;",
$4:function(a,b,c,d){J.eG(c,"TODO - staying still, drops of sweat dripping on the guard, but ultimately the guard goes back to sleep and you take the shield",!0)
b.a0(a.gi(),new V.lo())
O.ey(a,b,c,!0)
b.aF()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lo:{"^":"a:0;",
$1:function(a){var z=a.gbe()
if(typeof z!=="number")return z.ar()
a.sbe(z-1)
return a}},
lq:{"^":"a:26;",
$4:function(a,b,c,d){J.eG(c,"TODO",!0)
O.ey(a,b,c,!1)
b.aF()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snag the shield)"}},
lr:{"^":"a:0;",
$1:function(a){var z=a.gbL().c
if(typeof z!=="number")return z.ag()
a.gbL().c=z+1
return a}},
ls:{"^":"a:0;",
$1:function(a){return a.gH()}},
lt:{"^":"a:0;",
$1:function(a){return a.gH()}},
rF:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. The fear has gone during the short battle but the anger remains. She kicks the dead slaver in the hip. When she notices you looking at her, she looks back. "What?" she says flatly.\n\n\nShe spits on the body and turns the attention to the sword. "You know, we should name the weapon\u2014it\'s the only thing we have going for us right now. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name. "That creature does not deserve another mention."\n',!0)}},
rG:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
mi:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.D(0,'You look at the sword. "You\'re right. We\'ll call it Luck Bringer. It\'s our only chance to get out of this hell."\n\n\nBriana nods. "Luck Bringer it is."',!0)
O.ii(b,"Luck Bringer")
b.at("RoomRoamingSituation").dC(b,O.bv(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
mj:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.D(0,'You look at the sword. "You\'re right. We\'ll call it Savior. It is our first step to freedom."\n\n\nBriana nods. "Savior it is."',!0)
O.ii(b,"Savior")
b.at("RoomRoamingSituation").dC(b,O.bv(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
mh:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.D(0,"\"That's foolish. It's just a sword, after all.\"\n\n\nBriana shrugs. \"Whatever, just don't ever call it Agruth's. I already have more respect to the piece of iron than to that worthless animal over here.\"",!0)
b.at("RoomRoamingSituation").dC(b,O.bv(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rE:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO\n",!0)}},
rB:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
rC:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
oY:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"orcthorn_room"))return!1
if(b.bq("talk_to_briana_3"))if(!b.bq(this.d))z=H.M(z.length!==0?C.a.gw(z):null,"$isV").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
S:[function(a,b,c){c.D(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."',!0)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
ry:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO\n",!0)}},
rz:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO\n",!0)}},
o9:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"slave_quarters"))return!1
return!0},
S:[function(a,b,c){c.D(0,"TODO FIGHT",!0)
b.aF()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rw:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rx:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The small door is TODO open/close.\n",!0)}},
ru:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These is the smelter.\n\n\nOrc teams tilt huge kettles of molten steel into troughs that lead the white-hot liquid across the room, into a large pool. From that pool, a single orc is distributing the forge-ready steel into troughs that lead to the war forges below. He's no more than a spear's throw away from you, but doesn't notice. In fact, he may well be blind. The other orcs are two far away and too busy to look around.\n\n\nA small crevice appears to be sucking the hot air. TODO describe  other exits\n",!0)}},
rv:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n",!0)}},
rs:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rt:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
p_:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){if(!(b.dJ(this.d)==null&&O.eu(b)))return!1
return!0},
S:[function(a,b,c){c.D(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p0:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){if(!(b.bq("talk_to_briana_1")&&b.dJ(this.d)==null&&O.eu(b)))return!1
return!0},
S:[function(a,b,c){c.D(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p1:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){if(!(b.bq("talk_to_briana_2")&&b.dJ(this.d)==null&&O.eu(b)))return!1
return!0},
S:[function(a,b,c){c.D(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rq:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rr:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
th:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\nAfter a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The Underground Church stands silent, as if holding breath.\n",!0)
O.ex(b,c)
c.D(0,"",!0)}},
kW:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"underground_church"))return!1
if(b.bq(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\nBriana: "So this is it? This is where the Dead Prince resides?"\n\n\n"This is one of many of these temples inside the mountain. So I think not."\n\n\n"So where is he? Everyone knows he\'s from Mt. Bloodrock."\n\n\n"The Dead Prince is _somewhere_ here, that\'s correct. But where exactly? The orcs say the whole mountain is his vessel. Whatever that means."\n\n\nThe glow coming from the altar dims for a moment, then lights up again.',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rL:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'TODO - altar, "you are brave, my friend. Or stupid. So am I for following you." , eight black eyes, spear that some goblin must have forgotten here, there is motion behind the altar (wait)\n',!0)}},
rW:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The altar glows with a dim red light that reflect in the eight black eyes above it.\n",!0)}},
pg:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"underground_church_altar"))return!1
if(b.bq(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,'TODO - build up with sounds\n\n\nA lich orc enters from a steel door on the right of the altar and the whole temple sounds a tone that is powerful and sickening at the same time. After the lich, a huge creature enters through the door, crouching below the door\'s frame. It\'s unclear what it is, but perhaps some large breed of ogre, and judging by the braided hair, a female. Her sword is as long as you are tall, but she doesn\'t wield it. She leads someone on a chain. An orc. Despite being a strong one, probably captain or even chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nTODO: the lich will take him on the altar. Aren says \'maggots\', somehow he knows. From underneath the altar, a large horde of maggots appears. The orc tries to escape, horrified, but the ogre pin him. The maggots crawl all over the orc, and as he screams, the church reacts with tones. The lich raises his hands as if in offering. Somehow, Aren find the whole experience invigorating (+2 stamina). Once the orc is dead, rychl\xfd process. Ogre drag the body. Leave. Briana : "how did you know it will be maggots?". Aren : "I\'ll explain when we get out of here." Briana : "And if it was meant to be an offering, why did they not leave the body?" Aren : "that I don\'t know"',!0)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
oZ:{"^":"af;Y:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"underground_church_altar"))return!1
if(b.bq(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,"TODO - a forgotten, orcish spear",!0)
O.tZ(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ae:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rp:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO: first impression, clangs, shouts, heaving carts of steel\n\n\nFrom above, troughs of molten steel descend into all parts of the room like huge fiery tentacles. At the end of each, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. \n\n\nYou and Briana duck behind some carts. You can guess which corridor leads to the smelter. Hot air is flowing into the forge through it, stirring the smoke. It's up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n",!0)}},
rA:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The air in the war forges is heavy and the noise overwhelming.\n",!0)
O.ex(b,c)
c.D(0,"",!0)}},
px:{"^":"f4;i:a<,T:b<",
a_:function(a){var z=new V.du(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f4))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
du:{"^":"d;a,b,c",
gi:function(){return this.gbL().b},
gT:function(){return this.gbL().c},
gbL:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbL().b
x=this.gbL().c
z=new V.px(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
wt:[function(a){var z,y
z=$.$get$dh()
y=z.B
if(y.length>0){y+=" "
z.B=y}z.B=y+a},"$1","ut",2,0,15],
wx:[function(a){$.es=a},"$1","uu",2,0,15],
hY:[function(a,b,c,d,e,f,g){var z=L.eU(a,!1,!1,d,e,f,g)
$.$get$bU().q(0,z)
return z},function(a){return O.hY(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hY(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","us",2,13,51,0,0,0,1,1,0],
ny:{"^":"nK;",
by:function(){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$by=P.aw(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cj){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.oj()
m.toString
l=new A.v(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.F(0,$.q,null,[null]).bA(!0)}if(t.r){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.E())
t.r=!1
m=t.Q
m.toString
n=new A.v(60,null,null,null,null)
n.b=t.f.cs(0)
m.a.F(n.E())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.E())
w=7
z=10
return P.av(t.cD(),$async$by)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.B(j)
if(n instanceof M.cA){r=n
q=H.C(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.v(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.E())
z=1
break}else{p=n
o=H.C(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.v(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.F(l.E())
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
n.a.F(m.E())
case 1:return P.aD(x,y)
case 2:return P.aC(v,y)}})
return P.aE($async$by,y)},
eS:function(){var z,y
this.fq()
this.f.b7(0)
this.r=!0
this.e=this.c
z=this.Q
Z.ho(Z.bL())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bL()
z.a.F(y.E())
this.by()},
lb:[function(a){var z,y
z={}
z.a=null
y=$.$get$bU()
y.V(0,new O.nV(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iS(z)
this.by()},"$1","giD",2,0,32],
iS:function(a){var z
if(a.gfZ()!=null){z=a.r
$.$get$cp().az(z)}z=a.x
if(z!=null)this.en(z)},
cD:function(){var z=0,y=P.az(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cD=P.aw(function(a,a0){if(a===1)return P.aC(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cq()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.v(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dG()
r=v.Q
q=p.gjq()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.F(0,$.q,null,[null])
r.bA(null)
r.c1(new O.nL(v))
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
break}o=!!J.o(r[o]).$isL
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.v(667,null,null,null,null)
k.c=r
o.a.F(k.E())
k=$.$get$bU()
k.iA(new O.nM(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.y(k,"b5",0)
o=P.O(new H.J(k,new O.nN(u,l),[o]),!0,o)
r=k.a
H.p([],[L.a6])
j=new L.eV(r,o)
if(!j.gU(j)){u=v.Q
r=u.e
if(r!=null){r.du(new D.c_("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.ck(new P.F(0,$.q,null,[r]),[r])
r=j.dM()
u.a.F(r.E())
u=u.e.a.c1(v.giD())
i=new O.nO(v)
r=H.m(u,0)
q=$.q
if(q!==C.h){i=P.el(i,q)
q.toString}u.df(new P.ed(null,new P.F(0,q,null,[r]),6,new O.nP(),i,[r,r]))
x=!0
z=1
break}else{h=k.bj(0,new O.nQ(),new O.nR())
if(h!=null){if(h.gfZ()!=null){r=h.r
$.$get$cp().az(r)}r=h.x
if(r!=null)v.en(r)
k.a1(0,h)}}}r=$.$get$cp()
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
return P.av(v.cE(f),$async$cD)
case 5:x=a0
z=1
break
case 4:r=$.es
if(r!=null){v.en(r)
$.es=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gay().length-1
v.x=r}else if($.hK)$.hK=!1
else{++r
v.x=r}u.a=r===v.e.gay().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gay().length){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="End of book."
u.a.F(r.E())
r=v.Q
u=v.e5()
r.toString
u=u.eV(50)
r.a.F(u.E())
v.Q.a.F(new A.v(80,null,null,null,null).E())
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
r=P.a_
u.f=new P.ck(new P.F(0,$.q,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c1(new O.nS(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.o(r[q]).$isL?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.F(q.E())
try{r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jo(r[q])}catch(b){u=H.B(b)
if(u instanceof M.cA){t=u
s=H.C(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.v(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.F(q.E())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="- choices added"
r.a.F(q.E())
if(k.bU(0,new O.nT(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.e5()
r.toString
u=u.eV(50)
r.a.F(u.E())
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
r={func:1,ret:[P.P,P.as]}
z=H.ax(q,r)?12:14
break
case 12:d=v.x===v.e.gay().length-1?v.e5():null
q=v.e.gay()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.av(v.cE(H.i5(q[o],r)),$async$cD)
case 15:c=a0
if(k.bU(0,new O.nU(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=d.eV(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gay()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.x("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aD(x,y)}})
return P.aE($async$cD,y)},
en:function(a){var z,y,x,w,v
z=$.$get$cE()
if(z.b.test(H.bt(a))){y=this.d
if(y==null)throw H.c(new P.x("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.ar()
w=z-1}else{x=this.b.dS(a,this.e.gdU())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a3(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghA()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghA()
else z=!1}else z=!1
$.hH=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.F(v.E())
v=this.e
this.d=new O.nz(v,this.x)
this.e=x
this.x=w
v.e=J.an(v.gdN(),1)},
fq:function(){var z,y,x,w,v,u
this.x=null
$.$get$cp().b7(0)
$.$get$bU().sl(0,0)
$.r5=null
x=$.$get$cu()
x.b7(0)
w=$.$get$cq()
x.n(0,"points",w)
w.a=0
w.b.b7(0)
this.b.js()
$.ie=!0
try{this.kb()}catch(v){z=H.B(v)
y=H.C(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hi()
$.ie=!1},
cE:function(a){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cE=P.aw(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dh()
q.B=""
w=4
z=7
return P.av(a.$0(),$async$cE)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.B(m)
r=H.C(m)
q.B+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cA(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.B.length!==0){t.Q.f2(J.h(q)).c1(new O.nW(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aD(x,y)
case 2:return P.aC(v,y)}})
return P.aE($async$cE,y)},
iK:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cE().b.test(H.bt(z)))return!1
y=this.b.dS(z,this.e.gdU())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl2()
return!1},"$1","gfv",2,0,33],
e5:function(){var z,y,x,w,v,u
this.hi()
try{x=this.e.gh()
w=$.$get$cu()
x=new Z.fL(x,this.b.jN(),null,null,null,null)
x.c=H.aH(Z.cX(w),"$isG",[P.r,P.d],"$asG")
x.f=Date.now()
x.e=C.e.l_(H.aA(x),16)
return x}catch(v){z=H.B(v)
y=H.C(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
h8:function(a,b){var z,y,x
this.fq()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dv("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.E())
z.k8(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.E())
this.f.ax(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.E())
y=$.$get$cu()
Z.nv(a,y,P.dF(P.r,P.bB))
this.cx=H.M(y.j(0,"game"),"$isf_")
this.cy=H.aH(y.j(0,"hitpoints"),"$isat",[P.aS],"$asat")
z=[P.t]
this.db=H.aH(y.j(0,"stamina"),"$isat",z,"$asat")
this.dx=H.aH(y.j(0,"gold"),"$isat",z,"$asat")
z=this.Q
Z.ho(Z.bL())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bL()
z.a.F(y.E())
y=this.Q
y.toString
z=new A.v(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.E())
this.by()},
ks:function(a){return this.h8(a,null)},
dW:[function(a,b,c,d){var z=0,y=P.az(),x,w=this,v,u,t
var $async$dW=P.aw(function(e,f){if(e===1)return P.aC(f,y)
while(true)switch(z){case 0:v=$.$get$dh()
if(v.B.length!==0){w.Q.f2(J.h(v))
v.B=""}v=w.Q
v.toString
u=new A.v(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.ch
t=new P.F(0,$.q,null,[u])
v.x=new P.ck(t,[u])
x=t
z=1
break
case 1:return P.aD(x,y)}})
return P.aE($async$dW,y)},function(a,b){return this.dW(a,b,null,!1)},"l7","$4$rerollEffectDescription$rerollable","$2","ghV",4,5,44,1,0]},
nV:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf3(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cE().b.test(H.bt(z))?y.d.a:y.b.dS(z,y.e.gdU())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
nL:{"^":"a:0;a",
$1:function(a){return this.a.by()}},
nM:{"^":"a:0;a",
$1:function(a){return a.gf3()||this.a.iK(a)}},
nN:{"^":"a:35;a,b",
$1:function(a){return a.ki(this.b,this.a.a)}},
nO:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
nP:{"^":"a:0;",
$1:function(a){return a instanceof D.c_}},
nQ:{"^":"a:0;",
$1:function(a){return a.gkj()}},
nR:{"^":"a:1;",
$0:function(){return}},
nS:{"^":"a:0;a",
$1:function(a){return this.a.by()}},
nT:{"^":"a:0;a,b",
$1:function(a){return a.dz(!0,this.a.a,this.b.gfv())}},
nU:{"^":"a:0;a,b",
$1:function(a){return a.dz(!0,this.a.a,this.b.gfv())}},
nW:{"^":"a:0;a",
$1:function(a){return this.a.by()}},
mU:{"^":"d;a,b,fT:c<",
je:function(a,b,c){var z
if(!$.hH){z=J.an(this.a,b)
this.a=z
this.b.az(new A.cS(b,z,c))}},
q:function(a,b){return this.je(a,b,null)},
ag:function(a,b){this.q(0,b)
return this},
E:function(){return P.ad(["points",this.a])},
hz:function(a){this.a=a.j(0,"points")
this.b.b7(0)},
i5:function(){this.b=P.b6(null,A.cS)},
$ise0:1},
cY:{"^":"mD;ay:d<,dN:e@,a,b,c",
ghA:function(){return J.a5(this.e,0)}},
nz:{"^":"d;a,b"},
nG:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dS:function(a,b){var z
if(b!=null&&this.a.a9(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a9(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jN:function(){var z=new H.Q(0,null,null,null,null,null,0,[P.r,null])
this.a.V(0,new O.nI(z))
return z},
k8:function(a){a.V(0,new O.nJ(this))},
js:function(){this.a.V(0,new O.nH())}},
nI:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.ad(["visitCount",b.gdN()]))}},
nJ:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.a9(a))z.j(0,a).sdN(J.ay(b,"visitCount"))}},
nH:{"^":"a:6;",
$2:function(a,b){b.sdN(0)}}}],["","",,M,{"^":"",cA:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eO:function(a){return new M.cA(a,null,null)}}}}],["","",,M,{"^":"",nK:{"^":"d;"}}],["","",,Z,{"^":"",fL:{"^":"d;a,b,c,d,e,f",
eV:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dL()
return z},
dL:function(){var z,y
z=new H.Q(0,null,null,null,null,null,0,[P.r,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.fX(z)},
k:function(a){return this.dL()},
v:{
fM:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isL||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise0},
cX:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fM(z.j(a,x)))y.push(Z.cX(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.Q(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.nu(a,w))
return w}else if(!!z.$ise0){v=a.E()
v.n(0,"_class",a.gfT())
return Z.cX(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cW:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cW(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a9("_class")){v=new H.Q(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.nt(b,v))
return v}else if(w&&a.a9("_class"))if(c!=null){c.hz(a)
return c}else{u=z.j(a,"_class")
if(!b.a9(u))throw H.c(new Z.dv("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nv:function(a,b,c){a.c.V(0,new Z.nw(b,c))}}},nu:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fM(this.a.j(0,a)))this.b.n(0,a,Z.cX(b))}},nt:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.cW(b,this.a,null))}},nw:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cW(b,x,null))
else z.n(0,a,Z.cW(b,x,y))}},dv:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lB:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",n_:{"^":"d;"},mZ:{"^":"n_;"},lJ:{"^":"mZ;a,b,c,d,e,f,r,x",
lf:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.r
n=[o,P.d]
H.aH(a,"$isG",n,"$asG")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.a9("strContent"))m.c=a.j(0,"strContent")
if(a.a9("listContent"))m.b=a.j(0,"listContent")
if(a.a9("intContent"))m.d=a.j(0,"intContent")
if(a.a9("mapContent"))m.e=H.aH(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghw()){case 1070:o=this.e
if(o!=null){o.du(new D.c_("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.br()
o.b.br()
return
case 1000:o=new A.v(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.E())
n.F(new A.v(10,null,this.c.ch,null,null).E())
return
case 1050:l=z.gkc()
this.e.bV(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.E())
o=z.gku()
if(!o.a9("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cw())
n.bQ(new G.k7(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.E())
k=J.ay(z.geM(),0)
j=J.ay(z.geM(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bV(new U.ch(C.C[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.du(new D.c_("Book Restart before choice was selected."))
this.e=null}try{this.c.eS()}catch(i){y=H.B(i)
x=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.v(90,null,null,null,null)
o.b=Z.bL()
n.F(o.E())
n.F(new A.cS(0,0,null).dM().E())
return
case 1020:h=new A.v(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.du(new D.c_("Book Load before choice was selected."))
this.e=null}try{h=z.ghZ()
f=new Z.fL(null,null,null,null,null,null)
e=H.aH(C.w.jz(h),"$isG",n,"$asG")
if(!e.a9("currentPageName")||!e.a9("vars"))H.i(new Z.lB("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aH(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aH(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a9("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aH(J.iQ(z.geM()),"$isbI",[o],"$asbI")
o=this.c
if(v!=null)o.h8(w,v)
else o.ks(w)}catch(i){o=H.B(i)
if(o instanceof Z.dv){u=o
t=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eS()}else{s=o
r=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eS()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bL()
g.F(o.E())}catch(i){q=H.B(i)
p=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cS(0,$.$get$cq().a,null).dM().E())
return
case 1090:this.f.bV(!0)
this.f=null
return
case 1040:this.c.by()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghw())+"."
this.a.F(o.E())}},"$1","giQ",2,0,22],
f2:function(a){var z=P.a_
this.f=new P.ck(new P.F(0,$.q,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c_:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",k7:{"^":"d;a",
E:function(){return P.cb(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;hw:a<,eM:b<,hZ:c<,kc:d<,ku:e<",
gl1:function(){var z=this.a
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
dL:function(){return C.w.fX(this.E())},
E:function(){var z,y
z=new H.Q(0,null,null,null,null,null,0,[P.r,P.d])
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
z="Message "+this.gl1()
y=this.a
x=J.o(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mD:{"^":"d;h:a@,l2:b<",
k:function(a){return this.a},
gdU:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iL(z,": ")
if(y>0)return J.iP(this.a,0,y)
else return}}}],["","",,A,{"^":"",cS:{"^":"d;jq:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dM:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a6:{"^":"d;f3:a@,b,c,d,b_:e<,K:f<,fZ:r<,x,y",
gkj:function(){return this.e.length===0},
dz:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
ki:function(a,b){return this.dz(a,b,null)},
kY:function(){return P.ad(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c1:function(a){this.r=a
return this},
bB:function(a,b){return C.b.bB(this.e,b.gb_())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i2:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bc(a).eW(a)
this.d=C.b.gA(a)
this.r=f
this.b=!1
this.c=!1},
$isU:1,
$asU:function(){return[L.a6]},
v:{
eU:function(a,b,c,d,e,f,g){var z=new L.a6(!1,null,null,null,null,e,null,d,g)
z.i2(a,!1,!1,d,e,f,g)
return z}}},eV:{"^":"fk;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
jo:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.ay(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbB}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.B(u)
v=M.eO(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.P,P.as]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.ay(y,"string")!=null&&!!J.o(J.ay(y,"string")).$isbB)try{x=J.ay(y,"string").$0()}catch(u){w=H.B(u)
v=M.eO(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.ay(y,"goto")
p=H.i5(J.ay(y,"script"),t)
o=new L.a6(!1,null,null,null,null,null,null,q,J.ay(y,"submenu"))
if(r==null)H.i(P.E("String given to choice cannot be null."))
o.e=J.bc(r).eW(r)
o.d=C.b.gA(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
jk:function(a,b,c,d,e,f,g){if(b instanceof L.a6)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eU(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.jk(a,b,!1,!1,null,null,null)},
kZ:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.O(new H.J(z,new L.jM(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.V(x,new L.jN(w))
return w},
dM:function(){return this.kZ(null,null,null,null)},
k:function(a){var z=this.b
return new H.ap(z,new L.jO(),[H.m(z,0),null]).ci(0,", ")},
$asfk:function(){return[L.a6]},
$asft:function(){return[L.a6]},
$asL:function(){return[L.a6]},
$asX:function(){return[L.a6]}},jM:{"^":"a:0;a,b,c",
$1:function(a){return a.dz(this.b,this.a,this.c)}},jN:{"^":"a:0;a",
$1:function(a){H.b(a)
J.di(this.a.b,a.kY())
a.a=!0}},jO:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d_:{"^":"d;dc:a<,b_:b<",
E:function(){return P.ad(["show",this.a,"string",this.b])}},og:{"^":"d;a",
E:function(){var z=new H.Q(0,null,null,null,null,null,0,[P.r,P.d])
this.a.V(0,new Z.oh(z))
return z},
V:function(a,b){this.a.V(0,b)}},oh:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hn:{"^":"d;h:a@,aN:b<,fU:c<,dF:d<,dc:e<,hc:f<,b_:r<",v:{
ho:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hn])
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
z[w]=new Z.hn(s,r,q,p,o,n,t);++w}C.a.c9(z,new Z.pd())
return z}}},pd:{"^":"a:6;",
$2:function(a,b){return J.bx(b.gdF(),a.gdF())}},at:{"^":"d;h:a<,aN:b<,c,fU:d<,dF:e<,f,r,hc:x<,fR:y@,fT:z<,$ti",
gab:function(){return this.f},
sab:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cj=!0}},
gdc:function(){return this.r},
gb_:function(){return this.c.$1(this.f)},
E:function(){return P.ad(["name",this.a,"value",this.f,"show",this.r])},
hz:function(a){var z
this.sab(H.iv(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cj=!0}},
$ise0:1,
v:{
bK:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d0()
y=z.a9(a)?H.aH(z.j(0,a),"$isat",[h],"$asat"):new Z.at(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iv(e,h)
y.r=!0
z.n(0,a,y)
return y},
oj:function(){var z,y
z=new Z.og(new H.Q(0,null,null,null,null,null,0,[P.r,Z.d_]))
y=$.$get$d0().gct()
new H.J(y,new Z.ok(),[H.y(y,"z",0)]).V(0,new Z.ol(z))
$.cj=!1
return z},
bL:function(){var z=H.p([],[[P.G,P.r,P.d]])
$.$get$d0().gct().V(0,new Z.oi(z))
return z}}},ok:{"^":"a:0;",
$1:function(a){return a.gfR()}},ol:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gdc()
y=a.gb_()
a.sfR(!1)
this.a.a.n(0,a.a,new Z.d_(z,y))}},oi:{"^":"a:25;a",
$1:function(a){var z=new H.Q(0,null,null,null,null,null,0,[P.r,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaN())
z.n(0,"color",a.gfU())
z.n(0,"priority",a.gdF())
z.n(0,"show",a.gdc())
z.n(0,"notifyOnChange",a.ghc())
z.n(0,"string",a.gb_())
this.a.push(z)}}}],["","",,N,{"^":"",dH:{"^":"d;h:a<,b,c,iq:d<,e,f",
gh0:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh0()+"."+x},
geL:function(){if($.id){var z=this.b
if(z!=null)return z.geL()}return $.rc},
kt:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geL().b){if(!!J.o(b).$isbB)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.up.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.B(u)
y=H.C(u)
d=y
if(c==null)c=z}e=$.q
x=b
w=this.gh0()
t=c
s=d
r=Date.now()
q=$.fl
$.fl=q+1
p=new N.m9(a,x,v,w,new P.cH(r,!1),q,t,s,e)
if($.id)for(o=this;o!=null;){o.fB(p)
o=o.b}else $.$get$fn().fB(p)}},
ck:function(a,b,c,d){return this.kt(a,b,c,d,null)},
jT:function(a,b,c){return this.ck(C.T,a,b,c)},
ai:function(a){return this.jT(a,null,null)},
jS:function(a,b,c){return this.ck(C.S,a,b,c)},
bi:function(a){return this.jS(a,null,null)},
jR:function(a,b,c){return this.ck(C.U,a,b,c)},
bN:function(a){return this.jR(a,null,null)},
ka:function(a,b,c){return this.ck(C.B,a,b,c)},
h6:function(a){return this.ka(a,null,null)},
l3:function(a,b,c){return this.ck(C.X,a,b,c)},
eX:function(a){return this.l3(a,null,null)},
hU:function(a,b,c){return this.ck(C.W,a,b,c)},
dV:function(a){return this.hU(a,null,null)},
fB:function(a){},
v:{
bg:function(a){return $.$get$fm().kG(a,new N.rX(a))}}},rX:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dd(z,"."))H.i(P.E("name shouldn't start with a '.'"))
y=C.b.kq(z,".")
if(y===-1)x=z!==""?N.bg(""):null
else{x=N.bg(C.b.aG(z,0,y))
z=C.b.bI(z,y+1)}w=new H.Q(0,null,null,null,null,null,0,[P.r,N.dH])
w=new N.dH(z,x,null,w,new P.hq(w,[null,null]),null)
if(x!=null)x.giq().n(0,z,w)
return w}},aW:{"^":"d;h:a<,ab:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aW&&this.b===b.b},
aS:function(a,b){return C.e.aS(this.b,b.gab())},
d6:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b<=z},
bd:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b>z},
bP:function(a,b){return this.b>=b.gab()},
bB:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b-z},
gA:function(a){return this.b},
k:function(a){return this.a},
$isU:1,
$asU:function(){return[N.aW]}},m9:{"^":"d;eL:a<,b,aP:c<,d,T:e<,f,bs:r<,bo:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bw:function(a){return X.d8(J.iI(a,0,new X.u2()))},
b_:function(a,b){var z=J.an(a,b)
if(typeof z!=="number")return H.w(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d8:function(a){if(typeof a!=="number")return H.w(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
u2:{"^":"a:6;",
$2:function(a,b){return X.b_(a,J.j(b))}},
dQ:{"^":"c6;a,$ti",
gab:function(){var z=this.a
if(z==null)throw H.c(new P.x("value called on absent Optional."))
return z},
b9:function(a){var z=this.a
return z==null?a:z},
gZ:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bd(z,1,0,null,[H.m(z,0)])}else z=C.I
return z},
gA:function(a){return J.j(this.a)},
u:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dQ){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
i4:function(a,b){if(this.a==null)throw H.c(P.E("Must not be null."))},
v:{
fx:function(a,b){var z=new X.dQ(a,[b])
z.i4(a,b)
return z}}}}],["","",,U,{"^":"",cV:{"^":"d;a,b",
k:function(a){return this.b}},ch:{"^":"d;a,l4:b<",
geI:function(){return this.a===C.E},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.ch&&b.a===this.a&&J.e(b.b,this.b)},
gA:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
wy:[function(a,b){var z,y,x,w,v
z=new D.lJ(b,null,null,null,null,null,null,null)
y=$.fI
$.fI=y+1
x=new H.cf(y,null,!1)
w=init.globalState.d
w.e_(y,x)
w.cK()
w=new H.nf(x,null)
w.i6(x)
z.b=w
w=w.b
w.toString
new P.d2(w,[H.m(w,0)]).aC(z.giQ(),null,null,null)
b.F(new H.cn(z.b.a,init.globalState.d.a))
v=N.nB()
z.c=v
v.Q=z},"$2","i0",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fb.prototype
return J.fa.prototype}if(typeof a=="string")return J.ca.prototype
if(a==null)return J.fc.prototype
if(typeof a=="boolean")return J.f9.prototype
if(a.constructor==Array)return J.c8.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.aG=function(a){if(a==null)return a
if(a.constructor==Array)return J.c8.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.I=function(a){if(typeof a=="string")return J.ca.prototype
if(a==null)return a
if(a.constructor==Array)return J.c8.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.al=function(a){if(typeof a=="number")return J.c9.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.er=function(a){if(typeof a=="number")return J.c9.prototype
if(typeof a=="string")return J.ca.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.bc=function(a){if(typeof a=="string")return J.ca.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.an=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.er(a).ag(a,b)}
J.b0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.al(a).d5(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).u(a,b)}
J.a5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.al(a).bd(a,b)}
J.bX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.al(a).aS(a,b)}
J.bY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.er(a).c6(a,b)}
J.iG=function(a){if(typeof a=="number")return-a
return J.al(a).f0(a)}
J.bx=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.al(a).ar(a,b)}
J.ay=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).j(a,b)}
J.di=function(a,b){return J.aG(a).q(a,b)}
J.iH=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aG(a).jd(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.eG=function(a,b,c){return J.aG(a).D(a,b,c)}
J.by=function(a,b){return J.er(a).bB(a,b)}
J.eH=function(a,b){return J.I(a).a3(a,b)}
J.eI=function(a,b){return J.aG(a).as(a,b)}
J.iI=function(a,b,c){return J.aG(a).bt(a,b,c)}
J.j=function(a){return J.o(a).gA(a)}
J.eJ=function(a){return J.I(a).gU(a)}
J.ah=function(a){return J.aG(a).gZ(a)}
J.iJ=function(a){return J.aG(a).gw(a)}
J.aI=function(a){return J.I(a).gl(a)}
J.iK=function(a){return J.o(a).gbx(a)}
J.iL=function(a,b){return J.I(a).aV(a,b)}
J.eK=function(a,b){return J.aG(a).aD(a,b)}
J.iM=function(a,b,c){return J.bc(a).h9(a,b,c)}
J.dj=function(a,b,c){return J.bc(a).kK(a,b,c)}
J.cv=function(a,b,c){return J.bc(a).cZ(a,b,c)}
J.iN=function(a){return J.al(a).hr(a)}
J.iO=function(a,b){return J.aG(a).dX(a,b)}
J.eL=function(a,b){return J.bc(a).dd(a,b)}
J.iP=function(a,b,c){return J.bc(a).aG(a,b,c)}
J.iQ=function(a){return J.aG(a).bF(a)}
J.h=function(a){return J.o(a).k(a)}
J.bZ=function(a,b){return J.al(a).bc(a,b)}
J.iR=function(a,b){return J.aG(a).c4(a,b)}
I.aT=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.L=J.aV.prototype
C.a=J.c8.prototype
C.M=J.f9.prototype
C.u=J.fa.prototype
C.e=J.fb.prototype
C.N=J.fc.prototype
C.j=J.c9.prototype
C.b=J.ca.prototype
C.F=new A.ao(0,0,0)
C.G=new A.ao(-1/0,-1/0,-1/0)
C.H=new A.cx(-10,0,100)
C.I=new H.kR([null])
C.J=new P.mC()
C.v=new P.q5()
C.K=new P.qo()
C.h=new P.qD()
C.x=new P.b3(0)
C.y=new U.cN(0,"ItemType.fist")
C.z=new U.cN(1,"ItemType.shield")
C.t=new U.cN(2,"ItemType.spear")
C.A=new U.cN(3,"ItemType.sword")
C.O=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.lO(null,null)
C.P=new P.lQ(null)
C.Q=new P.lR(null,null)
C.R=new O.lZ(0,"KnownToMode.all")
C.S=new N.aW("FINER",400)
C.T=new N.aW("FINEST",300)
C.U=new N.aW("FINE",500)
C.B=new N.aW("INFO",800)
C.V=new N.aW("OFF",2000)
C.W=new N.aW("SEVERE",1000)
C.X=new N.aW("WARNING",900)
C.E=new U.cV(0,"Result.success")
C.a6=new U.cV(1,"Result.failure")
C.a7=new U.cV(2,"Result.criticalSuccess")
C.a8=new U.cV(3,"Result.criticalFailure")
C.C=I.aT([C.E,C.a6,C.a7,C.a8])
C.Y=I.aT([C.y])
C.Z=I.aT([C.z])
C.a_=I.aT([C.t])
C.p=I.aT([C.A])
C.d=I.aT([])
C.a0=I.aT(["cave_with_agruth","guardpost_above_church","orcthorn_door","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a1=I.aT(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a2=new H.jX(0,{},C.d,[null,null])
C.a3=new X.dQ(null,[P.K])
C.k=new R.dT(0,"Pose.standing")
C.i=new R.dT(1,"Pose.offBalance")
C.f=new R.dT(2,"Pose.onGround")
C.m=new K.dU(0,"Predetermination.none")
C.q=new K.dU(1,"Predetermination.successGuaranteed")
C.n=new K.dU(2,"Predetermination.failureGuaranteed")
C.r=new Y.cc("he","him","his","himself")
C.l=new Y.cc("it","it","its","itself")
C.a4=new Y.cc("she","her","her","herself")
C.a5=new Y.cc("they","them","their","themselves")
C.D=new Y.cc("you","you","your","yourself")
C.c=new Q.nk(0,"Resource.stamina")
C.a9=H.ba("fd")
C.aa=H.ba("as")
C.ab=H.ba("r")
C.ac=H.ba("a_")
C.ad=H.ba("aS")
C.o=H.ba("dynamic")
C.ae=H.ba("t")
C.af=H.ba("K")
C.ag=new P.bO(null,2)
$.fI=1
$.fB="$cachedFunction"
$.fC="$cachedInvocation"
$.aJ=0
$.bz=null
$.eQ=null
$.bq=null
$.bR=null
$.bS=null
$.ej=!1
$.q=C.h
$.f2=0
$.es=null
$.hH=!1
$.r5=null
$.hK=!1
$.ie=!0
$.cj=!1
$.id=!1
$.up=C.V
$.rc=C.B
$.fl=0
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
I.$lazy(y,x,w)}})(["f6","$get$f6",function(){return H.lH()},"f7","$get$f7",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f2
$.f2=z+1
z="expando$key$"+z}return new P.kX(null,z,[P.t])},"hc","$get$hc",function(){return H.aM(H.d1({
toString:function(){return"$receiver$"}}))},"hd","$get$hd",function(){return H.aM(H.d1({$method$:null,
toString:function(){return"$receiver$"}}))},"he","$get$he",function(){return H.aM(H.d1(null))},"hf","$get$hf",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hj","$get$hj",function(){return H.aM(H.d1(void 0))},"hk","$get$hk",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hh","$get$hh",function(){return H.aM(H.hi(null))},"hg","$get$hg",function(){return H.aM(function(){try{null.$method$}catch(z){return z.message}}())},"hm","$get$hm",function(){return H.aM(H.hi(void 0))},"hl","$get$hl",function(){return H.aM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e8","$get$e8",function(){return P.pO()},"bf","$get$bf",function(){var z,y
z=P.as
y=new P.F(0,P.pq(),null,[z])
y.ie(null,z)
return y},"bT","$get$bT",function(){return[]},"dc","$get$dc",function(){return new K.c4("fist",P.aY(C.Y,null))},"bE","$get$bE",function(){return N.bg("PlannerRecommendation")},"i2","$get$i2",function(){return new K.ro()},"ep","$get$ep",function(){var z=$.$get$i2()
return K.Y("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a4","$get$a4",function(){return P.cU(null)},"bG","$get$bG",function(){return P.cU(null)},"ih","$get$ih",function(){return N.bg("Storyline")},"h_","$get$h_",function(){return P.bj("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cr","$get$cr",function(){return L.e7(new L.rV())},"aU","$get$aU",function(){return L.e7(new L.t0())},"ev","$get$ev",function(){return L.e7(new L.rU())},"dR","$get$dR",function(){return new F.mH("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"en","$get$en",function(){return Y.c2(!1,"balance",!0,C.l,$.$get$aU())},"il","$get$il",function(){return Y.c2(!1,"pounding",!1,C.l,$.$get$aU())},"fJ","$get$fJ",function(){return new B.ni("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fN","$get$fN",function(){return new O.nx(null,!1,!0,!1,null,null)},"fZ","$get$fZ",function(){return new Q.oc(null,!1,!0,!0,C.c,null)},"hp","$get$hp",function(){return new M.pe("",!0,C.c,!1,!0,null)},"hJ","$get$hJ",function(){return P.cU(null)},"eP","$get$eP",function(){return new Z.jp(!1,!0,!1,null,null)},"ix","$get$ix",function(){return Y.c2(!1,"swing",!0,C.l,$.$get$aU())},"iw","$get$iw",function(){return Y.c2(!1,"swing",!0,C.l,$.$get$aU())},"iy","$get$iy",function(){return Y.c2(!1,"swing",!0,C.l,$.$get$aU())},"fz","$get$fz",function(){return X.fx(0,P.K)},"fA","$get$fA",function(){return X.fx(1,P.K)},"fV","$get$fV",function(){return new D.oa(!1,!1,!0,null,null)},"hI","$get$hI",function(){return P.cU(null)},"hX","$get$hX",function(){return K.Y("cave_with_agruth_pre",new V.rQ(),new V.rR(),null,null,H.p([new Q.u("cave_with_agruth","","You look around.",null)],[Q.u]),"ground")},"hW","$get$hW",function(){return K.Y("cave_with_agruth",new V.rO(),new V.rP(),null,null,H.p([new Q.u("underground_church","Go to the Unholy Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.u("war_forge","Go to the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null),new Q.u("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.u]),"ground")},"fO","$get$fO",function(){return new V.nX("Search Agruth","search_agruth",!0,null)},"i3","$get$i3",function(){return K.Y("exit_from_bloodrock",new V.rM(),new V.rN(),null,null,H.p([new Q.u("__END_OF_ROAM__","Go forth (UNIMPLEMENTED)","You head down.",null)],[Q.u]),"ground")},"i4","$get$i4",function(){return K.Y("forge_church_crevice",new V.rJ(),new V.rK(),null,null,H.p([new Q.u("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.u]),"ground")},"ic","$get$ic",function(){return K.Y("guardpost_above_church",new V.rH(),new V.rI(),null,null,H.p([new Q.u("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.u("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.u("smelter","Go to the smelter","Something something.",null)],[Q.u]),"ground")},"f5","$get$f5",function(){return new V.lm("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"ig","$get$ig",function(){return K.Y("just_after_agruth_fight",new V.rF(),new V.rG(),null,null,H.p([],[Q.u]),"ground")},"fq","$get$fq",function(){return new V.mi('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fr","$get$fr",function(){return new V.mj('"Savior"',"name_agruth_sword_redemption",!0,null)},"fp","$get$fp",function(){return new V.mh("No name","name_agruth_sword_nothing",!0,null)},"ij","$get$ij",function(){return K.Y("orcthorn_door",new V.rD(),new V.rE(),null,null,H.p([new Q.u("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_room","Open the door","You open the door.",null)],[Q.u]),"ground")},"ik","$get$ik",function(){return K.Y("orcthorn_room",new V.rB(),new V.rC(),O.vI(),null,H.p([new Q.u("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.u]),"ground")},"h5","$get$h5",function(){return new V.oY("Search for Orcthorn","take_orcthorn",!0,null)},"im","$get$im",function(){return K.Y("slave_quarters",new V.ry(),new V.rz(),null,null,H.p([],[Q.u]),"ground")},"fU","$get$fU",function(){return new V.o9("Continue","slave_quarters_continue",!0,null)},"io","$get$io",function(){return K.Y("slave_quarters_passage",new V.rw(),new V.rx(),O.iF(),null,H.p([new Q.u("cave_with_agruth","Go to the working area","TODO",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_door","Approach the little door","Something something.",null)],[Q.u]),"ground")},"ip","$get$ip",function(){return K.Y("smelter",new V.ru(),new V.rv(),null,null,H.p([new Q.u("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.u("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.u("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.u]),"ground")},"iq","$get$iq",function(){return K.Y("start_adventure",new V.rs(),new V.rt(),O.vH(),null,H.p([new Q.u("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.u]),"ground")},"h7","$get$h7",function(){return new V.p_("Talk to Briana","talk_to_briana_1",!0,null)},"h8","$get$h8",function(){return new V.p0("Talk to Briana","talk_to_briana_2",!0,null)},"h9","$get$h9",function(){return new V.p1("Talk to Briana","talk_to_briana_3",!0,null)},"iz","$get$iz",function(){return K.Y("the_shafts",new V.rq(),new V.rr(),null,null,H.p([new Q.u("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.u]),"ground")},"iB","$get$iB",function(){return K.Y("tunnel",new V.th(),new V.ti(),O.iF(),null,H.p([new Q.u("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.u]),"ground")},"iC","$get$iC",function(){return K.Y("underground_church",new V.t6(),new V.tg(),null,null,H.p([new Q.u("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.u("underground_church_altar","Go towards the altar","You sneak your way among the columns, trying to stay in the shadows.",null)],[Q.u]),"ground")},"f1","$get$f1",function(){return new V.kW("Look around","examine_underground_church",!0,null)},"iD","$get$iD",function(){return K.Y("underground_church_altar",new V.rL(),new V.rW(),null,null,H.p([new Q.u("underground_church","Sneak back","You keep low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.u]),"ground")},"hr","$get$hr",function(){return new V.pg("Wait","wait_for_ritual",!0,null)},"h6","$get$h6",function(){return new V.oZ("Take spear","take_spear_in_underground_church",!0,null)},"iE","$get$iE",function(){return K.Y("war_forge",new V.rp(),new V.rA(),null,null,H.p([new Q.u("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.u]),"ground")},"hR","$get$hR",function(){return H.p([$.$get$hX(),$.$get$hW(),$.$get$i3(),$.$get$i4(),$.$get$ic(),$.$get$ig(),$.$get$ij(),$.$get$ik(),$.$get$im(),$.$get$io(),$.$get$ip(),$.$get$iq(),$.$get$iz(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iE()],[K.cg])},"hQ","$get$hQ",function(){return H.p([$.$get$fO(),$.$get$f5(),$.$get$fq(),$.$get$fr(),$.$get$fp(),$.$get$h5(),$.$get$fU(),$.$get$h7(),$.$get$h8(),$.$get$h9(),$.$get$f1(),$.$get$hr(),$.$get$h6()],[A.af])},"dh","$get$dh",function(){return P.oP("")},"cq","$get$cq",function(){var z=new O.mU(0,null,"PointsCounter")
z.i5()
return z},"bU","$get$bU",function(){return new L.eV(null,H.p([],[L.a6]))},"cu","$get$cu",function(){return H.fg(P.r,P.d)},"cp","$get$cp",function(){return P.b6(null,{func:1,ret:[P.P,P.as]})},"cE","$get$cE",function(){return P.bj("^\\s*<<<\\s*$",!0,!1)},"d0","$get$d0",function(){return H.fg(P.r,Z.at)},"fn","$get$fn",function(){return N.bg("")},"fm","$get$fm",function(){return P.dF(P.r,N.dH)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.r,args:[R.H,A.aa,Y.Z]},{func:1,args:[,,,]},{func:1,ret:Q.A,args:[R.H]},{func:1,args:[R.H,A.aa,Y.Z]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.H,A.aa,Y.Z,R.H,S.a9]},{func:1,args:[P.t]},{func:1,ret:U.cL,args:[A.aa,F.V,[P.z,R.H]]},{func:1,v:true,args:[R.H,A.aa,Y.Z,R.H,,]},{func:1,ret:P.r,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[U.c3]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[P.d],opt:[P.aZ]},{func:1,ret:Q.c5,args:[U.a7]},{func:1,args:[P.aS]},{func:1,ret:P.P},{func:1,ret:P.K,args:[A.ao]},{func:1,args:[,P.aZ]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aK,args:[P.t]},{func:1,ret:P.r,args:[P.r]},{func:1,args:[Z.at]},{func:1,args:[,,,,]},{func:1,args:[R.H]},{func:1,args:[P.K,R.H]},{func:1,ret:P.a_,args:[P.t]},{func:1,args:[P.bh]},{func:1,args:[Y.ae]},{func:1,v:true,args:[P.t]},{func:1,ret:P.a_,args:[L.a6]},{func:1,v:true,args:[[P.L,P.r],P.fP]},{func:1,args:[L.a6]},{func:1,args:[P.r,,]},{func:1,args:[P.r,Z.d_]},{func:1,args:[[P.L,Y.ae],Y.ae]},{func:1,ret:P.K,args:[A.cx]},{func:1,ret:P.t,args:[P.U,P.U]},{func:1,ret:P.r,args:[Q.ac]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,ret:[P.P,U.ch],args:[P.aS,P.r],named:{rerollEffectDescription:P.r,rerollable:P.a_}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aZ]},{func:1,v:true,args:[P.d,P.aZ]},{func:1,ret:Q.cK,args:[Q.u]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:L.a6,args:[P.r],named:{deferToChoiceList:P.a_,deferToEndOfPage:P.a_,goto:P.r,helpMessage:P.r,script:{func:1,ret:[P.P,P.as]},submenu:P.r}},{func:1,args:[P.a_]}]
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
if(x==y)H.vD(d||a)
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
Isolate.aT=a.aT
Isolate.bb=a.bb
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ir(X.i0(),b)},[])
else (function(b){H.ir(X.i0(),b)})([])})})()