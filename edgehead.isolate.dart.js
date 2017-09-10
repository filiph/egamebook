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
if(b5.$isaW)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bc=function(){}
var dart=[["","",,H,{"^":"",w9:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aW:{"^":"d;",
u:function(a,b){return a===b},
gB:function(a){return H.aA(a)},
k:function(a){return H.cU(a)},
gby:function(a){return new H.au(H.ig(a),null)}},
fa:{"^":"aW;",
k:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gby:function(a){return C.ac},
$isa0:1},
fd:{"^":"aW;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gB:function(a){return 0},
gby:function(a){return C.aa},
$isas:1},
fg:{"^":"aW;",
gB:function(a){return 0},
gby:function(a){return C.a9},
k:function(a){return String(a)},
$isfe:1},
wg:{"^":"fg;"},
bo:{"^":"fg;"},
ca:{"^":"aW;$ti",
fT:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cO:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
q:function(a,b){this.cO(a,"add")
a.push(b)},
hp:function(a){this.cO(a,"removeLast")
if(a.length===0)throw H.c(H.aF(a,-1))
return a.pop()},
a0:function(a,b){var z
this.cO(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
j1:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.C(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c4:function(a,b){return new H.K(a,b,[H.m(a,0)])},
aw:function(a,b){var z
this.cO(a,"addAll")
for(z=J.ah(b);z.t();)a.push(z.d)},
W:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aE:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dX:function(a,b){return H.h7(a,b,null,H.m(a,0))},
bu:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
aQ:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.ai())},
cg:function(a,b){return this.aQ(a,b,null)},
ap:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geD:function(a){if(a.length>0)return a[0]
throw H.c(H.ai())},
gv:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ai())},
gc8:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ai())
throw H.c(H.dx())},
b0:function(a,b,c,d,e){var z,y,x
this.fT(a,"setRange")
P.cg(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a3(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f9())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
br:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.C(a))}return!1},
c9:function(a,b){var z
this.fT(a,"sort")
z=b==null?P.tu():b
H.ck(a,0,a.length-1,z)},
f5:function(a){return this.c9(a,null)},
bP:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aY:function(a,b){return this.bP(a,b,0)},
a4:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gV:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
k:function(a){return P.c9(a,"[","]")},
bG:function(a){return P.b5(a,H.m(a,0))},
gZ:function(a){return new J.be(a,a.length,0,null,[H.m(a,0)])},
gB:function(a){return H.aA(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cO(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cA(b,"newLength",null))
if(b<0)throw H.c(P.a3(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aF(a,b))
if(b>=a.length||b<0)throw H.c(H.aF(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.S("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aF(a,b))
if(b>=a.length||b<0)throw H.c(H.aF(a,b))
a[b]=c},
$iscQ:1,
$ascQ:I.bc,
$isN:1,
$isX:1},
w8:{"^":"ca;$ti"},
be:{"^":"d;a,b,c,d,$ti",
gI:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
cb:{"^":"aW;",
bC:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdB(b)
if(this.gdB(a)===z)return 0
if(this.gdB(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdB:function(a){return a===0?1/a<0:a<0},
hv:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l0:function(a){return a},
bf:function(a,b){var z
if(b>20)throw H.c(P.a3(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdB(a))return"-"+z
return z},
l3:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a3(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cP(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.S("Unexpected toString result: "+z))
x=J.J(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c6("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
f1:function(a){return-a},
ah:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a+b},
as:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a-b},
d6:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a/b},
c6:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a*b},
bL:function(a,b){return(a|0)===a?a/b|0:this.ja(a,b)},
ja:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
ds:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aV:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bn:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
d8:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bQ:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gby:function(a){return C.af},
$isL:1},
fc:{"^":"cb;",
gby:function(a){return C.ae},
$isaS:1,
$isL:1,
$ist:1},
fb:{"^":"cb;",
gby:function(a){return C.ad},
$isaS:1,
$isL:1},
cc:{"^":"aW;",
cP:function(a,b){if(b<0)throw H.c(H.aF(a,b))
if(b>=a.length)H.i(H.aF(a,b))
return a.charCodeAt(b)},
cA:function(a,b){if(b>=a.length)throw H.c(H.aF(a,b))
return a.charCodeAt(b)},
dt:function(a,b,c){if(c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
return new H.qS(b,a,c)},
ew:function(a,b){return this.dt(a,b,0)},
hd:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cP(b,c+y)!==this.cA(a,y))return
return new H.h6(c,b,a)},
ah:function(a,b){if(typeof b!=="string")throw H.c(P.cA(b,null,null))
return a+b},
eB:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bJ(a,y-z)},
kO:function(a,b,c){H.bu(c)
return H.n(a,b,c)},
kP:function(a,b,c,d){H.bu(c)
P.ng(d,0,a.length,"startIndex",null)
return H.iy(a,b,c,d)},
d_:function(a,b,c){return this.kP(a,b,c,0)},
i2:function(a,b,c){var z
if(c>a.length)throw H.c(P.a3(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iQ(b,a,c)!=null},
df:function(a,b){return this.i2(a,b,0)},
aH:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.cf(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.c(P.cf(b,null,null))
if(c>a.length)throw H.c(P.cf(c,null,null))
return a.substring(b,c)},
bJ:function(a,b){return this.aH(a,b,null)},
eW:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cA(z,0)===133){x=J.dy(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cP(z,w)===133?J.lO(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l4:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cA(z,0)===133?J.dy(z,1):0}else{y=J.dy(a,0)
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
bP:function(a,b,c){var z
if(c>a.length)throw H.c(P.a3(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aY:function(a,b){return this.bP(a,b,0)},
kv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ku:function(a,b){return this.kv(a,b,null)},
jA:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a3(c,0,a.length,null,null))
return H.vI(a,b,c)},
a4:function(a,b){return this.jA(a,b,0)},
gV:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
bC:function(a,b){var z
if(typeof b!=="string")throw H.c(H.T(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gB:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gby:function(a){return C.ab},
gl:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aF(a,b))
if(b>=a.length||b<0)throw H.c(H.aF(a,b))
return a[b]},
$iscQ:1,
$ascQ:I.bc,
$isr:1,
$isdT:1,
w:{
ff:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dy:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cA(a,b)
if(y!==32&&y!==13&&!J.ff(y))break;++b}return b},
lO:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cP(a,z)
if(y!==32&&y!==13&&!J.ff(y))break}return b}}}}],["","",,H,{"^":"",
hJ:function(a){return a},
ai:function(){return new P.x("No element")},
dx:function(){return new P.x("Too many elements")},
f9:function(){return new P.x("Too few elements")},
ck:function(a,b,c,d){if(c-b<=32)H.h_(a,b,c,d)
else H.fZ(a,b,c,d)},
h_:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a6(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
fZ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bL(c-b+1,6)
y=b+z
x=c-z
w=C.e.bL(b+c,2)
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
if(h.aV(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.al(i)
if(h.bn(i,0)){--l
continue}else{g=l-1
if(h.aV(i,0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.bY(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.a6(d.$2(j,p),0))for(;!0;)if(J.a6(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bY(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
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
H.ck(a,b,m-2,d)
H.ck(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bY(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.ck(a,m,l,d)}else H.ck(a,m,l,d)},
X:{"^":"z;$ti"},
aY:{"^":"X;$ti",
gZ:function(a){return new H.dH(this,this.gl(this),0,null,[H.y(this,"aY",0)])},
W:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.ap(0,y))
if(z!==this.gl(this))throw H.c(new P.C(this))}},
gV:function(a){return this.gl(this)===0},
gv:function(a){if(this.gl(this)===0)throw H.c(H.ai())
return this.ap(0,this.gl(this)-1)},
a4:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.ap(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
br:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.ap(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
aQ:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.ap(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.C(this))}return c.$0()},
cj:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ap(0,0))
if(z!==this.gl(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ap(0,w))
if(z!==this.gl(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ap(0,w))
if(z!==this.gl(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c4:function(a,b){return this.dg(0,b)},
aE:function(a,b){return new H.ap(this,b,[H.y(this,"aY",0),null])},
bu:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ap(0,x))
if(z!==this.gl(this))throw H.c(new P.C(this))}return y},
bF:function(a,b){var z,y,x,w
z=[H.y(this,"aY",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.ap(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
ct:function(a){return this.bF(a,!0)},
bG:function(a){var z,y
z=P.a2(null,null,null,H.y(this,"aY",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.ap(0,y))
return z}},
oW:{"^":"aY;a,b,c,$ti",
giD:function(){var z=J.aI(this.a)
return z},
gj8:function(){var z,y
z=J.aI(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aI(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ap:function(a,b){var z,y
z=this.gj8()+b
if(!(b<0)){y=this.giD()
if(typeof y!=="number")return H.w(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cN(b,this,"index",null,null))
return J.eJ(this.a,z)},
bF:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.p([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.p(s,u)}for(r=0;r<v;++r){u=x.ap(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.C(this))}return t},
ie:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a3(z,0,null,"start",null))},
w:{
h7:function(a,b,c,d){var z=new H.oW(a,b,c,[d])
z.ie(a,b,c,d)
return z}}},
dH:{"^":"d;a,b,c,d,$ti",
gI:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ap(0,x);++this.c
return!0}},
dK:{"^":"z;a,b,$ti",
gZ:function(a){return new H.mi(null,J.ah(this.a),this.b,this.$ti)},
gl:function(a){return J.aI(this.a)},
gV:function(a){return J.eK(this.a)},
gv:function(a){return this.b.$1(J.iN(this.a))},
$asz:function(a,b){return[b]},
w:{
bD:function(a,b,c,d){if(!!J.o(a).$isX)return new H.bB(a,b,[c,d])
return new H.dK(a,b,[c,d])}}},
bB:{"^":"dK;a,b,$ti",$isX:1,
$asX:function(a,b){return[b]}},
mi:{"^":"cP;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gI())
return!0}this.a=null
return!1},
gI:function(){return this.a},
$ascP:function(a,b){return[b]}},
ap:{"^":"aY;a,b,$ti",
gl:function(a){return J.aI(this.a)},
ap:function(a,b){return this.b.$1(J.eJ(this.a,b))},
$asaY:function(a,b){return[b]},
$asX:function(a,b){return[b]},
$asz:function(a,b){return[b]}},
K:{"^":"z;a,b,$ti",
gZ:function(a){return new H.bO(J.ah(this.a),this.b,this.$ti)},
aE:function(a,b){return new H.dK(this,b,[H.m(this,0),null])}},
bO:{"^":"cP;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gI())===!0)return!0
return!1},
gI:function(){return this.a.gI()}},
fS:{"^":"z;a,b,$ti",
gZ:function(a){return new H.o9(J.ah(this.a),this.b,this.$ti)},
w:{
o8:function(a,b,c){if(!!J.o(a).$isX)return new H.kU(a,H.hJ(b),[c])
return new H.fS(a,H.hJ(b),[c])}}},
kU:{"^":"fS;a,b,$ti",
gl:function(a){var z=J.aI(this.a)-this.b
if(z>=0)return z
return 0},
$isX:1},
o9:{"^":"cP;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gI:function(){return this.a.gI()}},
kV:{"^":"d;$ti",
t:function(){return!1},
gI:function(){return}}}],["","",,H,{"^":"",
cq:function(a,b){var z=a.cR(b)
if(!init.globalState.d.cy)init.globalState.f.bx()
return z},
iv:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qE(0,0,1,null,null,null,null,null,null,null,null,null,a)
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
y.f=new H.qd(P.b7(null,H.co),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.ef])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qD()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lG,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qF)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a2(null,null,null,x)
v=new H.ch(0,null,!1)
u=new H.ef(y,new H.R(0,null,null,null,null,null,0,[x,H.ch]),w,init.createNewIsolate(),v,new H.bf(H.dg()),new H.bf(H.dg()),!1,!1,[],P.a2(null,null,null,null),null,null,!1,!0,P.a2(null,null,null,null))
w.q(0,0)
u.e_(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ax(a,{func:1,args:[,]}))u.cR(new H.v6(z,a))
else if(H.ax(a,{func:1,args:[,,]}))u.cR(new H.v7(z,a))
else u.cR(a)
init.globalState.f.bx()},
lK:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lL()
return},
lL:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.S("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.S('Cannot extract URI from "'+z+'"'))},
lG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d4(!0,[]).bW(b.data)
y=J.J(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d4(!0,[]).bW(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d4(!0,[]).bW(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.a2(null,null,null,q)
o=new H.ch(0,null,!1)
n=new H.ef(y,new H.R(0,null,null,null,null,null,0,[q,H.ch]),p,init.createNewIsolate(),o,new H.bf(H.dg()),new H.bf(H.dg()),!1,!1,[],P.a2(null,null,null,null),null,null,!1,!0,P.a2(null,null,null,null))
p.q(0,0)
n.e_(0,o)
init.globalState.f.a.az(new H.co(n,new H.lH(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bx()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.bx()
break
case"close":init.globalState.ch.a0(0,$.$get$f8().j(0,a))
a.terminate()
init.globalState.f.bx()
break
case"log":H.lF(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.bq(!0,P.bR(null,P.t)).bo(q)
y.toString
self.postMessage(q)}else P.ex(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lF:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.bq(!0,P.bR(null,P.t)).bo(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.D(w)
y=P.cL(z)
throw H.c(y)}},
lI:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fC=$.fC+("_"+y)
$.fD=$.fD+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.cp(y,x),w,z.r])
x=new H.lJ(a,b,c,d,z)
if(e===!0){z.fP(w,w)
init.globalState.f.a.az(new H.co(z,x,"start isolate"))}else x.$0()},
r8:function(a){return new H.d4(!0,[]).bW(new H.bq(!1,P.bR(null,P.t)).bo(a))},
v6:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
v7:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qE:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",w:{
qF:function(a){var z=P.ae(["command","print","msg",a])
return new H.bq(!0,P.bR(null,P.t)).bo(z)}}},
ef:{"^":"d;i:a<,b,c,ks:d<,jC:e<,f,r,x,cU:y<,z,Q,ch,cx,cy,db,dx",
fP:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cL()},
kN:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a0(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fN(x)}this.y=!1}this.cL()},
jq:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kL:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.S("removeRange"))
P.cg(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hV:function(a,b){if(!this.r.u(0,a))return
this.db=b},
k0:function(a,b,c){var z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.b7(null,null)
this.cx=z}z.az(new H.qu(a,c))},
k_:function(a,b){var z
if(!this.r.u(0,a))return
z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.eK()
return}z=this.cx
if(z==null){z=P.b7(null,null)
this.cx=z}z.az(this.gkt())},
k5:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ex(a)
if(b!=null)P.ex(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ac(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.F(y)},
cR:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.B(u)
v=H.D(u)
this.k5(w,v)
if(this.db===!0){this.eK()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gks()
if(this.cx!=null)for(;t=this.cx,!t.gV(t);)this.cx.dH().$0()}return y},
cm:function(a){return this.b.j(0,a)},
e_:function(a,b){var z=this.b
if(z.a9(a))throw H.c(P.cL("Registry: ports must be registered only once."))
z.n(0,a,b)},
cL:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eK()},
eK:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b9(0)
for(z=this.b,y=z.gcu(),y=y.gZ(y);y.t();)y.gI().iw()
z.b9(0)
this.c.b9(0)
init.globalState.z.a0(0,this.a)
this.dx.b9(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkt",0,0,7]},
qu:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
qd:{"^":"d;a,b",
jH:function(){var z=this.a
if(z.b===z.c)return
return z.dH()},
hy:function(){var z,y,x
z=this.jH()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a9(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gV(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cL("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gV(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.bq(!0,new P.hE(0,null,null,null,null,null,0,[null,P.t])).bo(x)
y.toString
self.postMessage(x)}return!1}z.kJ()
return!0},
fG:function(){if(self.window!=null)new H.qe(this).$0()
else for(;this.hy(););},
bx:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fG()
else try{this.fG()}catch(x){z=H.B(x)
y=H.D(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bq(!0,P.bR(null,P.t)).bo(v)
w.toString
self.postMessage(v)}}},
qe:{"^":"a:7;a",
$0:function(){if(!this.a.hy())return
P.ph(C.x,this)}},
co:{"^":"d;a,b,c",
kJ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cR(this.b)}},
qD:{"^":"d;"},
lH:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lI(this.a,this.b,this.c,this.d,this.e,this.f)}},
lJ:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ax(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ax(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cL()}},
hy:{"^":"d;"},
cp:{"^":"hy;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gft())return
x=H.r8(a)
if(z.gjC()===y){y=J.J(x)
switch(y.j(x,0)){case"pause":z.fP(y.j(x,1),y.j(x,2))
break
case"resume":z.kN(y.j(x,1))
break
case"add-ondone":z.jq(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kL(y.j(x,1))
break
case"set-errors-fatal":z.hV(y.j(x,1),y.j(x,2))
break
case"ping":z.k0(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.k_(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a0(0,y)
break}return}init.globalState.f.a.az(new H.co(z,new H.qH(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.cp&&J.e(this.b,b.b)},
gB:function(a){return this.b.gec()}},
qH:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gft())z.il(this.b)}},
ei:{"^":"hy;b,c,a",
F:function(a){var z,y,x
z=P.ae(["command","message","port",this,"msg",a])
y=new H.bq(!0,P.bR(null,P.t)).bo(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.ei&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f2()
y=this.a
if(typeof y!=="number")return y.f2()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
ch:{"^":"d;ec:a<,b,ft:c<",
iw:function(){this.c=!0
this.b=null},
bs:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a0(0,y)
z.c.a0(0,y)
z.cL()},
il:function(a){if(this.c)return
this.b.$1(a)},
$isnh:1},
ni:{"^":"ak;a,b",
aD:function(a,b,c,d){var z=this.b
z.toString
return new P.d3(z,[H.m(z,0)]).aD(a,b,c,d)},
eN:function(a,b,c){return this.aD(a,null,b,c)},
bs:[function(){this.a.bs()
this.b.bs()},"$0","gjy",0,0,7],
ib:function(a){var z=new P.qW(null,0,null,null,null,null,this.gjy(),[null])
this.b=z
this.a.b=z.gjh(z)},
$asak:I.bc},
pd:{"^":"d;a,b,c",
gci:function(){return this.c!=null},
ig:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.az(new H.co(y,new H.pf(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.dc(new H.pg(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
w:{
pe:function(a,b){var z=new H.pd(!0,!1,null)
z.ig(a,b)
return z}}},
pf:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pg:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bf:{"^":"d;ec:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.lc()
z=C.j.ds(z,0)^C.j.bL(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bf){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bq:{"^":"d;a,b",
bo:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscQ)return this.hR(a)
if(!!z.$islD){x=this.ghO()
z=a.gck()
z=H.bD(z,x,H.y(z,"z",0),null)
z=P.P(z,!0,H.y(z,"z",0))
w=a.gcu()
w=H.bD(w,x,H.y(w,"z",0),null)
return["map",z,P.P(w,!0,H.y(w,"z",0))]}if(!!z.$isfe)return this.hS(a)
if(!!z.$isaW)this.hB(a)
if(!!z.$isnh)this.d2(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscp)return this.hT(a)
if(!!z.$isei)return this.hU(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d2(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbf)return["capability",a.a]
if(!(a instanceof P.d))this.hB(a)
return["dart",init.classIdExtractor(a),this.hQ(init.classFieldsExtractor(a))]},"$1","ghO",2,0,0],
d2:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hB:function(a){return this.d2(a,null)},
hR:function(a){var z=this.hP(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d2(a,"Can't serialize indexable: ")},
hP:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bo(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hQ:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bo(a[z]))
return a},
hS:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d2(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bo(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hU:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hT:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gec()]
return["raw sendport",a]}},
d4:{"^":"d;a,b",
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
y=H.p(this.cQ(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cQ(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cQ(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cQ(x),[null])
y.fixed$length=Array
return y
case"map":return this.jL(a)
case"sendport":return this.jM(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jK(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.bf(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cQ(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjJ",2,0,0],
cQ:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.n(a,y,this.bW(z.j(a,y)));++y}return a},
jL:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aL()
this.b.push(w)
y=J.eL(y,this.gjJ()).ct(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.bW(v.j(x,u)))}return w},
jM:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.e(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.cm(w)
if(u==null)return
t=new H.cp(u,x)}else t=new H.ei(y,w,x)
this.b.push(t)
return t},
jK:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.j(y,u)]=this.bW(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
k_:function(){throw H.c(new P.S("Cannot modify unmodifiable Map"))},
u5:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.T(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bG:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.L||!!J.o(a).$isbo){v=C.O(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cA(w,0)===36)w=C.b.bJ(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.df(H.cu(a),0,null),init.mangledGlobalNames)},
cU:function(a){return"Instance of '"+H.bG(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.ds(z,10))>>>0,56320|z&1023)}throw H.c(P.a3(a,0,1114111,null,null))},
bj:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
n9:function(a){var z=H.bj(a).getFullYear()+0
return z},
n7:function(a){var z=H.bj(a).getMonth()+1
return z},
n3:function(a){var z=H.bj(a).getDate()+0
return z},
n4:function(a){var z=H.bj(a).getHours()+0
return z},
n6:function(a){var z=H.bj(a).getMinutes()+0
return z},
n8:function(a){var z=H.bj(a).getSeconds()+0
return z},
n5:function(a){var z=H.bj(a).getMilliseconds()+0
return z},
dW:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
return a[b]},
fE:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
a[b]=c},
w:function(a){throw H.c(H.T(a))},
f:function(a,b){if(a==null)J.aI(a)
throw H.c(H.aF(a,b))},
aF:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b3(!0,b,"index",null)
z=J.aI(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.cN(b,a,"index",null,z)
return P.cf(b,"index",null)},
T:function(a){return new P.b3(!0,a,null,null)},
da:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
ru:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
return a},
bu:function(a){if(typeof a!=="string")throw H.c(H.T(a))
return a},
c:function(a){var z
if(a==null)a=new P.cS()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iE})
z.name=""}else z.toString=H.iE
return z},
iE:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.C(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.vR(a)
if(a==null)return
if(a instanceof H.dt)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.ds(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dB(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.ft(v,null))}}if(a instanceof TypeError){u=$.$get$hf()
t=$.$get$hg()
s=$.$get$hh()
r=$.$get$hi()
q=$.$get$hm()
p=$.$get$hn()
o=$.$get$hk()
$.$get$hj()
n=$.$get$hp()
m=$.$get$ho()
l=u.bv(y)
if(l!=null)return z.$1(H.dB(y,l))
else{l=t.bv(y)
if(l!=null){l.method="call"
return z.$1(H.dB(y,l))}else{l=s.bv(y)
if(l==null){l=r.bv(y)
if(l==null){l=q.bv(y)
if(l==null){l=p.bv(y)
if(l==null){l=o.bv(y)
if(l==null){l=r.bv(y)
if(l==null){l=n.bv(y)
if(l==null){l=m.bv(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.ft(y,l==null?null:l.method))}}return z.$1(new H.pl(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h0()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b3(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h0()
return a},
D:function(a){var z
if(a instanceof H.dt)return a.b
if(a==null)return new H.hG(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hG(a,null)},
un:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aA(a)},
tP:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
uc:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cq(b,new H.ud(a))
case 1:return H.cq(b,new H.ue(a,d))
case 2:return H.cq(b,new H.uf(a,d,e))
case 3:return H.cq(b,new H.ug(a,d,e,f))
case 4:return H.cq(b,new H.uh(a,d,e,f,g))}throw H.c(P.cL("Unsupported number of arguments for wrapped closure"))},
dc:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uc)
a.$identity=z
return z},
jW:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nk(z).r}else x=c
w=d?Object.create(new H.os().constructor.prototype):Object.create(new H.dl(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aJ
$.aJ=J.an(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eX(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.u5,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eS:H.dm
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
jT:function(a,b,c,d){var z=H.dm
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eX:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jV(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jT(y,!w,z,b)
if(y===0){w=$.aJ
$.aJ=J.an(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bA
if(v==null){v=H.cD("self")
$.bA=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aJ
$.aJ=J.an(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bA
if(v==null){v=H.cD("self")
$.bA=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jU:function(a,b,c,d){var z,y
z=H.dm
y=H.eS
switch(b?-1:a){case 0:throw H.c(new H.nw("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jV:function(a,b){var z,y,x,w,v,u,t,s
z=H.jK()
y=$.eR
if(y==null){y=H.cD("receiver")
$.eR=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jU(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aJ
$.aJ=J.an(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aJ
$.aJ=J.an(u,1)
return new Function(y+H.b(u)+"}")()},
ep:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.jW(a,b,z,!!d,e,f)},
uw:function(a,b){var z=J.J(b)
throw H.c(H.cF(H.bG(a),z.aH(b,3,z.gl(b))))},
H:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.uw(a,b)},
er:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ax:function(a,b){var z
if(a==null)return!1
z=H.er(a)
return z==null?!1:H.eu(z,b)},
i9:function(a,b){var z,y
if(a==null)return a
if(H.ax(a,b))return a
z=H.W(b,null)
y=H.er(a)
throw H.c(H.cF(y!=null?H.W(y,null):H.bG(a),z))},
vO:function(a){throw H.c(new P.kc(a))},
dg:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bb:function(a){return new H.au(a,null)},
p:function(a,b){a.$ti=b
return a},
cu:function(a){if(a==null)return
return a.$ti},
ie:function(a,b){return H.eG(a["$as"+H.b(b)],H.cu(a))},
y:function(a,b,c){var z=H.ie(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cu(a)
return z==null?null:z[b]},
W:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.df(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.W(z,b)
return H.rd(a,b)}return"unknown-reified-type"},
rd:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.W(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.W(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.W(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tO(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.W(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
df:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bN("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.W(u,c)}return w?"":"<"+z.k(0)+">"},
ig:function(a){var z,y
if(a instanceof H.a){z=H.er(a)
if(z!=null)return H.W(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.df(a.$ti,0,null)},
eG:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cu(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hY(H.eG(y[d],z),c)},
aH:function(a,b,c,d){if(a==null)return a
if(H.aR(a,b,c,d))return a
throw H.c(H.cF(H.bG(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.df(c,0,null),init.mangledGlobalNames)))},
hY:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.am(a[y],b[y]))return!1
return!0},
ba:function(a,b,c){return a.apply(b,H.ie(b,c))},
db:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="as"
if(b==null)return!0
z=H.cu(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eu(x.apply(a,null),b)}return H.am(y,b)},
iz:function(a,b){if(a!=null&&!H.db(a,b))throw H.c(H.cF(H.bG(a),H.W(b,null)))
return a},
am:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="as")return!0
if('func' in b)return H.eu(a,b)
if('func' in a)return b.builtin$cls==="bC"||b.builtin$cls==="d"
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
return H.hY(H.eG(u,z),x)},
hX:function(a,b,c){var z,y,x,w,v
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
ro:function(a,b){var z,y,x,w,v,u
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
eu:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hX(x,w,!1))return!1
if(!H.hX(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}}return H.ro(a.named,b.named)},
vI:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdz){z=C.b.bJ(a,c)
return b.b.test(z)}else{z=z.ew(b,C.b.bJ(a,c))
return!z.gV(z)}}},
vK:function(a,b,c,d){var z,y,x
z=b.fl(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eF(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bu(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
wy:[function(a){return a},"$1","hK",2,0,24],
vJ:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdT)throw H.c(P.cA(b,"pattern","is not a Pattern"))
for(z=z.ew(b,a),z=new H.hw(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hK().$1(C.b.aH(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hK().$1(C.b.bJ(a,y)))
return z.charCodeAt(0)==0?z:z},
iy:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eF(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdz)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.vK(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.dt(b,a,d)
x=y.gZ(y)
if(!x.t())return a
w=x.gI()
y=w.gf6()
v=w.gh0()
H.bu(c)
u=P.cg(y,v,a.length,null,null,null)
H.ru(u)
return H.eF(a,y,u,c)},
eF:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jZ:{"^":"d;$ti",
gV:function(a){return this.gl(this)===0},
gaq:function(a){return this.gl(this)!==0},
k:function(a){return P.dL(this)},
n:function(a,b,c){return H.k_()},
$isG:1},
k0:{"^":"jZ;a,b,c,$ti",
gl:function(a){return this.a},
a9:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.a9(b))return
return this.fm(b)},
fm:function(a){return this.b[a]},
W:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fm(w))}}},
nj:{"^":"d;a,b,c,d,e,f,r,x",w:{
nk:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nj(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pi:{"^":"d;a,b,c,d,e,f",
bv:function(a){var z,y,x
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
aM:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pi(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hl:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
ft:{"^":"a1;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lQ:{"^":"a1;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
w:{
dB:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lQ(a,y,z?null:b.receiver)}}},
pl:{"^":"a1;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dt:{"^":"d;a,bp:b<"},
vR:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa1)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hG:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ud:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
ue:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uf:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ug:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uh:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bG(this).trim()+"'"},
ghJ:function(){return this},
$isbC:1,
ghJ:function(){return this}},
he:{"^":"a;"},
os:{"^":"he;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dl:{"^":"he;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dl))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.j(z):H.aA(z)
z=H.aA(this.b)
if(typeof y!=="number")return y.ld()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cU(z)},
w:{
dm:function(a){return a.a},
eS:function(a){return a.c},
jK:function(){var z=$.bA
if(z==null){z=H.cD("self")
$.bA=z}return z},
cD:function(a){var z,y,x,w,v
z=new H.dl("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jP:{"^":"a1;a",
k:function(a){return this.a},
w:{
cF:function(a,b){return new H.jP("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nw:{"^":"a1;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
au:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.j(this.a)},
u:function(a,b){if(b==null)return!1
return b instanceof H.au&&J.e(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gV:function(a){return this.a===0},
gaq:function(a){return!this.gV(this)},
gck:function(){return new H.m6(this,[H.m(this,0)])},
gcu:function(){return H.bD(this.gck(),new H.lP(this),H.m(this,0),H.m(this,1))},
a9:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fh(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fh(y,a)}else return this.kh(a)},
kh:function(a){var z=this.d
if(z==null)return!1
return this.cT(this.dm(z,this.cS(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cD(z,b)
return y==null?null:y.gbY()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cD(x,b)
return y==null?null:y.gbY()}else return this.ki(b)},
ki:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dm(z,this.cS(a))
x=this.cT(y,a)
if(x<0)return
return y[x].gbY()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ee()
this.b=z}this.fb(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ee()
this.c=y}this.fb(y,b,c)}else this.kk(b,c)},
kk:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ee()
this.d=z}y=this.cS(a)
x=this.dm(z,y)
if(x==null)this.eq(z,y,[this.ef(a,b)])
else{w=this.cT(x,a)
if(w>=0)x[w].sbY(b)
else x.push(this.ef(a,b))}},
kK:function(a,b){var z
if(this.a9(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a0:function(a,b){if(typeof b==="string")return this.fF(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fF(this.c,b)
else return this.kj(b)},
kj:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dm(z,this.cS(a))
x=this.cT(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fH(w)
return w.gbY()},
b9:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
W:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.C(this))
z=z.c}},
fb:function(a,b,c){var z=this.cD(a,b)
if(z==null)this.eq(a,b,this.ef(b,c))
else z.sbY(c)},
fF:function(a,b){var z
if(a==null)return
z=this.cD(a,b)
if(z==null)return
this.fH(z)
this.fi(a,b)
return z.gbY()},
ef:function(a,b){var z,y
z=new H.m5(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fH:function(a){var z,y
z=a.giY()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cS:function(a){return J.j(a)&0x3ffffff},
cT:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gh8(),b))return y
return-1},
k:function(a){return P.dL(this)},
cD:function(a,b){return a[b]},
dm:function(a,b){return a[b]},
eq:function(a,b,c){a[b]=c},
fi:function(a,b){delete a[b]},
fh:function(a,b){return this.cD(a,b)!=null},
ee:function(){var z=Object.create(null)
this.eq(z,"<non-identifier-key>",z)
this.fi(z,"<non-identifier-key>")
return z},
$islD:1,
$isG:1,
w:{
fh:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
lP:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
m5:{"^":"d;h8:a<,bY:b@,c,iY:d<,$ti"},
m6:{"^":"X;a,$ti",
gl:function(a){return this.a.a},
gV:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.m7(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a4:function(a,b){return this.a.a9(b)},
W:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.C(z))
y=y.c}}},
m7:{"^":"d;a,b,c,d,$ti",
gI:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dz:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giU:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dA(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giT:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dA(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dt:function(a,b,c){if(c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
return new H.pU(this,b,c)},
ew:function(a,b){return this.dt(a,b,0)},
fl:function(a,b){var z,y
z=this.giU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hF(this,y)},
iE:function(a,b){var z,y
z=this.giT()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hF(this,y)},
hd:function(a,b,c){if(c>b.length)throw H.c(P.a3(c,0,b.length,null,null))
return this.iE(b,c)},
$isdT:1,
w:{
dA:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f4("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hF:{"^":"d;a,b",
gf6:function(){return this.b.index},
gh0:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbi:1},
pU:{"^":"c8;a,b,c",
gZ:function(a){return new H.hw(this.a,this.b,this.c,null)},
$asc8:function(){return[P.bi]},
$asz:function(){return[P.bi]}},
hw:{"^":"d;a,b,c,d",
gI:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fl(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
h6:{"^":"d;f6:a<,b,c",
gh0:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cf(b,null,null))
return this.c},
$isbi:1},
qS:{"^":"z;a,b,c",
gZ:function(a){return new H.qT(this.a,this.b,this.c,null)},
$asz:function(){return[P.bi]}},
qT:{"^":"d;a,b,c,d",
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
this.d=new H.h6(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gI:function(){return this.d}}}],["","",,H,{"^":"",
tO:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uv:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pV:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rp()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.dc(new P.pX(z),1)).observe(y,{childList:true})
return new P.pW(z,y,x)}else if(self.setImmediate!=null)return P.rq()
return P.rr()},
ws:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.dc(new P.pY(a),0))},"$1","rp",2,0,13],
wt:[function(a){++init.globalState.f.b
self.setImmediate(H.dc(new P.pZ(a),0))},"$1","rq",2,0,13],
wu:[function(a){P.e5(C.x,a)},"$1","rr",2,0,13],
aE:function(a,b){P.ej(null,a)
return b.gh4()},
av:function(a,b){P.ej(a,b)},
aD:function(a,b){b.bV(a)},
aC:function(a,b){b.eA(H.B(a),H.D(a))},
ej:function(a,b){var z,y,x,w
z=new P.r2(b)
y=new P.r3(b)
x=J.o(a)
if(!!x.$isF)a.er(z,y)
else if(!!x.$isQ)a.eU(z,y)
else{w=new P.F(0,$.q,null,[null])
w.a=4
w.c=a
w.er(z,null)}},
aw:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.rn(z)},
d7:function(a,b,c){var z,y,x
if(b===0){if(c.geG())c.c.ez()
else c.a.bs()
return}else if(b===1){if(c.geG())c.c.eA(H.B(a),H.D(a))
else{z=H.B(a)
y=H.D(a)
c.a.ev(z,y)
c.a.bs()}return}if(a instanceof P.bP){if(c.geG()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dj(c.a,z)
P.cv(new P.r0(b,c))
return}else if(z===1){x=a.a
c.a.ju(x,!1).c1(new P.r1(b,c))
return}}P.ej(a,b)},
rm:function(a){return a.gdY()},
em:function(a,b){if(H.ax(a,{func:1,args:[P.as,P.as]})){b.toString
return a}else{b.toString
return a}},
az:function(a){return new P.qU(new P.F(0,$.q,null,[a]),[a])},
rb:function(a,b,c){$.q.toString
a.bi(b,c)},
rf:function(){var z,y
for(;z=$.br,z!=null;){$.bT=null
y=z.gcn()
$.br=y
if(y==null)$.bS=null
z.gjw().$0()}},
wx:[function(){$.ek=!0
try{P.rf()}finally{$.bT=null
$.ek=!1
if($.br!=null)$.$get$e9().$1(P.hZ())}},"$0","hZ",0,0,7],
hT:function(a){var z=new P.hx(a,null)
if($.br==null){$.bS=z
$.br=z
if(!$.ek)$.$get$e9().$1(P.hZ())}else{$.bS.b=z
$.bS=z}},
rl:function(a){var z,y,x
z=$.br
if(z==null){P.hT(a)
$.bT=$.bS
return}y=new P.hx(a,null)
x=$.bT
if(x==null){y.b=z
$.bT=y
$.br=y}else{y.b=x.b
x.b=y
$.bT=y
if(y.b==null)$.bS=y}},
cv:function(a){var z=$.q
if(C.h===z){P.bt(null,null,C.h,a)
return}z.toString
P.bt(null,null,z,z.ex(a,!0))},
wn:function(a,b){return new P.qR(null,a,!1,[b])},
en:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.B(x)
y=H.D(x)
w=$.q
w.toString
P.bs(null,null,w,z,y)}},
rg:[function(a,b){var z=$.q
z.toString
P.bs(null,null,z,a,b)},function(a){return P.rg(a,null)},"$2","$1","rt",2,2,16,0],
ww:[function(){},"$0","rs",0,0,7],
hS:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.B(u)
y=H.D(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbt()
w=t
v=x.gbp()
c.$2(w,v)}}},
r4:function(a,b,c,d){var z=a.cf()
if(!!J.o(z).$isQ&&z!==$.$get$bg())z.c3(new P.r6(b,c,d))
else b.bi(c,d)},
hH:function(a,b){return new P.r5(a,b)},
hI:function(a,b,c){var z=a.cf()
if(!!J.o(z).$isQ&&z!==$.$get$bg())z.c3(new P.r7(b,c))
else b.bh(c)},
r_:function(a,b,c){$.q.toString
a.ca(b,c)},
ph:function(a,b){var z=$.q
if(z===C.h){z.toString
return P.e5(a,b)}return P.e5(a,z.ex(b,!0))},
e5:function(a,b){var z=C.e.bL(a.a,1000)
return H.pe(z<0?0:z,b)},
px:function(){return $.q},
bs:function(a,b,c,d,e){var z={}
z.a=d
P.rl(new P.rj(z,e))},
hP:function(a,b,c,d){var z,y
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
hR:function(a,b,c,d,e){var z,y
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
hQ:function(a,b,c,d,e,f){var z,y
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
bt:function(a,b,c,d){var z=C.h!==c
if(z)d=c.ex(d,!(!z||!1))
P.hT(d)},
pX:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pW:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pY:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pZ:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
r2:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
r3:{"^":"a:21;a",
$2:function(a,b){this.a.$2(1,new H.dt(a,b))}},
rn:{"^":"a:50;a",
$2:function(a,b){this.a(a,b)}},
r0:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcU()){z.b=!0
return}this.a.$2(null,0)}},
r1:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
q_:{"^":"d;a,b,c",
gdY:function(){return this.a.gdY()},
gcU:function(){return this.a.gcU()},
geG:function(){return this.c!=null},
q:function(a,b){return J.dj(this.a,b)},
ev:function(a,b){return this.a.ev(a,b)},
bs:function(){return this.a.bs()},
ii:function(a){var z=new P.q2(a)
this.a=new P.q7(null,0,null,new P.q4(z),null,new P.q5(this,z),new P.q6(this,a),[null])},
w:{
q0:function(a){var z=new P.q_(null,!1,null)
z.ii(a)
return z}}},
q2:{"^":"a:2;a",
$0:function(){P.cv(new P.q3(this.a))}},
q3:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
q4:{"^":"a:2;a",
$0:function(){this.a.$0()}},
q5:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
q6:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gkp()){z.c=new P.cm(new P.F(0,$.q,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cv(new P.q1(this.b))}return z.c.gh4()}}},
q1:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bP:{"^":"d;ab:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
w:{
bQ:function(a){return new P.bP(a,1)},
aO:function(){return C.ag},
hC:function(a){return new P.bP(a,0)},
aP:function(a){return new P.bP(a,3)}}},
b9:{"^":"d;a,b,c,d",
gI:function(){var z=this.c
return z==null?this.b:z.gI()},
t:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.t())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bP){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ah(z)
if(!!w.$isb9){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qV:{"^":"c8;a",
gZ:function(a){return new P.b9(this.a(),null,null,null)},
$asc8:I.bc,
$asz:I.bc,
w:{
aQ:function(a){return new P.qV(a)}}},
Q:{"^":"d;$ti"},
hz:{"^":"d;h4:a<,$ti",
eA:function(a,b){if(a==null)a=new P.cS()
if(this.a.a!==0)throw H.c(new P.x("Future already completed"))
$.q.toString
this.bi(a,b)},
dw:function(a){return this.eA(a,null)}},
cm:{"^":"hz;a,$ti",
bV:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.x("Future already completed"))
z.bB(a)},
ez:function(){return this.bV(null)},
bi:function(a,b){this.a.fd(a,b)}},
qU:{"^":"hz;a,$ti",
bV:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.x("Future already completed"))
z.bh(a)},
ez:function(){return this.bV(null)},
bi:function(a,b){this.a.bi(a,b)}},
ee:{"^":"d;eh:a<,b,c,d,e,$ti",
gje:function(){return this.b.b},
gh6:function(){return(this.c&1)!==0},
gk8:function(){return(this.c&2)!==0},
gh5:function(){return this.c===8},
k6:function(a){return this.b.b.eT(this.d,a)},
kz:function(a){if(this.c!==6)return!0
return this.b.b.eT(this.d,a.gbt())},
jZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.ax(z,{func:1,args:[,,]}))return y.kW(z,a.gbt(),a.gbp())
else return y.eT(z,a.gbt())},
k7:function(){return this.b.b.hw(this.d)}},
F:{"^":"d;cJ:a<,b,j2:c<,$ti",
giO:function(){return this.a===2},
ged:function(){return this.a>=4},
eU:function(a,b){var z=$.q
if(z!==C.h){z.toString
if(b!=null)b=P.em(b,z)}return this.er(a,b)},
c1:function(a){return this.eU(a,null)},
er:function(a,b){var z,y
z=new P.F(0,$.q,null,[null])
y=b==null?1:3
this.dh(new P.ee(null,z,y,a,b,[H.m(this,0),null]))
return z},
c3:function(a){var z,y
z=$.q
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.dh(new P.ee(null,y,8,a,null,[z,z]))
return y},
dh:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ged()){y.dh(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bt(null,null,z,new P.qh(this,a))}},
fB:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.geh()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ged()){v.fB(a)
return}this.a=v.a
this.c=v.c}z.a=this.dq(a)
y=this.b
y.toString
P.bt(null,null,y,new P.qo(z,this))}},
dn:function(){var z=this.c
this.c=null
return this.dq(z)},
dq:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.geh()
z.a=y}return y},
bh:function(a){var z,y
z=this.$ti
if(H.aR(a,"$isQ",z,"$asQ"))if(H.aR(a,"$isF",z,null))P.d5(a,this)
else P.hB(a,this)
else{y=this.dn()
this.a=4
this.c=a
P.bp(this,y)}},
bi:[function(a,b){var z=this.dn()
this.a=8
this.c=new P.cB(a,b)
P.bp(this,z)},function(a){return this.bi(a,null)},"le","$2","$1","gbS",2,2,16,0],
bB:function(a){var z
if(H.aR(a,"$isQ",this.$ti,"$asQ")){this.it(a)
return}this.a=1
z=this.b
z.toString
P.bt(null,null,z,new P.qj(this,a))},
it:function(a){var z
if(H.aR(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bt(null,null,z,new P.qn(this,a))}else P.d5(a,this)
return}P.hB(a,this)},
fd:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bt(null,null,z,new P.qi(this,a,b))},
ik:function(a,b){this.a=4
this.c=a},
$isQ:1,
w:{
hB:function(a,b){var z,y,x
b.a=1
try{a.eU(new P.qk(b),new P.ql(b))}catch(x){z=H.B(x)
y=H.D(x)
P.cv(new P.qm(b,z,y))}},
d5:function(a,b){var z,y,x
for(;a.giO();)a=a.c
z=a.ged()
y=b.c
if(z){b.c=null
x=b.dq(y)
b.a=a.a
b.c=a.c
P.bp(b,x)}else{b.a=2
b.c=a
a.fB(y)}},
bp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbt()
t=v.gbp()
y.toString
P.bs(null,null,y,u,t)}return}for(;b.geh()!=null;b=s){s=b.a
b.a=null
P.bp(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gh6()||b.gh5()){q=b.gje()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbt()
t=v.gbp()
y.toString
P.bs(null,null,y,u,t)
return}p=$.q
if(p==null?q!=null:p!==q)$.q=q
else p=null
if(b.gh5())new P.qr(z,x,w,b).$0()
else if(y){if(b.gh6())new P.qq(x,b,r).$0()}else if(b.gk8())new P.qp(z,x,b).$0()
if(p!=null)$.q=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dq(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d5(y,o)
return}}o=b.b
b=o.dn()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qh:{"^":"a:2;a,b",
$0:function(){P.bp(this.a,this.b)}},
qo:{"^":"a:2;a,b",
$0:function(){P.bp(this.b,this.a.a)}},
qk:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bh(a)}},
ql:{"^":"a:49;a",
$2:function(a,b){this.a.bi(a,b)},
$1:function(a){return this.$2(a,null)}},
qm:{"^":"a:2;a,b,c",
$0:function(){this.a.bi(this.b,this.c)}},
qj:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dn()
z.a=4
z.c=this.b
P.bp(z,y)}},
qn:{"^":"a:2;a,b",
$0:function(){P.d5(this.b,this.a)}},
qi:{"^":"a:2;a,b,c",
$0:function(){this.a.bi(this.b,this.c)}},
qr:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.k7()}catch(w){y=H.B(w)
x=H.D(w)
if(this.c){v=this.a.a.c.gbt()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cB(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.F&&z.gcJ()>=4){if(z.gcJ()===8){v=this.b
v.b=z.gj2()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c1(new P.qs(t))
v.a=!1}}},
qs:{"^":"a:0;a",
$1:function(a){return this.a}},
qq:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k6(this.c)}catch(x){z=H.B(x)
y=H.D(x)
w=this.a
w.b=new P.cB(z,y)
w.a=!0}}},
qp:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kz(z)===!0&&w.e!=null){v=this.b
v.b=w.jZ(z)
v.a=!1}}catch(u){y=H.B(u)
x=H.D(u)
w=this.a
v=w.a.c.gbt()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cB(y,x)
s.a=!0}}},
hx:{"^":"d;jw:a<,cn:b@"},
ak:{"^":"d;$ti",
aE:function(a,b){return new P.qG(b,this,[H.y(this,"ak",0),null])},
a4:function(a,b){var z,y
z={}
y=new P.F(0,$.q,null,[P.a0])
z.a=null
z.a=this.aD(new P.oD(z,this,b,y),!0,new P.oE(y),y.gbS())
return y},
W:function(a,b){var z,y
z={}
y=new P.F(0,$.q,null,[null])
z.a=null
z.a=this.aD(new P.oH(z,this,b,y),!0,new P.oI(y),y.gbS())
return y},
gl:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[P.t])
z.a=0
this.aD(new P.oN(z),!0,new P.oO(z,y),y.gbS())
return y},
gV:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[P.a0])
z.a=null
z.a=this.aD(new P.oJ(z,y),!0,new P.oK(y),y.gbS())
return y},
ct:function(a){var z,y,x
z=H.y(this,"ak",0)
y=H.p([],[z])
x=new P.F(0,$.q,null,[[P.N,z]])
this.aD(new P.oP(this,y),!0,new P.oQ(y,x),x.gbS())
return x},
bG:function(a){var z,y,x
z=H.y(this,"ak",0)
y=P.a2(null,null,null,z)
x=new P.F(0,$.q,null,[[P.bJ,z]])
this.aD(new P.oR(this,y),!0,new P.oS(y,x),x.gbS())
return x},
gv:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[H.y(this,"ak",0)])
z.a=null
z.b=!1
this.aD(new P.oL(z,this),!0,new P.oM(z,y),y.gbS())
return y}},
oD:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hS(new P.oB(this.c,a),new P.oC(z,y),P.hH(z.a,y))},
$S:function(){return H.ba(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oB:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oC:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hI(this.a.a,this.b,!0)}},
oE:{"^":"a:2;a",
$0:function(){this.a.bh(!1)}},
oH:{"^":"a;a,b,c,d",
$1:function(a){P.hS(new P.oF(this.c,a),new P.oG(),P.hH(this.a.a,this.d))},
$S:function(){return H.ba(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oF:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oG:{"^":"a:0;",
$1:function(a){}},
oI:{"^":"a:2;a",
$0:function(){this.a.bh(null)}},
oN:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oO:{"^":"a:2;a,b",
$0:function(){this.b.bh(this.a.a)}},
oJ:{"^":"a:0;a,b",
$1:function(a){P.hI(this.a.a,this.b,!1)}},
oK:{"^":"a:2;a",
$0:function(){this.a.bh(!0)}},
oP:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.ba(function(a){return{func:1,args:[a]}},this.a,"ak")}},
oQ:{"^":"a:2;a,b",
$0:function(){this.b.bh(this.a)}},
oR:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.ba(function(a){return{func:1,args:[a]}},this.a,"ak")}},
oS:{"^":"a:2;a,b",
$0:function(){this.b.bh(this.a)}},
oL:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.ba(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oM:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bh(x.a)
return}try{x=H.ai()
throw H.c(x)}catch(w){z=H.B(w)
y=H.D(w)
P.rb(this.b,z,y)}}},
d6:{"^":"d;cJ:b<,$ti",
gdY:function(){return new P.d3(this,this.$ti)},
gkp:function(){return(this.b&4)!==0},
gcU:function(){var z=this.b
return(z&1)!==0?this.gbK().gfu():(z&2)===0},
giW:function(){if((this.b&8)===0)return this.a
return this.a.gd4()},
e6:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eh(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd4()==null)y.c=new P.eh(null,null,0,this.$ti)
return y.c},
gbK:function(){if((this.b&8)!==0)return this.a.gd4()
return this.a},
cz:function(){if((this.b&4)!==0)return new P.x("Cannot add event after closing")
return new P.x("Cannot add event while adding a stream")},
ju:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cz())
if((z&2)!==0){z=new P.F(0,$.q,null,[null])
z.bB(null)
return z}z=this.a
y=new P.F(0,$.q,null,[null])
x=a.aD(this.gir(),!1,this.gis(),this.gio())
w=this.b
if((w&1)!==0?this.gbK().gfu():(w&2)===0)x.cX()
this.a=new P.qN(z,y,x,this.$ti)
this.b|=8
return y},
fk:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bg():new P.F(0,$.q,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cz())
this.bR(b)},"$1","gjh",2,0,function(){return H.ba(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d6")}],
ev:function(a,b){if(this.b>=4)throw H.c(this.cz())
if(a==null)a=new P.cS()
$.q.toString
this.ca(a,b)},
bs:function(){var z=this.b
if((z&4)!==0)return this.fk()
if(z>=4)throw H.c(this.cz())
z|=4
this.b=z
if((z&1)!==0)this.cH()
else if((z&3)===0)this.e6().q(0,C.v)
return this.fk()},
bR:[function(a){var z=this.b
if((z&1)!==0)this.cG(a)
else if((z&3)===0)this.e6().q(0,new P.ea(a,null,this.$ti))},"$1","gir",2,0,function(){return H.ba(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d6")}],
ca:[function(a,b){var z=this.b
if((z&1)!==0)this.cI(a,b)
else if((z&3)===0)this.e6().q(0,new P.eb(a,b,null))},"$2","gio",4,0,47],
e0:[function(){var z=this.a
this.a=z.gd4()
this.b&=4294967287
z.a.bB(null)},"$0","gis",0,0,7],
j9:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.x("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.qb(this,null,null,null,z,y,null,null,this.$ti)
x.fa(a,b,c,d,H.m(this,0))
w=this.giW()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd4(x)
v.b.d0()}else this.a=x
x.j7(w)
x.eb(new P.qP(this))
return x},
j_:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.cf()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.B(v)
x=H.D(v)
u=new P.F(0,$.q,null,[null])
u.fd(y,x)
z=u}else z=z.c3(w)
w=new P.qO(this)
if(z!=null)z=z.c3(w)
else w.$0()
return z}},
qP:{"^":"a:2;a",
$0:function(){P.en(this.a.d)}},
qO:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bB(null)}},
qX:{"^":"d;$ti",
cG:function(a){this.gbK().bR(a)},
cI:function(a,b){this.gbK().ca(a,b)},
cH:function(){this.gbK().e0()}},
q8:{"^":"d;$ti",
cG:function(a){this.gbK().cb(new P.ea(a,null,[H.m(this,0)]))},
cI:function(a,b){this.gbK().cb(new P.eb(a,b,null))},
cH:function(){this.gbK().cb(C.v)}},
q7:{"^":"d6+q8;a,b,c,d,e,f,r,$ti"},
qW:{"^":"d6+qX;a,b,c,d,e,f,r,$ti"},
d3:{"^":"qQ;a,$ti",
gB:function(a){return(H.aA(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d3))return!1
return b.a===this.a}},
qb:{"^":"cn;x,a,b,c,d,e,f,r,$ti",
ei:function(){return this.x.j_(this)},
ek:[function(){var z=this.x
if((z.b&8)!==0)z.a.cX()
P.en(z.e)},"$0","gej",0,0,7],
em:[function(){var z=this.x
if((z.b&8)!==0)z.a.d0()
P.en(z.f)},"$0","gel",0,0,7]},
pS:{"^":"d;$ti",
cX:function(){this.b.cX()},
d0:function(){this.b.d0()},
cf:function(){var z=this.b.cf()
if(z==null){this.a.bB(null)
return}return z.c3(new P.pT(this))},
ez:function(){this.a.bB(null)}},
pT:{"^":"a:2;a",
$0:function(){this.a.a.bB(null)}},
qN:{"^":"pS;d4:c@,a,b,$ti"},
cn:{"^":"d;cJ:e<,$ti",
j7:function(a){if(a==null)return
this.r=a
if(!a.gV(a)){this.e=(this.e|64)>>>0
this.r.d9(this)}},
kF:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fR()
if((z&4)===0&&(this.e&32)===0)this.eb(this.gej())},
cX:function(){return this.kF(null)},
d0:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gV(z)}else z=!1
if(z)this.r.d9(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eb(this.gel())}}}},
cf:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e1()
z=this.f
return z==null?$.$get$bg():z},
gfu:function(){return(this.e&4)!==0},
gcU:function(){return this.e>=128},
e1:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fR()
if((this.e&32)===0)this.r=null
this.f=this.ei()},
bR:["i4",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cG(a)
else this.cb(new P.ea(a,null,[H.y(this,"cn",0)]))}],
ca:["i5",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cI(a,b)
else this.cb(new P.eb(a,b,null))}],
e0:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cH()
else this.cb(C.v)},
ek:[function(){},"$0","gej",0,0,7],
em:[function(){},"$0","gel",0,0,7],
ei:function(){return},
cb:function(a){var z,y
z=this.r
if(z==null){z=new P.eh(null,null,0,[H.y(this,"cn",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d9(this)}},
cG:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hz(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e3((z&4)!==0)},
cI:function(a,b){var z,y
z=this.e
y=new P.qa(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e1()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bg())z.c3(y)
else y.$0()}else{y.$0()
this.e3((z&4)!==0)}},
cH:function(){var z,y
z=new P.q9(this)
this.e1()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bg())y.c3(z)
else z.$0()},
eb:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e3((z&4)!==0)},
e3:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gV(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gV(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ek()
else this.em()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d9(this)},
fa:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.em(b==null?P.rt():b,z)
this.c=c==null?P.rs():c}},
qa:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ax(y,{func:1,args:[P.d,P.b_]})
w=z.d
v=this.b
u=z.b
if(x)w.kX(u,v,this.c)
else w.hz(u,v)
z.e=(z.e&4294967263)>>>0}},
q9:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hx(z.c)
z.e=(z.e&4294967263)>>>0}},
qQ:{"^":"ak;$ti",
aD:function(a,b,c,d){return this.a.j9(a,d,c,!0===b)},
eN:function(a,b,c){return this.aD(a,null,b,c)}},
ec:{"^":"d;cn:a@,$ti"},
ea:{"^":"ec;ab:b<,a,$ti",
eO:function(a){a.cG(this.b)}},
eb:{"^":"ec;bt:b<,bp:c<,a",
eO:function(a){a.cI(this.b,this.c)},
$asec:I.bc},
qc:{"^":"d;",
eO:function(a){a.cH()},
gcn:function(){return},
scn:function(a){throw H.c(new P.x("No events after a done."))}},
qI:{"^":"d;cJ:a<,$ti",
d9:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cv(new P.qJ(this,a))
this.a=1},
fR:function(){if(this.a===1)this.a=3}},
qJ:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcn()
z.b=w
if(w==null)z.c=null
x.eO(this.b)}},
eh:{"^":"qI;b,c,a,$ti",
gV:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scn(b)
this.c=b}}},
qR:{"^":"d;a,b,c,$ti"},
r6:{"^":"a:2;a,b,c",
$0:function(){return this.a.bi(this.b,this.c)}},
r5:{"^":"a:21;a,b",
$2:function(a,b){P.r4(this.a,this.b,a,b)}},
r7:{"^":"a:2;a,b",
$0:function(){return this.a.bh(this.b)}},
ed:{"^":"ak;$ti",
aD:function(a,b,c,d){return this.iA(a,d,c,!0===b)},
eN:function(a,b,c){return this.aD(a,null,b,c)},
iA:function(a,b,c,d){return P.qg(this,a,b,c,d,H.y(this,"ed",0),H.y(this,"ed",1))},
fq:function(a,b){b.bR(a)},
iM:function(a,b,c){c.ca(a,b)},
$asak:function(a,b){return[b]}},
hA:{"^":"cn;x,y,a,b,c,d,e,f,r,$ti",
bR:function(a){if((this.e&2)!==0)return
this.i4(a)},
ca:function(a,b){if((this.e&2)!==0)return
this.i5(a,b)},
ek:[function(){var z=this.y
if(z==null)return
z.cX()},"$0","gej",0,0,7],
em:[function(){var z=this.y
if(z==null)return
z.d0()},"$0","gel",0,0,7],
ei:function(){var z=this.y
if(z!=null){this.y=null
return z.cf()}return},
lg:[function(a){this.x.fq(a,this)},"$1","giJ",2,0,function(){return H.ba(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hA")}],
li:[function(a,b){this.x.iM(a,b,this)},"$2","giL",4,0,46],
lh:[function(){this.e0()},"$0","giK",0,0,7],
ij:function(a,b,c,d,e,f,g){this.y=this.x.a.eN(this.giJ(),this.giK(),this.giL())},
$ascn:function(a,b){return[b]},
w:{
qg:function(a,b,c,d,e,f,g){var z,y
z=$.q
y=e?1:0
y=new P.hA(a,null,null,null,null,z,y,null,null,[f,g])
y.fa(b,c,d,e,g)
y.ij(a,b,c,d,e,f,g)
return y}}},
qG:{"^":"ed;b,a,$ti",
fq:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.B(w)
x=H.D(w)
P.r_(b,y,x)
return}b.bR(z)}},
cB:{"^":"d;bt:a<,bp:b<",
k:function(a){return H.b(this.a)},
$isa1:1},
qZ:{"^":"d;"},
rj:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cS()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
qK:{"^":"qZ;",
hx:function(a){var z,y,x,w
try{if(C.h===$.q){x=a.$0()
return x}x=P.hP(null,null,this,a)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bs(null,null,this,z,y)
return x}},
hz:function(a,b){var z,y,x,w
try{if(C.h===$.q){x=a.$1(b)
return x}x=P.hR(null,null,this,a,b)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bs(null,null,this,z,y)
return x}},
kX:function(a,b,c){var z,y,x,w
try{if(C.h===$.q){x=a.$2(b,c)
return x}x=P.hQ(null,null,this,a,b,c)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bs(null,null,this,z,y)
return x}},
ex:function(a,b){if(b)return new P.qL(this,a)
else return new P.qM(this,a)},
j:function(a,b){return},
hw:function(a){if($.q===C.h)return a.$0()
return P.hP(null,null,this,a)},
eT:function(a,b){if($.q===C.h)return a.$1(b)
return P.hR(null,null,this,a,b)},
kW:function(a,b,c){if($.q===C.h)return a.$2(b,c)
return P.hQ(null,null,this,a,b,c)}},
qL:{"^":"a:2;a,b",
$0:function(){return this.a.hx(this.b)}},
qM:{"^":"a:2;a,b",
$0:function(){return this.a.hw(this.b)}}}],["","",,P,{"^":"",
dG:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
aL:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
ae:function(a){return H.tP(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
lN:function(a,b,c){var z,y
if(P.el(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bU()
y.push(a)
try{P.re(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h5(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c9:function(a,b,c){var z,y,x
if(P.el(a))return b+"..."+c
z=new P.bN(b)
y=$.$get$bU()
y.push(a)
try{x=z
x.C=P.h5(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
el:function(a){var z,y
for(z=0;y=$.$get$bU(),z<y.length;++z)if(a===y[z])return!0
return!1},
re:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gZ(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gI())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gI();++x
if(!z.t()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gI();++x
for(;z.t();t=s,s=r){r=z.gI();++x
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
m8:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
cd:function(a,b,c){var z=P.m8(null,null,null,b,c)
a.W(0,new P.rv(z))
return z},
a2:function(a,b,c,d){return new P.hD(0,null,null,null,null,null,0,[d])},
b5:function(a,b){var z,y
z=P.a2(null,null,null,b)
for(y=J.ah(a);y.t();)z.q(0,y.gI())
return z},
dL:function(a){var z,y,x
z={}
if(P.el(a))return"{...}"
y=new P.bN("")
try{$.$get$bU().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.W(0,new P.mj(z,y))
z=y
z.C=z.gC()+"}"}finally{z=$.$get$bU()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hE:{"^":"R;a,b,c,d,e,f,r,$ti",
cS:function(a){return H.un(a)&0x3ffffff},
cT:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gh8()
if(x==null?b==null:x===b)return y}return-1},
w:{
bR:function(a,b){return new P.hE(0,null,null,null,null,null,0,[a,b])}}},
hD:{"^":"qt;a,b,c,d,e,f,r,$ti",
eg:function(){return new P.hD(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gV:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
a4:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.iy(b)},
iy:function(a){var z=this.d
if(z==null)return!1
return this.dk(z[this.dj(a)],a)>=0},
cm:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a4(0,a)?a:null
else return this.iQ(a)},
iQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dj(a)]
x=this.dk(y,a)
if(x<0)return
return J.ay(y,x).gfj()},
W:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.C(this))
z=z.b}},
gv:function(a){var z=this.f
if(z==null)throw H.c(new P.x("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fe(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fe(x,b)}else return this.az(b)},
az:function(a){var z,y,x
z=this.d
if(z==null){z=P.qC()
this.d=z}y=this.dj(a)
x=z[y]
if(x==null)z[y]=[this.e4(a)]
else{if(this.dk(x,a)>=0)return!1
x.push(this.e4(a))}return!0},
a0:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ff(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ff(this.c,b)
else return this.j0(b)},
j0:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dj(a)]
x=this.dk(y,a)
if(x<0)return!1
this.fg(y.splice(x,1)[0])
return!0},
iG:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.C(this))
if(b===v)this.a0(0,y)}},
b9:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fe:function(a,b){if(a[b]!=null)return!1
a[b]=this.e4(b)
return!0},
ff:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fg(z)
delete a[b]
return!0},
e4:function(a){var z,y
z=new P.qB(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fg:function(a){var z,y
z=a.gix()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dj:function(a){return J.j(a)&0x3ffffff},
dk:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfj(),b))return y
return-1},
$isbJ:1,
$isX:1,
w:{
qC:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qB:{"^":"d;fj:a<,b,ix:c<"},
ac:{"^":"d;a,b,c,d,$ti",
gI:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qt:{"^":"o1;$ti",
bG:function(a){var z=this.eg()
z.aw(0,this)
return z}},
c8:{"^":"z;$ti"},
rv:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
fl:{"^":"fu;$ti"},
fu:{"^":"d+b6;$ti",$asN:null,$asX:null,$isN:1,$isX:1},
b6:{"^":"d;$ti",
gZ:function(a){return new H.dH(this,this.gl(this),0,null,[H.y(this,"b6",0)])},
ap:function(a,b){return this.j(0,b)},
W:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.C(this))}},
gV:function(a){return this.gl(this)===0},
gaq:function(a){return!this.gV(this)},
gv:function(a){if(this.gl(this)===0)throw H.c(H.ai())
return this.j(0,this.gl(this)-1)},
a4:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
br:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
aQ:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.C(this))}return c.$0()},
aE:function(a,b){return new H.ap(this,b,[H.y(this,"b6",0),null])},
dX:function(a,b){return H.h7(this,b,null,H.y(this,"b6",0))},
bG:function(a){var z,y
z=P.a2(null,null,null,H.y(this,"b6",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a0:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b0(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iF:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"b6",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.C(this))}if(z.length!==this.gl(this)){this.hW(0,0,z.length,z)
this.sl(0,z.length)}},
b0:function(a,b,c,d,e){var z,y,x,w,v
P.cg(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aR(d,"$isN",[H.y(this,"b6",0)],"$asN")){y=e
x=d}else{x=J.iS(d,e).bF(0,!1)
y=0}w=J.J(x)
if(y+z>w.gl(x))throw H.c(H.f9())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hW:function(a,b,c,d){return this.b0(a,b,c,d,0)},
bP:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aY:function(a,b){return this.bP(a,b,0)},
k:function(a){return P.c9(this,"[","]")},
$isN:1,
$isX:1},
qY:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isG:1},
mh:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a9:function(a){return this.a.a9(a)},
W:function(a,b){this.a.W(0,b)},
gV:function(a){var z=this.a
return z.gV(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isG:1},
ht:{"^":"mh+qY;a,$ti",$asG:null,$isG:1},
mj:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
m9:{"^":"aY;a,b,c,d,$ti",
gZ:function(a){return new P.eg(this,this.c,this.d,this.b,null,this.$ti)},
W:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.C(this))}},
gV:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gv:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ai())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
ap:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cN(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.az(b)},
aw:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aR(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.ma(w+(w>>>1))
if(typeof t!=="number")return H.w(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.jd(s)
this.a=s
this.b=0
C.a.b0(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b0(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b0(v,z,z+r,b,0)
C.a.b0(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.eg(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.az(z.e)},
b9:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c9(this,"{","}")},
fN:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fp();++this.d},
dH:function(){var z,y,x,w
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
if(this.b===x)this.fp();++this.d},
fp:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.b0(y,0,w,z,x)
C.a.b0(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
jd:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b0(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b0(a,0,v,x,z)
C.a.b0(a,v,v+this.c,this.a,0)
return this.c+v}},
i8:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
w:{
b7:function(a,b){var z=new P.m9(null,0,0,0,[b])
z.i8(a,b)
return z},
ma:function(a){var z
a=C.N.f2(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
eg:{"^":"d;a,b,c,d,e,$ti",
gI:function(){return this.e},
t:function(){var z,y,x
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
o2:{"^":"d;$ti",
gV:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
aw:function(a,b){var z
for(z=J.ah(b);z.t();)this.q(0,z.gI())},
jB:function(a){var z,y
for(z=a.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a4(0,y.d))return!1
return!0},
bF:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ac(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
ct:function(a){return this.bF(a,!0)},
aE:function(a,b){return new H.bB(this,b,[H.m(this,0),null])},
k:function(a){return P.c9(this,"{","}")},
W:function(a,b){var z
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bu:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gv:function(a){var z,y
z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.ai())
do y=z.d
while(z.t())
return y},
aQ:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ai())},
cg:function(a,b){return this.aQ(a,b,null)},
bA:function(a,b){var z,y,x,w
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dx())
y=w
x=!0}}if(x)return y
throw H.c(H.ai())},
$isbJ:1,
$isX:1},
o1:{"^":"o2;$ti"}}],["","",,P,{"^":"",
d8:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qw(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d8(a[z])
return a},
rh:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.B(x)
w=String(y)
throw H.c(new P.f4(w,null,null))}w=P.d8(z)
return w},
wv:[function(a){return a.dM()},"$1","tt",2,0,0],
qw:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iZ(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cB().length
return z},
gV:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cB().length
return z===0},
gaq:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cB().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a9(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.jb().n(0,b,c)},
a9:function(a){if(this.b==null)return this.c.a9(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
W:function(a,b){var z,y,x,w
if(this.b==null)return this.c.W(0,b)
z=this.cB()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d8(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dL(this)},
cB:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jb:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dG(P.r,null)
y=this.cB()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iZ:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d8(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.r,null]}},
eY:{"^":"d;$ti"},
cH:{"^":"d;$ti"},
dC:{"^":"a1;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lS:{"^":"dC;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lR:{"^":"eY;a,b",
jF:function(a,b){var z=P.rh(a,this.gjG().a)
return z},
jE:function(a){return this.jF(a,null)},
jO:function(a,b){var z=this.gjP()
z=P.qy(a,z.b,z.a)
return z},
h_:function(a){return this.jO(a,null)},
gjP:function(){return C.Q},
gjG:function(){return C.P},
$aseY:function(){return[P.d,P.r]}},
lU:{"^":"cH;a,b",
$ascH:function(){return[P.d,P.r]}},
lT:{"^":"cH;a",
$ascH:function(){return[P.r,P.d]}},
qz:{"^":"d;",
hI:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gl(a)
if(typeof y!=="number")return H.w(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cP(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.b.aH(a,w,v)
w=v+1
x.C+=H.aq(92)
switch(u){case 8:x.C+=H.aq(98)
break
case 9:x.C+=H.aq(116)
break
case 10:x.C+=H.aq(110)
break
case 12:x.C+=H.aq(102)
break
case 13:x.C+=H.aq(114)
break
default:x.C+=H.aq(117)
x.C+=H.aq(48)
x.C+=H.aq(48)
t=u>>>4&15
x.C+=H.aq(t<10?48+t:87+t)
t=u&15
x.C+=H.aq(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.b.aH(a,w,v)
w=v+1
x.C+=H.aq(92)
x.C+=H.aq(u)}}if(w===0)x.C+=H.b(a)
else if(w<y)x.C+=z.aH(a,w,y)},
e2:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lS(a,null))}z.push(a)},
dP:function(a){var z,y,x,w
if(this.hH(a))return
this.e2(a)
try{z=this.b.$1(a)
if(!this.hH(z))throw H.c(new P.dC(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.B(w)
throw H.c(new P.dC(a,y))}},
hH:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.C+=C.j.k(a)
return!0}else if(a===!0){this.c.C+="true"
return!0}else if(a===!1){this.c.C+="false"
return!0}else if(a==null){this.c.C+="null"
return!0}else if(typeof a==="string"){z=this.c
z.C+='"'
this.hI(a)
z.C+='"'
return!0}else{z=J.o(a)
if(!!z.$isN){this.e2(a)
this.l9(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.e2(a)
y=this.la(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
l9:function(a){var z,y,x
z=this.c
z.C+="["
y=J.J(a)
if(y.gl(a)>0){this.dP(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.C+=","
this.dP(y.j(a,x))}}z.C+="]"},
la:function(a){var z,y,x,w,v,u,t
z={}
if(a.gV(a)){this.c.C+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.W(0,new P.qA(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.hI(x[u])
w.C+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dP(x[t])}w.C+="}"
return!0}},
qA:{"^":"a:6;a,b",
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
qx:{"^":"qz;c,a,b",w:{
qy:function(a,b,c){var z,y,x
z=new P.bN("")
y=new P.qx(z,[],P.tt())
y.dP(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vU:[function(a,b){return J.bz(a,b)},"$2","tu",4,0,40],
f1:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kW(a)},
kW:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cU(a)},
cL:function(a){return new P.qf(a)},
P:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.ah(a);y.t();)z.push(y.gI())
if(b)return z
z.fixed$length=Array
return z},
mb:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aZ:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ex:function(a){H.uv(H.b(a))},
bk:function(a,b,c){return new H.dz(a,H.dA(a,!1,b,!1),null,null)},
a0:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cJ:{"^":"d;jc:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cJ))return!1
return this.a===b.a&&!0},
bC:function(a,b){return C.e.bC(this.a,b.gjc())},
gB:function(a){var z=this.a
return(z^C.e.ds(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.kd(H.n9(this))
y=P.c1(H.n7(this))
x=P.c1(H.n3(this))
w=P.c1(H.n4(this))
v=P.c1(H.n6(this))
u=P.c1(H.n8(this))
t=P.ke(H.n5(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gkd()
y=new P.cJ(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.E(y.gkA()))
return y},
gkA:function(){return this.a},
$isV:1,
$asV:function(){return[P.cJ]},
w:{
kd:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
ke:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c1:function(a){if(a>=10)return""+a
return"0"+a}}},
aS:{"^":"L;",$isV:1,
$asV:function(){return[P.L]}},
"+double":0,
b4:{"^":"d;bT:a<",
ah:function(a,b){return new P.b4(this.a+b.gbT())},
as:function(a,b){return new P.b4(this.a-b.gbT())},
c6:function(a,b){if(typeof b!=="number")return H.w(b)
return new P.b4(C.j.hv(this.a*b))},
aV:function(a,b){return C.e.aV(this.a,b.gbT())},
bn:function(a,b){return this.a>b.gbT()},
d8:function(a,b){return this.a<=b.gbT()},
bQ:function(a,b){return C.e.bQ(this.a,b.gbT())},
gkd:function(){return C.e.bL(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.b4))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
bC:function(a,b){return C.e.bC(this.a,b.gbT())},
k:function(a){var z,y,x,w,v
z=new P.kD()
y=this.a
if(y<0)return"-"+new P.b4(0-y).k(0)
x=z.$1(C.e.bL(y,6e7)%60)
w=z.$1(C.e.bL(y,1e6)%60)
v=new P.kC().$1(y%1e6)
return""+C.e.bL(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f1:function(a){return new P.b4(0-this.a)},
$isV:1,
$asV:function(){return[P.b4]}},
kC:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kD:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a1:{"^":"d;",
gbp:function(){return H.D(this.$thrownJsError)}},
cS:{"^":"a1;",
k:function(a){return"Throw of null."}},
b3:{"^":"a1;a,b,h:c<,d",
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
u=P.f1(this.b)
return w+v+": "+H.b(u)},
w:{
E:function(a){return new P.b3(!1,null,null,a)},
cA:function(a,b,c){return new P.b3(!0,a,b,c)},
l:function(a){return new P.b3(!1,null,a,"Must not be null")}}},
e_:{"^":"b3;e,f,a,b,c,d",
ge8:function(){return"RangeError"},
ge7:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
w:{
nf:function(a){return new P.e_(null,null,!1,null,null,a)},
cf:function(a,b,c){return new P.e_(null,null,!0,a,b,"Value not in range")},
a3:function(a,b,c,d,e){return new P.e_(b,c,!0,a,d,"Invalid value")},
ng:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a3(a,b,c,d,e))},
cg:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a3(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a3(b,a,c,"end",f))
return b}}},
lC:{"^":"b3;e,l:f>,a,b,c,d",
ge8:function(){return"RangeError"},
ge7:function(){if(J.bY(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
w:{
cN:function(a,b,c,d,e){var z=e!=null?e:J.aI(b)
return new P.lC(b,z,!0,a,c,"Index out of range")}}},
S:{"^":"a1;a",
k:function(a){return"Unsupported operation: "+this.a}},
a4:{"^":"a1;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
x:{"^":"a1;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a1;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f1(z))+"."}},
mF:{"^":"d;",
k:function(a){return"Out of Memory"},
gbp:function(){return},
$isa1:1},
h0:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbp:function(){return},
$isa1:1},
kc:{"^":"a1;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qf:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f4:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aH(x,0,75)+"..."
return y+"\n"+x}},
l0:{"^":"d;h:a<,fv,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fv
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cA(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dW(b,"expando$values")
return y==null?null:H.dW(y,z)},
n:function(a,b,c){var z,y
z=this.fv
if(typeof z!=="string")z.set(b,c)
else{y=H.dW(b,"expando$values")
if(y==null){y=new P.d()
H.fE(b,"expando$values",y)}H.fE(y,z,c)}}},
bC:{"^":"d;"},
t:{"^":"L;",$isV:1,
$asV:function(){return[P.L]}},
"+int":0,
z:{"^":"d;$ti",
aE:function(a,b){return H.bD(this,b,H.y(this,"z",0),null)},
c4:["dg",function(a,b){return new H.K(this,b,[H.y(this,"z",0)])}],
a4:function(a,b){var z
for(z=this.gZ(this);z.t();)if(J.e(z.gI(),b))return!0
return!1},
W:function(a,b){var z
for(z=this.gZ(this);z.t();)b.$1(z.gI())},
bu:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.t();)y=c.$2(y,z.gI())
return y},
br:function(a,b){var z
for(z=this.gZ(this);z.t();)if(b.$1(z.gI())===!0)return!0
return!1},
bF:function(a,b){return P.P(this,b,H.y(this,"z",0))},
ct:function(a){return this.bF(a,!0)},
bG:function(a){return P.b5(this,H.y(this,"z",0))},
gl:function(a){var z,y
z=this.gZ(this)
for(y=0;z.t();)++y
return y},
gV:function(a){return!this.gZ(this).t()},
gaq:function(a){return!this.gV(this)},
dX:function(a,b){return H.o8(this,b,H.y(this,"z",0))},
gv:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ai())
do y=z.gI()
while(z.t())
return y},
gc8:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.ai())
y=z.gI()
if(z.t())throw H.c(H.dx())
return y},
ap:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a3(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.t();){x=z.gI()
if(b===y)return x;++y}throw H.c(P.cN(b,this,"index",null,y))},
k:function(a){return P.lN(this,"(",")")}},
cP:{"^":"d;$ti"},
N:{"^":"d;$ti",$isz:1,$isX:1},
"+List":0,
G:{"^":"d;$ti"},
as:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isV:1,
$asV:function(){return[P.L]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gB:function(a){return H.aA(this)},
k:function(a){return H.cU(this)},
gby:function(a){return new H.au(H.ig(this),null)},
toString:function(){return this.k(this)}},
bi:{"^":"d;"},
bJ:{"^":"X;$ti"},
b_:{"^":"d;"},
r:{"^":"d;",$isV:1,
$asV:function(){return[P.r]},
$isdT:1},
"+String":0,
bN:{"^":"d;C<",
gl:function(a){return this.C.length},
gV:function(a){return this.C.length===0},
gaq:function(a){return this.C.length!==0},
k:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
w:{
h5:function(a,b,c){var z=J.ah(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gI())
while(z.t())}else{a+=H.b(z.gI())
for(;z.t();)a=a+c+H.b(z.gI())}return a},
oV:function(a){return new P.bN(a)}}}}],["","",,P,{"^":"",fQ:{"^":"d;"}}],["","",,P,{"^":"",
cV:function(a){return C.K},
qv:{"^":"d;",
am:function(a){if(a<=0||a>4294967296)throw H.c(P.nf("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kC:function(){return Math.random()}}}],["","",,S,{"^":"",k1:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
a9:function(a){return this.b.a9(a)},
W:function(a,b){return this.b.W(0,b)},
gV:function(a){var z=this.b
return z.gV(z)},
gaq:function(a){var z=this.b
return z.gaq(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iS()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iS:function(){if(!this.a)return
this.a=!1
this.b=P.cd(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",k2:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cm:function(a){return this.b.cm(a)},
a4:function(a,b){return this.b.a4(0,b)},
W:function(a,b){return this.b.W(0,b)},
gV:function(a){return this.b.a===0},
gaq:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
gv:function(a){var z=this.b
return z.gv(z)},
aE:function(a,b){var z=this.b
z.toString
return new H.bB(z,b,[H.m(z,0),null])},
bG:function(a){var z,y
z=this.b
y=z.eg()
y.aw(0,z)
return y},
q:function(a,b){this.iz()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
iz:function(){if(!this.a)return
this.a=!1
this.b=P.b5(this.b,H.m(this,0))},
$isbJ:1,
$isX:1}}],["","",,S,{"^":"",dp:{"^":"d;fz:a<,b,$ti",
a_:function(a){var z=new S.O(null,null,this.$ti)
z.ai()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=X.bw(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdp)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gB(b)
w=this.gB(this)
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
bP:function(a,b,c){var z=this.a
return(z&&C.a).bP(z,b,c)},
aY:function(a,b){return this.bP(a,b,0)},
gZ:function(a){var z=this.a
return new J.be(z,z.length,0,null,[H.m(z,0)])},
aE:function(a,b){var z=this.a
z.toString
return new H.ap(z,b,[H.m(z,0),null])},
a4:function(a,b){var z=this.a
return(z&&C.a).a4(z,b)},
W:function(a,b){var z=this.a
return(z&&C.a).W(z,b)},
bG:function(a){var z=this.a
z.toString
return P.b5(z,H.m(z,0))},
gV:function(a){return this.a.length===0},
gaq:function(a){return this.a.length!==0},
gv:function(a){var z=this.a
return(z&&C.a).gv(z)},
ai:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fz:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dp(z,null,this.$ti)
y.ai()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aR(a,"$isdp",this.$ti,null)){this.a=a.gfz()
this.b=a}else{this.a=P.P(a,!0,H.m(this,0))
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
a0:function(a,b){var z=this.geo();(z&&C.a).a0(z,b)},
aE:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bF(0,!0)
this.a=z
this.b=null
this.iu(z)},
geo:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.m(this,0))
this.b=null}return this.a},
ai:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))},
iu:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.db(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cE:{"^":"d;iR:a<,b,c,d,$ti",
a_:function(a){var z=new A.cR(null,null,this.$ti)
z.cc()
z.m(this)
a.$1(z)
return z.p()},
E:function(){return new S.k1(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gck()
z=H.bD(z,new A.jN(this),H.y(z,"z",0),null)
z=P.P(z,!1,H.y(z,"z",0))
C.a.f5(z)
z=X.bw(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscE)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gck()
this.c=z}z=z.gZ(z)
for(;z.t();){v=z.gI()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
W:function(a,b){this.a.W(0,b)},
gV:function(a){var z=this.a
return z.gV(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gl:function(a){var z=this.a
return z.gl(z)},
cc:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.au(H.W(H.m(this,1)),null).u(0,C.o))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jN:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d9(X.b0(X.b0(0,J.j(z)),J.j(y)))}},cR:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cE(this.a,null,null,null,this.$ti)
z.cc()
this.b=z}return z},
m:function(a){var z
if(H.aR(a,"$iscE",this.$ti,null)){this.b=a
this.a=a.giR()}else if(!!a.$iscE){z=P.cd(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.cd(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gby(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.E("null value"))
this.gj3().n(0,b,c)},
gj3:function(){if(this.b!=null){this.a=P.cd(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
cc:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.au(H.W(H.m(this,1)),null).u(0,C.o))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dq:{"^":"d;j5:a<,b,$ti",
a_:function(a){var z=new L.aB(null,null,this.$ti)
z.aX()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bB(z,new L.jO(),[H.m(z,0),null]),!1,null)
C.a.f5(z)
z=X.bw(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdq)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gB(b)
x=this.gB(this)
if(z==null?x!=null:z!==x)return!1
return y.jB(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
cm:function(a){return this.a.cm(a)},
gZ:function(a){var z,y
z=this.a
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
aE:function(a,b){var z=this.a
z.toString
return new H.bB(z,b,[H.m(z,0),null])},
a4:function(a,b){return this.a.a4(0,b)},
W:function(a,b){return this.a.W(0,b)},
bG:function(a){return new A.k2(!0,this.a,this.$ti)},
gV:function(a){return this.a.a===0},
gaq:function(a){return this.a.a!==0},
gv:function(a){var z=this.a
return z.gv(z)},
aQ:function(a,b,c){return this.a.aQ(0,b,c)},
cg:function(a,b){return this.aQ(a,b,null)},
aX:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jO:{"^":"a:0;",
$1:function(a){return J.j(a)}},aB:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dq(this.a,null,this.$ti)
z.aX()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aR(a,"$isdq",this.$ti,null)){this.a=a.gj5()
this.b=a}else{z=H.m(this,0)
y=P.a2(null,null,null,z)
for(x=J.ah(a);x.t();){w=x.gI()
if(H.db(w,z))y.q(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.E("null element"))
this.gep().q(0,b)},
a0:function(a,b){this.gep().a0(0,b)},
aE:function(a,b){var z=this.a
z.toString
z=P.b5(new H.bB(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.j6(z)},
gep:function(){if(this.b!=null){this.a=P.b5(this.a,H.m(this,0))
this.b=null}return this.a},
aX:function(){if(new H.au(H.W(H.m(this,0)),null).u(0,C.o))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j6:function(a){var z,y,x
for(z=new P.ac(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.db(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.w(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nE:{"^":"nC;ch,cx,al:cy@,bg:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hm:function(){var z=$.$get$cw()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
kf:function(){var z,y,x,w
this.cx=null
this.cy=Z.bL("Health",new N.nH(),"#CCCCCC","Your physical state",100,0,!0,P.aS)
z=P.t
this.db=Z.bL("Stamina",new N.nI(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bL("Gold",new N.nJ(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bV()
x=this.cy
w=this.db
y=new O.f0(N.bh("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a_(H.p([],[Y.af]),0,P.aL()),x,w,z,O.uF(),O.uE(),O.uD(),y,this.gi_(),new P.bN(""),!1,null)
y.hX()
this.cx=y
y.x="endGame"
$.$get$cs().q(0,0)},
ic:function(){var z,y
z=new O.cZ(["# Tomorrow We Slay Death",[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cZ([new N.nG(this),[null,P.ae(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cZ(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
w:{
nF:function(){var z,y,x,w
z=Z.bL("Health",new N.t5(),"#CCCCCC","Your physical state",100,0,!0,P.aS)
y=P.t
x=Z.bL("Stamina",new N.t6(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bL("Gold",new N.t7(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.r
z=new N.nE("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nK(new H.R(0,null,null,null,null,null,0,[w,O.cZ])),null,null,null,P.a2(null,null,null,w),!1,null,-9999,null,null,null)
z.ic()
return z}}},t5:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d8(a,0.5))return"\ud83d\ude23"
if(z.aV(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},t6:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},t7:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nG:{"^":"a:19;a",
$0:function(){var z=0,y=P.az(),x=this
var $async$$0=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:z=2
return P.av(x.a.cx.bx(),$async$$0)
case 2:return P.aD(null,y)}})
return P.aE($async$$0,y)}},nH:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d8(a,0.5))return"\ud83d\ude23"
if(z.aV(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nI:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nJ:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cK:{"^":"d;"},kT:{"^":"d;"},pC:{"^":"cK;a,b,c",
a_:function(a){var z=new M.e7(null,!1,0,0)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cK))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.M.gB(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},e7:{"^":"kT;d,a,b,c",
gcv:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gcv()
y=this.b
this.gcv()
x=this.c
this.gcv()
this.a
z=new M.pC(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
wz:[function(a){var z,y
z=a.gc7()
y=a.gbX()
if(typeof y!=="number")return H.w(y)
return z-2*y},"$1","de",2,0,20],
wK:[function(a){var z,y,x
z=a.gc7()
y=a.gd1()
x=a.gbX()
if(typeof x!=="number")return H.w(x)
return z+y-x},"$1","i5",2,0,20],
f0:{"^":"md;y,z,Q,ch,cx,cy,db,dx,dy,bH:fr<,fx,f7:fy<,al:go<,bg:id<,k1,a,b,c,d,e,f,r,x",
hX:function(){var z,y,x,w,v,u
z=P.aZ(C.p,null)
y=$.$get$ct()
this.cy=R.b2(1000,"orc",O.de(),null,null,new G.b8("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b2(1001,"goblin",O.de(),null,null,new G.b8("scimitar",1,1,!1,!0,!1,P.aZ(C.p,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.u])
y.ai()
y.m([new Q.u("start_adventure","","",null)])
this.dx=new K.ci(y.p(),"preStartBook",new O.kK(),new O.kL(),null,null,"ground")
y=R.b2(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.D,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d6()
if(typeof y!=="number")return H.w(y)
this.go.sab(z/y)
this.id.sab(this.ch.fx)
this.k1.sab(this.ch.r)
this.cx=R.b2(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a4,0,null)
this.dy=F.fL(this.dx,!1)
y=K.ci
x=P.P($.$get$hV(),!0,y)
C.a.aw(x,[this.dx,$.$get$eq()])
w=new M.e7(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b5([z,v],R.I)
z=P.b7(null,O.cy)
u=new A.ab(v,P.a2(null,null,null,U.a8),w,z,P.b5(x,y),P.P([u],!0,S.aa),0,null)
this.fr=u
y=new Y.a_(H.p([],[Y.af]),0,P.aL())
y.b=u.r
this.fx=new B.bE(u,null,y,1,1,!0,!1,!1,0)},
d3:function(){var z=0,y=P.az(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d3=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjN()
if(v.hj(u)){z=1
break}t=w.fr.X(w.ch.y)
s=t.gal()
r=t.ghe()
if(typeof s!=="number"){x=s.d6()
z=1
break}if(typeof r!=="number"){x=H.w(r)
z=1
break}w.go.sab(s/r)
w.id.sab(t.gbg())
r=w.k1
s=t.gf0()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cl=!0}s=w.y
s.ha("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.A(0,"\n\n",!0)
if(w.fr.k9(w.ch.y))v.A(0,"TO BE CONTINUED.",!0)
else v.A(0,"You died.",!0)
w.f.C+=v.cp()
z=1
break}q=C.a.gv(r)
p=q.dR(w.fr)
o=G.iY(p,w.fr)
z=3
return P.av(o.kH(),$async$d3)
case 3:r=o.f
if(r.gV(r)){n=o.a
m=o.b
n.eY("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gB(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bO(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mM(r)
i=new Z.mL(new P.ht(r,[null,null]),n)
if(r.gV(r))$.$get$bF().eY("Created with no recommendations.")
if(n.length===0){s.dV("No recommendation for "+H.b(p.gh()))
s.dV(new O.kN(w))
w.fr.fZ(q.gi());++w.fr.r
z=1
break}z=p.gO()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.ar)(n),++h);s.bO("planner.generateTable for "+H.b(p.gh()))
o.eZ().W(0,new O.kO(w))
u=i.hl(q.gdC(),O.i5())
u.toString
g=P.P(u,!1,H.y(u,"z",0))
if(g.length!==0&&C.a.br(g,new O.kP())){w.f.C+=v.cp()
C.a.sl(v.a,0)}v=new O.kQ(new O.kS())
u=g.length-1
if(u-0<=32)H.h_(g,0,u,v)
else H.fZ(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gU(),f.gJ(),new O.kR(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfW()
z=7
return P.av(w.cw(i.kG(s==null?O.i5():s),p,v),$async$d3)
case 7:case 5:v.hj(u)
case 1:return P.aD(x,y)}})
return P.aE($async$d3,y)},
cw:function(a,b,c){var z=0,y=P.az(),x,w=this,v,u,t
var $async$cw=P.aw(function(d,e){if(d===1)return P.aC(e,y)
while(true)switch(z){case 0:v=a.du(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"z",0))
z=b.gO()===!0?3:5
break
case 3:z=6
return P.av(w.di(a,b,u),$async$cw)
case 6:z=4
break
case 5:t=S.nd(new H.ap(u,new O.kH(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.aw(c.a,w.fx.gf7().a)
w.fr=w.fx.gbH()
v=w.y
v.bO(new O.kI(a,b))
v.aj(new O.kJ(w,b))
case 1:return P.aD(x,y)}})
return P.aE($async$cw,y)},
di:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$di=P.aw(function(d,e){if(d===1)return P.aC(e,y)
while(true)switch(z){case 0:w=a.H(b,x.fr)
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
case 7:u=C.a.gv(J.h(a.gL()).split("."))
v=v.l0(w)
t=a.ac(b,x.fr)
s=a.gP()&&b.kb(a.gL())
r="use "+H.b(u)
x.fD()
z=8
return P.av(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$di)
case 8:q=e
s=new H.K(c,new O.kE(q),[H.m(c,0)])
x.fx=s.gc8(s)
if(q.gl8()===!0){p=A.e6(x.fx.gbH())
p.a1(b.gi(),new O.kF())
v=x.fx
t=v.gfI()
s=H.p([],[Y.af])
r=new Y.a_(s,0,P.aL())
C.a.aw(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bE(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aD(null,y)}})
return P.aE($async$di,y)}},
kK:{"^":"a:3;",
$3:function(a,b,c){return c.A(0,"UNUSED because this is the first choice",!0)}},
kL:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.x("Room isn't to be revisited"))}},
kN:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kM(),[H.m(z,0),null]).cj(0," <- ")}},
kM:{"^":"a:0;",
$1:function(a){return a.gaP()}},
kO:{"^":"a:0;a",
$1:function(a){return this.a.y.bO(a)}},
kS:{"^":"a:41;",
$1:function(a){if(a instanceof Q.A)return H.b(a.b.gh())+" "+a.gU()
return"ZZZZZZ "+a.gU()}},
kP:{"^":"a:0;",
$1:function(a){return a.gU()!==""}},
kQ:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bz(z.$1(a),z.$1(b))}},
kR:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.az(),x=this,w
var $async$$0=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.av(w.cw(x.c,x.b,w.fy),$async$$0)
case 2:return P.aD(null,y)}})
return P.aE($async$$0,y)}},
kH:{"^":"a:0;",
$1:function(a){return a.gkI()}},
kI:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kJ:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ap(z,new O.kG(),[H.m(z,0),null]).cj(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kG:{"^":"a:0;",
$1:function(a){return a.gaP()}},
kE:{"^":"a:0;a",
$1:function(a){return a.geI()===this.a.geI()}},
kF:{"^":"a:0;",
$1:function(a){var z=a.gbg()
if(typeof z!=="number")return z.as()
a.sbg(z-1)
return a}}}],["","",,Q,{"^":"",
ia:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ia(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gv(t):null
s=J.iV(t.b_(y.a,y),new Q.u0(z))
t=J.ah(s.a),r=new H.bO(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gI()
p=x.$1(q)
if(p.gK()&&!z.eF(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
ib:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ib(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dT((t.length!==0?C.a.gv(t):null).gbD()).gjR().a,t=new J.be(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
ic:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ic(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gv(t):null).gbj(),t=t.gZ(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
u0:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaR()}},
ad:{"^":"d;",
du:function(a,b,c){var z=this
return P.aQ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$du(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.gbH())
r=J.al(s)
v=r.bn(s,0)?2:3
break
case 2:q=A.e6(w)
v=4
return B.fz(q,x,z,z.iq(q,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aV(s,1)?5:6
break
case 5:q=A.e6(w)
p=z.ip(q,y,w,z.gM(),!0)
if(typeof s!=="number")H.w(s)
v=7
return B.fz(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aO()
case 1:return P.aP(t)}}})},
fc:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bA(0,new Q.iW(b))
y=new O.eN(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga3().c=x
x=b.gi()
y.ga3().r=x
y.ga3().f=C.R
y.ga3().cx=f
y.ga3().Q=e
x=this.gK()
y.ga3().z=x
x=this.ga2()
y.ga3().ch=x
if(!!this.$isA){x=y.ga3()
w=x.x
if(w==null){w=new L.aB(null,null,[P.t])
w.aX()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.E("null element"))
x.gep().q(0,w)}if(!!this.$isc4){x=this.b.gfY()
y.ga3().d=x}v=new Y.a_(H.p([],[Y.af]),0,P.aL())
x=a.f
u=(x.length!==0?C.a.gv(x):null).gi()
a.gB(a);(x.length!==0?C.a.gv(x):null).kD(a,v)
this.a=d.$3(z,a,v)
if(a.dl(u)!=null)a.fZ(u);++a.r
w=a.f_(u)
if(!(w==null))w.hh(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gv(x):null
if((w==null?w:w.dR(a))!=null){w=x.length!==0?C.a.gv(x):null
w=!J.e(w==null?w:w.dd(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gv(x):null)==null)break
t=C.a.gv(x)
t.dE(a)
C.a.a0(x,t)}x=x.length!==0?C.a.gv(x):null
if(!(x==null))x.hi(a,v)
if(this.a==null)H.i(new P.x("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga3().e=x
x=a.r
y.ga3().y=x
a.d.fN(y.p())
return v},
iq:function(a,b,c,d,e){return this.fc(a,b,c,d,!1,e)},
ip:function(a,b,c,d,e){return this.fc(a,b,c,d,e,!1)}},
iW:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
A:{"^":"ad;bX:b<",
gU:function(){var z=new Y.a_(H.p([],[Y.af]),0,P.aL())
z.fK(0,this.ga8(),this.b)
return z.cp()},
ac:function(a,b){var z=new Y.a_(H.p([],[Y.af]),0,P.aL())
z.jm(0,this.gag(),this.b,a,!0)
return z.cp()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga8()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
c4:{"^":"ad;",
gU:function(){return this.b.gU()},
k:function(a){return"ExitAction<"+this.b.gU()+">"}},
c7:{"^":"ad;",
gU:function(){var z=new Y.a_(H.p([],[Y.af]),0,P.aL())
z.fK(0,this.ga8(),this.b)
return z.cp()},
k:function(a){return"ItemAction<"+this.gU()+">"}},
nn:{"^":"d;a,b",
k:function(a){return this.b},
w:{"^":"wk<"}}}],["","",,O,{"^":"",cy:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},m1:{"^":"d;a,b",
k:function(a){return this.b}},py:{"^":"cy;a,es:b<,fX:c<,aP:d<,e,cZ:f<,f9:r<,T:x<,hE:y<,z,hF:Q<,hG:ch<",
a_:function(a){var z=new O.eN(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cy))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.e(this.f,b.f))if(J.e(this.r,b.r)){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eN:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
ges:function(){return this.ga3().c},
gfX:function(){return this.ga3().d},
gaP:function(){return this.ga3().e},
gcZ:function(){return this.ga3().r},
gf9:function(){var z,y
z=this.ga3()
y=z.x
if(y==null){y=new L.aB(null,null,[P.t])
y.aX()
y.m(C.d)
z.x=y
z=y}else z=y
return z},
gT:function(){return this.ga3().y},
ghE:function(){return this.ga3().z},
ghF:function(){return this.ga3().ch},
ghG:function(){return this.ga3().cx},
ga3:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.aB(null,null,[H.m(z,0)])
y.aX()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.aB(null,null,[H.m(z,0)])
y.aX()
y.m(z)
z=y}this.x=z
z=this.a
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
if(z==null){y=this.ga3()
x=y.b
if(x==null){x=new L.aB(null,null,[P.t])
x.aX()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga3().c
w=this.ga3().d
v=this.ga3().e
u=this.ga3().f
t=this.ga3().r
s=this.ga3()
r=s.x
if(r==null){r=new L.aB(null,null,[P.t])
r.aX()
r.m(C.d)
s.x=r
s=r}else s=r
s=s.p()
r=this.ga3().y
q=this.ga3().z
p=this.ga3().Q
o=this.ga3().ch
n=this.ga3().cx
z=new O.py(y,x,w,v,u,t,s,r,q,p,o,n)
if(y==null)H.i(P.l("accomplices"))
if(x==null)H.i(P.l("actionName"))
if(v==null)H.i(P.l("description"))
if(u==null)H.i(P.l("knownTo"))
if(t==null)H.i(P.l("protagonist"))
if(s==null)H.i(P.l("sufferers"))
if(r==null)H.i(P.l("time"))
if(q==null)H.i(P.l("wasAggressive"))
if(p==null)H.i(P.l("wasFailure"))
if(o==null)H.i(P.l("wasProactive"))
if(n==null)H.i(P.l("wasSuccess"))}this.m(z)
return z}}}],["","",,R,{"^":"",
id:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$id(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bQ(new H.K(u,new R.u3(z),[H.m(u,0)]))
case 3:return P.aO()
case 1:return P.aP(v)}}})},
b2:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eO(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.t0(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.p()},
u3:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh2()
y=this.a.gi()
return z==null?y==null:z===y}},
I:{"^":"mn;",
gfQ:function(){return!0},
gba:function(){var z=this.x
if(typeof z!=="number")return z.bn()
return z>0},
gbb:function(){return this.e instanceof K.c6},
gar:function(){return this.dy===C.i},
ga6:function(){return this.dy===C.f},
gaa:function(){return this.dy===C.k},
ka:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e,x=0;y.t();){if(C.a.a4(y.d.geX(),a))++x
if(x>=b)return!0}return!1},
h7:function(a){return this.ka(a,1)},
jV:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.t();){v=y.d
if(!(v instanceof L.aN))continue
z=v.gbI()
u=v.gbE()
t=v.gaF()?1:0
if(2+z+u+t>w){z=v.gbI()
u=v.gbE()
t=v.gaF()?1:0
w=2+z+u+t
x=v}}return x},
kb:function(a){var z=this.fx
if(typeof z!=="number")return z.bQ()
return z>=1},
eF:function(a,b){return this.h9(a,b)>0},
h9:function(a,b){var z,y
if(this.eH(b)){z=a.gaZ()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iN(a,b,10))return 1
z=a.gaZ()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eH:function(a){var z,y
z=a.c2("Confuse",this,!0)
if(z==null)return!1
y=a.kY("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.X(this.y)
y=z.gal()
if(typeof y!=="number")return H.w(y)
x=2*y
if(!z.gba())x-=10
y=z.e
if(!(y instanceof K.c6))x+=4
y=J.b1(y.gab(),2)
if(typeof y!=="number")return H.w(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.ac(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.b1(v.d.gab(),10)
if(typeof y!=="number")return H.w(y)
x+=y}y=a.a
for(v=y.gZ(y),u=new H.bO(v,new R.jr(this),[H.m(y,0)]),t=0;u.t();){s=v.gI()
r=s.gaR()?2:0
q=s.gal()
if(typeof q!=="number")return H.w(q)
p=J.b1(s.e.gab(),2)
if(typeof p!=="number")return H.w(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.ac(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.b1(q.d.gab(),10)
if(typeof r!=="number")return H.w(r)
t+=r}}return new A.cz(x,t,y.bu(0,0,new R.js(this,a)))},
iN:function(a,b,c){var z=b.kZ(a,this,!0)
if(z==null)return!1
return z<=c},
$isaK:1},
mn:{"^":"d+ds;"},
t0:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gD().z=this.a
a.gD().dx=this.b
a.gD().dy=this.d
a.gD().fx=this.e
z=this.f
if(z==null)z=$.$get$dd()
a.gD().f=z
a.gD().e=this.r
a.gD().b=[]
a.gD().fr=C.k
a.gD().y=this.x
a.gD().db=this.y
a.gD().x=this.ch
a.gD().fy=this.z
a.gD().Q=this.Q
a.gD().ch=!0
a.gD().cx=this.c
z=new L.aB(null,null,[U.a8])
z.aX()
z.m(C.d)
a.gD().cy=z
z=this.db
if(z!=null){y=new L.bn(null,null)
y.m(z)
z=y}else{z=$.$get$ew()
z.toString
y=new L.bn(null,null)
y.m(z)
z=y}a.gD().go=z
a.gD().d=this.cx
a.gD().r=this.cy
a.gD().c=this.dx
return a}},
jr:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gaZ(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
js:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaR()?1:0
y=b.gal()
if(typeof y!=="number")return H.w(y)
return J.an(a,(z+y)*this.a.h9(b,this.b))}},
dU:{"^":"d;a,b",
k:function(a){return this.b}},
pz:{"^":"I;a,fW:b<,bD:c<,ao:d<,Y:e<,h2:f<,f0:r<,al:x<,i:y<,z,ci:Q<,O:ch<,aC:cx<,he:cy<,h:db<,aF:dx<,af:dy<,a5:fr<,bg:fx<,aZ:fy<",
a_:function(a){var z=new R.eO(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisPlayer="+J.h(this.ch)+",\nitems="+J.h(this.cx)+",\nmaxHitpoints="+J.h(this.cy)+",\nname="+J.h(this.db)+",\nnameIsProperNoun="+J.h(this.dx)+",\npose="+J.h(this.dy)+",\npronoun="+J.h(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eO:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfW:function(){return this.gD().c},
gbD:function(){return this.gD().d},
sbD:function(a){this.gD().d=a
return a},
gao:function(){return this.gD().e},
sao:function(a){this.gD().e=a
return a},
gY:function(){return this.gD().f},
sY:function(a){this.gD().f=a
return a},
gh2:function(){return this.gD().r},
gf0:function(){return this.gD().x},
gal:function(){return this.gD().y},
sal:function(a){this.gD().y=a
return a},
gi:function(){return this.gD().z},
gci:function(){return this.gD().ch},
gO:function(){return this.gD().cx},
gaC:function(){var z,y
z=this.gD()
y=z.cy
if(y==null){y=new L.aB(null,null,[U.a8])
y.aX()
y.m(C.d)
z.cy=y
z=y}else z=y
return z},
ghe:function(){return this.gD().db},
gh:function(){return this.gD().dx},
sh:function(a){this.gD().dx=a
return a},
gaF:function(){return this.gD().dy},
gaf:function(){return this.gD().fr},
saf:function(a){this.gD().fr=a
return a},
ga5:function(){return this.gD().fx},
gbg:function(){return this.gD().fy},
sbg:function(a){this.gD().fy=a
return a},
gaZ:function(){var z,y
z=this.gD()
y=z.go
if(y==null){y=new L.bn(null,null)
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
z=z.cx
if(!(z==null)){y=new L.aB(null,null,[H.m(z,0)])
y.aX()
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
if(!(z==null)){y=new L.bn(null,null)
y.m(z)
z=y}this.go=z
this.a=null}return this},
m:function(a){this.a=a},
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
m=this.gD()
l=m.cy
if(l==null){l=new L.aB(null,null,[U.a8])
l.aX()
l.m(C.d)
m.cy=l
m=l}else m=l
m=m.p()
l=this.gD().db
k=this.gD().dx
j=this.gD().dy
i=this.gD().fr
h=this.gD().fx
g=this.gD().fy
f=this.gD()
e=f.go
if(e==null){e=new L.bn(null,null)
f.go=e
f=e}else f=e
z=new R.pz(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",cz:{"^":"d;c7:a<,d1:b<,bX:c<",
as:function(a,b){return new A.ao(this.a-b.gc7(),this.b-b.gd1(),J.by(this.c,b.gbX()))},
k:function(a){return"ActorScore<self="+C.j.bf(this.a,2)+",team="+C.j.bf(this.b,2)+",enemy="+J.c_(this.c,2)+">"}},ao:{"^":"d;c7:a<,d1:b<,bX:c<",
gkr:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c6:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ao(this.a*b,this.b*b,J.bZ(this.c,b))},
ah:function(a,b){return new A.ao(this.a+b.gc7(),this.b+b.gd1(),J.an(this.c,b.gbX()))},
d6:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ao(this.a/b,this.b/b,J.b1(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bf(this.a,2)+",team="+C.j.bf(this.b,2)+",enemy="+J.c_(this.c,2)+">"},
w:{
jq:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.w(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.ao(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
vQ:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.q:return"spear"
case C.A:return"sword"}throw H.c(P.E(a))},
a8:{"^":"mo;eX:a<",
gaP:function(){return U.vQ(C.a.geD(this.a))},
gi:function(){return H.aA(this)},
gci:function(){return!0},
gba:function(){return!1},
gO:function(){return!1},
gaF:function(){return!1},
ga5:function(){return C.l},
gaZ:function(){return $.$get$aV()},
$isaK:1},
mo:{"^":"d+ds;"},
cO:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c6:{"^":"aN;h:b<,a"}}],["","",,E,{"^":"",bl:{"^":"a8;h:b<,a",
gab:function(){return 1},
$isaK:1}}],["","",,Z,{"^":"",d_:{"^":"aN;h:b<,bI:c<,bE:d<,aF:e<,ce:f<,ey:r<,a"}}],["","",,G,{"^":"",b8:{"^":"aN;h:b<,bI:c<,bE:d<,aF:e<,ce:f<,ey:r<,a"}}],["","",,L,{"^":"",aN:{"^":"a8;",
gey:function(){return!1},
gce:function(){return!1},
gko:function(){return!1},
gbl:function(){return this.gbI()>0},
geJ:function(){return this.gbE()>0},
gl:function(a){return 2},
gbI:function(){return 0},
gbE:function(){return 0},
gab:function(){var z,y,x
z=this.gbI()
y=this.gbE()
x=this.gaF()?1:0
return 2+z+y+x},
$isaK:1}}],["","",,G,{"^":"",md:{"^":"d;",
fD:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
lk:[function(a){this.f.C+=a},"$1","gjN",2,0,22],
bx:function(){var z=0,y=P.az(),x,w=this,v,u
var $async$bx=P.aw(function(a,b){if(a===1)return P.aC(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.x("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.C.length===0)){z=4
break}z=5
return P.av(w.d3(),$async$bx)
case 5:z=3
break
case 4:w.fD()
case 1:return P.aD(x,y)}})
return P.aE($async$bx,y)}}}],["","",,B,{"^":"",eZ:{"^":"d;da:a<,dz:b<,cW:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c_(this.b,3)+", score="+this.a.k(0)+">"}},bE:{"^":"d;bH:a<,fI:b<,f7:c<,kI:d<,dz:e<,f,r,eI:x<,cW:y<",
gB:function(a){return X.bw(H.p([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbE&&this.gB(this)===z.gB(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gB(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
w:{
fz:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bZ(e,b.gdz())
z=z?0:b.gcW()+1
d.b=a.r
return new B.bE(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iX:{"^":"d;a,b,c,d,e,f",
jz:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.aj("...")
z.aj("combining scores")
y=H.p([],[A.ao])
x=new G.jj()
for(w=J.ah(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gI()
z.aj(new G.jh(r))
if(J.a6(r.gdz(),0.15))if(s==null){z.aj("    - first _bestCase")
s=r}else if(J.a6(x.$1(r.gda()),x.$1(s.gda()))){z.aj("    - new _bestCase")
s=r}q=r.gda()
p=J.by(q.c,t)
o=r.b
if(typeof o!=="number")return H.w(o)
n=new A.ao((q.a-v)*o,(q.b-u)*o,J.bZ(p,o))
z.aj(new G.ji(n))
y.push(n)}m=A.jq(y)
w=s==null
if(w)l=C.F
else{q=s.gda()
l=new A.ao(q.a-v,q.b-u,J.by(q.c,t))}w=w?s:s.gcW()
if(w==null)w=1
if(typeof w!=="number")return H.w(w)
v=l.a/w
u=l.b/w
w=J.b1(l.c,w)
t=m.a
q=m.b
p=m.c
z.aj("- uplifts average = "+("ActorScoreChange<self="+C.j.bf(t,2)+",team="+C.j.bf(q,2)+",enemy="+J.c_(p,2)+">"))
z.aj("- best = "+("ActorScoreChange<self="+C.u.bf(v,2)+",team="+C.u.bf(u,2)+",enemy="+J.c_(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.aj("- result = "+("ActorScoreChange<self="+C.u.bf(t,2)+",team="+C.u.bf(q,2)+",enemy="+C.j.bf(p,2)+">"))
return new A.ao(t,q,p)},
eZ:function(){var z=this
return P.aQ(function(){var y=0,x=1,w,v,u,t,s
return function $async$eZ(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gck(),u=u.gZ(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gI()
y=4
return""+t+") "+s.gU()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aO()
case 1:return P.aP(w)}}})},
dF:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dF=P.aw(function(d,e){if(d===1)return P.aC(e,y)
while(true)switch(z){case 0:w=x.f
w.b9(0)
v=x.c
u=v.a
t=u.a.bA(0,new G.jk(x))
s=t.dc(u)
r=x.a
r.bO("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.b9(x.ea(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gI()
r.bk(new G.jl(t,o))
if(o.G(t,u)!==!0){r.bk(new G.jm(o))
z=2
break}z=4
return P.av(x.cC(v,o,b,a,c).ct(0),$async$dF)
case 4:n=e
if(J.eK(n)===!0){r.bk(new G.jn(o))
w.n(0,o,C.G)
z=2
break}r.bk(new G.jo(s,o,n))
m=x.jz(n,s,b)
w.n(0,o,m)
r.bk(new G.jp(o,m))
z=2
break
case 3:x.e=!0
return P.aD(null,y)}})
return P.aE($async$dF,y)},
kH:function(){return this.dF(50,10,null)},
ea:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ea(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bQ((u.length!==0?C.a.gv(u):null).gbN())
case 2:u=(u.length!==0?C.a.gv(u):null).gaB()
t=u.length
s={func:1,ret:Q.c7,args:[U.a8]}
r={func:1,ret:Q.c4,args:[Q.u]}
q={func:1,ret:Q.A,args:[R.I]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ax(o,q)?6:8
break
case 6:x=9
return P.bQ(Q.ia(z,y,o))
case 9:x=7
break
case 8:x=H.ax(o,r)?10:12
break
case 10:x=13
return P.bQ(Q.ib(z,y,o))
case 13:x=11
break
case 12:x=H.ax(o,s)?14:16
break
case 14:x=17
return P.bQ(Q.ic(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.x(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aO()
case 1:return P.aP(v)}}})},
cC:function(a5,a6,a7,a8,a9){var $async$cC=P.aw(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bA(0,new G.j0(t))
p=t.a
p.bk("=====")
p.bk(new G.j1(a6,q))
p.bk(new G.j2(a6))
if(a6.G(q,r)!==!0){p.bk("- firstAction not applicable")
z=1
break}o=q.dc(r)
p.bk(new G.j8(a5,o))
p.bk(new G.j9(a5))
n=P.b7(null,B.bE)
m=P.a2(null,null,null,A.ab)
l=J.o(r)
k=l.gB(r)
for(j=new P.b9(a6.du(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gI()
if(l.gB(r)!==k)throw H.c(new P.x("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.az(h)}s.a=0
r=t.b
case 3:if(!!n.gV(n)){z=4
break}++s.a
g=n.dH()
p.aj("----")
p.aj(new G.ja(g))
p.aj(new G.jb(g))
if(g.gcW()>a7||s.a>a8){p.aj(new G.jc(s,a7,g))
p.aj(new G.jd(g))
z=4
break}z=g.gbH().f.length===0?5:6
break
case 5:p.aj("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aQ(0,new G.je(t),new G.jf())
if(q==null){p.aj("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eZ(q.dc(l),g.e,g.y)
p.aj(new G.j3(f))
z=7
x=[1]
return P.d7(P.hC(f),$async$cC,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gv(j):null).dR(l)
j=l.a
i=new H.K(j,new G.j4(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.x("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.ha("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bA(0,new G.j5(t))
c=J.e(e,q)
p.aj("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.aj("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.dc(l)
if(b==null)b=C.H
f=new B.eZ(b,g.e,g.y)
p.aj(new G.j6(o,f))
p.aj(new G.j7(g))
z=8
x=[1]
return P.d7(P.hC(f),$async$cC,y)
case 8:p.aj("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b9(t.ea(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gI()
if(a2.G(e,l)!==!0)continue
for(a1=new P.b9(a2.du(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gI();++t.d
if(J.bY(a4.gdz(),0.05))continue
if(m.a4(0,a4.gbH()))continue
n.az(a4)}}p.aj("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d7(null,0,y)
case 2:return P.d7(v,1,y)}})
var z=0,y=P.q0($async$cC),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rm(y)},
i6:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gv(z).gaP())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjD())+". Action Records: "+z.aE(0,new G.jg()).cj(0,"<-")))}},
w:{
iY:function(a,b){var z,y,x
z=N.bh("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a_(H.p([],[Y.af]),0,P.aL())
x.b=b.r
z=new G.iX(z,y,new B.bE(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i6(a,b)
return z}}},jg:{"^":"a:0;",
$1:function(a){return a.gaP()}},jj:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.w(z)
return a.b-z}},jh:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},ji:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jk:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jl:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gU()+"' for "+H.b(this.a.db)}},jm:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gU()+"' isn't applicable"}},jn:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gU()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jo:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gU()+"' leads to "+H.b(J.aI(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jp:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gU()+"' was scored "+this.b.k(0)}},j0:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j1:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gU()+"' of "+H.b(this.b.gh())}},j2:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},j8:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j9:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c6(" ",z.y)+"- "+J.h(z.b)}},ja:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfI().gU()+"'"}},jb:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().f
return"- situation: "+H.b(J.iO(z.length!==0?C.a.gv(z):null))}},jc:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcW()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jd:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.ap(z,new G.j_(),[H.m(z,0),null]).cj(0," <- ")}},j_:{"^":"a:0;",
$1:function(a){return a.gaP()}},je:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jf:{"^":"a:2;",
$0:function(){return}},j3:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},j4:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j5:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j6:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},j7:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.ap(z,new G.iZ(),[H.m(z,0),null]).cj(0," <- ")}},iZ:{"^":"a:0;",
$1:function(a){return a.gaP()}}}],["","",,Z,{"^":"",mL:{"^":"d;a,b",
gbN:function(){return this.b},
gV:function(a){return this.b.length===0},
hl:function(a,b){var z=this
return P.aQ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hl(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bQ(t)
case 5:w=1
break
case 4:s=z.iH(new Z.mO())
r=z.e9(new Z.mP(),[s])
q=z.e9(new Z.mQ(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bF().bO("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bF().bO("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bF().bO("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.c9(t,new Z.mR(z,x))
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
kG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc8(y)
C.a.c9(y,new Z.mS(this,a))
x=this.a.a
w=x.gcu().bu(0,1/0,new Z.mT(a))
v=x.gcu().bu(0,-1/0,new Z.mU(a))
x=J.al(v)
u=J.al(w)
t=u.as(w,J.bZ(x.as(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.by(t,1)
z.a=t
u=t}else u=t
s=x.as(v,u)
r=P.mb(y.length,new Z.mV(z,this,a,s),!1,P.L)
q=new H.ap(r,new Z.mW(C.a.bu(r,0,Z.us())),[H.m(r,0),null]).bF(0,!1)
z=C.a.bu(q,0,Z.ut())
if(typeof z!=="number")return H.w(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.an(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.ne(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
e9:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a4(b,t))continue
if(w==null||J.a6(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iH:function(a){return this.e9(a,C.d)},
w:{
mM:function(a){var z,y,x
z=a.gck()
y=H.y(z,"z",0)
x=P.P(new H.K(z,new Z.mN(a),[y]),!1,y)
if(x.length===0)$.$get$bF().eY("After removing actions scored by undefined, there are no recommendations.")
return x},
wh:[function(a,b){return J.an(a,b)},"$2","us",4,0,42],
wi:[function(a,b){return J.an(a,b)},"$2","ut",4,0,43]}},mO:{"^":"a:0;",
$1:function(a){return a.gc7()}},mP:{"^":"a:0;",
$1:function(a){return J.iK(a.gbX())}},mQ:{"^":"a:0;",
$1:function(a){return a.gd1()}},mR:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bz(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mS:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bz(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mT:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.da(a),H.da(z))}},mU:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.da(a),H.da(z))}},mV:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b1(J.by(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mW:{"^":"a:0;a",
$1:function(a){return J.iR(J.bZ(J.b1(a,this.a),1000))}},mN:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkr()}}}],["","",,K,{"^":"",rw:{"^":"a:3;",
$3:function(a,b,c){}},ci:{"^":"d;a,h:b<,c,d,jT:e<,f,c5:r<",
gjR:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.ci&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jI:function(a,b,c){return this.c.$3(a,b,c)},
hZ:function(a,b,c){return this.d.$3(a,b,c)},
jU:function(a,b,c){return this.e.$3(a,b,c)},
w:{
Z:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.u])
z.ai()
z.m(f)
return new K.ci(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",u:{"^":"d;fY:a<,U:b<,aP:c<,kl:d<"}}],["","",,S,{"^":"",aa:{"^":"d;",
gaB:function(){return C.d},
gbN:function(){return C.d},
gdC:function(){return 3},
dR:function(a){return this.aU(this.gT(),a)},
hh:function(a,b){},
hi:function(a,b){},
kD:function(a,b){},
dE:function(a){},
dd:function(a){return!0}}}],["","",,S,{"^":"",
fI:function(a){var z=$.$get$bH().am(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nd:function(a,b){var z,y,x,w,v
z=$.$get$bH().kC()*b
for(y=new H.dH(a,a.gl(a),0,null,[H.y(a,"aY",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.w(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
ne:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bH().am(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.w(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
bI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.J(a)
y=z.aY(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.as()
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
if(p>1){o=$.$get$bH().am(p)
z=z.aH(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bI(C.b.aH(a,n+1,w[m])))
if(typeof v!=="number")return v.ah()
n=a.length
m+=C.b.aH(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bI(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.as()
if(t===x-1)return a
else{if(typeof t!=="number")return t.ah()
x=t+1
return z.aH(a,0,x)+H.b(S.bI(C.b.bJ(a,x)))}}}else return a},
a9:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bH().am(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",af:{"^":"d;b1:a<,aW:b<,aS:c<,hk:d<,e,dv:f@,hn:r<,hf:x<,f8:y<,jQ:z<,i1:Q<,d5:ch<,jg:cx<,kq:cy<,T:db<",
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
z="Report<"+C.b.aH(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a_:{"^":"d;a,T:b<,c",
geE:function(){return C.a.br(this.a,new Y.ov())},
aO:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bd(b).eB(b,".")||C.b.eB(b,"!")||C.b.eB(b,"?"))&&C.b.df(b,P.bk("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.af(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
A:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
ji:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aO(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fK:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aO(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
eu:function(a,b,c,d,e){return this.aO(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
cd:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
cd:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fL:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fM:function(a,b,c,d,e,f){return this.aO(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jn:function(a,b,c,d,e,f){return this.aO(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jk:function(a,b,c){return this.aO(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jl:function(a,b,c,d){return this.aO(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jm:function(a,b,c,d,e){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
js:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.ot().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gv(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bU(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gv(b))){z+="."
this.jo(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jr:function(a,b,c,d){return this.js(a,b,c,"and",3,null,null,d)},
fO:function(){return this.A(0,"\n\n",!0)},
bU:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.J(a)
z=z.aY(a,"<owner's> "+H.b(b))!==-1||z.aY(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aY(a,"<object-owner's> "+H.b(b))!==-1||z.aY(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.J(a)
if(z.aY(a,"<subject's> "+H.b(b))!==-1||z.aY(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaF()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d_(a,b,"the "+H.b(b))
else{w=J.eM(c.gh(),P.bk("[aeiouy]",!1,!1))?z.d_(a,b,"an "+H.b(b)):z.d_(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eC:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaW()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaW()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaW().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaS().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaW().gi())}else z=!1
return z},
dQ:function(a){var z=this
return P.aQ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dQ(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aT(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaW()!=null?3:4
break
case 3:x=5
return t.gaW()
case 5:case 4:x=t.gaS()!=null?6:7
break
case 6:x=8
return t.gaS()
case 8:case 7:x=t.ghk()!=null?9:10
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
cV:[function(a){var z=J.al(a)
if(z.aV(a,0)||z.bQ(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaS()}},"$1","gaS",2,0,23],
kE:function(a,b){var z
if(!this.aT(a)||!this.aT(b))return!1
if(this.eC(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf8()}return!1},
hj:function(a){var z
for(z=!1;this.geE();z=!0){a.$1(this.ho(!0))
this.kM()}return z},
ho:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bu(z,[],new Y.ow())
C.a.j1(z,new Y.ox(y),!1)
x=a&&this.geE()?C.a.aY(z,C.a.cg(z,new Y.oy()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eC(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdv())n=this.kE(s,p)&&this.i0(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdv()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdv(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi1()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjQ()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd5())if(this.dr(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdv()}else n=!1
n=n||this.l_(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd5()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd5()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fI([" but "," but ",", but "])
u=!this.hN(s,s+1)&&!0}else{r+=S.fI([" and "," and ",", and "])
u=!0}}m=this.dZ(s)
l=S.bI(m)
p=J.J(l)
if(p.a4(l,"{")===!0||p.a4(l,"}")===!0)$.$get$il().dV('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dr(s,k)&&J.eM(this.dZ(k),"<subject> ")&&p.df(l,"<subject> ")}else k=!1
if(k)l=p.d_(l,"<subject> ","")
j=J.dk(l,"<action>",this.dZ(s))
p=s-1
k=this.j4(s,p)
if(k)k=!(this.cV(s).ga5()===C.l&&this.bq(s).ga5()===C.l)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dr(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cV(p)!=null)if(this.bq(s)!=null)if(this.bq(p)!=null){k=this.cV(p)
k=k==null?k:k.gi()
i=this.bq(s)
if(J.e(k,i==null?i:i.gi())){k=this.bq(p)
k=k==null?k:k.ga5()
i=this.bq(s)
k=!J.e(k,i==null?i:i.ga5())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bq(p)!=null)if(this.cV(s)!=null){k=this.bq(p)
k=k==null?k:k.gi()
i=this.cV(s)
if(J.e(k,i==null?i:i.gi())){p=this.bq(p)
p=p==null?p:p.ga5()
k=this.bq(s)
p=!J.e(p,k==null?k:k.ga5())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gaW()
g=p.gaS()
f=p.ghk()
e=p.e
k=h!=null
if(k){if(h.gO()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga5()===C.D||h.ga5()===C.a5){d=H.n(d,"<s>","")
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
i=h.ga5().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cx(this.bU(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga5().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a4(j,P.bk("<subject>.+<subject's>",!0,!1))){c=h.ga5().c
d=H.n(d,"<subject's>",c)}d=J.cx(this.bU(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga5().c
d=H.n(d,"<subject's>",i)
i=h.ga5().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga5().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaF()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gO()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dk(this.bU(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga5().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a4(j,P.bk("<object>.+<object's>",!0,!1))){i=g.ga5().c
d=H.n(d,"<object's>",i)}d=J.cx(this.bU(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga5().c
d=H.n(d,"<object's>",i)
i=g.ga5().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga5().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga5().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga5().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fE(e,this.fE(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.ou(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd5())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd5()?r+".":r
return H.vJ(z.charCodeAt(0)==0?z:z,$.$get$h2(),new Y.oz(),null)},
cp:function(){return this.ho(!1)},
kM:function(){var z,y
if(!this.geE()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.aY(z,C.a.cg(z,new Y.oA()))+1
P.cg(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hN:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
if(this.eC(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf8()}if(!this.dr(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghn()){if(b>=z.length)return H.f(z,b)
y=z[b].ghn()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].ghf()){if(b>=z.length)return H.f(z,b)
z=z[b].ghf()}else z=!1
if(z)return!0
else return!1},
i0:function(a,b){var z,y,x,w,v
if(!this.aT(a)||!this.aT(b))return!1
for(z=new P.b9(this.dQ(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gI()
for(y=new P.b9(this.dQ(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gI()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
dZ:[function(a){var z=J.al(a)
if(z.aV(a,0)||z.bQ(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb1()}},"$1","gb1",2,0,12],
bq:[function(a){var z=J.al(a)
if(z.aV(a,0)||z.bQ(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaW()}},"$1","gaW",2,0,23],
l_:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gT()!=null){y=a-1
if(this.aT(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gT()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gT()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gT()
if(typeof y!=="number")return y.as()
if(typeof x!=="number")return H.w(x)
return y-x}},
k:function(a){return this.cp()},
aT:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fE:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gO()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dk(this.bU(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga5().a)
z=H.n(H.n(J.cx(this.bU(C.b.a4(c,P.bk(d+".+"+e,!0,!1))?H.n(z,e,a.ga5().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga5().c),g,a.ga5().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j4:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaS().gi())},
dr:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaW()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaW()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaW().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaW().gi())},
w:{
ou:function(a){var z,y,x
z=!C.b.a4(a,"\n\n")?C.b.l4(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bJ(z,1)}}},ov:{"^":"a:0;",
$1:function(a){return J.e(a.gb1(),"\n\n")}},ot:{"^":"a:24;",
$1:function(a){return C.b.eW(H.n(H.n(a,"<also> ",""),"  "," "))}},ow:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.J(a)
y=z.gaq(a)?z.gv(a):null
if(y!=null&&y.gkq()&&J.e(b.gjg(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.as()
z.n(a,x-1,b)}else z.q(a,b)
return a}},ox:{"^":"a:31;a",
$1:function(a){return J.eI(this.a,a)}},oy:{"^":"a:0;",
$1:function(a){return J.e(a.gb1(),"\n\n")}},oz:{"^":"a:30;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oA:{"^":"a:0;",
$1:function(a){return J.e(a.gb1(),"\n\n")}},aK:{"^":"mp;aF:a<,h:b<,c,aZ:d<,O:e<,a5:f<",
gi:function(){return H.aA(this)},
gci:function(){return!0},
gba:function(){return!0},
w:{
c3:function(a,b,c,d,e){var z=H.p([],[P.r])
return new Y.aK(c,b,z,e==null?$.$get$aV():e,!1,d)}}},mp:{"^":"d+ds;"},ds:{"^":"d;",
gaR:function(){return this.gba()&&this.gci()===!0},
a7:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iL(a,b,c,d,e,f,g,h,i,j,k,H.H(this,"$isaK"),!1,m)},
ad:function(a,b){return this.a7(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
an:function(a,b,c){return this.a7(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dI:function(a,b,c){return this.a7(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
ae:function(a,b,c){return this.a7(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
hu:function(a,b,c,d){return this.a7(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
dJ:function(a,b,c,d,e,f){return this.a7(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dJ:function(a,b,c,d,e,f){return this.a7(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
ay:function(a,b,c){return this.a7(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
cq:function(a,b,c,d){return this.a7(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d,e){return this.a7(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eQ:function(a,b,c,d){return this.a7(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bm:function(a,b,c){return this.a7(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
cr:function(a,b,c,d,e){return this.a7(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eP:function(a,b,c,d){return this.a7(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
c_:function(a,b,c,d){return this.a7(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bw:function(a,b,c,d){return this.a7(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
cq:function(a,b,c,d){return this.a7(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
hs:function(a,b,c,d){return this.a7(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
eR:function(a,b,c,d,e){return this.a7(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
eQ:function(a,b,c,d){return this.a7(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
hr:function(a,b,c,d){return this.a7(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kU:function(a,b,c,d,e,f){return this.a7(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c0:function(a,b,c,d,e){return this.a7(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hq:function(a,b,c){return this.a7(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kQ:function(a,b,c,d){return this.a7(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
ht:function(a,b,c,d){return this.a7(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kT:function(a,b,c,d,e){return this.a7(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kV:function(a,b,c,d,e,f){return this.a7(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eP:function(a,b,c,d){return this.a7(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kR:function(a,b,c,d){return this.a7(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},ce:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",t2:{"^":"a:0;",
$1:function(a){a.gcK().b=2
return 2}},t8:{"^":"a:0;",
$1:function(a){a.gcK().b=0
return 0}},t1:{"^":"a:0;",
$1:function(a){a.gcK().b=1
return 1}},hd:{"^":"d;",
hb:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},pR:{"^":"hd;i:a<",
a_:function(a){var z=new L.bn(null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hd))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.U(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
w:{
e8:function(a){var z=new L.bn(null,null)
a.$1(z)
return z.p()}}},bn:{"^":"d;a,b",
gi:function(){return this.gcK().b},
gcK:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcK().b
z=new L.pR(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
hW:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hW(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.be(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.be(u,u.length,0,null,[H.m(u,0)])
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
case 1:return P.aP(v)}}})}}],["","",,A,{"^":"",ab:{"^":"d;fJ:a<,aC:b<,c,d,e,f,T:r<,x",
gjD:function(){var z=this.f
return z.length!==0?C.a.gv(z):null},
gB:function(a){var z,y,x,w,v
z=X.bw(this.a)
y=X.bw(this.d)
x=X.bw(this.f)
w=this.r
v=this.c
v=X.d9(X.b0(X.b0(0,C.e.gB(w)),J.j(v)))
return X.d9(X.b0(X.b0(X.b0(X.b0(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isab&&this.gB(this)===z.gB(b)},
jf:function(a){var z,y
z=this.hL(a,!0)
y=z.gZ(z)
if(y.t()){y.gI()
return!0}return!1},
aN:function(a){var z,y
z=this.hK(a)
y=z.gZ(z)
if(y.t()){y.gI()
return!0}return!1},
fZ:function(a){var z,y,x
z=this.dl(a)
if(z==null)throw H.c(new P.x("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].av()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
av:function(){++this.r},
d7:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dg(0,new A.po(a))
if(b!=null)z=z.c4(0,new A.pp(b))
if(c!=null)z=z.c4(0,new A.pq(c))
if(e!=null)z=z.c4(0,new A.pr(e))
return d!=null?z.c4(0,new A.ps(d)):z},
hK:function(a){return this.d7(a,null,null,null,null)},
hL:function(a,b){return this.d7(a,null,null,null,b)},
hM:function(a,b,c){return this.d7(a,b,null,null,c)},
X:function(a){return this.a.bA(0,new A.pt(a))},
dT:function(a){return this.e.bA(0,new A.pu(a))},
f_:function(a){var z,y
z=this.dl(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
at:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
k9:function(a){var z=this.a.aQ(0,new A.pv(a),new A.pw())
if(z==null)return!1
return z.gba()},
aG:function(){var z,y
z=this.f
y=C.a.gv(z)
y.dE(this)
C.a.a0(z,y)},
bd:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gv(z).gh(),a)))break
y=C.a.gv(z)
y.dE(this)
C.a.a0(z,y)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
bZ:function(a,b){var z,y
z=this.dl(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dL:function(a,b,c,d,e){var z,y,x,w
z=this.d7(a,b,c,d,e)
y=z.gZ(z)
if(y.t()){x=y.gI()
y=this.r
w=x.gT()
if(typeof w!=="number")return H.w(w)
return y-w}return},
kZ:function(a,b,c){return this.dL(null,a,b,c,null)},
c2:function(a,b,c){return this.dL(a,null,b,null,c)},
kY:function(a,b,c){return this.dL(a,b,null,null,c)},
dK:function(a){return this.dL(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.eg()
y.aw(0,z)
return"World<"+P.c9(y,"{","}")+">"},
a1:function(a,b){var z,y,x
z=this.X(a)
y=z.a_(b)
x=this.a
x.a0(0,z)
x.q(0,y)},
dl:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
ih:function(a){this.a.aw(0,a.a)
this.d.aw(0,a.d)
this.b.aw(0,a.b)
this.e.aw(0,a.e)
C.a.aw(this.f,a.f)
this.r=a.r},
w:{
e6:function(a){var z,y,x,w
z=P.a2(null,null,null,R.I)
y=P.b7(null,O.cy)
x=P.a2(null,null,null,U.a8)
w=P.a2(null,null,null,null)
w=new A.ab(z,x,a.c,y,w,[],null,null)
w.ih(a)
return w}}},po:{"^":"a:0;a",
$1:function(a){return a.ges()===this.a}},pp:{"^":"a:0;a",
$1:function(a){return J.e(a.gcZ(),this.a.gi())}},pq:{"^":"a:0;a",
$1:function(a){return a.gf9().a4(0,this.a.gi())}},pr:{"^":"a:0;a",
$1:function(a){return a.ghG()===this.a}},ps:{"^":"a:0;a",
$1:function(a){return a.ghE()===this.a}},pt:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pu:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pv:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pw:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",Y:{"^":"ad;a2:b<"},fR:{"^":"Y;c,U:d<,J:e<,h:f<,b,a",
R:[function(a,b,c){throw H.c(new P.x("SimpleAction always succeeds"))},"$3","gM",6,0,1],
S:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gN",6,0,1],
ac:function(a,b){throw H.c(new P.x("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
gK:function(){return!1},
G:function(a,b){return!0},
gL:function(){return H.i(new P.x("Not rerollable"))},
gP:function(){return!1}}}],["","",,N,{"^":"",jX:{"^":"A;K:c<,a2:d<,J:e<,P:f<,L:r<,b,a",
ga8:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gag:function(){return"will <subject> confuse <object>?"},
R:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ae(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eP(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bw(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ay(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){return 0.6},
G:function(a,b){var z
if(a.gO()===!0)if(a.gaa()){z=b.a
z=new H.K(z,new N.jY(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.eH(b)}else z=!1
else z=!1
return z},
w:{
vV:[function(a){return new N.jX(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","ts",2,0,4]}},jY:{"^":"a:0;a",
$1:function(a){return a.gba()&&a.gaZ().hb(this.a.b.gaZ())}}}],["","",,V,{"^":"",kk:{"^":"A;P:c<,L:d<,K:e<,a2:f<,J:r<,b,a",
ga8:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gag:function(){return"will <subject> kick the weapon off?"},
R:[function(a,b,c){S.a9(new V.kl(this,a,c),new V.km(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y
S.a9(new V.kn(this,a,c),new V.ko(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gv(z):null
b.bZ(y.gi(),y.a_(new V.kp(this)))
z=this.b
b.a1(z.gi(),new V.kq())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gN",6,0,1],
H:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z
if(a.gaa()||a.dy===C.i){z=this.b
z=z.ga6()&&!z.gbb()}else z=!1
return z},
w:{
vY:[function(a){return new V.kk(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tJ",2,0,4]}},kl:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.an(y,"<subject> mi<sses>",!0)}},km:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> weapon",y)
y.an(z,"<subject> hold<s> onto it",!0)}},kn:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.kV(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gY(),z,!0)}},ko:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bw(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.cd(0,"<owner's> <subject> fl<ies> away",y,y.gY())}},kp:{"^":"a:14;a",
$1:function(a){a.gbj().q(0,this.a.b.gY())
return a}},kq:{"^":"a:0;",
$1:function(a){a.sY($.$get$dd())
return a}}}],["","",,R,{"^":"",lW:{"^":"A;P:c<,L:d<,K:e<,a2:f<,J:r<,b,a",
gh:function(){return"KickToGround"},
ga8:function(){return"kick <object> to the ground"},
gag:function(){return"will <subject> kick <object> prone?"},
R:[function(a,b,c){S.a9(new R.lX(this,a,c),new R.lY(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gM",6,0,1],
S:[function(a,b,c){var z
S.a9(new R.lZ(this,a,c),new R.m_(this,a,c,U.bv(b)),null,null)
z=this.b
b.a1(z.gi(),new R.m0())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gN",6,0,1],
H:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){return(a.gaa()||a.dy===C.i)&&!this.b.ga6()},
w:{
wb:[function(a){return new R.lW(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uj",2,0,4]}},lX:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.an(y,"<subject> mi<sses>",!0)}},lY:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> shin",y)
y.an(z,"<subject> <does>n't budge",!0)}},lZ:{"^":"a:2;a,b,c",
$0:function(){this.b.kT(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},m_:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bw(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ad(z,"<subject> {grunt|shriek}<s>")
y.ay(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},m0:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}}}],["","",,F,{"^":"",mK:{"^":"ad;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gU:function(){return"Stand off."},
gh:function(){return"Pass"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){if(a.gO()===!0)a.ad(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",mY:{"^":"A;P:c<,L:d<,K:e<,a2:f<,J:r<,b,a",
ga8:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gag:function(){return"will <subject> force <object> off balance?"},
R:[function(a,b,c){var z=this.b
a.ht(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gY(),z)
z.bm(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
a.ht(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gY(),z)
if(z.gaa()){z.hs(c,"<subject> lose<s> <object>",!0,$.$get$eo())
b.a1(z.y,new Y.mZ())
C.a.q(b.f,U.mq(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gar()){z.ad(c,"<subject> <is> already off balance")
c.fL(0,"<subject> make<s> <object> fall to the "+H.b(U.bv(b)),z,$.$get$iq())
b.a1(z.y,new Y.n_())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.x("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,1],
H:function(a,b){var z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z,y
if(!a.ga6()){z=a.e
if(z.gbl()||z.gko()){z=this.b
if(!z.gY().gce()){z.gY().gey()
y=!1}else y=!0
z=y&&!z.ga6()}else z=!1}else z=!1
return z},
w:{
wj:[function(a){return new Y.mY(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uu",2,0,4]}},mZ:{"^":"a:0;",
$1:function(a){a.saf(C.i)
return a}},n_:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}}}],["","",,B,{"^":"",nl:{"^":"ad;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gU:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){if(a.gO()===!0)a.bw(c,"<subject> regain<s> <object>",$.$get$eo(),!0)
b.a1(a.gi(),new B.nm())
return H.b(a.gh())+" regains balance"},"$3","gN",6,0,1],
ac:function(a,b){return"Will "+a.ga5().a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.gar()}},nm:{"^":"a:0;",
$1:function(a){a.saf(C.k)
return C.k}}}],["","",,O,{"^":"",nB:{"^":"ad;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gU:function(){return"Scramble."},
gh:function(){return"Scramble"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gN",6,0,1],
ac:function(a,b){return"Will "+a.ga5().a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga6())return!1
if(A.dh(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oi:{"^":"ad;J:b<,K:c<,a2:d<,P:e<,L:f<,a",
gU:function(){return"Stand up."},
gh:function(){return"StandUp"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){a.ad(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a9(new Q.oj(a,c),new Q.ok(a,c),null,null)
b.a1(a.gi(),new Q.ol())
return H.b(a.gh())+" stands up"},"$3","gN",6,0,1],
ac:function(a,b){return"Will "+a.ga5().a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga6())return!1
if(A.dh(a,b))return!1
return!0}},oj:{"^":"a:2;a,b",
$0:function(){return this.a.ad(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},ok:{"^":"a:2;a,b",
$0:function(){return this.a.ad(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},ol:{"^":"a:0;",
$1:function(a){a.saf(C.k)
return C.k}}}],["","",,T,{"^":"",
wL:[function(a){return new A.aj(T.eA(),null,null,new T.uI(),new T.uJ(),new T.uK(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vw",2,0,4],
wM:[function(a){return new A.aj(T.eA(),new T.uL(),T.eA(),new T.uM(),new T.uN(),new T.uO(),new T.uP(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vx",2,0,4],
wN:[function(a,b,c,d,e){a.ae(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a1(a.gi(),new T.uQ())},"$5","eA",10,0,8],
uI:{"^":"a:3;",
$3:function(a,b,c){return a.gO()!==!0&&c.ga6()&&a.gbb()&&c.gbb()}},
uJ:{"^":"a:3;",
$3:function(a,b,c){return Y.eU(a,c)}},
uK:{"^":"a:3;",
$3:function(a,b,c){return S.dQ(a,c,C.m)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return a.gO()===!0&&c.ga6()&&a.gbb()&&c.gbb()}},
uN:{"^":"a:3;",
$3:function(a,b,c){return Y.eU(a,c)}},
uO:{"^":"a:3;",
$3:function(a,b,c){return S.dQ(a,c,C.n)}},
uL:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uP:{"^":"a:3;",
$3:function(a,b,c){return S.dQ(a,c,C.r)}},
uQ:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}}}],["","",,A,{"^":"",aj:{"^":"A;c,d,e,f,r,x,y,z,J:Q<,K:ch<,a2:cx<,h:cy<,P:db<,L:dx<,a8:dy<,ag:fr<,b,a",
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
G:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
wO:[function(a){return new A.aj(M.eB(),null,null,new M.uR(),new M.uS(),new M.uT(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vy",2,0,4],
wP:[function(a){return new A.aj(M.eB(),new M.uU(),M.eB(),new M.uV(),new M.uW(),new M.uX(),new M.uY(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","vz",2,0,4],
wQ:[function(a,b,c,d,e){if(a.ga6()){a.hq(c,"<subject> roll<s>",e.gi())
a.hq(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kQ(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eB",10,0,8],
uR:{"^":"a:3;",
$3:function(a,b,c){return a.gO()!==!0&&!c.ga6()&&!A.dh(a,b)}},
uS:{"^":"a:3;",
$3:function(a,b,c){return F.fk(a,c)}},
uT:{"^":"a:3;",
$3:function(a,b,c){return V.dE(a,c,C.m)}},
uV:{"^":"a:3;",
$3:function(a,b,c){return a.gO()===!0&&!c.ga6()&&!A.dh(a,b)}},
uW:{"^":"a:3;",
$3:function(a,b,c){return F.fk(a,c)}},
uX:{"^":"a:3;",
$3:function(a,b,c){return V.dE(a,c,C.n)}},
uU:{"^":"a:3;",
$3:function(a,b,c){return a.gaa()?0.4:0.2}},
uY:{"^":"a:3;",
$3:function(a,b,c){return V.dE(a,c,C.r)}}}],["","",,U,{"^":"",
wR:[function(a){return new A.aj(U.eC(),null,null,new U.uZ(),new U.v_(),new U.v0(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","vA",2,0,4],
wS:[function(a){return new A.aj(U.eC(),new U.v1(),U.eC(),new U.v2(),new U.v3(),new U.v4(),new U.v5(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vB",2,0,4],
wT:[function(a,b,c,d,e){c.jn(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eC",10,0,8],
uZ:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gO()!==!0)z=(a.gaa()||a.dy===C.i)&&!c.ga6()&&a.gbb()
else z=!1
return z}},
v_:{"^":"a:3;",
$3:function(a,b,c){return Q.fH(a,c)}},
v0:{"^":"a:3;",
$3:function(a,b,c){return Z.dY(a,c,C.m)}},
v2:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gO()===!0)z=(a.gaa()||a.dy===C.i)&&!c.ga6()&&a.gbb()
else z=!1
return z}},
v3:{"^":"a:3;",
$3:function(a,b,c){return Q.fH(a,c)}},
v4:{"^":"a:3;",
$3:function(a,b,c){return Z.dY(a,c,C.n)}},
v1:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v5:{"^":"a:3;",
$3:function(a,b,c){return Z.dY(a,c,C.r)}}}],["","",,G,{"^":"",
wU:[function(a){return new A.aj(G.eD(),null,null,new G.v8(),new G.v9(),new G.va(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","vC",2,0,4],
wZ:[function(a){return new A.aj(G.eD(),new G.vj(),G.eD(),new G.vk(),new G.vl(),new G.vm(),new G.vn(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vD",2,0,4],
x_:[function(a,b,c,d,e){return a.eR(c,"<subject> swing<s> {"+H.b(U.ag(a))+" |}at <object>",e.gi(),!0,d)},"$5","eD",10,0,8],
v8:{"^":"a:3;",
$3:function(a,b,c){return a.gO()!==!0&&a.gaa()&&!c.ga6()&&a.e.gbl()}},
v9:{"^":"a:3;",
$3:function(a,b,c){return M.bK(a,c)}},
va:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.m)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return a.gO()===!0&&a.gaa()&&!c.ga6()&&a.e.gbl()}},
vl:{"^":"a:3;",
$3:function(a,b,c){return M.bK(a,c)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.n)}},
vj:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gao()!=null?0.2:0)}},
vn:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.r)}}}],["","",,R,{"^":"",
wV:[function(a,b,c,d,e){return a.hs(c,"<subject> completely miss<es> <object> with "+H.b(U.ag(a)),!0,d)},"$5","iw",10,0,11],
wW:[function(a){return new A.aj(R.ix(),new R.vb(),R.iw(),new R.vc(),new R.vd(),new R.ve(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vE",2,0,4],
wX:[function(a){return new A.aj(R.ix(),new R.vf(),R.iw(),new R.vg(),new R.vh(),new R.vi(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vF",2,0,4],
wY:[function(a,b,c,d,e){return a.eR(c,"<subject> swing<s> {"+H.b(U.ag(a))+" |}at <object>",e.gi(),!0,d)},"$5","ix",10,0,8],
vc:{"^":"a:3;",
$3:function(a,b,c){return a.gO()!==!0&&a.gar()&&!c.ga6()&&a.e.gbl()}},
vd:{"^":"a:3;",
$3:function(a,b,c){return M.bK(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.m)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vg:{"^":"a:3;",
$3:function(a,b,c){return a.gO()===!0&&a.gar()&&!c.ga6()&&a.e.gbl()}},
vh:{"^":"a:3;",
$3:function(a,b,c){return M.bK(a,c)}},
vi:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.n)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gao()!=null?0.2:0)}}}],["","",,D,{"^":"",
x0:[function(a){return new A.aj(D.eE(),null,null,new D.vo(),new D.vp(),new D.vq(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vG",2,0,4],
x1:[function(a){return new A.aj(D.eE(),new D.vr(),D.eE(),new D.vs(),new D.vt(),new D.vu(),new D.vv(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","vH",2,0,4],
x2:[function(a,b,c,d,e){return a.ae(c,"<subject> strike<s> down {with "+H.b(U.ag(a))+" |}at <object>",d)},"$5","eE",10,0,11],
vo:{"^":"a:3;",
$3:function(a,b,c){return a.gO()!==!0&&c.ga6()&&!a.ga6()&&a.e.gbl()}},
vp:{"^":"a:3;",
$3:function(a,b,c){return D.h4(a,c)}},
vq:{"^":"a:3;",
$3:function(a,b,c){return V.dO(a,c,C.m)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return a.gO()===!0&&c.ga6()&&!a.ga6()&&a.e.gbl()}},
vt:{"^":"a:3;",
$3:function(a,b,c){return D.h4(a,c)}},
vu:{"^":"a:3;",
$3:function(a,b,c){return V.dO(a,c,C.n)}},
vr:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gar()?0.2:0
y=c.gao()!=null?0.2:0
return 0.7-z-y}},
vv:{"^":"a:3;",
$3:function(a,b,c){return V.dO(a,c,C.r)}}}],["","",,E,{"^":"",oX:{"^":"c7;a2:c<,b,a",
ga8:function(){return"pick up <object>"},
gJ:function(){return"A shield makes a huge difference in battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gP:function(){return!1},
gL:function(){return},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gv(z):null
b.bZ(y.gi(),y.a_(new E.oY(this)))
b.a1(a.gi(),new E.oZ(this))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
ac:function(a,b){return H.i(new P.a4(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.bl))return!1
a.gfQ()
if(a.d!=null)return!1
return!0},
w:{
wo:[function(a){return new E.oX(!0,a,null)},"$1","vL",2,0,17]}},oY:{"^":"a:14;a",
$1:function(a){a.gbj().a0(0,this.a.b)
return a}},oZ:{"^":"a:0;a",
$1:function(a){a.sao(H.H(this.a.b,"$isbl"))}}}],["","",,M,{"^":"",p_:{"^":"c7;a2:c<,b,a",
ga8:function(){return"pick up <object>"},
gJ:function(){return"A different weapon might change the battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gP:function(){return!1},
gL:function(){return},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gv(z):null
b.bZ(y.gi(),y.a_(new M.p0(this)))
b.a1(a.gi(),new M.p1(this,a))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
ac:function(a,b){return H.i(new P.a4(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x
z=this.b
y=J.o(z)
if(!y.$isaN)return!1
if(!!y.$isd_)return!1
a.gfQ()
z=z.gab()
y=a.e.gab()
if(typeof y!=="number")return H.w(y)
if(z<=y)return!1
x=b.c2("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
w:{
wp:[function(a){return new M.p_(!0,a,null)},"$1","vM",2,0,17]}},p0:{"^":"a:14;a",
$1:function(a){a.gbj().a0(0,this.a.b)
return a}},p1:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gbb())a.gaC().q(0,a.gY())
a.sY(H.H(this.a.b,"$isaN"))}}}],["","",,D,{"^":"",p8:{"^":"A;K:c<,a2:d<,J:e<,P:f<,L:r<,b,a",
ga8:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gag:function(){return"will <subject> hit <object>?"},
R:[function(a,b,c){var z,y
z=this.fn(a)
y=this.b
a.ae(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaF()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gao()!=null)y.kS(c,"<subject> deflects it with <subject's> <object>",!0,y.gao(),!0)
else y.eQ(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.ad(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bv(b))+" {|nearby|not far from here}")
this.fA(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w,v,u
z=this.fn(a)
y=this.b
a.ae(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaF()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gao()!=null)z.dJ(c,"<subject> fl<ies> past <object-owner's> <object>",y.gao(),y,a,!0)
b.a1(y.gi(),new D.pc(z))
x=!b.X(y.gi()).gba()&&y.gi()!==100
w=[P.r]
if(!x){v=S.bI("{shoulder|{left|right} arm|{left|right} thigh}")
u=a.gaZ()
w=H.p([],w)
z.dJ(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aK(!1,v,w,u==null?$.$get$aV():u,!1,C.l),y,a,!0)
N.bx(c,y)}else{v=S.bI("{chest|eye|neck}")
u=a.gaZ()
w=H.p([],w)
z.dJ(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aK(!1,v,w,u==null?$.$get$aV():u,!1,C.l),y,a,!0)
N.bW(c,b,y)}this.fA(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gN",6,0,1],
H:function(a,b){return 0.6-(this.b.gao()!=null?0.2:0)},
G:function(a,b){var z
if(a.gO()===!0)if(a.gaa())z=(C.a.a4(a.e.geX(),C.q)||a.h7(C.q))&&J.e(b.at("FightSituation").gT(),0)
else z=!1
else z=!1
return z},
fn:function(a){var z,y
if(a.gY()!=null&&a.gY() instanceof Z.d_)return a.gY()
for(z=a.gaC(),z=z.gZ(z);z.t();){y=z.d
if(y instanceof Z.d_)return y}throw H.c(new P.x("No spear found in "+a.k(0)))},
fA:function(a,b,c){var z,y
z=a.at("FightSituation")
if(J.e(b.gY(),c)){y=b.jV()
if(y==null)y=$.$get$dd()
a.a1(b.y,new D.p9(y))}else a.a1(b.gi(),new D.pa(c))
a.bZ(z.gi(),z.a_(new D.pb(c)))},
w:{
wr:[function(a){return new D.p8(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","vP",2,0,4]}},pc:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gal()
y=this.a.gbE()
if(typeof z!=="number")return z.as()
a.sal(z-y)
return a}},p9:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sY(z)
a.gaC().a0(0,z)
return a}},pa:{"^":"a:0;a",
$1:function(a){a.gaC().a0(0,this.a)
return a}},pb:{"^":"a:0;a",
$1:function(a){a.gbj().q(0,this.a)
return a}}}],["","",,M,{"^":"",pk:{"^":"ad;J:b<,P:c<,L:d<,K:e<,a2:f<,a",
gU:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){a.ad(c,"<subject> shake<s> <subject's> head violently")
if(a.gO()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kR(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z
if(a.eH(b)){z=b.c2("Confuse",a,!0)
if(typeof z!=="number")return z.bn()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",le:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
b.a1(z.gi(),new R.lf())
if(J.e(z.gi(),100)){a.bw(c,"<subject> smash<es> <object's> head to the ground",z,!0)
N.bx(c,z)}else{a.bw(c,"<subject> break<s> <object's> neck",z,!0)
N.bW(c,b,z)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gN",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
w:{
w2:[function(a){return new R.le(null,!0,!0,!0,C.c,a,null)},"$1","tQ",2,0,4]}},lf:{"^":"a:0;",
$1:function(a){a.sal(0)
return a}}}],["","",,Y,{"^":"",
eU:function(a,b){var z=new Y.dn(null,null,null,null,null)
new Y.tl(a,b).$1(z)
return z.p()},
eT:{"^":"aa;",
gaB:function(){return[R.tQ()]},
gh:function(){return"BreakNeckOnGroundSituation"},
av:function(){var z=new Y.dn(null,null,null,null,null)
z.m(this)
new Y.jL().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.X(this.a)
return},
b_:function(a,b){return new H.K(a,new Y.jM(this),[H.m(a,0)])}},
tl:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
jL:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.ah()
a.gb2().e=z+1
return a}},
jM:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pA:{"^":"eT;a,i:b<,c,T:d<",
a_:function(a){var z=new Y.dn(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dn:{"^":"d;a,b,c,d,e",
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
z=new Y.pA(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",kX:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gag:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge it|break free}")
S.a9(new Z.kY(a,c),new Z.kZ(this,a,c),null,null)
b.aG()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
a.bw(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.bd("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){var z
if(a.gO()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gv(z):null).gbe().bc(0.5)},
G:function(a,b){return!0},
w:{
w1:[function(a){return new Z.kX("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tN",2,0,4]}},kY:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {can't|fail<s>}",!0)}},kZ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dQ:function(a,b,c){var z=new S.dP(null,null,null,null,null,null)
new S.tk(a,b,c).$1(z)
return z.p()},
fx:{"^":"c2;",
gaB:function(){return[Z.tN()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
av:function(){var z=new S.dP(null,null,null,null,null,null)
z.m(this)
new S.mE().$1(z)
return z.p()}},
tk:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gaM().c=z
a.gaM().f=0
z=this.a.gi()
a.gaM().b=z
z=this.b.gi()
a.gaM().e=z
a.gaM().d=this.c
return a}},
mE:{"^":"a:0;",
$1:function(a){var z=a.gaM().f
if(typeof z!=="number")return z.ah()
a.gaM().f=z+1
return a}},
pK:{"^":"fx;cM:a<,i:b<,co:c<,cs:d<,T:e<",
a_:function(a){var z=new S.dP(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dP:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaM().c},
gT:function(){return this.gaM().f},
gaM:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaM().b
x=this.gaM().c
w=this.gaM().d
v=this.gaM().e
u=this.gaM().f
z=new S.pK(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dh:function(a,b){var z,y,x,w
z=b.c2("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c2("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c2("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c2("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
bX:function(a){return a.gao().gaF()===!0?a.gao().gh():"<subject's> "+H.b(a.gao().gh())},
ag:function(a){return a.gY().gaF()===!0?a.gY().gh():"<subject's> "+H.b(a.gY().gh())}}],["","",,G,{"^":"",
wA:[function(a,b,c,d,e){a.ad(c,"<subject> tr<ies> to swing back")
a.eP(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gaa()){b.a1(a.y,new G.tv())
a.cq(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.i){b.a1(a.y,new G.tw())
a.ay(c,"<subject> lose<s> balance because of that",!0)
a.cq(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","i2",10,0,11],
wB:[function(a){return new A.aj(G.i3(),new G.tx(),G.i2(),new G.ty(),new G.tz(),new G.tA(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tF",2,0,4],
wD:[function(a,b,c,d,e){return a.ae(c,"<subject> swing<s> back",d)},"$5","i3",10,0,8],
wC:[function(a){return new A.aj(G.i3(),new G.tB(),G.i2(),new G.tC(),new G.tD(),new G.tE(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tG",2,0,4],
tv:{"^":"a:0;",
$1:function(a){a.saf(C.i)
return a}},
tw:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}},
ty:{"^":"a:3;",
$3:function(a,b,c){return a.gO()!==!0&&a.gY().gbl()&&!a.ga6()}},
tz:{"^":"a:3;",
$3:function(a,b,c){return M.bK(a,c)}},
tA:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.m)}},
tx:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}},
tC:{"^":"a:3;",
$3:function(a,b,c){return a.gO()===!0&&a.gY().gbl()&&!a.ga6()}},
tD:{"^":"a:3;",
$3:function(a,b,c){return M.bK(a,c)}},
tE:{"^":"a:3;",
$3:function(a,b,c){return L.bm(a,c,C.n)}},
tB:{"^":"a:3;",
$3:function(a,b,c){return c.gaa()?0.7:0.9}}}],["","",,V,{"^":"",k5:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gag:function(){return"will <subject> tackle <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to tackle <object>",z)
S.a9(new V.k6(a,c),new V.k7(this,c),null,null)
a.ae(c,"<subject> land<s> on the "+H.b(U.bv(b))+" next to <object>",z)
b.a1(a.gi(),new V.k8())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tackle<s> <object> to the ground",z)
b.a1(z.gi(),new V.k9())
b.a1(a.gi(),new V.ka())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){var z=this.b.gar()?0.2:0
if(a.gO()===!0)return 0.7+z
return 0.5+z},
G:function(a,b){return!a.ga6()&&a.e instanceof K.c6},
w:{
vW:[function(a){return new V.k5("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tH",2,0,4]}},k6:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> go<es> wide",!0)}},k7:{"^":"a:2;a,b",
$0:function(){return this.a.b.an(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k8:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}},k9:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}},ka:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}}}],["","",,S,{"^":"",
cI:function(a,b){var z=new S.dr(null,null,null,null,null)
new S.tb(a,b).$1(z)
return z.p()},
f_:{"^":"aa;",
gaB:function(){return[G.tF(),G.tG(),V.tH()]},
gbN:function(){return[$.$get$dS()]},
gh:function(){return"CounterAttackSituation"},
av:function(){var z=new S.dr(null,null,null,null,null)
z.m(this)
new S.k3().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.X(this.a)
return},
b_:function(a,b){return new H.K(a,new S.k4(this),[H.m(a,0)])}},
tb:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb3().c=z
a.gb3().e=0
z=this.a.gi()
a.gb3().b=z
z=this.b.gi()
a.gb3().d=z
return a}},
k3:{"^":"a:0;",
$1:function(a){var z=a.gb3().e
if(typeof z!=="number")return z.ah()
a.gb3().e=z+1
return a}},
k4:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pB:{"^":"f_;a,i:b<,c,T:d<",
a_:function(a){var z=new S.dr(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dr:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb3().c},
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
z=new S.pB(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c2:{"^":"o7;",
gdC:function(){return 1000},
aU:function(a,b){if(a===0)return b.X(this.gcs())
return},
b_:function(a,b){return new H.K(a,new O.kf(this),[H.m(a,0)])}},o7:{"^":"aa+n0;"},kf:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcM())||J.e(a.gi(),z.gcs())}}}],["","",,U,{"^":"",
bv:function(a){return a.at("FightSituation").gc5()},
du:function(a,b,c,d,e){var z=new U.c5(null,null,null,null,null,null,null,null,null)
new U.tr(a,b,c,d,e).$1(z)
return z.p()},
cM:{"^":"aa;",
gaB:function(){return[N.ts(),V.tJ(),R.uj(),Y.uu(),T.vw(),T.vx(),M.vy(),M.vz(),U.vA(),U.vB(),G.vC(),G.vD(),D.vG(),D.vH(),R.vE(),R.vF(),E.vL(),M.vM(),D.vP()]},
gbN:function(){return H.p([$.$get$fK(),$.$get$h1(),$.$get$fO(),$.$get$hs()],[Q.ad])},
gdC:function(){return 1000},
gh:function(){return"FightSituation"},
cN:function(a,b){var z=b.a
return(z&&C.a).br(z,new U.l1(a))},
av:function(){var z=new U.c5(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.l2().$1(z)
return z.p()},
aU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hW(this.f,this.b)
y=H.bD(z,new U.l3(b),H.y(z,"z",0),null)
x=H.y(y,"z",0)
w=P.P(new H.K(y,new U.l4(),[x]),!1,x)
x=H.m(w,0)
v=P.P(new H.K(w,new U.l5(),[x]),!1,x)
u=v.length===1?C.a.gc8(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.aQ(0,new U.l6(q),new U.l7())
o=p==null?p:p.gT()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.w(o)
m=n-o
if(m<=0)continue
l=x.aQ(0,new U.l8(q),new U.l9())
k=l==null?l:l.gT()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.w(k)
j=(x-k+m)/2
if(q.gO()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b_:function(a,b){return new H.K(a,new U.la(this),[H.m(a,0)])},
hi:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a9(z))y.j(0,z).$2(a,b)},
dE:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cN(a,this.b)&&this.cN(a,this.f)){y=a.f_(z)
a.bZ(y.gi(),y.a_(new U.lb()))
for(z=this.f,x=z.a,x=new J.be(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.X(v).gaR()){u=a.X(v)
t=u.a_(new U.lc())
w.a0(0,u)
w.q(0,t)}}C.a.q(a.f,X.me(z,this.d,this.a,null))}else this.cN(a,this.f)},
dd:function(a){var z=this.f
if(this.cN(a,z))if(this.cN(a,this.b)){z=z.a
z=(z&&C.a).br(z,new U.ld(a))}else z=!1
else z=!1
return z}},
tr:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a5().am(1073741823)
a.gak().f=z
a.gak().y=0
z=a.gak()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.ai()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eL(this.a,new U.r9()))
z=a.gak()
y=z.c
if(y==null){y=new S.O(null,null,[P.t])
y.ai()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.ap(y,new U.ra(),[H.m(y,0),null]))
a.gak().e=this.c
y=new S.O(null,null,[U.a8])
y.ai()
y.m(C.d)
a.gak().b=y
y=this.d.gi()
a.gak().x=y
y=new A.cR(null,null,[P.t,{func:1,v:true,args:[A.ab,Y.a_]}])
y.cc()
y.m(this.e)
a.gak().d=y
return a}},
r9:{"^":"a:0;",
$1:function(a){return a.gi()}},
ra:{"^":"a:0;",
$1:function(a){return a.gi()}},
l1:{"^":"a:0;a",
$1:function(a){return this.a.X(a).gaR()}},
l2:{"^":"a:0;",
$1:function(a){var z=a.gak().y
if(typeof z!=="number")return z.ah()
a.gak().y=z+1
return a}},
l3:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},
l4:{"^":"a:0;",
$1:function(a){return a.gaR()}},
l5:{"^":"a:0;",
$1:function(a){return a.gO()}},
l6:{"^":"a:0;a",
$1:function(a){return J.e(a.gcZ(),this.a.gi())&&a.ghF()===!0}},
l7:{"^":"a:2;",
$0:function(){return}},
l8:{"^":"a:0;a",
$1:function(a){return J.e(a.gcZ(),this.a.gi())}},
l9:{"^":"a:2;",
$0:function(){return}},
la:{"^":"a:27;a",
$1:function(a){var z,y,x
if(a.gaR()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a4(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a4(z,y)
z=y}else z=!0}else z=!1
return z}},
lb:{"^":"a:0;",
$1:function(a){a.skB(!1)
return a}},
lc:{"^":"a:0;",
$1:function(a){a.saf(C.k)
return a}},
ld:{"^":"a:29;a",
$1:function(a){var z=this.a.X(a)
return z.gO()===!0&&z.gaR()}},
pD:{"^":"cM;bj:a<,b,c,c5:d<,i:e<,cY:f<,r,T:x<",
a_:function(a){var z=new U.c5(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cM))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
c5:{"^":"d;a,b,c,d,e,f,r,x,y",
gbj:function(){var z,y
z=this.gak()
y=z.b
if(y==null){y=new S.O(null,null,[U.a8])
y.ai()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc5:function(){return this.gak().e},
gi:function(){return this.gak().f},
gcY:function(){var z,y
z=this.gak()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.ai()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gT:function(){return this.gak().y},
gak:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.ai()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.ai()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cR(null,null,[H.m(z,0),H.m(z,1)])
y.cc()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.ai()
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
if(x==null){x=new S.O(null,null,[U.a8])
x.ai()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gak()
w=x.c
if(w==null){w=new S.O(null,null,[P.t])
w.ai()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.p()
w=this.gak()
v=w.d
if(v==null){v=new A.cR(null,null,[P.t,{func:1,v:true,args:[A.ab,Y.a_]}])
v.cc()
v.m(C.a2)
w.d=v
w=v}else w=v
w=w.p()
v=this.gak().e
u=this.gak().f
t=this.gak()
s=t.r
if(s==null){s=new S.O(null,null,[P.t])
s.ai()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.gak().x
r=this.gak().y
z=new U.pD(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
bW:function(a,b,c){var z,y
z=b.at("FightSituation")
y=z.gc5()
b.bZ(z.gi(),z.a_(new N.uk(c)))
if(c.gaf()===C.f){c.ay(a,"<subject> stop<s> moving",!0)
a.A(0,"\n\n",!0)
return}switch($.$get$hN().am(3)){case 0:c.cq(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.ay(a,"<subject> fall<s> backward",!0)
c.ay(a,"<subject> twist<s>",!0)
c.cq(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ay(a,"<subject> drop<s> to <subject's> knees",!0)
c.ay(a,"<subject> keel<s> over",!0)
break}a.A(0,"\n\n",!0)},
bx:function(a,b){if(J.e(b.gi(),100)&&b.gal()===0){N.ri(a,b)
return}b.ay(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
ri:function(a,b){if(b.gaf()===C.f){b.ay(a,"<subject> stop<s> moving",!0)
a.A(0,"\n\n",!0)
return}b.ay(a,"<subject> drop<s> to <subject's> knees",!0)
b.ay(a,"<subject> keel<s> over",!0)
a.A(0,"\n\n",!0)},
uk:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gbb())a.gbj().q(0,z.e)
if(z.d!=null)a.gbj().q(0,z.d)
return a}}}],["","",,R,{"^":"",lg:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishLeap"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.a1(z.gi(),new R.lh())
b.a1(a.gi(),new R.li())
y=b.at("LeapSituation").gi()
x=U.bv(b)
a.cr(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.jk(0,"both "+(a.gO()===!0||z.gO()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gal()
if(typeof w!=="number")return w.bn()
if(w>1){c.jl(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
N.bx(c,z)
b.a1(z.gi(),new R.lj())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
w:{
w3:[function(a){return new R.lg(null,!0,!0,!0,C.c,a,null)},"$1","tR",2,0,4]}},lh:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}},li:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}},lj:{"^":"a:0;",
$1:function(a){var z=a.gal()
if(typeof z!=="number")return z.as()
a.sal(z-1)
return a}}}],["","",,S,{"^":"",kr:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gag:function(){return"will <subject> dodge?"},
R:[function(a,b,c){var z=b.at("LeapSituation").gi()
a.hr(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gar())a.c0(c,"<subject> <is> out of balance",z,!0,!0)
else S.a9(new S.ks(a,c,z),new S.kt(a,c,z),null,null)
b.aG()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x
z=b.at("LeapSituation").gi()
y=U.bv(b)
x=this.b
a.cr(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.ay(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.a1(x.gi(),new S.ku())
b.bd("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gN",6,0,1],
H:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga6()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbe().bc(0.5-z+y)},
G:function(a,b){return!a.ga6()},
w:{
vZ:[function(a){return new S.kr("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tK",2,0,4]}},ks:{"^":"a:2;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kt:{"^":"a:2;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},ku:{"^":"a:0;",
$1:function(a){a.saf(C.f)
return a}}}],["","",,D,{"^":"",ly:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gag:function(){return"will <subject> impale <objectPronoun>?"},
R:[function(a,b,c){var z,y
z=b.at("LeapSituation").gi()
y=this.b
a.eR(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ag(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gar())a.c0(c,"<subject> <is> out of balance",z,!0,!0)
else S.a9(new D.lz(a,c,z),new D.lA(a,c,z),null,null)
b.aG()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y
z=b.at("LeapSituation").gi()
y=this.b
a.cr(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ag(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.ay(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.a1(y.gi(),new D.lB())
if(!(!b.X(y.gi()).gba()&&y.gi()!==100)){a.gY().ae(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ad(c,"<subject> fall<s> to the ground")
N.bx(c,y)}else{a.gY().ae(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.ay(c,"<subject> go<es> down",!0)
N.bW(c,b,y)}b.bd("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gN",6,0,1],
H:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.ga6()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbe().bc(0.4-z+y)},
G:function(a,b){return!a.ga6()&&a.e.geJ()},
w:{
w7:[function(a){return new D.ly("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","ub",2,0,4]}},lz:{"^":"a:2;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lA:{"^":"a:2;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lB:{"^":"a:0;",
$1:function(a){var z=a.gal()
if(typeof z!=="number")return z.as()
a.sal(z-1)
a.saf(C.f)
return a}}}],["","",,V,{"^":"",
dE:function(a,b,c){var z=new V.dD(null,null,null,null,null,null)
new V.ti(a,b,c).$1(z)
return z.p()},
fi:{"^":"c2;",
gaB:function(){return[S.tK(),D.ub()]},
gh:function(){return"LeapDefenseSituation"},
av:function(){var z=new V.dD(null,null,null,null,null,null)
z.m(this)
new V.m2().$1(z)
return z.p()}},
ti:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
m2:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.ah()
a.gaI().f=z+1
return a}},
pF:{"^":"fi;cM:a<,i:b<,co:c<,cs:d<,T:e<",
a_:function(a){var z=new V.dD(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dD:{"^":"d;a,b,c,d,e,f",
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
z=new V.pF(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fk:function(a,b){var z=new F.dF(null,null,null,null,null)
new F.tj(a,b).$1(z)
return z.p()},
fj:{"^":"aa;",
gaB:function(){return[R.tR()]},
gh:function(){return"LeapSituation"},
av:function(){var z=new F.dF(null,null,null,null,null)
z.m(this)
new F.m3().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.X(this.a)
return},
b_:function(a,b){return new H.K(a,new F.m4(this),[H.m(a,0)])}},
tj:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb4().c=z
a.gb4().e=0
z=this.a.gi()
a.gb4().b=z
z=this.b.gi()
a.gb4().d=z
return a}},
m3:{"^":"a:0;",
$1:function(a){var z=a.gb4().e
if(typeof z!=="number")return z.ah()
a.gb4().e=z+1
return a}},
m4:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pG:{"^":"fj;a,i:b<,c,T:d<",
a_:function(a){var z=new F.dF(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dF:{"^":"d;a,b,c,d,e",
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
z=new F.pG(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jt:{"^":"ad;K:b<,a2:c<,P:d<,L:e<,a",
gU:function(){return""},
gJ:function(){return},
gh:function(){return"AutoLoot"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.at("LootSituation")
y=b.X(100)
if(y.gci()===!0&&!y.gba()){a.ae(c,"<subject> kneel<s> next to <object>",y)
a.ae(c,"<subject> help<s> <object> to <object's> feet",y)
y.dI(c,'"I\'ll live," <subject> say<s>.',!0)
b.a1(100,new Z.jG())}x=[]
for(w=z.gbj(),w=w.gZ(w),v=b.a,u=null,t=null;w.t();){s=w.d
r=J.o(s)
if(!!r.$isaN){q=s.gbI()
p=s.gbE()
o=s.gaF()?1:0
n=a.gY().gab()
if(typeof n!=="number")return H.w(n)
n=2+q+p+o>n
q=n}else q=!1
if(q){m=b.X(a.gi())
l=m.a_(new Z.jH(a,s))
v.a0(0,m)
v.q(0,l)
u=s}else if(!!r.$isbl&&a.gao()==null){m=b.X(a.gi())
l=m.a_(new Z.jI(s))
v.a0(0,m)
v.q(0,l)
t=s}else{m=b.X(a.gi())
l=m.a_(new Z.jJ(s))
v.a0(0,m)
v.q(0,l)
x.push(s)}}if(u!=null){a.ae(c,"<subject> pick<s> up <object>",u)
a.ae(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ae(c,"<subject> pick<s> up <object>",t)
a.ae(c,"<subject> wield<s> <object>",t)}this.iC(x,a,z,b,c)
this.iB(x,a,z,b,c)
if(x.length!==0)c.jr("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.gO()},
iC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jA(),[H.m(a,0)]),!0,L.aN)
for(y=b.gaC(),y=y.gZ(y);y.t();){x=y.d
if(x instanceof L.aN)C.a.q(z,x)}if(z.length===0)return
C.a.c9(z,new Z.jB())
w=c.gcY().aE(0,new Z.jC(d)).dg(0,new Z.jD())
for(y=J.ah(w.a),v=new H.bO(y,w.b,[H.m(w,0)]),u=d.a;v.t();){t=y.gI()
if(z.length===0)break
s=C.a.hp(z)
r=d.X(t.gi())
q=r.a_(new Z.jE(s))
u.a0(0,r)
u.q(0,q)
C.a.a0(a,s)
r=d.X(b.gi())
q=r.a_(new Z.jF(s))
u.a0(0,r)
u.q(0,q)
b.ae(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iB:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.ju(),[H.m(a,0)]),!0,E.bl)
for(y=b.gaC(),y=y.gZ(y);y.t();){x=y.d
if(x instanceof E.bl)C.a.q(z,x)}if(z.length===0)return
C.a.c9(z,new Z.jv())
w=c.gcY().aE(0,new Z.jw(d)).dg(0,new Z.jx())
for(y=J.ah(w.a),v=new H.bO(y,w.b,[H.m(w,0)]),u=d.a;v.t();){t=y.gI()
if(z.length===0)break
s=C.a.hp(z)
r=d.X(t.gi())
q=r.a_(new Z.jy(s))
u.a0(0,r)
u.q(0,q)
C.a.a0(a,s)
r=d.X(b.gi())
q=r.a_(new Z.jz(s))
u.a0(0,r)
u.q(0,q)
b.ae(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jG:{"^":"a:0;",
$1:function(a){a.saf(C.i)
a.sal(1)
return a}},jH:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gY() instanceof K.c6))a.gaC().q(0,z.gY())
a.sY(this.b)}},jI:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sao(z)
return z}},jJ:{"^":"a:0;a",
$1:function(a){a.gaC().q(0,this.a)
return a}},jA:{"^":"a:0;",
$1:function(a){return a instanceof L.aN}},jB:{"^":"a:6;",
$2:function(a,b){return J.bz(a.gab(),b.gab())}},jC:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},jD:{"^":"a:0;",
$1:function(a){return a.gaR()&&a.gbb()}},jE:{"^":"a:0;a",
$1:function(a){a.sY(this.a)
return a}},jF:{"^":"a:0;a",
$1:function(a){a.gaC().a0(0,this.a)
return a}},ju:{"^":"a:0;",
$1:function(a){return a instanceof E.bl}},jv:{"^":"a:6;",
$2:function(a,b){return J.bz(a.gab(),b.gab())}},jw:{"^":"a:0;a",
$1:function(a){return this.a.X(a)}},jx:{"^":"a:0;",
$1:function(a){return a.gaR()&&a.gao()==null}},jy:{"^":"a:0;a",
$1:function(a){a.sao(this.a)
return a}},jz:{"^":"a:0;a",
$1:function(a){a.gaC().a0(0,this.a)
return a}}}],["","",,X,{"^":"",
me:function(a,b,c,d){var z=new X.dJ(null,null,null,null,null,null)
new X.t9(a,b,c).$1(z)
return z.p()},
fp:{"^":"aa;",
gbN:function(){return H.p([$.$get$eQ()],[Q.ad])},
gh:function(){return"LootSituation"},
av:function(){var z=new X.dJ(null,null,null,null,null,null)
z.m(this)
new X.mg().$1(z)
return z.p()},
aU:function(a,b){if(typeof a!=="number")return a.bn()
if(a>0)return
return this.fo(b.a)},
b_:function(a,b){return[this.fo(a)]},
dd:function(a){return!0},
fo:function(a){return a.cg(0,new X.mf())}},
t9:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.O(null,null,[P.t])
z.ai()
z.m(this.a)
a.gau().d=z
z=new S.O(null,null,[U.a8])
z.ai()
z.m(this.c)
a.gau().b=z
return a}},
mg:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.ah()
a.gau().f=z+1
return a}},
mf:{"^":"a:0;",
$1:function(a){return a.gO()===!0&&a.gaR()}},
pH:{"^":"fp;bj:a<,c5:b<,cY:c<,i:d<,T:e<",
a_:function(a){var z=new X.dJ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dJ:{"^":"d;a,b,c,d,e,f",
gbj:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.O(null,null,[U.a8])
y.ai()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc5:function(){return this.gau().c},
gcY:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.O(null,null,[P.t])
y.ai()
y.m(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gau().e},
gT:function(){return this.gau().f},
gau:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.ai()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.ai()
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
if(x==null){x=new S.O(null,null,[U.a8])
x.ai()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.O(null,null,[P.t])
v.ai()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pH(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mu:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gag:function(){return"will <subject> hit <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to stab <object>",z)
a.an(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
b.a1(z.gi(),new A.mv(a))
if(!(!b.X(z.gi()).gba()&&!J.e(z.gi(),100))){a.bw(c,"<subject> thrust<s> {|"+H.b(U.ag(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
N.bx(c,z)}else{a.bw(c,"<subject> {stab<s>|run<s> "+H.b(U.ag(a))+" through} <object>",z,!0)
N.bW(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){if(a.gO()===!0)return 0.6
return 0.5},
G:function(a,b){return a.gaa()&&this.b.gar()&&a.e.geJ()},
w:{
wc:[function(a){return new A.mu("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uo",2,0,4]}},mv:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gal()
y=this.a.gY().gbE()
if(typeof z!=="number")return z.as()
a.sal(z-y)
return a}}}],["","",,U,{"^":"",
mq:function(a,b){var z=new U.dM(null,null,null,null,null)
new U.tm(a,b).$1(z)
return z.p()},
fv:{"^":"aa;",
gaB:function(){return H.p([A.uo()],[{func:1,ret:Q.A,args:[R.I]}])},
gbN:function(){return[$.$get$dS()]},
gh:function(){return"OffBalanceOpportunitySituation"},
av:function(){var z=new U.dM(null,null,null,null,null)
z.m(this)
new U.mr().$1(z)
return z.p()},
aU:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bn()
if(a>0)return
z=b.X(this.a)
y=b.a
x=H.m(y,0)
w=P.P(new H.K(y,new U.ms(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geD(w)
if(v.gaa()&&z.gar()&&v.e.geJ())return v
return},
b_:function(a,b){return new H.K(a,new U.mt(b,b.X(this.a)),[H.m(a,0)])}},
tm:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb5().d=z
a.gb5().e=0
z=this.a.gi()
a.gb5().b=z
z=this.b
z=z==null?z:z.gi()
a.gb5().c=z
return a}},
mr:{"^":"a:0;",
$1:function(a){var z=a.gb5().e
if(typeof z!=="number")return z.ah()
a.gb5().e=z+1
return a}},
ms:{"^":"a:27;a,b,c",
$1:function(a){var z,y
if(a.gaR())if(a.eF(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mt:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eF(z,this.a)}},
pI:{"^":"fv;a,b,i:c<,T:d<",
a_:function(a){var z=new U.dM(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dM:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb5().d},
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
z=new U.pI(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lk:{"^":"A;J:c<,K:d<,a2:e<,P:f<,b,a",
ga8:function(){return""},
gh:function(){return"FinishPunch"},
gL:function(){return},
gag:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gaa()?C.i:C.f
x=b.at("PunchSituation").gi()
w=U.bv(b)
b.a1(z.y,new O.ll(y))
switch(y){case C.k:throw H.c(new P.x("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fM(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ay(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fM(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gN",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
w:{
w4:[function(a){return new O.lk(null,!0,!0,!1,a,null)},"$1","tS",2,0,4]}},ll:{"^":"a:0;a",
$1:function(a){a.saf(this.a)
return a}}}],["","",,E,{"^":"",kv:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gag:function(){return"will <subject> dodge the fist?"},
R:[function(a,b,c){var z=b.at("PunchSituation").gi()
a.hr(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a9(new E.kw(a,c,z),new E.kx(this,a,c,z),null,null)
b.aG()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
a.cr(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.at("PunchSituation").gi(),z,!0)
b.bd("FightSituation")
if(a.gO()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cI(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gbe().bc(0.4-z)},
G:function(a,b){return!0},
w:{
w_:[function(a){return new E.kv("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tL",2,0,4]}},kw:{"^":"a:2;a,b,c",
$0:function(){return this.a.c0(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kx:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kU(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dY:function(a,b,c){var z=new Z.dX(null,null,null,null,null,null)
new Z.tg(a,b,c).$1(z)
return z.p()},
fF:{"^":"c2;",
gaB:function(){return[E.tL()]},
gh:function(){return"PunchDefenseSituation"},
av:function(){var z=new Z.dX(null,null,null,null,null,null)
z.m(this)
new Z.na().$1(z)
return z.p()}},
tg:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
na:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.ah()
a.gaK().f=z+1
return a}},
pL:{"^":"fF;cM:a<,i:b<,co:c<,cs:d<,T:e<",
a_:function(a){var z=new Z.dX(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dX:{"^":"d;a,b,c,d,e,f",
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
z=new Z.pL(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fH:function(a,b){var z=new Q.dZ(null,null,null,null,null)
new Q.th(a,b).$1(z)
return z.p()},
fG:{"^":"aa;",
gaB:function(){return[O.tS()]},
gh:function(){return"PunchSituation"},
av:function(){var z=new Q.dZ(null,null,null,null,null)
z.m(this)
new Q.nb().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.X(this.a)
return},
b_:function(a,b){return new H.K(a,new Q.nc(this),[H.m(a,0)])}},
th:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb6().c=z
a.gb6().e=0
z=this.a.gi()
a.gb6().b=z
z=this.b.gi()
a.gb6().d=z
return a}},
nb:{"^":"a:0;",
$1:function(a){var z=a.gb6().e
if(typeof z!=="number")return z.ah()
a.gb6().e=z+1
return a}},
nc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pM:{"^":"fG;a,i:b<,c,T:d<",
a_:function(a){var z=new Q.dZ(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dZ:{"^":"d;a,b,c,d,e",
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
z=new Q.pM(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lm:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishSlash"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.a1(z.gi(),new O.lp(a))
y=b.at("SlashSituation").gi()
x=!b.X(z.gi()).gba()&&!J.e(z.gi(),100)
if(!x){a.cr(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
N.bx(c,z)}else{a.cr(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
N.bW(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gY().gbl()},
w:{
w6:[function(a){return new O.lm(null,!0,!0,!0,C.c,a,null)},"$1","tT",2,0,4]}},lp:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gal()
y=this.a.gY().gbI()
if(typeof z!=="number")return z.as()
a.sal(z-y)
return a}}}],["","",,X,{"^":"",kg:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gag:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ag(a))+"|fend it off}")
if(a.gar())a.an(c,"<subject> <is> out of balance",!0)
else S.a9(new X.kh(a,c),new X.ki(this,a,c),null,null)
b.aG()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){if(a.gO()===!0)a.ad(c,"<subject> {step<s>|take<s> a step} back")
a.bm(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ag(a))+"|fend<s> it off}",!0)
if(!a.gaa()){b.a1(a.y,new X.kj())
if(a.ch===!0)a.ad(c,"<subject> regain<s> balance")}b.bd("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
H:function(a,b){var z,y,x
if(a.gO()===!0)return 1
z=b.f
y=z.length!==0?C.a.gv(z):null
x=a.gaa()?0:0.2
return y.gbe().bc(0.5-x)},
G:function(a,b){return a.gY().gce()},
w:{
vX:[function(a){return new X.kg("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tI",2,0,4]}},kh:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},ki:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kj:{"^":"a:0;",
$1:function(a){a.saf(C.k)
return a}}}],["","",,F,{"^":"",ky:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"DodgeSlash"},
ga8:function(){return"dodge and counter"},
gag:function(){return"will <subject> dodge?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gar())a.an(c,"<subject> <is> out of balance",!0)
else S.a9(new F.kz(a,c),new F.kA(this,a,c),null,null)
b.aG()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
a.bw(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gaa()){z.cq(c,"<subject> lose<s> balance because of that",!0,!0)
b.a1(z.y,new F.kB())}b.bd("FightSituation")
if(a.gO()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cI(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gN",6,0,1],
H:function(a,b){var z,y
z=a.gaa()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gbe().bc(0.4-z)},
G:function(a,b){return!a.ga6()},
w:{
w0:[function(a){return new F.ky("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tM",2,0,4]}},kz:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kA:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kB:{"^":"a:0;",
$1:function(a){a.saf(C.i)
return C.i}}}],["","",,O,{"^":"",lV:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gag:function(){return"will <subject> avoid the slash?"},
R:[function(a,b,c){a.dI(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aG()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z
a.bm(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.cd(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gY())
b.bd("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gN",6,0,1],
H:function(a,b){var z,y,x
if(a.gO()===!0)return 1
z=b.f
y=z.length!==0?C.a.gv(z):null
x=a.gaa()?0:0.2
return y.gbe().bc(0.5-x)},
G:function(a,b){return a.gbb()},
w:{
wa:[function(a){return new O.lV("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","ui",2,0,4]}}}],["","",,G,{"^":"",mH:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"ParrySlash"},
ga8:function(){return"parry and counter"},
gag:function(){return"will <subject> parry?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ag(a))+"|fend it off}")
if(a.gar())a.an(c,"<subject> <is> out of balance",!0)
else S.a9(new G.mI(a,c),new G.mJ(this,a,c),null,null)
b.aG()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
if(z.gar()){c.eu(0,"<subject> <is> out of balance",!0,!0,z)
c.cd(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iB())
a.bm(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ag(a))+"|fend<s> it off easily}",!0)}else a.bm(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ag(a))+"|fend<s> it off}",!0)
b.bd("FightSituation")
if(a.gO()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cI(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gN",6,0,1],
H:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gar()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbe().bc(0.3-z+y)},
G:function(a,b){return a.gY().gce()},
w:{
wf:[function(a){return new G.mH("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","ur",2,0,4]}},mI:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mJ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",o3:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gag:function(){return"will <subject> block the slash?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bX(a)))
if(a.gar())a.an(c,"<subject> <is> out of balance",!0)
else S.a9(new E.o4(a,c),new E.o5(a,c),new E.o6(this,a,c),null)
b.aG()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
if(z.gar()){c.eu(0,"<subject> <is> out of balance",!0,!0,z)
c.cd(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iA())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bX(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bX(a)),!0)
b.bd("FightSituation")
if(a.gO()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.cI(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gN",6,0,1],
H:function(a,b){var z,y,x
z=a.gaa()?0:0.2
y=this.b.gar()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gbe().bc(0.5-z+y)},
G:function(a,b){return a.gao()!=null},
w:{
wm:[function(a){return new E.o3("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","uH",2,0,4]}},o4:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},o5:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> <is> too slow",!0)}},o6:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bm:function(a,b,c){var z=new L.e2(null,null,null,null,null,null)
new L.ta(a,b,c).$1(z)
return z.p()},
fT:{"^":"c2;",
gaB:function(){return[X.tI(),F.tM(),O.ui(),G.ur(),E.uH()]},
gh:function(){return"SlashDefenseSituation"},
av:function(){var z=new L.e2(null,null,null,null,null,null)
z.m(this)
new L.oa().$1(z)
return z.p()}},
ta:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gaL().c=z
a.gaL().f=0
z=this.a.gi()
a.gaL().b=z
z=this.b.gi()
a.gaL().e=z
a.gaL().d=this.c
return a}},
oa:{"^":"a:0;",
$1:function(a){var z=a.gaL().f
if(typeof z!=="number")return z.ah()
a.gaL().f=z+1
return a}},
pO:{"^":"fT;cM:a<,i:b<,co:c<,cs:d<,T:e<",
a_:function(a){var z=new L.e2(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fT))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
e2:{"^":"d;a,b,c,d,e,f",
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
z=new L.pO(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bK:function(a,b){var z=new M.e3(null,null,null,null,null)
new M.tc(a,b).$1(z)
return z.p()},
fU:{"^":"aa;",
gaB:function(){return[O.tT()]},
gh:function(){return"SlashSituation"},
av:function(){var z=new M.e3(null,null,null,null,null)
z.m(this)
new M.ob().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.X(this.a)
return},
b_:function(a,b){return new H.K(a,new M.oc(this),[H.m(a,0)])}},
tc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb7().c=z
a.gb7().e=0
z=this.a.gi()
a.gb7().b=z
z=this.b.gi()
a.gb7().d=z
return a}},
ob:{"^":"a:0;",
$1:function(a){var z=a.gb7().e
if(typeof z!=="number")return z.ah()
a.gb7().e=z+1
return a}},
oc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pP:{"^":"fU;a,i:b<,c,T:d<",
a_:function(a){var z=new M.e3(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fU))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e3:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb7().c},
gT:function(){return this.gb7().e},
gb7:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb7().b
x=this.gb7().c
w=this.gb7().d
v=this.gb7().e
z=new M.pP(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",ln:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y
z=this.b
b.a1(z.gi(),new Q.lo())
y=J.e(z.gi(),100)
c.fL(0,"<subject> {cuts|slashes|slits} <object's> "+(y?"side":"{throat|neck|side}"),z,a.gY())
if(y)N.bx(c,z)
else N.bW(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga6()&&a.gY().gbl()},
w:{
w5:[function(a){return new Q.ln(null,!0,!0,!0,C.c,a,null)},"$1","tU",2,0,4]}},lo:{"^":"a:0;",
$1:function(a){a.sal(0)
return a}}}],["","",,K,{"^":"",mx:{"^":"A;K:c<,a2:d<,P:e<,L:f<,J:r<,b,a",
gh:function(){return"OnGroundParry"},
ga8:function(){return"parry it"},
gag:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ag(a))+"}}")
S.a9(new K.my(a,c),new K.mz(this,a,c),null,null)
b.aG()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
S:[function(a,b,c){a.bm(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ag(a))+"}",!0)
b.bd("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
H:function(a,b){var z
if(a.gO()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gv(z):null).gbe().bc(0.3)},
G:function(a,b){return a.gY().gce()},
w:{
wd:[function(a){return new K.mx(!1,!1,!0,C.c,"TODO",a,null)},"$1","up",2,0,4]}},my:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mz:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mA:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
ga8:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gag:function(){return"will <subject> block the strike?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bX(a)))
S.a9(new L.mB(a,c),new L.mC(a,c),new L.mD(this,a,c),null)
b.aG()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gM",6,0,1],
S:[function(a,b,c){var z=this.b
if(z.gar()){c.eu(0,"<subject> <is> out of balance",!0,!0,z)
c.cd(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iC())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bX(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.bX(a)),!0)
b.bd("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gN",6,0,1],
H:function(a,b){var z
if(a.gO()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gv(z):null).gbe().bc(0.5)},
G:function(a,b){return a.gao()!=null},
w:{
we:[function(a){return new L.mA("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","uq",2,0,4]}},mB:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mC:{"^":"a:2;a,b",
$0:function(){return this.a.an(this.b,"<subject> <is> too slow",!0)}},mD:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.c_(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",no:{"^":"A;J:c<,K:d<,a2:e<,P:f<,L:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga8:function(){return"roll out of way"},
gag:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to roll out of the way")
a.an(c,"<subject> can't",!0)
b.aG()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gM",6,0,1],
S:[function(a,b,c){a.eQ(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gO()===!0){b.a1(a.gi(),new Y.np())
a.bm(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bd("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gN",6,0,1],
H:function(a,b){var z
if(a.gO()===!0)return 1
z=b.f
return(z.length!==0?C.a.gv(z):null).gbe().bc(0.5)},
G:function(a,b){return!0},
w:{
wl:[function(a){return new Y.no(null,!1,!1,!0,C.c,a,null)},"$1","uC",2,0,4]}},np:{"^":"a:0;",
$1:function(a){a.saf(C.k)
return a}}}],["","",,V,{"^":"",
dO:function(a,b,c){var z=new V.dN(null,null,null,null,null,null)
new V.td(a,b,c).$1(z)
return z.p()},
fw:{"^":"c2;",
gaB:function(){return[K.up(),L.uq(),Y.uC()]},
gh:function(){return"OnGroundDefenseSituation"},
av:function(){var z=new V.dN(null,null,null,null,null,null)
z.m(this)
new V.mw().$1(z)
return z.p()}},
td:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
mw:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.ah()
a.gaJ().f=z+1
return a}},
pJ:{"^":"fw;cM:a<,i:b<,co:c<,cs:d<,T:e<",
a_:function(a){var z=new V.dN(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dN:{"^":"d;a,b,c,d,e,f",
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
z=new V.pJ(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
h4:function(a,b){var z=new D.e4(null,null,null,null,null)
new D.tf(a,b).$1(z)
return z.p()},
h3:{"^":"aa;",
gaB:function(){return[Q.tU()]},
gh:function(){return"StrikeDownSituation"},
av:function(){var z=new D.e4(null,null,null,null,null)
z.m(this)
new D.oT().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.X(this.a)
return},
b_:function(a,b){return new H.K(a,new D.oU(this),[H.m(a,0)])}},
tf:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gb8().c=z
a.gb8().e=0
z=this.a.gi()
a.gb8().b=z
z=this.b.gi()
a.gb8().d=z
return a}},
oT:{"^":"a:0;",
$1:function(a){var z=a.gb8().e
if(typeof z!=="number")return z.ah()
a.gb8().e=z+1
return a}},
oU:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pQ:{"^":"h3;a,i:b<,c,T:d<",
a_:function(a){var z=new D.e4(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e4:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb8().c},
gT:function(){return this.gb8().e},
gb8:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb8().b
x=this.gb8().c
w=this.gb8().d
v=this.gb8().e
z=new D.pQ(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",n0:{"^":"d;",
gbe:function(){switch(this.gco()){case C.m:return C.a3
case C.n:return $.$get$fA()
case C.r:return $.$get$fB()
default:throw H.c(P.E(this.gco()))}},
$isaa:1}}],["","",,K,{"^":"",dV:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",of:{"^":"ad;K:b<,P:c<,a2:d<,L:e<,a",
gU:function(){return""},
gJ:function(){return},
gh:function(){return"SlayMonstersAction"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gv(z):null
x=b.dT(y.gbD())
w=b.a
C.a.q(z,x.jU(b,y,new H.K(w,new D.og(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.H(z.length!==0?C.a.gv(z):null,"$isM").c}},og:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaR())if(a.gaZ().hb(this.a.gaZ())){z=a.gbD()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z}}}],["","",,Y,{"^":"",p2:{"^":"c4;K:c<,a2:d<,P:e<,L:f<,b,a",
gJ:function(){return},
gh:function(){return"TakeExitAction"},
R:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gM",6,0,1],
S:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaP())
y=b.f
H.H(y.length!==0?C.a.gv(y):null,"$isM").dD(b,a,z.gfY(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.H(z.length!==0?C.a.gv(z):null,"$isM").c===!0)return!1
this.b.gkl()
return!0},
w:{
wq:[function(a){return new Y.p2(!1,!0,!1,null,a,null)},"$1","vN",2,0,48]}}}],["","",,F,{"^":"",
fL:function(a,b){var z=new F.e0(null,null,null,null,null)
new F.t_(a,b).$1(z)
return z.p()},
M:{"^":"aa;",
gaB:function(){return[Y.vN()]},
gbN:function(){var z=[]
C.a.aw(z,$.$get$hU())
z.push($.$get$fX())
return z},
gdC:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
av:function(){var z=new F.e0(null,null,null,null,null)
z.m(this)
new F.nq().$1(z)
return z.p()},
aU:function(a,b){return b.a.aQ(0,new F.nr(),new F.ns())},
b_:function(a,b){var z=this.aU(null,b)
if(z==null)return[]
return[z]},
dD:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dT(c)
a.bZ(this.b,F.fL(z,!a.hM("TakeExitAction",b,!0).br(0,new F.nt(c))&&z.gjT()!=null))
if(this.im(a,b,z))z.hZ(b,a,d)
else{d.A(0,"\n\n",!0)
z.jI(b,a,d)
d.A(0,"\n\n",!0)}for(y=R.id(b,a),y=P.P(y,!0,H.y(y,"z",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.X(y[v].gi())
t=u.a_(new F.nu(z))
w.a0(0,u)
w.q(0,t)}},
hh:function(a,b){a.a.iG(new F.nv(),!0)},
dd:function(a){if(J.e(this.a,$.$get$eq().b))return!1
return!0},
im:function(a,b,c){var z,y
for(z=a.d,z=new P.eg(z,z.c,z.d,z.b,null,[H.m(z,0)]);z.t();){y=z.e
if(!J.e(y.gcZ(),b.gi()))continue
if(y.ges()!=="TakeExitAction")continue
if(J.eI(y.gaP(),c.gh())===!0)return!0}return!1}},
t_:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gaA().c=z
a.gaA().e=0
z=this.a.gh()
a.gaA().b=z
a.gaA().d=this.b
return a}},
nq:{"^":"a:0;",
$1:function(a){var z=a.gaA().e
if(typeof z!=="number")return z.ah()
a.gaA().e=z+1
return a}},
nr:{"^":"a:0;",
$1:function(a){return a.gO()===!0&&a.gaR()}},
ns:{"^":"a:2;",
$0:function(){return}},
nt:{"^":"a:0;a",
$1:function(a){return a.gfX()===this.a}},
nu:{"^":"a:0;a",
$1:function(a){a.sbD(this.a.b)
return a}},
nv:{"^":"a:0;",
$1:function(a){return!a.gba()}},
pN:{"^":"M;bD:a<,i:b<,c,T:d<",
a_:function(a){var z=new F.e0(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
e0:{"^":"d;a,b,c,d,e",
gbD:function(){return this.gaA().b},
sbD:function(a){this.gaA().b=a
return a},
gi:function(){return this.gaA().c},
skB:function(a){this.gaA().d=a
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
z=new F.pN(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
wF:[function(a,b,c){var z,y
z=R.b2(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.t,0,$.$get$ct())
y=z.y
a.gfJ().q(0,z)
return U.du(c,[z],"{rock|cavern} floor",b,P.ae([1,new O.tW(y),5,new O.tX(y),9,new O.tY(y),12,new O.tZ(y),17,new O.u_(y)]))},"$3","vS",6,0,10],
wG:[function(a,b,c){var z,y,x,w,v
z=$.$get$hM()
y=z.am(999999)
x=P.aZ(C.p,null)
w=$.$get$ct()
v=[R.b2(1000+y,"orc",O.de(),null,null,new G.b8("sword",1,1,!1,!0,!1,x),null,0,2,0,!1,2,!1,C.t,0,w),R.b2(1000+z.am(999999),"goblin",O.de(),null,null,new G.b8("scimitar",1,1,!1,!0,!1,P.aZ(C.p,null)),null,0,1,0,!1,1,!1,C.t,0,w)]
a.gfJ().aw(0,v)
return U.du(c,v,"{rock|cavern} floor",b,P.aL())},"$3","iJ",6,0,10],
wH:[function(a,b,c){var z,y,x
z=a.aN("talk_to_briana_3")?"guardian":"orc"
y=R.b2(6667,z,null,null,null,new G.b8("rusty sword",1,1,!1,!0,!1,P.aZ(C.p,null)),null,0,3,100,!1,3,!1,C.t,0,$.$get$ct())
x=y.y
a.a.q(0,y)
return U.du(c,[y],"{rock|cavern} floor",b,P.ae([1,new O.u1(x),9,new O.u2(x)]))},"$3","vT",6,0,10],
aT:function(a){return a.a.bA(0,new O.u4())},
u6:function(a){return a.a1(O.aT(a).gi(),new O.u7())},
u8:function(a,b){a.a1(O.aT(a).gi(),new O.u9(b))},
ev:function(a){var z=a.f
if(H.H(z.length!==0?C.a.gv(z):null,"$isM").c===!0)return!1
return C.a.a4(C.a0,H.H(z.length!==0?C.a.gv(z):null,"$isM").a)},
im:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gZ(z),x=new H.bO(y,new O.ul(),[H.m(z,0)]);x.t();){w=y.gI()
if(!w.gbb()){v=H.H(w.e,"$isb8")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.p,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.X(w.y)
r=s.a_(new O.um(new G.b8(y,x,u,!0,!0,!1,t)))
z.a0(0,s)
z.q(0,r)
break}}},
uy:function(a){var z=O.aT(a).gaC().cg(0,new O.uz())
a.a1(O.aT(a).gi(),new O.uA(z))},
ey:function(a,b){var z,y,x
z=H.H(a.c,"$iscK").b
if(z>=5)return
b.A(0,C.a1[z],!0)
y=H.H(a.c,"$iscK")
y.toString
x=new M.e7(null,!1,0,0)
x.m(y)
a.c=new O.uB().$1(x).p()},
ez:function(a,b,c,d){b.a1(a.gi(),new O.uG())
if(!d)c.q(0,"TODO: create fight")},
tW:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.X(z)
x=new G.b8("scimitar",1,1,!1,!0,!1,P.aZ(C.p,null))
y.ad(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ae(b,"<subject> draw<s> <subject's> <object>",x)
a.a1(z,new O.tV(x))
y.hu(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.aT(a),!0)}},
tV:{"^":"a:0;a",
$1:function(a){a.sY(this.a)
return a}},
tX:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).ad(b,"<subject> spit<s> on the cavern floor")}},
tY:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
b.fO()
z.dI(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.A(0,"\n\n",!0)}},
tZ:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
z.ad(b,"<subject> grit<s> <subject's> teeth")
z.an(b,"<subject> do<es>n't talk any more",!0)}},
u_:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).ad(b,"<subject> scowl<s> with pure hatred")}},
u1:{"^":"a:6;a",
$2:function(a,b){a.X(this.a).hu(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.aT(a),!0)}},
u2:{"^":"a:6;a",
$2:function(a,b){var z=a.X(this.a)
b.fO()
z.dI(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.A(0,"\n\n",!0)}},
u4:{"^":"a:0;",
$1:function(a){return a.gO()}},
u7:{"^":"a:0;",
$1:function(a){a.gaC().q(0,new Z.d_("spear",0,1,!1,!1,!1,P.aZ(C.a_,null)))
return a}},
u9:{"^":"a:0;a",
$1:function(a){var z=a.gbg()
if(typeof z!=="number")return z.ah()
a.sbg(z+this.a)
return a}},
ul:{"^":"a:0;",
$1:function(a){return J.e(a.gaZ(),$.$get$ew())}},
um:{"^":"a:0;a",
$1:function(a){a.sY(this.a)
return a}},
uz:{"^":"a:0;",
$1:function(a){return C.a.a4(a.geX(),C.q)}},
uA:{"^":"a:0;a",
$1:function(a){a.gaC().a0(0,this.a)
return a}},
uB:{"^":"a:0;",
$1:function(a){var z
a.gcv()
z=a.c
a.gcv()
a.c=z+1
return a}},
uG:{"^":"a:0;",
$1:function(a){a.sao(new E.bl("shield",P.aZ(C.Z,null)))
return a}}}],["","",,V,{"^":"",
lr:function(){var z=new V.dv(null,null,null)
new V.tn().$1(z)
return z.p()},
rY:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
rW:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The corpse lies still, getting cold.\n",!0)
O.ey(b,c)
c.A(0,"",!0)}},
o0:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"cave_with_agruth"))return!1
if(b.aN(this.d))return!1
return!0},
S:[function(a,b,c){c.A(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)",!0)
O.u8(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gK:function(){return!1}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n"We must stop this." \n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection."\n\n\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. You know  I survived 3 years even though  none other made it for more than a few months. I think he wants me for something."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not giving it to him. Giving him the exact opposite of what he wants."\n\n\nTODO: "you know we could just run as fast as we can, kicking some orcs in their faces along the way, right?" yes. But we won\'t. "yeah. We won\'t. \n\n\nWith that, you sheathe (weapon) and start down the road towards the black fort in the distance.\n',!0)}},
rV:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
rR:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The crevice is small.\n",!0)}},
rS:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
rP:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
rQ:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)
if(b.aN("guardpost_above_church_take_shield")&&!b.jf("guardpost_above_church_take_shield"))c.q(0,"The goblin's corpse is sprawled on the ground.")
else c.q(0,"The goblin is sleeping soundly.")
c.A(0,"",!0)}},
lq:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"guardpost_above_church"))return!1
if(b.dK(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.A(0,"TODO - take without waking the guard",!0)
O.ez(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gN",6,0,1],
R:[function(a,b,c){c.A(0,"TODO - start taking, guard is beginning to wake. You have to stay in an uncomfortable position for a minute before continuing",!0)
C.a.q(b.f,V.lr())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
H:function(a,b){return 0.8},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"TODO"},
gK:function(){return!1}},
f5:{"^":"aa;",
gbN:function(){return[new A.fR(new V.lt(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat.","guardpost_above_church_take_shield_rescue",!0,null),new A.fR(new V.lu(),"Snag the shield","TODO","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
av:function(){var z=new V.dv(null,null,null)
z.m(this)
new V.lv().$1(z)
return z.p()},
aU:function(a,b){if(a!==0)return
return b.a.bA(0,new V.lw())},
b_:function(a,b){return[a.bA(0,new V.lx())]}},
tn:{"^":"a:0;",
$1:function(a){var z=$.$get$a5().am(1073741823)
a.gbM().b=z
a.gbM().c=0
return a}},
lt:{"^":"a:26;",
$4:function(a,b,c,d){J.eH(c,"TODO - staying still, drops of sweat dripping on the guard, but ultimately the guard goes back to sleep and you take the shield",!0)
b.a1(a.gi(),new V.ls())
O.ez(a,b,c,!0)
b.aG()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
ls:{"^":"a:0;",
$1:function(a){var z=a.gbg()
if(typeof z!=="number")return z.as()
a.sbg(z-1)
return a}},
lu:{"^":"a:26;",
$4:function(a,b,c,d){J.eH(c,"TODO",!0)
O.ez(a,b,c,!1)
b.aG()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snag the shield)"}},
lv:{"^":"a:0;",
$1:function(a){var z=a.gbM().c
if(typeof z!=="number")return z.ah()
a.gbM().c=z+1
return a}},
lw:{"^":"a:0;",
$1:function(a){return a.gO()}},
lx:{"^":"a:0;",
$1:function(a){return a.gO()}},
rN:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. The fear has gone from her face during the short battle but the anger remains. She kicks the dead slaver in the hip. When she notices you looking at her, she looks back. "What?" she says flatly. You shrug.\n\n\n"When someone hurts me, I hurt them back," Briana says. "I am a simple person."\n\n\n"The world, on the other hand, is often not that simple and\u2026"\n\n\n"Oh, but it is," Briana intercepts, smoothing her hair and using the quickly forming pool of Agruth\'s blood as a mirror.\n\n\n"... and this one is already dead."\n\n\n"I was making sure."\n\n\nShe spits on the body and turns the attention to the sword. "You know, we should name the weapon\u2014it\'s the only thing we have going for us right now. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name. "That creature does not deserve another mention."\n',!0)}},
rO:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
ml:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.A(0,"You look at the sword. \"You're right. We'll call it Luck Bringer. It's our only chance to get out of this hell.\"\n\n\nBriana nods. \"Luck Bringer it is. Now let's just get out of here as quickly as possible\"",!0)
O.im(b,"Luck Bringer")
b.at("RoomRoamingSituation").dD(b,O.aT(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mm:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.A(0,'You look at the sword. "You\'re right. We\'ll call it Savior. It is our first step to freedom."\n\n\nBriana nods. "Savior it is. Now let\'s just get out of here as quickly as possible"',!0)
O.im(b,"Savior")
b.at("RoomRoamingSituation").dD(b,O.aT(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mk:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.A(0,"\"That's foolish. It's just a sword, after all.\"\n\n\nBriana shrugs. \"Whatever, just don't ever call it Agruth's. I already have more respect to the piece of iron than to that worthless animal over here. Now let's just get out of here as quickly as possible\"",!0)
b.at("RoomRoamingSituation").dD(b,O.aT(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rL:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO\n",!0)}},
rJ:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
rK:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
p3:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"orcthorn_room"))return!1
if(b.aN("talk_to_briana_3"))if(!b.aN(this.d))z=H.H(z.length!==0?C.a.gv(z):null,"$isM").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
S:[function(a,b,c){c.A(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."',!0)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rG:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO\n",!0)}},
rH:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO\n",!0)}},
od:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"slave_quarters"))return!1
return!0},
S:[function(a,b,c){c.A(0,"TODO FIGHT",!0)
b.aG()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rE:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rF:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The small door is TODO open/close.\n",!0)}},
oe:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"slave_quarters_passage"))return!1
if(!b.aN(this.d))z=H.H(z.length!==0?C.a.gv(z):null,"$isM").c!==!0
else z=!1
if(!z)return!1
return!0},
S:[function(a,b,c){c.A(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."',!0)
return H.b(a.gh())+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rC:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"A blast of smoke and heat greets you as you enter this room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These is the smelter.\n\n\nOrc teams tilt huge kettles of molten steel into troughs that lead the white-hot liquid across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready steel into troughs that lead to the war forges below. \n\n\nHe's no more than a spear's throw away from you, but doesn't notice. In fact, he may well be blind, with all the molten steel around him. The orcs are much farther away and too busy to look around.\n\n\nA small crevice appears to be sucking the hot air. TODO describe  other exits\n",!0)}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n",!0)}},
oh:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"smelter"))return!1
if(!(!b.aN(this.d)&&b.aN("war_forge_look_around")&&O.aT(b).h7(C.q)))return!1
return!0},
S:[function(a,b,c){c.A(0,"throwing spear at the orc that holds the molten steel gate\n\n\nWhy would you do that? You just wasted a perfectly good spear on a stupid ogre that posed no threat to us.\n\n\nWatch.\n\n\n(molten steel ruins everything)\n\n\nThe less simple you see the world, the easier it is for you to change it. \n\n\nYou got lucky. \n\n\nThat was some throw! That thing downstairs.. I don't know what it is but I would not want to meet it in battle. - it is probably meant to scale castle walls. - so, fort ironcast. One well placed spear may have prevented the fall of Ironcast. - delayed. - what? - we delayed the fall of the fort, at best.",!0)
O.uy(b)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rA:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rB:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
p5:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){if(!(b.dK(this.d)==null&&O.ev(b)))return!1
return!0},
S:[function(a,b,c){c.A(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
p6:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){if(!(b.aN("talk_to_briana_1")&&b.dK(this.d)==null&&O.ev(b)))return!1
return!0},
S:[function(a,b,c){c.A(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
p7:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){if(!(b.aN("talk_to_briana_2")&&b.dK(this.d)==null&&O.ev(b)))return!1
return!0},
S:[function(a,b,c){c.A(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ry:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rz:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
tp:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
tq:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n\n\nAfter a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
to:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The Underground Church stands silent, as if holding breath.\n",!0)
O.ey(b,c)
c.A(0,"",!0)}},
l_:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church"))return!1
if(b.aN(this.d))return!1
return!0},
S:[function(a,b,c){c.A(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\nBriana: "So this is it? This is where the Dead Prince resides?"\n\n\n"This is one of many of these temples inside the mountain. So I think not."\n\n\n"So where is he? Everyone knows he\'s from Mt. Bloodrock."\n\n\n"The Dead Prince is _somewhere_ here, that\'s correct. But where exactly? The orcs say the whole mountain is his vessel. Whatever that means."\n\n\nThe glow coming from the altar dims for a moment, then lights up again.',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rT:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'TODO - altar, "you are brave, my friend. Or stupid. So am I for following you.", "We are way over our head here." , eight black eyes, spear that some goblin must have forgotten here, there is motion behind the altar (wait)\n',!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The altar glows with a dim red light that reflect in the eight black eyes above it.\n",!0)}},
pm:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church_altar"))return!1
if(b.aN(this.d))return!1
return!0},
S:[function(a,b,c){c.A(0,'TODO - build up with sounds\n\n\nA lich orc enters from a steel door on the right of the altar and the whole temple sounds a tone that is powerful and sickening at the same time. After the lich, a huge creature enters through the door, crouching below the door\'s frame. It\'s unclear what it is, but perhaps some large breed of ogre, and judging by the braided hair, a female. Her sword is as long as you are tall, but she doesn\'t wield it. She leads someone on a chain. An orc. Despite being a strong one, probably captain or even chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nTODO: the lich will take him on the altar. Aren says \'maggots\', somehow he knows. From underneath the altar, a large horde of maggots appears. The orc tries to escape, horrified, but the ogre pin him. The maggots crawl all over the orc, and as he screams, the church reacts with tones. The lich raises his hands as if in offering. Somehow, Aren find the whole experience invigorating (+2 stamina). Once the orc is dead, rychl\xfd process. Ogre drag the body. Leave. Briana : "how did you know it will be maggots?". Aren : "I\'ll explain when we get out of here." Briana : "And if it was meant to be an offering, why did they not leave the body?" Aren : "that I don\'t know"\n\n\nTODO: foreshadow \'special connection\' via "This place does something weird to people" - "I know" - "And I don\'t mean the abuse" - "I know"',!0)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
p4:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church_altar"))return!1
if(b.aN(this.d))return!1
return!0},
S:[function(a,b,c){c.A(0,"TODO - a forgotten, orcish spear",!0)
O.u6(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rx:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\nOne side of the cave is artificial, like a room's wall, and beyond that is the smelter. From an opening high on the wall, troughs of molten steel descend into all parts of the room like huge fiery tentacles. At the end of each, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The strong smell of iron and soot almost overcomes all the orc sweat.\n\n\n\n\nYou and Briana duck behind some carts on a walkway way above the floor of the cave. You can guess which corridor leads to the smelter. It's up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n",!0)}},
rI:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The air in the war forges is heavy and the noise overwhelming.\n",!0)
O.ey(b,c)
c.A(0,"",!0)}},
pn:{"^":"Y;U:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"war_forge"))return!1
if(b.aN(this.d))return!1
return!0},
S:[function(a,b,c){c.A(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.',!0)
return H.b(a.gh())+" successfully performs WarForgeLookAround"},"$3","gN",6,0,1],
R:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
H:function(a,b){return 1},
gP:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pE:{"^":"f5;i:a<,T:b<",
a_:function(a){var z=new V.dv(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gB:function(a){return Y.U(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dv:{"^":"d;a,b,c",
gi:function(){return this.gbM().b},
gT:function(){return this.gbM().c},
gbM:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbM().b
x=this.gbM().c
z=new V.pE(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
wE:[function(a){var z,y
z=$.$get$di()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","uE",2,0,15],
wI:[function(a){$.et=a},"$1","uF",2,0,15],
i1:[function(a,b,c,d,e,f,g){var z=L.eV(a,!1,!1,d,e,f,g)
$.$get$bV().q(0,z)
return z},function(a){return O.i1(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i1(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uD",2,13,51,0,0,0,1,1,0],
nC:{"^":"nO;",
bz:function(){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bz=P.aw(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cl){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.op()
m.toString
l=new A.v(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.F(0,$.q,null,[null]).bB(!0)}if(t.r){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.E())
t.r=!1
m=t.Q
m.toString
n=new A.v(60,null,null,null,null)
n.b=t.f.ct(0)
m.a.F(n.E())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.E())
w=7
z=10
return P.av(t.cE(),$async$bz)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.B(j)
if(n instanceof M.cC){r=n
q=H.D(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.v(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.E())
z=1
break}else{p=n
o=H.D(j)
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
return P.aE($async$bz,y)},
eS:function(){var z,y
this.fs()
this.f.b9(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hr(Z.bM())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bM()
z.a.F(y.E())
this.bz()},
lf:[function(a){var z,y
z={}
z.a=null
y=$.$get$bV()
y.W(0,new O.nZ(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iX(z)
this.bz()},"$1","giI",2,0,32],
iX:function(a){var z
if(a.gh1()!=null){z=a.r
$.$get$cr().az(z)}z=a.x
if(z!=null)this.en(z)},
cE:function(){var z=0,y=P.az(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cE=P.aw(function(a,a0){if(a===1)return P.aC(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cs()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.v(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dH()
r=v.Q
q=p.gjv()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.F(0,$.q,null,[null])
r.bB(null)
r.c1(new O.nP(v))
x=!0
z=1
break}m=v.x===v.e.gax().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gax().length){r=v.e.gax()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.f(r,o)
z=1
break}o=!!J.o(r[o]).$isN
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.v(667,null,null,null,null)
k.c=r
o.a.F(k.E())
k=$.$get$bV()
k.iF(new O.nQ(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.y(k,"b6",0)
o=P.P(new H.K(k,new O.nR(u,l),[o]),!0,o)
r=k.a
H.p([],[L.a7])
j=new L.eW(r,o)
if(!j.gV(j)){u=v.Q
r=u.e
if(r!=null){r.dw(new D.c0("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cm(new P.F(0,$.q,null,[r]),[r])
r=j.dN()
u.a.F(r.E())
u=u.e.a.c1(v.giI())
i=new O.nS(v)
r=H.m(u,0)
q=$.q
if(q!==C.h){i=P.em(i,q)
q.toString}u.dh(new P.ee(null,new P.F(0,q,null,[r]),6,new O.nT(),i,[r,r]))
x=!0
z=1
break}else{h=k.aQ(0,new O.nU(),new O.nV())
if(h!=null){if(h.gh1()!=null){r=h.r
$.$get$cr().az(r)}r=h.x
if(r!=null)v.en(r)
k.a0(0,h)}}}r=$.$get$cr()
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
return P.av(v.cF(f),$async$cE)
case 5:x=a0
z=1
break
case 4:r=$.et
if(r!=null){v.en(r)
$.et=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gax().length-1
v.x=r}else if($.hO)$.hO=!1
else{++r
v.x=r}u.a=r===v.e.gax().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gax().length){u=v.Q
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
break}r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.a0
u.f=new P.cm(new P.F(0,$.q,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c1(new O.nW(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.o(r[q]).$isN?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.F(q.E())
try{r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jt(r[q])}catch(b){u=H.B(b)
if(u instanceof M.cC){t=u
s=H.D(b)
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
if(k.br(0,new O.nX(u,v))&&v.x===v.e.gax().length-1){u=v.Q
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
case 11:r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.as]}
z=H.ax(q,r)?12:14
break
case 12:d=v.x===v.e.gax().length-1?v.e5():null
q=v.e.gax()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.av(v.cF(H.i9(q[o],r)),$async$cE)
case 15:c=a0
if(k.br(0,new O.nY(u,v))&&v.x===v.e.gax().length-1){u=v.Q
u.toString
r=d.eV(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gax()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.x("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aD(x,y)}})
return P.aE($async$cE,y)},
en:function(a){var z,y,x,w,v
z=$.$get$cG()
if(z.b.test(H.bu(a))){y=this.d
if(y==null)throw H.c(new P.x("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.as()
w=z-1}else{x=this.b.dS(a,this.e.gdU())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a4(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghD()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghD()
else z=!1}else z=!1
$.hL=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.F(v.E())
v=this.e
this.d=new O.nD(v,this.x)
this.e=x
this.x=w
v.e=J.an(v.gdO(),1)},
fs:function(){var z,y,x,w,v,u
this.x=null
$.$get$cr().b9(0)
$.$get$bV().sl(0,0)
$.rc=null
x=$.$get$cw()
x.b9(0)
w=$.$get$cs()
x.n(0,"points",w)
w.a=0
w.b.b9(0)
this.b.jx()
$.ij=!0
try{this.kf()}catch(v){z=H.B(v)
y=H.D(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hm()
$.ij=!1},
cF:function(a){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cF=P.aw(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$di()
q.C=""
w=4
z=7
return P.av(a.$0(),$async$cF)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.B(m)
r=H.D(m)
q.C+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cC(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.f3(J.h(q)).c1(new O.o_(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aD(x,y)
case 2:return P.aC(v,y)}})
return P.aE($async$cF,y)},
iP:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cG().b.test(H.bu(z)))return!1
y=this.b.dS(z,this.e.gdU())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl6()
return!1},"$1","gfw",2,0,33],
e5:function(){var z,y,x,w,v,u
this.hm()
try{x=this.e.gh()
w=$.$get$cw()
x=new Z.fM(x,this.b.jS(),null,null,null,null)
x.c=H.aH(Z.cY(w),"$isG",[P.r,P.d],"$asG")
x.f=Date.now()
x.e=C.e.l3(H.aA(x),16)
return x}catch(v){z=H.B(v)
y=H.D(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
hc:function(a,b){var z,y,x
this.fs()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dw("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.E())
z.kc(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.E())
this.f.aw(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.E())
y=$.$get$cw()
Z.nz(a,y,P.dG(P.r,P.bC))
this.cx=H.H(y.j(0,"game"),"$isf0")
this.cy=H.aH(y.j(0,"hitpoints"),"$isat",[P.aS],"$asat")
z=[P.t]
this.db=H.aH(y.j(0,"stamina"),"$isat",z,"$asat")
this.dx=H.aH(y.j(0,"gold"),"$isat",z,"$asat")
z=this.Q
Z.hr(Z.bM())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bM()
z.a.F(y.E())
y=this.Q
y.toString
z=new A.v(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.E())
this.bz()},
kw:function(a){return this.hc(a,null)},
dW:[function(a,b,c,d){var z=0,y=P.az(),x,w=this,v,u,t
var $async$dW=P.aw(function(e,f){if(e===1)return P.aC(f,y)
while(true)switch(z){case 0:v=$.$get$di()
if(v.C.length!==0){w.Q.f3(J.h(v))
v.C=""}v=w.Q
v.toString
u=new A.v(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.cj
t=new P.F(0,$.q,null,[u])
v.x=new P.cm(t,[u])
x=t
z=1
break
case 1:return P.aD(x,y)}})
return P.aE($async$dW,y)},function(a,b){return this.dW(a,b,null,!1)},"lb","$4$rerollEffectDescription$rerollable","$2","gi_",4,5,44,1,0]},
nZ:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf4(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cG().b.test(H.bu(z))?y.d.a:y.b.dS(z,y.e.gdU())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
nP:{"^":"a:0;a",
$1:function(a){return this.a.bz()}},
nQ:{"^":"a:0;a",
$1:function(a){return a.gf4()||this.a.iP(a)}},
nR:{"^":"a:35;a,b",
$1:function(a){return a.km(this.b,this.a.a)}},
nS:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
nT:{"^":"a:0;",
$1:function(a){return a instanceof D.c0}},
nU:{"^":"a:0;",
$1:function(a){return a.gkn()}},
nV:{"^":"a:2;",
$0:function(){return}},
nW:{"^":"a:0;a",
$1:function(a){return this.a.bz()}},
nX:{"^":"a:0;a,b",
$1:function(a){return a.dA(!0,this.a.a,this.b.gfw())}},
nY:{"^":"a:0;a,b",
$1:function(a){return a.dA(!0,this.a.a,this.b.gfw())}},
o_:{"^":"a:0;a",
$1:function(a){return this.a.bz()}},
mX:{"^":"d;a,b,fU:c<",
jj:function(a,b,c){var z
if(!$.hL){z=J.an(this.a,b)
this.a=z
this.b.az(new A.cT(b,z,c))}},
q:function(a,b){return this.jj(a,b,null)},
ah:function(a,b){this.q(0,b)
return this},
E:function(){return P.ae(["points",this.a])},
hC:function(a){this.a=a.j(0,"points")
this.b.b9(0)},
ia:function(){this.b=P.b7(null,A.cT)},
$ise1:1},
cZ:{"^":"mG;ax:d<,dO:e@,a,b,c",
ghD:function(){return J.a6(this.e,0)}},
nD:{"^":"d;a,b"},
nK:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dS:function(a,b){var z
if(b!=null&&this.a.a9(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a9(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jS:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,null])
this.a.W(0,new O.nM(z))
return z},
kc:function(a){a.W(0,new O.nN(this))},
jx:function(){this.a.W(0,new O.nL())}},
nM:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.ae(["visitCount",b.gdO()]))}},
nN:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.a9(a))z.j(0,a).sdO(J.ay(b,"visitCount"))}},
nL:{"^":"a:6;",
$2:function(a,b){b.sdO(0)}}}],["","",,M,{"^":"",cC:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
w:{
eP:function(a){return new M.cC(a,null,null)}}}}],["","",,M,{"^":"",nO:{"^":"d;"}}],["","",,Z,{"^":"",fM:{"^":"d;a,b,c,d,e,f",
eV:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dM()
return z},
dM:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.r,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.h_(z)},
k:function(a){return this.dM()},
w:{
fN:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isN||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise1},
cY:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fN(z.j(a,x)))y.push(Z.cY(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.W(a,new Z.ny(a,w))
return w}else if(!!z.$ise1){v=a.E()
v.n(0,"_class",a.gfU())
return Z.cY(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cX:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cX(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a9("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.W(a,new Z.nx(b,v))
return v}else if(w&&a.a9("_class"))if(c!=null){c.hC(a)
return c}else{u=z.j(a,"_class")
if(!b.a9(u))throw H.c(new Z.dw("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nz:function(a,b,c){a.c.W(0,new Z.nA(b,c))}}},ny:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fN(this.a.j(0,a)))this.b.n(0,a,Z.cY(b))}},nx:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.cX(b,this.a,null))}},nA:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cX(b,x,null))
else z.n(0,a,Z.cX(b,x,y))}},dw:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lE:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",n2:{"^":"d;"},n1:{"^":"n2;"},lM:{"^":"n1;a,b,c,d,e,f,r,x",
lj:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.r
n=[o,P.d]
H.aH(a,"$isG",n,"$asG")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.a9("strContent"))m.c=a.j(0,"strContent")
if(a.a9("listContent"))m.b=a.j(0,"listContent")
if(a.a9("intContent"))m.d=a.j(0,"intContent")
if(a.a9("mapContent"))m.e=H.aH(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghA()){case 1070:o=this.e
if(o!=null){o.dw(new D.c0("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bs()
o.b.bs()
return
case 1000:o=new A.v(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.E())
n.F(new A.v(10,null,this.c.ch,null,null).E())
return
case 1050:l=z.gkg()
this.e.bV(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.E())
o=z.gky()
if(!o.a9("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cz())
n.bR(new G.kb(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.E())
k=J.ay(z.geM(),0)
j=J.ay(z.geM(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bV(new U.cj(C.C[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.dw(new D.c0("Book Restart before choice was selected."))
this.e=null}try{this.c.eS()}catch(i){y=H.B(i)
x=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.v(90,null,null,null,null)
o.b=Z.bM()
n.F(o.E())
n.F(new A.cT(0,0,null).dN().E())
return
case 1020:h=new A.v(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.dw(new D.c0("Book Load before choice was selected."))
this.e=null}try{h=z.gi3()
f=new Z.fM(null,null,null,null,null,null)
e=H.aH(C.w.jE(h),"$isG",n,"$asG")
if(!e.a9("currentPageName")||!e.a9("vars"))H.i(new Z.lE("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aH(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aH(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a9("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aH(J.iU(z.geM()),"$isbJ",[o],"$asbJ")
o=this.c
if(v!=null)o.hc(w,v)
else o.kw(w)}catch(i){o=H.B(i)
if(o instanceof Z.dw){u=o
t=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eS()}else{s=o
r=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eS()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bM()
g.F(o.E())}catch(i){q=H.B(i)
p=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cT(0,$.$get$cs().a,null).dN().E())
return
case 1090:this.f.bV(!0)
this.f=null
return
case 1040:this.c.bz()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghA())+"."
this.a.F(o.E())}},"$1","giV",2,0,22],
f3:function(a){var z=P.a0
this.f=new P.cm(new P.F(0,$.q,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c0:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kb:{"^":"d;a",
E:function(){return P.cd(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;hA:a<,eM:b<,i3:c<,kg:d<,ky:e<",
gl5:function(){var z=this.a
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
dM:function(){return C.w.h_(this.E())},
E:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
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
z="Message "+this.gl5()
y=this.a
x=J.o(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mG:{"^":"d;h:a@,l6:b<",
k:function(a){return this.a},
gdU:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iP(z,": ")
if(y>0)return J.iT(this.a,0,y)
else return}}}],["","",,A,{"^":"",cT:{"^":"d;jv:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dN:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a7:{"^":"d;f4:a@,b,c,d,b1:e<,J:f<,h1:r<,x,y",
gkn:function(){return this.e.length===0},
dA:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
km:function(a,b){return this.dA(a,b,null)},
l1:function(){return P.ae(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c1:function(a){this.r=a
return this},
bC:function(a,b){return C.b.bC(this.e,b.gb1())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i7:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bd(a).eW(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.a7]},
w:{
eV:function(a,b,c,d,e,f,g){var z=new L.a7(!1,null,null,null,null,e,null,d,g)
z.i7(a,!1,!1,d,e,f,g)
return z}}},eW:{"^":"fl;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
jt:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.ay(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbC}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.B(u)
v=M.eP(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.as]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.ay(y,"string")!=null&&!!J.o(J.ay(y,"string")).$isbC)try{x=J.ay(y,"string").$0()}catch(u){w=H.B(u)
v=M.eP(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.ay(y,"goto")
p=H.i9(J.ay(y,"script"),t)
o=new L.a7(!1,null,null,null,null,null,null,q,J.ay(y,"submenu"))
if(r==null)H.i(P.E("String given to choice cannot be null."))
o.e=J.bd(r).eW(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
jp:function(a,b,c,d,e,f,g){if(b instanceof L.a7)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eV(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.jp(a,b,!1,!1,null,null,null)},
l2:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.P(new H.K(z,new L.jQ(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.W(x,new L.jR(w))
return w},
dN:function(){return this.l2(null,null,null,null)},
k:function(a){var z=this.b
return new H.ap(z,new L.jS(),[H.m(z,0),null]).cj(0,", ")},
$asfl:function(){return[L.a7]},
$asfu:function(){return[L.a7]},
$asN:function(){return[L.a7]},
$asX:function(){return[L.a7]}},jQ:{"^":"a:0;a,b,c",
$1:function(a){return a.dA(this.b,this.a,this.c)}},jR:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dj(this.a.b,a.l1())
a.a=!0}},jS:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d0:{"^":"d;de:a<,b1:b<",
E:function(){return P.ae(["show",this.a,"string",this.b])}},om:{"^":"d;a",
E:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
this.a.W(0,new Z.on(z))
return z},
W:function(a,b){this.a.W(0,b)}},on:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hq:{"^":"d;h:a@,aP:b<,fV:c<,dG:d<,de:e<,hg:f<,b1:r<",w:{
hr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hq])
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
z[w]=new Z.hq(s,r,q,p,o,n,t);++w}C.a.c9(z,new Z.pj())
return z}}},pj:{"^":"a:6;",
$2:function(a,b){return J.by(b.gdG(),a.gdG())}},at:{"^":"d;h:a<,aP:b<,c,fV:d<,dG:e<,f,r,hg:x<,fS:y@,fU:z<,$ti",
gab:function(){return this.f},
sab:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cl=!0}},
gde:function(){return this.r},
gb1:function(){return this.c.$1(this.f)},
E:function(){return P.ae(["name",this.a,"value",this.f,"show",this.r])},
hC:function(a){var z
this.sab(H.iz(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cl=!0}},
$ise1:1,
w:{
bL:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d1()
y=z.a9(a)?H.aH(z.j(0,a),"$isat",[h],"$asat"):new Z.at(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iz(e,h)
y.r=!0
z.n(0,a,y)
return y},
op:function(){var z,y
z=new Z.om(new H.R(0,null,null,null,null,null,0,[P.r,Z.d0]))
y=$.$get$d1().gcu()
new H.K(y,new Z.oq(),[H.y(y,"z",0)]).W(0,new Z.or(z))
$.cl=!1
return z},
bM:function(){var z=H.p([],[[P.G,P.r,P.d]])
$.$get$d1().gcu().W(0,new Z.oo(z))
return z}}},oq:{"^":"a:0;",
$1:function(a){return a.gfS()}},or:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gde()
y=a.gb1()
a.sfS(!1)
this.a.a.n(0,a.a,new Z.d0(z,y))}},oo:{"^":"a:25;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaP())
z.n(0,"color",a.gfV())
z.n(0,"priority",a.gdG())
z.n(0,"show",a.gde())
z.n(0,"notifyOnChange",a.ghg())
z.n(0,"string",a.gb1())
this.a.push(z)}}}],["","",,N,{"^":"",dI:{"^":"d;h:a<,b,c,iv:d<,e,f",
gh3:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh3()+"."+x},
geL:function(){if($.ii){var z=this.b
if(z!=null)return z.geL()}return $.rk},
kx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geL().b){if(!!J.o(b).$isbC)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.ux.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.B(u)
y=H.D(u)
d=y
if(c==null)c=z}e=$.q
x=b
w=this.gh3()
t=c
s=d
r=Date.now()
q=$.fm
$.fm=q+1
p=new N.mc(a,x,v,w,new P.cJ(r,!1),q,t,s,e)
if($.ii)for(o=this;o!=null;){o.fC(p)
o=o.b}else $.$get$fo().fC(p)}},
cl:function(a,b,c,d){return this.kx(a,b,c,d,null)},
jY:function(a,b,c){return this.cl(C.T,a,b,c)},
aj:function(a){return this.jY(a,null,null)},
jX:function(a,b,c){return this.cl(C.S,a,b,c)},
bk:function(a){return this.jX(a,null,null)},
jW:function(a,b,c){return this.cl(C.U,a,b,c)},
bO:function(a){return this.jW(a,null,null)},
ke:function(a,b,c){return this.cl(C.B,a,b,c)},
ha:function(a){return this.ke(a,null,null)},
l7:function(a,b,c){return this.cl(C.X,a,b,c)},
eY:function(a){return this.l7(a,null,null)},
hY:function(a,b,c){return this.cl(C.W,a,b,c)},
dV:function(a){return this.hY(a,null,null)},
fC:function(a){},
w:{
bh:function(a){return $.$get$fn().kK(a,new N.t4(a))}}},t4:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.df(z,"."))H.i(P.E("name shouldn't start with a '.'"))
y=C.b.ku(z,".")
if(y===-1)x=z!==""?N.bh(""):null
else{x=N.bh(C.b.aH(z,0,y))
z=C.b.bJ(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.r,N.dI])
w=new N.dI(z,x,null,w,new P.ht(w,[null,null]),null)
if(x!=null)x.giv().n(0,z,w)
return w}},aX:{"^":"d;h:a<,ab:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aX&&this.b===b.b},
aV:function(a,b){return C.e.aV(this.b,b.gab())},
d8:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b<=z},
bn:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b>z},
bQ:function(a,b){return this.b>=b.gab()},
bC:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b-z},
gB:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.aX]}},mc:{"^":"d;eL:a<,b,aS:c<,d,T:e<,f,bt:r<,bp:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bw:function(a){return X.d9(J.iM(a,0,new X.ua()))},
b0:function(a,b){var z=J.an(a,b)
if(typeof z!=="number")return H.w(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d9:function(a){if(typeof a!=="number")return H.w(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
ua:{"^":"a:6;",
$2:function(a,b){return X.b0(a,J.j(b))}},
dR:{"^":"c8;a,$ti",
gab:function(){var z=this.a
if(z==null)throw H.c(new P.x("value called on absent Optional."))
return z},
bc:function(a){var z=this.a
return z==null?a:z},
gZ:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.be(z,1,0,null,[H.m(z,0)])}else z=C.I
return z},
gB:function(a){return J.j(this.a)},
u:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dR){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
i9:function(a,b){if(this.a==null)throw H.c(P.E("Must not be null."))},
w:{
fy:function(a,b){var z=new X.dR(a,[b])
z.i9(a,b)
return z}}}}],["","",,U,{"^":"",cW:{"^":"d;a,b",
k:function(a){return this.b}},cj:{"^":"d;a,l8:b<",
geI:function(){return this.a===C.E},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.cj&&b.a===this.a&&J.e(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
wJ:[function(a,b){var z,y,x,w,v
z=new D.lM(b,null,null,null,null,null,null,null)
y=$.fJ
$.fJ=y+1
x=new H.ch(y,null,!1)
w=init.globalState.d
w.e_(y,x)
w.cL()
w=new H.ni(x,null)
w.ib(x)
z.b=w
w=w.b
w.toString
new P.d3(w,[H.m(w,0)]).aD(z.giV(),null,null,null)
b.F(new H.cp(z.b.a,init.globalState.d.a))
v=N.nF()
z.c=v
v.Q=z},"$2","i4",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fc.prototype
return J.fb.prototype}if(typeof a=="string")return J.cc.prototype
if(a==null)return J.fd.prototype
if(typeof a=="boolean")return J.fa.prototype
if(a.constructor==Array)return J.ca.prototype
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.aG=function(a){if(a==null)return a
if(a.constructor==Array)return J.ca.prototype
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.cc.prototype
if(a==null)return a
if(a.constructor==Array)return J.ca.prototype
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.al=function(a){if(typeof a=="number")return J.cb.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.es=function(a){if(typeof a=="number")return J.cb.prototype
if(typeof a=="string")return J.cc.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.bd=function(a){if(typeof a=="string")return J.cc.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bo.prototype
return a}
J.an=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.es(a).ah(a,b)}
J.b1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.al(a).d6(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).u(a,b)}
J.a6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.al(a).bn(a,b)}
J.bY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.al(a).aV(a,b)}
J.bZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.es(a).c6(a,b)}
J.iK=function(a){if(typeof a=="number")return-a
return J.al(a).f1(a)}
J.by=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.al(a).as(a,b)}
J.ay=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).j(a,b)}
J.dj=function(a,b){return J.aG(a).q(a,b)}
J.iL=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aG(a).ji(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.eH=function(a,b,c){return J.aG(a).A(a,b,c)}
J.bz=function(a,b){return J.es(a).bC(a,b)}
J.eI=function(a,b){return J.J(a).a4(a,b)}
J.eJ=function(a,b){return J.aG(a).ap(a,b)}
J.iM=function(a,b,c){return J.aG(a).bu(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.eK=function(a){return J.J(a).gV(a)}
J.ah=function(a){return J.aG(a).gZ(a)}
J.iN=function(a){return J.aG(a).gv(a)}
J.aI=function(a){return J.J(a).gl(a)}
J.iO=function(a){return J.o(a).gby(a)}
J.iP=function(a,b){return J.J(a).aY(a,b)}
J.eL=function(a,b){return J.aG(a).aE(a,b)}
J.iQ=function(a,b,c){return J.bd(a).hd(a,b,c)}
J.dk=function(a,b,c){return J.bd(a).kO(a,b,c)}
J.cx=function(a,b,c){return J.bd(a).d_(a,b,c)}
J.iR=function(a){return J.al(a).hv(a)}
J.iS=function(a,b){return J.aG(a).dX(a,b)}
J.eM=function(a,b){return J.bd(a).df(a,b)}
J.iT=function(a,b,c){return J.bd(a).aH(a,b,c)}
J.iU=function(a){return J.aG(a).bG(a)}
J.h=function(a){return J.o(a).k(a)}
J.c_=function(a,b){return J.al(a).bf(a,b)}
J.iV=function(a,b){return J.aG(a).c4(a,b)}
I.aU=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.L=J.aW.prototype
C.a=J.ca.prototype
C.M=J.fa.prototype
C.u=J.fb.prototype
C.e=J.fc.prototype
C.N=J.fd.prototype
C.j=J.cb.prototype
C.b=J.cc.prototype
C.F=new A.ao(0,0,0)
C.G=new A.ao(-1/0,-1/0,-1/0)
C.H=new A.cz(-10,0,100)
C.I=new H.kV([null])
C.J=new P.mF()
C.v=new P.qc()
C.K=new P.qv()
C.h=new P.qK()
C.x=new P.b4(0)
C.y=new U.cO(0,"ItemType.fist")
C.z=new U.cO(1,"ItemType.shield")
C.q=new U.cO(2,"ItemType.spear")
C.A=new U.cO(3,"ItemType.sword")
C.O=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.lR(null,null)
C.P=new P.lT(null)
C.Q=new P.lU(null,null)
C.R=new O.m1(0,"KnownToMode.all")
C.S=new N.aX("FINER",400)
C.T=new N.aX("FINEST",300)
C.U=new N.aX("FINE",500)
C.B=new N.aX("INFO",800)
C.V=new N.aX("OFF",2000)
C.W=new N.aX("SEVERE",1000)
C.X=new N.aX("WARNING",900)
C.E=new U.cW(0,"Result.success")
C.a6=new U.cW(1,"Result.failure")
C.a7=new U.cW(2,"Result.criticalSuccess")
C.a8=new U.cW(3,"Result.criticalFailure")
C.C=I.aU([C.E,C.a6,C.a7,C.a8])
C.Y=I.aU([C.y])
C.Z=I.aU([C.z])
C.a_=I.aU([C.q])
C.p=I.aU([C.A])
C.d=I.aU([])
C.a0=I.aU(["cave_with_agruth","guardpost_above_church","orcthorn_door","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a1=I.aU(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a2=new H.k0(0,{},C.d,[null,null])
C.a3=new X.dR(null,[P.L])
C.k=new R.dU(0,"Pose.standing")
C.i=new R.dU(1,"Pose.offBalance")
C.f=new R.dU(2,"Pose.onGround")
C.m=new K.dV(0,"Predetermination.none")
C.r=new K.dV(1,"Predetermination.successGuaranteed")
C.n=new K.dV(2,"Predetermination.failureGuaranteed")
C.t=new Y.ce("he","him","his","himself")
C.l=new Y.ce("it","it","its","itself")
C.a4=new Y.ce("she","her","her","herself")
C.a5=new Y.ce("they","them","their","themselves")
C.D=new Y.ce("you","you","your","yourself")
C.c=new Q.nn(0,"Resource.stamina")
C.a9=H.bb("fe")
C.aa=H.bb("as")
C.ab=H.bb("r")
C.ac=H.bb("a0")
C.ad=H.bb("aS")
C.o=H.bb("dynamic")
C.ae=H.bb("t")
C.af=H.bb("L")
C.ag=new P.bP(null,2)
$.fJ=1
$.fC="$cachedFunction"
$.fD="$cachedInvocation"
$.aJ=0
$.bA=null
$.eR=null
$.br=null
$.bS=null
$.bT=null
$.ek=!1
$.q=C.h
$.f3=0
$.et=null
$.hL=!1
$.rc=null
$.hO=!1
$.ij=!0
$.cl=!1
$.ii=!1
$.ux=C.V
$.rk=C.B
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
I.$lazy(y,x,w)}})(["f7","$get$f7",function(){return H.lK()},"f8","$get$f8",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f3
$.f3=z+1
z="expando$key$"+z}return new P.l0(null,z,[P.t])},"hf","$get$hf",function(){return H.aM(H.d2({
toString:function(){return"$receiver$"}}))},"hg","$get$hg",function(){return H.aM(H.d2({$method$:null,
toString:function(){return"$receiver$"}}))},"hh","$get$hh",function(){return H.aM(H.d2(null))},"hi","$get$hi",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hm","$get$hm",function(){return H.aM(H.d2(void 0))},"hn","$get$hn",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hk","$get$hk",function(){return H.aM(H.hl(null))},"hj","$get$hj",function(){return H.aM(function(){try{null.$method$}catch(z){return z.message}}())},"hp","$get$hp",function(){return H.aM(H.hl(void 0))},"ho","$get$ho",function(){return H.aM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e9","$get$e9",function(){return P.pV()},"bg","$get$bg",function(){var z,y
z=P.as
y=new P.F(0,P.px(),null,[z])
y.ik(null,z)
return y},"bU","$get$bU",function(){return[]},"dd","$get$dd",function(){return new K.c6("fist",P.aZ(C.Y,null))},"bF","$get$bF",function(){return N.bh("PlannerRecommendation")},"i6","$get$i6",function(){return new K.rw()},"eq","$get$eq",function(){var z=$.$get$i6()
return K.Z("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a5","$get$a5",function(){return P.cV(null)},"bH","$get$bH",function(){return P.cV(null)},"il","$get$il",function(){return N.bh("Storyline")},"h2","$get$h2",function(){return P.bk("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"ct","$get$ct",function(){return L.e8(new L.t2())},"aV","$get$aV",function(){return L.e8(new L.t8())},"ew","$get$ew",function(){return L.e8(new L.t1())},"dS","$get$dS",function(){return new F.mK("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eo","$get$eo",function(){return Y.c3(!1,"balance",!0,C.l,$.$get$aV())},"iq","$get$iq",function(){return Y.c3(!1,"pounding",!1,C.l,$.$get$aV())},"fK","$get$fK",function(){return new B.nl("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fO","$get$fO",function(){return new O.nB(null,!1,!0,!1,null,null)},"h1","$get$h1",function(){return new Q.oi(null,!1,!0,!0,C.c,null)},"hs","$get$hs",function(){return new M.pk("",!0,C.c,!1,!0,null)},"hN","$get$hN",function(){return P.cV(null)},"eQ","$get$eQ",function(){return new Z.jt(!1,!0,!1,null,null)},"iB","$get$iB",function(){return Y.c3(!1,"swing",!0,C.l,$.$get$aV())},"iA","$get$iA",function(){return Y.c3(!1,"swing",!0,C.l,$.$get$aV())},"iC","$get$iC",function(){return Y.c3(!1,"swing",!0,C.l,$.$get$aV())},"fA","$get$fA",function(){return X.fy(0,P.L)},"fB","$get$fB",function(){return X.fy(1,P.L)},"fX","$get$fX",function(){return new D.of(!1,!1,!0,null,null)},"hM","$get$hM",function(){return P.cV(null)},"i0","$get$i0",function(){return K.Z("cave_with_agruth_pre",new V.rY(),new V.rZ(),null,null,H.p([new Q.u("cave_with_agruth","","You look around.",null)],[Q.u]),"ground")},"i_","$get$i_",function(){return K.Z("cave_with_agruth",new V.rW(),new V.rX(),null,null,H.p([new Q.u("underground_church","Go to the Unholy Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.u("war_forge","Go to the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null),new Q.u("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.u]),"ground")},"fP","$get$fP",function(){return new V.o0("Search Agruth","search_agruth",!0,null)},"i7","$get$i7",function(){return K.Z("exit_from_bloodrock",new V.rU(),new V.rV(),null,null,H.p([new Q.u("__END_OF_ROAM__","Go forth (UNIMPLEMENTED)","You head down.",null)],[Q.u]),"ground")},"i8","$get$i8",function(){return K.Z("forge_church_crevice",new V.rR(),new V.rS(),null,null,H.p([new Q.u("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.u]),"ground")},"ih","$get$ih",function(){return K.Z("guardpost_above_church",new V.rP(),new V.rQ(),null,null,H.p([new Q.u("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.u("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.u("smelter","Go to the smelter","Something something.",null)],[Q.u]),"ground")},"f6","$get$f6",function(){return new V.lq("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"ik","$get$ik",function(){return K.Z("just_after_agruth_fight",new V.rN(),new V.rO(),null,null,H.p([],[Q.u]),"ground")},"fr","$get$fr",function(){return new V.ml('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fs","$get$fs",function(){return new V.mm('"Savior"',"name_agruth_sword_redemption",!0,null)},"fq","$get$fq",function(){return new V.mk("No name","name_agruth_sword_nothing",!0,null)},"io","$get$io",function(){return K.Z("orcthorn_door",new V.rL(),new V.rM(),null,null,H.p([new Q.u("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_room","Open the door","You open the door.",null)],[Q.u]),"ground")},"ip","$get$ip",function(){return K.Z("orcthorn_room",new V.rJ(),new V.rK(),O.vT(),null,H.p([new Q.u("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.u]),"ground")},"h8","$get$h8",function(){return new V.p3("Search for Orcthorn","take_orcthorn",!0,null)},"ir","$get$ir",function(){return K.Z("slave_quarters",new V.rG(),new V.rH(),null,null,H.p([],[Q.u]),"ground")},"fV","$get$fV",function(){return new V.od("Continue","slave_quarters_continue",!0,null)},"is","$get$is",function(){return K.Z("slave_quarters_passage",new V.rE(),new V.rF(),O.iJ(),null,H.p([new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_room","Open the door","You open the door.",null)],[Q.u]),"ground")},"fW","$get$fW",function(){return new V.oe("Examine the door","slave_quarters_passage_examine_door",!0,null)},"it","$get$it",function(){return K.Z("smelter",new V.rC(),new V.rD(),null,null,H.p([new Q.u("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.u("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.u("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.u]),"ground")},"fY","$get$fY",function(){return new V.oh("Throw spear at","smelter_throw_spear",!0,null)},"iu","$get$iu",function(){return K.Z("start_adventure",new V.rA(),new V.rB(),O.vS(),null,H.p([new Q.u("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.u]),"ground")},"ha","$get$ha",function(){return new V.p5("Talk to Briana","talk_to_briana_1",!0,null)},"hb","$get$hb",function(){return new V.p6("Talk to Briana","talk_to_briana_2",!0,null)},"hc","$get$hc",function(){return new V.p7("Talk to Briana","talk_to_briana_3",!0,null)},"iD","$get$iD",function(){return K.Z("the_shafts",new V.ry(),new V.rz(),null,null,H.p([new Q.u("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.u]),"ground")},"iF","$get$iF",function(){return K.Z("tunnel",new V.tp(),new V.tq(),O.iJ(),null,H.p([new Q.u("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.u]),"ground")},"iG","$get$iG",function(){return K.Z("underground_church",new V.te(),new V.to(),null,null,H.p([new Q.u("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.u("underground_church_altar","Go towards the altar","You sneak your way among the columns, trying to stay in the shadows.",null)],[Q.u]),"ground")},"f2","$get$f2",function(){return new V.l_("Look around","examine_underground_church",!0,null)},"iH","$get$iH",function(){return K.Z("underground_church_altar",new V.rT(),new V.t3(),null,null,H.p([new Q.u("underground_church","Sneak back","You keep low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.u]),"ground")},"hu","$get$hu",function(){return new V.pm("Wait","wait_for_ritual",!0,null)},"h9","$get$h9",function(){return new V.p4("Take spear","take_spear_in_underground_church",!0,null)},"iI","$get$iI",function(){return K.Z("war_forge",new V.rx(),new V.rI(),null,null,H.p([new Q.u("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.u]),"ground")},"hv","$get$hv",function(){return new V.pn("Watch the workers","war_forge_look_around",!0,null)},"hV","$get$hV",function(){return H.p([$.$get$i0(),$.$get$i_(),$.$get$i7(),$.$get$i8(),$.$get$ih(),$.$get$ik(),$.$get$io(),$.$get$ip(),$.$get$ir(),$.$get$is(),$.$get$it(),$.$get$iu(),$.$get$iD(),$.$get$iF(),$.$get$iG(),$.$get$iH(),$.$get$iI()],[K.ci])},"hU","$get$hU",function(){return H.p([$.$get$fP(),$.$get$f6(),$.$get$fr(),$.$get$fs(),$.$get$fq(),$.$get$h8(),$.$get$fV(),$.$get$fW(),$.$get$fY(),$.$get$ha(),$.$get$hb(),$.$get$hc(),$.$get$f2(),$.$get$hu(),$.$get$h9(),$.$get$hv()],[A.Y])},"di","$get$di",function(){return P.oV("")},"cs","$get$cs",function(){var z=new O.mX(0,null,"PointsCounter")
z.ia()
return z},"bV","$get$bV",function(){return new L.eW(null,H.p([],[L.a7]))},"cw","$get$cw",function(){return H.fh(P.r,P.d)},"cr","$get$cr",function(){return P.b7(null,{func:1,ret:[P.Q,P.as]})},"cG","$get$cG",function(){return P.bk("^\\s*<<<\\s*$",!0,!1)},"d1","$get$d1",function(){return H.fh(P.r,Z.at)},"fo","$get$fo",function(){return N.bh("")},"fn","$get$fn",function(){return P.dG(P.r,N.dI)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.r,args:[R.I,A.ab,Y.a_]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.A,args:[R.I]},{func:1,args:[R.I,A.ab,Y.a_]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.I,A.ab,Y.a_,R.I,S.aa]},{func:1,args:[P.t]},{func:1,ret:U.cM,args:[A.ab,F.M,[P.z,R.I]]},{func:1,v:true,args:[R.I,A.ab,Y.a_,R.I,,]},{func:1,ret:P.r,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[U.c5]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[P.d],opt:[P.b_]},{func:1,ret:Q.c7,args:[U.a8]},{func:1,args:[P.aS]},{func:1,ret:P.Q},{func:1,ret:P.L,args:[A.ao]},{func:1,args:[,P.b_]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aK,args:[P.t]},{func:1,ret:P.r,args:[P.r]},{func:1,args:[Z.at]},{func:1,args:[,,,,]},{func:1,args:[R.I]},{func:1,args:[P.L,R.I]},{func:1,ret:P.a0,args:[P.t]},{func:1,args:[P.bi]},{func:1,args:[Y.af]},{func:1,v:true,args:[P.t]},{func:1,ret:P.a0,args:[L.a7]},{func:1,v:true,args:[[P.N,P.r],P.fQ]},{func:1,args:[L.a7]},{func:1,args:[P.r,,]},{func:1,args:[P.r,Z.d0]},{func:1,args:[[P.N,Y.af],Y.af]},{func:1,ret:P.L,args:[A.cz]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,ret:P.r,args:[Q.ad]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,ret:[P.Q,U.cj],args:[P.aS,P.r],named:{rerollEffectDescription:P.r,rerollable:P.a0}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.b_]},{func:1,v:true,args:[P.d,P.b_]},{func:1,ret:Q.c4,args:[Q.u]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:L.a7,args:[P.r],named:{deferToChoiceList:P.a0,deferToEndOfPage:P.a0,goto:P.r,helpMessage:P.r,script:{func:1,ret:[P.Q,P.as]},submenu:P.r}},{func:1,args:[P.a0]}]
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
if(x==y)H.vO(d||a)
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
Isolate.aU=a.aU
Isolate.bc=a.bc
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iv(X.i4(),b)},[])
else (function(b){H.iv(X.i4(),b)})([])})})()