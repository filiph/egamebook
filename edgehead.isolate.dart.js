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
if(b5.$isaQ)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.el"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.el"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.el(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",vT:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aQ:{"^":"d;",
u:function(a,b){return a===b},
gA:function(a){return H.aA(a)},
k:function(a){return H.cR(a)},
gbv:function(a){return new H.au(H.ia(a),null)}},
f8:{"^":"aQ;",
k:function(a){return String(a)},
gA:function(a){return a?519018:218159},
gbv:function(a){return C.ab},
$isa0:1},
fb:{"^":"aQ;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gA:function(a){return 0},
gbv:function(a){return C.a9},
$isas:1},
fe:{"^":"aQ;",
gA:function(a){return 0},
gbv:function(a){return C.a8},
k:function(a){return String(a)},
$isfc:1},
w_:{"^":"fe;"},
bn:{"^":"fe;"},
c5:{"^":"aQ;$ti",
fO:function(a,b){if(!!a.immutable$list)throw H.c(new P.R(b))},
cM:function(a,b){if(!!a.fixed$length)throw H.c(new P.R(b))},
q:function(a,b){this.cM(a,"add")
a.push(b)},
hg:function(a){this.cM(a,"removeLast")
if(a.length===0)throw H.c(H.aE(a,-1))
return a.pop()},
a2:function(a,b){var z
this.cM(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
iR:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.D(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c2:function(a,b){return new H.H(a,b,[H.m(a,0)])},
ar:function(a,b){var z
this.cM(a,"addAll")
for(z=J.af(b);z.t();)a.push(z.gG())},
V:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.D(a))}},
aD:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dW:function(a,b){return H.h3(a,b,null,H.m(a,0))},
bp:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.D(a))}return y},
be:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.ag())},
dw:function(a,b){return this.be(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geA:function(a){if(a.length>0)return a[0]
throw H.c(H.ag())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ag())},
gc5:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ag())
throw H.c(H.dt())},
aV:function(a,b,c,d,e){var z,y,x
this.fO(a,"setRange")
P.cb(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a3(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f7())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bT:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.D(a))}return!1},
c6:function(a,b){var z
this.fO(a,"sort")
z=b==null?P.tk():b
H.cf(a,0,a.length-1,z)},
f0:function(a){return this.c6(a,null)},
bN:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aT:function(a,b){return this.bN(a,b,0)},
a6:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gU:function(a){return a.length===0},
gao:function(a){return a.length!==0},
k:function(a){return P.c4(a,"[","]")},
bF:function(a){return P.b0(a,H.m(a,0))},
gZ:function(a){return new J.bc(a,a.length,0,null,[H.m(a,0)])},
gA:function(a){return H.aA(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cM(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cw(b,"newLength",null))
if(b<0)throw H.c(P.a3(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.R("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
a[b]=c},
$iscN:1,
$ascN:I.b9,
$isL:1,
$isX:1,
$isw:1},
vS:{"^":"c5;$ti"},
bc:{"^":"d;a,b,c,d,$ti",
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
c6:{"^":"aQ;",
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
hm:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.R(""+a+".round()"))},
kO:function(a){return a},
b8:function(a,b){var z
if(b>20)throw H.c(P.a3(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdA(a))return"-"+z
return z},
kR:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a3(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cN(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.R("Unexpected toString result: "+z))
x=J.J(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c3("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
eX:function(a){return-a},
af:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a-b},
d5:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a/b},
c3:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a*b},
bJ:function(a,b){return(a|0)===a?a/b|0:this.j_(a,b)},
j_:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.R("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dq:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aR:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<b},
b9:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a>b},
d6:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<=b},
bO:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a>=b},
gbv:function(a){return C.ae},
$isK:1},
fa:{"^":"c6;",
gbv:function(a){return C.ad},
$isaP:1,
$isK:1,
$ist:1},
f9:{"^":"c6;",
gbv:function(a){return C.ac},
$isaP:1,
$isK:1},
c7:{"^":"aQ;",
cN:function(a,b){if(b<0)throw H.c(H.aE(a,b))
if(b>=a.length)H.i(H.aE(a,b))
return a.charCodeAt(b)},
cv:function(a,b){if(b>=a.length)throw H.c(H.aE(a,b))
return a.charCodeAt(b)},
dr:function(a,b,c){if(c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
return new H.qJ(b,a,c)},
eu:function(a,b){return this.dr(a,b,0)},
h4:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cN(b,c+y)!==this.cv(a,y))return
return new H.h2(c,b,a)},
af:function(a,b){if(typeof b!=="string")throw H.c(P.cw(b,null,null))
return a+b},
ey:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bH(a,y-z)},
kB:function(a,b,c){H.bt(c)
return H.n(a,b,c)},
kC:function(a,b,c,d){H.bt(c)
P.ng(d,0,a.length,"startIndex",null)
return H.iv(a,b,c,d)},
cY:function(a,b,c){return this.kC(a,b,c,0)},
hS:function(a,b,c){var z
if(c>a.length)throw H.c(P.a3(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iN(b,a,c)!=null},
dd:function(a,b){return this.hS(a,b,0)},
aF:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.S(c))
if(b<0)throw H.c(P.ca(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.ca(b,null,null))
if(c>a.length)throw H.c(P.ca(c,null,null))
return a.substring(b,c)},
bH:function(a,b){return this.aF(a,b,null)},
eS:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cv(z,0)===133){x=J.du(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cN(z,w)===133?J.lO(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kS:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cv(z,0)===133?J.du(z,1):0}else{y=J.du(a,0)
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
bN:function(a,b,c){var z
if(c>a.length)throw H.c(P.a3(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aT:function(a,b){return this.bN(a,b,0)},
ki:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kh:function(a,b){return this.ki(a,b,null)},
jp:function(a,b,c){if(b==null)H.i(H.S(b))
if(c>a.length)throw H.c(P.a3(c,0,a.length,null,null))
return H.vs(a,b,c)},
a6:function(a,b){return this.jp(a,b,0)},
gU:function(a){return a.length===0},
gao:function(a){return a.length!==0},
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
gbv:function(a){return C.aa},
gl:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
return a[b]},
$iscN:1,
$ascN:I.b9,
$isr:1,
$isdP:1,
v:{
fd:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
du:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cv(a,b)
if(y!==32&&y!==13&&!J.fd(y))break;++b}return b},
lO:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cN(a,z)
if(y!==32&&y!==13&&!J.fd(y))break}return b}}}}],["","",,H,{"^":"",
hE:function(a){return a},
ag:function(){return new P.y("No element")},
dt:function(){return new P.y("Too many elements")},
f7:function(){return new P.y("Too few elements")},
cf:function(a,b,c,d){if(c-b<=32)H.fW(a,b,c,d)
else H.fV(a,b,c,d)},
fW:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a6(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
fV:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(h.u(i,0))continue
if(h.aR(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.ak(i)
if(h.b9(i,0)){--l
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
t.n(a,m,j)}++m}else if(J.a6(d.$2(j,p),0))for(;!0;)if(J.a6(d.$2(t.j(a,l),p),0)){--l
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
H.cf(a,b,m-2,d)
H.cf(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bU(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.cf(a,m,l,d)}else H.cf(a,m,l,d)},
X:{"^":"w;$ti"},
aS:{"^":"X;$ti",
gZ:function(a){return new H.dD(this,this.gl(this),0,null,[H.z(this,"aS",0)])},
V:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gU:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ag())
return this.as(0,this.gl(this)-1)},
a6:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.as(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
be:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
cd:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gl(this))throw H.c(new P.D(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}},
c2:function(a,b){return this.de(0,b)},
aD:function(a,b){return new H.ap(this,b,[H.z(this,"aS",0),null])},
bp:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gl(this))throw H.c(new P.D(this))}return y},
bE:function(a,b){var z,y,x,w
z=[H.z(this,"aS",0)]
if(b){y=H.q([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.q(x,z)}for(w=0;w<this.gl(this);++w){z=this.as(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cp:function(a){return this.bE(a,!0)},
bF:function(a){var z,y
z=P.Y(null,null,null,H.z(this,"aS",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.as(0,y))
return z}},
oT:{"^":"aS;a,b,c,$ti",
gis:function(){var z=J.aH(this.a)
return z},
giY:function(){var z,y
z=J.aH(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aH(this.a)
y=this.b
if(y>=z)return 0
return z-y},
as:function(a,b){var z,y
z=this.giY()+b
if(!(b<0)){y=this.gis()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cK(b,this,"index",null,null))
return J.eH(this.a,z)},
bE:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.q([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.q(s,u)}for(r=0;r<v;++r){u=x.as(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.D(this))}return t},
i2:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a3(z,0,null,"start",null))},
v:{
h3:function(a,b,c,d){var z=new H.oT(a,b,c,[d])
z.i2(a,b,c,d)
return z}}},
dD:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.as(0,x);++this.c
return!0}},
dG:{"^":"w;a,b,$ti",
gZ:function(a){return new H.mi(null,J.af(this.a),this.b,this.$ti)},
gl:function(a){return J.aH(this.a)},
gU:function(a){return J.eI(this.a)},
gw:function(a){return this.b.$1(J.iK(this.a))},
$asw:function(a,b){return[b]},
v:{
bA:function(a,b,c,d){if(!!J.o(a).$isX)return new H.by(a,b,[c,d])
return new H.dG(a,b,[c,d])}}},
by:{"^":"dG;a,b,$ti",$isX:1,
$asX:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
mi:{"^":"cM;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascM:function(a,b){return[b]}},
ap:{"^":"aS;a,b,$ti",
gl:function(a){return J.aH(this.a)},
as:function(a,b){return this.b.$1(J.eH(this.a,b))},
$asaS:function(a,b){return[b]},
$asX:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
H:{"^":"w;a,b,$ti",
gZ:function(a){return new H.bK(J.af(this.a),this.b,this.$ti)},
aD:function(a,b){return new H.dG(this,b,[H.m(this,0),null])}},
bK:{"^":"cM;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fQ:{"^":"w;a,b,$ti",
gZ:function(a){return new H.o8(J.af(this.a),this.b,this.$ti)},
v:{
o7:function(a,b,c){if(!!J.o(a).$isX)return new H.kT(a,H.hE(b),[c])
return new H.fQ(a,H.hE(b),[c])}}},
kT:{"^":"fQ;a,b,$ti",
gl:function(a){var z=J.aH(this.a)-this.b
if(z>=0)return z
return 0},
$isX:1},
o8:{"^":"cM;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gG:function(){return this.a.gG()}},
kU:{"^":"d;$ti",
t:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
cl:function(a,b){var z=a.cP(b)
if(!init.globalState.d.cy)init.globalState.f.bu()
return z},
is:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isL)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qv(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$f5()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.q4(P.b2(null,H.cj),0)
x=P.t
y.z=new H.Q(0,null,null,null,null,null,0,[x,H.eb])
y.ch=new H.Q(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qu()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lG,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qw)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.Y(null,null,null,x)
v=new H.cc(0,null,!1)
u=new H.eb(y,new H.Q(0,null,null,null,null,null,0,[x,H.cc]),w,init.createNewIsolate(),v,new H.bd(H.dc()),new H.bd(H.dc()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
w.q(0,0)
u.dZ(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ax(a,{func:1,args:[,]}))u.cP(new H.uR(z,a))
else if(H.ax(a,{func:1,args:[,,]}))u.cP(new H.uS(z,a))
else u.cP(a)
init.globalState.f.bu()},
lK:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lL()
return},
lL:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.R("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.R('Cannot extract URI from "'+z+'"'))},
lG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d1(!0,[]).bV(b.data)
y=J.J(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d1(!0,[]).bV(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d1(!0,[]).bV(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.Y(null,null,null,q)
o=new H.cc(0,null,!1)
n=new H.eb(y,new H.Q(0,null,null,null,null,null,0,[q,H.cc]),p,init.createNewIsolate(),o,new H.bd(H.dc()),new H.bd(H.dc()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
p.q(0,0)
n.dZ(0,o)
init.globalState.f.a.az(new H.cj(n,new H.lH(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bu()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.bu()
break
case"close":init.globalState.ch.a2(0,$.$get$f6().j(0,a))
a.terminate()
init.globalState.f.bu()
break
case"log":H.lF(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.bp(!0,P.bN(null,P.t)).bi(q)
y.toString
self.postMessage(q)}else P.ev(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lF:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.bp(!0,P.bN(null,P.t)).bi(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.C(w)
y=P.cH(z)
throw H.c(y)}},
lI:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fA=$.fA+("_"+y)
$.fB=$.fB+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.ck(y,x),w,z.r])
x=new H.lJ(a,b,c,d,z)
if(e===!0){z.fJ(w,w)
init.globalState.f.a.az(new H.cj(z,x,"start isolate"))}else x.$0()},
r_:function(a){return new H.d1(!0,[]).bV(new H.bp(!1,P.bN(null,P.t)).bi(a))},
uR:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
uS:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qv:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
qw:function(a){var z=P.ab(["command","print","msg",a])
return new H.bp(!0,P.bN(null,P.t)).bi(z)}}},
eb:{"^":"d;i:a<,b,c,kf:d<,jr:e<,f,r,x,cS:y<,z,Q,ch,cx,cy,db,dx",
fJ:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cI()},
kA:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a2(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fH(x)}this.y=!1}this.cI()},
jf:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ky:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.R("removeRange"))
P.cb(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hL:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jP:function(a,b,c){var z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.b2(null,null)
this.cx=z}z.az(new H.ql(a,c))},
jO:function(a,b){var z
if(!this.r.u(0,a))return
z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.eH()
return}z=this.cx
if(z==null){z=P.b2(null,null)
this.cx=z}z.az(this.gkg())},
jQ:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ev(a)
if(b!=null)P.ev(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.aj(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.F(y)},
cP:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.A(u)
v=H.C(u)
this.jQ(w,v)
if(this.db===!0){this.eH()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gkf()
if(this.cx!=null)for(;t=this.cx,!t.gU(t);)this.cx.dG().$0()}return y},
cg:function(a){return this.b.j(0,a)},
dZ:function(a,b){var z=this.b
if(z.a7(a))throw H.c(P.cH("Registry: ports must be registered only once."))
z.n(0,a,b)},
cI:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eH()},
eH:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b3(0)
for(z=this.b,y=z.gcq(),y=y.gZ(y);y.t();)y.gG().ik()
z.b3(0)
this.c.b3(0)
init.globalState.z.a2(0,this.a)
this.dx.b3(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkg",0,0,7]},
ql:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
q4:{"^":"d;a,b",
jw:function(){var z=this.a
if(z.b===z.c)return
return z.dG()},
hp:function(){var z,y,x
z=this.jw()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a7(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gU(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cH("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gU(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ab(["command","close"])
x=new H.bp(!0,new P.hz(0,null,null,null,null,null,0,[null,P.t])).bi(x)
y.toString
self.postMessage(x)}return!1}z.kw()
return!0},
fz:function(){if(self.window!=null)new H.q5(this).$0()
else for(;this.hp(););},
bu:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fz()
else try{this.fz()}catch(x){z=H.A(x)
y=H.C(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bp(!0,P.bN(null,P.t)).bi(v)
w.toString
self.postMessage(v)}}},
q5:{"^":"a:7;a",
$0:function(){if(!this.a.hp())return
P.p9(C.w,this)}},
cj:{"^":"d;a,b,c",
kw:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cP(this.b)}},
qu:{"^":"d;"},
lH:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.lI(this.a,this.b,this.c,this.d,this.e,this.f)}},
lJ:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ax(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ax(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cI()}},
ht:{"^":"d;"},
ck:{"^":"ht;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfm())return
x=H.r_(a)
if(z.gjr()===y){y=J.J(x)
switch(y.j(x,0)){case"pause":z.fJ(y.j(x,1),y.j(x,2))
break
case"resume":z.kA(y.j(x,1))
break
case"add-ondone":z.jf(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.ky(y.j(x,1))
break
case"set-errors-fatal":z.hL(y.j(x,1),y.j(x,2))
break
case"ping":z.jP(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.jO(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a2(0,y)
break}return}init.globalState.f.a.az(new H.cj(z,new H.qy(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.ck&&J.e(this.b,b.b)},
gA:function(a){return this.b.geb()}},
qy:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfm())z.i8(this.b)}},
ee:{"^":"ht;b,c,a",
F:function(a){var z,y,x
z=P.ab(["command","message","port",this,"msg",a])
y=new H.bp(!0,P.bN(null,P.t)).bi(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.ee&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eY()
y=this.a
if(typeof y!=="number")return y.eY()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cc:{"^":"d;eb:a<,b,fm:c<",
ik:function(){this.c=!0
this.b=null},
bm:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a2(0,y)
z.c.a2(0,y)
z.cI()},
i8:function(a){if(this.c)return
this.b.$1(a)},
$isnh:1},
ni:{"^":"ai;a,b",
aC:function(a,b,c,d){var z=this.b
z.toString
return new P.d0(z,[H.m(z,0)]).aC(a,b,c,d)},
eK:function(a,b,c){return this.aC(a,null,b,c)},
bm:[function(){this.a.bm()
this.b.bm()},"$0","gjn",0,0,7],
i0:function(a){var z=new P.qN(null,0,null,null,null,null,this.gjn(),[null])
this.b=z
this.a.b=z.gj6(z)},
$asai:I.b9},
p5:{"^":"d;a,b,c",
gcc:function(){return this.c!=null},
i3:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.az(new H.cj(y,new H.p7(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d9(new H.p8(this,b),0),a)}else throw H.c(new P.R("Timer greater than 0."))},
v:{
p6:function(a,b){var z=new H.p5(!0,!1,null)
z.i3(a,b)
return z}}},
p7:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
p8:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bd:{"^":"d;eb:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.l_()
z=C.j.dq(z,0)^C.j.bJ(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bd){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bp:{"^":"d;a,b",
bi:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscN)return this.hH(a)
if(!!z.$islD){x=this.ghE()
z=a.gce()
z=H.bA(z,x,H.z(z,"w",0),null)
z=P.O(z,!0,H.z(z,"w",0))
w=a.gcq()
w=H.bA(w,x,H.z(w,"w",0),null)
return["map",z,P.O(w,!0,H.z(w,"w",0))]}if(!!z.$isfc)return this.hI(a)
if(!!z.$isaQ)this.hs(a)
if(!!z.$isnh)this.d1(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isck)return this.hJ(a)
if(!!z.$isee)return this.hK(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d1(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbd)return["capability",a.a]
if(!(a instanceof P.d))this.hs(a)
return["dart",init.classIdExtractor(a),this.hG(init.classFieldsExtractor(a))]},"$1","ghE",2,0,0],
d1:function(a,b){throw H.c(new P.R((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hs:function(a){return this.d1(a,null)},
hH:function(a){var z=this.hF(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d1(a,"Can't serialize indexable: ")},
hF:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bi(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hG:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bi(a[z]))
return a},
hI:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d1(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bi(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hK:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hJ:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.geb()]
return["raw sendport",a]}},
d1:{"^":"d;a,b",
bV:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.b(a)))
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
y=H.q(this.cO(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.q(this.cO(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cO(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.q(this.cO(x),[null])
y.fixed$length=Array
return y
case"map":return this.jz(a)
case"sendport":return this.jA(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jy(a)
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
this.cO(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjx",2,0,0],
cO:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.n(a,y,this.bV(z.j(a,y)));++y}return a},
jz:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aJ()
this.b.push(w)
y=J.eJ(y,this.gjx()).cp(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.bV(v.j(x,u)))}return w},
jA:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.e(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.cg(w)
if(u==null)return
t=new H.ck(u,x)}else t=new H.ee(y,w,x)
this.b.push(t)
return t},
jy:function(a){var z,y,x,w,v,u,t
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
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.j(y,u)]=this.bV(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
jZ:function(){throw H.c(new P.R("Cannot modify unmodifiable Map"))},
tW:function(a){return init.types[a]},
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
bD:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.K||!!J.o(a).$isbn){v=C.O(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cv(w,0)===36)w=C.b.bH(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.db(H.cp(a),0,null),init.mangledGlobalNames)},
cR:function(a){return"Instance of '"+H.bD(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dq(z,10))>>>0,56320|z&1023)}throw H.c(P.a3(a,0,1114111,null,null))},
bh:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
n9:function(a){var z=H.bh(a).getFullYear()+0
return z},
n7:function(a){var z=H.bh(a).getMonth()+1
return z},
n3:function(a){var z=H.bh(a).getDate()+0
return z},
n4:function(a){var z=H.bh(a).getHours()+0
return z},
n6:function(a){var z=H.bh(a).getMinutes()+0
return z},
n8:function(a){var z=H.bh(a).getSeconds()+0
return z},
n5:function(a){var z=H.bh(a).getMilliseconds()+0
return z},
dS:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
return a[b]},
fC:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
a[b]=c},
x:function(a){throw H.c(H.S(a))},
f:function(a,b){if(a==null)J.aH(a)
throw H.c(H.aE(a,b))},
aE:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aY(!0,b,"index",null)
z=J.aH(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cK(b,a,"index",null,z)
return P.ca(b,"index",null)},
S:function(a){return new P.aY(!0,a,null,null)},
d7:function(a){if(typeof a!=="number")throw H.c(H.S(a))
return a},
rk:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.S(a))
return a},
bt:function(a){if(typeof a!=="string")throw H.c(H.S(a))
return a},
c:function(a){var z
if(a==null)a=new P.cP()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iB})
z.name=""}else z.toString=H.iB
return z},
iB:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.D(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.vA(a)
if(a==null)return
if(a instanceof H.dp)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dq(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dx(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fr(v,null))}}if(a instanceof TypeError){u=$.$get$hb()
t=$.$get$hc()
s=$.$get$hd()
r=$.$get$he()
q=$.$get$hi()
p=$.$get$hj()
o=$.$get$hg()
$.$get$hf()
n=$.$get$hl()
m=$.$get$hk()
l=u.br(y)
if(l!=null)return z.$1(H.dx(y,l))
else{l=t.br(y)
if(l!=null){l.method="call"
return z.$1(H.dx(y,l))}else{l=s.br(y)
if(l==null){l=r.br(y)
if(l==null){l=q.br(y)
if(l==null){l=p.br(y)
if(l==null){l=o.br(y)
if(l==null){l=r.br(y)
if(l==null){l=n.br(y)
if(l==null){l=m.br(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fr(y,l==null?null:l.method))}}return z.$1(new H.pd(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fX()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aY(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fX()
return a},
C:function(a){var z
if(a instanceof H.dp)return a.b
if(a==null)return new H.hB(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hB(a,null)},
ub:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aA(a)},
tF:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
u0:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cl(b,new H.u1(a))
case 1:return H.cl(b,new H.u2(a,d))
case 2:return H.cl(b,new H.u3(a,d,e))
case 3:return H.cl(b,new H.u4(a,d,e,f))
case 4:return H.cl(b,new H.u5(a,d,e,f,g))}throw H.c(P.cH("Unsupported number of arguments for wrapped closure"))},
d9:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.u0)
a.$identity=z
return z},
jV:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isL){z.$reflectionInfo=c
x=H.nk(z).r}else x=c
w=d?Object.create(new H.op().constructor.prototype):Object.create(new H.dh(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aI
$.aI=J.am(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eV(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.tW,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eQ:H.di
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
jS:function(a,b,c,d){var z=H.di
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eV:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jU(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jS(y,!w,z,b)
if(y===0){w=$.aI
$.aI=J.am(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bx
if(v==null){v=H.cz("self")
$.bx=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aI
$.aI=J.am(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bx
if(v==null){v=H.cz("self")
$.bx=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jT:function(a,b,c,d){var z,y
z=H.di
y=H.eQ
switch(b?-1:a){case 0:throw H.c(new H.nv("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jU:function(a,b){var z,y,x,w,v,u,t,s
z=H.jJ()
y=$.eP
if(y==null){y=H.cz("receiver")
$.eP=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jT(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aI
$.aI=J.am(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aI
$.aI=J.am(u,1)
return new Function(y+H.b(u)+"}")()},
el:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jV(a,b,z,!!d,e,f)},
im:function(a,b){var z=J.J(b)
throw H.c(H.cB(H.bD(a),z.aF(b,3,z.gl(b))))},
M:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.im(a,b)},
ig:function(a,b){if(!!J.o(a).$isL||a==null)return a
if(J.o(a)[b])return a
H.im(a,b)},
eo:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ax:function(a,b){var z
if(a==null)return!1
z=H.eo(a)
return z==null?!1:H.es(z,b)},
i4:function(a,b){var z,y
if(a==null)return a
if(H.ax(a,b))return a
z=H.W(b,null)
y=H.eo(a)
throw H.c(H.cB(y!=null?H.W(y,null):H.bD(a),z))},
vy:function(a){throw H.c(new P.kb(a))},
dc:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b8:function(a){return new H.au(a,null)},
q:function(a,b){a.$ti=b
return a},
cp:function(a){if(a==null)return
return a.$ti},
i9:function(a,b){return H.eE(a["$as"+H.b(b)],H.cp(a))},
z:function(a,b,c){var z=H.i9(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cp(a)
return z==null?null:z[b]},
W:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.db(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.W(z,b)
return H.r4(a,b)}return"unknown-reified-type"},
r4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.W(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.W(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.W(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tE(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.W(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
db:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bJ("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.B=v+", "
u=a[y]
if(u!=null)w=!1
v=z.B+=H.W(u,c)}return w?"":"<"+z.k(0)+">"},
ia:function(a){var z,y
if(a instanceof H.a){z=H.eo(a)
if(z!=null)return H.W(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.db(a.$ti,0,null)},
eE:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aO:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cp(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hT(H.eE(y[d],z),c)},
aG:function(a,b,c,d){if(a==null)return a
if(H.aO(a,b,c,d))return a
throw H.c(H.cB(H.bD(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.db(c,0,null),init.mangledGlobalNames)))},
hT:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.al(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return a.apply(b,H.i9(b,c))},
d8:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="as"
if(b==null)return!0
z=H.cp(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.es(x.apply(a,null),b)}return H.al(y,b)},
iw:function(a,b){if(a!=null&&!H.d8(a,b))throw H.c(H.cB(H.bD(a),H.W(b,null)))
return a},
al:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="as")return!0
if('func' in b)return H.es(a,b)
if('func' in a)return b.builtin$cls==="bz"||b.builtin$cls==="d"
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
return H.hT(H.eE(u,z),x)},
hS:function(a,b,c){var z,y,x,w,v
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
re:function(a,b){var z,y,x,w,v,u
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
es:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hS(x,w,!1))return!1
if(!H.hS(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}}return H.re(a.named,b.named)},
vs:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdv){z=C.b.bH(a,c)
return b.b.test(z)}else{z=z.eu(b,C.b.bH(a,c))
return!z.gU(z)}}},
vu:function(a,b,c,d){var z,y,x
z=b.fg(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eD(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bt(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
wg:[function(a){return a},"$1","hF",2,0,24],
vt:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdP)throw H.c(P.cw(b,"pattern","is not a Pattern"))
for(z=z.eu(b,a),z=new H.hr(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hF().$1(C.b.aF(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hF().$1(C.b.bH(a,y)))
return z.charCodeAt(0)==0?z:z},
iv:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eD(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdv)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.vu(a,b,c,d)
if(b==null)H.i(H.S(b))
y=y.dr(b,a,d)
x=y.gZ(y)
if(!x.t())return a
w=x.gG()
y=w.gf1()
v=w.gfU()
H.bt(c)
u=P.cb(y,v,a.length,null,null,null)
H.rk(u)
return H.eD(a,y,u,c)},
eD:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jY:{"^":"d;$ti",
gU:function(a){return this.gl(this)===0},
gao:function(a){return this.gl(this)!==0},
k:function(a){return P.dH(this)},
n:function(a,b,c){return H.jZ()},
$isG:1},
k_:{"^":"jY;a,b,c,$ti",
gl:function(a){return this.a},
a7:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.a7(b))return
return this.fh(b)},
fh:function(a){return this.b[a]},
V:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fh(w))}}},
nj:{"^":"d;a,b,c,d,e,f,r,x",v:{
nk:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nj(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pa:{"^":"d;a,b,c,d,e,f",
br:function(a){var z,y,x
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
aK:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pa(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d_:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hh:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fr:{"^":"a2;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lQ:{"^":"a2;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
dx:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lQ(a,y,z?null:b.receiver)}}},
pd:{"^":"a2;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dp:{"^":"d;a,bj:b<"},
vA:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa2)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hB:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
u1:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
u2:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
u3:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
u4:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
u5:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bD(this).trim()+"'"},
ghA:function(){return this},
$isbz:1,
ghA:function(){return this}},
ha:{"^":"a;"},
op:{"^":"ha;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dh:{"^":"ha;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dh))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.j(z):H.aA(z)
z=H.aA(this.b)
if(typeof y!=="number")return y.l0()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cR(z)},
v:{
di:function(a){return a.a},
eQ:function(a){return a.c},
jJ:function(){var z=$.bx
if(z==null){z=H.cz("self")
$.bx=z}return z},
cz:function(a){var z,y,x,w,v
z=new H.dh("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jO:{"^":"a2;a",
k:function(a){return this.a},
v:{
cB:function(a,b){return new H.jO("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nv:{"^":"a2;a",
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
gao:function(a){return!this.gU(this)},
gce:function(){return new H.m6(this,[H.m(this,0)])},
gcq:function(){return H.bA(this.gce(),new H.lP(this),H.m(this,0),H.m(this,1))},
a7:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fc(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fc(y,a)}else return this.k0(a)},
k0:function(a){var z=this.d
if(z==null)return!1
return this.cR(this.dk(z,this.cQ(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cA(z,b)
return y==null?null:y.gbX()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cA(x,b)
return y==null?null:y.gbX()}else return this.k5(b)},
k5:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dk(z,this.cQ(a))
x=this.cR(y,a)
if(x<0)return
return y[x].gbX()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ed()
this.b=z}this.f6(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ed()
this.c=y}this.f6(y,b,c)}else this.k7(b,c)},
k7:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ed()
this.d=z}y=this.cQ(a)
x=this.dk(z,y)
if(x==null)this.eo(z,y,[this.ee(a,b)])
else{w=this.cR(x,a)
if(w>=0)x[w].sbX(b)
else x.push(this.ee(a,b))}},
kx:function(a,b){var z
if(this.a7(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a2:function(a,b){if(typeof b==="string")return this.fw(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fw(this.c,b)
else return this.k6(b)},
k6:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dk(z,this.cQ(a))
x=this.cR(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fB(w)
return w.gbX()},
b3:function(a){if(this.a>0){this.f=null
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
f6:function(a,b,c){var z=this.cA(a,b)
if(z==null)this.eo(a,b,this.ee(b,c))
else z.sbX(c)},
fw:function(a,b){var z
if(a==null)return
z=this.cA(a,b)
if(z==null)return
this.fB(z)
this.fd(a,b)
return z.gbX()},
ee:function(a,b){var z,y
z=new H.m5(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fB:function(a){var z,y
z=a.giN()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cQ:function(a){return J.j(a)&0x3ffffff},
cR:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gh0(),b))return y
return-1},
k:function(a){return P.dH(this)},
cA:function(a,b){return a[b]},
dk:function(a,b){return a[b]},
eo:function(a,b,c){a[b]=c},
fd:function(a,b){delete a[b]},
fc:function(a,b){return this.cA(a,b)!=null},
ed:function(){var z=Object.create(null)
this.eo(z,"<non-identifier-key>",z)
this.fd(z,"<non-identifier-key>")
return z},
$islD:1,
$isG:1,
v:{
ff:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])}}},
lP:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
m5:{"^":"d;h0:a<,bX:b@,c,iN:d<,$ti"},
m6:{"^":"X;a,$ti",
gl:function(a){return this.a.a},
gU:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.m7(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a6:function(a,b){return this.a.a7(b)},
V:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.D(z))
y=y.c}}},
m7:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dv:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giJ:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dw(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giI:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dw(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dr:function(a,b,c){if(c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
return new H.pL(this,b,c)},
eu:function(a,b){return this.dr(a,b,0)},
fg:function(a,b){var z,y
z=this.giJ()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hA(this,y)},
it:function(a,b){var z,y
z=this.giI()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hA(this,y)},
h4:function(a,b,c){if(c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
return this.it(b,c)},
$isdP:1,
v:{
dw:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f2("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hA:{"^":"d;a,b",
gf1:function(){return this.b.index},
gfU:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbg:1},
pL:{"^":"c3;a,b,c",
gZ:function(a){return new H.hr(this.a,this.b,this.c,null)},
$asc3:function(){return[P.bg]},
$asw:function(){return[P.bg]}},
hr:{"^":"d;a,b,c,d",
gG:function(){return this.d},
t:function(){var z,y,x,w
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
h2:{"^":"d;f1:a<,b,c",
gfU:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.ca(b,null,null))
return this.c},
$isbg:1},
qJ:{"^":"w;a,b,c",
gZ:function(a){return new H.qK(this.a,this.b,this.c,null)},
$asw:function(){return[P.bg]}},
qK:{"^":"d;a,b,c,d",
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
this.d=new H.h2(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
tE:function(a){var z=H.q(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uj:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pM:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rf()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d9(new P.pO(z),1)).observe(y,{childList:true})
return new P.pN(z,y,x)}else if(self.setImmediate!=null)return P.rg()
return P.rh()},
wa:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d9(new P.pP(a),0))},"$1","rf",2,0,13],
wb:[function(a){++init.globalState.f.b
self.setImmediate(H.d9(new P.pQ(a),0))},"$1","rg",2,0,13],
wc:[function(a){P.e1(C.w,a)},"$1","rh",2,0,13],
aD:function(a,b){P.ef(null,a)
return b.gfY()},
av:function(a,b){P.ef(a,b)},
aC:function(a,b){b.bU(a)},
aB:function(a,b){b.ex(H.A(a),H.C(a))},
ef:function(a,b){var z,y,x,w
z=new P.qU(b)
y=new P.qV(b)
x=J.o(a)
if(!!x.$isF)a.ep(z,y)
else if(!!x.$isP)a.eQ(z,y)
else{w=new P.F(0,$.p,null,[null])
w.a=4
w.c=a
w.ep(z,null)}},
aw:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.rd(z)},
d4:function(a,b,c){var z,y,x
if(b===0){if(c.geD())c.c.ew()
else c.a.bm()
return}else if(b===1){if(c.geD())c.c.ex(H.A(a),H.C(a))
else{z=H.A(a)
y=H.C(a)
c.a.es(z,y)
c.a.bm()}return}if(a instanceof P.bL){if(c.geD()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.df(c.a,z)
P.cr(new P.qS(b,c))
return}else if(z===1){x=a.a
c.a.jj(x,!1).c_(new P.qT(b,c))
return}}P.ef(a,b)},
rc:function(a){return a.gdX()},
ei:function(a,b){if(H.ax(a,{func:1,args:[P.as,P.as]})){b.toString
return a}else{b.toString
return a}},
az:function(a){return new P.qL(new P.F(0,$.p,null,[a]),[a])},
r2:function(a,b,c){$.p.toString
a.bc(b,c)},
r6:function(){var z,y
for(;z=$.bq,z!=null;){$.bP=null
y=z.gci()
$.bq=y
if(y==null)$.bO=null
z.gjl().$0()}},
wf:[function(){$.eg=!0
try{P.r6()}finally{$.bP=null
$.eg=!1
if($.bq!=null)$.$get$e5().$1(P.hU())}},"$0","hU",0,0,7],
hO:function(a){var z=new P.hs(a,null)
if($.bq==null){$.bO=z
$.bq=z
if(!$.eg)$.$get$e5().$1(P.hU())}else{$.bO.b=z
$.bO=z}},
rb:function(a){var z,y,x
z=$.bq
if(z==null){P.hO(a)
$.bP=$.bO
return}y=new P.hs(a,null)
x=$.bP
if(x==null){y.b=z
$.bP=y
$.bq=y}else{y.b=x.b
x.b=y
$.bP=y
if(y.b==null)$.bO=y}},
cr:function(a){var z=$.p
if(C.h===z){P.bs(null,null,C.h,a)
return}z.toString
P.bs(null,null,z,z.ev(a,!0))},
w6:function(a,b){return new P.qI(null,a,!1,[b])},
ej:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.A(x)
y=H.C(x)
w=$.p
w.toString
P.br(null,null,w,z,y)}},
r7:[function(a,b){var z=$.p
z.toString
P.br(null,null,z,a,b)},function(a){return P.r7(a,null)},"$2","$1","rj",2,2,16,0],
we:[function(){},"$0","ri",0,0,7],
hN:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.A(u)
y=H.C(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbo()
w=t
v=x.gbj()
c.$2(w,v)}}},
qW:function(a,b,c,d){var z=a.cb()
if(!!J.o(z).$isP&&z!==$.$get$be())z.c1(new P.qY(b,c,d))
else b.bc(c,d)},
hC:function(a,b){return new P.qX(a,b)},
hD:function(a,b,c){var z=a.cb()
if(!!J.o(z).$isP&&z!==$.$get$be())z.c1(new P.qZ(b,c))
else b.bb(c)},
qR:function(a,b,c){$.p.toString
a.c7(b,c)},
p9:function(a,b){var z=$.p
if(z===C.h){z.toString
return P.e1(a,b)}return P.e1(a,z.ev(b,!0))},
e1:function(a,b){var z=C.e.bJ(a.a,1000)
return H.p6(z<0?0:z,b)},
po:function(){return $.p},
br:function(a,b,c,d,e){var z={}
z.a=d
P.rb(new P.r9(z,e))},
hK:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hM:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hL:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bs:function(a,b,c,d){var z=C.h!==c
if(z)d=c.ev(d,!(!z||!1))
P.hO(d)},
pO:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pN:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pP:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pQ:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qU:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qV:{"^":"a:21;a",
$2:function(a,b){this.a.$2(1,new H.dp(a,b))}},
rd:{"^":"a:50;a",
$2:function(a,b){this.a(a,b)}},
qS:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcS()){z.b=!0
return}this.a.$2(null,0)}},
qT:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pR:{"^":"d;a,b,c",
gdX:function(){return this.a.gdX()},
gcS:function(){return this.a.gcS()},
geD:function(){return this.c!=null},
q:function(a,b){return J.df(this.a,b)},
es:function(a,b){return this.a.es(a,b)},
bm:function(){return this.a.bm()},
i5:function(a){var z=new P.pU(a)
this.a=new P.pZ(null,0,null,new P.pW(z),null,new P.pX(this,z),new P.pY(this,a),[null])},
v:{
pS:function(a){var z=new P.pR(null,!1,null)
z.i5(a)
return z}}},
pU:{"^":"a:1;a",
$0:function(){P.cr(new P.pV(this.a))}},
pV:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pW:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pX:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
pY:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gkc()){z.c=new P.ch(new P.F(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cr(new P.pT(this.b))}return z.c.gfY()}}},
pT:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bL:{"^":"d;a8:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bM:function(a){return new P.bL(a,1)},
aL:function(){return C.af},
hx:function(a){return new P.bL(a,0)},
aM:function(a){return new P.bL(a,3)}}},
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
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.af(z)
if(!!w.$isb6){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qM:{"^":"c3;a",
gZ:function(a){return new P.b6(this.a(),null,null,null)},
$asc3:I.b9,
$asw:I.b9,
v:{
aN:function(a){return new P.qM(a)}}},
P:{"^":"d;$ti"},
hu:{"^":"d;fY:a<,$ti",
ex:function(a,b){if(a==null)a=new P.cP()
if(this.a.a!==0)throw H.c(new P.y("Future already completed"))
$.p.toString
this.bc(a,b)},
du:function(a){return this.ex(a,null)}},
ch:{"^":"hu;a,$ti",
bU:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.y("Future already completed"))
z.bz(a)},
ew:function(){return this.bU(null)},
bc:function(a,b){this.a.f8(a,b)}},
qL:{"^":"hu;a,$ti",
bU:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.y("Future already completed"))
z.bb(a)},
ew:function(){return this.bU(null)},
bc:function(a,b){this.a.bc(a,b)}},
ea:{"^":"d;eg:a<,b,c,d,e,$ti",
gj3:function(){return this.b.b},
gh_:function(){return(this.c&1)!==0},
gjT:function(){return(this.c&2)!==0},
gfZ:function(){return this.c===8},
jR:function(a){return this.b.b.eP(this.d,a)},
km:function(a){if(this.c!==6)return!0
return this.b.b.eP(this.d,a.gbo())},
jN:function(a){var z,y
z=this.e
y=this.b.b
if(H.ax(z,{func:1,args:[,,]}))return y.kJ(z,a.gbo(),a.gbj())
else return y.eP(z,a.gbo())},
jS:function(){return this.b.b.hn(this.d)}},
F:{"^":"d;cG:a<,b,iS:c<,$ti",
giD:function(){return this.a===2},
gec:function(){return this.a>=4},
eQ:function(a,b){var z=$.p
if(z!==C.h){z.toString
if(b!=null)b=P.ei(b,z)}return this.ep(a,b)},
c_:function(a){return this.eQ(a,null)},
ep:function(a,b){var z,y
z=new P.F(0,$.p,null,[null])
y=b==null?1:3
this.df(new P.ea(null,z,y,a,b,[H.m(this,0),null]))
return z},
c1:function(a){var z,y
z=$.p
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.df(new P.ea(null,y,8,a,null,[z,z]))
return y},
df:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gec()){y.df(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bs(null,null,z,new P.q8(this,a))}},
fs:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.geg()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gec()){v.fs(a)
return}this.a=v.a
this.c=v.c}z.a=this.dm(a)
y=this.b
y.toString
P.bs(null,null,y,new P.qf(z,this))}},
dl:function(){var z=this.c
this.c=null
return this.dm(z)},
dm:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.geg()
z.a=y}return y},
bb:function(a){var z,y
z=this.$ti
if(H.aO(a,"$isP",z,"$asP"))if(H.aO(a,"$isF",z,null))P.d2(a,this)
else P.hw(a,this)
else{y=this.dl()
this.a=4
this.c=a
P.bo(this,y)}},
bc:[function(a,b){var z=this.dl()
this.a=8
this.c=new P.cx(a,b)
P.bo(this,z)},function(a){return this.bc(a,null)},"l1","$2","$1","gbQ",2,2,16,0],
bz:function(a){var z
if(H.aO(a,"$isP",this.$ti,"$asP")){this.ih(a)
return}this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qa(this,a))},
ih:function(a){var z
if(H.aO(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qe(this,a))}else P.d2(a,this)
return}P.hw(a,this)},
f8:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.q9(this,a,b))},
i7:function(a,b){this.a=4
this.c=a},
$isP:1,
v:{
hw:function(a,b){var z,y,x
b.a=1
try{a.eQ(new P.qb(b),new P.qc(b))}catch(x){z=H.A(x)
y=H.C(x)
P.cr(new P.qd(b,z,y))}},
d2:function(a,b){var z,y,x
for(;a.giD();)a=a.c
z=a.gec()
y=b.c
if(z){b.c=null
x=b.dm(y)
b.a=a.a
b.c=a.c
P.bo(b,x)}else{b.a=2
b.c=a
a.fs(y)}},
bo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbo()
t=v.gbj()
y.toString
P.br(null,null,y,u,t)}return}for(;b.geg()!=null;b=s){s=b.a
b.a=null
P.bo(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gh_()||b.gfZ()){q=b.gj3()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbo()
t=v.gbj()
y.toString
P.br(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfZ())new P.qi(z,x,w,b).$0()
else if(y){if(b.gh_())new P.qh(x,b,r).$0()}else if(b.gjT())new P.qg(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.o(y).$isP){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dm(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d2(y,o)
return}}o=b.b
b=o.dl()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
q8:{"^":"a:1;a,b",
$0:function(){P.bo(this.a,this.b)}},
qf:{"^":"a:1;a,b",
$0:function(){P.bo(this.b,this.a.a)}},
qb:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bb(a)}},
qc:{"^":"a:49;a",
$2:function(a,b){this.a.bc(a,b)},
$1:function(a){return this.$2(a,null)}},
qd:{"^":"a:1;a,b,c",
$0:function(){this.a.bc(this.b,this.c)}},
qa:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.dl()
z.a=4
z.c=this.b
P.bo(z,y)}},
qe:{"^":"a:1;a,b",
$0:function(){P.d2(this.b,this.a)}},
q9:{"^":"a:1;a,b,c",
$0:function(){this.a.bc(this.b,this.c)}},
qi:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jS()}catch(w){y=H.A(w)
x=H.C(w)
if(this.c){v=this.a.a.c.gbo()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cx(y,x)
u.a=!0
return}if(!!J.o(z).$isP){if(z instanceof P.F&&z.gcG()>=4){if(z.gcG()===8){v=this.b
v.b=z.giS()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c_(new P.qj(t))
v.a=!1}}},
qj:{"^":"a:0;a",
$1:function(a){return this.a}},
qh:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jR(this.c)}catch(x){z=H.A(x)
y=H.C(x)
w=this.a
w.b=new P.cx(z,y)
w.a=!0}}},
qg:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.km(z)===!0&&w.e!=null){v=this.b
v.b=w.jN(z)
v.a=!1}}catch(u){y=H.A(u)
x=H.C(u)
w=this.a
v=w.a.c.gbo()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cx(y,x)
s.a=!0}}},
hs:{"^":"d;jl:a<,ci:b@"},
ai:{"^":"d;$ti",
aD:function(a,b){return new P.qx(b,this,[H.z(this,"ai",0),null])},
a6:function(a,b){var z,y
z={}
y=new P.F(0,$.p,null,[P.a0])
z.a=null
z.a=this.aC(new P.oA(z,this,b,y),!0,new P.oB(y),y.gbQ())
return y},
V:function(a,b){var z,y
z={}
y=new P.F(0,$.p,null,[null])
z.a=null
z.a=this.aC(new P.oE(z,this,b,y),!0,new P.oF(y),y.gbQ())
return y},
gl:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[P.t])
z.a=0
this.aC(new P.oK(z),!0,new P.oL(z,y),y.gbQ())
return y},
gU:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[P.a0])
z.a=null
z.a=this.aC(new P.oG(z,y),!0,new P.oH(y),y.gbQ())
return y},
cp:function(a){var z,y,x
z=H.z(this,"ai",0)
y=H.q([],[z])
x=new P.F(0,$.p,null,[[P.L,z]])
this.aC(new P.oM(this,y),!0,new P.oN(y,x),x.gbQ())
return x},
bF:function(a){var z,y,x
z=H.z(this,"ai",0)
y=P.Y(null,null,null,z)
x=new P.F(0,$.p,null,[[P.bF,z]])
this.aC(new P.oO(this,y),!0,new P.oP(y,x),x.gbQ())
return x},
gw:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[H.z(this,"ai",0)])
z.a=null
z.b=!1
this.aC(new P.oI(z,this),!0,new P.oJ(z,y),y.gbQ())
return y}},
oA:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hN(new P.oy(this.c,a),new P.oz(z,y),P.hC(z.a,y))},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oy:{"^":"a:1;a,b",
$0:function(){return J.e(this.b,this.a)}},
oz:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hD(this.a.a,this.b,!0)}},
oB:{"^":"a:1;a",
$0:function(){this.a.bb(!1)}},
oE:{"^":"a;a,b,c,d",
$1:function(a){P.hN(new P.oC(this.c,a),new P.oD(),P.hC(this.a.a,this.d))},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oC:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
oD:{"^":"a:0;",
$1:function(a){}},
oF:{"^":"a:1;a",
$0:function(){this.a.bb(null)}},
oK:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oL:{"^":"a:1;a,b",
$0:function(){this.b.bb(this.a.a)}},
oG:{"^":"a:0;a,b",
$1:function(a){P.hD(this.a.a,this.b,!1)}},
oH:{"^":"a:1;a",
$0:function(){this.a.bb(!0)}},
oM:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"ai")}},
oN:{"^":"a:1;a,b",
$0:function(){this.b.bb(this.a)}},
oO:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"ai")}},
oP:{"^":"a:1;a,b",
$0:function(){this.b.bb(this.a)}},
oI:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oJ:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bb(x.a)
return}try{x=H.ag()
throw H.c(x)}catch(w){z=H.A(w)
y=H.C(w)
P.r2(this.b,z,y)}}},
d3:{"^":"d;cG:b<,$ti",
gdX:function(){return new P.d0(this,this.$ti)},
gkc:function(){return(this.b&4)!==0},
gcS:function(){var z=this.b
return(z&1)!==0?this.gbI().gfn():(z&2)===0},
giL:function(){if((this.b&8)===0)return this.a
return this.a.gd3()},
e5:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ed(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd3()==null)y.c=new P.ed(null,null,0,this.$ti)
return y.c},
gbI:function(){if((this.b&8)!==0)return this.a.gd3()
return this.a},
cu:function(){if((this.b&4)!==0)return new P.y("Cannot add event after closing")
return new P.y("Cannot add event while adding a stream")},
jj:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cu())
if((z&2)!==0){z=new P.F(0,$.p,null,[null])
z.bz(null)
return z}z=this.a
y=new P.F(0,$.p,null,[null])
x=a.aC(this.gie(),!1,this.gig(),this.gia())
w=this.b
if((w&1)!==0?this.gbI().gfn():(w&2)===0)x.cV()
this.a=new P.qE(z,y,x,this.$ti)
this.b|=8
return y},
ff:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$be():new P.F(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cu())
this.bP(b)},"$1","gj6",2,0,function(){return H.b7(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d3")}],
es:function(a,b){if(this.b>=4)throw H.c(this.cu())
if(a==null)a=new P.cP()
$.p.toString
this.c7(a,b)},
bm:function(){var z=this.b
if((z&4)!==0)return this.ff()
if(z>=4)throw H.c(this.cu())
z|=4
this.b=z
if((z&1)!==0)this.cE()
else if((z&3)===0)this.e5().q(0,C.u)
return this.ff()},
bP:[function(a){var z=this.b
if((z&1)!==0)this.cD(a)
else if((z&3)===0)this.e5().q(0,new P.e6(a,null,this.$ti))},"$1","gie",2,0,function(){return H.b7(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d3")}],
c7:[function(a,b){var z=this.b
if((z&1)!==0)this.cF(a,b)
else if((z&3)===0)this.e5().q(0,new P.e7(a,b,null))},"$2","gia",4,0,47],
e_:[function(){var z=this.a
this.a=z.gd3()
this.b&=4294967287
z.a.bz(null)},"$0","gig",0,0,7],
iZ:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.y("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.q2(this,null,null,null,z,y,null,null,this.$ti)
x.f5(a,b,c,d,H.m(this,0))
w=this.giL()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd3(x)
v.b.cZ()}else this.a=x
x.iX(w)
x.ea(new P.qG(this))
return x},
iP:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.cb()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.A(v)
x=H.C(v)
u=new P.F(0,$.p,null,[null])
u.f8(y,x)
z=u}else z=z.c1(w)
w=new P.qF(this)
if(z!=null)z=z.c1(w)
else w.$0()
return z}},
qG:{"^":"a:1;a",
$0:function(){P.ej(this.a.d)}},
qF:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bz(null)}},
qO:{"^":"d;$ti",
cD:function(a){this.gbI().bP(a)},
cF:function(a,b){this.gbI().c7(a,b)},
cE:function(){this.gbI().e_()}},
q_:{"^":"d;$ti",
cD:function(a){this.gbI().c8(new P.e6(a,null,[H.m(this,0)]))},
cF:function(a,b){this.gbI().c8(new P.e7(a,b,null))},
cE:function(){this.gbI().c8(C.u)}},
pZ:{"^":"d3+q_;a,b,c,d,e,f,r,$ti"},
qN:{"^":"d3+qO;a,b,c,d,e,f,r,$ti"},
d0:{"^":"qH;a,$ti",
gA:function(a){return(H.aA(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d0))return!1
return b.a===this.a}},
q2:{"^":"ci;x,a,b,c,d,e,f,r,$ti",
eh:function(){return this.x.iP(this)},
ej:[function(){var z=this.x
if((z.b&8)!==0)z.a.cV()
P.ej(z.e)},"$0","gei",0,0,7],
el:[function(){var z=this.x
if((z.b&8)!==0)z.a.cZ()
P.ej(z.f)},"$0","gek",0,0,7]},
pJ:{"^":"d;$ti",
cV:function(){this.b.cV()},
cZ:function(){this.b.cZ()},
cb:function(){var z=this.b.cb()
if(z==null){this.a.bz(null)
return}return z.c1(new P.pK(this))},
ew:function(){this.a.bz(null)}},
pK:{"^":"a:1;a",
$0:function(){this.a.a.bz(null)}},
qE:{"^":"pJ;d3:c@,a,b,$ti"},
ci:{"^":"d;cG:e<,$ti",
iX:function(a){if(a==null)return
this.r=a
if(!a.gU(a)){this.e=(this.e|64)>>>0
this.r.d7(this)}},
ks:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fM()
if((z&4)===0&&(this.e&32)===0)this.ea(this.gei())},
cV:function(){return this.ks(null)},
cZ:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gU(z)}else z=!1
if(z)this.r.d7(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.ea(this.gek())}}}},
cb:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e0()
z=this.f
return z==null?$.$get$be():z},
gfn:function(){return(this.e&4)!==0},
gcS:function(){return this.e>=128},
e0:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fM()
if((this.e&32)===0)this.r=null
this.f=this.eh()},
bP:["hU",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cD(a)
else this.c8(new P.e6(a,null,[H.z(this,"ci",0)]))}],
c7:["hV",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cF(a,b)
else this.c8(new P.e7(a,b,null))}],
e_:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cE()
else this.c8(C.u)},
ej:[function(){},"$0","gei",0,0,7],
el:[function(){},"$0","gek",0,0,7],
eh:function(){return},
c8:function(a){var z,y
z=this.r
if(z==null){z=new P.ed(null,null,0,[H.z(this,"ci",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d7(this)}},
cD:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hq(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e2((z&4)!==0)},
cF:function(a,b){var z,y
z=this.e
y=new P.q1(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e0()
z=this.f
if(!!J.o(z).$isP&&z!==$.$get$be())z.c1(y)
else y.$0()}else{y.$0()
this.e2((z&4)!==0)}},
cE:function(){var z,y
z=new P.q0(this)
this.e0()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isP&&y!==$.$get$be())y.c1(z)
else z.$0()},
ea:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e2((z&4)!==0)},
e2:function(a){var z,y
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
if(y)this.ej()
else this.el()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d7(this)},
f5:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ei(b==null?P.rj():b,z)
this.c=c==null?P.ri():c}},
q1:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ax(y,{func:1,args:[P.d,P.aT]})
w=z.d
v=this.b
u=z.b
if(x)w.kK(u,v,this.c)
else w.hq(u,v)
z.e=(z.e&4294967263)>>>0}},
q0:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ho(z.c)
z.e=(z.e&4294967263)>>>0}},
qH:{"^":"ai;$ti",
aC:function(a,b,c,d){return this.a.iZ(a,d,c,!0===b)},
eK:function(a,b,c){return this.aC(a,null,b,c)}},
e8:{"^":"d;ci:a@,$ti"},
e6:{"^":"e8;a8:b<,a,$ti",
eL:function(a){a.cD(this.b)}},
e7:{"^":"e8;bo:b<,bj:c<,a",
eL:function(a){a.cF(this.b,this.c)},
$ase8:I.b9},
q3:{"^":"d;",
eL:function(a){a.cE()},
gci:function(){return},
sci:function(a){throw H.c(new P.y("No events after a done."))}},
qz:{"^":"d;cG:a<,$ti",
d7:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cr(new P.qA(this,a))
this.a=1},
fM:function(){if(this.a===1)this.a=3}},
qA:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gci()
z.b=w
if(w==null)z.c=null
x.eL(this.b)}},
ed:{"^":"qz;b,c,a,$ti",
gU:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sci(b)
this.c=b}}},
qI:{"^":"d;a,b,c,$ti"},
qY:{"^":"a:1;a,b,c",
$0:function(){return this.a.bc(this.b,this.c)}},
qX:{"^":"a:21;a,b",
$2:function(a,b){P.qW(this.a,this.b,a,b)}},
qZ:{"^":"a:1;a,b",
$0:function(){return this.a.bb(this.b)}},
e9:{"^":"ai;$ti",
aC:function(a,b,c,d){return this.ip(a,d,c,!0===b)},
eK:function(a,b,c){return this.aC(a,null,b,c)},
ip:function(a,b,c,d){return P.q7(this,a,b,c,d,H.z(this,"e9",0),H.z(this,"e9",1))},
fk:function(a,b){b.bP(a)},
iB:function(a,b,c){c.c7(a,b)},
$asai:function(a,b){return[b]}},
hv:{"^":"ci;x,y,a,b,c,d,e,f,r,$ti",
bP:function(a){if((this.e&2)!==0)return
this.hU(a)},
c7:function(a,b){if((this.e&2)!==0)return
this.hV(a,b)},
ej:[function(){var z=this.y
if(z==null)return
z.cV()},"$0","gei",0,0,7],
el:[function(){var z=this.y
if(z==null)return
z.cZ()},"$0","gek",0,0,7],
eh:function(){var z=this.y
if(z!=null){this.y=null
return z.cb()}return},
l3:[function(a){this.x.fk(a,this)},"$1","giy",2,0,function(){return H.b7(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hv")}],
l5:[function(a,b){this.x.iB(a,b,this)},"$2","giA",4,0,46],
l4:[function(){this.e_()},"$0","giz",0,0,7],
i6:function(a,b,c,d,e,f,g){this.y=this.x.a.eK(this.giy(),this.giz(),this.giA())},
$asci:function(a,b){return[b]},
v:{
q7:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.hv(a,null,null,null,null,z,y,null,null,[f,g])
y.f5(b,c,d,e,g)
y.i6(a,b,c,d,e,f,g)
return y}}},
qx:{"^":"e9;b,a,$ti",
fk:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.A(w)
x=H.C(w)
P.qR(b,y,x)
return}b.bP(z)}},
cx:{"^":"d;bo:a<,bj:b<",
k:function(a){return H.b(this.a)},
$isa2:1},
qQ:{"^":"d;"},
r9:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cP()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
qB:{"^":"qQ;",
ho:function(a){var z,y,x,w
try{if(C.h===$.p){x=a.$0()
return x}x=P.hK(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.C(w)
x=P.br(null,null,this,z,y)
return x}},
hq:function(a,b){var z,y,x,w
try{if(C.h===$.p){x=a.$1(b)
return x}x=P.hM(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.C(w)
x=P.br(null,null,this,z,y)
return x}},
kK:function(a,b,c){var z,y,x,w
try{if(C.h===$.p){x=a.$2(b,c)
return x}x=P.hL(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.C(w)
x=P.br(null,null,this,z,y)
return x}},
ev:function(a,b){if(b)return new P.qC(this,a)
else return new P.qD(this,a)},
j:function(a,b){return},
hn:function(a){if($.p===C.h)return a.$0()
return P.hK(null,null,this,a)},
eP:function(a,b){if($.p===C.h)return a.$1(b)
return P.hM(null,null,this,a,b)},
kJ:function(a,b,c){if($.p===C.h)return a.$2(b,c)
return P.hL(null,null,this,a,b,c)}},
qC:{"^":"a:1;a,b",
$0:function(){return this.a.ho(this.b)}},
qD:{"^":"a:1;a,b",
$0:function(){return this.a.hn(this.b)}}}],["","",,P,{"^":"",
dC:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])},
aJ:function(){return new H.Q(0,null,null,null,null,null,0,[null,null])},
ab:function(a){return H.tF(a,new H.Q(0,null,null,null,null,null,0,[null,null]))},
lN:function(a,b,c){var z,y
if(P.eh(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bQ()
y.push(a)
try{P.r5(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h1(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c4:function(a,b,c){var z,y,x
if(P.eh(a))return b+"..."+c
z=new P.bJ(b)
y=$.$get$bQ()
y.push(a)
try{x=z
x.B=P.h1(x.gB(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.B=y.gB()+c
y=z.gB()
return y.charCodeAt(0)==0?y:y},
eh:function(a){var z,y
for(z=0;y=$.$get$bQ(),z<y.length;++z)if(a===y[z])return!0
return!1},
r5:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
m8:function(a,b,c,d,e){return new H.Q(0,null,null,null,null,null,0,[d,e])},
c8:function(a,b,c){var z=P.m8(null,null,null,b,c)
a.V(0,new P.rl(z))
return z},
Y:function(a,b,c,d){return new P.hy(0,null,null,null,null,null,0,[d])},
b0:function(a,b){var z,y
z=P.Y(null,null,null,b)
for(y=J.af(a);y.t();)z.q(0,y.gG())
return z},
dH:function(a){var z,y,x
z={}
if(P.eh(a))return"{...}"
y=new P.bJ("")
try{$.$get$bQ().push(a)
x=y
x.B=x.gB()+"{"
z.a=!0
a.V(0,new P.mj(z,y))
z=y
z.B=z.gB()+"}"}finally{z=$.$get$bQ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gB()
return z.charCodeAt(0)==0?z:z},
hz:{"^":"Q;a,b,c,d,e,f,r,$ti",
cQ:function(a){return H.ub(a)&0x3ffffff},
cR:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gh0()
if(x==null?b==null:x===b)return y}return-1},
v:{
bN:function(a,b){return new P.hz(0,null,null,null,null,null,0,[a,b])}}},
hy:{"^":"qk;a,b,c,d,e,f,r,$ti",
ef:function(){return new P.hy(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.aj(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gU:function(a){return this.a===0},
gao:function(a){return this.a!==0},
a6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.im(b)},
im:function(a){var z=this.d
if(z==null)return!1
return this.di(z[this.dh(a)],a)>=0},
cg:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a6(0,a)?a:null
else return this.iF(a)},
iF:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dh(a)]
x=this.di(y,a)
if(x<0)return
return J.ay(y,x).gfe()},
V:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.D(this))
z=z.b}},
gw:function(a){var z=this.f
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
x=y}return this.f9(x,b)}else return this.az(b)},
az:function(a){var z,y,x
z=this.d
if(z==null){z=P.qt()
this.d=z}y=this.dh(a)
x=z[y]
if(x==null)z[y]=[this.e3(a)]
else{if(this.di(x,a)>=0)return!1
x.push(this.e3(a))}return!0},
a2:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fa(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fa(this.c,b)
else return this.iQ(b)},
iQ:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dh(a)]
x=this.di(y,a)
if(x<0)return!1
this.fb(y.splice(x,1)[0])
return!0},
iv:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.D(this))
if(b===v)this.a2(0,y)}},
b3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
f9:function(a,b){if(a[b]!=null)return!1
a[b]=this.e3(b)
return!0},
fa:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fb(z)
delete a[b]
return!0},
e3:function(a){var z,y
z=new P.qs(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fb:function(a){var z,y
z=a.gil()
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
for(y=0;y<z;++y)if(J.e(a[y].gfe(),b))return y
return-1},
$isbF:1,
$isX:1,
$isw:1,
v:{
qt:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qs:{"^":"d;fe:a<,b,il:c<"},
aj:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qk:{"^":"o0;$ti",
bF:function(a){var z=this.ef()
z.ar(0,this)
return z}},
c3:{"^":"w;$ti"},
rl:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
fj:{"^":"fs;$ti"},
fs:{"^":"d+b1;$ti",$asL:null,$asX:null,$asw:null,$isL:1,$isX:1,$isw:1},
b1:{"^":"d;$ti",
gZ:function(a){return new H.dD(this,this.gl(this),0,null,[H.z(this,"b1",0)])},
as:function(a,b){return this.j(0,b)},
V:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gU:function(a){return this.gl(this)===0},
gao:function(a){return!this.gU(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ag())
return this.j(0,this.gl(this)-1)},
a6:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bT:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
be:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
aD:function(a,b){return new H.ap(this,b,[H.z(this,"b1",0),null])},
dW:function(a,b){return H.h3(this,b,null,H.z(this,"b1",0))},
bF:function(a){var z,y
z=P.Y(null,null,null,H.z(this,"b1",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a2:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.aV(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iu:function(a,b){var z,y,x,w
z=H.q([],[H.z(this,"b1",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hM(0,0,z.length,z)
this.sl(0,z.length)}},
aV:function(a,b,c,d,e){var z,y,x,w,v
P.cb(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aO(d,"$isL",[H.z(this,"b1",0)],"$asL")){y=e
x=d}else{x=J.iP(d,e).bE(0,!1)
y=0}w=J.J(x)
if(y+z>w.gl(x))throw H.c(H.f7())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hM:function(a,b,c,d){return this.aV(a,b,c,d,0)},
bN:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aT:function(a,b){return this.bN(a,b,0)},
k:function(a){return P.c4(this,"[","]")},
$isL:1,
$isX:1,
$isw:1},
qP:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.R("Cannot modify unmodifiable map"))},
$isG:1},
mh:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a7:function(a){return this.a.a7(a)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gao:function(a){var z=this.a
return z.gao(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hp:{"^":"mh+qP;a,$ti",$asG:null,$isG:1},
mj:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.B+=", "
z.a=!1
z=this.b
y=z.B+=H.b(a)
z.B=y+": "
z.B+=H.b(b)}},
m9:{"^":"aS;a,b,c,d,$ti",
gZ:function(a){return new P.ec(this,this.c,this.d,this.b,null,this.$ti)},
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
if(z===y)throw H.c(H.ag())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
as:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cK(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.az(b)},
ar:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aO(b,"$isL",z,"$asL")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.ma(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.q(v,z)
this.c=this.j2(s)
this.a=s
this.b=0
C.a.aV(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aV(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aV(v,z,z+r,b,0)
C.a.aV(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.ec(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.az(z.e)},
b3:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c4(this,"{","}")},
fH:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fj();++this.d},
dG:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ag());++this.d
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
if(this.b===x)this.fj();++this.d},
fj:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.q(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aV(y,0,w,z,x)
C.a.aV(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
j2:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aV(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aV(a,0,v,x,z)
C.a.aV(a,v,v+this.c,this.a,0)
return this.c+v}},
hY:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.q(z,[b])},
v:{
b2:function(a,b){var z=new P.m9(null,0,0,0,[b])
z.hY(a,b)
return z},
ma:function(a){var z
a=C.N.eY(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
ec:{"^":"d;a,b,c,d,e,$ti",
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
o1:{"^":"d;$ti",
gU:function(a){return this.a===0},
gao:function(a){return this.a!==0},
ar:function(a,b){var z
for(z=J.af(b);z.t();)this.q(0,z.gG())},
jq:function(a){var z,y
for(z=a.a,y=new P.aj(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a6(0,y.d))return!1
return!0},
bE:function(a,b){var z,y,x,w,v
z=H.q([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.aj(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cp:function(a){return this.bE(a,!0)},
aD:function(a,b){return new H.by(this,b,[H.m(this,0),null])},
k:function(a){return P.c4(this,"{","}")},
V:function(a,b){var z
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bp:function(a,b,c){var z,y
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gw:function(a){var z,y
z=new P.aj(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.ag())
do y=z.d
while(z.t())
return y},
be:function(a,b,c){var z,y
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ag())},
dw:function(a,b){return this.be(a,b,null)},
by:function(a,b){var z,y,x,w
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dt())
y=w
x=!0}}if(x)return y
throw H.c(H.ag())},
$isbF:1,
$isX:1,
$isw:1},
o0:{"^":"o1;$ti"}}],["","",,P,{"^":"",
d5:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qn(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d5(a[z])
return a},
r8:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.S(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.A(x)
w=String(y)
throw H.c(new P.f2(w,null,null))}w=P.d5(z)
return w},
wd:[function(a){return a.dK()},"$1","tj",2,0,0],
qn:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iO(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cw().length
return z},
gU:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cw().length
return z===0},
gao:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cw().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a7(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.j0().n(0,b,c)},
a7:function(a){if(this.b==null)return this.c.a7(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
V:function(a,b){var z,y,x,w
if(this.b==null)return this.c.V(0,b)
z=this.cw()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d5(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dH(this)},
cw:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
j0:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dC(P.r,null)
y=this.cw()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iO:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d5(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.r,null]}},
eW:{"^":"d;$ti"},
cD:{"^":"d;$ti"},
dy:{"^":"a2;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lS:{"^":"dy;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lR:{"^":"eW;a,b",
ju:function(a,b){var z=P.r8(a,this.gjv().a)
return z},
jt:function(a){return this.ju(a,null)},
jD:function(a,b){var z=this.gjE()
z=P.qp(a,z.b,z.a)
return z},
fT:function(a){return this.jD(a,null)},
gjE:function(){return C.Q},
gjv:function(){return C.P},
$aseW:function(){return[P.d,P.r]}},
lU:{"^":"cD;a,b",
$ascD:function(){return[P.d,P.r]}},
lT:{"^":"cD;a",
$ascD:function(){return[P.r,P.d]}},
qq:{"^":"d;",
hz:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cN(a,v)
if(u>92)continue
if(u<32){if(v>w)x.B+=C.b.aF(a,w,v)
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
break}}else if(u===34||u===92){if(v>w)x.B+=C.b.aF(a,w,v)
w=v+1
x.B+=H.aq(92)
x.B+=H.aq(u)}}if(w===0)x.B+=H.b(a)
else if(w<y)x.B+=z.aF(a,w,y)},
e1:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lS(a,null))}z.push(a)},
dN:function(a){var z,y,x,w
if(this.hy(a))return
this.e1(a)
try{z=this.b.$1(a)
if(!this.hy(z))throw H.c(new P.dy(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.A(w)
throw H.c(new P.dy(a,y))}},
hy:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.B+=C.j.k(a)
return!0}else if(a===!0){this.c.B+="true"
return!0}else if(a===!1){this.c.B+="false"
return!0}else if(a==null){this.c.B+="null"
return!0}else if(typeof a==="string"){z=this.c
z.B+='"'
this.hz(a)
z.B+='"'
return!0}else{z=J.o(a)
if(!!z.$isL){this.e1(a)
this.kX(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.e1(a)
y=this.kY(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
kX:function(a){var z,y,x
z=this.c
z.B+="["
y=J.J(a)
if(y.gl(a)>0){this.dN(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.B+=","
this.dN(y.j(a,x))}}z.B+="]"},
kY:function(a){var z,y,x,w,v,u,t
z={}
if(a.gU(a)){this.c.B+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.V(0,new P.qr(z,x))
if(!z.b)return!1
w=this.c
w.B+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.B+=v
this.hz(x[u])
w.B+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dN(x[t])}w.B+="}"
return!0}},
qr:{"^":"a:6;a,b",
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
qo:{"^":"qq;c,a,b",v:{
qp:function(a,b,c){var z,y,x
z=new P.bJ("")
y=new P.qo(z,[],P.tj())
y.dN(a)
x=z.B
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vD:[function(a,b){return J.bw(a,b)},"$2","tk",4,0,40],
f_:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kV(a)},
kV:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cR(a)},
cH:function(a){return new P.q6(a)},
O:function(a,b,c){var z,y
z=H.q([],[c])
for(y=J.af(a);y.t();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
mb:function(a,b,c,d){var z,y,x
z=H.q(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
b3:function(a,b){var z=P.O(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ev:function(a){H.uj(H.b(a))},
bi:function(a,b,c){return new H.dv(a,H.dw(a,!1,b,!1),null,null)},
a0:{"^":"d;"},
"+bool":0,
U:{"^":"d;$ti"},
cF:{"^":"d;j1:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cF))return!1
return this.a===b.a&&!0},
bB:function(a,b){return C.e.bB(this.a,b.gj1())},
gA:function(a){var z=this.a
return(z^C.e.dq(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.kc(H.n9(this))
y=P.bY(H.n7(this))
x=P.bY(H.n3(this))
w=P.bY(H.n4(this))
v=P.bY(H.n6(this))
u=P.bY(H.n8(this))
t=P.kd(H.n5(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjX()
y=new P.cF(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.E(y.gkn()))
return y},
gkn:function(){return this.a},
$isU:1,
$asU:function(){return[P.cF]},
v:{
kc:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
kd:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bY:function(a){if(a>=10)return""+a
return"0"+a}}},
aP:{"^":"K;",$isU:1,
$asU:function(){return[P.K]}},
"+double":0,
aZ:{"^":"d;bR:a<",
af:function(a,b){return new P.aZ(this.a+b.gbR())},
at:function(a,b){return new P.aZ(this.a-b.gbR())},
c3:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.aZ(C.j.hm(this.a*b))},
aR:function(a,b){return C.e.aR(this.a,b.gbR())},
b9:function(a,b){return this.a>b.gbR()},
d6:function(a,b){return this.a<=b.gbR()},
bO:function(a,b){return C.e.bO(this.a,b.gbR())},
gjX:function(){return C.e.bJ(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.aZ))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
bB:function(a,b){return C.e.bB(this.a,b.gbR())},
k:function(a){var z,y,x,w,v
z=new P.kC()
y=this.a
if(y<0)return"-"+new P.aZ(0-y).k(0)
x=z.$1(C.e.bJ(y,6e7)%60)
w=z.$1(C.e.bJ(y,1e6)%60)
v=new P.kB().$1(y%1e6)
return""+C.e.bJ(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eX:function(a){return new P.aZ(0-this.a)},
$isU:1,
$asU:function(){return[P.aZ]}},
kB:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kC:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a2:{"^":"d;",
gbj:function(){return H.C(this.$thrownJsError)}},
cP:{"^":"a2;",
k:function(a){return"Throw of null."}},
aY:{"^":"a2;a,b,h:c<,d",
ge7:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge6:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ge7()+y+x
if(!this.a)return w
v=this.ge6()
u=P.f_(this.b)
return w+v+": "+H.b(u)},
v:{
E:function(a){return new P.aY(!1,null,null,a)},
cw:function(a,b,c){return new P.aY(!0,a,b,c)},
l:function(a){return new P.aY(!1,null,a,"Must not be null")}}},
dW:{"^":"aY;e,f,a,b,c,d",
ge7:function(){return"RangeError"},
ge6:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
nf:function(a){return new P.dW(null,null,!1,null,null,a)},
ca:function(a,b,c){return new P.dW(null,null,!0,a,b,"Value not in range")},
a3:function(a,b,c,d,e){return new P.dW(b,c,!0,a,d,"Invalid value")},
ng:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a3(a,b,c,d,e))},
cb:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a3(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a3(b,a,c,"end",f))
return b}}},
lC:{"^":"aY;e,l:f>,a,b,c,d",
ge7:function(){return"RangeError"},
ge6:function(){if(J.bU(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cK:function(a,b,c,d,e){var z=e!=null?e:J.aH(b)
return new P.lC(b,z,!0,a,c,"Index out of range")}}},
R:{"^":"a2;a",
k:function(a){return"Unsupported operation: "+this.a}},
a4:{"^":"a2;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
y:{"^":"a2;a",
k:function(a){return"Bad state: "+this.a}},
D:{"^":"a2;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f_(z))+"."}},
mF:{"^":"d;",
k:function(a){return"Out of Memory"},
gbj:function(){return},
$isa2:1},
fX:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbj:function(){return},
$isa2:1},
kb:{"^":"a2;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
q6:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f2:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aF(x,0,75)+"..."
return y+"\n"+x}},
l_:{"^":"d;h:a<,fo,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fo
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cw(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dS(b,"expando$values")
return y==null?null:H.dS(y,z)},
n:function(a,b,c){var z,y
z=this.fo
if(typeof z!=="string")z.set(b,c)
else{y=H.dS(b,"expando$values")
if(y==null){y=new P.d()
H.fC(b,"expando$values",y)}H.fC(y,z,c)}}},
bz:{"^":"d;"},
t:{"^":"K;",$isU:1,
$asU:function(){return[P.K]}},
"+int":0,
w:{"^":"d;$ti",
aD:function(a,b){return H.bA(this,b,H.z(this,"w",0),null)},
c2:["de",function(a,b){return new H.H(this,b,[H.z(this,"w",0)])}],
a6:function(a,b){var z
for(z=this.gZ(this);z.t();)if(J.e(z.gG(),b))return!0
return!1},
V:function(a,b){var z
for(z=this.gZ(this);z.t();)b.$1(z.gG())},
bp:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.t();)y=c.$2(y,z.gG())
return y},
bE:function(a,b){return P.O(this,b,H.z(this,"w",0))},
cp:function(a){return this.bE(a,!0)},
bF:function(a){return P.b0(this,H.z(this,"w",0))},
gl:function(a){var z,y
z=this.gZ(this)
for(y=0;z.t();)++y
return y},
gU:function(a){return!this.gZ(this).t()},
gao:function(a){return!this.gU(this)},
dW:function(a,b){return H.o7(this,b,H.z(this,"w",0))},
gw:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ag())
do y=z.gG()
while(z.t())
return y},
gc5:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ag())
y=z.gG()
if(z.t())throw H.c(H.dt())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a3(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.t();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cK(b,this,"index",null,y))},
k:function(a){return P.lN(this,"(",")")}},
cM:{"^":"d;$ti"},
L:{"^":"d;$ti",$isw:1,$isX:1},
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
k:function(a){return H.cR(this)},
gbv:function(a){return new H.au(H.ia(this),null)},
toString:function(){return this.k(this)}},
bg:{"^":"d;"},
bF:{"^":"X;$ti"},
aT:{"^":"d;"},
r:{"^":"d;",$isU:1,
$asU:function(){return[P.r]},
$isdP:1},
"+String":0,
bJ:{"^":"d;B<",
gl:function(a){return this.B.length},
gU:function(a){return this.B.length===0},
gao:function(a){return this.B.length!==0},
k:function(a){var z=this.B
return z.charCodeAt(0)==0?z:z},
v:{
h1:function(a,b,c){var z=J.af(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.t())}else{a+=H.b(z.gG())
for(;z.t();)a=a+c+H.b(z.gG())}return a},
oS:function(a){return new P.bJ(a)}}}}],["","",,P,{"^":"",fO:{"^":"d;"}}],["","",,P,{"^":"",
cS:function(a){return C.J},
qm:{"^":"d;",
al:function(a){if(a<=0||a>4294967296)throw H.c(P.nf("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kp:function(){return Math.random()}}}],["","",,S,{"^":"",k0:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
a7:function(a){return this.b.a7(a)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){var z=this.b
return z.gU(z)},
gao:function(a){var z=this.b
return z.gao(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iH()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iH:function(){if(!this.a)return
this.a=!1
this.b=P.c8(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",k1:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cg:function(a){return this.b.cg(a)},
a6:function(a,b){return this.b.a6(0,b)},
V:function(a,b){return this.b.V(0,b)},
gU:function(a){return this.b.a===0},
gao:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.aj(z,z.r,null,null,[null])
y.c=z.e
return y},
gw:function(a){var z=this.b
return z.gw(z)},
aD:function(a,b){var z=this.b
z.toString
return new H.by(z,b,[H.m(z,0),null])},
bF:function(a){var z,y
z=this.b
y=z.ef()
y.ar(0,z)
return y},
q:function(a,b){this.io()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
io:function(){if(!this.a)return
this.a=!1
this.b=P.b0(this.b,H.m(this,0))},
$isbF:1,
$isX:1,
$isw:1}}],["","",,S,{"^":"",dk:{"^":"d;fq:a<,b,$ti",
Y:function(a){var z=new S.N(null,null,this.$ti)
z.ag()
z.m(this)
a.$1(z)
return z.p()},
gA:function(a){var z=this.b
if(z==null){z=X.bu(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdk)return!1
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
bN:function(a,b,c){var z=this.a
return(z&&C.a).bN(z,b,c)},
aT:function(a,b){return this.bN(a,b,0)},
gZ:function(a){var z=this.a
return new J.bc(z,z.length,0,null,[H.m(z,0)])},
aD:function(a,b){var z=this.a
z.toString
return new H.ap(z,b,[H.m(z,0),null])},
a6:function(a,b){var z=this.a
return(z&&C.a).a6(z,b)},
V:function(a,b){var z=this.a
return(z&&C.a).V(z,b)},
bF:function(a){var z=this.a
z.toString
return P.b0(z,H.m(z,0))},
gU:function(a){return this.a.length===0},
gao:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
ag:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new BuiltList<int>"'))},
$isw:1},N:{"^":"d;fq:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dk(z,null,this.$ti)
y.ag()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aO(a,"$isdk",this.$ti,null)){this.a=a.gfq()
this.b=a}else{this.a=P.O(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.E("null element"))
z=this.gen()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.E("null element"))
z=this.gen();(z&&C.a).q(z,b)},
a2:function(a,b){var z=this.gen();(z&&C.a).a2(z,b)},
aD:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bE(0,!0)
this.a=z
this.b=null
this.ii(z)},
gen:function(){if(this.b!=null){this.a=P.O(this.a,!0,H.m(this,0))
this.b=null}return this.a},
ag:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new ListBuilder<int>"'))},
ii:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.d8(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cA:{"^":"d;iG:a<,b,c,d,$ti",
Y:function(a){var z=new A.cO(null,null,this.$ti)
z.c9()
z.m(this)
a.$1(z)
return z.p()},
E:function(){return new S.k0(!0,this.a,this.$ti)},
gA:function(a){var z=this.b
if(z==null){z=this.a.gce()
z=H.bA(z,new A.jM(this),H.z(z,"w",0),null)
z=P.O(z,!1,H.z(z,"w",0))
C.a.f0(z)
z=X.bu(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscA)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gce()
this.c=z}z=z.gZ(z)
for(;z.t();){v=z.gG()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
V:function(a,b){this.a.V(0,b)},
gU:function(a){var z=this.a
return z.gU(z)},
gao:function(a){var z=this.a
return z.gao(z)},
gl:function(a){var z=this.a
return z.gl(z)},
c9:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.au(H.W(H.m(this,1)),null).u(0,C.o))throw H.c(new P.R('explicit value type required, for example "new BuiltMap<int, int>"'))}},jM:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d6(X.aU(X.aU(0,J.j(z)),J.j(y)))}},cO:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cA(this.a,null,null,null,this.$ti)
z.c9()
this.b=z}return z},
m:function(a){var z
if(H.aO(a,"$iscA",this.$ti,null)){this.b=a
this.a=a.giG()}else if(!!a.$iscA){z=P.c8(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.c8(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gbv(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.E("null value"))
this.giT().n(0,b,c)},
giT:function(){if(this.b!=null){this.a=P.c8(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
c9:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.au(H.W(H.m(this,1)),null).u(0,C.o))throw H.c(new P.R('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dl:{"^":"d;iV:a<,b,$ti",
Y:function(a){var z=new L.bj(null,null,this.$ti)
z.bA()
z.m(this)
a.$1(z)
return z.p()},
gA:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.O(new H.by(z,new L.jN(),[H.m(z,0),null]),!1,null)
C.a.f0(z)
z=X.bu(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdl)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gA(b)
x=this.gA(this)
if(z==null?x!=null:z!==x)return!1
return y.jq(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
cg:function(a){return this.a.cg(a)},
gZ:function(a){var z,y
z=this.a
y=new P.aj(z,z.r,null,null,[null])
y.c=z.e
return y},
aD:function(a,b){var z=this.a
z.toString
return new H.by(z,b,[H.m(z,0),null])},
a6:function(a,b){return this.a.a6(0,b)},
V:function(a,b){return this.a.V(0,b)},
bF:function(a){return new A.k1(!0,this.a,this.$ti)},
gU:function(a){return this.a.a===0},
gao:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
bA:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new BuiltSet<int>"'))},
$isw:1},jN:{"^":"a:0;",
$1:function(a){return J.j(a)}},bj:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dl(this.a,null,this.$ti)
z.bA()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aO(a,"$isdl",this.$ti,null)){this.a=a.giV()
this.b=a}else{z=H.m(this,0)
y=P.Y(null,null,null,z)
for(x=J.af(a);x.t();){w=x.gG()
if(H.d8(w,z))y.q(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.E("null element"))
this.gfA().q(0,b)},
aD:function(a,b){var z=this.a
z.toString
z=P.b0(new H.by(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iW(z)},
gfA:function(){if(this.b!=null){this.a=P.b0(this.a,H.m(this,0))
this.b=null}return this.a},
bA:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.R('explicit element type required, for example "new SetBuilder<int>"'))},
iW:function(a){var z,y,x
for(z=new P.aj(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d8(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
T:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nD:{"^":"nB;ch,cx,am:cy@,ba:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hd:function(){var z=$.$get$cs()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jZ:function(){var z,y,x,w
this.cx=null
this.cy=Z.bH("Health",new N.nG(),"#CCCCCC","Your physical state",100,0,!0,P.aP)
z=P.t
this.db=Z.bH("Stamina",new N.nH(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bH("Gold",new N.nI(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bR()
x=this.cy
w=this.db
y=new O.eZ(N.bf("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a_(H.q([],[Y.ac]),0,P.aJ()),x,w,z,O.up(),O.uo(),O.un(),y,this.ghP(),new P.bJ(""),!1,null)
y.hN()
this.cx=y
y.x="endGame"
$.$get$cn().q(0,0)},
i1:function(){var z,y
z=new O.cX([[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cX([new N.nF(this),[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cX(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nE:function(){var z,y,x,w
z=Z.bH("Health",new N.rW(),"#CCCCCC","Your physical state",100,0,!0,P.aP)
y=P.t
x=Z.bH("Stamina",new N.rX(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bH("Gold",new N.rY(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.r
z=new N.nD("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nJ(new H.Q(0,null,null,null,null,null,0,[w,O.cX])),null,null,null,P.Y(null,null,null,w),!1,null,-9999,null,null,null)
z.i1()
return z}}},rW:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d6(a,0.5))return"\ud83d\ude23"
if(z.aR(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},rX:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},rY:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nF:{"^":"a:19;a",
$0:function(){var z=0,y=P.az(),x=this
var $async$$0=P.aw(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:z=2
return P.av(x.a.cx.bu(),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},nG:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d6(a,0.5))return"\ud83d\ude23"
if(z.aR(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nH:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nI:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cG:{"^":"d;"},kS:{"^":"d;"},pt:{"^":"cG;a,b,c",
Y:function(a){var z=new M.e3(null,!1,0,0)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cG))return!1
return this.a===b.a&&this.b===b.b&&!0},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.M.gA(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},e3:{"^":"kS;d,a,b,c",
gcs:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gcs()
y=this.b
this.gcs()
x=this.c
this.gcs()
this.a
z=new M.pt(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
wh:[function(a){var z,y
z=a.gc4()
y=a.gbW()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","da",2,0,20],
ws:[function(a){var z,y,x
z=a.gc4()
y=a.gd_()
x=a.gbW()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","i0",2,0,20],
eZ:{"^":"md;y,z,Q,ch,cx,cy,db,dx,dy,bG:fr<,fx,f2:fy<,am:go<,ba:id<,k1,a,b,c,d,e,f,r,x",
hN:function(){var z,y,x,w,v,u
z=P.b3(C.p,null)
y=$.$get$co()
this.cy=R.aX(1000,"orc",O.da(),null,null,new G.b4("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.aX(1001,"goblin",O.da(),null,null,new G.b4("scimitar",1,1,!1,!0,!1,P.b3(C.p,null)),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.N(null,null,[Q.u])
y.ag()
y.m([new Q.u("start_adventure","","",null)])
this.dx=new K.cd(y.p(),"preStartBook",new O.kJ(),new O.kK(),null,null,"ground")
y=R.aX(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.C,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d5()
if(typeof y!=="number")return H.x(y)
this.go.sa8(z/y)
this.id.sa8(this.ch.fx)
this.k1.sa8(this.ch.r)
this.cx=R.aX(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a3,0,null)
this.dy=F.fJ(this.dx,!1)
y=K.cd
x=P.O($.$get$hQ(),!0,y)
C.a.ar(x,[this.dx,$.$get$en()])
w=new M.e3(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b0([z,v],R.I)
z=P.b2(null,O.cu)
u=new A.a9(v,P.Y(null,null,null,U.ao),w,z,P.b0(x,y),P.O([u],!0,S.a8),0,null)
this.fr=u
y=new Y.a_(H.q([],[Y.ac]),0,P.aJ())
y.b=u.r
this.fx=new B.bB(u,null,y,1,1,!0,!1,!1,0)},
d2:function(){var z=0,y=P.az(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d2=P.aw(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjC()
if(v.ha(u)){z=1
break}t=w.fr.X(w.ch.y)
s=t.gam()
r=t.gh5()
if(typeof s!=="number"){x=s.d5()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sa8(s/r)
w.id.sa8(t.gba())
r=w.k1
s=t.geW()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cg=!0}s=w.y
s.h2("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.D(0,"\n\n",!0)
if(w.fr.jU(w.ch.y))v.D(0,"TO BE CONTINUED.",!0)
else v.D(0,"You died.",!0)
w.f.B+=v.ck()
z=1
break}q=C.a.gw(r)
p=q.dQ(w.fr)
o=G.iV(p,w.fr)
z=3
return P.av(o.ku(),$async$d2)
case 3:r=o.f
if(r.gU(r)){n=o.a
m=o.b
n.eT("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gA(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bM(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mM(r)
i=new Z.mL(new P.hp(r,[null,null]),n)
if(r.gU(r))$.$get$bC().eT("Created with no recommendations.")
if(n.length===0){s.dU("No recommendation for "+H.b(p.gh()))
s.dU(new O.kM(w))
w.fr.fS(q.gi());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.ar)(n),++h);s.bM("planner.generateTable for "+H.b(p.gh()))
o.eU().V(0,new O.kN(w))
u=i.hc(q.gdB(),O.i0())
u.toString
g=P.O(u,!1,H.z(u,"w",0))
if(g.length!==0&&C.a.bT(g,new O.kO())){w.f.B+=v.ck()
C.a.sl(v.a,0)}v=new O.kP(new O.kR())
u=g.length-1
if(u-0<=32)H.fW(g,0,u,v)
else H.fV(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gW(),f.gK(),new O.kQ(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfR()
z=7
return P.av(w.ct(i.kt(s==null?O.i0():s),p,v),$async$d2)
case 7:case 5:v.ha(u)
case 1:return P.aC(x,y)}})
return P.aD($async$d2,y)},
ct:function(a,b,c){var z=0,y=P.az(),x,w=this,v,u,t
var $async$ct=P.aw(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:v=a.ds(b,w.fx,w.fr)
u=P.O(v,!0,H.z(v,"w",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.av(w.dg(a,b,u),$async$ct)
case 6:z=4
break
case 5:t=S.nd(new H.ap(u,new O.kG(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ar(c.a,w.fx.gf2().a)
w.fr=w.fx.gbG()
v=w.y
v.bM(new O.kH(a,b))
v.ah(new O.kI(w,b))
case 1:return P.aC(x,y)}})
return P.aD($async$ct,y)},
dg:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dg=P.aw(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=a.J(b,x.fr)
v=J.o(w)
z=v.u(w,1)?2:4
break
case 2:x.fx=C.a.gc5(c)
z=3
break
case 4:z=v.u(w,0)?5:7
break
case 5:x.fx=C.a.gc5(c)
z=6
break
case 7:u=C.a.gw(J.h(a.gM()).split("."))
v=v.kO(w)
t=a.ad(b,x.fr)
s=a.gP()&&b.jV(a.gM())
r="use "+H.b(u)
x.fu()
z=8
return P.av(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dg)
case 8:q=e
s=new H.H(c,new O.kD(q),[H.m(c,0)])
x.fx=s.gc5(s)
if(q.gkW()===!0){p=A.e2(x.fx.gbG())
p.a1(b.gi(),new O.kE())
v=x.fx
t=v.gfC()
s=H.q([],[Y.ac])
r=new Y.a_(s,0,P.aJ())
C.a.ar(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bB(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aC(null,y)}})
return P.aD($async$dg,y)}},
kJ:{"^":"a:3;",
$3:function(a,b,c){return c.D(0,"UNUSED because this is the first choice",!0)}},
kK:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.y("Room isn't to be revisited"))}},
kM:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kL(),[H.m(z,0),null]).cd(0," <- ")}},
kL:{"^":"a:0;",
$1:function(a){return a.gaM()}},
kN:{"^":"a:0;a",
$1:function(a){return this.a.y.bM(a)}},
kR:{"^":"a:41;",
$1:function(a){if(a instanceof Q.B)return H.b(a.b.gh())+" "+a.gW()
return"ZZZZZZ "+a.gW()}},
kO:{"^":"a:0;",
$1:function(a){return a.gW()!==""}},
kP:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bw(z.$1(a),z.$1(b))}},
kQ:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.az(),x=this,w
var $async$$0=P.aw(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.av(w.ct(x.c,x.b,w.fy),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},
kG:{"^":"a:0;",
$1:function(a){return a.gkv()}},
kH:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kI:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ap(z,new O.kF(),[H.m(z,0),null]).cd(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kF:{"^":"a:0;",
$1:function(a){return a.gaM()}},
kD:{"^":"a:0;a",
$1:function(a){return a.geF()===this.a.geF()}},
kE:{"^":"a:0;",
$1:function(a){var z=a.gba()
if(typeof z!=="number")return z.at()
a.sba(z-1)
return a}}}],["","",,Q,{"^":"",
i5:function(a,b,c){return P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i5(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.iS(t.aU(y.a,y),new Q.tR(z))
t=J.af(s.a),r=new H.bK(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gL()&&!z.eC(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
i6:function(a,b,c){return P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i6(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dS((t.length!==0?C.a.gw(t):null).gbC()).gjG().a,t=new J.bc(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
i7:function(a,b,c){return P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i7(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gw(t):null).gbn(),t=t.gZ(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
tR:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaN()}},
aa:{"^":"d;",
ds:function(a,b,c){var z=this
return P.aN(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$ds(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.J(y,x.gbG())
r=J.ak(s)
v=r.b9(s,0)?2:3
break
case 2:q=A.e2(w)
v=4
return B.fx(q,x,z,z.ic(q,y,w,z.gO(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aR(s,1)?5:6
break
case 5:q=A.e2(w)
p=z.ib(q,y,w,z.gN(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fx(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aL()
case 1:return P.aM(t)}}})},
f7:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.by(0,new Q.iT(b))
y=new O.eL(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().f=x
y.ga5().e=C.R
y.ga5().ch=f
y.ga5().Q=e
x=this.gL()
y.ga5().y=x
x=this.ga0()
y.ga5().z=x
if(!!this.$isB){x=y.ga5()
w=x.r
if(w==null){w=new L.bj(null,null,[P.t])
w.bA()
w.m(C.d)
x.r=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.E("null element"))
x.gfA().q(0,w)}v=new Y.a_(H.q([],[Y.ac]),0,P.aJ())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gA(a);(x.length!==0?C.a.gw(x):null).kq(a,v)
this.a=d.$3(z,a,v)
if(a.dj(u)!=null)a.fS(u);++a.r
w=a.eV(u)
if(!(w==null))w.h8(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dQ(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.da(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gw(x):null)==null)break
t=C.a.gw(x)
t.dD(a)
C.a.a2(x,t)}x=x.length!==0?C.a.gw(x):null
if(!(x==null))x.h9(a,v)
if(this.a==null)H.i(new P.y("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().d=x
x=a.r
y.ga5().x=x
a.d.fH(y.p())
return v},
ic:function(a,b,c,d,e){return this.f7(a,b,c,d,!1,e)},
ib:function(a,b,c,d,e){return this.f7(a,b,c,d,e,!1)}},
iT:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
B:{"^":"aa;bW:b<",
gW:function(){var z=new Y.a_(H.q([],[Y.ac]),0,P.aJ())
z.fE(0,this.ga9(),this.b)
return z.ck()},
ad:function(a,b){var z=new Y.a_(H.q([],[Y.ac]),0,P.aJ())
z.jb(0,this.gaj(),this.b,a,!0)
return z.ck()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga9()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
cI:{"^":"aa;",
gW:function(){return this.b.gW()},
k:function(a){return"ExitAction<"+this.b.gW()+">"}},
c2:{"^":"aa;",
gW:function(){var z=new Y.a_(H.q([],[Y.ac]),0,P.aJ())
z.fE(0,this.ga9(),this.b)
return z.ck()},
k:function(a){return"ItemAction<"+this.gW()+">"}},
nn:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"w3<"}}}],["","",,O,{"^":"",cu:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},m1:{"^":"d;a,b",
k:function(a){return this.b}},pp:{"^":"cu;a,eq:b<,aM:c<,d,cX:e<,f4:f<,T:r<,hv:x<,hw:y<,z,hx:Q<",
Y:function(a){var z=new O.eL(null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cu))return!1
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},eL:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
geq:function(){return this.ga5().c},
gaM:function(){return this.ga5().d},
gcX:function(){return this.ga5().f},
gf4:function(){var z,y
z=this.ga5()
y=z.r
if(y==null){y=new L.bj(null,null,[P.t])
y.bA()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gT:function(){return this.ga5().x},
ghv:function(){return this.ga5().y},
ghw:function(){return this.ga5().z},
ghx:function(){return this.ga5().ch},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bj(null,null,[H.m(z,0)])
y.bA()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bj(null,null,[H.m(z,0)])
y.bA()
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
if(z==null){y=this.ga5()
x=y.b
if(x==null){x=new L.bj(null,null,[P.t])
x.bA()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga5().c
w=this.ga5().d
v=this.ga5().e
u=this.ga5().f
t=this.ga5()
s=t.r
if(s==null){s=new L.bj(null,null,[P.t])
s.bA()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga5().x
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
z=new O.pp(y,x,w,v,u,t,s,r,q,p,o)
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
i8:function(a,b){return P.aN(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i8(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bM(new H.H(u,new R.tU(z),[H.m(u,0)]))
case 3:return P.aL()
case 1:return P.aM(v)}}})},
aX:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eM(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rR(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.p()},
tU:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfW()
y=this.a.gi()
return z==null?y==null:z===y}},
I:{"^":"mn;",
gfL:function(){return!0},
gbq:function(){var z=this.x
if(typeof z!=="number")return z.b9()
return z>0},
gb4:function(){return this.e instanceof K.c1},
gap:function(){return this.dy===C.i},
ga4:function(){return this.dy===C.f},
gaa:function(){return this.dy===C.k},
jV:function(a){var z=this.fx
if(typeof z!=="number")return z.bO()
return z>=1},
eC:function(a,b){return this.h1(a,b)>0},
h1:function(a,b){var z,y
if(this.eE(b)){z=a.gbh()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iC(a,b,10))return 1
z=a.gbh()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eE:function(a){var z,y
z=a.c0("Confuse",this,!0)
if(z==null)return!1
y=a.kL("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d9:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.X(this.y)
y=z.gam()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gbq())x-=10
y=z.e
if(!(y instanceof K.c1))x+=4
y=J.aW(y.ga8(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cx,w=[null],v=new P.aj(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aW(v.d.ga8(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.gZ(y),u=new H.bK(v,new R.jo(this),[H.m(y,0)]),t=0;u.t();){s=v.gG()
r=s.gaN()?2:0
q=s.gam()
if(typeof q!=="number")return H.x(q)
p=J.aW(s.e.ga8(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cx,q=new P.aj(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aW(q.d.ga8(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cv(x,t,y.bp(0,0,new R.jp(this,a)))},
iC:function(a,b,c){var z=b.kM(a,this,!0)
if(z==null)return!1
return z<=c},
$isb_:1},
mn:{"^":"d+dn;"},
rR:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gC().z=this.a
a.gC().dx=this.b
a.gC().dy=this.d
a.gC().fx=this.e
z=this.f
if(z==null)z=$.$get$em()
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
z=P.Y(null,null,null,null)
a.gC().cy=z
z=this.db
if(z!=null){y=new L.bm(null,null)
y.m(z)
z=y}else{z=$.$get$eu()
z.toString
y=new L.bm(null,null)
y.m(z)
z=y}a.gC().go=z
a.gC().d=this.cx
a.gC().r=this.cy
a.gC().c=this.dx
return a}},
jo:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gbh(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jp:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaN()?1:0
y=b.gam()
if(typeof y!=="number")return H.x(y)
return J.am(a,(z+y)*this.a.h1(b,this.b))}},
dQ:{"^":"d;a,b",
k:function(a){return this.b}},
pq:{"^":"I;a,fR:b<,bC:c<,ax:d<,a_:e<,fW:f<,eW:r<,am:x<,i:y<,z,cc:Q<,H:ch<,bD:cx<,h5:cy<,h:db<,bs:dx<,ai:dy<,a3:fr<,ba:fx<,bh:fy<",
Y:function(a){var z=new R.eM(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.I))return!1
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
if(z==null?y==null:z===y){z=this.fx
y=b.fx
z=(z==null?y==null:z===y)&&J.e(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisPlayer="+J.h(this.ch)+",\nitems="+J.h(this.cx)+",\nmaxHitpoints="+J.h(this.cy)+",\nname="+J.h(this.db)+",\nnameIsProperNoun="+J.h(this.dx)+",\npose="+J.h(this.dy)+",\npronoun="+J.h(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eM:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfR:function(){return this.gC().c},
gbC:function(){return this.gC().d},
sbC:function(a){this.gC().d=a
return a},
gax:function(){return this.gC().e},
sax:function(a){this.gC().e=a
return a},
ga_:function(){return this.gC().f},
sa_:function(a){this.gC().f=a
return a},
gfW:function(){return this.gC().r},
geW:function(){return this.gC().x},
gam:function(){return this.gC().y},
sam:function(a){this.gC().y=a
return a},
gi:function(){return this.gC().z},
gcc:function(){return this.gC().ch},
gH:function(){return this.gC().cx},
gbD:function(){return this.gC().cy},
gh5:function(){return this.gC().db},
gh:function(){return this.gC().dx},
sh:function(a){this.gC().dx=a
return a},
gbs:function(){return this.gC().dy},
gai:function(){return this.gC().fr},
sai:function(a){this.gC().fr=a
return a},
ga3:function(){return this.gC().fx},
gba:function(){return this.gC().fy},
sba:function(a){this.gC().fy=a
return a},
gbh:function(){var z,y
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
z=new R.pq(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",cv:{"^":"d;c4:a<,d_:b<,bW:c<",
at:function(a,b){return new A.an(this.a-b.gc4(),this.b-b.gd_(),J.bv(this.c,b.gbW()))},
k:function(a){return"ActorScore<self="+C.j.b8(this.a,2)+",team="+C.j.b8(this.b,2)+",enemy="+J.bW(this.c,2)+">"}},an:{"^":"d;c4:a<,d_:b<,bW:c<",
gke:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c3:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.an(this.a*b,this.b*b,J.bV(this.c,b))},
af:function(a,b){return new A.an(this.a+b.gc4(),this.b+b.gd_(),J.am(this.c,b.gbW()))},
d5:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.an(this.a/b,this.b/b,J.aW(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.b8(this.a,2)+",team="+C.j.b8(this.b,2)+",enemy="+J.bW(this.c,2)+">"},
v:{
jn:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.an(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
vz:function(a){switch(a){case C.x:return"fist"
case C.y:return"shield"
case C.L:return"spear"
case C.z:return"sword"}throw H.c(P.E(a))},
ao:{"^":"mo;",
gaM:function(){return U.vz(C.a.geA(this.a))},
gi:function(){return H.aA(this)},
gcc:function(){return!0},
gbq:function(){return!1},
gH:function(){return!1},
gbs:function(){return!1},
ga3:function(){return C.n},
gbh:function(){return $.$get$bb()},
$isb_:1},
mo:{"^":"d+dn;"},
cL:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c1:{"^":"b5;h:b<,a"}}],["","",,E,{"^":"",bk:{"^":"ao;h:b<,a",
ga8:function(){return 1},
$isb_:1}}],["","",,G,{"^":"",b4:{"^":"b5;h:b<,cr:c<,d0:d<,bs:e<,cL:f<,fK:r<,a"}}],["","",,L,{"^":"",b5:{"^":"ao;",
gfK:function(){return!1},
gcL:function(){return!1},
gkb:function(){return!1},
gbf:function(){return this.gcr()>0},
geG:function(){return this.gd0()>0},
gl:function(a){return 2},
gcr:function(){return 0},
gd0:function(){return 0},
ga8:function(){var z,y,x
z=this.gcr()
y=this.gd0()
x=this.gbs()?1:0
return 2+z+y+x},
$isb_:1}}],["","",,G,{"^":"",md:{"^":"d;",
fu:function(){var z,y
z=this.f
y=z.B
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.B=""}},
l7:[function(a){this.f.B+=a},"$1","gjC",2,0,22],
bu:function(){var z=0,y=P.az(),x,w=this,v,u
var $async$bu=P.aw(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.y("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.B.length===0)){z=4
break}z=5
return P.av(w.d2(),$async$bu)
case 5:z=3
break
case 4:w.fu()
case 1:return P.aC(x,y)}})
return P.aD($async$bu,y)}}}],["","",,B,{"^":"",eX:{"^":"d;d8:a<,dv:b<,cU:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.bW(this.b,3)+", score="+this.a.k(0)+">"}},bB:{"^":"d;bG:a<,fC:b<,f2:c<,kv:d<,dv:e<,f,r,eF:x<,cU:y<",
gA:function(a){return X.bu(H.q([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbB&&this.gA(this)===z.gA(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gA(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
fx:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bV(e,b.gdv())
z=z?0:b.gcU()+1
d.b=a.r
return new B.bB(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iU:{"^":"d;a,b,c,d,e,f",
jo:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ah("...")
z.ah("combining scores")
y=H.q([],[A.an])
x=new G.jg()
for(w=J.af(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gG()
z.ah(new G.je(r))
if(J.a6(r.gdv(),0.15))if(s==null){z.ah("    - first _bestCase")
s=r}else if(J.a6(x.$1(r.gd8()),x.$1(s.gd8()))){z.ah("    - new _bestCase")
s=r}q=r.gd8()
p=J.bv(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.an((q.a-v)*o,(q.b-u)*o,J.bV(p,o))
z.ah(new G.jf(n))
y.push(n)}m=A.jn(y)
w=s==null
if(w)l=C.E
else{q=s.gd8()
l=new A.an(q.a-v,q.b-u,J.bv(q.c,t))}w=w?s:s.gcU()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.aW(l.c,w)
t=m.a
q=m.b
p=m.c
z.ah("- uplifts average = "+("ActorScoreChange<self="+C.j.b8(t,2)+",team="+C.j.b8(q,2)+",enemy="+J.bW(p,2)+">"))
z.ah("- best = "+("ActorScoreChange<self="+C.t.b8(v,2)+",team="+C.t.b8(u,2)+",enemy="+J.bW(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ah("- result = "+("ActorScoreChange<self="+C.t.b8(t,2)+",team="+C.t.b8(q,2)+",enemy="+C.j.b8(p,2)+">"))
return new A.an(t,q,p)},
eU:function(){var z=this
return P.aN(function(){var y=0,x=1,w,v,u,t,s
return function $async$eU(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gce(),u=u.gZ(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.gW()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aL()
case 1:return P.aM(w)}}})},
dE:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dE=P.aw(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=x.f
w.b3(0)
v=x.c
u=v.a
t=u.a.by(0,new G.jh(x))
s=t.d9(u)
r=x.a
r.bM("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.b6(x.e9(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.bd(new G.ji(t,o))
if(o.I(t,u)!==!0){r.bd(new G.jj(o))
z=2
break}z=4
return P.av(x.cz(v,o,b,a,c).cp(0),$async$dE)
case 4:n=e
if(J.eI(n)===!0){r.bd(new G.jk(o))
w.n(0,o,C.F)
z=2
break}r.bd(new G.jl(s,o,n))
m=x.jo(n,s,b)
w.n(0,o,m)
r.bd(new G.jm(o,m))
z=2
break
case 3:x.e=!0
return P.aC(null,y)}})
return P.aD($async$dE,y)},
ku:function(){return this.dE(50,10,null)},
e9:function(a,b){return P.aN(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$e9(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bM((u.length!==0?C.a.gw(u):null).gbL())
case 2:u=(u.length!==0?C.a.gw(u):null).gaB()
t=u.length
s={func:1,ret:Q.c2,args:[U.ao]}
r={func:1,ret:Q.cI,args:[Q.u]}
q={func:1,ret:Q.B,args:[R.I]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ax(o,q)?6:8
break
case 6:x=9
return P.bM(Q.i5(z,y,o))
case 9:x=7
break
case 8:x=H.ax(o,r)?10:12
break
case 10:x=13
return P.bM(Q.i6(z,y,o))
case 13:x=11
break
case 12:x=H.ax(o,s)?14:16
break
case 14:x=17
return P.bM(Q.i7(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.y(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aL()
case 1:return P.aM(v)}}})},
cz:function(a5,a6,a7,a8,a9){var $async$cz=P.aw(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.by(0,new G.iY(t))
p=t.a
p.bd("=====")
p.bd(new G.iZ(a6,q))
p.bd(new G.j_(a6))
if(a6.I(q,r)!==!0){p.bd("- firstAction not applicable")
z=1
break}o=q.d9(r)
p.bd(new G.j5(a5,o))
p.bd(new G.j6(a5))
n=P.b2(null,B.bB)
m=P.Y(null,null,null,A.a9)
l=J.o(r)
k=l.gA(r)
for(j=new P.b6(a6.ds(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gG()
if(l.gA(r)!==k)throw H.c(new P.y("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.az(h)}s.a=0
r=t.b
case 3:if(!!n.gU(n)){z=4
break}++s.a
g=n.dG()
p.ah("----")
p.ah(new G.j7(g))
p.ah(new G.j8(g))
if(g.gcU()>a7||s.a>a8){p.ah(new G.j9(s,a7,g))
p.ah(new G.ja(g))
z=4
break}z=g.gbG().f.length===0?5:6
break
case 5:p.ah("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.be(0,new G.jb(t),new G.jc())
if(q==null){p.ah("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eX(q.d9(l),g.e,g.y)
p.ah(new G.j0(f))
z=7
x=[1]
return P.d4(P.hx(f),$async$cz,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gw(j):null).dQ(l)
j=l.a
i=new H.H(j,new G.j1(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.y("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.h2("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.by(0,new G.j2(t))
c=J.e(e,q)
p.ah("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ah("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d9(l)
if(b==null)b=C.G
f=new B.eX(b,g.e,g.y)
p.ah(new G.j3(o,f))
p.ah(new G.j4(g))
z=8
x=[1]
return P.d4(P.hx(f),$async$cz,y)
case 8:p.ah("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b6(t.e9(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.I(e,l)!==!0)continue
for(a1=new P.b6(a2.ds(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bU(a4.gdv(),0.05))continue
if(m.a6(0,a4.gbG()))continue
n.az(a4)}}p.ah("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d4(null,0,y)
case 2:return P.d4(v,1,y)}})
var z=0,y=P.pS($async$cz),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rc(y)},
hW:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gw(z).gaM())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjs())+". Action Records: "+z.aD(0,new G.jd()).cd(0,"<-")))}},
v:{
iV:function(a,b){var z,y,x
z=N.bf("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a_(H.q([],[Y.ac]),0,P.aJ())
x.b=b.r
z=new G.iU(z,y,new B.bB(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.Q(0,null,null,null,null,null,0,[null,null]))
z.hW(a,b)
return z}}},jd:{"^":"a:0;",
$1:function(a){return a.gaM()}},jg:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},je:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jf:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jh:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},ji:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gW()+"' for "+H.b(this.a.db)}},jj:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gW()+"' isn't applicable"}},jk:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gW()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jl:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gW()+"' leads to "+H.b(J.aH(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jm:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gW()+"' was scored "+this.b.k(0)}},iY:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},iZ:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gW()+"' of "+H.b(this.b.gh())}},j_:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},j5:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j6:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c3(" ",z.y)+"- "+J.h(z.b)}},j7:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfC().gW()+"'"}},j8:{"^":"a:1;a",
$0:function(){var z=this.a.gbG().f
return"- situation: "+H.b(J.iL(z.length!==0?C.a.gw(z):null))}},j9:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcU()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},ja:{"^":"a:1;a",
$0:function(){var z=this.a.gbG().d
return"- how we got here: "+new H.ap(z,new G.iX(),[H.m(z,0),null]).cd(0," <- ")}},iX:{"^":"a:0;",
$1:function(a){return a.gaM()}},jb:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jc:{"^":"a:1;",
$0:function(){return}},j0:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},j1:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j2:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j3:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},j4:{"^":"a:1;a",
$0:function(){var z=this.a.gbG().d
return"- how we got here: "+new H.ap(z,new G.iW(),[H.m(z,0),null]).cd(0," <- ")}},iW:{"^":"a:0;",
$1:function(a){return a.gaM()}}}],["","",,Z,{"^":"",mL:{"^":"d;a,b",
gbL:function(){return this.b},
gU:function(a){return this.b.length===0},
hc:function(a,b){var z=this
return P.aN(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hc(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bM(t)
case 5:w=1
break
case 4:s=z.iw(new Z.mO())
r=z.e8(new Z.mP(),[s])
q=z.e8(new Z.mQ(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bC().bM("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bC().bM("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bC().bM("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.c6(t,new Z.mR(z,x))
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
case 18:case 1:return P.aL()
case 2:return P.aM(u)}}})},
kt:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc5(y)
C.a.c6(y,new Z.mS(this,a))
x=this.a.a
w=x.gcq().bp(0,1/0,new Z.mT(a))
v=x.gcq().bp(0,-1/0,new Z.mU(a))
x=J.ak(v)
u=J.ak(w)
t=u.at(w,J.bV(x.at(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bv(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.mb(y.length,new Z.mV(z,this,a,s),!1,P.K)
q=new H.ap(r,new Z.mW(C.a.bp(r,0,Z.ug())),[H.m(r,0),null]).bE(0,!1)
z=C.a.bp(q,0,Z.uh())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.am(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.ne(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
e8:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a6(b,t))continue
if(w==null||J.a6(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iw:function(a){return this.e8(a,C.d)},
v:{
mM:function(a){var z,y,x
z=a.gce()
y=H.z(z,"w",0)
x=P.O(new H.H(z,new Z.mN(a),[y]),!1,y)
if(x.length===0)$.$get$bC().eT("After removing actions scored by undefined, there are no recommendations.")
return x},
w0:[function(a,b){return J.am(a,b)},"$2","ug",4,0,42],
w1:[function(a,b){return J.am(a,b)},"$2","uh",4,0,43]}},mO:{"^":"a:0;",
$1:function(a){return a.gc4()}},mP:{"^":"a:0;",
$1:function(a){return J.iH(a.gbW())}},mQ:{"^":"a:0;",
$1:function(a){return a.gd_()}},mR:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bw(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mS:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bw(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mT:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d7(a),H.d7(z))}},mU:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d7(a),H.d7(z))}},mV:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.aW(J.bv(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mW:{"^":"a:0;a",
$1:function(a){return J.iO(J.bV(J.aW(a,this.a),1000))}},mN:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gke()}}}],["","",,K,{"^":"",rm:{"^":"a:3;",
$3:function(a,b,c){}},cd:{"^":"d;a,h:b<,c,d,jI:e<,f,bx:r<",
gjG:function(){return this.a},
gA:function(a){return C.b.gA(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.cd&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jJ:function(a,b,c){return this.e.$3(a,b,c)},
v:{
Z:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.u])
z.ag()
z.m(f)
return new K.cd(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",u:{"^":"d;jB:a<,W:b<,aM:c<,k8:d<"}}],["","",,S,{"^":"",a8:{"^":"d;",
gaB:function(){return C.d},
gbL:function(){return C.d},
gdB:function(){return 3},
dQ:function(a){return this.aQ(this.gT(),a)},
h8:function(a,b){},
h9:function(a,b){},
kq:function(a,b){},
dD:function(a){},
da:function(a){return!0}}}],["","",,S,{"^":"",
fG:function(a){var z=$.$get$bE().al(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nd:function(a,b){var z,y,x,w,v
z=$.$get$bE().kp()*b
for(y=new H.dD(a,a.gl(a),0,null,[H.z(a,"aS",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
ne:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bE().al(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
cT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.J(a)
y=z.aT(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.at()
x=y<x-1}else x=!1
if(x){w=H.q([],[P.t])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gl(a)
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
if(p>1){o=$.$get$bE().al(p)
z=z.aF(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.cT(C.b.aF(a,n+1,w[m])))
if(typeof v!=="number")return v.af()
n=a.length
m+=C.b.aF(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cT(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.af()
x=t+1
return z.aF(a,0,x)+H.b(S.cT(C.b.bH(a,x)))}}}else return a},
a7:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bE().al(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ac:{"^":"d;aW:a<,aS:b<,aO:c<,hb:d<,e,dt:f@,he:r<,h6:x<,f3:y<,jF:z<,hR:Q<,d4:ch<,j5:cx<,kd:cy<,T:db<",
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
z="Report<"+C.b.aF(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a_:{"^":"d;a,T:b<,c",
geB:function(){return C.a.bT(this.a,new Y.os())},
aL:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.ba(b).ey(b,".")||C.b.ey(b,"!")||C.b.ey(b,"?"))&&C.b.dd(b,P.bi("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ac(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aL(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
D:function(a,b,c){return this.aL(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
j7:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return this.aL(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,m)},
fE:function(a,b,c){return this.aL(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jd:function(a,b,c,d,e,f){return this.aL(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
er:function(a,b,c,d,e){return this.aL(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ca:function(a,b,c,d){return this.aL(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ca:function(a,b,c,d){return this.aL(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fF:function(a,b,c,d){return this.aL(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fG:function(a,b,c,d,e,f){return this.aL(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jc:function(a,b,c,d,e,f){return this.aL(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
j9:function(a,b,c){return this.aL(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
ja:function(a,b,c,d){return this.aL(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jb:function(a,b,c,d,e){return this.aL(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
jh:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oq().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gw(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bS(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gw(b))){z+="."
this.jd(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jg:function(a,b,c,d){return this.jh(a,b,c,"and",3,null,null,d)},
fI:function(){return this.D(0,"\n\n",!0)},
bS:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.J(a)
z=z.aT(a,"<owner's> "+H.b(b))!==-1||z.aT(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aT(a,"<object-owner's> "+H.b(b))!==-1||z.aT(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.J(a)
if(z.aT(a,"<subject's> "+H.b(b))!==-1||z.aT(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gbs()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.cY(a,b,"the "+H.b(b))
else{w=J.eK(c.gh(),P.bi("[aeiouy]",!1,!1))?z.cY(a,b,"an "+H.b(b)):z.cY(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
ez:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaO()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaO()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaO().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaO().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaS().gi())}else z=!1
return z},
dP:function(a){var z=this
return P.aN(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dP(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aP(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaS()!=null?3:4
break
case 3:x=5
return t.gaS()
case 5:case 4:x=t.gaO()!=null?6:7
break
case 6:x=8
return t.gaO()
case 8:case 7:x=t.ghb()!=null?9:10
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
cT:[function(a){var z=J.ak(a)
if(z.aR(a,0)||z.bO(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaO()}},"$1","gaO",2,0,23],
kr:function(a,b){var z
if(!this.aP(a)||!this.aP(b))return!1
if(this.ez(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf3()}return!1},
ha:function(a){var z
for(z=!1;this.geB();z=!0){a.$1(this.hf(!0))
this.kz()}return z},
hf:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bp(z,[],new Y.ot())
C.a.iR(z,new Y.ou(y),!1)
x=a&&this.geB()?C.a.aT(z,C.a.dw(z,new Y.ov()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ez(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdt())n=this.kr(s,p)&&this.hQ(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdt()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdt(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].ghR()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjF()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd4())if(this.dn(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdt()}else n=!1
n=n||this.kN(s)>4}else n=!0
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
u=!1}else if(t){r+=S.fG([" but "," but ",", but "])
u=!this.hD(s,s+1)&&!0}else{r+=S.fG([" and "," and ",", and "])
u=!0}}m=this.dY(s)
l=S.cT(m)
p=J.J(l)
if(p.a6(l,"{")===!0||p.a6(l,"}")===!0)$.$get$ih().dU('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dn(s,k)&&J.eK(this.dY(k),"<subject> ")&&p.dd(l,"<subject> ")}else k=!1
if(k)l=p.cY(l,"<subject> ","")
j=J.dg(l,"<action>",this.dY(s))
p=s-1
k=this.iU(s,p)
if(k)k=!(this.cT(s).ga3()===C.n&&this.bk(s).ga3()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dn(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cT(p)!=null)if(this.bk(s)!=null)if(this.bk(p)!=null){k=this.cT(p)
k=k==null?k:k.gi()
i=this.bk(s)
if(J.e(k,i==null?i:i.gi())){k=this.bk(p)
k=k==null?k:k.ga3()
i=this.bk(s)
k=!J.e(k,i==null?i:i.ga3())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bk(p)!=null)if(this.cT(s)!=null){k=this.bk(p)
k=k==null?k:k.gi()
i=this.cT(s)
if(J.e(k,i==null?i:i.gi())){p=this.bk(p)
p=p==null?p:p.ga3()
k=this.bk(s)
p=!J.e(p,k==null?k:k.ga3())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gaS()
g=p.gaO()
f=p.ghb()
e=p.e
k=h!=null
if(k){if(h.gH()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga3()===C.C||h.ga3()===C.a4){d=H.n(d,"<s>","")
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
d=H.n(d,"<has>","has")}d=H.iv(d,"<subject>","<subjectNoun>",0)
i=h.ga3().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.ct(this.bS(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga3().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a6(j,P.bi("<subject>.+<subject's>",!0,!1))){c=h.ga3().c
d=H.n(d,"<subject's>",c)}d=J.ct(this.bS(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga3().c
d=H.n(d,"<subject's>",i)
i=h.ga3().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga3().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gbs()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gH()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dg(this.bS(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga3().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a6(j,P.bi("<object>.+<object's>",!0,!1))){i=g.ga3().c
d=H.n(d,"<object's>",i)}d=J.ct(this.bS(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga3().c
d=H.n(d,"<object's>",i)
i=g.ga3().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga3().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga3().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga3().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fv(e,this.fv(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.or(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd4())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd4()?r+".":r
return H.vt(z.charCodeAt(0)==0?z:z,$.$get$fZ(),new Y.ow(),null)},
ck:function(){return this.hf(!1)},
kz:function(){var z,y
if(!this.geB()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.aT(z,C.a.dw(z,new Y.ox()))+1
P.cb(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hD:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
if(this.ez(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf3()}if(!this.dn(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghe()){if(b>=z.length)return H.f(z,b)
y=z[b].ghe()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].gh6()){if(b>=z.length)return H.f(z,b)
z=z[b].gh6()}else z=!1
if(z)return!0
else return!1},
hQ:function(a,b){var z,y,x,w,v
if(!this.aP(a)||!this.aP(b))return!1
for(z=new P.b6(this.dP(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b6(this.dP(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gG()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
dY:[function(a){var z=J.ak(a)
if(z.aR(a,0)||z.bO(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaW()}},"$1","gaW",2,0,12],
bk:[function(a){var z=J.ak(a)
if(z.aR(a,0)||z.bO(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaS()}},"$1","gaS",2,0,23],
kN:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gT()!=null){y=a-1
if(this.aP(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gT()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gT()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gT()
if(typeof y!=="number")return y.at()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.ck()},
aP:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fv:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gH()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dg(this.bS(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga3().a)
z=H.n(H.n(J.ct(this.bS(C.b.a6(c,P.bi(d+".+"+e,!0,!1))?H.n(z,e,a.ga3().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga3().c),g,a.ga3().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
iU:function(a,b){var z,y
if(!this.aP(a)||!this.aP(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaO()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaO()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaO().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaO().gi())},
dn:function(a,b){var z,y
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
v:{
or:function(a){var z,y,x
z=!C.b.a6(a,"\n\n")?C.b.kS(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bH(z,1)}}},os:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),"\n\n")}},oq:{"^":"a:24;",
$1:function(a){return C.b.eS(H.n(H.n(a,"<also> ",""),"  "," "))}},ot:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.J(a)
y=z.gao(a)?z.gw(a):null
if(y!=null&&y.gkd()&&J.e(b.gj5(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.q(a,b)
return a}},ou:{"^":"a:31;a",
$1:function(a){return J.eG(this.a,a)}},ov:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),"\n\n")}},ow:{"^":"a:30;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},ox:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),"\n\n")}},b_:{"^":"mp;bs:a<,h:b<,c,bh:d<,H:e<,a3:f<",
gi:function(){return H.aA(this)},
gcc:function(){return!0},
gbq:function(){return!0},
v:{
c_:function(a,b,c,d,e){var z=H.q([],[P.r])
return new Y.b_(c,b,z,e==null?$.$get$bb():e,!1,d)}}},mp:{"^":"d+dn;"},dn:{"^":"d;",
gaN:function(){return this.gbq()&&this.gcc()===!0},
ab:function(a,b,c,d,e,f,g,h,i,j,k,l){J.iI(a,b,c,d,e,f,g,h,i,j,H.M(this,"$isb_"),!1,l)},
ac:function(a,b){return this.ab(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
an:function(a,b,c){return this.ab(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
dH:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
ae:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
hl:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,null,!1,!1,d)},
bg:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cn:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
ay:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
cm:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eM:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bY:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
bt:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
cm:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
hj:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
eN:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
kE:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
hi:function(a,b,c,d){return this.ab(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kH:function(a,b,c,d,e,f){return this.ab(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
bZ:function(a,b,c,d,e){return this.ab(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
hh:function(a,b,c){return this.ab(a,b,c,!1,!1,!1,!1,null,null,!1,!1,!1)},
kD:function(a,b,c,d){return this.ab(a,b,c,!1,!1,!1,!1,d,null,!1,!1,!1)},
hk:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kG:function(a,b,c,d,e){return this.ab(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kI:function(a,b,c,d,e,f){return this.ab(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eM:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kF:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c9:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",rT:{"^":"a:0;",
$1:function(a){a.gcH().b=2
return 2}},rZ:{"^":"a:0;",
$1:function(a){a.gcH().b=0
return 0}},rS:{"^":"a:0;",
$1:function(a){a.gcH().b=1
return 1}},h9:{"^":"d;"},pI:{"^":"h9;i:a<",
Y:function(a){var z=new L.bm(null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h9))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gA:function(a){return Y.T(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
e4:function(a){var z=new L.bm(null,null)
a.$1(z)
return z.p()}}},bm:{"^":"d;a,b",
gi:function(){return this.gcH().b},
gcH:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcH().b
z=new L.pI(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
hR:function(a,b){return P.aN(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hR(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bc(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bc(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aL()
case 1:return P.aM(v)}}})}}],["","",,A,{"^":"",a9:{"^":"d;fD:a<,bD:b<,c,d,e,f,T:r<,x",
gjs:function(){var z=this.f
return z.length!==0?C.a.gw(z):null},
gA:function(a){var z,y,x,w,v
z=X.bu(this.a)
y=X.bu(this.d)
x=X.bu(this.f)
w=this.r
v=this.c
v=X.d6(X.aU(X.aU(0,C.e.gA(w)),J.j(v)))
return X.d6(X.aU(X.aU(X.aU(X.aU(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa9&&this.gA(this)===z.gA(b)},
j4:function(a){var z,y
z=this.hC(a,!0)
y=z.gZ(z)
if(y.t()){y.gG()
return!0}return!1},
bl:function(a){var z,y
z=this.hB(a)
y=z.gZ(z)
if(y.t()){y.gG()
return!0}return!1},
fS:function(a){var z,y,x
z=this.dj(a)
if(z==null)throw H.c(new P.y("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].av()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
av:function(){++this.r},
dO:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.de(0,new A.pf(a))
if(b!=null)z=z.c2(0,new A.pg(b))
if(c!=null)z=z.c2(0,new A.ph(c))
if(e!=null)z=z.c2(0,new A.pi(e))
return d!=null?z.c2(0,new A.pj(d)):z},
hB:function(a){return this.dO(a,null,null,null,null)},
hC:function(a,b){return this.dO(a,null,null,null,b)},
X:function(a){return this.a.by(0,new A.pk(a))},
dS:function(a){return this.e.by(0,new A.pl(a))},
eV:function(a){var z,y
z=this.dj(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
aq:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
jU:function(a){var z=this.a.be(0,new A.pm(a),new A.pn())
if(z==null)return!1
return z.gbq()},
aE:function(){var z,y
z=this.f
y=C.a.gw(z)
y.dD(this)
C.a.a2(z,y)},
b6:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.dD(this)
C.a.a2(z,y)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
cl:function(a,b){var z,y
z=this.dj(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dJ:function(a,b,c,d,e){var z,y,x,w
z=this.dO(a,b,c,d,e)
y=z.gZ(z)
if(y.t()){x=y.gG()
y=this.r
w=x.gT()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kM:function(a,b,c){return this.dJ(null,a,b,c,null)},
c0:function(a,b,c){return this.dJ(a,null,b,null,c)},
kL:function(a,b,c){return this.dJ(a,b,null,null,c)},
dI:function(a){return this.dJ(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ef()
y.ar(0,z)
return"World<"+P.c4(y,"{","}")+">"},
a1:function(a,b){var z,y,x
z=this.X(a)
y=z.Y(b)
x=this.a
x.a2(0,z)
x.q(0,y)},
dj:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
i4:function(a){this.a.ar(0,a.a)
this.d.ar(0,a.d)
this.b.ar(0,a.b)
this.e.ar(0,a.e)
C.a.ar(this.f,a.f)
this.r=a.r},
v:{
e2:function(a){var z,y,x,w
z=P.Y(null,null,null,R.I)
y=P.b2(null,O.cu)
x=P.Y(null,null,null,U.ao)
w=P.Y(null,null,null,null)
w=new A.a9(z,x,a.c,y,w,[],null,null)
w.i4(a)
return w}}},pf:{"^":"a:0;a",
$1:function(a){return a.geq()===this.a}},pg:{"^":"a:0;a",
$1:function(a){return J.e(a.gcX(),this.a.gi())}},ph:{"^":"a:0;a",
$1:function(a){return a.gf4().a6(0,this.a.gi())}},pi:{"^":"a:0;a",
$1:function(a){return a.ghx()===this.a}},pj:{"^":"a:0;a",
$1:function(a){return a.ghv()===this.a}},pk:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pl:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pm:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pn:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",ad:{"^":"aa;a0:b<"},fP:{"^":"ad;c,W:d<,K:e<,h:f<,b,a",
R:[function(a,b,c){throw H.c(new P.y("SimpleAction always succeeds"))},"$3","gN",6,0,2],
S:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gO",6,0,2],
ad:function(a,b){throw H.c(new P.y("SimpleAction shouldn't have to provide roll reason"))},
J:function(a,b){return 1},
gL:function(){return!1},
I:function(a,b){return!0},
gM:function(){return H.i(new P.y("Not rerollable"))},
gP:function(){return!1}}}],["","",,N,{"^":"",jW:{"^":"B;L:c<,a0:d<,K:e<,P:f<,M:r<,b,a",
ga9:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaj:function(){return"will <subject> confuse <object>?"},
R:[function(a,b,c){var z
a.ac(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ae(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eM(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.ac(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bt(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ay(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 0.6},
I:function(a,b){var z
if(a.gH()===!0)if(a.gaa()){z=b.a
z=new H.H(z,new N.jX(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.eE(b)}else z=!1
else z=!1
return z},
v:{
vE:[function(a){return new N.jW(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","ti",2,0,4]}},jX:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbq()){z=a.gbh()
y=this.a.b.gbh()
z=z.a
y=y.gi()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",kj:{"^":"B;P:c<,M:d<,L:e<,a0:f<,K:r<,b,a",
ga9:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaj:function(){return"will <subject> kick the weapon off?"},
R:[function(a,b,c){S.a7(new V.kk(this,a,c),new V.kl(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
S.a7(new V.km(this,a,c),new V.kn(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gw(z):null
b.cl(y.gi(),y.Y(new V.ko(this)))
z=this.b
b.a1(z.gi(),new V.kp())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gO",6,0,2],
J:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z
if(a.gaa()||a.dy===C.i){z=this.b
z=z.ga4()&&!z.gb4()}else z=!1
return z},
v:{
vH:[function(a){return new V.kj(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tz",2,0,4]}},kk:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.an(y,"<subject> mi<sses>",!0)}},kl:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> weapon",y)
y.an(z,"<subject> hold<s> onto it",!0)}},km:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kI(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga_(),z,!0)}},kn:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bt(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.ca(0,"<owner's> <subject> fl<ies> away",y,y.ga_())}},ko:{"^":"a:14;a",
$1:function(a){a.gbn().q(0,this.a.b.ga_())
return a}},kp:{"^":"a:0;",
$1:function(a){a.sa_($.$get$em())
return a}}}],["","",,R,{"^":"",lW:{"^":"B;P:c<,M:d<,L:e<,a0:f<,K:r<,b,a",
gh:function(){return"KickToGround"},
ga9:function(){return"kick <object> to the ground"},
gaj:function(){return"will <subject> kick <object> prone?"},
R:[function(a,b,c){S.a7(new R.lX(this,a,c),new R.lY(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gN",6,0,2],
S:[function(a,b,c){var z
S.a7(new R.lZ(this,a,c),new R.m_(this,a,c,b.aq("FightSituation").gbx()),null,null)
z=this.b
b.a1(z.gi(),new R.m0())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gO",6,0,2],
J:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){return(a.gaa()||a.dy===C.i)&&!this.b.ga4()},
v:{
vV:[function(a){return new R.lW(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","u7",2,0,4]}},lX:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.an(y,"<subject> mi<sses>",!0)}},lY:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> shin",y)
y.an(z,"<subject> <does>n't budge",!0)}},lZ:{"^":"a:1;a,b,c",
$0:function(){this.b.kG(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},m_:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bt(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ac(z,"<subject> {grunt|shriek}<s>")
y.ay(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},m0:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,F,{"^":"",mK:{"^":"aa;K:b<,L:c<,a0:d<,P:e<,M:f<,a",
gW:function(){return"Stand off."},
gh:function(){return"Pass"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gH()===!0)a.ac(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return!0}}}],["","",,Y,{"^":"",mY:{"^":"B;P:c<,M:d<,L:e<,a0:f<,K:r<,b,a",
ga9:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaj:function(){return"will <subject> force <object> off balance?"},
R:[function(a,b,c){var z=this.b
a.hk(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
z.bg(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.hk(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
if(z.gaa()){z.hj(c,"<subject> lose<s> <object>",!0,$.$get$ek())
b.a1(z.y,new Y.mZ())
C.a.q(b.f,U.mq(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gap()){z.ac(c,"<subject> <is> already off balance")
c.fF(0,"<subject> make<s> <object> fall to the "+H.b(b.aq("FightSituation").gbx()),z,$.$get$il())
b.a1(z.y,new Y.n_())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.y("enemy pose must be either standing or off-balance"))},"$3","gO",6,0,2],
J:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z,y
if(!a.ga4()){z=a.e
if(z.gbf()||z.gkb()){z=this.b
if(!z.ga_().gcL()){z.ga_().gfK()
y=!1}else y=!0
z=y&&!z.ga4()}else z=!1}else z=!1
return z},
v:{
w2:[function(a){return new Y.mY(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","ui",2,0,4]}},mZ:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return a}},n_:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,B,{"^":"",nl:{"^":"aa;K:b<,L:c<,a0:d<,P:e<,M:f<,a",
gW:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gH()===!0)a.bt(c,"<subject> regain<s> <object>",$.$get$ek(),!0)
b.a1(a.gi(),new B.nm())
return H.b(a.gh())+" regains balance"},"$3","gO",6,0,2],
ad:function(a,b){return"Will "+a.ga3().a+" regain balance?"},
J:function(a,b){return 1},
I:function(a,b){return a.gap()}},nm:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,O,{"^":"",nA:{"^":"aa;K:b<,L:c<,a0:d<,P:e<,M:f<,a",
gW:function(){return"Scramble."},
gh:function(){return"Scramble"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gO",6,0,2],
ad:function(a,b){return"Will "+a.ga3().a+" crawl out of harm's way?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga4())return!1
if(A.dd(a,b))return!0
return!1}}}],["","",,Q,{"^":"",of:{"^":"aa;K:b<,L:c<,a0:d<,P:e<,M:f<,a",
gW:function(){return"Stand up."},
gh:function(){return"StandUp"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ac(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a7(new Q.og(a,c),new Q.oh(a,c),null,null)
b.a1(a.gi(),new Q.oi())
return H.b(a.gh())+" stands up"},"$3","gO",6,0,2],
ad:function(a,b){return"Will "+a.ga3().a+" stand up?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga4())return!1
if(A.dd(a,b))return!1
return!0}},og:{"^":"a:1;a,b",
$0:function(){return this.a.ac(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oh:{"^":"a:1;a,b",
$0:function(){return this.a.ac(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oi:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,T,{"^":"",
wt:[function(a){return new A.ah(T.ey(),null,null,new T.us(),new T.ut(),new T.uu(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vg",2,0,4],
wu:[function(a){return new A.ah(T.ey(),new T.uv(),T.ey(),new T.uw(),new T.ux(),new T.uy(),new T.uz(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vh",2,0,4],
wv:[function(a,b,c,d,e){a.ae(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a1(a.gi(),new T.uA())},"$5","ey",10,0,8],
us:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga4()&&a.gb4()&&c.gb4()}},
ut:{"^":"a:3;",
$3:function(a,b,c){return Y.eS(a,c)}},
uu:{"^":"a:3;",
$3:function(a,b,c){return S.dM(a,c,C.l)}},
uw:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga4()&&a.gb4()&&c.gb4()}},
ux:{"^":"a:3;",
$3:function(a,b,c){return Y.eS(a,c)}},
uy:{"^":"a:3;",
$3:function(a,b,c){return S.dM(a,c,C.m)}},
uv:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uz:{"^":"a:3;",
$3:function(a,b,c){return S.dM(a,c,C.q)}},
uA:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,A,{"^":"",ah:{"^":"B;c,d,e,f,r,x,y,z,K:Q<,L:ch<,a0:cx<,h:cy<,P:db<,M:dx<,a9:dy<,aj:fr<,b,a",
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
ww:[function(a){return new A.ah(M.ez(),null,null,new M.uB(),new M.uC(),new M.uD(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vi",2,0,4],
wx:[function(a){return new A.ah(M.ez(),new M.uE(),M.ez(),new M.uF(),new M.uG(),new M.uH(),new M.uI(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","vj",2,0,4],
wy:[function(a,b,c,d,e){if(a.ga4()){a.hh(c,"<subject> roll<s>",e.gi())
a.hh(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kD(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","ez",10,0,8],
uB:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&!c.ga4()&&!A.dd(a,b)}},
uC:{"^":"a:3;",
$3:function(a,b,c){return F.fi(a,c)}},
uD:{"^":"a:3;",
$3:function(a,b,c){return V.dA(a,c,C.l)}},
uF:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&!c.ga4()&&!A.dd(a,b)}},
uG:{"^":"a:3;",
$3:function(a,b,c){return F.fi(a,c)}},
uH:{"^":"a:3;",
$3:function(a,b,c){return V.dA(a,c,C.m)}},
uE:{"^":"a:3;",
$3:function(a,b,c){return a.gaa()?0.4:0.2}},
uI:{"^":"a:3;",
$3:function(a,b,c){return V.dA(a,c,C.q)}}}],["","",,U,{"^":"",
wz:[function(a){return new A.ah(U.eA(),null,null,new U.uJ(),new U.uK(),new U.uL(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","vk",2,0,4],
wA:[function(a){return new A.ah(U.eA(),new U.uM(),U.eA(),new U.uN(),new U.uO(),new U.uP(),new U.uQ(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vl",2,0,4],
wB:[function(a,b,c,d,e){c.jc(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eA",10,0,8],
uJ:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.gaa()||a.dy===C.i)&&!c.ga4()&&a.gb4()
else z=!1
return z}},
uK:{"^":"a:3;",
$3:function(a,b,c){return Q.fF(a,c)}},
uL:{"^":"a:3;",
$3:function(a,b,c){return Z.dU(a,c,C.l)}},
uN:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.gaa()||a.dy===C.i)&&!c.ga4()&&a.gb4()
else z=!1
return z}},
uO:{"^":"a:3;",
$3:function(a,b,c){return Q.fF(a,c)}},
uP:{"^":"a:3;",
$3:function(a,b,c){return Z.dU(a,c,C.m)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uQ:{"^":"a:3;",
$3:function(a,b,c){return Z.dU(a,c,C.q)}}}],["","",,G,{"^":"",
wC:[function(a){return new A.ah(G.eB(),null,null,new G.uT(),new G.uU(),new G.uV(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","vm",2,0,4],
wH:[function(a){return new A.ah(G.eB(),new G.v3(),G.eB(),new G.v4(),new G.v5(),new G.v6(),new G.v7(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vn",2,0,4],
wI:[function(a,b,c,d,e){return a.eN(c,"<subject> swing<s> {"+H.b(U.ae(a))+" |}at <object>",e.gi(),!0,d)},"$5","eB",10,0,8],
uT:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gaa()&&!c.ga4()&&a.e.gbf()}},
uU:{"^":"a:3;",
$3:function(a,b,c){return M.bG(a,c)}},
uV:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
v4:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gaa()&&!c.ga4()&&a.e.gbf()}},
v5:{"^":"a:3;",
$3:function(a,b,c){return M.bG(a,c)}},
v6:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
v3:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gax()!=null?0.2:0)}},
v7:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.q)}}}],["","",,R,{"^":"",
wD:[function(a,b,c,d,e){return a.hj(c,"<subject> completely miss<es> <object> with "+H.b(U.ae(a)),!0,d)},"$5","it",10,0,11],
wE:[function(a){return new A.ah(R.iu(),new R.uW(),R.it(),new R.uX(),new R.uY(),new R.uZ(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vo",2,0,4],
wF:[function(a){return new A.ah(R.iu(),new R.v_(),R.it(),new R.v0(),new R.v1(),new R.v2(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vp",2,0,4],
wG:[function(a,b,c,d,e){return a.eN(c,"<subject> swing<s> {"+H.b(U.ae(a))+" |}at <object>",e.gi(),!0,d)},"$5","iu",10,0,8],
uX:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gap()&&!c.ga4()&&a.e.gbf()}},
uY:{"^":"a:3;",
$3:function(a,b,c){return M.bG(a,c)}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
uW:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v0:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gap()&&!c.ga4()&&a.e.gbf()}},
v1:{"^":"a:3;",
$3:function(a,b,c){return M.bG(a,c)}},
v2:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
v_:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gax()!=null?0.2:0)}}}],["","",,D,{"^":"",
wJ:[function(a){return new A.ah(D.eC(),null,null,new D.v8(),new D.v9(),new D.va(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vq",2,0,4],
wK:[function(a){return new A.ah(D.eC(),new D.vb(),D.eC(),new D.vc(),new D.vd(),new D.ve(),new D.vf(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","vr",2,0,4],
wL:[function(a,b,c,d,e){return a.ae(c,"<subject> strike<s> down {with "+H.b(U.ae(a))+" |}at <object>",d)},"$5","eC",10,0,11],
v8:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga4()&&!a.ga4()&&a.e.gbf()}},
v9:{"^":"a:3;",
$3:function(a,b,c){return D.h0(a,c)}},
va:{"^":"a:3;",
$3:function(a,b,c){return V.dK(a,c,C.l)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga4()&&!a.ga4()&&a.e.gbf()}},
vd:{"^":"a:3;",
$3:function(a,b,c){return D.h0(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return V.dK(a,c,C.m)}},
vb:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gax()!=null?0.2:0
return 0.7-z-y}},
vf:{"^":"a:3;",
$3:function(a,b,c){return V.dK(a,c,C.q)}}}],["","",,E,{"^":"",oU:{"^":"c2;a0:c<,b,a",
ga9:function(){return"pick up <object>"},
gK:function(){return"A shield makes a huge difference in battle."},
gL:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gP:function(){return!1},
gM:function(){return},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.cl(y.gi(),y.Y(new E.oV(this)))
b.a1(a.gi(),new E.oW(this))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,2],
ad:function(a,b){return H.i(new P.a4(null))},
J:function(a,b){return 1},
I:function(a,b){if(!(this.b instanceof E.bk))return!1
a.gfL()
if(a.d!=null)return!1
return!0},
v:{
w7:[function(a){return new E.oU(!0,a,null)},"$1","vv",2,0,17]}},oV:{"^":"a:14;a",
$1:function(a){a.gbn().a2(0,this.a.b)
return a}},oW:{"^":"a:0;a",
$1:function(a){a.sax(H.M(this.a.b,"$isbk"))}}}],["","",,M,{"^":"",oX:{"^":"c2;a0:c<,b,a",
ga9:function(){return"pick up <object>"},
gK:function(){return"A different weapon might change the battle."},
gL:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gP:function(){return!1},
gM:function(){return},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.cl(y.gi(),y.Y(new M.oY(this)))
b.a1(a.gi(),new M.oZ(this,a))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,2],
ad:function(a,b){return H.i(new P.a4(null))},
J:function(a,b){return 1},
I:function(a,b){var z,y,x
z=this.b
if(!(z instanceof L.b5))return!1
a.gfL()
z=z.ga8()
y=a.e.ga8()
if(typeof y!=="number")return H.x(y)
if(z<=y)return!1
x=b.c0("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
v:{
w8:[function(a){return new M.oX(!0,a,null)},"$1","vw",2,0,17]}},oY:{"^":"a:14;a",
$1:function(a){a.gbn().a2(0,this.a.b)
return a}},oZ:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb4())a.gbD().q(0,a.ga_())
a.sa_(H.M(this.a.b,"$isb5"))}}}],["","",,M,{"^":"",pc:{"^":"aa;K:b<,P:c<,M:d<,L:e<,a0:f<,a",
gW:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ac(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kF(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z
if(a.eE(b)){z=b.c0("Confuse",a,!0)
if(typeof z!=="number")return z.b9()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",ld:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga9:function(){return""},
gaj:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.a1(z.gi(),new R.le())
if(J.e(z.gi(),100))a.bt(c,"<subject> smash<es> <object's> head to the ground",z,!0)
else a.bt(c,"<subject> break<s> <object's> neck",z,!0)
N.cq(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vM:[function(a){return new R.ld(null,!0,!0,!0,C.c,a,null)},"$1","tG",2,0,4]}},le:{"^":"a:0;",
$1:function(a){a.sam(0)
return a}}}],["","",,Y,{"^":"",
eS:function(a,b){var z=new Y.dj(null,null,null,null,null)
new Y.tb(a,b).$1(z)
return z.p()},
eR:{"^":"a8;",
gaB:function(){return[R.tG()]},
gh:function(){return"BreakNeckOnGroundSituation"},
av:function(){var z=new Y.dj(null,null,null,null,null)
z.m(this)
new Y.jK().$1(z)
return z.p()},
aQ:function(a,b){if(a===0)return b.X(this.a)
return},
aU:function(a,b){return new H.H(a,new Y.jL(this),[H.m(a,0)])}},
tb:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaX().c=z
a.gaX().e=0
z=this.a.gi()
a.gaX().b=z
z=this.b.gi()
a.gaX().d=z
return a}},
jK:{"^":"a:0;",
$1:function(a){var z=a.gaX().e
if(typeof z!=="number")return z.af()
a.gaX().e=z+1
return a}},
jL:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pr:{"^":"eR;a,i:b<,c,T:d<",
Y:function(a){var z=new Y.dj(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eR))return!1
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
dj:{"^":"d;a,b,c,d,e",
gi:function(){return this.gaX().c},
gT:function(){return this.gaX().e},
gaX:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaX().b
x=this.gaX().c
w=this.gaX().d
v=this.gaX().e
z=new Y.pr(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",kW:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaj:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {dodge it|break free}")
S.a7(new Z.kX(a,c),new Z.kY(this,a,c),null,null)
b.aE()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bt(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.b6("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb7().b5(0.5)},
I:function(a,b){return!0},
v:{
vL:[function(a){return new Z.kW("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tD",2,0,4]}},kX:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {can't|fail<s>}",!0)}},kY:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dM:function(a,b,c){var z=new S.dL(null,null,null,null,null,null)
new S.ta(a,b,c).$1(z)
return z.p()},
fv:{"^":"bZ;",
gaB:function(){return[Z.tD()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
av:function(){var z=new S.dL(null,null,null,null,null,null)
z.m(this)
new S.mE().$1(z)
return z.p()}},
ta:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
mE:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.af()
a.gaK().f=z+1
return a}},
pB:{"^":"fv;cJ:a<,i:b<,cj:c<,co:d<,T:e<",
Y:function(a){var z=new S.dL(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fv))return!1
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
dL:{"^":"d;a,b,c,d,e,f",
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
z=new S.pB(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dd:function(a,b){var z,y,x,w
z=b.c0("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c0("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c0("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c0("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
ae:function(a){return a.ga_().gbs()===!0?a.ga_().gh():"<subject's> "+H.b(a.ga_().gh())},
bT:function(a){return a.gax().gbs()===!0?a.gax().gh():"<subject's> "+H.b(a.gax().gh())}}],["","",,G,{"^":"",
wi:[function(a,b,c,d,e){a.ac(c,"<subject> tr<ies> to swing back")
a.eM(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gaa()){b.a1(a.y,new G.tl())
a.cm(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a1(a.y,new G.tm())
a.ay(c,"<subject> lose<s> balance because of that",!0)
a.cm(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hY",10,0,11],
wj:[function(a){return new A.ah(G.hZ(),new G.tn(),G.hY(),new G.to(),new G.tp(),new G.tq(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tv",2,0,4],
wl:[function(a,b,c,d,e){return a.ae(c,"<subject> swing<s> back",d)},"$5","hZ",10,0,8],
wk:[function(a){return new A.ah(G.hZ(),new G.tr(),G.hY(),new G.ts(),new G.tt(),new G.tu(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tw",2,0,4],
tl:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return a}},
tm:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},
to:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.ga_().gbf()&&!a.ga4()}},
tp:{"^":"a:3;",
$3:function(a,b,c){return M.bG(a,c)}},
tq:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
tn:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}},
ts:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.ga_().gbf()&&!a.ga4()}},
tt:{"^":"a:3;",
$3:function(a,b,c){return M.bG(a,c)}},
tu:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
tr:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}}}],["","",,V,{"^":"",k4:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaj:function(){return"will <subject> tackle <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to tackle <object>",z)
S.a7(new V.k5(a,c),new V.k6(this,c),null,null)
a.ae(c,"<subject> land<s> on the "+H.b(U.ep(b))+" next to <object>",z)
b.a1(a.gi(),new V.k7())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tackle<s> <object> to the ground",z)
b.a1(z.gi(),new V.k8())
b.a1(a.gi(),new V.k9())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z=this.b.gap()?0.2:0
if(a.gH()===!0)return 0.7+z
return 0.5+z},
I:function(a,b){return!a.ga4()&&a.e instanceof K.c1},
v:{
vF:[function(a){return new V.k4("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tx",2,0,4]}},k5:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> go<es> wide",!0)}},k6:{"^":"a:1;a,b",
$0:function(){return this.a.b.an(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k7:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},k8:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},k9:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,S,{"^":"",
cE:function(a,b){var z=new S.dm(null,null,null,null,null)
new S.t1(a,b).$1(z)
return z.p()},
eY:{"^":"a8;",
gaB:function(){return[G.tv(),G.tw(),V.tx()]},
gbL:function(){return[$.$get$dO()]},
gh:function(){return"CounterAttackSituation"},
av:function(){var z=new S.dm(null,null,null,null,null)
z.m(this)
new S.k2().$1(z)
return z.p()},
aQ:function(a,b){if(a===0)return b.X(this.a)
return},
aU:function(a,b){return new H.H(a,new S.k3(this),[H.m(a,0)])}},
t1:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gi()
a.gaY().b=z
z=this.b.gi()
a.gaY().d=z
return a}},
k2:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.af()
a.gaY().e=z+1
return a}},
k3:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
ps:{"^":"eY;a,i:b<,c,T:d<",
Y:function(a){var z=new S.dm(null,null,null,null,null)
z.m(this)
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
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dm:{"^":"d;a,b,c,d,e",
gi:function(){return this.gaY().c},
gT:function(){return this.gaY().e},
gaY:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaY().b
x=this.gaY().c
w=this.gaY().d
v=this.gaY().e
z=new S.ps(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",bZ:{"^":"o6;",
gdB:function(){return 1000},
aQ:function(a,b){if(a===0)return b.X(this.gco())
return},
aU:function(a,b){return new H.H(a,new O.ke(this),[H.m(a,0)])}},o6:{"^":"a8+n0;"},ke:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcJ())||J.e(a.gi(),z.gco())}}}],["","",,U,{"^":"",
ep:function(a){return a.aq("FightSituation").gbx()},
dq:function(a,b,c,d,e){var z=new U.c0(null,null,null,null,null,null,null,null,null)
new U.th(a,b,c,d,e).$1(z)
return z.p()},
cJ:{"^":"a8;",
gaB:function(){return[N.ti(),V.tz(),R.u7(),Y.ui(),T.vg(),T.vh(),M.vi(),M.vj(),U.vk(),U.vl(),G.vm(),G.vn(),D.vq(),D.vr(),R.vo(),R.vp(),E.vv(),M.vw()]},
gbL:function(){return H.q([$.$get$fI(),$.$get$fY(),$.$get$fM(),$.$get$ho()],[Q.aa])},
gdB:function(){return 1000},
gh:function(){return"FightSituation"},
cK:function(a,b){var z=b.a
return(z&&C.a).bT(z,new U.l0(a))},
av:function(){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.l1().$1(z)
return z.p()},
aQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hR(this.f,this.b)
y=H.bA(z,new U.l2(b),H.z(z,"w",0),null)
x=H.z(y,"w",0)
w=P.O(new H.H(y,new U.l3(),[x]),!1,x)
x=H.m(w,0)
v=P.O(new H.H(w,new U.l4(),[x]),!1,x)
u=v.length===1?C.a.gc5(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.be(0,new U.l5(q),new U.l6())
o=p==null?p:p.gT()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.be(0,new U.l7(q),new U.l8())
k=l==null?l:l.gT()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aU:function(a,b){return new H.H(a,new U.l9(this),[H.m(a,0)])},
h9:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a7(z))y.j(0,z).$2(a,b)},
dD:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cK(a,this.b)&&this.cK(a,this.f)){y=a.eV(z)
a.cl(y.gi(),y.Y(new U.la()))
for(z=this.f,x=z.a,x=new J.bc(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.X(v).gaN()){u=a.X(v)
t=u.Y(new U.lb())
w.a2(0,u)
w.q(0,t)}}C.a.q(a.f,X.me(z,this.d,this.a,null))}else this.cK(a,this.f)},
da:function(a){var z=this.f
if(this.cK(a,z))if(this.cK(a,this.b)){z=z.a
z=(z&&C.a).bT(z,new U.lc(a))}else z=!1
else z=!1
return z}},
th:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a5().al(1073741823)
a.gak().f=z
a.gak().y=0
z=a.gak()
y=z.r
if(y==null){y=new S.N(null,null,[P.t])
y.ag()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eJ(this.a,new U.r0()))
z=a.gak()
y=z.c
if(y==null){y=new S.N(null,null,[P.t])
y.ag()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.ap(y,new U.r1(),[H.m(y,0),null]))
a.gak().e=this.c
y=new S.N(null,null,[U.ao])
y.ag()
y.m(C.d)
a.gak().b=y
y=this.d.gi()
a.gak().x=y
y=new A.cO(null,null,[P.t,{func:1,v:true,args:[A.a9,Y.a_]}])
y.c9()
y.m(this.e)
a.gak().d=y
return a}},
r0:{"^":"a:0;",
$1:function(a){return a.gi()}},
r1:{"^":"a:0;",
$1:function(a){return a.gi()}},
l0:{"^":"a:0;a",
$1:function(a){return this.a.X(a).gaN()}},
l1:{"^":"a:0;",
$1:function(a){var z=a.gak().y
if(typeof z!=="number")return z.af()
a.gak().y=z+1
return a}},
l2:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},
l3:{"^":"a:0;",
$1:function(a){return a.gaN()}},
l4:{"^":"a:0;",
$1:function(a){return a.gH()}},
l5:{"^":"a:0;a",
$1:function(a){return J.e(a.gcX(),this.a.gi())&&a.ghw()===!0}},
l6:{"^":"a:1;",
$0:function(){return}},
l7:{"^":"a:0;a",
$1:function(a){return J.e(a.gcX(),this.a.gi())}},
l8:{"^":"a:1;",
$0:function(){return}},
l9:{"^":"a:27;a",
$1:function(a){var z,y,x
if(a.gaN()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a6(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a6(z,y)
z=y}else z=!0}else z=!1
return z}},
la:{"^":"a:0;",
$1:function(a){a.sko(!1)
return a}},
lb:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}},
lc:{"^":"a:29;a",
$1:function(a){var z=this.a.X(a)
return z.gH()===!0&&z.gaN()}},
pu:{"^":"cJ;bn:a<,b,c,bx:d<,i:e<,cW:f<,r,T:x<",
Y:function(a){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cJ))return!1
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
c0:{"^":"d;a,b,c,d,e,f,r,x,y",
gbn:function(){var z,y
z=this.gak()
y=z.b
if(y==null){y=new S.N(null,null,[U.ao])
y.ag()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gak().e},
gi:function(){return this.gak().f},
gcW:function(){var z,y
z=this.gak()
y=z.r
if(y==null){y=new S.N(null,null,[P.t])
y.ag()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gT:function(){return this.gak().y},
gak:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ag()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ag()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cO(null,null,[H.m(z,0),H.m(z,1)])
y.c9()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ag()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gak()
x=y.b
if(x==null){x=new S.N(null,null,[U.ao])
x.ag()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gak()
w=x.c
if(w==null){w=new S.N(null,null,[P.t])
w.ag()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.p()
w=this.gak()
v=w.d
if(v==null){v=new A.cO(null,null,[P.t,{func:1,v:true,args:[A.a9,Y.a_]}])
v.c9()
v.m(C.a1)
w.d=v
w=v}else w=v
w=w.p()
v=this.gak().e
u=this.gak().f
t=this.gak()
s=t.r
if(s==null){s=new S.N(null,null,[P.t])
s.ag()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.gak().x
r=this.gak().y
z=new U.pu(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
cq:function(a,b,c){var z,y,x
z=b.aq("FightSituation")
y=z.gbx()
x=!J.e(c.gi(),100)
b.cl(z.gi(),z.Y(new N.u8(c,x)))
if(c.gai()===C.f){c.ay(a,"<subject> stop<s> moving",!0)
a.D(0,"\n\n",!0)
return}switch($.$get$hI().al(3)){case 0:c.cm(a,"<subject> collapse<s>"+(x?", dead":""),!0,!0)
break
case 1:c.ay(a,"<subject> fall<s> backward",!0)
c.ay(a,"<subject> twist<s>",!0)
c.cm(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ay(a,"<subject> drop<s> to <subject's> knees",!0)
c.ay(a,"<subject> keel<s> over",!0)
break}a.D(0,"\n\n",!0)},
u8:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!z.gb4()&&this.b)a.gbn().q(0,z.e)
if(z.d!=null&&this.b)a.gbn().q(0,z.d)
return a}}}],["","",,R,{"^":"",lf:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishLeap"},
ga9:function(){return""},
gaj:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.a1(z.gi(),new R.lg())
b.a1(a.gi(),new R.lh())
y=b.aq("LeapSituation").gi()
x=U.ep(b)
a.cn(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.j9(0,"both "+(a.gH()===!0||z.gH()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gam()
if(typeof w!=="number")return w.b9()
if(w>1){c.ja(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.a1(z.y,new R.li())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vN:[function(a){return new R.lf(null,!0,!0,!0,C.c,a,null)},"$1","tH",2,0,4]}},lg:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},lh:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},li:{"^":"a:0;",
$1:function(a){var z=a.gam()
if(typeof z!=="number")return z.at()
a.sam(z-1)
return a}}}],["","",,S,{"^":"",kq:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaj:function(){return"will <subject> dodge?"},
R:[function(a,b,c){var z=b.aq("LeapSituation").gi()
a.hi(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gap())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new S.kr(a,c,z),new S.ks(a,c,z),null,null)
b.aE()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.aq("LeapSituation").gi()
y=U.ep(b)
x=this.b
a.cn(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.ay(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.a1(x.gi(),new S.kt())
b.b6("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga4()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb7().b5(0.5-z+y)},
I:function(a,b){return!a.ga4()},
v:{
vI:[function(a){return new S.kq("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tA",2,0,4]}},kr:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},ks:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kt:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,D,{"^":"",lx:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaj:function(){return"will <subject> impale <objectPronoun>?"},
R:[function(a,b,c){var z,y
z=b.aq("LeapSituation").gi()
y=this.b
a.eN(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ae(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gap())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new D.ly(a,c,z),new D.lz(a,c,z),null,null)
b.aE()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.aq("LeapSituation").gi()
y=this.b
a.cn(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ae(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.ay(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gam()
if(typeof x!=="number")return x.b9()
if(x>1){a.ga_().ae(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
y.ac(c,"<subject> fall<s> to the ground")
b.a1(y.y,new D.lA())}else{a.ga_().ae(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.ay(c,"<subject> go<es> down",!0)
N.cq(c,b,y)
b.a1(y.y,new D.lB())}b.b6("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.db)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga4()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb7().b5(0.4-z+y)},
I:function(a,b){return!a.ga4()&&a.e.geG()},
v:{
vR:[function(a){return new D.lx("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","u_",2,0,4]}},ly:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lz:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lA:{"^":"a:0;",
$1:function(a){var z=a.gam()
if(typeof z!=="number")return z.at()
a.sam(z-1)
a.sai(C.f)
return a}},lB:{"^":"a:0;",
$1:function(a){a.sam(0)
return a}}}],["","",,V,{"^":"",
dA:function(a,b,c){var z=new V.dz(null,null,null,null,null,null)
new V.t8(a,b,c).$1(z)
return z.p()},
fg:{"^":"bZ;",
gaB:function(){return[S.tA(),D.u_()]},
gh:function(){return"LeapDefenseSituation"},
av:function(){var z=new V.dz(null,null,null,null,null,null)
z.m(this)
new V.m2().$1(z)
return z.p()}},
t8:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaG().c=z
a.gaG().f=0
z=this.a.gi()
a.gaG().b=z
z=this.b.gi()
a.gaG().e=z
a.gaG().d=this.c
return a}},
m2:{"^":"a:0;",
$1:function(a){var z=a.gaG().f
if(typeof z!=="number")return z.af()
a.gaG().f=z+1
return a}},
pw:{"^":"fg;cJ:a<,i:b<,cj:c<,co:d<,T:e<",
Y:function(a){var z=new V.dz(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fg))return!1
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
dz:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaG().c},
gT:function(){return this.gaG().f},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
u=this.gaG().f
z=new V.pw(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fi:function(a,b){var z=new F.dB(null,null,null,null,null)
new F.t9(a,b).$1(z)
return z.p()},
fh:{"^":"a8;",
gaB:function(){return[R.tH()]},
gh:function(){return"LeapSituation"},
av:function(){var z=new F.dB(null,null,null,null,null)
z.m(this)
new F.m3().$1(z)
return z.p()},
aQ:function(a,b){if(a===0)return b.X(this.a)
return},
aU:function(a,b){return new H.H(a,new F.m4(this),[H.m(a,0)])}},
t9:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaZ().c=z
a.gaZ().e=0
z=this.a.gi()
a.gaZ().b=z
z=this.b.gi()
a.gaZ().d=z
return a}},
m3:{"^":"a:0;",
$1:function(a){var z=a.gaZ().e
if(typeof z!=="number")return z.af()
a.gaZ().e=z+1
return a}},
m4:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
px:{"^":"fh;a,i:b<,c,T:d<",
Y:function(a){var z=new F.dB(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fh))return!1
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
dB:{"^":"d;a,b,c,d,e",
gi:function(){return this.gaZ().c},
gT:function(){return this.gaZ().e},
gaZ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaZ().b
x=this.gaZ().c
w=this.gaZ().d
v=this.gaZ().e
z=new F.px(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jq:{"^":"aa;L:b<,a0:c<,P:d<,M:e<,a",
gW:function(){return""},
gK:function(){return},
gh:function(){return"AutoLoot"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.aq("LootSituation")
y=b.X(100)
if(y.gcc()===!0&&!y.gbq()){a.ae(c,"<subject> kneel<s> next to <object>",y)
a.ae(c,"<subject> help<s> <object> to <object's> feet",y)
y.dH(c,'"I\'ll live," <subject> say<s>.',!0)
b.a1(100,new Z.jF())}x=[]
for(w=z.gbn(),w=w.gZ(w),v=b.a,u=null,t=null;w.t();){s=w.d
r=J.o(s)
if(!!r.$isb5){q=s.gcr()
p=s.gd0()
o=s.gbs()?1:0
n=a.ga_().ga8()
if(typeof n!=="number")return H.x(n)
n=2+q+p+o>n
q=n}else q=!1
if(q){m=b.X(a.gi())
l=m.Y(new Z.jG(a,s))
v.a2(0,m)
v.q(0,l)
u=s}else if(!!r.$isbk&&a.gax()==null){m=b.X(a.gi())
l=m.Y(new Z.jH(s))
v.a2(0,m)
v.q(0,l)
t=s}else{m=b.X(a.gi())
l=m.Y(new Z.jI(s))
v.a2(0,m)
v.q(0,l)
x.push(s)}}if(u!=null){a.ae(c,"<subject> pick<s> up <object>",u)
a.ae(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ae(c,"<subject> pick<s> up <object>",t)
a.ae(c,"<subject> wield<s> <object>",t)}this.ir(x,a,z,b,c)
this.iq(x,a,z,b,c)
if(x.length!==0)c.jg("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return a.gH()},
ir:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=L.b5
y=P.O(new H.H(a,new Z.jy(),[H.m(a,0)]),!0,z)
x=b.gbD()
x.toString
C.a.ar(y,H.ig(new H.H(x,new Z.jz(),[H.m(x,0)]),"$isw"))
if(y.length===0)return
C.a.c6(y,new Z.jA())
w=c.gcW().aD(0,new Z.jB(d)).de(0,new Z.jC())
for(z=J.af(w.a),x=new H.bK(z,w.b,[H.m(w,0)]),v=d.a;x.t();){u=z.gG()
if(y.length===0)break
t=C.a.hg(y)
s=d.X(u.gi())
r=s.Y(new Z.jD(t))
v.a2(0,s)
v.q(0,r)
C.a.a2(a,t)
s=d.X(b.gi())
r=s.Y(new Z.jE(t))
v.a2(0,s)
v.q(0,r)
b.ae(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}},
iq:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=E.bk
y=P.O(new H.H(a,new Z.jr(),[H.m(a,0)]),!0,z)
x=b.gbD()
x.toString
C.a.ar(y,H.ig(new H.H(x,new Z.js(),[H.m(x,0)]),"$isw"))
if(y.length===0)return
C.a.c6(y,new Z.jt())
w=c.gcW().aD(0,new Z.ju(d)).de(0,new Z.jv())
for(z=J.af(w.a),x=new H.bK(z,w.b,[H.m(w,0)]),v=d.a;x.t();){u=z.gG()
if(y.length===0)break
t=C.a.hg(y)
s=d.X(u.gi())
r=s.Y(new Z.jw(t))
v.a2(0,s)
v.q(0,r)
C.a.a2(a,t)
s=d.X(b.gi())
r=s.Y(new Z.jx(t))
v.a2(0,s)
v.q(0,r)
b.ae(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jF:{"^":"a:0;",
$1:function(a){a.sai(C.i)
a.sam(1)
return a}},jG:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.ga_() instanceof K.c1))a.gbD().q(0,z.ga_())
a.sa_(this.b)}},jH:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sax(z)
return z}},jI:{"^":"a:0;a",
$1:function(a){a.gbD().q(0,this.a)
return a}},jy:{"^":"a:0;",
$1:function(a){return a instanceof L.b5}},jz:{"^":"a:0;",
$1:function(a){return a instanceof L.b5}},jA:{"^":"a:6;",
$2:function(a,b){return J.bw(a.ga8(),b.ga8())}},jB:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},jC:{"^":"a:0;",
$1:function(a){return a.gaN()&&a.gb4()}},jD:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},jE:{"^":"a:0;a",
$1:function(a){a.gbD().a2(0,this.a)
return a}},jr:{"^":"a:0;",
$1:function(a){return a instanceof E.bk}},js:{"^":"a:0;",
$1:function(a){return a instanceof E.bk}},jt:{"^":"a:6;",
$2:function(a,b){return J.bw(a.ga8(),b.ga8())}},ju:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},jv:{"^":"a:0;",
$1:function(a){return a.gaN()&&a.gax()==null}},jw:{"^":"a:0;a",
$1:function(a){a.sax(this.a)
return a}},jx:{"^":"a:0;a",
$1:function(a){a.gbD().a2(0,this.a)
return a}}}],["","",,X,{"^":"",
me:function(a,b,c,d){var z=new X.dF(null,null,null,null,null,null)
new X.t_(a,b,c).$1(z)
return z.p()},
fn:{"^":"a8;",
gbL:function(){return H.q([$.$get$eO()],[Q.aa])},
gh:function(){return"LootSituation"},
av:function(){var z=new X.dF(null,null,null,null,null,null)
z.m(this)
new X.mg().$1(z)
return z.p()},
aQ:function(a,b){if(typeof a!=="number")return a.b9()
if(a>0)return
return this.fi(b.a)},
aU:function(a,b){return[this.fi(a)]},
da:function(a){return!0},
fi:function(a){return a.dw(0,new X.mf())}},
t_:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.N(null,null,[P.t])
z.ag()
z.m(this.a)
a.gau().d=z
z=new S.N(null,null,[U.ao])
z.ag()
z.m(this.c)
a.gau().b=z
return a}},
mg:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.af()
a.gau().f=z+1
return a}},
mf:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaN()}},
py:{"^":"fn;bn:a<,bx:b<,cW:c<,i:d<,T:e<",
Y:function(a){var z=new X.dF(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fn))return!1
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
dF:{"^":"d;a,b,c,d,e,f",
gbn:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.N(null,null,[U.ao])
y.ag()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gau().c},
gcW:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.N(null,null,[P.t])
y.ag()
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
y.ag()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.N(null,null,[H.m(z,0)])
y.ag()
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
if(x==null){x=new S.N(null,null,[U.ao])
x.ag()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.N(null,null,[P.t])
v.ag()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.py(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mu:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaj:function(){return"will <subject> hit <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to stab <object>",z)
a.an(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.a1(z.gi(),new A.mv(a))
if(b.X(z.gi()).gbq()){a.bt(c,"<subject> thrust<s> {|"+H.b(U.ae(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bt(c,"<subject> {stab<s>|run<s> "+H.b(U.ae(a))+" through} <object>",z,!0)
N.cq(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
I:function(a,b){return a.gaa()&&this.b.gap()&&a.e.geG()},
v:{
vW:[function(a){return new A.mu("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uc",2,0,4]}},mv:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gam()
y=this.a.ga_().gd0()
if(typeof z!=="number")return z.at()
a.sam(z-y)
return a}}}],["","",,U,{"^":"",
mq:function(a,b){var z=new U.dI(null,null,null,null,null)
new U.tc(a,b).$1(z)
return z.p()},
ft:{"^":"a8;",
gaB:function(){return H.q([A.uc()],[{func:1,ret:Q.B,args:[R.I]}])},
gbL:function(){return[$.$get$dO()]},
gh:function(){return"OffBalanceOpportunitySituation"},
av:function(){var z=new U.dI(null,null,null,null,null)
z.m(this)
new U.mr().$1(z)
return z.p()},
aQ:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b9()
if(a>0)return
z=b.X(this.a)
y=b.a
x=H.m(y,0)
w=P.O(new H.H(y,new U.ms(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geA(w)
if(v.gaa()&&z.gap()&&v.e.geG())return v
return},
aU:function(a,b){return new H.H(a,new U.mt(b,b.X(this.a)),[H.m(a,0)])}},
tc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gb_().d=z
a.gb_().e=0
z=this.a.gi()
a.gb_().b=z
z=this.b
z=z==null?z:z.gi()
a.gb_().c=z
return a}},
mr:{"^":"a:0;",
$1:function(a){var z=a.gb_().e
if(typeof z!=="number")return z.af()
a.gb_().e=z+1
return a}},
ms:{"^":"a:27;a,b,c",
$1:function(a){var z,y
if(a.gaN())if(a.eC(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mt:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eC(z,this.a)}},
pz:{"^":"ft;a,b,i:c<,T:d<",
Y:function(a){var z=new U.dI(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.ft))return!1
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
dI:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb_().d},
gT:function(){return this.gb_().e},
gb_:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb_().b
x=this.gb_().c
w=this.gb_().d
v=this.gb_().e
z=new U.pz(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lj:{"^":"B;K:c<,L:d<,a0:e<,P:f<,b,a",
ga9:function(){return""},
gh:function(){return"FinishPunch"},
gM:function(){return},
gaj:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gaa()?C.i:C.f
x=b.aq("PunchSituation").gi()
w=b.aq("FightSituation").gbx()
b.a1(z.y,new O.lk(y))
switch(y){case C.k:throw H.c(new P.y("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fG(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ay(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fG(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
vO:[function(a){return new O.lj(null,!0,!0,!1,a,null)},"$1","tI",2,0,4]}},lk:{"^":"a:0;a",
$1:function(a){a.sai(this.a)
return a}}}],["","",,E,{"^":"",ku:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaj:function(){return"will <subject> dodge the fist?"},
R:[function(a,b,c){var z=b.aq("PunchSituation").gi()
a.hi(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a7(new E.kv(a,c,z),new E.kw(this,a,c,z),null,null)
b.aE()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.cn(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.aq("PunchSituation").gi(),z,!0)
b.b6("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cE(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb7().b5(0.4-z)},
I:function(a,b){return!0},
v:{
vJ:[function(a){return new E.ku("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tB",2,0,4]}},kv:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kw:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kH(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dU:function(a,b,c){var z=new Z.dT(null,null,null,null,null,null)
new Z.t6(a,b,c).$1(z)
return z.p()},
fD:{"^":"bZ;",
gaB:function(){return[E.tB()]},
gh:function(){return"PunchDefenseSituation"},
av:function(){var z=new Z.dT(null,null,null,null,null,null)
z.m(this)
new Z.na().$1(z)
return z.p()}},
t6:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
na:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.af()
a.gaI().f=z+1
return a}},
pC:{"^":"fD;cJ:a<,i:b<,cj:c<,co:d<,T:e<",
Y:function(a){var z=new Z.dT(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fD))return!1
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
dT:{"^":"d;a,b,c,d,e,f",
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
z=new Z.pC(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fF:function(a,b){var z=new Q.dV(null,null,null,null,null)
new Q.t7(a,b).$1(z)
return z.p()},
fE:{"^":"a8;",
gaB:function(){return[O.tI()]},
gh:function(){return"PunchSituation"},
av:function(){var z=new Q.dV(null,null,null,null,null)
z.m(this)
new Q.nb().$1(z)
return z.p()},
aQ:function(a,b){if(a===0)return b.X(this.a)
return},
aU:function(a,b){return new H.H(a,new Q.nc(this),[H.m(a,0)])}},
t7:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gb0().c=z
a.gb0().e=0
z=this.a.gi()
a.gb0().b=z
z=this.b.gi()
a.gb0().d=z
return a}},
nb:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.af()
a.gb0().e=z+1
return a}},
nc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pD:{"^":"fE;a,i:b<,c,T:d<",
Y:function(a){var z=new Q.dV(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fE))return!1
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
dV:{"^":"d;a,b,c,d,e",
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
z=new Q.pD(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ll:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlash"},
ga9:function(){return""},
gaj:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.a1(z.gi(),new O.lo(a))
y=b.aq("SlashSituation").gi()
x=!b.X(z.gi()).gbq()&&!J.e(z.gi(),100)
if(!x){a.cn(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.cn(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
N.cq(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return a.ga_().gbf()},
v:{
vQ:[function(a){return new O.ll(null,!0,!0,!0,C.c,a,null)},"$1","tJ",2,0,4]}},lo:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gam()
y=this.a.ga_().gcr()
if(typeof z!=="number")return z.at()
a.sam(z-y)
return a}}}],["","",,X,{"^":"",kf:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaj:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ae(a))+"|fend it off}")
if(a.gap())a.an(c,"<subject> <is> out of balance",!0)
else S.a7(new X.kg(a,c),new X.kh(this,a,c),null,null)
b.aE()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gH()===!0)a.ac(c,"<subject> {step<s>|take<s> a step} back")
a.bg(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off}",!0)
if(!a.gaa()){b.a1(a.y,new X.ki())
if(a.ch===!0)a.ac(c,"<subject> regain<s> balance")}b.b6("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.gaa()?0:0.2
return y.gb7().b5(0.5-x)},
I:function(a,b){return a.ga_().gcL()},
v:{
vG:[function(a){return new X.kf("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","ty",2,0,4]}},kg:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kh:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ki:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,F,{"^":"",kx:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"DodgeSlash"},
ga9:function(){return"dodge and counter"},
gaj:function(){return"will <subject> dodge?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.an(c,"<subject> <is> out of balance",!0)
else S.a7(new F.ky(a,c),new F.kz(this,a,c),null,null)
b.aE()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bt(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gaa()){z.cm(c,"<subject> lose<s> balance because of that",!0,!0)
b.a1(z.y,new F.kA())}b.b6("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cE(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb7().b5(0.4-z)},
I:function(a,b){return!a.ga4()},
v:{
vK:[function(a){return new F.kx("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tC",2,0,4]}},ky:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kz:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kA:{"^":"a:0;",
$1:function(a){a.sai(C.i)
return C.i}}}],["","",,O,{"^":"",lV:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaj:function(){return"will <subject> avoid the slash?"},
R:[function(a,b,c){a.dH(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aE()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.bg(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.ca(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.ga_())
b.b6("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.gaa()?0:0.2
return y.gb7().b5(0.5-x)},
I:function(a,b){return a.gb4()},
v:{
vU:[function(a){return new O.lV("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","u6",2,0,4]}}}],["","",,G,{"^":"",mH:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"ParrySlash"},
ga9:function(){return"parry and counter"},
gaj:function(){return"will <subject> parry?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ae(a))+"|fend it off}")
if(a.gap())a.an(c,"<subject> <is> out of balance",!0)
else S.a7(new G.mI(a,c),new G.mJ(this,a,c),null,null)
b.aE()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gap()){c.er(0,"<subject> <is> out of balance",!0,!0,z)
c.ca(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iy())
a.bg(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off easily}",!0)}else a.bg(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off}",!0)
b.b6("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cE(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gap()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb7().b5(0.3-z+y)},
I:function(a,b){return a.ga_().gcL()},
v:{
vZ:[function(a){return new G.mH("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uf",2,0,4]}},mI:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mJ:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",o2:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaj:function(){return"will <subject> block the slash?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bT(a)))
if(a.gap())a.an(c,"<subject> <is> out of balance",!0)
else S.a7(new E.o3(a,c),new E.o4(a,c),new E.o5(this,a,c),null)
b.aE()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gap()){c.er(0,"<subject> <is> out of balance",!0,!0,z)
c.ca(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ix())
a.bg(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bT(a)),!0)}else a.bg(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bT(a)),!0)
b.b6("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cE(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gap()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb7().b5(0.5-z+y)},
I:function(a,b){return a.gax()!=null},
v:{
w5:[function(a){return new E.o2("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","ur",2,0,4]}},o3:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},o4:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> <is> too slow",!0)}},o5:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bl:function(a,b,c){var z=new L.dZ(null,null,null,null,null,null)
new L.t0(a,b,c).$1(z)
return z.p()},
fR:{"^":"bZ;",
gaB:function(){return[X.ty(),F.tC(),O.u6(),G.uf(),E.ur()]},
gh:function(){return"SlashDefenseSituation"},
av:function(){var z=new L.dZ(null,null,null,null,null,null)
z.m(this)
new L.o9().$1(z)
return z.p()}},
t0:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
o9:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.af()
a.gaJ().f=z+1
return a}},
pF:{"^":"fR;cJ:a<,i:b<,cj:c<,co:d<,T:e<",
Y:function(a){var z=new L.dZ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fR))return!1
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
dZ:{"^":"d;a,b,c,d,e,f",
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
z=new L.pF(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bG:function(a,b){var z=new M.e_(null,null,null,null,null)
new M.t2(a,b).$1(z)
return z.p()},
fS:{"^":"a8;",
gaB:function(){return[O.tJ()]},
gh:function(){return"SlashSituation"},
av:function(){var z=new M.e_(null,null,null,null,null)
z.m(this)
new M.oa().$1(z)
return z.p()},
aQ:function(a,b){if(a===0)return b.X(this.a)
return},
aU:function(a,b){return new H.H(a,new M.ob(this),[H.m(a,0)])}},
t2:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gb1().c=z
a.gb1().e=0
z=this.a.gi()
a.gb1().b=z
z=this.b.gi()
a.gb1().d=z
return a}},
oa:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.af()
a.gb1().e=z+1
return a}},
ob:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pG:{"^":"fS;a,i:b<,c,T:d<",
Y:function(a){var z=new M.e_(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fS))return!1
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
e_:{"^":"d;a,b,c,d,e",
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
z=new M.pG(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lm:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga9:function(){return""},
gaj:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.a1(z.gi(),new Q.ln())
c.fF(0,"<subject> {cuts|slashes|slits} <object's> "+(J.e(z.gi(),100)?"side":"{throat|neck|side}"),z,a.ga_())
N.cq(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return this.b.ga4()&&a.ga_().gbf()},
v:{
vP:[function(a){return new Q.lm(null,!0,!0,!0,C.c,a,null)},"$1","tK",2,0,4]}},ln:{"^":"a:0;",
$1:function(a){a.sam(0)
return a}}}],["","",,K,{"^":"",mx:{"^":"B;L:c<,a0:d<,P:e<,M:f<,K:r<,b,a",
gh:function(){return"OnGroundParry"},
ga9:function(){return"parry it"},
gaj:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ae(a))+"}}")
S.a7(new K.my(a,c),new K.mz(this,a,c),null,null)
b.aE()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){a.bg(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ae(a))+"}",!0)
b.b6("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb7().b5(0.3)},
I:function(a,b){return a.ga_().gcL()},
v:{
vX:[function(a){return new K.mx(!1,!1,!0,C.c,"TODO",a,null)},"$1","ud",2,0,4]}},my:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mz:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mA:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
ga9:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaj:function(){return"will <subject> block the strike?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bT(a)))
S.a7(new L.mB(a,c),new L.mC(a,c),new L.mD(this,a,c),null)
b.aE()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gap()){c.er(0,"<subject> <is> out of balance",!0,!0,z)
c.ca(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iz())
a.bg(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bT(a)),!0)}else a.bg(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bT(a)),!0)
b.b6("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gb7().b5(0.5)},
I:function(a,b){return a.gax()!=null},
v:{
vY:[function(a){return new L.mA("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","ue",2,0,4]}},mB:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mC:{"^":"a:1;a,b",
$0:function(){return this.a.an(this.b,"<subject> <is> too slow",!0)}},mD:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.bY(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",no:{"^":"B;K:c<,L:d<,a0:e<,P:f<,M:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga9:function(){return"roll out of way"},
gaj:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ac(c,"<subject> tr<ies> to roll out of the way")
a.an(c,"<subject> can't",!0)
b.aE()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gN",6,0,2],
S:[function(a,b,c){a.kE(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a1(a.gi(),new Y.np())
a.bg(c,"<subject> jump<s> up on <subject's> feet",!0)}b.b6("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gH()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gb7().b5(0.5)},
I:function(a,b){return!0},
v:{
w4:[function(a){return new Y.no(null,!1,!1,!0,C.c,a,null)},"$1","um",2,0,4]}},np:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,V,{"^":"",
dK:function(a,b,c){var z=new V.dJ(null,null,null,null,null,null)
new V.t3(a,b,c).$1(z)
return z.p()},
fu:{"^":"bZ;",
gaB:function(){return[K.ud(),L.ue(),Y.um()]},
gh:function(){return"OnGroundDefenseSituation"},
av:function(){var z=new V.dJ(null,null,null,null,null,null)
z.m(this)
new V.mw().$1(z)
return z.p()}},
t3:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gi()
a.gaH().b=z
z=this.b.gi()
a.gaH().e=z
a.gaH().d=this.c
return a}},
mw:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.af()
a.gaH().f=z+1
return a}},
pA:{"^":"fu;cJ:a<,i:b<,cj:c<,co:d<,T:e<",
Y:function(a){var z=new V.dJ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fu))return!1
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
dJ:{"^":"d;a,b,c,d,e,f",
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
z=new V.pA(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
h0:function(a,b){var z=new D.e0(null,null,null,null,null)
new D.t5(a,b).$1(z)
return z.p()},
h_:{"^":"a8;",
gaB:function(){return[Q.tK()]},
gh:function(){return"StrikeDownSituation"},
av:function(){var z=new D.e0(null,null,null,null,null)
z.m(this)
new D.oQ().$1(z)
return z.p()},
aQ:function(a,b){if(a===0)return b.X(this.a)
return},
aU:function(a,b){return new H.H(a,new D.oR(this),[H.m(a,0)])}},
t5:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
oQ:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.af()
a.gb2().e=z+1
return a}},
oR:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pH:{"^":"h_;a,i:b<,c,T:d<",
Y:function(a){var z=new D.e0(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.h_))return!1
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
e0:{"^":"d;a,b,c,d,e",
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
z=new D.pH(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",n0:{"^":"d;",
gb7:function(){switch(this.gcj()){case C.l:return C.a2
case C.m:return $.$get$fy()
case C.q:return $.$get$fz()
default:throw H.c(P.E(this.gcj()))}},
$isa8:1}}],["","",,K,{"^":"",dR:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",od:{"^":"aa;L:b<,P:c<,a0:d<,M:e<,a",
gW:function(){return""},
gK:function(){return},
gh:function(){return"SlayMonstersAction"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gw(z):null
x=b.dS(y.gbC())
w=b.a
C.a.q(z,x.jJ(b,y,new H.H(w,new D.oe(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
return H.M(z.length!==0?C.a.gw(z):null,"$isV").c}},oe:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaN()){z=a.gbh()
y=this.a.gbh()
z=z.a
y=y.gi()
if(z==null?y==null:z===y){z=a.gbC()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",p_:{"^":"cI;L:c<,a0:d<,P:e<,M:f<,b,a",
gK:function(){return},
gh:function(){return"TakeExitAction"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaM())
y=b.f
H.M(y.length!==0?C.a.gw(y):null,"$isV").dC(b,a,z.gjB(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
if(H.M(z.length!==0?C.a.gw(z):null,"$isV").c===!0)return!1
this.b.gk8()
return!0},
v:{
w9:[function(a){return new Y.p_(!1,!0,!1,null,a,null)},"$1","vx",2,0,48]}}}],["","",,F,{"^":"",
fJ:function(a,b){var z=new F.dX(null,null,null,null,null)
new F.rQ(a,b).$1(z)
return z.p()},
V:{"^":"a8;",
gaB:function(){return[Y.vx()]},
gbL:function(){var z=[]
C.a.ar(z,$.$get$hP())
z.push($.$get$fU())
return z},
gdB:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
av:function(){var z=new F.dX(null,null,null,null,null)
z.m(this)
new F.nq().$1(z)
return z.p()},
aQ:function(a,b){return b.a.be(0,new F.nr(),new F.ns())},
aU:function(a,b){var z=this.aQ(null,b)
if(z==null)return[]
return[z]},
dC:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dS(c)
a.cl(this.b,F.fJ(z,z.gjI()!=null))
if(this.i9(a,b,z))z.d.$3(b,a,d)
else{d.D(0,"\n\n",!0)
z.c.$3(b,a,d)
d.D(0,"\n\n",!0)}for(y=R.i8(b,a),y=P.O(y,!0,H.z(y,"w",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.X(y[v].gi())
t=u.Y(new F.nt(z))
w.a2(0,u)
w.q(0,t)}},
h8:function(a,b){a.a.iv(new F.nu(),!0)},
da:function(a){if(J.e(this.a,$.$get$en().b))return!1
return!0},
i9:function(a,b,c){var z,y,x
for(z=a.d,z=new P.ec(z,z.c,z.d,z.b,null,[H.m(z,0)]),y=c.b;z.t();){x=z.e
if(!J.e(x.gcX(),b.gi()))continue
if(x.geq()!=="TakeExitAction")continue
if(J.eG(x.gaM(),y)===!0)return!0}return!1}},
rQ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gaA().c=z
a.gaA().e=0
z=this.a.gh()
a.gaA().b=z
a.gaA().d=this.b
return a}},
nq:{"^":"a:0;",
$1:function(a){var z=a.gaA().e
if(typeof z!=="number")return z.af()
a.gaA().e=z+1
return a}},
nr:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaN()}},
ns:{"^":"a:1;",
$0:function(){return}},
nt:{"^":"a:0;a",
$1:function(a){a.sbC(this.a.b)
return a}},
nu:{"^":"a:0;",
$1:function(a){return!a.gbq()}},
pE:{"^":"V;bC:a<,i:b<,c,T:d<",
Y:function(a){var z=new F.dX(null,null,null,null,null)
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
dX:{"^":"d;a,b,c,d,e",
gbC:function(){return this.gaA().b},
sbC:function(a){this.gaA().b=a
return a},
gi:function(){return this.gaA().c},
sko:function(a){this.gaA().d=a
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
z=new F.pE(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
wn:[function(a,b,c){var z,y
z=R.aX(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.r,0,$.$get$co())
y=z.y
a.gfD().q(0,z)
return U.dq(c,[z],"{rock|cavern} floor",b,P.ab([1,new O.tM(y),5,new O.tN(y),9,new O.tO(y),12,new O.tP(y),17,new O.tQ(y)]))},"$3","vB",6,0,10],
wo:[function(a,b,c){var z,y,x,w,v
z=$.$get$hH()
y=z.al(999999)
x=P.b3(C.p,null)
w=$.$get$co()
v=[R.aX(1000+y,"orc",O.da(),null,null,new G.b4("sword",1,1,!1,!0,!1,x),null,0,2,0,!1,2,!1,C.r,0,w),R.aX(1000+z.al(999999),"goblin",O.da(),null,null,new G.b4("scimitar",1,1,!1,!0,!1,P.b3(C.p,null)),null,0,1,0,!1,1,!1,C.r,0,w)]
a.gfD().ar(0,v)
return U.dq(c,v,"{rock|cavern} floor",b,P.aJ())},"$3","iG",6,0,10],
wp:[function(a,b,c){var z,y,x
z=a.bl("talk_to_briana_3")?"guardian":"orc"
y=R.aX(6667,z,null,null,null,new G.b4("rusty sword",1,1,!1,!0,!1,P.b3(C.p,null)),null,0,3,100,!1,3,!1,C.r,0,$.$get$co())
x=y.y
a.a.q(0,y)
return U.dq(c,[y],"{rock|cavern} floor",b,P.ab([1,new O.tS(x),9,new O.tT(x)]))},"$3","vC",6,0,10],
bS:function(a){return a.a.by(0,new O.tV())},
tX:function(a,b){a.a1(O.bS(a).gi(),new O.tY(b))},
et:function(a){var z=a.f
if(H.M(z.length!==0?C.a.gw(z):null,"$isV").c===!0)return!1
return C.a.a6(C.a_,H.M(z.length!==0?C.a.gw(z):null,"$isV").a)},
ii:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gZ(z),x=new H.bK(y,new O.u9(),[H.m(z,0)]);x.t();){w=y.gG()
if(!w.gb4()){v=H.M(w.e,"$isb4")
y=b
x=v.c
u=v.d
v.r
t=P.O(C.p,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.X(w.y)
r=s.Y(new O.ua(new G.b4(y,x,u,!0,!0,!1,t)))
z.a2(0,s)
z.q(0,r)
break}}},
ew:function(a,b){var z,y,x
z=H.M(a.c,"$iscG").b
if(z>=5)return
b.D(0,C.a0[z],!0)
y=H.M(a.c,"$iscG")
y.toString
x=new M.e3(null,!1,0,0)
x.m(y)
a.c=new O.ul().$1(x).p()},
ex:function(a,b,c,d){b.a1(a.gi(),new O.uq())
if(!d)c.q(0,"TODO: create fight")},
tM:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.X(z)
x=new G.b4("scimitar",1,1,!1,!0,!1,P.b3(C.p,null))
y.ac(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ae(b,"<subject> draw<s> <subject's> <object>",x)
a.a1(z,new O.tL(x))
y.hl(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.bS(a),!0)}},
tL:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},
tN:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).ac(b,"<subject> spit<s> on the cavern floor")}},
tO:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
b.fI()
z.dH(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.D(0,"\n\n",!0)}},
tP:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
z.ac(b,"<subject> grit<s> <subject's> teeth")
z.an(b,"<subject> do<es>n't talk any more",!0)}},
tQ:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).ac(b,"<subject> scowl<s> with pure hatred")}},
tS:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).hl(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.bS(a),!0)}},
tT:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
b.fI()
z.dH(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.D(0,"\n\n",!0)}},
tV:{"^":"a:0;",
$1:function(a){return a.gH()}},
tY:{"^":"a:0;a",
$1:function(a){var z=a.gba()
if(typeof z!=="number")return z.af()
a.sba(z+this.a)
return a}},
u9:{"^":"a:0;",
$1:function(a){return J.e(a.gbh(),$.$get$eu())}},
ua:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},
ul:{"^":"a:0;",
$1:function(a){var z
a.gcs()
z=a.c
a.gcs()
a.c=z+1
return a}},
uq:{"^":"a:0;",
$1:function(a){a.sax(new E.bk("shield",P.b3(C.Z,null)))
return a}}}],["","",,V,{"^":"",
lq:function(){var z=new V.dr(null,null,null)
new V.td().$1(z)
return z.p()},
rO:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rP:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
rN:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The corpse lies still, getting cold.\n",!0)
O.ew(b,c)
c.D(0,"",!0)}},
o_:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"cave_with_agruth"))return!1
if(b.bl(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)",!0)
O.tX(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gL:function(){return!1}},
rK:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n"We must stop this." \n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection."\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. You know  I survived 3 years even though  none other made it for more than a few months. I think he wants me for something."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not giving it to him. Giving him the exact opposite of what he wants."\n\n\nWith that, you sheathe (weapon) and start down the road towards the black fort in the distance.\n',!0)}},
rL:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rH:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The crevice is small.\n",!0)}},
rI:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
rF:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
rG:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)
if(b.bl("guardpost_above_church_take_shield")&&!b.j4("guardpost_above_church_take_shield"))c.q(0,"The goblin's corpse is sprawled on the ground.")
else c.q(0,"The goblin is sleeping soundly.")
c.D(0,"",!0)}},
lp:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"guardpost_above_church"))return!1
if(b.dI(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.D(0,"TODO - take without waking the guard",!0)
O.ex(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gO",6,0,2],
R:[function(a,b,c){c.D(0,"TODO - start taking, guard is beginning to wake. You have to stay in an uncomfortable position for a minute before continuing",!0)
C.a.q(b.f,V.lq())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gN",6,0,2],
J:function(a,b){return 0.8},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"TODO"},
gL:function(){return!1}},
f3:{"^":"a8;",
gbL:function(){return[new A.fP(new V.ls(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat.","guardpost_above_church_take_shield_rescue",!0,null),new A.fP(new V.lt(),"Snag the shield","TODO","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
av:function(){var z=new V.dr(null,null,null)
z.m(this)
new V.lu().$1(z)
return z.p()},
aQ:function(a,b){if(a!==0)return
return b.a.by(0,new V.lv())},
aU:function(a,b){return[a.by(0,new V.lw())]}},
td:{"^":"a:0;",
$1:function(a){var z=$.$get$a5().al(1073741823)
a.gbK().b=z
a.gbK().c=0
return a}},
ls:{"^":"a:26;",
$4:function(a,b,c,d){J.eF(c,"TODO - staying still, drops of sweat dripping on the guard, but ultimately the guard goes back to sleep and you take the shield",!0)
b.a1(a.gi(),new V.lr())
O.ex(a,b,c,!0)
b.aE()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lr:{"^":"a:0;",
$1:function(a){var z=a.gba()
if(typeof z!=="number")return z.at()
a.sba(z-1)
return a}},
lt:{"^":"a:26;",
$4:function(a,b,c,d){J.eF(c,"TODO",!0)
O.ex(a,b,c,!1)
b.aE()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snag the shield)"}},
lu:{"^":"a:0;",
$1:function(a){var z=a.gbK().c
if(typeof z!=="number")return z.af()
a.gbK().c=z+1
return a}},
lv:{"^":"a:0;",
$1:function(a){return a.gH()}},
lw:{"^":"a:0;",
$1:function(a){return a.gH()}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. The fear has gone during the short battle but the anger remains. She kicks the dead slaver in the hip. When she notices you looking at her, she looks back. "What?" she says flatly.\n\n\nShe spits on the body and turns the attention to the sword. "You know, we should name the weapon\u2014it\'s the only thing we have going for us right now. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name. "That creature does not deserve another mention."\n',!0)}},
rE:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
ml:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.D(0,'You look at the sword. "You\'re right. We\'ll call it Luck Bringer. It\'s our only chance to get out of this hell."\n\n\nBriana nods. "Luck Bringer it is."',!0)
O.ii(b,"Luck Bringer")
b.aq("RoomRoamingSituation").dC(b,O.bS(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
mm:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.D(0,'You look at the sword. "You\'re right. We\'ll call it Savior. It is our first step to freedom."\n\n\nBriana nods. "Savior it is."',!0)
O.ii(b,"Savior")
b.aq("RoomRoamingSituation").dC(b,O.bS(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
mk:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.D(0,"\"That's foolish. It's just a sword, after all.\"\n\n\nBriana shrugs. \"Whatever, just don't ever call it Agruth's. I already have more respect to the piece of iron than to that worthless animal over here.\"",!0)
b.aq("RoomRoamingSituation").dC(b,O.bS(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rB:{"^":"a:5;",
$3:function(a,b,c){c.D(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rC:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO\n",!0)}},
rz:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
rA:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
p0:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"orcthorn_room"))return!1
if(b.bl("talk_to_briana_3"))if(!b.bl(this.d))z=H.M(z.length!==0?C.a.gw(z):null,"$isV").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
S:[function(a,b,c){c.D(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."',!0)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rw:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO\n",!0)}},
rx:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO\n",!0)}},
oc:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"slave_quarters"))return!1
return!0},
S:[function(a,b,c){c.D(0,"TODO FIGHT",!0)
b.aE()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
ru:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rv:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The small door is TODO open/close.\n",!0)}},
rs:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These is the smelter.\n\n\nOrc teams tilt huge kettles of molten steel into troughs that lead the white-hot liquid across the room, into a large pool. From that pool, a single orc is distributing the forge-ready steel into troughs that lead to the war forges below. He's no more than a spear's throw away from you, but doesn't notice. In fact, he may well be blind. The other orcs are two far away and too busy to look around.\n\n\nA small crevice appears to be sucking the hot air. TODO describe  other exits\n",!0)}},
rt:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n",!0)}},
rq:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rr:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
p2:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){if(!(b.dI(this.d)==null&&O.et(b)))return!1
return!0},
S:[function(a,b,c){c.D(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p3:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){if(!(b.bl("talk_to_briana_1")&&b.dI(this.d)==null&&O.et(b)))return!1
return!0},
S:[function(a,b,c){c.D(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p4:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){if(!(b.bl("talk_to_briana_2")&&b.dI(this.d)==null&&O.et(b)))return!1
return!0},
S:[function(a,b,c){c.D(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
ro:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rp:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
tf:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"",!0)}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\nAfter a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The Underground Church stands silent, as if holding breath.\n",!0)
O.ew(b,c)
c.D(0,"",!0)}},
kZ:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"underground_church"))return!1
if(b.bl(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\nBriana: "So this is it? This is where the Dead Prince resides?"\n\n\n"This is one of many of these temples inside the mountain. So I think not."\n\n\n"So where is he? Everyone knows he\'s from Mt. Bloodrock."\n\n\n"The Dead Prince is _somewhere_ here, that\'s correct. But where exactly? The orcs say the whole mountain is his vessel. Whatever that means."\n\n\nThe glow coming from the altar dims for a moment, then lights up again.',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rJ:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO - altar, eight black eyes, spear that some goblin must have forgotten here, there is motion behind the altar (wait)\n",!0)}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The altar glows with a dim red light that reflect in the eight black eyes above it.\n",!0)}},
pe:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"underground_church_altar"))return!1
if(b.bl(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,'TODO - build up with sounds\n\n\nA lich orc enters from a steel door on the right of the altar and the whole temple sounds a tone that is powerful and sickening at the same time. After the lich, a huge creature enters through the door, crouching below the door\'s frame. It\'s unclear what it is, but perhaps some large breed of ogre, and judging by the braided hair, a female. Her sword is as long as you are tall, but she doesn\'t wield it. She leads someone on a chain. An orc. Despite being a strong one, probably captain or even chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nTODO: the lich will take him on the altar. Aren says \'maggots\', somehow he knows. From underneath the altar, a large horde of maggots appears. The orc tries to escape, horrified, but the ogre pin him. The maggots crawl all over the orc, and as he screams, the church reacts with tones. The lich raises his hands as if in offering. Somehow, Aren find the whole experience invigorating (+2 stamina). Once the orc is dead, rychl\xfd process. Ogre drag the body. Leave. Briana : "how did you know it will be maggots?". Aren : "I\'ll explain when we get out of here." Briana : "And if it was meant to be an offering, why did they not leave the body?" Aren : "that I don\'t know"',!0)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p1:{"^":"ad;W:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.M(z.length!==0?C.a.gw(z):null,"$isV").a,"underground_church_altar"))return!1
if(b.bl(this.d))return!1
return!0},
S:[function(a,b,c){c.D(0,"TODO - a forgotten, orcish spear",!0)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.y("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rn:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"TODO: first impression, clangs, shouts, heaving carts of steel\n\n\nFrom above, troughs of molten steel descend into all parts of the room like huge fiery tentacles. At the end of each, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. \n\n\nYou and Briana duck behind some carts. You can guess which corridor leads to the smelter. Hot air is flowing into the forge through it, stirring the smoke. It's up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n",!0)}},
ry:{"^":"a:5;",
$3:function(a,b,c){c.D(0,"The air in the war forges is heavy and the noise overwhelming.\n",!0)
O.ew(b,c)
c.D(0,"",!0)}},
pv:{"^":"f3;i:a<,T:b<",
Y:function(a){var z=new V.dr(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f3))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.T(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dr:{"^":"d;a,b,c",
gi:function(){return this.gbK().b},
gT:function(){return this.gbK().c},
gbK:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbK().b
x=this.gbK().c
z=new V.pv(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
wm:[function(a){var z,y
z=$.$get$de()
y=z.B
if(y.length>0){y+=" "
z.B=y}z.B=y+a},"$1","uo",2,0,15],
wq:[function(a){$.er=a},"$1","up",2,0,15],
hX:[function(a,b,c,d,e,f,g){var z=L.eT(a,!1,!1,d,e,f,g)
$.$get$bR().q(0,z)
return z},function(a){return O.hX(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hX(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","un",2,13,51,0,0,0,1,1,0],
nB:{"^":"nN;",
bw:function(){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bw=P.aw(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cg){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.om()
m.toString
l=new A.v(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.F(0,$.p,null,[null]).bz(!0)}if(t.r){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.E())
t.r=!1
m=t.Q
m.toString
n=new A.v(60,null,null,null,null)
n.b=t.f.cp(0)
m.a.F(n.E())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.E())
w=7
z=10
return P.av(t.cB(),$async$bw)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.A(j)
if(n instanceof M.cy){r=n
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
case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$bw,y)},
eO:function(){var z,y
this.fl()
this.f.b3(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hn(Z.bI())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bI()
z.a.F(y.E())
this.bw()},
l2:[function(a){var z,y
z={}
z.a=null
y=$.$get$bR()
y.V(0,new O.nY(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iM(z)
this.bw()},"$1","gix",2,0,32],
iM:function(a){var z
if(a.gfV()!=null){z=a.r
$.$get$cm().az(z)}z=a.x
if(z!=null)this.em(z)},
cB:function(){var z=0,y=P.az(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cB=P.aw(function(a,a0){if(a===1)return P.aB(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cn()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.v(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dG()
r=v.Q
q=p.gjk()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.F(0,$.p,null,[null])
r.bz(null)
r.c_(new O.nO(v))
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
k=new A.v(667,null,null,null,null)
k.c=r
o.a.F(k.E())
k=$.$get$bR()
k.iu(new O.nP(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.z(k,"b1",0)
o=P.O(new H.H(k,new O.nQ(u,l),[o]),!0,o)
r=k.a
H.q([],[L.a1])
j=new L.eU(r,o)
if(!j.gU(j)){u=v.Q
r=u.e
if(r!=null){r.du(new D.bX("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.ch(new P.F(0,$.p,null,[r]),[r])
r=j.dL()
u.a.F(r.E())
u=u.e.a.c_(v.gix())
i=new O.nR(v)
r=H.m(u,0)
q=$.p
if(q!==C.h){i=P.ei(i,q)
q.toString}u.df(new P.ea(null,new P.F(0,q,null,[r]),6,new O.nS(),i,[r,r]))
x=!0
z=1
break}else{h=k.be(0,new O.nT(),new O.nU())
if(h!=null){if(h.gfV()!=null){r=h.r
$.$get$cm().az(r)}r=h.x
if(r!=null)v.em(r)
k.a2(0,h)}}}r=$.$get$cm()
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
return P.av(v.cC(f),$async$cB)
case 5:x=a0
z=1
break
case 4:r=$.er
if(r!=null){v.em(r)
$.er=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaw().length-1
v.x=r}else if($.hJ)$.hJ=!1
else{++r
v.x=r}u.a=r===v.e.gaw().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gaw().length){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="End of book."
u.a.F(r.E())
r=v.Q
u=v.e4()
r.toString
u=u.eR(50)
r.a.F(u.E())
v.Q.a.F(new A.v(80,null,null,null,null).E())
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
r=P.a0
u.f=new P.ch(new P.F(0,$.p,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c_(new O.nV(v))
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
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.F(q.E())
try{r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.ji(r[q])}catch(b){u=H.A(b)
if(u instanceof M.cy){t=u
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
if(k.bT(0,new O.nW(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.e4()
r.toString
u=u.eR(50)
r.a.F(u.E())
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
r={func:1,ret:[P.P,P.as]}
z=H.ax(q,r)?12:14
break
case 12:d=v.x===v.e.gaw().length-1?v.e4():null
q=v.e.gaw()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.av(v.cC(H.i4(q[o],r)),$async$cB)
case 15:c=a0
if(k.bT(0,new O.nX(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=d.eR(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaw()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.y("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aC(x,y)}})
return P.aD($async$cB,y)},
em:function(a){var z,y,x,w,v
z=$.$get$cC()
if(z.b.test(H.bt(a))){y=this.d
if(y==null)throw H.c(new P.y("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.at()
w=z-1}else{x=this.b.dR(a,this.e.gdT())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a6(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghu()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghu()
else z=!1}else z=!1
$.hG=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.F(v.E())
v=this.e
this.d=new O.nC(v,this.x)
this.e=x
this.x=w
v.e=J.am(v.gdM(),1)},
fl:function(){var z,y,x,w,v,u
this.x=null
$.$get$cm().b3(0)
$.$get$bR().sl(0,0)
$.r3=null
x=$.$get$cs()
x.b3(0)
w=$.$get$cn()
x.n(0,"points",w)
w.a=0
w.b.b3(0)
this.b.jm()
$.id=!0
try{this.jZ()}catch(v){z=H.A(v)
y=H.C(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hd()
$.id=!1},
cC:function(a){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cC=P.aw(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$de()
q.B=""
w=4
z=7
return P.av(a.$0(),$async$cC)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.A(m)
r=H.C(m)
q.B+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cy(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.B.length!==0){t.Q.eZ(J.h(q)).c_(new O.nZ(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$cC,y)},
iE:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cC().b.test(H.bt(z)))return!1
y=this.b.dR(z,this.e.gdT())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gkU()
return!1},"$1","gfp",2,0,33],
e4:function(){var z,y,x,w,v,u
this.hd()
try{x=this.e.gh()
w=$.$get$cs()
x=new Z.fK(x,this.b.jH(),null,null,null,null)
x.c=H.aG(Z.cW(w),"$isG",[P.r,P.d],"$asG")
x.f=Date.now()
x.e=C.e.kR(H.aA(x),16)
return x}catch(v){z=H.A(v)
y=H.C(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
h3:function(a,b){var z,y,x
this.fl()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.ds("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.E())
z.jW(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.E())
this.f.ar(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.E())
y=$.$get$cs()
Z.ny(a,y,P.dC(P.r,P.bz))
this.cx=H.M(y.j(0,"game"),"$iseZ")
this.cy=H.aG(y.j(0,"hitpoints"),"$isat",[P.aP],"$asat")
z=[P.t]
this.db=H.aG(y.j(0,"stamina"),"$isat",z,"$asat")
this.dx=H.aG(y.j(0,"gold"),"$isat",z,"$asat")
z=this.Q
Z.hn(Z.bI())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bI()
z.a.F(y.E())
y=this.Q
y.toString
z=new A.v(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.E())
this.bw()},
kj:function(a){return this.h3(a,null)},
dV:[function(a,b,c,d){var z=0,y=P.az(),x,w=this,v,u,t
var $async$dV=P.aw(function(e,f){if(e===1)return P.aB(f,y)
while(true)switch(z){case 0:v=$.$get$de()
if(v.B.length!==0){w.Q.eZ(J.h(v))
v.B=""}v=w.Q
v.toString
u=new A.v(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.ce
t=new P.F(0,$.p,null,[u])
v.x=new P.ch(t,[u])
x=t
z=1
break
case 1:return P.aC(x,y)}})
return P.aD($async$dV,y)},function(a,b){return this.dV(a,b,null,!1)},"kZ","$4$rerollEffectDescription$rerollable","$2","ghP",4,5,44,1,0]},
nY:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf_(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cC().b.test(H.bt(z))?y.d.a:y.b.dR(z,y.e.gdT())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
nO:{"^":"a:0;a",
$1:function(a){return this.a.bw()}},
nP:{"^":"a:0;a",
$1:function(a){return a.gf_()||this.a.iE(a)}},
nQ:{"^":"a:35;a,b",
$1:function(a){return a.k9(this.b,this.a.a)}},
nR:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
nS:{"^":"a:0;",
$1:function(a){return a instanceof D.bX}},
nT:{"^":"a:0;",
$1:function(a){return a.gka()}},
nU:{"^":"a:1;",
$0:function(){return}},
nV:{"^":"a:0;a",
$1:function(a){return this.a.bw()}},
nW:{"^":"a:0;a,b",
$1:function(a){return a.dz(!0,this.a.a,this.b.gfp())}},
nX:{"^":"a:0;a,b",
$1:function(a){return a.dz(!0,this.a.a,this.b.gfp())}},
nZ:{"^":"a:0;a",
$1:function(a){return this.a.bw()}},
mX:{"^":"d;a,b,fP:c<",
j8:function(a,b,c){var z
if(!$.hG){z=J.am(this.a,b)
this.a=z
this.b.az(new A.cQ(b,z,c))}},
q:function(a,b){return this.j8(a,b,null)},
af:function(a,b){this.q(0,b)
return this},
E:function(){return P.ab(["points",this.a])},
ht:function(a){this.a=a.j(0,"points")
this.b.b3(0)},
i_:function(){this.b=P.b2(null,A.cQ)},
$isdY:1},
cX:{"^":"mG;aw:d<,dM:e@,a,b,c",
ghu:function(){return J.a6(this.e,0)}},
nC:{"^":"d;a,b"},
nJ:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dR:function(a,b){var z
if(b!=null&&this.a.a7(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a7(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jH:function(){var z=new H.Q(0,null,null,null,null,null,0,[P.r,null])
this.a.V(0,new O.nL(z))
return z},
jW:function(a){a.V(0,new O.nM(this))},
jm:function(){this.a.V(0,new O.nK())}},
nL:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.ab(["visitCount",b.gdM()]))}},
nM:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.a7(a))z.j(0,a).sdM(J.ay(b,"visitCount"))}},
nK:{"^":"a:6;",
$2:function(a,b){b.sdM(0)}}}],["","",,M,{"^":"",cy:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eN:function(a){return new M.cy(a,null,null)}}}}],["","",,M,{"^":"",nN:{"^":"d;"}}],["","",,Z,{"^":"",fK:{"^":"d;a,b,c,d,e,f",
eR:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dK()
return z},
dK:function(){var z,y
z=new H.Q(0,null,null,null,null,null,0,[P.r,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.v.fT(z)},
k:function(a){return this.dK()},
v:{
fL:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isL||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdY},
cW:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fL(z.j(a,x)))y.push(Z.cW(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.Q(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.nx(a,w))
return w}else if(!!z.$isdY){v=a.E()
v.n(0,"_class",a.gfP())
return Z.cW(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cV:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cV(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a7("_class")){v=new H.Q(0,null,null,null,null,null,0,[null,null])
z.V(a,new Z.nw(b,v))
return v}else if(w&&a.a7("_class"))if(c!=null){c.ht(a)
return c}else{u=z.j(a,"_class")
if(!b.a7(u))throw H.c(new Z.ds("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
ny:function(a,b,c){a.c.V(0,new Z.nz(b,c))}}},nx:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fL(this.a.j(0,a)))this.b.n(0,a,Z.cW(b))}},nw:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.cV(b,this.a,null))}},nz:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cV(b,x,null))
else z.n(0,a,Z.cV(b,x,y))}},ds:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lE:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",n2:{"^":"d;"},n1:{"^":"n2;"},lM:{"^":"n1;a,b,c,d,e,f,r,x",
l6:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.r
n=[o,P.d]
H.aG(a,"$isG",n,"$asG")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.a7("strContent"))m.c=a.j(0,"strContent")
if(a.a7("listContent"))m.b=a.j(0,"listContent")
if(a.a7("intContent"))m.d=a.j(0,"intContent")
if(a.a7("mapContent"))m.e=H.aG(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghr()){case 1070:o=this.e
if(o!=null){o.du(new D.bX("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bm()
o.b.bm()
return
case 1000:o=new A.v(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.E())
n.F(new A.v(10,null,this.c.ch,null,null).E())
return
case 1050:l=z.gk_()
this.e.bU(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.E())
o=z.gkl()
if(!o.a7("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cu())
n.bP(new G.ka(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.E())
k=J.ay(z.geJ(),0)
j=J.ay(z.geJ(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.B,k)
o.bU(new U.ce(C.B[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.du(new D.bX("Book Restart before choice was selected."))
this.e=null}try{this.c.eO()}catch(i){y=H.A(i)
x=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.v(90,null,null,null,null)
o.b=Z.bI()
n.F(o.E())
n.F(new A.cQ(0,0,null).dL().E())
return
case 1020:h=new A.v(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.du(new D.bX("Book Load before choice was selected."))
this.e=null}try{h=z.ghT()
f=new Z.fK(null,null,null,null,null,null)
e=H.aG(C.v.jt(h),"$isG",n,"$asG")
if(!e.a7("currentPageName")||!e.a7("vars"))H.i(new Z.lE("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aG(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aG(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a7("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aG(J.iR(z.geJ()),"$isbF",[o],"$asbF")
o=this.c
if(v!=null)o.h3(w,v)
else o.kj(w)}catch(i){o=H.A(i)
if(o instanceof Z.ds){u=o
t=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eO()}else{s=o
r=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eO()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bI()
g.F(o.E())}catch(i){q=H.A(i)
p=H.C(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cQ(0,$.$get$cn().a,null).dL().E())
return
case 1090:this.f.bU(!0)
this.f=null
return
case 1040:this.c.bw()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghr())+"."
this.a.F(o.E())}},"$1","giK",2,0,22],
eZ:function(a){var z=P.a0
this.f=new P.ch(new P.F(0,$.p,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},bX:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",ka:{"^":"d;a",
E:function(){return P.c8(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;hr:a<,eJ:b<,hT:c<,k_:d<,kl:e<",
gkT:function(){var z=this.a
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
dK:function(){return C.v.fT(this.E())},
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
z="Message "+this.gkT()
y=this.a
x=J.o(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mG:{"^":"d;h:a@,kU:b<",
k:function(a){return this.a},
gdT:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iM(z,": ")
if(y>0)return J.iQ(this.a,0,y)
else return}}}],["","",,A,{"^":"",cQ:{"^":"d;jk:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dL:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a1:{"^":"d;f_:a@,b,c,d,aW:e<,K:f<,fV:r<,x,y",
gka:function(){return this.e.length===0},
dz:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
k9:function(a,b){return this.dz(a,b,null)},
kP:function(){return P.ab(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c_:function(a){this.r=a
return this},
bB:function(a,b){return C.b.bB(this.e,b.gaW())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hX:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.ba(a).eS(a)
this.d=C.b.gA(a)
this.r=f
this.b=!1
this.c=!1},
$isU:1,
$asU:function(){return[L.a1]},
v:{
eT:function(a,b,c,d,e,f,g){var z=new L.a1(!1,null,null,null,null,e,null,d,g)
z.hX(a,!1,!1,d,e,f,g)
return z}}},eU:{"^":"fj;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
ji:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.ay(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbz}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.A(u)
v=M.eN(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.P,P.as]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.ay(y,"string")!=null&&!!J.o(J.ay(y,"string")).$isbz)try{x=J.ay(y,"string").$0()}catch(u){w=H.A(u)
v=M.eN(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.ay(y,"goto")
p=H.i4(J.ay(y,"script"),t)
o=new L.a1(!1,null,null,null,null,null,null,q,J.ay(y,"submenu"))
if(r==null)H.i(P.E("String given to choice cannot be null."))
o.e=J.ba(r).eS(r)
o.d=C.b.gA(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
je:function(a,b,c,d,e,f,g){if(b instanceof L.a1)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eT(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.je(a,b,!1,!1,null,null,null)},
kQ:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.O(new H.H(z,new L.jP(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.V(x,new L.jQ(w))
return w},
dL:function(){return this.kQ(null,null,null,null)},
k:function(a){var z=this.b
return new H.ap(z,new L.jR(),[H.m(z,0),null]).cd(0,", ")},
$asfj:function(){return[L.a1]},
$asfs:function(){return[L.a1]},
$asL:function(){return[L.a1]},
$asX:function(){return[L.a1]},
$asw:function(){return[L.a1]}},jP:{"^":"a:0;a,b,c",
$1:function(a){return a.dz(this.b,this.a,this.c)}},jQ:{"^":"a:0;a",
$1:function(a){H.b(a)
J.df(this.a.b,a.kP())
a.a=!0}},jR:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cY:{"^":"d;dc:a<,aW:b<",
E:function(){return P.ab(["show",this.a,"string",this.b])}},oj:{"^":"d;a",
E:function(){var z=new H.Q(0,null,null,null,null,null,0,[P.r,P.d])
this.a.V(0,new Z.ok(z))
return z},
V:function(a,b){this.a.V(0,b)}},ok:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hm:{"^":"d;h:a@,aM:b<,fQ:c<,dF:d<,dc:e<,h7:f<,aW:r<",v:{
hn:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.q(new Array(a.length),[Z.hm])
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
z[w]=new Z.hm(s,r,q,p,o,n,t);++w}C.a.c6(z,new Z.pb())
return z}}},pb:{"^":"a:6;",
$2:function(a,b){return J.bv(b.gdF(),a.gdF())}},at:{"^":"d;h:a<,aM:b<,c,fQ:d<,dF:e<,f,r,h7:x<,fN:y@,fP:z<,$ti",
ga8:function(){return this.f},
sa8:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cg=!0}},
gdc:function(){return this.r},
gaW:function(){return this.c.$1(this.f)},
E:function(){return P.ab(["name",this.a,"value",this.f,"show",this.r])},
ht:function(a){var z
this.sa8(H.iw(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cg=!0}},
$isdY:1,
v:{
bH:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cZ()
y=z.a7(a)?H.aG(z.j(0,a),"$isat",[h],"$asat"):new Z.at(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iw(e,h)
y.r=!0
z.n(0,a,y)
return y},
om:function(){var z,y
z=new Z.oj(new H.Q(0,null,null,null,null,null,0,[P.r,Z.cY]))
y=$.$get$cZ().gcq()
new H.H(y,new Z.on(),[H.z(y,"w",0)]).V(0,new Z.oo(z))
$.cg=!1
return z},
bI:function(){var z=H.q([],[[P.G,P.r,P.d]])
$.$get$cZ().gcq().V(0,new Z.ol(z))
return z}}},on:{"^":"a:0;",
$1:function(a){return a.gfN()}},oo:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gdc()
y=a.gaW()
a.sfN(!1)
this.a.a.n(0,a.a,new Z.cY(z,y))}},ol:{"^":"a:25;a",
$1:function(a){var z=new H.Q(0,null,null,null,null,null,0,[P.r,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaM())
z.n(0,"color",a.gfQ())
z.n(0,"priority",a.gdF())
z.n(0,"show",a.gdc())
z.n(0,"notifyOnChange",a.gh7())
z.n(0,"string",a.gaW())
this.a.push(z)}}}],["","",,N,{"^":"",dE:{"^":"d;h:a<,b,c,ij:d<,e,f",
gfX:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gfX()+"."+x},
geI:function(){if($.ic){var z=this.b
if(z!=null)return z.geI()}return $.ra},
kk:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geI().b){if(!!J.o(b).$isbz)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.uk.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.A(u)
y=H.C(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfX()
t=c
s=d
r=Date.now()
q=$.fk
$.fk=q+1
p=new N.mc(a,x,v,w,new P.cF(r,!1),q,t,s,e)
if($.ic)for(o=this;o!=null;){o.ft(p)
o=o.b}else $.$get$fm().ft(p)}},
cf:function(a,b,c,d){return this.kk(a,b,c,d,null)},
jM:function(a,b,c){return this.cf(C.T,a,b,c)},
ah:function(a){return this.jM(a,null,null)},
jL:function(a,b,c){return this.cf(C.S,a,b,c)},
bd:function(a){return this.jL(a,null,null)},
jK:function(a,b,c){return this.cf(C.U,a,b,c)},
bM:function(a){return this.jK(a,null,null)},
jY:function(a,b,c){return this.cf(C.A,a,b,c)},
h2:function(a){return this.jY(a,null,null)},
kV:function(a,b,c){return this.cf(C.X,a,b,c)},
eT:function(a){return this.kV(a,null,null)},
hO:function(a,b,c){return this.cf(C.W,a,b,c)},
dU:function(a){return this.hO(a,null,null)},
ft:function(a){},
v:{
bf:function(a){return $.$get$fl().kx(a,new N.rV(a))}}},rV:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dd(z,"."))H.i(P.E("name shouldn't start with a '.'"))
y=C.b.kh(z,".")
if(y===-1)x=z!==""?N.bf(""):null
else{x=N.bf(C.b.aF(z,0,y))
z=C.b.bH(z,y+1)}w=new H.Q(0,null,null,null,null,null,0,[P.r,N.dE])
w=new N.dE(z,x,null,w,new P.hp(w,[null,null]),null)
if(x!=null)x.gij().n(0,z,w)
return w}},aR:{"^":"d;h:a<,a8:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aR&&this.b===b.b},
aR:function(a,b){return C.e.aR(this.b,b.ga8())},
d6:function(a,b){var z=b.ga8()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
b9:function(a,b){var z=b.ga8()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bO:function(a,b){return this.b>=b.ga8()},
bB:function(a,b){var z=b.ga8()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gA:function(a){return this.b},
k:function(a){return this.a},
$isU:1,
$asU:function(){return[N.aR]}},mc:{"^":"d;eI:a<,b,aO:c<,d,T:e<,f,bo:r<,bj:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bu:function(a){return X.d6(J.iJ(a,0,new X.tZ()))},
aU:function(a,b){var z=J.am(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d6:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
tZ:{"^":"a:6;",
$2:function(a,b){return X.aU(a,J.j(b))}},
dN:{"^":"c3;a,$ti",
ga8:function(){var z=this.a
if(z==null)throw H.c(new P.y("value called on absent Optional."))
return z},
b5:function(a){var z=this.a
return z==null?a:z},
gZ:function(a){var z=this.a
if(z!=null){z=H.q([z],this.$ti)
z=new J.bc(z,1,0,null,[H.m(z,0)])}else z=C.H
return z},
gA:function(a){return J.j(this.a)},
u:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dN){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
hZ:function(a,b){if(this.a==null)throw H.c(P.E("Must not be null."))},
v:{
fw:function(a,b){var z=new X.dN(a,[b])
z.hZ(a,b)
return z}}}}],["","",,U,{"^":"",cU:{"^":"d;a,b",
k:function(a){return this.b}},ce:{"^":"d;a,kW:b<",
geF:function(){return this.a===C.D},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.ce&&b.a===this.a&&J.e(b.b,this.b)},
gA:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
wr:[function(a,b){var z,y,x,w,v
z=new D.lM(b,null,null,null,null,null,null,null)
y=$.fH
$.fH=y+1
x=new H.cc(y,null,!1)
w=init.globalState.d
w.dZ(y,x)
w.cI()
w=new H.ni(x,null)
w.i0(x)
z.b=w
w=w.b
w.toString
new P.d0(w,[H.m(w,0)]).aC(z.giK(),null,null,null)
b.F(new H.ck(z.b.a,init.globalState.d.a))
v=N.nE()
z.c=v
v.Q=z},"$2","i_",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fa.prototype
return J.f9.prototype}if(typeof a=="string")return J.c7.prototype
if(a==null)return J.fb.prototype
if(typeof a=="boolean")return J.f8.prototype
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.aF=function(a){if(a==null)return a
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.ak=function(a){if(typeof a=="number")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.eq=function(a){if(typeof a=="number")return J.c6.prototype
if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.ba=function(a){if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bn.prototype
return a}
J.am=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eq(a).af(a,b)}
J.aW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ak(a).d5(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).u(a,b)}
J.a6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ak(a).b9(a,b)}
J.bU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ak(a).aR(a,b)}
J.bV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eq(a).c3(a,b)}
J.iH=function(a){if(typeof a=="number")return-a
return J.ak(a).eX(a)}
J.bv=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ak(a).at(a,b)}
J.ay=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).j(a,b)}
J.df=function(a,b){return J.aF(a).q(a,b)}
J.iI=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aF(a).j7(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.eF=function(a,b,c){return J.aF(a).D(a,b,c)}
J.bw=function(a,b){return J.eq(a).bB(a,b)}
J.eG=function(a,b){return J.J(a).a6(a,b)}
J.eH=function(a,b){return J.aF(a).as(a,b)}
J.iJ=function(a,b,c){return J.aF(a).bp(a,b,c)}
J.j=function(a){return J.o(a).gA(a)}
J.eI=function(a){return J.J(a).gU(a)}
J.af=function(a){return J.aF(a).gZ(a)}
J.iK=function(a){return J.aF(a).gw(a)}
J.aH=function(a){return J.J(a).gl(a)}
J.iL=function(a){return J.o(a).gbv(a)}
J.iM=function(a,b){return J.J(a).aT(a,b)}
J.eJ=function(a,b){return J.aF(a).aD(a,b)}
J.iN=function(a,b,c){return J.ba(a).h4(a,b,c)}
J.dg=function(a,b,c){return J.ba(a).kB(a,b,c)}
J.ct=function(a,b,c){return J.ba(a).cY(a,b,c)}
J.iO=function(a){return J.ak(a).hm(a)}
J.iP=function(a,b){return J.aF(a).dW(a,b)}
J.eK=function(a,b){return J.ba(a).dd(a,b)}
J.iQ=function(a,b,c){return J.ba(a).aF(a,b,c)}
J.iR=function(a){return J.aF(a).bF(a)}
J.h=function(a){return J.o(a).k(a)}
J.bW=function(a,b){return J.ak(a).b8(a,b)}
J.iS=function(a,b){return J.aF(a).c2(a,b)}
I.aV=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.K=J.aQ.prototype
C.a=J.c5.prototype
C.M=J.f8.prototype
C.t=J.f9.prototype
C.e=J.fa.prototype
C.N=J.fb.prototype
C.j=J.c6.prototype
C.b=J.c7.prototype
C.E=new A.an(0,0,0)
C.F=new A.an(-1/0,-1/0,-1/0)
C.G=new A.cv(-10,0,100)
C.H=new H.kU([null])
C.I=new P.mF()
C.u=new P.q3()
C.J=new P.qm()
C.h=new P.qB()
C.w=new P.aZ(0)
C.x=new U.cL(0,"ItemType.fist")
C.y=new U.cL(1,"ItemType.shield")
C.L=new U.cL(2,"ItemType.spear")
C.z=new U.cL(3,"ItemType.sword")
C.O=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.lR(null,null)
C.P=new P.lT(null)
C.Q=new P.lU(null,null)
C.R=new O.m1(0,"KnownToMode.all")
C.S=new N.aR("FINER",400)
C.T=new N.aR("FINEST",300)
C.U=new N.aR("FINE",500)
C.A=new N.aR("INFO",800)
C.V=new N.aR("OFF",2000)
C.W=new N.aR("SEVERE",1000)
C.X=new N.aR("WARNING",900)
C.D=new U.cU(0,"Result.success")
C.a5=new U.cU(1,"Result.failure")
C.a6=new U.cU(2,"Result.criticalSuccess")
C.a7=new U.cU(3,"Result.criticalFailure")
C.B=I.aV([C.D,C.a5,C.a6,C.a7])
C.Y=I.aV([C.x])
C.Z=I.aV([C.y])
C.p=I.aV([C.z])
C.d=I.aV([])
C.a_=I.aV(["cave_with_agruth","guardpost_above_church","orcthorn_door","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a0=I.aV(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a1=new H.k_(0,{},C.d,[null,null])
C.a2=new X.dN(null,[P.K])
C.k=new R.dQ(0,"Pose.standing")
C.i=new R.dQ(1,"Pose.offBalance")
C.f=new R.dQ(2,"Pose.onGround")
C.l=new K.dR(0,"Predetermination.none")
C.q=new K.dR(1,"Predetermination.successGuaranteed")
C.m=new K.dR(2,"Predetermination.failureGuaranteed")
C.r=new Y.c9("he","him","his","himself")
C.n=new Y.c9("it","it","its","itself")
C.a3=new Y.c9("she","her","her","herself")
C.a4=new Y.c9("they","them","their","themselves")
C.C=new Y.c9("you","you","your","yourself")
C.c=new Q.nn(0,"Resource.stamina")
C.a8=H.b8("fc")
C.a9=H.b8("as")
C.aa=H.b8("r")
C.ab=H.b8("a0")
C.ac=H.b8("aP")
C.o=H.b8("dynamic")
C.ad=H.b8("t")
C.ae=H.b8("K")
C.af=new P.bL(null,2)
$.fH=1
$.fA="$cachedFunction"
$.fB="$cachedInvocation"
$.aI=0
$.bx=null
$.eP=null
$.bq=null
$.bO=null
$.bP=null
$.eg=!1
$.p=C.h
$.f1=0
$.er=null
$.hG=!1
$.r3=null
$.hJ=!1
$.id=!0
$.cg=!1
$.ic=!1
$.uk=C.V
$.ra=C.A
$.fk=0
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
I.$lazy(y,x,w)}})(["f5","$get$f5",function(){return H.lK()},"f6","$get$f6",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f1
$.f1=z+1
z="expando$key$"+z}return new P.l_(null,z,[P.t])},"hb","$get$hb",function(){return H.aK(H.d_({
toString:function(){return"$receiver$"}}))},"hc","$get$hc",function(){return H.aK(H.d_({$method$:null,
toString:function(){return"$receiver$"}}))},"hd","$get$hd",function(){return H.aK(H.d_(null))},"he","$get$he",function(){return H.aK(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hi","$get$hi",function(){return H.aK(H.d_(void 0))},"hj","$get$hj",function(){return H.aK(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hg","$get$hg",function(){return H.aK(H.hh(null))},"hf","$get$hf",function(){return H.aK(function(){try{null.$method$}catch(z){return z.message}}())},"hl","$get$hl",function(){return H.aK(H.hh(void 0))},"hk","$get$hk",function(){return H.aK(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e5","$get$e5",function(){return P.pM()},"be","$get$be",function(){var z,y
z=P.as
y=new P.F(0,P.po(),null,[z])
y.i7(null,z)
return y},"bQ","$get$bQ",function(){return[]},"em","$get$em",function(){return new K.c1("fist",P.b3(C.Y,null))},"bC","$get$bC",function(){return N.bf("PlannerRecommendation")},"i1","$get$i1",function(){return new K.rm()},"en","$get$en",function(){var z=$.$get$i1()
return K.Z("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a5","$get$a5",function(){return P.cS(null)},"bE","$get$bE",function(){return P.cS(null)},"ih","$get$ih",function(){return N.bf("Storyline")},"fZ","$get$fZ",function(){return P.bi("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"co","$get$co",function(){return L.e4(new L.rT())},"bb","$get$bb",function(){return L.e4(new L.rZ())},"eu","$get$eu",function(){return L.e4(new L.rS())},"dO","$get$dO",function(){return new F.mK("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ek","$get$ek",function(){return Y.c_(!1,"balance",!0,C.n,$.$get$bb())},"il","$get$il",function(){return Y.c_(!1,"pounding",!1,C.n,$.$get$bb())},"fI","$get$fI",function(){return new B.nl("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fM","$get$fM",function(){return new O.nA(null,!1,!0,!1,null,null)},"fY","$get$fY",function(){return new Q.of(null,!1,!0,!0,C.c,null)},"ho","$get$ho",function(){return new M.pc("",!0,C.c,!1,!0,null)},"hI","$get$hI",function(){return P.cS(null)},"eO","$get$eO",function(){return new Z.jq(!1,!0,!1,null,null)},"iy","$get$iy",function(){return Y.c_(!1,"swing",!0,C.n,$.$get$bb())},"ix","$get$ix",function(){return Y.c_(!1,"swing",!0,C.n,$.$get$bb())},"iz","$get$iz",function(){return Y.c_(!1,"swing",!0,C.n,$.$get$bb())},"fy","$get$fy",function(){return X.fw(0,P.K)},"fz","$get$fz",function(){return X.fw(1,P.K)},"fU","$get$fU",function(){return new D.od(!1,!1,!0,null,null)},"hH","$get$hH",function(){return P.cS(null)},"hW","$get$hW",function(){return K.Z("cave_with_agruth_pre",new V.rO(),new V.rP(),null,null,H.q([new Q.u("cave_with_agruth","","You look around.",null)],[Q.u]),"ground")},"hV","$get$hV",function(){return K.Z("cave_with_agruth",new V.rM(),new V.rN(),null,null,H.q([new Q.u("underground_church","Go to the Unholy Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.u("war_forge","Go to the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null),new Q.u("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.u]),"ground")},"fN","$get$fN",function(){return new V.o_("Search Agruth","search_agruth",!0,null)},"i2","$get$i2",function(){return K.Z("exit_from_bloodrock",new V.rK(),new V.rL(),null,null,H.q([new Q.u("__END_OF_ROAM__","Go forth (UNIMPLEMENTED)","You head down.",null)],[Q.u]),"ground")},"i3","$get$i3",function(){return K.Z("forge_church_crevice",new V.rH(),new V.rI(),null,null,H.q([new Q.u("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.u]),"ground")},"ib","$get$ib",function(){return K.Z("guardpost_above_church",new V.rF(),new V.rG(),null,null,H.q([new Q.u("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.u("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.u("smelter","Go to the smelter","Something something.",null)],[Q.u]),"ground")},"f4","$get$f4",function(){return new V.lp("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"ie","$get$ie",function(){return K.Z("just_after_agruth_fight",new V.rD(),new V.rE(),null,null,H.q([],[Q.u]),"ground")},"fp","$get$fp",function(){return new V.ml('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fq","$get$fq",function(){return new V.mm('"Savior"',"name_agruth_sword_redemption",!0,null)},"fo","$get$fo",function(){return new V.mk("No name","name_agruth_sword_nothing",!0,null)},"ij","$get$ij",function(){return K.Z("orcthorn_door",new V.rB(),new V.rC(),null,null,H.q([new Q.u("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_room","Open the door","You open the door.",null)],[Q.u]),"ground")},"ik","$get$ik",function(){return K.Z("orcthorn_room",new V.rz(),new V.rA(),O.vC(),null,H.q([new Q.u("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.u]),"ground")},"h4","$get$h4",function(){return new V.p0("Search for Orcthorn","take_orcthorn",!0,null)},"io","$get$io",function(){return K.Z("slave_quarters",new V.rw(),new V.rx(),null,null,H.q([],[Q.u]),"ground")},"fT","$get$fT",function(){return new V.oc("Continue","slave_quarters_continue",!0,null)},"ip","$get$ip",function(){return K.Z("slave_quarters_passage",new V.ru(),new V.rv(),O.iG(),null,H.q([new Q.u("cave_with_agruth","Go to the working area","TODO",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_door","Approach the little door","Something something.",null)],[Q.u]),"ground")},"iq","$get$iq",function(){return K.Z("smelter",new V.rs(),new V.rt(),null,null,H.q([new Q.u("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.u("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.u("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.u]),"ground")},"ir","$get$ir",function(){return K.Z("start_adventure",new V.rq(),new V.rr(),O.vB(),null,H.q([new Q.u("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.u]),"ground")},"h6","$get$h6",function(){return new V.p2("Talk to Briana","talk_to_briana_1",!0,null)},"h7","$get$h7",function(){return new V.p3("Talk to Briana","talk_to_briana_2",!0,null)},"h8","$get$h8",function(){return new V.p4("Talk to Briana","talk_to_briana_3",!0,null)},"iA","$get$iA",function(){return K.Z("the_shafts",new V.ro(),new V.rp(),null,null,H.q([new Q.u("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.u]),"ground")},"iC","$get$iC",function(){return K.Z("tunnel",new V.tf(),new V.tg(),O.iG(),null,H.q([new Q.u("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.u]),"ground")},"iD","$get$iD",function(){return K.Z("underground_church",new V.t4(),new V.te(),null,null,H.q([new Q.u("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.u("underground_church_altar","Go towards the altar","You sneak your way among the columns, trying to stay in the shadows.",null)],[Q.u]),"ground")},"f0","$get$f0",function(){return new V.kZ("Look around","examine_underground_church",!0,null)},"iE","$get$iE",function(){return K.Z("underground_church_altar",new V.rJ(),new V.rU(),null,null,H.q([new Q.u("underground_church","Sneak back","You keep low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.u]),"ground")},"hq","$get$hq",function(){return new V.pe("Wait","wait_for_ritual",!0,null)},"h5","$get$h5",function(){return new V.p1("Take spear","take_spear_in_underground_church",!0,null)},"iF","$get$iF",function(){return K.Z("war_forge",new V.rn(),new V.ry(),null,null,H.q([new Q.u("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.u]),"ground")},"hQ","$get$hQ",function(){return H.q([$.$get$hW(),$.$get$hV(),$.$get$i2(),$.$get$i3(),$.$get$ib(),$.$get$ie(),$.$get$ij(),$.$get$ik(),$.$get$io(),$.$get$ip(),$.$get$iq(),$.$get$ir(),$.$get$iA(),$.$get$iC(),$.$get$iD(),$.$get$iE(),$.$get$iF()],[K.cd])},"hP","$get$hP",function(){return H.q([$.$get$fN(),$.$get$f4(),$.$get$fp(),$.$get$fq(),$.$get$fo(),$.$get$h4(),$.$get$fT(),$.$get$h6(),$.$get$h7(),$.$get$h8(),$.$get$f0(),$.$get$hq(),$.$get$h5()],[A.ad])},"de","$get$de",function(){return P.oS("")},"cn","$get$cn",function(){var z=new O.mX(0,null,"PointsCounter")
z.i_()
return z},"bR","$get$bR",function(){return new L.eU(null,H.q([],[L.a1]))},"cs","$get$cs",function(){return H.ff(P.r,P.d)},"cm","$get$cm",function(){return P.b2(null,{func:1,ret:[P.P,P.as]})},"cC","$get$cC",function(){return P.bi("^\\s*<<<\\s*$",!0,!1)},"cZ","$get$cZ",function(){return H.ff(P.r,Z.at)},"fm","$get$fm",function(){return N.bf("")},"fl","$get$fl",function(){return P.dC(P.r,N.dE)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.r,args:[R.I,A.a9,Y.a_]},{func:1,args:[,,,]},{func:1,ret:Q.B,args:[R.I]},{func:1,args:[R.I,A.a9,Y.a_]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.I,A.a9,Y.a_,R.I,S.a8]},{func:1,args:[P.t]},{func:1,ret:U.cJ,args:[A.a9,F.V,[P.w,R.I]]},{func:1,v:true,args:[R.I,A.a9,Y.a_,R.I,,]},{func:1,ret:P.r,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[U.c0]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[P.d],opt:[P.aT]},{func:1,ret:Q.c2,args:[U.ao]},{func:1,args:[P.aP]},{func:1,ret:P.P},{func:1,ret:P.K,args:[A.an]},{func:1,args:[,P.aT]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.b_,args:[P.t]},{func:1,ret:P.r,args:[P.r]},{func:1,args:[Z.at]},{func:1,args:[,,,,]},{func:1,args:[R.I]},{func:1,args:[P.K,R.I]},{func:1,ret:P.a0,args:[P.t]},{func:1,args:[P.bg]},{func:1,args:[Y.ac]},{func:1,v:true,args:[P.t]},{func:1,ret:P.a0,args:[L.a1]},{func:1,v:true,args:[[P.L,P.r],P.fO]},{func:1,args:[L.a1]},{func:1,args:[P.r,,]},{func:1,args:[P.r,Z.cY]},{func:1,args:[[P.L,Y.ac],Y.ac]},{func:1,ret:P.K,args:[A.cv]},{func:1,ret:P.t,args:[P.U,P.U]},{func:1,ret:P.r,args:[Q.aa]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,ret:[P.P,U.ce],args:[P.aP,P.r],named:{rerollEffectDescription:P.r,rerollable:P.a0}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aT]},{func:1,v:true,args:[P.d,P.aT]},{func:1,ret:Q.cI,args:[Q.u]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:L.a1,args:[P.r],named:{deferToChoiceList:P.a0,deferToEndOfPage:P.a0,goto:P.r,helpMessage:P.r,script:{func:1,ret:[P.P,P.as]},submenu:P.r}},{func:1,args:[P.a0]}]
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
if(x==y)H.vy(d||a)
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
Isolate.aV=a.aV
Isolate.b9=a.b9
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.is(X.i_(),b)},[])
else (function(b){H.is(X.i_(),b)})([])})})()