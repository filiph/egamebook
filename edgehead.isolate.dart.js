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
if(b5.$isaw)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
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
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
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
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dJ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dJ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dJ(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aG=function(){}
var dart=[["","",,H,{"^":"",pc:{"^":"d;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
aw:{"^":"d;",
B:function(a,b){return a===b},
gC:function(a){return H.a0(a)},
i:function(a){return H.co(a)},
gb2:function(a){return new H.a1(H.c_(a),null)}},
ek:{"^":"aw;",
i:function(a){return String(a)},
gC:function(a){return a?519018:218159},
gb2:function(a){return C.a9},
$isQ:1},
em:{"^":"aw;",
B:function(a,b){return null==b},
i:function(a){return"null"},
gC:function(a){return 0},
gb2:function(a){return C.a7}},
eq:{"^":"aw;",
gC:function(a){return 0},
gb2:function(a){return C.a6},
i:function(a){return String(a)},
$isen:1},
pg:{"^":"eq;"},
b4:{"^":"eq;"},
bF:{"^":"aw;$ti",
f2:function(a,b){if(!!a.immutable$list)throw H.c(new P.L(b))},
cO:function(a,b){if(!!a.fixed$length)throw H.c(new P.L(b))},
p:function(a,b){this.cO(a,"add")
a.push(b)},
bW:function(a){this.cO(a,"removeLast")
if(a.length===0)throw H.c(H.at(a,-1))
return a.pop()},
hY:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sk(a,v)
for(x=0;x<z.length;++x)this.l(a,x,z[x])},
bB:function(a,b){return new H.O(a,b,[H.j(a,0)])},
al:function(a,b){var z
this.cO(a,"addAll")
for(z=J.aa(b);z.u();)a.push(z.d)},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aG:function(a,b){return new H.an(a,b,[null,null])},
cj:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.e(y,x)
y[x]=w}return y.join(b)},
d8:function(a,b){return H.f2(a,b,null,H.j(a,0))},
aQ:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
ba:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a2())},
fb:function(a,b){return this.ba(a,b,null)},
a4:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gfa:function(a){if(a.length>0)return a[0]
throw H.c(H.a2())},
gI:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a2())},
gbp:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a2())
throw H.c(H.d1())},
av:function(a,b,c,d,e){var z,y,x
this.f2(a,"set range")
P.cq(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.V(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.ej())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bP:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cC:function(a,b){var z
this.f2(a,"sort")
z=b==null?P.oi():b
H.bO(a,0,a.length-1,z)},
el:function(a){return this.cC(a,null)},
dV:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
bb:function(a,b){return this.dV(a,b,0)},
M:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gH:function(a){return a.length===0},
ga2:function(a){return a.length!==0},
i:function(a){return P.aU(a,"[","]")},
bf:function(a){return P.aL(a,H.j(a,0))},
gN:function(a){return new J.bC(a,a.length,0,null,[H.j(a,0)])},
gC:function(a){return H.a0(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cO(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.c5(b,"newLength",null))
if(b<0)throw H.c(P.V(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.at(a,b))
if(b>=a.length||b<0)throw H.c(H.at(a,b))
return a[b]},
l:function(a,b,c){if(!!a.immutable$list)H.h(new P.L("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.at(a,b))
if(b>=a.length||b<0)throw H.c(H.at(a,b))
a[b]=c},
$isck:1,
$asck:I.aG,
$isF:1,
$isT:1},
pb:{"^":"bF;$ti"},
bC:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ac(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bG:{"^":"aw;",
b8:function(a,b){var z
if(typeof b!=="number")throw H.c(H.P(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbR(b)
if(this.gbR(a)===z)return 0
if(this.gbR(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbR:function(a){return a===0?1/a<0:a<0},
e7:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.L(""+a+".round()"))},
cr:function(a,b){var z
if(b>20)throw H.c(P.V(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbR(a))return"-"+z
return z},
jG:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.V(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.aX(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.L("Unexpected toString result: "+z))
x=J.G(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.bF("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gC:function(a){return a&0x1FFFFFFF},
eg:function(a){return-a},
a8:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a+b},
aJ:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a-b},
d1:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a/b},
bF:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a*b},
bl:function(a,b){return(a|0)===a?a/b|0:this.i6(a,b)},
i6:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.L("Result of truncating division is "+H.a(z)+": "+H.a(a)+" ~/ "+b))},
cL:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ai:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<b},
bo:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>b},
bE:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<=b},
bC:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>=b},
gb2:function(a){return C.ac},
$isJ:1},
el:{"^":"bG;",
gb2:function(a){return C.ab},
$isau:1,
$isJ:1,
$ist:1},
j6:{"^":"bG;",
gb2:function(a){return C.aa},
$isau:1,
$isJ:1},
bH:{"^":"aw;",
aX:function(a,b){if(b<0)throw H.c(H.at(a,b))
if(b>=a.length)throw H.c(H.at(a,b))
return a.charCodeAt(b)},
dM:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.np(b,a,c)},
dL:function(a,b){return this.dM(a,b,0)},
fk:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.V(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.aX(b,c+y)!==this.aX(a,y))return
return new H.f1(c,b,a)},
a8:function(a,b){if(typeof b!=="string")throw H.c(P.c5(b,null,null))
return a+b},
dQ:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bj(a,y-z)},
jv:function(a,b,c){H.bc(c)
return H.p(a,b,c)},
jw:function(a,b,c,d){H.bc(c)
P.ka(d,0,a.length,"startIndex",null)
return H.bB(a,b,c,d)},
cW:function(a,b,c){return this.jw(a,b,c,0)},
h6:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.hb(b,a,c)!=null},
d9:function(a,b){return this.h6(a,b,0)},
ax:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.P(c))
if(b<0)throw H.c(P.bK(b,null,null))
if(typeof c!=="number")return H.C(c)
if(b>c)throw H.c(P.bK(b,null,null))
if(c>a.length)throw H.c(P.bK(c,null,null))
return a.substring(b,c)},
bj:function(a,b){return this.ax(a,b,null)},
fH:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aX(z,0)===133){x=J.d2(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aX(z,w)===133?J.j7(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jH:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.aX(z,0)===133?J.d2(z,1):0}else{y=J.d2(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bF:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.G)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
dV:function(a,b,c){if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return a.indexOf(b,c)},
bb:function(a,b){return this.dV(a,b,0)},
jf:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
je:function(a,b){return this.jf(a,b,null)},
iv:function(a,b,c){if(b==null)H.h(H.P(b))
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return H.oV(a,b,c)},
M:function(a,b){return this.iv(a,b,0)},
gH:function(a){return a.length===0},
ga2:function(a){return a.length!==0},
b8:function(a,b){var z
if(typeof b!=="string")throw H.c(H.P(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gC:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gb2:function(a){return C.a8},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.at(a,b))
if(b>=a.length||b<0)throw H.c(H.at(a,b))
return a[b]},
$isck:1,
$asck:I.aG,
$iso:1,
$isde:1,
q:{
eo:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
d2:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.aX(a,b)
if(y!==32&&y!==13&&!J.eo(y))break;++b}return b},
j7:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.aX(a,z)
if(y!==32&&y!==13&&!J.eo(y))break}return b}}}}],["","",,H,{"^":"",
a2:function(){return new P.R("No element")},
d1:function(){return new P.R("Too many elements")},
ej:function(){return new P.R("Too few elements")},
bO:function(a,b,c,d){if(c-b<=32)H.eS(a,b,c,d)
else H.eR(a,b,c,d)},
eS:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.G(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a_(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
eR:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bl(c-b+1,6)
y=b+z
x=c-z
w=C.d.bl(b+c,2)
v=w-z
u=w+z
t=J.G(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a_(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a_(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a_(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a_(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a_(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a_(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a_(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(d.$2(p,o),0)){n=o
o=p
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
t.l(a,v,t.h(a,b))
t.l(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.f(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.m(i)
if(h.B(i,0))continue
if(h.ai(i,0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.a9(i)
if(h.bo(i,0)){--l
continue}else{g=l-1
if(h.ai(i,0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
l=g
m=f
break}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.c2(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.a_(d.$2(j,p),0))for(;!0;)if(J.a_(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c2(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}e=!1}h=m-1
t.l(a,b,t.h(a,h))
t.l(a,h,r)
h=l+1
t.l(a,c,t.h(a,h))
t.l(a,h,p)
H.bO(a,b,m-2,d)
H.bO(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.f(d.$2(t.h(a,m),r),0);)++m
for(;J.f(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.f(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.f(d.$2(j,p),0))for(;!0;)if(J.f(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c2(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}H.bO(a,m,l,d)}else H.bO(a,m,l,d)},
T:{"^":"x;$ti"},
az:{"^":"T;$ti",
gN:function(a){return new H.d6(this,this.gk(this),0,null,[H.v(this,"az",0)])},
G:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.a4(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gH:function(a){return this.gk(this)===0},
gI:function(a){if(this.gk(this)===0)throw H.c(H.a2())
return this.a4(0,this.gk(this)-1)},
M:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.f(this.a4(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
ba:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.a4(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
cj:function(a,b){var z,y,x,w
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.a(this.a4(0,0))
if(z!==this.gk(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.a(this.a4(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.a(this.a4(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bB:function(a,b){return this.ep(0,b)},
aG:function(a,b){return new H.an(this,b,[H.v(this,"az",0),null])},
aQ:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.a4(0,x))
if(z!==this.gk(this))throw H.c(new P.B(this))}return y},
be:function(a,b){var z,y,x,w
z=[H.v(this,"az",0)]
if(b){y=H.w([],z)
C.a.sk(y,this.gk(this))}else{x=new Array(this.gk(this))
x.fixed$length=Array
y=H.w(x,z)}for(w=0;w<this.gk(this);++w){z=this.a4(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
bY:function(a){return this.be(a,!0)},
bf:function(a){var z,y
z=P.I(null,null,null,H.v(this,"az",0))
for(y=0;y<this.gk(this);++y)z.p(0,this.a4(0,y))
return z}},
lJ:{"^":"az;a,b,c,$ti",
ghz:function(){var z=J.aj(this.a)
return z},
gi4:function(){var z,y
z=J.aj(this.a)
y=this.b
if(y>z)return z
return y},
gk:function(a){var z,y
z=J.aj(this.a)
y=this.b
if(y>=z)return 0
return z-y},
a4:function(a,b){var z,y
z=this.gi4()+b
if(!(b<0)){y=this.ghz()
if(typeof y!=="number")return H.C(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cg(b,this,"index",null,null))
return J.dV(this.a,z)},
be:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.G(y)
w=x.gk(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.w([],u)
C.a.sk(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.w(s,u)}for(r=0;r<v;++r){u=x.a4(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gk(y)<w)throw H.c(new P.B(this))}return t},
hg:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.V(z,0,null,"start",null))},
q:{
f2:function(a,b,c,d){var z=new H.lJ(a,b,c,[d])
z.hg(a,b,c,d)
return z}}},
d6:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gk(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.a4(0,x);++this.c
return!0}},
cl:{"^":"x;a,b,$ti",
gN:function(a){return new H.jq(null,J.aa(this.a),this.b,this.$ti)},
gk:function(a){return J.aj(this.a)},
gH:function(a){return J.dW(this.a)},
gI:function(a){return this.b.$1(J.h8(this.a))},
$asx:function(a,b){return[b]},
q:{
bn:function(a,b,c,d){if(!!J.m(a).$isT)return new H.bj(a,b,[c,d])
return new H.cl(a,b,[c,d])}}},
bj:{"^":"cl;a,b,$ti",$isT:1,
$asT:function(a,b){return[b]}},
jq:{"^":"cj;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gE())
return!0}this.a=null
return!1},
gE:function(){return this.a},
$ascj:function(a,b){return[b]}},
an:{"^":"az;a,b,$ti",
gk:function(a){return J.aj(this.a)},
a4:function(a,b){return this.b.$1(J.dV(this.a,b))},
$asaz:function(a,b){return[b]},
$asT:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
O:{"^":"x;a,b,$ti",
gN:function(a){return new H.fl(J.aa(this.a),this.b,this.$ti)},
aG:function(a,b){return new H.cl(this,b,[H.j(this,0),null])}},
fl:{"^":"cj;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gE())===!0)return!0
return!1},
gE:function(){return this.a.gE()}},
eO:{"^":"x;a,b,$ti",
gN:function(a){return new H.l0(J.aa(this.a),this.b,this.$ti)},
eq:function(a,b,c){},
q:{
l_:function(a,b,c){var z
if(!!J.m(a).$isT){z=new H.iC(a,b,[c])
z.eq(a,b,c)
return z}return H.kZ(a,b,c)},
kZ:function(a,b,c){var z=new H.eO(a,b,[c])
z.eq(a,b,c)
return z}}},
iC:{"^":"eO;a,b,$ti",
gk:function(a){var z=J.aj(this.a)-this.b
if(z>=0)return z
return 0},
$isT:1},
l0:{"^":"cj;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gE:function(){return this.a.gE()}}}],["","",,H,{"^":"",
bV:function(a,b){var z=a.ce(b)
if(!init.globalState.d.cy)init.globalState.f.b1()
return z},
h2:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isF)throw H.c(P.A("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.nb(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eh()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.mK(P.aM(null,H.bS),0)
x=P.t
y.z=new H.H(0,null,null,null,null,null,0,[x,H.dA])
y.ch=new H.H(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.na()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.iZ,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.nc)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.H(0,null,null,null,null,null,0,[x,H.bL])
x=P.I(null,null,null,x)
v=new H.bL(0,null,!1)
u=new H.dA(y,w,x,init.createNewIsolate(),v,new H.aR(H.cM()),new H.aR(H.cM()),!1,!1,[],P.I(null,null,null,null),null,null,!1,!0,P.I(null,null,null,null))
x.p(0,0)
u.dd(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bY()
if(H.ag(y,[y]).aM(a))u.ce(new H.oN(z,a))
else if(H.ag(y,[y,y]).aM(a))u.ce(new H.oO(z,a))
else u.ce(a)
init.globalState.f.b1()},
j2:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.j3()
return},
j3:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.L("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.L('Cannot extract URI from "'+H.a(z)+'"'))},
iZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cD(!0,[]).bu(b.data)
y=J.G(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cD(!0,[]).bu(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cD(!0,[]).bu(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=new H.H(0,null,null,null,null,null,0,[q,H.bL])
q=P.I(null,null,null,q)
o=new H.bL(0,null,!1)
n=new H.dA(y,p,q,init.createNewIsolate(),o,new H.aR(H.cM()),new H.aR(H.cM()),!1,!1,[],P.I(null,null,null,null),null,null,!1,!0,P.I(null,null,null,null))
q.p(0,0)
n.dd(0,o)
init.globalState.f.a.ag(new H.bS(n,new H.j_(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b1()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").A(y.h(z,"msg"))
init.globalState.f.b1()
break
case"close":init.globalState.ch.aH(0,$.$get$ei().h(0,a))
a.terminate()
init.globalState.f.b1()
break
case"log":H.iY(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a7(["command","print","msg",z])
q=new H.b7(!0,P.bv(null,P.t)).aT(q)
y.toString
self.postMessage(q)}else P.dS(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
iY:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a7(["command","log","msg",a])
x=new H.b7(!0,P.bv(null,P.t)).aT(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.z(w)
throw H.c(P.ce(z))}},
j0:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eC=$.eC+("_"+y)
$.eD=$.eD+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.A(["spawned",new H.bU(y,x),w,z.r])
x=new H.j1(a,b,c,d,z)
if(e===!0){z.f_(w,w)
init.globalState.f.a.ag(new H.bS(z,x,"start isolate"))}else x.$0()},
nG:function(a){return new H.cD(!0,[]).bu(new H.b7(!1,P.bv(null,P.t)).aT(a))},
oN:{"^":"b:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
oO:{"^":"b:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
nb:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
nc:function(a){var z=P.a7(["command","print","msg",a])
return new H.b7(!0,P.bv(null,P.t)).aT(z)}}},
dA:{"^":"d;m:a<,b,c,jc:d<,ix:e<,f,r,x,ci:y<,z,Q,ch,cx,cy,db,dx",
f_:function(a,b){if(!this.f.B(0,a))return
if(this.Q.p(0,b)&&!this.y)this.y=!0
this.cc()},
ju:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aH(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.eZ(x)}this.y=!1}this.cc()},
im:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
js:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.L("removeRange"))
P.cq(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
h_:function(a,b){if(!this.r.B(0,a))return
this.db=b},
iS:function(a,b,c){var z=J.m(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){a.A(c)
return}z=this.cx
if(z==null){z=P.aM(null,null)
this.cx=z}z.ag(new H.n1(a,c))},
iR:function(a,b){var z
if(!this.r.B(0,a))return
z=J.m(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){this.e_()
return}z=this.cx
if(z==null){z=P.aM(null,null)
this.cx=z}z.ag(this.gjd())},
iT:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.dS(a)
if(b!=null)P.dS(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.ab(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.A(y)},
ce:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.y(u)
w=t
v=H.z(u)
this.iT(w,v)
if(this.db===!0){this.e_()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjc()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.cV().$0()}return y},
bU:function(a){return this.b.h(0,a)},
dd:function(a,b){var z=this.b
if(z.K(a))throw H.c(P.ce("Registry: ports must be registered only once."))
z.l(0,a,b)},
cc:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.e_()},
e_:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aE(0)
for(z=this.b,y=z.gc_(),y=y.gN(y);y.u();)y.gE().hu()
z.aE(0)
this.c.aE(0)
init.globalState.z.aH(0,this.a)
this.dx.aE(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.A(z[v])}this.ch=null}},"$0","gjd",0,0,3]},
n1:{"^":"b:3;a,b",
$0:function(){this.a.A(this.b)}},
mK:{"^":"d;a,b",
iC:function(){var z=this.a
if(z.b===z.c)return
return z.cV()},
fF:function(){var z,y,x
z=this.iC()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.K(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.ce("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a7(["command","close"])
x=new H.b7(!0,new P.ft(0,null,null,null,null,null,0,[null,P.t])).aT(x)
y.toString
self.postMessage(x)}return!1}z.jr()
return!0},
eS:function(){if(self.window!=null)new H.mL(this).$0()
else for(;this.fF(););},
b1:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eS()
else try{this.eS()}catch(x){w=H.y(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.a7(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.b7(!0,P.bv(null,P.t)).aT(v)
w.toString
self.postMessage(v)}}},
mL:{"^":"b:3;a",
$0:function(){if(!this.a.fF())return
P.lY(C.w,this)}},
bS:{"^":"d;a,b,c",
jr:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ce(this.b)}},
na:{"^":"d;"},
j_:{"^":"b:1;a,b,c,d,e,f",
$0:function(){H.j0(this.a,this.b,this.c,this.d,this.e,this.f)}},
j1:{"^":"b:3;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bY()
if(H.ag(x,[x,x]).aM(y))y.$2(this.b,this.c)
else if(H.ag(x,[x]).aM(y))y.$1(this.b)
else y.$0()}z.cc()}},
fo:{"^":"d;"},
bU:{"^":"fo;b,a",
A:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.geI())return
x=H.nG(a)
if(z.gix()===y){y=J.G(x)
switch(y.h(x,0)){case"pause":z.f_(y.h(x,1),y.h(x,2))
break
case"resume":z.ju(y.h(x,1))
break
case"add-ondone":z.im(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.js(y.h(x,1))
break
case"set-errors-fatal":z.h_(y.h(x,1),y.h(x,2))
break
case"ping":z.iS(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.iR(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.p(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aH(0,y)
break}return}init.globalState.f.a.ag(new H.bS(z,new H.ne(this,x),"receive"))},
B:function(a,b){if(b==null)return!1
return b instanceof H.bU&&J.f(this.b,b.b)},
gC:function(a){return this.b.gdt()}},
ne:{"^":"b:1;a,b",
$0:function(){var z=this.a.b
if(!z.geI())z.hl(this.b)}},
dC:{"^":"fo;b,c,a",
A:function(a){var z,y,x
z=P.a7(["command","message","port",this,"msg",a])
y=new H.b7(!0,P.bv(null,P.t)).aT(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
B:function(a,b){if(b==null)return!1
return b instanceof H.dC&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gC:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ei()
y=this.a
if(typeof y!=="number")return y.ei()
x=this.c
if(typeof x!=="number")return H.C(x)
return(z<<16^y<<8^x)>>>0}},
bL:{"^":"d;dt:a<,b,eI:c<",
hu:function(){this.c=!0
this.b=null},
aW:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aH(0,y)
z.c.aH(0,y)
z.cc()},
hl:function(a){if(this.c)return
this.b.$1(a)},
$iskb:1},
kc:{"^":"a4;a,b",
ah:function(a,b,c,d){var z=this.b
z.toString
return new P.cC(z,[H.j(z,0)]).ah(a,b,c,d)},
e2:function(a,b,c){return this.ah(a,null,b,c)},
aW:[function(){this.a.aW()
this.b.aW()},"$0","git",0,0,3],
he:function(a){var z=P.eZ(this.git(),null,null,null,!0,null)
this.b=z
this.a.b=z.gib(z)},
$asa4:I.aG},
lU:{"^":"d;a,b,c",
hh:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ag(new H.bS(y,new H.lW(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cJ(new H.lX(this,b),0),a)}else throw H.c(new P.L("Timer greater than 0."))},
q:{
lV:function(a,b){var z=new H.lU(!0,!1,null)
z.hh(a,b)
return z}}},
lW:{"^":"b:3;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
lX:{"^":"b:3;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aR:{"^":"d;dt:a<",
gC:function(a){var z=this.a
if(typeof z!=="number")return z.jP()
z=C.h.cL(z,0)^C.h.bl(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
B:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aR){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b7:{"^":"d;a,b",
aT:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gk(z))
z=J.m(a)
if(!!z.$isck)return this.fW(a)
if(!!z.$isiW){x=this.gfT()
z=a.gbS()
z=H.bn(z,x,H.v(z,"x",0),null)
z=P.W(z,!0,H.v(z,"x",0))
w=a.gc_()
w=H.bn(w,x,H.v(w,"x",0),null)
return["map",z,P.W(w,!0,H.v(w,"x",0))]}if(!!z.$isen)return this.fX(a)
if(!!z.$isaw)this.fI(a)
if(!!z.$iskb)this.cs(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbU)return this.fY(a)
if(!!z.$isdC)return this.fZ(a)
if(!!z.$isb){v=a.$static_name
if(v==null)this.cs(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaR)return["capability",a.a]
if(!(a instanceof P.d))this.fI(a)
return["dart",init.classIdExtractor(a),this.fV(init.classFieldsExtractor(a))]},"$1","gfT",2,0,0],
cs:function(a,b){throw H.c(new P.L(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
fI:function(a){return this.cs(a,null)},
fW:function(a){var z=this.fU(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cs(a,"Can't serialize indexable: ")},
fU:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aT(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
fV:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.aT(a[z]))
return a},
fX:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cs(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aT(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
fZ:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fY:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdt()]
return["raw sendport",a]}},
cD:{"^":"d;a,b",
bu:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.A("Bad serialized message: "+H.a(a)))
switch(C.a.gfa(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.w(this.cd(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.w(this.cd(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cd(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.w(this.cd(x),[null])
y.fixed$length=Array
return y
case"map":return this.iF(a)
case"sendport":return this.iG(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iE(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.aR(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cd(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.a(a))}},"$1","giD",2,0,0],
cd:function(a){var z,y,x
z=J.G(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.C(x)
if(!(y<x))break
z.l(a,y,this.bu(z.h(a,y)));++y}return a},
iF:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.ay()
this.b.push(w)
y=J.dX(y,this.giD()).bY(0)
for(z=J.G(y),v=J.G(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.e(y,u)
w.l(0,y[u],this.bu(v.h(x,u)))}return w},
iG:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bU(w)
if(u==null)return
t=new H.bU(u,x)}else t=new H.dC(y,w,x)
this.b.push(t)
return t},
iE:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.G(y)
v=J.G(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.C(t)
if(!(u<t))break
w[z.h(y,u)]=this.bu(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
i_:function(){throw H.c(new P.L("Cannot modify unmodifiable Map"))},
fY:function(a){return init.getTypeFromName(a)},
or:function(a){return init.types[a]},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.i(a)
if(typeof z!=="string")throw H.c(H.P(a))
return z},
a0:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
aZ:function(a){var z,y,x,w,v,u,t,s
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.I||!!J.m(a).$isb4){v=C.M(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.aX(w,0)===36)w=C.b.bj(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cK(H.bZ(a),0,null),init.mangledGlobalNames)},
co:function(a){return"Instance of '"+H.aZ(a)+"'"},
a8:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.cL(z,10))>>>0,56320|z&1023)}throw H.c(P.V(a,0,1114111,null,null))},
aY:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dh:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
return a[b]},
eE:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
a[b]=c},
C:function(a){throw H.c(H.P(a))},
e:function(a,b){if(a==null)J.aj(a)
throw H.c(H.at(a,b))},
at:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aJ(!0,b,"index",null)
z=J.aj(a)
if(!(b<0)){if(typeof z!=="number")return H.C(z)
y=b>=z}else y=!0
if(y)return P.cg(b,a,"index",null,z)
return P.bK(b,"index",null)},
P:function(a){return new P.aJ(!0,a,null,null)},
bc:function(a){if(typeof a!=="string")throw H.c(H.P(a))
return a},
c:function(a){var z
if(a==null)a=new P.cm()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.h5})
z.name=""}else z.toString=H.h5
return z},
h5:function(){return J.i(this.dartException)},
h:function(a){throw H.c(a)},
ac:function(a){throw H.c(new P.B(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.p1(a)
if(a==null)return
if(a instanceof H.cY)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.cL(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d4(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.ex(v,null))}}if(a instanceof TypeError){u=$.$get$f6()
t=$.$get$f7()
s=$.$get$f8()
r=$.$get$f9()
q=$.$get$fd()
p=$.$get$fe()
o=$.$get$fb()
$.$get$fa()
n=$.$get$fg()
m=$.$get$ff()
l=u.b_(y)
if(l!=null)return z.$1(H.d4(y,l))
else{l=t.b_(y)
if(l!=null){l.method="call"
return z.$1(H.d4(y,l))}else{l=s.b_(y)
if(l==null){l=r.b_(y)
if(l==null){l=q.b_(y)
if(l==null){l=p.b_(y)
if(l==null){l=o.b_(y)
if(l==null){l=r.b_(y)
if(l==null){l=n.b_(y)
if(l==null){l=m.b_(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.ex(y,l==null?null:l.method))}}return z.$1(new H.m3(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.eT()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aJ(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.eT()
return a},
z:function(a){var z
if(a instanceof H.cY)return a.b
if(a==null)return new H.fw(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fw(a,null)},
oB:function(a){if(a==null||typeof a!='object')return J.l(a)
else return H.a0(a)},
fQ:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
ot:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bV(b,new H.ou(a))
case 1:return H.bV(b,new H.ov(a,d))
case 2:return H.bV(b,new H.ow(a,d,e))
case 3:return H.bV(b,new H.ox(a,d,e,f))
case 4:return H.bV(b,new H.oy(a,d,e,f,g))}throw H.c(P.ce("Unsupported number of arguments for wrapped closure"))},
cJ:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ot)
a.$identity=z
return z},
hY:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isF){z.$reflectionInfo=c
x=H.ke(z).r}else x=c
w=d?Object.create(new H.lg().constructor.prototype):Object.create(new H.cR(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ak
$.ak=J.Z(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.e4(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.or,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.e1:H.cS
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.e4(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
hV:function(a,b,c,d){var z=H.cS
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
e4:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hX(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hV(y,!w,z,b)
if(y===0){w=$.ak
$.ak=J.Z(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.bi
if(v==null){v=H.c8("self")
$.bi=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ak
$.ak=J.Z(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.bi
if(v==null){v=H.c8("self")
$.bi=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
hW:function(a,b,c,d){var z,y
z=H.cS
y=H.e1
switch(b?-1:a){case 0:throw H.c(new H.kq("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hX:function(a,b){var z,y,x,w,v,u,t,s
z=H.hO()
y=$.e0
if(y==null){y=H.c8("receiver")
$.e0=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hW(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.ak
$.ak=J.Z(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.ak
$.ak=J.Z(u,1)
return new Function(y+H.a(u)+"}")()},
dJ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isF){c.fixed$length=Array
z=c}else z=c
return H.hY(a,b,z,!!d,e,f)},
oH:function(a,b){var z=J.G(b)
throw H.c(H.ca(H.aZ(a),z.ax(b,3,z.gk(b))))},
fW:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.oH(a,b)},
p_:function(a){throw H.c(new P.ib(a))},
dM:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
ag:function(a,b,c){return new H.kr(a,b,c,null)},
as:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.kt(z)
return new H.ks(z,b,null)},
bY:function(){return C.F},
cM:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
aQ:function(a){return new H.a1(a,null)},
w:function(a,b){a.$ti=b
return a},
bZ:function(a){if(a==null)return
return a.$ti},
fU:function(a,b){return H.dT(a["$as"+H.a(b)],H.bZ(a))},
v:function(a,b,c){var z=H.fU(a,b)
return z==null?null:z[c]},
j:function(a,b){var z=H.bZ(a)
return z==null?null:z[b]},
S:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cK(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.a(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.S(z,b)
return H.nL(a,b)}return"unknown-reified-type"},
nL:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.S(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.S(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.S(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.dN(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.S(r[p],b)+(" "+H.a(p))}w+="}"}return"("+w+") => "+z},
cK:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bt("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.t=v+", "
u=a[y]
if(u!=null)w=!1
v=z.t+=H.S(u,c)}return w?"":"<"+z.i(0)+">"},
c_:function(a){var z,y
z=H.dM(a)
if(z!=null)return H.S(z,null)
y=J.m(a).constructor.builtin$cls
if(a==null)return y
return y+H.cK(a.$ti,0,null)},
dT:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bz:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bZ(a)
y=J.m(a)
if(y[b]==null)return!1
return H.fK(H.dT(y[d],z),c)},
av:function(a,b,c,d){if(a!=null&&!H.bz(a,b,c,d))throw H.c(H.ca(H.aZ(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cK(c,0,null),init.mangledGlobalNames)))
return a},
fK:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a5(a[y],b[y]))return!1
return!0},
aP:function(a,b,c){return a.apply(b,H.fU(b,c))},
cI:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="aN"
if(b==null)return!0
z=H.bZ(a)
a=J.m(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$signature
if(x==null)return!1
return H.dQ(x.apply(a,null),b)}return H.a5(y,b)},
h3:function(a,b){if(a!=null&&!H.cI(a,b))throw H.c(H.ca(H.aZ(a),H.S(b,null)))
return a},
a5:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aN")return!0
if('func' in b)return H.dQ(a,b)
if('func' in a)return b.builtin$cls==="bl"||b.builtin$cls==="d"
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
return H.fK(H.dT(u,z),x)},
fJ:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a5(z,v)||H.a5(v,z)))return!1}return!0},
nW:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a5(v,u)||H.a5(u,v)))return!1}return!0},
dQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a5(z,y)||H.a5(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fJ(x,w,!1))return!1
if(!H.fJ(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}}return H.nW(a.named,b.named)},
oV:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.m(b)
if(!!z.$isep){z=C.b.bj(a,c)
return b.b.test(z)}else{z=z.dL(b,C.b.bj(a,c))
return!z.gH(z)}}},
p:function(a,b,c){var z,y,x
H.bc(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.a(c)
for(x=0;x<z;++x)y=y+a[x]+H.a(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
pD:[function(a){return a},"$1","nN",2,0,36],
oW:function(a,b,c,d){var z,y,x,w,v,u
d=H.nN()
z=J.m(b)
if(!z.$isde)throw H.c(P.c5(b,"pattern","is not a Pattern"))
for(z=z.dL(b,a),z=new H.fm(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.a(d.$1(C.b.ax(a,y,u)))+H.a(c.$1(w))
y=u+v[0].length}z=x+H.a(d.$1(C.b.bj(a,y)))
return z.charCodeAt(0)==0?z:z},
bB:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.oX(a,z,z+b.length,c)},
oX:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.a(d)+y},
e7:{"^":"d;$ti",
gH:function(a){return this.gk(this)===0},
ga2:function(a){return this.gk(this)!==0},
i:function(a){return P.d9(this)},
l:function(a,b,c){return H.i_()},
$isD:1},
i0:{"^":"e7;a,b,c,$ti",
gk:function(a){return this.a},
K:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.K(b))return
return this.eE(b)},
eE:function(a){return this.b[a]},
G:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eE(w))}}},
bm:{"^":"e7;a,$ti",
cG:function(){var z=this.$map
if(z==null){z=new H.H(0,null,null,null,null,null,0,this.$ti)
H.fQ(this.a,z)
this.$map=z}return z},
K:function(a){return this.cG().K(a)},
h:function(a,b){return this.cG().h(0,b)},
G:function(a,b){this.cG().G(0,b)},
gk:function(a){var z=this.cG()
return z.gk(z)}},
kd:{"^":"d;a,b,c,d,e,f,r,x",q:{
ke:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.kd(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
lZ:{"^":"d;a,b,c,d,e,f",
b_:function(a){var z,y,x
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
q:{
aq:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.lZ(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cB:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fc:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
ex:{"^":"U;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
j9:{"^":"U;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
q:{
d4:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.j9(a,y,z?null:b.receiver)}}},
m3:{"^":"U;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
cY:{"^":"d;a,aU:b<"},
p1:{"^":"b:0;a",
$1:function(a){if(!!J.m(a).$isU)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fw:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ou:{"^":"b:1;a",
$0:function(){return this.a.$0()}},
ov:{"^":"b:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ow:{"^":"b:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ox:{"^":"b:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
oy:{"^":"b:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
b:{"^":"d;",
i:function(a){return"Closure '"+H.aZ(this)+"'"},
gfP:function(){return this},
$isbl:1,
gfP:function(){return this}},
f5:{"^":"b;"},
lg:{"^":"f5;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cR:{"^":"f5;a,b,c,d",
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cR))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gC:function(a){var z,y
z=this.c
if(z==null)y=H.a0(this.a)
else y=typeof z!=="object"?J.l(z):H.a0(z)
z=H.a0(this.b)
if(typeof y!=="number")return y.jR()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.co(z)},
q:{
cS:function(a){return a.a},
e1:function(a){return a.c},
hO:function(){var z=$.bi
if(z==null){z=H.c8("self")
$.bi=z}return z},
c8:function(a){var z,y,x,w,v
z=new H.cR("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
m_:{"^":"U;a",
i:function(a){return this.a},
q:{
m0:function(a,b){return new H.m_("type '"+H.aZ(a)+"' is not a subtype of type '"+b+"'")}}},
hR:{"^":"U;a",
i:function(a){return this.a},
q:{
ca:function(a,b){return new H.hR("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
kq:{"^":"U;a",
i:function(a){return"RuntimeError: "+H.a(this.a)}},
cs:{"^":"d;"},
kr:{"^":"cs;a,b,c,d",
aM:function(a){var z=H.dM(a)
return z==null?!1:H.dQ(z,this.b3())},
ev:function(a){return this.hr(a,!0)},
hr:function(a,b){var z,y
if(a==null)return
if(this.aM(a))return a
z=H.S(this.b3(),null)
if(b){y=H.dM(a)
throw H.c(H.ca(y!=null?H.S(y,null):H.aZ(a),z))}else throw H.c(H.m0(a,z))},
b3:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$ispu)z.v=true
else if(!x.$iseb)z.ret=y.b3()
y=this.b
if(y!=null&&y.length!==0)z.args=H.eJ(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.eJ(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dN(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].b3()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dN(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].b3())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
q:{
eJ:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].b3())
return z}}},
eb:{"^":"cs;",
i:function(a){return"dynamic"},
b3:function(){return}},
kt:{"^":"cs;a",
b3:function(){var z,y
z=this.a
y=H.fY(z)
if(y==null)throw H.c("no type for '"+z+"'")
return y},
i:function(a){return this.a}},
ks:{"^":"cs;a,b,c",
b3:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.fY(z)]
if(0>=y.length)return H.e(y,0)
if(y[0]==null)throw H.c("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.ac)(z),++w)y.push(z[w].b3())
this.c=y
return y},
i:function(a){var z=this.b
return this.a+"<"+(z&&C.a).cj(z,", ")+">"}},
a1:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gC:function(a){return J.l(this.a)},
B:function(a,b){if(b==null)return!1
return b instanceof H.a1&&J.f(this.a,b.a)}},
H:{"^":"d;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gH:function(a){return this.a===0},
ga2:function(a){return!this.gH(this)},
gbS:function(){return new H.jg(this,[H.j(this,0)])},
gc_:function(){return H.bn(this.gbS(),new H.j8(this),H.j(this,0),H.j(this,1))},
K:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eA(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eA(y,a)}else return this.j3(a)},
j3:function(a){var z=this.d
if(z==null)return!1
return this.cg(this.cH(z,this.cf(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c3(z,b)
return y==null?null:y.gbx()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c3(x,b)
return y==null?null:y.gbx()}else return this.j4(b)},
j4:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cH(z,this.cf(a))
x=this.cg(y,a)
if(x<0)return
return y[x].gbx()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dv()
this.b=z}this.es(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dv()
this.c=y}this.es(y,b,c)}else this.j6(b,c)},
j6:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dv()
this.d=z}y=this.cf(a)
x=this.cH(z,y)
if(x==null)this.dH(z,y,[this.dw(a,b)])
else{w=this.cg(x,a)
if(w>=0)x[w].sbx(b)
else x.push(this.dw(a,b))}},
fz:function(a,b){var z
if(this.K(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
aH:function(a,b){if(typeof b==="string")return this.eR(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eR(this.c,b)
else return this.j5(b)},
j5:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cH(z,this.cf(a))
x=this.cg(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eV(w)
return w.gbx()},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
es:function(a,b,c){var z=this.c3(a,b)
if(z==null)this.dH(a,b,this.dw(b,c))
else z.sbx(c)},
eR:function(a,b){var z
if(a==null)return
z=this.c3(a,b)
if(z==null)return
this.eV(z)
this.eB(a,b)
return z.gbx()},
dw:function(a,b){var z,y
z=new H.jf(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eV:function(a){var z,y
z=a.ghU()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cf:function(a){return J.l(a)&0x3ffffff},
cg:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gfh(),b))return y
return-1},
i:function(a){return P.d9(this)},
c3:function(a,b){return a[b]},
cH:function(a,b){return a[b]},
dH:function(a,b,c){a[b]=c},
eB:function(a,b){delete a[b]},
eA:function(a,b){return this.c3(a,b)!=null},
dv:function(){var z=Object.create(null)
this.dH(z,"<non-identifier-key>",z)
this.eB(z,"<non-identifier-key>")
return z},
$isiW:1,
$isD:1,
q:{
er:function(a,b){return new H.H(0,null,null,null,null,null,0,[a,b])}}},
j8:{"^":"b:0;a",
$1:function(a){return this.a.h(0,a)}},
jf:{"^":"d;fh:a<,bx:b@,c,hU:d<,$ti"},
jg:{"^":"T;a,$ti",
gk:function(a){return this.a.a},
gH:function(a){return this.a.a===0},
gN:function(a){var z,y
z=this.a
y=new H.jh(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
M:function(a,b){return this.a.K(b)},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
jh:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ep:{"^":"d;a,b,c,d",
i:function(a){return"RegExp/"+this.a+"/"},
ghQ:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.d3(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghP:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.d3(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dM:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.mq(this,b,c)},
dL:function(a,b){return this.dM(a,b,0)},
hB:function(a,b){var z,y
z=this.ghQ()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fv(this,y)},
hA:function(a,b){var z,y
z=this.ghP()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fv(this,y)},
fk:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return this.hA(b,c)},
$isde:1,
q:{
d3:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eg("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fv:{"^":"d;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isaX:1},
mq:{"^":"ci;a,b,c",
gN:function(a){return new H.fm(this.a,this.b,this.c,null)},
$asci:function(){return[P.aX]},
$asx:function(){return[P.aX]}},
fm:{"^":"d;a,b,c,d",
gE:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hB(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
f1:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.h(P.bK(b,null,null))
return this.c},
$isaX:1},
np:{"^":"x;a,b,c",
gN:function(a){return new H.nq(this.a,this.b,this.c,null)},
$asx:function(){return[P.aX]}},
nq:{"^":"d;a,b,c,d",
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
this.d=new H.f1(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gE:function(){return this.d}}}],["","",,H,{"^":"",
dN:function(a){var z=H.w(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
oG:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
mr:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.nX()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cJ(new P.mt(z),1)).observe(y,{childList:true})
return new P.ms(z,y,x)}else if(self.setImmediate!=null)return P.nY()
return P.nZ()},
pw:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cJ(new P.mu(a),0))},"$1","nX",2,0,8],
px:[function(a){++init.globalState.f.b
self.setImmediate(H.cJ(new P.mv(a),0))},"$1","nY",2,0,8],
py:[function(a){P.dr(C.w,a)},"$1","nZ",2,0,8],
u:function(a,b,c){if(b===0){c.bt(a)
return}else if(b===1){c.dP(H.y(a),H.z(a))
return}P.fx(a,b)
return c.gfd()},
fx:function(a,b){var z,y,x,w
z=new P.nA(b)
y=new P.nB(b)
x=J.m(a)
if(!!x.$isE)a.dI(z,y)
else if(!!x.$isN)a.e9(z,y)
else{w=new P.E(0,$.n,null,[null])
w.a=4
w.c=a
w.dI(z,null)}},
af:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.nV(z)},
cG:function(a,b,c){var z,y,x
if(b===0){if(c.gdX())c.c.dO()
else c.a.aW()
return}else if(b===1){if(c.gdX())c.c.dP(H.y(a),H.z(a))
else{z=H.y(a)
y=H.z(a)
c.a.dK(z,y)
c.a.aW()}return}if(a instanceof P.bu){if(c.gdX()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.cO(c.a,z)
P.c0(new P.ny(b,c))
return}else if(z===1){x=a.a
c.a.ip(x,!1).bz(new P.nz(b,c))
return}}P.fx(a,b)},
nU:function(a){return a.gda()},
dG:function(a,b){var z=H.bY()
if(H.ag(z,[z,z]).aM(a)){b.toString
return a}else{b.toString
return a}},
iU:function(a,b){var z=new P.E(0,$.n,null,[b])
z.aV(a)
return z},
al:function(a){return new P.nr(new P.E(0,$.n,null,[a]),[a])},
nJ:function(a,b,c){$.n.toString
a.aL(b,c)},
nO:function(){var z,y
for(;z=$.b9,z!=null;){$.bx=null
y=z.gbV()
$.b9=y
if(y==null)$.bw=null
z.gir().$0()}},
pC:[function(){$.dE=!0
try{P.nO()}finally{$.bx=null
$.dE=!1
if($.b9!=null)$.$get$du().$1(P.fL())}},"$0","fL",0,0,3],
fH:function(a){var z=new P.fn(a,null)
if($.b9==null){$.bw=z
$.b9=z
if(!$.dE)$.$get$du().$1(P.fL())}else{$.bw.b=z
$.bw=z}},
nT:function(a){var z,y,x
z=$.b9
if(z==null){P.fH(a)
$.bx=$.bw
return}y=new P.fn(a,null)
x=$.bx
if(x==null){y.b=z
$.bx=y
$.b9=y}else{y.b=x.b
x.b=y
$.bx=y
if(y.b==null)$.bw=y}},
c0:function(a){var z=$.n
if(C.f===z){P.bb(null,null,C.f,a)
return}z.toString
P.bb(null,null,z,z.dN(a,!0))},
pr:function(a,b){return new P.no(null,a,!1,[b])},
eZ:function(a,b,c,d,e,f){return e?new P.nt(null,0,null,b,c,d,a,[f]):new P.mE(null,0,null,b,c,d,a,[f])},
dH:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.m(z).$isN)return z
return}catch(w){v=H.y(w)
y=v
x=H.z(w)
v=$.n
v.toString
P.ba(null,null,v,y,x)}},
nP:[function(a,b){var z=$.n
z.toString
P.ba(null,null,z,a,b)},function(a){return P.nP(a,null)},"$2","$1","o0",2,2,11,0],
pB:[function(){},"$0","o_",0,0,3],
fG:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.z(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gaZ()
w=t
v=x.gaU()
c.$2(w,v)}}},
nC:function(a,b,c,d){var z=a.bQ()
if(!!J.m(z).$isN&&z!==$.$get$aT())z.bA(new P.nE(b,c,d))
else b.aL(c,d)},
fy:function(a,b){return new P.nD(a,b)},
fz:function(a,b,c){var z=a.bQ()
if(!!J.m(z).$isN&&z!==$.$get$aT())z.bA(new P.nF(b,c))
else b.aK(c)},
nx:function(a,b,c){$.n.toString
a.bI(b,c)},
lY:function(a,b){var z=$.n
if(z===C.f){z.toString
return P.dr(a,b)}return P.dr(a,z.dN(b,!0))},
dr:function(a,b){var z=C.d.bl(a.a,1000)
return H.lV(z<0?0:z,b)},
ba:function(a,b,c,d,e){var z={}
z.a=d
P.nT(new P.nR(z,e))},
fD:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
fF:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
fE:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
bb:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dN(d,!(!z||!1))
P.fH(d)},
mt:{"^":"b:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ms:{"^":"b:43;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
mu:{"^":"b:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
mv:{"^":"b:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
nA:{"^":"b:0;a",
$1:function(a){return this.a.$2(0,a)}},
nB:{"^":"b:10;a",
$2:function(a,b){this.a.$2(1,new H.cY(a,b))}},
nV:{"^":"b:21;a",
$2:function(a,b){this.a(a,b)}},
ny:{"^":"b:1;a,b",
$0:function(){var z=this.b
if(z.a.gci()){z.b=!0
return}this.a.$2(null,0)}},
nz:{"^":"b:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
mw:{"^":"d;a,b,c",
gda:function(){return this.a.gda()},
gci:function(){return this.a.gci()},
gdX:function(){return this.c!=null},
p:function(a,b){return J.cO(this.a,b)},
dK:function(a,b){return this.a.dK(a,b)},
aW:function(){return this.a.aW()},
hj:function(a){var z=new P.mz(a)
this.a=P.eZ(new P.mB(this,a),new P.mC(z),null,new P.mD(this,z),!1,null)},
q:{
mx:function(a){var z=new P.mw(null,!1,null)
z.hj(a)
return z}}},
mz:{"^":"b:1;a",
$0:function(){P.c0(new P.mA(this.a))}},
mA:{"^":"b:1;a",
$0:function(){this.a.$2(0,null)}},
mC:{"^":"b:1;a",
$0:function(){this.a.$0()}},
mD:{"^":"b:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
mB:{"^":"b:1;a,b",
$0:function(){var z=this.a
if(!z.a.gj9()){z.c=new P.bQ(new P.E(0,$.n,null,[null]),[null])
if(z.b===!0){z.b=!1
P.c0(new P.my(this.b))}return z.c.gfd()}}},
my:{"^":"b:1;a",
$0:function(){this.a.$2(2,null)}},
bu:{"^":"d;ap:a<,b",
i:function(a){return"IterationMarker("+this.b+", "+H.a(this.a)+")"},
q:{
bT:function(a){return new P.bu(a,1)},
aC:function(){return C.ad},
fr:function(a){return new P.bu(a,0)},
aD:function(a){return new P.bu(a,3)}}},
aO:{"^":"d;a,b,c,d",
gE:function(){var z=this.c
return z==null?this.b:z.gE()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bu){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aa(z)
if(!!w.$isaO){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
ns:{"^":"ci;a",
gN:function(a){return new P.aO(this.a(),null,null,null)},
$asci:I.aG,
$asx:I.aG,
q:{
aE:function(a){return new P.ns(a)}}},
N:{"^":"d;$ti"},
fp:{"^":"d;fd:a<,$ti",
dP:function(a,b){a=a!=null?a:new P.cm()
if(this.a.a!==0)throw H.c(new P.R("Future already completed"))
$.n.toString
this.aL(a,b)},
cP:function(a){return this.dP(a,null)}},
bQ:{"^":"fp;a,$ti",
bt:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.R("Future already completed"))
z.aV(a)},
dO:function(){return this.bt(null)},
aL:function(a,b){this.a.ew(a,b)}},
nr:{"^":"fp;a,$ti",
bt:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.R("Future already completed"))
z.aK(a)},
dO:function(){return this.bt(null)},
aL:function(a,b){this.a.aL(a,b)}},
dz:{"^":"d;dA:a<,b,c,d,e,$ti",
gia:function(){return this.b.b},
gff:function(){return(this.c&1)!==0},
giW:function(){return(this.c&2)!==0},
gfe:function(){return this.c===8},
iU:function(a){return this.b.b.e8(this.d,a)},
jj:function(a){if(this.c!==6)return!0
return this.b.b.e8(this.d,a.gaZ())},
iQ:function(a){var z,y,x
z=this.e
y=H.bY()
x=this.b.b
if(H.ag(y,[y,y]).aM(z))return x.jz(z,a.gaZ(),a.gaU())
else return x.e8(z,a.gaZ())},
iV:function(){return this.b.b.fD(this.d)}},
E:{"^":"d;ca:a<,b,hZ:c<,$ti",
ghK:function(){return this.a===2},
gdu:function(){return this.a>=4},
e9:function(a,b){var z=$.n
if(z!==C.f){z.toString
if(b!=null)b=P.dG(b,z)}return this.dI(a,b)},
bz:function(a){return this.e9(a,null)},
dI:function(a,b){var z,y
z=new P.E(0,$.n,null,[null])
y=b==null?1:3
this.cD(new P.dz(null,z,y,a,b,[H.j(this,0),null]))
return z},
bA:function(a){var z,y
z=$.n
y=new P.E(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.j(this,0)
this.cD(new P.dz(null,y,8,a,null,[z,z]))
return y},
cD:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdu()){y.cD(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bb(null,null,z,new P.mO(this,a))}},
eN:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdA()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdu()){v.eN(a)
return}this.a=v.a
this.c=v.c}z.a=this.cJ(a)
y=this.b
y.toString
P.bb(null,null,y,new P.mW(z,this))}},
cI:function(){var z=this.c
this.c=null
return this.cJ(z)},
cJ:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdA()
z.a=y}return y},
aK:function(a){var z
if(!!J.m(a).$isN)P.cE(a,this)
else{z=this.cI()
this.a=4
this.c=a
P.b6(this,z)}},
aL:[function(a,b){var z=this.cI()
this.a=8
this.c=new P.c6(a,b)
P.b6(this,z)},function(a){return this.aL(a,null)},"jS","$2","$1","gbr",2,2,11,0],
aV:function(a){var z
if(!!J.m(a).$isN){if(a.a===8){this.a=1
z=this.b
z.toString
P.bb(null,null,z,new P.mQ(this,a))}else P.cE(a,this)
return}this.a=1
z=this.b
z.toString
P.bb(null,null,z,new P.mR(this,a))},
ew:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bb(null,null,z,new P.mP(this,a,b))},
$isN:1,
q:{
mS:function(a,b){var z,y,x,w
b.a=1
try{a.e9(new P.mT(b),new P.mU(b))}catch(x){w=H.y(x)
z=w
y=H.z(x)
P.c0(new P.mV(b,z,y))}},
cE:function(a,b){var z,y,x
for(;a.ghK();)a=a.c
z=a.gdu()
y=b.c
if(z){b.c=null
x=b.cJ(y)
b.a=a.a
b.c=a.c
P.b6(b,x)}else{b.a=2
b.c=a
a.eN(y)}},
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=v.gaZ()
x=v.gaU()
z.toString
P.ba(null,null,z,y,x)}return}for(;b.gdA()!=null;b=u){u=b.a
b.a=null
P.b6(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gff()||b.gfe()){s=b.gia()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=v.gaZ()
r=v.gaU()
y.toString
P.ba(null,null,y,x,r)
return}q=$.n
if(q==null?s!=null:q!==s)$.n=s
else q=null
if(b.gfe())new P.mZ(z,x,w,b).$0()
else if(y){if(b.gff())new P.mY(x,b,t).$0()}else if(b.giW())new P.mX(z,x,b).$0()
if(q!=null)$.n=q
y=x.b
r=J.m(y)
if(!!r.$isN){p=b.b
if(!!r.$isE)if(y.a>=4){o=p.c
p.c=null
b=p.cJ(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.cE(y,p)
else P.mS(y,p)
return}}p=b.b
b=p.cI()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
mO:{"^":"b:1;a,b",
$0:function(){P.b6(this.a,this.b)}},
mW:{"^":"b:1;a,b",
$0:function(){P.b6(this.b,this.a.a)}},
mT:{"^":"b:0;a",
$1:function(a){var z=this.a
z.a=0
z.aK(a)}},
mU:{"^":"b:19;a",
$2:function(a,b){this.a.aL(a,b)},
$1:function(a){return this.$2(a,null)}},
mV:{"^":"b:1;a,b,c",
$0:function(){this.a.aL(this.b,this.c)}},
mQ:{"^":"b:1;a,b",
$0:function(){P.cE(this.b,this.a)}},
mR:{"^":"b:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cI()
z.a=4
z.c=this.b
P.b6(z,y)}},
mP:{"^":"b:1;a,b,c",
$0:function(){this.a.aL(this.b,this.c)}},
mZ:{"^":"b:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.iV()}catch(w){v=H.y(w)
y=v
x=H.z(w)
if(this.c){v=this.a.a.c.gaZ()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.c6(y,x)
u.a=!0
return}if(!!J.m(z).$isN){if(z instanceof P.E&&z.gca()>=4){if(z.gca()===8){v=this.b
v.b=z.ghZ()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bz(new P.n_(t))
v.a=!1}}},
n_:{"^":"b:0;a",
$1:function(a){return this.a}},
mY:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.iU(this.c)}catch(x){w=H.y(x)
z=w
y=H.z(x)
w=this.a
w.b=new P.c6(z,y)
w.a=!0}}},
mX:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jj(z)===!0&&w.e!=null){v=this.b
v.b=w.iQ(z)
v.a=!1}}catch(u){w=H.y(u)
y=w
x=H.z(u)
w=this.a
v=w.a.c.gaZ()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.c6(y,x)
s.a=!0}}},
fn:{"^":"d;ir:a<,bV:b@"},
a4:{"^":"d;$ti",
aG:function(a,b){return new P.nd(b,this,[H.v(this,"a4",0),null])},
M:function(a,b){var z,y
z={}
y=new P.E(0,$.n,null,[P.Q])
z.a=null
z.a=this.ah(new P.lq(z,this,b,y),!0,new P.lr(y),y.gbr())
return y},
G:function(a,b){var z,y
z={}
y=new P.E(0,$.n,null,[null])
z.a=null
z.a=this.ah(new P.lu(z,this,b,y),!0,new P.lv(y),y.gbr())
return y},
gk:function(a){var z,y
z={}
y=new P.E(0,$.n,null,[P.t])
z.a=0
this.ah(new P.lA(z),!0,new P.lB(z,y),y.gbr())
return y},
gH:function(a){var z,y
z={}
y=new P.E(0,$.n,null,[P.Q])
z.a=null
z.a=this.ah(new P.lw(z,y),!0,new P.lx(y),y.gbr())
return y},
bY:function(a){var z,y,x
z=H.v(this,"a4",0)
y=H.w([],[z])
x=new P.E(0,$.n,null,[[P.F,z]])
this.ah(new P.lC(this,y),!0,new P.lD(y,x),x.gbr())
return x},
bf:function(a){var z,y,x
z=H.v(this,"a4",0)
y=P.I(null,null,null,z)
x=new P.E(0,$.n,null,[[P.br,z]])
this.ah(new P.lE(this,y),!0,new P.lF(y,x),x.gbr())
return x},
gI:function(a){var z,y
z={}
y=new P.E(0,$.n,null,[H.v(this,"a4",0)])
z.a=null
z.b=!1
this.ah(new P.ly(z,this),!0,new P.lz(z,y),y.gbr())
return y}},
lq:{"^":"b;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.fG(new P.lo(this.c,a),new P.lp(z,y),P.fy(z.a,y))},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.b,"a4")}},
lo:{"^":"b:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
lp:{"^":"b:25;a,b",
$1:function(a){if(a===!0)P.fz(this.a.a,this.b,!0)}},
lr:{"^":"b:1;a",
$0:function(){this.a.aK(!1)}},
lu:{"^":"b;a,b,c,d",
$1:function(a){P.fG(new P.ls(this.c,a),new P.lt(),P.fy(this.a.a,this.d))},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.b,"a4")}},
ls:{"^":"b:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lt:{"^":"b:0;",
$1:function(a){}},
lv:{"^":"b:1;a",
$0:function(){this.a.aK(null)}},
lA:{"^":"b:0;a",
$1:function(a){++this.a.a}},
lB:{"^":"b:1;a,b",
$0:function(){this.b.aK(this.a.a)}},
lw:{"^":"b:0;a,b",
$1:function(a){P.fz(this.a.a,this.b,!1)}},
lx:{"^":"b:1;a",
$0:function(){this.a.aK(!0)}},
lC:{"^":"b;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.a,"a4")}},
lD:{"^":"b:1;a,b",
$0:function(){this.b.aK(this.a)}},
lE:{"^":"b;a,b",
$1:function(a){this.b.p(0,a)},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.a,"a4")}},
lF:{"^":"b:1;a,b",
$0:function(){this.b.aK(this.a)}},
ly:{"^":"b;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.b,"a4")}},
lz:{"^":"b:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aK(x.a)
return}try{x=H.a2()
throw H.c(x)}catch(w){x=H.y(w)
z=x
y=H.z(w)
P.nJ(this.b,z,y)}}},
cF:{"^":"d;ca:b<,$ti",
gda:function(){return new P.cC(this,this.$ti)},
gj9:function(){return(this.b&4)!==0},
gci:function(){var z=this.b
return(z&1)!==0?this.gbk().geJ():(z&2)===0},
ghS:function(){if((this.b&8)===0)return this.a
return this.a.gct()},
dk:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dB(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gct()==null)y.c=new P.dB(null,null,0,this.$ti)
return y.c},
gbk:function(){if((this.b&8)!==0)return this.a.gct()
return this.a},
c0:function(){if((this.b&4)!==0)return new P.R("Cannot add event after closing")
return new P.R("Cannot add event while adding a stream")},
ip:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c0())
if((z&2)!==0){z=new P.E(0,$.n,null,[null])
z.aV(null)
return z}z=this.a
y=new P.E(0,$.n,null,[null])
x=this.ghm()
x=a.ah(this.ghp(),!1,this.ghq(),x)
w=this.b
if((w&1)!==0?this.gbk().geJ():(w&2)===0)x.cl()
this.a=new P.nk(z,y,x,this.$ti)
this.b|=8
return y},
eD:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$aT():new P.E(0,$.n,null,[null])
this.c=z}return z},
p:[function(a,b){if(this.b>=4)throw H.c(this.c0())
this.bq(b)},"$1","gib",2,0,function(){return H.aP(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cF")}],
dK:function(a,b){if(this.b>=4)throw H.c(this.c0())
a=a!=null?a:new P.cm()
$.n.toString
this.bI(a,b)},
aW:function(){var z=this.b
if((z&4)!==0)return this.eD()
if(z>=4)throw H.c(this.c0())
z|=4
this.b=z
if((z&1)!==0)this.c8()
else if((z&3)===0)this.dk().p(0,C.u)
return this.eD()},
bq:[function(a){var z=this.b
if((z&1)!==0)this.c7(a)
else if((z&3)===0)this.dk().p(0,new P.dv(a,null,this.$ti))},"$1","ghp",2,0,function(){return H.aP(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cF")}],
bI:[function(a,b){var z=this.b
if((z&1)!==0)this.c9(a,b)
else if((z&3)===0)this.dk().p(0,new P.dw(a,b,null))},"$2","ghm",4,0,26],
de:[function(){var z=this.a
this.a=z.gct()
this.b&=4294967287
z.a.aV(null)},"$0","ghq",0,0,3],
i5:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.R("Stream has already been listened to."))
z=$.n
y=d?1:0
x=new P.mI(this,null,null,null,z,y,null,null,this.$ti)
x.er(a,b,c,d,H.j(this,0))
w=this.ghS()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sct(x)
v.b.cp()}else this.a=x
x.i3(w)
x.ds(new P.nm(this))
return x},
hW:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bQ()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){w=H.y(v)
y=w
x=H.z(v)
u=new P.E(0,$.n,null,[null])
u.ew(y,x)
z=u}else z=z.bA(w)
w=new P.nl(this)
if(z!=null)z=z.bA(w)
else w.$0()
return z}},
nm:{"^":"b:1;a",
$0:function(){P.dH(this.a.d)}},
nl:{"^":"b:3;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.aV(null)}},
nu:{"^":"d;$ti",
c7:function(a){this.gbk().bq(a)},
c9:function(a,b){this.gbk().bI(a,b)},
c8:function(){this.gbk().de()}},
mF:{"^":"d;$ti",
c7:function(a){this.gbk().bJ(new P.dv(a,null,[H.j(this,0)]))},
c9:function(a,b){this.gbk().bJ(new P.dw(a,b,null))},
c8:function(){this.gbk().bJ(C.u)}},
mE:{"^":"cF+mF;a,b,c,d,e,f,r,$ti"},
nt:{"^":"cF+nu;a,b,c,d,e,f,r,$ti"},
cC:{"^":"nn;a,$ti",
gC:function(a){return(H.a0(this.a)^892482866)>>>0},
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cC))return!1
return b.a===this.a}},
mI:{"^":"bR;x,a,b,c,d,e,f,r,$ti",
dB:function(){return this.x.hW(this)},
dD:[function(){var z=this.x
if((z.b&8)!==0)z.a.cl()
P.dH(z.e)},"$0","gdC",0,0,3],
dF:[function(){var z=this.x
if((z.b&8)!==0)z.a.cp()
P.dH(z.f)},"$0","gdE",0,0,3]},
mo:{"^":"d;$ti",
cl:function(){this.b.cl()},
cp:function(){this.b.cp()},
bQ:function(){var z=this.b.bQ()
if(z==null){this.a.aV(null)
return}return z.bA(new P.mp(this))},
dO:function(){this.a.aV(null)}},
mp:{"^":"b:1;a",
$0:function(){this.a.a.aV(null)}},
nk:{"^":"mo;ct:c@,a,b,$ti"},
pz:{"^":"d;$ti"},
bR:{"^":"d;ca:e<,$ti",
i3:function(a){if(a==null)return
this.r=a
if(!a.gH(a)){this.e=(this.e|64)>>>0
this.r.cw(this)}},
jn:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.f0()
if((z&4)===0&&(this.e&32)===0)this.ds(this.gdC())},
cl:function(){return this.jn(null)},
cp:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.cw(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.ds(this.gdE())}}}},
bQ:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.df()
z=this.f
return z==null?$.$get$aT():z},
geJ:function(){return(this.e&4)!==0},
gci:function(){return this.e>=128},
df:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.f0()
if((this.e&32)===0)this.r=null
this.f=this.dB()},
bq:["h8",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c7(a)
else this.bJ(new P.dv(a,null,[H.v(this,"bR",0)]))}],
bI:["h9",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c9(a,b)
else this.bJ(new P.dw(a,b,null))}],
de:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c8()
else this.bJ(C.u)},
dD:[function(){},"$0","gdC",0,0,3],
dF:[function(){},"$0","gdE",0,0,3],
dB:function(){return},
bJ:function(a){var z,y
z=this.r
if(z==null){z=new P.dB(null,null,0,[H.v(this,"bR",0)])
this.r=z}z.p(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cw(this)}},
c7:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fG(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dh((z&4)!==0)},
c9:function(a,b){var z,y,x
z=this.e
y=new P.mH(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.df()
z=this.f
if(!!J.m(z).$isN){x=$.$get$aT()
x=z==null?x!=null:z!==x}else x=!1
if(x)z.bA(y)
else y.$0()}else{y.$0()
this.dh((z&4)!==0)}},
c8:function(){var z,y,x
z=new P.mG(this)
this.df()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isN){x=$.$get$aT()
x=y==null?x!=null:y!==x}else x=!1
if(x)y.bA(z)
else z.$0()},
ds:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dh((z&4)!==0)},
dh:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gH(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gH(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dD()
else this.dF()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cw(this)},
er:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.dG(b==null?P.o0():b,z)
this.c=c==null?P.o_():c}},
mH:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ag(H.bY(),[H.as(P.d),H.as(P.aB)]).aM(y)
w=z.d
v=this.b
u=z.b
if(x)w.jA(u,v,this.c)
else w.fG(u,v)
z.e=(z.e&4294967263)>>>0}},
mG:{"^":"b:3;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fE(z.c)
z.e=(z.e&4294967263)>>>0}},
nn:{"^":"a4;$ti",
ah:function(a,b,c,d){return this.a.i5(a,d,c,!0===b)},
e2:function(a,b,c){return this.ah(a,null,b,c)}},
dx:{"^":"d;bV:a@,$ti"},
dv:{"^":"dx;ap:b<,a,$ti",
e3:function(a){a.c7(this.b)}},
dw:{"^":"dx;aZ:b<,aU:c<,a",
e3:function(a){a.c9(this.b,this.c)},
$asdx:I.aG},
mJ:{"^":"d;",
e3:function(a){a.c8()},
gbV:function(){return},
sbV:function(a){throw H.c(new P.R("No events after a done."))}},
nf:{"^":"d;ca:a<,$ti",
cw:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.c0(new P.ng(this,a))
this.a=1},
f0:function(){if(this.a===1)this.a=3}},
ng:{"^":"b:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbV()
z.b=w
if(w==null)z.c=null
x.e3(this.b)}},
dB:{"^":"nf;b,c,a,$ti",
gH:function(a){return this.c==null},
p:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbV(b)
this.c=b}}},
no:{"^":"d;a,b,c,$ti"},
nE:{"^":"b:1;a,b,c",
$0:function(){return this.a.aL(this.b,this.c)}},
nD:{"^":"b:10;a,b",
$2:function(a,b){P.nC(this.a,this.b,a,b)}},
nF:{"^":"b:1;a,b",
$0:function(){return this.a.aK(this.b)}},
dy:{"^":"a4;$ti",
ah:function(a,b,c,d){return this.hy(a,d,c,!0===b)},
e2:function(a,b,c){return this.ah(a,null,b,c)},
hy:function(a,b,c,d){return P.mN(this,a,b,c,d,H.v(this,"dy",0),H.v(this,"dy",1))},
eG:function(a,b){b.bq(a)},
hI:function(a,b,c){c.bI(a,b)},
$asa4:function(a,b){return[b]}},
fq:{"^":"bR;x,y,a,b,c,d,e,f,r,$ti",
bq:function(a){if((this.e&2)!==0)return
this.h8(a)},
bI:function(a,b){if((this.e&2)!==0)return
this.h9(a,b)},
dD:[function(){var z=this.y
if(z==null)return
z.cl()},"$0","gdC",0,0,3],
dF:[function(){var z=this.y
if(z==null)return
z.cp()},"$0","gdE",0,0,3],
dB:function(){var z=this.y
if(z!=null){this.y=null
return z.bQ()}return},
jU:[function(a){this.x.eG(a,this)},"$1","ghF",2,0,function(){return H.aP(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fq")}],
jW:[function(a,b){this.x.hI(a,b,this)},"$2","ghH",4,0,35],
jV:[function(){this.de()},"$0","ghG",0,0,3],
hk:function(a,b,c,d,e,f,g){this.y=this.x.a.e2(this.ghF(),this.ghG(),this.ghH())},
$asbR:function(a,b){return[b]},
q:{
mN:function(a,b,c,d,e,f,g){var z,y
z=$.n
y=e?1:0
y=new P.fq(a,null,null,null,null,z,y,null,null,[f,g])
y.er(b,c,d,e,g)
y.hk(a,b,c,d,e,f,g)
return y}}},
nd:{"^":"dy;b,a,$ti",
eG:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.y(w)
y=v
x=H.z(w)
P.nx(b,y,x)
return}b.bq(z)}},
c6:{"^":"d;aZ:a<,aU:b<",
i:function(a){return H.a(this.a)},
$isU:1},
pv:{"^":"d;"},
nw:{"^":"d;"},
nR:{"^":"b:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cm()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
nh:{"^":"nw;",
fE:function(a){var z,y,x,w
try{if(C.f===$.n){x=a.$0()
return x}x=P.fD(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.ba(null,null,this,z,y)}},
fG:function(a,b){var z,y,x,w
try{if(C.f===$.n){x=a.$1(b)
return x}x=P.fF(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.ba(null,null,this,z,y)}},
jA:function(a,b,c){var z,y,x,w
try{if(C.f===$.n){x=a.$2(b,c)
return x}x=P.fE(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.ba(null,null,this,z,y)}},
dN:function(a,b){if(b)return new P.ni(this,a)
else return new P.nj(this,a)},
h:function(a,b){return},
fD:function(a){if($.n===C.f)return a.$0()
return P.fD(null,null,this,a)},
e8:function(a,b){if($.n===C.f)return a.$1(b)
return P.fF(null,null,this,a,b)},
jz:function(a,b,c){if($.n===C.f)return a.$2(b,c)
return P.fE(null,null,this,a,b,c)}},
ni:{"^":"b:1;a,b",
$0:function(){return this.a.fE(this.b)}},
nj:{"^":"b:1;a,b",
$0:function(){return this.a.fD(this.b)}}}],["","",,P,{"^":"",
es:function(a,b){return new H.H(0,null,null,null,null,null,0,[a,b])},
ay:function(){return new H.H(0,null,null,null,null,null,0,[null,null])},
a7:function(a){return H.fQ(a,new H.H(0,null,null,null,null,null,0,[null,null]))},
j5:function(a,b,c){var z,y
if(P.dF(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$by()
y.push(a)
try{P.nM(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.f0(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aU:function(a,b,c){var z,y,x
if(P.dF(a))return b+"..."+c
z=new P.bt(b)
y=$.$get$by()
y.push(a)
try{x=z
x.t=P.f0(x.gt(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.t=y.gt()+c
y=z.gt()
return y.charCodeAt(0)==0?y:y},
dF:function(a){var z,y
for(z=0;y=$.$get$by(),z<y.length;++z)if(a===y[z])return!0
return!1},
nM:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gN(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.a(z.gE())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gE();++x
if(!z.u()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gE();++x
for(;z.u();t=s,s=r){r=z.gE();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.a(t)
v=H.a(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ji:function(a,b,c,d,e){return new H.H(0,null,null,null,null,null,0,[d,e])},
bI:function(a,b,c){var z=P.ji(null,null,null,b,c)
a.G(0,new P.o1(z))
return z},
I:function(a,b,c,d){return new P.fs(0,null,null,null,null,null,0,[d])},
aL:function(a,b){var z,y
z=P.I(null,null,null,b)
for(y=J.aa(a);y.u();)z.p(0,y.gE())
return z},
jj:function(a,b,c){var z,y,x,w
z=[]
y=a.gk(a)
for(x=0;x<y;++x){w=a.h(0,x)
if(J.f(b.$1(w),c))z.push(w)
if(y!==a.gk(a))throw H.c(new P.B(a))}if(z.length!==a.gk(a)){a.h0(0,0,z.length,z)
a.sk(0,z.length)}},
d9:function(a){var z,y,x
z={}
if(P.dF(a))return"{...}"
y=new P.bt("")
try{$.$get$by().push(a)
x=y
x.t=x.gt()+"{"
z.a=!0
a.G(0,new P.jr(z,y))
z=y
z.t=z.gt()+"}"}finally{z=$.$get$by()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gt()
return z.charCodeAt(0)==0?z:z},
ft:{"^":"H;a,b,c,d,e,f,r,$ti",
cf:function(a){return H.oB(a)&0x3ffffff},
cg:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfh()
if(x==null?b==null:x===b)return y}return-1},
q:{
bv:function(a,b){return new P.ft(0,null,null,null,null,null,0,[a,b])}}},
fs:{"^":"n0;a,b,c,d,e,f,r,$ti",
dz:function(){return new P.fs(0,null,null,null,null,null,0,this.$ti)},
gN:function(a){var z=new P.ab(this,this.r,null,null,[null])
z.c=this.e
return z},
gk:function(a){return this.a},
gH:function(a){return this.a===0},
ga2:function(a){return this.a!==0},
M:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hw(b)},
hw:function(a){var z=this.d
if(z==null)return!1
return this.cF(z[this.cE(a)],a)>=0},
bU:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.M(0,a)?a:null
else return this.hM(a)},
hM:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cE(a)]
x=this.cF(y,a)
if(x<0)return
return J.ai(y,x).geC()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gI:function(a){var z=this.f
if(z==null)throw H.c(new P.R("No elements"))
return z.a},
p:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.ex(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.ex(x,b)}else return this.ag(b)},
ag:function(a){var z,y,x
z=this.d
if(z==null){z=P.n9()
this.d=z}y=this.cE(a)
x=z[y]
if(x==null)z[y]=[this.di(a)]
else{if(this.cF(x,a)>=0)return!1
x.push(this.di(a))}return!0},
aH:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ey(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ey(this.c,b)
else return this.hX(b)},
hX:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cE(a)]
x=this.cF(y,a)
if(x<0)return!1
this.ez(y.splice(x,1)[0])
return!0},
hC:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.aH(0,y)}},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
ex:function(a,b){if(a[b]!=null)return!1
a[b]=this.di(b)
return!0},
ey:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ez(z)
delete a[b]
return!0},
di:function(a){var z,y
z=new P.n8(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ez:function(a){var z,y
z=a.ghv()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cE:function(a){return J.l(a)&0x3ffffff},
cF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].geC(),b))return y
return-1},
$isbr:1,
$isT:1,
q:{
n9:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
n8:{"^":"d;eC:a<,b,hv:c<"},
ab:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
n0:{"^":"kX;$ti",
bf:function(a){var z=this.dz()
z.al(0,this)
return z}},
ci:{"^":"x;$ti"},
o1:{"^":"b:5;a",
$2:function(a,b){this.a.l(0,a,b)}},
et:{"^":"ey;$ti"},
ey:{"^":"d+aV;$ti",$asF:null,$asT:null,$isF:1,$isT:1},
aV:{"^":"d;$ti",
gN:function(a){return new H.d6(this,this.gk(this),0,null,[H.v(this,"aV",0)])},
a4:function(a,b){return this.h(0,b)},
G:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gH:function(a){return this.gk(this)===0},
ga2:function(a){return!this.gH(this)},
gI:function(a){if(this.gk(this)===0)throw H.c(H.a2())
return this.h(0,this.gk(this)-1)},
M:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<this.gk(this);++y){if(J.f(this.h(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bP:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y))===!0)return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
ba:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
aG:function(a,b){return new H.an(this,b,[H.v(this,"aV",0),null])},
d8:function(a,b){return H.f2(this,b,null,H.v(this,"aV",0))},
bf:function(a){var z,y
z=P.I(null,null,null,H.v(this,"aV",0))
for(y=0;y<this.gk(this);++y)z.p(0,this.h(0,y))
return z},
p:function(a,b){var z=this.gk(this)
this.sk(0,z+1)
this.l(0,z,b)},
aH:function(a,b){var z
for(z=0;z<this.gk(this);++z)if(J.f(this.h(0,z),b)){this.av(0,z,this.gk(this)-1,this,z+1)
this.sk(0,this.gk(this)-1)
return!0}return!1},
av:function(a,b,c,d,e){var z,y,x,w,v
P.cq(b,c,this.gk(this),null,null,null)
z=c-b
if(z===0)return
if(H.bz(d,"$isF",[H.v(this,"aV",0)],"$asF")){y=e
x=d}else{x=J.he(d,e).be(0,!1)
y=0}w=J.G(x)
if(y+z>w.gk(x))throw H.c(H.ej())
if(y<b)for(v=z-1;v>=0;--v)this.l(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.l(0,b+v,w.h(x,y+v))},
h0:function(a,b,c,d){return this.av(a,b,c,d,0)},
i:function(a){return P.aU(this,"[","]")},
$isF:1,
$isT:1},
nv:{"^":"d;$ti",
l:function(a,b,c){throw H.c(new P.L("Cannot modify unmodifiable map"))},
$isD:1},
jp:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
l:function(a,b,c){this.a.l(0,b,c)},
K:function(a){return this.a.K(a)},
G:function(a,b){this.a.G(0,b)},
gH:function(a){var z=this.a
return z.gH(z)},
ga2:function(a){var z=this.a
return z.ga2(z)},
gk:function(a){var z=this.a
return z.gk(z)},
i:function(a){return this.a.i(0)},
$isD:1},
fk:{"^":"jp+nv;a,$ti",$asD:null,$isD:1},
jr:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.t+=", "
z.a=!1
z=this.b
y=z.t+=H.a(a)
z.t=y+": "
z.t+=H.a(b)}},
jk:{"^":"az;a,b,c,d,$ti",
gN:function(a){return new P.fu(this,this.c,this.d,this.b,null,this.$ti)},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
gH:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gI:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.a2())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
a4:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cg(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
p:function(a,b){this.ag(b)},
al:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.bz(b,"$isF",z,"$asF")){y=b.gk(b)
x=this.gk(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.jl(w+(w>>>1))
if(typeof t!=="number")return H.C(t)
v=new Array(t)
v.fixed$length=Array
s=H.w(v,z)
this.c=this.i9(s)
this.a=s
this.b=0
C.a.av(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.av(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.av(v,z,z+r,b,0)
C.a.av(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.fu(b,b.c,b.d,b.b,null,[H.j(b,0)]);z.u();)this.ag(z.e)},
aE:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aU(this,"{","}")},
eZ:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eF();++this.d},
cV:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.a2());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ag:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.eF();++this.d},
eF:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.w(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.av(y,0,w,z,x)
C.a.av(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
i9:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.av(a,0,w,x,z)
return w}else{v=x.length-z
C.a.av(a,0,v,x,z)
C.a.av(a,v,v+this.c,this.a,0)
return this.c+v}},
hb:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.w(z,[b])},
q:{
aM:function(a,b){var z=new P.jk(null,0,0,0,[b])
z.hb(a,b)
return z},
jl:function(a){var z
a=C.q.ei(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
fu:{"^":"d;a,b,c,d,e,$ti",
gE:function(){return this.e},
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
kY:{"^":"d;$ti",
gH:function(a){return this.a===0},
ga2:function(a){return this.a!==0},
al:function(a,b){var z
for(z=J.aa(b);z.u();)this.p(0,z.gE())},
iw:function(a){var z,y
for(z=a.a,y=new P.ab(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.M(0,y.d))return!1
return!0},
be:function(a,b){var z,y,x,w,v
z=H.w([],this.$ti)
C.a.sk(z,this.a)
for(y=new P.ab(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
bY:function(a){return this.be(a,!0)},
aG:function(a,b){return new H.bj(this,b,[H.j(this,0),null])},
i:function(a){return P.aU(this,"{","}")},
G:function(a,b){var z
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
aQ:function(a,b,c){var z,y
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gI:function(a){var z,y
z=new P.ab(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.a2())
do y=z.d
while(z.u())
return y},
ba:function(a,b,c){var z,y
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
bH:function(a,b){var z,y,x,w
for(z=new P.ab(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.d1())
y=w
x=!0}}if(x)return y
throw H.c(H.a2())},
$isbr:1,
$isT:1},
kX:{"^":"kY;$ti"}}],["","",,P,{"^":"",
cH:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.n3(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cH(a[z])
return a},
nQ:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.P(a))
z=null
try{z=JSON.parse(a)}catch(x){w=H.y(x)
y=w
throw H.c(new P.eg(String(y),null,null))}return P.cH(z)},
pA:[function(a){return a.cY()},"$1","oh",2,0,0],
n3:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hV(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c1().length
return z},
gH:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c1().length
return z===0},
ga2:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c1().length
return z>0},
l:function(a,b,c){var z,y
if(this.b==null)this.c.l(0,b,c)
else if(this.K(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.i7().l(0,b,c)},
K:function(a){if(this.b==null)return this.c.K(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
fz:function(a,b){var z
if(this.K(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
G:function(a,b){var z,y,x,w
if(this.b==null)return this.c.G(0,b)
z=this.c1()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cH(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
i:function(a){return P.d9(this)},
c1:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
i7:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.ay()
y=this.c1()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.l(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
hV:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cH(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:I.aG},
e5:{"^":"d;$ti"},
cc:{"^":"d;$ti"},
d5:{"^":"U;a,b",
i:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
jb:{"^":"d5;a,b",
i:function(a){return"Cyclic error in JSON stringify"}},
ja:{"^":"e5;a,b",
iA:function(a,b){return P.nQ(a,this.giB().a)},
iz:function(a){return this.iA(a,null)},
iI:function(a,b){var z=this.giJ()
return P.n5(a,z.b,z.a)},
f8:function(a){return this.iI(a,null)},
giJ:function(){return C.O},
giB:function(){return C.N},
$ase5:function(){return[P.d,P.o]}},
jd:{"^":"cc;a,b",
$ascc:function(){return[P.d,P.o]}},
jc:{"^":"cc;a",
$ascc:function(){return[P.o,P.d]}},
n6:{"^":"d;",
fO:function(a){var z,y,x,w,v,u,t
z=J.G(a)
y=z.gk(a)
if(typeof y!=="number")return H.C(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.aX(a,v)
if(u>92)continue
if(u<32){if(v>w)x.t+=C.b.ax(a,w,v)
w=v+1
x.t+=H.a8(92)
switch(u){case 8:x.t+=H.a8(98)
break
case 9:x.t+=H.a8(116)
break
case 10:x.t+=H.a8(110)
break
case 12:x.t+=H.a8(102)
break
case 13:x.t+=H.a8(114)
break
default:x.t+=H.a8(117)
x.t+=H.a8(48)
x.t+=H.a8(48)
t=u>>>4&15
x.t+=H.a8(t<10?48+t:87+t)
t=u&15
x.t+=H.a8(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.t+=C.b.ax(a,w,v)
w=v+1
x.t+=H.a8(92)
x.t+=H.a8(u)}}if(w===0)x.t+=H.a(a)
else if(w<y)x.t+=z.ax(a,w,y)},
dg:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.jb(a,null))}z.push(a)},
d0:function(a){var z,y,x,w
if(this.fN(a))return
this.dg(a)
try{z=this.b.$1(a)
if(!this.fN(z))throw H.c(new P.d5(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){x=H.y(w)
y=x
throw H.c(new P.d5(a,y))}},
fN:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.t+=C.h.i(a)
return!0}else if(a===!0){this.c.t+="true"
return!0}else if(a===!1){this.c.t+="false"
return!0}else if(a==null){this.c.t+="null"
return!0}else if(typeof a==="string"){z=this.c
z.t+='"'
this.fO(a)
z.t+='"'
return!0}else{z=J.m(a)
if(!!z.$isF){this.dg(a)
this.jM(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.dg(a)
y=this.jN(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
jM:function(a){var z,y,x
z=this.c
z.t+="["
y=J.G(a)
if(y.gk(a)>0){this.d0(y.h(a,0))
for(x=1;x<y.gk(a);++x){z.t+=","
this.d0(y.h(a,x))}}z.t+="]"},
jN:function(a){var z,y,x,w,v,u
z={}
if(a.gH(a)){this.c.t+="{}"
return!0}y=a.gk(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.G(0,new P.n7(z,x))
if(!z.b)return!1
z=this.c
z.t+="{"
for(w='"',v=0;v<y;v+=2,w=',"'){z.t+=w
this.fO(x[v])
z.t+='":'
u=v+1
if(u>=y)return H.e(x,u)
this.d0(x[u])}z.t+="}"
return!0}},
n7:{"^":"b:5;a,b",
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
n4:{"^":"n6;c,a,b",q:{
n5:function(a,b,c){var z,y,x
z=new P.bt("")
y=P.oh()
x=new P.n4(z,[],y)
x.d0(a)
y=z.t
return y.charCodeAt(0)==0?y:y}}}}],["","",,P,{"^":"",
p2:[function(a,b){return J.c3(a,b)},"$2","oi",4,0,38],
ed:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.iD(a)},
iD:function(a){var z=J.m(a)
if(!!z.$isb)return z.i(a)
return H.co(a)},
ce:function(a){return new P.mM(a)},
W:function(a,b,c){var z,y
z=H.w([],[c])
for(y=J.aa(a);y.u();)z.push(y.gE())
if(b)return z
z.fixed$length=Array
return z},
jm:function(a,b,c,d){var z,y,x
z=H.w(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
dS:function(a){var z=H.a(a)
H.oG(z)},
b0:function(a,b,c){return new H.ep(a,H.d3(a,!1,b,!1),null,null)},
Q:{"^":"d;"},
"+bool":0,
M:{"^":"d;$ti"},
cd:{"^":"d;i8:a<,b",
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.cd))return!1
return this.a===b.a&&!0},
b8:function(a,b){return C.d.b8(this.a,b.gi8())},
gC:function(a){var z=this.a
return(z^C.d.cL(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t
z=P.ic(H.aY(this).getFullYear()+0)
y=P.bE(H.aY(this).getMonth()+1)
x=P.bE(H.aY(this).getDate()+0)
w=P.bE(H.aY(this).getHours()+0)
v=P.bE(H.aY(this).getMinutes()+0)
u=P.bE(H.aY(this).getSeconds()+0)
t=P.id(H.aY(this).getMilliseconds()+0)
return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
p:function(a,b){var z,y
z=this.a+b.giZ()
y=new P.cd(z,!1)
z=Math.abs(z)
if(!(z>864e13)){z===864e13
z=!1}else z=!0
if(z)H.h(P.A(y.gjk()))
return y},
gjk:function(){return this.a},
$isM:1,
$asM:function(){return[P.cd]},
q:{
ic:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.a(z)
if(z>=10)return y+"00"+H.a(z)
return y+"000"+H.a(z)},
id:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bE:function(a){if(a>=10)return""+a
return"0"+a}}},
au:{"^":"J;",$isM:1,
$asM:function(){return[P.J]}},
"+double":0,
aK:{"^":"d;bs:a<",
a8:function(a,b){return new P.aK(this.a+b.gbs())},
aJ:function(a,b){return new P.aK(this.a-b.gbs())},
bF:function(a,b){return new P.aK(C.h.e7(this.a*b))},
ai:function(a,b){return C.d.ai(this.a,b.gbs())},
bo:function(a,b){return this.a>b.gbs()},
bE:function(a,b){return C.d.bE(this.a,b.gbs())},
bC:function(a,b){return C.d.bC(this.a,b.gbs())},
giZ:function(){return C.d.bl(this.a,1000)},
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.aK))return!1
return this.a===b.a},
gC:function(a){return this.a&0x1FFFFFFF},
b8:function(a,b){return C.d.b8(this.a,b.gbs())},
i:function(a){var z,y,x,w,v
z=new P.ip()
y=this.a
if(y<0)return"-"+new P.aK(-y).i(0)
x=z.$1(C.d.bl(y,6e7)%60)
w=z.$1(C.d.bl(y,1e6)%60)
v=new P.io().$1(y%1e6)
return""+C.d.bl(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)},
eg:function(a){return new P.aK(-this.a)},
$isM:1,
$asM:function(){return[P.aK]}},
io:{"^":"b:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ip:{"^":"b:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
U:{"^":"d;",
gaU:function(){return H.z(this.$thrownJsError)}},
cm:{"^":"U;",
i:function(a){return"Throw of null."}},
aJ:{"^":"U;a,b,j:c<,d",
gdm:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdl:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gdm()+y+x
if(!this.a)return w
v=this.gdl()
u=P.ed(this.b)
return w+v+": "+H.a(u)},
q:{
A:function(a){return new P.aJ(!1,null,null,a)},
c5:function(a,b,c){return new P.aJ(!0,a,b,c)},
r:function(a){return new P.aJ(!1,null,a,"Must not be null")}}},
dj:{"^":"aJ;e,f,a,b,c,d",
gdm:function(){return"RangeError"},
gdl:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.bo()
if(typeof z!=="number")return H.C(z)
if(x>z)y=": Not in range "+H.a(z)+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.a(z)}}return y},
q:{
k9:function(a){return new P.dj(null,null,!1,null,null,a)},
bK:function(a,b,c){return new P.dj(null,null,!0,a,b,"Value not in range")},
V:function(a,b,c,d,e){return new P.dj(b,c,!0,a,d,"Invalid value")},
ka:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.V(a,b,c,d,e))},
cq:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.V(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.V(b,a,c,"end",f))
return b}}},
iV:{"^":"aJ;e,k:f>,a,b,c,d",
gdm:function(){return"RangeError"},
gdl:function(){if(J.c2(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
q:{
cg:function(a,b,c,d,e){var z=e!=null?e:J.aj(b)
return new P.iV(b,z,!0,a,c,"Index out of range")}}},
L:{"^":"U;a",
i:function(a){return"Unsupported operation: "+this.a}},
ar:{"^":"U;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
R:{"^":"U;a",
i:function(a){return"Bad state: "+this.a}},
B:{"^":"U;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.ed(z))+"."}},
jJ:{"^":"d;",
i:function(a){return"Out of Memory"},
gaU:function(){return},
$isU:1},
eT:{"^":"d;",
i:function(a){return"Stack Overflow"},
gaU:function(){return},
$isU:1},
ib:{"^":"U;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.a(z)+"' during its initialization"}},
mM:{"^":"d;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
eg:{"^":"d;a,b,c",
i:function(a){var z,y
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(typeof y!=="string")return z
if(y.length>78)y=J.dY(y,0,75)+"..."
return z+"\n"+H.a(y)}},
iE:{"^":"d;j:a<,eK,$ti",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z,y
z=this.eK
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.c5(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dh(b,"expando$values")
return y==null?null:H.dh(y,z)},
l:function(a,b,c){var z,y
z=this.eK
if(typeof z!=="string")z.set(b,c)
else{y=H.dh(b,"expando$values")
if(y==null){y=new P.d()
H.eE(b,"expando$values",y)}H.eE(y,z,c)}}},
bl:{"^":"d;"},
t:{"^":"J;",$isM:1,
$asM:function(){return[P.J]}},
"+int":0,
x:{"^":"d;$ti",
aG:function(a,b){return H.bn(this,b,H.v(this,"x",0),null)},
bB:["ep",function(a,b){return new H.O(this,b,[H.v(this,"x",0)])}],
M:function(a,b){var z
for(z=this.gN(this);z.u();)if(J.f(z.gE(),b))return!0
return!1},
G:function(a,b){var z
for(z=this.gN(this);z.u();)b.$1(z.gE())},
aQ:function(a,b,c){var z,y
for(z=this.gN(this),y=b;z.u();)y=c.$2(y,z.gE())
return y},
be:function(a,b){return P.W(this,b,H.v(this,"x",0))},
bY:function(a){return this.be(a,!0)},
bf:function(a){return P.aL(this,H.v(this,"x",0))},
gk:function(a){var z,y
z=this.gN(this)
for(y=0;z.u();)++y
return y},
gH:function(a){return!this.gN(this).u()},
ga2:function(a){return!this.gH(this)},
d8:function(a,b){return H.l_(this,b,H.v(this,"x",0))},
gI:function(a){var z,y
z=this.gN(this)
if(!z.u())throw H.c(H.a2())
do y=z.gE()
while(z.u())
return y},
gbp:function(a){var z,y
z=this.gN(this)
if(!z.u())throw H.c(H.a2())
y=z.gE()
if(z.u())throw H.c(H.d1())
return y},
a4:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.r("index"))
if(b<0)H.h(P.V(b,0,null,"index",null))
for(z=this.gN(this),y=0;z.u();){x=z.gE()
if(b===y)return x;++y}throw H.c(P.cg(b,this,"index",null,y))},
i:function(a){return P.j5(this,"(",")")}},
cj:{"^":"d;$ti"},
F:{"^":"d;$ti",$isx:1,$isT:1},
"+List":0,
D:{"^":"d;$ti"},
aN:{"^":"d;",
gC:function(a){return P.d.prototype.gC.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
J:{"^":"d;",$isM:1,
$asM:function(){return[P.J]}},
"+num":0,
d:{"^":";",
B:function(a,b){return this===b},
gC:function(a){return H.a0(this)},
i:function(a){return H.co(this)},
gb2:function(a){return new H.a1(H.c_(this),null)},
toString:function(){return this.i(this)}},
aX:{"^":"d;"},
br:{"^":"T;$ti"},
aB:{"^":"d;"},
o:{"^":"d;",$isM:1,
$asM:function(){return[P.o]},
$isde:1},
"+String":0,
bt:{"^":"d;t<",
gk:function(a){return this.t.length},
gH:function(a){return this.t.length===0},
ga2:function(a){return this.t.length!==0},
i:function(a){var z=this.t
return z.charCodeAt(0)==0?z:z},
q:{
f0:function(a,b,c){var z=J.aa(b)
if(!z.u())return a
if(c.length===0){do a+=H.a(z.gE())
while(z.u())}else{a+=H.a(z.gE())
for(;z.u();)a=a+c+H.a(z.gE())}return a},
lI:function(a){return new P.bt(a)}}}}],["","",,P,{"^":"",eN:{"^":"d;"}}],["","",,P,{"^":"",
oA:function(a,b){if(typeof a!=="number")throw H.c(P.A(a))
if(typeof b!=="number")throw H.c(P.A(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.h.gbR(b)||isNaN(b))return b
return a}return a},
oz:function(a,b){if(typeof a!=="number")throw H.c(P.A(a))
if(typeof b!=="number")throw H.c(P.A(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.h.gbR(a))return b
return a},
di:function(a){return C.H},
n2:{"^":"d;",
ar:function(a){if(a<=0||a>4294967296)throw H.c(P.k9("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fn:function(){return Math.random()}}}],["","",,S,{"^":"",i1:{"^":"d;a,b,$ti",
h:function(a,b){return this.b.h(0,b)},
K:function(a){return this.b.K(a)},
G:function(a,b){return this.b.G(0,b)},
gH:function(a){var z=this.b
return z.gH(z)},
ga2:function(a){var z=this.b
return z.ga2(z)},
gk:function(a){var z=this.b
return z.gk(z)},
l:function(a,b,c){this.hx()
this.b.l(0,b,c)},
i:function(a){return J.i(this.b)},
hx:function(){if(!this.a)return
this.a=!1
this.b=P.bI(this.b,H.j(this,0),H.j(this,1))},
$isD:1}}],["","",,A,{"^":"",i2:{"^":"d;a,b,$ti",
gk:function(a){return this.b.a},
bU:function(a){return this.b.bU(a)},
M:function(a,b){return this.b.M(0,b)},
G:function(a,b){return this.b.G(0,b)},
gH:function(a){return this.b.a===0},
ga2:function(a){return this.b.a!==0},
gN:function(a){var z,y
z=this.b
y=new P.ab(z,z.r,null,null,[null])
y.c=z.e
return y},
gI:function(a){var z=this.b
return z.gI(z)},
aG:function(a,b){var z=this.b
z.toString
return new H.bj(z,b,[H.j(z,0),null])},
bf:function(a){var z,y
z=this.b
y=z.dz()
y.al(0,z)
return y},
p:function(a,b){this.hO()
return this.b.p(0,b)},
i:function(a){return J.i(this.b)},
hO:function(){if(!this.a)return
this.a=!1
this.b=P.aL(this.b,H.j(this,0))},
$isbr:1,
$isT:1}}],["","",,S,{"^":"",cT:{"^":"d;eM:a<,b,$ti",
ad:function(a){var z=new S.am(null,null,this.$ti)
z.ay()
z.v(this)
a.$1(z)
return z.D()},
gC:function(a){var z=this.b
if(z==null){z=X.be(this.a)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.m(b)
if(!z.$iscT)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gC(b)
w=this.gC(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
i:function(a){return J.i(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gk:function(a){return this.a.length},
gN:function(a){var z=this.a
return new J.bC(z,z.length,0,null,[H.j(z,0)])},
aG:function(a,b){var z=this.a
z.toString
return new H.an(z,b,[null,null])},
M:function(a,b){var z=this.a
return(z&&C.a).M(z,b)},
G:function(a,b){var z=this.a
return(z&&C.a).G(z,b)},
bf:function(a){var z=this.a
z.toString
return P.aL(z,H.j(z,0))},
gH:function(a){return this.a.length===0},
ga2:function(a){return this.a.length!==0},
gI:function(a){var z=this.a
return(z&&C.a).gI(z)},
ay:function(){if(new H.a1(H.S(H.j(this,0)),null).B(0,C.m))throw H.c(new P.L('explicit element type required, for example "new BuiltList<int>"'))}},am:{"^":"d;eM:a<,b,$ti",
D:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.cT(z,null,this.$ti)
y.ay()
this.a=z
this.b=y
z=y}return z},
v:function(a){if(H.bz(a,"$iscT",this.$ti,null)){this.a=a.geM()
this.b=a}else{this.a=P.W(a,!0,H.j(this,0))
this.b=null}},
l:function(a,b,c){var z
if(c==null)H.h(P.A("null element"))
z=this.geT()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
p:function(a,b){var z
if(b==null)H.h(P.A("null element"))
z=this.geT();(z&&C.a).p(z,b)},
aG:function(a,b){var z=this.a
z.toString
z=new H.an(z,b,[null,null]).be(0,!0)
this.a=z
this.b=null
this.hs(z)},
geT:function(){if(this.b!=null){this.a=P.W(this.a,!0,H.j(this,0))
this.b=null}return this.a},
ay:function(){if(new H.a1(H.S(H.j(this,0)),null).B(0,C.m))throw H.c(new P.L('explicit element type required, for example "new ListBuilder<int>"'))},
hs:function(a){var z,y,x,w
for(z=a.length,y=H.j(this,0),x=0;x<a.length;a.length===z||(0,H.ac)(a),++x){w=a[x]
if(!H.cI(w,y))throw H.c(P.A("invalid element: "+H.a(w)))}}}}],["","",,A,{"^":"",c9:{"^":"d;hN:a<,b,c,d,$ti",
ad:function(a){var z=new A.d8(null,null,this.$ti)
z.c5()
z.v(this)
a.$1(z)
return z.D()},
w:function(){return new S.i1(!0,this.a,this.$ti)},
gC:function(a){var z=this.b
if(z==null){z=this.a.gbS()
z=H.bn(z,new A.hP(this),H.v(z,"x",0),null)
z=P.W(z,!1,H.v(z,"x",0))
C.a.el(z)
z=X.be(z)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.m(b)
if(!z.$isc9)return!1
y=b.a
x=this.a
if(y.gk(y)!==x.gk(x))return!1
z=z.gC(b)
w=this.gC(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbS()
this.c=z}z=z.gN(z)
for(;z.u();){v=z.gE()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
i:function(a){return J.i(this.a)},
h:function(a,b){return this.a.h(0,b)},
G:function(a,b){this.a.G(0,b)},
gH:function(a){var z=this.a
return z.gH(z)},
ga2:function(a){var z=this.a
return z.ga2(z)},
gk:function(a){var z=this.a
return z.gk(z)},
c5:function(){if(new H.a1(H.S(H.j(this,0)),null).B(0,C.m))throw H.c(new P.L('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.a1(H.S(H.j(this,1)),null).B(0,C.m))throw H.c(new P.L('explicit value type required, for example "new BuiltMap<int, int>"'))}},hP:{"^":"b:0;a",
$1:function(a){var z,y
z=J.l(a)
y=J.l(this.a.a.h(0,a))
return X.dD(X.b8(X.b8(0,J.l(z)),J.l(y)))}},d8:{"^":"d;a,b,$ti",
D:function(){var z=this.b
if(z==null){z=new A.c9(this.a,null,null,null,this.$ti)
z.c5()
this.b=z}return z},
v:function(a){var z
if(H.bz(a,"$isc9",this.$ti,null)){this.b=a
this.a=a.ghN()}else if(!!a.$isc9){z=P.bI(a.a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.bI(a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else throw H.c(P.A("expected Map or BuiltMap, got "+H.a(a.gb2(a))))},
l:function(a,b,c){if(c==null)H.h(P.A("null value"))
this.gi_().l(0,b,c)},
gi_:function(){if(this.b!=null){this.a=P.bI(this.a,H.j(this,0),H.j(this,1))
this.b=null}return this.a},
c5:function(){if(new H.a1(H.S(H.j(this,0)),null).B(0,C.m))throw H.c(new P.L('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.a1(H.S(H.j(this,1)),null).B(0,C.m))throw H.c(new P.L('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",cU:{"^":"d;i1:a<,b,$ti",
ad:function(a){var z=new L.b1(null,null,this.$ti)
z.b6()
z.v(this)
a.$1(z)
return z.D()},
gC:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.W(new H.bj(z,new L.hQ(),[H.j(z,0),null]),!1,null)
C.a.el(z)
z=X.be(z)
this.b=z}return z},
B:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.m(b)
if(!z.$iscU)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gC(b)
x=this.gC(this)
if(z==null?x!=null:z!==x)return!1
return y.iw(b)},
i:function(a){return J.i(this.a)},
gk:function(a){return this.a.a},
bU:function(a){return this.a.bU(a)},
gN:function(a){var z,y
z=this.a
y=new P.ab(z,z.r,null,null,[null])
y.c=z.e
return y},
aG:function(a,b){var z=this.a
z.toString
return new H.bj(z,b,[H.j(z,0),null])},
M:function(a,b){return this.a.M(0,b)},
G:function(a,b){return this.a.G(0,b)},
bf:function(a){return new A.i2(!0,this.a,this.$ti)},
gH:function(a){return this.a.a===0},
ga2:function(a){return this.a.a!==0},
gI:function(a){var z=this.a
return z.gI(z)},
b6:function(){if(new H.a1(H.S(H.j(this,0)),null).B(0,C.m))throw H.c(new P.L('explicit element type required, for example "new BuiltSet<int>"'))}},hQ:{"^":"b:0;",
$1:function(a){return J.l(a)}},b1:{"^":"d;a,b,$ti",
D:function(){var z=this.b
if(z==null){z=new L.cU(this.a,null,this.$ti)
z.b6()
this.b=z}return z},
v:function(a){var z,y,x,w
if(H.bz(a,"$iscU",this.$ti,null)){this.a=a.gi1()
this.b=a}else{z=H.j(this,0)
y=P.I(null,null,null,z)
for(x=J.aa(a);x.u();){w=x.gE()
if(H.cI(w,z))y.p(0,w)
else throw H.c(P.A("iterable contained invalid element: "+H.a(w)))}this.b=null
this.a=y}},
p:function(a,b){if(b==null)H.h(P.A("null element"))
this.geU().p(0,b)},
aG:function(a,b){var z=this.a
z.toString
z=P.aL(new H.bj(z,b,[H.j(z,0),null]),null)
this.b=null
this.a=z
this.i2(z)},
geU:function(){if(this.b!=null){this.a=P.aL(this.a,H.j(this,0))
this.b=null}return this.a},
b6:function(){if(new H.a1(H.S(H.j(this,0)),null).B(0,C.m))throw H.c(new P.L('explicit element type required, for example "new SetBuilder<int>"'))},
i2:function(a){var z,y,x
for(z=new P.ab(a,a.r,null,null,[null]),z.c=a.e,y=H.j(this,0);z.u();){x=z.d
if(!H.cI(x,y))throw H.c(P.A("invalid element: "+H.a(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.C(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
ad:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",kB:{"^":"kz;ch,cx,am:cy@,bi:db@,b,c,d,e,f,r,x,y,z,Q,a",
fv:function(){var z=$.$get$c1()
z.l(0,"game",this.cx)
z.l(0,"hitpoints",this.cy)
z.l(0,"stamina",this.db)},
j1:function(){var z,y,x
this.cx=null
this.cy=Z.cx("Health",new N.kE(),"#CCCCCC","Your physical state",100,0,!0,P.au)
z=Z.cx("Stamina",new N.kF(),"#CCCCCC","Spare physical energy",0,0,!0,P.t)
this.db=z
y=$.$get$bA()
x=this.cy
y=new O.ec(N.aW("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,null,new Y.ap(H.w([],[Y.a3]),0,P.ay()),x,z,O.oM(),O.oL(),O.oK(),y,this.gh3(),new P.bt(""),!1,null)
y.h1()
this.cx=y
y.x="endGame"
$.$get$bX().p(0,0)},
hf:function(){var z,y
z=new O.cv(["<p class='meta'>Debug version from Wed, March 15, 2017.</p>",[null,P.a7(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.l(0,"start",z)
z.a="start"
z=new O.cv([new N.kD(this),[null,P.a7(["goto","gameLoop"])]],0,null,!1,!1)
y.l(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cv(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.l(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
q:{
kC:function(){var z,y,x,w
z=Z.cx("Health",new N.ob(),"#CCCCCC","Your physical state",100,0,!0,P.au)
y=Z.cx("Stamina",new N.oc(),"#CCCCCC","Spare physical energy",0,0,!0,P.t)
x=P.o
w=new H.H(0,null,null,null,null,null,0,[x,O.cv])
x=new N.kB("net.filiph.edgehead.0.0.1",null,z,y,new O.kG(w),null,null,null,P.I(null,null,null,x),!1,null,-9999,null,null,null)
x.hf()
return x}}},ob:{"^":"b:13;",
$1:function(a){var z=J.m(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.bE(a,0.5))return"\ud83d\ude23"
if(z.ai(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},oc:{"^":"b:7;",
$1:function(a){return H.a(a)+" S"}},kD:{"^":"b:12;a",
$0:function(){var z=0,y=new P.al(),x=1,w,v=this
var $async$$0=P.af(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.u(v.a.cx.b1(),$async$$0,y)
case 2:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$$0,y)}},kE:{"^":"b:13;",
$1:function(a){var z=J.m(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.bE(a,0.5))return"\ud83d\ude23"
if(z.ai(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},kF:{"^":"b:7;",
$1:function(a){return H.a(a)+" S"}}}],["","",,O,{"^":"",
pE:[function(a){var z,y
z=a.gbG()
y=a.gbv()
if(typeof y!=="number")return H.C(y)
return z-2*y},"$1","fO",2,0,18],
pI:[function(a){var z,y,x
z=a.gbG()
y=a.gcq()
if(typeof y!=="number")return H.C(y)
x=a.gbv()
if(typeof x!=="number")return H.C(x)
return z+y-x},"$1","fP",2,0,18],
ec:{"^":"jo;y,z,Q,ch,cx,cy,db,dx,dy,fr,bg:fx<,fy,em:go<,am:id<,bi:k1<,a,b,c,d,e,f,r,x",
h1:function(){var z,y,x,w,v,u
z=[P.o]
y=H.w([],z)
x=P.I(null,null,null,null)
w=$.$get$dR()
x=new R.bP(null,!0,y,null,null,C.j,1,1,0,null,100,!0,!1,x,null,null,!0,C.k,null,w,null)
new O.it().$1(x)
this.cy=x.D()
y=new R.bP(null,!0,H.w([],z),null,null,C.j,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.k,null,w,null)
new O.iu().$1(y)
this.db=y.D()
y=new K.bM(null,"deadEscapee","UNUSED because this is the first choice","",null,null,"ground")
x=[Q.aS]
v=new S.am(null,null,x)
v.ay()
v.v([new Q.aS("tunnel","Run towards freedom",null)])
y.a=v.D()
this.dx=y
y=$.$get$dL()
v=y.b
u=new K.bM(null,"tunnel","You and Briana sprint through the giant worm\u2019s tunnel.\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)","",new O.iv(this),null,"{rock|cavern} floor")
x=new S.am(null,null,x)
x.ay()
x.v([new Q.aS(v,"End book",null)])
u.a=x.D()
this.dy=u
u=new R.bP(null,!0,H.w([],z),null,null,C.j,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.k,null,w,null)
new O.iw(this).$1(u)
x=u.D()
this.ch=x
this.id.sap(x.r/x.cx)
this.k1.sap(this.ch.fx)
w=new R.bP(null,!0,H.w([],z),null,null,C.j,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.k,null,w,null)
new O.ix(this).$1(w)
this.cx=w.D()
z=F.kl(this.dx)
this.fr=z
x=this.ch
w=this.cx
v=this.dx
u=this.dy
w=P.aL([x,w],R.X)
x=P.aM(null,O.c4)
z=new A.b5(w,P.I(null,null,null,U.d0),x,P.aL([v,u,y],K.bM),P.W([z],!0,S.aA),0)
this.fx=z
y=new Y.ap(H.w([],[Y.a3]),0,P.ay())
y.b=z.f
this.fy=new B.bo(z,null,y,1,1,!0,!1,!1,0)},
bZ:function(){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$bZ=P.af(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.go
s=u.giH()
if(t.fs(s)){z=1
break}r=u.fx.a9(u.ch.x)
q=r.gam()
p=r.gfl()
if(typeof q!=="number"){x=q.d1()
z=1
break}u.id.sap(q/p)
u.k1.sap(r.gbi())
p=u.y
p.j_("update() for world at time "+u.fx.f)
q=u.fx.e
if(q.length===0){u.r=!0
t.aO(0,"\n\n",!0)
if(u.fx.fg(u.ch.x)){o=u.fx.a9(u.ch.x)
t.dJ(0,"<subject> look<s> behind",o)
t.dJ(0,"<subject> see<s> the giant worm's hideous head approaching",o)
if(u.fx.fg(u.cx.x))t.aO(0,"You both start sprinting again.",!0)
else{t.dJ(0,"<subject> take<s> a last look at Briana",o)
t.ih(0,"<subject> start<s> sprinting again, alone",!0,o)}t.aO(0,"\n\n",!0)
t.aO(0,"TO BE CONTINUED.",!0)}else t.aO(0,"You will soon be the giant worm's food.",!0)
u.f.t+=t.cn()
z=1
break}n=C.a.gI(q)
m=n.d3(u.fx)
q=u.fx
l=N.aW("ActorPlanner")
k=new H.H(0,null,null,null,null,null,0,[null,null])
j=m==null
i=j?m:m.gm()
h=new Y.ap(H.w([],[Y.a3]),0,P.ay())
h.b=q.f
g=new G.hj(l,i,new B.bo(q,null,h,1,1,!0,!1,!1,0),0,!1,k)
if(j)H.h(P.A("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(q)+". Situation: "+H.a(q.giy())))
z=3
return P.u(g.jp(),$async$bZ,y)
case 3:if(k.gH(k)){l.ed("There are no actions available for actorId="+H.a(i)+".")
j="Actions not available for "+H.a(i)+" and "
i=J.m(q)
q="PlanConsequence<"+i.gC(q)+", "+i.i(q)+", "+C.q.i(null)
l.bw(j+(q+", 1, 0, >")+".")}f=Z.jQ(k)
if(f.b.length===0){p.eh("No recommendation for "+H.a(m.gj()))
u.fx.f7(n.gm());++u.fx.f
z=1
break}z=m.gJ()?4:6
break
case 4:s=f.b
z=s.length===1?7:8
break
case 7:z=9
return P.u(u.bK((s&&C.a).gbp(s),m,t),$async$bZ,y)
case 9:z=1
break
case 8:u.f.t+=t.cn()
C.a.sk(t.a,0)
p.bw("planner.generateTable for "+H.a(m.gj()))
g.ee().G(0,new O.iy(u))
t=f.fu(6,O.fP())
t.toString
e=P.W(t,!1,H.v(t,"x",0))
t=new O.iz(new O.iB())
s=e.length-1
if(s-0<=32)H.eS(e,0,s,t)
else H.eR(e,0,s,t)
for(t=e.length,s=u.c,d=0;d<e.length;e.length===t||(0,H.ac)(e),++d){c=e[d]
s.$3$helpMessage$script(c.gj(),c.ga0(),new O.iA(u,m,c))}z=1
break
z=5
break
case 6:q=m.gf5()
z=10
return P.u(u.bK(f.jo(q==null?O.fP():q),m,t),$async$bZ,y)
case 10:case 5:t.fs(s)
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$bZ,y)},
bK:function(a,b,c){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$bK=P.af(function(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t=a.cM(b,u.fy,u.fx)
s=P.W(t,!0,H.v(t,"x",0))
z=b.gJ()?3:5
break
case 3:r=a.S(b,u.fx)
z=r===1?6:8
break
case 6:u.fy=C.a.gbp(s)
z=7
break
case 8:z=r===0?9:11
break
case 9:u.fy=C.a.gbp(s)
z=10
break
case 11:q=C.a.gI(J.i(a.gW()).split("."))
t=a.bn(b,u.fx)
p=a.gX()&&b.iX(a.gW())
o="use "+H.a(q)
u.eP()
z=12
return P.u(u.e.$4$rerollEffectDescription$rerollable(r,t,o,p),$async$bK,y)
case 12:n=e
p=new H.O(s,new O.iq(n),[H.j(s,0)])
u.fy=p.gbp(p)
if(n.gjL()===!0){m=A.ds(u.fy.gbg())
m.af(b.gm(),new O.ir())
t=u.fy
p=t.geW()
o=H.w([],[Y.a3])
l=new Y.ap(o,0,P.ay())
C.a.al(o,t.c.a)
o=t.d
k=t.e
j=t.f
i=t.r
h=t.x
t=t.y
l.b=m.f
u.fy=new B.bo(m,p,l,o,k,j,i,h,t)}case 10:case 7:z=4
break
case 5:g=S.k6(new H.an(s,new O.is(),[null,null]),1)
if(g>=s.length){x=H.e(s,g)
z=1
break}u.fy=s[g]
case 4:C.a.al(c.a,u.fy.gem().a)
u.fx=u.fy.gbg()
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$bK,y)}},
it:{"^":"b:0;",
$1:function(a){var z
a.gn()
a.y=1000
a.gn()
a.cy="orc"
a.gn()
a.dx=!1
a.gn()
a.dy=C.A
z=$.$get$aI()
a.gn()
a.c=new U.cA(!1,10,!0,z,"sword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
z=$.$get$dK()
a.gn()
a.fx=z
a.gn()
a.fy=O.fO()
return a}},
iu:{"^":"b:0;",
$1:function(a){var z
a.gn()
a.y=1001
a.gn()
a.cy="goblin"
a.gn()
a.dx=!1
a.gn()
a.dy=C.A
z=$.$get$aI()
a.gn()
a.c=new U.cA(!1,10,!0,z,"scimitar",C.c)
z=$.$get$dK()
a.gn()
a.fx=z
a.gn()
a.fy=O.fO()
return a}},
iv:{"^":"b:0;a",
$1:function(a){var z=this.a
return[z.cy,z.db]}},
iw:{"^":"b:0;a",
$1:function(a){var z
a.gn()
a.y=1
a.gn()
a.ch=!0
a.gn()
a.dy=C.B
a.gn()
a.cy="Filip"
z=$.$get$aI()
a.gn()
a.c=new U.cA(!1,10,!0,z,"sword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
a.gn()
a.x=1
a.gn()
a.z=1000
z=this.a.dx.b
a.gn()
a.db=z
return a}},
ix:{"^":"b:0;a",
$1:function(a){var z,y
a.gn()
a.y=100
a.gn()
a.dy=C.a1
a.gn()
a.cy="Briana"
z=$.$get$aI()
a.gn()
a.c=new U.cA(!1,10,!0,z,"longsword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
z=this.a
y=z.dx.b
a.gn()
a.db=y
z=z.ch.x
a.gn()
a.fr=z
return a}},
iy:{"^":"b:0;a",
$1:function(a){return this.a.y.bw(a)}},
iB:{"^":"b:37;",
$1:function(a){if(a instanceof Q.K)return H.a(a.b.gj())+" "+a.gj()
return"ZZZZZZ "+H.a(a.gj())}},
iz:{"^":"b:5;a",
$2:function(a,b){var z=this.a
return J.c3(z.$1(a),z.$1(b))}},
iA:{"^":"b:12;a,b,c",
$0:function(){var z=0,y=new P.al(),x=1,w,v=this,u
var $async$$0=P.af(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:u=v.a
z=2
return P.u(u.bK(v.c,v.b,u.go),$async$$0,y)
case 2:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$$0,y)}},
iq:{"^":"b:0;a",
$1:function(a){return a.gdZ()===this.a.gdZ()}},
ir:{"^":"b:0;",
$1:function(a){var z=a.gbi()
if(typeof z!=="number")return z.aJ()
a.sbi(z-1)
return a}},
is:{"^":"b:0;",
$1:function(a){return a.gjq()}}}],["","",,Q,{"^":"",
fR:function(a,b,c){return new P.aE(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$fR(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=t.length!==0?C.a.gI(t):null
s=J.hg(t.bh(y.a,y),new Q.op(z))
t=J.aa(s.a),r=new H.fl(t,s.b,[H.j(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gE()
p=x.$1(q)
if(p.ga1()&&!z.dU(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aC()
case 1:return P.aD(u)}}})},
fS:function(a,b,c){return new P.aE(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$fS(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=y.ef((t.length!==0?C.a.gI(t):null).gaY()).giL().a,t=new J.bC(t,t.length,0,null,[H.j(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aC()
case 1:return P.aD(u)}}})},
op:{"^":"b:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gbc()}},
kh:{"^":"d;a",
i:function(a){return C.W.h(0,this.a)},
q:{"^":"pj<"}},
ae:{"^":"d;",
cM:function(a,b,c){var z=this
return new P.aE(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cM(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.S(y,x.gbg())
v=s>0?2:3
break
case 2:r=A.ds(w)
v=4
return B.eB(r,x,z,z.ho(r,y,w,z.gT(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.ds(w)
v=7
return B.eB(r,x,z,z.hn(r,y,w,z.gU(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aC()
case 1:return P.aD(t)}}})},
eu:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
z=a.a.bH(0,new Q.hh(b))
y=new O.dZ(null,null,null,null,null,null,null,null,null,null,null,null)
x=new H.a1(H.c_(this),null).i(0)
y.gL().c=x
x=b.gm()
y.gL().r=x
y.gL().f=C.P
y.gL().ch=f
y.gL().Q=e
x=this.ga1()
y.gL().z=x
if(!!this.$isK){x=y.gL()
w=x.x
if(w==null){w=new L.b1(null,null,[P.t])
w.b6()
w.v(C.i)
x.x=w
x=w}else x=w
w=this.b
v=w.gm()
x.toString
if(v==null)H.h(P.A("null element"))
x.geU().p(0,v)
x=H.a(new H.a1(H.c_(this),null))+" at "+H.a(w.gj())
y.gL().d=x}else{x=new H.a1(H.c_(this),null).i(0)
y.gL().d=x}u=new Y.ap(H.w([],[Y.a3]),0,P.ay())
x=a.e
t=(x.length!==0?C.a.gI(x):null).gm()
a.gC(a);(x.length!==0?C.a.gI(x):null).fq(a,u)
this.a=d.$3(z,a,u)
if(a.dq(t)!=null)a.f7(t);++a.f
w=a.fR(t)
if(!(w==null))w.fp(a,u)
while(!0){w=x.length!==0?C.a.gI(x):null
if((w==null?w:w.d3(a))!=null){w=x.length!==0?C.a.gI(x):null
w=!J.f(w==null?w:w.d6(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gI(x):null)==null)break
C.a.bW(x)}if(this.a==null)H.h(new P.R("No description given when executing "+this.i(0)+". You should return it from your world-modifying function."))
x=this.a
y.gL().e=x
x=a.f
y.gL().y=x
a.c.eZ(y.D())
return u},
ho:function(a,b,c,d,e){return this.eu(a,b,c,d,!1,e)},
hn:function(a,b,c,d,e){return this.eu(a,b,c,d,e,!1)}},
hh:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.gm())}},
K:{"^":"ae;bv:b<",
gj:function(){var z=new Y.ap(H.w([],[Y.a3]),0,P.ay())
z.ie(0,this.ga6(),this.b)
return z.cn()},
bn:function(a,b){var z=new Y.ap(H.w([],[Y.a3]),0,P.ay())
z.ik(0,this.ga7(),this.b,a,!0)
return z.cn()},
i:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.a(z.gm())+"/"+H.a(z.gj())+">"}},
cf:{"^":"ae;",
gj:function(){return this.b.gaF()},
i:function(a){return"ExitAction<"+H.a(this.b.gaF())+">"}}}],["","",,O,{"^":"",c4:{"^":"d;",
i:function(a){return"ActionRecord<"+H.a(this.b)+", "+H.a(this.c)+", "+H.a(this.d)+">"}},je:{"^":"d;a",
i:function(a){return C.a0.h(0,this.a)}},md:{"^":"c4;a,eX:b<,c,aF:d<,e,e4:f<,eo:r<,O:x<,fL:y<,z,fM:Q<",
ad:function(a){var z=new O.dZ(null,null,null,null,null,null,null,null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof O.c4))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b))if(J.f(this.c,b.c))if(J.f(this.d,b.d)){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.f(this.f,b.f))if(J.f(this.r,b.r)){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1
else z=!1
else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)),J.l(this.f)),J.l(this.r)),J.l(this.x)),J.l(this.y)),J.l(this.z)),J.l(this.Q)))},
i:function(a){return"ActionRecord {accomplices="+J.i(this.a)+",\nactionClass="+H.a(J.i(this.b))+",\nactionName="+H.a(J.i(this.c))+",\ndescription="+H.a(J.i(this.d))+",\nknownTo="+H.a(J.i(this.e))+",\nprotagonist="+H.a(J.i(this.f))+",\nsufferers="+J.i(this.r)+",\ntime="+J.i(this.x)+",\nwasAggressive="+J.i(this.y)+",\nwasFailure="+J.i(this.z)+",\nwasSuccess="+J.i(this.Q)+",\n}"}},dZ:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
geX:function(){return this.gL().c},
gaF:function(){return this.gL().e},
ge4:function(){return this.gL().r},
geo:function(){var z,y
z=this.gL()
y=z.x
if(y==null){y=new L.b1(null,null,[P.t])
y.b6()
y.v(C.i)
z.x=y
z=y}else z=y
return z},
gO:function(){return this.gL().y},
gfL:function(){return this.gL().z},
gfM:function(){return this.gL().ch},
gL:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.b1(null,null,[H.j(z,0)])
y.b6()
y.v(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.b1(null,null,[H.j(z,0)])
y.b6()
y.v(z)
z=y}this.x=z
z=this.a
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
if(z==null){y=this.gL()
x=y.b
if(x==null){x=new L.b1(null,null,[P.t])
x.b6()
x.v(C.i)
y.b=x
y=x}else y=x
y=y==null?y:y.D()
x=this.gL().c
w=this.gL().d
v=this.gL().e
u=this.gL().f
t=this.gL().r
s=this.gL()
r=s.x
if(r==null){r=new L.b1(null,null,[P.t])
r.b6()
r.v(C.i)
s.x=r
s=r}else s=r
s=s==null?s:s.D()
r=this.gL().y
q=this.gL().z
p=this.gL().Q
o=this.gL().ch
z=new O.md(y,x,w,v,u,t,s,r,q,p,o)
if(y==null)H.h(P.r("accomplices"))
if(x==null)H.h(P.r("actionClass"))
if(w==null)H.h(P.r("actionName"))
if(v==null)H.h(P.r("description"))
if(u==null)H.h(P.r("knownTo"))
if(t==null)H.h(P.r("protagonist"))
if(s==null)H.h(P.r("sufferers"))
if(r==null)H.h(P.r("time"))
if(q==null)H.h(P.r("wasAggressive"))
if(p==null)H.h(P.r("wasFailure"))
if(o==null)H.h(P.r("wasSuccess"))}this.v(z)
return z}}}],["","",,R,{"^":"",
fT:function(a,b){return new P.aE(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$fT(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bT(new H.O(u,new R.oq(z),[H.j(u,0)]))
case 3:return P.aC()
case 1:return P.aD(v)}}})},
oq:{"^":"b:0;a",
$1:function(a){var z,y
z=a.gdS()
y=this.a.gm()
return z==null?y==null:z===y}},
X:{"^":"jv;",
gbm:function(){return this.r>0},
gaR:function(){return this.dx===C.l},
gaa:function(){return this.dx===C.o},
ga5:function(){return this.dx===C.j},
iX:function(a){return this.fx>=1},
dU:function(a,b){return this.fi(a,b)>0},
fi:function(a,b){var z,y
if(this.dY(b)){z=a.gbd()
y=this.fy.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 10
if(this.hJ(a,b,10))return 1
z=a.gbd()
y=this.fy.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
dY:function(a){var z,y
z=a.bX("Confuse",this,!0)
if(z==null)return!1
y=a.jB("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cA:function(a){var z,y,x
z=a.a9(this.x)
y=z.gam()
if(typeof y!=="number")return H.C(y)
x=2*y
if(!z.gbm())x-=10
y=a.a
return new A.cQ(x,new H.O(y,new R.hL(this),[H.j(y,0)]).aQ(0,0,new R.hM()),y.aQ(0,0,new R.hN(this,a)))},
au:function(a){var z=this.e
return z!=null&&z.a===a},
hJ:function(a,b,c){var z=b.jC(a,this,!0)
if(z==null)return!1
return z<=c},
$isbk:1},
jv:{"^":"d+cX;"},
hL:{"^":"b:0;a",
$1:function(a){return J.f(a.gbd(),this.a.fy)}},
hM:{"^":"b:39;",
$2:function(a,b){return J.Z(J.Z(a,b.gbc()?2:0),2*b.gam())}},
hN:{"^":"b:41;a,b",
$2:function(a,b){var z=b.gbc()?1:0
return J.Z(a,(z+b.gam())*this.a.fi(b,this.b))}},
hi:{"^":"d;Z:c<,at:e?,am:f@,bi:x<,m:y<,J:ch<,j:cy@,aY:db@,F:dy<,dS:fr<,bd:fx<"},
df:{"^":"d;a",
i:function(a){return C.z.h(0,this.a)}},
me:{"^":"X;a,b,f5:c<,aY:d<,Z:e<,dS:f<,am:r<,m:x<,y,dW:z<,J:Q<,ch,fl:cx<,j:cy<,cS:db<,dx,F:dy<,fr,bi:fx<,bd:fy<",
ad:function(a){var z=new R.bP(null,!0,H.w([],[P.o]),null,null,C.j,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.k,null,$.$get$dR(),null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.X))return!1
if(this.b===b.b)if(J.f(this.c,b.c))if(J.f(this.d,b.d)){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y)if(this.r===b.r){z=this.x
y=b.x
if(z==null?y==null:z===y)if(this.y===b.y)if(this.Q===b.Q)if(this.ch===b.ch)if(this.cx===b.cx){z=this.cy
y=b.cy
if(z==null?y==null:z===y)if(this.db===b.db)if(this.dx===b.dx)if(this.dy===b.dy)z=this.fx===b.fx&&J.f(this.fy,b.fy)
else z=!1
else z=!1
else z=!1
else z=!1}else z=!1
else z=!1
else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,C.p.gC(!0)),H.a0(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)),J.l(this.f)),this.r&0x1FFFFFFF),J.l(this.x)),this.y&0x1FFFFFFF),C.p.gC(!0)),C.p.gC(this.Q)),H.a0(this.ch)),this.cx&0x1FFFFFFF),J.l(this.cy)),C.p.gC(this.db)),H.a0(this.dx)),H.a0(this.dy)),C.q.gC(this.fr)),this.fx&0x1FFFFFFF),J.l(this.fy)))},
i:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.aU(this.b,"[","]")+",\ncombineFunction="+J.i(this.c)+",\ncurrentRoomName="+H.a(J.i(this.d))+",\ncurrentWeapon="+J.i(this.e)+",\nfollowingActorId="+J.i(this.f)+",\nhitpoints="+C.h.i(this.r)+",\nid="+J.i(this.x)+",\ninitiative="+C.d.i(this.y)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.Q)+",\nitems="+P.aU(this.ch,"{","}")+",\nmaxHitpoints="+C.d.i(this.cx)+",\nname="+J.i(this.cy)+",\nnameIsProperNoun="+String(this.db)+",\npose="+H.a(C.z.h(0,this.dx.a))+",\npronoun="+this.dy.a+",\nshield="+C.q.i(this.fr)+",\nstamina="+C.h.i(this.fx)+",\nteam="+J.i(this.fy)+",\n}"}},
bP:{"^":"hi;go,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
gf5:function(){this.gn()
return this.fy},
gaY:function(){this.gn()
return this.db},
saY:function(a){this.gn()
this.db=a},
gZ:function(){this.gn()
return this.c},
gdS:function(){this.gn()
return this.fr},
gam:function(){this.gn()
return this.f},
sam:function(a){this.gn()
this.f=a},
gm:function(){this.gn()
return this.y},
gJ:function(){this.gn()
return this.ch},
gfl:function(){this.gn()
return this.r},
gj:function(){this.gn()
return this.cy},
sj:function(a){this.gn()
this.cy=a},
gcS:function(){this.gn()
return this.dx},
sat:function(a){this.gn()
this.e=a},
gF:function(){this.gn()
return this.dy},
gbi:function(){this.gn()
return this.x},
sbi:function(a){this.gn()
this.x=a},
gbd:function(){this.gn()
return this.fx},
gn:function(){var z=this.go
if(z!=null){z.a
this.a=!0
this.b=this.go.b
this.fy=this.go.c
this.db=this.go.d
this.c=this.go.e
this.fr=this.go.f
this.f=this.go.r
this.y=this.go.x
this.z=this.go.y
this.go.z
this.Q=!0
this.ch=this.go.Q
this.cx=this.go.ch
this.r=this.go.cx
this.cy=this.go.cy
this.dx=this.go.db
this.e=this.go.dx
this.dy=this.go.dy
this.d=this.go.fr
this.x=this.go.fx
this.fx=this.go.fy
this.go=null}return this},
v:function(a){this.go=a},
D:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.go
if(z==null){this.gn()
this.a
this.gn()
y=this.b
this.gn()
x=this.fy
this.gn()
w=this.db
this.gn()
v=this.c
this.gn()
u=this.fr
this.gn()
t=this.f
this.gn()
s=this.y
this.gn()
r=this.z
this.gn()
this.Q
this.gn()
q=this.ch
this.gn()
p=this.cx
this.gn()
o=this.r
this.gn()
n=this.cy
this.gn()
m=this.dx
this.gn()
l=this.e
this.gn()
k=this.dy
this.gn()
j=this.d
this.gn()
i=this.x
this.gn()
h=this.fx
z=new R.me(!0,y,x,w,v,u,t,s,r,!0,q,p,o,n,m,l,k,j,i,h)
if(s==null)H.h(P.r("id"))
if(n==null)H.h(P.r("name"))
if(h==null)H.h(P.r("team"))}this.v(z)
return z}}}],["","",,A,{"^":"",cQ:{"^":"d;bG:a<,cq:b<,bv:c<",
aJ:function(a,b){return new A.a6(this.a-b.gbG(),J.ah(this.b,b.gcq()),J.ah(this.c,b.gbv()))},
i:function(a){return"ActorScore<self="+C.h.cr(this.a,2)+",team="+J.bh(this.b,2)+",enemy="+J.bh(this.c,2)+">"}},a6:{"^":"d;bG:a<,cq:b<,bv:c<",
gjb:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
a8:function(a,b){return new A.a6(this.a+b.gbG(),J.Z(this.b,b.gcq()),J.Z(this.c,b.gbv()))},
bF:function(a,b){return new A.a6(this.a*b,J.bg(this.b,b),J.bg(this.c,b))},
d1:function(a,b){if(typeof b!=="number")return H.C(b)
return new A.a6(this.a/b,J.bf(this.b,b),J.bf(this.c,b))},
i:function(a){return"ActorScoreChange<self="+C.h.cr(this.a,2)+",team="+J.bh(this.b,2)+",enemy="+J.bh(this.c,2)+">"},
q:{
hK:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ac)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.C(r)
w+=r
r=s.c
if(typeof r!=="number")return H.C(r)
v+=r}if(y===0)throw H.c(P.A("Cannot average empty iterable"))
return new A.a6(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
p0:function(a){switch(a){case C.J:return"spear"
case C.K:return"branch"
case C.L:return"tent"
case C.c:return"sword"
default:throw H.c(P.A(a))}},
d0:{"^":"jw;ec:a<",
gaF:function(){return U.p0(this.a)},
$isbk:1},
jw:{"^":"d+cX;"},
ch:{"^":"d;a",
i:function(a){return C.Y.h(0,this.a)}},
cA:{"^":"d0;b,c,dW:d<,bd:e<,j:f<,a",
gm:function(){return H.a0(this)},
gbm:function(){return!1},
gJ:function(){return!1},
gcS:function(){return!1},
gF:function(){return C.k}}}],["","",,G,{"^":"",jo:{"^":"d;",
eP:function(){var z,y
z=this.f
y=z.t
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.t=""}},
jY:[function(a){this.f.t+=a},"$1","giH",2,0,14],
b1:function(){var z=0,y=new P.al(),x,w=2,v,u=this,t,s
var $async$b1=P.af(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.x==null)throw H.c(new P.R("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.r){u.d.sk(0,0)
u.a.$1(u.x)
z=1
break}t=u.d
s=u.f
case 3:if(!!0){z=4
break}if(!(!u.r&&t.gk(t)===0&&s.t.length===0)){z=4
break}z=5
return P.u(u.bZ(),$async$b1,y)
case 5:z=3
break
case 4:u.eP()
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$b1,y)}}}],["","",,B,{"^":"",e6:{"^":"d;cz:a<,cQ:b<,ck:c<",
i:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.h.cr(this.b,3)+", score="+this.a.i(0)+">"}},bo:{"^":"d;bg:a<,eW:b<,em:c<,jq:d<,cQ:e<,f,r,dZ:x<,ck:y<",
gC:function(a){return X.be([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
B:function(a,b){var z
if(b==null)return!1
z=J.m(b)
return!!z.$isbo&&this.gC(this)===z.gC(b)},
i:function(a){var z,y
z=this.a
y=J.m(z)
z="PlanConsequence<"+y.gC(z)+", "+y.i(z)+", "+J.i(this.b)+", "+H.a(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
q:{
eB:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gcQ()
z=z?0:b.gck()+1
d.b=a.f
return new B.bo(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",hj:{"^":"d;a,b,c,d,e,f",
iu:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.a_("...")
z.a_("combining scores")
y=H.w([],[A.a6])
x=new G.hD()
for(w=J.aa(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gE()
z.a_(new G.hB(r))
if(r.gcQ()>0.15)if(s==null){z.a_("    - first _bestCase")
s=r}else if(J.a_(x.$1(r.gcz()),x.$1(s.gcz()))){z.a_("    - new _bestCase")
s=r}q=r.gcz()
p=J.ah(q.b,u)
o=J.ah(q.c,t)
n=r.b
m=new A.a6((q.a-v)*n,J.bg(p,n),J.bg(o,n))
z.a_(new G.hC(m))
y.push(m)}l=A.hK(y)
x=s==null
if(x)k=C.D
else{w=s.gcz()
k=new A.a6(w.a-v,J.ah(w.b,u),J.ah(w.c,t))}x=x?s:s.gck()
if(typeof x!=="number")return H.C(x)
x=new A.a6(k.a/x,J.bf(k.b,x),J.bf(k.c,x))
z.a_("- uplifts average = "+("ActorScoreChange<self="+C.h.cr(l.a,2)+",team="+J.bh(l.b,2)+",enemy="+J.bh(l.c,2)+">"))
z.a_("- best = "+x.i(0))
j=x.a8(0,l)
z.a_("- result = "+j.i(0))
return j},
ee:function(){var z=this
return new P.aE(function(){var y=0,x=1,w,v,u,t,s
return function $async$ee(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbS(),u=u.gN(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gE()
y=4
return""+t+") "+H.a(s.gj())+"\t"+H.a(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aC()
case 1:return P.aD(w)}}})},
cT:function(a,b,c){var z=0,y=new P.al(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k
var $async$cT=P.af(function(d,e){if(d===1){w=e
z=x}while(true)switch(z){case 0:u=v.f
u.aE(0)
t=v.c
s=t.a
r=s.a.bH(0,new G.hE(v))
q=r.cA(s)
p=v.a
p.bw("Planning for "+H.a(r.cy)+", initialScore="+q.i(0))
o=new P.aO(v.dr(r,s).a(),null,null,null)
case 2:if(!o.u()){z=3
break}n=o.c
m=n==null?o.b:n.gE()
p.aP(new G.hF(r,m))
if(!m.R(r,s)){p.aP(new G.hG(m))
z=2
break}z=4
return P.u(v.c2(t,m,b,a,c).bY(0),$async$cT,y)
case 4:l=e
if(J.dW(l)===!0){p.aP(new G.hH(m))
u.l(0,m,C.E)
z=2
break}p.aP(new G.hI(q,m,l))
k=v.iu(l,q,b)
u.l(0,m,k)
p.aP(new G.hJ(m,k))
z=2
break
case 3:v.e=!0
return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$cT,y)},
jp:function(){return this.cT(50,10,null)},
dr:function(a,b){return new P.aE(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p
return function $async$dr(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.bT((u.length!==0?C.a.gI(u):null).gbL())
case 2:u=(u.length!==0?C.a.gI(u):null).gb7()
t=u.length
s=H.ag(H.as(Q.cf),[H.as(Q.aS)])
r=H.ag(H.as(Q.K),[H.as(R.X)])
q=0
case 3:if(!(q<u.length)){x=5
break}p=u[q]
x=r.aM(p)?6:8
break
case 6:x=9
return P.bT(Q.fR(z,y,p))
case 9:x=7
break
case 8:x=s.aM(p)?10:12
break
case 10:x=13
return P.bT(Q.fS(z,y,p))
case 13:x=11
break
case 12:throw H.c(new P.R(p.i(0)+" is not one of the supported ones"))
case 11:case 7:case 4:u.length===t||(0,H.ac)(u),++q
x=3
break
case 5:return P.aC()
case 1:return P.aD(v)}}})},
c2:function(a3,a4,a5,a6,a7){var $async$c2=P.af(function(a8,a9){switch(a8){case 2:u=x
z=u.pop()
break
case 1:v=a9
z=w}while(true)switch(z){case 0:s={}
r=a3.a
q=r.a.bH(0,new G.hm(t))
p=t.a
p.aP("=====")
p.aP(new G.hn(a4,q))
p.aP(new G.ho(a4))
if(!a4.R(q,r)){p.aP("- firstAction not applicable")
z=1
break}o=q.cA(r)
p.aP(new G.ht(a3,o))
p.aP(new G.hu(a3))
n=P.aM(null,B.bo)
m=P.I(null,null,null,A.b5)
l=J.m(r)
k=l.gC(r)
for(j=new P.aO(a4.cM(q,a3,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gE()
if(l.gC(r)!==k)throw H.c(new P.R("Action "+a4.i(0)+" modified world state when producing "+H.a(h)+"."))
n.ag(h)}s.a=0
r=t.b
case 3:if(!!n.gH(n)){z=4
break}++s.a
g=n.cV()
p.a_("----")
p.a_(new G.hv(g))
p.a_(new G.hw(g))
if(g.gck()>a5||s.a>a6){p.a_(new G.hx(s,a5,g))
p.a_(new G.hy(g))
z=4
break}z=g.gbg().e.length===0?5:6
break
case 5:p.a_("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.ba(0,new G.hz(t),new G.hA())
if(q==null){p.a_("- this actor ("+H.a(r)+") has been removed")
z=3
break}f=new B.e6(q.cA(l),g.e,g.y)
p.a_(new G.hp(f))
z=7
x=[1]
return P.cG(P.fr(f),$async$c2,y)
case 7:z=3
break
case 6:l=g.a
j=l.e
e=(j.length!==0?C.a.gI(j):null).d3(l)
q=l.a.bH(0,new G.hq(t))
d=J.f(e,q)
p.a_("- actor: "+H.a(e.gj())+" (isMain=="+d+")")
p.a_("- mainActor: "+H.a(q.gj()))
f=new B.e6(q.cA(l),g.e,g.y)
p.a_(new G.hr(o,f))
p.a_(new G.hs(g))
z=8
x=[1]
return P.cG(P.fr(f),$async$c2,y)
case 8:p.a_("- generating all actions for "+H.a(e.gj()))
j=n.c
i=n.b
c=n.a
for(b=new P.aO(t.dr(e,l).a(),null,null,null);b.u();){a=b.c
a0=a==null?b.b:a.gE()
if(!a0.R(e,l))continue
for(a=new P.aO(a0.cM(e,g,l).a(),null,null,null);a.u();){a1=a.c
a2=a1==null?a.b:a1.gE();++t.d
if(a2.gcQ()<0.05)continue
if(m.M(0,a2.gbg()))continue
n.ag(a2)}}p.a_("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&c.length-1)>>>0))+" new PlanConsequences")
m.p(0,l)
z=3
break
case 4:case 1:return P.cG(null,0,y)
case 2:return P.cG(v,1,y)}})
var z=0,y=P.mx($async$c2),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
return P.nU(y)}},hD:{"^":"b:20;",
$1:function(a){return J.ah(a.b,a.c)}},hB:{"^":"b:1;a",
$0:function(){return"  - consequence: "+H.a(this.a)}},hC:{"^":"b:1;a",
$0:function(){return"    - uplift = "+this.a.i(0)}},hE:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hF:{"^":"b:1;a,b",
$0:function(){return"Evaluating action '"+H.a(this.b.gj())+"' for "+H.a(this.a.cy)}},hG:{"^":"b:1;a",
$0:function(){return"- action '"+H.a(this.a.gj())+"' isn't applicable"}},hH:{"^":"b:1;a",
$0:function(){return"- action '"+H.a(this.a.gj())+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},hI:{"^":"b:1;a,b,c",
$0:function(){return"- action '"+H.a(this.b.gj())+"' leads to "+H.a(J.aj(this.c))+" different ConsequenceStats, initialScore="+this.a.i(0)}},hJ:{"^":"b:1;a,b",
$0:function(){return"- action '"+H.a(this.a.gj())+"' was scored "+H.a(this.b)}},hm:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hn:{"^":"b:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+H.a(this.a.gj())+"' of "+H.a(this.b.gj())}},ho:{"^":"b:1;a",
$0:function(){return"- firstAction == "+H.a(this.a)}},ht:{"^":"b:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.i(0)+", cumProb="+H.a(z.e)+" (prob="+H.a(z.d)+", ord="+z.y+")"}},hu:{"^":"b:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bF(" ",z.y)+"- "+J.i(z.b)}},hv:{"^":"b:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+H.a(this.a.geW().gj())+"'"}},hw:{"^":"b:1;a",
$0:function(){var z=this.a.gbg().e
return"- situation: "+H.a(J.h9(z.length!==0?C.a.gI(z):null))}},hx:{"^":"b:1;a,b,c",
$0:function(){return"- order ("+this.c.gck()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},hy:{"^":"b:1;a",
$0:function(){var z=this.a.gbg().c
return"- how we got here: "+new H.an(z,new G.hl(),[H.j(z,0),null]).cj(0," <- ")}},hl:{"^":"b:0;",
$1:function(a){return a.gaF()}},hz:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hA:{"^":"b:1;",
$0:function(){return}},hp:{"^":"b:1;a",
$0:function(){return"- "+this.a.i(0)}},hq:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hr:{"^":"b:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.i(0)+" (initial="+this.a.i(0)+")"}},hs:{"^":"b:1;a",
$0:function(){var z=this.a.gbg().c
return"- how we got here: "+new H.an(z,new G.hk(),[H.j(z,0),null]).cj(0," <- ")}},hk:{"^":"b:0;",
$1:function(a){return a.gaF()}}}],["","",,Z,{"^":"",jP:{"^":"d;a,b",
gbL:function(){return this.b},
gH:function(a){return this.b.length===0},
fu:function(a,b){var z=this
return new P.aE(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fu(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bT(t)
case 5:w=1
break
case 4:s=z.hD(new Z.jS())
r=z.dn(new Z.jT(),[s])
q=z.dn(new Z.jU(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bp().bw("best self preserving: "+H.a(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bp().bw("best enemy damaging: "+H.a(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bp().bw("best team preserving: "+H.a(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}t=z.b;(t&&C.a).cC(t,new Z.jV(z,x))
t=z.b,o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.m(m)
if(l.B(m,s)){w=17
break}if(l.B(m,r)){w=17
break}if(l.B(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ac)(t),++n
w=16
break
case 18:case 1:return P.aC()
case 2:return P.aD(u)}}})},
dn:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ac)(z),++u){t=z[u]
if(C.a.M(b,t))continue
if(w==null||J.a_(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hD:function(a){return this.dn(a,C.i)},
jo:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=this.b
if(y.length===1)return(y&&C.a).gbp(y);(y&&C.a).cC(y,new Z.jW(this,a))
y=this.a.a
x=y.gc_().aQ(0,1/0,new Z.jX(a))
w=y.gc_().aQ(0,-1/0,new Z.jY(a))
y=J.a9(w)
v=J.a9(x)
u=v.aJ(x,J.bg(y.aJ(w,x),0.1))
z.a=u
if(v.B(x,w)){u=J.ah(u,1)
z.a=u
v=u}else v=u
t=y.aJ(w,v)
s=P.jm(this.b.length,new Z.jZ(z,this,a,t),!1,P.J)
r=new H.an(s,new Z.k_(C.a.aQ(s,0,Z.h_())),[null,null]).be(0,!1)
z=C.a.aQ(r,0,Z.h_())
if(typeof z!=="number")return H.C(z)
v=r.length
y=v-1
if(y<0)return H.e(r,y)
z=J.Z(r[y],1000-z)
if(y>=r.length)return H.e(r,y)
r[y]=z
q=S.k7(r,1000)
z=this.b
if(q>=z.length)return H.e(z,q)
return z[q]},
hc:function(a){var z,y
if(a.gH(a))$.$get$bp().ed("Created with no recommendations.")
z=a.gbS()
y=H.v(z,"x",0)
y=P.W(new H.O(z,new Z.jR(a),[y]),!1,y)
this.b=y
if(y.length===0)$.$get$bp().ed("After removing actions scored by undefined, there are no recommendations.")},
q:{
jQ:function(a){var z=new Z.jP(new P.fk(a,[null,null]),null)
z.hc(a)
return z},
ph:[function(a,b){return J.Z(a,b)},"$2","h_",4,0,40]}},jR:{"^":"b:0;a",
$1:function(a){return!this.a.h(0,a).gjb()}},jS:{"^":"b:0;",
$1:function(a){return a.gbG()}},jT:{"^":"b:0;",
$1:function(a){return J.h6(a.gbv())}},jU:{"^":"b:0;",
$1:function(a){return a.gcq()}},jV:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c3(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},jW:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c3(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},jX:{"^":"b:5;a",
$2:function(a,b){return P.oA(a,this.a.$1(b))}},jY:{"^":"b:5;a",
$2:function(a,b){return P.oz(a,this.a.$1(b))}},jZ:{"^":"b:7;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.bf(J.ah(this.c.$1(z.a.a.h(0,y[a])),this.a.a),this.d)}},k_:{"^":"b:0;a",
$1:function(a){return J.hd(J.bg(J.bf(a,this.a),1000))}}}],["","",,K,{"^":"",bM:{"^":"d;a,j:b<,aF:c<,d,jl:e<,f,bD:r<",
giL:function(){return this.a},
gC:function(a){return C.b.gC(this.b)},
B:function(a,b){if(b==null)return!1
return b instanceof K.bM&&b.b===this.b},
q:{
kk:function(a,b,c,d,e,f,g){var z,y
z=new K.bM(null,a,b,c,d,e,g)
y=new S.am(null,null,[Q.aS])
y.ay()
y.v(f)
z.a=y.D()
return z}}}}],["","",,Q,{"^":"",aS:{"^":"d;f6:a<,aF:b<,c"}}],["","",,S,{"^":"",aA:{"^":"d;",
gb7:function(){return C.i},
gbL:function(){return C.i},
d3:function(a){return this.b5(this.gO(),a)},
fp:function(a,b){},
fq:function(a,b){},
d6:function(a){return!0}}}],["","",,S,{"^":"",
eF:function(a){var z=$.$get$b_().ar(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
k6:function(a,b){var z,y,x,w,v
z=$.$get$b_().fn()*b
for(y=new H.d6(a,a.gk(a),0,null,[H.v(a,"az",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.C(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.A("The weights do not add up to total="+b))},
k7:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b_().ar(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ac)(a),++v){t=a[v]
if(typeof t!=="number")return H.C(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.A("The weights do not add up to total="+b))},
cp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bb(a,"{")
if(z!==-1&&z<a.length-1){y=H.w([],[P.t])
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
if(q>1){p=$.$get$b_().ar(q)
o=C.b.ax(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cp(C.b.ax(a,m+1,y[l]))
if(typeof x!=="number")return x.a8()
l+=C.b.ax(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cp(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a8()
v=u+1
return C.b.ax(a,0,v)+S.cp(C.b.bj(a,v))}}else return a},
bq:function(a,b,c,d){switch($.$get$b_().ar(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
k8:function(a){if(a<0||a>1)throw H.c(P.V(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b_().fn()<a}}],["","",,Y,{"^":"",a3:{"^":"d;aw:a<,aq:b<,an:c<,ft:d<,e,cN:f@,fw:r<,fm:x<,en:y<,iK:z<,h5:Q<,cu:ch<,cx,ja:cy<,O:db<",
h:function(a,b){switch(b){case"string":return this.a
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
default:throw H.c(P.A("Invalid key "+H.a(b)+"."))}}},ap:{"^":"d;a,O:b<,c",
gdT:function(){return C.a.bP(this.a,new Y.li())},
aN:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.bd(b).dQ(b,".")||C.b.dQ(b,"!")||C.b.dQ(b,"?"))&&C.b.d9(b,P.b0("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a3(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
p:function(a,b){return this.aN(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
aO:function(a,b,c){return this.aN(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
dJ:function(a,b,c){return this.aN(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c,!1,null,!1)},
ih:function(a,b,c,d){return this.aN(a,b,null,!1,c,!1,!1,null,null,null,!1,!1,d,!1,null,!1)},
ie:function(a,b,c){return this.aN(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
P:function(a,b,c,d,e,f,g,h,i,j){return this.aN(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
ij:function(a,b,c,d,e){return this.aN(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ii:function(a,b,c,d){return this.aN(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
eY:function(a,b,c,d){return this.aN(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
ig:function(a,b,c,d){return this.aN(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
ik:function(a,b,c,d,e){return this.aN(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
bO:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bb(a,"<owner's> "+b)!==-1||C.b.bb(a,"<ownerPronoun's> "+b)!==-1||C.b.bb(a,"<object-owner's> "+b)!==-1||C.b.bb(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(!c.gcS()){z=this.c
y=z.h(0,c.gm())
if(y==null)y=-1
if(typeof y!=="number")return y.ai()
if(y<e)x=C.b.cW(a,b,"the "+b)
else{x=J.cP(c.gj(),P.b0("[aeiouy]",!1,!1))?C.b.cW(a,b,"an "+b):C.b.cW(a,b,"a "+b)
z.l(0,c.gm(),e)}}else x=null
return x==null?a:x},
dR:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaq()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaq()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gan()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gan()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaq().gm()
if(b<0||b>=z.length)return H.e(z,b)
if(J.f(y,z[b].gan().gm())){if(a>=z.length)return H.e(z,a)
y=z[a].gan().gm()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gaq().gm())}else z=!1
return z},
d2:function(a){var z=this
return new P.aE(function(){var y=a
var x=0,w=2,v,u,t
return function $async$d2(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.ao(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaq()!=null?3:4
break
case 3:x=5
return t.gaq()
case 5:case 4:x=t.gan()!=null?6:7
break
case 6:x=8
return t.gan()
case 8:case 7:x=t.gft()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aC()
case 2:return P.aD(v)}}})},
as:[function(a){var z=J.a9(a)
if(z.ai(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gan()}},"$1","gan",2,0,15],
jm:function(a,b){var z
if(!this.ao(a)||!this.ao(b))return!1
if(this.dR(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gen()}return!1},
fs:function(a){var z
for(z=!1;this.gdT();z=!0){a.$1(this.fA(!0))
this.jt()}return z},
fA:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.aQ(z,[],new Y.lj())
C.a.hY(z,new Y.lk(y),!1)
x=a&&this.gdT()?C.a.bb(z,C.a.fb(z,new Y.ll()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dR(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gcN())n=this.jm(s,p)&&this.h4(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcN()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scN(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].gh5()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].giK()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcu())if(this.cK(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcN()}else n=!1
n=n||this.jD(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcu()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcu()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.eF([" but "," but ",", but "])
u=!this.fS(s,s+1)&&!0}else{r+=S.eF([" and "," and ",", and "])
u=!0}}m=this.dc(s)
p=!v
if(p){n=s-1
if(this.cK(s,n))if(J.cP(this.dc(n),"<subject> "))if(J.cP(m,"<subject> "))m=H.bB(m,"<subject> ","",0)}l=J.hc(m,"<action>",this.dc(s))
if(this.i0(s,s-1))n=!(this.as(s).gF()===C.k&&this.a3(s).gF()===C.k)
else n=!1
if(n){n=this.as(s).gF()
l=H.p(l,"<object-owner's> <object>",n.b)
n=this.as(s).gF()
l=H.p(l,"<object-ownerPronoun's> <object>",n.b)
n=this.as(s).gF()
l=H.p(l,"<object>",n.b)
n=this.as(s).gF()
l=H.p(l,"<object's>",n.c)}if(this.cK(s,s-1)){n=this.a3(s).gF()
l=H.p(l,"<owner's> <subject>",n.a)
n=this.a3(s).gF()
l=H.p(l,"<ownerPronoun's> <subject>",n.a)
n=this.a3(s).gF()
l=H.p(l,"<subject>",n.a)
n=this.a3(s).gF()
l=H.p(l,"<subject's>",n.c)}n=s-1
if(this.as(n)!=null)if(this.a3(s)!=null)if(this.a3(n)!=null){k=this.as(n)
k=k==null?k:k.gm()
j=this.a3(s)
if(J.f(k,j==null?j:j.gm())){k=this.a3(n)
k=k==null?k:k.gF()
j=this.a3(s)
k=!J.f(k,j==null?j:j.gF())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.a3(s).gF()
l=H.p(l,"<owner's> <subject>",k.a)
k=this.a3(s).gF()
l=H.p(l,"<ownerPronoun's> <subject>",k.a)
k=this.a3(s).gF()
l=H.p(l,"<subject>",k.a)
k=this.a3(s).gF()
l=H.p(l,"<subject's>",k.c)}if(this.a3(n)!=null)if(this.as(s)!=null){k=this.a3(n)
k=k==null?k:k.gm()
j=this.as(s)
if(J.f(k,j==null?j:j.gm())){n=this.a3(n)
n=n==null?n:n.gF()
k=this.a3(s)
n=!J.f(n,k==null?k:k.gF())}else n=!1}else n=!1
else n=!1
if(n){n=this.as(s).gF()
l=H.p(l,"<object-owner's> <object>",n.a)
n=this.as(s).gF()
l=H.p(l,"<object-ownerPronoun's> <object>",n.a)
n=this.as(s).gF()
l=H.p(l,"<object>",n.b)
n=this.as(s).gF()
l=H.p(l,"<object's>",n.c)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaq()
h=n.gan()
g=n.gft()
f=n.e
e=S.cp(l)
if(C.b.M(e,"{")||C.b.M(e,"}"))$.$get$fZ().eh('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gJ()){e=H.p(e,"<subject>","you")
e=H.p(e,"<subject's>","your")}if(i.gF()===C.B||i.gF()===C.a2){e=H.p(e,"<s>","")
e=H.p(e,"<es>","")
e=H.p(e,"<ies>","y")
e=H.p(e,"<does>","do")
e=H.p(e,"<is>","are")
e=H.p(e,"<has>","have")}else{e=H.p(e,"<s>","s")
e=H.p(e,"<es>","es")
e=H.p(e,"<ies>","ies")
e=H.p(e,"<does>","does")
e=H.p(e,"<is>","is")
e=H.p(e,"<has>","has")}e=H.bB(e,"<subject>","<subjectNoun>",0)
k=i.gF()
e=H.p(e,"<subject>",k.a)
k=n.db
e=this.bO(e,"<subjectNoun>",i,g,k)
j=i.gj()
if(typeof j!=="string")H.h(H.P(j))
e=H.bB(e,"<subjectNoun>",j,0)
j=i.gF()
e=H.p(e,"<subjectPronoun>",j.a)
if(C.b.M(l,P.b0("<subject>.+<subject's>",!0,!1))){j=i.gF()
e=H.p(e,"<subject's>",j.c)}e=this.bO(e,"<subject's>",i,g,k)
k=H.a(i.gj())+"'s"
e=H.bB(e,"<subject's>",k,0)
k=i.gF()
e=H.p(e,"<subject's>",k.c)
k=i.gF()
e=H.p(e,"<subjectPronoun's>",k.c)}if(h!=null){if(h.gJ()){e=H.p(e,"<object>","you")
e=H.p(e,"<object's>","your")}else{e=this.bO(e,"<object>",h,f,n.db)
k=h.gj()
if(typeof k!=="string")H.h(H.P(k))
e=H.p(e,"<object>",k)}k=h.gF()
e=H.p(e,"<objectPronoun>",k.b)
if(C.b.M(l,P.b0("<object>.+<object's>",!0,!1))){k=h.gF()
e=H.p(e,"<object's>",k.c)}e=this.bO(e,"<object's>",h,f,n.db)
k=H.a(h.gj())+"'s"
e=H.bB(e,"<object's>",k,0)
k=h.gF()
e=H.p(e,"<object's>",k.c)
k=h.gF()
e=H.p(e,"<objectPronoun's>",k.c)}n=n.db
l=this.eQ(f,this.eQ(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.lh(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcu())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcu()?r+".":r
return H.oW(z.charCodeAt(0)==0?z:z,$.$get$eY(),new Y.lm(),null)},
cn:function(){return this.fA(!1)},
jt:function(){var z,y
if(!this.gdT()){C.a.sk(this.a,0)
return}z=this.a
y=C.a.bb(z,C.a.fb(z,new Y.ln()))+1
P.cq(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fS:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
if(this.dR(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gen()}if(!this.cK(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfw()){if(b>=z.length)return H.e(z,b)
y=z[b].gfw()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfm()){if(b>=z.length)return H.e(z,b)
z=z[b].gfm()}else z=!1
if(z)return!0
else return!1},
h4:function(a,b){var z,y,x,w,v
if(!this.ao(a)||!this.ao(b))return!1
for(z=new P.aO(this.d2(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gE()
for(y=new P.aO(this.d2(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gE()
if(J.f(x.gm(),v.gm()))return!0}}return!1},
dc:[function(a){var z=J.a9(a)
if(z.ai(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaw()}},"$1","gaw",2,0,6],
a3:[function(a){var z=J.a9(a)
if(z.ai(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaq()}},"$1","gaq",2,0,15],
jD:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gO()!=null){y=a-1
if(this.ao(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gO()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gO()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gO()
if(typeof y!=="number")return y.aJ()
if(typeof x!=="number")return H.C(x)
return y-x}},
i:function(a){return this.cn()},
ao:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eQ:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gJ())z=H.p(H.p(b,d,"you"),e,"your")
else{z=this.bO(b,d,a,null,h)
y=a.gj()
H.bc(y)
z=H.p(z,d,y)}z=H.p(z,f,a.gF().a)
z=H.p(H.p(C.b.cW(this.bO(C.b.M(c,P.b0(d+".+"+e,!0,!1))?H.p(z,e,a.gF().c):z,e,a,null,h),e,H.a(a.gj())+"'s"),e,a.gF().c),g,a.gF().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
i0:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gan()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gan()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gan().gm()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gan().gm())},
cK:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaq()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaq()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaq().gm()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaq().gm())},
q:{
lh:function(a){var z,y,x
z=!C.b.M(a,"\n\n")?C.b.jH(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bj(z,1)}}},li:{"^":"b:0;",
$1:function(a){return J.f(a.gaw(),"\n\n")}},lj:{"^":"b:22;",
$2:function(a,b){var z,y
z=J.G(a)
y=z.ga2(a)?z.gI(a):null
if(y!=null)y.gja()
z.p(a,b)
return a}},lk:{"^":"b:23;a",
$1:function(a){return J.dU(this.a,a)}},ll:{"^":"b:0;",
$1:function(a){return J.f(a.gaw(),"\n\n")}},lm:{"^":"b:24;",
$1:function(a){return H.a(a.h(0,1))+H.a(a.h(0,2))+H.a(a.h(0,3))}},ln:{"^":"b:0;",
$1:function(a){return J.f(a.gaw(),"\n\n")}},bk:{"^":"jx;cS:a<,j:b<,c,bd:d<,J:e<,F:f<",
gm:function(){return H.a0(this)},
gdW:function(){return!0},
gbm:function(){return!0},
q:{
cW:function(a,b,c,d,e){var z=H.w([],[P.o])
return new Y.bk(c,b,z,e==null?$.$get$aI():e,!1,d)}}},jx:{"^":"d+cX;"},cX:{"^":"d;",
gbc:function(){if(this.gbm()){this.gdW()
var z=!0}else z=!1
return z},
aI:function(a,b,c,d,e,f,g,h,i){a.P(0,b,c,d,e,f,g,h,H.fW(this,"$isbk"),!1)},
ae:function(a,b){return this.aI(a,b,!1,!1,!1,null,null,!1,!1)},
b0:function(a,b,c,d){return this.aI(a,b,!1,!1,!1,c,null,d,!1)},
aS:function(a,b,c){return this.aI(a,b,!1,!1,!1,c,null,!1,!1)},
co:function(a,b,c){return this.aI(a,b,!1,!1,!1,null,null,c,!1)},
cX:function(a,b,c,d){return this.aI(a,b,c,!1,!1,d,null,!1,!1)},
e5:function(a,b,c,d){return this.aI(a,b,!1,c,d,null,null,!1,!1)},
by:function(a,b,c){return this.aI(a,b,!1,!1,c,null,null,!1,!1)},
e5:function(a,b,c,d){return this.aI(a,b,!1,c,d,null,null,!1,!1)},
fB:function(a,b,c,d){return this.aI(a,b,!1,!1,c,d,null,!1,!1)},
jy:function(a,b,c,d){return this.aI(a,b,c,!1,!1,null,null,d,!1)},
jx:function(a,b,c){return this.aI(a,b,c,!1,!1,null,null,!1,!1)},
fC:function(a,b,c,d){return this.aI(a,b,!1,!1,!1,c,d,!1,!1)}},bJ:{"^":"d;a,b,c,d",
i:function(a){return this.a}}}],["","",,L,{"^":"",o3:{"^":"b:0;",
$1:function(a){a.gcb().b=2
return 2}},o2:{"^":"b:0;",
$1:function(a){a.gcb().b=0
return 0}},o9:{"^":"b:0;",
$1:function(a){a.gcb().b=1
return 1}},f3:{"^":"d;"},mn:{"^":"f3;m:a<",
ad:function(a){var z=new L.f4(null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.f3))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gC:function(a){return Y.ad(Y.k(0,J.l(this.a)))},
i:function(a){return"Team {id="+J.i(this.a)+",\n}"},
q:{
dt:function(a){var z=new L.f4(null,null)
a.$1(z)
return z.D()}}},f4:{"^":"d;a,b",
gm:function(){return this.gcb().b},
gcb:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y
z=this.a
if(z==null){y=this.gcb().b
z=new L.mn(y)
if(y==null)H.h(P.r("id"))}this.v(z)
return z}}}],["","",,X,{"^":"",
fI:function(a,b){return new P.aE(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$fI(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bC(u,u.length,0,null,[H.j(u,0)])
u=y.a
s=new J.bC(u,u.length,0,null,[H.j(u,0)])
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
break}case 4:return P.aC()
case 1:return P.aD(v)}}})}}],["","",,A,{"^":"",b5:{"^":"d;a,b,c,d,e,O:f<",
giy:function(){var z=this.e
return z.length!==0?C.a.gI(z):null},
gC:function(a){var z,y,x,w
z=X.be(this.a)
y=X.be(this.c)
x=X.be(this.e)
w=this.f
return X.dD(X.b8(X.b8(X.b8(X.b8(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
B:function(a,b){var z
if(b==null)return!1
z=J.m(b)
return!!z.$isb5&&this.gC(this)===z.gC(b)},
f7:function(a){var z,y,x
z=this.dq(a)
if(z==null)throw H.c(new P.R("Tried to elapseSituationTime of situation id="+H.a(a)+" that doesn't exist in situations ("+H.a(this.e)+")."))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].b9()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
b9:function(){++this.f},
fQ:function(a,b,c,d,e){var z=this.c
if(a!=null)z=z.ep(0,new A.m4(a))
if(b!=null)z=z.bB(0,new A.m5(b))
if(c!=null)z=z.bB(0,new A.m6(c))
if(e!=null)z=z.bB(0,new A.m7(e))
return d!=null?z.bB(0,new A.m8(d)):z},
ea:function(a,b,c,d,e){var z,y,x,w
z=this.fQ(a,b,c,d,e)
y=z.gN(z)
if(y.u()){x=y.gE()
y=this.f
w=x.gO()
if(typeof w!=="number")return H.C(w)
return y-w}return},
jC:function(a,b,c){return this.ea(null,a,b,c,null)},
bX:function(a,b,c){return this.ea(a,null,b,null,c)},
jB:function(a,b,c){return this.ea(a,b,null,null,c)},
a9:function(a){return this.a.bH(0,new A.m9(a))},
ef:function(a){return this.d.bH(0,new A.ma(a))},
fR:function(a){var z,y
z=this.dq(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
cv:function(a){var z,y
for(z=this.e,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gj(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.A("No situation with name="+a+" found."))},
fg:function(a){var z=this.a.ba(0,new A.mb(a),new A.mc())
if(z==null)return!1
return z.gbm()},
cm:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(C.a.gI(z).gj(),a)))break
C.a.bW(z)}if(z.length===0)throw H.c(P.A("Tried to pop situations until "+a+" but none was found in stack."))},
i:function(a){var z,y
z=this.a
y=z.dz()
y.al(0,z)
return"World<"+P.aU(y,"{","}")+">"},
af:function(a,b){var z,y,x
z=this.a9(a)
y=z.ad(b)
x=this.a
x.aH(0,z)
x.p(0,y)},
dq:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gm(),a)){z=x
break}++x}return z},
hi:function(a){this.a.al(0,a.a)
this.c.al(0,a.c)
this.b.al(0,a.b)
this.d.al(0,a.d)
C.a.al(this.e,a.e)
this.f=a.f},
q:{
ds:function(a){var z,y
z=P.I(null,null,null,R.X)
y=P.aM(null,O.c4)
y=new A.b5(z,P.I(null,null,null,U.d0),y,P.I(null,null,null,null),[],null)
y.hi(a)
return y}}},m4:{"^":"b:0;a",
$1:function(a){return J.dU(a.geX(),this.a)}},m5:{"^":"b:0;a",
$1:function(a){return J.f(a.ge4(),this.a.gm())}},m6:{"^":"b:0;a",
$1:function(a){return a.geo().M(0,this.a.x)}},m7:{"^":"b:0;a",
$1:function(a){return a.gfM()===this.a}},m8:{"^":"b:0;a",
$1:function(a){return a.gfL()===this.a}},m9:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},ma:{"^":"b:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},mb:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},mc:{"^":"b:1;",
$0:function(){return}}}],["","",,N,{"^":"",hZ:{"^":"K;a1:c<,a0:d<,X:e<,W:f<,b,a",
ga6:function(){return"confuse <object>"},
ga7:function(){return"will <subject> confuse <object>?"},
Y:[function(a,b,c){var z
a.ae(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.P(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.P(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.a(a.gj())+" fails to confuse "+H.a(z.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z
a.ae(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.P(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.by(c,"<subject's> eyes go wide with terror",!0)
return H.a(a.gj())+" confuses "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return 0.6},
R:function(a,b){return a.gJ()&&a.ga5()&&!this.b.dY(b)},
q:{
p3:[function(a){return new N.hZ(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","og",2,0,4]}}}],["","",,F,{"^":"",jO:{"^":"ae;a0:b<,a1:c<,X:d<,W:e<,a",
gj:function(){return"Stand off."},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){if(a.gJ())a.ae(c,"<subject> stand<s> off")
return H.a(a.gj())+" passes the opportunity"},"$3","gT",6,0,2],
bn:function(a,b){return"WARNING this shouldn't be user-visible"},
S:function(a,b){return 1},
R:function(a,b){return!0}}}],["","",,Y,{"^":"",k1:{"^":"K;X:c<,W:d<,a1:e<,a0:f<,b,a",
ga6:function(){return"pound <object>"},
ga7:function(){return"will <subject> force <object> off balance?"},
Y:[function(a,b,c){var z=this.b
a.fC(c,"<subject> {fiercely|violently} {pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} on <object-owner's> {<object>|weapon}",z.gZ(),z)
z.co(c,"<subject> {stand<s> ground|deflect<s> each blow}",!0)
return H.a(a.gj())+" kicks "+H.a(z.cy)+" off balance"},"$3","gU",6,0,2],
V:[function(a,b,c){var z=this.b
a.fC(c,"<subject> {fiercely|violently} {pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} on <object-owner's> {<object>|weapon}",z.gZ(),z)
if(z.ga5()){z.fB(c,"<subject> lose<s> <object>",!0,$.$get$dI())
b.af(z.x,new Y.k2())
C.a.p(b.e,U.jy(z,a))
return H.a(a.gj())+" pounds "+H.a(z.cy)+" off balance"}else if(z.gaR()){z.ae(c,"<subject> <is> already off balance")
c.eY(0,"<subject> make<s> <object> fall to the "+H.a(b.cv("FightSituation").gbD()),z,$.$get$h0())
b.af(z.x,new Y.k3())
return H.a(a.gj())+" pounds "+H.a(z.cy)+" to the ground"}throw H.c(new P.R("enemy pose must be either standing or off-balance"))},"$3","gT",6,0,2],
S:function(a,b){var z=a.ga5()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
R:function(a,b){var z
if(!a.gaa()){z=a.e
z=z!=null&&z.a===C.c&&!this.b.gaa()}else z=!1
return z},
q:{
pi:[function(a){return new Y.k1(!0,C.e,!0,"Pounding on someone means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose ground or balance.",a,null)},"$1","oF",2,0,4]}},k2:{"^":"b:0;",
$1:function(a){a.sat(C.l)
return a}},k3:{"^":"b:0;",
$1:function(a){a.sat(C.o)
return a}}}],["","",,B,{"^":"",kf:{"^":"ae;a0:b<,a1:c<,X:d<,W:e<,a",
gj:function(){return"Regain balance."},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){if(a.gJ())a.b0(c,"<subject> regain<s> <object>",$.$get$dI(),!0)
b.af(a.gm(),new B.kg())
return H.a(a.gj())+" regains balance"},"$3","gT",6,0,2],
bn:function(a,b){return"Will "+a.gF().a+" regain balance?"},
S:function(a,b){return 1},
R:function(a,b){return a.gaR()}},kg:{"^":"b:0;",
$1:function(a){a.sat(C.j)
return C.j}}}],["","",,O,{"^":"",ky:{"^":"ae;a0:b<,a1:c<,X:d<,W:e<,a",
gj:function(){return"Scramble."},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.a(a.gj())+" scrambles on ground"},"$3","gT",6,0,2],
bn:function(a,b){return"Will "+a.gF().a+" crawl out of harm's way?"},
S:function(a,b){return 1},
R:function(a,b){var z,y
if(!a.gaa())return!1
z=b.bX("SweepOffFeet",a,!0)
if(z!=null&&z<=3)return!0
y=b.bX("Pound",a,!0)
if(y!=null&&y<=3)return!0
return!1}}}],["","",,Q,{"^":"",l5:{"^":"ae;a0:b<,a1:c<,X:d<,W:e<,a",
gj:function(){return"Stand up."},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){a.ae(c,"<subject> stand<s> up")
b.af(a.gm(),new Q.l6())
return H.a(a.gj())+" stands up"},"$3","gT",6,0,2],
bn:function(a,b){return"Will "+a.gF().a+" stand up?"},
S:function(a,b){return 1},
R:function(a,b){var z,y
if(!a.gaa())return!1
z=b.bX("SweepOffFeet",a,!0)
if(z!=null&&z<=3)return!1
y=b.bX("Pound",a,!0)
if(y!=null&&y<=3)return!1
return!0}},l6:{"^":"b:0;",
$1:function(a){a.sat(C.j)
return C.j}}}],["","",,G,{"^":"",eV:{"^":"K;a0:c<,a1:d<,W:e<,b,a",
ga6:function(){return"swing at <object>"},
gX:function(){return!1},
ga7:function(){return},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> swing<s> {<subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.r))
return H.a(a.cy)+" starts a slash at "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return 1},
R:function(a,b){return!a.gJ()&&a.ga5()&&!this.b.gaa()&&a.au(C.c)},
q:{
po:[function(a){return new G.eV("The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","oP",2,0,4]}}}],["","",,R,{"^":"",eW:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"swing at <object> (while out of balance)"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
Y:[function(a,b,c){var z=this.b
a.fB(c,"<subject> completely miss<es> <object> with <subject's> "+a.gZ().f,!0,z)
return H.a(a.cy)+" fails to start an out-of-balance slash at "+H.a(z.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> swing<s> {<subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.r))
return H.a(a.cy)+" starts an out-of-balance slash at "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return 0.7},
R:function(a,b){return!a.gJ()&&a.gaR()&&!this.b.gaa()&&a.au(C.c)},
q:{
pm:[function(a){return new R.eW("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","oQ",2,0,4]}}}],["","",,T,{"^":"",l7:{"^":"eW;c,d,e,f,b,a",
V:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> swing<s> {<subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.n))
return H.a(a.cy)+" starts an out-of-balance slash at "+H.a(z.gj())},"$3","gT",6,0,2],
R:function(a,b){return a.gJ()&&a.gaR()&&!this.b.gaa()&&a.au(C.c)},
q:{
pl:[function(a){return new T.l7("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","oR",2,0,4]}}}],["","",,A,{"^":"",l8:{"^":"eV;X:f<,c,d,e,b,a",
ga7:function(){return"will <subject> hit <objectPronoun>?"},
Y:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> swing<s> {<subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.t))
return H.a(a.cy)+" starts a failed slash at "+H.a(z.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> swing<s> {<subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.n))
return H.a(a.cy)+" starts a successful slash at "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return 0.7},
R:function(a,b){return a.gJ()&&a.ga5()&&!this.b.gaa()&&a.au(C.c)},
q:{
pn:[function(a){return new A.l8(!0,"The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","oS",2,0,4]}}}],["","",,D,{"^":"",eX:{"^":"K;a0:c<,a1:d<,b,a",
gX:function(){return!1},
gW:function(){return},
ga6:function(){return"strike down at <object>"},
ga7:function(){return},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> strike<s> down {with <subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,D.dq(a,z))
C.a.p(y,V.dc(a,z,C.r))
return H.a(a.cy)+" strikes down at "+H.a(z.gj())+" on the ground"},"$3","gT",6,0,2],
S:function(a,b){return 1},
R:function(a,b){return!a.gJ()&&this.b.gaa()&&!a.gaa()&&a.au(C.c)},
q:{
pq:[function(a){return new D.eX("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","oT",2,0,4]}}}],["","",,Q,{"^":"",l9:{"^":"eX;c,d,b,a",
ga6:function(){return"strike down at <object>"},
gX:function(){return!0},
gW:function(){return C.e},
ga7:function(){return"will <subject> hit?"},
Y:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> strike<s> down {with <subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,D.dq(a,z))
C.a.p(y,V.dc(a,z,C.t))
return H.a(a.cy)+" makes an unsuccessful strike at "+H.a(z.gj())+" on the ground"},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.aS(c,"<subject> strike<s> down {with <subject's> "+a.gZ().f+" |}at <object>",z)
y=b.e
C.a.p(y,D.dq(a,z))
C.a.p(y,V.dc(a,z,C.n))
return H.a(a.cy)+" makes a successful strike at "+H.a(z.gj())+" on the ground"},"$3","gT",6,0,2],
S:function(a,b){return 0.7},
R:function(a,b){return a.gJ()&&this.b.gaa()&&!a.gaa()&&a.au(C.c)},
q:{
pp:[function(a){return new Q.l9("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","oU",2,0,4]}}}],["","",,B,{"^":"",lK:{"^":"K;X:c<,W:d<,a1:e<,a0:f<,b,a",
ga6:function(){return"sweep <object> off <objectPronoun's> feet"},
ga7:function(){return"will <subject> knock <object> down?"},
Y:[function(a,b,c){S.bq(new B.lL(this,a,c),new B.lM(this,a,c),null,null)
return H.a(a.gj())+" fails to sweep "+H.a(this.b.gj())+" off feet"},"$3","gU",6,0,2],
V:[function(a,b,c){var z
S.bq(new B.lN(this,a,c),new B.lO(this,a,c,b.cv("FightSituation").gbD()),null,null)
z=this.b
b.af(z.gm(),new B.lP())
return H.a(a.gj())+" sweeps "+H.a(z.gj())+" off feet"},"$3","gT",6,0,2],
S:function(a,b){var z=a.ga5()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
R:function(a,b){return(a.ga5()||a.dx===C.l)&&!this.b.gaa()},
q:{
ps:[function(a){return new B.lK(!0,C.e,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","oY",2,0,4]}},lL:{"^":"b:1;a,b,c",
$0:function(){var z=this.c
this.b.aS(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.ig(0,"they don't connect",!0,!0)}},lM:{"^":"b:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aS(z,"<subject> kick<s> <object's> shin",y)
y.jx(z,"<subject> <does>n't budge",!0)}},lN:{"^":"b:1;a,b,c",
$0:function(){this.b.b0(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},lO:{"^":"b:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b0(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.ae(z,"<subject> {grunt|shriek}<s>")
y.by(z,"<subject> fall<s> to the "+H.a(this.d),!0)}},lP:{"^":"b:0;",
$1:function(a){a.sat(C.o)
return a}}}],["","",,M,{"^":"",m2:{"^":"ae;a0:b<,X:c<,W:d<,a1:e<,a",
gj:function(){return"Regain clarity."},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){a.ae(c,"<subject> shake<s> <subject's> head violently")
if(a.gJ())c.p(0,"the {horrible|terrible} spell seems to recede")
c.P(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.a(a.gj())+" regains clarity"},"$3","gT",6,0,2],
bn:function(a,b){return"WARNING this shouldn't be user-visible"},
S:function(a,b){return 1},
R:function(a,b){var z
if(a.dY(b)){z=b.bX("Confuse",a,!0)
if(typeof z!=="number")return z.bo()
z=z>4}else z=!1
return z}}}],["","",,G,{"^":"",ea:{"^":"K;a0:c<,a1:d<,b,a",
gX:function(){return!1},
gW:function(){return},
ga6:function(){return"swing back at <object>"},
ga7:function(){return"will <subject> keep <subject's> balance?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to swing back")
a.toString
c.P(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.ga5()){b.af(a.x,new G.i8())
c.P(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.l){b.af(a.x,new G.i9())
c.P(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.P(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.a(a.cy)+" fails to swing back at "+H.a(this.b.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.b0(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.r))
return H.a(a.gj())+" swings back at "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return this.b.ga5()?0.7:0.9},
R:function(a,b){return!a.gJ()&&a.au(C.c)&&!a.gaa()},
q:{
p5:[function(a){return new G.ea("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","oj",2,0,4]}},i8:{"^":"b:0;",
$1:function(a){a.sat(C.l)
return a}},i9:{"^":"b:0;",
$1:function(a){a.sat(C.o)
return a}}}],["","",,D,{"^":"",i5:{"^":"ea;c,d,b,a",
gX:function(){return!0},
gW:function(){return C.e},
ga6:function(){return"swing back at <object>"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to swing back")
a.toString
c.P(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.ga5()){b.af(a.x,new D.i6())
c.P(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.l){b.af(a.x,new D.i7())
c.P(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.P(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.a(a.cy)+" fails to swing back at "+H.a(this.b.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y
z=this.b
a.b0(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.p(y,M.b3(a,z))
C.a.p(y,L.b2(a,z,C.n))
return H.a(a.gj())+" swings successfully back at "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return this.b.ga5()?0.7:0.9},
R:function(a,b){return a.gJ()&&a.au(C.c)&&!a.gaa()},
q:{
p4:[function(a){return new D.i5("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","ok",2,0,4]}},i6:{"^":"b:0;",
$1:function(a){a.sat(C.l)
return a}},i7:{"^":"b:0;",
$1:function(a){a.sat(C.o)
return a}}}],["","",,S,{"^":"",
e9:function(a,b){var z=new S.cV(null,null,null,null,null)
new S.of(a,b).$1(z)
return z.D()},
e8:{"^":"aA;",
gb7:function(){return[G.oj(),D.ok()]},
gbL:function(){return[$.$get$dd()]},
gj:function(){return"CounterAttackSituation"},
b9:function(){var z=new S.cV(null,null,null,null,null)
z.v(this)
new S.i3().$1(z)
return z.D()},
b5:function(a,b){if(a===0)return b.a9(this.a)
return},
bh:function(a,b){return new H.O(a,new S.i4(this),[H.j(a,0)])}},
of:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gaz().c=z
a.gaz().e=0
z=this.a.gm()
a.gaz().b=z
z=this.b.gm()
a.gaz().d=z
return a}},
i3:{"^":"b:0;",
$1:function(a){var z=a.gaz().e
if(typeof z!=="number")return z.a8()
a.gaz().e=z+1
return a}},
i4:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
mf:{"^":"e8;a,m:b<,c,O:d<",
ad:function(a){var z=new S.cV(null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.e8))return!1
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
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
i:function(a){return"CounterAttackSituation {counterAttacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.a(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
cV:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaz().c},
gO:function(){return this.gaz().e},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
z=new S.mf(y,x,w,v)
if(y==null)H.h(P.r("counterAttacker"))
if(x==null)H.h(P.r("id"))
if(w==null)H.h(P.r("target"))
if(v==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,X,{"^":"",
h1:function(a,b,c){switch($.$get$fB().ar(3)){case 0:b.e5(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.by(a,"<subject> fall<s> backward",!0)
b.toString
a.P(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b,!1)
a.P(0,"<subject> hit<s> the "+H.a(c)+" face down",!1,!0,!0,null,null,!1,b,!1)
break
case 2:b.by(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
a.P(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b,!1)
break}a.aO(0,"\n\n",!0)}}],["","",,U,{"^":"",
iF:function(a,b,c){var z=new U.cZ(null,null,null,null,null,null,null)
new U.od(a,b,c).$1(z)
return z.D()},
ef:{"^":"aA;",
gb7:function(){return[N.og(),Y.oF(),B.oY(),G.oP(),A.oS(),D.oT(),Q.oU(),R.oQ(),T.oR()]},
gbL:function(){return H.w([$.$get$eH(),$.$get$eU(),$.$get$eM(),$.$get$fj()],[Q.ae])},
gj:function(){return"FightSituation"},
b9:function(){var z=new U.cZ(null,null,null,null,null,null,null)
z.v(this)
new U.iG().$1(z)
return z.D()},
b5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.fI(this.e,this.a)
y=H.bn(z,new U.iH(b),H.v(z,"x",0),null)
x=H.v(y,"x",0)
w=P.W(new H.O(y,new U.iI(),[x]),!1,x)
x=H.j(w,0)
v=P.W(new H.O(w,new U.iJ(),[x]),!1,x)
u=v.length===1?C.a.gbp(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ac)(w),++r){q=w[r]
p=b.c.ba(0,new U.iK(q),new U.iL())
o=p==null?p:p.gO()
if(o==null)o=-1
x=b.f
if(typeof o!=="number")return H.C(o)
n=x-o
if(q.gJ())n=C.h.e7(n*1.5)
if(n>t){s=q
t=n}}return s},
bh:function(a,b){return new H.O(a,new U.iM(this),[H.j(a,0)])},
fq:function(a,b){var z,y
if(S.k8(0.25))b.aO(0,"\n\n",!0)
z=this.f
y=this.b.a
if(y.K(z))y.h(0,z).$2(a,b)},
d6:function(a){var z,y
z=new U.iN(a)
y=this.e
if(z.$1(y)===!0)if(z.$1(this.a)===!0){z=y.a
z=(z&&C.a).bP(z,new U.iP(a))}else z=!1
else z=!1
return z}},
od:{"^":"b:0;a,b,c",
$1:function(a){var z,y
z=$.$get$aF().ar(1073741823)
a.gab().e=z
a.gab().r=0
z=a.gab()
y=z.f
if(y==null){y=new S.am(null,null,[P.t])
y.ay()
y.v(C.i)
z.f=y
z=y}else z=y
y=this.a
z.v(new H.cl(y,new U.nH(),[H.j(y,0),null]))
y=a.gab()
z=y.b
if(z==null){z=new S.am(null,null,[P.t])
z.ay()
z.v(C.i)
y.b=z}z.v(J.dX(this.b,new U.nI()))
a.gab().d=this.c
return a}},
nH:{"^":"b:0;",
$1:function(a){return a.gm()}},
nI:{"^":"b:0;",
$1:function(a){return a.gm()}},
iG:{"^":"b:0;",
$1:function(a){var z=a.gab().r
if(typeof z!=="number")return z.a8()
a.gab().r=z+1
return a}},
iH:{"^":"b:0;a",
$1:function(a){return this.a.a9(a)}},
iI:{"^":"b:0;",
$1:function(a){return a.gbc()}},
iJ:{"^":"b:0;",
$1:function(a){return a.gJ()}},
iK:{"^":"b:0;a",
$1:function(a){return J.f(a.ge4(),this.a.gm())}},
iL:{"^":"b:1;",
$0:function(){return}},
iM:{"^":"b:16;a",
$1:function(a){var z,y,x
if(a.gbc()){z=this.a
y=a.gm()
x=z.e.a
if(!(x&&C.a).M(x,y)){y=a.gm()
z=z.a.a
y=(z&&C.a).M(z,y)
z=y}else z=!0}else z=!1
return z}},
iN:{"^":"b:27;a",
$1:function(a){var z=a.a
return(z&&C.a).bP(z,new U.iO(this.a))}},
iO:{"^":"b:0;a",
$1:function(a){return this.a.a9(a).gbc()}},
iP:{"^":"b:28;a",
$1:function(a){var z=this.a.a9(a)
return z.gJ()&&z.gbc()}},
mg:{"^":"ef;a,b,bD:c<,m:d<,e,O:f<",
ad:function(a){var z=new U.cZ(null,null,null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.ef))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.f(this.e,b.e)){z=this.f
y=b.f
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)),J.l(this.f)))},
i:function(a){return"FightSituation {enemyTeamIds="+J.i(this.a)+",\nevents="+J.i(this.b)+",\ngroundMaterial="+J.i(this.c)+",\nid="+J.i(this.d)+",\nplayerTeamIds="+J.i(this.e)+",\ntime="+J.i(this.f)+",\n}"}},
cZ:{"^":"d;a,b,c,d,e,f,r",
gbD:function(){return this.gab().d},
gm:function(){return this.gab().e},
gO:function(){return this.gab().r},
gab:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.am(null,null,[H.j(z,0)])
y.ay()
y.v(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.d8(null,null,[H.j(z,0),H.j(z,1)])
y.c5()
y.v(z)
z=y}this.c=z
z=this.a
this.d=z.c
this.e=z.d
z=z.e
if(!(z==null)){y=new S.am(null,null,[H.j(z,0)])
y.ay()
y.v(z)
z=y}this.f=z
this.r=this.a.f
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v,u,t
z=this.a
if(z==null){y=this.gab()
x=y.b
if(x==null){x=new S.am(null,null,[P.t])
x.ay()
x.v(C.i)
y.b=x
y=x}else y=x
y=y==null?y:y.D()
x=this.gab()
w=x.c
if(w==null){w=new A.d8(null,null,[P.t,{func:1,v:true,args:[A.b5,Y.ap]}])
w.c5()
w.v(C.X)
x.c=w
x=w}else x=w
x=x==null?x:x.D()
w=this.gab().d
v=this.gab().e
u=this.gab()
t=u.f
if(t==null){t=new S.am(null,null,[P.t])
t.ay()
t.v(C.i)
u.f=t
u=t}else u=t
u=u==null?u:u.D()
t=this.gab().r
z=new U.mg(y,x,w,v,u,t)
if(y==null)H.h(P.r("enemyTeamIds"))
if(x==null)H.h(P.r("events"))
if(w==null)H.h(P.r("groundMaterial"))
if(v==null)H.h(P.r("id"))
if(u==null)H.h(P.r("playerTeamIds"))
if(t==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,A,{"^":"",jC:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"stab <object>"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
Y:[function(a,b,c){var z=this.b
a.aS(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.P(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.a(a.gj())+" fails to stab "+H.a(z.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z=this.b
b.af(z.gm(),new A.jD())
if(b.a9(z.gm()).gbm()){a.b0(c,"<subject> thrust<s> {|<subject's> "+a.gZ().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.by(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b0(c,"<subject> {stab<s>|run<s> <subject's> "+a.gZ().f+" through} <object>",z,!0)
X.h1(c,z,b.cv("FightSituation").gbD())}return H.a(a.gj())+" stabs "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){if(a.gJ())return 0.6
return 0.5},
R:function(a,b){var z
if(a.ga5())if(this.b.gaR()){z=a.e
z=z!=null&&z.a===C.c}else z=!1
else z=!1
return z},
q:{
pd:[function(a){return new A.jC("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.e,a,null)},"$1","oC",2,0,4]}},jD:{"^":"b:0;",
$1:function(a){var z=a.gam()
if(typeof z!=="number")return z.aJ()
a.sam(z-1)
return a}}}],["","",,U,{"^":"",
jy:function(a,b){var z=new U.da(null,null,null,null,null)
new U.o7(a,b).$1(z)
return z.D()},
ez:{"^":"aA;",
gb7:function(){return H.w([A.oC()],[{func:1,ret:Q.K,args:[R.X]}])},
gbL:function(){return[$.$get$dd()]},
gj:function(){return"OffBalanceOpportunitySituation"},
b9:function(){var z=new U.da(null,null,null,null,null)
z.v(this)
new U.jz().$1(z)
return z.D()},
b5:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bo()
if(a>0)return
z=b.a9(this.a)
y=b.a
x=H.j(y,0)
w=P.W(new H.O(y,new U.jA(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gfa(w)
if(v.ga5())if(z.gaR()){y=v.e
y=y!=null&&y.a===C.c}else y=!1
else y=!1
if(y)return v
return},
bh:function(a,b){return new H.O(a,new U.jB(b,b.a9(this.a)),[H.j(a,0)])}},
o7:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gaA().d=z
a.gaA().e=0
z=this.a.gm()
a.gaA().b=z
z=this.b
z=z==null?z:z.gm()
a.gaA().c=z
return a}},
jz:{"^":"b:0;",
$1:function(a){var z=a.gaA().e
if(typeof z!=="number")return z.a8()
a.gaA().e=z+1
return a}},
jA:{"^":"b:16;a,b,c",
$1:function(a){var z,y
if(a.gbc())if(a.dU(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
jB:{"^":"b:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.dU(z,this.a)}},
mh:{"^":"ez;a,b,m:c<,O:d<",
ad:function(a){var z=new U.da(null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.ez))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
i:function(a){return"OffBalanceOpportunitySituation {actorId="+H.a(J.i(this.a))+",\nculpritId="+J.i(this.b)+",\nid="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
da:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaA().d},
gO:function(){return this.gaA().e},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
z=new U.mh(y,x,w,v)
if(y==null)H.h(P.r("actorId"))
if(w==null)H.h(P.r("id"))
if(v==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,O,{"^":"",iQ:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"kill <object> (WARNING should not be user-visible)"},
ga7:function(){return"(WARNING should not be user-visible)"},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y,x
z=this.b
b.af(z.gm(),new O.iT())
y=b.a9(z.gm()).gbm()
if(y){a.b0(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.by(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b0(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.h1(c,z,b.cv("FightSituation").gbD())}x=H.a(a.gj())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.a(z.gj())},"$3","gT",6,0,2],
S:function(a,b){return 1},
R:function(a,b){return a.au(C.c)},
q:{
pa:[function(a){return new O.iQ(null,!0,!0,C.e,a,null)},"$1","on",2,0,4]}},iT:{"^":"b:0;",
$1:function(a){var z=a.gam()
if(typeof z!=="number")return z.aJ()
a.sam(z-1)
return a}}}],["","",,X,{"^":"",ie:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"step back and parry"},
ga7:function(){return"will <subject> parry it?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gZ().f+"|fend it off}")
if(a.gaR())c.P(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bq(new X.ig(a,c),new X.ih(this,a,c),null,null)
C.a.bW(b.e)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){if(a.gJ())a.ae(c,"<subject> {step<s>|take<s> a step} back")
a.co(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.gZ().f+"|fend<s> it off}",!0)
if(!a.ga5()){b.af(a.x,new X.ii())
if(a.Q)c.P(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.cm("FightSituation")
return H.a(a.cy)+" steps back and parries "+H.a(this.b.gj())},"$3","gT",6,0,2],
S:function(a,b){var z,y
if(a.gJ())return 1
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbM())return 0
if(y.gbN())return 1
return 0.5-(a.ga5()?0:0.2)},
R:function(a,b){return a.au(C.c)},
q:{
p6:[function(a){return new X.ie("Stepping back is the safest way to get out of harm's way.",!1,!0,C.e,a,null)},"$1","ol",2,0,4]}},ig:{"^":"b:1;a,b",
$0:function(){this.b.P(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},ih:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cX(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ii:{"^":"b:0;",
$1:function(a){a.sat(C.j)
return a}}}],["","",,F,{"^":"",ij:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"dodge and counter"},
ga7:function(){return"will <subject> dodge?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaR())c.P(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bq(new F.ik(a,c),new F.il(this,a,c),null,null)
C.a.bW(b.e)
return H.a(a.cy)+" fails to dodge "+H.a(this.b.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z=this.b
a.b0(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga5()){z.e5(c,"<subject> lose<s> balance because of that",!0,!0)
b.af(z.x,new F.im())}b.cm("FightSituation")
if(a.gJ())c.p(0,"this opens an opportunity for a counter attack")
C.a.p(b.e,S.e9(a,z))
return H.a(a.gj())+" dodges "+H.a(z.cy)},"$3","gT",6,0,2],
S:function(a,b){var z,y,x
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbM())return 0
if(y.gbN())return 1
x=a.ga5()?0:0.2
if(a.Q)return 0.7-x
return 0.4-x},
R:function(a,b){return!a.gaa()},
q:{
p7:[function(a){return new F.ij("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.e,a,null)},"$1","om",2,0,4]}},ik:{"^":"b:1;a,b",
$0:function(){this.b.P(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},il:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cX(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},im:{"^":"b:0;",
$1:function(a){a.sat(C.l)
return C.l}}}],["","",,G,{"^":"",jL:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"parry and counter"},
ga7:function(){return"will <subject> parry?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gZ().f+"|fend it off}")
if(a.gaR())c.P(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bq(new G.jM(a,c),new G.jN(this,a,c),null,null)
C.a.bW(b.e)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){var z=this.b
if(z.gaR()){c.ij(0,"<subject> <is> out of balance",!0,!0,z)
c.ii(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$h4())
a.co(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+a.gZ().f+"|fend<s> it off easily}",!0)}else a.co(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.gZ().f+"|fend<s> it off}",!0)
b.cm("FightSituation")
if(a.gJ())c.p(0,"this opens an opportunity for a counter attack")
C.a.p(b.e,S.e9(a,z))
return H.a(a.gj())+" parries "+H.a(z.cy)},"$3","gT",6,0,2],
S:function(a,b){var z,y,x,w
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbM())return 0
if(y.gbN())return 1
x=a.ga5()?0:0.2
w=this.b.gaR()?0.3:0
if(a.Q)return 0.6-x+w
return 0.3-x+w},
R:function(a,b){return a.au(C.c)},
q:{
pf:[function(a){return new G.jL("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.e,a,null)},"$1","oE",2,0,4]}},jM:{"^":"b:1;a,b",
$0:function(){this.b.P(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},jN:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cX(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
b2:function(a,b,c){var z=new L.dm(null,null,null,null,null,null)
new L.oe(a,b,c).$1(z)
return z.D()},
eP:{"^":"aA;",
gb7:function(){return[F.om(),G.oE(),X.ol()]},
gbM:function(){return this.c===C.n},
gbN:function(){return this.c===C.t},
gj:function(){return"SlashDefenseSituation"},
b9:function(){var z=new L.dm(null,null,null,null,null,null)
z.v(this)
new L.l1().$1(z)
return z.D()},
b5:function(a,b){if(a===0)return b.a9(this.d)
return},
bh:function(a,b){return new H.O(a,new L.l2(this),[H.j(a,0)])}},
oe:{"^":"b:0;a,b,c",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gak().c=z
a.gak().f=0
z=this.a.gm()
a.gak().b=z
z=this.b.gm()
a.gak().e=z
a.gak().d=this.c
return a}},
l1:{"^":"b:0;",
$1:function(a){var z=a.gak().f
if(typeof z!=="number")return z.a8()
a.gak().f=z+1
return a}},
l2:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
mk:{"^":"eP;a,m:b<,c,d,O:e<",
ad:function(a){var z=new L.dm(null,null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.eP))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)))},
i:function(a){return"SlashDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+H.a(J.i(this.c))+",\ntarget="+H.a(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dm:{"^":"d;a,b,c,d,e,f",
gm:function(){return this.gak().c},
gO:function(){return this.gak().f},
gak:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gak().b
x=this.gak().c
w=this.gak().d
v=this.gak().e
u=this.gak().f
z=new L.mk(y,x,w,v,u)
if(y==null)H.h(P.r("attacker"))
if(x==null)H.h(P.r("id"))
if(w==null)H.h(P.r("predeterminedResult"))
if(v==null)H.h(P.r("target"))
if(u==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,M,{"^":"",
b3:function(a,b){var z=new M.dn(null,null,null,null,null)
new M.o4(a,b).$1(z)
return z.D()},
eQ:{"^":"aA;",
gb7:function(){return[O.on()]},
gj:function(){return"SlashSituation"},
b9:function(){var z=new M.dn(null,null,null,null,null)
z.v(this)
new M.l3().$1(z)
return z.D()},
b5:function(a,b){if(a===0)return b.a9(this.a)
return},
bh:function(a,b){return new H.O(a,new M.l4(this),[H.j(a,0)])}},
o4:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gaC().c=z
a.gaC().e=0
z=this.a.gm()
a.gaC().b=z
z=this.b.gm()
a.gaC().d=z
return a}},
l3:{"^":"b:0;",
$1:function(a){var z=a.gaC().e
if(typeof z!=="number")return z.a8()
a.gaC().e=z+1
return a}},
l4:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
ml:{"^":"eQ;a,m:b<,c,O:d<",
ad:function(a){var z=new M.dn(null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.eQ))return!1
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
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
i:function(a){return"SlashSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.a(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dn:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaC().c},
gO:function(){return this.gaC().e},
gaC:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaC().b
x=this.gaC().c
w=this.gaC().d
v=this.gaC().e
z=new M.ml(y,x,w,v)
if(y==null)H.h(P.r("attacker"))
if(x==null)H.h(P.r("id"))
if(w==null)H.h(P.r("target"))
if(v==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,Q,{"^":"",iR:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"kill <object> (WARNING should not be user-visible)"},
ga7:function(){return"(WARNING should not be user-visible)"},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){var z=this.b
b.af(z.gm(),new Q.iS())
c.eY(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gZ())
z.by(c,"<subject> die<s>",!0)
c.aO(0,"\n\n",!0)
return H.a(a.gj())+" slains "+H.a(z.gj())+" on the ground"},"$3","gT",6,0,2],
S:function(a,b){return 1},
R:function(a,b){return this.b.gaa()&&a.au(C.c)},
q:{
p9:[function(a){return new Q.iR(null,!1,!0,C.e,a,null)},"$1","oo",2,0,4]}},iS:{"^":"b:0;",
$1:function(a){a.sam(0)
return a}}}],["","",,K,{"^":"",jG:{"^":"K;a1:c<,X:d<,W:e<,a0:f<,b,a",
ga6:function(){return"parry it"},
ga7:function(){return"will <subject> parry it?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.gZ().f+"}}")
S.bq(new K.jH(a,c),new K.jI(this,a,c),null,null)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gU",6,0,2],
V:[function(a,b,c){a.co(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.gZ().f+"}",!0)
b.cm("FightSituation")
return H.a(a.cy)+" parries "+H.a(this.b.gj())},"$3","gT",6,0,2],
S:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbM())return 0
if(y.gbN())return 1
if(a.gJ())return 0.6
return 0.3},
R:function(a,b){return a.au(C.c)},
q:{
pe:[function(a){return new K.jG(!1,!0,C.e,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","oD",2,0,4]}},jH:{"^":"b:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.P(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},jI:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cX(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",ki:{"^":"K;a0:c<,a1:d<,X:e<,W:f<,b,a",
ga6:function(){return"roll out of way"},
ga7:function(){return"will <subject> evade?"},
Y:[function(a,b,c){a.ae(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.P(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.a(a.gj())+" fails to roll out of the way"},"$3","gU",6,0,2],
V:[function(a,b,c){a.jy(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gJ()){b.af(a.gm(),new Y.kj())
c.P(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.cm("FightSituation")
return H.a(a.gj())+" rolls out of the way of "+H.a(this.b.gj())+"'s strike"},"$3","gT",6,0,2],
S:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbM())return 0
if(y.gbN())return 1
if(a.gJ())return 1
return 0.5},
R:function(a,b){return!0},
q:{
pk:[function(a){return new Y.ki(null,!1,!0,C.e,a,null)},"$1","oJ",2,0,4]}},kj:{"^":"b:0;",
$1:function(a){a.sat(C.j)
return a}}}],["","",,V,{"^":"",
dc:function(a,b,c){var z=new V.db(null,null,null,null,null,null)
new V.o5(a,b,c).$1(z)
return z.D()},
eA:{"^":"aA;",
gb7:function(){return[K.oD(),Y.oJ()]},
gbM:function(){return this.c===C.n},
gbN:function(){return this.c===C.t},
gj:function(){return"OnGroundDefenseSituation"},
b9:function(){var z=new V.db(null,null,null,null,null,null)
z.v(this)
new V.jE().$1(z)
return z.D()},
b5:function(a,b){if(a===0)return b.a9(this.d)
return},
bh:function(a,b){return new H.O(a,new V.jF(this),[H.j(a,0)])}},
o5:{"^":"b:0;a,b,c",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gaj().c=z
a.gaj().f=0
z=this.a.gm()
a.gaj().b=z
z=this.b.gm()
a.gaj().e=z
a.gaj().d=this.c
return a}},
jE:{"^":"b:0;",
$1:function(a){var z=a.gaj().f
if(typeof z!=="number")return z.a8()
a.gaj().f=z+1
return a}},
jF:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
mi:{"^":"eA;a,m:b<,c,d,O:e<",
ad:function(a){var z=new V.db(null,null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.eA))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)))},
i:function(a){return"OnGroundDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+H.a(J.i(this.c))+",\ntargetOnGround="+H.a(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
db:{"^":"d;a,b,c,d,e,f",
gm:function(){return this.gaj().c},
gO:function(){return this.gaj().f},
gaj:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaj().b
x=this.gaj().c
w=this.gaj().d
v=this.gaj().e
u=this.gaj().f
z=new V.mi(y,x,w,v,u)
if(y==null)H.h(P.r("attacker"))
if(x==null)H.h(P.r("id"))
if(w==null)H.h(P.r("predeterminedResult"))
if(v==null)H.h(P.r("targetOnGround"))
if(u==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,D,{"^":"",
dq:function(a,b){var z=new D.dp(null,null,null,null,null)
new D.o6(a,b).$1(z)
return z.D()},
f_:{"^":"aA;",
gb7:function(){return[Q.oo()]},
gj:function(){return"StrikeDownSituation"},
b9:function(){var z=new D.dp(null,null,null,null,null)
z.v(this)
new D.lG().$1(z)
return z.D()},
b5:function(a,b){if(a===0)return b.a9(this.a)
return},
bh:function(a,b){return new H.O(a,new D.lH(this),[H.j(a,0)])}},
o6:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gaD().c=z
a.gaD().e=0
z=this.a.gm()
a.gaD().b=z
z=this.b.gm()
a.gaD().d=z
return a}},
lG:{"^":"b:0;",
$1:function(a){var z=a.gaD().e
if(typeof z!=="number")return z.a8()
a.gaD().e=z+1
return a}},
lH:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
mm:{"^":"f_;a,m:b<,c,O:d<",
ad:function(a){var z=new D.dp(null,null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.f_))return!1
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
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
i:function(a){return"StrikeDownSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntargetOnGround="+H.a(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dp:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaD().c},
gO:function(){return this.gaD().e},
gaD:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaD().b
x=this.gaD().c
w=this.gaD().d
v=this.gaD().e
z=new D.mm(y,x,w,v)
if(y==null)H.h(P.r("attacker"))
if(x==null)H.h(P.r("id"))
if(w==null)H.h(P.r("targetOnGround"))
if(v==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,K,{"^":"",dg:{"^":"d;a",
i:function(a){return C.a_.h(0,this.a)}}}],["","",,Y,{"^":"",lQ:{"^":"cf;a1:c<,X:d<,W:e<,b,a",
ga0:function(){return},
Y:[function(a,b,c){throw H.c(new P.ar(null))},"$3","gU",6,0,2],
V:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.e
y=z.length!==0?C.a.gI(z):null
x=y.ad(new Y.lR(this))
C.a.bW(z)
C.a.p(z,x)
w=this.b
v=b.ef(w.gf6())
for(u=R.fT(a,b),u=P.W(u,!0,H.v(u,"x",0)),t=u.length,s=b.a,r=0;r<u.length;u.length===t||(0,H.ac)(u),++r){q=b.a9(u[r].gm())
p=q.ad(new Y.lS(v))
s.aH(0,q)
s.p(0,p)}c.aO(0,"\n\n",!0)
c.aO(0,v.gaF(),!0)
c.aO(0,"\n\n",!0)
if(v.gjl()!=null){o=v.e.$1(b)
s.al(0,o)
C.a.p(z,U.iF(new H.O(s,new Y.lT(a,v),[H.j(s,0)]),o,v.r))}return H.a(a.gj())+" went through exit to "+w.a},"$3","gT",6,0,2],
bn:function(a,b){return"WARNING should not be user-visible"},
S:function(a,b){return 1},
R:function(a,b){return!0},
q:{
pt:[function(a){return new Y.lQ(!1,!1,null,a,null)},"$1","oZ",2,0,42]}},lR:{"^":"b:0;a",
$1:function(a){a.saY(this.a.b.gf6())
return a}},lS:{"^":"b:0;a",
$1:function(a){a.saY(this.a.gj())
return a}},lT:{"^":"b:0;a,b",
$1:function(a){var z,y
z=a.gbd()
y=this.a.gbd()
z=z.a
y=y.a
return(z==null?y==null:z===y)&&J.f(a.gaY(),this.b.gj())}}}],["","",,F,{"^":"",
kl:function(a){var z=new F.dk(null,null,null,null)
new F.o8(a).$1(z)
return z.D()},
eI:{"^":"aA;",
gb7:function(){return[Y.oZ()]},
gbL:function(){return H.w([],[Q.ae])},
gj:function(){return"RoomRoamingSituation"},
b9:function(){var z=new F.dk(null,null,null,null)
z.v(this)
new F.km().$1(z)
return z.D()},
b5:function(a,b){return b.a.ba(0,new F.kn(),new F.ko())},
bh:function(a,b){var z=this.b5(null,b)
if(z==null)return[]
return[z]},
fp:function(a,b){a.a.hC(new F.kp(),!0)},
d6:function(a){if(J.f(this.a,$.$get$dL().b))return!1
return!0}},
o8:{"^":"b:0;a",
$1:function(a){var z=$.$get$aF().ar(1073741823)
a.gaB().c=z
a.gaB().d=0
z=this.a.b
a.gaB().b=z
return a}},
km:{"^":"b:0;",
$1:function(a){var z=a.gaB().d
if(typeof z!=="number")return z.a8()
a.gaB().d=z+1
return a}},
kn:{"^":"b:0;",
$1:function(a){return a.gJ()&&a.gbc()}},
ko:{"^":"b:1;",
$0:function(){return}},
kp:{"^":"b:0;",
$1:function(a){return!a.gbm()}},
mj:{"^":"eI;aY:a<,m:b<,O:c<",
ad:function(a){var z=new F.dk(null,null,null,null)
z.v(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof F.eI))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z},
gC:function(a){return Y.ad(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)))},
i:function(a){return"RoomRoamingSituation {currentRoomName="+H.a(J.i(this.a))+",\nid="+J.i(this.b)+",\ntime="+J.i(this.c)+",\n}"}},
dk:{"^":"d;a,b,c,d",
gaY:function(){return this.gaB().b},
saY:function(a){this.gaB().b=a
return a},
gm:function(){return this.gaB().c},
gO:function(){return this.gaB().d},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.a=null}return this},
v:function(a){this.a=a},
D:function(){var z,y,x,w
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
z=new F.mj(y,x,w)
if(y==null)H.h(P.r("currentRoomName"))
if(x==null)H.h(P.r("id"))
if(w==null)H.h(P.r("time"))}this.v(z)
return z}}}],["","",,O,{"^":"",
pF:[function(a){var z,y
z=$.$get$cN()
y=z.t
if(y.length>0){y+=" "
z.t=y}z.t=y+a},"$1","oL",2,0,9],
pG:[function(a){$.dP=a},"$1","oM",2,0,9],
fM:[function(a,b,c,d,e,f,g){var z=L.e2(a,!1,!1,d,e,f,g)
$.$get$bA().p(0,z)
return z},function(a){return O.fM(a,!1,!1,null,null,null,null)},function(a,b,c){return O.fM(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","oK",2,13,44,0,0,0,1,1,0],
kz:{"^":"kK;",
b4:function(){var z=0,y=new P.al(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$b4=P.af(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cz){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Sending updated stats."
n.a.A(m.w())
m=t.Q
n=Z.ld()
m.toString
l=new A.q(100,null,null,null,null)
l.e=n.w()
m.a.A(l.w())
new P.E(0,$.n,null,[null]).aV(!0)}if(t.r){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Saving player chronology."
n.a.A(m.w())
t.r=!1
m=t.Q
m.toString
n=new A.q(60,null,null,null,null)
n.b=t.f.bY(0)
m.a.A(n.w())}s=null
case 3:n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.A(m.w())
w=7
z=10
return P.u(t.c4(),$async$b4,y)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.y(j)
if(n instanceof M.c7){r=n
q=H.z(j)
n=t.Q
m=H.a(r)+"\nStacktrace: "+H.a(q)
n.toString
l=new A.q(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.A(l.w())
z=1
break}else{p=n
o=H.z(j)
n=t.Q
m=H.a(p)+"\nStacktrace: "+H.a(o)
n.toString
l=new A.q(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.A(l.w())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.f(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.A(m.w())
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$b4,y)},
e6:function(){var z,y
this.eH()
this.f.aE(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fi(Z.bs())
z.toString
y=new A.q(90,null,null,null,null)
y.b=Z.bs()
z.a.A(y.w())
this.b4()},
jT:[function(a){var z,y
z={}
z.a=null
y=$.$get$bA()
y.G(0,new O.kV(z,this,a))
z=z.a
if(z==null)throw H.c(P.A("The sent choice hash ("+H.a(a)+") is not one of those offered ("+J.i(y)+")"))
this.hT(z)
this.b4()},"$1","ghE",2,0,45],
hT:function(a){var z
if(a.gf9()!=null){z=a.r
$.$get$bW().ag(z)}z=a.x
if(z!=null)this.dG(z)},
c4:function(){var z=0,y=new P.al(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$c4=P.af(function(a1,a2){if(a1===1){v=a2
z=w}while(true)switch(z){case 0:s={}
p=$.$get$bX()
o=p.b
if(o.b!==o.c){s=t.Q
s.toString
o=new A.q(667,null,null,null,null)
o.c="Awarding points."
s.a.A(o.w())
n=p.b.cV()
p=t.Q
o=n.giq()
s=n.b
m=n.c
p.toString
l=new A.q(70,null,null,null,null)
l.b=[o,s]
l.c=m
p.a.A(l.w())
p=new P.E(0,$.n,null,[null])
p.aV(null)
p.bz(new O.kL(t))
x=!0
z=1
break}k=t.x===t.e.gac().length-1||t.x===t.y
s.a=k
p=t.x
o=t.y
if(p!==o)if(p!=null){m=t.e.gac().length
if(typeof p!=="number"){x=p.ai()
z=1
break}if(p<m){p=t.e.gac()
m=t.x
if(m>>>0!==m||m>=p.length){x=H.e(p,m)
z=1
break}m=!!J.m(p[m]).$isF
p=m}else p=!1
j=p}else j=!1
else j=!1
p="atEndOfPage = "+k+", atStaticChoiceList = "+j
m=t.Q
m.toString
i=new A.q(667,null,null,null,null)
i.c=p
m.a.A(i.w())
i=$.$get$bA()
i.toString
P.jj(i,new O.kM(t),!1)
if(i.gk(i)!==0){p=t.Q
p.toString
m=new A.q(667,null,null,null,null)
m.c="We have choices."
p.a.A(m.w())
m=H.v(i,"aV",0)
m=P.W(new H.O(i,new O.kN(s,j),[m]),!0,m)
p=i.a
H.w([],[L.Y])
h=new L.e3(p,m)
if(!h.gH(h)){s=t.Q
p=s.e
if(p!=null){p.cP(new D.bD("Showing new choice before previous one was selected."))
s.e=null}p=P.t
s.e=new P.bQ(new P.E(0,$.n,null,[p]),[p])
p=h.cZ()
s.a.A(p.w())
s=s.e.a.bz(t.ghE())
g=new O.kO(t)
p=H.j(s,0)
o=$.n
if(o!==C.f){g=P.dG(g,o)
o.toString}s.cD(new P.dz(null,new P.E(0,o,null,[p]),6,new O.kP(),g,[p,p]))
x=!0
z=1
break}else{f=i.ba(0,new O.kQ(),new O.kR())
if(f!=null){if(f.gf9()!=null){p=f.r
$.$get$bW().ag(p)}p=f.x
if(p!=null)t.dG(p)
i.aH(0,f)}}}p=$.$get$bW()
m=p.b
e=p.c
z=m!==e?3:4
break
case 3:if(m===e)H.h(H.a2());++p.d
s=p.a
o=s.length
e=(e-1&o-1)>>>0
p.c=e
if(e<0||e>=o){x=H.e(s,e)
z=1
break}d=s[e]
s[e]=null
z=5
return P.u(t.c6(d),$async$c4,y)
case 5:x=a2
z=1
break
case 4:p=$.dP
if(p!=null){t.dG(p)
$.dP=null
x=!1
z=1
break}p=t.x
if(p==null){t.x=0
p=0}else if(p===o){p=t.e.gac().length-1
t.x=p}else if($.fC)$.fC=!1
else{if(typeof p!=="number"){x=p.a8()
z=1
break}++p
t.x=p}s.a=p===t.e.gac().length-1
p="Resolving block: '"+H.a(t.e.gj())+"' block "+H.a(t.x)+"."
o=t.Q
o.toString
m=new A.q(667,null,null,null,null)
m.c=p
o.a.A(m.w())
if(t.x===t.e.gac().length){s=t.Q
s.toString
p=new A.q(667,null,null,null,null)
p.c="End of book."
s.a.A(p.w())
p=t.Q
s=t.dj()
p.toString
s=s.eb(50)
p.a.A(s.w())
t.Q.a.A(new A.q(80,null,null,null,null).w())
x=!0
z=1
break}p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
z=typeof o==="string"?6:8
break
case 6:s=t.Q
p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
p=P.Q
s.f=new P.bQ(new P.E(0,$.n,null,[p]),[p])
p=new A.q(30,null,null,null,null)
p.c=o
s.a.A(p.w())
s.f.a.bz(new O.kS(t))
x=!0
z=1
break
z=7
break
case 8:p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}z=!!J.m(p[o]).$isF?9:11
break
case 9:p=t.Q
p.toString
o=new A.q(667,null,null,null,null)
o.c="A ChoiceList encountered."
p.a.A(o.w())
try{p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}i.io(p[o])}catch(a0){s=H.y(a0)
if(s instanceof M.c7){r=s
q=H.z(a0)
s=t.Q
p=H.a(r)+"\nStacktrace: "+H.a(q)
s.toString
o=new A.q(666,null,null,null,null)
o.c="AuthorScriptException: "+p
s.a.A(o.w())
x=!0
z=1
break}else throw a0}p=t.Q
p.toString
o=new A.q(667,null,null,null,null)
o.c="- choices added"
p.a.A(o.w())
if(i.bP(0,new O.kT(s,t))&&t.x===t.e.gac().length-1){s=t.Q
s.toString
p=new A.q(667,null,null,null,null)
p.c="Creating & sending savegame"
s.a.A(p.w())
p=t.Q
s=t.dj()
p.toString
s=s.eb(50)
p.a.A(s.w())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
p=H.ag(H.as(P.N,[H.as(P.aN)]))
z=p.aM(o)?12:14
break
case 12:b=t.x===t.e.gac().length-1?t.dj():null
o=t.e.gac()
m=t.x
if(m>>>0!==m||m>=o.length){x=H.e(o,m)
z=1
break}z=15
return P.u(t.c6(p.ev(o[m])),$async$c4,y)
case 15:a=a2
if(i.bP(0,new O.kU(s,t))&&t.x===t.e.gac().length-1){s=t.Q
s.toString
p=b.eb(50)
s.a.A(p.w())}x=a
z=1
break
z=13
break
case 14:s=t.e.gac()
p=t.x
if(p>>>0!==p||p>=s.length){x=H.e(s,p)
z=1
break}throw H.c(new P.R("Invalid block: "+H.a(s[p])))
case 13:case 10:case 7:case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c4,y)},
dG:function(a){var z,y,x,w,v
z=$.$get$cb()
if(z.b.test(H.bc(a))){y=this.d
if(y==null)throw H.c(new P.R("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aJ()
w=z-1}else{x=this.b.d4(a,this.e.gd5())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.a(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.p(0,H.a(z.gj())+">>"+H.a(y.gj()))
this.r=!0}if(this.f.M(0,H.a(this.e.gj())+">>"+H.a(x.gj()))||x.gfK()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfK()
else z=!1}else z=!1
$.fA=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.q(667,null,null,null,null)
v.c=z
y.a.A(v.w())
v=this.e
this.d=new O.kA(v,this.x)
this.e=x
this.x=w
v.e=J.Z(v.gd_(),1)},
eH:function(){var z,y,x,w,v,u
this.x=null
$.$get$bW().aE(0)
$.$get$bA().sk(0,0)
$.nK=null
x=$.$get$c1()
x.aE(0)
w=$.$get$bX()
x.l(0,"points",w)
w.a=0
w.b.aE(0)
this.b.is()
$.fX=!0
try{this.j1()}catch(v){x=H.y(v)
z=x
y=H.z(v)
x=this.Q
w=H.a(z)+"\n"+H.a(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.A(u.w())
throw H.c(z)}this.fv()
$.fX=!1},
c6:function(a){var z=0,y=new P.al(),x,w=2,v,u=[],t=this,s,r,q,p,o,n
var $async$c6=P.af(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$cN()
q.t=""
w=4
z=7
return P.u(a.$0(),$async$c6,y)
case 7:w=2
z=6
break
case 4:w=3
n=v
o=H.y(n)
s=o
r=H.z(n)
q.t+="<code><pre>ERROR: "+H.a(s)+"\n\n"+H.a(r)+"</pre></code>"
throw H.c(new M.c7(J.i(s),t.e.gj(),t.x))
z=6
break
case 3:z=2
break
case 6:if(q.t.length!==0){t.Q.ej(J.i(q)).bz(new O.kW(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c6,y)},
hL:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cb().b.test(H.bc(z)))return!1
y=this.b.d4(z,this.e.gd5())
if(y==null){z="Target page '"+H.a(z)+"' was not found."
x=this.Q
x.toString
w=new A.q(667,null,null,null,null)
w.c=z
x.a.A(w.w())
return!0}y.gjJ()
return!1},"$1","geL",2,0,30],
dj:function(){var z,y,x,w,v,u
this.fv()
try{x=this.e.gj()
w=$.$get$c1()
x=new Z.eK(x,this.b.iM(),null,null,null,null)
x.c=H.av(Z.cu(w),"$isD",[P.o,P.d],"$asD")
x.f=Date.now()
x.e=C.d.jG(H.a0(x),16)
return x}catch(v){x=H.y(v)
z=x
y=H.z(v)
x=this.Q
w=H.a(z)+"\n"+H.a(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.A(u.w())
throw H.c(z)}},
fj:function(a,b){var z,y,x
this.eH()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.d_("Trying to load page '"+H.a(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.A(x.w())
z.iY(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Importing player chronology."
z.a.A(y.w())
this.f.al(0,b)}z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.A(y.w())
y=$.$get$c1()
Z.kw(a,y,P.es(P.o,P.bl))
this.cx=H.fW(y.h(0,"game"),"$isec")
this.cy=H.av(y.h(0,"hitpoints"),"$isao",[P.au],"$asao")
this.db=H.av(y.h(0,"stamina"),"$isao",[P.t],"$asao")
y=this.Q
Z.fi(Z.bs())
y.toString
z=new A.q(90,null,null,null,null)
z.b=Z.bs()
y.a.A(z.w())
z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="loadFromSaveGame() done."
z.a.A(y.w())
this.b4()},
jg:function(a){return this.fj(a,null)},
d7:[function(a,b,c,d){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r
var $async$d7=P.af(function(e,f){if(e===1){v=f
z=w}while(true)switch(z){case 0:t=$.$get$cN()
if(t.t.length!==0){u.Q.ej(J.i(t))
t.t=""}t=u.Q
t.toString
s=new A.q(130,null,null,null,null)
s.b=[a,b,d,c]
t.a.A(s.w())
s=U.bN
r=new P.E(0,$.n,null,[s])
t.x=new P.bQ(r,[s])
x=r
z=1
break
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$d7,y)},function(a,b){return this.d7(a,b,null,!1)},"jO","$4$rerollEffectDescription$rerollable","$2","gh3",4,5,31,1,0]},
kV:{"^":"b:0;a,b,c",
$1:function(a){var z,y,x,w
a.sek(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.A(x.w())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cb().b.test(H.bc(z))?y.d.a:y.b.d4(z,y.e.gd5())
if(w!=null){y.f.p(0,H.a(y.e.gj())+">>"+H.a(w.gj()))
y.r=!0}}}}},
kL:{"^":"b:0;a",
$1:function(a){return this.a.b4()}},
kM:{"^":"b:0;a",
$1:function(a){return a.gek()||this.a.hL(a)}},
kN:{"^":"b:32;a,b",
$1:function(a){return a.j7(this.b,this.a.a)}},
kO:{"^":"b:0;a",
$1:function(a){var z,y,x
z=H.a(a)
y=this.a.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.A(x.w())
return}},
kP:{"^":"b:0;",
$1:function(a){return a instanceof D.bD}},
kQ:{"^":"b:0;",
$1:function(a){return a.gj8()}},
kR:{"^":"b:1;",
$0:function(){return}},
kS:{"^":"b:0;a",
$1:function(a){return this.a.b4()}},
kT:{"^":"b:0;a,b",
$1:function(a){return a.cR(!0,this.a.a,this.b.geL())}},
kU:{"^":"b:0;a,b",
$1:function(a){return a.cR(!0,this.a.a,this.b.geL())}},
kW:{"^":"b:0;a",
$1:function(a){return this.a.b4()}},
k0:{"^":"d;a,b,f3:c<",
ic:function(a,b,c){var z
if(!$.fA){z=J.Z(this.a,b)
this.a=z
this.b.ag(new A.cn(b,z,c))}},
p:function(a,b){return this.ic(a,b,null)},
a8:function(a,b){this.p(0,b)
return this},
w:function(){return P.a7(["points",this.a])},
fJ:function(a){this.a=a.h(0,"points")
this.b.aE(0)},
hd:function(){this.b=P.aM(null,A.cn)},
$isdl:1},
cv:{"^":"jK;ac:d<,d_:e@,a,b,c",
gfK:function(){return J.a_(this.e,0)}},
kA:{"^":"d;a,b"},
kG:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
d4:function(a,b){var z
if(b!=null&&this.a.K(b+": "+H.a(a)))return this.a.h(0,H.a(b)+": "+H.a(a))
else{z=this.a
if(z.K(a))return z.h(0,a)
else return}},
l:function(a,b,c){this.a.l(0,b,c)
c.sj(b)},
iM:function(){var z=new H.H(0,null,null,null,null,null,0,[P.o,null])
this.a.G(0,new O.kI(z))
return z},
iY:function(a){a.G(0,new O.kJ(this))},
is:function(){this.a.G(0,new O.kH())}},
kI:{"^":"b:5;a",
$2:function(a,b){this.a.l(0,a,P.a7(["visitCount",b.gd_()]))}},
kJ:{"^":"b:5;a",
$2:function(a,b){var z=this.a.a
if(z.K(a))z.h(0,a).sd_(J.ai(b,"visitCount"))}},
kH:{"^":"b:5;",
$2:function(a,b){b.sd_(0)}}}],["","",,M,{"^":"",c7:{"^":"d;a,b,c",
i:function(a){return"AuthorScriptException at page '"+H.a(this.b)+"', block #"+H.a(this.c)+": "+H.a(this.a)},
q:{
e_:function(a){return new M.c7(a,null,null)}}}}],["","",,M,{"^":"",kK:{"^":"d;"}}],["","",,Z,{"^":"",eK:{"^":"d;a,b,c,d,e,f",
eb:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.q(a,null,null,null,null)
z.c=this.cY()
return z},
cY:function(){var z,y
z=new H.H(0,null,null,null,null,null,0,[P.o,null])
z.l(0,"uid",this.e)
z.l(0,"currentPageName",this.a)
z.l(0,"pageMapState",this.b)
z.l(0,"vars",this.c)
z.l(0,"timestamp",this.f)
y=this.d
if(y!=null)z.l(0,"previousText",y)
return C.v.f8(z)},
i:function(a){return this.cY()},
q:{
eL:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.m(a)
z=!!z.$isF||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.m(a).$isdl},
cu:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.m(a)
if(!!z.$isF){y=[]
for(x=0;x<z.gk(a);++x)if(Z.eL(z.h(a,x)))y.push(Z.cu(z.h(a,x)))
return y}else if(!!z.$isD){w=new H.H(0,null,null,null,null,null,0,[null,null])
z.G(a,new Z.kv(a,w))
return w}else if(!!z.$isdl){v=a.w()
v.l(0,"_class",a.gf3())
return Z.cu(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
ct:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.m(a)
if(!!z.$isF){y=[]
for(x=0;x<z.gk(a);++x)y.push(Z.ct(z.h(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.K("_class")){v=new H.H(0,null,null,null,null,null,0,[null,null])
z.G(a,new Z.ku(b,v))
return v}else if(w&&a.K("_class"))if(c!=null){c.fJ(a)
return c}else{u=z.h(a,"_class")
if(!b.K(u))throw H.c(new Z.d_("Constructor for "+H.a(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
kw:function(a,b,c){a.c.G(0,new Z.kx(b,c))}}},kv:{"^":"b:5;a,b",
$2:function(a,b){if(Z.eL(this.a.h(0,a)))this.b.l(0,a,Z.cu(b))}},ku:{"^":"b:5;a,b",
$2:function(a,b){this.b.l(0,a,Z.ct(b,this.a,null))}},kx:{"^":"b:33;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.l(0,a,Z.ct(b,x,null))
else z.l(0,a,Z.ct(b,x,y))}},d_:{"^":"d;a",
i:function(a){return"IncompatibleSavegameException: "+this.a}},iX:{"^":"d;a",
i:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",k5:{"^":"d;"},k4:{"^":"k5;"},j4:{"^":"k4;a,b,c,d,e,f,r,x",
jX:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.o
n=[o,P.d]
H.av(a,"$isD",n,"$asD")
m=new A.q(a.h(0,"type"),null,null,null,null)
if(a.K("strContent"))m.c=a.h(0,"strContent")
if(a.K("listContent"))m.b=a.h(0,"listContent")
if(a.K("intContent"))m.d=a.h(0,"intContent")
if(a.K("mapContent"))m.e=H.av(a.h(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.gec()){case 1070:o=this.e
if(o!=null){o.cP(new D.bD("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.aW()
o.b.aW()
return
case 1000:o=new A.q(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.A(o.w())
n.A(new A.q(10,null,this.c.ch,null,null).w())
return
case 1050:l=z.gj2()
this.e.bt(l)
this.e=null
return
case 1060:o=new A.q(667,null,null,null,null)
o.c="New form state from player received."
this.a.A(o.w())
o=z.gji()
if(!o.K("__submitted__"))o.l(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.c0())
n.bq(new G.ia(o))
return
case 1080:o=new A.q(667,null,null,null,null)
o.c="Received slot machine result."
this.a.A(o.w())
k=J.ai(z.ge1(),0)
j=J.ai(z.ge1(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.bt(new U.bN(C.y[k],j))
this.x=null
return
case 1010:o=new A.q(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.A(o.w())
o=this.e
if(o!=null){o.cP(new D.bD("Book Restart before choice was selected."))
this.e=null}try{this.c.e6()}catch(i){o=H.y(i)
y=o
x=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="An error occured when initializing: "+H.a(y)+".\n"+H.a(x)
n.A(o.w())
throw H.c(y)}o=new A.q(90,null,null,null,null)
o.b=Z.bs()
n.A(o.w())
n.A(new A.cn(0,0,null).cZ().w())
return
case 1020:h=new A.q(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.A(h.w())
h=this.e
if(h!=null){h.cP(new D.bD("Book Load before choice was selected."))
this.e=null}try{h=z.gh7()
f=new Z.eK(null,null,null,null,null,null)
e=H.av(C.v.iz(h),"$isD",n,"$asD")
if(!e.K("currentPageName")||!e.K("vars"))H.h(new Z.iX("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.a(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.av(e.h(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.av(e.h(0,"vars"),"$isD",n,"$asD")
if(e.K("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.av(J.hf(z.ge1()),"$isbr",[o],"$asbr")
o=this.c
if(v!=null)o.fj(w,v)
else o.jg(w)}catch(i){o=H.y(i)
if(o instanceof Z.d_){u=o
t=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.a(u)+".\n"+H.a(t)
g.A(o.w())
this.c.e6()}else{s=o
r=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.a(s)+".\n"+H.a(r)
g.A(o.w())
this.c.e6()}}try{o=new A.q(90,null,null,null,null)
o.b=Z.bs()
g.A(o.w())}catch(i){o=H.y(i)
q=o
p=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.a(q)+".\n"+H.a(p)
g.A(o.w())
throw H.c(q)}this.c.toString
g.A(new A.cn(0,$.$get$bX().a,null).cZ().w())
return
case 1090:this.f.bt(!0)
this.f=null
return
case 1040:this.c.b4()
return
default:o=new A.q(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.a(z.gec())+"."
this.a.A(o.w())}},"$1","ghR",2,0,14],
ej:function(a){var z=P.Q
this.f=new P.bQ(new P.E(0,$.n,null,[z]),[z])
z=new A.q(30,null,null,null,null)
z.c=a
this.a.A(z.w())
return this.f.a}},bD:{"^":"d;a",
i:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",ia:{"^":"d;a",
gjQ:function(){return this.a.h(0,"__submitted__")},
w:function(){return P.bI(this.a,null,null)},
i:function(a){return"<CurrentState submitted="+H.a(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",q:{"^":"d;ec:a<,e1:b<,h7:c<,j2:d<,ji:e<",
gjI:function(){var z=this.a
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
default:return"Unknown type="+H.a(z)}},
cY:function(){return C.v.f8(this.w())},
w:function(){var z,y
z=new H.H(0,null,null,null,null,null,0,[P.o,P.d])
z.l(0,"type",this.a)
y=this.c
if(y!=null)z.l(0,"strContent",y)
y=this.b
if(y!=null)z.l(0,"listContent",y)
y=this.d
if(y!=null)z.l(0,"intContent",y)
y=this.e
if(y!=null)z.l(0,"mapContent",y)
return z},
i:function(a){var z,y,x
z="Message "+this.gjI()
y=this.a
x=J.m(y)
return z+(x.B(y,50)||x.B(y,60)||x.B(y,90)||x.B(y,100)||x.B(y,666)||x.B(y,667)?" (async)":"")}}}],["","",,E,{"^":"",jK:{"^":"d;j:a@,jJ:b<",
i:function(a){return this.a},
gd5:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.ha(z,": ")
if(y>0)return J.dY(this.a,0,y)
else return}}}],["","",,A,{"^":"",cn:{"^":"d;iq:a<,b,c",
i:function(a){return"Score +"+H.a(this.a)+"."},
cZ:function(){var z=new A.q(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",Y:{"^":"d;ek:a@,b,c,d,aw:e<,a0:f<,f9:r<,x,y",
gj8:function(){return this.e.length===0},
cR:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
if(b!=null)!b
if(a!=null)!a
if(c!=null&&c.$1(this)===!0)return!1
return!0},
j7:function(a,b){return this.cR(a,b,null)},
jE:function(){return P.a7(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bz:function(a){this.r=a
return this},
b8:function(a,b){return C.b.b8(this.e,b.gaw())},
i:function(a){return"Choice: "+this.e+" ["+H.a(this.x)+"] ("+this.d+")"},
ha:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.A("String given to choice cannot be null."))
this.e=J.bd(a).fH(a)
this.d=C.b.gC(a)
this.r=f
this.b=!1
this.c=!1},
$isM:1,
$asM:function(){return[L.Y]},
q:{
e2:function(a,b,c,d,e,f,g){var z=new L.Y(!1,null,null,null,null,e,null,d,g)
z.ha(a,!1,!1,d,e,f,g)
return z}}},e3:{"^":"et;a,b",
gk:function(a){return this.b.length},
sk:function(a,b){C.a.sk(this.b,b)
return b},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
l:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
io:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
v=J.G(a)
if(v.h(a,0)!=null&&!!J.m(v.h(a,0)).$isbl)try{this.a=v.h(a,0).$0()}catch(u){v=H.y(u)
z=v
throw H.c(M.e_(J.i(z)))}else this.a=null
t=this.b
s=H.ag(H.as(P.N,[H.as(P.aN)]))
r=1
while(!0){q=v.gk(a)
if(typeof q!=="number")return H.C(q)
if(!(r<q))break
y=v.h(a,r)
x=null
if(J.ai(y,"string")!=null&&!!J.m(J.ai(y,"string")).$isbl)try{x=J.ai(y,"string").$0()}catch(u){v=H.y(u)
w=v
throw H.c(M.e_(J.i(w)))}else x=""
q=x
p=J.ai(y,"goto")
o=s.ev(J.ai(y,"script"))
n=new L.Y(!1,null,null,null,null,null,null,p,J.ai(y,"submenu"))
if(q==null)H.h(P.A("String given to choice cannot be null."))
n.e=J.bd(q).fH(q)
n.d=C.b.gC(q)
n.r=o
n.b=!1
n.c=!1
C.a.p(t,n);++r}},
il:function(a,b,c,d,e,f,g){if(b instanceof L.Y)C.a.p(this.b,b)
else if(typeof b==="string")C.a.p(this.b,L.e2(b,!1,!1,e,null,f,g))
else throw H.c(P.A("To add a choice to choices, one must provide either a new Choice element or a String."))},
p:function(a,b){return this.il(a,b,!1,!1,null,null,null)},
jF:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.j(z,0)
x=P.W(new H.O(z,new L.hS(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.q(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.G(x,new L.hT(w))
return w},
cZ:function(){return this.jF(null,null,null,null)},
i:function(a){return new H.an(this.b,new L.hU(),[null,null]).cj(0,", ")},
$aset:function(){return[L.Y]},
$asey:function(){return[L.Y]},
$asF:function(){return[L.Y]},
$asT:function(){return[L.Y]}},hS:{"^":"b:0;a,b,c",
$1:function(a){return a.cR(this.b,this.a,this.c)}},hT:{"^":"b:0;a",
$1:function(a){H.a(a)
J.cO(this.a.b,a.jE())
a.a=!0}},hU:{"^":"b:0;",
$1:function(a){return H.a(a)}}}],["","",,Z,{"^":"",cw:{"^":"d;cB:a<,aw:b<",
w:function(){return P.a7(["show",this.a,"string",this.b])}},la:{"^":"d;a",
w:function(){var z=new H.H(0,null,null,null,null,null,0,[P.o,P.d])
this.a.G(0,new Z.lb(z))
return z},
G:function(a,b){this.a.G(0,b)}},lb:{"^":"b:34;a",
$2:function(a,b){this.a.l(0,a,b.w())}},fh:{"^":"d;j:a@,aF:b<,f4:c<,cU:d<,cB:e<,fo:f<,aw:r<",q:{
fi:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.w(new Array(a.length),[Z.fh])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ac)(a),++v){u=a[v]
t=J.G(u)
s=t.h(u,"name")
r=t.h(u,"description")
q=t.h(u,"color")
p=t.h(u,"priority")
o=t.h(u,"show")
n=t.h(u,"notifyOnChange")
t=t.h(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fh(s,r,q,p,o,n,t);++w}C.a.cC(z,new Z.m1())
return z}}},m1:{"^":"b:5;",
$2:function(a,b){return J.ah(b.gcU(),a.gcU())}},ao:{"^":"d;j:a<,aF:b<,c,f4:d<,cU:e<,f,r,fo:x<,f1:y@,f3:z<,$ti",
gap:function(){return this.f},
sap:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cz=!0}},
gcB:function(){return this.r},
gaw:function(){return this.c.$1(this.f)},
w:function(){return P.a7(["name",this.a,"value",this.f,"show",this.r])},
fJ:function(a){var z
this.sap(H.h3(a.h(0,"value"),H.j(this,0)))
z=a.h(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cz=!0}},
$isdl:1,
q:{
cx:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cy()
y=z.K(a)?H.av(z.h(0,a),"$isao",[h],"$asao"):new Z.ao(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.h3(e,h)
y.r=!0
z.l(0,a,y)
return y},
ld:function(){var z,y
z=new Z.la(new H.H(0,null,null,null,null,null,0,[P.o,Z.cw]))
y=$.$get$cy().gc_()
new H.O(y,new Z.le(),[H.v(y,"x",0)]).G(0,new Z.lf(z))
$.cz=!1
return z},
bs:function(){var z=H.w([],[[P.D,P.o,P.d]])
$.$get$cy().gc_().G(0,new Z.lc(z))
return z}}},le:{"^":"b:0;",
$1:function(a){return a.gf1()}},lf:{"^":"b:17;a",
$1:function(a){var z,y
z=a.gcB()
y=a.gaw()
a.sf1(!1)
this.a.a.l(0,a.a,new Z.cw(z,y))}},lc:{"^":"b:17;a",
$1:function(a){var z=new H.H(0,null,null,null,null,null,0,[P.o,P.d])
z.l(0,"name",a.gj())
z.l(0,"description",a.gaF())
z.l(0,"color",a.gf4())
z.l(0,"priority",a.gcU())
z.l(0,"show",a.gcB())
z.l(0,"notifyOnChange",a.gfo())
z.l(0,"string",a.gaw())
this.a.push(z)}}}],["","",,B,{"^":"",js:{"^":"d;"},p8:{"^":"ju;"},jt:{"^":"js;"},ju:{"^":"jt;"}}],["","",,N,{"^":"",d7:{"^":"d;j:a<,b,c,ht:d<,e,f",
gfc:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gj(),"")
x=this.a
return y?x:z.gfc()+"."+x},
ge0:function(){if($.fV){var z=this.b
if(z!=null)return z.ge0()}return $.nS},
jh:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.ge0().b){if(!!J.m(b).$isbl)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.oI.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.a(b)
throw H.c(x)}catch(u){x=H.y(u)
z=x
y=H.z(u)
d=y
if(c==null)c=z}e=$.n
x=b
w=this.gfc()
t=c
s=d
r=Date.now()
q=$.eu
$.eu=q+1
p=new N.jn(a,x,v,w,new P.cd(r,!1),q,t,s,e)
if($.fV)for(o=this;o!=null;){o.eO(p)
o=o.b}else $.$get$ew().eO(p)}},
bT:function(a,b,c,d){return this.jh(a,b,c,d,null)},
iP:function(a,b,c){return this.bT(C.R,a,b,c)},
a_:function(a){return this.iP(a,null,null)},
iO:function(a,b,c){return this.bT(C.Q,a,b,c)},
aP:function(a){return this.iO(a,null,null)},
iN:function(a,b,c){return this.bT(C.S,a,b,c)},
bw:function(a){return this.iN(a,null,null)},
j0:function(a,b,c){return this.bT(C.x,a,b,c)},
j_:function(a){return this.j0(a,null,null)},
jK:function(a,b,c){return this.bT(C.V,a,b,c)},
ed:function(a){return this.jK(a,null,null)},
h2:function(a,b,c){return this.bT(C.U,a,b,c)},
eh:function(a){return this.h2(a,null,null)},
eO:function(a){},
q:{
aW:function(a){return $.$get$ev().fz(a,new N.oa(a))}}},oa:{"^":"b:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d9(z,"."))H.h(P.A("name shouldn't start with a '.'"))
y=C.b.je(z,".")
if(y===-1)x=z!==""?N.aW(""):null
else{x=N.aW(C.b.ax(z,0,y))
z=C.b.bj(z,y+1)}w=new H.H(0,null,null,null,null,null,0,[P.o,N.d7])
w=new N.d7(z,x,null,w,new P.fk(w,[null,null]),null)
if(x!=null)x.ght().l(0,z,w)
return w}},ax:{"^":"d;j:a<,ap:b<",
B:function(a,b){if(b==null)return!1
return b instanceof N.ax&&this.b===b.b},
ai:function(a,b){return C.d.ai(this.b,b.gap())},
bE:function(a,b){return C.d.bE(this.b,b.gap())},
bo:function(a,b){var z=b.gap()
if(typeof z!=="number")return H.C(z)
return this.b>z},
bC:function(a,b){return this.b>=b.gap()},
b8:function(a,b){var z=b.gap()
if(typeof z!=="number")return H.C(z)
return this.b-z},
gC:function(a){return this.b},
i:function(a){return this.a},
$isM:1,
$asM:function(){return[N.ax]}},jn:{"^":"d;e0:a<,b,an:c<,d,O:e<,f,aZ:r<,aU:x<,y",
i:function(a){return"["+this.a.a+"] "+this.d+": "+H.a(this.b)}}}],["","",,X,{"^":"",
be:function(a){return X.dD(J.h7(a,0,new X.os()))},
b8:function(a,b){var z=J.Z(a,b)
if(typeof z!=="number")return H.C(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dD:function(a){if(typeof a!=="number")return H.C(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
os:{"^":"b:5;",
$2:function(a,b){return X.b8(a,J.l(b))}}}],["","",,U,{"^":"",cr:{"^":"d;a",
i:function(a){return C.Z.h(0,this.a)}},bN:{"^":"d;a,jL:b<",
gdZ:function(){return this.a===C.C},
i:function(a){return"SessionResult<"+this.a.i(0)+",wasRerolled="+H.a(this.b)+">"},
B:function(a,b){if(b==null)return!1
return b instanceof U.bN&&b.a===this.a&&J.f(b.b,this.b)},
gC:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
pH:[function(a,b){var z,y,x,w,v
z=new D.j4(b,null,null,null,null,null,null,null)
y=$.eG
$.eG=y+1
x=new H.bL(y,null,!1)
w=init.globalState.d
w.dd(y,x)
w.cc()
w=new H.kc(x,null)
w.he(x)
z.b=w
w=w.b
w.toString
new P.cC(w,[H.j(w,0)]).ah(z.ghR(),null,null,null)
b.A(new H.bU(z.b.a,init.globalState.d.a))
v=N.kC()
z.c=v
v.Q=z},"$2","fN",4,0,29]},1]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.el.prototype
return J.j6.prototype}if(typeof a=="string")return J.bH.prototype
if(a==null)return J.em.prototype
if(typeof a=="boolean")return J.ek.prototype
if(a.constructor==Array)return J.bF.prototype
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.aH=function(a){if(a==null)return a
if(a.constructor==Array)return J.bF.prototype
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.G=function(a){if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(a.constructor==Array)return J.bF.prototype
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.a9=function(a){if(typeof a=="number")return J.bG.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.dO=function(a){if(typeof a=="number")return J.bG.prototype
if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.bd=function(a){if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.Z=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.dO(a).a8(a,b)}
J.bf=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.a9(a).d1(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).B(a,b)}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a9(a).bo(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a9(a).ai(a,b)}
J.bg=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dO(a).bF(a,b)}
J.h6=function(a){if(typeof a=="number")return-a
return J.a9(a).eg(a)}
J.ah=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a9(a).aJ(a,b)}
J.ai=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.G(a).h(a,b)}
J.cO=function(a,b){return J.aH(a).p(a,b)}
J.c3=function(a,b){return J.dO(a).b8(a,b)}
J.dU=function(a,b){return J.G(a).M(a,b)}
J.dV=function(a,b){return J.aH(a).a4(a,b)}
J.h7=function(a,b,c){return J.aH(a).aQ(a,b,c)}
J.l=function(a){return J.m(a).gC(a)}
J.dW=function(a){return J.G(a).gH(a)}
J.aa=function(a){return J.aH(a).gN(a)}
J.h8=function(a){return J.aH(a).gI(a)}
J.aj=function(a){return J.G(a).gk(a)}
J.h9=function(a){return J.m(a).gb2(a)}
J.ha=function(a,b){return J.G(a).bb(a,b)}
J.dX=function(a,b){return J.aH(a).aG(a,b)}
J.hb=function(a,b,c){return J.bd(a).fk(a,b,c)}
J.hc=function(a,b,c){return J.bd(a).jv(a,b,c)}
J.hd=function(a){return J.a9(a).e7(a)}
J.he=function(a,b){return J.aH(a).d8(a,b)}
J.cP=function(a,b){return J.bd(a).d9(a,b)}
J.dY=function(a,b,c){return J.bd(a).ax(a,b,c)}
J.hf=function(a){return J.aH(a).bf(a)}
J.i=function(a){return J.m(a).i(a)}
J.bh=function(a,b){return J.a9(a).cr(a,b)}
J.hg=function(a,b){return J.aH(a).bB(a,b)}
I.cL=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.I=J.aw.prototype
C.a=J.bF.prototype
C.p=J.ek.prototype
C.d=J.el.prototype
C.q=J.em.prototype
C.h=J.bG.prototype
C.b=J.bH.prototype
C.D=new A.a6(0,0,0)
C.E=new A.a6(-1/0,-1/0,-1/0)
C.F=new H.eb()
C.G=new P.jJ()
C.u=new P.mJ()
C.H=new P.n2()
C.f=new P.nh()
C.w=new P.aK(0)
C.J=new U.ch(0)
C.K=new U.ch(1)
C.L=new U.ch(2)
C.c=new U.ch(3)
C.M=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.ja(null,null)
C.N=new P.jc(null)
C.O=new P.jd(null,null)
C.P=new O.je(0)
C.Q=new N.ax("FINER",400)
C.R=new N.ax("FINEST",300)
C.S=new N.ax("FINE",500)
C.x=new N.ax("INFO",800)
C.T=new N.ax("OFF",2000)
C.U=new N.ax("SEVERE",1000)
C.V=new N.ax("WARNING",900)
C.C=new U.cr(0)
C.a3=new U.cr(1)
C.a4=new U.cr(2)
C.a5=new U.cr(3)
C.y=I.cL([C.C,C.a3,C.a4,C.a5])
C.i=I.cL([])
C.W=new H.bm([0,"Resource.stamina",1,"Resource.balance"],[null,null])
C.X=new H.i0(0,{},C.i,[null,null])
C.Y=new H.bm([0,"ItemType.spear",1,"ItemType.branch",2,"ItemType.tent",3,"ItemType.sword"],[null,null])
C.Z=new H.bm([0,"Result.success",1,"Result.failure",2,"Result.criticalSuccess",3,"Result.criticalFailure"],[null,null])
C.a_=new H.bm([0,"Predetermination.none",1,"Predetermination.successGuaranteed",2,"Predetermination.failureGuaranteed"],[null,null])
C.a0=new H.bm([0,"KnownToMode.all",1,"KnownToMode.protagonistOnly",2,"KnownToMode.custom"],[null,null])
C.z=new H.bm([0,"Pose.standing",1,"Pose.offBalance",2,"Pose.onGround"],[null,null])
C.j=new R.df(0)
C.l=new R.df(1)
C.o=new R.df(2)
C.r=new K.dg(0)
C.t=new K.dg(1)
C.n=new K.dg(2)
C.A=new Y.bJ("he","him","his","himself")
C.k=new Y.bJ("it","it","its","itself")
C.a1=new Y.bJ("she","her","her","herself")
C.a2=new Y.bJ("they","them","their","themselves")
C.B=new Y.bJ("you","you","your","yourself")
C.e=new Q.kh(0)
C.a6=H.aQ("en")
C.a7=H.aQ("aN")
C.a8=H.aQ("o")
C.a9=H.aQ("Q")
C.aa=H.aQ("au")
C.m=H.aQ("dynamic")
C.ab=H.aQ("t")
C.ac=H.aQ("J")
C.ad=new P.bu(null,2)
$.eG=1
$.eC="$cachedFunction"
$.eD="$cachedInvocation"
$.ak=0
$.bi=null
$.e0=null
$.b9=null
$.bw=null
$.bx=null
$.dE=!1
$.n=C.f
$.ee=0
$.dP=null
$.fA=!1
$.nK=null
$.fC=!1
$.fX=!0
$.cz=!1
$.fV=!1
$.oI=C.T
$.nS=C.x
$.eu=0
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
I.$lazy(y,x,w)}})(["eh","$get$eh",function(){return H.j2()},"ei","$get$ei",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ee
$.ee=z+1
z="expando$key$"+z}return new P.iE(null,z,[P.t])},"f6","$get$f6",function(){return H.aq(H.cB({
toString:function(){return"$receiver$"}}))},"f7","$get$f7",function(){return H.aq(H.cB({$method$:null,
toString:function(){return"$receiver$"}}))},"f8","$get$f8",function(){return H.aq(H.cB(null))},"f9","$get$f9",function(){return H.aq(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fd","$get$fd",function(){return H.aq(H.cB(void 0))},"fe","$get$fe",function(){return H.aq(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fb","$get$fb",function(){return H.aq(H.fc(null))},"fa","$get$fa",function(){return H.aq(function(){try{null.$method$}catch(z){return z.message}}())},"fg","$get$fg",function(){return H.aq(H.fc(void 0))},"ff","$get$ff",function(){return H.aq(function(){try{(void 0).$method$}catch(z){return z.message}}())},"du","$get$du",function(){return P.mr()},"aT","$get$aT",function(){return P.iU(null,null)},"by","$get$by",function(){return[]},"bp","$get$bp",function(){return N.aW("PlannerRecommendation")},"dL","$get$dL",function(){return K.kk("__END_OF_ROAM__","","",null,null,[],"ground")},"aF","$get$aF",function(){return P.di(null)},"b_","$get$b_",function(){return P.di(null)},"fZ","$get$fZ",function(){return N.aW("Storyline")},"eY","$get$eY",function(){return P.b0("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"dK","$get$dK",function(){return L.dt(new L.o3())},"aI","$get$aI",function(){return L.dt(new L.o2())},"dR","$get$dR",function(){return L.dt(new L.o9())},"dd","$get$dd",function(){return new F.jO("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"dI","$get$dI",function(){return Y.cW(!1,"balance",!0,C.k,$.$get$aI())},"h0","$get$h0",function(){return Y.cW(!1,"pounding",!1,C.k,$.$get$aI())},"eH","$get$eH",function(){return new B.kf("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"eM","$get$eM",function(){return new O.ky(null,!1,!1,null,null)},"eU","$get$eU",function(){return new Q.l5(null,!1,!0,C.e,null)},"fj","$get$fj",function(){return new M.m2("",!0,C.e,!1,null)},"fB","$get$fB",function(){return P.di(null)},"h4","$get$h4",function(){return Y.cW(!1,"swing",!0,C.k,$.$get$aI())},"cN","$get$cN",function(){return P.lI("")},"bX","$get$bX",function(){var z=new O.k0(0,null,"PointsCounter")
z.hd()
return z},"bA","$get$bA",function(){return new L.e3(null,H.w([],[L.Y]))},"c1","$get$c1",function(){return H.er(P.o,P.d)},"bW","$get$bW",function(){return P.aM(null,{func:1,ret:[P.N,P.aN]})},"cb","$get$cb",function(){return P.b0("^\\s*<<<\\s*$",!0,!1)},"cy","$get$cy",function(){return H.er(P.o,Z.ao)},"ew","$get$ew",function(){return N.aW("")},"ev","$get$ev",function(){return P.es(P.o,N.d7)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.o,args:[R.X,A.b5,Y.ap]},{func:1,v:true},{func:1,ret:Q.K,args:[R.X]},{func:1,args:[,,]},{func:1,ret:P.o,args:[P.t]},{func:1,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.o]},{func:1,args:[,P.aB]},{func:1,v:true,args:[,],opt:[P.aB]},{func:1,ret:P.N},{func:1,args:[P.au]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bk,args:[P.t]},{func:1,args:[R.X]},{func:1,args:[Z.ao]},{func:1,ret:P.J,args:[A.a6]},{func:1,args:[,],opt:[,]},{func:1,ret:P.J,args:[A.cQ]},{func:1,args:[P.t,,]},{func:1,args:[[P.F,Y.a3],Y.a3]},{func:1,args:[Y.a3]},{func:1,args:[P.aX]},{func:1,args:[P.Q]},{func:1,v:true,args:[P.d,P.aB]},{func:1,ret:P.Q,args:[[P.x,P.t]]},{func:1,ret:P.Q,args:[P.t]},{func:1,v:true,args:[[P.F,P.o],P.eN]},{func:1,ret:P.Q,args:[L.Y]},{func:1,ret:[P.N,U.bN],args:[P.au,P.o],named:{rerollEffectDescription:P.o,rerollable:P.Q}},{func:1,args:[L.Y]},{func:1,args:[P.o,,]},{func:1,args:[P.o,Z.cw]},{func:1,v:true,args:[,P.aB]},{func:1,ret:P.o,args:[P.o]},{func:1,ret:P.o,args:[Q.ae]},{func:1,ret:P.t,args:[P.M,P.M]},{func:1,args:[P.t,R.X]},{func:1,ret:P.J,args:[P.J,P.J]},{func:1,args:[P.J,R.X]},{func:1,ret:Q.cf,args:[Q.aS]},{func:1,args:[{func:1,v:true}]},{func:1,ret:L.Y,args:[P.o],named:{deferToChoiceList:P.Q,deferToEndOfPage:P.Q,goto:P.o,helpMessage:P.o,script:{func:1,ret:[P.N,P.aN]},submenu:P.o}},{func:1,v:true,args:[P.t]}]
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
if(x==y)H.p_(d||a)
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
Isolate.cL=a.cL
Isolate.aG=a.aG
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.h2(X.fN(),b)},[])
else (function(b){H.h2(X.fN(),b)})([])})})()