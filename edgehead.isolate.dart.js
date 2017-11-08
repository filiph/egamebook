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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ei"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ei"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ei(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",wz:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aS:{"^":"d;",
S:function(a,b){return a===b},
gD:function(a){return H.aA(a)},
i:function(a){return H.cN(a)}},
f0:{"^":"aS;",
i:function(a){return String(a)},
gD:function(a){return a?519018:218159},
$isae:1},
f2:{"^":"aS;",
S:function(a,b){return null==b},
i:function(a){return"null"},
gD:function(a){return 0},
geb:function(a){return C.a8},
$isas:1},
f5:{"^":"aS;",
gD:function(a){return 0},
i:function(a){return String(a)},
$islJ:1},
wG:{"^":"f5;"},
bm:{"^":"f5;"},
c5:{"^":"aS;$ti",
dR:function(a,b){if(!!a.immutable$list)throw H.c(new P.a2(b))},
cj:function(a,b){if(!!a.fixed$length)throw H.c(new P.a2(b))},
u:function(a,b){this.cj(a,"add")
a.push(b)},
fm:function(a){this.cj(a,"removeLast")
if(a.length===0)throw H.c(H.ba(a,-1))
return a.pop()},
a_:function(a,b){var z
this.cj(a,"remove")
for(z=0;z<a.length;++z)if(J.u(a[z],b)){a.splice(z,1)
return!0}return!1},
hK:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(!b.$1(w)===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sw(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bJ:function(a,b){return new H.I(a,b,[H.j(a,0)])},
av:function(a,b){var z,y
this.cj(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.ap)(b),++y)a.push(b[y])},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
bp:function(a,b){return new H.ak(a,b,[H.j(a,0),null])},
em:function(a,b){return H.fY(a,b,null,H.j(a,0))},
b7:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
aX:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x))return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.aT())},
cX:function(a,b){return this.aX(a,b,null)},
ar:function(a,b){return a[b]},
gdY:function(a){if(a.length>0)return a[0]
throw H.c(H.aT())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aT())},
gbM:function(a){var z=a.length
if(z===1)return a[0]
if(z===0)throw H.c(H.aT())
throw H.c(H.dp())},
aN:function(a,b,c,d,e){var z,y
this.dR(a,"setRange")
P.ca(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.e(P.a7(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f_())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
b6:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
bN:function(a,b){var z
this.dR(a,"sort")
z=b==null?P.t7():b
H.ce(a,0,a.length-1,z)},
en:function(a){return this.bN(a,null)},
e_:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.u(a[z],b))return z
return-1},
b0:function(a,b){return this.e_(a,b,0)},
ag:function(a,b){var z
for(z=0;z<a.length;++z)if(J.u(a[z],b))return!0
return!1},
ga4:function(a){return a.length===0},
gf8:function(a){return a.length!==0},
i:function(a){return P.cH(a,"[","]")},
fz:function(a){return P.cJ(a,H.j(a,0))},
ga5:function(a){return new J.b3(a,a.length,0,null,[H.j(a,0)])},
gD:function(a){return H.aA(a)},
gw:function(a){return a.length},
sw:function(a,b){this.cj(a,"set length")
if(b<0)throw H.c(P.a7(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ba(a,b))
if(b>=a.length||b<0)throw H.c(H.ba(a,b))
return a[b]},
t:function(a,b,c){this.dR(a,"indexed set")
if(b>=a.length||b<0)throw H.c(H.ba(a,b))
a[b]=c},
$iscI:1,
$ascI:I.bb,
$isM:1,
$isaj:1},
wy:{"^":"c5;$ti"},
b3:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
B:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ap(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c6:{"^":"aS;",
by:function(a,b){var z
if(typeof b!=="number")throw H.c(H.a4(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd_(b)
if(this.gd_(a)===z)return 0
if(this.gd_(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd_:function(a){return a===0?1/a<0:a<0},
jb:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.a2(""+a+".round()"))},
ba:function(a,b){var z
if(b>20)throw H.c(P.a7(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd_(a))return"-"+z
return z},
ji:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a7(b,2,36,"radix",null))
z=a.toString(b)
if(C.c.cV(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.e(new P.a2("Unexpected toString result: "+z))
x=J.W(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.c.bt("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
aL:function(a,b){if(typeof b!=="number")throw H.c(H.a4(b))
return a+b},
c0:function(a,b){if(typeof b!=="number")throw H.c(H.a4(b))
return a-b},
eg:function(a,b){if(typeof b!=="number")throw H.c(H.a4(b))
return a/b},
bt:function(a,b){if(typeof b!=="number")throw H.c(H.a4(b))
return a*b},
bu:function(a,b){return(a|0)===a?a/b|0:this.hQ(a,b)},
hQ:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.a2("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cR:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bL:function(a,b){if(typeof b!=="number")throw H.c(H.a4(b))
return a<b},
cB:function(a,b){if(typeof b!=="number")throw H.c(H.a4(b))
return a>b},
$isL:1},
f1:{"^":"c6;",$isaX:1,$isL:1,$isq:1},
lI:{"^":"c6;",$isaX:1,$isL:1},
c7:{"^":"aS;",
cV:function(a,b){if(b<0)throw H.c(H.ba(a,b))
if(b>=a.length)H.e(H.ba(a,b))
return a.charCodeAt(b)},
bQ:function(a,b){if(b>=a.length)throw H.c(H.ba(a,b))
return a.charCodeAt(b)},
cS:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return new H.qA(b,a,c)},
dO:function(a,b){return this.cS(a,b,0)},
fc:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cV(b,c+y)!==this.bQ(a,y))return
return new H.fX(c,b,a)},
aL:function(a,b){if(typeof b!=="string")throw H.c(P.dd(b,null,null))
return a+b},
dV:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bh(a,y-z)},
j3:function(a,b,c,d){var z
H.cm(c)
z=a.length
if(d>z)H.e(P.a7(d,0,z,"startIndex",null))
return H.b_(a,b,c,d)},
j2:function(a,b,c){return this.j3(a,b,c,0)},
h0:function(a,b,c){var z
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iF(b,a,c)!=null},
cF:function(a,b){return this.h0(a,b,0)},
aw:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.c9(b,null,null))
if(b>c)throw H.c(P.c9(b,null,null))
if(c>a.length)throw H.c(P.c9(c,null,null))
return a.substring(b,c)},
bh:function(a,b){return this.aw(a,b,null)},
dd:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.bQ(z,0)===133){x=J.dr(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cV(z,w)===133?J.lK(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jj:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.bQ(z,0)===133?J.dr(z,1):0}else{y=J.dr(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bt:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.O)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e_:function(a,b,c){var z
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b0:function(a,b){return this.e_(a,b,0)},
iM:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
iL:function(a,b){return this.iM(a,b,null)},
i9:function(a,b,c){if(b==null)H.e(H.a4(b))
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
return H.w1(a,b,c)},
ag:function(a,b){return this.i9(a,b,0)},
ga4:function(a){return a.length===0},
by:function(a,b){var z
if(typeof b!=="string")throw H.c(H.a4(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gw:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.c(H.ba(a,b))
return a[b]},
$iscI:1,
$ascI:I.bb,
$isl:1,
$isdJ:1,
A:{
f3:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dr:function(a,b){var z,y
for(z=a.length;b<z;){y=C.c.bQ(a,b)
if(y!==32&&y!==13&&!J.f3(y))break;++b}return b},
lK:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.c.cV(a,z)
if(y!==32&&y!==13&&!J.f3(y))break}return b}}}}],["","",,H,{"^":"",
aT:function(){return new P.t("No element")},
dp:function(){return new P.t("Too many elements")},
f_:function(){return new P.t("Too few elements")},
ce:function(a,b,c,d){if(c-b<=32)H.fR(a,b,c,d)
else H.fQ(a,b,c,d)},
fR:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.W(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.aq(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.t(a,w,y.h(a,v))
w=v}y.t(a,w,x)}},
fQ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.i.bu(c-b+1,6)
y=b+z
x=c-z
w=C.i.bu(b+c,2)
v=w-z
u=w+z
t=J.W(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.aq(d.$2(s,r),0)){n=r
r=s
s=n}if(J.aq(d.$2(p,o),0)){n=o
o=p
p=n}if(J.aq(d.$2(s,q),0)){n=q
q=s
s=n}if(J.aq(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aq(d.$2(s,p),0)){n=p
p=s
s=n}if(J.aq(d.$2(q,p),0)){n=p
p=q
q=n}if(J.aq(d.$2(r,o),0)){n=o
o=r
r=n}if(J.aq(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aq(d.$2(p,o),0)){n=o
o=p
p=n}t.t(a,y,s)
t.t(a,w,q)
t.t(a,x,o)
t.t(a,v,t.h(a,b))
t.t(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.u(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.t(a,k,t.h(a,m))
t.t(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.t(a,k,t.h(a,m))
g=m+1
t.t(a,m,t.h(a,l))
t.t(a,l,j)
l=h
m=g
break}else{t.t(a,k,t.h(a,l))
t.t(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.t(a,k,t.h(a,m))
t.t(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.t(a,k,t.h(a,m))
g=m+1
t.t(a,m,t.h(a,l))
t.t(a,l,j)
m=g}else{t.t(a,k,t.h(a,l))
t.t(a,l,j)}l=h
break}}f=!1}e=m-1
t.t(a,b,t.h(a,e))
t.t(a,e,r)
e=l+1
t.t(a,c,t.h(a,e))
t.t(a,e,p)
H.ce(a,b,m-2,d)
H.ce(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.u(d.$2(t.h(a,m),r),0);)++m
for(;J.u(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.t(a,k,t.h(a,m))
t.t(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.t(a,k,t.h(a,m))
g=m+1
t.t(a,m,t.h(a,l))
t.t(a,l,j)
m=g}else{t.t(a,k,t.h(a,l))
t.t(a,l,j)}l=h
break}}H.ce(a,m,l,d)}else H.ce(a,m,l,d)},
aj:{"^":"D;$ti"},
b5:{"^":"aj;$ti",
ga5:function(a){return new H.dy(this,this.gw(this),0,null,[H.z(this,"b5",0)])},
Z:function(a,b){var z,y
z=this.gw(this)
for(y=0;y<z;++y){b.$1(this.ar(0,y))
if(z!==this.gw(this))throw H.c(new P.B(this))}},
ga4:function(a){return this.gw(this)===0},
b6:function(a,b){var z,y
z=this.gw(this)
for(y=0;y<z;++y){if(b.$1(this.ar(0,y)))return!0
if(z!==this.gw(this))throw H.c(new P.B(this))}return!1},
aX:function(a,b,c){var z,y,x
z=this.gw(this)
for(y=0;y<z;++y){x=this.ar(0,y)
if(b.$1(x))return x
if(z!==this.gw(this))throw H.c(new P.B(this))}return c.$0()},
cp:function(a,b){var z,y,x,w
z=this.gw(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ar(0,0))
if(z!==this.gw(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ar(0,w))
if(z!==this.gw(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ar(0,w))
if(z!==this.gw(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bJ:function(a,b){return this.cG(0,b)},
bp:function(a,b){return new H.ak(this,b,[H.z(this,"b5",0),null])},
b7:function(a,b,c){var z,y,x
z=this.gw(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ar(0,x))
if(z!==this.gw(this))throw H.c(new P.B(this))}return y},
bZ:function(a,b){var z,y,x,w
z=[H.z(this,"b5",0)]
if(b){y=H.m([],z)
C.a.sw(y,this.gw(this))}else{x=new Array(this.gw(this))
x.fixed$length=Array
y=H.m(x,z)}for(w=0;w<this.gw(this);++w)y[w]=this.ar(0,w)
return y},
ct:function(a){return this.bZ(a,!0)}},
oC:{"^":"b5;a,b,c,$ti",
ghq:function(){var z=J.b0(this.a)
return z},
ghO:function(){var z,y
z=J.b0(this.a)
y=this.b
if(y>z)return z
return y},
gw:function(a){var z,y
z=J.b0(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ar:function(a,b){var z=this.ghO()+b
if(b<0||z>=this.ghq())throw H.c(P.cG(b,this,"index",null,null))
return J.ez(this.a,z)},
bZ:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.W(y)
w=x.gw(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.m([],u)
C.a.sw(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.m(s,u)}for(r=0;r<v;++r){t[r]=x.ar(y,z+r)
if(x.gw(y)<w)throw H.c(new P.B(this))}return t},
h8:function(a,b,c,d){var z=this.b
if(z<0)H.e(P.a7(z,0,null,"start",null))},
A:{
fY:function(a,b,c,d){var z=new H.oC(a,b,c,[d])
z.h8(a,b,c,d)
return z}}},
dy:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
B:function(){var z,y,x
z=this.a
y=z.gw(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ar(0,x);++this.c
return!0}},
dB:{"^":"D;a,b,$ti",
ga5:function(a){return new H.md(null,J.ar(this.a),this.b,this.$ti)},
gw:function(a){return J.b0(this.a)},
ga4:function(a){return J.eA(this.a)},
$asD:function(a,b){return[b]},
A:{
bC:function(a,b,c,d){if(!!J.n(a).$isaj)return new H.cD(a,b,[c,d])
return new H.dB(a,b,[c,d])}}},
cD:{"^":"dB;a,b,$ti",$isaj:1,
$asaj:function(a,b){return[b]}},
md:{"^":"dq;a,b,c,$ti",
B:function(){var z=this.b
if(z.B()){this.a=this.c.$1(z.gU())
return!0}this.a=null
return!1},
gU:function(){return this.a},
$asdq:function(a,b){return[b]}},
ak:{"^":"b5;a,b,$ti",
gw:function(a){return J.b0(this.a)},
ar:function(a,b){return this.b.$1(J.ez(this.a,b))},
$asb5:function(a,b){return[b]},
$asaj:function(a,b){return[b]},
$asD:function(a,b){return[b]}},
I:{"^":"D;a,b,$ti",
ga5:function(a){return new H.bN(J.ar(this.a),this.b,this.$ti)},
bp:function(a,b){return new H.dB(this,b,[H.j(this,0),null])}},
bN:{"^":"dq;a,b,$ti",
B:function(){var z,y
for(z=this.a,y=this.b;z.B();)if(y.$1(z.gU()))return!0
return!1},
gU:function(){return this.a.gU()}},
kI:{"^":"d;$ti",
B:function(){return!1},
gU:function(){return}}}],["","",,H,{"^":"",
ci:function(a,b){var z=a.cl(b)
if(!init.globalState.d.cy)init.globalState.f.b9()
return z},
ih:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isM)throw H.c(P.F("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qn(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eY()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.pY(P.b7(null,H.cg),0)
x=P.q
y.z=new H.P(0,null,null,null,null,null,0,[x,H.e5])
y.ch=new H.P(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.qm()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lA,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qo)}if(init.globalState.x)return
y=init.globalState.a++
w=P.ag(null,null,null,x)
v=new H.cb(0,null,!1)
u=new H.e5(y,new H.P(0,null,null,null,null,null,0,[x,H.cb]),w,init.createNewIsolate(),v,new H.bd(H.da()),new H.bd(H.da()),!1,!1,[],P.ag(null,null,null,null),null,null,!1,!0,P.ag(null,null,null,null))
w.u(0,0)
u.dm(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.aw(a,{func:1,args:[,]}))u.cl(new H.v6(z,a))
else if(H.aw(a,{func:1,args:[,,]}))u.cl(new H.v7(z,a))
else u.cl(a)
init.globalState.f.b9()},
lE:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.lF()
return},
lF:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.a2("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.a2('Cannot extract URI from "'+z+'"'))},
lA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cY(!0,[]).bB(b.data)
y=J.W(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cY(!0,[]).bB(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cY(!0,[]).bB(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.q
p=P.ag(null,null,null,q)
o=new H.cb(0,null,!1)
n=new H.e5(y,new H.P(0,null,null,null,null,null,0,[q,H.cb]),p,init.createNewIsolate(),o,new H.bd(H.da()),new H.bd(H.da()),!1,!1,[],P.ag(null,null,null,null),null,null,!1,!0,P.ag(null,null,null,null))
p.u(0,0)
n.dm(0,o)
init.globalState.f.a.ax(new H.cg(n,new H.lB(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b9()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").F(y.h(z,"msg"))
init.globalState.f.b9()
break
case"close":init.globalState.ch.a_(0,$.$get$eZ().h(0,a))
a.terminate()
init.globalState.f.b9()
break
case"log":H.lz(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.a_(["command","print","msg",z])
q=new H.bo(!0,P.bQ(null,P.q)).b3(q)
y.toString
self.postMessage(q)}else P.ep(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
lz:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.a_(["command","log","msg",a])
x=new H.bo(!0,P.bQ(null,P.q)).b3(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.E(w)
y=P.cE(z)
throw H.c(y)}},
lC:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fu=$.fu+("_"+y)
$.fv=$.fv+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.ch(y,x),w,z.r])
x=new H.lD(a,b,c,d,z)
if(e){z.eX(w,w)
init.globalState.f.a.ax(new H.cg(z,x,"start isolate"))}else x.$0()},
qR:function(a){return new H.cY(!0,[]).bB(new H.bo(!1,P.bQ(null,P.q)).b3(a))},
v6:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
v7:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qn:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
qo:function(a){var z=P.a_(["command","print","msg",a])
return new H.bo(!0,P.bQ(null,P.q)).b3(z)}}},
e5:{"^":"d;q:a<,b,c,iJ:d<,ib:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
eX:function(a,b){if(!this.f.S(0,a))return
if(this.Q.u(0,b)&&!this.y)this.y=!0
this.ce()},
j1:function(a){var z,y
if(!this.y)return
z=this.Q
z.a_(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
init.globalState.f.a.eW(y)}this.y=!1}this.ce()},
i_:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.S(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
j_:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.S(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.e(new P.a2("removeRange"))
P.ca(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fV:function(a,b){if(!this.r.S(0,a))return
this.db=b},
iw:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.b7(null,null)
this.cx=z}z.ax(new H.qd(a,c))},
iv:function(a,b){var z
if(!this.r.S(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.e1()
return}z=this.cx
if(z==null){z=P.b7(null,null)
this.cx=z}z.ax(this.giK())},
ix:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ep(a)
if(b!=null)P.ep(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.J(a)
y[1]=b==null?null:b.i(0)
for(x=new P.ad(z,z.r,null,null,[null]),x.c=z.e;x.B();)x.d.F(y)},
cl:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.A(u)
v=H.E(u)
this.ix(w,v)
if(this.db){this.e1()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.giJ()
if(this.cx!=null)for(;t=this.cx,!t.ga4(t);)this.cx.d5().$0()}return y},
d1:function(a){return this.b.h(0,a)},
dm:function(a,b){var z=this.b
if(z.ad(a))throw H.c(P.cE("Registry: ports must be registered only once."))
z.t(0,a,b)},
ce:function(){var z=this.b
if(z.gw(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.e1()},
e1:[function(){var z,y,x
z=this.cx
if(z!=null)z.aW(0)
for(z=this.b,y=z.gc_(),y=y.ga5(y);y.B();)y.gU().hl()
z.aW(0)
this.c.aW(0)
init.globalState.z.a_(0,this.a)
this.dx.aW(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].F(z[x+1])
this.ch=null}},"$0","giK",0,0,7]},
qd:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
pY:{"^":"d;a,b",
ii:function(){var z=this.a
if(z.b===z.c)return
return z.d5()},
fu:function(){var z,y,x
z=this.ii()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ad(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.ga4(y)}else y=!1
else y=!1
else y=!1
if(y)H.e(P.cE("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.ga4(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a_(["command","close"])
x=new H.bo(!0,new P.hu(0,null,null,null,null,null,0,[null,P.q])).b3(x)
y.toString
self.postMessage(x)}return!1}z.iY()
return!0},
eS:function(){if(self.window!=null)new H.pZ(this).$0()
else for(;this.fu(););},
b9:function(){var z,y,x,w,v
if(!init.globalState.x)this.eS()
else try{this.eS()}catch(x){z=H.A(x)
y=H.E(x)
w=init.globalState.Q
v=P.a_(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bo(!0,P.bQ(null,P.q)).b3(v)
w.toString
self.postMessage(v)}}},
pZ:{"^":"a:7;a",
$0:function(){if(!this.a.fu())return
P.oZ(C.E,this)}},
cg:{"^":"d;a,b,c",
iY:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cl(this.b)}},
qm:{"^":"d;"},
lB:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lC(this.a,this.b,this.c,this.d,this.e,this.f)}},
lD:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.aw(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.aw(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.ce()}},
hp:{"^":"d;"},
ch:{"^":"hp;b,a",
F:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.qR(a)
if(z.gib()===y){y=J.W(x)
switch(y.h(x,0)){case"pause":z.eX(y.h(x,1),y.h(x,2))
break
case"resume":z.j1(y.h(x,1))
break
case"add-ondone":z.i_(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.j_(y.h(x,1))
break
case"set-errors-fatal":z.fV(y.h(x,1),y.h(x,2))
break
case"ping":z.iw(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.iv(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.u(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a_(0,y)
break}return}init.globalState.f.a.ax(new H.cg(z,new H.qp(this,x),"receive"))},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.ch){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){return this.b.a}},
qp:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.he(this.b)}},
e8:{"^":"hp;b,c,a",
F:function(a){var z,y,x
z=P.a_(["command","message","port",this,"msg",a])
y=new H.bo(!0,P.bQ(null,P.q)).b3(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.e8){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
cb:{"^":"d;a,b,c",
hl:function(){this.c=!0
this.b=null},
bm:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a_(0,y)
z.c.a_(0,y)
z.ce()},
he:function(a){if(this.c)return
this.b.$1(a)},
$isn4:1},
n5:{"^":"bM;a,b",
bo:function(a,b,c,d){var z=this.b
z.toString
return new P.cX(z,[H.j(z,0)]).bo(a,b,c,d)},
bm:[function(){this.a.bm()
this.b.bm()},"$0","gi7",0,0,7],
h6:function(a){var z=new P.qD(null,0,null,null,null,null,this.gi7(),[null])
this.b=z
this.a.b=z.ghT(z)},
$asbM:I.bb},
oV:{"^":"d;a,b,c",
h9:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ax(new H.cg(y,new H.oX(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d5(new H.oY(this,b),0),a)}else throw H.c(new P.a2("Timer greater than 0."))},
A:{
oW:function(a,b){var z=new H.oV(!0,!1,null)
z.h9(a,b)
return z}}},
oX:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
oY:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bd:{"^":"d;a",
gD:function(a){var z=this.a
z=C.i.cR(z,0)^C.i.bu(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bd){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bo:{"^":"d;a,b",
b3:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gw(z))
z=J.n(a)
if(!!z.$iscI)return this.fR(a)
if(!!z.$islx){x=this.gfO()
z=a.gbU()
z=H.bC(z,x,H.z(z,"D",0),null)
z=P.Q(z,!0,H.z(z,"D",0))
w=a.gc_()
w=H.bC(w,x,H.z(w,"D",0),null)
return["map",z,P.Q(w,!0,H.z(w,"D",0))]}if(!!z.$islJ)return this.fS(a)
if(!!z.$isaS)this.fC(a)
if(!!z.$isn4)this.cu(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isch)return this.fT(a)
if(!!z.$ise8)return this.fU(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cu(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbd)return["capability",a.a]
if(!(a instanceof P.d))this.fC(a)
return["dart",init.classIdExtractor(a),this.fQ(init.classFieldsExtractor(a))]},"$1","gfO",2,0,0],
cu:function(a,b){throw H.c(new P.a2((b==null?"Can't transmit:":b)+" "+H.b(a)))},
fC:function(a){return this.cu(a,null)},
fR:function(a){var z=this.fP(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cu(a,"Can't serialize indexable: ")},
fP:function(a){var z,y
z=[]
C.a.sw(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.b3(a[y])
return z},
fQ:function(a){var z
for(z=0;z<a.length;++z)C.a.t(a,z,this.b3(a[z]))
return a},
fS:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.cu(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sw(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.b3(a[z[x]])
return["js-object",z,y]},
fU:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fT:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
cY:{"^":"d;a,b",
bB:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.F("Bad serialized message: "+H.b(a)))
switch(C.a.gdY(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.m(this.ck(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.m(this.ck(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.ck(z)
case"const":z=a[1]
this.b.push(z)
y=H.m(this.ck(z),[null])
y.fixed$length=Array
return y
case"map":return this.il(a)
case"sendport":return this.im(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.ik(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.bd(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.ck(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gij",2,0,0],
ck:function(a){var z
for(z=0;z<a.length;++z)C.a.t(a,z,this.bB(a[z]))
return a},
il:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.aV()
this.b.push(x)
z=J.eB(z,this.gij()).ct(0)
for(w=J.W(y),v=0;v<z.length;++v)x.t(0,z[v],this.bB(w.h(y,v)))
return x},
im:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.d1(x)
if(u==null)return
t=new H.ch(u,y)}else t=new H.e8(z,x,y)
this.b.push(t)
return t},
ik:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.W(z),v=J.W(y),u=0;u<w.gw(z);++u)x[w.h(z,u)]=this.bB(v.h(y,u))
return x}}}],["","",,H,{"^":"",
u7:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.J(a)
if(typeof z!=="string")throw H.c(H.a4(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bG:function(a){var z,y,x,w,v,u,t,s
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.Q||!!J.n(a).$isbm){v=C.T(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.c.bQ(w,0)===36)w=C.c.bh(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d8(H.cn(a),0,null),init.mangledGlobalNames)},
cN:function(a){return"Instance of '"+H.bG(a)+"'"},
ao:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.i.cR(z,10))>>>0,56320|z&1023)}throw H.c(P.a7(a,0,1114111,null,null))},
ft:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.a4(a))
return a[b]},
ba:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b2(!0,b,"index",null)
z=J.b0(a)
if(b<0||b>=z)return P.cG(b,a,"index",null,z)
return P.c9(b,"index",null)},
a4:function(a){return new P.b2(!0,a,null,null)},
d3:function(a){if(typeof a!=="number")throw H.c(H.a4(a))
return a},
cm:function(a){if(typeof a!=="string")throw H.c(H.a4(a))
return a},
c:function(a){var z
if(a==null)a=new P.cL()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iq})
z.name=""}else z.toString=H.iq
return z},
iq:function(){return J.J(this.dartException)},
e:function(a){throw H.c(a)},
ap:function(a){throw H.c(new P.B(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wb(a)
if(a==null)return
if(a instanceof H.dl)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.i.cR(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dt(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fk(v,null))}}if(a instanceof TypeError){u=$.$get$h5()
t=$.$get$h6()
s=$.$get$h7()
r=$.$get$h8()
q=$.$get$hc()
p=$.$get$hd()
o=$.$get$ha()
$.$get$h9()
n=$.$get$hf()
m=$.$get$he()
l=u.b8(y)
if(l!=null)return z.$1(H.dt(y,l))
else{l=t.b8(y)
if(l!=null){l.method="call"
return z.$1(H.dt(y,l))}else{l=s.b8(y)
if(l==null){l=r.b8(y)
if(l==null){l=q.b8(y)
if(l==null){l=p.b8(y)
if(l==null){l=o.b8(y)
if(l==null){l=r.b8(y)
if(l==null){l=n.b8(y)
if(l==null){l=m.b8(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fk(y,l==null?null:l.method))}}return z.$1(new H.p4(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fS()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b2(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fS()
return a},
E:function(a){var z
if(a instanceof H.dl)return a.b
if(a==null)return new H.hw(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hw(a,null)},
uo:function(a){if(a==null||typeof a!='object')return J.f(a)
else return H.aA(a)},
tz:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
ud:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ci(b,new H.ue(a))
case 1:return H.ci(b,new H.uf(a,d))
case 2:return H.ci(b,new H.ug(a,d,e))
case 3:return H.ci(b,new H.uh(a,d,e,f))
case 4:return H.ci(b,new H.ui(a,d,e,f,g))}throw H.c(P.cE("Unsupported number of arguments for wrapped closure"))},
d5:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ud)
a.$identity=z
return z},
jL:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isM){z.$reflectionInfo=c
x=H.n7(z).r}else x=c
w=d?Object.create(new H.og().constructor.prototype):Object.create(new H.de(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aJ
$.aJ=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eM(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.u7,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eH:H.df
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eM(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jI:function(a,b,c,d){var z=H.df
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eM:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jK(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jI(y,!w,z,b)
if(y===0){w=$.aJ
$.aJ=w+1
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.by
if(v==null){v=H.cx("self")
$.by=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aJ
$.aJ=w+1
t+=H.b(w)
w="return function("+t+"){return this."
v=$.by
if(v==null){v=H.cx("self")
$.by=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jJ:function(a,b,c,d){var z,y
z=H.df
y=H.eH
switch(b?-1:a){case 0:throw H.c(new H.nj("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jK:function(a,b){var z,y,x,w,v,u,t,s
z=H.jz()
y=$.eG
if(y==null){y=H.cx("receiver")
$.eG=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jJ(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aJ
$.aJ=u+1
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aJ
$.aJ=u+1
return new Function(y+H.b(u)+"}")()},
ei:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isM){c.fixed$length=Array
z=c}else z=c
return H.jL(a,b,z,!!d,e,f)},
ux:function(a,b){var z=J.W(b)
throw H.c(H.cz(H.bG(a),z.aw(b,3,z.gw(b))))},
y:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.ux(a,b)},
ek:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
aw:function(a,b){var z
if(a==null)return!1
z=H.ek(a)
return z==null?!1:H.en(z,b)},
hY:function(a,b){var z,y
if(a==null)return a
if(H.aw(a,b))return a
z=H.Y(b,null)
y=H.ek(a)
throw H.c(H.cz(y!=null?H.Y(y,null):H.bG(a),z))},
w8:function(a){throw H.c(new P.jZ(a))},
da:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
hT:function(a){return new H.aC(a,null)},
m:function(a,b){a.$ti=b
return a},
cn:function(a){if(a==null)return
return a.$ti},
i2:function(a,b){return H.ey(a["$as"+H.b(b)],H.cn(a))},
z:function(a,b,c){var z=H.i2(a,b)
return z==null?null:z[c]},
j:function(a,b){var z=H.cn(a)
return z==null?null:z[b]},
Y:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d8(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Y(z,b)
return H.qU(a,b)}return"unknown-reified-type"},
qU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Y(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Y(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Y(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.ty(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Y(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d8:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bk("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.Y(u,c)}return w?"":"<"+z.i(0)+">"},
u6:function(a){var z,y
if(a instanceof H.a){z=H.ek(a)
if(z!=null)return H.Y(z,null)}y=J.n(a).constructor.builtin$cls
if(a==null)return y
return y+H.d8(a.$ti,0,null)},
ey:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aQ:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cn(a)
y=J.n(a)
if(y[b]==null)return!1
return H.hL(H.ey(y[d],z),c)},
aH:function(a,b,c,d){if(a==null)return a
if(H.aQ(a,b,c,d))return a
throw H.c(H.cz(H.bG(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d8(c,0,null),init.mangledGlobalNames)))},
hL:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.am(a[y],b[y]))return!1
return!0},
d4:function(a,b,c){return a.apply(b,H.i2(b,c))},
hP:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="as"
if(b==null)return!0
z=H.cn(a)
a=J.n(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.en(x.apply(a,null),b)}return H.am(y,b)},
il:function(a,b){if(a!=null&&!H.hP(a,b))throw H.c(H.cz(H.bG(a),H.Y(b,null)))
return a},
am:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="as")return!0
if('func' in b)return H.en(a,b)
if('func' in a)return b.builtin$cls==="bA"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.Y(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hL(H.ey(u,z),x)},
hK:function(a,b,c){var z,y,x,w,v
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
r5:function(a,b){var z,y,x,w,v,u
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
en:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hK(x,w,!1))return!1
if(!H.hK(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}}return H.r5(a.named,b.named)},
w1:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$isf4){z=C.c.bh(a,c)
return b.b.test(z)}else{z=z.dO(b,C.c.bh(a,c))
return!z.ga4(z)}}},
k:function(a,b,c){var z,y,x
H.cm(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
wX:[function(a){return a},"$1","hy",2,0,19],
w2:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdJ)throw H.c(P.dd(b,"pattern","is not a Pattern"))
for(z=z.dO(b,a),z=new H.hn(z.a,z.b,z.c,null),y=0,x="";z.B();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hy().$1(C.c.aw(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hy().$1(C.c.bh(a,y)))
return z.charCodeAt(0)==0?z:z},
b_:function(a,b,c,d){var z,y,x,w,v
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.ik(a,z,z+b.length,c)}if(b==null)H.e(H.a4(b))
y=J.iB(b,a,d)
x=new H.hx(y.a,y.b,y.c,null)
if(!x.B())return a
w=x.d
y=w.a
v=w.c
H.cm(c)
return H.ik(a,y,P.ca(y,y+v.length,a.length,null,null,null),c)},
ik:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jP:{"^":"d;$ti",
ga4:function(a){return this.gw(this)===0},
i:function(a){return P.dC(this)},
$isH:1},
jQ:{"^":"jP;a,b,c,$ti",
gw:function(a){return this.a},
ad:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.ad(b))return
return this.eC(b)},
eC:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eC(w))}}},
n6:{"^":"d;a,b,c,d,e,f,r,x",A:{
n7:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.n6(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
p_:{"^":"d;a,b,c,d,e,f",
b8:function(a){var z,y,x
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
aL:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.p_(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cW:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hb:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fk:{"^":"a5;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+z+"' on null"}},
lM:{"^":"a5;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
dt:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lM(a,y,z?null:b.receiver)}}},
p4:{"^":"a5;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dl:{"^":"d;a,bO:b<"},
wb:{"^":"a:0;a",
$1:function(a){if(!!J.n(a).$isa5)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hw:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ue:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uf:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
ug:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uh:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ui:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
i:function(a){return"Closure '"+H.bG(this).trim()+"'"},
gfJ:function(){return this},
$isbA:1,
gfJ:function(){return this}},
h4:{"^":"a;"},
og:{"^":"h4;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
de:{"^":"h4;a,b,c,d",
S:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.de))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.f(z):H.aA(z)
return(y^H.aA(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cN(z)},
A:{
df:function(a){return a.a},
eH:function(a){return a.c},
jz:function(){var z=$.by
if(z==null){z=H.cx("self")
$.by=z}return z},
cx:function(a){var z,y,x,w,v
z=new H.de("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jE:{"^":"a5;a",
i:function(a){return this.a},
A:{
cz:function(a,b){return new H.jE("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nj:{"^":"a5;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
aC:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gD:function(a){return J.f(this.a)},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.aC){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
P:{"^":"d;a,b,c,d,e,f,r,$ti",
gw:function(a){return this.a},
ga4:function(a){return this.a===0},
gbU:function(){return new H.m2(this,[H.j(this,0)])},
gc_:function(){return H.bC(this.gbU(),new H.lL(this),H.j(this,0),H.j(this,1))},
ad:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.ey(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.ey(y,a)}else return this.iD(a)},
iD:function(a){var z=this.d
if(z==null)return!1
return this.co(this.cO(z,this.cn(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c5(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c5(x,b)
return y==null?null:y.b}else return this.iE(b)},
iE:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cO(z,this.cn(a))
x=this.co(y,a)
if(x<0)return
return y[x].b},
t:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dD()
this.b=z}this.eq(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dD()
this.c=y}this.eq(y,b,c)}else this.iG(b,c)},
iG:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dD()
this.d=z}y=this.cn(a)
x=this.cO(z,y)
if(x==null)this.dH(z,y,[this.dE(a,b)])
else{w=this.co(x,a)
if(w>=0)x[w].b=b
else x.push(this.dE(a,b))}},
iZ:function(a,b){var z
if(this.ad(a))return this.h(0,a)
z=b.$0()
this.t(0,a,z)
return z},
a_:function(a,b){if(typeof b==="string")return this.eR(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eR(this.c,b)
else return this.iF(b)},
iF:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cO(z,this.cn(a))
x=this.co(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eT(w)
return w.b},
aW:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
eq:function(a,b,c){var z=this.c5(a,b)
if(z==null)this.dH(a,b,this.dE(b,c))
else z.b=c},
eR:function(a,b){var z
if(a==null)return
z=this.c5(a,b)
if(z==null)return
this.eT(z)
this.ez(a,b)
return z.b},
dE:function(a,b){var z,y
z=new H.m1(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eT:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cn:function(a){return J.f(a)&0x3ffffff},
co:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.u(a[y].a,b))return y
return-1},
i:function(a){return P.dC(this)},
c5:function(a,b){return a[b]},
cO:function(a,b){return a[b]},
dH:function(a,b,c){a[b]=c},
ez:function(a,b){delete a[b]},
ey:function(a,b){return this.c5(a,b)!=null},
dD:function(){var z=Object.create(null)
this.dH(z,"<non-identifier-key>",z)
this.ez(z,"<non-identifier-key>")
return z},
$islx:1,
$isH:1,
A:{
f6:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])}}},
lL:{"^":"a:0;a",
$1:function(a){return this.a.h(0,a)}},
m1:{"^":"d;a,b,c,d,$ti"},
m2:{"^":"aj;a,$ti",
gw:function(a){return this.a.a},
ga4:function(a){return this.a.a===0},
ga5:function(a){var z,y
z=this.a
y=new H.m3(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
m3:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
B:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
f4:{"^":"d;a,b,c,d",
i:function(a){return"RegExp/"+this.a+"/"},
ghC:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ds(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghB:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.ds(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
cS:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return new H.pE(this,b,c)},
dO:function(a,b){return this.cS(a,b,0)},
hs:function(a,b){var z,y
z=this.ghC()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hv(this,y)},
hr:function(a,b){var z,y
z=this.ghB()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(y.pop()!=null)return
return new H.hv(this,y)},
fc:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return this.hr(b,c)},
$isdJ:1,
A:{
ds:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eU("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hv:{"^":"d;a,b",
h:function(a,b){return this.b[b]},
$isbg:1},
pE:{"^":"c4;a,b,c",
ga5:function(a){return new H.hn(this.a,this.b,this.c,null)},
$asc4:function(){return[P.bg]},
$asD:function(){return[P.bg]}},
hn:{"^":"d;a,b,c,d",
gU:function(){return this.d},
B:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hs(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fX:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.e(P.c9(b,null,null))
return this.c},
$isbg:1},
qA:{"^":"D;a,b,c",
ga5:function(a){return new H.hx(this.a,this.b,this.c,null)},
$asD:function(){return[P.bg]}},
hx:{"^":"d;a,b,c,d",
B:function(){var z,y,x,w,v,u,t
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
this.d=new H.fX(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gU:function(){return this.d}}}],["","",,H,{"^":"",
ty:function(a){var z=H.m(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uw:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pF:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.r6()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d5(new P.pH(z),1)).observe(y,{childList:true})
return new P.pG(z,y,x)}else if(self.setImmediate!=null)return P.r7()
return P.r8()},
wR:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d5(new P.pI(a),0))},"$1","r6",2,0,15],
wS:[function(a){++init.globalState.f.b
self.setImmediate(H.d5(new P.pJ(a),0))},"$1","r7",2,0,15],
wT:[function(a){P.dW(C.E,a)},"$1","r8",2,0,15],
aF:function(a,b){P.e9(null,a)
return b.a},
au:function(a,b){P.e9(a,b)},
aE:function(a,b){b.bz(a)},
aD:function(a,b){b.dS(H.A(a),H.E(a))},
e9:function(a,b){var z,y,x,w
z=new P.qJ(b)
y=new P.qK(b)
x=J.n(a)
if(!!x.$isK)a.dI(z,y)
else if(!!x.$isO)a.ec(z,y)
else{w=new P.K(0,$.p,null,[null])
w.a=4
w.c=a
w.dI(z,null)}},
av:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.r4(z)},
d0:function(a,b,c){var z,y,x,w,v
if(b===0){z=c.c
if(z!=null)z.eZ()
else c.a.bm()
return}else if(b===1){z=c.c
if(z!=null)z.dS(H.A(a),H.E(a))
else{y=H.A(a)
x=H.E(a)
z=c.a
if(z.b>=4)H.e(z.c3())
if(y==null)y=new P.cL()
$.p.toString
z.dl(y,x)
c.a.bm()}return}if(a instanceof P.bO){if(c.c!=null){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
w=c.a
if(w.b>=4)H.e(w.c3())
w.cJ(z)
P.cq(new P.qH(b,c))
return}else if(z===1){v=a.a
c.a.i3(v,!1).bH(new P.qI(b,c))
return}}P.e9(a,b)},
r3:function(a){var z=a.a
z.toString
return new P.cX(z,[H.j(z,0)])},
ee:function(a,b){if(H.aw(a,{func:1,args:[P.as,P.as]})){b.toString
return a}else{b.toString
return a}},
ax:function(a){return new P.qB(new P.K(0,$.p,null,[a]),[a])},
qW:function(){var z,y
for(;z=$.bp,z!=null;){$.bS=null
y=z.b
$.bp=y
if(y==null)$.bR=null
z.a.$0()}},
wW:[function(){$.eb=!0
try{P.qW()}finally{$.bS=null
$.eb=!1
if($.bp!=null)$.$get$e_().$1(P.hM())}},"$0","hM",0,0,7],
hG:function(a){var z=new P.ho(a,null)
if($.bp==null){$.bR=z
$.bp=z
if(!$.eb)$.$get$e_().$1(P.hM())}else{$.bR.b=z
$.bR=z}},
r2:function(a){var z,y,x
z=$.bp
if(z==null){P.hG(a)
$.bS=$.bR
return}y=new P.ho(a,null)
x=$.bS
if(x==null){y.b=z
$.bS=y
$.bp=y}else{y.b=x.b
x.b=y
$.bS=y
if(y.b==null)$.bR=y}},
cq:function(a){var z=$.p
if(C.k===z){P.br(null,null,C.k,a)
return}z.toString
P.br(null,null,z,z.dP(a,!0))},
wM:function(a,b){return new P.qz(null,a,!1,[b])},
ef:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.A(x)
y=H.E(x)
w=$.p
w.toString
P.bq(null,null,w,z,y)}},
qX:[function(a,b){var z=$.p
z.toString
P.bq(null,null,z,a,b)},function(a){return P.qX(a,null)},"$2","$1","ra",2,2,22,0],
wV:[function(){},"$0","r9",0,0,7],
r1:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.A(u)
y=H.E(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gf3()
w=t
v=x.gbO()
c.$2(w,v)}}},
qL:function(a,b,c,d){var z=a.ci()
if(!!J.n(z).$isO&&z!==$.$get$be())z.bI(new P.qO(b,c,d))
else b.b5(c,d)},
qM:function(a,b){return new P.qN(a,b)},
qP:function(a,b,c){var z=a.ci()
if(!!J.n(z).$isO&&z!==$.$get$be())z.bI(new P.qQ(b,c))
else b.bj(c)},
oZ:function(a,b){var z=$.p
if(z===C.k){z.toString
return P.dW(a,b)}return P.dW(a,z.dP(b,!0))},
dW:function(a,b){var z=C.i.bu(a.a,1000)
return H.oW(z<0?0:z,b)},
ph:function(){return $.p},
bq:function(a,b,c,d,e){var z={}
z.a=d
P.r2(new P.r_(z,e))},
hD:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hF:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hE:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
br:function(a,b,c,d){var z=C.k!==c
if(z)d=c.dP(d,!(!z||!1))
P.hG(d)},
pH:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pG:{"^":"a:33;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pI:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pJ:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qJ:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qK:{"^":"a:29;a",
$2:function(a,b){this.a.$2(1,new H.dl(a,b))}},
r4:{"^":"a:46;a",
$2:function(a,b){this.a(a,b)}},
qH:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.b
y=z.a
x=y.b
if((x&1)!==0?(y.gbk().e&4)!==0:(x&2)===0){z.b=!0
return}this.a.$2(null,0)}},
qI:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pK:{"^":"d;a,b,c",
hb:function(a){var z=new P.pN(a)
this.a=new P.pS(null,0,null,new P.pP(z),null,new P.pQ(this,z),new P.pR(this,a),[null])},
A:{
pL:function(a){var z=new P.pK(null,!1,null)
z.hb(a)
return z}}},
pN:{"^":"a:2;a",
$0:function(){P.cq(new P.pO(this.a))}},
pO:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
pP:{"^":"a:2;a",
$0:function(){this.a.$0()}},
pQ:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b){z.b=!1
this.b.$0()}}},
pR:{"^":"a:2;a,b",
$0:function(){var z=this.a
if((z.a.b&4)===0){z.c=new P.cf(new P.K(0,$.p,null,[null]),[null])
if(z.b){z.b=!1
P.cq(new P.pM(this.b))}return z.c.a}}},
pM:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bO:{"^":"d;al:a<,b",
i:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bP:function(a){return new P.bO(a,1)},
aN:function(){return C.a9},
hs:function(a){return new P.bO(a,0)},
aO:function(a){return new P.bO(a,3)}}},
b9:{"^":"d;a,b,c,d",
gU:function(){var z=this.c
return z==null?this.b:z.gU()},
B:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.B())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bO){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ar(z)
if(!!w.$isb9){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qC:{"^":"c4;a",
ga5:function(a){return new P.b9(this.a(),null,null,null)},
$asc4:I.bb,
$asD:I.bb,
A:{
aP:function(a){return new P.qC(a)}}},
O:{"^":"d;$ti"},
hq:{"^":"d;$ti",
dS:function(a,b){if(a==null)a=new P.cL()
if(this.a.a!==0)throw H.c(new P.t("Future already completed"))
$.p.toString
this.b5(a,b)},
cW:function(a){return this.dS(a,null)}},
cf:{"^":"hq;a,$ti",
bz:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.t("Future already completed"))
z.bi(a)},
eZ:function(){return this.bz(null)},
b5:function(a,b){this.a.eu(a,b)}},
qB:{"^":"hq;a,$ti",
bz:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.t("Future already completed"))
z.bj(a)},
eZ:function(){return this.bz(null)},
b5:function(a,b){this.a.b5(a,b)}},
e4:{"^":"d;a,b,c,d,e,$ti",
iP:function(a){if(this.c!==6)return!0
return this.b.b.ea(this.d,a.a)},
iu:function(a){var z,y
z=this.e
y=this.b.b
if(H.aw(z,{func:1,args:[,,]}))return y.jc(z,a.a,a.b)
else return y.ea(z,a.a)}},
K:{"^":"d;cc:a<,b,hL:c<,$ti",
ec:function(a,b){var z=$.p
if(z!==C.k){z.toString
if(b!=null)b=P.ee(b,z)}return this.dI(a,b)},
bH:function(a){return this.ec(a,null)},
dI:function(a,b){var z,y
z=new P.K(0,$.p,null,[null])
y=b==null?1:3
this.cH(new P.e4(null,z,y,a,b,[H.j(this,0),null]))
return z},
bI:function(a){var z,y
z=$.p
y=new P.K(0,z,null,this.$ti)
if(z!==C.k)z.toString
z=H.j(this,0)
this.cH(new P.e4(null,y,8,a,null,[z,z]))
return y},
cH:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.cH(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.br(null,null,z,new P.q0(this,a))}},
eO:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.eO(a)
return}this.a=u
this.c=y.c}z.a=this.c7(a)
y=this.b
y.toString
P.br(null,null,y,new P.q7(z,this))}},
dG:function(){var z=this.c
this.c=null
return this.c7(z)},
c7:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
bj:function(a){var z,y
z=this.$ti
if(H.aQ(a,"$isO",z,"$asO"))if(H.aQ(a,"$isK",z,null))P.cZ(a,this)
else P.hr(a,this)
else{y=this.dG()
this.a=4
this.c=a
P.bn(this,y)}},
b5:[function(a,b){var z=this.dG()
this.a=8
this.c=new P.cv(a,b)
P.bn(this,z)},function(a){return this.b5(a,null)},"jq","$2","$1","gcK",2,2,22,0],
bi:function(a){var z
if(H.aQ(a,"$isO",this.$ti,"$asO")){this.hk(a)
return}this.a=1
z=this.b
z.toString
P.br(null,null,z,new P.q2(this,a))},
hk:function(a){var z
if(H.aQ(a,"$isK",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.br(null,null,z,new P.q6(this,a))}else P.cZ(a,this)
return}P.hr(a,this)},
eu:function(a,b){var z
this.a=1
z=this.b
z.toString
P.br(null,null,z,new P.q1(this,a,b))},
hd:function(a,b){this.a=4
this.c=a},
$isO:1,
A:{
hr:function(a,b){var z,y,x
b.a=1
try{a.ec(new P.q3(b),new P.q4(b))}catch(x){z=H.A(x)
y=H.E(x)
P.cq(new P.q5(b,z,y))}},
cZ:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.c7(y)
b.a=a.a
b.c=a.c
P.bn(b,x)}else{b.a=2
b.c=a
a.eO(y)}},
bn:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.bq(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.bn(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.bq(null,null,y,v,u)
return}p=$.p
if(p==null?r!=null:p!==r)$.p=r
else p=null
y=b.c
if(y===8)new P.qa(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.q9(x,b,s).$0()}else if((y&2)!==0)new P.q8(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.n(y).$isO){if(y.a>=4){o=u.c
u.c=null
b=u.c7(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.cZ(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.c7(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
q0:{"^":"a:2;a,b",
$0:function(){P.bn(this.a,this.b)}},
q7:{"^":"a:2;a,b",
$0:function(){P.bn(this.b,this.a.a)}},
q3:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bj(a)}},
q4:{"^":"a:52;a",
$2:function(a,b){this.a.b5(a,b)},
$1:function(a){return this.$2(a,null)}},
q5:{"^":"a:2;a,b,c",
$0:function(){this.a.b5(this.b,this.c)}},
q2:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dG()
z.a=4
z.c=this.b
P.bn(z,y)}},
q6:{"^":"a:2;a,b",
$0:function(){P.cZ(this.b,this.a)}},
q1:{"^":"a:2;a,b,c",
$0:function(){this.a.b5(this.b,this.c)}},
qa:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.fs(w.d)}catch(v){y=H.A(v)
x=H.E(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.cv(y,x)
u.a=!0
return}if(!!J.n(z).$isO){if(z instanceof P.K&&z.gcc()>=4){if(z.gcc()===8){w=this.b
w.b=z.ghL()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.bH(new P.qb(t))
w.a=!1}}},
qb:{"^":"a:0;a",
$1:function(a){return this.a}},
q9:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.ea(x.d,this.c)}catch(w){z=H.A(w)
y=H.E(w)
x=this.a
x.b=new P.cv(z,y)
x.a=!0}}},
q8:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.iP(z)&&w.e!=null){v=this.b
v.b=w.iu(z)
v.a=!1}}catch(u){y=H.A(u)
x=H.E(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.cv(y,x)
s.a=!0}}},
ho:{"^":"d;a,b"},
bM:{"^":"d;$ti",
Z:function(a,b){var z,y
z={}
y=new P.K(0,$.p,null,[null])
z.a=null
z.a=this.bo(new P.or(z,this,b,y),!0,new P.os(y),y.gcK())
return y},
gw:function(a){var z,y
z={}
y=new P.K(0,$.p,null,[P.q])
z.a=0
this.bo(new P.ov(z),!0,new P.ow(z,y),y.gcK())
return y},
ga4:function(a){var z,y
z={}
y=new P.K(0,$.p,null,[P.ae])
z.a=null
z.a=this.bo(new P.ot(z,y),!0,new P.ou(y),y.gcK())
return y},
ct:function(a){var z,y,x
z=H.z(this,"bM",0)
y=H.m([],[z])
x=new P.K(0,$.p,null,[[P.M,z]])
this.bo(new P.ox(this,y),!0,new P.oy(y,x),x.gcK())
return x}},
or:{"^":"a;a,b,c,d",
$1:function(a){P.r1(new P.op(this.c,a),new P.oq(),P.qM(this.a.a,this.d))},
$S:function(){return H.d4(function(a){return{func:1,args:[a]}},this.b,"bM")}},
op:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oq:{"^":"a:0;",
$1:function(a){}},
os:{"^":"a:2;a",
$0:function(){this.a.bj(null)}},
ov:{"^":"a:0;a",
$1:function(a){++this.a.a}},
ow:{"^":"a:2;a,b",
$0:function(){this.b.bj(this.a.a)}},
ot:{"^":"a:0;a,b",
$1:function(a){P.qP(this.a.a,this.b,!1)}},
ou:{"^":"a:2;a",
$0:function(){this.a.bj(!0)}},
ox:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.d4(function(a){return{func:1,args:[a]}},this.a,"bM")}},
oy:{"^":"a:2;a,b",
$0:function(){this.b.bj(this.a)}},
d_:{"^":"d;cc:b<,$ti",
ghF:function(){if((this.b&8)===0)return this.a
return this.a.c},
dv:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e7(null,null,0,this.$ti)
this.a=z}return z}y=this.a
z=y.c
if(z==null){z=new P.e7(null,null,0,this.$ti)
y.c=z}return z},
gbk:function(){if((this.b&8)!==0)return this.a.c
return this.a},
c3:function(){if((this.b&4)!==0)return new P.t("Cannot add event after closing")
return new P.t("Cannot add event while adding a stream")},
i3:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c3())
if((z&2)!==0){z=new P.K(0,$.p,null,[null])
z.bi(null)
return z}z=this.a
y=new P.K(0,$.p,null,[null])
x=a.bo(this.ghi(),!1,this.ghj(),this.ghf())
w=this.b
if((w&1)!==0?(this.gbk().e&4)!==0:(w&2)===0)x.fh()
this.a=new P.qv(z,y,x,this.$ti)
this.b|=8
return y},
eB:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$be():new P.K(0,$.p,null,[null])
this.c=z}return z},
u:[function(a,b){if(this.b>=4)throw H.c(this.c3())
this.cJ(b)},"$1","ghT",2,0,function(){return H.d4(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d_")}],
bm:function(){var z=this.b
if((z&4)!==0)return this.eB()
if(z>=4)throw H.c(this.c3())
z|=4
this.b=z
if((z&1)!==0)this.ca()
else if((z&3)===0)this.dv().u(0,C.x)
return this.eB()},
cJ:[function(a){var z=this.b
if((z&1)!==0)this.c9(a)
else if((z&3)===0)this.dv().u(0,new P.e1(a,null,this.$ti))},"$1","ghi",2,0,function(){return H.d4(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d_")}],
dl:[function(a,b){var z=this.b
if((z&1)!==0)this.cb(a,b)
else if((z&3)===0)this.dv().u(0,new P.e2(a,b,null))},"$2","ghf",4,0,40],
es:[function(){var z=this.a
this.a=z.c
this.b&=4294967287
z.a.bi(null)},"$0","ghj",0,0,7],
hP:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.t("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.pW(this,null,null,null,z,y,null,null,this.$ti)
x.hc(a,b,c,d,H.j(this,0))
w=this.ghF()
y=this.b|=1
if((y&8)!==0){v=this.a
v.c=x
v.b.fq()}else this.a=x
x.hN(w)
x.dC(new P.qx(this))
return x},
hI:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ci()
this.a=null
this.b=this.b&4294967286|2
if(z==null)try{z=this.r.$0()}catch(w){y=H.A(w)
x=H.E(w)
v=new P.K(0,$.p,null,[null])
v.eu(y,x)
z=v}else z=z.bI(this.r)
u=new P.qw(this)
if(z!=null)z=z.bI(u)
else u.$0()
return z}},
qx:{"^":"a:2;a",
$0:function(){P.ef(this.a.d)}},
qw:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bi(null)}},
qE:{"^":"d;$ti",
c9:function(a){this.gbk().cJ(a)},
cb:function(a,b){this.gbk().dl(a,b)},
ca:function(){this.gbk().es()}},
pT:{"^":"d;$ti",
c9:function(a){this.gbk().bP(new P.e1(a,null,[H.j(this,0)]))},
cb:function(a,b){this.gbk().bP(new P.e2(a,b,null))},
ca:function(){this.gbk().bP(C.x)}},
pS:{"^":"d_+pT;a,b,c,d,e,f,r,$ti"},
qD:{"^":"d_+qE;a,b,c,d,e,f,r,$ti"},
cX:{"^":"qy;a,$ti",
gD:function(a){return(H.aA(this.a)^892482866)>>>0},
S:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cX))return!1
return b.a===this.a}},
pW:{"^":"e0;x,a,b,c,d,e,f,r,$ti",
eJ:function(){return this.x.hI(this)},
eL:[function(){var z=this.x
if((z.b&8)!==0)z.a.b.fh()
P.ef(z.e)},"$0","geK",0,0,7],
eN:[function(){var z=this.x
if((z.b&8)!==0)z.a.b.fq()
P.ef(z.f)},"$0","geM",0,0,7]},
pC:{"^":"d;$ti",
ci:function(){var z=this.b.ci()
if(z==null){this.a.bi(null)
return}return z.bI(new P.pD(this))}},
pD:{"^":"a:2;a",
$0:function(){this.a.a.bi(null)}},
qv:{"^":"pC;c,a,b,$ti"},
e0:{"^":"d;cc:e<,$ti",
hN:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.cC(this)}},
iU:function(a){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.dC(this.geK())},
fh:function(){return this.iU(null)},
fq:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128)if((z&64)!==0&&this.r.c!=null)this.r.cC(this)
else{z=(z&4294967291)>>>0
this.e=z
if((z&32)===0)this.dC(this.geM())}}},
ci:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dn()
z=this.f
return z==null?$.$get$be():z},
dn:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.eJ()},
cJ:function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c9(a)
else this.bP(new P.e1(a,null,[H.z(this,"e0",0)]))},
dl:function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cb(a,b)
else this.bP(new P.e2(a,b,null))},
es:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ca()
else this.bP(C.x)},
eL:[function(){},"$0","geK",0,0,7],
eN:[function(){},"$0","geM",0,0,7],
eJ:function(){return},
bP:function(a){var z,y
z=this.r
if(z==null){z=new P.e7(null,null,0,[H.z(this,"e0",0)])
this.r=z}z.u(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cC(this)}},
c9:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fv(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dr((z&4)!==0)},
cb:function(a,b){var z,y
z=this.e
y=new P.pV(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dn()
z=this.f
if(!!J.n(z).$isO&&z!==$.$get$be())z.bI(y)
else y.$0()}else{y.$0()
this.dr((z&4)!==0)}},
ca:function(){var z,y
z=new P.pU(this)
this.dn()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isO&&y!==$.$get$be())y.bI(z)
else z.$0()},
dC:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dr((z&4)!==0)},
dr:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.eL()
else this.eN()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.cC(this)},
hc:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ee(b==null?P.ra():b,z)
this.c=c==null?P.r9():c}},
pV:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aw(y,{func:1,args:[P.d,P.bj]})
w=z.d
v=this.b
u=z.b
if(x)w.jd(u,v,this.c)
else w.fv(u,v)
z.e=(z.e&4294967263)>>>0}},
pU:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ft(z.c)
z.e=(z.e&4294967263)>>>0}},
qy:{"^":"bM;$ti",
bo:function(a,b,c,d){return this.a.hP(a,d,c,!0===b)}},
e3:{"^":"d;d3:a@,$ti"},
e1:{"^":"e3;al:b<,a,$ti",
e4:function(a){a.c9(this.b)}},
e2:{"^":"e3;f3:b<,bO:c<,a",
e4:function(a){a.cb(this.b,this.c)},
$ase3:I.bb},
pX:{"^":"d;",
e4:function(a){a.ca()},
gd3:function(){return},
sd3:function(a){throw H.c(new P.t("No events after a done."))}},
qq:{"^":"d;cc:a<,$ti",
cC:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cq(new P.qr(this,a))
this.a=1}},
qr:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gd3()
z.b=w
if(w==null)z.c=null
x.e4(this.b)}},
e7:{"^":"qq;b,c,a,$ti",
ga4:function(a){return this.c==null},
u:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sd3(b)
this.c=b}}},
qz:{"^":"d;a,b,c,$ti"},
qO:{"^":"a:2;a,b,c",
$0:function(){return this.a.b5(this.b,this.c)}},
qN:{"^":"a:29;a,b",
$2:function(a,b){P.qL(this.a,this.b,a,b)}},
qQ:{"^":"a:2;a,b",
$0:function(){return this.a.bj(this.b)}},
cv:{"^":"d;f3:a<,bO:b<",
i:function(a){return H.b(this.a)},
$isa5:1},
qG:{"^":"d;"},
r_:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cL()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.i(0)
throw x}},
qs:{"^":"qG;",
ft:function(a){var z,y,x,w
try{if(C.k===$.p){x=a.$0()
return x}x=P.hD(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.E(w)
return P.bq(null,null,this,z,y)}},
fv:function(a,b){var z,y,x,w
try{if(C.k===$.p){x=a.$1(b)
return x}x=P.hF(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.E(w)
return P.bq(null,null,this,z,y)}},
jd:function(a,b,c){var z,y,x,w
try{if(C.k===$.p){x=a.$2(b,c)
return x}x=P.hE(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.E(w)
return P.bq(null,null,this,z,y)}},
dP:function(a,b){if(b)return new P.qt(this,a)
else return new P.qu(this,a)},
h:function(a,b){return},
fs:function(a){if($.p===C.k)return a.$0()
return P.hD(null,null,this,a)},
ea:function(a,b){if($.p===C.k)return a.$1(b)
return P.hF(null,null,this,a,b)},
jc:function(a,b,c){if($.p===C.k)return a.$2(b,c)
return P.hE(null,null,this,a,b,c)}},
qt:{"^":"a:2;a,b",
$0:function(){return this.a.ft(this.b)}},
qu:{"^":"a:2;a,b",
$0:function(){return this.a.fs(this.b)}}}],["","",,P,{"^":"",
fa:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])},
aV:function(){return new H.P(0,null,null,null,null,null,0,[null,null])},
a_:function(a){return H.tz(a,new H.P(0,null,null,null,null,null,0,[null,null]))},
lH:function(a,b,c){var z,y
if(P.ec(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bT()
y.push(a)
try{P.qV(a,z)}finally{y.pop()}y=P.fW(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cH:function(a,b,c){var z,y,x
if(P.ec(a))return b+"..."+c
z=new P.bk(b)
y=$.$get$bT()
y.push(a)
try{x=z
x.C=P.fW(x.gC(),a,", ")}finally{y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
ec:function(a){var z,y
for(z=0;y=$.$get$bT(),z<y.length;++z)if(a===y[z])return!0
return!1},
qV:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga5(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.B())return
w=H.b(z.gU())
b.push(w)
y+=w.length+2;++x}if(!z.B()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gU();++x
if(!z.B()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
u=b.pop()
y+=v.length+2}else{s=z.gU();++x
for(;z.B();t=s,s=r){r=z.gU();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
m4:function(a,b,c,d,e){return new H.P(0,null,null,null,null,null,0,[d,e])},
fb:function(a,b,c){var z=P.m4(null,null,null,b,c)
a.Z(0,new P.rh(z))
return z},
ag:function(a,b,c,d){return new P.ht(0,null,null,null,null,null,0,[d])},
cJ:function(a,b){var z,y
z=P.ag(null,null,null,b)
for(y=J.ar(a);y.B();)z.u(0,y.gU())
return z},
dC:function(a){var z,y,x
z={}
if(P.ec(a))return"{...}"
y=new P.bk("")
try{$.$get$bT().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Z(0,new P.me(z,y))
z=y
z.C=z.gC()+"}"}finally{$.$get$bT().pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hu:{"^":"P;a,b,c,d,e,f,r,$ti",
cn:function(a){return H.uo(a)&0x3ffffff},
co:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
A:{
bQ:function(a,b){return new P.hu(0,null,null,null,null,null,0,[a,b])}}},
ht:{"^":"qc;a,b,c,d,e,f,r,$ti",
hD:function(){return new P.ht(0,null,null,null,null,null,0,this.$ti)},
ga5:function(a){var z=new P.ad(this,this.r,null,null,[null])
z.c=this.e
return z},
gw:function(a){return this.a},
ga4:function(a){return this.a===0},
ag:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hm(b)},
hm:function(a){var z=this.d
if(z==null)return!1
return this.cM(z[this.cL(a)],a)>=0},
d1:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.ag(0,a)?a:null
else return this.hA(a)},
hA:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cL(a)]
x=this.cM(y,a)
if(x<0)return
return J.aI(y,x).ghp()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
u:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.ev(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.ev(x,b)}else return this.ax(b)},
ax:function(a){var z,y,x
z=this.d
if(z==null){z=P.ql()
this.d=z}y=this.cL(a)
x=z[y]
if(x==null)z[y]=[this.ds(a)]
else{if(this.cM(x,a)>=0)return!1
x.push(this.ds(a))}return!0},
a_:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ew(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ew(this.c,b)
else return this.hJ(b)},
hJ:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cL(a)]
x=this.cM(y,a)
if(x<0)return!1
this.ex(y.splice(x,1)[0])
return!0},
hu:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.a_(0,y)}},
aW:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
ev:function(a,b){if(a[b]!=null)return!1
a[b]=this.ds(b)
return!0},
ew:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ex(z)
delete a[b]
return!0},
ds:function(a){var z,y
z=new P.qk(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ex:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cL:function(a){return J.f(a)&0x3ffffff},
cM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.u(a[y].a,b))return y
return-1},
$isdS:1,
$isaj:1,
A:{
ql:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qk:{"^":"d;hp:a<,b,c"},
ad:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
B:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qc:{"^":"nP;$ti"},
c4:{"^":"D;$ti"},
rh:{"^":"a:5;a",
$2:function(a,b){this.a.t(0,a,b)}},
fc:{"^":"fl;$ti"},
fl:{"^":"d+b6;$ti",$asM:null,$asaj:null,$isM:1,$isaj:1},
b6:{"^":"d;$ti",
ga5:function(a){return new H.dy(this,this.gw(this),0,null,[H.z(this,"b6",0)])},
ar:function(a,b){return this.b[b]},
Z:function(a,b){var z,y,x
z=this.b
y=z.length
for(x=0;x<y;++x){b.$1(z[x])
if(y!==z.length)throw H.c(new P.B(this))}},
ga4:function(a){return this.b.length===0},
gf8:function(a){return this.b.length!==0},
gE:function(a){var z,y
z=this.b
y=z.length
if(y===0)throw H.c(H.aT())
return z[y-1]},
ag:function(a,b){var z,y,x,w
z=this.b
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?b==null:w===b)return!0}return!1},
b6:function(a,b){var z,y,x
z=this.b
y=z.length
for(x=0;x<y;++x){if(b.$1(z[x]))return!0
if(y!==z.length)throw H.c(new P.B(this))}return!1},
aX:function(a,b,c){var z,y,x,w
z=this.b
y=z.length
for(x=0;x<y;++x){w=z[x]
if(b.$1(w))return w
if(y!==z.length)throw H.c(new P.B(this))}return c.$0()},
bp:function(a,b){return new H.ak(this,b,[H.z(this,"b6",0),null])},
em:function(a,b){return H.fY(this,b,null,H.z(this,"b6",0))},
fz:function(a){var z,y,x
z=P.ag(null,null,null,H.z(this,"b6",0))
for(y=this.b,x=0;x<y.length;++x)z.u(0,y[x])
return z},
u:function(a,b){var z,y
z=this.b
y=z.length
C.a.sw(z,y+1)
z[y]=b},
a_:function(a,b){var z,y,x
for(z=this.b,y=z.length,x=0;x<y;++x)if(z[x]===b){this.aN(0,x,y-1,this,x+1)
C.a.sw(z,z.length-1)
return!0}return!1},
ht:function(a,b){var z,y,x,w,v,u
z=H.m([],[H.z(this,"b6",0)])
y=this.b
x=y.length
for(w=x,v=0;v<x;++v){w=y[v]
if(J.u(a.$1(w),b))z.push(w)
w=y.length
if(x!==w)throw H.c(new P.B(this))}u=z.length
if(u!==w){this.fW(0,0,u,z)
C.a.sw(y,z.length)}},
aN:function(a,b,c,d,e){var z,y,x,w,v,u
z=this.b
P.ca(b,c,z.length,null,null,null)
y=c-b
if(y===0)return
if(H.aQ(d,"$isM",[H.z(this,"b6",0)],"$asM")){x=e
w=d}else{w=J.iI(d,e).bZ(0,!1)
x=0}v=J.W(w)
if(x+y>v.gw(w))throw H.c(H.f_())
if(x<b)for(u=y-1;u>=0;--u)z[b+u]=v.h(w,x+u)
else for(u=0;u<y;++u)z[b+u]=v.h(w,x+u)},
fW:function(a,b,c,d){return this.aN(a,b,c,d,0)},
i:function(a){return P.cH(this,"[","]")},
$isM:1,
$isaj:1},
qF:{"^":"d;$ti",$isH:1},
mc:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
ad:function(a){return this.a.ad(a)},
Z:function(a,b){this.a.Z(0,b)},
ga4:function(a){var z=this.a
return z.ga4(z)},
gw:function(a){var z=this.a
return z.gw(z)},
i:function(a){return this.a.i(0)},
$isH:1},
hj:{"^":"mc+qF;a,$ti",$asH:null,$isH:1},
me:{"^":"a:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
m5:{"^":"b5;a,b,c,d,$ti",
ga5:function(a){return new P.e6(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){b.$1(this.a[y])
if(z!==this.d)H.e(new P.B(this))}},
ga4:function(a){return this.b===this.c},
gw:function(a){return(this.c-this.b&this.a.length-1)>>>0},
ar:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.e(P.cG(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
av:function(a,b){var z,y,x,w,v,u,t,s
z=this.$ti
if(H.aQ(b,"$isM",z,"$asM")){y=b.gw(b)
x=this.gw(this)
w=C.i.aL(x,y)
v=this.a.length
if(w>=v){w=C.i.aL(x,y)
w=new Array(P.m6(w+C.i.cR(w,1)))
w.fixed$length=Array
u=H.m(w,z)
this.c=this.hR(u)
this.a=u
this.b=0
C.a.aN(u,x,C.i.aL(x,y),b,0)
this.c=C.i.aL(this.c,y)}else{t=v-this.c
if(y.bL(0,t)){z=this.a
w=this.c
C.a.aN(z,w,C.i.aL(w,y),b,0)
this.c=C.i.aL(this.c,y)}else{s=y.c0(0,t)
z=this.a
w=this.c
C.a.aN(z,w,w+t,b,0)
C.a.aN(this.a,0,s,b,t)
this.c=s}}++this.d}else for(z=new P.e6(b,b.c,b.d,b.b,null,[H.j(b,0)]);z.B();)this.ax(z.e)},
aW:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
i:function(a){return P.cH(this,"{","}")},
eW:function(a){var z,y
z=this.b
y=this.a
z=(z-1&y.length-1)>>>0
this.b=z
y[z]=a
if(z===this.c)this.eF();++this.d},
d5:function(){var z,y,x
z=this.b
if(z===this.c)throw H.c(H.aT());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
ax:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.eF();++this.d},
eF:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.m(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aN(y,0,w,z,x)
C.a.aN(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
hR:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aN(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aN(a,0,v,x,z)
C.a.aN(a,v,v+this.c,this.a,0)
return this.c+v}},
h3:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.m(z,[b])},
A:{
b7:function(a,b){var z=new P.m5(null,0,0,0,[b])
z.h3(a,b)
return z},
m6:function(a){var z
a=C.S.jo(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
e6:{"^":"d;a,b,c,d,e,$ti",
gU:function(){return this.e},
B:function(){var z,y
z=this.a
if(this.c!==z.d)H.e(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
nQ:{"^":"d;$ti",
ga4:function(a){return this.a===0},
av:function(a,b){var z
for(z=J.ar(b);z.B();)this.u(0,z.gU())},
ia:function(a){var z,y
for(z=a.a,y=new P.ad(z,z.r,null,null,[null]),y.c=z.e;y.B();)if(!this.ag(0,y.d))return!1
return!0},
bZ:function(a,b){var z,y,x,w
z=H.m([],this.$ti)
C.a.sw(z,this.a)
for(y=new P.ad(this,this.r,null,null,[null]),y.c=this.e,x=0;y.B();x=w){w=x+1
z[x]=y.d}return z},
ct:function(a){return this.bZ(a,!0)},
bp:function(a,b){return new H.cD(this,b,[H.j(this,0),null])},
i:function(a){return P.cH(this,"{","}")},
Z:function(a,b){var z
for(z=new P.ad(this,this.r,null,null,[null]),z.c=this.e;z.B();)b.$1(z.d)},
b7:function(a,b,c){var z,y
for(z=new P.ad(this,this.r,null,null,[null]),z.c=this.e,y=b;z.B();)y=c.$2(y,z.d)
return y},
aX:function(a,b,c){var z,y
for(z=new P.ad(this,this.r,null,null,[null]),z.c=this.e;z.B();){y=z.d
if(b.$1(y))return y}if(c!=null)return c.$0()
throw H.c(H.aT())},
cX:function(a,b){return this.aX(a,b,null)},
bg:function(a,b){var z,y,x,w
for(z=new P.ad(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.B();){w=z.d
if(b.$1(w)){if(x)throw H.c(H.dp())
y=w
x=!0}}if(x)return y
throw H.c(H.aT())},
$isdS:1,
$isaj:1},
nP:{"^":"nQ;$ti"}}],["","",,P,{"^":"",
d1:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qf(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d1(a[z])
return a},
qY:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.a4(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.A(x)
w=String(y)
throw H.c(new P.eU(w,null,null))}w=P.d1(z)
return w},
wU:[function(a){return a.da()},"$1","t6",2,0,0],
qf:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hH(b):y}},
gw:function(a){var z
if(this.b==null){z=this.c
z=z.gw(z)}else z=this.dt().length
return z},
ga4:function(a){var z
if(this.b==null){z=this.c
z=z.gw(z)}else z=this.dt().length
return z===0},
ad:function(a){if(this.b==null)return this.c.ad(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.dt()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d1(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
i:function(a){return P.dC(this)},
dt:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
hH:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d1(this.a[a])
return this.b[a]=z},
$isH:1,
$asH:function(){return[P.l,null]}},
eN:{"^":"d;$ti"},
cB:{"^":"d;$ti"},
du:{"^":"a5;a,b",
i:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lO:{"^":"du;a,b",
i:function(a){return"Cyclic error in JSON stringify"}},
lN:{"^":"eN;a,b",
ig:function(a,b){var z=P.qY(a,this.gih().a)
return z},
ie:function(a){return this.ig(a,null)},
ip:function(a,b){var z=this.giq()
z=P.qh(a,z.b,z.a)
return z},
f2:function(a){return this.ip(a,null)},
giq:function(){return C.V},
gih:function(){return C.U},
$aseN:function(){return[P.d,P.l]}},
lQ:{"^":"cB;a,b",
$ascB:function(){return[P.d,P.l]}},
lP:{"^":"cB;a",
$ascB:function(){return[P.l,P.d]}},
qi:{"^":"d;",
fI:function(a){var z,y,x,w,v,u,t
z=a.length
for(y=J.bu(a),x=this.c,w=0,v=0;v<z;++v){u=y.bQ(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.c.aw(a,w,v)
w=v+1
x.C+=H.ao(92)
switch(u){case 8:x.C+=H.ao(98)
break
case 9:x.C+=H.ao(116)
break
case 10:x.C+=H.ao(110)
break
case 12:x.C+=H.ao(102)
break
case 13:x.C+=H.ao(114)
break
default:x.C+=H.ao(117)
x.C+=H.ao(48)
x.C+=H.ao(48)
t=u>>>4&15
x.C+=H.ao(t<10?48+t:87+t)
t=u&15
x.C+=H.ao(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.c.aw(a,w,v)
w=v+1
x.C+=H.ao(92)
x.C+=H.ao(u)}}if(w===0)x.C+=H.b(a)
else if(w<z)x.C+=y.aw(a,w,z)},
dq:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lO(a,null))}z.push(a)},
de:function(a){var z,y,x
if(this.fH(a))return
this.dq(a)
try{z=this.b.$1(a)
if(!this.fH(z))throw H.c(new P.du(a,null))
this.a.pop()}catch(x){y=H.A(x)
throw H.c(new P.du(a,y))}},
fH:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.C+=C.m.i(a)
return!0}else if(a===!0){this.c.C+="true"
return!0}else if(a===!1){this.c.C+="false"
return!0}else if(a==null){this.c.C+="null"
return!0}else if(typeof a==="string"){z=this.c
z.C+='"'
this.fI(a)
z.C+='"'
return!0}else{z=J.n(a)
if(!!z.$isM){this.dq(a)
this.jm(a)
this.a.pop()
return!0}else if(!!z.$isH){this.dq(a)
y=this.jn(a)
this.a.pop()
return y}else return!1}},
jm:function(a){var z,y,x
z=this.c
z.C+="["
y=J.W(a)
if(y.gw(a)>0){this.de(y.h(a,0))
for(x=1;x<y.gw(a);++x){z.C+=","
this.de(y.h(a,x))}}z.C+="]"},
jn:function(a){var z,y,x,w,v,u
z={}
if(a.ga4(a)){this.c.C+="{}"
return!0}y=a.gw(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qj(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.fI(x[u])
w.C+='":'
this.de(x[u+1])}w.C+="}"
return!0}},
qj:{"^":"a:5;a,b",
$2:function(a,b){var z,y,x,w
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
z[x]=a
y.a=w+1
z[w]=b}},
qg:{"^":"qi;c,a,b",A:{
qh:function(a,b,c){var z,y,x
z=new P.bk("")
y=new P.qg(z,[],P.t6())
y.de(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wg:[function(a,b){return J.bx(a,b)},"$2","t7",4,0,42],
eR:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.J(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kJ(a)},
kJ:function(a){var z=J.n(a)
if(!!z.$isa)return z.i(a)
return H.cN(a)},
cE:function(a){return new P.q_(a)},
Q:function(a,b,c){var z,y
z=H.m([],[c])
for(y=J.ar(a);y.B();)z.push(y.gU())
if(b)return z
z.fixed$length=Array
return z},
m7:function(a,b,c,d){var z,y
z=H.m(new Array(a),[d])
for(y=0;y<a;++y)z[y]=b.$1(y)
return z},
az:function(a,b){var z=P.Q(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ep:function(a){H.uw(H.b(a))},
bh:function(a,b,c){return new H.f4(a,H.ds(a,!1,b,!1),null,null)},
ae:{"^":"d;"},
"+bool":0,
Z:{"^":"d;$ti"},
aX:{"^":"L;",$isZ:1,
$asZ:function(){return[P.L]}},
"+double":0,
bz:{"^":"d;a",
aL:function(a,b){return new P.bz(C.i.aL(this.a,b.geA()))},
c0:function(a,b){return new P.bz(C.i.c0(this.a,b.geA()))},
bL:function(a,b){return C.i.bL(this.a,b.geA())},
cB:function(a,b){return this.a>b.a},
S:function(a,b){if(b==null)return!1
if(!(b instanceof P.bz))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
by:function(a,b){return C.i.by(this.a,b.a)},
i:function(a){var z,y,x,w,v
z=new P.kr()
y=this.a
if(y<0)return"-"+new P.bz(0-y).i(0)
x=z.$1(C.i.bu(y,6e7)%60)
w=z.$1(C.i.bu(y,1e6)%60)
v=new P.kq().$1(y%1e6)
return""+C.i.bu(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isZ:1,
$asZ:function(){return[P.bz]}},
kq:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kr:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a5:{"^":"d;",
gbO:function(){return H.E(this.$thrownJsError)}},
cL:{"^":"a5;",
i:function(a){return"Throw of null."}},
b2:{"^":"a5;a,b,n:c<,d",
gdz:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdw:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdz()+y+x
if(!this.a)return w
v=this.gdw()
u=P.eR(this.b)
return w+v+": "+H.b(u)},
A:{
F:function(a){return new P.b2(!1,null,null,a)},
dd:function(a,b,c){return new P.b2(!0,a,b,c)},
i:function(a){return new P.b2(!1,null,a,"Must not be null")}}},
dQ:{"^":"b2;e,f,a,b,c,d",
gdz:function(){return"RangeError"},
gdw:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
n3:function(a){return new P.dQ(null,null,!1,null,null,a)},
c9:function(a,b,c){return new P.dQ(null,null,!0,a,b,"Value not in range")},
a7:function(a,b,c,d,e){return new P.dQ(b,c,!0,a,d,"Invalid value")},
ca:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a7(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a7(b,a,c,"end",f))
return b}}},
lw:{"^":"b2;e,w:f>,a,b,c,d",
gdz:function(){return"RangeError"},
gdw:function(){if(J.ix(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+z},
A:{
cG:function(a,b,c,d,e){var z=e!=null?e:J.b0(b)
return new P.lw(b,z,!0,a,c,"Index out of range")}}},
a2:{"^":"a5;a",
i:function(a){return"Unsupported operation: "+this.a}},
X:{"^":"a5;a",
i:function(a){return"UnimplementedError"}},
t:{"^":"a5;a",
i:function(a){return"Bad state: "+this.a}},
B:{"^":"a5;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eR(z))+"."}},
mA:{"^":"d;",
i:function(a){return"Out of Memory"},
gbO:function(){return},
$isa5:1},
fS:{"^":"d;",
i:function(a){return"Stack Overflow"},
gbO:function(){return},
$isa5:1},
jZ:{"^":"a5;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
q_:{"^":"d;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eU:{"^":"d;a,b,c",
i:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.c.aw(x,0,75)+"..."
return y+"\n"+x}},
kO:{"^":"d;n:a<,hy,$ti",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.hy
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.e(P.dd(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.ft(b,"expando$values")
return y==null?null:H.ft(y,z)}},
bA:{"^":"d;"},
q:{"^":"L;",$isZ:1,
$asZ:function(){return[P.L]}},
"+int":0,
D:{"^":"d;$ti",
bp:function(a,b){return H.bC(this,b,H.z(this,"D",0),null)},
bJ:["cG",function(a,b){return new H.I(this,b,[H.z(this,"D",0)])}],
Z:function(a,b){var z
for(z=this.ga5(this);z.B();)b.$1(z.gU())},
b7:function(a,b,c){var z,y
for(z=this.ga5(this),y=b;z.B();)y=c.$2(y,z.gU())
return y},
b6:function(a,b){var z
for(z=this.ga5(this);z.B();)if(b.$1(z.gU()))return!0
return!1},
gw:function(a){var z,y
z=this.ga5(this)
for(y=0;z.B();)++y
return y},
ga4:function(a){return!this.ga5(this).B()},
gbM:function(a){var z,y
z=this.ga5(this)
if(!z.B())throw H.c(H.aT())
y=z.gU()
if(z.B())throw H.c(H.dp())
return y},
ar:function(a,b){var z,y,x
if(b<0)H.e(P.a7(b,0,null,"index",null))
for(z=this.ga5(this),y=0;z.B();){x=z.gU()
if(b===y)return x;++y}throw H.c(P.cG(b,this,"index",null,y))},
i:function(a){return P.lH(this,"(",")")}},
dq:{"^":"d;$ti"},
M:{"^":"d;$ti",$isD:1,$isaj:1},
"+List":0,
H:{"^":"d;$ti"},
as:{"^":"d;",
gD:function(a){return P.d.prototype.gD.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isZ:1,
$asZ:function(){return[P.L]}},
"+num":0,
d:{"^":";",
S:function(a,b){return this===b},
gD:function(a){return H.aA(this)},
i:function(a){return H.cN(this)},
geb:function(a){return new H.aC(H.u6(this),null)},
toString:function(){return this.i(this)}},
bg:{"^":"d;"},
bj:{"^":"d;"},
l:{"^":"d;",$isZ:1,
$asZ:function(){return[P.l]},
$isdJ:1},
"+String":0,
bk:{"^":"d;C<",
gw:function(a){return this.C.length},
ga4:function(a){return this.C.length===0},
i:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
A:{
fW:function(a,b,c){var z=J.ar(b)
if(!z.B())return a
if(c.length===0){do a+=H.b(z.gU())
while(z.B())}else{a+=H.b(z.gU())
for(;z.B();)a=a+c+H.b(z.gU())}return a},
oB:function(a){return new P.bk(a)}}}}],["","",,P,{"^":"",fH:{"^":"d;"}}],["","",,P,{"^":"",
dP:function(a){return C.P},
qe:{"^":"d;",
ak:function(a){if(a<=0||a>4294967296)throw H.c(P.n3("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
iR:function(){return Math.random()}}}],["","",,S,{"^":"",dh:{"^":"d;a,b,$ti",
ae:function(a){var z=new S.N(null,null,this.$ti)
z.ab()
z.j(this)
a.$1(z)
return z.p()},
gD:function(a){var z=this.b
if(z==null){z=X.bv(this.a)
this.b=z}return z},
S:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isdh)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;v!==x.length;++v)if(!J.u(y[v],x[v]))return!1
return!0},
i:function(a){return J.J(this.a)},
h:function(a,b){return this.a[b]},
gw:function(a){return this.a.length},
ga5:function(a){var z=this.a
return new J.b3(z,z.length,0,null,[H.j(z,0)])},
bp:function(a,b){var z=this.a
z.toString
return new H.ak(z,b,[H.j(z,0),null])},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
ga4:function(a){return this.a.length===0},
ab:function(){if(new H.aC(H.Y(H.j(this,0)),null).S(0,C.u))throw H.c(new P.a2('explicit element type required, for example "new BuiltList<int>"'))}},N:{"^":"d;a,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dh(z,null,this.$ti)
y.ab()
this.a=z
this.b=y
z=y}return z},
j:function(a){if(H.aQ(a,"$isdh",this.$ti,null)){this.a=a.a
this.b=a}else{this.a=P.Q(a,!0,H.j(this,0))
this.b=null}},
h:function(a,b){return this.a[b]},
u:function(a,b){var z
if(b==null)H.e(P.F("null element"))
z=this.gcP();(z&&C.a).u(z,b)},
gcP:function(){if(this.b!=null){this.a=P.Q(this.a,!0,H.j(this,0))
this.b=null}return this.a},
ab:function(){if(new H.aC(H.Y(H.j(this,0)),null).S(0,C.u))throw H.c(new P.a2('explicit element type required, for example "new ListBuilder<int>"'))}}}],["","",,A,{"^":"",cy:{"^":"d;a,b,c,d,$ti",
ae:function(a){var z=new A.cK(null,null,this.$ti)
z.bR()
z.j(this)
a.$1(z)
return z.p()},
gD:function(a){var z=this.b
if(z==null){z=this.a.gbU()
z=H.bC(z,new A.jC(this),H.z(z,"D",0),null)
z=P.Q(z,!1,H.z(z,"D",0))
C.a.en(z)
z=X.bv(z)
this.b=z}return z},
S:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$iscy)return!1
y=b.a
x=this.a
if(y.gw(y)!==x.gw(x))return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbU()
this.c=z}z=z.ga5(z)
for(;z.B();){v=z.gU()
if(!J.u(y.h(0,v),x.h(0,v)))return!1}return!0},
i:function(a){return J.J(this.a)},
h:function(a,b){return this.a.h(0,b)},
Z:function(a,b){this.a.Z(0,b)},
ga4:function(a){var z=this.a
return z.ga4(z)},
gw:function(a){var z=this.a
return z.gw(z)},
bR:function(){if(new H.aC(H.Y(H.j(this,0)),null).S(0,C.u))throw H.c(new P.a2('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aC(H.Y(H.j(this,1)),null).S(0,C.u))throw H.c(new P.a2('explicit value type required, for example "new BuiltMap<int, int>"'))}},jC:{"^":"a:0;a",
$1:function(a){var z,y
z=J.f(a)
y=J.f(this.a.a.h(0,a))
return X.d2(X.aW(X.aW(0,J.f(z)),J.f(y)))}},cK:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cy(this.a,null,null,null,this.$ti)
z.bR()
this.b=z}return z},
j:function(a){var z
if(H.aQ(a,"$iscy",this.$ti,null)){this.b=a
this.a=a.a}else if(!!a.$iscy){z=P.fb(a.a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else if(!!a.$isH){z=P.fb(a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else throw H.c(P.F("expected Map or BuiltMap, got "+a.geb(a).i(0)))},
h:function(a,b){return this.a.h(0,b)},
bR:function(){if(new H.aC(H.Y(H.j(this,0)),null).S(0,C.u))throw H.c(new P.a2('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aC(H.Y(H.j(this,1)),null).S(0,C.u))throw H.c(new P.a2('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",di:{"^":"d;a,b,$ti",
ae:function(a){var z=new L.V(null,null,this.$ti)
z.ai()
z.j(this)
a.$1(z)
return z.p()},
gD:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.Q(new H.cD(z,new L.jD(),[H.j(z,0),null]),!1,null)
C.a.en(z)
z=X.bv(z)
this.b=z}return z},
S:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isdi)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gD(b)
x=this.gD(this)
if(z==null?x!=null:z!==x)return!1
return y.ia(b)},
i:function(a){return J.J(this.a)},
gw:function(a){return this.a.a},
d1:function(a){return this.a.d1(a)},
ga5:function(a){var z,y
z=this.a
y=new P.ad(z,z.r,null,null,[null])
y.c=z.e
return y},
bp:function(a,b){var z=this.a
z.toString
return new H.cD(z,b,[H.j(z,0),null])},
ag:function(a,b){return this.a.ag(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
ga4:function(a){return this.a.a===0},
ai:function(){if(new H.aC(H.Y(H.j(this,0)),null).S(0,C.u))throw H.c(new P.a2('explicit element type required, for example "new BuiltSet<int>"'))}},jD:{"^":"a:0;",
$1:function(a){return J.f(a)}},V:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.di(this.a,null,this.$ti)
z.ai()
this.b=z}return z},
j:function(a){var z,y,x,w
if(H.aQ(a,"$isdi",this.$ti,null)){this.a=a.a
this.b=a}else{z=H.j(this,0)
y=P.ag(null,null,null,z)
for(x=J.ar(a);x.B();){w=x.gU()
if(H.hP(w,z))y.u(0,w)
else throw H.c(P.F("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
gb_:function(){if(this.b!=null){this.a=P.cJ(this.a,H.j(this,0))
this.b=null}return this.a},
ai:function(){if(new H.aC(H.Y(H.j(this,0)),null).S(0,C.u))throw H.c(new P.a2('explicit element type required, for example "new SetBuilder<int>"'))}}}],["","",,Y,{"^":"",
h:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
T:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rb:{"^":"a:32;",
$1:function(a){var z,y
z=new P.bk("")
y=z.C+=H.b(a)
z.C=y+" {\n"
$.cj=$.cj+2
return new Y.lv(z)}},
lv:{"^":"d;a",
m:function(a,b,c){var z,y
if(c!=null){z=this.a
y=z.C+=C.c.bt(" ",$.cj)
y+=b
z.C=y
z.C=y+"="
z.toString
y=z.C+=H.b(c)
z.C=y+",\n"}},
i:function(a){var z,y,x
z=$.cj-2
$.cj=z
y=this.a
z=y.C+=C.c.bt(" ",z)
y.C=z+"}"
x=J.J(this.a)
this.a=null
return x}}}],["","",,N,{"^":"",nr:{"^":"np;ch,cx,cm:cy<,db,dx,b,c,d,e,f,r,x,y,z,Q,a",
fj:function(){var z=$.$get$cr()
z.t(0,"game",this.cx)
z.t(0,"hitpoints",this.cy)
z.t(0,"stamina",this.db)
z.t(0,"gold",this.dx)},
iB:function(){var z,y,x,w
this.cx=null
this.cy=Z.bJ("Health",new N.nu(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
z=P.q
this.db=Z.bJ("Stamina",new N.nv(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bJ("Gold",new N.nw(),"#CCCCCC","Gold coins",0,0,!1,z)
this.dx=z
y=$.$get$bU()
x=this.cy
w=this.db
y=new O.eQ(N.bf("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a1(H.m([],[Y.ah]),0,P.aV()),x,w,z,O.uD(),O.uC(),O.uB(),y,this.gfY(),new P.bk(""),!1,null)
y.fX()
this.cx=y
y.x="endGame"
$.$get$cl().u(0,0)},
h7:function(){var z,y
z=new O.cS(["# Insignificant Little Vermin",[null,P.a_(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.t(0,"start",z)
z.a="start"
z=new O.cS([new N.nt(this),[null,P.a_(["goto","gameLoop"])]],0,null,!1,!1)
y.t(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cS(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n  Hit <strong>Info</strong> to learn more about this egamebook, and its\n  sequel.\n</p>'],0,null,!1,!1)
y.t(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
A:{
ns:function(){var z,y,x,w
z=Z.bJ("Health",new N.rL(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
y=P.q
x=Z.bJ("Stamina",new N.rM(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bJ("Gold",new N.rN(),"#CCCCCC","Gold coins",0,0,!1,y)
w=P.l
z=new N.nr("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nx(new H.P(0,null,null,null,null,null,0,[w,O.cS])),null,null,null,P.ag(null,null,null,w),!1,null,-9999,null,null,null)
z.h7()
return z}}},rL:{"^":"a:20;",
$1:function(a){if(a===0)return"\ud83d\udc80"
if(a<=0.5)return"\ud83d\ude23"
if(a<1)return"\ud83d\ude27"
return"\ud83d\ude10"}},rM:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83c\udf1f"}},rN:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nt:{"^":"a:17;a",
$0:function(){var z=0,y=P.ax(),x=this
var $async$$0=P.av(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:z=2
return P.au(x.a.cx.b9(),$async$$0)
case 2:return P.aE(null,y)}})
return P.aF($async$$0,y)}},nu:{"^":"a:20;",
$1:function(a){if(a===0)return"\ud83d\udc80"
if(a<=0.5)return"\ud83d\ude23"
if(a<1)return"\ud83d\ude27"
return"\ud83d\ude10"}},nv:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83c\udf1f"}},nw:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cC:{"^":"d;"},kH:{"^":"d;"},pm:{"^":"cC;a,b,c",
ae:function(a){var z=new M.dY(null,!1,0,0)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cC))return!1
return this.a===b.a&&this.b===b.b&&!0},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.R.gD(!1)))},
i:function(a){var z,y
z=$.$get$S().$1("EdgeheadGlobalState")
y=J.x(z)
y.m(z,"bloodrockFollowers",this.a)
y.m(z,"brianaQuoteIndex",this.b)
y.m(z,"hasKegOfBeer",!1)
return y.i(z)}},dY:{"^":"kH;d,a,b,c",
gc1:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
j:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gc1()
y=this.b
this.gc1()
x=this.c
this.gc1()
this.a
z=new M.pm(y,x,!1)}this.j(z)
return z}}}],["","",,O,{"^":"",
wY:[function(a){return a.a-2*a.c},"$1","d7",2,0,24],
x9:[function(a){return a.a+a.b-a.c},"$1","hV",2,0,24],
eQ:{"^":"m8;y,z,Q,ch,cx,cy,db,dx,dy,cz:fr<,fx,fy,cm:go<,id,k1,a,b,c,d,e,f,r,x",
fX:function(){var z,y,x,w,v,u
z=P.az(C.r,null)
y=$.$get$bs()
this.cy=R.b1(1000,"orc",O.d7(),null,null,new G.aB("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,!1,2,!1,C.w,0,y)
this.db=R.b1(1001,"goblin",O.d7(),null,null,new G.aB("scimitar",1,1,!1,!0,!1,P.az(C.r,null)),null,0,1,0,!1,!1,1,!1,C.w,0,y)
y=new S.N(null,null,[Q.r])
y.ab()
y.j([new Q.r("start_adventure","","",null)])
this.dx=new K.cc(y.p(),"preStartBook",new O.ky(),new O.kz(),null,null,"ground")
y=R.b1(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!1,!0,2,!0,C.I,1,null)
this.ch=y
this.go.sal(y.x/y.db)
this.id.sal(this.ch.fy)
this.cx=R.b1(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,!1,2,!0,C.a4,0,null)
this.dy=F.fC(this.dx,!1)
y=K.cc
x=P.Q($.$get$hI(),!0,y)
C.a.av(x,[this.dx,$.$get$ej()])
w=new M.dY(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.cJ([z,v],R.w)
z=P.b7(null,O.ct)
u=new A.a3(v,P.ag(null,null,null,U.C),w,z,P.cJ(x,y),P.Q([u],!0,S.ac),0,null)
this.fr=u
y=new Y.a1(H.m([],[Y.ah]),0,P.aV())
y.b=u.r
this.fx=new B.bE(u,null,y,1,1,!0,!1,!1,0)},
cv:function(){var z=0,y=P.ax(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$cv=P.av(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gio()
if(v.fg(u)){z=1
break}t=w.fr.v(w.ch.y)
s=w.go
r=t.x/t.db
if(!J.u(s.f,r)){s.f=r
s.y=!0
$.bL=!0}s=w.id
r=t.fy
if(!J.u(s.f,r)){s.f=r
s.y=!0
$.bL=!0}s=w.y
s.T(C.B,"update() for world at time "+w.fr.r,null,null)
r=w.fr.f
if(r.length===0){w.r=!0
v.l(0,"\n\n",!0)
if(!w.fr.iy(w.ch.y))v.l(0,"You die.",!0)
w.f.C+=v.bW()
z=1
break}r=C.a.gE(r)
q=w.fr
p=r.at(r.gV(),q)
if(p==null){v=w.fr
u=v.f
o=C.a.gE(u)
o.cr(v)
C.a.a_(u,o);++w.fr.r
z=1
break}n=G.iO(p,w.fr)
z=3
return P.au(n.iW(),$async$cv)
case 3:q=n.f
if(q.ga4(q)){m=n.a
l=n.b
m.T(C.D,"There are no actions available for actorId="+H.b(l)+".",null,null)
l="Actions not available for "+H.b(l)+" and "
k=n.c
j=k.a
i=J.n(j)
j="PlanConsequence<"+i.gD(j)+", "+i.i(j)+", "+J.J(k.b)+", "+H.b(k.d)+", "+k.y+", "
m.T(C.q,l+(j+(k.x?"isSuccess":"")+">")+".",null,null)}m=Z.mH(q)
h=new Z.mG(new P.hj(q,[null,null]),m)
if(q.ga4(q))$.$get$bF().T(C.D,"Created with no recommendations.",null,null)
q=m.length
if(q===0){s.T(C.C,"No recommendation for "+H.b(p.dx),null,null)
s.T(C.C,new O.kB(w),null,null)
w.fr.f1(r.gq());++w.fr.r
z=1
break}z=p.cx?4:6
break
case 4:if(q>1)for(g=0;u=m.length,g<u;u===q||(0,H.ap)(m),++g);s.T(C.q,"planner.generateTable for "+H.b(p.dx),null,null)
n.eh().Z(0,new O.kC(w))
u=h.fi(r.gd2(),O.hV())
u.toString
f=P.Q(u,!1,H.z(u,"D",0))
if(f.length!==0&&C.a.b6(f,new O.kD())){w.f.C+=v.bW()
C.a.sw(v.a,0)}v=new O.kE(new O.kG())
u=f.length-1
if(u-0<=32)H.fR(f,0,u,v)
else H.fQ(f,0,u,v)
for(v=f.length,u=w.c,g=0;g<f.length;f.length===v||(0,H.ap)(f),++g){e=f[g]
u.$3$helpMessage$script(e.gX(),e.gM(),new O.kF(w,p,e))}z=1
break
z=5
break
case 6:s=p.b
z=7
return P.au(w.c2(h.iV(s==null?O.hV():s),p,v),$async$cv)
case 7:case 5:v.fg(u)
case 1:return P.aE(x,y)}})
return P.aF($async$cv,y)},
cI:function(a,b,c){var z=0,y=P.ax(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cI=P.av(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=a.H(b,x.fr)
z=w===1?2:4
break
case 2:x.fx=C.a.gbM(c)
z=3
break
case 4:z=w===0?5:7
break
case 5:x.fx=C.a.gbM(c)
z=6
break
case 7:v=C.a.gE(J.J(a.gJ()).split("."))
w.toString
u=a.a3(b,x.fr)
if(a.gN()){a.gJ()
t=b.fy>=1}else t=!1
s="use "+H.b(v)
x.eP()
z=8
return P.au(x.e.$4$rerollEffectDescription$rerollable(w,u,s,t),$async$cI)
case 8:r=e
t=new H.I(c,new O.ks(r),[H.j(c,0)])
x.fx=t.gbM(t)
if(r.gjl()){q=A.dX(x.fx.a)
q.W(b.y,new O.kt())
u=x.fx
t=u.b
s=H.m([],[Y.ah])
p=new Y.a1(s,0,P.aV())
C.a.av(s,u.c.a)
s=u.d
o=u.e
n=u.f
m=u.r
l=u.x
u=u.y
p.b=q.r
x.fx=new B.bE(q,t,p,s,o,n,m,l,u)}case 6:case 3:return P.aE(null,y)}})
return P.aF($async$cI,y)},
c2:function(a,b,c){var z=0,y=P.ax(),x=this,w,v
var $async$c2=P.av(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=a.cT(b,x.fx,x.fr)
v=P.Q(w,!0,H.z(w,"D",0))
z=b.cx?2:4
break
case 2:z=5
return P.au(x.cI(a,b,v),$async$c2)
case 5:z=3
break
case 4:x.fx=v[S.n1(new H.ak(v,new O.kv(),[H.j(v,0),null]),1)]
case 3:C.a.av(c.a,x.fx.c.a)
x.fr=x.fx.a
w=x.y
w.T(C.q,new O.kw(a,b),null,null)
w.T(C.j,new O.kx(x,b),null,null)
return P.aE(null,y)}})
return P.aF($async$c2,y)}},
ky:{"^":"a:3;",
$3:function(a,b,c){return c.l(0,"UNUSED because this is the first choice",!0)}},
kz:{"^":"a:3;",
$3:function(a,b,c){return H.e(new P.t("Room isn't to be revisited"))}},
kB:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ak(z,new O.kA(),[H.j(z,0),null]).cp(0," <- ")}},
kA:{"^":"a:0;",
$1:function(a){return a.gbe()}},
kC:{"^":"a:0;a",
$1:function(a){return this.a.y.T(C.q,a,null,null)}},
kG:{"^":"a:51;",
$1:function(a){if(a instanceof Q.v)return H.b(a.b.dx)+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
kD:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
kE:{"^":"a:5;a",
$2:function(a,b){var z=this.a
return J.bx(z.$1(a),z.$1(b))}},
kF:{"^":"a:17;a,b,c",
$0:function(){var z=0,y=P.ax(),x=this,w
var $async$$0=P.av(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.au(w.c2(x.c,x.b,w.fy),$async$$0)
case 2:return P.aE(null,y)}})
return P.aF($async$$0,y)}},
ks:{"^":"a:0;a",
$1:function(a){return a.ge0()===this.a.ge0()}},
kt:{"^":"a:0;",
$1:function(a){var z=a.gk().go
a.gk().go=z-1
return a}},
kv:{"^":"a:0;",
$1:function(a){return a.giX()}},
kw:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.dx)+" selected "+this.a.gn()}},
kx:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ak(z,new O.ku(),[H.j(z,0),null]).cp(0," <- ")
return"- how "+H.b(this.b.dx)+" got here: "+y}},
ku:{"^":"a:0;",
$1:function(a){return a.gbe()}}}],["","",,Q,{"^":"",
hZ:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hZ(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.iL(t.aM(y.a,y),new Q.tN(z))
t=J.ar(s.a),r=new H.bN(t,s.b,[H.j(s,0)])
case 2:if(!r.B()){w=3
break}q=t.gU()
p=x.$1(q)
if(p.gI()&&z.cY(q,y)<=0){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
i_:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i_(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dh((t.length!==0?C.a.gE(t):null).a).a.a,t=new J.b3(t,t.length,0,null,[H.j(t,0)])
case 2:if(!t.B()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
i0:function(a,b,c){return P.aP(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i0(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gE(t):null).a.a,t=new J.b3(t,t.length,0,null,[H.j(t,0)])
case 2:if(!t.B()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aN()
case 1:return P.aO(u)}}})},
tN:{"^":"a:0;a",
$1:function(a){return!J.u(a,this.a)&&a.gbn()}},
af:{"^":"d;",
cT:function(a,b,c){var z=this
return P.aP(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cT(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.a)
v=s>0?2:3
break
case 2:r=A.dX(w)
v=4
return B.fq(r,x,z,z.hh(r,y,w,z.gL(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dX(w)
v=7
return B.fq(r,x,z,z.hg(r,y,w,z.gK(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aN()
case 1:return P.aO(t)}}})},
er:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bg(0,new Q.iM(b))
y=new O.eD(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gn()
y.ga1().c=x
x=b.y
y.ga1().r=x
y.ga1().f=C.W
y.ga1().cx=f
y.ga1().Q=e
x=this.gI()
y.ga1().z=x
x=this.gY()
y.ga1().ch=x
if(!!this.$isv){x=y.ga1()
w=x.x
if(w==null){w=new L.V(null,null,[P.q])
w.ai()
w.j(C.e)
x.x=w
x=w}else x=w
w=this.b.y
if(w==null)H.e(P.F("null element"))
x.gb_().u(0,w)}if(!!this.$isc1){x=this.b.a
y.ga1().d=x}v=new Y.a1(H.m([],[Y.ah]),0,P.aV())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gq()
a.gD(a);(x.length!==0?C.a.gE(x):null).toString
this.a=d.$3(z,a,v)
if(a.cN(u)!=null)a.f1(u);++a.r
w=a.ei(u)
if(!(w==null))w.fe(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.at(w.gV(),a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.u(w==null?w:w.cE(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
t=C.a.gE(x)
t.cr(a)
C.a.a_(x,t)}x=x.length!==0?C.a.gE(x):null
if(!(x==null))x.ff(a,v)
if(this.a==null)H.e(new P.t("No description given when executing "+this.i(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga1().e=x
x=a.r
y.ga1().y=x
a.d.eW(y.p())
return v},
hh:function(a,b,c,d,e){return this.er(a,b,c,d,!1,e)},
hg:function(a,b,c,d,e){return this.er(a,b,c,d,e,!1)}},
iM:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.y
return z==null?y==null:z===y}},
v:{"^":"af;dW:b<",
gX:function(){var z=new Y.a1(H.m([],[Y.ah]),0,P.aV())
z.eU(0,this.ga2(),this.b)
return z.bW()},
a3:function(a,b){var z=new Y.a1(H.m([],[Y.ah]),0,P.aV())
z.hW(0,this.ga9(),this.b,a,!0)
return z.bW()},
i:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga2()+"::enemy="+H.b(z.y)+"/"+H.b(z.dx)+">"}},
c1:{"^":"af;",
gX:function(){return this.b.b},
i:function(a){return"ExitAction<"+this.b.b+">"}},
c3:{"^":"af;",
gX:function(){var z=new Y.a1(H.m([],[Y.ah]),0,P.aV())
z.eU(0,this.ga2(),this.b)
return z.bW()},
i:function(a){return"ItemAction<"+this.gX()+">"}},
na:{"^":"d;a,b",
i:function(a){return this.b}}}],["","",,O,{"^":"",ct:{"^":"d;",
i:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},lY:{"^":"d;a,b",
i:function(a){return this.b}},pi:{"^":"ct;a,dJ:b<,dU:c<,be:d<,e,cs:f<,ep:r<,V:x<,fE:y<,z,fF:Q<,fG:ch<",
ae:function(a){var z=new O.eD(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.ct))return!1
if(J.u(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y)if(J.u(this.r,b.r)){z=this.x
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
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)),J.f(this.f)),J.f(this.r)),J.f(this.x)),J.f(this.y)),J.f(this.z)),J.f(this.Q)),J.f(this.ch)))},
i:function(a){var z,y
z=$.$get$S().$1("ActionRecord")
y=J.x(z)
y.m(z,"accomplices",this.a)
y.m(z,"actionName",this.b)
y.m(z,"dataString",this.c)
y.m(z,"description",this.d)
y.m(z,"knownTo",this.e)
y.m(z,"protagonist",this.f)
y.m(z,"sufferers",this.r)
y.m(z,"time",this.x)
y.m(z,"wasAggressive",this.y)
y.m(z,"wasFailure",this.z)
y.m(z,"wasProactive",this.Q)
y.m(z,"wasSuccess",this.ch)
return y.i(z)}},eD:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdJ:function(){return this.ga1().c},
gdU:function(){return this.ga1().d},
gbe:function(){return this.ga1().e},
gcs:function(){return this.ga1().r},
gep:function(){var z,y
z=this.ga1()
y=z.x
if(y==null){y=new L.V(null,null,[P.q])
y.ai()
y.j(C.e)
z.x=y
z=y}else z=y
return z},
gV:function(){return this.ga1().y},
gfE:function(){return this.ga1().z},
gfF:function(){return this.ga1().ch},
gfG:function(){return this.ga1().cx},
ga1:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.V(null,null,[H.j(z,0)])
y.ai()
y.j(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.V(null,null,[H.j(z,0)])
y.ai()
y.j(z)
z=y}this.x=z
z=this.a
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
if(z==null){y=this.ga1()
x=y.b
if(x==null){x=new L.V(null,null,[P.q])
x.ai()
x.j(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga1().c
w=this.ga1().d
v=this.ga1().e
u=this.ga1().f
t=this.ga1().r
s=this.ga1()
r=s.x
if(r==null){r=new L.V(null,null,[P.q])
r.ai()
r.j(C.e)
s.x=r
s=r}else s=r
s=s.p()
r=this.ga1().y
q=this.ga1().z
p=this.ga1().Q
o=this.ga1().ch
n=this.ga1().cx
z=new O.pi(y,x,w,v,u,t,s,r,q,p,o,n)
if(y==null)H.e(P.i("accomplices"))
if(x==null)H.e(P.i("actionName"))
if(v==null)H.e(P.i("description"))
if(u==null)H.e(P.i("knownTo"))
if(t==null)H.e(P.i("protagonist"))
if(s==null)H.e(P.i("sufferers"))
if(r==null)H.e(P.i("time"))
if(q==null)H.e(P.i("wasAggressive"))
if(p==null)H.e(P.i("wasFailure"))
if(o==null)H.e(P.i("wasProactive"))
if(n==null)H.e(P.i("wasSuccess"))}this.j(z)
return z}}}],["","",,R,{"^":"",
i1:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i1(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bP(new H.I(u,new R.u5(z),[H.j(u,0)]))
case 3:return P.aN()
case 1:return P.aO(v)}}})},
b1:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var z=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rG(a,b,l,n,o,f,e,i,m,p,j,h,d,g,q,!1,c).$1(z)
return z.p()},
u5:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gf4()
y=this.a.y
return z==null?y==null:z===y}},
w:{"^":"mi;",
gam:function(){return this.x>0},
gf6:function(){return this.e instanceof K.U},
gf9:function(){return this.fr===C.h},
gd0:function(){return this.fr===C.d},
dT:function(a){var z,y,x
for(z=this.cy.a,y=new P.ad(z,z.r,null,null,[null]),y.c=z.e,x=0;y.B();)if(C.a.ag(y.d.gfB(),a))++x
z=this.e
z=z==null?z:z.a
if((z==null?z:J.bX(z,a))===!0)++x
z=this.d
z=z==null?z:z.a
return(z==null?z:J.bX(z,a))===!0?x+1:x},
it:function(){var z,y,x,w,v,u,t
for(z=this.cy.a,y=new P.ad(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.B();){v=y.d
if(!(v instanceof L.aM))continue
z=v.gaf()
u=v.gaK()
t=v.gaH()?1:0
if(2+z+u+t>w){z=v.gaf()
u=v.gaK()
t=v.gaH()?1:0
w=2+z+u+t
x=v}}return x},
iz:function(a,b){return this.cY(a,b)>0},
cY:function(a,b){var z,y
if(this.ch){z=a.go
y=this.go.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hx(a,b,10))return 1
z=a.go
y=this.go.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
cD:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.v(this.y)
y=z.x
x=2*y
if(!(y>0))x-=10
y=z.e
if(!(y instanceof K.U))x+=4
x+=y.gal()/2
for(y=z.cy.a,w=[null],v=new P.ad(y,y.r,null,null,w),v.c=y.e;v.B();)x+=J.cs(v.d.gal(),10)
y=a.a
for(v=y.ga5(y),u=new H.bN(v,new R.jg(this),[H.j(y,0)]),t=0;u.B();){s=v.gU()
r=s.gbn()?2:0
q=s.gcm()
p=s.e
o=p.gaf()
n=p.gaK()
p=p.gaH()?1:0
t=t+r+2*q+(2+o+n+p)/2
for(r=s.cy.a,q=new P.ad(r,r.r,null,null,w),q.c=r.e;q.B();)t+=J.cs(q.d.gal(),10)}return new A.cu(x,t,y.b7(0,0,new R.jh(this,a)))},
hx:function(a,b,c){var z=b.je(a,this,!0)
if(z==null)return!1
return z<=c},
$isay:1},
mi:{"^":"d+dk;"},
rG:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
$1:function(a){var z,y
a.gk().z=this.a
a.gk().dy=this.b
a.gk().fr=this.d
a.gk().fy=this.e
z=this.f
if(z==null)z=$.$get$d6()
a.gk().f=z
a.gk().e=this.r
a.gk().b=[]
a.gk().fx=C.d
a.gk().y=this.x
a.gk().dx=this.y
a.gk().x=this.ch
a.gk().go=this.z
a.gk().Q=this.Q
a.gk().ch=!0
a.gk().cy=this.c
z=new L.V(null,null,[U.C])
z.ai()
z.j(C.e)
a.gk().db=z
z=this.db
if(z!=null){y=new L.bl(null,null)
y.j(z)
z=y}else{z=$.$get$d9()
z.toString
y=new L.bl(null,null)
y.j(z)
z=y}a.gk().id=z
a.gk().d=this.cx
a.gk().r=this.cy
a.gk().cx=this.dx
a.gk().c=this.dy
return a}},
jg:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.u(a.gbs(),z.go)){y=a.gq()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jh:{"^":"a:30;a,b",
$2:function(a,b){var z=b.gam()&&b.Q?1:0
return a+(z+b.x)*this.a.cY(b,this.b)}},
dK:{"^":"d;a,b",
i:function(a){return this.b}},
pj:{"^":"w;a,b,ic:c<,bA:d<,f0:e<,f4:f<,r,cm:x<,q:y<,z,bT:Q<,f7:ch<,b1:cx<,cy,db,n:dx<,aH:dy<,fr,ah:fx<,fy,bs:go<",
ae:function(a){var z=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.w))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.u(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
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
if(z==null?y==null:z===y)if(J.u(this.cy,b.cy)){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fx
y=b.fx
if(z==null?y==null:z===y){z=this.fy
y=b.fy
z=(z==null?y==null:z===y)&&J.u(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)),J.f(this.f)),J.f(this.r)),J.f(this.x)),J.f(this.y)),J.f(this.z)),J.f(this.Q)),J.f(this.ch)),J.f(this.cx)),J.f(this.cy)),J.f(this.db)),J.f(this.dx)),J.f(this.dy)),J.f(this.fr)),J.f(this.fx)),J.f(this.fy)),J.f(this.go)))},
i:function(a){var z,y
z=$.$get$S().$1("Actor")
y=J.x(z)
y.m(z,"categories",this.a)
y.m(z,"combineFunction",this.b)
y.m(z,"currentRoomName",this.c)
y.m(z,"currentShield",this.d)
y.m(z,"currentWeapon",this.e)
y.m(z,"followingActorId",this.f)
y.m(z,"gold",this.r)
y.m(z,"hitpoints",this.x)
y.m(z,"id",this.y)
y.m(z,"initiative",this.z)
y.m(z,"isActive",this.Q)
y.m(z,"isConfused",this.ch)
y.m(z,"isPlayer",this.cx)
y.m(z,"items",this.cy)
y.m(z,"maxHitpoints",this.db)
y.m(z,"name",this.dx)
y.m(z,"nameIsProperNoun",this.dy)
y.m(z,"pose",this.fr)
y.m(z,"pronoun",this.fx)
y.m(z,"stamina",this.fy)
y.m(z,"team",this.go)
return y.i(z)}},
an:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gbA:function(){return this.gk().e},
gf0:function(){return this.gk().f},
gf4:function(){return this.gk().r},
gcm:function(){return this.gk().y},
gq:function(){return this.gk().z},
gf7:function(){return this.gk().cx},
gb1:function(){return this.gk().cy},
gn:function(){return this.gk().dy},
gbs:function(){var z,y
z=this.gk()
y=z.id
if(y==null){y=new L.bl(null,null)
z.id=y
z=y}else z=y
return z},
gk:function(){var z,y
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
z=z.cy
if(!(z==null)){y=new L.V(null,null,[H.j(z,0)])
y.ai()
y.j(z)
z=y}this.db=z
z=this.a
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
this.go=z.fy
z=z.go
if(!(z==null)){y=new L.bl(null,null)
y.j(z)
z=y}this.id=z
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gk().b
x=this.gk().c
w=this.gk().d
v=this.gk().e
u=this.gk().f
t=this.gk().r
s=this.gk().x
r=this.gk().y
q=this.gk().z
p=this.gk().Q
o=this.gk().ch
n=this.gk().cx
m=this.gk().cy
l=this.gk()
k=l.db
if(k==null){k=new L.V(null,null,[U.C])
k.ai()
k.j(C.e)
l.db=k
l=k}else l=k
l=l.p()
k=this.gk().dx
j=this.gk().dy
i=this.gk().fr
h=this.gk().fx
g=this.gk().fy
f=this.gk().go
e=this.gk()
d=e.id
if(d==null){d=new L.bl(null,null)
e.id=d
e=d}else e=d
e=e.p()
z=new R.pj(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e)
if(y==null)H.e(P.i("categories"))
if(u==null)H.e(P.i("currentWeapon"))
if(s==null)H.e(P.i("gold"))
if(r==null)H.e(P.i("hitpoints"))
if(q==null)H.e(P.i("id"))
if(p==null)H.e(P.i("initiative"))
if(o==null)H.e(P.i("isActive"))
if(n==null)H.e(P.i("isConfused"))
if(m==null)H.e(P.i("isPlayer"))
if(l==null)H.e(P.i("items"))
if(k==null)H.e(P.i("maxHitpoints"))
if(j==null)H.e(P.i("name"))
if(i==null)H.e(P.i("nameIsProperNoun"))
if(h==null)H.e(P.i("pose"))
if(g==null)H.e(P.i("pronoun"))
if(f==null)H.e(P.i("stamina"))}this.j(z)
return z}}}],["","",,A,{"^":"",cu:{"^":"d;ek:a<,fw:b<,dW:c<",
c0:function(a,b){return new A.ai(this.a-b.a,this.b-b.b,this.c-b.c)},
i:function(a){return"ActorScore<self="+C.m.ba(this.a,2)+",team="+C.m.ba(this.b,2)+",enemy="+J.iK(this.c,2)+">"}},ai:{"^":"d;ek:a<,fw:b<,dW:c<",
giI:function(){return this.a===-1/0&&this.b===-1/0&&this.c===-1/0},
bt:function(a,b){return new A.ai(this.a*b,this.b*b,this.c*b)},
aL:function(a,b){return new A.ai(this.a+b.a,this.b+b.b,this.c+b.c)},
eg:function(a,b){return new A.ai(this.a/b,this.b/b,this.c/b)},
i:function(a){return"ActorScoreChange<self="+C.m.ba(this.a,2)+",team="+C.m.ba(this.b,2)+",enemy="+C.m.ba(this.c,2)+">"},
A:{
jf:function(a){var z,y,x,w,v,u,t,s
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ap)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
v+=s.c}if(y===0)throw H.c(P.F("Cannot average empty iterable"))
return new A.ai(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wa:function(a){switch(a){case C.F:return"fist"
case C.y:return"shield"
case C.v:return"spear"
case C.z:return"sword"}throw H.c(P.F(a))},
C:{"^":"mj;fB:a<",
gbe:function(){return U.wa(C.a.gdY(this.a))},
gq:function(){return H.aA(this)},
gbT:function(){return!0},
gam:function(){return!1},
gb1:function(){return!1},
gaH:function(){return!1},
gah:function(){return C.p},
gbs:function(){return $.$get$aG()},
$isay:1},
mj:{"^":"d+dk;"},
bB:{"^":"d;a,b",
i:function(a){return this.b}}}],["","",,K,{"^":"",U:{"^":"aM;n:b<,a"}}],["","",,E,{"^":"",bi:{"^":"C;n:b<,a",
gal:function(){return 1},
$isay:1}}],["","",,Z,{"^":"",al:{"^":"aM;n:b<,af:c<,aK:d<,aH:e<,bS:f<,dQ:r<,a",A:{
o5:function(a,b,c,d,e){return new Z.al(c,0,e,!1,!1,!1,P.az(C.G,null))}}}}],["","",,G,{"^":"",aB:{"^":"aM;n:b<,af:c<,aK:d<,aH:e<,bS:f<,dQ:r<,a",A:{
oD:function(a,b,c,d,e,f){return new G.aB(c,e,f,d,!0,!1,P.az(C.r,null))}}}}],["","",,L,{"^":"",aM:{"^":"C;",
gdQ:function(){return!1},
gbS:function(){return!1},
gw:function(a){return 2},
gaf:function(){return 0},
gaK:function(){return 0},
gal:function(){var z,y,x
z=this.gaf()
y=this.gaK()
x=this.gaH()?1:0
return 2+z+y+x},
$isay:1}}],["","",,G,{"^":"",m8:{"^":"d;",
eP:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
jt:[function(a){this.f.C+=a},"$1","gio",2,0,16],
b9:function(){var z=0,y=P.ax(),x,w=this,v,u
var $async$b9=P.av(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.t("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){C.a.sw(w.d.b,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.b.length===0&&u.C.length===0)){z=4
break}z=5
return P.au(w.cv(),$async$b9)
case 5:z=3
break
case 4:w.eP()
case 1:return P.aE(x,y)}})
return P.aF($async$b9,y)}}}],["","",,B,{"^":"",eO:{"^":"d;ej:a<,f_:b<,e3:c<",
i:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.m.ba(this.b,3)+", score="+this.a.i(0)+">"}},bE:{"^":"d;cz:a<,hS:b<,c,iX:d<,f_:e<,f,r,e0:x<,e3:y<",
gD:function(a){return X.bv(H.m([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
S:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isbE&&this.gD(this)===z.gD(b)},
i:function(a){var z,y
z=this.a
y=J.n(z)
z="PlanConsequence<"+y.gD(z)+", "+y.i(z)+", "+J.J(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
A:{
fq:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.e
z=z?0:b.y+1
d.b=a.r
return new B.bE(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iN:{"^":"d;a,b,c,d,e,f",
i8:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.T(C.j,"...",null,null)
z.T(C.j,"combining scores",null,null)
y=H.m([],[A.ai])
x=new G.j8()
for(w=J.ar(a),v=b.a,u=b.b,t=b.c,s=null;w.B();){r=w.gU()
z.T(C.j,new G.j6(r),null,null)
if(r.gf_()>0.15)if(s==null){z.T(C.j,"    - first _bestCase",null,null)
s=r}else if(J.aq(x.$1(r.gej()),x.$1(s.a))){z.T(C.j,"    - new _bestCase",null,null)
s=r}q=r.gej()
p=r.b
o=new A.ai((q.a-v)*p,(q.b-u)*p,(q.c-t)*p)
z.T(C.j,new G.j7(o),null,null)
y.push(o)}n=A.jf(y)
w=s==null
if(w)m=C.K
else{q=s.a
m=new A.ai(q.a-v,q.b-u,q.c-t)}w=w?s:s.c
if(w==null)w=1
v=m.a/w
u=m.b/w
w=m.c/w
t=n.a
q=n.b
p=n.c
z.T(C.j,"- uplifts average = "+("ActorScoreChange<self="+C.m.ba(t,2)+",team="+C.m.ba(q,2)+",enemy="+C.m.ba(p,2)+">"),null,null)
z.T(C.j,"- best = "+new A.ai(v,u,w).i(0),null,null)
l=new A.ai(v+t,u+q,w+p)
z.T(C.j,"- result = "+l.i(0),null,null)
return l},
eh:function(){var z=this
return P.aP(function(){var y=0,x=1,w,v,u,t,s
return function $async$eh(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbU(),u=u.ga5(u),t=1
case 2:if(!u.B()){y=3
break}s=u.gU()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aN()
case 1:return P.aO(w)}}})},
d4:function(a,b,c){var z=0,y=P.ax(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$d4=P.av(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=x.f
w.aW(0)
v=x.c
u=v.a
t=u.a.bg(0,new G.j9(x))
s=t.cD(u)
r=x.a
r.T(C.q,"Planning for "+H.b(t.dx)+", initialScore="+s.i(0),null,null)
q=new P.b9(x.dB(t,u).a(),null,null,null)
case 2:if(!q.B()){z=3
break}p=q.c
o=p==null?q.b:p.gU()
r.T(C.l,new G.ja(t,o),null,null)
if(!o.G(t,u)){r.T(C.l,new G.jb(o),null,null)
z=2
break}z=4
return P.au(x.c4(v,o,b,a,c).ct(0),$async$d4)
case 4:n=e
if(J.eA(n)){r.T(C.l,new G.jc(o),null,null)
w.t(0,o,C.L)
z=2
break}r.T(C.l,new G.jd(s,o,n),null,null)
m=x.i8(n,s,b)
w.t(0,o,m)
r.T(C.l,new G.je(o,m),null,null)
z=2
break
case 3:x.e=!0
return P.aE(null,y)}})
return P.aF($async$d4,y)},
iW:function(){return this.d4(50,10,null)},
dB:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dB(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bP((u.length!==0?C.a.gE(u):null).gbv())
case 2:u=(u.length!==0?C.a.gE(u):null).gau()
t=u.length
s={func:1,ret:Q.c3,args:[U.C]}
r={func:1,ret:Q.c1,args:[Q.r]}
q={func:1,ret:Q.v,args:[R.w]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.aw(o,q)?6:8
break
case 6:x=9
return P.bP(Q.hZ(z,y,o))
case 9:x=7
break
case 8:x=H.aw(o,r)?10:12
break
case 10:x=13
return P.bP(Q.i_(z,y,o))
case 13:x=11
break
case 12:x=H.aw(o,s)?14:16
break
case 14:x=17
return P.bP(Q.i0(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.t(o.i(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ap)(u),++p
x=3
break
case 5:return P.aN()
case 1:return P.aO(v)}}})},
c4:function(a5,a6,a7,a8,a9){var $async$c4=P.av(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bg(0,new G.iR(t))
p=t.a
p.T(C.l,"=====",null,null)
p.T(C.l,new G.iS(a6,q),null,null)
p.T(C.l,new G.iT(a6),null,null)
if(!a6.G(q,r)){p.T(C.l,"- firstAction not applicable",null,null)
z=1
break}o=q.cD(r)
p.T(C.l,new G.iZ(a5,o),null,null)
p.T(C.l,new G.j_(a5),null,null)
n=P.b7(null,B.bE)
m=P.ag(null,null,null,A.a3)
l=J.n(r)
k=l.gD(r)
for(j=new P.b9(a6.cT(q,a5,r).a(),null,null,null);j.B();){i=j.c
h=i==null?j.b:i.gU()
if(l.gD(r)!==k)throw H.c(new P.t("Action "+a6.i(0)+" modified world state when producing "+H.b(h)+"."))
n.ax(h)}s.a=0
r=t.b
case 3:if(!!n.ga4(n)){z=4
break}++s.a
g=n.d5()
p.T(C.j,"----",null,null)
p.T(C.j,new G.j0(g),null,null)
p.T(C.j,new G.j1(g),null,null)
if(g.ge3()>a7||s.a>a8){p.T(C.j,new G.j2(s,a7,g),null,null)
p.T(C.j,new G.j3(g),null,null)
z=4
break}z=g.gcz().f.length===0?5:6
break
case 5:p.T(C.j,"- leaf node: world.situations is empty (end of book)",null,null)
l=g.a
q=l.a.aX(0,new G.j4(t),new G.j5())
if(q==null){p.T(C.j,"- this actor ("+H.b(r)+") has been removed",null,null)
z=3
break}f=new B.eO(q.cD(l),g.e,g.y)
p.T(C.j,new G.iU(f),null,null)
z=7
x=[1]
return P.d0(P.hs(f),$async$c4,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
j=j.length!==0?C.a.gE(j):null
e=j.at(j.gV(),l)
j=l.a
i=new H.I(j,new G.iV(t),[H.j(j,0)])
d=i.gw(i)
if(d>1)throw H.c(new P.t("World has several duplicates of mainActor: "+J.J(l)))
else if(d===0){p.T(C.B,"mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead",null,null)
q=null}else q=j.bg(0,new G.iW(t))
c=J.u(e,q)
j=e.dx
p.T(C.j,"- actor: "+H.b(j)+" (isMain=="+c+")",null,null)
i=q==null
p.T(C.j,"- mainActor: "+H.b(i?q:q.dx),null,null)
b=i?q:q.cD(l)
if(b==null)b=C.M
f=new B.eO(b,g.e,g.y)
p.T(C.j,new G.iX(o,f),null,null)
p.T(C.j,new G.iY(g),null,null)
z=8
x=[1]
return P.d0(P.hs(f),$async$c4,y)
case 8:p.T(C.j,"- generating all actions for "+H.b(j),null,null)
j=n.c
i=n.b
a=n.a
for(a0=new P.b9(t.dB(e,l).a(),null,null,null);a0.B();){a1=a0.c
a2=a1==null?a0.b:a1.gU()
if(!a2.G(e,l))continue
for(a1=new P.b9(a2.cT(e,g,l).a(),null,null,null);a1.B();){a3=a1.c
a4=a3==null?a1.b:a3.gU();++t.d
if(a4.e<0.05)continue
if(m.ag(0,a4.a))continue
n.ax(a4)}}p.T(C.j,"- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences",null,null)
m.u(0,l)
z=3
break
case 4:case 1:return P.d0(null,0,y)
case 2:return P.d0(v,1,y)}})
var z=0,y=P.pL($async$c4),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.r3(y)},
h1:function(a,b){},
A:{
iO:function(a,b){var z,y
z=N.bf("ActorPlanner")
y=new Y.a1(H.m([],[Y.ah]),0,P.aV())
y.b=b.r
z=new G.iN(z,a.y,new B.bE(b,null,y,1,1,!0,!1,!1,0),0,!1,new H.P(0,null,null,null,null,null,0,[null,null]))
z.h1(a,b)
return z}}},j8:{"^":"a:49;",
$1:function(a){return a.b-a.c}},j6:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},j7:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.i(0)}},j9:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},ja:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.dx)}},jb:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},jc:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jd:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.b0(this.c))+" different ConsequenceStats, initialScore="+this.a.i(0)}},je:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+this.b.i(0)}},iR:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},iS:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gn())}},iT:{"^":"a:2;a",
$0:function(){return"- firstAction == "+J.J(this.a)}},iZ:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.i(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j_:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.c.bt(" ",z.y)+"- "+J.J(z.b)}},j0:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.ghS().gX()+"'"}},j1:{"^":"a:2;a",
$0:function(){var z=this.a.gcz().f
return"- situation: "+J.iD(z.length!==0?C.a.gE(z):null).i(0)}},j2:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.ge3()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},j3:{"^":"a:2;a",
$0:function(){var z=this.a.gcz().d
return"- how we got here: "+new H.ak(z,new G.iQ(),[H.j(z,0),null]).cp(0," <- ")}},iQ:{"^":"a:0;",
$1:function(a){return a.gbe()}},j4:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},j5:{"^":"a:2;",
$0:function(){return}},iU:{"^":"a:2;a",
$0:function(){return"- "+this.a.i(0)}},iV:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},iW:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},iX:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.i(0)+" (initial="+this.a.i(0)+")"}},iY:{"^":"a:2;a",
$0:function(){var z=this.a.gcz().d
return"- how we got here: "+new H.ak(z,new G.iP(),[H.j(z,0),null]).cp(0," <- ")}},iP:{"^":"a:0;",
$1:function(a){return a.gbe()}}}],["","",,Z,{"^":"",mG:{"^":"d;a,b",
ga4:function(a){return this.b.length===0},
fi:function(a,b){var z=this
return P.aP(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fi(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bP(t)
case 5:w=1
break
case 4:s=z.hv(new Z.mJ())
r=z.dA(new Z.mK(),[s])
q=z.dA(new Z.mL(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bF().T(C.q,"best self preserving: "+s.i(0),null,null)
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bF().T(C.q,"best enemy damaging: "+J.J(r),null,null)
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bF().T(C.q,"best team preserving: "+J.J(q),null,null)
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.bN(t,new Z.mM(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.n(m)
if(l.S(m,s)){w=17
break}if(l.S(m,r)){w=17
break}if(l.S(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ap)(t),++n
w=16
break
case 18:case 1:return P.aN()
case 2:return P.aO(u)}}})},
iV:function(a){var z,y,x,w,v,u,t,s
z={}
y=this.b
if(y.length===1)return C.a.gbM(y)
C.a.bN(y,new Z.mN(this,a))
x=this.a.a
w=x.gc_().b7(0,1/0,new Z.mO(a))
v=x.gc_().b7(0,-1/0,new Z.mP(a))
u=w-(v-w)*0.1
z.a=u
if(w===v){--u
z.a=u
x=u}else x=u
t=P.m7(y.length,new Z.mQ(z,this,a,v-x),!1,P.L)
s=new H.ak(t,new Z.mR(C.a.b7(t,0,Z.ut())),[H.j(t,0),null]).bZ(0,!1)
x=C.a.b7(s,0,Z.uu())
z=s.length-1
s[z]=J.iw(s[z],1000-x)
return y[S.n2(s,1000)]},
dA:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ap)(z),++u){t=z[u]
if(C.a.ag(b,t))continue
if(w==null||J.aq(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hv:function(a){return this.dA(a,C.e)},
A:{
mH:function(a){var z,y,x
z=a.gbU()
y=H.z(z,"D",0)
x=P.Q(new H.I(z,new Z.mI(a),[y]),!1,y)
if(x.length===0)$.$get$bF().T(C.D,"After removing actions scored by undefined, there are no recommendations.",null,null)
return x},
wH:[function(a,b){return a+b},"$2","ut",4,0,44],
wI:[function(a,b){return a+b},"$2","uu",4,0,45]}},mJ:{"^":"a:0;",
$1:function(a){return a.gek()}},mK:{"^":"a:0;",
$1:function(a){return-a.gdW()}},mL:{"^":"a:0;",
$1:function(a){return a.gfw()}},mM:{"^":"a:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bx(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},mN:{"^":"a:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bx(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},mO:{"^":"a:5;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d3(a),H.d3(z))}},mP:{"^":"a:5;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d3(a),H.d3(z))}},mQ:{"^":"a:9;a,b,c,d",
$1:function(a){var z=this.b
return J.cs(J.iz(this.c.$1(z.a.a.h(0,z.b[a])),this.a.a),this.d)}},mR:{"^":"a:0;a",
$1:function(a){return J.iH(J.iy(J.cs(a,this.a),1000))}},mI:{"^":"a:0;a",
$1:function(a){return!this.a.h(0,a).giI()}}}],["","",,K,{"^":"",rc:{"^":"a:3;",
$3:function(a,b,c){}},cc:{"^":"d;a,n:b<,c,d,e,f,bK:r<",
gD:function(a){return C.c.gD(this.b)},
S:function(a,b){if(b==null)return!1
return b instanceof K.cc&&b.b===this.b},
i:function(a){return"Room<"+this.b+">"},
A:{
ab:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.r])
z.ab()
z.j(f)
return new K.cc(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",r:{"^":"d;a,X:b<,be:c<,d"}}],["","",,S,{"^":"",ac:{"^":"d;",
gau:function(){return C.e},
gbv:function(){return C.e},
gd2:function(){return 3},
fe:function(a,b){},
ff:function(a,b){},
cr:function(a){},
cE:function(a){return!0}}}],["","",,S,{"^":"",
fz:function(a){return a[$.$get$bH().ak(3)]},
n1:function(a,b){var z,y,x,w
z=$.$get$bH().iR()*b
for(y=new H.dy(a,a.gw(a),0,null,[H.z(a,"b5",0)]),x=0,w=0;y.B();){x+=y.d
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
n2:function(a,b){var z,y,x,w,v,u
z=$.$get$bH().ak(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ap)(a),++v){x+=a[v]
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
bI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.iE(a,"{")
if(z!==-1&&z<a.length-1){y=H.m([],[P.q])
y.push(z)
w=z+1
v=a.length
u=null
t=1
while(!0){if(!(w<v)){x=null
break}s=a[w]
if(s==="{")++t
else if(s==="|"&&t===1)y.push(w)
else if(s==="}"){--t
if(t===0){y.push(w)
x=w
u=x
break}}r=w+1
u=w
w=r}q=y.length-1
if(q>1){p=$.$get$bH().ak(q)
o=C.c.aw(a,0,z)+H.b(S.bI(C.c.aw(a,y[p]+1,y[p+1])))+C.c.aw(a,x+1,v)
o=o.charCodeAt(0)==0?o:o
if(u===v-1)return o
else return S.bI(o)}else if(u===v-1)return a
else{v=u+1
return C.c.aw(a,0,v)+H.b(S.bI(C.c.bh(a,v)))}}else return a},
a6:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bH().ak(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ah:{"^":"d;bc:a<,aO:b<,aY:c<,iT:d<,e,cU:f@,fk:r<,fd:x<,eo:y<,ir:z<,h_:Q<,cw:ch<,cx,cy,V:db<",
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
default:throw H.c(P.F("Invalid key "+b+"."))}},
i:function(a){var z=this.a
z="Report<"+C.c.aw(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a1:{"^":"d;a,V:b<,c",
gdZ:function(){return C.a.b6(this.a,new Y.oj())},
aD:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||b==="")return
z=(J.bu(b).dV(b,".")||C.c.dV(b,"!")||C.c.dV(b,"?"))&&C.c.cF(b,P.bh("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ah(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
u:function(a,b){return this.aD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
l:function(a,b,c){return this.aD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bw:function(a,b,c,d){return this.aD(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
dK:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aD(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
eU:function(a,b,c){return this.aD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
dM:function(a,b,c,d,e){return this.aD(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dL:function(a,b,c,d){return this.aD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bw:function(a,b,c,d){return this.aD(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
eV:function(a,b,c,d,e,f){return this.aD(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
hX:function(a,b,c,d,e,f){return this.aD(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
hU:function(a,b,c){return this.aD(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
hV:function(a,b,c,d){return this.aD(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
hY:function(a,b,c,d,e,f){return this.aD(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
hW:function(a,b,c,d,e){return this.aD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
i1:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oh().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ap)(b),++u){t=b[u]
if(w>0){if(w===1&&J.u(t,C.a.gE(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bx(t.gn(),t.gn(),t,null,this.b));++w
if(w>x||t.S(0,C.a.gE(b))){z+="."
this.hY(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.k(a,"<also>","also")+" "
w=0}}},
i0:function(a,b,c,d){return this.i1(a,b,c,"and",3,null,null,d)},
dN:function(){return this.l(0,"\n\n",!0)},
bx:function(a,b,c,d,e){var z,y,x
if(d!=null)z=J.W(a).b0(a,"<owner's> "+H.b(b))!==-1||C.c.b0(a,"<ownerPronoun's> "+H.b(b))!==-1||C.c.b0(a,"<object-owner's> "+H.b(b))!==-1||C.c.b0(a,"<object-ownerPronoun's> "+H.b(b))!==-1
else z=!1
if(z)return a
if(J.W(a).b0(a,"<subject's> "+H.b(b))!==-1||C.c.b0(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(!c.gaH()){z=this.c
y=z.h(0,c.gq())
if((y==null?-1:y)<e){z="the "+H.b(b)
x=H.b_(a,b,z,0)}else{if(J.eC(c.gn(),P.bh("[aeiouy]",!1,!1))){y="an "+H.b(b)
x=H.b_(a,b,y,0)}else{y="a "+H.b(b)
x=H.b_(a,b,y,0)}z.t(0,c.gq(),e)}}else x=null
return x==null?a:x},
dX:function(a,b){var z,y,x
if(!this.aF(a)||!this.aF(b))return!1
z=this.a
if(z[a].gaO()==null||z[b].gaO()==null)return!1
if(z[a].gaY()==null||z[b].gaY()==null)return!1
y=z[a].gaO().gq()
x=z[b].gaY().gq()
if(y==null?x==null:y===x){y=z[a].gaY().gq()
z=z[b].gaO().gq()
z=y==null?z==null:y===z}else z=!1
return z},
df:function(a){var z=this
return P.aP(function(){var y=a
var x=0,w=2,v,u,t
return function $async$df(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aF(y)){x=1
break}u=z.a[y]
x=u.gaO()!=null?3:4
break
case 3:x=5
return u.gaO()
case 5:case 4:x=u.gaY()!=null?6:7
break
case 6:x=8
return u.gaY()
case 8:case 7:x=u.giT()!=null?9:10
break
case 9:x=11
return u.d
case 11:case 10:t=u.e
x=t!=null?12:13
break
case 12:x=14
return t
case 14:case 13:case 1:return P.aN()
case 2:return P.aO(v)}}})},
cq:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gaY()},"$1","gaY",2,0,18],
iS:function(a,b){if(!this.aF(a)||!this.aF(b))return!1
if(this.dX(a,b))this.a[a].geo()
return!1},
fg:function(a){var z
for(z=!1;this.gdZ();z=!0){a.$1(this.fl(!0))
this.j0()}return z},
fl:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.b7(z,[],new Y.ok())
C.a.hK(z,new Y.ol(y),!1)
x=a&&this.gdZ()?C.a.b0(z,C.a.cX(z,new Y.om()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dX(p,s)
if(!z[s].gcU())n=this.iS(s,p)&&this.fZ(s,p)
else n=!0
t=n&&!z[p].gcU()
z[s].scU(t)
n=s-w
if(n<3)if(!u){if(!z[s].gh_())if(!z[p].gir())if(!z[s].gcw())if(this.cQ(s,p)||o)if(!(t&&n>1))n=t&&z[p].gcU()||this.jf(s)>4
else n=!0
else n=!0
else n=!0
else n=!0
else n=!0
v=n}else v=!0
else v=!0
if(v){if(z[p].gcw()){r+=" "
p=r}else{r+=". "
p=r}r=t&&!z[s].gcw()?r+"But ":p
u=!1}else if(t){r+=S.fz([" but "," but ",", but "])
u=!this.fN(s,s+1)&&!0}else{r+=S.fz([" and "," and ",", and "])
u=!0}}m=this.dk(s)
l=S.bI(m)
if(J.bX(l,"{")||C.c.ag(l,"}"))$.$get$i8().T(C.C,'Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+l+'"""',null,null)
p=!v
if(p){n=s-1
n=this.cQ(s,n)&&J.eC(this.dk(n),"<subject> ")&&C.c.cF(l,"<subject> ")}else n=!1
if(n)l=H.b_(l,"<subject> ","",0)
n=this.dk(s)
if(typeof n!=="string")H.e(H.a4(n))
k=H.k(l,"<action>",n)
n=s-1
j=this.hM(s,n)
if(j)j=!(this.cq(s).gah()===C.p&&this.b4(s).gah()===C.p)
else j=!1
if(j){k=H.k(k,"<object-owner's> <object>","<objectPronounAccusative>")
k=H.k(k,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
k=H.k(k,"<object>","<objectPronounAccusative>")
k=H.k(k,"<object's>","<objectPronoun's>")}j=this.cQ(s,n)
if(j){k=H.k(k,"<owner's> <subject>","<subjectPronoun>")
k=H.k(k,"<ownerPronoun's> <subject>","<subjectPronoun>")
k=H.k(k,"<subject>","<subjectPronoun>")
k=H.k(k,"<subject's>","<subjectPronoun's>")}if(this.cq(n)!=null)if(this.b4(s)!=null)if(this.b4(n)!=null){j=this.cq(n)
j=j==null?j:j.gq()
i=this.b4(s)
if(J.u(j,i==null?i:i.gq())){j=this.b4(n)
j=j==null?j:j.gah()
i=this.b4(s)
j=!J.u(j,i==null?i:i.gah())}else j=!1}else j=!1
else j=!1
else j=!1
if(j){k=H.k(k,"<owner's> <subject>","<subjectPronoun>")
k=H.k(k,"<ownerPronoun's> <subject>","<subjectPronoun>")
k=H.k(k,"<subject>","<subjectPronoun>")
k=H.k(k,"<subject's>","<subjectPronoun's>")}if(this.b4(n)!=null)if(this.cq(s)!=null){j=this.b4(n)
j=j==null?j:j.gq()
i=this.cq(s)
if(J.u(j,i==null?i:i.gq())){n=this.b4(n)
n=n==null?n:n.gah()
j=this.b4(s)
n=!J.u(n,j==null?j:j.gah())}else n=!1}else n=!1
else n=!1
if(n){k=H.k(k,"<object-owner's> <object>","<objectPronoun>")
k=H.k(k,"<object-ownerPronoun's> <object>","<objectPronoun>")
k=H.k(k,"<object>","<objectPronounAccusative>")
k=H.k(k,"<object's>","<objectPronoun's>")}n=z[s]
h=n.b
g=n.c
f=n.d
e=n.e
j=h!=null
if(j){if(h.gb1()){d=H.k(k,"<subject>","<subjectPronoun>")
d=H.k(d,"<subject's>","<subjectPronoun's>")}else d=k
if(h.gah()===C.I||h.gah()===C.H){d=H.k(d,"<s>","")
d=H.k(d,"<es>","")
d=H.k(d,"<sses>","ss")
d=H.k(d,"<ies>","y")
d=H.k(d,"<does>","do")
d=H.k(d,"<is>","are")
d=H.k(d,"<has>","have")}else{d=H.k(d,"<s>","s")
d=H.k(d,"<es>","es")
d=H.k(d,"<sses>","sses")
d=H.k(d,"<ies>","ies")
d=H.k(d,"<does>","does")
d=H.k(d,"<is>","is")
d=H.k(d,"<has>","has")}d=H.b_(d,"<subject>","<subjectNoun>",0)
i=h.gah().a
d=H.k(d,"<subject>",i)
i=n.db
d=this.bx(d,"<subjectNoun>",h,f,i)
c=h.gn()
d.toString
if(typeof c!=="string")H.e(H.a4(c))
d.length
d=H.b_(d,"<subjectNoun>",c,0)
c=h.gah().a
d=H.k(d,"<subjectPronoun>",c)
if(C.c.ag(k,P.bh("<subject>.+<subject's>",!0,!1))){c=h.gah().c
d=H.k(d,"<subject's>",c)}d=this.bx(d,"<subject's>",h,f,i)
i=H.b(h.gn())+"'s"
d.length
d=H.b_(d,"<subject's>",i,0)
i=h.gah().c
d=H.k(d,"<subject's>",i)
i=h.gah().b
d=H.k(d,"<subjectPronounAccusative>",i)
i=h.gah().d
d=H.k(d,"<subjectPronounSelf>",i)}else d=k
if(g!=null){if(g.gaH()){d=H.k(d,"<subject's> <object>","<object>")
d=H.k(d,"<subjectPronoun's> <object>","<object>")}if(g.gb1()){d=H.k(d,"<object>","<objectPronoun>")
d=H.k(d,"<object's>","<objectPronoun's>")}else{d=this.bx(d,"<object>",g,e,n.db)
i=g.gn()
d.toString
if(typeof i!=="string")H.e(H.a4(i))
d=H.k(d,"<object>",i)}i=g.gah().b
d=H.k(d,"<objectPronoun>",i)
if(C.c.ag(k,P.bh("<object>.+<object's>",!0,!1))){i=g.gah().c
d=H.k(d,"<object's>",i)}d=this.bx(d,"<object's>",g,e,n.db)
i=H.b(g.gn())+"'s"
d.length
d=H.b_(d,"<object's>",i,0)
i=g.gah().c
d=H.k(d,"<object's>",i)
i=g.gah().c
d=H.k(d,"<objectPronoun's>",i)
i=g.gah().b
d=H.k(d,"<objectPronounAccusative>",i)
i=g.gah().a
d=H.k(d,"<objectPronounNominative>",i)}if(j){j=h.gah().c
d=H.k(d,"<subjectPronoun's>",j)}n=n.db
k=this.eQ(e,this.eQ(f,d,k,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),k,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.oi(k):k
if(v)w=s
if(z[s].gcw())u=!0}z=!z[x-1].gcw()?r+".":r
return H.w2(z.charCodeAt(0)==0?z:z,$.$get$fU(),new Y.on(),null)},
bW:function(){return this.fl(!1)},
j0:function(){var z,y
if(!this.gdZ()){C.a.sw(this.a,0)
return}z=this.a
y=C.a.b0(z,C.a.cX(z,new Y.oo()))+1
P.ca(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fN:function(a,b){var z
if(!this.aF(a)||!this.aF(b))return!1
if(this.dX(a,b))this.a[a].geo()
if(!this.cQ(a,b))return!1
z=this.a
if(z[a].gfk()&&z[b].gfk())return!0
if(z[a].gfd()&&z[b].gfd())return!0
else return!1},
fZ:function(a,b){var z,y,x,w,v,u
if(!this.aF(a)||!this.aF(b))return!1
for(z=new P.b9(this.df(a).a(),null,null,null);z.B();){y=z.c
x=y==null?z.b:y.gU()
for(y=new P.b9(this.df(b).a(),null,null,null);y.B();){w=y.c
v=w==null?y.b:w.gU()
w=x.gq()
u=v.gq()
if(w==null?u==null:w===u)return!0}}return!1},
dk:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gbc()},"$1","gbc",2,0,13],
b4:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gaO()},"$1","gaO",2,0,18],
jf:function(a){var z,y
z=this.a
if(z[a].gV()!=null){y=a-1
y=!this.aF(y)||z[y].gV()==null}else y=!0
if(y)return 1000
else return z[a].gV()-z[a-1].gV()},
i:function(a){return this.bW()},
aF:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eQ:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.cx)z=H.k(H.k(b,d,"you"),e,"your")
else{z=this.bx(b,d,a,null,h)
y=a.dx
z.toString
H.cm(y)
z=H.k(z,d,y)}y=a.fx
z=H.k(z,f,y.a)
z=J.iG(this.bx(C.c.ag(c,P.bh(d+".+"+e,!0,!1))?H.k(z,e,y.c):z,e,a,null,h),e,H.b(a.dx)+"'s")
y=y.c
z=H.k(H.k(z,e,y),g,y)}else z=H.k(H.k(H.k(H.k(b,d,""),e,""),f,""),g,"")
return z},
hM:function(a,b){var z,y
if(!this.aF(a)||!this.aF(b))return!1
z=this.a
if(z[a].gaY()==null||z[b].gaY()==null)return!1
y=z[a].gaY().gq()
z=z[b].gaY().gq()
return y==null?z==null:y===z},
cQ:function(a,b){var z,y
if(!this.aF(a)||!this.aF(b))return!1
z=this.a
if(z[a].gaO()==null||z[b].gaO()==null)return!1
y=z[a].gaO().gq()
z=z[b].gaO().gq()
return y==null?z==null:y===z},
A:{
oi:function(a){var z,y,x
z=!C.c.ag(a,"\n\n")?C.c.jj(a):a
y=z.length
if(y===0)return z
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.c.bh(z,1)}}},oj:{"^":"a:0;",
$1:function(a){return J.u(a.gbc(),"\n\n")}},oh:{"^":"a:19;",
$1:function(a){return C.c.dd(H.k(H.k(a,"<also> ",""),"  "," "))}},ok:{"^":"a:48;",
$2:function(a,b){var z,y,x,w
z=J.W(a)
y=z.gf8(a)?z.gE(a):null
if(y!=null)if(y.cy){x=b.cx
w=y.cx
w=x==null?w==null:x===w
x=w}else x=!1
else x=!1
if(x)z.t(a,z.gw(a)-1,b)
else z.u(a,b)
return a}},ol:{"^":"a:53;a",
$1:function(a){return J.bX(this.a,a)}},om:{"^":"a:0;",
$1:function(a){return J.u(a.gbc(),"\n\n")}},on:{"^":"a:43;",
$1:function(a){return H.b(a.h(0,1))+H.b(a.h(0,2))+H.b(a.h(0,3))}},oo:{"^":"a:0;",
$1:function(a){return J.u(a.gbc(),"\n\n")}},ay:{"^":"mk;aH:a<,n:b<,c,bs:d<,b1:e<,ah:f<",
gq:function(){return H.aA(this)},
gbT:function(){return!0},
gam:function(){return!0},
A:{
c0:function(a,b,c,d,e){var z=H.m([],[P.l])
return new Y.ay(c,b,z,e==null?$.$get$aG():e,!1,d)}}},mk:{"^":"d+dk;"},dk:{"^":"d;",
gbn:function(){return this.gam()&&this.gbT()},
a6:function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.dK(0,b,c,d,e,f,g,h,i,j,k,H.y(this,"$isay"),!1,m)},
aZ:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
ap:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
a0:function(a,b){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
aa:function(a,b,c){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
d6:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
j7:function(a,b,c,d,e){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
a8:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
d8:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
d8:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
as:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
bF:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
j6:function(a,b,c,d,e){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
e7:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
e7:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bq:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
br:function(a,b,c,d,e){return this.a6(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
e6:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
b2:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
bF:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
d7:function(a,b,c,d,e){return this.a6(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
fp:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
fo:function(a,b,c,d){return this.a6(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
j9:function(a,b,c,d,e,f){return this.a6(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
bG:function(a,b,c,d,e){return this.a6(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
fn:function(a,b,c){return this.a6(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
j4:function(a,b,c,d){return this.a6(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
e8:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
j8:function(a,b,c,d,e){return this.a6(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
ja:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
e6:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
j5:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},c8:{"^":"d;a,b,c,d",
i:function(a){return this.a}}}],["","",,L,{"^":"",rI:{"^":"a:0;",
$1:function(a){a.gcd().b=2
return 2}},rf:{"^":"a:0;",
$1:function(a){a.gcd().b=0
return 0}},rH:{"^":"a:0;",
$1:function(a){a.gcd().b=1
return 1}},h3:{"^":"d;"},pB:{"^":"h3;q:a<",
ae:function(a){var z=new L.bl(null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h3))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gD:function(a){return Y.T(Y.h(0,J.f(this.a)))},
i:function(a){var z,y
z=$.$get$S().$1("Team")
y=J.x(z)
y.m(z,"id",this.a)
return y.i(z)},
A:{
dZ:function(a){var z=new L.bl(null,null)
a.$1(z)
return z.p()}}},bl:{"^":"d;a,b",
gq:function(){return this.gcd().b},
gcd:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcd().b
z=new L.pB(y)
if(y==null)H.e(P.i("id"))}this.j(z)
return z}}}],["","",,O,{"^":"",p3:{"^":"d;a"}}],["","",,X,{"^":"",
hJ:function(a,b){return P.aP(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hJ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.b3(u,u.length,0,null,[H.j(u,0)])
u=y.a
s=new J.b3(u,u.length,0,null,[H.j(u,0)])
case 2:r=t.B()
q=s.B()
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
case 1:return P.aO(v)}}})}}],["","",,A,{"^":"",a3:{"^":"d;a,b,c,d,e,f,V:r<,x",
gD:function(a){var z,y,x,w,v
z=X.bv(this.a)
y=X.bv(this.d)
x=X.bv(this.f)
w=this.r
v=this.c
v=X.d2(X.aW(X.aW(0,C.i.gD(w)),J.f(v)))
return X.d2(X.aW(X.aW(X.aW(X.aW(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
S:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isa3&&this.gD(this)===z.gD(b)},
bd:function(a){var z,y
z=this.fL(a,!0)
y=z.ga5(z)
if(y.B()){y.gU()
return!0}return!1},
aj:function(a){var z,y
z=this.fK(a)
y=z.ga5(z)
if(y.B()){y.gU()
return!0}return!1},
f1:function(a){var z,y
z=this.cN(a)
if(z==null)throw H.c(new P.t("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
y[z]=y[z].an()},
an:function(){++this.r},
cA:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.cG(0,new A.p8(a))
if(b!=null)z=z.bJ(0,new A.p9(b))
if(c!=null)z=z.bJ(0,new A.pa(c))
if(e!=null)z=z.bJ(0,new A.pb(e))
return d!=null?z.bJ(0,new A.pc(d)):z},
fL:function(a,b){return this.cA(a,null,null,null,b)},
fK:function(a){return this.cA(a,null,null,null,null)},
fM:function(a,b,c){return this.cA(a,b,null,null,c)},
v:function(a){return this.a.bg(0,new A.pd(a))},
dh:function(a){return this.e.bg(0,new A.pe(a))},
ei:function(a){var z=this.cN(a)
if(z==null)return
return this.f[z]},
a7:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y)if(z[y].gn()===a)return z[y]
throw H.c(P.F("No situation with name="+a+" found."))},
iy:function(a){var z=this.a.aX(0,new A.pf(a),new A.pg())
if(z==null)return!1
return z.gam()},
ao:function(){var z,y
z=this.f
y=C.a.gE(z)
y.cr(this)
C.a.a_(z,y)},
aE:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&C.a.gE(z).gn()!==a))break
y=C.a.gE(z)
y.cr(this)
C.a.a_(z,y)}if(z.length===0)throw H.c(P.F("Tried to pop situations until "+a+" but none was found in stack."))},
bE:function(a,b){var z=this.cN(a)
if(z==null)throw H.c(P.F("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
this.f[z]=b},
ed:function(a,b,c,d,e){var z,y,x
z=this.cA(a,b,c,d,e)
y=z.ga5(z)
if(y.B()){x=y.gU()
return this.r-x.gV()}return},
je:function(a,b,c){return this.ed(null,a,b,c,null)},
bY:function(a,b,c){return this.ed(a,null,b,null,c)},
d9:function(a){return this.ed(a,null,null,null,null)},
i:function(a){var z,y
z=this.a
y=z.hD()
y.av(0,z)
return"World<"+y.i(0)+">"},
W:function(a,b){var z,y,x
z=this.v(a)
z.toString
y=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.j(z)
b.$1(y)
x=y.p()
y=this.a
y.a_(0,z)
y.u(0,x)},
cN:function(a){var z,y,x,w
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}w=y[x].gq()
if(w==null?a==null:w===a){z=x
break}++x}return z},
ha:function(a){this.a.av(0,a.a)
this.d.av(0,a.d)
this.b.av(0,a.b)
this.e.av(0,a.e)
C.a.av(this.f,a.f)
this.r=a.r},
A:{
dX:function(a){var z,y,x,w
z=P.ag(null,null,null,R.w)
y=P.b7(null,O.ct)
x=P.ag(null,null,null,U.C)
w=P.ag(null,null,null,null)
w=new A.a3(z,x,a.c,y,w,[],null,null)
w.ha(a)
return w}}},p8:{"^":"a:0;a",
$1:function(a){return a.gdJ()===this.a}},p9:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gcs()
y=this.a.y
return z==null?y==null:z===y}},pa:{"^":"a:0;a",
$1:function(a){return a.gep().ag(0,this.a.y)}},pb:{"^":"a:0;a",
$1:function(a){return a.gfG()===this.a}},pc:{"^":"a:0;a",
$1:function(a){return a.gfE()===this.a}},pd:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a
return z==null?y==null:z===y}},pe:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gn()
y=this.a
return z==null?y==null:z===y}},pf:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a
return z==null?y==null:z===y}},pg:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",R:{"^":"af;Y:b<"},fI:{"^":"R;c,d,X:e<,M:f<,n:r<,b,a",
gI:function(){return!1},
gN:function(){return!1},
gJ:function(){return H.e(new P.t("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.t("SimpleAction always succeeds"))},"$3","gK",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gL",6,0,1],
a3:function(a,b){throw H.c(new P.t("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
G:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",jM:{"^":"v;I:c<,Y:d<,M:e<,N:f<,J:r<,b,a",
ga2:function(){return"confuse <object>"},
gn:function(){return"Confuse"},
ga9:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.a0(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.a8(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.e6(c,"<subject> fail<s>",!0,!0)
return H.b(a.dx)+" fails to confuse "+H.b(z.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z
a.a0(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.b2(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.as(c,"<subject's> eyes go wide with terror",!0)
b.W(z.y,new N.jN())
return H.b(a.dx)+" confuses "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){return 0.8},
G:function(a,b){var z
if(a.cx)if(a.fr===C.d){z=b.a
z=new H.I(z,new N.jO(this),[H.j(z,0)])
z=z.gw(z)>=2&&!this.b.ch}else z=!1
else z=!1
return z},
A:{
wh:[function(a){return new N.jM(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.f,a,null)},"$1","t5",2,0,4]}},jN:{"^":"a:0;",
$1:function(a){a.gk().cx=!0
return a}},jO:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gam()){z=a.gbs()
y=this.a.b.go
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",k4:{"^":"v;N:c<,J:d<,I:e<,Y:f<,M:r<,b,a",
ga2:function(){return"kick <object's> weapon off"},
gn:function(){return"DisarmKick"},
ga9:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a6(new V.k5(this,a,c),new V.k6(this,a,c),null,null)
return H.b(a.dx)+" fails to kick "+H.b(this.b.dx)+"'s weapon off"},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x
S.a6(new V.k7(this,a,c),new V.k8(this,a,c),null,null)
z=b.f
z=z.length!==0?C.a.gE(z):null
y=z.e
x=new U.b4(null,null,null,null,null,null,null,null,null)
x.j(z)
new V.k9(this).$1(x)
b.bE(y,x.p())
z=this.b
b.W(z.y,new V.ka())
return H.b(a.dx)+" kicks "+H.b(z.dx)+"'s weapon off"},"$3","gL",6,0,1],
H:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
return 0.5-z},
G:function(a,b){var z=a.fr
if(z===C.d||z===C.h){z=this.b
z=z.fr===C.b&&!(z.e instanceof K.U)}else z=!1
return z},
A:{
wk:[function(a){return new V.k4(!0,C.f,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","to",2,0,4]}},k5:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.a8(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aa(y,"<subject> mi<sses>",!0)}},k6:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.a8(z,"<subject> kick<s> <object's> weapon",y)
y.aa(z,"<subject> hold<s> onto it",!0)}},k7:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.ja(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.e,z,!0)}},k8:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b2(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bw(0,"<owner's> <subject> fl<ies> away",y,y.e)}},k9:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gac()
y=z.b
if(y==null){y=new S.N(null,null,[U.C])
y.ab()
y.j(C.e)
z.b=y
z=y}else z=y
y=this.a.b.e
if(y==null)H.e(P.F("null element"))
z=z.gcP();(z&&C.a).u(z,y)
return a}},ka:{"^":"a:0;",
$1:function(a){var z=$.$get$d6()
a.gk().f=z
return a}}}],["","",,R,{"^":"",lS:{"^":"v;N:c<,J:d<,I:e<,Y:f<,M:r<,b,a",
gn:function(){return"KickToGround"},
ga2:function(){return"kick <object> to the ground"},
ga9:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a6(new R.lT(this,a,c),new R.lU(this,a,c),null,null)
return H.b(a.dx)+" fails to sweep "+H.b(this.b.dx)+" off feet"},"$3","gK",6,0,1],
R:[function(a,b,c){var z
S.a6(new R.lV(this,a,c),new R.lW(this,a,c,U.bt(b)),null,null)
z=this.b
b.W(z.y,new R.lX())
return H.b(a.dx)+" sweeps "+H.b(z.dx)+" off feet"},"$3","gL",6,0,1],
H:function(a,b){var z=a.fr===C.d?0:0.3
if(a.cx)return 0.8-z
return 0.5-z},
G:function(a,b){var z=a.fr
return(z===C.d||z===C.h)&&this.b.fr!==C.b},
A:{
wB:[function(a){return new R.lS(!0,C.f,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uk",2,0,4]}},lT:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.a8(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aa(y,"<subject> mi<sses>",!0)}},lU:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.a8(z,"<subject> kick<s> <object's> shin",y)
y.aa(z,"<subject> <does>n't budge",!0)}},lV:{"^":"a:2;a,b,c",
$0:function(){this.b.j8(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},lW:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b2(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.a0(z,"<subject> {grunt|shriek}<s>")
y.as(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lX:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,F,{"^":"",mF:{"^":"af;M:b<,I:c<,Y:d<,N:e<,J:f<,a",
gX:function(){return"Stand off."},
gn:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){if(a.cx)a.a0(c,"<subject> stand<s> off")
return H.b(a.dx)+" passes the opportunity"},"$3","gL",6,0,1],
a3:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",mT:{"^":"v;N:c<,J:d<,I:e<,Y:f<,M:r<,b,a",
ga2:function(){return"force <object> off balance"},
gn:function(){return"Pound"},
ga9:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.e8(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.e,z)
z.aZ(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.dx)+" kicks "+H.b(z.dx)+" off balance"},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
a.e8(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.e,z)
y=z.fr
if(y===C.d){z.fp(c,"<subject> lose<s> <object>",!0,$.$get$eh())
b.W(z.y,new Y.mU())
C.a.u(b.f,U.ml(z,a))
return H.b(a.dx)+" pounds "+H.b(z.dx)+" off balance"}else if(y===C.h){z.a0(c,"<subject> <is> already off balance")
c.dL(0,"<subject> make<s> <object> fall to the "+H.b(U.bt(b)),z,$.$get$ib())
b.W(z.y,new Y.mV())
return H.b(a.dx)+" pounds "+H.b(z.dx)+" to the ground"}throw H.c(new P.t("enemy pose must be either standing or off-balance"))},"$3","gL",6,0,1],
H:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.9-z
return 0.5-z},
G:function(a,b){var z,y
if(a.fr!==C.b)if(a.e.gaf()>0||!1){z=this.b
y=z.e
if(!y.gbS()){y.gdQ()
y=!1}else y=!0
z=y&&z.fr!==C.b}else z=!1
else z=!1
return z},
A:{
wJ:[function(a){return new Y.mT(!0,C.f,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uv",2,0,4]}},mU:{"^":"a:0;",
$1:function(a){a.gk().fx=C.h
return a}},mV:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,B,{"^":"",n8:{"^":"af;M:b<,I:c<,Y:d<,N:e<,J:f<,a",
gX:function(){return"Regain balance."},
gn:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){if(a.cx)a.b2(c,"<subject> regain<s> <object>",$.$get$eh(),!0)
b.W(a.y,new B.n9())
return H.b(a.dx)+" regains balance"},"$3","gL",6,0,1],
a3:function(a,b){return"Will "+a.fx.a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.fr===C.h}},n9:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return C.d}}}],["","",,O,{"^":"",no:{"^":"af;M:b<,I:c<,Y:d<,N:e<,J:f<,a",
gX:function(){return"Scramble."},
gn:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.dx)+" scrambles on ground"},"$3","gL",6,0,1],
a3:function(a,b){return"Will "+a.fx.a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(a.fr!==C.b)return!1
if(A.db(a,b))return!0
return!1}}}],["","",,Q,{"^":"",o6:{"^":"af;M:b<,I:c<,Y:d<,N:e<,J:f<,a",
gX:function(){return"Stand up."},
gn:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){a.a0(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a6(new Q.o7(a,c),new Q.o8(a,c),null,null)
b.W(a.y,new Q.o9())
return H.b(a.dx)+" stands up"},"$3","gL",6,0,1],
a3:function(a,b){return"Will "+a.fx.a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(a.fr!==C.b)return!1
if(A.db(a,b))return!1
return!0}},o7:{"^":"a:2;a,b",
$0:function(){return this.a.a0(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},o8:{"^":"a:2;a,b",
$0:function(){return this.a.a0(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},o9:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return C.d}}}],["","",,T,{"^":"",
xa:[function(a){return new A.a0(T.er(),null,null,new T.uI(),new T.uJ(),new T.uK(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","vM",2,0,4],
xb:[function(a){return new A.a0(T.er(),new T.uL(),T.er(),new T.uM(),new T.uN(),new T.uO(),new T.uP(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.f,"break <object's> neck","will <subject> succeed?",a,null)},"$1","vN",2,0,4],
xc:[function(a,b,c,d,e){a.a8(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.W(a.y,new T.uQ())},"$5","er",10,0,8],
uI:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.e instanceof K.U&&c.e instanceof K.U}},
uJ:{"^":"a:3;",
$3:function(a,b,c){return Y.eJ(a,c)}},
uK:{"^":"a:3;",
$3:function(a,b,c){return S.dG(a,c,C.n)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.e instanceof K.U&&c.e instanceof K.U}},
uN:{"^":"a:3;",
$3:function(a,b,c){return Y.eJ(a,c)}},
uO:{"^":"a:3;",
$3:function(a,b,c){return S.dG(a,c,C.o)}},
uL:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uP:{"^":"a:3;",
$3:function(a,b,c){return S.dG(a,c,C.t)}},
uQ:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,A,{"^":"",a0:{"^":"v;c,d,e,f,r,x,y,z,M:Q<,I:ch<,Y:cx<,n:cy<,N:db<,J:dx<,a2:dy<,a9:fr<,b,a",
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.u(y,x)
C.a.u(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.dx)+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.u(w,y)
C.a.u(w,x)
return H.b(a.dx)+" starts a "+this.cy+" (defensible situation) at "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
G:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xd:[function(a){return new A.a0(M.es(),null,null,new M.uR(),new M.uS(),new M.uT(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","vO",2,0,4],
xe:[function(a){return new A.a0(M.es(),new M.uU(),M.es(),new M.uV(),new M.uW(),new M.uX(),new M.uY(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.f,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","vP",2,0,4],
xf:[function(a,b,c,d,e){if(a.fr===C.b){a.fn(c,"<subject> roll<s>",e.gq())
a.fn(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gq())}a.j4(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gq(),d)},"$5","es",10,0,8],
uR:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(!a.cx){if(!(a.e instanceof K.U)){z=a.go
y=$.$get$bs()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&c.fr!==C.b&&!A.db(a,b)}else z=!1
return z}},
uS:{"^":"a:3;",
$3:function(a,b,c){return F.f9(a,c)}},
uT:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.n)}},
uV:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.e instanceof K.U&&c.fr!==C.b&&!A.db(a,b)}},
uW:{"^":"a:3;",
$3:function(a,b,c){return F.f9(a,c)}},
uX:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.o)}},
uU:{"^":"a:3;",
$3:function(a,b,c){return a.gd0()?0.4:0.2}},
uY:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.t)}}}],["","",,U,{"^":"",
xg:[function(a){return new A.a0(U.et(),null,null,new U.uZ(),new U.v_(),new U.v0(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","vQ",2,0,4],
xh:[function(a){return new A.a0(U.et(),new U.v1(),U.et(),new U.v2(),new U.v3(),new U.v4(),new U.v5(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.f,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vR",2,0,4],
xi:[function(a,b,c,d,e){c.hX(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gq(),!0,d,a)},"$5","et",10,0,8],
uZ:{"^":"a:3;",
$3:function(a,b,c){var z
if(!a.cx){z=a.fr
z=(z===C.d||z===C.h)&&c.fr!==C.b&&a.e instanceof K.U}else z=!1
return z}},
v_:{"^":"a:3;",
$3:function(a,b,c){return Q.fy(a,c)}},
v0:{"^":"a:3;",
$3:function(a,b,c){return Z.dN(a,c,C.n)}},
v2:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.cx){z=a.fr
z=(z===C.d||z===C.h)&&c.fr!==C.b&&a.e instanceof K.U}else z=!1
return z}},
v3:{"^":"a:3;",
$3:function(a,b,c){return Q.fy(a,c)}},
v4:{"^":"a:3;",
$3:function(a,b,c){return Z.dN(a,c,C.o)}},
v1:{"^":"a:3;",
$3:function(a,b,c){return 0.8}},
v5:{"^":"a:3;",
$3:function(a,b,c){return Z.dN(a,c,C.t)}}}],["","",,G,{"^":"",
xj:[function(a){return new A.a0(G.eu(),null,null,new G.v8(),new G.v9(),new G.va(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","vS",2,0,4],
xo:[function(a){return new A.a0(G.eu(),new G.vj(),G.eu(),new G.vk(),new G.vl(),new G.vm(),new G.vn(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.f,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vT",2,0,4],
xp:[function(a,b,c,d,e){return a.d7(c,"<subject> swing<s> {"+U.a9(a)+" |}at <object>",e.gq(),!0,d)},"$5","eu",10,0,8],
v8:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e.gaf()>0}},
v9:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
va:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.n)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e.gaf()>0}},
vl:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.o)}},
vj:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=c.gbA()!=null?0.2:0
y=c.gd0()?0:0.2
return 0.7-z+y}},
vn:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.t)}}}],["","",,R,{"^":"",
xk:[function(a,b,c,d,e){return a.fp(c,"<subject> completely miss<es> <object> with "+U.a9(a),!0,d)},"$5","ii",10,0,12],
xl:[function(a){return new A.a0(R.ij(),new R.vb(),R.ii(),new R.vc(),new R.vd(),new R.ve(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vU",2,0,4],
xm:[function(a){return new A.a0(R.ij(),new R.vf(),R.ii(),new R.vg(),new R.vh(),new R.vi(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","vV",2,0,4],
xn:[function(a,b,c,d,e){return a.d7(c,"<subject> swing<s> {"+U.a9(a)+" |}at <object>",e.gq(),!0,d)},"$5","ij",10,0,8],
vc:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.h&&c.fr!==C.b&&a.e.gaf()>0}},
vd:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.n)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vg:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.h&&c.fr!==C.b&&a.e.gaf()>0}},
vh:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vi:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.o)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gbA()!=null?0.2:0)}}}],["","",,D,{"^":"",
xq:[function(a){return new A.a0(D.ev(),null,null,new D.vo(),new D.vp(),new D.vq(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","vW",2,0,4],
xr:[function(a){return new A.a0(D.ev(),new D.vr(),D.ev(),new D.vs(),new D.vt(),new D.vu(),new D.vv(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.f,"strike down at <object>","will <subject> hit?",a,null)},"$1","vX",2,0,4],
xs:[function(a,b,c,d,e){return a.a8(c,"<subject> strike<s> down {with "+U.a9(a)+" |}at <object>",d)},"$5","ev",10,0,12],
vo:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e.gaf()>0}},
vp:{"^":"a:3;",
$3:function(a,b,c){return D.cV(a,c)}},
vq:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.n)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e.gaf()>0}},
vt:{"^":"a:3;",
$3:function(a,b,c){return D.cV(a,c)}},
vu:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.o)}},
vr:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gf9()?0.2:0
y=c.gbA()!=null?0.2:0
return 0.7-z-y}},
vv:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.t)}}}],["","",,A,{"^":"",
xt:[function(a){return new A.a0(A.ew(),null,null,new A.vw(),new A.vx(),new A.vy(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","vY",2,0,4],
xx:[function(a){return new A.a0(A.ew(),new A.vH(),A.ew(),new A.vI(),new A.vJ(),new A.vK(),new A.vL(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.f,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","vZ",2,0,4],
xy:[function(a,b,c,d,e){return a.d7(c,"<subject> thrust<s> {"+U.a9(a)+" |}at <object>",e.gq(),!0,d)},"$5","ew",10,0,8],
vw:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e instanceof Z.al}},
vx:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vy:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.n)}},
vI:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e instanceof Z.al}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.o)}},
vH:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gbA()!=null?0.2:0)}},
vL:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.t)}}}],["","",,O,{"^":"",
xu:[function(a){return new A.a0(O.ex(),null,null,new O.vz(),new O.vA(),new O.vB(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","w_",2,0,4],
xv:[function(a){return new A.a0(O.ex(),new O.vC(),O.ex(),new O.vD(),new O.vE(),new O.vF(),new O.vG(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.f,"thrust down at <object>","will <subject> hit?",a,null)},"$1","w0",2,0,4],
xw:[function(a,b,c,d,e){return a.a8(c,"<subject> thrust<s> down {with "+U.a9(a)+" |}at <object>",d)},"$5","ex",10,0,12],
vz:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e instanceof Z.al}},
vA:{"^":"a:3;",
$3:function(a,b,c){return D.cV(a,c)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.n)}},
vD:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e instanceof Z.al}},
vE:{"^":"a:3;",
$3:function(a,b,c){return D.cV(a,c)}},
vF:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.o)}},
vC:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gf9()?0.2:0
y=c.gbA()!=null?0.2:0
return 0.7-z-y}},
vG:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.t)}}}],["","",,E,{"^":"",oE:{"^":"c3;Y:c<,b,a",
ga2:function(){return"pick up <object>"},
gM:function(){return"A shield makes a huge difference in battle."},
gI:function(){return!1},
gn:function(){return"TakeDroppedShield"},
gN:function(){return!1},
gJ:function(){return},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.f
z=z.length!==0?C.a.gE(z):null
y=z.e
x=new U.b4(null,null,null,null,null,null,null,null,null)
x.j(z)
new E.oF(this).$1(x)
b.bE(y,x.p())
b.W(a.y,new E.oG(this))
z=this.b
a.a8(c,"<subject> pick<s> <object> up",z)
return H.b(a.dx)+" picks up "+z.gn()},"$3","gL",6,0,1],
a3:function(a,b){return H.e(new P.X(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.bi))return!1
if(a.d!=null)return!1
return!0},
A:{
wN:[function(a){return new E.oE(!0,a,null)},"$1","w5",2,0,27]}},oF:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gac()
y=z.b
if(y==null){y=new S.N(null,null,[U.C])
y.ab()
y.j(C.e)
z.b=y
z=y}else z=y
z=z.gcP();(z&&C.a).a_(z,this.a.b)
return a}},oG:{"^":"a:0;a",
$1:function(a){var z=H.y(this.a.b,"$isbi")
a.gk().e=z}}}],["","",,M,{"^":"",oH:{"^":"c3;Y:c<,b,a",
ga2:function(){return"pick up <object>"},
gM:function(){return"A different weapon might change the battle."},
gI:function(){return!1},
gn:function(){return"TakeDroppedWeapon"},
gN:function(){return!1},
gJ:function(){return},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.f
z=z.length!==0?C.a.gE(z):null
y=z.e
x=new U.b4(null,null,null,null,null,null,null,null,null)
x.j(z)
new M.oI(this).$1(x)
b.bE(y,x.p())
b.W(a.y,new M.oJ(this,a))
z=this.b
a.a8(c,"<subject> pick<s> <object> up",z)
return H.b(a.dx)+" picks up "+z.gn()},"$3","gL",6,0,1],
a3:function(a,b){return H.e(new P.X(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x,w,v
z=this.b
y=J.n(z)
if(!y.$isaM)return!1
if(!!y.$isal)return!1
x=a.e
w=x instanceof Z.al&&!!y.$isaB
if(z.gal()<=x.gal()&&!w)return!1
v=b.bY("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
A:{
wO:[function(a){return new M.oH(!0,a,null)},"$1","w6",2,0,27]}},oI:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gac()
y=z.b
if(y==null){y=new S.N(null,null,[U.C])
y.ab()
y.j(C.e)
z.b=y
z=y}else z=y
z=z.gcP();(z&&C.a).a_(z,this.a.b)
return a}},oJ:{"^":"a:0;a,b",
$1:function(a){var z,y
if(!(this.b.e instanceof K.U)){z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
y=a.gk().f
if(y==null)H.e(P.F("null element"))
z.gb_().u(0,y)}z=H.y(this.a.b,"$isaM")
a.gk().f=z}}}],["","",,D,{"^":"",oQ:{"^":"v;I:c<,Y:d<,M:e<,N:f<,J:r<,b,a",
ga2:function(){return"throw spear at <object>"},
gn:function(){return"ThrowSpear"},
ga9:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y,x
z=this.eD(a)
y=this.b
x="<subject's> "+z.b
a.a8(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+x+" at <object>",y)
x=y.d
if(x!=null)y.j6(c,"<subject> deflects it with <subject's> <object>",!0,x,!0)
else y.e7(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.a0(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bt(b))+"{| nearby| not far from here}")
this.eI(b,a,z)
return H.b(a.dx)+" fails to hit "+H.b(y.dx)+" with spear"},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.eD(a)
y=this.b
x="<subject's> "+z.b
a.a8(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+x+" at <object>",y)
x=y.d
if(x!=null)z.d8(c,"<subject> fl<ies> past <object-owner's> <object>",x,y,a,!0)
x=y.y
b.W(x,new D.oU(z))
w=b.v(x)
v=!(w.x>0)&&w.y!==100
x=[P.l]
if(!v){u=S.bI("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.go
x=H.m([],x)
z.d8(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.ay(!1,u,x,t==null?$.$get$aG():t,!1,C.p),w,a,!0)
N.aZ(c,w)}else{u=S.bI("{chest|eye|neck}")
t=a.go
x=H.m([],x)
z.d8(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.ay(!1,u,x,t==null?$.$get$aG():t,!1,C.p),w,a,!0)
N.bc(c,b,w)}this.eI(b,a,z)
return H.b(a.dx)+" hits "+H.b(y.dx)+" with spear"},"$3","gL",6,0,1],
H:function(a,b){return 0.4-(this.b.d!=null?0.2:0)},
G:function(a,b){var z
if(a.cx)if(a.fr===C.d)z=(C.a.ag(a.e.a,C.v)||a.dT(C.v)>=1)&&J.u(b.a7("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
eD:function(a){var z,y,x
z=a.e
if(z!=null&&!!z.$isal)return z
for(z=a.cy.a,y=new P.ad(z,z.r,null,null,[null]),y.c=z.e;y.B();){x=y.d
if(x instanceof Z.al)return x}throw H.c(new P.t("No spear found in "+H.b(a)))},
eI:function(a,b,c){var z,y,x
z=a.a7("FightSituation")
y=b.e
if(y==null?c==null:y===c){x=b.it()
if(x==null)x=$.$get$d6()
a.W(b.y,new D.oR(x))}else a.W(b.y,new D.oS(c))
a.bE(z.gq(),z.ae(new D.oT(c)))},
A:{
wQ:[function(a){return new D.oQ(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.f,a,null)},"$1","w9",2,0,4]}},oU:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.d
a.gk().y=z-y
return a}},oR:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a
a.gk().f=z
y=a.gk()
x=y.db
if(x==null){x=new L.V(null,null,[U.C])
x.ai()
x.j(C.e)
y.db=x
y=x}else y=x
y.gb_().a_(0,z)
return a}},oS:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}},oT:{"^":"a:0;a",
$1:function(a){a.gbC().u(0,this.a)
return a}}}],["","",,M,{"^":"",p1:{"^":"af;M:b<,N:c<,J:d<,I:e<,Y:f<,a",
gX:function(){return"Regain clarity."},
gn:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){a.a0(c,"<subject> shake<s> <subject's> head violently")
if(a.cx)c.u(0,"the {horrible|terrible} spell seems to recede")
a.j5(c,"<subject's> eyes regain focus and clarity",!0,!0)
b.W(a.y,new M.p2())
return H.b(a.dx)+" regains clarity"},"$3","gL",6,0,1],
a3:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.ch&&b.bY("Confuse",a,!0)>8}},p2:{"^":"a:0;",
$1:function(a){a.gk().cx=!1
return a}}}],["","",,R,{"^":"",l1:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
gn:function(){return"FinishBreakNeck"},
ga2:function(){return""},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
y=z.y
b.W(y,new R.l2())
x=b.v(y)
if(x.y===100){a.b2(c,"<subject> smash<es> <object's> head to the ground",x,!0)
N.aZ(c,x)}else{a.b2(c,"<subject> break<s> <object's> neck",x,!0)
N.bc(c,b,x)}return H.b(a.dx)+" breaks "+H.b(z.dx)+"'s neck on ground"},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
A:{
wq:[function(a){return new R.l1(null,!0,!0,!0,C.f,a,null)},"$1","tA",2,0,4]}},l2:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,Y,{"^":"",
eJ:function(a,b){var z=new Y.dg(null,null,null,null,null)
new Y.rZ(a,b).$1(z)
return z.p()},
eI:{"^":"ac;",
gau:function(){return[R.tA()]},
gn:function(){return"BreakNeckOnGroundSituation"},
an:function(){var z=new Y.dg(null,null,null,null,null)
z.j(this)
new Y.jA().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.v(this.a)
return},
aM:function(a,b){return new H.I(a,new Y.jB(this),[H.j(a,0)])}},
rZ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaP().c=z
a.gaP().e=0
z=this.a.y
a.gaP().b=z
z=this.b.y
a.gaP().d=z
return a}},
jA:{"^":"a:0;",
$1:function(a){var z=a.gaP().e
a.gaP().e=z+1
return a}},
jB:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pk:{"^":"eI;a,q:b<,c,V:d<",
ae:function(a){var z=new Y.dg(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eI))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("BreakNeckOnGroundSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dg:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaP().c},
gV:function(){return this.gaP().e},
gaP:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaP().b
x=this.gaP().c
w=this.gaP().d
v=this.gaP().e
z=new Y.pk(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Z,{"^":"",kK:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"evade"},
gn:function(){return"EvadeNeckBreaking"},
ga9:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {dodge it|break free}")
S.a6(new Z.kL(a,c),new Z.kM(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
a.b2(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.aE("FightSituation")
return H.b(a.dx)+" evades "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.6
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.5)},
G:function(a,b){return!0},
A:{
wp:[function(a){return new Z.kK("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.f,a,null)},"$1","tu",2,0,4]}},kL:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {can't|fail<s>}",!0)}},kM:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dG:function(a,b,c){var z=new S.dF(null,null,null,null,null,null)
new S.rY(a,b,c).$1(z)
return z.p()},
fo:{"^":"c_;",
gau:function(){return[Z.tu()]},
gn:function(){return"OnGroundWrestleDefenseSituation"},
an:function(){var z=new S.dF(null,null,null,null,null,null)
z.j(this)
new S.mz().$1(z)
return z.p()}},
rY:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaC().c=z
a.gaC().f=0
z=this.a.y
a.gaC().b=z
z=this.b.y
a.gaC().e=z
a.gaC().d=this.c
return a}},
mz:{"^":"a:0;",
$1:function(a){var z=a.gaC().f
a.gaC().f=z+1
return a}},
pu:{"^":"fo;cf:a<,q:b<,bV:c<,bX:d<,V:e<",
ae:function(a){var z=new S.dF(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fo))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$S().$1("OnGroundWrestleDefenseSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dF:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaC().c},
gV:function(){return this.gaC().f},
gaC:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaC().b
x=this.gaC().c
w=this.gaC().d
v=this.gaC().e
u=this.gaC().f
z=new S.pu(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,A,{"^":"",
db:function(a,b){var z,y,x,w
z=b.bY("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.bY("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.bY("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.bY("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
bW:function(a){var z="<subject's> "+a.d.b
return z},
a9:function(a){var z=a.e
return z.gaH()?z.gn():"<subject's> "+z.gn()}}],["","",,G,{"^":"",
wZ:[function(a,b,c,d,e){var z
a.a0(c,"<subject> tr<ies> to swing back")
a.e6(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
z=a.fr
if(z===C.d){b.W(a.y,new G.t8())
a.bF(c,"<subject> lose<s> balance because of that",!0,!0)}else if(z===C.h){b.W(a.y,new G.t9())
a.as(c,"<subject> lose<s> balance because of that",!0)
a.bF(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hR",10,0,12],
x_:[function(a){return new A.a0(G.hS(),new G.ta(),G.hR(),new G.tb(),new G.tc(),new G.td(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","ti",2,0,4],
x1:[function(a,b,c,d,e){return a.a8(c,"<subject> swing<s> back",d)},"$5","hS",10,0,8],
x0:[function(a){return new A.a0(G.hS(),new G.te(),G.hR(),new G.tf(),new G.tg(),new G.th(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.f,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tj",2,0,4],
t8:{"^":"a:0;",
$1:function(a){a.gk().fx=C.h
return a}},
t9:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},
tb:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.e.gaf()>0&&a.fr!==C.b}},
tc:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
td:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.n)}},
ta:{"^":"a:3;",
$3:function(a,b,c){return c.gd0()?0.7:0.9}},
tf:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.e.gaf()>0&&a.fr!==C.b}},
tg:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
th:{"^":"a:3;",
$3:function(a,b,c){return L.aK(a,c,C.o)}},
te:{"^":"a:3;",
$3:function(a,b,c){return c.gd0()?0.7:0.9}}}],["","",,V,{"^":"",jT:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"tackle <object>"},
gn:function(){return"CounterTackle"},
ga9:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.a8(c,"<subject> tr<ies> to tackle <object>",z)
S.a6(new V.jU(a,c),new V.jV(this,c),null,null)
a.a8(c,"<subject> land<s> on the "+H.b(U.bt(b))+" next to <object>",z)
b.W(a.y,new V.jW())
return H.b(a.dx)+" fails to tackle "+H.b(z.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
a.a8(c,"<subject> tackle<s> <object> to the ground",z)
b.W(z.y,new V.jX())
b.W(a.y,new V.jY())
return H.b(a.dx)+" tackles "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){var z=this.b.fr===C.h?0.2:0
if(a.cx)return 0.7+z
return 0.5+z},
G:function(a,b){return a.fr!==C.b&&a.e instanceof K.U},
A:{
wi:[function(a){return new V.jT("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.f,a,null)},"$1","tk",2,0,4]}},jU:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> go<es> wide",!0)}},jV:{"^":"a:2;a,b",
$0:function(){return this.a.b.aa(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},jW:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},jX:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},jY:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,S,{"^":"",
bZ:function(a,b){var z=new S.dj(null,null,null,null,null)
new S.rR(a,b).$1(z)
return z.p()},
eP:{"^":"ac;",
gau:function(){return[G.ti(),G.tj(),V.tk()]},
gbv:function(){return[$.$get$dI()]},
gn:function(){return"CounterAttackSituation"},
an:function(){var z=new S.dj(null,null,null,null,null)
z.j(this)
new S.jR().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.v(this.a)
return},
aM:function(a,b){return new H.I(a,new S.jS(this),[H.j(a,0)])}},
rR:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaQ().c=z
a.gaQ().e=0
a.gaQ().b=this.a.y
z=this.b.y
a.gaQ().d=z
return a}},
jR:{"^":"a:0;",
$1:function(a){var z=a.gaQ().e
a.gaQ().e=z+1
return a}},
jS:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pl:{"^":"eP;a,q:b<,c,V:d<",
ae:function(a){var z=new S.dj(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eP))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("CounterAttackSituation")
y=J.x(z)
y.m(z,"counterAttacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dj:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaQ().c},
gV:function(){return this.gaQ().e},
gaQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
z=new S.pl(y,x,w,v)
if(y==null)H.e(P.i("counterAttacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",c_:{"^":"nV;",
gd2:function(){return 1000},
at:function(a,b){if(a===0)return b.v(this.gbX())
return},
aM:function(a,b){return new H.I(a,new O.k_(this),[H.j(a,0)])}},nV:{"^":"ac+mW;"},k_:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.gcf()
if(z==null?x!=null:z!==x){z=a.gq()
y=y.gbX()
y=z==null?y==null:z===y
z=y}else z=!0
return z}}}],["","",,U,{"^":"",
bt:function(a){return a.a7("FightSituation").gbK()},
c2:function(a,b,c,d,e,f){var z=new U.b4(null,null,null,null,null,null,null,null,null)
new U.rg(a,b,c,d,e,f).$1(z)
return z.p()},
cF:{"^":"ac;",
gau:function(){return[N.t5(),V.to(),R.uk(),Y.uv(),T.vM(),T.vN(),M.vO(),M.vP(),U.vQ(),U.vR(),G.vS(),G.vT(),D.vW(),D.vX(),R.vU(),R.vV(),A.vY(),A.vZ(),O.w_(),O.w0(),E.w5(),M.w6(),D.w9()]},
gbv:function(){return H.m([$.$get$fB(),$.$get$fT(),$.$get$fF(),$.$get$hi()],[Q.af])},
gd2:function(){return 1000},
gn:function(){return"FightSituation"},
cg:function(a,b){var z=b.a
return(z&&C.a).b6(z,new U.kP(a))},
an:function(){var z=new U.b4(null,null,null,null,null,null,null,null,null)
z.j(this)
new U.kQ().$1(z)
return z.p()},
at:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=X.hJ(this.f,this.b)
y=H.bC(z,new U.kR(b),H.z(z,"D",0),null)
x=H.z(y,"D",0)
w=P.Q(new H.I(y,new U.kS(),[x]),!1,x)
x=H.j(w,0)
v=P.Q(new H.I(w,new U.kT(),[x]),!1,x)
u=v.length===1?C.a.gbM(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ap)(w),++r){q=w[r]
x=b.d
p=x.aX(0,new U.kU(q),new U.kV())
o=p==null?p:p.gV()
if(o==null)o=-1
n=b.r-o
if(n<=0)continue
m=x.aX(0,new U.kW(q),new U.kX())
l=m==null?m:m.gV()
if(l==null)l=-1
k=(b.r-l+n)/2
if(q.gb1())k*=1.5
if(k>t){s=q
t=k}}return s},
aM:function(a,b){return new H.I(a,new U.kY(this),[H.j(a,0)])},
ff:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ad(z))y.h(0,z).$2(a,b)},
cr:function(a){var z,y,x,w,v,u,t,s
z=this.r
if(z!=null&&!this.cg(a,this.b)&&this.cg(a,this.f)){y=a.ei(z)
z=y.b
x=new F.cP(null,null,null,null,null)
x.j(y)
new U.kZ().$1(x)
a.bE(z,x.p())
for(z=this.f,x=z.a,x=new J.b3(x,x.length,0,null,[H.j(x,0)]),w=a.a;x.B();){v=x.d
u=a.v(v)
if(u.gam()&&u.Q){t=a.v(v)
t.toString
u=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(t==null)H.e(P.i("other"))
u.a=t
new U.l_().$1(u)
s=u.p()
w.a_(0,t)
w.u(0,s)}}C.a.u(a.f,X.m9(z,this.d,this.a,null))}else this.cg(a,this.f)},
cE:function(a){var z=this.f
if(this.cg(a,z))if(this.cg(a,this.b)){z=z.a
z=(z&&C.a).b6(z,new U.l0(a))}else z=!1
else z=!1
return z}},
rg:{"^":"a:0;a,b,c,d,e,f",
$1:function(a){var z,y
z=$.$get$a8().ak(1073741823)
a.gac().f=z
a.gac().y=0
z=a.gac()
y=z.r
if(y==null){y=new S.N(null,null,[P.q])
y.ab()
y.j(C.e)
z.r=y
z=y}else z=y
z.j(J.eB(this.a,new U.qS()))
z=a.gac()
y=z.c
if(y==null){y=new S.N(null,null,[P.q])
y.ab()
y.j(C.e)
z.c=y
z=y}else z=y
y=this.b
z.j(new H.ak(y,new U.qT(),[H.j(y,0),null]))
a.gac().e=this.c
y=new S.N(null,null,[U.C])
y.ab()
y.j(this.f)
a.gac().b=y
y=this.d.b
a.gac().x=y
y=new A.cK(null,null,[P.q,{func:1,v:true,args:[A.a3,Y.a1]}])
y.bR()
y.j(this.e)
a.gac().d=y
return a}},
qS:{"^":"a:0;",
$1:function(a){return a.gq()}},
qT:{"^":"a:0;",
$1:function(a){return a.gq()}},
kP:{"^":"a:0;a",
$1:function(a){var z=this.a.v(a)
return z.gam()&&z.Q}},
kQ:{"^":"a:0;",
$1:function(a){var z=a.gac().y
a.gac().y=z+1
return a}},
kR:{"^":"a:0;a",
$1:function(a){return this.a.v(a)}},
kS:{"^":"a:0;",
$1:function(a){return a.gbn()}},
kT:{"^":"a:0;",
$1:function(a){return a.gb1()}},
kU:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gcs()
y=this.a.gq()
return(z==null?y==null:z===y)&&a.gfF()}},
kV:{"^":"a:2;",
$0:function(){return}},
kW:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gcs()
y=this.a.gq()
return z==null?y==null:z===y}},
kX:{"^":"a:2;",
$0:function(){return}},
kY:{"^":"a:21;a",
$1:function(a){var z,y,x
if(a.gam()&&a.Q){z=this.a
y=a.y
x=z.f.a
if(!(x&&C.a).ag(x,y)){z=z.b.a
y=(z&&C.a).ag(z,y)
z=y}else z=!0}else z=!1
return z}},
kZ:{"^":"a:0;",
$1:function(a){a.gaG().d=!1
return a}},
l_:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}},
l0:{"^":"a:31;a",
$1:function(a){var z=this.a.v(a)
return z.cx&&z.gam()&&z.Q}},
pn:{"^":"cF;bC:a<,b,c,bK:d<,q:e<,f,r,V:x<",
ae:function(a){var z=new U.b4(null,null,null,null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cF))return!1
if(J.u(this.a,b.a))if(J.u(this.b,b.b))if(J.u(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.u(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)),J.f(this.f)),J.f(this.r)),J.f(this.x)))},
i:function(a){var z,y
z=$.$get$S().$1("FightSituation")
y=J.x(z)
y.m(z,"droppedItems",this.a)
y.m(z,"enemyTeamIds",this.b)
y.m(z,"events",this.c)
y.m(z,"groundMaterial",this.d)
y.m(z,"id",this.e)
y.m(z,"playerTeamIds",this.f)
y.m(z,"roomRoamingSituationId",this.r)
y.m(z,"time",this.x)
return y.i(z)}},
b4:{"^":"d;a,b,c,d,e,f,r,x,y",
gbC:function(){var z,y
z=this.gac()
y=z.b
if(y==null){y=new S.N(null,null,[U.C])
y.ab()
y.j(C.e)
z.b=y
z=y}else z=y
return z},
gbK:function(){return this.gac().e},
gq:function(){return this.gac().f},
gV:function(){return this.gac().y},
gac:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ab()
y.j(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ab()
y.j(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cK(null,null,[H.j(z,0),H.j(z,1)])
y.bR()
y.j(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ab()
y.j(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gac()
x=y.b
if(x==null){x=new S.N(null,null,[U.C])
x.ab()
x.j(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gac()
w=x.c
if(w==null){w=new S.N(null,null,[P.q])
w.ab()
w.j(C.e)
x.c=w
x=w}else x=w
x=x.p()
w=this.gac()
v=w.d
if(v==null){v=new A.cK(null,null,[P.q,{func:1,v:true,args:[A.a3,Y.a1]}])
v.bR()
v.j(C.a2)
w.d=v
w=v}else w=v
w=w.p()
v=this.gac().e
u=this.gac().f
t=this.gac()
s=t.r
if(s==null){s=new S.N(null,null,[P.q])
s.ab()
s.j(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.gac().x
r=this.gac().y
z=new U.pn(y,x,w,v,u,t,s,r)
if(y==null)H.e(P.i("droppedItems"))
if(x==null)H.e(P.i("enemyTeamIds"))
if(w==null)H.e(P.i("events"))
if(v==null)H.e(P.i("groundMaterial"))
if(u==null)H.e(P.i("id"))
if(t==null)H.e(P.i("playerTeamIds"))
if(s==null)H.e(P.i("roomRoamingSituationId"))
if(r==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,N,{"^":"",
bc:function(a,b,c){var z,y
z=b.a7("FightSituation")
y=z.gbK()
b.bE(z.gq(),z.ae(new N.ul(c)))
if(c.fr===C.b){c.as(a,"<subject> stop<s> moving",!0)
a.l(0,"\n\n",!0)
return}switch($.$get$hB().ak(3)){case 0:c.bF(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.as(a,"<subject> fall<s> backward",!0)
c.as(a,"<subject> twist<s>",!0)
c.bF(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.as(a,"<subject> drop<s> to <subject's> knees",!0)
c.as(a,"<subject> keel<s> over",!0)
break}a.l(0,"\n\n",!0)},
aZ:function(a,b){if(b.y===100&&b.x===0){N.qZ(a,b)
return}b.as(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
qZ:function(a,b){if(b.fr===C.b){b.as(a,"<subject> stop<s> moving",!0)
a.l(0,"\n\n",!0)
return}b.as(a,"<subject> drop<s> to <subject's> knees",!0)
b.as(a,"<subject> keel<s> over",!0)
a.l(0,"\n\n",!0)},
ul:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
y=z.e
if(!(y instanceof K.U))a.gbC().u(0,y)
z=z.d
if(z!=null)a.gbC().u(0,z)
return a}}}],["","",,R,{"^":"",l3:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
gn:function(){return"FinishLeap"},
ga2:function(){return""},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
y=z.y
b.W(y,new R.l4())
x=b.v(y)
b.W(a.y,new R.l5())
w=b.a7("LeapSituation").gq()
v=U.bt(b)
a.br(c,"<subject> {ram<s>|smash<es>} into <object>",w,z,!0)
c.hU(0,"both "+(a.cx||z.cx?"of you":"")+" {land on|fall to} the "+H.b(v),w)
if(z.x>1){c.hV(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",w,z)
N.aZ(c,x)
b.W(y,new R.l6())}return H.b(a.dx)+" finishes leap at "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
A:{
wr:[function(a){return new R.l3(null,!0,!0,!0,C.f,a,null)},"$1","tB",2,0,4]}},l4:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},l5:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},l6:{"^":"a:0;",
$1:function(a){var z=a.gk().y
a.gk().y=z-1
return a}}}],["","",,S,{"^":"",kb:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"dodge"},
gn:function(){return"DodgeLeap"},
ga9:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.a7("LeapSituation").gq()
a.fo(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.fr===C.h)a.bG(c,"<subject> <is> out of balance",z,!0,!0)
else S.a6(new S.kc(a,c,z),new S.kd(a,c,z),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.a7("LeapSituation").gq()
y=U.bt(b)
x=this.b
a.br(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.as(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.W(x.y,new S.ke())
b.aE("FightSituation")
return H.b(a.dx)+" dodges "+H.b(x.dx)},"$3","gL",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.b?0.2:0
if(a.cx)return 0.78-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.5-z+y)},
G:function(a,b){return a.fr!==C.b},
A:{
wl:[function(a){return new S.kb("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.f,a,null)},"$1","tp",2,0,4]}},kc:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kd:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},ke:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,D,{"^":"",lr:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"impale"},
gn:function(){return"ImpaleLeaper"},
ga9:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.a7("LeapSituation").gq()
y=this.b
a.d7(c,"<subject> tr<ies> to {move|swing|shift} "+U.a9(a)+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.fr===C.h)a.bG(c,"<subject> <is> out of balance",z,!0,!0)
else S.a6(new D.ls(a,c,z),new D.lt(a,c,z),null,null)
b.ao()
return H.b(a.dx)+" fails to impale "+H.b(y.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.a7("LeapSituation").gq()
y=this.b
a.br(c,"<subject> {move<s>|swing<s>|shift<s>} "+U.a9(a)+" between <subjectPronounSelf> and <object>",z,y,!0)
y.as(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.y
b.W(x,new D.lu())
w=b.v(x)
if(!(!(w.x>0)&&w.y!==100)){a.e.a8(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",w)
w.a0(c,"<subject> fall<s> to the ground")
N.aZ(c,w)}else{a.e.a8(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",w)
w.as(c,"<subject> go<es> down",!0)
N.bc(c,b,w)}b.aE("FightSituation")
return H.b(a.dx)+" impales "+H.b(y.dx)},"$3","gL",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.b?0.2:0
if(a.cx)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.4-z+y)},
G:function(a,b){return a.fr!==C.b&&a.e.gaK()>0},
A:{
wx:[function(a){return new D.lr("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.f,a,null)},"$1","uc",2,0,4]}},ls:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lt:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lu:{"^":"a:0;",
$1:function(a){var z=a.gk().y
a.gk().y=z-1
a.gk().fx=C.b
return a}}}],["","",,V,{"^":"",
dw:function(a,b,c){var z=new V.dv(null,null,null,null,null,null)
new V.rW(a,b,c).$1(z)
return z.p()},
f7:{"^":"c_;",
gau:function(){return[S.tp(),D.uc()]},
gn:function(){return"LeapDefenseSituation"},
an:function(){var z=new V.dv(null,null,null,null,null,null)
z.j(this)
new V.lZ().$1(z)
return z.p()}},
rW:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.y
a.gay().b=z
z=this.b.y
a.gay().e=z
a.gay().d=this.c
return a}},
lZ:{"^":"a:0;",
$1:function(a){var z=a.gay().f
a.gay().f=z+1
return a}},
pp:{"^":"f7;cf:a<,q:b<,bV:c<,bX:d<,V:e<",
ae:function(a){var z=new V.dv(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f7))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$S().$1("LeapDefenseSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dv:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gay().c},
gV:function(){return this.gay().f},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
u=this.gay().f
z=new V.pp(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,F,{"^":"",
f9:function(a,b){var z=new F.dx(null,null,null,null,null)
new F.rX(a,b).$1(z)
return z.p()},
f8:{"^":"ac;",
gau:function(){return[R.tB()]},
gn:function(){return"LeapSituation"},
an:function(){var z=new F.dx(null,null,null,null,null)
z.j(this)
new F.m_().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.v(this.a)
return},
aM:function(a,b){return new H.I(a,new F.m0(this),[H.j(a,0)])}},
rX:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaR().c=z
a.gaR().e=0
z=this.a.y
a.gaR().b=z
z=this.b.y
a.gaR().d=z
return a}},
m_:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
a.gaR().e=z+1
return a}},
m0:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pq:{"^":"f8;a,q:b<,c,V:d<",
ae:function(a){var z=new F.dx(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.f8))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("LeapSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dx:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaR().c},
gV:function(){return this.gaR().e},
gaR:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaR().b
x=this.gaR().c
w=this.gaR().d
v=this.gaR().e
z=new F.pq(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Z,{"^":"",ji:{"^":"af;I:b<,Y:c<,N:d<,J:e<,a",
gX:function(){return""},
gM:function(){return},
gn:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.a7("LootSituation")
y=b.v(100)
if(y.Q&&!(y.x>0)){a.a8(c,"<subject> kneel<s> next to <object>",y)
a.a8(c,"<subject> help<s> <object> to <object's> feet",y)
y.ap(c,'"I\'ll live," <subject> say<s>.',!0)
b.W(100,new Z.jv())}x=[]
for(w=z.gbC(),w=w.ga5(w),v=b.a,u=null,t=null;w.B();){s=w.d
r=a.y
q=b.v(r)
p=q.e
o=p instanceof Z.al&&s instanceof G.aB
n=J.n(s)
if(!!n.$isaM){m=s.gaf()
l=s.gaK()
k=s.gaH()?1:0
j=p.gaf()
i=p.gaK()
p=p.gaH()?1:0
p=2+m+l+k>2+j+i+p||o}else p=!1
if(p){h=b.v(r)
h.toString
r=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.i("other"))
r.a=h
new Z.jw(s,q).$1(r)
g=r.p()
v.a_(0,h)
v.u(0,g)
u=s}else if(!!n.$isbi&&q.d==null){h=b.v(r)
h.toString
r=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.i("other"))
r.a=h
new Z.jx(s).$1(r)
g=r.p()
v.a_(0,h)
v.u(0,g)
t=s}else{h=b.v(r)
h.toString
r=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.i("other"))
r.a=h
new Z.jy(s).$1(r)
g=r.p()
v.a_(0,h)
v.u(0,g)
x.push(s)}}if(u!=null){a.a8(c,"<subject> pick<s> up <object>",u)
a.a8(c,"<subject> wield<s> <object>",u)}if(t!=null){a.a8(c,"<subject> pick<s> up <object>",t)
a.a8(c,"<subject> wield<s> <object>",t)}this.ho(x,a,z,b,c)
this.hn(x,a,z,b,c)
if(x.length!==0)c.i0("<subject> <also> take<s>",x,null,a)
return H.b(a.dx)+" auto-loots"},"$3","gL",6,0,1],
a3:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.cx},
ho:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=P.Q(new H.I(a,new Z.jp(),[H.j(a,0)]),!0,L.aM)
for(y=b.cy.a,x=new P.ad(y,y.r,null,null,[null]),x.c=y.e;x.B();){w=x.d
if(w instanceof L.aM)C.a.u(z,w)}if(z.length===0)return
C.a.bN(z,new Z.jq())
y=c.c.a
y.toString
v=new H.ak(y,new Z.jr(d),[H.j(y,0),null]).cG(0,new Z.js())
for(y=J.ar(v.a),x=new H.bN(y,v.b,[H.j(v,0)]),u=d.a;x.B();){t=y.gU()
if(z.length===0)break
s=C.a.fm(z)
r=d.v(t.gq())
r.toString
q=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.jt(s).$1(q)
p=q.p()
u.a_(0,r)
u.u(0,p)
C.a.a_(a,s)
r=d.v(b.y)
r.toString
q=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.ju(s).$1(q)
p=q.p()
u.a_(0,r)
u.u(0,p)
e.dK(0,"<subject> give<s> the "+H.b(s.gn())+" to <object>",null,!1,!1,!1,!1,t,null,null,!1,b,!1,!1)}},
hn:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=P.Q(new H.I(a,new Z.jj(),[H.j(a,0)]),!0,E.bi)
for(y=b.cy.a,x=new P.ad(y,y.r,null,null,[null]),x.c=y.e;x.B();){w=x.d
if(w instanceof E.bi)C.a.u(z,w)}if(z.length===0)return
C.a.bN(z,new Z.jk())
y=c.c.a
y.toString
v=new H.ak(y,new Z.jl(d),[H.j(y,0),null]).cG(0,new Z.jm())
for(y=J.ar(v.a),x=new H.bN(y,v.b,[H.j(v,0)]),u=d.a;x.B();){t=y.gU()
if(z.length===0)break
s=C.a.fm(z)
r=d.v(t.gq())
r.toString
q=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.jn(s).$1(q)
p=q.p()
u.a_(0,r)
u.u(0,p)
C.a.a_(a,s)
r=d.v(b.y)
r.toString
q=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.jo(s).$1(q)
p=q.p()
u.a_(0,r)
u.u(0,p)
e.dK(0,"<subject> give<s> the "+H.b(s.gn())+" to <object>",null,!1,!1,!1,!1,t,null,null,!1,b,!1,!1)}}},jv:{"^":"a:0;",
$1:function(a){a.gk().fx=C.h
a.gk().y=1
return a}},jw:{"^":"a:0;a,b",
$1:function(a){var z,y,x
z=this.b.e
if(!(z instanceof K.U)){y=a.gk()
x=y.db
if(x==null){x=new L.V(null,null,[U.C])
x.ai()
x.j(C.e)
y.db=x
y=x}else y=x
if(z==null)H.e(P.F("null element"))
y.gb_().u(0,z)}a.gk().f=this.a}},jx:{"^":"a:0;a",
$1:function(a){var z=this.a
a.gk().e=z
return z}},jy:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
y=this.a
if(y==null)H.e(P.F("null element"))
z.gb_().u(0,y)
return a}},jp:{"^":"a:0;",
$1:function(a){return a instanceof L.aM}},jq:{"^":"a:5;",
$2:function(a,b){return J.bx(a.gal(),b.gal())}},jr:{"^":"a:0;a",
$1:function(a){return this.a.v(a)}},js:{"^":"a:0;",
$1:function(a){return a.gbn()&&a.gf6()}},jt:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},ju:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}},jj:{"^":"a:0;",
$1:function(a){return a instanceof E.bi}},jk:{"^":"a:5;",
$2:function(a,b){return J.bx(a.gal(),b.gal())}},jl:{"^":"a:0;a",
$1:function(a){return this.a.v(a)}},jm:{"^":"a:0;",
$1:function(a){return a.gbn()&&a.gbA()==null}},jn:{"^":"a:0;a",
$1:function(a){a.gk().e=this.a
return a}},jo:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}}}],["","",,X,{"^":"",
m9:function(a,b,c,d){var z=new X.dA(null,null,null,null,null,null)
new X.ri(a,b,c).$1(z)
return z.p()},
fg:{"^":"ac;",
gbv:function(){return H.m([$.$get$eF()],[Q.af])},
gn:function(){return"LootSituation"},
an:function(){var z=new X.dA(null,null,null,null,null,null)
z.j(this)
new X.mb().$1(z)
return z.p()},
at:function(a,b){if(a>0)return
return this.eE(b.a)},
aM:function(a,b){return[this.eE(a)]},
cE:function(a){return!0},
eE:function(a){return a.cX(0,new X.ma())}},
ri:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaq().e=z
a.gaq().f=0
a.gaq().c=this.b
z=new S.N(null,null,[P.q])
z.ab()
z.j(this.a)
a.gaq().d=z
z=new S.N(null,null,[U.C])
z.ab()
z.j(this.c)
a.gaq().b=z
return a}},
mb:{"^":"a:0;",
$1:function(a){var z=a.gaq().f
a.gaq().f=z+1
return a}},
ma:{"^":"a:0;",
$1:function(a){return a.gb1()&&a.gbn()}},
pr:{"^":"fg;bC:a<,bK:b<,c,q:d<,V:e<",
ae:function(a){var z=new X.dA(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fg))return!1
if(J.u(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.u(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$S().$1("LootSituation")
y=J.x(z)
y.m(z,"droppedItems",this.a)
y.m(z,"groundMaterial",this.b)
y.m(z,"playerTeamIds",this.c)
y.m(z,"id",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dA:{"^":"d;a,b,c,d,e,f",
gbC:function(){var z,y
z=this.gaq()
y=z.b
if(y==null){y=new S.N(null,null,[U.C])
y.ab()
y.j(C.e)
z.b=y
z=y}else z=y
return z},
gbK:function(){return this.gaq().c},
gq:function(){return this.gaq().e},
gV:function(){return this.gaq().f},
gaq:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ab()
y.j(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ab()
y.j(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaq()
x=y.b
if(x==null){x=new S.N(null,null,[U.C])
x.ab()
x.j(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gaq().c
w=this.gaq()
v=w.d
if(v==null){v=new S.N(null,null,[P.q])
v.ab()
v.j(C.e)
w.d=v
w=v}else w=v
w=w.p()
v=this.gaq().e
u=this.gaq().f
z=new X.pr(y,x,w,v,u)
if(y==null)H.e(P.i("droppedItems"))
if(x==null)H.e(P.i("groundMaterial"))
if(w==null)H.e(P.i("playerTeamIds"))
if(v==null)H.e(P.i("id"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,A,{"^":"",mp:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"stab <object>"},
gn:function(){return"OffBalanceOpportunityThrust"},
ga9:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.a8(c,"<subject> tr<ies> to stab <object>",z)
a.aa(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.dx)+" fails to stab "+H.b(z.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
y=z.y
b.W(y,new A.mq(a))
x=b.v(y)
if(!(!(x.x>0)&&x.y!==100)){a.b2(c,"<subject> thrust<s> {|"+U.a9(a)+"} deep into <object's> {shoulder|hip|thigh}",x,!0)
N.aZ(c,x)}else{a.b2(c,"<subject> {stab<s>|run<s> "+U.a9(a)+" through} <object>",x,!0)
N.bc(c,b,x)}return H.b(a.dx)+" stabs "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){if(a.cx)return 0.6
return 0.5},
G:function(a,b){return a.fr===C.d&&this.b.fr===C.h&&a.e.gaK()>0},
A:{
wC:[function(a){return new A.mp("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.f,a,null)},"$1","up",2,0,4]}},mq:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaK()
a.gk().y=z-y
return a}}}],["","",,U,{"^":"",
ml:function(a,b){var z=new U.dD(null,null,null,null,null)
new U.t_(a,b).$1(z)
return z.p()},
fm:{"^":"ac;",
gau:function(){return H.m([A.up()],[{func:1,ret:Q.v,args:[R.w]}])},
gbv:function(){return[$.$get$dI()]},
gn:function(){return"OffBalanceOpportunitySituation"},
an:function(){var z=new U.dD(null,null,null,null,null)
z.j(this)
new U.mm().$1(z)
return z.p()},
at:function(a,b){var z,y,x,w,v
if(a>0)return
z=b.v(this.a)
y=b.a
x=H.j(y,0)
w=P.Q(new H.I(y,new U.mn(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gdY(w)
if(v.fr===C.d&&z.fr===C.h&&v.e.gaK()>0)return v
return},
aM:function(a,b){return new H.I(a,new U.mo(b,b.v(this.a)),[H.j(a,0)])}},
t_:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaS().d=z
a.gaS().e=0
z=this.a.y
a.gaS().b=z
z=this.b
z=z==null?z:z.y
a.gaS().c=z
return a}},
mm:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
a.gaS().e=z+1
return a}},
mn:{"^":"a:21;a,b,c",
$1:function(a){var z,y
if(a.gam()&&a.Q)if(a.cY(this.c,this.b)>0){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mo:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.u(a,z)||a.iz(z,this.a)}},
ps:{"^":"fm;a,b,q:c<,V:d<",
ae:function(a){var z=new U.dD(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fm))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("OffBalanceOpportunitySituation")
y=J.x(z)
y.m(z,"actorId",this.a)
y.m(z,"culpritId",this.b)
y.m(z,"id",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dD:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaS().d},
gV:function(){return this.gaS().e},
gaS:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaS().b
x=this.gaS().c
w=this.gaS().d
v=this.gaS().e
z=new U.ps(y,x,w,v)
if(y==null)H.e(P.i("actorId"))
if(w==null)H.e(P.i("id"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",l7:{"^":"v;M:c<,I:d<,Y:e<,N:f<,b,a",
ga2:function(){return""},
gn:function(){return"FinishPunch"},
gJ:function(){return},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.fr===C.d?C.h:C.b
x=b.a7("PunchSituation").gq()
w=U.bt(b)
b.W(z.y,new O.l8(y))
switch(y){case C.d:throw H.c(new P.t("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.eV(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.as(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.b:c.eV(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.dx)+" punches "+H.b(z.dx)+" to "+y.i(0)},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
A:{
ws:[function(a){return new O.l7(null,!0,!0,!1,a,null)},"$1","tC",2,0,4]}},l8:{"^":"a:0;a",
$1:function(a){a.gk().fx=this.a
return a}}}],["","",,E,{"^":"",kf:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"dodge"},
gn:function(){return"DodgePunch"},
ga9:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.a7("PunchSituation").gq()
a.fo(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a6(new E.kg(a,c,z),new E.kh(this,a,c,z),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
a.br(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.a7("PunchSituation").gq(),z,!0)
b.aE("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bZ(a,z))
return H.b(a.dx)+" dodges punch from "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gaJ().aI(0.4-z)},
G:function(a,b){return!0},
A:{
wm:[function(a){return new E.kf("Dodging means moving your body out of harm's way.",!1,!1,!0,C.f,a,null)},"$1","tq",2,0,4]}},kg:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kh:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.j9(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dN:function(a,b,c){var z=new Z.dM(null,null,null,null,null,null)
new Z.rT(a,b,c).$1(z)
return z.p()},
fw:{"^":"c_;",
gau:function(){return[E.tq()]},
gn:function(){return"PunchDefenseSituation"},
an:function(){var z=new Z.dM(null,null,null,null,null,null)
z.j(this)
new Z.mZ().$1(z)
return z.p()}},
rT:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.y
a.gaA().b=z
z=this.b.y
a.gaA().e=z
a.gaA().d=this.c
return a}},
mZ:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
a.gaA().f=z+1
return a}},
pv:{"^":"fw;cf:a<,q:b<,bV:c<,bX:d<,V:e<",
ae:function(a){var z=new Z.dM(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fw))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$S().$1("PunchDefenseSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dM:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaA().c},
gV:function(){return this.gaA().f},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
u=this.gaA().f
z=new Z.pv(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Q,{"^":"",
fy:function(a,b){var z=new Q.dO(null,null,null,null,null)
new Q.rU(a,b).$1(z)
return z.p()},
fx:{"^":"ac;",
gau:function(){return[O.tC()]},
gn:function(){return"PunchSituation"},
an:function(){var z=new Q.dO(null,null,null,null,null)
z.j(this)
new Q.n_().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.v(this.a)
return},
aM:function(a,b){return new H.I(a,new Q.n0(this),[H.j(a,0)])}},
rU:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.y
a.gaT().b=z
z=this.b.y
a.gaT().d=z
return a}},
n_:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
a.gaT().e=z+1
return a}},
n0:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pw:{"^":"fx;a,q:b<,c,V:d<",
ae:function(a){var z=new Q.dO(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fx))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("PunchSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dO:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaT().c},
gV:function(){return this.gaT().e},
gaT:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaT().b
x=this.gaT().c
w=this.gaT().d
v=this.gaT().e
z=new Q.pw(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",l9:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return""},
gn:function(){return"FinishSlash"},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
y=z.y
b.W(y,new O.lc(a))
x=b.v(y)
w=b.a7("SlashSituation").gq()
v=!(x.x>0)&&x.y!==100
if(!v){a.br(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",w,x,!0)
N.aZ(c,x)}else{a.br(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",w,x,!0)
y=a.e
if(y.gn()===$.$get$co().b&&J.bX(z.dx,"orc"))y.ap(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bc(c,b,x)}y=H.b(a.dx)+" slashes"
return y+(v?" (and kills)":"")+" "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.e.gaf()>0},
A:{
wu:[function(a){return new O.l9(null,!0,!0,!0,C.f,a,null)},"$1","tD",2,0,4]}},lc:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaf()
a.gk().y=z-y
return a}}}],["","",,V,{"^":"",ld:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return""},
gn:function(){return"FinishThrustSpear"},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
y=z.y
b.W(y,new V.lg(a))
x=b.v(y)
w=b.a7("SlashSituation").gq()
v=!(x.x>0)&&x.y!==100
if(!v){a.br(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",w,x,!0)
N.aZ(c,x)}else{a.br(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",w,x,!0)
N.bc(c,b,x)}y=H.b(a.dx)+" pierces"
return y+(v?" (and kills)":"")+" "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.e instanceof Z.al},
A:{
ww:[function(a){return new V.ld(null,!0,!0,!0,C.f,a,null)},"$1","tF",2,0,4]}},lg:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaK()
a.gk().y=z-y
return a}}}],["","",,X,{"^":"",k0:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"step back and parry"},
gn:function(){return"DefensiveParrySlash"},
ga9:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+U.a9(a)+"|fend it off}")
if(a.fr===C.h)a.aa(c,"<subject> <is> out of balance",!0)
else S.a6(new X.k1(a,c),new X.k2(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z=a.cx
if(z)a.a0(c,"<subject> {step<s>|take<s> a step} back")
a.aZ(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+U.a9(a)+"|fend<s> it off}",!0)
if(a.fr!==C.d){b.W(a.y,new X.k3())
if(z)a.a0(c,"<subject> regain<s> balance")}b.aE("FightSituation")
return H.b(a.dx)+" steps back and parries "+H.b(this.b.dx)},"$3","gL",6,0,1],
H:function(a,b){var z,y
if(a.cx)return 0.98
z=b.f
z=z.length!==0?C.a.gE(z):null
y=a.fr===C.d?0:0.2
return z.gaJ().aI(0.5-y)},
G:function(a,b){return a.e.gbS()},
A:{
wj:[function(a){return new X.k0("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.f,a,null)},"$1","tl",2,0,4]}},k1:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},k2:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},k3:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}}}],["","",,F,{"^":"",ki:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
gn:function(){return"DodgeSlash"},
ga2:function(){return"dodge and counter"},
ga9:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.fr===C.h)a.aa(c,"<subject> <is> out of balance",!0)
else S.a6(new F.kj(a,c),new F.kk(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
a.b2(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.fr===C.d){z.bF(c,"<subject> lose<s> balance because of that",!0,!0)
b.W(z.y,new F.kl())}b.aE("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bZ(a,z))
return H.b(a.dx)+" dodges "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gaJ().aI(0.4-z)},
G:function(a,b){return a.fr!==C.b&&this.b.e.gaf()>0},
A:{
wn:[function(a){return new F.ki("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.f,a,null)},"$1","tr",2,0,4]}},kj:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kk:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kl:{"^":"a:0;",
$1:function(a){a.gk().fx=C.h
return C.h}}}],["","",,M,{"^":"",km:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"dodge and counter"},
gn:function(){return"DodgeThrustSpear"},
ga9:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.fr===C.h)a.aa(c,"<subject> <is> out of balance",!0)
else S.a6(new M.kn(a,c),new M.ko(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)+"'s spear"},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
a.b2(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.fr===C.d){z.bF(c,"<subject> lose<s> balance because of that",!0,!0)
b.W(z.y,new M.kp())}b.aE("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bZ(a,z))
return H.b(a.dx)+" dodges "+H.b(z.dx)+"'s spear"},"$3","gL",6,0,1],
H:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gaJ().aI(0.4-z)},
G:function(a,b){return a.fr!==C.b&&this.b.e instanceof Z.al},
A:{
wo:[function(a){return new M.km("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.f,a,null)},"$1","ts",2,0,4]}},kn:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},ko:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kp:{"^":"a:0;",
$1:function(a){a.gk().fx=C.h
return C.h}}}],["","",,O,{"^":"",lR:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"jump back"},
gn:function(){return"JumpBackFromSlash"},
ga9:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.ap(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.ao()
return H.b(a.dx)+" fails to jump back from "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z
a.aZ(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bw(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.e)
b.aE("FightSituation")
return H.b(a.dx)+" jumps back from "+H.b(z.dx)+"'s attack"},"$3","gL",6,0,1],
H:function(a,b){var z,y
if(a.cx)return 0.98
z=b.f
z=z.length!==0?C.a.gE(z):null
y=a.fr===C.d?0:0.2
return z.gaJ().aI(0.5-y)},
G:function(a,b){return a.e instanceof K.U&&this.b.e.gaf()>0},
A:{
wA:[function(a){return new O.lR("Jump back and the weapon can't reach you.",!1,!1,!0,C.f,a,null)},"$1","uj",2,0,4]}}}],["","",,G,{"^":"",mC:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
gn:function(){return"ParrySlash"},
ga2:function(){return"parry and counter"},
ga9:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+U.a9(a)+"|fend it off}")
if(a.fr===C.h)a.aa(c,"<subject> <is> out of balance",!0)
else S.a6(new G.mD(a,c),new G.mE(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.fr===C.h){c.dM(0,"<subject> <is> out of balance",!0,!0,z)
c.bw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ip())
a.aZ(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+U.a9(a)+"|fend<s> it off easily}",!0)}else a.aZ(c,"<subject> {parr<ies> it|meet<s> it with "+U.a9(a)+"|fend<s> it off}",!0)
b.aE("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bZ(a,z))
return H.b(a.dx)+" parries "+H.b(z.dx)},"$3","gL",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.h?0.3:0
if(a.cx)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.3-z+y)},
G:function(a,b){return a.e.gbS()},
A:{
wF:[function(a){return new G.mC("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.f,a,null)},"$1","us",2,0,4]}},mD:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mE:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",nR:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"block with shield and counter"},
gn:function(){return"ShieldBlockSlash"},
ga9:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a))
if(a.fr===C.h)a.aa(c,"<subject> <is> out of balance",!0)
else S.a6(new E.nS(a,c),new E.nT(a,c),new E.nU(this,a,c),null)
b.ao()
return H.b(a.dx)+" fails to block "+H.b(this.b.dx)+" with shield"},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.fr===C.h){c.dM(0,"<subject> <is> out of balance",!0,!0,z)
c.bw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$io())
a.aZ(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)}else a.aZ(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)
b.aE("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bZ(a,z))
return H.b(a.dx)+" blocks "+H.b(z.dx)+" with a shield"},"$3","gL",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.h?0.2:0
if(a.cx)return 0.78-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.5-z+y)},
G:function(a,b){return a.d!=null},
A:{
wL:[function(a){return new E.nR("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.f,a,null)},"$1","uH",2,0,4]}},nS:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},nT:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> <is> too slow",!0)}},nU:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aK:function(a,b,c){var z=new L.dT(null,null,null,null,null,null)
new L.rQ(a,b,c).$1(z)
return z.p()},
fJ:{"^":"c_;",
gau:function(){return[X.tl(),F.tr(),M.ts(),O.uj(),G.us(),E.uH()]},
gn:function(){return"SlashDefenseSituation"},
an:function(){var z=new L.dT(null,null,null,null,null,null)
z.j(this)
new L.nW().$1(z)
return z.p()}},
rQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.y
a.gaB().b=z
z=this.b.y
a.gaB().e=z
a.gaB().d=this.c
return a}},
nW:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
a.gaB().f=z+1
return a}},
py:{"^":"fJ;cf:a<,q:b<,bV:c<,bX:d<,V:e<",
ae:function(a){var z=new L.dT(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fJ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$S().$1("SlashDefenseSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dT:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaB().c},
gV:function(){return this.gaB().f},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
u=this.gaB().f
z=new L.py(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,M,{"^":"",
b8:function(a,b){var z=new M.dU(null,null,null,null,null)
new M.rS(a,b).$1(z)
return z.p()},
fK:{"^":"ac;",
gau:function(){return[O.tD(),V.tF()]},
gn:function(){return"SlashSituation"},
an:function(){var z=new M.dU(null,null,null,null,null)
z.j(this)
new M.nX().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.v(this.a)
return},
aM:function(a,b){return new H.I(a,new M.nY(this),[H.j(a,0)])}},
rS:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.y
a.gaU().b=z
z=this.b.y
a.gaU().d=z
return a}},
nX:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
a.gaU().e=z+1
return a}},
nY:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pz:{"^":"fK;a,q:b<,c,V:d<",
ae:function(a){var z=new M.dU(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fK))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("SlashSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dU:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaU().c},
gV:function(){return this.gaU().e},
gaU:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaU().b
x=this.gaU().c
w=this.gaU().d
v=this.gaU().e
z=new M.pz(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Q,{"^":"",la:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
gn:function(){return"FinishSlashGroundedEnemy"},
ga2:function(){return""},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.W(y,new Q.lb())
x=b.v(y)
w=x.y===100
c.dL(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(w?"side":"{throat|neck|side}"),x,a.e)
if(w)N.aZ(c,x)
else N.bc(c,b,x)
return H.b(a.dx)+" slains "+H.b(z.dx)+" on the ground"},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.fr===C.b&&a.e.gaf()>0},
A:{
wt:[function(a){return new Q.la(null,!0,!0,!0,C.f,a,null)},"$1","tE",2,0,4]}},lb:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,V,{"^":"",le:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return""},
gn:function(){return"FinishThrustSpearAtGroundedEnemy"},
ga9:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.W(y,new V.lf())
x=b.v(y)
w=x.y===100
c.dL(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(w?"side":"{throat|neck|heart}"),x,a.e)
if(w)N.aZ(c,x)
else N.bc(c,b,x)
return H.b(a.dx)+" slains "+H.b(z.dx)+" on the ground with a spear"},"$3","gL",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.fr===C.b&&a.e instanceof Z.al},
A:{
wv:[function(a){return new V.le(null,!0,!0,!0,C.f,a,null)},"$1","tG",2,0,4]}},lf:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,K,{"^":"",ms:{"^":"v;I:c<,Y:d<,N:e<,J:f<,M:r<,b,a",
gn:function(){return"OnGroundParry"},
ga2:function(){return"parry it"},
ga9:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+U.a9(a)+"}}")
S.a6(new K.mt(a,c),new K.mu(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gK",6,0,1],
R:[function(a,b,c){a.aZ(c,"<subject> {parr<ies> it|stop<s> it with "+U.a9(a)+"}",!0)
b.aE("FightSituation")
return H.b(a.dx)+" parries "+H.b(this.b.dx)},"$3","gL",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.6
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.3)},
G:function(a,b){return this.b.e.gaf()>0&&a.e.gbS()},
A:{
wD:[function(a){return new K.ms(!1,!1,!0,C.f,"Why would you move? Just put your weapon up.",a,null)},"$1","uq",2,0,4]}},mt:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mu:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mv:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
ga2:function(){return"block with shield"},
gn:function(){return"OnGroundShieldBlock"},
ga9:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a))
S.a6(new L.mw(a,c),new L.mx(a,c),new L.my(this,a,c),null)
b.ao()
return H.b(a.dx)+" fails to block "+H.b(this.b.dx)+" with shield on ground"},"$3","gK",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.fr===C.h){c.dM(0,"<subject> <is> out of balance",!0,!0,z)
c.bw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$im())
a.aZ(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)}else a.aZ(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)
b.aE("FightSituation")
return H.b(a.dx)+" blocks "+H.b(z.dx)+" with a shield on ground"},"$3","gL",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.8
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.5)},
G:function(a,b){return a.d!=null},
A:{
wE:[function(a){return new L.mv("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.f,a,null)},"$1","ur",2,0,4]}},mw:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mx:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> <is> too slow",!0)}},my:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bq(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nb:{"^":"v;M:c<,I:d<,Y:e<,N:f<,J:r<,b,a",
gn:function(){return"RollOutOfWay"},
ga2:function(){return"roll out of way"},
ga9:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a0(c,"<subject> tr<ies> to roll out of the way")
a.aa(c,"<subject> can't",!0)
b.ao()
return H.b(a.dx)+" fails to roll out of the way"},"$3","gK",6,0,1],
R:[function(a,b,c){a.e7(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.cx){b.W(a.y,new Y.nc())
a.aZ(c,"<subject> jump<s> up on <subject's> feet",!0)}b.aE("FightSituation")
return H.b(a.dx)+" rolls out of the way of "+H.b(this.b.dx)+"'s strike"},"$3","gL",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.98
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.5)},
G:function(a,b){return!0},
A:{
wK:[function(a){return new Y.nb(null,!1,!1,!0,C.f,a,null)},"$1","uA",2,0,4]}},nc:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}}}],["","",,V,{"^":"",
bD:function(a,b,c){var z=new V.dE(null,null,null,null,null,null)
new V.rO(a,b,c).$1(z)
return z.p()},
fn:{"^":"c_;",
gau:function(){return[K.uq(),L.ur(),Y.uA()]},
gn:function(){return"OnGroundDefenseSituation"},
an:function(){var z=new V.dE(null,null,null,null,null,null)
z.j(this)
new V.mr().$1(z)
return z.p()}},
rO:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaz().c=z
a.gaz().f=0
z=this.a.y
a.gaz().b=z
z=this.b.y
a.gaz().e=z
a.gaz().d=this.c
return a}},
mr:{"^":"a:0;",
$1:function(a){var z=a.gaz().f
a.gaz().f=z+1
return a}},
pt:{"^":"fn;cf:a<,q:b<,bV:c<,bX:d<,V:e<",
ae:function(a){var z=new V.dE(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fn))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$S().$1("OnGroundDefenseSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dE:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaz().c},
gV:function(){return this.gaz().f},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
u=this.gaz().f
z=new V.pt(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,D,{"^":"",
cV:function(a,b){var z=new D.dV(null,null,null,null,null)
new D.rP(a,b).$1(z)
return z.p()},
fV:{"^":"ac;",
gau:function(){return[Q.tE(),V.tG()]},
gn:function(){return"StrikeDownSituation"},
an:function(){var z=new D.dV(null,null,null,null,null)
z.j(this)
new D.oz().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.v(this.a)
return},
aM:function(a,b){return new H.I(a,new D.oA(this),[H.j(a,0)])}},
rP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaV().c=z
a.gaV().e=0
z=this.a.y
a.gaV().b=z
z=this.b.y
a.gaV().d=z
return a}},
oz:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
a.gaV().e=z+1
return a}},
oA:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pA:{"^":"fV;a,q:b<,c,V:d<",
ae:function(a){var z=new D.dV(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fV))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("StrikeDownSituation")
y=J.x(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"targetOnGround",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dV:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaV().c},
gV:function(){return this.gaV().e},
gaV:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaV().b
x=this.gaV().c
w=this.gaV().d
v=this.gaV().e
z=new D.pA(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("targetOnGround"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",mW:{"^":"d;",
gaJ:function(){switch(this.gbV()){case C.n:return C.a3
case C.o:return $.$get$fr()
case C.t:return $.$get$fs()
default:throw H.c(P.F(this.gbV()))}},
$isac:1}}],["","",,K,{"^":"",dL:{"^":"d;a,b",
i:function(a){return this.b}}}],["","",,D,{"^":"",o1:{"^":"af;I:b<,N:c<,Y:d<,J:e<,a",
gX:function(){return""},
gM:function(){return},
gn:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dh(y.a)
w=b.a
C.a.u(z,x.e.$3(b,y,new H.I(w,new D.o2(a,x),[H.j(w,0)])))
return H.b(a.dx)+" initiated combat with monsters in "+J.J(x)},"$3","gL",6,0,1],
a3:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.y(z.length!==0?C.a.gE(z):null,"$isG").c}},o2:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gbn()){z=a.gbs()
y=this.a.go
z=z.a
y=y.a
z=(z==null?y==null:z===y)&&a.gic()===this.b.b}else z=!1
return z}}}],["","",,Y,{"^":"",oK:{"^":"c1;I:c<,Y:d<,N:e<,J:f<,b,a",
gM:function(){return},
gn:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
y=z.c
if(C.c.dd(y)!=="N/A")c.l(0,y,!0)
y=b.f
y=H.y(y.length!==0?C.a.gE(y):null,"$isG")
z=z.a
y.iQ(b,a,z,c)
return H.b(a.dx)+" went through exit to "+z},"$3","gL",6,0,1],
a3:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").c)return!1
this.b.d
return!0},
A:{
wP:[function(a){return new Y.oK(!1,!0,!1,null,a,null)},"$1","w7",2,0,50]}}}],["","",,F,{"^":"",
fC:function(a,b){var z=new F.cP(null,null,null,null,null)
new F.rF(a,b).$1(z)
return z.p()},
G:{"^":"ac;",
gau:function(){return[Y.w7()]},
gbv:function(){var z=[]
C.a.av(z,$.$get$hH())
z.push($.$get$fN())
return z},
gd2:function(){return 1000},
gn:function(){return"RoomRoamingSituation"},
an:function(){var z=new F.cP(null,null,null,null,null)
z.j(this)
new F.nd().$1(z)
return z.p()},
at:function(a,b){return b.a.aX(0,new F.ne(),new F.nf())},
aM:function(a,b){var z=this.at(null,b)
if(z==null)return[]
return[z]},
bf:function(a,b,c){return a.fM("TakeExitAction",b,!0).b6(0,new F.ng(c))},
bD:function(a,b,c,d,e){var z,y,x,w,v,u,t,s
z=a.dh(c)
a.bE(this.b,F.fC(z,!this.bf(a,b,c)&&z.e!=null))
if(!e)if(this.bf(a,b,z.b))z.d.$3(b,a,d)
else{d.l(0,"\n\n",!0)
z.c.$3(b,a,d)
d.l(0,"\n\n",!0)}for(y=R.i1(b,a),y=P.Q(y,!0,H.z(y,"D",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ap)(y),++v){u=a.v(y[v].gq())
u.toString
t=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(u==null)H.e(P.i("other"))
t.a=u
new F.nh(z).$1(t)
s=t.p()
w.a_(0,u)
w.u(0,s)}},
iQ:function(a,b,c,d){return this.bD(a,b,c,d,!1)},
fe:function(a,b){a.a.hu(new F.ni(),!0)},
cE:function(a){if(this.a===$.$get$ej().b)return!1
return!0}},
rF:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gaG().c=z
a.gaG().e=0
z=this.a.b
a.gaG().b=z
a.gaG().d=this.b
return a}},
nd:{"^":"a:0;",
$1:function(a){var z=a.gaG().e
a.gaG().e=z+1
return a}},
ne:{"^":"a:0;",
$1:function(a){return a.gb1()&&a.gbn()}},
nf:{"^":"a:2;",
$0:function(){return}},
ng:{"^":"a:0;a",
$1:function(a){return a.gdU()===this.a}},
nh:{"^":"a:0;a",
$1:function(a){var z=this.a.b
a.gk().d=z
return a}},
ni:{"^":"a:0;",
$1:function(a){return!a.gam()}},
px:{"^":"G;a,q:b<,c,V:d<",
ae:function(a){var z=new F.cP(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.G))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$S().$1("RoomRoamingSituation")
y=J.x(z)
y.m(z,"currentRoomName",this.a)
y.m(z,"id",this.b)
y.m(z,"monstersAlive",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
cP:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaG().c},
gV:function(){return this.gaG().e},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
z=new F.px(y,x,w,v)
if(y==null)H.e(P.i("currentRoomName"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("monstersAlive"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",
tm:function(a,b){var z,y,x,w,v,u,t,s,r,q
b.l(0,"<p class='meta'>",!0)
b.l(0,"Thanks for playing _Insignificant Little Vermin._",!0)
z=a.bd("take_orcthorn")
y=a.bd("smelter_throw_spear")
x=a.v(1)
x.a0(b,"<subject> "+(z?"took":"didn't find")+" Orcthorn")
x.aa(b,"<subject> "+(y?"destroyed":"didn't destroy")+" the iron monster",z!==y)
w=new O.tn(x)
v=w.$2(C.z,"sword")
u=w.$2(C.v,"spear")
t=w.$2(C.y,"shield")
x.ap(b,"<subject> <is> leaving Mount Bloodrock with "+H.b(v)+", "+H.b(u)+" and "+H.b(t)+".",!0)
s=x.x>=2?"in good health":"seriously injured"
r=x.fy>0?"with energy to spare":"exhausted"
x.ap(b,"<subject> <is> "+s+" and "+r+".",!0)
q=a.v(100)
q.a0(b,"<subject> <is> "+(q.x>=2?"uninjured":"wounded"))
b.l(0,"The important thing, though, is that you survived. <strong>Congratulations!</strong>",!0)
b.l(0,"</p>",!0)},
tt:function(a,b){var z,y,x
z=a.bd("take_orcthorn")
y=a.bd("smelter_throw_spear")
x=a.bd("guardpost_above_church_enter_tunnel_with_cancel")
if(z||y||x){a.a7("RoomRoamingSituation").bD(a,a.v(1),"tunnel",b,!1)
return}a.a7("RoomRoamingSituation").bD(a,a.v(1),"tunnel_cancel_chance",b,!1)},
tv:function(a,b){var z=a.v(1).cy.a.aX(0,new O.tw(),null)
a.W(a.v(1).y,new O.tx(z))
a.a7("RoomRoamingSituation").bD(a,a.v(1),"war_forge",b,!0)},
x3:[function(a,b,c){var z,y
z=R.b1(6666,"Agruth",null,null,null,null,null,0,2,100,!1,!1,2,!0,C.w,0,$.$get$bs())
y=z.y
a.a.u(0,z)
return U.c2(c,[z],"{rock|cavern} floor",b,P.a_([1,new O.tI(y),5,new O.tJ(y),9,new O.tK(y),12,new O.tL(y),17,new O.tM(y)]),C.e)},"$3","wc",6,0,10],
x4:[function(a,b,c){var z,y,x,w,v
z=O.hz(2)
y=O.ed(!1)
x=new O.tX(z.y)
w=new O.tW(y.y)
v=[z,y]
a.a.av(0,v)
return U.c2(c,v,"{rock|cavern} floor",b,P.a_([1,new O.tQ(x,w,new O.tP()),4,new O.tR(x,w),6,new O.tS(),9,new O.tT(),12,new O.tU(),16,new O.tV()]),C.e)},"$3","wd",6,0,10],
x5:[function(a,b,c){var z,y,x
z=a.aj("talk_to_briana_3")?"guardian":"orc"
y=R.b1(6667,z,null,null,null,new G.aB("rusty sword",1,1,!1,!0,!1,P.az(C.r,null)),null,0,3,100,!1,!1,3,!1,C.w,0,$.$get$bs())
x=y.y
a.a.u(0,y)
return U.c2(c,[y],"{rock|cavern} floor",b,P.a_([1,new O.tY(x),3,new O.tZ(x),5,new O.u_(x)]),C.e)},"$3","we",6,0,10],
x6:[function(a,b,c){var z,y,x,w,v
z=O.hz(2)
y=O.ed(!0)
x=new O.u4(z.y)
w=new O.u3(y.y)
v=[z,y]
a.a.av(0,v)
return U.c2(c,v,"{rough|stone} floor",b,P.a_([1,new O.u1(x,w,new O.u0()),3,new O.u2(x,w)]),C.e)},"$3","wf",6,0,10],
u8:function(a){return a.W(a.v(1).y,new O.u9())},
i3:function(a,b){a.W(a.v(1).y,new O.ua(b))},
eo:function(a){var z=a.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").c)return!1
return C.a.ag(C.a_,H.y(z.length!==0?C.a.gE(z):null,"$isG").a)},
aY:function(a,b){var z,y,x,w,v
z=a.v(1)
for(y=a.d,y=new P.e6(y,y.c,y.d,y.b,null,[H.j(y,0)]);y.B();){x=y.e
w=x.gcs()
v=z.y
if(w==null?v!=null:w!==v)continue
if(x.gdJ()!=="TakeExitAction")continue
if(x.gdU()===b)return!0
return!1}return!1},
i9:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.a,y=z.ga5(z),x=new H.bN(y,new O.um(),[H.j(z,0)]);x.B();){w=y.gU()
if(!w.gf6()){v=H.y(w.e,"$isaB")
y=b
x=v.c
u=v.d
v.r
t=P.Q(C.r,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.v(w.y)
s.toString
r=new R.an(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(s==null)H.e(P.i("other"))
r.a=s
new O.un(new G.aB(y,x,u,!0,!0,!1,t)).$1(r)
q=r.p()
z.a_(0,s)
z.u(0,q)
break}}},
cp:function(a,b){var z,y,x
z=H.y(a.c,"$iscC").b
if(z>=5)return
b.l(0,C.Z[z],!0)
y=H.y(a.c,"$iscC")
y.toString
x=new M.dY(null,!1,0,0)
x.j(y)
a.c=new O.uz().$1(x).p()},
eq:function(a,b,c,d){var z,y
b.W(a.y,new O.uE())
if(!d){z=b.a
y=O.ed(!1)
z.u(0,y)
C.a.u(b.f,U.c2(new H.I(z,new O.uF(),[H.j(z,0)]),[y],"{smooth |}rock floor",b.a7("RoomRoamingSituation"),P.a_([1,new O.uG(y.y)]),C.e))}},
w3:function(a,b){a.W(b.y,new O.w4(b))},
ed:function(a){var z,y
z=$.$get$eg().a++
y=a?new Z.al("spear",0,1,!1,!1,!1,P.az(C.G,null)):new G.aB("scimitar",1,1,!1,!0,!1,P.az(C.r,null))
return R.b1(z,"goblin",O.d7(),null,null,y,null,0,1,0,!1,!1,1,!1,C.w,0,$.$get$bs())},
hz:function(a){return R.b1($.$get$eg().a++,"orc",O.d7(),null,null,new G.aB("sword",1,1,!1,!0,!1,P.az(C.r,null)),null,0,a,0,!1,!1,a,!1,C.w,0,$.$get$bs())},
tn:{"^":"a:47;a",
$2:function(a,b){var z,y
z=this.a.dT(a)
if(z>1)y=b+"s"
else y=z===1?"a "+b:"no "+b
return y}},
tw:{"^":"a:0;",
$1:function(a){return C.a.ag(a.gfB(),C.v)}},
tx:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}},
tI:{"^":"a:5;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.v(z)
x=new G.aB("sword",1,1,!1,!0,!1,P.az(C.r,null))
y.a0(b,"<subject> {drop<s>|let<s> go of} the whip")
y.a8(b,"<subject> draw<s> <subject's> <object>",x)
a.W(z,new O.tH(x))
y.d6(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',a.v(1),!0)}},
tH:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},
tJ:{"^":"a:5;a",
$2:function(a,b){a.v(this.a).a0(b,"<subject> spit<s> on the cavern floor")}},
tK:{"^":"a:5;a",
$2:function(a,b){var z=a.v(this.a)
b.dN()
z.ap(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.l(0,"\n\n",!0)}},
tL:{"^":"a:5;a",
$2:function(a,b){var z=a.v(this.a)
z.a0(b,"<subject> grit<s> <subject's> teeth")
z.aa(b,"<subject> do<es>n't talk any more",!0)}},
tM:{"^":"a:5;a",
$2:function(a,b){a.v(this.a).a0(b,"<subject> scowl<s> with pure hatred")}},
tX:{"^":"a:11;a",
$1:function(a){return a.v(this.a)}},
tW:{"^":"a:11;a",
$1:function(a){return a.v(this.a)}},
tP:{"^":"a:28;",
$2:function(a,b){return a.gam()&&a.Q&&b.gam()&&b.Q}},
tQ:{"^":"a:5;a,b,c",
$2:function(a,b){var z,y,x,w,v,u
z=this.a.$1(a)
y=this.b.$1(a)
x=a.v(1)
if(this.c.$2(z,y)){w=z.gf7()?y:z
v=J.u(w,z)?y:z
w.ap(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.a0(b,"<subject> laugh<s>")
u=x.e
if(u.gn()===$.$get$co().b){v.aa(b,"<subject> stop<s> almost instantly",!0)
v.d6(b,"<subject> see<s> <object> in your hand.",u,!0)}}else{w=z.gam()&&z.gbT()?z:y
w.ap(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
u=x.e
if(u.gn()===$.$get$co().b)w.j7(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,u,!0)}}},
tR:{"^":"a:5;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gam()&&z.gbT()?z:y
w=a.v(1)
if(!(x.gf0() instanceof K.U))v=w.e instanceof K.U&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.aZ(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.x(b)
s.l(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="knee"
else r=w.d!=null?"shield":w.e.gn()
q="That last blow hits your "+r+" hard"
s.l(b,q+(w.fr===C.b?"":" and sends you a couple of steps back")+".",!0)
q=H.m([],[P.l])
p=$.$get$aG()
s.bw(b,"<owner's> <subject> glint<s> with intensity",x,new Y.ay(!1,"eyes",q,p,!1,C.H))}},
tS:{"^":"a:5;",
$2:function(a,b){J.bw(b,"From behind, you hear loud cries. Your pursuers must have reached the top of the stairs.",!0)}},
tT:{"^":"a:5;",
$2:function(a,b){J.bw(b,"Ear-splitting shouts come from behind. You wheel around and see a body of orcs and goblins approaching at top speed, their swords and spears at the ready.",!0)}},
tU:{"^":"a:5;",
$2:function(a,b){J.bw(b,"The orcs are goblins are halfway here.",!0)}},
tV:{"^":"a:5;",
$2:function(a,b){J.bw(b,"Your pursuers reach you from behind and a sword pierces your chest with formidable power.",!0)
a.W(a.v(1).y,new O.tO())
a.aE("RoomRoamingSituation")
a.ao()}},
tO:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}},
tY:{"^":"a:5;a",
$2:function(a,b){a.v(this.a).d6(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',a.v(1),!0)}},
tZ:{"^":"a:5;a",
$2:function(a,b){var z,y
z=a.v(this.a)
y=a.v(100)
b.dN()
z.ap(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.l(0,"\n\n",!0)
if(y.gam()&&y.Q){y.a0(b,"<subject> glare<s> at him")
y.ap(b,'"Shut up and die."',!0)
b.l(0,"\n\n",!0)}}},
u_:{"^":"a:5;a",
$2:function(a,b){var z,y
z=a.v(this.a)
y=a.v(1)
b.dN()
z.ap(b,'"You\'ll make a nice addition to my collection," <subject> say<s>, laughing.',!0)
z.a0(b,"<subject> nod<s> towards the heap of rotting bodies nearby")
b.l(0,"\n\n",!0)
y.ap(b,"<subject> glance<s> over at Briana, then back at the orc.",!0)
y.ap(b,'_"You had better shut up, and die."_',!0)
b.l(0,"\n\n",!0)}},
u4:{"^":"a:11;a",
$1:function(a){return a.v(this.a)}},
u3:{"^":"a:11;a",
$1:function(a){return a.v(this.a)}},
u0:{"^":"a:28;",
$2:function(a,b){return a.gam()&&a.Q&&b.gam()&&b.Q}},
u1:{"^":"a:5;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!(y.gcm()>0)){z.a8(b,"<subject> look<s> at <object's> body",y)
z.ap(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)){z.a8(b,"<subject> look<s> at <object>",y)
z.d6(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
u2:{"^":"a:5;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gam()&&z.gbT()?z:y
x.ap(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when we get you, we will eat your face alive."',!0)
x.a0(b,"<subject> smirk<s>")
x.ap(b,'"You mean nothing."',!0)}},
u9:{"^":"a:0;",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.V(null,null,[U.C])
y.ai()
y.j(C.e)
z.db=y
z=y}else z=y
y=$.$get$ea()
if(y==null)H.e(P.F("null element"))
z.gb_().u(0,y)
return a}},
ua:{"^":"a:0;a",
$1:function(a){var z=a.gk().go
a.gk().go=z+this.a
return a}},
um:{"^":"a:0;",
$1:function(a){return J.u(a.gbs(),$.$get$d9())}},
un:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},
uz:{"^":"a:0;",
$1:function(a){var z
a.gc1()
z=a.c
a.gc1()
a.c=z+1
return a}},
uE:{"^":"a:0;",
$1:function(a){var z=P.az(C.a1,null)
a.gk().e=new E.bi("shield",z)
return a}},
uF:{"^":"a:0;",
$1:function(a){return J.u(a.gbs(),$.$get$d9())}},
uG:{"^":"a:5;a",
$2:function(a,b){var z,y
z=a.v(this.a)
y=a.v(1)
if(a.bd("take_spear_in_underground_church")){z.e8(b,"<subject> look<s> at <object-owner's> <object>",$.$get$ea(),y)
z.ap(b,'"Thief," <subject> hiss<es>.',!0)}}},
w4:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a.e
if(!(z instanceof K.U)){y=a.gk()
x=y.db
if(x==null){x=new L.V(null,null,[U.C])
x.ai()
x.j(C.e)
y.db=x
y=x}else y=x
if(z==null)H.e(P.F("null element"))
y.gb_().u(0,z)}z=$.$get$co()
a.gk().f=z}}}],["","",,V,{"^":"",
lj:function(){var z=new V.dm(null,null,null)
new V.t0().$1(z)
return z.p()},
rD:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'Only a few bends ahead, the tunnel gets blindingly bright and you catch the scent of fresh mountain air. The surface!  For the first time in three years, you hear the howling wind. \n\n\nYou run through a small stone doorway and out of the mountain.\n\n\nThe blinding sun makes you squint. You let the wind chill your muscles and jump down a steep descending path. \n\n\nOutside, you and Briana have the upper hand. The orcs and goblins are used to the dark, dank caves, and they come out only when they must. \n\n\nSoon, the orcs and goblins stop following altogether, presumably leaving the two of you to their aboveground brothers. \n\n\nYou look around for a safe route. At first, you cannot make much sense of what you see \u2014 this is nothing like the country you left three years ago. Black smoke rises from orc camps and razed villages. You look out over the burned forests and notice the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview Hill. You see no birds, only some horrible dark eagle-like creatures that have no heads circling in both directions above Mount Bloodrock.\n\n\n![View of the road ahead](img/path.jpg)\n\n\nBriana doesn\'t seem surprised.\n\n\n_"We have to stop this."_\n\n\nBriana follows your gaze, then shakes her head. "This is bigger than us, Aren. This is a problem for kings, not peasants."\n\n\n_"No king has what we have."_\n\n\n',!0)
if(b.aj("take_orcthorn"))c.l(0,'"Orcthorn? Bah, you think they\'ll let you keep it? A farmhand?" \n\n\n_"I am_ not _a farmhand. And I do not mean Orcthorn, no. I have a strange connection. We both do."_\n',!0)
c.l(0,"\n",!0)
if(!b.aj("take_orcthorn"))c.l(0,'"Let me guess. Muscles and a bit of brains? Don\'t be a fool, you\'re still a farmhand." \n\n\n_"I am_ not _a farmhand. And I don\'t mean muscles or brains, no. I have a strange connection. We both do."_\n',!0)
c.l(0,'\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. You feel it, too \u2014 I am sure of it \u2014 but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? Or negotiate with him?"\n\n\n_"Negotiate? No, I do not have anything the Dead Prince wants. I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"So what\u2019s the plan?"\n\n\n_"Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run, slay some orcs along the way, and get as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"Anyone else would do exactly that."\n\n\n_"But we will not."_\n\n\nBriana sighs. "No, I suppose we won\'t."\n\n\nWith that, you both start down the road toward the black fort in the distance. \n\n\nTHE END.\n\n\n',!0)
O.tm(b,c)
c.l(0,"",!0)}},
rE:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
rB:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"You enter a small circular room. You see three openings that lead to passages, each marked with crude writing.\n\n\n",!0)
if(O.aY(b,"smelter"))c.l(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these passages slope downwards.\n',!0)
c.l(0,"\n",!0)
if(O.aY(b,"underground_church"))c.l(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these passages slope downward.\n',!0)
c.l(0,'\nA third passage is marked "Up Door".  Beyond the opening, you see  a steep stairway leading upward. This is it. Your final path to escape. \n\n\nFor the first time, you see a smile on Briana\'s face. Not a smirk or a battle snarl, but a genuine smile. "_Up Door?_" she whispers, shaking her head. "I can\'t believe we\'ve made it this far."\n\n\nJust inside the \u201cUp Door\u201d path sits a goblin guard. You\u2019re in luck: He\'s sleeping. He loosely holds a scimitar in one hand, and has a shield laid on his lap.\n',!0)}},
rC:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)
if(b.aj("guardpost_above_church_take_shield")&&!b.bd("guardpost_above_church_take_shield"))c.u(0,"The goblin's corpse is sprawled on the ground in the middle of the circular room.")
else c.u(0,"The goblin is sleeping soundly next to the passage to the Upper Door.")
c.l(0,"",!0)}},
lh:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="guardpost_above_church")return!1
return!0},
R:[function(a,b,c){c.l(0,"You take the passage that leads to the Upper Door.\n",!0)
O.tt(b,c)
return H.b(a.dx)+" successfully performs GuardpostAboveChurchEnterTunnelWithCancel"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
li:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="guardpost_above_church")return!1
if(b.d9(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.l(0,"You silently approach the goblin, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs and  leans his head to the side, but stays asleep.\n\n\nYou take a few slow steps back, then grip the shield in your left hand, ready for anything.\n",!0)
O.eq(a,b,c,!0)
return H.b(a.dx)+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
P:[function(a,b,c){c.l(0,"You silently approach the goblin, then wait a few moments. The goblin sniffs, moves, but stays asleep. You shift your weight on your right leg, leaning over the goblin and using the other leg as a counterweight. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move an inch, he'll wake up.\n",!0)
C.a.u(b.f,V.lj())
return H.b(a.dx)+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gK",6,0,1],
H:function(a,b){return 0.3},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return"The goblin is asleep, but not soundly \u2014 the floor here is cold and uncomfortable, and the wall isn\u2019t much of a headrest. Taking the shield from the goblin's lap will likely wake him up."},
gI:function(){return!1}},
eW:{"^":"ac;",
gbv:function(){return[new A.fI(new V.ll(),new V.lm(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fI(new V.ln(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gn:function(){return"guardpost_above_church_take_shield"},
an:function(){var z=new V.dm(null,null,null)
z.j(this)
new V.lo().$1(z)
return z.p()},
at:function(a,b){if(a!==0)return
return b.a.bg(0,new V.lp())},
aM:function(a,b){return[a.bg(0,new V.lq())]}},
t0:{"^":"a:0;",
$1:function(a){var z=$.$get$a8().ak(1073741823)
a.gbl().b=z
a.gbl().c=0
return a}},
ll:{"^":"a:26;",
$4:function(a,b,c,d){J.bw(c,'You stay completely still. After a while, the strain of holding the awkward position start to show. Your left leg  starts shaking. A bead of sweat is forming on your nose, threatening to fall on the goblin\'s leg.\n\n\n<p class="toast">Your stamina decreases by 1.</p>\n\n\nFortunately, the goblin shifts again and his expression gets visibly more relaxed. His breathing is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then grip the shield in your left hand, ready for anything.',!0)
b.ao()
b.W(a.gq(),new V.lk())
O.eq(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lk:{"^":"a:0;",
$1:function(a){var z=a.gk().go
a.gk().go=z-1
return a}},
lm:{"^":"a:3;",
$3:function(a,b,c){return a.fy>0}},
ln:{"^":"a:26;",
$4:function(a,b,c,d){J.bw(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly, and he gets his bearings surprisingly fast. He jumps up and points his scimitar at you.\n\n\nYou look at Briana. Both of you are ready to fight.",!0)
b.ao()
O.eq(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lo:{"^":"a:0;",
$1:function(a){var z=a.gbl().c
a.gbl().c=z+1
return a}},
lp:{"^":"a:0;",
$1:function(a){return a.gb1()}},
lq:{"^":"a:0;",
$1:function(a){return a.gb1()}},
ry:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nBriana stands towering over Agruth\'s corpse. She smooths her hair back and looks down into the expanding pool of Agruth\'s blood, using it as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve to die, or worse. And I think it will be satisfying to kill them with their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"Just making sure," she says. \n\n\n![Agruth\'s sword](img/agruth-sword.jpg)\n\n\nShe turns her attention to the sword. "We should name it. Named weapons please the gods. And I refuse to have this thing around thinking of it as  _Agruth\'s sword_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
rA:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
mg:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
R:[function(a,b,c){c.l(0,'_"We will call it Luck Bringer. We got lucky with Arguth, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.i9(b,"Luck Bringer")
b.a7("RoomRoamingSituation").bD(b,b.v(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordOpportunity"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
mh:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
R:[function(a,b,c){c.l(0,'_"We will call it Savior. Getting it was our first step toward freedom. The sword should have killed us, and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.i9(b,"Savior")
b.a7("RoomRoamingSituation").bD(b,b.v(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordRedemption"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
mf:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
R:[function(a,b,c){c.l(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's sword._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.a7("RoomRoamingSituation").bD(b,b.v(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordNothing"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
rw:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"You can see Briana clutching her fists. \"Homesick already?\" she says. She doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands. Then human screams.\n\n\nThe tunnel gets wider and more torches light your way. The walls are smoother. \n\n\nYou hear heavy breathing and rustling up ahead, and you stop in your tracks, next to a small reinforced door \n\n\nA human slave runs down the passage toward you. His arm is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips move but he makes no sound. Eyes blurred with tears, he doesn't see you.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave. A bloodied spearhead appears in the center of the man's chest, as if it grew from his body. His tearful eyes glance at the fatal wound. Two more steps toward you and the slave falls face down, the shaft of the spear protruding from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking toward the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion to Briana to lean against the wall, hoping that the door's reinforced frame will keep you hidden from the two slavers.\n\n\nBut right then, something or someone pounds on the reinforced door from the inside. You hear loud and angry growls.\n\n\nThe two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They run toward you.\n\n\n![Picture of the sadistic slavers](img/sadistic-slavers.jpg)\n",!0)}},
rx:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)
if(b.a7("RoomRoamingSituation").bf(b,b.v(1),"orcthorn_room")&&!O.aY(b,"orcthorn_room"))c.l(0,"The reinforced door on the side of the corridor is silent.",!0)
c.l(0,"\n",!0)
if(!b.a7("RoomRoamingSituation").bf(b,b.v(1),"orcthorn_room"))c.l(0,"The reinforced door on the side of the corridor is closed.",!0)
c.l(0,"\n",!0)
O.cp(b,c)
c.l(0,"",!0)}},
o0:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="slave_quarters_passage")return!1
if(!b.aj(this.d))z=!H.y(z.length!==0?C.a.gE(z):null,"$isG").c&&!b.a7("RoomRoamingSituation").bf(b,b.v(1),"orcthorn_room")
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.l(0,'You hear violent grunts and growls coming from behind that door. Next to it, you see orcish writing on the wall. It says "Danger mad. Give food go away."\n\n\n',!0)
if(b.aj("talk_to_briana_3"))c.l(0,'You look at Briana and nod.\n\n\n_"The Mad Guardian."_\n',!0)
c.l(0,"",!0)
return H.b(a.dx)+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
ru:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
rv:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
rs:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The tunnel back to the main slave quarters is likely suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. \n\n\nThat leaves two options: the black passage toward the war forges and the deserted tunnel to the Unholy Church, an underground temple. Both these paths eventually lead to the Upper Door, which will bring you out of the caves close to Mount Bloodrock's mountaintop.\n",!0)}},
rt:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cp(b,c)
c.l(0,"",!0)}},
nO:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="cave_with_agruth")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,'You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. \n\n\n<p class="toast">Your stamina increases by 1.</p>\n',!0)
O.i3(b,1)
return H.b(a.dx)+" successfully performs SearchAgruth"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gI:function(){return!1}},
rq:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The room is dark and wet. As you enter, the growls stop suddenly. You smell rotting flesh, and the stench fills your nostrils, forcing you to fight against vomitting. \n\n\nWhen your eyes adjust to the dark, you see a figure standing in front of you. You realize it's a male orc, but an especially large one, with huge muscles and dozens of scars. His face is in constant motion, overwhelmed by tics and waves of hate. Next to him is a heap of dead bodies.\n",!0)}},
rr:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The room is quiet. The Mad Guardian's huge body lies next to the heap of corpses.\n",!0)}},
oL:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="orcthorn_room")return!1
if(b.aj("talk_to_briana_3"))if(!b.aj(this.d))z=!H.y(z.length!==0?C.a.gE(z):null,"$isG").c
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.l(0,'You and Briana nod at each other and start searching the room. The Mad Guardian has left many bizarre things scattered around: A box of severed orc hands, crude drawings of tentacles covering one of the walls, several gouged out eyes, a circle made from half-eaten rats with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in her hand. "He must _really_ have gone mad. From fear or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The stench of rotten flesh is so strong you see pale fumes coming from the pile. Briana shields her nose with an elbow and starts dragging the less rotten corpses from the top. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nAfter what feels like hours, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. You pull it from the pile and hold it in the air: the brightest, sharpest sword you have ever seen.\n\n\n![Picture of Orcthorn](img/orcthorn.jpg)\n\n\n"Orcthorn," Briana nods and surveys its blade and hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of The Mad Guardian." And all this because of a common soldier and a farmhand," she says to the lifeless face.\n\n\n_"I am not a farmhand. And we still need to get out of here first."_\n',!0)
O.w3(b,a)
return H.b(a.dx)+" successfully performs TakeOrcthorn"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
rn:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'"There is a difference between being brave and being stupid. You\'re crossing it right now," she says.\n',!0)}},
rp:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'"We _really_ shouldn\'t push our luck," she says.\n',!0)}},
nZ:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="slave_quarters")return!1
return!0},
R:[function(a,b,c){c.l(0,"_\"Do you not want to kill some more orcs?\"_\n\n\n\"I do, trust me. I just don't want to get killed first.\"\n\n\nYou shake your head and start walking. Briana reluctantly follows, her eyes darting around the familiar tunnel. You're close to where the orcs had kept you during sleeping hours.\n\n\nSoon, you see an orc patrol appear from behind a bend. Here, it's impossible to hide. The orcs spot you immediatelly. \n\n\nThere are three of them, one has a longsword, the second has a spear, and the third holds a large battle axe.\n\n\nThe orc with the spear hurls it, and it pierces Briana's shoulder. She screams in pain. \n\n\nThe orc with the sword makes three fast leaps toward you, and swings his weapon. You have no time to react, and the blade slits your throat. You gurgle and your arms flail in surprise.\n\n\nYou look at Briana. As the battle axe cleaves her stomach, the two of you hold eye contact.\n",!0)
b.W(a.y,new V.o_())
b.ao()
return H.b(a.dx)+" successfully performs SlaveQuartersContinue"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
o_:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}},
rl:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"A blast of smoke and heat greets you as you step into the room. A roaring fire draws your attention to the far wall, where thousands of orcs shovel coal into a giant furnace. They tilt huge kettles of molten steel into white-hot flowing rivers. This is the smelter.\n\n\n",!0)
if(O.aY(b,"war_forge"))c.l(0,"You notice a smooth passage leading up and out of the smelter. You'll be able to go there unnoticed.",!0)
c.l(0,"",!0)
if(O.aY(b,"guardpost_above_church"))c.l(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel ends up \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.l(0,"",!0)}},
rm:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The coals reflects the reds and whites of the molten steel.\n\n\n",!0)
if(b.bd("smelter_look_around")&&!b.bd("smelter_throw_spear"))c.l(0,"About a spear's throw away, the blind ogre is {idling|waiting for commands from the forges}.",!0)
c.l(0,"\n",!0)
O.cp(b,c)
c.l(0,"",!0)}},
o3:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="smelter")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"Molten iron runs in rivers across the room, and gathers in a large pool. From that pool, a single ogre distributes the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you, but he doesn't notice. In fact, since you\u2019re able to get so close, you would even guess that he's blind, probably because of all the sudden flashes from the molten steel around him. Yet he's performing his job perfectly, listening to commands from orcs in the war forges beyond the wall, and operating the floodgates accordingly.\n",!0)
return H.b(a.dx)+" successfully performs SmelterLookAround"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
o4:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="smelter")return!1
if(!(!b.aj(this.d)&&b.aj("war_forge_watch_workers")&&b.aj("smelter_look_around")&&b.v(1).dT(C.v)>=1))return!1
return!0},
R:[function(a,b,c){c.l(0,'You can\'t come any closer to the blind ogre \u2014 there is the pool of molten steel between you, and going around it would surely cause the nearby orcs to notice you. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou lean forward to get a little  closer to the ogre and withdraw the spear. \n\n\nBriana gives you a puzzled look. "Wait\u2026" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and impales the blind ogre\'s shoulder. Your heart skips a beat. It wasn\u2019t a killing throw. The ogre will scream, the orcs will hear it \u2014 you\'re dead. \n\n\nBut the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand, stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream \u2014 the liquid swallows him whole. The orcs working on the other side of the room don\'t notice a thing.\n\n\n"Why would you do that?" Briana says, pointing where the blind ogre once stood. "You wasted a perfectly good spear on a stupid ogre. And he posed no threat to us."\n\n\n_"Listen."_\n\n\nThe distant voices coming from the war forges get slightly louder. Then louder again. Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou follow the short passage and crouch on the walkway above the war forges. You see chaos below: Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away. \n\n\nYou notice an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it, but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear\u2026"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre \u2026"\n\n\n_"One who was doing an important job."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The more complex you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',!0)
O.tv(b,c)
return H.b(a.dx)+" successfully performs SmelterThrowSpear"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
rj:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The path from slavery to power begins with a single crack of a whip. Briana spins around, her face red with pain and anger. She is new here, but she knows what is coming. \n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n![Agruth whips Briana](img/agruth-attack.jpg)\n\n\nAnother crack and there is new blood pouring from a gash in Briana's face. Agruth grins.\n\n\nNobody else is in sight. It's just you, Agruth, and Briana. That's Agruth's first mistake.\n",!0)}},
rk:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
oN:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){if(!(b.d9(this.d)==null&&O.eo(b)))return!1
return!0},
R:[function(a,b,c){c.l(0,'_"You are new here, I think. What news can you tell me about the world outside?"_\n\n\nBriana shrugs. "How long have you been here?"\n\n\n_"Three years."_\n\n\n"Three years! Gods. A lot has happened. Just this winter, he orcs took over the upper valley. They are raiding way beyond Fort Ironcast now."\n',!0)
return H.b(a.dx)+" successfully performs TalkToBriana1"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
oO:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){if(!(b.aj("talk_to_briana_1")&&b.d9(this.d)==null&&O.eo(b)))return!1
return!0},
R:[function(a,b,c){c.l(0,'_"Where were you captured?"_\n\n\n"At the Gate of Screams. I was trying to sneak in."\n\n\n_"You what?"_\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, and help win the war."\n',!0)
return H.b(a.dx)+" successfully performs TalkToBriana2"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
oP:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){if(!(b.aj("talk_to_briana_2")&&b.d9(this.d)==null&&O.eo(b)))return!1
return!0},
R:[function(a,b,c){c.l(0,'_"What is Orcthorn?"_\n\n\n"A sword. It\u2019s killed hundreds of orcs, wielded by a half dozen legendary knights. The orcs have been trying to get Orcthorn for decades, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of warriors ambushed Lord Glencot. He wielded Orcthorn at the time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs have been bolder."\n\n\n_"The Mad Guardian."_\n\n\n"The mad who?"\n\n\n_"That is what Agruth and the other slavers were talking about a couple of weeks back. One orc was supposed to guard a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days. Now they keep him in a cell, and call him *grach kamkorr*: The Mad Guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n_"Down the slave quarters."_\n\n\n',!0)
if(!b.a7("RoomRoamingSituation").bf(b,b.v(1),"slave_quarters_passage"))c.l(0,'Briana tenses. "Well then, at least we have that choice." ',!0)
c.l(0,"\n",!0)
if(b.a7("RoomRoamingSituation").bf(b,b.v(1),"orcthorn_room")&&a.c!=="orcthorn_room")c.l(0,'Briana\'s eyes go wide. "The mad orc behind that door." ',!0)
c.l(0,"\n",!0)
if(b.a7("RoomRoamingSituation").bf(b,b.v(1),"slave_quarters_passage")&&!b.a7("RoomRoamingSituation").bf(b,b.v(1),"orcthorn_room"))c.l(0,'Briana\'s eyes go wide. "That door in the slave quarters." ',!0)
c.l(0,"",!0)
return H.b(a.dx)+" successfully performs TalkToBriana3"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
t4:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'Almost as soon as the circular room disappears from your line of sight, loud shouting rises from deep within the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear dozens of orc and goblin feet stomping. \n\n\nThe air gets colder and fresher, but there\'s still no end in sight. The stairs get steeper and steeper until you feel like you\u2019re climbing a ladder.\n\n\n"I have\u2026" Briana gasps, catching her breath. "I have not fought my way through the depths of Mount Bloodrock just to die of exhaution on its doorstep."\n\n\n_"That\u2026 that would be disappointing, yes."_\n\n\nThe sounds from behind grow louder. You can now pick out individual voices, although not what they are saying. \n\n\nThe stairway suddenly makes a sharp left turn and levels out. Tasting blood on the roof of your mouth, your whole body demands that you stop \u2014 but you start running anyway. Briana follows close behind.\n\n\nThe light in the tunnel gets brighter and the air gets colder. Suddenly, just when you can smell fresh air, an orc and a goblin jump out in front of you from a slimy crevice, swords in hands. \n\n\n![Picture of the Upper Door guard](img/orc_and_goblin_sketch.jpg)\n\n\nThey must be guarding the Upper Door. There is no way around them.\n',!0)}},
re:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
t2:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'After a few strides, you realize Briana is still standing in the circular room behind you.\n\n\n_"Are you not coming?"_\n\n\nBriana hesitates. "It feels like we could have done more." She motions toward the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. I mean, we might be the first slaves in Mount Bloodrock to survive."\n',!0)}},
t3:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"",!0)}},
rV:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"You enter a room that at first looks like a large, twisting cave. But then it opens into a high-ceilinged space with many columns. This must be what the orcs call the Underground Church. Dim light shines from the far end of the room, where you\u2019d expect the altar to be, but you can't quite see it. There are no torches here. And it\u2019s eerily quiet. \n\n\nYour bare footsteps reverberate in the room, so you slow down to quiet them. \n\n\n",!0)
if(O.aY(b,"cave_with_agruth"))c.u(0,"After a bit of searching, you also notice a twisting passage going from the right side of the Church and sloping upward. That must be the way out.")
c.l(0,"",!0)
if(O.aY(b,"guardpost_above_church"))c.u(0,"Not far from here, a tunnel leads slightly downward, back to where you killed Agruth.")
c.l(0,"",!0)}},
t1:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The temple is silent, as if it were holding its breath.\n\n\n",!0)
O.cp(b,c)
c.l(0,"",!0)}},
kN:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="underground_church")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,'This place wasn\u2019t built by the orcs or their slaves. The walls are straight and smooth. The ceiling is high enough to make you feel small and insignificant. The columns are decorated with delicate carvings of skulls and tentacles.\n\n\n"What are these things?" Briana whispers, looking at the ornaments.\n\n\n_"This place was made for worshiping the Dead Prince."_\n\n\nSaying the name brings coldness and sweat to your brow. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worshiping?" Briana glances up at the high ceiling, and then around the temple. "I though the Dead Prince was a warlord. Something like that."\n\n\n_"He is a god."_\n\n\n',!0)
if(!b.aj("wait_for_ritual"))c.l(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, but you really shouldn't. He's a demented illusionist at best.\" \n",!0)
c.l(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than a god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.dx)+" successfully performs ExamineUndergroundChurch"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
rz:{"^":"a:6;",
$3:function(a,b,c){c.l(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, you see a large ornament portraying an octopus with eight black eyes at the tips of its tentacles. It\'s the sign of the Dead Prince. You have never seen it in real life but you\u2019ve seen it in your dreams often enough.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we have to linger in this mountain much longer, I\'d rather kill some orcs than sneak around in a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but the otherwise steady light from the altar flickers like a flame, and you both duck behind a large column. You almost trip over a spear lying on the ground.\n',!0)}},
rK:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The altar glows with a dim red light that reflects and shimmers in the eight black eyes above it.\n",!0)}},
p5:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="underground_church_altar")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,'You move into the shadows and wait. After a few heartbeats, there is a scraping sound \u2014 stone against stone. You lean out from your hiding place and see a section of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters through the stone door. Suddenly, the whole temple reverberates with a strong, dissonant tone that is both sickening and powerful. As if the whole mountain were groaning. \n\n\nFollowing the orc priest, a huge creature enters through the door, crouching below its frame. It\'s unclear what the creature is, exactly, but it could be some large breed of ogre. Judging by the braided hair, it\'s a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and stands upright, you can see that she is leading someone in by a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 walk to the front of the altar and stand before it, facing the symbol of the octopus, their backs facing you and Briana. \n\n\nThe dissonant tone stops. You lean a little further out from your hiding place to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but he obeys. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. \n\n\nBriana gives you a puzzled look, then turns back to the ritual. From the shadows in the base of the altar, a swarm of large black insects starts to make its way up toward the terrified orc. The priest lifts his arms in silent worship.\n\n\n![Picture of the sadistic slavers](img/altar.jpg)\n\n\nThe ogre pushes down on the orc, preparing for the inevitable struggle. The orc knows what\u2019s coming, and he opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s surface, onto the orc\'s body, and move straight toward his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, to no avail. The dissonant tone gets even louder. The whole temple quivers. You feel like your ear drums will collapse. The sound permeates everything.\n\n\nSuddenly, the terror of the moment is fully replaced by an invigorating feeling of power. You take a breath and feel stronger, refreshed.\n\n\n<p class="toast">Your stamina increases by 1.</p>\n\n\nYou notice that the priest inhales deeply as well.\n\n\nThen, the sound stops and the orc\'s body collapses into itself. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again and \u2014 without saying anything \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, throws it over her shoulder, and follows the priest. In a few heartbeats, they are all gone and the door closes. A new pool of blood on the altar is the only reminder of what happened.\n\n\nBriana stares ahead. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.i3(b,1)
return H.b(a.dx)+" successfully performs WaitForRitual"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
oM:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="underground_church_altar")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"It's a primive short spear that probably belonged to a goblin. You take it in your hand, feeling the cool, wet wood and patches of mold along it. It must have been here for a while. \n\n\nBut it\u2019s sturdy in your hand. A good throwing weapon.\n",!0)
O.u8(b)
return H.b(a.dx)+" successfully performs TakeSpearInUndergroundChurch"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
rd:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"You enter the enormous cave that houses Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Large crooked  bats circle just below the clouds, their shrieks mixing with the clangs of steel and constant angry shouts from below.\n\n\n",!0)
if(O.aY(b,"cave_with_agruth"))c.l(0,"You and Briana duck behind two carts on a walkway that leads up above the cave\u2019s floor. You can see a flight of stairs ahead that hugs one side of the cave, and follows a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there\u2019s no one in the way. ",!0)
c.l(0,"\n",!0)
if(O.aY(b,"smelter"))c.l(0,"You and Briana stand on a walkway high above the cave\u2019s floor. You can see a flight of stairs ahead that hugs one side of the cave, and leads toward the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, toward the slave quarters, and where you slayed Agruth. There\u2019s no one in the way. ",!0)
c.l(0,"",!0)}},
ro:{"^":"a:6;",
$3:function(a,b,c){c.l(0,"The air in the war forge is thick and makes breathing difficult, and the constant noise is overwhelming.\n\n\n",!0)
O.cp(b,c)
c.l(0,"",!0)}},
p6:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="war_forge")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"The cave is natural, but on the side of the smelter you see an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into every section of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot mixes with the stench of all that orc sweat.\n\n\nThis place makes Fort Ironcast's military forge look like a doll house: tiny and inconsequential.\n",!0)
return H.b(a.dx)+" successfully performs WarForgeLookAround"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
p7:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.y(z.length!==0?C.a.gE(z):null,"$isG").a!=="war_forge")return!1
if(!(!b.aj(this.d)&&b.aj("war_forge_look_around")))return!1
return!0},
R:[function(a,b,c){c.l(0,'You look out from your hiding spot and scan the room. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres." A smirk forms on her lips. "They must be terrified."\n\n\nYou scan the workers more closely. The slow-moving ogres tower over the orcs. \n\n\n_"And they don\'t use slaves here. They must be doing something important."_\n\n\nLooking again at the molds they are using, you don\'t see anything strange or unexpected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. \n\n\nYou follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. It\u2019s an enormous, repulsive, half-assembled insect. Each leg reaches as far as you could throw a rock. And there are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption forged from steel. The teeth are already completed, sharp and menacing, and as long as a man is tall. \n\n\nA full-sized ogre pours water over one section of the creature, making a thick cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.dx)+" successfully performs WarForgeWatchWorkers"},"$3","gL",6,0,1],
P:[function(a,b,c){throw H.c(new P.t("Success chance is 100%"))},"$3","gK",6,0,1],
H:function(a,b){return 1},
gN:function(){return!1},
a3:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gM:function(){return},
gI:function(){return!1}},
po:{"^":"eW;q:a<,V:b<",
ae:function(a){var z=new V.dm(null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.eW))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){return Y.T(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)))},
i:function(a){var z,y
z=$.$get$S().$1("GuardpostAboveChurchTakeShieldRescueSituation")
y=J.x(z)
y.m(z,"id",this.a)
y.m(z,"time",this.b)
return y.i(z)}},
dm:{"^":"d;a,b,c",
gq:function(){return this.gbl().b},
gV:function(){return this.gbl().c},
gbl:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbl().b
x=this.gbl().c
z=new V.po(y,x)
if(y==null)H.e(P.i("id"))
if(x==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",
x2:[function(a){var z,y
z=$.$get$dc()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","uC",2,0,23],
x7:[function(a){$.em=a},"$1","uD",2,0,23],
hQ:[function(a,b,c,d,e,f,g){var z=L.eK(a,!1,!1,d,e,f,g)
$.$get$bU().u(0,z)
return z},function(a){return O.hQ(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hQ(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uB",2,13,41,0,0,0,1,1,0],
np:{"^":"nB;",
bb:function(){var z=0,y=P.ax(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bb=P.av(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.bL){n=t.Q
n.toString
m=new A.o(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.O())
m=t.Q
n=Z.od()
m.toString
l=new A.o(100,null,null,null,null)
l.e=n.O()
m.a.F(l.O())
new P.K(0,$.p,null,[null]).bi(!0)}if(t.r){n=t.Q
n.toString
m=new A.o(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.O())
t.r=!1
m=t.Q
m.toString
n=new A.o(60,null,null,null,null)
n.b=t.f.ct(0)
m.a.F(n.O())}s=null
case 3:n=t.Q
n.toString
m=new A.o(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.O())
w=7
z=10
return P.au(t.c6(),$async$bb)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.A(j)
if(n instanceof M.cw){r=n
q=H.E(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.o(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.O())
z=1
break}else{p=n
o=H.E(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.o(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.F(l.O())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.u(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.o(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.F(m.O())
case 1:return P.aE(x,y)
case 2:return P.aD(v,y)}})
return P.aF($async$bb,y)},
e9:function(){var z,y
this.eG()
this.f.aW(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hh(Z.bK())
z.toString
y=new A.o(90,null,null,null,null)
y.b=Z.bK()
z.a.F(y.O())
this.bb()},
jr:[function(a){var z,y
z={}
z.a=null
y=$.$get$bU()
y.Z(0,new O.nM(z,this,a))
z=z.a
if(z==null)throw H.c(P.F("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.J(y)+")"))
this.hG(z)
this.bb()},"$1","ghw",2,0,34],
hG:function(a){var z=a.r
if(z!=null)$.$get$ck().ax(z)
z=a.x
if(z!=null)this.dF(z)},
c6:function(){var z=0,y=P.ax(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$c6=P.av(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:u={}
r=$.$get$cl()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.o(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.O())
p=r.b.d5()
r=v.Q
q=p.gi4()
u=p.b
o=p.c
r.toString
n=new A.o(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.O())
r=new P.K(0,$.p,null,[null])
r.bi(null)
r.bH(new O.nC(v))
x=!0
z=1
break}r=v.x
q=v.e.d
o=q.length
m=r===o-1||r===v.y
u.a=m
l=v.y
k=r!==l&&r!=null&&r<o&&!!J.n(q[r]).$isM
r="atEndOfPage = "+m+", atStaticChoiceList = "+k
q=v.Q
q.toString
o=new A.o(667,null,null,null,null)
o.c=r
q.a.F(o.O())
o=$.$get$bU()
o.ht(new O.nD(v),!1)
if(o.b.length!==0){r=v.Q
r.toString
q=new A.o(667,null,null,null,null)
q.c="We have choices."
r.a.F(q.O())
o.toString
q=H.z(o,"b6",0)
q=P.Q(new H.I(o,new O.nE(u,k),[q]),!0,q)
r=o.a
H.m([],[L.aa])
if(q.length!==0){u=v.Q
o=u.e
if(o!=null){o.cW(new D.bY("Showing new choice before previous one was selected."))
u.e=null}o=P.q
u.e=new P.cf(new P.K(0,$.p,null,[o]),[o])
q=new L.eL(r,q).dc()
u.a.F(q.O())
u=u.e.a.bH(v.ghw())
j=new O.nF(v)
q=H.j(u,0)
r=$.p
if(r!==C.k){j=P.ee(j,r)
r.toString}u.cH(new P.e4(null,new P.K(0,r,null,[q]),6,new O.nG(),j,[q,q]))
x=!0
z=1
break}else{i=o.aX(0,new O.nH(),new O.nI())
if(i!=null){r=i.r
if(r!=null)$.$get$ck().ax(r)
r=i.x
if(r!=null)v.dF(r)
o.a_(0,i)}}}r=$.$get$ck()
q=r.b
h=r.c
z=q!==h?3:4
break
case 3:++r.d
u=r.a
h=(h-1&u.length-1)>>>0
r.c=h
g=u[h]
u[h]=null
z=5
return P.au(v.c8(g),$async$c6)
case 5:x=b
z=1
break
case 4:r=$.em
if(r!=null){v.dF(r)
$.em=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===l){r=v.e.d.length-1
v.x=r}else if($.hC)$.hC=!1
else{++r
v.x=r}q=v.e
u.a=r===q.d.length-1
q="Resolving block: '"+H.b(q.a)+"' block "+H.b(v.x)+"."
r=v.Q
r.toString
l=new A.o(667,null,null,null,null)
l.c=q
r.a.F(l.O())
r=v.x
q=v.e.d
if(r===q.length){u=v.Q
u.toString
r=new A.o(667,null,null,null,null)
r.c="End of book."
u.a.F(r.O())
r=v.Q
u=v.du()
r.toString
u=u.ee(50)
r.a.F(u.O())
v.Q.a.F(new A.o(80,null,null,null,null).O())
x=!0
z=1
break}r=q[r]
z=typeof r==="string"?6:8
break
case 6:u=v.Q
q=P.ae
u.f=new P.cf(new P.K(0,$.p,null,[q]),[q])
q=new A.o(30,null,null,null,null)
q.c=r
u.a.F(q.O())
u.f.a.bH(new O.nJ(v))
x=!0
z=1
break
z=7
break
case 8:z=!!J.n(r).$isM?9:11
break
case 9:r=v.Q
r.toString
q=new A.o(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.F(q.O())
try{o.i2(v.e.d[v.x])}catch(c){u=H.A(c)
if(u instanceof M.cw){t=u
s=H.E(c)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.o(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.F(q.O())
x=!0
z=1
break}else throw c}r=v.Q
r.toString
q=new A.o(667,null,null,null,null)
q.c="- choices added"
r.a.F(q.O())
if(o.b6(0,new O.nK(u,v))&&v.x===v.e.d.length-1){u=v.Q
u.toString
r=new A.o(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.O())
r=v.Q
u=v.du()
r.toString
u=u.ee(50)
r.a.F(u.O())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:q={func:1,ret:[P.O,P.as]}
z=H.aw(r,q)?12:14
break
case 12:e=v.x===v.e.d.length-1?v.du():null
z=15
return P.au(v.c8(H.hY(v.e.d[v.x],q)),$async$c6)
case 15:d=b
if(o.b6(0,new O.nL(u,v))&&v.x===v.e.d.length-1){u=v.Q
u.toString
r=e.ee(50)
u.a.F(r.O())}x=d
z=1
break
z=13
break
case 14:throw H.c(new P.t("Invalid block: "+H.b(v.e.d[v.x])))
case 13:case 10:case 7:case 1:return P.aE(x,y)}})
return P.aF($async$c6,y)},
dF:function(a){var z,y,x,w,v
z=$.$get$cA()
if(z.b.test(H.cm(a))){y=this.d
if(y==null)throw H.c(new P.t("Cannot use ["+J.J(z)+"] when there is no _preGotoPosition."))
x=y.a
w=y.b-1}else{x=this.b.dg(a,this.e.gdi())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.u(0,H.b(z.a)+">>"+H.b(y.a))
this.r=!0}if(this.f.ag(0,H.b(this.e.a)+">>"+H.b(x.a))||x.e>0){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!((y?null:z.a).e>0)
else z=!1}else z=!1
$.hA=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.o(667,null,null,null,null)
v.c=z
y.a.F(v.O())
v=this.e
this.d=new O.nq(v,this.x)
this.e=x
this.x=w
v.e=v.e+1},
eG:function(){var z,y,x,w,v,u
this.x=null
$.$get$ck().aW(0)
C.a.sw($.$get$bU().b,0)
x=$.$get$cr()
x.aW(0)
w=$.$get$cl()
x.t(0,"points",w)
w.a=0
w.b.aW(0)
this.b.i6()
$.i6=!0
try{this.iB()}catch(v){z=H.A(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.o(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.O())
throw H.c(z)}this.fj()
$.i6=!1},
c8:function(a){var z=0,y=P.ax(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$c8=P.av(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dc()
q.C=""
w=4
z=7
return P.au(a.$0(),$async$c8)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.A(m)
r=H.E(m)
q.C+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.J(s)
o=t.e.a
n=t.x
throw H.c(new M.cw(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.el(J.J(q)).bH(new O.nN(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aE(x,y)
case 2:return P.aD(v,y)}})
return P.aF($async$c8,y)},
hz:[function(a){var z,y,x
z=a.x
if(z==null)return!1
if($.$get$cA().b.test(z))return!1
if(this.b.dg(z,this.e.gdi())==null){z="Target page '"+z+"' was not found."
y=this.Q
y.toString
x=new A.o(667,null,null,null,null)
x.c=z
y.a.F(x.O())
return!0}return!1},"$1","geH",2,0,35],
du:function(){var z,y,x,w,v,u
this.fj()
try{x=this.e.a
w=$.$get$cr()
x=new Z.fD(x,this.b.is(),null,null,null,null)
x.c=H.aH(Z.cR(w),"$isH",[P.l,P.d],"$asH")
x.f=Date.now()
x.e=C.i.ji(H.aA(x),16)
return x}catch(v){z=H.A(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.o(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.O())
throw H.c(z)}},
fb:function(a,b){var z,y,x
this.eG()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.dn("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.o(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.O())
z.iA(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.o(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.O())
this.f.av(0,b)}z=this.Q
z.toString
y=new A.o(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.O())
y=$.$get$cr()
Z.nm(a,y,P.fa(P.l,P.bA))
this.cx=H.y(y.h(0,"game"),"$iseQ")
this.cy=H.aH(y.h(0,"hitpoints"),"$isat",[P.aX],"$asat")
z=[P.q]
this.db=H.aH(y.h(0,"stamina"),"$isat",z,"$asat")
this.dx=H.aH(y.h(0,"gold"),"$isat",z,"$asat")
z=this.Q
Z.hh(Z.bK())
z.toString
y=new A.o(90,null,null,null,null)
y.b=Z.bK()
z.a.F(y.O())
y=this.Q
y.toString
z=new A.o(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.O())
this.bb()},
iN:function(a){return this.fb(a,null)},
dj:[function(a,b,c,d){var z=0,y=P.ax(),x,w=this,v,u,t
var $async$dj=P.av(function(e,f){if(e===1)return P.aD(f,y)
while(true)switch(z){case 0:v=$.$get$dc()
if(v.C.length!==0){w.Q.el(J.J(v))
v.C=""}v=w.Q
v.toString
u=new A.o(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.O())
u=U.cd
t=new P.K(0,$.p,null,[u])
v.r=new P.cf(t,[u])
x=t
z=1
break
case 1:return P.aE(x,y)}})
return P.aF($async$dj,y)},function(a,b){return this.dj(a,b,null,!1)},"jp","$4$rerollEffectDescription$rerollable","$2","gfY",4,5,54,1,0]},
nM:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.a=!0
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.o(667,null,null,null,null)
x.c=z
y.a.F(x.O())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cA().b.test(z)?y.d.a:y.b.dg(z,y.e.gdi())
if(w!=null){y.f.u(0,H.b(y.e.a)+">>"+H.b(w.a))
y.r=!0}}}}},
nC:{"^":"a:0;a",
$1:function(a){return this.a.bb()}},
nD:{"^":"a:0;a",
$1:function(a){return a.a||this.a.hz(a)}},
nE:{"^":"a:37;a,b",
$1:function(a){return a.iH(this.b,this.a.a)}},
nF:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.o(667,null,null,null,null)
x.c=z
y.a.F(x.O())
return}},
nG:{"^":"a:0;",
$1:function(a){return a instanceof D.bY}},
nH:{"^":"a:0;",
$1:function(a){return a.e.length===0}},
nI:{"^":"a:2;",
$0:function(){return}},
nJ:{"^":"a:0;a",
$1:function(a){return this.a.bb()}},
nK:{"^":"a:0;a,b",
$1:function(a){return a.cZ(!0,this.a.a,this.b.geH())}},
nL:{"^":"a:0;a,b",
$1:function(a){return a.cZ(!0,this.a.a,this.b.geH())}},
nN:{"^":"a:0;a",
$1:function(a){return this.a.bb()}},
mS:{"^":"d;a,b,eY:c<",
m:function(a,b,c){var z
if(!$.hA){z=this.a+b
this.a=z
this.b.ax(new A.cM(b,z,c))}},
u:function(a,b){return this.m(a,b,null)},
aL:function(a,b){this.u(0,b)
return this},
O:function(){return P.a_(["points",this.a])},
fD:function(a){this.a=a.h(0,"points")
this.b.aW(0)},
h5:function(){this.b=P.b7(null,A.cM)},
$isdR:1},
cS:{"^":"mB;d,ef:e@,a,b,c"},
nq:{"^":"d;a,b"},
nx:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
dg:function(a,b){var z
if(b!=null&&this.a.ad(b+": "+H.b(a)))return this.a.h(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.ad(a))return z.h(0,a)
else return}},
is:function(){var z=new H.P(0,null,null,null,null,null,0,[P.l,null])
this.a.Z(0,new O.nz(z))
return z},
iA:function(a){a.Z(0,new O.nA(this))},
i6:function(){this.a.Z(0,new O.ny())}},
nz:{"^":"a:5;a",
$2:function(a,b){this.a.t(0,a,P.a_(["visitCount",b.gef()]))}},
nA:{"^":"a:5;a",
$2:function(a,b){var z=this.a.a
if(z.ad(a))z.h(0,a).sef(J.aI(b,"visitCount"))}},
ny:{"^":"a:5;",
$2:function(a,b){b.sef(0)}}}],["","",,M,{"^":"",cw:{"^":"d;a,b,c",
i:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eE:function(a){return new M.cw(a,null,null)}}}}],["","",,M,{"^":"",nB:{"^":"d;"}}],["","",,Z,{"^":"",fD:{"^":"d;a,b,c,d,e,f",
ee:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.o(a,null,null,null,null)
z.c=this.da()
return z},
da:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.l,null])
z.t(0,"uid",this.e)
z.t(0,"currentPageName",this.a)
z.t(0,"pageMapState",this.b)
z.t(0,"vars",this.c)
z.t(0,"timestamp",this.f)
y=this.d
if(y!=null)z.t(0,"previousText",y)
return C.A.f2(z)},
i:function(a){return this.da()},
A:{
fE:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.n(a)
z=!!z.$isM||!!z.$isH}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.n(a).$isdR},
cR:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isM){y=[]
for(x=0;x<z.gw(a);++x)if(Z.fE(z.h(a,x)))y.push(Z.cR(z.h(a,x)))
return y}else if(!!z.$isH){w=new H.P(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nl(a,w))
return w}else if(!!z.$isdR){v=a.O()
v.t(0,"_class",a.geY())
return Z.cR(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cQ:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isM){y=[]
for(x=0;x<z.gw(a);++x)y.push(Z.cQ(z.h(a,x),b,null))
return y}else{w=!!z.$isH
if(w&&!a.ad("_class")){v=new H.P(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nk(b,v))
return v}else if(w&&a.ad("_class"))if(c!=null){c.fD(a)
return c}else{u=z.h(a,"_class")
if(!b.ad(u))throw H.c(new Z.dn("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nm:function(a,b,c){a.c.Z(0,new Z.nn(b,c))}}},nl:{"^":"a:5;a,b",
$2:function(a,b){if(Z.fE(this.a.h(0,a)))this.b.t(0,a,Z.cR(b))}},nk:{"^":"a:5;a,b",
$2:function(a,b){this.b.t(0,a,Z.cQ(b,this.a,null))}},nn:{"^":"a:38;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.t(0,a,Z.cQ(b,x,null))
else z.t(0,a,Z.cQ(b,x,y))}},dn:{"^":"d;a",
i:function(a){return"IncompatibleSavegameException: "+this.a}},ly:{"^":"d;a",
i:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",mY:{"^":"d;"},mX:{"^":"mY;"},lG:{"^":"mX;a,b,c,d,e,f,r",
js:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.l
n=[o,P.d]
H.aH(a,"$isH",n,"$asH")
m=new A.o(a.h(0,"type"),null,null,null,null)
if(a.ad("strContent"))m.c=a.h(0,"strContent")
if(a.ad("listContent"))m.b=a.h(0,"listContent")
if(a.ad("intContent"))m.d=a.h(0,"intContent")
if(a.ad("mapContent"))m.e=H.aH(a.h(0,"mapContent"),"$isH",n,"$asH")
z=m
switch(z.gfA()){case 1070:o=this.e
if(o!=null){o.cW(new D.bY("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bm()
o.b.bm()
return
case 1000:o=new A.o(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.O())
n.F(new A.o(10,null,this.c.ch,null,null).O())
return
case 1050:l=z.giC()
this.e.bz(l)
this.e=null
return
case 1080:o=new A.o(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.O())
k=J.aI(z.ge2(),0)
j=J.aI(z.ge2(),1)
this.r.bz(new U.cd(C.Y[k],j))
this.r=null
return
case 1010:o=new A.o(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.O())
o=this.e
if(o!=null){o.cW(new D.bY("Book Restart before choice was selected."))
this.e=null}try{this.c.e9()}catch(i){y=H.A(i)
x=H.E(i)
o=new A.o(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.O())
throw H.c(y)}o=new A.o(90,null,null,null,null)
o.b=Z.bK()
n.F(o.O())
n.F(new A.cM(0,0,null).dc().O())
return
case 1020:h=new A.o(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.O())
h=this.e
if(h!=null){h.cW(new D.bY("Book Load before choice was selected."))
this.e=null}try{h=z.c
f=new Z.fD(null,null,null,null,null,null)
e=H.aH(C.A.ie(h),"$isH",n,"$asH")
if(!e.ad("currentPageName")||!e.ad("vars"))H.e(new Z.ly("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.aH(e.h(0,"pageMapState"),"$isH",n,"$asH")
f.c=H.aH(e.h(0,"vars"),"$isH",n,"$asH")
if(e.ad("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.aH(J.iJ(z.ge2()),"$isdS",[o],"$asdS")
o=this.c
if(v!=null)o.fb(w,v)
else o.iN(w)}catch(i){o=H.A(i)
if(o instanceof Z.dn){u=o
t=H.E(i)
o=new A.o(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.O())
this.c.e9()}else{s=o
r=H.E(i)
o=new A.o(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.O())
this.c.e9()}}try{o=new A.o(90,null,null,null,null)
o.b=Z.bK()
g.F(o.O())}catch(i){q=H.A(i)
p=H.E(i)
o=new A.o(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.O())
throw H.c(q)}this.c.toString
g.F(new A.cM(0,$.$get$cl().a,null).dc().O())
return
case 1090:this.f.bz(!0)
this.f=null
return
case 1040:this.c.bb()
return
default:o=new A.o(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gfA())+"."
this.a.F(o.O())}},"$1","ghE",2,0,16],
el:function(a){var z=P.ae
this.f=new P.cf(new P.K(0,$.p,null,[z]),[z])
z=new A.o(30,null,null,null,null)
z.c=a
this.a.F(z.O())
return this.f.a}},bY:{"^":"d;a",
i:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,A,{"^":"",o:{"^":"d;fA:a<,e2:b<,c,iC:d<,e",
gjk:function(){var z=this.a
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
case 666:return"SCRIPTER_ERROR"
case 667:return"SCRIPTER_LOG"
case 1000:return"REQUEST_BOOK_UID"
case 1010:return"START"
case 1020:return"LOAD_GAME"
case 1040:return"PROCEED"
case 1050:return"CHOICE_SELECTED"
case 130:return"SHOW_SLOT_MACHINE"
case 1090:return"TEXT_SHOWN"
case 1070:return"QUIT"
default:return"Unknown type="+H.b(z)}},
da:function(){return C.A.f2(this.O())},
O:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.l,P.d])
z.t(0,"type",this.a)
y=this.c
if(y!=null)z.t(0,"strContent",y)
y=this.b
if(y!=null)z.t(0,"listContent",y)
y=this.d
if(y!=null)z.t(0,"intContent",y)
y=this.e
if(y!=null)z.t(0,"mapContent",y)
return z},
i:function(a){var z,y
z="Message "+this.gjk()
y=this.a
return z+(y===50||y===60||y===90||y===100||y===666||y===667?" (async)":"")}}}],["","",,E,{"^":"",mB:{"^":"d;n:a<",
i:function(a){return this.a},
gdi:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=C.c.b0(z,": ")
if(y>0)return C.c.aw(z,0,y)
else return}}}],["","",,A,{"^":"",cM:{"^":"d;i4:a<,b,c",
i:function(a){var z,y
z=this.c
y=this.a
if(z!=null)return"Score +"+y+" for "+z+"."
else return"Score +"+y+"."},
dc:function(){var z=new A.o(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",aa:{"^":"d;a,b,c,d,bc:e<,f,r,x,y",
cZ:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this))return!1
return!0},
iH:function(a,b){return this.cZ(a,b,null)},
jg:function(){return P.a_(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bH:function(a){this.r=a
return this},
by:function(a,b){return C.c.by(this.e,b.e)},
i:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
h2:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.F("String given to choice cannot be null."))
this.e=C.c.dd(a)
this.d=C.c.gD(a)
this.r=f
this.b=!1
this.c=!1},
$isZ:1,
$asZ:function(){return[L.aa]},
A:{
eK:function(a,b,c,d,e,f,g){var z=new L.aa(!1,null,null,null,null,e,null,d,g)
z.h2(a,!1,!1,d,e,f,g)
return z}}},eL:{"^":"fc;a,b",
gw:function(a){return this.b.length},
h:function(a,b){return this.b[b]},
t:function(a,b,c){this.b[b]=c},
i2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
v=a[0]
if(v!=null&&!!J.n(v).$isbA)try{this.a=v.$0()}catch(u){z=H.A(u)
v=M.eE(J.J(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.O,P.as]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aI(y,"string")!=null&&!!J.n(J.aI(y,"string")).$isbA)try{x=J.aI(y,"string").$0()}catch(u){w=H.A(u)
v=M.eE(J.J(w))
throw H.c(v)}else x=""
r=x
q=J.aI(y,"goto")
p=H.hY(J.aI(y,"script"),t)
o=new L.aa(!1,null,null,null,null,null,null,q,J.aI(y,"submenu"))
if(r==null)H.e(P.F("String given to choice cannot be null."))
o.e=J.bu(r).dd(r)
o.d=C.c.gD(r)
o.r=p
o.b=!1
o.c=!1
C.a.u(v,o)}},
hZ:function(a,b,c,d,e,f,g){if(b instanceof L.aa)C.a.u(this.b,b)
else if(typeof b==="string")C.a.u(this.b,L.eK(b,!1,!1,e,null,f,g))
else throw H.c(P.F("To add a choice to choices, one must provide either a new Choice element or a String."))},
u:function(a,b){return this.hZ(a,b,!1,!1,null,null,null)},
jh:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.j(z,0)
x=P.Q(new H.I(z,new L.jF(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.o(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.jG(w))
return w},
dc:function(){return this.jh(null,null,null,null)},
i:function(a){var z=this.b
return new H.ak(z,new L.jH(),[H.j(z,0),null]).cp(0,", ")},
$asfc:function(){return[L.aa]},
$asfl:function(){return[L.aa]},
$asM:function(){return[L.aa]},
$asaj:function(){return[L.aa]}},jF:{"^":"a:0;a,b,c",
$1:function(a){return a.cZ(this.b,this.a,this.c)}},jG:{"^":"a:0;a",
$1:function(a){H.b(a)
J.iA(this.a.b,a.jg())
a.a=!0}},jH:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cT:{"^":"d;a,bc:b<"},oa:{"^":"d;a",
m:function(a,b,c){this.a.t(0,b,c)},
O:function(){var z=new H.P(0,null,null,null,null,null,0,[P.l,P.d])
this.a.Z(0,new Z.ob(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},ob:{"^":"a:39;a",
$2:function(a,b){this.a.t(0,a,P.a_(["show",b.a,"string",b.b]))}},hg:{"^":"d;n:a<,be:b<,c,e5:d<,e,f,bc:r<",A:{
hh:function(a){var z,y,x,w,v
z=H.m(new Array(a.length),[Z.hg])
for(y=a.length,x=0,w=0;w<a.length;a.length===y||(0,H.ap)(a),++w){v=a[w]
z[x]=new Z.hg(v.h(0,"name"),v.h(0,"description"),v.h(0,"color"),v.h(0,"priority"),v.h(0,"show"),v.h(0,"notifyOnChange"),v.h(0,"string"));++x}C.a.bN(z,new Z.p0())
return z}}},p0:{"^":"a:5;",
$2:function(a,b){return b.ge5()-a.ge5()}},at:{"^":"d;n:a<,be:b<,c,d,e5:e<,f,r,x,i5:y<,eY:z<,$ti",
gal:function(){return this.f},
sal:function(a){if(!J.u(this.f,a)){this.f=a
this.y=!0
$.bL=!0}},
gbc:function(){return this.c.$1(this.f)},
O:function(){return P.a_(["name",this.a,"value",this.f,"show",this.r])},
fD:function(a){var z,y
this.sal(H.il(a.h(0,"value"),H.j(this,0)))
z=a.h(0,"show")
y=this.r
if(y==null?z!=null:y!==z){this.r=z
this.y=!0
$.bL=!0}},
$isdR:1,
A:{
bJ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cU()
y=z.ad(a)?H.aH(z.h(0,a),"$isat",[h],"$asat"):new Z.at(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.il(e,h)
y.r=g
z.t(0,a,y)
return y},
od:function(){var z,y
z=new Z.oa(new H.P(0,null,null,null,null,null,0,[P.l,Z.cT]))
y=$.$get$cU().gc_()
new H.I(y,new Z.oe(),[H.z(y,"D",0)]).Z(0,new Z.of(z))
$.bL=!1
return z},
bK:function(){var z=H.m([],[[P.H,P.l,P.d]])
$.$get$cU().gc_().Z(0,new Z.oc(z))
return z}}},oe:{"^":"a:0;",
$1:function(a){return a.gi5()}},of:{"^":"a:25;a",
$1:function(a){var z,y
z=a.r
y=a.f
y=a.c.$1(y)
a.y=!1
this.a.a.t(0,a.a,new Z.cT(z,y))}},oc:{"^":"a:25;a",
$1:function(a){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.l,P.d])
z.t(0,"name",a.a)
z.t(0,"description",a.b)
z.t(0,"color",a.d)
z.t(0,"priority",a.e)
z.t(0,"show",a.r)
a.x
z.t(0,"notifyOnChange",!0)
y=a.f
z.t(0,"string",a.c.$1(y))
this.a.push(z)}}}],["","",,N,{"^":"",dz:{"^":"d;n:a<,b,c,d,e,f",
gf5:function(){var z,y,x
z=this.b
y=z==null||z.a===""
x=this.a
return y?x:z.gf5()+"."+x},
gfa:function(){if($.i5){var z=this.b
if(z!=null)return z.gfa()}return $.r0},
iO:function(a,b,c,d,e){var z,y,x,w,v,u
x=a.b
if(x>=this.gfa().b){if(!!J.n(b).$isbA)b=b.$0()
w=b
if(typeof w!=="string")b=J.J(b)
if(d==null&&x>=$.uy.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.b(b)
throw H.c(x)}catch(v){z=H.A(v)
y=H.E(v)
d=y
if(c==null)c=z}this.gf5()
Date.now()
$.fd=$.fd+1
if($.i5)for(u=this;u!=null;)u=u.b
else $.$get$ff().f}},
T:function(a,b,c,d){return this.iO(a,b,c,d,null)},
A:{
bf:function(a){return $.$get$fe().iZ(a,new N.rJ(a))}}},rJ:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.c.cF(z,"."))H.e(P.F("name shouldn't start with a '.'"))
y=C.c.iL(z,".")
if(y===-1)x=z!==""?N.bf(""):null
else{x=N.bf(C.c.aw(z,0,y))
z=C.c.bh(z,y+1)}w=new H.P(0,null,null,null,null,null,0,[P.l,N.dz])
w=new N.dz(z,x,null,w,new P.hj(w,[null,null]),null)
if(x!=null)x.d.t(0,z,w)
return w}},aU:{"^":"d;n:a<,al:b<",
S:function(a,b){if(b==null)return!1
return b instanceof N.aU&&this.b===b.b},
bL:function(a,b){return C.i.bL(this.b,b.gal())},
cB:function(a,b){return C.i.cB(this.b,b.gal())},
by:function(a,b){return this.b-b.b},
gD:function(a){return this.b},
i:function(a){return this.a},
$isZ:1,
$asZ:function(){return[N.aU]}}}],["","",,X,{"^":"",
bv:function(a){return X.d2(J.iC(a,0,new X.ub()))},
aW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d2:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
ub:{"^":"a:5;",
$2:function(a,b){return X.aW(a,J.f(b))}},
dH:{"^":"c4;a,$ti",
gal:function(){var z=this.a
if(z==null)throw H.c(new P.t("value called on absent Optional."))
return z},
aI:function(a){var z=this.a
return z==null?a:z},
ga5:function(a){var z=this.a
if(z!=null){z=H.m([z],this.$ti)
z=new J.b3(z,1,0,null,[H.j(z,0)])}else z=C.N
return z},
gD:function(a){return J.f(this.a)},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dH){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
i:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
h4:function(a,b){if(this.a==null)throw H.c(P.F("Must not be null."))},
A:{
fp:function(a,b){var z=new X.dH(a,[b])
z.h4(a,b)
return z}}}}],["","",,U,{"^":"",cO:{"^":"d;a,b",
i:function(a){return this.b}},cd:{"^":"d;a,jl:b<",
ge0:function(){return this.a===C.J},
i:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof U.cd)if(b.a===this.a){z=b.b
y=this.b
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z},
gD:function(a){return(this.b?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
x8:[function(a,b){var z,y,x,w,v
z=new D.lG(b,null,null,null,null,null,null)
y=$.fA
$.fA=y+1
x=new H.cb(y,null,!1)
w=init.globalState.d
w.dm(y,x)
w.ce()
w=new H.n5(x,null)
w.h6(x)
z.b=w
w=w.b
w.toString
new P.cX(w,[H.j(w,0)]).bo(z.ghE(),null,null,null)
b.F(new H.ch(z.b.a,init.globalState.d.a))
v=N.ns()
z.c=v
v.Q=z},"$2","hU",4,0,36]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f1.prototype
return J.lI.prototype}if(typeof a=="string")return J.c7.prototype
if(a==null)return J.f2.prototype
if(typeof a=="boolean")return J.f0.prototype
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.x=function(a){if(a==null)return a
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.W=function(a){if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.bV=function(a){if(typeof a=="number")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.el=function(a){if(typeof a=="number")return J.c6.prototype
if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.bu=function(a){if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.iw=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.el(a).aL(a,b)}
J.cs=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.bV(a).eg(a,b)}
J.u=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).S(a,b)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bV(a).cB(a,b)}
J.ix=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bV(a).bL(a,b)}
J.iy=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.el(a).bt(a,b)}
J.iz=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.bV(a).c0(a,b)}
J.aI=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.W(a).h(a,b)}
J.iA=function(a,b){return J.x(a).u(a,b)}
J.bw=function(a,b,c){return J.x(a).l(a,b,c)}
J.iB=function(a,b,c){return J.bu(a).cS(a,b,c)}
J.bx=function(a,b){return J.el(a).by(a,b)}
J.bX=function(a,b){return J.W(a).ag(a,b)}
J.ez=function(a,b){return J.x(a).ar(a,b)}
J.iC=function(a,b,c){return J.x(a).b7(a,b,c)}
J.f=function(a){return J.n(a).gD(a)}
J.eA=function(a){return J.W(a).ga4(a)}
J.ar=function(a){return J.x(a).ga5(a)}
J.b0=function(a){return J.W(a).gw(a)}
J.iD=function(a){return J.n(a).geb(a)}
J.iE=function(a,b){return J.W(a).b0(a,b)}
J.eB=function(a,b){return J.x(a).bp(a,b)}
J.iF=function(a,b,c){return J.bu(a).fc(a,b,c)}
J.iG=function(a,b,c){return J.bu(a).j2(a,b,c)}
J.iH=function(a){return J.bV(a).jb(a)}
J.iI=function(a,b){return J.x(a).em(a,b)}
J.eC=function(a,b){return J.bu(a).cF(a,b)}
J.iJ=function(a){return J.x(a).fz(a)}
J.J=function(a){return J.n(a).i(a)}
J.iK=function(a,b){return J.bV(a).ba(a,b)}
J.iL=function(a,b){return J.x(a).bJ(a,b)}
I.aR=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.Q=J.aS.prototype
C.a=J.c5.prototype
C.R=J.f0.prototype
C.i=J.f1.prototype
C.S=J.f2.prototype
C.m=J.c6.prototype
C.c=J.c7.prototype
C.K=new A.ai(0,0,0)
C.L=new A.ai(-1/0,-1/0,-1/0)
C.M=new A.cu(-10,0,100)
C.N=new H.kI([null])
C.O=new P.mA()
C.x=new P.pX()
C.P=new P.qe()
C.k=new P.qs()
C.E=new P.bz(0)
C.F=new U.bB(0,"ItemType.fist")
C.y=new U.bB(1,"ItemType.shield")
C.v=new U.bB(2,"ItemType.spear")
C.z=new U.bB(3,"ItemType.sword")
C.T=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.A=new P.lN(null,null)
C.U=new P.lP(null)
C.V=new P.lQ(null,null)
C.W=new O.lY(0,"KnownToMode.all")
C.l=new N.aU("FINER",400)
C.j=new N.aU("FINEST",300)
C.q=new N.aU("FINE",500)
C.B=new N.aU("INFO",800)
C.X=new N.aU("OFF",2000)
C.C=new N.aU("SEVERE",1000)
C.D=new N.aU("WARNING",900)
C.J=new U.cO(0,"Result.success")
C.a5=new U.cO(1,"Result.failure")
C.a6=new U.cO(2,"Result.criticalSuccess")
C.a7=new U.cO(3,"Result.criticalFailure")
C.Y=I.aR([C.J,C.a5,C.a6,C.a7])
C.Z=I.aR(['Briana spits on the floor. "Can\'t wait to smell something other than \n  orc sweat and piss."\n  \n  _"You come from the country, then?"_\n  \n  "Not really. I had been living in Fort Ironcast the last five year."\n  \n  _"How does Fort Ironcast smell like?"_ \n  \n  Briana frowns. "Mostly human sweat and piss."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper.\n  \n  "You know, I _have_ a right to hate orcs." \n  \n  _"I did not know people needed to have a right to hate them, to be honest."_ \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get\n  my head smashed in by some random orc patrol.\""])
C.a_=I.aR(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a0=I.aR([C.F])
C.a1=I.aR([C.y])
C.G=I.aR([C.v])
C.r=I.aR([C.z])
C.e=I.aR([])
C.a2=new H.jQ(0,{},C.e,[null,null])
C.a3=new X.dH(null,[P.L])
C.d=new R.dK(0,"Pose.standing")
C.h=new R.dK(1,"Pose.offBalance")
C.b=new R.dK(2,"Pose.onGround")
C.n=new K.dL(0,"Predetermination.none")
C.t=new K.dL(1,"Predetermination.successGuaranteed")
C.o=new K.dL(2,"Predetermination.failureGuaranteed")
C.w=new Y.c8("he","him","his","himself")
C.p=new Y.c8("it","it","its","itself")
C.a4=new Y.c8("she","her","her","herself")
C.H=new Y.c8("they","them","their","themselves")
C.I=new Y.c8("you","you","your","yourself")
C.f=new Q.na(0,"Resource.stamina")
C.a8=H.hT("as")
C.u=H.hT("dynamic")
C.a9=new P.bO(null,2)
$.fA=1
$.fu="$cachedFunction"
$.fv="$cachedInvocation"
$.aJ=0
$.by=null
$.eG=null
$.bp=null
$.bR=null
$.bS=null
$.eb=!1
$.p=C.k
$.eT=0
$.cj=0
$.em=null
$.hA=!1
$.hC=!1
$.i6=!0
$.bL=!1
$.i5=!1
$.uy=C.X
$.r0=C.B
$.fd=0
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
I.$lazy(y,x,w)}})(["eY","$get$eY",function(){return H.lE()},"eZ","$get$eZ",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eT
$.eT=z+1
z="expando$key$"+z}return new P.kO(null,z,[P.q])},"h5","$get$h5",function(){return H.aL(H.cW({
toString:function(){return"$receiver$"}}))},"h6","$get$h6",function(){return H.aL(H.cW({$method$:null,
toString:function(){return"$receiver$"}}))},"h7","$get$h7",function(){return H.aL(H.cW(null))},"h8","$get$h8",function(){return H.aL(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hc","$get$hc",function(){return H.aL(H.cW(void 0))},"hd","$get$hd",function(){return H.aL(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ha","$get$ha",function(){return H.aL(H.hb(null))},"h9","$get$h9",function(){return H.aL(function(){try{null.$method$}catch(z){return z.message}}())},"hf","$get$hf",function(){return H.aL(H.hb(void 0))},"he","$get$he",function(){return H.aL(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e_","$get$e_",function(){return P.pF()},"be","$get$be",function(){var z,y
z=P.as
y=new P.K(0,P.ph(),null,[z])
y.hd(null,z)
return y},"bT","$get$bT",function(){return[]},"S","$get$S",function(){return new Y.rb()},"d6","$get$d6",function(){return new K.U("fist",P.az(C.a0,null))},"bF","$get$bF",function(){return N.bf("PlannerRecommendation")},"hW","$get$hW",function(){return new K.rc()},"ej","$get$ej",function(){var z=$.$get$hW()
return K.ab("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a8","$get$a8",function(){return P.dP(null)},"bH","$get$bH",function(){return P.dP(null)},"i8","$get$i8",function(){return N.bf("Storyline")},"fU","$get$fU",function(){return P.bh("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bs","$get$bs",function(){return L.dZ(new L.rI())},"aG","$get$aG",function(){return L.dZ(new L.rf())},"d9","$get$d9",function(){return L.dZ(new L.rH())},"dI","$get$dI",function(){return new F.mF("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eh","$get$eh",function(){return Y.c0(!1,"balance",!0,C.p,$.$get$aG())},"ib","$get$ib",function(){return Y.c0(!1,"pounding",!1,C.p,$.$get$aG())},"fB","$get$fB",function(){return new B.n8("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fF","$get$fF",function(){return new O.no(null,!1,!0,!1,null,null)},"fT","$get$fT",function(){return new Q.o6(null,!1,!0,!0,C.f,null)},"hi","$get$hi",function(){return new M.p1("",!0,C.f,!1,!0,null)},"hB","$get$hB",function(){return P.dP(null)},"eF","$get$eF",function(){return new Z.ji(!1,!0,!1,null,null)},"ip","$get$ip",function(){return Y.c0(!1,"swing",!0,C.p,$.$get$aG())},"io","$get$io",function(){return Y.c0(!1,"swing",!0,C.p,$.$get$aG())},"im","$get$im",function(){return Y.c0(!1,"swing",!0,C.p,$.$get$aG())},"fr","$get$fr",function(){return X.fp(0,P.L)},"fs","$get$fs",function(){return X.fp(1,P.L)},"fN","$get$fN",function(){return new D.o1(!1,!1,!0,null,null)},"co","$get$co",function(){return G.oD(!1,!0,"Orcthorn",!0,2,2)},"ea","$get$ea",function(){return Z.o5(!1,!1,"spear",!1,1)},"eg","$get$eg",function(){return new O.p3(1e4)},"hX","$get$hX",function(){return K.ab("exit_from_bloodrock",new V.rD(),new V.rE(),null,null,H.m([new Q.r("__END_OF_ROAM__","","N/A",null)],[Q.r]),"ground")},"i4","$get$i4",function(){return K.ab("guardpost_above_church",new V.rB(),new V.rC(),null,null,H.m([new Q.r("underground_church","Descend toward the Underground Church","You take the passage leading down toward the temple.",null),new Q.r("smelter","Go to the smelter","You take the passage down. The temperature gradually rises until you see an opening.",null)],[Q.r]),"ground")},"eV","$get$eV",function(){return new V.lh("Go to the Upper Door","guardpost_above_church_enter_tunnel_with_cancel",!0,null)},"eX","$get$eX",function(){return new V.li("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"i7","$get$i7",function(){return K.ab("just_after_agruth_fight",new V.ry(),new V.rA(),null,null,H.m([],[Q.r]),"ground")},"fi","$get$fi",function(){return new V.mg('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fj","$get$fj",function(){return new V.mh('"Savior"',"name_agruth_sword_redemption",!0,null)},"fh","$get$fh",function(){return new V.mf("No name","name_agruth_sword_nothing",!0,null)},"id","$get$id",function(){return K.ab("slave_quarters_passage",new V.rw(),new V.rx(),O.wf(),null,H.m([new Q.r("cave_with_agruth","Go back to the cave where Agruth's corpse lies","You back away from the door, and go back to where you left Agruth's body.",null),new Q.r("slave_quarters","Go further toward the Gate of Screams","You start down the slope of the passage, toward the heart of the slave\u2019s quarters and the Gate of Screams beyond. Briana tugs at your hand.",null),new Q.r("orcthorn_room","Open the door","You open the door.",null)],[Q.r]),"ground")},"fM","$get$fM",function(){return new V.o0("Examine the door","slave_quarters_passage_examine_door",!0,null)},"hO","$get$hO",function(){return K.ab("cave_with_agruth_pre",new V.ru(),new V.rv(),null,null,H.m([new Q.r("cave_with_agruth","","You look around.",null)],[Q.r]),"ground")},"hN","$get$hN",function(){return K.ab("cave_with_agruth",new V.rs(),new V.rt(),null,null,H.m([new Q.r("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.r("war_forge","Go to the war forges","You sneak through the black passage, toward a sound of hundreds of anvils.",null),new Q.r("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start toward the slave quarters.",null)],[Q.r]),"ground")},"fG","$get$fG",function(){return new V.nO("Search Agruth","search_agruth",!0,null)},"ia","$get$ia",function(){return K.ab("orcthorn_room",new V.rq(),new V.rr(),O.we(),null,H.m([new Q.r("slave_quarters_passage","Exit the room","You leave through the door and find yourself back in the passage to the slave quarters.",null)],[Q.r]),"ground")},"fZ","$get$fZ",function(){return new V.oL("Search for Orcthorn","take_orcthorn",!0,null)},"ic","$get$ic",function(){return K.ab("slave_quarters",new V.rn(),new V.rp(),null,null,H.m([new Q.r("slave_quarters_passage","Go back","You nod, and then start carefully backing out through the passage.",null)],[Q.r]),"ground")},"fL","$get$fL",function(){return new V.nZ("Continue","slave_quarters_continue",!0,null)},"ie","$get$ie",function(){return K.ab("smelter",new V.rl(),new V.rm(),null,null,H.m([new Q.r("war_forge","Go to the war forges","You walk through a short passage lined with stone, and toward the sound of hundreds of hammers clanging against anvils.",null),new Q.r("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.r]),"ground")},"fO","$get$fO",function(){return new V.o3("Look around","smelter_look_around",!0,null)},"fP","$get$fP",function(){return new V.o4("Throw spear at the ogre","smelter_throw_spear",!0,null)},"ig","$get$ig",function(){return K.ab("start_adventure",new V.rj(),new V.rk(),O.wc(),null,H.m([new Q.r("just_after_agruth_fight","","You look around. Fortunately, there\u2019s no one in sight.",null)],[Q.r]),"ground")},"h0","$get$h0",function(){return new V.oN("Talk to Briana","talk_to_briana_1",!0,null)},"h1","$get$h1",function(){return new V.oO("Ask Briana about her capture","talk_to_briana_2",!0,null)},"h2","$get$h2",function(){return new V.oP("Ask Briana about Orcthorn","talk_to_briana_3",!0,null)},"ir","$get$ir",function(){return K.ab("tunnel",new V.t4(),new V.re(),O.wd(),null,H.m([new Q.r("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.r]),"ground")},"is","$get$is",function(){return K.ab("tunnel_cancel_chance",new V.t2(),new V.t3(),null,null,H.m([new Q.r("tunnel","Continue","You shake your head and continue through the passage. Soon, you find yourself climbing a steep, poorly lit stairway. Briana catches up with you quickly.",null),new Q.r("guardpost_above_church","Return","You nod and step back into the circular room.",null)],[Q.r]),"ground")},"it","$get$it",function(){return K.ab("underground_church",new V.rV(),new V.t1(),null,null,H.m([new Q.r("guardpost_above_church","Enter the upwards passage","You take the sloping passage and walk upward for a long time.",null),new Q.r("cave_with_agruth","Go back to the cave with Agruth's corpse","You walk slowly out of the church, back toward where you left Agruth's body.",null),new Q.r("underground_church_altar","Go towards the altar","You sneak toward the front of the temple, trying to stay in the shadows.",null)],[Q.r]),"ground")},"eS","$get$eS",function(){return new V.kN("Look around","examine_underground_church",!0,null)},"iu","$get$iu",function(){return K.ab("underground_church_altar",new V.rz(),new V.rK(),null,null,H.m([new Q.r("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, move back to the Church's entrance.",null)],[Q.r]),"ground")},"hk","$get$hk",function(){return new V.p5("Wait","wait_for_ritual",!0,null)},"h_","$get$h_",function(){return new V.oM("Take the spear","take_spear_in_underground_church",!0,null)},"iv","$get$iv",function(){return K.ab("war_forge",new V.rd(),new V.ro(),null,null,H.m([new Q.r("smelter","Go to smelter","You keep low, ascending the stairs. When you reach the top,  you feel a wave of hot air coming from a passage in the wall. You make your way through it.",null),new Q.r("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back toward where you left Agruth's body.",null)],[Q.r]),"ground")},"hl","$get$hl",function(){return new V.p6("Look around","war_forge_look_around",!0,null)},"hm","$get$hm",function(){return new V.p7("Watch the workers","war_forge_watch_workers",!0,null)},"hI","$get$hI",function(){return H.m([$.$get$hX(),$.$get$i4(),$.$get$i7(),$.$get$id(),$.$get$hO(),$.$get$hN(),$.$get$ia(),$.$get$ic(),$.$get$ie(),$.$get$ig(),$.$get$ir(),$.$get$is(),$.$get$it(),$.$get$iu(),$.$get$iv()],[K.cc])},"hH","$get$hH",function(){return H.m([$.$get$eV(),$.$get$eX(),$.$get$fi(),$.$get$fj(),$.$get$fh(),$.$get$fM(),$.$get$fG(),$.$get$fZ(),$.$get$fL(),$.$get$fO(),$.$get$fP(),$.$get$h0(),$.$get$h1(),$.$get$h2(),$.$get$eS(),$.$get$hk(),$.$get$h_(),$.$get$hl(),$.$get$hm()],[A.R])},"dc","$get$dc",function(){return P.oB("")},"cl","$get$cl",function(){var z=new O.mS(0,null,"PointsCounter")
z.h5()
return z},"bU","$get$bU",function(){return new L.eL(null,H.m([],[L.aa]))},"cr","$get$cr",function(){return H.f6(P.l,P.d)},"ck","$get$ck",function(){return P.b7(null,{func:1,ret:[P.O,P.as]})},"cA","$get$cA",function(){return P.bh("^\\s*<<<\\s*$",!0,!1)},"cU","$get$cU",function(){return H.f6(P.l,Z.at)},"ff","$get$ff",function(){return N.bf("")},"fe","$get$fe",function(){return P.fa(P.l,N.dz)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.l,args:[R.w,A.a3,Y.a1]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.v,args:[R.w]},{func:1,args:[,,]},{func:1,args:[R.w,A.a3,Y.a1]},{func:1,v:true},{func:1,v:true,args:[R.w,A.a3,Y.a1,R.w,S.ac]},{func:1,args:[P.q]},{func:1,ret:U.cF,args:[A.a3,F.G,[P.D,R.w]]},{func:1,ret:R.w,args:[A.a3]},{func:1,v:true,args:[R.w,A.a3,Y.a1,R.w,,]},{func:1,ret:P.l,args:[P.q]},{func:1,args:[U.b4]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d]},{func:1,ret:P.O},{func:1,ret:Y.ay,args:[P.q]},{func:1,ret:P.l,args:[P.l]},{func:1,args:[P.aX]},{func:1,args:[R.w]},{func:1,v:true,args:[P.d],opt:[P.bj]},{func:1,v:true,args:[P.l]},{func:1,ret:P.L,args:[A.ai]},{func:1,args:[Z.at]},{func:1,args:[,,,,]},{func:1,ret:Q.c3,args:[U.C]},{func:1,ret:P.ae,args:[R.w,R.w]},{func:1,args:[,P.bj]},{func:1,args:[P.L,R.w]},{func:1,ret:P.ae,args:[P.q]},{func:1,args:[P.l]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,ret:P.ae,args:[L.aa]},{func:1,v:true,args:[[P.M,P.l],P.fH]},{func:1,args:[L.aa]},{func:1,args:[P.l,,]},{func:1,args:[P.l,Z.cT]},{func:1,v:true,args:[P.d,P.bj]},{func:1,ret:L.aa,args:[P.l],named:{deferToChoiceList:P.ae,deferToEndOfPage:P.ae,goto:P.l,helpMessage:P.l,script:{func:1,ret:[P.O,P.as]},submenu:P.l}},{func:1,ret:P.q,args:[P.Z,P.Z]},{func:1,args:[P.bg]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:P.q,args:[P.q,P.q]},{func:1,args:[P.q,,]},{func:1,ret:P.l,args:[U.bB,P.l]},{func:1,args:[[P.M,Y.ah],Y.ah]},{func:1,ret:P.L,args:[A.cu]},{func:1,ret:Q.c1,args:[Q.r]},{func:1,ret:P.l,args:[Q.af]},{func:1,args:[,],opt:[,]},{func:1,args:[Y.ah]},{func:1,ret:[P.O,U.cd],args:[P.aX,P.l],named:{rerollEffectDescription:P.l,rerollable:P.ae}}]
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
if(x==y)H.w8(d||a)
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
Isolate.aR=a.aR
Isolate.bb=a.bb
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ih(X.hU(),b)},[])
else (function(b){H.ih(X.hU(),b)})([])})})()