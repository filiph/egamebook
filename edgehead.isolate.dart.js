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
var dart=[["","",,H,{"^":"",wa:{"^":"d;a"}}],["","",,J,{"^":"",
p:function(a){return void 0},
aT:{"^":"d;",
u:function(a,b){return a===b},
gw:function(a){return H.aD(a)},
k:function(a){return H.cO(a)},
gbu:function(a){return new H.av(H.id(a),null)}},
f6:{"^":"aT;",
k:function(a){return String(a)},
gw:function(a){return a?519018:218159},
gbu:function(a){return C.a8},
$isa3:1},
f9:{"^":"aT;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gw:function(a){return 0},
gbu:function(a){return C.a6},
$isat:1},
fc:{"^":"aT;",
gw:function(a){return 0},
gbu:function(a){return C.a5},
k:function(a){return String(a)},
$isfa:1},
wg:{"^":"fc;"},
bn:{"^":"fc;"},
c4:{"^":"aT;$ti",
fL:function(a,b){if(!!a.immutable$list)throw H.c(new P.V(b))},
cJ:function(a,b){if(!!a.fixed$length)throw H.c(new P.V(b))},
q:function(a,b){this.cJ(a,"add")
a.push(b)},
kx:function(a){this.cJ(a,"removeLast")
if(a.length===0)throw H.c(H.aH(a,-1))
return a.pop()},
a9:function(a,b){var z
this.cJ(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
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
c2:function(a,b){return new H.J(a,b,[H.m(a,0)])},
ar:function(a,b){var z
this.cJ(a,"addAll")
for(z=J.an(b);z.t();)a.push(z.gG())},
U:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aO:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dT:function(a,b){return H.h3(a,b,null,H.m(a,0))},
bl:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
bc:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.af())},
dv:function(a,b){return this.bc(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
gez:function(a){if(a.length>0)return a[0]
throw H.c(H.af())},
gA:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.af())},
gc5:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.af())
throw H.c(H.ds())},
aW:function(a,b,c,d,e){var z,y,x
this.fL(a,"setRange")
P.ca(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a6(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f5())
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
this.fL(a,"sort")
z=b==null?P.tF():b
H.ce(a,0,a.length-1,z)},
f_:function(a){return this.cp(a,null)},
bM:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aU:function(a,b){return this.bM(a,b,0)},
a3:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gT:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
k:function(a){return P.c3(a,"[","]")},
bE:function(a){return P.b1(a,H.m(a,0))},
gX:function(a){return new J.bb(a,a.length,0,null,[H.m(a,0)])},
gw:function(a){return H.aD(a)},
gm:function(a){return a.length},
sm:function(a,b){this.cJ(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cu(b,"newLength",null))
if(b<0)throw H.c(P.a6(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aH(a,b))
if(b>=a.length||b<0)throw H.c(H.aH(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.V("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aH(a,b))
if(b>=a.length||b<0)throw H.c(H.aH(a,b))
a[b]=c},
$iscK:1,
$ascK:I.b9,
$isL:1,
$isa_:1,
$isw:1},
w9:{"^":"c4;$ti"},
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
if(typeof b!=="number")throw H.c(H.W(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdz(b)
if(this.gdz(a)===z)return 0
if(this.gdz(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdz:function(a){return a===0?1/a<0:a<0},
hi:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.V(""+a+".round()"))},
kN:function(a){return a},
b6:function(a,b){var z
if(b>20)throw H.c(P.a6(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdz(a))return"-"+z
return z},
kQ:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a6(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cK(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.V("Unexpected toString result: "+z))
x=J.I(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c3("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
eW:function(a){return-a},
a7:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a-b},
d3:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a/b},
c3:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a*b},
bI:function(a,b){return(a|0)===a?a/b|0:this.iV(a,b)},
iV:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.V("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dl:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aR:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a<b},
b7:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a>b},
d4:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a<=b},
bN:function(a,b){if(typeof b!=="number")throw H.c(H.W(b))
return a>=b},
gbu:function(a){return C.ab},
$isK:1},
f8:{"^":"c5;",
gbu:function(a){return C.aa},
$isaR:1,
$isK:1,
$isu:1},
f7:{"^":"c5;",
gbu:function(a){return C.a9},
$isaR:1,
$isK:1},
c6:{"^":"aT;",
cK:function(a,b){if(b<0)throw H.c(H.aH(a,b))
if(b>=a.length)H.i(H.aH(a,b))
return a.charCodeAt(b)},
cs:function(a,b){if(b>=a.length)throw H.c(H.aH(a,b))
return a.charCodeAt(b)},
dq:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.qQ(b,a,c)},
es:function(a,b){return this.dq(a,b,0)},
h1:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cK(b,c+y)!==this.cs(a,y))return
return new H.h2(c,b,a)},
a7:function(a,b){if(typeof b!=="string")throw H.c(P.cu(b,null,null))
return a+b},
ex:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bG(a,y-z)},
kz:function(a,b,c){H.bt(c)
return H.o(a,b,c)},
kA:function(a,b,c,d){H.bt(c)
P.n1(d,0,a.length,"startIndex",null)
return H.iD(a,b,c,d)},
cU:function(a,b,c){return this.kA(a,b,c,0)},
hO:function(a,b,c){var z
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iT(b,a,c)!=null},
da:function(a,b){return this.hO(a,b,0)},
aF:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.W(c))
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
if(this.cs(z,0)===133){x=J.dt(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cK(z,w)===133?J.lD(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kR:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cs(z,0)===133?J.dt(z,1):0}else{y=J.dt(a,0)
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
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aU:function(a,b){return this.bM(a,b,0)},
kf:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ke:function(a,b){return this.kf(a,b,null)},
jm:function(a,b,c){if(b==null)H.i(H.W(b))
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
return H.vK(a,b,c)},
a3:function(a,b){return this.jm(a,b,0)},
gT:function(a){return a.length===0},
gaq:function(a){return a.length!==0},
bA:function(a,b){var z
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
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aH(a,b))
if(b>=a.length||b<0)throw H.c(H.aH(a,b))
return a[b]},
$iscK:1,
$ascK:I.b9,
$ist:1,
$isdO:1,
v:{
fb:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dt:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cs(a,b)
if(y!==32&&y!==13&&!J.fb(y))break;++b}return b},
lD:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cK(a,z)
if(y!==32&&y!==13&&!J.fb(y))break}return b}}}}],["","",,H,{"^":"",
hH:function(a){return a},
af:function(){return new P.z("No element")},
ds:function(){return new P.z("Too many elements")},
f5:function(){return new P.z("Too few elements")},
ce:function(a,b,c,d){if(c-b<=32)H.fW(a,b,c,d)
else H.fV(a,b,c,d)},
fW:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.I(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a7(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
fV:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(J.e(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.j(a,k)
i=d.$2(j,r)
h=J.p(i)
if(h.u(i,0))continue
if(h.aR(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.ak(i)
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
break}}H.ce(a,m,l,d)}else H.ce(a,m,l,d)},
a_:{"^":"w;$ti"},
aV:{"^":"a_;$ti",
gX:function(a){return new H.dC(this,this.gm(this),0,null,[H.y(this,"aV",0)])},
U:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gT:function(a){return this.gm(this)===0},
gA:function(a){if(this.gm(this)===0)throw H.c(H.af())
return this.as(0,this.gm(this)-1)},
a3:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(J.e(this.as(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bc:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
cb:function(a,b){var z,y,x,w
z=this.gm(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gm(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c2:function(a,b){return this.dW(0,b)},
aO:function(a,b){return new H.ap(this,b,[H.y(this,"aV",0),null])},
bl:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gm(this))throw H.c(new P.C(this))}return y},
bD:function(a,b){var z,y,x,w
z=[H.y(this,"aV",0)]
if(b){y=H.q([],z)
C.a.sm(y,this.gm(this))}else{x=new Array(this.gm(this))
x.fixed$length=Array
y=H.q(x,z)}for(w=0;w<this.gm(this);++w){z=this.as(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cm:function(a){return this.bD(a,!0)},
bE:function(a){var z,y
z=P.a0(null,null,null,H.y(this,"aV",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.as(0,y))
return z}},
oK:{"^":"aV;a,b,c,$ti",
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
return J.eI(this.a,z)},
bD:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.I(y)
w=x.gm(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.q([],u)
C.a.sm(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.q(s,u)}for(r=0;r<v;++r){u=x.as(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gm(y)<w)throw H.c(new P.C(this))}return t},
hZ:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a6(z,0,null,"start",null))},
v:{
h3:function(a,b,c,d){var z=new H.oK(a,b,c,[d])
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
gX:function(a){return new H.m7(null,J.an(this.a),this.b,this.$ti)},
gm:function(a){return J.aK(this.a)},
gT:function(a){return J.eJ(this.a)},
gA:function(a){return this.b.$1(J.iQ(this.a))},
$asw:function(a,b){return[b]},
v:{
bA:function(a,b,c,d){if(!!J.p(a).$isa_)return new H.by(a,b,[c,d])
return new H.dF(a,b,[c,d])}}},
by:{"^":"dF;a,b,$ti",$isa_:1,
$asa_:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
m7:{"^":"cJ;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascJ:function(a,b){return[b]}},
ap:{"^":"aV;a,b,$ti",
gm:function(a){return J.aK(this.a)},
as:function(a,b){return this.b.$1(J.eI(this.a,b))},
$asaV:function(a,b){return[b]},
$asa_:function(a,b){return[b]},
$asw:function(a,b){return[b]}},
J:{"^":"w;a,b,$ti",
gX:function(a){return new H.cf(J.an(this.a),this.b,this.$ti)},
aO:function(a,b){return new H.dF(this,b,[H.m(this,0),null])}},
cf:{"^":"cJ;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fN:{"^":"w;a,b,$ti",
gX:function(a){return new H.nQ(J.an(this.a),this.b,this.$ti)},
v:{
nP:function(a,b,c){if(!!J.p(a).$isa_)return new H.kR(a,H.hH(b),[c])
return new H.fN(a,H.hH(b),[c])}}},
kR:{"^":"fN;a,b,$ti",
gm:function(a){var z=J.aK(this.a)-this.b
if(z>=0)return z
return 0},
$isa_:1},
nQ:{"^":"cJ;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gG:function(){return this.a.gG()}},
kS:{"^":"d;$ti",
t:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
ck:function(a,b){var z=a.cM(b)
if(!init.globalState.d.cy)init.globalState.f.bt()
return z},
iA:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isL)throw H.c(P.D("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qC(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$f3()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qb(P.b3(null,H.ci),0)
x=P.u
y.z=new H.S(0,null,null,null,null,null,0,[x,H.ed])
y.ch=new H.S(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qB()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lv,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qD)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a0(null,null,null,x)
v=new H.cb(0,null,!1)
u=new H.ed(y,new H.S(0,null,null,null,null,null,0,[x,H.cb]),w,init.createNewIsolate(),v,new H.bc(H.da()),new H.bc(H.da()),!1,!1,[],P.a0(null,null,null,null),null,null,!1,!0,P.a0(null,null,null,null))
w.q(0,0)
u.dY(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cM(new H.v8(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cM(new H.v9(z,a))
else u.cM(a)
init.globalState.f.bt()},
lz:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lA()
return},
lA:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.V("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.V('Cannot extract URI from "'+z+'"'))},
lv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d_(!0,[]).bU(b.data)
y=J.I(z)
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
p=P.a0(null,null,null,q)
o=new H.cb(0,null,!1)
n=new H.ed(y,new H.S(0,null,null,null,null,null,0,[q,H.cb]),p,init.createNewIsolate(),o,new H.bc(H.da()),new H.bc(H.da()),!1,!1,[],P.a0(null,null,null,null),null,null,!1,!0,P.a0(null,null,null,null))
p.q(0,0)
n.dY(0,o)
init.globalState.f.a.aA(new H.ci(n,new H.lw(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bt()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").E(y.j(z,"msg"))
init.globalState.f.bt()
break
case"close":init.globalState.ch.a9(0,$.$get$f4().j(0,a))
a.terminate()
init.globalState.f.bt()
break
case"log":H.lu(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.bp(!0,P.bN(null,P.u)).bf(q)
y.toString
self.postMessage(q)}else P.ez(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lu:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.bp(!0,P.bN(null,P.u)).bf(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.B(w)
y=P.cD(z)
throw H.c(y)}},
lx:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fy=$.fy+("_"+y)
$.fz=$.fz+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.cj(y,x),w,z.r])
x=new H.ly(a,b,c,d,z)
if(e===!0){z.fH(w,w)
init.globalState.f.a.aA(new H.ci(z,x,"start isolate"))}else x.$0()},
r6:function(a){return new H.d_(!0,[]).bU(new H.bp(!1,P.bN(null,P.u)).bf(a))},
v8:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
v9:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qC:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
qD:function(a){var z=P.ab(["command","print","msg",a])
return new H.bp(!0,P.bN(null,P.u)).bf(z)}}},
ed:{"^":"d;i:a<,b,c,kc:d<,jo:e<,f,r,x,cP:y<,z,Q,ch,cx,cy,db,dx",
fH:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cF()},
ky:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a9(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fG(x)}this.y=!1}this.cF()},
jb:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kv:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.V("removeRange"))
P.ca(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hH:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jM:function(a,b,c){var z=J.p(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b3(null,null)
this.cx=z}z.aA(new H.qs(a,c))},
jL:function(a,b){var z
if(!this.r.u(0,a))return
z=J.p(b)
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
else{P.ez(a)
if(b!=null)P.ez(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.aj(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.E(y)},
cM:function(a){var z,y,x,w,v,u,t
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
ce:function(a){return this.b.j(0,a)},
dY:function(a,b){var z=this.b
if(z.a6(a))throw H.c(P.cD("Registry: ports must be registered only once."))
z.n(0,a,b)},
cF:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eG()},
eG:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b4(0)
for(z=this.b,y=z.gcn(),y=y.gX(y);y.t();)y.gG().ig()
z.b4(0)
this.c.b4(0)
init.globalState.z.a9(0,this.a)
this.dx.b4(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.E(z[v])}this.ch=null}},"$0","gkd",0,0,6]},
qs:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
qb:{"^":"d;a,b",
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
x=P.ab(["command","close"])
x=new H.bp(!0,new P.hC(0,null,null,null,null,null,0,[null,P.u])).bf(x)
y.toString
self.postMessage(x)}return!1}z.kt()
return!0},
fw:function(){if(self.window!=null)new H.qc(this).$0()
else for(;this.hl(););},
bt:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fw()
else try{this.fw()}catch(x){z=H.A(x)
y=H.B(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bp(!0,P.bN(null,P.u)).bf(v)
w.toString
self.postMessage(v)}}},
qc:{"^":"a:6;a",
$0:function(){if(!this.a.hl())return
P.pf(C.x,this)}},
ci:{"^":"d;a,b,c",
kt:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cM(this.b)}},
qB:{"^":"d;"},
lw:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.lx(this.a,this.b,this.c,this.d,this.e,this.f)}},
ly:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cF()}},
hw:{"^":"d;"},
cj:{"^":"hw;b,a",
E:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfl())return
x=H.r6(a)
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
break}return}init.globalState.f.a.aA(new H.ci(z,new H.qF(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.cj&&J.e(this.b,b.b)},
gw:function(a){return this.b.gea()}},
qF:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfl())z.i4(this.b)}},
eg:{"^":"hw;b,c,a",
E:function(a){var z,y,x
z=P.ab(["command","message","port",this,"msg",a])
y=new H.bp(!0,P.bN(null,P.u)).bf(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.eg&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
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
z.cF()},
i4:function(a){if(this.c)return
this.b.$1(a)},
$isn2:1},
n3:{"^":"ai;a,b",
aD:function(a,b,c,d){var z=this.b
z.toString
return new P.cZ(z,[H.m(z,0)]).aD(a,b,c,d)},
eJ:function(a,b,c){return this.aD(a,null,b,c)},
bj:[function(){this.a.bj()
this.b.bj()},"$0","gjk",0,0,6],
hX:function(a){var z=new P.qU(null,0,null,null,null,null,this.gjk(),[null])
this.b=z
this.a.b=z.gj1(z)},
$asai:I.b9},
pb:{"^":"d;a,b,c",
gca:function(){return this.c!=null},
i_:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aA(new H.ci(y,new H.pd(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d7(new H.pe(this,b),0),a)}else throw H.c(new P.V("Timer greater than 0."))},
v:{
pc:function(a,b){var z=new H.pb(!0,!1,null)
z.i_(a,b)
return z}}},
pd:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pe:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bc:{"^":"d;ea:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.kZ()
z=C.j.dl(z,0)^C.j.bI(z,4294967296)
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
z=J.p(a)
if(!!z.$iscK)return this.hD(a)
if(!!z.$isls){x=this.ghA()
z=a.gcc()
z=H.bA(z,x,H.y(z,"w",0),null)
z=P.T(z,!0,H.y(z,"w",0))
w=a.gcn()
w=H.bA(w,x,H.y(w,"w",0),null)
return["map",z,P.T(w,!0,H.y(w,"w",0))]}if(!!z.$isfa)return this.hE(a)
if(!!z.$isaT)this.ho(a)
if(!!z.$isn2)this.d_(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscj)return this.hF(a)
if(!!z.$iseg)return this.hG(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d_(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbc)return["capability",a.a]
if(!(a instanceof P.d))this.ho(a)
return["dart",init.classIdExtractor(a),this.hC(init.classFieldsExtractor(a))]},"$1","ghA",2,0,0],
d_:function(a,b){throw H.c(new P.V((b==null?"Can't transmit:":b)+" "+H.b(a)))},
ho:function(a){return this.d_(a,null)},
hD:function(a){var z=this.hB(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d_(a,"Can't serialize indexable: ")},
hB:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.bf(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hC:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bf(a[z]))
return a},
hE:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d_(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.bf(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hG:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hF:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gea()]
return["raw sendport",a]}},
d_:{"^":"d;a,b",
bU:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.D("Bad serialized message: "+H.b(a)))
switch(C.a.gez(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.q(this.cL(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.q(this.cL(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cL(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.q(this.cL(x),[null])
y.fixed$length=Array
return y
case"map":return this.jw(a)
case"sendport":return this.jx(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jv(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.bc(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cL(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gju",2,0,0],
cL:function(a){var z,y,x
z=J.I(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.n(a,y,this.bU(z.j(a,y)));++y}return a},
jw:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aC()
this.b.push(w)
y=J.eK(y,this.gju()).cm(0)
for(z=J.I(y),v=J.I(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.bU(v.j(x,u)))}return w},
jx:function(a){var z,y,x,w,v,u,t
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
t=new H.cj(u,x)}else t=new H.eg(y,w,x)
this.b.push(t)
return t},
jv:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.j(y,u)]=this.bU(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
jX:function(){throw H.c(new P.V("Cannot modify unmodifiable Map"))},
ug:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.W(a))
return z},
aD:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bD:function(a){var z,y,x,w,v,u,t,s
z=J.p(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.K||!!J.p(a).$isbn){v=C.N(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cs(w,0)===36)w=C.b.bG(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d9(H.cn(a),0,null),init.mangledGlobalNames)},
cO:function(a){return"Instance of '"+H.bD(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dl(z,10))>>>0,56320|z&1023)}throw H.c(P.a6(a,0,1114111,null,null))},
bi:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mV:function(a){var z=H.bi(a).getFullYear()+0
return z},
mT:function(a){var z=H.bi(a).getMonth()+1
return z},
mP:function(a){var z=H.bi(a).getDate()+0
return z},
mQ:function(a){var z=H.bi(a).getHours()+0
return z},
mS:function(a){var z=H.bi(a).getMinutes()+0
return z},
mU:function(a){var z=H.bi(a).getSeconds()+0
return z},
mR:function(a){var z=H.bi(a).getMilliseconds()+0
return z},
dR:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.W(a))
return a[b]},
fA:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.W(a))
a[b]=c},
x:function(a){throw H.c(H.W(a))},
f:function(a,b){if(a==null)J.aK(a)
throw H.c(H.aH(a,b))},
aH:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b_(!0,b,"index",null)
z=J.aK(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cH(b,a,"index",null,z)
return P.c9(b,"index",null)},
W:function(a){return new P.b_(!0,a,null,null)},
d5:function(a){if(typeof a!=="number")throw H.c(H.W(a))
return a},
rr:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.W(a))
return a},
bt:function(a){if(typeof a!=="string")throw H.c(H.W(a))
return a},
c:function(a){var z
if(a==null)a=new P.cM()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iH})
z.name=""}else z.toString=H.iH
return z},
iH:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.C(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.vR(a)
if(a==null)return
if(a instanceof H.dp)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dl(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dw(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fp(v,null))}}if(a instanceof TypeError){u=$.$get$hf()
t=$.$get$hg()
s=$.$get$hh()
r=$.$get$hi()
q=$.$get$hm()
p=$.$get$hn()
o=$.$get$hk()
$.$get$hj()
n=$.$get$hp()
m=$.$get$ho()
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
if(v)return z.$1(new H.fp(y,l==null?null:l.method))}}return z.$1(new H.pj(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fX()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b_(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fX()
return a},
B:function(a){var z
if(a instanceof H.dp)return a.b
if(a==null)return new H.hE(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hE(a,null)},
ux:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aD(a)},
u_:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
ul:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ck(b,new H.um(a))
case 1:return H.ck(b,new H.un(a,d))
case 2:return H.ck(b,new H.uo(a,d,e))
case 3:return H.ck(b,new H.up(a,d,e,f))
case 4:return H.ck(b,new H.uq(a,d,e,f,g))}throw H.c(P.cD("Unsupported number of arguments for wrapped closure"))},
d7:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ul)
a.$identity=z
return z},
jT:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isL){z.$reflectionInfo=c
x=H.n5(z).r}else x=c
w=d?Object.create(new H.og().constructor.prototype):Object.create(new H.de(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aL
$.aL=J.am(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eW(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ug,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eR:H.df
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
jQ:function(a,b,c,d){var z=H.df
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eW:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jS(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jQ(y,!w,z,b)
if(y===0){w=$.aL
$.aL=J.am(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bx
if(v==null){v=H.cx("self")
$.bx=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aL
$.aL=J.am(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bx
if(v==null){v=H.cx("self")
$.bx=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jR:function(a,b,c,d){var z,y
z=H.df
y=H.eR
switch(b?-1:a){case 0:throw H.c(new H.ng("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jS:function(a,b){var z,y,x,w,v,u,t,s
z=H.jH()
y=$.eQ
if(y==null){y=H.cx("receiver")
$.eQ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jR(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aL
$.aL=J.am(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aL
$.aL=J.am(u,1)
return new Function(y+H.b(u)+"}")()},
ep:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jT(a,b,z,!!d,e,f)},
iv:function(a,b){var z=J.I(b)
throw H.c(H.cz(H.bD(a),z.aF(b,3,z.gm(b))))},
Q:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.p(a)[b]
else z=!0
if(z)return a
H.iv(a,b)},
uu:function(a,b){if(!!J.p(a).$isL||a==null)return a
if(J.p(a)[b])return a
H.iv(a,b)},
es:function(a){var z=J.p(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.es(a)
return z==null?!1:H.ew(z,b)},
i7:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.Z(b,null)
y=H.es(a)
throw H.c(H.cz(y!=null?H.Z(y,null):H.bD(a),z))},
vP:function(a){throw H.c(new P.k9(a))},
da:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b8:function(a){return new H.av(a,null)},
q:function(a,b){a.$ti=b
return a},
cn:function(a){if(a==null)return
return a.$ti},
ic:function(a,b){return H.eG(a["$as"+H.b(b)],H.cn(a))},
y:function(a,b,c){var z=H.ic(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cn(a)
return z==null?null:z[b]},
Z:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d9(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Z(z,b)
return H.rb(a,b)}return"unknown-reified-type"},
rb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Z(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Z(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Z(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tZ(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Z(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d9:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bK("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.B=v+", "
u=a[y]
if(u!=null)w=!1
v=z.B+=H.Z(u,c)}return w?"":"<"+z.k(0)+">"},
id:function(a){var z,y
if(a instanceof H.a){z=H.es(a)
if(z!=null)return H.Z(z,null)}y=J.p(a).constructor.builtin$cls
if(a==null)return y
return y+H.d9(a.$ti,0,null)},
eG:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aQ:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cn(a)
y=J.p(a)
if(y[b]==null)return!1
return H.hW(H.eG(y[d],z),c)},
aJ:function(a,b,c,d){if(a==null)return a
if(H.aQ(a,b,c,d))return a
throw H.c(H.cz(H.bD(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d9(c,0,null),init.mangledGlobalNames)))},
hW:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.al(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return a.apply(b,H.ic(b,c))},
d6:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cn(a)
a=J.p(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ew(x.apply(a,null),b)}return H.al(y,b)},
iE:function(a,b){if(a!=null&&!H.d6(a,b))throw H.c(H.cz(H.bD(a),H.Z(b,null)))
return a},
al:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.ew(a,b)
if('func' in a)return b.builtin$cls==="bz"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.Z(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hW(H.eG(u,z),x)},
hV:function(a,b,c){var z,y,x,w,v
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
rl:function(a,b){var z,y,x,w,v,u
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
ew:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hV(x,w,!1))return!1
if(!H.hV(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}}return H.rl(a.named,b.named)},
vK:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.p(b)
if(!!z.$isdu){z=C.b.bG(a,c)
return b.b.test(z)}else{z=z.es(b,C.b.bG(a,c))
return!z.gT(z)}}},
vM:function(a,b,c,d){var z,y,x
z=b.ff(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eF(a,x,x+y[0].length,c)},
o:function(a,b,c){var z,y,x
H.bt(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
wv:[function(a){return a},"$1","hI",2,0,23],
vL:function(a,b,c,d){var z,y,x,w,v,u
z=J.p(b)
if(!z.$isdO)throw H.c(P.cu(b,"pattern","is not a Pattern"))
for(z=z.es(b,a),z=new H.hu(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hI().$1(C.b.aF(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hI().$1(C.b.bG(a,y)))
return z.charCodeAt(0)==0?z:z},
iD:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eF(a,z,z+b.length,c)}y=J.p(b)
if(!!y.$isdu)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.vM(a,b,c,d)
if(b==null)H.i(H.W(b))
y=y.dq(b,a,d)
x=y.gX(y)
if(!x.t())return a
w=x.gG()
y=w.gf0()
v=w.gfR()
H.bt(c)
u=P.ca(y,v,a.length,null,null,null)
H.rr(u)
return H.eF(a,y,u,c)},
eF:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jW:{"^":"d;$ti",
gT:function(a){return this.gm(this)===0},
gaq:function(a){return this.gm(this)!==0},
k:function(a){return P.dG(this)},
n:function(a,b,c){return H.jX()},
$isG:1},
jY:{"^":"jW;a,b,c,$ti",
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
n4:{"^":"d;a,b,c,d,e,f,r,x",v:{
n5:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.n4(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pg:{"^":"d;a,b,c,d,e,f",
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
return new H.pg(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cY:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hl:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fp:{"^":"a5;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lF:{"^":"a5;a,b,c",
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
return new H.lF(a,y,z?null:b.receiver)}}},
pj:{"^":"a5;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dp:{"^":"d;a,bg:b<"},
vR:{"^":"a:0;a",
$1:function(a){if(!!J.p(a).$isa5)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hE:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
um:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
un:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
uo:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
up:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uq:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bD(this).trim()+"'"},
ghw:function(){return this},
$isbz:1,
ghw:function(){return this}},
hb:{"^":"a;"},
og:{"^":"hb;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
de:{"^":"hb;a,b,c,d",
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
eR:function(a){return a.c},
jH:function(){var z=$.bx
if(z==null){z=H.cx("self")
$.bx=z}return z},
cx:function(a){var z,y,x,w,v
z=new H.de("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jM:{"^":"a5;a",
k:function(a){return this.a},
v:{
cz:function(a,b){return new H.jM("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ng:{"^":"a5;a",
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
return b instanceof H.av&&J.e(this.a,b.a)}},
S:{"^":"d;a,b,c,d,e,f,r,$ti",
gm:function(a){return this.a},
gT:function(a){return this.a===0},
gaq:function(a){return!this.gT(this)},
gcc:function(){return new H.lW(this,[H.m(this,0)])},
gcn:function(){return H.bA(this.gcc(),new H.lE(this),H.m(this,0),H.m(this,1))},
a6:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fb(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fb(y,a)}else return this.jY(a)},
jY:function(a){var z=this.d
if(z==null)return!1
return this.cO(this.dh(z,this.cN(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cv(z,b)
return y==null?null:y.gbW()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cv(x,b)
return y==null?null:y.gbW()}else return this.jZ(b)},
jZ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dh(z,this.cN(a))
x=this.cO(y,a)
if(x<0)return
return y[x].gbW()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ec()
this.b=z}this.f5(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ec()
this.c=y}this.f5(y,b,c)}else this.k0(b,c)},
k0:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ec()
this.d=z}y=this.cN(a)
x=this.dh(z,y)
if(x==null)this.en(z,y,[this.ed(a,b)])
else{w=this.cO(x,a)
if(w>=0)x[w].sbW(b)
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
y=this.dh(z,this.cN(a))
x=this.cO(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fA(w)
return w.gbW()},
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
f5:function(a,b,c){var z=this.cv(a,b)
if(z==null)this.en(a,b,this.ed(b,c))
else z.sbW(c)},
fv:function(a,b){var z
if(a==null)return
z=this.cv(a,b)
if(z==null)return
this.fA(z)
this.fc(a,b)
return z.gbW()},
ed:function(a,b){var z,y
z=new H.lV(a,b,null,null,[null,null])
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
cN:function(a){return J.j(a)&0x3ffffff},
cO:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfY(),b))return y
return-1},
k:function(a){return P.dG(this)},
cv:function(a,b){return a[b]},
dh:function(a,b){return a[b]},
en:function(a,b,c){a[b]=c},
fc:function(a,b){delete a[b]},
fb:function(a,b){return this.cv(a,b)!=null},
ec:function(){var z=Object.create(null)
this.en(z,"<non-identifier-key>",z)
this.fc(z,"<non-identifier-key>")
return z},
$isls:1,
$isG:1,
v:{
fd:function(a,b){return new H.S(0,null,null,null,null,null,0,[a,b])}}},
lE:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
lV:{"^":"d;fY:a<,bW:b@,c,iI:d<,$ti"},
lW:{"^":"a_;a,$ti",
gm:function(a){return this.a.a},
gT:function(a){return this.a.a===0},
gX:function(a){var z,y
z=this.a
y=new H.lX(z,z.r,null,null,this.$ti)
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
lX:{"^":"d;a,b,c,d,$ti",
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
dq:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.pS(this,b,c)},
es:function(a,b){return this.dq(a,b,0)},
ff:function(a,b){var z,y
z=this.giE()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hD(this,y)},
io:function(a,b){var z,y
z=this.giD()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hD(this,y)},
h1:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return this.io(b,c)},
$isdO:1,
v:{
dv:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f2("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hD:{"^":"d;a,b",
gf0:function(){return this.b.index},
gfR:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbh:1},
pS:{"^":"c2;a,b,c",
gX:function(a){return new H.hu(this.a,this.b,this.c,null)},
$asc2:function(){return[P.bh]},
$asw:function(){return[P.bh]}},
hu:{"^":"d;a,b,c,d",
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
h2:{"^":"d;f0:a<,b,c",
gfR:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.c9(b,null,null))
return this.c},
$isbh:1},
qQ:{"^":"w;a,b,c",
gX:function(a){return new H.qR(this.a,this.b,this.c,null)},
$asw:function(){return[P.bh]}},
qR:{"^":"d;a,b,c,d",
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
tZ:function(a){var z=H.q(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uE:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pT:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rm()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d7(new P.pV(z),1)).observe(y,{childList:true})
return new P.pU(z,y,x)}else if(self.setImmediate!=null)return P.rn()
return P.ro()},
wp:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d7(new P.pW(a),0))},"$1","rm",2,0,14],
wq:[function(a){++init.globalState.f.b
self.setImmediate(H.d7(new P.pX(a),0))},"$1","rn",2,0,14],
wr:[function(a){P.e3(C.x,a)},"$1","ro",2,0,14],
aG:function(a,b){P.eh(null,a)
return b.gfV()},
aw:function(a,b){P.eh(a,b)},
aF:function(a,b){b.bT(a)},
aE:function(a,b){b.ew(H.A(a),H.B(a))},
eh:function(a,b){var z,y,x,w
z=new P.r0(b)
y=new P.r1(b)
x=J.p(a)
if(!!x.$isF)a.eo(z,y)
else if(!!x.$isR)a.eQ(z,y)
else{w=new P.F(0,$.r,null,[null])
w.a=4
w.c=a
w.eo(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rk(z)},
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
P.cp(new P.qZ(b,c))
return}else if(z===1){x=a.a
c.a.jf(x,!1).c_(new P.r_(b,c))
return}}P.eh(a,b)},
rj:function(a){return a.gdU()},
em:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aB:function(a){return new P.qS(new P.F(0,$.r,null,[a]),[a])},
r9:function(a,b,c){$.r.toString
a.ba(b,c)},
rd:function(){var z,y
for(;z=$.bq,z!=null;){$.bP=null
y=z.gcf()
$.bq=y
if(y==null)$.bO=null
z.gjh().$0()}},
wu:[function(){$.ei=!0
try{P.rd()}finally{$.bP=null
$.ei=!1
if($.bq!=null)$.$get$e7().$1(P.hX())}},"$0","hX",0,0,6],
hR:function(a){var z=new P.hv(a,null)
if($.bq==null){$.bO=z
$.bq=z
if(!$.ei)$.$get$e7().$1(P.hX())}else{$.bO.b=z
$.bO=z}},
ri:function(a){var z,y,x
z=$.bq
if(z==null){P.hR(a)
$.bP=$.bO
return}y=new P.hv(a,null)
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
wm:function(a,b){return new P.qP(null,a,!1,[b])},
en:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.A(x)
y=H.B(x)
w=$.r
w.toString
P.br(null,null,w,z,y)}},
re:[function(a,b){var z=$.r
z.toString
P.br(null,null,z,a,b)},function(a){return P.re(a,null)},"$2","$1","rq",2,2,15,0],
wt:[function(){},"$0","rp",0,0,6],
hQ:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.A(u)
y=H.B(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbk()
w=t
v=x.gbg()
c.$2(w,v)}}},
r2:function(a,b,c,d){var z=a.c9()
if(!!J.p(z).$isR&&z!==$.$get$be())z.c1(new P.r4(b,c,d))
else b.ba(c,d)},
hF:function(a,b){return new P.r3(a,b)},
hG:function(a,b,c){var z=a.c9()
if(!!J.p(z).$isR&&z!==$.$get$be())z.c1(new P.r5(b,c))
else b.b9(c)},
qY:function(a,b,c){$.r.toString
a.c6(b,c)},
pf:function(a,b){var z=$.r
if(z===C.h){z.toString
return P.e3(a,b)}return P.e3(a,z.eu(b,!0))},
e3:function(a,b){var z=C.e.bI(a.a,1000)
return H.pc(z<0?0:z,b)},
pt:function(){return $.r},
br:function(a,b,c,d,e){var z={}
z.a=d
P.ri(new P.rg(z,e))},
hN:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
hP:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
hO:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bs:function(a,b,c,d){var z=C.h!==c
if(z)d=c.eu(d,!(!z||!1))
P.hR(d)},
pV:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pU:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pW:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pX:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
r0:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
r1:{"^":"a:20;a",
$2:function(a,b){this.a.$2(1,new H.dp(a,b))}},
rk:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
qZ:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcP()){z.b=!0
return}this.a.$2(null,0)}},
r_:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pY:{"^":"d;a,b,c",
gdU:function(){return this.a.gdU()},
gcP:function(){return this.a.gcP()},
geC:function(){return this.c!=null},
q:function(a,b){return J.aS(this.a,b)},
eq:function(a,b){return this.a.eq(a,b)},
bj:function(){return this.a.bj()},
i1:function(a){var z=new P.q0(a)
this.a=new P.q5(null,0,null,new P.q2(z),null,new P.q3(this,z),new P.q4(this,a),[null])},
v:{
pZ:function(a){var z=new P.pY(null,!1,null)
z.i1(a)
return z}}},
q0:{"^":"a:1;a",
$0:function(){P.cp(new P.q1(this.a))}},
q1:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
q2:{"^":"a:1;a",
$0:function(){this.a.$0()}},
q3:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
q4:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gk9()){z.c=new P.cg(new P.F(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cp(new P.q_(this.b))}return z.c.gfV()}}},
q_:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bL:{"^":"d;aa:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bM:function(a){return new P.bL(a,1)},
aN:function(){return C.ac},
hA:function(a){return new P.bL(a,0)},
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
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.an(z)
if(!!w.$isb6){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qT:{"^":"c2;a",
gX:function(a){return new P.b6(this.a(),null,null,null)},
$asc2:I.b9,
$asw:I.b9,
v:{
aP:function(a){return new P.qT(a)}}},
R:{"^":"d;$ti"},
hx:{"^":"d;fV:a<,$ti",
ew:function(a,b){if(a==null)a=new P.cM()
if(this.a.a!==0)throw H.c(new P.z("Future already completed"))
$.r.toString
this.ba(a,b)},
dt:function(a){return this.ew(a,null)}},
cg:{"^":"hx;a,$ti",
bT:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.z("Future already completed"))
z.by(a)},
ev:function(){return this.bT(null)},
ba:function(a,b){this.a.f7(a,b)}},
qS:{"^":"hx;a,$ti",
bT:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.z("Future already completed"))
z.b9(a)},
ev:function(){return this.bT(null)},
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
F:{"^":"d;cD:a<,b,iN:c<,$ti",
giy:function(){return this.a===2},
geb:function(){return this.a>=4},
eQ:function(a,b){var z=$.r
if(z!==C.h){z.toString
if(b!=null)b=P.em(b,z)}return this.eo(a,b)},
c_:function(a){return this.eQ(a,null)},
eo:function(a,b){var z,y
z=new P.F(0,$.r,null,[null])
y=b==null?1:3
this.dc(new P.ec(null,z,y,a,b,[H.m(this,0),null]))
return z},
c1:function(a){var z,y
z=$.r
y=new P.F(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.dc(new P.ec(null,y,8,a,null,[z,z]))
return y},
dc:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.geb()){y.dc(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bs(null,null,z,new P.qf(this,a))}},
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
this.c=v.c}z.a=this.dj(a)
y=this.b
y.toString
P.bs(null,null,y,new P.qm(z,this))}},
di:function(){var z=this.c
this.c=null
return this.dj(z)},
dj:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gef()
z.a=y}return y},
b9:function(a){var z,y
z=this.$ti
if(H.aQ(a,"$isR",z,"$asR"))if(H.aQ(a,"$isF",z,null))P.d0(a,this)
else P.hz(a,this)
else{y=this.di()
this.a=4
this.c=a
P.bo(this,y)}},
ba:[function(a,b){var z=this.di()
this.a=8
this.c=new P.cv(a,b)
P.bo(this,z)},function(a){return this.ba(a,null)},"l0","$2","$1","gbP",2,2,15,0],
by:function(a){var z
if(H.aQ(a,"$isR",this.$ti,"$asR")){this.ib(a)
return}this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qh(this,a))},
ib:function(a){var z
if(H.aQ(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.ql(this,a))}else P.d0(a,this)
return}P.hz(a,this)},
f7:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bs(null,null,z,new P.qg(this,a,b))},
i3:function(a,b){this.a=4
this.c=a},
$isR:1,
v:{
hz:function(a,b){var z,y,x
b.a=1
try{a.eQ(new P.qi(b),new P.qj(b))}catch(x){z=H.A(x)
y=H.B(x)
P.cp(new P.qk(b,z,y))}},
d0:function(a,b){var z,y,x
for(;a.giy();)a=a.c
z=a.geb()
y=b.c
if(z){b.c=null
x=b.dj(y)
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
if(b.gfW())new P.qp(z,x,w,b).$0()
else if(y){if(b.gfX())new P.qo(x,b,r).$0()}else if(b.gjQ())new P.qn(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.p(y).$isR){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dj(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d0(y,o)
return}}o=b.b
b=o.di()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qf:{"^":"a:1;a,b",
$0:function(){P.bo(this.a,this.b)}},
qm:{"^":"a:1;a,b",
$0:function(){P.bo(this.b,this.a.a)}},
qi:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b9(a)}},
qj:{"^":"a:50;a",
$2:function(a,b){this.a.ba(a,b)},
$1:function(a){return this.$2(a,null)}},
qk:{"^":"a:1;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
qh:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.di()
z.a=4
z.c=this.b
P.bo(z,y)}},
ql:{"^":"a:1;a,b",
$0:function(){P.d0(this.b,this.a)}},
qg:{"^":"a:1;a,b,c",
$0:function(){this.a.ba(this.b,this.c)}},
qp:{"^":"a:6;a,b,c,d",
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
return}if(!!J.p(z).$isR){if(z instanceof P.F&&z.gcD()>=4){if(z.gcD()===8){v=this.b
v.b=z.giN()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c_(new P.qq(t))
v.a=!1}}},
qq:{"^":"a:0;a",
$1:function(a){return this.a}},
qo:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jO(this.c)}catch(x){z=H.A(x)
y=H.B(x)
w=this.a
w.b=new P.cv(z,y)
w.a=!0}}},
qn:{"^":"a:6;a,b,c",
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
hv:{"^":"d;jh:a<,cf:b@"},
ai:{"^":"d;$ti",
aO:function(a,b){return new P.qE(b,this,[H.y(this,"ai",0),null])},
a3:function(a,b){var z,y
z={}
y=new P.F(0,$.r,null,[P.a3])
z.a=null
z.a=this.aD(new P.or(z,this,b,y),!0,new P.os(y),y.gbP())
return y},
U:function(a,b){var z,y
z={}
y=new P.F(0,$.r,null,[null])
z.a=null
z.a=this.aD(new P.ov(z,this,b,y),!0,new P.ow(y),y.gbP())
return y},
gm:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[P.u])
z.a=0
this.aD(new P.oB(z),!0,new P.oC(z,y),y.gbP())
return y},
gT:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[P.a3])
z.a=null
z.a=this.aD(new P.ox(z,y),!0,new P.oy(y),y.gbP())
return y},
cm:function(a){var z,y,x
z=H.y(this,"ai",0)
y=H.q([],[z])
x=new P.F(0,$.r,null,[[P.L,z]])
this.aD(new P.oD(this,y),!0,new P.oE(y,x),x.gbP())
return x},
bE:function(a){var z,y,x
z=H.y(this,"ai",0)
y=P.a0(null,null,null,z)
x=new P.F(0,$.r,null,[[P.bF,z]])
this.aD(new P.oF(this,y),!0,new P.oG(y,x),x.gbP())
return x},
gA:function(a){var z,y
z={}
y=new P.F(0,$.r,null,[H.y(this,"ai",0)])
z.a=null
z.b=!1
this.aD(new P.oz(z,this),!0,new P.oA(z,y),y.gbP())
return y}},
or:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hQ(new P.op(this.c,a),new P.oq(z,y),P.hF(z.a,y))},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ai")}},
op:{"^":"a:1;a,b",
$0:function(){return J.e(this.b,this.a)}},
oq:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hG(this.a.a,this.b,!0)}},
os:{"^":"a:1;a",
$0:function(){this.a.b9(!1)}},
ov:{"^":"a;a,b,c,d",
$1:function(a){P.hQ(new P.ot(this.c,a),new P.ou(),P.hF(this.a.a,this.d))},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ai")}},
ot:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ou:{"^":"a:0;",
$1:function(a){}},
ow:{"^":"a:1;a",
$0:function(){this.a.b9(null)}},
oB:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oC:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a.a)}},
ox:{"^":"a:0;a,b",
$1:function(a){P.hG(this.a.a,this.b,!1)}},
oy:{"^":"a:1;a",
$0:function(){this.a.b9(!0)}},
oD:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"ai")}},
oE:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a)}},
oF:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"ai")}},
oG:{"^":"a:1;a,b",
$0:function(){this.b.b9(this.a)}},
oz:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"ai")}},
oA:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b9(x.a)
return}try{x=H.af()
throw H.c(x)}catch(w){z=H.A(w)
y=H.B(w)
P.r9(this.b,z,y)}}},
d1:{"^":"d;cD:b<,$ti",
gdU:function(){return new P.cZ(this,this.$ti)},
gk9:function(){return(this.b&4)!==0},
gcP:function(){var z=this.b
return(z&1)!==0?this.gbH().gfm():(z&2)===0},
giG:function(){if((this.b&8)===0)return this.a
return this.a.gd1()},
e4:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ef(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd1()==null)y.c=new P.ef(null,null,0,this.$ti)
return y.c},
gbH:function(){if((this.b&8)!==0)return this.a.gd1()
return this.a},
cr:function(){if((this.b&4)!==0)return new P.z("Cannot add event after closing")
return new P.z("Cannot add event while adding a stream")},
jf:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cr())
if((z&2)!==0){z=new P.F(0,$.r,null,[null])
z.by(null)
return z}z=this.a
y=new P.F(0,$.r,null,[null])
x=a.aD(this.gi9(),!1,this.gia(),this.gi6())
w=this.b
if((w&1)!==0?this.gbH().gfm():(w&2)===0)x.cS()
this.a=new P.qL(z,y,x,this.$ti)
this.b|=8
return y},
fe:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$be():new P.F(0,$.r,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cr())
this.bO(b)},"$1","gj1",2,0,function(){return H.b7(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d1")}],
eq:function(a,b){if(this.b>=4)throw H.c(this.cr())
if(a==null)a=new P.cM()
$.r.toString
this.c6(a,b)},
bj:function(){var z=this.b
if((z&4)!==0)return this.fe()
if(z>=4)throw H.c(this.cr())
z|=4
this.b=z
if((z&1)!==0)this.cB()
else if((z&3)===0)this.e4().q(0,C.u)
return this.fe()},
bO:[function(a){var z=this.b
if((z&1)!==0)this.cA(a)
else if((z&3)===0)this.e4().q(0,new P.e8(a,null,this.$ti))},"$1","gi9",2,0,function(){return H.b7(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d1")}],
c6:[function(a,b){var z=this.b
if((z&1)!==0)this.cC(a,b)
else if((z&3)===0)this.e4().q(0,new P.e9(a,b,null))},"$2","gi6",4,0,49],
dZ:[function(){var z=this.a
this.a=z.gd1()
this.b&=4294967287
z.a.by(null)},"$0","gia",0,0,6],
iU:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.z("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.q9(this,null,null,null,z,y,null,null,this.$ti)
x.f4(a,b,c,d,H.m(this,0))
w=this.giG()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd1(x)
v.b.cX()}else this.a=x
x.iS(w)
x.e9(new P.qN(this))
return x},
iK:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c9()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.A(v)
x=H.B(v)
u=new P.F(0,$.r,null,[null])
u.f7(y,x)
z=u}else z=z.c1(w)
w=new P.qM(this)
if(z!=null)z=z.c1(w)
else w.$0()
return z}},
qN:{"^":"a:1;a",
$0:function(){P.en(this.a.d)}},
qM:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.by(null)}},
qV:{"^":"d;$ti",
cA:function(a){this.gbH().bO(a)},
cC:function(a,b){this.gbH().c6(a,b)},
cB:function(){this.gbH().dZ()}},
q6:{"^":"d;$ti",
cA:function(a){this.gbH().c7(new P.e8(a,null,[H.m(this,0)]))},
cC:function(a,b){this.gbH().c7(new P.e9(a,b,null))},
cB:function(){this.gbH().c7(C.u)}},
q5:{"^":"d1+q6;a,b,c,d,e,f,r,$ti"},
qU:{"^":"d1+qV;a,b,c,d,e,f,r,$ti"},
cZ:{"^":"qO;a,$ti",
gw:function(a){return(H.aD(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cZ))return!1
return b.a===this.a}},
q9:{"^":"ch;x,a,b,c,d,e,f,r,$ti",
eg:function(){return this.x.iK(this)},
ei:[function(){var z=this.x
if((z.b&8)!==0)z.a.cS()
P.en(z.e)},"$0","geh",0,0,6],
ek:[function(){var z=this.x
if((z.b&8)!==0)z.a.cX()
P.en(z.f)},"$0","gej",0,0,6]},
pQ:{"^":"d;$ti",
cS:function(){this.b.cS()},
cX:function(){this.b.cX()},
c9:function(){var z=this.b.c9()
if(z==null){this.a.by(null)
return}return z.c1(new P.pR(this))},
ev:function(){this.a.by(null)}},
pR:{"^":"a:1;a",
$0:function(){this.a.a.by(null)}},
qL:{"^":"pQ;d1:c@,a,b,$ti"},
ch:{"^":"d;cD:e<,$ti",
iS:function(a){if(a==null)return
this.r=a
if(!a.gT(a)){this.e=(this.e|64)>>>0
this.r.d5(this)}},
kp:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fJ()
if((z&4)===0&&(this.e&32)===0)this.e9(this.geh())},
cS:function(){return this.kp(null)},
cX:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gT(z)}else z=!1
if(z)this.r.d5(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e9(this.gej())}}}},
c9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e_()
z=this.f
return z==null?$.$get$be():z},
gfm:function(){return(this.e&4)!==0},
gcP:function(){return this.e>=128},
e_:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fJ()
if((this.e&32)===0)this.r=null
this.f=this.eg()},
bO:["hQ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cA(a)
else this.c7(new P.e8(a,null,[H.y(this,"ch",0)]))}],
c6:["hR",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cC(a,b)
else this.c7(new P.e9(a,b,null))}],
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
if(z==null){z=new P.ef(null,null,0,[H.y(this,"ch",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d5(this)}},
cA:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hm(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
cC:function(a,b){var z,y
z=this.e
y=new P.q8(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e_()
z=this.f
if(!!J.p(z).$isR&&z!==$.$get$be())z.c1(y)
else y.$0()}else{y.$0()
this.e1((z&4)!==0)}},
cB:function(){var z,y
z=new P.q7(this)
this.e_()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isR&&y!==$.$get$be())y.c1(z)
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
if((z&64)!==0&&z<128)this.r.d5(this)},
f4:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.em(b==null?P.rq():b,z)
this.c=c==null?P.rp():c}},
q8:{"^":"a:6;a,b,c",
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
q7:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hk(z.c)
z.e=(z.e&4294967263)>>>0}},
qO:{"^":"ai;$ti",
aD:function(a,b,c,d){return this.a.iU(a,d,c,!0===b)},
eJ:function(a,b,c){return this.aD(a,null,b,c)}},
ea:{"^":"d;cf:a@,$ti"},
e8:{"^":"ea;aa:b<,a,$ti",
eL:function(a){a.cA(this.b)}},
e9:{"^":"ea;bk:b<,bg:c<,a",
eL:function(a){a.cC(this.b,this.c)},
$asea:I.b9},
qa:{"^":"d;",
eL:function(a){a.cB()},
gcf:function(){return},
scf:function(a){throw H.c(new P.z("No events after a done."))}},
qG:{"^":"d;cD:a<,$ti",
d5:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cp(new P.qH(this,a))
this.a=1},
fJ:function(){if(this.a===1)this.a=3}},
qH:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcf()
z.b=w
if(w==null)z.c=null
x.eL(this.b)}},
ef:{"^":"qG;b,c,a,$ti",
gT:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scf(b)
this.c=b}}},
qP:{"^":"d;a,b,c,$ti"},
r4:{"^":"a:1;a,b,c",
$0:function(){return this.a.ba(this.b,this.c)}},
r3:{"^":"a:20;a,b",
$2:function(a,b){P.r2(this.a,this.b,a,b)}},
r5:{"^":"a:1;a,b",
$0:function(){return this.a.b9(this.b)}},
eb:{"^":"ai;$ti",
aD:function(a,b,c,d){return this.ik(a,d,c,!0===b)},
eJ:function(a,b,c){return this.aD(a,null,b,c)},
ik:function(a,b,c,d){return P.qe(this,a,b,c,d,H.y(this,"eb",0),H.y(this,"eb",1))},
fj:function(a,b){b.bO(a)},
iw:function(a,b,c){c.c6(a,b)},
$asai:function(a,b){return[b]}},
hy:{"^":"ch;x,y,a,b,c,d,e,f,r,$ti",
bO:function(a){if((this.e&2)!==0)return
this.hQ(a)},
c6:function(a,b){if((this.e&2)!==0)return
this.hR(a,b)},
ei:[function(){var z=this.y
if(z==null)return
z.cS()},"$0","geh",0,0,6],
ek:[function(){var z=this.y
if(z==null)return
z.cX()},"$0","gej",0,0,6],
eg:function(){var z=this.y
if(z!=null){this.y=null
return z.c9()}return},
l2:[function(a){this.x.fj(a,this)},"$1","git",2,0,function(){return H.b7(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hy")}],
l4:[function(a,b){this.x.iw(a,b,this)},"$2","giv",4,0,46],
l3:[function(){this.dZ()},"$0","giu",0,0,6],
i2:function(a,b,c,d,e,f,g){this.y=this.x.a.eJ(this.git(),this.giu(),this.giv())},
$asch:function(a,b){return[b]},
v:{
qe:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hy(a,null,null,null,null,z,y,null,null,[f,g])
y.f4(b,c,d,e,g)
y.i2(a,b,c,d,e,f,g)
return y}}},
qE:{"^":"eb;b,a,$ti",
fj:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.A(w)
x=H.B(w)
P.qY(b,y,x)
return}b.bO(z)}},
cv:{"^":"d;bk:a<,bg:b<",
k:function(a){return H.b(this.a)},
$isa5:1},
qX:{"^":"d;"},
rg:{"^":"a:1;a,b",
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
qI:{"^":"qX;",
hk:function(a){var z,y,x,w
try{if(C.h===$.r){x=a.$0()
return x}x=P.hN(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.br(null,null,this,z,y)
return x}},
hm:function(a,b){var z,y,x,w
try{if(C.h===$.r){x=a.$1(b)
return x}x=P.hP(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.br(null,null,this,z,y)
return x}},
kI:function(a,b,c){var z,y,x,w
try{if(C.h===$.r){x=a.$2(b,c)
return x}x=P.hO(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.B(w)
x=P.br(null,null,this,z,y)
return x}},
eu:function(a,b){if(b)return new P.qJ(this,a)
else return new P.qK(this,a)},
j:function(a,b){return},
hj:function(a){if($.r===C.h)return a.$0()
return P.hN(null,null,this,a)},
eP:function(a,b){if($.r===C.h)return a.$1(b)
return P.hP(null,null,this,a,b)},
kH:function(a,b,c){if($.r===C.h)return a.$2(b,c)
return P.hO(null,null,this,a,b,c)}},
qJ:{"^":"a:1;a,b",
$0:function(){return this.a.hk(this.b)}},
qK:{"^":"a:1;a,b",
$0:function(){return this.a.hj(this.b)}}}],["","",,P,{"^":"",
dB:function(a,b){return new H.S(0,null,null,null,null,null,0,[a,b])},
aC:function(){return new H.S(0,null,null,null,null,null,0,[null,null])},
ab:function(a){return H.u_(a,new H.S(0,null,null,null,null,null,0,[null,null]))},
lC:function(a,b,c){var z,y
if(P.ej(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bQ()
y.push(a)
try{P.rc(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h1(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c3:function(a,b,c){var z,y,x
if(P.ej(a))return b+"..."+c
z=new P.bK(b)
y=$.$get$bQ()
y.push(a)
try{x=z
x.B=P.h1(x.gB(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.B=y.gB()+c
y=z.gB()
return y.charCodeAt(0)==0?y:y},
ej:function(a){var z,y
for(z=0;y=$.$get$bQ(),z<y.length;++z)if(a===y[z])return!0
return!1},
rc:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gX(a)
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
lY:function(a,b,c,d,e){return new H.S(0,null,null,null,null,null,0,[d,e])},
c7:function(a,b,c){var z=P.lY(null,null,null,b,c)
a.U(0,new P.rs(z))
return z},
a0:function(a,b,c,d){return new P.hB(0,null,null,null,null,null,0,[d])},
b1:function(a,b){var z,y
z=P.a0(null,null,null,b)
for(y=J.an(a);y.t();)z.q(0,y.gG())
return z},
dG:function(a){var z,y,x
z={}
if(P.ej(a))return"{...}"
y=new P.bK("")
try{$.$get$bQ().push(a)
x=y
x.B=x.gB()+"{"
z.a=!0
a.U(0,new P.m8(z,y))
z=y
z.B=z.gB()+"}"}finally{z=$.$get$bQ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gB()
return z.charCodeAt(0)==0?z:z},
hC:{"^":"S;a,b,c,d,e,f,r,$ti",
cN:function(a){return H.ux(a)&0x3ffffff},
cO:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfY()
if(x==null?b==null:x===b)return y}return-1},
v:{
bN:function(a,b){return new P.hC(0,null,null,null,null,null,0,[a,b])}}},
hB:{"^":"qr;a,b,c,d,e,f,r,$ti",
ee:function(){return new P.hB(0,null,null,null,null,null,0,this.$ti)},
gX:function(a){var z=new P.aj(this,this.r,null,null,[null])
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
return this.df(z[this.de(a)],a)>=0},
ce:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a3(0,a)?a:null
else return this.iA(a)},
iA:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.de(a)]
x=this.df(y,a)
if(x<0)return
return J.aA(y,x).gfd()},
U:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.C(this))
z=z.b}},
gA:function(a){var z=this.f
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
if(z==null){z=P.qA()
this.d=z}y=this.de(a)
x=z[y]
if(x==null)z[y]=[this.e2(a)]
else{if(this.df(x,a)>=0)return!1
x.push(this.e2(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.f9(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f9(this.c,b)
else return this.iL(b)},
iL:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.de(a)]
x=this.df(y,a)
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
z=new P.qz(a,null,null)
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
de:function(a){return J.j(a)&0x3ffffff},
df:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfd(),b))return y
return-1},
$isbF:1,
$isa_:1,
$isw:1,
v:{
qA:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qz:{"^":"d;fd:a<,b,ih:c<"},
aj:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qr:{"^":"nM;$ti",
bE:function(a){var z=this.ee()
z.ar(0,this)
return z}},
c2:{"^":"w;$ti"},
rs:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
fh:{"^":"fq;$ti"},
fq:{"^":"d+b2;$ti",$asL:null,$asa_:null,$asw:null,$isL:1,$isa_:1,$isw:1},
b2:{"^":"d;$ti",
gX:function(a){return new H.dC(this,this.gm(this),0,null,[H.y(this,"b2",0)])},
as:function(a,b){return this.j(0,b)},
U:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gm(this))throw H.c(new P.C(this))}},
gT:function(a){return this.gm(this)===0},
gaq:function(a){return!this.gT(this)},
gA:function(a){if(this.gm(this)===0)throw H.c(H.af())
return this.j(0,this.gm(this)-1)},
a3:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<this.gm(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bS:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gm(this))throw H.c(new P.C(this))}return!1},
bc:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.C(this))}return c.$0()},
aO:function(a,b){return new H.ap(this,b,[H.y(this,"b2",0),null])},
dT:function(a,b){return H.h3(this,b,null,H.y(this,"b2",0))},
bE:function(a){var z,y
z=P.a0(null,null,null,H.y(this,"b2",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gm(this)
this.sm(0,z+1)
this.n(0,z,b)},
a9:function(a,b){var z
for(z=0;z<this.gm(this);++z)if(J.e(this.j(0,z),b)){this.aW(0,z,this.gm(this)-1,this,z+1)
this.sm(0,this.gm(this)-1)
return!0}return!1},
ip:function(a,b){var z,y,x,w
z=H.q([],[H.y(this,"b2",0)])
y=this.gm(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gm(this))throw H.c(new P.C(this))}if(z.length!==this.gm(this)){this.hI(0,0,z.length,z)
this.sm(0,z.length)}},
aW:function(a,b,c,d,e){var z,y,x,w,v
P.ca(b,c,this.gm(this),null,null,null)
z=c-b
if(z===0)return
if(H.aQ(d,"$isL",[H.y(this,"b2",0)],"$asL")){y=e
x=d}else{x=J.iV(d,e).bD(0,!1)
y=0}w=J.I(x)
if(y+z>w.gm(x))throw H.c(H.f5())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hI:function(a,b,c,d){return this.aW(a,b,c,d,0)},
bM:function(a,b,c){var z
if(c>=this.gm(this))return-1
for(z=c;z<this.gm(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aU:function(a,b){return this.bM(a,b,0)},
k:function(a){return P.c3(this,"[","]")},
$isL:1,
$isa_:1,
$isw:1},
qW:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.V("Cannot modify unmodifiable map"))},
$isG:1},
m6:{"^":"d;$ti",
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
ht:{"^":"m6+qW;a,$ti",$asG:null,$isG:1},
m8:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.B+=", "
z.a=!1
z=this.b
y=z.B+=H.b(a)
z.B=y+": "
z.B+=H.b(b)}},
lZ:{"^":"aV;a,b,c,d,$ti",
gX:function(a){return new P.ee(this,this.c,this.d,this.b,null,this.$ti)},
U:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.C(this))}},
gT:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gA:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.af())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
as:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cH(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.aA(b)},
ar:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aQ(b,"$isL",z,"$asL")){y=b.gm(b)
x=this.gm(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.m_(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.q(v,z)
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
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c3(this,"{","}")},
fG:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fi();++this.d},
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
aA:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fi();++this.d},
fi:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.q(z,this.$ti)
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
this.a=H.q(z,[b])},
v:{
b3:function(a,b){var z=new P.lZ(null,0,0,0,[b])
z.hU(a,b)
return z},
m_:function(a){var z
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
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
nN:{"^":"d;$ti",
gT:function(a){return this.a===0},
gaq:function(a){return this.a!==0},
ar:function(a,b){var z
for(z=J.an(b);z.t();)this.q(0,z.gG())},
jn:function(a){var z,y
for(z=a.a,y=new P.aj(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a3(0,y.d))return!1
return!0},
bD:function(a,b){var z,y,x,w,v
z=H.q([],this.$ti)
C.a.sm(z,this.a)
for(y=new P.aj(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cm:function(a){return this.bD(a,!0)},
aO:function(a,b){return new H.by(this,b,[H.m(this,0),null])},
k:function(a){return P.c3(this,"{","}")},
U:function(a,b){var z
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bl:function(a,b,c){var z,y
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gA:function(a){var z,y
z=new P.aj(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.af())
do y=z.d
while(z.t())
return y},
bc:function(a,b,c){var z,y
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.af())},
dv:function(a,b){return this.bc(a,b,null)},
aS:function(a,b){var z,y,x,w
for(z=new P.aj(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.ds())
y=w
x=!0}}if(x)return y
throw H.c(H.af())},
$isbF:1,
$isa_:1,
$isw:1},
nM:{"^":"nN;$ti"}}],["","",,P,{"^":"",
d3:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qu(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d3(a[z])
return a},
rf:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.W(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.A(x)
w=String(y)
throw H.c(new P.f2(w,null,null))}w=P.d3(z)
return w},
ws:[function(a){return a.dH()},"$1","tE",2,0,0],
qu:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iJ(b):y}},
gm:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.ct().length
return z},
gT:function(a){var z
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
if(y==null?z!=null:y!==z)y[b]=null}else this.iW().n(0,b,c)},
a6:function(a){if(this.b==null)return this.c.a6(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
U:function(a,b){var z,y,x,w
if(this.b==null)return this.c.U(0,b)
z=this.ct()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d3(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dG(this)},
ct:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iW:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dB(P.t,null)
y=this.ct()
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
eX:{"^":"d;$ti"},
cB:{"^":"d;$ti"},
dx:{"^":"a5;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lH:{"^":"dx;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lG:{"^":"eX;a,b",
jr:function(a,b){var z=P.rf(a,this.gjs().a)
return z},
jq:function(a){return this.jr(a,null)},
jA:function(a,b){var z=this.gjB()
z=P.qw(a,z.b,z.a)
return z},
fQ:function(a){return this.jA(a,null)},
gjB:function(){return C.P},
gjs:function(){return C.O},
$aseX:function(){return[P.d,P.t]}},
lJ:{"^":"cB;a,b",
$ascB:function(){return[P.d,P.t]}},
lI:{"^":"cB;a",
$ascB:function(){return[P.t,P.d]}},
qx:{"^":"d;",
hv:function(a){var z,y,x,w,v,u,t
z=J.I(a)
y=z.gm(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cK(a,v)
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
e0:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lH(a,null))}z.push(a)},
dK:function(a){var z,y,x,w
if(this.hu(a))return
this.e0(a)
try{z=this.b.$1(a)
if(!this.hu(z))throw H.c(new P.dx(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.A(w)
throw H.c(new P.dx(a,y))}},
hu:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.B+=C.j.k(a)
return!0}else if(a===!0){this.c.B+="true"
return!0}else if(a===!1){this.c.B+="false"
return!0}else if(a==null){this.c.B+="null"
return!0}else if(typeof a==="string"){z=this.c
z.B+='"'
this.hv(a)
z.B+='"'
return!0}else{z=J.p(a)
if(!!z.$isL){this.e0(a)
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
y=J.I(a)
if(y.gm(a)>0){this.dK(y.j(a,0))
for(x=1;x<y.gm(a);++x){z.B+=","
this.dK(y.j(a,x))}}z.B+="]"},
kX:function(a){var z,y,x,w,v,u,t
z={}
if(a.gT(a)){this.c.B+="{}"
return!0}y=a.gm(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.U(0,new P.qy(z,x))
if(!z.b)return!1
w=this.c
w.B+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.B+=v
this.hv(x[u])
w.B+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dK(x[t])}w.B+="}"
return!0}},
qy:{"^":"a:7;a,b",
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
qv:{"^":"qx;c,a,b",v:{
qw:function(a,b,c){var z,y,x
z=new P.bK("")
y=new P.qv(z,[],P.tE())
y.dK(a)
x=z.B
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vV:[function(a,b){return J.bW(a,b)},"$2","tF",4,0,40],
f0:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kT(a)},
kT:function(a){var z=J.p(a)
if(!!z.$isa)return z.k(a)
return H.cO(a)},
cD:function(a){return new P.qd(a)},
T:function(a,b,c){var z,y
z=H.q([],[c])
for(y=J.an(a);y.t();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
m0:function(a,b,c,d){var z,y,x
z=H.q(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bf:function(a,b){var z=P.T(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ez:function(a){H.uE(H.b(a))},
bj:function(a,b,c){return new H.du(a,H.dv(a,!1,b,!1),null,null)},
a3:{"^":"d;"},
"+bool":0,
X:{"^":"d;$ti"},
cC:{"^":"d;iX:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cC))return!1
return this.a===b.a&&!0},
bA:function(a,b){return C.e.bA(this.a,b.giX())},
gw:function(a){var z=this.a
return(z^C.e.dl(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.ka(H.mV(this))
y=P.bZ(H.mT(this))
x=P.bZ(H.mP(this))
w=P.bZ(H.mQ(this))
v=P.bZ(H.mS(this))
u=P.bZ(H.mU(this))
t=P.kb(H.mR(this))
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
$isX:1,
$asX:function(){return[P.cC]},
v:{
ka:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
kb:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bZ:function(a){if(a>=10)return""+a
return"0"+a}}},
aR:{"^":"K;",$isX:1,
$asX:function(){return[P.K]}},
"+double":0,
b0:{"^":"d;bQ:a<",
a7:function(a,b){return new P.b0(this.a+b.gbQ())},
at:function(a,b){return new P.b0(this.a-b.gbQ())},
c3:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b0(C.j.hi(this.a*b))},
aR:function(a,b){return C.e.aR(this.a,b.gbQ())},
b7:function(a,b){return this.a>b.gbQ()},
d4:function(a,b){return this.a<=b.gbQ()},
bN:function(a,b){return C.e.bN(this.a,b.gbQ())},
gjU:function(){return C.e.bI(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.b0))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
bA:function(a,b){return C.e.bA(this.a,b.gbQ())},
k:function(a){var z,y,x,w,v
z=new P.kA()
y=this.a
if(y<0)return"-"+new P.b0(0-y).k(0)
x=z.$1(C.e.bI(y,6e7)%60)
w=z.$1(C.e.bI(y,1e6)%60)
v=new P.kz().$1(y%1e6)
return""+C.e.bI(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eW:function(a){return new P.b0(0-this.a)},
$isX:1,
$asX:function(){return[P.b0]}},
kz:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kA:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a5:{"^":"d;",
gbg:function(){return H.B(this.$thrownJsError)}},
cM:{"^":"a5;",
k:function(a){return"Throw of null."}},
b_:{"^":"a5;a,b,h:c<,d",
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
u=P.f0(this.b)
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
n0:function(a){return new P.dV(null,null,!1,null,null,a)},
c9:function(a,b,c){return new P.dV(null,null,!0,a,b,"Value not in range")},
a6:function(a,b,c,d,e){return new P.dV(b,c,!0,a,d,"Invalid value")},
n1:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a6(a,b,c,d,e))},
ca:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a6(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a6(b,a,c,"end",f))
return b}}},
lr:{"^":"b_;e,m:f>,a,b,c,d",
ge6:function(){return"RangeError"},
ge5:function(){if(J.bU(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cH:function(a,b,c,d,e){var z=e!=null?e:J.aK(b)
return new P.lr(b,z,!0,a,c,"Index out of range")}}},
V:{"^":"a5;a",
k:function(a){return"Unsupported operation: "+this.a}},
ad:{"^":"a5;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
z:{"^":"a5;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a5;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f0(z))+"."}},
mq:{"^":"d;",
k:function(a){return"Out of Memory"},
gbg:function(){return},
$isa5:1},
fX:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbg:function(){return},
$isa5:1},
k9:{"^":"a5;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qd:{"^":"d;a",
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
kX:{"^":"d;h:a<,fn,$ti",
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
H.fA(b,"expando$values",y)}H.fA(y,z,c)}}},
bz:{"^":"d;"},
u:{"^":"K;",$isX:1,
$asX:function(){return[P.K]}},
"+int":0,
w:{"^":"d;$ti",
aO:function(a,b){return H.bA(this,b,H.y(this,"w",0),null)},
c2:["dW",function(a,b){return new H.J(this,b,[H.y(this,"w",0)])}],
a3:function(a,b){var z
for(z=this.gX(this);z.t();)if(J.e(z.gG(),b))return!0
return!1},
U:function(a,b){var z
for(z=this.gX(this);z.t();)b.$1(z.gG())},
bl:function(a,b,c){var z,y
for(z=this.gX(this),y=b;z.t();)y=c.$2(y,z.gG())
return y},
bD:function(a,b){return P.T(this,b,H.y(this,"w",0))},
cm:function(a){return this.bD(a,!0)},
bE:function(a){return P.b1(this,H.y(this,"w",0))},
gm:function(a){var z,y
z=this.gX(this)
for(y=0;z.t();)++y
return y},
gT:function(a){return!this.gX(this).t()},
gaq:function(a){return!this.gT(this)},
dT:function(a,b){return H.nP(this,b,H.y(this,"w",0))},
gA:function(a){var z,y
z=this.gX(this)
if(!z.t())throw H.c(H.af())
do y=z.gG()
while(z.t())
return y},
gc5:function(a){var z,y
z=this.gX(this)
if(!z.t())throw H.c(H.af())
y=z.gG()
if(z.t())throw H.c(H.ds())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a6(b,0,null,"index",null))
for(z=this.gX(this),y=0;z.t();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cH(b,this,"index",null,y))},
k:function(a){return P.lC(this,"(",")")}},
cJ:{"^":"d;$ti"},
L:{"^":"d;$ti",$isw:1,$isa_:1},
"+List":0,
G:{"^":"d;$ti"},
at:{"^":"d;",
gw:function(a){return P.d.prototype.gw.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isX:1,
$asX:function(){return[P.K]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gw:function(a){return H.aD(this)},
k:function(a){return H.cO(this)},
gbu:function(a){return new H.av(H.id(this),null)},
toString:function(){return this.k(this)}},
bh:{"^":"d;"},
bF:{"^":"a_;$ti"},
aW:{"^":"d;"},
t:{"^":"d;",$isX:1,
$asX:function(){return[P.t]},
$isdO:1},
"+String":0,
bK:{"^":"d;B<",
gm:function(a){return this.B.length},
gT:function(a){return this.B.length===0},
gaq:function(a){return this.B.length!==0},
k:function(a){var z=this.B
return z.charCodeAt(0)==0?z:z},
v:{
h1:function(a,b,c){var z=J.an(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.t())}else{a+=H.b(z.gG())
for(;z.t();)a=a+c+H.b(z.gG())}return a},
oJ:function(a){return new P.bK(a)}}}}],["","",,P,{"^":"",fM:{"^":"d;"}}],["","",,P,{"^":"",
cP:function(a){return C.J},
qt:{"^":"d;",
ae:function(a){if(a<=0||a>4294967296)throw H.c(P.n0("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
km:function(){return Math.random()}}}],["","",,S,{"^":"",jZ:{"^":"d;a,b,$ti",
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
$isG:1}}],["","",,A,{"^":"",k_:{"^":"d;a,b,$ti",
gm:function(a){return this.b.a},
ce:function(a){return this.b.ce(a)},
a3:function(a,b){return this.b.a3(0,b)},
U:function(a,b){return this.b.U(0,b)},
gT:function(a){return this.b.a===0},
gaq:function(a){return this.b.a!==0},
gX:function(a){var z,y
z=this.b
y=new P.aj(z,z.r,null,null,[null])
y.c=z.e
return y},
gA:function(a){var z=this.b
return z.gA(z)},
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
$isa_:1,
$isw:1}}],["","",,S,{"^":"",dh:{"^":"d;fp:a<,b,$ti",
Y:function(a){var z=new S.P(null,null,this.$ti)
z.ag()
z.l(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=X.bu(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
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
aU:function(a,b){return this.bM(a,b,0)},
gX:function(a){var z=this.a
return new J.bb(z,z.length,0,null,[H.m(z,0)])},
aO:function(a,b){var z=this.a
z.toString
return new H.ap(z,b,[H.m(z,0),null])},
a3:function(a,b){var z=this.a
return(z&&C.a).a3(z,b)},
U:function(a,b){var z=this.a
return(z&&C.a).U(z,b)},
bE:function(a){var z=this.a
z.toString
return P.b1(z,H.m(z,0))},
gT:function(a){return this.a.length===0},
gaq:function(a){return this.a.length!==0},
gA:function(a){var z=this.a
return(z&&C.a).gA(z)},
ag:function(){if(new H.av(H.Z(H.m(this,0)),null).u(0,C.n))throw H.c(new P.V('explicit element type required, for example "new BuiltList<int>"'))},
$isw:1},P:{"^":"d;fp:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dh(z,null,this.$ti)
y.ag()
this.a=z
this.b=y
z=y}return z},
l:function(a){if(H.aQ(a,"$isdh",this.$ti,null)){this.a=a.gfp()
this.b=a}else{this.a=P.T(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.D("null element"))
z=this.gem()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.D("null element"))
z=this.gem();(z&&C.a).q(z,b)},
a9:function(a,b){var z=this.gem();(z&&C.a).a9(z,b)},
aO:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bD(0,!0)
this.a=z
this.b=null
this.ic(z)},
gem:function(){if(this.b!=null){this.a=P.T(this.a,!0,H.m(this,0))
this.b=null}return this.a},
ag:function(){if(new H.av(H.Z(H.m(this,0)),null).u(0,C.n))throw H.c(new P.V('explicit element type required, for example "new ListBuilder<int>"'))},
ic:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.d6(w,y))throw H.c(P.D("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cy:{"^":"d;iB:a<,b,c,d,$ti",
Y:function(a){var z=new A.cL(null,null,this.$ti)
z.c8()
z.l(this)
a.$1(z)
return z.p()},
D:function(){return new S.jZ(!0,this.a,this.$ti)},
gw:function(a){var z=this.b
if(z==null){z=this.a.gcc()
z=H.bA(z,new A.jK(this),H.y(z,"w",0),null)
z=P.T(z,!1,H.y(z,"w",0))
C.a.f_(z)
z=X.bu(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$iscy)return!1
y=b.a
x=this.a
if(y.gm(y)!==x.gm(x))return!1
z=z.gw(b)
w=this.gw(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcc()
this.c=z}z=z.gX(z)
for(;z.t();){v=z.gG()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
U:function(a,b){this.a.U(0,b)},
gT:function(a){var z=this.a
return z.gT(z)},
gaq:function(a){var z=this.a
return z.gaq(z)},
gm:function(a){var z=this.a
return z.gm(z)},
c8:function(){if(new H.av(H.Z(H.m(this,0)),null).u(0,C.n))throw H.c(new P.V('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.Z(H.m(this,1)),null).u(0,C.n))throw H.c(new P.V('explicit value type required, for example "new BuiltMap<int, int>"'))}},jK:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.d4(X.aX(X.aX(0,J.j(z)),J.j(y)))}},cL:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cy(this.a,null,null,null,this.$ti)
z.c8()
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
c8:function(){if(new H.av(H.Z(H.m(this,0)),null).u(0,C.n))throw H.c(new P.V('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.Z(H.m(this,1)),null).u(0,C.n))throw H.c(new P.V('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",di:{"^":"d;iQ:a<,b,$ti",
Y:function(a){var z=new L.bk(null,null,this.$ti)
z.bz()
z.l(this)
a.$1(z)
return z.p()},
gw:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.T(new H.by(z,new L.jL(),[H.m(z,0),null]),!1,null)
C.a.f_(z)
z=X.bu(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$isdi)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gw(b)
x=this.gw(this)
if(z==null?x!=null:z!==x)return!1
return y.jn(b)},
k:function(a){return J.h(this.a)},
gm:function(a){return this.a.a},
ce:function(a){return this.a.ce(a)},
gX:function(a){var z,y
z=this.a
y=new P.aj(z,z.r,null,null,[null])
y.c=z.e
return y},
aO:function(a,b){var z=this.a
z.toString
return new H.by(z,b,[H.m(z,0),null])},
a3:function(a,b){return this.a.a3(0,b)},
U:function(a,b){return this.a.U(0,b)},
bE:function(a){return new A.k_(!0,this.a,this.$ti)},
gT:function(a){return this.a.a===0},
gaq:function(a){return this.a.a!==0},
gA:function(a){var z=this.a
return z.gA(z)},
bz:function(){if(new H.av(H.Z(H.m(this,0)),null).u(0,C.n))throw H.c(new P.V('explicit element type required, for example "new BuiltSet<int>"'))},
$isw:1},jL:{"^":"a:0;",
$1:function(a){return J.j(a)}},bk:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.di(this.a,null,this.$ti)
z.bz()
this.b=z}return z},
l:function(a){var z,y,x,w
if(H.aQ(a,"$isdi",this.$ti,null)){this.a=a.giQ()
this.b=a}else{z=H.m(this,0)
y=P.a0(null,null,null,z)
for(x=J.an(a);x.t();){w=x.gG()
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
bz:function(){if(new H.av(H.Z(H.m(this,0)),null).u(0,C.n))throw H.c(new P.V('explicit element type required, for example "new SetBuilder<int>"'))},
iR:function(a){var z,y,x
for(z=new P.aj(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d6(x,y))throw H.c(P.D("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
O:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",no:{"^":"nm;ch,cx,ai:cy@,b8:db@,bw:dx@,b,c,d,e,f,r,x,y,z,Q,a",
ha:function(){var z=$.$get$cq()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jW:function(){var z,y,x,w
this.cx=null
this.cy=Z.bI("Health",new N.nr(),"#CCCCCC","Your physical state",100,0,!0,P.aR)
z=P.u
this.db=Z.bI("Stamina",new N.ns(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bI("Gold",new N.nt(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bR()
x=this.cy
w=this.db
y=new O.f_(N.bg("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a2(H.q([],[Y.ac]),0,P.aC()),x,w,z,O.uJ(),O.uI(),O.uH(),y,this.ghL(),new P.bK(""),!1,null)
y.hJ()
this.cx=y
y.x="endGame"
$.$get$cm().q(0,0)},
hY:function(){var z,y
z=new O.cU([[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cU([new N.nq(this),[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cU(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
np:function(){var z,y,x,w
z=Z.bI("Health",new N.tf(),"#CCCCCC","Your physical state",100,0,!0,P.aR)
y=P.u
x=Z.bI("Stamina",new N.tg(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bI("Gold",new N.th(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.t
z=new N.no("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nu(new H.S(0,null,null,null,null,null,0,[w,O.cU])),null,null,null,P.a0(null,null,null,w),!1,null,-9999,null,null,null)
z.hY()
return z}}},tf:{"^":"a:17;",
$1:function(a){var z=J.p(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d4(a,0.5))return"\ud83d\ude23"
if(z.aR(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tg:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},th:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nq:{"^":"a:18;a",
$0:function(){var z=0,y=P.aB(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.bt(),$async$$0)
case 2:return P.aF(null,y)}})
return P.aG($async$$0,y)}},nr:{"^":"a:17;",
$1:function(a){var z=J.p(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.d4(a,0.5))return"\ud83d\ude23"
if(z.aR(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},ns:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nt:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",dl:{"^":"d;"},kQ:{"^":"d;"},py:{"^":"dl;a,b",
Y:function(a){var z=new M.e5(null,!1,0)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.dl))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return Y.O(Y.k(Y.k(0,C.M.gw(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},e5:{"^":"kQ;c,a,b",
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
z=new M.py(y,this.b)}this.l(z)
return z}}}],["","",,O,{"^":"",
ww:[function(a){var z,y
z=a.gc4()
y=a.gbV()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","d8",2,0,19],
wI:[function(a){var z,y,x
z=a.gc4()
y=a.gcY()
x=a.gbV()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","i3",2,0,19],
f_:{"^":"m2;y,z,Q,ch,cx,cy,db,dx,dy,bF:fr<,fx,f1:fy<,ai:go<,b8:id<,bw:k1<,a,b,c,d,e,f,r,x",
hJ:function(){var z,y,x,w,v,u
z=P.bf(C.o,null)
y=$.$get$bS()
this.cy=R.aZ(1000,"orc",O.d8(),null,new G.b4("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.q,0,y)
this.db=R.aZ(1001,"goblin",O.d8(),null,new G.b4("scimitar",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,1,0,!1,1,!1,C.q,0,y)
y=new S.P(null,null,[Q.n])
y.ag()
y.l([new Q.n("start_adventure","","",null)])
this.dx=new K.cc(y.p(),"preStartBook",new O.kH(),new O.kI(),null,null,"ground")
y=R.aZ(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.C,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.d3()
if(typeof y!=="number")return H.x(y)
this.go.saa(z/y)
this.id.saa(this.ch.fx)
this.k1.saa(this.ch.f)
this.cx=R.aZ(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.a0,0,null)
this.dy=F.fH(this.dx,!1)
y=K.cc
x=P.T($.$get$hT(),!0,y)
C.a.ar(x,[this.dx,$.$get$er()])
w=new M.e5(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b1([z,v],R.H)
z=P.b3(null,O.cs)
u=new A.a9(v,P.a0(null,null,null,U.as),w,z,P.b1(x,y),P.T([u],!0,S.a1),0,null)
this.fr=u
y=new Y.a2(H.q([],[Y.ac]),0,P.aC())
y.b=u.r
this.fx=new B.bB(u,null,y,1,1,!0,!1,!1,0)},
d0:function(){var z=0,y=P.aB(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d0=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjz()
if(v.h7(u)){z=1
break}t=w.fr.a0(w.ch.x)
s=t.gai()
r=t.gh2()
if(typeof s!=="number"){x=s.d3()
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
v.W(0,"\n\n",!0)
if(w.fr.jR(w.ch.x))v.W(0,"TO BE CONTINUED.",!0)
else v.W(0,"You died.",!0)
w.f.B+=v.ci()
z=1
break}q=C.a.gA(s)
p=q.dN(w.fr)
o=G.j0(p,w.fr)
z=3
return P.aw(o.kr(),$async$d0)
case 3:s=o.f
if(s.gT(s)){n=o.a
m=o.b
n.eT("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.p(k)
k="PlanConsequence<"+j.gw(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bL(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mx(s)
i=new Z.mw(new P.ht(s,[null,null]),n)
if(s.gT(s))$.$get$bC().eT("Created with no recommendations.")
if(n.length===0){r.dR("No recommendation for "+H.b(p.gh()))
r.dR(new O.kK(w))
w.fr.fP(q.gi());++w.fr.r
z=1
break}z=p.gF()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;s=n.length,h<s;s===u||(0,H.ar)(n),++h);r.bL("planner.generateTable for "+H.b(p.gh()))
o.eU().U(0,new O.kL(w))
u=i.h9(q.geK(),O.i3())
u.toString
g=P.T(u,!1,H.y(u,"w",0))
if(g.length!==0&&C.a.bS(g,new O.kM())){w.f.B+=v.ci()
C.a.sm(v.a,0)}v=new O.kN(new O.kP())
u=g.length-1
if(u-0<=32)H.fW(g,0,u,v)
else H.fV(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gV(),f.gK(),new O.kO(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfO()
z=7
return P.aw(w.cq(i.kq(s==null?O.i3():s),p,v),$async$d0)
case 7:case 5:v.h7(u)
case 1:return P.aF(x,y)}})
return P.aG($async$d0,y)},
cq:function(a,b,c){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$cq=P.ax(function(d,e){if(d===1)return P.aE(e,y)
while(true)switch(z){case 0:v=a.dr(b,w.fx,w.fr)
u=P.T(v,!0,H.y(v,"w",0))
z=b.gF()===!0?3:5
break
case 3:z=6
return P.aw(w.dd(a,b,u),$async$cq)
case 6:z=4
break
case 5:t=S.mZ(new H.ap(u,new O.kE(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ar(c.a,w.fx.gf1().a)
w.fr=w.fx.gbF()
v=w.y
v.bL(new O.kF(a,b))
v.ah(new O.kG(w,b))
case 1:return P.aF(x,y)}})
return P.aG($async$cq,y)},
dd:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dd=P.ax(function(d,e){if(d===1)return P.aE(e,y)
while(true)switch(z){case 0:w=a.J(b,x.fr)
v=J.p(w)
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
case 7:u=C.a.gA(J.h(a.gM()).split("."))
v=v.kN(w)
t=a.ad(b,x.fr)
s=a.gP()&&b.jS(a.gM())
r="use "+H.b(u)
x.ft()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dd)
case 8:q=e
s=new H.J(c,new O.kB(q),[H.m(c,0)])
x.fx=s.gc5(s)
if(q.gkV()===!0){p=A.e4(x.fx.gbF())
p.Z(b.gi(),new O.kC())
v=x.fx
t=v.gfB()
s=H.q([],[Y.ac])
r=new Y.a2(s,0,P.aC())
C.a.ar(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bB(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aF(null,y)}})
return P.aG($async$dd,y)}},
kH:{"^":"a:3;",
$3:function(a,b,c){return c.W(0,"UNUSED because this is the first choice",!0)}},
kI:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.z("Room isn't to be revisited"))}},
kK:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kJ(),[H.m(z,0),null]).cb(0," <- ")}},
kJ:{"^":"a:0;",
$1:function(a){return a.gaM()}},
kL:{"^":"a:0;a",
$1:function(a){return this.a.y.bL(a)}},
kP:{"^":"a:41;",
$1:function(a){if(a instanceof Q.E)return H.b(a.b.gh())+" "+a.gV()
return"ZZZZZZ "+a.gV()}},
kM:{"^":"a:0;",
$1:function(a){return a.gV()!==""}},
kN:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bW(z.$1(a),z.$1(b))}},
kO:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.aB(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cq(x.c,x.b,w.fy),$async$$0)
case 2:return P.aF(null,y)}})
return P.aG($async$$0,y)}},
kE:{"^":"a:0;",
$1:function(a){return a.gks()}},
kF:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kG:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ap(z,new O.kD(),[H.m(z,0),null]).cb(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kD:{"^":"a:0;",
$1:function(a){return a.gaM()}},
kB:{"^":"a:0;a",
$1:function(a){return a.geE()===this.a.geE()}},
kC:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}}}],["","",,Q,{"^":"",
i8:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i8(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gA(t):null
s=J.iY(t.aE(y.a,y),new Q.ub(z))
t=J.an(s.a),r=new H.cf(t,s.b,[H.m(s,0)])
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
i9:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i9(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dP((t.length!==0?C.a.gA(t):null).gbB()).gjD().a,t=new J.bb(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
ia:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ia(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gA(t):null).gbK(),t=t.gX(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
ub:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaV()}},
aa:{"^":"d;",
dr:function(a,b,c){var z=this
return P.aP(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dr(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.J(y,x.gbF())
r=J.ak(s)
v=r.b7(s,0)?2:3
break
case 2:q=A.e4(w)
v=4
return B.fv(q,x,z,z.i8(q,y,w,z.gO(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aR(s,1)?5:6
break
case 5:q=A.e4(w)
p=z.i7(q,y,w,z.gN(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fv(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aN()
case 1:return P.aO(t)}}})},
f6:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aS(0,new Q.iZ(b))
y=new O.eM(null,null,null,null,null,null,null,null,null,null,null,null)
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
x.gfz().q(0,w)}v=new Y.a2(H.q([],[Y.ac]),0,P.aC())
x=a.f
u=(x.length!==0?C.a.gA(x):null).gi()
a.gw(a);(x.length!==0?C.a.gA(x):null).kn(a,v)
this.a=d.$3(z,a,v)
if(a.dg(u)!=null)a.fP(u);++a.r
w=a.eV(u)
if(!(w==null))w.h5(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gA(x):null
if((w==null?w:w.dN(a))!=null){w=x.length!==0?C.a.gA(x):null
w=!J.e(w==null?w:w.d8(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gA(x):null)==null)break
t=C.a.gA(x)
t.dA(a)
C.a.a9(x,t)}x=x.length!==0?C.a.gA(x):null
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
iZ:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
E:{"^":"aa;bV:b<",
gV:function(){var z=new Y.a2(H.q([],[Y.ac]),0,P.aC())
z.fD(0,this.gam(),this.b)
return z.ci()},
ad:function(a,b){var z=new Y.a2(H.q([],[Y.ac]),0,P.aC())
z.j7(0,this.gan(),this.b,a,!0)
return z.ci()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gam()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
cE:{"^":"aa;",
gV:function(){return this.b.gV()},
k:function(a){return"ExitAction<"+this.b.gV()+">"}},
cI:{"^":"aa;",
gV:function(){var z=new Y.a2(H.q([],[Y.ac]),0,P.aC())
z.fD(0,"pick up <object>",this.b)
return z.ci()},
k:function(a){return"ItemAction<"+this.gV()+">"}},
n8:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"wk<"}}}],["","",,O,{"^":"",cs:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},lR:{"^":"d;a,b",
k:function(a){return this.b}},pu:{"^":"cs;a,ep:b<,aM:c<,d,cT:e<,f3:f<,H:r<,hr:x<,hs:y<,z,ht:Q<",
Y:function(a){var z=new O.eM(null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},eM:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gep:function(){return this.ga5().c},
gaM:function(){return this.ga5().d},
gcT:function(){return this.ga5().f},
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
z=new O.pu(y,x,w,v,u,t,s,r,q,p,o)
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
ib:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$ib(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bM(new H.J(u,new R.ue(z),[H.m(u,0)]))
case 3:return P.aN()
case 1:return P.aO(v)}}})},
aZ:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eN(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.ta(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
ue:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfT()
y=this.a.gi()
return z==null?y==null:z===y}},
H:{"^":"mc;",
gji:function(){return!0},
gbm:function(){var z=this.r
if(typeof z!=="number")return z.b7()
return z>0},
gb5:function(){return this.d instanceof K.c1},
gaN:function(){return this.dx===C.i},
ga4:function(){return this.dx===C.f},
ga8:function(){return this.dx===C.k},
jS:function(a){var z=this.fx
if(typeof z!=="number")return z.bN()
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
z=a.c0("Confuse",this,!0)
if(z==null)return!1
y=a.kK("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d7:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a0(this.x)
y=z.gai()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gbm())x-=10
y=z.d
if(!(y instanceof K.c1))x+=4
y=J.aY(y.gaa(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.ch,w=[null],v=new P.aj(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aY(v.d.gaa(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.gX(y),u=new H.cf(v,new R.ju(this),[H.m(y,0)]),t=0;u.t();){s=v.gG()
r=s.gaV()?2:0
q=s.gai()
if(typeof q!=="number")return H.x(q)
p=J.aY(s.d.gaa(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.aj(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aY(q.d.gaa(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.ct(x,t,y.bl(0,0,new R.jv(this,a)))},
ix:function(a,b,c){var z=b.kL(a,this,!0)
if(z==null)return!1
return z<=c},
$isbd:1},
mc:{"^":"d+dn;"},
ta:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
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
z=P.a0(null,null,null,null)
a.gC().cx=z
z=this.cy
if(z!=null){y=new L.bm(null,null)
y.l(z)
z=y}else{z=$.$get$ey()
z.toString
y=new L.bm(null,null)
y.l(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
ju:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gbe(),z.fy)){y=a.gi()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
jv:{"^":"a:27;a,b",
$2:function(a,b){var z,y
z=b.gaV()?1:0
y=b.gai()
if(typeof y!=="number")return H.x(y)
return J.am(a,(z+y)*this.a.fZ(b,this.b))}},
dP:{"^":"d;a,b",
k:function(a){return this.b}},
pv:{"^":"H;a,fO:b<,bB:c<,a_:d<,fT:e<,bw:f<,ai:r<,i:x<,y,ca:z<,F:Q<,bX:ch<,h2:cx<,h:cy<,bC:db<,aj:dx<,a2:dy<,fr,b8:fx<,be:fy<",
Y:function(a){var z=new R.eN(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.v.gw(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.v.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eN:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
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
gai:function(){return this.gC().x},
sai:function(a){this.gC().x=a
return a},
gi:function(){return this.gC().y},
gca:function(){return this.gC().Q},
gF:function(){return this.gC().ch},
gbX:function(){return this.gC().cx},
gh2:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gbC:function(){return this.gC().dx},
gaj:function(){return this.gC().dy},
saj:function(a){this.gC().dy=a
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
z=new R.pv(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
at:function(a,b){return new A.ao(this.a-b.gc4(),this.b-b.gcY(),J.bw(this.c,b.gbV()))},
k:function(a){return"ActorScore<self="+C.j.b6(this.a,2)+",team="+C.j.b6(this.b,2)+",enemy="+J.bX(this.c,2)+">"}},ao:{"^":"d;c4:a<,cY:b<,bV:c<",
gkb:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c3:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ao(this.a*b,this.b*b,J.bV(this.c,b))},
a7:function(a,b){return new A.ao(this.a+b.gc4(),this.b+b.gcY(),J.am(this.c,b.gbV()))},
d3:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ao(this.a/b,this.b/b,J.aY(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.b6(this.a,2)+",team="+C.j.b6(this.b,2)+",enemy="+J.bX(this.c,2)+">"},
v:{
jt:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.D("Cannot average empty iterable"))
return new A.ao(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
vQ:function(a){switch(a){case C.L:return"spear"
case C.y:return"sword"
case C.z:return"fist"
default:throw H.c(P.D(a))}},
as:{"^":"md;",
gaM:function(){return U.vQ(C.a.gez(this.a))},
gi:function(){return H.aD(this)},
gca:function(){return!0},
gbm:function(){return!1},
gF:function(){return!1},
gbC:function(){return!1},
ga2:function(){return C.r},
gbe:function(){return $.$get$bT()},
$isbd:1},
md:{"^":"d+dn;"},
dr:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",c1:{"^":"b5;h:b<,a"}}],["","",,G,{"^":"",b4:{"^":"b5;h:b<,co:c<,cZ:d<,bC:e<,cI:f<,fI:r<,a"}}],["","",,L,{"^":"",b5:{"^":"as;",
gfI:function(){return!1},
gcI:function(){return!1},
gk8:function(){return!1},
gbd:function(){return this.gco()>0},
geF:function(){return this.gcZ()>0},
gm:function(a){return 2},
gco:function(){return 0},
gcZ:function(){return 0},
gaa:function(){var z,y,x
z=this.gco()
y=this.gcZ()
x=this.gbC()?1:0
return 2+z+y+x},
$isbd:1}}],["","",,G,{"^":"",m2:{"^":"d;",
ft:function(){var z,y
z=this.f
y=z.B
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.B=""}},
l6:[function(a){this.f.B+=a},"$1","gjz",2,0,21],
bt:function(){var z=0,y=P.aB(),x,w=this,v,u
var $async$bt=P.ax(function(a,b){if(a===1)return P.aE(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.z("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sm(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gm(v)===0&&u.B.length===0)){z=4
break}z=5
return P.aw(w.d0(),$async$bt)
case 5:z=3
break
case 4:w.ft()
case 1:return P.aF(x,y)}})
return P.aG($async$bt,y)}}}],["","",,B,{"^":"",eY:{"^":"d;d6:a<,du:b<,cR:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.bX(this.b,3)+", score="+this.a.k(0)+">"}},bB:{"^":"d;bF:a<,fB:b<,f1:c<,ks:d<,du:e<,f,r,eE:x<,cR:y<",
gw:function(a){return X.bu(H.q([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
u:function(a,b){var z
if(b==null)return!1
z=J.p(b)
return!!z.$isbB&&this.gw(this)===z.gw(b)},
k:function(a){var z,y
z=this.a
y=J.p(z)
z="PlanConsequence<"+y.gw(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
fv:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bV(e,b.gdu())
z=z?0:b.gcR()+1
d.b=a.r
return new B.bB(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j_:{"^":"d;a,b,c,d,e,f",
jl:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ah("...")
z.ah("combining scores")
y=H.q([],[A.ao])
x=new G.jm()
for(w=J.an(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gG()
z.ah(new G.jk(r))
if(J.a7(r.gdu(),0.15))if(s==null){z.ah("    - first _bestCase")
s=r}else if(J.a7(x.$1(r.gd6()),x.$1(s.gd6()))){z.ah("    - new _bestCase")
s=r}q=r.gd6()
p=J.bw(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.ao((q.a-v)*o,(q.b-u)*o,J.bV(p,o))
z.ah(new G.jl(n))
y.push(n)}m=A.jt(y)
w=s==null
if(w)l=C.E
else{q=s.gd6()
l=new A.ao(q.a-v,q.b-u,J.bw(q.c,t))}w=w?s:s.gcR()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.aY(l.c,w)
t=m.a
q=m.b
p=m.c
z.ah("- uplifts average = "+("ActorScoreChange<self="+C.j.b6(t,2)+",team="+C.j.b6(q,2)+",enemy="+J.bX(p,2)+">"))
z.ah("- best = "+("ActorScoreChange<self="+C.t.b6(v,2)+",team="+C.t.b6(u,2)+",enemy="+J.bX(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ah("- result = "+("ActorScoreChange<self="+C.t.b6(t,2)+",team="+C.t.b6(q,2)+",enemy="+C.j.b6(p,2)+">"))
return new A.ao(t,q,p)},
eU:function(){var z=this
return P.aP(function(){var y=0,x=1,w,v,u,t,s
return function $async$eU(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcc(),u=u.gX(u),t=1
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
t=u.a.aS(0,new G.jn(x))
s=t.d7(u)
r=x.a
r.bL("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b6(x.e8(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.bb(new G.jo(t,o))
if(o.I(t,u)!==!0){r.bb(new G.jp(o))
z=2
break}z=4
return P.aw(x.cu(v,o,b,a,c).cm(0),$async$dB)
case 4:n=e
if(J.eJ(n)===!0){r.bb(new G.jq(o))
w.n(0,o,C.F)
z=2
break}r.bb(new G.jr(s,o,n))
m=x.jl(n,s,b)
w.n(0,o,m)
r.bb(new G.js(o,m))
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
return P.bM((u.length!==0?C.a.gA(u):null).gbi())
case 2:u=(u.length!==0?C.a.gA(u):null).gaC()
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
return P.bM(Q.i8(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bM(Q.i9(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bM(Q.ia(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.z(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aN()
case 1:return P.aO(v)}}})},
cu:function(a5,a6,a7,a8,a9){var $async$cu=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aS(0,new G.j3(t))
p=t.a
p.bb("=====")
p.bb(new G.j4(a6,q))
p.bb(new G.j5(a6))
if(a6.I(q,r)!==!0){p.bb("- firstAction not applicable")
z=1
break}o=q.d7(r)
p.bb(new G.jb(a5,o))
p.bb(new G.jc(a5))
n=P.b3(null,B.bB)
m=P.a0(null,null,null,A.a9)
l=J.p(r)
k=l.gw(r)
for(j=new P.b6(a6.dr(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gG()
if(l.gw(r)!==k)throw H.c(new P.z("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aA(h)}s.a=0
r=t.b
case 3:if(!!n.gT(n)){z=4
break}++s.a
g=n.dE()
p.ah("----")
p.ah(new G.jd(g))
p.ah(new G.je(g))
if(g.gcR()>a7||s.a>a8){p.ah(new G.jf(s,a7,g))
p.ah(new G.jg(g))
z=4
break}z=g.gbF().f.length===0?5:6
break
case 5:p.ah("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bc(0,new G.jh(t),new G.ji())
if(q==null){p.ah("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eY(q.d7(l),g.e,g.y)
p.ah(new G.j6(f))
z=7
x=[1]
return P.d2(P.hA(f),$async$cu,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gA(j):null).dN(l)
j=l.a
i=new H.J(j,new G.j7(t),[H.m(j,0)])
d=i.gm(i)
if(d>1)throw H.c(new P.z("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.h_("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aS(0,new G.j8(t))
c=J.e(e,q)
p.ah("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ah("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d7(l)
if(b==null)b=C.G
f=new B.eY(b,g.e,g.y)
p.ah(new G.j9(o,f))
p.ah(new G.ja(g))
z=8
x=[1]
return P.d2(P.hA(f),$async$cu,y)
case 8:p.ah("- generating all actions for "+H.b(e.gh()))
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
n.aA(a4)}}p.ah("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d2(null,0,y)
case 2:return P.d2(v,1,y)}})
var z=0,y=P.pZ($async$cu),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rj(y)},
hS:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.D("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gA(z).gaM())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjp())+". Action Records: "+z.aO(0,new G.jj()).cb(0,"<-")))}},
v:{
j0:function(a,b){var z,y,x
z=N.bg("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a2(H.q([],[Y.ac]),0,P.aC())
x.b=b.r
z=new G.j_(z,y,new B.bB(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.S(0,null,null,null,null,null,0,[null,null]))
z.hS(a,b)
return z}}},jj:{"^":"a:0;",
$1:function(a){return a.gaM()}},jm:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},jk:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jl:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jn:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jo:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gV()+"' for "+H.b(this.a.cy)}},jp:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gV()+"' isn't applicable"}},jq:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gV()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jr:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gV()+"' leads to "+H.b(J.aK(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},js:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gV()+"' was scored "+this.b.k(0)}},j3:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j4:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gV()+"' of "+H.b(this.b.gh())}},j5:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jb:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jc:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c3(" ",z.y)+"- "+J.h(z.b)}},jd:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfB().gV()+"'"}},je:{"^":"a:1;a",
$0:function(){var z=this.a.gbF().f
return"- situation: "+H.b(J.iR(z.length!==0?C.a.gA(z):null))}},jf:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcR()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jg:{"^":"a:1;a",
$0:function(){var z=this.a.gbF().d
return"- how we got here: "+new H.ap(z,new G.j2(),[H.m(z,0),null]).cb(0," <- ")}},j2:{"^":"a:0;",
$1:function(a){return a.gaM()}},jh:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},ji:{"^":"a:1;",
$0:function(){return}},j6:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},j7:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j8:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j9:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},ja:{"^":"a:1;a",
$0:function(){var z=this.a.gbF().d
return"- how we got here: "+new H.ap(z,new G.j1(),[H.m(z,0),null]).cb(0," <- ")}},j1:{"^":"a:0;",
$1:function(a){return a.gaM()}}}],["","",,Z,{"^":"",mw:{"^":"d;a,b",
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
case 4:s=z.ir(new Z.mz())
r=z.e7(new Z.mA(),[s])
q=z.e7(new Z.mB(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bC().bL("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bC().bL("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bC().bL("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cp(t,new Z.mC(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.p(m)
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
if(y.length===1)return C.a.gc5(y)
C.a.cp(y,new Z.mD(this,a))
x=this.a.a
w=x.gcn().bl(0,1/0,new Z.mE(a))
v=x.gcn().bl(0,-1/0,new Z.mF(a))
x=J.ak(v)
u=J.ak(w)
t=u.at(w,J.bV(x.at(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bw(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.m0(y.length,new Z.mG(z,this,a,s),!1,P.K)
q=new H.ap(r,new Z.mH(C.a.bl(r,0,Z.uB())),[H.m(r,0),null]).bD(0,!1)
z=C.a.bl(q,0,Z.uC())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.am(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.n_(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
e7:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a3(b,t))continue
if(w==null||J.a7(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
ir:function(a){return this.e7(a,C.d)},
v:{
mx:function(a){var z,y,x
z=a.gcc()
y=H.y(z,"w",0)
x=P.T(new H.J(z,new Z.my(a),[y]),!1,y)
if(x.length===0)$.$get$bC().eT("After removing actions scored by undefined, there are no recommendations.")
return x},
wh:[function(a,b){return J.am(a,b)},"$2","uB",4,0,42],
wi:[function(a,b){return J.am(a,b)},"$2","uC",4,0,43]}},mz:{"^":"a:0;",
$1:function(a){return a.gc4()}},mA:{"^":"a:0;",
$1:function(a){return J.iN(a.gbV())}},mB:{"^":"a:0;",
$1:function(a){return a.gcY()}},mC:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bW(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mD:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bW(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},mE:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d5(a),H.d5(z))}},mF:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d5(a),H.d5(z))}},mG:{"^":"a:10;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.aY(J.bw(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},mH:{"^":"a:0;a",
$1:function(a){return J.iU(J.bV(J.aY(a,this.a),1000))}},my:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkb()}}}],["","",,K,{"^":"",rt:{"^":"a:3;",
$3:function(a,b,c){}},cc:{"^":"d;a,h:b<,c,d,jF:e<,f,bx:r<",
gjD:function(){return this.a},
gw:function(a){return C.b.gw(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.cc&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jG:function(a,b,c){return this.e.$3(a,b,c)},
v:{
M:function(a,b,c,d,e,f,g){var z=new S.P(null,null,[Q.n])
z.ag()
z.l(f)
return new K.cc(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",n:{"^":"d;jy:a<,V:b<,aM:c<,k5:d<"}}],["","",,S,{"^":"",a1:{"^":"d;",
gaC:function(){return C.d},
gbi:function(){return C.d},
geK:function(){return 3},
dN:function(a){return this.az(this.gH(),a)},
h5:function(a,b){},
h6:function(a,b){},
kn:function(a,b){},
dA:function(a){},
d8:function(a){return!0}}}],["","",,S,{"^":"",
fE:function(a){var z=$.$get$bE().ae(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
mZ:function(a,b){var z,y,x,w,v
z=$.$get$bE().km()*b
for(y=new H.dC(a,a.gm(a),0,null,[H.y(a,"aV",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.D("The weights do not add up to total="+b))},
n_:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bE().ae(b)
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
if(x){w=H.q([],[P.u])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.x(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.p(r)
if(x.u(r,"{"))++s
else if(x.u(r,"|")&&s===1)w.push(u)
else if(x.u(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bE().ae(p)
z=z.aF(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
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
ag:function(a,b,c,d){switch($.$get$bE().ae(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ac:{"^":"d;aX:a<,aT:b<,aP:c<,h8:d<,e,ds:f@,hb:r<,h3:x<,f2:y<,jC:z<,hN:Q<,d2:ch<,j0:cx<,ka:cy<,H:db<",
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
return z+(this.cy?"(sup)":"")+">"}},a2:{"^":"d;a,H:b<,c",
geA:function(){return C.a.bS(this.a,new Y.oj())},
aL:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.ba(b).ex(b,".")||C.b.ex(b,"!")||C.b.ex(b,"?"))&&C.b.da(b,P.bj("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ac(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aL(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
W:function(a,b,c){return this.aL(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
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
z=H.b(new Y.oh().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gA(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bR(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gA(b))){z+="."
this.j9(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.o(a,"<also>","also")+" "
w=0}}},
jc:function(a,b,c,d){return this.jd(a,b,c,"and",3,null,null,d)},
er:function(){return this.W(0,"\n\n",!0)},
bR:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.I(a)
z=z.aU(a,"<owner's> "+H.b(b))!==-1||z.aU(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aU(a,"<object-owner's> "+H.b(b))!==-1||z.aU(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.I(a)
if(z.aU(a,"<subject's> "+H.b(b))!==-1||z.aU(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gbC()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.cU(a,b,"the "+H.b(b))
else{w=J.eL(c.gh(),P.bj("[aeiouy]",!1,!1))?z.cU(a,b,"an "+H.b(b)):z.cU(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
ey:function(a,b){var z,y
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
dM:function(a){var z=this
return P.aP(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dM(b,c){if(b===1){v=c
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
cQ:[function(a){var z=J.ak(a)
if(z.aR(a,0)||z.bN(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaP()}},"$1","gaP",2,0,22],
ko:function(a,b){var z
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.ey(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf2()}return!1},
h7:function(a){var z
for(z=!1;this.geA();z=!0){a.$1(this.hc(!0))
this.kw()}return z},
hc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bl(z,[],new Y.ok())
C.a.iM(z,new Y.ol(y),!1)
x=a&&this.geA()?C.a.aU(z,C.a.dv(z,new Y.om()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ey(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gds())n=this.ko(s,p)&&this.hM(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gds()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sds(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].ghN()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjC()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd2())if(this.dk(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gds()}else n=!1
n=n||this.kM(s)>4}else n=!0
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
u=!1}else if(t){r+=S.fE([" but "," but ",", but "])
u=!this.hz(s,s+1)&&!0}else{r+=S.fE([" and "," and ",", and "])
u=!0}}m=this.dV(s)
l=S.cQ(m)
p=J.I(l)
if(p.a3(l,"{")===!0||p.a3(l,"}")===!0)$.$get$ik().dR('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dk(s,k)&&J.eL(this.dV(k),"<subject> ")&&p.da(l,"<subject> ")}else k=!1
if(k)l=p.cU(l,"<subject> ","")
j=J.dd(l,"<action>",this.dV(s))
p=s-1
k=this.iP(s,p)
if(k)k=!(this.cQ(s).ga2()===C.r&&this.bh(s).ga2()===C.r)
else k=!1
if(k){j=H.o(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.o(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.o(j,"<object>","<objectPronounAccusative>")
j=H.o(j,"<object's>","<objectPronoun's>")}k=this.dk(s,p)
if(k){j=H.o(j,"<owner's> <subject>","<subjectPronoun>")
j=H.o(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.o(j,"<subject>","<subjectPronoun>")
j=H.o(j,"<subject's>","<subjectPronoun's>")}if(this.cQ(p)!=null)if(this.bh(s)!=null)if(this.bh(p)!=null){k=this.cQ(p)
k=k==null?k:k.gi()
i=this.bh(s)
if(J.e(k,i==null?i:i.gi())){k=this.bh(p)
k=k==null?k:k.ga2()
i=this.bh(s)
k=!J.e(k,i==null?i:i.ga2())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.o(j,"<owner's> <subject>","<subjectPronoun>")
j=H.o(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.o(j,"<subject>","<subjectPronoun>")
j=H.o(j,"<subject's>","<subjectPronoun's>")}if(this.bh(p)!=null)if(this.cQ(s)!=null){k=this.bh(p)
k=k==null?k:k.gi()
i=this.cQ(s)
if(J.e(k,i==null?i:i.gi())){p=this.bh(p)
p=p==null?p:p.ga2()
k=this.bh(s)
p=!J.e(p,k==null?k:k.ga2())}else p=!1}else p=!1
else p=!1
if(p){j=H.o(j,"<object-owner's> <object>","<objectPronoun>")
j=H.o(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.o(j,"<object>","<objectPronounAccusative>")
j=H.o(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gaT()
g=p.gaP()
f=p.gh8()
e=p.e
k=h!=null
if(k){if(h.gF()===!0){d=H.o(j,"<subject>","<subjectPronoun>")
d=H.o(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga2()===C.C||h.ga2()===C.a1){d=H.o(d,"<s>","")
d=H.o(d,"<es>","")
d=H.o(d,"<sses>","ss")
d=H.o(d,"<ies>","y")
d=H.o(d,"<does>","do")
d=H.o(d,"<is>","are")
d=H.o(d,"<has>","have")}else{d=H.o(d,"<s>","s")
d=H.o(d,"<es>","es")
d=H.o(d,"<sses>","sses")
d=H.o(d,"<ies>","ies")
d=H.o(d,"<does>","does")
d=H.o(d,"<is>","is")
d=H.o(d,"<has>","has")}d=H.iD(d,"<subject>","<subjectNoun>",0)
i=h.ga2().a
d=H.o(d,"<subject>",i)
i=p.db
d=J.cr(this.bR(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga2().a
d=H.o(d,"<subjectPronoun>",c)
if(C.b.a3(j,P.bj("<subject>.+<subject's>",!0,!1))){c=h.ga2().c
d=H.o(d,"<subject's>",c)}d=J.cr(this.bR(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga2().c
d=H.o(d,"<subject's>",i)
i=h.ga2().b
d=H.o(d,"<subjectPronounAccusative>",i)
i=h.ga2().d
d=H.o(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gbC()===!0){d=H.o(d,"<subject's> <object>","<object>")
d=H.o(d,"<subjectPronoun's> <object>","<object>")}if(g.gF()===!0){d=H.o(d,"<object>","<objectPronoun>")
d=H.o(d,"<object's>","<objectPronoun's>")}else d=J.dd(this.bR(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga2().b
d=H.o(d,"<objectPronoun>",i)
if(C.b.a3(j,P.bj("<object>.+<object's>",!0,!1))){i=g.ga2().c
d=H.o(d,"<object's>",i)}d=J.cr(this.bR(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga2().c
d=H.o(d,"<object's>",i)
i=g.ga2().c
d=H.o(d,"<objectPronoun's>",i)
i=g.ga2().b
d=H.o(d,"<objectPronounAccusative>",i)
i=g.ga2().a
d=H.o(d,"<objectPronounNominative>",i)}if(k){k=h.ga2().c
d=H.o(d,"<subjectPronoun's>",k)}p=p.db
j=this.fu(e,this.fu(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oi(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd2())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd2()?r+".":r
return H.vL(z.charCodeAt(0)==0?z:z,$.$get$fZ(),new Y.on(),null)},
ci:function(){return this.hc(!1)},
kw:function(){var z,y
if(!this.geA()){C.a.sm(this.a,0)
return}z=this.a
y=C.a.aU(z,C.a.dv(z,new Y.oo()))+1
P.ca(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hz:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.ey(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gf2()}if(!this.dk(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghb()){if(b>=z.length)return H.f(z,b)
y=z[b].ghb()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].gh3()){if(b>=z.length)return H.f(z,b)
z=z[b].gh3()}else z=!1
if(z)return!0
else return!1},
hM:function(a,b){var z,y,x,w,v
if(!this.aQ(a)||!this.aQ(b))return!1
for(z=new P.b6(this.dM(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b6(this.dM(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gG()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
dV:[function(a){var z=J.ak(a)
if(z.aR(a,0)||z.bN(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaX()}},"$1","gaX",2,0,13],
bh:[function(a){var z=J.ak(a)
if(z.aR(a,0)||z.bN(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaT()}},"$1","gaT",2,0,22],
kM:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gH()!=null){y=a-1
if(this.aQ(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gH()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gH()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gH()
if(typeof y!=="number")return y.at()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.ci()},
aQ:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fu:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gF()===!0?H.o(H.o(b,d,"you"),e,"your"):J.dd(this.bR(b,d,a,null,h),d,a.gh())
z=H.o(z,f,a.ga2().a)
z=H.o(H.o(J.cr(this.bR(C.b.a3(c,P.bj(d+".+"+e,!0,!1))?H.o(z,e,a.ga2().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga2().c),g,a.ga2().c)}else z=H.o(H.o(H.o(H.o(b,d,""),e,""),f,""),g,"")
return z},
iP:function(a,b){var z,y
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
dk:function(a,b){var z,y
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
oi:function(a){var z,y,x
z=!C.b.a3(a,"\n\n")?C.b.kR(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bG(z,1)}}},oj:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),"\n\n")}},oh:{"^":"a:23;",
$1:function(a){return C.b.eS(H.o(H.o(a,"<also> ",""),"  "," "))}},ok:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.I(a)
y=z.gaq(a)?z.gA(a):null
if(y!=null&&y.gka()&&J.e(b.gj0(),y.cx)){x=z.gm(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.q(a,b)
return a}},ol:{"^":"a:31;a",
$1:function(a){return J.eH(this.a,a)}},om:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),"\n\n")}},on:{"^":"a:28;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oo:{"^":"a:0;",
$1:function(a){return J.e(a.gaX(),"\n\n")}},bd:{"^":"me;bC:a<,h:b<,c,be:d<,F:e<,a2:f<",
gi:function(){return H.aD(this)},
gca:function(){return!0},
gbm:function(){return!0},
v:{
dm:function(a,b,c,d,e){var z=H.q([],[P.t])
return new Y.bd(c,b,z,e==null?$.$get$bT():e,!1,d)}}},me:{"^":"d+dn;"},dn:{"^":"d;",
gaV:function(){return this.gbm()&&this.gca()===!0},
ac:function(a,b,c,d,e,f,g,h,i,j,k,l){J.iO(a,b,c,d,e,f,g,h,i,j,H.Q(this,"$isbd"),!1,l)},
ak:function(a,b){return this.ac(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
aw:function(a,b,c){return this.ac(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
dF:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
ao:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
hh:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,null,!1,!1,d)},
bY:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cW:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
ck:function(a,b,c,d,e){return this.ac(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
ay:function(a,b,c){return this.ac(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
cj:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eM:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bs:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
cj:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
hf:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
eN:function(a,b,c,d,e){return this.ac(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
kC:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
he:function(a,b,c,d){return this.ac(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kF:function(a,b,c,d,e,f){return this.ac(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
bZ:function(a,b,c,d,e){return this.ac(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
hd:function(a,b,c){return this.ac(a,b,c,!1,!1,!1,!1,null,null,!1,!1,!1)},
kB:function(a,b,c,d){return this.ac(a,b,c,!1,!1,!1,!1,d,null,!1,!1,!1)},
hg:function(a,b,c,d){return this.ac(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kE:function(a,b,c,d,e){return this.ac(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kG:function(a,b,c,d,e,f){return this.ac(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eM:function(a,b,c,d){return this.ac(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kD:function(a,b,c,d){return this.ac(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c8:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",td:{"^":"a:0;",
$1:function(a){a.gcE().b=2
return 2}},ti:{"^":"a:0;",
$1:function(a){a.gcE().b=0
return 0}},tc:{"^":"a:0;",
$1:function(a){a.gcE().b=1
return 1}},ha:{"^":"d;"},pO:{"^":"ha;i:a<",
Y:function(a){var z=new L.bm(null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.ha))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gw:function(a){return Y.O(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
e6:function(a){var z=new L.bm(null,null)
a.$1(z)
return z.p()}}},bm:{"^":"d;a,b",
gi:function(){return this.gcE().b},
gcE:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcE().b
z=new L.pO(y)
if(y==null)H.i(P.l("id"))}this.l(z)
return z}}}],["","",,X,{"^":"",
hU:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hU(c,d){if(c===1){v=d
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
case 1:return P.aO(v)}}})}}],["","",,A,{"^":"",a9:{"^":"d;dm:a<,bX:b<,c,d,e,f,H:r<,x",
gjp:function(){var z=this.f
return z.length!==0?C.a.gA(z):null},
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
z=J.p(b)
return!!z.$isa9&&this.gw(this)===z.gw(b)},
fC:function(a){var z,y
z=this.hy(a,!0)
y=z.gX(z)
if(y.t()){y.gG()
return!0}return!1},
bJ:function(a){var z,y
z=this.hx(a)
y=z.gX(z)
if(y.t()){y.gG()
return!0}return!1},
j_:function(a){var z=this.x
if(z==null)return!1
return C.b.a3(z.gh(),a)},
fP:function(a){var z,y,x
z=this.dg(a)
if(z==null)throw H.c(new P.z("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ap()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ap:function(){++this.r},
dL:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dW(0,new A.pk(a))
if(b!=null)z=z.c2(0,new A.pl(b))
if(c!=null)z=z.c2(0,new A.pm(c))
if(e!=null)z=z.c2(0,new A.pn(e))
return d!=null?z.c2(0,new A.po(d)):z},
hy:function(a,b){return this.dL(a,null,null,null,b)},
hx:function(a){return this.dL(a,null,null,null,null)},
a0:function(a){return this.a.aS(0,new A.pp(a))},
dP:function(a){return this.e.aS(0,new A.pq(a))},
eV:function(a){var z,y
z=this.dg(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
af:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.D("No situation with name="+a+" found."))},
jR:function(a){var z=this.a.bc(0,new A.pr(a),new A.ps())
if(z==null)return!1
return z.gbm()},
av:function(){var z,y
z=this.f
y=C.a.gA(z)
y.dA(this)
C.a.a9(z,y)},
bq:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gA(z).gh(),a)))break
y=C.a.gA(z)
y.dA(this)
C.a.a9(z,y)}if(z.length===0)throw H.c(P.D("Tried to pop situations until "+a+" but none was found in stack."))},
cV:function(a,b){var z,y
z=this.dg(a)
if(z==null)throw H.c(P.D("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dG:function(a,b,c,d,e){var z,y,x,w
z=this.dL(a,b,c,d,e)
y=z.gX(z)
if(y.t()){x=y.gG()
y=this.r
w=x.gH()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kL:function(a,b,c){return this.dG(null,a,b,c,null)},
c0:function(a,b,c){return this.dG(a,null,b,null,c)},
kK:function(a,b,c){return this.dG(a,b,null,null,c)},
kJ:function(a){return this.dG(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ee()
y.ar(0,z)
return"World<"+P.c3(y,"{","}")+">"},
Z:function(a,b){var z,y,x
z=this.a0(a)
y=z.Y(b)
x=this.a
x.a9(0,z)
x.q(0,y)},
dg:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
i0:function(a){this.a.ar(0,a.a)
this.d.ar(0,a.d)
this.b.ar(0,a.b)
this.e.ar(0,a.e)
C.a.ar(this.f,a.f)
this.r=a.r},
v:{
e4:function(a){var z,y,x,w
z=P.a0(null,null,null,R.H)
y=P.b3(null,O.cs)
x=P.a0(null,null,null,U.as)
w=P.a0(null,null,null,null)
w=new A.a9(z,x,a.c,y,w,[],null,null)
w.i0(a)
return w}}},pk:{"^":"a:0;a",
$1:function(a){return a.gep()===this.a}},pl:{"^":"a:0;a",
$1:function(a){return J.e(a.gcT(),this.a.gi())}},pm:{"^":"a:0;a",
$1:function(a){return a.gf3().a3(0,this.a.gi())}},pn:{"^":"a:0;a",
$1:function(a){return a.ght()===this.a}},po:{"^":"a:0;a",
$1:function(a){return a.ghr()===this.a}},pp:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pq:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pr:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},ps:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",a8:{"^":"aa;a1:b<"},bG:{"^":"a8;c,V:d<,K:e<,h:f<,b,a",
R:[function(a,b,c){throw H.c(new P.z("SimpleAction always succeeds"))},"$3","gN",6,0,2],
S:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gO",6,0,2],
ad:function(a,b){throw H.c(new P.z("SimpleAction shouldn't have to provide roll reason"))},
J:function(a,b){return 1},
gL:function(){return!1},
I:function(a,b){return!0},
gM:function(){return H.i(new P.z("Not rerollable"))},
gP:function(){return!1}}}],["","",,N,{"^":"",jU:{"^":"E;L:c<,a1:d<,K:e<,P:f<,M:r<,b,a",
gam:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gan:function(){return"will <subject> confuse <object>?"},
R:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ao(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eM(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bs(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ay(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 0.6},
I:function(a,b){var z
if(a.gF()===!0)if(a.ga8()){z=b.a
z=new H.J(z,new N.jV(this),[H.m(z,0)])
z=z.gm(z)>=2&&!this.b.eD(b)}else z=!1
else z=!1
return z},
v:{
vW:[function(a){return new N.jU(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tD",2,0,5]}},jV:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbm()){z=a.gbe()
y=this.a.b.gbe()
z=z.a
y=y.gi()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",kh:{"^":"E;P:c<,M:d<,L:e<,a1:f<,K:r<,b,a",
gam:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gan:function(){return"will <subject> kick the weapon off?"},
R:[function(a,b,c){S.ag(new V.ki(this,a,c),new V.kj(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
S.ag(new V.kk(this,a,c),new V.kl(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gA(z):null
b.cV(y.gi(),y.Y(new V.km(this)))
z=this.b
b.Z(z.gi(),new V.kn())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gO",6,0,2],
J:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z
if(a.ga8()||a.dx===C.i){z=this.b
z=z.ga4()&&!z.gb5()}else z=!1
return z},
v:{
vZ:[function(a){return new V.kh(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tU",2,0,5]}},ki:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aw(y,"<subject> mi<sses>",!0)}},kj:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> weapon",y)
y.aw(z,"<subject> hold<s> onto it",!0)}},kk:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kG(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga_(),z,!0)}},kl:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.dn(0,"<owner's> <subject> fl<ies> away",y,y.ga_())}},km:{"^":"a:26;a",
$1:function(a){a.gbK().q(0,this.a.b.ga_())
return a}},kn:{"^":"a:0;",
$1:function(a){a.sa_($.$get$eq())
return a}}}],["","",,R,{"^":"",lL:{"^":"E;P:c<,M:d<,L:e<,a1:f<,K:r<,b,a",
gh:function(){return"KickToGround"},
gam:function(){return"kick <object> to the ground"},
gan:function(){return"will <subject> kick <object> prone?"},
R:[function(a,b,c){S.ag(new R.lM(this,a,c),new R.lN(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gN",6,0,2],
S:[function(a,b,c){var z
S.ag(new R.lO(this,a,c),new R.lP(this,a,c,b.af("FightSituation").gbx()),null,null)
z=this.b
b.Z(z.gi(),new R.lQ())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gO",6,0,2],
J:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
I:function(a,b){return(a.ga8()||a.dx===C.i)&&!this.b.ga4()},
v:{
wc:[function(a){return new R.lL(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","us",2,0,5]}},lM:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ao(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aw(y,"<subject> mi<sses>",!0)}},lN:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ao(z,"<subject> kick<s> <object's> shin",y)
y.aw(z,"<subject> <does>n't budge",!0)}},lO:{"^":"a:1;a,b,c",
$0:function(){this.b.kE(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},lP:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bs(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ak(z,"<subject> {grunt|shriek}<s>")
y.ay(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lQ:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,F,{"^":"",mv:{"^":"aa;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Stand off."},
gh:function(){return"Pass"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gF()===!0)a.ak(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return!0}}}],["","",,Y,{"^":"",mJ:{"^":"E;P:c<,M:d<,L:e<,a1:f<,K:r<,b,a",
gam:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gan:function(){return"will <subject> force <object> off balance?"},
R:[function(a,b,c){var z=this.b
a.hg(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
z.bY(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.hg(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga_(),z)
if(z.ga8()){z.hf(c,"<subject> lose<s> <object>",!0,$.$get$eo())
b.Z(z.x,new Y.mK())
C.a.q(b.f,U.mf(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gaN()){z.ak(c,"<subject> <is> already off balance")
c.fE(0,"<subject> make<s> <object> fall to the "+H.b(b.af("FightSituation").gbx()),z,$.$get$iu())
b.Z(z.x,new Y.mL())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.z("enemy pose must be either standing or off-balance"))},"$3","gO",6,0,2],
J:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z,y
if(!a.ga4()){z=a.d
if(z.gbd()||z.gk8()){z=this.b
if(!z.ga_().gcI()){z.ga_().gfI()
y=!1}else y=!0
z=y&&!z.ga4()}else z=!1}else z=!1
return z},
v:{
wj:[function(a){return new Y.mJ(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uD",2,0,5]}},mK:{"^":"a:0;",
$1:function(a){a.saj(C.i)
return a}},mL:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,B,{"^":"",n6:{"^":"aa;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gF()===!0)a.bs(c,"<subject> regain<s> <object>",$.$get$eo(),!0)
b.Z(a.gi(),new B.n7())
return H.b(a.gh())+" regains balance"},"$3","gO",6,0,2],
ad:function(a,b){return"Will "+a.ga2().a+" regain balance?"},
J:function(a,b){return 1},
I:function(a,b){return a.gaN()}},n7:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,O,{"^":"",nl:{"^":"aa;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Scramble."},
gh:function(){return"Scramble"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gO",6,0,2],
ad:function(a,b){return"Will "+a.ga2().a+" crawl out of harm's way?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga4())return!1
if(A.db(a,b))return!0
return!1}}}],["","",,Q,{"^":"",o6:{"^":"aa;K:b<,L:c<,a1:d<,P:e<,M:f<,a",
gV:function(){return"Stand up."},
gh:function(){return"StandUp"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ak(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.ag(new Q.o7(a,c),new Q.o8(a,c),null,null)
b.Z(a.gi(),new Q.o9())
return H.b(a.gh())+" stands up"},"$3","gO",6,0,2],
ad:function(a,b){return"Will "+a.ga2().a+" stand up?"},
J:function(a,b){return 1},
I:function(a,b){if(!a.ga4())return!1
if(A.db(a,b))return!1
return!0}},o7:{"^":"a:1;a,b",
$0:function(){return this.a.ak(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},o8:{"^":"a:1;a,b",
$0:function(){return this.a.ak(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},o9:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,T,{"^":"",
wJ:[function(a){return new A.ah(T.eA(),null,null,new T.uK(),new T.uL(),new T.uM(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vy",2,0,5],
wK:[function(a){return new A.ah(T.eA(),new T.uN(),T.eA(),new T.uO(),new T.uP(),new T.uQ(),new T.uR(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vz",2,0,5],
wL:[function(a,b,c,d,e){a.ao(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Z(a.gi(),new T.uS())},"$5","eA",10,0,8],
uK:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga4()&&a.gb5()&&c.gb5()}},
uL:{"^":"a:3;",
$3:function(a,b,c){return Y.eT(a,c)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return S.dL(a,c,C.l)}},
uO:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga4()&&a.gb5()&&c.gb5()}},
uP:{"^":"a:3;",
$3:function(a,b,c){return Y.eT(a,c)}},
uQ:{"^":"a:3;",
$3:function(a,b,c){return S.dL(a,c,C.m)}},
uN:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uR:{"^":"a:3;",
$3:function(a,b,c){return S.dL(a,c,C.p)}},
uS:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,A,{"^":"",ah:{"^":"E;c,d,e,f,r,x,y,z,K:Q<,L:ch<,a1:cx<,h:cy<,P:db<,M:dx<,am:dy<,an:fr<,b,a",
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
wM:[function(a){return new A.ah(M.eB(),null,null,new M.uT(),new M.uU(),new M.uV(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vA",2,0,5],
wN:[function(a){return new A.ah(M.eB(),new M.uW(),M.eB(),new M.uX(),new M.uY(),new M.uZ(),new M.v_(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","vB",2,0,5],
wO:[function(a,b,c,d,e){if(a.ga4()){a.hd(c,"<subject> roll<s>",e.gi())
a.hd(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kB(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eB",10,0,8],
uT:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&!c.ga4()&&!A.db(a,b)}},
uU:{"^":"a:3;",
$3:function(a,b,c){return F.fg(a,c)}},
uV:{"^":"a:3;",
$3:function(a,b,c){return V.dz(a,c,C.l)}},
uX:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&!c.ga4()&&!A.db(a,b)}},
uY:{"^":"a:3;",
$3:function(a,b,c){return F.fg(a,c)}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return V.dz(a,c,C.m)}},
uW:{"^":"a:3;",
$3:function(a,b,c){return a.ga8()?0.4:0.2}},
v_:{"^":"a:3;",
$3:function(a,b,c){return V.dz(a,c,C.p)}}}],["","",,U,{"^":"",
wP:[function(a){return new A.ah(U.eC(),null,null,new U.v0(),new U.v1(),new U.v2(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","vC",2,0,5],
wQ:[function(a){return new A.ah(U.eC(),new U.v3(),U.eC(),new U.v4(),new U.v5(),new U.v6(),new U.v7(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vD",2,0,5],
wR:[function(a,b,c,d,e){c.j8(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eC",10,0,8],
v0:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()!==!0)z=(a.ga8()||a.dx===C.i)&&!c.ga4()&&a.gb5()
else z=!1
return z}},
v1:{"^":"a:3;",
$3:function(a,b,c){return Q.fD(a,c)}},
v2:{"^":"a:3;",
$3:function(a,b,c){return Z.dT(a,c,C.l)}},
v4:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()===!0)z=(a.ga8()||a.dx===C.i)&&!c.ga4()&&a.gb5()
else z=!1
return z}},
v5:{"^":"a:3;",
$3:function(a,b,c){return Q.fD(a,c)}},
v6:{"^":"a:3;",
$3:function(a,b,c){return Z.dT(a,c,C.m)}},
v3:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v7:{"^":"a:3;",
$3:function(a,b,c){return Z.dT(a,c,C.p)}}}],["","",,G,{"^":"",
wS:[function(a){return new A.ah(G.eD(),null,null,new G.va(),new G.vb(),new G.vc(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","vE",2,0,5],
wX:[function(a){return new A.ah(G.eD(),new G.vl(),G.eD(),new G.vm(),new G.vn(),new G.vo(),new G.vp(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vF",2,0,5],
wY:[function(a,b,c,d,e){return a.eN(c,"<subject> swing<s> {"+H.b(U.ae(a))+" |}at <object>",e.gi(),!0,d)},"$5","eD",10,0,8],
va:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga8()&&!c.ga4()&&a.d.gbd()}},
vb:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga8()&&!c.ga4()&&a.d.gbd()}},
vn:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vo:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
vl:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vp:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.p)}}}],["","",,R,{"^":"",
wT:[function(a,b,c,d,e){return a.hf(c,"<subject> completely miss<es> <object> with "+H.b(U.ae(a)),!0,d)},"$5","iB",10,0,12],
wU:[function(a){return new A.ah(R.iC(),new R.vd(),R.iB(),new R.ve(),new R.vf(),new R.vg(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vG",2,0,5],
wV:[function(a){return new A.ah(R.iC(),new R.vh(),R.iB(),new R.vi(),new R.vj(),new R.vk(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vH",2,0,5],
wW:[function(a,b,c,d,e){return a.eN(c,"<subject> swing<s> {"+H.b(U.ae(a))+" |}at <object>",e.gi(),!0,d)},"$5","iC",10,0,8],
ve:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gaN()&&!c.ga4()&&a.d.gbd()}},
vf:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vg:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
vd:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vi:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gaN()&&!c.ga4()&&a.d.gbd()}},
vj:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
vh:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
wZ:[function(a){return new A.ah(D.eE(),null,null,new D.vq(),new D.vr(),new D.vs(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vI",2,0,5],
x_:[function(a){return new A.ah(D.eE(),new D.vt(),D.eE(),new D.vu(),new D.vv(),new D.vw(),new D.vx(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","vJ",2,0,5],
x0:[function(a,b,c,d,e){return a.ao(c,"<subject> strike<s> down {with "+H.b(U.ae(a))+" |}at <object>",d)},"$5","eE",10,0,12],
vq:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga4()&&!a.ga4()&&a.d.gbd()}},
vr:{"^":"a:3;",
$3:function(a,b,c){return D.h0(a,c)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.l)}},
vu:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga4()&&!a.ga4()&&a.d.gbd()}},
vv:{"^":"a:3;",
$3:function(a,b,c){return D.h0(a,c)}},
vw:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.m)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vx:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.p)}}}],["","",,M,{"^":"",oL:{"^":"cI;a1:c<,b,a",
gK:function(){return"A different weapon might change the battle."},
gL:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gP:function(){return!1},
gM:function(){return},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gA(z):null
b.cV(y.gi(),y.Y(new M.oM(this)))
b.Z(a.gi(),new M.oN(this,a))
z=this.b
a.ao(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gO",6,0,2],
ad:function(a,b){return H.i(new P.ad(null))},
J:function(a,b){return 1},
I:function(a,b){var z,y,x
z=this.b
if(!(z instanceof L.b5))return!1
a.gji()
z=z.gaa()
y=a.d.gaa()
if(typeof y!=="number")return H.x(y)
if(z<=y)return!1
x=b.c0("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
v:{
wn:[function(a){return new M.oL(!0,a,null)},"$1","vN",2,0,47]}},oM:{"^":"a:26;a",
$1:function(a){a.gbK().a9(0,this.a.b)
return a}},oN:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb5())a.gbX().q(0,a.ga_())
a.sa_(H.Q(this.a.b,"$isb5"))}}}],["","",,M,{"^":"",pi:{"^":"aa;K:b<,P:c<,M:d<,L:e<,a1:f<,a",
gV:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){a.ak(c,"<subject> shake<s> <subject's> head violently")
if(a.gF()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kD(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z
if(a.eD(b)){z=b.c0("Confuse",a,!0)
if(typeof z!=="number")return z.b7()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",la:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.Z(z.gi(),new R.lb())
if(J.e(z.gi(),100))a.bs(c,"<subject> smash<es> <object's> head to the ground",z,!0)
else a.bs(c,"<subject> break<s> <object's> neck",z,!0)
X.co(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
w3:[function(a){return new R.la(null,!0,!0,!0,C.c,a,null)},"$1","u0",2,0,5]}},lb:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}}}],["","",,Y,{"^":"",
eT:function(a,b){var z=new Y.dg(null,null,null,null,null)
new Y.tv(a,b).$1(z)
return z.p()},
eS:{"^":"a1;",
gaC:function(){return[R.u0()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ap:function(){var z=new Y.dg(null,null,null,null,null)
z.l(this)
new Y.jI().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new Y.jJ(this),[H.m(a,0)])}},
tv:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gi()
a.gaY().b=z
z=this.b.gi()
a.gaY().d=z
return a}},
jI:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.a7()
a.gaY().e=z+1
return a}},
jJ:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pw:{"^":"eS;a,i:b<,c,H:d<",
Y:function(a){var z=new Y.dg(null,null,null,null,null)
z.l(this)
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new Y.pw(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",kU:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gan:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {dodge it|break free}")
S.ag(new Z.kV(a,c),new Z.kW(this,a,c),null,null)
b.av()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.bq("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gA(z):null).gbr().bp(0.5)},
I:function(a,b){return!0},
v:{
w2:[function(a){return new Z.kU("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tY",2,0,5]}},kV:{"^":"a:1;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {can't|fail<s>}",!0)}},kW:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dL:function(a,b,c){var z=new S.dK(null,null,null,null,null,null)
new S.tu(a,b,c).$1(z)
return z.p()},
ft:{"^":"c_;",
gaC:function(){return[Z.tY()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ap:function(){var z=new S.dK(null,null,null,null,null,null)
z.l(this)
new S.mp().$1(z)
return z.p()}},
tu:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
mp:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.a7()
a.gaK().f=z+1
return a}},
pF:{"^":"ft;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new S.dK(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.ft))return!1
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new S.pF(y,x,w,v,u)
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
ae:function(a){return a.ga_().gbC()===!0?a.ga_().gh():"<subject's> "+H.b(a.ga_().gh())}}],["","",,G,{"^":"",
wx:[function(a,b,c,d,e){a.ak(c,"<subject> tr<ies> to swing back")
a.eM(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.Z(a.x,new G.tG())
a.cj(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.Z(a.x,new G.tH())
a.ay(c,"<subject> lose<s> balance because of that",!0)
a.cj(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","i0",10,0,12],
wy:[function(a){return new A.ah(G.i1(),new G.tI(),G.i0(),new G.tJ(),new G.tK(),new G.tL(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tQ",2,0,5],
wA:[function(a,b,c,d,e){return a.ao(c,"<subject> swing<s> back",d)},"$5","i1",10,0,8],
wz:[function(a){return new A.ah(G.i1(),new G.tM(),G.i0(),new G.tN(),new G.tO(),new G.tP(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tR",2,0,5],
tG:{"^":"a:0;",
$1:function(a){a.saj(C.i)
return a}},
tH:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},
tJ:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga_().gbd()&&!a.ga4()}},
tK:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
tL:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.l)}},
tI:{"^":"a:3;",
$3:function(a,b,c){return c.ga8()?0.7:0.9}},
tN:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga_().gbd()&&!a.ga4()}},
tO:{"^":"a:3;",
$3:function(a,b,c){return M.bH(a,c)}},
tP:{"^":"a:3;",
$3:function(a,b,c){return L.bl(a,c,C.m)}},
tM:{"^":"a:3;",
$3:function(a,b,c){return c.ga8()?0.7:0.9}}}],["","",,V,{"^":"",k2:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gan:function(){return"will <subject> tackle <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to tackle <object>",z)
S.ag(new V.k3(a,c),new V.k4(this,c),null,null)
a.ao(c,"<subject> land<s> on the "+H.b(U.et(b))+" next to <object>",z)
b.Z(a.gi(),new V.k5())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tackle<s> <object> to the ground",z)
b.Z(z.gi(),new V.k6())
b.Z(a.gi(),new V.k7())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z=this.b.gaN()?0.2:0
if(a.gF()===!0)return 0.7+z
return 0.5+z},
I:function(a,b){return!a.ga4()&&a.d instanceof K.c1},
v:{
vX:[function(a){return new V.k2("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tS",2,0,5]}},k3:{"^":"a:1;a,b",
$0:function(){return this.a.aw(this.b,"<subject> go<es> wide",!0)}},k4:{"^":"a:1;a,b",
$0:function(){return this.a.b.aw(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k5:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},k6:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},k7:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,S,{"^":"",
dk:function(a,b){var z=new S.dj(null,null,null,null,null)
new S.tl(a,b).$1(z)
return z.p()},
eZ:{"^":"a1;",
gaC:function(){return[G.tQ(),G.tR(),V.tS()]},
gbi:function(){return[$.$get$dN()]},
gh:function(){return"CounterAttackSituation"},
ap:function(){var z=new S.dj(null,null,null,null,null)
z.l(this)
new S.k0().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new S.k1(this),[H.m(a,0)])}},
tl:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaZ().c=z
a.gaZ().e=0
z=this.a.gi()
a.gaZ().b=z
z=this.b.gi()
a.gaZ().d=z
return a}},
k0:{"^":"a:0;",
$1:function(a){var z=a.gaZ().e
if(typeof z!=="number")return z.a7()
a.gaZ().e=z+1
return a}},
k1:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
px:{"^":"eZ;a,i:b<,c,H:d<",
Y:function(a){var z=new S.dj(null,null,null,null,null)
z.l(this)
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new S.px(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,X,{"^":"",
co:function(a,b,c){var z,y,x
z=b.af("FightSituation")
y=z.gbx()
x=!J.e(c.gi(),100)
b.cV(z.gi(),z.Y(new X.ut(c,x)))
if(c.gaj()===C.f){c.ay(a,"<subject> stop<s> moving",!0)
a.W(0,"\n\n",!0)
return}switch($.$get$hL().ae(3)){case 0:c.cj(a,"<subject> collapse<s>"+(x?", dead":""),!0,!0)
break
case 1:c.ay(a,"<subject> fall<s> backward",!0)
c.ay(a,"<subject> twist<s>",!0)
c.cj(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ay(a,"<subject> drop<s> to <subject's> knees",!0)
c.ay(a,"<subject> keel<s> over",!0)
break}a.W(0,"\n\n",!0)},
ut:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!z.gb5()&&this.b)a.gbK().q(0,z.d)
return a}}}],["","",,O,{"^":"",c_:{"^":"nO;",
az:function(a,b){if(a===0)return b.a0(this.gcl())
return},
aE:function(a,b){return new H.J(a,new O.kc(this),[H.m(a,0)])}},nO:{"^":"a1+mM;"},kc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcG())||J.e(a.gi(),z.gcl())}}}],["","",,U,{"^":"",
et:function(a){return a.af("FightSituation").gbx()},
cG:function(a,b,c,d,e){var z=new U.c0(null,null,null,null,null,null,null,null,null)
new U.rw(a,b,c,d,e).$1(z)
return z.p()},
cF:{"^":"a1;",
gaC:function(){return[N.tD(),V.tU(),R.us(),Y.uD(),T.vy(),T.vz(),M.vA(),M.vB(),U.vC(),U.vD(),G.vE(),G.vF(),D.vI(),D.vJ(),R.vG(),R.vH(),M.vN()]},
gbi:function(){return H.q([$.$get$fG(),$.$get$fY(),$.$get$fK(),$.$get$hs()],[Q.aa])},
geK:function(){return 1000},
gh:function(){return"FightSituation"},
cH:function(a,b){var z=b.a
return(z&&C.a).bS(z,new U.kY(a))},
ap:function(){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.l(this)
new U.kZ().$1(z)
return z.p()},
az:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hU(this.f,this.b)
y=H.bA(z,new U.l_(b),H.y(z,"w",0),null)
x=H.y(y,"w",0)
w=P.T(new H.J(y,new U.l0(),[x]),!1,x)
x=H.m(w,0)
v=P.T(new H.J(w,new U.l1(),[x]),!1,x)
u=v.length===1?C.a.gc5(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.bc(0,new U.l2(q),new U.l3())
o=p==null?p:p.gH()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.bc(0,new U.l4(q),new U.l5())
k=l==null?l:l.gH()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gF()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aE:function(a,b){return new H.J(a,new U.l6(this),[H.m(a,0)])},
h6:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a6(z))y.j(0,z).$2(a,b)},
dA:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cH(a,this.b)&&this.cH(a,this.f)){y=a.eV(z)
a.cV(y.gi(),y.Y(new U.l7()))
for(z=this.f,x=z.a,x=new J.bb(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.a0(v).gaV()){u=a.a0(v)
t=u.Y(new U.l8())
w.a9(0,u)
w.q(0,t)}}C.a.q(a.f,X.m3(z,this.d,this.a,null))}else this.cH(a,this.f)},
d8:function(a){var z=this.f
if(this.cH(a,z))if(this.cH(a,this.b)){z=z.a
z=(z&&C.a).bS(z,new U.l9(a))}else z=!1
else z=!1
return z}},
rw:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$Y().ae(1073741823)
a.gal().f=z
a.gal().y=0
z=a.gal()
y=z.r
if(y==null){y=new S.P(null,null,[P.u])
y.ag()
y.l(C.d)
z.r=y
z=y}else z=y
z.l(J.eK(this.a,new U.r7()))
z=a.gal()
y=z.c
if(y==null){y=new S.P(null,null,[P.u])
y.ag()
y.l(C.d)
z.c=y
z=y}else z=y
y=this.b
z.l(new H.ap(y,new U.r8(),[H.m(y,0),null]))
a.gal().e=this.c
y=new S.P(null,null,[U.as])
y.ag()
y.l(C.d)
a.gal().b=y
y=this.d.gi()
a.gal().x=y
y=new A.cL(null,null,[P.u,{func:1,v:true,args:[A.a9,Y.a2]}])
y.c8()
y.l(this.e)
a.gal().d=y
return a}},
r7:{"^":"a:0;",
$1:function(a){return a.gi()}},
r8:{"^":"a:0;",
$1:function(a){return a.gi()}},
kY:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gaV()}},
kZ:{"^":"a:0;",
$1:function(a){var z=a.gal().y
if(typeof z!=="number")return z.a7()
a.gal().y=z+1
return a}},
l_:{"^":"a:0;a",
$1:function(a){return this.a.a0(a)}},
l0:{"^":"a:0;",
$1:function(a){return a.gaV()}},
l1:{"^":"a:0;",
$1:function(a){return a.gF()}},
l2:{"^":"a:0;a",
$1:function(a){return J.e(a.gcT(),this.a.gi())&&a.ghs()===!0}},
l3:{"^":"a:1;",
$0:function(){return}},
l4:{"^":"a:0;a",
$1:function(a){return J.e(a.gcT(),this.a.gi())}},
l5:{"^":"a:1;",
$0:function(){return}},
l6:{"^":"a:25;a",
$1:function(a){var z,y,x
if(a.gaV()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a3(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a3(z,y)
z=y}else z=!0}else z=!1
return z}},
l7:{"^":"a:0;",
$1:function(a){a.skl(!1)
return a}},
l8:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}},
l9:{"^":"a:29;a",
$1:function(a){var z=this.a.a0(a)
return z.gF()===!0&&z.gaV()}},
pz:{"^":"cF;bK:a<,b,c,bx:d<,i:e<,dC:f<,r,H:x<",
Y:function(a){var z=new U.c0(null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
c0:{"^":"d;a,b,c,d,e,f,r,x,y",
gbK:function(){var z,y
z=this.gal()
y=z.b
if(y==null){y=new S.P(null,null,[U.as])
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
if(y==null){y=new S.P(null,null,[P.u])
y.ag()
y.l(C.d)
z.r=y
z=y}else z=y
return z},
gH:function(){return this.gal().y},
gal:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.P(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.P(null,null,[H.m(z,0)])
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
if(!(z==null)){y=new S.P(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gal()
x=y.b
if(x==null){x=new S.P(null,null,[U.as])
x.ag()
x.l(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gal()
w=x.c
if(w==null){w=new S.P(null,null,[P.u])
w.ag()
w.l(C.d)
x.c=w
x=w}else x=w
x=x.p()
w=this.gal()
v=w.d
if(v==null){v=new A.cL(null,null,[P.u,{func:1,v:true,args:[A.a9,Y.a2]}])
v.c8()
v.l(C.Z)
w.d=v
w=v}else w=v
w=w.p()
v=this.gal().e
u=this.gal().f
t=this.gal()
s=t.r
if(s==null){s=new S.P(null,null,[P.u])
s.ag()
s.l(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.gal().x
r=this.gal().y
z=new U.pz(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,R,{"^":"",lc:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishLeap"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.Z(z.gi(),new R.ld())
b.Z(a.gi(),new R.le())
y=b.af("LeapSituation").gi()
x=U.et(b)
a.ck(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.j4(0,"both "+(a.gF()===!0||z.gF()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gai()
if(typeof w!=="number")return w.b7()
if(w>1){c.j5(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.Z(z.x,new R.lf())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
w4:[function(a){return new R.lc(null,!0,!0,!0,C.c,a,null)},"$1","u1",2,0,5]}},ld:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},le:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}},lf:{"^":"a:0;",
$1:function(a){var z=a.gai()
if(typeof z!=="number")return z.at()
a.sai(z-1)
return a}}}],["","",,S,{"^":"",ko:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gan:function(){return"will <subject> dodge?"},
R:[function(a,b,c){var z=b.af("LeapSituation").gi()
a.he(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaN())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.ag(new S.kp(a,c,z),new S.kq(a,c,z),null,null)
b.av()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.af("LeapSituation").gi()
y=U.et(b)
x=this.b
a.ck(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.ay(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Z(x.gi(),new S.kr())
b.bq("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.ga4()?0.2:0
if(a.Q===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gbr().bp(0.5-z+y)},
I:function(a,b){return!a.ga4()},
v:{
w_:[function(a){return new S.ko("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tV",2,0,5]}},kp:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kq:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kr:{"^":"a:0;",
$1:function(a){a.saj(C.f)
return a}}}],["","",,D,{"^":"",lm:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gan:function(){return"will <subject> impale <objectPronoun>?"},
R:[function(a,b,c){var z,y
z=b.af("LeapSituation").gi()
y=this.b
a.eN(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ae(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaN())a.bZ(c,"<subject> <is> out of balance",z,!0,!0)
else S.ag(new D.ln(a,c,z),new D.lo(a,c,z),null,null)
b.av()
return H.b(a.cy)+" fails to impale "+H.b(y.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x
z=b.af("LeapSituation").gi()
y=this.b
a.ck(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ae(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.ay(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gai()
if(typeof x!=="number")return x.b7()
if(x>1){a.ga_().ao(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
y.ak(c,"<subject> fall<s> to the ground")
b.Z(y.x,new D.lp())}else{a.ga_().ao(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.ay(c,"<subject> go<es> down",!0)
X.co(c,b,y)
b.Z(y.x,new D.lq())}b.bq("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.cy)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.ga4()?0.2:0
if(a.Q===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gbr().bp(0.4-z+y)},
I:function(a,b){return!a.ga4()&&a.d.geF()},
v:{
w8:[function(a){return new D.lm("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","uk",2,0,5]}},ln:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lo:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lp:{"^":"a:0;",
$1:function(a){var z=a.gai()
if(typeof z!=="number")return z.at()
a.sai(z-1)
a.saj(C.f)
return a}},lq:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}}}],["","",,V,{"^":"",
dz:function(a,b,c){var z=new V.dy(null,null,null,null,null,null)
new V.ts(a,b,c).$1(z)
return z.p()},
fe:{"^":"c_;",
gaC:function(){return[S.tV(),D.uk()]},
gh:function(){return"LeapDefenseSituation"},
ap:function(){var z=new V.dy(null,null,null,null,null,null)
z.l(this)
new V.lS().$1(z)
return z.p()}},
ts:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaG().c=z
a.gaG().f=0
z=this.a.gi()
a.gaG().b=z
z=this.b.gi()
a.gaG().e=z
a.gaG().d=this.c
return a}},
lS:{"^":"a:0;",
$1:function(a){var z=a.gaG().f
if(typeof z!=="number")return z.a7()
a.gaG().f=z+1
return a}},
pA:{"^":"fe;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new V.dy(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fe))return!1
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new V.pA(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,F,{"^":"",
fg:function(a,b){var z=new F.dA(null,null,null,null,null)
new F.tt(a,b).$1(z)
return z.p()},
ff:{"^":"a1;",
gaC:function(){return[R.u1()]},
gh:function(){return"LeapSituation"},
ap:function(){var z=new F.dA(null,null,null,null,null)
z.l(this)
new F.lT().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new F.lU(this),[H.m(a,0)])}},
tt:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gb_().c=z
a.gb_().e=0
z=this.a.gi()
a.gb_().b=z
z=this.b.gi()
a.gb_().d=z
return a}},
lT:{"^":"a:0;",
$1:function(a){var z=a.gb_().e
if(typeof z!=="number")return z.a7()
a.gb_().e=z+1
return a}},
lU:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pB:{"^":"ff;a,i:b<,c,H:d<",
Y:function(a){var z=new F.dA(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.ff))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new F.pB(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",jw:{"^":"aa;L:b<,a1:c<,P:d<,M:e<,a",
gV:function(){return""},
gK:function(){return},
gh:function(){return"AutoLoot"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b.af("LootSituation")
y=b.a0(100)
if(y.gca()===!0&&!y.gbm()){a.ao(c,"<subject> kneel<s> next to <object>",y)
a.ao(c,"<subject> help<s> <object> to <object's> feet",y)
y.dF(c,'"I\'ll live," <subject> say<s>.',!0)
b.Z(100,new Z.jE())}x=[]
for(w=z.gbK(),w=w.gX(w),v=b.a,u=null;w.t();){t=w.d
if(t instanceof L.b5){s=t.gco()
r=t.gcZ()
q=t.gbC()?1:0
p=a.ga_().gaa()
if(typeof p!=="number")return H.x(p)
p=2+s+r+q>p
s=p}else s=!1
if(s){o=b.a0(a.gi())
n=o.Y(new Z.jF(a,t))
v.a9(0,o)
v.q(0,n)
u=t}else{o=b.a0(a.gi())
n=o.Y(new Z.jG(t))
v.a9(0,o)
v.q(0,n)
x.push(t)}}if(u!=null){a.ao(c,"<subject> pick<s> up <object>",u)
a.ao(c,"<subject> wield<s> <object>",u)}this.il(x,a,z,b,c)
if(x.length!==0)c.jc("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING this shouldn't be user-visible"},
J:function(a,b){return 1},
I:function(a,b){return a.gF()},
il:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=L.b5
y=P.T(new H.J(a,new Z.jx(),[H.m(a,0)]),!0,z)
x=b.gbX()
x.toString
C.a.ar(y,H.uu(new H.J(x,new Z.jy(),[H.m(x,0)]),"$isw"))
if(y.length===0)return
C.a.cp(y,new Z.jz())
w=c.gdC().aO(0,new Z.jA(d)).dW(0,new Z.jB())
for(z=J.an(w.a),x=new H.cf(z,w.b,[H.m(w,0)]),v=d.a;x.t();){u=z.gG()
if(y.length===0)break
t=C.a.kx(y)
s=d.a0(u.gi())
r=s.Y(new Z.jC(t))
v.a9(0,s)
v.q(0,r)
C.a.a9(a,t)
s=d.a0(b.gi())
r=s.Y(new Z.jD(t))
v.a9(0,s)
v.q(0,r)
b.ao(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jE:{"^":"a:0;",
$1:function(a){a.saj(C.i)
a.sai(1)
return a}},jF:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.ga_() instanceof K.c1))a.gbX().q(0,z.ga_())
a.sa_(this.b)}},jG:{"^":"a:0;a",
$1:function(a){a.gbX().q(0,this.a)
return a}},jx:{"^":"a:0;",
$1:function(a){return a instanceof L.b5}},jy:{"^":"a:0;",
$1:function(a){return a instanceof L.b5}},jz:{"^":"a:7;",
$2:function(a,b){return J.bW(a.gaa(),b.gaa())}},jA:{"^":"a:0;a",
$1:function(a){return this.a.a0(a)}},jB:{"^":"a:0;",
$1:function(a){return a.gaV()&&a.gb5()}},jC:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},jD:{"^":"a:0;a",
$1:function(a){a.gbX().a9(0,this.a)
return a}}}],["","",,X,{"^":"",
m3:function(a,b,c,d){var z=new X.dE(null,null,null,null,null,null)
new X.tj(a,b,c).$1(z)
return z.p()},
fl:{"^":"a1;",
gbi:function(){return H.q([$.$get$eP()],[Q.aa])},
gh:function(){return"LootSituation"},
ap:function(){var z=new X.dE(null,null,null,null,null,null)
z.l(this)
new X.m5().$1(z)
return z.p()},
az:function(a,b){if(typeof a!=="number")return a.b7()
if(a>0)return
return this.fh(b.a)},
aE:function(a,b){return[this.fh(a)]},
d8:function(a){return!0},
fh:function(a){return a.dv(0,new X.m4())}},
tj:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.P(null,null,[P.u])
z.ag()
z.l(this.a)
a.gau().d=z
z=new S.P(null,null,[U.as])
z.ag()
z.l(this.c)
a.gau().b=z
return a}},
m5:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.a7()
a.gau().f=z+1
return a}},
m4:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaV()}},
pC:{"^":"fl;bK:a<,bx:b<,dC:c<,i:d<,H:e<",
Y:function(a){var z=new X.dE(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fl))return!1
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dE:{"^":"d;a,b,c,d,e,f",
gbK:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.P(null,null,[U.as])
y.ag()
y.l(C.d)
z.b=y
z=y}else z=y
return z},
gbx:function(){return this.gau().c},
gdC:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.P(null,null,[P.u])
y.ag()
y.l(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gau().e},
gH:function(){return this.gau().f},
gau:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.P(null,null,[H.m(z,0)])
y.ag()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.P(null,null,[H.m(z,0)])
y.ag()
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
if(x==null){x=new S.P(null,null,[U.as])
x.ag()
x.l(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.P(null,null,[P.u])
v.ag()
v.l(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pC(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",mj:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gan:function(){return"will <subject> hit <objectPronoun>?"},
R:[function(a,b,c){var z=this.b
a.ao(c,"<subject> tr<ies> to stab <object>",z)
a.aw(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.Z(z.gi(),new A.mk(a))
if(b.a0(z.gi()).gbm()){a.bs(c,"<subject> thrust<s> {|"+H.b(U.ae(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bs(c,"<subject> {stab<s>|run<s> "+H.b(U.ae(a))+" through} <object>",z,!0)
X.co(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){if(a.gF()===!0)return 0.6
return 0.5},
I:function(a,b){return a.ga8()&&this.b.gaN()&&a.d.geF()},
v:{
wd:[function(a){return new A.mj("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uy",2,0,5]}},mk:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gai()
y=this.a.ga_().gcZ()
if(typeof z!=="number")return z.at()
a.sai(z-y)
return a}}}],["","",,U,{"^":"",
mf:function(a,b){var z=new U.dH(null,null,null,null,null)
new U.tw(a,b).$1(z)
return z.p()},
fr:{"^":"a1;",
gaC:function(){return H.q([A.uy()],[{func:1,ret:Q.E,args:[R.H]}])},
gbi:function(){return[$.$get$dN()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ap:function(){var z=new U.dH(null,null,null,null,null)
z.l(this)
new U.mg().$1(z)
return z.p()},
az:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b7()
if(a>0)return
z=b.a0(this.a)
y=b.a
x=H.m(y,0)
w=P.T(new H.J(y,new U.mh(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gez(w)
if(v.ga8()&&z.gaN()&&v.d.geF())return v
return},
aE:function(a,b){return new H.J(a,new U.mi(b,b.a0(this.a)),[H.m(a,0)])}},
tw:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gb0().d=z
a.gb0().e=0
z=this.a.gi()
a.gb0().b=z
z=this.b
z=z==null?z:z.gi()
a.gb0().c=z
return a}},
mg:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.a7()
a.gb0().e=z+1
return a}},
mh:{"^":"a:25;a,b,c",
$1:function(a){var z,y
if(a.gaV())if(a.eB(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mi:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eB(z,this.a)}},
pD:{"^":"fr;a,b,i:c<,H:d<",
Y:function(a){var z=new U.dH(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fr))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new U.pD(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",lg:{"^":"E;K:c<,L:d<,a1:e<,P:f<,b,a",
gam:function(){return""},
gh:function(){return"FinishPunch"},
gM:function(){return},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga8()?C.i:C.f
x=b.af("PunchSituation").gi()
w=b.af("FightSituation").gbx()
b.Z(z.x,new O.lh(y))
switch(y){case C.k:throw H.c(new P.z("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fF(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ay(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fF(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return!0},
v:{
w5:[function(a){return new O.lg(null,!0,!0,!1,a,null)},"$1","u2",2,0,5]}},lh:{"^":"a:0;a",
$1:function(a){a.saj(this.a)
return a}}}],["","",,E,{"^":"",ks:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gan:function(){return"will <subject> dodge the fist?"},
R:[function(a,b,c){var z=b.af("PunchSituation").gi()
a.he(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.ag(new E.kt(a,c,z),new E.ku(this,a,c,z),null,null)
b.av()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.ck(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.af("PunchSituation").gi(),z,!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gA(y):null).gbr().bp(0.4-z)},
I:function(a,b){return!0},
v:{
w0:[function(a){return new E.ks("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tW",2,0,5]}},kt:{"^":"a:1;a,b,c",
$0:function(){return this.a.bZ(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},ku:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kF(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dT:function(a,b,c){var z=new Z.dS(null,null,null,null,null,null)
new Z.tq(a,b,c).$1(z)
return z.p()},
fB:{"^":"c_;",
gaC:function(){return[E.tW()]},
gh:function(){return"PunchDefenseSituation"},
ap:function(){var z=new Z.dS(null,null,null,null,null,null)
z.l(this)
new Z.mW().$1(z)
return z.p()}},
tq:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
mW:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.a7()
a.gaI().f=z+1
return a}},
pG:{"^":"fB;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new Z.dS(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fB))return!1
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new Z.pG(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",
fD:function(a,b){var z=new Q.dU(null,null,null,null,null)
new Q.tr(a,b).$1(z)
return z.p()},
fC:{"^":"a1;",
gaC:function(){return[O.u2()]},
gh:function(){return"PunchSituation"},
ap:function(){var z=new Q.dU(null,null,null,null,null)
z.l(this)
new Q.mX().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new Q.mY(this),[H.m(a,0)])}},
tr:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gb1().c=z
a.gb1().e=0
z=this.a.gi()
a.gb1().b=z
z=this.b.gi()
a.gb1().d=z
return a}},
mX:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.a7()
a.gb1().e=z+1
return a}},
mY:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pH:{"^":"fC;a,i:b<,c,H:d<",
Y:function(a){var z=new Q.dU(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fC))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new Q.pH(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",li:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlash"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=this.b
b.Z(z.gi(),new O.ll(a))
y=b.af("SlashSituation").gi()
x=!b.a0(z.gi()).gbm()&&!J.e(z.gi(),100)
if(!x){a.ck(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.ay(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.ck(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.co(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return a.ga_().gbd()},
v:{
w7:[function(a){return new O.li(null,!0,!0,!0,C.c,a,null)},"$1","u3",2,0,5]}},ll:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gai()
y=this.a.ga_().gco()
if(typeof z!=="number")return z.at()
a.sai(z-y)
return a}}}],["","",,X,{"^":"",kd:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gan:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ae(a))+"|fend it off}")
if(a.gaN())a.aw(c,"<subject> <is> out of balance",!0)
else S.ag(new X.ke(a,c),new X.kf(this,a,c),null,null)
b.av()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){if(a.gF()===!0)a.ak(c,"<subject> {step<s>|take<s> a step} back")
a.bY(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off}",!0)
if(!a.ga8()){b.Z(a.x,new X.kg())
if(a.Q===!0)a.ak(c,"<subject> regain<s> balance")}b.bq("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gA(z):null
x=a.ga8()?0:0.2
return y.gbr().bp(0.5-x)},
I:function(a,b){return a.ga_().gcI()},
v:{
vY:[function(a){return new X.kd("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tT",2,0,5]}},ke:{"^":"a:1;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kf:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kg:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,F,{"^":"",kv:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"DodgeSlash"},
gam:function(){return"dodge and counter"},
gan:function(){return"will <subject> dodge?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaN())a.aw(c,"<subject> <is> out of balance",!0)
else S.ag(new F.kw(a,c),new F.kx(this,a,c),null,null)
b.av()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
a.bs(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga8()){z.cj(c,"<subject> lose<s> balance because of that",!0,!0)
b.Z(z.x,new F.ky())}b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gO",6,0,2],
J:function(a,b){var z,y
z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gA(y):null).gbr().bp(0.4-z)},
I:function(a,b){return!a.ga4()},
v:{
w1:[function(a){return new F.kv("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tX",2,0,5]}},kw:{"^":"a:1;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kx:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ky:{"^":"a:0;",
$1:function(a){a.saj(C.i)
return C.i}}}],["","",,O,{"^":"",lK:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gam:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gan:function(){return"will <subject> avoid the slash?"},
R:[function(a,b,c){a.dF(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.av()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z
a.bY(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.dn(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.ga_())
b.bq("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gA(z):null
x=a.ga8()?0:0.2
return y.gbr().bp(0.5-x)},
I:function(a,b){return a.gb5()},
v:{
wb:[function(a){return new O.lK("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","ur",2,0,5]}}}],["","",,G,{"^":"",ms:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"ParrySlash"},
gam:function(){return"parry and counter"},
gan:function(){return"will <subject> parry?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ae(a))+"|fend it off}")
if(a.gaN())a.aw(c,"<subject> <is> out of balance",!0)
else S.ag(new G.mt(a,c),new G.mu(this,a,c),null,null)
b.av()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
if(z.gaN()){c.j6(0,"<subject> <is> out of balance",!0,!0,z)
c.dn(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iF())
a.bY(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off easily}",!0)}else a.bY(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ae(a))+"|fend<s> it off}",!0)
b.bq("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dk(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gO",6,0,2],
J:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.gaN()?0.3:0
if(a.Q===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gbr().bp(0.3-z+y)},
I:function(a,b){return a.ga_().gcI()},
v:{
wf:[function(a){return new G.ms("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uA",2,0,5]}},mt:{"^":"a:1;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mu:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bl:function(a,b,c){var z=new L.dY(null,null,null,null,null,null)
new L.tk(a,b,c).$1(z)
return z.p()},
fO:{"^":"c_;",
gaC:function(){return[F.tX(),G.uA(),X.tT(),O.ur()]},
gh:function(){return"SlashDefenseSituation"},
ap:function(){var z=new L.dY(null,null,null,null,null,null)
z.l(this)
new L.nR().$1(z)
return z.p()}},
tk:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
nR:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.a7()
a.gaJ().f=z+1
return a}},
pJ:{"^":"fO;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new L.dY(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fO))return!1
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new L.pJ(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,M,{"^":"",
bH:function(a,b){var z=new M.dZ(null,null,null,null,null)
new M.tn(a,b).$1(z)
return z.p()},
fP:{"^":"a1;",
gaC:function(){return[O.u3()]},
gh:function(){return"SlashSituation"},
ap:function(){var z=new M.dZ(null,null,null,null,null)
z.l(this)
new M.nS().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new M.nT(this),[H.m(a,0)])}},
tn:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gi()
a.gb2().b=z
z=this.b.gi()
a.gb2().d=z
return a}},
nS:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.a7()
a.gb2().e=z+1
return a}},
nT:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pK:{"^":"fP;a,i:b<,c,H:d<",
Y:function(a){var z=new M.dZ(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fP))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new M.pK(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",lj:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gam:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z=this.b
b.Z(z.gi(),new Q.lk())
c.fE(0,"<subject> {cuts|slashes|slits} <object's> "+(J.e(z.gi(),100)?"side":"{throat|neck|side}"),z,a.ga_())
X.co(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gO",6,0,2],
J:function(a,b){return 1},
I:function(a,b){return this.b.ga4()&&a.ga_().gbd()},
v:{
w6:[function(a){return new Q.lj(null,!0,!0,!0,C.c,a,null)},"$1","u4",2,0,5]}},lk:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}}}],["","",,K,{"^":"",mm:{"^":"E;L:c<,a1:d<,P:e<,M:f<,K:r<,b,a",
gh:function(){return"OnGroundParry"},
gam:function(){return"parry it"},
gan:function(){return"will <subject> parry it?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ae(a))+"}}")
S.ag(new K.mn(a,c),new K.mo(this,a,c),null,null)
b.av()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gN",6,0,2],
S:[function(a,b,c){a.bY(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ae(a))+"}",!0)
b.bq("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gA(z):null).gbr().bp(0.3)},
I:function(a,b){return a.ga_().gcI()},
v:{
we:[function(a){return new K.mm(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","uz",2,0,5]}},mn:{"^":"a:1;a,b",
$0:function(){return this.a.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mo:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cW(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",n9:{"^":"E;K:c<,L:d<,a1:e<,P:f<,M:r<,b,a",
gh:function(){return"RollOutOfWay"},
gam:function(){return"roll out of way"},
gan:function(){return"will <subject> evade?"},
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to roll out of the way")
a.aw(c,"<subject> can't",!0)
b.av()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gN",6,0,2],
S:[function(a,b,c){a.kC(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gF()===!0){b.Z(a.gi(),new Y.na())
a.bY(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bq("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gO",6,0,2],
J:function(a,b){var z
if(a.gF()===!0)return 1
z=b.f
return(z.length!==0?C.a.gA(z):null).gbr().bp(0.5)},
I:function(a,b){return!0},
v:{
wl:[function(a){return new Y.n9(null,!1,!1,!0,C.c,a,null)},"$1","uG",2,0,5]}},na:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,V,{"^":"",
dJ:function(a,b,c){var z=new V.dI(null,null,null,null,null,null)
new V.to(a,b,c).$1(z)
return z.p()},
fs:{"^":"c_;",
gaC:function(){return[K.uz(),Y.uG()]},
gh:function(){return"OnGroundDefenseSituation"},
ap:function(){var z=new V.dI(null,null,null,null,null,null)
z.l(this)
new V.ml().$1(z)
return z.p()}},
to:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gi()
a.gaH().b=z
z=this.b.gi()
a.gaH().e=z
a.gaH().d=this.c
return a}},
ml:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.a7()
a.gaH().f=z+1
return a}},
pE:{"^":"fs;cG:a<,i:b<,cg:c<,cl:d<,H:e<",
Y:function(a){var z=new V.dI(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fs))return!1
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new V.pE(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,D,{"^":"",
h0:function(a,b){var z=new D.e0(null,null,null,null,null)
new D.tp(a,b).$1(z)
return z.p()},
h_:{"^":"a1;",
gaC:function(){return[Q.u4()]},
gh:function(){return"StrikeDownSituation"},
ap:function(){var z=new D.e0(null,null,null,null,null)
z.l(this)
new D.oH().$1(z)
return z.p()},
az:function(a,b){if(a===0)return b.a0(this.a)
return},
aE:function(a,b){return new H.J(a,new D.oI(this),[H.m(a,0)])}},
tp:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gb3().c=z
a.gb3().e=0
z=this.a.gi()
a.gb3().b=z
z=this.b.gi()
a.gb3().d=z
return a}},
oH:{"^":"a:0;",
$1:function(a){var z=a.gb3().e
if(typeof z!=="number")return z.a7()
a.gb3().e=z+1
return a}},
oI:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pM:{"^":"h_;a,i:b<,c,H:d<",
Y:function(a){var z=new D.e0(null,null,null,null,null)
z.l(this)
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
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new D.pM(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",mM:{"^":"d;",
gbr:function(){switch(this.gcg()){case C.l:return C.a_
case C.m:return $.$get$fw()
case C.p:return $.$get$fx()
default:throw H.c(P.D(this.gcg()))}},
$isa1:1}}],["","",,K,{"^":"",dQ:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",nV:{"^":"aa;L:b<,P:c<,a1:d<,M:e<,a",
gV:function(){return""},
gK:function(){return},
gh:function(){return"SlayMonstersAction"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gA(z):null
x=b.dP(y.gbB())
w=b.a
C.a.q(z,x.jG(b,y,new H.J(w,new D.nW(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
return H.Q(z.length!==0?C.a.gA(z):null,"$isU").c}},nW:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaV()){z=a.gbe()
y=this.a.gbe()
z=z.a
y=y.gi()
if(z==null?y==null:z===y){z=a.gbB()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",oO:{"^":"cE;L:c<,a1:d<,P:e<,M:f<,b,a",
gK:function(){return},
gh:function(){return"TakeExitAction"},
R:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gN",6,0,2],
S:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaM())
y=b.f
H.Q(y.length!==0?C.a.gA(y):null,"$isU").bo(b,a,z.gjy(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gO",6,0,2],
ad:function(a,b){return"WARNING should not be user-visible"},
J:function(a,b){return 1},
I:function(a,b){var z=b.f
if(H.Q(z.length!==0?C.a.gA(z):null,"$isU").c===!0)return!1
this.b.gk5()
return!0},
v:{
wo:[function(a){return new Y.oO(!1,!0,!1,null,a,null)},"$1","vO",2,0,48]}}}],["","",,F,{"^":"",
fH:function(a,b){var z=new F.dW(null,null,null,null,null)
new F.t9(a,b).$1(z)
return z.p()},
U:{"^":"a1;",
gaC:function(){return[Y.vO()]},
gbi:function(){var z=[]
C.a.ar(z,$.$get$hS())
z.push($.$get$fR())
return z},
geK:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ap:function(){var z=new F.dW(null,null,null,null,null)
z.l(this)
new F.nb().$1(z)
return z.p()},
az:function(a,b){return b.a.bc(0,new F.nc(),new F.nd())},
aE:function(a,b){var z=this.az(null,b)
if(z==null)return[]
return[z]},
bo:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dP(c)
a.cV(this.b,F.fH(z,z.gjF()!=null))
if(this.i5(a,b,z))z.d.$3(b,a,d)
else{d.er()
z.c.$3(b,a,d)
d.W(0,"\n\n",!0)}for(y=R.ib(b,a),y=P.T(y,!0,H.y(y,"w",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.a0(y[v].gi())
t=u.Y(new F.ne(z))
w.a9(0,u)
w.q(0,t)}},
h5:function(a,b){a.a.iq(new F.nf(),!0)},
d8:function(a){if(J.e(this.a,$.$get$er().b))return!1
return!0},
i5:function(a,b,c){var z,y,x
for(z=a.d,z=new P.ee(z,z.c,z.d,z.b,null,[H.m(z,0)]),y=c.b;z.t();){x=z.e
if(!J.e(x.gcT(),b.gi()))continue
if(x.gep()!=="TakeExitAction")continue
if(J.eH(x.gaM(),y)===!0)return!0}return!1}},
t9:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gaB().c=z
a.gaB().e=0
z=this.a.gh()
a.gaB().b=z
a.gaB().d=this.b
return a}},
nb:{"^":"a:0;",
$1:function(a){var z=a.gaB().e
if(typeof z!=="number")return z.a7()
a.gaB().e=z+1
return a}},
nc:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaV()}},
nd:{"^":"a:1;",
$0:function(){return}},
ne:{"^":"a:0;a",
$1:function(a){a.sbB(this.a.b)
return a}},
nf:{"^":"a:0;",
$1:function(a){return!a.gbm()}},
pI:{"^":"U;bB:a<,i:b<,c,H:d<",
Y:function(a){var z=new F.dW(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.U))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
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
z=new F.pI(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",
wC:[function(a,b,c){var z,y
z=R.aZ(6666,"Agruth",null,null,null,null,0,2,100,!1,2,!0,C.q,0,$.$get$bS())
y=z.x
a.gdm().q(0,z)
return U.cG(c,[z],"{rock|cavern} floor",b,P.ab([1,new O.u6(y),5,new O.u7(y),9,new O.u8(y),12,new O.u9(y),17,new O.ua(y)]))},"$3","vS",6,0,11],
wD:[function(a,b,c){var z=[O.ek(),O.hJ()]
a.gdm().ar(0,z)
return U.cG(c,z,"{rock|cavern} floor",b,P.aC())},"$3","iM",6,0,11],
wE:[function(a,b,c){var z,y
z=R.aZ(6667,"mad guardian",null,null,new G.b4("rusty sword",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,3,100,!1,3,!1,C.q,0,$.$get$bS())
y=z.x
a.gdm().q(0,z)
return U.cG(c,[z],"{rock|cavern} floor",b,P.ab([1,new O.uc(y),9,new O.ud(y)]))},"$3","vT",6,0,11],
wF:[function(a,b,c){var z=a.fC("take_out_gate_guards")||a.fC("take_out_gate_guards_rescue")?[O.ek()]:[O.ek(),O.hJ()]
a.a.ar(0,z)
return U.cG(c,z,"ground",b,P.aC())},"$3","vU",6,0,11],
az:function(a){return a.gdm().aS(0,new O.uf())},
uh:function(a,b){a.Z(O.az(a).gi(),new O.ui(b))},
ex:function(a){var z=a.f
if(H.Q(z.length!==0?C.a.gA(z):null,"$isU").c===!0)return!1
return C.a.a3(C.Y,H.Q(z.length!==0?C.a.gA(z):null,"$isU").a)},
ir:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.gX(z),x=new H.cf(y,new O.uv(),[H.m(z,0)]);x.t();){w=y.gG()
if(!w.gb5()){v=H.Q(w.d,"$isb4")
y=b
x=v.c
u=v.d
v.r
t=P.T(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.a0(w.x)
r=s.Y(new O.uw(new G.b4(y,x,u,!0,!0,!1,t)))
z.a9(0,s)
z.q(0,r)
break}}},
hJ:function(){return R.aZ(1000+$.$get$el().ae(999999),"goblin",O.d8(),null,new G.b4("scimitar",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,1,0,!1,1,!1,C.q,0,$.$get$bS())},
ek:function(){return R.aZ(1000+$.$get$el().ae(999999),"orc",O.d8(),null,new G.b4("sword",1,1,!1,!0,!1,P.bf(C.o,null)),null,0,2,0,!1,2,!1,C.q,0,$.$get$bS())},
u6:{"^":"a:7;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.a0(z)
x=new G.b4("scimitar",1,1,!1,!0,!1,P.bf(C.o,null))
y.ak(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ao(b,"<subject> draw<s> <subject's> <object>",x)
a.Z(z,new O.u5(x))
y.hh(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.az(a),!0)}},
u5:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}},
u7:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).ak(b,"<subject> spit<s> on the cavern floor")}},
u8:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
b.er()
z.dF(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.W(0,"\n\n",!0)}},
u9:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
z.ak(b,"<subject> grit<s> <subject's> teeth")
z.aw(b,"<subject> do<es>n't talk any more",!0)}},
ua:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).ak(b,"<subject> scowl<s> with pure hatred")}},
uc:{"^":"a:7;a",
$2:function(a,b){a.a0(this.a).hh(b,'"Good good good," <subject> whispers<s>, eyeing <object>.',O.az(a),!0)}},
ud:{"^":"a:7;a",
$2:function(a,b){var z=a.a0(this.a)
b.er()
z.dF(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.W(0,"\n\n",!0)}},
uf:{"^":"a:0;",
$1:function(a){return a.gF()}},
ui:{"^":"a:0;a",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.a7()
a.sb8(z+this.a)
return a}},
uv:{"^":"a:0;",
$1:function(a){return J.e(a.gbe(),$.$get$ey())}},
uw:{"^":"a:0;a",
$1:function(a){a.sa_(this.a)
return a}}}],["","",,V,{"^":"",
oR:function(){var z=new V.e1(null,null,null)
new V.tA().$1(z)
return z.p()},
p4:function(){var z=new V.e2(null,null,null)
new V.tz().$1(z)
return z.p()},
o_:function(){var z=new V.e_(null,null,null)
new V.ty().$1(z)
return z.p()},
t7:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"",!0)}},
t8:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
t5:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
t6:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The corpse lies still, getting cold.\n",!0)}},
nL:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"cave_with_agruth"))return!1
if(b.bJ(this.d))return!1
return!0},
S:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
O.uh(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gL:function(){return!1}},
t3:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The crevice is small.\n",!0)}},
t4:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
t1:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
t2:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
rZ:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\n"We should name that sword," Briana says, motioning to Agruth\'s scimitar. "It\'s the only thing we have going for us."\n',!0)}},
t_:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
ma:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"You're right. We'll call it Luck Bringer. It's our only chance to get out of this hell.\"\n\n\nBriana nods.")
O.ir(b,"Luck Bringer")
b.af("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
mb:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"You're right. We'll call it Savior. It is our first step to freedom.\"\n\n\nBriana nods.")
O.ir(b,"Savior")
b.af("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
m9:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"just_after_agruth_fight"))return!1
return!0},
S:[function(a,b,c){c.q(0,"\"That's foolish. It's just a sword, after all.\"")
b.af("RoomRoamingSituation").bo(b,O.az(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rX:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rY:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"There's a small door on the side here.\n",!0)}},
rV:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The room is dark and wet. As you enter, the noises end. \n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
rW:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
oP:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"orcthorn_room"))return!1
if(b.bJ("talk_to_briana_3"))if(!b.bJ(this.d))z=H.Q(z.length!==0?C.a.gA(z):null,"$isU").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
S:[function(a,b,c){c.q(0,"TODO")
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rT:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"TODO\n",!0)}},
rU:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"TODO\n",!0)}},
nU:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"slave_quarters"))return!1
return!0},
S:[function(a,b,c){c.q(0,"TODO FIGHT")
b.av()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rR:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"It doesn't take long before you start hearing voices. Orcs shouting commands, mostly. \n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, two orcs turn a corner and start towards you.\n\nYou step back and motion Briana to lean on the wall, hoping that the little door's embossed frame will provide enough cover before the two orcs turn again. \n\nBut at that time, something or someone smashes on the door from the inside. Then come angry growls and something akin to barking.\n\nThe door stays shut but the patrol is now looking directly at you, closing in with their swords in hands.\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rS:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The small door is TODO open/close.\n",!0)}},
rO:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"Smelter description TODO\n\n\nA small crevice appears to be sucking the hot air.\n",!0)}},
rP:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"Smelter short description TODO\n",!0)}},
rM:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rN:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
p_:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){if(!(!b.bJ(this.d)&&O.ex(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\nBriana: "How long have you been here?"\n\n\n"Three years."\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n"Correct. The closest safe place is the fort."')
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p0:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){if(!(b.bJ("talk_to_briana_1")&&!b.bJ(this.d)&&O.ex(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"Where did they catch you?"\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n"You what?"\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."')
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
p1:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){if(!(b.bJ("talk_to_briana_2")&&!b.bJ(this.d)&&O.ex(b)))return!1
return!0},
S:[function(a,b,c){c.q(0,'"What\'s Orcthorn?"\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it."\n\n"But they did."\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n"The mad guardian."\n\n"The mad who?"\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and that sword is still with him. Hidden in some kind of a statue."\n\n"Where is that cell?"\n\n"Somewhere in the slave quarters."')
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return""},
gL:function(){return!1}},
rK:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rL:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
rI:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rJ:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
rG:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing.\n\n\nAfter a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
rH:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The Underground Church stands silent, as if holding breath.\n",!0)}},
rD:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\nYou can guess which corridor leads to the smelter. Hot air is flowing into the forge through it, stirring the smoke. It\'s up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n',!0)}},
rE:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The air in the war forges is heavy and the noise overwhelming.\n",!0)}},
rB:{"^":"a:4;",
$3:function(a,b,c){c.W(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
rC:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
rz:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.j_("sneak_onto_cart"))c.W(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.W(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.W(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
rA:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
rx:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
ry:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
tC:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
rv:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The stone gate looms before you.\n",!0)}},
nX:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"mountain_pass_gate"))return!1
return!0},
S:[function(a,b,c){var z,y
c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
z=H.Q(b.c,"$isdl")
z.toString
y=new M.e5(null,!1,0)
y.l(z)
b.c=new V.nY().$1(y).p()
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gL:function(){return!1}},
nY:{"^":"a:0;",
$1:function(a){a.gdX()
a.a=!0
return a}},
oQ:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"mountain_pass_gate"))return!1
if(b.kJ(this.d)!=null)return!1
return!0},
S:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.Z(a.gi(),new V.oZ())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.oR())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gN",6,0,2],
J:function(a,b){return 0.5},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gL:function(){return!1}},
oZ:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a7()
a.sbw(z+10)
return a}},
h5:{"^":"a1;",
gbi:function(){return[new A.bG(new V.oU(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bG(new V.oV(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ap:function(){var z=new V.e1(null,null,null)
z.l(this)
new V.oW().$1(z)
return z.p()},
az:function(a,b){if(a!==0)return
return b.a.aS(0,new V.oX())},
aE:function(a,b){return[a.aS(0,new V.oY())]}},
tA:{"^":"a:0;",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
oU:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.Z(a.gi(),new V.oS())
b.Z(a.gi(),new V.oT())
b.av()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
oS:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}},
oT:{"^":"a:0;",
$1:function(a){var z=a.gbw()
if(typeof z!=="number")return z.a7()
a.sbw(z+10)
return a}},
oV:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.av()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
oW:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
oX:{"^":"a:0;",
$1:function(a){return a.gF()}},
oY:{"^":"a:0;",
$1:function(a){return a.gF()}},
tx:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
tB:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
tb:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
tm:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"",!0)}},
p2:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.p4())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gN",6,0,2],
J:function(a,b){return 0.3},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gL:function(){return!1}},
hd:{"^":"a1;",
gbi:function(){return[new A.bG(new V.p6(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bG(new V.p7(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ap:function(){var z=new V.e2(null,null,null)
z.l(this)
new V.p8().$1(z)
return z.p()},
az:function(a,b){if(a!==0)return
return b.a.aS(0,new V.p9())},
aE:function(a,b){return[a.aS(0,new V.pa())]}},
tz:{"^":"a:0;",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
p6:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
b.av()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
p7:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Z(a.gi(),new V.p5())
b.av()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
p5:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}},
p8:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
p9:{"^":"a:0;",
$1:function(a){return a.gF()}},
pa:{"^":"a:0;",
$1:function(a){return a.gF()}},
nZ:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gO",6,0,2],
R:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.o_())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gN",6,0,2],
J:function(a,b){return 0.8},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gL:function(){return!1}},
fT:{"^":"a1;",
gbi:function(){return[new A.bG(new V.o1(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bG(new V.o2(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ap:function(){var z=new V.e_(null,null,null)
z.l(this)
new V.o3().$1(z)
return z.p()},
az:function(a,b){if(a!==0)return
return b.a.aS(0,new V.o4())},
aE:function(a,b){return[a.aS(0,new V.o5())]}},
ty:{"^":"a:0;",
$1:function(a){var z=$.$get$Y().ae(1073741823)
a.gab().b=z
a.gab().c=0
return a}},
o1:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
b.av()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
o2:{"^":"a:9;",
$4:function(a,b,c,d){J.aS(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Z(a.gi(),new V.o0())
b.av()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
o0:{"^":"a:0;",
$1:function(a){a.sai(0)
return a}},
o3:{"^":"a:0;",
$1:function(a){var z=a.gab().c
if(typeof z!=="number")return z.a7()
a.gab().c=z+1
return a}},
o4:{"^":"a:0;",
$1:function(a){return a.gF()}},
o5:{"^":"a:0;",
$1:function(a){return a.gF()}},
p3:{"^":"a8;V:c<,h:d<,b,a",
I:function(a,b){var z=b.f
if(!J.e(H.Q(z.length!==0?C.a.gA(z):null,"$isU").a,"winged_serpent_nest"))return!1
return!0},
S:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.af("RoomRoamingSituation").bo(b,O.az(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gO",6,0,2],
R:[function(a,b,c){throw H.c(new P.z("Success chance is 100%"))},"$3","gN",6,0,2],
J:function(a,b){return 1},
gP:function(){return!1},
ad:function(a,b){return"Will you be successful?"},
gM:function(){return},
gK:function(){return"Perhaps you can divert its attention."},
gL:function(){return!1}},
rQ:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
t0:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
ru:{"^":"a:4;",
$3:function(a,b,c){c.W(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
rF:{"^":"a:4;",
$3:function(a,b,c){J.N(c,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
pN:{"^":"h5;i:a<,H:b<",
Y:function(a){var z=new V.e1(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.h5))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
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
z=new V.pN(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
pP:{"^":"hd;i:a<,H:b<",
Y:function(a){var z=new V.e2(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.hd))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
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
z=new V.pP(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}},
pL:{"^":"fT;i:a<,H:b<",
Y:function(a){var z=new V.e_(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fT))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){return Y.O(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
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
z=new V.pL(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",
wB:[function(a){var z,y
z=$.$get$dc()
y=z.B
if(y.length>0){y+=" "
z.B=y}z.B=y+a},"$1","uI",2,0,16],
wG:[function(a){$.ev=a},"$1","uJ",2,0,16],
i_:[function(a,b,c,d,e,f,g){var z=L.eU(a,!1,!1,d,e,f,g)
$.$get$bR().q(0,z)
return z},function(a){return O.i_(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i_(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uH",2,13,51,0,0,0,1,1,0],
nm:{"^":"ny;",
bv:function(){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bv=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cX){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.D())
m=t.Q
n=Z.od()
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
case 1:return P.aF(x,y)
case 2:return P.aE(v,y)}})
return P.aG($async$bv,y)},
eO:function(){var z,y
this.fk()
this.f.b4(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hr(Z.bJ())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bJ()
z.a.E(y.D())
this.bv()},
l1:[function(a){var z,y
z={}
z.a=null
y=$.$get$bR()
y.U(0,new O.nJ(z,this,a))
z=z.a
if(z==null)throw H.c(P.D("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iH(z)
this.bv()},"$1","gis",2,0,32],
iH:function(a){var z
if(a.gfS()!=null){z=a.r
$.$get$cl().aA(z)}z=a.x
if(z!=null)this.el(z)},
cw:function(){var z=0,y=P.aB(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cw=P.ax(function(a,a0){if(a===1)return P.aE(a0,y)
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
r.c_(new O.nz(v))
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
break}o=!!J.p(r[o]).$isL
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
k.ip(new O.nA(v),!1)
if(k.gm(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.D())
o=H.y(k,"b2",0)
o=P.T(new H.J(k,new O.nB(u,l),[o]),!0,o)
r=k.a
H.q([],[L.a4])
j=new L.eV(r,o)
if(!j.gT(j)){u=v.Q
r=u.e
if(r!=null){r.dt(new D.bY("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.cg(new P.F(0,$.r,null,[r]),[r])
r=j.dI()
u.a.E(r.D())
u=u.e.a.c_(v.gis())
i=new O.nC(v)
r=H.m(u,0)
q=$.r
if(q!==C.h){i=P.em(i,q)
q.toString}u.dc(new P.ec(null,new P.F(0,q,null,[r]),6,new O.nD(),i,[r,r]))
x=!0
z=1
break}else{h=k.bc(0,new O.nE(),new O.nF())
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
if(g<0||g>=q){x=H.f(u,g)
z=1
break}f=u[g]
u[g]=null
z=5
return P.aw(v.cz(f),$async$cw)
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
r=0}else if(r===q){r=v.e.gax().length-1
v.x=r}else if($.hM)$.hM=!1
else{++r
v.x=r}u.a=r===v.e.gax().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.E(o.D())
if(v.x===v.e.gax().length){u=v.Q
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
r=P.a3
u.f=new P.cg(new P.F(0,$.r,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.E(r.D())
u.f.a.c_(new O.nG(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.p(r[q]).$isL?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.D())
try{r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
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
if(k.bS(0,new O.nH(u,v))&&v.x===v.e.gax().length-1){u=v.Q
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
case 11:r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.R,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gax().length-1?v.e3():null
q=v.e.gax()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.aw(v.cz(H.i7(q[o],r)),$async$cw)
case 15:c=a0
if(k.bS(0,new O.nI(u,v))&&v.x===v.e.gax().length-1){u=v.Q
u.toString
r=d.eR(50)
u.a.E(r.D())}x=c
z=1
break
z=13
break
case 14:u=v.e.gax()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.z("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aF(x,y)}})
return P.aG($async$cw,y)},
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
$.hK=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.E(v.D())
v=this.e
this.d=new O.nn(v,this.x)
this.e=x
this.x=w
v.e=J.am(v.gdJ(),1)},
fk:function(){var z,y,x,w,v,u
this.x=null
$.$get$cl().b4(0)
$.$get$bR().sm(0,0)
$.ra=null
x=$.$get$cq()
x.b4(0)
w=$.$get$cm()
x.n(0,"points",w)
w.a=0
w.b.b4(0)
this.b.jj()
$.ii=!0
try{this.jW()}catch(v){z=H.A(v)
y=H.B(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.D())
throw H.c(z)}this.ha()
$.ii=!1},
cz:function(a){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
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
case 6:if(q.B.length!==0){t.Q.eY(J.h(q)).c_(new O.nK(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aF(x,y)
case 2:return P.aE(v,y)}})
return P.aG($async$cz,y)},
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
x=new Z.fI(x,this.b.jE(),null,null,null,null)
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
Z.nj(a,y,P.dB(P.t,P.bz))
this.cx=H.Q(y.j(0,"game"),"$isf_")
this.cy=H.aJ(y.j(0,"hitpoints"),"$isau",[P.aR],"$asau")
z=[P.u]
this.db=H.aJ(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aJ(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hr(Z.bJ())
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
if(v.B.length!==0){w.Q.eY(J.h(v))
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
case 1:return P.aF(x,y)}})
return P.aG($async$dS,y)},function(a,b){return this.dS(a,b,null,!1)},"kY","$4$rerollEffectDescription$rerollable","$2","ghL",4,5,44,1,0]},
nJ:{"^":"a:0;a,b,c",
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
nz:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nA:{"^":"a:0;a",
$1:function(a){return a.geZ()||this.a.iz(a)}},
nB:{"^":"a:35;a,b",
$1:function(a){return a.k6(this.b,this.a.a)}},
nC:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.E(x.D())
return}},
nD:{"^":"a:0;",
$1:function(a){return a instanceof D.bY}},
nE:{"^":"a:0;",
$1:function(a){return a.gk7()}},
nF:{"^":"a:1;",
$0:function(){return}},
nG:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
nH:{"^":"a:0;a,b",
$1:function(a){return a.dw(!0,this.a.a,this.b.gfo())}},
nI:{"^":"a:0;a,b",
$1:function(a){return a.dw(!0,this.a.a,this.b.gfo())}},
nK:{"^":"a:0;a",
$1:function(a){return this.a.bv()}},
mI:{"^":"d;a,b,fM:c<",
j3:function(a,b,c){var z
if(!$.hK){z=J.am(this.a,b)
this.a=z
this.b.aA(new A.cN(b,z,c))}},
q:function(a,b){return this.j3(a,b,null)},
a7:function(a,b){this.q(0,b)
return this},
D:function(){return P.ab(["points",this.a])},
hp:function(a){this.a=a.j(0,"points")
this.b.b4(0)},
hW:function(){this.b=P.b3(null,A.cN)},
$isdX:1},
cU:{"^":"mr;ax:d<,dJ:e@,a,b,c",
ghq:function(){return J.a7(this.e,0)}},
nn:{"^":"d;a,b"},
nu:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dO:function(a,b){var z
if(b!=null&&this.a.a6(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a6(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jE:function(){var z=new H.S(0,null,null,null,null,null,0,[P.t,null])
this.a.U(0,new O.nw(z))
return z},
jT:function(a){a.U(0,new O.nx(this))},
jj:function(){this.a.U(0,new O.nv())}},
nw:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.ab(["visitCount",b.gdJ()]))}},
nx:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a6(a))z.j(0,a).sdJ(J.aA(b,"visitCount"))}},
nv:{"^":"a:7;",
$2:function(a,b){b.sdJ(0)}}}],["","",,M,{"^":"",cw:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eO:function(a){return new M.cw(a,null,null)}}}}],["","",,M,{"^":"",ny:{"^":"d;"}}],["","",,Z,{"^":"",fI:{"^":"d;a,b,c,d,e,f",
eR:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dH()
return z},
dH:function(){var z,y
z=new H.S(0,null,null,null,null,null,0,[P.t,null])
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
fJ:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.p(a)
z=!!z.$isL||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.p(a).$isdX},
cT:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.p(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)if(Z.fJ(z.j(a,x)))y.push(Z.cT(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.S(0,null,null,null,null,null,0,[null,null])
z.U(a,new Z.ni(a,w))
return w}else if(!!z.$isdX){v=a.D()
v.n(0,"_class",a.gfM())
return Z.cT(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cS:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.p(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)y.push(Z.cS(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a6("_class")){v=new H.S(0,null,null,null,null,null,0,[null,null])
z.U(a,new Z.nh(b,v))
return v}else if(w&&a.a6("_class"))if(c!=null){c.hp(a)
return c}else{u=z.j(a,"_class")
if(!b.a6(u))throw H.c(new Z.dq("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nj:function(a,b,c){a.c.U(0,new Z.nk(b,c))}}},ni:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fJ(this.a.j(0,a)))this.b.n(0,a,Z.cT(b))}},nh:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cS(b,this.a,null))}},nk:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cS(b,x,null))
else z.n(0,a,Z.cS(b,x,y))}},dq:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lt:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",mO:{"^":"d;"},mN:{"^":"mO;"},lB:{"^":"mN;a,b,c,d,e,f,r,x",
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
this.e.bT(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.D())
o=z.gki()
if(!o.a6("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cr())
n.bO(new G.k8(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.D())
k=J.aA(z.geI(),0)
j=J.aA(z.geI(),1)
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
f=new Z.fI(null,null,null,null,null,null)
e=H.aJ(C.w.jq(h),"$isG",n,"$asG")
if(!e.a6("currentPageName")||!e.a6("vars"))H.i(new Z.lt("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aJ(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aJ(e.j(0,"vars"),"$isG",n,"$asG")
if(e.a6("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aJ(J.iX(z.geI()),"$isbF",[o],"$asbF")
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
case 1090:this.f.bT(!0)
this.f=null
return
case 1040:this.c.bv()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghn())+"."
this.a.E(o.D())}},"$1","giF",2,0,21],
eY:function(a){var z=P.a3
this.f=new P.cg(new P.F(0,$.r,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.E(z.D())
return this.f.a}},bY:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",k8:{"^":"d;a",
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
z=new H.S(0,null,null,null,null,null,0,[P.t,P.d])
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
x=J.p(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mr:{"^":"d;h:a@,kT:b<",
k:function(a){return this.a},
gdQ:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iS(z,": ")
if(y>0)return J.iW(this.a,0,y)
else return}}}],["","",,A,{"^":"",cN:{"^":"d;jg:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dI:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a4:{"^":"d;eZ:a@,b,c,d,aX:e<,K:f<,fS:r<,x,y",
gk7:function(){return this.e.length===0},
dw:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
k6:function(a,b){return this.dw(a,b,null)},
kO:function(){return P.ab(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c_:function(a){this.r=a
return this},
bA:function(a,b){return C.b.bA(this.e,b.gaX())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hT:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.D("String given to choice cannot be null."))
this.e=J.ba(a).eS(a)
this.d=C.b.gw(a)
this.r=f
this.b=!1
this.c=!1},
$isX:1,
$asX:function(){return[L.a4]},
v:{
eU:function(a,b,c,d,e,f,g){var z=new L.a4(!1,null,null,null,null,e,null,d,g)
z.hT(a,!1,!1,d,e,f,g)
return z}}},eV:{"^":"fh;a,b",
gm:function(a){return this.b.length},
sm:function(a,b){C.a.sm(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
je:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aA(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.p(a[0]).$isbz}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.A(u)
v=M.eO(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.R,P.at]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aA(y,"string")!=null&&!!J.p(J.aA(y,"string")).$isbz)try{x=J.aA(y,"string").$0()}catch(u){w=H.A(u)
v=M.eO(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.aA(y,"goto")
p=H.i7(J.aA(y,"script"),t)
o=new L.a4(!1,null,null,null,null,null,null,q,J.aA(y,"submenu"))
if(r==null)H.i(P.D("String given to choice cannot be null."))
o.e=J.ba(r).eS(r)
o.d=C.b.gw(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
ja:function(a,b,c,d,e,f,g){if(b instanceof L.a4)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eU(b,!1,!1,e,null,f,g))
else throw H.c(P.D("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.ja(a,b,!1,!1,null,null,null)},
kP:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.T(new H.J(z,new L.jN(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.U(x,new L.jO(w))
return w},
dI:function(){return this.kP(null,null,null,null)},
k:function(a){var z=this.b
return new H.ap(z,new L.jP(),[H.m(z,0),null]).cb(0,", ")},
$asfh:function(){return[L.a4]},
$asfq:function(){return[L.a4]},
$asL:function(){return[L.a4]},
$asa_:function(){return[L.a4]},
$asw:function(){return[L.a4]}},jN:{"^":"a:0;a,b,c",
$1:function(a){return a.dw(this.b,this.a,this.c)}},jO:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aS(this.a.b,a.kO())
a.a=!0}},jP:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cV:{"^":"d;d9:a<,aX:b<",
D:function(){return P.ab(["show",this.a,"string",this.b])}},oa:{"^":"d;a",
D:function(){var z=new H.S(0,null,null,null,null,null,0,[P.t,P.d])
this.a.U(0,new Z.ob(z))
return z},
U:function(a,b){this.a.U(0,b)}},ob:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.D())}},hq:{"^":"d;h:a@,aM:b<,fN:c<,dD:d<,d9:e<,h4:f<,aX:r<",v:{
hr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.q(new Array(a.length),[Z.hq])
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
z[w]=new Z.hq(s,r,q,p,o,n,t);++w}C.a.cp(z,new Z.ph())
return z}}},ph:{"^":"a:7;",
$2:function(a,b){return J.bw(b.gdD(),a.gdD())}},au:{"^":"d;h:a<,aM:b<,c,fN:d<,dD:e<,f,r,h4:x<,fK:y@,fM:z<,$ti",
gaa:function(){return this.f},
saa:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cX=!0}},
gd9:function(){return this.r},
gaX:function(){return this.c.$1(this.f)},
D:function(){return P.ab(["name",this.a,"value",this.f,"show",this.r])},
hp:function(a){var z
this.saa(H.iE(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cX=!0}},
$isdX:1,
v:{
bI:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cW()
y=z.a6(a)?H.aJ(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iE(e,h)
y.r=!0
z.n(0,a,y)
return y},
od:function(){var z,y
z=new Z.oa(new H.S(0,null,null,null,null,null,0,[P.t,Z.cV]))
y=$.$get$cW().gcn()
new H.J(y,new Z.oe(),[H.y(y,"w",0)]).U(0,new Z.of(z))
$.cX=!1
return z},
bJ:function(){var z=H.q([],[[P.G,P.t,P.d]])
$.$get$cW().gcn().U(0,new Z.oc(z))
return z}}},oe:{"^":"a:0;",
$1:function(a){return a.gfK()}},of:{"^":"a:24;a",
$1:function(a){var z,y
z=a.gd9()
y=a.gaX()
a.sfK(!1)
this.a.a.n(0,a.a,new Z.cV(z,y))}},oc:{"^":"a:24;a",
$1:function(a){var z=new H.S(0,null,null,null,null,null,0,[P.t,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaM())
z.n(0,"color",a.gfN())
z.n(0,"priority",a.gdD())
z.n(0,"show",a.gd9())
z.n(0,"notifyOnChange",a.gh4())
z.n(0,"string",a.gaX())
this.a.push(z)}}}],["","",,N,{"^":"",dD:{"^":"d;h:a<,b,c,ie:d<,e,f",
gfU:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gfU()+"."+x},
geH:function(){if($.ig){var z=this.b
if(z!=null)return z.geH()}return $.rh},
kh:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geH().b){if(!!J.p(b).$isbz)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.uF.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.A(u)
y=H.B(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gfU()
t=c
s=d
r=Date.now()
q=$.fi
$.fi=q+1
p=new N.m1(a,x,v,w,new P.cC(r,!1),q,t,s,e)
if($.ig)for(o=this;o!=null;){o.fs(p)
o=o.b}else $.$get$fk().fs(p)}},
cd:function(a,b,c,d){return this.kh(a,b,c,d,null)},
jJ:function(a,b,c){return this.cd(C.S,a,b,c)},
ah:function(a){return this.jJ(a,null,null)},
jI:function(a,b,c){return this.cd(C.R,a,b,c)},
bb:function(a){return this.jI(a,null,null)},
jH:function(a,b,c){return this.cd(C.T,a,b,c)},
bL:function(a){return this.jH(a,null,null)},
jV:function(a,b,c){return this.cd(C.A,a,b,c)},
h_:function(a){return this.jV(a,null,null)},
kU:function(a,b,c){return this.cd(C.W,a,b,c)},
eT:function(a){return this.kU(a,null,null)},
hK:function(a,b,c){return this.cd(C.V,a,b,c)},
dR:function(a){return this.hK(a,null,null)},
fs:function(a){},
v:{
bg:function(a){return $.$get$fj().ku(a,new N.te(a))}}},te:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.da(z,"."))H.i(P.D("name shouldn't start with a '.'"))
y=C.b.ke(z,".")
if(y===-1)x=z!==""?N.bg(""):null
else{x=N.bg(C.b.aF(z,0,y))
z=C.b.bG(z,y+1)}w=new H.S(0,null,null,null,null,null,0,[P.t,N.dD])
w=new N.dD(z,x,null,w,new P.ht(w,[null,null]),null)
if(x!=null)x.gie().n(0,z,w)
return w}},aU:{"^":"d;h:a<,aa:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aU&&this.b===b.b},
aR:function(a,b){return C.e.aR(this.b,b.gaa())},
d4:function(a,b){var z=b.gaa()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
b7:function(a,b){var z=b.gaa()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bN:function(a,b){return this.b>=b.gaa()},
bA:function(a,b){var z=b.gaa()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gw:function(a){return this.b},
k:function(a){return this.a},
$isX:1,
$asX:function(){return[N.aU]}},m1:{"^":"d;eH:a<,b,aP:c<,d,H:e<,f,bk:r<,bg:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bu:function(a){return X.d4(J.iP(a,0,new X.uj()))},
aX:function(a,b){var z=J.am(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d4:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uj:{"^":"a:7;",
$2:function(a,b){return X.aX(a,J.j(b))}},
dM:{"^":"c2;a,$ti",
gaa:function(){var z=this.a
if(z==null)throw H.c(new P.z("value called on absent Optional."))
return z},
bp:function(a){var z=this.a
return z==null?a:z},
gX:function(a){var z=this.a
if(z!=null){z=H.q([z],this.$ti)
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
fu:function(a,b){var z=new X.dM(a,[b])
z.hV(a,b)
return z}}}}],["","",,U,{"^":"",cR:{"^":"d;a,b",
k:function(a){return this.b}},cd:{"^":"d;a,kV:b<",
geE:function(){return this.a===C.D},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.cd&&b.a===this.a&&J.e(b.b,this.b)},
gw:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
wH:[function(a,b){var z,y,x,w,v
z=new D.lB(b,null,null,null,null,null,null,null)
y=$.fF
$.fF=y+1
x=new H.cb(y,null,!1)
w=init.globalState.d
w.dY(y,x)
w.cF()
w=new H.n3(x,null)
w.hX(x)
z.b=w
w=w.b
w.toString
new P.cZ(w,[H.m(w,0)]).aD(z.giF(),null,null,null)
b.E(new H.cj(z.b.a,init.globalState.d.a))
v=N.np()
z.c=v
v.Q=z},"$2","i2",4,0,34]},1]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f8.prototype
return J.f7.prototype}if(typeof a=="string")return J.c6.prototype
if(a==null)return J.f9.prototype
if(typeof a=="boolean")return J.f6.prototype
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
J.ak=function(a){if(typeof a=="number")return J.c5.prototype
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
J.am=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eu(a).a7(a,b)}
J.aY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ak(a).d3(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).u(a,b)}
J.a7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ak(a).b7(a,b)}
J.bU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ak(a).aR(a,b)}
J.bV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eu(a).c3(a,b)}
J.iN=function(a){if(typeof a=="number")return-a
return J.ak(a).eW(a)}
J.bw=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ak(a).at(a,b)}
J.aA=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).j(a,b)}
J.aS=function(a,b){return J.aI(a).q(a,b)}
J.iO=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aI(a).j2(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.N=function(a,b,c){return J.aI(a).W(a,b,c)}
J.bW=function(a,b){return J.eu(a).bA(a,b)}
J.eH=function(a,b){return J.I(a).a3(a,b)}
J.eI=function(a,b){return J.aI(a).as(a,b)}
J.iP=function(a,b,c){return J.aI(a).bl(a,b,c)}
J.j=function(a){return J.p(a).gw(a)}
J.eJ=function(a){return J.I(a).gT(a)}
J.an=function(a){return J.aI(a).gX(a)}
J.iQ=function(a){return J.aI(a).gA(a)}
J.aK=function(a){return J.I(a).gm(a)}
J.iR=function(a){return J.p(a).gbu(a)}
J.iS=function(a,b){return J.I(a).aU(a,b)}
J.eK=function(a,b){return J.aI(a).aO(a,b)}
J.iT=function(a,b,c){return J.ba(a).h1(a,b,c)}
J.dd=function(a,b,c){return J.ba(a).kz(a,b,c)}
J.cr=function(a,b,c){return J.ba(a).cU(a,b,c)}
J.iU=function(a){return J.ak(a).hi(a)}
J.iV=function(a,b){return J.aI(a).dT(a,b)}
J.eL=function(a,b){return J.ba(a).da(a,b)}
J.iW=function(a,b,c){return J.ba(a).aF(a,b,c)}
J.iX=function(a){return J.aI(a).bE(a)}
J.h=function(a){return J.p(a).k(a)}
J.bX=function(a,b){return J.ak(a).b6(a,b)}
J.iY=function(a,b){return J.aI(a).c2(a,b)}
I.bv=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.K=J.aT.prototype
C.a=J.c4.prototype
C.M=J.f6.prototype
C.t=J.f7.prototype
C.e=J.f8.prototype
C.v=J.f9.prototype
C.j=J.c5.prototype
C.b=J.c6.prototype
C.E=new A.ao(0,0,0)
C.F=new A.ao(-1/0,-1/0,-1/0)
C.G=new A.ct(-10,0,100)
C.H=new H.kS([null])
C.I=new P.mq()
C.u=new P.qa()
C.J=new P.qt()
C.h=new P.qI()
C.x=new P.b0(0)
C.L=new U.dr(0,"ItemType.spear")
C.y=new U.dr(1,"ItemType.sword")
C.z=new U.dr(2,"ItemType.fist")
C.N=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.lG(null,null)
C.O=new P.lI(null)
C.P=new P.lJ(null,null)
C.Q=new O.lR(0,"KnownToMode.all")
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
C.d=I.bv([])
C.Y=I.bv(["cave_with_agruth","guardpost_above_church","orcthorn_door","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.Z=new H.jY(0,{},C.d,[null,null])
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
C.c=new Q.n8(0,"Resource.stamina")
C.a5=H.b8("fa")
C.a6=H.b8("at")
C.a7=H.b8("t")
C.a8=H.b8("a3")
C.a9=H.b8("aR")
C.n=H.b8("dynamic")
C.aa=H.b8("u")
C.ab=H.b8("K")
C.ac=new P.bL(null,2)
$.fF=1
$.fy="$cachedFunction"
$.fz="$cachedInvocation"
$.aL=0
$.bx=null
$.eQ=null
$.bq=null
$.bO=null
$.bP=null
$.ei=!1
$.r=C.h
$.f1=0
$.ev=null
$.hK=!1
$.ra=null
$.hM=!1
$.ii=!0
$.cX=!1
$.ig=!1
$.uF=C.U
$.rh=C.A
$.fi=0
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
I.$lazy(y,x,w)}})(["f3","$get$f3",function(){return H.lz()},"f4","$get$f4",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f1
$.f1=z+1
z="expando$key$"+z}return new P.kX(null,z,[P.u])},"hf","$get$hf",function(){return H.aM(H.cY({
toString:function(){return"$receiver$"}}))},"hg","$get$hg",function(){return H.aM(H.cY({$method$:null,
toString:function(){return"$receiver$"}}))},"hh","$get$hh",function(){return H.aM(H.cY(null))},"hi","$get$hi",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hm","$get$hm",function(){return H.aM(H.cY(void 0))},"hn","$get$hn",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hk","$get$hk",function(){return H.aM(H.hl(null))},"hj","$get$hj",function(){return H.aM(function(){try{null.$method$}catch(z){return z.message}}())},"hp","$get$hp",function(){return H.aM(H.hl(void 0))},"ho","$get$ho",function(){return H.aM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e7","$get$e7",function(){return P.pT()},"be","$get$be",function(){var z,y
z=P.at
y=new P.F(0,P.pt(),null,[z])
y.i3(null,z)
return y},"bQ","$get$bQ",function(){return[]},"eq","$get$eq",function(){return new K.c1("fist",P.bf(C.X,null))},"bC","$get$bC",function(){return N.bg("PlannerRecommendation")},"i4","$get$i4",function(){return new K.rt()},"er","$get$er",function(){var z=$.$get$i4()
return K.M("__END_OF_ROAM__",z,z,null,null,[],"ground")},"Y","$get$Y",function(){return P.cP(null)},"bE","$get$bE",function(){return P.cP(null)},"ik","$get$ik",function(){return N.bg("Storyline")},"fZ","$get$fZ",function(){return P.bj("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bS","$get$bS",function(){return L.e6(new L.td())},"bT","$get$bT",function(){return L.e6(new L.ti())},"ey","$get$ey",function(){return L.e6(new L.tc())},"dN","$get$dN",function(){return new F.mv("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eo","$get$eo",function(){return Y.dm(!1,"balance",!0,C.r,$.$get$bT())},"iu","$get$iu",function(){return Y.dm(!1,"pounding",!1,C.r,$.$get$bT())},"fG","$get$fG",function(){return new B.n6("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fK","$get$fK",function(){return new O.nl(null,!1,!0,!1,null,null)},"fY","$get$fY",function(){return new Q.o6(null,!1,!0,!0,C.c,null)},"hs","$get$hs",function(){return new M.pi("",!0,C.c,!1,!0,null)},"hL","$get$hL",function(){return P.cP(null)},"eP","$get$eP",function(){return new Z.jw(!1,!0,!1,null,null)},"iF","$get$iF",function(){return Y.dm(!1,"swing",!0,C.r,$.$get$bT())},"fw","$get$fw",function(){return X.fu(0,P.K)},"fx","$get$fx",function(){return X.fu(1,P.K)},"fR","$get$fR",function(){return new D.nV(!1,!1,!0,null,null)},"el","$get$el",function(){return P.cP(null)},"hZ","$get$hZ",function(){return K.M("cave_with_agruth_pre",new V.t7(),new V.t8(),null,null,H.q([new Q.n("cave_with_agruth","","You look around.",null)],[Q.n]),"ground")},"hY","$get$hY",function(){return K.M("cave_with_agruth",new V.t5(),new V.t6(),null,null,H.q([new Q.n("underground_church","Go to the Unholy Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.n("war_forge","Go to the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null),new Q.n("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.n]),"ground")},"fL","$get$fL",function(){return new V.nL("Search Agruth","search_agruth",!0,null)},"i6","$get$i6",function(){return K.M("forge_church_crevice",new V.t3(),new V.t4(),null,null,H.q([new Q.n("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.n]),"ground")},"ie","$get$ie",function(){return K.M("guardpost_above_church",new V.t1(),new V.t2(),null,null,H.q([new Q.n("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.n("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.n("smelter","Go to the smelter","Something something.",null)],[Q.n]),"ground")},"ij","$get$ij",function(){return K.M("just_after_agruth_fight",new V.rZ(),new V.t_(),null,null,H.q([],[Q.n]),"ground")},"fn","$get$fn",function(){return new V.ma('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fo","$get$fo",function(){return new V.mb('"Savior"',"name_agruth_sword_redemption",!0,null)},"fm","$get$fm",function(){return new V.m9("No name","name_agruth_sword_nothing",!0,null)},"is","$get$is",function(){return K.M("orcthorn_door",new V.rX(),new V.rY(),null,null,H.q([new Q.n("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.n("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.n("orcthorn_room","Open the door","You open the door.",null)],[Q.n]),"ground")},"it","$get$it",function(){return K.M("orcthorn_room",new V.rV(),new V.rW(),O.vT(),null,H.q([new Q.n("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.n]),"ground")},"h4","$get$h4",function(){return new V.oP("Move the statue","take_orcthorn",!0,null)},"iw","$get$iw",function(){return K.M("slave_quarters",new V.rT(),new V.rU(),null,null,H.q([],[Q.n]),"ground")},"fQ","$get$fQ",function(){return new V.nU("Continue","slave_quarters_continue",!0,null)},"ix","$get$ix",function(){return K.M("slave_quarters_passage",new V.rR(),new V.rS(),O.iM(),null,H.q([new Q.n("cave_with_agruth","Go to the working area","TODO",null),new Q.n("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.n("orcthorn_door","Approach the little door","Something something.",null)],[Q.n]),"ground")},"iy","$get$iy",function(){return K.M("smelter",new V.rO(),new V.rP(),null,null,H.q([new Q.n("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.n("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.n("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.n]),"ground")},"iz","$get$iz",function(){return K.M("start_adventure",new V.rM(),new V.rN(),O.vS(),null,H.q([new Q.n("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.n]),"ground")},"h7","$get$h7",function(){return new V.p_("Talk to Briana","talk_to_briana_1",!0,null)},"h8","$get$h8",function(){return new V.p0("Talk to Briana","talk_to_briana_2",!0,null)},"h9","$get$h9",function(){return new V.p1("Talk to Briana","talk_to_briana_3",!0,null)},"iG","$get$iG",function(){return K.M("the_shafts",new V.rK(),new V.rL(),null,null,H.q([new Q.n("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.n]),"ground")},"iI","$get$iI",function(){return K.M("tunnel",new V.rI(),new V.rJ(),O.iM(),null,H.q([new Q.n("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.n]),"ground")},"iJ","$get$iJ",function(){return K.M("underground_church",new V.rG(),new V.rH(),null,null,H.q([new Q.n("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null)],[Q.n]),"ground")},"iK","$get$iK",function(){return K.M("war_forge",new V.rD(),new V.rE(),null,null,H.q([new Q.n("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.n]),"ground")},"i5","$get$i5",function(){return K.M("entrance_to_bloodrock",new V.rB(),new V.rC(),null,null,H.q([new Q.n("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.n("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.n]),"ground")},"il","$get$il",function(){return K.M("mountain_pass",new V.rz(),new V.rA(),null,null,H.q([new Q.n("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.n]),"ground")},"im","$get$im",function(){return K.M("mountain_pass_gate",new V.rx(),new V.ry(),null,null,H.q([new Q.n("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.n]),"ground")},"io","$get$io",function(){return K.M("mountain_pass_guard_post",new V.tC(),new V.rv(),O.vU(),null,H.q([new Q.n("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.n]),"ground")},"fS","$get$fS",function(){return new V.nX("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"h6","$get$h6",function(){return new V.oQ("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"ip","$get$ip",function(){return K.M("mountainside_base",new V.tx(),new V.tB(),null,null,H.q([new Q.n("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.n]),"ground")},"iq","$get$iq",function(){return K.M("mountainside_path",new V.tb(),new V.tm(),null,null,H.q([new Q.n("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.n]),"ground")},"he","$get$he",function(){return new V.p2("Scare off the serpent","threaten_winged_serpent",!0,null)},"fU","$get$fU",function(){return new V.nZ("Soothe the serpent","soothe_winged_serpent",!0,null)},"hc","$get$hc",function(){return new V.p3("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"iL","$get$iL",function(){return K.M("winged_serpent_nest",new V.rQ(),new V.t0(),null,null,H.q([new Q.n("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.n]),"ground")},"ih","$get$ih",function(){return K.M("ironcast_road",new V.ru(),new V.rF(),null,null,H.q([new Q.n("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.n]),"ground")},"hT","$get$hT",function(){return H.q([$.$get$hZ(),$.$get$hY(),$.$get$i6(),$.$get$ie(),$.$get$ij(),$.$get$is(),$.$get$it(),$.$get$iw(),$.$get$ix(),$.$get$iy(),$.$get$iz(),$.$get$iG(),$.$get$iI(),$.$get$iJ(),$.$get$iK(),$.$get$i5(),$.$get$il(),$.$get$im(),$.$get$io(),$.$get$ip(),$.$get$iq(),$.$get$iL(),$.$get$ih()],[K.cc])},"hS","$get$hS",function(){return H.q([$.$get$fL(),$.$get$fn(),$.$get$fo(),$.$get$fm(),$.$get$h4(),$.$get$fQ(),$.$get$h7(),$.$get$h8(),$.$get$h9(),$.$get$fS(),$.$get$h6(),$.$get$he(),$.$get$fU(),$.$get$hc()],[A.a8])},"dc","$get$dc",function(){return P.oJ("")},"cm","$get$cm",function(){var z=new O.mI(0,null,"PointsCounter")
z.hW()
return z},"bR","$get$bR",function(){return new L.eV(null,H.q([],[L.a4]))},"cq","$get$cq",function(){return H.fd(P.t,P.d)},"cl","$get$cl",function(){return P.b3(null,{func:1,ret:[P.R,P.at]})},"cA","$get$cA",function(){return P.bj("^\\s*<<<\\s*$",!0,!1)},"cW","$get$cW",function(){return H.fd(P.t,Z.au)},"fk","$get$fk",function(){return N.bg("")},"fj","$get$fj",function(){return P.dB(P.t,N.dD)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.t,args:[R.H,A.a9,Y.a2]},{func:1,args:[,,,]},{func:1,args:[R.H,A.a9,Y.a2]},{func:1,ret:Q.E,args:[R.H]},{func:1,v:true},{func:1,args:[,,]},{func:1,v:true,args:[R.H,A.a9,Y.a2,R.H,S.a1]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,ret:U.cF,args:[A.a9,F.U,[P.w,R.H]]},{func:1,v:true,args:[R.H,A.a9,Y.a2,R.H,,]},{func:1,ret:P.t,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.aW]},{func:1,v:true,args:[P.t]},{func:1,args:[P.aR]},{func:1,ret:P.R},{func:1,ret:P.K,args:[A.ao]},{func:1,args:[,P.aW]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bd,args:[P.u]},{func:1,ret:P.t,args:[P.t]},{func:1,args:[Z.au]},{func:1,args:[R.H]},{func:1,args:[U.c0]},{func:1,args:[P.K,R.H]},{func:1,args:[P.bh]},{func:1,ret:P.a3,args:[P.u]},{func:1,args:[P.u,,]},{func:1,args:[Y.ac]},{func:1,v:true,args:[P.u]},{func:1,ret:P.a3,args:[L.a4]},{func:1,v:true,args:[[P.L,P.t],P.fM]},{func:1,args:[L.a4]},{func:1,args:[P.t,,]},{func:1,args:[P.t,Z.cV]},{func:1,args:[[P.L,Y.ac],Y.ac]},{func:1,ret:P.K,args:[A.ct]},{func:1,ret:P.u,args:[P.X,P.X]},{func:1,ret:P.t,args:[Q.aa]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.u,args:[P.u,P.u]},{func:1,ret:[P.R,U.cd],args:[P.aR,P.t],named:{rerollEffectDescription:P.t,rerollable:P.a3}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.aW]},{func:1,ret:Q.cI,args:[U.as]},{func:1,ret:Q.cE,args:[Q.n]},{func:1,v:true,args:[P.d,P.aW]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a4,args:[P.t],named:{deferToChoiceList:P.a3,deferToEndOfPage:P.a3,goto:P.t,helpMessage:P.t,script:{func:1,ret:[P.R,P.at]},submenu:P.t}},{func:1,args:[P.a3]}]
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
if(x==y)H.vP(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iA(X.i2(),b)},[])
else (function(b){H.iA(X.i2(),b)})([])})})()