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
if(b5.$isaC)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="p"){processStatics(init.statics[b1]=b2.p,b3)
delete b2.p}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dP"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dP"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dP(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aL=function(){}
var dart=[["","",,H,{"^":"",pk:{"^":"d;a"}}],["","",,J,{"^":"",
k:function(a){return void 0},
aC:{"^":"d;",
B:function(a,b){return a===b},
gq:function(a){return H.a4(a)},
i:function(a){return H.cr(a)},
gb3:function(a){return new H.ah(H.dV(a),null)}},
eq:{"^":"aC;",
i:function(a){return String(a)},
gq:function(a){return a?519018:218159},
gb3:function(a){return C.aa},
$isS:1},
es:{"^":"aC;",
B:function(a,b){return null==b},
i:function(a){return"null"},
gq:function(a){return 0},
gb3:function(a){return C.a8}},
ew:{"^":"aC;",
gq:function(a){return 0},
gb3:function(a){return C.a7},
i:function(a){return String(a)},
$iset:1},
po:{"^":"ew;"},
b6:{"^":"ew;"},
bE:{"^":"aC;$ti",
f0:function(a,b){if(!!a.immutable$list)throw H.c(new P.T(b))},
cL:function(a,b){if(!!a.fixed$length)throw H.c(new P.T(b))},
u:function(a,b){this.cL(a,"add")
a.push(b)},
bW:function(a){this.cL(a,"removeLast")
if(a.length===0)throw H.c(H.ay(a,-1))
return a.pop()},
hW:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.A(a))}v=z.length
if(v===y)return
this.sk(a,v)
for(x=0;x<z.length;++x)this.l(a,x,z[x])},
bD:function(a,b){return new H.Q(a,b,[H.h(a,0)])},
as:function(a,b){var z
this.cL(a,"addAll")
for(z=J.ae(b);z.v();)a.push(z.d)},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.A(a))}},
bd:function(a,b){return new H.ag(a,b,[null,null])},
cl:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.e(y,x)
y[x]=w}return y.join(b)},
d7:function(a,b){return H.f9(a,b,null,H.h(a,0))},
ak:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.A(a))}return y},
ba:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.A(a))}throw H.c(H.M())},
f8:function(a,b){return this.ba(a,b,null)},
a2:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gac:function(a){if(a.length>0)return a[0]
throw H.c(H.M())},
gI:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.M())},
gbs:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.M())
throw H.c(H.d5())},
ay:function(a,b,c,d,e){var z,y,x
this.f0(a,"set range")
P.ct(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.V(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.ep())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bR:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.A(a))}return!1},
cC:function(a,b){var z
this.f0(a,"sort")
z=b==null?P.or():b
H.bO(a,0,a.length-1,z)},
h3:function(a){return this.cC(a,null)},
dY:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
bb:function(a,b){return this.dY(a,b,0)},
U:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gG:function(a){return a.length===0},
ga3:function(a){return a.length!==0},
i:function(a){return P.aX(a,"[","]")},
bB:function(a){return P.ac(a,H.h(a,0))},
gM:function(a){return new J.bA(a,a.length,0,null,[H.h(a,0)])},
gq:function(a){return H.a4(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cL(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.c5(b,"newLength",null))
if(b<0)throw H.c(P.V(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ay(a,b))
if(b>=a.length||b<0)throw H.c(H.ay(a,b))
return a[b]},
l:function(a,b,c){if(!!a.immutable$list)H.i(new P.T("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ay(a,b))
if(b>=a.length||b<0)throw H.c(H.ay(a,b))
a[b]=c},
$iscl:1,
$ascl:I.aL,
$isJ:1,
$isW:1},
pj:{"^":"bE;$ti"},
bA:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ad(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bF:{"^":"aC;",
b8:function(a,b){var z
if(typeof b!=="number")throw H.c(H.R(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbT(b)
if(this.gbT(a)===z)return 0
if(this.gbT(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbT:function(a){return a===0?1/a<0:a<0},
e9:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.T(""+a+".round()"))},
cs:function(a,b){var z
if(b>20)throw H.c(P.V(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbT(a))return"-"+z
return z},
jD:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.V(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.aY(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.T("Unexpected toString result: "+z))
x=J.F(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.bH("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gq:function(a){return a&0x1FFFFFFF},
ei:function(a){return-a},
a1:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a+b},
aq:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a-b},
d0:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a/b},
bH:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a*b},
bm:function(a,b){return(a|0)===a?a/b|0:this.i2(a,b)},
i2:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.T("Result of truncating division is "+H.a(z)+": "+H.a(a)+" ~/ "+b))},
cb:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ah:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a<b},
bq:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a>b},
bG:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a<=b},
bE:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a>=b},
gb3:function(a){return C.ad},
$isK:1},
er:{"^":"bF;",
gb3:function(a){return C.ac},
$isaz:1,
$isK:1,
$isr:1},
jd:{"^":"bF;",
gb3:function(a){return C.ab},
$isaz:1,
$isK:1},
bG:{"^":"aC;",
aY:function(a,b){if(b<0)throw H.c(H.ay(a,b))
if(b>=a.length)throw H.c(H.ay(a,b))
return a.charCodeAt(b)},
dP:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.ny(b,a,c)},
dO:function(a,b){return this.dP(a,b,0)},
fi:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.V(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.aY(b,c+y)!==this.aY(a,y))return
return new H.dt(c,b,a)},
a1:function(a,b){if(typeof b!=="string")throw H.c(P.c5(b,null,null))
return a+b},
dT:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bj(a,y-z)},
js:function(a,b,c){H.bd(c)
return H.p(a,b,c)},
jt:function(a,b,c,d){H.bd(c)
P.kg(d,0,a.length,"startIndex",null)
return H.by(a,b,c,d)},
cU:function(a,b,c){return this.jt(a,b,c,0)},
h5:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.hh(b,a,c)!=null},
d8:function(a,b){return this.h5(a,b,0)},
aA:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.R(c))
if(b<0)throw H.c(P.bJ(b,null,null))
if(typeof c!=="number")return H.C(c)
if(b>c)throw H.c(P.bJ(b,null,null))
if(c>a.length)throw H.c(P.bJ(c,null,null))
return a.substring(b,c)},
bj:function(a,b){return this.aA(a,b,null)},
fF:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aY(z,0)===133){x=J.d6(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aY(z,w)===133?J.je(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jE:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.aY(z,0)===133?J.d6(z,1):0}else{y=J.d6(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bH:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.H)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
dY:function(a,b,c){if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return a.indexOf(b,c)},
bb:function(a,b){return this.dY(a,b,0)},
jb:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
ja:function(a,b){return this.jb(a,b,null)},
ir:function(a,b,c){if(b==null)H.i(H.R(b))
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return H.p2(a,b,c)},
U:function(a,b){return this.ir(a,b,0)},
gG:function(a){return a.length===0},
ga3:function(a){return a.length!==0},
b8:function(a,b){var z
if(typeof b!=="string")throw H.c(H.R(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gq:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gb3:function(a){return C.a9},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ay(a,b))
if(b>=a.length||b<0)throw H.c(H.ay(a,b))
return a[b]},
$iscl:1,
$ascl:I.aL,
$iso:1,
$isdg:1,
p:{
eu:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
d6:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.aY(a,b)
if(y!==32&&y!==13&&!J.eu(y))break;++b}return b},
je:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.aY(a,z)
if(y!==32&&y!==13&&!J.eu(y))break}return b}}}}],["","",,H,{"^":"",
M:function(){return new P.N("No element")},
d5:function(){return new P.N("Too many elements")},
ep:function(){return new P.N("Too few elements")},
bO:function(a,b,c,d){if(c-b<=32)H.f_(a,b,c,d)
else H.eZ(a,b,c,d)},
f_:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.F(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a3(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
eZ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.bm(c-b+1,6)
y=b+z
x=c-z
w=C.c.bm(b+c,2)
v=w-z
u=w+z
t=J.F(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
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
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
t.l(a,v,t.h(a,b))
t.l(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.f(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.k(i)
if(h.B(i,0))continue
if(h.ah(i,0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.aa(i)
if(h.bq(i,0)){--l
continue}else{g=l-1
if(h.ah(i,0)){t.l(a,k,t.h(a,m))
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
t.l(a,m,j)}++m}else if(J.a3(d.$2(j,p),0))for(;!0;)if(J.a3(d.$2(t.h(a,l),p),0)){--l
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
W:{"^":"x;$ti"},
ar:{"^":"W;$ti",
gM:function(a){return new H.cm(this,this.gk(this),0,null,[H.t(this,"ar",0)])},
H:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.a2(0,y))
if(z!==this.gk(this))throw H.c(new P.A(this))}},
gG:function(a){return this.gk(this)===0},
gac:function(a){if(this.gk(this)===0)throw H.c(H.M())
return this.a2(0,0)},
gI:function(a){if(this.gk(this)===0)throw H.c(H.M())
return this.a2(0,this.gk(this)-1)},
U:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.f(this.a2(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.A(this))}return!1},
ba:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.a2(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.A(this))}return c.$0()},
cl:function(a,b){var z,y,x,w
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.a(this.a2(0,0))
if(z!==this.gk(this))throw H.c(new P.A(this))
for(x=y,w=1;w<z;++w){x=x+b+H.a(this.a2(0,w))
if(z!==this.gk(this))throw H.c(new P.A(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.a(this.a2(0,w))
if(z!==this.gk(this))throw H.c(new P.A(this))}return x.charCodeAt(0)==0?x:x}},
bD:function(a,b){return this.ep(0,b)},
bd:function(a,b){return new H.ag(this,b,[H.t(this,"ar",0),null])},
ak:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.a2(0,x))
if(z!==this.gk(this))throw H.c(new P.A(this))}return y},
bf:function(a,b){var z,y,x,w
z=[H.t(this,"ar",0)]
if(b){y=H.w([],z)
C.a.sk(y,this.gk(this))}else{x=new Array(this.gk(this))
x.fixed$length=Array
y=H.w(x,z)}for(w=0;w<this.gk(this);++w){z=this.a2(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
bY:function(a){return this.bf(a,!0)},
bB:function(a){var z,y
z=P.I(null,null,null,H.t(this,"ar",0))
for(y=0;y<this.gk(this);++y)z.u(0,this.a2(0,y))
return z}},
lR:{"^":"ar;a,b,c,$ti",
ghx:function(){var z=J.aB(this.a)
return z},
gi0:function(){var z,y
z=J.aB(this.a)
y=this.b
if(y>z)return z
return y},
gk:function(a){var z,y
z=J.aB(this.a)
y=this.b
if(y>=z)return 0
return z-y},
a2:function(a,b){var z,y
z=this.gi0()+b
if(!(b<0)){y=this.ghx()
if(typeof y!=="number")return H.C(y)
y=z>=y}else y=!0
if(y)throw H.c(P.ch(b,this,"index",null,null))
return J.e1(this.a,z)},
bf:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.F(y)
w=x.gk(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.w([],u)
C.a.sk(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.w(s,u)}for(r=0;r<v;++r){u=x.a2(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gk(y)<w)throw H.c(new P.A(this))}return t},
hf:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.V(z,0,null,"start",null))},
p:{
f9:function(a,b,c,d){var z=new H.lR(a,b,c,[d])
z.hf(a,b,c,d)
return z}}},
cm:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.gk(z)
if(this.b!==y)throw H.c(new P.A(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.a2(0,x);++this.c
return!0}},
cn:{"^":"x;a,b,$ti",
gM:function(a){return new H.jw(null,J.ae(this.a),this.b,this.$ti)},
gk:function(a){return J.aB(this.a)},
gG:function(a){return J.he(this.a)},
gac:function(a){return this.b.$1(J.e2(this.a))},
gI:function(a){return this.b.$1(J.cS(this.a))},
$asx:function(a,b){return[b]},
p:{
aQ:function(a,b,c,d){if(!!J.k(a).$isW)return new H.ce(a,b,[c,d])
return new H.cn(a,b,[c,d])}}},
ce:{"^":"cn;a,b,$ti",$isW:1,
$asW:function(a,b){return[b]}},
jw:{"^":"ck;a,b,c,$ti",
v:function(){var z=this.b
if(z.v()){this.a=this.c.$1(z.gE())
return!0}this.a=null
return!1},
gE:function(){return this.a},
$asck:function(a,b){return[b]}},
ag:{"^":"ar;a,b,$ti",
gk:function(a){return J.aB(this.a)},
a2:function(a,b){return this.b.$1(J.e1(this.a,b))},
$asar:function(a,b){return[b]},
$asW:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
Q:{"^":"x;a,b,$ti",
gM:function(a){return new H.dv(J.ae(this.a),this.b,this.$ti)},
bd:function(a,b){return new H.cn(this,b,[H.h(this,0),null])}},
dv:{"^":"ck;a,b,$ti",
v:function(){var z,y
for(z=this.a,y=this.b;z.v();)if(y.$1(z.gE())===!0)return!0
return!1},
gE:function(){return this.a.gE()}},
eW:{"^":"x;a,b,$ti",
gM:function(a){return new H.l6(J.ae(this.a),this.b,this.$ti)},
eq:function(a,b,c){},
p:{
l5:function(a,b,c){var z
if(!!J.k(a).$isW){z=new H.iJ(a,b,[c])
z.eq(a,b,c)
return z}return H.l4(a,b,c)},
l4:function(a,b,c){var z=new H.eW(a,b,[c])
z.eq(a,b,c)
return z}}},
iJ:{"^":"eW;a,b,$ti",
gk:function(a){var z=J.aB(this.a)-this.b
if(z>=0)return z
return 0},
$isW:1},
l6:{"^":"ck;a,b,$ti",
v:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.v()
this.b=0
return z.v()},
gE:function(){return this.a.gE()}}}],["","",,H,{"^":"",
bV:function(a,b){var z=a.cg(b)
if(!init.globalState.d.cy)init.globalState.f.b2()
return z},
h9:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.k(y).$isJ)throw H.c(P.E("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.nk(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$en()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.mS(P.aP(null,H.bS),0)
x=P.r
y.z=new H.H(0,null,null,null,null,null,0,[x,H.dE])
y.ch=new H.H(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.nj()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.j5,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.nl)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.H(0,null,null,null,null,null,0,[x,H.bK])
x=P.I(null,null,null,x)
v=new H.bK(0,null,!1)
u=new H.dE(y,w,x,init.createNewIsolate(),v,new H.aU(H.cO()),new H.aU(H.cO()),!1,!1,[],P.I(null,null,null,null),null,null,!1,!0,P.I(null,null,null,null))
x.u(0,0)
u.dd(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bZ()
if(H.ak(y,[y]).aN(a))u.cg(new H.oV(z,a))
else if(H.ak(y,[y,y]).aN(a))u.cg(new H.oW(z,a))
else u.cg(a)
init.globalState.f.b2()},
j9:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.ja()
return},
ja:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.T("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.T('Cannot extract URI from "'+H.a(z)+'"'))},
j5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cG(!0,[]).bw(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cG(!0,[]).bw(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cG(!0,[]).bw(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.r
p=new H.H(0,null,null,null,null,null,0,[q,H.bK])
q=P.I(null,null,null,q)
o=new H.bK(0,null,!1)
n=new H.dE(y,p,q,init.createNewIsolate(),o,new H.aU(H.cO()),new H.aU(H.cO()),!1,!1,[],P.I(null,null,null,null),null,null,!1,!0,P.I(null,null,null,null))
q.u(0,0)
n.dd(0,o)
init.globalState.f.a.ag(new H.bS(n,new H.j6(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b2()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").A(y.h(z,"msg"))
init.globalState.f.b2()
break
case"close":init.globalState.ch.aI(0,$.$get$eo().h(0,a))
a.terminate()
init.globalState.f.b2()
break
case"log":H.j4(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a7(["command","print","msg",z])
q=new H.b9(!0,P.bs(null,P.r)).aU(q)
y.toString
self.postMessage(q)}else P.dZ(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
j4:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a7(["command","log","msg",a])
x=new H.b9(!0,P.bs(null,P.r)).aU(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.z(w)
throw H.c(P.cf(z))}},
j7:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eK=$.eK+("_"+y)
$.eL=$.eL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.A(["spawned",new H.bU(y,x),w,z.r])
x=new H.j8(a,b,c,d,z)
if(e===!0){z.eY(w,w)
init.globalState.f.a.ag(new H.bS(z,x,"start isolate"))}else x.$0()},
nP:function(a){return new H.cG(!0,[]).bw(new H.b9(!1,P.bs(null,P.r)).aU(a))},
oV:{"^":"b:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
oW:{"^":"b:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
nk:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",p:{
nl:function(a){var z=P.a7(["command","print","msg",a])
return new H.b9(!0,P.bs(null,P.r)).aU(z)}}},
dE:{"^":"d;m:a<,b,c,j7:d<,is:e<,f,r,x,ck:y<,z,Q,ch,cx,cy,db,dx",
eY:function(a,b){if(!this.f.B(0,a))return
if(this.Q.u(0,b)&&!this.y)this.y=!0
this.ce()},
jr:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aI(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.eX(x)}this.y=!1}this.ce()},
ii:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jp:function(a){var z,y,x
if(this.ch==null)return
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.T("removeRange"))
P.ct(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fY:function(a,b){if(!this.r.B(0,a))return
this.db=b},
iN:function(a,b,c){var z=J.k(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){a.A(c)
return}z=this.cx
if(z==null){z=P.aP(null,null)
this.cx=z}z.ag(new H.n9(a,c))},
iM:function(a,b){var z
if(!this.r.B(0,a))return
z=J.k(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){this.e2()
return}z=this.cx
if(z==null){z=P.aP(null,null)
this.cx=z}z.ag(this.gj8())},
iO:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.dZ(a)
if(b!=null)P.dZ(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.j(a)
y[1]=b==null?null:J.j(b)
for(x=new P.av(z,z.r,null,null,[null]),x.c=z.e;x.v();)x.d.A(y)},
cg:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.y(u)
w=t
v=H.z(u)
this.iO(w,v)
if(this.db===!0){this.e2()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gj7()
if(this.cx!=null)for(;t=this.cx,!t.gG(t);)this.cx.cT().$0()}return y},
fh:function(a){return this.b.h(0,a)},
dd:function(a,b){var z=this.b
if(z.J(a))throw H.c(P.cf("Registry: ports must be registered only once."))
z.l(0,a,b)},
ce:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.e2()},
e2:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aH(0)
for(z=this.b,y=z.gaK(),y=y.gM(y);y.v();)y.gE().ht()
z.aH(0)
this.c.aH(0)
init.globalState.z.aI(0,this.a)
this.dx.aH(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.A(z[v])}this.ch=null}},"$0","gj8",0,0,3]},
n9:{"^":"b:3;a,b",
$0:function(){this.a.A(this.b)}},
mS:{"^":"d;a,b",
ix:function(){var z=this.a
if(z.b===z.c)return
return z.cT()},
fD:function(){var z,y,x
z=this.ix()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.J(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gG(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cf("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gG(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a7(["command","close"])
x=new H.b9(!0,new P.fy(0,null,null,null,null,null,0,[null,P.r])).aU(x)
y.toString
self.postMessage(x)}return!1}z.jo()
return!0},
eR:function(){if(self.window!=null)new H.mT(this).$0()
else for(;this.fD(););},
b2:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eR()
else try{this.eR()}catch(x){w=H.y(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.a7(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.b9(!0,P.bs(null,P.r)).aU(v)
w.toString
self.postMessage(v)}}},
mT:{"^":"b:3;a",
$0:function(){if(!this.a.fD())return
P.m5(C.w,this)}},
bS:{"^":"d;a,b,c",
jo:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cg(this.b)}},
nj:{"^":"d;"},
j6:{"^":"b:1;a,b,c,d,e,f",
$0:function(){H.j7(this.a,this.b,this.c,this.d,this.e,this.f)}},
j8:{"^":"b:3;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bZ()
if(H.ak(x,[x,x]).aN(y))y.$2(this.b,this.c)
else if(H.ak(x,[x]).aN(y))y.$1(this.b)
else y.$0()}z.ce()}},
fu:{"^":"d;"},
bU:{"^":"fu;b,a",
A:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.geH())return
x=H.nP(a)
if(z.gis()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.eY(y.h(x,1),y.h(x,2))
break
case"resume":z.jr(y.h(x,1))
break
case"add-ondone":z.ii(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.jp(y.h(x,1))
break
case"set-errors-fatal":z.fY(y.h(x,1),y.h(x,2))
break
case"ping":z.iN(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.iM(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.u(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aI(0,y)
break}return}init.globalState.f.a.ag(new H.bS(z,new H.nn(this,x),"receive"))},
B:function(a,b){if(b==null)return!1
return b instanceof H.bU&&J.f(this.b,b.b)},
gq:function(a){return this.b.gdu()}},
nn:{"^":"b:1;a,b",
$0:function(){var z=this.a.b
if(!z.geH())z.hk(this.b)}},
dH:{"^":"fu;b,c,a",
A:function(a){var z,y,x
z=P.a7(["command","message","port",this,"msg",a])
y=new H.b9(!0,P.bs(null,P.r)).aU(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
B:function(a,b){if(b==null)return!1
return b instanceof H.dH&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gq:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ek()
y=this.a
if(typeof y!=="number")return y.ek()
x=this.c
if(typeof x!=="number")return H.C(x)
return(z<<16^y<<8^x)>>>0}},
bK:{"^":"d;du:a<,b,eH:c<",
ht:function(){this.c=!0
this.b=null},
aX:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aI(0,y)
z.c.aI(0,y)
z.ce()},
hk:function(a){if(this.c)return
this.b.$1(a)},
$iskh:1},
ki:{"^":"a0;a,b",
ad:function(a,b,c,d){var z=this.b
z.toString
return new P.cF(z,[H.h(z,0)]).ad(a,b,c,d)},
e5:function(a,b,c){return this.ad(a,null,b,c)},
aX:[function(){this.a.aX()
this.b.aX()},"$0","gip",0,0,3],
hd:function(a){var z=P.f6(this.gip(),null,null,null,!0,null)
this.b=z
this.a.b=z.gi7(z)},
$asa0:I.aL},
m1:{"^":"d;a,b,c",
hg:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ag(new H.bS(y,new H.m3(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cL(new H.m4(this,b),0),a)}else throw H.c(new P.T("Timer greater than 0."))},
p:{
m2:function(a,b){var z=new H.m1(!0,!1,null)
z.hg(a,b)
return z}}},
m3:{"^":"b:3;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
m4:{"^":"b:3;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aU:{"^":"d;du:a<",
gq:function(a){var z=this.a
if(typeof z!=="number")return z.jM()
z=C.h.cb(z,0)^C.h.bm(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
B:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aU){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b9:{"^":"d;a,b",
aU:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gk(z))
z=J.k(a)
if(!!z.$iscl)return this.fU(a)
if(!!z.$isj2){x=this.gfR()
z=a.gaS()
z=H.aQ(z,x,H.t(z,"x",0),null)
z=P.a_(z,!0,H.t(z,"x",0))
w=a.gaK()
w=H.aQ(w,x,H.t(w,"x",0),null)
return["map",z,P.a_(w,!0,H.t(w,"x",0))]}if(!!z.$iset)return this.fV(a)
if(!!z.$isaC)this.fG(a)
if(!!z.$iskh)this.ct(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbU)return this.fW(a)
if(!!z.$isdH)return this.fX(a)
if(!!z.$isb){v=a.$static_name
if(v==null)this.ct(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaU)return["capability",a.a]
if(!(a instanceof P.d))this.fG(a)
return["dart",init.classIdExtractor(a),this.fT(init.classFieldsExtractor(a))]},"$1","gfR",2,0,0],
ct:function(a,b){throw H.c(new P.T(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
fG:function(a){return this.ct(a,null)},
fU:function(a){var z=this.fS(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ct(a,"Can't serialize indexable: ")},
fS:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aU(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
fT:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.aU(a[z]))
return a},
fV:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ct(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aU(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
fX:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fW:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdu()]
return["raw sendport",a]}},
cG:{"^":"d;a,b",
bw:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.a(a)))
switch(C.a.gac(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.w(this.cf(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.w(this.cf(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cf(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.w(this.cf(x),[null])
y.fixed$length=Array
return y
case"map":return this.iA(a)
case"sendport":return this.iB(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iz(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.aU(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cf(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.a(a))}},"$1","giy",2,0,0],
cf:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.C(x)
if(!(y<x))break
z.l(a,y,this.bw(z.h(a,y)));++y}return a},
iA:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aE()
this.b.push(w)
y=J.e3(y,this.giy()).bY(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.e(y,u)
w.l(0,y[u],this.bw(v.h(x,u)))}return w},
iB:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.fh(w)
if(u==null)return
t=new H.bU(u,x)}else t=new H.dH(y,w,x)
this.b.push(t)
return t},
iz:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.F(y)
v=J.F(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.C(t)
if(!(u<t))break
w[z.h(y,u)]=this.bw(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
i7:function(){throw H.c(new P.T("Cannot modify unmodifiable Map"))},
h3:function(a){return init.getTypeFromName(a)},
oA:function(a){return init.types[a]},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.j(a)
if(typeof z!=="string")throw H.c(H.R(a))
return z},
a4:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
b1:function(a){var z,y,x,w,v,u,t,s
z=J.k(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.J||!!J.k(a).$isb6){v=C.N(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.aY(w,0)===36)w=C.b.bj(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cM(H.c_(a),0,null),init.mangledGlobalNames)},
cr:function(a){return"Instance of '"+H.b1(a)+"'"},
a8:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.cb(z,10))>>>0,56320|z&1023)}throw H.c(P.V(a,0,1114111,null,null))},
b0:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dj:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.R(a))
return a[b]},
eM:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.R(a))
a[b]=c},
C:function(a){throw H.c(H.R(a))},
e:function(a,b){if(a==null)J.aB(a)
throw H.c(H.ay(a,b))},
ay:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aN(!0,b,"index",null)
z=J.aB(a)
if(!(b<0)){if(typeof z!=="number")return H.C(z)
y=b>=z}else y=!0
if(y)return P.ch(b,a,"index",null,z)
return P.bJ(b,"index",null)},
R:function(a){return new P.aN(!0,a,null,null)},
bd:function(a){if(typeof a!=="string")throw H.c(H.R(a))
return a},
c:function(a){var z
if(a==null)a=new P.cp()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hb})
z.name=""}else z.toString=H.hb
return z},
hb:function(){return J.j(this.dartException)},
i:function(a){throw H.c(a)},
ad:function(a){throw H.c(new P.A(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.p9(a)
if(a==null)return
if(a instanceof H.d1)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.cb(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d8(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.eE(v,null))}}if(a instanceof TypeError){u=$.$get$fd()
t=$.$get$fe()
s=$.$get$ff()
r=$.$get$fg()
q=$.$get$fk()
p=$.$get$fl()
o=$.$get$fi()
$.$get$fh()
n=$.$get$fn()
m=$.$get$fm()
l=u.b0(y)
if(l!=null)return z.$1(H.d8(y,l))
else{l=t.b0(y)
if(l!=null){l.method="call"
return z.$1(H.d8(y,l))}else{l=s.b0(y)
if(l==null){l=r.b0(y)
if(l==null){l=q.b0(y)
if(l==null){l=p.b0(y)
if(l==null){l=o.b0(y)
if(l==null){l=r.b0(y)
if(l==null){l=n.b0(y)
if(l==null){l=m.b0(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eE(y,l==null?null:l.method))}}return z.$1(new H.mb(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.f0()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aN(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.f0()
return a},
z:function(a){var z
if(a instanceof H.d1)return a.b
if(a==null)return new H.fB(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fB(a,null)},
h5:function(a){if(a==null||typeof a!='object')return J.n(a)
else return H.a4(a)},
fW:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
oC:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bV(b,new H.oD(a))
case 1:return H.bV(b,new H.oE(a,d))
case 2:return H.bV(b,new H.oF(a,d,e))
case 3:return H.bV(b,new H.oG(a,d,e,f))
case 4:return H.bV(b,new H.oH(a,d,e,f,g))}throw H.c(P.cf("Unsupported number of arguments for wrapped closure"))},
cL:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.oC)
a.$identity=z
return z},
i5:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.k(c).$isJ){z.$reflectionInfo=c
x=H.kk(z).r}else x=c
w=d?Object.create(new H.lm().constructor.prototype):Object.create(new H.cW(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ao
$.ao=J.a2(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.ea(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.oA,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.e7:H.cX
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ea(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
i2:function(a,b,c,d){var z=H.cX
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ea:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.i4(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.i2(y,!w,z,b)
if(y===0){w=$.ao
$.ao=J.a2(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.bi
if(v==null){v=H.c8("self")
$.bi=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ao
$.ao=J.a2(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.bi
if(v==null){v=H.c8("self")
$.bi=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
i3:function(a,b,c,d){var z,y
z=H.cX
y=H.e7
switch(b?-1:a){case 0:throw H.c(new H.kw("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
i4:function(a,b){var z,y,x,w,v,u,t,s
z=H.hU()
y=$.e6
if(y==null){y=H.c8("receiver")
$.e6=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.i3(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.ao
$.ao=J.a2(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.ao
$.ao=J.a2(u,1)
return new Function(y+H.a(u)+"}")()},
dP:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.k(c).$isJ){c.fixed$length=Array
z=c}else z=c
return H.i5(a,b,z,!!d,e,f)},
oP:function(a,b){var z=J.F(b)
throw H.c(H.ca(H.b1(a),z.aA(b,3,z.gk(b))))},
h1:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.k(a)[b]
else z=!0
if(z)return a
H.oP(a,b)},
p7:function(a){throw H.c(new P.ij(a))},
dS:function(a){var z=J.k(a)
return"$signature" in z?z.$signature():null},
ak:function(a,b,c){return new H.kx(a,b,c,null)},
aw:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.kz(z)
return new H.ky(z,b,null)},
bZ:function(){return C.G},
cO:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
aT:function(a){return new H.ah(a,null)},
w:function(a,b){a.$ti=b
return a},
c_:function(a){if(a==null)return
return a.$ti},
h_:function(a,b){return H.e_(a["$as"+H.a(b)],H.c_(a))},
t:function(a,b,c){var z=H.h_(a,b)
return z==null?null:z[c]},
h:function(a,b){var z=H.c_(a)
return z==null?null:z[b]},
X:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cM(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.a(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.X(z,b)
return H.nT(a,b)}return"unknown-reified-type"},
nT:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.X(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.X(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.X(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.dT(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.X(r[p],b)+(" "+H.a(p))}w+="}"}return"("+w+") => "+z},
cM:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bq("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.t=v+", "
u=a[y]
if(u!=null)w=!1
v=z.t+=H.X(u,c)}return w?"":"<"+z.i(0)+">"},
dV:function(a){var z,y
z=H.dS(a)
if(z!=null)return H.X(z,null)
y=J.k(a).constructor.builtin$cls
if(a==null)return y
return y+H.cM(a.$ti,0,null)},
e_:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bY:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.c_(a)
y=J.k(a)
if(y[b]==null)return!1
return H.fQ(H.e_(y[d],z),c)},
aA:function(a,b,c,d){if(a!=null&&!H.bY(a,b,c,d))throw H.c(H.ca(H.b1(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cM(c,0,null),init.mangledGlobalNames)))
return a},
fQ:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a6(a[y],b[y]))return!1
return!0},
ax:function(a,b,c){return a.apply(b,H.h_(b,c))},
dO:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="aR"
if(b==null)return!0
z=H.c_(a)
a=J.k(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$signature
if(x==null)return!1
return H.dX(x.apply(a,null),b)}return H.a6(y,b)},
cP:function(a,b){if(a!=null&&!H.dO(a,b))throw H.c(H.ca(H.b1(a),H.X(b,null)))
return a},
a6:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aR")return!0
if('func' in b)return H.dX(a,b)
if('func' in a)return b.builtin$cls==="bk"||b.builtin$cls==="d"
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
return H.fQ(H.e_(u,z),x)},
fP:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a6(z,v)||H.a6(v,z)))return!1}return!0},
o3:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a6(v,u)||H.a6(u,v)))return!1}return!0},
dX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a6(z,y)||H.a6(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fP(x,w,!1))return!1
if(!H.fP(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a6(o,n)||H.a6(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a6(o,n)||H.a6(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a6(o,n)||H.a6(n,o)))return!1}}return H.o3(a.named,b.named)},
p2:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.k(b)
if(!!z.$isev){z=C.b.bj(a,c)
return b.b.test(z)}else{z=z.dO(b,C.b.bj(a,c))
return!z.gG(z)}}},
p:function(a,b,c){var z,y,x
H.bd(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.a(c)
for(x=0;x<z;++x)y=y+a[x]+H.a(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
pM:[function(a){return a},"$1","nV",2,0,36],
p3:function(a,b,c,d){var z,y,x,w,v,u
d=H.nV()
z=J.k(b)
if(!z.$isdg)throw H.c(P.c5(b,"pattern","is not a Pattern"))
for(z=z.dO(b,a),z=new H.fs(z.a,z.b,z.c,null),y=0,x="";z.v();){w=z.d
v=w.b
u=v.index
x=x+H.a(d.$1(C.b.aA(a,y,u)))+H.a(c.$1(w))
y=u+v[0].length}z=x+H.a(d.$1(C.b.bj(a,y)))
return z.charCodeAt(0)==0?z:z},
by:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.p4(a,z,z+b.length,c)},
p4:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.a(d)+y},
ed:{"^":"d;$ti",
gG:function(a){return this.gk(this)===0},
ga3:function(a){return this.gk(this)!==0},
i:function(a){return P.co(this)},
l:function(a,b,c){return H.i7()},
$isB:1},
i8:{"^":"ed;a,b,c,$ti",
gk:function(a){return this.a},
J:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.J(b))return
return this.eD(b)},
eD:function(a){return this.b[a]},
H:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eD(w))}}},
bl:{"^":"ed;a,$ti",
cE:function(){var z=this.$map
if(z==null){z=new H.H(0,null,null,null,null,null,0,this.$ti)
H.fW(this.a,z)
this.$map=z}return z},
J:function(a){return this.cE().J(a)},
h:function(a,b){return this.cE().h(0,b)},
H:function(a,b){this.cE().H(0,b)},
gk:function(a){var z=this.cE()
return z.gk(z)}},
kj:{"^":"d;a,b,c,d,e,f,r,x",p:{
kk:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.kj(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
m6:{"^":"d;a,b,c,d,e,f",
b0:function(a){var z,y,x
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
p:{
au:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.m6(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cE:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fj:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eE:{"^":"U;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
jg:{"^":"U;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
p:{
d8:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.jg(a,y,z?null:b.receiver)}}},
mb:{"^":"U;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
d1:{"^":"d;a,aV:b<"},
p9:{"^":"b:0;a",
$1:function(a){if(!!J.k(a).$isU)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fB:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
oD:{"^":"b:1;a",
$0:function(){return this.a.$0()}},
oE:{"^":"b:1;a,b",
$0:function(){return this.a.$1(this.b)}},
oF:{"^":"b:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
oG:{"^":"b:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
oH:{"^":"b:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
b:{"^":"d;",
i:function(a){return"Closure '"+H.b1(this)+"'"},
gfN:function(){return this},
$isbk:1,
gfN:function(){return this}},
fc:{"^":"b;"},
lm:{"^":"fc;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cW:{"^":"fc;a,b,c,d",
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cW))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gq:function(a){var z,y
z=this.c
if(z==null)y=H.a4(this.a)
else y=typeof z!=="object"?J.n(z):H.a4(z)
z=H.a4(this.b)
if(typeof y!=="number")return y.jO()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.cr(z)},
p:{
cX:function(a){return a.a},
e7:function(a){return a.c},
hU:function(){var z=$.bi
if(z==null){z=H.c8("self")
$.bi=z}return z},
c8:function(a){var z,y,x,w,v
z=new H.cW("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
m7:{"^":"U;a",
i:function(a){return this.a},
p:{
m8:function(a,b){return new H.m7("type '"+H.b1(a)+"' is not a subtype of type '"+b+"'")}}},
hZ:{"^":"U;a",
i:function(a){return this.a},
p:{
ca:function(a,b){return new H.hZ("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
kw:{"^":"U;a",
i:function(a){return"RuntimeError: "+H.a(this.a)}},
cv:{"^":"d;"},
kx:{"^":"cv;a,b,c,d",
aN:function(a){var z=H.dS(a)
return z==null?!1:H.dX(z,this.b4())},
ev:function(a){return this.hq(a,!0)},
hq:function(a,b){var z,y
if(a==null)return
if(this.aN(a))return a
z=H.X(this.b4(),null)
if(b){y=H.dS(a)
throw H.c(H.ca(y!=null?H.X(y,null):H.b1(a),z))}else throw H.c(H.m8(a,z))},
b4:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.k(y)
if(!!x.$ispC)z.v=true
else if(!x.$iseh)z.ret=y.b4()
y=this.b
if(y!=null&&y.length!==0)z.args=H.eR(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.eR(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dT(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].b4()}z.named=w}return z},
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
t=H.dT(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].b4())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
p:{
eR:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].b4())
return z}}},
eh:{"^":"cv;",
i:function(a){return"dynamic"},
b4:function(){return}},
kz:{"^":"cv;a",
b4:function(){var z,y
z=this.a
y=H.h3(z)
if(y==null)throw H.c("no type for '"+z+"'")
return y},
i:function(a){return this.a}},
ky:{"^":"cv;a,b,c",
b4:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.h3(z)]
if(0>=y.length)return H.e(y,0)
if(y[0]==null)throw H.c("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.ad)(z),++w)y.push(z[w].b4())
this.c=y
return y},
i:function(a){var z=this.b
return this.a+"<"+(z&&C.a).cl(z,", ")+">"}},
ah:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gq:function(a){return J.n(this.a)},
B:function(a,b){if(b==null)return!1
return b instanceof H.ah&&J.f(this.a,b.a)}},
H:{"^":"d;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gG:function(a){return this.a===0},
ga3:function(a){return!this.gG(this)},
gaS:function(){return new H.jm(this,[H.h(this,0)])},
gaK:function(){return H.aQ(this.gaS(),new H.jf(this),H.h(this,0),H.h(this,1))},
J:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eA(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eA(y,a)}else return this.iZ(a)},
iZ:function(a){var z=this.d
if(z==null)return!1
return this.cj(this.cF(z,this.ci(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c4(z,b)
return y==null?null:y.gby()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c4(x,b)
return y==null?null:y.gby()}else return this.j_(b)},
j_:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cF(z,this.ci(a))
x=this.cj(y,a)
if(x<0)return
return y[x].gby()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dz()
this.b=z}this.es(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dz()
this.c=y}this.es(y,b,c)}else this.j1(b,c)},
j1:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dz()
this.d=z}y=this.ci(a)
x=this.cF(z,y)
if(x==null)this.dJ(z,y,[this.dA(a,b)])
else{w=this.cj(x,a)
if(w>=0)x[w].sby(b)
else x.push(this.dA(a,b))}},
fv:function(a,b){var z
if(this.J(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
aI:function(a,b){if(typeof b==="string")return this.eQ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eQ(this.c,b)
else return this.j0(b)},
j0:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cF(z,this.ci(a))
x=this.cj(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eT(w)
return w.gby()},
aH:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.A(this))
z=z.c}},
es:function(a,b,c){var z=this.c4(a,b)
if(z==null)this.dJ(a,b,this.dA(b,c))
else z.sby(c)},
eQ:function(a,b){var z
if(a==null)return
z=this.c4(a,b)
if(z==null)return
this.eT(z)
this.eB(a,b)
return z.gby()},
dA:function(a,b){var z,y
z=new H.jl(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eT:function(a){var z,y
z=a.ghS()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ci:function(a){return J.n(a)&0x3ffffff},
cj:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gfe(),b))return y
return-1},
i:function(a){return P.co(this)},
c4:function(a,b){return a[b]},
cF:function(a,b){return a[b]},
dJ:function(a,b,c){a[b]=c},
eB:function(a,b){delete a[b]},
eA:function(a,b){return this.c4(a,b)!=null},
dz:function(){var z=Object.create(null)
this.dJ(z,"<non-identifier-key>",z)
this.eB(z,"<non-identifier-key>")
return z},
$isj2:1,
$isB:1,
p:{
ex:function(a,b){return new H.H(0,null,null,null,null,null,0,[a,b])}}},
jf:{"^":"b:0;a",
$1:function(a){return this.a.h(0,a)}},
jl:{"^":"d;fe:a<,by:b@,c,hS:d<,$ti"},
jm:{"^":"W;a,$ti",
gk:function(a){return this.a.a},
gG:function(a){return this.a.a===0},
gM:function(a){var z,y
z=this.a
y=new H.jn(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
U:function(a,b){return this.a.J(b)},
H:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.A(z))
y=y.c}}},
jn:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.A(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ev:{"^":"d;a,b,c,d",
i:function(a){return"RegExp/"+this.a+"/"},
ghO:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.d7(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghN:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.d7(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dP:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.my(this,b,c)},
dO:function(a,b){return this.dP(a,b,0)},
hz:function(a,b){var z,y
z=this.ghO()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fA(this,y)},
hy:function(a,b){var z,y
z=this.ghN()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fA(this,y)},
fi:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return this.hy(b,c)},
$isdg:1,
p:{
d7:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.em("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fA:{"^":"d;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isb_:1},
my:{"^":"cj;a,b,c",
gM:function(a){return new H.fs(this.a,this.b,this.c,null)},
$ascj:function(){return[P.b_]},
$asx:function(){return[P.b_]}},
fs:{"^":"d;a,b,c,d",
gE:function(){return this.d},
v:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hz(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
dt:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.i(P.bJ(b,null,null))
return this.c},
$isb_:1},
ny:{"^":"x;a,b,c",
gM:function(a){return new H.nz(this.a,this.b,this.c,null)},
gac:function(a){var z,y,x
z=this.a
y=this.b
x=z.indexOf(y,this.c)
if(x>=0)return new H.dt(x,z,y)
throw H.c(H.M())},
$asx:function(){return[P.b_]}},
nz:{"^":"d;a,b,c,d",
v:function(){var z,y,x,w,v,u,t
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
this.d=new H.dt(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gE:function(){return this.d}}}],["","",,H,{"^":"",
dT:function(a){var z=H.w(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
oO:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
mz:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.o4()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cL(new P.mB(z),1)).observe(y,{childList:true})
return new P.mA(z,y,x)}else if(self.setImmediate!=null)return P.o5()
return P.o6()},
pE:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cL(new P.mC(a),0))},"$1","o4",2,0,9],
pF:[function(a){++init.globalState.f.b
self.setImmediate(H.cL(new P.mD(a),0))},"$1","o5",2,0,9],
pG:[function(a){P.du(C.w,a)},"$1","o6",2,0,9],
u:function(a,b,c){if(b===0){c.bv(a)
return}else if(b===1){c.dS(H.y(a),H.z(a))
return}P.fC(a,b)
return c.gfa()},
fC:function(a,b){var z,y,x,w
z=new P.nJ(b)
y=new P.nK(b)
x=J.k(a)
if(!!x.$isD)a.dK(z,y)
else if(!!x.$isP)a.eb(z,y)
else{w=new P.D(0,$.l,null,[null])
w.a=4
w.c=a
w.dK(z,null)}},
aj:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.l.toString
return new P.o2(z)},
cJ:function(a,b,c){var z,y,x
if(b===0){if(c.ge_())c.c.dR()
else c.a.aX()
return}else if(b===1){if(c.ge_())c.c.dS(H.y(a),H.z(a))
else{z=H.y(a)
y=H.z(a)
c.a.dN(z,y)
c.a.aX()}return}if(a instanceof P.br){if(c.ge_()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.cR(c.a,z)
P.c0(new P.nH(b,c))
return}else if(z===1){x=a.a
c.a.ik(x,!1).bA(new P.nI(b,c))
return}}P.fC(a,b)},
o1:function(a){return a.gd9()},
dL:function(a,b){var z=H.bZ()
if(H.ak(z,[z,z]).aN(a)){b.toString
return a}else{b.toString
return a}},
j0:function(a,b){var z=new P.D(0,$.l,null,[b])
z.aW(a)
return z},
ap:function(a){return new P.nA(new P.D(0,$.l,null,[a]),[a])},
fE:function(a,b,c){$.l.toString
a.aM(b,c)},
nW:function(){var z,y
for(;z=$.ba,z!=null;){$.bv=null
y=z.gbV()
$.ba=y
if(y==null)$.bu=null
z.gim().$0()}},
pL:[function(){$.dJ=!0
try{P.nW()}finally{$.bv=null
$.dJ=!1
if($.ba!=null)$.$get$dy().$1(P.fR())}},"$0","fR",0,0,3],
fM:function(a){var z=new P.ft(a,null)
if($.ba==null){$.bu=z
$.ba=z
if(!$.dJ)$.$get$dy().$1(P.fR())}else{$.bu.b=z
$.bu=z}},
o0:function(a){var z,y,x
z=$.ba
if(z==null){P.fM(a)
$.bv=$.bu
return}y=new P.ft(a,null)
x=$.bv
if(x==null){y.b=z
$.bv=y
$.ba=y}else{y.b=x.b
x.b=y
$.bv=y
if(y.b==null)$.bu=y}},
c0:function(a){var z=$.l
if(C.f===z){P.bc(null,null,C.f,a)
return}z.toString
P.bc(null,null,z,z.dQ(a,!0))},
pz:function(a,b){return new P.nx(null,a,!1,[b])},
f6:function(a,b,c,d,e,f){return e?new P.nC(null,0,null,b,c,d,a,[f]):new P.mM(null,0,null,b,c,d,a,[f])},
dM:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.k(z).$isP)return z
return}catch(w){v=H.y(w)
y=v
x=H.z(w)
v=$.l
v.toString
P.bb(null,null,v,y,x)}},
nX:[function(a,b){var z=$.l
z.toString
P.bb(null,null,z,a,b)},function(a){return P.nX(a,null)},"$2","$1","o8",2,2,12,0],
pK:[function(){},"$0","o7",0,0,3],
fL:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.z(u)
$.l.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gb_()
w=t
v=x.gaV()
c.$2(w,v)}}},
nL:function(a,b,c,d){var z=a.bS()
if(!!J.k(z).$isP&&z!==$.$get$aW())z.bC(new P.nN(b,c,d))
else b.aM(c,d)},
fD:function(a,b){return new P.nM(a,b)},
dI:function(a,b,c){var z=a.bS()
if(!!J.k(z).$isP&&z!==$.$get$aW())z.bC(new P.nO(b,c))
else b.aL(c)},
nG:function(a,b,c){$.l.toString
a.bK(b,c)},
m5:function(a,b){var z=$.l
if(z===C.f){z.toString
return P.du(a,b)}return P.du(a,z.dQ(b,!0))},
du:function(a,b){var z=C.c.bm(a.a,1000)
return H.m2(z<0?0:z,b)},
bb:function(a,b,c,d,e){var z={}
z.a=d
P.o0(new P.nZ(z,e))},
fI:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
fK:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
fJ:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
bc:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dQ(d,!(!z||!1))
P.fM(d)},
mB:{"^":"b:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
mA:{"^":"b:35;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
mC:{"^":"b:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
mD:{"^":"b:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
nJ:{"^":"b:0;a",
$1:function(a){return this.a.$2(0,a)}},
nK:{"^":"b:11;a",
$2:function(a,b){this.a.$2(1,new H.d1(a,b))}},
o2:{"^":"b:44;a",
$2:function(a,b){this.a(a,b)}},
nH:{"^":"b:1;a,b",
$0:function(){var z=this.b
if(z.a.gck()){z.b=!0
return}this.a.$2(null,0)}},
nI:{"^":"b:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
mE:{"^":"d;a,b,c",
gd9:function(){return this.a.gd9()},
gck:function(){return this.a.gck()},
ge_:function(){return this.c!=null},
u:function(a,b){return J.cR(this.a,b)},
dN:function(a,b){return this.a.dN(a,b)},
aX:function(){return this.a.aX()},
hi:function(a){var z=new P.mH(a)
this.a=P.f6(new P.mJ(this,a),new P.mK(z),null,new P.mL(this,z),!1,null)},
p:{
mF:function(a){var z=new P.mE(null,!1,null)
z.hi(a)
return z}}},
mH:{"^":"b:1;a",
$0:function(){P.c0(new P.mI(this.a))}},
mI:{"^":"b:1;a",
$0:function(){this.a.$2(0,null)}},
mK:{"^":"b:1;a",
$0:function(){this.a.$0()}},
mL:{"^":"b:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
mJ:{"^":"b:1;a,b",
$0:function(){var z=this.a
if(!z.a.gj4()){z.c=new P.bQ(new P.D(0,$.l,null,[null]),[null])
if(z.b===!0){z.b=!1
P.c0(new P.mG(this.b))}return z.c.gfa()}}},
mG:{"^":"b:1;a",
$0:function(){this.a.$2(2,null)}},
br:{"^":"d;ap:a<,b",
i:function(a){return"IterationMarker("+this.b+", "+H.a(this.a)+")"},
p:{
bT:function(a){return new P.br(a,1)},
aH:function(){return C.ae},
fx:function(a){return new P.br(a,0)},
aI:function(a){return new P.br(a,3)}}},
aS:{"^":"d;a,b,c,d",
gE:function(){var z=this.c
return z==null?this.b:z.gE()},
v:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.v())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.br){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ae(z)
if(!!w.$isaS){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
nB:{"^":"cj;a",
gM:function(a){return new P.aS(this.a(),null,null,null)},
$ascj:I.aL,
$asx:I.aL,
p:{
aJ:function(a){return new P.nB(a)}}},
P:{"^":"d;$ti"},
fv:{"^":"d;fa:a<,$ti",
dS:function(a,b){a=a!=null?a:new P.cp()
if(this.a.a!==0)throw H.c(new P.N("Future already completed"))
$.l.toString
this.aM(a,b)},
cM:function(a){return this.dS(a,null)}},
bQ:{"^":"fv;a,$ti",
bv:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.N("Future already completed"))
z.aW(a)},
dR:function(){return this.bv(null)},
aM:function(a,b){this.a.ew(a,b)}},
nA:{"^":"fv;a,$ti",
bv:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.N("Future already completed"))
z.aL(a)},
dR:function(){return this.bv(null)},
aM:function(a,b){this.a.aM(a,b)}},
dD:{"^":"d;dC:a<,b,c,d,e,$ti",
gi6:function(){return this.b.b},
gfc:function(){return(this.c&1)!==0},
giR:function(){return(this.c&2)!==0},
gfb:function(){return this.c===8},
iP:function(a){return this.b.b.ea(this.d,a)},
jg:function(a){if(this.c!==6)return!0
return this.b.b.ea(this.d,a.gb_())},
iL:function(a){var z,y,x
z=this.e
y=H.bZ()
x=this.b.b
if(H.ak(y,[y,y]).aN(z))return x.jw(z,a.gb_(),a.gaV())
else return x.ea(z,a.gb_())},
iQ:function(){return this.b.b.fB(this.d)}},
D:{"^":"d;cc:a<,b,hX:c<,$ti",
ghI:function(){return this.a===2},
gdv:function(){return this.a>=4},
eb:function(a,b){var z=$.l
if(z!==C.f){z.toString
if(b!=null)b=P.dL(b,z)}return this.dK(a,b)},
bA:function(a){return this.eb(a,null)},
dK:function(a,b){var z,y
z=new P.D(0,$.l,null,[null])
y=b==null?1:3
this.cD(new P.dD(null,z,y,a,b,[H.h(this,0),null]))
return z},
bC:function(a){var z,y
z=$.l
y=new P.D(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.h(this,0)
this.cD(new P.dD(null,y,8,a,null,[z,z]))
return y},
cD:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdv()){y.cD(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bc(null,null,z,new P.mW(this,a))}},
eM:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdC()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdv()){v.eM(a)
return}this.a=v.a
this.c=v.c}z.a=this.cH(a)
y=this.b
y.toString
P.bc(null,null,y,new P.n3(z,this))}},
cG:function(){var z=this.c
this.c=null
return this.cH(z)},
cH:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdC()
z.a=y}return y},
aL:function(a){var z
if(!!J.k(a).$isP)P.cH(a,this)
else{z=this.cG()
this.a=4
this.c=a
P.b8(this,z)}},
aM:[function(a,b){var z=this.cG()
this.a=8
this.c=new P.c6(a,b)
P.b8(this,z)},function(a){return this.aM(a,null)},"jP","$2","$1","gbk",2,2,12,0],
aW:function(a){var z
if(!!J.k(a).$isP){if(a.a===8){this.a=1
z=this.b
z.toString
P.bc(null,null,z,new P.mY(this,a))}else P.cH(a,this)
return}this.a=1
z=this.b
z.toString
P.bc(null,null,z,new P.mZ(this,a))},
ew:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bc(null,null,z,new P.mX(this,a,b))},
$isP:1,
p:{
n_:function(a,b){var z,y,x,w
b.a=1
try{a.eb(new P.n0(b),new P.n1(b))}catch(x){w=H.y(x)
z=w
y=H.z(x)
P.c0(new P.n2(b,z,y))}},
cH:function(a,b){var z,y,x
for(;a.ghI();)a=a.c
z=a.gdv()
y=b.c
if(z){b.c=null
x=b.cH(y)
b.a=a.a
b.c=a.c
P.b8(b,x)}else{b.a=2
b.c=a
a.eM(y)}},
b8:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=v.gb_()
x=v.gaV()
z.toString
P.bb(null,null,z,y,x)}return}for(;b.gdC()!=null;b=u){u=b.a
b.a=null
P.b8(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gfc()||b.gfb()){s=b.gi6()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=v.gb_()
r=v.gaV()
y.toString
P.bb(null,null,y,x,r)
return}q=$.l
if(q==null?s!=null:q!==s)$.l=s
else q=null
if(b.gfb())new P.n6(z,x,w,b).$0()
else if(y){if(b.gfc())new P.n5(x,b,t).$0()}else if(b.giR())new P.n4(z,x,b).$0()
if(q!=null)$.l=q
y=x.b
r=J.k(y)
if(!!r.$isP){p=b.b
if(!!r.$isD)if(y.a>=4){o=p.c
p.c=null
b=p.cH(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.cH(y,p)
else P.n_(y,p)
return}}p=b.b
b=p.cG()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
mW:{"^":"b:1;a,b",
$0:function(){P.b8(this.a,this.b)}},
n3:{"^":"b:1;a,b",
$0:function(){P.b8(this.b,this.a.a)}},
n0:{"^":"b:0;a",
$1:function(a){var z=this.a
z.a=0
z.aL(a)}},
n1:{"^":"b:46;a",
$2:function(a,b){this.a.aM(a,b)},
$1:function(a){return this.$2(a,null)}},
n2:{"^":"b:1;a,b,c",
$0:function(){this.a.aM(this.b,this.c)}},
mY:{"^":"b:1;a,b",
$0:function(){P.cH(this.b,this.a)}},
mZ:{"^":"b:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cG()
z.a=4
z.c=this.b
P.b8(z,y)}},
mX:{"^":"b:1;a,b,c",
$0:function(){this.a.aM(this.b,this.c)}},
n6:{"^":"b:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.iQ()}catch(w){v=H.y(w)
y=v
x=H.z(w)
if(this.c){v=this.a.a.c.gb_()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.c6(y,x)
u.a=!0
return}if(!!J.k(z).$isP){if(z instanceof P.D&&z.gcc()>=4){if(z.gcc()===8){v=this.b
v.b=z.ghX()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bA(new P.n7(t))
v.a=!1}}},
n7:{"^":"b:0;a",
$1:function(a){return this.a}},
n5:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.iP(this.c)}catch(x){w=H.y(x)
z=w
y=H.z(x)
w=this.a
w.b=new P.c6(z,y)
w.a=!0}}},
n4:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jg(z)===!0&&w.e!=null){v=this.b
v.b=w.iL(z)
v.a=!1}}catch(u){w=H.y(u)
y=w
x=H.z(u)
w=this.a
v=w.a.c.gb_()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.c6(y,x)
s.a=!0}}},
ft:{"^":"d;im:a<,bV:b@"},
a0:{"^":"d;$ti",
bd:function(a,b){return new P.nm(b,this,[H.t(this,"a0",0),null])},
U:function(a,b){var z,y
z={}
y=new P.D(0,$.l,null,[P.S])
z.a=null
z.a=this.ad(new P.lw(z,this,b,y),!0,new P.lx(y),y.gbk())
return y},
H:function(a,b){var z,y
z={}
y=new P.D(0,$.l,null,[null])
z.a=null
z.a=this.ad(new P.lC(z,this,b,y),!0,new P.lD(y),y.gbk())
return y},
gk:function(a){var z,y
z={}
y=new P.D(0,$.l,null,[P.r])
z.a=0
this.ad(new P.lI(z),!0,new P.lJ(z,y),y.gbk())
return y},
gG:function(a){var z,y
z={}
y=new P.D(0,$.l,null,[P.S])
z.a=null
z.a=this.ad(new P.lE(z,y),!0,new P.lF(y),y.gbk())
return y},
bY:function(a){var z,y,x
z=H.t(this,"a0",0)
y=H.w([],[z])
x=new P.D(0,$.l,null,[[P.J,z]])
this.ad(new P.lK(this,y),!0,new P.lL(y,x),x.gbk())
return x},
bB:function(a){var z,y,x
z=H.t(this,"a0",0)
y=P.I(null,null,null,z)
x=new P.D(0,$.l,null,[[P.bN,z]])
this.ad(new P.lM(this,y),!0,new P.lN(y,x),x.gbk())
return x},
gac:function(a){var z,y
z={}
y=new P.D(0,$.l,null,[H.t(this,"a0",0)])
z.a=null
z.a=this.ad(new P.ly(z,this,y),!0,new P.lz(y),y.gbk())
return y},
gI:function(a){var z,y
z={}
y=new P.D(0,$.l,null,[H.t(this,"a0",0)])
z.a=null
z.b=!1
this.ad(new P.lG(z,this),!0,new P.lH(z,y),y.gbk())
return y}},
lw:{"^":"b;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.fL(new P.lu(this.c,a),new P.lv(z,y),P.fD(z.a,y))},
$signature:function(){return H.ax(function(a){return{func:1,args:[a]}},this.b,"a0")}},
lu:{"^":"b:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
lv:{"^":"b:20;a,b",
$1:function(a){if(a===!0)P.dI(this.a.a,this.b,!0)}},
lx:{"^":"b:1;a",
$0:function(){this.a.aL(!1)}},
lC:{"^":"b;a,b,c,d",
$1:function(a){P.fL(new P.lA(this.c,a),new P.lB(),P.fD(this.a.a,this.d))},
$signature:function(){return H.ax(function(a){return{func:1,args:[a]}},this.b,"a0")}},
lA:{"^":"b:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lB:{"^":"b:0;",
$1:function(a){}},
lD:{"^":"b:1;a",
$0:function(){this.a.aL(null)}},
lI:{"^":"b:0;a",
$1:function(a){++this.a.a}},
lJ:{"^":"b:1;a,b",
$0:function(){this.b.aL(this.a.a)}},
lE:{"^":"b:0;a,b",
$1:function(a){P.dI(this.a.a,this.b,!1)}},
lF:{"^":"b:1;a",
$0:function(){this.a.aL(!0)}},
lK:{"^":"b;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.ax(function(a){return{func:1,args:[a]}},this.a,"a0")}},
lL:{"^":"b:1;a,b",
$0:function(){this.b.aL(this.a)}},
lM:{"^":"b;a,b",
$1:function(a){this.b.u(0,a)},
$signature:function(){return H.ax(function(a){return{func:1,args:[a]}},this.a,"a0")}},
lN:{"^":"b:1;a,b",
$0:function(){this.b.aL(this.a)}},
ly:{"^":"b;a,b,c",
$1:function(a){P.dI(this.a.a,this.c,a)},
$signature:function(){return H.ax(function(a){return{func:1,args:[a]}},this.b,"a0")}},
lz:{"^":"b:1;a",
$0:function(){var z,y,x,w
try{x=H.M()
throw H.c(x)}catch(w){x=H.y(w)
z=x
y=H.z(w)
P.fE(this.a,z,y)}}},
lG:{"^":"b;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$signature:function(){return H.ax(function(a){return{func:1,args:[a]}},this.b,"a0")}},
lH:{"^":"b:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aL(x.a)
return}try{x=H.M()
throw H.c(x)}catch(w){x=H.y(w)
z=x
y=H.z(w)
P.fE(this.b,z,y)}}},
cI:{"^":"d;cc:b<,$ti",
gd9:function(){return new P.cF(this,this.$ti)},
gj4:function(){return(this.b&4)!==0},
gck:function(){var z=this.b
return(z&1)!==0?this.gbl().geI():(z&2)===0},
ghQ:function(){if((this.b&8)===0)return this.a
return this.a.gcu()},
dl:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dG(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcu()==null)y.c=new P.dG(null,null,0,this.$ti)
return y.c},
gbl:function(){if((this.b&8)!==0)return this.a.gcu()
return this.a},
c_:function(){if((this.b&4)!==0)return new P.N("Cannot add event after closing")
return new P.N("Cannot add event while adding a stream")},
ik:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c_())
if((z&2)!==0){z=new P.D(0,$.l,null,[null])
z.aW(null)
return z}z=this.a
y=new P.D(0,$.l,null,[null])
x=this.ghl()
x=a.ad(this.gho(),!1,this.ghp(),x)
w=this.b
if((w&1)!==0?this.gbl().geI():(w&2)===0)x.cn()
this.a=new P.nt(z,y,x,this.$ti)
this.b|=8
return y},
eC:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$aW():new P.D(0,$.l,null,[null])
this.c=z}return z},
u:[function(a,b){if(this.b>=4)throw H.c(this.c_())
this.bt(b)},"$1","gi7",2,0,function(){return H.ax(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cI")}],
dN:function(a,b){if(this.b>=4)throw H.c(this.c_())
a=a!=null?a:new P.cp()
$.l.toString
this.bK(a,b)},
aX:function(){var z=this.b
if((z&4)!==0)return this.eC()
if(z>=4)throw H.c(this.c_())
z|=4
this.b=z
if((z&1)!==0)this.c9()
else if((z&3)===0)this.dl().u(0,C.u)
return this.eC()},
bt:[function(a){var z=this.b
if((z&1)!==0)this.c8(a)
else if((z&3)===0)this.dl().u(0,new P.dz(a,null,this.$ti))},"$1","gho",2,0,function(){return H.ax(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cI")}],
bK:[function(a,b){var z=this.b
if((z&1)!==0)this.ca(a,b)
else if((z&3)===0)this.dl().u(0,new P.dA(a,b,null))},"$2","ghl",4,0,22],
de:[function(){var z=this.a
this.a=z.gcu()
this.b&=4294967287
z.a.aW(null)},"$0","ghp",0,0,3],
i1:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.N("Stream has already been listened to."))
z=$.l
y=d?1:0
x=new P.mQ(this,null,null,null,z,y,null,null,this.$ti)
x.er(a,b,c,d,H.h(this,0))
w=this.ghQ()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scu(x)
v.b.cr()}else this.a=x
x.i_(w)
x.dt(new P.nv(this))
return x},
hU:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bS()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){w=H.y(v)
y=w
x=H.z(v)
u=new P.D(0,$.l,null,[null])
u.ew(y,x)
z=u}else z=z.bC(w)
w=new P.nu(this)
if(z!=null)z=z.bC(w)
else w.$0()
return z}},
nv:{"^":"b:1;a",
$0:function(){P.dM(this.a.d)}},
nu:{"^":"b:3;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.aW(null)}},
nD:{"^":"d;$ti",
c8:function(a){this.gbl().bt(a)},
ca:function(a,b){this.gbl().bK(a,b)},
c9:function(){this.gbl().de()}},
mN:{"^":"d;$ti",
c8:function(a){this.gbl().bL(new P.dz(a,null,[H.h(this,0)]))},
ca:function(a,b){this.gbl().bL(new P.dA(a,b,null))},
c9:function(){this.gbl().bL(C.u)}},
mM:{"^":"cI+mN;a,b,c,d,e,f,r,$ti"},
nC:{"^":"cI+nD;a,b,c,d,e,f,r,$ti"},
cF:{"^":"nw;a,$ti",
gq:function(a){return(H.a4(this.a)^892482866)>>>0},
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cF))return!1
return b.a===this.a}},
mQ:{"^":"bR;x,a,b,c,d,e,f,r,$ti",
dD:function(){return this.x.hU(this)},
dF:[function(){var z=this.x
if((z.b&8)!==0)z.a.cn()
P.dM(z.e)},"$0","gdE",0,0,3],
dH:[function(){var z=this.x
if((z.b&8)!==0)z.a.cr()
P.dM(z.f)},"$0","gdG",0,0,3]},
mw:{"^":"d;$ti",
cn:function(){this.b.cn()},
cr:function(){this.b.cr()},
bS:function(){var z=this.b.bS()
if(z==null){this.a.aW(null)
return}return z.bC(new P.mx(this))},
dR:function(){this.a.aW(null)}},
mx:{"^":"b:1;a",
$0:function(){this.a.a.aW(null)}},
nt:{"^":"mw;cu:c@,a,b,$ti"},
pH:{"^":"d;$ti"},
bR:{"^":"d;cc:e<,$ti",
i_:function(a){if(a==null)return
this.r=a
if(!a.gG(a)){this.e=(this.e|64)>>>0
this.r.cz(this)}},
jk:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.eZ()
if((z&4)===0&&(this.e&32)===0)this.dt(this.gdE())},
cn:function(){return this.jk(null)},
cr:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gG(z)}else z=!1
if(z)this.r.cz(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dt(this.gdG())}}}},
bS:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.df()
z=this.f
return z==null?$.$get$aW():z},
geI:function(){return(this.e&4)!==0},
gck:function(){return this.e>=128},
df:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.eZ()
if((this.e&32)===0)this.r=null
this.f=this.dD()},
bt:["h7",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c8(a)
else this.bL(new P.dz(a,null,[H.t(this,"bR",0)]))}],
bK:["h8",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ca(a,b)
else this.bL(new P.dA(a,b,null))}],
de:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c9()
else this.bL(C.u)},
dF:[function(){},"$0","gdE",0,0,3],
dH:[function(){},"$0","gdG",0,0,3],
dD:function(){return},
bL:function(a){var z,y
z=this.r
if(z==null){z=new P.dG(null,null,0,[H.t(this,"bR",0)])
this.r=z}z.u(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cz(this)}},
c8:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fE(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dh((z&4)!==0)},
ca:function(a,b){var z,y,x
z=this.e
y=new P.mP(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.df()
z=this.f
if(!!J.k(z).$isP){x=$.$get$aW()
x=z==null?x!=null:z!==x}else x=!1
if(x)z.bC(y)
else y.$0()}else{y.$0()
this.dh((z&4)!==0)}},
c9:function(){var z,y,x
z=new P.mO(this)
this.df()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.k(y).$isP){x=$.$get$aW()
x=y==null?x!=null:y!==x}else x=!1
if(x)y.bC(z)
else z.$0()},
dt:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dh((z&4)!==0)},
dh:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gG(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gG(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dF()
else this.dH()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cz(this)},
er:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.dL(b==null?P.o8():b,z)
this.c=c==null?P.o7():c}},
mP:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ak(H.bZ(),[H.aw(P.d),H.aw(P.aG)]).aN(y)
w=z.d
v=this.b
u=z.b
if(x)w.jx(u,v,this.c)
else w.fE(u,v)
z.e=(z.e&4294967263)>>>0}},
mO:{"^":"b:3;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fC(z.c)
z.e=(z.e&4294967263)>>>0}},
nw:{"^":"a0;$ti",
ad:function(a,b,c,d){return this.a.i1(a,d,c,!0===b)},
e5:function(a,b,c){return this.ad(a,null,b,c)}},
dB:{"^":"d;bV:a@,$ti"},
dz:{"^":"dB;ap:b<,a,$ti",
e6:function(a){a.c8(this.b)}},
dA:{"^":"dB;b_:b<,aV:c<,a",
e6:function(a){a.ca(this.b,this.c)},
$asdB:I.aL},
mR:{"^":"d;",
e6:function(a){a.c9()},
gbV:function(){return},
sbV:function(a){throw H.c(new P.N("No events after a done."))}},
no:{"^":"d;cc:a<,$ti",
cz:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.c0(new P.np(this,a))
this.a=1},
eZ:function(){if(this.a===1)this.a=3}},
np:{"^":"b:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbV()
z.b=w
if(w==null)z.c=null
x.e6(this.b)}},
dG:{"^":"no;b,c,a,$ti",
gG:function(a){return this.c==null},
u:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbV(b)
this.c=b}}},
nx:{"^":"d;a,b,c,$ti"},
nN:{"^":"b:1;a,b,c",
$0:function(){return this.a.aM(this.b,this.c)}},
nM:{"^":"b:11;a,b",
$2:function(a,b){P.nL(this.a,this.b,a,b)}},
nO:{"^":"b:1;a,b",
$0:function(){return this.a.aL(this.b)}},
dC:{"^":"a0;$ti",
ad:function(a,b,c,d){return this.hw(a,d,c,!0===b)},
e5:function(a,b,c){return this.ad(a,null,b,c)},
hw:function(a,b,c,d){return P.mV(this,a,b,c,d,H.t(this,"dC",0),H.t(this,"dC",1))},
eF:function(a,b){b.bt(a)},
hG:function(a,b,c){c.bK(a,b)},
$asa0:function(a,b){return[b]}},
fw:{"^":"bR;x,y,a,b,c,d,e,f,r,$ti",
bt:function(a){if((this.e&2)!==0)return
this.h7(a)},
bK:function(a,b){if((this.e&2)!==0)return
this.h8(a,b)},
dF:[function(){var z=this.y
if(z==null)return
z.cn()},"$0","gdE",0,0,3],
dH:[function(){var z=this.y
if(z==null)return
z.cr()},"$0","gdG",0,0,3],
dD:function(){var z=this.y
if(z!=null){this.y=null
return z.bS()}return},
jR:[function(a){this.x.eF(a,this)},"$1","ghD",2,0,function(){return H.ax(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fw")}],
jT:[function(a,b){this.x.hG(a,b,this)},"$2","ghF",4,0,26],
jS:[function(){this.de()},"$0","ghE",0,0,3],
hj:function(a,b,c,d,e,f,g){this.y=this.x.a.e5(this.ghD(),this.ghE(),this.ghF())},
$asbR:function(a,b){return[b]},
p:{
mV:function(a,b,c,d,e,f,g){var z,y
z=$.l
y=e?1:0
y=new P.fw(a,null,null,null,null,z,y,null,null,[f,g])
y.er(b,c,d,e,g)
y.hj(a,b,c,d,e,f,g)
return y}}},
nm:{"^":"dC;b,a,$ti",
eF:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.y(w)
y=v
x=H.z(w)
P.nG(b,y,x)
return}b.bt(z)}},
c6:{"^":"d;b_:a<,aV:b<",
i:function(a){return H.a(this.a)},
$isU:1},
pD:{"^":"d;"},
nF:{"^":"d;"},
nZ:{"^":"b:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cp()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.j(y)
throw x}},
nq:{"^":"nF;",
fC:function(a){var z,y,x,w
try{if(C.f===$.l){x=a.$0()
return x}x=P.fI(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.bb(null,null,this,z,y)}},
fE:function(a,b){var z,y,x,w
try{if(C.f===$.l){x=a.$1(b)
return x}x=P.fK(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.bb(null,null,this,z,y)}},
jx:function(a,b,c){var z,y,x,w
try{if(C.f===$.l){x=a.$2(b,c)
return x}x=P.fJ(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.bb(null,null,this,z,y)}},
dQ:function(a,b){if(b)return new P.nr(this,a)
else return new P.ns(this,a)},
h:function(a,b){return},
fB:function(a){if($.l===C.f)return a.$0()
return P.fI(null,null,this,a)},
ea:function(a,b){if($.l===C.f)return a.$1(b)
return P.fK(null,null,this,a,b)},
jw:function(a,b,c){if($.l===C.f)return a.$2(b,c)
return P.fJ(null,null,this,a,b,c)}},
nr:{"^":"b:1;a,b",
$0:function(){return this.a.fC(this.b)}},
ns:{"^":"b:1;a,b",
$0:function(){return this.a.fB(this.b)}}}],["","",,P,{"^":"",
ez:function(a,b){return new H.H(0,null,null,null,null,null,0,[a,b])},
aE:function(){return new H.H(0,null,null,null,null,null,0,[null,null])},
a7:function(a){return H.fW(a,new H.H(0,null,null,null,null,null,0,[null,null]))},
jc:function(a,b,c){var z,y
if(P.dK(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bw()
y.push(a)
try{P.nU(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.f8(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aX:function(a,b,c){var z,y,x
if(P.dK(a))return b+"..."+c
z=new P.bq(b)
y=$.$get$bw()
y.push(a)
try{x=z
x.t=P.f8(x.gt(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.t=y.gt()+c
y=z.gt()
return y.charCodeAt(0)==0?y:y},
dK:function(a){var z,y
for(z=0;y=$.$get$bw(),z<y.length;++z){y=y[z]
if(a==null?y==null:a===y)return!0}return!1},
nU:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gM(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.a(z.gE())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gE();++x
if(!z.v()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gE();++x
for(;z.v();t=s,s=r){r=z.gE();++x
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
jo:function(a,b,c,d,e){return new H.H(0,null,null,null,null,null,0,[d,e])},
bH:function(a,b,c){var z=P.jo(null,null,null,b,c)
a.H(0,new P.o9(z))
return z},
I:function(a,b,c,d){return new P.dF(0,null,null,null,null,null,0,[d])},
ac:function(a,b){var z,y
z=P.I(null,null,null,b)
for(y=J.ae(a);y.v();)z.u(0,y.gE())
return z},
jp:function(a,b,c){var z,y,x,w
z=[]
y=a.gk(a)
for(x=0;x<y;++x){w=a.h(0,x)
if(J.f(b.$1(w),c))z.push(w)
if(y!==a.gk(a))throw H.c(new P.A(a))}if(z.length!==a.gk(a)){a.fZ(0,0,z.length,z)
a.sk(0,z.length)}},
co:function(a){var z,y,x
z={}
if(P.dK(a))return"{...}"
y=new P.bq("")
try{$.$get$bw().push(a)
x=y
x.t=x.gt()+"{"
z.a=!0
a.H(0,new P.jx(z,y))
z=y
z.t=z.gt()+"}"}finally{z=$.$get$bw()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gt()
return z.charCodeAt(0)==0?z:z},
fy:{"^":"H;a,b,c,d,e,f,r,$ti",
ci:function(a){return H.h5(a)&0x3ffffff},
cj:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfe()
if(x==null?b==null:x===b)return y}return-1},
p:{
bs:function(a,b){return new P.fy(0,null,null,null,null,null,0,[a,b])}}},
dF:{"^":"n8;a,b,c,d,e,f,r,$ti",
dB:function(){return new P.dF(0,null,null,null,null,null,0,this.$ti)},
gM:function(a){var z=new P.av(this,this.r,null,null,[null])
z.c=this.e
return z},
gk:function(a){return this.a},
gG:function(a){return this.a===0},
ga3:function(a){return this.a!==0},
U:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hv(b)},
hv:function(a){var z=this.d
if(z==null)return!1
return this.c2(z[this.c0(a)],a)>=0},
fh:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.U(0,a)?a:null
else return this.hK(a)},
hK:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.c0(a)]
x=this.c2(y,a)
if(x<0)return
return J.am(y,x).gdk()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.A(this))
z=z.b}},
gac:function(a){var z=this.e
if(z==null)throw H.c(new P.N("No elements"))
return z.a},
gI:function(a){var z=this.f
if(z==null)throw H.c(new P.N("No elements"))
return z.a},
u:function(a,b){var z,y,x
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
if(z==null){z=P.nh()
this.d=z}y=this.c0(a)
x=z[y]
if(x==null)z[y]=[this.di(a)]
else{if(this.c2(x,a)>=0)return!1
x.push(this.di(a))}return!0},
aI:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ey(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ey(this.c,b)
else return this.hV(b)},
hV:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.c0(a)]
x=this.c2(y,a)
if(x<0)return!1
this.ez(y.splice(x,1)[0])
return!0},
hA:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.A(this))
if(b===v)this.aI(0,y)}},
aH:function(a){if(this.a>0){this.f=null
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
z=new P.ng(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ez:function(a){var z,y
z=a.ghu()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
c0:function(a){return J.n(a)&0x3ffffff},
c2:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gdk(),b))return y
return-1},
$isbN:1,
$isW:1,
p:{
nh:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fz:{"^":"dF;a,b,c,d,e,f,r,$ti",
dB:function(){return new P.fz(0,null,null,null,null,null,0,this.$ti)},
c0:function(a){return H.h5(a)&0x3ffffff},
c2:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdk()
if(x==null?b==null:x===b)return y}return-1}},
ng:{"^":"d;dk:a<,b,hu:c<"},
av:{"^":"d;a,b,c,d,$ti",
gE:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.A(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
n8:{"^":"l2;$ti",
bB:function(a){var z=this.dB()
z.as(0,this)
return z}},
cj:{"^":"x;$ti"},
o9:{"^":"b:5;a",
$2:function(a,b){this.a.l(0,a,b)}},
eA:{"^":"eF;$ti"},
eF:{"^":"d+aY;$ti",$asJ:null,$asW:null,$isJ:1,$isW:1},
aY:{"^":"d;$ti",
gM:function(a){return new H.cm(this,this.gk(this),0,null,[H.t(this,"aY",0)])},
a2:function(a,b){return this.h(0,b)},
H:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gk(this))throw H.c(new P.A(this))}},
gG:function(a){return this.gk(this)===0},
ga3:function(a){return!this.gG(this)},
gac:function(a){if(this.gk(this)===0)throw H.c(H.M())
return this.h(0,0)},
gI:function(a){if(this.gk(this)===0)throw H.c(H.M())
return this.h(0,this.gk(this)-1)},
U:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<this.gk(this);++y){if(J.f(this.h(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.A(this))}return!1},
bR:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y))===!0)return!0
if(z!==this.gk(this))throw H.c(new P.A(this))}return!1},
ba:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.A(this))}return c.$0()},
bd:function(a,b){return new H.ag(this,b,[H.t(this,"aY",0),null])},
ak:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(0,x))
if(z!==this.gk(this))throw H.c(new P.A(this))}return y},
d7:function(a,b){return H.f9(this,b,null,H.t(this,"aY",0))},
bB:function(a){var z,y
z=P.I(null,null,null,H.t(this,"aY",0))
for(y=0;y<this.gk(this);++y)z.u(0,this.h(0,y))
return z},
u:function(a,b){var z=this.gk(this)
this.sk(0,z+1)
this.l(0,z,b)},
aI:function(a,b){var z
for(z=0;z<this.gk(this);++z)if(J.f(this.h(0,z),b)){this.ay(0,z,this.gk(this)-1,this,z+1)
this.sk(0,this.gk(this)-1)
return!0}return!1},
ay:function(a,b,c,d,e){var z,y,x,w,v
P.ct(b,c,this.gk(this),null,null,null)
z=c-b
if(z===0)return
if(H.bY(d,"$isJ",[H.t(this,"aY",0)],"$asJ")){y=e
x=d}else{x=J.hk(d,e).bf(0,!1)
y=0}w=J.F(x)
if(y+z>w.gk(x))throw H.c(H.ep())
if(y<b)for(v=z-1;v>=0;--v)this.l(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.l(0,b+v,w.h(x,y+v))},
fZ:function(a,b,c,d){return this.ay(a,b,c,d,0)},
i:function(a){return P.aX(this,"[","]")},
$isJ:1,
$isW:1},
nE:{"^":"d;$ti",
l:function(a,b,c){throw H.c(new P.T("Cannot modify unmodifiable map"))},
$isB:1},
jv:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
l:function(a,b,c){this.a.l(0,b,c)},
J:function(a){return this.a.J(a)},
H:function(a,b){this.a.H(0,b)},
gG:function(a){var z=this.a
return z.gG(z)},
ga3:function(a){var z=this.a
return z.ga3(z)},
gk:function(a){var z=this.a
return z.gk(z)},
i:function(a){return this.a.i(0)},
$isB:1},
fr:{"^":"jv+nE;a,$ti",$asB:null,$isB:1},
jx:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.t+=", "
z.a=!1
z=this.b
y=z.t+=H.a(a)
z.t=y+": "
z.t+=H.a(b)}},
jq:{"^":"ar;a,b,c,d,$ti",
gM:function(a){return new P.ni(this,this.c,this.d,this.b,null,this.$ti)},
H:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.A(this))}},
gG:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gac:function(a){var z,y
z=this.b
if(z===this.c)throw H.c(H.M())
y=this.a
if(z>=y.length)return H.e(y,z)
return y[z]},
gI:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.M())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
a2:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.ch(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
u:function(a,b){this.ag(b)},
as:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.bY(b,"$isJ",z,"$asJ")){y=b.gk(b)
x=this.gk(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.jr(w+C.h.cb(w,1))
if(typeof t!=="number")return H.C(t)
v=new Array(t)
v.fixed$length=Array
s=H.w(v,z)
this.c=this.i5(s)
this.a=s
this.b=0
C.a.ay(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.ay(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.ay(v,z,z+r,b,0)
C.a.ay(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new H.cm(b,b.gk(b),0,null,[H.t(b,"ar",0)]);z.v();)this.ag(z.d)},
aH:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aX(this,"{","}")},
eX:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eE();++this.d},
cT:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.M());++this.d
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
if(this.b===x)this.eE();++this.d},
eE:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.w(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.ay(y,0,w,z,x)
C.a.ay(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
i5:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.ay(a,0,w,x,z)
return w}else{v=x.length-z
C.a.ay(a,0,v,x,z)
C.a.ay(a,v,v+this.c,this.a,0)
return this.c+v}},
ha:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.w(z,[b])},
p:{
aP:function(a,b){var z=new P.jq(null,0,0,0,[b])
z.ha(a,b)
return z},
jr:function(a){var z
a=C.q.ek(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
ni:{"^":"d;a,b,c,d,e,$ti",
gE:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.A(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
l3:{"^":"d;$ti",
gG:function(a){return this.a===0},
ga3:function(a){return this.a!==0},
as:function(a,b){var z
for(z=J.ae(b);z.v();)this.u(0,z.gE())},
bf:function(a,b){var z,y,x,w,v
z=H.w([],this.$ti)
C.a.sk(z,this.a)
for(y=new P.av(this,this.r,null,null,[null]),y.c=this.e,x=0;y.v();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
bY:function(a){return this.bf(a,!0)},
bd:function(a,b){return new H.ce(this,b,[H.h(this,0),null])},
i:function(a){return P.aX(this,"{","}")},
H:function(a,b){var z
for(z=new P.av(this,this.r,null,null,[null]),z.c=this.e;z.v();)b.$1(z.d)},
ak:function(a,b,c){var z,y
for(z=new P.av(this,this.r,null,null,[null]),z.c=this.e,y=b;z.v();)y=c.$2(y,z.d)
return y},
gac:function(a){var z=new P.av(this,this.r,null,null,[null])
z.c=this.e
if(!z.v())throw H.c(H.M())
return z.d},
gI:function(a){var z,y
z=new P.av(this,this.r,null,null,[null])
z.c=this.e
if(!z.v())throw H.c(H.M())
do y=z.d
while(z.v())
return y},
ba:function(a,b,c){var z,y
for(z=new P.av(this,this.r,null,null,[null]),z.c=this.e;z.v();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
bJ:function(a,b){var z,y,x,w
for(z=new P.av(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.v();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.d5())
y=w
x=!0}}if(x)return y
throw H.c(H.M())},
$isbN:1,
$isW:1},
l2:{"^":"l3;$ti"}}],["","",,P,{"^":"",
cK:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.nb(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cK(a[z])
return a},
nY:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.R(a))
z=null
try{z=JSON.parse(a)}catch(x){w=H.y(x)
y=w
throw H.c(new P.em(String(y),null,null))}return P.cK(z)},
pI:[function(a){return a.cX()},"$1","oq",2,0,0],
nb:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hT(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c1().length
return z},
gG:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c1().length
return z===0},
ga3:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c1().length
return z>0},
l:function(a,b,c){var z,y
if(this.b==null)this.c.l(0,b,c)
else if(this.J(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.i3().l(0,b,c)},
J:function(a){if(this.b==null)return this.c.J(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
fv:function(a,b){var z
if(this.J(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
H:function(a,b){var z,y,x,w
if(this.b==null)return this.c.H(0,b)
z=this.c1()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cK(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.A(this))}},
i:function(a){return P.co(this)},
c1:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
i3:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.aE()
y=this.c1()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.l(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
hT:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cK(this.a[a])
return this.b[a]=z},
$isB:1,
$asB:I.aL},
eb:{"^":"d;$ti"},
cc:{"^":"d;$ti"},
d9:{"^":"U;a,b",
i:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
ji:{"^":"d9;a,b",
i:function(a){return"Cyclic error in JSON stringify"}},
jh:{"^":"eb;a,b",
iv:function(a,b){return P.nY(a,this.giw().a)},
iu:function(a){return this.iv(a,null)},
iD:function(a,b){var z=this.giE()
return P.nd(a,z.b,z.a)},
f6:function(a){return this.iD(a,null)},
giE:function(){return C.P},
giw:function(){return C.O},
$aseb:function(){return[P.d,P.o]}},
jk:{"^":"cc;a,b",
$ascc:function(){return[P.d,P.o]}},
jj:{"^":"cc;a",
$ascc:function(){return[P.o,P.d]}},
ne:{"^":"d;",
fM:function(a){var z,y,x,w,v,u,t
z=J.F(a)
y=z.gk(a)
if(typeof y!=="number")return H.C(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.aY(a,v)
if(u>92)continue
if(u<32){if(v>w)x.t+=C.b.aA(a,w,v)
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
break}}else if(u===34||u===92){if(v>w)x.t+=C.b.aA(a,w,v)
w=v+1
x.t+=H.a8(92)
x.t+=H.a8(u)}}if(w===0)x.t+=H.a(a)
else if(w<y)x.t+=z.aA(a,w,y)},
dg:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.ji(a,null))}z.push(a)},
d_:function(a){var z,y,x,w
if(this.fL(a))return
this.dg(a)
try{z=this.b.$1(a)
if(!this.fL(z))throw H.c(new P.d9(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){x=H.y(w)
y=x
throw H.c(new P.d9(a,y))}},
fL:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.t+=C.h.i(a)
return!0}else if(a===!0){this.c.t+="true"
return!0}else if(a===!1){this.c.t+="false"
return!0}else if(a==null){this.c.t+="null"
return!0}else if(typeof a==="string"){z=this.c
z.t+='"'
this.fM(a)
z.t+='"'
return!0}else{z=J.k(a)
if(!!z.$isJ){this.dg(a)
this.jJ(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isB){this.dg(a)
y=this.jK(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
jJ:function(a){var z,y,x
z=this.c
z.t+="["
y=J.F(a)
if(y.gk(a)>0){this.d_(y.h(a,0))
for(x=1;x<y.gk(a);++x){z.t+=","
this.d_(y.h(a,x))}}z.t+="]"},
jK:function(a){var z,y,x,w,v,u
z={}
if(a.gG(a)){this.c.t+="{}"
return!0}y=a.gk(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.H(0,new P.nf(z,x))
if(!z.b)return!1
z=this.c
z.t+="{"
for(w='"',v=0;v<y;v+=2,w=',"'){z.t+=w
this.fM(x[v])
z.t+='":'
u=v+1
if(u>=y)return H.e(x,u)
this.d_(x[u])}z.t+="}"
return!0}},
nf:{"^":"b:5;a,b",
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
nc:{"^":"ne;c,a,b",p:{
nd:function(a,b,c){var z,y,x
z=new P.bq("")
y=P.oq()
x=new P.nc(z,[],y)
x.d_(a)
y=z.t
return y.charCodeAt(0)==0?y:y}}}}],["","",,P,{"^":"",
pa:[function(a,b){return J.c3(a,b)},"$2","or",4,0,38],
ej:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.j(a)
if(typeof a==="string")return JSON.stringify(a)
return P.iK(a)},
iK:function(a){var z=J.k(a)
if(!!z.$isb)return z.i(a)
return H.cr(a)},
cf:function(a){return new P.mU(a)},
a_:function(a,b,c){var z,y
z=H.w([],[c])
for(y=J.ae(a);y.v();)z.push(y.gE())
if(b)return z
z.fixed$length=Array
return z},
js:function(a,b,c,d){var z,y,x
z=H.w(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
dZ:function(a){var z=H.a(a)
H.oO(z)},
b3:function(a,b,c){return new H.ev(a,H.d7(a,!1,b,!1),null,null)},
S:{"^":"d;"},
"+bool":0,
O:{"^":"d;$ti"},
cd:{"^":"d;i4:a<,b",
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.cd))return!1
return this.a===b.a&&!0},
b8:function(a,b){return C.c.b8(this.a,b.gi4())},
gq:function(a){var z=this.a
return(z^C.c.cb(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t
z=P.ik(H.b0(this).getFullYear()+0)
y=P.bD(H.b0(this).getMonth()+1)
x=P.bD(H.b0(this).getDate()+0)
w=P.bD(H.b0(this).getHours()+0)
v=P.bD(H.b0(this).getMinutes()+0)
u=P.bD(H.b0(this).getSeconds()+0)
t=P.il(H.b0(this).getMilliseconds()+0)
return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
u:function(a,b){var z,y
z=this.a+b.giU()
y=new P.cd(z,!1)
z=Math.abs(z)
if(!(z>864e13)){z===864e13
z=!1}else z=!0
if(z)H.i(P.E(y.gjh()))
return y},
gjh:function(){return this.a},
$isO:1,
$asO:function(){return[P.cd]},
p:{
ik:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.a(z)
if(z>=10)return y+"00"+H.a(z)
return y+"000"+H.a(z)},
il:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bD:function(a){if(a>=10)return""+a
return"0"+a}}},
az:{"^":"K;",$isO:1,
$asO:function(){return[P.K]}},
"+double":0,
aO:{"^":"d;bu:a<",
a1:function(a,b){return new P.aO(this.a+b.gbu())},
aq:function(a,b){return new P.aO(this.a-b.gbu())},
bH:function(a,b){return new P.aO(C.h.e9(this.a*b))},
ah:function(a,b){return C.c.ah(this.a,b.gbu())},
bq:function(a,b){return this.a>b.gbu()},
bG:function(a,b){return C.c.bG(this.a,b.gbu())},
bE:function(a,b){return C.c.bE(this.a,b.gbu())},
giU:function(){return C.c.bm(this.a,1000)},
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.aO))return!1
return this.a===b.a},
gq:function(a){return this.a&0x1FFFFFFF},
b8:function(a,b){return C.c.b8(this.a,b.gbu())},
i:function(a){var z,y,x,w,v
z=new P.iw()
y=this.a
if(y<0)return"-"+new P.aO(-y).i(0)
x=z.$1(C.c.bm(y,6e7)%60)
w=z.$1(C.c.bm(y,1e6)%60)
v=new P.iv().$1(y%1e6)
return""+C.c.bm(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)},
ei:function(a){return new P.aO(-this.a)},
$isO:1,
$asO:function(){return[P.aO]}},
iv:{"^":"b:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
iw:{"^":"b:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
U:{"^":"d;",
gaV:function(){return H.z(this.$thrownJsError)}},
cp:{"^":"U;",
i:function(a){return"Throw of null."}},
aN:{"^":"U;a,b,j:c<,d",
gdn:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdm:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gdn()+y+x
if(!this.a)return w
v=this.gdm()
u=P.ej(this.b)
return w+v+": "+H.a(u)},
p:{
E:function(a){return new P.aN(!1,null,null,a)},
c5:function(a,b,c){return new P.aN(!0,a,b,c)},
v:function(a){return new P.aN(!1,null,a,"Must not be null")}}},
dl:{"^":"aN;e,f,a,b,c,d",
gdn:function(){return"RangeError"},
gdm:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.bq()
if(typeof z!=="number")return H.C(z)
if(x>z)y=": Not in range "+H.a(z)+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.a(z)}}return y},
p:{
kf:function(a){return new P.dl(null,null,!1,null,null,a)},
bJ:function(a,b,c){return new P.dl(null,null,!0,a,b,"Value not in range")},
V:function(a,b,c,d,e){return new P.dl(b,c,!0,a,d,"Invalid value")},
kg:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.V(a,b,c,d,e))},
ct:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.V(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.V(b,a,c,"end",f))
return b}}},
j1:{"^":"aN;e,k:f>,a,b,c,d",
gdn:function(){return"RangeError"},
gdm:function(){if(J.c2(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
p:{
ch:function(a,b,c,d,e){var z=e!=null?e:J.aB(b)
return new P.j1(b,z,!0,a,c,"Index out of range")}}},
T:{"^":"U;a",
i:function(a){return"Unsupported operation: "+this.a}},
ai:{"^":"U;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
N:{"^":"U;a",
i:function(a){return"Bad state: "+this.a}},
A:{"^":"U;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.ej(z))+"."}},
jP:{"^":"d;",
i:function(a){return"Out of Memory"},
gaV:function(){return},
$isU:1},
f0:{"^":"d;",
i:function(a){return"Stack Overflow"},
gaV:function(){return},
$isU:1},
ij:{"^":"U;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.a(z)+"' during its initialization"}},
mU:{"^":"d;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
em:{"^":"d;a,b,c",
i:function(a){var z,y
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(typeof y!=="string")return z
if(y.length>78)y=J.e4(y,0,75)+"..."
return z+"\n"+H.a(y)}},
iL:{"^":"d;j:a<,eJ,$ti",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z,y
z=this.eJ
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.c5(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dj(b,"expando$values")
return y==null?null:H.dj(y,z)},
l:function(a,b,c){var z,y
z=this.eJ
if(typeof z!=="string")z.set(b,c)
else{y=H.dj(b,"expando$values")
if(y==null){y=new P.d()
H.eM(b,"expando$values",y)}H.eM(y,z,c)}}},
bk:{"^":"d;"},
r:{"^":"K;",$isO:1,
$asO:function(){return[P.K]}},
"+int":0,
x:{"^":"d;$ti",
bd:function(a,b){return H.aQ(this,b,H.t(this,"x",0),null)},
bD:["ep",function(a,b){return new H.Q(this,b,[H.t(this,"x",0)])}],
U:function(a,b){var z
for(z=this.gM(this);z.v();)if(J.f(z.gE(),b))return!0
return!1},
H:function(a,b){var z
for(z=this.gM(this);z.v();)b.$1(z.gE())},
ak:function(a,b,c){var z,y
for(z=this.gM(this),y=b;z.v();)y=c.$2(y,z.gE())
return y},
bf:function(a,b){return P.a_(this,b,H.t(this,"x",0))},
bY:function(a){return this.bf(a,!0)},
bB:function(a){return P.ac(this,H.t(this,"x",0))},
gk:function(a){var z,y
z=this.gM(this)
for(y=0;z.v();)++y
return y},
gG:function(a){return!this.gM(this).v()},
ga3:function(a){return!this.gG(this)},
d7:function(a,b){return H.l5(this,b,H.t(this,"x",0))},
gac:function(a){var z=this.gM(this)
if(!z.v())throw H.c(H.M())
return z.gE()},
gI:function(a){var z,y
z=this.gM(this)
if(!z.v())throw H.c(H.M())
do y=z.gE()
while(z.v())
return y},
gbs:function(a){var z,y
z=this.gM(this)
if(!z.v())throw H.c(H.M())
y=z.gE()
if(z.v())throw H.c(H.d5())
return y},
a2:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.v("index"))
if(b<0)H.i(P.V(b,0,null,"index",null))
for(z=this.gM(this),y=0;z.v();){x=z.gE()
if(b===y)return x;++y}throw H.c(P.ch(b,this,"index",null,y))},
i:function(a){return P.jc(this,"(",")")}},
ck:{"^":"d;$ti"},
J:{"^":"d;$ti",$isx:1,$isW:1},
"+List":0,
B:{"^":"d;$ti"},
aR:{"^":"d;",
gq:function(a){return P.d.prototype.gq.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isO:1,
$asO:function(){return[P.K]}},
"+num":0,
d:{"^":";",
B:function(a,b){return this===b},
gq:function(a){return H.a4(this)},
i:function(a){return H.cr(this)},
gb3:function(a){return new H.ah(H.dV(this),null)},
toString:function(){return this.i(this)}},
b_:{"^":"d;"},
bN:{"^":"W;$ti"},
aG:{"^":"d;"},
o:{"^":"d;",$isO:1,
$asO:function(){return[P.o]},
$isdg:1},
"+String":0,
bq:{"^":"d;t<",
gk:function(a){return this.t.length},
gG:function(a){return this.t.length===0},
ga3:function(a){return this.t.length!==0},
i:function(a){var z=this.t
return z.charCodeAt(0)==0?z:z},
p:{
f8:function(a,b,c){var z=J.ae(b)
if(!z.v())return a
if(c.length===0){do a+=H.a(z.gE())
while(z.v())}else{a+=H.a(z.gE())
for(;z.v();)a=a+c+H.a(z.gE())}return a},
lQ:function(a){return new P.bq(a)}}}}],["","",,P,{"^":"",eV:{"^":"d;"}}],["","",,P,{"^":"",
oJ:function(a,b){if(typeof a!=="number")throw H.c(P.E(a))
if(typeof b!=="number")throw H.c(P.E(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.h.gbT(b)||isNaN(b))return b
return a}return a},
oI:function(a,b){if(typeof a!=="number")throw H.c(P.E(a))
if(typeof b!=="number")throw H.c(P.E(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.h.gbT(a))return b
return a},
dk:function(a){return C.I},
na:{"^":"d;",
au:function(a){if(a<=0||a>4294967296)throw H.c(P.kf("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fl:function(){return Math.random()}}}],["","",,S,{"^":"",i9:{"^":"d;a,b,$ti",
h:function(a,b){return this.b.h(0,b)},
J:function(a){return this.b.J(a)},
H:function(a,b){return this.b.H(0,b)},
gG:function(a){var z=this.b
return z.gG(z)},
ga3:function(a){var z=this.b
return z.ga3(z)},
gk:function(a){var z=this.b
return z.gk(z)},
l:function(a,b,c){this.hM()
this.b.l(0,b,c)},
i:function(a){return J.j(this.b)},
hM:function(){if(!this.a)return
this.a=!1
this.b=P.bH(this.b,H.h(this,0),H.h(this,1))},
$isB:1}}],["","",,S,{"^":"",cY:{"^":"d;eL:a<,b,$ti",
an:function(a){var z=new S.aq(null,null,this.$ti)
z.aB()
z.C(this)
a.$1(z)
return z.D()},
gq:function(a){var z=this.b
if(z==null){z=X.a1(this.a)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.k(b)
if(!z.$iscY)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gq(b)
w=this.gq(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
i:function(a){return J.j(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gk:function(a){return this.a.length},
gM:function(a){var z=this.a
return new J.bA(z,z.length,0,null,[H.h(z,0)])},
bd:function(a,b){var z=this.a
z.toString
return new H.ag(z,b,[null,null])},
U:function(a,b){var z=this.a
return(z&&C.a).U(z,b)},
H:function(a,b){var z=this.a
return(z&&C.a).H(z,b)},
ak:function(a,b,c){var z=this.a
return(z&&C.a).ak(z,b,c)},
bB:function(a){var z=this.a
z.toString
return P.ac(z,H.h(z,0))},
gG:function(a){return this.a.length===0},
ga3:function(a){return this.a.length!==0},
gac:function(a){var z=this.a
return(z&&C.a).gac(z)},
gI:function(a){var z=this.a
return(z&&C.a).gI(z)},
aB:function(){if(new H.ah(H.X(H.h(this,0)),null).B(0,C.n))throw H.c(new P.T('explicit element type required, for example "new BuiltList<int>"'))}},aq:{"^":"d;eL:a<,b,$ti",
D:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.cY(z,null,this.$ti)
y.aB()
this.a=z
this.b=y
z=y}return z},
C:function(a){if(H.bY(a,"$iscY",this.$ti,null)){this.a=a.geL()
this.b=a}else{this.a=P.a_(a,!0,H.h(this,0))
this.b=null}},
l:function(a,b,c){var z
if(c==null)H.i(P.E("null element"))
z=this.geS()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
u:function(a,b){var z
if(b==null)H.i(P.E("null element"))
z=this.geS();(z&&C.a).u(z,b)},
bd:function(a,b){var z=this.a
z.toString
z=new H.ag(z,b,[null,null]).bf(0,!0)
this.a=z
this.b=null
this.hr(z)},
geS:function(){if(this.b!=null){this.a=P.a_(this.a,!0,H.h(this,0))
this.b=null}return this.a},
aB:function(){if(new H.ah(H.X(H.h(this,0)),null).B(0,C.n))throw H.c(new P.T('explicit element type required, for example "new ListBuilder<int>"'))},
hr:function(a){var z,y,x,w
for(z=a.length,y=H.h(this,0),x=0;x<a.length;a.length===z||(0,H.ad)(a),++x){w=a[x]
if(!H.dO(w,y))throw H.c(P.E("invalid element: "+H.a(w)))}}}}],["","",,A,{"^":"",c9:{"^":"d;hL:a<,b,c,d,$ti",
an:function(a){var z=new A.db(null,null,this.$ti)
z.c6()
z.C(this)
a.$1(z)
return z.D()},
w:function(){return new S.i9(!0,this.a,this.$ti)},
gq:function(a){var z=this.b
if(z==null){z=this.a.gaS()
z=H.aQ(z,new A.hV(this),H.t(z,"x",0),null)
z=P.a_(z,!1,H.t(z,"x",0))
C.a.h3(z)
z=X.a1(z)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.k(b)
if(!z.$isc9)return!1
y=b.a
x=this.a
if(y.gk(y)!==x.gk(x))return!1
z=z.gq(b)
w=this.gq(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gaS()
this.c=z}z=z.gM(z)
for(;z.v();){v=z.gE()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
i:function(a){return J.j(this.a)},
h:function(a,b){return this.a.h(0,b)},
H:function(a,b){this.a.H(0,b)},
gG:function(a){var z=this.a
return z.gG(z)},
ga3:function(a){var z=this.a
return z.ga3(z)},
gk:function(a){var z=this.a
return z.gk(z)},
c6:function(){if(new H.ah(H.X(H.h(this,0)),null).B(0,C.n))throw H.c(new P.T('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.ah(H.X(H.h(this,1)),null).B(0,C.n))throw H.c(new P.T('explicit value type required, for example "new BuiltMap<int, int>"'))}},hV:{"^":"b:0;a",
$1:function(a){var z,y
z=J.n(a)
y=J.n(this.a.a.h(0,a))
return X.bt(X.a9(X.a9(0,J.n(z)),J.n(y)))}},db:{"^":"d;a,b,$ti",
D:function(){var z=this.b
if(z==null){z=new A.c9(this.a,null,null,null,this.$ti)
z.c6()
this.b=z}return z},
C:function(a){var z
if(H.bY(a,"$isc9",this.$ti,null)){this.b=a
this.a=a.ghL()}else if(!!a.$isc9){z=P.bH(a.a,H.h(this,0),H.h(this,1))
this.b=null
this.a=z}else if(!!a.$isB){z=P.bH(a,H.h(this,0),H.h(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.a(a.gb3(a))))},
l:function(a,b,c){if(c==null)H.i(P.E("null value"))
this.ghY().l(0,b,c)},
ghY:function(){if(this.b!=null){this.a=P.bH(this.a,H.h(this,0),H.h(this,1))
this.b=null}return this.a},
c6:function(){if(new H.ah(H.X(H.h(this,0)),null).B(0,C.n))throw H.c(new P.T('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.ah(H.X(H.h(this,1)),null).B(0,C.n))throw H.c(new P.T('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,Y,{"^":"",
m:function(a,b){if(typeof b!=="number")return H.C(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
an:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,M,{"^":"",bC:{"^":"d;$ti",
h:function(a,b){var z
if(!this.dw(b))return
z=this.c.h(0,this.a.$1(H.cP(b,H.t(this,"bC",1))))
return z==null?null:J.cS(z)},
l:function(a,b,c){if(!this.dw(b))return
this.c.l(0,this.a.$1(b),new B.eI(b,c,[null,null]))},
J:function(a){if(!this.dw(a))return!1
return this.c.J(this.a.$1(H.cP(a,H.t(this,"bC",1))))},
H:function(a,b){this.c.H(0,new M.hW(b))},
gG:function(a){var z=this.c
return z.gG(z)},
ga3:function(a){var z=this.c
return z.ga3(z)},
gaS:function(){var z=this.c.gaK()
return H.aQ(z,new M.hX(),H.t(z,"x",0),null)},
gk:function(a){var z=this.c
return z.gk(z)},
gaK:function(){var z=this.c.gaK()
return H.aQ(z,new M.hY(),H.t(z,"x",0),null)},
i:function(a){return P.co(this)},
dw:function(a){var z
if(a==null||H.dO(a,H.t(this,"bC",1)))z=this.b.$1(a)===!0
else z=!1
return z},
$isB:1,
$asB:function(a,b,c){return[b,c]}},hW:{"^":"b:5;a",
$2:function(a,b){var z=J.al(b)
return this.a.$2(z.gac(b),z.gI(b))}},hX:{"^":"b:0;",
$1:function(a){return J.e2(a)}},hY:{"^":"b:0;",
$1:function(a){return J.cS(a)}}}],["","",,B,{"^":"",eI:{"^":"d;ac:a>,I:b>,$ti"}}],["","",,N,{"^":"",kH:{"^":"kF;ch,cx,al:cy@,bi:db@,b,c,d,e,f,r,x,y,z,Q,a",
ft:function(){var z=$.$get$c1()
z.l(0,"game",this.cx)
z.l(0,"hitpoints",this.cy)
z.l(0,"stamina",this.db)},
iX:function(){var z,y,x
this.cx=null
this.cy=Z.cA("Health",new N.kK(),"#CCCCCC","Your physical state",100,0,!0,P.az)
z=Z.cA("Stamina",new N.kL(),"#CCCCCC","Spare physical energy",0,0,!0,P.r)
this.db=z
y=$.$get$bx()
x=this.cy
y=new O.ei(N.aZ("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,null,new Y.at(H.w([],[Y.a5]),0,P.aE()),x,z,O.oU(),O.oT(),O.oS(),y,this.gh1(),new P.bq(""),!1,null)
y.h_()
this.cx=y
y.x="endGame"
$.$get$bX().u(0,0)},
he:function(){var z,y
z=new O.cy([[null,P.a7(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.l(0,"start",z)
z.a="start"
z=new O.cy([new N.kJ(this),[null,P.a7(["goto","gameLoop"])]],0,null,!1,!1)
y.l(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cy(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.l(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
p:{
kI:function(){var z,y,x,w
z=Z.cA("Health",new N.ok(),"#CCCCCC","Your physical state",100,0,!0,P.az)
y=Z.cA("Stamina",new N.ol(),"#CCCCCC","Spare physical energy",0,0,!0,P.r)
x=P.o
w=new H.H(0,null,null,null,null,null,0,[x,O.cy])
x=new N.kH("net.filiph.edgehead.0.0.1",null,z,y,new O.kM(w),null,null,null,P.I(null,null,null,x),!1,null,-9999,null,null,null)
x.he()
return x}}},ok:{"^":"b:14;",
$1:function(a){var z=J.k(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.bG(a,0.5))return"\ud83d\ude23"
if(z.ah(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},ol:{"^":"b:7;",
$1:function(a){return H.a(a)+" S"}},kJ:{"^":"b:15;a",
$0:function(){var z=0,y=new P.ap(),x=1,w,v=this
var $async$$0=P.aj(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.u(v.a.cx.b2(),$async$$0,y)
case 2:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$$0,y)}},kK:{"^":"b:14;",
$1:function(a){var z=J.k(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.bG(a,0.5))return"\ud83d\ude23"
if(z.ah(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},kL:{"^":"b:7;",
$1:function(a){return H.a(a)+" S"}}}],["","",,O,{"^":"",
pN:[function(a){var z,y
z=a.gbr()
y=a.gbn()
if(typeof y!=="number")return H.C(y)
return z-2*y},"$1","fU",2,0,13],
pR:[function(a){var z,y,x
z=a.gbr()
y=a.gbX()
if(typeof y!=="number")return H.C(y)
x=a.gbn()
if(typeof x!=="number")return H.C(x)
return z+y-x},"$1","fV",2,0,13],
ei:{"^":"ju;y,z,Q,ch,cx,cy,db,dx,dy,fr,bg:fx<,fy,en:go<,al:id<,bi:k1<,a,b,c,d,e,f,r,x",
h_:function(){var z,y,x,w,v,u
z=[P.o]
y=H.w([],z)
x=P.I(null,null,null,null)
w=$.$get$dY()
x=new R.bP(null,!0,y,null,null,C.i,1,1,0,null,100,!0,!1,x,null,null,!0,C.j,null,w,null)
new O.iA().$1(x)
this.cy=x.D()
y=new R.bP(null,!0,H.w([],z),null,null,C.i,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iB().$1(y)
this.db=y.D()
y=new K.bL(null,"deadEscapee","UNUSED because this is the first choice","",null,null,"ground")
x=[Q.aV]
v=new S.aq(null,null,x)
v.aB()
v.C([new Q.aV("tunnel","Run towards freedom",null)])
y.a=v.D()
this.dx=y
y=$.$get$dR()
v=y.b
u=new K.bL(null,"tunnel","You and Briana sprint through the giant worm\u2019s tunnel.\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)","",new O.iC(this),null,"{rock|cavern} floor")
x=new S.aq(null,null,x)
x.aB()
x.C([new Q.aV(v,"End book",null)])
u.a=x.D()
this.dy=u
u=new R.bP(null,!0,H.w([],z),null,null,C.i,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iD(this).$1(u)
x=u.D()
this.ch=x
this.id.sap(x.r/x.cx)
this.k1.sap(this.ch.fx)
w=new R.bP(null,!0,H.w([],z),null,null,C.i,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iE(this).$1(w)
this.cx=w.D()
z=F.kr(this.dx)
this.fr=z
x=this.ch
w=this.cx
v=this.dx
u=this.dy
w=P.ac([x,w],R.G)
x=P.aP(null,O.bz)
z=new A.b7(w,P.I(null,null,null,U.d4),x,P.ac([v,u,y],K.bL),P.a_([z],!0,S.aF),0)
this.fx=z
y=new Y.at(H.w([],[Y.a5]),0,P.aE())
y.b=z.f
this.fy=new B.bm(z,null,y,1,1,!0,!1,!1,0)},
bZ:function(){var z=0,y=new P.ap(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$bZ=P.aj(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.go
s=u.giC()
if(t.fp(s)){z=1
break}r=u.fx.a8(u.ch.x)
q=r.gal()
p=r.gfj()
if(typeof q!=="number"){x=q.d0()
z=1
break}u.id.sap(q/p)
u.k1.sap(r.gbi())
p=u.y
p.iV("update() for world at time "+H.a(u.fx.f))
q=u.fx.e
if(q.length===0){u.r=!0
t.aP(0,"\n\n",!0)
if(u.fx.fd(u.ch.x)){o=u.fx.a8(u.ch.x)
t.dM(0,"<subject> look<s> behind",o)
t.dM(0,"<subject> see<s> the giant worm's hideous head approaching",o)
if(u.fx.fd(u.cx.x))t.aP(0,"You both start sprinting again.",!0)
else{t.dM(0,"<subject> take<s> a last look at Briana",o)
t.ib(0,"<subject> start<s> sprinting again, alone",!0,o)}t.aP(0,"\n\n",!0)
t.aP(0,"TO BE CONTINUED.",!0)}else t.aP(0,"You will soon be the giant worm's food.",!0)
u.f.t+=t.cp()
z=1
break}n=C.a.gI(q)
m=n.d2(u.fx)
q=u.fx
l=N.aZ("ActorPlanner")
k=new H.H(0,null,null,null,null,null,0,[null,null])
j=m==null
i=j?m:m.gm()
h=new Y.at(H.w([],[Y.a5]),0,P.aE())
h.b=q.f
g=new G.hu(l,i,new B.bm(q,null,h,1,1,!0,!1,!1,0),0,!1,k)
if(j)H.i(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.j(q)+". Situation: "+H.a(q.git())))
z=3
return P.u(g.jm(),$async$bZ,y)
case 3:if(k.gG(k)){l.ef("There are no actions available for actorId="+H.a(i)+".")
j="Actions not available for "+H.a(i)+" and "
i=J.k(q)
q="PlanConsequence<"+i.gq(q)+", "+i.i(q)+", "+C.q.i(null)
l.bx(j+(q+", 1, 0, >")+".")}f=Z.jW(k)
if(f.b.length===0){p.ej("No recommendation for "+H.a(m.gj()))
u.fx.f5(n.gm())
t=u.fx
s=t.f
if(typeof s!=="number"){x=s.a1()
z=1
break}t.f=s+1
z=1
break}z=m.gK()?4:6
break
case 4:s=f.b
z=s.length===1?7:8
break
case 7:z=9
return P.u(u.bM((s&&C.a).gbs(s),m,t),$async$bZ,y)
case 9:z=1
break
case 8:u.f.t+=t.cp()
C.a.sk(t.a,0)
p.bx("planner.generateTable for "+H.a(m.gj()))
g.eg().H(0,new O.iF(u))
t=f.fs(6,O.fV())
t.toString
e=P.a_(t,!1,H.t(t,"x",0))
t=new O.iG(new O.iI())
s=e.length-1
if(s-0<=32)H.f_(e,0,s,t)
else H.eZ(e,0,s,t)
for(t=e.length,s=u.c,d=0;d<e.length;e.length===t||(0,H.ad)(e),++d){c=e[d]
s.$3$helpMessage$script(c.gj(),c.ga_(),new O.iH(u,m,c))}z=1
break
z=5
break
case 6:q=m.gf3()
z=10
return P.u(u.bM(f.jl(q==null?O.fV():q),m,t),$async$bZ,y)
case 10:case 5:t.fp(s)
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$bZ,y)},
bM:function(a,b,c){var z=0,y=new P.ap(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$bM=P.aj(function(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t=a.cJ(b,u.fy,u.fx)
s=P.a_(t,!0,H.t(t,"x",0))
z=b.gK()?3:5
break
case 3:r=a.P(b,u.fx)
z=r===1?6:8
break
case 6:u.fy=C.a.gbs(s)
z=7
break
case 8:z=r===0?9:11
break
case 9:u.fy=C.a.gbs(s)
z=10
break
case 11:q=C.a.gI(J.j(a.gV()).split("."))
t=a.bp(b,u.fx)
p=a.gW()&&b.iS(a.gV())
o="use "+H.a(q)
u.eO()
z=12
return P.u(u.e.$4$rerollEffectDescription$rerollable(r,t,o,p),$async$bM,y)
case 12:n=e
p=new H.Q(s,new O.ix(n),[H.h(s,0)])
u.fy=p.gbs(p)
if(n.gjI()===!0){m=A.dw(u.fy.gbg())
m.af(b.gm(),new O.iy())
t=u.fy
p=t.geU()
o=H.w([],[Y.a5])
l=new Y.at(o,0,P.aE())
C.a.as(o,t.c.a)
o=t.d
k=t.e
j=t.f
i=t.r
h=t.x
t=t.y
l.b=m.f
u.fy=new B.bm(m,p,l,o,k,j,i,h,t)}case 10:case 7:z=4
break
case 5:g=S.kc(new H.ag(s,new O.iz(),[null,null]),1)
if(g>=s.length){x=H.e(s,g)
z=1
break}u.fy=s[g]
case 4:C.a.as(c.a,u.fy.gen().a)
u.fx=u.fy.gbg()
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$bM,y)}},
iA:{"^":"b:0;",
$1:function(a){var z
a.gn()
a.y=1000
a.gn()
a.cy="orc"
a.gn()
a.dx=!1
a.gn()
a.dy=C.B
z=$.$get$aM()
a.gn()
a.c=new U.cD(!1,10,!0,z,"sword",C.d)
a.gn()
a.f=2
a.gn()
a.r=2
z=$.$get$dQ()
a.gn()
a.fx=z
a.gn()
a.fy=O.fU()
return a}},
iB:{"^":"b:0;",
$1:function(a){var z
a.gn()
a.y=1001
a.gn()
a.cy="goblin"
a.gn()
a.dx=!1
a.gn()
a.dy=C.B
z=$.$get$aM()
a.gn()
a.c=new U.cD(!1,10,!0,z,"scimitar",C.d)
z=$.$get$dQ()
a.gn()
a.fx=z
a.gn()
a.fy=O.fU()
return a}},
iC:{"^":"b:0;a",
$1:function(a){var z=this.a
return[z.cy,z.db]}},
iD:{"^":"b:0;a",
$1:function(a){var z
a.gn()
a.y=1
a.gn()
a.ch=!0
a.gn()
a.dy=C.C
a.gn()
a.cy="Filip"
z=$.$get$aM()
a.gn()
a.c=new U.cD(!1,10,!0,z,"sword",C.d)
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
iE:{"^":"b:0;a",
$1:function(a){var z,y
a.gn()
a.y=100
a.gn()
a.dy=C.a2
a.gn()
a.cy="Briana"
z=$.$get$aM()
a.gn()
a.c=new U.cD(!1,10,!0,z,"longsword",C.d)
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
iF:{"^":"b:0;a",
$1:function(a){return this.a.y.bx(a)}},
iI:{"^":"b:19;",
$1:function(a){if(a instanceof Q.L)return H.a(a.b.gj())+" "+a.gj()
return"ZZZZZZ "+H.a(a.gj())}},
iG:{"^":"b:5;a",
$2:function(a,b){var z=this.a
return J.c3(z.$1(a),z.$1(b))}},
iH:{"^":"b:15;a,b,c",
$0:function(){var z=0,y=new P.ap(),x=1,w,v=this,u
var $async$$0=P.aj(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:u=v.a
z=2
return P.u(u.bM(v.c,v.b,u.go),$async$$0,y)
case 2:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$$0,y)}},
ix:{"^":"b:0;a",
$1:function(a){return a.ge1()===this.a.ge1()}},
iy:{"^":"b:0;",
$1:function(a){var z=a.gbi()
if(typeof z!=="number")return z.aq()
a.sbi(z-1)
return a}},
iz:{"^":"b:0;",
$1:function(a){return a.gjn()}}}],["","",,Q,{"^":"",
fX:function(a,b,c){return new P.aJ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$fX(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=t.length!==0?C.a.gI(t):null
s=J.hm(t.bh(y.a,y),new Q.oy(z))
t=J.ae(s.a),r=new H.dv(t,s.b,[H.h(s,0)])
case 2:if(!r.v()){w=3
break}q=t.gE()
p=x.$1(q)
if(p.ga0()&&!z.dX(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aH()
case 1:return P.aI(u)}}})},
fY:function(a,b,c){return new P.aJ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$fY(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=y.eh((t.length!==0?C.a.gI(t):null).gaZ()).giG().a,t=new J.bA(t,t.length,0,null,[H.h(t,0)])
case 2:if(!t.v()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aH()
case 1:return P.aI(u)}}})},
oy:{"^":"b:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gbc()}},
kn:{"^":"d;a",
i:function(a){return C.X.h(0,this.a)},
p:{"^":"pr<"}},
af:{"^":"d;",
cJ:function(a,b,c){var z=this
return new P.aJ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cJ(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.P(y,x.gbg())
v=s>0?2:3
break
case 2:r=A.dw(w)
v=4
return B.eJ(r,x,z,z.hn(r,y,w,z.gR(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dw(w)
v=7
return B.eJ(r,x,z,z.hm(r,y,w,z.gS(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aH()
case 1:return P.aI(t)}}})},
eu:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
z=a.a.bJ(0,new Q.hp(b))
y=new O.hn(null,null,null,null,null,null,null,null,null,null,C.x,null)
y.e=new H.ah(H.dV(this),null).i(0)
y.d=this.gj()
y.ch=b
y.c=P.ac(!!this.$isL?[this.b]:[],null)
y.f=f
y.r=e
y.x=this.ga0()
y.jf(c)
x=new Y.at(H.w([],[Y.a5]),0,P.aE())
w=a.e
v=(w.length!==0?C.a.gI(w):null).gm()
u=a.gq(a);(w.length!==0?C.a.gI(w):null).fo(a,x)
if(a.gq(a)!==u)throw H.c(new P.N("Please don't change the world in onBeforeAction"))
this.a=d.$3(z,a,x)
if(a.dr(v)!=null)a.f5(v)
t=a.f
if(typeof t!=="number")return t.a1()
a.f=t+1
t=a.fP(v)
if(!(t==null))t.fn(a,x)
while(!0){t=w.length!==0?C.a.gI(w):null
if((t==null?t:t.d2(a))!=null){t=w.length!==0?C.a.gI(w):null
t=!J.f(t==null?t:t.d5(a),!0)}else t=!0
if(!t)break
if((w.length!==0?C.a.gI(w):null)==null)break
C.a.bW(w)}if(this.a==null)H.i(new P.N("No description given when executing "+this.i(0)+". You should return it from your world-modifying function."))
y.b=a
y.z=this.a
y.y=a.f
a.c.eX(y.D())
return x},
hn:function(a,b,c,d,e){return this.eu(a,b,c,d,!1,e)},
hm:function(a,b,c,d,e){return this.eu(a,b,c,d,e,!1)}},
hp:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.gm())}},
L:{"^":"af;bn:b<",
gj:function(){var z=new Y.at(H.w([],[Y.a5]),0,P.aE())
z.i9(0,this.ga6(),this.b)
return z.cp()},
bp:function(a,b){var z=new Y.at(H.w([],[Y.a5]),0,P.aE())
z.ig(0,this.ga7(),this.b,a,!0)
return z.cp()},
i:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.a(z.gm())+"/"+H.a(z.gj())+">"}},
cg:{"^":"af;",
gj:function(){return this.b.gat()},
i:function(a){return"ExitAction<"+H.a(this.b.gat())+">"}}}],["","",,O,{"^":"",
pJ:[function(a){return a.gm()},"$1","fN",2,0,40],
bz:{"^":"d;at:a<,eV:b<,dL:c<,L:d<,cS:e<,f,dc:r<,j9:x<,fK:y<,z,fJ:Q<,ch",
gq:function(a){var z=this.e
return X.a1([this.d,this.a,X.a1(z==null?new P.fz(0,null,null,null,null,null,0,[null]):P.ac([z],null)),X.a1(this.r),X.a1(this.x),this.y,this.z])},
B:function(a,b){var z
if(b==null)return!1
z=J.k(b)
return!!z.$isbz&&this.gq(this)===z.gq(b)},
i:function(a){return"ActionRecord<"+H.a(this.c)+", "+H.a(this.b)+", "+H.a(this.a)+">"}},
hn:{"^":"d;a,b,dc:c<,eV:d<,dL:e<,fK:f<,r,fJ:x<,L:y<,at:z<,Q,cS:ch<",
D:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.Q
switch(z){case C.x:y=this.b.a
break
case C.Q:z=R.G
y=P.ac(H.w([this.ch],[z]),z)
break
default:throw H.c(new P.ai("Mode "+z.i(0)+" not implemented"))}x=R.cV(A.Y)
z=this.b.a
for(w=z.gM(z),z=new H.dv(w,new O.ho(this),[H.h(z,0)]);z.v();){v=w.gE()
u=v.bI(this.b)
t=this.a.h(0,v)
x.l(0,v,new A.Y(u.a-t.gbr(),J.ab(u.b,t.gbX()),J.ab(u.c,t.gbn())))}z=this.y
w=this.d
u=this.e
t=this.z
s=this.ch.gm()
r=this.c
r.toString
r=P.ac(new H.ce(r,O.fN(),[H.h(r,0),null]),null)
q=P.ac(new H.ce(y,O.fN(),[H.h(y,0),null]),null)
p=this.f
o=this.r
n=this.x
return new O.bz(t,w,u,z,s,P.I(null,null,null,P.r),r,q,p,o,n,x)},
jf:function(a){var z,y,x
this.a=R.cV(A.c4)
for(z=a.a,y=new P.av(z,z.r,null,null,[null]),y.c=z.e;y.v();){x=y.d
this.a.l(0,x,x.bI(a))}}},
ho:{"^":"b:0;a",
$1:function(a){return this.a.a.gaS().U(0,a)}},
ey:{"^":"d;a",
i:function(a){return C.a1.h(0,this.a)}}}],["","",,R,{"^":"",
fZ:function(a,b){return new P.aJ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$fZ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bT(new H.Q(u,new R.oz(z),[H.h(u,0)]))
case 3:return P.aH()
case 1:return P.aI(v)}}})},
oz:{"^":"b:0;a",
$1:function(a){var z,y
z=a.gdV()
y=this.a.gm()
return z==null?y==null:z===y}},
G:{"^":"jB;",
gbo:function(){return this.r>0},
gaR:function(){return this.dx===C.k},
ga9:function(){return this.dx===C.o},
ga5:function(){return this.dx===C.i},
iS:function(a){return this.fx>=1},
dX:function(a,b){return this.ff(a,b)>0},
ff:function(a,b){var z,y
if(this.e0(b)){z=a.gbe()
y=this.fy.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 10
if(this.hH(a,b,10))return 1
z=a.gbe()
y=this.fy.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
e0:function(a){var z,y
z=a.cW("Confuse",this,!0)
if(z==null)return!1
y=a.jy("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
bI:function(a){var z,y,x
z=a.a8(this.x)
y=z.gal()
if(typeof y!=="number")return H.C(y)
x=2*y
if(!z.gbo())x-=10
y=a.a
return new A.c4(x,new H.Q(y,new R.hR(this),[H.h(y,0)]).ak(0,0,new R.hS()),y.ak(0,0,new R.hT(this,a)))},
ax:function(a){var z=this.e
return z!=null&&z.a===a},
hH:function(a,b,c){var z=b.jz(a,this,!0)
if(z==null)return!1
return z<=c},
$isbj:1},
jB:{"^":"d+d0;"},
hR:{"^":"b:0;a",
$1:function(a){return J.f(a.gbe(),this.a.fy)}},
hS:{"^":"b:37;",
$2:function(a,b){return J.a2(J.a2(a,b.gbc()?2:0),2*b.gal())}},
hT:{"^":"b:42;a,b",
$2:function(a,b){var z=b.gbc()?1:0
return J.a2(a,(z+b.gal())*this.a.ff(b,this.b))}},
hq:{"^":"d;Y:c<,aw:e?,al:f@,bi:x<,m:y<,K:ch<,j:cy@,aZ:db@,F:dy<,dV:fr<,be:fx<"},
cU:{"^":"bC;a,b,c,$ti",
gq:function(a){var z,y
z=X.a1(this.gaK())
y=X.a1(this.gaS())
return X.bt(X.a9(X.a9(0,C.c.gq(z)),C.c.gq(y)))},
B:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof R.cU){z=X.a1(this.gaK())
y=X.a1(this.gaS())
y=X.bt(X.a9(X.a9(0,C.c.gq(z)),C.c.gq(y)))
z=X.a1(b.gaK())
x=X.a1(b.gaS())
x=y===X.bt(X.a9(X.a9(0,C.c.gq(z)),C.c.gq(x)))
z=x}else z=!1
return z},
$asbC:function(a){return[P.r,R.G,a]},
$asB:function(a){return[R.G,a]},
p:{
cV:function(a){var z=new H.H(0,null,null,null,null,null,0,[P.r,[B.eI,R.G,a]])
return new R.cU(new R.hs(),new R.ht(),z,[a])},
hr:function(a,b){var z=R.cV(b)
a.H(0,new R.om(b,z))
return z}}},
hs:{"^":"b:8;",
$1:function(a){return a.gm()}},
ht:{"^":"b:0;",
$1:function(a){return a!=null}},
om:{"^":"b;a,b",
$2:function(a,b){this.b.l(0,a,b)
return b},
$signature:function(){return H.ax(function(a){return{func:1,args:[R.G,a]}},this,"cU")}},
dh:{"^":"d;a",
i:function(a){return C.A.h(0,this.a)}},
mm:{"^":"G;a,b,f3:c<,aZ:d<,Y:e<,dV:f<,al:r<,m:x<,y,dZ:z<,K:Q<,ch,fj:cx<,j:cy<,cP:db<,dx,F:dy<,fr,bi:fx<,be:fy<",
an:function(a){var z=new R.bP(null,!0,H.w([],[P.o]),null,null,C.i,1,1,0,null,100,!0,!1,P.I(null,null,null,null),null,null,!0,C.j,null,$.$get$dY(),null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.G))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(0,C.p.gq(!0)),H.a4(this.b)),J.n(this.c)),J.n(this.d)),J.n(this.e)),J.n(this.f)),this.r&0x1FFFFFFF),J.n(this.x)),this.y&0x1FFFFFFF),C.p.gq(!0)),C.p.gq(this.Q)),H.a4(this.ch)),this.cx&0x1FFFFFFF),J.n(this.cy)),C.p.gq(this.db)),H.a4(this.dx)),H.a4(this.dy)),C.q.gq(this.fr)),this.fx&0x1FFFFFFF),J.n(this.fy)))},
i:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.aX(this.b,"[","]")+",\ncombineFunction="+J.j(this.c)+",\ncurrentRoomName="+H.a(J.j(this.d))+",\ncurrentWeapon="+J.j(this.e)+",\nfollowingActorId="+J.j(this.f)+",\nhitpoints="+C.h.i(this.r)+",\nid="+J.j(this.x)+",\ninitiative="+C.c.i(this.y)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.Q)+",\nitems="+P.aX(this.ch,"{","}")+",\nmaxHitpoints="+C.c.i(this.cx)+",\nname="+J.j(this.cy)+",\nnameIsProperNoun="+String(this.db)+",\npose="+H.a(C.A.h(0,this.dx.a))+",\npronoun="+this.dy.a+",\nshield="+C.q.i(this.fr)+",\nstamina="+C.h.i(this.fx)+",\nteam="+J.j(this.fy)+",\n}"}},
bP:{"^":"hq;go,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
gf3:function(){this.gn()
return this.fy},
gaZ:function(){this.gn()
return this.db},
saZ:function(a){this.gn()
this.db=a},
gY:function(){this.gn()
return this.c},
gdV:function(){this.gn()
return this.fr},
gal:function(){this.gn()
return this.f},
sal:function(a){this.gn()
this.f=a},
gm:function(){this.gn()
return this.y},
gK:function(){this.gn()
return this.ch},
gfj:function(){this.gn()
return this.r},
gj:function(){this.gn()
return this.cy},
sj:function(a){this.gn()
this.cy=a},
gcP:function(){this.gn()
return this.dx},
saw:function(a){this.gn()
this.e=a},
gF:function(){this.gn()
return this.dy},
gbi:function(){this.gn()
return this.x},
sbi:function(a){this.gn()
this.x=a},
gbe:function(){this.gn()
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
C:function(a){this.go=a},
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
z=new R.mm(!0,y,x,w,v,u,t,s,r,!0,q,p,o,n,m,l,k,j,i,h)
if(s==null)H.i(P.v("id"))
if(n==null)H.i(P.v("name"))
if(h==null)H.i(P.v("team"))}this.C(z)
return z}}}],["","",,A,{"^":"",c4:{"^":"d;br:a<,bX:b<,bn:c<",
aq:function(a,b){return new A.Y(this.a-b.gbr(),J.ab(this.b,b.gbX()),J.ab(this.c,b.gbn()))},
i:function(a){return"ActorScore<self="+C.h.cs(this.a,2)+",team="+J.bh(this.b,2)+",enemy="+J.bh(this.c,2)+">"}},Y:{"^":"d;br:a<,bX:b<,bn:c<",
gj6:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
a1:function(a,b){return new A.Y(this.a+b.gbr(),J.a2(this.b,b.gbX()),J.a2(this.c,b.gbn()))},
bH:function(a,b){return new A.Y(this.a*b,J.bg(this.b,b),J.bg(this.c,b))},
d0:function(a,b){if(typeof b!=="number")return H.C(b)
return new A.Y(this.a/b,J.bf(this.b,b),J.bf(this.c,b))},
i:function(a){return"ActorScoreChange<self="+C.h.cs(this.a,2)+",team="+J.bh(this.b,2)+",enemy="+J.bh(this.c,2)+">"},
p:{
hQ:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ad)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.C(r)
w+=r
r=s.c
if(typeof r!=="number")return H.C(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.Y(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
p8:function(a){switch(a){case C.K:return"spear"
case C.L:return"branch"
case C.M:return"tent"
case C.d:return"sword"
default:throw H.c(P.E(a))}},
d4:{"^":"jC;ee:a<",
gat:function(){return U.p8(this.a)},
$isbj:1},
jC:{"^":"d+d0;"},
ci:{"^":"d;a",
i:function(a){return C.Z.h(0,this.a)}},
cD:{"^":"d4;b,c,dZ:d<,be:e<,j:f<,a",
gm:function(){return H.a4(this)},
gbo:function(){return!1},
gK:function(){return!1},
gcP:function(){return!1},
gF:function(){return C.j}}}],["","",,G,{"^":"",ju:{"^":"d;",
eO:function(){var z,y
z=this.f
y=z.t
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.t=""}},
jV:[function(a){this.f.t+=a},"$1","giC",2,0,16],
b2:function(){var z=0,y=new P.ap(),x,w=2,v,u=this,t,s
var $async$b2=P.aj(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.x==null)throw H.c(new P.N("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.r){u.d.sk(0,0)
u.a.$1(u.x)
z=1
break}t=u.d
s=u.f
case 3:if(!!0){z=4
break}if(!(!u.r&&t.gk(t)===0&&s.t.length===0)){z=4
break}z=5
return P.u(u.bZ(),$async$b2,y)
case 5:z=3
break
case 4:u.eO()
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$b2,y)}}}],["","",,B,{"^":"",ec:{"^":"d;cA:a<,cN:b<,cm:c<",
i:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.h.cs(this.b,3)+", score="+this.a.i(0)+">"}},bm:{"^":"d;bg:a<,eU:b<,en:c<,jn:d<,cN:e<,f,r,e1:x<,cm:y<",
gq:function(a){return X.a1([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
B:function(a,b){var z
if(b==null)return!1
z=J.k(b)
return!!z.$isbm&&this.gq(this)===z.gq(b)},
i:function(a){var z,y
z=this.a
y=J.k(z)
z="PlanConsequence<"+y.gq(z)+", "+y.i(z)+", "+J.j(this.b)+", "+H.a(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
p:{
eJ:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gcN()
z=z?0:b.gcm()+1
d.b=a.f
return new B.bm(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",hu:{"^":"d;a,b,c,d,e,f",
iq:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.Z("...")
z.Z("combining scores")
y=H.w([],[A.Y])
x=new G.hO()
for(w=J.ae(a),v=b.a,u=b.b,t=b.c,s=null;w.v();){r=w.gE()
z.Z(new G.hM(r))
if(r.gcN()>0.15)if(s==null){z.Z("    - first _bestCase")
s=r}else if(J.a3(x.$1(r.gcA()),x.$1(s.gcA()))){z.Z("    - new _bestCase")
s=r}q=r.gcA()
p=J.ab(q.b,u)
o=J.ab(q.c,t)
n=r.b
m=new A.Y((q.a-v)*n,J.bg(p,n),J.bg(o,n))
z.Z(new G.hN(m))
y.push(m)}l=A.hQ(y)
x=s==null
if(x)k=C.E
else{w=s.gcA()
k=new A.Y(w.a-v,J.ab(w.b,u),J.ab(w.c,t))}x=x?s:s.gcm()
if(typeof x!=="number")return H.C(x)
x=new A.Y(k.a/x,J.bf(k.b,x),J.bf(k.c,x))
z.Z("- uplifts average = "+("ActorScoreChange<self="+C.h.cs(l.a,2)+",team="+J.bh(l.b,2)+",enemy="+J.bh(l.c,2)+">"))
z.Z("- best = "+x.i(0))
j=x.a1(0,l)
z.Z("- result = "+j.i(0))
return j},
eg:function(){var z=this
return new P.aJ(function(){var y=0,x=1,w,v,u,t,s
return function $async$eg(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gaS(),u=u.gM(u),t=1
case 2:if(!u.v()){y=3
break}s=u.gE()
y=4
return""+t+") "+H.a(s.gj())+"\t"+H.a(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aH()
case 1:return P.aI(w)}}})},
cQ:function(a,b,c){var z=0,y=new P.ap(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j
var $async$cQ=P.aj(function(d,e){if(d===1){w=e
z=x}while(true)switch(z){case 0:u=v.f
u.aH(0)
t=v.c
s=t.a
r=s.a.bJ(0,new G.hP(v))
q=r.bI(s)
p=v.a
o=r.cy
p.bx("Planning for "+H.a(o)+", initialScore="+q.i(0))
n=new P.aS(v.ds(r,s).a(),null,null,null)
case 2:if(!n.v()){z=3
break}m=n.c
l=m==null?n.b:m.gE()
p.aQ("Evaluating action '"+H.a(l.gj())+"' for "+H.a(o))
if(!l.O(r,s)){p.aQ("- action '"+H.a(l.gj())+"' isn't applicable")
z=2
break}z=4
return P.u(v.c3(t,l,b,a,c).bY(0),$async$cQ,y)
case 4:k=e
m=J.F(k)
if(m.gG(k)===!0){p.aQ("- action '"+H.a(l.gj())+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity.")
u.l(0,l,C.F)
z=2
break}p.aQ("- action '"+H.a(l.gj())+"' leads to "+H.a(m.gk(k))+" different ConsequenceStats, initialScore="+q.i(0))
j=v.iq(k,q,b)
u.l(0,l,j)
p.aQ("- action '"+H.a(l.gj())+"' was scored "+H.a(j))
z=2
break
case 3:v.e=!0
return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$cQ,y)},
jm:function(){return this.cQ(50,10,null)},
ds:function(a,b){return new P.aJ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p
return function $async$ds(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.bT((u.length!==0?C.a.gI(u):null).gbN())
case 2:u=(u.length!==0?C.a.gI(u):null).gb7()
t=u.length
s=H.ak(H.aw(Q.cg),[H.aw(Q.aV)])
r=H.ak(H.aw(Q.L),[H.aw(R.G)])
q=0
case 3:if(!(q<u.length)){x=5
break}p=u[q]
x=r.aN(p)?6:8
break
case 6:x=9
return P.bT(Q.fX(z,y,p))
case 9:x=7
break
case 8:x=s.aN(p)?10:12
break
case 10:x=13
return P.bT(Q.fY(z,y,p))
case 13:x=11
break
case 12:throw H.c(new P.N(p.i(0)+" is not one of the supported ones"))
case 11:case 7:case 4:u.length===t||(0,H.ad)(u),++q
x=3
break
case 5:return P.aH()
case 1:return P.aI(v)}}})},
c3:function(a3,a4,a5,a6,a7){var $async$c3=P.aj(function(a8,a9){switch(a8){case 2:u=x
z=u.pop()
break
case 1:v=a9
z=w}while(true)switch(z){case 0:s={}
r=a3.a
q=r.a.bJ(0,new G.hx(t))
p=t.a
p.aQ("=====")
p.aQ(new G.hy(a4,q))
p.aQ(new G.hz(a4))
if(!a4.O(q,r)){p.aQ("- firstAction not applicable")
z=1
break}o=q.bI(r)
p.aQ(new G.hE(a3,o))
p.aQ(new G.hF(a3))
n=P.aP(null,B.bm)
m=P.I(null,null,null,A.b7)
l=J.k(r)
k=l.gq(r)
for(j=new P.aS(a4.cJ(q,a3,r).a(),null,null,null);j.v();){i=j.c
h=i==null?j.b:i.gE()
if(l.gq(r)!==k)throw H.c(new P.N("Action "+a4.i(0)+" modified world state when producing "+H.a(h)+"."))
n.ag(h)}s.a=0
r=t.b
case 3:if(!!n.gG(n)){z=4
break}++s.a
g=n.cT()
p.Z("----")
p.Z(new G.hG(g))
p.Z(new G.hH(g))
if(g.gcm()>a5||s.a>a6){p.Z(new G.hI(s,a5,g))
p.Z(new G.hJ(g))
z=4
break}z=g.gbg().e.length===0?5:6
break
case 5:p.Z("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.ba(0,new G.hK(t),new G.hL())
if(q==null){p.Z("- this actor ("+H.a(r)+") has been removed")
z=3
break}f=new B.ec(q.bI(l),g.e,g.y)
p.Z(new G.hA(f))
z=7
x=[1]
return P.cJ(P.fx(f),$async$c3,y)
case 7:z=3
break
case 6:l=g.a
j=l.e
e=(j.length!==0?C.a.gI(j):null).d2(l)
q=l.a.bJ(0,new G.hB(t))
d=J.f(e,q)
p.Z("- actor: "+H.a(e.gj())+" (isMain=="+d+")")
p.Z("- mainActor: "+H.a(q.gj()))
f=new B.ec(q.bI(l),g.e,g.y)
p.Z(new G.hC(o,f))
p.Z(new G.hD(g))
z=8
x=[1]
return P.cJ(P.fx(f),$async$c3,y)
case 8:p.Z("- generating all actions for "+H.a(e.gj()))
j=n.c
i=n.b
c=n.a
for(b=new P.aS(t.ds(e,l).a(),null,null,null);b.v();){a=b.c
a0=a==null?b.b:a.gE()
if(!a0.O(e,l))continue
for(a=new P.aS(a0.cJ(e,g,l).a(),null,null,null);a.v();){a1=a.c
a2=a1==null?a.b:a1.gE();++t.d
if(a2.gcN()<0.05)continue
if(m.U(0,a2.gbg()))continue
n.ag(a2)}}p.Z("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&c.length-1)>>>0))+" new PlanConsequences")
m.u(0,l)
z=3
break
case 4:case 1:return P.cJ(null,0,y)
case 2:return P.cJ(v,1,y)}})
var z=0,y=P.mF($async$c3),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
return P.o1(y)}},hO:{"^":"b:21;",
$1:function(a){return J.ab(a.b,a.c)}},hM:{"^":"b:1;a",
$0:function(){return"  - consequence: "+H.a(this.a)}},hN:{"^":"b:1;a",
$0:function(){return"    - uplift = "+this.a.i(0)}},hP:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hx:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hy:{"^":"b:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+H.a(this.a.gj())+"' of "+H.a(this.b.gj())}},hz:{"^":"b:1;a",
$0:function(){return"- firstAction == "+this.a.i(0)}},hE:{"^":"b:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.i(0)+", cumProb="+H.a(z.e)+" (prob="+H.a(z.d)+", ord="+z.y+")"}},hF:{"^":"b:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bH(" ",z.y)+"- "+J.j(z.b)}},hG:{"^":"b:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+H.a(this.a.geU().gj())+"'"}},hH:{"^":"b:1;a",
$0:function(){var z=this.a.gbg().e
return"- situation: "+H.a(J.hf(z.length!==0?C.a.gI(z):null))}},hI:{"^":"b:1;a,b,c",
$0:function(){return"- order ("+this.c.gcm()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},hJ:{"^":"b:1;a",
$0:function(){var z=this.a.gbg().c
return"- how we got here: "+new H.ag(z,new G.hw(),[H.h(z,0),null]).cl(0," <- ")}},hw:{"^":"b:0;",
$1:function(a){return a.gat()}},hK:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hL:{"^":"b:1;",
$0:function(){return}},hA:{"^":"b:1;a",
$0:function(){return"- "+this.a.i(0)}},hB:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hC:{"^":"b:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.i(0)+" (initial="+this.a.i(0)+")"}},hD:{"^":"b:1;a",
$0:function(){var z=this.a.gbg().c
return"- how we got here: "+new H.ag(z,new G.hv(),[H.h(z,0),null]).cl(0," <- ")}},hv:{"^":"b:0;",
$1:function(a){return a.gat()}}}],["","",,Z,{"^":"",jV:{"^":"d;a,b",
gbN:function(){return this.b},
gG:function(a){return this.b.length===0},
fs:function(a,b){var z=this
return new P.aJ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fs(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bT(t)
case 5:w=1
break
case 4:s=z.hB(new Z.jY())
r=z.dq(new Z.jZ(),[s])
q=z.dq(new Z.k_(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bn().bx("best self preserving: "+H.a(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bn().bx("best enemy damaging: "+H.a(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bn().bx("best team preserving: "+H.a(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}t=z.b;(t&&C.a).cC(t,new Z.k0(z,x))
t=z.b,o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.k(m)
if(l.B(m,s)){w=17
break}if(l.B(m,r)){w=17
break}if(l.B(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ad)(t),++n
w=16
break
case 18:case 1:return P.aH()
case 2:return P.aI(u)}}})},
dq:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ad)(z),++u){t=z[u]
if(C.a.U(b,t))continue
if(w==null||J.a3(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hB:function(a){return this.dq(a,C.l)},
jl:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=this.b
if(y.length===1)return(y&&C.a).gbs(y);(y&&C.a).cC(y,new Z.k1(this,a))
y=this.a.a
x=y.gaK().ak(0,1/0,new Z.k2(a))
w=y.gaK().ak(0,-1/0,new Z.k3(a))
y=J.aa(w)
v=J.aa(x)
u=v.aq(x,J.bg(y.aq(w,x),0.1))
z.a=u
if(v.B(x,w)){u=J.ab(u,1)
z.a=u
v=u}else v=u
t=y.aq(w,v)
s=P.js(this.b.length,new Z.k4(z,this,a,t),!1,P.K)
r=new H.ag(s,new Z.k5(C.a.ak(s,0,Z.h6())),[null,null]).bf(0,!1)
z=C.a.ak(r,0,Z.h6())
if(typeof z!=="number")return H.C(z)
v=r.length
y=v-1
if(y<0)return H.e(r,y)
z=J.a2(r[y],1000-z)
if(y>=r.length)return H.e(r,y)
r[y]=z
q=S.kd(r,1000)
z=this.b
if(q>=z.length)return H.e(z,q)
return z[q]},
hb:function(a){var z,y
if(a.gG(a))$.$get$bn().ef("Created with no recommendations.")
z=a.gaS()
y=H.t(z,"x",0)
y=P.a_(new H.Q(z,new Z.jX(a),[y]),!1,y)
this.b=y
if(y.length===0)$.$get$bn().ef("After removing actions scored by undefined, there are no recommendations.")},
p:{
jW:function(a){var z=new Z.jV(new P.fr(a,[null,null]),null)
z.hb(a)
return z},
pp:[function(a,b){return J.a2(a,b)},"$2","h6",4,0,41]}},jX:{"^":"b:0;a",
$1:function(a){return!this.a.h(0,a).gj6()}},jY:{"^":"b:0;",
$1:function(a){return a.gbr()}},jZ:{"^":"b:0;",
$1:function(a){return J.hc(a.gbn())}},k_:{"^":"b:0;",
$1:function(a){return a.gbX()}},k0:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c3(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},k1:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c3(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},k2:{"^":"b:5;a",
$2:function(a,b){return P.oJ(a,this.a.$1(b))}},k3:{"^":"b:5;a",
$2:function(a,b){return P.oI(a,this.a.$1(b))}},k4:{"^":"b:7;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.bf(J.ab(this.c.$1(z.a.a.h(0,y[a])),this.a.a),this.d)}},k5:{"^":"b:0;a",
$1:function(a){return J.hj(J.bg(J.bf(a,this.a),1000))}}}],["","",,K,{"^":"",bL:{"^":"d;a,j:b<,at:c<,d,ji:e<,f,bF:r<",
giG:function(){return this.a},
gq:function(a){return C.b.gq(this.b)},
B:function(a,b){if(b==null)return!1
return b instanceof K.bL&&b.b===this.b},
p:{
kq:function(a,b,c,d,e,f,g){var z,y
z=new K.bL(null,a,b,c,d,e,g)
y=new S.aq(null,null,[Q.aV])
y.aB()
y.C(f)
z.a=y.D()
return z}}}}],["","",,Q,{"^":"",aV:{"^":"d;f4:a<,at:b<,c"}}],["","",,S,{"^":"",aF:{"^":"d;",
gb7:function(){return C.l},
gbN:function(){return C.l},
d2:function(a){return this.b6(this.gL(),a)},
fn:function(a,b){},
fo:function(a,b){},
d5:function(a){return!0}}}],["","",,S,{"^":"",
eN:function(a){var z=$.$get$b2().au(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
kc:function(a,b){var z,y,x,w,v
z=$.$get$b2().fl()*b
for(y=new H.cm(a,a.gk(a),0,null,[H.t(a,"ar",0)]),x=0,w=0;y.v();){v=y.d
if(typeof v!=="number")return H.C(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
kd:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b2().au(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ad)(a),++v){t=a[v]
if(typeof t!=="number")return H.C(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
cs:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bb(a,"{")
if(z!==-1&&z<a.length-1){y=H.w([],[P.r])
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
if(q>1){p=$.$get$b2().au(q)
o=C.b.aA(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cs(C.b.aA(a,m+1,y[l]))
if(typeof x!=="number")return x.a1()
l+=C.b.aA(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cs(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a1()
v=u+1
return C.b.aA(a,0,v)+S.cs(C.b.bj(a,v))}}else return a},
bo:function(a,b,c,d){switch($.$get$b2().au(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
ke:function(a){if(a<0||a>1)throw H.c(P.V(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b2().fl()<a}}],["","",,Y,{"^":"",a5:{"^":"d;az:a<,ar:b<,am:c<,fq:d<,e,cK:f@,fu:r<,fk:x<,eo:y<,iF:z<,h4:Q<,cv:ch<,cx,j5:cy<,L:db<",
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
default:throw H.c(P.E("Invalid key "+H.a(b)+"."))}}},at:{"^":"d;a,L:b<,c",
gdW:function(){return C.a.bR(this.a,new Y.lo())},
aO:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.be(b).dT(b,".")||C.b.dT(b,"!")||C.b.dT(b,"?"))&&C.b.d8(b,P.b3("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a5(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
u:function(a,b){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
aP:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
dM:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c,!1,null,!1)},
ib:function(a,b,c,d){return this.aO(a,b,null,!1,c,!1,!1,null,null,null,!1,!1,d,!1,null,!1)},
i9:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
N:function(a,b,c,d,e,f,g,h,i,j){return this.aO(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
ie:function(a,b,c,d,e){return this.aO(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ic:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
eW:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
ia:function(a,b,c,d){return this.aO(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
ig:function(a,b,c,d,e){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
bQ:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bb(a,"<owner's> "+b)!==-1||C.b.bb(a,"<ownerPronoun's> "+b)!==-1||C.b.bb(a,"<object-owner's> "+b)!==-1||C.b.bb(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(!c.gcP()){z=this.c
y=z.h(0,c.gm())
if(y==null)y=-1
if(typeof y!=="number")return y.ah()
if(typeof e!=="number")return H.C(e)
if(y<e)x=C.b.cU(a,b,"the "+b)
else{x=J.cT(c.gj(),P.b3("[aeiouy]",!1,!1))?C.b.cU(a,b,"an "+b):C.b.cU(a,b,"a "+b)
z.l(0,c.gm(),e)}}else x=null
return x==null?a:x},
dU:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gar()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gar()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gam()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gam()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gar().gm()
if(b<0||b>=z.length)return H.e(z,b)
if(J.f(y,z[b].gam().gm())){if(a>=z.length)return H.e(z,a)
y=z[a].gam().gm()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gar().gm())}else z=!1
return z},
d1:function(a){var z=this
return new P.aJ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$d1(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.ao(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gar()!=null?3:4
break
case 3:x=5
return t.gar()
case 5:case 4:x=t.gam()!=null?6:7
break
case 6:x=8
return t.gam()
case 8:case 7:x=t.gfq()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aH()
case 2:return P.aI(v)}}})},
av:[function(a){var z=J.aa(a)
if(z.ah(a,0)||z.bE(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gam()}},"$1","gam",2,0,17],
jj:function(a,b){var z
if(!this.ao(a)||!this.ao(b))return!1
if(this.dU(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geo()}return!1},
fp:function(a){var z
for(z=!1;this.gdW();z=!0){a.$1(this.fw(!0))
this.jq()}return z},
fw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.ak(z,[],new Y.lp())
C.a.hW(z,new Y.lq(y),!1)
x=a&&this.gdW()?C.a.bb(z,C.a.f8(z,new Y.lr()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dU(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gcK())n=this.jj(s,p)&&this.h2(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcK()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scK(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].gh4()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].giF()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcv())if(this.cI(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcK()}else n=!1
n=n||this.jA(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcv()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcv()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.eN([" but "," but ",", but "])
u=!this.fQ(s,s+1)&&!0}else{r+=S.eN([" and "," and ",", and "])
u=!0}}m=this.da(s)
p=!v
if(p){n=s-1
if(this.cI(s,n))if(J.cT(this.da(n),"<subject> "))if(J.cT(m,"<subject> "))m=H.by(m,"<subject> ","",0)}l=J.hi(m,"<action>",this.da(s))
if(this.hZ(s,s-1))n=!(this.av(s).gF()===C.j&&this.a4(s).gF()===C.j)
else n=!1
if(n){n=this.av(s).gF()
l=H.p(l,"<object-owner's> <object>",n.b)
n=this.av(s).gF()
l=H.p(l,"<object-ownerPronoun's> <object>",n.b)
n=this.av(s).gF()
l=H.p(l,"<object>",n.b)
n=this.av(s).gF()
l=H.p(l,"<object's>",n.c)}if(this.cI(s,s-1)){n=this.a4(s).gF()
l=H.p(l,"<owner's> <subject>",n.a)
n=this.a4(s).gF()
l=H.p(l,"<ownerPronoun's> <subject>",n.a)
n=this.a4(s).gF()
l=H.p(l,"<subject>",n.a)
n=this.a4(s).gF()
l=H.p(l,"<subject's>",n.c)}n=s-1
if(this.av(n)!=null)if(this.a4(s)!=null)if(this.a4(n)!=null){k=this.av(n)
k=k==null?k:k.gm()
j=this.a4(s)
if(J.f(k,j==null?j:j.gm())){k=this.a4(n)
k=k==null?k:k.gF()
j=this.a4(s)
k=!J.f(k,j==null?j:j.gF())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.a4(s).gF()
l=H.p(l,"<owner's> <subject>",k.a)
k=this.a4(s).gF()
l=H.p(l,"<ownerPronoun's> <subject>",k.a)
k=this.a4(s).gF()
l=H.p(l,"<subject>",k.a)
k=this.a4(s).gF()
l=H.p(l,"<subject's>",k.c)}if(this.a4(n)!=null)if(this.av(s)!=null){k=this.a4(n)
k=k==null?k:k.gm()
j=this.av(s)
if(J.f(k,j==null?j:j.gm())){n=this.a4(n)
n=n==null?n:n.gF()
k=this.a4(s)
n=!J.f(n,k==null?k:k.gF())}else n=!1}else n=!1
else n=!1
if(n){n=this.av(s).gF()
l=H.p(l,"<object-owner's> <object>",n.a)
n=this.av(s).gF()
l=H.p(l,"<object-ownerPronoun's> <object>",n.a)
n=this.av(s).gF()
l=H.p(l,"<object>",n.b)
n=this.av(s).gF()
l=H.p(l,"<object's>",n.c)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gar()
h=n.gam()
g=n.gfq()
f=n.e
e=S.cs(l)
if(C.b.U(e,"{")||C.b.U(e,"}"))$.$get$h4().ej('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gK()){e=H.p(e,"<subject>","you")
e=H.p(e,"<subject's>","your")}if(i.gF()===C.C||i.gF()===C.a3){e=H.p(e,"<s>","")
e=H.p(e,"<es>","")
e=H.p(e,"<ies>","y")
e=H.p(e,"<does>","do")
e=H.p(e,"<is>","are")
e=H.p(e,"<has>","have")}else{e=H.p(e,"<s>","s")
e=H.p(e,"<es>","es")
e=H.p(e,"<ies>","ies")
e=H.p(e,"<does>","does")
e=H.p(e,"<is>","is")
e=H.p(e,"<has>","has")}e=H.by(e,"<subject>","<subjectNoun>",0)
k=i.gF()
e=H.p(e,"<subject>",k.a)
k=n.db
e=this.bQ(e,"<subjectNoun>",i,g,k)
j=i.gj()
if(typeof j!=="string")H.i(H.R(j))
e=H.by(e,"<subjectNoun>",j,0)
j=i.gF()
e=H.p(e,"<subjectPronoun>",j.a)
if(C.b.U(l,P.b3("<subject>.+<subject's>",!0,!1))){j=i.gF()
e=H.p(e,"<subject's>",j.c)}e=this.bQ(e,"<subject's>",i,g,k)
k=H.a(i.gj())+"'s"
e=H.by(e,"<subject's>",k,0)
k=i.gF()
e=H.p(e,"<subject's>",k.c)
k=i.gF()
e=H.p(e,"<subjectPronoun's>",k.c)}if(h!=null){if(h.gK()){e=H.p(e,"<object>","you")
e=H.p(e,"<object's>","your")}else{e=this.bQ(e,"<object>",h,f,n.db)
k=h.gj()
if(typeof k!=="string")H.i(H.R(k))
e=H.p(e,"<object>",k)}k=h.gF()
e=H.p(e,"<objectPronoun>",k.b)
if(C.b.U(l,P.b3("<object>.+<object's>",!0,!1))){k=h.gF()
e=H.p(e,"<object's>",k.c)}e=this.bQ(e,"<object's>",h,f,n.db)
k=H.a(h.gj())+"'s"
e=H.by(e,"<object's>",k,0)
k=h.gF()
e=H.p(e,"<object's>",k.c)
k=h.gF()
e=H.p(e,"<objectPronoun's>",k.c)}n=n.db
l=this.eP(f,this.eP(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.ln(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcv())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcv()?r+".":r
return H.p3(z.charCodeAt(0)==0?z:z,$.$get$f5(),new Y.ls(),null)},
cp:function(){return this.fw(!1)},
jq:function(){var z,y
if(!this.gdW()){C.a.sk(this.a,0)
return}z=this.a
y=C.a.bb(z,C.a.f8(z,new Y.lt()))+1
P.ct(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fQ:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
if(this.dU(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geo()}if(!this.cI(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfu()){if(b>=z.length)return H.e(z,b)
y=z[b].gfu()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfk()){if(b>=z.length)return H.e(z,b)
z=z[b].gfk()}else z=!1
if(z)return!0
else return!1},
h2:function(a,b){var z,y,x,w,v
if(!this.ao(a)||!this.ao(b))return!1
for(z=new P.aS(this.d1(a).a(),null,null,null);z.v();){y=z.c
x=y==null?z.b:y.gE()
for(y=new P.aS(this.d1(b).a(),null,null,null);y.v();){w=y.c
v=w==null?y.b:w.gE()
if(J.f(x.gm(),v.gm()))return!0}}return!1},
da:[function(a){var z=J.aa(a)
if(z.ah(a,0)||z.bE(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaz()}},"$1","gaz",2,0,6],
a4:[function(a){var z=J.aa(a)
if(z.ah(a,0)||z.bE(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gar()}},"$1","gar",2,0,17],
jA:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gL()!=null){y=a-1
if(this.ao(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gL()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gL()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gL()
if(typeof y!=="number")return y.aq()
if(typeof x!=="number")return H.C(x)
return y-x}},
i:function(a){return this.cp()},
ao:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eP:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gK())z=H.p(H.p(b,d,"you"),e,"your")
else{z=this.bQ(b,d,a,null,h)
y=a.gj()
H.bd(y)
z=H.p(z,d,y)}z=H.p(z,f,a.gF().a)
z=H.p(H.p(C.b.cU(this.bQ(C.b.U(c,P.b3(d+".+"+e,!0,!1))?H.p(z,e,a.gF().c):z,e,a,null,h),e,H.a(a.gj())+"'s"),e,a.gF().c),g,a.gF().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
hZ:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gam()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gam()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gam().gm()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gam().gm())},
cI:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gar()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gar()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gar().gm()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gar().gm())},
p:{
ln:function(a){var z,y,x
z=!C.b.U(a,"\n\n")?C.b.jE(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bj(z,1)}}},lo:{"^":"b:0;",
$1:function(a){return J.f(a.gaz(),"\n\n")}},lp:{"^":"b:23;",
$2:function(a,b){var z,y
z=J.F(a)
y=z.ga3(a)?z.gI(a):null
if(y!=null)y.gj5()
z.u(a,b)
return a}},lq:{"^":"b:24;a",
$1:function(a){return J.e0(this.a,a)}},lr:{"^":"b:0;",
$1:function(a){return J.f(a.gaz(),"\n\n")}},ls:{"^":"b:25;",
$1:function(a){return H.a(a.h(0,1))+H.a(a.h(0,2))+H.a(a.h(0,3))}},lt:{"^":"b:0;",
$1:function(a){return J.f(a.gaz(),"\n\n")}},bj:{"^":"jD;cP:a<,j:b<,c,be:d<,K:e<,F:f<",
gm:function(){return H.a4(this)},
gdZ:function(){return!0},
gbo:function(){return!0},
p:{
d_:function(a,b,c,d,e){var z=H.w([],[P.o])
return new Y.bj(c,b,z,e==null?$.$get$aM():e,!1,d)}}},jD:{"^":"d+d0;"},d0:{"^":"d;",
gbc:function(){if(this.gbo()){this.gdZ()
var z=!0}else z=!1
return z},
aJ:function(a,b,c,d,e,f,g,h,i){a.N(0,b,c,d,e,f,g,h,H.h1(this,"$isbj"),!1)},
ae:function(a,b){return this.aJ(a,b,!1,!1,!1,null,null,!1,!1)},
b1:function(a,b,c,d){return this.aJ(a,b,!1,!1,!1,c,null,d,!1)},
aT:function(a,b,c){return this.aJ(a,b,!1,!1,!1,c,null,!1,!1)},
cq:function(a,b,c){return this.aJ(a,b,!1,!1,!1,null,null,c,!1)},
cV:function(a,b,c,d){return this.aJ(a,b,c,!1,!1,d,null,!1,!1)},
e7:function(a,b,c,d){return this.aJ(a,b,!1,c,d,null,null,!1,!1)},
bz:function(a,b,c){return this.aJ(a,b,!1,!1,c,null,null,!1,!1)},
e7:function(a,b,c,d){return this.aJ(a,b,!1,c,d,null,null,!1,!1)},
fz:function(a,b,c,d){return this.aJ(a,b,!1,!1,c,d,null,!1,!1)},
jv:function(a,b,c,d){return this.aJ(a,b,c,!1,!1,null,null,d,!1)},
ju:function(a,b,c){return this.aJ(a,b,c,!1,!1,null,null,!1,!1)},
fA:function(a,b,c,d){return this.aJ(a,b,!1,!1,!1,c,d,!1,!1)}},bI:{"^":"d;a,b,c,d",
i:function(a){return this.a}}}],["","",,L,{"^":"",ob:{"^":"b:0;",
$1:function(a){a.gcd().b=2
return 2}},oa:{"^":"b:0;",
$1:function(a){a.gcd().b=0
return 0}},oi:{"^":"b:0;",
$1:function(a){a.gcd().b=1
return 1}},fa:{"^":"d;"},mv:{"^":"fa;m:a<",
an:function(a){var z=new L.fb(null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.fa))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gq:function(a){return Y.an(Y.m(0,J.n(this.a)))},
i:function(a){return"Team {id="+J.j(this.a)+",\n}"},
p:{
dx:function(a){var z=new L.fb(null,null)
a.$1(z)
return z.D()}}},fb:{"^":"d;a,b",
gm:function(){return this.gcd().b},
gcd:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y
z=this.a
if(z==null){y=this.gcd().b
z=new L.mv(y)
if(y==null)H.i(P.v("id"))}this.C(z)
return z}}}],["","",,X,{"^":"",
fO:function(a,b){return new P.aJ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$fO(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bA(u,u.length,0,null,[H.h(u,0)])
u=y.a
s=new J.bA(u,u.length,0,null,[H.h(u,0)])
case 2:r=t.v()
q=s.v()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aH()
case 1:return P.aI(v)}}})}}],["","",,A,{"^":"",b7:{"^":"d;a,b,c,d,e,L:f<",
git:function(){var z=this.e
return z.length!==0?C.a.gI(z):null},
gq:function(a){var z,y,x,w
z=X.a1(this.a)
y=X.a1(this.c)
x=X.a1(this.e)
w=this.f
return X.bt(X.a9(X.a9(X.a9(X.a9(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),J.n(w)))},
B:function(a,b){var z
if(b==null)return!1
z=J.k(b)
return!!z.$isb7&&this.gq(this)===z.gq(b)},
f5:function(a){var z,y,x
z=this.dr(a)
if(z==null)throw H.c(new P.N("Tried to elapseSituationTime of situation id="+H.a(a)+" that doesn't exist in situations ("+H.a(this.e)+")."))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].b9()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
b9:function(){var z=this.f
if(typeof z!=="number")return z.a1()
this.f=z+1},
fO:function(a,b,c,d,e){var z=this.c
if(a!=null)z=z.ep(0,new A.md(a))
if(b!=null)z=z.bD(0,new A.me(b))
if(c!=null)z=z.bD(0,new A.mf(c))
if(e!=null)z=z.bD(0,new A.mg(e))
return d!=null?z.bD(0,new A.mh(d)):z},
ec:function(a,b,c,d,e){var z,y,x,w
z=this.fO(a,b,c,d,e)
y=z.gM(z)
if(y.v()){x=y.gE()
y=this.f
w=x.gL()
if(typeof y!=="number")return y.aq()
if(typeof w!=="number")return H.C(w)
return y-w}return},
jz:function(a,b,c){return this.ec(null,a,b,c,null)},
cW:function(a,b,c){return this.ec(a,null,b,null,c)},
jy:function(a,b,c){return this.ec(a,b,null,null,c)},
a8:function(a){return this.a.bJ(0,new A.mi(a))},
eh:function(a){return this.d.bJ(0,new A.mj(a))},
fP:function(a){var z,y
z=this.dr(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
cw:function(a){var z,y
for(z=this.e,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gj(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
fd:function(a){var z=this.a.ba(0,new A.mk(a),new A.ml())
if(z==null)return!1
return z.gbo()},
co:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(C.a.gI(z).gj(),a)))break
C.a.bW(z)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
i:function(a){var z,y
z=this.a
y=z.dB()
y.as(0,z)
return"World<"+P.aX(y,"{","}")+">"},
af:function(a,b){var z,y,x
z=this.a8(a)
y=z.an(b)
x=this.a
x.aI(0,z)
x.u(0,y)},
dr:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gm(),a)){z=x
break}++x}return z},
hh:function(a){var z
this.a.as(0,a.a)
z=a.c
this.c.as(0,new H.ag(z,new A.mc(),[H.h(z,0),null]))
this.b.as(0,a.b)
this.d.as(0,a.d)
C.a.as(this.e,a.e)
this.f=a.f},
p:{
dw:function(a){var z,y
z=P.I(null,null,null,R.G)
y=P.aP(null,O.bz)
y=new A.b7(z,P.I(null,null,null,U.d4),y,P.I(null,null,null,null),[],null)
y.hh(a)
return y}}},mc:{"^":"b:0;",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.gL()
y=a.geV()
x=a.gdL()
w=a.gat()
v=a.gcS()
u=P.r
t=P.ac(a.gdc(),u)
s=P.ac(a.gj9(),u)
r=a.y
q=a.z
p=a.Q
o=R.hr(a.ch,A.Y)
return new O.bz(w,y,x,z,v,P.I(null,null,null,u),t,s,r,q,p,o)}},md:{"^":"b:0;a",
$1:function(a){return J.e0(a.gdL(),this.a)}},me:{"^":"b:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gm())}},mf:{"^":"b:0;a",
$1:function(a){return a.gdc().U(0,this.a.x)}},mg:{"^":"b:0;a",
$1:function(a){return a.gfK()===this.a}},mh:{"^":"b:0;a",
$1:function(a){return a.gfJ()===this.a}},mi:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},mj:{"^":"b:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},mk:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},ml:{"^":"b:1;",
$0:function(){return}}}],["","",,N,{"^":"",i6:{"^":"L;a0:c<,a_:d<,W:e<,V:f<,b,a",
ga6:function(){return"confuse <object>"},
ga7:function(){return"will <subject> confuse <object>?"},
X:[function(a,b,c){var z
a.ae(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.N(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.N(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.a(a.gj())+" fails to confuse "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z
a.ae(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.N(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.bz(c,"<subject's> eyes go wide with terror",!0)
return H.a(a.gj())+" confuses "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 0.6},
O:function(a,b){return a.gK()&&a.ga5()&&!this.b.e0(b)},
p:{
pb:[function(a){return new N.i6(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","op",2,0,4]}}}],["","",,F,{"^":"",jU:{"^":"af;a_:b<,a0:c<,W:d<,V:e<,a",
gj:function(){return"Stand off."},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){if(a.gK())a.ae(c,"<subject> stand<s> off")
return H.a(a.gj())+" passes the opportunity"},"$3","gR",6,0,2],
bp:function(a,b){return"WARNING this shouldn't be user-visible"},
P:function(a,b){return 1},
O:function(a,b){return!0}}}],["","",,Y,{"^":"",k7:{"^":"L;W:c<,V:d<,a0:e<,a_:f<,b,a",
ga6:function(){return"pound <object>"},
ga7:function(){return"will <subject> force <object> off balance?"},
X:[function(a,b,c){var z=this.b
a.fA(c,"<subject> {fiercely|violently} {pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} on <object-owner's> {<object>|weapon}",z.gY(),z)
z.cq(c,"<subject> {stand<s> ground|deflect<s> each blow}",!0)
return H.a(a.gj())+" kicks "+H.a(z.cy)+" off balance"},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
a.fA(c,"<subject> {fiercely|violently} {pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} on <object-owner's> {<object>|weapon}",z.gY(),z)
if(z.ga5()){z.fz(c,"<subject> lose<s> <object>",!0,$.$get$dN())
b.af(z.x,new Y.k8())
C.a.u(b.e,U.jE(z,a))
return H.a(a.gj())+" pounds "+H.a(z.cy)+" off balance"}else if(z.gaR()){z.ae(c,"<subject> <is> already off balance")
c.eW(0,"<subject> make<s> <object> fall to "+H.a(b.cw("FightSituation").gbF()),z,$.$get$h7())
b.af(z.x,new Y.k9())
return H.a(a.gj())+" pounds "+H.a(z.cy)+" to the ground"}throw H.c(new P.N("enemy pose must be either standing or off-balance"))},"$3","gR",6,0,2],
P:function(a,b){var z=a.ga5()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
O:function(a,b){var z
if(!a.ga9()){z=a.e
z=z!=null&&z.a===C.d&&!this.b.ga9()}else z=!1
return z},
p:{
pq:[function(a){return new Y.k7(!0,C.e,!0,"Pounding on someone means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose ground or balance.",a,null)},"$1","oN",2,0,4]}},k8:{"^":"b:0;",
$1:function(a){a.saw(C.k)
return a}},k9:{"^":"b:0;",
$1:function(a){a.saw(C.o)
return a}}}],["","",,B,{"^":"",kl:{"^":"af;a_:b<,a0:c<,W:d<,V:e<,a",
gj:function(){return"Regain balance."},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){if(a.gK())a.b1(c,"<subject> regain<s> <object>",$.$get$dN(),!0)
b.af(a.gm(),new B.km())
return H.a(a.gj())+" regains balance"},"$3","gR",6,0,2],
bp:function(a,b){return"Will "+a.gF().a+" regain balance?"},
P:function(a,b){return 1},
O:function(a,b){return a.gaR()}},km:{"^":"b:0;",
$1:function(a){a.saw(C.i)
return C.i}}}],["","",,O,{"^":"",kE:{"^":"af;a_:b<,a0:c<,W:d<,V:e<,a",
gj:function(){return"Scramble."},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.a(a.gj())+" scrambles on ground"},"$3","gR",6,0,2],
bp:function(a,b){return"Will "+a.gF().a+" crawl out of harm's way?"},
P:function(a,b){return 1},
O:function(a,b){var z
if(!a.ga9())return!1
z=b.cW("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
return!1}}}],["","",,Q,{"^":"",lb:{"^":"af;a_:b<,a0:c<,W:d<,V:e<,a",
gj:function(){return"Stand up."},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){a.ae(c,"<subject> stand<s> up")
b.af(a.gm(),new Q.lc())
return H.a(a.gj())+" stands up"},"$3","gR",6,0,2],
bp:function(a,b){return"Will "+a.gF().a+" stand up?"},
P:function(a,b){return 1},
O:function(a,b){var z
if(!a.ga9())return!1
z=b.cW("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!1
return!0}},lc:{"^":"b:0;",
$1:function(a){a.saw(C.i)
return C.i}}}],["","",,G,{"^":"",f2:{"^":"L;a_:c<,a0:d<,V:e<,b,a",
ga6:function(){return"swing at <object>"},
gW:function(){return!1},
ga7:function(){return},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.r))
return H.a(a.cy)+" starts a slash at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 1},
O:function(a,b){return!a.gK()&&a.ga5()&&!this.b.ga9()&&a.ax(C.d)},
p:{
pw:[function(a){return new G.f2("The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","oX",2,0,4]}}}],["","",,R,{"^":"",f3:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"swing at <object> (while out of balance)"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
X:[function(a,b,c){var z=this.b
a.fz(c,"<subject> completely miss<es> <object> with <subject's> "+a.gY().f,!0,z)
return H.a(a.cy)+" fails to start an out-of-balance slash at "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.r))
return H.a(a.cy)+" starts an out-of-balance slash at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 0.7},
O:function(a,b){return!a.gK()&&a.gaR()&&!this.b.ga9()&&a.ax(C.d)},
p:{
pu:[function(a){return new R.f3("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","oY",2,0,4]}}}],["","",,T,{"^":"",ld:{"^":"f3;c,d,e,f,b,a",
T:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.m))
return H.a(a.cy)+" starts an out-of-balance slash at "+H.a(z.gj())},"$3","gR",6,0,2],
O:function(a,b){return a.gK()&&a.gaR()&&!this.b.ga9()&&a.ax(C.d)},
p:{
pt:[function(a){return new T.ld("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","oZ",2,0,4]}}}],["","",,A,{"^":"",le:{"^":"f2;W:f<,c,d,e,b,a",
ga7:function(){return"will <subject> hit <objectPronoun>?"},
X:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.t))
return H.a(a.cy)+" starts a failed slash at "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.m))
return H.a(a.cy)+" starts a successful slash at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 0.7},
O:function(a,b){return a.gK()&&a.ga5()&&!this.b.ga9()&&a.ax(C.d)},
p:{
pv:[function(a){return new A.le(!0,"The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","p_",2,0,4]}}}],["","",,D,{"^":"",f4:{"^":"L;a_:c<,a0:d<,b,a",
gW:function(){return!1},
gV:function(){return},
ga6:function(){return"strike down at <object>"},
ga7:function(){return},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> strike<s> down {with <subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,D.ds(a,z))
C.a.u(y,V.de(a,z,C.r))
return H.a(a.cy)+" strikes down at "+H.a(z.gj())+" on the ground"},"$3","gR",6,0,2],
P:function(a,b){return 1},
O:function(a,b){return!a.gK()&&this.b.ga9()&&!a.ga9()&&a.ax(C.d)},
p:{
py:[function(a){return new D.f4("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","p0",2,0,4]}}}],["","",,Q,{"^":"",lf:{"^":"f4;c,d,b,a",
ga6:function(){return"strike down at <object>"},
gW:function(){return!0},
gV:function(){return C.e},
ga7:function(){return"will <subject> hit?"},
X:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> strike<s> down {with <subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,D.ds(a,z))
C.a.u(y,V.de(a,z,C.t))
return H.a(a.cy)+" makes an unsuccessful strike at "+H.a(z.gj())+" on the ground"},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> strike<s> down {with <subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.u(y,D.ds(a,z))
C.a.u(y,V.de(a,z,C.m))
return H.a(a.cy)+" makes a successful strike at "+H.a(z.gj())+" on the ground"},"$3","gR",6,0,2],
P:function(a,b){return 0.7},
O:function(a,b){return a.gK()&&this.b.ga9()&&!a.ga9()&&a.ax(C.d)},
p:{
px:[function(a){return new Q.lf("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","p1",2,0,4]}}}],["","",,B,{"^":"",lS:{"^":"L;W:c<,V:d<,a0:e<,a_:f<,b,a",
ga6:function(){return"sweep <object> off <objectPronoun's> feet"},
ga7:function(){return"will <subject> knock <object> down?"},
X:[function(a,b,c){S.bo(new B.lT(this,a,c),new B.lU(this,a,c),null,null)
return H.a(a.gj())+" fails to sweep "+H.a(this.b.gj())+" off feet"},"$3","gS",6,0,2],
T:[function(a,b,c){var z
S.bo(new B.lV(this,a,c),new B.lW(this,a,c,b.cw("FightSituation").gbF()),null,null)
z=this.b
b.af(z.gm(),new B.lX())
return H.a(a.gj())+" sweeps "+H.a(z.gj())+" off feet"},"$3","gR",6,0,2],
P:function(a,b){var z=a.ga5()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
O:function(a,b){return(a.ga5()||a.dx===C.k)&&!this.b.ga9()},
p:{
pA:[function(a){return new B.lS(!0,C.e,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","p5",2,0,4]}},lT:{"^":"b:1;a,b,c",
$0:function(){var z=this.c
this.b.aT(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.ia(0,"they don't connect",!0,!0)}},lU:{"^":"b:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aT(z,"<subject> kick<s> <object's> shin",y)
y.ju(z,"<subject> <does>n't budge",!0)}},lV:{"^":"b:1;a,b,c",
$0:function(){this.b.b1(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},lW:{"^":"b:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b1(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.ae(z,"<subject> {grunt|shriek}<s>")
y.bz(z,"<subject> fall<s> to the "+H.a(this.d),!0)}},lX:{"^":"b:0;",
$1:function(a){a.saw(C.o)
return a}}}],["","",,M,{"^":"",ma:{"^":"af;a_:b<,W:c<,V:d<,a0:e<,a",
gj:function(){return"Regain clarity."},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){a.ae(c,"<subject> shake<s> <subject's> head violently")
if(a.gK())c.u(0,"the {horrible|terrible} spell seems to recede")
c.N(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.a(a.gj())+" regains clarity"},"$3","gR",6,0,2],
bp:function(a,b){return"WARNING this shouldn't be user-visible"},
P:function(a,b){return 1},
O:function(a,b){var z
if(a.e0(b)){z=b.cW("Confuse",a,!0)
if(typeof z!=="number")return z.bq()
z=z>4}else z=!1
return z}}}],["","",,G,{"^":"",eg:{"^":"L;a_:c<,a0:d<,b,a",
gW:function(){return!1},
gV:function(){return},
ga6:function(){return"swing back at <object>"},
ga7:function(){return"will <subject> keep <subject's> balance?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to swing back")
a.toString
c.N(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.ga5()){b.af(a.x,new G.ig())
c.N(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.k){b.af(a.x,new G.ih())
c.N(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.N(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.a(a.cy)+" fails to swing back at "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.b1(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.r))
return H.a(a.gj())+" swings back at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return this.b.ga5()?0.7:0.9},
O:function(a,b){return!a.gK()&&a.ax(C.d)&&!a.ga9()},
p:{
pd:[function(a){return new G.eg("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","os",2,0,4]}},ig:{"^":"b:0;",
$1:function(a){a.saw(C.k)
return a}},ih:{"^":"b:0;",
$1:function(a){a.saw(C.o)
return a}}}],["","",,D,{"^":"",ic:{"^":"eg;c,d,b,a",
gW:function(){return!0},
gV:function(){return C.e},
ga6:function(){return"swing back at <object>"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to swing back")
a.toString
c.N(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.ga5()){b.af(a.x,new D.id())
c.N(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.k){b.af(a.x,new D.ie())
c.N(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.N(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.a(a.cy)+" fails to swing back at "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.b1(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.u(y,M.b5(a,z))
C.a.u(y,L.b4(a,z,C.m))
return H.a(a.gj())+" swings successfully back at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return this.b.ga5()?0.7:0.9},
O:function(a,b){return a.gK()&&a.ax(C.d)&&!a.ga9()},
p:{
pc:[function(a){return new D.ic("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","ot",2,0,4]}},id:{"^":"b:0;",
$1:function(a){a.saw(C.k)
return a}},ie:{"^":"b:0;",
$1:function(a){a.saw(C.o)
return a}}}],["","",,S,{"^":"",
ef:function(a,b){var z=new S.cZ(null,null,null,null,null)
new S.oc(a,b).$1(z)
return z.D()},
ee:{"^":"aF;",
gb7:function(){return[G.os(),D.ot()]},
gbN:function(){return[$.$get$df()]},
gj:function(){return"CounterAttackSituation"},
b9:function(){var z=new S.cZ(null,null,null,null,null)
z.C(this)
new S.ia().$1(z)
return z.D()},
b6:function(a,b){if(a===0)return b.a8(this.a)
return},
bh:function(a,b){return new H.Q(a,new S.ib(this),[H.h(a,0)])}},
oc:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gaC().c=z
a.gaC().e=0
z=this.a.gm()
a.gaC().b=z
z=this.b.gm()
a.gaC().d=z
return a}},
ia:{"^":"b:0;",
$1:function(a){var z=a.gaC().e
if(typeof z!=="number")return z.a1()
a.gaC().e=z+1
return a}},
ib:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
mn:{"^":"ee;a,m:b<,c,L:d<",
an:function(a){var z=new S.cZ(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.ee))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)))},
i:function(a){return"CounterAttackSituation {counterAttacker="+J.j(this.a)+",\nid="+J.j(this.b)+",\ntarget="+H.a(J.j(this.c))+",\ntime="+J.j(this.d)+",\n}"}},
cZ:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaC().c},
gL:function(){return this.gaC().e},
gaC:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaC().b
x=this.gaC().c
w=this.gaC().d
v=this.gaC().e
z=new S.mn(y,x,w,v)
if(y==null)H.i(P.v("counterAttacker"))
if(x==null)H.i(P.v("id"))
if(w==null)H.i(P.v("target"))
if(v==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,X,{"^":"",
h8:function(a,b,c){switch($.$get$fG().au(3)){case 0:b.e7(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bz(a,"<subject> fall<s> backward",!0)
b.toString
a.N(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b,!1)
a.N(0,"<subject> hit<s> the "+H.a(c)+" face down",!1,!0,!0,null,null,!1,b,!1)
break
case 2:b.bz(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
a.N(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b,!1)
break}a.aP(0,"\n\n",!0)}}],["","",,U,{"^":"",
iM:function(a,b,c){var z=new U.d2(null,null,null,null,null,null,null)
new U.on(a,b,c).$1(z)
return z.D()},
el:{"^":"aF;",
gb7:function(){return[N.op(),Y.oN(),B.p5(),G.oX(),A.p_(),D.p0(),Q.p1(),R.oY(),T.oZ()]},
gbN:function(){return H.w([$.$get$eP(),$.$get$f1(),$.$get$eU(),$.$get$fq()],[Q.af])},
gj:function(){return"FightSituation"},
b9:function(){var z=new U.d2(null,null,null,null,null,null,null)
z.C(this)
new U.iN().$1(z)
return z.D()},
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.fO(this.e,this.a)
y=H.aQ(z,new U.iO(b),H.t(z,"x",0),null)
x=H.t(y,"x",0)
w=P.a_(new H.Q(y,new U.iP(),[x]),!1,x)
x=H.h(w,0)
v=P.a_(new H.Q(w,new U.iQ(),[x]),!1,x)
u=v.length===1?C.a.gbs(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ad)(w),++r){q=w[r]
p=b.c.ba(0,new U.iR(q),new U.iS())
o=p==null?p:p.gL()
if(o==null)o=-1
x=b.f
if(typeof x!=="number")return x.aq()
if(typeof o!=="number")return H.C(o)
n=x-o
if(q.gK())n=C.h.e9(n*1.5)
if(n>t){s=q
t=n}}return s},
bh:function(a,b){return new H.Q(a,new U.iT(this),[H.h(a,0)])},
fo:function(a,b){var z,y
if(S.ke(0.25))b.aP(0,"\n\n",!0)
z=this.f
y=this.b.a
if(y.J(z))y.h(0,z).$2(a,b)},
d5:function(a){var z,y
z=new U.iU(a)
y=this.e
if(z.$1(y)===!0)if(z.$1(this.a)===!0){z=y.a
z=(z&&C.a).bR(z,new U.iW(a))}else z=!1
else z=!1
return z}},
on:{"^":"b:0;a,b,c",
$1:function(a){var z,y
z=$.$get$aK().au(1073741823)
a.gaa().e=z
a.gaa().r=0
z=a.gaa()
y=z.f
if(y==null){y=new S.aq(null,null,[P.r])
y.aB()
y.C(C.l)
z.f=y
z=y}else z=y
y=this.a
z.C(new H.cn(y,new U.nQ(),[H.h(y,0),null]))
y=a.gaa()
z=y.b
if(z==null){z=new S.aq(null,null,[P.r])
z.aB()
z.C(C.l)
y.b=z}z.C(J.e3(this.b,new U.nR()))
a.gaa().d=this.c
return a}},
nQ:{"^":"b:0;",
$1:function(a){return a.gm()}},
nR:{"^":"b:0;",
$1:function(a){return a.gm()}},
iN:{"^":"b:0;",
$1:function(a){var z=a.gaa().r
if(typeof z!=="number")return z.a1()
a.gaa().r=z+1
return a}},
iO:{"^":"b:0;a",
$1:function(a){return this.a.a8(a)}},
iP:{"^":"b:0;",
$1:function(a){return a.gbc()}},
iQ:{"^":"b:0;",
$1:function(a){return a.gK()}},
iR:{"^":"b:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gm())}},
iS:{"^":"b:1;",
$0:function(){return}},
iT:{"^":"b:8;a",
$1:function(a){var z,y,x
if(a.gbc()){z=this.a
y=a.gm()
x=z.e.a
if(!(x&&C.a).U(x,y)){y=a.gm()
z=z.a.a
y=(z&&C.a).U(z,y)
z=y}else z=!0}else z=!1
return z}},
iU:{"^":"b:27;a",
$1:function(a){var z=a.a
return(z&&C.a).bR(z,new U.iV(this.a))}},
iV:{"^":"b:0;a",
$1:function(a){return this.a.a8(a).gbc()}},
iW:{"^":"b:28;a",
$1:function(a){var z=this.a.a8(a)
return z.gK()&&z.gbc()}},
mo:{"^":"el;a,b,bF:c<,m:d<,e,L:f<",
an:function(a){var z=new U.d2(null,null,null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.el))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)),J.n(this.e)),J.n(this.f)))},
i:function(a){return"FightSituation {enemyTeamIds="+J.j(this.a)+",\nevents="+J.j(this.b)+",\ngroundMaterial="+J.j(this.c)+",\nid="+J.j(this.d)+",\nplayerTeamIds="+J.j(this.e)+",\ntime="+J.j(this.f)+",\n}"}},
d2:{"^":"d;a,b,c,d,e,f,r",
gbF:function(){return this.gaa().d},
gm:function(){return this.gaa().e},
gL:function(){return this.gaa().r},
gaa:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.aq(null,null,[H.h(z,0)])
y.aB()
y.C(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.db(null,null,[H.h(z,0),H.h(z,1)])
y.c6()
y.C(z)
z=y}this.c=z
z=this.a
this.d=z.c
this.e=z.d
z=z.e
if(!(z==null)){y=new S.aq(null,null,[H.h(z,0)])
y.aB()
y.C(z)
z=y}this.f=z
this.r=this.a.f
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v,u,t
z=this.a
if(z==null){y=this.gaa()
x=y.b
if(x==null){x=new S.aq(null,null,[P.r])
x.aB()
x.C(C.l)
y.b=x
y=x}else y=x
y=y==null?y:y.D()
x=this.gaa()
w=x.c
if(w==null){w=new A.db(null,null,[P.r,{func:1,v:true,args:[A.b7,Y.at]}])
w.c6()
w.C(C.Y)
x.c=w
x=w}else x=w
x=x==null?x:x.D()
w=this.gaa().d
v=this.gaa().e
u=this.gaa()
t=u.f
if(t==null){t=new S.aq(null,null,[P.r])
t.aB()
t.C(C.l)
u.f=t
u=t}else u=t
u=u==null?u:u.D()
t=this.gaa().r
z=new U.mo(y,x,w,v,u,t)
if(y==null)H.i(P.v("enemyTeamIds"))
if(x==null)H.i(P.v("events"))
if(w==null)H.i(P.v("groundMaterial"))
if(v==null)H.i(P.v("id"))
if(u==null)H.i(P.v("playerTeamIds"))
if(t==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,A,{"^":"",jI:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"stab <object>"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
X:[function(a,b,c){var z=this.b
a.aT(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.N(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.a(a.gj())+" fails to stab "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
b.af(z.gm(),new A.jJ())
if(b.a8(z.gm()).gbo()){a.b1(c,"<subject> thrust<s> {|<subject's> "+a.gY().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bz(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b1(c,"<subject> {stab<s>|run<s> <subject's> "+a.gY().f+" through} <object>",z,!0)
X.h8(c,z,b.cw("FightSituation").gbF())}return H.a(a.gj())+" stabs "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){if(a.gK())return 0.6
return 0.5},
O:function(a,b){var z
if(a.ga5())if(this.b.gaR()){z=a.e
z=z!=null&&z.a===C.d}else z=!1
else z=!1
return z},
p:{
pl:[function(a){return new A.jI("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.e,a,null)},"$1","oK",2,0,4]}},jJ:{"^":"b:0;",
$1:function(a){var z=a.gal()
if(typeof z!=="number")return z.aq()
a.sal(z-1)
return a}}}],["","",,U,{"^":"",
jE:function(a,b){var z=new U.dc(null,null,null,null,null)
new U.og(a,b).$1(z)
return z.D()},
eG:{"^":"aF;",
gb7:function(){return H.w([A.oK()],[{func:1,ret:Q.L,args:[R.G]}])},
gbN:function(){return[$.$get$df()]},
gj:function(){return"OffBalanceOpportunitySituation"},
b9:function(){var z=new U.dc(null,null,null,null,null)
z.C(this)
new U.jF().$1(z)
return z.D()},
b6:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bq()
if(a>0)return
z=b.a8(this.a)
y=b.a
x=H.h(y,0)
w=P.a_(new H.Q(y,new U.jG(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gac(w)
if(v.ga5())if(z.gaR()){y=v.e
y=y!=null&&y.a===C.d}else y=!1
else y=!1
if(y)return v
return},
bh:function(a,b){return new H.Q(a,new U.jH(b,b.a8(this.a)),[H.h(a,0)])}},
og:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gaD().d=z
a.gaD().e=0
z=this.a.gm()
a.gaD().b=z
z=this.b
z=z==null?z:z.gm()
a.gaD().c=z
return a}},
jF:{"^":"b:0;",
$1:function(a){var z=a.gaD().e
if(typeof z!=="number")return z.a1()
a.gaD().e=z+1
return a}},
jG:{"^":"b:8;a,b,c",
$1:function(a){var z,y
if(a.gbc())if(a.dX(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
jH:{"^":"b:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.dX(z,this.a)}},
mp:{"^":"eG;a,b,m:c<,L:d<",
an:function(a){var z=new U.dc(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.eG))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)))},
i:function(a){return"OffBalanceOpportunitySituation {actorId="+H.a(J.j(this.a))+",\nculpritId="+J.j(this.b)+",\nid="+J.j(this.c)+",\ntime="+J.j(this.d)+",\n}"}},
dc:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaD().d},
gL:function(){return this.gaD().e},
gaD:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaD().b
x=this.gaD().c
w=this.gaD().d
v=this.gaD().e
z=new U.mp(y,x,w,v)
if(y==null)H.i(P.v("actorId"))
if(w==null)H.i(P.v("id"))
if(v==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,O,{"^":"",iX:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"kill <object> (WARNING should not be user-visible)"},
ga7:function(){return"(WARNING should not be user-visible)"},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y,x
z=this.b
b.af(z.gm(),new O.j_())
y=b.a8(z.gm()).gbo()
if(y){a.b1(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.bz(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b1(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.h8(c,z,b.cw("FightSituation").gbF())}x=H.a(a.gj())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 1},
O:function(a,b){return a.ax(C.d)},
p:{
pi:[function(a){return new O.iX(null,!0,!0,C.e,a,null)},"$1","ow",2,0,4]}},j_:{"^":"b:0;",
$1:function(a){var z=a.gal()
if(typeof z!=="number")return z.aq()
a.sal(z-1)
return a}}}],["","",,X,{"^":"",im:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"step back and parry"},
ga7:function(){return"will <subject> parry it?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gY().f+"|fend it off}")
if(a.gaR())c.N(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bo(new X.io(a,c),new X.ip(this,a,c),null,null)
C.a.bW(b.e)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){if(a.gK())a.ae(c,"<subject> {step<s>|take<s> a step} back")
a.cq(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.gY().f+"|fend<s> it off}",!0)
if(!a.ga5()){b.af(a.x,new X.iq())
if(a.Q)c.N(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.co("FightSituation")
return H.a(a.cy)+" steps back and parries "+H.a(this.b.gj())},"$3","gR",6,0,2],
P:function(a,b){var z,y
if(a.gK())return 1
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbO())return 0
if(y.gbP())return 1
return 0.5-(a.ga5()?0:0.2)},
O:function(a,b){return a.ax(C.d)},
p:{
pe:[function(a){return new X.im("Stepping back is the safest way to get out of harm's way.",!1,!0,C.e,a,null)},"$1","ou",2,0,4]}},io:{"^":"b:1;a,b",
$0:function(){this.b.N(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},ip:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},iq:{"^":"b:0;",
$1:function(a){a.saw(C.i)
return a}}}],["","",,F,{"^":"",ir:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"dodge and counter"},
ga7:function(){return"will <subject> dodge?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaR())c.N(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bo(new F.is(a,c),new F.it(this,a,c),null,null)
C.a.bW(b.e)
return H.a(a.cy)+" fails to dodge "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
a.b1(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga5()){z.e7(c,"<subject> lose<s> balance because of that",!0,!0)
b.af(z.x,new F.iu())}b.co("FightSituation")
if(a.gK())c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.e,S.ef(a,z))
return H.a(a.gj())+" dodges "+H.a(z.cy)},"$3","gR",6,0,2],
P:function(a,b){var z,y,x
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbO())return 0
if(y.gbP())return 1
x=a.ga5()?0:0.2
if(a.Q)return 0.7-x
return 0.4-x},
O:function(a,b){return!a.ga9()},
p:{
pf:[function(a){return new F.ir("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.e,a,null)},"$1","ov",2,0,4]}},is:{"^":"b:1;a,b",
$0:function(){this.b.N(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},it:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},iu:{"^":"b:0;",
$1:function(a){a.saw(C.k)
return C.k}}}],["","",,G,{"^":"",jR:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"parry and counter"},
ga7:function(){return"will <subject> parry?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gY().f+"|fend it off}")
if(a.gaR())c.N(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bo(new G.jS(a,c),new G.jT(this,a,c),null,null)
C.a.bW(b.e)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
if(z.gaR()){c.ie(0,"<subject> <is> out of balance",!0,!0,z)
c.ic(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ha())
a.cq(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+a.gY().f+"|fend<s> it off easily}",!0)}else a.cq(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.gY().f+"|fend<s> it off}",!0)
b.co("FightSituation")
if(a.gK())c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.e,S.ef(a,z))
return H.a(a.gj())+" parries "+H.a(z.cy)},"$3","gR",6,0,2],
P:function(a,b){var z,y,x,w
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbO())return 0
if(y.gbP())return 1
x=a.ga5()?0:0.2
w=this.b.gaR()?0.3:0
if(a.Q)return 0.6-x+w
return 0.3-x+w},
O:function(a,b){return a.ax(C.d)},
p:{
pn:[function(a){return new G.jR("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.e,a,null)},"$1","oM",2,0,4]}},jS:{"^":"b:1;a,b",
$0:function(){this.b.N(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},jT:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
b4:function(a,b,c){var z=new L.dp(null,null,null,null,null,null)
new L.oo(a,b,c).$1(z)
return z.D()},
eX:{"^":"aF;",
gb7:function(){return[F.ov(),G.oM(),X.ou()]},
gbO:function(){return this.c===C.m},
gbP:function(){return this.c===C.t},
gj:function(){return"SlashDefenseSituation"},
b9:function(){var z=new L.dp(null,null,null,null,null,null)
z.C(this)
new L.l7().$1(z)
return z.D()},
b6:function(a,b){if(a===0)return b.a8(this.d)
return},
bh:function(a,b){return new H.Q(a,new L.l8(this),[H.h(a,0)])}},
oo:{"^":"b:0;a,b,c",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gaj().c=z
a.gaj().f=0
z=this.a.gm()
a.gaj().b=z
z=this.b.gm()
a.gaj().e=z
a.gaj().d=this.c
return a}},
l7:{"^":"b:0;",
$1:function(a){var z=a.gaj().f
if(typeof z!=="number")return z.a1()
a.gaj().f=z+1
return a}},
l8:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
ms:{"^":"eX;a,m:b<,c,d,L:e<",
an:function(a){var z=new L.dp(null,null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.eX))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)),J.n(this.e)))},
i:function(a){return"SlashDefenseSituation {attacker="+J.j(this.a)+",\nid="+J.j(this.b)+",\npredeterminedResult="+H.a(J.j(this.c))+",\ntarget="+H.a(J.j(this.d))+",\ntime="+J.j(this.e)+",\n}"}},
dp:{"^":"d;a,b,c,d,e,f",
gm:function(){return this.gaj().c},
gL:function(){return this.gaj().f},
gaj:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaj().b
x=this.gaj().c
w=this.gaj().d
v=this.gaj().e
u=this.gaj().f
z=new L.ms(y,x,w,v,u)
if(y==null)H.i(P.v("attacker"))
if(x==null)H.i(P.v("id"))
if(w==null)H.i(P.v("predeterminedResult"))
if(v==null)H.i(P.v("target"))
if(u==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,M,{"^":"",
b5:function(a,b){var z=new M.dq(null,null,null,null,null)
new M.od(a,b).$1(z)
return z.D()},
eY:{"^":"aF;",
gb7:function(){return[O.ow()]},
gj:function(){return"SlashSituation"},
b9:function(){var z=new M.dq(null,null,null,null,null)
z.C(this)
new M.l9().$1(z)
return z.D()},
b6:function(a,b){if(a===0)return b.a8(this.a)
return},
bh:function(a,b){return new H.Q(a,new M.la(this),[H.h(a,0)])}},
od:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gaF().c=z
a.gaF().e=0
z=this.a.gm()
a.gaF().b=z
z=this.b.gm()
a.gaF().d=z
return a}},
l9:{"^":"b:0;",
$1:function(a){var z=a.gaF().e
if(typeof z!=="number")return z.a1()
a.gaF().e=z+1
return a}},
la:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
mt:{"^":"eY;a,m:b<,c,L:d<",
an:function(a){var z=new M.dq(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.eY))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)))},
i:function(a){return"SlashSituation {attacker="+J.j(this.a)+",\nid="+J.j(this.b)+",\ntarget="+H.a(J.j(this.c))+",\ntime="+J.j(this.d)+",\n}"}},
dq:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaF().c},
gL:function(){return this.gaF().e},
gaF:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaF().b
x=this.gaF().c
w=this.gaF().d
v=this.gaF().e
z=new M.mt(y,x,w,v)
if(y==null)H.i(P.v("attacker"))
if(x==null)H.i(P.v("id"))
if(w==null)H.i(P.v("target"))
if(v==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,Q,{"^":"",iY:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"kill <object> (WARNING should not be user-visible)"},
ga7:function(){return"(WARNING should not be user-visible)"},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
b.af(z.gm(),new Q.iZ())
c.eW(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gY())
z.bz(c,"<subject> die<s>",!0)
c.aP(0,"\n\n",!0)
return H.a(a.gj())+" slains "+H.a(z.gj())+" on the ground"},"$3","gR",6,0,2],
P:function(a,b){return 1},
O:function(a,b){return this.b.ga9()&&a.ax(C.d)},
p:{
ph:[function(a){return new Q.iY(null,!1,!0,C.e,a,null)},"$1","ox",2,0,4]}},iZ:{"^":"b:0;",
$1:function(a){a.sal(0)
return a}}}],["","",,K,{"^":"",jM:{"^":"L;a0:c<,W:d<,V:e<,a_:f<,b,a",
ga6:function(){return"parry it"},
ga7:function(){return"will <subject> parry it?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.gY().f+"}}")
S.bo(new K.jN(a,c),new K.jO(this,a,c),null,null)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){a.cq(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.gY().f+"}",!0)
b.co("FightSituation")
return H.a(a.cy)+" parries "+H.a(this.b.gj())},"$3","gR",6,0,2],
P:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbO())return 0
if(y.gbP())return 1
if(a.gK())return 0.6
return 0.3},
O:function(a,b){return a.ax(C.d)},
p:{
pm:[function(a){return new K.jM(!1,!0,C.e,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","oL",2,0,4]}},jN:{"^":"b:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.N(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},jO:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",ko:{"^":"L;a_:c<,a0:d<,W:e<,V:f<,b,a",
ga6:function(){return"roll out of way"},
ga7:function(){return"will <subject> evade?"},
X:[function(a,b,c){a.ae(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.N(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.a(a.gj())+" fails to roll out of the way"},"$3","gS",6,0,2],
T:[function(a,b,c){a.jv(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gK()){b.af(a.gm(),new Y.kp())
c.N(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.co("FightSituation")
return H.a(a.gj())+" rolls out of the way of "+H.a(this.b.gj())+"'s strike"},"$3","gR",6,0,2],
P:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gI(z):null
if(y.gbO())return 0
if(y.gbP())return 1
if(a.gK())return 1
return 0.5},
O:function(a,b){return!0},
p:{
ps:[function(a){return new Y.ko(null,!1,!0,C.e,a,null)},"$1","oR",2,0,4]}},kp:{"^":"b:0;",
$1:function(a){a.saw(C.i)
return a}}}],["","",,V,{"^":"",
de:function(a,b,c){var z=new V.dd(null,null,null,null,null,null)
new V.oe(a,b,c).$1(z)
return z.D()},
eH:{"^":"aF;",
gb7:function(){return[K.oL(),Y.oR()]},
gbO:function(){return this.c===C.m},
gbP:function(){return this.c===C.t},
gj:function(){return"OnGroundDefenseSituation"},
b9:function(){var z=new V.dd(null,null,null,null,null,null)
z.C(this)
new V.jK().$1(z)
return z.D()},
b6:function(a,b){if(a===0)return b.a8(this.d)
return},
bh:function(a,b){return new H.Q(a,new V.jL(this),[H.h(a,0)])}},
oe:{"^":"b:0;a,b,c",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gai().c=z
a.gai().f=0
z=this.a.gm()
a.gai().b=z
z=this.b.gm()
a.gai().e=z
a.gai().d=this.c
return a}},
jK:{"^":"b:0;",
$1:function(a){var z=a.gai().f
if(typeof z!=="number")return z.a1()
a.gai().f=z+1
return a}},
jL:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
mq:{"^":"eH;a,m:b<,c,d,L:e<",
an:function(a){var z=new V.dd(null,null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.eH))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)),J.n(this.e)))},
i:function(a){return"OnGroundDefenseSituation {attacker="+J.j(this.a)+",\nid="+J.j(this.b)+",\npredeterminedResult="+H.a(J.j(this.c))+",\ntargetOnGround="+H.a(J.j(this.d))+",\ntime="+J.j(this.e)+",\n}"}},
dd:{"^":"d;a,b,c,d,e,f",
gm:function(){return this.gai().c},
gL:function(){return this.gai().f},
gai:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gai().b
x=this.gai().c
w=this.gai().d
v=this.gai().e
u=this.gai().f
z=new V.mq(y,x,w,v,u)
if(y==null)H.i(P.v("attacker"))
if(x==null)H.i(P.v("id"))
if(w==null)H.i(P.v("predeterminedResult"))
if(v==null)H.i(P.v("targetOnGround"))
if(u==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,D,{"^":"",
ds:function(a,b){var z=new D.dr(null,null,null,null,null)
new D.of(a,b).$1(z)
return z.D()},
f7:{"^":"aF;",
gb7:function(){return[Q.ox()]},
gj:function(){return"StrikeDownSituation"},
b9:function(){var z=new D.dr(null,null,null,null,null)
z.C(this)
new D.lO().$1(z)
return z.D()},
b6:function(a,b){if(a===0)return b.a8(this.a)
return},
bh:function(a,b){return new H.Q(a,new D.lP(this),[H.h(a,0)])}},
of:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gaG().c=z
a.gaG().e=0
z=this.a.gm()
a.gaG().b=z
z=this.b.gm()
a.gaG().d=z
return a}},
lO:{"^":"b:0;",
$1:function(a){var z=a.gaG().e
if(typeof z!=="number")return z.a1()
a.gaG().e=z+1
return a}},
lP:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
mu:{"^":"f7;a,m:b<,c,L:d<",
an:function(a){var z=new D.dr(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.f7))return!1
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
gq:function(a){return Y.an(Y.m(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)),J.n(this.d)))},
i:function(a){return"StrikeDownSituation {attacker="+J.j(this.a)+",\nid="+J.j(this.b)+",\ntargetOnGround="+H.a(J.j(this.c))+",\ntime="+J.j(this.d)+",\n}"}},
dr:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaG().c},
gL:function(){return this.gaG().e},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
z=new D.mu(y,x,w,v)
if(y==null)H.i(P.v("attacker"))
if(x==null)H.i(P.v("id"))
if(w==null)H.i(P.v("targetOnGround"))
if(v==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,K,{"^":"",di:{"^":"d;a",
i:function(a){return C.a0.h(0,this.a)}}}],["","",,Y,{"^":"",lY:{"^":"cg;a0:c<,W:d<,V:e<,b,a",
ga_:function(){return},
X:[function(a,b,c){throw H.c(new P.ai(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.e
y=z.length!==0?C.a.gI(z):null
x=y.an(new Y.lZ(this))
C.a.bW(z)
C.a.u(z,x)
w=this.b
v=b.eh(w.gf4())
for(u=R.fZ(a,b),u=P.a_(u,!0,H.t(u,"x",0)),t=u.length,s=b.a,r=0;r<u.length;u.length===t||(0,H.ad)(u),++r){q=b.a8(u[r].gm())
p=q.an(new Y.m_(v))
s.aI(0,q)
s.u(0,p)}c.aP(0,"\n\n",!0)
c.aP(0,v.gat(),!0)
c.aP(0,"\n\n",!0)
if(v.gji()!=null){o=v.e.$1(b)
s.as(0,o)
C.a.u(z,U.iM(new H.Q(s,new Y.m0(a,v),[H.h(s,0)]),o,v.r))}return H.a(a.gj())+" went through exit to "+w.a},"$3","gR",6,0,2],
bp:function(a,b){return"WARNING should not be user-visible"},
P:function(a,b){return 1},
O:function(a,b){return!0},
p:{
pB:[function(a){return new Y.lY(!1,!1,null,a,null)},"$1","p6",2,0,43]}},lZ:{"^":"b:0;a",
$1:function(a){a.saZ(this.a.b.gf4())
return a}},m_:{"^":"b:0;a",
$1:function(a){a.saZ(this.a.gj())
return a}},m0:{"^":"b:0;a,b",
$1:function(a){var z,y
z=a.gbe()
y=this.a.gbe()
z=z.a
y=y.a
return(z==null?y==null:z===y)&&J.f(a.gaZ(),this.b.gj())}}}],["","",,F,{"^":"",
kr:function(a){var z=new F.dm(null,null,null,null)
new F.oh(a).$1(z)
return z.D()},
eQ:{"^":"aF;",
gb7:function(){return[Y.p6()]},
gbN:function(){return H.w([],[Q.af])},
gj:function(){return"RoomRoamingSituation"},
b9:function(){var z=new F.dm(null,null,null,null)
z.C(this)
new F.ks().$1(z)
return z.D()},
b6:function(a,b){return b.a.ba(0,new F.kt(),new F.ku())},
bh:function(a,b){var z=this.b6(null,b)
if(z==null)return[]
return[z]},
fn:function(a,b){a.a.hA(new F.kv(),!0)},
d5:function(a){if(J.f(this.a,$.$get$dR().b))return!1
return!0}},
oh:{"^":"b:0;a",
$1:function(a){var z=$.$get$aK().au(1073741823)
a.gaE().c=z
a.gaE().d=0
z=this.a.b
a.gaE().b=z
return a}},
ks:{"^":"b:0;",
$1:function(a){var z=a.gaE().d
if(typeof z!=="number")return z.a1()
a.gaE().d=z+1
return a}},
kt:{"^":"b:0;",
$1:function(a){return a.gK()&&a.gbc()}},
ku:{"^":"b:1;",
$0:function(){return}},
kv:{"^":"b:0;",
$1:function(a){return!a.gbo()}},
mr:{"^":"eQ;aZ:a<,m:b<,L:c<",
an:function(a){var z=new F.dm(null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof F.eQ))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z},
gq:function(a){return Y.an(Y.m(Y.m(Y.m(0,J.n(this.a)),J.n(this.b)),J.n(this.c)))},
i:function(a){return"RoomRoamingSituation {currentRoomName="+H.a(J.j(this.a))+",\nid="+J.j(this.b)+",\ntime="+J.j(this.c)+",\n}"}},
dm:{"^":"d;a,b,c,d",
gaZ:function(){return this.gaE().b},
saZ:function(a){this.gaE().b=a
return a},
gm:function(){return this.gaE().c},
gL:function(){return this.gaE().d},
gaE:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w
z=this.a
if(z==null){y=this.gaE().b
x=this.gaE().c
w=this.gaE().d
z=new F.mr(y,x,w)
if(y==null)H.i(P.v("currentRoomName"))
if(x==null)H.i(P.v("id"))
if(w==null)H.i(P.v("time"))}this.C(z)
return z}}}],["","",,O,{"^":"",
pO:[function(a){var z,y
z=$.$get$cQ()
y=z.t
if(y.length>0){y+=" "
z.t=y}z.t=y+a},"$1","oT",2,0,10],
pP:[function(a){$.dW=a},"$1","oU",2,0,10],
fS:[function(a,b,c,d,e,f,g){var z=L.e8(a,!1,!1,d,e,f,g)
$.$get$bx().u(0,z)
return z},function(a){return O.fS(a,!1,!1,null,null,null,null)},function(a,b,c){return O.fS(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","oS",2,13,45,0,0,0,1,1,0],
kF:{"^":"kQ;",
b5:function(){var z=0,y=new P.ap(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$b5=P.aj(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cC){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Sending updated stats."
n.a.A(m.w())
m=t.Q
n=Z.lj()
m.toString
l=new A.q(100,null,null,null,null)
l.e=n.w()
m.a.A(l.w())
new P.D(0,$.l,null,[null]).aW(!0)}if(t.r){n=t.Q
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
return P.u(t.c5(),$async$b5,y)
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
return P.u(null,$async$b5,y)},
e8:function(){var z,y
this.eG()
this.f.aH(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fp(Z.bp())
z.toString
y=new A.q(90,null,null,null,null)
y.b=Z.bp()
z.a.A(y.w())
this.b5()},
jQ:[function(a){var z,y
z={}
z.a=null
y=$.$get$bx()
y.H(0,new O.l0(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.a(a)+") is not one of those offered ("+J.j(y)+")"))
this.hR(z)
this.b5()},"$1","ghC",2,0,29],
hR:function(a){var z
if(a.gf7()!=null){z=a.r
$.$get$bW().ag(z)}z=a.x
if(z!=null)this.dI(z)},
c5:function(){var z=0,y=new P.ap(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$c5=P.aj(function(a1,a2){if(a1===1){v=a2
z=w}while(true)switch(z){case 0:s={}
p=$.$get$bX()
o=p.b
if(o.b!==o.c){s=t.Q
s.toString
o=new A.q(667,null,null,null,null)
o.c="Awarding points."
s.a.A(o.w())
n=p.b.cT()
p=t.Q
o=n.gil()
s=n.b
m=n.c
p.toString
l=new A.q(70,null,null,null,null)
l.b=[o,s]
l.c=m
p.a.A(l.w())
p=new P.D(0,$.l,null,[null])
p.aW(null)
p.bA(new O.kR(t))
x=!0
z=1
break}k=t.x===t.e.gab().length-1||t.x===t.y
s.a=k
p=t.x
o=t.y
if(p!==o)if(p!=null){m=t.e.gab().length
if(typeof p!=="number"){x=p.ah()
z=1
break}if(p<m){p=t.e.gab()
m=t.x
if(m>>>0!==m||m>=p.length){x=H.e(p,m)
z=1
break}m=!!J.k(p[m]).$isJ
p=m}else p=!1
j=p}else j=!1
else j=!1
p="atEndOfPage = "+k+", atStaticChoiceList = "+j
m=t.Q
m.toString
i=new A.q(667,null,null,null,null)
i.c=p
m.a.A(i.w())
i=$.$get$bx()
i.toString
P.jp(i,new O.kS(t),!1)
if(i.gk(i)!==0){p=t.Q
p.toString
m=new A.q(667,null,null,null,null)
m.c="We have choices."
p.a.A(m.w())
m=H.t(i,"aY",0)
m=P.a_(new H.Q(i,new O.kT(s,j),[m]),!0,m)
p=i.a
H.w([],[L.Z])
h=new L.e9(p,m)
if(!h.gG(h)){s=t.Q
p=s.e
if(p!=null){p.cM(new D.bB("Showing new choice before previous one was selected."))
s.e=null}p=P.r
s.e=new P.bQ(new P.D(0,$.l,null,[p]),[p])
p=h.cY()
s.a.A(p.w())
s=s.e.a.bA(t.ghC())
g=new O.kU(t)
p=H.h(s,0)
o=$.l
if(o!==C.f){g=P.dL(g,o)
o.toString}s.cD(new P.dD(null,new P.D(0,o,null,[p]),6,new O.kV(),g,[p,p]))
x=!0
z=1
break}else{f=i.ba(0,new O.kW(),new O.kX())
if(f!=null){if(f.gf7()!=null){p=f.r
$.$get$bW().ag(p)}p=f.x
if(p!=null)t.dI(p)
i.aI(0,f)}}}p=$.$get$bW()
m=p.b
e=p.c
z=m!==e?3:4
break
case 3:if(m===e)H.i(H.M());++p.d
s=p.a
o=s.length
e=(e-1&o-1)>>>0
p.c=e
if(e<0||e>=o){x=H.e(s,e)
z=1
break}d=s[e]
s[e]=null
z=5
return P.u(t.c7(d),$async$c5,y)
case 5:x=a2
z=1
break
case 4:p=$.dW
if(p!=null){t.dI(p)
$.dW=null
x=!1
z=1
break}p=t.x
if(p==null){t.x=0
p=0}else if(p===o){p=t.e.gab().length-1
t.x=p}else if($.fH)$.fH=!1
else{if(typeof p!=="number"){x=p.a1()
z=1
break}++p
t.x=p}s.a=p===t.e.gab().length-1
p="Resolving block: '"+H.a(t.e.gj())+"' block "+H.a(t.x)+"."
o=t.Q
o.toString
m=new A.q(667,null,null,null,null)
m.c=p
o.a.A(m.w())
if(t.x===t.e.gab().length){s=t.Q
s.toString
p=new A.q(667,null,null,null,null)
p.c="End of book."
s.a.A(p.w())
p=t.Q
s=t.dj()
p.toString
s=s.ed(50)
p.a.A(s.w())
t.Q.a.A(new A.q(80,null,null,null,null).w())
x=!0
z=1
break}p=t.e.gab()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
z=typeof o==="string"?6:8
break
case 6:s=t.Q
p=t.e.gab()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
p=P.S
s.f=new P.bQ(new P.D(0,$.l,null,[p]),[p])
p=new A.q(30,null,null,null,null)
p.c=o
s.a.A(p.w())
s.f.a.bA(new O.kY(t))
x=!0
z=1
break
z=7
break
case 8:p=t.e.gab()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}z=!!J.k(p[o]).$isJ?9:11
break
case 9:p=t.Q
p.toString
o=new A.q(667,null,null,null,null)
o.c="A ChoiceList encountered."
p.a.A(o.w())
try{p=t.e.gab()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}i.ij(p[o])}catch(a0){s=H.y(a0)
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
if(i.bR(0,new O.kZ(s,t))&&t.x===t.e.gab().length-1){s=t.Q
s.toString
p=new A.q(667,null,null,null,null)
p.c="Creating & sending savegame"
s.a.A(p.w())
p=t.Q
s=t.dj()
p.toString
s=s.ed(50)
p.a.A(s.w())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:p=t.e.gab()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
p=H.ak(H.aw(P.P,[H.aw(P.aR)]))
z=p.aN(o)?12:14
break
case 12:b=t.x===t.e.gab().length-1?t.dj():null
o=t.e.gab()
m=t.x
if(m>>>0!==m||m>=o.length){x=H.e(o,m)
z=1
break}z=15
return P.u(t.c7(p.ev(o[m])),$async$c5,y)
case 15:a=a2
if(i.bR(0,new O.l_(s,t))&&t.x===t.e.gab().length-1){s=t.Q
s.toString
p=b.ed(50)
s.a.A(p.w())}x=a
z=1
break
z=13
break
case 14:s=t.e.gab()
p=t.x
if(p>>>0!==p||p>=s.length){x=H.e(s,p)
z=1
break}throw H.c(new P.N("Invalid block: "+H.a(s[p])))
case 13:case 10:case 7:case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c5,y)},
dI:function(a){var z,y,x,w,v
z=$.$get$cb()
if(z.b.test(H.bd(a))){y=this.d
if(y==null)throw H.c(new P.N("Cannot use ["+J.j(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aq()
w=z-1}else{x=this.b.d3(a,this.e.gd4())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.a(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.u(0,H.a(z.gj())+">>"+H.a(y.gj()))
this.r=!0}if(this.f.U(0,H.a(this.e.gj())+">>"+H.a(x.gj()))||x.gfI()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfI()
else z=!1}else z=!1
$.fF=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.q(667,null,null,null,null)
v.c=z
y.a.A(v.w())
v=this.e
this.d=new O.kG(v,this.x)
this.e=x
this.x=w
v.e=J.a2(v.gcZ(),1)},
eG:function(){var z,y,x,w,v,u
this.x=null
$.$get$bW().aH(0)
$.$get$bx().sk(0,0)
$.nS=null
x=$.$get$c1()
x.aH(0)
w=$.$get$bX()
x.l(0,"points",w)
w.a=0
w.b.aH(0)
this.b.io()
$.h2=!0
try{this.iX()}catch(v){x=H.y(v)
z=x
y=H.z(v)
x=this.Q
w=H.a(z)+"\n"+H.a(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.A(u.w())
throw H.c(z)}this.ft()
$.h2=!1},
c7:function(a){var z=0,y=new P.ap(),x,w=2,v,u=[],t=this,s,r,q,p,o,n
var $async$c7=P.aj(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$cQ()
q.t=""
w=4
z=7
return P.u(a.$0(),$async$c7,y)
case 7:w=2
z=6
break
case 4:w=3
n=v
o=H.y(n)
s=o
r=H.z(n)
q.t+="<code><pre>ERROR: "+H.a(s)+"\n\n"+H.a(r)+"</pre></code>"
throw H.c(new M.c7(J.j(s),t.e.gj(),t.x))
z=6
break
case 3:z=2
break
case 6:if(q.t.length!==0){t.Q.el(J.j(q)).bA(new O.l1(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c7,y)},
hJ:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cb().b.test(H.bd(z)))return!1
y=this.b.d3(z,this.e.gd4())
if(y==null){z="Target page '"+H.a(z)+"' was not found."
x=this.Q
x.toString
w=new A.q(667,null,null,null,null)
w.c=z
x.a.A(w.w())
return!0}y.gjG()
return!1},"$1","geK",2,0,39],
dj:function(){var z,y,x,w,v,u
this.ft()
try{x=this.e.gj()
w=$.$get$c1()
x=new Z.eS(x,this.b.iH(),null,null,null,null)
x.c=H.aA(Z.cx(w),"$isB",[P.o,P.d],"$asB")
x.f=Date.now()
x.e=C.c.jD(H.a4(x),16)
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
fg:function(a,b){var z,y,x
this.eG()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.d3("Trying to load page '"+H.a(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.A(x.w())
z.iT(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Importing player chronology."
z.a.A(y.w())
this.f.as(0,b)}z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.A(y.w())
y=$.$get$c1()
Z.kC(a,y,P.ez(P.o,P.bk))
this.cx=H.h1(y.h(0,"game"),"$isei")
this.cy=H.aA(y.h(0,"hitpoints"),"$isas",[P.az],"$asas")
this.db=H.aA(y.h(0,"stamina"),"$isas",[P.r],"$asas")
y=this.Q
Z.fp(Z.bp())
y.toString
z=new A.q(90,null,null,null,null)
z.b=Z.bp()
y.a.A(z.w())
z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="loadFromSaveGame() done."
z.a.A(y.w())
this.b5()},
jc:function(a){return this.fg(a,null)},
d6:[function(a,b,c,d){var z=0,y=new P.ap(),x,w=2,v,u=this,t,s,r
var $async$d6=P.aj(function(e,f){if(e===1){v=f
z=w}while(true)switch(z){case 0:t=$.$get$cQ()
if(t.t.length!==0){u.Q.el(J.j(t))
t.t=""}t=u.Q
t.toString
s=new A.q(130,null,null,null,null)
s.b=[a,b,d,c]
t.a.A(s.w())
s=U.bM
r=new P.D(0,$.l,null,[s])
t.x=new P.bQ(r,[s])
x=r
z=1
break
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$d6,y)},function(a,b){return this.d6(a,b,null,!1)},"jL","$4$rerollEffectDescription$rerollable","$2","gh1",4,5,31,1,0]},
l0:{"^":"b:0;a,b,c",
$1:function(a){var z,y,x,w
a.sem(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.A(x.w())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cb().b.test(H.bd(z))?y.d.a:y.b.d3(z,y.e.gd4())
if(w!=null){y.f.u(0,H.a(y.e.gj())+">>"+H.a(w.gj()))
y.r=!0}}}}},
kR:{"^":"b:0;a",
$1:function(a){return this.a.b5()}},
kS:{"^":"b:0;a",
$1:function(a){return a.gem()||this.a.hJ(a)}},
kT:{"^":"b:32;a,b",
$1:function(a){return a.j2(this.b,this.a.a)}},
kU:{"^":"b:0;a",
$1:function(a){var z,y,x
z=H.a(a)
y=this.a.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.A(x.w())
return}},
kV:{"^":"b:0;",
$1:function(a){return a instanceof D.bB}},
kW:{"^":"b:0;",
$1:function(a){return a.gj3()}},
kX:{"^":"b:1;",
$0:function(){return}},
kY:{"^":"b:0;a",
$1:function(a){return this.a.b5()}},
kZ:{"^":"b:0;a,b",
$1:function(a){return a.cO(!0,this.a.a,this.b.geK())}},
l_:{"^":"b:0;a,b",
$1:function(a){return a.cO(!0,this.a.a,this.b.geK())}},
l1:{"^":"b:0;a",
$1:function(a){return this.a.b5()}},
k6:{"^":"d;a,b,f1:c<",
i8:function(a,b,c){var z
if(!$.fF){z=J.a2(this.a,b)
this.a=z
this.b.ag(new A.cq(b,z,c))}},
u:function(a,b){return this.i8(a,b,null)},
a1:function(a,b){this.u(0,b)
return this},
w:function(){return P.a7(["points",this.a])},
fH:function(a){this.a=a.h(0,"points")
this.b.aH(0)},
hc:function(){this.b=P.aP(null,A.cq)},
$isdn:1},
cy:{"^":"jQ;ab:d<,cZ:e@,a,b,c",
gfI:function(){return J.a3(this.e,0)}},
kG:{"^":"d;a,b"},
kM:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
d3:function(a,b){var z
if(b!=null&&this.a.J(b+": "+H.a(a)))return this.a.h(0,H.a(b)+": "+H.a(a))
else{z=this.a
if(z.J(a))return z.h(0,a)
else return}},
l:function(a,b,c){this.a.l(0,b,c)
c.sj(b)},
iH:function(){var z=new H.H(0,null,null,null,null,null,0,[P.o,null])
this.a.H(0,new O.kO(z))
return z},
iT:function(a){a.H(0,new O.kP(this))},
io:function(){this.a.H(0,new O.kN())}},
kO:{"^":"b:5;a",
$2:function(a,b){this.a.l(0,a,P.a7(["visitCount",b.gcZ()]))}},
kP:{"^":"b:5;a",
$2:function(a,b){var z=this.a.a
if(z.J(a))z.h(0,a).scZ(J.am(b,"visitCount"))}},
kN:{"^":"b:5;",
$2:function(a,b){b.scZ(0)}}}],["","",,M,{"^":"",c7:{"^":"d;a,b,c",
i:function(a){return"AuthorScriptException at page '"+H.a(this.b)+"', block #"+H.a(this.c)+": "+H.a(this.a)},
p:{
e5:function(a){return new M.c7(a,null,null)}}}}],["","",,M,{"^":"",kQ:{"^":"d;"}}],["","",,Z,{"^":"",eS:{"^":"d;a,b,c,d,e,f",
ed:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.q(a,null,null,null,null)
z.c=this.cX()
return z},
cX:function(){var z,y
z=new H.H(0,null,null,null,null,null,0,[P.o,null])
z.l(0,"uid",this.e)
z.l(0,"currentPageName",this.a)
z.l(0,"pageMapState",this.b)
z.l(0,"vars",this.c)
z.l(0,"timestamp",this.f)
y=this.d
if(y!=null)z.l(0,"previousText",y)
return C.v.f6(z)},
i:function(a){return this.cX()},
p:{
eT:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.k(a)
z=!!z.$isJ||!!z.$isB}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.k(a).$isdn},
cx:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.k(a)
if(!!z.$isJ){y=[]
for(x=0;x<z.gk(a);++x)if(Z.eT(z.h(a,x)))y.push(Z.cx(z.h(a,x)))
return y}else if(!!z.$isB){w=new H.H(0,null,null,null,null,null,0,[null,null])
z.H(a,new Z.kB(a,w))
return w}else if(!!z.$isdn){v=a.w()
v.l(0,"_class",a.gf1())
return Z.cx(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cw:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.k(a)
if(!!z.$isJ){y=[]
for(x=0;x<z.gk(a);++x)y.push(Z.cw(z.h(a,x),b,null))
return y}else{w=!!z.$isB
if(w&&!a.J("_class")){v=new H.H(0,null,null,null,null,null,0,[null,null])
z.H(a,new Z.kA(b,v))
return v}else if(w&&a.J("_class"))if(c!=null){c.fH(a)
return c}else{u=z.h(a,"_class")
if(!b.J(u))throw H.c(new Z.d3("Constructor for "+H.a(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
kC:function(a,b,c){a.c.H(0,new Z.kD(b,c))}}},kB:{"^":"b:5;a,b",
$2:function(a,b){if(Z.eT(this.a.h(0,a)))this.b.l(0,a,Z.cx(b))}},kA:{"^":"b:5;a,b",
$2:function(a,b){this.b.l(0,a,Z.cw(b,this.a,null))}},kD:{"^":"b:33;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.l(0,a,Z.cw(b,x,null))
else z.l(0,a,Z.cw(b,x,y))}},d3:{"^":"d;a",
i:function(a){return"IncompatibleSavegameException: "+this.a}},j3:{"^":"d;a",
i:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",kb:{"^":"d;"},ka:{"^":"kb;"},jb:{"^":"ka;a,b,c,d,e,f,r,x",
jU:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.o
n=[o,P.d]
H.aA(a,"$isB",n,"$asB")
m=new A.q(a.h(0,"type"),null,null,null,null)
if(a.J("strContent"))m.c=a.h(0,"strContent")
if(a.J("listContent"))m.b=a.h(0,"listContent")
if(a.J("intContent"))m.d=a.h(0,"intContent")
if(a.J("mapContent"))m.e=H.aA(a.h(0,"mapContent"),"$isB",n,"$asB")
z=m
switch(z.gee()){case 1070:o=this.e
if(o!=null){o.cM(new D.bB("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.aX()
o.b.aX()
return
case 1000:o=new A.q(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.A(o.w())
n.A(new A.q(10,null,this.c.ch,null,null).w())
return
case 1050:l=z.giY()
this.e.bv(l)
this.e=null
return
case 1060:o=new A.q(667,null,null,null,null)
o.c="New form state from player received."
this.a.A(o.w())
o=z.gje()
if(!o.J("__submitted__"))o.l(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.c_())
n.bt(new G.ii(o))
return
case 1080:o=new A.q(667,null,null,null,null)
o.c="Received slot machine result."
this.a.A(o.w())
k=J.am(z.ge4(),0)
j=J.am(z.ge4(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.z,k)
o.bv(new U.bM(C.z[k],j))
this.x=null
return
case 1010:o=new A.q(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.A(o.w())
o=this.e
if(o!=null){o.cM(new D.bB("Book Restart before choice was selected."))
this.e=null}try{this.c.e8()}catch(i){o=H.y(i)
y=o
x=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="An error occured when initializing: "+H.a(y)+".\n"+H.a(x)
n.A(o.w())
throw H.c(y)}o=new A.q(90,null,null,null,null)
o.b=Z.bp()
n.A(o.w())
n.A(new A.cq(0,0,null).cY().w())
return
case 1020:h=new A.q(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.A(h.w())
h=this.e
if(h!=null){h.cM(new D.bB("Book Load before choice was selected."))
this.e=null}try{h=z.gh6()
f=new Z.eS(null,null,null,null,null,null)
e=H.aA(C.v.iu(h),"$isB",n,"$asB")
if(!e.J("currentPageName")||!e.J("vars"))H.i(new Z.j3("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.a(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.aA(e.h(0,"pageMapState"),"$isB",n,"$asB")
f.c=H.aA(e.h(0,"vars"),"$isB",n,"$asB")
if(e.J("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.aA(J.hl(z.ge4()),"$isbN",[o],"$asbN")
o=this.c
if(v!=null)o.fg(w,v)
else o.jc(w)}catch(i){o=H.y(i)
if(o instanceof Z.d3){u=o
t=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.a(u)+".\n"+H.a(t)
g.A(o.w())
this.c.e8()}else{s=o
r=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.a(s)+".\n"+H.a(r)
g.A(o.w())
this.c.e8()}}try{o=new A.q(90,null,null,null,null)
o.b=Z.bp()
g.A(o.w())}catch(i){o=H.y(i)
q=o
p=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.a(q)+".\n"+H.a(p)
g.A(o.w())
throw H.c(q)}this.c.toString
g.A(new A.cq(0,$.$get$bX().a,null).cY().w())
return
case 1090:this.f.bv(!0)
this.f=null
return
case 1040:this.c.b5()
return
default:o=new A.q(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.a(z.gee())+"."
this.a.A(o.w())}},"$1","ghP",2,0,16],
el:function(a){var z=P.S
this.f=new P.bQ(new P.D(0,$.l,null,[z]),[z])
z=new A.q(30,null,null,null,null)
z.c=a
this.a.A(z.w())
return this.f.a}},bB:{"^":"d;a",
i:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",ii:{"^":"d;a",
gjN:function(){return this.a.h(0,"__submitted__")},
w:function(){return P.bH(this.a,null,null)},
i:function(a){return"<CurrentState submitted="+H.a(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",q:{"^":"d;ee:a<,e4:b<,h6:c<,iY:d<,je:e<",
gjF:function(){var z=this.a
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
cX:function(){return C.v.f6(this.w())},
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
z="Message "+this.gjF()
y=this.a
x=J.k(y)
return z+(x.B(y,50)||x.B(y,60)||x.B(y,90)||x.B(y,100)||x.B(y,666)||x.B(y,667)?" (async)":"")}}}],["","",,E,{"^":"",jQ:{"^":"d;j:a@,jG:b<",
i:function(a){return this.a},
gd4:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.hg(z,": ")
if(y>0)return J.e4(this.a,0,y)
else return}}}],["","",,A,{"^":"",cq:{"^":"d;il:a<,b,c",
i:function(a){return"Score +"+H.a(this.a)+"."},
cY:function(){var z=new A.q(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",Z:{"^":"d;em:a@,b,c,d,az:e<,a_:f<,f7:r<,x,y",
gj3:function(){return this.e.length===0},
cO:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
if(b!=null)!b
if(a!=null)!a
if(c!=null&&c.$1(this)===!0)return!1
return!0},
j2:function(a,b){return this.cO(a,b,null)},
jB:function(){return P.a7(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bA:function(a){this.r=a
return this},
b8:function(a,b){return C.b.b8(this.e,b.gaz())},
i:function(a){return"Choice: "+this.e+" ["+H.a(this.x)+"] ("+this.d+")"},
h9:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.be(a).fF(a)
this.d=C.b.gq(a)
this.r=f
this.b=!1
this.c=!1},
$isO:1,
$asO:function(){return[L.Z]},
p:{
e8:function(a,b,c,d,e,f,g){var z=new L.Z(!1,null,null,null,null,e,null,d,g)
z.h9(a,!1,!1,d,e,f,g)
return z}}},e9:{"^":"eA;a,b",
gk:function(a){return this.b.length},
sk:function(a,b){C.a.sk(this.b,b)
return b},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
l:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
ij:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
v=J.F(a)
if(v.h(a,0)!=null&&!!J.k(v.h(a,0)).$isbk)try{this.a=v.h(a,0).$0()}catch(u){v=H.y(u)
z=v
throw H.c(M.e5(J.j(z)))}else this.a=null
t=this.b
s=H.ak(H.aw(P.P,[H.aw(P.aR)]))
r=1
while(!0){q=v.gk(a)
if(typeof q!=="number")return H.C(q)
if(!(r<q))break
y=v.h(a,r)
x=null
if(J.am(y,"string")!=null&&!!J.k(J.am(y,"string")).$isbk)try{x=J.am(y,"string").$0()}catch(u){v=H.y(u)
w=v
throw H.c(M.e5(J.j(w)))}else x=""
q=x
p=J.am(y,"goto")
o=s.ev(J.am(y,"script"))
n=new L.Z(!1,null,null,null,null,null,null,p,J.am(y,"submenu"))
if(q==null)H.i(P.E("String given to choice cannot be null."))
n.e=J.be(q).fF(q)
n.d=C.b.gq(q)
n.r=o
n.b=!1
n.c=!1
C.a.u(t,n);++r}},
ih:function(a,b,c,d,e,f,g){if(b instanceof L.Z)C.a.u(this.b,b)
else if(typeof b==="string")C.a.u(this.b,L.e8(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
u:function(a,b){return this.ih(a,b,!1,!1,null,null,null)},
jC:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.h(z,0)
x=P.a_(new H.Q(z,new L.i_(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.q(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.H(x,new L.i0(w))
return w},
cY:function(){return this.jC(null,null,null,null)},
i:function(a){return new H.ag(this.b,new L.i1(),[null,null]).cl(0,", ")},
$aseA:function(){return[L.Z]},
$aseF:function(){return[L.Z]},
$asJ:function(){return[L.Z]},
$asW:function(){return[L.Z]}},i_:{"^":"b:0;a,b,c",
$1:function(a){return a.cO(this.b,this.a,this.c)}},i0:{"^":"b:0;a",
$1:function(a){H.a(a)
J.cR(this.a.b,a.jB())
a.a=!0}},i1:{"^":"b:0;",
$1:function(a){return H.a(a)}}}],["","",,Z,{"^":"",cz:{"^":"d;cB:a<,az:b<",
w:function(){return P.a7(["show",this.a,"string",this.b])}},lg:{"^":"d;a",
w:function(){var z=new H.H(0,null,null,null,null,null,0,[P.o,P.d])
this.a.H(0,new Z.lh(z))
return z},
H:function(a,b){this.a.H(0,b)}},lh:{"^":"b:34;a",
$2:function(a,b){this.a.l(0,a,b.w())}},fo:{"^":"d;j:a@,at:b<,f2:c<,cR:d<,cB:e<,fm:f<,az:r<",p:{
fp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.w(new Array(a.length),[Z.fo])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ad)(a),++v){u=a[v]
t=J.F(u)
s=t.h(u,"name")
r=t.h(u,"description")
q=t.h(u,"color")
p=t.h(u,"priority")
o=t.h(u,"show")
n=t.h(u,"notifyOnChange")
t=t.h(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fo(s,r,q,p,o,n,t);++w}C.a.cC(z,new Z.m9())
return z}}},m9:{"^":"b:5;",
$2:function(a,b){return J.ab(b.gcR(),a.gcR())}},as:{"^":"d;j:a<,at:b<,c,f2:d<,cR:e<,f,r,fm:x<,f_:y@,f1:z<,$ti",
gap:function(){return this.f},
sap:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cC=!0}},
gcB:function(){return this.r},
gaz:function(){return this.c.$1(this.f)},
w:function(){return P.a7(["name",this.a,"value",this.f,"show",this.r])},
fH:function(a){var z
this.sap(H.cP(a.h(0,"value"),H.h(this,0)))
z=a.h(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cC=!0}},
$isdn:1,
p:{
cA:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cB()
y=z.J(a)?H.aA(z.h(0,a),"$isas",[h],"$asas"):new Z.as(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.cP(e,h)
y.r=!0
z.l(0,a,y)
return y},
lj:function(){var z,y
z=new Z.lg(new H.H(0,null,null,null,null,null,0,[P.o,Z.cz]))
y=$.$get$cB().gaK()
new H.Q(y,new Z.lk(),[H.t(y,"x",0)]).H(0,new Z.ll(z))
$.cC=!1
return z},
bp:function(){var z=H.w([],[[P.B,P.o,P.d]])
$.$get$cB().gaK().H(0,new Z.li(z))
return z}}},lk:{"^":"b:0;",
$1:function(a){return a.gf_()}},ll:{"^":"b:18;a",
$1:function(a){var z,y
z=a.gcB()
y=a.gaz()
a.sf_(!1)
this.a.a.l(0,a.a,new Z.cz(z,y))}},li:{"^":"b:18;a",
$1:function(a){var z=new H.H(0,null,null,null,null,null,0,[P.o,P.d])
z.l(0,"name",a.gj())
z.l(0,"description",a.gat())
z.l(0,"color",a.gf2())
z.l(0,"priority",a.gcR())
z.l(0,"show",a.gcB())
z.l(0,"notifyOnChange",a.gfm())
z.l(0,"string",a.gaz())
this.a.push(z)}}}],["","",,B,{"^":"",jy:{"^":"d;"},pg:{"^":"jA;"},jz:{"^":"jy;"},jA:{"^":"jz;"}}],["","",,N,{"^":"",da:{"^":"d;j:a<,b,c,hs:d<,e,f",
gf9:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gj(),"")
x=this.a
return y?x:z.gf9()+"."+x},
ge3:function(){if($.h0){var z=this.b
if(z!=null)return z.ge3()}return $.o_},
jd:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.ge3().b){if(!!J.k(b).$isbk)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.j(b)}else v=null
if(d==null&&x>=$.oQ.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.a(b)
throw H.c(x)}catch(u){x=H.y(u)
z=x
y=H.z(u)
d=y
if(c==null)c=z}e=$.l
x=b
w=this.gf9()
t=c
s=d
r=Date.now()
q=$.eB
$.eB=q+1
p=new N.jt(a,x,v,w,new P.cd(r,!1),q,t,s,e)
if($.h0)for(o=this;o!=null;){o.eN(p)
o=o.b}else $.$get$eD().eN(p)}},
bU:function(a,b,c,d){return this.jd(a,b,c,d,null)},
iK:function(a,b,c){return this.bU(C.S,a,b,c)},
Z:function(a){return this.iK(a,null,null)},
iJ:function(a,b,c){return this.bU(C.R,a,b,c)},
aQ:function(a){return this.iJ(a,null,null)},
iI:function(a,b,c){return this.bU(C.T,a,b,c)},
bx:function(a){return this.iI(a,null,null)},
iW:function(a,b,c){return this.bU(C.y,a,b,c)},
iV:function(a){return this.iW(a,null,null)},
jH:function(a,b,c){return this.bU(C.W,a,b,c)},
ef:function(a){return this.jH(a,null,null)},
h0:function(a,b,c){return this.bU(C.V,a,b,c)},
ej:function(a){return this.h0(a,null,null)},
eN:function(a){},
p:{
aZ:function(a){return $.$get$eC().fv(a,new N.oj(a))}}},oj:{"^":"b:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d8(z,"."))H.i(P.E("name shouldn't start with a '.'"))
y=C.b.ja(z,".")
if(y===-1)x=z!==""?N.aZ(""):null
else{x=N.aZ(C.b.aA(z,0,y))
z=C.b.bj(z,y+1)}w=new H.H(0,null,null,null,null,null,0,[P.o,N.da])
w=new N.da(z,x,null,w,new P.fr(w,[null,null]),null)
if(x!=null)x.ghs().l(0,z,w)
return w}},aD:{"^":"d;j:a<,ap:b<",
B:function(a,b){if(b==null)return!1
return b instanceof N.aD&&this.b===b.b},
ah:function(a,b){return C.c.ah(this.b,b.gap())},
bG:function(a,b){return C.c.bG(this.b,b.gap())},
bq:function(a,b){var z=b.gap()
if(typeof z!=="number")return H.C(z)
return this.b>z},
bE:function(a,b){return this.b>=b.gap()},
b8:function(a,b){var z=b.gap()
if(typeof z!=="number")return H.C(z)
return this.b-z},
gq:function(a){return this.b},
i:function(a){return this.a},
$isO:1,
$asO:function(){return[N.aD]}},jt:{"^":"d;e3:a<,b,am:c<,d,L:e<,f,b_:r<,aV:x<,y",
i:function(a){return"["+this.a.a+"] "+this.d+": "+H.a(this.b)}}}],["","",,X,{"^":"",
a1:function(a){return X.bt(J.hd(a,0,new X.oB()))},
a9:function(a,b){var z=J.a2(a,b)
if(typeof z!=="number")return H.C(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
bt:function(a){if(typeof a!=="number")return H.C(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
oB:{"^":"b:5;",
$2:function(a,b){return X.a9(a,J.n(b))}}}],["","",,U,{"^":"",cu:{"^":"d;a",
i:function(a){return C.a_.h(0,this.a)}},bM:{"^":"d;a,jI:b<",
ge1:function(){return this.a===C.D},
i:function(a){return"SessionResult<"+this.a.i(0)+",wasRerolled="+H.a(this.b)+">"},
B:function(a,b){if(b==null)return!1
return b instanceof U.bM&&b.a===this.a&&J.f(b.b,this.b)},
gq:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
pQ:[function(a,b){var z,y,x,w,v
z=new D.jb(b,null,null,null,null,null,null,null)
y=$.eO
$.eO=y+1
x=new H.bK(y,null,!1)
w=init.globalState.d
w.dd(y,x)
w.ce()
w=new H.ki(x,null)
w.hd(x)
z.b=w
w=w.b
w.toString
new P.cF(w,[H.h(w,0)]).ad(z.ghP(),null,null,null)
b.A(new H.bU(z.b.a,init.globalState.d.a))
v=N.kI()
z.c=v
v.Q=z},"$2","fT",4,0,30]},1]]
setupProgram(dart,0)
J.k=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.er.prototype
return J.jd.prototype}if(typeof a=="string")return J.bG.prototype
if(a==null)return J.es.prototype
if(typeof a=="boolean")return J.eq.prototype
if(a.constructor==Array)return J.bE.prototype
if(!(a instanceof P.d))return J.b6.prototype
return a}
J.al=function(a){if(a==null)return a
if(a.constructor==Array)return J.bE.prototype
if(!(a instanceof P.d))return J.b6.prototype
return a}
J.F=function(a){if(typeof a=="string")return J.bG.prototype
if(a==null)return a
if(a.constructor==Array)return J.bE.prototype
if(!(a instanceof P.d))return J.b6.prototype
return a}
J.aa=function(a){if(typeof a=="number")return J.bF.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b6.prototype
return a}
J.dU=function(a){if(typeof a=="number")return J.bF.prototype
if(typeof a=="string")return J.bG.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b6.prototype
return a}
J.be=function(a){if(typeof a=="string")return J.bG.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b6.prototype
return a}
J.a2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.dU(a).a1(a,b)}
J.bf=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aa(a).d0(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.k(a).B(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aa(a).bq(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aa(a).ah(a,b)}
J.bg=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dU(a).bH(a,b)}
J.hc=function(a){if(typeof a=="number")return-a
return J.aa(a).ei(a)}
J.ab=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aa(a).aq(a,b)}
J.am=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.cR=function(a,b){return J.al(a).u(a,b)}
J.c3=function(a,b){return J.dU(a).b8(a,b)}
J.e0=function(a,b){return J.F(a).U(a,b)}
J.e1=function(a,b){return J.al(a).a2(a,b)}
J.hd=function(a,b,c){return J.al(a).ak(a,b,c)}
J.e2=function(a){return J.al(a).gac(a)}
J.n=function(a){return J.k(a).gq(a)}
J.he=function(a){return J.F(a).gG(a)}
J.ae=function(a){return J.al(a).gM(a)}
J.cS=function(a){return J.al(a).gI(a)}
J.aB=function(a){return J.F(a).gk(a)}
J.hf=function(a){return J.k(a).gb3(a)}
J.hg=function(a,b){return J.F(a).bb(a,b)}
J.e3=function(a,b){return J.al(a).bd(a,b)}
J.hh=function(a,b,c){return J.be(a).fi(a,b,c)}
J.hi=function(a,b,c){return J.be(a).js(a,b,c)}
J.hj=function(a){return J.aa(a).e9(a)}
J.hk=function(a,b){return J.al(a).d7(a,b)}
J.cT=function(a,b){return J.be(a).d8(a,b)}
J.e4=function(a,b,c){return J.be(a).aA(a,b,c)}
J.hl=function(a){return J.al(a).bB(a)}
J.j=function(a){return J.k(a).i(a)}
J.bh=function(a,b){return J.aa(a).cs(a,b)}
J.hm=function(a,b){return J.al(a).bD(a,b)}
I.cN=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.J=J.aC.prototype
C.a=J.bE.prototype
C.p=J.eq.prototype
C.c=J.er.prototype
C.q=J.es.prototype
C.h=J.bF.prototype
C.b=J.bG.prototype
C.E=new A.Y(0,0,0)
C.F=new A.Y(-1/0,-1/0,-1/0)
C.G=new H.eh()
C.H=new P.jP()
C.u=new P.mR()
C.I=new P.na()
C.f=new P.nq()
C.w=new P.aO(0)
C.K=new U.ci(0)
C.L=new U.ci(1)
C.M=new U.ci(2)
C.d=new U.ci(3)
C.N=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.jh(null,null)
C.O=new P.jj(null)
C.P=new P.jk(null,null)
C.x=new O.ey(0)
C.Q=new O.ey(1)
C.R=new N.aD("FINER",400)
C.S=new N.aD("FINEST",300)
C.T=new N.aD("FINE",500)
C.y=new N.aD("INFO",800)
C.U=new N.aD("OFF",2000)
C.V=new N.aD("SEVERE",1000)
C.W=new N.aD("WARNING",900)
C.D=new U.cu(0)
C.a4=new U.cu(1)
C.a5=new U.cu(2)
C.a6=new U.cu(3)
C.z=I.cN([C.D,C.a4,C.a5,C.a6])
C.l=I.cN([])
C.X=new H.bl([0,"Resource.stamina",1,"Resource.balance"],[null,null])
C.Y=new H.i8(0,{},C.l,[null,null])
C.Z=new H.bl([0,"ItemType.spear",1,"ItemType.branch",2,"ItemType.tent",3,"ItemType.sword"],[null,null])
C.a_=new H.bl([0,"Result.success",1,"Result.failure",2,"Result.criticalSuccess",3,"Result.criticalFailure"],[null,null])
C.a0=new H.bl([0,"Predetermination.none",1,"Predetermination.successGuaranteed",2,"Predetermination.failureGuaranteed"],[null,null])
C.a1=new H.bl([0,"KnownToMode.all",1,"KnownToMode.protagonistOnly",2,"KnownToMode.custom"],[null,null])
C.A=new H.bl([0,"Pose.standing",1,"Pose.offBalance",2,"Pose.onGround"],[null,null])
C.i=new R.dh(0)
C.k=new R.dh(1)
C.o=new R.dh(2)
C.r=new K.di(0)
C.t=new K.di(1)
C.m=new K.di(2)
C.B=new Y.bI("he","him","his","himself")
C.j=new Y.bI("it","it","its","itself")
C.a2=new Y.bI("she","her","her","herself")
C.a3=new Y.bI("they","them","their","themselves")
C.C=new Y.bI("you","you","your","yourself")
C.e=new Q.kn(0)
C.a7=H.aT("et")
C.a8=H.aT("aR")
C.a9=H.aT("o")
C.aa=H.aT("S")
C.ab=H.aT("az")
C.n=H.aT("dynamic")
C.ac=H.aT("r")
C.ad=H.aT("K")
C.ae=new P.br(null,2)
$.eO=1
$.eK="$cachedFunction"
$.eL="$cachedInvocation"
$.ao=0
$.bi=null
$.e6=null
$.ba=null
$.bu=null
$.bv=null
$.dJ=!1
$.l=C.f
$.ek=0
$.dW=null
$.fF=!1
$.nS=null
$.fH=!1
$.h2=!0
$.cC=!1
$.h0=!1
$.oQ=C.U
$.o_=C.y
$.eB=0
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
I.$lazy(y,x,w)}})(["en","$get$en",function(){return H.j9()},"eo","$get$eo",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ek
$.ek=z+1
z="expando$key$"+z}return new P.iL(null,z,[P.r])},"fd","$get$fd",function(){return H.au(H.cE({
toString:function(){return"$receiver$"}}))},"fe","$get$fe",function(){return H.au(H.cE({$method$:null,
toString:function(){return"$receiver$"}}))},"ff","$get$ff",function(){return H.au(H.cE(null))},"fg","$get$fg",function(){return H.au(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fk","$get$fk",function(){return H.au(H.cE(void 0))},"fl","$get$fl",function(){return H.au(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fi","$get$fi",function(){return H.au(H.fj(null))},"fh","$get$fh",function(){return H.au(function(){try{null.$method$}catch(z){return z.message}}())},"fn","$get$fn",function(){return H.au(H.fj(void 0))},"fm","$get$fm",function(){return H.au(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dy","$get$dy",function(){return P.mz()},"aW","$get$aW",function(){return P.j0(null,null)},"bw","$get$bw",function(){return[]},"bn","$get$bn",function(){return N.aZ("PlannerRecommendation")},"dR","$get$dR",function(){return K.kq("__END_OF_ROAM__","","",null,null,[],"ground")},"aK","$get$aK",function(){return P.dk(null)},"b2","$get$b2",function(){return P.dk(null)},"h4","$get$h4",function(){return N.aZ("Storyline")},"f5","$get$f5",function(){return P.b3("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"dQ","$get$dQ",function(){return L.dx(new L.ob())},"aM","$get$aM",function(){return L.dx(new L.oa())},"dY","$get$dY",function(){return L.dx(new L.oi())},"df","$get$df",function(){return new F.jU("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"dN","$get$dN",function(){return Y.d_(!1,"balance",!0,C.j,$.$get$aM())},"h7","$get$h7",function(){return Y.d_(!1,"pounding",!1,C.j,$.$get$aM())},"eP","$get$eP",function(){return new B.kl("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"eU","$get$eU",function(){return new O.kE(null,!1,!1,null,null)},"f1","$get$f1",function(){return new Q.lb(null,!1,!0,C.e,null)},"fq","$get$fq",function(){return new M.ma("",!0,C.e,!1,null)},"fG","$get$fG",function(){return P.dk(null)},"ha","$get$ha",function(){return Y.d_(!1,"swing",!0,C.j,$.$get$aM())},"cQ","$get$cQ",function(){return P.lQ("")},"bX","$get$bX",function(){var z=new O.k6(0,null,"PointsCounter")
z.hc()
return z},"bx","$get$bx",function(){return new L.e9(null,H.w([],[L.Z]))},"c1","$get$c1",function(){return H.ex(P.o,P.d)},"bW","$get$bW",function(){return P.aP(null,{func:1,ret:[P.P,P.aR]})},"cb","$get$cb",function(){return P.b3("^\\s*<<<\\s*$",!0,!1)},"cB","$get$cB",function(){return H.ex(P.o,Z.as)},"eD","$get$eD",function(){return N.aZ("")},"eC","$get$eC",function(){return P.ez(P.o,N.da)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.o,args:[R.G,A.b7,Y.at]},{func:1,v:true},{func:1,ret:Q.L,args:[R.G]},{func:1,args:[,,]},{func:1,ret:P.o,args:[P.r]},{func:1,args:[P.r]},{func:1,args:[R.G]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.o]},{func:1,args:[,P.aG]},{func:1,v:true,args:[,],opt:[P.aG]},{func:1,ret:P.K,args:[A.Y]},{func:1,args:[P.az]},{func:1,ret:P.P},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bj,args:[P.r]},{func:1,args:[Z.as]},{func:1,ret:P.o,args:[Q.af]},{func:1,args:[P.S]},{func:1,ret:P.K,args:[A.c4]},{func:1,v:true,args:[P.d,P.aG]},{func:1,args:[[P.J,Y.a5],Y.a5]},{func:1,args:[Y.a5]},{func:1,args:[P.b_]},{func:1,v:true,args:[,P.aG]},{func:1,ret:P.S,args:[[P.x,P.r]]},{func:1,ret:P.S,args:[P.r]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[[P.J,P.o],P.eV]},{func:1,ret:[P.P,U.bM],args:[P.az,P.o],named:{rerollEffectDescription:P.o,rerollable:P.S}},{func:1,args:[L.Z]},{func:1,args:[P.o,,]},{func:1,args:[P.o,Z.cz]},{func:1,args:[{func:1,v:true}]},{func:1,ret:P.o,args:[P.o]},{func:1,args:[P.r,R.G]},{func:1,ret:P.r,args:[P.O,P.O]},{func:1,ret:P.S,args:[L.Z]},{func:1,ret:P.r,args:[R.G]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,args:[P.K,R.G]},{func:1,ret:Q.cg,args:[Q.aV]},{func:1,args:[P.r,,]},{func:1,ret:L.Z,args:[P.o],named:{deferToChoiceList:P.S,deferToEndOfPage:P.S,goto:P.o,helpMessage:P.o,script:{func:1,ret:[P.P,P.aR]},submenu:P.o}},{func:1,args:[,],opt:[,]}]
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
if(x==y)H.p7(d||a)
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
Isolate.cN=a.cN
Isolate.aL=a.aL
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.h9(X.fT(),b)},[])
else (function(b){H.h9(X.fT(),b)})([])})})()