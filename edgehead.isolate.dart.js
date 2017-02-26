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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dG"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dG"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dG(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",p7:{"^":"d;a"}}],["","",,J,{"^":"",
l:function(a){return void 0},
aw:{"^":"d;",
B:function(a,b){return a===b},
gA:function(a){return H.Z(a)},
i:function(a){return H.cm(a)},
gb1:function(a){return new H.ae(H.dM(a),null)}},
eg:{"^":"aw;",
i:function(a){return String(a)},
gA:function(a){return a?519018:218159},
gb1:function(a){return C.a9},
$isQ:1},
ei:{"^":"aw;",
B:function(a,b){return null==b},
i:function(a){return"null"},
gA:function(a){return 0},
gb1:function(a){return C.a7}},
em:{"^":"aw;",
gA:function(a){return 0},
gb1:function(a){return C.a6},
i:function(a){return String(a)},
$isej:1},
pb:{"^":"em;"},
b4:{"^":"em;"},
bC:{"^":"aw;$ti",
f0:function(a,b){if(!!a.immutable$list)throw H.c(new P.R(b))},
cL:function(a,b){if(!!a.fixed$length)throw H.c(new P.R(b))},
t:function(a,b){this.cL(a,"add")
a.push(b)},
bU:function(a){this.cL(a,"removeLast")
if(a.length===0)throw H.c(H.as(a,-1))
return a.pop()},
hX:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sk(a,v)
for(x=0;x<z.length;++x)this.l(a,x,z[x])},
bA:function(a,b){return new H.O(a,b,[H.k(a,0)])},
as:function(a,b){var z
this.cL(a,"addAll")
for(z=J.aa(b);z.v();)a.push(z.d)},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
bb:function(a,b){return new H.ad(a,b,[null,null])},
cj:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.e(y,x)
y[x]=w}return y.join(b)},
d7:function(a,b){return H.f_(a,b,null,H.k(a,0))},
aP:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
b8:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a1())},
f9:function(a,b){return this.b8(a,b,null)},
a3:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gf8:function(a){if(a.length>0)return a[0]
throw H.c(H.a1())},
gJ:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a1())},
gbn:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a1())
throw H.c(H.cZ())},
ax:function(a,b,c,d,e){var z,y,x
this.f0(a,"set range")
P.co(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.U(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.ef())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bO:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cC:function(a,b){var z
this.f0(a,"sort")
z=b==null?P.oe():b
H.bM(a,0,a.length-1,z)},
h3:function(a){return this.cC(a,null)},
dX:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
b9:function(a,b){return this.dX(a,b,0)},
X:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gG:function(a){return a.length===0},
ga8:function(a){return a.length!==0},
i:function(a){return P.aV(a,"[","]")},
by:function(a){return P.az(a,H.k(a,0))},
gO:function(a){return new J.bz(a,a.length,0,null,[H.k(a,0)])},
gA:function(a){return H.Z(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cL(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.c2(b,"newLength",null))
if(b<0)throw H.c(P.U(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.as(a,b))
if(b>=a.length||b<0)throw H.c(H.as(a,b))
return a[b]},
l:function(a,b,c){if(!!a.immutable$list)H.h(new P.R("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.as(a,b))
if(b>=a.length||b<0)throw H.c(H.as(a,b))
a[b]=c},
$isch:1,
$asch:I.aG,
$isH:1,
$isV:1},
p6:{"^":"bC;$ti"},
bz:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.a9(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bD:{"^":"aw;",
b6:function(a,b){var z
if(typeof b!=="number")throw H.c(H.P(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbQ(b)
if(this.gbQ(a)===z)return 0
if(this.gbQ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbQ:function(a){return a===0?1/a<0:a<0},
e9:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.R(""+a+".round()"))},
cr:function(a,b){var z
if(b>20)throw H.c(P.U(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbQ(a))return"-"+z
return z},
jD:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.U(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.aW(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.R("Unexpected toString result: "+z))
x=J.F(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.bE("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
ei:function(a){return-a},
a1:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a+b},
aq:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a-b},
d0:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a/b},
bE:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a*b},
ab:function(a,b){return(a|0)===a?a/b|0:this.i3(a,b)},
i3:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.R("Result of truncating division is "+H.a(z)+": "+H.a(a)+" ~/ "+b))},
c9:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ah:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<b},
bm:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>b},
bD:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<=b},
bB:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>=b},
gb1:function(a){return C.ac},
$isJ:1},
eh:{"^":"bD;",
gb1:function(a){return C.ab},
$isat:1,
$isJ:1,
$isr:1},
j_:{"^":"bD;",
gb1:function(a){return C.aa},
$isat:1,
$isJ:1},
bE:{"^":"aw;",
aW:function(a,b){if(b<0)throw H.c(H.as(a,b))
if(b>=a.length)throw H.c(H.as(a,b))
return a.charCodeAt(b)},
dO:function(a,b,c){if(c>b.length)throw H.c(P.U(c,0,b.length,null,null))
return new H.nk(b,a,c)},
dN:function(a,b){return this.dO(a,b,0)},
fj:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.U(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.aW(b,c+y)!==this.aW(a,y))return
return new H.eZ(c,b,a)},
a1:function(a,b){if(typeof b!=="string")throw H.c(P.c2(b,null,null))
return a+b},
dS:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bh(a,y-z)},
js:function(a,b,c){H.bc(c)
return H.p(a,b,c)},
jt:function(a,b,c,d){H.bc(c)
P.k2(d,0,a.length,"startIndex",null)
return H.bx(a,b,c,d)},
cU:function(a,b,c){return this.jt(a,b,c,0)},
h5:function(a,b,c){var z
if(c>a.length)throw H.c(P.U(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.ha(b,a,c)!=null},
d8:function(a,b){return this.h5(a,b,0)},
az:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.P(c))
if(b<0)throw H.c(P.bH(b,null,null))
if(typeof c!=="number")return H.A(c)
if(b>c)throw H.c(P.bH(b,null,null))
if(c>a.length)throw H.c(P.bH(c,null,null))
return a.substring(b,c)},
bh:function(a,b){return this.az(a,b,null)},
fF:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aW(z,0)===133){x=J.d_(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aW(z,w)===133?J.j0(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jE:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.aW(z,0)===133?J.d_(z,1):0}else{y=J.d_(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bE:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.G)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
dX:function(a,b,c){if(c>a.length)throw H.c(P.U(c,0,a.length,null,null))
return a.indexOf(b,c)},
b9:function(a,b){return this.dX(a,b,0)},
jc:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
jb:function(a,b){return this.jc(a,b,null)},
is:function(a,b,c){if(b==null)H.h(H.P(b))
if(c>a.length)throw H.c(P.U(c,0,a.length,null,null))
return H.oQ(a,b,c)},
X:function(a,b){return this.is(a,b,0)},
gG:function(a){return a.length===0},
ga8:function(a){return a.length!==0},
b6:function(a,b){var z
if(typeof b!=="string")throw H.c(H.P(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gb1:function(a){return C.a8},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.as(a,b))
if(b>=a.length||b<0)throw H.c(H.as(a,b))
return a[b]},
$isch:1,
$asch:I.aG,
$iso:1,
$isda:1,
p:{
ek:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
d_:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.aW(a,b)
if(y!==32&&y!==13&&!J.ek(y))break;++b}return b},
j0:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.aW(a,z)
if(y!==32&&y!==13&&!J.ek(y))break}return b}}}}],["","",,H,{"^":"",
a1:function(){return new P.N("No element")},
cZ:function(){return new P.N("Too many elements")},
ef:function(){return new P.N("Too few elements")},
bM:function(a,b,c,d){if(c-b<=32)H.eP(a,b,c,d)
else H.eO(a,b,c,d)},
eP:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.F(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a0(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
eO:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.ab(c-b+1,6)
y=b+z
x=c-z
w=C.c.ab(b+c,2)
v=w-z
u=w+z
t=J.F(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a0(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a0(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a0(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a0(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(p,o),0)){n=o
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
h=J.l(i)
if(h.B(i,0))continue
if(h.ah(i,0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.a8(i)
if(h.bm(i,0)){--l
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
if(J.c0(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.a0(d.$2(j,p),0))for(;!0;)if(J.a0(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c0(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
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
H.bM(a,b,m-2,d)
H.bM(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.f(d.$2(t.h(a,m),r),0);)++m
for(;J.f(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.f(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.f(d.$2(j,p),0))for(;!0;)if(J.f(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c0(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}H.bM(a,m,l,d)}else H.bM(a,m,l,d)},
V:{"^":"x;$ti"},
am:{"^":"V;$ti",
gO:function(a){return new H.ci(this,this.gk(this),0,null,[H.v(this,"am",0)])},
H:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.a3(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gG:function(a){return this.gk(this)===0},
gJ:function(a){if(this.gk(this)===0)throw H.c(H.a1())
return this.a3(0,this.gk(this)-1)},
X:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.f(this.a3(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
b8:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.a3(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
cj:function(a,b){var z,y,x,w
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.a(this.a3(0,0))
if(z!==this.gk(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.a(this.a3(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.a(this.a3(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bA:function(a,b){return this.ep(0,b)},
bb:function(a,b){return new H.ad(this,b,[H.v(this,"am",0),null])},
aP:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.a3(0,x))
if(z!==this.gk(this))throw H.c(new P.B(this))}return y},
bd:function(a,b){var z,y,x,w
z=[H.v(this,"am",0)]
if(b){y=H.w([],z)
C.a.sk(y,this.gk(this))}else{x=new Array(this.gk(this))
x.fixed$length=Array
y=H.w(x,z)}for(w=0;w<this.gk(this);++w){z=this.a3(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
bV:function(a){return this.bd(a,!0)},
by:function(a){var z,y
z=P.G(null,null,null,H.v(this,"am",0))
for(y=0;y<this.gk(this);++y)z.t(0,this.a3(0,y))
return z}},
lB:{"^":"am;a,b,c,$ti",
ghy:function(){var z=J.av(this.a)
return z},
gi1:function(){var z,y
z=J.av(this.a)
y=this.b
if(y>z)return z
return y},
gk:function(a){var z,y
z=J.av(this.a)
y=this.b
if(y>=z)return 0
return z-y},
a3:function(a,b){var z,y
z=this.gi1()+b
if(!(b<0)){y=this.ghy()
if(typeof y!=="number")return H.A(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cd(b,this,"index",null,null))
return J.dT(this.a,z)},
bd:function(a,b){var z,y,x,w,v,u,t,s,r
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
t=H.w(s,u)}for(r=0;r<v;++r){u=x.a3(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gk(y)<w)throw H.c(new P.B(this))}return t},
hf:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.U(z,0,null,"start",null))},
p:{
f_:function(a,b,c,d){var z=new H.lB(a,b,c,[d])
z.hf(a,b,c,d)
return z}}},
ci:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.gk(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.a3(0,x);++this.c
return!0}},
cj:{"^":"x;a,b,$ti",
gO:function(a){return new H.jj(null,J.aa(this.a),this.b,this.$ti)},
gk:function(a){return J.av(this.a)},
gG:function(a){return J.h6(this.a)},
gJ:function(a){return this.b.$1(J.h7(this.a))},
$asx:function(a,b){return[b]},
p:{
bl:function(a,b,c,d){if(!!J.l(a).$isV)return new H.cS(a,b,[c,d])
return new H.cj(a,b,[c,d])}}},
cS:{"^":"cj;a,b,$ti",$isV:1,
$asV:function(a,b){return[b]}},
jj:{"^":"cg;a,b,c,$ti",
v:function(){var z=this.b
if(z.v()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascg:function(a,b){return[b]}},
ad:{"^":"am;a,b,$ti",
gk:function(a){return J.av(this.a)},
a3:function(a,b){return this.b.$1(J.dT(this.a,b))},
$asam:function(a,b){return[b]},
$asV:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
O:{"^":"x;a,b,$ti",
gO:function(a){return new H.fi(J.aa(this.a),this.b,this.$ti)},
bb:function(a,b){return new H.cj(this,b,[H.k(this,0),null])}},
fi:{"^":"cg;a,b,$ti",
v:function(){var z,y
for(z=this.a,y=this.b;z.v();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
eL:{"^":"x;a,b,$ti",
gO:function(a){return new H.kT(J.aa(this.a),this.b,this.$ti)},
eq:function(a,b,c){},
p:{
kS:function(a,b,c){var z
if(!!J.l(a).$isV){z=new H.iv(a,b,[c])
z.eq(a,b,c)
return z}return H.kR(a,b,c)},
kR:function(a,b,c){var z=new H.eL(a,b,[c])
z.eq(a,b,c)
return z}}},
iv:{"^":"eL;a,b,$ti",
gk:function(a){var z=J.av(this.a)-this.b
if(z>=0)return z
return 0},
$isV:1},
kT:{"^":"cg;a,b,$ti",
v:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.v()
this.b=0
return z.v()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
bT:function(a,b){var z=a.ce(b)
if(!init.globalState.d.cy)init.globalState.f.b0()
return z},
h0:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isH)throw H.c(P.E("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.n4(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$ed()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.mC(P.aL(null,H.bQ),0)
x=P.r
y.z=new H.I(0,null,null,null,null,null,0,[x,H.dw])
y.ch=new H.I(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.n3()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.iS,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.n5)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.I(0,null,null,null,null,null,0,[x,H.bI])
x=P.G(null,null,null,x)
v=new H.bI(0,null,!1)
u=new H.dw(y,w,x,init.createNewIsolate(),v,new H.aS(H.cJ()),new H.aS(H.cJ()),!1,!1,[],P.G(null,null,null,null),null,null,!1,!0,P.G(null,null,null,null))
x.t(0,0)
u.dd(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bX()
if(H.ag(y,[y]).aL(a))u.ce(new H.oI(z,a))
else if(H.ag(y,[y,y]).aL(a))u.ce(new H.oJ(z,a))
else u.ce(a)
init.globalState.f.b0()},
iW:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.iX()
return},
iX:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.R("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.R('Cannot extract URI from "'+H.a(z)+'"'))},
iS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cB(!0,[]).bs(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cB(!0,[]).bs(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cB(!0,[]).bs(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.r
p=new H.I(0,null,null,null,null,null,0,[q,H.bI])
q=P.G(null,null,null,q)
o=new H.bI(0,null,!1)
n=new H.dw(y,p,q,init.createNewIsolate(),o,new H.aS(H.cJ()),new H.aS(H.cJ()),!1,!1,[],P.G(null,null,null,null),null,null,!1,!0,P.G(null,null,null,null))
q.t(0,0)
n.dd(0,o)
init.globalState.f.a.af(new H.bQ(n,new H.iT(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b0()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").w(y.h(z,"msg"))
init.globalState.f.b0()
break
case"close":init.globalState.ch.aH(0,$.$get$ee().h(0,a))
a.terminate()
init.globalState.f.b0()
break
case"log":H.iR(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a6(["command","print","msg",z])
q=new H.b7(!0,P.bs(null,P.r)).aS(q)
y.toString
self.postMessage(q)}else P.dQ(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
iR:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a6(["command","log","msg",a])
x=new H.b7(!0,P.bs(null,P.r)).aS(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.z(w)
throw H.c(P.cb(z))}},
iU:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.ey=$.ey+("_"+y)
$.ez=$.ez+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.w(["spawned",new H.bS(y,x),w,z.r])
x=new H.iV(a,b,c,d,z)
if(e===!0){z.eY(w,w)
init.globalState.f.a.af(new H.bQ(z,x,"start isolate"))}else x.$0()},
nB:function(a){return new H.cB(!0,[]).bs(new H.b7(!1,P.bs(null,P.r)).aS(a))},
oI:{"^":"b:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
oJ:{"^":"b:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
n4:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",p:{
n5:function(a){var z=P.a6(["command","print","msg",a])
return new H.b7(!0,P.bs(null,P.r)).aS(z)}}},
dw:{"^":"d;m:a<,b,c,j8:d<,it:e<,f,r,x,ci:y<,z,Q,ch,cx,cy,db,dx",
eY:function(a,b){if(!this.f.B(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.cc()},
jr:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aH(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.eX(x)}this.y=!1}this.cc()},
ij:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jp:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.R("removeRange"))
P.co(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fY:function(a,b){if(!this.r.B(0,a))return
this.db=b},
iO:function(a,b,c){var z=J.l(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){a.w(c)
return}z=this.cx
if(z==null){z=P.aL(null,null)
this.cx=z}z.af(new H.mU(a,c))},
iN:function(a,b){var z
if(!this.r.B(0,a))return
z=J.l(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){this.e1()
return}z=this.cx
if(z==null){z=P.aL(null,null)
this.cx=z}z.af(this.gj9())},
iP:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.dQ(a)
if(b!=null)P.dQ(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.aN(z,z.r,null,null,[null]),x.c=z.e;x.v();)x.d.w(y)},
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
this.iP(w,v)
if(this.db===!0){this.e1()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gj8()
if(this.cx!=null)for(;t=this.cx,!t.gG(t);)this.cx.cT().$0()}return y},
fi:function(a){return this.b.h(0,a)},
dd:function(a,b){var z=this.b
if(z.K(a))throw H.c(P.cb("Registry: ports must be registered only once."))
z.l(0,a,b)},
cc:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.e1()},
e1:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aG(0)
for(z=this.b,y=z.gbX(),y=y.gO(y);y.v();)y.gF().hu()
z.aG(0)
this.c.aG(0)
init.globalState.z.aH(0,this.a)
this.dx.aG(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.w(z[v])}this.ch=null}},"$0","gj9",0,0,3]},
mU:{"^":"b:3;a,b",
$0:function(){this.a.w(this.b)}},
mC:{"^":"d;a,b",
iy:function(){var z=this.a
if(z.b===z.c)return
return z.cT()},
fD:function(){var z,y,x
z=this.iy()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.K(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gG(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cb("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gG(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a6(["command","close"])
x=new H.b7(!0,new P.fp(0,null,null,null,null,null,0,[null,P.r])).aS(x)
y.toString
self.postMessage(x)}return!1}z.jo()
return!0},
eR:function(){if(self.window!=null)new H.mD(this).$0()
else for(;this.fD(););},
b0:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eR()
else try{this.eR()}catch(x){w=H.y(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.a6(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.b7(!0,P.bs(null,P.r)).aS(v)
w.toString
self.postMessage(v)}}},
mD:{"^":"b:3;a",
$0:function(){if(!this.a.fD())return
P.lQ(C.w,this)}},
bQ:{"^":"d;a,b,c",
jo:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ce(this.b)}},
n3:{"^":"d;"},
iT:{"^":"b:1;a,b,c,d,e,f",
$0:function(){H.iU(this.a,this.b,this.c,this.d,this.e,this.f)}},
iV:{"^":"b:3;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bX()
if(H.ag(x,[x,x]).aL(y))y.$2(this.b,this.c)
else if(H.ag(x,[x]).aL(y))y.$1(this.b)
else y.$0()}z.cc()}},
fl:{"^":"d;"},
bS:{"^":"fl;b,a",
w:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.geH())return
x=H.nB(a)
if(z.git()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.eY(y.h(x,1),y.h(x,2))
break
case"resume":z.jr(y.h(x,1))
break
case"add-ondone":z.ij(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.jp(y.h(x,1))
break
case"set-errors-fatal":z.fY(y.h(x,1),y.h(x,2))
break
case"ping":z.iO(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.iN(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.t(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aH(0,y)
break}return}init.globalState.f.a.af(new H.bQ(z,new H.n7(this,x),"receive"))},
B:function(a,b){if(b==null)return!1
return b instanceof H.bS&&J.f(this.b,b.b)},
gA:function(a){return this.b.gdu()}},
n7:{"^":"b:1;a,b",
$0:function(){var z=this.a.b
if(!z.geH())z.hl(this.b)}},
dz:{"^":"fl;b,c,a",
w:function(a){var z,y,x
z=P.a6(["command","message","port",this,"msg",a])
y=new H.b7(!0,P.bs(null,P.r)).aS(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
B:function(a,b){if(b==null)return!1
return b instanceof H.dz&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ek()
y=this.a
if(typeof y!=="number")return y.ek()
x=this.c
if(typeof x!=="number")return H.A(x)
return(z<<16^y<<8^x)>>>0}},
bI:{"^":"d;du:a<,b,eH:c<",
hu:function(){this.c=!0
this.b=null},
aV:function(){var z,y
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
$isk3:1},
k4:{"^":"a3;a,b",
ag:function(a,b,c,d){var z=this.b
z.toString
return new P.cA(z,[H.k(z,0)]).ag(a,b,c,d)},
e4:function(a,b,c){return this.ag(a,null,b,c)},
aV:[function(){this.a.aV()
this.b.aV()},"$0","giq",0,0,3],
hd:function(a){var z=P.eW(this.giq(),null,null,null,!0,null)
this.b=z
this.a.b=z.gi8(z)},
$asa3:I.aG},
lM:{"^":"d;a,b,c",
hg:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.af(new H.bQ(y,new H.lO(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cG(new H.lP(this,b),0),a)}else throw H.c(new P.R("Timer greater than 0."))},
p:{
lN:function(a,b){var z=new H.lM(!0,!1,null)
z.hg(a,b)
return z}}},
lO:{"^":"b:3;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
lP:{"^":"b:3;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aS:{"^":"d;du:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.jM()
z=C.h.c9(z,0)^C.h.ab(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
B:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aS){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b7:{"^":"d;a,b",
aS:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gk(z))
z=J.l(a)
if(!!z.$isch)return this.fU(a)
if(!!z.$isiP){x=this.gfR()
z=a.gbR()
z=H.bl(z,x,H.v(z,"x",0),null)
z=P.Y(z,!0,H.v(z,"x",0))
w=a.gbX()
w=H.bl(w,x,H.v(w,"x",0),null)
return["map",z,P.Y(w,!0,H.v(w,"x",0))]}if(!!z.$isej)return this.fV(a)
if(!!z.$isaw)this.fG(a)
if(!!z.$isk3)this.cs(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbS)return this.fW(a)
if(!!z.$isdz)return this.fX(a)
if(!!z.$isb){v=a.$static_name
if(v==null)this.cs(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaS)return["capability",a.a]
if(!(a instanceof P.d))this.fG(a)
return["dart",init.classIdExtractor(a),this.fT(init.classFieldsExtractor(a))]},"$1","gfR",2,0,0],
cs:function(a,b){throw H.c(new P.R(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
fG:function(a){return this.cs(a,null)},
fU:function(a){var z=this.fS(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cs(a,"Can't serialize indexable: ")},
fS:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aS(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
fT:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.aS(a[z]))
return a},
fV:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cs(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aS(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
fX:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fW:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdu()]
return["raw sendport",a]}},
cB:{"^":"d;a,b",
bs:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.a(a)))
switch(C.a.gf8(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
case"map":return this.iB(a)
case"sendport":return this.iC(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iA(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.aS(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cd(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.a(a))}},"$1","giz",2,0,0],
cd:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.A(x)
if(!(y<x))break
z.l(a,y,this.bs(z.h(a,y)));++y}return a},
iB:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.ay()
this.b.push(w)
y=J.dU(y,this.giz()).bV(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.e(y,u)
w.l(0,y[u],this.bs(v.h(x,u)))}return w},
iC:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.fi(w)
if(u==null)return
t=new H.bS(u,x)}else t=new H.dz(y,w,x)
this.b.push(t)
return t},
iA:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.A(t)
if(!(u<t))break
w[z.h(y,u)]=this.bs(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
hU:function(){throw H.c(new P.R("Cannot modify unmodifiable Map"))},
fV:function(a){return init.getTypeFromName(a)},
on:function(a){return init.types[a]},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.i(a)
if(typeof z!=="string")throw H.c(H.P(a))
return z},
Z:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
b_:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.I||!!J.l(a).$isb4){v=C.M(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.aW(w,0)===36)w=C.b.bh(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cH(H.bY(a),0,null),init.mangledGlobalNames)},
cm:function(a){return"Instance of '"+H.b_(a)+"'"},
a7:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.c9(z,10))>>>0,56320|z&1023)}throw H.c(P.U(a,0,1114111,null,null))},
aZ:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dd:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
return a[b]},
eA:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
a[b]=c},
A:function(a){throw H.c(H.P(a))},
e:function(a,b){if(a==null)J.av(a)
throw H.c(H.as(a,b))},
as:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aJ(!0,b,"index",null)
z=J.av(a)
if(!(b<0)){if(typeof z!=="number")return H.A(z)
y=b>=z}else y=!0
if(y)return P.cd(b,a,"index",null,z)
return P.bH(b,"index",null)},
P:function(a){return new P.aJ(!0,a,null,null)},
bc:function(a){if(typeof a!=="string")throw H.c(H.P(a))
return a},
c:function(a){var z
if(a==null)a=new P.ck()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.h3})
z.name=""}else z.toString=H.h3
return z},
h3:function(){return J.i(this.dartException)},
h:function(a){throw H.c(a)},
a9:function(a){throw H.c(new P.B(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.oX(a)
if(a==null)return
if(a instanceof H.cV)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.c9(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d1(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.et(v,null))}}if(a instanceof TypeError){u=$.$get$f3()
t=$.$get$f4()
s=$.$get$f5()
r=$.$get$f6()
q=$.$get$fa()
p=$.$get$fb()
o=$.$get$f8()
$.$get$f7()
n=$.$get$fd()
m=$.$get$fc()
l=u.aZ(y)
if(l!=null)return z.$1(H.d1(y,l))
else{l=t.aZ(y)
if(l!=null){l.method="call"
return z.$1(H.d1(y,l))}else{l=s.aZ(y)
if(l==null){l=r.aZ(y)
if(l==null){l=q.aZ(y)
if(l==null){l=p.aZ(y)
if(l==null){l=o.aZ(y)
if(l==null){l=r.aZ(y)
if(l==null){l=n.aZ(y)
if(l==null){l=m.aZ(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.et(y,l==null?null:l.method))}}return z.$1(new H.lW(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.eQ()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aJ(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.eQ()
return a},
z:function(a){var z
if(a instanceof H.cV)return a.b
if(a==null)return new H.fs(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fs(a,null)},
fX:function(a){if(a==null||typeof a!='object')return J.m(a)
else return H.Z(a)},
fN:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
op:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bT(b,new H.oq(a))
case 1:return H.bT(b,new H.or(a,d))
case 2:return H.bT(b,new H.os(a,d,e))
case 3:return H.bT(b,new H.ot(a,d,e,f))
case 4:return H.bT(b,new H.ou(a,d,e,f,g))}throw H.c(P.cb("Unsupported number of arguments for wrapped closure"))},
cG:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.op)
a.$identity=z
return z},
hS:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isH){z.$reflectionInfo=c
x=H.k6(z).r}else x=c
w=d?Object.create(new H.l8().constructor.prototype):Object.create(new H.cO(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aj
$.aj=J.a_(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.e0(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.on,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.dY:H.cP
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.e0(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
hP:function(a,b,c,d){var z=H.cP
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
e0:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hR(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hP(y,!w,z,b)
if(y===0){w=$.aj
$.aj=J.a_(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.bh
if(v==null){v=H.c5("self")
$.bh=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aj
$.aj=J.a_(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.bh
if(v==null){v=H.c5("self")
$.bh=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
hQ:function(a,b,c,d){var z,y
z=H.cP
y=H.dY
switch(b?-1:a){case 0:throw H.c(new H.ki("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hR:function(a,b){var z,y,x,w,v,u,t,s
z=H.hJ()
y=$.dX
if(y==null){y=H.c5("receiver")
$.dX=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hQ(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.aj
$.aj=J.a_(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.aj
$.aj=J.a_(u,1)
return new Function(y+H.a(u)+"}")()},
dG:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isH){c.fixed$length=Array
z=c}else z=c
return H.hS(a,b,z,!!d,e,f)},
oC:function(a,b){var z=J.F(b)
throw H.c(H.c7(H.b_(a),z.az(b,3,z.gk(b))))},
fT:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.l(a)[b]
else z=!0
if(z)return a
H.oC(a,b)},
oV:function(a){throw H.c(new P.i4(a))},
dJ:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
ag:function(a,b,c){return new H.kj(a,b,c,null)},
ar:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.kl(z)
return new H.kk(z,b,null)},
bX:function(){return C.F},
cJ:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
aQ:function(a){return new H.ae(a,null)},
w:function(a,b){a.$ti=b
return a},
bY:function(a){if(a==null)return
return a.$ti},
fR:function(a,b){return H.dR(a["$as"+H.a(b)],H.bY(a))},
v:function(a,b,c){var z=H.fR(a,b)
return z==null?null:z[c]},
k:function(a,b){var z=H.bY(a)
return z==null?null:z[b]},
W:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cH(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.a(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.W(z,b)
return H.nG(a,b)}return"unknown-reified-type"},
nG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.W(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.W(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.W(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.dK(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.W(r[p],b)+(" "+H.a(p))}w+="}"}return"("+w+") => "+z},
cH:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bq("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.q=v+", "
u=a[y]
if(u!=null)w=!1
v=z.q+=H.W(u,c)}return w?"":"<"+z.i(0)+">"},
dM:function(a){var z,y
z=H.dJ(a)
if(z!=null)return H.W(z,null)
y=J.l(a).constructor.builtin$cls
if(a==null)return y
return y+H.cH(a.$ti,0,null)},
dR:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bW:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bY(a)
y=J.l(a)
if(y[b]==null)return!1
return H.fG(H.dR(y[d],z),c)},
au:function(a,b,c,d){if(a!=null&&!H.bW(a,b,c,d))throw H.c(H.c7(H.b_(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cH(c,0,null),init.mangledGlobalNames)))
return a},
fG:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a4(a[y],b[y]))return!1
return!0},
aP:function(a,b,c){return a.apply(b,H.fR(b,c))},
fI:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="aM"
if(b==null)return!0
z=H.bY(a)
a=J.l(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$signature
if(x==null)return!1
return H.dO(x.apply(a,null),b)}return H.a4(y,b)},
h1:function(a,b){if(a!=null&&!H.fI(a,b))throw H.c(H.c7(H.b_(a),H.W(b,null)))
return a},
a4:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aM")return!0
if('func' in b)return H.dO(a,b)
if('func' in a)return b.builtin$cls==="bj"||b.builtin$cls==="d"
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
return H.fG(H.dR(u,z),x)},
fF:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a4(z,v)||H.a4(v,z)))return!1}return!0},
nS:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a4(v,u)||H.a4(u,v)))return!1}return!0},
dO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a4(z,y)||H.a4(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fF(x,w,!1))return!1
if(!H.fF(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a4(o,n)||H.a4(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a4(o,n)||H.a4(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a4(o,n)||H.a4(n,o)))return!1}}return H.nS(a.named,b.named)},
oQ:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.l(b)
if(!!z.$isel){z=C.b.bh(a,c)
return b.b.test(z)}else{z=z.dN(b,C.b.bh(a,c))
return!z.gG(z)}}},
p:function(a,b,c){var z,y,x
H.bc(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.a(c)
for(x=0;x<z;++x)y=y+a[x]+H.a(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
pz:[function(a){return a},"$1","nI",2,0,36],
oR:function(a,b,c,d){var z,y,x,w,v,u
d=H.nI()
z=J.l(b)
if(!z.$isda)throw H.c(P.c2(b,"pattern","is not a Pattern"))
for(z=z.dN(b,a),z=new H.fj(z.a,z.b,z.c,null),y=0,x="";z.v();){w=z.d
v=w.b
u=v.index
x=x+H.a(d.$1(C.b.az(a,y,u)))+H.a(c.$1(w))
y=u+v[0].length}z=x+H.a(d.$1(C.b.bh(a,y)))
return z.charCodeAt(0)==0?z:z},
bx:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.oS(a,z,z+b.length,c)},
oS:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.a(d)+y},
e3:{"^":"d;$ti",
gG:function(a){return this.gk(this)===0},
ga8:function(a){return this.gk(this)!==0},
i:function(a){return P.d5(this)},
l:function(a,b,c){return H.hU()},
$isC:1},
hV:{"^":"e3;a,b,c,$ti",
gk:function(a){return this.a},
K:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.K(b))return
return this.eD(b)},
eD:function(a){return this.b[a]},
H:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eD(w))}}},
bk:{"^":"e3;a,$ti",
cE:function(){var z=this.$map
if(z==null){z=new H.I(0,null,null,null,null,null,0,this.$ti)
H.fN(this.a,z)
this.$map=z}return z},
K:function(a){return this.cE().K(a)},
h:function(a,b){return this.cE().h(0,b)},
H:function(a,b){this.cE().H(0,b)},
gk:function(a){var z=this.cE()
return z.gk(z)}},
k5:{"^":"d;a,b,c,d,e,f,r,x",p:{
k6:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.k5(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
lR:{"^":"d;a,b,c,d,e,f",
aZ:function(a){var z,y,x
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
ap:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.lR(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cz:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
f9:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
et:{"^":"T;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
j2:{"^":"T;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
p:{
d1:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.j2(a,y,z?null:b.receiver)}}},
lW:{"^":"T;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
cV:{"^":"d;a,aT:b<"},
oX:{"^":"b:0;a",
$1:function(a){if(!!J.l(a).$isT)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fs:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
oq:{"^":"b:1;a",
$0:function(){return this.a.$0()}},
or:{"^":"b:1;a,b",
$0:function(){return this.a.$1(this.b)}},
os:{"^":"b:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ot:{"^":"b:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ou:{"^":"b:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
b:{"^":"d;",
i:function(a){return"Closure '"+H.b_(this)+"'"},
gfN:function(){return this},
$isbj:1,
gfN:function(){return this}},
f2:{"^":"b;"},
l8:{"^":"f2;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cO:{"^":"f2;a,b,c,d",
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cO))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.Z(this.a)
else y=typeof z!=="object"?J.m(z):H.Z(z)
z=H.Z(this.b)
if(typeof y!=="number")return y.jO()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.cm(z)},
p:{
cP:function(a){return a.a},
dY:function(a){return a.c},
hJ:function(){var z=$.bh
if(z==null){z=H.c5("self")
$.bh=z}return z},
c5:function(a){var z,y,x,w,v
z=new H.cO("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
lS:{"^":"T;a",
i:function(a){return this.a},
p:{
lT:function(a,b){return new H.lS("type '"+H.b_(a)+"' is not a subtype of type '"+b+"'")}}},
hL:{"^":"T;a",
i:function(a){return this.a},
p:{
c7:function(a,b){return new H.hL("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ki:{"^":"T;a",
i:function(a){return"RuntimeError: "+H.a(this.a)}},
cq:{"^":"d;"},
kj:{"^":"cq;a,b,c,d",
aL:function(a){var z=H.dJ(a)
return z==null?!1:H.dO(z,this.b2())},
ev:function(a){return this.hr(a,!0)},
hr:function(a,b){var z,y
if(a==null)return
if(this.aL(a))return a
z=H.W(this.b2(),null)
if(b){y=H.dJ(a)
throw H.c(H.c7(y!=null?H.W(y,null):H.b_(a),z))}else throw H.c(H.lT(a,z))},
b2:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$ispp)z.v=true
else if(!x.$ise7)z.ret=y.b2()
y=this.b
if(y!=null&&y.length!==0)z.args=H.eG(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.eG(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dK(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].b2()}z.named=w}return z},
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
t=H.dK(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].b2())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
p:{
eG:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].b2())
return z}}},
e7:{"^":"cq;",
i:function(a){return"dynamic"},
b2:function(){return}},
kl:{"^":"cq;a",
b2:function(){var z,y
z=this.a
y=H.fV(z)
if(y==null)throw H.c("no type for '"+z+"'")
return y},
i:function(a){return this.a}},
kk:{"^":"cq;a,b,c",
b2:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.fV(z)]
if(0>=y.length)return H.e(y,0)
if(y[0]==null)throw H.c("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.a9)(z),++w)y.push(z[w].b2())
this.c=y
return y},
i:function(a){var z=this.b
return this.a+"<"+(z&&C.a).cj(z,", ")+">"}},
ae:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gA:function(a){return J.m(this.a)},
B:function(a,b){if(b==null)return!1
return b instanceof H.ae&&J.f(this.a,b.a)}},
I:{"^":"d;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gG:function(a){return this.a===0},
ga8:function(a){return!this.gG(this)},
gbR:function(){return new H.j9(this,[H.k(this,0)])},
gbX:function(){return H.bl(this.gbR(),new H.j1(this),H.k(this,0),H.k(this,1))},
K:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eA(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eA(y,a)}else return this.j_(a)},
j_:function(a){var z=this.d
if(z==null)return!1
return this.cg(this.cF(z,this.cf(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c2(z,b)
return y==null?null:y.gbv()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c2(x,b)
return y==null?null:y.gbv()}else return this.j0(b)},
j0:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cF(z,this.cf(a))
x=this.cg(y,a)
if(x<0)return
return y[x].gbv()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dw()
this.b=z}this.es(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dw()
this.c=y}this.es(y,b,c)}else this.j2(b,c)},
j2:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dw()
this.d=z}y=this.cf(a)
x=this.cF(z,y)
if(x==null)this.dI(z,y,[this.dz(a,b)])
else{w=this.cg(x,a)
if(w>=0)x[w].sbv(b)
else x.push(this.dz(a,b))}},
fv:function(a,b){var z
if(this.K(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
aH:function(a,b){if(typeof b==="string")return this.eQ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eQ(this.c,b)
else return this.j1(b)},
j1:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cF(z,this.cf(a))
x=this.cg(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eT(w)
return w.gbv()},
aG:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
es:function(a,b,c){var z=this.c2(a,b)
if(z==null)this.dI(a,b,this.dz(b,c))
else z.sbv(c)},
eQ:function(a,b){var z
if(a==null)return
z=this.c2(a,b)
if(z==null)return
this.eT(z)
this.eB(a,b)
return z.gbv()},
dz:function(a,b){var z,y
z=new H.j8(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eT:function(a){var z,y
z=a.ghT()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cf:function(a){return J.m(a)&0x3ffffff},
cg:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gff(),b))return y
return-1},
i:function(a){return P.d5(this)},
c2:function(a,b){return a[b]},
cF:function(a,b){return a[b]},
dI:function(a,b,c){a[b]=c},
eB:function(a,b){delete a[b]},
eA:function(a,b){return this.c2(a,b)!=null},
dw:function(){var z=Object.create(null)
this.dI(z,"<non-identifier-key>",z)
this.eB(z,"<non-identifier-key>")
return z},
$isiP:1,
$isC:1,
p:{
en:function(a,b){return new H.I(0,null,null,null,null,null,0,[a,b])}}},
j1:{"^":"b:0;a",
$1:function(a){return this.a.h(0,a)}},
j8:{"^":"d;ff:a<,bv:b@,c,hT:d<,$ti"},
j9:{"^":"V;a,$ti",
gk:function(a){return this.a.a},
gG:function(a){return this.a.a===0},
gO:function(a){var z,y
z=this.a
y=new H.ja(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
X:function(a,b){return this.a.K(b)},
H:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
ja:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
el:{"^":"d;a,b,c,d",
i:function(a){return"RegExp/"+this.a+"/"},
ghP:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.d0(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghO:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.d0(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dO:function(a,b,c){if(c>b.length)throw H.c(P.U(c,0,b.length,null,null))
return new H.mi(this,b,c)},
dN:function(a,b){return this.dO(a,b,0)},
hA:function(a,b){var z,y
z=this.ghP()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fr(this,y)},
hz:function(a,b){var z,y
z=this.ghO()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fr(this,y)},
fj:function(a,b,c){if(c>b.length)throw H.c(P.U(c,0,b.length,null,null))
return this.hz(b,c)},
$isda:1,
p:{
d0:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.ec("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fr:{"^":"d;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isaY:1},
mi:{"^":"cf;a,b,c",
gO:function(a){return new H.fj(this.a,this.b,this.c,null)},
$ascf:function(){return[P.aY]},
$asx:function(){return[P.aY]}},
fj:{"^":"d;a,b,c,d",
gF:function(){return this.d},
v:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hA(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
eZ:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.h(P.bH(b,null,null))
return this.c},
$isaY:1},
nk:{"^":"x;a,b,c",
gO:function(a){return new H.nl(this.a,this.b,this.c,null)},
$asx:function(){return[P.aY]}},
nl:{"^":"d;a,b,c,d",
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
this.d=new H.eZ(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
dK:function(a){var z=H.w(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
oB:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
mj:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.nT()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cG(new P.ml(z),1)).observe(y,{childList:true})
return new P.mk(z,y,x)}else if(self.setImmediate!=null)return P.nU()
return P.nV()},
pr:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cG(new P.mm(a),0))},"$1","nT",2,0,8],
ps:[function(a){++init.globalState.f.b
self.setImmediate(H.cG(new P.mn(a),0))},"$1","nU",2,0,8],
pt:[function(a){P.dm(C.w,a)},"$1","nV",2,0,8],
t:function(a,b,c){if(b===0){c.br(a)
return}else if(b===1){c.dR(H.y(a),H.z(a))
return}P.ft(a,b)
return c.gfb()},
ft:function(a,b){var z,y,x,w
z=new P.nv(b)
y=new P.nw(b)
x=J.l(a)
if(!!x.$isD)a.dJ(z,y)
else if(!!x.$isM)a.eb(z,y)
else{w=new P.D(0,$.n,null,[null])
w.a=4
w.c=a
w.dJ(z,null)}},
af:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.nQ(z)},
cE:function(a,b,c){var z,y,x
if(b===0){if(c.gdZ())c.c.dQ()
else c.a.aV()
return}else if(b===1){if(c.gdZ())c.c.dR(H.y(a),H.z(a))
else{z=H.y(a)
y=H.z(a)
c.a.dM(z,y)
c.a.aV()}return}if(a instanceof P.br){if(c.gdZ()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.cL(c.a,z)
P.bZ(new P.nt(b,c))
return}else if(z===1){x=a.a
c.a.il(x,!1).bx(new P.nu(b,c))
return}}P.ft(a,b)},
nP:function(a){return a.gd9()},
dD:function(a,b){var z=H.bX()
if(H.ag(z,[z,z]).aL(a)){b.toString
return a}else{b.toString
return a}},
iN:function(a,b){var z=new P.D(0,$.n,null,[b])
z.aU(a)
return z},
ak:function(a){return new P.nm(new P.D(0,$.n,null,[a]),[a])},
nE:function(a,b,c){$.n.toString
a.aK(b,c)},
nJ:function(){var z,y
for(;z=$.b9,z!=null;){$.bu=null
y=z.gbT()
$.b9=y
if(y==null)$.bt=null
z.gio().$0()}},
py:[function(){$.dB=!0
try{P.nJ()}finally{$.bu=null
$.dB=!1
if($.b9!=null)$.$get$dq().$1(P.fH())}},"$0","fH",0,0,3],
fD:function(a){var z=new P.fk(a,null)
if($.b9==null){$.bt=z
$.b9=z
if(!$.dB)$.$get$dq().$1(P.fH())}else{$.bt.b=z
$.bt=z}},
nO:function(a){var z,y,x
z=$.b9
if(z==null){P.fD(a)
$.bu=$.bt
return}y=new P.fk(a,null)
x=$.bu
if(x==null){y.b=z
$.bu=y
$.b9=y}else{y.b=x.b
x.b=y
$.bu=y
if(y.b==null)$.bt=y}},
bZ:function(a){var z=$.n
if(C.f===z){P.bb(null,null,C.f,a)
return}z.toString
P.bb(null,null,z,z.dP(a,!0))},
pm:function(a,b){return new P.nj(null,a,!1,[b])},
eW:function(a,b,c,d,e,f){return e?new P.no(null,0,null,b,c,d,a,[f]):new P.mw(null,0,null,b,c,d,a,[f])},
dE:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.l(z).$isM)return z
return}catch(w){v=H.y(w)
y=v
x=H.z(w)
v=$.n
v.toString
P.ba(null,null,v,y,x)}},
nK:[function(a,b){var z=$.n
z.toString
P.ba(null,null,z,a,b)},function(a){return P.nK(a,null)},"$2","$1","nX",2,2,11,0],
px:[function(){},"$0","nW",0,0,3],
fC:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.z(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gaY()
w=t
v=x.gaT()
c.$2(w,v)}}},
nx:function(a,b,c,d){var z=a.bP()
if(!!J.l(z).$isM&&z!==$.$get$aU())z.bz(new P.nz(b,c,d))
else b.aK(c,d)},
fu:function(a,b){return new P.ny(a,b)},
fv:function(a,b,c){var z=a.bP()
if(!!J.l(z).$isM&&z!==$.$get$aU())z.bz(new P.nA(b,c))
else b.aJ(c)},
ns:function(a,b,c){$.n.toString
a.bH(b,c)},
lQ:function(a,b){var z=$.n
if(z===C.f){z.toString
return P.dm(a,b)}return P.dm(a,z.dP(b,!0))},
dm:function(a,b){var z=C.c.ab(a.a,1000)
return H.lN(z<0?0:z,b)},
ba:function(a,b,c,d,e){var z={}
z.a=d
P.nO(new P.nM(z,e))},
fz:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
fB:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
fA:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
bb:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dP(d,!(!z||!1))
P.fD(d)},
ml:{"^":"b:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
mk:{"^":"b:35;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
mm:{"^":"b:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
mn:{"^":"b:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
nv:{"^":"b:0;a",
$1:function(a){return this.a.$2(0,a)}},
nw:{"^":"b:10;a",
$2:function(a,b){this.a.$2(1,new H.cV(a,b))}},
nQ:{"^":"b:44;a",
$2:function(a,b){this.a(a,b)}},
nt:{"^":"b:1;a,b",
$0:function(){var z=this.b
if(z.a.gci()){z.b=!0
return}this.a.$2(null,0)}},
nu:{"^":"b:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
mo:{"^":"d;a,b,c",
gd9:function(){return this.a.gd9()},
gci:function(){return this.a.gci()},
gdZ:function(){return this.c!=null},
t:function(a,b){return J.cL(this.a,b)},
dM:function(a,b){return this.a.dM(a,b)},
aV:function(){return this.a.aV()},
hi:function(a){var z=new P.mr(a)
this.a=P.eW(new P.mt(this,a),new P.mu(z),null,new P.mv(this,z),!1,null)},
p:{
mp:function(a){var z=new P.mo(null,!1,null)
z.hi(a)
return z}}},
mr:{"^":"b:1;a",
$0:function(){P.bZ(new P.ms(this.a))}},
ms:{"^":"b:1;a",
$0:function(){this.a.$2(0,null)}},
mu:{"^":"b:1;a",
$0:function(){this.a.$0()}},
mv:{"^":"b:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
mt:{"^":"b:1;a,b",
$0:function(){var z=this.a
if(!z.a.gj5()){z.c=new P.bO(new P.D(0,$.n,null,[null]),[null])
if(z.b===!0){z.b=!1
P.bZ(new P.mq(this.b))}return z.c.gfb()}}},
mq:{"^":"b:1;a",
$0:function(){this.a.$2(2,null)}},
br:{"^":"d;ap:a<,b",
i:function(a){return"IterationMarker("+this.b+", "+H.a(this.a)+")"},
p:{
bR:function(a){return new P.br(a,1)},
aC:function(){return C.ad},
fo:function(a){return new P.br(a,0)},
aD:function(a){return new P.br(a,3)}}},
aO:{"^":"d;a,b,c,d",
gF:function(){var z=this.c
return z==null?this.b:z.gF()},
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
else{w=J.aa(z)
if(!!w.$isaO){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
nn:{"^":"cf;a",
gO:function(a){return new P.aO(this.a(),null,null,null)},
$ascf:I.aG,
$asx:I.aG,
p:{
aE:function(a){return new P.nn(a)}}},
M:{"^":"d;$ti"},
fm:{"^":"d;fb:a<,$ti",
dR:function(a,b){a=a!=null?a:new P.ck()
if(this.a.a!==0)throw H.c(new P.N("Future already completed"))
$.n.toString
this.aK(a,b)},
cM:function(a){return this.dR(a,null)}},
bO:{"^":"fm;a,$ti",
br:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.N("Future already completed"))
z.aU(a)},
dQ:function(){return this.br(null)},
aK:function(a,b){this.a.ew(a,b)}},
nm:{"^":"fm;a,$ti",
br:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.N("Future already completed"))
z.aJ(a)},
dQ:function(){return this.br(null)},
aK:function(a,b){this.a.aK(a,b)}},
dv:{"^":"d;dB:a<,b,c,d,e,$ti",
gi7:function(){return this.b.b},
gfd:function(){return(this.c&1)!==0},
giS:function(){return(this.c&2)!==0},
gfc:function(){return this.c===8},
iQ:function(a){return this.b.b.ea(this.d,a)},
jg:function(a){if(this.c!==6)return!0
return this.b.b.ea(this.d,a.gaY())},
iM:function(a){var z,y,x
z=this.e
y=H.bX()
x=this.b.b
if(H.ag(y,[y,y]).aL(z))return x.jw(z,a.gaY(),a.gaT())
else return x.ea(z,a.gaY())},
iR:function(){return this.b.b.fB(this.d)}},
D:{"^":"d;ca:a<,b,hY:c<,$ti",
ghJ:function(){return this.a===2},
gdv:function(){return this.a>=4},
eb:function(a,b){var z=$.n
if(z!==C.f){z.toString
if(b!=null)b=P.dD(b,z)}return this.dJ(a,b)},
bx:function(a){return this.eb(a,null)},
dJ:function(a,b){var z,y
z=new P.D(0,$.n,null,[null])
y=b==null?1:3
this.cD(new P.dv(null,z,y,a,b,[H.k(this,0),null]))
return z},
bz:function(a){var z,y
z=$.n
y=new P.D(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.k(this,0)
this.cD(new P.dv(null,y,8,a,null,[z,z]))
return y},
cD:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdv()){y.cD(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bb(null,null,z,new P.mG(this,a))}},
eM:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdB()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdv()){v.eM(a)
return}this.a=v.a
this.c=v.c}z.a=this.cH(a)
y=this.b
y.toString
P.bb(null,null,y,new P.mO(z,this))}},
cG:function(){var z=this.c
this.c=null
return this.cH(z)},
cH:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdB()
z.a=y}return y},
aJ:function(a){var z
if(!!J.l(a).$isM)P.cC(a,this)
else{z=this.cG()
this.a=4
this.c=a
P.b6(this,z)}},
aK:[function(a,b){var z=this.cG()
this.a=8
this.c=new P.c3(a,b)
P.b6(this,z)},function(a){return this.aK(a,null)},"jP","$2","$1","gbp",2,2,11,0],
aU:function(a){var z
if(!!J.l(a).$isM){if(a.a===8){this.a=1
z=this.b
z.toString
P.bb(null,null,z,new P.mI(this,a))}else P.cC(a,this)
return}this.a=1
z=this.b
z.toString
P.bb(null,null,z,new P.mJ(this,a))},
ew:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bb(null,null,z,new P.mH(this,a,b))},
$isM:1,
p:{
mK:function(a,b){var z,y,x,w
b.a=1
try{a.eb(new P.mL(b),new P.mM(b))}catch(x){w=H.y(x)
z=w
y=H.z(x)
P.bZ(new P.mN(b,z,y))}},
cC:function(a,b){var z,y,x
for(;a.ghJ();)a=a.c
z=a.gdv()
y=b.c
if(z){b.c=null
x=b.cH(y)
b.a=a.a
b.c=a.c
P.b6(b,x)}else{b.a=2
b.c=a
a.eM(y)}},
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=v.gaY()
x=v.gaT()
z.toString
P.ba(null,null,z,y,x)}return}for(;b.gdB()!=null;b=u){u=b.a
b.a=null
P.b6(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gfd()||b.gfc()){s=b.gi7()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=v.gaY()
r=v.gaT()
y.toString
P.ba(null,null,y,x,r)
return}q=$.n
if(q==null?s!=null:q!==s)$.n=s
else q=null
if(b.gfc())new P.mR(z,x,w,b).$0()
else if(y){if(b.gfd())new P.mQ(x,b,t).$0()}else if(b.giS())new P.mP(z,x,b).$0()
if(q!=null)$.n=q
y=x.b
r=J.l(y)
if(!!r.$isM){p=b.b
if(!!r.$isD)if(y.a>=4){o=p.c
p.c=null
b=p.cH(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.cC(y,p)
else P.mK(y,p)
return}}p=b.b
b=p.cG()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
mG:{"^":"b:1;a,b",
$0:function(){P.b6(this.a,this.b)}},
mO:{"^":"b:1;a,b",
$0:function(){P.b6(this.b,this.a.a)}},
mL:{"^":"b:0;a",
$1:function(a){var z=this.a
z.a=0
z.aJ(a)}},
mM:{"^":"b:46;a",
$2:function(a,b){this.a.aK(a,b)},
$1:function(a){return this.$2(a,null)}},
mN:{"^":"b:1;a,b,c",
$0:function(){this.a.aK(this.b,this.c)}},
mI:{"^":"b:1;a,b",
$0:function(){P.cC(this.b,this.a)}},
mJ:{"^":"b:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cG()
z.a=4
z.c=this.b
P.b6(z,y)}},
mH:{"^":"b:1;a,b,c",
$0:function(){this.a.aK(this.b,this.c)}},
mR:{"^":"b:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.iR()}catch(w){v=H.y(w)
y=v
x=H.z(w)
if(this.c){v=this.a.a.c.gaY()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.c3(y,x)
u.a=!0
return}if(!!J.l(z).$isM){if(z instanceof P.D&&z.gca()>=4){if(z.gca()===8){v=this.b
v.b=z.ghY()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bx(new P.mS(t))
v.a=!1}}},
mS:{"^":"b:0;a",
$1:function(a){return this.a}},
mQ:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.iQ(this.c)}catch(x){w=H.y(x)
z=w
y=H.z(x)
w=this.a
w.b=new P.c3(z,y)
w.a=!0}}},
mP:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jg(z)===!0&&w.e!=null){v=this.b
v.b=w.iM(z)
v.a=!1}}catch(u){w=H.y(u)
y=w
x=H.z(u)
w=this.a
v=w.a.c.gaY()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.c3(y,x)
s.a=!0}}},
fk:{"^":"d;io:a<,bT:b@"},
a3:{"^":"d;$ti",
bb:function(a,b){return new P.n6(b,this,[H.v(this,"a3",0),null])},
X:function(a,b){var z,y
z={}
y=new P.D(0,$.n,null,[P.Q])
z.a=null
z.a=this.ag(new P.li(z,this,b,y),!0,new P.lj(y),y.gbp())
return y},
H:function(a,b){var z,y
z={}
y=new P.D(0,$.n,null,[null])
z.a=null
z.a=this.ag(new P.lm(z,this,b,y),!0,new P.ln(y),y.gbp())
return y},
gk:function(a){var z,y
z={}
y=new P.D(0,$.n,null,[P.r])
z.a=0
this.ag(new P.ls(z),!0,new P.lt(z,y),y.gbp())
return y},
gG:function(a){var z,y
z={}
y=new P.D(0,$.n,null,[P.Q])
z.a=null
z.a=this.ag(new P.lo(z,y),!0,new P.lp(y),y.gbp())
return y},
bV:function(a){var z,y,x
z=H.v(this,"a3",0)
y=H.w([],[z])
x=new P.D(0,$.n,null,[[P.H,z]])
this.ag(new P.lu(this,y),!0,new P.lv(y,x),x.gbp())
return x},
by:function(a){var z,y,x
z=H.v(this,"a3",0)
y=P.G(null,null,null,z)
x=new P.D(0,$.n,null,[[P.bL,z]])
this.ag(new P.lw(this,y),!0,new P.lx(y,x),x.gbp())
return x},
gJ:function(a){var z,y
z={}
y=new P.D(0,$.n,null,[H.v(this,"a3",0)])
z.a=null
z.b=!1
this.ag(new P.lq(z,this),!0,new P.lr(z,y),y.gbp())
return y}},
li:{"^":"b;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.fC(new P.lg(this.c,a),new P.lh(z,y),P.fu(z.a,y))},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.b,"a3")}},
lg:{"^":"b:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
lh:{"^":"b:21;a,b",
$1:function(a){if(a===!0)P.fv(this.a.a,this.b,!0)}},
lj:{"^":"b:1;a",
$0:function(){this.a.aJ(!1)}},
lm:{"^":"b;a,b,c,d",
$1:function(a){P.fC(new P.lk(this.c,a),new P.ll(),P.fu(this.a.a,this.d))},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.b,"a3")}},
lk:{"^":"b:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ll:{"^":"b:0;",
$1:function(a){}},
ln:{"^":"b:1;a",
$0:function(){this.a.aJ(null)}},
ls:{"^":"b:0;a",
$1:function(a){++this.a.a}},
lt:{"^":"b:1;a,b",
$0:function(){this.b.aJ(this.a.a)}},
lo:{"^":"b:0;a,b",
$1:function(a){P.fv(this.a.a,this.b,!1)}},
lp:{"^":"b:1;a",
$0:function(){this.a.aJ(!0)}},
lu:{"^":"b;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.a,"a3")}},
lv:{"^":"b:1;a,b",
$0:function(){this.b.aJ(this.a)}},
lw:{"^":"b;a,b",
$1:function(a){this.b.t(0,a)},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.a,"a3")}},
lx:{"^":"b:1;a,b",
$0:function(){this.b.aJ(this.a)}},
lq:{"^":"b;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$signature:function(){return H.aP(function(a){return{func:1,args:[a]}},this.b,"a3")}},
lr:{"^":"b:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aJ(x.a)
return}try{x=H.a1()
throw H.c(x)}catch(w){x=H.y(w)
z=x
y=H.z(w)
P.nE(this.b,z,y)}}},
cD:{"^":"d;ca:b<,$ti",
gd9:function(){return new P.cA(this,this.$ti)},
gj5:function(){return(this.b&4)!==0},
gci:function(){var z=this.b
return(z&1)!==0?this.gbj().geI():(z&2)===0},
ghR:function(){if((this.b&8)===0)return this.a
return this.a.gct()},
dl:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dy(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gct()==null)y.c=new P.dy(null,null,0,this.$ti)
return y.c},
gbj:function(){if((this.b&8)!==0)return this.a.gct()
return this.a},
bY:function(){if((this.b&4)!==0)return new P.N("Cannot add event after closing")
return new P.N("Cannot add event while adding a stream")},
il:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.bY())
if((z&2)!==0){z=new P.D(0,$.n,null,[null])
z.aU(null)
return z}z=this.a
y=new P.D(0,$.n,null,[null])
x=this.ghm()
x=a.ag(this.ghp(),!1,this.ghq(),x)
w=this.b
if((w&1)!==0?this.gbj().geI():(w&2)===0)x.cl()
this.a=new P.nf(z,y,x,this.$ti)
this.b|=8
return y},
eC:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$aU():new P.D(0,$.n,null,[null])
this.c=z}return z},
t:[function(a,b){if(this.b>=4)throw H.c(this.bY())
this.bo(b)},"$1","gi8",2,0,function(){return H.aP(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cD")}],
dM:function(a,b){if(this.b>=4)throw H.c(this.bY())
a=a!=null?a:new P.ck()
$.n.toString
this.bH(a,b)},
aV:function(){var z=this.b
if((z&4)!==0)return this.eC()
if(z>=4)throw H.c(this.bY())
z|=4
this.b=z
if((z&1)!==0)this.c7()
else if((z&3)===0)this.dl().t(0,C.u)
return this.eC()},
bo:[function(a){var z=this.b
if((z&1)!==0)this.c6(a)
else if((z&3)===0)this.dl().t(0,new P.dr(a,null,this.$ti))},"$1","ghp",2,0,function(){return H.aP(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cD")}],
bH:[function(a,b){var z=this.b
if((z&1)!==0)this.c8(a,b)
else if((z&3)===0)this.dl().t(0,new P.ds(a,b,null))},"$2","ghm",4,0,25],
de:[function(){var z=this.a
this.a=z.gct()
this.b&=4294967287
z.a.aU(null)},"$0","ghq",0,0,3],
i2:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.N("Stream has already been listened to."))
z=$.n
y=d?1:0
x=new P.mA(this,null,null,null,z,y,null,null,this.$ti)
x.er(a,b,c,d,H.k(this,0))
w=this.ghR()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sct(x)
v.b.cp()}else this.a=x
x.i0(w)
x.dt(new P.nh(this))
return x},
hV:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bP()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){w=H.y(v)
y=w
x=H.z(v)
u=new P.D(0,$.n,null,[null])
u.ew(y,x)
z=u}else z=z.bz(w)
w=new P.ng(this)
if(z!=null)z=z.bz(w)
else w.$0()
return z}},
nh:{"^":"b:1;a",
$0:function(){P.dE(this.a.d)}},
ng:{"^":"b:3;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.aU(null)}},
np:{"^":"d;$ti",
c6:function(a){this.gbj().bo(a)},
c8:function(a,b){this.gbj().bH(a,b)},
c7:function(){this.gbj().de()}},
mx:{"^":"d;$ti",
c6:function(a){this.gbj().bI(new P.dr(a,null,[H.k(this,0)]))},
c8:function(a,b){this.gbj().bI(new P.ds(a,b,null))},
c7:function(){this.gbj().bI(C.u)}},
mw:{"^":"cD+mx;a,b,c,d,e,f,r,$ti"},
no:{"^":"cD+np;a,b,c,d,e,f,r,$ti"},
cA:{"^":"ni;a,$ti",
gA:function(a){return(H.Z(this.a)^892482866)>>>0},
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cA))return!1
return b.a===this.a}},
mA:{"^":"bP;x,a,b,c,d,e,f,r,$ti",
dC:function(){return this.x.hV(this)},
dE:[function(){var z=this.x
if((z.b&8)!==0)z.a.cl()
P.dE(z.e)},"$0","gdD",0,0,3],
dG:[function(){var z=this.x
if((z.b&8)!==0)z.a.cp()
P.dE(z.f)},"$0","gdF",0,0,3]},
mg:{"^":"d;$ti",
cl:function(){this.b.cl()},
cp:function(){this.b.cp()},
bP:function(){var z=this.b.bP()
if(z==null){this.a.aU(null)
return}return z.bz(new P.mh(this))},
dQ:function(){this.a.aU(null)}},
mh:{"^":"b:1;a",
$0:function(){this.a.a.aU(null)}},
nf:{"^":"mg;ct:c@,a,b,$ti"},
pu:{"^":"d;$ti"},
bP:{"^":"d;ca:e<,$ti",
i0:function(a){if(a==null)return
this.r=a
if(!a.gG(a)){this.e=(this.e|64)>>>0
this.r.cw(this)}},
jk:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.eZ()
if((z&4)===0&&(this.e&32)===0)this.dt(this.gdD())},
cl:function(){return this.jk(null)},
cp:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gG(z)}else z=!1
if(z)this.r.cw(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dt(this.gdF())}}}},
bP:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.df()
z=this.f
return z==null?$.$get$aU():z},
geI:function(){return(this.e&4)!==0},
gci:function(){return this.e>=128},
df:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.eZ()
if((this.e&32)===0)this.r=null
this.f=this.dC()},
bo:["h7",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c6(a)
else this.bI(new P.dr(a,null,[H.v(this,"bP",0)]))}],
bH:["h8",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c8(a,b)
else this.bI(new P.ds(a,b,null))}],
de:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c7()
else this.bI(C.u)},
dE:[function(){},"$0","gdD",0,0,3],
dG:[function(){},"$0","gdF",0,0,3],
dC:function(){return},
bI:function(a){var z,y
z=this.r
if(z==null){z=new P.dy(null,null,0,[H.v(this,"bP",0)])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cw(this)}},
c6:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fE(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dh((z&4)!==0)},
c8:function(a,b){var z,y,x
z=this.e
y=new P.mz(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.df()
z=this.f
if(!!J.l(z).$isM){x=$.$get$aU()
x=z==null?x!=null:z!==x}else x=!1
if(x)z.bz(y)
else y.$0()}else{y.$0()
this.dh((z&4)!==0)}},
c7:function(){var z,y,x
z=new P.my(this)
this.df()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isM){x=$.$get$aU()
x=y==null?x!=null:y!==x}else x=!1
if(x)y.bz(z)
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
if(y)this.dE()
else this.dG()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cw(this)},
er:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.dD(b==null?P.nX():b,z)
this.c=c==null?P.nW():c}},
mz:{"^":"b:3;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ag(H.bX(),[H.ar(P.d),H.ar(P.aB)]).aL(y)
w=z.d
v=this.b
u=z.b
if(x)w.jx(u,v,this.c)
else w.fE(u,v)
z.e=(z.e&4294967263)>>>0}},
my:{"^":"b:3;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fC(z.c)
z.e=(z.e&4294967263)>>>0}},
ni:{"^":"a3;$ti",
ag:function(a,b,c,d){return this.a.i2(a,d,c,!0===b)},
e4:function(a,b,c){return this.ag(a,null,b,c)}},
dt:{"^":"d;bT:a@,$ti"},
dr:{"^":"dt;ap:b<,a,$ti",
e6:function(a){a.c6(this.b)}},
ds:{"^":"dt;aY:b<,aT:c<,a",
e6:function(a){a.c8(this.b,this.c)},
$asdt:I.aG},
mB:{"^":"d;",
e6:function(a){a.c7()},
gbT:function(){return},
sbT:function(a){throw H.c(new P.N("No events after a done."))}},
n8:{"^":"d;ca:a<,$ti",
cw:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.bZ(new P.n9(this,a))
this.a=1},
eZ:function(){if(this.a===1)this.a=3}},
n9:{"^":"b:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbT()
z.b=w
if(w==null)z.c=null
x.e6(this.b)}},
dy:{"^":"n8;b,c,a,$ti",
gG:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbT(b)
this.c=b}}},
nj:{"^":"d;a,b,c,$ti"},
nz:{"^":"b:1;a,b,c",
$0:function(){return this.a.aK(this.b,this.c)}},
ny:{"^":"b:10;a,b",
$2:function(a,b){P.nx(this.a,this.b,a,b)}},
nA:{"^":"b:1;a,b",
$0:function(){return this.a.aJ(this.b)}},
du:{"^":"a3;$ti",
ag:function(a,b,c,d){return this.hx(a,d,c,!0===b)},
e4:function(a,b,c){return this.ag(a,null,b,c)},
hx:function(a,b,c,d){return P.mF(this,a,b,c,d,H.v(this,"du",0),H.v(this,"du",1))},
eF:function(a,b){b.bo(a)},
hH:function(a,b,c){c.bH(a,b)},
$asa3:function(a,b){return[b]}},
fn:{"^":"bP;x,y,a,b,c,d,e,f,r,$ti",
bo:function(a){if((this.e&2)!==0)return
this.h7(a)},
bH:function(a,b){if((this.e&2)!==0)return
this.h8(a,b)},
dE:[function(){var z=this.y
if(z==null)return
z.cl()},"$0","gdD",0,0,3],
dG:[function(){var z=this.y
if(z==null)return
z.cp()},"$0","gdF",0,0,3],
dC:function(){var z=this.y
if(z!=null){this.y=null
return z.bP()}return},
jR:[function(a){this.x.eF(a,this)},"$1","ghE",2,0,function(){return H.aP(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fn")}],
jT:[function(a,b){this.x.hH(a,b,this)},"$2","ghG",4,0,26],
jS:[function(){this.de()},"$0","ghF",0,0,3],
hj:function(a,b,c,d,e,f,g){this.y=this.x.a.e4(this.ghE(),this.ghF(),this.ghG())},
$asbP:function(a,b){return[b]},
p:{
mF:function(a,b,c,d,e,f,g){var z,y
z=$.n
y=e?1:0
y=new P.fn(a,null,null,null,null,z,y,null,null,[f,g])
y.er(b,c,d,e,g)
y.hj(a,b,c,d,e,f,g)
return y}}},
n6:{"^":"du;b,a,$ti",
eF:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.y(w)
y=v
x=H.z(w)
P.ns(b,y,x)
return}b.bo(z)}},
c3:{"^":"d;aY:a<,aT:b<",
i:function(a){return H.a(this.a)},
$isT:1},
pq:{"^":"d;"},
nr:{"^":"d;"},
nM:{"^":"b:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.ck()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
nc:{"^":"nr;",
fC:function(a){var z,y,x,w
try{if(C.f===$.n){x=a.$0()
return x}x=P.fz(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.ba(null,null,this,z,y)}},
fE:function(a,b){var z,y,x,w
try{if(C.f===$.n){x=a.$1(b)
return x}x=P.fB(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.ba(null,null,this,z,y)}},
jx:function(a,b,c){var z,y,x,w
try{if(C.f===$.n){x=a.$2(b,c)
return x}x=P.fA(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.z(w)
return P.ba(null,null,this,z,y)}},
dP:function(a,b){if(b)return new P.nd(this,a)
else return new P.ne(this,a)},
h:function(a,b){return},
fB:function(a){if($.n===C.f)return a.$0()
return P.fz(null,null,this,a)},
ea:function(a,b){if($.n===C.f)return a.$1(b)
return P.fB(null,null,this,a,b)},
jw:function(a,b,c){if($.n===C.f)return a.$2(b,c)
return P.fA(null,null,this,a,b,c)}},
nd:{"^":"b:1;a,b",
$0:function(){return this.a.fC(this.b)}},
ne:{"^":"b:1;a,b",
$0:function(){return this.a.fB(this.b)}}}],["","",,P,{"^":"",
eo:function(a,b){return new H.I(0,null,null,null,null,null,0,[a,b])},
ay:function(){return new H.I(0,null,null,null,null,null,0,[null,null])},
a6:function(a){return H.fN(a,new H.I(0,null,null,null,null,null,0,[null,null]))},
iZ:function(a,b,c){var z,y
if(P.dC(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bv()
y.push(a)
try{P.nH(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.eY(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aV:function(a,b,c){var z,y,x
if(P.dC(a))return b+"..."+c
z=new P.bq(b)
y=$.$get$bv()
y.push(a)
try{x=z
x.q=P.eY(x.gq(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.q=y.gq()+c
y=z.gq()
return y.charCodeAt(0)==0?y:y},
dC:function(a){var z,y
for(z=0;y=$.$get$bv(),z<y.length;++z)if(a===y[z])return!0
return!1},
nH:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gO(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.a(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gF();++x
if(!z.v()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.v();t=s,s=r){r=z.gF();++x
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
jb:function(a,b,c,d,e){return new H.I(0,null,null,null,null,null,0,[d,e])},
bF:function(a,b,c){var z=P.jb(null,null,null,b,c)
a.H(0,new P.nY(z))
return z},
G:function(a,b,c,d){return new P.dx(0,null,null,null,null,null,0,[d])},
az:function(a,b){var z,y
z=P.G(null,null,null,b)
for(y=J.aa(a);y.v();)z.t(0,y.gF())
return z},
jc:function(a,b,c){var z,y,x,w
z=[]
y=a.gk(a)
for(x=0;x<y;++x){w=a.h(0,x)
if(J.f(b.$1(w),c))z.push(w)
if(y!==a.gk(a))throw H.c(new P.B(a))}if(z.length!==a.gk(a)){a.fZ(0,0,z.length,z)
a.sk(0,z.length)}},
d5:function(a){var z,y,x
z={}
if(P.dC(a))return"{...}"
y=new P.bq("")
try{$.$get$bv().push(a)
x=y
x.q=x.gq()+"{"
z.a=!0
a.H(0,new P.jk(z,y))
z=y
z.q=z.gq()+"}"}finally{z=$.$get$bv()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gq()
return z.charCodeAt(0)==0?z:z},
fp:{"^":"I;a,b,c,d,e,f,r,$ti",
cf:function(a){return H.fX(a)&0x3ffffff},
cg:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gff()
if(x==null?b==null:x===b)return y}return-1},
p:{
bs:function(a,b){return new P.fp(0,null,null,null,null,null,0,[a,b])}}},
dx:{"^":"mT;a,b,c,d,e,f,r,$ti",
dA:function(){return new P.dx(0,null,null,null,null,null,0,this.$ti)},
gO:function(a){var z=new P.aN(this,this.r,null,null,[null])
z.c=this.e
return z},
gk:function(a){return this.a},
gG:function(a){return this.a===0},
ga8:function(a){return this.a!==0},
X:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hw(b)},
hw:function(a){var z=this.d
if(z==null)return!1
return this.c0(z[this.bZ(a)],a)>=0},
fi:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.X(0,a)?a:null
else return this.hL(a)},
hL:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bZ(a)]
x=this.c0(y,a)
if(x<0)return
return J.ai(y,x).gdk()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gJ:function(a){var z=this.f
if(z==null)throw H.c(new P.N("No elements"))
return z.a},
t:function(a,b){var z,y,x
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
x=y}return this.ex(x,b)}else return this.af(b)},
af:function(a){var z,y,x
z=this.d
if(z==null){z=P.n1()
this.d=z}y=this.bZ(a)
x=z[y]
if(x==null)z[y]=[this.di(a)]
else{if(this.c0(x,a)>=0)return!1
x.push(this.di(a))}return!0},
aH:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ey(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ey(this.c,b)
else return this.hW(b)},
hW:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bZ(a)]
x=this.c0(y,a)
if(x<0)return!1
this.ez(y.splice(x,1)[0])
return!0},
hB:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.aH(0,y)}},
aG:function(a){if(this.a>0){this.f=null
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
z=new P.n0(a,null,null)
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
bZ:function(a){return J.m(a)&0x3ffffff},
c0:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gdk(),b))return y
return-1},
$isbL:1,
$isV:1,
p:{
n1:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fq:{"^":"dx;a,b,c,d,e,f,r,$ti",
dA:function(){return new P.fq(0,null,null,null,null,null,0,this.$ti)},
bZ:function(a){return H.fX(a)&0x3ffffff},
c0:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdk()
if(x==null?b==null:x===b)return y}return-1}},
n0:{"^":"d;dk:a<,b,hv:c<"},
aN:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
mT:{"^":"kP;$ti",
by:function(a){var z=this.dA()
z.as(0,this)
return z}},
cf:{"^":"x;$ti"},
nY:{"^":"b:5;a",
$2:function(a,b){this.a.l(0,a,b)}},
ep:{"^":"eu;$ti"},
eu:{"^":"d+aW;$ti",$asH:null,$asV:null,$isH:1,$isV:1},
aW:{"^":"d;$ti",
gO:function(a){return new H.ci(this,this.gk(this),0,null,[H.v(this,"aW",0)])},
a3:function(a,b){return this.h(0,b)},
H:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gG:function(a){return this.gk(this)===0},
ga8:function(a){return!this.gG(this)},
gJ:function(a){if(this.gk(this)===0)throw H.c(H.a1())
return this.h(0,this.gk(this)-1)},
X:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<this.gk(this);++y){if(J.f(this.h(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bO:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y))===!0)return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
b8:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
bb:function(a,b){return new H.ad(this,b,[H.v(this,"aW",0),null])},
d7:function(a,b){return H.f_(this,b,null,H.v(this,"aW",0))},
by:function(a){var z,y
z=P.G(null,null,null,H.v(this,"aW",0))
for(y=0;y<this.gk(this);++y)z.t(0,this.h(0,y))
return z},
t:function(a,b){var z=this.gk(this)
this.sk(0,z+1)
this.l(0,z,b)},
aH:function(a,b){var z
for(z=0;z<this.gk(this);++z)if(J.f(this.h(0,z),b)){this.ax(0,z,this.gk(this)-1,this,z+1)
this.sk(0,this.gk(this)-1)
return!0}return!1},
ax:function(a,b,c,d,e){var z,y,x,w,v
P.co(b,c,this.gk(this),null,null,null)
z=c-b
if(z===0)return
if(H.bW(d,"$isH",[H.v(this,"aW",0)],"$asH")){y=e
x=d}else{x=J.hd(d,e).bd(0,!1)
y=0}w=J.F(x)
if(y+z>w.gk(x))throw H.c(H.ef())
if(y<b)for(v=z-1;v>=0;--v)this.l(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.l(0,b+v,w.h(x,y+v))},
fZ:function(a,b,c,d){return this.ax(a,b,c,d,0)},
i:function(a){return P.aV(this,"[","]")},
$isH:1,
$isV:1},
nq:{"^":"d;$ti",
l:function(a,b,c){throw H.c(new P.R("Cannot modify unmodifiable map"))},
$isC:1},
ji:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
l:function(a,b,c){this.a.l(0,b,c)},
K:function(a){return this.a.K(a)},
H:function(a,b){this.a.H(0,b)},
gG:function(a){var z=this.a
return z.gG(z)},
ga8:function(a){var z=this.a
return z.ga8(z)},
gk:function(a){var z=this.a
return z.gk(z)},
i:function(a){return this.a.i(0)},
$isC:1},
fh:{"^":"ji+nq;a,$ti",$asC:null,$isC:1},
jk:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.q+=", "
z.a=!1
z=this.b
y=z.q+=H.a(a)
z.q=y+": "
z.q+=H.a(b)}},
jd:{"^":"am;a,b,c,d,$ti",
gO:function(a){return new P.n2(this,this.c,this.d,this.b,null,this.$ti)},
H:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
gG:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gJ:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.a1())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
a3:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cd(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
t:function(a,b){this.af(b)},
as:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.bW(b,"$isH",z,"$asH")){y=b.gk(b)
x=this.gk(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.je(w+C.h.c9(w,1))
if(typeof t!=="number")return H.A(t)
v=new Array(t)
v.fixed$length=Array
s=H.w(v,z)
this.c=this.i6(s)
this.a=s
this.b=0
C.a.ax(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.ax(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.ax(v,z,z+r,b,0)
C.a.ax(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new H.ci(b,b.gk(b),0,null,[H.v(b,"am",0)]);z.v();)this.af(z.d)},
aG:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aV(this,"{","}")},
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
if(z===this.c)throw H.c(H.a1());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
af:function(a){var z,y,x
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
C.a.ax(y,0,w,z,x)
C.a.ax(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
i6:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.ax(a,0,w,x,z)
return w}else{v=x.length-z
C.a.ax(a,0,v,x,z)
C.a.ax(a,v,v+this.c,this.a,0)
return this.c+v}},
ha:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.w(z,[b])},
p:{
aL:function(a,b){var z=new P.jd(null,0,0,0,[b])
z.ha(a,b)
return z},
je:function(a){var z
a=C.q.ek(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
n2:{"^":"d;a,b,c,d,e,$ti",
gF:function(){return this.e},
v:function(){var z,y,x
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
kQ:{"^":"d;$ti",
gG:function(a){return this.a===0},
ga8:function(a){return this.a!==0},
as:function(a,b){var z
for(z=J.aa(b);z.v();)this.t(0,z.gF())},
bd:function(a,b){var z,y,x,w,v
z=H.w([],this.$ti)
C.a.sk(z,this.a)
for(y=new P.aN(this,this.r,null,null,[null]),y.c=this.e,x=0;y.v();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
bV:function(a){return this.bd(a,!0)},
bb:function(a,b){return new H.cS(this,b,[H.k(this,0),null])},
i:function(a){return P.aV(this,"{","}")},
H:function(a,b){var z
for(z=new P.aN(this,this.r,null,null,[null]),z.c=this.e;z.v();)b.$1(z.d)},
aP:function(a,b,c){var z,y
for(z=new P.aN(this,this.r,null,null,[null]),z.c=this.e,y=b;z.v();)y=c.$2(y,z.d)
return y},
gJ:function(a){var z,y
z=new P.aN(this,this.r,null,null,[null])
z.c=this.e
if(!z.v())throw H.c(H.a1())
do y=z.d
while(z.v())
return y},
b8:function(a,b,c){var z,y
for(z=new P.aN(this,this.r,null,null,[null]),z.c=this.e;z.v();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
bG:function(a,b){var z,y,x,w
for(z=new P.aN(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.v();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.cZ())
y=w
x=!0}}if(x)return y
throw H.c(H.a1())},
$isbL:1,
$isV:1},
kP:{"^":"kQ;$ti"}}],["","",,P,{"^":"",
cF:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.mW(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cF(a[z])
return a},
nL:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.P(a))
z=null
try{z=JSON.parse(a)}catch(x){w=H.y(x)
y=w
throw H.c(new P.ec(String(y),null,null))}return P.cF(z)},
pv:[function(a){return a.cX()},"$1","od",2,0,0],
mW:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hU(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c_().length
return z},
gG:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c_().length
return z===0},
ga8:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c_().length
return z>0},
l:function(a,b,c){var z,y
if(this.b==null)this.c.l(0,b,c)
else if(this.K(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.i4().l(0,b,c)},
K:function(a){if(this.b==null)return this.c.K(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
fv:function(a,b){var z
if(this.K(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
H:function(a,b){var z,y,x,w
if(this.b==null)return this.c.H(0,b)
z=this.c_()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cF(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
i:function(a){return P.d5(this)},
c_:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
i4:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.ay()
y=this.c_()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.l(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
hU:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cF(this.a[a])
return this.b[a]=z},
$isC:1,
$asC:I.aG},
e1:{"^":"d;$ti"},
c9:{"^":"d;$ti"},
d2:{"^":"T;a,b",
i:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
j4:{"^":"d2;a,b",
i:function(a){return"Cyclic error in JSON stringify"}},
j3:{"^":"e1;a,b",
iw:function(a,b){return P.nL(a,this.gix().a)},
iv:function(a){return this.iw(a,null)},
iE:function(a,b){var z=this.giF()
return P.mY(a,z.b,z.a)},
f6:function(a){return this.iE(a,null)},
giF:function(){return C.O},
gix:function(){return C.N},
$ase1:function(){return[P.d,P.o]}},
j6:{"^":"c9;a,b",
$asc9:function(){return[P.d,P.o]}},
j5:{"^":"c9;a",
$asc9:function(){return[P.o,P.d]}},
mZ:{"^":"d;",
fM:function(a){var z,y,x,w,v,u,t
z=J.F(a)
y=z.gk(a)
if(typeof y!=="number")return H.A(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.aW(a,v)
if(u>92)continue
if(u<32){if(v>w)x.q+=C.b.az(a,w,v)
w=v+1
x.q+=H.a7(92)
switch(u){case 8:x.q+=H.a7(98)
break
case 9:x.q+=H.a7(116)
break
case 10:x.q+=H.a7(110)
break
case 12:x.q+=H.a7(102)
break
case 13:x.q+=H.a7(114)
break
default:x.q+=H.a7(117)
x.q+=H.a7(48)
x.q+=H.a7(48)
t=u>>>4&15
x.q+=H.a7(t<10?48+t:87+t)
t=u&15
x.q+=H.a7(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.q+=C.b.az(a,w,v)
w=v+1
x.q+=H.a7(92)
x.q+=H.a7(u)}}if(w===0)x.q+=H.a(a)
else if(w<y)x.q+=z.az(a,w,y)},
dg:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.j4(a,null))}z.push(a)},
d_:function(a){var z,y,x,w
if(this.fL(a))return
this.dg(a)
try{z=this.b.$1(a)
if(!this.fL(z))throw H.c(new P.d2(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){x=H.y(w)
y=x
throw H.c(new P.d2(a,y))}},
fL:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.q+=C.h.i(a)
return!0}else if(a===!0){this.c.q+="true"
return!0}else if(a===!1){this.c.q+="false"
return!0}else if(a==null){this.c.q+="null"
return!0}else if(typeof a==="string"){z=this.c
z.q+='"'
this.fM(a)
z.q+='"'
return!0}else{z=J.l(a)
if(!!z.$isH){this.dg(a)
this.jJ(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isC){this.dg(a)
y=this.jK(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
jJ:function(a){var z,y,x
z=this.c
z.q+="["
y=J.F(a)
if(y.gk(a)>0){this.d_(y.h(a,0))
for(x=1;x<y.gk(a);++x){z.q+=","
this.d_(y.h(a,x))}}z.q+="]"},
jK:function(a){var z,y,x,w,v,u
z={}
if(a.gG(a)){this.c.q+="{}"
return!0}y=a.gk(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.H(0,new P.n_(z,x))
if(!z.b)return!1
z=this.c
z.q+="{"
for(w='"',v=0;v<y;v+=2,w=',"'){z.q+=w
this.fM(x[v])
z.q+='":'
u=v+1
if(u>=y)return H.e(x,u)
this.d_(x[u])}z.q+="}"
return!0}},
n_:{"^":"b:5;a,b",
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
mX:{"^":"mZ;c,a,b",p:{
mY:function(a,b,c){var z,y,x
z=new P.bq("")
y=P.od()
x=new P.mX(z,[],y)
x.d_(a)
y=z.q
return y.charCodeAt(0)==0?y:y}}}}],["","",,P,{"^":"",
oY:[function(a,b){return J.c1(a,b)},"$2","oe",4,0,38],
e9:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.iw(a)},
iw:function(a){var z=J.l(a)
if(!!z.$isb)return z.i(a)
return H.cm(a)},
cb:function(a){return new P.mE(a)},
Y:function(a,b,c){var z,y
z=H.w([],[c])
for(y=J.aa(a);y.v();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
jf:function(a,b,c,d){var z,y,x
z=H.w(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
dQ:function(a){var z=H.a(a)
H.oB(z)},
b1:function(a,b,c){return new H.el(a,H.d0(a,!1,b,!1),null,null)},
Q:{"^":"d;"},
"+bool":0,
L:{"^":"d;$ti"},
ca:{"^":"d;i5:a<,b",
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.ca))return!1
return this.a===b.a&&!0},
b6:function(a,b){return C.c.b6(this.a,b.gi5())},
gA:function(a){var z=this.a
return(z^C.c.c9(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t
z=P.i5(H.aZ(this).getFullYear()+0)
y=P.bB(H.aZ(this).getMonth()+1)
x=P.bB(H.aZ(this).getDate()+0)
w=P.bB(H.aZ(this).getHours()+0)
v=P.bB(H.aZ(this).getMinutes()+0)
u=P.bB(H.aZ(this).getSeconds()+0)
t=P.i6(H.aZ(this).getMilliseconds()+0)
return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
t:function(a,b){var z,y
z=this.a+b.giV()
y=new P.ca(z,!1)
z=Math.abs(z)
if(!(z>864e13)){z===864e13
z=!1}else z=!0
if(z)H.h(P.E(y.gjh()))
return y},
gjh:function(){return this.a},
$isL:1,
$asL:function(){return[P.ca]},
p:{
i5:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.a(z)
if(z>=10)return y+"00"+H.a(z)
return y+"000"+H.a(z)},
i6:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bB:function(a){if(a>=10)return""+a
return"0"+a}}},
at:{"^":"J;",$isL:1,
$asL:function(){return[P.J]}},
"+double":0,
aK:{"^":"d;bq:a<",
a1:function(a,b){return new P.aK(this.a+b.gbq())},
aq:function(a,b){return new P.aK(this.a-b.gbq())},
bE:function(a,b){return new P.aK(C.h.e9(this.a*b))},
ah:function(a,b){return C.c.ah(this.a,b.gbq())},
bm:function(a,b){return this.a>b.gbq()},
bD:function(a,b){return C.c.bD(this.a,b.gbq())},
bB:function(a,b){return C.c.bB(this.a,b.gbq())},
giV:function(){return C.c.ab(this.a,1000)},
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.aK))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
b6:function(a,b){return C.c.b6(this.a,b.gbq())},
i:function(a){var z,y,x,w,v
z=new P.ih()
y=this.a
if(y<0)return"-"+new P.aK(-y).i(0)
x=z.$1(C.c.ab(y,6e7)%60)
w=z.$1(C.c.ab(y,1e6)%60)
v=new P.ig().$1(y%1e6)
return""+C.c.ab(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)},
ei:function(a){return new P.aK(-this.a)},
$isL:1,
$asL:function(){return[P.aK]}},
ig:{"^":"b:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ih:{"^":"b:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
T:{"^":"d;",
gaT:function(){return H.z(this.$thrownJsError)}},
ck:{"^":"T;",
i:function(a){return"Throw of null."}},
aJ:{"^":"T;a,b,j:c<,d",
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
u=P.e9(this.b)
return w+v+": "+H.a(u)},
p:{
E:function(a){return new P.aJ(!1,null,null,a)},
c2:function(a,b,c){return new P.aJ(!0,a,b,c)},
u:function(a){return new P.aJ(!1,null,a,"Must not be null")}}},
df:{"^":"aJ;e,f,a,b,c,d",
gdn:function(){return"RangeError"},
gdm:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.bm()
if(typeof z!=="number")return H.A(z)
if(x>z)y=": Not in range "+H.a(z)+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.a(z)}}return y},
p:{
eC:function(a){return new P.df(null,null,!1,null,null,a)},
bH:function(a,b,c){return new P.df(null,null,!0,a,b,"Value not in range")},
U:function(a,b,c,d,e){return new P.df(b,c,!0,a,d,"Invalid value")},
k2:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.U(a,b,c,d,e))},
co:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.U(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.U(b,a,c,"end",f))
return b}}},
iO:{"^":"aJ;e,k:f>,a,b,c,d",
gdn:function(){return"RangeError"},
gdm:function(){if(J.c0(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
p:{
cd:function(a,b,c,d,e){var z=e!=null?e:J.av(b)
return new P.iO(b,z,!0,a,c,"Index out of range")}}},
R:{"^":"T;a",
i:function(a){return"Unsupported operation: "+this.a}},
aq:{"^":"T;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
N:{"^":"T;a",
i:function(a){return"Bad state: "+this.a}},
B:{"^":"T;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.e9(z))+"."}},
jC:{"^":"d;",
i:function(a){return"Out of Memory"},
gaT:function(){return},
$isT:1},
eQ:{"^":"d;",
i:function(a){return"Stack Overflow"},
gaT:function(){return},
$isT:1},
i4:{"^":"T;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.a(z)+"' during its initialization"}},
mE:{"^":"d;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
ec:{"^":"d;a,b,c",
i:function(a){var z,y
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(typeof y!=="string")return z
if(y.length>78)y=J.dV(y,0,75)+"..."
return z+"\n"+H.a(y)}},
ix:{"^":"d;j:a<,eJ,$ti",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z,y
z=this.eJ
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.c2(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dd(b,"expando$values")
return y==null?null:H.dd(y,z)},
l:function(a,b,c){var z,y
z=this.eJ
if(typeof z!=="string")z.set(b,c)
else{y=H.dd(b,"expando$values")
if(y==null){y=new P.d()
H.eA(b,"expando$values",y)}H.eA(y,z,c)}}},
bj:{"^":"d;"},
r:{"^":"J;",$isL:1,
$asL:function(){return[P.J]}},
"+int":0,
x:{"^":"d;$ti",
bb:function(a,b){return H.bl(this,b,H.v(this,"x",0),null)},
bA:["ep",function(a,b){return new H.O(this,b,[H.v(this,"x",0)])}],
X:function(a,b){var z
for(z=this.gO(this);z.v();)if(J.f(z.gF(),b))return!0
return!1},
H:function(a,b){var z
for(z=this.gO(this);z.v();)b.$1(z.gF())},
aP:function(a,b,c){var z,y
for(z=this.gO(this),y=b;z.v();)y=c.$2(y,z.gF())
return y},
bd:function(a,b){return P.Y(this,b,H.v(this,"x",0))},
bV:function(a){return this.bd(a,!0)},
by:function(a){return P.az(this,H.v(this,"x",0))},
gk:function(a){var z,y
z=this.gO(this)
for(y=0;z.v();)++y
return y},
gG:function(a){return!this.gO(this).v()},
ga8:function(a){return!this.gG(this)},
d7:function(a,b){return H.kS(this,b,H.v(this,"x",0))},
gJ:function(a){var z,y
z=this.gO(this)
if(!z.v())throw H.c(H.a1())
do y=z.gF()
while(z.v())
return y},
gbn:function(a){var z,y
z=this.gO(this)
if(!z.v())throw H.c(H.a1())
y=z.gF()
if(z.v())throw H.c(H.cZ())
return y},
a3:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.u("index"))
if(b<0)H.h(P.U(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.v();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cd(b,this,"index",null,y))},
i:function(a){return P.iZ(this,"(",")")}},
cg:{"^":"d;$ti"},
H:{"^":"d;$ti",$isx:1,$isV:1},
"+List":0,
C:{"^":"d;$ti"},
aM:{"^":"d;",
gA:function(a){return P.d.prototype.gA.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
J:{"^":"d;",$isL:1,
$asL:function(){return[P.J]}},
"+num":0,
d:{"^":";",
B:function(a,b){return this===b},
gA:function(a){return H.Z(this)},
i:function(a){return H.cm(this)},
gb1:function(a){return new H.ae(H.dM(this),null)},
toString:function(){return this.i(this)}},
aY:{"^":"d;"},
bL:{"^":"V;$ti"},
aB:{"^":"d;"},
o:{"^":"d;",$isL:1,
$asL:function(){return[P.o]},
$isda:1},
"+String":0,
bq:{"^":"d;q<",
gk:function(a){return this.q.length},
gG:function(a){return this.q.length===0},
ga8:function(a){return this.q.length!==0},
i:function(a){var z=this.q
return z.charCodeAt(0)==0?z:z},
p:{
eY:function(a,b,c){var z=J.aa(b)
if(!z.v())return a
if(c.length===0){do a+=H.a(z.gF())
while(z.v())}else{a+=H.a(z.gF())
for(;z.v();)a=a+c+H.a(z.gF())}return a},
lA:function(a){return new P.bq(a)}}}}],["","",,P,{"^":"",eK:{"^":"d;"}}],["","",,P,{"^":"",
ow:function(a,b){if(typeof a!=="number")throw H.c(P.E(a))
if(typeof b!=="number")throw H.c(P.E(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.h.gbQ(b)||isNaN(b))return b
return a}return a},
ov:function(a,b){if(typeof a!=="number")throw H.c(P.E(a))
if(typeof b!=="number")throw H.c(P.E(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.h.gbQ(a))return b
return a},
de:function(a){return a==null?C.H:P.nb(a)},
mV:{"^":"d;",
al:function(a){if(a<=0||a>4294967296)throw H.c(P.eC("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
e5:function(){return Math.random()}},
na:{"^":"d;a,b",
bi:function(){var z,y,x,w,v,u
z=this.a
y=4294901760*z
x=(y&4294967295)>>>0
w=55905*z
v=(w&4294967295)>>>0
u=v+x+this.b
z=(u&4294967295)>>>0
this.a=z
this.b=(C.c.ab(w-v+(y-x)+(u-z),4294967296)&4294967295)>>>0},
al:function(a){var z,y,x
if(a<=0||a>4294967296)throw H.c(P.eC("max must be in range 0 < max \u2264 2^32, was "+a))
z=a-1
if((a&z)>>>0===0){this.bi()
return(this.a&z)>>>0}do{this.bi()
y=this.a
x=y%a}while(y-x+a>=4294967296)
return x},
e5:function(){this.bi()
var z=this.a
this.bi()
return((z&67108863)*134217728+(this.a&134217727))/9007199254740992},
hk:function(a){var z,y,x,w,v,u,t
do{z=(a&4294967295)>>>0
a=C.c.ab(a-z,4294967296)
y=(a&4294967295)>>>0
a=C.c.ab(a-y,4294967296)
x=((~z&4294967295)>>>0)+(z<<21>>>0)
w=(x&4294967295)>>>0
y=(~y>>>0)+((y<<21|z>>>11)>>>0)+C.c.ab(x-w,4294967296)&4294967295
x=((w^(w>>>24|y<<8))>>>0)*265
z=(x&4294967295)>>>0
y=((y^y>>>24)>>>0)*265+C.c.ab(x-z,4294967296)&4294967295
x=((z^(z>>>14|y<<18))>>>0)*21
z=(x&4294967295)>>>0
y=((y^y>>>14)>>>0)*21+C.c.ab(x-z,4294967296)&4294967295
z=(z^(z>>>28|y<<4))>>>0
y=(y^y>>>28)>>>0
x=(z<<31>>>0)+z
w=(x&4294967295)>>>0
v=C.c.ab(x-w,4294967296)
x=this.a*1037
u=(x&4294967295)>>>0
this.a=u
t=(this.b*1037+C.c.ab(x-u,4294967296)&4294967295)>>>0
this.b=t
u=(u^w)>>>0
this.a=u
v=(t^y+((y<<31|z>>>1)>>>0)+v&4294967295)>>>0
this.b=v}while(a!==0)
if(v===0&&u===0)this.a=23063
this.bi()
this.bi()
this.bi()
this.bi()},
p:{
nb:function(a){var z=new P.na(0,0)
z.hk(a)
return z}}}}],["","",,S,{"^":"",hW:{"^":"d;a,b,$ti",
h:function(a,b){return this.b.h(0,b)},
K:function(a){return this.b.K(a)},
H:function(a,b){return this.b.H(0,b)},
gG:function(a){var z=this.b
return z.gG(z)},
ga8:function(a){var z=this.b
return z.ga8(z)},
gk:function(a){var z=this.b
return z.gk(z)},
l:function(a,b,c){this.hN()
this.b.l(0,b,c)},
i:function(a){return J.i(this.b)},
hN:function(){if(!this.a)return
this.a=!1
this.b=P.bF(this.b,H.k(this,0),H.k(this,1))},
$isC:1}}],["","",,S,{"^":"",cQ:{"^":"d;eL:a<,b,$ti",
an:function(a){var z=new S.al(null,null,this.$ti)
z.aA()
z.C(this)
a.$1(z)
return z.D()},
gA:function(a){var z=this.b
if(z==null){z=X.aR(this.a)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$iscQ)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gA(b)
w=this.gA(this)
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
gO:function(a){var z=this.a
return new J.bz(z,z.length,0,null,[H.k(z,0)])},
bb:function(a,b){var z=this.a
z.toString
return new H.ad(z,b,[null,null])},
X:function(a,b){var z=this.a
return(z&&C.a).X(z,b)},
H:function(a,b){var z=this.a
return(z&&C.a).H(z,b)},
by:function(a){var z=this.a
z.toString
return P.az(z,H.k(z,0))},
gG:function(a){return this.a.length===0},
ga8:function(a){return this.a.length!==0},
gJ:function(a){var z=this.a
return(z&&C.a).gJ(z)},
aA:function(){if(new H.ae(H.W(H.k(this,0)),null).B(0,C.n))throw H.c(new P.R('explicit element type required, for example "new BuiltList<int>"'))}},al:{"^":"d;eL:a<,b,$ti",
D:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.cQ(z,null,this.$ti)
y.aA()
this.a=z
this.b=y
z=y}return z},
C:function(a){if(H.bW(a,"$iscQ",this.$ti,null)){this.a=a.geL()
this.b=a}else{this.a=P.Y(a,!0,H.k(this,0))
this.b=null}},
l:function(a,b,c){var z
if(c==null)H.h(P.E("null element"))
z=this.geS()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
t:function(a,b){var z
if(b==null)H.h(P.E("null element"))
z=this.geS();(z&&C.a).t(z,b)},
bb:function(a,b){var z=this.a
z.toString
z=new H.ad(z,b,[null,null]).bd(0,!0)
this.a=z
this.b=null
this.hs(z)},
geS:function(){if(this.b!=null){this.a=P.Y(this.a,!0,H.k(this,0))
this.b=null}return this.a},
aA:function(){if(new H.ae(H.W(H.k(this,0)),null).B(0,C.n))throw H.c(new P.R('explicit element type required, for example "new ListBuilder<int>"'))},
hs:function(a){var z,y,x,w
for(z=a.length,y=H.k(this,0),x=0;x<a.length;a.length===z||(0,H.a9)(a),++x){w=a[x]
if(!H.fI(w,y))throw H.c(P.E("invalid element: "+H.a(w)))}}}}],["","",,A,{"^":"",c6:{"^":"d;hM:a<,b,c,d,$ti",
an:function(a){var z=new A.d4(null,null,this.$ti)
z.c4()
z.C(this)
a.$1(z)
return z.D()},
u:function(){return new S.hW(!0,this.a,this.$ti)},
gA:function(a){var z=this.b
if(z==null){z=this.a.gbR()
z=H.bl(z,new A.hK(this),H.v(z,"x",0),null)
z=P.Y(z,!1,H.v(z,"x",0))
C.a.h3(z)
z=X.aR(z)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$isc6)return!1
y=b.a
x=this.a
if(y.gk(y)!==x.gk(x))return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbR()
this.c=z}z=z.gO(z)
for(;z.v();){v=z.gF()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
i:function(a){return J.i(this.a)},
h:function(a,b){return this.a.h(0,b)},
H:function(a,b){this.a.H(0,b)},
gG:function(a){var z=this.a
return z.gG(z)},
ga8:function(a){var z=this.a
return z.ga8(z)},
gk:function(a){var z=this.a
return z.gk(z)},
c4:function(){if(new H.ae(H.W(H.k(this,0)),null).B(0,C.n))throw H.c(new P.R('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.ae(H.W(H.k(this,1)),null).B(0,C.n))throw H.c(new P.R('explicit value type required, for example "new BuiltMap<int, int>"'))}},hK:{"^":"b:0;a",
$1:function(a){var z,y
z=J.m(a)
y=J.m(this.a.a.h(0,a))
return X.dA(X.b8(X.b8(0,J.m(z)),J.m(y)))}},d4:{"^":"d;a,b,$ti",
D:function(){var z=this.b
if(z==null){z=new A.c6(this.a,null,null,null,this.$ti)
z.c4()
this.b=z}return z},
C:function(a){var z
if(H.bW(a,"$isc6",this.$ti,null)){this.b=a
this.a=a.ghM()}else if(!!a.$isc6){z=P.bF(a.a,H.k(this,0),H.k(this,1))
this.b=null
this.a=z}else if(!!a.$isC){z=P.bF(a,H.k(this,0),H.k(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.a(a.gb1(a))))},
l:function(a,b,c){if(c==null)H.h(P.E("null value"))
this.ghZ().l(0,b,c)},
ghZ:function(){if(this.b!=null){this.a=P.bF(this.a,H.k(this,0),H.k(this,1))
this.b=null}return this.a},
c4:function(){if(new H.ae(H.W(H.k(this,0)),null).B(0,C.n))throw H.c(new P.R('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.ae(H.W(H.k(this,1)),null).B(0,C.n))throw H.c(new P.R('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,Y,{"^":"",
j:function(a,b){if(typeof b!=="number")return H.A(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
ab:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",kt:{"^":"kr;ch,cx,ak:cy@,bg:db@,b,c,d,e,f,r,x,y,z,Q,a",
ft:function(){var z=$.$get$c_()
z.l(0,"game",this.cx)
z.l(0,"hitpoints",this.cy)
z.l(0,"stamina",this.db)},
iY:function(){var z,y,x
this.cx=null
this.cy=Z.cv("Health",new N.kw(),"#CCCCCC","Your physical state",100,0,!0,P.at)
z=Z.cv("Stamina",new N.kx(),"#CCCCCC","Spare physical energy",0,0,!0,P.r)
this.db=z
y=$.$get$bw()
x=this.cy
y=new O.e8(N.aX("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,null,new Y.ao(H.w([],[Y.a2]),0,P.ay()),x,z,O.oH(),O.oG(),O.oF(),y,this.gh1(),new P.bq(""),!1,null)
y.h_()
this.cx=y
y.x="endGame"
$.$get$bV().t(0,0)},
he:function(){var z,y
z=new O.ct([[null,P.a6(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.l(0,"start",z)
z.a="start"
z=new O.ct([new N.kv(this),[null,P.a6(["goto","gameLoop"])]],0,null,!1,!1)
y.l(0,"gameLoop",z)
z.a="gameLoop"
z=new O.ct(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.l(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
p:{
ku:function(){var z,y,x,w
z=Z.cv("Health",new N.o7(),"#CCCCCC","Your physical state",100,0,!0,P.at)
y=Z.cv("Stamina",new N.o8(),"#CCCCCC","Spare physical energy",0,0,!0,P.r)
x=P.o
w=new H.I(0,null,null,null,null,null,0,[x,O.ct])
x=new N.kt("net.filiph.edgehead.0.0.1",null,z,y,new O.ky(w),null,null,null,P.G(null,null,null,x),!1,null,-9999,null,null,null)
x.he()
return x}}},o7:{"^":"b:13;",
$1:function(a){var z=J.l(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.bD(a,0.5))return"\ud83d\ude23"
if(z.ah(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},o8:{"^":"b:7;",
$1:function(a){return H.a(a)+" S"}},kv:{"^":"b:14;a",
$0:function(){var z=0,y=new P.ak(),x=1,w,v=this
var $async$$0=P.af(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.t(v.a.cx.b0(),$async$$0,y)
case 2:return P.t(null,0,y)
case 1:return P.t(w,1,y)}})
return P.t(null,$async$$0,y)}},kw:{"^":"b:13;",
$1:function(a){var z=J.l(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.bD(a,0.5))return"\ud83d\ude23"
if(z.ah(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},kx:{"^":"b:7;",
$1:function(a){return H.a(a)+" S"}}}],["","",,O,{"^":"",
pA:[function(a){var z,y
z=a.gbF()
y=a.gbt()
if(typeof y!=="number")return H.A(y)
return z-2*y},"$1","fL",2,0,12],
pE:[function(a){var z,y,x
z=a.gbF()
y=a.gcq()
if(typeof y!=="number")return H.A(y)
x=a.gbt()
if(typeof x!=="number")return H.A(x)
return z+y-x},"$1","fM",2,0,12],
e8:{"^":"jh;y,z,Q,ch,cx,cy,db,dx,dy,fr,be:fx<,fy,en:go<,ak:id<,bg:k1<,a,b,c,d,e,f,r,x",
h_:function(){var z,y,x,w,v,u
z=[P.o]
y=H.w([],z)
x=P.G(null,null,null,null)
w=$.$get$dP()
x=new R.bN(null,!0,y,null,null,C.i,1,1,0,null,100,!0,!1,x,null,null,!0,C.j,null,w,null)
new O.il().$1(x)
this.cy=x.D()
y=new R.bN(null,!0,H.w([],z),null,null,C.i,1,1,0,null,100,!0,!1,P.G(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.im().$1(y)
this.db=y.D()
y=new K.bJ(null,"deadEscapee","UNUSED because this is the first choice","",null,null,"ground")
x=[Q.aT]
v=new S.al(null,null,x)
v.aA()
v.C([new Q.aT("tunnel","Run towards freedom",null)])
y.a=v.D()
this.dx=y
y=$.$get$dI()
v=y.b
u=new K.bJ(null,"tunnel","You and Briana sprint through the giant worm\u2019s tunnel.\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)","",new O.io(this),null,"{rock|cavern} floor")
x=new S.al(null,null,x)
x.aA()
x.C([new Q.aT(v,"End book",null)])
u.a=x.D()
this.dy=u
u=new R.bN(null,!0,H.w([],z),null,null,C.i,1,1,0,null,100,!0,!1,P.G(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.ip(this).$1(u)
x=u.D()
this.ch=x
this.id.sap(x.r/x.cx)
this.k1.sap(this.ch.fx)
w=new R.bN(null,!0,H.w([],z),null,null,C.i,1,1,0,null,100,!0,!1,P.G(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iq(this).$1(w)
this.cx=w.D()
z=F.kd(this.dx)
this.fr=z
x=this.ch
w=this.cx
v=this.dx
u=this.dy
w=P.az([x,w],R.S)
x=P.aL(null,O.by)
z=new A.b5(w,P.G(null,null,null,U.cY),x,P.az([v,u,y],K.bJ),P.Y([z],!0,S.aA),0)
this.fx=z
y=new Y.ao(H.w([],[Y.a2]),0,P.ay())
y.b=z.f
this.fy=new B.bm(z,null,y,1,1,!0,!1,!1,0)},
bW:function(){var z=0,y=new P.ak(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$bW=P.af(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.go
s=u.giD()
if(t.fp(s)){z=1
break}r=u.fx.a7(u.ch.x)
q=r.gak()
p=r.gfk()
if(typeof q!=="number"){x=q.d0()
z=1
break}u.id.sap(q/p)
u.k1.sap(r.gbg())
p=u.y
p.iW("update() for world at time "+H.a(u.fx.f))
q=u.fx.e
if(q.length===0){u.r=!0
t.aN(0,"\n\n",!0)
if(u.fx.fe(u.ch.x)){o=u.fx.a7(u.ch.x)
t.dL(0,"<subject> look<s> behind",o)
t.dL(0,"<subject> see<s> the giant worm's hideous head approaching",o)
if(u.fx.fe(u.cx.x))t.aN(0,"You both start sprinting again.",!0)
else{t.dL(0,"<subject> take<s> a last look at Briana",o)
t.ic(0,"<subject> start<s> sprinting again, alone",!0,o)}t.aN(0,"\n\n",!0)
t.aN(0,"TO BE CONTINUED.",!0)}else t.aN(0,"You will soon be the giant worm's food.",!0)
u.f.q+=t.cn()
z=1
break}n=C.a.gJ(q)
m=n.d2(u.fx)
q=u.fx
l=N.aX("ActorPlanner")
k=new H.I(0,null,null,null,null,null,0,[null,null])
j=m==null
i=j?m:m.gm()
h=new Y.ao(H.w([],[Y.a2]),0,P.ay())
h.b=q.f
g=new G.hj(l,i,new B.bm(q,null,h,1,1,!0,!1,!1,0),0,!1,k)
if(j)H.h(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(q)+". Situation: "+H.a(q.giu())))
z=3
return P.t(g.jm(),$async$bW,y)
case 3:if(k.gG(k)){l.ef("There are no actions available for actorId="+H.a(i)+".")
j="Actions not available for "+H.a(i)+" and "
i=J.l(q)
q="PlanConsequence<"+i.gA(q)+", "+i.i(q)+", "+C.q.i(null)
l.bu(j+(q+", 1, 0, >")+".")}f=Z.jJ(k)
if(f.b.length===0){p.ej("No recommendation for "+H.a(m.gj()))
u.fx.f5(n.gm())
t=u.fx
s=t.f
if(typeof s!=="number"){x=s.a1()
z=1
break}t.f=s+1
z=1
break}z=m.gI()?4:6
break
case 4:s=f.b
z=s.length===1?7:8
break
case 7:z=9
return P.t(u.bJ((s&&C.a).gbn(s),m,t),$async$bW,y)
case 9:z=1
break
case 8:u.f.q+=t.cn()
C.a.sk(t.a,0)
p.bu("planner.generateTable for "+H.a(m.gj()))
g.eg().H(0,new O.ir(u))
t=f.fs(6,O.fM())
t.toString
e=P.Y(t,!1,H.v(t,"x",0))
t=new O.is(new O.iu())
s=e.length-1
if(s-0<=32)H.eP(e,0,s,t)
else H.eO(e,0,s,t)
for(t=e.length,s=u.c,d=0;d<e.length;e.length===t||(0,H.a9)(e),++d){c=e[d]
s.$3$helpMessage$script(c.gj(),c.ga_(),new O.it(u,m,c))}z=1
break
z=5
break
case 6:q=m.gf3()
z=10
return P.t(u.bJ(f.jl(q==null?O.fM():q),m,t),$async$bW,y)
case 10:case 5:t.fp(s)
case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$bW,y)},
bJ:function(a,b,c){var z=0,y=new P.ak(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$bJ=P.af(function(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t=a.cJ(b,u.fy,u.fx)
s=P.Y(t,!0,H.v(t,"x",0))
z=b.gI()?3:5
break
case 3:r=a.P(b,u.fx)
z=r===1?6:8
break
case 6:u.fy=C.a.gbn(s)
z=7
break
case 8:z=r===0?9:11
break
case 9:u.fy=C.a.gbn(s)
z=10
break
case 11:q=C.a.gJ(J.i(a.gU()).split("."))
t=a.bl(b,u.fx)
p=a.gV()&&b.iT(a.gU())
o="use "+H.a(q)
u.eO()
z=12
return P.t(u.e.$4$rerollEffectDescription$rerollable(r,t,o,p),$async$bJ,y)
case 12:n=e
p=new H.O(s,new O.ii(n),[H.k(s,0)])
u.fy=p.gbn(p)
if(n.gjI()===!0){m=A.dn(u.fy.gbe())
m.ae(b.gm(),new O.ij())
t=u.fy
p=t.geU()
o=H.w([],[Y.a2])
l=new Y.ao(o,0,P.ay())
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
case 5:g=S.k_(new H.ad(s,new O.ik(),[null,null]),1)
if(g>=s.length){x=H.e(s,g)
z=1
break}u.fy=s[g]
case 4:C.a.as(c.a,u.fy.gen().a)
u.fx=u.fy.gbe()
case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$bJ,y)}},
il:{"^":"b:0;",
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
a.c=new U.cy(!1,10,!0,z,"sword",C.d)
a.gn()
a.f=2
a.gn()
a.r=2
z=$.$get$dH()
a.gn()
a.fx=z
a.gn()
a.fy=O.fL()
return a}},
im:{"^":"b:0;",
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
a.c=new U.cy(!1,10,!0,z,"scimitar",C.d)
z=$.$get$dH()
a.gn()
a.fx=z
a.gn()
a.fy=O.fL()
return a}},
io:{"^":"b:0;a",
$1:function(a){var z=this.a
return[z.cy,z.db]}},
ip:{"^":"b:0;a",
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
a.c=new U.cy(!1,10,!0,z,"sword",C.d)
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
iq:{"^":"b:0;a",
$1:function(a){var z,y
a.gn()
a.y=100
a.gn()
a.dy=C.a1
a.gn()
a.cy="Briana"
z=$.$get$aI()
a.gn()
a.c=new U.cy(!1,10,!0,z,"longsword",C.d)
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
ir:{"^":"b:0;a",
$1:function(a){return this.a.y.bu(a)}},
iu:{"^":"b:19;",
$1:function(a){if(a instanceof Q.K)return H.a(a.b.gj())+" "+a.gj()
return"ZZZZZZ "+H.a(a.gj())}},
is:{"^":"b:5;a",
$2:function(a,b){var z=this.a
return J.c1(z.$1(a),z.$1(b))}},
it:{"^":"b:14;a,b,c",
$0:function(){var z=0,y=new P.ak(),x=1,w,v=this,u
var $async$$0=P.af(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:u=v.a
z=2
return P.t(u.bJ(v.c,v.b,u.go),$async$$0,y)
case 2:return P.t(null,0,y)
case 1:return P.t(w,1,y)}})
return P.t(null,$async$$0,y)}},
ii:{"^":"b:0;a",
$1:function(a){return a.ge0()===this.a.ge0()}},
ij:{"^":"b:0;",
$1:function(a){var z=a.gbg()
if(typeof z!=="number")return z.aq()
a.sbg(z-1)
return a}},
ik:{"^":"b:0;",
$1:function(a){return a.gjn()}}}],["","",,Q,{"^":"",
fO:function(a,b,c){return new P.aE(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$fO(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=t.length!==0?C.a.gJ(t):null
s=J.hf(t.bf(y.a,y),new Q.ol(z))
t=J.aa(s.a),r=new H.fi(t,s.b,[H.k(s,0)])
case 2:if(!r.v()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.ga0()&&!z.dW(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aC()
case 1:return P.aD(u)}}})},
fP:function(a,b,c){return new P.aE(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$fP(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=y.eh((t.length!==0?C.a.gJ(t):null).gaX()).giH().a,t=new J.bz(t,t.length,0,null,[H.k(t,0)])
case 2:if(!t.v()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aC()
case 1:return P.aD(u)}}})},
ol:{"^":"b:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gba()}},
k9:{"^":"d;a",
i:function(a){return C.W.h(0,this.a)},
p:{"^":"pe<"}},
ac:{"^":"d;",
cJ:function(a,b,c){var z=this
return new P.aE(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cJ(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.P(y,x.gbe())
v=s>0?2:3
break
case 2:r=A.dn(w)
v=4
return B.ex(r,x,z,z.ho(r,y,w,z.gR(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dn(w)
v=7
return B.ex(r,x,z,z.hn(r,y,w,z.gS(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aC()
case 1:return P.aD(t)}}})},
eu:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.a.bG(0,new Q.hh(b))
y=new O.hg(null,null,null,null,null,null,null,null,null,C.P,null)
y.d=new H.ae(H.dM(this),null).i(0)
y.c=this.gj()
y.Q=b
y.b=P.az(!!this.$isK?[this.b]:[],null)
y.e=f
y.f=e
y.r=this.ga0()
x=new Y.ao(H.w([],[Y.a2]),0,P.ay())
w=a.e
v=(w.length!==0?C.a.gJ(w):null).gm()
u=a.gA(a);(w.length!==0?C.a.gJ(w):null).fo(a,x)
if(a.gA(a)!==u)throw H.c(new P.N("Please don't change the world in onBeforeAction"))
this.a=d.$3(z,a,x)
if(a.dr(v)!=null)a.f5(v)
t=a.f
if(typeof t!=="number")return t.a1()
a.f=t+1
t=a.fP(v)
if(!(t==null))t.fn(a,x)
while(!0){t=w.length!==0?C.a.gJ(w):null
if((t==null?t:t.d2(a))!=null){t=w.length!==0?C.a.gJ(w):null
t=!J.f(t==null?t:t.d5(a),!0)}else t=!0
if(!t)break
if((w.length!==0?C.a.gJ(w):null)==null)break
C.a.bU(w)}if(this.a==null)H.h(new P.N("No description given when executing "+this.i(0)+". You should return it from your world-modifying function."))
y.a=a
w=this.a
y.y=w
t=a.f
y.x=t
s=y.c
r=y.d
q=y.Q.gm()
p=y.b
p.toString
p=P.az(new H.cS(p,O.nR(),[H.k(p,0),null]),null)
o=y.e
n=y.f
m=y.r
a.c.eX(new O.by(w,s,r,t,q,P.G(null,null,null,P.r),p,y.z,o,n,m))
return x},
ho:function(a,b,c,d,e){return this.eu(a,b,c,d,!1,e)},
hn:function(a,b,c,d,e){return this.eu(a,b,c,d,e,!1)}},
hh:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.gm())}},
K:{"^":"ac;bt:b<",
gj:function(){var z=new Y.ao(H.w([],[Y.a2]),0,P.ay())
z.ia(0,this.ga5(),this.b)
return z.cn()},
bl:function(a,b){var z=new Y.ao(H.w([],[Y.a2]),0,P.ay())
z.ih(0,this.ga6(),this.b,a,!0)
return z.cn()},
i:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga5()+"::enemy="+H.a(z.gm())+"/"+H.a(z.gj())+">"}},
cc:{"^":"ac;",
gj:function(){return this.b.gat()},
i:function(a){return"ExitAction<"+H.a(this.b.gat())+">"}}}],["","",,O,{"^":"",
pw:[function(a){return a.gm()},"$1","nR",2,0,40],
by:{"^":"d;at:a<,eV:b<,dK:c<,L:d<,cS:e<,f,dc:r<,ja:x<,fK:y<,z,fJ:Q<",
gA:function(a){var z,y
z=Y.j(Y.j(0,J.m(this.d)),J.m(this.a))
y=this.e
return Y.ab(Y.j(Y.j(Y.j(Y.j(Y.j(z,X.aR(y==null?new P.fq(0,null,null,null,null,null,0,[null]):P.az([y],null))),X.aR(this.r)),H.Z(this.x)),J.m(this.y)),J.m(this.z)))},
B:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$isby&&this.gA(this)===z.gA(b)},
i:function(a){return"ActionRecord<"+H.a(this.c)+", "+H.a(this.b)+", "+H.a(this.a)+">"}},
hg:{"^":"d;a,dc:b<,eV:c<,dK:d<,fK:e<,f,fJ:r<,L:x<,at:y<,z,cS:Q<"},
j7:{"^":"d;a",
i:function(a){return C.a0.h(0,this.a)}}}],["","",,R,{"^":"",
fQ:function(a,b){return new P.aE(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$fQ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bR(new H.O(u,new R.om(z),[H.k(u,0)]))
case 3:return P.aC()
case 1:return P.aD(v)}}})},
om:{"^":"b:0;a",
$1:function(a){var z,y
z=a.gdU()
y=this.a.gm()
return z==null?y==null:z===y}},
S:{"^":"jo;",
gbk:function(){return this.r>0},
gaQ:function(){return this.dx===C.k},
ga9:function(){return this.dx===C.o},
ga4:function(){return this.dx===C.i},
iT:function(a){return this.fx>=1},
dW:function(a,b){return this.fg(a,b)>0},
fg:function(a,b){var z,y
if(this.e_(b)){z=a.gbc()
y=this.fy.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 10
if(this.hI(a,b,10))return 1
z=a.gbc()
y=this.fy.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
e_:function(a){var z,y
z=a.cW("Confuse",this,!0)
if(z==null)return!1
y=a.jy("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cA:function(a){var z,y,x
z=a.a7(this.x)
y=z.gak()
if(typeof y!=="number")return H.A(y)
x=2*y
if(!z.gbk())x-=10
y=a.a
return new A.cN(x,new H.O(y,new R.hG(this),[H.k(y,0)]).aP(0,0,new R.hH()),y.aP(0,0,new R.hI(this,a)))},
aw:function(a){var z=this.e
return z!=null&&z.a===a},
hI:function(a,b,c){var z=b.jz(a,this,!0)
if(z==null)return!1
return z<=c},
$isbi:1},
jo:{"^":"d+cU;"},
hG:{"^":"b:0;a",
$1:function(a){return J.f(a.gbc(),this.a.fy)}},
hH:{"^":"b:37;",
$2:function(a,b){return J.a_(J.a_(a,b.gba()?2:0),2*b.gak())}},
hI:{"^":"b:42;a,b",
$2:function(a,b){var z=b.gba()?1:0
return J.a_(a,(z+b.gak())*this.a.fg(b,this.b))}},
hi:{"^":"d;Y:c<,av:e?,ak:f@,bg:x<,m:y<,I:ch<,j:cy@,aX:db@,E:dy<,dU:fr<,bc:fx<"},
db:{"^":"d;a",
i:function(a){return C.z.h(0,this.a)}},
m6:{"^":"S;a,b,f3:c<,aX:d<,Y:e<,dU:f<,ak:r<,m:x<,y,dY:z<,I:Q<,ch,fk:cx<,j:cy<,cP:db<,dx,E:dy<,fr,bg:fx<,bc:fy<",
an:function(a){var z=new R.bN(null,!0,H.w([],[P.o]),null,null,C.i,1,1,0,null,100,!0,!1,P.G(null,null,null,null),null,null,!0,C.j,null,$.$get$dP(),null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.S))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(0,C.p.gA(!0)),H.Z(this.b)),J.m(this.c)),J.m(this.d)),J.m(this.e)),J.m(this.f)),this.r&0x1FFFFFFF),J.m(this.x)),this.y&0x1FFFFFFF),C.p.gA(!0)),C.p.gA(this.Q)),H.Z(this.ch)),this.cx&0x1FFFFFFF),J.m(this.cy)),C.p.gA(this.db)),H.Z(this.dx)),H.Z(this.dy)),C.q.gA(this.fr)),this.fx&0x1FFFFFFF),J.m(this.fy)))},
i:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.aV(this.b,"[","]")+",\ncombineFunction="+J.i(this.c)+",\ncurrentRoomName="+H.a(J.i(this.d))+",\ncurrentWeapon="+J.i(this.e)+",\nfollowingActorId="+J.i(this.f)+",\nhitpoints="+C.h.i(this.r)+",\nid="+J.i(this.x)+",\ninitiative="+C.c.i(this.y)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.Q)+",\nitems="+P.aV(this.ch,"{","}")+",\nmaxHitpoints="+C.c.i(this.cx)+",\nname="+J.i(this.cy)+",\nnameIsProperNoun="+String(this.db)+",\npose="+H.a(C.z.h(0,this.dx.a))+",\npronoun="+this.dy.a+",\nshield="+C.q.i(this.fr)+",\nstamina="+C.h.i(this.fx)+",\nteam="+J.i(this.fy)+",\n}"}},
bN:{"^":"hi;go,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
gf3:function(){this.gn()
return this.fy},
gaX:function(){this.gn()
return this.db},
saX:function(a){this.gn()
this.db=a},
gY:function(){this.gn()
return this.c},
gdU:function(){this.gn()
return this.fr},
gak:function(){this.gn()
return this.f},
sak:function(a){this.gn()
this.f=a},
gm:function(){this.gn()
return this.y},
gI:function(){this.gn()
return this.ch},
gfk:function(){this.gn()
return this.r},
gj:function(){this.gn()
return this.cy},
sj:function(a){this.gn()
this.cy=a},
gcP:function(){this.gn()
return this.dx},
sav:function(a){this.gn()
this.e=a},
gE:function(){this.gn()
return this.dy},
gbg:function(){this.gn()
return this.x},
sbg:function(a){this.gn()
this.x=a},
gbc:function(){this.gn()
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
z=new R.m6(!0,y,x,w,v,u,t,s,r,!0,q,p,o,n,m,l,k,j,i,h)
if(s==null)H.h(P.u("id"))
if(n==null)H.h(P.u("name"))
if(h==null)H.h(P.u("team"))}this.C(z)
return z}}}],["","",,A,{"^":"",cN:{"^":"d;bF:a<,cq:b<,bt:c<",
aq:function(a,b){return new A.a5(this.a-b.gbF(),J.ah(this.b,b.gcq()),J.ah(this.c,b.gbt()))},
i:function(a){return"ActorScore<self="+C.h.cr(this.a,2)+",team="+J.bg(this.b,2)+",enemy="+J.bg(this.c,2)+">"}},a5:{"^":"d;bF:a<,cq:b<,bt:c<",
gj7:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
a1:function(a,b){return new A.a5(this.a+b.gbF(),J.a_(this.b,b.gcq()),J.a_(this.c,b.gbt()))},
bE:function(a,b){return new A.a5(this.a*b,J.bf(this.b,b),J.bf(this.c,b))},
d0:function(a,b){if(typeof b!=="number")return H.A(b)
return new A.a5(this.a/b,J.be(this.b,b),J.be(this.c,b))},
i:function(a){return"ActorScoreChange<self="+C.h.cr(this.a,2)+",team="+J.bg(this.b,2)+",enemy="+J.bg(this.c,2)+">"},
p:{
hF:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.a9)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.A(r)
w+=r
r=s.c
if(typeof r!=="number")return H.A(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.a5(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
oW:function(a){switch(a){case C.J:return"spear"
case C.K:return"branch"
case C.L:return"tent"
case C.d:return"sword"
default:throw H.c(P.E(a))}},
cY:{"^":"jp;ee:a<",
gat:function(){return U.oW(this.a)},
$isbi:1},
jp:{"^":"d+cU;"},
ce:{"^":"d;a",
i:function(a){return C.Y.h(0,this.a)}},
cy:{"^":"cY;b,c,dY:d<,bc:e<,j:f<,a",
gm:function(){return H.Z(this)},
gbk:function(){return!1},
gI:function(){return!1},
gcP:function(){return!1},
gE:function(){return C.j}}}],["","",,G,{"^":"",jh:{"^":"d;",
eO:function(){var z,y
z=this.f
y=z.q
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.q=""}},
jV:[function(a){this.f.q+=a},"$1","giD",2,0,15],
b0:function(){var z=0,y=new P.ak(),x,w=2,v,u=this,t,s
var $async$b0=P.af(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.x==null)throw H.c(new P.N("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.r){u.d.sk(0,0)
u.a.$1(u.x)
z=1
break}t=u.d
s=u.f
case 3:if(!!0){z=4
break}if(!(!u.r&&t.gk(t)===0&&s.q.length===0)){z=4
break}z=5
return P.t(u.bW(),$async$b0,y)
case 5:z=3
break
case 4:u.eO()
case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$b0,y)}}}],["","",,B,{"^":"",e2:{"^":"d;cz:a<,cN:b<,ck:c<",
i:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.h.cr(this.b,3)+", score="+this.a.i(0)+">"}},bm:{"^":"d;be:a<,eU:b<,en:c<,jn:d<,cN:e<,f,r,e0:x<,ck:y<",
gA:function(a){return X.aR([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
B:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$isbm&&this.gA(this)===z.gA(b)},
i:function(a){var z,y
z=this.a
y=J.l(z)
z="PlanConsequence<"+y.gA(z)+", "+y.i(z)+", "+J.i(this.b)+", "+H.a(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
p:{
ex:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gcN()
z=z?0:b.gck()+1
d.b=a.f
return new B.bm(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",hj:{"^":"d;a,b,c,d,e,f",
ir:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.Z("...")
z.Z("combining scores")
y=H.w([],[A.a5])
x=new G.hD()
for(w=J.aa(a),v=b.a,u=b.b,t=b.c,s=null;w.v();){r=w.gF()
z.Z(new G.hB(r))
if(r.gcN()>0.15)if(s==null){z.Z("    - first _bestCase")
s=r}else if(J.a0(x.$1(r.gcz()),x.$1(s.gcz()))){z.Z("    - new _bestCase")
s=r}q=r.gcz()
p=J.ah(q.b,u)
o=J.ah(q.c,t)
n=r.b
m=new A.a5((q.a-v)*n,J.bf(p,n),J.bf(o,n))
z.Z(new G.hC(m))
y.push(m)}l=A.hF(y)
x=s==null
if(x)k=C.D
else{w=s.gcz()
k=new A.a5(w.a-v,J.ah(w.b,u),J.ah(w.c,t))}x=x?s:s.gck()
if(typeof x!=="number")return H.A(x)
x=new A.a5(k.a/x,J.be(k.b,x),J.be(k.c,x))
z.Z("- uplifts average = "+("ActorScoreChange<self="+C.h.cr(l.a,2)+",team="+J.bg(l.b,2)+",enemy="+J.bg(l.c,2)+">"))
z.Z("- best = "+x.i(0))
j=x.a1(0,l)
z.Z("- result = "+j.i(0))
return j},
eg:function(){var z=this
return new P.aE(function(){var y=0,x=1,w,v,u,t,s
return function $async$eg(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbR(),u=u.gO(u),t=1
case 2:if(!u.v()){y=3
break}s=u.gF()
y=4
return""+t+") "+H.a(s.gj())+"\t"+H.a(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aC()
case 1:return P.aD(w)}}})},
cQ:function(a,b,c){var z=0,y=new P.ak(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j
var $async$cQ=P.af(function(d,e){if(d===1){w=e
z=x}while(true)switch(z){case 0:u=v.f
u.aG(0)
t=v.c
s=t.a
r=s.a.bG(0,new G.hE(v))
q=r.cA(s)
p=v.a
o=r.cy
p.bu("Planning for "+H.a(o)+", initialScore="+q.i(0))
n=new P.aO(v.ds(r,s).a(),null,null,null)
case 2:if(!n.v()){z=3
break}m=n.c
l=m==null?n.b:m.gF()
p.aO("Evaluating action '"+H.a(l.gj())+"' for "+H.a(o))
if(!l.N(r,s)){p.aO("- action '"+H.a(l.gj())+"' isn't applicable")
z=2
break}z=4
return P.t(v.c1(t,l,b,a,c).bV(0),$async$cQ,y)
case 4:k=e
m=J.F(k)
if(m.gG(k)===!0){p.aO("- action '"+H.a(l.gj())+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity.")
u.l(0,l,C.E)
z=2
break}p.aO("- action '"+H.a(l.gj())+"' leads to "+H.a(m.gk(k))+" different ConsequenceStats, initialScore="+q.i(0))
j=v.ir(k,q,b)
u.l(0,l,j)
p.aO("- action '"+H.a(l.gj())+"' was scored "+H.a(j))
z=2
break
case 3:v.e=!0
return P.t(null,0,y)
case 1:return P.t(w,1,y)}})
return P.t(null,$async$cQ,y)},
jm:function(){return this.cQ(50,10,null)},
ds:function(a,b){return new P.aE(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p
return function $async$ds(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.bR((u.length!==0?C.a.gJ(u):null).gbK())
case 2:u=(u.length!==0?C.a.gJ(u):null).gb5()
t=u.length
s=H.ag(H.ar(Q.cc),[H.ar(Q.aT)])
r=H.ag(H.ar(Q.K),[H.ar(R.S)])
q=0
case 3:if(!(q<u.length)){x=5
break}p=u[q]
x=r.aL(p)?6:8
break
case 6:x=9
return P.bR(Q.fO(z,y,p))
case 9:x=7
break
case 8:x=s.aL(p)?10:12
break
case 10:x=13
return P.bR(Q.fP(z,y,p))
case 13:x=11
break
case 12:throw H.c(new P.N(p.i(0)+" is not one of the supported ones"))
case 11:case 7:case 4:u.length===t||(0,H.a9)(u),++q
x=3
break
case 5:return P.aC()
case 1:return P.aD(v)}}})},
c1:function(a3,a4,a5,a6,a7){var $async$c1=P.af(function(a8,a9){switch(a8){case 2:u=x
z=u.pop()
break
case 1:v=a9
z=w}while(true)switch(z){case 0:s={}
r=a3.a
q=r.a.bG(0,new G.hm(t))
p=t.a
p.aO("=====")
p.aO(new G.hn(a4,q))
p.aO(new G.ho(a4))
if(!a4.N(q,r)){p.aO("- firstAction not applicable")
z=1
break}o=q.cA(r)
p.aO(new G.ht(a3,o))
p.aO(new G.hu(a3))
n=P.aL(null,B.bm)
m=P.G(null,null,null,A.b5)
l=J.l(r)
k=l.gA(r)
for(j=new P.aO(a4.cJ(q,a3,r).a(),null,null,null);j.v();){i=j.c
h=i==null?j.b:i.gF()
if(l.gA(r)!==k)throw H.c(new P.N("Action "+a4.i(0)+" modified world state when producing "+H.a(h)+"."))
n.af(h)}s.a=0
r=t.b
case 3:if(!!n.gG(n)){z=4
break}++s.a
g=n.cT()
p.Z("----")
p.Z(new G.hv(g))
p.Z(new G.hw(g))
if(g.gck()>a5||s.a>a6){p.Z(new G.hx(s,a5,g))
p.Z(new G.hy(g))
z=4
break}z=g.gbe().e.length===0?5:6
break
case 5:p.Z("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.b8(0,new G.hz(t),new G.hA())
if(q==null){p.Z("- this actor ("+H.a(r)+") has been removed")
z=3
break}f=new B.e2(q.cA(l),g.e,g.y)
p.Z(new G.hp(f))
z=7
x=[1]
return P.cE(P.fo(f),$async$c1,y)
case 7:z=3
break
case 6:l=g.a
j=l.e
e=(j.length!==0?C.a.gJ(j):null).d2(l)
q=l.a.bG(0,new G.hq(t))
d=J.f(e,q)
p.Z("- actor: "+H.a(e.gj())+" (isMain=="+d+")")
p.Z("- mainActor: "+H.a(q.gj()))
f=new B.e2(q.cA(l),g.e,g.y)
p.Z(new G.hr(o,f))
p.Z(new G.hs(g))
z=8
x=[1]
return P.cE(P.fo(f),$async$c1,y)
case 8:p.Z("- generating all actions for "+H.a(e.gj()))
j=n.c
i=n.b
c=n.a
for(b=new P.aO(t.ds(e,l).a(),null,null,null);b.v();){a=b.c
a0=a==null?b.b:a.gF()
if(!a0.N(e,l))continue
for(a=new P.aO(a0.cJ(e,g,l).a(),null,null,null);a.v();){a1=a.c
a2=a1==null?a.b:a1.gF();++t.d
if(a2.gcN()<0.05)continue
if(m.X(0,a2.gbe()))continue
n.af(a2)}}p.Z("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&c.length-1)>>>0))+" new PlanConsequences")
m.t(0,l)
z=3
break
case 4:case 1:return P.cE(null,0,y)
case 2:return P.cE(v,1,y)}})
var z=0,y=P.mp($async$c1),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
return P.nP(y)}},hD:{"^":"b:20;",
$1:function(a){return J.ah(a.b,a.c)}},hB:{"^":"b:1;a",
$0:function(){return"  - consequence: "+H.a(this.a)}},hC:{"^":"b:1;a",
$0:function(){return"    - uplift = "+this.a.i(0)}},hE:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hm:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hn:{"^":"b:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+H.a(this.a.gj())+"' of "+H.a(this.b.gj())}},ho:{"^":"b:1;a",
$0:function(){return"- firstAction == "+this.a.i(0)}},ht:{"^":"b:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.i(0)+", cumProb="+H.a(z.e)+" (prob="+H.a(z.d)+", ord="+z.y+")"}},hu:{"^":"b:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bE(" ",z.y)+"- "+J.i(z.b)}},hv:{"^":"b:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+H.a(this.a.geU().gj())+"'"}},hw:{"^":"b:1;a",
$0:function(){var z=this.a.gbe().e
return"- situation: "+H.a(J.h8(z.length!==0?C.a.gJ(z):null))}},hx:{"^":"b:1;a,b,c",
$0:function(){return"- order ("+this.c.gck()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},hy:{"^":"b:1;a",
$0:function(){var z=this.a.gbe().c
return"- how we got here: "+new H.ad(z,new G.hl(),[H.k(z,0),null]).cj(0," <- ")}},hl:{"^":"b:0;",
$1:function(a){return a.gat()}},hz:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hA:{"^":"b:1;",
$0:function(){return}},hp:{"^":"b:1;a",
$0:function(){return"- "+this.a.i(0)}},hq:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hr:{"^":"b:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.i(0)+" (initial="+this.a.i(0)+")"}},hs:{"^":"b:1;a",
$0:function(){var z=this.a.gbe().c
return"- how we got here: "+new H.ad(z,new G.hk(),[H.k(z,0),null]).cj(0," <- ")}},hk:{"^":"b:0;",
$1:function(a){return a.gat()}}}],["","",,Z,{"^":"",jI:{"^":"d;a,b",
gbK:function(){return this.b},
gG:function(a){return this.b.length===0},
fs:function(a,b){var z=this
return new P.aE(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fs(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bR(t)
case 5:w=1
break
case 4:s=z.hC(new Z.jL())
r=z.dq(new Z.jM(),[s])
q=z.dq(new Z.jN(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bn().bu("best self preserving: "+H.a(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bn().bu("best enemy damaging: "+H.a(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bn().bu("best team preserving: "+H.a(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}t=z.b;(t&&C.a).cC(t,new Z.jO(z,x))
t=z.b,o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.l(m)
if(l.B(m,s)){w=17
break}if(l.B(m,r)){w=17
break}if(l.B(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.a9)(t),++n
w=16
break
case 18:case 1:return P.aC()
case 2:return P.aD(u)}}})},
dq:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.a9)(z),++u){t=z[u]
if(C.a.X(b,t))continue
if(w==null||J.a0(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hC:function(a){return this.dq(a,C.l)},
jl:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=this.b
if(y.length===1)return(y&&C.a).gbn(y);(y&&C.a).cC(y,new Z.jP(this,a))
y=this.a.a
x=y.gbX().aP(0,1/0,new Z.jQ(a))
w=y.gbX().aP(0,-1/0,new Z.jR(a))
y=J.a8(w)
v=J.a8(x)
u=v.aq(x,J.bf(y.aq(w,x),0.1))
z.a=u
if(v.B(x,w)){u=J.ah(u,1)
z.a=u
v=u}else v=u
t=y.aq(w,v)
s=P.jf(this.b.length,new Z.jS(z,this,a,t),!1,P.J)
r=new H.ad(s,new Z.jT(C.a.aP(s,0,Z.fY())),[null,null]).bd(0,!1)
z=C.a.aP(r,0,Z.fY())
if(typeof z!=="number")return H.A(z)
v=r.length
y=v-1
if(y<0)return H.e(r,y)
z=J.a_(r[y],1000-z)
if(y>=r.length)return H.e(r,y)
r[y]=z
q=S.k0(r,1000)
z=this.b
if(q>=z.length)return H.e(z,q)
return z[q]},
hb:function(a){var z,y
if(a.gG(a))$.$get$bn().ef("Created with no recommendations.")
z=a.gbR()
y=H.v(z,"x",0)
y=P.Y(new H.O(z,new Z.jK(a),[y]),!1,y)
this.b=y
if(y.length===0)$.$get$bn().ef("After removing actions scored by undefined, there are no recommendations.")},
p:{
jJ:function(a){var z=new Z.jI(new P.fh(a,[null,null]),null)
z.hb(a)
return z},
pc:[function(a,b){return J.a_(a,b)},"$2","fY",4,0,41]}},jK:{"^":"b:0;a",
$1:function(a){return!this.a.h(0,a).gj7()}},jL:{"^":"b:0;",
$1:function(a){return a.gbF()}},jM:{"^":"b:0;",
$1:function(a){return J.h4(a.gbt())}},jN:{"^":"b:0;",
$1:function(a){return a.gcq()}},jO:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c1(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},jP:{"^":"b:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c1(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},jQ:{"^":"b:5;a",
$2:function(a,b){return P.ow(a,this.a.$1(b))}},jR:{"^":"b:5;a",
$2:function(a,b){return P.ov(a,this.a.$1(b))}},jS:{"^":"b:7;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.be(J.ah(this.c.$1(z.a.a.h(0,y[a])),this.a.a),this.d)}},jT:{"^":"b:0;a",
$1:function(a){return J.hc(J.bf(J.be(a,this.a),1000))}}}],["","",,K,{"^":"",bJ:{"^":"d;a,j:b<,at:c<,d,ji:e<,f,bC:r<",
giH:function(){return this.a},
gA:function(a){return C.b.gA(this.b)},
B:function(a,b){if(b==null)return!1
return b instanceof K.bJ&&b.b===this.b},
p:{
kc:function(a,b,c,d,e,f,g){var z,y
z=new K.bJ(null,a,b,c,d,e,g)
y=new S.al(null,null,[Q.aT])
y.aA()
y.C(f)
z.a=y.D()
return z}}}}],["","",,Q,{"^":"",aT:{"^":"d;f4:a<,at:b<,c"}}],["","",,S,{"^":"",aA:{"^":"d;",
gb5:function(){return C.l},
gbK:function(){return C.l},
d2:function(a){return this.b4(this.gL(),a)},
fn:function(a,b){},
fo:function(a,b){},
d5:function(a){return!0}}}],["","",,S,{"^":"",
eB:function(a){var z=$.$get$b0().al(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
k_:function(a,b){var z,y,x,w,v
z=$.$get$b0().e5()*b
for(y=new H.ci(a,a.gk(a),0,null,[H.v(a,"am",0)]),x=0,w=0;y.v();){v=y.d
if(typeof v!=="number")return H.A(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
k0:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b0().al(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.a9)(a),++v){t=a[v]
if(typeof t!=="number")return H.A(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
cn:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.b9(a,"{")
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
if(q>1){p=$.$get$b0().al(q)
o=C.b.az(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cn(C.b.az(a,m+1,y[l]))
if(typeof x!=="number")return x.a1()
l+=C.b.az(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cn(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a1()
v=u+1
return C.b.az(a,0,v)+S.cn(C.b.bh(a,v))}}else return a},
bo:function(a,b,c,d){switch($.$get$b0().al(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
k1:function(a){if(a<0||a>1)throw H.c(P.U(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b0().e5()<a}}],["","",,Y,{"^":"",a2:{"^":"d;ay:a<,ar:b<,am:c<,fq:d<,e,cK:f@,fu:r<,fl:x<,eo:y<,iG:z<,h4:Q<,cu:ch<,cx,j6:cy<,L:db<",
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
default:throw H.c(P.E("Invalid key "+H.a(b)+"."))}}},ao:{"^":"d;a,L:b<,c",
gdV:function(){return C.a.bO(this.a,new Y.la())},
aM:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.bd(b).dS(b,".")||C.b.dS(b,"!")||C.b.dS(b,"?"))&&C.b.d8(b,P.b1("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a2(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
t:function(a,b){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
aN:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
dL:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c,!1,null,!1)},
ic:function(a,b,c,d){return this.aM(a,b,null,!1,c,!1,!1,null,null,null,!1,!1,d,!1,null,!1)},
ia:function(a,b,c){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
M:function(a,b,c,d,e,f,g,h,i,j){return this.aM(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
ig:function(a,b,c,d,e){return this.aM(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ie:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
eW:function(a,b,c,d){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
ib:function(a,b,c,d){return this.aM(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
ih:function(a,b,c,d,e){return this.aM(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
bN:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.b9(a,"<owner's> "+b)!==-1||C.b.b9(a,"<ownerPronoun's> "+b)!==-1||C.b.b9(a,"<object-owner's> "+b)!==-1||C.b.b9(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(!c.gcP()){z=this.c
y=z.h(0,c.gm())
if(y==null)y=-1
if(typeof y!=="number")return y.ah()
if(typeof e!=="number")return H.A(e)
if(y<e)x=C.b.cU(a,b,"the "+b)
else{x=J.cM(c.gj(),P.b1("[aeiouy]",!1,!1))?C.b.cU(a,b,"an "+b):C.b.cU(a,b,"a "+b)
z.l(0,c.gm(),e)}}else x=null
return x==null?a:x},
dT:function(a,b){var z,y
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
return new P.aE(function(){var y=a
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
case 14:case 13:case 1:return P.aC()
case 2:return P.aD(v)}}})},
au:[function(a){var z=J.a8(a)
if(z.ah(a,0)||z.bB(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gam()}},"$1","gam",2,0,16],
jj:function(a,b){var z
if(!this.ao(a)||!this.ao(b))return!1
if(this.dT(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geo()}return!1},
fp:function(a){var z
for(z=!1;this.gdV();z=!0){a.$1(this.fw(!0))
this.jq()}return z},
fw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.aP(z,[],new Y.lb())
C.a.hX(z,new Y.lc(y),!1)
x=a&&this.gdV()?C.a.b9(z,C.a.f9(z,new Y.ld()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dT(p,s)
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
if(!z[p].giG()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcu())if(this.cI(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcK()}else n=!1
n=n||this.jA(s)>4}else n=!0
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
u=!1}else if(t){r+=S.eB([" but "," but ",", but "])
u=!this.fQ(s,s+1)&&!0}else{r+=S.eB([" and "," and ",", and "])
u=!0}}m=this.da(s)
p=!v
if(p){n=s-1
if(this.cI(s,n))if(J.cM(this.da(n),"<subject> "))if(J.cM(m,"<subject> "))m=H.bx(m,"<subject> ","",0)}l=J.hb(m,"<action>",this.da(s))
if(this.i_(s,s-1))n=!(this.au(s).gE()===C.j&&this.a2(s).gE()===C.j)
else n=!1
if(n){n=this.au(s).gE()
l=H.p(l,"<object-owner's> <object>",n.b)
n=this.au(s).gE()
l=H.p(l,"<object-ownerPronoun's> <object>",n.b)
n=this.au(s).gE()
l=H.p(l,"<object>",n.b)
n=this.au(s).gE()
l=H.p(l,"<object's>",n.c)}if(this.cI(s,s-1)){n=this.a2(s).gE()
l=H.p(l,"<owner's> <subject>",n.a)
n=this.a2(s).gE()
l=H.p(l,"<ownerPronoun's> <subject>",n.a)
n=this.a2(s).gE()
l=H.p(l,"<subject>",n.a)
n=this.a2(s).gE()
l=H.p(l,"<subject's>",n.c)}n=s-1
if(this.au(n)!=null)if(this.a2(s)!=null)if(this.a2(n)!=null){k=this.au(n)
k=k==null?k:k.gm()
j=this.a2(s)
if(J.f(k,j==null?j:j.gm())){k=this.a2(n)
k=k==null?k:k.gE()
j=this.a2(s)
k=!J.f(k,j==null?j:j.gE())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.a2(s).gE()
l=H.p(l,"<owner's> <subject>",k.a)
k=this.a2(s).gE()
l=H.p(l,"<ownerPronoun's> <subject>",k.a)
k=this.a2(s).gE()
l=H.p(l,"<subject>",k.a)
k=this.a2(s).gE()
l=H.p(l,"<subject's>",k.c)}if(this.a2(n)!=null)if(this.au(s)!=null){k=this.a2(n)
k=k==null?k:k.gm()
j=this.au(s)
if(J.f(k,j==null?j:j.gm())){n=this.a2(n)
n=n==null?n:n.gE()
k=this.a2(s)
n=!J.f(n,k==null?k:k.gE())}else n=!1}else n=!1
else n=!1
if(n){n=this.au(s).gE()
l=H.p(l,"<object-owner's> <object>",n.a)
n=this.au(s).gE()
l=H.p(l,"<object-ownerPronoun's> <object>",n.a)
n=this.au(s).gE()
l=H.p(l,"<object>",n.b)
n=this.au(s).gE()
l=H.p(l,"<object's>",n.c)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gar()
h=n.gam()
g=n.gfq()
f=n.e
e=S.cn(l)
if(C.b.X(e,"{")||C.b.X(e,"}"))$.$get$fW().ej('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gI()){e=H.p(e,"<subject>","you")
e=H.p(e,"<subject's>","your")}if(i.gE()===C.B||i.gE()===C.a2){e=H.p(e,"<s>","")
e=H.p(e,"<es>","")
e=H.p(e,"<ies>","y")
e=H.p(e,"<does>","do")
e=H.p(e,"<is>","are")
e=H.p(e,"<has>","have")}else{e=H.p(e,"<s>","s")
e=H.p(e,"<es>","es")
e=H.p(e,"<ies>","ies")
e=H.p(e,"<does>","does")
e=H.p(e,"<is>","is")
e=H.p(e,"<has>","has")}e=H.bx(e,"<subject>","<subjectNoun>",0)
k=i.gE()
e=H.p(e,"<subject>",k.a)
k=n.db
e=this.bN(e,"<subjectNoun>",i,g,k)
j=i.gj()
if(typeof j!=="string")H.h(H.P(j))
e=H.bx(e,"<subjectNoun>",j,0)
j=i.gE()
e=H.p(e,"<subjectPronoun>",j.a)
if(C.b.X(l,P.b1("<subject>.+<subject's>",!0,!1))){j=i.gE()
e=H.p(e,"<subject's>",j.c)}e=this.bN(e,"<subject's>",i,g,k)
k=H.a(i.gj())+"'s"
e=H.bx(e,"<subject's>",k,0)
k=i.gE()
e=H.p(e,"<subject's>",k.c)
k=i.gE()
e=H.p(e,"<subjectPronoun's>",k.c)}if(h!=null){if(h.gI()){e=H.p(e,"<object>","you")
e=H.p(e,"<object's>","your")}else{e=this.bN(e,"<object>",h,f,n.db)
k=h.gj()
if(typeof k!=="string")H.h(H.P(k))
e=H.p(e,"<object>",k)}k=h.gE()
e=H.p(e,"<objectPronoun>",k.b)
if(C.b.X(l,P.b1("<object>.+<object's>",!0,!1))){k=h.gE()
e=H.p(e,"<object's>",k.c)}e=this.bN(e,"<object's>",h,f,n.db)
k=H.a(h.gj())+"'s"
e=H.bx(e,"<object's>",k,0)
k=h.gE()
e=H.p(e,"<object's>",k.c)
k=h.gE()
e=H.p(e,"<objectPronoun's>",k.c)}n=n.db
l=this.eP(f,this.eP(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.l9(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcu())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcu()?r+".":r
return H.oR(z.charCodeAt(0)==0?z:z,$.$get$eV(),new Y.le(),null)},
cn:function(){return this.fw(!1)},
jq:function(){var z,y
if(!this.gdV()){C.a.sk(this.a,0)
return}z=this.a
y=C.a.b9(z,C.a.f9(z,new Y.lf()))+1
P.co(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fQ:function(a,b){var z,y
if(!this.ao(a)||!this.ao(b))return!1
if(this.dT(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geo()}if(!this.cI(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfu()){if(b>=z.length)return H.e(z,b)
y=z[b].gfu()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfl()){if(b>=z.length)return H.e(z,b)
z=z[b].gfl()}else z=!1
if(z)return!0
else return!1},
h2:function(a,b){var z,y,x,w,v
if(!this.ao(a)||!this.ao(b))return!1
for(z=new P.aO(this.d1(a).a(),null,null,null);z.v();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.aO(this.d1(b).a(),null,null,null);y.v();){w=y.c
v=w==null?y.b:w.gF()
if(J.f(x.gm(),v.gm()))return!0}}return!1},
da:[function(a){var z=J.a8(a)
if(z.ah(a,0)||z.bB(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gay()}},"$1","gay",2,0,6],
a2:[function(a){var z=J.a8(a)
if(z.ah(a,0)||z.bB(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gar()}},"$1","gar",2,0,16],
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
if(typeof x!=="number")return H.A(x)
return y-x}},
i:function(a){return this.cn()},
ao:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eP:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gI())z=H.p(H.p(b,d,"you"),e,"your")
else{z=this.bN(b,d,a,null,h)
y=a.gj()
H.bc(y)
z=H.p(z,d,y)}z=H.p(z,f,a.gE().a)
z=H.p(H.p(C.b.cU(this.bN(C.b.X(c,P.b1(d+".+"+e,!0,!1))?H.p(z,e,a.gE().c):z,e,a,null,h),e,H.a(a.gj())+"'s"),e,a.gE().c),g,a.gE().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
i_:function(a,b){var z,y
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
l9:function(a){var z,y,x
z=!C.b.X(a,"\n\n")?C.b.jE(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bh(z,1)}}},la:{"^":"b:0;",
$1:function(a){return J.f(a.gay(),"\n\n")}},lb:{"^":"b:22;",
$2:function(a,b){var z,y
z=J.F(a)
y=z.ga8(a)?z.gJ(a):null
if(y!=null)y.gj6()
z.t(a,b)
return a}},lc:{"^":"b:23;a",
$1:function(a){return J.dS(this.a,a)}},ld:{"^":"b:0;",
$1:function(a){return J.f(a.gay(),"\n\n")}},le:{"^":"b:24;",
$1:function(a){return H.a(a.h(0,1))+H.a(a.h(0,2))+H.a(a.h(0,3))}},lf:{"^":"b:0;",
$1:function(a){return J.f(a.gay(),"\n\n")}},bi:{"^":"jq;cP:a<,j:b<,c,bc:d<,I:e<,E:f<",
gm:function(){return H.Z(this)},
gdY:function(){return!0},
gbk:function(){return!0},
p:{
cT:function(a,b,c,d,e){var z=H.w([],[P.o])
return new Y.bi(c,b,z,e==null?$.$get$aI():e,!1,d)}}},jq:{"^":"d+cU;"},cU:{"^":"d;",
gba:function(){if(this.gbk()){this.gdY()
var z=!0}else z=!1
return z},
aI:function(a,b,c,d,e,f,g,h,i){a.M(0,b,c,d,e,f,g,h,H.fT(this,"$isbi"),!1)},
ad:function(a,b){return this.aI(a,b,!1,!1,!1,null,null,!1,!1)},
b_:function(a,b,c,d){return this.aI(a,b,!1,!1,!1,c,null,d,!1)},
aR:function(a,b,c){return this.aI(a,b,!1,!1,!1,c,null,!1,!1)},
co:function(a,b,c){return this.aI(a,b,!1,!1,!1,null,null,c,!1)},
cV:function(a,b,c,d){return this.aI(a,b,c,!1,!1,d,null,!1,!1)},
e7:function(a,b,c,d){return this.aI(a,b,!1,c,d,null,null,!1,!1)},
bw:function(a,b,c){return this.aI(a,b,!1,!1,c,null,null,!1,!1)},
e7:function(a,b,c,d){return this.aI(a,b,!1,c,d,null,null,!1,!1)},
fz:function(a,b,c,d){return this.aI(a,b,!1,!1,c,d,null,!1,!1)},
jv:function(a,b,c,d){return this.aI(a,b,c,!1,!1,null,null,d,!1)},
ju:function(a,b,c){return this.aI(a,b,c,!1,!1,null,null,!1,!1)},
fA:function(a,b,c,d){return this.aI(a,b,!1,!1,!1,c,d,!1,!1)}},bG:{"^":"d;a,b,c,d",
i:function(a){return this.a}}}],["","",,L,{"^":"",o_:{"^":"b:0;",
$1:function(a){a.gcb().b=2
return 2}},nZ:{"^":"b:0;",
$1:function(a){a.gcb().b=0
return 0}},o5:{"^":"b:0;",
$1:function(a){a.gcb().b=1
return 1}},f0:{"^":"d;"},mf:{"^":"f0;m:a<",
an:function(a){var z=new L.f1(null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.f0))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gA:function(a){return Y.ab(Y.j(0,J.m(this.a)))},
i:function(a){return"Team {id="+J.i(this.a)+",\n}"},
p:{
dp:function(a){var z=new L.f1(null,null)
a.$1(z)
return z.D()}}},f1:{"^":"d;a,b",
gm:function(){return this.gcb().b},
gcb:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y
z=this.a
if(z==null){y=this.gcb().b
z=new L.mf(y)
if(y==null)H.h(P.u("id"))}this.C(z)
return z}}}],["","",,X,{"^":"",
fE:function(a,b){return new P.aE(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$fE(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bz(u,u.length,0,null,[H.k(u,0)])
u=y.a
s=new J.bz(u,u.length,0,null,[H.k(u,0)])
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
break}case 4:return P.aC()
case 1:return P.aD(v)}}})}}],["","",,A,{"^":"",b5:{"^":"d;a,b,c,d,e,L:f<",
giu:function(){var z=this.e
return z.length!==0?C.a.gJ(z):null},
gA:function(a){var z,y,x,w
z=X.aR(this.a)
y=X.aR(this.c)
x=X.aR(this.e)
w=this.f
return X.dA(X.b8(X.b8(X.b8(X.b8(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),J.m(w)))},
B:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$isb5&&this.gA(this)===z.gA(b)},
f5:function(a){var z,y,x
z=this.dr(a)
if(z==null)throw H.c(new P.N("Tried to elapseSituationTime of situation id="+H.a(a)+" that doesn't exist in situations ("+H.a(this.e)+")."))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].b7()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
b7:function(){var z=this.f
if(typeof z!=="number")return z.a1()
this.f=z+1},
fO:function(a,b,c,d,e){var z=this.c
if(a!=null)z=z.ep(0,new A.lY(a))
if(b!=null)z=z.bA(0,new A.lZ(b))
if(c!=null)z=z.bA(0,new A.m_(c))
if(e!=null)z=z.bA(0,new A.m0(e))
return d!=null?z.bA(0,new A.m1(d)):z},
ec:function(a,b,c,d,e){var z,y,x,w
z=this.fO(a,b,c,d,e)
y=z.gO(z)
if(y.v()){x=y.gF()
y=this.f
w=x.gL()
if(typeof y!=="number")return y.aq()
if(typeof w!=="number")return H.A(w)
return y-w}return},
jz:function(a,b,c){return this.ec(null,a,b,c,null)},
cW:function(a,b,c){return this.ec(a,null,b,null,c)},
jy:function(a,b,c){return this.ec(a,b,null,null,c)},
a7:function(a){return this.a.bG(0,new A.m2(a))},
eh:function(a){return this.d.bG(0,new A.m3(a))},
fP:function(a){var z,y
z=this.dr(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
cv:function(a){var z,y
for(z=this.e,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gj(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
fe:function(a){var z=this.a.b8(0,new A.m4(a),new A.m5())
if(z==null)return!1
return z.gbk()},
cm:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(C.a.gJ(z).gj(),a)))break
C.a.bU(z)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
i:function(a){var z,y
z=this.a
y=z.dA()
y.as(0,z)
return"World<"+P.aV(y,"{","}")+">"},
ae:function(a,b){var z,y,x
z=this.a7(a)
y=z.an(b)
x=this.a
x.aH(0,z)
x.t(0,y)},
dr:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gm(),a)){z=x
break}++x}return z},
hh:function(a){var z
this.a.as(0,a.a)
z=a.c
this.c.as(0,new H.ad(z,new A.lX(),[H.k(z,0),null]))
this.b.as(0,a.b)
this.d.as(0,a.d)
C.a.as(this.e,a.e)
this.f=a.f},
p:{
dn:function(a){var z,y
z=P.G(null,null,null,R.S)
y=P.aL(null,O.by)
y=new A.b5(z,P.G(null,null,null,U.cY),y,P.G(null,null,null,null),[],null)
y.hh(a)
return y}}},lX:{"^":"b:0;",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.gL()
y=a.geV()
x=a.gdK()
w=a.gat()
v=a.gcS()
u=P.r
t=P.az(a.gdc(),u)
s=a.gja()
r=a.y
q=a.z
p=a.Q
return new O.by(w,y,x,z,v,P.G(null,null,null,u),t,s,r,q,p)}},lY:{"^":"b:0;a",
$1:function(a){return J.dS(a.gdK(),this.a)}},lZ:{"^":"b:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gm())}},m_:{"^":"b:0;a",
$1:function(a){return a.gdc().X(0,this.a.x)}},m0:{"^":"b:0;a",
$1:function(a){return a.gfK()===this.a}},m1:{"^":"b:0;a",
$1:function(a){return a.gfJ()===this.a}},m2:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},m3:{"^":"b:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},m4:{"^":"b:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},m5:{"^":"b:1;",
$0:function(){return}}}],["","",,N,{"^":"",hT:{"^":"K;a0:c<,a_:d<,V:e<,U:f<,b,a",
ga5:function(){return"confuse <object>"},
ga6:function(){return"will <subject> confuse <object>?"},
W:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.M(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.M(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.a(a.gj())+" fails to confuse "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.M(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.bw(c,"<subject's> eyes go wide with terror",!0)
return H.a(a.gj())+" confuses "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 0.6},
N:function(a,b){return a.gI()&&a.ga4()&&!this.b.e_(b)},
p:{
oZ:[function(a){return new N.hT(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","oc",2,0,4]}}}],["","",,F,{"^":"",jH:{"^":"ac;a_:b<,a0:c<,V:d<,U:e<,a",
gj:function(){return"Stand off."},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){if(a.gI())a.ad(c,"<subject> stand<s> off")
return H.a(a.gj())+" passes the opportunity"},"$3","gR",6,0,2],
bl:function(a,b){return"WARNING this shouldn't be user-visible"},
P:function(a,b){return 1},
N:function(a,b){return!0}}}],["","",,Y,{"^":"",jV:{"^":"K;V:c<,U:d<,a0:e<,a_:f<,b,a",
ga5:function(){return"pound <object>"},
ga6:function(){return"will <subject> force <object> off balance?"},
W:[function(a,b,c){var z=this.b
a.fA(c,"<subject> {fiercely|violently} {pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} on <object-owner's> {<object>|weapon}",z.gY(),z)
z.co(c,"<subject> {stand<s> ground|deflect<s> each blow}",!0)
return H.a(a.gj())+" kicks "+H.a(z.cy)+" off balance"},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
a.fA(c,"<subject> {fiercely|violently} {pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} on <object-owner's> {<object>|weapon}",z.gY(),z)
if(z.ga4()){z.fz(c,"<subject> lose<s> <object>",!0,$.$get$dF())
b.ae(z.x,new Y.jW())
C.a.t(b.e,U.jr(z,a))
return H.a(a.gj())+" pounds "+H.a(z.cy)+" off balance"}else if(z.gaQ()){z.ad(c,"<subject> <is> already off balance")
c.eW(0,"<subject> make<s> <object> fall to "+H.a(b.cv("FightSituation").gbC()),z,$.$get$fZ())
b.ae(z.x,new Y.jX())
return H.a(a.gj())+" pounds "+H.a(z.cy)+" to the ground"}throw H.c(new P.N("enemy pose must be either standing or off-balance"))},"$3","gR",6,0,2],
P:function(a,b){var z=a.ga4()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
N:function(a,b){var z
if(!a.ga9()){z=a.e
z=z!=null&&z.a===C.d&&!this.b.ga9()}else z=!1
return z},
p:{
pd:[function(a){return new Y.jV(!0,C.e,!0,"Pounding on someone means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose ground or balance.",a,null)},"$1","oA",2,0,4]}},jW:{"^":"b:0;",
$1:function(a){a.sav(C.k)
return a}},jX:{"^":"b:0;",
$1:function(a){a.sav(C.o)
return a}}}],["","",,B,{"^":"",k7:{"^":"ac;a_:b<,a0:c<,V:d<,U:e<,a",
gj:function(){return"Regain balance."},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){if(a.gI())a.b_(c,"<subject> regain<s> <object>",$.$get$dF(),!0)
b.ae(a.gm(),new B.k8())
return H.a(a.gj())+" regains balance"},"$3","gR",6,0,2],
bl:function(a,b){return"Will "+a.gE().a+" regain balance?"},
P:function(a,b){return 1},
N:function(a,b){return a.gaQ()}},k8:{"^":"b:0;",
$1:function(a){a.sav(C.i)
return C.i}}}],["","",,O,{"^":"",kq:{"^":"ac;a_:b<,a0:c<,V:d<,U:e<,a",
gj:function(){return"Scramble."},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.a(a.gj())+" scrambles on ground"},"$3","gR",6,0,2],
bl:function(a,b){return"Will "+a.gE().a+" crawl out of harm's way?"},
P:function(a,b){return 1},
N:function(a,b){var z
if(!a.ga9())return!1
z=b.cW("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
return!1}}}],["","",,Q,{"^":"",kY:{"^":"ac;a_:b<,a0:c<,V:d<,U:e<,a",
gj:function(){return"Stand up."},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){a.ad(c,"<subject> stand<s> up")
b.ae(a.gm(),new Q.kZ())
return H.a(a.gj())+" stands up"},"$3","gR",6,0,2],
bl:function(a,b){return"Will "+a.gE().a+" stand up?"},
P:function(a,b){return 1},
N:function(a,b){var z
if(!a.ga9())return!1
z=b.cW("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!1
return!0}},kZ:{"^":"b:0;",
$1:function(a){a.sav(C.i)
return C.i}}}],["","",,G,{"^":"",eS:{"^":"K;a_:c<,a0:d<,U:e<,b,a",
ga5:function(){return"swing at <object>"},
gV:function(){return!1},
ga6:function(){return},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.r))
return H.a(a.cy)+" starts a slash at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 1},
N:function(a,b){return!a.gI()&&a.ga4()&&!this.b.ga9()&&a.aw(C.d)},
p:{
pj:[function(a){return new G.eS("The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","oK",2,0,4]}}}],["","",,R,{"^":"",eT:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"swing at <object> (while out of balance)"},
ga6:function(){return"will <subject> hit <objectPronoun>?"},
W:[function(a,b,c){var z=this.b
a.fz(c,"<subject> completely miss<es> <object> with <subject's> "+a.gY().f,!0,z)
return H.a(a.cy)+" fails to start an out-of-balance slash at "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.r))
return H.a(a.cy)+" starts an out-of-balance slash at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 0.7},
N:function(a,b){return!a.gI()&&a.gaQ()&&!this.b.ga9()&&a.aw(C.d)},
p:{
ph:[function(a){return new R.eT("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","oL",2,0,4]}}}],["","",,T,{"^":"",l_:{"^":"eT;c,d,e,f,b,a",
T:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.m))
return H.a(a.cy)+" starts an out-of-balance slash at "+H.a(z.gj())},"$3","gR",6,0,2],
N:function(a,b){return a.gI()&&a.gaQ()&&!this.b.ga9()&&a.aw(C.d)},
p:{
pg:[function(a){return new T.l_("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","oM",2,0,4]}}}],["","",,A,{"^":"",l0:{"^":"eS;V:f<,c,d,e,b,a",
ga6:function(){return"will <subject> hit <objectPronoun>?"},
W:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.t))
return H.a(a.cy)+" starts a failed slash at "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> swing<s> {<subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.m))
return H.a(a.cy)+" starts a successful slash at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 0.7},
N:function(a,b){return a.gI()&&a.ga4()&&!this.b.ga9()&&a.aw(C.d)},
p:{
pi:[function(a){return new A.l0(!0,"The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","oN",2,0,4]}}}],["","",,D,{"^":"",eU:{"^":"K;a_:c<,a0:d<,b,a",
gV:function(){return!1},
gU:function(){return},
ga5:function(){return"strike down at <object>"},
ga6:function(){return},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> strike<s> down {with <subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,D.dl(a,z))
C.a.t(y,V.d8(a,z,C.r))
return H.a(a.cy)+" strikes down at "+H.a(z.gj())+" on the ground"},"$3","gR",6,0,2],
P:function(a,b){return 1},
N:function(a,b){return!a.gI()&&this.b.ga9()&&!a.ga9()&&a.aw(C.d)},
p:{
pl:[function(a){return new D.eU("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","oO",2,0,4]}}}],["","",,Q,{"^":"",l1:{"^":"eU;c,d,b,a",
ga5:function(){return"strike down at <object>"},
gV:function(){return!0},
gU:function(){return C.e},
ga6:function(){return"will <subject> hit?"},
W:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> strike<s> down {with <subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,D.dl(a,z))
C.a.t(y,V.d8(a,z,C.t))
return H.a(a.cy)+" makes an unsuccessful strike at "+H.a(z.gj())+" on the ground"},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.aR(c,"<subject> strike<s> down {with <subject's> "+a.gY().f+" |}at <object>",z)
y=b.e
C.a.t(y,D.dl(a,z))
C.a.t(y,V.d8(a,z,C.m))
return H.a(a.cy)+" makes a successful strike at "+H.a(z.gj())+" on the ground"},"$3","gR",6,0,2],
P:function(a,b){return 0.7},
N:function(a,b){return a.gI()&&this.b.ga9()&&!a.ga9()&&a.aw(C.d)},
p:{
pk:[function(a){return new Q.l1("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","oP",2,0,4]}}}],["","",,B,{"^":"",lC:{"^":"K;V:c<,U:d<,a0:e<,a_:f<,b,a",
ga5:function(){return"sweep <object> off <objectPronoun's> feet"},
ga6:function(){return"will <subject> knock <object> down?"},
W:[function(a,b,c){S.bo(new B.lD(this,a,c),new B.lE(this,a,c),null,null)
return H.a(a.gj())+" fails to sweep "+H.a(this.b.gj())+" off feet"},"$3","gS",6,0,2],
T:[function(a,b,c){var z
S.bo(new B.lF(this,a,c),new B.lG(this,a,c,b.cv("FightSituation").gbC()),null,null)
z=this.b
b.ae(z.gm(),new B.lH())
return H.a(a.gj())+" sweeps "+H.a(z.gj())+" off feet"},"$3","gR",6,0,2],
P:function(a,b){var z=a.ga4()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
N:function(a,b){return(a.ga4()||a.dx===C.k)&&!this.b.ga9()},
p:{
pn:[function(a){return new B.lC(!0,C.e,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","oT",2,0,4]}},lD:{"^":"b:1;a,b,c",
$0:function(){var z=this.c
this.b.aR(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.ib(0,"they don't connect",!0,!0)}},lE:{"^":"b:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aR(z,"<subject> kick<s> <object's> shin",y)
y.ju(z,"<subject> <does>n't budge",!0)}},lF:{"^":"b:1;a,b,c",
$0:function(){this.b.b_(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},lG:{"^":"b:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b_(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.ad(z,"<subject> {grunt|shriek}<s>")
y.bw(z,"<subject> fall<s> to the "+H.a(this.d),!0)}},lH:{"^":"b:0;",
$1:function(a){a.sav(C.o)
return a}}}],["","",,M,{"^":"",lV:{"^":"ac;a_:b<,V:c<,U:d<,a0:e<,a",
gj:function(){return"Regain clarity."},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){a.ad(c,"<subject> shake<s> <subject's> head violently")
if(a.gI())c.t(0,"the {horrible|terrible} spell seems to recede")
c.M(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.a(a.gj())+" regains clarity"},"$3","gR",6,0,2],
bl:function(a,b){return"WARNING this shouldn't be user-visible"},
P:function(a,b){return 1},
N:function(a,b){var z
if(a.e_(b)){z=b.cW("Confuse",a,!0)
if(typeof z!=="number")return z.bm()
z=z>4}else z=!1
return z}}}],["","",,G,{"^":"",e6:{"^":"K;a_:c<,a0:d<,b,a",
gV:function(){return!1},
gU:function(){return},
ga5:function(){return"swing back at <object>"},
ga6:function(){return"will <subject> keep <subject's> balance?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to swing back")
a.toString
c.M(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.ga4()){b.ae(a.x,new G.i1())
c.M(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.k){b.ae(a.x,new G.i2())
c.M(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.M(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.a(a.cy)+" fails to swing back at "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.b_(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.r))
return H.a(a.gj())+" swings back at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return this.b.ga4()?0.7:0.9},
N:function(a,b){return!a.gI()&&a.aw(C.d)&&!a.ga9()},
p:{
p0:[function(a){return new G.e6("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","of",2,0,4]}},i1:{"^":"b:0;",
$1:function(a){a.sav(C.k)
return a}},i2:{"^":"b:0;",
$1:function(a){a.sav(C.o)
return a}}}],["","",,D,{"^":"",hZ:{"^":"e6;c,d,b,a",
gV:function(){return!0},
gU:function(){return C.e},
ga5:function(){return"swing back at <object>"},
ga6:function(){return"will <subject> hit <objectPronoun>?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to swing back")
a.toString
c.M(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.ga4()){b.ae(a.x,new D.i_())
c.M(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.k){b.ae(a.x,new D.i0())
c.M(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.M(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.a(a.cy)+" fails to swing back at "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y
z=this.b
a.b_(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.t(y,M.b3(a,z))
C.a.t(y,L.b2(a,z,C.m))
return H.a(a.gj())+" swings successfully back at "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return this.b.ga4()?0.7:0.9},
N:function(a,b){return a.gI()&&a.aw(C.d)&&!a.ga9()},
p:{
p_:[function(a){return new D.hZ("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","og",2,0,4]}},i_:{"^":"b:0;",
$1:function(a){a.sav(C.k)
return a}},i0:{"^":"b:0;",
$1:function(a){a.sav(C.o)
return a}}}],["","",,S,{"^":"",
e5:function(a,b){var z=new S.cR(null,null,null,null,null)
new S.ob(a,b).$1(z)
return z.D()},
e4:{"^":"aA;",
gb5:function(){return[G.of(),D.og()]},
gbK:function(){return[$.$get$d9()]},
gj:function(){return"CounterAttackSituation"},
b7:function(){var z=new S.cR(null,null,null,null,null)
z.C(this)
new S.hX().$1(z)
return z.D()},
b4:function(a,b){if(a===0)return b.a7(this.a)
return},
bf:function(a,b){return new H.O(a,new S.hY(this),[H.k(a,0)])}},
ob:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gaB().c=z
a.gaB().e=0
z=this.a.gm()
a.gaB().b=z
z=this.b.gm()
a.gaB().d=z
return a}},
hX:{"^":"b:0;",
$1:function(a){var z=a.gaB().e
if(typeof z!=="number")return z.a1()
a.gaB().e=z+1
return a}},
hY:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
m7:{"^":"e4;a,m:b<,c,L:d<",
an:function(a){var z=new S.cR(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.e4))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)))},
i:function(a){return"CounterAttackSituation {counterAttacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.a(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
cR:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaB().c},
gL:function(){return this.gaB().e},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
z=new S.m7(y,x,w,v)
if(y==null)H.h(P.u("counterAttacker"))
if(x==null)H.h(P.u("id"))
if(w==null)H.h(P.u("target"))
if(v==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,X,{"^":"",
h_:function(a,b,c){switch($.$get$fx().al(3)){case 0:b.e7(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bw(a,"<subject> fall<s> backward",!0)
b.toString
a.M(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b,!1)
a.M(0,"<subject> hit<s> the "+H.a(c)+" face down",!1,!0,!0,null,null,!1,b,!1)
break
case 2:b.bw(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
a.M(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b,!1)
break}a.aN(0,"\n\n",!0)}}],["","",,U,{"^":"",
iy:function(a,b,c){var z=new U.cW(null,null,null,null,null,null,null)
new U.o9(a,b,c).$1(z)
return z.D()},
eb:{"^":"aA;",
gb5:function(){return[N.oc(),Y.oA(),B.oT(),G.oK(),A.oN(),D.oO(),Q.oP(),R.oL(),T.oM()]},
gbK:function(){return H.w([$.$get$eE(),$.$get$eR(),$.$get$eJ(),$.$get$fg()],[Q.ac])},
gj:function(){return"FightSituation"},
b7:function(){var z=new U.cW(null,null,null,null,null,null,null)
z.C(this)
new U.iz().$1(z)
return z.D()},
b4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.fE(this.e,this.a)
y=H.bl(z,new U.iA(b),H.v(z,"x",0),null)
x=H.v(y,"x",0)
w=P.Y(new H.O(y,new U.iB(),[x]),!1,x)
x=H.k(w,0)
v=P.Y(new H.O(w,new U.iC(),[x]),!1,x)
u=v.length===1?C.a.gbn(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.a9)(w),++r){q=w[r]
p=b.c.b8(0,new U.iD(q),new U.iE())
o=p==null?p:p.gL()
if(o==null)o=-1
x=b.f
if(typeof x!=="number")return x.aq()
if(typeof o!=="number")return H.A(o)
n=x-o
if(q.gI())n=C.h.e9(n*1.5)
if(n>t){s=q
t=n}}return s},
bf:function(a,b){return new H.O(a,new U.iF(this),[H.k(a,0)])},
fo:function(a,b){var z,y
if(S.k1(0.25))b.aN(0,"\n\n",!0)
z=this.f
y=this.b.a
if(y.K(z))y.h(0,z).$2(a,b)},
d5:function(a){var z,y
z=new U.iG(a)
y=this.e
if(z.$1(y)===!0)if(z.$1(this.a)===!0){z=y.a
z=(z&&C.a).bO(z,new U.iI(a))}else z=!1
else z=!1
return z}},
o9:{"^":"b:0;a,b,c",
$1:function(a){var z,y
z=$.$get$aF().al(1073741823)
a.gaa().e=z
a.gaa().r=0
z=a.gaa()
y=z.f
if(y==null){y=new S.al(null,null,[P.r])
y.aA()
y.C(C.l)
z.f=y
z=y}else z=y
y=this.a
z.C(new H.cj(y,new U.nC(),[H.k(y,0),null]))
y=a.gaa()
z=y.b
if(z==null){z=new S.al(null,null,[P.r])
z.aA()
z.C(C.l)
y.b=z}z.C(J.dU(this.b,new U.nD()))
a.gaa().d=this.c
return a}},
nC:{"^":"b:0;",
$1:function(a){return a.gm()}},
nD:{"^":"b:0;",
$1:function(a){return a.gm()}},
iz:{"^":"b:0;",
$1:function(a){var z=a.gaa().r
if(typeof z!=="number")return z.a1()
a.gaa().r=z+1
return a}},
iA:{"^":"b:0;a",
$1:function(a){return this.a.a7(a)}},
iB:{"^":"b:0;",
$1:function(a){return a.gba()}},
iC:{"^":"b:0;",
$1:function(a){return a.gI()}},
iD:{"^":"b:0;a",
$1:function(a){return J.f(a.gcS(),this.a.gm())}},
iE:{"^":"b:1;",
$0:function(){return}},
iF:{"^":"b:17;a",
$1:function(a){var z,y,x
if(a.gba()){z=this.a
y=a.gm()
x=z.e.a
if(!(x&&C.a).X(x,y)){y=a.gm()
z=z.a.a
y=(z&&C.a).X(z,y)
z=y}else z=!0}else z=!1
return z}},
iG:{"^":"b:27;a",
$1:function(a){var z=a.a
return(z&&C.a).bO(z,new U.iH(this.a))}},
iH:{"^":"b:0;a",
$1:function(a){return this.a.a7(a).gba()}},
iI:{"^":"b:28;a",
$1:function(a){var z=this.a.a7(a)
return z.gI()&&z.gba()}},
m8:{"^":"eb;a,b,bC:c<,m:d<,e,L:f<",
an:function(a){var z=new U.cW(null,null,null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.eb))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)),J.m(this.e)),J.m(this.f)))},
i:function(a){return"FightSituation {enemyTeamIds="+J.i(this.a)+",\nevents="+J.i(this.b)+",\ngroundMaterial="+J.i(this.c)+",\nid="+J.i(this.d)+",\nplayerTeamIds="+J.i(this.e)+",\ntime="+J.i(this.f)+",\n}"}},
cW:{"^":"d;a,b,c,d,e,f,r",
gbC:function(){return this.gaa().d},
gm:function(){return this.gaa().e},
gL:function(){return this.gaa().r},
gaa:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.al(null,null,[H.k(z,0)])
y.aA()
y.C(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.d4(null,null,[H.k(z,0),H.k(z,1)])
y.c4()
y.C(z)
z=y}this.c=z
z=this.a
this.d=z.c
this.e=z.d
z=z.e
if(!(z==null)){y=new S.al(null,null,[H.k(z,0)])
y.aA()
y.C(z)
z=y}this.f=z
this.r=this.a.f
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v,u,t
z=this.a
if(z==null){y=this.gaa()
x=y.b
if(x==null){x=new S.al(null,null,[P.r])
x.aA()
x.C(C.l)
y.b=x
y=x}else y=x
y=y==null?y:y.D()
x=this.gaa()
w=x.c
if(w==null){w=new A.d4(null,null,[P.r,{func:1,v:true,args:[A.b5,Y.ao]}])
w.c4()
w.C(C.X)
x.c=w
x=w}else x=w
x=x==null?x:x.D()
w=this.gaa().d
v=this.gaa().e
u=this.gaa()
t=u.f
if(t==null){t=new S.al(null,null,[P.r])
t.aA()
t.C(C.l)
u.f=t
u=t}else u=t
u=u==null?u:u.D()
t=this.gaa().r
z=new U.m8(y,x,w,v,u,t)
if(y==null)H.h(P.u("enemyTeamIds"))
if(x==null)H.h(P.u("events"))
if(w==null)H.h(P.u("groundMaterial"))
if(v==null)H.h(P.u("id"))
if(u==null)H.h(P.u("playerTeamIds"))
if(t==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,A,{"^":"",jv:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"stab <object>"},
ga6:function(){return"will <subject> hit <objectPronoun>?"},
W:[function(a,b,c){var z=this.b
a.aR(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.M(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.a(a.gj())+" fails to stab "+H.a(z.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
b.ae(z.gm(),new A.jw())
if(b.a7(z.gm()).gbk()){a.b_(c,"<subject> thrust<s> {|<subject's> "+a.gY().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b_(c,"<subject> {stab<s>|run<s> <subject's> "+a.gY().f+" through} <object>",z,!0)
X.h_(c,z,b.cv("FightSituation").gbC())}return H.a(a.gj())+" stabs "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){if(a.gI())return 0.6
return 0.5},
N:function(a,b){var z
if(a.ga4())if(this.b.gaQ()){z=a.e
z=z!=null&&z.a===C.d}else z=!1
else z=!1
return z},
p:{
p8:[function(a){return new A.jv("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.e,a,null)},"$1","ox",2,0,4]}},jw:{"^":"b:0;",
$1:function(a){var z=a.gak()
if(typeof z!=="number")return z.aq()
a.sak(z-1)
return a}}}],["","",,U,{"^":"",
jr:function(a,b){var z=new U.d6(null,null,null,null,null)
new U.o3(a,b).$1(z)
return z.D()},
ev:{"^":"aA;",
gb5:function(){return H.w([A.ox()],[{func:1,ret:Q.K,args:[R.S]}])},
gbK:function(){return[$.$get$d9()]},
gj:function(){return"OffBalanceOpportunitySituation"},
b7:function(){var z=new U.d6(null,null,null,null,null)
z.C(this)
new U.js().$1(z)
return z.D()},
b4:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bm()
if(a>0)return
z=b.a7(this.a)
y=b.a
x=H.k(y,0)
w=P.Y(new H.O(y,new U.jt(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gf8(w)
if(v.ga4())if(z.gaQ()){y=v.e
y=y!=null&&y.a===C.d}else y=!1
else y=!1
if(y)return v
return},
bf:function(a,b){return new H.O(a,new U.ju(b,b.a7(this.a)),[H.k(a,0)])}},
o3:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gaC().d=z
a.gaC().e=0
z=this.a.gm()
a.gaC().b=z
z=this.b
z=z==null?z:z.gm()
a.gaC().c=z
return a}},
js:{"^":"b:0;",
$1:function(a){var z=a.gaC().e
if(typeof z!=="number")return z.a1()
a.gaC().e=z+1
return a}},
jt:{"^":"b:17;a,b,c",
$1:function(a){var z,y
if(a.gba())if(a.dW(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
ju:{"^":"b:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.dW(z,this.a)}},
m9:{"^":"ev;a,b,m:c<,L:d<",
an:function(a){var z=new U.d6(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.ev))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)))},
i:function(a){return"OffBalanceOpportunitySituation {actorId="+H.a(J.i(this.a))+",\nculpritId="+J.i(this.b)+",\nid="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
d6:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaC().d},
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
z=new U.m9(y,x,w,v)
if(y==null)H.h(P.u("actorId"))
if(w==null)H.h(P.u("id"))
if(v==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,O,{"^":"",iJ:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"kill <object> (WARNING should not be user-visible)"},
ga6:function(){return"(WARNING should not be user-visible)"},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y,x
z=this.b
b.ae(z.gm(),new O.iM())
y=b.a7(z.gm()).gbk()
if(y){a.b_(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.bw(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b_(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.h_(c,z,b.cv("FightSituation").gbC())}x=H.a(a.gj())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.a(z.gj())},"$3","gR",6,0,2],
P:function(a,b){return 1},
N:function(a,b){return a.aw(C.d)},
p:{
p5:[function(a){return new O.iJ(null,!0,!0,C.e,a,null)},"$1","oj",2,0,4]}},iM:{"^":"b:0;",
$1:function(a){var z=a.gak()
if(typeof z!=="number")return z.aq()
a.sak(z-1)
return a}}}],["","",,X,{"^":"",i7:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"step back and parry"},
ga6:function(){return"will <subject> parry it?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gY().f+"|fend it off}")
if(a.gaQ())c.M(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bo(new X.i8(a,c),new X.i9(this,a,c),null,null)
C.a.bU(b.e)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){if(a.gI())a.ad(c,"<subject> {step<s>|take<s> a step} back")
a.co(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.gY().f+"|fend<s> it off}",!0)
if(!a.ga4()){b.ae(a.x,new X.ia())
if(a.Q)c.M(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.cm("FightSituation")
return H.a(a.cy)+" steps back and parries "+H.a(this.b.gj())},"$3","gR",6,0,2],
P:function(a,b){var z,y
if(a.gI())return 1
z=b.e
y=z.length!==0?C.a.gJ(z):null
if(y.gbL())return 0
if(y.gbM())return 1
return 0.5-(a.ga4()?0:0.2)},
N:function(a,b){return a.aw(C.d)},
p:{
p1:[function(a){return new X.i7("Stepping back is the safest way to get out of harm's way.",!1,!0,C.e,a,null)},"$1","oh",2,0,4]}},i8:{"^":"b:1;a,b",
$0:function(){this.b.M(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},i9:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ia:{"^":"b:0;",
$1:function(a){a.sav(C.i)
return a}}}],["","",,F,{"^":"",ib:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"dodge and counter"},
ga6:function(){return"will <subject> dodge?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaQ())c.M(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bo(new F.ic(a,c),new F.id(this,a,c),null,null)
C.a.bU(b.e)
return H.a(a.cy)+" fails to dodge "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
a.b_(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.e7(c,"<subject> lose<s> balance because of that",!0,!0)
b.ae(z.x,new F.ie())}b.cm("FightSituation")
if(a.gI())c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.e,S.e5(a,z))
return H.a(a.gj())+" dodges "+H.a(z.cy)},"$3","gR",6,0,2],
P:function(a,b){var z,y,x
z=b.e
y=z.length!==0?C.a.gJ(z):null
if(y.gbL())return 0
if(y.gbM())return 1
x=a.ga4()?0:0.2
if(a.Q)return 0.7-x
return 0.4-x},
N:function(a,b){return!a.ga9()},
p:{
p2:[function(a){return new F.ib("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.e,a,null)},"$1","oi",2,0,4]}},ic:{"^":"b:1;a,b",
$0:function(){this.b.M(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},id:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ie:{"^":"b:0;",
$1:function(a){a.sav(C.k)
return C.k}}}],["","",,G,{"^":"",jE:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"parry and counter"},
ga6:function(){return"will <subject> parry?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gY().f+"|fend it off}")
if(a.gaQ())c.M(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bo(new G.jF(a,c),new G.jG(this,a,c),null,null)
C.a.bU(b.e)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
if(z.gaQ()){c.ig(0,"<subject> <is> out of balance",!0,!0,z)
c.ie(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$h2())
a.co(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+a.gY().f+"|fend<s> it off easily}",!0)}else a.co(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.gY().f+"|fend<s> it off}",!0)
b.cm("FightSituation")
if(a.gI())c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.e,S.e5(a,z))
return H.a(a.gj())+" parries "+H.a(z.cy)},"$3","gR",6,0,2],
P:function(a,b){var z,y,x,w
z=b.e
y=z.length!==0?C.a.gJ(z):null
if(y.gbL())return 0
if(y.gbM())return 1
x=a.ga4()?0:0.2
w=this.b.gaQ()?0.3:0
if(a.Q)return 0.6-x+w
return 0.3-x+w},
N:function(a,b){return a.aw(C.d)},
p:{
pa:[function(a){return new G.jE("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.e,a,null)},"$1","oz",2,0,4]}},jF:{"^":"b:1;a,b",
$0:function(){this.b.M(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},jG:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
b2:function(a,b,c){var z=new L.di(null,null,null,null,null,null)
new L.oa(a,b,c).$1(z)
return z.D()},
eM:{"^":"aA;",
gb5:function(){return[F.oi(),G.oz(),X.oh()]},
gbL:function(){return this.c===C.m},
gbM:function(){return this.c===C.t},
gj:function(){return"SlashDefenseSituation"},
b7:function(){var z=new L.di(null,null,null,null,null,null)
z.C(this)
new L.kU().$1(z)
return z.D()},
b4:function(a,b){if(a===0)return b.a7(this.d)
return},
bf:function(a,b){return new H.O(a,new L.kV(this),[H.k(a,0)])}},
oa:{"^":"b:0;a,b,c",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gaj().c=z
a.gaj().f=0
z=this.a.gm()
a.gaj().b=z
z=this.b.gm()
a.gaj().e=z
a.gaj().d=this.c
return a}},
kU:{"^":"b:0;",
$1:function(a){var z=a.gaj().f
if(typeof z!=="number")return z.a1()
a.gaj().f=z+1
return a}},
kV:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
mc:{"^":"eM;a,m:b<,c,d,L:e<",
an:function(a){var z=new L.di(null,null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.eM))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)),J.m(this.e)))},
i:function(a){return"SlashDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+H.a(J.i(this.c))+",\ntarget="+H.a(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
di:{"^":"d;a,b,c,d,e,f",
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
z=new L.mc(y,x,w,v,u)
if(y==null)H.h(P.u("attacker"))
if(x==null)H.h(P.u("id"))
if(w==null)H.h(P.u("predeterminedResult"))
if(v==null)H.h(P.u("target"))
if(u==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,M,{"^":"",
b3:function(a,b){var z=new M.dj(null,null,null,null,null)
new M.o0(a,b).$1(z)
return z.D()},
eN:{"^":"aA;",
gb5:function(){return[O.oj()]},
gj:function(){return"SlashSituation"},
b7:function(){var z=new M.dj(null,null,null,null,null)
z.C(this)
new M.kW().$1(z)
return z.D()},
b4:function(a,b){if(a===0)return b.a7(this.a)
return},
bf:function(a,b){return new H.O(a,new M.kX(this),[H.k(a,0)])}},
o0:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gaE().c=z
a.gaE().e=0
z=this.a.gm()
a.gaE().b=z
z=this.b.gm()
a.gaE().d=z
return a}},
kW:{"^":"b:0;",
$1:function(a){var z=a.gaE().e
if(typeof z!=="number")return z.a1()
a.gaE().e=z+1
return a}},
kX:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
md:{"^":"eN;a,m:b<,c,L:d<",
an:function(a){var z=new M.dj(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.eN))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)))},
i:function(a){return"SlashSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.a(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dj:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaE().c},
gL:function(){return this.gaE().e},
gaE:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaE().b
x=this.gaE().c
w=this.gaE().d
v=this.gaE().e
z=new M.md(y,x,w,v)
if(y==null)H.h(P.u("attacker"))
if(x==null)H.h(P.u("id"))
if(w==null)H.h(P.u("target"))
if(v==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,Q,{"^":"",iK:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"kill <object> (WARNING should not be user-visible)"},
ga6:function(){return"(WARNING should not be user-visible)"},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z=this.b
b.ae(z.gm(),new Q.iL())
c.eW(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gY())
z.bw(c,"<subject> die<s>",!0)
c.aN(0,"\n\n",!0)
return H.a(a.gj())+" slains "+H.a(z.gj())+" on the ground"},"$3","gR",6,0,2],
P:function(a,b){return 1},
N:function(a,b){return this.b.ga9()&&a.aw(C.d)},
p:{
p4:[function(a){return new Q.iK(null,!1,!0,C.e,a,null)},"$1","ok",2,0,4]}},iL:{"^":"b:0;",
$1:function(a){a.sak(0)
return a}}}],["","",,K,{"^":"",jz:{"^":"K;a0:c<,V:d<,U:e<,a_:f<,b,a",
ga5:function(){return"parry it"},
ga6:function(){return"will <subject> parry it?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.gY().f+"}}")
S.bo(new K.jA(a,c),new K.jB(this,a,c),null,null)
return H.a(a.cy)+" fails to parry "+H.a(this.b.gj())},"$3","gS",6,0,2],
T:[function(a,b,c){a.co(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.gY().f+"}",!0)
b.cm("FightSituation")
return H.a(a.cy)+" parries "+H.a(this.b.gj())},"$3","gR",6,0,2],
P:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gJ(z):null
if(y.gbL())return 0
if(y.gbM())return 1
if(a.gI())return 0.6
return 0.3},
N:function(a,b){return a.aw(C.d)},
p:{
p9:[function(a){return new K.jz(!1,!0,C.e,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","oy",2,0,4]}},jA:{"^":"b:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.M(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},jB:{"^":"b:1;a,b,c",
$0:function(){return this.a.b.cV(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",ka:{"^":"K;a_:c<,a0:d<,V:e<,U:f<,b,a",
ga5:function(){return"roll out of way"},
ga6:function(){return"will <subject> evade?"},
W:[function(a,b,c){a.ad(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.M(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.a(a.gj())+" fails to roll out of the way"},"$3","gS",6,0,2],
T:[function(a,b,c){a.jv(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gI()){b.ae(a.gm(),new Y.kb())
c.M(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.cm("FightSituation")
return H.a(a.gj())+" rolls out of the way of "+H.a(this.b.gj())+"'s strike"},"$3","gR",6,0,2],
P:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gJ(z):null
if(y.gbL())return 0
if(y.gbM())return 1
if(a.gI())return 1
return 0.5},
N:function(a,b){return!0},
p:{
pf:[function(a){return new Y.ka(null,!1,!0,C.e,a,null)},"$1","oE",2,0,4]}},kb:{"^":"b:0;",
$1:function(a){a.sav(C.i)
return a}}}],["","",,V,{"^":"",
d8:function(a,b,c){var z=new V.d7(null,null,null,null,null,null)
new V.o1(a,b,c).$1(z)
return z.D()},
ew:{"^":"aA;",
gb5:function(){return[K.oy(),Y.oE()]},
gbL:function(){return this.c===C.m},
gbM:function(){return this.c===C.t},
gj:function(){return"OnGroundDefenseSituation"},
b7:function(){var z=new V.d7(null,null,null,null,null,null)
z.C(this)
new V.jx().$1(z)
return z.D()},
b4:function(a,b){if(a===0)return b.a7(this.d)
return},
bf:function(a,b){return new H.O(a,new V.jy(this),[H.k(a,0)])}},
o1:{"^":"b:0;a,b,c",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gai().c=z
a.gai().f=0
z=this.a.gm()
a.gai().b=z
z=this.b.gm()
a.gai().e=z
a.gai().d=this.c
return a}},
jx:{"^":"b:0;",
$1:function(a){var z=a.gai().f
if(typeof z!=="number")return z.a1()
a.gai().f=z+1
return a}},
jy:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
ma:{"^":"ew;a,m:b<,c,d,L:e<",
an:function(a){var z=new V.d7(null,null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.ew))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)),J.m(this.e)))},
i:function(a){return"OnGroundDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+H.a(J.i(this.c))+",\ntargetOnGround="+H.a(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
d7:{"^":"d;a,b,c,d,e,f",
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
z=new V.ma(y,x,w,v,u)
if(y==null)H.h(P.u("attacker"))
if(x==null)H.h(P.u("id"))
if(w==null)H.h(P.u("predeterminedResult"))
if(v==null)H.h(P.u("targetOnGround"))
if(u==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,D,{"^":"",
dl:function(a,b){var z=new D.dk(null,null,null,null,null)
new D.o2(a,b).$1(z)
return z.D()},
eX:{"^":"aA;",
gb5:function(){return[Q.ok()]},
gj:function(){return"StrikeDownSituation"},
b7:function(){var z=new D.dk(null,null,null,null,null)
z.C(this)
new D.ly().$1(z)
return z.D()},
b4:function(a,b){if(a===0)return b.a7(this.a)
return},
bf:function(a,b){return new H.O(a,new D.lz(this),[H.k(a,0)])}},
o2:{"^":"b:0;a,b",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gaF().c=z
a.gaF().e=0
z=this.a.gm()
a.gaF().b=z
z=this.b.gm()
a.gaF().d=z
return a}},
ly:{"^":"b:0;",
$1:function(a){var z=a.gaF().e
if(typeof z!=="number")return z.a1()
a.gaF().e=z+1
return a}},
lz:{"^":"b:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
me:{"^":"eX;a,m:b<,c,L:d<",
an:function(a){var z=new D.dk(null,null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.eX))return!1
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
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)),J.m(this.d)))},
i:function(a){return"StrikeDownSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntargetOnGround="+H.a(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dk:{"^":"d;a,b,c,d,e",
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
z=new D.me(y,x,w,v)
if(y==null)H.h(P.u("attacker"))
if(x==null)H.h(P.u("id"))
if(w==null)H.h(P.u("targetOnGround"))
if(v==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,K,{"^":"",dc:{"^":"d;a",
i:function(a){return C.a_.h(0,this.a)}}}],["","",,Y,{"^":"",lI:{"^":"cc;a0:c<,V:d<,U:e<,b,a",
ga_:function(){return},
W:[function(a,b,c){throw H.c(new P.aq(null))},"$3","gS",6,0,2],
T:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.e
y=z.length!==0?C.a.gJ(z):null
x=y.an(new Y.lJ(this))
C.a.bU(z)
C.a.t(z,x)
w=this.b
v=b.eh(w.gf4())
for(u=R.fQ(a,b),u=P.Y(u,!0,H.v(u,"x",0)),t=u.length,s=b.a,r=0;r<u.length;u.length===t||(0,H.a9)(u),++r){q=b.a7(u[r].gm())
p=q.an(new Y.lK(v))
s.aH(0,q)
s.t(0,p)}c.aN(0,"\n\n",!0)
c.aN(0,v.gat(),!0)
c.aN(0,"\n\n",!0)
if(v.gji()!=null){o=v.e.$1(b)
s.as(0,o)
C.a.t(z,U.iy(new H.O(s,new Y.lL(a,v),[H.k(s,0)]),o,v.r))}return H.a(a.gj())+" went through exit to "+w.a},"$3","gR",6,0,2],
bl:function(a,b){return"WARNING should not be user-visible"},
P:function(a,b){return 1},
N:function(a,b){return!0},
p:{
po:[function(a){return new Y.lI(!1,!1,null,a,null)},"$1","oU",2,0,43]}},lJ:{"^":"b:0;a",
$1:function(a){a.saX(this.a.b.gf4())
return a}},lK:{"^":"b:0;a",
$1:function(a){a.saX(this.a.gj())
return a}},lL:{"^":"b:0;a,b",
$1:function(a){var z,y
z=a.gbc()
y=this.a.gbc()
z=z.a
y=y.a
return(z==null?y==null:z===y)&&J.f(a.gaX(),this.b.gj())}}}],["","",,F,{"^":"",
kd:function(a){var z=new F.dg(null,null,null,null)
new F.o4(a).$1(z)
return z.D()},
eF:{"^":"aA;",
gb5:function(){return[Y.oU()]},
gbK:function(){return H.w([],[Q.ac])},
gj:function(){return"RoomRoamingSituation"},
b7:function(){var z=new F.dg(null,null,null,null)
z.C(this)
new F.ke().$1(z)
return z.D()},
b4:function(a,b){return b.a.b8(0,new F.kf(),new F.kg())},
bf:function(a,b){var z=this.b4(null,b)
if(z==null)return[]
return[z]},
fn:function(a,b){a.a.hB(new F.kh(),!0)},
d5:function(a){if(J.f(this.a,$.$get$dI().b))return!1
return!0}},
o4:{"^":"b:0;a",
$1:function(a){var z=$.$get$aF().al(1073741823)
a.gaD().c=z
a.gaD().d=0
z=this.a.b
a.gaD().b=z
return a}},
ke:{"^":"b:0;",
$1:function(a){var z=a.gaD().d
if(typeof z!=="number")return z.a1()
a.gaD().d=z+1
return a}},
kf:{"^":"b:0;",
$1:function(a){return a.gI()&&a.gba()}},
kg:{"^":"b:1;",
$0:function(){return}},
kh:{"^":"b:0;",
$1:function(a){return!a.gbk()}},
mb:{"^":"eF;aX:a<,m:b<,L:c<",
an:function(a){var z=new F.dg(null,null,null,null)
z.C(this)
a.$1(z)
return z.D()},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof F.eF))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z},
gA:function(a){return Y.ab(Y.j(Y.j(Y.j(0,J.m(this.a)),J.m(this.b)),J.m(this.c)))},
i:function(a){return"RoomRoamingSituation {currentRoomName="+H.a(J.i(this.a))+",\nid="+J.i(this.b)+",\ntime="+J.i(this.c)+",\n}"}},
dg:{"^":"d;a,b,c,d",
gaX:function(){return this.gaD().b},
saX:function(a){this.gaD().b=a
return a},
gm:function(){return this.gaD().c},
gL:function(){return this.gaD().d},
gaD:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.a=null}return this},
C:function(a){this.a=a},
D:function(){var z,y,x,w
z=this.a
if(z==null){y=this.gaD().b
x=this.gaD().c
w=this.gaD().d
z=new F.mb(y,x,w)
if(y==null)H.h(P.u("currentRoomName"))
if(x==null)H.h(P.u("id"))
if(w==null)H.h(P.u("time"))}this.C(z)
return z}}}],["","",,O,{"^":"",
pB:[function(a){var z,y
z=$.$get$cK()
y=z.q
if(y.length>0){y+=" "
z.q=y}z.q=y+a},"$1","oG",2,0,9],
pC:[function(a){$.dN=a},"$1","oH",2,0,9],
fJ:[function(a,b,c,d,e,f,g){var z=L.dZ(a,!1,!1,d,e,f,g)
$.$get$bw().t(0,z)
return z},function(a){return O.fJ(a,!1,!1,null,null,null,null)},function(a,b,c){return O.fJ(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","oF",2,13,45,0,0,0,1,1,0],
kr:{"^":"kC;",
b3:function(){var z=0,y=new P.ak(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$b3=P.af(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cx){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Sending updated stats."
n.a.w(m.u())
m=t.Q
n=Z.l5()
m.toString
l=new A.q(100,null,null,null,null)
l.e=n.u()
m.a.w(l.u())
new P.D(0,$.n,null,[null]).aU(!0)}if(t.r){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Saving player chronology."
n.a.w(m.u())
t.r=!1
m=t.Q
m.toString
n=new A.q(60,null,null,null,null)
n.b=t.f.bV(0)
m.a.w(n.u())}s=null
case 3:n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.w(m.u())
w=7
z=10
return P.t(t.c3(),$async$b3,y)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.y(j)
if(n instanceof M.c4){r=n
q=H.z(j)
n=t.Q
m=H.a(r)+"\nStacktrace: "+H.a(q)
n.toString
l=new A.q(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.w(l.u())
z=1
break}else{p=n
o=H.z(j)
n=t.Q
m=H.a(p)+"\nStacktrace: "+H.a(o)
n.toString
l=new A.q(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.w(l.u())
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
n.a.w(m.u())
case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$b3,y)},
e8:function(){var z,y
this.eG()
this.f.aG(0)
this.r=!0
this.e=this.c
z=this.Q
Z.ff(Z.bp())
z.toString
y=new A.q(90,null,null,null,null)
y.b=Z.bp()
z.a.w(y.u())
this.b3()},
jQ:[function(a){var z,y
z={}
z.a=null
y=$.$get$bw()
y.H(0,new O.kN(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.a(a)+") is not one of those offered ("+J.i(y)+")"))
this.hS(z)
this.b3()},"$1","ghD",2,0,29],
hS:function(a){var z
if(a.gf7()!=null){z=a.r
$.$get$bU().af(z)}z=a.x
if(z!=null)this.dH(z)},
c3:function(){var z=0,y=new P.ak(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$c3=P.af(function(a1,a2){if(a1===1){v=a2
z=w}while(true)switch(z){case 0:s={}
p=$.$get$bV()
o=p.b
if(o.b!==o.c){s=t.Q
s.toString
o=new A.q(667,null,null,null,null)
o.c="Awarding points."
s.a.w(o.u())
n=p.b.cT()
p=t.Q
o=n.gim()
s=n.b
m=n.c
p.toString
l=new A.q(70,null,null,null,null)
l.b=[o,s]
l.c=m
p.a.w(l.u())
p=new P.D(0,$.n,null,[null])
p.aU(null)
p.bx(new O.kD(t))
x=!0
z=1
break}k=t.x===t.e.gac().length-1||t.x===t.y
s.a=k
p=t.x
o=t.y
if(p!==o)if(p!=null){m=t.e.gac().length
if(typeof p!=="number"){x=p.ah()
z=1
break}if(p<m){p=t.e.gac()
m=t.x
if(m>>>0!==m||m>=p.length){x=H.e(p,m)
z=1
break}m=!!J.l(p[m]).$isH
p=m}else p=!1
j=p}else j=!1
else j=!1
p="atEndOfPage = "+k+", atStaticChoiceList = "+j
m=t.Q
m.toString
i=new A.q(667,null,null,null,null)
i.c=p
m.a.w(i.u())
i=$.$get$bw()
i.toString
P.jc(i,new O.kE(t),!1)
if(i.gk(i)!==0){p=t.Q
p.toString
m=new A.q(667,null,null,null,null)
m.c="We have choices."
p.a.w(m.u())
m=H.v(i,"aW",0)
m=P.Y(new H.O(i,new O.kF(s,j),[m]),!0,m)
p=i.a
H.w([],[L.X])
h=new L.e_(p,m)
if(!h.gG(h)){s=t.Q
p=s.e
if(p!=null){p.cM(new D.bA("Showing new choice before previous one was selected."))
s.e=null}p=P.r
s.e=new P.bO(new P.D(0,$.n,null,[p]),[p])
p=h.cY()
s.a.w(p.u())
s=s.e.a.bx(t.ghD())
g=new O.kG(t)
p=H.k(s,0)
o=$.n
if(o!==C.f){g=P.dD(g,o)
o.toString}s.cD(new P.dv(null,new P.D(0,o,null,[p]),6,new O.kH(),g,[p,p]))
x=!0
z=1
break}else{f=i.b8(0,new O.kI(),new O.kJ())
if(f!=null){if(f.gf7()!=null){p=f.r
$.$get$bU().af(p)}p=f.x
if(p!=null)t.dH(p)
i.aH(0,f)}}}p=$.$get$bU()
m=p.b
e=p.c
z=m!==e?3:4
break
case 3:if(m===e)H.h(H.a1());++p.d
s=p.a
o=s.length
e=(e-1&o-1)>>>0
p.c=e
if(e<0||e>=o){x=H.e(s,e)
z=1
break}d=s[e]
s[e]=null
z=5
return P.t(t.c5(d),$async$c3,y)
case 5:x=a2
z=1
break
case 4:p=$.dN
if(p!=null){t.dH(p)
$.dN=null
x=!1
z=1
break}p=t.x
if(p==null){t.x=0
p=0}else if(p===o){p=t.e.gac().length-1
t.x=p}else if($.fy)$.fy=!1
else{if(typeof p!=="number"){x=p.a1()
z=1
break}++p
t.x=p}s.a=p===t.e.gac().length-1
p="Resolving block: '"+H.a(t.e.gj())+"' block "+H.a(t.x)+"."
o=t.Q
o.toString
m=new A.q(667,null,null,null,null)
m.c=p
o.a.w(m.u())
if(t.x===t.e.gac().length){s=t.Q
s.toString
p=new A.q(667,null,null,null,null)
p.c="End of book."
s.a.w(p.u())
p=t.Q
s=t.dj()
p.toString
s=s.ed(50)
p.a.w(s.u())
t.Q.a.w(new A.q(80,null,null,null,null).u())
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
s.f=new P.bO(new P.D(0,$.n,null,[p]),[p])
p=new A.q(30,null,null,null,null)
p.c=o
s.a.w(p.u())
s.f.a.bx(new O.kK(t))
x=!0
z=1
break
z=7
break
case 8:p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}z=!!J.l(p[o]).$isH?9:11
break
case 9:p=t.Q
p.toString
o=new A.q(667,null,null,null,null)
o.c="A ChoiceList encountered."
p.a.w(o.u())
try{p=t.e.gac()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}i.ik(p[o])}catch(a0){s=H.y(a0)
if(s instanceof M.c4){r=s
q=H.z(a0)
s=t.Q
p=H.a(r)+"\nStacktrace: "+H.a(q)
s.toString
o=new A.q(666,null,null,null,null)
o.c="AuthorScriptException: "+p
s.a.w(o.u())
x=!0
z=1
break}else throw a0}p=t.Q
p.toString
o=new A.q(667,null,null,null,null)
o.c="- choices added"
p.a.w(o.u())
if(i.bO(0,new O.kL(s,t))&&t.x===t.e.gac().length-1){s=t.Q
s.toString
p=new A.q(667,null,null,null,null)
p.c="Creating & sending savegame"
s.a.w(p.u())
p=t.Q
s=t.dj()
p.toString
s=s.ed(50)
p.a.w(s.u())
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
p=H.ag(H.ar(P.M,[H.ar(P.aM)]))
z=p.aL(o)?12:14
break
case 12:b=t.x===t.e.gac().length-1?t.dj():null
o=t.e.gac()
m=t.x
if(m>>>0!==m||m>=o.length){x=H.e(o,m)
z=1
break}z=15
return P.t(t.c5(p.ev(o[m])),$async$c3,y)
case 15:a=a2
if(i.bO(0,new O.kM(s,t))&&t.x===t.e.gac().length-1){s=t.Q
s.toString
p=b.ed(50)
s.a.w(p.u())}x=a
z=1
break
z=13
break
case 14:s=t.e.gac()
p=t.x
if(p>>>0!==p||p>=s.length){x=H.e(s,p)
z=1
break}throw H.c(new P.N("Invalid block: "+H.a(s[p])))
case 13:case 10:case 7:case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$c3,y)},
dH:function(a){var z,y,x,w,v
z=$.$get$c8()
if(z.b.test(H.bc(a))){y=this.d
if(y==null)throw H.c(new P.N("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aq()
w=z-1}else{x=this.b.d3(a,this.e.gd4())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.a(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.t(0,H.a(z.gj())+">>"+H.a(y.gj()))
this.r=!0}if(this.f.X(0,H.a(this.e.gj())+">>"+H.a(x.gj()))||x.gfI()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfI()
else z=!1}else z=!1
$.fw=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.q(667,null,null,null,null)
v.c=z
y.a.w(v.u())
v=this.e
this.d=new O.ks(v,this.x)
this.e=x
this.x=w
v.e=J.a_(v.gcZ(),1)},
eG:function(){var z,y,x,w,v,u
this.x=null
$.$get$bU().aG(0)
$.$get$bw().sk(0,0)
$.nF=null
x=$.$get$c_()
x.aG(0)
w=$.$get$bV()
x.l(0,"points",w)
w.a=0
w.b.aG(0)
this.b.ip()
$.fU=!0
try{this.iY()}catch(v){x=H.y(v)
z=x
y=H.z(v)
x=this.Q
w=H.a(z)+"\n"+H.a(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.w(u.u())
throw H.c(z)}this.ft()
$.fU=!1},
c5:function(a){var z=0,y=new P.ak(),x,w=2,v,u=[],t=this,s,r,q,p,o,n
var $async$c5=P.af(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$cK()
q.q=""
w=4
z=7
return P.t(a.$0(),$async$c5,y)
case 7:w=2
z=6
break
case 4:w=3
n=v
o=H.y(n)
s=o
r=H.z(n)
q.q+="<code><pre>ERROR: "+H.a(s)+"\n\n"+H.a(r)+"</pre></code>"
throw H.c(new M.c4(J.i(s),t.e.gj(),t.x))
z=6
break
case 3:z=2
break
case 6:if(q.q.length!==0){t.Q.el(J.i(q)).bx(new O.kO(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$c5,y)},
hK:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$c8().b.test(H.bc(z)))return!1
y=this.b.d3(z,this.e.gd4())
if(y==null){z="Target page '"+H.a(z)+"' was not found."
x=this.Q
x.toString
w=new A.q(667,null,null,null,null)
w.c=z
x.a.w(w.u())
return!0}y.gjG()
return!1},"$1","geK",2,0,39],
dj:function(){var z,y,x,w,v,u
this.ft()
try{x=this.e.gj()
w=$.$get$c_()
x=new Z.eH(x,this.b.iI(),null,null,null,null)
x.c=H.au(Z.cs(w),"$isC",[P.o,P.d],"$asC")
x.f=Date.now()
x.e=C.c.jD(H.Z(x),16)
return x}catch(v){x=H.y(v)
z=x
y=H.z(v)
x=this.Q
w=H.a(z)+"\n"+H.a(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.w(u.u())
throw H.c(z)}},
fh:function(a,b){var z,y,x
this.eG()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.cX("Trying to load page '"+H.a(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.w(x.u())
z.iU(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Importing player chronology."
z.a.w(y.u())
this.f.as(0,b)}z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.w(y.u())
y=$.$get$c_()
Z.ko(a,y,P.eo(P.o,P.bj))
this.cx=H.fT(y.h(0,"game"),"$ise8")
this.cy=H.au(y.h(0,"hitpoints"),"$isan",[P.at],"$asan")
this.db=H.au(y.h(0,"stamina"),"$isan",[P.r],"$asan")
y=this.Q
Z.ff(Z.bp())
y.toString
z=new A.q(90,null,null,null,null)
z.b=Z.bp()
y.a.w(z.u())
z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="loadFromSaveGame() done."
z.a.w(y.u())
this.b3()},
jd:function(a){return this.fh(a,null)},
d6:[function(a,b,c,d){var z=0,y=new P.ak(),x,w=2,v,u=this,t,s,r
var $async$d6=P.af(function(e,f){if(e===1){v=f
z=w}while(true)switch(z){case 0:t=$.$get$cK()
if(t.q.length!==0){u.Q.el(J.i(t))
t.q=""}t=u.Q
t.toString
s=new A.q(130,null,null,null,null)
s.b=[a,b,d,c]
t.a.w(s.u())
s=U.bK
r=new P.D(0,$.n,null,[s])
t.x=new P.bO(r,[s])
x=r
z=1
break
case 1:return P.t(x,0,y)
case 2:return P.t(v,1,y)}})
return P.t(null,$async$d6,y)},function(a,b){return this.d6(a,b,null,!1)},"jL","$4$rerollEffectDescription$rerollable","$2","gh1",4,5,31,1,0]},
kN:{"^":"b:0;a,b,c",
$1:function(a){var z,y,x,w
a.sem(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.w(x.u())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$c8().b.test(H.bc(z))?y.d.a:y.b.d3(z,y.e.gd4())
if(w!=null){y.f.t(0,H.a(y.e.gj())+">>"+H.a(w.gj()))
y.r=!0}}}}},
kD:{"^":"b:0;a",
$1:function(a){return this.a.b3()}},
kE:{"^":"b:0;a",
$1:function(a){return a.gem()||this.a.hK(a)}},
kF:{"^":"b:32;a,b",
$1:function(a){return a.j3(this.b,this.a.a)}},
kG:{"^":"b:0;a",
$1:function(a){var z,y,x
z=H.a(a)
y=this.a.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.w(x.u())
return}},
kH:{"^":"b:0;",
$1:function(a){return a instanceof D.bA}},
kI:{"^":"b:0;",
$1:function(a){return a.gj4()}},
kJ:{"^":"b:1;",
$0:function(){return}},
kK:{"^":"b:0;a",
$1:function(a){return this.a.b3()}},
kL:{"^":"b:0;a,b",
$1:function(a){return a.cO(!0,this.a.a,this.b.geK())}},
kM:{"^":"b:0;a,b",
$1:function(a){return a.cO(!0,this.a.a,this.b.geK())}},
kO:{"^":"b:0;a",
$1:function(a){return this.a.b3()}},
jU:{"^":"d;a,b,f1:c<",
i9:function(a,b,c){var z
if(!$.fw){z=J.a_(this.a,b)
this.a=z
this.b.af(new A.cl(b,z,c))}},
t:function(a,b){return this.i9(a,b,null)},
a1:function(a,b){this.t(0,b)
return this},
u:function(){return P.a6(["points",this.a])},
fH:function(a){this.a=a.h(0,"points")
this.b.aG(0)},
hc:function(){this.b=P.aL(null,A.cl)},
$isdh:1},
ct:{"^":"jD;ac:d<,cZ:e@,a,b,c",
gfI:function(){return J.a0(this.e,0)}},
ks:{"^":"d;a,b"},
ky:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
d3:function(a,b){var z
if(b!=null&&this.a.K(b+": "+H.a(a)))return this.a.h(0,H.a(b)+": "+H.a(a))
else{z=this.a
if(z.K(a))return z.h(0,a)
else return}},
l:function(a,b,c){this.a.l(0,b,c)
c.sj(b)},
iI:function(){var z=new H.I(0,null,null,null,null,null,0,[P.o,null])
this.a.H(0,new O.kA(z))
return z},
iU:function(a){a.H(0,new O.kB(this))},
ip:function(){this.a.H(0,new O.kz())}},
kA:{"^":"b:5;a",
$2:function(a,b){this.a.l(0,a,P.a6(["visitCount",b.gcZ()]))}},
kB:{"^":"b:5;a",
$2:function(a,b){var z=this.a.a
if(z.K(a))z.h(0,a).scZ(J.ai(b,"visitCount"))}},
kz:{"^":"b:5;",
$2:function(a,b){b.scZ(0)}}}],["","",,M,{"^":"",c4:{"^":"d;a,b,c",
i:function(a){return"AuthorScriptException at page '"+H.a(this.b)+"', block #"+H.a(this.c)+": "+H.a(this.a)},
p:{
dW:function(a){return new M.c4(a,null,null)}}}}],["","",,M,{"^":"",kC:{"^":"d;"}}],["","",,Z,{"^":"",eH:{"^":"d;a,b,c,d,e,f",
ed:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.q(a,null,null,null,null)
z.c=this.cX()
return z},
cX:function(){var z,y
z=new H.I(0,null,null,null,null,null,0,[P.o,null])
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
eI:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.l(a)
z=!!z.$isH||!!z.$isC}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.l(a).$isdh},
cs:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.l(a)
if(!!z.$isH){y=[]
for(x=0;x<z.gk(a);++x)if(Z.eI(z.h(a,x)))y.push(Z.cs(z.h(a,x)))
return y}else if(!!z.$isC){w=new H.I(0,null,null,null,null,null,0,[null,null])
z.H(a,new Z.kn(a,w))
return w}else if(!!z.$isdh){v=a.u()
v.l(0,"_class",a.gf1())
return Z.cs(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cr:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.l(a)
if(!!z.$isH){y=[]
for(x=0;x<z.gk(a);++x)y.push(Z.cr(z.h(a,x),b,null))
return y}else{w=!!z.$isC
if(w&&!a.K("_class")){v=new H.I(0,null,null,null,null,null,0,[null,null])
z.H(a,new Z.km(b,v))
return v}else if(w&&a.K("_class"))if(c!=null){c.fH(a)
return c}else{u=z.h(a,"_class")
if(!b.K(u))throw H.c(new Z.cX("Constructor for "+H.a(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
ko:function(a,b,c){a.c.H(0,new Z.kp(b,c))}}},kn:{"^":"b:5;a,b",
$2:function(a,b){if(Z.eI(this.a.h(0,a)))this.b.l(0,a,Z.cs(b))}},km:{"^":"b:5;a,b",
$2:function(a,b){this.b.l(0,a,Z.cr(b,this.a,null))}},kp:{"^":"b:33;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.l(0,a,Z.cr(b,x,null))
else z.l(0,a,Z.cr(b,x,y))}},cX:{"^":"d;a",
i:function(a){return"IncompatibleSavegameException: "+this.a}},iQ:{"^":"d;a",
i:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",jZ:{"^":"d;"},jY:{"^":"jZ;"},iY:{"^":"jY;a,b,c,d,e,f,r,x",
jU:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.o
n=[o,P.d]
H.au(a,"$isC",n,"$asC")
m=new A.q(a.h(0,"type"),null,null,null,null)
if(a.K("strContent"))m.c=a.h(0,"strContent")
if(a.K("listContent"))m.b=a.h(0,"listContent")
if(a.K("intContent"))m.d=a.h(0,"intContent")
if(a.K("mapContent"))m.e=H.au(a.h(0,"mapContent"),"$isC",n,"$asC")
z=m
switch(z.gee()){case 1070:o=this.e
if(o!=null){o.cM(new D.bA("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.aV()
o.b.aV()
return
case 1000:o=new A.q(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.w(o.u())
n.w(new A.q(10,null,this.c.ch,null,null).u())
return
case 1050:l=z.giZ()
this.e.br(l)
this.e=null
return
case 1060:o=new A.q(667,null,null,null,null)
o.c="New form state from player received."
this.a.w(o.u())
o=z.gjf()
if(!o.K("__submitted__"))o.l(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.bY())
n.bo(new G.i3(o))
return
case 1080:o=new A.q(667,null,null,null,null)
o.c="Received slot machine result."
this.a.w(o.u())
k=J.ai(z.ge3(),0)
j=J.ai(z.ge3(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.br(new U.bK(C.y[k],j))
this.x=null
return
case 1010:o=new A.q(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.w(o.u())
o=this.e
if(o!=null){o.cM(new D.bA("Book Restart before choice was selected."))
this.e=null}try{this.c.e8()}catch(i){o=H.y(i)
y=o
x=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="An error occured when initializing: "+H.a(y)+".\n"+H.a(x)
n.w(o.u())
throw H.c(y)}o=new A.q(90,null,null,null,null)
o.b=Z.bp()
n.w(o.u())
n.w(new A.cl(0,0,null).cY().u())
return
case 1020:h=new A.q(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.w(h.u())
h=this.e
if(h!=null){h.cM(new D.bA("Book Load before choice was selected."))
this.e=null}try{h=z.gh6()
f=new Z.eH(null,null,null,null,null,null)
e=H.au(C.v.iv(h),"$isC",n,"$asC")
if(!e.K("currentPageName")||!e.K("vars"))H.h(new Z.iQ("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.a(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.au(e.h(0,"pageMapState"),"$isC",n,"$asC")
f.c=H.au(e.h(0,"vars"),"$isC",n,"$asC")
if(e.K("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.au(J.he(z.ge3()),"$isbL",[o],"$asbL")
o=this.c
if(v!=null)o.fh(w,v)
else o.jd(w)}catch(i){o=H.y(i)
if(o instanceof Z.cX){u=o
t=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.a(u)+".\n"+H.a(t)
g.w(o.u())
this.c.e8()}else{s=o
r=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.a(s)+".\n"+H.a(r)
g.w(o.u())
this.c.e8()}}try{o=new A.q(90,null,null,null,null)
o.b=Z.bp()
g.w(o.u())}catch(i){o=H.y(i)
q=o
p=H.z(i)
o=new A.q(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.a(q)+".\n"+H.a(p)
g.w(o.u())
throw H.c(q)}this.c.toString
g.w(new A.cl(0,$.$get$bV().a,null).cY().u())
return
case 1090:this.f.br(!0)
this.f=null
return
case 1040:this.c.b3()
return
default:o=new A.q(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.a(z.gee())+"."
this.a.w(o.u())}},"$1","ghQ",2,0,15],
el:function(a){var z=P.Q
this.f=new P.bO(new P.D(0,$.n,null,[z]),[z])
z=new A.q(30,null,null,null,null)
z.c=a
this.a.w(z.u())
return this.f.a}},bA:{"^":"d;a",
i:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",i3:{"^":"d;a",
gjN:function(){return this.a.h(0,"__submitted__")},
u:function(){return P.bF(this.a,null,null)},
i:function(a){return"<CurrentState submitted="+H.a(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",q:{"^":"d;ee:a<,e3:b<,h6:c<,iZ:d<,jf:e<",
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
cX:function(){return C.v.f6(this.u())},
u:function(){var z,y
z=new H.I(0,null,null,null,null,null,0,[P.o,P.d])
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
x=J.l(y)
return z+(x.B(y,50)||x.B(y,60)||x.B(y,90)||x.B(y,100)||x.B(y,666)||x.B(y,667)?" (async)":"")}}}],["","",,E,{"^":"",jD:{"^":"d;j:a@,jG:b<",
i:function(a){return this.a},
gd4:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.h9(z,": ")
if(y>0)return J.dV(this.a,0,y)
else return}}}],["","",,A,{"^":"",cl:{"^":"d;im:a<,b,c",
i:function(a){return"Score +"+H.a(this.a)+"."},
cY:function(){var z=new A.q(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",X:{"^":"d;em:a@,b,c,d,ay:e<,a_:f<,f7:r<,x,y",
gj4:function(){return this.e.length===0},
cO:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
if(b!=null)!b
if(a!=null)!a
if(c!=null&&c.$1(this)===!0)return!1
return!0},
j3:function(a,b){return this.cO(a,b,null)},
jB:function(){return P.a6(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bx:function(a){this.r=a
return this},
b6:function(a,b){return C.b.b6(this.e,b.gay())},
i:function(a){return"Choice: "+this.e+" ["+H.a(this.x)+"] ("+this.d+")"},
h9:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bd(a).fF(a)
this.d=C.b.gA(a)
this.r=f
this.b=!1
this.c=!1},
$isL:1,
$asL:function(){return[L.X]},
p:{
dZ:function(a,b,c,d,e,f,g){var z=new L.X(!1,null,null,null,null,e,null,d,g)
z.h9(a,!1,!1,d,e,f,g)
return z}}},e_:{"^":"ep;a,b",
gk:function(a){return this.b.length},
sk:function(a,b){C.a.sk(this.b,b)
return b},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
l:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
ik:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
v=J.F(a)
if(v.h(a,0)!=null&&!!J.l(v.h(a,0)).$isbj)try{this.a=v.h(a,0).$0()}catch(u){v=H.y(u)
z=v
throw H.c(M.dW(J.i(z)))}else this.a=null
t=this.b
s=H.ag(H.ar(P.M,[H.ar(P.aM)]))
r=1
while(!0){q=v.gk(a)
if(typeof q!=="number")return H.A(q)
if(!(r<q))break
y=v.h(a,r)
x=null
if(J.ai(y,"string")!=null&&!!J.l(J.ai(y,"string")).$isbj)try{x=J.ai(y,"string").$0()}catch(u){v=H.y(u)
w=v
throw H.c(M.dW(J.i(w)))}else x=""
q=x
p=J.ai(y,"goto")
o=s.ev(J.ai(y,"script"))
n=new L.X(!1,null,null,null,null,null,null,p,J.ai(y,"submenu"))
if(q==null)H.h(P.E("String given to choice cannot be null."))
n.e=J.bd(q).fF(q)
n.d=C.b.gA(q)
n.r=o
n.b=!1
n.c=!1
C.a.t(t,n);++r}},
ii:function(a,b,c,d,e,f,g){if(b instanceof L.X)C.a.t(this.b,b)
else if(typeof b==="string")C.a.t(this.b,L.dZ(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
t:function(a,b){return this.ii(a,b,!1,!1,null,null,null)},
jC:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.k(z,0)
x=P.Y(new H.O(z,new L.hM(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.q(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.H(x,new L.hN(w))
return w},
cY:function(){return this.jC(null,null,null,null)},
i:function(a){return new H.ad(this.b,new L.hO(),[null,null]).cj(0,", ")},
$asep:function(){return[L.X]},
$aseu:function(){return[L.X]},
$asH:function(){return[L.X]},
$asV:function(){return[L.X]}},hM:{"^":"b:0;a,b,c",
$1:function(a){return a.cO(this.b,this.a,this.c)}},hN:{"^":"b:0;a",
$1:function(a){H.a(a)
J.cL(this.a.b,a.jB())
a.a=!0}},hO:{"^":"b:0;",
$1:function(a){return H.a(a)}}}],["","",,Z,{"^":"",cu:{"^":"d;cB:a<,ay:b<",
u:function(){return P.a6(["show",this.a,"string",this.b])}},l2:{"^":"d;a",
u:function(){var z=new H.I(0,null,null,null,null,null,0,[P.o,P.d])
this.a.H(0,new Z.l3(z))
return z},
H:function(a,b){this.a.H(0,b)}},l3:{"^":"b:34;a",
$2:function(a,b){this.a.l(0,a,b.u())}},fe:{"^":"d;j:a@,at:b<,f2:c<,cR:d<,cB:e<,fm:f<,ay:r<",p:{
ff:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.w(new Array(a.length),[Z.fe])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.a9)(a),++v){u=a[v]
t=J.F(u)
s=t.h(u,"name")
r=t.h(u,"description")
q=t.h(u,"color")
p=t.h(u,"priority")
o=t.h(u,"show")
n=t.h(u,"notifyOnChange")
t=t.h(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fe(s,r,q,p,o,n,t);++w}C.a.cC(z,new Z.lU())
return z}}},lU:{"^":"b:5;",
$2:function(a,b){return J.ah(b.gcR(),a.gcR())}},an:{"^":"d;j:a<,at:b<,c,f2:d<,cR:e<,f,r,fm:x<,f_:y@,f1:z<,$ti",
gap:function(){return this.f},
sap:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cx=!0}},
gcB:function(){return this.r},
gay:function(){return this.c.$1(this.f)},
u:function(){return P.a6(["name",this.a,"value",this.f,"show",this.r])},
fH:function(a){var z
this.sap(H.h1(a.h(0,"value"),H.k(this,0)))
z=a.h(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cx=!0}},
$isdh:1,
p:{
cv:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cw()
y=z.K(a)?H.au(z.h(0,a),"$isan",[h],"$asan"):new Z.an(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.h1(e,h)
y.r=!0
z.l(0,a,y)
return y},
l5:function(){var z,y
z=new Z.l2(new H.I(0,null,null,null,null,null,0,[P.o,Z.cu]))
y=$.$get$cw().gbX()
new H.O(y,new Z.l6(),[H.v(y,"x",0)]).H(0,new Z.l7(z))
$.cx=!1
return z},
bp:function(){var z=H.w([],[[P.C,P.o,P.d]])
$.$get$cw().gbX().H(0,new Z.l4(z))
return z}}},l6:{"^":"b:0;",
$1:function(a){return a.gf_()}},l7:{"^":"b:18;a",
$1:function(a){var z,y
z=a.gcB()
y=a.gay()
a.sf_(!1)
this.a.a.l(0,a.a,new Z.cu(z,y))}},l4:{"^":"b:18;a",
$1:function(a){var z=new H.I(0,null,null,null,null,null,0,[P.o,P.d])
z.l(0,"name",a.gj())
z.l(0,"description",a.gat())
z.l(0,"color",a.gf2())
z.l(0,"priority",a.gcR())
z.l(0,"show",a.gcB())
z.l(0,"notifyOnChange",a.gfm())
z.l(0,"string",a.gay())
this.a.push(z)}}}],["","",,B,{"^":"",jl:{"^":"d;"},p3:{"^":"jn;"},jm:{"^":"jl;"},jn:{"^":"jm;"}}],["","",,N,{"^":"",d3:{"^":"d;j:a<,b,c,ht:d<,e,f",
gfa:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gj(),"")
x=this.a
return y?x:z.gfa()+"."+x},
ge2:function(){if($.fS){var z=this.b
if(z!=null)return z.ge2()}return $.nN},
je:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.ge2().b){if(!!J.l(b).$isbj)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.oD.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.a(b)
throw H.c(x)}catch(u){x=H.y(u)
z=x
y=H.z(u)
d=y
if(c==null)c=z}e=$.n
x=b
w=this.gfa()
t=c
s=d
r=Date.now()
q=$.eq
$.eq=q+1
p=new N.jg(a,x,v,w,new P.ca(r,!1),q,t,s,e)
if($.fS)for(o=this;o!=null;){o.eN(p)
o=o.b}else $.$get$es().eN(p)}},
bS:function(a,b,c,d){return this.je(a,b,c,d,null)},
iL:function(a,b,c){return this.bS(C.R,a,b,c)},
Z:function(a){return this.iL(a,null,null)},
iK:function(a,b,c){return this.bS(C.Q,a,b,c)},
aO:function(a){return this.iK(a,null,null)},
iJ:function(a,b,c){return this.bS(C.S,a,b,c)},
bu:function(a){return this.iJ(a,null,null)},
iX:function(a,b,c){return this.bS(C.x,a,b,c)},
iW:function(a){return this.iX(a,null,null)},
jH:function(a,b,c){return this.bS(C.V,a,b,c)},
ef:function(a){return this.jH(a,null,null)},
h0:function(a,b,c){return this.bS(C.U,a,b,c)},
ej:function(a){return this.h0(a,null,null)},
eN:function(a){},
p:{
aX:function(a){return $.$get$er().fv(a,new N.o6(a))}}},o6:{"^":"b:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d8(z,"."))H.h(P.E("name shouldn't start with a '.'"))
y=C.b.jb(z,".")
if(y===-1)x=z!==""?N.aX(""):null
else{x=N.aX(C.b.az(z,0,y))
z=C.b.bh(z,y+1)}w=new H.I(0,null,null,null,null,null,0,[P.o,N.d3])
w=new N.d3(z,x,null,w,new P.fh(w,[null,null]),null)
if(x!=null)x.ght().l(0,z,w)
return w}},ax:{"^":"d;j:a<,ap:b<",
B:function(a,b){if(b==null)return!1
return b instanceof N.ax&&this.b===b.b},
ah:function(a,b){return C.c.ah(this.b,b.gap())},
bD:function(a,b){return C.c.bD(this.b,b.gap())},
bm:function(a,b){var z=b.gap()
if(typeof z!=="number")return H.A(z)
return this.b>z},
bB:function(a,b){return this.b>=b.gap()},
b6:function(a,b){var z=b.gap()
if(typeof z!=="number")return H.A(z)
return this.b-z},
gA:function(a){return this.b},
i:function(a){return this.a},
$isL:1,
$asL:function(){return[N.ax]}},jg:{"^":"d;e2:a<,b,am:c<,d,L:e<,f,aY:r<,aT:x<,y",
i:function(a){return"["+this.a.a+"] "+this.d+": "+H.a(this.b)}}}],["","",,X,{"^":"",
aR:function(a){return X.dA(J.h5(a,0,new X.oo()))},
b8:function(a,b){var z=J.a_(a,b)
if(typeof z!=="number")return H.A(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dA:function(a){if(typeof a!=="number")return H.A(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
oo:{"^":"b:5;",
$2:function(a,b){return X.b8(a,J.m(b))}}}],["","",,U,{"^":"",cp:{"^":"d;a",
i:function(a){return C.Z.h(0,this.a)}},bK:{"^":"d;a,jI:b<",
ge0:function(){return this.a===C.C},
i:function(a){return"SessionResult<"+this.a.i(0)+",wasRerolled="+H.a(this.b)+">"},
B:function(a,b){if(b==null)return!1
return b instanceof U.bK&&b.a===this.a&&J.f(b.b,this.b)},
gA:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
pD:[function(a,b){var z,y,x,w,v
z=new D.iY(b,null,null,null,null,null,null,null)
y=$.eD
$.eD=y+1
x=new H.bI(y,null,!1)
w=init.globalState.d
w.dd(y,x)
w.cc()
w=new H.k4(x,null)
w.hd(x)
z.b=w
w=w.b
w.toString
new P.cA(w,[H.k(w,0)]).ag(z.ghQ(),null,null,null)
b.w(new H.bS(z.b.a,init.globalState.d.a))
v=N.ku()
z.c=v
v.Q=z},"$2","fK",4,0,30]},1]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eh.prototype
return J.j_.prototype}if(typeof a=="string")return J.bE.prototype
if(a==null)return J.ei.prototype
if(typeof a=="boolean")return J.eg.prototype
if(a.constructor==Array)return J.bC.prototype
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.aH=function(a){if(a==null)return a
if(a.constructor==Array)return J.bC.prototype
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.F=function(a){if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(a.constructor==Array)return J.bC.prototype
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.a8=function(a){if(typeof a=="number")return J.bD.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.dL=function(a){if(typeof a=="number")return J.bD.prototype
if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.bd=function(a){if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b4.prototype
return a}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.dL(a).a1(a,b)}
J.be=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.a8(a).d0(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).B(a,b)}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a8(a).bm(a,b)}
J.c0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a8(a).ah(a,b)}
J.bf=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dL(a).bE(a,b)}
J.h4=function(a){if(typeof a=="number")return-a
return J.a8(a).ei(a)}
J.ah=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a8(a).aq(a,b)}
J.ai=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.cL=function(a,b){return J.aH(a).t(a,b)}
J.c1=function(a,b){return J.dL(a).b6(a,b)}
J.dS=function(a,b){return J.F(a).X(a,b)}
J.dT=function(a,b){return J.aH(a).a3(a,b)}
J.h5=function(a,b,c){return J.aH(a).aP(a,b,c)}
J.m=function(a){return J.l(a).gA(a)}
J.h6=function(a){return J.F(a).gG(a)}
J.aa=function(a){return J.aH(a).gO(a)}
J.h7=function(a){return J.aH(a).gJ(a)}
J.av=function(a){return J.F(a).gk(a)}
J.h8=function(a){return J.l(a).gb1(a)}
J.h9=function(a,b){return J.F(a).b9(a,b)}
J.dU=function(a,b){return J.aH(a).bb(a,b)}
J.ha=function(a,b,c){return J.bd(a).fj(a,b,c)}
J.hb=function(a,b,c){return J.bd(a).js(a,b,c)}
J.hc=function(a){return J.a8(a).e9(a)}
J.hd=function(a,b){return J.aH(a).d7(a,b)}
J.cM=function(a,b){return J.bd(a).d8(a,b)}
J.dV=function(a,b,c){return J.bd(a).az(a,b,c)}
J.he=function(a){return J.aH(a).by(a)}
J.i=function(a){return J.l(a).i(a)}
J.bg=function(a,b){return J.a8(a).cr(a,b)}
J.hf=function(a,b){return J.aH(a).bA(a,b)}
I.cI=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.I=J.aw.prototype
C.a=J.bC.prototype
C.p=J.eg.prototype
C.c=J.eh.prototype
C.q=J.ei.prototype
C.h=J.bD.prototype
C.b=J.bE.prototype
C.D=new A.a5(0,0,0)
C.E=new A.a5(-1/0,-1/0,-1/0)
C.F=new H.e7()
C.G=new P.jC()
C.u=new P.mB()
C.H=new P.mV()
C.f=new P.nc()
C.w=new P.aK(0)
C.J=new U.ce(0)
C.K=new U.ce(1)
C.L=new U.ce(2)
C.d=new U.ce(3)
C.M=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.j3(null,null)
C.N=new P.j5(null)
C.O=new P.j6(null,null)
C.P=new O.j7(0)
C.Q=new N.ax("FINER",400)
C.R=new N.ax("FINEST",300)
C.S=new N.ax("FINE",500)
C.x=new N.ax("INFO",800)
C.T=new N.ax("OFF",2000)
C.U=new N.ax("SEVERE",1000)
C.V=new N.ax("WARNING",900)
C.C=new U.cp(0)
C.a3=new U.cp(1)
C.a4=new U.cp(2)
C.a5=new U.cp(3)
C.y=I.cI([C.C,C.a3,C.a4,C.a5])
C.l=I.cI([])
C.W=new H.bk([0,"Resource.stamina",1,"Resource.balance"],[null,null])
C.X=new H.hV(0,{},C.l,[null,null])
C.Y=new H.bk([0,"ItemType.spear",1,"ItemType.branch",2,"ItemType.tent",3,"ItemType.sword"],[null,null])
C.Z=new H.bk([0,"Result.success",1,"Result.failure",2,"Result.criticalSuccess",3,"Result.criticalFailure"],[null,null])
C.a_=new H.bk([0,"Predetermination.none",1,"Predetermination.successGuaranteed",2,"Predetermination.failureGuaranteed"],[null,null])
C.a0=new H.bk([0,"KnownToMode.all",1,"KnownToMode.protagonistOnly",2,"KnownToMode.custom"],[null,null])
C.z=new H.bk([0,"Pose.standing",1,"Pose.offBalance",2,"Pose.onGround"],[null,null])
C.i=new R.db(0)
C.k=new R.db(1)
C.o=new R.db(2)
C.r=new K.dc(0)
C.t=new K.dc(1)
C.m=new K.dc(2)
C.A=new Y.bG("he","him","his","himself")
C.j=new Y.bG("it","it","its","itself")
C.a1=new Y.bG("she","her","her","herself")
C.a2=new Y.bG("they","them","their","themselves")
C.B=new Y.bG("you","you","your","yourself")
C.e=new Q.k9(0)
C.a6=H.aQ("ej")
C.a7=H.aQ("aM")
C.a8=H.aQ("o")
C.a9=H.aQ("Q")
C.aa=H.aQ("at")
C.n=H.aQ("dynamic")
C.ab=H.aQ("r")
C.ac=H.aQ("J")
C.ad=new P.br(null,2)
$.eD=1
$.ey="$cachedFunction"
$.ez="$cachedInvocation"
$.aj=0
$.bh=null
$.dX=null
$.b9=null
$.bt=null
$.bu=null
$.dB=!1
$.n=C.f
$.ea=0
$.dN=null
$.fw=!1
$.nF=null
$.fy=!1
$.fU=!0
$.cx=!1
$.fS=!1
$.oD=C.T
$.nN=C.x
$.eq=0
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
I.$lazy(y,x,w)}})(["ed","$get$ed",function(){return H.iW()},"ee","$get$ee",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ea
$.ea=z+1
z="expando$key$"+z}return new P.ix(null,z,[P.r])},"f3","$get$f3",function(){return H.ap(H.cz({
toString:function(){return"$receiver$"}}))},"f4","$get$f4",function(){return H.ap(H.cz({$method$:null,
toString:function(){return"$receiver$"}}))},"f5","$get$f5",function(){return H.ap(H.cz(null))},"f6","$get$f6",function(){return H.ap(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fa","$get$fa",function(){return H.ap(H.cz(void 0))},"fb","$get$fb",function(){return H.ap(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"f8","$get$f8",function(){return H.ap(H.f9(null))},"f7","$get$f7",function(){return H.ap(function(){try{null.$method$}catch(z){return z.message}}())},"fd","$get$fd",function(){return H.ap(H.f9(void 0))},"fc","$get$fc",function(){return H.ap(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dq","$get$dq",function(){return P.mj()},"aU","$get$aU",function(){return P.iN(null,null)},"bv","$get$bv",function(){return[]},"bn","$get$bn",function(){return N.aX("PlannerRecommendation")},"dI","$get$dI",function(){return K.kc("__END_OF_ROAM__","","",null,null,[],"ground")},"aF","$get$aF",function(){return P.de(42)},"b0","$get$b0",function(){return P.de(401)},"fW","$get$fW",function(){return N.aX("Storyline")},"eV","$get$eV",function(){return P.b1("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"dH","$get$dH",function(){return L.dp(new L.o_())},"aI","$get$aI",function(){return L.dp(new L.nZ())},"dP","$get$dP",function(){return L.dp(new L.o5())},"d9","$get$d9",function(){return new F.jH("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"dF","$get$dF",function(){return Y.cT(!1,"balance",!0,C.j,$.$get$aI())},"fZ","$get$fZ",function(){return Y.cT(!1,"pounding",!1,C.j,$.$get$aI())},"eE","$get$eE",function(){return new B.k7("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"eJ","$get$eJ",function(){return new O.kq(null,!1,!1,null,null)},"eR","$get$eR",function(){return new Q.kY(null,!1,!0,C.e,null)},"fg","$get$fg",function(){return new M.lV("",!0,C.e,!1,null)},"fx","$get$fx",function(){return P.de(null)},"h2","$get$h2",function(){return Y.cT(!1,"swing",!0,C.j,$.$get$aI())},"cK","$get$cK",function(){return P.lA("")},"bV","$get$bV",function(){var z=new O.jU(0,null,"PointsCounter")
z.hc()
return z},"bw","$get$bw",function(){return new L.e_(null,H.w([],[L.X]))},"c_","$get$c_",function(){return H.en(P.o,P.d)},"bU","$get$bU",function(){return P.aL(null,{func:1,ret:[P.M,P.aM]})},"c8","$get$c8",function(){return P.b1("^\\s*<<<\\s*$",!0,!1)},"cw","$get$cw",function(){return H.en(P.o,Z.an)},"es","$get$es",function(){return N.aX("")},"er","$get$er",function(){return P.eo(P.o,N.d3)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.o,args:[R.S,A.b5,Y.ao]},{func:1,v:true},{func:1,ret:Q.K,args:[R.S]},{func:1,args:[,,]},{func:1,ret:P.o,args:[P.r]},{func:1,args:[P.r]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.o]},{func:1,args:[,P.aB]},{func:1,v:true,args:[,],opt:[P.aB]},{func:1,ret:P.J,args:[A.a5]},{func:1,args:[P.at]},{func:1,ret:P.M},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bi,args:[P.r]},{func:1,args:[R.S]},{func:1,args:[Z.an]},{func:1,ret:P.o,args:[Q.ac]},{func:1,ret:P.J,args:[A.cN]},{func:1,args:[P.Q]},{func:1,args:[[P.H,Y.a2],Y.a2]},{func:1,args:[Y.a2]},{func:1,args:[P.aY]},{func:1,v:true,args:[P.d,P.aB]},{func:1,v:true,args:[,P.aB]},{func:1,ret:P.Q,args:[[P.x,P.r]]},{func:1,ret:P.Q,args:[P.r]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[[P.H,P.o],P.eK]},{func:1,ret:[P.M,U.bK],args:[P.at,P.o],named:{rerollEffectDescription:P.o,rerollable:P.Q}},{func:1,args:[L.X]},{func:1,args:[P.o,,]},{func:1,args:[P.o,Z.cu]},{func:1,args:[{func:1,v:true}]},{func:1,ret:P.o,args:[P.o]},{func:1,args:[P.r,R.S]},{func:1,ret:P.r,args:[P.L,P.L]},{func:1,ret:P.Q,args:[L.X]},{func:1,ret:P.r,args:[R.S]},{func:1,ret:P.J,args:[P.J,P.J]},{func:1,args:[P.J,R.S]},{func:1,ret:Q.cc,args:[Q.aT]},{func:1,args:[P.r,,]},{func:1,ret:L.X,args:[P.o],named:{deferToChoiceList:P.Q,deferToEndOfPage:P.Q,goto:P.o,helpMessage:P.o,script:{func:1,ret:[P.M,P.aM]},submenu:P.o}},{func:1,args:[,],opt:[,]}]
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
if(x==y)H.oV(d||a)
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
Isolate.cI=a.cI
Isolate.aG=a.aG
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.h0(X.fK(),b)},[])
else (function(b){H.h0(X.fK(),b)})([])})})()