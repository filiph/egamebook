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
if(b5.$isaR)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b4=function(){}
var dart=[["","",,H,{"^":"",vt:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aR:{"^":"d;",
t:function(a,b){return a===b},
gv:function(a){return H.aA(a)},
k:function(a){return H.cL(a)},
gbq:function(a){return new H.as(H.i_(a),null)}},
f2:{"^":"aR;",
k:function(a){return String(a)},
gv:function(a){return a?519018:218159},
gbq:function(a){return C.a6},
$isa_:1},
f4:{"^":"aR;",
t:function(a,b){return null==b},
k:function(a){return"null"},
gv:function(a){return 0},
gbq:function(a){return C.a4},
$isaq:1},
f7:{"^":"aR;",
gv:function(a){return 0},
gbq:function(a){return C.a3},
k:function(a){return String(a)},
$isf5:1},
vz:{"^":"f7;"},
bi:{"^":"f7;"},
c0:{"^":"aR;$ti",
fI:function(a,b){if(!!a.immutable$list)throw H.c(new P.Q(b))},
cH:function(a,b){if(!!a.fixed$length)throw H.c(new P.Q(b))},
q:function(a,b){this.cH(a,"add")
a.push(b)},
ku:function(a){this.cH(a,"removeLast")
if(a.length===0)throw H.c(H.aE(a,-1))
return a.pop()},
aa:function(a,b){var z
this.cH(a,"remove")
for(z=0;z<a.length;++z)if(J.i(a[z],b)){a.splice(z,1)
return!0}return!1},
iI:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sm(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c0:function(a,b){return new H.J(a,b,[H.m(a,0)])},
ar:function(a,b){var z
this.cH(a,"addAll")
for(z=J.aj(b);z.u();)a.push(z.gG())},
N:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aU:function(a,b){return new H.al(a,b,[H.m(a,0),null])},
dQ:function(a,b){return H.fV(a,b,null,H.m(a,0))},
bk:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
ba:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.ab())},
dr:function(a,b){return this.ba(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
geu:function(a){if(a.length>0)return a[0]
throw H.c(H.ab())},
gD:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ab())},
gc4:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.ab())
throw H.c(H.dp())},
aV:function(a,b,c,d,e){var z,y,x
this.fI(a,"setRange")
P.c6(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.f(P.a1(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f1())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bQ:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cn:function(a,b){var z
this.fI(a,"sort")
z=b==null?P.t3():b
H.ca(a,0,a.length-1,z)},
eV:function(a){return this.cn(a,null)},
bJ:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.i(a[z],b))return z
return-1},
aS:function(a,b){return this.bJ(a,b,0)},
a6:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
gL:function(a){return a.length===0},
gap:function(a){return a.length!==0},
k:function(a){return P.c_(a,"[","]")},
bC:function(a){return P.aZ(a,H.m(a,0))},
gX:function(a){return new J.b7(a,a.length,0,null,[H.m(a,0)])},
gv:function(a){return H.aA(a)},
gm:function(a){return a.length},
sm:function(a,b){this.cH(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cs(b,"newLength",null))
if(b<0)throw H.c(P.a1(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.f(new P.Q("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
a[b]=c},
$iscH:1,
$ascH:I.b4,
$isL:1,
$isW:1},
vs:{"^":"c0;$ti"},
b7:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.an(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c1:{"^":"aR;",
bx:function(a,b){var z
if(typeof b!=="number")throw H.c(H.R(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdt(b)
if(this.gdt(a)===z)return 0
if(this.gdt(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdt:function(a){return a===0?1/a<0:a<0},
hg:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.Q(""+a+".round()"))},
bZ:function(a,b){var z
if(b>20)throw H.c(P.a1(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdt(a))return"-"+z
return z},
kN:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a1(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cI(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.f(new P.Q("Unexpected toString result: "+z))
x=J.I(y)
z=x.i(y,1)
w=+x.i(y,3)
if(x.i(y,2)!=null){z+=x.i(y,2)
w-=x.i(y,2).length}return z+C.b.c2("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
eR:function(a){return-a},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a-b},
d1:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a/b},
c2:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a*b},
bG:function(a,b){return(a|0)===a?a/b|0:this.iR(a,b)},
iR:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.Q("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
di:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aP:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a<b},
b4:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a>b},
c1:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a<=b},
bK:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a>=b},
gbq:function(a){return C.a9},
$isK:1},
f3:{"^":"c1;",
gbq:function(a){return C.a8},
$isaO:1,
$isK:1,
$isu:1},
lm:{"^":"c1;",
gbq:function(a){return C.a7},
$isaO:1,
$isK:1},
c2:{"^":"aR;",
cI:function(a,b){if(b<0)throw H.c(H.aE(a,b))
if(b>=a.length)H.f(H.aE(a,b))
return a.charCodeAt(b)},
cq:function(a,b){if(b>=a.length)throw H.c(H.aE(a,b))
return a.charCodeAt(b)},
dk:function(a,b,c){if(c>b.length)throw H.c(P.a1(c,0,b.length,null,null))
return new H.qs(b,a,c)},
en:function(a,b){return this.dk(a,b,0)},
fZ:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a1(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cI(b,c+y)!==this.cq(a,y))return
return new H.fU(c,b,a)},
a4:function(a,b){if(typeof b!=="string")throw H.c(P.cs(b,null,null))
return a+b},
er:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bE(a,y-z)},
kw:function(a,b,c){H.bo(c)
return H.n(a,b,c)},
kx:function(a,b,c,d){H.bo(c)
P.mJ(d,0,a.length,"startIndex",null)
return H.ij(a,b,c,d)},
cS:function(a,b,c){return this.kx(a,b,c,0)},
hM:function(a,b,c){var z
if(c>a.length)throw H.c(P.a1(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iB(b,a,c)!=null},
d7:function(a,b){return this.hM(a,b,0)},
aE:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.f(H.R(c))
if(b<0)throw H.c(P.c5(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.c(P.c5(b,null,null))
if(c>a.length)throw H.c(P.c5(c,null,null))
return a.substring(b,c)},
bE:function(a,b){return this.aE(a,b,null)},
eN:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cq(z,0)===133){x=J.dq(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cI(z,w)===133?J.ln(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kO:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cq(z,0)===133?J.dq(z,1):0}else{y=J.dq(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c2:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.H)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bJ:function(a,b,c){var z
if(c>a.length)throw H.c(P.a1(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aS:function(a,b){return this.bJ(a,b,0)},
kc:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kb:function(a,b){return this.kc(a,b,null)},
jj:function(a,b,c){if(b==null)H.f(H.R(b))
if(c>a.length)throw H.c(P.a1(c,0,a.length,null,null))
return H.v2(a,b,c)},
a6:function(a,b){return this.jj(a,b,0)},
gL:function(a){return a.length===0},
gap:function(a){return a.length!==0},
bx:function(a,b){var z
if(typeof b!=="string")throw H.c(H.R(b))
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
gbq:function(a){return C.a5},
gm:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
return a[b]},
$iscH:1,
$ascH:I.b4,
$isq:1,
$isdL:1,
w:{
f6:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dq:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cq(a,b)
if(y!==32&&y!==13&&!J.f6(y))break;++b}return b},
ln:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cI(a,z)
if(y!==32&&y!==13&&!J.f6(y))break}return b}}}}],["","",,H,{"^":"",
hv:function(a){return a},
ab:function(){return new P.E("No element")},
dp:function(){return new P.E("Too many elements")},
f1:function(){return new P.E("Too few elements")},
ca:function(a,b,c,d){if(c-b<=32)H.fN(a,b,c,d)
else H.fM(a,b,c,d)},
fN:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.I(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a3(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.i(a,v))
w=v}y.n(a,w,x)}},
fM:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bG(c-b+1,6)
y=b+z
x=c-z
w=C.d.bG(b+c,2)
v=w-z
u=w+z
t=J.I(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.a3(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a3(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a3(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a3(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a3(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a3(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a3(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a3(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a3(d.$2(p,o),0)){n=o
o=p
p=n}t.n(a,y,s)
t.n(a,w,q)
t.n(a,x,o)
t.n(a,v,t.i(a,b))
t.n(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.i(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.t(i,0))continue
if(h.aP(i,0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.ah(i)
if(h.b4(i,0)){--l
continue}else{g=l-1
if(h.aP(i,0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(J.bQ(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(J.a3(d.$2(j,p),0))for(;!0;)if(J.a3(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=g
break}}e=!1}h=m-1
t.n(a,b,t.i(a,h))
t.n(a,h,r)
h=l+1
t.n(a,c,t.i(a,h))
t.n(a,h,p)
H.ca(a,b,m-2,d)
H.ca(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.i(d.$2(t.i(a,m),r),0);)++m
for(;J.i(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.i(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(J.i(d.$2(j,p),0))for(;!0;)if(J.i(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=g
break}}H.ca(a,m,l,d)}else H.ca(a,m,l,d)},
W:{"^":"y;$ti"},
aT:{"^":"W;$ti",
gX:function(a){return new H.dz(this,this.gm(this),0,null,[H.x(this,"aT",0)])},
N:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gm(this))throw H.c(new P.B(this))}},
gL:function(a){return this.gm(this)===0},
gD:function(a){if(this.gm(this)===0)throw H.c(H.ab())
return this.as(0,this.gm(this)-1)},
a6:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(J.i(this.as(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.B(this))}return!1},
ba:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.B(this))}return c.$0()},
cO:function(a,b){var z,y,x,w
z=this.gm(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gm(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gm(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
c0:function(a,b){return this.dT(0,b)},
aU:function(a,b){return new H.al(this,b,[H.x(this,"aT",0),null])},
bk:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gm(this))throw H.c(new P.B(this))}return y},
bB:function(a,b){var z,y,x,w
z=[H.x(this,"aT",0)]
if(b){y=H.r([],z)
C.a.sm(y,this.gm(this))}else{x=new Array(this.gm(this))
x.fixed$length=Array
y=H.r(x,z)}for(w=0;w<this.gm(this);++w){z=this.as(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
ck:function(a){return this.bB(a,!0)},
bC:function(a){var z,y
z=P.X(null,null,null,H.x(this,"aT",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.as(0,y))
return z}},
oq:{"^":"aT;a,b,c,$ti",
gii:function(){var z=J.aG(this.a)
return z},
giP:function(){var z,y
z=J.aG(this.a)
y=this.b
if(y>z)return z
return y},
gm:function(a){var z,y
z=J.aG(this.a)
y=this.b
if(y>=z)return 0
return z-y},
as:function(a,b){var z,y
z=this.giP()+b
if(!(b<0)){y=this.gii()
if(typeof y!=="number")return H.v(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cE(b,this,"index",null,null))
return J.eC(this.a,z)},
bB:function(a,b){var z,y,x,w,v,u,t,s,r
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
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gm(y)<w)throw H.c(new P.B(this))}return t},
hW:function(a,b,c,d){var z=this.b
if(z<0)H.f(P.a1(z,0,null,"start",null))},
w:{
fV:function(a,b,c,d){var z=new H.oq(a,b,c,[d])
z.hW(a,b,c,d)
return z}}},
dz:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gm(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.as(0,x);++this.c
return!0}},
dC:{"^":"y;a,b,$ti",
gX:function(a){return new H.lS(null,J.aj(this.a),this.b,this.$ti)},
gm:function(a){return J.aG(this.a)},
gL:function(a){return J.eD(this.a)},
gD:function(a){return this.b.$1(J.iy(this.a))},
$asy:function(a,b){return[b]},
w:{
bv:function(a,b,c,d){if(!!J.o(a).$isW)return new H.bs(a,b,[c,d])
return new H.dC(a,b,[c,d])}}},
bs:{"^":"dC;a,b,$ti",$isW:1,
$asW:function(a,b){return[b]}},
lS:{"^":"cG;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
$ascG:function(a,b){return[b]}},
al:{"^":"aT;a,b,$ti",
gm:function(a){return J.aG(this.a)},
as:function(a,b){return this.b.$1(J.eC(this.a,b))},
$asaT:function(a,b){return[b]},
$asW:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
J:{"^":"y;a,b,$ti",
gX:function(a){return new H.cW(J.aj(this.a),this.b,this.$ti)},
aU:function(a,b){return new H.dC(this,b,[H.m(this,0),null])}},
cW:{"^":"cG;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()}},
fF:{"^":"y;a,b,$ti",
gX:function(a){return new H.nx(J.aj(this.a),this.b,this.$ti)},
w:{
nw:function(a,b,c){if(!!J.o(a).$isW)return new H.kw(a,H.hv(b),[c])
return new H.fF(a,H.hv(b),[c])}}},
kw:{"^":"fF;a,b,$ti",
gm:function(a){var z=J.aG(this.a)-this.b
if(z>=0)return z
return 0},
$isW:1},
nx:{"^":"cG;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gG:function(){return this.a.gG()}},
kx:{"^":"d;$ti",
u:function(){return!1},
gG:function(){return}}}],["","",,H,{"^":"",
cg:function(a,b){var z=a.cK(b)
if(!init.globalState.d.cy)init.globalState.f.bp()
return z},
ig:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isL)throw H.c(P.C("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qe(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$f_()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.pO(P.b0(null,H.ce),0)
x=P.u
y.z=new H.P(0,null,null,null,null,null,0,[x,H.ea])
y.ch=new H.P(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qd()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.le,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qf)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.X(null,null,null,x)
v=new H.c7(0,null,!1)
u=new H.ea(y,new H.P(0,null,null,null,null,null,0,[x,H.c7]),w,init.createNewIsolate(),v,new H.b8(H.d8()),new H.b8(H.d8()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
w.q(0,0)
u.dU(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.av(a,{func:1,args:[,]}))u.cK(new H.ur(z,a))
else if(H.av(a,{func:1,args:[,,]}))u.cK(new H.us(z,a))
else u.cK(a)
init.globalState.f.bp()},
li:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lj()
return},
lj:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.Q("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.Q('Cannot extract URI from "'+z+'"'))},
le:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cY(!0,[]).bS(b.data)
y=J.I(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cY(!0,[]).bS(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cY(!0,[]).bS(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.X(null,null,null,q)
o=new H.c7(0,null,!1)
n=new H.ea(y,new H.P(0,null,null,null,null,null,0,[q,H.c7]),p,init.createNewIsolate(),o,new H.b8(H.d8()),new H.b8(H.d8()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
p.q(0,0)
n.dU(0,o)
init.globalState.f.a.ay(new H.ce(n,new H.lf(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bp()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").E(y.i(z,"msg"))
init.globalState.f.bp()
break
case"close":init.globalState.ch.aa(0,$.$get$f0().i(0,a))
a.terminate()
init.globalState.f.bp()
break
case"log":H.ld(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ac(["command","print","msg",z])
q=new H.bk(!0,P.bJ(null,P.u)).be(q)
y.toString
self.postMessage(q)}else P.et(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
ld:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ac(["command","log","msg",a])
x=new H.bk(!0,P.bJ(null,P.u)).be(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cB(z)
throw H.c(y)}},
lg:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fq=$.fq+("_"+y)
$.fr=$.fr+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.cf(y,x),w,z.r])
x=new H.lh(a,b,c,d,z)
if(e===!0){z.fE(w,w)
init.globalState.f.a.ay(new H.ce(z,x,"start isolate"))}else x.$0()},
qJ:function(a){return new H.cY(!0,[]).bS(new H.bk(!1,P.bJ(null,P.u)).be(a))},
ur:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
us:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qe:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",w:{
qf:function(a){var z=P.ac(["command","print","msg",a])
return new H.bk(!0,P.bJ(null,P.u)).be(z)}}},
ea:{"^":"d;j:a<,b,c,k9:d<,jl:e<,f,r,x,cN:y<,z,Q,ch,cx,cy,db,dx",
fE:function(a,b){if(!this.f.t(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cD()},
kv:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aa(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fC(x)}this.y=!1}this.cD()},
j8:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ks:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.f(new P.Q("removeRange"))
P.c6(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hF:function(a,b){if(!this.r.t(0,a))return
this.db=b},
jJ:function(a,b,c){var z=J.o(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.ay(new H.q4(a,c))},
jI:function(a,b){var z
if(!this.r.t(0,a))return
z=J.o(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.eC()
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.ay(this.gka())},
jK:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.et(a)
if(b!=null)P.et(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ag(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.E(y)},
cK:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jK(w,v)
if(this.db===!0){this.eC()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gk9()
if(this.cx!=null)for(;t=this.cx,!t.gL(t);)this.cx.dC().$0()}return y},
cb:function(a){return this.b.i(0,a)},
dU:function(a,b){var z=this.b
if(z.a7(a))throw H.c(P.cB("Registry: ports must be registered only once."))
z.n(0,a,b)},
cD:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eC()},
eC:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b3(0)
for(z=this.b,y=z.gcl(),y=y.gX(y);y.u();)y.gG().ia()
z.b3(0)
this.c.b3(0)
init.globalState.z.aa(0,this.a)
this.dx.b3(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.E(z[v])}this.ch=null}},"$0","gka",0,0,6]},
q4:{"^":"a:6;a,b",
$0:function(){this.a.E(this.b)}},
pO:{"^":"d;a,b",
jq:function(){var z=this.a
if(z.b===z.c)return
return z.dC()},
hj:function(){var z,y,x
z=this.jq()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a7(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gL(y)}else y=!1
else y=!1
else y=!1
if(y)H.f(P.cB("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gL(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ac(["command","close"])
x=new H.bk(!0,new P.hp(0,null,null,null,null,null,0,[null,P.u])).be(x)
y.toString
self.postMessage(x)}return!1}z.kq()
return!0},
fq:function(){if(self.window!=null)new H.pP(this).$0()
else for(;this.hj(););},
bp:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fq()
else try{this.fq()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ac(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bk(!0,P.bJ(null,P.u)).be(v)
w.toString
self.postMessage(v)}}},
pP:{"^":"a:6;a",
$0:function(){if(!this.a.hj())return
P.oS(C.w,this)}},
ce:{"^":"d;a,b,c",
kq:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cK(this.b)}},
qd:{"^":"d;"},
lf:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.lg(this.a,this.b,this.c,this.d,this.e,this.f)}},
lh:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.av(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.av(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cD()}},
hj:{"^":"d;"},
cf:{"^":"hj;b,a",
E:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gfg())return
x=H.qJ(a)
if(z.gjl()===y){y=J.I(x)
switch(y.i(x,0)){case"pause":z.fE(y.i(x,1),y.i(x,2))
break
case"resume":z.kv(y.i(x,1))
break
case"add-ondone":z.j8(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.ks(y.i(x,1))
break
case"set-errors-fatal":z.hF(y.i(x,1),y.i(x,2))
break
case"ping":z.jJ(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.jI(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.aa(0,y)
break}return}init.globalState.f.a.ay(new H.ce(z,new H.qh(this,x),"receive"))},
t:function(a,b){if(b==null)return!1
return b instanceof H.cf&&J.i(this.b,b.b)},
gv:function(a){return this.b.ge6()}},
qh:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfg())z.i1(this.b)}},
ec:{"^":"hj;b,c,a",
E:function(a){var z,y,x
z=P.ac(["command","message","port",this,"msg",a])
y=new H.bk(!0,P.bJ(null,P.u)).be(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.ec&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eS()
y=this.a
if(typeof y!=="number")return y.eS()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
c7:{"^":"d;e6:a<,b,fg:c<",
ia:function(){this.c=!0
this.b=null},
bi:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aa(0,y)
z.c.aa(0,y)
z.cD()},
i1:function(a){if(this.c)return
this.b.$1(a)},
$ismK:1},
mL:{"^":"af;a,b",
aB:function(a,b,c,d){var z=this.b
z.toString
return new P.cX(z,[H.m(z,0)]).aB(a,b,c,d)},
eF:function(a,b,c){return this.aB(a,null,b,c)},
bi:[function(){this.a.bi()
this.b.bi()},"$0","gjh",0,0,6],
hU:function(a){var z=new P.qw(null,0,null,null,null,null,this.gjh(),[null])
this.b=z
this.a.b=z.giZ(z)},
$asaf:I.b4},
oO:{"^":"d;a,b,c",
hX:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ay(new H.ce(y,new H.oQ(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d5(new H.oR(this,b),0),a)}else throw H.c(new P.Q("Timer greater than 0."))},
w:{
oP:function(a,b){var z=new H.oO(!0,!1,null)
z.hX(a,b)
return z}}},
oQ:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
oR:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b8:{"^":"d;e6:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.kW()
z=C.j.di(z,0)^C.j.bG(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b8){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bk:{"^":"d;a,b",
be:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gm(z))
z=J.o(a)
if(!!z.$iscH)return this.hB(a)
if(!!z.$islb){x=this.ghy()
z=a.gc9()
z=H.bv(z,x,H.x(z,"y",0),null)
z=P.T(z,!0,H.x(z,"y",0))
w=a.gcl()
w=H.bv(w,x,H.x(w,"y",0),null)
return["map",z,P.T(w,!0,H.x(w,"y",0))]}if(!!z.$isf5)return this.hC(a)
if(!!z.$isaR)this.hm(a)
if(!!z.$ismK)this.cY(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscf)return this.hD(a)
if(!!z.$isec)return this.hE(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cY(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb8)return["capability",a.a]
if(!(a instanceof P.d))this.hm(a)
return["dart",init.classIdExtractor(a),this.hA(init.classFieldsExtractor(a))]},"$1","ghy",2,0,0],
cY:function(a,b){throw H.c(new P.Q((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hm:function(a){return this.cY(a,null)},
hB:function(a){var z=this.hz(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cY(a,"Can't serialize indexable: ")},
hz:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.be(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hA:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.be(a[z]))
return a},
hC:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cY(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.be(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hE:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hD:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ge6()]
return["raw sendport",a]}},
cY:{"^":"d;a,b",
bS:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.C("Bad serialized message: "+H.b(a)))
switch(C.a.geu(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.r(this.cJ(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.r(this.cJ(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cJ(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cJ(x),[null])
y.fixed$length=Array
return y
case"map":return this.jt(a)
case"sendport":return this.ju(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.js(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b8(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cJ(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjr",2,0,0],
cJ:function(a){var z,y,x
z=J.I(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.n(a,y,this.bS(z.i(a,y)));++y}return a},
jt:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.az()
this.b.push(w)
y=J.eE(y,this.gjr()).ck(0)
for(z=J.I(y),v=J.I(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.e(y,u)
w.n(0,y[u],this.bS(v.i(x,u)))}return w},
ju:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.cb(w)
if(u==null)return
t=new H.cf(u,x)}else t=new H.ec(y,w,x)
this.b.push(t)
return t},
js:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.v(t)
if(!(u<t))break
w[z.i(y,u)]=this.bS(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
jC:function(){throw H.c(new P.Q("Cannot modify unmodifiable Map"))},
tD:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.R(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
by:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.J||!!J.o(a).$isbi){v=C.M(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cq(w,0)===36)w=C.b.bE(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d7(H.ck(a),0,null),init.mangledGlobalNames)},
cL:function(a){return"Instance of '"+H.by(a)+"'"},
am:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.di(z,10))>>>0,56320|z&1023)}throw H.c(P.a1(a,0,1114111,null,null))},
bd:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mC:function(a){var z=H.bd(a).getFullYear()+0
return z},
mA:function(a){var z=H.bd(a).getMonth()+1
return z},
mw:function(a){var z=H.bd(a).getDate()+0
return z},
mx:function(a){var z=H.bd(a).getHours()+0
return z},
mz:function(a){var z=H.bd(a).getMinutes()+0
return z},
mB:function(a){var z=H.bd(a).getSeconds()+0
return z},
my:function(a){var z=H.bd(a).getMilliseconds()+0
return z},
dO:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.R(a))
return a[b]},
fs:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.R(a))
a[b]=c},
v:function(a){throw H.c(H.R(a))},
e:function(a,b){if(a==null)J.aG(a)
throw H.c(H.aE(a,b))},
aE:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aX(!0,b,"index",null)
z=J.aG(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.cE(b,a,"index",null,z)
return P.c5(b,"index",null)},
R:function(a){return new P.aX(!0,a,null,null)},
d3:function(a){if(typeof a!=="number")throw H.c(H.R(a))
return a},
r3:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.R(a))
return a},
bo:function(a){if(typeof a!=="string")throw H.c(H.R(a))
return a},
c:function(a){var z
if(a==null)a=new P.cJ()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.io})
z.name=""}else z.toString=H.io
return z},
io:function(){return J.h(this.dartException)},
f:function(a){throw H.c(a)},
an:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.v9(a)
if(a==null)return
if(a instanceof H.dk)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.di(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dt(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fh(v,null))}}if(a instanceof TypeError){u=$.$get$h2()
t=$.$get$h3()
s=$.$get$h4()
r=$.$get$h5()
q=$.$get$h9()
p=$.$get$ha()
o=$.$get$h7()
$.$get$h6()
n=$.$get$hc()
m=$.$get$hb()
l=u.bl(y)
if(l!=null)return z.$1(H.dt(y,l))
else{l=t.bl(y)
if(l!=null){l.method="call"
return z.$1(H.dt(y,l))}else{l=s.bl(y)
if(l==null){l=r.bl(y)
if(l==null){l=q.bl(y)
if(l==null){l=p.bl(y)
if(l==null){l=o.bl(y)
if(l==null){l=r.bl(y)
if(l==null){l=n.bl(y)
if(l==null){l=m.bl(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fh(y,l==null?null:l.method))}}return z.$1(new H.oW(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fO()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aX(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fO()
return a},
A:function(a){var z
if(a instanceof H.dk)return a.b
if(a==null)return new H.hs(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hs(a,null)},
tR:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aA(a)},
to:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
tI:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cg(b,new H.tJ(a))
case 1:return H.cg(b,new H.tK(a,d))
case 2:return H.cg(b,new H.tL(a,d,e))
case 3:return H.cg(b,new H.tM(a,d,e,f))
case 4:return H.cg(b,new H.tN(a,d,e,f,g))}throw H.c(P.cB("Unsupported number of arguments for wrapped closure"))},
d5:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.tI)
a.$identity=z
return z},
jy:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isL){z.$reflectionInfo=c
x=H.mN(z).r}else x=c
w=d?Object.create(new H.nX().constructor.prototype):Object.create(new H.db(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aH
$.aH=J.ao(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eQ(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.tD,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eL:H.dc
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eQ(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jv:function(a,b,c,d){var z=H.dc
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eQ:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jx(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jv(y,!w,z,b)
if(y===0){w=$.aH
$.aH=J.ao(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.br
if(v==null){v=H.cv("self")
$.br=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aH
$.aH=J.ao(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.br
if(v==null){v=H.cv("self")
$.br=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jw:function(a,b,c,d){var z,y
z=H.dc
y=H.eL
switch(b?-1:a){case 0:throw H.c(new H.mY("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jx:function(a,b){var z,y,x,w,v,u,t,s
z=H.jm()
y=$.eK
if(y==null){y=H.cv("receiver")
$.eK=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jw(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aH
$.aH=J.ao(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aH
$.aH=J.ao(u,1)
return new Function(y+H.b(u)+"}")()},
el:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jy(a,b,z,!!d,e,f)},
tX:function(a,b){var z=J.I(b)
throw H.c(H.cx(H.by(a),z.aE(b,3,z.gm(b))))},
a6:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.tX(a,b)},
eo:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
av:function(a,b){var z
if(a==null)return!1
z=H.eo(a)
return z==null?!1:H.es(z,b)},
hU:function(a,b){var z,y
if(a==null)return a
if(H.av(a,b))return a
z=H.V(b,null)
y=H.eo(a)
throw H.c(H.cx(y!=null?H.V(y,null):H.by(a),z))},
v7:function(a){throw H.c(new P.jP(a))},
d8:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b3:function(a){return new H.as(a,null)},
r:function(a,b){a.$ti=b
return a},
ck:function(a){if(a==null)return
return a.$ti},
hZ:function(a,b){return H.eA(a["$as"+H.b(b)],H.ck(a))},
x:function(a,b,c){var z=H.hZ(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.ck(a)
return z==null?null:z[b]},
V:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d7(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.V(z,b)
return H.qO(a,b)}return"unknown-reified-type"},
qO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.V(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.V(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.V(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tn(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.V(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d7:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.A=v+", "
u=a[y]
if(u!=null)w=!1
v=z.A+=H.V(u,c)}return w?"":"<"+z.k(0)+">"},
i_:function(a){var z,y
if(a instanceof H.a){z=H.eo(a)
if(z!=null)return H.V(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.d7(a.$ti,0,null)},
eA:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aN:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ck(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hK(H.eA(y[d],z),c)},
aF:function(a,b,c,d){if(a==null)return a
if(H.aN(a,b,c,d))return a
throw H.c(H.cx(H.by(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d7(c,0,null),init.mangledGlobalNames)))},
hK:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ai(a[y],b[y]))return!1
return!0},
b2:function(a,b,c){return a.apply(b,H.hZ(b,c))},
d4:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="aq"
if(b==null)return!0
z=H.ck(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.es(x.apply(a,null),b)}return H.ai(y,b)},
ik:function(a,b){if(a!=null&&!H.d4(a,b))throw H.c(H.cx(H.by(a),H.V(b,null)))
return a},
ai:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aq")return!0
if('func' in b)return H.es(a,b)
if('func' in a)return b.builtin$cls==="bt"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.V(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hK(H.eA(u,z),x)},
hJ:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.ai(z,v)||H.ai(v,z)))return!1}return!0},
qY:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.ai(v,u)||H.ai(u,v)))return!1}return!0},
es:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.ai(z,y)||H.ai(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hJ(x,w,!1))return!1
if(!H.hJ(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ai(o,n)||H.ai(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ai(o,n)||H.ai(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ai(o,n)||H.ai(n,o)))return!1}}return H.qY(a.named,b.named)},
v2:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdr){z=C.b.bE(a,c)
return b.b.test(z)}else{z=z.en(b,C.b.bE(a,c))
return!z.gL(z)}}},
v4:function(a,b,c,d){var z,y,x
z=b.fa(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.ez(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bo(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
vN:[function(a){return a},"$1","hw",2,0,22],
v3:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdL)throw H.c(P.cs(b,"pattern","is not a Pattern"))
for(z=z.en(b,a),z=new H.hh(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hw().$1(C.b.aE(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hw().$1(C.b.bE(a,y)))
return z.charCodeAt(0)==0?z:z},
ij:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.ez(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdr)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.v4(a,b,c,d)
if(b==null)H.f(H.R(b))
y=y.dk(b,a,d)
x=y.gX(y)
if(!x.u())return a
w=x.gG()
y=w.geW()
v=w.gfO()
H.bo(c)
u=P.c6(y,v,a.length,null,null,null)
H.r3(u)
return H.ez(a,y,u,c)},
ez:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jB:{"^":"d;$ti",
gL:function(a){return this.gm(this)===0},
gap:function(a){return this.gm(this)!==0},
k:function(a){return P.dD(this)},
n:function(a,b,c){return H.jC()},
$isG:1},
jD:{"^":"jB;a,b,c,$ti",
gm:function(a){return this.a},
a7:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a7(b))return
return this.fb(b)},
fb:function(a){return this.b[a]},
N:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fb(w))}}},
mM:{"^":"d;a,b,c,d,e,f,r,x",w:{
mN:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.mM(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
oT:{"^":"d;a,b,c,d,e,f",
bl:function(a){var z,y,x
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
aJ:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.oT(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cV:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
h8:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fh:{"^":"a0;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
lp:{"^":"a0;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
w:{
dt:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lp(a,y,z?null:b.receiver)}}},
oW:{"^":"a0;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dk:{"^":"d;a,bf:b<"},
v9:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa0)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hs:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
tJ:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
tK:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
tL:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
tM:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
tN:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.by(this).trim()+"'"},
ghu:function(){return this},
$isbt:1,
ghu:function(){return this}},
fZ:{"^":"a;"},
nX:{"^":"fZ;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
db:{"^":"fZ;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.db))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.j(z):H.aA(z)
z=H.aA(this.b)
if(typeof y!=="number")return y.kX()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cL(z)},
w:{
dc:function(a){return a.a},
eL:function(a){return a.c},
jm:function(){var z=$.br
if(z==null){z=H.cv("self")
$.br=z}return z},
cv:function(a){var z,y,x,w,v
z=new H.db("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jr:{"^":"a0;a",
k:function(a){return this.a},
w:{
cx:function(a,b){return new H.jr("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
mY:{"^":"a0;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
as:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gv:function(a){return J.j(this.a)},
t:function(a,b){if(b==null)return!1
return b instanceof H.as&&J.i(this.a,b.a)}},
P:{"^":"d;a,b,c,d,e,f,r,$ti",
gm:function(a){return this.a},
gL:function(a){return this.a===0},
gap:function(a){return!this.gL(this)},
gc9:function(){return new H.lG(this,[H.m(this,0)])},
gcl:function(){return H.bv(this.gc9(),new H.lo(this),H.m(this,0),H.m(this,1))},
a7:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.f6(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.f6(y,a)}else return this.jV(a)},
jV:function(a){var z=this.d
if(z==null)return!1
return this.cM(this.de(z,this.cL(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ct(z,b)
return y==null?null:y.gbU()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ct(x,b)
return y==null?null:y.gbU()}else return this.jW(b)},
jW:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.de(z,this.cL(a))
x=this.cM(y,a)
if(x<0)return
return y[x].gbU()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.e8()
this.b=z}this.f0(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.e8()
this.c=y}this.f0(y,b,c)}else this.jY(b,c)},
jY:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.e8()
this.d=z}y=this.cL(a)
x=this.de(z,y)
if(x==null)this.ej(z,y,[this.e9(a,b)])
else{w=this.cM(x,a)
if(w>=0)x[w].sbU(b)
else x.push(this.e9(a,b))}},
kr:function(a,b){var z
if(this.a7(a))return this.i(0,a)
z=b.$0()
this.n(0,a,z)
return z},
aa:function(a,b){if(typeof b==="string")return this.fp(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fp(this.c,b)
else return this.jX(b)},
jX:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.de(z,this.cL(a))
x=this.cM(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.ft(w)
return w.gbU()},
b3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
N:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
f0:function(a,b,c){var z=this.ct(a,b)
if(z==null)this.ej(a,b,this.e9(b,c))
else z.sbU(c)},
fp:function(a,b){var z
if(a==null)return
z=this.ct(a,b)
if(z==null)return
this.ft(z)
this.f7(a,b)
return z.gbU()},
e9:function(a,b){var z,y
z=new H.lF(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ft:function(a){var z,y
z=a.giE()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cL:function(a){return J.j(a)&0x3ffffff},
cM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gfV(),b))return y
return-1},
k:function(a){return P.dD(this)},
ct:function(a,b){return a[b]},
de:function(a,b){return a[b]},
ej:function(a,b,c){a[b]=c},
f7:function(a,b){delete a[b]},
f6:function(a,b){return this.ct(a,b)!=null},
e8:function(){var z=Object.create(null)
this.ej(z,"<non-identifier-key>",z)
this.f7(z,"<non-identifier-key>")
return z},
$islb:1,
$isG:1,
w:{
f8:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])}}},
lo:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
lF:{"^":"d;fV:a<,bU:b@,c,iE:d<,$ti"},
lG:{"^":"W;a,$ti",
gm:function(a){return this.a.a},
gL:function(a){return this.a.a===0},
gX:function(a){var z,y
z=this.a
y=new H.lH(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a6:function(a,b){return this.a.a7(b)},
N:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
lH:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dr:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giA:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ds(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giz:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.ds(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dk:function(a,b,c){if(c>b.length)throw H.c(P.a1(c,0,b.length,null,null))
return new H.pu(this,b,c)},
en:function(a,b){return this.dk(a,b,0)},
fa:function(a,b){var z,y
z=this.giA()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hr(this,y)},
ij:function(a,b){var z,y
z=this.giz()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.hr(this,y)},
fZ:function(a,b,c){if(c>b.length)throw H.c(P.a1(c,0,b.length,null,null))
return this.ij(b,c)},
$isdL:1,
w:{
ds:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eZ("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hr:{"^":"d;a,b",
geW:function(){return this.b.index},
gfO:function(){var z=this.b
return z.index+z[0].length},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isbc:1},
pu:{"^":"bZ;a,b,c",
gX:function(a){return new H.hh(this.a,this.b,this.c,null)},
$asbZ:function(){return[P.bc]},
$asy:function(){return[P.bc]}},
hh:{"^":"d;a,b,c,d",
gG:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fa(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fU:{"^":"d;eW:a<,b,c",
gfO:function(){return this.a+this.c.length},
i:function(a,b){if(b!==0)H.f(P.c5(b,null,null))
return this.c},
$isbc:1},
qs:{"^":"y;a,b,c",
gX:function(a){return new H.qt(this.a,this.b,this.c,null)},
$asy:function(){return[P.bc]}},
qt:{"^":"d;a,b,c,d",
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
this.d=new H.fU(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gG:function(){return this.d}}}],["","",,H,{"^":"",
tn:function(a){var z=H.r(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
tW:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pv:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.qZ()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d5(new P.px(z),1)).observe(y,{childList:true})
return new P.pw(z,y,x)}else if(self.setImmediate!=null)return P.r_()
return P.r0()},
vH:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d5(new P.py(a),0))},"$1","qZ",2,0,12],
vI:[function(a){++init.globalState.f.b
self.setImmediate(H.d5(new P.pz(a),0))},"$1","r_",2,0,12],
vJ:[function(a){P.e0(C.w,a)},"$1","r0",2,0,12],
aD:function(a,b){P.ed(null,a)
return b.gfS()},
at:function(a,b){P.ed(a,b)},
aC:function(a,b){b.bR(a)},
aB:function(a,b){b.eq(H.z(a),H.A(a))},
ed:function(a,b){var z,y,x,w
z=new P.qD(b)
y=new P.qE(b)
x=J.o(a)
if(!!x.$isF)a.ek(z,y)
else if(!!x.$isO)a.eL(z,y)
else{w=new P.F(0,$.p,null,[null])
w.a=4
w.c=a
w.ek(z,null)}},
au:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.qX(z)},
d0:function(a,b,c){var z,y,x
if(b===0){if(c.gey())c.c.ep()
else c.a.bi()
return}else if(b===1){if(c.gey())c.c.eq(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.em(z,y)
c.a.bi()}return}if(a instanceof P.bH){if(c.gey()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aQ(c.a,z)
P.cm(new P.qB(b,c))
return}else if(z===1){x=a.a
c.a.jc(x,!1).bY(new P.qC(b,c))
return}}P.ed(a,b)},
qW:function(a){return a.gdR()},
ei:function(a,b){if(H.av(a,{func:1,args:[P.aq,P.aq]})){b.toString
return a}else{b.toString
return a}},
ay:function(a){return new P.qu(new P.F(0,$.p,null,[a]),[a])},
qM:function(a,b,c){$.p.toString
a.b7(b,c)},
qQ:function(){var z,y
for(;z=$.bl,z!=null;){$.bL=null
y=z.gcc()
$.bl=y
if(y==null)$.bK=null
z.gje().$0()}},
vM:[function(){$.ee=!0
try{P.qQ()}finally{$.bL=null
$.ee=!1
if($.bl!=null)$.$get$e4().$1(P.hL())}},"$0","hL",0,0,6],
hF:function(a){var z=new P.hi(a,null)
if($.bl==null){$.bK=z
$.bl=z
if(!$.ee)$.$get$e4().$1(P.hL())}else{$.bK.b=z
$.bK=z}},
qV:function(a){var z,y,x
z=$.bl
if(z==null){P.hF(a)
$.bL=$.bK
return}y=new P.hi(a,null)
x=$.bL
if(x==null){y.b=z
$.bL=y
$.bl=y}else{y.b=x.b
x.b=y
$.bL=y
if(y.b==null)$.bK=y}},
cm:function(a){var z=$.p
if(C.f===z){P.bn(null,null,C.f,a)
return}z.toString
P.bn(null,null,z,z.eo(a,!0))},
vE:function(a,b){return new P.qr(null,a,!1,[b])},
ej:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.p
w.toString
P.bm(null,null,w,z,y)}},
qR:[function(a,b){var z=$.p
z.toString
P.bm(null,null,z,a,b)},function(a){return P.qR(a,null)},"$2","$1","r2",2,2,17,0],
vL:[function(){},"$0","r1",0,0,6],
hE:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbj()
w=t
v=x.gbf()
c.$2(w,v)}}},
qF:function(a,b,c,d){var z=a.c8()
if(!!J.o(z).$isO&&z!==$.$get$ba())z.c_(new P.qH(b,c,d))
else b.b7(c,d)},
ht:function(a,b){return new P.qG(a,b)},
hu:function(a,b,c){var z=a.c8()
if(!!J.o(z).$isO&&z!==$.$get$ba())z.c_(new P.qI(b,c))
else b.b6(c)},
qA:function(a,b,c){$.p.toString
a.c5(b,c)},
oS:function(a,b){var z=$.p
if(z===C.f){z.toString
return P.e0(a,b)}return P.e0(a,z.eo(b,!0))},
e0:function(a,b){var z=C.d.bG(a.a,1000)
return H.oP(z<0?0:z,b)},
p5:function(){return $.p},
bm:function(a,b,c,d,e){var z={}
z.a=d
P.qV(new P.qT(z,e))},
hB:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hD:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hC:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bn:function(a,b,c,d){var z=C.f!==c
if(z)d=c.eo(d,!(!z||!1))
P.hF(d)},
px:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pw:{"^":"a:48;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
py:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pz:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qD:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qE:{"^":"a:16;a",
$2:function(a,b){this.a.$2(1,new H.dk(a,b))}},
qX:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
qB:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcN()){z.b=!0
return}this.a.$2(null,0)}},
qC:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pA:{"^":"d;a,b,c",
gdR:function(){return this.a.gdR()},
gcN:function(){return this.a.gcN()},
gey:function(){return this.c!=null},
q:function(a,b){return J.aQ(this.a,b)},
em:function(a,b){return this.a.em(a,b)},
bi:function(){return this.a.bi()},
hZ:function(a){var z=new P.pD(a)
this.a=new P.pI(null,0,null,new P.pF(z),null,new P.pG(this,z),new P.pH(this,a),[null])},
w:{
pB:function(a){var z=new P.pA(null,!1,null)
z.hZ(a)
return z}}},
pD:{"^":"a:1;a",
$0:function(){P.cm(new P.pE(this.a))}},
pE:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pF:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pG:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
pH:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gk6()){z.c=new P.cc(new P.F(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cm(new P.pC(this.b))}return z.c.gfS()}}},
pC:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bH:{"^":"d;ae:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
w:{
bI:function(a){return new P.bH(a,1)},
aK:function(){return C.aa},
hn:function(a){return new P.bH(a,0)},
aL:function(a){return new P.bH(a,3)}}},
b1:{"^":"d;a,b,c,d",
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
if(!!w.$isb1){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qv:{"^":"bZ;a",
gX:function(a){return new P.b1(this.a(),null,null,null)},
$asbZ:I.b4,
$asy:I.b4,
w:{
aM:function(a){return new P.qv(a)}}},
O:{"^":"d;$ti"},
hk:{"^":"d;fS:a<,$ti",
eq:function(a,b){if(a==null)a=new P.cJ()
if(this.a.a!==0)throw H.c(new P.E("Future already completed"))
$.p.toString
this.b7(a,b)},
dn:function(a){return this.eq(a,null)}},
cc:{"^":"hk;a,$ti",
bR:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.bv(a)},
ep:function(){return this.bR(null)},
b7:function(a,b){this.a.f2(a,b)}},
qu:{"^":"hk;a,$ti",
bR:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.b6(a)},
ep:function(){return this.bR(null)},
b7:function(a,b){this.a.b7(a,b)}},
e9:{"^":"d;eb:a<,b,c,d,e,$ti",
giV:function(){return this.b.b},
gfU:function(){return(this.c&1)!==0},
gjN:function(){return(this.c&2)!==0},
gfT:function(){return this.c===8},
jL:function(a){return this.b.b.eK(this.d,a)},
kg:function(a){if(this.c!==6)return!0
return this.b.b.eK(this.d,a.gbj())},
jH:function(a){var z,y
z=this.e
y=this.b.b
if(H.av(z,{func:1,args:[,,]}))return y.kF(z,a.gbj(),a.gbf())
else return y.eK(z,a.gbj())},
jM:function(){return this.b.b.hh(this.d)}},
F:{"^":"d;cB:a<,b,iJ:c<,$ti",
giu:function(){return this.a===2},
ge7:function(){return this.a>=4},
eL:function(a,b){var z=$.p
if(z!==C.f){z.toString
if(b!=null)b=P.ei(b,z)}return this.ek(a,b)},
bY:function(a){return this.eL(a,null)},
ek:function(a,b){var z,y
z=new P.F(0,$.p,null,[null])
y=b==null?1:3
this.d8(new P.e9(null,z,y,a,b,[H.m(this,0),null]))
return z},
c_:function(a){var z,y
z=$.p
y=new P.F(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.m(this,0)
this.d8(new P.e9(null,y,8,a,null,[z,z]))
return y},
d8:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ge7()){y.d8(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bn(null,null,z,new P.pS(this,a))}},
fl:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.geb()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ge7()){v.fl(a)
return}this.a=v.a
this.c=v.c}z.a=this.dg(a)
y=this.b
y.toString
P.bn(null,null,y,new P.pZ(z,this))}},
df:function(){var z=this.c
this.c=null
return this.dg(z)},
dg:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.geb()
z.a=y}return y},
b6:function(a){var z,y
z=this.$ti
if(H.aN(a,"$isO",z,"$asO"))if(H.aN(a,"$isF",z,null))P.cZ(a,this)
else P.hm(a,this)
else{y=this.df()
this.a=4
this.c=a
P.bj(this,y)}},
b7:[function(a,b){var z=this.df()
this.a=8
this.c=new P.ct(a,b)
P.bj(this,z)},function(a){return this.b7(a,null)},"kY","$2","$1","gbN",2,2,17,0],
bv:function(a){var z
if(H.aN(a,"$isO",this.$ti,"$asO")){this.i7(a)
return}this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pU(this,a))},
i7:function(a){var z
if(H.aN(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pY(this,a))}else P.cZ(a,this)
return}P.hm(a,this)},
f2:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pT(this,a,b))},
i0:function(a,b){this.a=4
this.c=a},
$isO:1,
w:{
hm:function(a,b){var z,y,x
b.a=1
try{a.eL(new P.pV(b),new P.pW(b))}catch(x){z=H.z(x)
y=H.A(x)
P.cm(new P.pX(b,z,y))}},
cZ:function(a,b){var z,y,x
for(;a.giu();)a=a.c
z=a.ge7()
y=b.c
if(z){b.c=null
x=b.dg(y)
b.a=a.a
b.c=a.c
P.bj(b,x)}else{b.a=2
b.c=a
a.fl(y)}},
bj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbj()
t=v.gbf()
y.toString
P.bm(null,null,y,u,t)}return}for(;b.geb()!=null;b=s){s=b.a
b.a=null
P.bj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfU()||b.gfT()){q=b.giV()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbj()
t=v.gbf()
y.toString
P.bm(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfT())new P.q1(z,x,w,b).$0()
else if(y){if(b.gfU())new P.q0(x,b,r).$0()}else if(b.gjN())new P.q_(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.o(y).$isO){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dg(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cZ(y,o)
return}}o=b.b
b=o.df()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
pS:{"^":"a:1;a,b",
$0:function(){P.bj(this.a,this.b)}},
pZ:{"^":"a:1;a,b",
$0:function(){P.bj(this.b,this.a.a)}},
pV:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b6(a)}},
pW:{"^":"a:49;a",
$2:function(a,b){this.a.b7(a,b)},
$1:function(a){return this.$2(a,null)}},
pX:{"^":"a:1;a,b,c",
$0:function(){this.a.b7(this.b,this.c)}},
pU:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.df()
z.a=4
z.c=this.b
P.bj(z,y)}},
pY:{"^":"a:1;a,b",
$0:function(){P.cZ(this.b,this.a)}},
pT:{"^":"a:1;a,b,c",
$0:function(){this.a.b7(this.b,this.c)}},
q1:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jM()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbj()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.ct(y,x)
u.a=!0
return}if(!!J.o(z).$isO){if(z instanceof P.F&&z.gcB()>=4){if(z.gcB()===8){v=this.b
v.b=z.giJ()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bY(new P.q2(t))
v.a=!1}}},
q2:{"^":"a:0;a",
$1:function(a){return this.a}},
q0:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jL(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.ct(z,y)
w.a=!0}}},
q_:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kg(z)===!0&&w.e!=null){v=this.b
v.b=w.jH(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbj()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.ct(y,x)
s.a=!0}}},
hi:{"^":"d;je:a<,cc:b@"},
af:{"^":"d;$ti",
aU:function(a,b){return new P.qg(b,this,[H.x(this,"af",0),null])},
a6:function(a,b){var z,y
z={}
y=new P.F(0,$.p,null,[P.a_])
z.a=null
z.a=this.aB(new P.o7(z,this,b,y),!0,new P.o8(y),y.gbN())
return y},
N:function(a,b){var z,y
z={}
y=new P.F(0,$.p,null,[null])
z.a=null
z.a=this.aB(new P.ob(z,this,b,y),!0,new P.oc(y),y.gbN())
return y},
gm:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[P.u])
z.a=0
this.aB(new P.oh(z),!0,new P.oi(z,y),y.gbN())
return y},
gL:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[P.a_])
z.a=null
z.a=this.aB(new P.od(z,y),!0,new P.oe(y),y.gbN())
return y},
ck:function(a){var z,y,x
z=H.x(this,"af",0)
y=H.r([],[z])
x=new P.F(0,$.p,null,[[P.L,z]])
this.aB(new P.oj(this,y),!0,new P.ok(y,x),x.gbN())
return x},
bC:function(a){var z,y,x
z=H.x(this,"af",0)
y=P.X(null,null,null,z)
x=new P.F(0,$.p,null,[[P.bA,z]])
this.aB(new P.ol(this,y),!0,new P.om(y,x),x.gbN())
return x},
gD:function(a){var z,y
z={}
y=new P.F(0,$.p,null,[H.x(this,"af",0)])
z.a=null
z.b=!1
this.aB(new P.of(z,this),!0,new P.og(z,y),y.gbN())
return y}},
o7:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hE(new P.o5(this.c,a),new P.o6(z,y),P.ht(z.a,y))},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"af")}},
o5:{"^":"a:1;a,b",
$0:function(){return J.i(this.b,this.a)}},
o6:{"^":"a:51;a,b",
$1:function(a){if(a===!0)P.hu(this.a.a,this.b,!0)}},
o8:{"^":"a:1;a",
$0:function(){this.a.b6(!1)}},
ob:{"^":"a;a,b,c,d",
$1:function(a){P.hE(new P.o9(this.c,a),new P.oa(),P.ht(this.a.a,this.d))},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"af")}},
o9:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
oa:{"^":"a:0;",
$1:function(a){}},
oc:{"^":"a:1;a",
$0:function(){this.a.b6(null)}},
oh:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oi:{"^":"a:1;a,b",
$0:function(){this.b.b6(this.a.a)}},
od:{"^":"a:0;a,b",
$1:function(a){P.hu(this.a.a,this.b,!1)}},
oe:{"^":"a:1;a",
$0:function(){this.a.b6(!0)}},
oj:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.a,"af")}},
ok:{"^":"a:1;a,b",
$0:function(){this.b.b6(this.a)}},
ol:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.a,"af")}},
om:{"^":"a:1;a,b",
$0:function(){this.b.b6(this.a)}},
of:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"af")}},
og:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b6(x.a)
return}try{x=H.ab()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.qM(this.b,z,y)}}},
d_:{"^":"d;cB:b<,$ti",
gdR:function(){return new P.cX(this,this.$ti)},
gk6:function(){return(this.b&4)!==0},
gcN:function(){var z=this.b
return(z&1)!==0?this.gbF().gfh():(z&2)===0},
giC:function(){if((this.b&8)===0)return this.a
return this.a.gd_()},
e0:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eb(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd_()==null)y.c=new P.eb(null,null,0,this.$ti)
return y.c},
gbF:function(){if((this.b&8)!==0)return this.a.gd_()
return this.a},
cp:function(){if((this.b&4)!==0)return new P.E("Cannot add event after closing")
return new P.E("Cannot add event while adding a stream")},
jc:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cp())
if((z&2)!==0){z=new P.F(0,$.p,null,[null])
z.bv(null)
return z}z=this.a
y=new P.F(0,$.p,null,[null])
x=a.aB(this.gi5(),!1,this.gi6(),this.gi2())
w=this.b
if((w&1)!==0?this.gbF().gfh():(w&2)===0)x.cR()
this.a=new P.qn(z,y,x,this.$ti)
this.b|=8
return y},
f9:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$ba():new P.F(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cp())
this.bM(b)},"$1","giZ",2,0,function(){return H.b2(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d_")}],
em:function(a,b){if(this.b>=4)throw H.c(this.cp())
if(a==null)a=new P.cJ()
$.p.toString
this.c5(a,b)},
bi:function(){var z=this.b
if((z&4)!==0)return this.f9()
if(z>=4)throw H.c(this.cp())
z|=4
this.b=z
if((z&1)!==0)this.cz()
else if((z&3)===0)this.e0().q(0,C.u)
return this.f9()},
bM:[function(a){var z=this.b
if((z&1)!==0)this.cw(a)
else if((z&3)===0)this.e0().q(0,new P.e5(a,null,this.$ti))},"$1","gi5",2,0,function(){return H.b2(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d_")}],
c5:[function(a,b){var z=this.b
if((z&1)!==0)this.cA(a,b)
else if((z&3)===0)this.e0().q(0,new P.e6(a,b,null))},"$2","gi2",4,0,38],
dV:[function(){var z=this.a
this.a=z.gd_()
this.b&=4294967287
z.a.bv(null)},"$0","gi6",0,0,6],
iQ:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.E("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.pM(this,null,null,null,z,y,null,null,this.$ti)
x.f_(a,b,c,d,H.m(this,0))
w=this.giC()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd_(x)
v.b.cV()}else this.a=x
x.iO(w)
x.e5(new P.qp(this))
return x},
iG:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c8()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.F(0,$.p,null,[null])
u.f2(y,x)
z=u}else z=z.c_(w)
w=new P.qo(this)
if(z!=null)z=z.c_(w)
else w.$0()
return z}},
qp:{"^":"a:1;a",
$0:function(){P.ej(this.a.d)}},
qo:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bv(null)}},
qx:{"^":"d;$ti",
cw:function(a){this.gbF().bM(a)},
cA:function(a,b){this.gbF().c5(a,b)},
cz:function(){this.gbF().dV()}},
pJ:{"^":"d;$ti",
cw:function(a){this.gbF().c6(new P.e5(a,null,[H.m(this,0)]))},
cA:function(a,b){this.gbF().c6(new P.e6(a,b,null))},
cz:function(){this.gbF().c6(C.u)}},
pI:{"^":"d_+pJ;a,b,c,d,e,f,r,$ti"},
qw:{"^":"d_+qx;a,b,c,d,e,f,r,$ti"},
cX:{"^":"qq;a,$ti",
gv:function(a){return(H.aA(this.a)^892482866)>>>0},
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cX))return!1
return b.a===this.a}},
pM:{"^":"cd;x,a,b,c,d,e,f,r,$ti",
ec:function(){return this.x.iG(this)},
ee:[function(){var z=this.x
if((z.b&8)!==0)z.a.cR()
P.ej(z.e)},"$0","ged",0,0,6],
eg:[function(){var z=this.x
if((z.b&8)!==0)z.a.cV()
P.ej(z.f)},"$0","gef",0,0,6]},
ps:{"^":"d;$ti",
cR:function(){this.b.cR()},
cV:function(){this.b.cV()},
c8:function(){var z=this.b.c8()
if(z==null){this.a.bv(null)
return}return z.c_(new P.pt(this))},
ep:function(){this.a.bv(null)}},
pt:{"^":"a:1;a",
$0:function(){this.a.a.bv(null)}},
qn:{"^":"ps;d_:c@,a,b,$ti"},
cd:{"^":"d;cB:e<,$ti",
iO:function(a){if(a==null)return
this.r=a
if(!a.gL(a)){this.e=(this.e|64)>>>0
this.r.d2(this)}},
km:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fG()
if((z&4)===0&&(this.e&32)===0)this.e5(this.ged())},
cR:function(){return this.km(null)},
cV:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gL(z)}else z=!1
if(z)this.r.d2(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e5(this.gef())}}}},
c8:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dW()
z=this.f
return z==null?$.$get$ba():z},
gfh:function(){return(this.e&4)!==0},
gcN:function(){return this.e>=128},
dW:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fG()
if((this.e&32)===0)this.r=null
this.f=this.ec()},
bM:["hO",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cw(a)
else this.c6(new P.e5(a,null,[H.x(this,"cd",0)]))}],
c5:["hP",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cA(a,b)
else this.c6(new P.e6(a,b,null))}],
dV:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cz()
else this.c6(C.u)},
ee:[function(){},"$0","ged",0,0,6],
eg:[function(){},"$0","gef",0,0,6],
ec:function(){return},
c6:function(a){var z,y
z=this.r
if(z==null){z=new P.eb(null,null,0,[H.x(this,"cd",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d2(this)}},
cw:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hk(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dY((z&4)!==0)},
cA:function(a,b){var z,y
z=this.e
y=new P.pL(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dW()
z=this.f
if(!!J.o(z).$isO&&z!==$.$get$ba())z.c_(y)
else y.$0()}else{y.$0()
this.dY((z&4)!==0)}},
cz:function(){var z,y
z=new P.pK(this)
this.dW()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isO&&y!==$.$get$ba())y.c_(z)
else z.$0()},
e5:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dY((z&4)!==0)},
dY:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gL(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gL(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ee()
else this.eg()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d2(this)},
f_:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ei(b==null?P.r2():b,z)
this.c=c==null?P.r1():c}},
pL:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.av(y,{func:1,args:[P.d,P.aU]})
w=z.d
v=this.b
u=z.b
if(x)w.kG(u,v,this.c)
else w.hk(u,v)
z.e=(z.e&4294967263)>>>0}},
pK:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hi(z.c)
z.e=(z.e&4294967263)>>>0}},
qq:{"^":"af;$ti",
aB:function(a,b,c,d){return this.a.iQ(a,d,c,!0===b)},
eF:function(a,b,c){return this.aB(a,null,b,c)}},
e7:{"^":"d;cc:a@,$ti"},
e5:{"^":"e7;ae:b<,a,$ti",
eG:function(a){a.cw(this.b)}},
e6:{"^":"e7;bj:b<,bf:c<,a",
eG:function(a){a.cA(this.b,this.c)},
$ase7:I.b4},
pN:{"^":"d;",
eG:function(a){a.cz()},
gcc:function(){return},
scc:function(a){throw H.c(new P.E("No events after a done."))}},
qi:{"^":"d;cB:a<,$ti",
d2:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cm(new P.qj(this,a))
this.a=1},
fG:function(){if(this.a===1)this.a=3}},
qj:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcc()
z.b=w
if(w==null)z.c=null
x.eG(this.b)}},
eb:{"^":"qi;b,c,a,$ti",
gL:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scc(b)
this.c=b}}},
qr:{"^":"d;a,b,c,$ti"},
qH:{"^":"a:1;a,b,c",
$0:function(){return this.a.b7(this.b,this.c)}},
qG:{"^":"a:16;a,b",
$2:function(a,b){P.qF(this.a,this.b,a,b)}},
qI:{"^":"a:1;a,b",
$0:function(){return this.a.b6(this.b)}},
e8:{"^":"af;$ti",
aB:function(a,b,c,d){return this.ig(a,d,c,!0===b)},
eF:function(a,b,c){return this.aB(a,null,b,c)},
ig:function(a,b,c,d){return P.pR(this,a,b,c,d,H.x(this,"e8",0),H.x(this,"e8",1))},
fe:function(a,b){b.bM(a)},
is:function(a,b,c){c.c5(a,b)},
$asaf:function(a,b){return[b]}},
hl:{"^":"cd;x,y,a,b,c,d,e,f,r,$ti",
bM:function(a){if((this.e&2)!==0)return
this.hO(a)},
c5:function(a,b){if((this.e&2)!==0)return
this.hP(a,b)},
ee:[function(){var z=this.y
if(z==null)return
z.cR()},"$0","ged",0,0,6],
eg:[function(){var z=this.y
if(z==null)return
z.cV()},"$0","gef",0,0,6],
ec:function(){var z=this.y
if(z!=null){this.y=null
return z.c8()}return},
l_:[function(a){this.x.fe(a,this)},"$1","gip",2,0,function(){return H.b2(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hl")}],
l1:[function(a,b){this.x.is(a,b,this)},"$2","gir",4,0,39],
l0:[function(){this.dV()},"$0","giq",0,0,6],
i_:function(a,b,c,d,e,f,g){this.y=this.x.a.eF(this.gip(),this.giq(),this.gir())},
$ascd:function(a,b){return[b]},
w:{
pR:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.hl(a,null,null,null,null,z,y,null,null,[f,g])
y.f_(b,c,d,e,g)
y.i_(a,b,c,d,e,f,g)
return y}}},
qg:{"^":"e8;b,a,$ti",
fe:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.qA(b,y,x)
return}b.bM(z)}},
ct:{"^":"d;bj:a<,bf:b<",
k:function(a){return H.b(this.a)},
$isa0:1},
qz:{"^":"d;"},
qT:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cJ()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
qk:{"^":"qz;",
hi:function(a){var z,y,x,w
try{if(C.f===$.p){x=a.$0()
return x}x=P.hB(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
hk:function(a,b){var z,y,x,w
try{if(C.f===$.p){x=a.$1(b)
return x}x=P.hD(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
kG:function(a,b,c){var z,y,x,w
try{if(C.f===$.p){x=a.$2(b,c)
return x}x=P.hC(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
eo:function(a,b){if(b)return new P.ql(this,a)
else return new P.qm(this,a)},
i:function(a,b){return},
hh:function(a){if($.p===C.f)return a.$0()
return P.hB(null,null,this,a)},
eK:function(a,b){if($.p===C.f)return a.$1(b)
return P.hD(null,null,this,a,b)},
kF:function(a,b,c){if($.p===C.f)return a.$2(b,c)
return P.hC(null,null,this,a,b,c)}},
ql:{"^":"a:1;a,b",
$0:function(){return this.a.hi(this.b)}},
qm:{"^":"a:1;a,b",
$0:function(){return this.a.hh(this.b)}}}],["","",,P,{"^":"",
dy:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])},
az:function(){return new H.P(0,null,null,null,null,null,0,[null,null])},
ac:function(a){return H.to(a,new H.P(0,null,null,null,null,null,0,[null,null]))},
ll:function(a,b,c){var z,y
if(P.ef(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bM()
y.push(a)
try{P.qP(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fT(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c_:function(a,b,c){var z,y,x
if(P.ef(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$bM()
y.push(a)
try{x=z
x.A=P.fT(x.gA(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.A=y.gA()+c
y=z.gA()
return y.charCodeAt(0)==0?y:y},
ef:function(a){var z,y
for(z=0;y=$.$get$bM(),z<y.length;++z)if(a===y[z])return!0
return!1},
qP:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gX(a)
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
lI:function(a,b,c,d,e){return new H.P(0,null,null,null,null,null,0,[d,e])},
c3:function(a,b,c){var z=P.lI(null,null,null,b,c)
a.N(0,new P.r4(z))
return z},
X:function(a,b,c,d){return new P.ho(0,null,null,null,null,null,0,[d])},
aZ:function(a,b){var z,y
z=P.X(null,null,null,b)
for(y=J.aj(a);y.u();)z.q(0,y.gG())
return z},
dD:function(a){var z,y,x
z={}
if(P.ef(a))return"{...}"
y=new P.bF("")
try{$.$get$bM().push(a)
x=y
x.A=x.gA()+"{"
z.a=!0
a.N(0,new P.lT(z,y))
z=y
z.A=z.gA()+"}"}finally{z=$.$get$bM()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gA()
return z.charCodeAt(0)==0?z:z},
hp:{"^":"P;a,b,c,d,e,f,r,$ti",
cL:function(a){return H.tR(a)&0x3ffffff},
cM:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfV()
if(x==null?b==null:x===b)return y}return-1},
w:{
bJ:function(a,b){return new P.hp(0,null,null,null,null,null,0,[a,b])}}},
ho:{"^":"q3;a,b,c,d,e,f,r,$ti",
ea:function(){return new P.ho(0,null,null,null,null,null,0,this.$ti)},
gX:function(a){var z=new P.ag(this,this.r,null,null,[null])
z.c=this.e
return z},
gm:function(a){return this.a},
gL:function(a){return this.a===0},
gap:function(a){return this.a!==0},
a6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ic(b)},
ic:function(a){var z=this.d
if(z==null)return!1
return this.dc(z[this.da(a)],a)>=0},
cb:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a6(0,a)?a:null
else return this.iw(a)},
iw:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.da(a)]
x=this.dc(y,a)
if(x<0)return
return J.ax(y,x).gf8()},
N:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gD:function(a){var z=this.f
if(z==null)throw H.c(new P.E("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.f3(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.f3(x,b)}else return this.ay(b)},
ay:function(a){var z,y,x
z=this.d
if(z==null){z=P.qc()
this.d=z}y=this.da(a)
x=z[y]
if(x==null)z[y]=[this.dZ(a)]
else{if(this.dc(x,a)>=0)return!1
x.push(this.dZ(a))}return!0},
aa:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.f4(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f4(this.c,b)
else return this.iH(b)},
iH:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.da(a)]
x=this.dc(y,a)
if(x<0)return!1
this.f5(y.splice(x,1)[0])
return!0},
il:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.aa(0,y)}},
b3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
f3:function(a,b){if(a[b]!=null)return!1
a[b]=this.dZ(b)
return!0},
f4:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.f5(z)
delete a[b]
return!0},
dZ:function(a){var z,y
z=new P.qb(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f5:function(a){var z,y
z=a.gib()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
da:function(a){return J.j(a)&0x3ffffff},
dc:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gf8(),b))return y
return-1},
$isbA:1,
$isW:1,
w:{
qc:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qb:{"^":"d;f8:a<,b,ib:c<"},
ag:{"^":"d;a,b,c,d,$ti",
gG:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
q3:{"^":"nt;$ti",
bC:function(a){var z=this.ea()
z.ar(0,this)
return z}},
bZ:{"^":"y;$ti"},
r4:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
fc:{"^":"fi;$ti"},
fi:{"^":"d+b_;$ti",$asL:null,$asW:null,$isL:1,$isW:1},
b_:{"^":"d;$ti",
gX:function(a){return new H.dz(this,this.gm(this),0,null,[H.x(this,"b_",0)])},
as:function(a,b){return this.i(0,b)},
N:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gm(this))throw H.c(new P.B(this))}},
gL:function(a){return this.gm(this)===0},
gap:function(a){return!this.gL(this)},
gD:function(a){if(this.gm(this)===0)throw H.c(H.ab())
return this.i(0,this.gm(this)-1)},
a6:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<this.gm(this);++y){if(J.i(this.i(0,y),b))return!0
if(z!==this.gm(this))throw H.c(new P.B(this))}return!1},
bQ:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gm(this))throw H.c(new P.B(this))}return!1},
ba:function(a,b,c){var z,y,x
z=this.gm(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gm(this))throw H.c(new P.B(this))}return c.$0()},
aU:function(a,b){return new H.al(this,b,[H.x(this,"b_",0),null])},
dQ:function(a,b){return H.fV(this,b,null,H.x(this,"b_",0))},
bC:function(a){var z,y
z=P.X(null,null,null,H.x(this,"b_",0))
for(y=0;y<this.gm(this);++y)z.q(0,this.i(0,y))
return z},
q:function(a,b){var z=this.gm(this)
this.sm(0,z+1)
this.n(0,z,b)},
aa:function(a,b){var z
for(z=0;z<this.gm(this);++z)if(J.i(this.i(0,z),b)){this.aV(0,z,this.gm(this)-1,this,z+1)
this.sm(0,this.gm(this)-1)
return!0}return!1},
ik:function(a,b){var z,y,x,w
z=H.r([],[H.x(this,"b_",0)])
y=this.gm(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.i(a.$1(w),b))z.push(w)
if(y!==this.gm(this))throw H.c(new P.B(this))}if(z.length!==this.gm(this)){this.hG(0,0,z.length,z)
this.sm(0,z.length)}},
aV:function(a,b,c,d,e){var z,y,x,w,v
P.c6(b,c,this.gm(this),null,null,null)
z=c-b
if(z===0)return
if(H.aN(d,"$isL",[H.x(this,"b_",0)],"$asL")){y=e
x=d}else{x=J.iD(d,e).bB(0,!1)
y=0}w=J.I(x)
if(y+z>w.gm(x))throw H.c(H.f1())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.i(x,y+v))},
hG:function(a,b,c,d){return this.aV(a,b,c,d,0)},
bJ:function(a,b,c){var z
if(c>=this.gm(this))return-1
for(z=c;z<this.gm(this);++z)if(J.i(this.i(0,z),b))return z
return-1},
aS:function(a,b){return this.bJ(a,b,0)},
k:function(a){return P.c_(this,"[","]")},
$isL:1,
$isW:1},
qy:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.Q("Cannot modify unmodifiable map"))},
$isG:1},
lR:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a7:function(a){return this.a.a7(a)},
N:function(a,b){this.a.N(0,b)},
gL:function(a){var z=this.a
return z.gL(z)},
gap:function(a){var z=this.a
return z.gap(z)},
gm:function(a){var z=this.a
return z.gm(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hg:{"^":"lR+qy;a,$ti",$asG:null,$isG:1},
lT:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.A+=", "
z.a=!1
z=this.b
y=z.A+=H.b(a)
z.A=y+": "
z.A+=H.b(b)}},
lJ:{"^":"aT;a,b,c,d,$ti",
gX:function(a){return new P.hq(this,this.c,this.d,this.b,null,this.$ti)},
N:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.f(new P.B(this))}},
gL:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gD:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ab())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
as:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.f(P.cE(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.ay(b)},
ar:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aN(b,"$isL",z,"$asL")){y=b.gm(b)
x=this.gm(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.lK(w+(w>>>1))
if(typeof t!=="number")return H.v(t)
v=new Array(t)
v.fixed$length=Array
s=H.r(v,z)
this.c=this.iU(s)
this.a=s
this.b=0
C.a.aV(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aV(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aV(v,z,z+r,b,0)
C.a.aV(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.hq(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.ay(z.e)},
b3:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.c_(this,"{","}")},
fC:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.fd();++this.d},
dC:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ab());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ay:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fd();++this.d},
fd:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.r(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aV(y,0,w,z,x)
C.a.aV(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iU:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aV(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aV(a,0,v,x,z)
C.a.aV(a,v,v+this.c,this.a,0)
return this.c+v}},
hR:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.r(z,[b])},
w:{
b0:function(a,b){var z=new P.lJ(null,0,0,0,[b])
z.hR(a,b)
return z},
lK:function(a){var z
a=C.t.eS(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
hq:{"^":"d;a,b,c,d,e,$ti",
gG:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.f(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
nu:{"^":"d;$ti",
gL:function(a){return this.a===0},
gap:function(a){return this.a!==0},
ar:function(a,b){var z
for(z=J.aj(b);z.u();)this.q(0,z.gG())},
jk:function(a){var z,y
for(z=a.a,y=new P.ag(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a6(0,y.d))return!1
return!0},
bB:function(a,b){var z,y,x,w,v
z=H.r([],this.$ti)
C.a.sm(z,this.a)
for(y=new P.ag(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
ck:function(a){return this.bB(a,!0)},
aU:function(a,b){return new H.bs(this,b,[H.m(this,0),null])},
k:function(a){return P.c_(this,"{","}")},
N:function(a,b){var z
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bk:function(a,b,c){var z,y
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gD:function(a){var z,y
z=new P.ag(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ab())
do y=z.d
while(z.u())
return y},
ba:function(a,b,c){var z,y
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ab())},
dr:function(a,b){return this.ba(a,b,null)},
aQ:function(a,b){var z,y,x,w
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dp())
y=w
x=!0}}if(x)return y
throw H.c(H.ab())},
$isbA:1,
$isW:1},
nt:{"^":"nu;$ti"}}],["","",,P,{"^":"",
d1:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.q6(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d1(a[z])
return a},
qS:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.R(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eZ(w,null,null))}w=P.d1(z)
return w},
vK:[function(a){return a.dE()},"$1","t2",2,0,0],
q6:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iF(b):y}},
gm:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.cr().length
return z},
gL:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.cr().length
return z===0},
gap:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.cr().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a7(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iS().n(0,b,c)},
a7:function(a){if(this.b==null)return this.c.a7(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
N:function(a,b){var z,y,x,w
if(this.b==null)return this.c.N(0,b)
z=this.cr()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d1(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dD(this)},
cr:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iS:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dy(P.q,null)
y=this.cr()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sm(y,0)
this.b=null
this.a=null
this.c=z
return z},
iF:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d1(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.q,null]}},
eR:{"^":"d;$ti"},
cz:{"^":"d;$ti"},
du:{"^":"a0;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lr:{"^":"du;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
lq:{"^":"eR;a,b",
jo:function(a,b){var z=P.qS(a,this.gjp().a)
return z},
jn:function(a){return this.jo(a,null)},
jx:function(a,b){var z=this.gjy()
z=P.q8(a,z.b,z.a)
return z},
fN:function(a){return this.jx(a,null)},
gjy:function(){return C.O},
gjp:function(){return C.N},
$aseR:function(){return[P.d,P.q]}},
lt:{"^":"cz;a,b",
$ascz:function(){return[P.d,P.q]}},
ls:{"^":"cz;a",
$ascz:function(){return[P.q,P.d]}},
q9:{"^":"d;",
ht:function(a){var z,y,x,w,v,u,t
z=J.I(a)
y=z.gm(a)
if(typeof y!=="number")return H.v(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cI(a,v)
if(u>92)continue
if(u<32){if(v>w)x.A+=C.b.aE(a,w,v)
w=v+1
x.A+=H.am(92)
switch(u){case 8:x.A+=H.am(98)
break
case 9:x.A+=H.am(116)
break
case 10:x.A+=H.am(110)
break
case 12:x.A+=H.am(102)
break
case 13:x.A+=H.am(114)
break
default:x.A+=H.am(117)
x.A+=H.am(48)
x.A+=H.am(48)
t=u>>>4&15
x.A+=H.am(t<10?48+t:87+t)
t=u&15
x.A+=H.am(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.A+=C.b.aE(a,w,v)
w=v+1
x.A+=H.am(92)
x.A+=H.am(u)}}if(w===0)x.A+=H.b(a)
else if(w<y)x.A+=z.aE(a,w,y)},
dX:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lr(a,null))}z.push(a)},
dH:function(a){var z,y,x,w
if(this.hs(a))return
this.dX(a)
try{z=this.b.$1(a)
if(!this.hs(z))throw H.c(new P.du(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.du(a,y))}},
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
if(!!z.$isL){this.dX(a)
this.kT(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.dX(a)
y=this.kU(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kT:function(a){var z,y,x
z=this.c
z.A+="["
y=J.I(a)
if(y.gm(a)>0){this.dH(y.i(a,0))
for(x=1;x<y.gm(a);++x){z.A+=","
this.dH(y.i(a,x))}}z.A+="]"},
kU:function(a){var z,y,x,w,v,u,t
z={}
if(a.gL(a)){this.c.A+="{}"
return!0}y=a.gm(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.N(0,new P.qa(z,x))
if(!z.b)return!1
w=this.c
w.A+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.A+=v
this.ht(x[u])
w.A+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dH(x[t])}w.A+="}"
return!0}},
qa:{"^":"a:7;a,b",
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
q7:{"^":"q9;c,a,b",w:{
q8:function(a,b,c){var z,y,x
z=new P.bF("")
y=new P.q7(z,[],P.t2())
y.dH(a)
x=z.A
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
vd:[function(a,b){return J.bS(a,b)},"$2","t3",4,0,40],
eV:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ky(a)},
ky:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cL(a)},
cB:function(a){return new P.pQ(a)},
T:function(a,b,c){var z,y
z=H.r([],[c])
for(y=J.aj(a);y.u();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
lL:function(a,b,c,d){var z,y,x
z=H.r(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bu:function(a,b){var z=P.T(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
et:function(a){H.tW(H.b(a))},
be:function(a,b,c){return new H.dr(a,H.ds(a,!1,b,!1),null,null)},
a_:{"^":"d;"},
"+bool":0,
S:{"^":"d;$ti"},
cA:{"^":"d;iT:a<,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cA))return!1
return this.a===b.a&&!0},
bx:function(a,b){return C.d.bx(this.a,b.giT())},
gv:function(a){var z=this.a
return(z^C.d.di(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.jQ(H.mC(this))
y=P.bU(H.mA(this))
x=P.bU(H.mw(this))
w=P.bU(H.mx(this))
v=P.bU(H.mz(this))
u=P.bU(H.mB(this))
t=P.jR(H.my(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjR()
y=new P.cA(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.f(P.C(y.gkh()))
return y},
gkh:function(){return this.a},
$isS:1,
$asS:function(){return[P.cA]},
w:{
jQ:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jR:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bU:function(a){if(a>=10)return""+a
return"0"+a}}},
aO:{"^":"K;",$isS:1,
$asS:function(){return[P.K]}},
"+double":0,
aY:{"^":"d;bO:a<",
a4:function(a,b){return new P.aY(this.a+b.gbO())},
at:function(a,b){return new P.aY(this.a-b.gbO())},
c2:function(a,b){if(typeof b!=="number")return H.v(b)
return new P.aY(C.j.hg(this.a*b))},
aP:function(a,b){return C.d.aP(this.a,b.gbO())},
b4:function(a,b){return this.a>b.gbO()},
c1:function(a,b){return C.d.c1(this.a,b.gbO())},
bK:function(a,b){return C.d.bK(this.a,b.gbO())},
gjR:function(){return C.d.bG(this.a,1000)},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aY))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
bx:function(a,b){return C.d.bx(this.a,b.gbO())},
k:function(a){var z,y,x,w,v
z=new P.kf()
y=this.a
if(y<0)return"-"+new P.aY(0-y).k(0)
x=z.$1(C.d.bG(y,6e7)%60)
w=z.$1(C.d.bG(y,1e6)%60)
v=new P.ke().$1(y%1e6)
return""+C.d.bG(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eR:function(a){return new P.aY(0-this.a)},
$isS:1,
$asS:function(){return[P.aY]}},
ke:{"^":"a:11;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kf:{"^":"a:11;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a0:{"^":"d;",
gbf:function(){return H.A(this.$thrownJsError)}},
cJ:{"^":"a0;",
k:function(a){return"Throw of null."}},
aX:{"^":"a0;a,b,h:c<,d",
ge2:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge1:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ge2()+y+x
if(!this.a)return w
v=this.ge1()
u=P.eV(this.b)
return w+v+": "+H.b(u)},
w:{
C:function(a){return new P.aX(!1,null,null,a)},
cs:function(a,b,c){return new P.aX(!0,a,b,c)},
l:function(a){return new P.aX(!1,null,a,"Must not be null")}}},
dS:{"^":"aX;e,f,a,b,c,d",
ge2:function(){return"RangeError"},
ge1:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
w:{
mI:function(a){return new P.dS(null,null,!1,null,null,a)},
c5:function(a,b,c){return new P.dS(null,null,!0,a,b,"Value not in range")},
a1:function(a,b,c,d,e){return new P.dS(b,c,!0,a,d,"Invalid value")},
mJ:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a1(a,b,c,d,e))},
c6:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a1(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a1(b,a,c,"end",f))
return b}}},
la:{"^":"aX;e,m:f>,a,b,c,d",
ge2:function(){return"RangeError"},
ge1:function(){if(J.bQ(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
w:{
cE:function(a,b,c,d,e){var z=e!=null?e:J.aG(b)
return new P.la(b,z,!0,a,c,"Index out of range")}}},
Q:{"^":"a0;a",
k:function(a){return"Unsupported operation: "+this.a}},
aa:{"^":"a0;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
E:{"^":"a0;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"a0;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eV(z))+"."}},
m7:{"^":"d;",
k:function(a){return"Out of Memory"},
gbf:function(){return},
$isa0:1},
fO:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbf:function(){return},
$isa0:1},
jP:{"^":"a0;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
pQ:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eZ:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aE(x,0,75)+"..."
return y+"\n"+x}},
kC:{"^":"d;h:a<,fi,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.fi
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.f(P.cs(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dO(b,"expando$values")
return y==null?null:H.dO(y,z)},
n:function(a,b,c){var z,y
z=this.fi
if(typeof z!=="string")z.set(b,c)
else{y=H.dO(b,"expando$values")
if(y==null){y=new P.d()
H.fs(b,"expando$values",y)}H.fs(y,z,c)}}},
bt:{"^":"d;"},
u:{"^":"K;",$isS:1,
$asS:function(){return[P.K]}},
"+int":0,
y:{"^":"d;$ti",
aU:function(a,b){return H.bv(this,b,H.x(this,"y",0),null)},
c0:["dT",function(a,b){return new H.J(this,b,[H.x(this,"y",0)])}],
a6:function(a,b){var z
for(z=this.gX(this);z.u();)if(J.i(z.gG(),b))return!0
return!1},
N:function(a,b){var z
for(z=this.gX(this);z.u();)b.$1(z.gG())},
bk:function(a,b,c){var z,y
for(z=this.gX(this),y=b;z.u();)y=c.$2(y,z.gG())
return y},
bB:function(a,b){return P.T(this,b,H.x(this,"y",0))},
ck:function(a){return this.bB(a,!0)},
bC:function(a){return P.aZ(this,H.x(this,"y",0))},
gm:function(a){var z,y
z=this.gX(this)
for(y=0;z.u();)++y
return y},
gL:function(a){return!this.gX(this).u()},
gap:function(a){return!this.gL(this)},
dQ:function(a,b){return H.nw(this,b,H.x(this,"y",0))},
gD:function(a){var z,y
z=this.gX(this)
if(!z.u())throw H.c(H.ab())
do y=z.gG()
while(z.u())
return y},
gc4:function(a){var z,y
z=this.gX(this)
if(!z.u())throw H.c(H.ab())
y=z.gG()
if(z.u())throw H.c(H.dp())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.f(P.a1(b,0,null,"index",null))
for(z=this.gX(this),y=0;z.u();){x=z.gG()
if(b===y)return x;++y}throw H.c(P.cE(b,this,"index",null,y))},
k:function(a){return P.ll(this,"(",")")}},
cG:{"^":"d;$ti"},
L:{"^":"d;$ti",$isy:1,$isW:1},
"+List":0,
G:{"^":"d;$ti"},
aq:{"^":"d;",
gv:function(a){return P.d.prototype.gv.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isS:1,
$asS:function(){return[P.K]}},
"+num":0,
d:{"^":";",
t:function(a,b){return this===b},
gv:function(a){return H.aA(this)},
k:function(a){return H.cL(this)},
gbq:function(a){return new H.as(H.i_(this),null)},
toString:function(){return this.k(this)}},
bc:{"^":"d;"},
bA:{"^":"W;$ti"},
aU:{"^":"d;"},
q:{"^":"d;",$isS:1,
$asS:function(){return[P.q]},
$isdL:1},
"+String":0,
bF:{"^":"d;A<",
gm:function(a){return this.A.length},
gL:function(a){return this.A.length===0},
gap:function(a){return this.A.length!==0},
k:function(a){var z=this.A
return z.charCodeAt(0)==0?z:z},
w:{
fT:function(a,b,c){var z=J.aj(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.u())}else{a+=H.b(z.gG())
for(;z.u();)a=a+c+H.b(z.gG())}return a},
op:function(a){return new P.bF(a)}}}}],["","",,P,{"^":"",fE:{"^":"d;"}}],["","",,P,{"^":"",
cM:function(a){return C.I},
q5:{"^":"d;",
ad:function(a){if(a<=0||a>4294967296)throw H.c(P.mI("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kj:function(){return Math.random()}}}],["","",,S,{"^":"",jE:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a7:function(a){return this.b.a7(a)},
N:function(a,b){return this.b.N(0,b)},
gL:function(a){var z=this.b
return z.gL(z)},
gap:function(a){var z=this.b
return z.gap(z)},
gm:function(a){var z=this.b
return z.gm(z)},
n:function(a,b,c){this.iy()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iy:function(){if(!this.a)return
this.a=!1
this.b=P.c3(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",jF:{"^":"d;a,b,$ti",
gm:function(a){return this.b.a},
cb:function(a){return this.b.cb(a)},
a6:function(a,b){return this.b.a6(0,b)},
N:function(a,b){return this.b.N(0,b)},
gL:function(a){return this.b.a===0},
gap:function(a){return this.b.a!==0},
gX:function(a){var z,y
z=this.b
y=new P.ag(z,z.r,null,null,[null])
y.c=z.e
return y},
gD:function(a){var z=this.b
return z.gD(z)},
aU:function(a,b){var z=this.b
z.toString
return new H.bs(z,b,[H.m(z,0),null])},
bC:function(a){var z,y
z=this.b
y=z.ea()
y.ar(0,z)
return y},
q:function(a,b){this.ie()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
ie:function(){if(!this.a)return
this.a=!1
this.b=P.aZ(this.b,H.m(this,0))},
$isbA:1,
$isW:1}}],["","",,S,{"^":"",de:{"^":"d;fk:a<,b,$ti",
Y:function(a){var z=new S.N(null,null,this.$ti)
z.af()
z.l(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=X.bp(this.a)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isde)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.i(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gm:function(a){return this.a.length},
bJ:function(a,b,c){var z=this.a
return(z&&C.a).bJ(z,b,c)},
aS:function(a,b){return this.bJ(a,b,0)},
gX:function(a){var z=this.a
return new J.b7(z,z.length,0,null,[H.m(z,0)])},
aU:function(a,b){var z=this.a
z.toString
return new H.al(z,b,[H.m(z,0),null])},
a6:function(a,b){var z=this.a
return(z&&C.a).a6(z,b)},
N:function(a,b){var z=this.a
return(z&&C.a).N(z,b)},
bC:function(a){var z=this.a
z.toString
return P.aZ(z,H.m(z,0))},
gL:function(a){return this.a.length===0},
gap:function(a){return this.a.length!==0},
gD:function(a){var z=this.a
return(z&&C.a).gD(z)},
af:function(){if(new H.as(H.V(H.m(this,0)),null).t(0,C.n))throw H.c(new P.Q('explicit element type required, for example "new BuiltList<int>"'))}},N:{"^":"d;fk:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.de(z,null,this.$ti)
y.af()
this.a=z
this.b=y
z=y}return z},
l:function(a){if(H.aN(a,"$isde",this.$ti,null)){this.a=a.gfk()
this.b=a}else{this.a=P.T(a,!0,H.m(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.f(P.C("null element"))
z=this.gei()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.f(P.C("null element"))
z=this.gei();(z&&C.a).q(z,b)},
aa:function(a,b){var z=this.gei();(z&&C.a).aa(z,b)},
aU:function(a,b){var z=this.a
z.toString
z=new H.al(z,b,[H.m(z,0),null]).bB(0,!0)
this.a=z
this.b=null
this.i8(z)},
gei:function(){if(this.b!=null){this.a=P.T(this.a,!0,H.m(this,0))
this.b=null}return this.a},
af:function(){if(new H.as(H.V(H.m(this,0)),null).t(0,C.n))throw H.c(new P.Q('explicit element type required, for example "new ListBuilder<int>"'))},
i8:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.an)(a),++x){w=a[x]
if(!H.d4(w,y))throw H.c(P.C("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cw:{"^":"d;ix:a<,b,c,d,$ti",
Y:function(a){var z=new A.cI(null,null,this.$ti)
z.c7()
z.l(this)
a.$1(z)
return z.p()},
B:function(){return new S.jE(!0,this.a,this.$ti)},
gv:function(a){var z=this.b
if(z==null){z=this.a.gc9()
z=H.bv(z,new A.jp(this),H.x(z,"y",0),null)
z=P.T(z,!1,H.x(z,"y",0))
C.a.eV(z)
z=X.bp(z)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscw)return!1
y=b.a
x=this.a
if(y.gm(y)!==x.gm(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc9()
this.c=z}z=z.gX(z)
for(;z.u();){v=z.gG()
if(!J.i(y.i(0,v),x.i(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){return this.a.i(0,b)},
N:function(a,b){this.a.N(0,b)},
gL:function(a){var z=this.a
return z.gL(z)},
gap:function(a){var z=this.a
return z.gap(z)},
gm:function(a){var z=this.a
return z.gm(z)},
c7:function(){if(new H.as(H.V(H.m(this,0)),null).t(0,C.n))throw H.c(new P.Q('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.as(H.V(H.m(this,1)),null).t(0,C.n))throw H.c(new P.Q('explicit value type required, for example "new BuiltMap<int, int>"'))}},jp:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.d2(X.aV(X.aV(0,J.j(z)),J.j(y)))}},cI:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cw(this.a,null,null,null,this.$ti)
z.c7()
this.b=z}return z},
l:function(a){var z
if(H.aN(a,"$iscw",this.$ti,null)){this.b=a
this.a=a.gix()}else if(!!a.$iscw){z=P.c3(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.c3(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.C("expected Map or BuiltMap, got "+H.b(a.gbq(a))))},
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){if(c==null)H.f(P.C("null value"))
this.giK().n(0,b,c)},
giK:function(){if(this.b!=null){this.a=P.c3(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
c7:function(){if(new H.as(H.V(H.m(this,0)),null).t(0,C.n))throw H.c(new P.Q('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.as(H.V(H.m(this,1)),null).t(0,C.n))throw H.c(new P.Q('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",df:{"^":"d;iM:a<,b,$ti",
Y:function(a){var z=new L.bf(null,null,this.$ti)
z.bw()
z.l(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.T(new H.bs(z,new L.jq(),[H.m(z,0),null]),!1,null)
C.a.eV(z)
z=X.bp(z)
this.b=z}return z},
t:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdf)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gv(b)
x=this.gv(this)
if(z==null?x!=null:z!==x)return!1
return y.jk(b)},
k:function(a){return J.h(this.a)},
gm:function(a){return this.a.a},
cb:function(a){return this.a.cb(a)},
gX:function(a){var z,y
z=this.a
y=new P.ag(z,z.r,null,null,[null])
y.c=z.e
return y},
aU:function(a,b){var z=this.a
z.toString
return new H.bs(z,b,[H.m(z,0),null])},
a6:function(a,b){return this.a.a6(0,b)},
N:function(a,b){return this.a.N(0,b)},
bC:function(a){return new A.jF(!0,this.a,this.$ti)},
gL:function(a){return this.a.a===0},
gap:function(a){return this.a.a!==0},
gD:function(a){var z=this.a
return z.gD(z)},
bw:function(){if(new H.as(H.V(H.m(this,0)),null).t(0,C.n))throw H.c(new P.Q('explicit element type required, for example "new BuiltSet<int>"'))}},jq:{"^":"a:0;",
$1:function(a){return J.j(a)}},bf:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.df(this.a,null,this.$ti)
z.bw()
this.b=z}return z},
l:function(a){var z,y,x,w
if(H.aN(a,"$isdf",this.$ti,null)){this.a=a.giM()
this.b=a}else{z=H.m(this,0)
y=P.X(null,null,null,z)
for(x=J.aj(a);x.u();){w=x.gG()
if(H.d4(w,z))y.q(0,w)
else throw H.c(P.C("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.f(P.C("null element"))
this.gfs().q(0,b)},
aU:function(a,b){var z=this.a
z.toString
z=P.aZ(new H.bs(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iN(z)},
gfs:function(){if(this.b!=null){this.a=P.aZ(this.a,H.m(this,0))
this.b=null}return this.a},
bw:function(){if(new H.as(H.V(H.m(this,0)),null).t(0,C.n))throw H.c(new P.Q('explicit element type required, for example "new SetBuilder<int>"'))},
iN:function(a){var z,y,x
for(z=new P.ag(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.d4(x,y))throw H.c(P.C("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.v(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
M:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",n5:{"^":"n3;ch,cx,aj:cy@,b5:db@,bt:dx@,b,c,d,e,f,r,x,y,z,Q,a",
h8:function(){var z=$.$get$cn()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jT:function(){var z,y,x,w
this.cx=null
this.cy=Z.bD("Health",new N.n8(),"#CCCCCC","Your physical state",100,0,!0,P.aO)
z=P.u
this.db=Z.bD("Stamina",new N.n9(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bD("Gold",new N.na(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bN()
x=this.cy
w=this.db
y=new O.eU(N.bb("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.Z(H.r([],[Y.a8]),0,P.az()),x,w,z,O.u1(),O.u0(),O.u_(),y,this.ghJ(),new P.bF(""),!1,null)
y.hH()
this.cx=y
y.x="endGame"
$.$get$ci().q(0,0)},
hV:function(){var z,y
z=new O.cR([[null,P.ac(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cR([new N.n7(this),[null,P.ac(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cR(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
w:{
n6:function(){var z,y,x,w
z=Z.bD("Health",new N.rC(),"#CCCCCC","Your physical state",100,0,!0,P.aO)
y=P.u
x=Z.bD("Stamina",new N.rE(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bD("Gold",new N.rF(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.n5("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nb(new H.P(0,null,null,null,null,null,0,[w,O.cR])),null,null,null,P.X(null,null,null,w),!1,null,-9999,null,null,null)
z.hV()
return z}}},rC:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.c1(a,0.5))return"\ud83d\ude23"
if(z.aP(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},rE:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},rF:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},n7:{"^":"a:19;a",
$0:function(){var z=0,y=P.ay(),x=this
var $async$$0=P.au(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:z=2
return P.at(x.a.cx.bp(),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},n8:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.t(a,0))return"\ud83d\udc80"
if(z.c1(a,0.5))return"\ud83d\ude23"
if(z.aP(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},n9:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},na:{"^":"a:10;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bW:{"^":"d;"},kv:{"^":"d;"},pa:{"^":"bW;a,b",
Y:function(a){var z=new M.e2(null,!1,0)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bW))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){return Y.M(Y.k(Y.k(0,C.L.gv(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.k(this.b)+",\n}"}},e2:{"^":"kv;c,a,b",
gbL:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
l:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbL()
y=this.a
this.gbL()
z=new M.pa(y,this.b)}this.l(z)
return z}}}],["","",,O,{"^":"",
vO:[function(a){var z,y
z=a.gc3()
y=a.gbT()
if(typeof y!=="number")return H.v(y)
return z-2*y},"$1","d6",2,0,26],
vZ:[function(a){var z,y,x
z=a.gc3()
y=a.gcW()
x=a.gbT()
if(typeof x!=="number")return H.v(x)
return z+y-x},"$1","hQ",2,0,26],
eU:{"^":"lN;y,z,Q,ch,cx,cy,db,dx,dy,bD:fr<,fx,eX:fy<,aj:go<,b5:id<,bt:k1<,a,b,c,d,e,f,r,x",
hH:function(){var z,y,x,w,v,u
z=P.bu(C.q,null)
y=$.$get$cj()
this.cy=R.b6(1000,"orc",O.d6(),null,new G.cb("sword",1,1,!0,!1,z),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b6(1001,"goblin",O.d6(),null,new G.cb("scimitar",1,1,!0,!1,P.bu(C.q,null)),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.N(null,null,[Q.w])
y.af()
y.l([new Q.w("kill_agruth","","",null)])
this.dx=new K.c8(y.p(),"preStartBook",new O.km(),new O.kn(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.B,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.d1()
if(typeof y!=="number")return H.v(y)
this.go.sae(z/y)
this.id.sae(this.ch.fx)
this.k1.sae(this.ch.f)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.Z,0,null)
this.dy=F.fz(this.dx,!1)
y=K.c8
x=P.T($.$get$hH(),!0,y)
C.a.ar(x,[this.dx,$.$get$en()])
w=new M.e2(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.aZ([z,v],R.H)
z=P.b0(null,O.cq)
u=new A.a5(v,P.X(null,null,null,U.ap),w,z,P.aZ(x,y),P.T([u],!0,S.Y),0,null)
this.fr=u
y=new Y.Z(H.r([],[Y.a8]),0,P.az())
y.b=u.r
this.fx=new B.bw(u,null,y,1,1,!0,!1,!1,0)},
cZ:function(){var z=0,y=P.ay(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cZ=P.au(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjw()
if(v.h5(u)){z=1
break}t=w.fr.a2(w.ch.x)
s=t.gaj()
r=t.gh0()
if(typeof s!=="number"){x=s.d1()
z=1
break}if(typeof r!=="number"){x=H.v(r)
z=1
break}w.go.sae(s/r)
w.id.sae(t.gb5())
w.k1.sae(t.gbt())
r=w.y
r.fX("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.I(0,"\n\n",!0)
if(w.fr.jO(w.ch.x))v.I(0,"TO BE CONTINUED.",!0)
else v.I(0,"You died.",!0)
w.f.A+=v.ce()
z=1
break}q=C.a.gD(s)
p=q.dK(w.fr)
s=w.fr
o=N.bb("ActorPlanner")
n=new H.P(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.Z(H.r([],[Y.a8]),0,P.az())
k.b=s.r
j=new G.iI(o,l,new B.bw(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.f(P.C("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.h(s)+". Situation: "+H.b(s.gjm())))
z=3
return P.at(j.ko(),$async$cZ)
case 3:if(n.gL(n)){o.eO("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.o(s)
s="PlanConsequence<"+l.gv(s)+", "+l.k(s)+", "+C.t.k(null)
o.bI(m+(s+", 1, 0, >")+".")}s=Z.me(n)
i=new Z.md(new P.hg(n,[null,null]),s)
if(n.gL(n))$.$get$bx().eO("Created with no recommendations.")
if(s.length===0){r.dO("No recommendation for "+H.b(p.gh()))
r.dO(new O.kp(w))
w.fr.fM(q.gj());++w.fr.r
z=1
break}z=p.gF()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.an)(s),++h);r.bI("planner.generateTable for "+H.b(p.gh()))
j.eP().N(0,new O.kq(w))
u=i.h7(q.gh_(),O.hQ())
u.toString
g=P.T(u,!1,H.x(u,"y",0))
if(g.length!==0&&C.a.bQ(g,new O.kr())){w.f.A+=v.ce()
C.a.sm(v.a,0)}v=new O.ks(new O.ku())
u=g.length-1
if(u-0<=32)H.fN(g,0,u,v)
else H.fM(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.an)(g),++h){f=g[h]
u.$3$helpMessage$script(f.ga_(),f.gO(),new O.kt(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfL()
z=7
return P.at(w.co(i.kn(s==null?O.hQ():s),p,v),$async$cZ)
case 7:case 5:v.h5(u)
case 1:return P.aC(x,y)}})
return P.aD($async$cZ,y)},
co:function(a,b,c){var z=0,y=P.ay(),x,w=this,v,u,t
var $async$co=P.au(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:v=a.dl(b,w.fx,w.fr)
u=P.T(v,!0,H.x(v,"y",0))
z=b.gF()===!0?3:5
break
case 3:z=6
return P.at(w.d9(a,b,u),$async$co)
case 6:z=4
break
case 5:t=S.mG(new H.al(u,new O.kj(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ar(c.a,w.fx.geX().a)
w.fr=w.fx.gbD()
v=w.y
v.bI(new O.kk(a,b))
v.ag(new O.kl(w,b))
case 1:return P.aC(x,y)}})
return P.aD($async$co,y)},
d9:function(a,b,c){var z=0,y=P.ay(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$d9=P.au(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=a.M(b,x.fr)
v=J.o(w)
z=v.t(w,1)?2:4
break
case 2:x.fx=C.a.gc4(c)
z=3
break
case 4:z=v.t(w,0)?5:7
break
case 5:x.fx=C.a.gc4(c)
z=6
break
case 7:u=C.a.gD(J.h(a.gR()).split("."))
v=a.an(b,x.fr)
t=a.gU()&&b.jP(a.gR())
s="use "+H.b(u)
x.fn()
z=8
return P.at(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$d9)
case 8:r=e
t=new H.J(c,new O.kg(r),[H.m(c,0)])
x.fx=t.gc4(t)
if(r.gkS()===!0){q=A.e1(x.fx.gbD())
q.Z(b.gj(),new O.kh())
v=x.fx
t=v.gfu()
s=H.r([],[Y.a8])
p=new Y.Z(s,0,P.az())
C.a.ar(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bw(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.aC(null,y)}})
return P.aD($async$d9,y)}},
km:{"^":"a:3;",
$3:function(a,b,c){return c.I(0,"UNUSED because this is the first choice",!0)}},
kn:{"^":"a:3;",
$3:function(a,b,c){return H.f(new P.E("Room isn't to be revisited"))}},
kp:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.al(z,new O.ko(),[H.m(z,0),null]).cO(0," <- ")}},
ko:{"^":"a:0;",
$1:function(a){return a.gb8()}},
kq:{"^":"a:0;a",
$1:function(a){return this.a.y.bI(a)}},
ku:{"^":"a:27;",
$1:function(a){if(a instanceof Q.D)return H.b(a.b.gh())+" "+a.ga_()
return"ZZZZZZ "+a.ga_()}},
kr:{"^":"a:0;",
$1:function(a){return a.ga_()!==""}},
ks:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bS(z.$1(a),z.$1(b))}},
kt:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.ay(),x=this,w
var $async$$0=P.au(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.at(w.co(x.c,x.b,w.fy),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},
kj:{"^":"a:0;",
$1:function(a){return a.gkp()}},
kk:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kl:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.al(z,new O.ki(),[H.m(z,0),null]).cO(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
ki:{"^":"a:0;",
$1:function(a){return a.gb8()}},
kg:{"^":"a:0;a",
$1:function(a){return a.geA()===this.a.geA()}},
kh:{"^":"a:0;",
$1:function(a){var z=a.gb5()
if(typeof z!=="number")return z.at()
a.sb5(z-1)
return a}}}],["","",,Q,{"^":"",
hV:function(a,b,c){return P.aM(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hV(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gD(t):null
s=J.iG(t.aD(y.a,y),new Q.tA(z))
t=J.aj(s.a),r=new H.cW(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gG()
p=x.$1(q)
if(p.gP()&&!z.ew(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aK()
case 1:return P.aL(u)}}})},
hW:function(a,b,c){return P.aM(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hW(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dM((t.length!==0?C.a.gD(t):null).gby()).gjA().a,t=new J.b7(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aK()
case 1:return P.aL(u)}}})},
hX:function(a,b,c){return P.aM(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hX(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gD(t):null).gbH(),t=t.gX(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aK()
case 1:return P.aL(u)}}})},
tA:{"^":"a:0;a",
$1:function(a){return!J.i(a,this.a)&&a.gaT()}},
a7:{"^":"d;",
dl:function(a,b,c){var z=this
return P.aM(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dl(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.M(y,x.gbD())
r=J.ah(s)
v=r.b4(s,0)?2:3
break
case 2:q=A.e1(w)
v=4
return B.fn(q,x,z,z.i4(q,y,w,z.gT(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aP(s,1)?5:6
break
case 5:q=A.e1(w)
p=z.i3(q,y,w,z.gS(),!0)
if(typeof s!=="number")H.v(s)
v=7
return B.fn(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aK()
case 1:return P.aL(t)}}})},
f1:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aQ(0,new Q.iH(b))
y=new O.eG(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gj()
y.ga5().f=x
y.ga5().e=C.P
y.ga5().ch=f
y.ga5().Q=e
x=this.gP()
y.ga5().y=x
x=this.ga0()
y.ga5().z=x
if(!!this.$isD){x=y.ga5()
w=x.r
if(w==null){w=new L.bf(null,null,[P.u])
w.bw()
w.l(C.e)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.f(P.C("null element"))
x.gfs().q(0,w)}v=new Y.Z(H.r([],[Y.a8]),0,P.az())
x=a.f
u=(x.length!==0?C.a.gD(x):null).gj()
a.gv(a);(x.length!==0?C.a.gD(x):null).kk(a,v)
this.a=d.$3(z,a,v)
if(a.dd(u)!=null)a.fM(u);++a.r
w=a.eQ(u)
if(!(w==null))w.h3(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gD(x):null
if((w==null?w:w.dK(a))!=null){w=x.length!==0?C.a.gD(x):null
w=!J.i(w==null?w:w.d5(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gD(x):null)==null)break
t=C.a.gD(x)
t.dv(a)
C.a.aa(x,t)}x=x.length!==0?C.a.gD(x):null
if(!(x==null))x.h4(a,v)
if(this.a==null)H.f(new P.E("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().d=x
x=a.r
y.ga5().x=x
a.d.fC(y.p())
return v},
i4:function(a,b,c,d,e){return this.f1(a,b,c,d,!1,e)},
i3:function(a,b,c,d,e){return this.f1(a,b,c,d,e,!1)}},
iH:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.gj())}},
D:{"^":"a7;bT:b<",
ga_:function(){var z=new Y.Z(H.r([],[Y.a8]),0,P.az())
z.fz(0,this.gai(),this.b)
return z.ce()},
an:function(a,b){var z=new Y.Z(H.r([],[Y.a8]),0,P.az())
z.j4(0,this.gam(),this.b,a,!0)
return z.ce()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gai()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cC:{"^":"a7;",
ga_:function(){return this.b.ga_()},
k:function(a){return"ExitAction<"+this.b.ga_()+">"}},
cF:{"^":"a7;",
ga_:function(){var z=new Y.Z(H.r([],[Y.a8]),0,P.az())
z.fz(0,"pick up <object>",this.b)
return z.ce()},
k:function(a){return"ItemAction<"+this.ga_()+">"}},
mQ:{"^":"d;a,b",
k:function(a){return this.b},
w:{"^":"vC<"}}}],["","",,O,{"^":"",cq:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},lB:{"^":"d;a,b",
k:function(a){return this.b}},p6:{"^":"cq;a,fw:b<,b8:c<,d,dB:e<,eZ:f<,H:r<,hp:x<,hq:y<,z,hr:Q<",
Y:function(a){var z=new O.eG(null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cq))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.i(this.e,b.e))if(J.i(this.f,b.f)){z=this.r
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},eG:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfw:function(){return this.ga5().c},
gb8:function(){return this.ga5().d},
gdB:function(){return this.ga5().f},
geZ:function(){var z,y
z=this.ga5()
y=z.r
if(y==null){y=new L.bf(null,null,[P.u])
y.bw()
y.l(C.e)
z.r=y
z=y}else z=y
return z},
gH:function(){return this.ga5().x},
ghp:function(){return this.ga5().y},
ghq:function(){return this.ga5().z},
ghr:function(){return this.ga5().ch},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.bw()
y.l(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.bw()
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
if(x==null){x=new L.bf(null,null,[P.u])
x.bw()
x.l(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga5().c
w=this.ga5().d
v=this.ga5().e
u=this.ga5().f
t=this.ga5()
s=t.r
if(s==null){s=new L.bf(null,null,[P.u])
s.bw()
s.l(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga5().x
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
z=new O.p6(y,x,w,v,u,t,s,r,q,p,o)
if(y==null)H.f(P.l("accomplices"))
if(x==null)H.f(P.l("actionName"))
if(w==null)H.f(P.l("description"))
if(v==null)H.f(P.l("knownTo"))
if(u==null)H.f(P.l("protagonist"))
if(t==null)H.f(P.l("sufferers"))
if(s==null)H.f(P.l("time"))
if(r==null)H.f(P.l("wasAggressive"))
if(q==null)H.f(P.l("wasProactive"))
if(p==null)H.f(P.l("wasFailure"))
if(o==null)H.f(P.l("wasSuccess"))}this.l(z)
return z}}}],["","",,R,{"^":"",
hY:function(a,b){return P.aM(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hY(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bI(new H.J(u,new R.tB(z),[H.m(u,0)]))
case 3:return P.aK()
case 1:return P.aL(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eH(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.ry(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
tB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfQ()
y=this.a.gj()
return z==null?y==null:z===y}},
H:{"^":"lU;",
gjf:function(){return!0},
gbz:function(){var z=this.r
if(typeof z!=="number")return z.b4()
return z>0},
gbb:function(){return this.d instanceof K.bY},
gaL:function(){return this.dx===C.i},
ga3:function(){return this.dx===C.h},
ga8:function(){return this.dx===C.k},
jP:function(a){var z=this.fx
if(typeof z!=="number")return z.bK()
return z>=1},
ew:function(a,b){return this.fW(a,b)>0},
fW:function(a,b){var z,y
if(this.ez(b)){z=a.gbr()
y=this.fy.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.it(a,b,10))return 1
z=a.gbr()
y=this.fy.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
ez:function(a){var z,y
z=a.cj("Confuse",this,!0)
if(z==null)return!1
y=a.kI("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d4:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a2(this.x)
y=z.gaj()
if(typeof y!=="number")return H.v(y)
x=2*y
if(!z.gbz())x-=10
y=z.d
if(!(y instanceof K.bY))x+=4
y=J.aW(y.gae(),2)
if(typeof y!=="number")return H.v(y)
x+=y
for(y=z.ch,w=[null],v=new P.ag(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.aW(v.d.gae(),10)
if(typeof y!=="number")return H.v(y)
x+=y}y=a.a
for(v=y.gX(y),u=new H.cW(v,new R.ja(this),[H.m(y,0)]),t=0;u.u();){s=v.gG()
r=s.gaT()?2:0
q=s.gaj()
if(typeof q!=="number")return H.v(q)
p=J.aW(s.d.gae(),2)
if(typeof p!=="number")return H.v(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.ag(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.aW(q.d.gae(),10)
if(typeof r!=="number")return H.v(r)
t+=r}}return new A.cr(x,t,y.bk(0,0,new R.jb(this,a)))},
it:function(a,b,c){var z=b.kJ(a,this,!0)
if(z==null)return!1
return z<=c},
$isb9:1},
lU:{"^":"d+dj;"},
ry:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$em()
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
z=P.X(null,null,null,null)
a.gC().cx=z
z=this.cy
if(z!=null){y=new L.bh(null,null)
y.l(z)
z=y}else{z=$.$get$ib()
z.toString
y=new L.bh(null,null)
y.l(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
ja:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.i(a.gbr(),z.fy)){y=a.gj()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
jb:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaT()?1:0
y=b.gaj()
if(typeof y!=="number")return H.v(y)
return J.ao(a,(z+y)*this.a.fW(b,this.b))}},
dM:{"^":"d;a,b",
k:function(a){return this.b}},
p7:{"^":"H;a,fL:b<,by:c<,J:d<,fQ:e<,bt:f<,aj:r<,j:x<,y,ex:z<,F:Q<,bV:ch<,h0:cx<,h:cy<,du:db<,al:dx<,a1:dy<,fr,b5:fx<,br:fy<",
Y:function(a){var z=new R.eH(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.H))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.i(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
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
z=(z==null?y==null:z===y)&&J.i(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.t.gv(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.t.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eH:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfL:function(){return this.gC().c},
gby:function(){return this.gC().d},
sby:function(a){this.gC().d=a
return a},
gJ:function(){return this.gC().e},
sJ:function(a){this.gC().e=a
return a},
gfQ:function(){return this.gC().f},
gbt:function(){return this.gC().r},
sbt:function(a){this.gC().r=a
return a},
gaj:function(){return this.gC().x},
saj:function(a){this.gC().x=a
return a},
gj:function(){return this.gC().y},
gF:function(){return this.gC().ch},
gbV:function(){return this.gC().cx},
gh0:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gdu:function(){return this.gC().dx},
gal:function(){return this.gC().dy},
sal:function(a){this.gC().dy=a
return a},
ga1:function(){return this.gC().fr},
gb5:function(){return this.gC().fy},
sb5:function(a){this.gC().fy=a
return a},
gbr:function(){var z,y
z=this.gC()
y=z.go
if(y==null){y=new L.bh(null,null)
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
if(!(z==null)){y=new L.bh(null,null)
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
if(e==null){e=new L.bh(null,null)
f.go=e
f=e}else f=e
z=new R.p7(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
if(y==null)H.f(P.l("categories"))
if(v==null)H.f(P.l("currentWeapon"))
if(t==null)H.f(P.l("gold"))
if(s==null)H.f(P.l("hitpoints"))
if(r==null)H.f(P.l("id"))
if(q==null)H.f(P.l("initiative"))
if(p==null)H.f(P.l("isActive"))
if(o==null)H.f(P.l("isPlayer"))
if(n==null)H.f(P.l("items"))
if(m==null)H.f(P.l("maxHitpoints"))
if(l==null)H.f(P.l("name"))
if(k==null)H.f(P.l("nameIsProperNoun"))
if(j==null)H.f(P.l("pose"))
if(i==null)H.f(P.l("pronoun"))
if(g==null)H.f(P.l("stamina"))}this.l(z)
return z}}}],["","",,A,{"^":"",cr:{"^":"d;c3:a<,cW:b<,bT:c<",
at:function(a,b){return new A.ak(this.a-b.gc3(),this.b-b.gcW(),J.bq(this.c,b.gbT()))},
k:function(a){return"ActorScore<self="+C.j.bZ(this.a,2)+",team="+C.j.bZ(this.b,2)+",enemy="+J.cp(this.c,2)+">"}},ak:{"^":"d;c3:a<,cW:b<,bT:c<",
gk8:function(){return this.a===-1/0&&this.b===-1/0&&J.i(this.c,-1/0)},
c2:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ak(this.a*b,this.b*b,J.bR(this.c,b))},
a4:function(a,b){return new A.ak(this.a+b.gc3(),this.b+b.gcW(),J.ao(this.c,b.gbT()))},
d1:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ak(this.a/b,this.b/b,J.aW(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bZ(this.a,2)+",team="+C.j.bZ(this.b,2)+",enemy="+J.cp(this.c,2)+">"},
w:{
j9:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.an)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.v(r)
v+=r}if(y===0)throw H.c(P.C("Cannot average empty iterable"))
return new A.ak(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
v8:function(a){switch(a){case C.K:return"spear"
case C.x:return"sword"
case C.y:return"fist"
default:throw H.c(P.C(a))}},
ap:{"^":"lV;",
gb8:function(){return U.v8(C.a.geu(this.a))},
gj:function(){return H.aA(this)},
gex:function(){return!0},
gbz:function(){return!1},
gF:function(){return!1},
gdu:function(){return!1},
ga1:function(){return C.p},
gbr:function(){return $.$get$bP()},
$isb9:1},
lV:{"^":"d+dj;"},
dn:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",bY:{"^":"bG;h:b<,a"}}],["","",,G,{"^":"",cb:{"^":"bG;h:b<,cm:c<,cX:d<,cG:e<,fF:f<,a"}}],["","",,L,{"^":"",bG:{"^":"ap;",
gfF:function(){return!1},
gcG:function(){return!1},
gk5:function(){return!1},
gbc:function(){return this.gcm()>0},
geB:function(){return this.gcX()>0},
gm:function(a){return 2},
gcm:function(){return 0},
gcX:function(){return 0},
gae:function(){return this.gcm()+this.gcX()},
$isb9:1}}],["","",,G,{"^":"",lN:{"^":"d;",
fn:function(){var z,y
z=this.f
y=z.A
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.A=""}},
l3:[function(a){this.f.A+=a},"$1","gjw",2,0,20],
bp:function(){var z=0,y=P.ay(),x,w=this,v,u
var $async$bp=P.au(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.E("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sm(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gm(v)===0&&u.A.length===0)){z=4
break}z=5
return P.at(w.cZ(),$async$bp)
case 5:z=3
break
case 4:w.fn()
case 1:return P.aC(x,y)}})
return P.aD($async$bp,y)}}}],["","",,B,{"^":"",eS:{"^":"d;d3:a<,dq:b<,cQ:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.cp(this.b,3)+", score="+this.a.k(0)+">"}},bw:{"^":"d;bD:a<,fu:b<,eX:c<,kp:d<,dq:e<,f,r,eA:x<,cQ:y<",
gv:function(a){return X.bp([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
t:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbw&&this.gv(this)===z.gv(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gv(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
w:{
fn:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bR(e,b.gdq())
z=z?0:b.gcQ()+1
d.b=a.r
return new B.bw(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iI:{"^":"d;a,b,c,d,e,f",
ji:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.ag("...")
z.ag("combining scores")
y=H.r([],[A.ak])
x=new G.j2()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gG()
z.ag(new G.j0(r))
if(J.a3(r.gdq(),0.15))if(s==null){z.ag("    - first _bestCase")
s=r}else if(J.a3(x.$1(r.gd3()),x.$1(s.gd3()))){z.ag("    - new _bestCase")
s=r}q=r.gd3()
p=J.bq(q.c,t)
o=r.b
if(typeof o!=="number")return H.v(o)
n=new A.ak((q.a-v)*o,(q.b-u)*o,J.bR(p,o))
z.ag(new G.j1(n))
y.push(n)}m=A.j9(y)
w=s==null
if(w)l=C.D
else{q=s.gd3()
l=new A.ak(q.a-v,q.b-u,J.bq(q.c,t))}w=w?s:s.gcQ()
if(typeof w!=="number")return H.v(w)
k=new A.ak(l.a/w,l.b/w,J.aW(l.c,w))
z.ag("- uplifts average = "+("ActorScoreChange<self="+C.j.bZ(m.a,2)+",team="+C.j.bZ(m.b,2)+",enemy="+J.cp(m.c,2)+">"))
z.ag("- best = "+k.k(0))
j=k.a4(0,m)
z.ag("- result = "+j.k(0))
return j},
eP:function(){var z=this
return P.aM(function(){var y=0,x=1,w,v,u,t,s
return function $async$eP(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc9(),u=u.gX(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gG()
y=4
return""+t+") "+s.ga_()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aK()
case 1:return P.aL(w)}}})},
dw:function(a,b,c){var z=0,y=P.ay(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dw=P.au(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=x.f
w.b3(0)
v=x.c
u=v.a
t=u.a.aQ(0,new G.j3(x))
s=t.d4(u)
r=x.a
r.bI("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b1(x.e4(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gG()
r.b9(new G.j4(t,o))
if(o.K(t,u)!==!0){r.b9(new G.j5(o))
z=2
break}z=4
return P.at(x.cs(v,o,b,a,c).ck(0),$async$dw)
case 4:n=e
if(J.eD(n)===!0){r.b9(new G.j6(o))
w.n(0,o,C.E)
z=2
break}r.b9(new G.j7(s,o,n))
m=x.ji(n,s,b)
w.n(0,o,m)
r.b9(new G.j8(o,m))
z=2
break
case 3:x.e=!0
return P.aC(null,y)}})
return P.aD($async$dw,y)},
ko:function(){return this.dw(50,10,null)},
e4:function(a,b){return P.aM(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$e4(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bI((u.length!==0?C.a.gD(u):null).gbh())
case 2:u=(u.length!==0?C.a.gD(u):null).gaA()
t=u.length
s={func:1,ret:Q.cF,args:[U.ap]}
r={func:1,ret:Q.cC,args:[Q.w]}
q={func:1,ret:Q.D,args:[R.H]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.av(o,q)?6:8
break
case 6:x=9
return P.bI(Q.hV(z,y,o))
case 9:x=7
break
case 8:x=H.av(o,r)?10:12
break
case 10:x=13
return P.bI(Q.hW(z,y,o))
case 13:x=11
break
case 12:x=H.av(o,s)?14:16
break
case 14:x=17
return P.bI(Q.hX(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.E(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.an)(u),++p
x=3
break
case 5:return P.aK()
case 1:return P.aL(v)}}})},
cs:function(a5,a6,a7,a8,a9){var $async$cs=P.au(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aQ(0,new G.iL(t))
p=t.a
p.b9("=====")
p.b9(new G.iM(a6,q))
p.b9(new G.iN(a6))
if(a6.K(q,r)!==!0){p.b9("- firstAction not applicable")
z=1
break}o=q.d4(r)
p.b9(new G.iT(a5,o))
p.b9(new G.iU(a5))
n=P.b0(null,B.bw)
m=P.X(null,null,null,A.a5)
l=J.o(r)
k=l.gv(r)
for(j=new P.b1(a6.dl(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gG()
if(l.gv(r)!==k)throw H.c(new P.E("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.ay(h)}s.a=0
r=t.b
case 3:if(!!n.gL(n)){z=4
break}++s.a
g=n.dC()
p.ag("----")
p.ag(new G.iV(g))
p.ag(new G.iW(g))
if(g.gcQ()>a7||s.a>a8){p.ag(new G.iX(s,a7,g))
p.ag(new G.iY(g))
z=4
break}z=g.gbD().f.length===0?5:6
break
case 5:p.ag("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.ba(0,new G.iZ(t),new G.j_())
if(q==null){p.ag("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eS(q.d4(l),g.e,g.y)
p.ag(new G.iO(f))
z=7
x=[1]
return P.d0(P.hn(f),$async$cs,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gD(j):null).dK(l)
j=l.a
i=new H.J(j,new G.iP(t),[H.m(j,0)])
d=i.gm(i)
if(d>1)throw H.c(new P.E("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.fX("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aQ(0,new G.iQ(t))
c=J.i(e,q)
p.ag("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ag("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d4(l)
if(b==null)b=C.F
f=new B.eS(b,g.e,g.y)
p.ag(new G.iR(o,f))
p.ag(new G.iS(g))
z=8
x=[1]
return P.d0(P.hn(f),$async$cs,y)
case 8:p.ag("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b1(t.e4(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gG()
if(a2.K(e,l)!==!0)continue
for(a1=new P.b1(a2.dl(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gG();++t.d
if(J.bQ(a4.gdq(),0.05))continue
if(m.a6(0,a4.gbD()))continue
n.ay(a4)}}p.ag("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d0(null,0,y)
case 2:return P.d0(v,1,y)}})
var z=0,y=P.pB($async$cs),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.qW(y)}},j2:{"^":"a:31;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.v(z)
return a.b-z}},j0:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},j1:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},j3:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},j4:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.ga_()+"' for "+H.b(this.a.cy)}},j5:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.ga_()+"' isn't applicable"}},j6:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.ga_()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},j7:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.ga_()+"' leads to "+H.b(J.aG(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},j8:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.ga_()+"' was scored "+H.b(this.b)}},iL:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iM:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.ga_()+"' of "+H.b(this.b.gh())}},iN:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iT:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},iU:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c2(" ",z.y)+"- "+J.h(z.b)}},iV:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfu().ga_()+"'"}},iW:{"^":"a:1;a",
$0:function(){var z=this.a.gbD().f
return"- situation: "+H.b(J.iz(z.length!==0?C.a.gD(z):null))}},iX:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcQ()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iY:{"^":"a:1;a",
$0:function(){var z=this.a.gbD().d
return"- how we got here: "+new H.al(z,new G.iK(),[H.m(z,0),null]).cO(0," <- ")}},iK:{"^":"a:0;",
$1:function(a){return a.gb8()}},iZ:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},j_:{"^":"a:1;",
$0:function(){return}},iO:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},iP:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iQ:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iR:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iS:{"^":"a:1;a",
$0:function(){var z=this.a.gbD().d
return"- how we got here: "+new H.al(z,new G.iJ(),[H.m(z,0),null]).cO(0," <- ")}},iJ:{"^":"a:0;",
$1:function(a){return a.gb8()}}}],["","",,Z,{"^":"",md:{"^":"d;a,b",
gbh:function(){return this.b},
gL:function(a){return this.b.length===0},
h7:function(a,b){var z=this
return P.aM(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$h7(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bI(t)
case 5:w=1
break
case 4:s=z.im(new Z.mg())
r=z.e3(new Z.mh(),[s])
q=z.e3(new Z.mi(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bx().bI("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bx().bI("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bx().bI("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cn(t,new Z.mj(z,x))
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
break}case 17:t.length===o||(0,H.an)(t),++n
w=16
break
case 18:case 1:return P.aK()
case 2:return P.aL(u)}}})},
kn:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc4(y)
C.a.cn(y,new Z.mk(this,a))
x=this.a.a
w=x.gcl().bk(0,1/0,new Z.ml(a))
v=x.gcl().bk(0,-1/0,new Z.mm(a))
x=J.ah(v)
u=J.ah(w)
t=u.at(w,J.bR(x.at(v,w),0.1))
z.a=t
if(u.t(w,v)){t=J.bq(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.lL(y.length,new Z.mn(z,this,a,s),!1,P.K)
q=new H.al(r,new Z.mo(C.a.bk(r,0,Z.ia())),[H.m(r,0),null]).bB(0,!1)
z=C.a.bk(q,0,Z.ia())
if(typeof z!=="number")return H.v(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.ao(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.mH(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
e3:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.an)(z),++u){t=z[u]
if(C.a.a6(b,t))continue
if(w==null||J.a3(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
im:function(a){return this.e3(a,C.e)},
w:{
me:function(a){var z,y,x
z=a.gc9()
y=H.x(z,"y",0)
x=P.T(new H.J(z,new Z.mf(a),[y]),!1,y)
if(x.length===0)$.$get$bx().eO("After removing actions scored by undefined, there are no recommendations.")
return x},
vA:[function(a,b){return J.ao(a,b)},"$2","ia",4,0,42]}},mg:{"^":"a:0;",
$1:function(a){return a.gc3()}},mh:{"^":"a:0;",
$1:function(a){return J.iu(a.gbT())}},mi:{"^":"a:0;",
$1:function(a){return a.gcW()}},mj:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},mk:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},ml:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d3(a),H.d3(z))}},mm:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d3(a),H.d3(z))}},mn:{"^":"a:10;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.aW(J.bq(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},mo:{"^":"a:0;a",
$1:function(a){return J.iC(J.bR(J.aW(a,this.a),1000))}},mf:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gk8()}}}],["","",,K,{"^":"",r5:{"^":"a:3;",
$3:function(a,b,c){}},c8:{"^":"d;a,h:b<,c,d,jC:e<,f,bu:r<",
gjA:function(){return this.a},
gv:function(a){return C.b.gv(this.b)},
t:function(a,b){if(b==null)return!1
return b instanceof K.c8&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jD:function(a,b,c){return this.e.$3(a,b,c)},
w:{
a2:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.w])
z.af()
z.l(f)
return new K.c8(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;jv:a<,a_:b<,b8:c<,jZ:d<"}}],["","",,S,{"^":"",Y:{"^":"d;",
gaA:function(){return C.e},
gbh:function(){return C.e},
gh_:function(){return 3},
dK:function(a){return this.ax(this.gH(),a)},
h3:function(a,b){},
h4:function(a,b){},
kk:function(a,b){},
dv:function(a){},
d5:function(a){return!0}}}],["","",,S,{"^":"",
fw:function(a){var z=$.$get$bz().ad(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
mG:function(a,b){var z,y,x,w,v
z=$.$get$bz().kj()*b
for(y=new H.dz(a,a.gm(a),0,null,[H.x(a,"aT",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.v(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.C("The weights do not add up to total="+b))},
mH:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bz().ad(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.an)(a),++v){t=a[v]
if(typeof t!=="number")return H.v(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.C("The weights do not add up to total="+b))},
cN:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.I(a)
y=z.aS(a,"{")
if(y!==-1){x=z.gm(a)
if(typeof x!=="number")return x.at()
x=y<x-1}else x=!1
if(x){w=H.r([],[P.u])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.v(x)
if(!(u<x)){v=null
break}r=z.i(a,u)
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
if(p>1){o=$.$get$bz().ad(p)
z=z.aE(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.b(S.cN(C.b.aE(a,n+1,w[m])))
if(typeof v!=="number")return v.a4()
n=a.length
m+=C.b.aE(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cN(z)}else{x=z.gm(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.a4()
x=t+1
return z.aE(a,0,x)+H.b(S.cN(C.b.bE(a,x)))}}}else return a},
ad:function(a,b,c,d){switch($.$get$bz().ad(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",a8:{"^":"d;aW:a<,aR:b<,aM:c<,h6:d<,e,dm:f@,h9:r<,h1:x<,eY:y<,jz:z<,hL:Q<,d0:ch<,iY:cx<,k7:cy<,H:db<",
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
default:throw H.c(P.C("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aE(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},Z:{"^":"d;a,H:b<,c",
gev:function(){return C.a.bQ(this.a,new Y.o_())},
aK:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.i(b,""))return
z=(J.b5(b).er(b,".")||C.b.er(b,"!")||C.b.er(b,"?"))&&C.b.d7(b,P.be("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a8(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aK(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
I:function(a,b,c){return this.aK(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
j_:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return this.aK(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,m)},
fz:function(a,b,c){return this.aK(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
j6:function(a,b,c,d,e,f){return this.aK(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
dj:function(a,b,c,d){return this.aK(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
j3:function(a,b,c,d,e){return this.aK(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dj:function(a,b,c,d){return this.aK(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fA:function(a,b,c,d){return this.aK(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fB:function(a,b,c,d,e,f){return this.aK(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
j5:function(a,b,c,d,e,f){return this.aK(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
j1:function(a,b,c){return this.aK(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
j2:function(a,b,c,d){return this.aK(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
j4:function(a,b,c,d,e){return this.aK(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
ja:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.nY().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.an)(b),++u){t=b[u]
if(w>0){if(w===1&&J.i(t,C.a.gD(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bP(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.i(t,C.a.gD(b))){z+="."
this.j6(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
j9:function(a,b,c,d){return this.ja(a,b,c,"and",3,null,null,d)},
fD:function(){return this.I(0,"\n\n",!0)},
bP:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.I(a)
z=z.aS(a,"<owner's> "+H.b(b))!==-1||z.aS(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aS(a,"<object-owner's> "+H.b(b))!==-1||z.aS(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.I(a)
if(z.aS(a,"<subject's> "+H.b(b))!==-1||z.aS(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gdu()!==!0){y=this.c
x=y.i(0,c.gj())
if((x==null?-1:x)<e)w=z.cS(a,b,"the "+H.b(b))
else{w=J.eF(c.gh(),P.be("[aeiouy]",!1,!1))?z.cS(a,b,"an "+H.b(b)):z.cS(a,b,"a "+H.b(b))
y.n(0,c.gj(),e)}}else w=null
return w==null?a:w},
es:function(a,b){var z,y
if(!this.aO(a)||!this.aO(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaR()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaR()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaM()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaM()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaR().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.i(y,z[b].gaM().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaM().gj()
if(b>=z.length)return H.e(z,b)
z=J.i(y,z[b].gaR().gj())}else z=!1
return z},
dJ:function(a){var z=this
return P.aM(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dJ(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aO(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaR()!=null?3:4
break
case 3:x=5
return t.gaR()
case 5:case 4:x=t.gaM()!=null?6:7
break
case 6:x=8
return t.gaM()
case 8:case 7:x=t.gh6()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aK()
case 2:return P.aL(v)}}})},
cP:[function(a){var z=J.ah(a)
if(z.aP(a,0)||z.bK(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaM()}},"$1","gaM",2,0,21],
kl:function(a,b){var z
if(!this.aO(a)||!this.aO(b))return!1
if(this.es(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geY()}return!1},
h5:function(a){var z
for(z=!1;this.gev();z=!0){a.$1(this.ha(!0))
this.kt()}return z},
ha:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bk(z,[],new Y.o0())
C.a.iI(z,new Y.o1(y),!1)
x=a&&this.gev()?C.a.aS(z,C.a.dr(z,new Y.o2()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.es(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gdm())n=this.kl(s,p)&&this.hK(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gdm()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sdm(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghL()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjz()){if(s>=z.length)return H.e(z,s)
if(!z[s].gd0())if(this.dh(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gdm()}else n=!1
n=n||this.kK(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gd0()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gd0()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fw([" but "," but ",", but "])
u=!this.hx(s,s+1)&&!0}else{r+=S.fw([" and "," and ",", and "])
u=!0}}m=this.dS(s)
l=S.cN(m)
p=J.I(l)
if(p.a6(l,"{")===!0||p.a6(l,"}")===!0)$.$get$i4().dO('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dh(s,k)&&J.eF(this.dS(k),"<subject> ")&&p.d7(l,"<subject> ")}else k=!1
if(k)l=p.cS(l,"<subject> ","")
j=J.da(l,"<action>",this.dS(s))
p=s-1
k=this.iL(s,p)
if(k)k=!(this.cP(s).ga1()===C.p&&this.bg(s).ga1()===C.p)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dh(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cP(p)!=null)if(this.bg(s)!=null)if(this.bg(p)!=null){k=this.cP(p)
k=k==null?k:k.gj()
i=this.bg(s)
if(J.i(k,i==null?i:i.gj())){k=this.bg(p)
k=k==null?k:k.ga1()
i=this.bg(s)
k=!J.i(k,i==null?i:i.ga1())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bg(p)!=null)if(this.cP(s)!=null){k=this.bg(p)
k=k==null?k:k.gj()
i=this.cP(s)
if(J.i(k,i==null?i:i.gj())){p=this.bg(p)
p=p==null?p:p.ga1()
k=this.bg(s)
p=!J.i(p,k==null?k:k.ga1())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.e(z,s)
p=z[s]
h=p.gaR()
g=p.gaM()
f=p.gh6()
e=p.e
k=h!=null
if(k){if(h.gF()===!0){d=H.n(j,"<subject>","you")
d=H.n(d,"<subject's>","your")}else d=j
if(h.ga1()===C.B||h.ga1()===C.a_){d=H.n(d,"<s>","")
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
d=H.n(d,"<has>","has")}d=H.ij(d,"<subject>","<subjectNoun>",0)
i=h.ga1().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.co(this.bP(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga1().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a6(j,P.be("<subject>.+<subject's>",!0,!1))){c=h.ga1().c
d=H.n(d,"<subject's>",c)}d=J.co(this.bP(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga1().c
d=H.n(d,"<subject's>",i)
i=h.ga1().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga1().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gF()===!0){d=H.n(d,"<object>","you")
d=H.n(d,"<object's>","your")}else d=J.da(this.bP(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga1().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a6(j,P.be("<object>.+<object's>",!0,!1))){i=g.ga1().c
d=H.n(d,"<object's>",i)}d=J.co(this.bP(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga1().c
d=H.n(d,"<object's>",i)
i=g.ga1().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga1().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga1().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga1().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fo(e,this.fo(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.nZ(j):j
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gd0())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gd0()?r+".":r
return H.v3(z.charCodeAt(0)==0?z:z,$.$get$fQ(),new Y.o3(),null)},
ce:function(){return this.ha(!1)},
kt:function(){var z,y
if(!this.gev()){C.a.sm(this.a,0)
return}z=this.a
y=C.a.aS(z,C.a.dr(z,new Y.o4()))+1
P.c6(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hx:function(a,b){var z,y
if(!this.aO(a)||!this.aO(b))return!1
if(this.es(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geY()}if(!this.dh(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gh9()){if(b>=z.length)return H.e(z,b)
y=z[b].gh9()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gh1()){if(b>=z.length)return H.e(z,b)
z=z[b].gh1()}else z=!1
if(z)return!0
else return!1},
hK:function(a,b){var z,y,x,w,v
if(!this.aO(a)||!this.aO(b))return!1
for(z=new P.b1(this.dJ(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gG()
for(y=new P.b1(this.dJ(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gG()
if(J.i(x.gj(),v.gj()))return!0}}return!1},
dS:[function(a){var z=J.ah(a)
if(z.aP(a,0)||z.bK(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaW()}},"$1","gaW",2,0,11],
bg:[function(a){var z=J.ah(a)
if(z.aP(a,0)||z.bK(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaR()}},"$1","gaR",2,0,21],
kK:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gH()!=null){y=a-1
if(this.aO(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gH()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gH()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gH()
if(typeof y!=="number")return y.at()
if(typeof x!=="number")return H.v(x)
return y-x}},
k:function(a){return this.ce()},
aO:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fo:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gF()===!0?H.n(H.n(b,d,"you"),e,"your"):J.da(this.bP(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga1().a)
z=H.n(H.n(J.co(this.bP(C.b.a6(c,P.be(d+".+"+e,!0,!1))?H.n(z,e,a.ga1().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga1().c),g,a.ga1().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
iL:function(a,b){var z,y
if(!this.aO(a)||!this.aO(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaM()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaM()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaM().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaM().gj())},
dh:function(a,b){var z,y
if(!this.aO(a)||!this.aO(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaR()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaR()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaR().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaR().gj())},
w:{
nZ:function(a){var z,y,x
z=!C.b.a6(a,"\n\n")?C.b.kO(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bE(z,1)}}},o_:{"^":"a:0;",
$1:function(a){return J.i(a.gaW(),"\n\n")}},nY:{"^":"a:22;",
$1:function(a){return C.b.eN(H.n(H.n(a,"<also> ",""),"  "," "))}},o0:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.I(a)
y=z.gap(a)?z.gD(a):null
if(y!=null&&y.gk7()&&J.i(b.giY(),y.cx)){x=z.gm(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.q(a,b)
return a}},o1:{"^":"a:44;a",
$1:function(a){return J.iw(this.a,a)}},o2:{"^":"a:0;",
$1:function(a){return J.i(a.gaW(),"\n\n")}},o3:{"^":"a:45;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},o4:{"^":"a:0;",
$1:function(a){return J.i(a.gaW(),"\n\n")}},b9:{"^":"lW;du:a<,h:b<,c,br:d<,F:e<,a1:f<",
gj:function(){return H.aA(this)},
gex:function(){return!0},
gbz:function(){return!0},
w:{
di:function(a,b,c,d,e){var z=H.r([],[P.q])
return new Y.b9(c,b,z,e==null?$.$get$bP():e,!1,d)}}},lW:{"^":"d+dj;"},dj:{"^":"d;",
gaT:function(){return this.gbz()&&this.gex()===!0},
ab:function(a,b,c,d,e,f,g,h,i,j,k,l){J.iv(a,b,c,d,e,f,g,h,i,j,H.a6(this,"$isb9"),!1,l)},
ak:function(a,b){return this.ab(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
av:function(a,b,c){return this.ab(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
hc:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
aq:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
kB:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,null,!1,!1,d)},
bW:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cU:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
cg:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
aC:function(a,b,c){return this.ab(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
cf:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eH:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bA:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
cf:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
he:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
eI:function(a,b,c,d,e){return this.ab(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
kz:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
hd:function(a,b,c,d){return this.ab(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kD:function(a,b,c,d,e,f){return this.ab(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
bX:function(a,b,c,d,e){return this.ab(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
hb:function(a,b,c){return this.ab(a,b,c,!1,!1,!1,!1,null,null,!1,!1,!1)},
ky:function(a,b,c,d){return this.ab(a,b,c,!1,!1,!1,!1,d,null,!1,!1,!1)},
hf:function(a,b,c,d){return this.ab(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kC:function(a,b,c,d,e){return this.ab(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kE:function(a,b,c,d,e,f){return this.ab(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eH:function(a,b,c,d){return this.ab(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kA:function(a,b,c,d){return this.ab(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c4:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",rA:{"^":"a:0;",
$1:function(a){a.gcC().b=2
return 2}},rG:{"^":"a:0;",
$1:function(a){a.gcC().b=0
return 0}},rz:{"^":"a:0;",
$1:function(a){a.gcC().b=1
return 1}},fY:{"^":"d;"},pq:{"^":"fY;j:a<",
Y:function(a){var z=new L.bh(null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fY))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.M(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
w:{
e3:function(a){var z=new L.bh(null,null)
a.$1(z)
return z.p()}}},bh:{"^":"d;a,b",
gj:function(){return this.gcC().b},
gcC:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcC().b
z=new L.pq(y)
if(y==null)H.f(P.l("id"))}this.l(z)
return z}}}],["","",,X,{"^":"",
hI:function(a,b){return P.aM(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hI(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.b7(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.b7(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aK()
case 1:return P.aL(v)}}})}}],["","",,A,{"^":"",a5:{"^":"d;el:a<,bV:b<,c,d,e,f,H:r<,x",
gjm:function(){var z=this.f
return z.length!==0?C.a.gD(z):null},
gv:function(a){var z,y,x,w,v
z=X.bp(this.a)
y=X.bp(this.d)
x=X.bp(this.f)
w=this.r
v=this.c
v=X.d2(X.aV(X.aV(0,C.d.gv(w)),J.j(v)))
return X.d2(X.aV(X.aV(X.aV(X.aV(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
t:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa5&&this.gv(this)===z.gv(b)},
fv:function(a){var z,y
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
return C.b.a6(z.gh(),a)},
fM:function(a){var z,y,x
z=this.dd(a)
if(z==null)throw H.c(new P.E("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ao()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ao:function(){++this.r},
dI:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dT(0,new A.oX(a))
if(b!=null)z=z.c0(0,new A.oY(b))
if(c!=null)z=z.c0(0,new A.oZ(c))
if(e!=null)z=z.c0(0,new A.p_(e))
return d!=null?z.c0(0,new A.p0(d)):z},
hw:function(a,b){return this.dI(a,null,null,null,b)},
hv:function(a){return this.dI(a,null,null,null,null)},
a2:function(a){return this.a.aQ(0,new A.p1(a))},
dM:function(a){return this.e.aQ(0,new A.p2(a))},
eQ:function(a){var z,y
z=this.dd(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ac:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.i(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.C("No situation with name="+a+" found."))},
jO:function(a){var z=this.a.ba(0,new A.p3(a),new A.p4())
if(z==null)return!1
return z.gbz()},
aN:function(){var z,y
z=this.f
y=C.a.gD(z)
y.dv(this)
C.a.aa(z,y)},
bn:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.i(C.a.gD(z).gh(),a)))break
y=C.a.gD(z)
y.dv(this)
C.a.aa(z,y)}if(z.length===0)throw H.c(P.C("Tried to pop situations until "+a+" but none was found in stack."))},
cT:function(a,b){var z,y
z=this.dd(a)
if(z==null)throw H.c(P.C("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
dD:function(a,b,c,d,e){var z,y,x,w
z=this.dI(a,b,c,d,e)
y=z.gX(z)
if(y.u()){x=y.gG()
y=this.r
w=x.gH()
if(typeof w!=="number")return H.v(w)
return y-w}return},
kJ:function(a,b,c){return this.dD(null,a,b,c,null)},
cj:function(a,b,c){return this.dD(a,null,b,null,c)},
kI:function(a,b,c){return this.dD(a,b,null,null,c)},
kH:function(a){return this.dD(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ea()
y.ar(0,z)
return"World<"+P.c_(y,"{","}")+">"},
Z:function(a,b){var z,y,x
z=this.a2(a)
y=z.Y(b)
x=this.a
x.aa(0,z)
x.q(0,y)},
dd:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.i(y[x].gj(),a)){z=x
break}++x}return z},
hY:function(a){this.a.ar(0,a.a)
this.d.ar(0,a.d)
this.b.ar(0,a.b)
this.e.ar(0,a.e)
C.a.ar(this.f,a.f)
this.r=a.r},
w:{
e1:function(a){var z,y,x,w
z=P.X(null,null,null,R.H)
y=P.b0(null,O.cq)
x=P.X(null,null,null,U.ap)
w=P.X(null,null,null,null)
w=new A.a5(z,x,a.c,y,w,[],null,null)
w.hY(a)
return w}}},oX:{"^":"a:0;a",
$1:function(a){return a.gfw()===this.a}},oY:{"^":"a:0;a",
$1:function(a){return J.i(a.gdB(),this.a.gj())}},oZ:{"^":"a:0;a",
$1:function(a){return a.geZ().a6(0,this.a.x)}},p_:{"^":"a:0;a",
$1:function(a){return a.ghr()===this.a}},p0:{"^":"a:0;a",
$1:function(a){return a.ghp()===this.a}},p1:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},p2:{"^":"a:0;a",
$1:function(a){return J.i(a.gh(),this.a)}},p3:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},p4:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aI:{"^":"a7;a0:b<"},bB:{"^":"aI;c,a_:d<,O:e<,h:f<,b,a",
V:[function(a,b,c){throw H.c(new P.E("SimpleAction always succeeds"))},"$3","gS",6,0,2],
W:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gT",6,0,2],
an:function(a,b){throw H.c(new P.E("SimpleAction shouldn't have to provide roll reason"))},
M:function(a,b){return 1},
gP:function(){return!1},
K:function(a,b){return!0},
gR:function(){return H.f(new P.E("Not rerollable"))},
gU:function(){return!1}}}],["","",,N,{"^":"",jz:{"^":"D;P:c<,a0:d<,O:e<,U:f<,R:r<,b,a",
gai:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gam:function(){return"will <subject> confuse <object>?"},
V:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.aq(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eH(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bA(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aC(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){return 0.6},
K:function(a,b){var z
if(a.gF()===!0)if(a.ga8()){z=b.a
z=new H.J(z,new N.jA(this),[H.m(z,0)])
z=z.gm(z)>=2&&!this.b.ez(b)}else z=!1
else z=!1
return z},
w:{
ve:[function(a){return new N.jz(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","t1",2,0,4]}},jA:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbz()){z=a.gbr()
y=this.a.b.gbr()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",jX:{"^":"D;U:c<,R:d<,P:e<,a0:f<,O:r<,b,a",
gai:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gam:function(){return"will <subject> kick the weapon off?"},
V:[function(a,b,c){S.ad(new V.jY(this,a,c),new V.jZ(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y
S.ad(new V.k_(this,a,c),new V.k0(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gD(z):null
b.cT(y.gj(),y.Y(new V.k1(this)))
z=this.b
b.Z(z.gj(),new V.k2())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gT",6,0,2],
M:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
K:function(a,b){var z
if(a.ga8()||a.dx===C.i){z=this.b
z=z.ga3()&&!z.gbb()}else z=!1
return z},
w:{
vh:[function(a){return new V.jX(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","ti",2,0,4]}},jY:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.aq(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},jZ:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aq(z,"<subject> kick<s> <object's> weapon",y)
y.av(z,"<subject> hold<s> onto it",!0)}},k_:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kE(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gJ(),z,!0)}},k0:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bA(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.dj(0,"<owner's> <subject> fl<ies> away",y,y.gJ())}},k1:{"^":"a:23;a",
$1:function(a){a.gbH().q(0,this.a.b.gJ())
return a}},k2:{"^":"a:0;",
$1:function(a){a.sJ($.$get$em())
return a}}}],["","",,R,{"^":"",lv:{"^":"D;U:c<,R:d<,P:e<,a0:f<,O:r<,b,a",
gh:function(){return"KickToGround"},
gai:function(){return"kick <object> to the ground"},
gam:function(){return"will <subject> kick <object> prone?"},
V:[function(a,b,c){S.ad(new R.lw(this,a,c),new R.lx(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gS",6,0,2],
W:[function(a,b,c){var z
S.ad(new R.ly(this,a,c),new R.lz(this,a,c,b.ac("FightSituation").gbu()),null,null)
z=this.b
b.Z(z.gj(),new R.lA())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gT",6,0,2],
M:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
K:function(a,b){return(a.ga8()||a.dx===C.i)&&!this.b.ga3()},
w:{
vv:[function(a){return new R.lv(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","tP",2,0,4]}},lw:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.aq(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},lx:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aq(z,"<subject> kick<s> <object's> shin",y)
y.av(z,"<subject> <does>n't budge",!0)}},ly:{"^":"a:1;a,b,c",
$0:function(){this.b.kC(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},lz:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bA(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ak(z,"<subject> {grunt|shriek}<s>")
y.aC(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lA:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}}}],["","",,F,{"^":"",mc:{"^":"a7;O:b<,P:c<,a0:d<,U:e<,R:f<,a",
ga_:function(){return"Stand off."},
gh:function(){return"Pass"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){if(a.gF()===!0)a.ak(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gT",6,0,2],
an:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
K:function(a,b){return!0}}}],["","",,Y,{"^":"",mq:{"^":"D;U:c<,R:d<,P:e<,a0:f<,O:r<,b,a",
gai:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gam:function(){return"will <subject> force <object> off balance?"},
V:[function(a,b,c){var z=this.b
a.hf(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gJ(),z)
z.bW(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.hf(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gJ(),z)
if(z.ga8()){z.he(c,"<subject> lose<s> <object>",!0,$.$get$ek())
b.Z(z.x,new Y.mr())
C.a.q(b.f,U.lX(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gaL()){z.ak(c,"<subject> <is> already off balance")
c.fA(0,"<subject> make<s> <object> fall to the "+H.b(b.ac("FightSituation").gbu()),z,$.$get$ic())
b.Z(z.x,new Y.ms())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.E("enemy pose must be either standing or off-balance"))},"$3","gT",6,0,2],
M:function(a,b){var z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
K:function(a,b){var z,y
if(!a.ga3()){z=a.d
if(z.gbc()||z.gk5()){z=this.b
if(!z.gJ().gcG()){z.gJ().gfF()
y=!1}else y=!0
z=y&&!z.ga3()}else z=!1}else z=!1
return z},
w:{
vB:[function(a){return new Y.mq(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","tV",2,0,4]}},mr:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}},ms:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}}}],["","",,B,{"^":"",mO:{"^":"a7;O:b<,P:c<,a0:d<,U:e<,R:f<,a",
ga_:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){if(a.gF()===!0)a.bA(c,"<subject> regain<s> <object>",$.$get$ek(),!0)
b.Z(a.gj(),new B.mP())
return H.b(a.gh())+" regains balance"},"$3","gT",6,0,2],
an:function(a,b){return"Will "+a.ga1().a+" regain balance?"},
M:function(a,b){return 1},
K:function(a,b){return a.gaL()}},mP:{"^":"a:0;",
$1:function(a){a.sal(C.k)
return C.k}}}],["","",,O,{"^":"",n2:{"^":"a7;O:b<,P:c<,a0:d<,U:e<,R:f<,a",
ga_:function(){return"Scramble."},
gh:function(){return"Scramble"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gT",6,0,2],
an:function(a,b){return"Will "+a.ga1().a+" crawl out of harm's way?"},
M:function(a,b){return 1},
K:function(a,b){if(!a.ga3())return!1
if(Q.id(a,b))return!0
return!1}}}],["","",,Q,{"^":"",
id:function(a,b){var z,y,x
z=b.cj("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.cj("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cj("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
return!1},
nN:{"^":"a7;O:b<,P:c<,a0:d<,U:e<,R:f<,a",
ga_:function(){return"Stand up."},
gh:function(){return"StandUp"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){a.ak(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.ad(new Q.nO(a,c),new Q.nP(a,c),null,null)
b.Z(a.gj(),new Q.nQ())
return H.b(a.gh())+" stands up"},"$3","gT",6,0,2],
an:function(a,b){return"Will "+a.ga1().a+" stand up?"},
M:function(a,b){return 1},
K:function(a,b){if(!a.ga3())return!1
if(Q.id(a,b))return!1
return!0}},
nO:{"^":"a:1;a,b",
$0:function(){return this.a.ak(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},
nP:{"^":"a:1;a,b",
$0:function(){return this.a.ak(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},
nQ:{"^":"a:0;",
$1:function(a){a.sal(C.k)
return C.k}}}],["","",,T,{"^":"",
w_:[function(a){return new A.ae(T.eu(),null,null,new T.u2(),new T.u3(),new T.u4(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","uR",2,0,4],
w0:[function(a){return new A.ae(T.eu(),new T.u5(),T.eu(),new T.u6(),new T.u7(),new T.u8(),new T.u9(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","uS",2,0,4],
w1:[function(a,b,c,d,e){a.aq(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Z(a.gj(),new T.ua())},"$5","eu",10,0,9],
u2:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga3()&&a.gbb()&&c.gbb()}},
u3:{"^":"a:3;",
$3:function(a,b,c){return Y.eN(a,c)}},
u4:{"^":"a:3;",
$3:function(a,b,c){return S.dI(a,c,C.l)}},
u6:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga3()&&a.gbb()&&c.gbb()}},
u7:{"^":"a:3;",
$3:function(a,b,c){return Y.eN(a,c)}},
u8:{"^":"a:3;",
$3:function(a,b,c){return S.dI(a,c,C.m)}},
u5:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
u9:{"^":"a:3;",
$3:function(a,b,c){return S.dI(a,c,C.o)}},
ua:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}}}],["","",,A,{"^":"",ae:{"^":"D;c,d,e,f,r,x,y,z,O:Q<,P:ch<,a0:cx<,h:cy<,U:db<,R:dx<,ai:dy<,am:fr<,b,a",
V:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
K:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
w2:[function(a){return new A.ae(M.ev(),null,null,new M.ub(),new M.uc(),new M.ud(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","uT",2,0,4],
w3:[function(a){return new A.ae(M.ev(),new M.ue(),M.ev(),new M.uf(),new M.ug(),new M.uh(),new M.ui(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","uU",2,0,4],
w4:[function(a,b,c,d,e){if(a.ga3()){a.hb(c,"<subject> roll<s>",e.gj())
a.hb(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gj())}a.ky(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gj(),d)},"$5","ev",10,0,9],
ub:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&!c.ga3()}},
uc:{"^":"a:3;",
$3:function(a,b,c){return M.fb(a,c)}},
ud:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.l)}},
uf:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&!c.ga3()}},
ug:{"^":"a:3;",
$3:function(a,b,c){return M.fb(a,c)}},
uh:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.m)}},
ue:{"^":"a:3;",
$3:function(a,b,c){return a.ga8()?0.4:0.2}},
ui:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.o)}}}],["","",,U,{"^":"",
w5:[function(a){return new A.ae(U.ew(),null,null,new U.uj(),new U.uk(),new U.ul(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","uV",2,0,4],
w6:[function(a){return new A.ae(U.ew(),new U.um(),U.ew(),new U.un(),new U.uo(),new U.up(),new U.uq(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","uW",2,0,4],
w7:[function(a,b,c,d,e){c.j5(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","ew",10,0,9],
uj:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()!==!0)z=(a.ga8()||a.dx===C.i)&&!c.ga3()&&a.gbb()
else z=!1
return z}},
uk:{"^":"a:3;",
$3:function(a,b,c){return M.fv(a,c)}},
ul:{"^":"a:3;",
$3:function(a,b,c){return Z.dQ(a,c,C.l)}},
un:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gF()===!0)z=(a.ga8()||a.dx===C.i)&&!c.ga3()&&a.gbb()
else z=!1
return z}},
uo:{"^":"a:3;",
$3:function(a,b,c){return M.fv(a,c)}},
up:{"^":"a:3;",
$3:function(a,b,c){return Z.dQ(a,c,C.m)}},
um:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uq:{"^":"a:3;",
$3:function(a,b,c){return Z.dQ(a,c,C.o)}}}],["","",,G,{"^":"",
w8:[function(a){return new A.ae(G.ex(),null,null,new G.ut(),new G.uu(),new G.uv(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","uX",2,0,4],
wd:[function(a){return new A.ae(G.ex(),new G.uE(),G.ex(),new G.uF(),new G.uG(),new G.uH(),new G.uI(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","uY",2,0,4],
we:[function(a,b,c,d,e){return a.eI(c,"<subject> swing<s> {<subject's> "+H.b(a.gJ().gh())+" |}at <object>",e.gj(),!0,d)},"$5","ex",10,0,9],
ut:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.ga8()&&!c.ga3()&&a.d.gbc()}},
uu:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
uv:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.l)}},
uF:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.ga8()&&!c.ga3()&&a.d.gbc()}},
uG:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
uH:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.m)}},
uE:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uI:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}}}],["","",,R,{"^":"",
w9:[function(a,b,c,d,e){return a.he(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.gJ().gh()),!0,d)},"$5","ih",10,0,13],
wa:[function(a){return new A.ae(R.ii(),new R.uw(),R.ih(),new R.ux(),new R.uy(),new R.uz(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","uZ",2,0,4],
wb:[function(a){return new A.ae(R.ii(),new R.uA(),R.ih(),new R.uB(),new R.uC(),new R.uD(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","v_",2,0,4],
wc:[function(a,b,c,d,e){return a.eI(c,"<subject> swing<s> {<subject's> "+H.b(a.gJ().gh())+" |}at <object>",e.gj(),!0,d)},"$5","ii",10,0,9],
ux:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gaL()&&!c.ga3()&&a.d.gbc()}},
uy:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
uz:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.l)}},
uw:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uB:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gaL()&&!c.ga3()&&a.d.gbc()}},
uC:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
uD:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.m)}},
uA:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
wf:[function(a){return new A.ae(D.ey(),null,null,new D.uJ(),new D.uK(),new D.uL(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","v0",2,0,4],
wg:[function(a){return new A.ae(D.ey(),new D.uM(),D.ey(),new D.uN(),new D.uO(),new D.uP(),new D.uQ(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","v1",2,0,4],
wh:[function(a,b,c,d,e){return a.aq(c,"<subject> strike<s> down {with <subject's> "+H.b(a.gJ().gh())+" |}at <object>",d)},"$5","ey",10,0,13],
uJ:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&c.ga3()&&!a.ga3()&&a.d.gbc()}},
uK:{"^":"a:3;",
$3:function(a,b,c){return D.fS(a,c)}},
uL:{"^":"a:3;",
$3:function(a,b,c){return V.dG(a,c,C.l)}},
uN:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&c.ga3()&&!a.ga3()&&a.d.gbc()}},
uO:{"^":"a:3;",
$3:function(a,b,c){return D.fS(a,c)}},
uP:{"^":"a:3;",
$3:function(a,b,c){return V.dG(a,c,C.m)}},
uM:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uQ:{"^":"a:3;",
$3:function(a,b,c){return V.dG(a,c,C.o)}}}],["","",,Y,{"^":"",or:{"^":"cF;a0:c<,b,a",
gO:function(){return"A different weapon might change the battle."},
gP:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gU:function(){return!1},
gR:function(){return},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gD(z):null
b.cT(y.gj(),y.Y(new Y.os(this)))
b.Z(a.gj(),new Y.ot(this,a))
z=this.b
a.aq(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gT",6,0,2],
an:function(a,b){return H.f(new P.aa(null))},
M:function(a,b){return 1},
K:function(a,b){var z
a.gjf()
z=b.cj("DisarmKick",a,!0)
if(z!=null&&z<=2)return!1
return!0},
w:{
vF:[function(a){return new Y.or(!0,a,null)},"$1","v5",2,0,46]}},os:{"^":"a:23;a",
$1:function(a){a.gbH().aa(0,this.a.b)
return a}},ot:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gbb())a.gbV().q(0,a.gJ())
a.sJ(this.a.b)
return a}}}],["","",,M,{"^":"",oV:{"^":"a7;O:b<,U:c<,R:d<,P:e<,a0:f<,a",
ga_:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){a.ak(c,"<subject> shake<s> <subject's> head violently")
if(a.gF()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kA(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gT",6,0,2],
an:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
K:function(a,b){var z
if(a.ez(b)){z=b.cj("Confuse",a,!0)
if(typeof z!=="number")return z.b4()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",kQ:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gai:function(){return""},
gam:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
b.Z(z.gj(),new R.kR())
a.bA(c,"<subject> break<s> <object's> neck",z,!0)
X.cl(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gT",6,0,2],
M:function(a,b){return 1},
K:function(a,b){return!0},
w:{
vm:[function(a){return new R.kQ(null,!0,!0,!0,C.c,a,null)},"$1","tp",2,0,4]}},kR:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}}}],["","",,Y,{"^":"",
eN:function(a,b){var z=new Y.dd(null,null,null,null,null)
new Y.rT(a,b).$1(z)
return z.p()},
eM:{"^":"Y;",
gaA:function(){return[R.tp()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ao:function(){var z=new Y.dd(null,null,null,null,null)
z.l(this)
new Y.jn().$1(z)
return z.p()},
ax:function(a,b){if(a===0)return b.a2(this.a)
return},
aD:function(a,b){return new H.J(a,new Y.jo(this),[H.m(a,0)])}},
rT:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaX().c=z
a.gaX().e=0
z=this.a.gj()
a.gaX().b=z
z=this.b.gj()
a.gaX().d=z
return a}},
jn:{"^":"a:0;",
$1:function(a){var z=a.gaX().e
if(typeof z!=="number")return z.a4()
a.gaX().e=z+1
return a}},
jo:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
p8:{"^":"eM;a,j:b<,c,H:d<",
Y:function(a){var z=new Y.dd(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eM))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dd:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaX().c},
gH:function(){return this.gaX().e},
gaX:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaX().b
x=this.gaX().c
w=this.gaX().d
v=this.gaX().e
z=new Y.p8(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",kz:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gai:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gam:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {dodge it|break free}")
S.ad(new Z.kA(a,c),new Z.kB(this,a,c),null,null)
b.aN()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.bA(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.bn("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gD(z):null).gbo().bm(0.5)},
K:function(a,b){return!0},
w:{
vl:[function(a){return new Z.kz("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","tm",2,0,4]}},kA:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>}",!0)}},kB:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cU(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dI:function(a,b,c){var z=new S.dH(null,null,null,null,null,null)
new S.rS(a,b,c).$1(z)
return z.p()},
fl:{"^":"bV;",
gaA:function(){return[Z.tm()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ao:function(){var z=new S.dH(null,null,null,null,null,null)
z.l(this)
new S.m6().$1(z)
return z.p()}},
rS:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gj()
a.gaJ().b=z
z=this.b.gj()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
m6:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.a4()
a.gaJ().f=z+1
return a}},
ph:{"^":"fl;cE:a<,j:b<,cd:c<,ci:d<,H:e<",
Y:function(a){var z=new S.dH(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fl))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dH:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaJ().c},
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
z=new S.ph(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,G,{"^":"",
vP:[function(a,b,c,d,e){a.ak(c,"<subject> tr<ies> to swing back")
a.eH(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga8()){b.Z(a.x,new G.t4())
a.cf(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.Z(a.x,new G.t5())
a.aC(c,"<subject> lose<s> balance because of that",!0)
a.cf(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hN",10,0,13],
vQ:[function(a){return new A.ae(G.hO(),new G.t6(),G.hN(),new G.t7(),new G.t8(),new G.t9(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","te",2,0,4],
vS:[function(a,b,c,d,e){return a.aq(c,"<subject> swing<s> back",d)},"$5","hO",10,0,9],
vR:[function(a){return new A.ae(G.hO(),new G.ta(),G.hN(),new G.tb(),new G.tc(),new G.td(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tf",2,0,4],
t4:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}},
t5:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},
t7:{"^":"a:3;",
$3:function(a,b,c){return a.gF()!==!0&&a.gJ().gbc()&&!a.ga3()}},
t8:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
t9:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.l)}},
t6:{"^":"a:3;",
$3:function(a,b,c){return c.ga8()?0.7:0.9}},
tb:{"^":"a:3;",
$3:function(a,b,c){return a.gF()===!0&&a.gJ().gbc()&&!a.ga3()}},
tc:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
td:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.m)}},
ta:{"^":"a:3;",
$3:function(a,b,c){return c.ga8()?0.7:0.9}}}],["","",,V,{"^":"",jI:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gai:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gam:function(){return"will <subject> tackle <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.aq(c,"<subject> tr<ies> to tackle <object>",z)
S.ad(new V.jJ(a,c),new V.jK(this,c),null,null)
a.aq(c,"<subject> land<s> on the "+H.b(U.ep(b))+" next to <object>",z)
b.Z(a.gj(),new V.jL())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.aq(c,"<subject> tackle<s> <object> to the ground",z)
b.Z(z.gj(),new V.jM())
b.Z(a.gj(),new V.jN())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){var z=this.b.gaL()?0.2:0
if(a.gF()===!0)return 0.7+z
return 0.5+z},
K:function(a,b){return!a.ga3()&&a.d instanceof K.bY},
w:{
vf:[function(a){return new V.jI("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tg",2,0,4]}},jJ:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> go<es> wide",!0)}},jK:{"^":"a:1;a,b",
$0:function(){return this.a.b.av(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},jL:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},jM:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},jN:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}}}],["","",,S,{"^":"",
dh:function(a,b){var z=new S.dg(null,null,null,null,null)
new S.rJ(a,b).$1(z)
return z.p()},
eT:{"^":"Y;",
gaA:function(){return[G.te(),G.tf(),V.tg()]},
gbh:function(){return[$.$get$dK()]},
gh:function(){return"CounterAttackSituation"},
ao:function(){var z=new S.dg(null,null,null,null,null)
z.l(this)
new S.jG().$1(z)
return z.p()},
ax:function(a,b){if(a===0)return b.a2(this.a)
return},
aD:function(a,b){return new H.J(a,new S.jH(this),[H.m(a,0)])}},
rJ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gj()
a.gaY().b=z
z=this.b.gj()
a.gaY().d=z
return a}},
jG:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.a4()
a.gaY().e=z+1
return a}},
jH:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
p9:{"^":"eT;a,j:b<,c,H:d<",
Y:function(a){var z=new S.dg(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eT))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dg:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaY().c},
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
z=new S.p9(y,x,w,v)
if(y==null)H.f(P.l("counterAttacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,X,{"^":"",
cl:function(a,b,c){var z,y
z=b.ac("FightSituation")
y=z.gbu()
b.cT(z.gj(),z.Y(new X.tQ(c)))
if(c.gal()===C.h){c.aC(a,"<subject> stop<s> moving",!0)
a.I(0,"\n\n",!0)
return}switch($.$get$hz().ad(3)){case 0:c.cf(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aC(a,"<subject> fall<s> backward",!0)
c.aC(a,"<subject> twist<s>",!0)
c.cf(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aC(a,"<subject> drop<s> to <subject's> knees",!0)
c.aC(a,"<subject> keel<s> over",!0)
break}a.I(0,"\n\n",!0)},
tQ:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gbb())a.gbH().q(0,z.d)
return a}}}],["","",,O,{"^":"",bV:{"^":"nv;",
ax:function(a,b){if(a===0)return b.a2(this.gci())
return},
aD:function(a,b){return new H.J(a,new O.jS(this),[H.m(a,0)])}},nv:{"^":"Y+mt;"},jS:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.gcE())||J.i(a.gj(),z.gci())}}}],["","",,U,{"^":"",
ep:function(a){return a.ac("FightSituation").gbu()},
dl:function(a,b,c,d,e){var z=new U.bX(null,null,null,null,null,null,null,null,null)
new U.r8(a,b,c,d,e).$1(z)
return z.p()},
cD:{"^":"Y;",
gaA:function(){return[N.t1(),V.ti(),R.tP(),Y.tV(),T.uR(),T.uS(),M.uT(),M.uU(),U.uV(),U.uW(),G.uX(),G.uY(),D.v0(),D.v1(),R.uZ(),R.v_(),Y.v5()]},
gbh:function(){return H.r([$.$get$fy(),$.$get$fP(),$.$get$fC(),$.$get$hf()],[Q.a7])},
gh_:function(){return 1000},
gh:function(){return"FightSituation"},
cF:function(a,b){var z=b.a
return(z&&C.a).bQ(z,new U.kD(a))},
ao:function(){var z=new U.bX(null,null,null,null,null,null,null,null,null)
z.l(this)
new U.kE().$1(z)
return z.p()},
ax:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hI(this.f,this.b)
y=H.bv(z,new U.kF(b),H.x(z,"y",0),null)
x=H.x(y,"y",0)
w=P.T(new H.J(y,new U.kG(),[x]),!1,x)
x=H.m(w,0)
v=P.T(new H.J(w,new U.kH(),[x]),!1,x)
u=v.length===1?C.a.gc4(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.an)(w),++r){q=w[r]
x=b.d
p=x.ba(0,new U.kI(q),new U.kJ())
o=p==null?p:p.gH()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.v(o)
m=n-o
if(m<=0)continue
l=x.ba(0,new U.kK(q),new U.kL())
k=l==null?l:l.gH()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.v(k)
j=(x-k+m)/2
if(q.gF()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aD:function(a,b){return new H.J(a,new U.kM(this),[H.m(a,0)])},
h4:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a7(z))y.i(0,z).$2(a,b)},
dv:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cF(a,this.b)&&this.cF(a,this.f)){y=a.eQ(z)
a.cT(y.gj(),y.Y(new U.kN()))
for(z=this.f,x=z.a,x=new J.b7(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.u();){v=x.d
if(a.a2(v).gaT()){u=a.a2(v)
t=u.Y(new U.kO())
w.aa(0,u)
w.q(0,t)}}C.a.q(a.f,X.lO(z,this.d,this.a,null))}else this.cF(a,this.f)},
d5:function(a){var z=this.f
if(this.cF(a,z))if(this.cF(a,this.b)){z=z.a
z=(z&&C.a).bQ(z,new U.kP(a))}else z=!1
else z=!1
return z}},
r8:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$U().ad(1073741823)
a.gah().f=z
a.gah().y=0
z=a.gah()
y=z.r
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.e)
z.r=y
z=y}else z=y
z.l(J.eE(this.a,new U.qK()))
z=a.gah()
y=z.c
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.e)
z.c=y
z=y}else z=y
y=this.b
z.l(new H.al(y,new U.qL(),[H.m(y,0),null]))
a.gah().e=this.c
y=new S.N(null,null,[U.ap])
y.af()
y.l(C.e)
a.gah().b=y
y=this.d.gj()
a.gah().x=y
y=new A.cI(null,null,[P.u,{func:1,v:true,args:[A.a5,Y.Z]}])
y.c7()
y.l(this.e)
a.gah().d=y
return a}},
qK:{"^":"a:0;",
$1:function(a){return a.gj()}},
qL:{"^":"a:0;",
$1:function(a){return a.gj()}},
kD:{"^":"a:0;a",
$1:function(a){return this.a.a2(a).gaT()}},
kE:{"^":"a:0;",
$1:function(a){var z=a.gah().y
if(typeof z!=="number")return z.a4()
a.gah().y=z+1
return a}},
kF:{"^":"a:0;a",
$1:function(a){return this.a.a2(a)}},
kG:{"^":"a:0;",
$1:function(a){return a.gaT()}},
kH:{"^":"a:0;",
$1:function(a){return a.gF()}},
kI:{"^":"a:0;a",
$1:function(a){return J.i(a.gdB(),this.a.gj())&&a.ghq()===!0}},
kJ:{"^":"a:1;",
$0:function(){return}},
kK:{"^":"a:0;a",
$1:function(a){return J.i(a.gdB(),this.a.gj())}},
kL:{"^":"a:1;",
$0:function(){return}},
kM:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gaT()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).a6(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).a6(z,y)
z=y}else z=!0}else z=!1
return z}},
kN:{"^":"a:0;",
$1:function(a){a.ski(!1)
return a}},
kO:{"^":"a:0;",
$1:function(a){a.sal(C.k)
return a}},
kP:{"^":"a:29;a",
$1:function(a){var z=this.a.a2(a)
return z.gF()===!0&&z.gaT()}},
pb:{"^":"cD;bH:a<,b,c,bu:d<,j:e<,dz:f<,r,H:x<",
Y:function(a){var z=new U.bX(null,null,null,null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cD))return!1
if(J.i(this.a,b.a))if(J.i(this.b,b.b))if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.i(this.f,b.f))if(J.i(this.r,b.r)){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
bX:{"^":"d;a,b,c,d,e,f,r,x,y",
gbH:function(){var z,y
z=this.gah()
y=z.b
if(y==null){y=new S.N(null,null,[U.ap])
y.af()
y.l(C.e)
z.b=y
z=y}else z=y
return z},
gbu:function(){return this.gah().e},
gj:function(){return this.gah().f},
gdz:function(){var z,y
z=this.gah()
y=z.r
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.e)
z.r=y
z=y}else z=y
return z},
gH:function(){return this.gah().y},
gah:function(){var z,y
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
if(!(z==null)){y=new A.cI(null,null,[H.m(z,0),H.m(z,1)])
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
if(z==null){y=this.gah()
x=y.b
if(x==null){x=new S.N(null,null,[U.ap])
x.af()
x.l(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gah()
w=x.c
if(w==null){w=new S.N(null,null,[P.u])
w.af()
w.l(C.e)
x.c=w
x=w}else x=w
x=x.p()
w=this.gah()
v=w.d
if(v==null){v=new A.cI(null,null,[P.u,{func:1,v:true,args:[A.a5,Y.Z]}])
v.c7()
v.l(C.X)
w.d=v
w=v}else w=v
w=w.p()
v=this.gah().e
u=this.gah().f
t=this.gah()
s=t.r
if(s==null){s=new S.N(null,null,[P.u])
s.af()
s.l(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.gah().x
r=this.gah().y
z=new U.pb(y,x,w,v,u,t,s,r)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("enemyTeamIds"))
if(w==null)H.f(P.l("events"))
if(v==null)H.f(P.l("groundMaterial"))
if(u==null)H.f(P.l("id"))
if(t==null)H.f(P.l("playerTeamIds"))
if(s==null)H.f(P.l("roomRoamingSituationId"))
if(r==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,R,{"^":"",kS:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishLeap"},
gai:function(){return""},
gam:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.Z(z.gj(),new R.kT())
b.Z(a.gj(),new R.kU())
y=b.ac("LeapSituation").gj()
x=U.ep(b)
a.cg(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.j1(0,"both "+(a.gF()===!0||z.gF()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gaj()
if(typeof w!=="number")return w.b4()
if(w>1){c.j2(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
z.aC(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.Z(z.x,new R.kV())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){return 1},
K:function(a,b){return!0},
w:{
vn:[function(a){return new R.kS(null,!0,!0,!0,C.c,a,null)},"$1","tq",2,0,4]}},kT:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},kU:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},kV:{"^":"a:0;",
$1:function(a){var z=a.gaj()
if(typeof z!=="number")return z.at()
a.saj(z-1)
return a}}}],["","",,M,{"^":"",
fb:function(a,b){var z=new M.dx(null,null,null,null,null)
new M.rR(a,b).$1(z)
return z.p()},
fa:{"^":"Y;",
gaA:function(){return[R.tq()]},
gh:function(){return"LeapSituation"},
ao:function(){var z=new M.dx(null,null,null,null,null)
z.l(this)
new M.lD().$1(z)
return z.p()},
ax:function(a,b){if(a===0)return b.a2(this.a)
return},
aD:function(a,b){return new H.J(a,new M.lE(this),[H.m(a,0)])}},
rR:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaZ().c=z
a.gaZ().e=0
z=this.a.gj()
a.gaZ().b=z
z=this.b.gj()
a.gaZ().d=z
return a}},
lD:{"^":"a:0;",
$1:function(a){var z=a.gaZ().e
if(typeof z!=="number")return z.a4()
a.gaZ().e=z+1
return a}},
lE:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
pd:{"^":"fa;a,j:b<,c,H:d<",
Y:function(a){var z=new M.dx(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fa))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dx:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaZ().c},
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
z=new M.pd(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,S,{"^":"",k3:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gai:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gam:function(){return"will <subject> dodge?"},
V:[function(a,b,c){var z=b.ac("LeapSituation").gj()
a.hd(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaL())a.bX(c,"<subject> <is> out of balance",z,!0,!0)
else S.ad(new S.k4(a,c,z),new S.k5(a,c,z),null,null)
b.aN()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x
z=b.ac("LeapSituation").gj()
y=U.ep(b)
x=this.b
a.cg(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aC(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Z(x.gj(),new S.k6())
b.bn("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gT",6,0,2],
M:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.ga3()?0.2:0
if(a.Q===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gbo().bm(0.5-z+y)},
K:function(a,b){return!a.ga3()},
w:{
vi:[function(a){return new S.k3("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tj",2,0,4]}},k4:{"^":"a:1;a,b,c",
$0:function(){return this.a.bX(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},k5:{"^":"a:1;a,b,c",
$0:function(){return this.a.bX(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},k6:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}}}],["","",,D,{"^":"",l5:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gai:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gam:function(){return"will <subject> impale <objectPronoun>?"},
V:[function(a,b,c){var z,y
z=b.ac("LeapSituation").gj()
y=this.b
a.eI(c,"<subject> tr<ies> to {move|swing|shift} <subject's> "+H.b(a.gJ().gh())+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaL())a.bX(c,"<subject> <is> out of balance",z,!0,!0)
else S.ad(new D.l6(a,c,z),new D.l7(a,c,z),null,null)
b.aN()
return H.b(a.cy)+" fails to impale "+H.b(y.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w,v
z=b.ac("LeapSituation").gj()
y=this.b
a.cg(c,"<subject> {move<s>|swing<s>|shift<s>} <subject's> "+H.b(a.gJ().gh())+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aC(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
x=y.gaj()
if(typeof x!=="number")return x.b4()
w=a.d
v=y.x
if(x>1){w.aq(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.aC(c,"<subject> {scream|yell|grunt}<s> in pain",!0)
b.Z(v,new D.l8())}else{w.aq(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
X.cl(c,b,y)
b.Z(v,new D.l9())}b.bn("FightSituation")
return H.b(a.cy)+" impales "+H.b(y.cy)},"$3","gT",6,0,2],
M:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.ga3()?0.2:0
if(a.Q===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gbo().bm(0.4-z+y)},
K:function(a,b){return!a.ga3()&&a.d.geB()},
w:{
vr:[function(a){return new D.l5("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","tH",2,0,4]}},l6:{"^":"a:1;a,b,c",
$0:function(){return this.a.bX(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},l7:{"^":"a:1;a,b,c",
$0:function(){return this.a.bX(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},l8:{"^":"a:0;",
$1:function(a){var z=a.gaj()
if(typeof z!=="number")return z.at()
a.saj(z-1)
return a}},l9:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}}}],["","",,V,{"^":"",
dw:function(a,b,c){var z=new V.dv(null,null,null,null,null,null)
new V.rQ(a,b,c).$1(z)
return z.p()},
f9:{"^":"bV;",
gaA:function(){return[S.tj(),D.tH()]},
gh:function(){return"LeapDefenseSituation"},
ao:function(){var z=new V.dv(null,null,null,null,null,null)
z.l(this)
new V.lC().$1(z)
return z.p()}},
rQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaF().c=z
a.gaF().f=0
z=this.a.gj()
a.gaF().b=z
z=this.b.gj()
a.gaF().e=z
a.gaF().d=this.c
return a}},
lC:{"^":"a:0;",
$1:function(a){var z=a.gaF().f
if(typeof z!=="number")return z.a4()
a.gaF().f=z+1
return a}},
pc:{"^":"f9;cE:a<,j:b<,cd:c<,ci:d<,H:e<",
Y:function(a){var z=new V.dv(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f9))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dv:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaF().c},
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
z=new V.pc(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,Z,{"^":"",jc:{"^":"a7;P:b<,a0:c<,U:d<,R:e<,a",
ga_:function(){return""},
gO:function(){return},
gh:function(){return"AutoLoot"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=b.ac("LootSituation")
y=[]
for(x=z.gbH(),x=x.gX(x),w=b.a,v=null;x.u();){u=x.d
if(u instanceof L.bG){t=u.gcm()
s=u.gcX()
r=a.gJ().gae()
if(typeof r!=="number")return H.v(r)
r=t+s>r
t=r}else t=!1
if(t){q=b.a2(a.gj())
p=q.Y(new Z.jk(a,u))
w.aa(0,q)
w.q(0,p)
v=u}else{q=b.a2(a.gj())
p=q.Y(new Z.jl(u))
w.aa(0,q)
w.q(0,p)
y.push(u)}}if(v!=null){a.aq(c,"<subject> pick<s> up <object>",v)
a.aq(c,"<subject> wield<s> <object>",v)}this.ih(y,a,z,b,c)
if(y.length!==0)c.j9("<subject> <also> take<s>",y,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gT",6,0,2],
an:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
K:function(a,b){return a.gF()},
ih:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=P.T(new H.J(a,new Z.jd(),[H.m(a,0)]),!0,L.bG)
y=b.gbV()
y.toString
C.a.ar(z,new H.J(y,new Z.je(),[H.m(y,0)]))
if(z.length===0)return
C.a.cn(z,new Z.jf())
x=c.gdz().aU(0,new Z.jg(d)).dT(0,new Z.jh())
for(y=J.aj(x.a),w=new H.cW(y,x.b,[H.m(x,0)]),v=d.a;w.u();){u=y.gG()
if(z.length===0)break
t=C.a.ku(z)
s=d.a2(u.gj())
r=s.Y(new Z.ji(t))
v.aa(0,s)
v.q(0,r)
C.a.aa(a,t)
s=d.a2(b.gj())
r=s.Y(new Z.jj(t))
v.aa(0,s)
v.q(0,r)
b.aq(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jk:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gJ() instanceof K.bY))a.gbV().q(0,z.gJ())
a.sJ(this.b)
return a}},jl:{"^":"a:0;a",
$1:function(a){a.gbV().q(0,this.a)
return a}},jd:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},je:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},jf:{"^":"a:7;",
$2:function(a,b){return J.bS(a.gae(),b.gae())}},jg:{"^":"a:0;a",
$1:function(a){return this.a.a2(a)}},jh:{"^":"a:0;",
$1:function(a){return a.gaT()&&a.gbb()}},ji:{"^":"a:0;a",
$1:function(a){a.sJ(this.a)
return a}},jj:{"^":"a:0;a",
$1:function(a){a.gbV().aa(0,this.a)
return a}}}],["","",,X,{"^":"",
lO:function(a,b,c,d){var z=new X.dB(null,null,null,null,null,null)
new X.rH(a,b,c).$1(z)
return z.p()},
fg:{"^":"Y;",
gbh:function(){return H.r([$.$get$eJ()],[Q.a7])},
gh:function(){return"LootSituation"},
ao:function(){var z=new X.dB(null,null,null,null,null,null)
z.l(this)
new X.lQ().$1(z)
return z.p()},
ax:function(a,b){if(typeof a!=="number")return a.b4()
if(a>0)return
return this.fc(b.a)},
aD:function(a,b){return[this.fc(a)]},
d5:function(a){return!0},
fc:function(a){return a.dr(0,new X.lP())}},
rH:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.N(null,null,[P.u])
z.af()
z.l(this.a)
a.gau().d=z
z=new S.N(null,null,[U.ap])
z.af()
z.l(this.c)
a.gau().b=z
return a}},
lQ:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.a4()
a.gau().f=z+1
return a}},
lP:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaT()}},
pe:{"^":"fg;bH:a<,bu:b<,dz:c<,j:d<,H:e<",
Y:function(a){var z=new X.dB(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fg))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dB:{"^":"d;a,b,c,d,e,f",
gbH:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.N(null,null,[U.ap])
y.af()
y.l(C.e)
z.b=y
z=y}else z=y
return z},
gbu:function(){return this.gau().c},
gdz:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.N(null,null,[P.u])
y.af()
y.l(C.e)
z.d=y
z=y}else z=y
return z},
gj:function(){return this.gau().e},
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
if(x==null){x=new S.N(null,null,[U.ap])
x.af()
x.l(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.N(null,null,[P.u])
v.af()
v.l(C.e)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pe(y,x,w,v,u)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("groundMaterial"))
if(w==null)H.f(P.l("playerTeamIds"))
if(v==null)H.f(P.l("id"))
if(u==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,A,{"^":"",m0:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gai:function(){return"stab <object>"},
gam:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.aq(c,"<subject> tr<ies> to stab <object>",z)
a.av(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
b.Z(z.gj(),new A.m1(a))
if(b.a2(z.gj()).gbz()){a.bA(c,"<subject> thrust<s> {|<subject's> "+H.b(a.gJ().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.aC(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bA(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.gJ().gh())+" through} <object>",z,!0)
X.cl(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){if(a.gF()===!0)return 0.6
return 0.5},
K:function(a,b){return a.ga8()&&this.b.gaL()&&a.d.geB()},
w:{
vw:[function(a){return new A.m0("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","tS",2,0,4]}},m1:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gaj()
y=this.a.gJ().gcX()
if(typeof z!=="number")return z.at()
a.saj(z-y)
return a}}}],["","",,U,{"^":"",
lX:function(a,b){var z=new U.dE(null,null,null,null,null)
new U.rU(a,b).$1(z)
return z.p()},
fj:{"^":"Y;",
gaA:function(){return H.r([A.tS()],[{func:1,ret:Q.D,args:[R.H]}])},
gbh:function(){return[$.$get$dK()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ao:function(){var z=new U.dE(null,null,null,null,null)
z.l(this)
new U.lY().$1(z)
return z.p()},
ax:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b4()
if(a>0)return
z=b.a2(this.a)
y=b.a
x=H.m(y,0)
w=P.T(new H.J(y,new U.lZ(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geu(w)
if(v.ga8()&&z.gaL()&&v.d.geB())return v
return},
aD:function(a,b){return new H.J(a,new U.m_(b,b.a2(this.a)),[H.m(a,0)])}},
rU:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gb_().d=z
a.gb_().e=0
z=this.a.gj()
a.gb_().b=z
z=this.b
z=z==null?z:z.gj()
a.gb_().c=z
return a}},
lY:{"^":"a:0;",
$1:function(a){var z=a.gb_().e
if(typeof z!=="number")return z.a4()
a.gb_().e=z+1
return a}},
lZ:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gaT())if(a.ew(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
m_:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.i(a,z)||a.ew(z,this.a)}},
pf:{"^":"fj;a,b,j:c<,H:d<",
Y:function(a){var z=new U.dE(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fj))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dE:{"^":"d;a,b,c,d,e",
gj:function(){return this.gb_().d},
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
z=new U.pf(y,x,w,v)
if(y==null)H.f(P.l("actorId"))
if(w==null)H.f(P.l("id"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",kW:{"^":"D;O:c<,P:d<,a0:e<,U:f<,b,a",
gai:function(){return""},
gh:function(){return"FinishPunch"},
gR:function(){return},
gam:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga8()?C.i:C.h
x=b.ac("PunchSituation").gj()
w=b.ac("FightSituation").gbu()
b.Z(z.x,new O.kX(y))
switch(y){case C.k:throw H.c(new P.E("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fB(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aC(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.h:c.fB(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gT",6,0,2],
M:function(a,b){return 1},
K:function(a,b){return!0},
w:{
vo:[function(a){return new O.kW(null,!0,!0,!1,a,null)},"$1","tr",2,0,4]}},kX:{"^":"a:0;a",
$1:function(a){a.sal(this.a)
return a}}}],["","",,E,{"^":"",k7:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gai:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gam:function(){return"will <subject> dodge the fist?"},
V:[function(a,b,c){var z=b.ac("PunchSituation").gj()
a.hd(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.ad(new E.k8(a,c,z),new E.k9(this,a,c,z),null,null)
b.aN()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.cg(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ac("PunchSituation").gj(),z,!0)
b.bn("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dh(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){var z,y
z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gD(y):null).gbo().bm(0.4-z)},
K:function(a,b){return!0},
w:{
vj:[function(a){return new E.k7("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tk",2,0,4]}},k8:{"^":"a:1;a,b,c",
$0:function(){return this.a.bX(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},k9:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kD(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dQ:function(a,b,c){var z=new Z.dP(null,null,null,null,null,null)
new Z.rN(a,b,c).$1(z)
return z.p()},
ft:{"^":"bV;",
gaA:function(){return[E.tk()]},
gh:function(){return"PunchDefenseSituation"},
ao:function(){var z=new Z.dP(null,null,null,null,null,null)
z.l(this)
new Z.mD().$1(z)
return z.p()}},
rN:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaH().c=z
a.gaH().f=0
z=this.a.gj()
a.gaH().b=z
z=this.b.gj()
a.gaH().e=z
a.gaH().d=this.c
return a}},
mD:{"^":"a:0;",
$1:function(a){var z=a.gaH().f
if(typeof z!=="number")return z.a4()
a.gaH().f=z+1
return a}},
pi:{"^":"ft;cE:a<,j:b<,cd:c<,ci:d<,H:e<",
Y:function(a){var z=new Z.dP(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.ft))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dP:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaH().c},
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
z=new Z.pi(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,M,{"^":"",
fv:function(a,b){var z=new M.dR(null,null,null,null,null)
new M.rP(a,b).$1(z)
return z.p()},
fu:{"^":"Y;",
gaA:function(){return[O.tr()]},
gh:function(){return"PunchSituation"},
ao:function(){var z=new M.dR(null,null,null,null,null)
z.l(this)
new M.mE().$1(z)
return z.p()},
ax:function(a,b){if(a===0)return b.a2(this.a)
return},
aD:function(a,b){return new H.J(a,new M.mF(this),[H.m(a,0)])}},
rP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gb0().c=z
a.gb0().e=0
z=this.a.gj()
a.gb0().b=z
z=this.b.gj()
a.gb0().d=z
return a}},
mE:{"^":"a:0;",
$1:function(a){var z=a.gb0().e
if(typeof z!=="number")return z.a4()
a.gb0().e=z+1
return a}},
mF:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
pj:{"^":"fu;a,j:b<,c,H:d<",
Y:function(a){var z=new M.dR(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fu))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dR:{"^":"d;a,b,c,d,e",
gj:function(){return this.gb0().c},
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
z=new M.pj(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",kY:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishSlash"},
gai:function(){return""},
gam:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.Z(z.gj(),new O.l0(a))
y=b.ac("SlashSituation").gj()
x=b.a2(z.gj()).gbz()
if(x){a.cg(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.aC(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.cg(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.cl(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gT",6,0,2],
M:function(a,b){return 1},
K:function(a,b){return a.gJ().gbc()},
w:{
vq:[function(a){return new O.kY(null,!0,!0,!0,C.c,a,null)},"$1","ts",2,0,4]}},l0:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gaj()
y=this.a.gJ().gcm()
if(typeof z!=="number")return z.at()
a.saj(z-y)
return a}}}],["","",,X,{"^":"",jT:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gai:function(){return"step back and parry"},
gam:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gJ().gh())+"|fend it off}")
if(a.gaL())a.av(c,"<subject> <is> out of balance",!0)
else S.ad(new X.jU(a,c),new X.jV(this,a,c),null,null)
b.aN()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){if(a.gF()===!0)a.ak(c,"<subject> {step<s>|take<s> a step} back")
a.bW(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.gJ().gh())+"|fend<s> it off}",!0)
if(!a.ga8()){b.Z(a.x,new X.jW())
if(a.Q===!0)a.ak(c,"<subject> regain<s> balance")}b.bn("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gT",6,0,2],
M:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gD(z):null
x=a.ga8()?0:0.2
return y.gbo().bm(0.5-x)},
K:function(a,b){return a.gJ().gcG()},
w:{
vg:[function(a){return new X.jT("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","th",2,0,4]}},jU:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jV:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cU(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jW:{"^":"a:0;",
$1:function(a){a.sal(C.k)
return a}}}],["","",,F,{"^":"",ka:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"DodgeSlash"},
gai:function(){return"dodge and counter"},
gam:function(){return"will <subject> dodge?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaL())a.av(c,"<subject> <is> out of balance",!0)
else S.ad(new F.kb(a,c),new F.kc(this,a,c),null,null)
b.aN()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.bA(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga8()){z.cf(c,"<subject> lose<s> balance because of that",!0,!0)
b.Z(z.x,new F.kd())}b.bn("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dh(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gT",6,0,2],
M:function(a,b){var z,y
z=a.ga8()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gD(y):null).gbo().bm(0.4-z)},
K:function(a,b){return!a.ga3()},
w:{
vk:[function(a){return new F.ka("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tl",2,0,4]}},kb:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kc:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cU(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kd:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return C.i}}}],["","",,O,{"^":"",lu:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gai:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gam:function(){return"will <subject> avoid the slash?"},
V:[function(a,b,c){a.hc(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aN()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z
a.bW(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.dj(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gJ())
b.bn("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gT",6,0,2],
M:function(a,b){var z,y,x
if(a.gF()===!0)return 1
z=b.f
y=z.length!==0?C.a.gD(z):null
x=a.ga8()?0:0.2
return y.gbo().bm(0.5-x)},
K:function(a,b){return a.gbb()},
w:{
vu:[function(a){return new O.lu("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","tO",2,0,4]}}}],["","",,G,{"^":"",m9:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"ParrySlash"},
gai:function(){return"parry and counter"},
gam:function(){return"will <subject> parry?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gJ().gh())+"|fend it off}")
if(a.gaL())a.av(c,"<subject> <is> out of balance",!0)
else S.ad(new G.ma(a,c),new G.mb(this,a,c),null,null)
b.aN()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
if(z.gaL()){c.j3(0,"<subject> <is> out of balance",!0,!0,z)
c.dj(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$il())
a.bW(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.gJ().gh())+"|fend<s> it off easily}",!0)}else a.bW(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.gJ().gh())+"|fend<s> it off}",!0)
b.bn("FightSituation")
if(a.gF()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.dh(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gT",6,0,2],
M:function(a,b){var z,y,x
z=a.ga8()?0:0.2
y=this.b.gaL()?0.3:0
if(a.Q===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gbo().bm(0.3-z+y)},
K:function(a,b){return a.gJ().gcG()},
w:{
vy:[function(a){return new G.m9("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","tU",2,0,4]}},ma:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mb:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cU(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bg:function(a,b,c){var z=new L.dV(null,null,null,null,null,null)
new L.rI(a,b,c).$1(z)
return z.p()},
fG:{"^":"bV;",
gaA:function(){return[F.tl(),G.tU(),X.th(),O.tO()]},
gh:function(){return"SlashDefenseSituation"},
ao:function(){var z=new L.dV(null,null,null,null,null,null)
z.l(this)
new L.ny().$1(z)
return z.p()}},
rI:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gj()
a.gaI().b=z
z=this.b.gj()
a.gaI().e=z
a.gaI().d=this.c
return a}},
ny:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.a4()
a.gaI().f=z+1
return a}},
pl:{"^":"fG;cE:a<,j:b<,cd:c<,ci:d<,H:e<",
Y:function(a){var z=new L.dV(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fG))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dV:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaI().c},
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
z=new L.pl(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,M,{"^":"",
bC:function(a,b){var z=new M.dW(null,null,null,null,null)
new M.rK(a,b).$1(z)
return z.p()},
fH:{"^":"Y;",
gaA:function(){return[O.ts()]},
gh:function(){return"SlashSituation"},
ao:function(){var z=new M.dW(null,null,null,null,null)
z.l(this)
new M.nz().$1(z)
return z.p()},
ax:function(a,b){if(a===0)return b.a2(this.a)
return},
aD:function(a,b){return new H.J(a,new M.nA(this),[H.m(a,0)])}},
rK:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gb1().c=z
a.gb1().e=0
z=this.a.gj()
a.gb1().b=z
z=this.b.gj()
a.gb1().d=z
return a}},
nz:{"^":"a:0;",
$1:function(a){var z=a.gb1().e
if(typeof z!=="number")return z.a4()
a.gb1().e=z+1
return a}},
nA:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
pm:{"^":"fH;a,j:b<,c,H:d<",
Y:function(a){var z=new M.dW(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fH))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dW:{"^":"d;a,b,c,d,e",
gj:function(){return this.gb1().c},
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
z=new M.pm(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,Q,{"^":"",kZ:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gai:function(){return""},
gam:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
b.Z(z.gj(),new Q.l_())
c.fA(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gJ())
X.cl(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gT",6,0,2],
M:function(a,b){return 1},
K:function(a,b){return this.b.ga3()&&a.gJ().gbc()},
w:{
vp:[function(a){return new Q.kZ(null,!0,!0,!0,C.c,a,null)},"$1","tt",2,0,4]}},l_:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}}}],["","",,K,{"^":"",m3:{"^":"D;P:c<,a0:d<,U:e<,R:f<,O:r<,b,a",
gh:function(){return"OnGroundParry"},
gai:function(){return"parry it"},
gam:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.gJ().gh())+"}}")
S.ad(new K.m4(a,c),new K.m5(this,a,c),null,null)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){a.bW(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.gJ().gh())+"}",!0)
b.bn("FightSituation")
return H.b(a.cy)+" parries "+H.b(this.b.gh())},"$3","gT",6,0,2],
M:function(a,b){var z
if(a.gF()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gD(z):null).gbo().bm(0.3)},
K:function(a,b){return a.gJ().gcG()},
w:{
vx:[function(a){return new K.m3(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","tT",2,0,4]}},m4:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},m5:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cU(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",mR:{"^":"D;O:c<,P:d<,a0:e<,U:f<,R:r<,b,a",
gh:function(){return"RollOutOfWay"},
gai:function(){return"roll out of way"},
gam:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ak(c,"<subject> tr<ies> to roll out of the way")
a.av(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gS",6,0,2],
W:[function(a,b,c){a.kz(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gF()===!0){b.Z(a.gj(),new Y.mS())
a.bW(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bn("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gT",6,0,2],
M:function(a,b){var z
if(a.gF()===!0)return 1
z=b.f
return(z.length!==0?C.a.gD(z):null).gbo().bm(0.5)},
K:function(a,b){return!0},
w:{
vD:[function(a){return new Y.mR(null,!1,!1,!0,C.c,a,null)},"$1","tZ",2,0,4]}},mS:{"^":"a:0;",
$1:function(a){a.sal(C.k)
return a}}}],["","",,V,{"^":"",
dG:function(a,b,c){var z=new V.dF(null,null,null,null,null,null)
new V.rL(a,b,c).$1(z)
return z.p()},
fk:{"^":"bV;",
gaA:function(){return[K.tT(),Y.tZ()]},
gh:function(){return"OnGroundDefenseSituation"},
ao:function(){var z=new V.dF(null,null,null,null,null,null)
z.l(this)
new V.m2().$1(z)
return z.p()}},
rL:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaG().c=z
a.gaG().f=0
z=this.a.gj()
a.gaG().b=z
z=this.b.gj()
a.gaG().e=z
a.gaG().d=this.c
return a}},
m2:{"^":"a:0;",
$1:function(a){var z=a.gaG().f
if(typeof z!=="number")return z.a4()
a.gaG().f=z+1
return a}},
pg:{"^":"fk;cE:a<,j:b<,cd:c<,ci:d<,H:e<",
Y:function(a){var z=new V.dF(null,null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fk))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dF:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaG().c},
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
z=new V.pg(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,D,{"^":"",
fS:function(a,b){var z=new D.dY(null,null,null,null,null)
new D.rM(a,b).$1(z)
return z.p()},
fR:{"^":"Y;",
gaA:function(){return[Q.tt()]},
gh:function(){return"StrikeDownSituation"},
ao:function(){var z=new D.dY(null,null,null,null,null)
z.l(this)
new D.on().$1(z)
return z.p()},
ax:function(a,b){if(a===0)return b.a2(this.a)
return},
aD:function(a,b){return new H.J(a,new D.oo(this),[H.m(a,0)])}},
rM:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gb2().c=z
a.gb2().e=0
z=this.a.gj()
a.gb2().b=z
z=this.b.gj()
a.gb2().d=z
return a}},
on:{"^":"a:0;",
$1:function(a){var z=a.gb2().e
if(typeof z!=="number")return z.a4()
a.gb2().e=z+1
return a}},
oo:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
po:{"^":"fR;a,j:b<,c,H:d<",
Y:function(a){var z=new D.dY(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fR))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dY:{"^":"d;a,b,c,d,e",
gj:function(){return this.gb2().c},
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
z=new D.po(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("targetOnGround"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,O,{"^":"",mt:{"^":"d;",
gbo:function(){switch(this.gcd()){case C.l:return C.Y
case C.m:return $.$get$fo()
case C.o:return $.$get$fp()
default:throw H.c(P.C(this.gcd()))}},
$isY:1}}],["","",,K,{"^":"",dN:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",nB:{"^":"a7;P:b<,U:c<,a0:d<,R:e<,a",
ga_:function(){return""},
gO:function(){return},
gh:function(){return"SlayMonstersAction"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gD(z):null
x=b.dM(y.gby())
w=b.a
C.a.q(z,x.jD(b,y,new H.J(w,new D.nC(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gT",6,0,2],
an:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
K:function(a,b){var z=b.f
return H.a6(z.length!==0?C.a.gD(z):null,"$isa9").c}},nC:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaT()){z=a.gbr()
y=this.a.gbr()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gby()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",ou:{"^":"cC;P:c<,a0:d<,U:e<,R:f<,b,a",
gO:function(){return},
gh:function(){return"TakeExitAction"},
V:[function(a,b,c){throw H.c(new P.aa(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb8())
y=b.f
H.a6(y.length!==0?C.a.gD(y):null,"$isa9").bd(b,a,z.gjv(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gT",6,0,2],
an:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
K:function(a,b){var z=b.f
if(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").c===!0)return!1
this.b.gjZ()
return!0},
w:{
vG:[function(a){return new Y.ou(!1,!0,!1,null,a,null)},"$1","v6",2,0,47]}}}],["","",,F,{"^":"",
fz:function(a,b){var z=new F.dT(null,null,null,null,null)
new F.rx(a,b).$1(z)
return z.p()},
a9:{"^":"Y;",
gaA:function(){return[Y.v6()]},
gbh:function(){var z=[]
C.a.ar(z,$.$get$hG())
z.push($.$get$fI())
return z},
gh:function(){return"RoomRoamingSituation"},
ao:function(){var z=new F.dT(null,null,null,null,null)
z.l(this)
new F.mT().$1(z)
return z.p()},
ax:function(a,b){return b.a.ba(0,new F.mU(),new F.mV())},
aD:function(a,b){var z=this.ax(null,b)
if(z==null)return[]
return[z]},
h3:function(a,b){a.a.il(new F.mX(),!0)},
bd:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dM(c)
a.cT(this.b,F.fz(z,z.gjC()!=null))
d.fD()
z.c.$3(b,a,d)
d.I(0,"\n\n",!0)
for(y=R.hY(b,a),y=P.T(y,!0,H.x(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.an)(y),++v){u=a.a2(y[v].gj())
t=u.Y(new F.mW(z))
w.aa(0,u)
w.q(0,t)}},
d5:function(a){if(J.i(this.a,$.$get$en().b))return!1
return!0}},
rx:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.gaz().c=z
a.gaz().e=0
z=this.a.gh()
a.gaz().b=z
a.gaz().d=this.b
return a}},
mT:{"^":"a:0;",
$1:function(a){var z=a.gaz().e
if(typeof z!=="number")return z.a4()
a.gaz().e=z+1
return a}},
mU:{"^":"a:0;",
$1:function(a){return a.gF()===!0&&a.gaT()}},
mV:{"^":"a:1;",
$0:function(){return}},
mX:{"^":"a:0;",
$1:function(a){return!a.gbz()}},
mW:{"^":"a:0;a",
$1:function(a){a.sby(this.a.b)
return a}},
pk:{"^":"a9;by:a<,j:b<,c,H:d<",
Y:function(a){var z=new F.dT(null,null,null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.a9))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dT:{"^":"d;a,b,c,d,e",
gby:function(){return this.gaz().b},
sby:function(a){this.gaz().b=a
return a},
gj:function(){return this.gaz().c},
ski:function(a){this.gaz().d=a
return a},
gH:function(){return this.gaz().e},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
z=new F.pk(y,x,w,v)
if(y==null)H.f(P.l("currentRoomName"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("monstersAlive"))
if(v==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,V,{"^":"",
ow:function(){var z=new V.dZ(null,null,null)
new V.rX().$1(z)
return z.p()},
oH:function(){var z=new V.e_(null,null,null)
new V.rW().$1(z)
return z.p()},
nG:function(){var z=new V.dX(null,null,null)
new V.rV().$1(z)
return z.p()},
rv:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The crevice is small.\n",!0)}},
rw:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rt:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\nNobody else is in sight except for Agruth, Briana and you. That's Agruth's main mistake.\n",!0)}},
ru:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rq:{"^":"a:5;",
$3:function(a,b,c){c.I(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten, but it has to be revived. There is no turning back now. [a][b][c][d][e]\n\n\nBriana kneels down to Oddmund. "Dead," she says plainly.\n\n\nOddmund was the leader among the slaves. He was the only one brave enough to steal the disgusting but precious food from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n',!0)}},
rr:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
l1:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.eB(b,new V.l2())
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gS",6,0,2],
M:function(a,b){return 0.9},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gP:function(){return!1}},
l2:{"^":"a:0;",
$1:function(a){var z
a.gbL()
z=a.b
a.gbL()
a.b=z+1
return a}},
l3:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.eB(b,new V.l4())
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gS",6,0,2],
M:function(a,b){return 0.7},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gP:function(){return!1}},
l4:{"^":"a:0;",
$1:function(a){var z
a.gbL()
z=a.b
a.gbL()
a.b=z+1
return a}},
ns:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"start_of_book"))return!1
if(b.iW(this.d))return!1
return!0},
W:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.tE(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gS",6,0,2],
M:function(a,b){return 0.9},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gP:function(){return!1}},
ro:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rp:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rm:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
rn:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rk:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a6(b.c,"$isbW").b>=1)c.I(0,"You hear orders being yelled somewhere behind you.",!0)
c.I(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
rl:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
ri:{"^":"a:5;",
$3:function(a,b,c){c.I(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a6(b.c,"$isbW").b>=1)c.I(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.I(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
rj:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rf:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The crevice is small.\n",!0)}},
rg:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
rd:{"^":"a:5;",
$3:function(a,b,c){c.I(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
re:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
rb:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iX("sneak_onto_cart"))c.I(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.I(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.I(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
rc:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
r9:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
ra:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
r7:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The stone gate looms before you.\n",!0)}},
nD:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"mountain_pass_gate"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.eB(b,new V.nE())
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gT",6,0,2],
V:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gS",6,0,2],
M:function(a,b){return 1},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gP:function(){return!1}},
nE:{"^":"a:0;",
$1:function(a){a.gbL()
a.a=!0
return a}},
ov:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"mountain_pass_gate"))return!1
if(b.kH(this.d)!=null)return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.Z(a.gj(),new V.oE())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.ow())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gS",6,0,2],
M:function(a,b){return 0.5},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gP:function(){return!1}},
oE:{"^":"a:0;",
$1:function(a){var z=a.gbt()
if(typeof z!=="number")return z.a4()
a.sbt(z+10)
return a}},
fW:{"^":"Y;",
gbh:function(){return[new A.bB(new V.oz(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bB(new V.oA(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ao:function(){var z=new V.dZ(null,null,null)
z.l(this)
new V.oB().$1(z)
return z.p()},
ax:function(a,b){if(a!==0)return
return b.a.aQ(0,new V.oC())},
aD:function(a,b){return[a.aQ(0,new V.oD())]}},
rX:{"^":"a:0;",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.ga9().b=z
a.ga9().c=0
return a}},
oz:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.Z(a.gj(),new V.ox())
b.Z(a.gj(),new V.oy())
b.aN()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
ox:{"^":"a:0;",
$1:function(a){var z=a.gb5()
if(typeof z!=="number")return z.at()
a.sb5(z-1)
return a}},
oy:{"^":"a:0;",
$1:function(a){var z=a.gbt()
if(typeof z!=="number")return z.a4()
a.sbt(z+10)
return a}},
oA:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.aN()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
oB:{"^":"a:0;",
$1:function(a){var z=a.ga9().c
if(typeof z!=="number")return z.a4()
a.ga9().c=z+1
return a}},
oC:{"^":"a:0;",
$1:function(a){return a.gF()}},
oD:{"^":"a:0;",
$1:function(a){return a.gF()}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
rO:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"",!0)}},
oF:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.oH())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gS",6,0,2],
M:function(a,b){return 0.3},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gP:function(){return!1}},
h0:{"^":"Y;",
gbh:function(){return[new A.bB(new V.oJ(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bB(new V.oK(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ao:function(){var z=new V.e_(null,null,null)
z.l(this)
new V.oL().$1(z)
return z.p()},
ax:function(a,b){if(a!==0)return
return b.a.aQ(0,new V.oM())},
aD:function(a,b){return[a.aQ(0,new V.oN())]}},
rW:{"^":"a:0;",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.ga9().b=z
a.ga9().c=0
return a}},
oJ:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"mountainside_base",c)
b.aN()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
oK:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Z(a.gj(),new V.oI())
b.aN()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oI:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}},
oL:{"^":"a:0;",
$1:function(a){var z=a.ga9().c
if(typeof z!=="number")return z.a4()
a.ga9().c=z+1
return a}},
oM:{"^":"a:0;",
$1:function(a){return a.gF()}},
oN:{"^":"a:0;",
$1:function(a){return a.gF()}},
nF:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.nG())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gS",6,0,2],
M:function(a,b){return 0.8},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gP:function(){return!1}},
fK:{"^":"Y;",
gbh:function(){return[new A.bB(new V.nI(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bB(new V.nJ(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ao:function(){var z=new V.dX(null,null,null)
z.l(this)
new V.nK().$1(z)
return z.p()},
ax:function(a,b){if(a!==0)return
return b.a.aQ(0,new V.nL())},
aD:function(a,b){return[a.aQ(0,new V.nM())]}},
rV:{"^":"a:0;",
$1:function(a){var z=$.$get$U().ad(1073741823)
a.ga9().b=z
a.ga9().c=0
return a}},
nI:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"mountainside_base",c)
b.aN()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nJ:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.Z(a.gj(),new V.nH())
b.aN()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nH:{"^":"a:0;",
$1:function(a){a.saj(0)
return a}},
nK:{"^":"a:0;",
$1:function(a){var z=a.ga9().c
if(typeof z!=="number")return z.a4()
a.ga9().c=z+1
return a}},
nL:{"^":"a:0;",
$1:function(a){return a.gF()}},
nM:{"^":"a:0;",
$1:function(a){return a.gF()}},
oG:{"^":"aI;a_:c<,h:d<,b,a",
K:function(a,b){var z=b.f
if(!J.i(H.a6(z.length!==0?C.a.gD(z):null,"$isa9").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ac("RoomRoamingSituation").bd(b,N.aw(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gT",6,0,2],
V:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gS",6,0,2],
M:function(a,b){return 1},
gU:function(){return!1},
an:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"Perhaps you can divert its attention."},
gP:function(){return!1}},
rs:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
r6:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
rh:{"^":"a:5;",
$3:function(a,b,c){c.I(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
pp:{"^":"fW;j:a<,H:b<",
Y:function(a){var z=new V.dZ(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fW))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dZ:{"^":"d;a,b,c",
gj:function(){return this.ga9().b},
gH:function(){return this.ga9().c},
ga9:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga9().b
x=this.ga9().c
z=new V.pp(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.l(z)
return z}},
pr:{"^":"h0;j:a<,H:b<",
Y:function(a){var z=new V.e_(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.h0))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
e_:{"^":"d;a,b,c",
gj:function(){return this.ga9().b},
gH:function(){return this.ga9().c},
ga9:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga9().b
x=this.ga9().c
z=new V.pr(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.l(z)
return z}},
pn:{"^":"fK;j:a<,H:b<",
Y:function(a){var z=new V.dX(null,null,null)
z.l(this)
a.$1(z)
return z.p()},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fK))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.M(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dX:{"^":"d;a,b,c",
gj:function(){return this.ga9().b},
gH:function(){return this.ga9().c},
ga9:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
l:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga9().b
x=this.ga9().c
z=new V.pn(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.l(z)
return z}}}],["","",,N,{"^":"",
vU:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,0,2,100,!1,2,!0,C.r,0,$.$get$cj())
y=z.x
a.gel().q(0,z)
return U.dl(c,[z],"{rock|cavern} floor",b,P.ac([1,new N.tv(y),5,new N.tw(y),9,new N.tx(y),12,new N.ty(y),17,new N.tz(y)]))},"$3","va",6,0,14],
vV:[function(a,b,c){var z=[N.eg(),N.hx()]
a.gel().ar(0,z)
return U.dl(c,z,"{rock|cavern} floor",b,P.az())},"$3","vb",6,0,14],
vW:[function(a,b,c){var z=a.fv("take_out_gate_guards")||a.fv("take_out_gate_guards_rescue")?[N.eg()]:[N.eg(),N.hx()]
a.a.ar(0,z)
return U.dl(c,z,"ground",b,P.az())},"$3","vc",6,0,14],
aw:function(a){return a.gel().aQ(0,new N.tC())},
tE:function(a,b){a.Z(N.aw(a).gj(),new N.tF(b))},
eB:function(a,b){var z,y
z=H.a6(a.c,"$isbW")
z.toString
y=new M.e2(null,!1,0)
y.l(z)
a.c=b.$1(y).p()},
hx:function(){return R.b6(1000+$.$get$eh().ad(999999),"goblin",O.d6(),null,new G.cb("scimitar",1,1,!0,!1,P.bu(C.q,null)),null,0,1,0,!1,1,!1,C.r,0,$.$get$cj())},
eg:function(){return R.b6(1000+$.$get$eh().ad(999999),"orc",O.d6(),null,new G.cb("sword",1,1,!0,!1,P.bu(C.q,null)),null,0,2,0,!1,2,!1,C.r,0,$.$get$cj())},
tv:{"^":"a:7;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.a2(z)
x=new G.cb("scimitar",1,1,!0,!1,P.bu(C.q,null))
y.ak(b,"<subject> {drop<s>|let<s> go of} the whip")
y.aq(b,"<subject> draw<s> <subject's> <object>",x)
a.Z(z,new N.tu(x))
y.kB(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',N.aw(a),!0)}},
tu:{"^":"a:0;a",
$1:function(a){a.sJ(this.a)
return a}},
tw:{"^":"a:7;a",
$2:function(a,b){a.a2(this.a).ak(b,"<subject> spit<s> on the cavern floor")}},
tx:{"^":"a:7;a",
$2:function(a,b){var z=a.a2(this.a)
b.fD()
z.hc(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.I(0,"\n\n",!0)}},
ty:{"^":"a:7;a",
$2:function(a,b){var z=a.a2(this.a)
z.ak(b,"<subject> grit<s> <subject's> teeth")
z.av(b,"<subject> do<es>n't talk any more",!0)}},
tz:{"^":"a:7;a",
$2:function(a,b){a.a2(this.a).ak(b,"<subject> scowl<s> with pure hatred")}},
tC:{"^":"a:0;",
$1:function(a){return a.gF()}},
tF:{"^":"a:0;a",
$1:function(a){var z=a.gb5()
if(typeof z!=="number")return z.a4()
a.sb5(z+this.a)
return a}}}],["","",,O,{"^":"",
vT:[function(a){var z,y
z=$.$get$d9()
y=z.A
if(y.length>0){y+=" "
z.A=y}z.A=y+a},"$1","u0",2,0,15],
vX:[function(a){$.er=a},"$1","u1",2,0,15],
hM:[function(a,b,c,d,e,f,g){var z=L.eO(a,!1,!1,d,e,f,g)
$.$get$bN().q(0,z)
return z},function(a){return O.hM(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hM(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","u_",2,13,50,0,0,0,1,1,0],
n3:{"^":"nf;",
bs:function(){var z=0,y=P.ay(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bs=P.au(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cU){n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.B())
m=t.Q
n=Z.nU()
m.toString
l=new A.t(100,null,null,null,null)
l.e=n.B()
m.a.E(l.B())
new P.F(0,$.p,null,[null]).bv(!0)}if(t.r){n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.B())
t.r=!1
m=t.Q
m.toString
n=new A.t(60,null,null,null,null)
n.b=t.f.ck(0)
m.a.E(n.B())}s=null
case 3:n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.B())
w=7
z=10
return P.at(t.cu(),$async$bs)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.cu){r=n
q=H.A(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.t(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.E(l.B())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.t(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.E(l.B())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.i(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.B())
case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$bs,y)},
eJ:function(){var z,y
this.ff()
this.f.b3(0)
this.r=!0
this.e=this.c
z=this.Q
Z.he(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.E(y.B())
this.bs()},
kZ:[function(a){var z,y
z={}
z.a=null
y=$.$get$bN()
y.N(0,new O.nq(z,this,a))
z=z.a
if(z==null)throw H.c(P.C("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iD(z)
this.bs()},"$1","gio",2,0,32],
iD:function(a){var z
if(a.gfP()!=null){z=a.r
$.$get$ch().ay(z)}z=a.x
if(z!=null)this.eh(z)},
cu:function(){var z=0,y=P.ay(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cu=P.au(function(a,a0){if(a===1)return P.aB(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$ci()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.t(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.B())
p=r.b.dC()
r=v.Q
q=p.gjd()
u=p.b
o=p.c
r.toString
n=new A.t(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.B())
r=new P.F(0,$.p,null,[null])
r.bv(null)
r.bY(new O.ng(v))
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
k=new A.t(667,null,null,null,null)
k.c=r
o.a.E(k.B())
k=$.$get$bN()
k.ik(new O.nh(v),!1)
if(k.gm(k)!==0){r=v.Q
r.toString
o=new A.t(667,null,null,null,null)
o.c="We have choices."
r.a.E(o.B())
o=H.x(k,"b_",0)
o=P.T(new H.J(k,new O.ni(u,l),[o]),!0,o)
r=k.a
H.r([],[L.a4])
j=new L.eP(r,o)
if(!j.gL(j)){u=v.Q
r=u.e
if(r!=null){r.dn(new D.bT("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.cc(new P.F(0,$.p,null,[r]),[r])
r=j.dF()
u.a.E(r.B())
u=u.e.a.bY(v.gio())
i=new O.nj(v)
r=H.m(u,0)
q=$.p
if(q!==C.f){i=P.ei(i,q)
q.toString}u.d8(new P.e9(null,new P.F(0,q,null,[r]),6,new O.nk(),i,[r,r]))
x=!0
z=1
break}else{h=k.ba(0,new O.nl(),new O.nm())
if(h!=null){if(h.gfP()!=null){r=h.r
$.$get$ch().ay(r)}r=h.x
if(r!=null)v.eh(r)
k.aa(0,h)}}}r=$.$get$ch()
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
return P.at(v.cv(f),$async$cu)
case 5:x=a0
z=1
break
case 4:r=$.er
if(r!=null){v.eh(r)
$.er=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaw().length-1
v.x=r}else if($.hA)$.hA=!1
else{++r
v.x=r}u.a=r===v.e.gaw().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.t(667,null,null,null,null)
o.c=r
q.a.E(o.B())
if(v.x===v.e.gaw().length){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="End of book."
u.a.E(r.B())
r=v.Q
u=v.e_()
r.toString
u=u.eM(50)
r.a.E(u.B())
v.Q.a.E(new A.t(80,null,null,null,null).B())
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
r=P.a_
u.f=new P.cc(new P.F(0,$.p,null,[r]),[r])
r=new A.t(30,null,null,null,null)
r.c=q
u.a.E(r.B())
u.f.a.bY(new O.nn(v))
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
q=new A.t(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.B())
try{r=v.e.gaw()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.jb(r[q])}catch(b){u=H.z(b)
if(u instanceof M.cu){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.t(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.E(q.B())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.t(667,null,null,null,null)
q.c="- choices added"
r.a.E(q.B())
if(k.bQ(0,new O.no(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.B())
r=v.Q
u=v.e_()
r.toString
u=u.eM(50)
r.a.E(u.B())
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
r={func:1,ret:[P.O,P.aq]}
z=H.av(q,r)?12:14
break
case 12:d=v.x===v.e.gaw().length-1?v.e_():null
q=v.e.gaw()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.at(v.cv(H.hU(q[o],r)),$async$cu)
case 15:c=a0
if(k.bQ(0,new O.np(u,v))&&v.x===v.e.gaw().length-1){u=v.Q
u.toString
r=d.eM(50)
u.a.E(r.B())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaw()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.E("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aC(x,y)}})
return P.aD($async$cu,y)},
eh:function(a){var z,y,x,w,v
z=$.$get$cy()
if(z.b.test(H.bo(a))){y=this.d
if(y==null)throw H.c(new P.E("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.at()
w=z-1}else{x=this.b.dL(a,this.e.gdN())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a6(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.gho()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gho()
else z=!1}else z=!1
$.hy=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.t(667,null,null,null,null)
v.c=z
y.a.E(v.B())
v=this.e
this.d=new O.n4(v,this.x)
this.e=x
this.x=w
v.e=J.ao(v.gdG(),1)},
ff:function(){var z,y,x,w,v,u
this.x=null
$.$get$ch().b3(0)
$.$get$bN().sm(0,0)
$.qN=null
x=$.$get$cn()
x.b3(0)
w=$.$get$ci()
x.n(0,"points",w)
w.a=0
w.b.b3(0)
this.b.jg()
$.i2=!0
try{this.jT()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.B())
throw H.c(z)}this.h8()
$.i2=!1},
cv:function(a){var z=0,y=P.ay(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cv=P.au(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d9()
q.A=""
w=4
z=7
return P.at(a.$0(),$async$cv)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.A+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cu(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.A.length!==0){t.Q.eT(J.h(q)).bY(new O.nr(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$cv,y)},
iv:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cy().b.test(H.bo(z)))return!1
y=this.b.dL(z,this.e.gdN())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.t(667,null,null,null,null)
w.c=z
x.a.E(w.B())
return!0}y.gkQ()
return!1},"$1","gfj",2,0,43],
e_:function(){var z,y,x,w,v,u
this.h8()
try{x=this.e.gh()
w=$.$get$cn()
x=new Z.fA(x,this.b.jB(),null,null,null,null)
x.c=H.aF(Z.cQ(w),"$isG",[P.q,P.d],"$asG")
x.f=Date.now()
x.e=C.d.kN(H.aA(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.B())
throw H.c(z)}},
fY:function(a,b){var z,y,x
this.ff()
z=this.b
y=z.a
if(y.i(0,a.a)==null)throw H.c(new Z.dm("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.i(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.B())
z.jQ(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.B())
this.f.ar(0,b)}z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.B())
y=$.$get$cn()
Z.n0(a,y,P.dy(P.q,P.bt))
this.cx=H.a6(y.i(0,"game"),"$iseU")
this.cy=H.aF(y.i(0,"hitpoints"),"$isar",[P.aO],"$asar")
z=[P.u]
this.db=H.aF(y.i(0,"stamina"),"$isar",z,"$asar")
this.dx=H.aF(y.i(0,"gold"),"$isar",z,"$asar")
z=this.Q
Z.he(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.E(y.B())
y=this.Q
y.toString
z=new A.t(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.E(z.B())
this.bs()},
kd:function(a){return this.fY(a,null)},
dP:[function(a,b,c,d){var z=0,y=P.ay(),x,w=this,v,u,t
var $async$dP=P.au(function(e,f){if(e===1)return P.aB(f,y)
while(true)switch(z){case 0:v=$.$get$d9()
if(v.A.length!==0){w.Q.eT(J.h(v))
v.A=""}v=w.Q
v.toString
u=new A.t(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.B())
u=U.c9
t=new P.F(0,$.p,null,[u])
v.x=new P.cc(t,[u])
x=t
z=1
break
case 1:return P.aC(x,y)}})
return P.aD($async$dP,y)},function(a,b){return this.dP(a,b,null,!1)},"kV","$4$rerollEffectDescription$rerollable","$2","ghJ",4,5,34,1,0]},
nq:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seU(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.E(x.B())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cy().b.test(H.bo(z))?y.d.a:y.b.dL(z,y.e.gdN())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
ng:{"^":"a:0;a",
$1:function(a){return this.a.bs()}},
nh:{"^":"a:0;a",
$1:function(a){return a.geU()||this.a.iv(a)}},
ni:{"^":"a:35;a,b",
$1:function(a){return a.k_(this.b,this.a.a)}},
nj:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.E(x.B())
return}},
nk:{"^":"a:0;",
$1:function(a){return a instanceof D.bT}},
nl:{"^":"a:0;",
$1:function(a){return a.gk0()}},
nm:{"^":"a:1;",
$0:function(){return}},
nn:{"^":"a:0;a",
$1:function(a){return this.a.bs()}},
no:{"^":"a:0;a,b",
$1:function(a){return a.ds(!0,this.a.a,this.b.gfj())}},
np:{"^":"a:0;a,b",
$1:function(a){return a.ds(!0,this.a.a,this.b.gfj())}},
nr:{"^":"a:0;a",
$1:function(a){return this.a.bs()}},
mp:{"^":"d;a,b,fJ:c<",
j0:function(a,b,c){var z
if(!$.hy){z=J.ao(this.a,b)
this.a=z
this.b.ay(new A.cK(b,z,c))}},
q:function(a,b){return this.j0(a,b,null)},
a4:function(a,b){this.q(0,b)
return this},
B:function(){return P.ac(["points",this.a])},
hn:function(a){this.a=a.i(0,"points")
this.b.b3(0)},
hT:function(){this.b=P.b0(null,A.cK)},
$isdU:1},
cR:{"^":"m8;aw:d<,dG:e@,a,b,c",
gho:function(){return J.a3(this.e,0)}},
n4:{"^":"d;a,b"},
nb:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dL:function(a,b){var z
if(b!=null&&this.a.a7(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a7(a))return z.i(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jB:function(){var z=new H.P(0,null,null,null,null,null,0,[P.q,null])
this.a.N(0,new O.nd(z))
return z},
jQ:function(a){a.N(0,new O.ne(this))},
jg:function(){this.a.N(0,new O.nc())}},
nd:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.ac(["visitCount",b.gdG()]))}},
ne:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a7(a))z.i(0,a).sdG(J.ax(b,"visitCount"))}},
nc:{"^":"a:7;",
$2:function(a,b){b.sdG(0)}}}],["","",,M,{"^":"",cu:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
w:{
eI:function(a){return new M.cu(a,null,null)}}}}],["","",,M,{"^":"",nf:{"^":"d;"}}],["","",,Z,{"^":"",fA:{"^":"d;a,b,c,d,e,f",
eM:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.t(a,null,null,null,null)
z.c=this.dE()
return z},
dE:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.q,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.v.fN(z)},
k:function(a){return this.dE()},
w:{
fB:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isL||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdU},
cQ:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)if(Z.fB(z.i(a,x)))y.push(Z.cQ(z.i(a,x)))
return y}else if(!!z.$isG){w=new H.P(0,null,null,null,null,null,0,[null,null])
z.N(a,new Z.n_(a,w))
return w}else if(!!z.$isdU){v=a.B()
v.n(0,"_class",a.gfJ())
return Z.cQ(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cP:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gm(a);++x)y.push(Z.cP(z.i(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.a7("_class")){v=new H.P(0,null,null,null,null,null,0,[null,null])
z.N(a,new Z.mZ(b,v))
return v}else if(w&&a.a7("_class"))if(c!=null){c.hn(a)
return c}else{u=z.i(a,"_class")
if(!b.a7(u))throw H.c(new Z.dm("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
n0:function(a,b,c){a.c.N(0,new Z.n1(b,c))}}},n_:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fB(this.a.i(0,a)))this.b.n(0,a,Z.cQ(b))}},mZ:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cP(b,this.a,null))}},n1:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cP(b,x,null))
else z.n(0,a,Z.cP(b,x,y))}},dm:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lc:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",mv:{"^":"d;"},mu:{"^":"mv;"},lk:{"^":"mu;a,b,c,d,e,f,r,x",
l2:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aF(a,"$isG",n,"$asG")
m=new A.t(a.i(0,"type"),null,null,null,null)
if(a.a7("strContent"))m.c=a.i(0,"strContent")
if(a.a7("listContent"))m.b=a.i(0,"listContent")
if(a.a7("intContent"))m.d=a.i(0,"intContent")
if(a.a7("mapContent"))m.e=H.aF(a.i(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghl()){case 1070:o=this.e
if(o!=null){o.dn(new D.bT("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bi()
o.b.bi()
return
case 1000:o=new A.t(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.E(o.B())
n.E(new A.t(10,null,this.c.ch,null,null).B())
return
case 1050:l=z.gjU()
this.e.bR(l)
this.e=null
return
case 1060:o=new A.t(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.B())
o=z.gkf()
if(!o.a7("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.f(n.cp())
n.bM(new G.jO(o))
return
case 1080:o=new A.t(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.B())
k=J.ax(z.geE(),0)
j=J.ax(z.geE(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.A,k)
o.bR(new U.c9(C.A[k],j))
this.x=null
return
case 1010:o=new A.t(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.B())
o=this.e
if(o!=null){o.dn(new D.bT("Book Restart before choice was selected."))
this.e=null}try{this.c.eJ()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.B())
throw H.c(y)}o=new A.t(90,null,null,null,null)
o.b=Z.bE()
n.E(o.B())
n.E(new A.cK(0,0,null).dF().B())
return
case 1020:h=new A.t(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.B())
h=this.e
if(h!=null){h.dn(new D.bT("Book Load before choice was selected."))
this.e=null}try{h=z.ghN()
f=new Z.fA(null,null,null,null,null,null)
e=H.aF(C.v.jn(h),"$isG",n,"$asG")
if(!e.a7("currentPageName")||!e.a7("vars"))H.f(new Z.lc("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aF(e.i(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aF(e.i(0,"vars"),"$isG",n,"$asG")
if(e.a7("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aF(J.iF(z.geE()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.fY(w,v)
else o.kd(w)}catch(i){o=H.z(i)
if(o instanceof Z.dm){u=o
t=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.B())
this.c.eJ()}else{s=o
r=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.B())
this.c.eJ()}}try{o=new A.t(90,null,null,null,null)
o.b=Z.bE()
g.E(o.B())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.B())
throw H.c(q)}this.c.toString
g.E(new A.cK(0,$.$get$ci().a,null).dF().B())
return
case 1090:this.f.bR(!0)
this.f=null
return
case 1040:this.c.bs()
return
default:o=new A.t(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghl())+"."
this.a.E(o.B())}},"$1","giB",2,0,20],
eT:function(a){var z=P.a_
this.f=new P.cc(new P.F(0,$.p,null,[z]),[z])
z=new A.t(30,null,null,null,null)
z.c=a
this.a.E(z.B())
return this.f.a}},bT:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jO:{"^":"d;a",
B:function(){return P.c3(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",t:{"^":"d;hl:a<,eE:b<,hN:c<,jU:d<,kf:e<",
gkP:function(){var z=this.a
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
dE:function(){return C.v.fN(this.B())},
B:function(){var z,y
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
z="Message "+this.gkP()
y=this.a
x=J.o(y)
return z+(x.t(y,50)||x.t(y,60)||x.t(y,90)||x.t(y,100)||x.t(y,666)||x.t(y,667)?" (async)":"")}}}],["","",,E,{"^":"",m8:{"^":"d;h:a@,kQ:b<",
k:function(a){return this.a},
gdN:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iA(z,": ")
if(y>0)return J.iE(this.a,0,y)
else return}}}],["","",,A,{"^":"",cK:{"^":"d;jd:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dF:function(){var z=new A.t(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a4:{"^":"d;eU:a@,b,c,d,aW:e<,O:f<,fP:r<,x,y",
gk0:function(){return this.e.length===0},
ds:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
k_:function(a,b){return this.ds(a,b,null)},
kL:function(){return P.ac(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bY:function(a){this.r=a
return this},
bx:function(a,b){return C.b.bx(this.e,b.gaW())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hQ:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.C("String given to choice cannot be null."))
this.e=J.b5(a).eN(a)
this.d=C.b.gv(a)
this.r=f
this.b=!1
this.c=!1},
$isS:1,
$asS:function(){return[L.a4]},
w:{
eO:function(a,b,c,d,e,f,g){var z=new L.a4(!1,null,null,null,null,e,null,d,g)
z.hQ(a,!1,!1,d,e,f,g)
return z}}},eP:{"^":"fc;a,b",
gm:function(a){return this.b.length},
sm:function(a,b){C.a.sm(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
jb:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.ax(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.o(a[0]).$isbt}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eI(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.O,P.aq]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.ax(y,"string")!=null&&!!J.o(J.ax(y,"string")).$isbt)try{x=J.ax(y,"string").$0()}catch(u){w=H.z(u)
v=M.eI(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.ax(y,"goto")
p=H.hU(J.ax(y,"script"),t)
o=new L.a4(!1,null,null,null,null,null,null,q,J.ax(y,"submenu"))
if(r==null)H.f(P.C("String given to choice cannot be null."))
o.e=J.b5(r).eN(r)
o.d=C.b.gv(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
j7:function(a,b,c,d,e,f,g){if(b instanceof L.a4)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eO(b,!1,!1,e,null,f,g))
else throw H.c(P.C("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.j7(a,b,!1,!1,null,null,null)},
kM:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.T(new H.J(z,new L.js(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.t(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.N(x,new L.jt(w))
return w},
dF:function(){return this.kM(null,null,null,null)},
k:function(a){var z=this.b
return new H.al(z,new L.ju(),[H.m(z,0),null]).cO(0,", ")},
$asfc:function(){return[L.a4]},
$asfi:function(){return[L.a4]},
$asL:function(){return[L.a4]},
$asW:function(){return[L.a4]}},js:{"^":"a:0;a,b,c",
$1:function(a){return a.ds(this.b,this.a,this.c)}},jt:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aQ(this.a.b,a.kL())
a.a=!0}},ju:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cS:{"^":"d;d6:a<,aW:b<",
B:function(){return P.ac(["show",this.a,"string",this.b])}},nR:{"^":"d;a",
B:function(){var z=new H.P(0,null,null,null,null,null,0,[P.q,P.d])
this.a.N(0,new Z.nS(z))
return z},
N:function(a,b){this.a.N(0,b)}},nS:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.B())}},hd:{"^":"d;h:a@,b8:b<,fK:c<,dA:d<,d6:e<,h2:f<,aW:r<",w:{
he:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.r(new Array(a.length),[Z.hd])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.an)(a),++v){u=a[v]
t=J.I(u)
s=t.i(u,"name")
r=t.i(u,"description")
q=t.i(u,"color")
p=t.i(u,"priority")
o=t.i(u,"show")
n=t.i(u,"notifyOnChange")
t=t.i(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.hd(s,r,q,p,o,n,t);++w}C.a.cn(z,new Z.oU())
return z}}},oU:{"^":"a:7;",
$2:function(a,b){return J.bq(b.gdA(),a.gdA())}},ar:{"^":"d;h:a<,b8:b<,c,fK:d<,dA:e<,f,r,h2:x<,fH:y@,fJ:z<,$ti",
gae:function(){return this.f},
sae:function(a){if(!J.i(this.f,a)){this.f=a
this.y=!0
$.cU=!0}},
gd6:function(){return this.r},
gaW:function(){return this.c.$1(this.f)},
B:function(){return P.ac(["name",this.a,"value",this.f,"show",this.r])},
hn:function(a){var z
this.sae(H.ik(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.i(this.r,z)){this.r=z
this.y=!0
$.cU=!0}},
$isdU:1,
w:{
bD:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cT()
y=z.a7(a)?H.aF(z.i(0,a),"$isar",[h],"$asar"):new Z.ar(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.ik(e,h)
y.r=!0
z.n(0,a,y)
return y},
nU:function(){var z,y
z=new Z.nR(new H.P(0,null,null,null,null,null,0,[P.q,Z.cS]))
y=$.$get$cT().gcl()
new H.J(y,new Z.nV(),[H.x(y,"y",0)]).N(0,new Z.nW(z))
$.cU=!1
return z},
bE:function(){var z=H.r([],[[P.G,P.q,P.d]])
$.$get$cT().gcl().N(0,new Z.nT(z))
return z}}},nV:{"^":"a:0;",
$1:function(a){return a.gfH()}},nW:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gd6()
y=a.gaW()
a.sfH(!1)
this.a.a.n(0,a.a,new Z.cS(z,y))}},nT:{"^":"a:25;a",
$1:function(a){var z=new H.P(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gb8())
z.n(0,"color",a.gfK())
z.n(0,"priority",a.gdA())
z.n(0,"show",a.gd6())
z.n(0,"notifyOnChange",a.gh2())
z.n(0,"string",a.gaW())
this.a.push(z)}}}],["","",,N,{"^":"",dA:{"^":"d;h:a<,b,c,i9:d<,e,f",
gfR:function(){var z,y,x
z=this.b
y=z==null||J.i(z.gh(),"")
x=this.a
return y?x:z.gfR()+"."+x},
geD:function(){if($.i0){var z=this.b
if(z!=null)return z.geD()}return $.qU},
ke:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geD().b){if(!!J.o(b).$isbt)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.tY.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfR()
t=c
s=d
r=Date.now()
q=$.fd
$.fd=q+1
p=new N.lM(a,x,v,w,new P.cA(r,!1),q,t,s,e)
if($.i0)for(o=this;o!=null;){o.fm(p)
o=o.b}else $.$get$ff().fm(p)}},
ca:function(a,b,c,d){return this.ke(a,b,c,d,null)},
jG:function(a,b,c){return this.ca(C.R,a,b,c)},
ag:function(a){return this.jG(a,null,null)},
jF:function(a,b,c){return this.ca(C.Q,a,b,c)},
b9:function(a){return this.jF(a,null,null)},
jE:function(a,b,c){return this.ca(C.S,a,b,c)},
bI:function(a){return this.jE(a,null,null)},
jS:function(a,b,c){return this.ca(C.z,a,b,c)},
fX:function(a){return this.jS(a,null,null)},
kR:function(a,b,c){return this.ca(C.V,a,b,c)},
eO:function(a){return this.kR(a,null,null)},
hI:function(a,b,c){return this.ca(C.U,a,b,c)},
dO:function(a){return this.hI(a,null,null)},
fm:function(a){},
w:{
bb:function(a){return $.$get$fe().kr(a,new N.rB(a))}}},rB:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d7(z,"."))H.f(P.C("name shouldn't start with a '.'"))
y=C.b.kb(z,".")
if(y===-1)x=z!==""?N.bb(""):null
else{x=N.bb(C.b.aE(z,0,y))
z=C.b.bE(z,y+1)}w=new H.P(0,null,null,null,null,null,0,[P.q,N.dA])
w=new N.dA(z,x,null,w,new P.hg(w,[null,null]),null)
if(x!=null)x.gi9().n(0,z,w)
return w}},aS:{"^":"d;h:a<,ae:b<",
t:function(a,b){if(b==null)return!1
return b instanceof N.aS&&this.b===b.b},
aP:function(a,b){return C.d.aP(this.b,b.gae())},
c1:function(a,b){return C.d.c1(this.b,b.gae())},
b4:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.v(z)
return this.b>z},
bK:function(a,b){return this.b>=b.gae()},
bx:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.v(z)
return this.b-z},
gv:function(a){return this.b},
k:function(a){return this.a},
$isS:1,
$asS:function(){return[N.aS]}},lM:{"^":"d;eD:a<,b,aM:c<,d,H:e<,f,bj:r<,bf:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bp:function(a){return X.d2(J.ix(a,0,new X.tG()))},
aV:function(a,b){var z=J.ao(a,b)
if(typeof z!=="number")return H.v(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d2:function(a){if(typeof a!=="number")return H.v(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
tG:{"^":"a:7;",
$2:function(a,b){return X.aV(a,J.j(b))}},
dJ:{"^":"bZ;a,$ti",
gae:function(){var z=this.a
if(z==null)throw H.c(new P.E("value called on absent Optional."))
return z},
bm:function(a){var z=this.a
return z==null?a:z},
gX:function(a){var z=this.a
if(z!=null){z=H.r([z],this.$ti)
z=new J.b7(z,1,0,null,[H.m(z,0)])}else z=C.G
return z},
gv:function(a){return J.j(this.a)},
t:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dJ){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
hS:function(a,b){if(this.a==null)throw H.c(P.C("Must not be null."))},
w:{
fm:function(a,b){var z=new X.dJ(a,[b])
z.hS(a,b)
return z}}}}],["","",,U,{"^":"",cO:{"^":"d;a,b",
k:function(a){return this.b}},c9:{"^":"d;a,kS:b<",
geA:function(){return this.a===C.C},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
t:function(a,b){if(b==null)return!1
return b instanceof U.c9&&b.a===this.a&&J.i(b.b,this.b)},
gv:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
vY:[function(a,b){var z,y,x,w,v
z=new D.lk(b,null,null,null,null,null,null,null)
y=$.fx
$.fx=y+1
x=new H.c7(y,null,!1)
w=init.globalState.d
w.dU(y,x)
w.cD()
w=new H.mL(x,null)
w.hU(x)
z.b=w
w=w.b
w.toString
new P.cX(w,[H.m(w,0)]).aB(z.giB(),null,null,null)
b.E(new H.cf(z.b.a,init.globalState.d.a))
v=N.n6()
z.c=v
v.Q=z},"$2","hP",4,0,33]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f3.prototype
return J.lm.prototype}if(typeof a=="string")return J.c2.prototype
if(a==null)return J.f4.prototype
if(typeof a=="boolean")return J.f2.prototype
if(a.constructor==Array)return J.c0.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aP=function(a){if(a==null)return a
if(a.constructor==Array)return J.c0.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.I=function(a){if(typeof a=="string")return J.c2.prototype
if(a==null)return a
if(a.constructor==Array)return J.c0.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ah=function(a){if(typeof a=="number")return J.c1.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.eq=function(a){if(typeof a=="number")return J.c1.prototype
if(typeof a=="string")return J.c2.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.b5=function(a){if(typeof a=="string")return J.c2.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ao=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eq(a).a4(a,b)}
J.aW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ah(a).d1(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).t(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ah(a).b4(a,b)}
J.bQ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ah(a).aP(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eq(a).c2(a,b)}
J.iu=function(a){if(typeof a=="number")return-a
return J.ah(a).eR(a)}
J.bq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ah(a).at(a,b)}
J.ax=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).i(a,b)}
J.aQ=function(a,b){return J.aP(a).q(a,b)}
J.iv=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aP(a).j_(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.bS=function(a,b){return J.eq(a).bx(a,b)}
J.iw=function(a,b){return J.I(a).a6(a,b)}
J.eC=function(a,b){return J.aP(a).as(a,b)}
J.ix=function(a,b,c){return J.aP(a).bk(a,b,c)}
J.j=function(a){return J.o(a).gv(a)}
J.eD=function(a){return J.I(a).gL(a)}
J.aj=function(a){return J.aP(a).gX(a)}
J.iy=function(a){return J.aP(a).gD(a)}
J.aG=function(a){return J.I(a).gm(a)}
J.iz=function(a){return J.o(a).gbq(a)}
J.iA=function(a,b){return J.I(a).aS(a,b)}
J.eE=function(a,b){return J.aP(a).aU(a,b)}
J.iB=function(a,b,c){return J.b5(a).fZ(a,b,c)}
J.da=function(a,b,c){return J.b5(a).kw(a,b,c)}
J.co=function(a,b,c){return J.b5(a).cS(a,b,c)}
J.iC=function(a){return J.ah(a).hg(a)}
J.iD=function(a,b){return J.aP(a).dQ(a,b)}
J.eF=function(a,b){return J.b5(a).d7(a,b)}
J.iE=function(a,b,c){return J.b5(a).aE(a,b,c)}
J.iF=function(a){return J.aP(a).bC(a)}
J.h=function(a){return J.o(a).k(a)}
J.cp=function(a,b){return J.ah(a).bZ(a,b)}
J.iG=function(a,b){return J.aP(a).c0(a,b)}
I.bO=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.J=J.aR.prototype
C.a=J.c0.prototype
C.L=J.f2.prototype
C.d=J.f3.prototype
C.t=J.f4.prototype
C.j=J.c1.prototype
C.b=J.c2.prototype
C.D=new A.ak(0,0,0)
C.E=new A.ak(-1/0,-1/0,-1/0)
C.F=new A.cr(-10,0,100)
C.G=new H.kx([null])
C.H=new P.m7()
C.u=new P.pN()
C.I=new P.q5()
C.f=new P.qk()
C.w=new P.aY(0)
C.K=new U.dn(0,"ItemType.spear")
C.x=new U.dn(1,"ItemType.sword")
C.y=new U.dn(2,"ItemType.fist")
C.M=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.lq(null,null)
C.N=new P.ls(null)
C.O=new P.lt(null,null)
C.P=new O.lB(0,"KnownToMode.all")
C.Q=new N.aS("FINER",400)
C.R=new N.aS("FINEST",300)
C.S=new N.aS("FINE",500)
C.z=new N.aS("INFO",800)
C.T=new N.aS("OFF",2000)
C.U=new N.aS("SEVERE",1000)
C.V=new N.aS("WARNING",900)
C.C=new U.cO(0,"Result.success")
C.a0=new U.cO(1,"Result.failure")
C.a1=new U.cO(2,"Result.criticalSuccess")
C.a2=new U.cO(3,"Result.criticalFailure")
C.A=I.bO([C.C,C.a0,C.a1,C.a2])
C.q=I.bO([C.x])
C.W=I.bO([C.y])
C.e=I.bO([])
C.X=new H.jD(0,{},C.e,[null,null])
C.Y=new X.dJ(null,[P.K])
C.k=new R.dM(0,"Pose.standing")
C.i=new R.dM(1,"Pose.offBalance")
C.h=new R.dM(2,"Pose.onGround")
C.l=new K.dN(0,"Predetermination.none")
C.o=new K.dN(1,"Predetermination.successGuaranteed")
C.m=new K.dN(2,"Predetermination.failureGuaranteed")
C.r=new Y.c4("he","him","his","himself")
C.p=new Y.c4("it","it","its","itself")
C.Z=new Y.c4("she","her","her","herself")
C.a_=new Y.c4("they","them","their","themselves")
C.B=new Y.c4("you","you","your","yourself")
C.c=new Q.mQ(0,"Resource.stamina")
C.a3=H.b3("f5")
C.a4=H.b3("aq")
C.a5=H.b3("q")
C.a6=H.b3("a_")
C.a7=H.b3("aO")
C.n=H.b3("dynamic")
C.a8=H.b3("u")
C.a9=H.b3("K")
C.aa=new P.bH(null,2)
$.fx=1
$.fq="$cachedFunction"
$.fr="$cachedInvocation"
$.aH=0
$.br=null
$.eK=null
$.bl=null
$.bK=null
$.bL=null
$.ee=!1
$.p=C.f
$.eW=0
$.er=null
$.hy=!1
$.qN=null
$.hA=!1
$.i2=!0
$.cU=!1
$.i0=!1
$.tY=C.T
$.qU=C.z
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
I.$lazy(y,x,w)}})(["f_","$get$f_",function(){return H.li()},"f0","$get$f0",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eW
$.eW=z+1
z="expando$key$"+z}return new P.kC(null,z,[P.u])},"h2","$get$h2",function(){return H.aJ(H.cV({
toString:function(){return"$receiver$"}}))},"h3","$get$h3",function(){return H.aJ(H.cV({$method$:null,
toString:function(){return"$receiver$"}}))},"h4","$get$h4",function(){return H.aJ(H.cV(null))},"h5","$get$h5",function(){return H.aJ(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"h9","$get$h9",function(){return H.aJ(H.cV(void 0))},"ha","$get$ha",function(){return H.aJ(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"h7","$get$h7",function(){return H.aJ(H.h8(null))},"h6","$get$h6",function(){return H.aJ(function(){try{null.$method$}catch(z){return z.message}}())},"hc","$get$hc",function(){return H.aJ(H.h8(void 0))},"hb","$get$hb",function(){return H.aJ(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e4","$get$e4",function(){return P.pv()},"ba","$get$ba",function(){var z,y
z=P.aq
y=new P.F(0,P.p5(),null,[z])
y.i0(null,z)
return y},"bM","$get$bM",function(){return[]},"em","$get$em",function(){return new K.bY("fist",P.bu(C.W,null))},"bx","$get$bx",function(){return N.bb("PlannerRecommendation")},"hR","$get$hR",function(){return new K.r5()},"en","$get$en",function(){var z=$.$get$hR()
return K.a2("__END_OF_ROAM__",z,z,null,null,[],"ground")},"U","$get$U",function(){return P.cM(null)},"bz","$get$bz",function(){return P.cM(null)},"i4","$get$i4",function(){return N.bb("Storyline")},"fQ","$get$fQ",function(){return P.be("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cj","$get$cj",function(){return L.e3(new L.rA())},"bP","$get$bP",function(){return L.e3(new L.rG())},"ib","$get$ib",function(){return L.e3(new L.rz())},"dK","$get$dK",function(){return new F.mc("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ek","$get$ek",function(){return Y.di(!1,"balance",!0,C.p,$.$get$bP())},"ic","$get$ic",function(){return Y.di(!1,"pounding",!1,C.p,$.$get$bP())},"fy","$get$fy",function(){return new B.mO("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fC","$get$fC",function(){return new O.n2(null,!1,!0,!1,null,null)},"fP","$get$fP",function(){return new Q.nN(null,!1,!0,!0,C.c,null)},"hf","$get$hf",function(){return new M.oV("",!0,C.c,!1,!0,null)},"hz","$get$hz",function(){return P.cM(null)},"eJ","$get$eJ",function(){return new Z.jc(!1,!0,!1,null,null)},"il","$get$il",function(){return Y.di(!1,"swing",!0,C.p,$.$get$bP())},"fo","$get$fo",function(){return X.fm(0,P.K)},"fp","$get$fp",function(){return X.fm(1,P.K)},"fI","$get$fI",function(){return new D.nB(!1,!1,!0,null,null)},"hT","$get$hT",function(){return K.a2("forge_church_crevice",new V.rv(),new V.rw(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"i3","$get$i3",function(){return K.a2("kill_agruth",new V.rt(),new V.ru(),N.va(),null,H.r([new Q.w("start_of_book","","You look around. Fortunately, nobody is in sight.",null)],[Q.w]),"ground")},"ie","$get$ie",function(){return K.a2("start_of_book",new V.rq(),new V.rr(),null,null,H.r([],[Q.w]),"ground")},"eX","$get$eX",function(){return new V.l1("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eY","$get$eY",function(){return new V.l3("Flee through the War Forges","flee_through_war_forge",!0,null)},"fD","$get$fD",function(){return new V.ns("Search Agruth","search_agruth",!0,null)},"im","$get$im",function(){return K.a2("the_shafts",new V.ro(),new V.rp(),null,null,H.r([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"ip","$get$ip",function(){return K.a2("tunnel",new V.rm(),new V.rn(),N.vb(),null,H.r([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"iq","$get$iq",function(){return K.a2("underground_church",new V.rk(),new V.rl(),null,null,H.r([new Q.w("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"ir","$get$ir",function(){return K.a2("war_forge",new V.ri(),new V.rj(),null,null,H.r([new Q.w("tunnel","Enter the corridor","You enter the corridor.",null),new Q.w("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"is","$get$is",function(){return K.a2("war_forge_crevice",new V.rf(),new V.rg(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hS","$get$hS",function(){return K.a2("entrance_to_bloodrock",new V.rd(),new V.re(),null,null,H.r([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"i5","$get$i5",function(){return K.a2("mountain_pass",new V.rb(),new V.rc(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"i6","$get$i6",function(){return K.a2("mountain_pass_gate",new V.r9(),new V.ra(),null,null,H.r([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"i7","$get$i7",function(){return K.a2("mountain_pass_guard_post",new V.t0(),new V.r7(),N.vc(),null,H.r([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"fJ","$get$fJ",function(){return new V.nD("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fX","$get$fX",function(){return new V.ov("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"i8","$get$i8",function(){return K.a2("mountainside_base",new V.rZ(),new V.t_(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"i9","$get$i9",function(){return K.a2("mountainside_path",new V.rO(),new V.rY(),null,null,H.r([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"h1","$get$h1",function(){return new V.oF("Scare off the serpent","threaten_winged_serpent",!0,null)},"fL","$get$fL",function(){return new V.nF("Soothe the serpent","soothe_winged_serpent",!0,null)},"h_","$get$h_",function(){return new V.oG("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"it","$get$it",function(){return K.a2("winged_serpent_nest",new V.rs(),new V.rD(),null,null,H.r([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"i1","$get$i1",function(){return K.a2("ironcast_road",new V.r6(),new V.rh(),null,null,H.r([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"hH","$get$hH",function(){return H.r([$.$get$hT(),$.$get$i3(),$.$get$ie(),$.$get$im(),$.$get$ip(),$.$get$iq(),$.$get$ir(),$.$get$is(),$.$get$hS(),$.$get$i5(),$.$get$i6(),$.$get$i7(),$.$get$i8(),$.$get$i9(),$.$get$it(),$.$get$i1()],[K.c8])},"hG","$get$hG",function(){return H.r([$.$get$eX(),$.$get$eY(),$.$get$fD(),$.$get$fJ(),$.$get$fX(),$.$get$h1(),$.$get$fL(),$.$get$h_()],[A.aI])},"eh","$get$eh",function(){return P.cM(null)},"d9","$get$d9",function(){return P.op("")},"ci","$get$ci",function(){var z=new O.mp(0,null,"PointsCounter")
z.hT()
return z},"bN","$get$bN",function(){return new L.eP(null,H.r([],[L.a4]))},"cn","$get$cn",function(){return H.f8(P.q,P.d)},"ch","$get$ch",function(){return P.b0(null,{func:1,ret:[P.O,P.aq]})},"cy","$get$cy",function(){return P.be("^\\s*<<<\\s*$",!0,!1)},"cT","$get$cT",function(){return H.f8(P.q,Z.ar)},"ff","$get$ff",function(){return N.bb("")},"fe","$get$fe",function(){return P.dy(P.q,N.dA)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.H,A.a5,Y.Z]},{func:1,args:[,,,]},{func:1,ret:Q.D,args:[R.H]},{func:1,args:[R.H,A.a5,Y.Z]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,v:true,args:[R.H,A.a5,Y.Z,R.H,S.Y]},{func:1,args:[P.u]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[R.H,A.a5,Y.Z,R.H,,]},{func:1,ret:U.cD,args:[A.a5,F.a9,[P.y,R.H]]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.aU]},{func:1,v:true,args:[P.d],opt:[P.aU]},{func:1,args:[P.aO]},{func:1,ret:P.O},{func:1,v:true,args:[P.d]},{func:1,ret:Y.b9,args:[P.u]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[U.bX]},{func:1,args:[R.H]},{func:1,args:[Z.ar]},{func:1,ret:P.K,args:[A.ak]},{func:1,ret:P.q,args:[Q.a7]},{func:1,args:[P.K,R.H]},{func:1,ret:P.a_,args:[P.u]},{func:1,args:[P.u,,]},{func:1,ret:P.K,args:[A.cr]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.L,P.q],P.fE]},{func:1,ret:[P.O,U.c9],args:[P.aO,P.q],named:{rerollEffectDescription:P.q,rerollable:P.a_}},{func:1,args:[L.a4]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cS]},{func:1,v:true,args:[P.d,P.aU]},{func:1,v:true,args:[,P.aU]},{func:1,ret:P.u,args:[P.S,P.S]},{func:1,args:[[P.L,Y.a8],Y.a8]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.a_,args:[L.a4]},{func:1,args:[Y.a8]},{func:1,args:[P.bc]},{func:1,ret:Q.cF,args:[U.ap]},{func:1,ret:Q.cC,args:[Q.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a4,args:[P.q],named:{deferToChoiceList:P.a_,deferToEndOfPage:P.a_,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.O,P.aq]},submenu:P.q}},{func:1,args:[P.a_]}]
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
if(x==y)H.v7(d||a)
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
Isolate.bO=a.bO
Isolate.b4=a.b4
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ig(X.hP(),b)},[])
else (function(b){H.ig(X.hP(),b)})([])})})()